// Read official pricing pages from a Belgian connection, fr-BE locale. Read-only (non-GET blocked).
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
const urls = (process.argv[2] ? process.argv.slice(2) : [
  'https://fr.wix.com/plans',
  'https://www.framer.com/pricing',
  'https://lovable.dev/pricing',
  'https://webflow.com/pricing',
]);
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ locale: 'fr-BE', timezoneId: 'Europe/Brussels', viewport: { width: 1440, height: 1000 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0 Safari/537.36' });
  await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
  const p = await ctx.newPage();
  for (const u of urls) {
    try {
      await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForTimeout(7000);
      for (let y = 0; y < 6000; y += 800) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(150); }
      const txt = await p.evaluate(() => document.body.innerText);
      const name = u.replace(/https?:\/\//, '').replace(/\W+/g, '_');
      fs.writeFileSync(`${name}.txt`, p.url() + '\n' + txt);
      await p.screenshot({ path: `${name}.png`, fullPage: false });
      console.log('OK', u, '->', p.url(), txt.length);
    } catch (e) { console.log('ERR', u, e.message.slice(0, 120)); }
  }
  await b.close();
})();
