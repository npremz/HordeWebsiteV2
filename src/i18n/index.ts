import { fr } from './translations/fr';
import { en } from './translations/en';
import { DEFAULT_LOCALE, type Locale } from './config';

const translations = { fr, en } as const;

export function useTranslations(locale: Locale) {
  return translations[locale] ?? translations[DEFAULT_LOCALE];
}

export * from './config';
export * from './utils';
export type { Translations } from './translations/fr';
