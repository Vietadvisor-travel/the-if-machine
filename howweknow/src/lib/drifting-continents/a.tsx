// drifting-continents — ACT I–II drawings (18 Nov 2026): the jigsaw on the table, the old atlas torn down the Atlantic, the boots on the rock
// that does not move, the four clues, the maps that fly off like leaves, the Greenland ice and the dog sledge, the weather balloon, the 1910s
// desk, the torn newspaper, the 1912 lecture hall, the Pangaea quilt, Mesosaurus, the fossil map, Glossopteris and the frozen fern.
// COASTLINES are REAL: Natural Earth 1:50m (public domain, via the npm package world-atlas 2.0.2), each continent merged from its countries and
// simplified (Douglas–Peucker) to 30–130 points, stored below as [lon, lat]. A continent is drawn either as on a world map (plate carrée) or
// in its true shape (sinusoidal about its own centre; Antarctica polar, 0° up, 90°E right). PANGAEA = those true shapes placed and rotated as
// in Wegener's reconstructions (D-01) and the modern Gondwana fit (South America's bulge in the Gulf of Guinea, Antarctica under southern
// Africa with India and Australia along its coast), the Tethys a wedge of sea opening to the east.
// Living things on anatomy.tsx: HumanHand (Gray's proportions), Skin chains with FK legs for Mesosaurus (≈1 m: long needle-toothed snout, deep
// swimming tail, small paddle feet, thick ribs — Senckenberg specimen, P-02), sledge dogs (Greenland husky) and the walkers beside them.
import React, { useMemo } from 'react';
import { mix } from '../../paint/paint';
import { Line, Stipple, SEP, ell, SR, Floor, Fell, Hand, N, Pt, f1, cl, lerp, rect, rr, pathOf, rnd, NightWash, Star, starField } from '../star-distance/kit';
import { Skin, fk, stride, deg, Joint, HumanHand } from '../../paint/anatomy';

