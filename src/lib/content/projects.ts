import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../../i18n';
import { getProjectImageAlt } from '../../utils/project-helpers';

export type ProjectEntry = CollectionEntry<'projects'>;

export interface LocalizedProjectGalleryRow {
  layout: 'full' | 'half';
  image1: ProjectEntry['data']['gallery'][number]['image1'];
  image2?: ProjectEntry['data']['gallery'][number]['image2'];
  alt1: string;
  alt2?: string;
}

export interface LocalizedProject {
  entry: ProjectEntry;
  slug: string;
  shortTitle: string;
  fullTitle: string;
  titleDisplay: string;
  seoDescription: string;
  featuredImage: ProjectEntry['data']['featuredImage'];
  featuredImageAlt: string;
  gallery: LocalizedProjectGalleryRow[];
  projectTypes: string[];
  externalUrl?: string;
  inProgress: boolean;
  order: number;
}

const projectDescriptionModules = import.meta.glob('../../content/projects/*/description_*.mdx', {
  query: '?raw',
  import: 'default',
});

function sortProjects(projects: ProjectEntry[]): ProjectEntry[] {
  return [...projects].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export function localizeProject(project: ProjectEntry, lang: Locale): LocalizedProject {
  const shortTitle = lang === 'fr' ? project.data.shortTitle_fr : project.data.shortTitle_en;
  const fullTitle = lang === 'fr' ? project.data.fullTitle_fr : project.data.fullTitle_en;
  const titleDisplay =
    (lang === 'fr' ? project.data.titleDisplay_fr : project.data.titleDisplay_en) || fullTitle;

  return {
    entry: project,
    slug: project.data.slug,
    shortTitle,
    fullTitle,
    titleDisplay,
    seoDescription: lang === 'fr' ? project.data.seoDescription_fr : project.data.seoDescription_en,
    featuredImage: project.data.featuredImage,
    featuredImageAlt:
      lang === 'fr' ? project.data.featuredImageAlt_fr : project.data.featuredImageAlt_en,
    gallery: (project.data.gallery || []).map((row) => ({
      layout: row.layout,
      image1: row.image1,
      image2: row.image2,
      alt1: getProjectImageAlt(lang === 'fr' ? row.alt1_fr : row.alt1_en, shortTitle, lang),
      alt2: row.image2
        ? getProjectImageAlt(lang === 'fr' ? row.alt2_fr : row.alt2_en, shortTitle, lang)
        : undefined,
    })),
    projectTypes: project.data.projectTypes || [],
    externalUrl: project.data.externalUrl,
    inProgress: project.data.inProgress,
    order: project.data.order || 0,
  };
}

export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection('projects');
  return sortProjects(projects);
}

export async function getLocalizedProjects(lang: Locale): Promise<LocalizedProject[]> {
  const projects = await getProjects();
  return projects.map((project) => localizeProject(project, lang));
}

export async function getLocalizedProjectDescription(
  slug: string,
  lang: Locale,
): Promise<string> {
  const descriptionPath = `../../content/projects/${slug}/description_${lang}.mdx`;
  const loader = projectDescriptionModules[descriptionPath];

  if (!loader) {
    return '';
  }

  return (await loader()) as string;
}
