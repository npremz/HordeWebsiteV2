const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/nix/store/kcyyd65nz8kqyxbmh5yql6frd7mh0v18-chromium-151.0.7922.71/bin/chromium';
const AXE = __dirname + '/node_modules/axe-core/axe.min.js';
const urls = ['https://hordeagence.com/fr/', 'https://hordeagence.com/fr/services/audit-seo-technique-bruxelles/', 'https://hordeagence.com/fr/contact/', 'https://hordeagence.com/fr/blog/bonne-interface-web/', 'https://hordeagence.com/en/services/technical-seo-audit-brussels/'];
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
  const p = await ctx.newPage();
  const out = {};
  for (const u of urls) {
    await p.goto(u, { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
    for (let y = 0; y < 20000; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
    await p.addScriptTag({ path: AXE });
    const r = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }); return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help, ex: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.any[0] && n.any[0].message || '').slice(0, 160)) })); });
    out[u] = { violations: r };
    console.log('\n==', u);
    for (const v of r) console.log(' ', v.impact, v.id, v.n, '|', v.help, '\n     ', v.ex.join('\n      '));
  }
  fs.writeFileSync('r2/axe.json', JSON.stringify(out, null, 1));
  await b.close();
})();
