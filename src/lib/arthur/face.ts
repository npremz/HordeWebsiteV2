/**
 * Arthur — rendu du visage sur un canvas 2D (écran LED de la visière).
 *
 * Aucune dépendance : ce canvas sert de texture au modèle 3D, de vignette dans
 * la preview et de repli quand WebGL n'est pas disponible.
 */
import {
  EXPRESSIONS,
  FACE_VALUE_COUNT,
  blankFace,
  readFace,
  writeFace,
  type EyeShape,
  type ExpressionName,
  type FaceShape,
} from './expressions';

export const FACE_W = 512;
export const FACE_H = 384;
/** Résolution du canvas de sortie, en multiple du repère de dessin : 2 = diodes bien nettes. */
const RES = 2;
const OUT_W = FACE_W * RES;
const OUT_H = FACE_H * RES;
/** Résolution de la matrice de diodes. */
/** Rayon du halo autour des diodes allumées, en px du repère de dessin. */
const GLOW_RADIUS = 14;
/** Nombre de passes de halo : chaque passe le renforce. */
const GLOW_PASSES = 2;
const LED_COLS = 64;
const LED_ROWS = 48;

const EYE_DX = 104;
const EYE_Y = 176;
const MOUTH_Y = 262;
const GAZE_X = 20;
const GAZE_Y = 13;
/** Les formes sont décrites dans un repère « confortable », puis agrandies pour remplir l'écran. */
const ZOOM = 1;

const STIFFNESS = 260;
const DAMPING = 21;

export interface FaceOptions {
  /** Couleur des LED. */
  color?: string;
  /** Couleur du halo. */
  glow?: string;
}

export class FaceRenderer {
  readonly canvas: HTMLCanvasElement;
  autoBlink = true;

  private ctx: CanvasRenderingContext2D;
  private ink: HTMLCanvasElement;
  private ictx: CanvasRenderingContext2D;
  private led: HTMLCanvasElement;
  private lctx: CanvasRenderingContext2D;
  private mask: HTMLCanvasElement;
  private color: string;
  private glow: string;

  private cur = new Float64Array(FACE_VALUE_COUNT);
  private vel = new Float64Array(FACE_VALUE_COUNT);
  private target = new Float64Array(FACE_VALUE_COUNT);
  private shape: FaceShape = blankFace();

  private lookX = 0;
  private lookY = 0;
  private lookTX = 0;
  private lookTY = 0;

  private time = 0;
  private blink = 0;
  private blinkT = -1;
  private blinkQueue = 0;
  private nextBlink = 2;
  private dirty = true;

  constructor(options: FaceOptions = {}) {
    this.color = options.color ?? '#ffffff';
    this.glow = options.glow ?? 'rgba(175, 208, 255, 0.8)';

    this.canvas = document.createElement('canvas');
    this.canvas.width = OUT_W;
    this.canvas.height = OUT_H;
    this.ctx = this.canvas.getContext('2d')!;

    // L'encre est dessinée directement à la résolution de la matrice : un pixel = une diode.
    this.ink = document.createElement('canvas');
    this.ink.width = LED_COLS;
    this.ink.height = LED_ROWS;
    this.ictx = this.ink.getContext('2d')!;

    this.led = document.createElement('canvas');
    this.led.width = OUT_W;
    this.led.height = OUT_H;
    this.lctx = this.led.getContext('2d')!;

    // Masque : une pastille par diode, et un fond faible pour que les formes restent lisibles en petit.
    this.mask = document.createElement('canvas');
    this.mask.width = OUT_W;
    this.mask.height = OUT_H;
    const m = this.mask.getContext('2d')!;
    const cw = OUT_W / LED_COLS;
    const ch = OUT_H / LED_ROWS;
    m.fillStyle = 'rgba(255,255,255,0.3)';
    m.fillRect(0, 0, OUT_W, OUT_H);
    m.fillStyle = '#fff';
    for (let y = 0; y < LED_ROWS; y++) {
      for (let x = 0; x < LED_COLS; x++) {
        m.beginPath();
        m.roundRect(x * cw + cw * 0.08, y * ch + ch * 0.08, cw * 0.84, ch * 0.84, cw * 0.22);
        m.fill();
      }
    }

    this.setExpression('neutral', true);
  }

