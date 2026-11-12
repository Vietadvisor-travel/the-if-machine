// Clip script gate (studio/STORY.md): node tools/clip_check.mjs stories/<slug>.story  → PASS/FIX in ≤ 15 lines
import fs from 'fs';
const p = process.argv[2], t = fs.readFileSync(p, 'utf8'), E = [], Wn = [];
const hdr = Object.fromEntries((t.split(/\n\s*\n/)[0] || '').split('\n').map(l => l.match(/^([a-z0-9_]+):\s*(.*)$/i)).filter(Boolean).map(m => [m[1].toLowerCase(), m[2].trim()]));
const beats = []; let cur = null; t.split('\n').forEach(l => { if (/^#\s*vis\b/.test(l)) { cur = { vis: l, lines: [] }; beats.push(cur); } else if (cur && l.trim() && !/^\/\//.test(l) && !/^[a-z0-9_]+:\s/i.test(l)) cur.lines.push(l.trim()); });
const lines = beats.flatMap(b => b.lines), words = lines.join(' ').split(/\s+/).filter(Boolean).length, secs = words / 3.1;
if (!/^yes$/i.test(hdr.clip || '')) E.push('header needs "clip: yes"'); if ((hdr.voice || '') !== 'am_adam') Wn.push(`voice is "${hdr.voice}" (house voice: am_adam)`);
if (words < 140 || words > 200) E.push(`${words} words ≈ ${secs.toFixed(0)} s: aim 150–190 (50–65 s)`);
const first = (lines[0] || '').replace(/\*/g, ''); if (/^(what if|in this video|today|have you|did you know|imagine)/i.test(first)) E.push(`hook "${first.slice(0, 50)}…" starts with setup: open MID-ACTION, verb first`);
if (first.split(/\s+/).length > 22) Wn.push('hook line is long (> 22 words): cut it to the action');
const banned = /\b(incredible|you won'?t believe|shocking|insane|mind-?blowing|in this video|let'?s|follow for more)\b/i; lines.forEach(l => { const m = l.match(banned); if (m) E.push(`banned phrase "${m[0]}" in: ${l.slice(0, 60)}`); });
lines.forEach(l => { const n = l.replace(/\*/g, '').split(/\s+/).length; if (n > 24) Wn.push(`long sentence (${n} words): ${l.slice(0, 50)}…`); });
beats.forEach((b, i) => { if (!/act=(l3|x[0-9a-z_]*)/.test(b.vis)) E.push(`beat ${i + 1}: use act=l3 (or a bespoke x_ act)`); if (/act=l3/.test(b.vis) && !/\bcam=/.test(b.vis)) Wn.push(`beat ${i + 1}: no cam= (SIZE.angle.move)`); if (b.lines.length > 2) Wn.push(`beat ${i + 1}: ${b.lines.length} lines — one sentence per shot`); });
const cams = beats.map(b => (b.vis.match(/cam=(\S+)/) || [])[1]); cams.forEach((c, i) => { if (i && c && c === cams[i - 1]) Wn.push(`beat ${i + 1}: same camera as the beat before (${c})`); });
if (!hdr.sources) E.push('header needs sources: (the script file with numbered sources)');
console.log(`clip · ${p.split('/').pop()} · ${beats.length} shots · ${words} words ≈ ${secs.toFixed(0)} s`); E.forEach(m => console.log('  ERROR ' + m)); Wn.forEach(m => console.log('  WARN  ' + m)); console.log(E.length ? 'CLIP: FIX' : 'CLIP: PASS'); process.exit(E.length ? 1 : 0);
