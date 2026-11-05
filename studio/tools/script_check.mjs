// Director's script gate (owner, 4 Nov 2026: the director writes every shot first; the build follows it).
//   node tools/script_check.mjs ../jobs/scripts/<slug>.md
// Checks: every shot has all fields filled; spoken length 6–10 min (2.8 words/s); variety of camera moves, transitions and
// effects; no camera move or transition repeated in consecutive shots; a NEW bespoke build at least every 4 shots.
import fs from 'fs';
const src = fs.readFileSync(process.argv[2], 'utf8'), F = ['VO', 'LINK', 'PICTURE', 'ACTION', 'SHOT', 'CAMERA', 'LOOK', 'TIMELINE', 'TEXT', 'FX', 'SOUND', 'BUILD'];
const shots = src.split(/^### /m).slice(1).map(b => { const id = b.split('\n')[0].trim(), f = {}; for (const k of F) { const m = b.match(new RegExp('^- ' + k + ':\\s*(.*)$', 'm')); f[k] = m ? m[1].trim() : ''; } return { id, f }; });
const err = [], warn = []; if (!shots.length) err.push('no shots (### S01 · … blocks)');
shots.forEach(s => F.forEach(k => { if (!s.f[k] || s.f[k] === '…' || /^<.*>$/.test(s.f[k])) err.push(`${s.id.split(' ')[0]}: ${k} is empty`); }));
shots.forEach(s => { if (s.f.PICTURE && !/\/.+\/.+\//.test(s.f.PICTURE)) warn.push(`${s.id.split(' ')[0]}: PICTURE needs SUBJECT / BACKGROUND / FOREGROUND / LIFE`); });
const words = shots.reduce((n, s) => n + (s.f.VO.match(/[A-Za-z0-9'’$€%.,-]+/g) || []).length, 0), mins = words / 2.35 / 60;   // owner, 4 Nov 2026 evening: slower, with real pauses (≈ 2.35 words/s final)
if (mins < 5.9 || mins > 10.2) err.push(`spoken length ≈ ${mins.toFixed(1)} min from ${words} words: must be 6–10 min (≈ 850–1400 words)`);
const first = t => (String(t).toLowerCase().replace(/\b(slow|slowly|gentle|gently|smooth|smoothly|calm|soft|very|a|an|the)\b/g, ' ').match(/[a-z0-9-]+/) || [''])[0];
const cams = shots.map(s => first(s.f.CAMERA)), trs = shots.map(s => (s.f.FX.match(/trans(?:ition)?\s*[:=]?\s*([a-z0-9-]+)/i) || [])[1] || ''), fxs = shots.map(s => first(s.f.FX));
for (let i = 1; i < shots.length; i++) { if (cams[i] && cams[i] === cams[i - 1] && cams[i] === cams[i - 2]) warn.push(`${shots[i].id.split(' ')[0]}: camera "${cams[i]}" three times in a row`); if (trs[i] && trs[i] === trs[i - 1] && !['cut', 'fade', 'none'].includes(trs[i])) err.push(`${shots[i].id.split(' ')[0]}: transition "${trs[i]}" twice in a row`); }
const uniq = a => new Set(a.filter(Boolean)).size, n = shots.length;
if (uniq(cams) < Math.min(10, Math.ceil(n / 4))) warn.push(`only ${uniq(cams)} different camera moves for ${n} shots`);
if (uniq(trs) < Math.min(10, Math.ceil(n / 4))) warn.push(`only ${uniq(trs)} different transitions for ${n} shots (write "trans=<name>" in FX)`);
let gap = 0; shots.forEach(s => { gap = /NEW/.test(s.f.BUILD) ? 0 : gap + 1; if (gap === 5) warn.push(`${s.id.split(' ')[0]}: 5 shots in a row without a NEW bespoke picture`); });
if (!/HOOK/i.test(shots[0]?.id || '')) err.push('S01 must be the HOOK');
const CALM_TR = ['cut', 'fade', 'match', 'slide', 'ink', 'zoomthru', 'paper', 'iris', 'fold', 'liquid', 'cube', 'drop', 'zoom', 'flip3d', 'none'];
shots.forEach((s, i) => { const t = (s.f.FX.match(/trans(?:ition)?\s*[:=]?\s*([a-z0-9-]+)/i) || [])[1]; if (t && !CALM_TR.includes(t)) err.push(`${s.id.split(' ')[0]}: transition "${t}" — calm set only (${CALM_TR.join(' ')})`); if (/\b(flash|shake|glitch|chroma|strobe|speed lines|zoom blur|shock)\b/i.test(s.f.FX)) err.push(`${s.id.split(' ')[0]}: jerky/flashing effect in FX — owner: no glare, no flicker`); });
const fxUsed = shots.filter(s => !/^(none|trans=\w+;?\s*none|trans=\w+)$/i.test(s.f.FX.trim()) && !/^trans=\w+$/i.test(s.f.FX.trim())).length; if (fxUsed > Math.ceil(n / 4)) warn.push(`${fxUsed}/${n} shots carry an extra effect — keep effects for the few moments that need one`);
shots.forEach(s => { if (s.f.ACTION && !/\b(stand|sit|walk|hold|look|read|type|carry|point|lean|run|wait|open|turn|talk|nod|drive|ride|pick|put|push|pull|sleep|wake|cross|queue|sign|write|watch|listen|wave|gather|march|leave|enter|none)/i.test(s.f.ACTION)) warn.push(`${s.id.split(' ')[0]}: ACTION should say exactly what each person does, on what (chair, floor, desk), holding what`); });

// ---------------------------------------------------------------- shot grammar + content standard (studio/references/ifm-craft.md, 4 Nov 2026)
// SHOT: "WS high crane 3D | MCU eye push 2D | ECU top static 2.5D" — one entry per cut in the scene
const SZ = ['EWS', 'WS', 'MS', 'MCU', 'CU', 'ECU'], AN = ['eye', 'high', 'low', 'top', 'dutch', 'ots', 'pov'], MV = ['static', 'push', 'pull', 'trackl', 'trackr', 'track', 'pan', 'tilt', 'crane', 'drop', 'orbit', 'dolly'], MD = ['2d+3d', '3d+2d', '2d', '2.5d', '3d'];
const flat = []; let tsec = 0; shots.forEach(s => { const vo = (s.f.VO.match(/[A-Za-z0-9'’$€%.,-]+/g) || []).length / 2.35, parts = s.f.SHOT.split('|').map(x => x.trim()).filter(Boolean);
  parts.forEach((p, j) => { const t = p.split(/[\s·,]+/).map(x => x.toLowerCase()); const sz = SZ.find(z => t.includes(z.toLowerCase())), an = AN.find(a => t.includes(a)), mv = MV.find(m => t.includes(m)), md = MD.find(m => t.includes(m));
    if (!sz || !an || !mv || !md) err.push(`${s.id.split(' ')[0]}: SHOT "${p}" needs SIZE (${SZ.join(' ')}) · angle (${AN.join(' ')}) · move · medium (2D 2.5D 3D)`); flat.push({ id: s.id.split(' ')[0], sz, an, mv, md, t: tsec + vo * j / parts.length }); }); tsec += vo; });
for (let i = 2; i < flat.length; i++) if (flat[i].sz && flat[i].sz === flat[i - 1].sz && flat[i].sz === flat[i - 2].sz) warn.push(`${flat[i].id}: shot size ${flat[i].sz} three times in a row`);
for (let m = 0; m * 60 < tsec - 20; m++) { const w = flat.filter(f => f.t >= m * 60 && f.t < (m + 1) * 60); if (!w.length) continue; const an = new Set(w.map(f => f.an).filter(Boolean)).size;
  if (an < 4) warn.push(`minute ${m + 1}: only ${an} camera angles (aim ≥ 4)`); if (!w.some(f => f.md === '3d' || f.md === '2.5d')) err.push(`minute ${m + 1}: no 3D or 2.5D shot (craft §2: at least one per minute)`); if (!w.some(f => f.sz === 'CU' || f.sz === 'ECU')) warn.push(`minute ${m + 1}: no close-up/insert`); }
const is3 = f => /3d/.test(f.md || ''), share3 = flat.filter(is3).length / Math.max(1, flat.length); // owner 4 Nov 2026: 2D and 3D COMBINED, never all 3D
if (flat.length && share3 < .2) warn.push(`3D share ${(share3 * 100) | 0} % of cuts (aim 25–55 %)`); if (flat.length > 10 && share3 > .6) err.push(`3D share ${(share3 * 100) | 0} % of cuts — 2D and 3D combined, at most 60 % 3D`);
{ let run = 1; for (let i = 1; i < flat.length; i++) { run = (is3(flat[i]) === is3(flat[i - 1])) ? run + 1 : 1; if (run === 4) warn.push(`${flat[i].id}: 4 cuts in a row in ${is3(flat[i]) ? '3D' : '2D'} — alternate the media`); } }
const hyb = flat.filter(f => /\+/.test(f.md || '')).length; if (tsec > 240 && hyb < Math.floor(tsec / 120)) warn.push(`only ${hyb} hybrid 2D+3D shots (pins= labels on 3D, pip= inset, split= with s3): aim one every 2 minutes`);
if (shots.length > 12) { if (!shots.some(s => /\bmatch\b/i.test(s.f.FX + ' ' + s.f.LINK))) warn.push('no match cut (trans=match or a LINK that matches shape/position) — craft §2'); if (!shots.some(s => /montage/i.test(s.f.PICTURE + ' ' + s.f.SHOT + ' ' + s.f.BUILD))) warn.push('no montage (time passing) — craft §2'); }
const looks = new Set(shots.map(s => s.f.LOOK.toLowerCase().split(/[,;·]/)[0].trim()).filter(Boolean)); if (shots.length > 12 && looks.size < 4) warn.push(`only ${looks.size} different looks (LOOK: light / time of day / palette / mood) — vary the art direction`);
// content: cold open, what-people-say segment with labelled theories, payoff

shots.filter(s => /SAY|THEOR|MYTH|RUMOU?R/i.test(s.id)).forEach(s => { if (!/\b(theory|theories|claim|claims|rumou?r|some say|people say|online|believe|what we know|in fact|actually|evidence)\b/i.test(s.f.VO)) warn.push(`${s.id.split(' ')[0]}: label the theory as a theory and say what is known`); });


// second-by-second direction (owner, 4 Nov 2026: alive in every frame, every second; the director's script must be very detailed)
// TIMELINE: "0 wide city, lights on, camera starts orbit · 1.5 a window goes dark · 3 a car stops at the light · 4.5 cut CU phone …"
shots.forEach(s => { const dur = (s.f.VO.match(/[A-Za-z0-9'’$€%.,-]+/g) || []).length / 2.35, ev = String(s.f.TIMELINE).split(/\s*[·;|]\s*/).map(x => { const m = x.match(/^(\d+(?:\.\d+)?)s?\s+(.{3,})/); return m ? +m[1] : null; }).filter(x => x != null).sort((a, b) => a - b);
  const id = s.id.split(' ')[0]; if (!ev.length) { if (s.f.TIMELINE) err.push(`${id}: TIMELINE needs "<seconds> <what happens>" entries separated by ·`); return; }
  const need = Math.max(2, Math.ceil(dur / 4)); if (ev.length < need) err.push(`${id}: TIMELINE has ${ev.length} moments for ${dur.toFixed(1)} s — at least one every 4 s (${need})`);
  let gap = ev[0]; for (let i = 1; i < ev.length; i++) gap = Math.max(gap, ev[i] - ev[i - 1]); gap = Math.max(gap, dur - ev[ev.length - 1]); if (gap > 4.6) warn.push(`${id}: ${gap.toFixed(1)} s without a new moment in TIMELINE`); });

console.log(`script · ${n} shots · ${words} words ≈ ${mins.toFixed(1)} min · ${uniq(cams)} camera moves · ${uniq(trs)} transitions · ${shots.filter(s => /NEW/.test(s.f.BUILD)).length} new builds · ${flat.length} cuts · 3D ${(share3 * 100) | 0} %`);
// ---------------------------------------------------------------- neutral explainer (owner, 4 Nov 2026 evening: "no storyline; explain it normally; a real hook and ending")
{ const allVO = shots.map(x => x.f.VO).join(' '), wc = t => (t.match(/[A-Za-z0-9'’$€%.,-]+/g) || []).length;
  [[/\bMeet [A-Z][a-z]+/, '"Meet <Name>": no invented protagonist'], [/\bour (imagined|imaginary|simulated)\b/i, '"our imagined …": no simulation plot'], [/\bDay one\b/i, '"Day one": no simulation plot'], [/\bLet'?s run it\b/i, '"Let\'s run it": no simulation framing']]
    .forEach(([re, msg]) => { if (re.test(allVO)) err.push(`content: ${msg} — explain the question plainly (EPISODE.md §00)`); });
  const real = new Set(((src.match(/^REAL:\s*(.*)$/m) || [])[1] || '').split(/[,;]\s*/).map(x => x.trim().toLowerCase()).filter(Boolean)), STOP = new Set('The This That These Those What When Where Why How Who Which Then And But Not Our Your You It Its In On At For From With Without Within Each Every Some Most Many More One Two Three First Second Third Next Last Today Tomorrow Yes No So If Or Because Imagine Here There'.split(' '));
  const cnt = {}; for (const m of allVO.matchAll(/(?<![.!?:]\s)(?<!^)\b([A-Z][a-z]{2,})\b/g)) { if (!STOP.has(m[1])) cnt[m[1]] = (cnt[m[1]] || 0) + 1; }
  Object.entries(cnt).filter(([n, k]) => k >= 3 && !real.has(n.toLowerCase())).forEach(([n, k]) => err.push(`content: "${n}" appears ${k}× — a recurring character? No invented protagonist. If it is a real person or place, list it on a "REAL: …" line at the top of the script`));
  const hook = shots.filter(x => /HOOK/i.test(x.id)), hw = hook.reduce((a, x) => a + wc(x.f.VO), 0); if (hw < 30) err.push(`HOOK has ${hw} words (≈ ${(hw / 2.35).toFixed(0)} s): set up the question, a surprising fact, why it matters, what the video answers (15–25 s, ≥ 30 words)`); if (!/\?/.test(hook.map(x => x.f.VO).join(' '))) err.push('HOOK must ask the question (a "?")');
  const end = shots.filter(x => /CONCLUSION|RECAP|ANSWER|PAYOFF/i.test(x.id)), ew = end.reduce((a, x) => a + wc(x.f.VO), 0); if (ew < 55) err.push(`CONCLUSION has ${ew} words (≈ ${(ew / 2.35).toFixed(0)} s): recap the key ideas, give the answer in one sentence, a closing thought (25–45 s, ≥ 55 words, shot ids CONCLUSION/RECAP/ANSWER)`);
  const secs = shots.filter(x => /SECTION|CHAPTER/i.test(x.id)).length; if (secs < 3) warn.push(`only ${secs} section cards (shot ids SECTION/CHAPTER, act ex_chapter): open each of the 3–5 sections with one`);
  const fast = shots.filter(x => wc(x.f.VO) > 40); if (fast.length) warn.push(`${fast.length} shots carry > 40 words: one idea per beat, split them`); }
err.slice(0, 25).forEach(e => console.log('  ERROR ' + e)); warn.slice(0, 12).forEach(w => console.log('  WARN  ' + w)); console.log(err.length ? 'SCRIPT: FIX' : 'SCRIPT: PASS'); process.exit(err.length ? 1 : 0);
