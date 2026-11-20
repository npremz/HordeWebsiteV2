/**
 * Apparition au scroll des blocs `[data-home-reveal]` (styles dans components/home/home.css).
 * Partagé par la home et la page « L’agence ».
 */
export function initHomeReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-home-reveal]:not(.is-revealed)');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px' },
  );

  items.forEach((item) => observer.observe(item));
}
