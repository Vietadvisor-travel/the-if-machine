// drifting-continents — set B drawings (CLUE 3 → MEANING): the ship against the rock, Wegener's tent on the Greenland ice, the blank sea
// chart, the 1950s survey ship and its magnetometer fish, the pen recorder, the striped sea floor (StripeFloor: piano / twins / fold / wings),
// the ridge round the globe, the Cambridge study (Vine & Matthews, 1963), the flipping compass, the ridge as a tape recorder (RidgeTape →
// conveyor belt), the cracked plate globe, the trench, the rug that becomes the Himalaya, the Atlantic from space, the GPS survey marker and
// the fingernail that becomes the Atlantic (NailAtlantic).
// Engine 10, CLEAN DRAWN house style: washes under sepia ink, no engraving hatch (Region hatch 0). Every component is a FULL-FRAME scene
// (1920×1080) drawn about (960, 540): x, y move that centre, s scales it. Geography: real outlines (lon/lat, simplified) projected
// orthographically for the globes; the mid-ocean ridge system and the plate boundaries from the standard maps (USGS "This Dynamic Planet").
import React, { useMemo } from 'react';
import { Region, Ink, Line, SEP, mix } from '../../paint/paint';
import { Fell, Star, starField, N, Pt, f1, cl, ph, lerp, rr, pathOf, rnd } from '../star-distance/kit';

const VER = '#B8432A', IND = '#22305E', IND2 = '#141C38', GOLD = '#D9AE4C', GOLDL = '#F3D88E', ICEW = '#F4F7F8', ARC = '#7FA8C4';
const BASALT = '#4E4842', LAND = '#D9AE6C', FIG = "'Special Elite', monospace";
const RG: React.FC<any> = (p) => <Region hatch={0} {...p} />;
const TR = (x: N, y: N, s: N) => `translate(${f1(x)} ${f1(y)}) scale(${s}) translate(-960 -540)`;
const fr = (v: N) => v - Math.floor(v);
const sst = (t: N) => { const u = cl(t); return u * u * (3 - 2 * u); };
const sm = (pts: Pt[], closed = false) => {
  if (pts.length < 2) return ''; const n = pts.length, g = (i: N) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`; }
  return d + (closed ? 'Z' : '');
};
const grad = (id: string, stops: [N, string, N?][], vert = true) => <linearGradient id={id} x1="0" y1="0" x2={vert ? 0 : 1} y2={vert ? 1 : 0}>
  {stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}</linearGradient>;

// ================================================================ GEOGRAPHY (lon, lat), simplified from Natural Earth 1:110m
type LL = [N, N];
const pr = (a: N[]): LL[] => { const o: LL[] = []; for (let i = 0; i < a.length; i += 2) o.push([a[i], a[i + 1]]); return o; };
const GEO: Record<string, LL[]> = {
  SA: pr([-77.5, 8.5, -75, 10.8, -71.5, 12.3, -68, 10.5, -63, 10.6, -60, 8.5, -57, 6, -53, 5.5, -51, 4, -50, 1.5, -48.5, -1, -44.5, -2.5, -41, -3, -38.5, -3.7, -35.2, -5.5, -34.8, -7.5, -35.3, -9.5,
    -37.5, -12, -39, -14, -39, -17.5, -40.5, -20.5, -42, -23, -44.5, -23.3, -47.5, -25, -48.6, -28, -50.5, -30.5, -53, -33.5, -56.5, -35, -57.5, -38, -62, -39, -62.3, -41, -64.5, -42.5, -65.5, -45,
    -67.5, -46.5, -66, -48, -68.3, -50.5, -69, -52.5, -68.5, -54.5, -71.5, -54, -74, -52, -75.5, -48, -74, -44, -73.6, -40, -73.5, -37, -71.6, -33, -71.4, -28, -70.5, -23.5, -70.3, -18.5, -72, -17,
    -75.5, -15, -77.5, -12, -79.5, -8, -81.2, -5.5, -80.3, -3, -80.5, -.5, -80, 1, -78.8, 1.8, -77.3, 4, -77.4, 7]),
  NA: pr([-77.5, 8.5, -79.5, 9.5, -81.5, 8.2, -83.5, 8.5, -85.7, 10, -86, 11.5, -87.6, 13, -91, 14, -94, 16, -96.5, 15.7, -100, 17, -103.5, 18.3, -105.5, 20.5, -105.3, 22.6, -108, 25.5, -110.5, 27.5,
    -112.8, 31.5, -114.5, 30, -112, 27, -110, 23, -112, 24.8, -114, 27.5, -115.5, 29.6, -117, 32.5, -118.5, 34, -120.6, 34.6, -122.5, 37.5, -124, 40.5, -124.2, 43, -124, 46.5, -124.7, 48.4, -127, 50,
    -130.5, 54.5, -134, 57.5, -137.5, 59, -141, 60, -146, 60.8, -150, 59.5, -152, 60.5, -154, 58, -158, 56.5, -162.5, 55, -160, 58.5, -162, 60, -165, 61.5, -164.7, 63.2, -161, 64.4, -166, 65.3, -164, 67,
    -166.5, 68.4, -162, 70, -156.5, 71.3, -152, 70.8, -145, 70, -140, 69.6, -135, 69.3, -130, 70, -124, 69.5, -120, 68.8, -115, 67.8, -108, 68, -98, 67.8, -95, 68.5, -90, 68.6, -85, 69.5, -82, 67.5,
    -86, 65, -88, 63.5, -93.5, 61, -94.5, 58.5, -92.5, 57, -88, 55.5, -82.3, 55, -82, 52.5, -79, 51.5, -78.5, 55, -77, 58.5, -78, 62.3, -73, 62, -70, 60.5, -65, 60, -61.5, 56.5, -57.5, 54, -55.8, 52.2,
    -59, 48, -64.5, 48.8, -61, 46.7, -63.5, 45, -66, 44, -70, 43.5, -70.5, 41.8, -74, 40.7, -75.5, 38.5, -76, 36.8, -75.5, 35.3, -77.8, 34, -81, 32, -81.4, 30, -80.1, 26.5, -80.5, 25.2, -81.8, 26.5,
    -82.7, 28, -83.8, 29.8, -85.5, 29.7, -88, 30.4, -89.5, 30.1, -90.5, 29.1, -94, 29.6, -97.2, 27.8, -97.5, 25, -97.7, 22, -96.5, 19.2, -94.5, 18.2, -91.5, 18.5, -90.5, 21, -87, 21.5, -87.5, 19,
    -88.3, 16, -86, 15.9, -84, 15, -83.3, 12, -83.8, 10.8, -81.8, 9, -79.5, 9.6]),
  GL: pr([-73, 78, -66, 80.5, -60, 82, -45, 82.7, -32, 83.6, -22, 82.5, -20, 80.5, -18, 77.5, -19.5, 74.5, -22, 72.5, -22, 70.3, -25, 69.5, -31, 68, -35, 66, -40, 65, -42, 62.5, -43.5, 60, -45, 60.3,
    -48, 61.5, -50, 63.5, -51.5, 66, -51, 68.5, -53.5, 70.5, -55, 72.5, -58, 75.5, -62, 76.2, -68, 76.3, -72, 77.2]),
  AF: pr([-5.9, 35.8, -2, 35.1, 1, 36.5, 5, 36.8, 10, 37.2, 11, 36.9, 10.3, 34, 11.5, 33.1, 15.2, 32.3, 19, 30.3, 20.1, 31.2, 20, 32.5, 23, 32.6, 25, 31.7, 29, 30.9, 32.3, 31.3, 34.2, 31.2, 33.3, 28.5,
    34.8, 26, 37.2, 21, 38.6, 18, 39.7, 15.5, 41.2, 14.3, 43.2, 12.7, 44.5, 10.4, 48, 11.2, 51.2, 11.8, 51, 10.4, 50.8, 8, 48.5, 4.5, 46, 2, 43, -.5, 41.5, -1.8, 40, -3.5, 39.2, -6.5, 39.5, -9.5,
    40.5, -10.8, 40.8, -14.5, 39.5, -17, 36.8, -18.8, 35, -21.5, 35.5, -24, 32.8, -26, 32.4, -28.6, 30.5, -31, 28, -33, 25.6, -34, 22.5, -34, 20, -34.8, 18.4, -34, 17.9, -32, 16.5, -28.6, 15.2, -26.7,
    14.5, -22.5, 13.4, -21, 11.8, -17.2, 11.8, -15.8, 12.4, -13.5, 13.6, -11, 13.2, -8.8, 12.2, -6, 11.9, -4.7, 10.2, -2.8, 9.3, -.6, 9.6, 1.5, 9.8, 3.2, 8.6, 4.5, 6, 4.3, 4.5, 6.3, 2, 6.3, -1, 5, -4, 5.2,
    -7.5, 4.4, -9.5, 5.6, -11.5, 7, -13.2, 8.8, -15, 10.9, -16.7, 12.4, -17.2, 14.7, -16.5, 16.5, -16.2, 19, -17, 21, -15, 24.5, -13.7, 26.5, -11.5, 28.2, -9.8, 29.8, -9.6, 32, -8, 33.6, -6.5, 34.5]),
  EU: pr([-5.6, 36, -9, 36.9, -8.9, 38.8, -9.4, 40, -8.8, 42.2, -9.3, 43, -7.7, 43.7, -4, 43.4, -1.5, 43.4, -1.2, 46, -2.6, 47.3, -4.7, 48, -1.5, 48.7, .2, 49.5, 1.6, 50.9, 3, 51.2, 4.5, 52.5, 5, 53.4,
    8.5, 53.6, 8.6, 55.5, 8.2, 57, 10.5, 57.7, 10.5, 56, 10, 54.5, 12, 54.2, 14.2, 53.9, 18.5, 54.6, 21, 55, 21.2, 56.8, 24, 57.3, 23.5, 59.2, 28, 59.6, 29.8, 60, 24, 60.3, 21.4, 60.8, 21.2, 63, 25.3, 65,
    22, 65.8, 21, 64.5, 17.5, 62, 18.8, 60, 16.5, 57.5, 14, 55.4, 12.8, 56.3, 11, 58.9, 8, 58.1, 5.6, 59, 5, 61.5, 7, 63.2, 10.5, 64.5, 14, 67.5, 16, 69, 20, 70, 25, 71, 28, 71, 31, 70, 33, 69.3, 41, 67.5,
    44, 68.4, 46, 66.9, 53.5, 68.5, 58, 68.9, 66, 69.5, 69, 72.8, 72.5, 72, 75, 72.8, 80, 72.5, 87, 74.5, 96, 76, 104, 77.7, 113, 75.9, 120, 73, 129, 71.5, 140, 72.5, 150, 71.5, 160, 69.8, 170, 70,
    180, 68.9, 180, 65, 177, 62.5, 173, 61, 166, 60, 163, 59.8, 162, 57.8, 156.5, 51, 155.5, 55.5, 156.5, 57.8, 160, 61.5, 154, 59.4, 143, 59.3, 138, 56, 141, 52.5, 140.5, 48.5, 135, 43.4, 131, 42.8,
    129.5, 40.8, 129.4, 37, 126.5, 34.5, 126.2, 37.7, 124.7, 39.8, 121.5, 40, 121.6, 38.9, 118, 39.2, 119.2, 37.2, 122.5, 36.9, 120.5, 35, 121.9, 31, 121.5, 28.5, 119.6, 25.6, 116.7, 23, 113, 22.2,
    110.5, 20.5, 109.8, 21.5, 107.5, 21.5, 106, 19.8, 108.9, 15.3, 109.2, 11.6, 105.2, 8.6, 104.8, 10.3, 102.5, 12.3, 100.9, 13.3, 99.3, 10.3, 100.2, 8.4, 101.3, 6.8, 103.4, 3.8, 104.2, 1.4, 101.5, 2.6,
    100.3, 4.9, 98.5, 8, 98.7, 11.5, 97.7, 16, 94.5, 16, 94.4, 18.3, 92.3, 20.7, 91.8, 22.5, 90.4, 22, 86.9, 21.5, 84.5, 19.2, 80.3, 15.8, 80.1, 13, 79.8, 10.3, 77.5, 8, 76.1, 10, 74.7, 13, 73.4, 16,
    72.8, 19.3, 72.6, 21.2, 70.5, 20.9, 68.8, 22.4, 67.4, 23.9, 66.4, 25.4, 61.5, 25.1, 57.4, 25.7, 56.8, 27.1, 54.8, 26.5, 51.5, 27.9, 50.1, 30.1, 48.6, 30, 47.9, 29.1, 48.8, 27.6, 50.1, 26.7, 50.2, 25.6,
    51.6, 24.3, 53.9, 24.1, 56.4, 26.4, 56.3, 24.9, 57.4, 23.9, 59.8, 22.5, 57.8, 18.9, 55.3, 17.2, 52.4, 16.4, 48.7, 14, 45, 12.7, 43.3, 12.7, 42.6, 15.7, 41.2, 18.4, 39, 21.5, 37.5, 24.3, 35.1, 28.1,
    34.6, 28, 34.2, 31.2, 35.5, 33.9, 35.9, 35.4, 36.1, 36.7, 32.5, 36.1, 30.4, 36.3, 28, 36.7, 26.3, 38.2, 26.6, 40.1, 29, 41, 31.1, 41.1, 34.5, 42, 38.2, 40.9, 41.6, 41.5, 41.5, 42.6, 37.5, 44.7,
    39.3, 47, 35, 45.5, 33, 45.4, 32.5, 46.5, 30.7, 46.6, 29.6, 45, 28.6, 44, 27.7, 42.6, 28, 41.6, 26.1, 40.6, 24, 40.5, 22.6, 40.3, 24, 38, 22.8, 36.5, 21.1, 37.9, 19.4, 40.3, 19.4, 41.8, 16, 43.5,
    13.7, 45.1, 12.3, 44.6, 13.9, 42.6, 16, 41.5, 18.4, 40.2, 16.5, 38.4, 15.7, 40, 12.2, 41.6, 10.2, 43.9, 8.9, 44.4, 6.5, 43.1, 3.1, 43.1, 3.2, 41.9, .8, 41, 0, 39.9, -.6, 37.6, -2.1, 36.7]),
  AU: pr([113.3, -22, 114.2, -26.3, 115, -30, 115.7, -33.6, 117.9, -35.1, 121, -33.9, 124, -33, 126, -32.3, 129, -31.6, 131.5, -31.5, 134.2, -32.7, 135.6, -34.8, 137.8, -32.9, 137.5, -35.6, 139.6, -36,
    140.6, -38, 143.5, -38.8, 146.3, -39.1, 148, -37.8, 150, -37.4, 150.8, -34.4, 152.5, -32, 153.5, -28.7, 153.2, -25.8, 150.9, -22.8, 149.2, -21, 146.4, -19, 145.4, -16, 145.3, -14.9, 143.6, -14,
    142.5, -10.7, 141.5, -13.6, 141.6, -17, 140, -17.7, 136.3, -15.5, 135.4, -14.7, 136.8, -12.2, 133, -11.4, 131.3, -12.2, 129.4, -14.9, 126.1, -14.1, 124.4, -16.3, 122.2, -18.2, 121, -19.6, 116.7, -20.6]),
  AN: pr([-180, -78, -150, -77, -120, -73.5, -90, -72.5, -75, -73, -65, -68, -60, -63.5, -57, -64, -60, -70, -45, -78, -30, -76, -15, -72, 0, -70, 30, -69, 60, -67, 90, -66.5, 120, -66.5, 150, -68,
    165, -71, 170, -75, 180, -78, 180, -90, -180, -90]),
  MG: pr([44, -25, 47, -25, 50.5, -15.5, 49.3, -12, 48, -13.5, 44, -17, 43.3, -22]),
  GB: pr([-5.7, 50, 1.4, 51.2, 1.7, 52.7, 0, 53.5, -1.6, 55.6, -2, 57.6, -3, 58.6, -5, 58.6, -6.2, 56.5, -4.8, 54.8, -3, 53.4, -4.6, 52.8, -5.2, 51.7]),
  IE: pr([-6, 52.2, -6.2, 54, -7.5, 55.2, -10, 54.2, -10.3, 51.8, -8, 51.5]),
  IS: pr([-22.5, 64, -24, 65.5, -22, 66.4, -16, 66.5, -13.6, 65.2, -15, 64.2, -18.7, 63.4]),
  JP: pr([130, 31.2, 131.7, 31.5, 135, 33.7, 136.8, 34.5, 139.8, 35, 140.9, 38, 141.5, 40.5, 140.8, 41.5, 141.8, 43, 145.5, 43.3, 144, 44.2, 141.8, 45.4, 141.3, 43, 140, 42.4, 139.8, 40.4, 138.5, 37.8,
    136.7, 37, 133, 35.5, 131, 34.4, 130, 33.5]),
  BO: pr([109, 1.5, 111, -3, 116, -4, 118.5, 1, 119, 5, 116.8, 7, 115, 4.8]),
  SU: pr([95.3, 5.5, 98, 3.8, 104, -2.5, 106, -5.9, 104.5, -5.8, 100.5, -.6]),
  NG: pr([131, -1, 135, -3.3, 138, -1.6, 141, -2.6, 145.8, -5, 147.5, -6.2, 150, -10.5, 146, -8.5, 143, -9, 141, -9.1, 138, -8.3, 137.8, -5.2, 133, -4, 132, -2.8]),
  NZ: pr([172.7, -34.4, 178.5, -37.7, 177, -39.5, 175, -41.5, 171, -44.5, 166.5, -46, 168, -46.6, 171.5, -44, 174.5, -41, 173.8, -39.2, 174.5, -36.5]),
};
// which side of the Atlantic a land mass is on (for the opening), and which way its plate drifts (screen direction, for PlateGlobe)
const WEST = new Set(['SA', 'NA', 'GL']);
const DRIFT: Record<string, Pt> = { SA: [-1, .15], NA: [-1, -.2], GL: [-.6, -.6], AF: [1, .1], EU: [.8, -.4], AU: [.5, .9], AN: [0, 1], MG: [1, .3], GB: [.7, -.5], IE: [.7, -.5], IS: [0, -.8], JP: [.8, -.3], BO: [.6, .3], SU: [.6, .3], NG: [.5, .9], NZ: [.4, .9] };
// the mid-ocean ridge system (in drawing order: Atlantic first), and the convergent / collision boundaries
const RIDGES: LL[][] = [
  pr([120, 80, 60, 86, -5, 82, -5, 73, -12, 70.5, -18, 66.5, -22, 64, -29, 59, -33, 54, -30, 50, -28, 45, -30, 40, -35, 35, -40, 30, -45, 24, -46, 18, -45.5, 13, -42, 9, -36, 6, -30, 3, -26, 1, -20, 0,
    -14, -2, -13, -6, -14, -10, -14, -15, -13, -20, -12.5, -25, -14, -30, -14, -35, -16, -40, -17, -45, -14, -50, -5, -53, 5, -54]),
  pr([5, -54, 15, -53, 25, -48, 32, -44, 45, -38, 57, -32, 65, -27, 70, -25, 67, -18, 66, -10, 68, -3, 60, 5, 57, 12, 50, 13, 43, 12.5]),
  pr([70, -25, 78, -32, 88, -40, 100, -48, 115, -50, 130, -50, 145, -56, 160, -61, 175, -63, 190, -65, 210, -60, 230, -55, 245, -45, 248, -36, 250, -25, 249, -15, 256, -5, 258, 0, 256, 10, 252, 20, 245, 28]),
];
const TRENCHES: LL[][] = [
  pr([-77, 7, -80, 0, -81, -6, -78, -12, -73, -18, -71.5, -25, -73, -33, -75, -42, -76, -50, -72, -55]),
  pr([-77, 7, -84, 8, -92, 13, -100, 16.5, -106, 20, -108, 22]),
  pr([-115, 31, -123, 40, -125, 44, -130, 50, -138, 58, -148, 59, -160, 54, -175, 51, -187, 52, -196, 55]),
  pr([164, 55, 155, 47, 146, 42, 143, 36, 142, 30, 143, 20, 146, 12, 140, 6, 130, 2, 125, -6]),
  pr([95, 6, 100, -2, 105, -7.5, 115, -10.5, 125, -10, 130, -7, 140, -3, 150, -6, 158, -9, 166, -14, 172, -18, 186, -15, 185, -22, 182, -32, 178, -40, 174, -45, 166, -48]),
  pr([-10, 36, 0, 37, 10, 38, 20, 37, 28, 35, 35, 36, 45, 37, 55, 28, 62, 26, 67, 25, 72, 33, 80, 31, 88, 28, 95, 27, 97, 20, 95, 6]),
  pr([38, 15, 40, 9, 36, 0, 34, -10, 34, -20]),
];
const D2R = Math.PI / 180;
const ortho = (lo: N, la: N, lo0: N, la0: N): [N, N, N] => { const l = (lo - lo0) * D2R, p = la * D2R, p0 = la0 * D2R;
  return [Math.cos(p) * Math.sin(l), -(Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)]; };
const dens = (L: LL[], step = 2, closed = false): LL[] => {
  const o: LL[] = [], n = L.length;
  for (let i = 0; i < (closed ? n : n - 1); i++) { const a = L[i], b = L[(i + 1) % n], k = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let j = 0; j < k; j++) o.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k]); }
  if (!closed) o.push(L[n - 1]); return o;
};
type GV = { cx: N; cy: N; r: N; lo0: N; la0: N };
const gPoly = (L: LL[], g: GV, off: Pt = [0, 0]) => {
  const P = dens(L, 2.5, true).map(q => ortho(q[0], q[1], g.lo0, g.la0)); if (!P.some(p => p[2] > .02)) return '';
  return 'M' + P.map(([X, Y, Z]) => { if (Z < 0) { const h = Math.hypot(X, Y) || 1; X /= h; Y /= h; } return `${f1(g.cx + X * g.r + off[0])} ${f1(g.cy + Y * g.r + off[1])}`; }).join(' L') + 'Z';
};
const gRuns = (L: LL[], g: GV, off: Pt = [0, 0], step = 1.5): Pt[][] => {
  const out: Pt[][] = []; let cur: Pt[] = [];
  for (const q of dens(L, step)) { const [X, Y, Z] = ortho(q[0], q[1], g.lo0, g.la0);
    if (Z > 0) cur.push([g.cx + X * g.r + off[0], g.cy + Y * g.r + off[1]]); else if (cur.length) { if (cur.length > 1) out.push(cur); cur = []; } }
  if (cur.length > 1) out.push(cur); return out;
};
// the first k (0..1) of a set of polylines, by length, in order
const cutK = (lines: LL[][], k: N): LL[][] => {
  const lens = lines.map(L => L.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - L[i][0], p[1] - L[i][1]), 0)); let rem = lens.reduce((a, b) => a + b, 0) * cl(k); const out: LL[][] = [];
  for (let j = 0; j < lines.length && rem > 0; j++) { const L = lines[j]; if (rem >= lens[j]) { out.push(L); rem -= lens[j]; continue; }
    const o: LL[] = [L[0]]; for (let i = 1; i < L.length; i++) { const sg = Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]);
      if (rem >= sg) { o.push(L[i]); rem -= sg; } else { const t = rem / sg; o.push([lerp(L[i - 1][0], L[i][0], t), lerp(L[i - 1][1], L[i][1], t)]); rem = 0; break; } }
    out.push(o); rem = 0; }
  return out;
};
const runsPath = (R: Pt[][]) => R.map(r => pathOf(r)).join(' ');

// a globe body: ocean disc, land, graticule, shade; land offsets per mass (for drift)
const GlobeBody: React.FC<{ g: GV; id: string; draw: N; sea: [string, string]; land: string; off?: (k: string) => Pt; grat?: N; shade?: N; landSw?: N }> = ({ g, id, draw, sea, land, off, grat = .25, shade = .6, landSw = 1.1 }) => {
  const meridians = Array.from({ length: 12 }, (_, i) => pr([i * 30 - 180, -88, i * 30 - 180, 88])), parallels = [-60, -30, 0, 30, 60].map(la => pr([-180, la, -90, la, 0, la, 90, la, 180, la]));
  return <g>
    <defs><radialGradient id={id + 'o'} cx=".42" cy=".38" r=".7"><stop offset="0" stopColor={sea[0]} /><stop offset="1" stopColor={sea[1]} /></radialGradient>
      <radialGradient id={id + 's'} cx=".36" cy=".32" r=".78"><stop offset=".45" stopColor="#0B1030" stopOpacity={0} /><stop offset="1" stopColor="#0B1030" stopOpacity={shade} /></radialGradient>
      <clipPath id={id + 'c'}><circle cx={g.cx} cy={g.cy} r={g.r} /></clipPath></defs>
    <circle cx={g.cx} cy={g.cy} r={g.r} fill={`url(#${id}o)`} opacity={ph(draw, .1, .6)} />
    <g clipPath={`url(#${id}c)`}>
      {grat > 0 && <path d={[...meridians, ...parallels].map(L => runsPath(gRuns(L, g, [0, 0], 3))).join(' ')} stroke="#C9DDE6" strokeWidth={.8} fill="none" opacity={grat * ph(draw, .4, 1)} />}
      {Object.keys(GEO).map(k => { const d = gPoly(GEO[k], g, off ? off(k) : [0, 0]); return d ? <RG key={k} d={d} color={land} draw={draw} sw={landSw} k={.6} /> : null; })}
      <circle cx={g.cx} cy={g.cy} r={g.r} fill={`url(#${id}s)`} />
    </g>
    <Ink d={`M${g.cx - g.r} ${g.cy} A${g.r} ${g.r} 0 1 0 ${g.cx + g.r} ${g.cy} A${g.r} ${g.r} 0 1 0 ${g.cx - g.r} ${g.cy}Z`} w={2} draw={draw} />
  </g>;
};
// a 16-point compass rose (dark/light halves), north point vermilion
const Rose: React.FC<{ cx: N; cy: N; r: N; a?: N; north?: boolean }> = ({ cx, cy, r, a = 1, north = true }) => {
  const pts = Array.from({ length: 16 }, (_, i) => i).sort((p, q) => (p % 4 === 0 ? 2 : p % 2 === 0 ? 1 : 0) - (q % 4 === 0 ? 2 : q % 2 === 0 ? 1 : 0));
  return <g opacity={a}>
    <circle cx={cx} cy={cy} r={r * .5} fill="none" stroke={SEP} strokeWidth={1.2} /><circle cx={cx} cy={cy} r={r * .54} fill="none" stroke={SEP} strokeWidth={.7} />
    {pts.map(i => { const an = (i * 22.5 - 90) * D2R, len = i % 4 === 0 ? r : i % 2 === 0 ? r * .66 : r * .44, w = len * .14, tip: Pt = [cx + Math.cos(an) * len, cy + Math.sin(an) * len];
      const s1: Pt = [cx + Math.cos(an - Math.PI / 2) * w, cy + Math.sin(an - Math.PI / 2) * w], s2: Pt = [cx + Math.cos(an + Math.PI / 2) * w, cy + Math.sin(an + Math.PI / 2) * w];
      const dark = i === 0 && north ? VER : i % 4 === 0 ? SEP : i % 2 === 0 ? '#4F6E5A' : '#8C6E4A';
      return <g key={i}><path d={pathOf([[cx, cy], tip, s1], true)} fill={dark} stroke={SEP} strokeWidth={.8} /><path d={pathOf([[cx, cy], tip, s2], true)} fill="#FBF4E2" stroke={SEP} strokeWidth={.8} /></g>; })}
    <circle cx={cx} cy={cy} r={r * .05} fill={GOLD} stroke={SEP} strokeWidth={1} />
  </g>;
};

// a raking key light over a whole scene: warm where the light comes from, falling off to a cool dark corner (house: no flat fills)
const KeyLight: React.FC<{ id: string; from?: 'tl' | 'tr'; a?: N }> = ({ id, from = 'tl', a = 1 }) => <g opacity={a} style={{ pointerEvents: 'none' }}>
  <defs><linearGradient id={id + 'kl'} x1={from === 'tl' ? 0 : 1} y1="0" x2={from === 'tl' ? 1 : 0} y2="1"><stop offset="0" stopColor="#FFF0D0" stopOpacity={.26} /><stop offset=".45" stopColor="#FFF0D0" stopOpacity={0} /><stop offset="1" stopColor="#1A1210" stopOpacity={.34} /></linearGradient>
    <radialGradient id={id + 'vg'} cx=".5" cy=".5" r=".75"><stop offset=".6" stopColor="#1A1210" stopOpacity={0} /><stop offset="1" stopColor="#1A1210" stopOpacity={.3} /></radialGradient></defs>
  <rect x={-100} y={-100} width={2120} height={1280} fill={`url(#${id}kl)`} /><rect x={-100} y={-100} width={2120} height={1280} fill={`url(#${id}vg)`} /></g>;

// ================================================================ 1. ROCK SHIP — a little wooden sailing ship sails at a huge block of grey rock; its bow crumples, it sinks
// sail 0..1 carries it to the rock; crumple 0..1 crushes the bow (splinters fly); sink 0..1 takes it under the waterline, bubbles rising.
const RockShip: React.FC<{ x?: N; y?: N; s?: N; draw?: N; sail?: N; crumple?: N; sink?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, sail = 0, crumple = 0, sink = 0, tm = 0 }) => {
  const id = 'rks' + Math.round(x), WL = 650, sx = lerp(300, 960, sst(sail)), bob = Math.sin(tm * 1.7) * 2 * (1 - sink), bx = sx + 190 - crumple * 60;
  const hull = `M${sx - 185} ${WL - 62} L${sx - 120} ${WL - 58} L${bx - 50} ${WL - 52} Q${bx - 14} ${WL - 56} ${bx} ${WL - 74} L${bx - 26 + crumple * 8} ${WL + 4} Q${sx + 60} ${WL + 32} ${sx - 150} ${WL + 24} Q${sx - 190} ${WL + 6} ${sx - 185} ${WL - 62}Z`;
  const sag = 1 - crumple * .7, mast = (mx: N, h: N, w: N) => { const top = WL - 58 - h;
    return <g>
      <Line d={`M${mx} ${WL - 56} V${top}`} w={5} col="#4F3020" a={1} />
      {[0, 1].map(j => { const y0 = top + 20 + j * h * .42, y1 = y0 + h * .36, ww = w * (1 - j * .1) * (j ? 1 : .8), bil = 26 * sag;
        return <g key={j}><Line d={`M${mx - ww / 2 - 6} ${y0} H${mx + ww / 2 + 6}`} w={3.4} col="#4F3020" a={1} />
          <RG d={`M${mx - ww / 2} ${y0} H${mx + ww / 2} Q${mx + ww / 2 + bil * .8} ${(y0 + y1) / 2} ${mx + ww / 2 + 4} ${y1 + crumple * 14} H${mx - ww / 2 + 4} Q${mx - ww / 2 + bil * .8} ${(y0 + y1) / 2} ${mx - ww / 2} ${y0}Z`} mat="cloth" t={.12 + j * .06} draw={draw} sw={1.3} /></g>; })}
    </g>; };
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sk', [[0, '#9AA6B0'], [1, '#D7DCDC']])}{grad(id + 'sea', [[0, '#5A6E7E'], [1, '#26344A']])}<clipPath id={id + 'up'}><rect x={-100} y={-200} width={2200} height={WL + 200} /></clipPath></defs>
    <rect x={-100} y={-100} width={2120} height={WL + 100} fill={`url(#${id}sk)`} opacity={ph(draw, 0, .5)} />
    {[[260, 200, 160], [760, 140, 220], [1500, 110, 180]].map(([cx, cy, w], i) => <path key={i} d={`M${cx - w} ${cy} q${w * .3} -40 ${w * .6} -10 q${w * .4} -50 ${w * .8} 0 q${w * .4} -10 ${w * .6} 10Z`} fill="#EEF0EE" opacity={.55 * ph(draw, .2, .8)} />)}
    <rect x={-100} y={WL} width={2120} height={600} fill={`url(#${id}sea)`} opacity={ph(draw, 0, .5)} />
    {/* the rock: a sheer grey block rising out of the sea */}
    <RG d={`M1150 1180 L1146 ${WL - 40} L1170 330 L1205 250 L1290 190 L1400 170 L1470 205 L1560 160 L1700 150 L1820 190 L1920 175 L2000 180 L2000 1180Z`} color="#9A978F" draw={draw} sw={2.2} />
    <RG d={`M1146 ${WL - 40} L1170 330 L1205 250 L1240 260 L1215 340 L1200 ${WL - 30}Z`} color="#C4C0B4" draw={draw} sw={1.2} />
    {[[1250, 300, 1600, 260], [1220, 420, 1700, 380], [1200, 520, 1800, 470], [1300, 230, 1500, 215]].map(([a, b, c, d2], i) => <Line key={i} d={`M${a} ${b} Q${(a + c) / 2} ${b + 20} ${c} ${d2}`} w={1.2} a={.45} draw={ph(draw, .3, 1)} />)}
    {[[1420, 280, 30, 90], [1640, 350, 40, 110], [1330, 470, -20, 80]].map(([a, b, c, d2], i) => <Line key={'c' + i} d={`M${a} ${b} l${c * .4} ${d2 * .4} l${-c * .3} ${d2 * .3} l${c} ${d2 * .5}`} w={1.6} a={.7} />)}
    {/* the ship, bobbing; sinking bow-first */}
    <g transform={`translate(0 ${f1(sink * 340)}) rotate(${f1(bob + sink * 16)} ${f1(sx)} ${WL})`}>
      <g>{mast(sx + 70, 210, 120)}{mast(sx - 50, 240, 140)}
        <RG d={`M${sx + 70} ${WL - 250} L${bx - 6} ${WL - 72} L${sx + 96} ${WL - 70}Z`} mat="cloth" t={.1} draw={draw} sw={1.2} />
        <path d={`M${sx - 50} ${WL - 298} l${f1(30 + Math.sin(tm * 6) * 4)} ${f1(6 + Math.sin(tm * 5) * 3)} l-30 10Z`} fill={VER} stroke={SEP} strokeWidth={1} />
        <RG d={hull} mat="wood" t={.5} draw={draw} sw={2} />
        <RG d={`M${sx - 190} ${WL - 62} L${sx - 186} ${WL - 92} L${sx - 112} ${WL - 92} L${sx - 112} ${WL - 60}Z`} mat="wood" t={.62} draw={draw} sw={1.6} />
        {[-36, -18, 0].map((o, i) => <Line key={i} d={`M${sx - 170} ${WL + o} Q${sx} ${WL + o + 12 - i * 3} ${bx - 30 - i * 6} ${WL + o - 8}`} w={1} a={.5} />)}
        {[-140, -90, -40, 10, 60].map((o, i) => <circle key={i} cx={sx + o} cy={WL - 38} r={5} fill="#3A2418" />)}
        {crumple > 0 && <g opacity={cl(crumple * 3)}>
          <path d={`M${bx} ${WL - 74} l-16 14 l12 10 l-18 12 l14 10 l-16 14 l10 12`} stroke={SEP} strokeWidth={2.4} fill="none" />
          <path d={`M${bx - 8} ${WL - 60} l-26 6 M${bx - 10} ${WL - 30} l-30 -4 M${bx - 6} ${WL - 4} l-24 8`} stroke="#4F3020" strokeWidth={2} />
        </g>}
      </g>
    </g>
    {crumple > 0 && Array.from({ length: 12 }, (_, i) => { const c = crumple, dx = -c * (30 + rnd(i) * 150) * (rnd(i + 9) < .3 ? -.4 : 1), dy = -c * (40 + rnd(i + 2) * 120) + c * c * 140, rot = c * (rnd(i + 4) - .5) * 500;
      return <rect key={i} x={1140 + dx} y={WL - 50 + dy + sink * 200} width={8 + rnd(i + 5) * 16} height={4} fill="#8C5A36" stroke={SEP} strokeWidth={.8} transform={`rotate(${f1(rot)} ${f1(1140 + dx)} ${f1(WL - 50 + dy)})`} opacity={1 - ph(c, .8, 1) * .5} />; })}
    {/* the sea in front: what is under the line is under water */}
    <rect x={-100} y={WL} width={2120} height={600} fill="#2E3E54" opacity={.74 * ph(draw, 0, .5)} />
    <path d={`M-100 ${WL} ${Array.from({ length: 41 }, (_, i) => `Q${-100 + i * 54 + 13} ${WL - 6} ${-100 + i * 54 + 27} ${WL} T${-100 + i * 54 + 54} ${WL}`).join(' ')}`} stroke="#E8EEF0" strokeWidth={2.4} fill="none" opacity={.8 * ph(draw, .3, 1)} transform={`translate(${f1(-(tm * 20) % 54)} 0)`} />
    {Array.from({ length: 16 }, (_, i) => { const xw = 60 + rnd(i * 3) * 1080, yw = WL + 30 + rnd(i * 5) * 360; return <path key={i} d={`M${xw} ${yw} q14 -7 28 0 t28 0`} stroke="#9AA6B0" strokeWidth={1.2} fill="none" opacity={.5} />; })}
    {sink > 0 && Array.from({ length: 18 }, (_, i) => { const p = fr(tm * .45 + rnd(i)), bx2 = sx + (rnd(i + 3) - .3) * 260 + Math.sin(tm * 3 + i) * 6, by = WL + 40 + sink * 320 - p * (sink * 320 + 30);
      return by > WL + 4 ? <circle key={i} cx={bx2} cy={by} r={3 + rnd(i + 7) * 9} fill="#C9DDE6" fillOpacity={.25} stroke="#E8EEF0" strokeWidth={1.4} opacity={cl(sink * 4) * (1 - p * .4)} /> : null; })}
    <KeyLight id={id} from="tr" />
  </g>;
};

