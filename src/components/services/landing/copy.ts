import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Création de landing page » (refonte v2).
 * Preuves : Fysu (appel d'offres, design + dev Horde, non réalisé faute de financement ; marque
 * visible sur les captures, à revoir avant prod) et Café Loma (projet fictif de refonte digitale).
 * Délai (1 à 4 semaines selon assets/branding) et prix « à partir de » : Nicolas, nov. 2026.
 * SEO (GSC) : garder « landing page », « startup », « Bruxelles », « agence ».
 */
const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Création de landing page · Bruxelles',
    titleLines: ['Votre produit mérite', 'une page pensée', 'pour convaincre.'],
    lead:
      'Vous avez une marque ou un produit à présenter ou à vendre. On conçoit la page qui convainc, par son design comme par son message : direction artistique, textes, développement et mise en ligne.',
    facts: ['À partir de 1 999 € HTVA', '1 à 4 semaines selon vos assets', 'Design et développement sur mesure'],
    cta: 'Parlez-nous de votre projet',
    secondary: 'Voir nos pages',
  },
  shot: {
    key: 'fysuHero',
    alt: 'Page d’accueil conçue pour une marque de mode : titre géant en lettres serif et photos de collection en mouvement.',
    caption: 'Proposition pour une marque de mode · appel d’offres · design et développement Horde',
    position: '50% 0%',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'vous êtes une startup ou une marque qui lance un produit, une offre ou une collection ;',
      'vous lancez une campagne Google Ads ou Meta et il lui faut une destination qui tienne la promesse de l’annonce ;',
      'vous voulez une page qui ressemble à votre marque, pas un template de plus.',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'il vous faut un site complet de plusieurs pages : regardez plutôt notre offre de refonte ;',
      'un template Squarespace ou Wix suffit à votre besoin : c’est une très bonne option pour démarrer.',
    ],
  },
  projects: {
    count: '02',
    title: 'Deux pages, deux directions artistiques',
    items: [
      {
        name: 'Marque de mode',
        meta: ['Appel d’offres', 'Design et développement', 'Desktop et mobile'],
        text:
          'Une proposition pour une marque de mode, dans le cadre d’un appel d’offres. On a tout conçu : la direction artistique, la mise en page, les animations et le développement. Le projet ne s’est pas fait parce que la marque n’a pas obtenu son financement.',
        listLabel: 'Ce qu’on a construit',
        list: [
          'un titre géant en parallaxe, avec une intro animée au chargement',
          'un carrousel des produits mis en avant',
          'une navigation animée, pensée aussi pour le mobile',
          'des sections histoire, collections et communauté',
        ],
        note: null,
        images: [
          { key: 'fysuMobile', alt: 'La page de la marque de mode sur mobile : titre et photo de collection.' },
          { key: 'fysuProducts', alt: 'Carrousel des produits mis en avant : chemise, trench, veste brodée.' },
        ],
        link: null,
      },
      {
        name: 'Café Loma',
        meta: ['Projet fictif', 'Refonte digitale', 'Bar-café bruxellois'],
        text:
          'Un projet fictif : la refonte digitale d’un bar-café bruxellois. Le but était de montrer jusqu’où l’identité d’un lieu peut aller en ligne, de la typographie à la réservation.',
        listLabel: 'Ce qu’on a construit',
        list: [
          'une direction artistique : typographie, palette, photos',
          'un agenda des soirées',
          'un formulaire de réservation de groupe',
          'des versions desktop et mobile',
        ],
        note: null,
        images: [{ key: 'lomaDesktop', alt: 'Maquette desktop de la refonte du bar-café : grand titre en capitales condensées sur fond rose pâle.' }],
        mediaRatio: '1320 / 852',
        link: { label: 'Voir le projet', href: '/fr/projets/cafe-loma/' },
      },
    ],
  },
  formats: {
    title: 'Ce qu’on intègre à votre page',
    items: [
      {
        title: 'Le message',
        text: 'On écrit vos textes, ou on retravaille les vôtres : le problème, la solution, la preuve, l’action. Pas trois paragraphes d’introduction avant d’en venir au fait.',
      },
      {
        title: 'Un design sur mesure',
        text: 'La direction artistique part de votre marque. Si elle n’existe pas encore, on la construit avec vous.',
      },
      {
        title: 'Le mobile d’abord',
        text: 'La plupart de vos visiteurs arrivent sur téléphone. La page est pensée et testée pour eux en premier.',
      },
      {
        title: 'La mesure',
        text: 'Formulaires, pixel Meta, Google Tag Manager, événements de conversion : on vérifie que tout remonte avant la mise en ligne.',
      },
    ],
  },
  process: {
    title: 'Comment ça se passe',
    steps: [
      {
        when: '01',
        title: 'Appel de cadrage, gratuit',
        text: 'Vous présentez le produit, le public et la date de lancement. On vous dit ce qu’il faut, en combien de temps et pour quel budget.',
      },
      {
        when: '02',
        title: 'Structure et message',
        text: 'On propose la structure de la page et les textes avant de dessiner quoi que ce soit.',
      },
      {
        when: '03',
        title: 'Design',
        text: 'On crée la direction artistique et les écrans, et on les valide avec vous.',
      },
      {
        when: '04',
        title: 'Développement et mise en ligne',
        text: 'La page est publiée sur votre domaine, avec le suivi des conversions vérifié.',
      },
    ],
    note: 'Comptez 1 à 4 semaines selon les assets et le branding que vous avez déjà : logo, charte, photos, textes.',
  },
  price: {
    label: 'Le prix',
    title: 'À partir de 1 999 € HTVA,',
    titleRest: 'selon votre page.',
    intro: 'Le prix dépend de deux choses.',
    factors: [
      {
        title: 'Ce que vous avez déjà',
        text: 'Branding, photos, textes. Plus il faut créer, plus la page demande de travail.',
      },
      {
        title: 'La page elle-même',
        text: 'Le nombre de sections, les animations, la vidéo, les intégrations avec votre CRM ou un paiement.',
      },
    ],
    note: 'On vous donne une fourchette dès le premier appel. Pas besoin d’un cahier des charges.',
  },
  faq: {
    title: 'Les questions qu’on nous pose',
    items: [
      {
        q: 'Vous écrivez les textes ?',
        a: 'Oui, si vous le souhaitez. Vous nous donnez le brief et on écrit, ou vous fournissez vos textes et on les structure.',
      },
      {
        q: 'Combien de temps faut-il ?',
        a: 'De 1 à 4 semaines, selon les assets et le branding que vous avez déjà.',
      },
      {
        q: 'Je n’ai pas encore de branding, c’est un problème ?',
        a: 'Non. On peut construire la direction artistique avec vous. Le délai sera plutôt vers 4 semaines.',
      },
      {
        q: 'La page est publiée sur mon domaine ?',
        a: 'Oui, sur votre domaine et votre hébergement, ou on vous recommande une solution.',
      },
      {
        q: 'Une landing page peut-elle être référencée sur Google ?',
        a: 'Pour une page de campagne, ce n’est pas son rôle. Pour une page qui doit être trouvée en recherche, oui : on prévoit la structure et les balises en conséquence.',
      },
      {
        q: 'Vous faites des variantes pour un test A/B ?',
        a: 'Oui. On peut créer des variantes de message ou de design pour mesurer laquelle convertit le mieux.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Vous avez quelque chose', 'à présenter ?'],
    text: 'Envoyez-nous votre produit ou votre offre, votre public et la date de lancement. On vous répond sous 24 h avec un premier périmètre.',
    primary: 'Parlez-nous de votre projet',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Premier appel gratuit · Réponse sous 24 h',
  },
};

