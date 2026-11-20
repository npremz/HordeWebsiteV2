// A3 figure captures: crops around elements found by text, with annotation boxes relative to the crop. Read-only.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
const O = __dirname + '/a3/crops'; fs.mkdirSync(O, { recursive: true });
const S = { framer: 'https://biggest-trust-162472.framer.app/', wix: 'https://nico77305.wixsite.com/loma', lovable: 'https://loma-brussels-cocktail-club.lovable.app/', horde: 'https://loma.dev.nicolas-premont.be/' };
const meta = {};
async function page(b, url, mob) {
  const ctx = await b.newContext(mob ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
  const p = await ctx.newPage(); await p.goto(url, { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(6000);
  for (let y = 0; y < 14000; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(70); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1000); await p.mouse.move(5, 5);
  return { p, ctx };
}
// box of the smallest visible element whose text matches re (page coords)
const boxOf = (p, src, flags = 'i', minFont = 0) => p.evaluate(([src, flags, minFont]) => {
  const re = new RegExp(src, flags);
  const els = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && +s.opacity > 0.05 && re.test(e.innerText || e.getAttribute('alt') || '') && parseFloat(s.fontSize) >= minFont; });
  els.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height);
  const e = els[0]; if (!e) return null; const r = e.getBoundingClientRect(); return [r.x, r.y + scrollY, r.width, r.height].map(Math.round);
}, [src, flags, minFont]);
async function crop(p, name, y0, h, boxes, w) {
  await p.evaluate(y => scrollTo(0, y), Math.max(0, y0 - 100)); await p.waitForTimeout(900);
  const sy = await p.evaluate(() => scrollY);
  const W = w || (await p.evaluate(() => innerWidth));
  await p.screenshot({ path: `${O}/${name}.png`, clip: { x: 0, y: y0 - sy, width: W, height: h } });
  meta[name] = { w: W, h, boxes: boxes.filter(Boolean).map(b => [b[0], b[1] - y0, b[2], b[3]]) };
  console.log(name, JSON.stringify(meta[name]));
}
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  // WIX desktop: hero word breaks, shaded 1978 image, "CARTE ACCORDÉON", empty newsletter
  {
    const { p, ctx } = await page(b, S.wix);
    const hero = await boxOf(p, '^THE ORIGINA', '');
    await crop(p, 'wix-hero', 0, 900, [hero]);
    const disc = await boxOf(p, 'DISCOVER', '');
    const img1978 = await p.evaluate(() => { const i = [...document.querySelectorAll('img')].find(i => { const r = i.getBoundingClientRect(); return r.width > 900; }) ; return null; });
    const yD = disc ? disc[1] - 200 : 1000;
    await crop(p, 'wix-1978', yD, 560, [disc]);
    const carte = await boxOf(p, '^CARTE ACCORD', '');
    const club = await boxOf(p, 'REJOIGNEZ LE CLUB', '');
    meta.wixCarte = carte; meta.wixClub = club;
    const accTop = carte ? carte[1] - 40 : 5000;
    await crop(p, 'wix-carte', accTop, 560, [carte]);
    if (club) await crop(p, 'wix-club', club[1] - 60, 320, [club]);
    const sl = await boxOf(p, '^LEVEL$', '');
    if (sl) await crop(p, 'wix-sliders', sl[1] - 520, 640, [sl]);
    await ctx.close();
  }
  // FRAMER: desktop accordion opened; mobile hero overlap
  {
    const { p, ctx } = await page(b, S.framer);
    const row = p.getByText('SIGNATURE COCKTAILS').first(); await row.scrollIntoViewIfNeeded(); await row.click(); await p.waitForTimeout(1500);
    const t = await boxOf(p, '^THE DRINKS LIST$', '');
    const opened = await boxOf(p, 'THE ORIGINAL · ROUGE', '');
    await crop(p, 'framer-drinks', t[1] - 40, 620, [opened]);
    const sl = await boxOf(p, '^LEVEL$', '');
    const card = await boxOf(p, '^THE ORIGINAL$', '');
    if (card) await crop(p, 'framer-card', card[1] - 260, 600, [card]);
    await ctx.close();
  }
  {
    const { p, ctx } = await page(b, S.framer, true);
    const h = await boxOf(p, '^THE ORIGINAL', '', 30);
    await crop(p, 'framer-mob-hero', 0, 844, [h], 390);
    await ctx.close();
  }
  // LOVABLE: invented practical info + founder letter
  {
    const { p, ctx } = await page(b, S.lovable);
    const addr = await boxOf(p, 'Rue du Bailli 78', '');
    const hours = await boxOf(p, '18:00', '');
    await crop(p, 'lovable-hero', 0, 900, [addr, hours]);
    const marcel = await boxOf(p, 'To Marcel', '');
    if (marcel) await crop(p, 'lovable-letter', marcel[1] - 300, 700, [marcel]);
    const crystal = await boxOf(p, 'cut in Wallonia', '');
    if (crystal) await crop(p, 'lovable-origin', crystal[1] - 380, 600, [crystal]);
    await ctx.close();
  }
  // HORDE + others: desktop first screens (no annotation)
  for (const n of ['horde', 'lovable', 'framer', 'wix']) {
    const { p, ctx } = await page(b, S[n]);
    await p.evaluate(() => document.querySelectorAll('nextjs-portal').forEach(e => e.style.display = 'none'));
    await crop(p, `${n}-fold`, 0, 900, []);
    await ctx.close();
    const m = await page(b, S[n], true);
    await m.p.evaluate(() => document.querySelectorAll('nextjs-portal').forEach(e => e.style.display = 'none'));
    await crop(m.p, `${n}-mfold`, 0, 844, [], 390);
    await m.ctx.close();
  }
  fs.writeFileSync(O + '/meta.json', JSON.stringify(meta, null, 1));
  await b.close();
})();