  setExpression(name: ExpressionName, immediate = false): void {
    writeFace(EXPRESSIONS[name], this.target);
    if (immediate) {
      this.cur.set(this.target);
      this.vel.fill(0);
    }
    this.dirty = true;
  }

  /** Direction du regard, -1..1 sur chaque axe. */
  setLook(x: number, y: number): void {
    this.lookTX = x;
    this.lookTY = y;
  }

  blinkNow(times = 1): void {
    if (this.blinkT < 0) this.blinkT = 0;
    this.blinkQueue = Math.max(this.blinkQueue, times - 1);
  }

  /** Avance l'animation. Renvoie true si le canvas a été redessiné. */
  update(dt: number): boolean {
    dt = Math.min(dt, 1 / 30);
    this.time += dt;
    let moving = this.dirty;

    for (let i = 0; i < FACE_VALUE_COUNT; i++) {
      const d = this.target[i] - this.cur[i];
      const v = this.vel[i] + (STIFFNESS * d - DAMPING * this.vel[i]) * dt;
      this.vel[i] = v;
      this.cur[i] += v * dt;
      if (Math.abs(d) > 0.004 || Math.abs(v) > 0.02) moving = true;
    }

    const k = 1 - Math.exp(-dt * 16);
    const lx = this.lookTX - this.lookX;
    const ly = this.lookTY - this.lookY;
    if (Math.abs(lx) > 0.001 || Math.abs(ly) > 0.001) {
      this.lookX += lx * k;
      this.lookY += ly * k;
      moving = true;
    }

    if (this.autoBlink && this.blinkT < 0) {
      this.nextBlink -= dt;
      if (this.nextBlink <= 0) {
        this.blinkT = 0;
        this.blinkQueue = Math.random() < 0.18 ? 1 : 0;
        this.nextBlink = 2.2 + Math.random() * 4;
      }
    }
    if (this.blinkT >= 0) {
      this.blinkT += dt / 0.17;
      this.blink = Math.sin(Math.min(this.blinkT, 1) * Math.PI);
      if (this.blinkT >= 1) {
        this.blink = 0;
        if (this.blinkQueue > 0) {
          this.blinkQueue--;
          this.blinkT = 0;
        } else {
          this.blinkT = -1;
        }
      }
      moving = true;
    }

    readFace(this.cur, this.shape);
    const fx = this.shape.fx;
    if (fx.zzz > 0.01 || fx.sweat > 0.01 || fx.heart > 0.01 || fx.qmark > 0.01) moving = true;

    if (!moving) return false;
    this.dirty = false;
    this.draw();
    return true;
  }

  /** Dessine une expression figée dans un autre canvas (vignettes). */
  static thumbnail(name: ExpressionName, target: HTMLCanvasElement, options?: FaceOptions): void {
    const face = new FaceRenderer(options);
    face.autoBlink = false;
    face.setExpression(name, true);
    face.time = 0.6;
    readFace(face.cur, face.shape);
    face.draw();
    const ctx = target.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(face.canvas, 0, 0, target.width, target.height);
  }

  private draw(): void {
    const c = this.ictx;
    const s = this.shape;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, LED_COLS, LED_ROWS);
    c.save();
    c.scale(LED_COLS / FACE_W, LED_ROWS / FACE_H);
    c.translate(FACE_W / 2, FACE_H / 2);
    c.scale(ZOOM, ZOOM);
    c.translate(-FACE_W / 2, -FACE_H / 2);
    c.fillStyle = this.color;
    c.strokeStyle = this.color;

    const gx = clamp(this.lookX + s.fx.gazeX, -1.2, 1.2) * GAZE_X;
    const gy = clamp(this.lookY + s.fx.gazeY, -1.2, 1.2) * GAZE_Y;

