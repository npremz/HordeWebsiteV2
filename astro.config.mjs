// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

const PORT = parseInt(process.env.PORT || '4328', 10);

// Production = hordeagence.com (mode server pour Keystatic GitHub)
// Staging/Dev = static
const isProd = process.env.SITE_ENV === 'production';
const enableKeystatic = isProd || process.env.ENABLE_KEYSTATIC === '1';
const siteUrl = (process.env.PUBLIC_SITE_URL || (isProd ? 'https://hordeagence.com' : 'https://waf.hordagency.com')).replace(/\/$/, '');

if (isProd && siteUrl !== 'https://hordeagence.com') {
  throw new Error(`Production builds must use https://hordeagence.com as site URL. Received: ${siteUrl}`);
}

const redirectSourcePaths = new Set([
  '/',
  '/about',
  '/blog',
  '/contact',
  '/confidentialite',
  '/cookies',
  '/mentions-legales',
  '/projets',
  '/services',
]);

const noindexSitemapPaths = new Set([
  '/en/blog/category/performance-web',
  '/en/blog/category/ux-design',
  '/en/projets/audit-offert',
  '/en/projets/creation-ecommerce',
  '/en/projets/creation-landing-page',
  '/en/projets/creation-site-vitrine',
  '/en/projets/creation-mvp-saas',
  '/en/projets/optimisation-site-web',
  '/en/projets/refonte-site-web',
  '/fr/blog/category/performance-web',
  '/fr/blog/category/ux-design',
  '/fr/projets/audit-offert',
  '/fr/projets/creation-ecommerce',
  '/fr/projets/creation-landing-page',
  '/fr/projets/creation-site-vitrine',
  '/fr/projets/creation-mvp-saas',
  '/fr/projets/optimisation-site-web',
  '/fr/projets/refonte-site-web',
]);

/**
 * @param {string} page
 */
function shouldIncludeInSitemap(page) {
  try {
    const normalizedPath = new URL(page).pathname.replace(/\/$/, '') || '/';
    if (redirectSourcePaths.has(normalizedPath)) return false;
    if (/^\/[a-z]{2}\/404$/.test(normalizedPath)) return false;
    if (/^\/(fr|en)\/(cookies|mentions-legales|confidentialite)$/.test(normalizedPath)) return false;
    if (/^\/(fr|en)\/blog\/tag\//.test(normalizedPath)) return false;
    if (noindexSitemapPaths.has(normalizedPath)) return false;
    return true;
  } catch {
    return true;
  }
}

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  redirects: {
    '/fr/services/audit-offert': {
      status: 301,
      destination: '/fr/services/audit-seo-technique-bruxelles',
    },
    '/en/services/audit-offert': {
      status: 301,
      destination: '/en/services/technical-seo-audit-brussels',
    },
    '/fr/services/refonte-site-web': {
      status: 301,
      destination: '/fr/services/refonte-site-web-bruxelles',
    },
    '/en/services/refonte-site-web': {
      status: 301,
      destination: '/en/services/website-redesign-brussels',
    },
    '/fr/services/creation-mvp-saas': {
      status: 301,
      destination: '/fr/services/developpement-mvp-bruxelles',
    },
    '/en/services/creation-mvp-saas': {
      status: 301,
      destination: '/en/services/mvp-development-brussels',
    },
    '/fr/services/creation-site-web': {
      status: 301,
      destination: '/fr/services/creation-site-vitrine-bruxelles',
    },
    '/en/services/website-creation': {
      status: 301,
      destination: '/en/services/showcase-website-brussels',
    },
  },
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
    react({ include: ['**/keystatic/**', '**/components/**/*.tsx'] }),
    markdoc(),
    ...(enableKeystatic ? [keystatic()] : []),
    sitemap({
      filter: shouldIncludeInSitemap,
    })
  ],
  prefetch: true,
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'matter-js',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      esbuildOptions: {
        define: {
          'process.env.NODE_ENV': '"development"',
        },
      },
    },
    server: {
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        clientPort: PORT,
      },
    },
    build: {
      reportCompressedSize: false,
      // Keystatic admin bundle is intentionally large and route-scoped.
      chunkSizeWarningLimit: 3000,
    },
  },
});
