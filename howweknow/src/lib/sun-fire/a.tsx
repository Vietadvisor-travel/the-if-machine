// sun-fire — ACTS I–III drawings (19 Nov 2026): the match and the candle on the sill at dawn, the four clue tags, the Sun cut open like an
// onion, the Sun as a lump of coal in the blacksmith's tongs, Kelvin's 1850s study, the bicycle pump that warms as it squeezes, the shrinking
// Sun in a tailor's tape, the tear-off calendar of 20 million years, the quarry cliff, Darwin's branching notebook tree, the scales that weigh
// the Sun against the rocks, Aston's balance (four H balloons against one He: the missing bead), E = mc² written in sparks, and the Cardiff
// lecture hall of 1920 with the coffin of the old idea. Every drawing is a full 1920×1080 frame drawn about (x, y) at scale s; light named in
// each header; people (Kelvin, Aston, Eddington) are placed by the engine — the clear floor is noted where it matters.
import React from 'react';
import { mix } from '../../paint/paint';
import { Line, Stipple, SEP, ell, SR, Floor, Fell, Hand, N, Pt, f1, cl, lerp, rect, rr, pathOf, rnd, NightWash, Star, starField, Region, Ink, Ball, Shade, circ } from '../star-distance/kit';
import { HumanHand } from '../../paint/anatomy';

const VERM = '#B8432A';
const D2R = Math.PI / 180;
const SE = "'Special Elite', monospace", FSC = "'IM Fell English SC', serif", AUR = "'La Belle Aurore', cursive";
const ease = (t: N) => { const u = cl(t); return u * u * (3 - 2 * u); };
const outBack = (t: N) => { const u = cl(t) - 1, c = 1.7; return 1 + (c + 1) * u * u * u + c * u * u; };
const stag = (v: N, i: N, n: N, w = .5) => cl((v - i * (1 - w) / Math.max(1, n - 1)) / w);
const seg = (v: N, a: N, b: N) => cl((v - a) / (b - a));
const rot = (p: Pt, a: N): Pt => { const c = Math.cos(a * D2R), s = Math.sin(a * D2R); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
const sm = (pts: Pt[], closed = true) => {
  const n = pts.length; if (n < 2) return ''; const g = (i: N) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`; }
  return d + (closed ? 'Z' : '');
};
const blob = (cx: N, cy: N, rx: N, ry: N, n: N, j: N, seed: N): Pt[] => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, k = 1 + (rnd(seed + i * 1.37) - .5) * j; return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]; });
const jagLine = (x0: N, y0: N, x1: N, y1: N, n: N, amp: N, seed: N): Pt[] => Array.from({ length: n + 1 }, (_, i) => { const u = i / n, e = i === 0 || i === n ? 0 : (rnd(seed + i * 1.7) - .5) * 2 * amp, dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1;
  return [lerp(x0, x1, u) - dy / L * e, lerp(y0, y1, u) + dx / L * e] as Pt; });
const BIG = { x: -300, y: -300, width: 2520, height: 1680 };
const fmt = (v: N) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// ---------------------------------------------------------------- shared pieces
const Scene: React.FC<{ x: N; y: N; s: N; draw: N; children?: React.ReactNode }> = ({ x, y, s, draw, children }) =>
  <g opacity={cl(draw * 2.2)} transform={`translate(${f1(x - 960 * s)} ${f1(y - 540 * s)}) scale(${s})`}>{children}</g>;
const Fill: React.FC<{ c: string; a?: N }> = ({ c, a = 1 }) => <rect {...BIG} fill={c} opacity={a} />;
// a soft radial light (or glow) of colour c
const Glow: React.FC<{ id: string; x: N; y: N; r: N; c: string; a?: N; ry?: N; blend?: string; mid?: N }> = ({ id, x, y, r, c, a = 1, ry, blend, mid = .3 }) => a <= 0 ? null :
  <g opacity={cl(a)} style={blend ? { mixBlendMode: blend as any } : undefined}><defs><radialGradient id={id}><stop offset="0" stopColor={c} stopOpacity={1} /><stop offset={mid} stopColor={c} stopOpacity={.42} /><stop offset="1" stopColor={c} stopOpacity={0} /></radialGradient></defs>
    <ellipse cx={x} cy={y} rx={r} ry={ry ?? r} fill={`url(#${id})`} /></g>;
// darkness everywhere except a soft hole round (x, y)
const Spot: React.FC<{ id: string; x: N; y: N; r0: N; r1: N; a: N; c?: string; a0?: N; mask?: string }> = ({ id, x, y, r0, r1, a, c = '#0E0805', a0 = 0, mask }) => a <= 0 ? null :
  <g mask={mask}><defs><radialGradient id={id} gradientUnits="userSpaceOnUse" cx={x} cy={y} r={r1}><stop offset={cl(r0 / r1)} stopColor={c} stopOpacity={cl(a0)} /><stop offset="1" stopColor={c} stopOpacity={cl(a)} /></radialGradient></defs><rect {...BIG} fill={`url(#${id})`} /></g>;
const VGrad: React.FC<{ id: string; x: N; y: N; w: N; h: N; stops: [N, string, N?][]; a?: N }> = ({ id, x, y, w, h, stops, a = 1 }) =>
  <g opacity={a}><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map(([o, c, op], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={op ?? 1} />)}</linearGradient></defs><rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} /></g>;

// THE SUN as drawn throughout: a limb-darkened disc (white-gold centre → orange rim), slow granules, a corona; hot → whiter, dim → grey
const GRAN = Array.from({ length: 52 }, (_, i) => { const a = rnd(i * 2.3) * Math.PI * 2, d = Math.sqrt(rnd(i * 4.1)) * .92; return [Math.cos(a) * d, Math.sin(a) * d, .045 + rnd(i * 1.9) * .06] as [N, N, N]; });
const SunBall: React.FC<{ id: string; x: N; y: N; r: N; hot?: N; dim?: N; tm?: N; corona?: N; rays?: N }> = ({ id, x, y, r, hot = 0, dim = 0, tm = 0, corona = 1, rays = 0 }) => {
  const g = (c: string, h: string, d: string) => mix(mix(c, h, cl(hot)), d, cl(dim));
  const c0 = g('#FFF7D6', '#FFFFFF', '#CFCAC0'), c1 = g('#F9C651', '#FFF3C8', '#A39D93'), c2 = g('#DD6E26', '#F7C25A', '#6E6860'), gl = g('#FFC45A', '#FFF6DC', '#8E887E');
  return <g>
    <defs>
      <radialGradient id={id + 'c'}><stop offset=".3" stopColor={gl} stopOpacity={.8} /><stop offset=".5" stopColor={gl} stopOpacity={.26} /><stop offset="1" stopColor={gl} stopOpacity={0} /></radialGradient>
      <radialGradient id={id + 'd'} cx=".44" cy=".4" r=".62"><stop offset="0" stopColor={c0} /><stop offset=".55" stopColor={c1} /><stop offset="1" stopColor={c2} /></radialGradient>
      <clipPath id={id + 'k'}><circle cx={x} cy={y} r={r} /></clipPath>
    </defs>
    {corona > 0 && <circle cx={x} cy={y} r={r * 2.7} fill={`url(#${id}c)`} opacity={corona * (1 - dim * .75)} />}
    {rays > 0 && <g opacity={rays * (1 - dim)}>{Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * 360 + tm * 4, p = rot([r * 1.14, 0], a), q = rot([r * 1.42, r * .05 * Math.sin(i * 2.1 + tm * 2)], a), m = rot([r * 1.28, r * .07], a);
      return <path key={i} d={`M${f1(x + p[0])} ${f1(y + p[1])} Q${f1(x + m[0])} ${f1(y + m[1])} ${f1(x + q[0])} ${f1(y + q[1])}`} stroke={c2} strokeWidth={Math.max(1.4, r * .035)} strokeLinecap="round" fill="none" />; })}</g>}
    <circle cx={x} cy={y} r={r} fill={`url(#${id}d)`} />
    <g clipPath={`url(#${id}k)`}>{GRAN.map(([u, v, q], i) => <ellipse key={i} cx={f1(x + (u + .02 * Math.sin(tm * .7 + i)) * r)} cy={f1(y + v * r)} rx={f1(r * q)} ry={f1(r * q * .7)} fill={c2} opacity={.14} transform={`rotate(${i * 37} ${f1(x + u * r)} ${f1(y + v * r)})`} />)}
      <circle cx={x} cy={y} r={r * 1.02} fill="none" stroke={c2} strokeWidth={r * .12} opacity={.3} filter="url(#b2s)" /></g>
    <Ink d={circ(x, y, r)} w={Math.max(1, r / 80)} col={mix(SEP, c2, .35)} />
  </g>;
};
// a candle / match flame: blue root, white core, gold body, orange skin; flickers with tm
const Flame: React.FC<{ id: string; x: N; y: N; h: N; tm?: N; a?: N; glow?: N }> = ({ id, x, y, h, tm = 0, a = 1, glow = 1 }) => {
  if (h <= .5 || a <= 0) return null;
  const fl = 1 + .08 * Math.sin(tm * 17.3) + .05 * Math.sin(tm * 31.7 + 1.3), H = h * fl, w = h * .27, lean = Math.sin(tm * 6.1) * h * .08;
  const shape = (k: N, dy = 0) => { const tx = x + lean * k, ty = y + dy - H * k, W = w * k, by = y + dy;
    return `M${f1(tx)} ${f1(ty)} C${f1(x + W * 1.15)} ${f1(by - H * k * .5)} ${f1(x + W)} ${f1(by)} ${f1(x)} ${f1(by)} C${f1(x - W)} ${f1(by)} ${f1(x - W * 1.15)} ${f1(by - H * k * .5)} ${f1(tx)} ${f1(ty)}Z`; };
  return <g opacity={a}>
    {glow > 0 && <Glow id={id + 'fg'} x={x} y={y - H * .45} r={H * 2.6} c="#FFB34A" a={.55 * glow} />}
    <path d={shape(1)} fill="#EE8428" opacity={.88} />
    <path d={shape(.8, -1)} fill="#FFC75A" />
    <path d={shape(.52, -2)} fill="#FFF7E0" />
    <ellipse cx={x} cy={y - w * .3} rx={w * .5} ry={w * .55} fill="#5876C0" opacity={.55} />
  </g>;
};
// a little blue Earth: sea, two green-brown continents, a cloud streak, lit from the upper right
const Earth: React.FC<{ id: string; x: N; y: N; r: N }> = ({ id, x, y, r }) => <g>
  <defs><clipPath id={id + 'e'}><circle cx={x} cy={y} r={r} /></clipPath><radialGradient id={id + 'g'} cx=".65" cy=".35" r=".8"><stop offset="0" stopColor="#8FC8E8" /><stop offset=".6" stopColor="#2E6FA8" /><stop offset="1" stopColor="#10305A" /></radialGradient></defs>
  <circle cx={x} cy={y} r={r * 1.6} fill="#5AA0E0" opacity={.18} filter="url(#b2s)" />
  <circle cx={x} cy={y} r={r} fill={`url(#${id}g)`} />
  <g clipPath={`url(#${id}e)`}><path d={sm(blob(x - r * .25, y - r * .1, r * .42, r * .55, 8, .5, 3))} fill="#7E9A5A" opacity={.9} /><path d={sm(blob(x + r * .45, y + r * .35, r * .3, r * .25, 7, .5, 9))} fill="#A9925A" opacity={.85} />
    <path d={`M${x - r} ${y - r * .45} q${r * .8} ${-r * .25} ${r * 2} ${r * .1}`} stroke="#FFFFFF" strokeWidth={r * .12} fill="none" opacity={.6} /></g>
  <circle cx={x} cy={y} r={r} fill="none" stroke={SEP} strokeWidth={Math.max(.8, r / 30)} />
</g>;
// the Victorian "helmet" coal scuttle: black japanned body, a lip that lifts to a spout, a brass bail handle, coal heaped in the mouth
const Scuttle: React.FC<{ id: string; x: N; y: N; k: N; draw: N; coal?: N; lit?: N }> = ({ id, x, y, k, draw, coal = 1, lit = .3 }) => {
  const P = (u: N, v: N) => `${f1(x + u * k)} ${f1(y + v * k)}`;
  const body = `M${P(-100, -60)} C${P(-108, 0)} ${P(-90, 48)} ${P(-60, 60)} L${P(70, 60)} C${P(96, 48)} ${P(104, 0)} ${P(100, -40)} C${P(120, -60)} ${P(140, -96)} ${P(150, -110)} C${P(90, -104)} ${P(40, -80)} ${P(-20, -74)} C${P(-60, -70)} ${P(-90, -66)} ${P(-100, -60)}Z`;
  const lumps = Array.from({ length: 11 }, (_, i) => [lerp(-80, 110, i / 10) + (rnd(i * 3.3) - .5) * 20, -74 - Math.sin(i / 10 * Math.PI) * 26 - rnd(i * 5.1) * 14 + (i > 7 ? -(i - 7) * 8 : 0), 14 + rnd(i * 2.7) * 12] as [N, N, N]);
  return <g>
    <Floor x={x - 10 * k} y={y + 62 * k} rx={130 * k} ry={14 * k} a={.55} />
    <SR d={`M${P(-70, 60)} L${P(-80, 70)} L${P(80, 70)} L${P(70, 60)}Z`} mat="brass" t={.65} draw={draw} hatch={0} />
    {coal > 0 && lumps.map(([u, v, r], i) => <path key={i} d={sm(blob(x + u * k, y + v * k, r * k, r * .8 * k, 6, .5, i * 7 + 1))} fill={i % 3 ? '#1E1A18' : '#2C2724'} stroke={SEP} strokeWidth={1} opacity={coal} />)}
    <SR d={body} color="#24201E" draw={draw} sw={2.2} />
    <path d={`M${P(-90, -40)} C${P(-96, 10)} ${P(-80, 40)} ${P(-56, 50)}`} stroke="#FFE2A8" strokeWidth={4 * k} fill="none" opacity={.25 + lit * .4} />
    <path d={`M${P(-98, -58)} C${P(-60, -66)} ${P(40, -74)} ${P(150, -110)}`} stroke="#D4A846" strokeWidth={5 * k} fill="none" />
    <path d={`M${P(-70, -66)} C${P(-60, -190)} ${P(60, -200)} ${P(80, -78)}`} stroke="#8A6420" strokeWidth={6 * k} fill="none" /><path d={`M${P(-70, -66)} C${P(-60, -190)} ${P(60, -200)} ${P(80, -78)}`} stroke="#F3D98A" strokeWidth={2 * k} fill="none" opacity={.7} />
    {[0, 1, 2].map(i => <path key={i} d={`M${P(-60 + i * 50, 0)} q${8 * k} ${-14 * k} ${20 * k} 0`} stroke="#D4A846" strokeWidth={2} fill="none" opacity={.6} />)}
  </g>;
};
// a brass beam balance about its pivot (x, y): fluted column down to the table top `base`, a tapered beam (ang° clockwise = right pan down),
// chains to two shallow pans; the pans' contents are drawn by left()/right() at the centre of each pan's rim
const Balance: React.FC<{ id: string; x: N; y: N; half: N; chain: N; ang: N; draw: N; base: N; panW: N; swing?: N; left?: (px: N, py: N) => React.ReactNode; right?: (px: N, py: N) => React.ReactNode; k?: N }> =
  ({ id, x, y, half, chain, ang, draw, base, panW, swing = 0, left, right, k = 1 }) => {
  const c = Math.cos(ang * D2R), sn = Math.sin(ang * D2R), E: Pt[] = [[x - half * c, y - half * sn], [x + half * c, y + half * sn]];
  const beam = sm([[-half, -6], [-half * .5, -10], [-40, -18], [0, -26], [40, -18], [half * .5, -10], [half, -6], [half + 10, 0], [half, 6], [half * .5, 10], [40, 18], [0, 22], [-40, 18], [-half * .5, 10], [-half, 6], [-half - 10, 0]].map(p => [p[0], p[1] * k] as Pt));
  const pan = (i: N) => { const [ex, ey] = E[i], py = ey + chain, w = panW, sw = (i ? -1 : 1) * swing;
    return <g key={i} transform={`rotate(${f1(sw)} ${f1(ex)} ${f1(ey)})`}>
      {[-1, 0, 1].map(j => <path key={j} d={`M${f1(ex)} ${f1(ey + 8)} L${f1(ex + j * w * .92)} ${f1(py + (j === 0 ? -w * .12 : 0))}`} stroke="#6A4C1C" strokeWidth={2.4} strokeDasharray="5 3" />)}
      <circle cx={ex} cy={ey + 6} r={7 * k} fill="#D4A846" stroke={SEP} strokeWidth={1.4} />
      <SR d={`M${f1(ex - w)} ${f1(py)} Q${f1(ex)} ${f1(py + w * .55)} ${f1(ex + w)} ${f1(py)}Z`} mat="brass" t={.55} draw={draw} hatch={0} />
      <SR d={ell(ex, py, w, w * .16)} mat="brass" t={.3} draw={draw} hatch={0} />
      <path d={`M${f1(ex - w * .8)} ${f1(py + w * .06)} Q${f1(ex)} ${f1(py + w * .38)} ${f1(ex + w * .8)} ${f1(py + w * .06)}`} stroke="#FFF4D2" strokeWidth={2.4} fill="none" opacity={.5} />
      {(i ? right : left)?.(ex, py)}
    </g>; };
  const colTop = y + 26, H = base - colTop;
  return <g>
    <Floor x={x} y={base + 4} rx={220 * k} ry={18 * k} a={.5} />
    <SR d={`M${x - 150 * k} ${base} L${x - 130 * k} ${base - 34 * k} H${x + 130 * k} L${x + 150 * k} ${base}Z`} mat="wood" t={.7} draw={draw} />
    <SR d={`M${x - 100 * k} ${base - 34 * k} L${x - 80 * k} ${base - 60 * k} H${x + 80 * k} L${x + 100 * k} ${base - 34 * k}Z`} mat="brass" t={.5} draw={draw} hatch={0} />
    <SR d={rect(x - 18 * k, colTop, 36 * k, H - 58 * k)} mat="brass" t={.45} draw={draw} hatch={0} />
    {[-9, 0, 9].map(v => <path key={v} d={`M${x + v * k} ${colTop + 10} V${base - 66 * k}`} stroke="#8A6420" strokeWidth={1.6} opacity={.6} />)}
    <path d={`M${x + 12 * k} ${colTop + 10} V${base - 66 * k}`} stroke="#FFF4D2" strokeWidth={3} opacity={.5} />
    {/* the pointer's scale */}
    <path d={`M${x - 46 * k} ${y + 150 * k} Q${x} ${y + 172 * k} ${x + 46 * k} ${y + 150 * k}`} stroke={SEP} strokeWidth={8 * k} fill="none" /><path d={`M${x - 46 * k} ${y + 150 * k} Q${x} ${y + 172 * k} ${x + 46 * k} ${y + 150 * k}`} stroke="#F3E7CC" strokeWidth={5 * k} fill="none" />
    {pan(0)}{pan(1)}
    <g transform={`rotate(${f1(ang)} ${x} ${y})`}>
      <path d={`M${x} ${y} L${x - 4 * k} ${y + 160 * k} L${x} ${y + 168 * k} L${x + 4 * k} ${y + 160 * k}Z`} fill={SEP} />
      <path d={beam} transform={`translate(${x} ${y})`} fill="#B8862B" stroke={SEP} strokeWidth={2} />
      <path d={`M${x - half + 20} ${y - 3 * k} H${x + half - 20}`} stroke="#F7E3A0" strokeWidth={3 * k} opacity={.75} />
    </g>
    <Ball x={x} y={y} r={20 * k} mat="brass" t={.4} draw={draw} />
    <path d={`M${x} ${y - 20 * k} l${-10 * k} ${-26 * k} h${20 * k}Z`} fill="#D4A846" stroke={SEP} strokeWidth={1.4} />
  </g>;
};
// stacked rock strata: band thicknesses and colours (sandstone, shale, limestone, red beds, a coal seam)
const ROCK = ['#D9B07A', '#6E6A66', '#E8DEC6', '#B7684C', '#8A8278', '#C9A36E', '#2E2A26', '#E2D2B0', '#9C7A5A', '#7A7068', '#DDBF8A', '#B98A62', '#5E5852', '#E6D9BE'];
const ROCKH = ROCK.map((_, i) => 40 + rnd(i * 7.3 + 2) * 46);
// a question mark in local units (about 200 high), drawn by `p`
const QMARK = (x: N, y: N, k: N) => `M${f1(x - 42 * k)} ${f1(y - 58 * k)} C${f1(x - 44 * k)} ${f1(y - 112 * k)} ${f1(x + 44 * k)} ${f1(y - 118 * k)} ${f1(x + 46 * k)} ${f1(y - 64 * k)} C${f1(x + 48 * k)} ${f1(y - 22 * k)} ${f1(x)} ${f1(y - 14 * k)} ${f1(x)} ${f1(y + 28 * k)}`;

