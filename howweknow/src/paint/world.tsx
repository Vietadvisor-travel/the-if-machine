// FATHOM world library — everything drawn in the signature style (STYLE.md §4: real construction, never placeholder shapes).
// Every component takes `draw` (0..1, ink-on animation) where it makes sense; sizes are in px of the 1920×1080 frame.
import React, { useMemo } from 'react';
import { Img, staticFile } from 'remotion';
import { geoOrthographic, geoEquirectangular, geoPath, geoGraticule10 } from 'd3-geo';
import land50 from '../data/land50.json';
import coast50 from '../data/coast50.json';
import rivers50 from '../data/rivers50.json';
import { Region, Ink, Line, Stipple, Contour, SEP, PIG, tone, mix, ell, poly, seq } from './paint';

type N = number;
const W = 1920, H = 1080;
const band = (a: N, b: N) => ({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[...Array.from({ length: 37 }, (_, i) => [-180 + i * 10, b]), ...Array.from({ length: 37 }, (_, i) => [180 - i * 10, a]), [-180, b]]] } });

// ---------------------------------------------------------------- paper: the sheet under everything, the fibres over everything
export const PaperSheet: React.FC = () => <Img src={staticFile('core/paper.jpg')} style={{ position: 'absolute', inset: 0, width: W, height: H }} />;
export const PaperFibres: React.FC<{ a?: number }> = ({ a = 1 }) => <Img src={staticFile('core/fibres.jpg')} style={{ position: 'absolute', inset: 0, width: W, height: H, mixBlendMode: 'multiply', opacity: a }} />;

// ---------------------------------------------------------------- skies: graded wash + stipple (+ inked stars at night)
const SKY: Record<string, string[]> = { day: ['#7FA8C4', '#C9DDE6', '#F3DCB0'], dusk: ['#2B3B66', '#B58AA0', '#F2B98A'], night: ['#141C38', '#2B3B66', '#5A6E9A'], space: ['#0B1030', '#1C2650', '#2B3B66'], dawn: ['#5A6E9A', '#E9C9A8', '#F6E2B8'] };
export const Sky: React.FC<{ kind?: string; h?: N; seed?: string; stars?: N }> = ({ kind = 'day', h = H, seed = 'sky', stars }) => {
  const g = SKY[kind] || SKY.day, id = `sk_${kind}`, dark = kind === 'night' || kind === 'space';
  return <g><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={g[0]} /><stop offset=".6" stopColor={g[1]} /><stop offset="1" stopColor={g[2]} /></linearGradient></defs>
    <rect width={W} height={h} fill={`url(#${id})`} filter="url(#wc)" />
    <Stipple x={0} y={0} w={W} h={h} n={dark ? 9000 : 5200} seed={seed} dens={(u, v) => dark ? .5 : Math.pow(1 - v, 1.6) * .9} col={dark ? '#0B1030' : '#3A2A1A'} r0={.4} a={dark ? .5 : .4} />
    {dark && <Stars n={stars ?? 160} h={h} seed={seed + 's'} />}</g>;
};
export const Stars: React.FC<{ n: N; h?: N; seed: string }> = ({ n, h = H, seed }) => {
  const S = useMemo(() => { const q = seq(seed); return Array.from({ length: n }, () => [q() * W, q() * h, q() < .06 ? 2.6 : .9 + q() * 1.2]); }, [n, h, seed]);
  return <g>{S.map(([x, y, r], i) => <g key={i}><circle cx={x} cy={y} r={r + .7} fill={SEP} opacity={.5} /><circle cx={x} cy={y} r={r} fill="#FBF1D8" />{r > 2 && <path d={`M${x - r * 3} ${y} H${x + r * 3} M${x} ${y - r * 3} V${y + r * 3}`} stroke="#FBF1D8" strokeWidth={.8} opacity={.8} />}</g>)}</g>;
};

// ---------------------------------------------------------------- the Sun (gold leaf, engraved rays), the Moon (phases, maria, craters)
export const Sun: React.FC<{ x: N; y: N; r: N; draw?: N; glow?: N }> = ({ x, y, r, draw = 1, glow = 1 }) => (
  <g><circle cx={x} cy={y} r={r * 5} fill="url(#glowW)" opacity={.7 * glow * draw} />
    {Array.from({ length: 48 }, (_, i) => { const a = i / 48 * Math.PI * 2, L = i % 2 ? 1.9 : 2.7; return <Line key={i} d={`M${x + Math.cos(a) * r * 1.25} ${y + Math.sin(a) * r * 1.25} L${x + Math.cos(a) * r * L} ${y + Math.sin(a) * r * L}`} w={.9} a={.65} draw={draw} />; })}
    <Region d={ell(x, y, r, r)} mat="gold" t={.2} sw={1.6} draw={draw} /></g>);
