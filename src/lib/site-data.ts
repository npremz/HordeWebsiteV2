import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { DEFAULT_LOCALE, type Locale } from "../i18n";

export interface SiteSettingsData {
  siteName: string;
  homepageTitle: string;
  siteUrl: string;
  defaultDescription: string;
  locale: string;
  defaultOgImage: string;
  defaultOgImageAlt: string;
  twitterSite?: string;
}

export interface NavigationItem {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface NavigationData {
  logo?: string;
  logoAlt?: string;
  items: NavigationItem[];
  ctaButton?: {
    label?: string;
    url?: string;
  };
}

export interface FooterColumn {
  title: string;
  links: NavigationItem[];
}

export interface FooterData {
  description?: string;
  columns: FooterColumn[];
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  legalLinks: {
    label: string;
    url: string;
  }[];
  copyright?: string;
}

const reader = createReader(process.cwd(), keystaticConfig);
const singletonCache = new Map<string, Promise<unknown | null>>();

const defaultSiteSettings: SiteSettingsData = {
  siteName: "Horde Agence",
  homepageTitle: "Horde",
  siteUrl: "https://hordeagence.com",
  defaultDescription: "Description par défaut du site",
  locale: "fr_BE",
  defaultOgImage: "/images/og/defaultOgImage.jpg",
  defaultOgImageAlt: "Image par défaut du site",
  twitterSite: "",
};

const defaultNavigation: NavigationData = {
  logo: "/images/logo.svg",
  logoAlt: "Logo",
  items: [],
  ctaButton: undefined,
};

const defaultFooter: FooterData = {
  description: "",
  columns: [],
  socialLinks: [],
  legalLinks: [],
  copyright: "",
};

async function readSingleton<T>(key: string): Promise<T | null> {
  if (!singletonCache.has(key)) {
    singletonCache.set(
      key,
      (async () => {
        try {
          const singleton = reader.singletons[key as keyof typeof reader.singletons];
          return singleton ? await singleton.read() : null;
        } catch {
          return null;
        }
      })(),
    );
  }

  return (await singletonCache.get(key)) as T | null;
}

async function readLocalizedSingleton<T extends object>(
  prefix: "siteSettings" | "navigation" | "footer",
  lang: Locale,
  fallback: T,
): Promise<T> {
  const localized = await readSingleton<Partial<T>>(`${prefix}_${lang}`);
  if (localized) {
    return { ...fallback, ...localized };
  }

  if (lang !== DEFAULT_LOCALE) {
    const defaultLocaleValue = await readSingleton<Partial<T>>(`${prefix}_${DEFAULT_LOCALE}`);
    if (defaultLocaleValue) {
      return { ...fallback, ...defaultLocaleValue };
    }
  }

  return fallback;
}

export async function getSiteSettings(lang: Locale): Promise<SiteSettingsData> {
  return readLocalizedSingleton("siteSettings", lang, defaultSiteSettings);
}

export async function getNavigation(lang: Locale): Promise<NavigationData> {
  return readLocalizedSingleton("navigation", lang, defaultNavigation);
}

export async function getFooter(lang: Locale): Promise<FooterData> {
  return readLocalizedSingleton("footer", lang, defaultFooter);
}

export async function getSiteChrome(lang: Locale): Promise<{
  siteSettings: SiteSettingsData;
  navigation: NavigationData;
  footer: FooterData;
}> {
  const [siteSettings, navigation, footer] = await Promise.all([
    getSiteSettings(lang),
    getNavigation(lang),
    getFooter(lang),
  ]);

  return { siteSettings, navigation, footer };
}
