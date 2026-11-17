import type { Locale } from '../../i18n';

/**
 * Page « Prix d'un site web » : textes. Les montants viennent des fichiers services
 * (`pricing` dans src/content/services/*.yaml) ; ici seulement les libellés et les plafonds
 * propres à la page, validés dans docs/tarifs-2026-11.md (tout HTVA).
 */
export type OfferSlug =
  | 'audit-offert'
  | 'optimisation-site-web'
  | 'refonte-site-web'
  | 'creation-landing-page'
  | 'creation-ecommerce'
  | 'applications-evenementielles'
  | 'creation-mvp-saas';

export interface PricingRowCopy {
  /** Service lié (page de l'offre, données structurées). */
  service: OfferSlug;
  name: string;
  /** Lit le prix d'un autre service (ex. refonte SaaS = prix d'un MVP). */
  priceFrom?: OfferSlug;
  /** Plafond propre à la ligne (ex. refonte vitrine jusqu'à 2 999 €). */
  to?: number;
}

const fr = {
  slug: 'prix-site-web',
  seoTitle: 'Prix d’un site web en 2027 : nos fourchettes HTVA',
  seoDescription:
    'Prix d’un site web en 2027 chez Horde : audit offert, refonte dès 999 €, landing page, e-commerce et MVP. Fourchettes indicatives HTVA, sans surprise.',
  hero: {
    titleLines: ['Prix d’un site', 'web en 2027'],
    lead: 'Nos fourchettes indicatives, pour chaque type de projet',
    vat: 'Prix hors TVA',
    total: 'Fourchette totale',
    infoLabel: 'Comment lire ces prix',
    info: 'Cochez une ou plusieurs offres : la fourchette totale les additionne. Tous nos prix sont HTVA ; le bas de la fourchette est le cas le plus fréquent.',
  },
  offersTitle: 'Nos Offres',
  /** Lien de chaque ligne vers la page du service (texte lu par Google et les lecteurs d'écran). */
  seeOffer: 'Voir l’offre',
  chooseLabel: 'Choisir les offres à additionner dans la fourchette totale',
  price: {
    free: 'Gratuit',
    perDay: 'jour',
    range: 'à',
    onQuote: 'puis sur devis',
    /** Prix sans plafond : version courte (mobile) et total. */
    fromShort: 'dès',
  },
  rows: [
    // L'audit (gratuit) en tête et coché par défaut : la fourchette totale démarre à « Gratuit ».
    { service: 'audit-offert', name: 'Audit' },
    { service: 'creation-landing-page', name: 'Landing page' },
    { service: 'applications-evenementielles', name: 'Événementiel interactif' },
    { service: 'creation-ecommerce', name: 'Site e-commerce' },
    { service: 'creation-mvp-saas', name: 'Développement MVP' },
    { service: 'refonte-site-web', name: 'Refonte SaaS', priceFrom: 'creation-mvp-saas' },
    { service: 'refonte-site-web', name: 'Refonte e-commerce', to: 3999 },
    { service: 'refonte-site-web', name: 'Refonte site vitrine', to: 2999 },
    { service: 'optimisation-site-web', name: 'Optimisation de site web' },
  ] as PricingRowCopy[],
  faqTitle: 'Questions fréquentes',
  /**
   * Réponses en HTML simple. `{slug|texte}` devient un lien vers la page du service
   * (URL lue dans les fichiers services, voir PricingPage).
   */
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
      q: 'Qu’est-ce qui fait varier le prix d’un site web ?',
      a: 'Surtout le périmètre : le nombre de pages ou de sections, la production des contenus, la taille du catalogue pour un {creation-ecommerce|site e-commerce}, les intégrations (paiement, livraison, outils tiers) et le niveau de personnalisation. Pour une {refonte-site-web|refonte}, tout dépend aussi de ce qu’il faut reprendre dans l’existant.',
    },
    {
      q: 'Combien de temps faut-il pour réaliser un site ?',
      a: 'Une {creation-landing-page|landing page} simple prend 1 à 2 semaines, une {refonte-site-web|refonte} 3 à 6 semaines et un {creation-mvp-saas|MVP} complet 6 à 10 semaines. En {optimisation-site-web|optimisation}, les premiers gains se règlent en une semaine. Le délai confirmé figure dans notre proposition.',
    },
    {
      q: 'La rédaction des contenus est-elle comprise ?',
      a: 'Pour une {creation-landing-page|landing page}, oui si vous le souhaitez : vous fournissez le brief, on rédige. Pour une {refonte-site-web|refonte}, elle n’est pas incluse par défaut : on travaille avec votre rédacteur ou on vous en recommande un.',
    },
    {
      q: 'L’hébergement est-il compris dans le prix ?',
      a: 'On livre sur votre domaine et votre hébergeur, ou on vous recommande une solution adaptée. On ne vous revend pas d’hébergement avec une marge.',
    },
    {
      q: 'Est-ce que je dépendrai de vous après la mise en ligne ?',
      a: 'Non. Le code est documenté et livré sur votre compte, et on forme votre équipe pour qu’elle gère le contenu au quotidien, comme les produits, les prix ou les commandes d’un {creation-ecommerce|e-commerce}.',
    },
    {
      q: 'Par où commencer ?',
      a: 'Par {audit-offert|l’audit offert} ou un appel de 30 minutes : on regarde votre projet ensemble avant de chiffrer quoi que ce soit.',
    },
  ],
};

