const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

const base = process.env.BLOG_TEST_BASE_URL || 'http://127.0.0.1:4339';
const artifacts = process.env.BLOG_TEST_ARTIFACTS || '/review/artifacts';
const pages = [
  ['direction-artistique-interface-web', 'art-direction-for-web-interfaces', 'direction'],
  ['design-developpement-web-ensemble', 'design-and-web-development-together', 'component'],
  ['analyser-interface-web-sans-copier', 'analyse-web-interface-without-copying', 'references'],
  ['brief-design-web-cadrer-experience', 'web-design-brief-before-screens', 'brief'],
  ['ia-interfaces-experiences-utilisateur', 'ai-can-create-interfaces-not-experiences', 'review'],
  ['comment-creer-site-web-qui-se-demarque-2026', 'how-to-make-your-website-stand-out-2026', 'direction'],
];
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const width of [375, 1440]) {
      for (const lang of ['fr', 'en']) {
        for (const [frSlug, enSlug, kind] of pages) {
          const slug = lang === 'fr' ? frSlug : enSlug;
          const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', acceptDownloads: true });
          const page = await context.newPage();
          const errors = [];
          const writes = [];
          page.on('pageerror', (error) => errors.push(error.message));
          page.on('request', (request) => { if (request.method() !== 'GET' && new URL(request.url()).origin === new URL(base).origin) writes.push(request.url()); });
          const response = await page.goto(`${base}/${lang}/blog/${slug}/`, { waitUntil: 'networkidle' });
          assert.equal(response.status(), 200, slug);
          assert.equal(await page.locator('h1').count(), 1);
          assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
          const workshop = page.locator('[data-blog-workshop]');
          await workshop.scrollIntoViewIfNeeded();
          await page.waitForFunction(() => Boolean(document.querySelector('[data-blog-workshop][data-initialized]')));
          if (kind === 'direction' || kind === 'review') {
            const variant = workshop.locator('[data-variant="expressive"]');
            await variant.focus();
            await page.keyboard.press('Enter');
            assert.equal(await variant.getAttribute('aria-pressed'), 'true');
            assert.equal(await workshop.locator('[data-variant-panel]').getAttribute('data-variant-panel'), 'expressive');
            if (kind === 'review') assert(await workshop.locator('.example-distractions').isVisible());
            await workshop.locator('[data-example-action]').click();
            assert((await workshop.locator('[data-example-feedback]').innerText()).length > 20);
          }
          if (kind === 'component') {
            await workshop.locator('[data-compact]').check();
            await workshop.locator('[data-long-label]').check();
            const submit = workshop.locator('[data-booking-submit]');
            assert((await submit.innerText()).length > 35);
            await submit.focus();
            await page.keyboard.press('Enter');
            const input = workshop.locator('#workshop-name');
            assert.equal(await input.getAttribute('aria-invalid'), 'true');
            assert(await input.evaluate((element) => element === document.activeElement));
            await input.fill('Camille');
            await page.keyboard.press('Enter');
            assert.equal(await input.getAttribute('aria-invalid'), 'false');
            assert.equal(await input.inputValue(), 'Camille');
            assert((await workshop.locator('[data-booking-result]').innerText()).length > 20);
          }
          if (kind === 'references') {
            for (const summary of await workshop.locator('summary').all()) { await summary.focus(); await page.keyboard.press('Enter'); }
            assert.equal(await workshop.locator('details[open]').count(), 3);
          }
          if (kind === 'brief') {
            await workshop.locator('[data-brief-example]').click();
            assert((await workshop.locator('textarea').first().inputValue()).length > 20);
            await workshop.locator('textarea').first().fill('Texte de contrôle local / local test');
            page.once('dialog', (dialog) => dialog.dismiss());
            await workshop.locator('[data-brief-example]').click();
            assert.equal(await workshop.locator('textarea').first().inputValue(), 'Texte de contrôle local / local test');
            const downloadPromise = page.waitForEvent('download');
            await workshop.locator('button[type="submit"]').click();
            const download = await downloadPromise;
            const content = await fs.readFile(await download.path(), 'utf8');
            assert(content.includes('Texte de contrôle local / local test'));
            assert.equal((content.match(/^## /gm) || []).length, 6);
            assert.equal(download.suggestedFilename(), `horde-brief-${lang}.md`);
          }
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
          assert(!overflow, `Horizontal overflow: ${width} ${lang} ${slug}`);
          const axe = await new AxeBuilder({ page }).include('[data-blog-workshop]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))));
          assert.deepEqual(errors, [], `JavaScript errors: ${slug}`);
          assert.deepEqual(writes, [], `Unexpected same-origin submission: ${slug}`);
          if (lang === 'fr') await workshop.screenshot({ path: path.join(artifacts, `${slug}-${width}.png`) });
          results.push({ slug, lang, width, status: 'passed', axeViolationsInWorkshop: 0 });
          await context.close();
          console.log(`PASS ${width} ${lang} ${slug}`);
        }
      }
    }
  } finally { await browser.close(); await fs.writeFile(path.join(artifacts, 'browser-results.json'), JSON.stringify(results, null, 2)); }
  console.log(`${results.length} bilingual desktop/mobile cases passed. This is not a complete accessibility audit or a user study.`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
