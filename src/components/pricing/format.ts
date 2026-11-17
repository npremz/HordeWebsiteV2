/**
 * Formatage des prix de la page prix, partagé entre le rendu serveur et le script du total
 * (aucune dépendance au contenu : importable côté navigateur).
 */

export interface PriceSpec {
  from: number;
  to?: number;
  unit?: 'day';
}

export interface TotalLabels {
  /** « Gratuit » : seule l'offre à 0 € est choisie. */
  free: string;
  /** « jour » dans « €199 / jour ». */
  perDay: string;
  /** « à » dans « €1,999 à €4,000 ». */
  range: string;
  /** « dès » : au moins une offre sans plafond. */
  fromShort: string;
}

/**
 * 1999 → « €1,999 » : format de la maquette (symbole devant, sans espace), dans les deux langues.
 * Seul l'affichage de la page prix l'utilise ; les textes des services gardent « 1 999 € ».
 */
export function formatEuro(value: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Fourchette totale des offres choisies : bas et hauts de fourchette additionnés ; une offre
 * sans plafond donne « Dès … » ; les tarifs à la journée s'ajoutent à part (« + €199 / jour »).
 */
export function formatTotal(items: PriceSpec[], labels: TotalLabels): string {
  const fixed = items.filter((item) => !item.unit);
  const from = fixed.reduce((sum, item) => sum + item.from, 0);
  const to = fixed.reduce((sum, item) => sum + (item.to ?? item.from), 0);
  const openEnded = fixed.some((item) => item.from > 0 && item.to === undefined);
  const daily = items.filter((item) => item.unit === 'day').reduce((sum, item) => sum + item.from, 0);

  const parts: string[] = [];
  if (from > 0) {
    const fromLabel = labels.fromShort.charAt(0).toUpperCase() + labels.fromShort.slice(1);
    parts.push(
      openEnded
        ? `${fromLabel} ${formatEuro(from)}`
        : to > from
          ? `${formatEuro(from)} ${labels.range} ${formatEuro(to)}`
          : formatEuro(from),
    );
  }
  if (daily > 0) parts.push(`${formatEuro(daily)} / ${labels.perDay}`);
  if (parts.length) return parts.join(' + ');
  return items.length ? labels.free : formatEuro(0);
}
