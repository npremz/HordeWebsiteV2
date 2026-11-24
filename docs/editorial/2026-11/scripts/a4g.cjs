// A4 annotated proof figures of the live Lovable app (non-GET blocked). Overlays are injected into the page.
const { chromium } = require('playwright-core'); const fs = require('fs');
const BASE = 'https://loma-brussels-cocktail-club.lovable.app';
const OUT = __dirname + '/a4fig'; fs.mkdirSync(OUT, { recursive: true });
const annotate = (marks) => {
  const css = document.createElement('style');
  css.textContent = `.hx-ring{position:absolute;border:3px solid #2b3fd6;border-radius:6px;z-index:2147483646;pointer-events:none}.hx-b{position:absolute;width:30px;height:30px;border-radius:50%;background:#d4ff3a;border:2px solid #111;font:700 15px/26px monospace;text-align:center;color:#111;z-index:2147483647;transform:translate(-50%,-50%)}`;
  document.head.appendChild(css);
  const found = [];
  for (const [n, sel, text, up] of marks) {
    let el = null;
    if (text) { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) if (t.textContent.includes(text)) { el = t.parentElement; break; } }
    else el = document.querySelector(sel);
    for (let i = 0; i < (up || 0) && el; i++) el = el.parentElement;
    if (!el) { found.push(n + ':missing'); continue; }
    const r = el.getBoundingClientRect(), sx = scrollX, sy = scrollY;
    const ring = document.createElement('div'); ring.className = 'hx-ring';
    Object.assign(ring.style, { left: r.left + sx - 5 + 'px', top: r.top + sy - 5 + 'px', width: r.width + 10 + 'px', height: r.height + 10 + 'px' });
    const b = document.createElement('div'); b.className = 'hx-b'; b.textContent = n;
    Object.assign(b.style, { left: Math.min(r.right + sx + 4, innerWidth - 22) + 'px', top: r.top + sy - 4 + 'px' });
    document.body.append(ring, b); found.push(n + ':' + Math.round(r.top + sy));
  }
  return found;
};
(async () => {
  const b = await chromium.launch({ executablePath: fs.readFileSync(__dirname + '/chpath', 'utf8').trim(), args: ['--no-sandbox'] });
  const block = async c => c.route('**/*', r => ['GET', 'HEAD', 'OPTIONS'].includes(r.request().method()) ? r.continue() : r.abort());
  // 1. Reservation, mobile
  let c = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }); await block(c);
  let p = await c.newPage(); await p.goto(BASE + '/reservation', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  const m1 = await p.evaluate(annotate, [[1, null, '538 19 78'], [2, '[id*=lovable-badge], #lovable-badge, a[href*="lovable.dev"]', null], [3, 'button[type=submit]', null]]);
  console.log('resa', m1);
  const top = await p.evaluate(() => document.querySelector('form').getBoundingClientRect().top + scrollY - 40);
  const bottom = await p.evaluate(() => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) if (t.textContent.includes('538 19 78')) return t.parentElement.getBoundingClientRect().bottom + scrollY + 40; return 1600; });
  await p.screenshot({ path: OUT + '/reservation-mobile.png', fullPage: true, clip: { x: 0, y: top, width: 390, height: Math.min(bottom - top, 1500) } });
  await c.close();
  // 2. Home, desktop first screen (invented address & hours)
  c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 }); await block(c);
  p = await c.newPage(); await p.goto(BASE + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
  const m2 = await p.evaluate(annotate, [[1, null, 'Rue du Bailli'], [2, null, '18:00', 1]]);
  console.log('home', m2);
  await p.screenshot({ path: OUT + '/accueil-desktop.png' });
  await c.close(); await b.close();
})();
