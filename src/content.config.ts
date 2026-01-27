import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema pour les projets (multilingue)
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    slug: z.string(),
    // Champs localisés
    shortTitle_fr: z.string(),
    shortTitle_en: z.string(),
    fullTitle_fr: z.string(),
    fullTitle_en: z.string(),
    titleDisplay_fr: z.string().optional(),
    titleDisplay_en: z.string().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    seoDescription_fr: z.string(),
    seoDescription_en: z.string(),
    featuredImageAlt_fr: z.string(),
    featuredImageAlt_en: z.string(),
    // Champs partagés
    featuredImage: image(),
    gallery: z.array(z.object({
      layout: z.enum(['full', 'half']),
      image1: image(),
      alt1_fr: z.string().optional(),
      alt1_en: z.string().optional(),
      image2: image().optional(),
      alt2_fr: z.string().optional(),
      alt2_en: z.string().optional(),
    })).default([]),
    projectTypes: z.array(z.string()).default([]),
    externalUrl: z.string().url().optional(),
    inProgress: z.boolean().default(false),
    publishedDate: z.coerce.date(),
    order: z.number().default(0),
    seoRobots: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

// Schema pour les auteurs
const authorsCollection = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/authors' }),
  schema: ({ image }) => z.object({
    slug: z.string(),
    name: z.string(),
    role_fr: z.string(),
    role_en: z.string(),
    bio_fr: z.string().optional(),
    bio_en: z.string().optional(),
    avatar: image(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().url().optional(),
      github: z.string().optional(),
    }).optional(),
  }),
});

// Schema pour les catégories blog
const categoriesCollection = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categories' }),
  schema: z.object({
    slug: z.string(),
    name_fr: z.string(),
    name_en: z.string(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    color: z.string().optional(),
  }),
});

// Schema pour les articles de blog (multilingue)
const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    slug: z.string(),
    // Champs localisés
    title_fr: z.string(),
    title_en: z.string(),
    excerpt_fr: z.string(),
    excerpt_en: z.string(),
    seoDescription_fr: z.string(),
    seoDescription_en: z.string(),
    featuredImageAlt_fr: z.string(),
    featuredImageAlt_en: z.string(),
    // Champs partagés
    featuredImage: image(),
    author: z.string(), // slug de l'auteur (relation)
    category: z.string(), // slug de la catégorie (relation)
    tags: z.array(z.string()).default([]),
    publishedDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seoRobots: z.string().optional(),
    ogImage: z.string().optional(),
    // Contenu
    content_fr: z.string().optional(),
    content_en: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  authors: authorsCollection,
  categories: categoriesCollection,
  posts: postsCollection,
};
