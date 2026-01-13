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

// https://astro.build/config
export default defineConfig({
  site: 'https://hordeagence.com',
  output: 'static',
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