// ================================================================ 2. GREENLAND TENT — a canvas pyramid tent on the ice in a blizzard at dusk
// snow 0..1 drifts against it; lamp 0..1 lights it from inside (flickers with tm); skis 0..1 a pair of crossed skis stands in a mound;
// under 0..1 sinks the view below the snow surface (a seed lies there); root 0..1 the seed sends a tiny vermilion root.
const GreenlandTent: React.FC<{ x?: N; y?: N; s?: N; draw?: N; snow?: N; lamp?: N; skis?: N; under?: N; root?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, snow = 0, lamp = 0, skis = 0, under = 0, root = 0, tm = 0 }) => {
  const id = 'gtn' + Math.round(x), G = 735, lf = lamp * (.84 + .1 * Math.sin(tm * 13) * Math.sin(tm * 7.3) + .06 * Math.sin(tm * 23));
  const A: Pt = [930, 400], L: Pt = [735, G], Rr: Pt = [1065, G], S: Pt = [1195, G - 30], sn = snow;
  const drift = `M540 ${G + 14} C640 ${G + 10 - sn * 40} 690 ${G - sn * 165} 790 ${G - sn * 150} C880 ${G - sn * 110} 980 ${G - sn * 128} 1070 ${G - sn * 172} C1150 ${G - 20 - sn * 160} 1220 ${G - 30 - sn * 90} 1320 ${G + 10} L1320 ${G + 30} L540 ${G + 30}Z`;
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sk', [[0, '#1E2A4C'], [.6, '#55658C'], [1, '#9AA4BC']])}{grad(id + 'un', [[0, ICEW], [.3, '#C9DDE6'], [.75, '#7FA8C4'], [1, '#2E5C86']])}
      <radialGradient id={id + 'gl'}><stop offset="0" stopColor="#FFF0B8" stopOpacity={1} /><stop offset=".55" stopColor="#FFC870" stopOpacity={.8} /><stop offset="1" stopColor="#FFB860" stopOpacity={0} /></radialGradient>
      {grad(id + 'hz', [[0, '#9AA8C0', 0], [1, '#C4D0E0', .9]])}
      <clipPath id={id + 'f'}><path d={pathOf([A, L, Rr], true)} /></clipPath></defs>
    <g transform={`translate(0 ${f1(-sst(under) * 640)})`}>
      <rect x={-100} y={-100} width={2120} height={G + 110} fill={`url(#${id}sk)`} opacity={ph(draw, 0, .5)} />
      <path d={`M-100 ${G - 40} L200 ${G - 70} L420 ${G - 52} L700 ${G - 80} L1000 ${G - 58} L1300 ${G - 86} L1650 ${G - 60} L2020 ${G - 74} V${G + 10} H-100Z`} fill="#8E9CB6" opacity={ph(draw, .1, .6)} />
      {/* haze over the far ice: the blizzard thickens with distance */}
      <rect x={-100} y={G - 200} width={2120} height={210} fill={`url(#${id}hz)`} opacity={ph(draw, .2, .8)} />
      {Array.from({ length: 70 }, (_, i) => { const X = fr(rnd(i + 40) + tm * .05) * 2200 - 140, Y = G - 230 + rnd(i + 3) * 240; return <path key={'fs' + i} d={`M${f1(X)} ${f1(Y)} l14 3`} stroke="#E6ECF4" strokeWidth={1} opacity={.35} />; })}
      {/* below the surface: layered snow, bluer with depth */}
      <rect x={-100} y={G} width={2120} height={1200} fill={`url(#${id}un)`} opacity={ph(draw, 0, .5)} />
      {Array.from({ length: 14 }, (_, i) => { const yy = G + 40 + i * 70 + rnd(i) * 20; return <path key={i} d={`M-100 ${yy} ${Array.from({ length: 9 }, (_, j) => `Q${-100 + j * 260 + 130} ${yy + (rnd(i * 9 + j) - .5) * 26} ${-100 + j * 260 + 260} ${yy}`).join(' ')}`} stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={.5} />; })}
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={rnd(i * 2) * 1920} cy={G + 60 + rnd(i * 3) * 1000} r={1.5 + rnd(i) * 2} fill="#FFFFFF" opacity={.6} />)}
      <path d={`M-100 ${G} H2020`} stroke={SEP} strokeWidth={2} opacity={.7 * ph(draw, .2, 1)} />
      {/* the seed and its root, deep in the snow */}
      <g opacity={ph(under, .3, .8)} transform="translate(960 1338) scale(2.2) translate(-960 -1338)">
        <ellipse cx={960} cy={1338} rx={52} ry={34} fill="#FFFFFF" opacity={.35} />
        <path d="M938 1338 Q952 1318 978 1326 Q990 1336 978 1348 Q954 1358 938 1338Z" fill="#8C5A36" stroke={SEP} strokeWidth={1.6} />
        <path d="M946 1336 Q960 1326 974 1332" stroke="#C99A6A" strokeWidth={2} fill="none" />
        {root > 0 && <g><path d="M968 1350 C964 1380 976 1404 966 1432 L956 1470 L962 1500" stroke={VER} strokeWidth={3.4} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${root} 1`} />
          <path d="M967 1418 L990 1446 L996 1470" stroke={VER} strokeWidth={2.4} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${ph(root, .5, 1)} 1`} />
          <path d="M960 1458 L938 1480" stroke={VER} strokeWidth={2} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${ph(root, .7, 1)} 1`} /></g>}
      </g>
      {/* the ice surface */}
      <rect x={-100} y={G - 6} width={2120} height={14} fill="#C4D0E0" opacity={ph(draw, 0, .5)} />
      {/* warm light spilling from the tent across the snow */}
      {lf > 0 && <g><ellipse cx={920} cy={G + 40} rx={520} ry={70} fill="#FFB860" opacity={.42 * lf} filter="url(#b30)" /><circle cx={920} cy={600} r={300} fill="#FFB860" opacity={.35 * lf} filter="url(#b30)" /></g>}
      {lf > 0 && <circle cx={920} cy={620} r={330} fill="url(#glowW)" opacity={.5 * lf} />}
      {/* guy ropes and stakes */}
      <Line d={`M${A[0]} ${A[1] + 6} L590 ${G + 18} M${A[0]} ${A[1] + 6} L1330 ${G + 4}`} w={1.4} a={.75 * ph(draw, .3, 1)} />
      {[[590, G + 18], [1330, G + 4]].map(([a, b], i) => <path key={i} d={`M${a} ${b} l0 -16`} stroke="#4F3020" strokeWidth={4} />)}
      {/* the tent: a canvas pyramid, front face and side face */}
      <RG d={pathOf([A, Rr, S], true)} color={mix('#7C889E', '#E09A50', lf)} draw={draw} sw={1.8} />
      <RG d={pathOf([A, L, Rr], true)} color={mix('#A4B0C2', '#FFC878', lf)} draw={draw} sw={2} />
      <g clipPath={`url(#${id}f)`}><circle cx={915} cy={690} r={260} fill={`url(#${id}gl)`} opacity={lf} /><circle cx={915} cy={700} r={110} fill="#FFF0C0" opacity={.55 * lf} filter="url(#b30)" />
        {/* the shadow of a figure on the lit canvas, bent over a notebook */}
        <path d="M960 735 Q958 680 975 660 Q990 640 1010 652 Q1022 664 1012 682 Q1030 700 1034 735Z" fill="#6A3A1E" opacity={.45 * lf} filter="url(#b2s)" /></g>
      {[[930, 400, 800, G], [930, 400, 1000, G], [930, 400, 1130, G - 15]].map(([a, b, c, d2], i) => <Line key={i} d={`M${a} ${b} L${c} ${d2}`} w={.9} a={.35} />)}
      <path d={`M884 ${G} L914 560 L946 ${G}Z`} fill={mix('#3A2A20', '#FFC870', lf)} stroke={SEP} strokeWidth={1.6} />
      <path d={`M914 560 L930 ${G} L906 ${G}Z`} fill="#CDBB94" stroke={SEP} strokeWidth={1} opacity={.9} />
      <circle cx={A[0]} cy={A[1] - 6} r={6} fill="#4F3020" />
      {lf > 0 && <ellipse cx={915} cy={G + 26} rx={170} ry={30} fill="#FFB860" opacity={.35 * lf} filter="url(#b8)" />}
      {/* the drift piles up against it */}
      <g opacity={ph(sn, 0, .15)}><path d={drift} fill={mix('#DCE4EE', '#FFE6BC', lf * .5)} /><Ink d={drift.split(' L1320')[0]} w={1.4} draw={draw} /></g>
      <path d={`M700 ${G - sn * 120} Q790 ${G - sn * 140} 880 ${G - sn * 100}`} stroke="#B9C8D0" strokeWidth={4} fill="none" opacity={sn * .8} />
      {/* skis, crossed, upright in a mound */}
      <g opacity={ph(skis, 0, .5)} transform={`translate(0 ${f1((1 - sst(skis)) * 60)})`}>
        {[-13, 13].map((r, i) => <g key={i} transform={`rotate(${r} 1440 640)`}>
          <path d={`M1432 ${G + 10} L1432 470 Q1432 446 1440 440 Q1448 446 1448 470 L1448 ${G + 10}Z`} fill={i ? '#8C5A36' : '#A06A40'} stroke={SEP} strokeWidth={1.6} />
          <Line d={`M1440 480 V${G}`} w={1} a={.4} /></g>)}
      </g>
      <g opacity={ph(skis, 0, .3)}><path d={`M1330 ${G + 8} Q1440 ${G - 46 - sn * 20} 1550 ${G + 8}Z`} fill="#FFFFFF" /><path d={`M1330 ${G + 4} Q1440 ${G - 50 - sn * 20} 1550 ${G + 4}`} stroke={SEP} strokeWidth={1.6} fill="none" /></g>
      {/* the blizzard */}
      <g opacity={ph(draw, .4, 1) * (1 - under * .7)}>{Array.from({ length: 150 }, (_, i) => { const sp = .6 + rnd(i * 3) * .8, X = fr(rnd(i) + tm * .16 * sp) * 2300 - 200, Y = fr(rnd(i + 7) + tm * .1 * sp) * 900 - 100;
        return <path key={i} d={`M${f1(X)} ${f1(Y)} l${f1(16 * sp)} ${f1(5 * sp)}`} stroke="#FFFFFF" strokeWidth={1.4 + rnd(i + 2) * 1.6} strokeLinecap="round" opacity={.55 + rnd(i + 5) * .4} />; })}</g>
      <g opacity={ph(draw, .4, 1) * (1 - under * .7)} filter="url(#b2s)">{Array.from({ length: 26 }, (_, i) => { const X = fr(rnd(i + 90) + tm * .3) * 2400 - 240, Y = fr(rnd(i + 97) + tm * .18) * 1100 - 100;
        return <path key={i} d={`M${f1(X)} ${f1(Y)} l60 18`} stroke="#FFFFFF" strokeWidth={5 + rnd(i) * 4} strokeLinecap="round" opacity={.45} />; })}</g>
    </g>
  </g>;
};

