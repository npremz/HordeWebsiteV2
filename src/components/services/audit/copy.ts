import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Audit offert » (refonte v2).
 * Angle (Nicolas, 27/11/2026) : audit UX/UI d'abord, c'est là que Horde se démarque ; le
 * référencement Google est vérifié mais pas mis en avant (« tous nos concurrents le font en un
 * prompt »). Angle IA : on reprend un site ou une app prototypé avec l'IA et on le rend pro, pensé
 * pour des humains. Pas de jargon. Point sécurité sur demande. RGPD vérifié (demande de Nicolas).
 * Déroulé (relevé, appel, vidéo possible, sous 24 h) : Nicolas, 27/11/2026.
 * Exemples : test Lovable (article lovable-avis) et Rocket Mission (article vibe-coding).
 * « Aucune obligation » : repris de la page en ligne. Prix optimisation/refonte : grille 2026-11.
 */
const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Audit UX/UI offert · Bruxelles',
    titleLines: ['Ce qui fait fuir', 'vos visiteurs,', 'en 24 h.'],
    lead:
      'On regarde votre site avec les yeux de vos visiteurs : est-ce clair, est-ce agréable, trouve-t-on comment vous contacter ou acheter ? On vérifie aussi que tout fonctionne, que rien ne gêne Google et que vous êtes en règle avec le RGPD. Puis on vous explique tout, en appel ou en vidéo. C’est offert.',
    facts: ['Offert', 'Retour sous 24 h', 'En appel ou en vidéo'],
    cta: 'Demander mon audit offert',
    secondary: 'Voir des exemples d’audit',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'vous avez un site, mais il ne vous apporte presque rien ;',
      'votre site ou votre app a été fait avec l’IA, il a l’air correct, mais personne ne va au bout ;',
      'vous hésitez entre corriger votre site et le refaire.',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'vous n’avez pas encore de site : regardez plutôt nos offres de landing page, d’e-commerce ou de MVP ;',
      'vous voulez seulement une liste de balises à corriger : un outil automatique le fera très bien.',
    ],
  },
  projects: {
    count: '02',
    title: 'Deux audits publiés',
    items: [
      {
        name: 'Une app générée avec Lovable',
        meta: ['Test publié', 'Novembre 2026', 'App de réservation'],
        text:
          'On a demandé à Lovable de transformer la landing d’un bar en application de réservation, puis on l’a auditée comme on audite un site client. Le code est propre et la page est rapide. Mais avant de l’ouvrir au public, il manquait l’essentiel.',
        listLabel: 'Ce qu’on a relevé',
        list: [
          'un numéro de téléphone inventé par l’IA',
          'personne n’est prévenu quand une table est réservée, ni le bar ni le client',
          'rien n’empêche un robot de remplir l’agenda de fausses réservations',
          'aucune mention RGPD, alors que l’app collecte noms, emails et téléphones',
          'des textes trop peu contrastés et des boutons trop petits sur mobile',
        ],
        note: null,
        images: [],
        link: { label: 'Lire le test complet', href: '/fr/blog/lovable-avis/' },
      },
      {
        name: 'Rocket Mission',
        meta: ['Exemple publié', 'App écrite par l’IA', '25 novembre 2026'],
        text:
          'L’application d’atelier qu’on a créée pour 42 Belgium a été écrite entièrement par l’IA. Ce qui l’a rendue solide, c’est un regard UX humain et un test avec de vrais participants. On a ensuite audité la version en ligne et publié le résultat.',
        listLabel: 'Ce qu’on a relevé',
        list: [
          'les écrans principaux ne présentent aucun problème d’accessibilité détecté, sur ordinateur comme sur mobile',
          'sécurité : des protections à ajouter dans la configuration du serveur',
          'l’écran TV : quelques réglages d’accessibilité mal placés sur les jauges',
          'Google : l’accueil n’a pas de titre principal qu’il sait lire. Sans gravité pour une app d’atelier, un vrai manque pour un site public',
        ],
        note: null,
        images: [],
        link: { label: 'Lire l’audit complet', href: '/fr/blog/vibe-coding/' },
      },
    ],
  },
  formats: {
    title: 'Ce qu’on regarde',
    items: [
      {
        title: 'L’expérience de vos visiteurs',
        text: 'Comprend-on tout de suite ce que vous proposez ? Trouve-t-on facilement comment vous contacter ou acheter ? Où est-ce qu’on décroche ?',
      },
      {
        title: 'Le design',
        text: 'Votre site vous ressemble-t-il ? Donne-t-il confiance et envie d’aller plus loin, ou fait-il « généré » ?',
      },
      {
        title: 'Le bon fonctionnement',
        text: 'Les pages, les formulaires, l’affichage sur téléphone : on vérifie que tout marche, partout.',
      },
      {
        title: 'Google, RGPD et sécurité',
        text: 'On vérifie que rien n’empêche Google de bien lire votre site et que vous êtes en règle avec le RGPD : cookies, consentement, politique de confidentialité. Si vous le souhaitez, on fait aussi un point sécurité.',
      },
    ],
  },
  process: {
    title: 'Comment ça se passe',
    steps: [
      {
        when: '01',
        title: 'Vous nous envoyez votre site',
        text: 'L’adresse du site et ce qui vous inquiète, en quelques lignes.',
      },
      {
        when: '02',
        title: 'On relève les points',
        text: 'On passe votre site en revue comme le ferait un visiteur, et on note ce qui le freine, du plus important au moins important.',
      },
      {
        when: '03',
        title: 'On en parle',
        text: 'On vous explique tout en appel, sans jargon. Si vous préférez, on vous envoie une vidéo.',
      },
      {
        when: '04',
        title: 'Vous décidez',
        text: 'Corriger vous-même, nous confier une optimisation ou une refonte, ou ne rien faire. Aucune obligation de travailler avec nous.',
      },
    ],
    note: 'Retour sous 24 h après votre demande.',
  },
  price: {
    label: 'Le prix',
    title: 'L’audit est offert.',
    titleRest: 'Sans condition.',
    intro: 'Et si on peut vous aider ensuite, voici ce que ça coûte.',
    factors: [
      {
        title: 'Optimisation',
        text: '199 € HTVA par jour. Le nombre de jours est estimé à partir de l’audit, pour corriger les points qui bloquent.',
      },
      {
        title: 'Refonte',
        text: 'À partir de 999 € HTVA, quand il vaut mieux repenser les parcours que corriger des détails.',
      },
    ],
    note: 'Si votre site n’a pas besoin de nous, on vous le dit aussi.',
  },
  faq: {
    title: 'Les questions qu’on nous pose',
    items: [
      {
        q: 'Pourquoi c’est gratuit ?',
        a: 'Parce que c’est notre façon de commencer : on ne propose jamais une solution avant d’avoir compris le problème.',
      },
      {
        q: 'Mon site a été fait avec l’IA. Vous pouvez l’auditer ?',
        a: 'Oui, c’est même un cas qu’on voit de plus en plus. L’IA produit des sites qui ont l’air corrects. On regarde ce qu’elle ne voit pas : ce que vos visiteurs comprennent, où ils décrochent, ce qui manque pour qu’ils passent à l’action.',
      },
      {
        q: 'Sous quelle forme je reçois l’audit ?',
        a: 'On relève les points, puis on en parle ensemble en appel. On peut aussi vous envoyer une vidéo qui passe tout en revue.',
      },
      {
        q: 'En combien de temps ?',
        a: 'Sous 24 h après votre demande.',
      },
      {
        q: 'Vous regardez aussi le référencement, le RGPD et la sécurité ?',
        a: 'Oui. On vérifie que rien ne gêne Google et que votre site respecte le RGPD (cookies, consentement, politique de confidentialité). On ajoute un point sécurité si vous le souhaitez.',
      },
      {
        q: 'Je ne suis pas technique, je vais comprendre ?',
        a: 'Oui. On vous explique chaque point sans jargon : ce qui se passe, pourquoi c’est gênant et ce qu’on ferait.',
      },
      {
        q: 'Je suis obligé de travailler avec vous ensuite ?',
        a: 'Non. Ce que vous faites de l’audit vous appartient. Vous pouvez corriger vous-même, avec quelqu’un d’autre, ou avec nous.',
      },
    ],
  },
  cta: {
    label: 'Audit offert',
    titleLines: ['Envoyez-nous', 'votre site.'],
    text: 'Donnez-nous l’adresse de votre site et ce qui vous inquiète. On revient vers vous sous 24 h.',
    primary: 'Demander mon audit offert',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Offert · Retour sous 24 h',
  },
};

