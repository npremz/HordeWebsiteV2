import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Optimisation de site web » (refonte v2).
 * Pitch (le site ne fonctionne pas / ne donne aucun résultat : on regarde les détails qui coincent
 * et on les résout), 199 € HTVA par jour, jours estimés après l'audit offert, « généralement 1 jour
 * suffit » : Nicolas, 27/11/2026. Pas de jargon ; UX d'abord, Google, RGPD et sécurité ensuite.
 * Pas de projet client montré (aucune preuve validée) : section projets absente.
 * GSC : garder « optimisation site internet bruxelles » (position ~10).
 */
const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Optimisation de site web · Bruxelles',
    titleLines: ['Votre site coince ?', 'On corrige.', 'Souvent en un jour.'],
    lead:
      'Votre site ne fonctionne pas comme il devrait, ou ne vous rapporte rien. On repère les détails qui coincent et on les corrige. Pas de refonte, pas de chantier de plusieurs semaines : la plupart du temps, une journée suffit.',
    facts: ['199 € HTVA par jour', 'Généralement 1 jour', 'Après un audit offert'],
    cta: 'Demander l’audit offert',
    secondary: 'Voir ce qu’on corrige',
    secondaryHref: '#formats',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'votre site est globalement bon, mais quelque chose bloque : un formulaire, l’affichage sur téléphone, Google ;',
      'votre site a été fait avec l’IA et il est presque prêt, il manque les finitions ;',
      'vous voulez des résultats vite, sans tout refaire.',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'ce sont les parcours ou le design qui font fuir vos visiteurs : il vous faut plutôt une refonte ;',
      'vous n’avez pas encore de site : regardez nos offres de landing page, d’e-commerce ou de MVP.',
    ],
  },
  formats: {
    title: 'Ce qu’on corrige',
    items: [
      {
        title: 'Ce qui bloque vos visiteurs',
        text: 'Un formulaire qui n’envoie rien, un bouton qu’on ne trouve pas, une page illisible sur téléphone, un chargement qui fait fuir.',
      },
      {
        title: 'Ce qui gêne Google',
        text: 'Des pages que Google ne trouve pas, des titres manquants, des liens cassés : ce qui empêche les bonnes personnes de vous trouver.',
      },
      {
        title: 'Le RGPD',
        text: 'Bannière cookies, consentement, politique de confidentialité : on met votre site en règle.',
      },
      {
        title: 'La sécurité',
        text: 'Les protections qui manquent et les accès trop ouverts : on ferme ce qui expose votre site et les données de vos clients.',
      },
    ],
  },
  process: {
    title: 'Comment ça se passe',
    steps: [
      {
        when: '01',
        title: 'Audit offert',
        text: 'On regarde votre site et on relève ce qui coince, sous 24 h. On vous l’explique en appel ou en vidéo.',
      },
      {
        when: '02',
        title: 'Estimation',
        text: 'On vous dit combien de jours il faut pour corriger. Généralement, un seul.',
      },
      {
        when: '03',
        title: 'Corrections',
        text: 'On corrige les points validés, du plus important au moins important.',
      },
      {
        when: '04',
        title: 'Vérification',
        text: 'On vérifie chaque correction avec vous, sur téléphone et sur ordinateur.',
      },
    ],
    note: 'Généralement, une journée suffit.',
  },
  price: {
    label: 'Le prix',
    title: '199 € HTVA par jour,',
    titleRest: 'souvent un seul.',
    intro: 'Le nombre de jours est estimé après l’audit offert.',
    factors: [
      {
        title: 'Ce que vous payez',
        text: 'Les jours de correction, estimés avant qu’on commence. L’audit qui les précède est offert.',
      },
      {
        title: 'Si ça ne suffit pas',
        text: 'Si l’audit montre qu’il faut repenser les parcours ou le design, on vous le dit : c’est une refonte, à partir de 999 € HTVA.',
      },
    ],
    note: 'Et si votre site n’a besoin de rien, on vous le dit aussi.',
  },
  faq: {
    title: 'Les questions qu’on nous pose',
    items: [
      {
        q: 'Pourquoi commencer par un audit ?',
        a: 'Parce qu’on ne corrige pas à l’aveugle. L’audit, offert, montre ce qui coince et combien de temps il faut pour le corriger.',
      },
      {
        q: 'Combien de jours faut-il ?',
        a: 'Généralement, une journée suffit. On vous le confirme après l’audit, avant de commencer.',
      },
      {
        q: 'Optimisation ou refonte ?',
        a: 'Si quelques détails coincent, c’est une optimisation. Si ce sont les parcours ou le design qui font fuir vos visiteurs, c’est une refonte. L’audit tranche.',
      },
      {
        q: 'Mon site a été fait avec l’IA. Vous pouvez le corriger ?',
        a: 'Oui. Souvent, il ne manque que des finitions : un formulaire qui ne prévient personne, des mentions RGPD, des détails sur téléphone.',
      },
      {
        q: 'Je ne suis pas technique, je vais comprendre ?',
        a: 'Oui. On vous explique chaque correction sans jargon : ce qui n’allait pas et ce qu’on a fait.',
      },
    ],
  },
  cta: {
    label: 'Audit offert',
    titleLines: ['Votre site coince ?', 'Commençons par l’audit.'],
    text: 'Envoyez-nous l’adresse de votre site et ce qui ne va pas. On vous répond sous 24 h avec ce qui coince et le nombre de jours pour le corriger.',
    primary: 'Demander l’audit offert',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Audit offert · Réponse sous 24 h',
  },
};