// ================================================================ 1. MATCH & CANDLE — a dark room, a sash window over a wooden sill (right of
// centre), a brass chamberstick on the sill. A hand strikes a match on the box, the flame lights the candle, the candle burns down to a cold
// puddle as the window turns from night-blue to dawn gold and the Sun rises big beside it; spent stubs heap up; the room goes dark but the Sun.
// Light: the match / the candle flame (warm, low), then the dawn through the window (gold, from the right).
const WX0 = 1040, WX1 = 1520, WY0 = 170, WY1 = 680;
const ROOFS: Pt[] = (() => { const p: Pt[] = [[WX0 - 20, WY1 + 20]]; let xx = WX0 - 20, i = 0;
  while (xx < WX1 + 20) { const w = 46 + rnd(i * 3.3) * 64, h = 588 + rnd(i * 5.1) * 56;
    if (rnd(i * 7.7) > .45) p.push([xx, h], [xx + w / 2, h - 34], [xx + w, h]); else { p.push([xx, h], [xx + w * .3, h], [xx + w * .3, h - 30], [xx + w * .3 + 12, h - 30], [xx + w * .3 + 12, h], [xx + w, h]); }
    xx += w; i++; }
  p.push([WX1 + 20, WY1 + 20]); return p; })();
const LITWIN = Array.from({ length: 9 }, (_, i) => [WX0 + 20 + rnd(i * 2.9) * 440, 630 + rnd(i * 4.3) * 36] as Pt);
const DawnWindow: React.FC<{ id: string; dawn: N; sun: N; draw: N; tm?: N; sunX?: N; sunR?: N }> = ({ id, dawn, sun, draw, tm = 0, sunX = 1350, sunR = 128 }) => {
  const top = mix('#0E1430', '#A9BCD2', dawn), mid = mix('#1C2852', '#F4D69C', dawn), bot = mix('#2C3A68', '#F6A852', dawn), sy = lerp(WY1 + sunR + 40, 405, ease(sun));
  return <g>
    <defs><clipPath id={id + 'gl'}><rect x={WX0} y={WY0} width={WX1 - WX0} height={WY1 - WY0} /></clipPath></defs>
    <g clipPath={`url(#${id}gl)`}>
      <VGrad id={id + 'sk'} x={WX0} y={WY0} w={WX1 - WX0} h={WY1 - WY0} stops={[[0, top], [.62, mid], [1, bot]]} />
      {dawn < 1 && starField(7, 46, WX0, WY0, WX1 - WX0, 360).map(([sx, sy2, r], i) => <Star key={i} x={sx} y={sy2} r={r * .8} a={(1 - dawn) * .9} />)}
      <Glow id={id + 'hz'} x={sunX} y={WY1 - 40} r={460} ry={200} c="#FFD27A" a={dawn * .85} />
      {sun > 0 && <SunBall id={id + 'sn'} x={sunX} y={sy} r={sunR} tm={tm} hot={.1} />}
      <path d={pathOf(ROOFS, true)} fill={mix('#0A0E22', '#5B3C36', dawn * .75)} />
      <path d={pathOf(ROOFS.slice(1, -1))} fill="none" stroke={mix('#2B3B66', '#FFD9A0', dawn)} strokeWidth={2} opacity={.6} />
      {LITWIN.map(([lx, ly], i) => <rect key={i} x={lx} y={ly} width={8} height={11} fill="#FFD27A" opacity={(1 - dawn) * .9} />)}
      <path d={`M${WX0 + 40} ${WY1} L${WX0 + 200} ${WY0} M${WX0 + 90} ${WY1} L${WX0 + 230} ${WY0 + 120}`} stroke="#FFFFFF" strokeWidth={18} opacity={.05} />
    </g>
    {/* the sash: stiles, rails and glazing bars */}
    <SR d={`M${WX0 - 34} ${WY0 - 34} H${WX1 + 34} V${WY1 + 8} H${WX0 - 34}Z M${WX0} ${WY0} V${WY1} H${WX1} V${WY0}Z`} mat="wood" t={.62} draw={draw} sw={1.8} />
    <SR d={rect(1272, WY0, 16, WY1 - WY0)} mat="wood" t={.6} draw={draw} hatch={0} />
    <SR d={rect(WX0, 418, WX1 - WX0, 18)} mat="wood" t={.6} draw={draw} hatch={0} />
    {[300, 556].map(v => <SR key={v} d={rect(WX0, v, WX1 - WX0, 9)} mat="wood" t={.6} draw={draw} hatch={0} />)}
  </g>;
};
// the room around the window: papered wall, the sill (top and front), the panelled dado, curtains
const Room: React.FC<{ id: string; draw: N; warm: N }> = ({ id, draw, warm }) => <g>
  <Fill c={mix('#4A3226', '#6A4A34', warm)} />
  {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${-200 + i * 80} -200 V1300`} stroke="#2B1D12" strokeWidth={i % 2 ? 1 : 10} opacity={.12} />)}
  {Array.from({ length: 60 }, (_, i) => <path key={'d' + i} d={`M${(i % 10) * 220 - 100 + (Math.floor(i / 10) % 2) * 110} ${Math.floor(i / 10) * 170 + 20} q10 -14 20 0 q-10 14 -20 0`} fill="#2B1D12" opacity={.12} />)}
  <SR d={rect(-200, 772, 2320, 520)} mat="wood" t={.72} draw={draw} />
  {[0, 1, 2, 3, 4, 5].map(i => <SR key={i} d={rect(-120 + i * 360, 812, 300, 240)} mat="wood" t={.66} draw={draw} hatch={0} />)}
  {/* curtains, gathered either side of the window */}
  {[[WX0 - 160, WX0 - 22], [WX1 + 22, WX1 + 170]].map(([a, b], j) => <g key={j}>
    <SR d={`M${a} 120 H${b} C${b + (j ? 20 : -6)} 400 ${b + (j ? 30 : -30)} 600 ${b + (j ? 14 : -10)} 770 H${a - (j ? -10 : 20)} C${a - 10} 600 ${a} 400 ${a} 120Z`} mat="red" t={.78} draw={draw} ang={90} />
    {[.25, .5, .75].map(u => <path key={u} d={`M${lerp(a, b, u)} 124 C${lerp(a, b, u) + 8} 400 ${lerp(a, b, u) - 8} 600 ${lerp(a, b, u) + 4} 766`} stroke="#3A1810" strokeWidth={3} fill="none" opacity={.5} />)}</g>)}
  <path d={`M${WX0 - 190} 116 H${WX1 + 200}`} stroke="#8A6420" strokeWidth={10} strokeLinecap="round" /><circle cx={WX0 - 194} cy={116} r={12} fill="#D4A846" stroke={SEP} strokeWidth={1.4} /><circle cx={WX1 + 204} cy={116} r={12} fill="#D4A846" stroke={SEP} strokeWidth={1.4} />
  {/* the sill: its top (seen from a little above) and its front edge */}
  <SR d={`M${WX0 - 120} 688 H${WX1 + 120} L${WX1 + 170} 742 H${WX0 - 170}Z`} mat="wood" t={.42} draw={draw} hatch={0} />
  <SR d={rect(WX0 - 170, 742, WX1 - WX0 + 340, 30)} mat="wood" t={.7} draw={draw} />
  <path d={`M${WX0 - 160} 744 H${WX1 + 160}`} stroke="#FFE2A8" strokeWidth={2} opacity={.4} />
</g>;
// the chamberstick on the sill: brass dish with a ring handle, the socket, the candle of height H (0 = gone), a wax puddle that spreads
const Chamberstick: React.FC<{ id: string; cx: N; H: N; melt: N; draw: N }> = ({ id, cx, H, melt, draw }) => {
  const sy = 716, top = 676 - H, pud = 22 + 70 * ease(melt);
  return <g>
    <Floor x={cx + 6} y={sy + 16} rx={112} ry={13} a={.5} />
    <SR d={ell(cx, sy + 6, 84, 17)} mat="brass" t={.72} draw={draw} hatch={0} />
    <SR d={ell(cx, sy, 84, 15)} mat="brass" t={.38} draw={draw} hatch={0} />
    <ellipse cx={cx} cy={sy + 2} rx={66} ry={10} fill="#8A6420" opacity={.4} />
    <path d={`M${cx + 78} ${sy - 4} c28 -4 36 -34 12 -40 c-20 -4 -26 14 -12 26`} stroke="#8A6420" strokeWidth={8} fill="none" /><path d={`M${cx + 80} ${sy - 6} c24 -4 30 -30 10 -34`} stroke="#F3D98A" strokeWidth={2.4} fill="none" />
    {melt > 0 && <g><path d={sm(blob(cx + 4, sy + 1, pud, pud * .19, 12, .3, 17))} fill="#EFE3C4" stroke={SEP} strokeWidth={1.2} /><ellipse cx={cx - pud * .3} cy={sy - 1} rx={pud * .3} ry={3} fill="#FFFDF4" opacity={.7} /></g>}
    <SR d={rect(cx - 26, 678, 52, 36)} mat="brass" t={.5} draw={draw} hatch={0} />
    <SR d={ell(cx, 678, 32, 7)} mat="brass" t={.3} draw={draw} hatch={0} />
    {H > 2 && <g>
      <defs><linearGradient id={id + 'cw'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#B9A27A" /><stop offset=".35" stopColor="#F2E7CC" /><stop offset=".7" stopColor="#FBF4E2" /><stop offset="1" stopColor="#D9C7A0" /></linearGradient></defs>
      <path d={`M${cx - 20} ${top} V680 H${cx + 20} V${top}Z`} fill={`url(#${id}cw)`} stroke={SEP} strokeWidth={1.6} />
      <ellipse cx={cx} cy={top} rx={20} ry={5} fill="#FBF4E2" stroke={SEP} strokeWidth={1.2} />
      {melt > .03 && [[-14, .5], [9, .8]].map(([u, k], i) => <path key={i} d={`M${cx + u} ${top + 2} v${f1(Math.min(H * .7, 40 * k * (.4 + melt)))} a5 5 0 0 0 10 0 v${f1(-Math.min(H * .7, 40 * k * (.4 + melt)) * .6)}`} fill="#FBF4E2" stroke={SEP} strokeWidth={1} />)}
      <path d={`M${cx} ${top} q2 -8 -1 -14`} stroke="#1A120B" strokeWidth={2.6} fill="none" />
    </g>}
  </g>;
};
const STUBS = Array.from({ length: 28 }, (_, i) => { const px = 1420 + (rnd(i * 3.1) - .5) * 250 * (1 - i / 36), h = Math.max(0, 1 - 1.7 * Math.abs(px - 1420) / 250);
  return { px, py: 728 - (i / 28) * 60 * h - rnd(i * 1.3) * 4, L: 22 + rnd(i * 5.7) * 30, a: (rnd(i * 2.2) - .5) * 160, c: mix('#FBF4E2', '#EBD9A8', rnd(i * 8.1)) }; });