export const Moon: React.FC<{ x: N; y: N; r: N; phase?: N; draw?: N; id?: string }> = ({ x, y, r, phase = 1, draw = 1, id = 'moon' }) => {
  const C = useMemo(() => { const q = seq('craters'); return Array.from({ length: 18 }, () => { const a = q() * 6.28, d = Math.sqrt(q()) * .78; return [Math.cos(a) * d, Math.sin(a) * d, .04 + q() * q() * .13]; }); }, []);
  const maria = [[-.28, -.22, .34, .22, -20], [.12, -.36, .22, .14, 10], [-.05, .14, .2, .27, 30], [.32, .06, .16, .2, -10]];
  const sh = 1 - phase;   // 0 = full; 1 = new (shadow from the left)
  return <g><circle cx={x} cy={y} r={r * 2.1} fill="url(#glowW)" opacity={.45 * draw} />
    <Region d={ell(x, y, r, r)} mat="paper" t={.12} sw={1.5} draw={draw} />
    <g opacity={draw}>{maria.map(([a, b, rx, ry, rot], i) => <ellipse key={i} cx={x + a * r} cy={y + b * r} rx={rx * r} ry={ry * r} fill={tone('stone', .55)} opacity={.45} transform={`rotate(${rot} ${x + a * r} ${y + b * r})`} filter="url(#wc)" />)}
      {C.map(([a, b, s], i) => <g key={i}><circle cx={x + a * r} cy={y + b * r} r={s * r} fill={tone('stone', .35)} opacity={.6} /><path d={`M${x + a * r - s * r * .7} ${y + b * r + s * r * .5} A${s * r} ${s * r} 0 0 0 ${x + a * r + s * r * .8} ${y + b * r - s * r * .4}`} fill="none" stroke={SEP} strokeWidth={Math.max(.6, s * r * .08)} opacity={.7} /></g>)}
      {sh > .02 && <path d={`M${x} ${y - r} A${r} ${r} 0 0 0 ${x} ${y + r} A${r * Math.abs(1 - sh * 2)} ${r} 0 0 ${sh < .5 ? 1 : 0} ${x} ${y - r}Z`} fill="#22305A" opacity={.72} />}
      <Contour cx={x} cy={y} r={r} side={-1} k={.3 + sh * .4} id={id + 'c'} a={.5} /></g></g>;
};

// ---------------------------------------------------------------- THE EARTH: real coastlines, land coloured by climate, sea deeper offshore, clouds, contour-hatched night, atmosphere
export const Earth: React.FC<{ cx: N; cy: N; r: N; lon?: N; lat?: N; clouds?: N; draw?: N; night?: N; id?: string }> = ({ cx, cy, r, lon = 0, lat = 20, clouds = 1, draw = 1, night = 1, id = 'earth' }) => {
  const proj = geoOrthographic().scale(r).translate([cx, cy]).rotate([-lon, -lat]).clipAngle(90), path = geoPath(proj);
  const P = useMemo(() => ({ land: path(land50 as never) || '', coast: path(coast50 as never) || '', grat: path(geoGraticule10()) || '',
    desertN: path(band(14, 32) as never) || '', desertS: path(band(-32, -18) as never) || '', rain: path(band(-9, 9) as never) || '', boreal: path(band(50, 66) as never) || '', iceN: path(band(66, 89.9) as never) || '', iceS: path(band(-89.9, -62) as never) || '' }),
    [cx, cy, r, lon, lat]);   // eslint-disable-line
  const cl = useMemo(() => { const q = seq('clouds'); return Array.from({ length: 10 }, () => { const x = (q() - .5) * 1.6, y = (q() - .5) * 1.6, w = .045 + q() * .06, n = 3 + Math.floor(q() * 3);
    return { x, y, lobes: Array.from({ length: n }, (_, j) => [x + (j - n / 2) * w * .9 + (q() - .5) * w * .3, y + (q() - .5) * w * .25, w * (.55 + q() * .35)]) }; }); }, []);
  const k = Math.max(.6, r / 400), dW = Math.min(1, draw * 1.4);
  return <g>
    <defs><clipPath id={id + 'g'}><circle cx={cx} cy={cy} r={r} /></clipPath><clipPath id={id + 'l'}><path d={P.land} /></clipPath>
      <radialGradient id={id + 's'} cx=".42" cy=".38" r=".75"><stop offset="0" stopColor={PIG.sea[0]} /><stop offset=".6" stopColor={PIG.sea[1]} /><stop offset="1" stopColor={PIG.sea[2]} /></radialGradient>
      <radialGradient id={id + 'a'}><stop offset=".9" stopColor="#9CCAD6" stopOpacity={0} /><stop offset=".965" stopColor="#9CCAD6" stopOpacity={.55} /><stop offset="1" stopColor="#9CCAD6" stopOpacity={0} /></radialGradient></defs>
    <circle cx={cx} cy={cy} r={r * 1.07} fill={`url(#${id}a)`} opacity={dW} />
    <g clipPath={`url(#${id}g)`} opacity={dW}>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}s)`} filter="url(#wc)" />
      {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${cx - r} ${cy - r + i * r / 15} H${cx + r}`} stroke={PIG.sea[2]} strokeWidth={.7} opacity={.18} />)}
      <path d={P.coast} fill="none" stroke={PIG.sea[0]} strokeWidth={10 * k} opacity={.35} filter="url(#b2s)" />
      <path d={P.land} fill={PIG.land[1]} transform={`translate(${2 * k} ${-1.4 * k})`} filter="url(#wc)" />
      <g clipPath={`url(#${id}l)`} transform={`translate(${2 * k} ${-1.4 * k})`}>
        <path d={P.boreal} fill={PIG.forest[1]} opacity={.75} filter="url(#b8)" /><path d={P.rain} fill={PIG.forest[2]} opacity={.6} filter="url(#b8)" />
        <path d={P.desertN} fill={PIG.desert[1]} opacity={.85} filter="url(#b8)" /><path d={P.desertS} fill={PIG.desert[1]} opacity={.7} filter="url(#b8)" />
        <path d={P.iceN} fill={PIG.ice[0]} opacity={.9} filter="url(#b8)" /><path d={P.iceS} fill={PIG.ice[0]} opacity={.95} filter="url(#b8)" /></g>
      <path d={P.grat} fill="none" stroke={SEP} strokeWidth={.5} opacity={.25} />
      {clouds > 0 && <g opacity={.65 * clouds}>{cl.map((c, i) => { const vis = Math.hypot(c.x, c.y) < .95; if (!vis) return null; return <g key={i}>
        {c.lobes.map(([a2, b2, w2], j) => <ellipse key={j} cx={cx + a2 * r} cy={cy + b2 * r} rx={w2 * r} ry={w2 * r * .55} fill="#FBF6EA" opacity={.85} filter="url(#wc)" />)}
        {c.lobes.map(([a2, b2, w2], j) => <path key={'i' + j} d={`M${cx + (a2 - w2) * r} ${cy + b2 * r} A${w2 * r} ${w2 * r * .55} 0 0 1 ${cx + (a2 + w2) * r} ${cy + b2 * r}`} fill="none" stroke={SEP} strokeWidth={.8} opacity={.55} />)}
        <path d={`M${cx + (c.x - .2) * r} ${cy + (c.y + .03) * r} H${cx + (c.x + .2) * r}`} stroke={SEP} strokeWidth={.6} opacity={.35} /></g>; })}</g>}
    </g>
    <Ink d={P.coast} w={1.1 * k} draw={draw} />
    {night > 0 && <Contour cx={cx} cy={cy} r={r} side={-1} k={.38 * night} id={id + 'n'} a={.34 * dW} />}
    <Ink d={ell(cx, cy, r, r)} w={2 * k} draw={draw} />
  </g>;
};

