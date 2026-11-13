import type { Locale } from '../../i18n';

/**
 * Textes de la page contact conversationnelle.
 * `{name}` est remplacé par le prénom saisi.
 */
const fr = {
  srTitle: 'Contacter Horde Agence',
  arthurName: 'A.R.T.H.U.R:',
  arthurLabel: 'Arthur, le robot de Horde',
  sideTagline: ['Human-first,', 'IA secondly.'],
  sideSince: 'Since 2026',
  agent: 'Agent: A.R.T.H.U.R',
  greeting: 'En quoi pourrais-je t’être utile ?',
  intents: {
    project: 'Start a project',
    team: 'Join the team',
    culture: 'Discover our culture',
    word: 'Drop a quick word',
    write: 'Write us:',
  },
  intentLabels: {
    project: 'Nouveau projet',
    team: 'Rejoindre l’équipe',
    word: 'Petit mot',
  },
  /** Ajouté en tête du message envoyé, pour trier les demandes hors projet. */
  intentTags: {
    team: '[Rejoindre l’équipe]',
    word: '[Petit mot]',
  },
  questions: {
    intent: 'Choisis une piste, je m’occupe du reste.',
    besoin: 'Beau programme. De quoi as-tu besoin, précisément ?',
    objectifProject: 'Raconte-moi l’objectif : qu’est-ce que tu as en tête ?',
    objectifTeam: 'Bonne idée. Parle-moi de toi : ton métier, ce que tu aimerais faire ici, un lien vers ton travail.',
    objectifWord: 'Je t’écoute. Quel est ton message ?',
    nom: 'C’est noté. Et toi, comment t’appelles-tu ?',
    societe: 'Enchanté, {name}. Tu représentes une société ?',
    email: 'À quelle adresse la Horde peut te répondre ?',
    confirm: 'Tout est là. Je transmets à la Horde ?',
    sending: 'Je transmets…',
    done: 'C’est transmis, {name}. Un humain de la Horde prend le relais.',
    failed: 'Aïe, l’envoi a échoué. Réessaie, ou écris-nous directement.',
  },
  fields: {
    intent: 'Demande',
    besoin: 'Besoin',
    objectif: 'Objectif',
    message: 'Message',
    nom: 'Nom',
    societe: 'Société',
    email: 'Email',
  },
  prompt: {
    label: 'Ta réponse',
    choose: 'Choisis une option ci-dessus',
    review: 'Un clic sur une ligne pour la corriger',
    done: 'Conversation terminée',
    placeholders: {
      idle: 'Que veux-tu d’autre, homo sapiens ?',
      objectif: 'Ce que tu as en tête…',
      nom: 'Un autographe, s’il te plaît',
      societe: 'Nom de société (facultatif)',
      email: 'toi@exemple.be',
    },
    hintMultiline: 'Maj + Entrée pour aller à la ligne',
    optional: 'Facultatif',
    enter: '(Entrée)',
    stepLabel: 'Étape',
  },
  actions: {
    next: 'Suivant',
    skip: 'Passer',
    send: 'Envoyer',
    sending: 'Envoi…',
    back: 'Retour',
    restart: 'Recommencer',
    again: 'Nouveau message',
    edit: 'Modifier',
    bookCall: 'Réserver un appel',
    copyEmail: 'Copier l’adresse e-mail',
    copied: 'Copié',
  },
  asides: {
    copied: 'Adresse copiée. À toi de jouer.',
    skipped: 'Pas de société, pas de problème.',
  },
  noscript: 'Ce formulaire a besoin de JavaScript. Écrivez-nous à',
};

type ContactCopy = typeof fr;

const en: ContactCopy = {
  srTitle: 'Contact Horde Agence',
  arthurName: 'A.R.T.H.U.R:',
  arthurLabel: 'Arthur, Horde’s robot',
  sideTagline: ['Human-first,', 'AI secondly.'],
  sideSince: 'Since 2026',
  agent: 'Agent: A.R.T.H.U.R',
  greeting: 'How can I help you?',
  intents: {
    project: 'Start a project',
    team: 'Join the team',
    culture: 'Discover our culture',
    word: 'Drop a quick word',
    write: 'Write us:',
  },
  intentLabels: {
    project: 'New project',
    team: 'Join the team',
    word: 'Quick word',
  },
  intentTags: {
    team: '[Join the team]',
    word: '[Quick word]',
  },
  questions: {
    intent: 'Pick a path, I’ll handle the rest.',
    besoin: 'Sounds good. What do you need, exactly?',
    objectifProject: 'Tell me about the goal: what do you have in mind?',
    objectifTeam: 'Good idea. Tell me about you: your craft, what you’d like to do here, a link to your work.',
    objectifWord: 'I’m listening. What’s your message?',
    nom: 'Noted. And you, what’s your name?',
    societe: 'Nice to meet you, {name}. Do you represent a company?',
    email: 'Where can the Horde write back to you?',
    confirm: 'It’s all there. Shall I pass it on to the Horde?',
    sending: 'Passing it on…',
    done: 'Delivered, {name}. A human from the Horde takes it from here.',
    failed: 'Ouch, sending failed. Try again, or write to us directly.',
  },
  fields: {
    intent: 'Request',
    besoin: 'Need',
    objectif: 'Goal',
    message: 'Message',
    nom: 'Name',
    societe: 'Company',
    email: 'Email',
  },
  prompt: {
    label: 'Your answer',
    choose: 'Pick an option above',
    review: 'Click a line to fix it',
    done: 'Conversation over',
    placeholders: {
      idle: 'What else do you want, homo sapiens?',
      objectif: 'What you have in mind…',
      nom: 'An autograph, please',
      societe: 'Company name (optional)',
      email: 'you@example.com',
    },
    hintMultiline: 'Shift + Enter for a new line',
    optional: 'Optional',
    enter: '(Enter)',
    stepLabel: 'Step',
  },
  actions: {
    next: 'Next',
    skip: 'Skip',
    send: 'Send',
    sending: 'Sending…',
    back: 'Back',
    restart: 'Start over',
    again: 'New message',
    edit: 'Edit',
    bookCall: 'Book a call',
    copyEmail: 'Copy the email address',
    copied: 'Copied',
  },
  asides: {
    copied: 'Address copied. Your move.',
    skipped: 'No company, no problem.',
  },
  noscript: 'This form needs JavaScript. Write to us at',
};

const copies: Record<Locale, ContactCopy> = { fr, en };

export type { ContactCopy };

export function getContactCopy(lang: Locale): ContactCopy {
  return copies[lang] ?? fr;
}
