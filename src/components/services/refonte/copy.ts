import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Refonte de site web » (refonte v2).
 * Pitch (site en place, soucis connus, on retravaille l'existant sans repartir de 0) et angle IA
 * (on reprend un prototype fait avec l'IA et on le rend pro, pensé pour des humains, avec une
 * vraie réflexion UX) : Nicolas, 27/11/2026. Pas de jargon.
 * Prix : grille 2026-11 (dès 999 €, vitrine jusqu'à 2 999 €, e-commerce jusqu'à 3 999 €, SaaS
 * chiffré comme un développement complet). Délai : en attente, ne rien afficher.
 * Preuves : corrections UX de Rocket Mission (article vibe-coding), test Lovable (article lovable-avis).
 * GSC : aucune impression sur la page en 6 mois, rien à préserver.
 */
const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Refonte de site web · Bruxelles',
    titleLines: ['Votre site existe.', 'On le rend bon', 'pour les humains.'],
    lead:
      'Votre site est en place, mais vous savez qu’il coince quelque part. Ou il a été fait avec l’IA, il a l’air correct, et pourtant personne ne va au bout. On reprend l’existant, sans repartir de zéro, et on repense ce qui doit l’être pour vos visiteurs.',
    facts: ['À partir de 999 € HTVA', 'On garde ce qui marche', 'Sites faits avec l’IA bienvenus'],
    cta: 'Parlez-nous de votre site',
    secondary: 'Voir comment on travaille',
  },
  shot: {
    key: 'postes',
    alt: 'Deux postes d’équipe Rocket Mission en plein atelier : une app écrite par l’IA, retravaillée après un test avec de vrais participants.',
    caption: 'Rocket Mission · écrite par l’IA, rendue solide par un regard UX humain',
    position: '50% 35%',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'votre site est en place, mais vous savez qu’il y a des soucis et vous voulez refaire certains parcours ;',
      'votre site ou votre app a été prototypé avec l’IA (Lovable, Bolt, v0…) et il faut le rendre pro ;',
      'vous voulez améliorer votre site sans tout jeter.',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'vous partez de zéro : regardez plutôt nos offres de landing page, d’e-commerce ou de MVP ;',
      'seuls quelques détails coincent : une optimisation, à 199 € HTVA par jour, suffira.',
    ],
  },
  projects: {
    count: '02',
    title: 'Ce que l’IA ne voit pas',
    items: [
      {
        name: 'Rocket Mission',
        meta: ['App écrite par l’IA', '42 Belgium', 'Testée avec de vrais participants'],
        text:
          'Tout le code de cette application d’atelier a été écrit par l’IA. Il fonctionnait. Mais c’est en regardant de vrais participants s’en servir, un mois avant l’événement, qu’on a vu ce qu’aucun prompt n’aurait demandé.',
        listLabel: 'Ce qu’on a repensé pour les humains',
        list: [
          'des consignes d’aide qui débordaient sur les petits téléphones, remises sur une colonne',
          'des conditions renommées sans ambiguïté (« Toujours », « Si bleu »), avec un retour visuel',
          'un éditeur où l’on déplace les instructions au doigt',
          'la possibilité de rejoindre la partie en retard, et des tutoriels plus courts',
        ],
        note: null,
        images: [{ key: 'wiels', alt: 'Élèves en atelier Rocket Mission au WIELS, devant la bannière 42 Belgium et les consignes projetées.' }],
        link: { label: 'L’histoire complète du projet', href: '/fr/blog/vibe-coding/' },
      },
      {
        name: 'Une app générée avec Lovable',
        meta: ['Test publié', 'Novembre 2026', 'App de réservation'],
        text:
          'On a demandé à Lovable de transformer la landing d’un bar en application de réservation. Le code est propre et la page est rapide. Mais l’app n’était pas prête pour de vrais clients : c’est exactement ce qu’une refonte vient combler.',
        listLabel: 'Ce qu’il manquait avant le public',
        list: [
          'un numéro de téléphone inventé par l’IA',
          'personne n’est prévenu quand une table est réservée',
          'rien n’empêche un robot de remplir l’agenda de fausses réservations',
          'pas de mentions RGPD, alors que l’app collecte noms, emails et téléphones',
        ],
        note: null,
        images: [],
        link: { label: 'Lire le test complet', href: '/fr/blog/lovable-avis/' },
      },
    ],
  },
  formats: {
    title: 'Ce qu’on retravaille',
    items: [
      {
        title: 'Les parcours',
        text: 'Les étapes où vos visiteurs décrochent : trouver l’info, comprendre l’offre, vous contacter, acheter. On les repense, écran par écran.',
      },
      {
        title: 'Le design',
        text: 'Passer d’un site qui fait « généré » ou daté à un site qui vous ressemble et donne confiance.',
      },
      {
        title: 'Les textes',
        text: 'Dire clairement ce que vous proposez, à qui, et quoi faire ensuite. Sans remplissage.',
      },
      {
        title: 'Les finitions qu’on oublie',
        text: 'Emails de confirmation, protection contre le spam, mise en conformité RGPD (cookies, consentement, politique de confidentialité), affichage mobile : ce qui sépare un prototype d’un vrai site.',
      },
    ],
  },
  process: {
    title: 'Comment ça se passe',
    steps: [
      {
        when: '01',
        title: 'Audit offert',
        text: 'On regarde votre site avec les yeux de vos visiteurs et on vous dit ce qui coince, sous 24 h.',
      },
      {
        when: '02',
        title: 'Ce qu’on garde, ce qu’on refait',
        text: 'On décide ensemble ce qui reste, ce qui change et dans quel ordre.',
      },
      {
        when: '03',
        title: 'Design des parcours',
        text: 'On redessine les écrans à refaire et on les valide avec vous.',
      },
      {
        when: '04',
        title: 'Développement et vérifications',
        text: 'On construit, puis on vérifie chaque parcours sur téléphone et sur ordinateur.',
      },
      {
        when: '05',
        title: 'Mise en ligne',
        text: 'Le nouveau site remplace l’ancien sans perdre votre place sur Google : les anciennes adresses mènent aux nouvelles.',
      },
    ],
  },
  price: {
    label: 'Le prix',
    title: 'À partir de 999 € HTVA,',
    titleRest: 'selon votre site.',
    intro: 'Le prix dépend de deux choses.',
    factors: [
      {
        title: 'Le type de site',
        text: 'Selon le périmètre, une refonte de site vitrine peut monter jusqu’à 2 999 € HTVA, une refonte d’e-commerce jusqu’à 3 999 € HTVA. Une app ou un SaaS se chiffre comme un développement complet.',
      },
      {
        title: 'Ce qu’on garde',
        text: 'Plus l’existant est sain, moins il y a à refaire. L’audit offert sert justement à le savoir.',
      },
    ],
    note: 'On vous donne une fourchette dès le premier appel. Pas besoin d’un cahier des charges.',
  },
  faq: {
    title: 'Les questions qu’on nous pose',
    items: [
      {
        q: 'Mon site a été fait avec Lovable, Bolt ou une autre IA. Vous pouvez le reprendre ?',
        a: 'Oui. On garde ce qui fonctionne et on repense ce qui ne marche pas pour vos visiteurs : parcours, design, textes et finitions, RGPD compris.',
      },
      {
        q: 'Vous repartez de zéro ?',
        a: 'Non, sauf si c’est vraiment la meilleure option. On retravaille l’existant, et on vous dit honnêtement quand une partie doit être refaite.',
      },
      {
        q: 'Refonte ou optimisation, comment choisir ?',
        a: 'Si quelques détails techniques coincent, l’optimisation suffit. Si ce sont les parcours ou le design qui font fuir vos visiteurs, c’est une refonte. L’audit offert tranche.',
      },
      {
        q: 'Je vais perdre ma place sur Google ?',
        a: 'Non. On fait en sorte que vos anciennes adresses mènent aux nouvelles pages, pour que Google et vos visiteurs s’y retrouvent.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Votre site coince ?', 'Parlons-en.'],
    text: 'Envoyez-nous l’adresse de votre site et ce qui ne va pas. On commence par un audit offert, sous 24 h.',
    primary: 'Parlez-nous de votre site',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Audit offert · Réponse sous 24 h',
  },
};

