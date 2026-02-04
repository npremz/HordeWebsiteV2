import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SUPPORTED_LOCALES, type Locale } from '../../../i18n';

export function getStaticPaths() {
  return SUPPORTED_LOCALES.map((lang) => ({
    params: { lang },
  }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const posts = await getCollection('posts');

  const siteUrl = context.site?.toString() || 'https://hordeagency.com';

  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime());

  return rss({
    title: lang === 'fr' ? 'Blog Horde - Agence Web UX Bruxelles' : 'Horde Blog - Brussels UX Web Agency',
    description: lang === 'fr'
      ? 'Articles et conseils sur le développement web, l\'UX design et les performances par Horde, agence digitale à Bruxelles.'
      : 'Articles and tips on web development, UX design and performance by Horde, digital agency in Brussels.',
    site: siteUrl,
    items: publishedPosts.map((post) => ({
      title: lang === 'fr' ? post.data.title_fr : post.data.title_en,
      description: lang === 'fr' ? post.data.excerpt_fr : post.data.excerpt_en,
      pubDate: new Date(post.data.publishedDate),
      link: `/${lang}/blog/${post.data.slug}/`,
    })),
    customData: `<language>${lang === 'fr' ? 'fr-FR' : 'en-US'}</language>`,
  });
}
