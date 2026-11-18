const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ locale: 'fr-BE', timezoneId: 'Europe/Brussels', viewport: { width: 1440, height: 1000 } });
  const p = await ctx.newPage();
  await p.goto('https://fr.wix.com/pricing', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(12000);
  let t = await p.evaluate(() => document.body.innerText);
  fs.writeFileSync('wix_fr.txt', p.url() + '\n' + t); await p.screenshot({ path: 'wix_fr.png' });
  console.log(t.slice(0, 3500));
  // Webflow: ensure monthly toggle state
  await p.goto('https://webflow.com/pricing', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(6000);
  const sw = p.locator('[aria-label*="Toggle between yearly and monthly"], [role=switch]').first();
  console.log('switch count', await sw.count());
  if (await sw.count()) { await sw.click(); await p.waitForTimeout(2500); }
  t = await p.evaluate(() => document.body.innerText);
  console.log('WEBFLOW after toggle:', (t.match(/\$[\d ,]+\/mo[^\n]*\n[^\n]*/g) || []).slice(0, 4));
  await b.close();
})();
