import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../../i18n';

export type PostEntry = CollectionEntry<'posts'>;
export type AuthorEntry = CollectionEntry<'authors'>;
export type CategoryEntry = CollectionEntry<'categories'>;

export interface LocalizedAuthor {
  entry: AuthorEntry;
  slug: string;
  name: string;
  role: string;
  bio?: string;
  avatar: AuthorEntry['data']['avatar'];
  social: NonNullable<AuthorEntry['data']['social']>;
}

export interface LocalizedCategory {
  entry: CategoryEntry;
  baseSlug: string;
  slug: string;
  name: string;
  description?: string;
  color?: string;
}

export interface LocalizedPost {
  entry: PostEntry;
  slug: string;
  alternateSlug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  seoDescription: string;
  featuredImage: PostEntry['data']['featuredImage'];
  featuredImageAlt: string;
  listingImage: PostEntry['data']['featuredImage'];
  listingImageAlt: string;
  publishedDate: Date;
  modifiedDate?: Date;
  readingTime: number;
  featured: boolean;
  seoRobots: 'index, follow' | 'noindex, follow' | 'noindex, nofollow';
  ogImage?: string;
  keyTakeaways: string[];
  authorSlug: string;
  authorName: string;
  authorRole?: string;
  authorBio?: string;
  authorAvatar?: AuthorEntry['data']['avatar'];
  authorSocial?: NonNullable<AuthorEntry['data']['social']>;
  categorySlug: string;
  categoryName: string;
}

type LocalizedAuthorMap = Map<string, LocalizedAuthor>;
type LocalizedCategoryMap = Map<string, LocalizedCategory>;

let postsPromise: Promise<PostEntry[]> | undefined;
let authorsPromise: Promise<AuthorEntry[]> | undefined;
let categoriesPromise: Promise<CategoryEntry[]> | undefined;
const postContentModules = import.meta.glob('../../content/posts/*/content_*.mdx', {
  query: '?raw',
  import: 'default',
});

export function isBlogPreviewEnabled(): boolean {
  if (import.meta.env.SITE_ENV === 'production') return false;
  const setting = String(import.meta.env.BLOG_PREVIEW_UNPUBLISHED || '');
  return setting === '1' || (setting !== '0' && import.meta.env.SITE_ENV === 'staging');
}

/** Nombre d'articles par page sur le blog et les pages catégorie. */
export const BLOG_PAGE_SIZE = 10;

export interface BlogPageSlice<T> {
  items: T[];
  page: number;
  totalPages: number;
}

/** Découpe une liste triée en pages de BLOG_PAGE_SIZE (toujours au moins une page). */
export function paginateBlogPosts<T>(posts: T[], page: number): BlogPageSlice<T> {
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  const start = (page - 1) * BLOG_PAGE_SIZE;
  return { items: posts.slice(start, start + BLOG_PAGE_SIZE), page, totalPages };
}

/** Numéros des pages 2..N (la page 1 reste l'URL de base, sans /page/1/). */
export function getExtraPageNumbers(postCount: number): number[] {
  const totalPages = Math.max(1, Math.ceil(postCount / BLOG_PAGE_SIZE));
  return Array.from({ length: totalPages - 1 }, (_, index) => index + 2);
}

function withPage(baseHref: string, page: number): string {
  return page > 1 ? `${baseHref}page/${page}/` : baseHref;
}

export function getBlogIndexHref(lang: Locale, page = 1): string {
  return withPage(`/${lang}/blog/`, page);
}

export function getBlogPostHref(slug: string, lang: Locale): string {
  return `/${lang}/blog/${slug}/`;
}

export function getBlogCategoryHref(slug: string, lang: Locale, page = 1): string {
  return withPage(`/${lang}/blog/category/${slug}/`, page);
}

export function isPostPublished(post: PostEntry, now = new Date()): boolean {
  return !post.data.draft && post.data.publishedDate.getTime() <= now.getTime();
}

function normalizeSeoRobots(
  value?: string,
): 'index, follow' | 'noindex, follow' | 'noindex, nofollow' {
  if (value === 'noindex, follow' || value === 'noindex, nofollow') {
    return value;
  }

  return 'index, follow';
}

export async function getPosts(): Promise<PostEntry[]> {
  postsPromise ??= getCollection('posts');
  return postsPromise;
}

export async function getAuthors(): Promise<AuthorEntry[]> {
  authorsPromise ??= getCollection('authors');
  return authorsPromise;
}

export async function getCategories(): Promise<CategoryEntry[]> {
  categoriesPromise ??= getCollection('categories');
  return categoriesPromise;
}

export function localizeAuthor(author: AuthorEntry, lang: Locale): LocalizedAuthor {
  return {
    entry: author,
    slug: author.data.slug,
    name: author.data.name,
    role: lang === 'fr' ? author.data.role_fr : author.data.role_en,
    bio: lang === 'fr' ? author.data.bio_fr : author.data.bio_en,
    avatar: author.data.avatar,
    social: author.data.social || {},
  };
}