const MatchCandle: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, strike = 0, matchOut = 0, candle = 0, melt = 0, dawn = 0, sunUp = 0, stubs = 0, dark = 0, q = 0 }) => {
  const id = 'mc' + Math.round(x), CX = 1170, H = 300 * (1 - cl(melt)), wickY = 676 - H - 12, sunX = 1352, sunY = lerp(WY1 + 168, 405, ease(sunUp));
  const lit = cl(candle) * cl((1 - melt) / .1), fh = 44 * lit;
  // the match: its head travels along the box's striking strip, flares, then is carried to the wick
  const a1 = ease(seg(strike, 0, .42)), b1 = ease(seg(strike, .52, 1)), head: Pt = [lerp(lerp(1056, 958, a1), CX - 18, b1), lerp(lerp(724, 726, a1) - Math.sin(a1 * Math.PI) * 3, wickY + 4, b1) - Math.sin(b1 * Math.PI) * 60];
  const hang = lerp(-22, -48, b1), hs = 1.25, mloc: Pt = [205, -44], mr = rot([mloc[0] * hs, mloc[1] * hs], hang), wrist: Pt = [head[0] - mr[0], head[1] - mr[1]];
  const out = ease(seg(matchOut, .7, 1)), wx = wrist[0] - out * 260, wy = wrist[1] + out * 300, hx = head[0] - out * 260, hy = head[1] + out * 300;
  const flare = strike > .4 ? 26 + 46 * Math.max(0, 1 - (strike - .4) / .14) : 0, mh = flare * (1 - ease(seg(matchOut, 0, .6))), hA = cl(strike * 12) * (1 - out);
  const warm = cl(lit * .8 + dawn * .5), glass = `M${WX0} ${WY0} H${WX1} V${WY1} H${WX0}Z`;
  const darkA = .8 * (1 - .5 * dawn), poolA0 = darkA * (1 - .9 * Math.max(lit, mh / 50 * .6)), poolA1 = darkA * (1 - .35 * lit);
  const nSt = stubs * STUBS.length;
  return <Scene x={x} y={y} s={s} draw={draw}>
    <Room id={id} draw={draw} warm={warm} />
    <DawnWindow id={id} dawn={dawn} sun={sunUp} draw={draw} tm={tm} sunX={sunX} />
    {/* dawn on the sill: the window's light falls across it, the candle's shadow stretches left */}
    <path d={`M${WX0} 690 H${WX1} L${WX1 + 60} 742 H${WX0 + 40}Z`} fill="#FFD9A0" opacity={dawn * .35} />
    <path d={`M${CX - 16} 718 L${CX - 260} 735 L${CX - 250} 745 L${CX + 18} 726Z`} fill={SEP} opacity={dawn * .35} filter="url(#b2s)" />
    {/* the matchbox: tray pushed half out (red-headed matches), the brown striking strip on its side */}
    <g><Floor x={1000} y={738} rx={86} ry={8} a={.5} />
      <SR d={`M930 712 L946 700 H1076 L1062 712Z`} mat="cloth" t={.25} draw={draw} hatch={0} />
      <SR d={`M890 716 L902 707 H950 L938 716Z`} mat="wood" t={.3} draw={draw} hatch={0} />
      {[0, 1, 2, 3].map(i => <g key={i}><path d={`M${896 + i * 4} ${714 - i * 2} h40`} stroke="#E0C08A" strokeWidth={2.4} /><circle cx={898 + i * 4} cy={714 - i * 2} r={2.6} fill={VERM} /></g>)}
      <SR d={rect(930, 712, 132, 24)} mat="cloth" t={.4} draw={draw} hatch={0} />
      <rect x={936} y={716} width={120} height={15} fill="#6A4430" /><Stipple x={936} y={716} w={120} h={15} n={70} seed={id + 'st'} col="#2B1D12" a={.6} />
      <path d={`M980 702 l14 -6 l14 6 l-14 4Z`} fill={VERM} opacity={.8} />
    </g>
    <Chamberstick id={id} cx={CX} H={H} melt={melt} draw={draw} />
    {/* spent stubs heaping up on the sill */}
    {STUBS.map((t, i) => { const v = cl(nSt - i); if (v <= 0) return null; const dy = (1 - outBack(v)) * -50;
      return <g key={i} opacity={cl(v * 3)} transform={`translate(${f1(t.px)} ${f1(t.py + dy)}) rotate(${f1(t.a)})`}>
        <rect x={-7} y={-t.L / 2} width={14} height={t.L} rx={4} fill={t.c} stroke={SEP} strokeWidth={1.1} />
        <path d={`M-7 ${-t.L / 2 + 6} q3 4 0 9`} stroke={SEP} strokeWidth={.7} fill="none" opacity={.5} />
        <path d={`M0 ${-t.L / 2} v-6`} stroke="#1A120B" strokeWidth={2.2} /></g>; })}
    {/* the hand with the match */}
    {hA > 0 && <g opacity={hA}>
      <g transform={`translate(${f1(wx)} ${f1(wy)}) rotate(${f1(hang)}) scale(${hs})`}>
        <path d="M100 -32 L205 -44" stroke="#D9B477" strokeWidth={5} strokeLinecap="round" /><path d="M100 -32 L205 -44" stroke="#8C5A36" strokeWidth={1} opacity={.6} />
        <ellipse cx={206} cy={-44} rx={7} ry={5.5} fill={mh > 0 || strike > .4 ? '#2B1D12' : VERM} stroke={SEP} strokeWidth={1} />
      </g>
      <HumanHand id={id + 'h'} x={wx} y={wy} s={hs} ang={hang} pose="pinch" sleeve="#3A2418" />
    </g>}
    {/* darkness of the room (not over the window glass): a hole of light round the flame */}
    <defs><mask id={id + 'm'}><rect {...BIG} fill="#fff" /><path d={glass} fill="#000" /></mask></defs>
    <Spot id={id + 'dk'} x={lit > 0 ? CX : head[0]} y={lit > 0 ? wickY - 20 : head[1]} r0={60} r1={760} a={poolA1} a0={poolA0} mask={`url(#${id}m)`} />
    {/* flames and their warm light */}
    <Glow id={id + 'cg'} x={CX} y={wickY - 20} r={700} ry={560} c="#FFB060" a={lit * .5} blend="screen" />
    <Flame id={id + 'cf'} x={CX + 1} y={wickY + 6} h={fh} tm={tm} a={lit > 0 ? 1 : 0} />
    {mh > 0 && <Flame id={id + 'mf'} x={hx} y={hy + 2} h={mh} tm={tm * 1.3} glow={1.2} />}
    {strike > .4 && strike < .62 && Array.from({ length: 12 }, (_, i) => { const u = seg(strike, .4, .62), a = -150 + i * 12 + rnd(i) * 10, r = 20 + u * 90 * (.6 + rnd(i * 3) * .6), p = rot([r, 0], a);
      return <circle key={i} cx={hx + p[0]} cy={hy + p[1] + u * u * 40} r={2.2} fill="#FFE2A0" opacity={1 - u} />; })}
    {matchOut > .25 && <g opacity={(1 - seg(matchOut, .8, 1)) * .7}><path d={`M${hx} ${hy - 6} c-14 -30 20 -50 4 -80 c-12 -24 18 -40 26 -70 c6 -22 -16 -34 -26 -20`} stroke="#C9BFB0" strokeWidth={7} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${seg(matchOut, .25, .9)} 1`} filter="url(#b2s)" />
      <path d={`M${hx} ${hy - 6} c-14 -30 20 -50 4 -80 c-12 -24 18 -40 26 -70`} stroke="#E6DED0" strokeWidth={2} fill="none" pathLength={1} strokeDasharray={`${seg(matchOut, .25, .9)} 1`} /></g>}
    {lit === 0 && melt > .9 && candle > 0 && <path d={`M${CX} ${wickY + 6} c-8 -20 12 -30 2 -54 c-6 -16 10 -24 14 -40`} stroke="#C9BFB0" strokeWidth={5} fill="none" opacity={.5 * (1 - seg(melt, .96, 1)) + .1} filter="url(#b2s)" />}
    {/* the rising Sun floods the room with gold */}
    <Glow id={id + 'sg'} x={sunX} y={sunY} r={620} c="#FFC860" a={sunUp * dawn * .35} blend="screen" />
    {/* everything sinks into the dark except the Sun */}
    <Spot id={id + 'sp'} x={sunX} y={sunY} r0={sunUp > 0 ? 190 : 0} r1={480} a={dark * .94} c="#0A0604" />
    {q > 0 && <g><Glow id={id + 'qg'} x={1610} y={300} r={160} c="#FFC860" a={q * .5} />
      <Ink d={QMARK(1610, 330, 1.05)} w={13} col={VERM} draw={ease(seg(q, 0, .8))} />
      <circle cx={1610} cy={392} r={11 * ease(seg(q, .75, 1))} fill={VERM} /></g>}
  </Scene>;
};

// ================================================================ 2. CLUE TAGS — the same sill at dawn (softly out of focus behind); four manila
// luggage tags drop on strings from above and swing: a lump of coal, a tailor's tape measure, a little brass balance, a miner's helmet lamp;
// a vermilion tick lands on each. Light: dawn through the window (from the right) — the tags cast soft shadows to the left on the wall.
const TagArt: React.FC<{ i: N; id: string }> = ({ i, id }) => {
  if (i === 0) return <g>   {/* a lump of coal: faceted black with grey-blue glints */}
    <ellipse cx={4} cy={58} rx={70} ry={10} fill={SEP} opacity={.3} />
    <path d="M-62 30 L-50 -22 L-16 -50 L30 -44 L60 -10 L58 34 L20 56 L-30 54Z" fill="#1E1A18" stroke={SEP} strokeWidth={2} />
    <path d="M-16 -50 L-6 -6 L60 -10 M-6 -6 L-50 -22 M-6 -6 L20 56 M-6 -6 L-30 54" stroke="#4E4A50" strokeWidth={1.6} fill="none" />
    <path d="M-12 -44 L-4 -12 L48 -14 L28 -40Z" fill="#5A5A66" opacity={.55} /><path d="M2 -40 l14 6" stroke="#E8EEF0" strokeWidth={2.4} opacity={.8} /><path d="M40 -6 l8 18" stroke="#E8EEF0" strokeWidth={1.6} opacity={.6} /></g>;
  if (i === 1) return <g>   {/* a tailor's tape measure: the yellow roll with a tongue of tape and its numbers */}
    <path d="M30 6 C70 10 80 40 60 62 L44 50 C58 36 54 22 28 20Z" fill="#EBC64A" stroke={SEP} strokeWidth={1.4} />
    {[0, 1, 2, 3, 4].map(j => <path key={j} d={`M${36 + j * 6} ${12 + j * 8} l-6 7`} stroke={SEP} strokeWidth={1} />)}
    <rect x={40} y={52} width={18} height={12} fill="#B9C8D0" stroke={SEP} strokeWidth={1.2} transform="rotate(-50 49 58)" />
    <circle cx={-14} cy={-6} r={56} fill="#EBC64A" stroke={SEP} strokeWidth={2} />
    {[46, 36, 26, 16].map(r => <circle key={r} cx={-14} cy={-6} r={r} fill="none" stroke="#A8862A" strokeWidth={1.2} />)}
    <circle cx={-14} cy={-6} r={10} fill="#D9DCE0" stroke={SEP} strokeWidth={1.4} />
    {Array.from({ length: 18 }, (_, j) => { const p = rot([56, 0], j * 20); return <path key={j} d={`M${-14 + p[0]} ${-6 + p[1]} l${-p[0] * .1} ${-p[1] * .1}`} stroke={SEP} strokeWidth={1} />; })}
    <text x={-14} y={-26} fontFamily={SE} fontSize={14} textAnchor="middle" fill={SEP}>60</text></g>;
  if (i === 2) return <g>   {/* a little brass balance */}
    <path d="M-40 62 H40 L30 50 H-30Z" fill="#8C5A36" stroke={SEP} strokeWidth={1.4} />
    <rect x={-4} y={-40} width={8} height={92} fill="#D4A846" stroke={SEP} strokeWidth={1.2} />
    <path d="M-70 -40 H70" stroke="#8A6420" strokeWidth={6} strokeLinecap="round" /><circle cx={0} cy={-42} r={7} fill="#F3D98A" stroke={SEP} strokeWidth={1.2} />
    {[-66, 66].map(u => <g key={u}><path d={`M${u} -38 L${u - 24} 12 M${u} -38 L${u + 24} 12`} stroke="#6A4C1C" strokeWidth={1.2} /><path d={`M${u - 28} 12 Q${u} 30 ${u + 28} 12Z`} fill="#D4A846" stroke={SEP} strokeWidth={1.4} /></g>)}</g>;
  return <g>   {/* a miner's helmet with its lamp shining */}
    <path d="M20 -18 L96 -46 L96 18Z" fill="#FFE9A8" opacity={.55} />
    <path d="M-70 30 C-70 -40 50 -50 54 22 Z" fill="#4E4A44" stroke={SEP} strokeWidth={2} />
    <path d="M-86 30 Q-10 44 70 28 Q-10 52 -86 30Z" fill="#3A3632" stroke={SEP} strokeWidth={1.6} />
    <path d="M-50 -6 C-40 -30 0 -36 20 -24" stroke="#9C968C" strokeWidth={4} fill="none" opacity={.7} />
    <rect x={-8} y={-30} width={24} height={30} rx={4} fill="#D4A846" stroke={SEP} strokeWidth={1.4} />
    <circle cx={22} cy={-15} r={15} fill="#F3D98A" stroke={SEP} strokeWidth={1.6} /><circle cx={22} cy={-15} r={9} fill="#FFF7E0" /></g>;
};
const ClueTags: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, n = 0, swing = 0, ticked = 0 }) => {
  const id = 'ct' + Math.round(x), AX = [330, 760, 1190, 1610], LEN = [560, 470, 600, 500];
  return <Scene x={x} y={y} s={s} draw={draw}>
    <g filter="url(#b2s)"><Room id={id} draw={draw} warm={.6} /><DawnWindow id={id} dawn={1} sun={.55} draw={draw} tm={tm} /><Chamberstick id={id} cx={1170} H={0} melt={1} draw={draw} /></g>
    <Glow id={id + 'wg'} x={1280} y={560} r={900} ry={600} c="#FFD9A0" a={.35} blend="screen" />
    <Spot id={id + 'dk'} x={1280} y={480} r0={300} r1={1300} a={.55} a0={0} />
    <Fill c="#F3E7CC" a={.12} />
    {AX.map((ax, i) => { const d = stag(n, i, 4, .4); if (d <= 0) return null;
      const L = LEN[i], drop = (1 - outBack(d)) * -820, settle = Math.sin(d * Math.PI * 3) * 10 * (1 - d), th = settle + swing * 7 * Math.sin(tm * 1.7 + i * 1.4), tk = ease(stag(ticked, i, 4, .4));
      const tag = `M-118 40 L-76 -6 H76 L118 40 V330 H-118Z`;
      return <g key={i} transform={`translate(0 ${f1(drop)})`}>
        {/* the soft shadow on the wall, thrown left by the window */}
        <g transform={`translate(-48 26) rotate(${f1(th)} ${ax} -60)`} opacity={.32} filter="url(#b8)"><path d={`M${ax} -60 V${L - 60}`} stroke={SEP} strokeWidth={3} /><path d={tag} transform={`translate(${ax} ${L - 60})`} fill={SEP} /></g>
        <g transform={`rotate(${f1(th)} ${ax} -60)`}>
          <path d={`M${ax} -60 V${L - 50}`} stroke="#8C7A5A" strokeWidth={2.6} /><path d={`M${ax} -60 V${L - 50}`} stroke="#F3E7CC" strokeWidth={.8} opacity={.6} />
          <g transform={`translate(${ax} ${L - 60})`}>
            <SR d={tag} mat="sand" t={.22} draw={draw} sw={1.8} hatch={0} />
            <path d="M118 44 V330" stroke="#FFF4D2" strokeWidth={4} opacity={.5} />
            <path d="M-118 300 H118" stroke="#C9A36E" strokeWidth={1} opacity={.6} />
            <circle cx={0} cy={22} r={22} fill="#D9AE6C" stroke={SEP} strokeWidth={1.4} /><circle cx={0} cy={22} r={10} fill="#3A2418" stroke={SEP} strokeWidth={1.2} />
            <path d={`M-4 12 C-30 -20 -10 -40 0 10 M4 12 C30 -20 10 -40 0 10`} stroke="#8C7A5A" strokeWidth={2.4} fill="none" />
            <text x={-96} y={86} fontFamily={SE} fontSize={30} fill={SEP} opacity={.8}>{i + 1}</text>
            <g transform="translate(0 176)"><TagArt i={i} id={id + i} /></g>
            {tk > 0 && <Ink d="M52 268 L72 292 L112 236" w={9} col={VERM} draw={tk} />}
          </g>
        </g>
      </g>; })}
  </Scene>;
};

// ================================================================ 3. SUN CUTAWAY — deep space. far: small blue Earth bottom-left, a dotted line
// to a big Sun upper-right, "150 000 000 km". peel: the Sun comes to the centre and its glowing skin peels back in onion layers (a wedge
// opens, outer first; the lifted slice drifts away) to the white-hot core. close: the layers close. Light: the Sun itself.
const LAYERS: [N, string, N][] = [[1, '#F4A23A', 104], [.8, '#E46A2A', 80], [.6, '#F6B848', 58], [.42, '#FBDC86', 36]];
const pac = (cx: N, cy: N, R: N, A: N, c = -45) => { if (A < .3) return circ(cx, cy, R); const e = (c + A / 2) * D2R, b = (c - A / 2) * D2R;
  return `M${f1(cx)} ${f1(cy)} L${f1(cx + R * Math.cos(e))} ${f1(cy + R * Math.sin(e))} A${f1(R)} ${f1(R)} 0 ${360 - A > 180 ? 1 : 0} 1 ${f1(cx + R * Math.cos(b))} ${f1(cy + R * Math.sin(b))}Z`; };
const SunCutaway: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, far = 0, peel = 0, close = 0 }) => {
  const id = 'sc' + Math.round(x), m = ease(cl(peel * 2.5)), k = ease(far) * (1 - m), cx = lerp(960, 1420, k), cy = lerp(540, 340, k), R = lerp(400, 230, k);
  const E: Pt = [270, 860], open = (i: N) => LAYERS[i][2] * ease(stag(peel, i, 4, .55)) * (1 - ease(close));
  const ang = Math.atan2(cy - E[1], cx - E[0]), sx = cx - Math.cos(ang) * (R + 30), sy2 = cy - Math.sin(ang) * (R + 30), ld = cl(far * 1.5 - .25) * (1 - m);
  const flap = ease(stag(peel, 0, 4, .55)) * (1 - ease(close)), bis = -45 * D2R;
  return <Scene x={x} y={y} s={s} draw={draw}>
    <NightWash x={-300} y={-300} w={2520} h={1680} seed={id} top="#070A1C" bot="#141C38" />
    {starField(31, 220, -100, -100, 2120, 1280).map(([a, b, r], i) => <Star key={i} x={a} y={b} r={r * .8} a={.75} rays={r > 2.2 ? .5 : 0} />)}
    <Glow id={id + 'hal'} x={cx} y={cy} r={R * 3} c="#FFB24A" a={.35} />
    <SunBall id={id + 'sun'} x={cx} y={cy} r={R} tm={tm} corona={1} />
    {/* the onion: each layer a disc with a wedge cut out of it, outer first, so the cut shows the shells down to the core */}
    {peel > 0 && <g>
      <defs><clipPath id={id + 'k0'}><path d={pac(cx, cy, R, open(0))} /></clipPath><clipPath id={id + 'k1'}><path d={pac(cx, cy, R * .8, open(1))} /></clipPath></defs>
            {LAYERS.map(([fr, c, _], i) => { const A = open(i), r = R * fr; if (i > 0 && open(i - 1) < .3) return null;
        return <g key={i}>
          {i === 0 ? <g clipPath={`url(#${id}k0)`}><SunBall id={id + 'l0'} x={cx} y={cy} r={R} tm={tm} corona={0} /></g>
            : <g><path d={pac(cx, cy, r, A)} fill={c} />
              {i === 1 && <g clipPath={`url(#${id}k1)`}>{Array.from({ length: 40 }, (_, j) => { const a = j / 40 * Math.PI * 2, rr2 = r * (.84 + (j % 2) * .08); return <circle key={j} cx={cx + Math.cos(a) * rr2} cy={cy + Math.sin(a) * rr2} r={r * .07} fill="#F7A040" stroke="#A8401E" strokeWidth={1.2} opacity={.7} />; })}</g>}
              {i === 2 && Array.from({ length: 5 }, (_, j) => <circle key={j} cx={cx} cy={cy} r={r * (.55 + j * .09)} fill="none" stroke="#C8781E" strokeWidth={1.2} opacity={.4} />)}
              <Ink d={pac(cx, cy, r, A)} w={1.8} col={mix(SEP, c, .3)} /></g>}
        </g>; })}
      {open(3) > .3 && <g><Glow id={id + 'cg'} x={cx} y={cy} r={R * .5} c="#FFFFFF" a={.9} /><circle cx={cx} cy={cy} r={R * .24 * (1 + .03 * Math.sin(tm * 5))} fill="#FFFDF2" stroke="#F7E3A0" strokeWidth={3} /></g>}
      {/* the lifted slice of skin, drifting away */}
      {flap > 0 && flap < 1 && <g opacity={Math.sin(flap * Math.PI) * .95} transform={`translate(${f1(Math.cos(bis) * flap * 260)} ${f1(Math.sin(bis) * flap * 260)}) rotate(${f1(flap * 28)} ${f1(cx + Math.cos(bis) * R * .6)} ${f1(cy + Math.sin(bis) * R * .6)})`}>
        <path d={`M${cx} ${cy} L${f1(cx + R * Math.cos(bis - .9))} ${f1(cy + R * Math.sin(bis - .9))} A${R} ${R} 0 0 1 ${f1(cx + R * Math.cos(bis + .9))} ${f1(cy + R * Math.sin(bis + .9))}Z`} fill="#F4A23A" stroke={SEP} strokeWidth={2} />
        <path d={`M${f1(cx + R * .78 * Math.cos(bis - .9))} ${f1(cy + R * .78 * Math.sin(bis - .9))} A${R * .78} ${R * .78} 0 0 1 ${f1(cx + R * .78 * Math.cos(bis + .9))} ${f1(cy + R * .78 * Math.sin(bis + .9))}`} stroke="#B8432A" strokeWidth={3} fill="none" opacity={.6} /></g>}
    </g>}
    {/* Earth and the long dotted line, the distance in typewriter figures */}
    {k > 0 && <g opacity={k}>
      <Earth id={id + 'e'} x={E[0]} y={E[1]} r={40} />
      <path d={`M${E[0] + Math.cos(ang) * 60} ${E[1] + Math.sin(ang) * 60} L${f1(sx)} ${f1(sy2)}`} stroke="#F3E7CC" strokeWidth={4} strokeDasharray="3 16" strokeLinecap="round" pathLength={1000} strokeDashoffset={0} opacity={ld > 0 ? 1 : 0} mask={undefined} style={{ clipPath: `inset(0 ${f1((1 - ld) * 100)}% 0 0)` }} />
      <g transform={`translate(${f1(lerp(E[0], sx, .5))} ${f1(lerp(E[1], sy2, .5) - 30)}) rotate(${f1(ang / D2R)})`} opacity={seg(far, .6, 1)}><text x={0} y={0} fontFamily={SE} fontSize={56} textAnchor="middle" fill="#F3E7CC">150 000 000 km</text></g>
    </g>}
  </Scene>;
};

