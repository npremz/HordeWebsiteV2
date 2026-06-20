import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../../i18n';

export type ServiceEntry = CollectionEntry<'services'>;
export type ServiceData = ServiceEntry['data'];
export type LocalizedServiceData = Omit<ServiceData, 'translations'>;

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

function localizeServiceUrl(url: string | undefined, lang: Locale, slug: string): string {
  if (url) {
    return url.replace(/^\/(fr|en)\//, `/${lang}/`);
  }

  return `/${lang}/services/${slug}`;
}

export function localizeServiceData(service: ServiceData, lang: Locale): LocalizedServiceData {
  if (lang === DEFAULT_LOCALE) {
    const { translations: _translations, ...localizedService } = service;
    return {
      ...localizedService,
      seoUrl: localizeServiceUrl(localizedService.seoUrl, lang, localizedService.slug),
    };
  }

  const translation = service.translations?.[lang];
  const { translations: _translations, ...baseService } = service;

  return {
    ...baseService,
    ...translation,
    slug: baseService.slug,
    seoRobots: baseService.seoRobots,
    footerOrder: baseService.footerOrder,
    order: baseService.order,
    seoUrl: localizeServiceUrl(translation?.seoUrl || baseService.seoUrl, lang, baseService.slug),
  };
}

export function localizeServiceEntry(service: ServiceEntry, lang: Locale): ServiceEntry {
  return {
    ...service,
    data: localizeServiceData(service.data, lang) as ServiceEntry['data'],
  };
}

export async function getServiceSummaries(lang: Locale = DEFAULT_LOCALE): Promise<ServiceSummary[]> {
  const services = await getServices();

  return services.map((service) => {
    const localizedService = localizeServiceData(service.data, lang);

    return {
      entry: service,
      slug: localizedService.slug,
      url: localizedService.seoUrl,
      title: localizedService.shortName || localizedService.h1,
      shortName: localizedService.shortName,
      seoTitle: localizedService.seoTitle,
      seoDescription: localizedService.seoDescription,
      seoRobots: localizedService.seoRobots,
    };
  });
}

export async function getFooterServiceLinks(lang: Locale = DEFAULT_LOCALE): Promise<FooterServiceLink[]> {
  const services = await getServices();

  return [...services]
    .sort((a, b) => {
      const aOrder = a.data.footerOrder ?? a.data.order ?? 0;
      const bOrder = b.data.footerOrder ?? b.data.order ?? 0;
      return aOrder - bOrder;
    })
    .map((service) => {
      const localizedService = localizeServiceData(service.data, lang);

      return {
        label: localizedService.footerTitle || localizedService.shortName || localizedService.h1,
        url: localizedService.seoUrl,
      };
    });
}
