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
    from: 'Basés à',
    location: 'Bruxelles, Belgique',
    since: 'Depuis',
    year: '2026',
  },
  hero: {
    titleLine1: 'Agence de Sites Web,',
    titleLine2: 'Digital & Technologies',
    tagline: 'Agence de site web située à Bruxelles',
    days: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
    weatherLabel: 'Météo actuelle à Bruxelles',
  },
  marquee: ['Refonte', 'Audit (offert)', 'MVP SaaS', 'Landing page', 'E-commerce', 'Optimisation'],
  intro: {
    cta: 'Toc-toc, lancez votre nouveau projet !',
    ctaShort: 'Lancez votre nouveau projet !',
    start: 'Commencer',
    tag: 'Human-first',
    label: 'Qu’est-ce que la Horde ?',
    text: 'Horde est une agence web bruxelloise pour les startups, les événements et les entreprises qui vivent en ligne. Un designer et un développeur qui conçoivent des sites et des applications où chaque interaction a du sens pour votre cible et votre usage. Audit offert, refonte, création ou application événementielle : parlons de votre projet.',
    link: 'Voir nos services',
  },
  works: {
    title: 'Projets',
    seeAll: 'Voir tout',
    seeAllShort: 'Voir',
    inProgress: 'En cours',
    viewProject: 'Voir le projet',
    viewMore: 'Voir plus',
    placeholderAlt: 'Aperçu du site',
  },
  services: {
    eyebrow: 'Nos',
    title: 'Services',
  },
  method: {
    titleLine1: 'Notre Stratégie, Méthode',
    titleLine2: '& Processus dans la Horde',
    stepsLabel: 'Nos 3 étapes',
    mindLabel: 'To grow your mind',
    steps: [
      {
        title: 'Vous nous expliquez',
        text: 'On commence par parler de vos clients, de votre problématique et de votre objectif. On analyse l’existant. Ensuite, on établit les priorités, le périmètre et les livrables.',
      },
      {
        title: 'Vous voyez du concret',
        text: 'Maquettes, technologies, prototypes et premières versions. On vous explique chacun de nos choix et on les remet en question au besoin.',
      },
      {
        title: 'Un projet à votre image',
        text: 'On développe, teste et sécurise le projet. On vous forme aux outils et on s’assure que vous gardez la main sur la gestion de votre projet.',
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
    human: 'Human-first',
    ai: 'IA secondly',
  },
  reviews: {
    title: 'Avis',
    heading: 'Avis clients',
    scoreLabel: 'Note',
    googleLink: 'Voir tous nos avis sur Google',
    googleLinkSr: '(s’ouvre dans un nouvel onglet)',
    // Avis Google, recopiés tels quels (captures _assets/avis*.png).
    items: [
      { name: 'Constantinos', color: '#FF9F43', score: 5, text: 'Je ne peux que recommander les services de Horde Agence, je suis kinésithérapeute et le service proposé est exceptionnel, ils vous aident a construire votre site en vous aidant sur la partie technique et en incorporant votre vision. Il y a également un très bon suivi que ce soit sur le référencement ou les ajouts futurs que vous voulez apporter.' },
      { name: 'Sarah', color: '#FF4242', score: 5, text: 'J’ai été accompagnée par Horde Agence pour la création de mon site internet de photographe et j’en suis super contente ! Nous travaillons actuellement sur une nouvelle version et ils sont à la fois disponibles et de bons conseils pour cette nouvelle étape de mon parcours professionnel.' },
      { name: 'Armetix', color: '#FBFF3D', score: 5, text: 'Très professionnel, j’ai pu travailler à deux reprises avec Horde, et à chaque fois c’était fait avec attention et sérieux. Je recommande !' },
      { name: 'Anne', color: '#42BFFF', score: 5, text: 'Merci pour la création de mon site. Il est complet, clair, intuitif et dégage une idée d’apaisement et d’harmonie qui correspond parfaitement à mes activités et l’image que je souhaite en donner : professionnalisme et sérénité.' },
      // Texte tronqué dans la capture (« … Plus ») : à compléter avec l’avis entier.
      { name: 'Frédéric', color: '#B47BFF', score: 5, text: 'J’ai eu l’occasion de collaborer avec Nicolas et Alexandre, et ce fut un réel plaisir ! Ils ont vraiment été à l’écoute de mes demandes et ont pris le temps de m’expliquer leurs choix et le pourquoi des choses. On voit qu’Alexandre est très à l’aise dans tout ce qui touche aux visuels et au graphisme, tandis que Nicolas est un super développeur, toujours capable de trouver le petit détail technique qui fait toute la différence. Ce fut un vrai plaisir d’avoir travaillé avec eux !' },
      { name: 'Bartosz', color: '#3DDC84', score: 5, text: 'Équipe très pro, conseils au top et communication impeccable. Je ne peux que recommander !' },
    ],
  },
  talk: {
    liked: 'Did you like ?',
    yes: 'Yes',
    yesReally: 'Yes (really)',
    connect: 'Let’s connect',
    title: 'Let’s Talk',
    ctaLabel: 'Démarrer un projet avec Horde',
    menu: 'Menu',
    social: 'Réseaux',
    email: 'E-mail',
    contact: 'Contact',
    services: 'Services',
  },
  footer: {
    copyright: '©2026 Horde Agence,',
    description: 'Agence web à Bruxelles. Des expériences web pensées pour l’humain.',
    assistant: 'Des questions ? Demandez à A.R.T.H.U.R',
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
    titleLine1: 'Websites, Digital &',
    titleLine2: 'Technologies Agency',
    tagline: 'Website agency based in Brussels',
    days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    weatherLabel: 'Current weather in Brussels',
  },
  marquee: ['Redesign', 'Audit (free)', 'SaaS MVP', 'Landing page', 'E-commerce', 'Optimisation'],
  intro: {
    cta: 'Knock knock, start your new project!',
    ctaShort: 'Start your new project!',
    start: 'Get started',
    tag: 'Human-first',
    label: 'What is Horde?',
    text: 'Horde is a Brussels web agency for startups, events and businesses that live online. A designer and a developer crafting websites and apps where every interaction makes sense for your audience and your goals. Free audit, redesign, new build or event app: let’s talk about your project.',
    link: 'See our services',
  },
  works: {
    title: 'Works',
    seeAll: 'See All',
    seeAllShort: 'See',
    inProgress: 'In progress',
    viewProject: 'View project',
    viewMore: 'See more',
    placeholderAlt: 'Website preview',
  },
  services: {
    eyebrow: 'Our',
    title: 'Services',
  },
  method: {
    titleLine1: 'Our Strategy, Method',
    titleLine2: '& Workflow at Horde',
    stepsLabel: 'Our 3 steps',
    mindLabel: 'To grow your mind',
    steps: [
      {
        title: 'You walk us through it',
        text: 'We start by talking about your customers, your challenge and your goal. We analyze what already exists. Then we set the priorities, the scope and the deliverables.',
      },
      {
        title: 'You see something concrete',
        text: 'Mockups, technologies, prototypes and first versions. We explain each of our choices and question them when needed.',
      },
      {
        title: 'A project that reflects you',
        text: 'We develop, test and secure the project. We train you on the tools and make sure you stay in control of managing your project.',
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
    human: 'Human-first',
    ai: 'AI secondly',
  },
  reviews: {
    title: 'Avis',
    heading: 'Client reviews',
    scoreLabel: 'Rating',
    googleLink: 'See all our reviews on Google',
    googleLinkSr: '(opens in a new tab)',
    // Our translations of the Google reviews (originals in French).
    items: [
      { name: 'Constantinos', color: '#FF9F43', score: 5, text: 'I can only recommend Horde Agence. I’m a physiotherapist and the service is exceptional: they help you build your site by handling the technical side while bringing your vision to life. The follow-up is excellent too, whether for SEO or any future additions you want to make.' },
      { name: 'Sarah', color: '#FF4242', score: 5, text: 'Horde Agence built the website for my photography business and I’m really happy with it! We’re now working on a new version, and they’re both available and full of good advice for this new step in my career.' },
      { name: 'Armetix', color: '#FBFF3D', score: 5, text: 'Very professional. I’ve worked with Horde twice, and each time the work was careful and serious. I recommend them!' },
      { name: 'Anne', color: '#42BFFF', score: 5, text: 'Thank you for creating my website. It’s complete, clear and intuitive, and conveys a sense of calm and harmony that perfectly matches my work and the image I want to project: professionalism and serenity.' },
      { name: 'Frédéric', color: '#B47BFF', score: 5, text: 'I had the chance to work with Nicolas and Alexandre, and it was a real pleasure! They truly listened to my requests and took the time to explain their choices and the reasons behind them. Alexandre is clearly very comfortable with everything visual and graphic, while Nicolas is a great developer, always able to find the small technical detail that makes all the difference. It was a real pleasure working with them!' },
      { name: 'Bartosz', color: '#3DDC84', score: 5, text: 'Very professional team, great advice and flawless communication. I can only recommend them!' },
    ],
  },
  talk: {
    liked: 'Did you like ?',
    yes: 'Yes',
    yesReally: 'Yes (really)',
    connect: 'Let’s connect',
    title: 'Let’s Talk',
    ctaLabel: 'Start a project with Horde',
    menu: 'Menu',
    social: 'Social',
    email: 'Email',
    contact: 'Contact',
    services: 'Services',
  },
  footer: {
    copyright: '©2026 Horde Agence,',
    description: 'Web agency in Brussels. Web experiences designed for humans.',
    assistant: 'Any questions? Ask A.R.T.H.U.R',
    legal: 'Legal links',
  },
};

const copies: Record<Locale, HomeCopy> = { fr, en };

export function getHomeCopy(lang: Locale): HomeCopy {
  return copies[lang] ?? fr;
}
