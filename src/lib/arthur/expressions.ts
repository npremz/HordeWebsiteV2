/**
 * Arthur — vocabulaire d'expressions, de gestes et de réactions.
 *
 * Un visage est un jeu de nombres (forme des yeux, de la bouche, extras). Passer
 * d'une expression à l'autre revient à interpoler ces nombres : il n'y a donc
 * aucune image, et ajouter une expression = ajouter une entrée dans EXPRESSIONS.
 */

export interface EyeShape {
  /** Demi-largeur / demi-hauteur en px (canvas 512×384). */
  w: number;
  h: number;
  /** Paupière haute 0..1 et son inclinaison (rad, positif = coin intérieur plus bas → colère). */
  lid: number;
  lidA: number;
  /** Paupière basse 0..1. */
  bot: number;
  /** Croissant : 1 = arc « ∩ » (œil qui rit), -1 = arc « ∪ » (œil fermé). */
  curve: number;
  /** Décalage : x vers l'extérieur du visage, y vers le bas. */
  x: number;
  y: number;
  /** Sourcil : opacité, inclinaison (même convention que lidA), décalage vertical. */
  brow: number;
  browA: number;
  browY: number;
}

export interface MouthShape {
  /** Demi-largeur. */
  w: number;
  /** Ouverture verticale au centre. */
  open: number;
  /** Courbure : positif = sourire, négatif = moue. */
  curve: number;
  /** Épaisseur du trait. */
  thick: number;
  /** 0 = courbe douce, 1 = chevron en « V ». */
  point: number;
  /** Rotation (rad) pour les sourires en coin. */
  tilt: number;
  x: number;
  y: number;
}

export interface FaceFx {
  sweat: number;
  zzz: number;
  heart: number;
  qmark: number;
  /** Biais de regard propre à l'expression (-1..1). */
  gazeX: number;
  gazeY: number;
}

export interface FaceShape {
  l: EyeShape;
  r: EyeShape;
  mouth: MouthShape;
  fx: FaceFx;
}

const EYE: EyeShape = { w: 56, h: 58, lid: 0, lidA: 0, bot: 0, curve: 0, x: 0, y: 0, brow: 0, browA: 0, browY: 0 };
const MOUTH: MouthShape = { w: 48, open: 0, curve: 1.25, thick: 10, point: 1, tilt: 0, x: 0, y: 0 };
const FX: FaceFx = { sweat: 0, zzz: 0, heart: 0, qmark: 0, gazeX: 0, gazeY: 0 };

interface FaceSpec {
  /** Appliqué aux deux yeux, puis surchargé par l (œil gauche à l'écran) / r. */
  eyes?: Partial<EyeShape>;
  l?: Partial<EyeShape>;
  r?: Partial<EyeShape>;
  mouth?: Partial<MouthShape>;
  fx?: Partial<FaceFx>;
}

function face(spec: FaceSpec = {}): FaceShape {
  return {
    l: { ...EYE, ...spec.eyes, ...spec.l },
    r: { ...EYE, ...spec.eyes, ...spec.r },
    mouth: { ...MOUTH, ...spec.mouth },
    fx: { ...FX, ...spec.fx },
  };
}

export const EXPRESSIONS = {
  neutral: face(),
  happy: face({
    eyes: { w: 60, h: 34 },
    mouth: { w: 50, curve: 2.2, thick: 13, point: 0 },
  }),
  joy: face({
    eyes: { w: 58, h: 50, curve: 1 },
    mouth: { w: 58, open: 40, curve: 1.4, thick: 12, point: 0.2 },
  }),
  grin: face({
    mouth: { w: 70, open: 44, curve: 0.6, thick: 14, point: 0, y: 4 },
  }),
  smirk: face({
    r: { lid: 0.3 },
    mouth: { w: 46, curve: 1.2, tilt: -0.24, x: 12, point: 0.6 },
  }),
  wink: face({
    r: { w: 60, h: 46, curve: 1 },
  }),
  surprised: face({
    eyes: { w: 58, h: 64, y: -6 },
    mouth: { w: 10, open: 28, curve: 0, thick: 16, point: 0, y: 12 },
  }),
  shocked: face({
    eyes: { w: 30, h: 30, y: -12 },
    mouth: { w: 26, open: 62, curve: -0.4, thick: 14, point: 0 },
  }),
  content: face({
    eyes: { w: 60, h: 9 },
    mouth: { w: 30, curve: 1.4, thick: 10 },
  }),
  sleepy: face({
    eyes: { w: 52, h: 8, x: -8, y: 16 },
    mouth: { w: 8, open: 10, curve: 0, thick: 9, point: 0 },
    fx: { zzz: 1 },
  }),
  angry: face({
    eyes: { w: 56, h: 56, lid: 0.36, lidA: 0.38, brow: 1, browA: 0.38, browY: 42 },
    mouth: { w: 54, open: 14, curve: -0.5, thick: 13, point: 0, y: 6 },
  }),
  sad: face({
    eyes: { w: 50, h: 52, lid: 0.3, lidA: -0.4, y: 6 },
    mouth: { w: 36, curve: -1.6, point: 0.3, y: 10 },
  }),
  awkward: face({
    eyes: { w: 46, h: 48 },
    mouth: { w: 30, curve: 0, thick: 10, point: 0 },
    fx: { sweat: 1 },
  }),
  skeptical: face({
    l: { brow: 1, browA: -0.3, browY: -2 },
    r: { lid: 0.52 },
    mouth: { w: 28, curve: 0, tilt: -0.1, x: 18, point: 0 },
  }),
  curious: face({
    l: { w: 58, h: 64 },
    r: { w: 48, h: 52 },
    mouth: { w: 14, open: 8, curve: 0.4, thick: 10, point: 0 },
  }),
  confused: face({
    l: { lid: 0.3, brow: 1, browA: 0.2, browY: 24 },
    r: { brow: 1, browA: -0.35, browY: -2 },
    mouth: { w: 30, curve: -0.6, tilt: 0.16 },
    fx: { qmark: 1 },
  }),
  thinking: face({
    eyes: { w: 50, h: 54, lid: 0.18 },
    mouth: { w: 18, curve: 0, x: 22, thick: 10, point: 0 },
    fx: { gazeX: 0.75, gazeY: -0.8 },
  }),
  love: face({
    mouth: { w: 44, open: 22, curve: 1.6, point: 0.3 },
    fx: { heart: 1 },
  }),
  shy: face({
    eyes: { w: 58, h: 44, curve: -1, y: 6 },
    mouth: { w: 20, curve: 0.8, thick: 9 },
  }),
} satisfies Record<string, FaceShape>;

