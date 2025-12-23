import { config, fields, collection, singleton } from '@keystatic/core';

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

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    siteSettings: singleton({
      label: 'Paramètres du site',
      path: 'src/content/settings/site',
      format: 'yaml',
      schema: {
        siteName: fields.text({
          label: 'Nom du site',
          description: 'Utilisé dans le template de titre (Page | Nom du site)',
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
      },
    }),

    navigation: singleton({
      label: 'Navigation',
      path: 'src/content/settings/navigation',
      format: 'yaml',
      schema: {
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
      },
    }),

    footer: singleton({
      label: 'Pied de page',
      path: 'src/content/settings/footer',
      format: 'yaml',
      schema: {
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
      },
    }),
  },

  collections: {
    posts: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
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

        // SEO
        ...seoFields,

        // Contenu avec blocks
        content: fields.markdoc({
          label: 'Contenu',
          options: {
            image: {
              directory: 'public/images/content',
              publicPath: '/images/content',
            },
          },
        }),
      },
    }),

    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
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

        // SEO
        ogType: fields.select({
          label: 'Type Open Graph',
          options: [
            { label: 'Site web', value: 'website' },
            { label: 'Article', value: 'article' },
          ],
          defaultValue: 'website',
        }),
        ...seoFields,

        // Contenu avec blocks
        content: fields.markdoc({
          label: 'Contenu',
          options: {
            image: {
              directory: 'public/images/content',
              publicPath: '/images/content',
            },
          },
        }),
      },
    }),

    testimonials: collection({
      label: 'Témoignages',
      slugField: 'author',
      path: 'src/content/testimonials/*',
      schema: {
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
      },
    }),
  },
});

// Export des types de blocks pour utilisation dans les composants
export { contentBlocks };
