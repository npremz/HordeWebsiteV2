import type { Locale } from '../../i18n';

/**
 * Textes de la page « L’agence » (/about/), maquette « Squad ». Formulations de Nicolas et
 * Alexandre, gardées au plus près ; les labels anglais de la maquette sont traduits en français
 * (sauf « remote »).
 */
export type AboutServiceSlug =
  | 'creation-mvp-saas'
  | 'refonte-site-web'
  | 'creation-landing-page'
  | 'applications-evenementielles'
  | 'creation-ecommerce'
  | 'optimisation-site-web'
  | 'audit-offert';

const fr = {
  hero: {
    // h1 : « Horde » en gris, puis la suite de la phrase.
    titleBrand: 'Horde',
    titleRest: ', c’est la volonté de voir de belles choses sur le web.',
    statement: 'Aujourd’hui tout se numérise, ça va à une vitesse folle, mais la qualité des expériences en prend un coup.',
    offer: 'Ce qu’on propose, c’est de prendre le temps de faire des interfaces bien pensées pour l’humain et surtout durables pour votre usage.',
  },
  marquee: ['À propos', 'Nous'],
  photos: {
    teamAlt: 'Nicolas Prémont et Alexandre Potakowski, les deux fondateurs de Horde',
    /** Légende lue par les lecteurs d’écran et les moteurs, masquée à l’écran (rôles = données structurées). */
    teamCaption: 'Nicolas Prémont, co-fondateur et développeur, et Alexandre Potakowski, co-fondateur et designer UX.',
    deskAlt: 'Un clavier sur un bureau, dans la lumière du jour',
  },
  /** Grand titre en filigrane sous les photos (décoratif). */
  ghost: 'L’Agence',
  /** Taille du filigrane selon la longueur du mot : il tient en entier dans l'écran (≈ 90 % de la
      largeur sur mobile, 93 % sur desktop, plafonné à la largeur de la maquette). */
  ghostScale: { mobile: 1.1, desktop: 1.22 },
  speed: {
    title: 'Utilisons cette vitesse d’itération pour créer des expériences utilisateur parfaites !',
    diagram: { input: 'Itération rapide', core: 'IA', output: 'Plus de résultats' },
    team: 'On a tous les deux acquis des années d’expérience dans le design UI/UX en plus de nos diplômes. L’IA générative ne remplace pas notre expertise mais elle l’accélère grandement.',
    modes: 'Avec également un passage par la pédagogie de l’école 42, notre équipe peut prendre en charge des projets de bout en bout, ou rejoindre la vôtre sur un point précis de votre développement.',
  },
  services: {
    title: 'Nos services',
    hint: 'Faites glisser pour voir tous nos services',
    priceLabel: ['Prix', 'hors TVA'],
    infoLabel: 'En savoir plus sur',
    from: 'àpd',
    perDay: 'jour',
    free: 'Offert',
    /** Ordre du carousel (celui de la maquette) et nom court affiché sur chaque carte. */
    cards: [
      { slug: 'creation-mvp-saas', name: 'Développement SaaS' },
      { slug: 'refonte-site-web', name: 'Refonte de site web' },
      { slug: 'creation-landing-page', name: 'Landing page' },
      { slug: 'applications-evenementielles', name: 'Événementiel interactif' },
      { slug: 'creation-ecommerce', name: 'Site e-commerce' },
      { slug: 'optimisation-site-web', name: 'Optimisation de site web' },
      { slug: 'audit-offert', name: 'Audit offert' },
    ] as { slug: AboutServiceSlug; name: string }[],
  },
  work: {
    // Deux lignes (maquette) : « / Remote » s'aligne sur la plus longue.
    titleLines: ['On travaille depuis', 'Bruxelles et en remote.'],
    based: ['Basés à Bruxelles,', 'Belgique'],
    remote: '/ Remote',
    text: 'On accompagne entrepreneurs et startups dans la création de leur présence en ligne, de leurs applications et de leurs outils.',
    cta: 'Nous contacter',
  },
  map: {
    label: 'Carte_2026',
    at: 'À',
    city: 'BXL',
    coordinates: 'Coordonnées : (50,85045° N, 4,34878° E)',
    region: 'Région : Bruxelles-Capitale',
    days: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
    mapAlt: 'Carte des 19 communes de la Région de Bruxelles-Capitale, avec notre position au centre-ville',
    /** Points cardinaux de la boussole, dans l'ordre N, NE, E, SE, S, SO, O, NO. */
    compassLabels: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'],
    /** Le même point que la carte (centre de Bruxelles), en degrés, minutes et secondes. */
    compass: ['Bruxelles-centre', '50°51\'2" N, 4°20\'56" E'],
    emailLabel: 'Nous écrire',
  },
};

const en: typeof fr = {
  hero: {
    titleBrand: 'Horde',
    titleRest: ' is the will to see beautiful things on the web.',
    statement: 'Today everything is going digital, at a crazy speed, but the quality of experiences is taking a hit.',
    offer: 'What we offer is taking the time to build interfaces well thought out for humans and, above all, lasting for the way you use them.',
  },
  marquee: ['About', 'Us'],
  photos: {
    teamAlt: 'Nicolas Prémont and Alexandre Potakowski, the two founders of Horde',
    teamCaption: 'Nicolas Prémont, co-founder and developer, and Alexandre Potakowski, co-founder and UX designer.',
    deskAlt: 'A keyboard on a desk in daylight',
  },
  ghost: 'The Agency',
  ghostScale: { mobile: 0.83, desktop: 0.91 },
  speed: {
    title: 'Let’s use this iteration speed to create perfect user experiences!',
    diagram: { input: 'Fast iteration', core: 'AI', output: 'More outcome' },
    team: 'On top of our degrees, we’ve both built up years of experience in UI/UX design. Generative AI doesn’t replace our expertise, but it speeds it up enormously.',
    modes: 'Having also been through the 42 school’s teaching approach, our team can take projects on from start to finish, or join yours on a specific part of your development.',
  },
  services: {
    title: 'Our services',
    hint: 'Drag to see all our services',
    priceLabel: ['Price', 'excl. VAT'],
    infoLabel: 'Learn more about',
    from: 'from',
    perDay: 'day',
    free: 'Free',
    cards: [
      { slug: 'creation-mvp-saas', name: 'SaaS development' },
      { slug: 'refonte-site-web', name: 'Website redesign' },
      { slug: 'creation-landing-page', name: 'Landing page' },
      { slug: 'applications-evenementielles', name: 'Interactive events' },
      { slug: 'creation-ecommerce', name: 'E-commerce website' },
      { slug: 'optimisation-site-web', name: 'Website optimization' },
      { slug: 'audit-offert', name: 'Free audit' },
    ],
  },
  work: {
    titleLines: ['We work from Brussels', 'and remotely.'],
    based: ['Based in Brussels,', 'Belgium'],
    remote: '/ Remote',
    text: 'We help entrepreneurs and startups build their online presence, their apps and their tools.',
    cta: 'Get in touch',
  },
  map: {
    label: 'Map_2026',
    at: 'At',
    city: 'BXL',
    coordinates: 'Coordinates: (50.85045° N, 4.34878° E)',
    region: 'Region: Marshland, Belgium',
    days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    mapAlt: 'Map of the 19 municipalities of the Brussels-Capital Region, with our location in the city centre',
    compassLabels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    compass: ['Central Brussels', '50°51\'2" N, 4°20\'56" E'],
    emailLabel: 'Email us',
  },
};

export function getAboutCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
