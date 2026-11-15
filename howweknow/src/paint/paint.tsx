// FATHOM paint core — the signature style (STYLE.md) for Remotion. Every drawn thing goes through <Region>:
// paper → wash (off the line, pooled rim) → hatching in the shade (follows `ang`) → swelling sepia ink. `draw` 0..1 animates it in:
// the ink traces (0–.5), the wash blooms (.35–.85), the hatching settles (.7–1). <PaintDefs boil> once per frame = the living line.
import React, { useMemo } from 'react';
import { random } from 'remotion';

export const SEP = '#2B1D12', PAPER = '#F3E7CC';
export const PIG: Record<string, [string, string, string]> = {
  sky: ['#C9DDE6', '#7FA8C4', '#2E5C86'], sand: ['#F0D9A8', '#D9AE6C', '#A8743E'], stone: ['#EFE0C2', '#C9AE84', '#8C6E4A'], water: ['#8FC1CF', '#3E7FA3', '#1D4566'],
  leaf: ['#A9C08A', '#5F8A5A', '#2F5440'], wood: ['#C99A6A', '#8C5A36', '#4F3020'], brass: ['#F3D98A', '#D4A846', '#8A6420'], cloth: ['#EFE2C6', '#C7A57A', '#7E5E3E'],
  skin: ['#EDC3A0', '#C78F66', '#8A5A3C'], paper: ['#FBF4E2', '#EBDDBC', '#C9B48A'], night: ['#5A6E9A', '#2B3B66', '#141C38'], wall: ['#9A6E50', '#6A4430', '#3A2418'],
  land: ['#E2CF94', '#A9B97A', '#6E8F5A'], sea: ['#9CCAD6', '#4A88AE', '#22507A'], red: ['#F2A672', '#D2643E', '#8C3424'], deep: ['#4A88AE', '#22507A', '#0E2A48'],
  ice: ['#FFFFFF', '#E8EEF0', '#B9C8D0'], forest: ['#8FB07A', '#4F7A4A', '#2A4A32'], desert: ['#F2DCA6', '#E0B878', '#B98A50'], tundra: ['#C9C2A6', '#A39E86', '#76725E'],
  mantle: ['#F2A672', '#D2643E', '#8C3424'], core: ['#F6CF7A', '#E89A3E', '#B0602A'], inner: ['#FFF4D2', '#F8DC8A', '#E9B456'], space: ['#3A4A7A', '#1C2650', '#0B1030'],
};
const hx = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const th = (a: number[]) => '#' + a.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
export const mix = (a: string, b: string, k: number) => th(hx(a).map((v, i) => v + (hx(b)[i] - v) * k));
export const tone = (mat: string, t: number) => { const M = PIG[mat] || PIG.stone; return t < .5 ? mix(M[0], M[1], t * 2) : mix(M[1], M[2], (t - .5) * 2); };
export const ell = (x: number, y: number, rx: number, ry: number) => `M${x - rx} ${y} A${rx} ${ry} 0 1 0 ${x + rx} ${y} A${rx} ${ry} 0 1 0 ${x - rx} ${y}Z`;
export const poly = (pts: number[][]) => 'M' + pts.map(p => p.map(v => +v.toFixed(1)).join(' ')).join(' L') + 'Z';
export const seq = (seed: string) => { let i = 0; return () => random(seed + '_' + i++); };
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const ph = (d: number, a: number, b: number) => clamp((d - a) / (b - a));
const ANG = (a: number) => (((Math.round(a / 15) * 15) % 180) + 180) % 180;

// ---------------------------------------------------------------- once per frame: filters, gold, hatch patterns (ids are global in the page)
export const PaintDefs: React.FC<{ boil: number }> = ({ boil }) => {
  const pats: React.ReactNode[] = [];
  for (let a = 0; a < 180; a += 15) for (const lvl of [1, 2, 3]) { const sp = [0, 7, 4.6, 3.6][lvl], w = [0, .7, .85, .95][lvl];
    pats.push(<pattern key={`${lvl}_${a}`} id={`h${lvl}_${a}`} width={sp} height={sp} patternUnits="userSpaceOnUse" patternTransform={`rotate(${a})`}><path d={`M0 ${sp / 2} H${sp}`} stroke={SEP} strokeWidth={w} />{lvl === 3 && <path d={`M${sp / 2} 0 V${sp}`} stroke={SEP} strokeWidth={w * .8} />}</pattern>); }
  return (
    <svg width={0} height={0} style={{ position: 'absolute' }}><defs>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F7E3A0" /><stop offset=".35" stopColor="#D9AE4C" /><stop offset=".55" stopColor="#F3D88E" /><stop offset=".8" stopColor="#B8862B" /><stop offset="1" stopColor="#E6C266" /></linearGradient>
      <filter id="wc"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves={2} seed={6 + boil} /><feDisplacementMap in="SourceGraphic" scale={5} /><feGaussianBlur stdDeviation={.5} /></filter>
      <filter id="boil"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves={1} seed={20 + boil} /><feDisplacementMap in="SourceGraphic" scale={1.6} /></filter>
      <filter id="b2s"><feGaussianBlur stdDeviation={2.5} /></filter><filter id="b8"><feGaussianBlur stdDeviation={8} /></filter><filter id="b30"><feGaussianBlur stdDeviation={30} /></filter>
      <radialGradient id="glowW"><stop offset="0" stopColor="#FFF4D2" stopOpacity={.9} /><stop offset="1" stopColor="#FFF4D2" stopOpacity={0} /></radialGradient>
      <radialGradient id="glowG"><stop offset="0" stopColor="#F7E3A0" stopOpacity={.85} /><stop offset="1" stopColor="#F7E3A0" stopOpacity={0} /></radialGradient>
      {pats}
    </defs></svg>);
};

