/**
 * Arthur — scène three.js : charge le modèle, isole la tête sur un pivot et
 * plaque le canvas du visage sur la visière.
 *
 * Le glTF n'a ni squelette ni animation : les pièces sont à plat sous la racine.
 * On regroupe donc celles de la tête d'après leur position.
 */
import {
  AdditiveBlending,
  Box3,
  BufferAttribute,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  LoadingManager,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  HalfFloatType,
  HemisphereLight,
  NeutralToneMapping,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  SRGBColorSpace,
  Scene,
  VSMShadowMap,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
  type Material,
  type MeshStandardMaterial,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import gltfUrl from '../../assets/arthur_model/scene.gltf?url';
import binUrl from '../../assets/arthur_model/scene.bin?url';
import { FACE_H, FACE_W } from './face';

/** Base du cou, en unités du modèle (≈ cm). */
const NECK = new Vector3(1, 290, -1);
/** Le modèle est livré la tête penchée : on la redresse pour un portrait de face. */
const HEAD_FIX_ROLL = 0.112;
const HEAD_FIX_YAW = 0.076;
/** Largeur de l'écran du visage, relative à la largeur de la visière. */
const FACE_SPAN = 1.0;
const FACE_OFFSET_Y = 0;

/** Carapace : plastique satiné, comme le rendu par défaut de Sketchfab. */
const SHELL_METALNESS = 0;
const SHELL_ROUGHNESS = 0.42;
/** Vernis : c'est lui qui renvoie les reflets doux et larges des lumières du studio. */
const SHELL_COAT = 1;
const SHELL_COAT_ROUGHNESS = 0.1;

/** Lumière du dessus : position, intensité, douceur du bord de l'ombre. */
const TOP_LIGHT_POS = new Vector3(-260, 940, 420);
const TOP_LIGHT_INTENSITY = 1.15;
const SHADOW_SOFTNESS = 9;
/** Lumière d'ambiance : ciel clair, sol sombre et chaud, pour un dégradé doux de haut en bas. */
const AMBIENT_INTENSITY = 0.36;
const ENV_INTENSITY = 0.42;
const EXPOSURE = 1;
/** Teinte de la carapace : décalages HSL appliqués à la couleur du modèle (vers un orange plus brun). */
const SHELL_HUE = 0.012;
const SHELL_SATURATION = -0.1;
const SHELL_LIGHTNESS = -0.025;

/** Occlusion ambiante : force (0 = aucune) et portée en unités du modèle (≈ cm). */
const AO_INTENSITY = 1;
const AO_RADIUS = 60;
const AO_SCALE = 2.4;
/** L'occlusion assombrit aussi la visière, en retrait : on rallume l'écran d'autant. */
const FACE_BRIGHTNESS = 1.15;

const CAMERA_FOV = 26;
const CAMERA_POS = new Vector3(0, 394, 585);
const CAMERA_TARGET = new Vector3(0, 392, 0);

/** Le modèle lève le bras droit : on rabat l'épaule puis le bras, en miroir de l'autre côté. */
const SHOULDER_PIVOT = new Vector3(-30, 268, 0);
const SHOULDER_DOWN = 0.96;
const ARM_PIVOT = new Vector3(-120, 293, 5);
const ARM_DOWN = 0.87;

export interface BodyPose {
  yaw: number;
  pitch: number;
  roll: number;
  /** Rebond vertical de tout le robot. */
  lift: number;
}

export interface Body {
  readonly canvas: HTMLCanvasElement;
  apply(pose: BodyPose): void;
  faceChanged(): void;
  render(): void;
  resize(): void;
  dispose(): void;
}

/**
 * Sources lumineuses reflétées par la visière, sur fond noir. Chaque source : azimut (degrés,
 * 0 = derrière la caméra, positif = à droite de l'écran), largeur angulaire, intensité,
 * hauteur du centre, hauteur, inclinaison (rad).
 */
const GLASS_LIGHTS: [azimuth: number, width: number, intensity: number, y: number, height: number, roll: number][] = [
  // // Large pan de lumière incliné, côté gauche, doublé d'un filet.
  // [-62, 20, 4, 0, 30, 0.42],
  // [-41, 2, 5.5, 0, 30, 0.42],
  // // Filet vif près du bord droit.
  [60, 2.5, 1.8, 0, 30, 0.42],
  // // Lueur large et faible côté droit, pour que le bord accroche la lumière.
  [92, 30, 1.8, 0, 30, 0],
];
/** Flou des reflets (rad) : 0 = arêtes nettes. */
const GLASS_BLUR = 0.04;

function createGlassStudio(): Scene {
  const studio = new Scene();
  const radius = 10;
  for (const [azimuth, width, intensity, y, height, roll] of GLASS_LIGHTS) {
    const angle = (azimuth * Math.PI) / 180;
    const light = new Mesh(
      new PlaneGeometry(2 * radius * Math.tan((width * Math.PI) / 360), height),
      new MeshBasicMaterial({ color: new Color(intensity, intensity, intensity), side: DoubleSide }),
    );
    light.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
    light.lookAt(0, y, 0);
    light.rotateZ(roll);
    studio.add(light);
  }
  return studio;
}

export async function createBody(container: HTMLElement, faceCanvas: HTMLCanvasElement): Promise<Body> {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  // Neutre (Khronos PBR) : restitue la couleur du modèle sans la délaver.
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = EXPOSURE;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.045);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = ENV_INTENSITY;
  scene.add(new HemisphereLight(0xffffff, 0x4a3a30, AMBIENT_INTENSITY));

  // Lumière principale : vient du dessus, légèrement devant, pour que la casquette
  // projette une ombre douce sur le haut du visage.
  const key = new DirectionalLight(0xffffff, TOP_LIGHT_INTENSITY);
  key.position.copy(TOP_LIGHT_POS);
  key.target.position.copy(CAMERA_TARGET);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -280;
  key.shadow.camera.right = 280;
  key.shadow.camera.top = 280;
  key.shadow.camera.bottom = -280;
  key.shadow.camera.near = 100;
  key.shadow.camera.far = 1300;
  key.shadow.radius = SHADOW_SOFTNESS;
  key.shadow.blurSamples = 16;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 2.5;
  scene.add(key, key.target);
  // Appoint de face, sans ombre, pour que le dessous de la casquette ne soit pas bouché.
  const fill = new DirectionalLight(0xffffff, 0.25);
  fill.position.set(-460, 430, 520);
  fill.target.position.copy(CAMERA_TARGET);
  scene.add(fill, fill.target);
  const rim = new DirectionalLight(0xffffff, 0.3);
  rim.position.set(-420, 300, -260);
  scene.add(rim);

  // Le verre a son propre décor de reflets, sur fond noir : ils glissent sur la visière
  // quand la tête tourne. Le métal, lui, reflète la pièce.
  const glassEnv = pmrem.fromScene(createGlassStudio(), GLASS_BLUR);

  const camera = new PerspectiveCamera(CAMERA_FOV, 1, 50, 4000);
  camera.position.copy(CAMERA_POS);
  camera.lookAt(CAMERA_TARGET);

  const manager = new LoadingManager();
  manager.setURLModifier((url) => (/scene\.bin(\?.*)?$/.test(url) ? binUrl : url));
  let gltf;
  try {
    gltf = await new GLTFLoader(manager).loadAsync(gltfUrl);
  } catch (error) {
    pmrem.dispose();
    envTarget.dispose();
    glassEnv.dispose();
    renderer.dispose();
    throw error;
  }

  const rig = new Group();
  rig.add(gltf.scene);
  gltf.scene.traverse((object) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
  scene.add(rig);
  rig.updateMatrixWorld(true);

  // --- Tri des pièces : tête, visière, visage d'origine (masqué) ---
  const box = new Box3();
  const center = new Vector3();
  const size = new Vector3();
  const headMeshes: Mesh[] = [];
  const armMeshes: Mesh[] = [];
  const shoulderMeshes: Mesh[] = [];
  let visor: Mesh | null = null;
  let visorWidth = 0;

  gltf.scene.traverse((object) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) return;
    box.setFromObject(mesh);
    box.getCenter(center);
    box.getSize(size);
    if (center.x < -115 && center.y > 270) {
      armMeshes.push(mesh);
      return;
    }
    if (center.x < -60 && center.y > 250 && center.y < 320) {
      shoulderMeshes.push(mesh);
      return;
    }
    if (center.y < 320 || center.x < -115 || center.x > 165) return;

    headMeshes.push(mesh);
    const material = mesh.material as MeshStandardMaterial;
    const isOriginalFace =
      material.name === 'Material.005' || (material.color.r > 0.9 && material.color.g > 0.9 && material.color.b > 0.9);
    if (isOriginalFace) {
      mesh.visible = false;
    } else if (material.color.r < 0.05 && size.x > visorWidth) {
      visor = mesh;
      visorWidth = size.x;
    }
  });

  const shoulderPivot = new Group();
  shoulderPivot.position.copy(SHOULDER_PIVOT);
  rig.add(shoulderPivot);
  const armPivot = new Group();
  armPivot.position.copy(ARM_PIVOT).sub(SHOULDER_PIVOT);
  shoulderPivot.add(armPivot);
  rig.updateMatrixWorld(true);
  for (const mesh of shoulderMeshes) shoulderPivot.attach(mesh);
  for (const mesh of armMeshes) armPivot.attach(mesh);
  shoulderPivot.rotation.z = SHOULDER_DOWN;
  armPivot.rotation.z = ARM_DOWN;

  // --- Carapace ---
  const shellMaterials = new Map<Material, MeshPhysicalMaterial>();
  gltf.scene.traverse((object) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) return;
    const source = mesh.material as MeshStandardMaterial;
    if (!(source.color.r > 0.4 && source.color.g < 0.25)) return;
    let shell = shellMaterials.get(source);
    if (!shell) {
      shell = new MeshPhysicalMaterial({
        color: source.color.clone().offsetHSL(SHELL_HUE, SHELL_SATURATION, SHELL_LIGHTNESS),
        metalness: SHELL_METALNESS,
        roughness: SHELL_ROUGHNESS,
        clearcoat: SHELL_COAT,
        clearcoatRoughness: SHELL_COAT_ROUGHNESS,
        side: DoubleSide,
      });
      shellMaterials.set(source, shell);
    }
    mesh.material = shell;
  });

  const headPivot = new Group();
  headPivot.position.copy(NECK);
  headPivot.rotation.order = 'YXZ';
  rig.add(headPivot);
  const headFix = new Group();
  headPivot.add(headFix);
  rig.updateMatrixWorld(true);
  for (const mesh of headMeshes) headFix.attach(mesh);
  headFix.rotation.set(0, HEAD_FIX_YAW, HEAD_FIX_ROLL);
  rig.updateMatrixWorld(true);

  // --- Écran du visage : copie de la visière, UV projetés de face ---
  const texture = new CanvasTexture(faceCanvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const faceMaterial = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    toneMapped: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
  });

  faceMaterial.color.setScalar(FACE_BRIGHTNESS);

  if (visor) {
    const source = visor as Mesh;
    // Visière : anthracite brillant, qui ne reflète que ses propres sources de lumière.
    source.material = new MeshPhysicalMaterial({
      // Pas tout à fait noir : la lumière du dessus et l'ombre de la casquette s'y lisent.
      color: 0x5c5e66,
      metalness: 0,
      roughness: 0.28,
      ior: 1.5,
      envMap: glassEnv.texture,
      envMapIntensity: 1,
      side: DoubleSide,
    });
    const geometry = source.geometry.clone();
    const position = geometry.getAttribute('position');
    const toHead = new Matrix4().copy(headPivot.matrixWorld).invert().multiply(source.matrixWorld);
    const v = new Vector3();
    const points = new Float32Array(position.count * 2);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < position.count; i++) {
      v.fromBufferAttribute(position, i).applyMatrix4(toHead);
      points[i * 2] = v.x;
      points[i * 2 + 1] = v.y;
      minX = Math.min(minX, v.x);
      maxX = Math.max(maxX, v.x);
      minY = Math.min(minY, v.y);
      maxY = Math.max(maxY, v.y);
    }
    const spanX = (maxX - minX) * FACE_SPAN;
    const spanY = spanX * (FACE_H / FACE_W);
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2 + FACE_OFFSET_Y;
    const uv = new Float32Array(position.count * 2);
    for (let i = 0; i < position.count; i++) {
      uv[i * 2] = (points[i * 2] - midX) / spanX + 0.5;
      uv[i * 2 + 1] = (points[i * 2 + 1] - midY) / spanY + 0.5;
    }
    geometry.setAttribute('uv', new BufferAttribute(uv, 2));
    const screen = new Mesh(geometry, faceMaterial);
    screen.renderOrder = 2;
    source.add(screen);
  }

  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  // --- Occlusion ambiante : assombrit les creux (sous la casquette, jointures, cou) ---
  const composer = new EffectComposer(renderer, new WebGLRenderTarget(1, 1, { type: HalfFloatType, samples: 4 }));
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.addPass(new RenderPass(scene, camera));
  const occlusion = new GTAOPass(scene, camera, 1, 1);
  occlusion.blendIntensity = AO_INTENSITY;
  occlusion.updateGtaoMaterial({ radius: AO_RADIUS, distanceExponent: 1, thickness: AO_RADIUS, scale: AO_SCALE, samples: 16 });
  composer.addPass(occlusion);
  composer.addPass(new OutputPass());

  const resize = () => {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();

  return {
    canvas,
    apply(pose) {
      headPivot.rotation.set(pose.pitch, pose.yaw, pose.roll);
      rig.rotation.y = pose.yaw * 0.2;
      rig.rotation.z = pose.roll * 0.12;
      rig.position.y = pose.lift;
    },
    faceChanged() {
      texture.needsUpdate = true;
    },
    render() {
      composer.render();
    },
    resize,
    dispose() {
      canvas.remove();
      scene.traverse((object) => {
        const mesh = object as Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material: Material) => material.dispose());
      });
      texture.dispose();
      occlusion.dispose();
      composer.dispose();
      envTarget.dispose();
      glassEnv.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