// ================================================================ 4. COAL SUN — in the dark, black iron blacksmith's tongs swing down from the top
// and grip the Sun; it turns into a lump of coal with glowing red cracks, roars with flame; a tiny Earth for scale; it burns out to grey
// cinder; the tongs let go and it drops out of frame; a towering cliff of rock strata rises behind. Clear area top-right (x > 1420, y < 360)
// for the year counter. Light: the burning lump itself (warm, from the centre).
const LUMP = blob(0, 0, 1, .94, 13, .22, 41), CRACKS: Pt[][] = (() => { const out: Pt[][] = []; for (let i = 0; i < 6; i++) { const a0 = rnd(i * 4.4) * 360, p0 = rot([.12 + rnd(i * 2.2) * .35, 0], a0), a1 = a0 + (rnd(i * 6.6) - .5) * 110, p1 = rot([.96, 0], a1);
  const main = jagLine(p0[0], p0[1], p1[0], p1[1], 7, .07, i * 9); out.push(main); const m = main[3], b = rot([.9, 0], a1 + 35 + (rnd(i * 8.8) - .5) * 30); out.push(jagLine(m[0], m[1], b[0], b[1], 4, .05, i * 13)); } return out; })();
const CoalSun: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, grip = 0, coal = 0, flames = 0, earth = 0, age = 0, release = 0, layers = 0 }) => {
  const id = 'cs' + Math.round(x), C: Pt = [820, 520], R = 190, fall = release > .25 ? Math.pow(seg(release, .25, 1), 2) * 1000 : 0, cy = C[1] + fall;
  const g = ease(seg(grip, 0, .7)), shut = ease(seg(grip, .6, 1)), jaw = (1 - shut) * 15 + ease(seg(release, 0, .3)) * 12, swingA = (1 - g) * -38;
  const burn = cl(coal) * (1 - age), fl = cl(flames) * (1 - ease(age)), lumpCol = mix('#1E1A18', '#8E8984', ease(age)), crackA = cl(coal * 1.4 - .2) * (1 - ease(seg(age, 0, .8)));
  const cliffTop = 1100 - ease(layers) * 1200;
  const arm = (side: N) => { const sg = side; // one half of the tongs: the handle crosses over the rivet to the opposite jaw
    const handle = sm([[-sg * 30, -12], [sg * 34, -300], [sg * 62, -800], [sg * 100, -800], [sg * 68, -300], [-sg * 2, -4]], false);
    const jawP = `M${-sg * 4} -10 C${-sg * 60} 60 ${-sg * (R + 60)} 180 ${-sg * (R + 22)} 340 C${-sg * (R + 18)} 380 ${-sg * (R - 6)} 404 ${-sg * (R - 10)} 410 L${-sg * (R - 2)} 384 C${-sg * (R + 2)} 300 ${-sg * (R + 30)} 190 ${-sg * 14} 30 Z`;
    return <g transform={`rotate(${f1(-sg * jaw)} 0 0)`}>
      <path d={handle + ` L${sg * 70} -800 Z`} fill="#3A3430" stroke={SEP} strokeWidth={2.4} /><path d={`M${-sg * 14} -10 L${sg * 50} -300 L${sg * 80} -800`} stroke="#B98A62" strokeWidth={3} fill="none" opacity={.35 + burn * .3} />
      <SR d={jawP} color="#3A3430" draw={draw} sw={2.4} />
      <path d={`M${-sg * 30} 60 C${-sg * (R + 30)} 180 ${-sg * (R + 14)} 300 ${-sg * (R - 4)} 380`} stroke="#FF9A50" strokeWidth={3} fill="none" opacity={.25 + burn * .45} />
    </g>; };
  return <Scene x={x} y={y} s={s} draw={draw}>
    <Fill c="#140D09" />
    {starField(53, 120, -100, -100, 2120, 1280).map(([a, b, r], i) => <Star key={i} x={a} y={b} r={r * .7} a={.5} />)}
    {/* the cliff of strata rising behind, lit by the fire */}
    {layers > 0 && <g>
      {(() => { let yy = cliffTop; const edge = (v: N) => 1330 + Math.sin(v * .02) * 20 + rnd(Math.round(v / 40)) * 30;
        return ROCK.concat(ROCK).map((c, i) => { const h = ROCKH[i % ROCK.length] * 1.15, y0 = yy; yy += h; if (y0 > 1100) return null;
          const top = jagLine(80, y0, edge(y0), y0, 10, 5, i * 3), bot = jagLine(edge(y0 + h), y0 + h, 80, y0 + h, 10, 5, i * 3 + 1);
          return <g key={i}><SR d={pathOf([...top, ...bot], true)} color={mix(c, '#2B1D12', .35)} draw={draw} sw={1.4} ang={i * 20} /><path d={pathOf(top)} stroke="#FFC890" strokeWidth={1.4} fill="none" opacity={.3} /></g>; }); })()}
      <path d={`M80 ${cliffTop - 10} V1200`} stroke={SEP} strokeWidth={3} />
      <Spot id={id + 'cl'} x={C[0]} y={C[1]} r0={150} r1={1100} a={.75} a0={0} c="#140D09" />
    </g>}
    <Glow id={id + 'hal'} x={C[0]} y={cy} r={R * 3.2} c={mix('#FFB24A', '#FF5A20', coal)} a={(1 - coal) * .5 + burn * .55 + fl * .2} />
    {/* the scuttle waiting below */}
    <Scuttle id={id} x={820} y={1150} k={2.5} draw={draw} lit={burn} />
    {/* sparks */}
    {fl > 0 && Array.from({ length: 34 }, (_, i) => { const p = (tm * .45 + rnd(i * 3.7)) % 1, sx = C[0] + (rnd(i * 1.9) - .5) * 300 + Math.sin(p * 9 + i) * 30, sy = cy - R * .6 - p * 560;
      return sx < 1380 ? <circle key={i} cx={sx} cy={sy} r={2 + rnd(i) * 2.4} fill="#FFD27A" opacity={fl * (1 - p)} /> : null; })}
    {/* flames roaring off the top of the lump */}
    {fl > 0 && Array.from({ length: 9 }, (_, i) => { const a = -168 + i * 19.5, len = R * (.7 + .5 * rnd(i * 2.3) + .18 * Math.sin(tm * 7 + i * 1.7)) * fl, w = R * .2,
        b = rot([R * .88, 0], a), tipP = rot([R * .9 + len, 0], a + Math.sin(tm * 5 + i) * 8), c1 = rot([R + len * .5, w], a), c2 = rot([R + len * .5, -w], a);
      const P = (p: Pt) => `${f1(C[0] + p[0])} ${f1(cy + p[1] - len * .25)}`;
      return <g key={i}><path d={`M${P(rot([R * .88, w], a))} Q${P(c1)} ${P(tipP)} Q${P(c2)} ${P(rot([R * .88, -w], a))}Z`} fill="#E8602A" opacity={.85} />
        <path d={`M${P(rot([R * .9, w * .5], a))} Q${P(rot([R + len * .35, w * .5], a))} ${P(rot([R * .9 + len * .7, 0], a))} Q${P(rot([R + len * .35, -w * .5], a))} ${P(rot([R * .9, -w * .5], a))}Z`} fill="#FFC34A" /></g>; })}
    {/* the Sun → the lump of coal → the cinder */}
    <g transform={`rotate(${f1(release * 40)} ${C[0]} ${cy})`}>
      {coal < 1 && <g opacity={1 - ease(coal)}><SunBall id={id + 'sun'} x={C[0]} y={cy} r={R} tm={tm} corona={0} /></g>}
      {coal > 0 && <g opacity={ease(cl(coal * 1.5))}>
        <path d={sm(LUMP.map(([u, v]) => [C[0] + u * R, cy + v * R] as Pt))} fill={lumpCol} stroke={SEP} strokeWidth={3} />
        {[[-.4, -.5, .3, -.1], [.3, -.6, .6, .1], [-.7, .1, -.1, .5], [.2, .3, .7, .5]].map(([a, b, c, d], i) => <path key={i} d={`M${C[0] + a * R} ${cy + b * R} L${C[0] + c * R} ${cy + d * R}`} stroke={mix('#4A4448', '#B8B2AA', age)} strokeWidth={2} opacity={.6} />)}
        <path d={`M${C[0] + R * .1} ${cy - R * .8} l${R * .3} ${R * .1} l${R * .2} ${R * .3}`} stroke="#9AA0B0" strokeWidth={4} fill="none" opacity={.5 * (1 - age)} />
        {crackA > 0 && CRACKS.map((c, i) => { const d = pathOf(c.map(([u, v]) => [C[0] + u * R, cy + v * R] as Pt)); return <g key={i}><path d={d} stroke="#FF5A1E" strokeWidth={14} fill="none" opacity={crackA * .45} filter="url(#b2s)" /><path d={d} stroke="#FFB04A" strokeWidth={4} fill="none" opacity={crackA} /></g>; })}
        {age > 0 && <Stipple x={C[0] - R} y={cy - R} w={R * 2} h={R * 2} n={600} seed={id + 'ash'} col="#E8E4DC" a={.45 * age} dens={(u, v) => (Math.hypot(u - .5, v - .5) < .45 ? 1 : 0)} />}
      </g>}
    </g>
    {/* the tongs */}
    <g transform={`translate(${C[0]} ${C[1] - R - 70}) rotate(${f1(swingA)} 0 -700)`}>{arm(1)}{arm(-1)}
      <circle cx={0} cy={0} r={16} fill="#3A3632" stroke={SEP} strokeWidth={2} /><circle cx={4} cy={-4} r={5} fill="#9C968C" /></g>
    {/* the tiny Earth for scale */}
    {earth > 0 && <g opacity={ease(earth)}><Earth id={id + 'e'} x={1190} y={430} r={8} /><circle cx={1190} cy={430} r={24 + 6 * (1 - earth)} fill="none" stroke="#F3E7CC" strokeWidth={1.6} strokeDasharray="4 5" /></g>}
  </Scene>;
};