// ================================================================ 3. SEA CHART — an old nautical chart: a big empty ocean, compass rose, rhumb lines, a coast at the left
// monster 0..1 a sea-serpent doodle in the lower right; moon 0..1 an inset Moon (near side drawn, far side blank); sound 0..1 soundings along a track.
const BlankSeaChart: React.FC<{ x?: N; y?: N; s?: N; draw?: N; monster?: N; moon?: N; sound?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, monster = 0, moon = 0, sound = 0, tm = 0 }) => {
  const id = 'sch' + Math.round(x), RC: Pt = [1080, 520];
  const coast = sm([[0, 60], [210, 90], [250, 170], [200, 250], [260, 330], [310, 380], [270, 460], [220, 540], [250, 640], [330, 700], [300, 790], [240, 860], [270, 940], [230, 1020]]);
  const track: Pt[] = [[340, 770], [600, 720], [880, 690], [1160, 700], [1420, 660], [1700, 600]];
  const SND = [1840, 2130, 2410, 2650, 2290, 1460, 980, 1720, 2480, 2760, 2590, 2210, 1930, 2040];
  return <g transform={TR(x, y, s)}>
    <rect x={-100} y={-100} width={2120} height={1280} fill="#E6D6B0" opacity={ph(draw, 0, .4)} />
    <rect x={58} y={52} width={1840} height={1020} fill="#1A1210" opacity={.3} filter="url(#b8)" />
    <rect x={40} y={30} width={1840} height={1020} fill="#F6EED8" opacity={ph(draw, 0, .4)} />
    {/* the graduated border */}
    <rect x={40} y={30} width={1840} height={1020} fill="none" stroke={SEP} strokeWidth={3} opacity={ph(draw, 0, .5)} /><rect x={58} y={48} width={1804} height={984} fill="none" stroke={SEP} strokeWidth={1.2} opacity={ph(draw, 0, .5)} />
    {Array.from({ length: 45 }, (_, i) => i % 2 ? <rect key={i} x={58 + i * 40.1} y={30} width={40} height={18} fill={SEP} opacity={.8 * ph(draw, .2, .7)} /> : null)}
    {Array.from({ length: 45 }, (_, i) => i % 2 ? <rect key={'b' + i} x={58 + i * 40.1} y={1032} width={40} height={18} fill={SEP} opacity={.8 * ph(draw, .2, .7)} /> : null)}
    {Array.from({ length: 25 }, (_, i) => i % 2 ? <rect key={'r' + i} x={1862} y={48 + i * 39.4} width={18} height={39} fill={SEP} opacity={.8 * ph(draw, .2, .7)} /> : null)}
    {/* rhumb lines from the rose */}
    <g opacity={.5 * ph(draw, .3, .9)}>{Array.from({ length: 32 }, (_, i) => { const an = i * 11.25 * D2R; return <path key={i} d={`M${RC[0]} ${RC[1]} L${f1(RC[0] + Math.cos(an) * 2200)} ${f1(RC[1] + Math.sin(an) * 2200)}`} stroke={i % 4 === 0 ? SEP : i % 2 === 0 ? '#4F7A4A' : VER} strokeWidth={i % 4 === 0 ? 1.1 : .7} />; })}</g>
    {/* the coast at the left edge: land, shore lines, little hills */}
    <RG d={`M-100 -100 L0 -100 L0 60 ${coast.replace(/^M[^C]+/, 'L0 60 ')} L230 1100 L-100 1100Z`} mat="sand" t={.32} draw={draw} sw={1.8} />
    {[10, 22, 36].map((o, i) => <path key={i} d={coast} stroke="#3E7FA3" strokeWidth={1} fill="none" opacity={.5 - i * .12} transform={`translate(${o} 0)`} />)}
    {[[90, 300], [130, 520], [70, 720], [120, 900], [80, 160]].map(([a, b], i) => <path key={'h' + i} d={`M${a - 22} ${b} q22 -30 44 0 M${a - 6} ${b - 8} q16 -22 32 0`} stroke={SEP} strokeWidth={1.2} fill="none" opacity={.7 * ph(draw, .4, 1)} />)}
    <rect x={480} y={110} width={460} height={110} rx={10} fill="#F6EED8" stroke={SEP} strokeWidth={2} opacity={ph(draw, .3, .8)} />
    <rect x={492} y={122} width={436} height={86} rx={6} fill="none" stroke={SEP} strokeWidth={.8} opacity={ph(draw, .3, .8)} />
    <Fell x={710} y={178} s={40} t="OCEANUS ATLANTICUS" sc a={ph(draw, .5, 1)} />
    <Rose cx={RC[0]} cy={RC[1]} r={170} a={ph(draw, .3, .9)} />
    {/* soundings along a ship's track */}
    {sound > 0 && <g>
      <path d={sm(track)} stroke={SEP} strokeWidth={1.4} fill="none" strokeDasharray="10 8" opacity={.8} />
      {SND.map((v, i) => { const u = (i + .5) / SND.length, a = cl(sound * SND.length - i); if (a <= 0) return null; const j = Math.min(track.length - 2, Math.floor(u * (track.length - 1))), t = u * (track.length - 1) - j;
        const px = lerp(track[j][0], track[j + 1][0], t), py = lerp(track[j][1], track[j + 1][1], t) + Math.sin(t * Math.PI) * 10;
        return <g key={i} opacity={a}><circle cx={px} cy={py} r={4} fill={SEP} /><text x={px} y={py - 14} fontSize={22} fontFamily={FIG} textAnchor="middle" fill={SEP}>{v}</text></g>; })}
    </g>}
    {/* the Moon inset: near side drawn, far side blank paper */}
    {moon > 0 && <g opacity={ph(moon, 0, .4)} transform={`translate(1600 250) scale(${f1(.7 + .3 * sst(moon))}) translate(-1600 -250)`}>
      <circle cx={1600} cy={250} r={150} fill="#F6EED8" stroke={SEP} strokeWidth={3} /><circle cx={1600} cy={250} r={138} fill="none" stroke={SEP} strokeWidth={1} />
      <path d="M1600 140 A110 110 0 0 0 1600 360Z" fill="#E4E1D8" stroke={SEP} strokeWidth={1.6} />
      {[[1545, 200, 26, 18], [1560, 262, 30, 22], [1528, 300, 16, 12], [1575, 180, 12, 10], [1580, 322, 14, 9]].map(([a, b, c, d2], i) => <ellipse key={i} cx={a} cy={b} rx={c} ry={d2} fill="#B3AFA4" opacity={.85} />)}
      {[[1540, 236, 5], [1586, 220, 4], [1566, 300, 6]].map(([a, b, c], i) => <circle key={'k' + i} cx={a} cy={b} r={c} fill="none" stroke={SEP} strokeWidth={.8} />)}
      <path d="M1600 140 A110 110 0 0 1 1600 360" stroke={SEP} strokeWidth={1.6} fill="none" strokeDasharray="8 7" />
      <Line d="M1600 140 V360" w={1} a={.6} />
      <text x={1655} y={268} fontSize={56} fontFamily="'La Belle Aurore', cursive" textAnchor="middle" fill={SEP} opacity={.7}>?</text>
    </g>}
    {/* the sea monster, in the corner */}
    {monster > 0 && <g transform={`translate(0 ${f1(Math.sin(tm * 1.4) * 3)})`}>
      {[[1440, 900, 46], [1540, 880, 52], [1640, 900, 40]].map(([a, b, r], i) => <path key={i} d={`M${a - r} ${b} Q${a} ${b - r * 1.6} ${a + r} ${b}Z`} fill="#7E9A7A" opacity={ph(monster, .3, .9)} stroke="none" />)}
      <Ink d="M1394 900 Q1440 826 1486 900 M1488 880 Q1540 798 1592 880 M1600 900 Q1640 836 1680 900" w={2} draw={monster} />
      <path d="M1700 900 Q1720 820 1770 800 Q1810 790 1830 812 L1806 822 L1826 834 Q1800 836 1782 828 Q1748 840 1736 900Z" fill="#7E9A7A" stroke={SEP} strokeWidth={2} opacity={ph(monster, .4, 1)} />
      <path d="M1744 812 l-10 -26 l18 14 l4 -24 l12 22 l10 -18 l4 22" stroke={SEP} strokeWidth={1.6} fill={VER} fillOpacity={.6} opacity={ph(monster, .5, 1)} />
      <circle cx={1792} cy={808} r={4} fill={SEP} opacity={ph(monster, .6, 1)} />
      <path d="M1390 905 q-30 -40 -10 -70 q10 -10 18 2" stroke={SEP} strokeWidth={2} fill="none" pathLength={1} strokeDasharray={`${ph(monster, .3, 1)} 1`} />
      <Ink d={`M1360 912 ${Array.from({ length: 10 }, (_, i) => `q20 -10 40 0`).join(' ')}`} w={1.4} draw={monster} />
    </g>}
    <KeyLight id={id} />
  </g>;
};

// ================================================================ 4. SURVEY SHIP — a 1950s oceanographic research ship, side view, the sea cut away below
// sail 0..1 carries it 900 px left→right; ping 0..1 sends three sonar pulses down to the floor; cable 0..1 pays out the tow cable with the
// magnetometer "fish"; xray 0..1 opens the fish (and enlarges it) to show the compass needle inside; needle −1..1 swings it.
const SurveyShip: React.FC<{ x?: N; y?: N; s?: N; draw?: N; sail?: N; ping?: N; cable?: N; xray?: N; needle?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, sail = 0, ping = 0, cable = 0, xray = 0, needle = 0, tm = 0 }) => {
  const id = 'svs' + Math.round(x), SL = 420, sx = 330 + sail * 900, bob = Math.sin(tm * 1.5) * 1.6;
  const floor = Array.from({ length: 25 }, (_, i) => [-100 + i * 90, 960 + Math.sin(i * 1.3) * 30 + rnd(i) * 40 - (i > 10 && i < 15 ? 60 : 0)] as Pt);
  const C0: Pt = [sx - 252, SL - 150], cb = sst(cable), F: Pt = [sx - 200 - cb * 260, SL + 60 + cb * 330], hullB: Pt = [sx + 40, SL + 36];
  const xr = sst(xray), fs = 1 + xr * 1.8, nAng = needle * 70 + Math.sin(tm * 21) * 3 * xr;
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sk', [[0, '#B9C8D0'], [1, '#E6EAE8']])}{grad(id + 'sea', [[0, '#4A88AE'], [.5, '#22507A'], [1, '#0E2A48']])}</defs>
    <rect x={-100} y={-100} width={2120} height={SL + 100} fill={`url(#${id}sk)`} opacity={ph(draw, 0, .5)} />
    <rect x={-100} y={SL} width={2120} height={800} fill={`url(#${id}sea)`} opacity={ph(draw, 0, .5)} />
    <circle cx={1640} cy={120} r={220} fill="#FFF4D2" opacity={.5} filter="url(#b30)" /><circle cx={1640} cy={120} r={40} fill="#FFF4D2" stroke="#F3D88E" strokeWidth={3} />
    {[0, 1, 2, 3].map(i => <path key={'sh' + i} d={`M${1300 + i * 200} ${SL} h70 L${700 + i * 200} 1000 h-140Z`} fill="#CDEBF5" opacity={.1} />)}
    <ellipse cx={sx - 20} cy={SL + 26} rx={240} ry={18} fill="#0E2A48" opacity={.35} filter="url(#b8)" />
    {Array.from({ length: 50 }, (_, i) => <circle key={i} cx={rnd(i * 4) * 1920} cy={SL + 40 + rnd(i * 7) * 520} r={1 + rnd(i) * 1.5} fill="#C9DDE6" opacity={.35} />)}
    <RG d={`M-100 1200 L${floor.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L')} L2020 1200Z`} color="#7E6E58" draw={draw} sw={1.8} />
    {/* sonar pulses */}
    {[0, 1, 2].map(j => { const p = ping * 3 - j; if (p <= 0 || p >= 1) return null; const rr2 = p * 560;
      return <g key={j}><path d={`M${f1(hullB[0] - rr2 * .9)} ${hullB[1]} A${f1(rr2 * .9)} ${f1(rr2)} 0 0 0 ${f1(hullB[0] + rr2 * .9)} ${hullB[1]}`} stroke="#CDEBF5" strokeWidth={3} fill="none" opacity={(1 - p) * .9} />
        {p > .85 && <ellipse cx={hullB[0]} cy={hullB[1] + 540} rx={160} ry={16} fill="#CDEBF5" opacity={(p - .85) * 4} filter="url(#b8)" />}</g>; })}
    {/* the tow cable and the magnetometer fish */}
    {cable > 0 && <g>
      <path d={`M${f1(C0[0])} ${f1(C0[1])} C${f1(C0[0] - 60)} ${SL + 10} ${f1(F[0] + 160)} ${f1(F[1] - 40)} ${f1(F[0] + 60)} ${f1(F[1])}`} stroke="#2B1D12" strokeWidth={2.4} fill="none" pathLength={1} strokeDasharray={`${cl(cable * 2.5)} 1`} />
      <g opacity={ph(cable, .2, .5)} transform={`translate(${f1(F[0])} ${f1(F[1])}) scale(${f1(fs)}) translate(${f1(-F[0])} ${f1(-F[1])})`}>
        <path d={`M${F[0] - 70} ${F[1] - 6} l-22 -18 l6 24 l-6 24 l22 -18Z`} fill="#C9902E" stroke={SEP} strokeWidth={1.4} />
        {/* lower half of the casing (fixed) + cavity */}
        <path d={`M${F[0] - 72} ${F[1]} L${F[0] + 40} ${F[1]} Q${F[0] + 66} ${F[1]} ${F[0] + 66} ${F[1]} Q${F[0] + 62} ${F[1] + 18} ${F[0] + 36} ${F[1] + 18} L${F[0] - 66} ${F[1] + 18} Q${F[0] - 74} ${F[1] + 10} ${F[0] - 72} ${F[1]}Z`} fill="#E8B84A" stroke={SEP} strokeWidth={1.6} />
        {xr > 0 && <g opacity={ph(xray, 0, .3)}>
          <path d={`M${F[0] - 64} ${F[1]} L${F[0] + 50} ${F[1]} L${F[0] + 44} ${F[1] + 12} L${F[0] - 60} ${F[1] + 12}Z`} fill="#3A2418" />
          <ellipse cx={F[0]} cy={F[1] + 2} rx={22} ry={10} fill="#FBF4E2" stroke={GOLD} strokeWidth={2} />
          <g transform={`translate(${F[0]} ${F[1] + 2}) scale(1 .45) rotate(${f1(nAng)})`}><path d="M0 -19 L4 0 L-4 0Z" fill={VER} /><path d="M0 19 L4 0 L-4 0Z" fill="#2E5C86" /></g>
          <circle cx={F[0]} cy={F[1] + 2} r={2} fill={GOLD} />
          {[-40, -26, 26, 40].map((o, i) => <path key={i} d={`M${F[0] + o} ${F[1] + 4} h4 v6 h-4Z`} fill="#8C6420" />)}
        </g>}
        {/* the upper half of the casing, hinged at the tail */}
        <g transform={`rotate(${f1(-xr * 38)} ${F[0] - 72} ${F[1]})`}>
          <path d={`M${F[0] - 72} ${F[1]} Q${F[0] - 72} ${F[1] - 18} ${F[0] - 60} ${F[1] - 18} L${F[0] + 36} ${F[1] - 18} Q${F[0] + 62} ${F[1] - 18} ${F[0] + 66} ${F[1]}Z`} fill="#F0C860" stroke={SEP} strokeWidth={1.6} />
          <path d={`M${F[0] - 50} ${F[1] - 12} H${F[0] + 30}`} stroke="#FFF4D2" strokeWidth={3} opacity={.7} />
        </g>
      </g>
    </g>}
    {/* the ship */}
    <g transform={`rotate(${f1(bob)} ${f1(sx)} ${SL})`}>
      <path d={`M${sx - 252} ${SL - 150} L${sx - 220} ${SL - 40} M${sx - 252} ${SL - 150} L${sx - 175} ${SL - 40}`} stroke="#5A5650" strokeWidth={6} />
      <Line d={`M${sx - 262} ${SL - 156} L${sx - 200} ${SL - 140}`} w={5} col="#5A5650" a={1} />
      <RG d={rr(sx - 70, SL - 104, 170, 66, 4)} color="#F4F2EA" draw={draw} sw={1.6} />
      <RG d={rr(sx - 30, SL - 148, 112, 46, 4)} color="#F4F2EA" draw={draw} sw={1.6} />
      {[0, 1, 2, 3].map(i => <rect key={i} x={sx - 20 + i * 26} y={SL - 138} width={18} height={14} fill="#3A4A6A" stroke={SEP} strokeWidth={.8} />)}
      <RG d={`M${sx - 52} ${SL - 104} L${sx - 44} ${SL - 182} L${sx - 4} ${SL - 182} L${sx - 2} ${SL - 104}Z`} color="#D9B57A" draw={draw} sw={1.6} />
      <path d={`M${sx - 44} ${SL - 182} L${sx - 4} ${SL - 182} L${sx - 5} ${SL - 166} L${sx - 46} ${SL - 166}Z`} fill="#2B1D12" />
      <Line d={`M${sx + 120} ${SL - 40} V${SL - 220} M${sx + 98} ${SL - 196} H${sx + 142}`} w={3.4} col="#4A4440" a={1} />
      <path d={`M${sx + 108} ${SL - 222} h24 v-8 h-24Z`} fill="#4A4440" />
      <Line d={`M${sx + 120} ${SL - 220} L${sx + 228} ${SL - 62} M${sx + 120} ${SL - 220} L${sx - 4} ${SL - 182}`} w={1} a={.6} />
      <RG d={`M${sx - 225} ${SL - 40} L${sx + 175} ${SL - 40} Q${sx + 218} ${SL - 44} ${sx + 238} ${SL - 66} L${sx + 204} ${SL + 30} Q${sx} ${SL + 42} ${sx - 200} ${SL + 32} L${sx - 225} ${SL - 40}Z`} color="#F4F2EA" draw={draw} sw={2} />
      <path d={`M${sx - 212} ${SL - 4} L${sx + 219} ${SL - 4} L${sx + 212} ${SL + 14} Q${sx} ${SL + 26} ${sx - 205} ${SL + 18}Z`} fill="#8C3424" opacity={.9} />
      <Line d={`M${sx - 222} ${SL - 30} L${sx + 190} ${SL - 30}`} w={1} a={.5} />
      {[-180, -140, -100, -60, 120, 150].map((o, i) => <circle key={i} cx={sx + o} cy={SL - 22} r={4.5} fill="#3A4A6A" stroke={SEP} strokeWidth={.8} />)}
    </g>
    <rect x={-100} y={SL} width={2120} height={60} fill="#22507A" opacity={.35} />
    <path d={`M-100 ${SL} ${Array.from({ length: 41 }, (_, i) => `Q${-100 + i * 54 + 13} ${SL - 5} ${-100 + i * 54 + 27} ${SL} T${-100 + i * 54 + 54} ${SL}`).join(' ')}`} stroke="#E8EEF0" strokeWidth={2} fill="none" opacity={.85 * ph(draw, .3, 1)} transform={`translate(${f1(-(tm * 24) % 54)} 0)`} />
    <path d={`M${sx - 230} ${SL + 2} q-60 6 -140 2 M${sx + 236} ${SL - 2} q30 6 60 2`} stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={.7 * cl(sail * 20)} />
    <KeyLight id={id} from="tr" a={.8} />
  </g>;
};

// ================================================================ 5. PEN RECORDER — a paper chart recorder on a ship's bench: a pen on a swinging arm, paper scrolling, a wiggly ink line
// k 0..1 how much line has been drawn (the paper scrolls left, the trace runs on); spill 0..1 the paper spills off the bench onto a chart below.
const PenRecorder: React.FC<{ x?: N; y?: N; s?: N; draw?: N; k?: N; spill?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, k = 0, spill = 0, tm = 0 }) => {
  const id = 'pen' + Math.round(x), Lp = k * 1400, PX = 1090, PY = 460, WX0 = 640, WX1 = 1250, WY0 = 330, WY1 = 590;
  const sig = (u: N) => { const env = .45 + .55 * cl(u / 700); return env * (58 * Math.sin(u / 41) + 30 * Math.sin(u / 13.7 + 1) + 26 * Math.tanh(4 * Math.sin(u / 97))); };
  const tip: Pt = [PX, PY + sig(Lp)], piv: Pt = [1330, 460];
  const trace: Pt[] = []; for (let u = Math.max(0, Lp - (PX - WX0)); u <= Lp; u += 3) trace.push([PX - (Lp - u), PY + sig(u)]);
  const ribbon = `M${WX0 - 20} 470 C560 476 520 530 520 600 C520 660 490 694 430 696 L260 696 C226 696 214 704 214 736 L214 900 C214 980 260 1000 360 992 C470 984 520 1010 640 1004 C760 998 820 1012 900 1000`;
  return <g transform={TR(x, y, s)}>
    <defs><clipPath id={id + 'w'}><rect x={WX0} y={WY0} width={WX1 - WX0} height={WY1 - WY0} /></clipPath></defs>
    {/* the cabin wall: painted steel, rivets, a porthole */}
    <rect x={-100} y={-100} width={2120} height={900} fill="#B8C2B0" opacity={ph(draw, 0, .5)} />
    {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={20 + i * 66} cy={90} r={4} fill="#8A9484" opacity={ph(draw, .3, .8)} />)}
    <Line d="M-100 100 H2020" w={2} a={.4} />
    <circle cx={1640} cy={260} r={124} fill="url(#gold)" stroke={SEP} strokeWidth={2.4} opacity={ph(draw, .1, .6)} />
    <circle cx={1640} cy={260} r={98} fill="#7FA8C4" stroke={SEP} strokeWidth={2} opacity={ph(draw, .1, .6)} />
    <path d={`M1544 ${270 + Math.sin(tm * .9) * 18} Q1640 ${262 + Math.sin(tm * .9) * 18} 1736 ${254 + Math.sin(tm * .9) * 18} L1736 360 L1544 360Z`} fill="#22507A" opacity={.85 * ph(draw, .2, .7)} />
    <path d="M1590 200 q30 -24 70 -18" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={.5} />
    {/* the chart on the floor, under the bench */}
    <rect x={-100} y={800} width={2120} height={400} fill="#6A5444" opacity={ph(draw, 0, .5)} />
    <g opacity={ph(draw, .2, .7)}><path d="M120 880 L1500 860 L1560 1100 L60 1100Z" fill="#F1E6CA" stroke={SEP} strokeWidth={1.6} />
      {Array.from({ length: 9 }, (_, i) => <Line key={i} d={`M${130 + i * 170} 878 L${70 + i * 186} 1100`} w={.6} col="#3E7FA3" a={.5} />)}
      {Array.from({ length: 4 }, (_, i) => <Line key={'h' + i} d={`M${110 - i * 14} ${900 + i * 55} L${1505 + i * 14} ${878 + i * 58}`} w={.6} col="#3E7FA3" a={.5} />)}
      <path d="M1300 862 Q1340 940 1300 1000 Q1290 1050 1340 1100 L1560 1100 L1500 860Z" fill="#E2CF94" stroke={SEP} strokeWidth={1.2} /></g>
    {/* the bench */}
    <RG d="M180 686 H1760 V722 H180Z" mat="wood" t={.45} draw={draw} sw={1.8} />
    <ellipse cx={968} cy={884} rx={860} ry={16} fill="#1A1210" opacity={.35} filter="url(#b8)" />
    <RG d="M200 722 H236 V880 H200Z M1700 722 H1736 V880 H1700Z" mat="wood" t={.7} draw={draw} sw={1.4} />
    {/* the paper ribbon: out of the machine, across the bench, over the edge and onto the chart */}
    <g opacity={ph(draw, .4, 1)}>
      <path d={ribbon} stroke={SEP} strokeWidth={66} fill="none" pathLength={1} strokeDasharray={`${.27 + .73 * spill} 1`} strokeLinecap="butt" />
      <path d={ribbon} stroke="#FBF4E2" strokeWidth={62} fill="none" pathLength={1} strokeDasharray={`${.27 + .73 * spill} 1`} strokeLinecap="butt" />
      <path d={ribbon} stroke={IND} strokeWidth={1.8} fill="none" pathLength={1} strokeDasharray={`${(.27 + .73 * spill) * .98} 1`} opacity={.7} transform="translate(0 6)" />
    </g>
    {/* the recorder housing, its shadow cast on the wall by the porthole light */}
    <path d={rr(530, 268, 840, 430, 18)} fill="#2B2620" opacity={.25} filter="url(#b8)" />
    <RG d={rr(560, 250, 840, 430, 18)} color="#7E8C7A" draw={draw} sw={2.2} />
    <RG d={rr(600, 300, 690, 320, 8)} color="#4A5448" draw={draw} sw={1.6} />
    {[[580, 270], [1380, 270], [580, 660], [1380, 660]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill="#5A6658" stroke={SEP} strokeWidth={1} />)}
    <circle cx={1350} cy={620} r={16} fill="#2B2620" stroke={SEP} strokeWidth={1.4} /><Line d="M1350 620 l8 -10" w={2.4} col="#E8EEF0" a={1} />
    <circle cx={1310} cy={620} r={8} fill={VER} opacity={.6 + .4 * Math.abs(Math.sin(tm * 3))} />
    {/* the paper in the window: graph paper scrolling left */}
    <g clipPath={`url(#${id}w)`}>
      <rect x={WX0} y={WY0} width={WX1 - WX0} height={WY1 - WY0} fill="#FBF4E2" />
      {Array.from({ length: 22 }, (_, i) => { const gx = WX1 - fr((i * 30 + Lp) / 660) * 660; return <Line key={i} d={`M${f1(gx)} ${WY0} V${WY1}`} w={i % 5 === 0 ? 1.1 : .5} col="#5F8A5A" a={.5} />; })}
      {Array.from({ length: 9 }, (_, i) => <Line key={'h' + i} d={`M${WX0} ${WY0 + 10 + i * 30} H${WX1}`} w={i === 4 ? 1.1 : .5} col="#5F8A5A" a={.5} />)}
      {trace.length > 1 && <path d={pathOf(trace)} stroke={IND} strokeWidth={2.6} fill="none" strokeLinejoin="round" />}
    </g>
    <Ink d={rr(WX0, WY0, WX1 - WX0, WY1 - WY0, 2)} w={1.6} draw={draw} />
    {/* the supply roll at the right of the window */}
    <RG d={rr(1252, 318, 46, 284, 20)} color="#EFE6CC" draw={draw} sw={1.6} />
    <Line d="M1262 330 V590 M1276 330 V590" w={.7} a={.5} />
    {/* the pen on its swinging arm */}
    <path d={`M${f1(piv[0])} ${piv[1]} L${f1(tip[0] + 22)} ${f1(tip[1])}`} stroke="#3A3A3A" strokeWidth={5} strokeLinecap="round" />
    <path d={`M${f1(piv[0])} ${piv[1]} L${f1(tip[0] + 22)} ${f1(tip[1])}`} stroke="#C9C6BE" strokeWidth={2} strokeLinecap="round" />
    <circle cx={piv[0]} cy={piv[1]} r={18} fill="#5A5650" stroke={SEP} strokeWidth={1.6} /><circle cx={piv[0]} cy={piv[1]} r={6} fill={GOLD} />
    <path d={`M${f1(tip[0] + 30)} ${f1(tip[1] - 10)} L${f1(tip[0] + 6)} ${f1(tip[1] - 6)} L${f1(tip[0])} ${f1(tip[1])} L${f1(tip[0] + 6)} ${f1(tip[1] + 6)} L${f1(tip[0] + 30)} ${f1(tip[1] + 10)}Z`} fill="#2E3E66" stroke={SEP} strokeWidth={1.2} />
    <circle cx={tip[0]} cy={tip[1]} r={2.6} fill={IND} />
    {/* paper exit slot */}
    <rect x={548} y={440} width={24} height={60} fill="#2B2620" />
    <KeyLight id={id} from="tr" />
  </g>;
};