// ---------------------------------------------------------------- land and water
export const Ridge: React.FC<{ y: N; amp: N; mat?: string; t?: N; seed: string; x0?: N; x1?: N; draw?: N; ang?: N }> = ({ y, amp, mat = 'sand', t = .3, seed, x0 = 0, x1 = W, draw = 1, ang = 10 }) => {
  const d = useMemo(() => { const q = seq(seed), o = q() * 6; let s = `M${x0} ${H} L${x0} ${y}`; for (let x = x0; x <= x1; x += 24) s += ` L${x} ${(y - Math.sin(x / 300 + o) * amp - Math.sin(x / 97 + o * 2) * amp * .25 - q() * amp * .15).toFixed(1)}`; return s + ` L${x1} ${H}Z`; }, [y, amp, seed, x0, x1]);
  return <Region d={d} mat={mat} t={t} ang={ang} sw={1.1} draw={draw} />;
};
export const Water: React.FC<{ y: N; h: N; t?: N; draw?: N; seed?: string; waves?: N }> = ({ y, h, t = .5, draw = 1, seed = 'w', waves = 14 }) => (
  <g><Region d={`M0 ${y} H${W} V${y + h} H0Z`} mat="water" t={t} hatch={0} stroke={false} draw={draw} />
    {Array.from({ length: waves }, (_, i) => { const yy = y + 4 + Math.pow(i / waves, 1.3) * (h - 6), a = 2.5 + i * .2; let d = `M0 ${yy}`; for (let x = 0; x <= W; x += 20) d += ` L${x} ${(yy + Math.sin(x / 60 + i * 1.7) * a).toFixed(1)}`; return <Line key={i} d={d} w={.6 + i * .03} col="#0B1F36" a={.4 * draw} />; })}
    <Ink d={`M0 ${y} H${W}`} w={1.1} draw={draw} /></g>);

