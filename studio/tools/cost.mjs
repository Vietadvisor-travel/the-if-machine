// Render-cost gate: times real full-size frames across the whole story (9:16; --both adds 16:9), so a shot that is pretty but
// far too heavy to render (and EMPTY frames: owner 4 Nov 2026, every frame full and alive) (one blur over a busy layer cost 12 s a frame and stalled a render for hours) is caught BEFORE make.
//   node tools/cost.mjs stories/<slug>.story [--every 1.5]
//   budget per frame: ERROR > 800 ms (fix the shot: cache static layers with mkCanvas/withCtx, no live ctx.filter over many paths)
//                     WARN  > 400 ms     normal is ~100–250 ms
import { launch } from './browser.mjs'; import fs from 'fs';
const ep = process.argv[2], ai = process.argv.indexOf('--every'), every = ai > 0 ? +process.argv[ai + 1] : 1.5, ERR = +(process.env.COST_ERR || 800), WARN = +(process.env.COST_WARN || 400), MOT = +(process.env.MOT || 3);
const browser = await launch(); const page = await browser.newPage(); page.on('pageerror', e => console.log('ERR:', e.message));
await page.goto('file://' + process.cwd() + '/studio.html'); await page.evaluate(async () => window.READY);
let bad = false;
for (const [fmt, w, h] of process.argv.includes('--both') ? [['16x9', 1920, 1080], ['9x16', 1080, 1920]] : [['9x16', 1080, 1920]]) {
  const r = await page.evaluate(async ([txt, w, h, every]) => { const ep = SB.compile(txt); const c = document.getElementById('c'); c.width = w; c.height = h; W = w; H = h; ctx = c.getContext('2d'); loadEpisode(ep); await (window.L3_WAIT || 0);
    const sc = []; let t = 0; for (const s of ep.scenes) { sc.push([t, s.id]); t += s.dur || 0; } const idAt = x => { let id = sc[0][1]; for (const [t0, i] of sc) if (x >= t0) id = i; return id; };
    const sm = mkCanvas(48, 64), sg = sm.getContext('2d', { willReadFrequently: true }); // emptiness of the picture zone (top 74 %, above the captions): 6 × 8 cells, a cell is dead when nearly flat
    const empty = () => { sg.drawImage(c, 0, 0, w, h * .74, 0, 0, 48, 64); const d = sg.getImageData(0, 0, 48, 64).data; let dead = 0; for (let cy = 0; cy < 8; cy++) for (let cx = 0; cx < 6; cx++) { let n = 0, s1 = 0, s2 = 0; for (let y = cy * 8; y < cy * 8 + 8; y++) for (let x = cx * 8; x < cx * 8 + 8; x++) { const i = (y * 48 + x) * 4, l = .3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]; n++; s1 += l; s2 += l * l; } if (Math.sqrt(Math.max(0, s2 / n - (s1 / n) ** 2)) < 5) dead++; } return Math.round(dead / 48 * 100); };
    // detail (owner, 5 Nov 2026: "no bare scenes; details and a lively composition"): share of 12 × 16 cells of the picture zone that hold real
    // drawing (≥ 3 strong edges at 96 × 128) — a lone object on a plain background scores low even when nothing is flat-dead
    const dm2 = mkCanvas(96, 128), dg = dm2.getContext('2d', { willReadFrequently: true });
    const detail = () => { dg.drawImage(c, 0, 0, w, h * .74, 0, 0, 96, 128); const d = dg.getImageData(0, 0, 96, 128).data, L = i => .3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]; let full = 0;
      for (let cy = 0; cy < 16; cy++) for (let cx = 0; cx < 12; cx++) { let e = 0; for (let y = cy * 8; y < cy * 8 + 8; y++) for (let x = cx * 8; x < cx * 8 + 7; x++) { const i = (y * 96 + x) * 4; if (Math.abs(L(i) - L(i + 4)) > 22 || (y < 127 && Math.abs(L(i) - L(i + 384)) > 22)) e++; } if (e >= 3) full++; } return Math.round(full / 192 * 100); };
    const out = [], start = performance.now(); for (let x = .5; x < t; x += every) { renderEpisode(x); const t0 = performance.now(); renderEpisode(x + 1 / 30); const ms = Math.round(performance.now() - t0); const e0 = empty(), dt = detail(), a0 = sg.getImageData(0, 0, 48, 64).data.slice(); renderEpisode(x + .6); sg.drawImage(c, 0, 0, w, h * .74, 0, 0, 48, 64); const a1 = sg.getImageData(0, 0, 48, 64).data; let dm = 0; for (let i = 0; i < a0.length; i += 4) dm += Math.abs(a0[i] - a1[i]) + Math.abs(a0[i + 1] - a1[i + 1]) + Math.abs(a0[i + 2] - a1[i + 2]); out.push([+x.toFixed(1), ms, idAt(x), e0, +(dm / (a0.length / 4) / 3).toFixed(2), dt]); if (performance.now() - start > 600000) { out.push([x, -1, 'timeout']); break; } }
    return out; }, [fs.readFileSync(ep, 'utf8'), w, h, every]);
  const ms = r.filter(x => x[1] >= 0).map(x => x[1]).sort((a, b) => a - b), med = ms[Math.floor(ms.length / 2)] || 0, worst = r.reduce((a, b) => b[1] > a[1] ? b : a, [0, 0, '']);
  console.log(`cost [${fmt}] median ${med} ms · max ${worst[1]} ms @ ${worst[0]}s ${worst[2]} · ${r.length} frames`);
  const per = new Map(); r.forEach(([x, m, id]) => { if (m > (per.get(id)?.[1] ?? -1)) per.set(id, [x, m]); });
  const fill = new Map(); r.forEach(([x, m, id, e]) => { if (e == null) return; const f = fill.get(id) || [0, 0, 0]; f[0] += e; f[1]++; if (e > f[2]) f[2] = e; fill.set(id, f); });
  const emp = [...fill].map(([id, f]) => [id, Math.round(f[0] / f[1]), f[2]]); console.log(`fill [${fmt}] dead picture area: median ${emp.map(e => e[1]).sort((a, b) => a - b)[Math.floor(emp.length / 2)] || 0} % per scene (aim < 25 %)`);
  for (const [id, avg] of emp) { if (avg > 55) { bad = true; console.log(`  ERROR empty frame ${avg} % of the picture is flat in ${id} — fill it: subject bigger, a real background, foreground, life (owner: no empty frames)`); } else if (avg > 35) console.log(`  WARN empty frame ${avg} % flat in ${id} (aim < 25 %)`); }
  { const det = new Map(); r.forEach(x => { if (x[5] == null || x[2] === 'end') return; const f = det.get(x[2]) || [0, 0]; f[0] += x[5]; f[1]++; det.set(x[2], f); }); const dv = [...det].map(([id, f]) => [id, Math.round(f[0] / f[1])]);
    console.log(`detail [${fmt}] drawn picture area: median ${dv.map(e => e[1]).sort((a, b) => a - b)[Math.floor(dv.length / 2)] || 0} % per scene (aim ≥ 45 %)`);
    for (const [id, v] of dv) { if (v < 18) { bad = true; console.log(`  ERROR sparse scene ${id}: only ${v} % of the picture is drawn — give it a place (place=…), supporting details, foreground (owner: no bare scenes)`); } else if (v < 30) console.log(`  WARN thin scene ${id}: ${v} % drawn (aim ≥ 45 %) — add a place, details related to the line, a foreground`); } }
  // motion (owner, 4 Nov 2026: alive in every frame, every second): mean picture change over 0.6 s, per sample (0–255)
  { const still = r.filter(x => x[4] != null && x[4] < MOT); console.log(`motion [${fmt}] median change ${(r.map(x => x[4]).sort((a, b) => a - b)[Math.floor(r.length / 2)] || 0).toFixed(1)} per 0.6 s · ${still.length}/${r.length} still samples (aim 0)`);
    let run = 0, prev = ''; for (const x of r) { if (x[4] != null && x[4] < MOT && x[2] !== 'end') { run = x[2] === prev ? run + 1 : 1; prev = x[2]; if (run === 2) console.log(`  WARN still picture @ ${x[0]}s ${x[2]} (≥ ${(every * 2).toFixed(1)} s with almost nothing moving) — add motion: life, a camera move, an action on the line`); if (run === 3) { bad = true; console.log(`  ERROR frozen @ ${x[0]}s ${x[2]} — every second must move`); } } else run = 0; } }
  for (const [id, [x, m]] of per) { if (m > ERR || m < 0) { bad = true; console.log(`  ERROR render cost ${m < 0 ? 'timeout' : m + ' ms/frame'} @ ${x}s ${id} (budget ${ERR} ms)`); } else if (m > WARN) console.log(`  WARN render cost ${m} ms/frame @ ${x}s ${id} (aim < ${WARN} ms)`); }
}
await browser.close(); process.exit(bad ? 1 : 0);
