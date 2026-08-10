import fs from "node:fs/promises";
import path from "node:path";

const buildRoot = path.join(process.cwd(), "dist", "client");
const errors = [];

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(entryPath) : entryPath;
    }),
  );

  return files.flat();
}

function countMatches(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

function assertSingleTag(html, pattern, label, relativePath) {
  const count = countMatches(html, pattern);
  if (count !== 1) {
    errors.push(`${relativePath}: expected one ${label}, found ${count}`);
  }
}

function isLocalizedPageUrl(url) {
  let pathname;

  try {
    const parsedUrl = new URL(url, "https://hordeagence.com");
    if (parsedUrl.origin !== "https://hordeagence.com") return false;
    pathname = parsedUrl.pathname;
  } catch {
    return false;
  }

  return /^\/(fr|en)(\/|$)/.test(pathname) && !/\/[^/]+\.[^/]+$/.test(pathname);
}

function assertCanonicalInternalLinks(html, relativePath) {
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => match[1]);

  for (const href of hrefs) {
    if (/^\/(fr|en)\/blog\/tag\//.test(href)) {
      errors.push(`${relativePath}: obsolete blog tag link found: ${href}`);
    }

    if (!isLocalizedPageUrl(href)) continue;

    const pathname = new URL(href, "https://hordeagence.com").pathname;
    if (!pathname.endsWith("/")) {
      errors.push(`${relativePath}: internal link must use its trailing-slash canonical: ${href}`);
    }
  }
}

const files = await listFiles(buildRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const obsoleteTagPages = htmlFiles.filter((file) =>
  /(^|\/)(fr|en)\/blog\/tag\//.test(path.relative(buildRoot, file)),
);

if (obsoleteTagPages.length > 0) {
  errors.push(`obsolete blog tag pages found: ${obsoleteTagPages.join(", ")}`);
}

for (const file of htmlFiles) {
  const relativePath = path.relative(buildRoot, file);
  if (!/^(fr|en)\//.test(relativePath)) continue;

  const html = await fs.readFile(file, "utf8");
  assertSingleTag(html, /<title>[^<]+<\/title>/g, "title", relativePath);
  assertSingleTag(html, /<meta name="description" content="[^"]+">/g, "meta description", relativePath);
  assertSingleTag(html, /<link rel="canonical" href="[^"]+">/g, "canonical", relativePath);
  assertCanonicalInternalLinks(html, relativePath);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  if (canonical && isLocalizedPageUrl(canonical) && !new URL(canonical).pathname.endsWith("/")) {
    errors.push(`${relativePath}: canonical must end with a trailing slash: ${canonical}`);
  }

  if (!relativePath.endsWith("404/index.html")) {
    for (const hreflang of ["fr-BE", "en-US", "x-default"]) {
      const pattern = new RegExp(`<link rel="alternate" hreflang="${hreflang}" href="[^"]+">`, "g");
      assertSingleTag(html, pattern, `hreflang ${hreflang}`, relativePath);
    }
  }
}

for (const sitemapFile of files.filter((file) => /sitemap.*\.xml$/.test(file))) {
  const sitemap = await fs.readFile(sitemapFile, "utf8");
  const relativePath = path.relative(buildRoot, sitemapFile);
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  for (const location of locations) {
    if (!isLocalizedPageUrl(location)) continue;
    if (!new URL(location).pathname.endsWith("/")) {
      errors.push(`${relativePath}: sitemap URL must end with a trailing slash: ${location}`);
    }
  }
}

for (const requiredFile of [
  "sitemap-index.xml",
  path.join("fr", "blog", "rss.xml"),
  path.join("en", "blog", "rss.xml"),
]) {
  try {
    await fs.access(path.join(buildRoot, requiredFile));
  } catch {
    errors.push(`missing ${requiredFile}`);
  }
}

const forbiddenFiles = files.filter((file) => /keystatic|markdoc/i.test(file));
if (forbiddenFiles.length > 0) {
  errors.push(`obsolete CMS assets found: ${forbiddenFiles.join(", ")}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`SEO build check passed for ${htmlFiles.length} HTML pages.`);