// ---------------------------------------------------------------- plants, monuments, buildings
export const Palm: React.FC<{ x: N; y: N; h: N; t?: N; draw?: N; lean?: N }> = ({ x, y, h, t = .4, draw = 1, lean = 1 }) => {
  const top = [x + 14 * lean * h / 120, y - h], seg = 9;
  return <g><Region d={`M${x - 6} ${y} Q${x - 10 * lean} ${y - h * .5} ${top[0] - 2} ${top[1]} L${top[0] + 6} ${top[1] + 2} Q${x + 2 * lean} ${y - h * .5} ${x + 7} ${y}Z`} mat="wood" t={t + .15} ang={80} sw={1} draw={draw} />
    {Array.from({ length: seg }, (_, i) => { const yy = y - (i + .5) * h / seg; return <Line key={i} d={`M${x - 6 + (top[0] - x) * (i / seg) - 2} ${yy} q5 3 12 0`} w={.7} a={.6 * draw} />; })}
    {Array.from({ length: 8 }, (_, i) => { const a = -3.05 + i * .5, L = h * (.42 + (i % 2) * .1), ex = top[0] + Math.cos(a) * L, ey = top[1] + Math.sin(a) * L * .55 + L * .28, mx = (top[0] + ex) / 2, my = (top[1] + ey) / 2 - L * .2;
      return <g key={i}><Region d={`M${top[0]} ${top[1]} Q${mx} ${my - 6} ${ex} ${ey} Q${mx} ${my + 4} ${top[0]} ${top[1] + 4}Z`} mat="leaf" t={t + (i % 3) * .1} ang={a * 57} sw={.8} draw={draw} />
        {Array.from({ length: 6 }, (_, j) => { const f = (j + 1) / 7, px = top[0] + (ex - top[0]) * f, py = top[1] + (ey - top[1]) * f - Math.sin(f * Math.PI) * L * .12; return <Line key={j} d={`M${px} ${py} l${Math.cos(a + 1.2) * 7} ${Math.sin(a + 1.2) * 7 + 4}`} w={.6} a={.55 * draw} />; })}</g>; })}</g>;
};
export const Obelisk: React.FC<{ x: N; y: N; h: N; draw?: N; lit?: number }> = ({ x, y, h, draw = 1, lit = 1 }) => {
  const b = h * .085, tw = b * .62, ty = y - h, pp = h * .085, L = lit > 0 ? 1 : -1;
  const glyphs = useMemo(() => { const q = seq('glyph'), o: string[] = []; for (let i = 0; i < 9; i++) { const yy = ty + h * .14 + i * h * .085, kind = Math.floor(q() * 4), s = b * .32, cx = x + (lit > 0 ? -b * .45 : b * .45);
    o.push(kind === 0 ? `M${cx - s} ${yy} q${s} ${-s} ${s * 2} 0` : kind === 1 ? `M${cx} ${yy - s} v${s * 1.6} M${cx - s * .7} ${yy - s * .3} h${s * 1.4}` : kind === 2 ? `M${cx - s * .6} ${yy - s * .6} h${s * 1.2} v${s * 1.2} h${-s * 1.2}Z` : `M${cx - s} ${yy + s * .4} q${s * .5} ${-s * 1.2} ${s} 0 q${s * .5} ${s * 1.2} ${s} 0`); } return o; }, [x, y, h, lit]);   // eslint-disable-line
  return <g>
    <Region d={poly([[x - b * 1.5, y + b * .55], [x + b * 1.5, y + b * .55], [x + b * 1.5, y], [x - b * 1.5, y]])} mat="stone" t={.4} ang={0} draw={draw} />
    <Region d={poly([[x - b, y], [x, y], [x, ty], [x - tw, ty + h * .02]])} mat="stone" t={L > 0 ? .62 : .14} ang={90} draw={draw} />
    <Region d={poly([[x, y], [x + b, y], [x + tw, ty + h * .02], [x, ty]])} mat="stone" t={L > 0 ? .14 : .62} ang={90} draw={draw} />
    <Region d={poly([[x - tw, ty + h * .02], [x, ty], [x, ty - pp]])} mat="stone" t={.6} ang={60} draw={draw} />
    <Region d={poly([[x, ty], [x + tw, ty + h * .02], [x, ty - pp]])} mat="gold" t={.1} ang={60} draw={draw} sw={1.1} />
    {glyphs.map((d, i) => <Line key={i} d={d} w={1} a={.8 * draw} />)}
    {[.12, .95].map((f, i) => <Line key={i} d={`M${x - b + (b - tw) * (1 - f)} ${y - h * (1 - f) * 0 - (y - ty) * (1 - f)} H${x + b - (b - tw) * (1 - f)}`} w={.8} a={.6 * draw} />)}
  </g>;
};
export const Temple: React.FC<{ x: N; y: N; w: N; draw?: N; t?: N }> = ({ x, y, w, draw = 1, t = .25 }) => {
  const n = 6, ch = w * .42, cw = w / (n * 2), top = y - ch;
  return <g>
    <Region d={poly([[x - w * .56, y + w * .05], [x + w * .56, y + w * .05], [x + w * .52, y], [x - w * .52, y]])} mat="stone" t={.35} draw={draw} />
    {Array.from({ length: n }, (_, i) => { const cx = x - w / 2 + cw + i * (w - 2 * cw) / (n - 1); return <g key={i}>
      {i < n - 1 && <Region d={poly([[cx + cw * .5, y], [cx + (w - 2 * cw) / (n - 1) - cw * .5, y], [cx + (w - 2 * cw) / (n - 1) - cw * .5, top], [cx + cw * .5, top]])} mat="wall" t={.8} hatch={2} ang={90} stroke={false} draw={draw} />}
      <Region d={poly([[cx - cw * .5, y], [cx + cw * .5, y], [cx + cw * .44, top + ch * .06], [cx - cw * .44, top + ch * .06]])} mat="stone" t={t} ang={90} sw={1} draw={draw} />
      {[-.22, 0, .22].map((f, j) => <Line key={j} d={`M${cx + f * cw} ${y - 2} V${top + ch * .08}`} w={.6} a={.5 * draw} />)}
      <Region d={poly([[cx - cw * .64, top + ch * .06], [cx + cw * .64, top + ch * .06], [cx + cw * .7, top], [cx - cw * .7, top]])} mat="stone" t={.3} draw={draw} sw={.9} /></g>; })}
    <Region d={poly([[x - w * .54, top], [x + w * .54, top], [x + w * .54, top - w * .07], [x - w * .54, top - w * .07]])} mat="stone" t={.3} draw={draw} />
    <Region d={poly([[x - w * .56, top - w * .07], [x + w * .56, top - w * .07], [x, top - w * .2]])} mat="stone" t={.45} ang={20} draw={draw} />
    <Line d={`M${x - w * .5} ${top - w * .035} H${x + w * .5}`} w={.7} a={.6 * draw} />
  </g>;
};
export const Well: React.FC<{ x: N; y: N; r: N; draw?: N; sunlit?: N }> = ({ x, y, r, draw = 1, sunlit = 1 }) => (
  <g><Region d={`M${x - r} ${y} L${x - r} ${y + r * .42} A${r} ${r * .3} 0 0 0 ${x + r} ${y + r * .42} L${x + r} ${y}Z`} mat="stone" t={.42} ang={90} draw={draw} />
    {Array.from({ length: 7 }, (_, i) => <Line key={i} d={`M${x - r + i * r / 3.5} ${y + r * .08 + Math.sin(i) * 2} v${r * .36}`} w={.7} a={.5 * draw} />)}
    <Region d={ell(x, y, r, r * .3)} mat="stone" t={.18} draw={draw} /><Region d={ell(x, y + 2, r * .78, r * .21)} mat="deep" t={.85} draw={draw} hatch={2} />
    {sunlit > 0 && <g opacity={draw * sunlit}><circle cx={x + r * .1} cy={y + 2} r={r * .5} fill="url(#glowW)" /><ellipse cx={x + r * .1} cy={y + 2} rx={r * .2} ry={r * .07} fill="#FFF6D6" /></g>}</g>);