export type ExpressionName = keyof typeof EXPRESSIONS;
export const EXPRESSION_NAMES = Object.keys(EXPRESSIONS) as ExpressionName[];

export interface HeadPose {
  yaw: number;
  pitch: number;
  roll: number;
}

/** Posture de tête associée à une expression, et attention portée au curseur (0 = l'ignore). */
export const EXPRESSION_BODY: Partial<Record<ExpressionName, Partial<HeadPose> & { attention?: number }>> = {
  sleepy: { pitch: 0.17, roll: 0.13, attention: 0 },
  shy: { yaw: 0.36, pitch: 0.12, roll: -0.06, attention: 0 },
  thinking: { roll: -0.13, pitch: -0.08, attention: 0.25 },
  curious: { roll: 0.15 },
  confused: { roll: -0.17 },
  skeptical: { roll: 0.09, pitch: 0.05 },
  sad: { pitch: 0.16, attention: 0.5 },
  angry: { pitch: 0.1 },
  smirk: { roll: 0.07 },
  wink: { roll: 0.11 },
};

export const GESTURE_NAMES = ['nod', 'shake', 'jump', 'tilt', 'dance', 'spin', 'wobble'] as const;
export type GestureName = (typeof GESTURE_NAMES)[number];

export interface Reaction {
  face?: ExpressionName;
  gesture?: GestureName;
  /** Durée de l'expression en ms. Absent = l'expression devient l'humeur de fond. */
  hold?: number;
}

/** Scénarios prêts à l'emploi : une expression + un geste, à brancher sur les événements du formulaire. */
export const REACTIONS = {
  hello: { face: 'happy', gesture: 'tilt', hold: 2000 },
  focus: { face: 'curious' },
  typing: { face: 'neutral' },
  yes: { face: 'happy', gesture: 'nod', hold: 1500 },
  no: { face: 'skeptical', gesture: 'shake', hold: 1700 },
  oops: { face: 'awkward', gesture: 'wobble', hold: 2000 },
  like: { face: 'grin', gesture: 'jump', hold: 1400 },
  wink: { face: 'wink', hold: 1100 },
  poke: { face: 'surprised', gesture: 'jump', hold: 900 },
  annoyed: { face: 'angry', gesture: 'shake', hold: 2000 },
  secret: { face: 'shy' },
  thinking: { face: 'thinking' },
  success: { face: 'love', gesture: 'dance', hold: 3200 },
  error: { face: 'shocked', gesture: 'jump', hold: 2200 },
  sad: { face: 'sad', hold: 2200 },
  sleep: { face: 'sleepy' },
  wake: { face: 'surprised', gesture: 'jump', hold: 800 },
  calm: { face: 'neutral' },
} satisfies Record<string, Reaction>;

export type ReactionName = keyof typeof REACTIONS;
export const REACTION_NAMES = Object.keys(REACTIONS) as ReactionName[];

/* ---------- Aplatissement pour l'interpolation ---------- */

const EYE_KEYS = Object.keys(EYE) as (keyof EyeShape)[];
const MOUTH_KEYS = Object.keys(MOUTH) as (keyof MouthShape)[];
const FX_KEYS = Object.keys(FX) as (keyof FaceFx)[];

export const FACE_VALUE_COUNT = EYE_KEYS.length * 2 + MOUTH_KEYS.length + FX_KEYS.length;

export function writeFace(shape: FaceShape, out: Float64Array): void {
  let i = 0;
  for (const k of EYE_KEYS) out[i++] = shape.l[k];
  for (const k of EYE_KEYS) out[i++] = shape.r[k];
  for (const k of MOUTH_KEYS) out[i++] = shape.mouth[k];
  for (const k of FX_KEYS) out[i++] = shape.fx[k];
}

export function readFace(values: Float64Array, out: FaceShape): void {
  let i = 0;
  for (const k of EYE_KEYS) out.l[k] = values[i++];
  for (const k of EYE_KEYS) out.r[k] = values[i++];
  for (const k of MOUTH_KEYS) out.mouth[k] = values[i++];
  for (const k of FX_KEYS) out.fx[k] = values[i++];
}

export function blankFace(): FaceShape {
  return face();
}
