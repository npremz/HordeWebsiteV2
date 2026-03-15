import { getCollection, type CollectionEntry } from 'astro:content';

export type ServiceEntry = CollectionEntry<'services'>;

export interface ServiceSummary {
  entry: ServiceEntry;
  slug: string;
  title: string;
  shortName?: string;
  seoTitle: string;
  seoDescription: string;
  seoRobots: ServiceEntry['data']['seoRobots'];
}

let servicesPromise: Promise<ServiceEntry[]> | undefined;

export async function getServices(): Promise<ServiceEntry[]> {
  servicesPromise ??= getCollection('services').then((services) =>
    [...services].sort((a, b) => (a.data.order || 0) - (b.data.order || 0)),
  );
  return servicesPromise;
}

export async function getServiceSummaries(): Promise<ServiceSummary[]> {
  const services = await getServices();

  return services.map((service) => ({
    entry: service,
    slug: service.data.slug,
    title: service.data.shortName || service.data.h1,
    shortName: service.data.shortName,
    seoTitle: service.data.seoTitle,
    seoDescription: service.data.seoDescription,
    seoRobots: service.data.seoRobots,
  }));
}
