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
].filter(([frSlug]) => process.env.BLOG_TEST_PILOT_ONLY !== '1' || frSlug === 'analyser-interface-web-sans-copier');

async function assertHeroAtViewportTop(page, href) {
  const geometry = await page.locator('[data-blog-hero]').evaluate(element => {
    const rect = element.getBoundingClientRect();
    const notice = element.querySelector('[data-blog-publication-status]');
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      viewportWidth: innerWidth,
      background: getComputedStyle(element).backgroundColor,
      noticeTop: notice?.getBoundingClientRect().top,
      headingTop: element.querySelector('h1').getBoundingClientRect().top,
      noticeBottom: notice?.getBoundingClientRect().bottom,
    };
  });
  assert(Math.abs(geometry.top) <= 1, 'Hero offset at viewport top: ' + href + ' ' + JSON.stringify(geometry));
  assert(geometry.left <= 1 && geometry.right >= geometry.viewportWidth - 1, 'Hero must cover the viewport width: ' + href);
  assert.equal(geometry.background, 'rgb(22, 25, 27)', 'Hero background: ' + href);
  if (geometry.noticeTop !== undefined) {
    assert(geometry.noticeTop >= 48, 'Preview notice hidden behind the fixed navigation: ' + href);
    assert(geometry.noticeBottom < geometry.headingTop, 'Preview notice overlaps the title: ' + href);
  }
  return geometry;
}

(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  let browser;
  const results = [];
  try {
    for (const width of [375, 768, 1440, 1920]) {
      for (const lang of ['fr', 'en']) {
        // Release Chromium resources between locale/viewport batches on small review hosts.
        browser = await chromium.launch({ headless: true });
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
          const heroGeometry = await assertHeroAtViewportTop(page, href);
          assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
          assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).pathname, href);
          assert.equal(await page.locator('[data-blog-workshop]').count(), 0);
          assert.equal(await page.locator('article form').count(), 0);
          assert(!/Observer · essayer · décider|Observe · try · decide/.test(await page.locator('article').innerText()));
          const figures = page.locator('.article-figure');
          const isVuckoPair = slug === 'analyser-interface-web-sans-copier' || slug === 'analyse-web-interface-without-copying';
          assert.equal(await figures.count(), isVuckoPair ? 3 : 0);
          if (isVuckoPair) {
            const notice = page.locator('[data-blog-publication-status]');
            if (Date.now() < Date.parse('2026-09-22T00:00:00.000Z')) {
              assert.equal(await notice.getAttribute('data-blog-publication-status'), 'scheduled');
              assert(!/brouillon|draft/.test(await notice.innerText()));
            } else assert.equal(await notice.count(), 0);
            await page.screenshot({ path: path.join(artifacts, 'hero-' + lang + '-' + width + '.png') });
            const expectedTitle = lang === 'fr'
              ? 'Comment s’inspirer d’un site web sans le copier'
              : 'How to draw inspiration from a website without copying it';
            const expectedOpening = lang === 'fr' ? 'Vous préparez' : 'You are preparing';
            assert.equal((await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim(), expectedTitle);
            assert((await page.locator('.prose > p').first().innerText()).startsWith(expectedOpening));
            const proseText = await page.locator('.prose').innerText();
            assert(proseText.includes('Vucko'));
            assert(!/Rijksmuseum|GOV\.UK|Primer/.test(proseText));
            for (const figure of await figures.all()) {
              await figure.scrollIntoViewIfNeeded();
              const img = figure.locator('img');
              await img.evaluate(element => element.decode());
              assert(await img.evaluate(element => element.naturalWidth > 0 && element.complete));
              assert((await img.getAttribute('alt')).length > 30);
              assert((await img.getAttribute('srcset')).includes('480w'));
              assert.equal(await img.getAttribute('loading'), 'lazy');
              const expectedCaptureDate = lang === 'fr' ? '15 septembre 2026' : 'September 15, 2026';
              assert((await figure.locator('figcaption').innerText()).includes(expectedCaptureDate));
              const fullSize = await context.request.get(new URL(await figure.locator('a').getAttribute('href'), base).href);
              assert.equal(fullSize.status(), 200);
              assert(fullSize.headers()['content-type'].startsWith('image/'));
            }
            await figures.first().scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(artifacts, 'reference-' + lang + '-' + width + '.png') });
            for (let index = 0; index < await figures.count(); index++) {
              await figures.nth(index).scrollIntoViewIfNeeded();
              await page.screenshot({ path: path.join(artifacts, 'reference-' + lang + '-' + width + '-figure-' + (index + 1) + '.png') });
            }
            if (width === 1440) {
              await fs.writeFile(path.join(artifacts, 'pilot-' + lang + '-rendered.txt'), await page.locator('article').innerText());
              await fs.writeFile(path.join(artifacts, 'pilot-' + lang + '-rendered.html'), await page.content());
              await fs.writeFile(path.join(artifacts, 'pilot-' + lang + '-metadata.json'), JSON.stringify(await page.evaluate(() => ({
                title: document.title,
                description: document.querySelector('meta[name="description"]').content,
                schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent)),
                figures: [...document.querySelectorAll('.article-figure img')].map(el => ({ src: el.currentSrc, alt: el.alt, width: el.naturalWidth, height: el.naturalHeight })),
              })), null, 2));
            }
          }
          assert(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)), 'Horizontal overflow: ' + href);
          const axe = await new AxeBuilder({ page }).include('.prose').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) }))));
          assert.deepEqual(errors, []);
          assert.deepEqual(writes, []);
          const figureCount = await figures.count();
          if (isVuckoPair && [375, 1920].includes(width)) {
            await page.goto(base + '/' + lang + '/blog/', { waitUntil: 'networkidle' });
            await page.locator('main a[href="' + href + '"]').first().click();
            await page.waitForURL(base + href);
            await page.waitForLoadState('networkidle');
            await page.waitForFunction(() => document.getAnimations().every(animation =>
              !Number.isFinite(animation.effect?.getComputedTiming().endTime) || animation.playState !== 'running'
            ));
            await assertHeroAtViewportTop(page, href);
            await page.screenshot({ path: path.join(artifacts, 'hero-from-listing-' + lang + '-' + width + '.png') });
            assert.deepEqual(errors, []);
            assert.deepEqual(writes, []);
          }
          results.push({ slug, lang, width, status: 'passed', figures: figureCount, heroTop: heroGeometry.top, axeViolationsInArticleBody: 0 });
          await context.close();
          console.log('PASS ' + width + ' ' + lang + ' ' + slug);
        }
        await browser.close();
        browser = undefined;
      }
    }
  } finally {
    if (browser) await browser.close();
    await fs.writeFile(path.join(artifacts, 'browser-results.json'), JSON.stringify(results, null, 2));
  }
  console.log(results.length + ' cases passed. Technical checks only; editorial comprehension still needs human review.');
})().catch(error => { console.error(error); process.exitCode = 1; });
