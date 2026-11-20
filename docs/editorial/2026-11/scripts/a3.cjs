// A3 field audit: same prompt rendered by Framer AI, Wix AI, Lovable + Horde's designed version. Read-only (non-GET blocked).
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
const AXE = __dirname + '/node_modules/axe-core/axe.min.js';
const O = __dirname + '/a3'; fs.mkdirSync(O, { recursive: true });
const SITES = {
  framer: 'https://biggest-trust-162472.framer.app/',
  wix: 'https://nico77305.wixsite.com/loma',
  lovable: 'https://loma-brussels-cocktail-club.lovable.app/',
  horde: 'https://loma.dev.nicolas-premont.be/',
};
const VP = { desk: { width: 1440, height: 900 }, mob: { width: 390, height: 844 } };
const out = {};
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  for (const [name, url] of Object.entries(SITES)) for (const [dev, vp] of Object.entries(VP)) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: dev === 'mob' ? 2 : 1, isMobile: dev === 'mob', hasTouch: dev === 'mob', locale: 'fr-BE' });
    await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
    const p = await ctx.newPage();
    let bytes = 0, reqs = 0;
    p.on('response', async r => { reqs++; try { const h = await r.headerValue('content-length'); if (h) bytes += +h; } catch {} });
    const t0 = Date.now();
    await p.goto(url, { waitUntil: 'load', timeout: 90000 });
    const loadMs = Date.now() - t0;
    await p.waitForTimeout(6000);
    await p.evaluate(() => document.querySelectorAll('nextjs-portal').forEach(e => e.style.display = 'none'));
    await p.screenshot({ path: `${O}/${name}-${dev}-fold.png` });
    for (let y = 0; y < 30000; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(80); }
    await p.waitForTimeout(1200);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
    await p.screenshot({ path: `${O}/${name}-${dev}-full.png`, fullPage: true }).catch(e => console.log('full fail', name, dev, e.message.slice(0, 60)));
    const perf = await p.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; const r = performance.getEntriesByType('resource'); return { fcp: Math.round((performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0), transfer: Math.round((n.transferSize + r.reduce((a, x) => a + (x.transferSize || 0), 0)) / 1024), js: Math.round(r.filter(x => x.initiatorType === 'script').reduce((a, x) => a + (x.transferSize || 0), 0) / 1024), nreq: r.length + 1 }; });
    const info = await p.evaluate(() => {
      const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
      const txt = document.body.innerText;
      const small = {}; let tinyCount = 0;
      for (const e of document.querySelectorAll('body *')) { if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1) || !vis(e)) continue; const f = parseFloat(getComputedStyle(e).fontSize); if (f < 12) { tinyCount++; const k = Math.round(f * 10) / 10; small[k] = (small[k] || 0) + 1; } }
      const imgs = [...document.querySelectorAll('img')];
      const taps = [...document.querySelectorAll('a,button,input,[role=button]')].filter(vis);
      const smallTaps = taps.filter(e => { const r = e.getBoundingClientRect(); return r.height < 24 || r.width < 24; }).length;
      const focusables = taps.length;
      return {
        title: document.title, lang: document.documentElement.lang, h1: [...document.querySelectorAll('h1')].map(h => h.innerText.trim().replace(/\s+/g, ' ').slice(0, 60)),
        h2n: document.querySelectorAll('h2').length, height: document.documentElement.scrollHeight, hScroll: document.documentElement.scrollWidth > innerWidth + 1,
        address: /Bailli|rue |1050|Ixelles/i.test(txt), addressStreet: /rue|chauss|avenue|Bailli/i.test(txt), hours: /\d{1,2}[:h]\d{2}|\b(mar|tue|lun|mon|ven|fri|sam|sat)\w*\b.*\d/i.test(txt), prices: (txt.match(/€\s?\d+|\d+([.,]\d+)?\s?€/g) || []).length,
        reserve: /réserv|book|reserve/i.test(txt), newsletter: !!document.querySelector('input[type=email]'), map: !!document.querySelector('iframe[src*="map"], a[href*="maps"]'),
        imgs: imgs.length, imgsNoAlt: imgs.filter(i => !i.hasAttribute('alt')).length, imgsEmptyAlt: imgs.filter(i => i.getAttribute('alt') === '').length,
        tinyCount, small, smallTaps, focusables, metaDesc: (document.querySelector('meta[name=description]') || {}).content || null,
        reduced: [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.media && /reduced-motion/.test(r.media.mediaText)); } catch { return false; } }),
        lorem: /lorem|ipsum/i.test(txt), wixBanner: /wix|framer|lovable|made in|edit with/i.test([...document.querySelectorAll('a, div')].filter(e => e.children.length === 0 && /^(Made in Framer|Edit with Lovable|This site was designed with)/i.test(e.innerText)).map(e => e.innerText).join(' ')),
        badges: [...document.querySelectorAll('a,div,span')].filter(e => e.children.length <= 2 && /Made in Framer|Edit with Lovable|designed with the Wix|Wix\.com website builder|Create your website today/i.test(e.innerText || '')).map(e => e.innerText.trim().slice(0, 60)).slice(0, 3),
      };
    });
    await p.addScriptTag({ path: AXE });
    const axe = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }); return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length })); });
    // keyboard: tab 15 times, count visible focus indicators
    await p.evaluate(() => document.activeElement && document.activeElement.blur());
    let focusVisible = 0, tabbed = 0;
    if (dev === 'desk') for (let i = 0; i < 15; i++) { await p.keyboard.press('Tab'); const f = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); return { o: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0, sh: s.boxShadow !== 'none' }; }); if (f) { tabbed++; if (f.o || f.sh) focusVisible++; } }
    out[`${name} ${dev}`] = { url, loadMs, ...perf, ...info, axe, axeTotal: axe.reduce((a, v) => a + v.n, 0), tabbed, focusVisible };
    console.log(name, dev, JSON.stringify({ loadMs, ...perf, h1: info.h1, lang: info.lang, hScroll: info.hScroll, height: info.height, tiny: info.tinyCount, smallTaps: info.smallTaps, axeTotal: out[`${name} ${dev}`].axeTotal, axe: axe.map(a => a.id + ':' + a.n).join(','), addr: info.addressStreet, hours: info.hours, prices: info.prices, badges: info.badges, tab: tabbed + '/' + focusVisible }));
    await ctx.close();
  }
  fs.writeFileSync(`${O}/a3.json`, JSON.stringify(out, null, 1));
  await b.close();
})();
