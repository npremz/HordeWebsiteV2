import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Développement MVP » (refonte v2).
 * Faits sourcés : Rocket Mission (article vibe-coding), Code Relay (repo codeRelayWeb, Nicolas,
 * post LinkedIn 42 Belgium). Délai moyen et facteurs de prix : Nicolas (nov. 2026).
 * SEO (GSC) : garder « investisseurs / levée de fonds », « Belgique », « MVP ».
 */
const CODE_RELAY_POST =
  'https://www.linkedin.com/posts/great-to-be-part-of-the-proximus-tech-student-share-7445463745817956353-jYh4/';
const ROCKET_POST =
  'https://www.linkedin.com/posts/42belgium_42belgium-ftibrussels-peerlearning-activity-7518680284150558720-R0iJ';

const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Développement MVP · Bruxelles',
    titleLines: ['Votre idée,', 'testée vite.', 'Corrigée vite.'],
    lead:
      'Vous avez une idée à tester, mais pas de bagage technique. On construit votre MVP par itérations rapides : on livre, on teste avec de vrais utilisateurs, on corrige. Jusqu’à un produit prêt pour le marché, et pour vos investisseurs.',
    facts: ['À partir de 3 999 € HTVA', 'En moyenne 2 mois jusqu’à la production', 'Avancement visible tout du long'],
    cta: 'Parlez-nous de votre idée',
    secondary: 'Voir ce qu’on a livré',
  },
  shot: {
    key: 'postes',
    alt: 'Deux postes d’équipe Rocket Mission en plein atelier : la fusée suit les instructions programmées pour ramasser les cristaux.',
    caption: 'Rocket Mission · testé avec de vrais participants avant le lancement',
    position: '50% 35%',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'vous avez une idée ou un concept, et vous voulez savoir s’il tient face à de vrais utilisateurs avant d’investir plus ;',
      'vous préparez une levée de fonds et il vous faut un produit qui marche, pas une maquette ;',
      'vous n’avez pas d’équipe technique et vous voulez des interlocuteurs qui parlent produit, pas jargon.',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'vous voulez toutes les fonctions dès le premier jour ;',
      'une maquette cliquable suffit pour l’instant à valider votre idée.',
    ],
  },
  projects: {
    count: '02',
    title: 'Deux produits livrés pour 42 Belgium',
    items: [
      {
        name: 'Rocket Mission',
        meta: ['Atelier de programmation', 'Juillet → octobre 2026', 'FR · EN · NL'],
        text:
          'Une application d’atelier où des équipes programment une fusée, présentée par 42 Belgium au FTI Brussels. Elle a avancé exactement comme un MVP doit avancer : une première version très tôt, des tests réels, des corrections à chaque retour.',
        listLabel: 'Les itérations, d’après l’historique du projet',
        list: [
          'premier jeu jouable au bout d’une journée',
          'version collaborative en ligne cinq jours plus tard',
          'test avec de vrais participants un mois avant le lancement, puis corrections',
          'à la livraison : 4 interfaces en temps réel, 3 langues, plus de 400 tests automatisés',
        ],
        note: null,
        images: [{ key: 'wiels', alt: 'Élèves en atelier Rocket Mission au WIELS, devant la bannière 42 Belgium et les consignes projetées.' }],
        link: { label: 'L’histoire complète du projet', href: '/fr/blog/vibe-coding/' },
      },
      {
        name: 'Code Relay',
        meta: ['Tournoi de programmation', 'Développé en 3 semaines', '2 avril 2026'],
        text:
          'Une application complète pour faire tourner un tournoi de code en relais : inscription des équipes, pilotage par l’organisateur, notation par un jury, classement en direct. Testée une semaine avant avec un vrai groupe à 42, puis utilisée par 2 groupes de 25 à 30 personnes.',
        listLabel: 'Ce qui a été livré',
        list: [
          'inscription par QR code, sans compte',
          'cockpit organisateur : phases, minuteurs, manches',
          'interface jury avec brouillons',
          'écran de classement en direct',
        ],
        note: null,
        images: [{ key: 'relayScreen', alt: 'Écran du Code Relay pendant une manche : brief, minuteur à 05:00 et QR code, devant les participants.' }],
        link: null,
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
        href: CODE_RELAY_POST,
      },
      {
        text: '«\u00a0Nous n’avons dit à aucun élève de travailler ensemble. Pas besoin. En quelques minutes, ils comparaient leurs idées, testaient des solutions et s’entraidaient.\u00a0»',
        source: '42 Belgium sur LinkedIn, à propos de Rocket Mission (traduit de l’anglais)',
        href: ROCKET_POST,
      },
    ],
  },
  formats: {
    title: 'Ce que « minimal » veut dire chez nous',
    items: [
      {
        title: 'Un parcours qui marche de bout en bout',
        text: 'Plutôt que dix fonctions à moitié finies, celui qui prouve votre idée, terminé.',
      },
      {
        title: 'Testé par de vraies personnes',
        text: 'Avant d’être montré à des investisseurs. Ce qu’elles font vraiment compte plus que ce qu’on imaginait.',
      },
      {
        title: 'Une base saine',
        text: 'Sécurité, tests automatisés, sauvegardes. La version 2 repart de cette base, on ne jette rien.',
      },
      {
        title: 'Le code est à vous',
        text: 'Vous recevez le code et tous les accès. Vous pouvez continuer avec nous ou avec votre future équipe.',
      },
    ],
  },
  process: {
    title: 'Comment ça se passe',
    steps: [
      {
        when: '01',
        title: 'Appel de cadrage, gratuit',
        text: 'Vous racontez l’idée, les utilisateurs visés et ce que vous voulez prouver. On vous dit ce qui entre dans le MVP, ce qui attendra, et le budget.',
      },
      {
        when: '02',
        title: 'Spécification courte',
        text: 'On écrit ce que le produit doit faire avant de le construire. Vous validez.',
      },
      {
        when: '03',
        title: 'Itérations',
        text: 'On livre, vous testez sur un lien de test, on corrige. Vous voyez le produit avancer à chaque étape.',
      },
      {
        when: '04',
        title: 'Test avec de vrais utilisateurs',
        text: 'Un vrai groupe utilise le produit avant le lancement. Ce qu’on découvre est corrigé.',
      },
      {
        when: '05',
        title: 'Mise en production',
        text: 'Le produit est en ligne, vous recevez le code et les accès. Les évolutions suivantes sont chiffrées à part.',
      },
    ],
    note: 'Comptez en moyenne 2 mois jusqu’à un MVP prêt pour la production. Vous suivez l’avancement tout du long.',
  },
  price: {
    label: 'Le prix',
    title: 'À partir de 3 999 € HTVA,',
    titleRest: 'selon la complexité.',
    intro: 'Ce qui fait varier le prix, c’est la complexité des fonctionnalités.',
    factors: [
      {
        title: 'Les fonctionnalités',
        text: 'Le nombre de parcours, de rôles et d’écrans, les paiements, les intégrations avec d’autres outils.',
      },
      {
        title: 'L’infrastructure et la sécurité',
        text: 'Un SaaS multi-clients, où chaque client a son espace séparé, demande plus d’infrastructure et plus de sécurité qu’un outil à un seul espace.',
      },
    ],
    note: 'On vous donne une fourchette dès le premier appel. Pas besoin d’un cahier des charges.',
  },
  faq: {
    title: 'Les questions qu’on nous pose',
    items: [
      {
        q: 'Je n’ai pas de cahier des charges, c’est un problème ?',
        a: 'Non. On l’écrit ensemble pendant le cadrage.',
      },
      {
        q: 'Combien de temps faut-il pour un MVP ?',
        a: 'En moyenne 2 mois jusqu’à un MVP prêt pour la production. Une première version testable arrive bien plus tôt, et vous suivez l’avancement tout du long.',
      },
      {
        q: 'Un MVP, ça suffit pour lever des fonds ?',
        a: 'Il vous donne un produit qui marche et des retours d’utilisateurs réels, ce que les investisseurs veulent voir en premier.',
      },
      {
        q: 'Et après le MVP ?',
        a: 'On peut continuer à faire évoluer le produit avec vous, ou transmettre le code à votre future équipe.',
      },
      {
        q: 'Vous utilisez l’IA ?',
        a: 'Oui, pour itérer plus vite. Tout est relu, testé et vérifié par nous avant la mise en production.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Vous avez une idée ?', 'Testons-la.'],
    text: 'Racontez-nous l’idée, à qui elle s’adresse et ce que vous voulez prouver. On vous répond sous 24 h avec un premier périmètre.',
    primary: 'Parlez-nous de votre idée',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Premier appel gratuit · Réponse sous 24 h',
  },
};

