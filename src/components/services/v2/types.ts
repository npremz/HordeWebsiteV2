/**
 * Contenu d'une page service « v2 » (refonte des pages services, DA de la home).
 * Une page = un fichier copy.ts par service, FR + EN, rendu par ServicePageV2.astro.
 */

/** Clés des photos disponibles (voir `photos` dans ServicePageV2.astro). */
export type ServicePhotoKey =
  | 'relay'
  | 'relayScreen'
  | 'wiels'
  | 'postes'
  | 'fysuHero'
  | 'fysuProducts'
  | 'fysuRail'
  | 'fysuMobile'
  | 'lomaDesktop'
  | 'lomaMobile';

export interface ServicePageCopy {
  hero: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    facts: string[];
    cta: string;
    secondary: string;
    /** Cible du lien secondaire (défaut « #projets »). */
    secondaryHref?: string;
  };
  /** Grande photo sous le hero : section masquée si absente. */
  shot?: { key: ServicePhotoKey; alt: string; caption: string; position?: string };
  fit: {
    title: string;
    yesLabel: string;
    yes: string[];
    noLabel: string;
    no: string[];
  };
  /** Preuves : section masquée si absente. */
  projects?: {
    count: string;
    title: string;
    items: {
      name: string;
      meta: string[];
      text: string;
      listLabel: string;
      list: string[];
      note: string | null;
      images: { key: ServicePhotoKey; alt: string }[];
      /** Ratio de l'image seule (défaut 1 / 1), ex. « 1320 / 852 » pour une capture desktop. */
      mediaRatio?: string;
      link: { label: string; href: string } | null;
    }[];
  };
  /** Citations clients : section masquée si absente. */
  quote?: {
    label: string;
    linkLabel: string;
    items: { text: string; source: string; href: string }[];
  };
  formats: {
    title: string;
    items: { title: string; text: string }[];
    /** Lien sous les cartes (ex. l'article qui détaille la méthode). */
    link?: { label: string; href: string };
  };
  process: {
    title: string;
    steps: { when: string; title: string; text: string }[];
    note?: string;
  };
  price: {
    label: string;
    title: string;
    titleRest: string;
    intro: string;
    factors: { title: string; text: string }[];
    note: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    label: string;
    titleLines: string[];
    text: string;
    primary: string;
    booking: string;
    newTab: string;
    reassurance: string;
  };
}
