// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://hordeagence.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    host: '0.0.0.0',
    port: 4328
  },
  integrations: [react(), markdoc(), keystatic(), sitemap()],
  prefetch: true,
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
