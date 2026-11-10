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
  DirectionalLight,
  DoubleSide,
  Group,
  LoadingManager,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  NeutralToneMapping,
  PerspectiveCamera,
  PMREMGenerator,
  SRGBColorSpace,
  Scene,
  Vector3,
  WebGLRenderer,
  type Material,
  type MeshStandardMaterial,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
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

export async function createBody(container: HTMLElement, faceCanvas: HTMLCanvasElement): Promise<Body> {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  // Neutre (Khronos PBR) : garde l'orange du modèle sans le délaver ni le saturer.
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.5;

  const key = new DirectionalLight(0xffffff, 1.5);
  key.position.set(-180, 760, 520);
  scene.add(key);
  const rim = new DirectionalLight(0xffffff, 0.5);
  rim.position.set(-420, 300, -260);
  scene.add(rim);

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
    renderer.dispose();
    throw error;
  }

  const rig = new Group();
  rig.add(gltf.scene);
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

  if (visor) {
    const source = visor as Mesh;
    // Visière moins miroir : le reflet de l'environnement ne doit pas noyer le visage.
    const glass = (source.material as MeshStandardMaterial).clone();
    glass.envMapIntensity = 0.15;
    glass.roughness = 0.62;
    source.material = glass;
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

  const resize = () => {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);
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
      renderer.render(scene, camera);
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
      envTarget.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
