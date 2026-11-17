import type { Locale } from '../../i18n';

/**
 * Page « Prix d'un site web » : textes. Les montants viennent des fichiers services
 * (`pricing` dans src/content/services/*.yaml) ; ici seulement les accroches et les nuances
 * validées dans docs/tarifs-2026-11.md (tout HTVA, bas de fourchette = cas le plus fréquent).
 */
export type OfferSlug =
  | 'audit-offert'
  | 'optimisation-site-web'
  | 'refonte-site-web'
  | 'creation-landing-page'
  | 'creation-ecommerce'
  | 'applications-evenementielles'
  | 'creation-mvp-saas';

interface OfferCopy {
  slug: OfferSlug;
  name: string;
  pitch: string;
  /** Précisions sous le prix (sous-plafonds, unité, devis). */
  details?: string[];
}

const fr = {
  slug: 'prix-site-web',
  seoTitle: 'Prix d’un site web en 2027 : nos fourchettes HTVA',
  seoDescription:
    'Prix d’un site web en 2027 chez Horde : audit offert, refonte dès 999 €, landing page, e-commerce et MVP. Fourchettes indicatives HTVA, sans surprise.',
  hero: {
    eyebrow: 'Tarifs 2027',
    titleLines: ['Prix d’un site web', 'en 2027'],
    lead: 'Nos fourchettes indicatives, pour chaque type de projet.',
    updated: 'Mis à jour en novembre 2026 · Prix HTVA',
    audit: 'Demander l’audit offert',
    bookCall: 'Réserver un appel',
  },
  reading: {
    label: 'Comment lire ces prix',
    text: 'Tous nos prix sont HTVA. Le bas de la fourchette est le cas le plus fréquent : le plafond n’est atteint que lorsque le périmètre est large.',
  },
  list: {
    title: 'Nos fourchettes par projet',
    colProject: 'Projet',
    colPrice: 'Prix indicatif HTVA',
    free: 'Gratuit',
    from: 'À partir de',
    upTo: 'Selon le périmètre, jusqu’à',
    perDay: 'par jour',
    onQuote: 'Puis sur devis',
    see: 'Voir l’offre',
    vat: 'HTVA',
  },
  offers: [
    {
      slug: 'audit-offert',
      name: 'Audit offert',
      pitch: 'La porte d’entrée de toutes nos offres : on regarde votre site et on vous dit ce qui coince.',
    },
    {
      slug: 'optimisation-site-web',
      name: 'Optimisation de site web',
      pitch: 'Votre site ne fonctionne pas ou ne donne aucun résultat ? On regarde les détails techniques qui coincent et on résout ça.',
      details: ['Nombre de jours estimé après le diagnostic gratuit.'],
    },
    {
      slug: 'refonte-site-web',
      name: 'Refonte de site web',
      pitch: 'Votre site est déjà en place et vous savez qu’il y a des soucis. On retravaille l’existant pour ne pas repartir de zéro.',
      details: ['Site vitrine : jusqu’à 2 999 €', 'E-commerce : jusqu’à 3 999 €', 'SaaS : prix d’un développement complet (voir MVP)'],
    },
    {
      slug: 'creation-landing-page',
      name: 'Landing page',
      pitch: 'Une marque ou un produit à présenter ou à vendre : une page pensée pour convaincre, par son design ou son message.',
    },
    {
      slug: 'creation-ecommerce',
      name: 'Site e-commerce',
      pitch: 'Votre shop passe au niveau supérieur, avec un site soigné et des tunnels de vente fluides.',
    },
    {
      slug: 'applications-evenementielles',
      name: 'Événements interactifs',
      pitch: 'Présentation, conférence, workshop : une expérience interactive numérique de qualité.',
      details: ['Le devis dépend du public, de l’infrastructure et des responsabilités.'],
    },
    {
      slug: 'creation-mvp-saas',
      name: 'Développement MVP',
      pitch: 'Une idée à tester, sans le bagage technique : un prototype rapide pour tester le marché.',
    },
  ] as OfferCopy[],
  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Vos prix sont-ils HTVA ?',
      a: 'Oui, tous les prix de cette page sont HTVA.',
    },
    {
      q: 'Pourquoi une fourchette plutôt qu’un prix fixe ?',
      a: 'Le prix dépend du périmètre de votre projet. Le bas de la fourchette est le cas le plus fréquent ; le plafond n’est atteint que pour un périmètre large.',
    },
    {
      q: 'Par où commencer ?',
      a: 'Par l’audit offert ou un appel de 30 minutes : on regarde votre projet ensemble avant de chiffrer quoi que ce soit.',
    },
  ],
  guide: {
    text: 'Vous préparez une refonte ? Notre guide détaille les coûts poste par poste.',
    link: 'Combien coûte une refonte de site web',
    href: '/fr/blog/combien-coute-refonte-site-web/',
  },
  cta: {
    label: 'Prochaine étape',
    title: 'Un prix précis pour votre projet ?',
    text: 'Un appel de 30 minutes pour en discuter, ou un message via la page contact : on vous répond.',
    bookCall: 'Réserver un appel',
    bookCallMeta: '30 min',
    contact: 'Écrire via la page contact',
    newTab: '(s’ouvre dans un nouvel onglet)',
  },
};

