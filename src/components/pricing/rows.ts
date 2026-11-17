import type { Locale } from '../../i18n';
import { getServiceSummaries } from '../../lib/content/services';
import { getPricingCopy } from './copy';
import { formatEuro } from './format';

export interface PricingRow {
  /** « 01 », « 02 »… (affiché dans la fourchette du hero). */
  index: string;
  name: string;
  /** Prix lisible : « €1,999 à €4,000 », « €199 / jour », « Gratuit »… */
  priceText: string;
  /** Version courte pour mobile (« dès €1,999 ») ; sinon identique à priceText. */
  priceShort: string;
  /** Page du service lié. */
  url: string;
  pricing: { from: number; to?: number; unit?: 'day' };
}

/**
 * Lignes de la liste des offres : libellés de la page + prix lus dans les fichiers services
 * (`pricing`), avec les plafonds propres à certaines lignes (refontes).
 */
export async function getPricingRows(lang: Locale): Promise<PricingRow[]> {
  const copy = getPricingCopy(lang);
  const services = await getServiceSummaries(lang);
  const bySlug = new Map(services.map((service) => [service.slug, service]));

  return copy.rows.map((row, index) => {
    const service = bySlug.get(row.service);
    const source = bySlug.get(row.priceFrom ?? row.service);
    const base = source?.entry.data.pricing;
    if (!service || !base) throw new Error(`[pricing] prix manquant pour ${row.priceFrom ?? row.service}`);

    const pricing = { from: base.from, to: row.to ?? base.to, unit: base.unit };
    const euro = formatEuro;
    const priceText =
      pricing.from === 0
        ? copy.price.free
        : pricing.unit === 'day'
          ? `${euro(pricing.from)} / ${copy.price.perDay}`
          : pricing.to
            ? `${euro(pricing.from)} ${copy.price.range} ${euro(pricing.to)}`
            : `${euro(pricing.from)}, ${copy.price.onQuote}`;

    const priceShort =
      pricing.from > 0 && !pricing.unit && !pricing.to ? `${copy.price.fromShort} ${euro(pricing.from)}` : priceText;

    return { index: String(index + 1).padStart(2, '0'), name: row.name, priceText, priceShort, url: service.url, pricing };
  });
}