// ---------------------------------------------------------------- PEOPLE: a scholar in a robe — face in profile, hands, folds, weight on one leg
export const Scholar: React.FC<{ x: N; y: N; h: N; pose?: 'stand' | 'point' | 'look'; flip?: N; draw?: N; robe?: string }> = ({ x, y, h, pose = 'stand', flip = 1, draw = 1, robe = 'cloth' }) => {
  const k = h / 200, P = (a: N, b: N) => `${(x + a * k * flip).toFixed(1)} ${(y + b * k).toFixed(1)}`;
  const arm = pose === 'point' ? `M${P(8, -132)} C${P(28, -138)} ${P(52, -150)} ${P(70, -162)} L${P(74, -154)} C${P(54, -140)} ${P(32, -124)} ${P(12, -118)}Z` : pose === 'look' ? `M${P(8, -132)} C${P(20, -142)} ${P(22, -160)} ${P(18, -172)} L${P(26, -172)} C${P(30, -158)} ${P(26, -136)} ${P(14, -118)}Z` : `M${P(8, -132)} C${P(18, -110)} ${P(24, -86)} ${P(26, -70)} L${P(18, -68)} C${P(14, -86)} ${P(6, -106)} ${P(2, -120)}Z`;
  const hand = pose === 'point' ? [74, -160] : pose === 'look' ? [22, -176] : [22, -66];
  return <g>
    <ellipse cx={x} cy={y + 2} rx={h * .16} ry={h * .025} fill={SEP} opacity={.25 * draw} filter="url(#b2s)" />
    <Region d={`M${P(-30, 0)} C${P(-34, -60)} ${P(-30, -112)} ${P(-18, -140)} L${P(18, -140)} C${P(30, -110)} ${P(34, -56)} ${P(32, 0)}Z`} mat={robe} t={.32} ang={88} draw={draw} />
    {[[-14, -130, -20, 0], [-2, -132, -4, 0], [12, -128, 14, 0], [22, -100, 26, 0]].map(([a, b, c, d2], i) => <Line key={i} d={`M${P(a, b)} C${P(a - 3, (b + d2) / 2)} ${P(c + 2, (b + d2) / 2 + 20)} ${P(c, d2)}`} w={.8} a={.7 * draw} />)}
    <Region d={`M${P(-24, -6)} L${P(30, -6)} L${P(32, 0)} L${P(-30, 0)}Z`} mat="wood" t={.5} draw={draw} sw={.8} />
    <Region d={`M${P(-20, -140)} C${P(-28, -150)} ${P(-24, -186)} ${P(-4, -192)} C${P(14, -194)} ${P(24, -178)} ${P(22, -150)} L${P(18, -138)}Z`} mat={robe} t={.45} ang={60} draw={draw} />
    <Region d={`M${P(-2, -184)} C${P(8, -186)} ${P(15, -178)} ${P(16, -170)} L${P(20, -164)} L${P(15, -162)} C${P(14, -156)} ${P(10, -150)} ${P(2, -150)} C${P(-4, -152)} ${P(-6, -162)} ${P(-6, -172)}Z`} mat="skin" t={.3} ang={45} sw={1} draw={draw} />
    <Line d={`M${P(8, -172)} q2 -1 4 0`} w={1} a={draw} /><Line d={`M${P(6, -176)} q3 -2 6 -1`} w={.8} a={.8 * draw} /><Line d={`M${P(10, -158)} q2 1 4 0`} w={.7} a={.7 * draw} />
    <Line d={`M${P(-4, -150)} C${P(-10, -136)} ${P(-6, -126)} ${P(2, -122)}`} w={.9} a={.7 * draw} />
    <Region d={arm} mat={robe} t={.42} ang={30} draw={draw} sw={1} />
    <Region d={ell(x + hand[0] * k * flip, y + hand[1] * k, 4.5 * k, 3.8 * k)} mat="skin" t={.35} draw={draw} sw={.8} />
    {pose === 'stand' && <Line d={`M${P(36, -200)} L${P(30, 2)}`} w={2.6 * k} col="#4F3020" a={draw} />}
  </g>;
};

// ---------------------------------------------------------------- INSTRUMENTS and interiors
export const Astrolabe: React.FC<{ x: N; y: N; r: N; draw?: N; rot?: N }> = ({ x, y, r, draw = 1, rot = 0 }) => (
  <g>
    <Region d={ell(x, y - r - r * .15, r * .12, r * .12)} mat="gold" t={.3} draw={draw} sw={1} /><Region d={ell(x, y - r - r * .15, r * .065, r * .065)} mat="wall" t={.8} draw={draw} sw={.8} />
    <Region d={ell(x, y, r, r)} mat="gold" t={.28} ang={35} draw={draw} sw={2} /><Region d={ell(x, y, r * .85, r * .85)} mat="gold" t={.12} ang={120} draw={draw} sw={1.4} />
    <g opacity={draw}>{Array.from({ length: 120 }, (_, i) => { const a = i / 120 * Math.PI * 2, L = i % 10 ? (i % 5 ? .045 : .075) : .12; return <Line key={i} d={`M${x + Math.cos(a) * r} ${y + Math.sin(a) * r} L${x + Math.cos(a) * r * (1 - L)} ${y + Math.sin(a) * r * (1 - L)}`} w={i % 10 ? .6 : 1.1} a={.9} />; })}
      {[.7, .52, .34].map((f, i) => <circle key={i} cx={x} cy={y} r={r * f} fill="none" stroke={SEP} strokeWidth={1.1} opacity={.8} />)}
      <path d={`M${x - r * .85} ${y} A${r * .78} ${r * .48} 0 0 0 ${x + r * .85} ${y}`} fill="none" stroke={SEP} strokeWidth={1.1} opacity={.8} /></g>
    <g transform={`rotate(${rot} ${x} ${y})`}>
      {[[-.9, .55], [-.2, .72], [.5, .6], [1.3, .7], [2.2, .5], [2.9, .66], [3.8, .58], [4.6, .74], [5.4, .52]].map(([a, f], i) => { const rr = r * .85 * f, ex = x + Math.cos(a) * rr, ey = y + Math.sin(a) * rr;
        return <Region key={i} d={`M${x + Math.cos(a - .12) * rr * .7} ${y + Math.sin(a - .12) * rr * .7} Q${ex} ${ey} ${ex + Math.cos(a) * r * .09} ${ey + Math.sin(a) * r * .09} Q${ex} ${ey} ${x + Math.cos(a + .12) * rr * .7} ${y + Math.sin(a + .12) * rr * .7}Z`} mat="gold" t={.55} ang={a * 57} sw={.9} draw={draw} />; })}
      <circle cx={x} cy={y} r={r * .38} fill="none" stroke={SEP} strokeWidth={r * .03} opacity={.75 * draw} /></g>
    <g transform={`rotate(${-rot * 1.6 + 12} ${x} ${y})`}><Region d={poly([[x - r * .96, y - r * .05], [x + r * .96, y - r * .05], [x + r * .96, y + r * .05], [x - r * .96, y + r * .05]])} mat="gold" t={.5} draw={draw} sw={1.2} /></g>
    <Region d={ell(x, y, r * .07, r * .07)} mat="gold" t={.2} draw={draw} sw={1} />
  </g>);