// ================================================================ 5. VICTORIAN STUDY (1850s) — a fireplace with a coal scuttle bottom-left, a
// tall bookcase on the back wall, a desk on the right with an oil lamp and two small framed portraits. Clear floor centre-left
// (x 600–1150) for Kelvin standing. crumble: a cinder drops into the scuttle, a puff of ash. lamp: the lamp brightens, a warm pool.
// Light: the fire (low left, red-orange) and the oil lamp (right, gold).
const VictorianStudy: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, crumble = 0, lamp = 0 }) => {
  const id = 'vs' + Math.round(x), L = .35 + .65 * ease(lamp), SX = 470, SY = 900, fallY = lerp(-120, SY - 110, Math.pow(seg(crumble, 0, .55), 2)), puff = seg(crumble, .5, 1);
  const books = Array.from({ length: 5 }, (_, r) => { let bx = 676; const out: [N, N, N, string][] = []; let i = 0; while (bx < 1150) { const w = 16 + rnd(r * 31 + i * 1.7) * 18, h = 96 + rnd(r * 17 + i * 2.3) * 34; out.push([bx, w, h, ['#6A2A20', '#2E4A3A', '#5A3A22', '#8C6A2E', '#2B3B56', '#7A4A2E'][Math.floor(rnd(r * 9 + i) * 6)]]); bx += w + 1; i++; } return out; });
  return <Scene x={x} y={y} s={s} draw={draw}>
    {/* wall: dark green paper with a small figure, dado rail; floor of boards in perspective, a red rug */}
    <Fill c="#33493C" />
    {Array.from({ length: 120 }, (_, i) => <path key={i} d={`M${(i % 15) * 140 - 60 + (Math.floor(i / 15) % 2) * 70} ${Math.floor(i / 15) * 90 + 30} q8 -12 16 0 q-8 12 -16 0`} fill="#C9AE84" opacity={.16} />)}
    <SR d={rect(-200, 560, 2320, 220)} mat="wood" t={.72} draw={draw} />
    {[0, 1, 2, 3, 4, 5, 6].map(i => <SR key={i} d={rect(-140 + i * 320, 590, 270, 160)} mat="wood" t={.66} draw={draw} hatch={0} />)}
    <SR d={rect(-200, 548, 2320, 16)} mat="wood" t={.5} draw={draw} hatch={0} />
    <SR d={rect(-200, 780, 2320, 500)} mat="wood" t={.6} draw={draw} hatch={0} />
    {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${960 + (i - 11) * 40} 780 L${960 + (i - 11) * 190} 1100`} stroke={SEP} strokeWidth={1.2} opacity={.4} />)}
    {[830, 900, 990].map(v => <path key={v} d={`M-200 ${v} H2120`} stroke={SEP} strokeWidth={1} opacity={.25} />)}
    <SR d={`M560 830 H1300 L1420 1040 H440Z`} mat="red" t={.66} draw={draw} />
    <path d={`M590 850 H1270 L1370 1020 H490Z`} fill="none" stroke="#E0B878" strokeWidth={3} opacity={.6} />
    {/* the bookcase */}
    <Floor x={915} y={784} rx={290} ry={14} a={.5} />
    <SR d={rect(650, 70, 530, 712)} mat="wood" t={.8} draw={draw} />
    {books.map((row, r) => <g key={r}>{row.map(([bx, w, h, c], i) => <g key={i}><rect x={bx} y={226 + r * 132 - h} width={w} height={h} fill={c} stroke={SEP} strokeWidth={1.1} /><path d={`M${bx + 2} ${226 + r * 132 - h + 14} h${w - 4} M${bx + 2} ${226 + r * 132 - 16} h${w - 4}`} stroke="#D4A846" strokeWidth={1.4} opacity={.7} /></g>)}
      <SR d={rect(664, 226 + r * 132, 502, 14)} mat="wood" t={.55} draw={draw} hatch={0} /></g>)}
    <SR d={rect(640, 56, 550, 22)} mat="wood" t={.6} draw={draw} hatch={0} />
    {/* the fireplace: marble surround, mantel shelf with a clock, the grate of glowing coals, a painting above */}
    <SR d={rect(110, 150, 340, 230)} mat="brass" t={.6} draw={draw} hatch={0} />
    <SR d={rect(130, 170, 300, 190)} mat="sky" t={.35} draw={draw} hatch={0} />
    <path d="M130 330 Q200 270 280 300 T430 280 V360 H130Z" fill="#6E8F5A" opacity={.8} /><path d="M130 360 V320 Q240 340 430 330 V360Z" fill="#4F7A4A" opacity={.8} />
    <SR d={rect(40, 470, 480, 26)} mat="stone" t={.3} draw={draw} hatch={0} />
    <SR d={`M70 496 H490 V790 H400 V590 Q280 540 160 590 V790 H70Z`} mat="stone" t={.22} draw={draw} />
    <path d="M160 790 V590 Q280 540 400 590 V790Z" fill="#1A0E08" />
    <Glow id={id + 'fi'} x={280} y={740} r={130} ry={70} c="#FF7A2A" a={.9} />
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={sm(blob(190 + (i % 6) * 36, 740 - Math.floor(i / 6) * 22, 18, 13, 6, .4, i * 5))} fill={i % 3 ? '#3A1A10' : '#C8461E'} stroke={SEP} strokeWidth={1} />)}
    <Flame id={id + 'ff'} x={250} y={720} h={60} tm={tm} glow={0} /><Flame id={id + 'ff2'} x={310} y={724} h={44} tm={tm + 1.3} glow={0} />
    <path d="M176 760 H384 M176 776 H384" stroke="#2B1D12" strokeWidth={6} />
    <SR d={rect(40, 790, 480, 22)} mat="stone" t={.45} draw={draw} hatch={0} />
    <g><SR d={rr(240, 400, 80, 70, 10)} mat="wood" t={.65} draw={draw} /><circle cx={280} cy={432} r={24} fill="#FBF4E2" stroke={SEP} strokeWidth={1.6} /><path d="M280 432 V416 M280 432 l12 6" stroke={SEP} strokeWidth={2} /></g>
    {[90, 460].map(cx => <g key={cx}><SR d={rect(cx - 8, 420, 16, 50)} mat="brass" t={.4} draw={draw} hatch={0} /><rect x={cx - 6} y={380} width={12} height={40} fill="#FBF4E2" stroke={SEP} strokeWidth={1.2} /></g>)}
    {/* the scuttle by the hearth, a cinder dropping into it, a puff of ash */}
    <Scuttle id={id} x={SX} y={SY} k={.9} draw={draw} lit={.5} />
    {crumble > 0 && crumble < .56 && <path d={sm(blob(SX + 10, fallY, 20, 17, 7, .4, 77))} fill="#7E7974" stroke={SEP} strokeWidth={1.4} />}
    {puff > 0 && Array.from({ length: 9 }, (_, i) => { const a = -170 + i * 20, p = rot([20 + puff * 90, 0], a); return <circle key={i} cx={SX + 10 + p[0]} cy={SY - 80 + p[1] * .6 - puff * 20} r={10 + puff * 26} fill="#BDB6AA" opacity={(1 - puff) * .55} filter="url(#b2s)" />; })}
    {/* the desk: top, drawers, legs; the lamp, two small portraits on easel backs, papers, an inkwell */}
    <Floor x={1560} y={985} rx={360} ry={22} a={.55} />
    <SR d={rect(1270, 720, 40, 260)} mat="wood" t={.72} draw={draw} /><SR d={rect(1800, 720, 40, 260)} mat="wood" t={.72} draw={draw} />
    <SR d={rect(1290, 720, 530, 110)} mat="wood" t={.62} draw={draw} />
    {[1330, 1580].map(dx => <g key={dx}><SR d={rect(dx, 740, 200, 70)} mat="wood" t={.55} draw={draw} hatch={0} /><circle cx={dx + 100} cy={775} r={7} fill="#D4A846" stroke={SEP} strokeWidth={1.2} /></g>)}
    <SR d={`M1230 690 H1880 L1860 720 H1250Z`} mat="wood" t={.45} draw={draw} hatch={0} />
    <SR d={`M1530 680 L1660 676 L1676 692 L1540 698Z`} mat="paper" t={.2} draw={draw} hatch={0} />
    <g><SR d={rect(1300, 664, 40, 26)} mat="night" t={.85} draw={draw} hatch={0} /><path d="M1322 664 L1360 560" stroke="#F3E7CC" strokeWidth={3} /><path d="M1360 560 q12 -20 4 -40 q-14 18 -4 40" fill="#F3E7CC" stroke={SEP} strokeWidth={1} /></g>
    {[[1400, 586, 0], [1490, 596, 1]].map(([px, py, j]) => <g key={j}>
      <path d={`M${px + 10} ${py + 90} L${px + 34} 690`} stroke="#4F3020" strokeWidth={4} />
      <SR d={ell(px, py, 44, 56)} mat="brass" t={.45} draw={draw} hatch={0} />
      <ellipse cx={px} cy={py} rx={34} ry={45} fill={j ? '#D9C7A0' : '#CDBB94'} stroke={SEP} strokeWidth={1.2} />
      <path d={`M${px - 28} ${py + 40} C${px - 26} ${py + 14} ${px - 14} ${py + 8} ${px} ${py + 8} C${px + 14} ${py + 8} ${px + 26} ${py + 14} ${px + 28} ${py + 40}Z`} fill="#3A2418" />
      <ellipse cx={px} cy={py - 8} rx={13} ry={16} fill="#8C6A4E" /><path d={`M${px - 13} ${py - 14} q13 -14 26 0`} fill={j ? '#B9B0A0' : '#3A2418'} /></g>)}
    {/* the oil lamp: brass foot and font, glass chimney with the flame, frosted globe */}
    <g>
      <Glow id={id + 'lp'} x={1690} y={520} r={760} ry={520} c="#FFC870" a={L * .55} blend="screen" />
      <Floor x={1700} y={692} rx={70} ry={8} a={.5} />
      <SR d={`M1650 690 Q1700 670 1750 690 L1730 660 H1670Z`} mat="brass" t={.55} draw={draw} hatch={0} />
      <SR d={rect(1688, 600, 24, 62)} mat="brass" t={.45} draw={draw} hatch={0} />
      <SR d={ell(1700, 580, 52, 34)} mat="brass" t={.4} draw={draw} hatch={0} />
      <rect x={1684} y={470} width={32} height={96} rx={10} fill="#FFF4D2" opacity={.35} stroke={SEP} strokeWidth={1.4} />
      <Flame id={id + 'lf'} x={1700} y={548} h={30 + 14 * L} tm={tm} glow={0} />
      <path d={`M1640 470 C1630 420 1650 380 1700 376 C1750 380 1770 420 1760 470 Q1700 490 1640 470Z`} fill="#FFF7E0" opacity={.55 + .35 * L} stroke={SEP} strokeWidth={1.6} />
      <Glow id={id + 'gl'} x={1700} y={440} r={110} c="#FFF4D2" a={.4 + .5 * L} />
    </g>
    {/* the room's light: dark corners, warm pools at the fire and at the lamp */}
    <Spot id={id + 'dk'} x={1300} y={600} r0={200} r1={1200} a={.78 - .2 * L} a0={.32 - .28 * L} />
    <Glow id={id + 'fg'} x={280} y={720} r={520} ry={380} c="#FF8A3A" a={.4} blend="screen" />
  </Scene>;
};

// ================================================================ 6. BIKE PUMP — insert on the desk: an old floor-standing bicycle pump, both
// hands on the T-handle, a thermometer strapped to the barrel; pump = handle position (0 up, 1 down), heat = the column climbs into the red
// and the barrel shimmers. Light: the desk lamp from the upper right; the pump's shadow falls on the wall to the left.
const BikePump: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, pump = 0, heat = 0 }) => {
  const id = 'bp' + Math.round(x), PX = 960, top = 430, hy = lerp(150, 380, cl(pump)), col = lerp(.12, .92, ease(heat));
  const pumpShape = (dx: N, dy: N) => `M${PX - 68 + dx} ${top + dy} H${PX + 68 + dx} V${975 + dy} H${PX - 68 + dx}Z M${PX - 6 + dx} ${hy + dy} H${PX + 6 + dx} V${top + dy} H${PX - 6 + dx}Z M${PX - 200 + dx} ${hy - 20 + dy} H${PX + 200 + dx} V${hy + 20 + dy} H${PX - 200 + dx}Z`;
  return <Scene x={x} y={y} s={s} draw={draw}>
    <Fill c="#5A3E2C" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${-200 + i * 80} -200 V840`} stroke="#2B1D12" strokeWidth={i % 2 ? 1 : 12} opacity={.1} />)}
    <path d={pumpShape(-150, -30)} fill="#1A0E08" opacity={.42} filter="url(#b8)" />
    {/* the desk top, edge-on */}
    <SR d={rect(-200, 840, 2320, 400)} mat="wood" t={.5} draw={draw} hatch={0} />
    {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M-200 ${860 + i * 24} C400 ${852 + i * 26} 1200 ${868 + i * 22} 2120 ${858 + i * 25}`} stroke="#4F3020" strokeWidth={1} fill="none" opacity={.3} />)}
    {/* the hose, coiling off to the right across the desk */}
    <path d={`M${PX + 50} 950 C${PX + 200} 960 ${PX + 260} 1040 ${PX + 420} 1010 C${PX + 600} 980 ${PX + 640} 900 ${PX + 900} 930`} stroke="#1E1A18" strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d={`M${PX + 50} 946 C${PX + 200} 956 ${PX + 260} 1034 ${PX + 420} 1004 C${PX + 600} 974 ${PX + 640} 894 ${PX + 900} 924`} stroke="#6E6A66" strokeWidth={4} fill="none" opacity={.6} />
    {/* feet and barrel */}
    <Floor x={PX} y={992} rx={240} ry={18} a={.55} />
    <SR d={`M${PX - 200} 990 L${PX - 60} 960 H${PX + 60} L${PX + 200} 990 L${PX + 190} 1002 L${PX - 190} 1002Z`} color="#2A2624" draw={draw} />
    <defs><linearGradient id={id + 'br'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1A1816" /><stop offset=".55" stopColor="#3A3836" /><stop offset=".78" stopColor="#8C8884" /><stop offset="1" stopColor="#2A2826" /></linearGradient>
      <linearGradient id={id + 'ht'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D2643E" stopOpacity={0} /><stop offset="1" stopColor="#E2401E" stopOpacity={.7} /></linearGradient></defs>
    <path d={`M${PX - 68} ${top} H${PX + 68} V975 H${PX - 68}Z`} fill={`url(#${id}br)`} stroke={SEP} strokeWidth={2.4} />
    <text x={PX - 34} y={top + 300} fontFamily={FSC} fontSize={22} fill="#D4A846" transform={`rotate(-90 ${PX - 34} ${top + 300})`} textAnchor="middle" opacity={.8}>Cyclist</text>
    <rect x={PX - 68} y={top + 260} width={104} height={285} fill={`url(#${id}ht)`} opacity={ease(heat)} />
    <SR d={rect(PX - 60, top - 18, 120, 22)} color="#3A3632" draw={draw} hatch={0} /><SR d={rect(PX - 60, 950, 120, 26)} color="#3A3632" draw={draw} hatch={0} />
    {/* the rod and the T-handle with turned wooden grips */}
    <rect x={PX - 7} y={hy} width={14} height={top - hy - 16} fill="#C9C6C0" stroke={SEP} strokeWidth={1.6} /><path d={`M${PX + 3} ${hy} V${top - 18}`} stroke="#FFFFFF" strokeWidth={2.4} opacity={.8} />
    <SR d={rect(PX - 40, hy - 14, 80, 28)} color="#3A3632" draw={draw} hatch={0} />
    {[-1, 1].map(sd => <g key={sd}><SR d={rr(sd > 0 ? PX + 40 : PX - 230, hy - 30, 190, 60, 28)} mat="wood" t={.5} draw={draw} hatch={0} /><path d={`M${sd > 0 ? PX + 50 : PX - 200} ${hy - 10} H${sd > 0 ? PX + 200 : PX - 50}`} stroke="#F2DCA6" strokeWidth={4} opacity={.5} /></g>)}
    {/* the thermometer strapped to the barrel: brass back-plate, scale, glass tube, the red column */}
    <SR d={rr(PX - 6, top + 70, 52, 450, 10)} mat="brass" t={.3} draw={draw} hatch={0} />
    {Array.from({ length: 17 }, (_, i) => <path key={i} d={`M${PX} ${top + 100 + i * 22} h${i % 4 ? 8 : 14}`} stroke={SEP} strokeWidth={1.4} />)}
    <rect x={PX + 13} y={top + 88} width={14} height={380} rx={7} fill="#FBF4E2" stroke={SEP} strokeWidth={1.4} />
    <rect x={PX + 16} y={top + 88 + 380 * (1 - col)} width={8} height={380 * col} fill="#C8321E" />
    <circle cx={PX + 20} cy={top + 486} r={17} fill="#C8321E" stroke={SEP} strokeWidth={1.6} /><circle cx={PX + 25} cy={top + 481} r={5} fill="#FFFFFF" opacity={.6} />
    <path d={`M${PX + 38} ${top + 110} V${top + 220}`} stroke={VERM} strokeWidth={5} opacity={.6} />
    {[top + 60, top + 515].map(sy => <g key={sy}><SR d={rect(PX - 72, sy, 144, 20)} mat="wood" t={.75} draw={draw} hatch={0} /><rect x={PX - 50} y={sy + 2} width={16} height={16} fill="none" stroke="#D4A846" strokeWidth={3} /></g>)}
    {/* heat shimmer rising off the barrel */}
    {heat > .05 && Array.from({ length: 6 }, (_, i) => { const sx = PX - 80 + (i % 2 ? 160 : 0) + (i > 1 ? (i - 2) * 10 : 0), p = (tm * .6 + i * .37) % 1;
      return <path key={i} d={`M${sx} ${900 - p * 120} c-10 -20 10 -40 0 -60 c-10 -20 10 -40 0 -60`} stroke="#FFE2A8" strokeWidth={2.4} fill="none" opacity={ease(heat) * .7 * Math.sin(p * Math.PI)} />; })}
    {/* two hands on the grips */}
    <HumanHand id={id + 'hl'} x={PX - 150} y={hy - 112} s={1.35} ang={78} pose="grip" sleeve="#3A3A44" mirror />
    <HumanHand id={id + 'hr'} x={PX + 150} y={hy - 112} s={1.35} ang={102} pose="grip" sleeve="#3A3A44" />
    {/* lamp light from the upper right */}
    <Spot id={id + 'dk'} x={1300} y={300} r0={200} r1={1300} a={.7} a0={0} />
    <Glow id={id + 'lp'} x={1500} y={200} r={700} c="#FFC870" a={.35} blend="screen" />
  </Scene>;
};

// ================================================================ 7. SHRINKING SUN — a big Sun on a dark warm ground. squeeze: arrows press in
// all round, the Sun shrinks a little and burns whiter. tape: a tailor's yellow tape wraps its middle. notch: the tape clicks tighter, notch
// by notch, a vermilion notch mark at the buckle. Light: the Sun.
const ShrinkingSun: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, squeeze = 0, tape = 0, notch = 0 }) => {
  const id = 'ss' + Math.round(x), sq = ease(squeeze), kn = notch * 5, clicks = Math.floor(kn) + ease(cl((kn % 1) * 3)), R = 330 * (1 - .1 * sq - .018 * clicks), CX = 960, CY = 520;
  const tw = ease(tape), bow = R * .2, hb = 30;
  const B = (u: N, off = 0): Pt => { const xx = CX - R + 2 * R * u; return [xx, CY + off + bow * (1 - Math.pow(2 * u - 1, 2))]; };
  const flash = clicks > 0 ? Math.max(0, 1 - (kn % 1) * 4) : 0;
  return <Scene x={x} y={y} s={s} draw={draw}>
    <Fill c="#1A0E08" />
    <Glow id={id + 'bg'} x={CX} y={CY} r={1100} c="#5A2A14" a={.8} />
    <Stipple x={-100} y={-100} w={2120} h={1280} n={1400} seed={id} col="#0A0604" a={.4} />
    <SunBall id={id + 'sun'} x={CX} y={CY} r={R} hot={sq * .7 + clicks * .05} tm={tm} />
    {/* inward arrows */}
    {squeeze > 0 && Array.from({ length: 8 }, (_, i) => { const a = i * 45 + 22.5, d = lerp(R + 330, R + 70, sq) + Math.sin(tm * 3 + i) * 6, L = 120;
      const p = rot([d, 0], a), q = rot([d + L, 0], a), h1 = rot([d + 38, 26], a), h2 = rot([d + 38, -26], a), s1 = rot([d + 38, 10], a), s2 = rot([d + 38, -10], a), e1 = rot([d + L, 10], a), e2 = rot([d + L, -10], a);
      const P = (v: Pt) => `${f1(CX + v[0])} ${f1(CY + v[1])}`;
      return <g key={i} opacity={cl(squeeze * 3)}><path d={`M${P(p)} L${P(h1)} L${P(s1)} L${P(e1)} L${P(e2)} L${P(s2)} L${P(h2)}Z`} fill="#F3E7CC" stroke={SEP} strokeWidth={2.4} /><path d={`M${P(q)} L${P(p)}`} stroke={VERM} strokeWidth={2} opacity={.0} /></g>; })}
    {/* the tape: the yellow band round the middle, its ticks and figures, the brass end tab and the hanging tail */}
    {tape > 0 && <g>
      <defs><clipPath id={id + 'tp'}><rect x={CX - R - 40} y={CY - 200} width={(2 * R + 80) * tw} height={600} /></clipPath></defs>
      <g clipPath={`url(#${id}tp)`}>
        <path d={`M${pathOf(Array.from({ length: 21 }, (_, i) => B(i / 20, -hb))).slice(1)} L${pathOf(Array.from({ length: 21 }, (_, i) => B(1 - i / 20, hb))).slice(1)}Z`} fill="#EBC64A" stroke={SEP} strokeWidth={2} />
        {Array.from({ length: 41 }, (_, i) => { const u = .02 + i * .024, p = B(u, -hb), q = B(u, -hb + (i % 5 ? 12 : 22)); return <g key={i}><path d={`M${f1(p[0])} ${f1(p[1])} L${f1(q[0])} ${f1(q[1])}`} stroke={SEP} strokeWidth={1.4} />
          {i % 5 === 0 && <text x={B(u, 18)[0]} y={B(u, 18)[1]} fontFamily={SE} fontSize={20} textAnchor="middle" fill={SEP}>{i / 5 + 10}</text>}</g>; })}
        <path d={`M${pathOf(Array.from({ length: 21 }, (_, i) => B(i / 20, -hb + 4))).slice(1)}`} stroke="#FFF4D2" strokeWidth={3} fill="none" opacity={.6} />
      </g>
      {tw > .95 && <g>
        <path d={`M${CX + R - 4} ${CY - hb} C${CX + R + 60} ${CY + 60} ${CX + R + 30} ${CY + 260} ${CX + R + 100} ${CY + 420} L${CX + R + 50} ${CY + 436} C${CX + R - 20} ${CY + 270} ${CX + R + 10} ${CY + 80} ${CX + R - 40} ${CY + hb}Z`} fill="#E0B840" stroke={SEP} strokeWidth={2} />
        <rect x={CX + R + 46} y={CY + 420} width={56} height={28} fill="#B9C8D0" stroke={SEP} strokeWidth={1.6} transform={`rotate(-20 ${CX + R + 74} ${CY + 434})`} />
        {/* the notch marks, one per click */}
        {Array.from({ length: Math.ceil(clicks) }, (_, j) => { const p = B(.88 - j * .03, -hb); return <path key={j} d={`M${f1(p[0] - 9)} ${f1(p[1] - 2)} L${f1(p[0])} ${f1(p[1] + 18)} L${f1(p[0] + 9)} ${f1(p[1] - 2)}Z`} fill={VERM} stroke={SEP} strokeWidth={1.2} opacity={cl(clicks - j)} />; })}
        {flash > 0 && Array.from({ length: 6 }, (_, j) => { const p = B(.88 - (Math.ceil(clicks) - 1) * .03, -hb), d = rot([30, 0], -150 + j * 24); return <path key={j} d={`M${f1(p[0] + d[0])} ${f1(p[1] + d[1])} l${f1(d[0] * .8)} ${f1(d[1] * .8)}`} stroke="#FFF4D2" strokeWidth={3} opacity={flash} />; })}
      </g>}
    </g>}
  </Scene>;
};