const en: typeof fr = {
  slug: 'website-prices',
  seoTitle: 'Website prices in 2027: our ranges excl. VAT',
  seoDescription:
    'Website prices in 2027 at Horde: free audit, redesign from €999, landing page, e-commerce and MVP. Indicative ranges excl. VAT, no surprises.',
  hero: {
    eyebrow: '2027 pricing',
    titleLines: ['Website prices', 'in 2027'],
    lead: 'Our indicative ranges, for every type of project.',
    updated: 'Updated November 2026 · Prices excl. VAT',
    audit: 'Get the free audit',
    bookCall: 'Book a call',
  },
  reading: {
    label: 'How to read these prices',
    text: 'All our prices exclude VAT. The low end of each range is the most common case: the ceiling is only reached when the scope is broad.',
  },
  list: {
    title: 'Our ranges by project',
    colProject: 'Project',
    colPrice: 'Indicative price excl. VAT',
    free: 'Free',
    from: 'From',
    upTo: 'Depending on scope, up to',
    perDay: 'per day',
    onQuote: 'Then on quote',
    see: 'See the offer',
    vat: 'excl. VAT',
  },
  offers: [
    {
      slug: 'audit-offert',
      name: 'Free audit',
      pitch: 'The way into all our offers: we look at your site and tell you what is getting in the way.',
    },
    {
      slug: 'optimisation-site-web',
      name: 'Website optimisation',
      pitch: 'Your site doesn’t work or brings no results? We look at the technical details that block it and fix them.',
      details: ['Number of days estimated after the free diagnostic.'],
    },
    {
      slug: 'refonte-site-web',
      name: 'Website redesign',
      pitch: 'Your site is already live and you know it has issues. We rework what exists instead of starting from scratch.',
      details: ['Showcase site: up to €2,999', 'E-commerce: up to €3,999', 'SaaS: priced as a full development (see MVP)'],
    },
    {
      slug: 'creation-landing-page',
      name: 'Landing page',
      pitch: 'A brand or product to present or sell: a page designed to convince, through its design or its message.',
    },
    {
      slug: 'creation-ecommerce',
      name: 'E-commerce website',
      pitch: 'Take your shop to the next level, with a polished site and smooth sales funnels.',
    },
    {
      slug: 'applications-evenementielles',
      name: 'Interactive events',
      pitch: 'Presentation, conference, workshop: a quality interactive digital experience.',
      details: ['The quote depends on the audience, the infrastructure and the responsibilities.'],
    },
    {
      slug: 'creation-mvp-saas',
      name: 'MVP development',
      pitch: 'An idea to test, without the technical background: a fast prototype to test the market.',
    },
  ],
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      q: 'Do your prices include VAT?',
      a: 'No, all prices on this page exclude VAT.',
    },
    {
      q: 'Why a range rather than a fixed price?',
      a: 'The price depends on the scope of your project. The low end of the range is the most common case; the ceiling is only reached for a broad scope.',
    },
    {
      q: 'Where do we start?',
      a: 'With the free audit or a 30-minute call: we look at your project together before pricing anything.',
    },
  ],
  guide: {
    text: 'Planning a redesign? Our guide breaks the costs down item by item.',
    link: 'How much does a website redesign cost',
    href: '/en/blog/how-much-does-a-website-redesign-cost/',
  },
  cta: {
    label: 'Next step',
    title: 'Want a precise price for your project?',
    text: 'A 30-minute call to discuss it, or a message through the contact page: we’ll get back to you.',
    bookCall: 'Book a call',
    bookCallMeta: '30 min',
    contact: 'Write to us on the contact page',
    newTab: '(opens in a new tab)',
  },
};

export function getPricingCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}

export function getPricingHref(lang: Locale): string {
  return `/${lang}/${getPricingCopy(lang).slug}/`;
}

/** 1999 → « 1 999 € » (fr) ou « €1,999 » (en). */
export function formatEuro(value: number, lang: Locale): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-BE' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    // Le français ne groupe pas les nombres à 4 chiffres par défaut : on veut « 1 999 € ».
    useGrouping: 'always',
  }).format(value);
}
