import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Applications événementielles » (pilote de la refonte des pages services).
 * Faits sourcés : Code Relay (repo codeRelayWeb + Nicolas), Rocket Mission (article
 * vibe-coding + post LinkedIn de 42 Belgium). Ne rien ajouter qui ne soit pas vérifié.
 */
const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Applications événementielles · Bruxelles',
    titleLines: ['Votre public ne regarde', 'plus l’écran.', 'Il joue dessus.'],
    lead:
      'Jeux d’équipe, défis en direct, écrans qui se remplissent depuis les téléphones de la salle : on conçoit et on développe l’application qui fait participer votre public, du QR code d’accueil au classement final.',
    facts: ['À partir de 1 999 € HTVA', '3 semaines du brief au jour J', 'Rien à installer pour les participants'],
    cta: 'Parlez-nous de votre événement',
    secondary: 'Voir nos projets',
  },
  shot: {
    key: 'relay',
    alt: 'Salle comble autour de l’écran du Code Relay : brief de la manche, minuteur à 05:00 et QR code d’inscription.',
    caption: 'Code Relay · 42 Belgium à la Proximus Tech Student Experience · 2 avril 2026',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'vous organisez un workshop, un salon, une conférence ou une soirée, et vous voulez que les gens participent au lieu d’écouter ;',
      'vous êtes une agence événementielle et votre client demande « quelque chose d’interactif » ;',
      'vous avez une date fixe et ça doit marcher ce jour-là, pas « à peu près ».',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'un sondage Slido ou un quiz Kahoot suffit : utilisez-les, ils font très bien ce travail ;',
      'votre événement a lieu dans moins de 3 semaines.',
    ],
  },
  projects: {
    count: '02',
    title: 'Deux événements pour 42 Belgium',
    items: [
      {
        name: 'Code Relay',
        meta: ['Proximus Tech Student Experience', '2 avril 2026', '2 groupes de 25 à 30 personnes', 'Développé en 3 semaines'],
        text:
          'Une course de relais, mais en code. Un problème est posé, les équipes ont 5 minutes pour réfléchir, puis chaque membre code 2 minutes avant de passer le clavier au suivant, sur 8 tours maximum. Le code final est noté par un testeur automatique, puis par un jury pour la lisibilité. Testé une semaine avant avec un vrai groupe à 42, conçu et animé sur place par nous.',
        listLabel: 'L’application faisait tourner l’événement',
        list: [
          'inscription des équipes par QR code, sans compte',
          'minuteurs et phases pilotés par l’organisateur',
          'brief et classement sur l’écran de la salle',
          'interface de notation pour le jury',
        ],
        note: null,
        images: [{ key: 'relayScreen', alt: 'Écran du Code Relay pendant une manche : brief, minuteur à 05:00 et QR code, devant les participants.' }],
        link: null,
      },
      {
        name: 'Rocket Mission',
        meta: ['FTI Brussels, au WIELS', '20 octobre 2026', '2 groupes de 20 élèves', 'FR · EN · NL'],
        text:
          'Un atelier d’initiation à la programmation pour des élèves de dernière année du secondaire, présenté par 42 Belgium au Flanders Technology & Innovation Festival. Il reprend le principe de Robotzzle, le jeu d’admission de 42 : les équipes programment une fusée qui doit ramasser des cristaux. On a tout conçu, de A à Z : les missions, le contenu et l’application.',
        listLabel: 'Quatre interfaces qui se parlent en temps réel',
        list: [
          'le poste d’équipe, sur ordinateur',
          'un labo sur chaque téléphone, rejoint par QR code',
          'un écran TV avec la progression de toutes les équipes',
          'une régie pour les coachs',
        ],
        note:
          'Premier jeu jouable au bout d’une journée, atelier testé avec de vrais participants un mois avant le festival. Le jour J, chaque imprévu avait déjà son parcours : retardataires, pause, poste à récupérer, équipe qui appelle un coach.',
        images: [
          { key: 'wiels', alt: 'Élèves en atelier Rocket Mission au WIELS, devant la bannière 42 Belgium et les consignes projetées.' },
          { key: 'postes', alt: 'Deux postes d’équipe Rocket Mission : la fusée suit les instructions programmées pour ramasser les cristaux.' },
        ],
        link: { label: 'L’histoire complète du projet', href: '/fr/blog/vibe-coding/' },
      },
    ],
  },
  quote: {
    label: 'Ce qu’en dit 42 Belgium',
    linkLabel: 'Voir le post',
    items: [
      {
        text: '«\u00a0Un grand merci à Nicolas Prémont […] pour avoir créé et animé cet atelier\u202f!\u00a0»',
        source: '42 Belgium sur LinkedIn, à propos du Code Relay (traduit de l’anglais)',
        href: 'https://www.linkedin.com/posts/great-to-be-part-of-the-proximus-tech-student-share-7445463745817956353-jYh4/',
      },
      {
        text: '«\u00a0Nous n’avons dit à aucun élève de travailler ensemble. Pas besoin. En quelques minutes, ils comparaient leurs idées, testaient des solutions et s’entraidaient.\u00a0»',
        source: '42 Belgium sur LinkedIn, à propos de Rocket Mission (traduit de l’anglais)',
        href: 'https://www.linkedin.com/posts/42belgium_42belgium-ftibrussels-peerlearning-activity-7518680284150558720-R0iJ',
      },
    ],
  },
  formats: {
    title: 'Ce qu’on peut construire pour vous',
    items: [
      {
        title: 'Activer une salle avant une plénière',
        text: 'Les participants scannent un QR code en s’asseyant et envoient leur prénom, une étoile ou un selfie sur le grand écran. La salle se remplit avant même que le premier orateur monte sur scène.',
      },
      {
        title: 'Faire jouer des équipes',
        text: 'Défis, missions, relais, classement en direct. L’animateur garde la main sur le rythme depuis sa régie.',
      },
      {
        title: 'Animer un stand de salon',
        text: 'Une interaction courte, défi, quiz ou démo, qui attire du monde et récolte des contacts quand c’est votre objectif.',
      },
      {
        title: 'Faire participer pendant une présentation',
        text: 'Questions, votes ou réactions en direct pendant un pitch, une conférence ou une présentation à des investisseurs.',
      },
    ],
  },
  process: {
    title: 'Comment ça se passe',
    steps: [
      {
        when: 'Semaine 0',
        title: 'Appel de cadrage, gratuit',
        text: 'Vous racontez le format, le public, le lieu et les écrans. On vous dit si c’est faisable, en combien de temps et pour quel budget.',
      },
      {
        when: 'Semaines 1 et 2',
        title: 'Développement',
        text: 'Vous recevez un lien de test dès les premiers jours et vous jouez avec à mesure que ça avance.',
      },
      {
        when: 'Semaine 3',
        title: 'Test grandeur nature',
        text: 'Une semaine avant, on fait jouer de vraies personnes sur les vrais appareils. Ce qu’on découvre est corrigé avant le jour J.',
      },
      {
        when: 'Jour J',
        title: 'L’événement',
        text: 'L’application est en ligne et votre équipe sait la piloter. On peut être sur place si c’est prévu au devis.',
      },
    ],
  },
  price: {
    label: 'Le prix',
    title: 'À partir de 1 999 € HTVA,',
    titleRest: 'puis sur devis.',
    intro: 'Le prix dépend de deux choses.',
    factors: [
      {
        title: 'L’infrastructure',
        text: 'Le nombre de participants connectés en même temps, les écrans à alimenter, d’un écran TV à un mur LED, et le réseau du lieu.',
      },
      {
        title: 'Les responsabilités',
        text: 'Ce qu’on prend en charge : de la livraison de l’application à la coordination avec votre prestataire audiovisuel, la modération en direct et la présence sur place le jour J.',
      },
    ],
    note: 'On vous donne une fourchette dès le premier appel. Pas besoin d’un cahier des charges.',
  },
  faq: {
    title: 'Les questions qu’on nous pose',
    items: [
      {
        q: 'Les participants doivent-ils installer une application ?',
        a: 'Non. Ils scannent un QR code et tout s’ouvre dans le navigateur de leur téléphone.',
      },
      {
        q: 'Et si des centaines de personnes se connectent en même temps ?',
        a: 'On dimensionne l’application pour votre pic de connexions, et on le teste avant l’événement.',
      },
      {
        q: 'Et si le wifi du lieu est mauvais ?',
        a: 'On vérifie le réseau au cadrage. Si besoin, on prévoit une solution de repli.',
      },
      {
        q: 'Vous travaillez avec notre prestataire audiovisuel ?',
        a: 'Oui. On cale l’affichage sur leur configuration d’écrans et on coordonne directement avec eux.',
      },
      {
        q: 'Peut-on réutiliser l’application pour une autre édition ?',
        a: 'Oui. Vous recevez le code et les accès, et on peut prévoir la remise à zéro des sessions dès le départ.',
      },
      {
        q: 'Vous parlez néerlandais ?',
        a: 'Nous travaillons en français et en anglais. Les interfaces, elles, peuvent être en français, en anglais et en néerlandais : Rocket Mission tournait dans les trois langues.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Vous avez une date ?', 'Parlons-en.'],
    text: 'Envoyez-nous le format, le nombre de participants et la date. On vous répond sous 24 h avec une première fourchette de prix.',
    primary: 'Parlez-nous de votre événement',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Premier appel gratuit · Réponse sous 24 h',
  },
};

