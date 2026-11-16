/**
 * Met en pause les animations CSS des blocs `[data-pause-offscreen]` quand ils sont hors de l'écran.
 *
 * Une animation infinie continue de tourner (style, layout, repaint selon ce qu'elle anime) même
 * quand personne ne la voit. On pose `.is-offscreen` sur le bloc ; home.css passe alors toutes
 * ses animations en `animation-play-state: paused`. Elles reprennent là où elles s'étaient arrêtées.
 */
const MARGIN = "200px 0px";

let observer: IntersectionObserver | null = null;
let bound = false;

export function pauseOffscreen(root: ParentNode = document): void {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
    },
    { rootMargin: MARGIN },
  );

  root.querySelectorAll<HTMLElement>("[data-pause-offscreen]").forEach((el) => {
    if (el.dataset.pauseOffscreenBound === "true") return;
    el.dataset.pauseOffscreenBound = "true";
    observer!.observe(el);
  });

  if (bound) return;
  bound = true;
  // Les blocs de l'ancienne page disparaissent avec la transition : on repart d'un observer neuf.
  document.addEventListener("astro:before-swap", () => {
    observer?.disconnect();
    observer = null;
  });
}
