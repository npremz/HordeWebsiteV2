import type { Locale } from '../../../i18n';
import type { ServicePageCopy } from '../v2/types';

/**
 * Page service « Création de site e-commerce » (refonte v2).
 * Pitch, plateformes (Shopify ou sur mesure, le sur mesure coûte plus cher), facteurs de prix
 * (volume, fonctionnalités/plugins, landings additionnelles), « à partir de 2 999 € » et preuve
 * Fysu : Nicolas, nov. 2026. Prix plancher 2 999 € confirmé par Nicolas le 27/11/2026.
 * Délai : 1 à 2 mois (Nicolas, 27/11/2026).
 * SEO (GSC) : garder « agence e-commerce », « boutique en ligne », « e-shop », « Belgique ».
 */
const fr: ServicePageCopy = {
  hero: {
    eyebrow: 'Création de site e-commerce · Bruxelles',
    titleLines: ['Votre boutique', 'passe au niveau', 'supérieur.'],
    lead:
      'Vous avez une marque en ligne et vous voulez que votre e-shop suive. On conçoit et on développe un site soigné, sur Shopify ou sur mesure, avec des tunnels de vente fluides, de la fiche produit au paiement.',
    facts: ['À partir de 2 999 € HTVA', '1 à 2 mois', 'Shopify ou sur mesure'],
    cta: 'Parlez-nous de votre boutique',
    secondary: 'Voir notre travail',
  },
  shot: {
    key: 'fysuRail',
    alt: 'Carrousel de produits mis en avant sur la boutique d’une marque de mode : veste, blouson en cuir brodé, chemise.',
    caption: 'Proposition pour une marque de mode · appel d’offres · design et développement Horde',
    position: '50% 50%',
  },
  fit: {
    title: 'Est-ce pour vous ?',
    yesLabel: 'C’est pour vous si',
    yes: [
      'vous avez une marque qui vend déjà, ou qui va vendre, et votre boutique ne lui ressemble pas ;',
      'vos visiteurs arrivent jusqu’au panier mais ne vont pas jusqu’au paiement ;',
      'vous voulez une boutique en ligne que vous gérez vous-même au quotidien.',
    ],
    noLabel: 'Ce n’est pas pour vous si',
    no: [
      'vous n’avez pas encore de produit ni de marque : commencez par une landing page pour tester l’intérêt ;',
      'un thème Shopify standard, installé tel quel, vous suffit.',
    ],
  },
  projects: {
    count: '01',
    title: 'Une boutique pensée comme la marque',
    items: [
      {
        name: 'Marque de mode',
        meta: ['Appel d’offres', 'Design et développement', 'Desktop et mobile'],
        text:
          'Une proposition pour la boutique d’une marque de mode, dans le cadre d’un appel d’offres. On a conçu la direction artistique, la mise en page, les animations et le développement de la vitrine. Le projet ne s’est pas fait parce que la marque n’a pas obtenu son financement.',
        listLabel: 'Ce qu’on a construit',
        list: [
          'une page d’accueil qui met la marque en scène, avec une intro animée',
          'un carrousel des produits mis en avant, avec les prix',
          'l’accès au panier et à la boutique depuis chaque écran',
          'une navigation pensée pour le mobile',
        ],
        note: null,
        images: [
          { key: 'fysuMobile', alt: 'La boutique de la marque de mode sur mobile : titre et photo de collection.' },
          { key: 'fysuProducts', alt: 'Une carte du carrousel produits : veste en cuir brodée sur fond clair.' },
        ],
        link: null,
      },
    ],
  },
  formats: {
    title: 'Ce qu’on construit pour vous',
    items: [
      {
        title: 'Une boutique Shopify',
        text: 'Un thème conçu pour votre marque, et les apps dont vous avez vraiment besoin. Vous gérez produits, commandes et stocks depuis Shopify.',
      },
      {
        title: 'Une boutique sur mesure',
        text: 'Quand votre logique de vente sort du cadre d’une plateforme : configurateur, abonnements, règles de prix particulières. C’est forcément plus cher.',
      },
      {
        title: 'Des tunnels de vente fluides',
        text: 'Fiche produit, panier, paiement : chaque étape est pensée pour le téléphone, sur lequel arrive la plupart de vos clients.',
      },
      {
        title: 'Des landings pour vos campagnes',
        text: 'Une collection, un lancement, une promo : des pages dédiées qui renvoient directement vers vos produits.',
      },
    ],
  },
  process: {
    title: 'Comment ça se passe',
    steps: [
      {
        when: '01',
        title: 'Appel de cadrage, gratuit',
        text: 'Vous présentez la marque, le catalogue et la façon dont vous vendez. On vous dit quelle plateforme choisir et pour quel budget.',
      },
      {
        when: '02',
        title: 'Catalogue et parcours d’achat',
        text: 'On organise les collections et on dessine le parcours, de la page d’accueil au paiement.',
      },
      {
        when: '03',
        title: 'Design',
        text: 'On crée la direction artistique et les écrans clés, et on les valide avec vous.',
      },
      {
        when: '04',
        title: 'Développement et configuration',
        text: 'Boutique, paiement, livraison, apps ou plugins : tout est configuré et vérifié.',
      },
      {
        when: '05',
        title: 'Test de commande et mise en ligne',
        text: 'On passe de vraies commandes de test avant l’ouverture, puis on vous montre comment gérer la boutique.',
      },
    ],
    note: 'Comptez 1 à 2 mois du cadrage à l’ouverture, selon le volume du catalogue et les fonctionnalités.',
  },
  price: {
    label: 'Le prix',
    title: 'À partir de 2 999 € HTVA,',
    titleRest: 'selon votre boutique.',
    intro: 'Trois choses font varier le prix.',
    factors: [
      {
        title: 'La plateforme',
        text: 'Shopify ou sur mesure. Une boutique sur mesure est forcément plus chère.',
      },
      {
        title: 'Le volume',
        text: 'Le nombre de produits, de variantes et de collections à mettre en place.',
      },
      {
        title: 'Les fonctionnalités',
        text: 'Les plugins et apps à intégrer, et les landings additionnelles pour vos campagnes.',
      },
    ],
    note: 'On vous donne une fourchette dès le premier appel. Pas besoin d’un cahier des charges.',
  },
  faq: {
    title: 'Les questions qu’on nous pose',
    items: [
      {
        q: 'Shopify ou sur mesure ?',
        a: 'Shopify convient à la plupart des boutiques et coûte moins cher. Le sur mesure se justifie quand votre façon de vendre sort de ce qu’une plateforme sait faire. On vous conseille pendant le cadrage.',
      },
      {
        q: 'Combien de temps faut-il ?',
        a: 'De 1 à 2 mois du cadrage à l’ouverture, selon le volume du catalogue et les fonctionnalités.',
      },
      {
        q: 'Je pourrai gérer mes produits moi-même ?',
        a: 'Oui. Sur Shopify, vous gérez tout depuis l’administration Shopify. En sur mesure, on prévoit l’interface de gestion dont vous avez besoin.',
      },
      {
        q: 'J’ai déjà une boutique. Vous pouvez la reprendre ?',
        a: 'Oui. Si la base est saine, on retravaille l’existant plutôt que de tout refaire : c’est notre offre de refonte.',
      },
      {
        q: 'Vous pouvez créer des pages pour mes campagnes ?',
        a: 'Oui. Des landings additionnelles pour une collection, un lancement ou une promo, reliées directement à vos produits.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Votre boutique mérite', 'mieux ? Parlons-en.'],
    text: 'Envoyez-nous le lien de votre boutique actuelle si vous en avez une, votre catalogue et ce qui coince. On vous répond sous 24 h avec un premier périmètre.',
    primary: 'Parlez-nous de votre boutique',
    booking: 'Réserver un appel de 30 min',
    newTab: '(nouvel onglet)',
    reassurance: 'Premier appel gratuit · Réponse sous 24 h',
  },
};

const en: ServicePageCopy = {
  hero: {
    eyebrow: 'E-commerce website development · Brussels',
    titleLines: ['Take your store', 'to the next', 'level.'],
    lead:
      'You have an online brand and you want your e-shop to keep up. We design and build a polished store, on Shopify or custom, with smooth sales funnels from product page to checkout.',
    facts: ['From €2,999 excl. VAT', '1 to 2 months', 'Shopify or custom'],
    cta: 'Tell us about your store',
    secondary: 'See our work',
  },
  shot: {
    key: 'fysuRail',
    alt: 'Featured products carousel on a fashion brand’s store: jacket, embroidered leather jacket, shirt.',
    caption: 'Proposal for a fashion brand · tender · design and development by Horde',
    position: '50% 50%',
  },
  fit: {
    title: 'Is this for you?',
    yesLabel: 'This is for you if',
    yes: [
      'you have a brand that already sells, or is about to, and your store doesn’t look like it;',
      'your visitors get as far as the cart but not to checkout;',
      'you want an online store you can run yourself day to day.',
    ],
    noLabel: 'This is not for you if',
    no: [
      'you don’t have a product or a brand yet: start with a landing page to test interest;',
      'a standard Shopify theme, installed as is, is enough for you.',
    ],
  },
  projects: {
    count: '01',
    title: 'A store designed like the brand',
    items: [
      {
        name: 'Fashion brand',
        meta: ['Tender', 'Design and development', 'Desktop and mobile'],
        text:
          'A proposal for a fashion brand’s store, as part of a tender. We designed the art direction, the layout, the animations and the development of the storefront. The project did not go ahead because the brand did not secure its funding.',
        listLabel: 'What we built',
        list: [
          'a home page that showcases the brand, with an animated intro',
          'a carousel of featured products, with prices',
          'access to the cart and the shop from every screen',
          'navigation designed for mobile',
        ],
        note: null,
        images: [
          { key: 'fysuMobile', alt: 'The fashion brand’s store on mobile: title and collection photo.' },
          { key: 'fysuProducts', alt: 'A card from the product carousel: embroidered leather jacket on a light background.' },
        ],
        link: null,
      },
    ],
  },
  formats: {
    title: 'What we build for you',
    items: [
      {
        title: 'A Shopify store',
        text: 'A theme designed for your brand, and the apps you actually need. You manage products, orders and stock from Shopify.',
      },
      {
        title: 'A custom store',
        text: 'When your way of selling goes beyond what a platform can do: configurator, subscriptions, special pricing rules. It necessarily costs more.',
      },
      {
        title: 'Smooth sales funnels',
        text: 'Product page, cart, checkout: every step is designed for the phone, where most of your customers arrive.',
      },
      {
        title: 'Landing pages for your campaigns',
        text: 'A collection, a launch, a sale: dedicated pages that lead straight to your products.',
      },
    ],
  },
  process: {
    title: 'How it works',
    steps: [
      {
        when: '01',
        title: 'Scoping call, free',
        text: 'You present the brand, the catalogue and how you sell. We tell you which platform to choose and what it costs.',
      },
      {
        when: '02',
        title: 'Catalogue and purchase journey',
        text: 'We organise the collections and map the journey from the home page to checkout.',
      },
      {
        when: '03',
        title: 'Design',
        text: 'We create the art direction and the key screens, and approve them with you.',
      },
      {
        when: '04',
        title: 'Development and setup',
        text: 'Store, payment, shipping, apps or plugins: everything is set up and checked.',
      },
      {
        when: '05',
        title: 'Test orders and launch',
        text: 'We place real test orders before opening, then show you how to run the store.',
      },
    ],
    note: 'Expect 1 to 2 months from scoping to opening, depending on the size of the catalogue and the features.',
  },
  price: {
    label: 'Pricing',
    title: 'From €2,999 excl. VAT,',
    titleRest: 'depending on your store.',
    intro: 'Three things change the price.',
    factors: [
      {
        title: 'Platform',
        text: 'Shopify or custom. A custom store necessarily costs more.',
      },
      {
        title: 'Volume',
        text: 'The number of products, variants and collections to set up.',
      },
      {
        title: 'Features',
        text: 'The plugins and apps to integrate, and additional landing pages for your campaigns.',
      },
    ],
    note: 'We give you a price range on the first call. No specification document needed.',
  },
  faq: {
    title: 'Questions we get asked',
    items: [
      {
        q: 'Shopify or custom?',
        a: 'Shopify suits most stores and costs less. Custom makes sense when the way you sell goes beyond what a platform can do. We advise you during scoping.',
      },
      {
        q: 'How long does it take?',
        a: '1 to 2 months from scoping to opening, depending on the size of the catalogue and the features.',
      },
      {
        q: 'Will I be able to manage my products myself?',
        a: 'Yes. On Shopify, you manage everything from the Shopify admin. For a custom store, we build the management interface you need.',
      },
      {
        q: 'I already have a store. Can you take it over?',
        a: 'Yes. If the foundation is sound, we rework what exists rather than starting over: that is our redesign offer.',
      },
      {
        q: 'Can you create pages for my campaigns?',
        a: 'Yes. Additional landing pages for a collection, a launch or a sale, linked straight to your products.',
      },
    ],
  },
  cta: {
    label: 'Contact',
    titleLines: ['Your store deserves', 'better? Let’s talk.'],
    text: 'Send us a link to your current store if you have one, your catalogue and what is not working. We reply within 24 hours with a first scope.',
    primary: 'Tell us about your store',
    booking: 'Book a 30-minute call',
    newTab: '(opens in a new tab)',
    reassurance: 'First call free · Reply within 24 hours',
  },
};

export function getEcommerceCopy(lang: Locale) {
  return lang === 'en' ? en : fr;
}
