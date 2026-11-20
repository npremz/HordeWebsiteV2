// A3 annotated figures (language-neutral; captions carry FR/EN). Rendered at DPR 1.5.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = fs.readFileSync(__dirname + '/chpath', 'utf8').trim();
const C = __dirname + '/a3/crops', OUT = __dirname + '/a3/fig'; fs.mkdirSync(OUT, { recursive: true });
const FRAME = '#f4efe6', COBALT = '#2b3fd6', LIME = '#d4ff3a', INK = '#111111';
const css = `*{box-sizing:border-box;margin:0}body{background:${FRAME};font-family:'DejaVu Sans Mono',monospace;color:${INK}}
.wrap{padding:36px;display:inline-block}.grid{display:grid;gap:28px;align-items:start}
.shot{position:relative;box-shadow:0 0 0 1px rgba(0,0,0,.12);overflow:hidden}.shot img{display:block;width:100%}
.tag{display:inline-block;margin-bottom:10px;background:${INK};color:${FRAME};font:600 15px/1 'DejaVu Sans Mono',monospace;padding:7px 12px;border-radius:999px;letter-spacing:.04em}
.tag.h{background:${COBALT};color:#fff}
.badge{position:absolute;width:34px;height:34px;border-radius:50%;background:${LIME};border:2px solid ${INK};font:700 16px/30px 'DejaVu Sans Mono',monospace;text-align:center;transform:translate(-50%,-50%);z-index:3}
.ring{position:absolute;border:3px solid ${COBALT};border-radius:6px;z-index:2}`;
// panel: crop file, natural size (w,h), display width, badges [[n,x,y]] and rings [[x,y,w,h]] in crop px
const panel = (f, w, h, dw, badges = [], rings = [], tag = '', hl = false) => { const k = dw / w; return `<div>${tag ? `<span class="tag${hl ? ' h' : ''}">${tag}</span>` : ''}<div class="shot" style="width:${dw}px;height:${Math.round(h * k)}px"><img src="file://${C}/${f}.png">${rings.map(r => `<div class="ring" style="left:${r[0] * k - 4}px;top:${r[1] * k - 4}px;width:${r[2] * k + 8}px;height:${r[3] * k + 8}px"></div>`).join('')}${badges.map(b => `<div class="badge" style="left:${b[1] * k}px;top:${b[2] * k}px">${b[0]}</div>`).join('')}</div></div>`; };
const figs = {
  'premiers-ecrans': `<div class="grid" style="grid-template-columns:repeat(2,760px)">${panel('horde-fold', 1440, 900, 760, [], [], 'HORDE', true)}${panel('lovable-fold', 1440, 900, 760, [], [], 'LOVABLE')}${panel('framer-fold', 1440, 900, 760, [], [], 'FRAMER AI')}${panel('wix-fold', 1440, 900, 760, [], [], 'WIX AI')}</div>`,
  'mobile': `<div class="grid" style="grid-template-columns:repeat(4,330px)">${panel('horde-mfold', 390, 844, 330, [], [], 'HORDE', true)}${panel('lovable-mfold', 390, 844, 330, [], [], 'LOVABLE')}${panel('framer-mfold', 390, 844, 330, [], [], 'FRAMER AI')}${panel('wix-mfold', 390, 844, 330, [], [], 'WIX AI')}</div>`,
  'wix': `<div class="grid" style="grid-template-columns:repeat(2,720px)">${panel('wix-hero', 1440, 900, 720, [[1, 870, 330]])}${panel('wix-1978', 1440, 560, 720, [[2, 1230, 110]])}${panel('wix-sliders', 1440, 640, 720, [[3, 590, 520]], [[110, 515, 450, 45]])}${panel('wix-club', 1440, 320, 720, [[4, 1120, 130]], [[345, 134, 760, 130]])}</div>`,
  'framer': `<div class="grid" style="grid-template-columns:900px 300px"><div class="grid">${panel('framer-drinks', 1440, 620, 900, [[1, 470, 310]], [[44, 300, 400, 40]])}${panel('framer-card', 1440, 600, 900, [[2, 1280, 395]], [[690, 395, 580, 95]])}</div>${panel('framer-mob-hero', 390, 844, 300, [[3, 372, 330], [4, 380, 790]])}</div>`,
  'lovable': `<div class="grid" style="grid-template-columns:repeat(2,720px)">${panel('lovable-hero', 1440, 900, 720, [[1, 350, 805], [2, 1240, 800]], [[20, 815, 330, 40], [1240, 810, 180, 32]])}${panel('lovable-letter', 1440, 700, 720, [[3, 730, 300]], [[744, 300, 656, 96]])}${panel('lovable-origin', 1440, 600, 720, [[4, 475, 370]], [[40, 350, 421, 86]])}</div>`,
};
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  for (const [n, body] of Object.entries(figs)) {
    const p = await b.newPage({ viewport: { width: 1700, height: 900 }, deviceScaleFactor: 1.5 });
    fs.writeFileSync(`${OUT}/${n}.html`, `<!doctype html><meta charset=utf-8><style>${css}</style><div class="wrap">${body}</div>`);
    await p.goto(`file://${OUT}/${n}.html`); await p.waitForTimeout(500);
    await p.locator('.wrap').screenshot({ path: `${OUT}/${n}.png` });
    await p.close(); console.log('fig', n);
  }
  await b.close();
})();