// ================================================================ 6. STRIPE FLOOR — the ocean floor in a 3/4 aerial view (a geologist's block diagram drawn as a scene):
// the sea surface at the top with the survey ship towing its magnetometer, light falling through the water from the upper right, the floor
// receding into blue haze, the ridge a rugged mountain chain down the middle (a glowing rift in its crest), the magnetic stripes as muted ink
// washes (ochre = normal, teal-grey = reversed) lying ON the floor, mirrored either side. The scene sits on the cream paper (soft vignette).
// k 0..1 fills the bands outward from the ridge; piano 0..1 the near ends of the stripes become a piano keyboard (ivory and raised ebony keys
// under a wooden fallboard); pair 0..5 lights twin pairs (and arcs join each pair over the ridge); fold 0..1 the right half lifts like a page
// about the ridge, curls through the air (its shadow sweeping over the left half) and lands on its twins (vermilion flash at 1); wing 0..1 the
// two halves become butterfly wings that rise and beat (tm).
const SW = [32, 34, 20, 50, 16, 38, 26, 62, 18, 44, 30, 70, 22, 52, 36, 80, 24, 58, 30, 66];   // half-width of the centre band, then each band outward (px)
const SB = (() => { const o: [N, N][] = [[0, SW[0]]]; let a = SW[0]; for (let i = 1; i < SW.length; i++) { o.push([a, a + SW[i]]); a += SW[i]; } return o; })();
const SFK = 1.2, SDM = SB[SB.length - 1][1] * SFK;   // world units per band px; the striped half-width
const polyArea = (pts: Pt[]) => pts.reduce((a, p, i) => { const q = pts[(i + 1) % pts.length]; return a + p[0] * q[1] - q[0] * p[1]; }, 0);
// a small 1950s survey ship in profile (bow to the right), waterline at (x, y), length ≈ 200·s
const TinyShip: React.FC<{ x: N; y: N; s?: N; tm?: N }> = ({ x, y, s = 1, tm = 0 }) => <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(Math.sin(tm * 1.5) * 1.4)}) scale(${s})`}>
  <path d="M-100 -22 L84 -22 Q104 -24 112 -36 L100 8 Q0 16 -92 10Z" fill="#F1EDE2" stroke={SEP} strokeWidth={2} />
  <path d="M-95 -2 L106 -2 L101 8 Q0 16 -92 10Z" fill="#8C3424" />
  <path d="M-30 -22 V-52 H40 V-22Z M-10 -52 V-74 H34 V-52Z" fill="#F1EDE2" stroke={SEP} strokeWidth={1.6} />
  {[0, 1, 2].map(i => <rect key={i} x={-4 + i * 12} y={-68} width={8} height={7} fill="#3A4A6A" />)}
  <path d="M-22 -52 L-19 -92 H-3 L-2 -52Z" fill="#D9B57A" stroke={SEP} strokeWidth={1.4} /><path d="M-19 -92 H-3 V-84 H-19Z" fill="#2B1D12" />
  <path d="M62 -22 V-110 M50 -96 H74 M-88 -22 V-70 L-104 -62" stroke="#4A4440" strokeWidth={2.4} fill="none" />
  <path d="M-12 -98 q-30 -18 -64 -14" stroke="#9A968E" strokeWidth={6} fill="none" opacity={.5} strokeLinecap="round" />
</g>;
const StripeFloor: React.FC<{ x?: N; y?: N; s?: N; draw?: N; k?: N; piano?: N; pair?: N; fold?: N; wing?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, k = 0, piano = 0, pair = 0, fold = 0, wing = 0, tm = 0 }) => {
  const id = 'stf' + Math.round(x), F = 860, Z0 = 900, HY = 236, CH = 820, ZN = 120, ZF = 3800, DM = SDM;
  const P = (X: N, Y: N, Z: N): Pt => { const q = F / (Z + Z0); return [960 + X * q, HY + (CH - Y) * q]; };
  const rz = (Z: N) => 24 * Math.sin(Z / 560 + .6) + 12 * Math.sin(Z / 210);
  const qN = F / (ZN + Z0), qF = F / (ZF + Z0), Zq = (u: N) => F / lerp(qN, qF, u) - Z0;   // depth at screen fraction u (0 near … 1 far)
  const pk = sst(piano), ZB = ZN + 330, ZK = ZN + 950;
  const ZS = [...Array.from({ length: 17 }, (_, i) => Zq(i / 16)), ...(pk > 0 ? [ZB, ZK] : [])].sort((a, b) => a - b);
  const HAZE = '#7F9396', fogOf = (Z: N) => .97 * Math.pow(cl((Z - ZN) / (ZF - ZN)), .9);
  const wa = wing * (.07 + .07 * Math.sin(tm * Math.PI * 2 * .7)), fb = Math.PI * sst(fold), curlA = .42 * Math.sin(Math.PI * cl(fold));
  const thL = () => wa, thR = (d: N) => Math.min(Math.PI, fb + curlA * Math.pow(d / DM, 1.4)) + wa, flat = () => 0;
  const W = (sd: N, th: (d: N) => N) => (d: N, Z: N, Y0 = 0): Pt => { const t = th(d), r = rz(Z); return P(r + sd * (d * Math.cos(t) - Y0 * Math.sin(t)), d * Math.sin(t) + Y0 * Math.cos(t), Z); };
  const lum = (sd: N, t: N, back: boolean) => { const nx = -Math.sin(t) * sd, ny = Math.cos(t), dd = (nx * .45 + ny * .89) * (back ? -1 : 1); return .28 + .72 * Math.max(0, dd); };
  const NORM = '#C9A266', REV = '#5A7472', PLAIN = '#9C927F', BARE = '#625A50', IVORY = '#F1E8D2', EBONY = '#26201B', PAPB = '#EDE3CC';
  const n = SB.length, nb = (i: N) => i % 2 === 0, litOf = (i: N) => i >= 1 && i <= 5 ? cl(pair - (i - 1)) : 0;
  const bandCol = (i: N, Z: N) => { const a = cl(k * n * 1.05 - i), lit = litOf(i);
    let c = mix(PLAIN, nb(i) ? mix(NORM, '#EDCF92', lit) : mix(REV, '#8FAAA4', lit), a);
    if (pk > 0 && Z < ZK) c = mix(c, nb(i) || Z < ZB ? IVORY : EBONY, pk);
    return c; };
  // one half of the striped floor (sd −1 left, +1 right) under the angle function th: segments, back faces, shading, haze
  const half = (sd: N, th: (d: N) => N) => { const Wf = W(sd, th), fw = W(sd, flat), ref = Math.sign(polyArea([fw(0, ZN), fw(100, ZN), fw(100, ZN + 300), fw(0, ZN + 300)]));
    const out: React.ReactNode[] = [];
    SB.forEach(([b0, b1], i) => { const d0 = b0 * SFK, d1 = b1 * SFK, tm2 = th((d0 + d1) / 2);
      for (let j = 0; j < ZS.length - 1; j++) { const Za = ZS[j], Zb = ZS[j + 1], Zm = (Za + Zb) / 2; if (Zb - Za < 1) continue;
        const pts = [Wf(d0, Za), Wf(d1, Za), Wf(d1, Zb), Wf(d0, Zb)], back = Math.sign(polyArea(pts)) !== ref, c0 = bandCol(i, Zm);
        const c = mix(mix(back ? mix(c0, PAPB, .15) : c0, '#2A2A34', cl((.92 - lum(sd, tm2, back)) * .7)), HAZE, fogOf(Zm) * (1 - .5 * Math.sin(tm2 > 3.1 ? 0 : tm2)));
        out.push(<path key={i + '_' + j} d={pathOf(pts, true)} fill={c} stroke={c} strokeWidth={.7} opacity={back ? .93 : 1} />); } });
    // abyssal hills: little ink ticks running with the ridge
    for (let i = 0; i < 60; i++) { const d = rnd(i * 3.3 + sd) * DM, Z = Zq(rnd(i * 5.1 + sd) * .9); out.push(<path key={'h' + i} d={pathOf([Wf(d, Z), Wf(d, Z + 70 + rnd(i) * 80)])} stroke={SEP} strokeWidth={1.1} opacity={.32 * (1 - fogOf(Z))} />); }
    // piano: raised ebony keys, key gaps
    if (pk > 0) { SB.forEach(([b0, b1], i) => { const d0 = b0 * SFK + 3, d1 = b1 * SFK - 3, h = 34 * pk; if (nb(i)) return;
        out.push(<g key={'k' + i}><path d={pathOf([Wf(d0, ZB, 0), Wf(d1, ZB, 0), Wf(d1, ZB, h), Wf(d0, ZB, h)], true)} fill="#120E0B" />
          <path d={pathOf([Wf(d0, ZB, h), Wf(d1, ZB, h), Wf(d1, ZK, h), Wf(d0, ZK, h)], true)} fill={EBONY} stroke={SEP} strokeWidth={1} />
          <path d={pathOf([Wf(d0, ZB, h), Wf(d1, ZB, h)])} stroke="#8A8278" strokeWidth={1.6} opacity={pk} /></g>); });
      SB.forEach(([, b1], i) => out.push(<path key={'g' + i} d={pathOf([Wf(b1 * SFK, ZN), Wf(b1 * SFK, nb(i) || nb(i + 1) ? ZK : ZB)])} stroke={SEP} strokeWidth={1.3} opacity={.75 * pk} />)); }
    return out; };
  // a flat strip of floor (plain beyond the stripes, or the bare rock under the lifted page)
  const flatStrip = (sd: N, d0: N, d1: N, col: string) => { const fw = W(sd, flat);
    return ZS.slice(0, -1).map((Za, j) => { const Zb = ZS[j + 1], c = mix(col, HAZE, fogOf((Za + Zb) / 2)); return <path key={sd + col + j} d={pathOf([fw(d0, Za), fw(d1, Za), fw(d1, Zb), fw(d0, Zb)], true)} fill={c} stroke={c} strokeWidth={.7} />; }); };
  // the wing outline (normalised polar about the floor's centre), morphing from the whole half to a wing
  const Zc = (ZN + ZF) / 2, Hz = (ZF - ZN) / 2;
  const wingClip = (sd: N, th: (d: N) => N) => { const Wf = W(sd, th), pts: Pt[] = [];
    for (let a = -90; a <= 90; a += 3) { const t = a * D2R, rRect = Math.min(1.04 / Math.max(.001, Math.cos(t)), 1.04 / Math.max(.001, Math.abs(Math.sin(t))));
      const rW = Math.max(.1, 1.3 * Math.exp(-(((a - 30) / 34) ** 2)) + 1.12 * Math.exp(-(((a + 42) / 30) ** 2))), r = lerp(rRect, rW, sst(wing));
      pts.push(Wf(Math.max(0, Math.cos(t) * r) * DM, Zq(cl(.5 + Math.sin(t) * r * .5, -.02, 1.02)))); }
    return pathOf(pts, true); };
  // the ridge: a rugged mountain chain modelled as a height-field (twin crests either side of a rift), shaded by its slope to the light from
  // the upper right, hazed with depth; a glowing rift along its crest
  const ridgeA = 1 - wing;
  const ridge = (() => { if (ridgeA <= 0) return null; const NR = 46, XR = [-180, -140, -105, -76, -54, -38, -24, -11, 0, 11, 24, 38, 54, 76, 105, 140, 180];
    const hR = (xo: N, Z: N) => { const ax = Math.abs(xo), env = .45 * Math.max(0, 1 - ax / 180) ** 1.2 + .7 * Math.exp(-(((ax - 26) / 22) ** 2)) - .4 * Math.exp(-((xo / 10) ** 2));
      return Math.max(0, env) * (1 - .85 * Math.sin(Math.PI * cl(fold))) * (250 + 70 * Math.sin(Z / 330 + 1)) * (.62 + .3 * Math.abs(Math.sin(Z / 140 + xo / 60)) + .12 * Math.sin(Z / 41 - xo / 37) + .08 * Math.sin(Z / 17 + xo / 9)); };
    const Lx = .5, Ly = .8, Lz = -.33, quads: React.ReactNode[] = [], crestL: Pt[] = [], crestR: Pt[] = [], rift: Pt[] = [];
    for (let j = NR - 1; j >= 0; j--) { const Za = Zq((j + 1) / NR), Zb = Zq(j / NR), ra = rz(Za), rb = rz(Zb), fg = fogOf((Za + Zb) / 2), a = Zb < ZK ? 1 - pk : 1; if (a <= 0) continue;
      const order = [...Array.from({ length: 8 }, (_, i) => i), ...Array.from({ length: 8 }, (_, i) => 15 - i)];
      for (const i of order) { const x0 = XR[i], x1 = XR[i + 1], h0a = hR(x0, Za), h1a = hR(x1, Za), h0b = hR(x0, Zb), h1b = hR(x1, Zb);
        const ux = x1 - x0, uy = h1a - h0a, vy = h0b - h0a, vz = Zb - Za; let nx = uy * vz, ny = -ux * vz, nz = ux * vy; if (ny < 0) { nx = -nx; ny = -ny; nz = -nz; }
        const nl = Math.hypot(nx, ny, nz) || 1, sh = .22 + .78 * Math.max(0, (nx * Lx + ny * Ly + nz * Lz) / nl), c = mix(mix('#34302E', '#9C8C74', sh), HAZE, fg);
        quads.push(<path key={j + '_' + i} d={pathOf([P(ra + x0, h0a, Za), P(ra + x1, h1a, Za), P(rb + x1, h1b, Zb), P(rb + x0, h0b, Zb)], true)} fill={c} stroke={c} strokeWidth={.8} opacity={a} />); }
      if (a > .5) { crestL.push(P(rb - 30, hR(-30, Zb), Zb)); crestR.push(P(rb + 30, hR(30, Zb), Zb)); rift.push(P(rb, hR(0, Zb), Zb)); } }
    const nearRow = pk > 0 ? null : XR.map(xo => P(rz(ZN) + xo, hR(xo, ZN), ZN));
    return <g>{quads}
      <path d={pathOf(crestL)} stroke={SEP} strokeWidth={1.4} fill="none" opacity={.55} /><path d={pathOf(crestR)} stroke={SEP} strokeWidth={1.4} fill="none" opacity={.55} />
      {nearRow && <path d={pathOf(nearRow)} stroke={SEP} strokeWidth={2} fill="none" />}
      {rift.length > 1 && <g opacity={ridgeA * (.65 + .25 * Math.sin(tm * 2.4))}><path d={pathOf(rift)} stroke="#F2A060" strokeWidth={12} fill="none" opacity={.5} filter="url(#b8)" />
        <path d={pathOf(rift)} stroke="#E8743A" strokeWidth={2.4} fill="none" /></g>}</g>; })();
  const nearY = P(0, 0, ZN)[1], farY = P(0, 0, ZF)[1], SL = 92;
  const fish: Pt = [1000 + Math.sin(tm * .7) * 10, 330 + Math.sin(tm * 1.1) * 6];
  const pageOn = fold > 0 || wa > 0;
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'w', [[0, '#DCE3DA'], [.3, '#A9BDBC'], [1, HAZE]])}
      <mask id={id + 'm'} maskUnits="userSpaceOnUse" x={-100} y={-100} width={2120} height={1280}><rect x={90} y={24} width={1740} height={1030} rx={40} fill="#FFFFFF" filter="url(#b30)" /></mask>
      {wing > 0 && <><clipPath id={id + 'L'}><path d={wingClip(-1, thL)} /></clipPath><clipPath id={id + 'R'}><path d={wingClip(1, thR)} /></clipPath></>}</defs>
    <g mask={`url(#${id}m)`} opacity={ph(draw, 0, .6)}>
      {/* sky, the sea surface, the water column with light falling through it from the upper right */}
      <rect x={-100} y={-100} width={2120} height={SL + 100} fill="#EDE6D2" />
      <rect x={-100} y={SL} width={2120} height={farY - SL + 30} fill={`url(#${id}w)`} />
      {[0, 1, 2, 3, 4].map(i => { const x0 = 1180 + i * 170 + Math.sin(tm * .5 + i) * 14; return <path key={i} d={`M${f1(x0)} ${SL} L${f1(x0 + 70 + i * 6)} ${SL} L${f1(x0 - 520 + i * 40)} ${f1(farY + 40)} L${f1(x0 - 640 + i * 40)} ${f1(farY + 40)}Z`} fill="#FFF8E6" opacity={.13} />; })}
      {/* the floor beyond the stripes, and the bare rock under a lifted half */}
      {flatStrip(-1, DM, DM + 2800, PLAIN)}{flatStrip(1, DM, DM + 2800, PLAIN)}
      {pageOn && flatStrip(1, 0, DM, BARE)}{wing > 0 && flatStrip(-1, 0, DM, BARE)}
      {/* the left half of the striped floor */}
      <g clipPath={wing > 0 ? `url(#${id}L)` : undefined}>{half(-1, thL)}</g>
      {/* the page's shadow (light from the upper right): it sweeps over the left half as the right half comes over */}
      {fold > 0 && fold < 1 && (() => { const pts: Pt[] = []; const sh = (d: N, Z: N): Pt => { const t = thR(d), r = rz(Z), X = r + d * Math.cos(t), Yw = d * Math.sin(t); return P(X - Yw * .55, 0, Z + Yw * .08); };
        for (let i = 0; i <= 12; i++) pts.push(sh(DM * i / 12, ZN)); for (let i = 1; i <= 8; i++) pts.push(sh(DM, lerp(ZN, ZF, i / 8))); for (let i = 11; i >= 0; i--) pts.push(sh(DM * i / 12, ZF));
        return <path d={pathOf(pts, true)} fill="#1C1A22" opacity={.55 * Math.sin(Math.PI * cl(fold))} filter="url(#b8)" />; })()}
      {pageOn && fold < .95 && ridge}
      {/* the cut front edge of the floor: the magnetised layer over dark basalt */}
      {(() => { const out: React.ReactNode[] = [], fy = (X: N) => P(X, 0, ZN), r0 = rz(ZN);
        out.push(<path key="base" d={`M${f1(fy(r0 - DM - 2800)[0])} ${f1(nearY)} H${f1(fy(r0 + DM + 2800)[0])} V${f1(nearY + 70)} H${f1(fy(r0 - DM - 2800)[0])}Z`} fill="#5A4E44" />);
        [-1, 1].forEach(sd => SB.forEach(([b0, b1], i) => { if (sd > 0 && pageOn) return; const xa = fy(r0 + sd * b0 * SFK)[0], xb = fy(r0 + sd * b1 * SFK)[0], c = mix(mix(bandCol(i, ZN), '#2B1D12', .22), IVORY, pk * .8);
          out.push(<path key={sd + '_' + i} d={`M${f1(xa)} ${f1(nearY)} H${f1(xb)} V${f1(nearY + 24)} H${f1(xa)}Z`} fill={c} stroke={pk > 0 ? SEP : c} strokeWidth={pk > 0 ? 1 : .6} />); }));
        out.push(<path key="l" d={`M-100 ${f1(nearY)} H2020 M-100 ${f1(nearY + 70)} H2020`} stroke={SEP} strokeWidth={1.8} opacity={.8} />);
        for (let i = 0; i < 26; i++) { const xx = 40 + i * 72 + rnd(i) * 30; out.push(<path key={'dk' + i} d={`M${f1(xx)} ${f1(nearY + 28)} l${f1((rnd(i + 3) - .5) * 10)} 40`} stroke="#3A322C" strokeWidth={2} opacity={.6} />); }
        return out; })()}
    </g>
    {/* the sea surface and the ship towing its magnetometer (on top of the mask, so they read crisply) */}
    <g opacity={ph(draw, .2, .8)}>
      <path d={`M120 ${SL} ${Array.from({ length: 32 }, (_, i) => `Q${120 + i * 53 + 13} ${SL - 5} ${120 + i * 53 + 26} ${SL} T${120 + i * 53 + 53} ${SL}`).join(' ')}`} stroke={SEP} strokeWidth={1.6} fill="none" opacity={.75} transform={`translate(${f1(-(tm * 18) % 53)} 0)`} />
      <path d={`M1200 ${SL + 4} C1150 ${SL + 60} ${f1(fish[0] + 160)} ${f1(fish[1] - 80)} ${f1(fish[0] + 40)} ${f1(fish[1])}`} stroke="#2B1D12" strokeWidth={2} fill="none" />
      <g transform={`translate(${f1(fish[0])} ${f1(fish[1])})`}><path d="M-40 0 Q-36 -10 0 -10 L30 -8 Q44 0 30 8 L0 10 Q-36 10 -40 0Z" fill="#E8B84A" stroke={SEP} strokeWidth={1.4} />
        <path d="M-40 0 l-14 -12 l4 12 l-4 12Z" fill="#C9902E" stroke={SEP} strokeWidth={1.2} /></g>
      <TinyShip x={1290} y={SL} s={.62} tm={tm} />
      <path d={`M1216 ${SL + 2} q-50 6 -110 1`} stroke="#FFFFFF" strokeWidth={2.4} fill="none" opacity={.8} />
    </g>
    <g mask={`url(#${id}m)`} opacity={ph(draw, .3, .9)}>
      {/* the right half: flat, or the page lifting about the ridge */}
      <g clipPath={wing > 0 ? `url(#${id}R)` : undefined}>{half(1, thR)}</g>
      {(!pageOn || fold >= .95) && ridge}
      {fold > 0 && fold < 1 && (() => { const Wf = W(1, thR), edge: Pt[] = [];
        for (let i = 0; i <= 16; i++) edge.push(Wf(DM * i / 16, ZN)); for (let i = 1; i <= 10; i++) edge.push(Wf(DM, lerp(ZN, ZF, i / 10))); for (let i = 15; i >= 0; i--) edge.push(Wf(DM * i / 16, ZF));
        return <g><path d={pathOf(Array.from({ length: 17 }, (_, i) => Wf(DM * i / 16, ZN)))} stroke={PAPB} strokeWidth={7} fill="none" />
          <path d={pathOf(edge)} stroke={SEP} strokeWidth={2.2} fill="none" strokeLinejoin="round" />
          {/* a hand holds the near outer corner and turns the page */}
          {(() => { const C = Wf(DM - 30, ZN + 180), In = Wf(DM - 300, ZN + 260), ang = Math.atan2(In[1] - C[1], In[0] - C[0]) * 180 / Math.PI, hs = 1.7, ha = ph(fold, 0, .08) * (1 - ph(fold, .88, 1));
            return <g opacity={ha} transform={`translate(${f1(C[0])} ${f1(C[1])}) rotate(${f1(ang)}) translate(${f1(-178 * hs)} ${f1(9 * hs)})`}>
              <g fill="#1C1A22" opacity={.35} filter="url(#b8)" transform="translate(10 18)"><FlatHand x={0} y={0} s={hs} id={id + 'hs'} sil /></g>
              <FlatHand x={0} y={0} s={hs} id={id + 'hh'} /></g>; })()}</g>; })()}
      {/* the fallboard the keys run under */}
      {pk > 0 && (() => { const r = rz(ZK), a = P(r - DM - 30, 0, ZK), b = P(r + DM + 30, 0, ZK), c = P(r + DM + 30, 90, ZK), d = P(r - DM - 30, 90, ZK), c2 = P(r + DM + 30, 90, ZK + 150), d2 = P(r - DM - 30, 90, ZK + 150);
        return <g opacity={pk}><path d={pathOf([d, c, c2, d2], true)} fill="#8C5A36" stroke={SEP} strokeWidth={1.4} /><path d={pathOf([a, b, c, d], true)} fill="#5A3622" stroke={SEP} strokeWidth={1.6} />
          <path d={pathOf([P(r - DM, 60, ZK), P(r + DM, 60, ZK)])} stroke="#D9AE4C" strokeWidth={2} opacity={.7} /></g>; })()}
      {/* twin pairs joined over the ridge */}
      {pair > 0 && fold < .2 && [1, 2, 3, 4, 5].map(i => { const lit = litOf(i); if (lit <= 0) return null; const dc = (SB[i][0] + SB[i][1]) / 2 * SFK, Zp = ZN + 120 + i * 50, r = rz(Zp), a = P(r - dc, 0, Zp), b = P(r + dc, 0, Zp), c = P(r, dc * .7, Zp);
        return <g key={i} opacity={lit * (1 - fold * 5)}><path d={`M${f1(a[0])} ${f1(a[1])} Q${f1(c[0])} ${f1(2 * c[1] - (a[1] + b[1]) / 2)} ${f1(b[0])} ${f1(b[1])}`} stroke="#FFF4D2" strokeWidth={7} fill="none" opacity={.5} filter="url(#b2s)" />
          <path d={`M${f1(a[0])} ${f1(a[1])} Q${f1(c[0])} ${f1(2 * c[1] - (a[1] + b[1]) / 2)} ${f1(b[0])} ${f1(b[1])}`} stroke="#D9AE4C" strokeWidth={2.6} fill="none" strokeDasharray="12 8" />
          <circle cx={a[0]} cy={a[1]} r={6} fill="#D9AE4C" stroke={SEP} strokeWidth={1} /><circle cx={b[0]} cy={b[1]} r={6} fill="#D9AE4C" stroke={SEP} strokeWidth={1} /></g>; })}
      {/* landed: the seam flashes */}
      {fold > .85 && (() => { const L2 = Array.from({ length: 24 }, (_, i) => { const Z = Zq(i / 23); return P(rz(Z), 0, Z); });
        return <g opacity={ph(fold, .85, 1)}><path d={pathOf(L2)} stroke="#FFD9B0" strokeWidth={26} fill="none" opacity={.5} filter="url(#b8)" /><path d={pathOf(L2)} stroke={VER} strokeWidth={6} fill="none" /></g>; })()}
      {/* the butterfly's body and antennae, lying along the ridge */}
      {wing > 0 && (() => { const Zat = (v: N) => Zq(cl(.5 + v * .5, -.05, 1.1)), L: Pt[] = [], R: Pt[] = [];
        for (let i = 0; i <= 20; i++) { const v = lerp(-.62, .6, i / 20), Z = Zat(v), w = 70 * Math.sqrt(Math.max(0, Math.sin(Math.PI * (i / 20)))) * (i > 13 ? 1.3 : 1); L.push(P(rz(Z) - w, 40, Z)); R.push(P(rz(Z) + w, 40, Z)); }
        const hd = P(rz(Zat(.68)), 60, Zat(.68)), qh = F / (Zat(.68) + Z0);
        return <g opacity={sst(wing)}><path d={pathOf([...L, ...R.reverse()], true)} fill="#2B1D12" stroke={SEP} strokeWidth={2} />
          {Array.from({ length: 8 }, (_, i) => { const Z = Zat(lerp(-.5, .3, i / 7)); return <path key={i} d={pathOf([P(rz(Z) - 36, 40, Z), P(rz(Z) + 36, 40, Z)])} stroke="#8C6E4A" strokeWidth={1.4} opacity={.8} />; })}
          <circle cx={hd[0]} cy={hd[1]} r={95 * qh} fill="#2B1D12" />
          {[-1, 1].map(sd => { const a = P(rz(Zat(.7)) + sd * 20, 70, Zat(.7)), b = P(rz(Zat(.95)) + sd * 160, 260, Zat(.95)), c = P(rz(Zat(1.05)) + sd * 300, 320, Zat(1.05));
            return <g key={sd}><path d={`M${f1(a[0])} ${f1(a[1])} Q${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])}`} stroke="#2B1D12" strokeWidth={3.4} fill="none" /><circle cx={c[0]} cy={c[1]} r={7} fill="#2B1D12" /></g>; })}</g>; })()}
    </g>
  </g>;
};

