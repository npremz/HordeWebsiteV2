import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';
import { localizeServiceData } from './content/services';

export type ProjectEntry = CollectionEntry<'projects'>;
export type ProjectService = CollectionEntry<'services'>;
export type ProjectServiceSlug = ProjectService['data']['slug'];

const LEGACY_SERVICE_LABELS: Record<string, ProjectServiceSlug> = {
  'landing-page': 'creation-landing-page',
  'site-vitrine': 'creation-landing-page',
  'application-web': 'creation-mvp-saas',
  'saas-mvp': 'creation-mvp-saas',
  'e-commerce': 'creation-ecommerce',
  ecommerce: 'creation-ecommerce',
  optimisation: 'optimisation-site-web',
  'refonte-web': 'refonte-site-web',
  'refonte-site-web': 'refonte-site-web',
};

export async function getProjectServiceEntries(): Promise<ProjectService[]> {
  const services = await getCollection('services');
  return [...services].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export async function getProjectServiceEntry(slug: string): Promise<ProjectService | undefined> {
  const services = await getProjectServiceEntries();
  return services.find((service) => service.data.slug === slug);
}

export function getProjectServiceSlugs(services: ProjectService[]): ProjectServiceSlug[] {
  return services.map((service) => service.data.slug);
}

export function getProjectServiceLabel(service: ProjectService): string {
  return service.data.shortName || service.data.h1;
}

export function getProjectServiceTitle(service: ProjectService, lang: Locale): string {
  return localizeServiceData(service.data, lang).seoTitle;
}

export function getProjectServiceDescription(service: ProjectService, lang: Locale): string {
  return localizeServiceData(service.data, lang).seoDescription;
}

export function getProjectServiceIntro(service: ProjectService, lang: Locale): string {
  return localizeServiceData(service.data, lang).intro;
}

export function getLocalizedProjectServiceLabel(service: ProjectService, lang: Locale): string {
  const localizedService = localizeServiceData(service.data, lang);
  return localizedService.shortName || localizedService.h1;
}

export function getProjectIndexHref(lang: Locale): string {
  return `/${lang}/projets`;
}

export function getProjectHref(slug: string, lang: Locale): string {
  return `${getProjectIndexHref(lang)}/${slug}`;
}

export function getProjectServiceHref(slug: ProjectServiceSlug, lang: Locale): string {
  return getProjectHref(slug, lang);
}

export function getProjectServices(project: ProjectEntry): ProjectServiceSlug[] {
  const explicitServices = project.data.services || [];
  const legacyServices = project.data.projectTypes
    .map((type) => LEGACY_SERVICE_LABELS[slugifyServiceLabel(type)])
    .filter(Boolean);

  return Array.from(new Set([...explicitServices, ...legacyServices]));
}

export function projectHasService(project: ProjectEntry, serviceSlug: ProjectServiceSlug): boolean {
  return getProjectServices(project).includes(serviceSlug);
}

function slugifyServiceLabel(label: string): string {
  return label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
