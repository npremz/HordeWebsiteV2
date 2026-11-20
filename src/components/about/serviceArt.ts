import type { AboutServiceSlug } from './copy';

/**
 * Illustrations des cartes services (maquette « Squad ») : des cercles qui se recoupent, leurs
 * points d'intersection en losanges, des « 1 » dans les zones simples et un « 0 » dans la zone
 * commune. Repère centré sur (0, 0), en px de la maquette (carte de 460 × 620 à 1512 px).
 */
export interface ServiceArt {
  color: string;
  r: number;
  circles: [number, number][];
  labels: { x: number; y: number; text: '0' | '1' }[];
}

/** 4 cercles en carré (développement SaaS) ; l'événementiel y ajoute un cercle central. */
const square: [number, number][] = [
  [-60, -54.5],
  [60, -54.5],
  [-60, 54.5],
  [60, 54.5],
];

const hexagon = Array.from({ length: 6 }, (_, i): [number, number] => {
  const angle = (Math.PI / 3) * i - Math.PI / 2;
  return [Math.round(Math.cos(angle) * 60 * 100) / 100, Math.round(Math.sin(angle) * 60 * 100) / 100];
});

export const SERVICE_ART: Record<AboutServiceSlug, ServiceArt> = {
  'creation-mvp-saas': {
    color: '#20bc73',
    r: 88.5,
    circles: square,
    labels: square.map(([x, y]) => ({ x, y: y + Math.sign(y) * 8, text: '1' as const })),
  },
  'refonte-site-web': {
    color: '#008be4',
    r: 89.5,
    circles: [
      [-61, 0],
      [61, 0],
    ],
    labels: [
      { x: -80, y: 0, text: '1' },
      { x: 0, y: 0, text: '0' },
      { x: 80, y: 0, text: '1' },
    ],
  },
  'creation-landing-page': {
    color: '#de5ea3',
    r: 89,
    circles: [
      [0, -57],
      [-59.5, 55],
      [59.5, 55],
    ],
    labels: [
      { x: 0, y: -67, text: '1' },
      { x: -80, y: 63, text: '1' },
      { x: 80, y: 63, text: '1' },
      { x: 0, y: 15, text: '0' },
    ],
  },
  'applications-evenementielles': {
    color: '#d87467',
    r: 88.5,
    circles: [...square, [0, 0]],
    labels: [
      { x: -79, y: -88, text: '1' },
      { x: 79, y: -88, text: '1' },
      { x: -79, y: 91, text: '1' },
      { x: 79, y: 91, text: '1' },
    ],
  },
  'creation-ecommerce': {
    color: '#7d62d9',
    r: 88,
    circles: hexagon,
    labels: [
      ...hexagon.map(([x, y]) => ({ x: x * 2.1, y: y * 2.1, text: '1' as const })),
      { x: 0, y: 0, text: '0' },
    ],
  },
  'optimisation-site-web': {
    color: '#d6950f',
    r: 76,
    circles: [
      [-76, 0],
      [0, 0],
      [76, 0],
    ],
    labels: [
      { x: -110, y: 0, text: '1' },
      { x: -38, y: 0, text: '0' },
      { x: 38, y: 0, text: '0' },
      { x: 110, y: 0, text: '1' },
    ],
  },
  'audit-offert': {
    color: '#16191b',
    r: 89,
    circles: [[0, 0]],
    labels: [{ x: 0, y: 0, text: '1' }],
  },
};

/** Points où deux cercles de même rayon se croisent (doublons fusionnés). */
export function intersections(circles: [number, number][], r: number): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const [x1, y1] = circles[i];
      const [x2, y2] = circles[j];
      const d = Math.hypot(x2 - x1, y2 - y1);
      if (d === 0 || d >= 2 * r) continue;
      const h = Math.sqrt(r * r - (d / 2) ** 2);
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const ox = (-(y2 - y1) / d) * h;
      const oy = ((x2 - x1) / d) * h;
      for (const point of [
        [mx + ox, my + oy],
        [mx - ox, my - oy],
      ] as [number, number][]) {
        if (!points.some(([px, py]) => Math.hypot(px - point[0], py - point[1]) < 2)) points.push(point);
      }
    }
  }
  return points.map(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
}
