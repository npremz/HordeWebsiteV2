/**
 * Arthur — contrôleur : humeur, expressions temporaires, gestes, regard.
 *
 * Ce module ne dépend pas de three.js : la scène 3D (./body) est chargée à la
 * demande, et le visage 2D sert de repli si WebGL ou le modèle échouent.
 */
import {
  EXPRESSIONS,
  EXPRESSION_BODY,
  REACTIONS,
  type ExpressionName,
  type GestureName,
  type Reaction,
  type ReactionName,
} from './expressions';
import { FaceRenderer, type FaceOptions } from './face';
import type { Body } from './body';

export interface ArthurOptions {
  /** La tête et les yeux suivent le curseur. Défaut : true. */
  followPointer?: boolean;
  /** S'endort après ce délai sans activité (ms). 0 = jamais. Défaut : 0. */
  idleSleepMs?: number;
  /** Réagit au survol et au clic sur la bulle. Défaut : true. */
  interactive?: boolean;
  /** Réduit les mouvements. Défaut : préférence système. */
  reducedMotion?: boolean;
  face?: FaceOptions;
}

export type ArthurEvent =
  | { type: 'ready'; webgl: boolean }
  | { type: 'expression'; name: ExpressionName }
  | { type: 'gesture'; name: GestureName }
  | { type: 'reaction'; name: ReactionName };

interface GesturePose {
  yaw: number;
  pitch: number;
  roll: number;
  lift: number;
}

const env = (p: number) => Math.sin(p * Math.PI);
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

const GESTURES: Record<GestureName, { duration: number; apply(p: number, out: GesturePose): void }> = {
  nod: {
    duration: 0.95,
    apply(p, o) {
      o.pitch += Math.sin(p * Math.PI * 5) * 0.2 * env(p);
    },
  },
  shake: {
    duration: 0.95,
    apply(p, o) {
      o.yaw += Math.sin(p * Math.PI * 6) * 0.3 * env(p);
    },
  },
  jump: {
    duration: 0.5,
    apply(p, o) {
      o.lift += env(p) * 22;
      o.pitch -= env(p) * 0.1;
    },
  },
  tilt: {
    duration: 1.5,
    apply(p, o) {
      o.roll += 0.2 * smooth(0, 0.25, p) * (1 - smooth(0.7, 1, p));
    },
  },
  dance: {
    duration: 2.6,
    apply(p, o) {
      o.roll += Math.sin(p * Math.PI * 10) * 0.19 * env(p);
      o.lift += Math.abs(Math.sin(p * Math.PI * 10)) * 12 * env(p);
      o.yaw += Math.sin(p * Math.PI * 5) * 0.22 * env(p);
    },
  },
  spin: {
    duration: 1,
    apply(p, o) {
      o.yaw += Math.PI * 2 * easeInOut(p);
      o.lift += env(p) * 10;
    },
  },
  wobble: {
    duration: 1.1,
    apply(p, o) {
      o.roll += Math.sin(p * Math.PI * 8) * 0.12 * env(p);
    },
  },
};

export class Arthur {
  readonly container: HTMLElement;
  readonly face: FaceRenderer;
  /** Résolue quand le robot est affiché (3D ou repli 2D). */
  readonly ready: Promise<void>;

  private followPointer: boolean;
  private idleSleepMs: number;
  private reducedMotion: boolean;

  private mood: ExpressionName = 'neutral';
  private override: { name: ExpressionName; until: number } | null = null;
  private asleep = false;
  private shown: ExpressionName = 'neutral';
  private gestures: { name: GestureName; t: number }[] = [];

  private pointer: { x: number; y: number } | null = null;
  private lookTarget: { el: Element; fx: number } | { x: number; y: number } | null = null;
  private yaw = 0;
  private pitch = 0;
  private roll = 0;
  private vYaw = 0;
  private vPitch = 0;
  private vRoll = 0;

  private body: Body | null = null;
  private listeners = new Set<(event: ArthurEvent) => void>();
  private cleanup: (() => void)[] = [];
  private raf = 0;
  private last = 0;
  private clock = 0;
  private lastActivity = performance.now();
  private visible = true;
  private destroyed = false;
  private pokes: number[] = [];
  private lastHover = 0;

