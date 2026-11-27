import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Audit offert » (refonte v2).
 * Déroulé (on relève les points, on en parle en appel, vidéo possible, sous 24 h) : Nicolas,
 * 27/11/2026. Exemple d'audit : celui de Rocket Mission publié dans l'article vibe-coding.
 * « Aucune obligation » : repris de la page en ligne. Prix optimisation/refonte : grille 2026-11.
 * SEO (GSC) : garder « audit SEO », « technique », « Bruxelles », « conversion ».
 */
const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Audit SEO technique offert · Bruxelles',
    titleLines: ['Ce qui bloque', 'votre site,', 'en 24 h.'],
    lead:
      'Votre site ne vous rapporte ni contacts ni ventes ? On relève les points qui le freinent, côté SEO technique, expérience et conversion, puis on en parle ensemble en appel. Si vous préférez, on vous envoie une vidéo. C’est offert.',
    facts: ['Offert', 'Retour sous 24 h', 'En appel ou en vidéo'],
    cta: 'Demander mon audit offert',
    secondary: 'Voir un exemple d’audit',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'vous avez un site, mais il ne vous apporte presque rien ;',
      'vous hésitez entre corriger votre site et le refaire ;',
      'vous voulez un regard extérieur avant d’investir dans votre site.',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'vous n’avez pas encore de site : regardez plutôt nos offres de landing page, d’e-commerce ou de MVP ;',
      'vous attendez un rapport de cinquante pages : on va droit aux points qui comptent.',
    ],
  },
  projects: {
    count: '01',
    title: 'À quoi ressemble un audit',
    items: [
      {
        name: 'Rocket Mission',
        meta: ['Exemple publié', 'Application en ligne', '25 novembre 2026'],
        text:
          'On a audité la version en ligne de Rocket Mission, l’application d’atelier qu’on a créée pour 42 Belgium, et publié le résultat. C’est le même regard que celui qu’on pose sur votre site : ce qui va bien, ce qui coince, et ce qu’on corrigerait en premier.',
        listLabel: 'Ce qu’on a relevé',
        list: [
          'aucune erreur d’accessibilité sur le poste d’équipe, le labo mobile, la régie et la connexion, sur ordinateur comme sur mobile',
          'des en-têtes de sécurité absents côté serveur, à régler dans la configuration',
          'dix attributs d’accessibilité mal placés sur les jauges de l’écran TV',
          'pas de titre principal balisé sur l’accueil : un détail pour une app d’atelier, un vrai manque pour un site public',
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
        title: 'Le SEO technique',
        text: 'Indexation, balises, structure des adresses, données structurées, chargement : ce qui empêche Google de bien comprendre votre site.',
      },
      {
        title: 'L’expérience et la conversion',
        text: 'Navigation, boutons d’action, formulaires : ce qui fait partir vos visiteurs avant qu’ils vous contactent ou achètent.',
      },
      {
        title: 'Le mobile et l’accessibilité',
        text: 'Contrastes, navigation au clavier, affichage sur téléphone : les obstacles qui excluent une partie de vos visiteurs.',
      },
      {
        title: 'L’image de marque',
        text: 'Est-ce que votre site vous ressemble ? On regarde si les visuels et les textes racontent bien votre histoire.',
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
        text: 'On passe votre site en revue et on note ce qui le freine, du plus important au moins important.',
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
        text: 'À partir de 999 € HTVA, quand il vaut mieux retravailler les parcours que corriger des détails.',
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
        q: 'Sous quelle forme je reçois l’audit ?',
        a: 'On relève les points, puis on en parle ensemble en appel. On peut aussi vous envoyer une vidéo qui passe tout en revue.',
      },
      {
        q: 'En combien de temps ?',
        a: 'Sous 24 h après votre demande.',
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
    eyebrow: 'Free technical SEO audit · Brussels',
    titleLines: ['What’s holding', 'your site back,', 'in 24 hours.'],
    lead:
      'Your website brings in no leads and no sales? We list what is holding it back, across technical SEO, experience and conversion, then walk you through it on a call. If you prefer, we send you a video. It is free.',
    facts: ['Free', 'Feedback within 24 hours', 'On a call or by video'],
    cta: 'Request my free audit',
    secondary: 'See an example audit',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'you have a website, but it brings you almost nothing;',
      'you are unsure whether to fix your site or rebuild it;',
      'you want an outside view before investing in your site.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'you don’t have a website yet: look at our landing page, e-commerce or MVP offers instead;',
      'you expect a fifty-page report: we go straight to the points that matter.',
    ],
  },
  projects: {
    count: '01',
    title: 'What an audit looks like',
    items: [
      {
        name: 'Rocket Mission',
        meta: ['Published example', 'Live app', '25 November 2026'],
        text:
          'We audited the live version of Rocket Mission, the workshop app we built for 42 Belgium, and published the results. It is the same look we take at your site: what works, what doesn’t, and what we would fix first.',
        listLabel: 'What we found',
        list: [
          'no accessibility errors on the team station, the mobile lab, the control room and the login, on desktop or mobile',
          'missing security headers on the server, to be fixed in the configuration',
          'ten misplaced accessibility attributes on the TV screen’s gauges',
          'no marked-up main heading on the home screen: a detail for a workshop app, a real gap for a public website',
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
        title: 'Technical SEO',
        text: 'Indexing, tags, URL structure, structured data, loading: what stops Google from understanding your site properly.',
      },
      {
        title: 'Experience and conversion',
        text: 'Navigation, calls to action, forms: what makes visitors leave before they contact you or buy.',
      },
      {
        title: 'Mobile and accessibility',
        text: 'Contrast, keyboard navigation, display on phones: the obstacles that shut out some of your visitors.',
      },
      {
        title: 'Brand image',
        text: 'Does your site look like you? We check whether the visuals and the copy tell your story well.',
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
        text: 'We review your site and note what is holding it back, from most to least important.',
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
        text: 'From €999 excl. VAT, when it is better to rework the journeys than to fix details.',
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
        q: 'What form does the audit take?',
        a: 'We list the issues, then walk you through them on a call. We can also send you a video that goes over everything.',
      },
      {
        q: 'How long does it take?',
        a: 'Within 24 hours of your request.',
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
