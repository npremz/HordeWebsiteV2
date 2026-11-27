/**
 * Contenu d'une page service « v2 » (refonte des pages services, DA de la home).
 * Une page = un fichier copy.ts par service, FR + EN, rendu par ServicePageV2.astro.
 */

/** Clés des photos disponibles (voir `photos` dans ServicePageV2.astro). */
export type ServicePhotoKey = 'relay' | 'relayScreen' | 'wiels' | 'postes';

export interface ServicePageCopy {
  hero: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    facts: string[];
    cta: string;
    secondary: string;
  };
  shot: { key: ServicePhotoKey; alt: string; caption: string; position?: string };
  fit: {
    title: string;
    yesLabel: string;
    yes: string[];
    noLabel: string;
    no: string[];
  };
  projects: {
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
      link: { label: string; href: string } | null;
    }[];
  };
  quote: {
    label: string;
    linkLabel: string;
    items: { text: string; source: string; href: string }[];
  };
  formats: {
    title: string;
    items: { title: string; text: string }[];
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
