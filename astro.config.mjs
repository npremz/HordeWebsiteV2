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
  site: 'https://example.com', // TODO: Remplacer par l'URL du site
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), markdoc(), keystatic(), sitemap()],
  prefetch: true,
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