// ================================================================ 7. RIDGE GLOBE — the globe with the mid-ocean ridge as a vermilion seam (stitched like a ball's seam)
// k 0..1 draws the ridge on (Atlantic first); spin: rotation in turns (continuous).
const seamStitches = (R: Pt[][], every = 3, len = 9) => R.map((run, j) => run.map((p, i) => { if (i % every || i === 0 || i >= run.length - 1) return null; const a = run[i - 1], b = run[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, tx = dx / l * 4, ty = dy / l * 4;
  return <path key={j + '_' + i} d={`M${f1(p[0] + nx * len - tx)} ${f1(p[1] + ny * len - ty)} L${f1(p[0] + tx)} ${f1(p[1] + ty)} L${f1(p[0] - nx * len - tx)} ${f1(p[1] - ny * len - ty)}`} stroke="#FFF4D2" strokeWidth={2} fill="none" strokeLinecap="round" />; }));
const RidgeGlobe: React.FC<{ x?: N; y?: N; s?: N; draw?: N; k?: N; spin?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, k = 0, spin = 0 }) => {
  const id = 'rgl' + Math.round(x), g: GV = { cx: 960, cy: 540, r: 420, lo0: -28 + spin * 360, la0: 14 };
  const R = cutK(RIDGES, k).flatMap(L => gRuns(L, g));
  const stars = useMemo(() => starField(41, 120, -100, -100, 2120, 1280, 2.2), []);
  return <g transform={TR(x, y, s)}>
    <rect x={-100} y={-100} width={2120} height={1280} fill={IND2} opacity={ph(draw, 0, .4)} />
    {stars.map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r * .7} fill="#FFF4D2" opacity={.5 * ph(draw, .3, .8)} />)}
    <circle cx={960} cy={540} r={440} fill="#7FA8C4" opacity={.18} filter="url(#b8)" />
    <GlobeBody g={g} id={id} draw={draw} sea={['#2E4A86', '#141C38']} land={LAND} />
    <path d="M760 172 A420 420 0 0 0 600 760" stroke="#FFF4D2" strokeWidth={8} fill="none" opacity={.55} filter="url(#b2s)" />
    <defs><clipPath id={id + 'k'}><circle cx={960} cy={540} r={420} /></clipPath></defs>
    <g clipPath={`url(#${id}k)`}>
      <path d={runsPath(R)} stroke="#FFB08A" strokeWidth={16} fill="none" opacity={.35} filter="url(#b8)" />
      <path d={runsPath(R)} stroke={VER} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {seamStitches(R)}
    </g>
  </g>;
};

// ================================================================ 8. CAMBRIDGE — a 1963 Cambridge study: desk, anglepoise lamp, the striped magnetic chart, a tea mug,
// a Gothic window with the college chapel's pinnacles at dusk. lamp 0..1. Room left and right of the desk for two standing figures.
const Cambridge: React.FC<{ x?: N; y?: N; s?: N; draw?: N; lamp?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, lamp = 0, tm = 0 }) => {
  const id = 'cam' + Math.round(x);
  const Q = (u: N, v: N): Pt => { const xb = lerp(722, 1198, u), xf = lerp(640, 1280, u); return [lerp(xb, xf, v), lerp(662, 754, v)]; };
  const bands = SB.slice(0, 9);
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sk', [[0, '#3A4A7A'], [.6, '#9A8AA8'], [1, '#E8B898']])}
      <radialGradient id={id + 'lg'}><stop offset="0" stopColor="#FFE6A8" stopOpacity={.85} /><stop offset="1" stopColor="#FFE6A8" stopOpacity={0} /></radialGradient>
      <clipPath id={id + 'win'}><path d="M760 560 V250 Q760 120 960 96 Q1160 120 1160 250 V560Z" /></clipPath></defs>
    {/* walls: plaster above, oak panelling below */}
    <rect x={-100} y={-100} width={2120} height={720} fill="#D8C8A2" opacity={ph(draw, 0, .5)} />
    <RG d="M-100 600 H2020 V1180 H-100Z" mat="wood" t={.62} draw={draw} sw={1.4} />
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={-60 + i * 240} y={640} width={200} height={360} rx={4} fill="none" stroke={SEP} strokeWidth={1.4} opacity={.5 * ph(draw, .3, 1)} />)}
    <Line d="M-100 600 H2020" w={3} a={.8} />
    {/* the window: Gothic arch, leaded panes, the chapel at dusk */}
    <g clipPath={`url(#${id}win)`}>
      <rect x={740} y={80} width={440} height={500} fill={`url(#${id}sk)`} />
      <path d="M760 420 H850 V300 L858 250 L866 300 V420 H1060 V300 L1068 250 L1076 300 V420 H1160 V560 H760Z" fill="#2B2E48" />
      {[880, 920, 960, 1000, 1040].map((a, i) => <path key={i} d={`M${a} 420 V380 L${a + 5} 362 L${a + 10} 380 V420`} fill="#2B2E48" />)}
      <path d="M850 420 L1068 420 L1060 380 L858 380Z" fill="#2B2E48" />
      {[[880, 395], [940, 395], [1000, 395]].map(([a, b], i) => <rect key={'w' + i} x={a} y={b} width={10} height={18} fill="#F3D88E" opacity={.7} />)}
      {Array.from({ length: 12 }, (_, i) => <Line key={'l' + i} d={`M${700 + i * 50} 80 l200 500 M${700 + i * 50} 80 l-200 500`} w={.6} col="#3A2418" a={.35} />)}
    </g>
    <Ink d="M760 560 V250 Q760 120 960 96 Q1160 120 1160 250 V560Z" w={3} draw={draw} />
    <path d="M960 100 V560 M760 330 H1160" stroke="#6A4430" strokeWidth={9} fill="none" opacity={ph(draw, .2, .8)} />
    <RG d="M730 560 H1190 V586 H730Z" color="#B8A27A" draw={draw} sw={1.6} />
    {/* the desk */}
    <RG d="M700 650 H1220 L1320 770 H600Z" mat="wood" t={.48} draw={draw} sw={2} />
    <RG d="M600 770 H1320 V816 H600Z" mat="wood" t={.66} draw={draw} sw={1.8} />
    <ellipse cx={960} cy={1066} rx={420} ry={22} fill="#1A1210" opacity={.4} filter="url(#b8)" />
    <RG d="M620 816 H670 V1060 H620Z M1250 816 H1300 V1060 H1250Z" mat="wood" t={.72} draw={draw} sw={1.6} />
    <rect x={880} y={782} width={160} height={22} rx={4} fill="none" stroke={SEP} strokeWidth={1.2} /><circle cx={960} cy={793} r={4} fill={GOLD} />
    {/* the striped magnetic chart spread on the desk (stripes parallel to the ridge, symmetric) */}
    <g opacity={ph(draw, .3, .9)}>
      <path d={pathOf([Q(0, 0), Q(1, 0), Q(1, 1), Q(0, 1)], true)} fill="#F1E6CA" stroke={SEP} strokeWidth={1.4} />
      {[-1, 1].map(sd => bands.map(([d0, d1], i) => { const u0 = .5 + sd * d0 / 680, u1 = .5 + sd * d1 / 680; if (u1 < .04 || u1 > .96) return null;
        return <path key={sd + '_' + i} d={pathOf([Q(u0, .06), Q(u1, .06), Q(u1, .94), Q(u0, .94)], true)} fill={i % 2 ? '#2B3B66' : GOLD} opacity={.9} />; }))}
      <path d={pathOf([Q(.5, .04), Q(.5, .96)])} stroke={VER} strokeWidth={2.6} />
    </g>
    {/* papers and books at the right of the desk */}
    <RG d="M1120 628 H1210 V650 H1120Z" color="#5A6E9A" draw={draw} sw={1.2} /><RG d="M1126 610 H1200 V628 H1126Z" color={VER} draw={draw} sw={1.2} />
    {/* the tea mug and its steam */}
    <g opacity={ph(draw, .4, 1)} transform="translate(-86 50)">
      <path d="M716 668 v-3 h-8 v40 q0 10 10 10 h38 q10 0 10 -10 v-40 h-8 v3Z" fill="none" />
      <path d="M706 662 h62 v44 q0 12 -12 12 h-38 q-12 0 -12 -12Z" fill="#F4F2EA" stroke={SEP} strokeWidth={1.8} />
      <ellipse cx={737} cy={662} rx={31} ry={7} fill="#7A4A2A" stroke={SEP} strokeWidth={1.4} />
      <path d="M768 672 q22 2 20 18 q-2 14 -20 14" stroke={SEP} strokeWidth={5} fill="none" /><path d="M768 672 q22 2 20 18 q-2 14 -20 14" stroke="#F4F2EA" strokeWidth={2.4} fill="none" />
      {[0, 1, 2].map(i => { const p = fr(tm * .3 + i / 3); return <path key={i} d={`M${728 + i * 8} ${650 - p * 70} q${8 * Math.sin(tm + i)} -12 0 -24 q-8 -12 0 -24`} stroke="#FFFFFF" strokeWidth={2.4} fill="none" opacity={(1 - p) * .7} />; })}
    </g>
    {/* the anglepoise lamp */}
    {lamp > 0 && <g opacity={lamp} transform="translate(56 16)">
      <path d="M1088 548 L1000 718 L1210 724 L1132 548Z" fill="#FFE6A8" opacity={.22} />
      <ellipse cx={1050} cy={722} rx={190} ry={30} fill="#FFE6A8" opacity={.35} filter="url(#b8)" />
      <circle cx={1110} cy={540} r={260} fill={`url(#${id}lg)`} />
    </g>}
    <g opacity={ph(draw, .3, .9)} transform="translate(56 16)">
      <ellipse cx={1206} cy={706} rx={42} ry={10} fill="#2F5440" stroke={SEP} strokeWidth={1.6} />
      <path d="M1206 700 L1250 600 L1140 520" stroke="#2F5440" strokeWidth={7} fill="none" strokeLinejoin="round" />
      <path d="M1206 700 L1250 600 L1140 520" stroke={SEP} strokeWidth={1.2} fill="none" strokeLinejoin="round" />
      <circle cx={1250} cy={600} r={8} fill="#5A5650" stroke={SEP} strokeWidth={1.2} />
      <path d="M1158 506 L1104 526 L1070 572 L1150 586 L1170 534Z" fill="#2F5440" stroke={SEP} strokeWidth={1.8} />
      <ellipse cx={1110} cy={580} rx={42} ry={9} fill={lamp > 0 ? mix('#5A5650', '#FFF4D2', lamp) : '#5A5650'} stroke={SEP} strokeWidth={1.2} transform="rotate(8 1110 580)" />
    </g>
    {/* dusk dims the room; the lamp warms it */}
    <rect x={-100} y={-100} width={2120} height={1280} fill="#141C38" opacity={.22 * (1 - lamp * .6)} />
    <KeyLight id={id} from="tr" a={.7} />
  </g>;
};

