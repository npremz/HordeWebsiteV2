import type { APIRoute } from 'astro';

/**
 * Robots.txt optimisé pour SEO multi-moteurs
 *
 * Ce fichier génère un robots.txt avec des règles spécifiques pour
 * les différents crawlers de moteurs de recherche.
 *
 * Crawlers supportés:
 * - Googlebot (Google)
 * - Bingbot (Bing, Yahoo, DuckDuckGo, Ecosia)
 * - YandexBot (Yandex)
 * - Applebot (Apple/Siri)
 * - DuckDuckBot (DuckDuckGo direct)
 * - facebookexternalhit (Facebook)
 * - LinkedInBot (LinkedIn)
 */

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('/sitemap-index.xml', site).href;

  // Chemins à bloquer pour tous les crawlers
  const disallowPaths = [
    '/keystatic',     // Admin CMS
    '/api/',          // Endpoints API internes
    '/_astro/',       // Assets Astro (pas utile pour SEO)
    '/*.json',        // Fichiers JSON
  ];

  const disallowRules = disallowPaths.map(path => `Disallow: ${path}`).join('\n');

  const robotsTxt = `# Robots.txt - SEO Multi-moteurs
# Généré automatiquement par Astro

# ═══════════════════════════════════════════════════════════════
# RÈGLES GLOBALES (tous les crawlers)
# ═══════════════════════════════════════════════════════════════
User-agent: *
Allow: /
${disallowRules}

# ═══════════════════════════════════════════════════════════════
# GOOGLE
# ═══════════════════════════════════════════════════════════════
User-agent: Googlebot
Allow: /
${disallowRules}

User-agent: Googlebot-Image
Allow: /images/
Disallow: /keystatic

# ═══════════════════════════════════════════════════════════════
# BING / YAHOO / DUCKDUCKGO / ECOSIA
# ═══════════════════════════════════════════════════════════════
User-agent: Bingbot
Allow: /
${disallowRules}

User-agent: msnbot
Allow: /
${disallowRules}

User-agent: DuckDuckBot
Allow: /
${disallowRules}

# ═══════════════════════════════════════════════════════════════
# YANDEX
# ═══════════════════════════════════════════════════════════════
User-agent: YandexBot
Allow: /
${disallowRules}

User-agent: YandexImages
Allow: /images/
Disallow: /keystatic

# ═══════════════════════════════════════════════════════════════
# RÉSEAUX SOCIAUX (pour les previews)
# ═══════════════════════════════════════════════════════════════
User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Twitterbot
Allow: /

# ═══════════════════════════════════════════════════════════════
# AUTRES
# ═══════════════════════════════════════════════════════════════
User-agent: Applebot
Allow: /
${disallowRules}

# ═══════════════════════════════════════════════════════════════
# SITEMAPS
# ═══════════════════════════════════════════════════════════════
Sitemap: ${sitemapURL}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

