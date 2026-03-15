import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SUPPORTED_LOCALES, type Locale } from '../../../i18n';
import { getLocalizedPosts } from '../../../lib/content/blog';

export function getStaticPaths() {
  return SUPPORTED_LOCALES.map((lang) => ({
    params: { lang },
  }));
}

export const prerender = true;

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const posts = await getLocalizedPosts(lang);

  const siteUrl = (context.site?.toString() || 'https://hordeagence.com').replace(/\/$/, '');

  return rss({
    title: lang === 'fr' ? 'Blog Horde - Agence Web UX Bruxelles' : 'Horde Blog - Brussels UX Web Agency',
    description: lang === 'fr'
      ? 'Articles et conseils sur le développement web, l\'UX design et les performances par Horde, agence digitale à Bruxelles.'
      : 'Articles and tips on web development, UX design and performance by Horde, digital agency in Brussels.',
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      pubDate: new Date(post.publishedDate),
      link: `/${lang}/blog/${post.slug}/`,
    })),
    customData: `<language>${lang === 'fr' ? 'fr-BE' : 'en-US'}</language>`,
  });
}
