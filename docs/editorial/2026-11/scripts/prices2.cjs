const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
const grab = async (p, name) => { const t = await p.evaluate(() => document.body.innerText); fs.writeFileSync(name + '.txt', p.url() + '\n' + t); await p.screenshot({ path: name + '.png' }); console.log('saved', name, p.url(), t.length); };
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ locale: 'fr-BE', timezoneId: 'Europe/Brussels', viewport: { width: 1440, height: 1000 } });
  await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
  const p = await ctx.newPage();
  const go = async u => { await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(7000); };
  const tryClick = async sels => { for (const s of sels) { try { const l = p.locator(s).first(); if (await l.count()) { await l.click({ timeout: 4000 }); await p.waitForTimeout(2500); return s; } } catch (e) {} } return null; };
  // Wix
  for (const u of ['https://fr.wix.com/upgrade/website', 'https://fr.wix.com/plans-and-pricing', 'https://www.wix.com/plans']) {
    try { await go(u); if (!/wix\.com\/?$/.test(p.url())) { await grab(p, 'wix_' + u.split('/').pop()); } else console.log('redirect home', u); } catch (e) { console.log('ERR', u, e.message.slice(0, 80)); }
  }
  // Framer monthly
  await go('https://www.framer.com/pricing');
  console.log('framer toggle', await tryClick(['text=Yearly billing', '[role=switch]', 'button:has-text("Yearly")']));
  await grab(p, 'framer_toggled');
  // Lovable annual
  await go('https://lovable.dev/fr/pricing');
  console.log('lovable toggle', await tryClick(['text=Annuel', 'button:has-text("Annuel")']));
  await grab(p, 'lovable_annuel');
  // Webflow monthly + ecommerce
  await go('https://webflow.com/pricing');
  console.log('webflow monthly', await tryClick(['text=Monthly', 'button:has-text("Monthly")']));
  await grab(p, 'webflow_monthly');
  console.log('webflow ecom', await tryClick(['text=Ecommerce plans', 'a:has-text("Ecommerce plans")', 'button:has-text("Ecommerce")']));
  await grab(p, 'webflow_ecom');
  await b.close();
})();