// ================================================================ 8. CALENDAR PAD — a big Victorian tear-off desk calendar on a wooden stand,
// under the lamp. flip: page after page flies off, the figure runs 0 → 20 000 000 years. crack: a geologist's hammer (square face, pick
// behind) swings in and cracks the last page; cracks radiate. Light: the desk lamp (upper left), a warm pool.
// a tear-off pad drawn at (X, Y) w×h: k = pages gone (float), val(j) = the figure on page j, flying pages curl up and away to the upper right
const TearPad: React.FC<{ id: string; X: N; Y: N; w: N; h: N; k: N; val: (j: N) => string; sub: string; head: string; draw: N; fsz: N; tm?: N; flutter?: N }> = ({ id, X, Y, w, h, k, val, sub, head, draw, fsz, tm = 0, flutter = 0 }) => {
  const top = Math.max(0, Math.ceil(k - .3)), page = (j: N, sty: React.CSSProperties | undefined, tf: string, op = 1, ta = 1) => <g key={'p' + j} transform={tf} opacity={op} style={sty}>
    <rect x={X} y={Y} width={w} height={h} fill="#FBF4E2" stroke={SEP} strokeWidth={2} />
    <rect x={X} y={Y} width={w} height={h * .16} fill="#A8432E" stroke={SEP} strokeWidth={1.6} />
    <text x={X + w / 2} y={Y + h * .115} fontFamily={FSC} fontSize={h * .085} textAnchor="middle" fill="#FBF4E2">{head}</text>
    <g opacity={ta}><text x={X + w / 2} y={Y + h * .55} fontFamily={SE} fontSize={fsz} textAnchor="middle" fill={SEP}>{val(j)}</text></g>
    <text opacity={ta} x={X + w / 2} y={Y + h * .74} fontFamily="'IM Fell DW Pica', serif" fontStyle="italic" fontSize={h * .085} textAnchor="middle" fill={SEP}>{sub}</text>
    <path d={`M${X + 20} ${Y + h * .84} H${X + w - 20}`} stroke={SEP} strokeWidth={1} opacity={.4} />
  </g>;
  const flying = [3, 2, 1].map(m => { const j = top - m; if (j < 0) return null; const ph2 = cl((k - j - .3) / 2.4), fl = ph2 + (flutter ? Math.sin(tm * 9 + j) * .03 : 0);
    if (ph2 <= 0 || ph2 >= 1) return null;
    const a = cl(fl / .35), sy = Math.cos(a * 75 * D2R), b = ease(cl((fl - .3) / .7));
    const tf = `translate(${f1(b * w * 1.6)} ${f1(-b * h * 1.2)}) rotate(${f1(b * 50)} ${X + w / 2} ${Y}) translate(0 ${Y}) scale(1 ${f1(sy)}) translate(0 ${-Y})`;
    return page(j, undefined, tf, 1 - Math.pow(b, 3), 1 - a); });
  return <g>
    <Floor x={X + w / 2 + 20} y={Y + h + 60} rx={w * .7} ry={22} a={.55} />
    <SR d={`M${X - 40} ${Y + h + 60} L${X - 10} ${Y + h - 10} H${X + w + 10} L${X + w + 40} ${Y + h + 60}Z`} mat="wood" t={.6} draw={draw} />
    {[6, 4, 2].map(o => <rect key={o} x={X + o} y={Y + o} width={w} height={h} fill="#E6D6B0" stroke={SEP} strokeWidth={1} />)}
    {page(top, undefined, '')}
    {flying}
    <SR d={rect(X - 12, Y - 26, w + 24, 34)} mat="brass" t={.5} draw={draw} hatch={0} />
    {[.2, .5, .8].map(u => <circle key={u} cx={X + w * u} cy={Y - 9} r={6} fill="#F3D98A" stroke={SEP} strokeWidth={1.2} />)}
  </g>;
};
const CalendarPad: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, flip = 0, crack = 0 }) => {
  const id = 'cp' + Math.round(x), k = cl(flip) * 40, val = (j: N) => fmt(Math.round(20e6 * Math.pow(Math.min(j, 40) / 40, 1.6) / 1e5) * 1e5);
  const hit = .35, swing = crack < hit ? ease(crack / hit) : 1 - .12 * Math.sin(seg(crack, hit, .6) * Math.PI), ha = lerp(-70, 0, swing), I: Pt = [960, 560], cr = ease(seg(crack, hit, .9));
  return <Scene x={x} y={y} s={s} draw={draw}>
    <Fill c="#3E2A1E" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${-200 + i * 80} -200 V780`} stroke="#2B1D12" strokeWidth={i % 2 ? 1 : 10} opacity={.12} />)}
    <SR d={rect(-200, 780, 2320, 500)} mat="wood" t={.5} draw={draw} hatch={0} />
    {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M-200 ${800 + i * 30} C400 ${790 + i * 32} 1200 ${806 + i * 28} 2120 ${796 + i * 31}`} stroke="#4F3020" strokeWidth={1} fill="none" opacity={.3} />)}
    <TearPad id={id} X={600} Y={200} w={720} h={600} k={k} val={val} sub="years" head="Age of the Sun" draw={draw} fsz={104} tm={tm} />
    {/* the cracks in the last page */}
    {cr > 0 && <g>{Array.from({ length: 9 }, (_, i) => { const a = i * 40 + rnd(i) * 20, Lr = (140 + rnd(i * 3) * 220) * cr, e = rot([Lr, 0], a);
      const pts = jagLine(I[0], I[1], I[0] + e[0], I[1] + e[1], 6, 12, i * 11).filter(p => p[0] > 604 && p[0] < 1316 && p[1] > 300 && p[1] < 796);
      return <g key={i}><path d={pathOf(pts)} stroke={SEP} strokeWidth={4} fill="none" /><path d={pathOf(pts.map(p => [p[0] + 2, p[1] + 2] as Pt))} stroke="#FFFFFF" strokeWidth={1.4} fill="none" opacity={.7} /></g>; })}
      <circle cx={I[0]} cy={I[1]} r={26 * cr} fill={SEP} opacity={.35} filter="url(#b2s)" /></g>}
    {/* the hammer swinging in from the upper right */}
    {crack > 0 && <g transform={`rotate(${f1(ha)} 1760 1040)`} opacity={cl(crack * 6)}>
      <path d={`M1760 1040 L${I[0] + 60} ${I[1] + 30}`} stroke="#1A120B" strokeWidth={46} strokeLinecap="round" opacity={.25} transform="translate(-20 30)" filter="url(#b8)" />
      <SR d={`M1772 1052 L${I[0] + 70} ${I[1] + 20} L${I[0] + 50} ${I[1] + 46} L1748 1030Z`} mat="wood" t={.45} draw={draw} ang={-30} />
      <g transform={`rotate(-37 ${I[0] + 60} ${I[1] + 32})`}>
        <SR d={`M${I[0] + 20} ${I[1] - 100} L${I[0] + 100} ${I[1] - 100} L${I[0] + 100} ${I[1] - 30} L${I[0] + 96} ${I[1] + 30} C${I[0] + 92} ${I[1] + 120} ${I[0] + 78} ${I[1] + 170} ${I[0] + 60} ${I[1] + 220} C${I[0] + 42} ${I[1] + 170} ${I[0] + 28} ${I[1] + 120} ${I[0] + 24} ${I[1] + 30} L${I[0] + 20} ${I[1] - 30}Z`} color="#6E6A66" draw={draw} sw={2.2} />
        <path d={`M${I[0] + 84} ${I[1] - 96} V${I[1] + 40}`} stroke="#E8EEF0" strokeWidth={4} opacity={.6} />
      </g>
    </g>}
    <Glow id={id + 'lp'} x={360} y={160} r={1100} ry={800} c="#FFC870" a={.35} blend="screen" />
    <Spot id={id + 'dk'} x={700} y={420} r0={260} r1={1300} a={.75} a0={0} />
  </Scene>;
};

// ================================================================ 9. CLIFF LAYERS — a quarry face of many coloured beds (sandstone, shale,
// limestone, red beds, a coal seam), a small geologist at its foot, back view, hammer in hand. hammer: he swings, chips fly. stack: the beds
// build up from the bottom as sand settles, the cliff grows taller. glow: the bed edges glow faintly. Light: the sun from the upper right; his
// shadow falls left on the ground.
const CliffLayers: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, hammer = 0, stack = 1, glow = 0 }) => {
  const id = 'cl' + Math.round(x), FL = 900, nb = ROCK.length, cnt = cl(stack) * nb;
  const bands: { y0: N; y1: N; c: string; i: N }[] = []; let yy = FL; for (let i = 0; i < nb; i++) { const f = cl(cnt - i); if (f <= 0) break; const h = ROCKH[i] * .82 * f; bands.push({ y0: yy - h, y1: yy, c: ROCK[i], i }); yy -= h; }
  const topY = yy, wav = (v: N, seed: N) => Array.from({ length: 17 }, (_, j) => [-60 + j * 130, v + Math.sin(j * .9 + seed) * 6 + (rnd(seed * 7 + j) - .5) * 8] as Pt);
  const ph2 = (hammer * 3) % 1, up = ph2 < .7 ? ease(ph2 / .7) : 1 - ease((ph2 - .7) / .3), armA = lerp(-25, -160, up), GX = 760, GY = 975, hitP: Pt = [GX + 257, GY - 386];
  const chipsT = hammer > 0 && hammer < 1 ? (ph2 < .5 && hammer > .3 ? ph2 / .5 : -1) : -1;
  return <Scene x={x} y={y} s={s} draw={draw}>
    <VGrad id={id + 'sk'} x={-300} y={-300} w={2520} h={1400} stops={[[0, '#9DB8CF'], [.5, '#E6D9BE'], [1, '#F3E7CC']]} />
    <path d="M-200 520 Q200 420 600 470 T1300 440 T2120 480 V1100 H-200Z" fill="#B9B08E" opacity={.6} />
    <Glow id={id + 'sun'} x={1700} y={80} r={520} c="#FFF4D2" a={.7} />
    {/* the beds */}
    {bands.map(({ y0, y1, c, i }) => { const top = wav(y0, i), bot = wav(y1, i + 1).reverse();
      return <g key={i}><SR d={sm([...top, ...bot], true)} color={c} draw={draw} sw={1.5} ang={i * 25} />
        <path d={sm(wav(y1, i + 1), false)} stroke="#2B1D12" strokeWidth={5} fill="none" opacity={.3} transform="translate(0 -4)" filter="url(#b2s)" />
        {Array.from({ length: 5 }, (_, j) => { const jx = 100 + rnd(i * 13 + j) * 1700; return <path key={j} d={`M${jx} ${y0 + 4} l${(rnd(j + i) - .5) * 12} ${y1 - y0 - 8}`} stroke={SEP} strokeWidth={1.2} opacity={.45} />; })}
        {glow > 0 && <path d={sm(top, false)} stroke="#FFD27A" strokeWidth={5} fill="none" opacity={glow * .7} filter="url(#b2s)" />}</g>; })}
    <Stipple x={-60} y={topY} w={2040} h={FL - topY} n={Math.round((FL - topY) * 3)} seed={id + 'rk'} col={SEP} a={.3} />
    {bands.length > 0 && <path d={sm(wav(topY, bands[bands.length - 1].i), false)} stroke="#6E8F5A" strokeWidth={10} fill="none" strokeLinecap="round" />}
    {/* sand settling onto the top bed as it builds */}
    {stack > 0 && stack < 1 && Array.from({ length: 70 }, (_, i) => { const p = (tm * .5 + rnd(i * 2.7)) % 1, sx = rnd(i * 5.1) * 1920; return <circle key={i} cx={sx} cy={lerp(topY - 260, topY - 4, p)} r={2} fill="#C9A36E" opacity={.8 * (1 - p * .5)} />; })}
    {/* the quarry floor, scree and boulders */}
    <SR d={`M-200 ${FL - 4} H2120 V1300 H-200Z`} mat="sand" t={.45} draw={draw} hatch={0} />
    <Stipple x={-100} y={FL} w={2120} h={200} n={900} seed={id + 'fl'} col={SEP} a={.35} />
    {[[180, 1010, 120, 70], [1600, 990, 90, 54], [1780, 1050, 140, 70], [420, 930, 46, 26], [1180, 940, 40, 22]].map(([bx, by, rx, ry], i) => <g key={i}><Floor x={bx - rx * .4} y={by + ry * .6} rx={rx * 1.1} ry={ry * .3} a={.5} /><SR d={sm(blob(bx, by, rx, ry, 9, .25, i * 13))} mat="stone" t={.55} draw={draw} ang={30} /></g>)}
    {/* the geologist, back view: his shadow, boots, trousers, coat, hat, the arm with the hammer */}
    <path d={`M${GX - 20} ${GY} L${GX - 260} ${GY + 30} L${GX - 250} ${GY + 50} L${GX + 30} ${GY + 6}Z`} fill={SEP} opacity={.35} filter="url(#b2s)" />
    <g transform={`translate(${GX} ${GY}) scale(1.55) translate(${-GX} ${-GY})`}>
      <SR d={`M${GX - 34} ${GY - 90} L${GX - 30} ${GY - 6} H${GX - 6} L${GX - 2} ${GY - 80} L${GX + 4} ${GY - 80} L${GX + 8} ${GY - 6} H${GX + 32} L${GX + 34} ${GY - 90}Z`} mat="night" t={.7} draw={draw} />
      <SR d={`M${GX - 34} ${GY - 8} h30 v12 h-34Z M${GX + 6} ${GY - 8} h30 v12 h-30Z`} color="#2B1D12" draw={draw} hatch={0} />
      <SR d={`M${GX - 44} ${GY - 82} L${GX - 36} ${GY - 196} Q${GX} ${GY - 212} ${GX + 36} ${GY - 196} L${GX + 44} ${GY - 82} Q${GX} ${GY - 74} ${GX - 44} ${GY - 82}Z`} mat="wood" t={.62} draw={draw} />
      <path d={`M${GX} ${GY - 200} V${GY - 80}`} stroke={SEP} strokeWidth={1.4} opacity={.6} />
      <path d={`M${GX - 30} ${GY - 120} L${GX - 52} ${GY - 92}`} stroke="#4F3020" strokeWidth={14} strokeLinecap="round" /><circle cx={GX - 54} cy={GY - 88} r={7} fill="#C78F66" />
      <rect x={GX - 8} y={GY - 210} width={16} height={14} fill="#C78F66" /><ellipse cx={GX} cy={GY - 222} rx={18} ry={20} fill="#3A2418" stroke={SEP} strokeWidth={1.4} /><ellipse cx={GX - 18} cy={GY - 220} rx={4} ry={7} fill="#C78F66" stroke={SEP} strokeWidth={1} /><ellipse cx={GX + 18} cy={GY - 220} rx={4} ry={7} fill="#C78F66" stroke={SEP} strokeWidth={1} /><path d={`M${GX - 22} ${GY - 204} Q${GX} ${GY - 196} ${GX + 22} ${GY - 204}`} stroke="#EFE2C6" strokeWidth={5} fill="none" />
      <ellipse cx={GX} cy={GY - 236} rx={36} ry={8} fill="#3A2418" stroke={SEP} strokeWidth={1.4} /><path d={`M${GX - 18} ${GY - 238} Q${GX} ${GY - 268} ${GX + 18} ${GY - 238}Z`} fill="#3A2418" stroke={SEP} strokeWidth={1.4} />
      <g transform={`rotate(${f1(armA)} ${GX + 30} ${GY - 186})`}>
        <path d={`M${GX + 30} ${GY - 186} L${GX + 92} ${GY - 186}`} stroke="#5A3A22" strokeWidth={15} strokeLinecap="round" /><circle cx={GX + 98} cy={GY - 186} r={8} fill="#C78F66" stroke={SEP} strokeWidth={1} />
        <path d={`M${GX + 98} ${GY - 186} L${GX + 152} ${GY - 186}`} stroke="#8C5A36" strokeWidth={6} strokeLinecap="round" />
        <path d={`M${GX + 150} ${GY - 206} L${GX + 160} ${GY - 206} L${GX + 160} ${GY - 172} L${GX + 155} ${GY - 160} L${GX + 150} ${GY - 172}Z`} fill="#4E4A50" stroke={SEP} strokeWidth={1.4} />
      </g>
    </g>
    {chipsT >= 0 && Array.from({ length: 9 }, (_, i) => { const vx = (rnd(i * 2.1) - .2) * 260, vy = -120 - rnd(i * 3.3) * 160, t = chipsT;
      return <path key={i} d={sm(blob(hitP[0] + vx * t, hitP[1] + vy * t + 400 * t * t, 6, 4, 5, .6, i))} fill={ROCK[i % 4]} stroke={SEP} strokeWidth={1} opacity={1 - t} />; })}
    <Glow id={id + 'lt'} x={1500} y={200} r={1300} ry={900} c="#FFF0C8" a={.3} blend="screen" />
    <Spot id={id + 'v'} x={1100} y={420} r0={500} r1={1300} a={.45} a0={0} />
  </Scene>;
};

// ================================================================ 10. DARWIN'S TREE — an open notebook on a desk; on the right page a branching
// tree of life is drawn in ink, trunk first, then branch after branch, many tips; beside it a small tear-off calendar flips and cannot keep up,
// its pages fluttering. grow, lag. Light: a lamp from the upper left.
type Br = { a: Pt; b: Pt; c: Pt; d: N; tip: boolean };
const TREE: Br[] = (() => { const out: Br[] = []; let sd = 1;
  const go = (p: Pt, ang: N, L: N, d: N) => { sd++; const e: Pt = [p[0] + Math.cos(ang * D2R) * L, p[1] + Math.sin(ang * D2R) * L], bend = (rnd(sd * 3.1) - .5) * L * .3;
    const c: Pt = [(p[0] + e[0]) / 2 + Math.cos((ang + 90) * D2R) * bend, (p[1] + e[1]) / 2 + Math.sin((ang + 90) * D2R) * bend];
    const dead = d > 1 && rnd(sd * 7.7) < .14, tip = d >= 6 || dead; out.push({ a: p, b: e, c, d, tip });
    if (tip) return; const n = d < 2 ? 2 : rnd(sd * 1.9) > .7 ? 3 : 2, spread = 46 - d * 4;
    for (let i = 0; i < n; i++) go(e, ang - spread / 2 + spread * i / (n - 1) + (rnd(sd * 5 + i) - .5) * 12, L * (.74 + rnd(sd * 2 + i) * .1), d + 1); };
  go([0, 0], -90, 120, 0); return out; })();
const DarwinTree: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, grow = 0, lag = 0 }) => {
  const id = 'dt' + Math.round(x), TX = 1090, TY = 860, tk = 1.12, g = grow * 7.4;
  const lines = Array.from({ length: 13 }, (_, i) => i);
  return <Scene x={x} y={y} s={s} draw={draw}>
    <SR d={rect(-200, -200, 2320, 1480)} mat="wood" t={.55} draw={draw} hatch={0} />
    {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M-200 ${-120 + i * 64} C400 ${-128 + i * 66} 1200 ${-110 + i * 62} 2120 ${-122 + i * 65}`} stroke="#4F3020" strokeWidth={1} fill="none" opacity={.3} />)}
    {/* the notebook: shadow, board covers, two pages, the gutter */}
    <g transform="rotate(-3 820 540)">
      <rect x={250} y={150} width={1150} height={800} rx={14} fill="#1A0E08" opacity={.45} filter="url(#b8)" transform="translate(-20 26)" />
      <SR d={rr(240, 140, 1150, 790, 14)} mat="wood" t={.85} draw={draw} hatch={0} />
      <SR d={`M265 165 H815 Q820 170 820 180 V905 H265Z`} mat="paper" t={.25} draw={draw} hatch={0} />
      <SR d={`M820 180 Q820 170 825 165 H1365 V905 H820Z`} mat="paper" t={.2} draw={draw} hatch={0} />
      {lines.map(i => <g key={i}><path d={`M290 ${230 + i * 50} H790 M850 ${230 + i * 50} H1340`} stroke="#7FA8C4" strokeWidth={1} opacity={.35} /></g>)}
      {lines.slice(0, 11).map(i => <path key={i} d={sm(Array.from({ length: 12 }, (_, j) => [300 + j * 40 * (i === 10 ? .5 : 1), 224 + i * 50 + Math.sin(j * 2.3 + i) * 6 - (j % 3) * 3] as Pt), false)} stroke="#3A2418" strokeWidth={1.8} fill="none" opacity={.75} />)}
      <rect x={790} y={165} width={60} height={740} fill="url(#glowW)" opacity={0} />
      <path d="M820 170 V905" stroke={SEP} strokeWidth={2} /><rect x={780} y={165} width={40} height={740} fill={SEP} opacity={.12} /><rect x={820} y={165} width={30} height={740} fill={SEP} opacity={.08} />
      {/* the tree */}
      {TREE.map((b, i) => { const v = cl(g - b.d); if (v <= 0) return null; const P = (p: Pt) => `${f1(TX + p[0] * tk)} ${f1(TY + p[1] * tk)}`;
        return <g key={i}><path d={`M${P(b.a)} Q${P(b.c)} ${P(b.b)}`} stroke="#2B1D12" strokeWidth={Math.max(1.4, 5 - b.d * .7)} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${v} 1`} />
          {b.tip && v >= 1 && (b.d >= 6 ? <path d={`M${f1(TX + b.b[0] * tk - 7)} ${f1(TY + b.b[1] * tk)} h14`} stroke="#2B1D12" strokeWidth={2} /> : <circle cx={TX + b.b[0] * tk} cy={TY + b.b[1] * tk} r={2.4} fill="#2B1D12" />)}</g>; })}
      <path d={`M${TX - 60} ${TY + 4} H${TX + 60}`} stroke="#2B1D12" strokeWidth={2} opacity={cl(grow * 6)} />
    </g>
    {/* the dip pen and the inkwell */}
    <g><Floor x={1480} y={170} rx={60} ry={16} a={.5} /><SR d={ell(1470, 150, 52, 22)} mat="night" t={.8} draw={draw} hatch={0} /><SR d={rect(1418, 110, 104, 40)} mat="night" t={.85} draw={draw} hatch={0} /><SR d={ell(1470, 110, 52, 18)} mat="night" t={.6} draw={draw} hatch={0} /><ellipse cx={1470} cy={108} rx={20} ry={7} fill="#0A0604" /></g>
    <g transform="rotate(28 1000 960)"><rect x={760} y={950} width={330} height={14} rx={7} fill="#4F3020" stroke={SEP} strokeWidth={1.4} /><path d="M1090 950 L1150 957 L1090 964Z" fill="#B9C8D0" stroke={SEP} strokeWidth={1.4} /></g>
    {/* the little calendar that can't keep up */}
    <TearPad id={id + 'cal'} X={1470} Y={400} w={330} h={300} k={lag * 26} val={j => fmt(j * 50000)} sub="years" head="Years" draw={draw} fsz={52} tm={tm} flutter={1} />
    <Glow id={id + 'lp'} x={300} y={100} r={1300} ry={900} c="#FFC870" a={.4} blend="screen" />
    <Spot id={id + 'dk'} x={800} y={460} r0={360} r1={1300} a={.7} a0={0} />
  </Scene>;
};