export const Telescope: React.FC<{ x: N; y: N; s: N; tilt?: N; draw?: N }> = ({ x, y, s, tilt = -28, draw = 1 }) => {
  const k = s / 300; return <g>
    {[[-60, 0], [0, 10], [60, 0]].map(([dx, dy], i) => <Region key={i} d={poly([[x - 3 * k, y - 120 * k], [x + 3 * k, y - 120 * k], [x + (dx + 4) * k, y + dy * k], [x + (dx - 4) * k, y + dy * k]])} mat="wood" t={.5} ang={80} draw={draw} sw={.9} />)}
    <g transform={`rotate(${tilt} ${x} ${y - 124 * k})`}>
      <Region d={poly([[x - 150 * k, y - 136 * k], [x + 170 * k, y - 140 * k], [x + 170 * k, y - 108 * k], [x - 150 * k, y - 112 * k]])} mat="gold" t={.3} ang={0} draw={draw} sw={1.4} />
      <Region d={poly([[x + 170 * k, y - 144 * k], [x + 196 * k, y - 146 * k], [x + 196 * k, y - 102 * k], [x + 170 * k, y - 104 * k]])} mat="gold" t={.45} draw={draw} sw={1.2} />
      <Region d={poly([[x - 186 * k, y - 130 * k], [x - 150 * k, y - 132 * k], [x - 150 * k, y - 116 * k], [x - 186 * k, y - 118 * k]])} mat="wood" t={.55} draw={draw} sw={1} />
      {[-90, -20, 60, 130].map(dx => <Line key={dx} d={`M${x + dx * k} ${y - 137 * k} V${y - 110 * k}`} w={1} a={.7 * draw} />)}</g>
    <Region d={ell(x, y - 124 * k, 9 * k, 9 * k)} mat="gold" t={.4} draw={draw} sw={1} /></g>;
};
export const Candle: React.FC<{ x: N; y: N; h: N; draw?: N; flicker?: N }> = ({ x, y, h, draw = 1, flicker = 0 }) => {
  const w = h * .16, f = 1 + Math.sin(flicker * 7) * .04 + Math.sin(flicker * 13) * .03;
  return <g><circle cx={x} cy={y - h - h * .25} r={h * 2.2 * f} fill="url(#glowW)" opacity={.75 * draw} />
    <Region d={poly([[x - w * 1.8, y], [x + w * 1.8, y], [x + w * 1.5, y - h * .06], [x - w * 1.5, y - h * .06]])} mat="gold" t={.35} draw={draw} sw={1} />
    <Region d={`M${x - w} ${y - h * .06} L${x - w} ${y - h} Q${x - w * .2} ${y - h - w * .5} ${x + w} ${y - h + w * .2} L${x + w} ${y - h * .06}Z`} mat="paper" t={.15} ang={90} draw={draw} sw={1} />
    <path d={`M${x - w * .35} ${y - h + 2} q-3 ${h * .12} 0 ${h * .2}`} fill="none" stroke={tone('paper', .5)} strokeWidth={2} opacity={draw} />
    <path d={`M${x} ${y - h - h * .05} Q${x + w * .7 * f} ${y - h - h * .2} ${x} ${y - h - h * .42 * f} Q${x - w * .7 * f} ${y - h - h * .2} ${x} ${y - h - h * .05}Z`} fill="#FFF0B8" stroke={SEP} strokeWidth={.8} opacity={draw} />
    <path d={`M${x} ${y - h - h * .07} Q${x + w * .3} ${y - h - h * .16} ${x} ${y - h - h * .26}`} fill="#F2A84A" opacity={draw} /></g>;
};

