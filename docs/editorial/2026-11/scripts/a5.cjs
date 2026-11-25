// A5 live audit of rocket.42belgium.be (GET only: every non-GET request is aborted, nothing is created).
const { chromium } = require('playwright-core'); const fs = require('fs');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = 'https://rocket.42belgium.be';
const OUT = __dirname + '/a5'; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: fs.readFileSync(__dirname + '/chpath', 'utf8').trim(), args: ['--no-sandbox'] });
  const res = {};
  for (const [dev, vp] of [['desk', { width: 1440, height: 900 }], ['mob', { width: 390, height: 844 }], ['tv', { width: 1920, height: 1080 }]]) {
    const c = await b.newContext({ viewport: vp, isMobile: dev === 'mob', hasTouch: dev === 'mob', locale: 'fr-BE' });
    let blocked = 0;
    await c.route('**/*', r => ['GET', 'HEAD', 'OPTIONS'].includes(r.request().method()) ? r.continue() : (blocked++, r.abort()));
    const paths = dev === 'tv' ? ['/progression'] : ['/', '/lab', '/staff', '/admin'];
    for (const path of paths) {
      const p = await c.newPage();
      try { await p.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 }); } catch (e) { res[`${dev} ${path}`] = 'ERR ' + e.message.slice(0, 80); continue; }
      await p.waitForTimeout(3000);
      await p.addScriptTag({ content: AXE });
      const axe = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] })).violations.map(v => `${v.id}(${v.impact})x${v.nodes.length}`));
      const info = await p.evaluate(() => ({ url: location.pathname, title: document.title, lang: document.documentElement.lang, robots: document.querySelector('meta[name=robots]')?.content, h1: [...document.querySelectorAll('h1')].map(h => h.innerText.replace(/\s+/g, ' ').slice(0, 60)), hscroll: document.documentElement.scrollWidth > innerWidth, text: document.body.innerText.replace(/\s+/g, ' ').slice(0, 220) }));
      res[`${dev} ${path}`] = { ...info, axe };
      await p.screenshot({ path: `${OUT}/${dev}${path === '/' ? '-home' : path.replace('/', '-')}.png` });
      await p.close();
    }
    res[`${dev} blockedNonGet`] = blocked;
    await c.close();
  }
  // API access without credentials (GET only)
  const api = {};
  for (const u of ['/api/health/ready', '/api/session/current', '/api/admin/sessions', '/api/admin/campaign-library', '/api/staff/overview', '/api/station/current', '/api/participant/current', '/api/companion/current']) {
    const r = await fetch(BASE + u, { headers: { 'User-Agent': 'Mozilla/5.0 HordeAudit' } });
    const t = await r.text(); api[u] = `${r.status} ${t.slice(0, 140).replace(/\s+/g, ' ')}`;
  }
  const h = await fetch(BASE + '/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  api.headers = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy'].map(k => `${k}: ${(h.headers.get(k) || '-').slice(0, 60)}`);
  res.api = api;
  fs.writeFileSync(OUT + '/a5.json', JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
