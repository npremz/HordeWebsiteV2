// Builds annotated figures (FR + EN) from r3 captures as HTML overlays, screenshotted at DPR 1.5.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/nix/store/kcyyd65nz8kqyxbmh5yql6frd7mh0v18-chromium-151.0.7922.71/bin/chromium';
const D = __dirname + '/r3';
const meta = JSON.parse(fs.readFileSync(D + '/meta.json'));
const OUT = D + '/fig'; fs.mkdirSync(OUT, { recursive: true });
const FRAME = '#f4efe6', COBALT = '#2b3fd6', LIME = '#d4ff3a', INK = '#111111';
const css = `
*{box-sizing:border-box;margin:0}
body{background:${FRAME};font-family:'DejaVu Sans Mono','Liberation Mono',monospace;color:${INK}}
.wrap{position:relative;padding:40px;display:inline-block}
.shot{position:relative;display:block;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
.shot img{display:block}
.box{position:absolute;border:3px solid ${COBALT};border-radius:6px}
.badge{position:absolute;width:30px;height:30px;border-radius:50%;background:${LIME};border:2px solid ${INK};font:700 15px/26px 'DejaVu Sans Mono',monospace;text-align:center;transform:translate(-50%,-50%);z-index:3}
.label{font:500 17px/1.2 'DejaVu Sans Mono',monospace;margin-top:12px;display:flex;gap:10px;align-items:center}
.tag{background:${LIME};border:2px solid ${INK};border-radius:999px;padding:3px 10px;font:600 14px/1.2 'DejaVu Sans Mono',monospace;position:absolute;white-space:nowrap;z-index:3}
.grid{display:grid;gap:28px}
.fold{position:absolute;left:-8px;right:-8px;border-top:3px dashed ${COBALT}}
`;
const box = (b, n, pad = 6) => `<div class="box" style="left:${b[0] - pad}px;top:${b[1] - pad}px;width:${b[2] + 2 * pad}px;height:${b[3] + 2 * pad}px"></div><div class="badge" style="left:${b[0] + b[2] + pad}px;top:${b[1] - pad}px">${n}</div>`;
const pages = [];
const fmt = (lang, n) => lang === 'fr' ? n.toLocaleString('fr-BE').replace(/\u202f|\u00a0/g, ' ') : n.toLocaleString('en-GB');

for (const lang of ['fr', 'en']) {
  // A. Audit page, desktop first screen
  {
    const m = meta[`${lang}-audit-desk`];
    const crumbs = lang === 'fr' ? [224, 17, 226, 19] : [224, 17, 246, 19];
    const sw = lang === 'fr' ? [1388, 18, 27, 16] : [1352, 18, 14, 16];
    const html = `<div class="wrap"><div class="shot" style="width:1440px;height:900px"><img src="file://${D}/${lang}-audit-desk.png" style="width:1440px;height:900px">
      ${box(m.h1, 1)}${box(m.cta, 2)}${box(crumbs, 3, 5)}${box(sw, 4, 6)}</div></div>`;
    pages.push({ name: `${lang}-audit-desktop`, html, w: 1520, h: 980 });
  }
  // B. Contact form focus, before / after
  {
    const m = meta[`${lang}-focus`];
    const h = Math.round(m.clip.height);
    const r = m.row;
    const panel = (f, n) => `<div class="shot" style="width:1440px;height:${h}px"><img src="file://${D}/${lang}-focus-${f}.png" style="width:1440px;height:${h}px">${box([r[0], r[1], r[2], r[3]], n, 4)}</div>`;
    const html = `<div class="wrap"><div class="grid">${panel('before', 1)}${panel('after', 2)}</div></div>`;
    pages.push({ name: `${lang}-form-focus`, html, w: 1520, h: 80 + 2 * h + 28 });
  }
  // C. Home timeline, first visit vs reduced motion
  {
    const s = 0.4, W = 1440 * s, H = 900 * s;
    const t = ms => lang === 'fr' ? (ms / 1000).toString().replace('.', ',') + ' s' : (ms / 1000) + ' s';
    const cells = [500, 1500, 2500, 3500, 4500].map(ms => ({ f: `${lang}-tl-no-preference-${ms}.png`, l: t(ms) }));
    cells.push({ f: `${lang}-tl-reduce-1000.png`, l: lang === 'fr' ? '1 s · mouvement réduit' : '1 s · reduced motion' });
    const html = `<div class="wrap"><div class="grid" style="grid-template-columns:repeat(3,${W}px)">${cells.map((c, i) => `<div><div class="shot" style="width:${W}px;height:${H}px${i === 5 ? `;outline:3px solid ${COBALT};outline-offset:4px` : ''}"><img src="file://${D}/${c.f}" style="width:${W}px;height:${H}px"></div><div class="label">${c.l}</div></div>`).join('')}</div></div>`;
    pages.push({ name: `${lang}-home-timeline`, html, w: 80 + 3 * W + 2 * 28, h: 80 + 2 * (H + 40) + 28 });
  }
  // D. Mobile: home, audit page, open menu
  {
    const W = 390, H = 844;
    const homeCta = meta[`${lang}-mob-home-cta`][1], auditCta = meta[`${lang}-mob-audit-cta`][1];
    const menuSrc = 'fr-mob-menu.png'; // the French menu shows the untranslated label in both articles
    const mb = meta['fr-mob-menu-label'].b;
    const first = lang === 'fr' ? 'premier bouton à' : 'first button at';
    const tagBelow = (y, n) => `<div class="fold" style="top:${H - 3}px"></div><div class="badge" style="left:${W - 26}px;top:${H - 30}px">${n}</div><div class="tag" style="left:12px;top:${H - 46}px">↓ ${first} ${fmt(lang, y)} px</div>`;
    const html = `<div class="wrap"><div class="grid" style="grid-template-columns:repeat(3,${W}px);gap:40px">
      <div class="shot" style="width:${W}px;height:${H}px"><img src="file://${D}/${lang}-mob-home.png" style="width:${W}px;height:${H}px">${tagBelow(homeCta, 1)}</div>
      <div class="shot" style="width:${W}px;height:${H}px"><img src="file://${D}/${lang}-mob-audit.png" style="width:${W}px;height:${H}px">${tagBelow(auditCta, 2)}</div>
      <div class="shot" style="width:${W}px;height:${H}px"><img src="file://${D}/${menuSrc}" style="width:${W}px;height:${H}px">${box(mb, 3, 5)}</div>
    </div></div>`;
    pages.push({ name: `${lang}-mobile-first-screen`, html, w: 80 + 3 * W + 80, h: 80 + H });
  }
}
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  for (const pg of pages) {
    const p = await b.newPage({ viewport: { width: pg.w, height: pg.h }, deviceScaleFactor: 1.5 });
    fs.writeFileSync(`${OUT}/${pg.name}.html`, `<!doctype html><meta charset=utf-8><style>${css}</style>${pg.html}`);
    await p.goto(`file://${OUT}/${pg.name}.html`); await p.waitForTimeout(400);
    await p.screenshot({ path: `${OUT}/${pg.name}.png`, clip: { x: 0, y: 0, width: pg.w, height: pg.h } });
    await p.close();
    console.log(pg.name, pg.w, pg.h);
  }
  await b.close();
})();
