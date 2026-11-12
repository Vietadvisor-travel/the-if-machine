// One gate for a 60 s clip: script rules + render cost (3D budget) + a contact sheet.  node tools/clip_gate.mjs stories/<slug>.story
import { spawnSync } from 'child_process'; import path from 'path';
const ep = process.argv[2], slug = path.basename(ep).replace(/\.\w+$/, ''), run = (args, env = {}) => { const r = spawnSync('node', args, { encoding: 'utf8', timeout: 3600000, env: { ...process.env, ...env } }); return (r.stdout || '') + (r.stderr || ''); };
const out = []; const cc = run(['tools/clip_check.mjs', ep]).trim().split('\n'); out.push(...cc);
const cost = run(['tools/cost.mjs', ep], { COST_ERR: '9000', COST_WARN: '6000', MOT: '4' }).split('\n').filter(l => /^cost|ERROR|frozen/.test(l)).slice(0, 8); out.push(...cost);
run(['tools/sheet.mjs', ep, 'v', '2']); out.push(`sheet out/${slug}_sheet_v.jpg`);
const bad = out.some(l => /ERROR|CLIP: FIX/.test(l)); console.log(out.join('\n') + '\n' + (bad ? 'GATE: FIX' : 'GATE: PASS')); process.exit(bad ? 1 : 0);