    const eyeAlpha = clamp(1 - s.fx.heart, 0, 1);
    this.drawEye(s.l, -1, gx, gy, eyeAlpha);
    this.drawEye(s.r, 1, gx, gy, eyeAlpha);
    if (s.fx.heart > 0.01) {
      const pulse = 1 + Math.sin(this.time * 7) * 0.07;
      for (const side of [-1, 1]) {
        this.drawHeart(FACE_W / 2 + side * EYE_DX + gx, EYE_Y + gy, 60 * s.fx.heart * pulse, clamp(s.fx.heart, 0, 1));
      }
    }
    this.drawMouth(gx * 0.6, gy * 0.6);
    this.drawExtras(gx, gy);
    c.restore();

    // Matrice LED : chaque cellule de l'encre basse résolution devient une diode.
    const l = this.lctx;
    l.globalCompositeOperation = 'source-over';
    l.clearRect(0, 0, OUT_W, OUT_H);
    l.imageSmoothingEnabled = false;
    l.drawImage(this.ink, 0, 0, OUT_W, OUT_H);
    // Passages supplémentaires : les diodes partiellement couvertes s'allument franchement,
    // ce qui donne des contours nets au lieu d'un dégradé.
    l.drawImage(this.ink, 0, 0, OUT_W, OUT_H);
    l.drawImage(this.ink, 0, 0, OUT_W, OUT_H);
    l.globalCompositeOperation = 'destination-in';
    l.drawImage(this.mask, 0, 0);

