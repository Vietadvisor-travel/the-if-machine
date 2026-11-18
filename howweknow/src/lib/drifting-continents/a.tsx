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
  if (k === 'ANT') { const P = GEO[k].map(polarP); SH[k] = [P.map(([a, b]) => [a * 1.05, b * .8] as Pt), P]; continue; }
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
const COAST_SEAM = run('SAM', ([lo, la]) => lo > -55 && la < -4 && la > -35);        // the seam that meets Africa (Natal → Uruguay)
const COAST_WA = run('AFR', ([lo, la]) => lo < 19 && la < 16 && la > -35);           // West Africa, Senegal → the Cape
const seg = (key: string, idx: number[], X: N, Y: N, k: N, r = 0, u = 1) => { const S = xf(shape(key, u), X, Y, k, r); return sm(idx.map(i => S[i]), false); };
// world-map position of a continent's centre (plate carrée about lon0/lat0); Antarctica sits under the map as an oblique view
const wpos = (k: string, cx: N, cy: N, kk: N, lon0 = 0, lat0 = 0): Pt => { const [lo, la] = k === 'ANT' ? [10, -78] : CEN[k]; return [cx + (lo - lon0) * kk, cy - (la - lat0) * kk]; };

// PANGAEA (≈250 million years ago), Africa fixed: [x, y, rotation°] of each continent's centre, in degrees of latitude about Africa's centre
const PG: Record<string, [N, N, N]> = {
  AFR: [0, 0, 0], MAD: [27, 14, -10], SAM: [-27, 32, -52], NAM: [-46, -30, 14], GRN: [-15, -49, 18], EUR: [32, -39, 4],
  IND: [36, 32, 12], ANT: [12, 63, -60], AUS: [50, 54, 18], GBR: [-20, -50, 0], JPN: [100, -40, 0], NZL: [100, 70, 0],
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

// a continent as a cut puzzle piece of a printed world map: plywood edge (thickness) under a printed top (land colour, coast ripples)
const CONT_COL: Record<string, string> = { SAM: '#B9C27E', AFR: '#E2C27A', NAM: '#C9B98A', EUR: '#D7B48A', GRN: '#E8EEF0', IND: '#E0A878', AUS: '#E9A86C', ANT: '#F4F4EE', MAD: '#D9C080' };
const Piece: React.FC<{ k: string; X: N; Y: N; kk: N; r?: N; draw?: N; lift?: N; u?: N }> = ({ k, X, Y, kk, r = 0, draw = 1, lift = 0, u = 1 }) => {
  const d = cpath(k, X, Y - lift, kk, r, u), side = cpath(k, X + 3, Y + 7 - lift, kk, r, u);
  return <g opacity={draw}>
    <path d={cpath(k, X + 8 + lift * .6, Y + 14 + lift * .4, kk, r, u)} fill={SEP} opacity={.28 + lift * .004} filter="url(#b8)" />
    <path d={side} fill="#8C5A36" stroke={SEP} strokeWidth={1.2} />
    <path d={d} fill={CONT_COL[k] || '#D9C080'} stroke={SEP} strokeWidth={1.8} />
    <path d={d} fill="url(#h1_45)" opacity={.18} />
    <path d={cpath(k, X - 1.5, Y - 2 - lift, kk * .985, r, u)} fill="none" stroke="#FFF8E6" strokeWidth={2} opacity={.45} />
  </g>;
};

// ================================================================ 1. THE JIGSAW — a wooden table seen from above, a world-map puzzle tipped out on it: sea-blue
// knob-and-hole pieces scattered, and the continents cut as pieces. Heroes: South America (left) and Africa (right).
// slide: Africa slides in from 260 px right and nests against Brazil's bulge (1 = locked, a tiny jolt) · glow: a vermilion line along the joined
// seam · future: every piece drifts into an unfamiliar new supercontinent · hand: a child's hand comes up from the bottom and rests on the pieces
// · apart: the hand pushes the two heroes 30 px apart.
const FUT: Record<string, [N, N, N]> = { NAM: [-130, -150, -36], GRN: [-30, -250, -20], EUR: [150, -150, 24], SAM: [-250, 70, -78], AFR: [40, 40, 38], MAD: [150, 120, 20], IND: [170, 20, 12], AUS: [290, -30, 84], ANT: [10, 260, 160] };
const Jigsaw: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, slide = 1, glow = 0, future = 0, hand = 0, apart = 0, tm = 0 }) => {
  const kk = 7.2 * s, fu = ease(future), sl = ease(slide);
  const jolt = slide > .9 && slide < 1 ? Math.sin((slide - .9) / .1 * Math.PI * 3) * 4 * (1 - (slide - .9) / .1) : 0;
  const afr: Pt = [x + 120 * s, y - 20 * s], fS = PG.SAM;
  const homes: Record<string, [N, N, N, N]> = {   // [x, y, rot, scale] on the table before the future
    AFR: [afr[0] + (1 - sl) * 260 * s + jolt * s + apart * 15 * s, afr[1], 0, kk],
    SAM: [afr[0] + fS[0] * kk - apart * 15 * s, afr[1] + fS[1] * kk, fS[2], kk],
    NAM: [x - 760 * s, y - 330 * s, -20, kk * .55], EUR: [x + 700 * s, y - 360 * s, 12, kk * .5], AUS: [x + 760 * s, y + 300 * s, 30, kk * .6],
    ANT: [x - 720 * s, y + 380 * s, 0, kk * .5], IND: [x + 520 * s, y + 380 * s, -40, kk * .6], GRN: [x - 380 * s, y - 440 * s, 25, kk * .6], MAD: [x + 600 * s, y + 80 * s, 50, kk * .6] };
  const sea = useMemo(() => Array.from({ length: 22 }, (_, i) => { const a = rnd(i * 3.1) * Math.PI * 2, R = 380 + rnd(i * 1.7) * 620;
    return { px: Math.cos(a) * R * 1.4, py: Math.sin(a) * R * .75, r: rnd(i * 5.3) * 360, tabs: [0, 1, 2, 3].map(j => [1, -1, 1, 0][Math.floor(rnd(i * 7 + j) * 4)]) }; }), []);
  const handY = y + 820 * s - ease(hand) * 420 * s;
  return <g opacity={draw}>
    {/* the table: planks with grain */}
    <rect x={-200} y={-200} width={2320} height={1480} fill="#A8743E" />
    {Array.from({ length: 9 }, (_, i) => <g key={i}><SR d={rect(-200, -200 + i * 170, 2320, 170)} mat="wood" t={.36 + (i % 3) * .05} ang={0} draw={draw} sw={1} hatch={0} />
      {Array.from({ length: 6 }, (_, j) => <path key={j} d={`M-200 ${-170 + i * 170 + j * 24} C300 ${-176 + i * 170 + j * 24 + rnd(i * 9 + j) * 14} 900 ${-162 + i * 170 + j * 24} 1400 ${-172 + i * 170 + j * 24} S2000 ${-166 + i * 170 + j * 24} 2120 ${-170 + i * 170 + j * 24}`} stroke="#4F3020" strokeWidth={.8} fill="none" opacity={.3} />)}</g>)}
    <rect x={-200} y={-200} width={2320} height={1480} fill="url(#glowW)" opacity={.25} />
    {/* sea pieces: knobs and holes */}
    {sea.map((p, i) => { const k2 = 1 + fu * .7, X = x + p.px * s * k2, Y = y + p.py * s * k2, R = p.r + fu * 40 * (rnd(i) - .5), z = 92 * s;
      return <g key={i} opacity={1 - fu * .35}><path d={jigsaw(X + 5, Y + 9, z, R, p.tabs)} fill={SEP} opacity={.3} filter="url(#b2s)" />
        <path d={jigsaw(X + 2, Y + 5, z, R, p.tabs)} fill="#8C5A36" stroke={SEP} strokeWidth={1} />
        <path d={jigsaw(X, Y, z, R, p.tabs)} fill="#8FC1CF" stroke={SEP} strokeWidth={1.4} />
        {[0, 1, 2].map(j => <path key={j} d={`M${X - 30 * s} ${Y - 18 * s + j * 16 * s} q${15 * s} ${-5 * s} ${30 * s} 0 t${30 * s} 0`} stroke="#22507A" strokeWidth={1} fill="none" opacity={.45} transform={`rotate(${R} ${X} ${Y})`} />)}</g>; })}
    {/* the continent pieces */}
    {['ANT', 'NAM', 'GRN', 'EUR', 'IND', 'MAD', 'AUS', 'SAM', 'AFR'].map((k, i) => { const h = homes[k], f = FUT[k], kf = kk * .62, w = ease(stag(future, i, 9, .6));
      const X = lerp(h[0], x + f[0] * s, w), Y = lerp(h[1], y + f[1] * s, w), R = lerp(h[2], f[2], w), K = lerp(h[3], kf, w);
      return <Piece key={k} k={k} X={X} Y={Y} kk={K} r={R} draw={draw} lift={Math.sin(w * Math.PI) * 14} />; })}
    {/* the seam, glowing */}
    {glow > 0 && <g opacity={1 - fu}>
      <path d={seg('SAM', COAST_SEAM, homes.SAM[0], homes.SAM[1], kk, fS[2])} stroke={VERM} strokeWidth={14} fill="none" opacity={.35 * glow} filter="url(#b8)" />
      <path d={seg('SAM', COAST_SEAM, homes.SAM[0], homes.SAM[1], kk, fS[2])} stroke={VERM} strokeWidth={4.5} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${glow} 1`} /></g>}
    {/* a child's hand from the bottom of the frame */}
    {hand > 0 && <HumanHand id={'jgh' + Math.round(x)} x={afr[0] - 40 * s + apart * 15 * s} y={handY} s={1.55 * s} ang={-94} pose="rest" sleeve="#C9DDE6" skin="#EDC3A0" draw={cl(hand * 4)} />}
  </g>;
};

// ================================================================ 2. THE ATLAS PAGE — an old atlas open on a desk: two foxed pages, the gutter, the Atlantic in the
// middle with Brazil on the left page and West Africa on the right, sepia ocean ruling, a cartouche and a compass rose.
// trace: a vermilion line traces Brazil's coast, then hops to West Africa's · ghost: a see-through Africa lifts off and slides west to nest in
// Brazil · tear: a jagged tear runs top → bottom down the Atlantic · gap: the halves drift apart (≤ 70 px, dark gap, paper fibres) · q: a
// vermilion question mark in the gap.
const AtlasPage: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, trace = 0, ghost = 0, tear = 0, gap = 0, q = 0 }) => {
  const id = 'atl' + Math.round(x), kk = 8.2 * s, lon0 = -15, lat0 = -9, W = 1560 * s, H = 900 * s, x0 = x - W / 2, y0 = y - H / 2;
  const P = (k: string) => wpos(k, x, y, kk, lon0, lat0), sa = P('SAM'), af = P('AFR'), na = P('NAM'), eu = P('EUR');
  const gp: [N, N, N] = fitTo('AFR'), gw = ease(ghost), gx = lerp(af[0], sa[0] + gp[0] * kk, gw), gy = lerp(af[1], sa[1] + gp[1] * kk, gw) - Math.sin(gw * Math.PI) * 30 * s, gr = lerp(0, gp[2], gw);
  const tx = x + 6 * s, tearPts = useMemo(() => jag(0, -1, 0, 1, 26, 1, 7), []).map(([a, b]) => [tx + a * 14 * s, y + b * H / 2] as Pt);
  const g = gap * 35 * s, tp = cl(tear);
  const leftClip = 'M' + [[x0 - 100, y0 - 100], [tearPts[0][0], y0 - 100], ...tearPts, [tearPts[tearPts.length - 1][0], y0 + H + 100], [x0 - 100, y0 + H + 100]].map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z';
  const rightClip = 'M' + [[x0 + W + 100, y0 - 100], [tearPts[0][0], y0 - 100], ...tearPts, [tearPts[tearPts.length - 1][0], y0 + H + 100], [x0 + W + 100, y0 + H + 100]].map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z';
  const tearUpTo = tearPts.filter(p => p[1] <= y0 + tp * H + 1);
  const page = <g>
    {/* the paper: two pages, foxing, the gutter's shade */}
    <path d={`M${x0} ${y0 + 10 * s} Q${x - W / 4} ${y0 - 8 * s} ${x} ${y0 + 6 * s} Q${x + W / 4} ${y0 - 8 * s} ${x0 + W} ${y0 + 10 * s} V${y0 + H} Q${x + W / 4} ${y0 + H - 14 * s} ${x} ${y0 + H - 4 * s} Q${x - W / 4} ${y0 + H - 14 * s} ${x0} ${y0 + H}Z`} fill="#EFE0C2" stroke={SEP} strokeWidth={1.6} />
    <defs><clipPath id={id + 'pg'}><rect x={x0 + 60 * s} y={y0 + 60 * s} width={W - 120 * s} height={H - 120 * s} /></clipPath></defs>
    <g clipPath={`url(#${id}pg)`}>
      <Ruled x={x0} y={y0} w={W} h={H} col="#D8DCC6" gap={6 * s} a={.22} />
      {(['NAM', 'EUR', 'SAM', 'AFR', 'GRN', 'GBR'] as string[]).map(k => { const p = P(k); return <Ripples key={k} d={cpath(k, p[0], p[1], kk, 0, 0)} col="#3E7FA3" a={.6} />; })}
      {(['NAM', 'EUR', 'GRN', 'GBR'] as string[]).map(k => { const p = P(k); return <SR key={k} d={cpath(k, p[0], p[1], kk, 0, 0)} mat="sand" t={.22} draw={draw} sw={1.4} />; })}
      <SR d={cpath('SAM', sa[0], sa[1], kk, 0, 0)} mat="land" t={.3} draw={draw} sw={1.8} />
      <SR d={cpath('AFR', af[0], af[1], kk, 0, 0)} mat="desert" t={.3} draw={draw} sw={1.8} />
      {/* graticule */}
      {[-60, -40, -20, 0, 20].map(lo => <line key={'lo' + lo} x1={x + (lo - lon0) * kk} y1={y0} x2={x + (lo - lon0) * kk} y2={y0 + H} stroke={SEP} strokeWidth={.6} strokeDasharray="6 5" opacity={.35} />)}
      {[-40, -20, 0, 20].map(la => <line key={'la' + la} x1={x0} y1={y - (la - lat0) * kk} x2={x0 + W} y2={y - (la - lat0) * kk} stroke={SEP} strokeWidth={la === 0 ? 1.2 : .6} strokeDasharray={la === 0 ? undefined : '6 5'} opacity={.35} />)}
      {/* the cartouche, the compass rose, a sailing ship */}
      <g transform={`translate(${x - 470 * s} ${y0 + 150 * s})`}><SR d={rr(-150 * s, -50 * s, 300 * s, 100 * s, 30 * s)} mat="paper" t={.15} draw={draw} sw={1.6} hatch={0} />
        <path d={`M${-170 * s} 0 q${-30 * s} ${-40 * s} 0 ${-56 * s} M${170 * s} 0 q${30 * s} ${-40 * s} 0 ${-56 * s} M${-170 * s} 0 q${-30 * s} ${40 * s} 0 ${56 * s} M${170 * s} 0 q${30 * s} ${40 * s} 0 ${56 * s}`} stroke={SEP} strokeWidth={1.4} fill="none" />
        <Fell x={0} y={-6 * s} s={30 * s} t="MARE ATLANTICVM" sc /><Fell x={0} y={26 * s} s={18 * s} t="Oceanus Occidentalis" italic /></g>
      <g transform={`translate(${x + 190 * s} ${y + 290 * s})`}>
        <circle r={64 * s} fill="none" stroke={SEP} strokeWidth={1.2} /><circle r={52 * s} fill="none" stroke={SEP} strokeWidth={.6} />
        {Array.from({ length: 16 }, (_, i) => { const L = i % 4 === 0 ? 80 : i % 2 ? 36 : 56, a = i * 22.5 * D2R, w = i % 4 === 0 ? 10 : 6;
          return <path key={i} d={`M0 0 L${f1(Math.cos(a - .2) * w * s)} ${f1(Math.sin(a - .2) * w * s)} L${f1(Math.cos(a) * L * s)} ${f1(Math.sin(a) * L * s)} L${f1(Math.cos(a + .2) * w * s)} ${f1(Math.sin(a + .2) * w * s)}Z`} fill={i % 2 ? '#EFE0C2' : (i % 4 === 0 ? VERM : SEP)} stroke={SEP} strokeWidth={.8} />; })}
        <Fell x={0} y={-90 * s} s={22 * s} t="N" sc /></g>
      <g transform={`translate(${x - 100 * s} ${y + 210 * s}) scale(${s})`}><path d="M-34 10 Q0 24 34 10 L28 20 Q0 30 -28 20Z" fill="#8C5A36" stroke={SEP} strokeWidth={1} /><path d="M0 10 V-40 M-14 8 V-26" stroke={SEP} strokeWidth={1.4} />
        <path d="M2 -38 Q22 -22 2 -4Z M-12 -24 Q2 -12 -12 4Z" fill="#FBF4E2" stroke={SEP} strokeWidth={1} /></g>
    </g>
    {/* the gutter */}
    <defs><linearGradient id={id + 'gt'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={SEP} stopOpacity={0} /><stop offset=".5" stopColor={SEP} stopOpacity={.32} /><stop offset="1" stopColor={SEP} stopOpacity={0} /></linearGradient></defs>
    <rect x={x - 60 * s} y={y0 + 6 * s} width={120 * s} height={H - 10 * s} fill={`url(#${id}gt)`} />
    <path d={`M${x} ${y0 + 6 * s} V${y0 + H - 4 * s}`} stroke={SEP} strokeWidth={1.4} opacity={.6} />
    {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={x0 + rnd(i * 2.3) * W} cy={y0 + rnd(i * 4.1) * H} r={(3 + rnd(i * 6.7) * 16) * s} fill="#B98A50" opacity={.12} filter="url(#b2s)" />)}
    <Stipple x={x0} y={y0} w={W} h={H} n={900} seed="atlfox" col="#8C5A36" a={.25} />
    {/* the traced coasts */}
    {trace > 0 && <g><path d={seg('SAM', COAST_BR, sa[0], sa[1], kk, 0, 0)} stroke={VERM} strokeWidth={4.5 * s} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${cl(trace * 2)} 1`} />
      {trace > .5 && <path d={seg('AFR', COAST_WA, af[0], af[1], kk, 0, 0)} stroke={VERM} strokeWidth={4.5 * s} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${cl(trace * 2 - 1)} 1`} />}
      {trace > .45 && trace < .6 && (() => { const a = xf(shape('SAM', 0), sa[0], sa[1], kk)[COAST_BR[Math.floor(COAST_BR.length * .25)]], b = xf(shape('AFR', 0), af[0], af[1], kk)[COAST_WA[Math.floor(COAST_WA.length * .3)]], u = cl((trace - .45) / .15);
        return <path d={`M${f1(a[0])} ${f1(a[1])} Q${f1((a[0] + b[0]) / 2)} ${f1(Math.min(a[1], b[1]) - 120 * s)} ${f1(b[0])} ${f1(b[1])}`} stroke={VERM} strokeWidth={2.5 * s} strokeDasharray="10 8" fill="none" opacity={Math.sin(u * Math.PI)} />; })()}</g>}
  </g>;
  return <g opacity={draw}>
    {/* the desk under the atlas, and the atlas's leather boards */}
    <rect x={-200} y={-200} width={2320} height={1480} fill="#5A3A24" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M-200 ${-180 + i * 48} C400 ${-190 + i * 48} 1200 ${-170 + i * 48} 2120 ${-184 + i * 48}`} stroke="#2B1D12" strokeWidth={1} fill="none" opacity={.35} />)}
    <rect x={x0 - 30 * s} y={y0 - 24 * s} width={W + 60 * s} height={H + 48 * s} rx={10 * s} fill="#6A2E1E" stroke={SEP} strokeWidth={1.6} />
    <Floor x={x} y={y0 + H + 30 * s} rx={W * .55} ry={30 * s} a={.45} />
    {/* the dark under the tear */}
    {gap > 0 && <rect x={tx - g - 30 * s} y={y0 - 24 * s} width={2 * g + 60 * s} height={H + 48 * s} fill="#1A120B" opacity={cl(gap * 3)} />}
    <g transform={`translate(${-g} 0) rotate(${-gap * 1.2} ${x0} ${y})`}><defs><clipPath id={id + 'L'}><path d={leftClip} /></clipPath></defs><g clipPath={gap > 0 ? `url(#${id}L)` : undefined}>{page}</g>
      {gap > 0 && <path d={sm(tearPts, false)} stroke="#FBF4E2" strokeWidth={5 * s} fill="none" />}</g>
    {gap > 0 && <g transform={`translate(${g} 0) rotate(${gap * 1.2} ${x0 + W} ${y})`}><defs><clipPath id={id + 'R'}><path d={rightClip} /></clipPath></defs><g clipPath={`url(#${id}R)`}>{page}</g>
      <path d={sm(tearPts, false)} stroke="#FBF4E2" strokeWidth={5 * s} fill="none" /></g>}
    {/* the tear running down (before the halves part) */}
    {tp > 0 && gap <= 0 && tearUpTo.length > 1 && <g><path d={sm(tearUpTo, false)} stroke="#1A120B" strokeWidth={4 * s} fill="none" />
      <path d={sm(tearUpTo.map(p => [p[0] + 3 * s, p[1]] as Pt), false)} stroke="#FBF4E2" strokeWidth={2.4 * s} fill="none" /></g>}
    {/* paper fibres on the torn edges */}
    {tp > 0 && tearPts.filter((_, i) => i % 1 === 0).map((p, i) => p[1] > y0 + tp * H ? null : <g key={'fb' + i} opacity={.8}>
      <path d={`M${p[0] - g} ${p[1]} l${(4 + rnd(i) * 6) * s} ${(rnd(i + 1) - .5) * 10 * s}`} stroke="#FBF4E2" strokeWidth={1.2} />
      <path d={`M${p[0] + g} ${p[1] + 8 * s} l${-(4 + rnd(i + 3) * 6) * s} ${(rnd(i + 4) - .5) * 10 * s}`} stroke="#FBF4E2" strokeWidth={1.2} /></g>)}
    {/* the ghost of Africa */}
    {ghost > 0 && <g opacity={cl(ghost * 5) * .85}>
      <path d={cpath('AFR', gx + 10 * s, gy + 18 * s, kk, gr, 0)} fill={SEP} opacity={.18 * Math.sin(gw * Math.PI) + .05} filter="url(#b8)" />
      <path d={cpath('AFR', gx, gy, kk, gr, 0)} fill="#E0B878" fillOpacity={.45} stroke={VERM} strokeWidth={2.4 * s} strokeDasharray={`${10 * s} ${6 * s}`} /></g>}
    {q > 0 && <g transform={`translate(${tx} ${y - 40 * s}) scale(${s * (0.8 + .2 * outBack(q))})`}>
      <Line d="M-46 -70 C-50 -130 52 -138 52 -72 C52 -26 2 -22 0 30 L0 44" w={14} col={VERM} a={1} draw={cl(q * 1.3)} />
      <circle cx={0} cy={96} r={11} fill={VERM} opacity={cl(q * 4 - 3)} /></g>}
  </g>;
};

// ================================================================ 3. THE MEADOW ROCK — a green meadow under a pale sky, one big grey boulder in the middle (x, y = the
// boulder's foot). boots: two leather walking boots (legs to the knee and up out of frame) stand on top · stamp: the boots stamp (bounce) —
// nothing moves · snail: a snail crawls across the foreground (progress) · grow: the grass grows tall and trees rise · town: houses, roads and
// a church tower build up round the rock · night: night falls, windows lit · shift: the rock shifts 8 px right, a vermilion tick marks the old
// place · hour: an hourglass stands beside the rock; sand 0..1 runs it.
const MeadowRock: React.FC<any> = ({ x = 960, y = 800, s = 1, draw = 1, boots = 0, stamp = 0, snail = 0, grow = 0, town = 0, night = 0, shift = 0, hour = 0, sand = 0, tm = 0 }) => {
  const stars = useMemo(() => starField(41, 90, -200, -200, 2320, 560, 2), []);
  const id = 'mr' + Math.round(x), hz = y - 230 * s, X = (d: N) => x + d * s, Y = (d: N) => y + d * s, sx = shift * 8 * s;
  const bounce = stamp > 0 && stamp < 1 ? -Math.abs(Math.sin(stamp * Math.PI * 3)) * 34 * s : 0;
  const rockD = sm(([[-262, 10], [-292, -50], [-268, -130], [-214, -196], [-120, -246], [-20, -266], [80, -262], [168, -226], [236, -160], [282, -80], [290, 0], [180, 18], [0, 22], [-140, 18]] as Pt[]).map(([a, b]) => [X(a), Y(b)] as Pt));
  const trees = [[-760, -10, 1.1], [-560, 10, .8], [-420, -20, 1.2], [500, -16, 1], [700, 4, 1.3], [880, -14, .9], [-900, 0, .9], [360, -30, .7]];
  const houses = [[-520, 40, 90, 70, 0], [-380, 70, 110, 80, 1], [-660, 90, 100, 76, 2], [400, 50, 100, 72, 3], [560, 80, 120, 86, 4], [-820, 60, 90, 70, 5], [760, 50, 96, 70, 6], [-250, -40, 70, 54, 7], [290, -50, 76, 56, 8], [900, 100, 110, 80, 9], [-960, 120, 110, 80, 10]];
  return <g opacity={draw}>
    {/* sky and far hills */}
    <defs><linearGradient id={id + 'sk'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B9D3DF" /><stop offset="1" stopColor="#F3EBD6" /></linearGradient></defs>
    <rect x={-200} y={-200} width={2320} height={hz + 260} fill={`url(#${id}sk)`} />
    {[[300, 160, 1], [1300, 120, .8], [1700, 230, .6]].map(([cx, cy, k], i) => <g key={i} opacity={.85}><path d={`M${cx - 120 * k} ${cy} q${30 * k} ${-50 * k} ${80 * k} ${-30 * k} q${40 * k} ${-50 * k} ${100 * k} ${-10 * k} q${60 * k} ${-10 * k} ${70 * k} ${40 * k}Z`} fill="#FBF8EE" stroke={SEP} strokeWidth={1} opacity={.9} /></g>)}
    <SR d={`M-200 ${hz + 20} C200 ${hz - 60} 600 ${hz - 20} 900 ${hz - 50} C1300 ${hz - 90} 1700 ${hz - 20} 2120 ${hz - 40} V${hz + 60} H-200Z`} mat="forest" t={.2} draw={draw} sw={1} hatch={0} />
    <SR d={`M-200 ${hz + 20} C400 ${hz - 10} 1200 ${hz + 10} 2120 ${hz - 4} V1300 H-200Z`} mat="leaf" t={.28} draw={draw} sw={1.2} hatch={0} />
    {/* roads (town) */}
    {town > 0 && <g>
      <path d={`M${X(-1100)} ${Y(150)} C${X(-600)} ${Y(110)} ${X(-300)} ${Y(30)} ${X(-60)} ${Y(14)} M${X(60)} ${Y(14)} C${X(300)} ${Y(30)} ${X(700)} ${Y(120)} ${X(1100)} ${Y(140)}`} stroke="#D9C49A" strokeWidth={26 * s} fill="none" pathLength={1} strokeDasharray={`${ease(town * 1.5)} 1`} strokeLinecap="round" />
      <path d={`M${X(-140)} ${Y(-30)} C${X(-300)} ${Y(-80)} ${X(-500)} ${Y(-170)} ${X(-560)} ${hz + 10}`} stroke="#D9C49A" strokeWidth={12 * s} fill="none" pathLength={1} strokeDasharray={`${ease(town * 1.5 - .2)} 1`} /></g>}
    {/* trees rising */}
    {trees.map(([tx, ty, k], i) => { const g = ease(stag(grow, i, trees.length, .6)); if (g <= 0) return null; const bx = X(tx), by = hz + ty * s + 30 * s, h = 190 * k * s * g;
      return <g key={'t' + i}><SR d={rect(bx - 7 * k * s, by - h * .5, 14 * k * s, h * .5)} mat="wood" t={.7} draw={draw} sw={1} hatch={0} />
        {[[0, -.72, .34], [-.22, -.56, .26], [.24, -.58, .27]].map(([dx, dy, r], j) => <SR key={j} d={ell(bx + dx * 190 * k * s * g, by + dy * h, r * 190 * k * s * g, r * 170 * k * s * g)} mat="forest" t={.45 + j * .08} ang={30} draw={draw} sw={1.1} />)}</g>; })}
    {/* houses rising from the ground, the church */}
    {houses.map(([hx, hy, w, h, k], i) => { const g = ease(stag(town, i, houses.length + 1, .4)); if (g <= 0) return null; const bx = X(hx), by = hz + 60 * s + hy * s, H = h * s * g, Wd = w * s;
      const lit = night * g;
      return <g key={'h' + i}><SR d={rect(bx - Wd / 2, by - H, Wd, H)} mat={k % 3 === 0 ? 'stone' : k % 3 === 1 ? 'sand' : 'paper'} t={.3} draw={draw} sw={1.2} ang={0} />
        <SR d={`M${bx - Wd / 2 - 8 * s} ${by - H} L${bx} ${by - H - 44 * s * g} L${bx + Wd / 2 + 8 * s} ${by - H}Z`} mat="red" t={.55 + (k % 2) * .1} draw={draw} sw={1.2} />
        {[-.25, .25].map(u => <g key={u}><rect x={bx + u * Wd - 8 * s} y={by - H * .7} width={16 * s} height={18 * s * g} fill={lit > 0 ? mix('#4A3A30', '#FFD98A', lit) : '#4A3A30'} stroke={SEP} strokeWidth={.8} />
          {lit > 0 && <circle cx={bx + u * Wd} cy={by - H * .6} r={22 * s} fill="url(#glowG)" opacity={lit * .8} />}</g>)}</g>; })}
    {town > 0 && (() => { const g = ease(stag(town, 11, 12, .4)), bx = X(-170), by = hz + 20 * s; if (g <= 0) return null; return <g>
      <SR d={rect(bx - 120 * s, by - 90 * s * g, 160 * s, 90 * s * g)} mat="stone" t={.35} draw={draw} sw={1.2} ang={0} />
      <SR d={rect(bx + 10 * s, by - 220 * s * g, 50 * s, 220 * s * g)} mat="stone" t={.3} draw={draw} sw={1.4} ang={0} />
      <SR d={`M${bx + 4 * s} ${by - 220 * s * g} L${bx + 35 * s} ${by - 320 * s * g} L${bx + 66 * s} ${by - 220 * s * g}Z`} mat="night" t={.4} draw={draw} sw={1.2} hatch={0} />
      <Line d={`M${bx + 35 * s} ${by - 320 * s * g} v${-30 * s * g} M${bx + 25 * s} ${by - 336 * s * g} h${20 * s}`} w={2} />
      <circle cx={bx + 35 * s} cy={by - 170 * s * g} r={11 * s} fill={night > 0 ? mix('#EFE0C2', '#FFD98A', night) : '#EFE0C2'} stroke={SEP} strokeWidth={1} /></g>; })()}
    {/* grass tufts */}
    {Array.from({ length: 70 }, (_, i) => { const gx = -150 + rnd(i * 1.3) * 2200, gy = hz + 40 + rnd(i * 2.9) * (1150 - hz), hh = (10 + rnd(i) * 10 + grow * 34) * (.5 + (gy - hz) / 900);
      return <path key={'g' + i} d={`M${gx - 6} ${gy} q2 ${-hh * .6} -4 ${-hh} M${gx} ${gy} q1 ${-hh * .7} 3 ${-hh * 1.2} M${gx + 6} ${gy} q0 ${-hh * .5} 6 ${-hh * .9}`} stroke="#2F5440" strokeWidth={1.4} fill="none" opacity={.7} />; })}
    {/* the rock, the boots, the old-place tick */}
    {shift > 0 && <g opacity={cl(shift * 4)}><Line d={`M${X(262)} ${Y(-40)} V${Y(30)}`} w={5} col={VERM} a={1} /><Line d={`M${X(-250)} ${Y(-40)} V${Y(30)}`} w={5} col={VERM} a={1} /></g>}
    <g transform={`translate(${sx} 0)`}>
      <Floor x={x} y={Y(6)} rx={290 * s} ry={22 * s} a={.4} />
      <SR d={rockD} mat="regolith" t={.48} ang={30} draw={draw} sw={2} />
      <path d={`M${X(-120)} ${Y(-200)} q${40 * s} ${50 * s} ${20 * s} ${110 * s} M${X(80)} ${Y(-230)} q${-10 * s} ${60 * s} ${30 * s} ${100 * s} M${X(160)} ${Y(-60)} l${40 * s} ${30 * s}`} stroke={SEP} strokeWidth={1.4} fill="none" opacity={.6} />
      {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={X(-180 + rnd(i * 3) * 360)} cy={Y(-200 + rnd(i * 5) * 180)} rx={(6 + rnd(i) * 10) * s} ry={(4 + rnd(i + 1) * 6) * s} fill="#C9C26A" opacity={.55} />)}
      <path d={`M${X(-110)} ${Y(-246)} C${X(-40)} ${Y(-268)} ${X(60)} ${Y(-266)} ${X(130)} ${Y(-236)}`} stroke="#FFF8E6" strokeWidth={4 * s} fill="none" opacity={.55} />
      {boots > 0 && <g opacity={cl(boots * 3)} transform={`translate(0 ${bounce + (1 - ease(boots)) * -80 * s})`}>
        {[-1, 1].map(side => { const bx = X(side * 62 - 10), by = Y(-258 + side * 6);
          return <g key={side}>
            {/* trouser leg rising out of frame, cuffed at the boot top */}
            <SR d={`M${bx - 34 * s} ${by - 120 * s} L${bx - 44 * s} ${by - 1100 * s} L${bx + 40 * s} ${by - 1100 * s} L${bx + 32 * s} ${by - 120 * s}Z`} mat="cloth" t={side < 0 ? .72 : .62} ang={90} draw={draw} sw={1.4} />
            <path d={`M${bx - 36 * s} ${by - 420 * s} q${36 * s} ${16 * s} ${72 * s} 0`} stroke={SEP} strokeWidth={1.2} fill="none" opacity={.6} />
            {/* the leather walking boot, side view, toe to the right */}
            <SR d={`M${bx - 36 * s} ${by - 150 * s} L${bx - 38 * s} ${by - 20 * s} Q${bx - 40 * s} ${by} ${bx - 20 * s} ${by} L${bx + 82 * s} ${by} Q${bx + 104 * s} ${by - 4 * s} ${bx + 96 * s} ${by - 26 * s} Q${bx + 84 * s} ${by - 50 * s} ${bx + 34 * s} ${by - 62 * s} L${bx + 32 * s} ${by - 150 * s}Z`} mat="wood" t={.62} ang={60} draw={draw} sw={1.8} />
            <path d={`M${bx - 42 * s} ${by + 2 * s} H${bx + 98 * s} V${by + 14 * s} H${bx - 40 * s}Z`} fill="#2B1D12" />
            {[0, 1, 2, 3, 4].map(j => <path key={j} d={`M${bx + 22 * s - j * 2 * s} ${by - 64 * s - j * 18 * s} l${16 * s} ${-6 * s}`} stroke="#F3E7CC" strokeWidth={2 * s} />)}
            <path d={`M${bx - 30 * s} ${by - 40 * s} Q${bx + 30 * s} ${by - 30 * s} ${bx + 90 * s} ${by - 20 * s}`} stroke={SEP} strokeWidth={1} fill="none" opacity={.6} /></g>; })}</g>}
      {stamp > 0 && stamp < 1 && bounce > -6 * s && <g opacity={.7}>{[-1, 1].map(k => <path key={k} d={`M${X(k * 150)} ${Y(-262)} l${k * 30 * s} ${-10 * s} M${X(k * 150)} ${Y(-250)} l${k * 34 * s} ${4 * s}`} stroke={SEP} strokeWidth={2} />)}</g>}
    </g>
    {/* the snail */}
    {snail > 0 && snail < 1.01 && (() => { const sx2 = X(-700 + snail * 1400), sy = Y(190), k = 1.1 * s, wob = Math.sin(snail * 60) * 2;
      return <g><ellipse cx={sx2 + 6 * k} cy={sy + 4 * k} rx={46 * k} ry={6 * k} fill={SEP} opacity={.25} filter="url(#b2s)" />
        <path d={`M${sx2 - 40 * k} ${sy} Q${sx2} ${sy - 10 * k} ${sx2 + 34 * k + wob} ${sy - 8 * k} Q${sx2 + 50 * k} ${sy - 12 * k} ${sx2 + 52 * k} ${sy - 22 * k} Q${sx2 + 44 * k} ${sy - 28 * k} ${sx2 + 34 * k} ${sy - 20 * k} L${sx2 - 40 * k} ${sy}Z`} fill="#C9AE84" stroke={SEP} strokeWidth={1.2} />
        <path d={`M${sx2 + 44 * k} ${sy - 24 * k} l${6 * k} ${-22 * k} M${sx2 + 50 * k} ${sy - 22 * k} l${14 * k} ${-16 * k}`} stroke={SEP} strokeWidth={1.6} /><circle cx={sx2 + 50 * k} cy={sy - 46 * k} r={2.5 * k} fill={SEP} /><circle cx={sx2 + 64 * k} cy={sy - 38 * k} r={2.5 * k} fill={SEP} />
        <circle cx={sx2 - 4 * k} cy={sy - 30 * k} r={28 * k} fill="#B07A44" stroke={SEP} strokeWidth={1.6} />
        <path d={`M${sx2 - 4 * k} ${sy - 30 * k} m${4 * k} 0 a${4 * k} ${4 * k} 0 1 0 ${-8 * k} 0 a${10 * k} ${10 * k} 0 1 0 ${20 * k} 0 a${16 * k} ${16 * k} 0 1 0 ${-32 * k} 0 a${22 * k} ${22 * k} 0 1 0 ${44 * k} 0`} stroke={SEP} strokeWidth={1.2} fill="none" />
        <path d={`M${sx2 - 22 * k} ${sy - 46 * k} q${10 * k} ${-10 * k} ${24 * k} ${-6 * k}`} stroke="#FFF8E6" strokeWidth={3} fill="none" opacity={.6} />
        <path d={`M${X(-700)} ${sy + 2 * s} H${sx2 - 40 * k}`} stroke="#FFFDF4" strokeWidth={2} opacity={.4} /></g>; })()}
    {/* the hourglass */}
    {hour > 0 && <g opacity={cl(hour * 3)} transform={`translate(0 ${(1 - outBack(hour)) * -60 * s})`}><Hourglass x={X(450)} y={Y(-170)} s={1.05 * s} sand={sand} draw={draw} id={id + 'hg'} /></g>}
    {/* night */}
    {night > 0 && <g><rect x={-200} y={-200} width={2320} height={1480} fill="#141C38" opacity={night * .62} style={{ mixBlendMode: 'multiply' }} />
      {stars.map(([a, b, r], i) => <Star key={i} x={a} y={b} r={r} a={night * .8} />)}
      <circle cx={1600} cy={180} r={44} fill="#FFF4D2" opacity={night} /><circle cx={1600} cy={180} r={160} fill="url(#glowW)" opacity={night * .5} />
      {houses.map(([hx, hy, w, h], i) => { const g = ease(stag(town, i, houses.length + 1, .4)); return g > 0 ? <circle key={i} cx={X(hx)} cy={hz + 60 * s + hy * s - h * s * g * .6} r={40 * s} fill="url(#glowG)" opacity={night * g * .9} /> : null; })}</g>}
  </g>;
};

// ================================================================ 4. FOUR CLUES — four paper luggage tags pinned on a cork board, each with a small drawing: a torn map
// (Brazil | Africa), a slim little reptile, a tent in the snow, a card of black-and-white stripes. n 0..4 reveals them one by one (each drops in).
const FourClues: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, n = 4 }) => {
  const id = 'fc' + Math.round(x), TW = 330 * s, TH = 380 * s;
  const tags: [N, N, N][] = [[-640, -60, -4], [-215, 40, 3], [215, -50, -2], [640, 30, 4]];
  const art = (i: N, cx: N, cy: N) => {
    if (i === 0) { const kk = 3.4 * s, sa: Pt = [cx - 70 * s, cy + 10 * s], af: Pt = [cx + 70 * s, cy - 8 * s];
      return <g><rect x={cx - 130 * s} y={cy - 110 * s} width={120 * s} height={220 * s} fill="#9CCAD6" stroke={SEP} strokeWidth={1} transform={`rotate(-3 ${cx} ${cy})`} />
        <rect x={cx + 10 * s} y={cy - 110 * s} width={120 * s} height={220 * s} fill="#9CCAD6" stroke={SEP} strokeWidth={1} transform={`rotate(3 ${cx} ${cy})`} />
        <path d={cpath('SAM', sa[0] - 20 * s, sa[1], kk, 0, 0)} fill="#A9B97A" stroke={SEP} strokeWidth={1.2} transform={`rotate(-3 ${cx} ${cy})`} />
        <path d={cpath('AFR', af[0] + 20 * s, af[1], kk, 0, 0)} fill="#E0B878" stroke={SEP} strokeWidth={1.2} transform={`rotate(3 ${cx} ${cy})`} />
        <path d={sm(jag(cx - 8 * s, cy - 112 * s, cx - 8 * s, cy + 112 * s, 12, 6 * s, 3), false)} stroke="#FBF4E2" strokeWidth={4} fill="none" />
        <path d={sm(jag(cx + 8 * s, cy - 112 * s, cx + 8 * s, cy + 112 * s, 12, 6 * s, 3), false)} stroke="#FBF4E2" strokeWidth={4} fill="none" /></g>; }
    if (i === 1) return <g><path d={`M${cx - 140 * s} ${cy + 70 * s} H${cx + 140 * s}`} stroke={SEP} strokeWidth={1} opacity={.4} /><Mesosaurus x={cx + 6 * s} y={cy + 60 * s} s={.26 * s} draw={1} id={id + 'ms'} walk={.2} /></g>;
    if (i === 2) return <g>
      <rect x={cx - 140 * s} y={cy - 110 * s} width={280 * s} height={220 * s} fill="#DDE6EA" />
      <path d={`M${cx - 140 * s} ${cy + 30 * s} Q${cx} ${cy + 10 * s} ${cx + 140 * s} ${cy + 36 * s} V${cy + 110 * s} H${cx - 140 * s}Z`} fill="#FFFFFF" stroke={SEP} strokeWidth={1} />
      <path d={`M${cx - 70 * s} ${cy + 40 * s} L${cx - 10 * s} ${cy - 60 * s} L${cx + 50 * s} ${cy + 40 * s}Z`} fill="#D2643E" stroke={SEP} strokeWidth={1.4} />
      <path d={`M${cx - 10 * s} ${cy - 60 * s} L${cx + 50 * s} ${cy + 40 * s} L${cx + 90 * s} ${cy + 30 * s} L${cx + 34 * s} ${cy - 66 * s}Z`} fill="#8C3424" stroke={SEP} strokeWidth={1.4} />
      <path d={`M${cx - 10 * s} ${cy - 60 * s} L${cx - 10 * s} ${cy + 40 * s}`} stroke={SEP} strokeWidth={1.4} /><path d={`M${cx - 26 * s} ${cy + 40 * s} L${cx - 10 * s} ${cy + 2 * s} L${cx + 6 * s} ${cy + 40 * s}Z`} fill="#3A2418" />
      <path d={`M${cx - 10 * s} ${cy - 60 * s} V${cy - 90 * s} M${cx - 70 * s} ${cy + 40 * s} L${cx - 100 * s} ${cy + 50 * s} M${cx + 90 * s} ${cy + 30 * s} L${cx + 120 * s} ${cy + 44 * s}`} stroke={SEP} strokeWidth={1.2} />
      <path d={`M${cx - 10 * s} ${cy - 90 * s} l${24 * s} ${6 * s} l${-24 * s} ${6 * s}`} fill={VERM} />
      {Array.from({ length: 30 }, (_, j) => <circle key={j} cx={cx - 135 * s + rnd(j * 2.2) * 270 * s} cy={cy - 105 * s + rnd(j * 3.3) * 200 * s} r={(1 + rnd(j) * 2) * s} fill="#FFFFFF" stroke={SEP} strokeWidth={.3} />)}</g>;
    const W = [14, 8, 22, 6, 12, 30, 12, 6, 22, 8, 14], tot = W.reduce((a, b) => a + b, 0); let acc = 0;
    return <g><rect x={cx - 130 * s} y={cy - 90 * s} width={260 * s} height={180 * s} fill="#FBF4E2" stroke={SEP} strokeWidth={1.2} />
      {W.map((w, j) => { const x1 = cx - 120 * s + acc / tot * 240 * s; acc += w; return <rect key={j} x={x1} y={cy - 80 * s} width={w / tot * 240 * s} height={160 * s} fill={j % 2 ? '#FBF4E2' : '#1A120B'} />; })}
      <Line d={`M${cx} ${cy - 96 * s} V${cy + 96 * s}`} w={2} col={VERM} a={.9} /></g>;
  };
  return <g opacity={draw}>
    <rect x={-200} y={-200} width={2320} height={1480} fill="#B98A50" />
    <SR d={rect(-200, -200, 2320, 1480)} mat="sand" t={.6} draw={draw} sw={0} hatch={0} rim={false} />
    <Stipple x={-200} y={-200} w={2320} h={1480} n={5200} seed="cork" col="#6A4430" a={.45} r0={.8} />
    <Stipple x={-200} y={-200} w={2320} h={1480} n={2400} seed="cork2" col="#F3E7CC" a={.35} r0={.6} />
    {[[-200, -200, 2320, 60], [-200, 1020, 2320, 260], [-200, -200, 230, 1480], [1890, -200, 230, 1480]].map(([a, b, w, h], i) => <SR key={i} d={rect(a, b, w, h)} mat="wood" t={.62} draw={draw} sw={1.6} ang={i < 2 ? 0 : 90} />)}
    {tags.map(([tx, ty, r], i) => { const k = cl(n - i), dr = (1 - outBack(k)) * -70 * s; if (k <= 0) return null; const cx = x + tx * s, cy = y + ty * s;
      const tag = `M${cx - TW / 2} ${cy - TH / 2 + 40 * s} L${cx - TW / 2 + 40 * s} ${cy - TH / 2} H${cx + TW / 2 - 40 * s} L${cx + TW / 2} ${cy - TH / 2 + 40 * s} V${cy + TH / 2} H${cx - TW / 2}Z`;
      return <g key={i} opacity={cl(k * 3)} transform={`translate(0 ${dr}) rotate(${r + (1 - k) * 8} ${cx} ${cy - TH / 2})`}>
        <path d={tag} transform={`translate(${10 * s} ${14 * s})`} fill={SEP} opacity={.35} filter="url(#b8)" />
        <SR d={tag} mat="paper" t={.12} draw={draw} sw={1.6} hatch={0} />
        <path d={`M${cx - 120 * s} ${cy - 46 * s + 4 * s} H${cx + 120 * s}`} stroke={SEP} strokeWidth={.5} opacity={0} />
        <g transform={`translate(0 ${30 * s})`}>{art(i, cx, cy)}</g>
        <circle cx={cx} cy={cy - TH / 2 + 34 * s} r={14 * s} fill="#E0B878" stroke={SEP} strokeWidth={1} /><circle cx={cx} cy={cy - TH / 2 + 34 * s} r={6 * s} fill="#6A4430" />
        <Fell x={cx} y={cy + TH / 2 - 18 * s} s={22 * s} t={['I', 'II', 'III', 'IV'][i]} sc />
        <Pin x={cx} y={cy - TH / 2 + 34 * s} s={1.4 * s} col={i % 2 ? '#D4A846' : VERM} /></g>; })}
  </g>;
};

