// Captures for the article (DPR 1.5), FR + EN. Read-only (non-GET blocked).
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/nix/store/kcyyd65nz8kqyxbmh5yql6frd7mh0v18-chromium-151.0.7922.71/bin/chromium';
const O = 'r3'; fs.mkdirSync(O, { recursive: true });
const guard = ctx => ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
const meta = {};
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  for (const lang of ['fr', 'en']) {
    const auditUrl = lang === 'fr' ? 'https://hordeagence.com/fr/services/audit-seo-technique-bruxelles/' : 'https://hordeagence.com/en/services/technical-seo-audit-brussels/';
    // 1. Desktop audit fold + element boxes
    {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 }); await guard(ctx);
      const p = await ctx.newPage();
      await p.goto(auditUrl, { waitUntil: 'networkidle' }); await p.waitForTimeout(4000);
      await p.mouse.move(1430, 890);
      await p.screenshot({ path: `${O}/${lang}-audit-desk.png` });
      meta[`${lang}-audit-desk`] = await p.evaluate(() => {
        const bx = e => { if (!e) return null; const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); };
        const h1 = document.querySelector('h1');
        const cta = [...document.querySelectorAll('main a')].find(a => /audit/i.test(a.innerText) && a.getBoundingClientRect().y < 900);
        const crumbs = document.querySelector('.site-header__desktop-breadcrumb .breadcrumbs, .site-header__slg-breadcrumb .breadcrumbs');
        const lang = document.querySelector('.site-header__language-inactive');
        return { h1: bx(h1), h1txt: h1.innerText, cta: bx(cta), ctaTxt: cta && cta.innerText, crumbs: bx(crumbs), lang: bx(lang), langTxt: lang && lang.innerText };
      });
      await ctx.close();
    }
    // 2. Contact form focus (dark variant)
    {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 }); await guard(ctx);
      const p = await ctx.newPage();
      await p.goto(`https://hordeagence.com/${lang}/contact/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
      await p.locator('input[name=nom]').scrollIntoViewIfNeeded();
      await p.evaluate(() => { const e = document.querySelector('textarea[name=objectif]'); window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 140); });
      await p.mouse.move(5, 890); await p.waitForTimeout(500);
      const clip = await p.evaluate(() => { const a = document.querySelector('textarea[name=objectif]').getBoundingClientRect(); const c = document.querySelector('input[name=email]').getBoundingClientRect(); return { x: 0, y: Math.max(0, a.top - 70), width: 1440, height: (c.bottom + 60) - Math.max(0, a.top - 70) }; });
      await p.screenshot({ path: `${O}/${lang}-focus-before.png`, clip });
      await p.locator('textarea[name=objectif]').focus(); await p.keyboard.press('Tab');
      await p.evaluate(() => document.activeElement.style.caretColor = 'transparent'); // caret blinks; hide it so both frames are comparable, mentioned in caption
      await p.waitForTimeout(500);
      await p.screenshot({ path: `${O}/${lang}-focus-after.png`, clip });
      meta[`${lang}-focus`] = await p.evaluate(c => { const e = document.activeElement; const r = e.closest('div[class*=border-b]').getBoundingClientRect(); return { name: e.name, row: [r.x, r.y - c.y, r.width, r.height].map(Math.round), clip: c }; }, clip);
      await ctx.close();
    }
    // 3. Home timeline, first visit (fresh context) + reduced motion
    for (const rm of ['no-preference', 'reduce']) {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: rm }); await guard(ctx);
      const p = await ctx.newPage();
      const t0 = Date.now();
      const nav = p.goto(`https://hordeagence.com/${lang}/`, { waitUntil: 'commit' }).catch(() => {});
      const times = rm === 'reduce' ? [1000] : [500, 1500, 2500, 3500, 4500];
      for (const t of times) { const w = t - (Date.now() - t0); if (w > 0) await p.waitForTimeout(w); await p.screenshot({ path: `${O}/${lang}-tl-${rm}-${t}.png` }); }
      await nav; await ctx.close();
    }
    // 4. Mobile first screens + menu
    {
      const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); await guard(ctx);
      const p = await ctx.newPage();
      await p.goto(`https://hordeagence.com/${lang}/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(6000);
      await p.screenshot({ path: `${O}/${lang}-mob-home.png` });
      meta[`${lang}-mob-home-cta`] = await p.evaluate(() => { const a = [...document.querySelectorAll('main a')].find(a => /contact/.test(a.getAttribute('href') || '')); const r = a.getBoundingClientRect(); return [r.x, r.y + scrollY, r.width, r.height].map(Math.round); });
      await p.goto(auditUrl, { waitUntil: 'networkidle' }); await p.waitForTimeout(4000);
      await p.screenshot({ path: `${O}/${lang}-mob-audit.png` });
      meta[`${lang}-mob-audit-cta`] = await p.evaluate(() => { const a = [...document.querySelectorAll('main a')].find(a => /contact/.test(a.getAttribute('href') || '')); const r = a.getBoundingClientRect(); return [r.x, r.y + scrollY, r.width, r.height].map(Math.round); });
      await p.click('[data-header-toggle]'); await p.waitForTimeout(1200);
      await p.screenshot({ path: `${O}/${lang}-mob-menu.png` });
      meta[`${lang}-mob-menu-label`] = await p.evaluate(() => { const l = document.querySelector('[data-header-toggle-label]'); const r = l.closest('button').getBoundingClientRect(); return { txt: l.innerText, b: [r.x, r.y, r.width, r.height].map(Math.round) }; });
      await ctx.close();
    }
  }
  fs.writeFileSync(`${O}/meta.json`, JSON.stringify(meta, null, 1));
  console.log(JSON.stringify(meta, null, 1));
  await b.close();
})();
