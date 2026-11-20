// A3 interaction checks: cursor-follow hero, parallax stamp, accordion, sliders. Read-only.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
const O = __dirname + '/a3';
const SITES = { framer: 'https://biggest-trust-162472.framer.app/', wix: 'https://nico77305.wixsite.com/loma', lovable: 'https://loma-brussels-cocktail-club.lovable.app/', horde: 'https://loma.dev.nicolas-premont.be/' };
const imgsSig = p => p.evaluate(() => [...document.querySelectorAll('img, [style*="background-image"]')].filter(e => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 40; }).map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), getComputedStyle(e).opacity].join(','); }).join('|'));
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const res = {};
  for (const [name, url] of Object.entries(SITES)) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(6000);
    // 1. cursor follow
    await p.mouse.move(300, 300, { steps: 5 }); await p.waitForTimeout(900);
    const a = await imgsSig(p);
    await p.mouse.move(1100, 650, { steps: 12 }); await p.waitForTimeout(900);
    const c = await imgsSig(p);
    await p.screenshot({ path: `${O}/${name}-cursor.png` });
    const cursor = a !== c;
    // 2. parallax: find element containing 1978 big
    const stamp = await p.evaluate(() => { const els = [...document.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 300 && (/1978/.test(e.textContent || '') && e.children.length < 3 && parseFloat(getComputedStyle(e).fontSize) > 100 || e.tagName === 'svg' || (e.tagName === 'IMG' && /1978/i.test(e.alt + e.src))); }); return els.length; });
    // scroll positions of a mid-page heading relative to bg number
    const par = [];
    for (const y of [700, 900, 1100]) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(500); par.push(await p.evaluate(() => { const big = [...document.querySelectorAll('*')].find(e => e.children.length < 3 && /^\s*1978\s*$/.test(e.textContent || '') && parseFloat(getComputedStyle(e).fontSize) > 100); const h = [...document.querySelectorAll('h1,h2,h3,p,div')].find(e => /DISCOVER/i.test(e.textContent || '') && e.children.length < 4); if (!big || !h) return null; return Math.round(big.getBoundingClientRect().top - h.getBoundingClientRect().top); })); }
    // 3. accordion: find menu rows, click first, measure height change
    const acc = await p.evaluate(() => {
      const cand = [...document.querySelectorAll('button, summary, [aria-expanded], [role=button], li, div')].filter(e => /^\s*(0?1)\b/.test(e.innerText || '') && e.getBoundingClientRect().height > 20 && e.getBoundingClientRect().height < 140 && /ORIGINAL|LOMASTEIN|SIGNATURE|THE /i.test(e.innerText || ''));
      const t = cand[cand.length - 1]; if (!t) return null; t.setAttribute('data-acc', '1'); return { tag: t.tagName, txt: t.innerText.trim().slice(0, 50), h: document.documentElement.scrollHeight, expanded: t.getAttribute('aria-expanded') };
    });
    let accRes = null;
    if (acc) {
      const l = p.locator('[data-acc="1"]'); await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
      const before = await p.evaluate(() => document.documentElement.scrollHeight);
      await l.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(1500);
      const after = await p.evaluate(() => document.documentElement.scrollHeight);
      const exp = await p.evaluate(() => document.querySelector('[data-acc="1"]')?.getAttribute('aria-expanded') ?? null);
      await p.screenshot({ path: `${O}/${name}-accordion.png` });
      accRes = { ...acc, delta: after - before, expAfter: exp };
    }
    // 4. sliders: range inputs or role=slider
    const sliders = await p.evaluate(() => ({ range: document.querySelectorAll('input[type=range], [role=slider], progress, meter').length, levelTxt: (document.body.innerText.match(/LEVEL/gi) || []).length }));
    res[name] = { cursor, parallax: par, stamp, accRes, sliders };
    console.log(name, JSON.stringify(res[name]));
    await ctx.close();
  }
  fs.writeFileSync(`${O}/interact.json`, JSON.stringify(res, null, 1));
  await b.close();
})();
