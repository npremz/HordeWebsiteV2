/**
 * Arthur : prépare le modèle 3D à partir de l'export Sketchfab d'origine, en deux étapes.
 *
 * 1. Normales lissées intégrées au modèle.
 * Le modèle Sketchfab est livré avec des normales par facette. Avant, body.ts appelait
 * `toCreasedNormals` (angle 50°) sur chaque maillage à l'exécution : ~60 ms de CPU et la
 * dépendance BufferGeometryUtils dans le bundle. Ce script applique la même fonction, de la même
 * version de three.js, une fois pour toutes, puis refusionne les sommets identiques (sinon le
 * modèle « dé-indexé » pèserait plus du double) et réécrit scene.gltf + scene.bin.
 *
 * Les UV (TEXCOORD_0) sont retirées au passage : aucun matériau du modèle n'a de texture, et l'écran
 * du visage calcule ses propres UV (body.ts). Sans elles, le modèle compressé est plus léger qu'avant,
 * alors que des normales lissées se compressent moins bien que des normales par facette.
 *
 * 2. Compression meshopt (gltfpack), réglages prudents :
 *   -kn -km -ke : on garde les 104 maillages, leurs nœuds, les noms des matériaux et les extras
 *                 (body.ts trie les pièces maillage par maillage et reconnaît le visage à son matériau) ;
 *   -vp 16 -vn 12 : positions en entiers 16 bits, normales en 12 bits (rendu identique au pixel près) ;
 *   -cc -ce ext : compression meshopt renforcée, extension EXT lue par le GLTFLoader de three.js.
 * body.ts branche MeshoptDecoder sur le GLTFLoader pour lire ce format.
 * Résultat : ≈ 150 Ko gzip au lieu de ≈ 450 Ko pour l'export d'origine.
 *
 * Usage (depuis la racine du projet, dans le conteneur Node ; la première fois, npx télécharge gltfpack) :
 *   node scripts/build-arthur-model.mjs
 * À lancer sur l'export d'origine (scene.gltf + scene.bin non traités, aussi dans l'historique git) :
 * le script refuse un modèle déjà traité.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BufferAttribute, BufferGeometry } from 'three';
import { mergeVertices, toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';

const MODEL_DIR = path.resolve('src/assets/arthur_model');
const CREASE_ANGLE_DEG = 50; // ancienne valeur SMOOTH_ANGLE de body.ts
const MERGE_TOLERANCE = 1e-6; // écart max introduit par la refusion des sommets (unités du modèle)
const GLTFPACK = 'gltfpack@1.3.0';
const GLTFPACK_ARGS = ['-kn', '-km', '-ke', '-cc', '-ce', 'ext', '-vp', '16', '-vn', '12'];

const gltfPath = path.join(MODEL_DIR, 'scene.gltf');
const gltf = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
if (gltf.asset?.extras?.hordeBakedNormals || gltf.extensionsUsed?.includes('EXT_meshopt_compression')) {
  console.error("Modèle déjà traité : repartir de l'export Sketchfab d'origine.");
  process.exit(1);
}
if (gltf.buffers.length !== 1) throw new Error('Un seul buffer attendu.');
const binPath = path.join(MODEL_DIR, gltf.buffers[0].uri);
const bin = fs.readFileSync(binPath);

const COMPONENTS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const ARRAYS = { 5121: Uint8Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };

/** Lit un accessor en tableau typé compact (gère byteStride). */
function readAccessor(index) {
  const accessor = gltf.accessors[index];
  if (accessor.sparse) throw new Error('Accessor sparse non géré.');
  const view = gltf.bufferViews[accessor.bufferView];
  const ArrayType = ARRAYS[accessor.componentType];
  const size = COMPONENTS[accessor.type];
  const elementBytes = ArrayType.BYTES_PER_ELEMENT * size;
  const stride = view.byteStride || elementBytes;
  const base = (view.byteOffset || 0) + (accessor.byteOffset || 0);
  const out = new ArrayType(accessor.count * size);
  for (let i = 0; i < accessor.count; i++) {
    const offset = bin.byteOffset + base + i * stride;
    const element = new ArrayType(bin.buffer.slice(offset, offset + elementBytes));
    out.set(element, i * size);
  }
  return out;
}

const ATTRIBUTES = { POSITION: 'position', NORMAL: 'normal' };
const DROPPED = ['TEXCOORD_0']; // inutilisées, voir plus haut
const SIZES = { position: 3, normal: 3 };

// --- Nouveau buffer, reconstruit maillage par maillage ---
const chunks = [];
let byteLength = 0;
const bufferViews = [];
const accessors = [];
function pushData(typed, target, byteStride) {
  const padding = (4 - (byteLength % 4)) % 4;
  if (padding) {
    chunks.push(Buffer.alloc(padding));
    byteLength += padding;
  }
  const bytes = Buffer.from(typed.buffer, typed.byteOffset, typed.byteLength);
  const view = { buffer: 0, byteOffset: byteLength, byteLength: bytes.length, target };
  if (byteStride) view.byteStride = byteStride;
  bufferViews.push(view);
  chunks.push(bytes);
  byteLength += bytes.length;
  return bufferViews.length - 1;
}

let verticesBefore = 0;
let verticesAfter = 0;
let maxError = { position: 0, normal: 0 };