// ================================================================ 5. MAPS LIKE LEAVES — a dozen old map sheets (each with the two Atlantic coasts) flutter up into a
// moonlit sky like autumn leaves. k: flight progress (they rise and tumble) · stamp: a red rubber stamp "COINCIDENCE" lands on the big sheet
// · catch: a hand reaches in at upper right and snatches the last sheet.
const MapSheet: React.FC<{ w: N; h: N; seed: N }> = ({ w, h, seed }) => {
  const kk = w / 70, cid = 'msc' + seed;
  return <g><defs><clipPath id={cid}><rect x={-w / 2} y={-h / 2} width={w} height={h} /></clipPath></defs>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#EFE0C2" stroke={SEP} strokeWidth={1.2} />
    <g clipPath={`url(#${cid})`}><rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#C9DDE6" opacity={.6} />
      <path d={cpath('SAM', -w * .3, h * .1, kk, 0, 0)} fill="#C9C29A" stroke={SEP} strokeWidth={.9} /><path d={cpath('AFR', w * .32, -h * .12, kk, 0, 0)} fill="#E2CF94" stroke={SEP} strokeWidth={.9} />
      {[-.3, 0, .3].map(v => <line key={v} x1={-w / 2} y1={v * h} x2={w / 2} y2={v * h} stroke={SEP} strokeWidth={.5} strokeDasharray="3 3" opacity={.5} />)}</g>
    <rect x={-w / 2 + 4} y={-h / 2 + 4} width={w - 8} height={h - 8} fill="none" stroke={SEP} strokeWidth={.6} opacity={.6} /></g>;
};
const MapLeaves: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, k = .5, stamp = 0, catch: ca = 0, tm = 0 }) => {
  const sheets = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ x0: 120 + rnd(i * 2.7) * 1680, d: rnd(i * 4.9) * .35, sp: .7 + rnd(i * 1.9) * .6, ph: rnd(i * 8.1) * 6, w: 120 + rnd(i * 3.3) * 90 })), []);
  const st = useMemo(() => starField(77, 140, -200, -200, 2320, 1100, 2.2), []);
  const hero = 5, last = 11, handX = 2150 - ease(ca) * 420, handY = 230;
  return <g opacity={draw}>
    <NightWash x={-200} y={-200} w={2320} h={1480} seed="mlv" top="#141C38" bot="#3A4A7A" />
    {st.map(([a, b, r], i) => <Star key={i} x={a} y={b} r={r * .8} a={.75} />)}
    <circle cx={x - 560 * s} cy={y - 300 * s} r={200 * s} fill="url(#glowW)" opacity={.55} />
    <circle cx={x - 560 * s} cy={y - 300 * s} r={70 * s} fill="#F6EED2" stroke={SEP} strokeWidth={1} />
    {[[-20, -12, 14], [16, 10, 10], [-4, 24, 8]].map(([a, b, r], i) => <circle key={i} cx={x - 560 * s + a * s} cy={y - 300 * s + b * s} r={r * s} fill="#D9D0B4" opacity={.6} />)}
    <path d={`M-200 1000 C300 940 700 980 1100 950 C1500 920 1800 960 2120 940 V1300 H-200Z`} fill="#141C38" />
    {sheets.map((p, i) => { let u = cl((k - p.d) / (1 - p.d)); const big = i === hero;
      let px = p.x0 + Math.sin(u * 7 * p.sp + p.ph) * 90 + u * 160 * (rnd(i) - .3), py = 1100 - u * (1250 + rnd(i) * 300) + Math.sin(u * 11 + p.ph) * 20, r = Math.sin(u * 9 * p.sp + p.ph) * 50 + u * 200 * (rnd(i + 2) - .5), fl = Math.cos(u * 12 * p.sp + p.ph);
      if (big) { px = x + 60 * s + Math.sin(tm * 1.2) * 20; py = lerp(1150, y + 40 * s, ease(cl(k * 1.6))); r = -8 + Math.sin(tm * 1.5) * 4; fl = 1; }
      if (i === last && ca > 0) { const g = ease(cl((ca - .45) / .4)); px = lerp(px, handX + 30, g); py = lerp(py, handY + 40, g); r = lerp(r, -20, g); fl = lerp(fl, 1, g); }
      const w = big ? 420 * s : p.w * s, h = w * .72;
      return <g key={i} transform={`translate(${f1(px)} ${f1(py)}) rotate(${f1(r)}) scale(${f1(.2 + .8 * Math.abs(fl))} 1)`}>
        <rect x={-w / 2 + 8} y={-h / 2 + 12} width={w} height={h} fill="#0B1030" opacity={.4} filter="url(#b8)" />
        <MapSheet w={w} h={h} seed={i} />
        {fl < 0 && <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#D9C8A4" stroke={SEP} strokeWidth={1.2} />}
        <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#141C38" opacity={.18} />
        {big && stamp > 0 && <g opacity={cl(stamp * 3) * .9} transform={`rotate(-12) scale(${f1(lerp(1.7, 1, outBack(stamp)))})`}>
          <rect x={-180 * s} y={-46 * s} width={360 * s} height={92 * s} rx={8 * s} fill="none" stroke="#C0392B" strokeWidth={7 * s} />
          <rect x={-168 * s} y={-36 * s} width={336 * s} height={72 * s} rx={5 * s} fill="none" stroke="#C0392B" strokeWidth={2.5 * s} />
          <Fell x={0} y={16 * s} s={46 * s} t="COINCIDENCE" col="#C0392B" sc />
          {Array.from({ length: 30 }, (_, j) => <circle key={j} cx={(rnd(j * 3.1) - .5) * 340 * s} cy={(rnd(j * 5.7) - .5) * 80 * s} r={(1 + rnd(j) * 3) * s} fill="#EFE0C2" opacity={.7} />)}</g>}
      </g>; })}
    {ca > 0 && <HumanHand id={'mlh' + Math.round(x)} x={handX} y={handY} s={1.7 * s} ang={180} curl={HAND_LERP(ease(cl((ca - .4) / .4)))} sleeve="#3A2418" mirror draw={cl(ca * 4)} />}
  </g>;
};
const HAND_LERP = (g: N): [N, N, N, N, N] => [lerp(0, .6, g), lerp(0, .8, g), lerp(0, .85, g), lerp(0, .85, g), lerp(0, .85, g)];