  constructor(container: HTMLElement, options: ArthurOptions = {}) {
    this.container = container;
    this.followPointer = options.followPointer ?? true;
    this.idleSleepMs = options.idleSleepMs ?? 0;
    this.reducedMotion = options.reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.face = new FaceRenderer(options.face);

    this.listen(window, 'pointermove', (event) => {
      const e = event as PointerEvent;
      this.pointer = { x: e.clientX, y: e.clientY };
      this.activity(true);
    });
    this.listen(window, 'pointerdown', (event) => {
      const e = event as PointerEvent;
      this.pointer = { x: e.clientX, y: e.clientY };
      this.activity(true);
    });
    this.listen(window, 'keydown', () => this.activity(true));
    this.listen(document, 'visibilitychange', () => this.schedule());

    if (options.interactive ?? true) {
      this.listen(container, 'pointerenter', () => {
        const now = performance.now();
        if (this.override || this.mood !== 'neutral' || now - this.lastHover < 5000) return;
        this.lastHover = now;
        this.react('wink');
      });
      this.listen(container, 'click', () => {
        const now = performance.now();
        this.pokes = this.pokes.filter((t) => now - t < 2500);
        this.pokes.push(now);
        if (this.pokes.length >= 3) {
          this.pokes = [];
          this.react('annoyed');
        } else {
          this.react('poke');
        }
      });
    }

    const observer = new IntersectionObserver((entries) => {
      this.visible = entries[entries.length - 1]?.isIntersecting ?? true;
      this.schedule();
    });
    observer.observe(container);
    const resizer = new ResizeObserver(() => this.body?.resize());
    resizer.observe(container);
    this.cleanup.push(() => observer.disconnect(), () => resizer.disconnect());

    this.ready = this.loadBody();
    this.schedule();
  }

  /* ---------- API publique ---------- */

  /**
   * Humeur de fond : reste affichée tant qu'on ne la change pas.
   * Une expression temporaire en cours va à son terme, sauf si interrupt vaut true.
   */
  setMood(name: ExpressionName, interrupt = false): void {
    if (!(name in EXPRESSIONS)) return;
    this.activity(false);
    this.mood = name;
    if (interrupt) this.override = null;
    this.refreshExpression();
  }

  /** Expression temporaire, puis retour à l'humeur de fond. */
  express(name: ExpressionName, holdMs = 1600): void {
    if (!(name in EXPRESSIONS)) return;
    this.activity(false);
    this.override = { name, until: performance.now() + holdMs };
    this.refreshExpression();
  }

  /** Mouvement de tête ponctuel. */
  gesture(name: GestureName): void {
    if (!(name in GESTURES)) return;
    this.activity(false);
    this.emit({ type: 'gesture', name });
    if (this.reducedMotion) return;
    this.gestures = this.gestures.filter((g) => g.name !== name);
    this.gestures.push({ name, t: 0 });
  }

  /** Scénario nommé (voir REACTIONS) ou combinaison libre expression + geste. */
  react(reaction: ReactionName | Reaction): void {
    const preset: Reaction | undefined = typeof reaction === 'string' ? REACTIONS[reaction] : reaction;
    if (!preset) return;
    if (typeof reaction === 'string') this.emit({ type: 'reaction', name: reaction });
    if (preset.face) {
      if (preset.hold === undefined) this.setMood(preset.face);
      else this.express(preset.face, preset.hold);
    }
    if (preset.gesture) this.gesture(preset.gesture);
  }

  /** Regarde un point de l'écran (coordonnées client) jusqu'à releaseLook(). */
  lookAt(x: number, y: number): void {
    this.lookTarget = { x, y };
  }

  /** Regarde un élément ; fx = position horizontale dans l'élément (0 = bord gauche, 1 = bord droit). */
  lookAtElement(el: Element, fx = 0.5): void {
    this.lookTarget = { el, fx };
  }

  /** Rend le regard au curseur. */
  releaseLook(): void {
    this.lookTarget = null;
  }

  setFollowPointer(enabled: boolean): void {
    this.followPointer = enabled;
  }

  setIdleSleep(ms: number): void {
    this.idleSleepMs = ms;
    this.lastActivity = performance.now();
  }

  setAutoBlink(enabled: boolean): void {
    this.face.autoBlink = enabled;
  }

  setReducedMotion(enabled: boolean): void {
    this.reducedMotion = enabled;
    if (enabled) this.gestures = [];
  }

  get expression(): ExpressionName {
    return this.shown;
  }