const en: ServicePageCopy = {
  hero: {
    eyebrow: 'Landing page design · Brussels',
    titleLines: ['Your product deserves', 'a page built', 'to convince.'],
    lead:
      'You have a brand or a product to present or sell. We design the page that convinces, through its design as much as its message: art direction, copy, development and launch.',
    facts: ['From €1,999 excl. VAT', '1 to 4 weeks depending on your assets', 'Custom design and development'],
    cta: 'Tell us about your project',
    secondary: 'See our pages',
  },
  shot: {
    key: 'fysuHero',
    alt: 'Home page designed for a fashion brand: giant serif title and collection photos in motion.',
    caption: 'Proposal for a fashion brand · tender · design and development by Horde',
    position: '50% 0%',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'you are a startup or a brand launching a product, an offer or a collection;',
      'you are running a Google Ads or Meta campaign and it needs a destination that keeps the ad’s promise;',
      'you want a page that looks like your brand, not yet another template.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'you need a full multi-page website: have a look at our redesign offer instead;',
      'a Squarespace or Wix template covers your needs: it is a very good way to start.',
    ],
  },
  projects: {
    count: '02',
    title: 'Two pages, two art directions',
    items: [
      {
        name: 'Fashion brand',
        meta: ['Tender', 'Design and development', 'Desktop and mobile'],
        text:
          'A proposal for a fashion brand, as part of a tender. We designed all of it: the art direction, the layout, the animations and the development. The project did not go ahead because the brand did not secure its funding.',
        listLabel: 'What we built',
        list: [
          'a giant parallax title with an animated intro on load',
          'a carousel of featured products',
          'animated navigation, designed for mobile too',
          'story, collections and community sections',
        ],
        note: null,
        images: [
          { key: 'fysuMobile', alt: 'The fashion brand page on mobile: title and collection photo.' },
          { key: 'fysuProducts', alt: 'Featured products carousel: shirt, trench coat, embroidered jacket.' },
        ],
        link: null,
      },
      {
        name: 'Café Loma',
        meta: ['Fictional project', 'Digital redesign', 'Brussels bar-café'],
        text:
          'A fictional project: the digital redesign of a Brussels bar-café. The aim was to show how far a venue’s identity can go online, from typography to bookings.',
        listLabel: 'What we built',
        list: [
          'an art direction: typography, palette, photos',
          'an events calendar',
          'a group booking form',
          'desktop and mobile versions',
        ],
        note: null,
        images: [{ key: 'lomaDesktop', alt: 'Desktop mockup of the bar-café redesign: large condensed capitals on a pale pink background.' }],
        mediaRatio: '1320 / 852',
        link: { label: 'See the project', href: '/en/projets/cafe-loma/' },
      },
    ],
  },
  formats: {
    title: 'What goes into your page',
    items: [
      {
        title: 'The message',
        text: 'We write your copy, or rework yours: the problem, the solution, the proof, the action. No three-paragraph intro before getting to the point.',
      },
      {
        title: 'Custom design',
        text: 'The art direction starts from your brand. If it does not exist yet, we build it with you.',
      },
      {
        title: 'Mobile first',
        text: 'Most of your visitors arrive on a phone. The page is designed and tested for them first.',
      },
      {
        title: 'Measurement',
        text: 'Forms, Meta pixel, Google Tag Manager, conversion events: we check everything is reported before launch.',
      },
    ],
  },
  process: {
    title: 'How it works',
    steps: [
      {
        when: '01',
        title: 'Scoping call, free',
        text: 'You present the product, the audience and the launch date. We tell you what is needed, how long it takes and what it costs.',
      },
      {
        when: '02',
        title: 'Structure and message',
        text: 'We propose the page structure and the copy before designing anything.',
      },
      {
        when: '03',
        title: 'Design',
        text: 'We create the art direction and the screens, and approve them with you.',
      },
      {
        when: '04',
        title: 'Development and launch',
        text: 'The page goes live on your domain, with conversion tracking checked.',
      },
    ],
    note: 'Expect 1 to 4 weeks depending on the assets and branding you already have: logo, brand guidelines, photos, copy.',
  },
  price: {
    label: 'Pricing',
    title: 'From €1,999 excl. VAT,',
    titleRest: 'depending on your page.',
    intro: 'The price depends on two things.',
    factors: [
      {
        title: 'What you already have',
        text: 'Branding, photos, copy. The more there is to create, the more work the page takes.',
      },
      {
        title: 'The page itself',
        text: 'The number of sections, animations, video, integrations with your CRM or a payment.',
      },
    ],
    note: 'We give you a price range on the first call. No specification document needed.',
  },
  faq: {
    title: 'Questions we get asked',
    items: [
      {
        q: 'Do you write the copy?',
        a: 'Yes, if you want us to. You give us the brief and we write, or you provide your copy and we structure it.',
      },
      {
        q: 'How long does it take?',
        a: '1 to 4 weeks, depending on the assets and branding you already have.',
      },
      {
        q: 'I don’t have a brand identity yet. Is that a problem?',
        a: 'No. We can build the art direction with you. Expect it to take closer to 4 weeks.',
      },
      {
        q: 'Is the page published on my domain?',
        a: 'Yes, on your domain and hosting, or we recommend a setup.',
      },
      {
        q: 'Can a landing page rank on Google?',
        a: 'For a campaign page, that is not its job. For a page that needs to be found in search, yes: we plan the structure and tags accordingly.',
      },
      {
        q: 'Do you make variants for A/B testing?',
        a: 'Yes. We can create message or design variants to measure which one converts best.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Got something', 'to present?'],
    text: 'Send us your product or offer, your audience and the launch date. We reply within 24 hours with a first scope.',
    primary: 'Tell us about your project',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'First call free · Reply within 24 hours',
  },
};

export function getLandingCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