// ================================================================ 6. THE GREENLAND ICE — the inland ice: a vast white sheet, a low pale sun, faint blue mountains on
// the horizon, wind-cut sastrugi ridges. snow: a blizzard streams across · sledge: a dog sledge (six Greenland huskies in pairs, Skin + FK legs,
// trotting) with two fur-clad men walking beside crosses left → right (progress) · flag: a small camp flag far ahead on the horizon.
// A Greenland husky, side view facing right, standing on (X, Y); ph = trot phase (diagonal pairs); about 120 px long at k = 1.
const Husky: React.FC<{ X: N; Y: N; k: N; ph: N; id: string; col?: string; dark?: N }> = ({ X, Y, k, ph, id, col = '#B4AFA2', dark = 0 }) => {
  const T = (p: Pt): Pt => [X + p[0] * k, Y + p[1] * k], c = mix(col, '#2B1D12', dark), bob = Math.abs(Math.sin(ph * Math.PI * 2)) * -2;
  const sp: Pt[] = [[-52, -60], [-40, -60], [-8, -61], [24, -62], [38, -64], [52, -78], [62, -88], [74, -90], [90, -84], [99, -82]].map(p => [p[0], p[1] + bob] as Pt);
  const th: [N, N][] = [[5, 5], [14, 13], [13, 11], [15, 20], [14, 17], [9, 10], [10, 10], [10, 9], [5, 5], [3, 3]];
  const J: Joint[] = sp.map((p, i) => ({ p: T(p), up: th[i][0] * k, dn: th[i][1] * k }));
  const leg = (hx: N, front: boolean, p: N) => { const s1 = Math.sin(p * Math.PI * 2), lift = Math.max(0, Math.cos(p * Math.PI * 2));
    const B: [N, N][] = front ? [[22, 12 - s1 * 22], [20, -12 - lift * 30], [12, -10 + lift * 30], [7, -60]] : [[24, -22 - s1 * 22], [22, 56 + lift * 20], [16, -44 - lift * 20], [7, -50]];
    const P = fk([hx, -54 + bob], 90, B); return P.map(T); };
  const legs = [[-38, false, ph], [34, true, ph + .5], [-30, false, ph + .5], [42, true, ph]] as [N, boolean, N][];
  const LJ = (P: Pt[], r0: N): Joint[] => P.map((p, i) => ({ p, up: (r0 - i * 1.6) * k, dn: (r0 - i * 1.6) * k }));
  const tail = sm([T([-50, -62 + bob]), T([-62, -80 + bob]), T([-56, -98 + bob]), T([-40, -96 + bob]), T([-36, -84 + bob])], false), hd = T([74, -90 + bob]);
  return <g>
    {legs.slice(2).map(([hx, fr, p], i) => <Skin key={'f' + i} id={id + 'lf' + i} J={LJ(leg(hx, fr, p), 6)} col={mix(c, '#2B1D12', .3)} hatch={.4} sw={1} per={5} rim={0} />)}
    <path d={tail} stroke={mix(c, '#2B1D12', .15)} strokeWidth={13 * k} fill="none" strokeLinecap="round" /><path d={tail} stroke={SEP} strokeWidth={1} fill="none" strokeDasharray="2 3" />
    {legs.slice(0, 2).map(([hx, fr, p], i) => <Skin key={'n' + i} id={id + 'ln' + i} J={LJ(leg(hx, fr, p), 6.5)} col={c} hatch={.3} sw={1.1} per={5} rim={.4} />)}
    <Skin id={id + 'b'} J={J} col={c} hatch={.5} sw={1.4} fur={.9 * k} per={6} />
    <path d={`M${T([60, -94 + bob]).join(' ')} L${T([62, -112 + bob]).join(' ')} L${T([70, -98 + bob]).join(' ')}Z`} fill={mix(c, '#2B1D12', .25)} stroke={SEP} strokeWidth={1} />
    <path d={`M${T([66, -95 + bob]).join(' ')} L${T([70, -111 + bob]).join(' ')} L${T([76, -96 + bob]).join(' ')}Z`} fill={c} stroke={SEP} strokeWidth={1} />
    <circle cx={hd[0] + 4 * k} cy={hd[1] - 2 * k} r={1.8 * k} fill="#1A120B" /><circle cx={T([99, -83 + bob])[0]} cy={T([99, -83 + bob])[1]} r={2.4 * k} fill="#1A120B" />
    <path d={`M${T([88, -78 + bob]).join(' ')} Q${T([80, -77 + bob]).join(' ')} ${T([72, -80 + bob]).join(' ')}`} stroke={SEP} strokeWidth={1} fill="none" />
    <path d={`M${T([30, -80 + bob]).join(' ')} L${T([36, -42 + bob]).join(' ')} M${T([18, -78 + bob]).join(' ')} L${T([52, -70 + bob]).join(' ')}`} stroke={VERM} strokeWidth={2.4 * k} />
  </g>;
};
// a man in furs and anorak walking right (≈ 200 px tall at k = 1); ph = stride phase
const Walker: React.FC<{ X: N; Y: N; k: N; ph: N; id: string; col?: string; arm?: N }> = ({ X, Y, k, ph, id, col = '#6A4430', arm = 0 }) => {
  const T = (p: Pt): Pt => [X + p[0] * k, Y + p[1] * k], s1 = Math.sin(ph * Math.PI * 2), bob = Math.abs(s1) * 3;
  const leg = (p: N) => { const a = Math.sin(p * Math.PI * 2), kn = Math.max(0, -Math.cos(p * Math.PI * 2)); return fk([0, -98 + bob], 90 - a * 26, [[48, 0], [46, kn * 48], [14, -90 - kn * 20]]).map(T); };
  const LJ = (P: Pt[], r: N[]): Joint[] => P.map((p, i) => ({ p, up: r[i] * k, dn: r[i] * k }));
  const body: Joint[] = [{ p: T([0, -92 + bob]), up: 20, dn: 20 }, { p: T([2, -130 + bob]), up: 26, dn: 24 }, { p: T([4, -164 + bob]), up: 24, dn: 22 }, { p: T([6, -176 + bob]), up: 12, dn: 12 }].map(j => ({ ...j, up: j.up * k, dn: j.dn * k }));
  const armP = (p: N) => fk([4, -160 + bob], 90 + Math.sin(p * Math.PI * 2) * 24 - arm, [[30, 0], [28, -20 - arm * .3]]).map(T);
  const hd = T([8, -192 + bob]);
  return <g>
    <Skin id={id + 'l2'} J={LJ(leg(ph + .5), [10, 8, 6, 5])} col={mix(col, '#1A120B', .4)} hatch={.5} sw={1.2} per={5} rim={0} />
    <Skin id={id + 'a2'} J={LJ(armP(ph), [8, 7, 6])} col={mix(col, '#1A120B', .4)} hatch={.5} sw={1.1} per={5} rim={0} />
    <Skin id={id + 'l1'} J={LJ(leg(ph), [10.5, 8.5, 6.5, 5.5])} col={mix(col, '#1A120B', .15)} hatch={.4} sw={1.3} per={5} />
    {[leg(ph)[3], leg(ph + .5)[3]].map((f, i) => <ellipse key={i} cx={f[0] + 6 * k} cy={f[1]} rx={14 * k} ry={6 * k} fill="#2B1D12" />)}
    <Skin id={id + 'b'} J={body} col={col} hatch={.6} sw={1.5} fur={.5 * k} per={6} />
    <Skin id={id + 'a1'} J={LJ(armP(ph + .5), [8.5, 7.5, 6.5])} col={mix(col, '#1A120B', .1)} hatch={.4} sw={1.2} per={5} />
    <circle cx={hd[0]} cy={hd[1]} r={20 * k} fill={mix(col, '#1A120B', .2)} stroke={SEP} strokeWidth={1.3} />
    <circle cx={hd[0] + 2 * k} cy={hd[1]} r={21 * k} fill="none" stroke="#EFE2C6" strokeWidth={5 * k} strokeDasharray={`${2 * k} ${2 * k}`} opacity={.8} />
    <ellipse cx={hd[0] + 9 * k} cy={hd[1] + 2 * k} rx={9 * k} ry={12 * k} fill="#C78F66" stroke={SEP} strokeWidth={1} />
    <path d={`M${hd[0] + 6 * k} ${hd[1] + 8 * k} q${6 * k} ${8 * k} ${12 * k} ${2 * k}`} stroke="#EFE2C6" strokeWidth={4 * k} fill="none" opacity={.8} />
    <circle cx={hd[0] + 13 * k} cy={hd[1] - 2 * k} r={1.6 * k} fill="#1A120B" />
  </g>;
};
const GreenlandIce: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, snow = 0, sledge = 0, flag = 0, tm = 0 }) => {
  const id = 'gi' + Math.round(x), hz = y - 60 * s, gy = y + 250 * s, ph = sledge * 34;
  const sast = useMemo(() => Array.from({ length: 70 }, (_, i) => ({ u: rnd(i * 1.3), v: Math.pow(rnd(i * 2.9), 1.4), w: 40 + rnd(i * 3.7) * 120 })), []);
  const streaks = useMemo(() => Array.from({ length: 240 }, (_, i) => ({ x: rnd(i * 1.1) * 2600, y: rnd(i * 2.3) * 1300 - 150, l: 30 + rnd(i * 3.1) * 90, v: .6 + rnd(i * 4.3) * .8 })), []);
  const GX = lerp(-900, 2400, sledge);
  return <g opacity={draw}>
    <defs><linearGradient id={id + 'sk'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B9CCD6" /><stop offset=".8" stopColor="#E9E6DA" /><stop offset="1" stopColor="#F6EBD2" /></linearGradient>
      <linearGradient id={id + 'ic'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E3EBEE" /><stop offset="1" stopColor="#FFFFFF" /></linearGradient></defs>
    <rect x={-200} y={-200} width={2320} height={hz + 210} fill={`url(#${id}sk)`} />
    <circle cx={x + 520 * s} cy={hz - 50 * s} r={260 * s} fill="url(#glowW)" opacity={.8} />
    <circle cx={x + 520 * s} cy={hz - 50 * s} r={42 * s} fill="#FFF4D2" stroke="#E9B456" strokeWidth={1} opacity={.95} />
    {[[-1100, -300, 70], [-500, 40, 50], [300, 520, 40], [700, 1100, 60]].map(([a, b, h], i) => <path key={i}
      d={`M${x + a * s} ${hz} ${Array.from({ length: 8 }, (_, j) => `L${f1(x + lerp(a, b, (j + .5) / 8) * s)} ${f1(hz - (h * (.4 + rnd(i * 9 + j) * .6)) * s)}`).join(' ')} L${x + b * s} ${hz}Z`} fill="#9FB6C8" opacity={.55} stroke="#7FA8C4" strokeWidth={.8} />)}
    <rect x={-200} y={hz} width={2320} height={1300 - hz} fill={`url(#${id}ic)`} />
    <path d={`M-200 ${hz} H2120`} stroke="#7FA8C4" strokeWidth={1.2} opacity={.6} />
    {sast.map((q, i) => { const yy = hz + 6 + q.v * (1200 - hz), sc = .2 + q.v * 1.6, xx = -200 + q.u * 2320, w = q.w * sc;
      return <g key={i}><path d={`M${f1(xx)} ${f1(yy)} q${f1(w * .3)} ${f1(-6 * sc)} ${f1(w * .6)} ${f1(-2 * sc)} t${f1(w * .4)} ${f1(2 * sc)}`} stroke="#9FB6C8" strokeWidth={2.4 * sc} fill="none" opacity={.6} />
        <path d={`M${f1(xx)} ${f1(yy + 2 * sc)} q${f1(w * .3)} ${f1(-6 * sc)} ${f1(w * .6)} ${f1(-2 * sc)}`} stroke={SEP} strokeWidth={.6} fill="none" opacity={.35} /></g>; })}
    {flag > 0 && <g opacity={cl(flag * 3)} transform={`translate(${x + 330 * s} ${hz + 6 * s})`}>
      <path d={`M-30 2 Q-14 -10 2 2 Z`} transform={`scale(${s})`} fill="#E8EEF0" stroke={SEP} strokeWidth={.6} />
      <line x1={0} y1={0} x2={0} y2={-44 * s} stroke={SEP} strokeWidth={1.4} />
      <path d={`M0 ${-44 * s} q${8 * s} ${(-3 + Math.sin(tm * 6) * 3) * s} ${18 * s} ${(1 + Math.sin(tm * 6 + 1) * 2) * s} L${18 * s} ${-32 * s} Q${8 * s} ${-34 * s} 0 ${-32 * s}Z`} fill={VERM} stroke={SEP} strokeWidth={.6} /></g>}
    {sledge > 0 && sledge < 1 && <g>
      {/* traces from the sledge to the dogs (fan hitch) */}
      {[0, 1, 2].map(j => [0, 1].map(sd => <path key={j + '_' + sd} d={`M${GX + 20 * s} ${gy - 34 * s} L${GX + (110 + j * 120) * s} ${gy - (52 + (sd ? 0 : 14)) * s - (sd ? 0 : 10 * s)}`} stroke={SEP} strokeWidth={1} opacity={.7} />))}
      {[0, 1, 2].map(j => <Husky key={'d' + j} id={id + 'df' + j} X={GX + (130 + j * 120) * s} Y={gy - 16 * s} k={.82 * s} ph={ph + j * .3 + .15} dark={.25} col="#8C877A" />)}
      {/* the sledge: long runners curled at the front, stanchions, a load lashed under canvas, the handlebar */}
      <ellipse cx={GX - 110 * s} cy={gy + 4 * s} rx={170 * s} ry={10 * s} fill={SEP} opacity={.18} filter="url(#b2s)" />
      <path d={`M${GX - 260 * s} ${gy} H${GX - 10 * s} Q${GX + 30 * s} ${gy} ${GX + 26 * s} ${gy - 34 * s}`} stroke="#4F3020" strokeWidth={6 * s} fill="none" strokeLinecap="round" />
      {[-240, -170, -100, -30].map(px => <line key={px} x1={GX + px * s} y1={gy} x2={GX + px * s} y2={gy - 40 * s} stroke="#4F3020" strokeWidth={4 * s} />)}
      <SR d={`M${GX - 250 * s} ${gy - 40 * s} L${GX - 236 * s} ${gy - 100 * s} Q${GX - 140 * s} ${gy - 122 * s} ${GX - 44 * s} ${gy - 96 * s} L${GX - 20 * s} ${gy - 40 * s}Z`} mat="cloth" t={.3} draw={draw} sw={1.4} />
      {[-200, -140, -80].map(px => <path key={px} d={`M${GX + px * s} ${gy - 40 * s} Q${GX + (px + 10) * s} ${gy - 80 * s} ${GX + (px + 4) * s} ${gy - 112 * s}`} stroke={SEP} strokeWidth={1.4} fill="none" />)}
      <path d={`M${GX - 258 * s} ${gy - 40 * s} L${GX - 280 * s} ${gy - 120 * s} M${GX - 272 * s} ${gy - 100 * s} L${GX - 250 * s} ${gy - 96 * s}`} stroke="#4F3020" strokeWidth={5 * s} strokeLinecap="round" />
      <Walker id={id + 'w1'} X={GX - 330 * s} Y={gy + 4 * s} k={.86 * s} ph={ph * .55} col="#5A4632" arm={50} />
      {[0, 1, 2].map(j => <Husky key={'n' + j} id={id + 'dn' + j} X={GX + (110 + j * 120) * s} Y={gy + 4 * s} k={.9 * s} ph={ph + j * .3} col="#B4AFA2" />)}
      <Walker id={id + 'w2'} X={GX - 120 * s} Y={gy + 70 * s} k={.95 * s} ph={ph * .55 + .5} col="#6A4430" />
    </g>}
    {snow > 0 && <g>
      <rect x={-200} y={-200} width={2320} height={1480} fill="#F4F6F6" opacity={snow * .45} />
      {streaks.map((q, i) => { const xx = ((q.x + tm * 1400 * q.v) % 2600) - 300, yy = q.y + ((tm * 220 * q.v) % 60);
        return <line key={i} x1={f1(xx)} y1={f1(yy)} x2={f1(xx + q.l)} y2={f1(yy + q.l * .12)} stroke="#FFFFFF" strokeWidth={1.4 + q.v} opacity={snow * .9} />; })}
      {streaks.slice(0, 80).map((q, i) => { const xx = ((q.x * 1.3 + tm * 1700 * q.v) % 2600) - 300, yy = q.y + 30; return <line key={'d' + i} x1={f1(xx)} y1={f1(yy)} x2={f1(xx + q.l * .7)} y2={f1(yy + q.l * .1)} stroke="#9FB6C8" strokeWidth={1} opacity={snow * .5} />; })}</g>}
  </g>;
};

// ================================================================ 7. THE WEATHER BALLOON — a white latex sounding balloon (round, a soft highlight, the tied neck) with a
// small instrument box on a long string. rise 0..1 climbs 700 px; it sways with tm. bg 1 = a pale sky with clouds behind it.
const Balloon: React.FC<any> = ({ x = 960, y = 640, s = 1, draw = 1, rise = 0, tm = 0, bg = 1 }) => {
  const id = 'bl' + Math.round(x), sw = Math.sin(tm * .9) * 18 * s, by = y - rise * 700 * s - 160 * s, bx = x + sw, tilt = Math.sin(tm * .9 + .6) * 3, R = 130 * s;
  const box: Pt = [x + Math.sin(tm * .9 - .8) * 30 * s, by + R + 330 * s];
  return <g opacity={draw}>
    {bg > 0 && <g opacity={bg}><defs><linearGradient id={id + 'sk'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FB2C9" /><stop offset="1" stopColor="#E3E6DC" /></linearGradient></defs>
      <rect x={-200} y={-200} width={2320} height={1480} fill={`url(#${id}sk)`} />
      {[[200, 300 + rise * 500, 1.4], [1500, 180 + rise * 600, 1], [1200, 820 + rise * 400, 1.6], [500, 900 + rise * 300, 1.1]].map(([cx, cy, k], i) => <g key={i} opacity={.9}>
        {[[-60, 0, 60], [0, -26, 70], [60, 0, 56], [120, 10, 40], [-110, 10, 40]].map(([a, b, r], j) => <circle key={j} cx={cx + a * k} cy={cy + b * k} r={r * k} fill="#FBF8EE" />)}
        <path d={`M${cx - 150 * k} ${cy + 40 * k} H${cx + 160 * k}`} stroke="#C9DDE6" strokeWidth={14 * k} opacity={.7} /></g>)}</g>}
    {/* the string, bending with the sway */}
    <path d={`M${bx} ${by + R + 18 * s} Q${(bx + box[0]) / 2 + Math.sin(tm * 1.3) * 26 * s} ${(by + R + box[1]) / 2} ${box[0]} ${box[1] - 30 * s}`} stroke={SEP} strokeWidth={1.4} fill="none" />
    <g transform={`rotate(${tilt} ${box[0]} ${box[1]})`}>
      <SR d={rect(box[0] - 26 * s, box[1] - 30 * s, 52 * s, 60 * s)} mat="paper" t={.25} draw={draw} sw={1.4} />
      <rect x={box[0] - 16 * s} y={box[1] - 18 * s} width={14 * s} height={10 * s} fill="#3A2418" /><line x1={box[0] + 10 * s} y1={box[1] - 22 * s} x2={box[0] + 10 * s} y2={box[1] + 20 * s} stroke={VERM} strokeWidth={2 * s} />
      <path d={`M${box[0] - 6 * s} ${box[1] + 30 * s} V${box[1] + 70 * s}`} stroke={SEP} strokeWidth={1} /><circle cx={box[0] - 6 * s} cy={box[1] + 70 * s} r={3 * s} fill={SEP} /></g>
    <g transform={`rotate(${tilt} ${bx} ${by})`}>
      <defs><radialGradient id={id + 'g'} cx=".38" cy=".34" r=".75"><stop offset="0" stopColor="#FFFFFF" /><stop offset=".55" stopColor="#F1EDE2" /><stop offset="1" stopColor="#C9C3B2" /></radialGradient></defs>
      <path d={`M${bx - 10 * s} ${by + R + 2 * s} L${bx - 7 * s} ${by + R + 20 * s} H${bx + 7 * s} L${bx + 10 * s} ${by + R + 2 * s}Z`} fill="#E8E2D2" stroke={SEP} strokeWidth={1.2} />
      <ellipse cx={bx} cy={by + R + 20 * s} rx={9 * s} ry={4 * s} fill="#D9D0BA" stroke={SEP} strokeWidth={1} />
      <path d={`M${bx} ${by - R} C${bx + R * 1.1} ${by - R} ${bx + R * 1.05} ${by + R * .7} ${bx + 8 * s} ${by + R + 4 * s} H${bx - 8 * s} C${bx - R * 1.05} ${by + R * .7} ${bx - R * 1.1} ${by - R} ${bx} ${by - R}Z`} fill={`url(#${id}g)`} stroke={SEP} strokeWidth={1.8} />
      <ellipse cx={bx - R * .38} cy={by - R * .45} rx={R * .22} ry={R * .14} fill="#FFFFFF" opacity={.95} transform={`rotate(-35 ${bx - R * .38} ${by - R * .45})`} />
      <path d={`M${bx + R * .6} ${by - R * .4} Q${bx + R * .8} ${by} ${bx + R * .45} ${by + R * .55}`} stroke={SEP} strokeWidth={1} fill="none" opacity={.35} /></g>
  </g>;
};

// ================================================================ 8. THE STUDY DESK — a scholar's desk of the 1910s seen from a little above: a brass oil lamp with its
// glass chimney, an open atlas (the South Atlantic: Brazil left, Africa right), a magnifying glass, loose papers, an ink pot and a pen.
// lamp: the lamp's warm glow · mag: the magnifier sweeps across the atlas (left → right) · shells: on the atlas, matching rock layers (coloured
// strata) and tiny fossil shells appear on BOTH sides of the blue ocean.
const StudyDesk: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, lamp = 1, mag = 0, shells = 0, tm = 0 }) => {
  const id = 'sd' + Math.round(x), X = (d: N) => x + d * s, Y = (d: N) => y + d * s, kk = 8 * s;
  const ax = x + 40 * s, ay = y + 60 * s, AW = 920 * s, AH = 560 * s, sa = wpos('SAM', ax, ay, kk, -16, -14), af = wpos('AFR', ax, ay, kk, -16, -14);
  const strata = ['#8C3424', '#E0B878', '#8C877A', '#5F8A5A', '#C9AE84'];
  const brz = xf(shape('SAM', 0), sa[0], sa[1], kk)[COAST_BR[Math.floor(COAST_BR.length * .55)]], waf = xf(shape('AFR', 0), af[0], af[1], kk)[COAST_WA[Math.floor(COAST_WA.length * .6)]];
  const atlasMap = <g>
    <rect x={ax - AW / 2} y={ay - AH / 2} width={AW} height={AH} fill="#9CCAD6" opacity={.75} />
    <Ripples d={cpath('SAM', sa[0], sa[1], kk, 0, 0)} /><Ripples d={cpath('AFR', af[0], af[1], kk, 0, 0)} />
    <SR d={cpath('SAM', sa[0], sa[1], kk, 0, 0)} mat="land" t={.32} draw={draw} sw={1.6} /><SR d={cpath('AFR', af[0], af[1], kk, 0, 0)} mat="desert" t={.3} draw={draw} sw={1.6} />
    {shells > 0 && [[brz, -1], [waf, 1]].map(([p, sd], j) => { const P = p as Pt, dir = sd as N; return <g key={j}>
      {strata.map((c, i) => { const g = ease(stag(shells * 1.4, i, 5, .5)); return <rect key={i} x={P[0] - (dir < 0 ? 130 : -14) * s} y={P[1] - 50 * s + i * 18 * s} width={116 * s * g} height={16 * s} fill={c} stroke={SEP} strokeWidth={.8} opacity={g} />; })}
      {Array.from({ length: 6 }, (_, i) => { const g = ease(stag(shells * 1.4 - .3, i, 6, .5)), cx = P[0] + (dir < 0 ? -110 + i * 18 : 26 + i * 18) * s, cy = P[1] + (i % 2 ? 66 : 50) * s;
        return g > 0 ? <g key={'f' + i} opacity={g} transform={`translate(${cx} ${cy}) scale(${s * g})`}>{i % 2 ?
          <g><path d="M-8 4 Q-8 -8 0 -9 Q8 -8 8 4Z" fill="#EFE0C2" stroke={SEP} strokeWidth={1} />{[-5, -2, 1, 4].map(v => <path key={v} d={`M0 5 L${v * 1.6} -7`} stroke={SEP} strokeWidth={.6} />)}</g>
          : <g><circle r={8} fill="#EFE0C2" stroke={SEP} strokeWidth={1} /><path d="M0 0 m2 0 a2 2 0 1 0 -4 0 a4.5 4.5 0 1 0 9 0 a7 7 0 1 0 -14 0" stroke={SEP} strokeWidth={.7} fill="none" /></g>}</g> : null; })}</g>; })}
    {shells > .6 && <path d={`M${brz[0] + 6 * s} ${brz[1] - 10 * s} Q${(brz[0] + waf[0]) / 2} ${Math.min(brz[1], waf[1]) - 90 * s} ${waf[0] - 6 * s} ${waf[1] - 10 * s}`} stroke={VERM} strokeWidth={2.4 * s} strokeDasharray={`${8 * s} ${6 * s}`} fill="none" opacity={cl((shells - .6) * 3)} />}
  </g>;
  const mx = lerp(ax - 330 * s, ax + 330 * s, ease(mag)), my = ay - 20 * s + Math.sin(mag * Math.PI) * -40 * s, mr = 110 * s;
  return <g opacity={draw}>
    {/* wall and desk top (seen from a little above) */}
    <SR d={rect(-200, -200, 2320, Y(-330) + 200)} mat="wall" t={.55} draw={draw} sw={0} hatch={0} rim={false} />
    {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${-200 + i * 150} -200 V${Y(-330)}`} stroke="#3A2418" strokeWidth={2} opacity={.3} />)}
    <SR d={rect(-200, Y(-330), 2320, 1500)} mat="wood" t={.5} ang={0} draw={draw} sw={1.6} hatch={0} />
    {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M-200 ${Y(-310) + i * 46 * s} C400 ${Y(-316) + i * 46 * s} 1200 ${Y(-300) + i * 46 * s} 2120 ${Y(-312) + i * 46 * s}`} stroke="#4F3020" strokeWidth={1} fill="none" opacity={.35} />)}
    {/* lamp glow on the desk */}
    <circle cx={X(-640)} cy={Y(-200)} r={900 * s} fill="url(#glowW)" opacity={.55 * lamp} />
    {/* loose papers with handwriting, the ink pot and pen */}
    {[[-700, 280, -14], [620, 330, 10], [700, -200, 6]].map(([px, py, r], i) => <g key={i} transform={`rotate(${r} ${X(px)} ${Y(py)})`}>
      <rect x={X(px) - 150 * s + 6} y={Y(py) - 100 * s + 8} width={300 * s} height={200 * s} fill={SEP} opacity={.3} filter="url(#b2s)" />
      <SR d={rect(X(px) - 150 * s, Y(py) - 100 * s, 300 * s, 200 * s)} mat="paper" t={.12} draw={draw} sw={1.1} hatch={0} />
      {Array.from({ length: 8 }, (_, j) => <path key={j} d={`M${X(px) - 130 * s} ${Y(py) - 78 * s + j * 21 * s} ${Array.from({ length: 10 }, (_, q) => `q${10 * s} ${(rnd(i * 50 + j * 9 + q) - .5) * 8 * s} ${24 * s} 0`).join(' ')}`} stroke={SEP} strokeWidth={1} fill="none" opacity={.55} />)}</g>)}
    <g><ellipse cx={X(560)} cy={Y(-120)} rx={56 * s} ry={20 * s} fill={SEP} opacity={.3} filter="url(#b2s)" />
      <SR d={`M${X(510)} ${Y(-130)} L${X(518)} ${Y(-200)} Q${X(550)} ${Y(-214)} ${X(582)} ${Y(-200)} L${X(590)} ${Y(-130)} Q${X(550)} ${Y(-116)} ${X(510)} ${Y(-130)}Z`} mat="night" t={.7} draw={draw} sw={1.4} hatch={0} />
      <ellipse cx={X(550)} cy={Y(-204)} rx={20 * s} ry={7 * s} fill="#1A120B" /><path d={`M${X(546)} ${Y(-206)} L${X(470)} ${Y(-380)}`} stroke="#4F3020" strokeWidth={4 * s} />
      <path d={`M${X(470)} ${Y(-380)} q${-30 * s} ${-40 * s} ${-10 * s} ${-90 * s} q${20 * s} ${40 * s} ${10 * s} ${90 * s}`} fill="#EFE2C6" stroke={SEP} strokeWidth={1} /></g>
    {/* the oil lamp: brass font, glass chimney, the flame */}
    <g><ellipse cx={X(-640)} cy={Y(-110)} rx={90 * s} ry={24 * s} fill={SEP} opacity={.35} filter="url(#b8)" />
      <SR d={`M${X(-710)} ${Y(-110)} Q${X(-640)} ${Y(-90)} ${X(-570)} ${Y(-110)} L${X(-600)} ${Y(-150)} L${X(-680)} ${Y(-150)}Z`} mat="brass" t={.5} draw={draw} sw={1.4} />
      <SR d={ell(X(-640), Y(-190), 62 * s, 46 * s)} mat="brass" t={.4} draw={draw} sw={1.4} />
      <SR d={rect(X(-664), Y(-250), 48 * s, 26 * s)} mat="brass" t={.55} draw={draw} sw={1.2} />
      <path d={`M${X(-660)} ${Y(-250)} C${X(-690)} ${Y(-300)} ${X(-670)} ${Y(-330)} ${X(-656)} ${Y(-350)} V${Y(-430)} H${X(-624)} V${Y(-350)} C${X(-610)} ${Y(-330)} ${X(-590)} ${Y(-300)} ${X(-620)} ${Y(-250)}Z`} fill="#E8F0F0" fillOpacity={.35} stroke={SEP} strokeWidth={1.3} />
      <path d={`M${X(-640)} ${Y(-262)} q${-12 * s} ${-24 * s} 0 ${-56 * s - Math.sin(tm * 9) * 4 * s} q${12 * s} ${32 * s} 0 ${56 * s}`} fill="#F6CF7A" stroke="#E89A3E" strokeWidth={1} opacity={.4 + .6 * lamp} />
      <circle cx={X(-640)} cy={Y(-290)} r={120 * s} fill="url(#glowG)" opacity={lamp * (.8 + Math.sin(tm * 7) * .05)} />
      <path d={`M${X(-650)} ${Y(-340)} V${Y(-420)}`} stroke="#FFFFFF" strokeWidth={3 * s} opacity={.5} /></g>
    {/* the open atlas */}
    <rect x={ax - AW / 2 - 24 * s} y={ay - AH / 2 - 18 * s} width={AW + 48 * s} height={AH + 36 * s} rx={8 * s} fill="#3A4A3A" stroke={SEP} strokeWidth={1.4} />
    <Floor x={ax} y={ay + AH / 2 + 22 * s} rx={AW * .55} ry={20 * s} a={.45} />
    <rect x={ax - AW / 2} y={ay - AH / 2} width={AW} height={AH} fill="#EFE0C2" stroke={SEP} strokeWidth={1.4} />
    <defs><clipPath id={id + 'a'}><rect x={ax - AW / 2 + 30 * s} y={ay - AH / 2 + 30 * s} width={AW - 60 * s} height={AH - 60 * s} /></clipPath><clipPath id={id + 'm'}><circle cx={mx} cy={my} r={mr} /></clipPath></defs>
    <g clipPath={`url(#${id}a)`}>{atlasMap}</g>
    {[1, 2, 3, 4].map(i => <path key={i} d={`M${ax - i * 8 * s} ${ay - AH / 2} V${ay + AH / 2} M${ax + i * 8 * s} ${ay - AH / 2} V${ay + AH / 2}`} stroke={SEP} strokeWidth={6 * s} opacity={.06 * (5 - i)} />)}
    <path d={`M${ax} ${ay - AH / 2} V${ay + AH / 2}`} stroke={SEP} strokeWidth={1.2} opacity={.6} />
    <Stipple x={ax - AW / 2} y={ay - AH / 2} w={AW} h={AH} n={500} seed="sdfox" col="#8C5A36" a={.2} />
    {/* the magnifying glass: the map seen bigger through it */}
    {mag > 0 && <g>
      <ellipse cx={mx + 30 * s} cy={my + 40 * s} rx={mr} ry={mr * .9} fill={SEP} opacity={.25} filter="url(#b8)" />
      <g clipPath={`url(#${id}m)`}><rect x={mx - mr} y={my - mr} width={2 * mr} height={2 * mr} fill="#EFE0C2" /><g transform={`translate(${mx} ${my}) scale(1.7) translate(${-mx} ${-my})`}>{atlasMap}</g>
        <circle cx={mx - mr * .35} cy={my - mr * .4} r={mr * .5} fill="#FFFFFF" opacity={.18} /></g>
      <circle cx={mx} cy={my} r={mr} fill="none" stroke="url(#gold)" strokeWidth={14 * s} /><circle cx={mx} cy={my} r={mr + 7 * s} fill="none" stroke={SEP} strokeWidth={1.2} /><circle cx={mx} cy={my} r={mr - 7 * s} fill="none" stroke={SEP} strokeWidth={1} />
      <path d={`M${mx + mr * .72} ${my + mr * .72} L${mx + mr * 1.9} ${my + mr * 1.9}`} stroke="#4F3020" strokeWidth={26 * s} strokeLinecap="round" />
      <path d={`M${mx + mr * .72} ${my + mr * .72} L${mx + mr * 1.9} ${my + mr * 1.9}`} stroke="#8C5A36" strokeWidth={16 * s} strokeLinecap="round" /></g>}
  </g>;
};

