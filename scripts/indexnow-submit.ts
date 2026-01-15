#!/usr/bin/env npx tsx
/**
 * IndexNow URL Submission Script
 *
 * Ce script soumet automatiquement toutes les URLs du sitemap aux moteurs
 * de recherche via le protocole IndexNow.
 *
 * Moteurs supportés:
 * - Bing (+ DuckDuckGo, Ecosia, Yahoo qui utilisent l'index Bing)
 * - Yandex
 *
 * Usage:
 *   npx tsx scripts/indexnow-submit.ts
 *
 * Ou ajoutez à package.json:
 *   "scripts": {
 *     "indexnow": "tsx scripts/indexnow-submit.ts"
 *   }
 *
 * Variables d'environnement (optionnel):
 *   SITE_URL - URL du site (sinon lit astro.config.mjs)
 *   INDEXNOW_KEY - Clé IndexNow (sinon lit Keystatic)
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Configuration
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow', // Microsoft (Bing, DuckDuckGo, Ecosia)
  'https://yandex.com/indexnow',       // Yandex
];

const MAX_URLS_PER_REQUEST = 10000;
const DIST_DIR = join(process.cwd(), 'dist');
const SITEMAP_PATH = join(DIST_DIR, 'sitemap-index.xml');

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

async function getSiteUrl(): Promise<string> {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  // Try to read from astro.config.mjs
  const configPath = join(process.cwd(), 'astro.config.mjs');
  if (existsSync(configPath)) {
    const config = readFileSync(configPath, 'utf-8');
    const match = config.match(/site:\s*['"]([^'"]+)['"]/);
    if (match) {
      return match[1];
    }
  }

  throw new Error('SITE_URL not found. Set SITE_URL env or configure site in astro.config.mjs');
}

async function getIndexNowKey(): Promise<string> {
  if (process.env.INDEXNOW_KEY) {
    return process.env.INDEXNOW_KEY;
  }

  // Try to read from Keystatic settings
  const settingsPath = join(process.cwd(), 'src/content/settings_fr/site.yaml');
  if (existsSync(settingsPath)) {
    const settings = readFileSync(settingsPath, 'utf-8');
    const match = settings.match(/indexNowKey:\s*['"]?([^'"\n]+)['"]?/);
    if (match) {
      return match[1].trim();
    }
  }

  throw new Error('IndexNow key not found. Set INDEXNOW_KEY env or configure in Keystatic');
}

function extractUrlsFromSitemap(sitemapContent: string): string[] {
  const urls: string[] = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;

  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

async function loadAllUrls(siteUrl: string): Promise<string[]> {
  const allUrls: string[] = [];

  // Check for sitemap-index.xml (Astro generates this)
  if (existsSync(SITEMAP_PATH)) {
    const sitemapIndex = readFileSync(SITEMAP_PATH, 'utf-8');
    const sitemapUrls = extractUrlsFromSitemap(sitemapIndex);

    // If it's an index, load each referenced sitemap
    for (const sitemapUrl of sitemapUrls) {
      const sitemapFile = sitemapUrl.replace(siteUrl, '').replace(/^\//, '');
      const localPath = join(DIST_DIR, sitemapFile);

      if (existsSync(localPath)) {
        const sitemap = readFileSync(localPath, 'utf-8');
        allUrls.push(...extractUrlsFromSitemap(sitemap));
      }
    }

    // If no child sitemaps found, the index itself might contain URLs
    if (allUrls.length === 0) {
      allUrls.push(...sitemapUrls);
    }
  }

  // Also check for sitemap.xml directly
  const directSitemapPath = join(DIST_DIR, 'sitemap.xml');
  if (existsSync(directSitemapPath) && allUrls.length === 0) {
    const sitemap = readFileSync(directSitemapPath, 'utf-8');
    allUrls.push(...extractUrlsFromSitemap(sitemap));
  }

  return [...new Set(allUrls)]; // Remove duplicates
}

async function submitToIndexNow(
  endpoint: string,
  payload: IndexNowPayload
): Promise<{ success: boolean; status: number; message: string }> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: response.ok || response.status === 202,
      status: response.status,
      message: response.statusText,
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function main() {
  console.log('🔍 IndexNow URL Submission\n');

  // Check if dist exists
  if (!existsSync(DIST_DIR)) {
    console.error('❌ Erreur: Le dossier dist/ n\'existe pas.');
    console.error('   Exécutez d\'abord: npm run build');
    process.exit(1);
  }

  // Get configuration
  let siteUrl: string;
  let indexNowKey: string;

  try {
    siteUrl = await getSiteUrl();
    console.log(`📍 Site: ${siteUrl}`);
  } catch (error) {
    console.error(`❌ ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }

  try {
    indexNowKey = await getIndexNowKey();
    console.log(`🔑 Clé IndexNow: ${indexNowKey.slice(0, 8)}...`);
  } catch (error) {
    console.error(`❌ ${error instanceof Error ? error.message : error}`);
    console.error('\n💡 Pour générer une clé, utilisez: npx uuid');
    process.exit(1);
  }

  // Load URLs from sitemap
  const urls = await loadAllUrls(siteUrl);

  if (urls.length === 0) {
    console.error('❌ Aucune URL trouvée dans le sitemap.');
    console.error('   Vérifiez que @astrojs/sitemap est configuré.');
    process.exit(1);
  }

  console.log(`📄 ${urls.length} URLs trouvées\n`);

  // Prepare payload
  const host = new URL(siteUrl).host;
  const payload: IndexNowPayload = {
    host,
    key: indexNowKey,
    keyLocation: `${siteUrl}/${indexNowKey}.txt`,
    urlList: urls.slice(0, MAX_URLS_PER_REQUEST),
  };

  // Submit to each endpoint
  console.log('📤 Soumission aux moteurs de recherche...\n');

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    const engineName = endpoint.includes('yandex') ? 'Yandex' : 'Bing/DuckDuckGo';
    process.stdout.write(`   ${engineName}... `);

    const result = await submitToIndexNow(endpoint, payload);

    if (result.success) {
      console.log(`✅ OK (${result.status})`);
    } else {
      console.log(`⚠️  ${result.status} - ${result.message}`);
    }
  }

  console.log('\n✨ Terminé!');
  console.log('\n💡 Les moteurs de recherche traiteront les URLs sous peu.');
  console.log('   Suivez l\'indexation dans Bing Webmaster Tools et Yandex Webmaster.');
}

main().catch(console.error);
