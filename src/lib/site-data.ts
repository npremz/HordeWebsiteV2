import yaml from "js-yaml";
import { z } from "astro/zod";
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

const navigationItemSchema = z.object({
  label: z.string(),
  url: z.string(),
  isExternal: z.boolean().optional(),
});

const siteSettingsSchema: z.ZodType<SiteSettingsData> = z.object({
  siteName: z.string(),
  homepageTitle: z.string(),
  siteUrl: z.url(),
  defaultDescription: z.string().min(50).max(160),
  locale: z.string(),
  defaultOgImage: z.string(),
  defaultOgImageAlt: z.string(),
  twitterSite: z.string().optional(),
});

const navigationSchema: z.ZodType<NavigationData> = z.object({
  logo: z.string().optional(),
  logoAlt: z.string().optional(),
  items: z.array(navigationItemSchema),
  ctaButton: z.object({
    label: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
});

const footerSchema: z.ZodType<FooterData> = z.object({
  description: z.string().optional(),
  columns: z.array(z.object({
    title: z.string(),
    links: z.array(navigationItemSchema),
  })),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.url(),
  })).optional(),
  legalLinks: z.array(navigationItemSchema),
  copyright: z.string().optional(),
});

const settingsFiles = import.meta.glob<string>(
  [
    "../content/settings_fr/*.yaml",
    "../content/settings_en/*.yaml",
  ],
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
);

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

function readSettingsFile<T extends object>(
  name: "site" | "navigation" | "footer",
  lang: Locale,
  schema: z.ZodType<T>,
): T | null {
  const source = settingsFiles[`../content/settings_${lang}/${name}.yaml`];
  if (!source) return null;

  return schema.parse(yaml.load(source));
}

async function readLocalizedSettings<T extends object>(
  name: "site" | "navigation" | "footer",
  lang: Locale,
  fallback: T,
  schema: z.ZodType<T>,
): Promise<T> {
  const localized = readSettingsFile(name, lang, schema);
  if (localized) {
    return { ...fallback, ...localized };
  }

  if (lang !== DEFAULT_LOCALE) {
    const defaultLocaleValue = readSettingsFile(name, DEFAULT_LOCALE, schema);
    if (defaultLocaleValue) {
      return { ...fallback, ...defaultLocaleValue };
    }
  }

  return fallback;
}

export async function getSiteSettings(lang: Locale): Promise<SiteSettingsData> {
  return readLocalizedSettings("site", lang, defaultSiteSettings, siteSettingsSchema);
}

export async function getNavigation(lang: Locale): Promise<NavigationData> {
  return readLocalizedSettings("navigation", lang, defaultNavigation, navigationSchema);
}

export async function getFooter(lang: Locale): Promise<FooterData> {
  return readLocalizedSettings("footer", lang, defaultFooter, footerSchema);
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
