import { getCollection, type CollectionEntry } from 'astro:content';

export type ServiceEntry = CollectionEntry<'services'>;

export interface ServiceSummary {
  entry: ServiceEntry;
  slug: string;
  url: string;
  title: string;
  shortName?: string;
  seoTitle: string;
  seoDescription: string;
  seoRobots: ServiceEntry['data']['seoRobots'];
}

export interface FooterServiceLink {
  label: string;
  url: string;
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
    url: service.data.seoUrl || `/fr/services/${service.data.slug}`,
    title: service.data.shortName || service.data.h1,
    shortName: service.data.shortName,
    seoTitle: service.data.seoTitle,
    seoDescription: service.data.seoDescription,
    seoRobots: service.data.seoRobots,
  }));
}

export async function getFooterServiceLinks(): Promise<FooterServiceLink[]> {
  const services = await getServices();

  return [...services]
    .sort((a, b) => {
      const aOrder = a.data.footerOrder ?? a.data.order ?? 0;
      const bOrder = b.data.footerOrder ?? b.data.order ?? 0;
      return aOrder - bOrder;
    })
    .map((service) => ({
      label: service.data.footerTitle || service.data.shortName || service.data.h1,
      url: service.data.seoUrl || `/fr/services/${service.data.slug}`,
    }));
}
