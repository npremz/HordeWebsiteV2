const { chromium } = require('playwright-core'); const fs = require('fs');
(async () => { const b = await chromium.launch({ executablePath: fs.readFileSync(__dirname + '/chpath', 'utf8').trim(), args: ['--no-sandbox'] });
 const c = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }); let posts = 0;
 await c.route('**/*', r => { if (!['GET','HEAD','OPTIONS'].includes(r.request().method())) { posts++; return r.abort(); } r.continue(); });
 const p = await c.newPage(); await p.goto('https://loma-brussels-cocktail-club.lovable.app/reservation', { waitUntil: 'networkidle' });
 const f = await p.evaluate(() => [...document.querySelectorAll('input,select,textarea,button')].map(e => `${e.tagName}:${e.type||''}:${e.name||e.id}:${e.min||''}:${e.required}:${e.getAttribute('autocomplete')||''}:${(e.labels?.[0]?.innerText||e.innerText||'').replace(/\s+/g,' ').slice(0,30)}`));
 console.log(f.join('\n'));
 const priv = await p.evaluate(() => document.body.innerText.match(/.{0,60}(privacy|confidential|data|RGPD|GDPR|données).{0,60}/gi));
 console.log('privacy text:', priv);
 await p.screenshot({ path: 'a4-mob-resa-top.png' });
 await p.locator('button[type=submit]').first().click(); await p.waitForTimeout(800);
 const errs = await p.evaluate(() => [...document.querySelectorAll('[role=alert],[aria-invalid=true],.text-destructive')].map(e => (e.getAttribute('aria-invalid') ? 'invalid:' + (e.name||e.id) : e.innerText.slice(0, 60))));
 console.log('after empty submit:', errs, 'blocked non-GET:', posts, 'focused:', await p.evaluate(() => document.activeElement?.id || document.activeElement?.tagName));
 await p.screenshot({ path: 'a4-mob-resa-errors.png', fullPage: true });
 // keyboard focus visibility on home
 const d = await b.newPage({ viewport: { width: 1440, height: 900 } }); await d.goto('https://loma-brussels-cocktail-club.lovable.app/', { waitUntil: 'networkidle' });
 const fv = []; for (let i = 0; i < 8; i++) { await d.keyboard.press('Tab'); fv.push(await d.evaluate(() => { const e = document.activeElement, s = getComputedStyle(e); return `${e.tagName}:${(e.innerText||e.getAttribute('aria-label')||'').slice(0,20)}:${s.outlineStyle}/${s.outlineWidth}/${s.boxShadow !== 'none'}` })); }
 console.log('tab:', fv.join(' | ')); await b.close(); })();