const VERM = '#B8432A';
const D2R = Math.PI / 180;
const ease = (t: N) => { const u = cl(t); return u * u * (3 - 2 * u); };
const outBack = (t: N) => { const u = cl(t) - 1, c = 1.7; return 1 + (c + 1) * u * u * u + c * u * u; };
const stag = (v: N, i: N, n: N, w = .5) => cl((v - i * (1 - w) / Math.max(1, n - 1)) / w);   // the i-th of n staggered over 0..1
// a closed (or open) Catmull–Rom curve through points
const sm = (pts: Pt[], closed = true) => {
  const n = pts.length; if (n < 2) return ''; const g = (i: N) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`; }
  return d + (closed ? 'Z' : '');
};
const rot = (p: Pt, a: N): Pt => { const c = Math.cos(a * D2R), s = Math.sin(a * D2R); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
const jag = (x0: N, y0: N, x1: N, y1: N, n: N, amp: N, seed: N): Pt[] => Array.from({ length: n + 1 }, (_, i) => { const u = i / n, e = i === 0 || i === n ? 0 : (rnd(seed + i * 1.7) - .5) * 2 * amp;
  return [lerp(x0, x1, u) + e * (y1 - y0 ? 1 : 0), lerp(y0, y1, u) + e * (y1 - y0 ? 0 : 1)]; });

// ================================================================ GEOGRAPHY (Natural Earth 1:50m, simplified; [lon, lat])
const GEO: Record<string, Pt[]> = {
  SAM: [[-57.2,5.5],[-54.4,5.9],[-51.2,4.1],[-49.9,1.2],[-52.7,-1.6],[-50.9,-0.9],[-49.6,-2.7],[-47.4,-0.6],[-44.7,-1.7],[-44.7,-3.2],[-40,-2.9],[-35.4,-5.3],[-34.8,-8],[-38.9,-12.8],[-41,-22],[-48.7,-25.4],[-48.8,-28.6],[-52,-32.1],[-51.3,-30],[-54.2,-34.7],[-57.8,-34.5],[-58.2,-32.5],[-58.5,-34.3],[-56.7,-37],[-58.2,-38.4],[-62.3,-38.8],[-62.4,-40.9],[-65.1,-40.8],[-63.6,-42.7],[-65,-42.7],[-65.6,-45],[-67.6,-46.1],[-65.8,-47.9],[-69,-50],[-68.4,-52.4],[-71.7,-53.8],[-71.2,-52.8],[-73.1,-53.2],[-71.5,-52.6],[-74,-52.6],[-72.5,-52.3],[-75.1,-50.7],[-73.8,-50.9],[-74.6,-48],[-73.4,-48.1],[-75.7,-46.7],[-74,-45.4],[-73.8,-46.6],[-72.7,-44.6],[-73.7,-37.3],[-71.5,-32.7],[-70.4,-18.4],[-76.3,-14.1],[-81.1,-6.1],[-79.7,-2.6],[-80.9,-1.1],[-77.1,3.9],[-77.4,8.6],[-76.8,7.9],[-75.4,10.6],[-71.7,12.4],[-71.7,9.1],[-70,12.2],[-68.1,10.5],[-61.9,10.7],[-62.9,10.5],[-60.8,9.4],[-61.6,8.6],[-59.2,8.1]],
  AFR: [[16.4,-28.6],[11.8,-18],[13.8,-11.1],[12.3,-6.1],[13.1,-5.9],[8.7,-0.6],[10,0.2],[9.7,4.1],[8.3,4.9],[6.1,4.3],[3.7,6.6],[-7.7,4.4],[-12.5,7.4],[-15.1,12],[-16.8,12.5],[-16.7,13.4],[-15.4,13.5],[-17.5,14.8],[-16,17.9],[-16.9,21.9],[-14.4,26.3],[-10.2,29.4],[-9.2,32.6],[-5.9,35.8],[-1.9,35.1],[1.3,36.5],[9.7,37.3],[11.1,36.9],[10.3,33.7],[18.9,30.3],[21.6,32.9],[29.1,30.8],[34.2,31.3],[34.2,27.8],[32.4,29.6],[38.6,18],[37,17.1],[36.5,14.3],[40.2,14.4],[43.1,12.7],[42.5,11.5],[44.4,10.4],[51.3,11.8],[48,4.5],[39.2,-4.7],[40.8,-14.8],[34.6,-19.7],[35.5,-24.1],[32.8,-25.6],[32.5,-28.2],[30.3,-31],[26.6,-33.7],[19.6,-34.8],[18.4,-34.2]],
  NAM: [[-130.6,54.8],[-135.4,59.4],[-136.6,58.2],[-147.8,61.2],[-151.9,59.3],[-149.4,61.5],[-163.3,54.8],[-156.8,59.1],[-162.1,58.6],[-162,60.7],[-165.4,60.5],[-160.9,64.8],[-168.1,65.7],[-160.2,66.5],[-166.8,68.4],[-156.5,71.4],[-135.3,68.7],[-128,70.6],[-107.3,66.4],[-105.7,68.6],[-108.3,68.6],[-97.8,68.5],[-95.8,66.6],[-94.6,72],[-87.4,67.2],[-85.5,69.8],[-81.3,69.1],[-82.6,66.6],[-91.4,65.9],[-87,65.1],[-93.7,64.1],[-90.7,63.1],[-95,59.1],[-92.8,56.9],[-82.4,55.1],[-80.9,51.1],[-76.5,56.4],[-77.4,62.6],[-69.5,61],[-69,57.9],[-64.5,60.3],[-60.6,55.1],[-57.4,54.6],[-60.3,53.3],[-56,53.5],[-57,51.5],[-66.5,50.2],[-74.3,45.5],[-65.5,49.3],[-66.7,48],[-61,45.3],[-65.5,43.5],[-64.6,45.9],[-68.8,44.6],[-75.9,37.2],[-77,38.9],[-75.5,35.8],[-81.4,31.2],[-80.5,25.2],[-86.3,30.5],[-94.8,29.8],[-97.8,27.5],[-95.9,18.8],[-91.5,18.5],[-87,21.6],[-88.9,15.9],[-83.4,15.2],[-83.3,10.3],[-78.1,9.2],[-77.9,7.2],[-79.1,9],[-80.7,7.2],[-83.6,8.5],[-87.5,13.4],[-104.9,19.3],[-114.9,31.9],[-110,22.9],[-123.7,38.9],[-122.9,49.4]],
  EUR: [[35,29.6],[36.2,36.8],[27.5,36.7],[26.1,39.9],[41.4,41.4],[36.6,45.2],[39.2,47.3],[33.9,44.4],[31.8,47.2],[29,41],[22.6,40.5],[23.2,36.4],[13.6,45.8],[12.4,44.2],[18.5,40.2],[16.1,37.9],[8.8,44.4],[3.3,43.2],[-2.1,36.8],[-9,37],[-9.2,43.2],[-0.5,45],[-4.7,48.5],[9.8,53.6],[8.6,57.1],[10.6,57.7],[9.9,54.5],[14.6,53.6],[21.2,54.9],[23.5,59.2],[30.2,59.9],[21.4,60.6],[25.4,65],[22.4,65.9],[14.2,55.4],[10.6,59.8],[5.6,58.6],[5,61],[7.6,61.2],[5.1,62.2],[19.2,69.7],[27.7,71.1],[39.8,68.2],[39.3,66.1],[31.9,67.2],[37.4,63.8],[44.1,66],[43.3,68.7],[46.5,66.8],[60.9,69.8],[68.5,68.3],[66.6,71.1],[71.5,72.9],[73.6,68.5],[69,66.8],[72.1,66.3],[75.1,68.9],[78.9,67.6],[73.8,69.2],[74.8,72.8],[83.1,71.7],[83.1,70.1],[80.6,73.6],[86.7,73.1],[87,75.2],[104.2,77.7],[113.9,75.9],[105.1,72.8],[124.5,73.8],[131,70.7],[140.8,72.9],[158.7,70.9],[160.9,68.5],[179.9,69],[180,69],[190.2,66.1],[186.8,64.3],[180.3,66.1],[179.8,65],[174.5,64.7],[179.1,62.3],[163.5,59.9],[163.3,56.2],[156.7,51],[156,56.8],[165.4,62.5],[157.1,61.7],[155.2,59.2],[142.6,59.2],[135.3,54.9],[141.5,52.2],[135.5,43.8],[127.6,39.8],[129.2,35.2],[126.5,34.3],[126.6,37.8],[124.4,40],[121.2,38.7],[121.8,41],[117.8,39.1],[122.7,37.4],[119.2,34.8],[122.1,29.9],[119.6,25.4],[110.3,20.3],[106.7,21],[109.4,12.6],[105.1,8.6],[100,13.4],[104.2,1.4],[98.3,8.2],[97.7,16.6],[94.2,16],[92.2,21.1],[96,29.4],[86,27.9],[78.8,31.3],[74.7,37],[66.2,29.8],[60.8,29.9],[61.4,25.1],[53.7,26.7],[49,30.5],[51.3,24.3],[56.4,26.4],[59.8,22.3],[55.1,17],[44,12.6]],
  IND: [[88.1,27.9],[92,27.7],[96,29.4],[97.3,28],[97.1,27.1],[95.1,26.6],[94.1,23.9],[93.3,24.1],[92.3,20.8],[91.5,22.9],[90.3,23.5],[90.2,21.8],[90,22.5],[88.1,21.6],[87.9,22.4],[86.8,20.3],[80.3,15.7],[79.8,10.3],[77.5,8.1],[73.3,16.5],[72.8,22.2],[70.7,20.7],[69,22.3],[70.5,23.1],[68.8,23.1],[66.4,25.6],[61.6,25.2],[63.3,27.2],[60.8,29.9],[66.2,29.8],[66.8,31.3],[69.3,31.9],[69.9,34],[71.1,34],[71.2,36.1],[74.7,37],[78.9,34.4],[78.8,31.3],[86,27.9]],
  AUS: [[143.2,-12],[143.8,-14.3],[145.3,-14.9],[146.4,-19],[148.8,-20.3],[153.2,-26],[152.9,-31.4],[149.9,-37.5],[146.4,-39.1],[144.9,-37.9],[143.5,-38.8],[141.4,-38.4],[139.8,-37.2],[139.3,-35.4],[138.2,-35.6],[138.1,-34.2],[136.9,-35.2],[137.8,-32.6],[135.6,-34.9],[134.2,-32.5],[131.1,-31.5],[117.9,-35.1],[115,-34.3],[115.7,-31.7],[113.2,-26.2],[114.2,-26.3],[113.4,-24.4],[114,-21.9],[121,-19.6],[122.3,-17.1],[123,-16.4],[123.6,-17.5],[123.6,-16.2],[124.8,-16.4],[124.4,-15.5],[126.1,-14],[127.5,-14],[128.1,-15.3],[129.6,-15.1],[130.6,-12.4],[132.7,-12.1],[132,-11.2],[136.5,-12],[135.5,-14.9],[140.5,-17.6],[142.5,-10.7]],
  ANT: [[-180,-84.4],[-156.5,-85.2],[-174.2,-82.8],[-153.4,-82.6],[-157,-81.3],[-148.1,-79.9],[-158.2,-77.2],[-145.7,-77.5],[-149.7,-76.4],[-135.4,-74.7],[-114.6,-73.9],[-114.1,-75],[-101,-75.4],[-102.8,-73.6],[-98.9,-73.6],[-103.1,-72.7],[-68.8,-73.1],[-67.5,-67.1],[-57.4,-63.2],[-65.5,-67.4],[-61,-74.5],[-77.2,-76.6],[-72.9,-77.7],[-81.6,-77.8],[-77.9,-78.7],[-83.8,-78],[-75.1,-80.9],[-62.4,-81.6],[-66.1,-82],[-60.5,-82.2],[-61.4,-83.4],[-23.6,-80],[-36.2,-78.5],[-18.3,-75.4],[-10.3,-70.9],[26.5,-71],[33.5,-68.7],[38.9,-70.2],[53.7,-65.9],[56.2,-67.3],[69.6,-67.8],[67.3,-73.3],[84.5,-67.1],[113.1,-65.8],[114,-67.4],[133.4,-66.1],[143.7,-66.9],[170.4,-71.4],[160.9,-75.3],[167.1,-78.7],[161.7,-78.5],[158.6,-80.4],[161.3,-82.5],[179.6,-84.3]],
  GRN: [[-30,83.6],[-21.7,82.7],[-29.9,82.1],[-21.3,82.1],[-23.1,80.8],[-11.4,81.5],[-20.2,80],[-19.3,74.3],[-27.6,73.1],[-22,72.9],[-26.7,72.7],[-21.5,70.5],[-27.1,71.6],[-29.1,70.4],[-22.3,70],[-40.2,65.6],[-43.9,59.8],[-50.3,62.5],[-51.2,66.9],[-53.6,66.2],[-51.8,71.7],[-55.6,71.6],[-58.5,75.7],[-68.3,76.1],[-71.2,77.1],[-66.3,77.6],[-72.8,78.2],[-60.4,81.9],[-44.7,81.8],[-41.4,82.8],[-46.2,83.1]],
  MAD: [[49.5,-12.4],[50.4,-15.6],[50.2,-16],[49.7,-15.5],[49.8,-16.5],[49.4,-18.3],[47.2,-24.8],[45.1,-25.5],[44,-25],[43.3,-22.4],[44.4,-19.9],[44,-17.4],[44.5,-16.2],[46.4,-15.9],[47.4,-14.8],[47.5,-15],[48,-14.7],[47.9,-13.7],[48.8,-13.3],[48.8,-12.5],[49.2,-12.1]],
  GBR: [[-2.7,51.6],[-3.6,51.4],[-5.3,51.9],[-4.1,52.3],[-4.1,52.9],[-4.7,52.8],[-4.3,53.1],[-2.7,53.3],[-3.1,53.5],[-2.9,54.2],[-3.6,54.6],[-3,55],[-5.1,54.9],[-4.7,55.5],[-4.8,56.2],[-5.4,56],[-5.8,55.4],[-5.2,56.8],[-6.1,56.7],[-5.7,56.9],[-5.7,57.7],[-5.2,57.9],[-5.4,58.1],[-5,58.6],[-3.1,58.6],[-4.1,57.6],[-1.9,57.6],[-2.5,56.6],[-3.3,56.4],[-2.7,56.3],[-3.8,56.1],[-2.1,55.9],[-1.2,54.7],[-0.1,54.1],[0.1,53.6],[-0.7,53.7],[0.3,53.3],[0,52.9],[1.3,52.9],[1.7,52.6],[1.3,51.8],[0.4,51.5],[1.4,51.4],[1,50.9],[-3,50.7],[-3.7,50.2],[-5.7,50.1],[-4.2,51.2],[-3.1,51.2],[-2.4,51.7]],
  JPN: [[141.2,41.4],[142,39.4],[141,38.1],[140.6,36.2],[140.9,35.7],[140.4,35.2],[139.8,35],[140.1,35.6],[139.8,35.7],[138.9,34.6],[138.7,35.1],[138.2,34.6],[137.1,34.6],[137.3,34.8],[136.8,35.1],[136.5,34.7],[136.9,34.3],[135.7,33.5],[135.1,34],[135.4,34.6],[134.7,34.8],[132.3,34.3],[132.1,33.8],[130.9,34],[131,34.4],[132.9,35.5],[135.9,35.6],[136.8,37.4],[137.3,37.5],[136.9,37.1],[137.2,36.8],[138.3,37.2],[139.8,38.9],[140,40.7],[140.4,41.2],[141.1,40.9],[141.2,41.2],[140.8,41.3]],
  NZL: [[173.1,-41.3],[174.4,-41.1],[174.2,-41.9],[172.5,-43.5],[173.1,-43.8],[172,-43.7],[171.2,-44.3],[170.8,-45.9],[169.1,-46.6],[166.5,-46],[168.4,-44.1],[171,-42.9],[172.3,-40.8],[172.9,-40.5],[172.7,-40.7]],
};
const CEN: Record<string, Pt> = {};
for (const k in GEO) { const p = GEO[k]; CEN[k] = [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length]; }
CEN.ANT = [0, -90];
const polarP = ([lo, la]: Pt): Pt => { const r = 90 + la; return [r * Math.sin(lo * D2R), -r * Math.cos(lo * D2R)]; };
// SH[k] = [as on a world map, true shape], both centred on the continent's centre (Antarctica: on the pole), units = degrees of latitude
const SH: Record<string, [Pt[], Pt[]]> = {};
for (const k in GEO) { const [l0, a0] = CEN[k];
  if (k === 'ANT') { const P = GEO[k].map(polarP); SH[k] = [P.map(([a, b]) => [a * 1.3, b * .46] as Pt), P]; continue; }
  SH[k] = [GEO[k].map(([lo, la]) => [lo - l0, -(la - a0)] as Pt), GEO[k].map(([lo, la]) => [(lo - l0) * Math.cos(la * D2R), -(la - a0)] as Pt)]; }
const shape = (k: string, u = 1): Pt[] => { const [A, B] = SH[k]; if (u >= 1) return B; if (u <= 0) return A; return A.map((p, i) => [lerp(p[0], B[i][0], u), lerp(p[1], B[i][1], u)] as Pt); };
const xf = (pts: Pt[], X: N, Y: N, k: N, r = 0): Pt[] => { const c = Math.cos(r * D2R), s = Math.sin(r * D2R); return pts.map(([a, b]) => [X + (a * c - b * s) * k, Y + (a * s + b * c) * k] as Pt); };
const cpath = (key: string, X: N, Y: N, k: N, r = 0, u = 1) => sm(xf(shape(key, u), X, Y, k, r));
// the longest cyclic run of a continent's points that pass a test (a stretch of coast) → point indices in order
const run = (key: string, test: (p: Pt) => boolean): number[] => {
  const P = GEO[key], n = P.length, ok = P.map(test); let best: number[] = [], cur: number[] = [];
  for (let i = 0; i < 2 * n; i++) { if (ok[i % n]) { cur.push(i % n); if (cur.length > best.length && cur.length <= n) best = [...cur]; } else cur = []; }
  return best;
};
const COAST_BR = run('SAM', ([lo, la]) => lo > -55 && la < 6 && la > -35);          // Brazil's coast, Guianas → Uruguay
const COAST_WA = run('AFR', ([lo, la]) => lo < 19 && la < 16 && la > -35);           // West Africa, Senegal → the Cape
const seg = (key: string, idx: number[], X: N, Y: N, k: N, r = 0, u = 1) => { const S = xf(shape(key, u), X, Y, k, r); return sm(idx.map(i => S[i]), false); };
// world-map position of a continent's centre (plate carrée about lon0/lat0); Antarctica sits under the map as an oblique view
const wpos = (k: string, cx: N, cy: N, kk: N, lon0 = 0, lat0 = 0): Pt => { const [lo, la] = k === 'ANT' ? [10, -78] : CEN[k]; return [cx + (lo - lon0) * kk, cy - (la - lat0) * kk]; };

// PANGAEA (≈250 million years ago), Africa fixed: [x, y, rotation°] of each continent's centre, in degrees of latitude about Africa's centre
const PG: Record<string, [N, N, N]> = {
  AFR: [0, 0, 0], MAD: [27, 14, -10], SAM: [-27, 30, -46], NAM: [-52, -32, 14], GRN: [-26, -60, 8], EUR: [40, -44, -6],
  IND: [42, 28, 30], ANT: [28, 56, -60], AUS: [74, 42, 70], GBR: [-20, -50, 0], JPN: [100, -40, 0], NZL: [100, 70, 0],
};
// where a continent sits relative to South America when the Atlantic is closed (South America unrotated) — the "ghost" fit
const fitTo = (k: string, ref = 'SAM'): [N, N, N] => { const a = PG[k], b = PG[ref], d = rot([a[0] - b[0], a[1] - b[1]], -b[2]); return [d[0], d[1], a[2] - b[2]]; };
const PANG = ['NAM', 'GRN', 'EUR', 'SAM', 'AFR', 'MAD', 'IND', 'ANT', 'AUS'];

// ---------------------------------------------------------------- small shared drawings
// the sea as an old engraver draws it: a wash ruled with fine horizontal lines
const Ruled: React.FC<{ x: N; y: N; w: N; h: N; col: string; gap?: N; a?: N; lw?: N }> = ({ x, y, w, h, col, gap = 7, a = .25, lw = .8 }) =>
  <g><rect x={x} y={y} width={w} height={h} fill={col} />{Array.from({ length: Math.round(h / gap) }, (_, i) => <line key={i} x1={x} y1={y + i * gap} x2={x + w} y2={y + i * gap} stroke={SEP} strokeWidth={lw} opacity={a} />)}</g>;
// coast ripples: the coastline repeated outward, fading (old atlas water lines)
const Ripples: React.FC<{ d: string; n?: N; col?: string; a?: N }> = ({ d, n = 4, col = '#22507A', a = .5 }) =>
  <g>{Array.from({ length: n }, (_, i) => <path key={i} d={d} fill="none" stroke={col} strokeWidth={(n - i) * 5 + 2} opacity={a * (1 - i / n) * .25} strokeLinejoin="round" />)}</g>;
// a Glossopteris leaf: tongue-shaped (long oval, blunt tip, narrow base), strong midrib, fine net veins. Base at (x,y), pointing `a`°.
const GlossLeaf: React.FC<{ x: N; y: N; L: N; a: N; col?: string; vein?: string; draw?: N; w?: N; fold?: N }> = ({ x, y, L, a, col = '#5F8A5A', vein = '#2F5440', draw = 1, w = .26, fold = 0 }) => {
  const W = L * w * (1 - fold * .8), q = (u: N, v: N): Pt => { const p = rot([u * L, v], a); return [x + p[0], y + p[1]]; };
  const prof = (u: N) => W * Math.pow(Math.sin(Math.PI * Math.pow(u, .75)), .9) * (u > .85 ? 1 - (u - .85) * 1.2 : 1);
  const up: Pt[] = [], dn: Pt[] = []; for (let i = 0; i <= 14; i++) { const u = i / 14; up.push(q(u, -prof(u) * .5)); dn.push(q(u, prof(u) * .5)); }
  const d = sm([...up, ...dn.reverse()]);
  return <g opacity={draw}>
    <path d={d} fill={col} stroke={SEP} strokeWidth={Math.max(.6, L / 110)} />
    <path d={`M${q(0, 0).join(' ')} L${q(.97, 0).join(' ')}`} stroke={vein} strokeWidth={Math.max(.7, L / 60)} />
    {L > 30 && Array.from({ length: 9 }, (_, i) => { const u = .12 + i * .09, h = prof(u) * .48; return <g key={i}>
      <path d={`M${q(u, 0).join(' ')} Q${q(u + .05, -h * .5).join(' ')} ${q(u + .1, -h).join(' ')} M${q(u, 0).join(' ')} Q${q(u + .05, h * .5).join(' ')} ${q(u + .1, h).join(' ')}`} stroke={vein} strokeWidth={.5} fill="none" opacity={.6} />
      {L > 80 && <path d={`M${q(u + .03, -h * .3).join(' ')} L${q(u + .08, -h * .62).join(' ')} M${q(u + .03, h * .3).join(' ')} L${q(u + .08, h * .62).join(' ')}`} stroke={vein} strokeWidth={.4} opacity={.5} />}</g>; })}
  </g>;
};
// a tiny reptile glyph (Mesosaurus in one line: long snout, slim body, long tail, four little legs), facing right, ~ 3·r long
const ReptGlyph: React.FC<{ x: N; y: N; r: N; col?: string; a?: N }> = ({ x, y, r, col = VERM, a = 1 }) =>
  <g opacity={a} transform={`translate(${x} ${y}) scale(${r / 10})`}>
    <path d="M-16 0 C-10 -2 -4 -3 2 -3 C6 -3 8 -2 10 -1.5 L16 -1 L10 .3 C8 1 6 1.6 2 1.8 C-4 2 -10 1.5 -16 0Z" fill={col} />
    <path d="M-2 1.5 l-2 3 M5 1.5 l1.5 3 M-3 -2.5 l-2 -2.6 M5 -2.6 l2 -2.4" stroke={col} strokeWidth={1.1} strokeLinecap="round" /></g>;
// a tiny skeleton glyph (for map pins)
const BoneGlyph: React.FC<{ x: N; y: N; r: N }> = ({ x, y, r }) =>
  <g transform={`translate(${x} ${y}) scale(${r / 10})`} stroke={SEP} fill="none" strokeLinecap="round">
    <path d="M-15 1 Q-6 -2 4 -1 L14 -0.5" strokeWidth={1.2} /><path d="M4 -1.6 L15 -.6 L4 .6" strokeWidth={.8} />
    {[-6, -4, -2, 0, 2].map(v => <path key={v} d={`M${v} -1 q1 3 0 4.5`} strokeWidth={.7} />)}<path d="M-3 1 l-2 4 M2 1 l2 4" strokeWidth={.8} /></g>;
// an hourglass of turned wood and glass; sand 0..1 runs the sand from the top bulb to the bottom
const Hourglass: React.FC<{ x: N; y: N; s: N; sand: N; draw?: N; id: string }> = ({ x, y, s, sand, draw = 1, id }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, up = 1 - cl(sand), dn = cl(sand);
  const glass = `M${X(-60)} ${Y(-150)} C${X(-60)} ${Y(-60)} ${X(-8)} ${Y(-20)} ${X(-8)} ${Y(0)} C${X(-8)} ${Y(20)} ${X(-60)} ${Y(60)} ${X(-60)} ${Y(150)} H${X(60)} C${X(60)} ${Y(60)} ${X(8)} ${Y(20)} ${X(8)} ${Y(0)} C${X(8)} ${Y(-20)} ${X(60)} ${Y(-60)} ${X(60)} ${Y(-150)}Z`;
  return <g opacity={draw}>
    <defs><clipPath id={id}><path d={glass} /></clipPath></defs>
    <Floor x={x} y={Y(172)} rx={110 * s} ry={10 * s} a={.35} />
    <path d={glass} fill="#DCEAF0" fillOpacity={.45} />
    <g clipPath={`url(#${id})`}>
      <rect x={X(-62)} y={Y(-150 + 150 * (1 - up) * .92)} width={124 * s} height={150 * s} fill="#D9AE6C" />
      <path d={`M${X(-62)} ${Y(150)} L${X(-62)} ${Y(150 - 70 * dn)} Q${x} ${Y(150 - 150 * dn)} ${X(62)} ${Y(150 - 70 * dn)} L${X(62)} ${Y(150)}Z`} fill="#C9954E" />
      {sand > 0 && sand < 1 && <line x1={x} y1={Y(0)} x2={x} y2={Y(150 - 100 * dn)} stroke="#C9954E" strokeWidth={2.4 * s} />}
    </g>
    <path d={glass} fill="none" stroke={SEP} strokeWidth={1.6} />
    <path d={`M${X(-44)} ${Y(-130)} Q${X(-38)} ${Y(-70)} ${X(-16)} ${Y(-30)}`} stroke="#FFFDF4" strokeWidth={4 * s} fill="none" opacity={.6} />
    {[-168, 150].map(t => <SR key={t} d={rr(X(-86), Y(t), 172 * s, 18 * s, 6 * s)} mat="wood" t={.55} draw={draw} sw={1.3} />)}
    {[-74, 74].map(px => <SR key={px} d={rect(X(px - 6), Y(-150), 12 * s, 300 * s)} mat="wood" t={.62} draw={draw} sw={1} hatch={0} />)}
  </g>;
};
// a world-map jigsaw piece outline: square of side z with a knob (+1), a hole (−1) or a flat edge (0) on each side [top, right, bottom, left]
const jigsaw = (cx: N, cy: N, z: N, r: N, tabs: N[]): string => {
  const h = z / 2, P: Pt[] = [];
  const side = (a: Pt, b: Pt, t: N) => { const dx = b[0] - a[0], dy = b[1] - a[1], nx = dy / z, ny = -dx / z;   // outward normal for a clockwise square
    const at = (u: N, v: N): Pt => [a[0] + dx * u + nx * v * z, a[1] + dy * u + ny * v * z];
    P.push(a); if (t === 0) return; P.push(at(.36, 0), at(.38, .1 * t), at(.32, .2 * t), at(.4, .3 * t), at(.5, .32 * t), at(.6, .3 * t), at(.68, .2 * t), at(.62, .1 * t), at(.64, 0)); };
  const C: Pt[] = [[-h, -h], [h, -h], [h, h], [-h, h]];
  for (let i = 0; i < 4; i++) side(C[i], C[(i + 1) % 4], tabs[i]);
  const R = P.map(p => { const q = rot(p, r); return [cx + q[0], cy + q[1]] as Pt; });
  return 'M' + R.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z';
};
// a pushpin seen from the front-above
const Pin: React.FC<{ x: N; y: N; s?: N; col?: string }> = ({ x, y, s = 1, col = VERM }) =>
  <g><ellipse cx={x + 6 * s} cy={y + 8 * s} rx={10 * s} ry={5 * s} fill={SEP} opacity={.3} filter="url(#b2s)" />
    <circle cx={x} cy={y} r={11 * s} fill={col} stroke={SEP} strokeWidth={1.2} /><circle cx={x - 3.5 * s} cy={y - 4 * s} r={3.5 * s} fill="#FFFDF4" opacity={.7} /></g>;
