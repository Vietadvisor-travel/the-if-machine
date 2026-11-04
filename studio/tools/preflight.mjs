// Preflight (owner, 4 Nov 2026: "small mistakes keep forcing re-renders — there must be a control mechanism").
// Runs automatically in make.mjs before any voice or frame work; fails fast (exit 1) instead of rendering something wrong.
//   node tools/preflight.mjs stories/<slug>.story
// Checks: every beat's act exists (no silent fallback picture); the voice lines the engine collects match the caption lines
// in the story one for one; the calm house look is active (no bloom, calm transitions, no flashing dir= effects);
// every scene renders a frame without throwing.
import { launch } from './browser.mjs'; import fs from 'fs';
const ep = process.argv[2]; const txt = fs.readFileSync(ep, 'utf8'); const errs = [], notes = [];
const browser = await launch(); const page = await browser.newPage(); const pageErr = []; page.on('pageerror', e => pageErr.push(e.message));
await page.goto('file://' + process.cwd() + '/studio.html'); await page.evaluate(() => window.READY);
const r = await page.evaluate((t) => { const out = { unknown: [], throws: [] };
  const acts = [...t.matchAll(/^#\s*vis\b[^\n]*?\bact=(\w+)/gm)].map(m => m[1]), then = [...t.matchAll(/act=(\w+)@/g)].map(m => m[1]), scenes = [...t.matchAll(/scene="(\w+)/g)].map(m => m[1]);
  [...acts, ...then, ...scenes].forEach(a => { if (!(IFM.ACT && IFM.ACT[a]) && !['hook'].includes(a)) out.unknown.push(a); });
  SB.compile(t, { collect: 1 }); out.lines = (SB._lines || []).map(l => l.text);
  const epi = SB.compile(t); out.calm = IFM.calm; out.grade = epi.look && epi.look.grade; out.bloom = (typeof GRADES !== 'undefined' && GRADES[out.grade]) ? GRADES[out.grade].bloom : null;
  out.trans = epi.scenes.map(s => s.transition && s.transition.type).filter(Boolean); out.CALM = IFM.CALM_TR || [];
  const c = document.getElementById('c'); c.width = 270; c.height = 480; W = 270; H = 480; ctx = c.getContext('2d'); loadEpisode(epi); let t0 = 0;
  epi.scenes.forEach((s, i) => { const mid = t0 + s.dur / 2; try { renderEpisode(mid); } catch (e) { out.throws.push(`${s.id} @${mid.toFixed(1)}s: ${e.message}`); } t0 += s.dur; });
  return out; }, txt);
await browser.close();
// caption lines in the story text (after the header, non-comment, non-beat lines)
const body = txt.split('\n'); let started = false; const storyLines = []; for (const ln of body) { const s = ln.trim(); if (/^#\s*\w/.test(s)) { started = true; continue; } if (!started || !s || s.startsWith('//')) continue; storyLines.push(s.replace(/^[A-Z][A-Za-z0-9]{1,11}:\s+/, '')); }
if (r.unknown.length) errs.push(`unknown act(s): ${[...new Set(r.unknown)].join(', ')} — the engine would silently draw a fallback picture`);
if (!r.lines.length) errs.push('no voice lines collected — the render would reuse an old voice track');
else if (r.lines.length !== storyLines.length) errs.push(`voice lines collected (${r.lines.length}) ≠ caption lines in the story (${storyLines.length})`);
else { const bad = r.lines.findIndex((l, i) => l.replace(/[\*\[\]]/g, '').trim() !== storyLines[i].replace(/[\*\[\]]/g, '').trim()); if (bad >= 0) errs.push(`voice line ${bad + 1} differs from the story: "${r.lines[bad]}" vs "${storyLines[bad]}"`); }
if (!/^calm\s*:\s*off\b/m.test(txt)) { if (!r.calm) errs.push('calm house look is not active (ifm_calm.js not loaded?)'); if (r.bloom) errs.push(`grade "${r.grade}" has bloom ${r.bloom} — glare`); const odd = r.trans.filter(t => !r.CALM.includes(t)); if (odd.length) errs.push(`transitions outside the calm set: ${[...new Set(odd)].join(', ')}`); }
if (r.throws.length) errs.push(`scene(s) throw while drawing:\n    ${r.throws.slice(0, 6).join('\n    ')}`);
if (pageErr.length) notes.push(`page errors: ${[...new Set(pageErr)].slice(0, 3).join(' | ')}`);
console.log(`preflight · ${r.lines.length} voice lines · ${r.trans.length} transitions · grade ${r.grade} (bloom ${r.bloom}) · ${errs.length ? 'FAIL' : 'OK'}`);
errs.forEach(e => console.log('  ERROR ' + e)); notes.forEach(n => console.log('  NOTE  ' + n)); process.exit(errs.length ? 1 : 0);
