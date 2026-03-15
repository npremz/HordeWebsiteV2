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
  tags: string[];
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

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
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
    slug: category.data.slug,
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
    tags: post.data.tags || [],
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
    includeDrafts?: boolean;
  },
): Promise<LocalizedPost[]> {
  const includeDrafts = options?.includeDrafts ?? false;
  const [posts, authors, categories] = await Promise.all([
    getPosts(),
    getLocalizedAuthors(lang),
    getLocalizedCategories(lang),
  ]);
  const authorMap = new Map(authors.map((author) => [author.slug, author]));
  const categoryMap = new Map(categories.map((category) => [category.slug, category]));

  return posts
    .filter((post) => includeDrafts || !post.data.draft)
    .sort((a, b) => new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime())
    .map((post) => localizePost(post, lang, { authorMap, categoryMap }));
}

export async function getLocalizedPostsByCategory(
  categorySlug: string,
  lang: Locale,
): Promise<LocalizedPost[]> {
  const posts = await getLocalizedPosts(lang);
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export async function getLocalizedPostsByTag(tag: string, lang: Locale): Promise<LocalizedPost[]> {
  const posts = await getLocalizedPosts(lang);
  return posts.filter((post) => post.tags.includes(tag));
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