const en: ServicePageCopy = {
  hero: {
    eyebrow: 'Free UX/UI audit · Brussels',
    titleLines: ['What drives', 'your visitors away,', 'in 24 hours.'],
    lead:
      'We look at your site through your visitors’ eyes: is it clear, is it pleasant, can people find how to contact you or buy? We also check that everything works, that nothing gets in Google’s way and that you comply with the GDPR. Then we explain it all, on a call or by video. It is free.',
    facts: ['Free', 'Feedback within 24 hours', 'On a call or by video'],
    cta: 'Request my free audit',
    secondary: 'See example audits',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'you have a website, but it brings you almost nothing;',
      'your site or app was made with AI, it looks fine, but nobody goes all the way;',
      'you are unsure whether to fix your site or rebuild it.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'you don’t have a website yet: look at our landing page, e-commerce or MVP offers instead;',
      'you only want a list of tags to fix: an automated tool will do that very well.',
    ],
  },
  projects: {
    count: '02',
    title: 'Two published audits',
    items: [
      {
        name: 'An app generated with Lovable',
        meta: ['Published test', 'November 2026', 'Booking app'],
        text:
          'We asked Lovable to turn a bar’s landing page into a booking app, then audited it the way we audit a client site. The code is clean and the page is fast. But before opening it to the public, the essentials were missing.',
        listLabel: 'What we found',
        list: [
          'a phone number made up by the AI',
          'nobody is notified when a table is booked, neither the bar nor the customer',
          'nothing stops a bot from filling the calendar with fake bookings',
          'no GDPR notices, although the app collects names, emails and phone numbers',
          'low-contrast text and buttons too small on mobile',
        ],
        note: null,
        images: [],
        link: { label: 'Read the full test', href: '/en/blog/lovable-review/' },
      },
      {
        name: 'Rocket Mission',
        meta: ['Published example', 'App written by AI', '25 November 2026'],
        text:
          'The workshop app we built for 42 Belgium was written entirely by AI. What made it solid was a human UX eye and a test with real participants. We then audited the live version and published the results.',
        listLabel: 'What we found',
        list: [
          'no accessibility issues detected on the main screens, on desktop or mobile',
          'security: protections to add in the server configuration',
          'the TV screen: a few misplaced accessibility settings on the gauges',
          'Google: the home screen has no main heading it can read. Harmless for a workshop app, a real gap for a public website',
        ],
        note: null,
        images: [],
        link: { label: 'Read the full audit', href: '/en/blog/vibe-coding-explained/' },
      },
    ],
  },
  formats: {
    title: 'What we look at',
    items: [
      {
        title: 'Your visitors’ experience',
        text: 'Is it immediately clear what you offer? Is it easy to find how to contact you or buy? Where do people drop off?',
      },
      {
        title: 'The design',
        text: 'Does your site look like you? Does it build trust and make people want to go further, or does it look “generated”?',
      },
      {
        title: 'Everything working properly',
        text: 'Pages, forms, display on phones: we check that everything works, everywhere.',
      },
      {
        title: 'Google, GDPR and security',
        text: 'We check that nothing stops Google from reading your site properly and that you comply with the GDPR: cookies, consent, privacy policy. If you want, we also run a security check.',
      },
    ],
  },
  process: {
    title: 'How it works',
    steps: [
      {
        when: '01',
        title: 'You send us your site',
        text: 'The address of your site and what worries you, in a few lines.',
      },
      {
        when: '02',
        title: 'We list the issues',
        text: 'We go through your site the way a visitor would, and note what is holding it back, from most to least important.',
      },
      {
        when: '03',
        title: 'We talk it through',
        text: 'We explain everything on a call, without jargon. If you prefer, we send you a video.',
      },
      {
        when: '04',
        title: 'You decide',
        text: 'Fix it yourself, hand us an optimisation or a redesign, or do nothing. No obligation to work with us.',
      },
    ],
    note: 'Feedback within 24 hours of your request.',
  },
  price: {
    label: 'Pricing',
    title: 'The audit is free.',
    titleRest: 'No strings attached.',
    intro: 'And if we can help afterwards, here is what it costs.',
    factors: [
      {
        title: 'Optimisation',
        text: '€199 excl. VAT per day. The number of days is estimated from the audit, to fix the issues that block you.',
      },
      {
        title: 'Redesign',
        text: 'From €999 excl. VAT, when it is better to rethink the journeys than to fix details.',
      },
    ],
    note: 'If your site doesn’t need us, we will tell you that too.',
  },
  faq: {
    title: 'Questions we get asked',
    items: [
      {
        q: 'Why is it free?',
        a: 'Because that is how we start: we never propose a solution before we understand the problem.',
      },
      {
        q: 'My site was made with AI. Can you audit it?',
        a: 'Yes, it is a case we see more and more. AI produces sites that look fine. We look at what it doesn’t see: what your visitors understand, where they drop off, what is missing for them to take action.',
      },
      {
        q: 'What form does the audit take?',
        a: 'We list the issues, then walk you through them on a call. We can also send you a video that goes over everything.',
      },
      {
        q: 'How long does it take?',
        a: 'Within 24 hours of your request.',
      },
      {
        q: 'Do you also look at search, GDPR and security?',
        a: 'Yes. We check that nothing gets in Google’s way and that your site complies with the GDPR (cookies, consent, privacy policy). We add a security check if you want one.',
      },
      {
        q: 'I’m not technical. Will I understand?',
        a: 'Yes. We explain every point without jargon: what is happening, why it is a problem and what we would do.',
      },
      {
        q: 'Do I have to work with you afterwards?',
        a: 'No. What you do with the audit is up to you. You can fix things yourself, with someone else, or with us.',
      },
    ],
  },
  cta: {
    label: 'Free audit',
    titleLines: ['Send us', 'your site.'],
    text: 'Give us the address of your site and what worries you. We get back to you within 24 hours.',
    primary: 'Request my free audit',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'Free · Feedback within 24 hours',
  },
};

export function getAuditCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