// ---------------------------------------------------------------- the drawn region (the API every element uses)
export type RegionP = { d: string; mat?: string; t?: number; ang?: number; sw?: number; k?: number; draw?: number; color?: string; hatch?: number; hatchA?: number; stroke?: boolean; rim?: boolean; a?: number };
export const Region: React.FC<RegionP> = ({ d, mat = 'stone', t = .3, ang = 0, sw = 1.4, k = 1, draw = 1, color, hatch, hatchA = .5, stroke = true, rim = true, a = 1 }) => {
  if (draw <= 0 || a <= 0) return null;
  const c = color || tone(mat, t), lvl = hatch ?? (t < .5 ? 0 : t < .72 ? 1 : 2), wash = mat === 'gold' ? 'url(#gold)' : c;
  const pInk = ph(draw, 0, .5), pWash = ph(draw, .35, .85), pHatch = ph(draw, .7, 1), off = `translate(${2.4 * k} ${-1.6 * k})`;
  return (
    <g opacity={a}>
      {pWash > 0 && <g opacity={pWash}><path d={d} fill={wash} transform={off} filter="url(#wc)" />{rim && <path d={d} fill="none" stroke={mix(c, '#000000', .35)} strokeWidth={6 * k} opacity={.22} transform={off} filter="url(#b2s)" />}</g>}
      {lvl > 0 && pHatch > 0 && <path d={d} fill={`url(#h${lvl}_${ANG(ang)})`} opacity={hatchA * pHatch} />}
      {stroke && pInk > 0 && <Ink d={d} w={sw * k} draw={pInk} />}
    </g>);
};
export const Ink: React.FC<{ d: string; w?: number; draw?: number; col?: string; a?: number }> = ({ d, w = 1.4, draw = 1, col = SEP, a = 1 }) => {
  const dash = draw < 1 ? { pathLength: 1, strokeDasharray: `${draw} 1` } : {};
  return <g opacity={a} filter="url(#boil)"><path d={d} fill="none" stroke={col} strokeWidth={w * 1.5} opacity={.5} transform={`translate(${-w * .6} ${w * .6})`} strokeLinejoin="round" strokeLinecap="round" {...dash} /><path d={d} fill="none" stroke={col} strokeWidth={w * .8} strokeLinejoin="round" strokeLinecap="round" {...dash} /></g>;
};
export const Line: React.FC<{ d: string; w?: number; col?: string; a?: number; draw?: number }> = ({ d, w = 1.2, col = SEP, a = .9, draw = 1 }) =>
  <path d={d} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" opacity={a} {...(draw < 1 ? { pathLength: 1, strokeDasharray: `${draw} 1` } : {})} />;
export const Stipple: React.FC<{ x: number; y: number; w: number; h: number; n: number; seed: string; dens?: (u: number, v: number) => number; col?: string; r0?: number; a?: number }> = ({ x, y, w, h, n, seed, dens = () => 1, col = SEP, r0 = .5, a = .55 }) => {
  const pts = useMemo(() => { const q = seq(seed), o: number[][] = []; for (let i = 0; i < n; i++) { const u = q(), v = q(), r = q(); if (q() < dens(u, v)) o.push([u, v, r0 + r * .7]); } return o; }, [seed, n, r0]);   // eslint-disable-line
  return <g opacity={a}>{pts.map((p, i) => <circle key={i} cx={x + p[0] * w} cy={y + p[1] * h} r={p[2]} fill={col} />)}</g>;
};
// engraved contour shading on a sphere (night/shade side), curved like a globe's parallels
export const Contour: React.FC<{ cx: number; cy: number; r: number; side?: number; k?: number; id: string; a?: number }> = ({ cx, cy, r, side = -1, k = .55, id, a = .55 }) => {
  const els: React.ReactNode[] = []; for (let i = 0; i < 26; i++) { const t = i / 26; if (t > k) break; const ex = cx + side * r * (1 - t * k * 1.6), rx = r * (.25 + t * .9);
    els.push(<ellipse key={i} cx={ex - side * rx * .2} cy={cy} rx={rx * .3 + t * r * .2} ry={r * 1.02} fill="none" stroke={SEP} strokeWidth={Math.max(.3, 1.3 - t)} transform={`rotate(${-18 * side} ${cx} ${cy})`} />); }
  return <g opacity={a}><defs><clipPath id={id}><circle cx={cx} cy={cy} r={r} /></clipPath></defs><g clipPath={`url(#${id})`}>{els}</g></g>;
};
