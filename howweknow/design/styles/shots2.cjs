const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  for (const sc of ['desert', 'core', 'desk', 'map']) for (const st of [1, 2]) { await p.goto('file://' + __dirname + `/scenes.html#${sc}-${st}`); await p.reload(); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600); await p.screenshot({ path: __dirname + `/Fathom_${sc}_${st}.jpg`, type: 'jpeg', quality: 90 }); }
  await b.close(); })();