// ================================================================ 11. SUN SCALES — a big brass beam balance on a table: in the left pan a small
// calendar with a Sun on it; in the right pan a chunk of rock beds and a little tree. fill: they land; tip −1..1: the beam (positive = right
// pan down); wobble: the beam and pans rock. Light: a spot from above.
const SunScales: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, fill = 0, tip = 0, wobble = 0 }) => {
  const id = 'sb' + Math.round(x), wb = wobble * Math.sin(tm * 3.2), ang = tip * 13 + wb * 3, l0 = stag(fill, 0, 2, .6), l1 = stag(fill, 1, 2, .6);
  const drop = (v: N) => (1 - outBack(v)) * -500;
  return <Scene x={x} y={y} s={s} draw={draw}>
    <Fill c="#3A2A20" />
    <SR d={rect(-200, 0, 2320, 860)} mat="wall" t={.55} draw={draw} hatch={0} />
    {[0, 1, 2, 3, 4, 5].map(i => <SR key={i} d={rect(-120 + i * 360, 640, 300, 200)} mat="wood" t={.7} draw={draw} hatch={0} />)}
    <SR d={rect(-200, 880, 2320, 400)} mat="cloth" t={.62} draw={draw} hatch={0} />
    <path d="M-200 880 H2120" stroke="#F3E7CC" strokeWidth={3} opacity={.4} />
    <Balance id={id} x={960} y={250} half={520} chain={330} ang={ang} draw={draw} base={880} panW={190} swing={wb * 4}
      left={(px, py) => l0 <= 0 ? null : <g transform={`translate(0 ${f1(drop(l0))}) translate(${px} ${py}) scale(1.45) translate(${-px} ${-py})`} opacity={cl(l0 * 4)}>
        <SR d={rect(px - 70, py - 150, 140, 140)} mat="paper" t={.15} draw={draw} hatch={0} /><rect x={px - 70} y={py - 150} width={140} height={28} fill="#A8432E" stroke={SEP} strokeWidth={1.4} />
        <SR d={rect(px - 80, py - 12, 160, 14)} mat="wood" t={.6} draw={draw} hatch={0} />
        <SunBall id={id + 'cs'} x={px} y={py - 64} r={32} corona={0} rays={1} tm={tm} /></g>}
      right={(px, py) => l1 <= 0 ? null : <g transform={`translate(0 ${f1(drop(l1))}) translate(${px} ${py}) scale(1.4) translate(${-px} ${-py})`} opacity={cl(l1 * 4)}>
        {[0, 1, 2, 3, 4].map(i => <SR key={i} d={pathOf([[px - 100 + i * 4, py - 6 - i * 26], [px + 50 - i * 6, py - 6 - i * 26], [px + 54 - i * 6, py - 32 - i * 26], [px - 96 + i * 4, py - 32 - i * 26]], true)} color={ROCK[i + 1]} draw={draw} sw={1.4} />)}
        <path d={`M${px + 90} ${py - 4} V${py - 90}`} stroke="#4F3020" strokeWidth={8} /><path d={`M${px + 90} ${py - 60} l-18 -20 M${px + 90} ${py - 74} l16 -18`} stroke="#4F3020" strokeWidth={4} />
        <path d={sm(blob(px + 90, py - 130, 46, 44, 10, .35, 21))} fill="#5F8A5A" stroke={SEP} strokeWidth={1.6} /><path d={sm(blob(px + 104, py - 146, 20, 16, 7, .4, 4))} fill="#A9C08A" opacity={.7} /></g>} />
    <Glow id={id + 'lt'} x={960} y={200} r={900} ry={700} c="#FFE2A8" a={.4} blend="screen" />
    <Spot id={id + 'dk'} x={960} y={460} r0={360} r1={1150} a={.75} a0={0} />
  </Scene>;
};

// ================================================================ 12. ATOM BALANCE (1920) — a laboratory bench by a tall bright window (right),
// shelves of bottles, a brass balance in the centre; the left third (x < 640) is kept clear for Aston. load: four small pale-blue balloons
// marked H drift onto the left pan, one larger balloon marked He onto the right. tie: the four are tied together into one bunch. bead: a tiny
// vermilion bead drops from the knot to the bench and glints. tip: the beam tips (left pan down). frac: "1/120" chalked on the slate.
// Light: daylight from the window, upper right; shadows fall left.
const Balloon: React.FC<{ id: string; x: N; y: N; r: N; t: string; col: string; tilt?: N }> = ({ id, x, y, r, t, col, tilt = 0 }) => <g transform={`rotate(${f1(tilt)} ${f1(x)} ${f1(y + r)})`}>
  <path d={`M${f1(x)} ${f1(y + r * 1.05)} l${f1(-r * .12)} ${f1(r * .2)} h${f1(r * .24)}Z`} fill={col} stroke={SEP} strokeWidth={1.2} />
  <ellipse cx={x} cy={y} rx={r * .9} ry={r * 1.06} fill={col} stroke={SEP} strokeWidth={1.8} />
  <ellipse cx={x + r * .32} cy={y - r * .42} rx={r * .2} ry={r * .3} fill="#FFFFFF" opacity={.65} transform={`rotate(25 ${f1(x + r * .32)} ${f1(y - r * .42)})`} />
  <path d={`M${f1(x - r * .7)} ${f1(y + r * .3)} Q${f1(x)} ${f1(y + r * 1)} ${f1(x + r * .7)} ${f1(y + r * .3)}`} stroke={SEP} strokeWidth={1} fill="none" opacity={.25} />
  <text x={x} y={y + r * .3} fontFamily="'IM Fell English', serif" fontSize={r * .85} textAnchor="middle" fill={SEP}>{t}</text>