const en: ServicePageCopy = {
  hero: {
    eyebrow: 'MVP development · Brussels',
    titleLines: ['Your idea,', 'tested fast.', 'Fixed fast.'],
    lead:
      'You have an idea to test, but no technical background. We build your MVP in fast iterations: we ship, we test with real users, we fix. All the way to a product ready for the market, and for your investors.',
    facts: ['From €3,999 excl. VAT', 'About 2 months to production on average', 'Progress visible throughout'],
    cta: 'Tell us about your idea',
    secondary: 'See what we shipped',
  },
  shot: {
    key: 'postes',
    alt: 'Two Rocket Mission team stations during a workshop: the rocket follows the programmed instructions to collect crystals.',
    caption: 'Rocket Mission · tested with real participants before launch',
    position: '50% 35%',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'you have an idea or a concept and want to know whether it holds up with real users before investing more;',
      'you are preparing to raise funds and need a product that works, not a mockup;',
      'you have no technical team and want people who talk product, not jargon.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'you want every feature from day one;',
      'a clickable mockup is enough to validate your idea for now.',
    ],
  },
  projects: {
    count: '02',
    title: 'Two products shipped for 42 Belgium',
    items: [
      {
        name: 'Rocket Mission',
        meta: ['Programming workshop', 'July → October 2026', 'FR · EN · NL'],
        text:
          'A workshop app in which teams program a rocket, presented by 42 Belgium at FTI Brussels. It moved exactly the way an MVP should: a first version very early, real tests, fixes after every round of feedback.',
        listLabel: 'The iterations, from the project history',
        list: [
          'first playable game after one day',
          'collaborative version online five days later',
          'test with real participants a month before launch, then fixes',
          'at delivery: 4 real-time interfaces, 3 languages, over 400 automated tests',
        ],
        note: null,
        images: [{ key: 'wiels', alt: 'Students in a Rocket Mission workshop at WIELS, in front of the 42 Belgium banner and the projected instructions.' }],
        link: { label: 'The full story of the project', href: '/en/blog/vibe-coding-explained/' },
      },
      {
        name: 'Code Relay',
        meta: ['Programming tournament', 'Built in 3 weeks', '2 April 2026'],
        text:
          'A complete app to run a relay coding tournament: team registration, organiser controls, jury scoring, live leaderboard. Tested a week before with a real group at 42, then used by 2 groups of 25 to 30 people.',
        listLabel: 'What was delivered',
        list: [
          'registration by QR code, no account needed',
          'organiser cockpit: phases, timers, rounds',
          'jury interface with drafts',
          'live leaderboard screen',
        ],
        note: null,
        images: [{ key: 'relayScreen', alt: 'The Code Relay screen during a round: brief, timer at 05:00 and QR code, in front of the participants.' }],
        link: null,
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
        href: CODE_RELAY_POST,
      },
      {
        text: '“We didn’t tell any students to work together. We didn’t have to. Within minutes, they were comparing ideas, testing solutions, and helping each other out.”',
        source: '42 Belgium on LinkedIn, about Rocket Mission',
        href: ROCKET_POST,
      },
    ],
  },
  formats: {
    title: 'What “minimal” means to us',
    items: [
      {
        title: 'One journey that works end to end',
        text: 'Rather than ten half-finished features, the one that proves your idea, finished.',
      },
      {
        title: 'Tested by real people',
        text: 'Before it is shown to investors. What people actually do matters more than what we imagined.',
      },
      {
        title: 'A sound foundation',
        text: 'Security, automated tests, backups. Version 2 starts from this foundation; nothing gets thrown away.',
      },
      {
        title: 'The code is yours',
        text: 'You receive the code and every access. You can carry on with us or with your future team.',
      },
    ],
  },
  process: {
    title: 'How it works',
    steps: [
      {
        when: '01',
        title: 'Scoping call, free',
        text: 'You tell us the idea, the target users and what you want to prove. We tell you what goes into the MVP, what can wait, and the budget.',
      },
      {
        when: '02',
        title: 'Short specification',
        text: 'We write down what the product must do before building it. You approve it.',
      },
      {
        when: '03',
        title: 'Iterations',
        text: 'We ship, you test on a test link, we fix. You see the product move forward at every step.',
      },
      {
        when: '04',
        title: 'Test with real users',
        text: 'A real group uses the product before launch. Whatever we find gets fixed.',
      },
      {
        when: '05',
        title: 'Going to production',
        text: 'The product is live and you receive the code and the access. Further changes are quoted separately.',
      },
    ],
    note: 'Expect about 2 months on average to a production-ready MVP. You follow the progress throughout.',
  },
  price: {
    label: 'Pricing',
    title: 'From €3,999 excl. VAT,',
    titleRest: 'depending on complexity.',
    intro: 'What changes the price is how complex the features are.',
    factors: [
      {
        title: 'Features',
        text: 'The number of journeys, roles and screens, payments, integrations with other tools.',
      },
      {
        title: 'Infrastructure and security',
        text: 'A multi-tenant SaaS, where each client has a separate space, needs more infrastructure and more security than a single-space tool.',
      },
    ],
    note: 'We give you a price range on the first call. No specification document needed.',
  },
  faq: {
    title: 'Questions we get asked',
    items: [
      {
        q: 'I have no specification document. Is that a problem?',
        a: 'No. We write it together during scoping.',
      },
      {
        q: 'How long does an MVP take?',
        a: 'About 2 months on average to a production-ready MVP. A first testable version comes much earlier, and you follow the progress throughout.',
      },
      {
        q: 'Is an MVP enough to raise funds?',
        a: 'It gives you a working product and feedback from real users, which is what investors want to see first.',
      },
      {
        q: 'What happens after the MVP?',
        a: 'We can keep developing the product with you, or hand the code over to your future team.',
      },
      {
        q: 'Do you use AI?',
        a: 'Yes, to iterate faster. Everything is reviewed, tested and checked by us before going to production.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Got an idea?', 'Let’s test it.'],
    text: 'Tell us the idea, who it is for and what you want to prove. We reply within 24 hours with a first scope.',
    primary: 'Tell us about your idea',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'First call free · Reply within 24 hours',
  },
};

export function getMvpCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
