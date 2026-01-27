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

export const collections = {
  projects: projectsCollection,
};
