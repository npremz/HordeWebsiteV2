import type { APIRoute, GetStaticPaths } from 'astro';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

/**
 * IndexNow Key Verification Endpoint
 *
 * Ce fichier génère dynamiquement l'endpoint de vérification IndexNow.
 * IndexNow permet de notifier instantanément Bing, Yandex et DuckDuckGo
 * quand du contenu est publié ou modifié.
 *
 * Usage:
 * 1. Générez une clé unique (UUID recommandé)
 * 2. Ajoutez-la dans Keystatic > Paramètres du site > Clé IndexNow
 * 3. Le fichier /{votre-clé}.txt sera automatiquement créé
 *
 * Pour soumettre des URLs après déploiement:
 * curl "https://api.indexnow.org/indexnow?url=https://votresite.com/nouvelle-page&key=votre-cle"
 */

// Récupère la clé IndexNow depuis Keystatic
async function getIndexNowKey(): Promise<string | null> {
  try {
    const reader = createReader(process.cwd(), keystaticConfig);
    const settings = await reader.singletons.siteSettings_fr?.read();
    return (settings as any)?.indexNowKey || null;
  } catch {
    return null;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const key = await getIndexNowKey();

  if (!key) {
    return [];
  }

  return [
    { params: { indexnow: key } }
  ];
};

export const GET: APIRoute = async ({ params }) => {
  const key = params.indexnow;

  return new Response(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