const en: ServicePageCopy = {
  hero: {
    eyebrow: 'Website optimisation · Brussels',
    titleLines: ['Site not working?', 'We fix it.', 'Often in one day.'],
    lead:
      'Your website doesn’t work the way it should, or brings you nothing. We find the details that are off and fix them. No redesign, no weeks-long project: most of the time, one day is enough.',
    facts: ['€199 excl. VAT per day', 'Usually 1 day', 'After a free audit'],
    cta: 'Request the free audit',
    secondary: 'See what we fix',
    secondaryHref: '#formats',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'your site is mostly fine, but something is blocking: a form, the display on phones, Google;',
      'your site was made with AI and is almost ready, it just needs finishing;',
      'you want results fast, without redoing everything.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'it is the journeys or the design that drive your visitors away: you need a redesign instead;',
      'you don’t have a website yet: look at our landing page, e-commerce or MVP offers.',
    ],
  },
  formats: {
    title: 'What we fix',
    items: [
      {
        title: 'What blocks your visitors',
        text: 'A form that sends nothing, a button nobody finds, a page unreadable on a phone, loading that drives people away.',
      },
      {
        title: 'What gets in Google’s way',
        text: 'Pages Google can’t find, missing titles, broken links: whatever stops the right people from finding you.',
      },
      {
        title: 'GDPR',
        text: 'Cookie banner, consent, privacy policy: we bring your site into compliance.',
      },
      {
        title: 'Security',
        text: 'Missing protections and access that is too open: we close what exposes your site and your customers’ data.',
      },
    ],
  },
  process: {
    title: 'How it works',
    steps: [
      {
        when: '01',
        title: 'Free audit',
        text: 'We look at your site and list what is off, within 24 hours. We explain it on a call or by video.',
      },
      {
        when: '02',
        title: 'Estimate',
        text: 'We tell you how many days the fixes take. Usually, just one.',
      },
      {
        when: '03',
        title: 'Fixes',
        text: 'We fix the approved points, from most to least important.',
      },
      {
        when: '04',
        title: 'Check',
        text: 'We check every fix with you, on phone and desktop.',
      },
    ],
    note: 'Usually, one day is enough.',
  },
  price: {
    label: 'Pricing',
    title: '€199 excl. VAT per day,',
    titleRest: 'often just one.',
    intro: 'The number of days is estimated after the free audit.',
    factors: [
      {
        title: 'What you pay for',
        text: 'The days of fixes, estimated before we start. The audit that comes first is free.',
      },
      {
        title: 'If that isn’t enough',
        text: 'If the audit shows the journeys or the design need rethinking, we tell you: that is a redesign, from €999 excl. VAT.',
      },
    ],
    note: 'And if your site needs nothing, we tell you that too.',
  },
  faq: {
    title: 'Questions we get asked',
    items: [
      {
        q: 'Why start with an audit?',
        a: 'Because we don’t fix things blindly. The free audit shows what is off and how long it takes to fix.',
      },
      {
        q: 'How many days does it take?',
        a: 'Usually, one day is enough. We confirm it after the audit, before we start.',
      },
      {
        q: 'Optimisation or redesign?',
        a: 'If a few details are off, it is an optimisation. If the journeys or the design are driving visitors away, it is a redesign. The audit decides.',
      },
      {
        q: 'My site was made with AI. Can you fix it?',
        a: 'Yes. Often only the finishing touches are missing: a form that notifies nobody, GDPR notices, details on phones.',
      },
      {
        q: 'I’m not technical. Will I understand?',
        a: 'Yes. We explain every fix without jargon: what was wrong and what we did.',
      },
    ],
  },
  cta: {
    label: 'Free audit',
    titleLines: ['Site not working?', 'Let’s start with the audit.'],
    text: 'Send us your site’s address and what is wrong. We reply within 24 hours with what is off and how many days it takes to fix.',
    primary: 'Request the free audit',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'Free audit · Reply within 24 hours',
  },
};

export function getOptimisationCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