// ================================================================ 9. COMPASS — a big brass compass from above; flip 0..1 swings the needle from north to south (wobble, tm)
const Compass: React.FC<{ x?: N; y?: N; s?: N; draw?: N; flip?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, flip = 0, tm = 0 }) => {
  const C: Pt = [960, 540], R = 400, ang = sst(flip) * 180 + Math.sin(tm * 5.4) * (1 + 7 * Math.sin(cl(flip) * Math.PI)) + Math.sin(tm * 13) * .6;
  return <g transform={TR(x, y, s)}>
    <RG d="M-100 -100 H2020 V1180 H-100Z" mat="wood" t={.5} draw={draw} sw={0} rim={false} />
    {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M-100 ${-60 + i * 56 + rnd(i) * 20} Q900 ${-40 + i * 56 + rnd(i + 3) * 40} 2020 ${-60 + i * 56 + rnd(i + 5) * 30}`} stroke="#4F3020" strokeWidth={1} fill="none" opacity={.3 * ph(draw, .3, 1)} />)}
    <circle cx={C[0] + 18} cy={C[1] + 26} r={R + 10} fill={SEP} opacity={.35} filter="url(#b8)" />
    <circle cx={C[0]} cy={C[1]} r={R} fill="url(#gold)" stroke={SEP} strokeWidth={2.6} opacity={ph(draw, 0, .5)} />
    <circle cx={C[0]} cy={C[1]} r={R - 34} fill="#B8862B" stroke={SEP} strokeWidth={1.6} opacity={ph(draw, .1, .6)} />
    <circle cx={C[0]} cy={C[1]} r={R - 46} fill="#FBF4E2" stroke={SEP} strokeWidth={1.6} opacity={ph(draw, .1, .6)} />
    <g opacity={ph(draw, .3, .9)}>{Array.from({ length: 72 }, (_, i) => { const a = i * 5 * D2R, l = i % 6 === 0 ? 30 : 14;
      return <path key={i} d={`M${f1(C[0] + Math.cos(a) * (R - 48))} ${f1(C[1] + Math.sin(a) * (R - 48))} L${f1(C[0] + Math.cos(a) * (R - 48 - l))} ${f1(C[1] + Math.sin(a) * (R - 48 - l))}`} stroke={SEP} strokeWidth={i % 6 === 0 ? 2 : 1} />; })}</g>
    <Rose cx={C[0]} cy={C[1]} r={230} a={ph(draw, .3, .9) * .55} />
    {[['N', 0], ['E', 90], ['S', 180], ['W', 270]].map(([t, a]) => { const an = ((a as N) - 90) * D2R;
      return <Fell key={t as string} x={f1(C[0] + Math.cos(an) * 262)} y={f1(C[1] + Math.sin(an) * 262 + 26)} s={78} t={t as string} sc col={t === 'N' ? VER : SEP} a={ph(draw, .5, 1)} />; })}
    {/* the needle: red north, blue south */}
    <g transform={`rotate(${f1(ang)} ${C[0]} ${C[1]})`} opacity={ph(draw, .4, .9)}>
      <path d={`M${C[0] + 8} ${C[1] + 14} L${C[0]} ${C[1] - 300} L${C[0] - 8} ${C[1] + 14}Z`} fill={SEP} opacity={.25} transform="translate(10 14)" />
      <path d={`M${C[0]} ${C[1] - 300} L${C[0] + 30} ${C[1]} L${C[0] - 30} ${C[1]}Z`} fill={VER} stroke={SEP} strokeWidth={2} />
      <path d={`M${C[0]} ${C[1] - 300} L${C[0] + 30} ${C[1]} L${C[0]} ${C[1]}Z`} fill="#8C3424" opacity={.6} />
      <path d={`M${C[0]} ${C[1] + 300} L${C[0] + 30} ${C[1]} L${C[0] - 30} ${C[1]}Z`} fill="#2E5C86" stroke={SEP} strokeWidth={2} />
      <path d={`M${C[0]} ${C[1] + 300} L${C[0] - 30} ${C[1]} L${C[0]} ${C[1]}Z`} fill="#1D4566" opacity={.6} />
    </g>
    <circle cx={C[0]} cy={C[1]} r={26} fill="url(#gold)" stroke={SEP} strokeWidth={2} /><circle cx={C[0] - 6} cy={C[1] - 6} r={7} fill="#FFF4D2" opacity={.8} />
    {/* the glass */}
    <path d={`M${C[0] - 250} ${C[1] - 170} A300 300 0 0 1 ${C[0] + 140} ${C[1] - 300}`} stroke="#FFFFFF" strokeWidth={22} fill="none" opacity={.25} strokeLinecap="round" />
    <path d={`M${C[0] - 268} ${C[1] - 110} A310 310 0 0 1 ${C[0] - 210} ${C[1] - 210}`} stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={.4} strokeLinecap="round" />
    <KeyLight id={'cmp' + Math.round(x)} />
  </g>;
};

// ================================================================ 10. RIDGE TAPE — the mid-ocean ridge in cross-section, read like a tape recorder:
// the sea on top (sunlight from the surface, fish for scale), the sea-floor crust in bands, the mantle below with its magma chamber; at the ridge
// a glowing crack where lava wells up, and the new rock cools from orange to dark as it moves aside; in each band a tiny compass needle locked
// pointing north (red up) or south; at the two outer edges two big tape reels, the floor running onto them like tape.
// well 0..1 lava rises up the crack; cool 0..1 the new rock cools (the orange glow narrows to the crack); run (continuous) the bands march
// outward, new ones born at the crack, reels turn; arrows 0..1 the frozen compass needles; gold 0..1 the bands take the stripe washes;
// belt 0..1 the crust becomes a conveyor (rollers, belt) carrying two continent slabs (South America west, Africa east — thick land blocks,
// their shapes in plan on top, hills, trees, a town); cross 0..1 Wegener's grave (a snow mound with a wooden cross) rides along on the belt.
const FLIPI = [.16, .09, .22, .07, .14, .27, .1, .19, .12, .24, .08, .17, .21, .11, .15, .26, .09, .18, .13, .2];
const FLIPS = (() => { const o: N[] = []; let t = -3, i = 0; while (t < 8) { o.push(t); t += FLIPI[i++ % FLIPI.length]; } return o; })();
const polAt = (T: N) => { let c = 0; for (const f of FLIPS) if (f <= T) c++; return c; };
const POL0 = polAt(0) % 2;
const isNormal = (T: N) => (polAt(T) % 2) === POL0;
const inPoly = (p: Pt, P2: Pt[]) => { let c = false; for (let i = 0, j = P2.length - 1; i < P2.length; j = i++) { const a = P2[i], b = P2[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
// a continent as a thick land slab: its outline in plan (squashed, as if seen from a little above) extruded downward; hills, trees, a town
const LandSlab: React.FC<{ k: string; cx: N; base: N; sc: N; a?: N; seed?: N }> = ({ k, cx, base, sc, a = 1, seed = 1 }) => {
  const L = GEO[k], lo = L.map(p => p[0]), la = L.map(p => p[1]), lo0 = (Math.min(...lo) + Math.max(...lo)) / 2, laMin = Math.min(...la), T = 30, SQ = .42;
  const top: Pt[] = L.map(([o, t]) => [cx + (o - lo0) * sc, base - T - (t - laMin) * sc * SQ]);
  const xs = top.map(p => p[0]), ys = top.map(p => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const pts: Pt[] = []; for (let i = 0; pts.length < 9 && i < 80; i++) { const q: Pt = [lerp(x0, x1, rnd(i * 3.7 + seed)), lerp(y0, y1, rnd(i * 5.3 + seed))]; if (inPoly(q, top) && inPoly([q[0], q[1] - 22], top)) pts.push(q); }
  const dP = pathOf(top, true);
  return <g opacity={a}>
    <ellipse cx={cx} cy={base + 2} rx={(x1 - x0) * .5} ry={9} fill="#1A1424" opacity={.35} filter="url(#b2s)" />
    {Array.from({ length: 8 }, (_, i) => <path key={i} d={dP} fill={mix('#5E4632', '#8C6A48', i / 7)} transform={`translate(0 ${f1(T * (1 - i / 7))})`} stroke={i === 0 ? SEP : 'none'} strokeWidth={1.6} />)}
    <path d={dP} fill="#BDB27A" stroke={SEP} strokeWidth={2} />
    <path d={dP} fill="#6E8F5A" opacity={.35} transform={`translate(${f1((x1 - x0) * .04)} ${f1((y1 - y0) * .06)}) scale(1)`} />
    {pts.slice(0, 3).map(([px, py], i) => <path key={'h' + i} d={`M${f1(px - 22)} ${f1(py + 4)} Q${f1(px)} ${f1(py - 18)} ${f1(px + 22)} ${f1(py + 4)}`} fill="#9A8A5A" stroke={SEP} strokeWidth={1.2} />)}
    {pts.slice(3, 8).map(([px, py], i) => <g key={'t' + i}><path d={`M${f1(px)} ${f1(py + 2)} V${f1(py - 10)}`} stroke="#4F3020" strokeWidth={2.4} /><circle cx={px} cy={py - 16} r={8} fill="#4F7A4A" stroke={SEP} strokeWidth={1.2} /></g>)}
    {pts.length > 8 && [0, 1, 2].map(i => { const [px, py] = pts[8]; return <g key={'c' + i}><rect x={px - 14 + i * 10} y={py - 8} width={8} height={8} fill="#E6D8B6" stroke={SEP} strokeWidth={.9} /><path d={`M${f1(px - 15 + i * 10)} ${f1(py - 8)} l5 -5 l5 5`} fill={VER} stroke={SEP} strokeWidth={.9} /></g>; })}
  </g>;
};
const RidgeTape: React.FC<{ x?: N; y?: N; s?: N; draw?: N; well?: N; cool?: N; run?: N; arrows?: N; gold?: N; belt?: N; cross?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, well = 0, cool = 0, run = 0, arrows = 0, gold = 0, belt = 0, cross = 0, tm = 0 }) => {
  const id = 'rtp' + Math.round(x), V = 300, DM = 640, HW = 26, YB = 650, SL = 70, RC = 175, RY = 630, PR = 88, FR = 128;
  const yT = (xx: N) => 528 - 86 * Math.exp(-(((xx - 960) / 230) ** 2)) + 4 * Math.sin(xx / 19) * (1 - belt * .8);
  const bnd = [0, ...FLIPS.filter(f => f <= run).map(f => (run - f) * V).filter(d => d > 0 && d < DM).sort((a, b) => a - b), DM];
  const segs = bnd.slice(1).map((d1, i) => ({ d0: bnd[i], d1, nrm: isNormal(run - (bnd[i] + d1) / 2 / V) }));
  const NRM = '#C9A266', RVS = '#5A7472', colOf = (nrm: boolean) => mix(nrm ? '#5E5850' : '#48443F', nrm ? NRM : RVS, gold);
  const strip = (xa: N, xb: N) => { const xs = Array.from({ length: 9 }, (_, i) => lerp(xa, xb, i / 8)); return 'M' + xs.map(xx => `${f1(xx)} ${f1(yT(xx))}`).join(' L') + ` L${f1(xb)} ${YB} L${f1(xa)} ${YB}Z`; };
  const crust = strip(960 - DM, 960 + DM), wl = sst(well), hotTop = lerp(YB + 70, yT(960) + 6, wl), hotW = 60 + 300 * (1 - sst(cool));
  const needle = (cx: N, up: boolean, a: N, key: string) => { const cy = (yT(cx) + YB) / 2 + 8;
    return <g key={key} opacity={a} transform={`translate(${f1(cx)} ${f1(cy)})`}><circle r={15} fill="#F4EAD2" stroke={SEP} strokeWidth={1.4} /><circle r={12.5} fill="none" stroke="#B8862B" strokeWidth={1.6} />
      <g transform={`rotate(${up ? 0 : 180})`}><path d="M0 -12 L4.2 0 L-4.2 0Z" fill={VER} stroke={SEP} strokeWidth={.6} /><path d="M0 12 L4.2 0 L-4.2 0Z" fill="#2E5C86" stroke={SEP} strokeWidth={.6} /></g><circle r={2} fill={GOLD} /></g>; };
  const cyc = (o: N) => { const d = 150 + fr(run * V / 520 + o) * 520; return { d, a: ph(d, 150, 200) * (1 - ph(d, 600, 660)) }; };
  const pR = cyc(0), pL = cyc(.4), pC = cyc(.7), nrmNow = isNormal(run), rot = run * V / PR * 57.3;
  const fishes: [N, N, N, N][] = [[420, 300, 1, .9], [560, 380, -1, .7], [1380, 260, -1, 1], [1500, 410, 1, .75], [760, 200, 1, .6], [1180, 330, -1, .55]];
  const window3 = (r0: N, r1: N) => [0, 120, 240].map(a => { const a0 = (a + 18) * D2R, a1 = (a + 102) * D2R;
    return `M${f1(Math.cos(a0) * r0)} ${f1(Math.sin(a0) * r0)} L${f1(Math.cos(a0) * r1)} ${f1(Math.sin(a0) * r1)} A${r1} ${r1} 0 0 1 ${f1(Math.cos(a1) * r1)} ${f1(Math.sin(a1) * r1)} L${f1(Math.cos(a1) * r0)} ${f1(Math.sin(a1) * r0)} A${r0} ${r0} 0 0 0 ${f1(Math.cos(a0) * r0)} ${f1(Math.sin(a0) * r0)}Z`; }).join(' ');
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sea', [[0, '#9FC0CC'], [.5, '#5E8EA6'], [1, '#2F5470']])}{grad(id + 'man', [[0, '#A8644A'], [.5, '#86503C'], [1, '#5A362C']])}
      <linearGradient id={id + 'hot'} gradientUnits="userSpaceOnUse" x1={960 - hotW} y1={0} x2={960 + hotW} y2={0}><stop offset="0" stopColor="#E8743A" stopOpacity={0} /><stop offset=".5" stopColor="#F08A40" stopOpacity={1} /><stop offset="1" stopColor="#E8743A" stopOpacity={0} /></linearGradient>
      <linearGradient id={id + 'lava'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#E8642E" /><stop offset=".5" stopColor="#FFE6A0" /><stop offset="1" stopColor="#E8642E" /></linearGradient>
      <radialGradient id={id + 'mg'}><stop offset="0" stopColor="#FFF0C0" /><stop offset=".5" stopColor="#F6A848" /><stop offset="1" stopColor="#E8642E" stopOpacity={0} /></radialGradient>
      <clipPath id={id + 'c'}><path d={crust} /></clipPath></defs>
    {/* sky, sea surface, water lit from above */}
    <rect x={-100} y={-100} width={2120} height={SL + 100} fill="#E9E2CE" opacity={ph(draw, 0, .5)} />
    <rect x={-100} y={SL} width={2120} height={YB - SL} fill={`url(#${id}sea)`} opacity={ph(draw, 0, .5)} />
    {[0, 1, 2, 3].map(i => { const x0 = 300 + i * 420 + Math.sin(tm * .4 + i) * 20; return <path key={i} d={`M${f1(x0)} ${SL} h90 L${f1(x0 - 60)} 560 h-180Z`} fill="#FFF8E6" opacity={.12 * ph(draw, .3, 1)} />; })}
    <path d={`M-100 ${SL} ${Array.from({ length: 41 }, (_, i) => `Q${-100 + i * 54 + 13} ${SL - 6} ${-100 + i * 54 + 27} ${SL} T${-100 + i * 54 + 54} ${SL}`).join(' ')}`} stroke={SEP} strokeWidth={1.8} fill="none" opacity={.7 * ph(draw, .3, 1)} transform={`translate(${f1(-(tm * 20) % 54)} 0)`} />
    {/* fish, for scale */}
    {fishes.map(([fx, fy, dir, sz], i) => { const xx = fx + dir * ((tm * 26 * sz + i * 40) % 160) - dir * 80, yy = fy + Math.sin(tm * 1.3 + i) * 6;
      return <g key={i} transform={`translate(${f1(xx)} ${f1(yy)}) scale(${dir * sz} ${sz})`} opacity={.85 * ph(draw, .4, 1)}><path d="M-26 0 Q-6 -14 18 -3 L30 -11 L28 0 L30 11 L18 3 Q-6 14 -26 0Z" fill="#2F5470" stroke={SEP} strokeWidth={1.2} /><circle cx={-16} cy={-2} r={2} fill="#F4EAD2" /></g>; })}
    {/* warm glow of the ridge lighting the water above it */}
    <ellipse cx={960} cy={yT(960) - 20} rx={260} ry={150} fill="#F6A848" opacity={.32 * wl * (.85 + .15 * Math.sin(tm * 2.2))} filter="url(#b30)" />
    {/* the mantle, slowly flowing away from under the ridge */}
    <rect x={-100} y={YB} width={2120} height={600} fill={`url(#${id}man)`} opacity={ph(draw, 0, .5)} />
    {[-1, 1].map(sd => <g key={sd} opacity={.4 * ph(draw, .4, 1)}><path d={`M${960 + sd * 120} 900 Q${960 + sd * 420} 980 ${960 + sd * 640} 780`} stroke="#F2C890" strokeWidth={4} fill="none" strokeDasharray="18 14" strokeDashoffset={f1(-tm * 30)} />
      <path d={`M${960 + sd * 640} 780 l${-sd * 4} 26 M${960 + sd * 640} 780 l${-sd * 24} 12`} stroke="#F2C890" strokeWidth={4} /></g>)}
    <ellipse cx={960} cy={760} rx={210} ry={84} fill={`url(#${id}mg)`} opacity={.85 + .15 * Math.sin(tm * 2.2)} />
    {/* the crust: bands either side of the crack */}
    {segs.map((g2, i) => [-1, 1].map(sd => { const a0 = 960 + sd * Math.max(g2.d0, HW), a1 = 960 + sd * g2.d1; if (Math.abs(a1 - 960) <= HW) return null;
      return <path key={i + '_' + sd} d={strip(Math.min(a0, a1), Math.max(a0, a1))} fill={colOf(g2.nrm)} stroke={SEP} strokeWidth={1} opacity={ph(draw, .2, .7)} />; }))}
    <g clipPath={`url(#${id}c)`}>
      {/* pillow lava on top, sheeted dikes below, travelling with the floor */}
      {Array.from({ length: 64 }, (_, i) => { const d = fr(i / 64 + run * V / 1280) * 1280; if (d > DM) return null; return [-1, 1].map(sd => { const xx = 960 + sd * d;
        return <g key={i + '_' + sd} opacity={.5}><path d={`M${f1(xx - 9)} ${f1(yT(xx) + 16)} q9 -12 18 0`} stroke={SEP} strokeWidth={1} fill="none" /><path d={`M${f1(xx)} ${f1(yT(xx) + 36)} V${YB - 8}`} stroke={SEP} strokeWidth={.7} opacity={.6} /></g>; }); })}
      <rect x={960 - hotW} y={0} width={hotW * 2} height={YB + 10} fill={`url(#${id}hot)`} opacity={wl} />
    </g>
    <path d={crust} fill="none" stroke={SEP} strokeWidth={2} opacity={ph(draw, .2, .8)} />
    {/* the crack and the welling lava */}
    <path d={`M${960 - HW} ${f1(yT(960 - HW))} L${960 + HW} ${f1(yT(960 + HW))} L${960 + HW + 10} ${YB + 40} L${960 - HW - 10} ${YB + 40}Z`} fill="#1A1424" opacity={ph(draw, .2, .7)} />
    {well > 0 && <g>
      <path d={`M${960 - HW + 4} ${f1(Math.max(hotTop, yT(960 - HW)))} Q960 ${f1(hotTop - 12)} ${960 + HW - 4} ${f1(Math.max(hotTop, yT(960 + HW)))} L${960 + HW + 6} ${YB + 60} L${960 - HW - 6} ${YB + 60}Z`} fill={`url(#${id}lava)`} stroke="#8C3424" strokeWidth={1.4} />
      <ellipse cx={960} cy={hotTop} rx={60} ry={34} fill="#FFD58A" opacity={.6 * wl * (.8 + .2 * Math.sin(tm * 5))} filter="url(#b8)" />
      {wl > .95 && Array.from({ length: 5 }, (_, i) => { const p = fr(tm * .5 + i / 5); return <circle key={i} cx={960 + Math.sin(i * 2.3 + tm) * 12} cy={hotTop - 10 - p * 140} r={4 + p * 8} fill="none" stroke="#F4EAD2" strokeWidth={1.6} opacity={(1 - p) * .7} />; })}
    </g>}
    {/* the frozen compass needles: red up = north (normal), red down = reversed */}
    {arrows > 0 && segs.map((g2, i) => [-1, 1].map(sd => { const w = g2.d1 - Math.max(g2.d0, HW); if (w < 36) return null; const nn = w > 140 ? 2 : 1;
      return Array.from({ length: nn }, (_, j) => needle(960 + sd * (Math.max(g2.d0, HW) + w * (j + 1) / (nn + 1)), g2.nrm, arrows, `${i}_${sd}_${j}`)); }))}
    {arrows > 0 && needle(960, nrmNow, arrows * sst(cool), 'hot')}
    {/* the conveyor: belt loop and rollers under the crust */}
    {belt > 0 && <g opacity={sst(belt)}>
      <path d={`M${960 - DM + 30} ${YB + 6} H${960 + DM - 30} A38 38 0 0 1 ${960 + DM - 30} ${YB + 82} H${960 - DM + 30} A38 38 0 0 1 ${960 - DM + 30} ${YB + 6}`} stroke="#2A2420" strokeWidth={9} fill="none" />
      {Array.from({ length: 11 }, (_, i) => { const rxp = 960 - DM + 60 + i * (2 * DM - 120) / 10, sd = rxp < 960 ? -1 : 1, an = sd * run * V / 30 * 57.3;
        return <g key={i} transform={`rotate(${f1(an)} ${f1(rxp)} ${YB + 44})`}><circle cx={rxp} cy={YB + 44} r={30} fill="#8E8A80" stroke={SEP} strokeWidth={1.6} /><path d={`M${f1(rxp - 26)} ${YB + 44} H${f1(rxp + 26)} M${f1(rxp)} ${YB + 18} V${YB + 70}`} stroke={SEP} strokeWidth={1.6} /><circle cx={rxp} cy={YB + 44} r={6} fill={GOLD} stroke={SEP} strokeWidth={1} /></g>; })}
    </g>}
    {/* the continents riding on the floor: South America west, Africa east */}
    {belt > 0 && [[pL, -1, 'SA', 4.8, 2], [pR, 1, 'AF', 4.2, 5]].map(([p, sd, key, sc, sdd], i) => { const P2 = p as { d: N; a: N }, cx2 = 960 + (sd as N) * P2.d;
      return <LandSlab key={i} k={key as string} cx={cx2} base={yT(cx2) + 2} sc={sc as N} a={P2.a * sst(belt)} seed={sdd as N} />; })}
    {/* Wegener's grave riding along: a snow mound with a wooden cross */}
    {cross > 0 && <g opacity={cross * pC.a}>{(() => { const cx2 = 960 + pC.d, base = yT(cx2) + 2;
      return <g><ellipse cx={cx2} cy={base + 2} rx={90} ry={8} fill="#1A1424" opacity={.3} filter="url(#b2s)" />
        <path d={`M${cx2 - 86} ${f1(base)} Q${cx2 - 50} ${f1(base - 56)} ${cx2 + 4} ${f1(base - 60)} Q${cx2 + 60} ${f1(base - 52)} ${cx2 + 86} ${f1(base)}Z`} fill="#F4F7F8" stroke={SEP} strokeWidth={1.8} />
        <path d={`M${cx2 + 10} ${f1(base - 54)} Q${cx2 + 50} ${f1(base - 40)} ${cx2 + 78} ${f1(base - 4)}`} stroke="#B9C8D6" strokeWidth={8} fill="none" opacity={.8} />
        <path d={`M${cx2} ${f1(base - 52)} V${f1(base - 168)} M${cx2 - 32} ${f1(base - 132)} H${cx2 + 32}`} stroke="#6A4430" strokeWidth={10} strokeLinecap="round" />
        <path d={`M${cx2} ${f1(base - 52)} V${f1(base - 168)} M${cx2 - 32} ${f1(base - 132)} H${cx2 + 32}`} stroke={SEP} strokeWidth={1.4} fill="none" />
        <path d={`M${cx2 - 36} ${f1(base - 137)} q36 -8 72 0 M${cx2 - 6} ${f1(base - 172)} q6 -4 12 0`} stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" /></g>; })()}</g>}
    {/* the two tape reels at the outer edges; the floor runs onto them as tape */}
    {[-1, 1].map(sd => { const cx = sd < 0 ? RC : 1920 - RC, x0 = 960 + sd * DM, tape = pathOf([[x0, yT(x0)], [cx, RY - PR], [cx, RY - PR + 34], [x0, YB]], true);
      return <g key={sd} opacity={ph(draw, .3, .9)}>
        <defs><clipPath id={id + 't' + sd}><path d={tape} /></clipPath></defs>
        <path d={tape} fill={mix('#55504A', NRM, gold * .8)} stroke={SEP} strokeWidth={1.6} />
        <g clipPath={`url(#${id}t${sd})`}>{Array.from({ length: 14 }, (_, i) => { const u = fr(i / 14 + run * V / 1100), xx = x0 - sd * u * Math.abs(x0 - cx);
          return <rect key={i} x={xx - 7} y={RY - PR - 10} width={14} height={YB - RY + PR + 20} fill={i % 2 ? colOf(false) : colOf(true)} opacity={.9} />; })}</g>
        <circle cx={cx} cy={RY} r={FR} fill="#8E918C" stroke={SEP} strokeWidth={2.4} />
        <circle cx={cx} cy={RY} r={PR} fill={colOf(true)} stroke={SEP} strokeWidth={1.6} />
        {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={cx} cy={RY} r={PR - 6 - i * 6} fill="none" stroke={i % 2 ? colOf(true) : colOf(false)} strokeWidth={6} />)}
        <circle cx={cx} cy={RY} r={30} fill="#3A3A38" stroke={SEP} strokeWidth={1.4} />
        <g transform={`translate(${cx} ${RY}) rotate(${f1(sd * rot)})`}>
          <path d={`M${-FR} 0 A${FR} ${FR} 0 1 0 ${FR} 0 A${FR} ${FR} 0 1 0 ${-FR} 0Z ${window3(36, FR - 16)}`} fill="#C9CCC6" fillRule="evenodd" stroke={SEP} strokeWidth={2.2} opacity={.92} />
          <path d={window3(36, FR - 16)} fill="none" stroke={SEP} strokeWidth={1.2} />
          <circle r={20} fill="#8E8A80" stroke={SEP} strokeWidth={1.6} />{[0, 120, 240].map(a => <path key={a} d={`M0 0 L${f1(Math.cos(a * D2R) * 20)} ${f1(Math.sin(a * D2R) * 20)}`} stroke={SEP} strokeWidth={3} />)}
          <circle r={6} fill={GOLD} stroke={SEP} strokeWidth={1} />
          <path d={`M${-FR + 20} -40 A${FR - 18} ${FR - 18} 0 0 1 -40 ${-FR + 20}`} stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={.5} />
        </g>
      </g>; })}
    <KeyLight id={id} a={.6} />
  </g>;
};

// ================================================================ 11. PLATE GLOBE — the globe in space, its shell cracking like an eggshell into the real plates
// crack 0..1 draws the plate boundaries (vermilion, jagged); shift 0..1 the plates drift apart a little; quakes 0..1 star-flashes along them; spin (turns).
const PlateGlobe: React.FC<{ x?: N; y?: N; s?: N; draw?: N; crack?: N; shift?: N; quakes?: N; spin?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, crack = 0, shift = 0, quakes = 0, spin = 0, tm = 0 }) => {
  const id = 'pgl' + Math.round(x), g: GV = { cx: 960, cy: 540, r: 420, lo0: -5 + spin * 360, la0: 16 };
  const B = useMemo(() => [...RIDGES, ...TRENCHES].map(L => dens(L, 1.2).map(([lo, la], i) => [lo + (rnd(i * 1.7 + lo) - .5) * 1.4, la + (rnd(i * 2.3 + la) - .5) * 1.4] as LL)), []);
  const R = cutK(B, crack).flatMap(L => gRuns(L, g, [0, 0], 1.2)), sh = sst(shift);
  const QP = useMemo(() => TRENCHES.flatMap(L => dens(L, 6)).concat(RIDGES[0].filter((_, i) => i % 3 === 0)), []);
  const stars = useMemo(() => starField(77, 160, -100, -100, 2120, 1280, 2.4), []);
  return <g transform={TR(x, y, s)}>
    <rect x={-100} y={-100} width={2120} height={1280} fill="#0B1030" opacity={ph(draw, 0, .4)} />
    {stars.map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r * .7} fill="#FFF4D2" opacity={.6 * ph(draw, .3, .8)} />)}
    <circle cx={1010} cy={520} r={450} fill="#F2A672" opacity={.45} filter="url(#b30)" />
    <GlobeBody g={g} id={id} draw={draw} sea={['#2E4A86', '#141C38']} land={LAND} off={k => [DRIFT[k][0] * sh * 14, DRIFT[k][1] * sh * 14]} />
    <defs><clipPath id={id + 'k'}><circle cx={960} cy={540} r={420} /></clipPath></defs>
    <g clipPath={`url(#${id}k)`}>
      <path d={runsPath(R)} stroke="#0B1030" strokeWidth={7 + sh * 9} fill="none" strokeLinejoin="round" opacity={.85} />
      <path d={runsPath(R)} stroke={VER} strokeWidth={4.4} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {quakes > 0 && QP.map(([lo, la], i) => { const [X, Y, Z] = ortho(lo, la, g.lo0, g.la0); if (Z <= .05) return null; const f = Math.pow(Math.max(0, Math.sin(tm * 2.4 + rnd(i) * 40)), 10) * quakes;
        return f > .02 ? <Star key={i} x={960 + X * 420} y={540 + Y * 420} r={3 + f * 5} glow={f} rays={f} col="#FFF4D2" /> : null; })}
    </g>
    {/* warm rim light */}
    <path d="M1260 240 A420 420 0 0 1 1210 880" stroke="#FFD9B0" strokeWidth={8} fill="none" opacity={.6} filter="url(#b2s)" transform="translate(-10 0)" />
  </g>;
};

// ================================================================ 12. TRENCH — a subduction zone in cross-section: the ocean plate dives under the continent (volcano)
// dive 0..1 slides the ocean plate down (its stripes and sediment travel); quakes 0..1 star flashes along the contact; puff 0..1 the volcano puffs ash.
const Trench: React.FC<{ x?: N; y?: N; s?: N; draw?: N; dive?: N; quakes?: N; puff?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, dive = 0, quakes = 0, puff = 0, tm = 0 }) => {
  const id = 'trn' + Math.round(x), TH = 56;
  const yc = (xx: N) => 470 + Math.max(0, xx - 820) ** 2 * .0011, sl = (xx: N) => 2 * .0011 * Math.max(0, xx - 820);
  const C = useMemo(() => { const o: { p: Pt; n: Pt; S: N }[] = []; let S = 0, prev: Pt | null = null;
    for (let xx = -300; xx <= 1700; xx += 8) { const p: Pt = [xx, yc(xx)], l = Math.hypot(1, sl(xx)); if (prev) S += Math.hypot(p[0] - prev[0], p[1] - prev[1]); o.push({ p, n: [-sl(xx) / l, 1 / l], S }); prev = p; if (p[1] > 1400) break; }
    return o; }, []);
  const at = (S: N) => { let i = 0; while (i < C.length - 2 && C[i + 1].S < S) i++; const a = C[i], b = C[i + 1], t = cl((S - a.S) / (b.S - a.S || 1)); return { p: [lerp(a.p[0], b.p[0], t), lerp(a.p[1], b.p[1], t)] as Pt, n: [lerp(a.n[0], b.n[0], t), lerp(a.n[1], b.n[1], t)] as Pt }; };
  const edge = (o: N) => C.map(c => [c.p[0] + c.n[0] * o, c.p[1] + c.n[1] * o] as Pt);
  const top = edge(-TH), bot = edge(TH), Ltot = C[C.length - 1].S, mv = sst(dive) * 380;
  const slab = 'M' + top.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' L' + [...bot].reverse().map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z';
  const piece = (S0: N, S1: N, o0: N, o1: N) => { const ss = [0, .25, .5, .75, 1].map(t => at(lerp(S0, S1, t))); return 'M' + ss.map(q => `${f1(q.p[0] + q.n[0] * o0)} ${f1(q.p[1] + q.n[1] * o0)}`).join(' L') + ' L' + [...ss].reverse().map(q => `${f1(q.p[0] + q.n[0] * o1)} ${f1(q.p[1] + q.n[1] * o1)}`).join(' L') + 'Z'; };
  const slabTopY = (xx: N) => yc(xx) - TH * Math.hypot(1, sl(xx));
  const landTop: Pt[] = [[856, 418], [930, 372], [1010, 330], [1080, 302], [1140, 290], [1250, 282], [1330, 196], [1345, 176], [1372, 176], [1388, 196], [1470, 284], [1600, 272], [1720, 284], [1820, 262], [1960, 272]];
  const landBot: Pt[] = []; for (let xx = 1960; xx >= 856; xx -= 16) landBot.push([xx, Math.min(640, slabTopY(xx) - 1)]);
  const QX = [880, 940, 1000, 1060, 1120, 1180, 1240, 1300, 1360];
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sk', [[0, '#9CC4E0'], [1, '#E6EEF0']])}{grad(id + 'man', [[0, '#D2643E'], [.5, '#B04A2A'], [1, '#7A2E20']])}{grad(id + 'sea', [[0, '#4A88AE'], [1, '#1D4566']])}</defs>
    <rect x={-100} y={-100} width={2120} height={400} fill={`url(#${id}sk)`} opacity={ph(draw, 0, .5)} />
    <circle cx={300} cy={120} r={200} fill="#FFF4D2" opacity={.5} filter="url(#b30)" /><circle cx={300} cy={120} r={38} fill="#FFF4D2" stroke="#F3D88E" strokeWidth={3} />
    <rect x={-100} y={300} width={1200} height={500} fill={`url(#${id}sea)`} opacity={ph(draw, 0, .5)} />
    <rect x={-100} y={510} width={2120} height={700} fill={`url(#${id}man)`} opacity={ph(draw, 0, .5)} />
    {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${rnd(i) * 1900} ${640 + rnd(i + 3) * 400} q40 -30 80 0`} stroke="#F6CF7A" strokeWidth={2} fill="none" opacity={.3} />)}
    {/* the ocean plate: dark basalt, its magnetic stripes and sediment travelling with it */}
    <RG d={slab} color="#3E3C46" draw={draw} sw={2} />
    {Array.from({ length: 36 }, (_, j) => { const S0 = fr((j * 70 + mv) / (36 * 70)) * 36 * 70 - 200; if (S0 < 0 || S0 + 34 > Ltot) return null;
      return <path key={j} d={piece(S0, S0 + 34, -TH + 12, TH - 4)} fill={j % 2 ? GOLD : '#2B3B66'} opacity={.38} />; })}
    {Array.from({ length: 28 }, (_, j) => { const S0 = fr((j * 52 + mv) / (28 * 52)) * 28 * 52 - 200, q = at(Math.max(0, S0)); if (S0 < 0 || q.p[0] > 900) return null;
      return <path key={'s' + j} d={piece(S0, S0 + 40, -TH - 14, -TH)} fill="#D9AE6C" stroke={SEP} strokeWidth={.8} opacity={1 - ph(q.p[0], 820, 900)} />; })}
    <RG d="M800 418 L860 419 L900 400 L878 432 L820 430Z" color="#C9A870" draw={draw} sw={1.2} />
    {/* the continent with its volcano */}
    <RG d={sm(landTop) + ' L' + landBot.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z'} color="#C9AE84" draw={draw} sw={2} />
    <path d={sm(landTop.slice(0, 6))} stroke="#6E8F5A" strokeWidth={8} fill="none" opacity={.6} />
    {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={1000 + rnd(i) * 900} cy={360 + rnd(i + 2) * 200} r={2 + rnd(i + 4) * 3} fill="#8C6E4A" opacity={.5} />)}
    <path d="M1300 260 L1358 186 L1416 260 Z" fill="#8C6E4A" opacity={.35} />
    <path d="M1372 176 L1388 196 L1470 284 L1600 272 L1560 330 L1400 300Z" fill="#3A2A1E" opacity={.18} />
    {/* the magma rising from the diving plate to the volcano */}
    <path d={`M1340 ${f1(slabTopY(1340))} C1330 600 1380 480 1358 420 C1350 330 1362 260 1358 180`} stroke="#E8642E" strokeWidth={10} fill="none" opacity={.85} />
    <path d={`M1340 ${f1(slabTopY(1340))} C1330 600 1380 480 1358 420 C1350 330 1362 260 1358 180`} stroke="#F6CF7A" strokeWidth={3} fill="none" opacity={.9} />
    <ellipse cx={1356} cy={430} rx={46} ry={22} fill="#E8642E" stroke={SEP} strokeWidth={1.4} />
    <ellipse cx={1358} cy={176} rx={16} ry={5} fill="#F6A848" opacity={.6 + .4 * puff} />
    {/* the ash */}
    {puff > 0 && Array.from({ length: 10 }, (_, i) => { const p = fr(tm * .22 + i / 10), r = (18 + p * 80) * (.4 + .6 * sst(puff));
      return <circle key={i} cx={1358 + Math.sin(i * 2.1) * 30 * p + p * 120} cy={170 - p * 260 * (.4 + .6 * puff)} r={r} fill={i % 2 ? '#8E8A80' : '#76726A'} stroke={SEP} strokeWidth={1} opacity={sst(puff) * (1 - p) * .9} />; })}
    {/* quakes along the contact */}
    {quakes > 0 && QX.map((xx, i) => { const f = Math.pow(Math.max(0, Math.sin(tm * 3 + rnd(i) * 30)), 8) * quakes;
      return f > .02 ? <g key={i}><Star x={xx} y={slabTopY(xx) - 2} r={4 + f * 7} glow={f} rays={f} col="#FFF4D2" />
        <circle cx={xx} cy={slabTopY(xx)} r={20 + (1 - f) * 40} fill="none" stroke="#FFF4D2" strokeWidth={2} opacity={f * .6} /></g> : null; })}
    {/* the sea surface */}
    <path d={`M-100 300 H1080`} stroke="#E8EEF0" strokeWidth={2.4} opacity={.8 * ph(draw, .3, 1)} />
    <KeyLight id={id} a={.7} />
  </g>;
};

// ================================================================ 13. RUG → HIMALAYA — a low 3/4 view into the corner of a room: the wall and its skirting board fill the
// top third, a big oriental medallion rug runs from the bottom edge of the frame to the wall, its fringe toward us. Low window light rakes in
// from the left, so every fold has a lit side, a dark side and a cast shadow. push 0..1 slides the rug into the wall: its flat near part
// travels, its far part rucks into 4 big rounded folds; peaks 0..1 the folds become tall snowy peaks (rock faces, white caps, a flag on the
// highest), a sky replaces the wall — while the near border and the fringe stay at the bottom of the frame (the match cut).
const RUGF: [N, N, N][] = [[.93, 1, .03], [.82, .86, .032], [.71, .7, .034], [.6, .52, .036]];   // material v (0 near … 1 at the wall), height, width
const RUGC = { red: '#9A3E2E', ind: '#2E3A5A', ivo: '#E8D9B4', och: '#C9A266', dk: '#3A2420', grn: '#4F6E5A' };
const rugPat = (u: N, v: N) => { const X = (u - .5) * 2600, Z = (v - .5) * 1260, d = Math.min(1300 - Math.abs(X), 630 - Math.abs(Z));
  if (d < 26) return RUGC.dk; if (d < 40) return RUGC.och; if (d < 50) return RUGC.dk; if (d < 150) return RUGC.ind; if (d < 162) return RUGC.och; if (d < 172) return RUGC.dk; return RUGC.red; };
const RUG_VF = .44;   // the folds take the material beyond this; the near part stays flat and carries the woven medallion
const rugMotifs = (() => { const o: [N, N][][] = [], col: string[] = [];
  const add = (pts: [N, N][], c: string) => { o.push(pts); col.push(c); };
  const circ = (cx: N, cz: N, r: N, c: string, n = 16) => add(Array.from({ length: n }, (_, i) => [cx + Math.cos(i / n * 2 * Math.PI) * r, cz + Math.sin(i / n * 2 * Math.PI) * r]), c);
  const MZ = -300, MS = .62;
  [[1, RUGC.dk], [.9, RUGC.ivo], [.56, RUGC.och], [.5, RUGC.ind], [.2, RUGC.och], [.17, RUGC.red], [.08, RUGC.ivo]].forEach(([k, c]) => add(Array.from({ length: 96 }, (_, i) => { const th = i / 96 * 2 * Math.PI, r = 290 * MS * (k as N) * (1 + .1 * Math.cos(8 * th)); return [Math.cos(th) * r * 2.1, MZ + Math.sin(th) * r]; }), c as string));
  for (let i = 0; i < 16; i++) { const th = (i + .5) / 16 * 2 * Math.PI, c = Math.cos(th), sn = Math.sin(th), a = .6 * 290 * MS, b2 = .86 * 290 * MS;
    add([[c * a * 2.1, MZ + sn * a], [(c * (a + b2) / 2 - sn * 14) * 2.1, MZ + sn * (a + b2) / 2 + c * 14], [c * b2 * 2.1, MZ + sn * b2], [(c * (a + b2) / 2 + sn * 14) * 2.1, MZ + sn * (a + b2) / 2 - c * 14]], RUGC.grn); }
  [-1, 1].forEach(sd => { add([[sd * 760 - 104, MZ], [sd * 760, MZ - 70], [sd * 760 + 104, MZ], [sd * 760, MZ + 70]], RUGC.och); add([[sd * 760 - 78, MZ], [sd * 760, MZ - 52], [sd * 760 + 78, MZ], [sd * 760, MZ + 52]], RUGC.ind); });
  [-1, 1].forEach(sx => { const cx = sx * (1300 - 172), cz = -630 + 172;
    [[300, 200, RUGC.och], [280, 186, RUGC.ind], [180, 120, RUGC.och], [156, 104, RUGC.ind]].forEach(([rx, rz, c]) => add([[cx, cz], ...Array.from({ length: 13 }, (_, i) => { const a = i / 12 * Math.PI / 2; return [cx - sx * Math.cos(a) * (rx as N), cz + Math.sin(a) * (rz as N)] as [N, N]; })], c as string)); });
  const ros = (cx: N, cz: N) => { circ(cx, cz, 40, RUGC.dk); circ(cx, cz, 33, RUGC.och); circ(cx, cz, 16, RUGC.red, 10); };
  for (let X = -1300 + 170; X <= 1300 - 170; X += 140) ros(X, -630 + 100);
  for (let Z = -630 + 240; Z <= -120; Z += 140) { ros(-1300 + 100, Z); ros(1300 - 100, Z); }
  for (let X = -1100; X <= 1100; X += 130) for (let Z = -400; Z <= -60; Z += 130) { const r = Math.hypot(X / 2.1, Z + 300); if (r < 200 || Math.abs(Math.abs(X) - 760) / 1.5 + Math.abs(Z + 300) < 110) continue;
    add([[X - 14, Z], [X, Z - 12], [X + 14, Z], [X, Z + 12]], RUGC.och); }
  return { o, col }; })();
const RugHimalaya: React.FC<{ x?: N; y?: N; s?: N; draw?: N; push?: N; peaks?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, push = 0, peaks = 0, tm = 0 }) => {
  const id = 'rug' + Math.round(x), pk = sst(peaks), comp = sst(push), ZW = 1700, LR = 1260, YAW = -16 * D2R, ZC = 1200, F = 1350, CH = 560, HY = 90, DZ = 380;
  // camera: yawed about the rug's middle so the wall recedes to the right; looking down from about 3/4 height
  const P = (X: N, Y: N, Z: N): Pt => { const xr = X * Math.cos(YAW) - (Z - ZC) * Math.sin(YAW), zr = X * Math.sin(YAW) + (Z - ZC) * Math.cos(YAW) + ZC + DZ; return [960 + 120 + xr * F / zr, HY + (CH - Y) * F / zr]; };
  const depth = (X: N, Z: N) => X * Math.sin(YAW) + (Z - ZC) * Math.cos(YAW);
  // material v → floor Z: the flat near part slides toward the wall; the fold zone is squeezed
  const slide = comp * .27 * LR, ZE = ZW - LR + slide, Zf = ZE + RUG_VF * LR;
  const Zv = (v: N) => v < RUG_VF ? ZE + v * LR : lerp(Zf, ZW, (v - RUG_VF) / (1 - RUG_VF));
  const vZ = (Z: N) => Z < Zf ? (Z - ZE) / LR : RUG_VF + (Z - Zf) / (ZW - Zf) * (1 - RUG_VF);
  const Xu = (u: N) => lerp(-1300, 1300, u) * (1 + pk * .5);
  const mtn = (u: N, j: N) => { let m = 0; for (let q = 0; q < 7; q++) { const c = rnd(j * 17 + q * 3.1), w = .07 + .08 * rnd(j * 5 + q), hh = .55 + .45 * rnd(j * 11 + q * 7);
      m = Math.max(m, hh * (Math.cos(Math.min(1, Math.abs(u - c) / w) * Math.PI) * .5 + .5) ** 1.3); } return .3 + .7 * m; };
  const fc = (u: N, j: N) => RUGF[j][0] + .022 * Math.sin(u * 4.2 + j * 1.7) * (1 - pk);
  const Hm = 400 * (1 + pk * 1.1);
  const H = (u: N, v: N) => v < RUG_VF - .02 ? 0 : RUGF.reduce((a, [, hf, w], j) => { const c = fc(u, j), ww = w * (1 + pk * 1.2), g1 = Math.exp(-(((v - c) / ww) ** 2)), g2 = Math.max(0, 1 - Math.abs(v - c) / (ww * 2.2)) ** 1.5;
    return Math.max(a, hf * lerp(g1, g2, pk) * lerp((.45 + .55 * Math.sin(Math.PI * u) ** .6) * (.66 + .34 * Math.sin(u * 9 + j * 2.3)), mtn(u, j), pk)); }, 0) * comp * Hm;
  // light: low from the left and a little from the front; shadows by marching the height field toward the light
  const L0 = [-.72, .42, -.55], Ln = Math.hypot(...L0), Lx = L0[0] / Ln, Ly = L0[1] / Ln, Lz = L0[2] / Ln;
  const shadowAt = (X: N, Yh: N, Z: N) => { if (comp < .05) return 0; for (let t = 30; t < 900; t += 30) { const xx = X + Lx * t, zz = Z + Lz * t, yy = Yh + Ly * t; if (yy > Hm) return 0;
      const u = (xx / (1 + pk * .5) + 1300) / 2600, v = vZ(zz); if (u < 0 || u > 1 || v < RUG_VF || v > 1) continue; if (H(u, v) > yy + 4) return 1; } return 0; };
  const NU = 120, NV = 90, vS = (j: N) => j < 18 ? j / 18 * RUG_VF : RUG_VF + (j - 18) / (NV - 18) * (1 - RUG_VF);
  const far: { d: N; el: React.ReactNode }[] = [], near: { d: N; el: React.ReactNode }[] = [];
  for (let j = 0; j < NV; j++) { const v0 = vS(j), v1 = vS(j + 1), Z0 = Zv(v0), Z1 = Zv(v1), keepRug = 1 - cl((v0 - .1) * 8);
    for (let i = 0; i < NU; i++) { const u0 = i / NU, u1 = (i + 1) / NU, h00 = H(u0, v0), h10 = H(u1, v0), h01 = H(u0, v1), h11 = H(u1, v1);
      const X0 = Xu(u0), X1 = Xu(u1), ax = X1 - X0, ay = (h10 - h00) * 2.4, by = (h01 - h00) * 2.4, bz = Z1 - Z0; /* slopes exaggerated for the shading */ let nx = ay * bz, ny = -ax * bz, nz = ax * by; if (ny < 0) { nx = -nx; ny = -ny; nz = -nz; }
      const nl = Math.hypot(nx, ny, nz) || 1, lit0 = Math.max(0, (nx * Lx + ny * Ly + nz * Lz) / nl), hm = (h00 + h10 + h01 + h11) / 4, sh = shadowAt((X0 + X1) / 2, hm, (Z0 + Z1) / 2), lit = lit0 * (1 - .6 * sh);
      const um = (u0 + u1) / 2, vm = (v0 + v1) / 2, rel = hm / Hm, dv = v1 - v0;
      const base = mix(mix(rugPat(u0 + .25 / NU, v0 + .25 * dv), rugPat(u0 + .75 / NU, v0 + .75 * dv), .5), mix(rugPat(u0 + .75 / NU, v0 + .25 * dv), rugPat(u0 + .25 / NU, v0 + .75 * dv), .5), .5);
      const ao = v0 >= RUG_VF && comp > 0 ? cl(1 - rel * 1.6) * .5 * comp : 0;   // the troughs between folds go dark
      const rugC = mix(lit < Ly ? mix(base, '#1A100C', cl((Ly - lit) / Ly) * .8) : mix(base, '#FFF0D2', cl((lit - Ly) / (1 - Ly)) * .5), '#1A100C', ao);
      const snowK = cl((rel - (.55 + .06 * Math.sin(um * 23 + vm * 9)) + lit * .12) / .1), rockC = mix(mix('#2E3038', '#B0ACA4', lit), mix('#4E5A3E', '#A4A070', lit), cl((.22 - rel) / .12));
      const rock = mix(rockC, mix('#C8D6E6', '#FFFFFF', lit), snowK), c = mix(rugC, mix(rock, '#BFD0DC', .45 * cl((vm - .6) / .4)), pk * (1 - keepRug));
      const el = <path key={j + '_' + i} d={pathOf([P(X0, h00, Z0), P(X1, h10, Z0), P(X1, h11, Z1), P(X0, h01, Z1)], true)} fill={c} stroke={c} strokeWidth={1.3} />;
      (v0 >= RUG_VF ? far : near).push({ d: depth((X0 + X1) / 2, (Z0 + Z1) / 2) - hm * .3, el }); } }
  far.sort((a, b) => b.d - a.d); near.sort((a, b) => b.d - a.d);
  const Pm = (X: N, Z: N): Pt => { const u = X / 2600 + .5, v = Z / 1260 + .5; return P(Xu(u), 0, Zv(v)); };
  const flatClip = pathOf([P(Xu(0), 0, Zv(0)), P(Xu(1), 0, Zv(0)), P(Xu(1), 0, Zv(RUG_VF - .015)), P(Xu(0), 0, Zv(RUG_VF - .015))], true);
  const crests = RUGF.map((_, k) => Array.from({ length: NU + 1 }, (_, i) => P(Xu(i / NU), H(i / NU, fc(i / NU, k)), Zv(fc(i / NU, k)))));
  const front = Array.from({ length: NU + 1 }, (_, i) => P(Xu(i / NU), 0, Zv(0)));
  const wallQ = (y0: N, y1: N) => pathOf([P(-4200, y0, ZW), P(4200, y0, ZW), P(4200, y1, ZW), P(-4200, y1, ZW)], true);
  let best = -1, tu = .5; if (pk > .5) for (let i = 0; i <= 80; i++) { const u = .1 + i / 100, h = H(u, fc(u, 0)); if (h > best) { best = h; tu = u; } }
  const tp = P(Xu(tu), best, Zv(fc(tu, 0)));
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sky', [[0, '#6E9CC0'], [.7, '#B9D0DE'], [1, '#EEF2EE']])}<clipPath id={id + 'fl'}><path d={flatClip} /></clipPath></defs>
    {/* the room: floorboards, the wall with its paper and a window's light, the skirting board */}
    <g opacity={ph(draw, 0, .5) * (1 - pk)}>
      <rect x={-100} y={-100} width={2120} height={1300} fill="#9A6A42" />
      {Array.from({ length: 22 }, (_, i) => { const X = (i - 11) * 220; return <path key={i} d={pathOf([P(X, 0, ZW), P(X, 0, 100)])} stroke="#4F3020" strokeWidth={1.4} opacity={.5} />; })}
      <path d={wallQ(0, 2600)} fill="#DCC9A0" />
      {Array.from({ length: 34 }, (_, i) => <path key={'w' + i} d={pathOf([P(-4000 + i * 240, 90, ZW), P(-4000 + i * 240, 2600, ZW)])} stroke="#B89A6E" strokeWidth={9} opacity={.3} />)}
      <path d={pathOf([P(-2600, 2600, ZW), P(-1300, 2600, ZW), P(-500, 90, ZW), P(-1900, 90, ZW)], true)} fill="#FFF4D8" opacity={.45} />
      <path d={wallQ(0, 90)} fill="#7A4A2C" stroke={SEP} strokeWidth={1.6} /><path d={pathOf([P(-4200, 80, ZW), P(4200, 80, ZW)])} stroke="#C99A6A" strokeWidth={3} />
      <path d={pathOf([P(-4200, 0, ZW), P(4200, 0, ZW), P(4200, 0, ZW - 60), P(-4200, 0, ZW - 60)], true)} fill="#1A100C" opacity={.35} filter="url(#b8)" />
    </g>
    {/* the sky and the valley arrive as the rug becomes a range */}
    {pk > 0 && <g opacity={pk}><rect x={-100} y={-100} width={2120} height={1300} fill={`url(#${id}sky)`} /><path d={pathOf([P(-2200, 0, ZW), P(2200, 0, ZW), P(2200, 0, 200), P(-2200, 0, 200)], true)} fill="#8E9070" /></g>}
    {/* the rug's contact shadow on the floor */}
    <path d={pathOf([...front, P(Xu(1), 0, ZW), P(Xu(0), 0, ZW)].map(p => [p[0] + 18, p[1] + 10] as Pt), true)} fill="#1A100C" opacity={.45 * (1 - pk)} filter="url(#b8)" />
    <g opacity={ph(draw, .2, .8)}>
      {far.map(q => q.el)}
      {near.map(q => q.el)}
      {/* the woven medallion and borders on the flat part */}
      <g clipPath={`url(#${id}fl)`} opacity={1 - pk * .15}>{rugMotifs.o.map((m, k) => { const pts: Pt[] = []; m.forEach((p, i2) => { const q = m[(i2 + 1) % m.length]; for (let t = 0; t < 1; t += .5) pts.push(Pm(lerp(p[0], q[0], t), lerp(p[1], q[1], t))); });
        const cc = mix(rugMotifs.col[k], '#1A100C', .1); return <path key={k} d={pathOf(pts, true)} fill={cc} stroke={mix(cc, '#1A100C', .25)} strokeWidth={.8} />; })}</g>
      {/* fold crests in ink */}
      {comp > .15 && crests.map((c2, k) => <path key={'cr' + k} d={pathOf(c2)} stroke={SEP} strokeWidth={1.4 + pk * .8} fill="none" opacity={.5 * ph(comp, .15, .5) * (1 - pk)} strokeLinejoin="round" />)}
      <path d={pathOf(front)} stroke={SEP} strokeWidth={2} fill="none" />
      {/* the fringe */}
      {Array.from({ length: 64 }, (_, i) => { const X = Xu((i + .5) / 64), a = P(X, 0, Zv(0)), b = P(X + (rnd(i) - .5) * 30, 0, Zv(0) - 80 - rnd(i + 3) * 20);
        return <g key={'f' + i}><path d={`M${f1(a[0])} ${f1(a[1])} Q${f1((a[0] + b[0]) / 2 + 4)} ${f1((a[1] + b[1]) / 2)} ${f1(b[0])} ${f1(b[1])}`} stroke="#3A2A1E" strokeWidth={5} fill="none" strokeLinecap="round" opacity={.4} transform="translate(5 5)" />
          <path d={`M${f1(a[0])} ${f1(a[1])} Q${f1((a[0] + b[0]) / 2 + 4)} ${f1((a[1] + b[1]) / 2)} ${f1(b[0])} ${f1(b[1])}`} stroke="#EFE2C6" strokeWidth={4.4} fill="none" strokeLinecap="round" />
          <circle cx={a[0] + (b[0] - a[0]) * .2} cy={a[1] + (b[1] - a[1]) * .2} r={3.6} fill="#D9C9A4" stroke={SEP} strokeWidth={.6} /></g>; })}
      {pk > .5 && <g opacity={ph(pk, .6, 1)}><path d={`M${f1(tp[0])} ${f1(tp[1])} v-70`} stroke={SEP} strokeWidth={3} />
        <path d={`M${f1(tp[0])} ${f1(tp[1] - 70)} q22 ${f1(4 + Math.sin(tm * 6) * 4)} 44 0 l0 24 q-22 ${f1(-4 + Math.sin(tm * 6 + 1) * 4)} -44 0Z`} fill={VER} stroke={SEP} strokeWidth={1.4} /></g>}
    </g>
    <KeyLight id={id} a={.8} />
  </g>;
};

// ================================================================ 14. ATLANTIC OPEN — the Atlantic from space: the Americas left, Europe and Africa right, the ridge glowing down the middle
// open 0..1 the two sides creep apart (up to 40 px), the seam widening; glow 0..1 the ridge glow.
const AtlanticOpen: React.FC<{ x?: N; y?: N; s?: N; draw?: N; open?: N; glow?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, open = 0, glow = 0, tm = 0 }) => {
  const id = 'atl' + Math.round(x), g: GV = { cx: 960, cy: 560, r: 640, lo0: -28, la0: 8 }, o = sst(open) * 20;
  const R = gRuns(RIDGES[0], g).concat(gRuns(RIDGES[1].slice(0, 4), g)), pulse = .8 + .2 * Math.sin(tm * 2.2);
  const stars = useMemo(() => starField(19, 110, -100, -100, 2120, 1280, 2), []);
  return <g transform={TR(x, y, s)}>
    <rect x={-100} y={-100} width={2120} height={1280} fill="#0B1030" opacity={ph(draw, 0, .4)} />
    {stars.map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r * .6} fill="#FFF4D2" opacity={.5} />)}
    <circle cx={960} cy={560} r={660} fill="#7FA8C4" opacity={.35} filter="url(#b8)" />
    <GlobeBody g={g} id={id} draw={draw} sea={['#2E6A9A', '#0E2A48']} land="#B8B27A" off={k => [WEST.has(k) ? -o : o, 0]} grat={0} shade={.5} landSw={1.4} />
    <defs><clipPath id={id + 'k'}><circle cx={960} cy={560} r={640} /></clipPath></defs>
    <g clipPath={`url(#${id}k)`}>
      {/* the opening seam: new sea floor along the ridge */}
      <path d={runsPath(R)} stroke="#1D4566" strokeWidth={2 + o * 1.2} fill="none" opacity={.9} strokeLinejoin="round" />
      <path d={runsPath(R)} stroke="#FFB08A" strokeWidth={14 + o * .8} fill="none" opacity={.45 * glow * pulse} filter="url(#b8)" strokeLinejoin="round" />
      <path d={runsPath(R)} stroke={VER} strokeWidth={3.4 + o * .15} fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={.6 + .4 * glow} />
      {/* clouds drifting */}
      {Array.from({ length: 9 }, (_, i) => { const cx2 = 360 + fr(rnd(i) + tm * .006) * 1200, cy2 = 140 + rnd(i + 4) * 820;
        return <path key={i} d={`M${f1(cx2)} ${f1(cy2)} q40 -18 90 -4 q30 -16 70 2 q-40 18 -100 12 q-40 6 -60 -10Z`} fill="#FFFFFF" opacity={.35} filter="url(#b2s)" />; })}
    </g>
    <circle cx={960} cy={560} r={642} fill="none" stroke="#C9DDE6" strokeWidth={6} opacity={.5} filter="url(#b2s)" />
  </g>;
};

