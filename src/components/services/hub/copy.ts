import type { Locale } from '../../../i18n';

/**
 * Hub des services (refonte v2) : organisé par situation, pas par livrable.
 * Pitchs, prix et délais : ceux validés par Nicolas pour chaque page service (nov. 2026).
 * Les URLs viennent des fiches services (slug → seoUrl localisé), pas d'ici.
 */
export type HubServiceSlug =
  | 'audit-offert'
  | 'optimisation-site-web'
  | 'refonte-site-web'
  | 'creation-landing-page'
  | 'creation-ecommerce'
  | 'creation-mvp-saas'
  | 'applications-evenementielles';

interface HubCopy {
  hero: { eyebrow: string; titleLines: string[]; lead: string; cta: string; secondary: string };
  entry: { label: string; title: string; text: string; link: string };
  situations: {
    title: string;
    groups: {
      index: string;
      title: string;
      text: string;
      services: { slug: HubServiceSlug; name: string; pitch: string; facts: string[] }[];
    }[];
    more: string;
  };
  proof: {
    label: string;
    title: string;
    text: string;
    quote: string;
    source: string;
    alt: string;
    caption: string;
    links: { slug: HubServiceSlug; label: string }[];
  };
  principles: { title: string; items: { title: string; text: string }[] };
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

const fr: HubCopy = {
  hero: {
    eyebrow: 'Services web · Bruxelles',
    titleLines: ['On part de', 'votre situation.'],
    lead:
      'Vous n’avez pas besoin de savoir s’il vous faut une « landing page » ou une « refonte ». Dites-nous où vous en êtes : un site qui coince, un produit à lancer, un événement à animer. On vous oriente vers la bonne offre, prix affichés.',
    cta: 'Demander l’audit offert',
    secondary: 'Trouver votre situation',
  },
  entry: {
    label: 'Pas sûr ?',
    title: 'Commencez par l’audit offert.',
    text: 'On regarde votre site avec les yeux de vos visiteurs et on vous dit ce qui coince, sous 24 h, en appel ou en vidéo. Ensuite, vous décidez.',
    link: 'Voir l’audit offert',
  },
  situations: {
    title: 'Où en êtes-vous ?',
    groups: [
      {
        index: '01',
        title: 'Votre site existe, mais il coince',
        text: 'Il ne vous rapporte rien, il a été fait avec l’IA et personne ne va au bout, ou vous savez qu’il y a des soucis.',
        services: [
          {
            slug: 'audit-offert',
            name: 'Audit UX/UI offert',
            pitch: 'On relève ce qui fait fuir vos visiteurs et on vous l’explique.',
            facts: ['Offert', 'Sous 24 h'],
          },
          {
            slug: 'optimisation-site-web',
            name: 'Optimisation',
            pitch: 'On corrige les détails qui bloquent, sans refaire le site.',
            facts: ['199 € HTVA / jour', 'Généralement 1 jour'],
          },
          {
            slug: 'refonte-site-web',
            name: 'Refonte',
            pitch: 'On reprend l’existant, même fait avec l’IA, et on le rend bon pour les humains.',
            facts: ['Dès 999 € HTVA', '1 à 4 semaines'],
          },
        ],
      },
      {
        index: '02',
        title: 'Vous lancez quelque chose',
        text: 'Une marque, un produit, une boutique ou une idée à tester.',
        services: [
          {
            slug: 'creation-landing-page',
            name: 'Landing page',
            pitch: 'Une page pensée pour convaincre, par son design comme par son message.',
            facts: ['Dès 1 999 € HTVA', '1 à 4 semaines'],
          },
          {
            slug: 'creation-ecommerce',
            name: 'E-commerce',
            pitch: 'Une boutique soignée, sur Shopify ou sur mesure, avec des tunnels de vente fluides.',
            facts: ['Dès 2 999 € HTVA', '1 à 2 mois'],
          },
          {
            slug: 'creation-mvp-saas',
            name: 'MVP',
            pitch: 'Votre idée testée vite et corrigée vite, sans bagage technique de votre côté.',
            facts: ['Dès 3 999 € HTVA', '2 mois en moyenne'],
          },
        ],
      },
      {
        index: '03',
        title: 'Vous organisez un événement',
        text: 'Un workshop, un salon, une conférence ou une plénière.',
        services: [
          {
            slug: 'applications-evenementielles',
            name: 'Événements interactifs',
            pitch: 'L’application qui fait participer votre salle, du QR code d’accueil au classement final.',
            facts: ['Dès 1 999 € HTVA', '3 semaines'],
          },
        ],
      },
    ],
    more: 'Voir l’offre',
  },
  proof: {
    label: 'Déjà livré',
    title: 'Deux événements pour 42 Belgium.',
    text: 'Code Relay, un tournoi de code en relais à la Proximus Tech Student Experience, et Rocket Mission, un atelier de programmation au FTI Brussels. Deux applications conçues, testées avec de vrais participants et animées en conditions réelles.',
    quote: '«\u00a0Un grand merci à Nicolas Prémont […] pour avoir créé et animé cet atelier\u202f!\u00a0»',
    source: '42 Belgium sur LinkedIn, à propos du Code Relay (traduit de l’anglais)',
    alt: 'Salle comble autour de l’écran du Code Relay : brief de la manche, minuteur à 05:00 et QR code d’inscription.',
    caption: 'Code Relay · 42 Belgium à la Proximus Tech Student Experience · 2 avril 2026',
    links: [
      { slug: 'applications-evenementielles', label: 'Événements interactifs' },
      { slug: 'creation-mvp-saas', label: 'Développement MVP' },
    ],
  },
  principles: {
    title: 'Comment on travaille',
    items: [
      {
        title: 'On cadre',
        text: 'Avant d’écrire une ligne, on pose ce que vous voulez obtenir, pour qui, et ce qui entre dans le projet. Sur Rocket Mission, huit dossiers de spécifications ont décrit le besoin, les cas limites et la façon de vérifier le résultat avant chaque développement.',
      },
      {
        title: 'On pense pour l’humain',
        text: 'L’IA écrit vite. Nous, on regarde ce que vos visiteurs comprennent, où ils hésitent et ce qui leur donne envie d’aller au bout.',
      },
      {
        title: 'On teste avant de livrer',
        text: 'Avec de vraies personnes, sur les vrais appareils. Rocket Mission a été joué un mois avant l’événement, le Code Relay une semaine avant.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Pas sûr de', 'par où commencer ?'],
    text: 'Décrivez votre situation en deux lignes. On vous répond sous 24 h avec la bonne piste.',
    primary: 'Parlez-nous de votre projet',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Premier appel gratuit · Réponse sous 24 h',
  },
};

const en: HubCopy = {
  hero: {
    eyebrow: 'Web services · Brussels',
    titleLines: ['We start from', 'where you are.'],
    lead:
      'You don’t need to know whether you need a “landing page” or a “redesign”. Tell us where you stand: a site that isn’t working, a product to launch, an event to run. We point you to the right offer, with prices shown.',
    cta: 'Request the free audit',
    secondary: 'Find your situation',
  },
  entry: {
    label: 'Not sure?',
    title: 'Start with the free audit.',
    text: 'We look at your site through your visitors’ eyes and tell you what is wrong, within 24 hours, on a call or by video. Then you decide.',
    link: 'See the free audit',
  },
  situations: {
    title: 'Where are you at?',
    groups: [
      {
        index: '01',
        title: 'Your site exists, but it isn’t working',
        text: 'It brings you nothing, it was made with AI and nobody goes all the way, or you know there are problems.',
        services: [
          {
            slug: 'audit-offert',
            name: 'Free UX/UI audit',
            pitch: 'We list what drives your visitors away and explain it to you.',
            facts: ['Free', 'Within 24 hours'],
          },
          {
            slug: 'optimisation-site-web',
            name: 'Optimisation',
            pitch: 'We fix the details that block you, without rebuilding the site.',
            facts: ['€199 excl. VAT / day', 'Usually 1 day'],
          },
          {
            slug: 'refonte-site-web',
            name: 'Redesign',
            pitch: 'We take over what exists, even if AI built it, and make it work for humans.',
            facts: ['From €999 excl. VAT', '1 to 4 weeks'],
          },
        ],
      },
      {
        index: '02',
        title: 'You are launching something',
        text: 'A brand, a product, a store or an idea to test.',
        services: [
          {
            slug: 'creation-landing-page',
            name: 'Landing page',
            pitch: 'A page built to convince, through its design as much as its message.',
            facts: ['From €1,999 excl. VAT', '1 to 4 weeks'],
          },
          {
            slug: 'creation-ecommerce',
            name: 'E-commerce',
            pitch: 'A polished store, on Shopify or custom, with smooth sales funnels.',
            facts: ['From €2,999 excl. VAT', '1 to 2 months'],
          },
          {
            slug: 'creation-mvp-saas',
            name: 'MVP',
            pitch: 'Your idea tested fast and fixed fast, with no technical background needed on your side.',
            facts: ['From €3,999 excl. VAT', '2 months on average'],
          },
        ],
      },
      {
        index: '03',
        title: 'You are organising an event',
        text: 'A workshop, a trade show, a conference or a plenary.',
        services: [
          {
            slug: 'applications-evenementielles',
            name: 'Interactive events',
            pitch: 'The app that gets your room taking part, from the welcome QR code to the final leaderboard.',
            facts: ['From €1,999 excl. VAT', '3 weeks'],
          },
        ],
      },
    ],
    more: 'See the offer',
  },
  proof: {
    label: 'Already delivered',
    title: 'Two events for 42 Belgium.',
    text: 'Code Relay, a relay coding tournament at the Proximus Tech Student Experience, and Rocket Mission, a programming workshop at FTI Brussels. Two apps designed, tested with real participants and run in real conditions.',
    quote: '“Big shoutout to Nicolas Prémont […] for creating and leading this workshop!”',
    source: '42 Belgium on LinkedIn, about Code Relay',
    alt: 'A packed room around the Code Relay screen: round brief, timer at 05:00 and registration QR code.',
    caption: 'Code Relay · 42 Belgium at the Proximus Tech Student Experience · 2 April 2026',
    links: [
      { slug: 'applications-evenementielles', label: 'Interactive events' },
      { slug: 'creation-mvp-saas', label: 'MVP development' },
    ],
  },
  principles: {
    title: 'How we work',
    items: [
      {
        title: 'We scope',
        text: 'Before writing a line, we pin down what you want to achieve, for whom, and what is in the project. On Rocket Mission, eight specification files set out the need, the edge cases and how to check the result before each piece was built.',
      },
      {
        title: 'We design for humans',
        text: 'AI writes fast. We look at what your visitors understand, where they hesitate and what makes them want to go all the way.',
      },
      {
        title: 'We test before we deliver',
        text: 'With real people, on the real devices. Rocket Mission was played a month before the event, Code Relay a week before.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Not sure', 'where to start?'],
    text: 'Describe your situation in two lines. We reply within 24 hours with the right lead.',
    primary: 'Tell us about your project',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'First call free · Reply within 24 hours',
  },
};

export function getHubCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
