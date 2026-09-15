import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';

// Run after a build with the same SITE_ENV, preview flag and clock.
const root = process.cwd();
const output = path.join(root, 'dist/client');
const production = process.env.SITE_ENV === 'production';
const previewSetting = process.env.BLOG_PREVIEW_UNPUBLISHED || '';
const preview = !production && (previewSetting === '1' || (previewSetting !== '0' && process.env.SITE_ENV === 'staging'));
const origin = production ? 'https://hordeagence.com' : (process.env.PUBLIC_SITE_URL || 'https://waf.hordagency.com').replace(/\/$/, '');
const now = Date.now();
const entries = [];
for (const filename of await fs.readdir(path.join(root, 'src/content/posts'))) {
  if (!filename.endsWith('.yaml')) continue;
  entries.push(yaml.load(await fs.readFile(path.join(root, 'src/content/posts', filename), 'utf8')));
}
async function exists(filename) {
  try { await fs.access(filename); return true; } catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}
async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? filesIn(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const files = await filesIn(output);
const sitemap = (await Promise.all(files.filter((file) => /sitemap.*\.xml$/.test(file)).map((file) => fs.readFile(file, 'utf8')))).join('\n');
const hiddenPaths = [];
let routes = 0;
for (const lang of ['fr', 'en']) {
  const rss = await fs.readFile(path.join(output, lang, 'blog/rss.xml'), 'utf8');
  for (const entry of entries) {
    const href = `/${lang}/blog/${lang === 'fr' ? entry.slug_fr : entry.slug}/`;
    const published = !entry.draft && new Date(entry.publishedDate).getTime() <= now;
    const visible = published || preview;
    const filename = path.join(output, href, 'index.html');
    assert.equal(await exists(filename), visible, `Route visibility: ${href}`);
    assert.equal(sitemap.includes(`<loc>${origin}${href}</loc>`), visible && entry.seoRobots === 'index, follow', `Sitemap visibility: ${href}`);
    // Feeds intentionally contain published articles only, even on staging.
    assert.equal(rss.includes(`<link>${origin}${href}</link>`), published && entry.seoRobots === 'index, follow', `RSS visibility: ${href}`);
    if (!visible) { hiddenPaths.push(href); continue; }
    const html = await fs.readFile(filename, 'utf8');
    assert(!html.includes('data-blog-workshop'), `No automatic workshop: ${href}`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `Single H1: ${href}`);
    assert(html.includes(`<link rel="canonical" href="${origin}${href}">`), `Canonical: ${href}`);
    const robots = production ? entry.seoRobots : 'noindex, nofollow';
    assert(html.includes(`<meta name="robots" content="${robots}">`), `Robots: ${href}`);
    for (const type of ['BlogPosting', 'Person', 'Organization', 'BreadcrumbList']) assert(html.includes(`"@type":"${type}"`), `Schema ${type}: ${href}`);
    routes++;
  }
}
if (hiddenPaths.length) {
  for (const filename of files.filter((file) => file.endsWith('.html'))) {
    const html = await fs.readFile(filename, 'utf8');
    for (const href of hiddenPaths) assert(!html.includes(`href="${href}"`) && !html.includes(`href="${origin}${href}"`), `Premature internal link in ${filename}: ${href}`);
  }
}
console.log(`Blog scheduling passed: ${routes} visible routes, ${hiddenPaths.length} absent routes, preview=${preview}, clock=${new Date(now).toISOString()}.`);
