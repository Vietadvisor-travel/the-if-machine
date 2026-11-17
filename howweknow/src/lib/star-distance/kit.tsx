// star-distance — shared drawing helpers for this film's own drawings (style core only: Region / Ink / Line / Stipple). Light from the upper right.
import React from 'react';
import { Region, Ink, Line, Stipple, SEP, ell, poly, seq } from '../../paint/paint';
export { Region, Ink, Line, Stipple, SEP, ell, poly, seq };
export type N = number; export type Pt = [N, N];
export const f1 = (v: N) => +v.toFixed(1);
export const cl = (x: N, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const ph = (d: N, a: N, b: N) => cl((d - a) / (b - a));
export const lerp = (a: N, b: N, k: N) => a + (b - a) * k;
export const rect = (x: N, y: N, w: N, h: N) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
export const rr = (x: N, y: N, w: N, h: N, r: N) => `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y}Z`;
export const circ = (x: N, y: N, r: N) => ell(x, y, r, r);
export const pathOf = (pts: Pt[], close = false) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (close ? 'Z' : '');
// a seeded random 0..1 (stable across frames)
export const rnd = (seed: N) => { const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
// hatching in the shade (lower-left) of a form, as in the house style
export const Shade: React.FC<{ d: string; draw?: N; ang?: N; a?: N; lvl?: N }> = ({ d, draw = 1, ang = 45, a = .5, lvl = 2 }) => {
  const p = cl((draw - .6) / .4); if (p <= 0) return null; const A = (((Math.round(ang / 15) * 15) % 180) + 180) % 180;
  return <g><defs><clipPath id="sdA" clipPathUnits="objectBoundingBox"><path d="M0 .2 L.8 1 L0 1Z" /></clipPath><clipPath id="sdB" clipPathUnits="objectBoundingBox"><path d="M0 .52 L.48 1 L0 1Z" /></clipPath></defs>
    <path d={d} fill={`url(#h1_${A})`} clipPath="url(#sdA)" opacity={a * p} /><path d={d} fill={`url(#h${Math.max(2, lvl)}_${(A + 90) % 180})`} clipPath="url(#sdB)" opacity={a * .8 * p} /></g>;
};
const NOSHADE = new Set(['paper', 'ice', 'inner', 'water', 'gold', 'night', 'space']);
export const SR: React.FC<any> = (pr) => <><Region {...pr} />{pr.hatch !== 0 && !NOSHADE.has(pr.mat) && (pr.a ?? 1) >= 1 && <Shade d={pr.d} draw={pr.draw} ang={(pr.ang ?? 0) + 60} a={.42} lvl={(pr.t ?? .3) > .6 ? 3 : 2} />}</>;
// a polished sphere (brass knob, planet): wash + curved contour hatching + a paper-white highlight upper right
export const Ball: React.FC<{ x: N; y: N; r: N; mat?: string; t?: N; draw?: N; col?: string; hi?: N; sw?: N }> = ({ x, y, r, mat = 'brass', t = .4, draw = 1, col, hi = 1, sw = 1.2 }) => {
  const id = `sdb${Math.round(x)}_${Math.round(y)}_${Math.round(r)}`;
  return <g>
    <Region d={circ(x, y, r)} mat={mat} t={t} color={col} draw={draw} sw={sw} hatch={0} />
    {draw > .6 && <g opacity={ph(draw, .6, 1)}><defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>{Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={x + r * .55} cy={y - r * .55} rx={r * (1.05 + i * .15)} ry={r * (1.05 + i * .15)} fill="none" stroke={SEP} strokeWidth={Math.max(.4, r / 50)} opacity={.12 + i * .05} />)}</g>
      <ellipse cx={x + r * .38} cy={y - r * .4} rx={r * .22} ry={r * .14} fill="#FFFDF4" opacity={.8 * hi} transform={`rotate(-35 ${x + r * .38} ${y - r * .4})`} /></g>}
  </g>;
};
// a STAR as an engraver draws it: a tiny inked dot with a paper-white core; bright ones get four fine rays and a soft glow
export const Star: React.FC<{ x: N; y: N; r: N; a?: N; glow?: N; rays?: N; col?: string }> = ({ x, y, r, a = 1, glow = 0, rays = 0, col = '#FFF4D2' }) => (
  <g opacity={a}>
    {glow > 0 && <circle cx={x} cy={y} r={r * 5} fill="url(#glowW)" opacity={glow * .55} />}
    {rays > 0 && <path d={`M${x - r * 4.5} ${y} H${x + r * 4.5} M${x} ${y - r * 4.5} V${y + r * 4.5}`} stroke={col} strokeWidth={Math.max(.5, r * .28)} opacity={rays * .7} strokeLinecap="round" />}
    <circle cx={x} cy={y} r={r * 1.25} fill={SEP} opacity={.55} /><circle cx={x} cy={y} r={r} fill={col} />
  </g>);
// a seeded field of stars in a box: [x, y, r] (r 0.6–3), denser and smaller toward the faint end
export const starField = (seed: N, n: N, x: N, y: N, w: N, h: N, rmax = 2.6): [N, N, N][] =>
  Array.from({ length: n }, (_, i) => { const m = Math.pow(rnd(seed + i * 3.7), 3.2); return [x + rnd(seed + i * 1.3) * w, y + rnd(seed + i * 2.1) * h, .6 + m * (rmax - .6)] as [N, N, N]; });
// night: a deep graded indigo (never #000) with stipple, as STYLE.md asks
export const NightWash: React.FC<{ x: N; y: N; w: N; h: N; seed?: string; a?: N; top?: string; bot?: string }> = ({ x, y, w, h, seed = 'nw', a = 1, top = '#141C38', bot = '#2B3B66' }) => {
  const id = 'nwg' + seed;
  return <g opacity={a}><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bot} /></linearGradient></defs>
    <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} /><Stipple x={x} y={y} w={w} h={h} n={Math.round(w * h / 2600)} seed={seed} col="#0B1030" a={.35} /></g>;
};
// a cast contact shadow (soft), for anything on a floor or a table
export const Floor: React.FC<{ x: N; y: N; rx: N; ry: N; a?: N }> = ({ x, y, rx, ry, a = .3 }) => <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={SEP} opacity={a} filter="url(#b8)" />;
// hand-lettering in the scene (only the house faces: IM Fell for print, La Belle Aurore for a hand)
export const Hand: React.FC<{ x: N; y: N; s: N; t: string; col?: string; a?: N; rot?: N; anchor?: string; font?: string }> = ({ x, y, s, t, col = SEP, a = 1, rot = 0, anchor = 'middle', font = "'La Belle Aurore', cursive" }) =>
  <text x={x} y={y} fontSize={s} fill={col} opacity={a} textAnchor={anchor} fontFamily={font} transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}>{t}</text>;
export const Fell: React.FC<{ x: N; y: N; s: N; t: string; col?: string; a?: N; anchor?: string; italic?: boolean; sc?: boolean; rot?: N }> = ({ x, y, s, t, col = SEP, a = 1, anchor = 'middle', italic, sc, rot = 0 }) =>
  <text x={x} y={y} fontSize={s} fill={col} opacity={a} textAnchor={anchor} fontStyle={italic ? 'italic' : undefined}
    fontFamily={sc ? "'IM Fell English SC', serif" : italic ? "'IM Fell DW Pica', serif" : "'IM Fell English', serif"} transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}>{t}</text>;