  on(listener: (event: ArthurEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  destroy(): void {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
    this.listeners.clear();
    this.body?.dispose();
    this.body = null;
    this.face.canvas.remove();
  }

  /* ---------- Interne ---------- */

  private async loadBody(): Promise<void> {
    let webgl = false;
    try {
      const { createBody } = await import('./body');
      const body = await createBody(this.container, this.face.canvas);
      if (this.destroyed) {
        body.dispose();
        return;
      }
      this.body = body;
      this.face.setExpression(this.shown, true);
      webgl = true;
    } catch (error) {
      if (this.destroyed) return;
      console.warn('[arthur] rendu 3D indisponible, repli sur le visage 2D.', error);
      this.face.canvas.setAttribute('aria-hidden', 'true');
      this.container.appendChild(this.face.canvas);
    }
    this.container.dataset.arthurState = webgl ? 'ready' : 'fallback';
    this.emit({ type: 'ready', webgl });
  }

  private listen(target: EventTarget, type: string, handler: (event: Event) => void): void {
    target.addEventListener(type, handler, { passive: true });
    this.cleanup.push(() => target.removeEventListener(type, handler));
  }

  private emit(event: ArthurEvent): void {
    this.listeners.forEach((listener) => listener(event));
  }

  private activity(fromUser: boolean): void {
    this.lastActivity = performance.now();
    if (!this.asleep) return;
    this.asleep = false;
    if (fromUser) this.react('wake');
    else this.refreshExpression();
  }

  private refreshExpression(): void {
    const name = this.asleep ? 'sleepy' : (this.override?.name ?? this.mood);
    if (name === this.shown) return;
    this.shown = name;
    this.face.setExpression(name);
    this.emit({ type: 'expression', name });
  }

  private schedule(): void {
    cancelAnimationFrame(this.raf);
    if (this.destroyed || !this.visible || document.hidden) return;
    this.last = 0;
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number): void => {
    this.raf = requestAnimationFrame(this.frame);
    const dt = this.last ? Math.min((now - this.last) / 1000, 0.05) : 1 / 60;
    this.last = now;
    this.clock += dt;

    if (this.override && now >= this.override.until) {
      this.override = null;
      this.refreshExpression();
    }
    if (this.idleSleepMs > 0 && !this.asleep && !this.override && now - this.lastActivity > this.idleSleepMs) {
      this.asleep = true;
      this.refreshExpression();
    }

    // Regard : cible explicite, sinon curseur.
    let nx = 0;
    let ny = 0;
    const point = this.resolveLook();
    if (point) {
      const rect = this.container.getBoundingClientRect();
      const reach = Math.max(rect.width * 1.8, 420);
      nx = Math.tanh((point.x - (rect.left + rect.width / 2)) / reach);
      ny = Math.tanh((point.y - (rect.top + rect.height / 2)) / reach);
    }
    const bodyHint = EXPRESSION_BODY[this.shown];
    const attention = bodyHint?.attention ?? 1;
    nx *= attention;
    ny *= attention;
    this.face.setLook(nx, ny);

    const amount = this.reducedMotion ? 0.3 : 1;
    const targetYaw = nx * 0.44 * amount + (bodyHint?.yaw ?? 0) * amount;
    const targetPitch = ny * 0.3 * amount + (bodyHint?.pitch ?? 0) * amount;
    const targetRoll = -nx * 0.07 * amount + (bodyHint?.roll ?? 0) * amount;
    const k = 70;
    const c = 13;
    this.vYaw += (k * (targetYaw - this.yaw) - c * this.vYaw) * dt;
    this.vPitch += (k * (targetPitch - this.pitch) - c * this.vPitch) * dt;
    this.vRoll += (k * (targetRoll - this.roll) - c * this.vRoll) * dt;
    this.yaw += this.vYaw * dt;
    this.pitch += this.vPitch * dt;
    this.roll += this.vRoll * dt;

    const pose: GesturePose = { yaw: this.yaw, pitch: this.pitch, roll: this.roll, lift: 0 };
    if (!this.reducedMotion) {
      const breath = this.shown === 'sleepy' ? 0.9 : 1.7;
      pose.lift += Math.sin(this.clock * breath) * 2.2;
      pose.roll += Math.sin(this.clock * 0.9) * 0.012;
      if (this.shown === 'sleepy') pose.pitch += Math.sin(this.clock * 0.9) * 0.035;
    }
    for (const g of this.gestures) {
      const def = GESTURES[g.name];
      g.t += dt / def.duration;
      if (g.t < 1) def.apply(g.t, pose);
    }
    this.gestures = this.gestures.filter((g) => g.t < 1);

    const faceChanged = this.face.update(dt);
    if (this.body) {
      if (faceChanged) this.body.faceChanged();
      this.body.apply(pose);
      this.body.render();
    }
  };

  private resolveLook(): { x: number; y: number } | null {
    const target = this.lookTarget;
    if (target) {
      if ('el' in target) {
        if (!target.el.isConnected) {
          this.lookTarget = null;
          return this.followPointer ? this.pointer : null;
        }
        const rect = target.el.getBoundingClientRect();
        return { x: rect.left + rect.width * target.fx, y: rect.top + rect.height / 2 };
      }
      return target;
    }
    return this.followPointer ? this.pointer : null;
  }
}

export function createArthur(container: HTMLElement, options?: ArthurOptions): Arthur {
  return new Arthur(container, options);
}