// ================================================================ 9. THE TORN NEWSPAPER — a broadsheet of 1912 (blackletter-like masthead in IM Fell, columns of grey
// print, one headline) on a dark table. tear: a jagged tear rips down the middle · gap: the halves drift apart (≤ 120 px) · print: one bold
// line of vermilion print runs letter by letter from the left half across the tear into the right · fossils: that line is made of tiny reptiles
// and leaves instead of letters.
const TornNews: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tear = 0, gap = 0, print = 0, fossils = 0 }) => {
  const id = 'tn' + Math.round(x), W = 1000 * s, H = 1180 * s, x0 = x - W / 2, y0 = y - H / 2 + 60 * s, tx = x + 10 * s;
  const tearPts = useMemo(() => jag(0, -1, 0, 1, 30, 1, 21), []).map(([a, b]) => [tx + a * 16 * s, y0 + H / 2 + b * H / 2] as Pt);
  const tp = cl(tear), g = gap * 60 * s, line = 'THE SAME ROCKS ~ THE SAME FOSSILS ~ ON BOTH SHORES', LY = y0 + 520 * s, nG = 40;
  const clipL = 'M' + [[x0 - 200, y0 - 200], [tearPts[0][0], y0 - 200], ...tearPts, [tearPts[tearPts.length - 1][0], y0 + H + 200], [x0 - 200, y0 + H + 200]].map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z';
  const clipR = 'M' + [[x0 + W + 200, y0 - 200], [tearPts[0][0], y0 - 200], ...tearPts, [tearPts[tearPts.length - 1][0], y0 + H + 200], [x0 + W + 200, y0 + H + 200]].map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z';
  const cols = 5, cw = (W - 80 * s) / cols;
  const paper = <g>
    <rect x={x0} y={y0} width={W} height={H} fill="#EFE6CF" stroke={SEP} strokeWidth={1.4} />
    <Stipple x={x0} y={y0} w={W} h={H} n={700} seed="tnp" col="#8C6E4A" a={.2} />
    <Fell x={x} y={y0 + 100 * s} s={84 * s} t="The World Gazette" />
    <line x1={x0 + 40 * s} y1={y0 + 128 * s} x2={x0 + W - 40 * s} y2={y0 + 128 * s} stroke={SEP} strokeWidth={3 * s} />
    <Fell x={x0 + 40 * s} y={y0 + 152 * s} s={18 * s} t="VOL. XII  ·  1912" anchor="start" sc /><Fell x={x0 + W - 40 * s} y={y0 + 152 * s} s={18 * s} t="ONE PENNY" anchor="end" sc />
    <line x1={x0 + 40 * s} y1={y0 + 166 * s} x2={x0 + W - 40 * s} y2={y0 + 166 * s} stroke={SEP} strokeWidth={1.2 * s} />
    <Fell x={x} y={y0 + 236 * s} s={58 * s} t="DO THE CONTINENTS MOVE?" sc />
    <Fell x={x} y={y0 + 282 * s} s={26 * s} t="A bold new theory of the Earth" italic />
    {Array.from({ length: cols }, (_, c) => { const cx0 = x0 + 40 * s + c * cw; return <g key={c}>
      {c > 0 && <line x1={cx0 - 6 * s} y1={y0 + 310 * s} x2={cx0 - 6 * s} y2={y0 + H - 40 * s} stroke={SEP} strokeWidth={.8} opacity={.6} />}
      {Array.from({ length: 52 }, (_, r) => { const yy = y0 + 320 * s + r * 15.5 * s; if (yy > LY - 30 * s && yy < LY + 30 * s) return null; if (c === 2 && r > 26 && r < 36) return null;
        const w = (r % 9 === 8 ? .55 : .92 + rnd(c * 60 + r) * .06) * (cw - 18 * s); return <rect key={r} x={cx0} y={yy} width={w} height={6 * s} fill="#8C877A" opacity={.65} />; })}</g>; })}
    <rect x={x0 + 40 * s + 2 * cw} y={y0 + 740 * s} width={cw - 14 * s} height={140 * s} fill="#C9C2A6" stroke={SEP} strokeWidth={1} />
    <path d={cpath('SAM', x0 + 40 * s + 2 * cw + cw * .3, y0 + 815 * s, 1.6 * s, 0, 0)} fill="#8C877A" /><path d={cpath('AFR', x0 + 40 * s + 2 * cw + cw * .72, y0 + 800 * s, 1.6 * s, 0, 0)} fill="#8C877A" />
    {/* the vermilion line */}
    {print > 0 && Array.from({ length: nG }, (_, i) => { const u = cl(print * nG - i); if (u <= 0) return null; const gx = x0 + 60 * s + i * (W - 120 * s) / (nG - 1), ch = line[Math.round(i * (line.length - 1) / (nG - 1))];
      return <g key={i} opacity={u}>
        {fossils < 1 && ch !== ' ' && <Fell x={gx} y={LY + 12 * s} s={34 * s} t={ch} col={VERM} a={1 - fossils} sc />}
        {fossils > 0 && (i % 2 ? <ReptGlyph x={gx} y={LY} r={9 * s} a={fossils} /> : <GlossLeaf x={gx - 12 * s} y={LY + 8 * s} L={26 * s} a={-40} col={VERM} vein="#8C3424" draw={fossils} />)}</g>; })}
  </g>;
  return <g opacity={draw}>
    <rect x={-200} y={-200} width={2320} height={1480} fill="#3A2418" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M-200 ${-180 + i * 48} C400 ${-190 + i * 48} 1200 ${-170 + i * 48} 2120 ${-184 + i * 48}`} stroke="#1A120B" strokeWidth={1} fill="none" opacity={.45} />)}
    <g transform={`rotate(-2 ${x} ${y})`}>
      <rect x={x0 + 14 * s} y={y0 + 20 * s} width={W} height={H} fill="#000" opacity={.4} filter="url(#b8)" />
      <defs><clipPath id={id + 'L'}><path d={clipL} /></clipPath><clipPath id={id + 'R'}><path d={clipR} /></clipPath></defs>
      <g transform={`translate(${-g} 0) rotate(${-gap * 2} ${x0} ${y0 + H})`}><g clipPath={gap > 0 ? `url(#${id}L)` : undefined}>{paper}</g>{gap > 0 && <path d={sm(tearPts, false)} stroke="#FBF4E2" strokeWidth={4 * s} fill="none" />}</g>
      {gap > 0 && <g transform={`translate(${g} 0) rotate(${gap * 2} ${x0 + W} ${y0 + H})`}><g clipPath={`url(#${id}R)`}>{paper}</g><path d={sm(tearPts, false)} stroke="#FBF4E2" strokeWidth={4 * s} fill="none" /></g>}
      {tp > 0 && gap <= 0 && (() => { const P = tearPts.filter(p => p[1] <= y0 + tp * H + 1); return P.length > 1 ? <g><path d={sm(P, false)} stroke="#1A120B" strokeWidth={5 * s} fill="none" /><path d={sm(P.map(p => [p[0] + 3 * s, p[1]] as Pt), false)} stroke="#FBF4E2" strokeWidth={2.5 * s} fill="none" />
        <path d={`M${P[P.length - 1][0] - 30 * s} ${P[P.length - 1][1] + 20 * s} l${30 * s} ${-20 * s} l${30 * s} ${20 * s}`} stroke={SEP} strokeWidth={1} fill="none" opacity={tp < 1 ? .6 : 0} /></g> : null; })()}
    </g>
  </g>;
};

// ================================================================ 10. THE LECTURE HALL, 1912 — a university hall by gaslight: wood panelling, gas sconces, a big wall map
// of the world over a lectern, tiered benches of bearded professors in dark suits (seen from behind and in profile, turned to each other).
// map: the continents on the wall map slide together into Pangaea · laugh: heads thrown back, bodies shaking · steam: laughter rises as white
// wisps · bubbles: speech bubbles "impossible!" pop up over heads · stone: the bubbles turn to grey stone and stack into a wall across the hall.
const PROFS: [N, N, N, N, N][] = [   // [x, y (of the seat), scale, facing (+1 right, -1 left, 0 back), hair]
  [-560, 170, .62, 1, 0], [-250, 176, .6, 0, 1], [140, 172, .6, -1, 2], [470, 170, .62, -1, 3],
  [-720, 330, .86, 1, 1], [-330, 340, .84, 0, 2], [300, 338, .86, -1, 0],
  [-560, 560, 1.15, 1, 3], [-60, 580, 1.2, 0, 0], [520, 566, 1.16, -1, 1]];
const HAIR = ['#D8D2C2', '#8C877A', '#5A4632', '#B4AFA2'];
const Prof: React.FC<{ X: N; Y: N; k: N; dir: N; hair: N; laugh: N; tm: N; i: N; id: string }> = ({ X, Y, k, dir, hair, laugh, tm, i, id }) => {
  const shake = Math.sin(tm * 17 + i * 1.7) * 3 * k * laugh, by = Y + shake, hc = HAIR[hair], tilt = -dir * 28 * laugh, neck: Pt = [X, by - 92 * k];
  const torso: Joint[] = [{ p: [X, by], up: 40 * k, dn: 40 * k }, { p: [X, by - 50 * k], up: 46 * k, dn: 46 * k }, { p: [X, by - 82 * k], up: 44 * k, dn: 44 * k }, { p: [X, by - 94 * k], up: 14 * k, dn: 14 * k }];
  const H = (p: Pt): Pt => { const q = rot([p[0] * k * 1.2, p[1] * k * 1.2], tilt); return [neck[0] + q[0], neck[1] + q[1]]; }, hd = H([dir * 4, -24]);
  const arm = (sd: N): Joint[] => [{ p: [X + sd * 40 * k, by - 80 * k], up: 13 * k, dn: 13 * k }, { p: [X + sd * 50 * k, by - 40 * k], up: 11 * k, dn: 11 * k }, { p: [X + sd * (34 + laugh * 6) * k, by - 4 * k], up: 9 * k, dn: 9 * k }];
  return <g>
    <Skin id={id + 'aL'} J={arm(-1)} col="#24232B" hatch={.6} sw={1.3} per={5} rim={0} /><Skin id={id + 'aR'} J={arm(1)} col="#24232B" hatch={.6} sw={1.3} per={5} rim={0} />
    <Skin id={id} J={torso} col="#2B2A33" hatch={.7} sw={1.6} per={6} />
    <path d={`M${X - 14 * k} ${by - 90 * k} L${X} ${by - 78 * k} L${X + 14 * k} ${by - 90 * k}`} stroke="#F3EDE0" strokeWidth={5 * k} fill="none" opacity={dir === 0 ? 0 : 1} />
    {dir === 0 ? <g>
      <ellipse cx={hd[0]} cy={hd[1] + laugh * 6 * k} rx={25 * k} ry={30 * k - laugh * 4 * k} fill={hc} stroke={SEP} strokeWidth={1.3} />
      <ellipse cx={hd[0] - 26 * k} cy={hd[1] + 4 * k} rx={5 * k} ry={9 * k} fill="#C78F66" stroke={SEP} strokeWidth={1} /><ellipse cx={hd[0] + 26 * k} cy={hd[1] + 4 * k} rx={4 * k} ry={8 * k} fill="#C78F66" stroke={SEP} strokeWidth={1} />
      {hair === 0 && <ellipse cx={hd[0]} cy={hd[1] - 12 * k} rx={11 * k} ry={8 * k} fill="#D9A888" />}
      <path d={`M${hd[0] - 16 * k} ${hd[1] - 6 * k} q${16 * k} ${8 * k} ${32 * k} 0 M${hd[0] - 14 * k} ${hd[1] + 6 * k} q${14 * k} ${8 * k} ${28 * k} 0`} stroke={SEP} strokeWidth={.8} fill="none" opacity={.5} /></g>
      : <g>
        <ellipse cx={hd[0]} cy={hd[1]} rx={24 * k} ry={29 * k} fill="#D9A888" stroke={SEP} strokeWidth={1.3} transform={`rotate(${tilt} ${hd[0]} ${hd[1]})`} />
        <path d={sm([H([dir * -16, -36]), H([dir * 4, -46]), H([dir * 16, -40]), H([dir * -2, -30]), H([dir * -20, -16]), H([dir * -18, -4])])} fill={hc} stroke={SEP} strokeWidth={1} />
        {/* the beard */}
        <path d={sm([H([dir * -6, -10]), H([dir * 18, -12]), H([dir * 24, 6]), H([dir * 14, 26]), H([dir * 0, 34]), H([dir * -10, 18])])} fill={hc} stroke={SEP} strokeWidth={1.1} />
        <path d={`M${H([dir * 18, -26]).join(' ')} L${H([dir * 27, -16]).join(' ')} L${H([dir * 19, -12]).join(' ')}`} fill="#D9A888" stroke={SEP} strokeWidth={1.1} />
        {laugh > .05 ? <path d={sm([H([dir * 12, -6]), H([dir * 22, -4]), H([dir * 18, 4 + laugh * 6]), H([dir * 10, 2])])} fill="#4A1E14" stroke={SEP} strokeWidth={1} />
          : <path d={`M${H([dir * 12, -4]).join(' ')} L${H([dir * 20, -5]).join(' ')}`} stroke={SEP} strokeWidth={1.2} />}
        {laugh > .3 ? <path d={`M${H([dir * 8, -24]).join(' ')} Q${H([dir * 12, -28]).join(' ')} ${H([dir * 16, -24]).join(' ')}`} stroke={SEP} strokeWidth={1.4} fill="none" />
          : <circle cx={H([dir * 12, -24])[0]} cy={H([dir * 12, -24])[1]} r={2 * k} fill="#1A120B" />}
        <circle cx={H([dir * 12, -24])[0]} cy={H([dir * 12, -24])[1]} r={6 * k} fill="none" stroke={SEP} strokeWidth={1} opacity={i % 3 === 0 ? .9 : 0} />
        <ellipse cx={H([dir * -6, -18])[0]} cy={H([dir * -6, -18])[1]} rx={4 * k} ry={7 * k} fill="#C78F66" stroke={SEP} strokeWidth={1} /></g>}
  </g>;
};
const LectureHall: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, map = 0, laugh = 0, steam = 0, bubbles = 0, stone = 0, tm = 0 }) => {
  const id = 'lh' + Math.round(x), X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  const mx = x, my = Y(-250), MW = 780 * s, MH = 400 * s, kM = 2.05 * s, kP = 1.85 * s, mp = ease(map);
  const NB = 13, bubOf = (i: N) => i % PROFS.length;
  const slot = (i: N): Pt => i < 6 ? [160 + i * 320, Y(170)] : [(i - 6) * 320, Y(56)];
  return <g opacity={draw}>
    {/* walls: dark plaster above, panelled wood below; gas sconces */}
    <SR d={rect(-200, -200, 2320, Y(-20) + 200)} mat="wall" t={.62} draw={draw} sw={0} hatch={0} rim={false} />
    <SR d={rect(-200, Y(-20), 2320, 1500)} mat="wood" t={.66} draw={draw} sw={1.2} hatch={0} ang={0} />
    {Array.from({ length: 12 }, (_, i) => <SR key={i} d={rect(-180 + i * 190, Y(10), 160, 130 * s)} mat="wood" t={.56} draw={draw} sw={1} hatch={0} ang={0} />)}
    {[[-720, -330], [720, -330], [-1000, -100], [1000, -100]].map(([a, b], i) => <g key={i}>
      <circle cx={X(a)} cy={Y(b)} r={260 * s} fill="url(#glowG)" opacity={.55 + Math.sin(tm * 5 + i) * .04} />
      <path d={`M${X(a)} ${Y(b + 70)} V${Y(b + 10)}`} stroke="#8A6420" strokeWidth={5 * s} /><path d={`M${X(a - 16)} ${Y(b + 10)} H${X(a + 16)} L${X(a + 10)} ${Y(b - 30)} H${X(a - 10)}Z`} fill="#F7E3A0" fillOpacity={.6} stroke={SEP} strokeWidth={1.1} />
      <path d={`M${X(a)} ${Y(b + 4)} q${-6 * s} ${-12 * s} 0 ${-24 * s} q${6 * s} ${12 * s} 0 ${24 * s}`} fill="#F6CF7A" /></g>)}
    {/* the wall map, hung from a wooden roller */}
    <rect x={mx - MW / 2 + 12} y={my - MH / 2 + 16} width={MW} height={MH} fill="#000" opacity={.35} filter="url(#b8)" />
    <rect x={mx - MW / 2} y={my - MH / 2} width={MW} height={MH} fill="#EFE0C2" stroke={SEP} strokeWidth={1.6} />
    <defs><clipPath id={id + 'm'}><rect x={mx - MW / 2 + 14 * s} y={my - MH / 2 + 14 * s} width={MW - 28 * s} height={MH - 28 * s} /></clipPath></defs>
    <g clipPath={`url(#${id}m)`}>
      <Ruled x={mx - MW / 2} y={my - MH / 2} w={MW} h={MH} col="#A9C8D0" gap={5 * s} a={.18} />
      {['GBR', 'JPN', 'NZL'].map(k => { const p = wpos(k, mx, my, kM, 0, 12); return <path key={k} d={cpath(k, p[0], p[1], kM, 0, 0)} fill="#E2CF94" stroke={SEP} strokeWidth={1} opacity={1 - mp} />; })}
      {PANG.map(k => { const w = wpos(k, mx, my, kM, 0, 12), g = PG[k], u = ease(stag(map, PANG.indexOf(k), PANG.length, .7)), px = lerp(w[0], mx + (g[0] - 12) * kP, u), py = lerp(w[1], my + (g[1] - 4) * kP, u);
        return <path key={k} d={cpath(k, px, py, lerp(kM, kP, u), g[2] * u, u)} fill={CONT_COL[k]} stroke={SEP} strokeWidth={1.2} />; })}
    </g>
    {[-1, 1].map(t => <g key={t}><rect x={mx - MW / 2 - 24 * s} y={my + t * MH / 2 - 10 * s} width={MW + 48 * s} height={20 * s} rx={10 * s} fill="#6A4430" stroke={SEP} strokeWidth={1.2} /></g>)}
    <path d={`M${mx - 200 * s} ${my - MH / 2 - 10 * s} L${mx} ${my - MH / 2 - 90 * s} L${mx + 200 * s} ${my - MH / 2 - 10 * s}`} stroke={SEP} strokeWidth={1.4} fill="none" />
    {/* the lectern */}
    <ellipse cx={x} cy={Y(70)} rx={90 * s} ry={10 * s} fill={SEP} opacity={.35} filter="url(#b2s)" />
    <SR d={`M${X(-34)} ${Y(70)} L${X(-24)} ${Y(-60)} H${X(24)} L${X(34)} ${Y(70)}Z`} mat="wood" t={.55} draw={draw} sw={1.3} />
    <SR d={`M${X(-80)} ${Y(-60)} L${X(80)} ${Y(-60)} L${X(66)} ${Y(-96)} L${X(-66)} ${Y(-96)}Z`} mat="wood" t={.45} draw={draw} sw={1.3} />
    {/* tiered benches and the professors */}
    {[0, 1, 2].map(r => { const rowY = [Y(170), Y(340), Y(580)][r], k = [.62, .86, 1.18][r];
      return <g key={r}>
        <SR d={rect(-200, rowY - 6 * k, 2320, 120 * k)} mat="wood" t={.6 + r * .04} draw={draw} sw={1.2} hatch={0} ang={0} />
        {PROFS.map((p, i) => (p[1] > 500 ? 2 : p[1] > 300 ? 1 : 0) === r ?
          <Prof key={i} id={id + 'p' + i} X={X(p[0])} Y={Y(p[1])} k={p[2] * s} dir={p[3]} hair={p[4]} laugh={laugh} tm={tm} i={i} /> : null)}
        <SR d={rect(-200, rowY + 30 * k, 2320, 60 * k)} mat="wood" t={.72} draw={draw} sw={1.4} hatch={0} ang={0} /></g>; })}
    {/* steam of laughter */}
    {steam > 0 && PROFS.map((p, i) => { const hx = X(p[0]), hy = Y(p[1]) - 130 * p[2] * s, k = p[2] * s; return <g key={'st' + i} opacity={steam * .85}>
      {[0, 1, 2].map(j => { const ph = ((tm * .4 + j / 3 + i * .13) % 1); return <path key={j} d={`M${hx + (j - 1) * 14 * k} ${hy - ph * 160 * k} q${18 * k} ${-20 * k} 0 ${-40 * k} t0 ${-40 * k}`} stroke="#FFFFFF" strokeWidth={(7 - ph * 4) * k} fill="none" strokeLinecap="round" opacity={(1 - ph) * .8} />; })}</g>; })}
    {/* the bubbles: "impossible!" — then stone, stacking into a wall */}
    {bubbles > 0 && Array.from({ length: NB }, (_, i) => { const p = PROFS[bubOf(i)], k = p[2] * s, pop = outBack(stag(bubbles, i, NB, .35)); if (pop <= 0) return null;
      const side = p[3] === 0 ? (i % 2 ? 1 : -1) : p[3], hx = X(p[0]) + side * 90 * k + (i >= PROFS.length ? -side * 150 * k : 0), hy = Y(p[1]) - 190 * k - (i >= PROFS.length ? 60 * k : 0);
      const w = ease(stag(stone, i, NB, .45)), sl = slot(i), cx = lerp(hx, sl[0], w), cy = lerp(hy, sl[1], w), bw = lerp(150 * k, 316, w), bh = lerp(80 * k, 112 * s, w), sc = lerp(pop, 1, w);
      return <g key={'b' + i} transform={`translate(${cx} ${cy}) scale(${sc})`}>
        {w < .5 && <path d={`M${-side * 10 * k} ${bh * .4} L${-side * 40 * k} ${bh * .9} L${side * 14 * k} ${bh * .45}`} fill="#FBF8EE" stroke={SEP} strokeWidth={1.4} opacity={1 - w * 2} />}
        <path d={rr(-bw / 2, -bh / 2, bw, bh, lerp(bh / 2, 10 * s, w))} fill={mix('#FBF8EE', '#A39E86', w)} stroke={SEP} strokeWidth={1.6} />
        {w > 0 && <g opacity={w}><path d={rr(-bw / 2, -bh / 2, bw, bh, 10 * s)} fill="url(#h1_30)" opacity={.5} />
          <path d={`M${-bw * .3} ${-bh / 2} l${10 * s} ${30 * s} l${-14 * s} ${24 * s} M${bw * .2} ${bh / 2} l${-8 * s} ${-26 * s}`} stroke={SEP} strokeWidth={1.2} fill="none" />
          <path d={`M${-bw / 2 + 4} ${bh / 2 - 4} H${bw / 2 - 4}`} stroke="#4A4636" strokeWidth={5 * s} opacity={.5} /></g>}
        <Hand x={0} y={10 * k} s={34 * k * (1 + w * .3)} t="impossible!" a={1 - w * .85} col={w > .5 ? '#4A4636' : SEP} />
      </g>; })}
  </g>;
};

