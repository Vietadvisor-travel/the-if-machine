// ENGINE v6 — LIGHT & DEPTH entities (owner 17 Nov 2026). A scene is LIT and DEEP, never a thing on blank paper:
//   lamp   {at, r, k, dark, warm}        a pool of warm light at an anchor; everything outside falls into shade (the key light of a scene)
//   shaft  {from:[x,y], to:[x,y], w0, w1, n, k}   n soft beams of light falling from a source (a lamp, a window), swaying a hair
//   motes  {box:[x,y,w,h], n, k, seed}   dust drifting in the light (slow, each mote on its own path, twinkling)
//   shadow {x, y, rx, ry, k}             the soft contact shadow under a thing (put it one z below the thing)
//   haze   {y0, y1, k, col}              air between layers: far things pale into the paper (atmospheric perspective) — z between far and near
//   sheen  {box:[x,y,w,h], rot, k, w}    a band of light crossing a glass, a photograph, a brass plate (k 0→1 = it sweeps across)
// All are keyable like any entity (k glides), live in screen space, and take `para` for parallax depth.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Props } from './state';
import { anchor, Cam, SW, SH } from './space';

const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const TAU = Math.PI * 2;

// Lights blend with the whole picture (multiply / screen), so they are NOT wrapped in a parallax layer (a transformed wrapper isolates
// blending); instead the page camera is applied to their coordinates: M.pt maps a screen point, M.sc scales a length.
export type Map6 = { pt: (p: [number, number]) => [number, number]; sc: number };
const ID: Map6 = { pt: p => p, sc: 1 };
export const renderLight6 = (type: string, s0: Props, cam: Cam, S: Record<string, Props>, t: number, id: string, M: Map6 = ID): React.ReactNode => {
  const a = s0.a ?? 1, k = s0.k ?? 1; if (a * k <= 0.002) return null;
  const s: Props = { ...s0 }, mb = (b: number[]) => { const [x, y] = M.pt([b[0], b[1]]); return [x, y, b[2] * M.sc, b[3] * M.sc]; };
  if (s.at !== undefined) s.at = { screen: M.pt(anchor(s.at, cam, S)) };
  if (s.from) s.from = M.pt(s.from); if (s.to) s.to = M.pt(s.to); if (s.box) s.box = mb(s.box);
  if (typeof s.x === 'number' && typeof s.y === 'number') [s.x, s.y] = M.pt([s.x, s.y]);
  for (const q of ['r', 'rx', 'ry', 'w0', 'w1', 'w']) if (typeof s[q] === 'number') s[q] *= M.sc;
  if (type === 'haze') { s.y0 = M.pt([0, s.y0 ?? 0])[1]; s.y1 = M.pt([0, s.y1 ?? SH])[1]; }
  switch (type) {
    case 'lamp': {
      const [x, y] = anchor(s.at, cam, S), r = s.r ?? 420, dark = s.dark ?? .62, warm = s.warm ?? .5, br = 1 + .012 * Math.sin(t * 7.3) + .008 * Math.sin(t * 13.1);   // a flame/filament is never perfectly steady
      return <AbsoluteFill style={{ opacity: a, pointerEvents: 'none' }}>
        <AbsoluteFill style={{ mixBlendMode: 'multiply', background: `radial-gradient(circle ${r * 1.9 * br}px at ${x}px ${y}px, rgba(40,26,14,0) 0%, rgba(40,26,14,0) 38%, rgba(40,26,14,${(dark * k).toFixed(3)}) 100%)` }} />
        <AbsoluteFill style={{ mixBlendMode: 'screen', background: `radial-gradient(circle ${r * br}px at ${x}px ${y}px, rgba(255,214,150,${(.5 * warm * k).toFixed(3)}) 0%, rgba(255,190,110,${(.2 * warm * k).toFixed(3)}) 45%, rgba(255,190,110,0) 100%)` }} />
      </AbsoluteFill>;
    }
    case 'shaft': {
      const [x0, y0] = s.from, [x1, y1] = s.to, n = s.n ?? 3, w0 = s.w0 ?? 40, w1 = s.w1 ?? 360, len = Math.hypot(x1 - x0, y1 - y0), ang = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI - 90;
      return <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0, opacity: a * k, mixBlendMode: 'screen', pointerEvents: 'none' }}>
        <defs><linearGradient id={`sh${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe2ae" stopOpacity=".34" /><stop offset=".7" stopColor="#ffd9a0" stopOpacity=".1" /><stop offset="1" stopColor="#ffd9a0" stopOpacity="0" /></linearGradient>
          <filter id={`sf${id}`} x="-20%" y="-5%" width="140%" height="110%"><feGaussianBlur stdDeviation="14" /></filter></defs>
        <g transform={`translate(${x0} ${y0}) rotate(${ang})`} filter={`url(#sf${id})`}>
          {Array.from({ length: n }, (_, i) => { const u = n === 1 ? 0 : i / (n - 1) - .5, sw = 1.6 * Math.sin(t * .23 + i * 1.9), c0 = u * w0 * 1.2, c1 = u * w1 * 1.5 + sw * 6, h0 = w0 / n * .5, h1 = w1 / n * (.55 + .25 * hash(i + 3));
            return <polygon key={i} points={`${c0 - h0},0 ${c0 + h0},0 ${c1 + h1},${len} ${c1 - h1},${len}`} fill={`url(#sh${id})`} opacity={.6 + .4 * hash(i * 7 + 1)} />; })}
        </g></svg>;
    }
    case 'motes': {
      const [bx, by, bw, bh] = s.box ?? [0, 0, SW, SH], n = s.n ?? 40, sd = s.seed ?? 1;
      return <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0, opacity: a * k, mixBlendMode: 'screen', pointerEvents: 'none' }}>
        {Array.from({ length: n }, (_, i) => { const h1 = hash(i * 3.1 + sd), h2 = hash(i * 5.7 + sd * 2), h3 = hash(i * 9.3 + sd * 3), sp = .012 + .02 * h3;
          const u = (h1 + t * sp * (h3 > .5 ? 1 : -1) * .35 + 10) % 1, v = (h2 - t * sp * .5 + 10) % 1;
          const x = bx + u * bw + 14 * Math.sin(t * (.3 + h3) + i), y = by + v * bh + 8 * Math.sin(t * (.21 + h1) + i * 2), tw = .45 + .55 * Math.sin(t * (.6 + h2 * 1.4) + i * 4) ** 2;
          return <circle key={i} cx={x} cy={y} r={.9 + 2.1 * h3} fill="#ffe6ba" opacity={(.25 + .6 * h2) * tw} />; })}
      </svg>;
    }
    case 'shadow': {
      const rx = s.rx ?? 160, ry = s.ry ?? 26;
      return <AbsoluteFill style={{ opacity: a, pointerEvents: 'none', mixBlendMode: 'multiply', background: `radial-gradient(ellipse ${rx}px ${ry}px at ${s.x}px ${s.y}px, rgba(43,29,18,${(.55 * k).toFixed(3)}) 0%, rgba(43,29,18,${(.3 * k).toFixed(3)}) 55%, rgba(43,29,18,0) 100%)` }} />;
    }
    case 'haze': {
      const y0 = s.y0 ?? 0, y1 = s.y1 ?? SH, col = s.col ?? '236,224,196';
      return <AbsoluteFill style={{ opacity: a, pointerEvents: 'none', background: `linear-gradient(180deg, rgba(${col},0) ${(y0 / SH * 100).toFixed(1)}%, rgba(${col},${(.55 * k).toFixed(3)}) ${(y1 / SH * 100).toFixed(1)}%, rgba(${col},${(.55 * k).toFixed(3)}) 100%)` }} />;
    }
    case 'sheen': {
      const [bx, by, bw, bh] = s.box, rot = s.rot ?? 0, w = s.w ?? bw * .22, p = -w + (bw + 2 * w) * Math.max(0, Math.min(1, k)), on = Math.sin(Math.PI * Math.max(0, Math.min(1, k)));
      return <div style={{ position: 'absolute', left: bx, top: by, width: bw, height: bh, overflow: 'hidden', transform: `rotate(${rot}deg)`, opacity: a * on, mixBlendMode: 'screen', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: p - w / 2, top: -bh * .3, width: w, height: bh * 1.6, transform: 'skewX(-18deg)', background: 'linear-gradient(90deg, rgba(255,246,220,0), rgba(255,246,220,.55) 50%, rgba(255,246,220,0))' }} /></div>;
    }
  }
  return null;
};
export const LIGHT6_TYPES = ['lamp', 'shaft', 'motes', 'shadow', 'haze', 'sheen'];