// ---------------------------------------------------------------- MAPS: a real sea chart (equirectangular), coast ripples, rivers, graticule, rose, ship
export const SeaChart: React.FC<{ box: [N, N, N, N]; frame?: [N, N, N, N]; draw?: N; rivers?: string[] }> = ({ box, frame = [40, 40, W - 40, H - 40], draw = 1, rivers = ['Nile'] }) => {
  const [lo0, la0, lo1, la1] = box, proj = geoEquirectangular().fitExtent([[frame[0], frame[1]], [frame[2], frame[3]]], { type: 'MultiPoint', coordinates: [[lo0, la0], [lo1, la0], [lo1, la1], [lo0, la1]] } as never).clipExtent([[frame[0], frame[1]], [frame[2], frame[3]]]), path = geoPath(proj);
  const P = useMemo(() => ({ land: path(land50 as never) || '', coast: path(coast50 as never) || '', grat: path(geoGraticule10()) || '', rv: path({ type: 'FeatureCollection', features: (rivers50 as any).features.filter((f: any) => rivers.some(n => (f.properties.name || '').includes(n))) } as never) || '' }), [box.join(), frame.join(), rivers.join()]);   // eslint-disable-line
  return <g>
    <Region d={`M${frame[0]} ${frame[1]} H${frame[2]} V${frame[3]} H${frame[0]}Z`} mat="sea" t={.32} hatch={0} stroke={false} draw={draw} />
    {[16, 9, 4].map((wd, i) => <path key={i} d={P.coast} fill="none" stroke={SEP} strokeWidth={wd} opacity={(.05 + i * .03) * draw} />)}
    <Region d={P.land} mat="land" t={.12} stroke={false} draw={draw} />
    <path d={P.grat} fill="none" stroke={SEP} strokeWidth={.6} opacity={.35 * draw} />
    <Ink d={P.coast} w={1.2} draw={draw} /><Line d={P.rv} w={2.4} col={PIG.sea[2]} a={draw} />
    <Ink d={`M${frame[0]} ${frame[1]} H${frame[2]} V${frame[3]} H${frame[0]}Z`} w={2.4} draw={draw} /><Line d={`M${frame[0] + 10} ${frame[1] + 10} H${frame[2] - 10} V${frame[3] - 10} H${frame[0] + 10}Z`} w={.8} a={draw} />
  </g>;
};
export const chartPoint = (box: [N, N, N, N], lon: N, lat: N, frame: [N, N, N, N] = [40, 40, W - 40, H - 40]) => geoEquirectangular().fitExtent([[frame[0], frame[1]], [frame[2], frame[3]]], { type: 'MultiPoint', coordinates: [[box[0], box[1]], [box[2], box[1]], [box[2], box[3]], [box[0], box[3]]] } as never)([lon, lat]) as [N, N];
export const Rose: React.FC<{ x: N; y: N; r: N; draw?: N }> = ({ x, y, r, draw = 1 }) => <g>
  {Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2 - Math.PI / 2, L = i % 4 ? (i % 2 ? .45 : .68) : 1, w = i % 4 ? .08 : .14;
    return <Region key={i} d={`M${x} ${y} L${x + Math.cos(a - .3) * r * w} ${y + Math.sin(a - .3) * r * w} L${x + Math.cos(a) * r * L} ${y + Math.sin(a) * r * L}Z`} mat={i % 4 ? 'gold' : 'paper'} t={i % 2 ? .6 : .1} ang={a * 57} sw={.9} draw={draw} />; })}
  <circle cx={x} cy={y} r={r * .78} fill="none" stroke={SEP} strokeWidth={1.4} opacity={draw} /><circle cx={x} cy={y} r={r * .84} fill="none" stroke={SEP} strokeWidth={.6} opacity={draw} />
  <text x={x} y={y - r * 1.1} textAnchor="middle" fontFamily="Fraunces" fontWeight={700} fontSize={r * .24} fill={SEP} opacity={draw}>N</text></g>;
export const Ship: React.FC<{ x: N; y: N; s: N; draw?: N; flip?: N }> = ({ x, y, s, draw = 1, flip = 1 }) => {
  const k = s / 300, P = (a: N, b: N) => [x + a * k * flip, y + b * k];
  return <g>
    <Region d={poly([P(-150, -10), P(150, -14), P(130, 30), P(-128, 30)])} mat="wood" t={.55} draw={draw} sw={1.4 * k} />
    {[0, 1, 2, 3].map(i => <Line key={i} d={`M${P(-146 + i * 4, -2 + i * 8).join(' ')} L${P(144 - i * 4, -6 + i * 8).join(' ')}`} w={.8 * k} a={draw} />)}
    {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={P(-90 + i * 28, 4)[0]} cy={P(-90 + i * 28, 4)[1]} r={3.2 * k} fill={SEP} opacity={draw} />)}
    {[[-60, 210], [30, 250], [110, 160]].map(([mx, h]) => <g key={mx}><Line d={`M${P(mx, -12).join(' ')} L${P(mx, -12 - h).join(' ')}`} w={3 * k} a={draw} />
      {[[.92, .7], [.6, .55], [.32, .42]].map(([f, w2], j) => { const yy = -12 - h * f, ww = h * w2 * .55; return <Region key={j} d={`M${P(mx - ww / 2, yy).join(' ')} Q${P(mx, yy - 6).join(' ')} ${P(mx + ww / 2, yy).join(' ')} L${P(mx + ww / 2 + 4, yy + h * .22).join(' ')} Q${P(mx, yy + h * .28).join(' ')} ${P(mx - ww / 2 - 4, yy + h * .22).join(' ')}Z`} mat="cloth" t={.2 + j * .08} ang={90} draw={draw} sw={k} />; })}</g>)}
    <Line d={`M${P(-150, -10).join(' ')} L${P(-60, -222).join(' ')} L${P(30, -262).join(' ')} L${P(110, -172).join(' ')} L${P(150, -14).join(' ')}`} w={.8 * k} a={.7 * draw} />
    <path d={`M${P(30, -262).join(' ')} l${18 * k * flip} ${5 * k} l${-18 * k * flip} ${5 * k}Z`} fill={PIG.red[1]} opacity={draw} /></g>;
};

// ---------------------------------------------------------------- REAL STOCK as artefacts in the scene (STYLE.md §6)
const toneCss = 'sepia(.55) saturate(.8) contrast(1.06) brightness(.98)';
export const Pinned: React.FC<{ src: string; x: N; y: N; w: N; h: N; rot?: N; caption?: string; draw?: N; pin?: boolean }> = ({ src, x, y, w, h, rot = -2, caption, draw = 1, pin = true }) => (
  <g opacity={Math.min(1, draw * 1.4)} transform={`rotate(${rot} ${x} ${y})`}>
    <rect x={x - w / 2 - 16} y={y - h / 2 - 16} width={w + 32} height={h + (caption ? 64 : 32)} fill="#000" opacity={.28} filter="url(#b8)" transform="translate(8 12)" />
    <Region d={poly([[x - w / 2 - 16, y - h / 2 - 16], [x + w / 2 + 16, y - h / 2 - 16], [x + w / 2 + 16, y + h / 2 + (caption ? 48 : 16)], [x - w / 2 - 16, y + h / 2 + (caption ? 48 : 16)]])} mat="paper" t={.06} draw={draw} rim={false} />
    <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h}><Img src={staticFile(src)} style={{ width: w, height: h, objectFit: 'cover', filter: toneCss, clipPath: `inset(0 ${100 - Math.min(100, draw * 140)}% 0 0)` }} /></foreignObject>
    <Ink d={`M${x - w / 2} ${y - h / 2} H${x + w / 2} V${y + h / 2} H${x - w / 2}Z`} w={1} draw={draw} />
    {caption && <text x={x} y={y + h / 2 + 34} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize={20} fill={SEP} opacity={draw}>{caption}</text>}
    {pin && <g opacity={draw}><circle cx={x} cy={y - h / 2 - 4} r={9} fill={PIG.red[1]} stroke={SEP} strokeWidth={1} /><circle cx={x - 3} cy={y - h / 2 - 7} r={3} fill="#FFFFFF" opacity={.6} /></g>}
  </g>);
