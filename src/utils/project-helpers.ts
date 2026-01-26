import type { Locale } from '../i18n';

/**
 * Génère l'alt par défaut pour une image de projet
 */
export function getDefaultProjectAlt(projectName: string, lang: Locale): string {
  return lang === 'fr'
    ? `${projectName} - Horde, agence web UX Bruxelles`
    : `${projectName} - Horde, Brussels UX web agency`;
}

/**
 * Retourne l'alt personnalisé ou le alt par défaut
 */
export function getProjectImageAlt(
  customAlt: string | undefined,
  projectName: string,
  lang: Locale
): string {
  return customAlt || getDefaultProjectAlt(projectName, lang);
}