// ================================================================ 11. THE PANGAEA QUILT — Pangaea (Wegener's supercontinent: every continent joined, each one's modern
// outline visible as a patch) on a dark blue sea. stamp: PANGAEA stamps across it · cloth: each patch becomes a fabric (checks, florals, linen,
// stripes, dots) like a patchwork quilt · stitch: vermilion running stitches sew round the patches (progress) · open: the seam between South
// America and Africa opens — the stitches pop and an ocean (the Atlantic) widens as the Americas part toward their modern places.
const QUILT: Record<string, [string, string, string]> = {   // base colour, fabric pattern, thread-dark
  NAM: ['#C9A86A', 'check', '#8C5A36'], GRN: ['#E8EEF0', 'linen', '#9FB6C8'], EUR: ['#B9C27E', 'flower', '#5F8A5A'], SAM: ['#D2643E', 'flower', '#8C3424'],
  AFR: ['#E0B878', 'stripe', '#A8743E'], MAD: ['#D9AE6C', 'dots', '#8C5A36'], IND: ['#7FA8C4', 'check', '#2E5C86'], ANT: ['#F4F4EE', 'linen', '#B9C8D0'], AUS: ['#E9A86C', 'dots', '#B0602A'] };
const outlinePts = (pts: Pt[], step: N): Pt[] => { const o: Pt[] = []; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / step));
  for (let j = 0; j < n; j++) o.push([lerp(a[0], b[0], j / n), lerp(a[1], b[1], j / n)]); } return o; };