// a real document page (Muse's scan), with the key passage CIRCLED in red ink as the narration reaches it
export const DocumentPage: React.FC<{ src: string; x: N; y: N; w: N; h: N; rot?: N; circle?: [N, N, N, N]; circleK?: N; draw?: N }> = ({ src, x, y, w, h, rot = 2, circle, circleK = 0, draw = 1 }) => (
  <g opacity={Math.min(1, draw * 1.4)} transform={`rotate(${rot} ${x} ${y})`}>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill="#000" opacity={.3} filter="url(#b8)" transform="translate(10 14)" />
    <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h}><Img src={staticFile(src)} style={{ width: w, height: h, objectFit: 'cover', filter: toneCss }} /></foreignObject>
    {circle && circleK > 0 && <path d={`M${x - w / 2 + circle[0] * w} ${y - h / 2 + circle[1] * h} m${-circle[2] * w / 2} 0 a${circle[2] * w / 2} ${circle[3] * h / 2} 0 1 0 ${circle[2] * w} 0 a${circle[2] * w / 2} ${circle[3] * h / 2} 0 1 0 ${-circle[2] * w * 1.04} ${-circle[3] * h * .08}`} fill="none" stroke={PIG.red[1]} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={`${circleK} 1`} />}
  </g>);
// real footage seen THROUGH an instrument: a telescope eyepiece (brass ring) or a period screen
export const Eyepiece: React.FC<{ x: N; y: N; r: N; children?: React.ReactNode; src?: string; draw?: N }> = ({ x, y, r, children, src, draw = 1 }) => (
  <g opacity={Math.min(1, draw * 1.5)}>
    <defs><clipPath id={`ep${Math.round(x)}`}><circle cx={x} cy={y} r={r * Math.min(1, draw * 1.2)} /></clipPath></defs>
    <circle cx={x} cy={y} r={r * 1.18} fill="#000" opacity={.35} filter="url(#b8)" />
    {src && <foreignObject x={x - r} y={y - r} width={2 * r} height={2 * r}><Img src={staticFile(src)} style={{ width: 2 * r, height: 2 * r, objectFit: 'cover', filter: toneCss, borderRadius: '50%', clipPath: `circle(${Math.min(100, draw * 120) / 2}% at 50% 50%)` }} /></foreignObject>}
    <g clipPath={`url(#ep${Math.round(x)})`}>{!src && children}
      <circle cx={x} cy={y} r={r} fill="none" stroke="#000" strokeWidth={r * .25} opacity={.35} filter="url(#b8)" /></g>
    <circle cx={x} cy={y} r={r * 1.06} fill="none" stroke="url(#gold)" strokeWidth={r * .13} opacity={Math.min(1, draw * 1.5)} /><Ink d={ell(x, y, r * 1.125, r * 1.125)} w={1.6} draw={draw} /><Ink d={ell(x, y, r, r)} w={1.2} draw={draw} />
    {Array.from({ length: 60 }, (_, i) => { const a = i / 60 * Math.PI * 2; return <Line key={i} d={`M${x + Math.cos(a) * r * 1.12} ${y + Math.sin(a) * r * 1.12} L${x + Math.cos(a) * r * 1.07} ${y + Math.sin(a) * r * 1.07}`} w={.7} a={.8 * draw} />; })}
  </g>);

// ---------------------------------------------------------------- diagram marks: an angle with its arc and ONE label, a gold beam
export const Angle: React.FC<{ x: N; y: N; a0: N; a1: N; r: N; label?: string; draw?: N; len?: N }> = ({ x, y, a0, a1, r, label, draw = 1, len = 220 }) => {
  const R = Math.PI / 180, p = (a: N, l: N) => [x + Math.cos(a * R) * l, y + Math.sin(a * R) * l];
  return <g><Line d={`M${x} ${y} L${p(a0, len).join(' ')}`} w={2} col={PIG.red[1]} a={1} draw={draw} /><Line d={`M${x} ${y} L${p(a1, len).join(' ')}`} w={2} col={PIG.red[1]} a={1} draw={draw} />
    <Line d={`M${p(a0, r).join(' ')} A${r} ${r} 0 0 ${a1 > a0 ? 1 : 0} ${p(a1, r).join(' ')}`} w={2.4} col={PIG.red[1]} draw={Math.max(0, draw * 1.5 - .5)} a={1} />
    {label && <text x={p((a0 + a1) / 2, r + 34)[0]} y={p((a0 + a1) / 2, r + 34)[1]} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize={34} fill={PIG.red[2]} opacity={Math.max(0, draw * 2 - 1)}>{label}</text>}</g>;
};
export const GoldBeam: React.FC<{ x1: N; y1: N; x2: N; y2: N; k?: N; w?: N }> = ({ x1, y1, x2, y2, k = 1, w = 3 }) => {
  const x = x1 + (x2 - x1) * k, y = y1 + (y2 - y1) * k; if (k <= 0) return null;
  return <g><path d={`M${x1} ${y1} L${x} ${y}`} stroke="#F3D88E" strokeWidth={w * 5} opacity={.25} filter="url(#b8)" /><path d={`M${x1} ${y1} L${x} ${y}`} stroke="url(#gold)" strokeWidth={w} strokeLinecap="round" /><path d={`M${x1} ${y1} L${x} ${y}`} stroke={SEP} strokeWidth={.6} opacity={.6} strokeDasharray="2 10" />
    {k < 1 && <circle cx={x} cy={y} r={w * 6} fill="url(#glowG)" />}</g>;
};
export { mix, tone };
