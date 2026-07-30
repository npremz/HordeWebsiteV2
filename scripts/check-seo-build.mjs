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

const files = await listFiles(buildRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const relativePath = path.relative(buildRoot, file);
  if (!/^(fr|en)\//.test(relativePath)) continue;

  const html = await fs.readFile(file, "utf8");
  assertSingleTag(html, /<title>[^<]+<\/title>/g, "title", relativePath);
  assertSingleTag(html, /<meta name="description" content="[^"]+">/g, "meta description", relativePath);
  assertSingleTag(html, /<link rel="canonical" href="[^"]+">/g, "canonical", relativePath);

  if (!relativePath.endsWith("404/index.html")) {
    for (const hreflang of ["fr-BE", "en-US", "x-default"]) {
      const pattern = new RegExp(`<link rel="alternate" hreflang="${hreflang}" href="[^"]+">`, "g");
      assertSingleTag(html, pattern, `hreflang ${hreflang}`, relativePath);
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
