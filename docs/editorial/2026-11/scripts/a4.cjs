// Quick live audit of the Loma Lovable app: SEO basics, axe, perf timings, interactions. Non-GET blocked.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = 'https://loma-brussels-cocktail-club.lovable.app';
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const res = {};
  for (const [dev, vp] of [['desk', { width: 1440, height: 900 }], ['mob', { width: 390, height: 844 }]]) {
    const c = await b.newContext({ viewport: vp, isMobile: dev === 'mob', hasTouch: dev === 'mob', locale: 'fr-BE' });
    await c.route('**/*', r => r.request().method() === 'GET' || r.request().method() === 'OPTIONS' || r.request().method() === 'HEAD' ? r.continue() : r.abort());
    for (const path of ['/', '/reservation', '/auth', '/admin']) {
      const p = await c.newPage(); let n = 0, bytes = 0;
      p.on('response', async r => { n++; try { bytes += Number(r.headers()['content-length'] || 0) } catch {} });
      await p.addInitScript(() => { window.__lcp = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true }); window.__cls = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value }).observe({ type: 'layout-shift', buffered: true }); });
      const resp = await p.goto(BASE + path, { waitUntil: 'networkidle' });
      const raw = dev === 'desk' ? await resp.text() : '';
      for (let y = 0; y < 12000; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
      await p.addScriptTag({ content: AXE });
      const axe = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }); return r.violations.map(v => `${v.id}(${v.impact})x${v.nodes.length}`) });
      const info = await p.evaluate(() => ({ url: location.pathname, title: document.title, desc: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href, robots: document.querySelector('meta[name=robots]')?.content, lang: document.documentElement.lang, h1: [...document.querySelectorAll('h1')].map(h => h.innerText.replace(/\s+/g, ' ').slice(0, 60)), og: !!document.querySelector('meta[property="og:image"]'), jsonld: document.querySelectorAll('script[type="application/ld+json"]').length, lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), hscroll: document.documentElement.scrollWidth > innerWidth, labelsMissing: [...document.querySelectorAll('input,select,textarea')].filter(i => i.type !== 'hidden' && !i.labels?.length && !i.getAttribute('aria-label')).length }));
      res[`${dev} ${path}`] = { ...info, requests: n, axe, ssrHasMenu: dev === 'desk' ? /Lomastein/.test(raw) : undefined, ssrH1: dev === 'desk' ? /<h1/.test(raw) : undefined };
      if (path === '/reservation' || path === '/') await p.screenshot({ path: `${__dirname}/a4-${dev}${path === '/' ? '-home' : path.replace('/', '-')}.png` });
      await p.close();
    }
    await c.close();
  }
  fs.writeFileSync(__dirname + '/a4.json', JSON.stringify(res, null, 1));
  for (const [k, v] of Object.entries(res)) console.log(k, JSON.stringify(v));
  await b.close();
})();
