import { config, fields, collection, singleton } from '@keystatic/core';

// Supported locales
const LOCALES = ['fr', 'en'] as const;
type LocaleKey = (typeof LOCALES)[number];

const localeLabels: Record<LocaleKey, string> = {
  fr: 'Français',
  en: 'English',
};

// Champs SEO réutilisables
const seoFields = {
  seoDescription: fields.text({
    label: 'Description SEO',
    description: 'Description pour les moteurs de recherche (150-160 caractères)',
    validation: { isRequired: true, length: { min: 50, max: 160 } },
    multiline: true,
  }),
  seoRobots: fields.select({
    label: 'Indexation',
    description: "Contrôle l'indexation par les moteurs de recherche",
    options: [
      { label: 'Indexer et suivre les liens', value: 'index, follow' },
      { label: 'Ne pas indexer, suivre les liens', value: 'noindex, follow' },
      { label: 'Ne pas indexer, ne pas suivre', value: 'noindex, nofollow' },
    ],
    defaultValue: 'index, follow',
  }),
  canonicalUrl: fields.url({
    label: 'URL canonique',
    description: "URL canonique personnalisée (laisser vide pour utiliser l'URL de la page)",
  }),
  ogImage: fields.image({
    label: 'Image Open Graph',
    description: "Image pour les réseaux sociaux (1200x630px). Laisser vide pour utiliser l'image par défaut",
    directory: 'public/images/og',
    publicPath: '/images/og',
  }),
  ogImageAlt: fields.text({
    label: "Texte alternatif de l'image OG",
    description: "Description de l'image pour l'accessibilité",
  }),
};