    const o = this.ctx;
    o.globalCompositeOperation = 'source-over';
    o.fillStyle = '#000';
    o.fillRect(0, 0, OUT_W, OUT_H);
    o.shadowColor = this.glow;
    o.shadowBlur = GLOW_RADIUS * RES;
    for (let i = 0; i < GLOW_PASSES; i++) o.drawImage(this.led, 0, 0);
    o.shadowBlur = 0;
    o.shadowColor = 'transparent';
    o.drawImage(this.led, 0, 0);
  }

  private drawEye(e: EyeShape, side: number, gx: number, gy: number, alpha: number): void {
    const c = this.ictx;
    const cx = FACE_W / 2 + side * (EYE_DX + e.x) + gx;
    const cy = EYE_Y + e.y + gy;
    const w = Math.max(e.w, 2);
    const h = Math.max(e.h * (1 - this.blink * 0.93), 3);

    if (alpha > 0.01) {
      c.save();
      c.globalAlpha = alpha;
      c.translate(cx, cy);

      const top = -h + clamp(e.lid, 0, 0.95) * 2 * h;
      const bottom = Math.max(h - clamp(e.bot, 0, 0.95) * 2 * h, top + 3);
      const slope = Math.tan(e.lidA) * -side;
      const reach = w + 60;
      c.beginPath();
      c.moveTo(-reach, top - slope * reach);
      c.lineTo(reach, top + slope * reach);
      c.lineTo(reach, bottom);
      c.lineTo(-reach, bottom);
      c.closePath();
      c.clip();

      c.beginPath();
      c.roundRect(-w, -h, w * 2, h * 2, Math.min(w, h));
      c.fill();

      const curve = clamp(e.curve, -1, 1);
      if (Math.abs(curve) > 0.02) {
        const shift = 2 * h * (1 - 0.78 * Math.abs(curve)) * Math.sign(curve);
        c.globalCompositeOperation = 'destination-out';
        c.globalAlpha = 1;
        c.beginPath();
        c.roundRect(-w * 1.04, -h + shift, w * 2.08, h * 2, Math.min(w, h));
        c.fill();
      }
      c.restore();
    }

    if (e.brow > 0.02) {
      c.save();
      c.globalAlpha = clamp(e.brow, 0, 1);
      c.translate(cx, cy - e.h - 16 + e.browY);
      c.rotate(e.browA * -side);
      c.beginPath();
      c.roundRect(-w - 4, -7, w * 2 + 8, 14, 7);
      c.fill();
      c.restore();
    }
  }

  private drawMouth(gx: number, gy: number): void {
    const c = this.ictx;
    const m = this.shape.mouth;
    const w = Math.max(m.w, 2);
    const open = Math.max(m.open, 0);
    const bend = m.curve * 22;
    const end = -bend * 0.5;
    const point = clamp(m.point, 0, 1);

    c.save();
    c.translate(FACE_W / 2 + m.x + gx, MOUTH_Y + m.y + gy);
    c.rotate(m.tilt);
    c.beginPath();
    c.moveTo(-w, end);
    this.mouthEdge(w, end, bend * 0.5 - open / 2, point, 1);
    this.mouthEdge(w, end, bend * 0.5 + open / 2, point, -1);
    c.closePath();
    c.lineWidth = Math.max(m.thick, 1);
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.stroke();
    c.fill();
    c.restore();
  }

  /**
   * Une lèvre : du coin gauche au coin droit (dir = 1) ou retour (dir = -1), en passant par
   * le milieu (0, mid). Les poignées glissent d'une courbe douce vers deux segments droits.
   */
  private mouthEdge(w: number, end: number, mid: number, point: number, dir: number): void {
    const c = this.ictx;
    const mix = (a: number, b: number) => a + (b - a) * point;
    const rise = mid - end;
    const outerX = mix(w * 0.72, w * (2 / 3));
    const outerY = mix(end + rise * 0.75, end + rise / 3);
    const innerX = mix(w * 0.42, w / 3);
    const innerY = mix(mid, end + (rise * 2) / 3);
    c.bezierCurveTo(-dir * outerX, outerY, -dir * innerX, innerY, 0, mid);
    c.bezierCurveTo(dir * innerX, innerY, dir * outerX, outerY, dir * w, end);
  }

  private drawHeart(x: number, y: number, size: number, alpha: number): void {
    if (size < 1) return;
    const c = this.ictx;
    const s = size / 30;
    c.save();
    c.globalAlpha = alpha;
    c.translate(x, y + 4 * s);
    c.scale(s, s);
    c.beginPath();
    c.moveTo(0, 26);
    c.bezierCurveTo(-40, -2, -30, -34, -13, -30);
    c.bezierCurveTo(-5, -28, 0, -20, 0, -14);
    c.bezierCurveTo(0, -20, 5, -28, 13, -30);
    c.bezierCurveTo(30, -34, 40, -2, 0, 26);
    c.closePath();
    c.fill();
    c.restore();
  }

  private drawExtras(gx: number, gy: number): void {
    const c = this.ictx;
    const fx = this.shape.fx;

    if (fx.sweat > 0.02) {
      const slide = ((this.time * 0.55) % 1) * 26;
      c.save();
      c.globalAlpha = clamp(fx.sweat, 0, 1) * (1 - slide / 34);
      c.translate(FACE_W / 2 - EYE_DX - 68 + gx * 0.4, EYE_Y - 30 + slide + gy * 0.4);
      c.beginPath();
      c.moveTo(0, -17);
      c.bezierCurveTo(4, -8, 10, -2, 10, 5);
      c.arc(0, 5, 10, 0, Math.PI);
      c.bezierCurveTo(-10, -2, -4, -8, 0, -17);
      c.closePath();
      c.fill();
      c.restore();
    }

    if (fx.zzz > 0.02) {
      c.save();
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      const sizes = [20, 26, 34];
      for (let i = 0; i < 3; i++) {
        const phase = (this.time * 0.5 + i * 0.33) % 1;
        c.globalAlpha = clamp(fx.zzz, 0, 1) * Math.sin(phase * Math.PI);
        c.font = `700 ${sizes[i]}px ui-monospace, "PP Fraktion Mono", monospace`;
        c.fillText('z', FACE_W / 2 + EYE_DX + 66 + i * 12, EYE_Y - 4 - i * 26 - phase * 8);
      }
      c.restore();
    }

    if (fx.qmark > 0.02) {
      c.save();
      c.globalAlpha = clamp(fx.qmark, 0, 1);
      c.translate(FACE_W / 2, EYE_Y - 52);
      c.rotate(Math.sin(this.time * 3) * 0.14);
      c.scale(fx.qmark, fx.qmark);
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.font = '700 44px ui-monospace, "PP Fraktion Mono", monospace';
      c.fillText('?', 0, 0);
      c.restore();
    }
  }
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}
