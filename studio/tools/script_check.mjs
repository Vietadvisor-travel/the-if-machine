// Director's script gate (owner, 4 Nov 2026: the director writes every shot first; the build follows it).
//   node tools/script_check.mjs ../jobs/scripts/<slug>.md
// Checks: every shot has all fields filled; spoken length 6–10 min (2.8 words/s); variety of camera moves, transitions and
// effects; no camera move or transition repeated in consecutive shots; a NEW bespoke build at least every 4 shots.
import fs from 'fs';
const src = fs.readFileSync(process.argv[2], 'utf8'), F = ['VO', 'LINK', 'PICTURE', 'ACTION', 'CAMERA', 'TEXT', 'FX', 'SOUND', 'BUILD'];
const shots = src.split(/^### /m).slice(1).map(b => { const id = b.split('\n')[0].trim(), f = {}; for (const k of F) { const m = b.match(new RegExp('^- ' + k + ':\\s*(.*)$', 'm')); f[k] = m ? m[1].trim() : ''; } return { id, f }; });
const err = [], warn = []; if (!shots.length) err.push('no shots (### S01 · … blocks)');
shots.forEach(s => F.forEach(k => { if (!s.f[k] || s.f[k] === '…' || /^<.*>$/.test(s.f[k])) err.push(`${s.id.split(' ')[0]}: ${k} is empty`); }));
shots.forEach(s => { if (s.f.PICTURE && !/\/.+\/.+\//.test(s.f.PICTURE)) warn.push(`${s.id.split(' ')[0]}: PICTURE needs SUBJECT / BACKGROUND / FOREGROUND / LIFE`); });
const words = shots.reduce((n, s) => n + (s.f.VO.match(/[A-Za-z0-9'’$€%.,-]+/g) || []).length, 0), mins = words / 2.35 / 60;
if (mins < 5.9 || mins > 10.2) err.push(`spoken length ≈ ${mins.toFixed(1)} min from ${words} words: must be 6–10 min (≈ 1000–1700 words)`);
const first = t => (String(t).toLowerCase().replace(/\b(slow|slowly|gentle|gently|smooth|smoothly|calm|soft|very|a|an|the)\b/g, ' ').match(/[a-z0-9-]+/) || [''])[0];
const cams = shots.map(s => first(s.f.CAMERA)), trs = shots.map(s => (s.f.FX.match(/trans(?:ition)?\s*[:=]?\s*([a-z0-9-]+)/i) || [])[1] || ''), fxs = shots.map(s => first(s.f.FX));
for (let i = 1; i < shots.length; i++) { if (cams[i] && cams[i] === cams[i - 1] && cams[i] === cams[i - 2]) warn.push(`${shots[i].id.split(' ')[0]}: camera "${cams[i]}" three times in a row`); if (trs[i] && trs[i] === trs[i - 1] && !['cut', 'fade', 'none'].includes(trs[i])) err.push(`${shots[i].id.split(' ')[0]}: transition "${trs[i]}" twice in a row`); }
const uniq = a => new Set(a.filter(Boolean)).size, n = shots.length;
if (uniq(cams) < Math.min(10, Math.ceil(n / 4))) warn.push(`only ${uniq(cams)} different camera moves for ${n} shots`);
if (uniq(trs) < Math.min(10, Math.ceil(n / 4))) warn.push(`only ${uniq(trs)} different transitions for ${n} shots (write "trans=<name>" in FX)`);
let gap = 0; shots.forEach(s => { gap = /NEW/.test(s.f.BUILD) ? 0 : gap + 1; if (gap === 5) warn.push(`${s.id.split(' ')[0]}: 5 shots in a row without a NEW bespoke picture`); });
if (!/HOOK/i.test(shots[0]?.id || '')) err.push('S01 must be the HOOK');
const CALM_TR = ['cut', 'fade', 'match', 'slide', 'ink', 'zoomthru', 'paper', 'iris', 'fold', 'liquid', 'cube', 'stripes2', 'blobs', 'drop', 'zoom', 'flip3d', 'none'];
shots.forEach((s, i) => { const t = (s.f.FX.match(/trans(?:ition)?\s*[:=]?\s*([a-z0-9-]+)/i) || [])[1]; if (t && !CALM_TR.includes(t)) err.push(`${s.id.split(' ')[0]}: transition "${t}" — calm set only (${CALM_TR.join(' ')})`); if (/\b(flash|shake|glitch|chroma|strobe|speed lines|zoom blur|shock)\b/i.test(s.f.FX)) err.push(`${s.id.split(' ')[0]}: jerky/flashing effect in FX — owner: no glare, no flicker`); });
const fxUsed = shots.filter(s => !/^(none|trans=\w+;?\s*none|trans=\w+)$/i.test(s.f.FX.trim()) && !/^trans=\w+$/i.test(s.f.FX.trim())).length; if (fxUsed > Math.ceil(n / 4)) warn.push(`${fxUsed}/${n} shots carry an extra effect — keep effects for the few moments that need one`);
shots.forEach(s => { if (s.f.ACTION && !/\b(stand|sit|walk|hold|look|read|type|carry|point|lean|run|wait|open|turn|talk|nod|drive|ride|pick|put|push|pull|sleep|wake|cross|queue|sign|write|watch|listen|wave|gather|march|leave|enter|none)/i.test(s.f.ACTION)) warn.push(`${s.id.split(' ')[0]}: ACTION should say exactly what each person does, on what (chair, floor, desk), holding what`); });

console.log(`script · ${n} shots · ${words} words ≈ ${mins.toFixed(1)} min · ${uniq(cams)} camera moves · ${uniq(trs)} transitions · ${shots.filter(s => /NEW/.test(s.f.BUILD)).length} new builds`);
err.slice(0, 25).forEach(e => console.log('  ERROR ' + e)); warn.slice(0, 12).forEach(w => console.log('  WARN  ' + w)); console.log(err.length ? 'SCRIPT: FIX' : 'SCRIPT: PASS'); process.exit(err.length ? 1 : 0);