const en: ServicePageCopy = {
  hero: {
    eyebrow: 'Event web apps · Brussels',
    titleLines: ['Your audience stops', 'watching the screen.', 'They play on it.'],
    lead:
      'Team games, live challenges, screens that fill up from the phones in the room: we design and build the app that gets your audience taking part, from the welcome QR code to the final leaderboard.',
    facts: ['From €1,999 excl. VAT', '3 weeks from brief to event day', 'Nothing for attendees to install'],
    cta: 'Tell us about your event',
    secondary: 'See our projects',
  },
  shot: {
    key: 'relay',
    alt: 'A packed room around the Code Relay screen: round brief, timer at 05:00 and registration QR code.',
    caption: 'Code Relay · 42 Belgium at the Proximus Tech Student Experience · 2 April 2026',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'you are running a workshop, a trade show, a conference or an evening event, and you want people to take part instead of just listening;',
      'you are an event agency and your client is asking for “something interactive”;',
      'you have a fixed date and it has to work on that day, not “more or less”.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'a Slido poll or a Kahoot quiz is enough: use them, they do that job very well;',
      'your event is less than 3 weeks away.',
    ],
  },
  projects: {
    count: '02',
    title: 'Two events for 42 Belgium',
    items: [
      {
        name: 'Code Relay',
        meta: ['Proximus Tech Student Experience', '2 April 2026', '2 groups of 25 to 30 people', 'Built in 3 weeks'],
        text:
          'A relay race, but with code. A problem is set, teams get 5 minutes to think, then each member codes for 2 minutes before handing the keyboard to the next, for up to 8 turns. The final code is scored by an automated tester, then by a jury for readability. Tested a week before with a real group at 42, designed and run on site by us.',
        listLabel: 'The app ran the event',
        list: [
          'team registration by QR code, no account needed',
          'timers and phases driven by the organiser',
          'brief and leaderboard on the room screen',
          'a scoring interface for the jury',
        ],
        note: null,
        images: [{ key: 'relayScreen', alt: 'The Code Relay screen during a round: brief, timer at 05:00 and QR code, in front of the participants.' }],
        link: null,
      },
      {
        name: 'Rocket Mission',
        meta: ['FTI Brussels, at WIELS', '20 October 2026', '2 groups of 20 students', 'FR · EN · NL'],
        text:
          'An introduction-to-programming workshop for final-year secondary school students, presented by 42 Belgium at the Flanders Technology & Innovation Festival. It builds on Robotzzle, 42’s admission game: teams program a rocket that has to collect crystals. We designed all of it, from A to Z: the missions, the content and the app.',
        listLabel: 'Four interfaces talking in real time',
        list: [
          'the team station, on a computer',
          'a lab on every phone, joined by QR code',
          'a TV screen showing every team’s progress',
          'a control room for the coaches',
        ],
        note:
          'First playable game after one day, workshop tested with real participants a month before the festival. On the day, every edge case already had its path: latecomers, a break, a station to recover, a team calling a coach.',
        images: [
          { key: 'wiels', alt: 'Students in a Rocket Mission workshop at WIELS, in front of the 42 Belgium banner and the projected instructions.' },
          { key: 'postes', alt: 'Two Rocket Mission team stations: the rocket follows the programmed instructions to collect crystals.' },
        ],
        link: { label: 'The full story of the project', href: '/en/blog/vibe-coding-explained/' },
      },
    ],
  },
  quote: {
    label: 'What 42 Belgium says',
    linkLabel: 'See the post',
    items: [
      {
        text: '“Big shoutout to Nicolas Prémont […] for creating and leading this workshop!”',
        source: '42 Belgium on LinkedIn, about Code Relay',
        href: 'https://www.linkedin.com/posts/great-to-be-part-of-the-proximus-tech-student-share-7445463745817956353-jYh4/',
      },
      {
        text: '“We didn’t tell any students to work together. We didn’t have to. Within minutes, they were comparing ideas, testing solutions, and helping each other out.”',
        source: '42 Belgium on LinkedIn, about Rocket Mission',
        href: 'https://www.linkedin.com/posts/42belgium_42belgium-ftibrussels-peerlearning-activity-7518680284150558720-R0iJ',
      },
    ],
  },
  formats: {
    title: 'What we can build for you',
    items: [
      {
        title: 'Warm up a room before a plenary',
        text: 'Attendees scan a QR code as they sit down and send their first name, a star or a selfie to the big screen. The room fills up before the first speaker even walks on stage.',
      },
      {
        title: 'Get teams playing',
        text: 'Challenges, missions, relays, a live leaderboard. The host keeps control of the pace from their control room.',
      },
      {
        title: 'Bring a trade show stand to life',
        text: 'A short interaction, a challenge, a quiz or a demo, that draws people in and collects contacts when that is your goal.',
      },
      {
        title: 'Engage people during a talk',
        text: 'Live questions, votes or reactions during a pitch, a conference or an investor presentation.',
      },
    ],
  },
  process: {
    title: 'How it works',
    steps: [
      {
        when: 'Week 0',
        title: 'Scoping call, free',
        text: 'You tell us the format, the audience, the venue and the screens. We tell you whether it is feasible, how long it takes and what it costs.',
      },
      {
        when: 'Weeks 1 and 2',
        title: 'Development',
        text: 'You get a test link in the first days and can play with it as it takes shape.',
      },
      {
        when: 'Week 3',
        title: 'Real-life test',
        text: 'A week before, real people play it on the real devices. Whatever we find is fixed before the day.',
      },
      {
        when: 'Event day',
        title: 'The event',
        text: 'The app is live and your team knows how to run it. We can be on site if it is in the quote.',
      },
    ],
  },
  price: {
    label: 'Pricing',
    title: 'From €1,999 excl. VAT,',
    titleRest: 'then on quote.',
    intro: 'The price depends on two things.',
    factors: [
      {
        title: 'Infrastructure',
        text: 'How many participants are connected at the same time, the screens to drive, from a TV to an LED wall, and the venue’s network.',
      },
      {
        title: 'Responsibilities',
        text: 'What we take on: from delivering the app to coordinating with your AV provider, live moderation and being on site on the day.',
      },
    ],
    note: 'We give you a price range on the first call. No specification document needed.',
  },
  faq: {
    title: 'Questions we get asked',
    items: [
      {
        q: 'Do attendees need to install an app?',
        a: 'No. They scan a QR code and everything opens in their phone’s browser.',
      },
      {
        q: 'What if hundreds of people connect at once?',
        a: 'We size the app for your connection peak and test it before the event.',
      },
      {
        q: 'What if the venue wifi is poor?',
        a: 'We check the network during scoping. If needed, we plan a fallback.',
      },
      {
        q: 'Do you work with our AV provider?',
        a: 'Yes. We match the display to their screen setup and coordinate with them directly.',
      },
      {
        q: 'Can we reuse the app for another edition?',
        a: 'Yes. You receive the code and the access, and we can build in a session reset from the start.',
      },
      {
        q: 'Do you speak Dutch?',
        a: 'We work in French and English. The interfaces themselves can be in French, English and Dutch: Rocket Mission ran in all three.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Got a date?', 'Let’s talk.'],
    text: 'Send us the format, the number of participants and the date. We reply within 24 hours with a first price range.',
    primary: 'Tell us about your event',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'First call free · Reply within 24 hours',
  },
};

export function getEventsCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
