// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import preact from '@astrojs/preact';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

const PORT = parseInt(process.env.PORT || '4328', 10);

// Production = hordeagence.com (mode server pour Keystatic GitHub)
// Staging/Dev = static
const isProd = process.env.SITE_ENV === 'production';
const redirectSourcePaths = new Set([
  '/',
  '/about',
  '/blog',
  '/contact',
  '/confidentialite',
  '/cookies',
  '/mentions-legales',
  '/projets',
]);

function shouldIncludeInSitemap(page) {
  try {
    const normalizedPath = new URL(page).pathname.replace(/\/$/, '') || '/';
    if (redirectSourcePaths.has(normalizedPath)) return false;
    if (/^\/[a-z]{2}\/404$/.test(normalizedPath)) return false;
    if (/^\/(fr|en)\/(cookies|mentions-legales|confidentialite)$/.test(normalizedPath)) return false;
    return true;
  } catch {
    return true;
  }
}

// https://astro.build/config
export default defineConfig({
  site: isProd ? 'https://hordeagence.com' : 'https://waf.hordagency.com',
  // Astro 5: 'hybrid' n'existe plus. Utiliser 'server' + prerender: true sur les pages statiques
  output: isProd ? 'server' : 'static',
  adapter: node({ mode: 'standalone' }),
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    host: '0.0.0.0',
    port: PORT
  },
  integrations: [
    react({ include: ['**/keystatic/**'] }),
    preact({ include: ['**/components/**/*.tsx'] }),
    markdoc(),
    keystatic(),
    sitemap({
      filter: shouldIncludeInSitemap,
    })
  ],
  prefetch: true,
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keystatic admin bundle is intentionally large and route-scoped.
      chunkSizeWarningLimit: 3000,
    },
  },
});