const QuiltPangaea: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, stamp = 0, cloth = 0, stitch = 0, open = 0, tm = 0 }) => {
  const id = 'qp' + Math.round(x), kk = 5.6 * s, cx = x - 10 * kk, cy = y - 2 * kk, op = ease(open);
  const OPEN: Record<string, [N, N, N]> = { SAM: [-62, 36, -14], NAM: [-82, -36, 2], GRN: [-50, -66, 4] };
  const tf = (k: string): [N, N, N] => { const g = PG[k], o = OPEN[k]; return o ? [lerp(g[0], o[0], op), lerp(g[1], o[1], op), lerp(g[2], o[2], op)] : g; };
  const pats = <defs>
    {Object.entries(QUILT).map(([k, [c, p, d]]) => <pattern key={k} id={id + k} width={p === 'stripe' ? 14 : 16} height={16} patternUnits="userSpaceOnUse" patternTransform={`rotate(${p === 'check' ? 0 : 20})`}>
      <rect width={16} height={16} fill={c} />
      {p === 'check' && <g><rect width={8} height={16} fill={d} opacity={.35} /><rect width={16} height={8} fill={d} opacity={.35} /></g>}
      {p === 'stripe' && <rect width={5} height={16} fill={d} opacity={.55} />}
      {p === 'dots' && <circle cx={8} cy={8} r={2.6} fill={d} opacity={.8} />}
      {p === 'linen' && <path d="M0 4 H16 M0 12 H16 M4 0 V16 M12 0 V16" stroke={d} strokeWidth={.8} opacity={.7} />}
      {p === 'flower' && <g>{[0, 72, 144, 216, 288].map(a => <circle key={a} cx={8 + Math.cos(a * D2R) * 3} cy={8 + Math.sin(a * D2R) * 3} r={2} fill="#FBF4E2" opacity={.8} />)}<circle cx={8} cy={8} r={1.4} fill="#E9B456" /></g>}
    </pattern>)}</defs>;
  return <g opacity={draw}>
    {pats}
    <rect x={-200} y={-200} width={2320} height={1480} fill="#22507A" />
    <rect x={-200} y={-200} width={2320} height={1480} fill="#0E2A48" opacity={.45} />
    {Array.from({ length: 70 }, (_, i) => <path key={i} d={`M-200 ${-180 + i * 22} ${Array.from({ length: 30 }, (_, j) => `q${40} ${(j % 2 ? 1 : -1) * 3} ${80} 0`).join(' ')}`} stroke="#9CCAD6" strokeWidth={.8} fill="none" opacity={.18} />)}
    {/* the new ocean in the opening seam */}
    {op > 0 && Array.from({ length: 16 }, (_, i) => { const u = i / 15, mxp = cx + lerp(-20, -38, op) * kk + Math.sin(u * 9) * 10 * kk * op, myp = cy + (-30 + u * 100) * kk;
      return <path key={'w' + i} d={`M${mxp - 30 * s} ${myp} q${15 * s} ${-8 * s} ${30 * s} 0 t${30 * s} 0`} stroke="#C9DDE6" strokeWidth={2} fill="none" opacity={op * .8} />; })}
    {PANG.map(k => { const [px, py, r] = tf(k), P = xf(shape(k), cx + px * kk, cy + py * kk, kk, r), d = sm(P), q = QUILT[k];
      const sts = outlinePts(P, 10 * s), nS = Math.floor(sts.length / 2), shown = Math.floor(stitch * nS);
      const seamSide = (pt: Pt) => k === 'SAM' ? pt[0] > cx + px * kk : k === 'AFR' ? pt[0] < cx + px * kk && pt[1] > cy - 20 * kk : (k === 'NAM' ? pt[1] > cy + py * kk : false);
      return <g key={k}>
        <path d={d} transform="translate(6 10)" fill="#0B1030" opacity={.5} filter="url(#b8)" />
        <path d={d} fill={q[0]} stroke={SEP} strokeWidth={1.6} />
        {cloth > 0 && <path d={d} fill={`url(#${id}${k})`} opacity={ease(stag(cloth, PANG.indexOf(k), PANG.length, .5))} />}
        <path d={sm(xf(shape(k), cx + px * kk - 2, cy + py * kk - 3, kk * .97, r))} fill="none" stroke="#FFF8E6" strokeWidth={3} opacity={.35} />
        <path d={d} fill="none" stroke={SEP} strokeWidth={8} opacity={.12} />
        {stitch > 0 && sts.map((a, j) => { if (j % 2 || j / 2 >= shown) return null; const b = sts[(j + 1) % sts.length], ins = [(cx + px * kk - a[0]) * .03, (cy + py * kk - a[1]) * .03];
          const pop = op > 0 && seamSide(a) ? ease(cl(op * 3 - rnd(j * 3.3 + PANG.indexOf(k)))) : 0, fx = pop * (rnd(j * 1.7) - .5) * 120 * s, fy = pop * (-40 - rnd(j * 2.3) * 80) * s;
          return <line key={j} x1={a[0] + ins[0] + fx} y1={a[1] + ins[1] + fy} x2={b[0] + ins[0] + fx + pop * 6} y2={b[1] + ins[1] + fy - pop * 4} stroke={VERM} strokeWidth={2.6 * s} strokeLinecap="round" opacity={1 - pop} />; })}
      </g>; })}
    {stamp > 0 && <g opacity={cl(stamp * 3) * .92} transform={`translate(${x} ${y + 20 * s}) rotate(-6) scale(${f1(lerp(1.6, 1, outBack(stamp)))})`}>
      <rect x={-470 * s} y={-92 * s} width={940 * s} height={170 * s} rx={10 * s} fill="none" stroke={VERM} strokeWidth={10 * s} />
      <Fell x={0} y={44 * s} s={150 * s} t="PANGAEA" col={VERM} sc />
      {Array.from({ length: 60 }, (_, j) => <circle key={j} cx={(rnd(j * 3.1) - .5) * 900 * s} cy={(rnd(j * 5.7) - .5) * 150 * s} r={(1.5 + rnd(j) * 4) * s} fill="#22507A" opacity={.55} />)}</g>}
  </g>;
};