// ================================================================ 15. GPS MARKER — a satellite crosses a clear sky; a beam drops to a brass survey marker bolted into rock; a readout ticks
// sat 0..1 glides the satellite left→right; beam 0..1 the beam (pulsing with tm); tick 0..1 the readout counts up to "+2.5 cm".
const GPSMarker: React.FC<{ x?: N; y?: N; s?: N; draw?: N; sat?: N; beam?: N; tick?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, sat = 0, beam = 0, tick = 0, tm = 0 }) => {
  const id = 'gps' + Math.round(x), sx = 220 + sat * 1480, sy = 180, M: Pt = [960, 812];
  const rock = sm([[-100, 900], [200, 840], [420, 790], [640, 770], [860, 760], [1080, 768], [1300, 780], [1520, 800], [1760, 850], [2020, 900]]);
  return <g transform={TR(x, y, s)}>
    <defs>{grad(id + 'sk', [[0, '#7FA8C4'], [1, '#E6F0F2']])}</defs>
    <rect x={-100} y={-100} width={2120} height={1280} fill={`url(#${id}sk)`} opacity={ph(draw, 0, .5)} />
    {/* the sun, low at the upper left */}
    <circle cx={180} cy={150} r={260} fill="#FFF4D2" opacity={.45} filter="url(#b30)" /><circle cx={180} cy={150} r={46} fill="#FFF4D2" stroke="#F3D88E" strokeWidth={3} />
    {[[300, 420, 120], [1500, 360, 160], [900, 480, 90]].map(([a, b, w], i) => <path key={i} d={`M${a - w} ${b} q${w * .3} -36 ${w * .6} -8 q${w * .4} -44 ${w * .8} 0 q${w * .4} -6 ${w * .6} 8Z`} fill="#FFFFFF" opacity={.7 * ph(draw, .2, .8)} />)}
    <path d="M-100 760 L180 700 L360 730 L560 690 L760 720 L1000 680 L1240 716 L1460 686 L1700 712 L2020 690 V900 H-100Z" fill="#A9B8C4" opacity={.5 * ph(draw, .2, .7)} />
    {/* the rocky outcrop */}
    <RG d={`${rock} L2020 1180 L-100 1180Z`} color="#A39E92" draw={draw} sw={2.2} />
    {[[300, 860, 80, 50], [620, 830, 60, 90], [1250, 840, -50, 80], [1600, 880, 70, 60], [900, 900, 40, 120]].map(([a, b, c, d2], i) => <Line key={i} d={`M${a} ${b} l${c * .5} ${d2 * .4} l${-c * .2} ${d2 * .3} l${c * .6} ${d2 * .5}`} w={1.6} a={.6} />)}
    {[[180, 850], [520, 790], [1420, 796], [1740, 852]].map(([a, b], i) => <path key={'g' + i} d={`M${a} ${b} l-8 -24 M${a + 6} ${b} l2 -30 M${a + 12} ${b} l10 -22`} stroke="#5F8A5A" strokeWidth={2.4} strokeLinecap="round" />)}
    {/* the survey marker: a brass disc set in a cement collar */}
    <ellipse cx={M[0] + 34} cy={M[1] + 18} rx={150} ry={46} fill="#2B2620" opacity={.3} filter="url(#b8)" />
    <ellipse cx={M[0]} cy={M[1] + 4} rx={140} ry={52} fill="#C9C2B4" stroke={SEP} strokeWidth={1.6} />
    <ellipse cx={M[0]} cy={M[1]} rx={100} ry={38} fill="url(#gold)" stroke={SEP} strokeWidth={2} />
    <ellipse cx={M[0]} cy={M[1]} rx={78} ry={29} fill="none" stroke="#8A6420" strokeWidth={1.6} />
    <path d={`M${M[0] - 14} ${M[1] + 6} L${M[0]} ${M[1] - 12} L${M[0] + 14} ${M[1] + 6}Z`} fill="none" stroke="#8A6420" strokeWidth={1.6} />
    <circle cx={M[0]} cy={M[1]} r={3} fill={SEP} />
    {beam > 0 && <ellipse cx={M[0]} cy={M[1]} rx={122} ry={46} fill="none" stroke="#FFF4D2" strokeWidth={3} opacity={beam * (.5 + .5 * Math.sin(tm * 6))} />}
    {/* the beam */}
    {beam > 0 && <g opacity={sst(beam)}>
      <path d={`M${f1(sx)} ${sy + 50} L${M[0]} ${M[1]}`} stroke="#FFF4D2" strokeWidth={12} opacity={.35} filter="url(#b2s)" />
      <path d={`M${f1(sx)} ${sy + 50} L${M[0]} ${M[1]}`} stroke={GOLD} strokeWidth={2.4} strokeDasharray="14 10" strokeDashoffset={f1(-tm * 90)} />
      {[0, 1, 2].map(j => { const p = fr(tm * .7 + j / 3); return <circle key={j} cx={f1(lerp(sx, M[0], p))} cy={f1(lerp(sy + 50, M[1], p))} r={6} fill="#FFF4D2" stroke={GOLD} strokeWidth={1.4} />; })}
    </g>}
    {/* the readout */}
    <g opacity={ph(tick, 0, .1)}>
      <Line d={`M${M[0] + 70} ${M[1] - 14} L1170 700`} w={1.4} a={.8} />
      <rect x={1190} y={668} width={260} height={92} rx={10} fill="#2B2620" opacity={.3} filter="url(#b8)" />
      <rect x={1170} y={650} width={260} height={92} rx={10} fill="#2B2620" stroke={SEP} strokeWidth={2} />
      <rect x={1182} y={662} width={236} height={68} rx={4} fill="#3A3428" />
      <text x={1300} y={712} fontSize={44} fontFamily={FIG} textAnchor="middle" fill={GOLDL}>{`+${(sst(tick) * 2.5).toFixed(1)} cm`}</text>
    </g>
    {/* the satellite */}
    <g transform={`rotate(${f1(Math.sin(tm * .8) * 2)} ${f1(sx)} ${sy})`}>
      {[-1, 1].map(sd => <g key={sd}><Line d={`M${f1(sx + sd * 36)} ${sy} H${f1(sx + sd * 70)}`} w={3} col="#5A5650" a={1} />
        <rect x={sd < 0 ? sx - 250 : sx + 70} y={sy - 30} width={180} height={60} fill="#2E5C86" stroke={SEP} strokeWidth={1.8} />
        {Array.from({ length: 6 }, (_, i) => <Line key={i} d={`M${f1((sd < 0 ? sx - 250 : sx + 70) + (i + 1) * 30)} ${sy - 30} V${sy + 30}`} w={1} col="#9CCAD6" a={.7} />)}
        <Line d={`M${f1(sd < 0 ? sx - 250 : sx + 70)} ${sy} h180`} w={1} col="#9CCAD6" a={.7} /></g>)}
      <rect x={sx - 36} y={sy - 36} width={72} height={72} fill="url(#gold)" stroke={SEP} strokeWidth={2} />
      <path d={`M${sx - 36} ${sy - 10} H${sx + 36} M${sx - 10} ${sy - 36} V${sy + 36}`} stroke="#8A6420" strokeWidth={1.2} />
      <path d={`M${sx - 22} ${sy + 36} Q${sx} ${sy + 62} ${sx + 22} ${sy + 36}Z`} fill="#E8EEF0" stroke={SEP} strokeWidth={1.4} />
      <Line d={`M${sx} ${sy + 46} V${sy + 58}`} w={2} a={1} />
    </g>
    <KeyLight id={id} a={.7} />
  </g>;
};

