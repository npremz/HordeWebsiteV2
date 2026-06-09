import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SUPPORTED_LOCALES, type Locale, useTranslations } from '../../../i18n';
import { getLocalizedPosts } from '../../../lib/content/blog';

export function getStaticPaths() {
  return SUPPORTED_LOCALES.map((lang) => ({
    params: { lang },
  }));
}

export const prerender = true;

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const t = useTranslations(lang);
  const posts = await getLocalizedPosts(lang);

  const siteUrl = (context.site?.toString() || 'https://hordeagence.com').replace(/\/$/, '');

  return rss({
    title: t.blogPage.rssTitle,
    description: t.blogPage.rssDescription,
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
