// Render-cost gate: times real full-size frames across the whole story (9:16; --both adds 16:9), so a shot that is pretty but
// far too heavy to render (and EMPTY frames: owner 4 Nov 2026, every frame full and alive) (one blur over a busy layer cost 12 s a frame and stalled a render for hours) is caught BEFORE make.
//   node tools/cost.mjs stories/<slug>.story [--every 1.5]
//   budget per frame: ERROR > 800 ms (fix the shot: cache static layers with mkCanvas/withCtx, no live ctx.filter over many paths)
//                     WARN  > 400 ms     normal is ~100–250 ms
import { launch } from './browser.mjs'; import fs from 'fs';
const ep = process.argv[2], ai = process.argv.indexOf('--every'), every = ai > 0 ? +process.argv[ai + 1] : 1.5, ERR = 800, WARN = 400;
const browser = await launch(); const page = await browser.newPage(); page.on('pageerror', e => console.log('ERR:', e.message));
await page.goto('file://' + process.cwd() + '/studio.html'); await page.evaluate(() => window.READY);
let bad = false;
for (const [fmt, w, h] of process.argv.includes('--both') ? [['16x9', 1920, 1080], ['9x16', 1080, 1920]] : [['9x16', 1080, 1920]]) {
  const r = await page.evaluate(([txt, w, h, every]) => { const ep = SB.compile(txt); const c = document.getElementById('c'); c.width = w; c.height = h; W = w; H = h; ctx = c.getContext('2d'); loadEpisode(ep);
    const sc = []; let t = 0; for (const s of ep.scenes) { sc.push([t, s.id]); t += s.dur || 0; } const idAt = x => { let id = sc[0][1]; for (const [t0, i] of sc) if (x >= t0) id = i; return id; };
    const sm = mkCanvas(48, 64), sg = sm.getContext('2d', { willReadFrequently: true }); // emptiness of the picture zone (top 74 %, above the captions): 6 × 8 cells, a cell is dead when nearly flat
    const empty = () => { sg.drawImage(c, 0, 0, w, h * .74, 0, 0, 48, 64); const d = sg.getImageData(0, 0, 48, 64).data; let dead = 0; for (let cy = 0; cy < 8; cy++) for (let cx = 0; cx < 6; cx++) { let n = 0, s1 = 0, s2 = 0; for (let y = cy * 8; y < cy * 8 + 8; y++) for (let x = cx * 8; x < cx * 8 + 8; x++) { const i = (y * 48 + x) * 4, l = .3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]; n++; s1 += l; s2 += l * l; } if (Math.sqrt(Math.max(0, s2 / n - (s1 / n) ** 2)) < 5) dead++; } return Math.round(dead / 48 * 100); };
    const out = [], start = performance.now(); for (let x = .5; x < t; x += every) { renderEpisode(x); const t0 = performance.now(); renderEpisode(x + 1 / 30); const ms = Math.round(performance.now() - t0); out.push([+x.toFixed(1), ms, idAt(x), empty()]); if (performance.now() - start > 600000) { out.push([x, -1, 'timeout']); break; } }
    return out; }, [fs.readFileSync(ep, 'utf8'), w, h, every]);
  const ms = r.filter(x => x[1] >= 0).map(x => x[1]).sort((a, b) => a - b), med = ms[Math.floor(ms.length / 2)] || 0, worst = r.reduce((a, b) => b[1] > a[1] ? b : a, [0, 0, '']);
  console.log(`cost [${fmt}] median ${med} ms · max ${worst[1]} ms @ ${worst[0]}s ${worst[2]} · ${r.length} frames`);
  const per = new Map(); r.forEach(([x, m, id]) => { if (m > (per.get(id)?.[1] ?? -1)) per.set(id, [x, m]); });
  const fill = new Map(); r.forEach(([x, m, id, e]) => { if (e == null) return; const f = fill.get(id) || [0, 0, 0]; f[0] += e; f[1]++; if (e > f[2]) f[2] = e; fill.set(id, f); });
  const emp = [...fill].map(([id, f]) => [id, Math.round(f[0] / f[1]), f[2]]); console.log(`fill [${fmt}] dead picture area: median ${emp.map(e => e[1]).sort((a, b) => a - b)[Math.floor(emp.length / 2)] || 0} % per scene (aim < 25 %)`);
  for (const [id, avg] of emp) { if (avg > 55) { bad = true; console.log(`  ERROR empty frame ${avg} % of the picture is flat in ${id} — fill it: subject bigger, a real background, foreground, life (owner: no empty frames)`); } else if (avg > 35) console.log(`  WARN empty frame ${avg} % flat in ${id} (aim < 25 %)`); }
  for (const [id, [x, m]] of per) { if (m > ERR || m < 0) { bad = true; console.log(`  ERROR render cost ${m < 0 ? 'timeout' : m + ' ms/frame'} @ ${x}s ${id} (budget ${ERR} ms)`); } else if (m > WARN) console.log(`  WARN render cost ${m} ms/frame @ ${x}s ${id} (aim < ${WARN} ms)`); }
}
await browser.close(); process.exit(bad ? 1 : 0);