// ================================================================ 16. NAIL → ATLANTIC — a hand resting flat on a sunlit rock below a wooden ruler; the fingernail grows; its tip line becomes the Atlantic
// grow 0..1 the nail tip grows and a vermilion bracket on the ruler with it; line 0..1 a vermilion line along the nail tip; ocean 0..1 the
// line widens into a strip of ocean whose coasts are Brazil's bulge and West Africa's hollow, as the hand fades.
// The hand (FlatHand): a right hand seen from the back, resting flat, fingers together and pointing right, thumb relaxed upward. Proportions
// from an adult hand (palm 100 mm, fingers index 74 · middle 82 · ring 77 · little 60 mm from the knuckle, tapering 19 → 15 mm, joints a
// little wider than the shafts), drawn at a large scale where the engine's HumanHand reads as tubes: knuckle bumps, joint creases, tendons,
// nail beds with lunulae, a soft gradient from the lit (upper) to the shaded side, and a cast shadow on the rock (daylight from the upper left).
const HFING: [Pt, N, N, N, N][] = [[[97, -27.5], 74, -4, 21, 15.5], [[101, -7.5], 82, -.5, 21.5, 16.5], [[97, 11.5], 77, 3.5, 19, 14.5], [[86, 27.5], 60, 9, 15, 11.5]];   // knuckle, length, angle°, base w, tip w
const fingerGeom = (i: N) => { const [B, L, a, wb, wt] = HFING[i], ux = Math.cos(a * D2R), uy = Math.sin(a * D2R);
  const at = (t: N, v: N): Pt => [B[0] + ux * L * t - uy * v, B[1] + uy * L * t + ux * v];
  const w = (t: N) => (lerp(wb, wt, t) + 1.3 * Math.exp(-(((t - .45) / .06) ** 2)) + .7 * Math.exp(-(((t - .74) / .05) ** 2))) / 2;
  const up: Pt[] = [], dn: Pt[] = []; for (let k = 0; k <= 20; k++) { const t = -.14 + k / 20 * 1.04; up.push(at(t, -w(t))); dn.push(at(t, w(t))); }
  const tipArc: Pt[] = []; for (let k = 1; k < 10; k++) { const an = -Math.PI / 2 + k / 10 * Math.PI; tipArc.push(at(.9 + Math.cos(an) * .1 * 1.0, Math.sin(an) * w(.95))); }
  return { at, w, outline: [...up, ...tipArc, ...dn.reverse()], side: [...up.slice(3), ...tipArc, ...[...dn].slice(0, -3)], low: dn.slice(3).map(([a, c]): Pt => [a, c - 1.6]), tip: at(1, 0) };
};
const FlatHand: React.FC<{ x: N; y: N; s: N; id: string; sil?: boolean; skin?: string; sleeve?: string }> = ({ x, y, s, id, sil = false, skin = '#E2B48E', sleeve = '#6A7A8E' }) => {
  const T = (p: Pt): Pt => [x + p[0] * s, y + p[1] * s], pth = (pts: Pt[], c = true) => pathOf(pts.map(T), c);
  const thumbB: Pt = [14, -18], ta = -48 * D2R, tb = -30 * D2R, tm1: Pt = [thumbB[0] + Math.cos(ta) * 58, thumbB[1] + Math.sin(ta) * 58], ttip: Pt = [tm1[0] + Math.cos(tb) * 34, tm1[1] + Math.sin(tb) * 34];
  const thumbSide = (p: Pt, q: Pt, w0: N, w1: N, sd: N): Pt[] => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy), nx = -dy / l * sd, ny = dx / l * sd; return [[p[0] + nx * w0, p[1] + ny * w0], [q[0] + nx * w1, q[1] + ny * w1]]; };
  const tA = thumbSide(thumbB, tm1, 19, 12, 1), tB = thumbSide(tm1, ttip, 12, 10, 1), tC = thumbSide(tm1, ttip, 12, 10, -1), tD = thumbSide(thumbB, tm1, 19, 12, -1);
  const tu = [Math.cos(tb), Math.sin(tb)], thumb: Pt[] = [tA[0], tA[1], tB[1], ...Array.from({ length: 7 }, (_, k) => { const an = (k + 1) / 8 * Math.PI, c = Math.cos(an), sn = Math.sin(an); return [ttip[0] + (-tu[1] * c + tu[0] * sn) * 10, ttip[1] + (tu[0] * c + tu[1] * sn) * 10] as Pt; }), tC[1], tC[0], tD[0]];
  const palm: Pt[] = [[-6, -31], [20, -33], [44, -40], [70, -38], [92, -37], [104, -30], [107, -12], [104, 10], [98, 30], [90, 38], [60, 38], [30, 35], [-6, 32]];
  const arm: Pt[] = [[-260, -36], [-6, -31], [-6, 32], [-260, 37]];
  const F = [3, 2, 0, 1].map(i => ({ i, ...fingerGeom(i) }));
  if (sil) return <g><path d={sm(arm.map(T), true)} /><path d={pth(thumb)} /><path d={sm(palm.map(T), true)} />{F.map(f => <path key={f.i} d={pth(f.outline)} />)}</g>;
  const sk = `url(#${id}g)`, nail = (f: ReturnType<typeof fingerGeom>) => { const n0 = .735, n1 = .965, wn = (t: N) => f.w(t) * .7;
    const L: Pt[] = [], R: Pt[] = []; for (let k = 0; k <= 6; k++) { const t = lerp(n0, n1, k / 6); L.push(f.at(t, -wn(t))); R.push(f.at(t, wn(t))); }
    const base: Pt[] = Array.from({ length: 5 }, (_, k) => f.at(n0 - .025 * Math.sin((k + 1) / 6 * Math.PI), lerp(wn(n0), -wn(n0), (k + 1) / 6)));
    const lun: Pt[] = [f.at(n0, -wn(n0) * .6), f.at(n0 + .04, 0), f.at(n0, wn(n0) * .6)];
    return <g><path d={pth([...L, ...R.reverse(), ...base])} fill="#EDC4B0" stroke={SEP} strokeWidth={1.2} />
      <path d={sm(lun.map(T))} stroke="#F8E4D8" strokeWidth={2.4 * s / 4} fill="none" />
      <path d={sm([f.at(n0 + .03, -wn(n0) * .45), f.at(n1 - .04, -wn(n1) * .5)].map(T))} stroke="#FFFFFF" strokeWidth={1.6} opacity={.7} fill="none" /></g>; };
  return <g>
    <defs><linearGradient id={id + 'g'} gradientUnits="userSpaceOnUse" x1={0} y1={f1(y - 50 * s)} x2={0} y2={f1(y + 50 * s)}><stop offset="0" stopColor={mix(skin, '#FFF2E2', .35)} /><stop offset=".5" stopColor={skin} /><stop offset="1" stopColor={mix(skin, '#7A4A30', .4)} /></linearGradient></defs>
    <path d={sm(arm.map(T), true)} fill={sk} stroke={SEP} strokeWidth={1.8} />
    {/* the thumb, lying flat, under the edge of the palm */}
    <path d={pth(thumb)} fill={sk} stroke={SEP} strokeWidth={1.8} strokeLinejoin="round" />
    {(() => { const m: Pt = [lerp(tm1[0], ttip[0], .62), lerp(tm1[1], ttip[1], .62)], q = (u: N, v: N): Pt => [m[0] + tu[0] * u - tu[1] * v, m[1] + tu[1] * u + tu[0] * v];
      return <g><path d={pth([q(-4, -6.5), q(9, -6), q(13, 0), q(9, 6), q(-4, 6.5), q(-6, 0)])} fill="#EDC4B0" stroke={SEP} strokeWidth={1.2} />
        <path d={sm([q(-2, -4), q(0, 0), q(-2, 4)].map(T))} stroke="#F8E4D8" strokeWidth={2.4} fill="none" />
        <path d={sm(([[tm1[0] - 4, tm1[1] - 6], [tm1[0] + 2, tm1[1] + 1], [tm1[0] + 7, tm1[1] + 7]] as Pt[]).map(T))} stroke={SEP} strokeWidth={1} fill="none" opacity={.5} /></g>; })()}
    {/* the back of the hand */}
    <path d={sm(palm.map(T), true)} fill={sk} stroke={SEP} strokeWidth={1.8} />
    {HFING.map(([k], i) => <path key={'td' + i} d={sm(([[8, -12 + i * 8], [50, -16 + i * 13], [k[0] - 8, k[1]]] as Pt[]).map(T))} stroke={mix(skin, '#7A4A30', .45)} strokeWidth={1.2} fill="none" opacity={.45} />)}
    {[[20, 6], [36, 14], [24, 22]].map(([a, b], i) => <path key={'v' + i} d={sm(([[a, b - 10], [a + 14, b], [a + 30, b + 4]] as Pt[]).map(T))} stroke="#8A9AB8" strokeWidth={1.4} fill="none" opacity={.25} />)}
    {/* the fingers, together, each a little over the next (little → middle) */}
    {F.map(f => <g key={f.i}>
      <path d={pth(f.outline)} fill={sk} /><path d={pth(f.low, false)} stroke={mix(skin, '#6A3A22', .5)} strokeWidth={3.2 * s / 4} fill="none" opacity={.35} /><path d={pth(f.side, false)} fill="none" stroke={SEP} strokeWidth={1.7} strokeLinejoin="round" />
      {/* knuckle bump, joint creases */}
      <path d={sm([f.at(-.04, -f.w(0) * .55), f.at(.03, 0), f.at(-.04, f.w(0) * .55)].map(T))} stroke="#FFF2E2" strokeWidth={3} fill="none" opacity={.35} />
      {[-.03, 0, .03].map((o, j) => <path key={j} d={sm([f.at(.45 + o, -f.w(.45) * .55), f.at(.45 + o + .012, 0), f.at(.45 + o, f.w(.45) * .55)].map(T))} stroke={SEP} strokeWidth={.9} fill="none" opacity={.45 - Math.abs(o) * 5} />)}
      <path d={sm([f.at(.72, -f.w(.72) * .45), f.at(.73, 0), f.at(.72, f.w(.72) * .45)].map(T))} stroke={SEP} strokeWidth={.9} fill="none" opacity={.4} />
      {nail(f)}
    </g>)}
    {/* the cuff of a work shirt */}
    <path d={pathOf([[x - 400, y - 46 * s], [x - 40 * s, y - 44 * s], [x - 32 * s, y - 12 * s], [x - 40 * s, y + 44 * s], [x - 400, y + 48 * s]], true)} fill={sleeve} stroke={SEP} strokeWidth={2} />
    {[0, 1, 2].map(i => <path key={i} d={`M${f1(x - (56 + i * 22) * s)} ${f1(y - 44 * s)} q${f1(-6 * s)} ${f1(40 * s)} ${f1(2 * s)} ${f1(88 * s)}`} stroke={SEP} strokeWidth={1.2} fill="none" opacity={.4} />)}
    <circle cx={x - 46 * s} cy={y + 24 * s} r={3 * s} fill="#E6DCC8" stroke={SEP} strokeWidth={1} />
  </g>;
};
const NailAtlantic: React.FC<{ x?: N; y?: N; s?: N; draw?: N; grow?: N; line?: N; ocean?: N; tm?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, grow = 0, line = 0, ocean = 0, tm = 0 }) => {
  const id = 'nat' + Math.round(x), HX = 250, HY = 600, HS = 4.4, mg = fingerGeom(1), [, , ma] = HFING[1], dir = ma * D2R;
  const T: Pt = [HX + mg.tip[0] * HS, HY + mg.tip[1] * HS], RY = T[1] - 14, ux = Math.cos(dir), uy = Math.sin(dir), w = mg.w(.95) * .72 * HS;
  const e = 4 + sst(grow) * 30, E: Pt = [T[0] + ux * e, T[1] + uy * e], oc = sst(ocean), hand = 1 - oc;
  const q = (u: N, v: N): string => `${f1(T[0] - ux * 6 + ux * u - uy * v)} ${f1(T[1] - uy * 6 + uy * u + ux * v)}`;
  const Wd = oc * 760, xc = E[0];
  const coastL = Array.from({ length: 23 }, (_, i) => { const yy = -60 + i * 55; return [xc - Wd / 2 + oc * (70 * Math.exp(-(((yy - 640) / 170) ** 2)) - 30 * Math.exp(-(((yy - 250) / 120) ** 2))), yy] as Pt; });
  const coastR = Array.from({ length: 23 }, (_, i) => { const yy = -60 + i * 55; return [xc + Wd / 2 - oc * (80 * Math.exp(-(((yy - 380) / 150) ** 2)) - 40 * Math.exp(-(((yy - 640) / 140) ** 2))), yy] as Pt; });
  return <g transform={TR(x, y, s)}>
    <defs><radialGradient id={id + 'sun'} cx=".15" cy=".05" r=".9"><stop offset="0" stopColor="#FFF0C8" stopOpacity={.55} /><stop offset="1" stopColor="#FFF0C8" stopOpacity={0} /></radialGradient></defs>
    {/* the rock, warm in the afternoon sun from the upper left */}
    <RG d="M-100 -100 H2020 V1180 H-100Z" color="#B8AE98" draw={draw} sw={0} rim={false} />
    {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={rnd(i * 3) * 1920} cy={rnd(i * 5) * 1080} r={2 + rnd(i) * 5} fill={i % 2 ? '#8C8474' : '#D6CEB8'} opacity={.5 * hand + .1} />)}
    {[[200, 900, 140, 60], [1500, 860, -120, 90], [1640, 380, 80, 140]].map(([a, b, c, d2], i) => <Line key={i} d={`M${a} ${b} l${c * .5} ${d2 * .5} l${-c * .2} ${d2 * .3} l${c * .7} ${d2 * .4}`} w={1.4} a={.5} />)}
    <rect x={-100} y={-100} width={2120} height={1280} fill={`url(#${id}sun)`} />
    {/* the ocean the nail line becomes */}
    {oc > 0 && <g>
      <path d={'M-100 -100 L' + coastL.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' L-100 1180Z'} fill="#B8B27A" opacity={oc * .8} />
      <path d={'M2020 -100 L' + coastR.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' L2020 1180Z'} fill="#C9AE74" opacity={oc * .8} />
      <path d={sm(coastL) + ' L' + [...coastR].reverse().map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + 'Z'} fill="#3E7FA3" stroke={SEP} strokeWidth={2} />
      {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${f1(xc - Wd * .35 + rnd(i) * Wd * .7)} ${f1(rnd(i + 3) * 1080)} q12 -6 24 0 t24 0`} stroke="#C9DDE6" strokeWidth={1.4} fill="none" opacity={.6 * oc} />)}
    </g>}
    {/* the ruler, lying under the fingers: the nail tip rests on its edge, right beside the millimetre ticks */}
    <g opacity={1 - oc * .9}>
      <rect x={576} y={RY + 14} width={1150} height={92} fill="#3A2A1E" opacity={.32} filter="url(#b8)" />
      <RG d={`M560 ${f1(RY)} H1700 V${f1(RY + 92)} H560Z`} color="#E2C48A" draw={draw} sw={1.8} />
      <path d={`M560 ${f1(RY + 4)} H1700`} stroke="#FFF4D8" strokeWidth={3} opacity={.6} />
      {Array.from({ length: 221 }, (_, i) => { const xx = 590 + i * 5, L2 = i % 10 === 0 ? 30 : i % 5 === 0 ? 20 : 11; return xx > 1680 ? null : <path key={i} d={`M${xx} ${f1(RY)} v${L2}`} stroke={SEP} strokeWidth={i % 10 === 0 ? 1.6 : .8} opacity={ph(draw, .3, .9)} />; })}
      {Array.from({ length: 23 }, (_, i) => 590 + i * 50 > 1680 ? null : <text key={'n' + i} x={590 + i * 50} y={f1(RY + 64)} fontSize={20} fontFamily={FIG} textAnchor="middle" fill={SEP} opacity={ph(draw, .4, 1)}>{i}</text>)}
      {grow > 0 && <path d={`M${f1(T[0])} ${f1(T[1] - w - 8)} v-18 H${f1(E[0])} v18`} stroke={VER} strokeWidth={4} fill="none" strokeLinejoin="round" />}
    </g>
    {/* the hand, flat, fingers to the right; its shadow falls down and to the right */}
    <g opacity={hand}>
      <g fill="#2A1E16" opacity={.3} filter="url(#b8)" transform="translate(16 22)"><FlatHand x={HX} y={HY} s={HS} id={id + 's'} sil /></g>
      <g opacity={ph(draw, .2, .8)}><FlatHand x={HX} y={HY} s={HS} id={id + 'h'} /></g>
      {/* the white free edge of the middle fingernail, growing */}
      <path d={`M${q(0, -w)} Q${q(e * .7, -w * 1.02)} ${q(e + 2, -w * .55)} Q${q(e + 6, 0)} ${q(e + 2, w * .55)} Q${q(e * .7, w * 1.02)} ${q(0, w)}Z`} fill="#FBF4E2" stroke={SEP} strokeWidth={1.4} />
    </g>
    {/* the line along the nail tip */}
    {line > 0 && <path d={`M${f1(E[0])} ${f1(E[1] - 40 - oc * 700)} V${f1(E[1] + 40 + oc * 700)}`} stroke={VER} strokeWidth={4 + oc * 4} pathLength={1} strokeDasharray={`${sst(line)} 1`} strokeLinecap="round" />}
    <KeyLight id={id} a={.8} />
  </g>;
};

export const ART_B: Record<string, React.FC<any>> = { RockShip, GreenlandTent, BlankSeaChart, SurveyShip, PenRecorder, StripeFloor, RidgeGlobe, Cambridge, Compass, RidgeTape, PlateGlobe, Trench,
  RugHimalaya, AtlanticOpen, GPSMarker, NailAtlantic };
// mid-action props for the contact sheet (full-frame: the film's index exports FULL = true)
export const SAMPLE_B: Record<string, object> = {
  RockShip: { sail: .9, crumple: .45, sink: .12, tm: 1 }, GreenlandTent: { snow: .6, lamp: .8, skis: 1, tm: 1 }, BlankSeaChart: { monster: 1, moon: 1, sound: .7 },
  SurveyShip: { sail: .45, ping: .45, cable: .8, xray: .6, needle: .4, tm: 1 }, PenRecorder: { k: .6, spill: .6, tm: 1 }, StripeFloor: { k: 1, pair: 2.5, piano: 0 },
  RidgeGlobe: { k: .8, spin: .02 }, Cambridge: { lamp: 1, tm: 1 }, Compass: { flip: .35, tm: 1 }, RidgeTape: { well: 1, cool: .6, run: .4, arrows: 1, gold: .6, belt: .5, cross: 1, tm: 1 },
  PlateGlobe: { crack: 1, shift: .5, quakes: 1, tm: .6 }, Trench: { dive: .5, quakes: 1, puff: .6, tm: 1 }, RugHimalaya: { push: .8, peaks: .35 }, AtlanticOpen: { open: .6, glow: 1, tm: 1 },
  GPSMarker: { sat: .5, beam: 1, tick: .7, tm: .4 }, NailAtlantic: { grow: .7, line: 1, ocean: .25 },
};