// ================================================================ 12. MESOSAURUS — side view of the little Permian reptile (≈ 1 m, Senckenberg specimen P-02): a very
// long narrow snout bristling with needle-thin teeth, a long flexible body, a long DEEP tail for swimming, four small paddle feet (the hind ones
// bigger, webbed). 1 px = 1 mm at s = 1; (x, y) = the ground under its middle. walk: gait phase (loop it; 1 = one stride) · swim: 0 walking →
// 1 swimming (limbs fold back, the body undulates) · bones: it becomes a fossil skeleton in pale rock · splutter: it coughs (head jerks, drops).
const MESO_X = [-520, -440, -350, -260, -170, -90, 0, 90, 170, 230, 280, 330, 400, 470, 522];
const MESO_T: [N, N][] = [[2, 2], [12, 13], [22, 24], [27, 29], [29, 31], [31, 35], [33, 46], [32, 46], [28, 37], [16, 17], [15, 15], [14, 11], [6, 6], [4, 4], [1.6, 1.6]];
const MESO_Y = [34, 22, 12, 5, 1, 0, -2, -2, -1, -6, -10, -12, -11, -10, -9];   // the resting curve: tail drooping to the ground, the neck and head held up
const Mesosaurus: React.FC<any> = ({ x = 960, y = 760, s = .9, draw = 1, walk = 0, swim = 0, bones = 0, splutter = 0, tm = 0, id = 'meso', flip = 1 }) => {
  const sw = ease(swim), T = (p: Pt): Pt => [x + p[0] * s * flip, y + p[1] * s];
  const bob = -Math.abs(Math.sin(walk * Math.PI * 2)) * 4 * (1 - sw), base = lerp(-76, -140, sw);
  const jA = -16 * Math.sin(splutter * Math.PI * 7) * Math.sin(splutter * Math.PI);
  let sp: Pt[] = MESO_X.map((px, i) => { const u = i / (MESO_X.length - 1), tail = Math.pow(cl(1 - u / .45), 1.3);
    const wv = sw * 26 * Math.sin(tm * Math.PI * 2 * 1.1 - i * .7) * (tail + .15) + (1 - sw) * 5 * Math.sin(walk * Math.PI * 4 - i * .5) * tail;
    return [px, base + bob + wv + MESO_Y[i] * (1 - sw * .8)]; });
  const pivot = sp[9]; sp = sp.map((p, i) => i > 9 ? (() => { const q = rot([p[0] - pivot[0], p[1] - pivot[1]], jA * flip); return [pivot[0] + q[0], pivot[1] + q[1]] as Pt; })() : p);
  const J: Joint[] = sp.map((p, i) => ({ p: T(p), up: MESO_T[i][0] * s, dn: MESO_T[i][1] * s })); if (flip < 0) J.forEach(j => { const u = j.up; j.up = j.dn; j.dn = u; });
  // limbs: [root index, lengths, walking angles, swimming angles]
  const limb = (hind: boolean, p: N) => { const ri = hind ? 5 : 8, r = sp[ri], s1 = Math.sin(p * Math.PI * 2), lift = Math.max(0, Math.cos(p * Math.PI * 2));
    const L = hind ? [42, 34, 26] : [32, 28, 20];
    const wa = hind ? [-42 - 28 * s1, 78 + lift * 30, -110 - lift * 10] : [26 - 26 * s1, -60 - lift * 26, -40 + lift * 10];
    const sa = hind ? [74, 12, 6] : [70, 14, 6];
    const A = wa.map((a, i) => lerp(a, sa[i], sw));
    return fk([r[0], r[1] + 14], 90, [[L[0], A[0]], [L[1], A[1]], [L[2], A[2]]]); };
  const ph = walk;
  const LG: [boolean, N, boolean][] = [[true, ph + .5, false], [false, ph, false], [true, ph, true], [false, ph + .5, true]];
  const paddle = (P: Pt[], hind: boolean, near: boolean, k: string) => { const a = P[2], b = P[3], ang = Math.atan2(b[1] - a[1], b[0] - a[0]), len = (hind ? 34 : 24);
    const toes = [-.5, -.25, 0, .25, .5].map(o => [a[0] + Math.cos(ang + o) * len, a[1] + Math.sin(ang + o) * len] as Pt);
    const tw = toes.map(T), aw = T(a); return <g key={k}><path d={`M${aw.join(' ')} ${tw.map(q => `L${f1(q[0])} ${f1(q[1])}`).join(' ')}Z`} fill={near ? '#7E7A52' : '#5E5A3E'} stroke={SEP} strokeWidth={1} opacity={.95} />
      {tw.map((q, j) => <path key={j} d={`M${aw.join(' ')} L${f1(q[0])} ${f1(q[1])}`} stroke={SEP} strokeWidth={.9} />)}</g>; };
  const legJ = (P: Pt[], hind: boolean): Joint[] => P.slice(0, 3).map((p, i) => ({ p: T(p), up: ((hind ? [13, 9, 6] : [10, 7, 5])[i]) * s, dn: ((hind ? [13, 9, 6] : [10, 7, 5])[i]) * s }));
  const col = '#8C8A62', tip = T(sp[14]);
  const teeth = Array.from({ length: 30 }, (_, i) => { const u = i / 29, px = lerp(sp[11][0] - 10, sp[14][0] - 4, u), j = Math.min(13, 11 + Math.floor(u * 3)), t2 = (px - sp[j][0]) / (sp[j + 1][0] - sp[j][0]), cy = lerp(sp[j][1], sp[j + 1][1], t2) + 1;
    const a = T([px, cy - 3]), b = T([px + 3, cy + 11]), c = T([px - 2, cy + 3]), d = T([px + 1, cy - 12]);
    return <g key={i}><path d={`M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}`} stroke="#FBF4E2" strokeWidth={1.6 * s} /><path d={`M${f1(c[0])} ${f1(c[1])} L${f1(d[0])} ${f1(d[1])}`} stroke="#FBF4E2" strokeWidth={1.4 * s} />
      <path d={`M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])} M${f1(c[0])} ${f1(c[1])} L${f1(d[0])} ${f1(d[1])}`} stroke={SEP} strokeWidth={.45} /></g>; });
  const flesh = 1 - ease(bones);
  return <g opacity={draw}>
    {bones > 0 && <g opacity={ease(bones * 1.5)}>
      <path d={sm([T([-600, -230]), T([-200, -270]), T([200, -250]), T([600, -230]), T([620, 30]), T([200, 60]), T([-300, 50]), T([-620, 30])])} fill="#D9CDB0" stroke={SEP} strokeWidth={2} />
      <Stipple x={x - 620 * s} y={y - 270 * s} w={1240 * s} h={330 * s} n={900} seed={id + 'rk'} col="#8C6E4A" a={.35} />
      {[[-500, -200, 300], [100, 20, 260], [-200, 30, 200]].map(([a, b, w], i) => <path key={i} d={`M${T([a, b]).join(' ')} l${w * s * flip} ${8 * s}`} stroke={SEP} strokeWidth={1} opacity={.4} />)}
      {/* the skeleton: vertebrae and their spines, thick ribs, skull, limbs */}
      {Array.from({ length: 56 }, (_, i) => { const u = i / 55, f = u * (sp.length - 1), j = Math.min(sp.length - 2, Math.floor(f)), t2 = f - j, p = T([lerp(sp[j][0], sp[j + 1][0], t2), lerp(sp[j][1], sp[j + 1][1], t2)]), r = lerp(MESO_T[j][0], MESO_T[j + 1][0], t2) * s;
        if (u > .78) return null; return <g key={i}><rect x={p[0] - 4.5 * s} y={p[1] - 3.5 * s} width={9 * s} height={7 * s} rx={2 * s} fill="#F3E7CC" stroke={SEP} strokeWidth={.8} />
          <path d={`M${p[0]} ${p[1] - 3 * s} l${-3 * s * flip} ${-r * .55}`} stroke={SEP} strokeWidth={1.2} />{u < .4 && <path d={`M${p[0]} ${p[1] + 3 * s} l${-3 * s * flip} ${r * .55}`} stroke={SEP} strokeWidth={1.1} />}</g>; })}
      {Array.from({ length: 16 }, (_, i) => { const px = lerp(-80, 165, i / 15), j = px < 0 ? 5 : px < 90 ? 6 : 7, t2 = (px - sp[j][0]) / (sp[j + 1][0] - sp[j][0]), py = lerp(sp[j][1], sp[j + 1][1], t2), a = T([px, py]), b = T([px - 14, py + 38]);
        return <path key={'r' + i} d={`M${f1(a[0])} ${f1(a[1])} Q${f1(a[0] + 8 * s * flip)} ${f1(a[1] + 22 * s)} ${f1(b[0])} ${f1(b[1])}`} stroke="#F3E7CC" strokeWidth={6 * s} fill="none" strokeLinecap="round" />; })}
      {Array.from({ length: 16 }, (_, i) => { const px = lerp(-80, 165, i / 15), j = px < 0 ? 5 : px < 90 ? 6 : 7, t2 = (px - sp[j][0]) / (sp[j + 1][0] - sp[j][0]), py = lerp(sp[j][1], sp[j + 1][1], t2), a = T([px, py]), b = T([px - 14, py + 38]);
        return <path key={'ro' + i} d={`M${f1(a[0])} ${f1(a[1])} Q${f1(a[0] + 8 * s * flip)} ${f1(a[1] + 22 * s)} ${f1(b[0])} ${f1(b[1])}`} stroke={SEP} strokeWidth={1} fill="none" />; })}
      <path d={sm([T([sp[10][0] - 10, sp[10][1] - 16]), T([sp[11][0], sp[11][1] - 15]), T([sp[12][0], sp[12][1] - 6]), T([sp[14][0], sp[14][1]]), T([sp[12][0], sp[12][1] + 6]), T([sp[11][0], sp[11][1] + 11]), T([sp[10][0] - 10, sp[10][1] + 14])])} fill="#F3E7CC" stroke={SEP} strokeWidth={1.3} />
      <circle cx={T(sp[11])[0] - 4 * s * flip} cy={T(sp[11])[1] - 5 * s} r={6 * s} fill="#8C6E4A" stroke={SEP} strokeWidth={1} />
      {teeth}
      {LG.map(([h, p], i) => { const P = limb(h, p).map(T); return <g key={'lb' + i} opacity={i < 2 ? .7 : 1}>{[0, 1, 2].map(j => <path key={j} d={`M${f1(P[j][0])} ${f1(P[j][1])} L${f1(P[j + 1][0])} ${f1(P[j + 1][1])}`} stroke="#F3E7CC" strokeWidth={(h ? 7 : 5.5) * s} strokeLinecap="round" />)}
        {[0, 1, 2].map(j => <path key={'o' + j} d={`M${f1(P[j][0])} ${f1(P[j][1])} L${f1(P[j + 1][0])} ${f1(P[j + 1][1])}`} stroke={SEP} strokeWidth={.8} />)}</g>; })}
    </g>}
    {flesh > 0 && <g opacity={flesh}>
      {bones <= 0 && swim < .5 && <Floor x={x} y={y + 2 * s} rx={420 * s} ry={14 * s} a={.3 * (1 - sw * 2)} />}
      {LG.slice(0, 2).map(([h, p], i) => { const P = limb(h, p); return <g key={'f' + i}><Skin id={id + 'lf' + i} J={legJ(P, h)} col={mix(col, '#2B1D12', .3)} hatch={.5} sw={1} per={5} rim={0} />{paddle(P, h, false, 'pf' + i)}</g>; })}
      <Skin id={id + 'b'} J={J} col={col} hatch={.7} sw={1.8} scales={1} per={6} />
      <path d={sm(sp.slice(10).map((p, i) => T([p[0], p[1] + (i === 0 ? 6 : 1)])), false)} stroke={SEP} strokeWidth={1.2} fill="none" />
      {teeth}
      <circle cx={T(sp[11])[0] - 4 * s * flip} cy={T(sp[11])[1] - 6 * s} r={5 * s} fill="#E9B456" stroke={SEP} strokeWidth={1} /><circle cx={T(sp[11])[0] - 3 * s * flip} cy={T(sp[11])[1] - 6 * s} r={2.6 * s} fill="#1A120B" />
      <circle cx={T(sp[11])[0] - 1.5 * s * flip} cy={T(sp[11])[1] - 7.5 * s} r={1 * s} fill="#FFFDF4" />
      <ellipse cx={T(sp[11])[0] + 18 * s * flip} cy={T(sp[11])[1] - 9 * s} rx={3 * s} ry={1.6 * s} fill={SEP} />
      {LG.slice(2).map(([h, p], i) => { const P = limb(h, p); return <g key={'n' + i}><Skin id={id + 'ln' + i} J={legJ(P, h)} col={col} hatch={.5} sw={1.2} per={5} />{paddle(P, h, true, 'pn' + i)}</g>; })}
    </g>}
    {splutter > 0 && splutter < 1 && <g>{Array.from({ length: 12 }, (_, i) => { const t = cl(splutter * 1.3 - rnd(i * 2.1) * .3), vx = (40 + rnd(i * 3.7) * 220) * flip, vy = -(60 + rnd(i * 5.3) * 200);
      const px = tip[0] + vx * t * s, py = tip[1] + (vy * t + 380 * t * t) * s; return t > 0 ? <ellipse key={i} cx={px} cy={py} rx={(4 + rnd(i) * 4) * s} ry={(6 + rnd(i) * 4) * s} fill="#8FC1CF" stroke={SEP} strokeWidth={.8} opacity={Math.sin(t * Math.PI)} /> : null; })}
      {[0, 1, 2].map(j => <path key={'c' + j} d={`M${tip[0] + (14 + j * 10) * s * flip} ${tip[1] - (10 - j * 10) * s} l${18 * s * flip} ${(j - 1) * 8 * s}`} stroke={SEP} strokeWidth={1.6} opacity={Math.sin(splutter * Math.PI)} />)}</g>}
  </g>;
};

// ================================================================ 13. THE FOSSIL MAP — today's world in old-atlas style, on the southern continents (South America,
// Africa, India, Australia, and Antarctica seen obliquely below). pins: two Mesosaurus pins land in Brazil and South Africa · grey: the rest of the
// map greys out · waves: waves roll across the Atlantic · close: Africa slides west, the Atlantic closes and the two pins meet in one lake ·
// leaves 0..4: tongue-shaped Glossopteris leaves land on South America, Africa, India, Australia · ant: a fifth leaf lands on Antarctica.
const FossilMap: React.FC<any> = ({ x = 960, y = 470, s = 1, draw = 1, pins = 0, grey = 0, waves = 0, close = 0, leaves = 0, ant = 0, tm = 0 }) => {
  const id = 'fm' + Math.round(x), kk = 6.4 * s, lon0 = 30, lat0 = -18, P = (k: string) => wpos(k, x, y, kk, lon0, lat0);
  const pc = (lo: N, la: N): Pt => [x + (lo - lon0) * kk, y - (la - lat0) * kk];
  const sa = P('SAM'), af = P('AFR'), cw = ease(close), fit = fitTo('AFR'), afT: Pt = [lerp(af[0], sa[0] + fit[0] * kk, cw), lerp(af[1], sa[1] + fit[1] * kk, cw)], afR = fit[2] * cw;
  // anything riding on Africa (Madagascar, the pin, the leaf) moves with it
  const onAf = (p: Pt): Pt => { const q = rot([p[0] - af[0], p[1] - af[1]], afR); return [afT[0] + q[0], afT[1] + q[1]]; };
  const ant0: Pt = [x + (10 - lon0) * kk, y + 380 * s], gcol = '#9A988C';
  const gm = (c: string, k: string) => (k === 'SAM' || k === 'AFR' || k === 'MAD') ? c : mix(c, gcol, grey * .85);
  const pinB = pc(-49, -24), pinS = onAf(pc(24, -31));
  const leafT: [Pt, N][] = [[pc(-58, -12), -30], [onAf(pc(24, -12)), 20], [pc(78, 21), -50], [pc(134, -24), 40], [[ant0[0] + 30 * s, ant0[1] - 10 * s], -10]];
  const mapW = 1780 * s, mapH = 1000 * s, mx0 = x - mapW / 2, my0 = y - 440 * s;
  return <g opacity={draw}>
    <rect x={-200} y={-200} width={2320} height={1480} fill="#4F3020" />
    <rect x={mx0} y={my0} width={mapW} height={mapH} fill="#EFE0C2" stroke={SEP} strokeWidth={2} />
    <defs><clipPath id={id + 'c'}><rect x={mx0 + 24 * s} y={my0 + 24 * s} width={mapW - 48 * s} height={mapH - 48 * s} /></clipPath>
      <mask id={id + 'g'}><rect x={-200} y={-200} width={2320} height={1480} fill="#fff" />
        <path d={cpath('SAM', sa[0], sa[1], kk, 0, 0)} fill="#000" /><path d={cpath('AFR', afT[0], afT[1], kk, afR, 0)} fill="#000" />
        <rect x={sa[0] + 10 * kk} y={y - 30 * kk} width={Math.max(0, afT[0] - sa[0] - 20 * kk)} height={58 * kk} fill="#000" /></mask></defs>
    <g clipPath={`url(#${id}c)`}>
      <Ruled x={mx0} y={my0} w={mapW} h={mapH} col="#BFD6D8" gap={6 * s} a={.18} />
      {[-60, -30, 0, 30, 60, 90, 120, 150].map(lo => <line key={lo} x1={pc(lo, 0)[0]} y1={my0} x2={pc(lo, 0)[0]} y2={my0 + mapH} stroke={SEP} strokeWidth={.6} strokeDasharray="5 5" opacity={.3} />)}
      {[30, 0, -30, -60].map(la => <line key={la} x1={mx0} y1={pc(0, la)[1]} x2={mx0 + mapW} y2={pc(0, la)[1]} stroke={SEP} strokeWidth={la === 0 ? 1.1 : .6} strokeDasharray={la ? '5 5' : undefined} opacity={.3} />)}
      {['NAM', 'EUR', 'IND', 'AUS', 'GRN', 'NZL', 'JPN'].map(k => { const p = P(k); return <g key={k}><Ripples d={cpath(k, p[0], p[1], kk, 0, 0)} a={.4 * (1 - grey * .7)} /><path d={cpath(k, p[0], p[1], kk, 0, 0)} fill={gm(k === 'IND' ? '#E0A878' : k === 'AUS' ? '#E9A86C' : '#D9C49A', k)} stroke={SEP} strokeWidth={1.4} /></g>; })}
      <g><Ripples d={cpath('ANT', ant0[0], ant0[1], kk, 0, 0)} a={.4} /><path d={cpath('ANT', ant0[0], ant0[1], kk, 0, 0)} fill={gm('#F4F4EE', 'ANT')} stroke={SEP} strokeWidth={1.4} />
        <path d={cpath('ANT', ant0[0], ant0[1] - 5 * s, kk * .9, 0, 0)} fill="none" stroke="#B9C8D0" strokeWidth={2} opacity={.7} /></g>
      <Ripples d={cpath('SAM', sa[0], sa[1], kk, 0, 0)} /><SR d={cpath('SAM', sa[0], sa[1], kk, 0, 0)} mat="land" t={.3} draw={draw} sw={1.8} />
      {(() => { const m = P('MAD'), mm = onAf(m); return <path d={cpath('MAD', mm[0], mm[1], kk, afR, 0)} fill="#D9AE6C" stroke={SEP} strokeWidth={1.3} />; })()}
      <Ripples d={cpath('AFR', afT[0], afT[1], kk, afR, 0)} /><SR d={cpath('AFR', afT[0], afT[1], kk, afR, 0)} mat="desert" t={.3} draw={draw} sw={1.8} />
      {/* waves rolling across the Atlantic */}
      {waves > 0 && Array.from({ length: 18 }, (_, i) => { const r0 = rnd(i * 2.7), yy = y + (-20 + r0 * 50) * kk * .9, xx = lerp(sa[0] + 22 * kk, af[0] - 12 * kk, ((rnd(i * 5.1) + waves * 1.5 + tm * .05) % 1));
        return <path key={i} d={`M${xx - 16 * s} ${yy} q${8 * s} ${-9 * s} ${16 * s} 0 t${16 * s} 0`} stroke="#22507A" strokeWidth={2 * s} fill="none" opacity={cl(waves * 4) * (1 - cw) * .8} />; })}
      {grey > 0 && <rect x={-200} y={-200} width={2320} height={1480} fill={gcol} opacity={grey * .45} mask={`url(#${id}g)`} />}
      {/* the lake where the pins meet */}
      {cw > .75 && <g opacity={cl((cw - .75) * 4)}><ellipse cx={(pinB[0] + pinS[0]) / 2} cy={(pinB[1] + pinS[1]) / 2 + 6 * s} rx={Math.max(40 * s, Math.abs(pinS[0] - pinB[0]) / 2 + 50 * s)} ry={36 * s} fill="#8FC1CF" stroke={SEP} strokeWidth={1.4} opacity={.9} />
        {[0, 1, 2].map(j => <path key={j} d={`M${(pinB[0] + pinS[0]) / 2 - 40 * s + j * 30 * s} ${(pinB[1] + pinS[1]) / 2 + (j % 2 ? 14 : 0) * s} q${8 * s} ${-6 * s} ${16 * s} 0`} stroke="#22507A" strokeWidth={1.4} fill="none" />)}</g>}
      {/* the leaves */}
      {[0, 1, 2, 3, 4].map(i => { const v = i < 4 ? cl(leaves - i) : cl(ant); if (v <= 0) return null; const [pt, a] = leafT[i], fall = 1 - ease(v);
        return <g key={'lv' + i} opacity={cl(v * 4)}><ellipse cx={pt[0] + 34 * s} cy={pt[1] + 6 * s} rx={34 * s * (1 - fall)} ry={8 * s} fill={SEP} opacity={.25} filter="url(#b2s)" />
          <GlossLeaf x={pt[0] - 10 * s + fall * 80 * s} y={pt[1] - fall * 260 * s} L={84 * s} a={a + fall * 160} col="#5F8A5A" /></g>; })}
      {/* the pins */}
      {[pinB, pinS].map((p, i) => { const v = cl(pins * 2 - i); if (v <= 0) return null; const dy = (1 - outBack(v)) * -160 * s;
        return <g key={'pin' + i} transform={`translate(0 ${dy})`} opacity={cl(v * 4)}>
          <line x1={p[0]} y1={p[1]} x2={p[0]} y2={p[1] - 54 * s} stroke="#4A4636" strokeWidth={2.4 * s} /><ellipse cx={p[0]} cy={p[1]} rx={7 * s} ry={3 * s} fill={SEP} opacity={.4} />
          <circle cx={p[0]} cy={p[1] - 84 * s} r={34 * s} fill="#FBF4E2" stroke={VERM} strokeWidth={5 * s} /><BoneGlyph x={p[0]} y={p[1] - 84 * s} r={26 * s} /></g>; })}
    </g>
    <rect x={mx0 + 12 * s} y={my0 + 12 * s} width={mapW - 24 * s} height={mapH - 24 * s} fill="none" stroke={SEP} strokeWidth={1.2} />
    <Stipple x={mx0} y={my0} w={mapW} h={mapH} n={600} seed="fmfox" col="#8C5A36" a={.2} />
  </g>;
};

