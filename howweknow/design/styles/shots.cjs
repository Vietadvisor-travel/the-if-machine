const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  for (let k = 1; k <= 7; k++) { await p.goto('file://' + __dirname + '/styles.html#' + k); await p.reload(); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500); await p.screenshot({ path: __dirname + `/Fathom_style_${k}.jpg`, type: 'jpeg', quality: 90 }); }
  await b.close(); })();
