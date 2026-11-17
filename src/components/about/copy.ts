import type { Locale } from '../../i18n';

/**
 * Textes de la page « Notre culture » (/about/). Formulations de Nicolas et Alexandre,
 * gardées au plus près : on n'ajoute que les intitulés et les boutons.
 */
const fr = {
  hero: {
    eyebrow: 'Notre culture',
    // h1 : la phrase entière ; découpée en lignes pour l'animation.
    titleLines: ['Horde, c’est la volonté', 'de voir de belles choses', 'sur le web.'],
    location: 'Bruxelles & remote',
    bookCall: 'Réserver un appel',
  },
  marquee: ['Human-first', 'Design UI/UX', 'Développement', 'Bruxelles', 'Remote', 'Durable'],
  vision: {
    statementLabel: 'L’état actuel des choses',
    statement: 'Aujourd’hui tout se numérise, ça va à une vitesse folle, mais la qualité des expériences en prend un coup.',
    offerLabel: 'Ce qu’on propose',
    // [avant, mis en avant, entre, mis en avant, après]
    offer: ['C’est de prendre le temps de faire des interfaces ', 'bien pensées pour l’humain', ' et surtout ', 'durables', ' pour votre usage.'],
    tag: 'Human-first',
  },
  speed: {
    label: 'Actuellement',
    lead: 'Tout va beaucoup plus vite qu’il y a un an,',
    title: 'alors utilisons cette vitesse d’itération pour créer des expériences utilisateur parfaites !',
  },
  team: {
    label: 'L’équipe',
    text: 'On est tous les deux diplômés dans le design UI/UX, en plus d’en faire depuis bientôt 10 ans.',
    photoAlt: 'Nicolas et Alexandre, les deux fondateurs de Horde',
    people: [
      {
        id: 'nicolas',
        name: 'Nicolas Prémont',
        role: 'Co-fondateur · Design & développement',
        tags: ['Diplômé UI/UX', 'Formation 42'],
        alt: 'Nicolas Prémont, co-fondateur de Horde',
      },
      {
        id: 'alexandre',
        name: 'Alexandre Potakowski',
        role: 'Co-fondateur · Design UI/UX',
        tags: ['Diplômé UI/UX'],
        alt: 'Alexandre Potakowski, co-fondateur de Horde',
      },
    ],
    quote: '« En plus du design, je suis passé par la méthodologie et la formation 42, ce qui a permis à notre précision technique de passer au niveau supérieur. »',
    quoteAuthor: 'Nicolas',
    quoteRole: 'Co-fondateur',
  },
  work: {
    label: 'Comment on travaille',
    text: 'On travaille depuis Bruxelles et en remote. On accompagne entrepreneurs et startups dans la création de leur présence en ligne, de leurs applications et de leurs outils.',
    remote: 'Remote',
    modesLabel: 'Deux façons de collaborer',
    modes: [
      {
        title: 'De bout en bout',
        text: 'Notre équipe peut prendre en charge des projets de bout en bout.',
        cta: 'Démarrer un projet',
      },
      {
        title: 'Avec votre équipe',
        text: 'Ou rejoindre la vôtre sur un point précis de votre développement.',
        cta: 'Réserver un appel',
      },
    ],
  },
  cta: {
    label: 'Prochaine étape',
    title: 'Parlons de votre projet.',
    text: 'Un appel de 30 minutes pour en discuter, ou un message via la page contact : on vous répond.',
    bookCall: 'Réserver un appel',
    bookCallMeta: '30 min',
    contact: 'Écrire via la page contact',
    newTab: '(s’ouvre dans un nouvel onglet)',
  },
};

const en: typeof fr = {
  hero: {
    eyebrow: 'Our culture',
    titleLines: ['Horde is the will', 'to see beautiful things', 'on the web.'],
    location: 'Brussels & remote',
    bookCall: 'Book a call',
  },
  marquee: ['Human-first', 'UI/UX design', 'Development', 'Brussels', 'Remote', 'Lasting'],
  vision: {
    statementLabel: 'The current state of things',
    statement: 'Today everything is going digital, at a crazy speed, but the quality of experiences is taking a hit.',
    offerLabel: 'What we offer',
    offer: ['Taking the time to build interfaces ', 'well thought out for humans', ' and above all ', 'lasting', ' for the way you use them.'],
    tag: 'Human-first',
  },
  speed: {
    label: 'Right now',
    lead: 'Everything moves much faster than a year ago,',
    title: 'so let’s use that iteration speed to create perfect user experiences!',
  },
  team: {
    label: 'The team',
    text: 'We both hold degrees in UI/UX design, and we’ve been doing it for almost 10 years.',
    photoAlt: 'Nicolas and Alexandre, the two founders of Horde',
    people: [
      {
        id: 'nicolas',
        name: 'Nicolas Prémont',
        role: 'Co-founder · Design & development',
        tags: ['UI/UX degree', '42 school'],
        alt: 'Nicolas Prémont, co-founder of Horde',
      },
      {
        id: 'alexandre',
        name: 'Alexandre Potakowski',
        role: 'Co-founder · UI/UX design',
        tags: ['UI/UX degree'],
        alt: 'Alexandre Potakowski, co-founder of Horde',
      },
    ],
    quote: '“On top of design, I went through the 42 methodology and training, which took our technical precision to the next level.”',
    quoteAuthor: 'Nicolas',
    quoteRole: 'Co-founder',
  },
  work: {
    label: 'How we work',
    text: 'We work from Brussels and remotely. We help entrepreneurs and startups build their online presence, their apps and their tools.',
    remote: 'Remote',
    modesLabel: 'Two ways to work together',
    modes: [
      {
        title: 'End to end',
        text: 'Our team can take projects on from start to finish.',
        cta: 'Start a project',
      },
      {
        title: 'With your team',
        text: 'Or join yours on a specific part of your development.',
        cta: 'Book a call',
      },
    ],
  },
  cta: {
    label: 'Next step',
    title: 'Let’s talk about your project.',
    text: 'A 30-minute call to discuss it, or a message through the contact page: we’ll get back to you.',
    bookCall: 'Book a call',
    bookCallMeta: '30 min',
    contact: 'Write to us on the contact page',
    newTab: '(opens in a new tab)',
  },
};

export function getAboutCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
