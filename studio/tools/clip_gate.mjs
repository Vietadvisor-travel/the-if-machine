// One gate for a 60 s clip: script rules + render cost (3D budget) + a contact sheet.  node tools/clip_gate.mjs stories/<slug>.story
import { spawnSync } from 'child_process'; import path from 'path';
const ep = process.argv[2], slug = path.basename(ep).replace(/\.\w+$/, ''), run = (args, env = {}) => { const r = spawnSync('node', args, { encoding: 'utf8', timeout: 3600000, env: { ...process.env, ...env } }); return (r.stdout || '') + (r.stderr || ''); };
const out = []; const cc = run(['tools/clip_check.mjs', ep]).trim().split('\n'); out.push(...cc);
// real voice + sound BEFORE any frame (owner, 12 Nov 2026: measure first, render once): real length (info: ≈ 60 s is a target, never
// a reason to re-render) and every sound the story names must exist (an unknown sound is silently dropped by the mix)
{ const au = run(['tools/make.mjs', ep, '--audio-only', '--skip-lint', '--skip-review', '--speed', '1.0']); const len = (au.match(/real length ([\d.]+) s/) || [])[1], unk = ((au.match(/unknown: \[([^\]]*)\]/) || [])[1] || '').trim();
  out.push(len ? `audio  real length ${len} s (target 1:30–2:00, info only) · mix ready → render with --reuse-mix` : '  ERROR audio-only failed: ' + au.split('\n').filter(l => /FAIL|Error/.test(l)).slice(0, 2).join(' | '));
  if (unk) out.push(`  ERROR unknown sounds (dropped from the mix): ${unk} — use sfx="<t>:<name>:<gain>" with names from python3 tools/sfx_pro.py list`);
  au.split('\n').filter(l => /^\s*FAIL /.test(l)).slice(0, 3).forEach(l => out.push('  WARN  sound QA ' + l.trim()));
  const tk = spawnSync('python3', ['tools/music_ticks.py', `out/${slug}_music.wav`], { encoding: 'utf8' }); if (tk.status === 1) out.push(`  ERROR ${tk.stdout.trim()} — the bed ticks under the voice (owner, 13 Nov 2026): pick a pad/ambient track in score:`); }
const cost = run(['tools/cost.mjs', ep], { COST_ERR: '9000', COST_WARN: '6000', MOT: '4' }).split('\n').filter(l => /^cost|ERROR|frozen/.test(l)).slice(0, 8); out.push(...cost);
run(['tools/sheet.mjs', ep, 'v', '2']); out.push(`sheet out/${slug}_sheet_v.jpg`);
const bad = out.some(l => /ERROR|CLIP: FIX/.test(l)); console.log(out.join('\n') + '\n' + (bad ? 'GATE: FIX' : 'GATE: PASS')); process.exit(bad ? 1 : 0);
