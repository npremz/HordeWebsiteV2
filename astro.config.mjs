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
    sitemap()
  ],
  prefetch: true,
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
