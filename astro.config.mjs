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

// Production = hordeagence.com (mode hybrid pour Keystatic GitHub)
// Staging/Dev = static
const isProd = process.env.SITE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: isProd ? 'https://hordeagence.com' : 'https://waf.hordagency.com',
  output: isProd ? 'hybrid' : 'static',
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