</g>;
const AtomBalance: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, load = 0, tie = 0, bead = 0, tip = 0, frac = 0 }) => {
  const id = 'ab' + Math.round(x), BENCH = 770, PX = 1060, PY = 360, ang = -ease(tip) * 7 + Math.sin(tm * 2.4) * .3 * (1 - ease(tip)), T = ease(tie);
  const Hoff: Pt[] = [[-58, -56], [58, -56], [-28, -150], [30, -146]], HALF = 340, CH = 250, knot: Pt = [PX - HALF * Math.cos(ang * D2R), PY - HALF * Math.sin(ang * D2R) + CH - 8];
  const bp = ease(seg(bead, 0, .55)), bounce = bead > .55 ? Math.abs(Math.sin(seg(bead, .55, 1) * Math.PI * 2)) * 18 * (1 - seg(bead, .55, 1)) : 0;
  return <Scene x={x} y={y} s={s} draw={draw}>
    {/* wall, the tall window, shelves of bottles, a slate */}
    <Fill c="#C9C2A6" />
    <SR d={rect(-200, -200, 2320, 970)} mat="tundra" t={.25} draw={draw} hatch={0} />
    <defs><clipPath id={id + 'w'}><rect x={1480} y={70} width={380} height={680} /></clipPath></defs>
    <g clipPath={`url(#${id}w)`}><VGrad id={id + 'sk'} x={1480} y={70} w={380} h={680} stops={[[0, '#DCEAF0'], [1, '#FFF8E6']]} /><path d="M1480 600 Q1600 560 1700 590 T1860 570 V750 H1480Z" fill="#A9B97A" opacity={.6} /><path d="M1560 600 V470 h30 v-40 h40 v40 h30 v130Z" fill="#9AA6B0" opacity={.5} /></g>
    <SR d={`M1450 40 H1890 V770 H1450Z M1480 70 V750 H1860 V70Z`} mat="wood" t={.5} draw={draw} />
    {[1606, 1734].map(v => <SR key={v} d={rect(v, 70, 10, 680)} mat="wood" t={.5} draw={draw} hatch={0} />)}{[296, 522].map(v => <SR key={v} d={rect(1480, v, 380, 10)} mat="wood" t={.5} draw={draw} hatch={0} />)}
    {[180, 380].map(sy => <g key={sy}><SR d={rect(80, sy, 560, 16)} mat="wood" t={.6} draw={draw} hatch={0} />
      {Array.from({ length: 9 }, (_, i) => { const bx = 110 + i * 60, h = 50 + rnd(sy + i) * 50, c = ['#7FA8C4', '#A9C08A', '#C99A6A', '#EFE2C6', '#8C6E4A'][i % 5];
        return <g key={i}><path d={`M${bx} ${sy} V${sy - h + 16} Q${bx} ${sy - h} ${bx + 12} ${sy - h} V${sy - h - 12} h14 v12 Q${bx + 38} ${sy - h} ${bx + 38} ${sy - h + 16} V${sy}Z`} fill={c} stroke={SEP} strokeWidth={1.4} opacity={.9} />
          <rect x={bx + 6} y={sy - h * .55} width={26} height={16} fill="#FBF4E2" stroke={SEP} strokeWidth={.8} /></g>; })}</g>)}
    <g><SR d={rect(1110, 100, 300, 190)} mat="wood" t={.6} draw={draw} hatch={0} /><rect x={1124} y={114} width={272} height={162} fill="#2E3A34" stroke={SEP} strokeWidth={1.4} />
      <defs><clipPath id={id + 'ch'}><rect x={1124} y={114} width={272 * ease(frac)} height={162} /></clipPath></defs>
      <g clipPath={`url(#${id}ch)`}><text x={1260} y={226} fontFamily={AUR} fontSize={92} textAnchor="middle" fill="#F3F0E6" opacity={.92}>1/120</text></g></g>
    {/* the bench top and cupboards; a Bunsen burner and a flask by the window */}
    <SR d={rect(-200, BENCH, 2320, 30)} color="#2E2A26" draw={draw} hatch={0} />
    <path d={`M-200 ${BENCH + 2} H2120`} stroke="#E8EEF0" strokeWidth={2} opacity={.4} />
    <SR d={rect(-200, BENCH + 30, 2320, 500)} mat="wood" t={.62} draw={draw} hatch={0} />
    {[0, 1, 2, 3, 4, 5].map(i => <g key={i}><SR d={rect(-120 + i * 360, BENCH + 60, 300, 230)} mat="wood" t={.55} draw={draw} hatch={0} /><circle cx={30 + i * 360} cy={BENCH + 170} r={7} fill="#D4A846" stroke={SEP} strokeWidth={1.2} /></g>)}
    <g><Floor x={1600} y={BENCH} rx={60} ry={8} a={.5} /><path d={`M1560 ${BENCH} L1580 ${BENCH - 30} H1620 L1640 ${BENCH}Z`} fill="#3A3632" stroke={SEP} strokeWidth={1.4} /><rect x={1590} y={BENCH - 120} width={20} height={92} fill="#8A8278" stroke={SEP} strokeWidth={1.4} /><path d={`M1586 ${BENCH - 70} q-30 4 -60 30`} stroke="#6A4430" strokeWidth={6} fill="none" /></g>
    <g><Floor x={1350} y={BENCH} rx={60} ry={8} a={.5} /><path d={`M1330 ${BENCH - 130} V${BENCH - 80} L1290 ${BENCH - 6} Q1350 ${BENCH + 4} 1410 ${BENCH - 6} L1370 ${BENCH - 80} V${BENCH - 130}Z`} fill="#DCEAF0" fillOpacity={.6} stroke={SEP} strokeWidth={1.6} /><path d={`M1300 ${BENCH - 24} Q1350 ${BENCH - 14} 1400 ${BENCH - 24} L1404 ${BENCH - 8} Q1350 ${BENCH + 2} 1296 ${BENCH - 8}Z`} fill="#A9C08A" opacity={.8} /></g>
    {/* the balance with its loads */}
    <path d={`M${PX - 140} ${BENCH} L${PX - 380} ${BENCH + 14} L${PX - 380} ${BENCH + 4}`} fill={SEP} opacity={.25} filter="url(#b2s)" />
    <Balance id={id} x={PX} y={PY} half={HALF} chain={CH} ang={ang} draw={draw} base={BENCH} panW={130} k={.9}
      left={(px, py) => { const pts = Hoff.map((o, i) => { const v = ease(stag(load, i, 5, .45)), bx = px + o[0] * (1 - .32 * T), by = py + o[1] * (1 - .2 * T) - 4;
          return { v, x: lerp(px - 520 + i * 40, bx, v) + Math.sin(tm * 2 + i) * 6 * (1 - v), y: lerp(py - 520, by, v) - Math.sin(v * Math.PI) * 60, i }; });
        return <g>{T > 0 && <g opacity={T}>{pts.map(p => <path key={p.i} d={`M${f1(p.x)} ${f1(p.y + 56)} Q${f1((p.x + px) / 2)} ${f1(py)} ${px} ${py - 8}`} stroke="#8C7A5A" strokeWidth={2} fill="none" />)}
          <path d={`M${px} ${py - 8} c-18 -12 -24 6 0 0 c18 -12 24 6 0 0`} stroke="#8C7A5A" strokeWidth={2.4} fill="none" /></g>}
          {pts.map(p => p.v > 0 ? <Balloon key={p.i} id={id + 'h' + p.i} x={p.x} y={p.y} r={50} t="H" col="#BFD8EA" tilt={(p.i % 2 ? 8 : -8) * (1 - T)} /> : null)}
          {bead <= 0 && T > .5 && <circle cx={px} cy={py - 8} r={8} fill={VERM} stroke={SEP} strokeWidth={1} />}</g>; }}
      right={(px, py) => { const v = ease(stag(load, 4, 5, .45)); return v > 0 ? <Balloon id={id + 'he'} x={lerp(px + 380, px, v)} y={lerp(py - 560, py - 84, v) - Math.sin(v * Math.PI) * 70} r={82} t="He" col="#F2DFA8" /> : null; }} />
    {/* the bead: drops from the knot to the bench, bounces, glints */}
    {bead > 0 && (() => { const bx = lerp(knot[0], knot[0] + 60, bp), by = lerp(knot[1], BENCH - 7, bp * bp) - bounce, gl = seg(bead, .6, 1);
      return <g><Floor x={bx} y={BENCH} rx={10 * bp} ry={3} a={.5 * bp} /><circle cx={bx} cy={by} r={10} fill={VERM} stroke={SEP} strokeWidth={1.2} /><circle cx={bx + 2.5} cy={by - 2.5} r={2.4} fill="#FFFFFF" />
        {gl > 0 && <g opacity={Math.sin(gl * Math.PI) * .9 + .1}><Glow id={id + 'bg'} x={bx} y={by} r={60} c="#FFE2A8" a={.8} /><path d={`M${bx - 34} ${by} H${bx + 34} M${bx} ${by - 34} V${by + 34}`} stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" /><path d={`M${bx - 14} ${by - 14} L${bx + 14} ${by + 14} M${bx + 14} ${by - 14} L${bx - 14} ${by + 14}`} stroke="#FFFFFF" strokeWidth={1.4} /></g>}</g>; })()}
    {/* daylight from the window */}
    <path d={`M1480 70 L1860 70 L1100 1100 L300 1100Z`} fill="#FFF8E6" opacity={.12} style={{ mixBlendMode: 'screen' }} />
    <Spot id={id + 'dk'} x={1400} y={400} r0={400} r1={1500} a={.5} a0={0} />
  </Scene>;
};

// ================================================================ 13. SPARK FORMULA — a dark warm ground, a vermilion bead in the centre. write:
// sparks swirl out of it and write E = mc² in glowing spark-light; swell: the c² swells and a long glowing figure rolls across,
// "300 000 km/s × 300 000 km/s"; blaze: the bead becomes a blinding blaze that floods the frame. Light: the bead, then the blaze.
const SparkFormula: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, write = 0, swell = 0, blaze = 0 }) => {
  const id = 'sf' + Math.round(x), B: Pt = [960, 720], w = ease(write), X0 = 470, X1 = 1380, head = lerp(X0, X1, w), sw = 1 + .38 * ease(swell), bz = ease(blaze);
  const FE = "'IM Fell English', serif", glowT = (t: string, tx: N, ty: N, fs: N, anchor: string) => <g>
    <text x={tx} y={ty} fontFamily={FE} fontSize={fs} textAnchor={anchor} fill="none" stroke="#FFB24A" strokeWidth={14} opacity={.45} filter="url(#b8)">{t}</text>
    <text x={tx} y={ty} fontFamily={FE} fontSize={fs} textAnchor={anchor} fill="#FFE9A8" stroke="#FF9A3A" strokeWidth={2} />
    <text x={tx} y={ty} fontFamily={FE} fontSize={fs} textAnchor={anchor} fill="#FFF8E6">{t}</text></g>;
  const roll = ease(seg(swell, .25, 1));
  return <Scene x={x} y={y} s={s} draw={draw}>
    <Fill c="#160C07" />
    <Glow id={id + 'bg'} x={960} y={520} r={1000} c="#4A2412" a={.8} />
    <Stipple x={-100} y={-100} w={2120} h={1280} n={1400} seed={id} col="#000000" a={.35} />
    {/* the formula, revealed left to right by the sparks */}
    <defs><clipPath id={id + 'wr'}><rect x={X0 - 40} y={0} width={head - X0 + 40} height={1080} /></clipPath></defs>
    <g clipPath={`url(#${id}wr)`}>
      {glowT('E = m', 1010, 470, 230, 'end')}
      <g transform={`translate(1100 400) scale(${f1(sw * 100) / 100}) translate(-1100 -400)`}>{glowT('c', 1030, 470, 230, 'start')}{glowT('2', 1128, 360, 130, 'start')}</g>
    </g>
    {/* sparks flying from the bead to the writing head, a few left glittering on the letters */}
    {write > 0 && write < 1 && Array.from({ length: 60 }, (_, i) => { const p = (tm * .9 + rnd(i * 3.1)) % 1, ty = 300 + rnd(i * 1.7) * 200, cx2 = lerp(B[0], head, .5) + Math.sin(i) * 260, cy2 = lerp(B[1], ty, .5) + 160;
      const u = p, px = (1 - u) * (1 - u) * B[0] + 2 * (1 - u) * u * cx2 + u * u * head, py = (1 - u) * (1 - u) * B[1] + 2 * (1 - u) * u * cy2 + u * u * ty;
      return <circle key={i} cx={px} cy={py} r={2 + rnd(i) * 2.5} fill="#FFE2A0" opacity={Math.sin(write * Math.PI) * (1 - u * .4)} />; })}
    {w > 0 && Array.from({ length: 30 }, (_, i) => { const sx = X0 + rnd(i * 7.3) * (head - X0), sy = 330 + rnd(i * 2.9) * 150, tw = .5 + .5 * Math.sin(tm * 6 + i * 2); return <Star key={i} x={sx} y={sy} r={1.6} a={tw * .9} rays={tw} col="#FFF4D2" />; })}
    {/* the speed of light, squared, rolling in */}
    {swell > 0 && <g opacity={cl(swell * 4)} transform={`translate(${f1(lerp(1400, 0, roll))} 0)`}>
      <text x={960} y={620} fontFamily={SE} fontSize={62} textAnchor="middle" fill="none" stroke="#FFB24A" strokeWidth={10} opacity={.4} filter="url(#b2s)">300 000 km/s × 300 000 km/s</text>
      <text x={960} y={620} fontFamily={SE} fontSize={62} textAnchor="middle" fill="#FFE9A8">300 000 km/s × 300 000 km/s</text></g>}
    {/* the bead and its blaze */}
    <Glow id={id + 'bd'} x={B[0]} y={B[1]} r={70 + bz * 1800} c="#FFE2A8" a={.6 + bz * .4} mid={.2 + bz * .3} />
    {bz > 0 && Array.from({ length: 24 }, (_, i) => { const a = i * 15 + tm * 6, p = rot([40, 0], a), q = rot([40 + bz * 1500, 0], a); return <path key={i} d={`M${f1(B[0] + p[0])} ${f1(B[1] + p[1])} L${f1(B[0] + q[0])} ${f1(B[1] + q[1])}`} stroke="#FFF8E6" strokeWidth={6 + bz * 30} opacity={bz * .35} strokeLinecap="round" />; })}
    <circle cx={B[0]} cy={B[1]} r={14 + bz * 40} fill={mix(VERM, '#FFFFFF', bz)} stroke={SEP} strokeWidth={1.4 * (1 - bz)} /><circle cx={B[0] + 4} cy={B[1] - 4} r={4} fill="#FFFFFF" opacity={.8} />
    <Fill c="#FFF8E6" a={Math.pow(bz, 2.2) * .95} />
  </Scene>;
};

// ================================================================ 14. CARDIFF HALL (1920) — a lecture hall: tall arched windows at the back, a
// blackboard, a lectern right of centre (clear floor for Eddington on the platform just left of the lectern, x ≈ 820–1100), a coffin on
// trestles beside the lectern under a sheet, rows of audience heads (backs) in the foreground. board: "4 H → He" chalks itself. sheet: the
// sheet is pulled off — inside lies a small grey shrunken Sun. lid: the lid swings shut with a thud. clap: the heads turn and shift.
// Light: daylight from the tall windows behind (backlight, shafts with dust), rim light on the heads.
const HEADS = Array.from({ length: 3 }, (_, r) => Array.from({ length: [9, 11, 13][r] }, (_, i) => ({ x: (i + (r % 2) * .5) * [230, 190, 160][r] - [60, 40, 20][r] + (rnd(r * 17 + i) - .5) * 40, r: [86, 62, 46][r], y: [1050, 935, 852][r],
  hair: ['#2B1D12', '#5A3A22', '#8A8278', '#3A2418', '#C9C2A6', '#1A120B'][Math.floor(rnd(r * 31 + i * 3) * 6)], bald: rnd(r * 7 + i * 5) > .85, coat: ['#2A2624', '#3A3632', '#4A3A30', '#2B3B56'][Math.floor(rnd(r * 13 + i) * 4)], ph: rnd(r * 3 + i * 7) })));
const CardiffHall: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, board = 0, sheet = 0, lid = 0, clap = 0 }) => {
  const id = 'ch' + Math.round(x), CFX = 1380, CFY = 600, CL = 420, sh = ease(sheet), th = lerp(98, 0, ease(seg(lid, 0, .8))), thud = seg(lid, .78, 1);
  const wid = (u: N) => u < .28 ? lerp(56, 92, u / .28) : lerp(92, 50, (u - .28) / .72);
  const plan: Pt[] = [0, .28, 1, 1, .28, 0].map((u, i) => [u * CL, (i < 3 ? -1 : 1) * wid(u)] as Pt);
  const pj = (u: N, v: N, z = 0): Pt => [CFX + u + v * .3, CFY + v * .32 - z];
  const box = plan.map(([u, v]) => pj(u, v)), boxB = plan.map(([u, v]) => pj(u, v, -90));
  const lidP = plan.map(([u, v]) => { const hv = -92, d = v - hv, c = Math.cos(th * D2R), sn = Math.sin(th * D2R); return pj(u, hv + d * c, d * sn + 4); });
  const shake = thud > 0 && thud < 1 ? Math.sin(thud * 30) * 4 * (1 - thud) : 0;
  return <Scene x={x} y={y} s={s} draw={draw}>
    {/* back wall with tall arched windows, the blackboard, the platform */}
    <Fill c="#B9A27A" />
    <SR d={rect(-200, -200, 2320, 980)} mat="stone" t={.42} draw={draw} hatch={0} />
    {[[200, 140], [1060, 140], [1690, 140]].map(([wx, ww], i) => <g key={i}>
      <path d={`M${wx - ww / 2 - 20} 640 V230 A${ww / 2 + 20} ${ww / 2 + 20} 0 0 1 ${wx + ww / 2 + 20} 230 V640Z`} fill="#8C6E4A" stroke={SEP} strokeWidth={2} />
      <path d={`M${wx - ww / 2} 620 V230 A${ww / 2} ${ww / 2} 0 0 1 ${wx + ww / 2} 230 V620Z`} fill="#FFF6DC" stroke={SEP} strokeWidth={1.6} />
      <Glow id={id + 'wg' + i} x={wx} y={360} r={ww * 1.6} ry={300} c="#FFF4D2" a={.7} />
      <path d={`M${wx} 160 V620 M${wx - ww / 2} 330 H${wx + ww / 2} M${wx - ww / 2} 480 H${wx + ww / 2}`} stroke="#6A4430" strokeWidth={5} />
      <path d={`M${wx - ww / 2} 230 A${ww / 2} ${ww / 2} 0 0 1 ${wx + ww / 2} 230`} stroke="#6A4430" strokeWidth={5} fill="none" /></g>)}
    <g><SR d={rect(350, 290, 560, 300)} mat="wood" t={.6} draw={draw} hatch={0} /><rect x={366} y={306} width={528} height={268} fill="#2E3A34" stroke={SEP} strokeWidth={1.4} />
      <rect x={366} y={306} width={528} height={268} fill="#FFFFFF" opacity={.05} />
      <defs><clipPath id={id + 'bd'}><rect x={366} y={306} width={528 * ease(board)} height={268} /></clipPath></defs>
      <g clipPath={`url(#${id}bd)`}><text x={630} y={476} fontFamily="'IM Fell DW Pica', serif" fontStyle="italic" fontSize={124} textAnchor="middle" fill="#F3F0E6" opacity={.9} stroke="#F3F0E6" strokeWidth={1.2}>4 H → He</text></g>
      <SR d={rect(360, 590, 540, 12)} mat="wood" t={.5} draw={draw} hatch={0} /></g>
    {/* light shafts from the windows */}
    {[200, 1060, 1690].map((wx, i) => <path key={i} d={`M${wx - 60} 260 L${wx + 70} 260 L${wx + 360} 1000 L${wx + 120} 1000Z`} fill="#FFF4D2" opacity={.14} style={{ mixBlendMode: 'screen' }} />)}
    {Array.from({ length: 40 }, (_, i) => { const wx = [200, 1060, 1690][i % 3], p = (rnd(i * 3.3) + tm * .02) % 1; return <circle key={i} cx={wx + p * 260 + rnd(i) * 80} cy={300 + p * 600} r={1.6} fill="#FFF4D2" opacity={.6} />; })}
    <SR d={rect(-200, 700, 2320, 90)} mat="wood" t={.5} draw={draw} hatch={0} />
    <SR d={rect(-200, 780, 2320, 40)} mat="wood" t={.75} draw={draw} hatch={0} />
    {/* the lectern */}
    <Floor x={1190} y={790} rx={110} ry={12} a={.5} />
    <SR d={`M1150 790 L1160 560 H1220 L1230 790Z`} mat="wood" t={.65} draw={draw} />
    <SR d={`M1100 560 L1124 500 H1260 L1280 560Z`} mat="wood" t={.5} draw={draw} />
    <path d="M1130 548 L1146 506 H1238 L1250 548Z" fill="#FBF4E2" stroke={SEP} strokeWidth={1} /><path d="M1150 520 h80 M1146 532 h86" stroke={SEP} strokeWidth={1} opacity={.4} />
    {/* the coffin on its trestles */}
    <Floor x={CFX + 220} y={792} rx={300} ry={14} a={.55} />
    {[CFX + 60, CFX + 340].map((tx, i) => <g key={i}><path d={`M${tx - 40} 790 L${tx} ${CFY + 60} L${tx + 40} 790 M${tx - 20} 790 L${tx + 10} ${CFY + 70}`} stroke="#4F3020" strokeWidth={10} strokeLinecap="round" /><path d={`M${tx - 40} ${CFY + 66} H${tx + 60}`} stroke="#4F3020" strokeWidth={10} /></g>)}
    <g transform={`translate(0 ${f1(shake)})`}>
      {/* the side of the box, its open mouth with the pillow and the shrunken grey Sun */}
      <SR d={pathOf([box[5], box[0], boxB[0], boxB[5]], true)} mat="wood" t={.82} draw={draw} />
      <SR d={pathOf([box[3], box[4], box[5], boxB[5], boxB[4], boxB[3]], true)} mat="wood" t={.66} draw={draw} />
      {[.3, .7].map(u => <circle key={u} cx={pj(u * CL, wid(u))[0]} cy={pj(u * CL, wid(u))[1] + 44} r={7} fill="#D4A846" stroke={SEP} strokeWidth={1.2} />)}
      <path d={pathOf(box, true)} fill="#2B1D12" stroke={SEP} strokeWidth={2} />
      <path d={pathOf(plan.map(([u, v]) => pj(u * .94 + 12, v * .84, -8)), true)} fill="#E6DCC6" opacity={.9} />
      <ellipse cx={pj(40, 0)[0]} cy={pj(40, 0)[1] - 6} rx={34} ry={14} fill="#FBF4E2" stroke={SEP} strokeWidth={1} />
      <g opacity={cl((th - 20) / 40)}><SunBall id={id + 'gs'} x={pj(210, 0)[0]} y={pj(210, 0)[1] - 26} r={40} dim={.85} corona={.6} tm={tm} /></g>
      {/* the lid, hinged on the back edge */}
      <SR d={pathOf(lidP, true)} mat="wood" t={.58} draw={draw} />
      <path d={pathOf(plan.map(([u, v]) => { const hv = -92, d = (v - hv) * .7 + hv * 0, c = Math.cos(th * D2R), sn = Math.sin(th * D2R); return pj(u * .8 + 40, hv + (d + 20) * c * .9, (d + 20) * sn * .9 + 6); }), true)} fill="none" stroke="#2B1D12" strokeWidth={1.6} opacity={.5} />
      {/* the sheet, pulled off to the right */}
      {sh < 1 && <g opacity={1 - Math.pow(sh, 3)} transform={`translate(${f1(sh * 560)} ${f1(-sh * 260 + sh * sh * 200)}) rotate(${f1(sh * 24)} ${CFX + 210} ${CFY})`}>
        <path d={`M${CFX - 30} ${CFY + 110 - sh * 40} C${CFX - 40} ${CFY + 40} ${CFX - 30} ${CFY - 40} ${CFX + 10} ${CFY - 34} C${CFX + 150} ${CFY - 50 - sh * 40} ${CFX + 300} ${CFY - 46} ${CFX + 470} ${CFY - 14} C${CFX + 500} ${CFY + 40} ${CFX + 510} ${CFY + 90} ${CFX + 500} ${CFY + 130} Q${CFX + 380} ${CFY + 110} ${CFX + 260} ${CFY + 124} Q${CFX + 120} ${CFY + 104} ${CFX - 30} ${CFY + 110 - sh * 40}Z`} fill="#F7F1E2" stroke={SEP} strokeWidth={2} />
        {[60, 160, 280, 400].map((u, i) => <path key={i} d={`M${CFX + u} ${CFY - 30} q${10 + sh * 30} 60 ${-4} ${130 - i * 6}`} stroke="#C9B48A" strokeWidth={2.4} fill="none" />)}
        <path d={`M${CFX + 20} ${CFY - 30} C${CFX + 150} ${CFY - 46} ${CFX + 300} ${CFY - 42} ${CFX + 460} ${CFY - 12}`} stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={.7} /></g>}
      {thud > 0 && thud < 1 && Array.from({ length: 10 }, (_, i) => { const a = i < 5 ? 180 + i * 10 : -i * 6, sx = i < 5 ? CFX - 20 : CFX + CL + 40, p = rot([20 + thud * 80, 0], a);
        return <circle key={i} cx={sx + p[0]} cy={CFY + 10 + p[1] * .5} r={8 + thud * 16} fill="#E6DCC6" opacity={(1 - thud) * .6} filter="url(#b2s)" />; })}
    </g>
    {/* the audience (backs of heads, shoulders), back rows first; rim light from the windows */}
    {[2, 1, 0].map(r => <g key={r}>{HEADS[r].map((h, i) => { const ph = stag(clap, (i + r * 3) % 13, 13, .5), turn = Math.sin(ph * Math.PI) * (h.ph > .5 ? 1 : -1), dx = turn * h.r * .25 + Math.sin(tm * 1.3 + i) * 1.5, R = h.r;
      return <g key={i} transform={`translate(${f1(h.x + dx)} ${h.y})`}>
        <path d={`M${-R * 2} ${R * 2.2} C${-R * 2} ${R * .9} ${-R * 1.2} ${R * .62} 0 ${R * .62} C${R * 1.2} ${R * .62} ${R * 2} ${R * .9} ${R * 2} ${R * 2.2}Z`} fill={h.coat} stroke={SEP} strokeWidth={1.6} />
        <path d={`M${-R * .4} ${R * .64} Q0 ${R * .82} ${R * .4} ${R * .64} L${R * .34} ${R * .5} H${-R * .34}Z`} fill="#F3E7CC" stroke={SEP} strokeWidth={1} />
        <g transform={`rotate(${f1(turn * 14)} 0 ${R * .5})`}>
          <rect x={-R * .32} y={R * .1} width={R * .64} height={R * .5} fill="#C78F66" stroke={SEP} strokeWidth={1} />
          {[-1, 1].map(sd => <ellipse key={sd} cx={sd * R * .78 - turn * R * .15} cy={-R * .02} rx={R * .13} ry={R * .22} fill="#D9A07A" stroke={SEP} strokeWidth={1} />)}
          {Math.abs(turn) > .15 && <path d={`M${turn * R * .7} ${-R * .2} q${turn * R * .26} ${R * .2} 0 ${R * .4}`} fill="#D9A07A" stroke={SEP} strokeWidth={1} opacity={cl(Math.abs(turn) * 2)} />}
          <ellipse cx={0} cy={-R * .1} rx={R * .78} ry={R * .9} fill={h.bald ? '#D9A07A' : h.hair} stroke={SEP} strokeWidth={1.6} />
          {h.bald && <ellipse cx={0} cy={R * .4} rx={R * .74} ry={R * .3} fill="#8A8278" />}
          <path d={`M${R * .5} ${-R * .8} Q${R * .84} ${-R * .3} ${R * .6} ${R * .4}`} stroke="#FFF4D2" strokeWidth={R * .07} fill="none" opacity={.6} />
        </g>
      </g>; })}</g>)}
    <Spot id={id + 'dk'} x={900} y={420} r0={400} r1={1300} a={.5} a0={0} />
  </Scene>;
};

export const ART_A: Record<string, React.FC<any>> = { MatchCandle, ClueTags, SunCutaway, CoalSun, VictorianStudy, BikePump, ShrinkingSun, CalendarPad, CliffLayers, DarwinTree, SunScales, AtomBalance, SparkFormula, CardiffHall };
export const SAMPLE_A: Record<string, object> = {
  MatchCandle: { strike: 1, matchOut: .3, candle: 1, melt: .25, dawn: .45, sunUp: .5, stubs: .4, dark: 0, q: 0, tm: 1.2 },
  ClueTags: { n: 1, swing: .6, ticked: .6, tm: 1.3 },
  SunCutaway: { far: 0, peel: .8, close: 0, tm: 1 },
  CoalSun: { grip: 1, coal: 1, flames: .8, earth: 1, age: .2, release: 0, layers: .5, tm: 1.4 },
  VictorianStudy: { crumble: .62, lamp: .7, tm: 1 },
  BikePump: { pump: .6, heat: .6, tm: 1 },
  ShrinkingSun: { squeeze: .6, tape: 1, notch: .5, tm: 1 },
  CalendarPad: { flip: .62, crack: 0, tm: 1 },
  CliffLayers: { hammer: .45, stack: .85, glow: .3, tm: 1 },
  DarwinTree: { grow: .75, lag: .5, tm: 1 },
  SunScales: { fill: 1, tip: .5, wobble: .4, tm: 1 },
  AtomBalance: { load: 1, tie: 1, bead: .8, tip: .6, frac: 1, tm: 1 },
  SparkFormula: { write: .8, swell: .5, blaze: 0, tm: 1 },
  CardiffHall: { board: 1, sheet: .55, lid: 0, clap: .5, tm: 1 },
};