export function localizeCategory(category: CategoryEntry, lang: Locale): LocalizedCategory {
  return {
    entry: category,
    baseSlug: category.data.slug,
    slug: lang === 'en' ? category.data.slug_en || category.data.slug : category.data.slug,
    name: lang === 'fr' ? category.data.name_fr : category.data.name_en,
    description: lang === 'fr' ? category.data.description_fr : category.data.description_en,
    color: category.data.color,
  };
}

function getListingImage(post: PostEntry) {
  return post.data.thumbnailImage || post.data.featuredImage;
}

function getListingImageAlt(post: PostEntry, lang: Locale) {
  const thumbnailAlt = lang === 'fr' ? post.data.thumbnailImageAlt_fr : post.data.thumbnailImageAlt_en;
  const featuredAlt = lang === 'fr' ? post.data.featuredImageAlt_fr : post.data.featuredImageAlt_en;
  return post.data.thumbnailImage ? thumbnailAlt || featuredAlt : featuredAlt;
}

export function localizePost(
  post: PostEntry,
  lang: Locale,
  options?: {
    authorMap?: LocalizedAuthorMap;
    categoryMap?: LocalizedCategoryMap;
  },
): LocalizedPost {
  const author = options?.authorMap?.get(post.data.author);
  const category = options?.categoryMap?.get(post.data.category);

  return {
    entry: post,
    slug: lang === 'fr' ? post.data.slug_fr : post.data.slug,
    alternateSlug: lang === 'fr' ? post.data.slug : post.data.slug_fr,
    title: lang === 'fr' ? post.data.title_fr : post.data.title_en,
    seoTitle: lang === 'fr' ? post.data.seoTitle_fr : post.data.seoTitle_en,
    excerpt: lang === 'fr' ? post.data.excerpt_fr : post.data.excerpt_en,
    seoDescription: lang === 'fr' ? post.data.seoDescription_fr : post.data.seoDescription_en,
    featuredImage: post.data.featuredImage,
    featuredImageAlt: lang === 'fr' ? post.data.featuredImageAlt_fr : post.data.featuredImageAlt_en,
    listingImage: getListingImage(post),
    listingImageAlt: getListingImageAlt(post, lang),
    publishedDate: post.data.publishedDate,
    modifiedDate: post.data.modifiedDate,
    readingTime: post.data.readingTime || 5,
    featured: post.data.featured,
    seoRobots: normalizeSeoRobots(post.data.seoRobots),
    ogImage: post.data.ogImage,
    keyTakeaways: lang === 'fr' ? post.data.keyTakeaways_fr || [] : post.data.keyTakeaways_en || [],
    authorSlug: post.data.author,
    authorName: author?.name || 'Horde',
    authorRole: author?.role,
    authorBio: author?.bio,
    authorAvatar: author?.avatar,
    authorSocial: author?.social,
    categorySlug: post.data.category,
    categoryName: category?.name || '',
  };
}

export async function getLocalizedAuthors(lang: Locale): Promise<LocalizedAuthor[]> {
  const authors = await getAuthors();
  return authors.map((author) => localizeAuthor(author, lang));
}

export async function getLocalizedCategories(lang: Locale): Promise<LocalizedCategory[]> {
  const categories = await getCategories();
  return categories.map((category) => localizeCategory(category, lang));
}

export async function getLocalizedPosts(
  lang: Locale,
  options?: {
    includeUnpublished?: boolean;
  },
): Promise<LocalizedPost[]> {
  const includeUnpublished = options?.includeUnpublished ?? false;
  const [posts, authors, categories] = await Promise.all([
    getPosts(),
    getLocalizedAuthors(lang),
    getLocalizedCategories(lang),
  ]);
  const authorMap = new Map(authors.map((author) => [author.slug, author]));
  const categoryMap = new Map<string, LocalizedCategory>();
  categories.forEach((category) => {
    categoryMap.set(category.slug, category);
    categoryMap.set(category.baseSlug, category);
  });

  return posts
    .filter((post) => includeUnpublished || isPostPublished(post))
    .sort((a, b) => new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime())
    .map((post) => localizePost(post, lang, { authorMap, categoryMap }));
}

export async function getLocalizedPostsByCategory(
  categorySlug: string,
  lang: Locale,
  options?: {
    includeUnpublished?: boolean;
  },
): Promise<LocalizedPost[]> {
  const posts = await getLocalizedPosts(lang, options);
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export async function getLocalizedAuthorPosts(
  authorSlug: string,
  lang: Locale,
): Promise<LocalizedPost[]> {
  const posts = await getLocalizedPosts(lang);
  return posts.filter((post) => post.authorSlug === authorSlug);
}

export async function getLocalizedPostContent(postSlug: string, lang: Locale): Promise<string> {
  const contentPath = `../../content/posts/${postSlug}/content_${lang}.mdx`;
  const loader = postContentModules[contentPath];

  if (!loader) {
    return '';
  }

  return (await loader()) as string;
}