const en: ServicePageCopy = {
  hero: {
    eyebrow: 'Website redesign · Brussels',
    titleLines: ['Your site exists.', 'We make it work', 'for humans.'],
    lead:
      'Your site is live, but you know something is off. Or it was made with AI, it looks fine, and yet nobody goes all the way. We take what exists, without starting from scratch, and rethink what needs rethinking for your visitors.',
    facts: ['From €999 excl. VAT', 'We keep what works', 'AI-built sites welcome'],
    cta: 'Tell us about your site',
    secondary: 'See how we work',
  },
  shot: {
    key: 'postes',
    alt: 'Two Rocket Mission team stations during a workshop: an app written by AI, reworked after a test with real participants.',
    caption: 'Rocket Mission · written by AI, made solid by a human UX eye',
    position: '50% 35%',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'your site is live, but you know there are problems and you want to redo some journeys;',
      'your site or app was prototyped with AI (Lovable, Bolt, v0…) and needs to become professional;',
      'you want to improve your site without throwing everything away.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'you are starting from scratch: look at our landing page, e-commerce or MVP offers instead;',
      'only a few details are off: an optimisation, at €199 excl. VAT per day, will do.',
    ],
  },
  projects: {
    count: '02',
    title: 'What AI doesn’t see',
    items: [
      {
        name: 'Rocket Mission',
        meta: ['App written by AI', '42 Belgium', 'Tested with real participants'],
        text:
          'All the code of this workshop app was written by AI. It worked. But it was by watching real participants use it, a month before the event, that we saw what no prompt would have asked for.',
        listLabel: 'What we rethought for humans',
        list: [
          'help instructions that overflowed on small phones, switched to a single column',
          'conditions renamed unambiguously (“Always”, “If blue”), with visual feedback',
          'an editor where you move instructions with your finger',
          'the option to join late, and shorter tutorials',
        ],
        note: null,
        images: [{ key: 'wiels', alt: 'Students in a Rocket Mission workshop at WIELS, in front of the 42 Belgium banner and the projected instructions.' }],
        link: { label: 'The full story of the project', href: '/en/blog/vibe-coding-explained/' },
      },
      {
        name: 'An app generated with Lovable',
        meta: ['Published test', 'November 2026', 'Booking app'],
        text:
          'We asked Lovable to turn a bar’s landing page into a booking app. The code is clean and the page is fast. But the app was not ready for real customers: that is exactly the gap a redesign fills.',
        listLabel: 'What was missing before going public',
        list: [
          'a phone number made up by the AI',
          'nobody is notified when a table is booked',
          'nothing stops a bot from filling the calendar with fake bookings',
          'no GDPR notices, although the app collects names, emails and phone numbers',
        ],
        note: null,
        images: [],
        link: { label: 'Read the full test', href: '/en/blog/lovable-review/' },
      },
    ],
  },
  formats: {
    title: 'What we rework',
    items: [
      {
        title: 'The journeys',
        text: 'The steps where your visitors drop off: finding information, understanding the offer, contacting you, buying. We rethink them screen by screen.',
      },
      {
        title: 'The design',
        text: 'From a site that looks “generated” or dated to one that looks like you and builds trust.',
      },
      {
        title: 'The copy',
        text: 'Saying clearly what you offer, to whom, and what to do next. No filler.',
      },
      {
        title: 'The finishing touches people forget',
        text: 'Confirmation emails, spam protection, GDPR compliance (cookies, consent, privacy policy), mobile display: what separates a prototype from a real website.',
      },
    ],
  },
  process: {
    title: 'How it works',
    steps: [
      {
        when: '01',
        title: 'Free audit',
        text: 'We look at your site through your visitors’ eyes and tell you what is wrong, within 24 hours.',
      },
      {
        when: '02',
        title: 'What we keep, what we redo',
        text: 'We decide together what stays, what changes and in what order.',
      },
      {
        when: '03',
        title: 'Journey design',
        text: 'We redesign the screens that need it and approve them with you.',
      },
      {
        when: '04',
        title: 'Development and checks',
        text: 'We build, then check every journey on phone and desktop.',
      },
      {
        when: '05',
        title: 'Launch',
        text: 'The new site replaces the old one without losing your place on Google: old addresses lead to the new pages.',
      },
    ],
  },
  price: {
    label: 'Pricing',
    title: 'From €999 excl. VAT,',
    titleRest: 'depending on your site.',
    intro: 'The price depends on two things.',
    factors: [
      {
        title: 'The type of site',
        text: 'Depending on scope, a showcase site redesign can go up to €2,999 excl. VAT, an e-commerce redesign up to €3,999 excl. VAT. An app or a SaaS is priced as a full development.',
      },
      {
        title: 'What we keep',
        text: 'The sounder the existing site, the less there is to redo. The free audit is there to find out.',
      },
    ],
    note: 'We give you a price range on the first call. No specification document needed.',
  },
  faq: {
    title: 'Questions we get asked',
    items: [
      {
        q: 'My site was made with Lovable, Bolt or another AI. Can you take it over?',
        a: 'Yes. We keep what works and rethink what doesn’t work for your visitors: journeys, design, copy and finishing touches, GDPR included.',
      },
      {
        q: 'Do you start from scratch?',
        a: 'No, unless it really is the best option. We rework what exists, and we tell you honestly when a part needs rebuilding.',
      },
      {
        q: 'Redesign or optimisation: how do I choose?',
        a: 'If a few technical details are off, an optimisation is enough. If the journeys or the design are driving visitors away, it is a redesign. The free audit decides.',
      },
      {
        q: 'Will I lose my place on Google?',
        a: 'No. We make sure your old addresses lead to the new pages, so Google and your visitors find their way.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Is your site', 'not working? Let’s talk.'],
    text: 'Send us your site’s address and what is wrong. We start with a free audit, within 24 hours.',
    primary: 'Tell us about your site',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'Free audit · Reply within 24 hours',
  },
};

export function getRefonteCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