// Content blocks pour Markdoc
const contentBlocks = {
  cta: fields.object({
    label: fields.text({ label: 'Texte du bouton', validation: { isRequired: true } }),
    url: fields.url({ label: 'URL', validation: { isRequired: true } }),
    variant: fields.select({
      label: 'Style',
      options: [
        { label: 'Principal', value: 'primary' },
        { label: 'Secondaire', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
      ],
      defaultValue: 'primary',
    }),
  }),
  imageWithCaption: fields.object({
    image: fields.image({
      label: 'Image',
      directory: 'public/images/content',
      publicPath: '/images/content',
      validation: { isRequired: true },
    }),
    alt: fields.text({ label: 'Texte alternatif', validation: { isRequired: true } }),
    caption: fields.text({ label: 'Légende' }),
  }),
  video: fields.object({
    url: fields.url({ label: 'URL de la vidéo (YouTube, Vimeo)', validation: { isRequired: true } }),
    title: fields.text({ label: 'Titre de la vidéo', validation: { isRequired: true } }),
  }),
  citation: fields.object({
    quote: fields.text({ label: 'Citation', multiline: true, validation: { isRequired: true } }),
    author: fields.text({ label: 'Auteur' }),
    role: fields.text({ label: 'Rôle/Entreprise' }),
  }),
  faq: fields.array(
    fields.object({
      question: fields.text({ label: 'Question', validation: { isRequired: true } }),
      answer: fields.text({ label: 'Réponse', multiline: true, validation: { isRequired: true } }),
    }),
    {
      label: 'FAQ',
      itemLabel: (props) => props.fields.question.value || 'Question',
    }
  ),
  gallery: fields.array(
    fields.object({
      image: fields.image({
        label: 'Image',
        directory: 'public/images/gallery',
        publicPath: '/images/gallery',
        validation: { isRequired: true },
      }),
      alt: fields.text({ label: 'Texte alternatif', validation: { isRequired: true } }),
      caption: fields.text({ label: 'Légende' }),
    }),
    {
      label: 'Galerie',
      itemLabel: (props) => props.fields.alt.value || 'Image',
    }
  ),
};

// Schema definitions (without singleton/collection wrapper)
const siteSettingsSchema = {
  siteName: fields.text({
    label: 'Nom du site',
    description: 'Suffixe utilisé dans le template de titre (Page | Nom du site)',
    validation: { isRequired: true },
  }),
  homepageTitle: fields.text({
    label: "Titre de la page d'accueil",
    description: 'Titre SEO affiché sur la landing (ex: Agence Web Performance & UX à Bruxelles)',
    validation: { isRequired: true },
  }),
  siteUrl: fields.url({
    label: 'URL du site',
    description: 'URL complète du site (ex: https://monsite.com)',
    validation: { isRequired: true },
  }),
  defaultDescription: fields.text({
    label: 'Description par défaut',
    description: "Description utilisée si aucune n'est définie (150-160 caractères)",
    validation: { isRequired: true, length: { min: 50, max: 160 } },
    multiline: true,
  }),
  locale: fields.select({
    label: 'Langue du site',
    description: 'Langue principale (attribut lang et og:locale)',
    options: [
      { label: 'Français (France)', value: 'fr_FR' },
      { label: 'Français (Canada)', value: 'fr_CA' },
      { label: 'Français (Belgique)', value: 'fr_BE' },
      { label: 'Français (Suisse)', value: 'fr_CH' },
      { label: 'Anglais (US)', value: 'en_US' },
      { label: 'Anglais (UK)', value: 'en_GB' },
      { label: 'Anglais (Canada)', value: 'en_CA' },
    ],
    defaultValue: 'fr_FR',
  }),
  defaultOgImage: fields.image({
    label: 'Image Open Graph par défaut',
    description: 'Image utilisée par défaut pour les réseaux sociaux (1200x630px minimum)',
    directory: 'public/images/og',
    publicPath: '/images/og',
    validation: { isRequired: true },
  }),
  defaultOgImageAlt: fields.text({
    label: "Texte alternatif de l'image OG par défaut",
    description: "Description de l'image pour l'accessibilité",
    validation: { isRequired: true },
  }),
  twitterSite: fields.text({
    label: 'Compte Twitter du site',
    description: 'Compte Twitter (ex: @monsite) - optionnel',
  }),
  favicon: fields.image({
    label: 'Favicon',
    description: 'Icône du site (format SVG ou PNG recommandé, 32x32px minimum)',
    directory: 'public',
    publicPath: '/',
  }),
};

const navigationSchema = {
  logo: fields.image({
    label: 'Logo',
    directory: 'public/images',
    publicPath: '/images',
  }),
  logoAlt: fields.text({
    label: 'Texte alternatif du logo',
    defaultValue: 'Logo',
  }),
  items: fields.array(
    fields.object({
      label: fields.text({ label: 'Libellé', validation: { isRequired: true } }),
      url: fields.text({ label: 'URL', validation: { isRequired: true } }),
      isExternal: fields.checkbox({
        label: 'Lien externe',
        defaultValue: false,
      }),
    }),
    {
      label: 'Liens de navigation',
      itemLabel: (props) => props.fields.label.value || 'Lien',
    }
  ),
  ctaButton: fields.object(
    {
      label: fields.text({ label: 'Texte du bouton' }),
      url: fields.text({ label: 'URL' }),
    },
    { label: 'Bouton CTA (optionnel)' }
  ),
};

const footerSchema = {
  description: fields.text({
    label: 'Description',
    description: 'Courte description du site',
    multiline: true,
  }),
  columns: fields.array(
    fields.object({
      title: fields.text({ label: 'Titre de la colonne', validation: { isRequired: true } }),
      links: fields.array(
        fields.object({
          label: fields.text({ label: 'Libellé', validation: { isRequired: true } }),
          url: fields.text({ label: 'URL', validation: { isRequired: true } }),
          isExternal: fields.checkbox({ label: 'Lien externe', defaultValue: false }),
        }),
        {
          label: 'Liens',
          itemLabel: (props) => props.fields.label.value || 'Lien',
        }
      ),
    }),
    {
      label: 'Colonnes de liens',
      itemLabel: (props) => props.fields.title.value || 'Colonne',
    }
  ),
  socialLinks: fields.array(
    fields.object({
      platform: fields.select({
        label: 'Plateforme',
        options: [
          { label: 'Facebook', value: 'facebook' },
          { label: 'Twitter/X', value: 'twitter' },
          { label: 'Instagram', value: 'instagram' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'YouTube', value: 'youtube' },
          { label: 'TikTok', value: 'tiktok' },
          { label: 'GitHub', value: 'github' },
        ],
        defaultValue: 'twitter',
      }),
      url: fields.url({ label: 'URL', validation: { isRequired: true } }),
    }),
    {
      label: 'Réseaux sociaux',
      itemLabel: (props) => props.fields.platform.value || 'Réseau',
    }
  ),
  copyright: fields.text({
    label: 'Copyright',
    description: 'Ex: © 2024 Mon Site. Tous droits réservés.',
  }),
  legalLinks: fields.array(
    fields.object({
      label: fields.text({ label: 'Libellé', validation: { isRequired: true } }),
      url: fields.text({ label: 'URL', validation: { isRequired: true } }),
    }),
    {
      label: 'Liens légaux',
      itemLabel: (props) => props.fields.label.value || 'Lien',
    }
  ),
};

const postsSchema = {
  title: fields.slug({
    name: {
      label: 'Titre',
      validation: { isRequired: true },
    },
  }),
  excerpt: fields.text({
    label: 'Extrait',
    description: "Court résumé de l'article affiché dans les listes",
    multiline: true,
    validation: { isRequired: true, length: { max: 300 } },
  }),
  featuredImage: fields.image({
    label: 'Image à la une',
    directory: 'public/images/posts',
    publicPath: '/images/posts',
    validation: { isRequired: true },
  }),
  featuredImageAlt: fields.text({
    label: "Texte alternatif de l'image à la une",
    validation: { isRequired: true },
  }),
  publishedDate: fields.date({
    label: 'Date de publication',
    validation: { isRequired: true },
  }),
  modifiedDate: fields.date({
    label: 'Date de modification',
    description: 'Dernière modification (optionnel)',
  }),
  author: fields.text({
    label: 'Auteur',
    validation: { isRequired: true },
  }),
  ...seoFields,
  content: fields.markdoc({
    label: 'Contenu',
    options: {
      image: {
        directory: 'public/images/content',
        publicPath: '/images/content',
      },
    },
  }),
};

const pagesSchema = {
  title: fields.slug({
    name: {
      label: 'Titre',
      validation: { isRequired: true },
    },
  }),
  excerpt: fields.text({
    label: 'Extrait',
    description: 'Court résumé de la page',
    multiline: true,
    validation: { length: { max: 300 } },
  }),
  featuredImage: fields.image({
    label: 'Image à la une',
    directory: 'public/images/pages',
    publicPath: '/images/pages',
  }),
  featuredImageAlt: fields.text({
    label: "Texte alternatif de l'image à la une",
  }),
  ogType: fields.select({
    label: 'Type Open Graph',
    options: [
      { label: 'Site web', value: 'website' },
      { label: 'Article', value: 'article' },
    ],
    defaultValue: 'website',
  }),
  ...seoFields,
  content: fields.markdoc({
    label: 'Contenu',
    options: {
      image: {
        directory: 'public/images/content',
        publicPath: '/images/content',
      },
    },
  }),
};

const testimonialsSchema = {
  author: fields.slug({
    name: {
      label: 'Nom',
      validation: { isRequired: true },
    },
  }),
  role: fields.text({
    label: 'Rôle / Entreprise',
  }),
  avatar: fields.image({
    label: 'Photo',
    directory: 'public/images/testimonials',
    publicPath: '/images/testimonials',
  }),
  quote: fields.text({
    label: 'Témoignage',
    multiline: true,
    validation: { isRequired: true },
  }),
  rating: fields.integer({
    label: 'Note (1-5)',
    validation: { min: 1, max: 5 },
  }),
  featured: fields.checkbox({
    label: 'Mis en avant',
    defaultValue: false,
  }),
};


const projectsSchema = {
  slug: fields.slug({
    name: {
      label: 'Identifiant (slug)',
      description: 'Identifiant unique du projet (ex: cafe-belga)',
      validation: { isRequired: true },
    },
  }),
  // === CHAMPS LOCALISÉS ===
  shortTitle_fr: fields.text({
    label: 'Titre court (FR)',
    description: 'Titre affiché dans les listes',
    validation: { isRequired: true },
  }),
  shortTitle_en: fields.text({
    label: 'Titre court (EN)',
    validation: { isRequired: true },
  }),
  fullTitle_fr: fields.text({
    label: 'Titre complet (FR)',
    description: 'Titre affiché sur la page du projet',
    validation: { isRequired: true },
  }),
  fullTitle_en: fields.text({
    label: 'Titre complet (EN)',
    validation: { isRequired: true },
  }),
  titleDisplay_fr: fields.text({
    label: 'Titre display (FR)',
    description: 'Titre stylisé avec HTML (ex: Café belga<br>web branding)',
  }),
  titleDisplay_en: fields.text({
    label: 'Titre display (EN)',
    description: 'Stylized title with HTML (e.g. Café belga<br>web branding)',
  }),
  description_fr: fields.mdx({
    label: 'Description (FR)',
    description: 'Description détaillée du projet',
    options: {
      image: {
        directory: 'src/assets/images/projects/content',
        publicPath: '/src/assets/images/projects/content',
      },
    },
  }),
  description_en: fields.mdx({
    label: 'Description (EN)',
    description: 'Detailed project description',
    options: {
      image: {
        directory: 'src/assets/images/projects/content',
        publicPath: '/src/assets/images/projects/content',
      },
    },
  }),
  // SEO localisé
  seoDescription_fr: fields.text({
    label: 'Description SEO (FR)',
    description: 'Description pour les moteurs de recherche (150-160 caractères)',
    validation: { isRequired: true, length: { min: 50, max: 160 } },
    multiline: true,
  }),
  seoDescription_en: fields.text({
    label: 'Description SEO (EN)',
    validation: { isRequired: true, length: { min: 50, max: 160 } },
    multiline: true,
  }),
  featuredImageAlt_fr: fields.text({
    label: "Alt image principale (FR)",
    validation: { isRequired: true },
  }),
  featuredImageAlt_en: fields.text({
    label: "Alt image principale (EN)",
    validation: { isRequired: true },
  }),
  // === CHAMPS PARTAGÉS ===
  featuredImage: fields.image({
    label: 'Image principale',
    description: 'Image affichée dans les listes et en haut du projet',
    directory: 'src/assets/images/projects',
    publicPath: '/src/assets/images/projects',
    validation: { isRequired: true },
  }),
  gallery: fields.array(
    fields.object({
      layout: fields.select({
        label: 'Disposition',
        options: [
          { label: '1 image (pleine largeur)', value: 'full' },
          { label: '2 images (côte à côte)', value: 'half' },
        ],
        defaultValue: 'full',
      }),
      image1: fields.image({
        label: 'Image 1',
        directory: 'src/assets/images/projects/gallery',
        publicPath: '/src/assets/images/projects/gallery',
        validation: { isRequired: true },
      }),
      alt1_fr: fields.text({
        label: 'Alt image 1 (FR)',
        description: 'Laisser vide pour utiliser: "[Nom projet] - Horde, agence web UX Bruxelles"',
      }),
      alt1_en: fields.text({
        label: 'Alt image 1 (EN)',
        description: 'Laisser vide pour utiliser: "[Project name] - Horde, Brussels UX web agency"',
      }),
      image2: fields.image({
        label: 'Image 2 (si disposition 2 images)',
        directory: 'src/assets/images/projects/gallery',
        publicPath: '/src/assets/images/projects/gallery',
      }),
      alt2_fr: fields.text({
        label: 'Alt image 2 (FR)',
        description: 'Laisser vide pour utiliser le alt par défaut',
      }),
      alt2_en: fields.text({
        label: 'Alt image 2 (EN)',
        description: 'Laisser vide pour utiliser le alt par défaut',
      }),
    }),
    {
      label: 'Galerie',
      itemLabel: (props) => {
        const layout = props.fields.layout.value === 'full' ? '1 image' : '2 images';
        return `Rangée - ${layout}`;
      },
    }
  ),
  projectTypes: fields.array(
    fields.text({ label: 'Tag', validation: { isRequired: true } }),
    {
      label: 'Types de projet',
      itemLabel: (props) => props.value || 'Nouveau tag',
    }
  ),
  externalUrl: fields.url({
    label: 'URL du projet',
    description: 'Lien vers le site en ligne (optionnel)',
  }),
  inProgress: fields.checkbox({
    label: 'En cours de réalisation',
    description: 'Cocher si le projet n\'est pas encore terminé',
    defaultValue: false,
  }),
  publishedDate: fields.date({
    label: 'Date de publication',
    validation: { isRequired: true },
  }),
  order: fields.integer({
    label: 'Ordre d\'affichage',
    description: 'Les projets sont triés par ordre croissant (1 = premier)',
    defaultValue: 0,
  }),
  seoRobots: fields.select({
    label: 'Indexation',
    options: [
      { label: 'Indexer et suivre les liens', value: 'index, follow' },
      { label: 'Ne pas indexer, suivre les liens', value: 'noindex, follow' },
      { label: 'Ne pas indexer, ne pas suivre', value: 'noindex, nofollow' },
    ],
    defaultValue: 'index, follow',
  }),
  ogImage: fields.image({
    label: 'Image Open Graph',
    description: "Image pour les réseaux sociaux (1200x630px)",
    directory: 'public/images/og',
    publicPath: '/images/og',
  }),
};

// Build localized singletons
const singletons: Record<string, ReturnType<typeof singleton>> = {};

for (const locale of LOCALES) {
  const label = localeLabels[locale];

  singletons[`siteSettings_${locale}`] = singleton({
    label: `Paramètres du site (${label})`,
    path: `src/content/settings_${locale}/site`,
    format: 'yaml',
    schema: siteSettingsSchema,
  });

  singletons[`navigation_${locale}`] = singleton({
    label: `Navigation (${label})`,
    path: `src/content/settings_${locale}/navigation`,
    format: 'yaml',
    schema: navigationSchema,
  });

  singletons[`footer_${locale}`] = singleton({
    label: `Pied de page (${label})`,
    path: `src/content/settings_${locale}/footer`,
    format: 'yaml',
    schema: footerSchema,
  });
}

// Build localized collections
const collections: Record<string, ReturnType<typeof collection>> = {};

for (const locale of LOCALES) {
  const label = localeLabels[locale];

  collections[`posts_${locale}`] = collection({
    label: `Articles (${label})`,
    slugField: 'title',
    path: `src/content/posts_${locale}/*`,
    format: { contentField: 'content' },
    schema: postsSchema,
  });

  collections[`pages_${locale}`] = collection({
    label: `Pages (${label})`,
    slugField: 'title',
    path: `src/content/pages_${locale}/*`,
    format: { contentField: 'content' },
    schema: pagesSchema,
  });

  collections[`testimonials_${locale}`] = collection({
    label: `Témoignages (${label})`,
    slugField: 'author',
    path: `src/content/testimonials_${locale}/*`,
    schema: testimonialsSchema,
  });
}

// Collection projets unique (multilingue)
collections['projects'] = collection({
  label: 'Projets',
  slugField: 'slug',
  path: 'src/content/projects/*',
  schema: projectsSchema,
});

export default config({
  storage: {
    kind: 'local',
  },
  singletons,
  collections,
});

// Export des types de blocks pour utilisation dans les composants
export { contentBlocks };
