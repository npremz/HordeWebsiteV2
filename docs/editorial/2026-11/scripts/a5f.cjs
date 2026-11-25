// A5 figures: home station/mobile pair, TV, and a FR/EN timeline built from the repo history.
const { chromium } = require('playwright-core'); const fs = require('fs');
const S = __dirname + '/a5', OUT = __dirname + '/a5fig'; fs.mkdirSync(OUT, { recursive: true });
const FRAME = '#f4efe6', COBALT = '#2b3fd6', LIME = '#d4ff3a', INK = '#111', LAV = '#b3a6e6';
const css = `*{box-sizing:border-box;margin:0}body{background:${FRAME};font-family:'DejaVu Sans',sans-serif;color:${INK}}
.wrap{padding:40px;display:inline-block}.shot{box-shadow:0 0 0 1px rgba(0,0,0,.15)}.shot img{display:block;width:100%}
.tag{display:inline-block;margin-bottom:10px;background:${INK};color:${FRAME};font:600 15px/1 'DejaVu Sans Mono',monospace;padding:7px 12px;border-radius:999px;letter-spacing:.04em}
.tl{width:1600px;position:relative;padding:20px 10px 10px}.axis{position:absolute;left:40px;right:40px;top:111px;height:4px;background:${INK}}
.ev{position:absolute;top:0;width:150px;transform:translateX(-50%);text-align:center}
.ev .d{font:700 15px 'DejaVu Sans Mono',monospace;margin-bottom:8px;height:40px;display:flex;align-items:flex-end;justify-content:center}
.ev .dot{width:22px;height:22px;border-radius:50%;background:${FRAME};border:4px solid ${INK};margin:62px auto 14px}
.ev.k .dot{background:${LIME};width:34px;height:34px;margin-top:56px}.ev.u .dot{background:${COBALT};border-color:${COBALT};width:34px;height:34px;margin-top:56px}
.ev .t{font:15px/1.35 'DejaVu Sans',sans-serif}.ev.k .t,.ev.u .t{font-weight:700}
.band{position:absolute;top:101px;height:24px;background:${LAV};opacity:.7}`;
const tl = {
  fr: [['22 juil.', 'Premier jeu jouable', ''], ['27 juil.', 'Version collaborative, Docker', ''], ['14 août', 'Specs de production et tests', ''], ['21 août', 'Refonte autour des postes d’équipe', ''], ['1er sept.', 'Campagne de 30 niveaux', ''], ['10 sept.', 'Durcissement UX, appel coach, FR/EN/NL', ''], ['Sept.', 'Test avec des participants', 'u'], ['24 sept.', 'Éditeur glisser-déposer', ''], ['17-19 oct.', 'Équipes en retard, tutoriels, vitesse ×1', ''], ['20 oct.', 'Workshop : 2 groupes de 20', 'k']],
  en: [['22 Jul', 'First playable game', ''], ['27 Jul', 'Collaborative version, Docker', ''], ['14 Aug', 'Production specs and tests', ''], ['21 Aug', 'Rebuilt around team stations', ''], ['1 Sep', '30-level campaign', ''], ['10 Sep', 'UX hardening, coach call, FR/EN/NL', ''], ['Sep', 'Test with participants', 'u'], ['24 Sep', 'Drag-and-drop editor', ''], ['17-19 Oct', 'Late teams, tutorials, ×1 speed', ''], ['20 Oct', 'Workshop: 2 groups of 20', 'k']],
};
const timeline = l => { const ev = tl[l]; const x = i => 80 + i * (1440 / (ev.length - 1));
  return `<div class="tl" style="height:260px"><div class="axis"></div><div class="band" style="left:${x(5)}px;width:${x(8) - x(5)}px"></div>${ev.map((e, i) => `<div class="ev ${e[2]}" style="left:${x(i)}px"><div class="d">${e[0]}</div><div class="dot"></div><div class="t">${e[1]}</div></div>`).join('')}</div>`; };
const figs = {
  'poste-mobile': `<div style="display:grid;grid-template-columns:900px 290px;gap:32px;align-items:end"><div><span class="tag">1440 PX</span><div class="shot"><img src="file://${S}/desk-home.png"></div></div><div><span class="tag">390 PX</span><div class="shot"><img src="file://${S}/mob-home.png"></div></div></div>`,
  'tv': `<div style="width:1400px"><div class="shot"><img src="file://${S}/tv-progression.png"></div></div>`,
  'chronologie-fr': timeline('fr'), 'chronologie-en': timeline('en'),
};
(async () => {
  const b = await chromium.launch({ executablePath: fs.readFileSync(__dirname + '/chpath', 'utf8').trim(), args: ['--no-sandbox', '--allow-file-access-from-files'] });
  for (const [n, body] of Object.entries(figs)) {
    const p = await b.newPage({ viewport: { width: 1700, height: 1000 }, deviceScaleFactor: 1.5 });
    fs.writeFileSync(`${OUT}/${n}.html`, `<!doctype html><meta charset=utf-8><style>${css}</style><div class="wrap">${body}</div>`);
    await p.goto(`file://${OUT}/${n}.html`); await p.waitForTimeout(400);
    await p.locator('.wrap').screenshot({ path: `${OUT}/${n}.png` }); await p.close(); console.log('fig', n);
  }
  await b.close();
})();
