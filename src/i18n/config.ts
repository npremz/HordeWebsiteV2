export const SUPPORTED_LOCALES = ['fr', 'en'] as const;
export const DEFAULT_LOCALE = 'fr';

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const HTML_LOCALE_CODES: Record<Locale, string> = {
  fr: 'fr-BE',
  en: 'en-US',
};

export const OG_LOCALE_CODES: Record<Locale, string> = {
  fr: 'fr_BE',
  en: 'en_US',
};

export const HREFLANG_LOCALE_CODES: Record<Locale, string> = {
  fr: 'fr-BE',
  en: 'en-US',
};

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'Version Française',
  en: 'English version',
};

export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}
