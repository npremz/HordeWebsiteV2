import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale, isValidLocale } from './config';

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (isValidLocale(lang)) {
    return lang;
  }
  return DEFAULT_LOCALE;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return '/' + segments.slice(1).join('/') || '/';
  }
  return pathname;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = getPathWithoutLocale(path);
  if (cleanPath === '/') {
    return `/${locale}`;
  }
  return `/${locale}${cleanPath}`;
}

export function getAlternateUrls(
  currentPath: string,
  siteUrl: string
): Record<Locale, string> {
  const path = getPathWithoutLocale(currentPath);
  const baseUrl = siteUrl.replace(/\/$/, '');

  return SUPPORTED_LOCALES.reduce(
    (acc, locale) => {
      const localizedPath = path === '/' ? `/${locale}` : `/${locale}${path}`;
      acc[locale] = `${baseUrl}${localizedPath}`;
      return acc;
    },
    {} as Record<Locale, string>
  );
}
