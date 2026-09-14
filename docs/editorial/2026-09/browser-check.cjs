const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

const base = process.env.BLOG_TEST_BASE_URL || 'http://127.0.0.1:4339';
const artifacts = process.env.BLOG_TEST_ARTIFACTS || '/review/artifacts';
const pages = [
  ['direction-artistique-interface-web', 'art-direction-for-web-interfaces'],
  ['design-developpement-web-ensemble', 'design-and-web-development-together'],
  ['analyser-interface-web-sans-copier', 'analyse-web-interface-without-copying'],
  ['brief-design-web-cadrer-experience', 'web-design-brief-before-screens'],
  ['ia-interfaces-experiences-utilisateur', 'ai-can-create-interfaces-not-experiences'],
  ['comment-creer-site-web-qui-se-demarque-2026', 'how-to-make-your-website-stand-out-2026'],
];
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const width of [375, 1440]) {
      for (const lang of ['fr', 'en']) {
        for (const [frSlug, enSlug] of pages) {
          const slug = lang === 'fr' ? frSlug : enSlug;
          const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
          const page = await context.newPage();
          const errors = [];
          const writes = [];
          page.on('pageerror', error => errors.push(error.message));
          page.on('request', request => { if (request.method() !== 'GET' && new URL(request.url()).origin === new URL(base).origin) writes.push(request.url()); });
          const href = '/' + lang + '/blog/' + slug + '/';
          const response = await page.goto(base + href, { waitUntil: 'networkidle' });
          assert.equal(response.status(), 200, slug);
          assert.equal(await page.locator('h1').count(), 1);
          assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
          assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).pathname, href);
          assert.equal(await page.locator('[data-blog-workshop]').count(), 0);
          assert.equal(await page.locator('article form').count(), 0);
          assert(!/Observer · essayer · décider|Observe · try · decide/.test(await page.locator('article').innerText()));
          const figures = page.locator('.article-figure');
          const isPilot = lang === 'fr' && slug === 'analyser-interface-web-sans-copier';
          assert.equal(await figures.count(), isPilot ? 2 : 0);
          if (isPilot) {
            assert.equal((await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim(), 'Comment s’inspirer d’un site web sans le copier');
            assert((await page.locator('.prose > p').first().innerText()).startsWith('Vous préparez'));
            for (const figure of await figures.all()) {
              await figure.scrollIntoViewIfNeeded();
              const img = figure.locator('img');
              await img.evaluate(element => element.decode());
              assert(await img.evaluate(element => element.naturalWidth > 0 && element.complete));
              assert((await img.getAttribute('alt')).length > 30);
              assert((await img.getAttribute('srcset')).includes('480w'));
              assert.equal(await img.getAttribute('loading'), 'lazy');
              assert((await figure.locator('figcaption').innerText()).includes('14 septembre 2026'));
              const fullSize = await context.request.get(new URL(await figure.locator('a').getAttribute('href'), base).href);
              assert.equal(fullSize.status(), 200);
              assert(fullSize.headers()['content-type'].startsWith('image/'));
            }
            await figures.first().scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(artifacts, 'reference-' + width + '.png') });
          }
          assert(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)), 'Horizontal overflow: ' + href);
          const axe = await new AxeBuilder({ page }).include('.prose').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) }))));
          assert.deepEqual(errors, []);
          assert.deepEqual(writes, []);
          results.push({ slug, lang, width, status: 'passed', figures: await figures.count(), axeViolationsInArticleBody: 0 });
          await context.close();
          console.log('PASS ' + width + ' ' + lang + ' ' + slug);
        }
      }
    }
  } finally {
    await browser.close();
    await fs.writeFile(path.join(artifacts, 'browser-results.json'), JSON.stringify(results, null, 2));
  }
  console.log(results.length + ' cases passed. Technical checks only; editorial comprehension still needs human review.');
})().catch(error => { console.error(error); process.exitCode = 1; });