const en: typeof fr = {
  slug: 'website-prices',
  seoTitle: 'Website prices in 2027: our ranges excl. VAT',
  seoDescription:
    'Website prices in 2027 at Horde: free audit, redesign from €999, landing page, e-commerce and MVP. Indicative ranges excl. VAT, no surprises.',
  hero: {
    titleLines: ['Website prices', 'in 2027'],
    lead: 'Our indicative ranges, for each type of project',
    vat: 'Prices excl. VAT',
    total: 'Price range',
    infoLabel: 'How to read these prices',
    info: 'Tick one or more offers: the total range adds them up. All our prices exclude VAT; the low end of each range is the most common case.',
  },
  offersTitle: 'Our Offers',
  seeOffer: 'See the offer',
  chooseLabel: 'Choose the offers to add up in the total range',
  price: {
    free: 'Free',
    perDay: 'day',
    range: 'to',
    onQuote: 'then on quote',
    fromShort: 'from',
  },
  rows: [
    // L'audit (gratuit) en tête et coché par défaut : la fourchette totale démarre à « Gratuit ».
    { service: 'audit-offert', name: 'Audit' },
    { service: 'creation-landing-page', name: 'Landing page' },
    { service: 'applications-evenementielles', name: 'Interactive events' },
    { service: 'creation-ecommerce', name: 'E-commerce website' },
    { service: 'creation-mvp-saas', name: 'MVP development' },
    { service: 'refonte-site-web', name: 'SaaS redesign', priceFrom: 'creation-mvp-saas' },
    { service: 'refonte-site-web', name: 'E-commerce redesign', to: 3999 },
    { service: 'refonte-site-web', name: 'Showcase site redesign', to: 2999 },
    { service: 'optimisation-site-web', name: 'Website optimization' },
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
      q: 'What makes the price of a website vary?',
      a: 'Mostly the scope: the number of pages or sections, content production, the catalogue size for an {creation-ecommerce|e-commerce website}, integrations (payments, shipping, third-party tools) and the level of customisation. For a {refonte-site-web|redesign}, it also depends on what needs reworking in the existing site.',
    },
    {
      q: 'How long does it take to build a website?',
      a: 'A simple {creation-landing-page|landing page} takes 1 to 2 weeks, a {refonte-site-web|redesign} 3 to 6 weeks and a complete {creation-mvp-saas|MVP} 6 to 10 weeks. In {optimisation-site-web|optimization}, the first gains are fixed within a week. The confirmed timeline is in our proposal.',
    },
    {
      q: 'Is copywriting included?',
      a: 'For a {creation-landing-page|landing page}, yes if you want it: you provide the brief and we write. For a {refonte-site-web|redesign}, it isn’t included by default: we work with your copywriter or recommend one.',
    },
    {
      q: 'Is hosting included in the price?',
      a: 'We deliver on your domain and your hosting, or recommend a suitable solution. We don’t resell hosting with a markup.',
    },
    {
      q: 'Will I depend on you after launch?',
      a: 'No. The code is documented and delivered on your account, and we train your team to handle day-to-day content, such as the products, prices or orders of an {creation-ecommerce|online store}.',
    },
    {
      q: 'Where do we start?',
      a: 'With {audit-offert|the free audit} or a 30-minute call: we look at your project together before pricing anything.',
    },
  ],
};

export function getPricingCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}

export function getPricingHref(lang: Locale): string {
  return `/${lang}/${getPricingCopy(lang).slug}/`;
}