for (const mesh of gltf.meshes) {
  for (const primitive of mesh.primitives) {
    if ((primitive.mode ?? 4) !== 4) throw new Error('Seuls les triangles sont gérés.');
    if (primitive.targets) throw new Error('Morph targets non gérées.');
    for (const name of DROPPED) delete primitive.attributes[name];
    const extra = Object.keys(primitive.attributes).filter((name) => !(name in ATTRIBUTES));
    if (extra.length) throw new Error(`Attributs non gérés : ${extra.join(', ')}`);

    // Même géométrie que celle que produit GLTFLoader.
    const geometry = new BufferGeometry();
    for (const [gltfName, threeName] of Object.entries(ATTRIBUTES)) {
      if (primitive.attributes[gltfName] === undefined) continue;
      geometry.setAttribute(threeName, new BufferAttribute(readAccessor(primitive.attributes[gltfName]), SIZES[threeName]));
    }
    if (primitive.indices !== undefined) geometry.setIndex(new BufferAttribute(readAccessor(primitive.indices), 1));
    verticesBefore += geometry.getAttribute('position').count;

    // Exactement ce que faisait body.ts au chargement.
    const creased = toCreasedNormals(geometry, (CREASE_ANGLE_DEG * Math.PI) / 180);
    const baked = mergeVertices(creased, MERGE_TOLERANCE);
    verticesAfter += baked.getAttribute('position').count;

    // Contrôle : chaque sommet de chaque triangle doit retrouver ses valeurs d'origine.
    const index = baked.getIndex();
    for (const name of Object.keys(SIZES)) {
      const reference = creased.getAttribute(name);
      const result = baked.getAttribute(name);
      if (!reference) continue;
      for (let i = 0; i < index.count; i++) {
        const v = index.getX(i);
        for (let c = 0; c < SIZES[name]; c++) {
          const diff = Math.abs(reference.array[i * SIZES[name] + c] - result.array[v * SIZES[name] + c]);
          if (diff > maxError[name]) maxError[name] = diff;
        }
      }
    }

    // Écriture : indices 16 bits quand c'est possible, attributs en float32 compacts.
    const count = baked.getAttribute('position').count;
    const indices = count < 65536 ? Uint16Array.from(index.array) : Uint32Array.from(index.array);
    primitive.indices = accessors.push({
      bufferView: pushData(indices, 34963),
      componentType: indices instanceof Uint16Array ? 5123 : 5125,
      count: indices.length,
      type: 'SCALAR',
    }) - 1;
    for (const [gltfName, threeName] of Object.entries(ATTRIBUTES)) {
      const attribute = baked.getAttribute(threeName);
      if (!attribute) continue;
      const array = Float32Array.from(attribute.array);
      const accessor = {
        bufferView: pushData(array, 34962),
        componentType: 5126,
        count: attribute.count,
        type: 'VEC3',
      };
      if (gltfName === 'POSITION') {
        const min = [Infinity, Infinity, Infinity];
        const max = [-Infinity, -Infinity, -Infinity];
        for (let i = 0; i < attribute.count; i++) {
          for (let c = 0; c < 3; c++) {
            const value = array[i * 3 + c];
            if (value < min[c]) min[c] = value;
            if (value > max[c]) max[c] = value;
          }
        }
        Object.assign(accessor, { min, max });
      }
      primitive.attributes[gltfName] = accessors.push(accessor) - 1;
    }
  }
}

gltf.accessors = accessors;
gltf.bufferViews = bufferViews;
gltf.buffers = [{ uri: gltf.buffers[0].uri, byteLength }];
gltf.asset.extras = {
  ...gltf.asset.extras,
  hordeBakedNormals: { creaseAngleDeg: CREASE_ANGLE_DEG, droppedAttributes: DROPPED, script: 'scripts/build-arthur-model.mjs' },
  hordeMeshopt: { tool: GLTFPACK, args: GLTFPACK_ARGS.join(' ') },
};

const limits = { position: 1e-5, normal: 1e-5 };
for (const [name, error] of Object.entries(maxError)) {
  if (error > limits[name]) throw new Error(`Écart trop grand sur ${name} : ${error}. Rien n'est écrit.`);
}

console.log(`1. Normales : sommets ${verticesBefore} → ${verticesAfter}, écart max avec le calcul à l'exécution : position ${maxError.position}, normale ${maxError.normal}`);

// --- 2. Compression meshopt : on écrit l'étape 1 dans un dossier temporaire, gltfpack produit le modèle final ---
const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arthur-model-'));
try {
  const workGltf = path.join(workDir, 'scene.gltf');
  gltf.buffers[0].uri = 'scene.bin';
  fs.writeFileSync(path.join(workDir, 'scene.bin'), Buffer.concat(chunks));
  fs.writeFileSync(workGltf, JSON.stringify(gltf));
  const sizeBefore = bin.length + fs.statSync(gltfPath).size;
  execFileSync('npx', ['--yes', GLTFPACK, '-i', workGltf, '-o', gltfPath, ...GLTFPACK_ARGS], { stdio: 'inherit' });
  const sizeAfter = fs.statSync(gltfPath).size + fs.statSync(path.join(MODEL_DIR, 'scene.bin')).size;
  console.log(`2. Meshopt : modèle ${Math.round(sizeBefore / 1024)} Ko → ${Math.round(sizeAfter / 1024)} Ko (brut)`);
} finally {
  fs.rmSync(workDir, { recursive: true, force: true });
}
