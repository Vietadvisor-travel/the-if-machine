// All pre-render gates in one command with a compact report (token-lean): lint in both formats, variety, director review.
//   node tools/gate.mjs stories/<slug>.story [--no-review]   → ≤ ~20 lines; the one contact sheet to look at: out/<slug>_sheet.jpg
import { spawnSync } from 'child_process'; import path from 'path';
const ep = process.argv[2], slug = path.basename(ep).replace(/\.\w+$/, ''), run = (args, t = 900000) => (spawnSync('node', args, { encoding: 'utf8', timeout: t }).stdout || '');
const lint = run(['tools/lint.mjs', ep, '--both']).split('\n'); const out = [];
lint.filter(l => /^\[(9x16|16x9)\]/.test(l)).forEach(l => out.push('lint ' + l.replace(/ · \d+ info/, '')));
let fmt = ''; const seen = new Map(); for (const l of lint) { const f = l.match(/^\[(9x16|16x9)\]/); if (f) fmt = f[1]; if (/\[variety/.test(l)) break; if (!/^\s+(ERROR|WARN)\s/.test(l) || /no camera move/.test(l)) continue; const k = l.trim().replace(/^\S+\s+[\d.]+s\s+/, '').replace(/\s+/g, ' '); seen.set(k, (seen.get(k) ? seen.get(k) + '+' : '') + fmt); }
const issues = [...seen].map(([k, f]) => `  [${f}] ${k}`); issues.slice(0, 10).forEach(l => out.push(l)); if (issues.length > 10) out.push(`  … ${issues.length - 10} more`);
const vi = lint.findIndex(l => /\[variety/.test(l)); if (vi >= 0) lint.slice(vi + 1).filter(l => /ERROR|WARN|clean/.test(l)).forEach(l => out.push('variety ' + l.trim().replace(/\s+/g, ' ')));
if (!process.argv.includes('--no-review')) { const r = run(['tools/review.mjs', ep]).split('\n'); const sc = r.find(l => /^SCORE/.test(l)); if (sc) out.push('review ' + sc); r.filter(l => /^\s+WARN/.test(l)).slice(0, 4).forEach(l => out.push('  ' + l.trim())); }
out.push(`sheet out/${slug}_sheet.jpg (both formats, one frame per beat)`);
const bad = out.some(l => /ERROR|\b[1-9]\d* errors/.test(l)) || out.some(l => /SCORE (\d+)/.test(l) && +l.match(/SCORE (\d+)/)[1] < 85);
console.log(out.join('\n') + '\n' + (bad ? 'GATE: FIX' : 'GATE: PASS')); process.exit(bad ? 1 : 0);
