/**
 * Arthur — montage des bulles `[data-arthur]` et accès au contrôleur.
 *
 * Depuis n'importe quel script :
 *   const arthur = await whenArthurReady(document.querySelector('[data-arthur]'));
 *   arthur.react('success');
 *
 * Ou sans référence, via un événement global :
 *   window.dispatchEvent(new CustomEvent('arthur:react', { detail: 'success' }));
 */
import type { Arthur, ArthurOptions } from './arthur';
import type { Reaction, ReactionName } from './expressions';

const mounted = new Map<HTMLElement, Promise<Arthur>>();
let globalBound = false;

function readOptions(el: HTMLElement): ArthurOptions {
  const options: ArthurOptions = {};
  const { arthurFollow, arthurIdleSleep, arthurInteractive } = el.dataset;
  if (arthurFollow !== undefined) options.followPointer = arthurFollow !== 'false';
  if (arthurInteractive !== undefined) options.interactive = arthurInteractive !== 'false';
  if (arthurIdleSleep !== undefined) options.idleSleepMs = Number(arthurIdleSleep) || 0;
  return options;
}

export function mountArthur(el: HTMLElement): Promise<Arthur> {
  let pending = mounted.get(el);
  if (!pending) {
    pending = import('./arthur').then(({ createArthur }) => createArthur(el, readOptions(el)));
    mounted.set(el, pending);
  }
  return pending;
}

/** Monte toutes les bulles de la page. Sans effet sur celles déjà montées. */
export function mountAllArthurs(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-arthur]').forEach((el) => void mountArthur(el));
  bindGlobalReact();
}

/**
 * Distance d'avance avant qu'une bulle n'entre à l'écran : le temps de charger three.js et le
 * modèle (≈ 600 Ko compressés) pour qu'Arthur soit prêt quand on arrive dessus.
 */
const NEAR_MARGIN = '600px 0px';
let nearObserver: IntersectionObserver | null = null;

/**
 * Monte chaque bulle seulement quand elle approche de l'écran. Une bulle déjà visible (page contact)
 * se monte tout de suite ; celle du footer ne charge plus la 3D à l'ouverture de la home.
 * `whenArthurReady()` monte toujours une bulle à la demande, visible ou non.
 */
export function mountArthursWhenNear(root: ParentNode = document): void {
  bindGlobalReact();
  if (!('IntersectionObserver' in window)) {
    mountAllArthurs(root);
    return;
  }
  nearObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        nearObserver?.unobserve(entry.target);
        void mountArthur(entry.target as HTMLElement);
      }
    },
    { rootMargin: NEAR_MARGIN },
  );
  root.querySelectorAll<HTMLElement>('[data-arthur]').forEach((el) => {
    if (!mounted.has(el)) nearObserver!.observe(el);
  });
}

function bindGlobalReact(): void {
  if (globalBound) return;
  globalBound = true;
  window.addEventListener('arthur:react', (event) => {
    const detail = (event as CustomEvent<ReactionName | Reaction>).detail;
    if (!detail) return;
    mounted.forEach((pending) => void pending.then((arthur) => arthur.react(detail)));
  });
}

/** À appeler avant un changement de page (transitions Astro). */
export function unmountAllArthurs(): void {
  nearObserver?.disconnect();
  nearObserver = null;
  mounted.forEach((pending) => void pending.then((arthur) => arthur.destroy()));
  mounted.clear();
}

/** Contrôleur d'une bulle, une fois le robot affiché. */
export async function whenArthurReady(el: HTMLElement | null): Promise<Arthur> {
  if (!el) throw new Error('[arthur] bulle introuvable.');
  const arthur = await mountArthur(el);
  await arthur.ready;
  return arthur;
}
