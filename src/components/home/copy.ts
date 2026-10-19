import type { Locale } from '../../i18n';

const fr = {
  brand: {
    name: 'Horde Agence',
    tagline: 'Website design agency',
  },
  nav: {
    home: 'Accueil',
    culture: 'Notre culture',
    services: 'Services',
    projects: 'Projets',
    blog: 'Blog',
    contact: 'Contact',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menu: 'Menu',
    close: 'Fermer',
    languages: 'Langue',
  },
  badges: {
    from: 'From',
    location: 'Belgium, Brussels',
    since: 'Since',
    year: '2026',
  },
  hero: {
    titleLine1: 'Website Design',
    titleLine2: 'Agency in Brussels',
    tagline: 'Tell what do you want and we’ll design it',
    days: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
    weatherLabel: 'Météo actuelle à Bruxelles',
  },
  marquee: ['Refonte', 'Audit (free)', 'SaaS MVP', 'Landing page', 'E-commerce', 'Optimisation'],
  intro: {
    cta: 'Toc-toc, lancez votre nouveau projet !',
    ctaShort: 'Lancez votre nouveau projet !',
    tag: 'Human-first',
    label: 'Qu’est-ce que la Horde ?',
    text: 'Horde est une agence web bruxelloise qui conçoit des sites web ultra-rapides et qui transforme vos visiteurs en clients. Audit offert, refonte ou création from scratch → on livre des sites légers, bien référencés et pensés pour durer.',
    link: 'Voir nos services',
  },
  works: {
    title: 'Works',
    seeAll: 'See All',
    inProgress: 'En cours',
  },
  services: {
    eyebrow: 'Nos',
    title: 'Services',
  },
  method: {
    titleLine1: 'Une méthode claire pour',
    titleLine2: 'créer un site web rapide',
    steps: [
      {
        title: 'UX & parcours d’achat',
        text: 'Fiches produit conçues pour convertir, navigation par facettes, tunnel de commande simplifié, gestion des erreurs claire. On cartographie les parcours avant de dessiner quoi que ce soit.',
      },
      {
        title: 'Performance technique',
        text: 'Images en WebP/AVIF avec lazy loading, JS minimal, Core Web Vitals dans le vert. Un e-commerce lent sur mobile laisse de l’argent sur la table. Pour nous, la rapidité est un standard.',
      },
      {
        title: 'SEO e-commerce',
        text: 'Structure sémantique, données structurées, maillage interne et pages catégories pensées pour la recherche. Le référencement se construit dès l’architecture, pas après la mise en ligne.',
      },
    ],
    link: 'Voir nos services',
  },
  team: {
    label: 'Une équipe à taille humaine',
    text: 'On est une agence de petite taille qui met en avant le côté humain : on prend le temps avec vous de trouver les solutions qui vous conviennent et on vous aide à ce que votre présence numérique soit à la hauteur de vos projets.',
    link: 'Notre culture',
    photo1Alt: 'L’équipe Horde en atelier autour d’un écran',
    photo2Alt: 'Un membre de l’équipe Horde à son poste de travail',
  },
  talk: {
    liked: 'T’as aimé ?',
    likeLabel: 'J’aime',
    connect: 'Connectons-nous',
    title: 'Let’s Talk',
    ctaLabel: 'Démarrer un projet avec Horde',
    menu: 'Menu',
    social: 'Social',
    contact: 'Contact',
    services: 'Services',
  },
  footer: {
    copyright: '©2026 Horde Agence,',
    description: 'Création de site web rapide et performant.',
    assistant: 'Any questions? Ask A.R.T.H.U.R',
    legal: 'Liens légaux',
  },
};

type HomeCopy = typeof fr;

const en: HomeCopy = {
  brand: {
    name: 'Horde Agence',
    tagline: 'Website design agency',
  },
  nav: {
    home: 'Home',
    culture: 'Our culture',
    services: 'Services',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    close: 'Close',
    languages: 'Language',
  },
  badges: {
    from: 'From',
    location: 'Belgium, Brussels',
    since: 'Since',
    year: '2026',
  },
  hero: {
    titleLine1: 'Website Design',
    titleLine2: 'Agency in Brussels',
    tagline: 'Tell us what you want and we’ll design it',
    days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    weatherLabel: 'Current weather in Brussels',
  },
  marquee: ['Redesign', 'Audit (free)', 'SaaS MVP', 'Landing page', 'E-commerce', 'Optimisation'],
  intro: {
    cta: 'Knock knock, start your new project!',
    ctaShort: 'Start your new project!',
    tag: 'Human-first',
    label: 'What is Horde?',
    text: 'Horde is a Brussels web agency that designs ultra-fast websites and turns your visitors into customers. Free audit, redesign or built from scratch → we ship lightweight sites, well ranked and built to last.',
    link: 'See our services',
  },
  works: {
    title: 'Works',
    seeAll: 'See All',
    inProgress: 'In progress',
  },
  services: {
    eyebrow: 'Our',
    title: 'Services',
  },
  method: {
    titleLine1: 'A clear method to',
    titleLine2: 'build a fast website',
    steps: [
      {
        title: 'UX & purchase journeys',
        text: 'Product pages designed to convert, faceted navigation, a simplified checkout and clear error handling. We map the journeys before drawing anything.',
      },
      {
        title: 'Technical performance',
        text: 'WebP/AVIF images with lazy loading, minimal JS, Core Web Vitals in the green. A slow e-commerce site on mobile leaves money on the table. For us, speed is a standard.',
      },
      {
        title: 'E-commerce SEO',
        text: 'Semantic structure, structured data, internal linking and category pages designed for search. Rankings are built into the architecture, not bolted on after launch.',
      },
    ],
    link: 'See our services',
  },
  team: {
    label: 'A human-sized team',
    text: 'We are a small agency that puts people first: we take the time to find the solutions that suit you and help make sure your digital presence lives up to your projects.',
    link: 'Our culture',
    photo1Alt: 'The Horde team working together around a screen',
    photo2Alt: 'A Horde team member at their workstation',
  },
  talk: {
    liked: 'Liked it?',
    likeLabel: 'Like',
    connect: 'Let’s connect',
    title: 'Let’s Talk',
    ctaLabel: 'Start a project with Horde',
    menu: 'Menu',
    social: 'Social',
    contact: 'Contact',
    services: 'Services',
  },
  footer: {
    copyright: '©2026 Horde Agence,',
    description: 'Fast, high-performing websites.',
    assistant: 'Any questions? Ask A.R.T.H.U.R',
    legal: 'Legal links',
  },
};

const copies: Record<Locale, HomeCopy> = { fr, en };

export function getHomeCopy(lang: Locale): HomeCopy {
  return copies[lang] ?? fr;
}