// ================================================================ 14. GLOSSOPTERIS — the Permian "tongue-leaf" plant: a small woody stem, tongue-shaped leaves (long
// ovals, a strong midrib, fine net veins) in whorls. unfurl: the leaves open out · blow: the leaves come off and fly away to the right.
const GlossPlant: React.FC<{ X: N; Y: N; k: N; unfurl: N; blow?: N; tm?: N; col?: string; vein?: string; frost?: N; id: string }> = ({ X, Y, k, unfurl, blow = 0, tm = 0, col = '#5F8A5A', vein = '#2F5440', frost = 0, id }) => {
  const sway = Math.sin(tm * 1.3) * 2 + blow * 6, top: Pt = [X + sway * k * 3, Y - 300 * k];
  const br: [Pt, Pt][] = [[[X + 2 * k, Y - 170 * k], [X - 110 * k + sway * 2 * k, Y - 250 * k]], [[X + 4 * k, Y - 210 * k], [X + 120 * k + sway * 2 * k, Y - 270 * k]]];
  const anchors: [Pt, N][] = [...Array.from({ length: 9 }, (_, i) => [top, -170 + i * 20] as [Pt, N]), ...br.flatMap(([, e], j) => [-1, 0, 1].map(q => [e, (j ? -40 : -140) + q * 28] as [Pt, N]))];
  const u = ease(unfurl), c = mix(col, '#DCEAF0', frost * .7), v = mix(vein, '#9FB6C8', frost * .6);
  return <g>
    <path d={`M${X - 12 * k} ${Y} Q${X - 6 * k} ${Y - 150 * k} ${top[0] - 3 * k} ${top[1]} L${top[0] + 3 * k} ${top[1]} Q${X + 8 * k} ${Y - 150 * k} ${X + 12 * k} ${Y}Z`} fill="#6A4430" stroke={SEP} strokeWidth={1.3} />
    {br.map(([a, b], j) => <path key={j} d={`M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2} ${a[1] - 40 * k} ${b[0]} ${b[1]}`} stroke="#6A4430" strokeWidth={6 * k} fill="none" strokeLinecap="round" />)}
    {[0, 1, 2, 3].map(j => <path key={'b' + j} d={`M${X - 9 * k} ${Y - 30 * k - j * 40 * k} q${9 * k} ${6 * k} ${18 * k} 0`} stroke={SEP} strokeWidth={.8} fill="none" opacity={.6} />)}
    {anchors.map(([p, a], i) => { const f = cl((blow - i / anchors.length * .6) / .4), L = 150 * k * (.35 + .65 * u) * (i < 9 ? 1 : .8), ang = lerp(-90 + (a + 90) * .15, a, u) + Math.sin(tm * 2 + i) * 2 * u;
      const bx = p[0] + f * 1500 * k + Math.sin(f * 9 + i) * 40 * k, by = p[1] - f * 260 * k + f * f * 200 * k;
      return <GlossLeaf key={i} x={bx} y={by} L={L} a={ang + f * 600 * (i % 2 ? 1 : -1)} col={c} vein={v} fold={1 - u} draw={1 - cl((f - .8) * 5)} />; })}
    {frost > 0 && <Stipple x={X - 260 * k} y={Y - 480 * k} w={520 * k} h={420 * k} n={500} seed={id + 'fr'} col="#FFFFFF" a={frost * .8} r0={1} />}
  </g>;
};
const Fern: React.FC<any> = ({ x = 960, y = 860, s = 1.4, draw = 1, unfurl = 1, blow = 0, tm = 0 }) =>
  <g opacity={draw}>
    <ellipse cx={x} cy={y + 6 * s} rx={180 * s} ry={22 * s} fill="#6A4430" opacity={.5} filter="url(#b8)" />
    <SR d={`M${x - 200 * s} ${y + 10 * s} Q${x} ${y - 30 * s} ${x + 200 * s} ${y + 10 * s}Z`} mat="wood" t={.7} draw={draw} sw={1.2} />
    <GlossPlant id={'gp' + Math.round(x)} X={x} Y={y} k={s} unfurl={unfurl} blow={blow} tm={tm} />
  </g>;

// ================================================================ 15. THE FERN IN THE ICE — Antarctica: snow, blue ice cliffs, a rock with a fossil Glossopteris leaf.
// snow: snow falls and buries the leaf · freeze: the leaf seen frozen inside a clear blue block of ice · freezer: a white refrigerator, its
// door swinging open, a frosted Glossopteris inside and a puff of frost · thaw: a warm sun rises at right, the frost melts, the fern unfolds green.
const FernIce: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, snow = 0, freeze = 0, freezer = 0, thaw = 0, tm = 0 }) => {
  const id = 'fi' + Math.round(x), hz = y - 80 * s, gy = y + 260 * s, th = ease(thaw), fz = ease(freezer), X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  const flakes = useMemo(() => Array.from({ length: 160 }, (_, i) => ({ x: rnd(i * 1.9) * 2300 - 200, y: rnd(i * 3.7) * 1300, r: 1.5 + rnd(i * 5.1) * 3, v: .5 + rnd(i * 7.3) * .8 })), []);
  const sunY = lerp(hz + 140 * s, hz - 260 * s, th), leafC = mix('#4A4636', '#5F8A5A', th);
  const rockD = `M${X(-260)} ${gy} C${X(-280)} ${Y(170)} ${X(-200)} ${Y(120)} ${X(-60)} ${Y(116)} C${X(80)} ${Y(110)} ${X(240)} ${Y(130)} ${X(270)} ${gy}Z`;
  const ang = fz * 112, dc = Math.cos(ang * D2R), FW = 300 * s, FH = 560 * s, fx0 = X(-150), fy0 = Y(-300);
  return <g opacity={draw}>
    <defs><linearGradient id={id + 'sk'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={mix('#A9C3D3', '#E8B07A', th * .6)} /><stop offset="1" stopColor={mix('#E8EEF0', '#F6D9A8', th * .8)} /></linearGradient></defs>
    <rect x={-200} y={-200} width={2320} height={hz + 210} fill={`url(#${id}sk)`} />
    {thaw > 0 && <g><circle cx={X(620)} cy={sunY} r={300 * s} fill="url(#glowG)" opacity={th} /><circle cx={X(620)} cy={sunY} r={70 * s} fill="#F6CF7A" stroke="#E89A3E" strokeWidth={2} opacity={th} /></g>}
    {[[-1100, -420, 140], [-460, 120, 90], [380, 1100, 120]].map(([a, b, h], i) => <path key={i} d={`M${X(a)} ${hz} L${X(a + 40)} ${hz - h * s} ${Array.from({ length: 6 }, (_, j) => `L${f1(X(lerp(a + 40, b - 40, (j + 1) / 7)))} ${f1(hz - (h - 20 + rnd(i * 7 + j) * 30) * s)}`).join(' ')} L${X(b - 40)} ${hz - h * s} L${X(b)} ${hz}Z`}
      fill={mix('#D6E6EE', '#C9B49A', th * .5)} stroke="#7FA8C4" strokeWidth={1.2} />)}
    <rect x={-200} y={hz} width={2320} height={1300 - hz} fill={mix('#FFFFFF', '#B9AE8A', th * .55)} />
    {th > 0 && Array.from({ length: 18 }, (_, i) => <ellipse key={i} cx={-100 + rnd(i * 4.4) * 2100} cy={hz + 60 + rnd(i * 6.1) * 600} rx={(40 + rnd(i) * 90) * th} ry={(8 + rnd(i + 1) * 10) * th} fill="#7FA8C4" opacity={.45} />)}
    {Array.from({ length: 30 }, (_, i) => <path key={'sd' + i} d={`M${-150 + rnd(i * 2.1) * 2200} ${hz + 40 + rnd(i * 3.3) * 700} q40 -8 90 0`} stroke="#9FB6C8" strokeWidth={1.4} fill="none" opacity={.5 * (1 - th)} />)}
    {/* the rock with the fossil leaf (or the living sprig after the thaw) */}
    <g opacity={1 - fz}>
      <Floor x={x} y={gy + 4 * s} rx={280 * s} ry={14 * s} a={.3} />
      <SR d={rockD} mat="regolith" t={.55} ang={30} draw={draw} sw={1.8} />
      <GlossLeaf x={X(-150)} y={Y(190)} L={300 * s} a={-8} col={leafC} vein={mix('#2B2A20', '#2F5440', th)} draw={1} />
      {thaw > 0 && <GlossPlant id={id + 'gp'} X={X(140)} Y={gy - 6 * s} k={.8 * s * (.3 + .7 * th)} unfurl={th} frost={1 - th} tm={tm} />}
      {snow > 0 && <path d={`M${X(-300)} ${gy + 4 * s} C${X(-280)} ${gy - 140 * s * snow} ${X(-100)} ${gy - 190 * s * snow} ${X(20)} ${gy - 180 * s * snow} C${X(160)} ${gy - 170 * s * snow} ${X(290)} ${gy - 120 * s * snow} ${X(320)} ${gy + 4 * s}Z`}
        fill="#FFFFFF" stroke="#B9C8D0" strokeWidth={1.4} opacity={cl(snow * 2) * (1 - th)} />}
    </g>
    {/* the ice block */}
    {freeze > 0 && <g opacity={cl(freeze * 2) * (1 - th) * (1 - fz)} transform={`translate(${x} ${Y(120)}) scale(${lerp(.9, 1, ease(freeze))}) translate(${-x} ${-Y(120)})`}>
      <path d={`M${X(-230)} ${Y(-60)} L${X(-170)} ${Y(-120)} H${X(290)} L${X(230)} ${Y(-60)}Z`} fill="#E8F4F8" fillOpacity={.8} stroke="#5E8AA8" strokeWidth={1.6} />
      <path d={`M${X(230)} ${Y(-60)} L${X(290)} ${Y(-120)} V${Y(200)} L${X(230)} ${Y(260)}Z`} fill="#9FC4D8" fillOpacity={.75} stroke="#5E8AA8" strokeWidth={1.6} />
      <rect x={X(-230)} y={Y(-60)} width={460 * s} height={320 * s} fill="#C6E2EE" fillOpacity={.55} stroke="#5E8AA8" strokeWidth={1.8} />
      <GlossLeaf x={X(-170)} y={Y(110)} L={330 * s} a={-14} col="#5F7A5A" vein="#2F5440" />
      <rect x={X(-230)} y={Y(-60)} width={460 * s} height={320 * s} fill="#DCEFF6" opacity={.35} />
      <path d={`M${X(-200)} ${Y(-30)} L${X(-120)} ${Y(-40)} M${X(-200)} ${Y(-10)} L${X(-60)} ${Y(-30)} M${X(120)} ${Y(200)} l${60 * s} ${-80 * s} l${30 * s} ${10 * s}`} stroke="#FFFFFF" strokeWidth={4 * s} opacity={.8} />
      <path d={`M${X(-60)} ${Y(260)} l${40 * s} ${-90 * s} l${-20 * s} ${-60 * s}`} stroke="#5E8AA8" strokeWidth={1} fill="none" /></g>}
    {/* the refrigerator */}
    {freezer > 0 && <g opacity={cl(freezer * 4)}>
      <ellipse cx={X(0)} cy={fy0 + FH + 6 * s} rx={220 * s} ry={18 * s} fill={SEP} opacity={.35} filter="url(#b8)" />
      <path d={rr(fx0 - 10 * s, fy0 - 10 * s, FW + 20 * s, FH + 20 * s, 40 * s)} fill="#E6E2D6" stroke={SEP} strokeWidth={1.8} />
      <rect x={fx0 + 14 * s} y={fy0 + 14 * s} width={FW - 28 * s} height={FH - 28 * s} rx={20 * s} fill={mix('#CFE3EC', '#E4F0E4', th)} stroke={SEP} strokeWidth={1.4} />
      {[.36, .68].map(v => <line key={v} x1={fx0 + 16 * s} y1={fy0 + FH * v} x2={fx0 + FW - 16 * s} y2={fy0 + FH * v} stroke="#9FB6C8" strokeWidth={4 * s} />)}
      <SR d={rect(fx0 + 50 * s, fy0 + 24 * s, FW - 100 * s, 90 * s)} mat="ice" t={.6} draw={draw} sw={1.4} hatch={0} />
      {[0, 1, 2].map(j => <rect key={j} x={fx0 + (64 + j * 62) * s} y={fy0 + 40 * s} width={48 * s} height={56 * s} fill="#E8F4F8" stroke="#9FB6C8" strokeWidth={1} />)}
      {[fx0 + 10 * s, fx0 + FW - 40 * s].map((fx, j) => <rect key={'ft' + j} x={fx} y={fy0 + FH + 8 * s} width={30 * s} height={16 * s} fill="#2B1D12" />)}
      <Stipple x={fx0 + 14 * s} y={fy0 + 14 * s} w={FW - 28 * s} h={60 * s} n={160} seed={id + 'ff'} col="#FFFFFF" a={(1 - th) * .9} r0={1.4} />
      <defs><clipPath id={id + 'in'}><rect x={fx0 + 14 * s} y={fy0 + 14 * s} width={FW - 28 * s} height={FH - 28 * s} rx={20 * s} /></clipPath></defs>
      <g clipPath={`url(#${id}in)`}><GlossPlant id={id + 'gq'} X={fx0 + FW / 2} Y={fy0 + FH * .68 - 4 * s} k={.6 * s} unfurl={.7 + th * .3} frost={1 - th} tm={tm} /></g>
      {/* the door on its left hinge, swinging toward us */}
      {(() => { const w = FW * dc, sk = Math.sin(ang * D2R) * 34 * s, hx = fx0, ex = hx + w;
        return <g><path d={`M${hx} ${fy0} L${ex} ${fy0 - sk * .6} L${ex} ${fy0 + FH + sk * .6} L${hx} ${fy0 + FH}Z`} fill={dc > 0 ? '#F4F1EA' : '#DCD8CA'} stroke={SEP} strokeWidth={1.8} />
          {dc > 0 ? <g><rect x={hx + w * .8} y={fy0 + FH * .3} width={Math.max(3, 22 * s * dc)} height={110 * s} rx={8 * s} fill="#C9CDCD" stroke={SEP} strokeWidth={1.4} />
            {[0, 1, 2, 3, 4].map(j => <line key={j} x1={hx + w * .2} y1={fy0 + FH - 50 * s + j * 8 * s} x2={hx + w * .8} y2={fy0 + FH - 50 * s + j * 8 * s} stroke={SEP} strokeWidth={2} opacity={.5} />)}
            <path d={`M${hx + w * .08} ${fy0 + 40 * s} V${fy0 + FH - 40 * s}`} stroke="#FFFFFF" strokeWidth={8 * s * dc} opacity={.7} /></g>
            : <g>{[.2, .45, .7].map(v => <g key={v}><line x1={hx} y1={fy0 + FH * v} x2={ex} y2={fy0 + FH * v - sk * .3} stroke="#9FB6C8" strokeWidth={5 * s} />
              {[.25, .55].map(u => <rect key={u} x={lerp(hx, ex, u) - 9 * s} y={fy0 + FH * v - 50 * s - sk * .3 * u} width={18 * s} height={48 * s} rx={4 * s} fill={u > .4 ? '#F3E7CC' : '#A9C08A'} stroke={SEP} strokeWidth={1} />)}</g>)}</g>}</g>; })()}
      {/* frost puffing out */}
      {freezer > .3 && Array.from({ length: 14 }, (_, i) => { const t = cl((freezer - .3) / .7), a = -.6 + rnd(i * 2.7) * 1.4, R = (60 + rnd(i * 3.9) * 260) * t * s;
        return <circle key={i} cx={fx0 + FW * .6 + Math.cos(a) * R + 80 * s * t} cy={fy0 + FH * .5 + Math.sin(a) * R * .6 + 60 * s * t} r={(30 + rnd(i) * 40) * s * (.4 + t)} fill="#FFFFFF" opacity={(1 - t * .6) * .85 * (1 - th)} filter="url(#b8)" />; })}
    </g>}
    {/* falling snow */}
    {snow > 0 && flakes.map((f, i) => { const yy = (f.y + tm * 120 * f.v + snow * 300) % 1300 - 100, xx = f.x + Math.sin(tm + i) * 20;
      return <circle key={i} cx={f1(xx)} cy={f1(yy)} r={f.r} fill="#FFFFFF" stroke="#9FB6C8" strokeWidth={.4} opacity={snow * (1 - th)} />; })}
  </g>;
};

// ================================================================ the set
export const ART_A: Record<string, React.FC<any>> = { Jigsaw, AtlasPage, MeadowRock, FourClues, MapLeaves, GreenlandIce, Balloon, StudyDesk, TornNews, LectureHall, QuiltPangaea, Mesosaurus, FossilMap, Fern, FernIce };
// contact-sheet props (full frame, 1920×1080), each drawing caught mid-action
export const SAMPLE_A: Record<string, object> = {
  Jigsaw: { slide: .85, glow: .6, hand: 1 }, AtlasPage: { trace: .7, ghost: .5, tear: 1, gap: .6, q: 1 }, MeadowRock: { boots: 1, snail: .4, grow: .5, town: .7, night: .3, shift: 1, hour: 1, sand: .4 },
  FourClues: { n: 3.6 }, MapLeaves: { k: .55, stamp: 1, catch: .9, tm: 2 }, GreenlandIce: { snow: .4, sledge: .5, flag: 1, tm: 1 }, Balloon: { rise: .3, tm: 1 },
  StudyDesk: { lamp: 1, mag: .35, shells: 1, tm: 1 }, TornNews: { tear: 1, gap: .6, print: .8, fossils: .5 }, LectureHall: { map: .6, laugh: .8, steam: .5, bubbles: 1, stone: .3, tm: 1 },
  QuiltPangaea: { stamp: 1, cloth: 1, stitch: .8, open: .3 }, Mesosaurus: { walk: .3, swim: 0, tm: 1 }, FossilMap: { pins: 1, grey: .5, waves: .5, close: .3, leaves: 4, ant: 1 },
  Fern: { unfurl: .8, blow: .2, tm: 1 }, FernIce: { snow: .3, freeze: 0, freezer: .7, thaw: .3, tm: 1 },
};
