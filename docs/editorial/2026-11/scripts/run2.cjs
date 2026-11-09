// Audit UX/UI hordeagence.com — run 2 (9 Nov 2026). Read-only: every non-GET request is blocked.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/nix/store/kcyyd65nz8kqyxbmh5yql6frd7mh0v18-chromium-151.0.7922.71/bin/chromium';
const OUT = 'r2';
fs.mkdirSync(OUT, { recursive: true });
const res = {};
const VP = { desk: { width: 1440, height: 900 }, mob: { width: 390, height: 844 } };
const pages = {
  fr_home: 'https://hordeagence.com/fr/',
  en_home: 'https://hordeagence.com/en/',
  fr_audit: 'https://hordeagence.com/fr/services/audit-seo-technique-bruxelles/',
  en_audit: 'https://hordeagence.com/en/services/technical-seo-audit-brussels/',
  fr_contact: 'https://hordeagence.com/fr/contact/',
  en_contact: 'https://hordeagence.com/en/contact/',
  fr_post: 'https://hordeagence.com/fr/blog/bonne-interface-web/',
  en_post: 'https://hordeagence.com/en/blog/what-makes-a-good-web-interface/',
};
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  for (const [dev, vp] of Object.entries(VP)) {
    const ctx = await b.newContext({ viewport: vp, isMobile: dev === 'mob', hasTouch: dev === 'mob', locale: 'fr-BE' });
    await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
    const p = await ctx.newPage();
    for (const [key, url] of Object.entries(pages)) {
      const resp = await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await p.waitForTimeout(5000);
      await p.screenshot({ path: `${OUT}/${dev}_${key}_fold.png` });
      await p.screenshot({ path: `${OUT}/${dev}_${key}_full.png`, fullPage: true });
      const info = await p.evaluate(() => {
        const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0; };
        const box = e => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; };
        const ctas = [...document.querySelectorAll('main a, main button')].filter(vis).map(e => ({ t: e.innerText.trim().replace(/\s+/g, ' ').slice(0, 50), href: e.getAttribute('href'), b: box(e) }));
        const firstCta = ctas.find(c => /contact|audit|appel|calendly|call|talk/i.test((c.href || '') + c.t));
        // Small tap targets (non-inline-text): height < 24 px and not inside a paragraph / list item of running text
        const small = [...document.querySelectorAll('a,button,input,select,textarea,label[for]')].filter(vis).filter(e => !e.closest('p, li p, td, .prose p, article p')).map(e => ({ t: (e.innerText || e.value || e.getAttribute('aria-label') || e.tagName).trim().replace(/\s+/g, ' ').slice(0, 40), b: box(e) })).filter(x => x.b[3] < 24 || x.b[2] < 24);
        // Text smaller than 12px (visible leaf text)
        const tiny = {};
        for (const e of document.querySelectorAll('body *')) {
          if (!e.childNodes.length || ![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
          if (!vis(e)) continue;
          const fs = parseFloat(getComputedStyle(e).fontSize);
          if (fs < 12) { const k = fs + 'px'; tiny[k] = tiny[k] || []; if (tiny[k].length < 6) tiny[k].push(e.innerText.trim().slice(0, 40)); }
        }
        const hScroll = document.documentElement.scrollWidth > innerWidth + 1;
        const wideTables = [...document.querySelectorAll('table')].map(t => ({ w: t.scrollWidth, pw: t.parentElement.clientWidth, overflow: getComputedStyle(t.parentElement).overflowX }));
        return { title: document.title, lang: document.documentElement.lang, h1: (document.querySelector('h1') || {}).innerText, height: document.documentElement.scrollHeight, firstCta, ctaCount: ctas.filter(c => /contact|audit/i.test(c.href || '')).length, ctas: ctas.slice(0, 40), small: small.slice(0, 30), tiny, hScroll, wideTables, forms: [...document.querySelectorAll('form')].map(f => box(f)) };
      });
      info.status = resp && resp.status();
      res[`${dev} ${key}`] = info;
      console.log(dev, key, info.status, 'h=', info.height, 'firstCta=', JSON.stringify(info.firstCta), 'small=', info.small.length, 'tiny=', JSON.stringify(info.tiny).slice(0, 200), 'hScroll=', info.hScroll, 'forms=', JSON.stringify(info.forms));
    }
    await ctx.close();
  }
  // Hero readability timeline (time until the full home message is visible), 1st and 2nd visit, normal and reduced motion
  for (const dev of ['desk', 'mob']) for (const rm of ['no-preference', 'reduce']) {
    const ctx = await b.newContext({ viewport: VP[dev], isMobile: dev === 'mob', hasTouch: dev === 'mob', reducedMotion: rm });
    await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
    const p = await ctx.newPage();
    for (const visit of [1, 2]) {
      const t0 = Date.now();
      p.goto('https://hordeagence.com/fr/', { waitUntil: 'commit' }).catch(() => {});
      let tFull = null;
      while (Date.now() - t0 < 12000) {
        const ok = await p.evaluate(() => {
          const txt = document.body ? document.body.innerText : '';
          const els = [...document.querySelectorAll('h1, h1 *, [class*=hero] *')];
          const target = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /optimis/i.test(e.textContent || ''));
          if (!target) return false;
          let o = 1, n = target; while (n && n !== document.documentElement) { const cs = getComputedStyle(n); o *= +cs.opacity; if (cs.visibility === 'hidden' || cs.display === 'none') o = 0; n = n.parentElement; }
          const r = target.getBoundingClientRect();
          const pt = document.elementFromPoint(Math.min(innerWidth - 1, r.x + r.width / 2), Math.min(innerHeight - 1, r.y + r.height / 2));
          return o > 0.95 && r.bottom > 0 && r.top < innerHeight && !!pt && (pt === target || target.contains(pt) || pt.contains(target));
        }).catch(() => false);
        if (ok) { tFull = Date.now() - t0; break; }
        await p.waitForTimeout(100);
      }
      console.log('hero', dev, rm, 'visit', visit, 'full message visible at ms', tFull);
      res[`hero ${dev} ${rm} ${visit}`] = tFull;
      await p.waitForTimeout(1500);
    }
    await ctx.close();
  }
  // Focus visibility on the contact form (dark variant): screenshot field before/after keyboard focus
  {
    const ctx = await b.newContext({ viewport: VP.desk });
    await ctx.route('**/*', r => r.request().method() !== 'GET' ? r.abort() : r.continue());
    const p = await ctx.newPage();
    await p.goto(pages.fr_contact, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    const f = p.locator('input[name=nom]');
    await f.scrollIntoViewIfNeeded();
    await p.mouse.move(5, 5);
    const bb = await f.evaluate(e => { const row = e.closest('div[class*=border-b]') || e.parentElement; const r = row.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, border: getComputedStyle(row).borderBottomColor }; });
    const clip = { x: 0, y: Math.max(0, bb.y - 160), width: 1440, height: bb.h + 320 };
    await p.screenshot({ path: `${OUT}/focus_before.png`, clip });
    // keyboard focus: focus the previous field then Tab
    await p.locator('textarea[name=objectif]').focus();
    await p.keyboard.press('Tab');
    await p.waitForTimeout(600);
    const after = await p.evaluate(() => { const e = document.activeElement; const row = e.closest('div[class*=border-b]') || e.parentElement; return { name: e.name, outline: getComputedStyle(e).outlineStyle, border: getComputedStyle(row).borderBottomColor }; });
    await p.screenshot({ path: `${OUT}/focus_after.png`, clip });
    res.focus = { before: bb.border, after };
    console.log('focus', JSON.stringify(res.focus));
    await ctx.close();
  }
  fs.writeFileSync(`${OUT}/run2.json`, JSON.stringify(res, null, 1));
  await b.close();
})();
