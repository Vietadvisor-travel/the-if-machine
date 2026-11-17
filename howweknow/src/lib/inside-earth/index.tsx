// inside-earth — "What is inside the Earth?" — every drawing made for this film (owner, 15 Nov 2026), from Muse's references:
// R-04 Kola section (museum, CC0) · R-05 + D-03 Cavendish's apparatus (plate XXIII) · R-02-x1 the Wiechert seismograph engraving ·
// D-01-x2/x3/x4 Lehmann's diagrams and the Buller records · P-08 Cavendish (costume) · R-01-x1 Lehmann 1932 (costume) · P-09 Assam 1897 ·
// P-10 Murchison 1929 · X-01 PREM / IASP91 (true radii) · X-02 depths. Style core only (Region / Ink / Line / Stipple).
import React, { useMemo } from 'react';
import { Region, Ink, Line, Stipple, SEP, PIG, tone, mix, ell, poly, seq } from '../../paint/paint';
import { Person } from '../../paint/people';

type N = number; type Pt = [N, N];
const f1 = (v: N) => +v.toFixed(1);
const P = (pts: Pt[]) => poly(pts);
const D = Math.PI / 180;
const cl = (x: N, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const rect = (x: N, y: N, w: N, h: N) => P([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
const pathOf = (pts: Pt[], close = false) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (close ? 'Z' : '');

// form shading for this film's drawings: the hatching of the style laid only on the SHADE side (light from the upper right), fading across the
// form — so every object reads as engraved and lit, not flat. SR = Region + this shade (skipped on paper, glass, ice, white heat)
const Shade: React.FC<{ d: string; draw?: N; ang?: N; a?: N; lvl?: N }> = ({ d, draw = 1, ang = 45, a = .55, lvl = 2 }) => {
  const p = cl((draw - .6) / .4); if (p <= 0) return null; const A = (((Math.round(ang / 15) * 15) % 180) + 180) % 180;
  return <g><defs><clipPath id="llA" clipPathUnits="objectBoundingBox"><path d="M0 .2 L.8 1 L0 1Z" /></clipPath><clipPath id="llB" clipPathUnits="objectBoundingBox"><path d="M0 .52 L.48 1 L0 1Z" /></clipPath></defs>
    <path d={d} fill={`url(#h1_${A})`} clipPath="url(#llA)" opacity={a * p} /><path d={d} fill={`url(#h${Math.max(2, lvl)}_${(A + 90) % 180})`} clipPath="url(#llB)" opacity={a * .8 * p} /></g>;
};
const NOSHADE = new Set(['paper', 'ice', 'inner', 'water', 'gold']);
const SR: React.FC<any> = (pr) => <><Region {...pr} />{pr.hatch !== 0 && !NOSHADE.has(pr.mat) && (pr.a ?? 1) >= 1 && <Shade d={pr.d} draw={pr.draw} ang={(pr.ang ?? 0) + 60} a={.5} lvl={(pr.t ?? .3) > .6 ? 3 : 2} />}</>;
// true radii (km, PREM / X-02)
export const RE = 6371, R_CMB = 3480, R_ICB = 1221, R_MOHO = 6336, R_660 = 5711;

// ---------------------------------------------------------------- an annulus (or part of it, when the planet is far larger than the frame)
// cx, cy, r0 < r1 in px. Huge circles are drawn only around the top (the camera looks at the north point during the true-scale pull).
const band = (cx: N, cy: N, r0: N, r1: N, a0 = -Math.PI, a1 = Math.PI) => {
  const big = r1 > 2400, hw = big ? Math.min(Math.PI, Math.asin(Math.min(1, 2600 / r1)) * 1.4) : Math.PI;
  const s = big ? -Math.PI / 2 - hw : a0, e = big ? -Math.PI / 2 + hw : a1, n = big ? 160 : 180;
  if (!big && a0 === -Math.PI && a1 === Math.PI) return r0 > 0 ? `${ell(cx, cy, r1, r1)} ${ellR(cx, cy, r0)}` : ell(cx, cy, r1, r1);
  const o: Pt[] = [], ii: Pt[] = [];
  for (let i = 0; i <= n; i++) { const a = s + (e - s) * i / n; o.push([cx + Math.cos(a) * r1, cy + Math.sin(a) * r1]); ii.push([cx + Math.cos(a) * r0, cy + Math.sin(a) * r0]); }
  return pathOf([...o, ...ii.reverse()], true);
};
const ellR = (x: N, y: N, r: N) => `M${x - r} ${y} A${r} ${r} 0 1 1 ${x + r} ${y} A${r} ${r} 0 1 1 ${x - r} ${y}Z`;   // reversed winding = a hole
const circ = (cx: N, cy: N, r: N) => r > 2400 ? band(cx, cy, Math.max(0, r - 4000), r) : ell(cx, cy, r, r);

// ================================================================ HOOK — the Kola Superdeep Borehole (SG-3), polar night
// the tundra of the Kola peninsula under snow: low glacial hills, snow ridges (sastrugi), a line of wooden poles carrying the power line
const KolaTundra: React.FC<{ y: N; draw?: N; seed?: string }> = ({ y, draw = 1, seed = 'kt' }) => {
  const hills = useMemo(() => [0, 1, 2].map(k => { const q = seq(seed + k), o = q() * 6; let d = `M-40 1120 L-40 ${y - 40 + k * 46}`; for (let x = -40; x <= 1960; x += 30) d += ` L${x} ${f1(y - 40 + k * 46 - (Math.sin(x / (420 - k * 90) + o) * (34 - k * 9) + Math.sin(x / 130 + o * 3) * 6 + q() * 4))}`; return d + ' L1960 1120Z'; }), [y, seed]);
  return <g>
    {hills.map((d, k) => <SR key={k} d={d} mat="ice" t={.28 + k * .12} ang={k % 2 ? 4 : -4} draw={draw} sw={1 - k * .1} hatchA={.25} hatch={k === 2 ? 0 : 1} />)}
    {Array.from({ length: 16 }, (_, i) => { const q = seq(seed + 's' + i), x = q() * 1920, yy = y + 60 + q() * 330, w = 60 + q() * 160; return <Line key={i} d={`M${f1(x)} ${f1(yy)} q${f1(w * .5)} ${f1(-4 - q() * 5)} ${f1(w)} 0`} w={.9} a={.45 * draw} />; })}
    {Array.from({ length: 6 }, (_, i) => { const x = 120 + i * 150, b = y + 6 - i * 3, h = 70 - i * 8; return <g key={'p' + i}><SR d={rect(x - 2.5, b - h, 5, h)} mat="wood" t={.7} ang={90} draw={draw} sw={.8} rim={false} />
      <Line d={`M${x - 12} ${b - h + 8} H${x + 12}`} w={1.4} a={draw} />{i < 5 && <Line d={`M${x + 10} ${b - h + 8} Q${x + 85} ${b - h + 28} ${x + 160} ${b - h + 11}`} w={.7} a={.7 * draw} />}</g>; })}
    <Stipple x={0} y={y + 20} w={1920} h={420} n={500} seed={seed + 'st'} col={PIG.sky[2]} r0={.4} a={.25 * draw} />
  </g>;
};
// the SG-3 drilling tower: a tall tapering derrick clad in panels (the building wrapped round it against the Arctic cold), a long
// lit drilling hall at its foot, pipe racks, a boiler house with a chimney and steam. Windows warm. Light: the hall lamps.
const KolaRig: React.FC<{ x: N; y: N; s?: N; draw?: N; lit?: N; flicker?: N }> = ({ x, y, s = 1, draw = 1, lit = 1, flicker = 0 }) => {
  const k = s, T = (dx: N, dy: N): Pt => [x + dx * k, y + dy * k], tw = 70, th = 520;
  const tower = P([T(-tw, -150), T(tw, -150), T(tw * .42, -th), T(-tw * .42, -th)]);
  const steam = Array.from({ length: 5 }, (_, i) => { const p = (flicker * .12 + i / 5) % 1; return <ellipse key={i} cx={T(232 + p * 50, -250 - p * 180)[0]} cy={T(232, -250 - p * 180)[1]} rx={(18 + p * 50) * k} ry={(12 + p * 30) * k} fill="#FBF6EA" opacity={(1 - p) * .55 * draw} filter="url(#wc)" />; });
  return <g>
    <ellipse cx={x} cy={y - 260 * k} rx={420 * k} ry={300 * k} fill="url(#glowW)" opacity={.22 * lit * draw} />
    {steam}
    {/* tower: clad trapezoid, horizontal panel joints, a vertical seam, the crown block and the lightning mast */}
    <SR d={tower} mat="stone" t={.5} ang={90} draw={draw} sw={1.6 * k} />
    <SR d={P([T(tw * .1, -150), T(tw, -150), T(tw * .42, -th), T(tw * .05, -th)])} mat="stone" t={.78} ang={75} draw={draw} sw={.8 * k} hatchA={.55} />
    {Array.from({ length: 13 }, (_, i) => { const yy = -170 - i * 27, wv = tw - (tw - tw * .42) * ((-yy - 150) / (th - 150)); return <Line key={i} d={`M${T(-wv, yy).join(' ')} L${T(wv, yy).join(' ')}`} w={.8 * k} a={.6 * draw} />; })}
    {Array.from({ length: 4 }, (_, i) => { const y0 = -th + 30 + i * 28, wv = tw * .42 + (tw - tw * .42) * ((th - 30 - i * 28 - 150) / (th - 150)) * 0; return <Line key={'x' + i} d={`M${T(-wv, y0).join(' ')} L${T(wv, y0 + 28).join(' ')} M${T(wv, y0).join(' ')} L${T(-wv, y0 + 28).join(' ')}`} w={.7 * k} a={.55 * draw} />; })}
    {[0, 1, 2, 3].map(i => <path key={'w' + i} d={rect(...T(-16, -230 - i * 70), 22 * k, 14 * k)} fill={lit > 0 ? '#F6CF7A' : PIG.night[1]} opacity={draw * (.5 + .5 * lit)} stroke={SEP} strokeWidth={.8} />)}
    <SR d={P([T(-tw * .5, -th), T(tw * .5, -th), T(tw * .4, -th - 34), T(-tw * .4, -th - 34)])} mat="red" t={.6} ang={0} draw={draw} sw={1.2 * k} />
    <Line d={`M${T(0, -th - 34).join(' ')} V${T(0, -th - 110)[1]}`} w={2 * k} a={draw} />
    <circle cx={T(0, -th - 112)[0]} cy={T(0, -th - 112)[1]} r={5 * k} fill={PIG.red[1]} opacity={draw * (.6 + .4 * Math.sin(flicker * 3))} />
    {/* drilling hall + boiler house + chimney */}
    <SR d={P([T(-330, 0), T(170, 0), T(170, -150), T(-330, -150)])} mat="wall" t={.45} ang={90} draw={draw} sw={1.6 * k} />
    <SR d={P([T(-345, -150), T(185, -150), T(160, -178), T(-320, -178)])} mat="stone" t={.62} ang={0} draw={draw} sw={1.2 * k} />
    {Array.from({ length: 6 }, (_, i) => <g key={'h' + i}><rect x={T(-300 + i * 72, -112)[0]} y={T(0, -112)[1]} width={40 * k} height={46 * k} fill={lit > 0 ? '#F6CF7A' : PIG.night[1]} opacity={draw * (.4 + .6 * lit)} stroke={SEP} strokeWidth={1} />
      <Line d={`M${T(-280 + i * 72, -112).join(' ')} V${T(0, -66)[1]}`} w={.8} a={.7 * draw} /></g>)}
    <SR d={P([T(-40, 0), T(40, 0), T(40, -90), T(-40, -90)])} mat="wood" t={.7} ang={90} draw={draw} sw={1.2 * k} />
    <SR d={P([T(170, 0), T(300, 0), T(300, -120), T(170, -120)])} mat="wall" t={.6} ang={90} draw={draw} sw={1.4 * k} />
    <SR d={P([T(222, -120), T(244, -120), T(240, -250), T(226, -250)])} mat="stone" t={.55} ang={90} draw={draw} sw={1.2 * k} />
    {/* pipe rack in the snow */}
    {Array.from({ length: 7 }, (_, i) => <SR key={'r' + i} d={ell(T(-400 - i * 3, -8 - i * 9)[0], T(0, -8 - i * 9)[1], 9 * k, 9 * k)} mat="brass" t={.6} draw={draw} sw={.7 * k} rim={false} />)}
    <Line d={`M${T(-450, -4).join(' ')} H${T(-340, 0)[0]}`} w={1.4 * k} a={draw} />
    <SR d={P([T(-360, 4), T(320, 4), T(300, 18), T(-380, 18)])} mat="ice" t={.15} hatch={0} draw={draw} sw={.8 * k} rim={false} />
  </g>;
};

// ---------------------------------------------------------------- the borehole in section (true depth): strata as at Kola (R-04), the 23-cm shaft
// ax, ay = the surface point of the hole on screen; zoom = px per km. depth = how far the bit has gone (km); heat 0..1; sag 0..1; target 0..1 (the crust's base)
const KOLA_STRATA: [N, string, N][] = [[0, 'stone', .35], [1.06, 'sand', .45], [2.8, 'leaf', .55], [4.4, 'stone', .55], [6.8, 'wood', .45], [9.0, 'stone', .62], [10.5, 'red', .4], [12.3, 'wood', .55], [20, 'stone', .66], [30, 'wood', .66]];
const KolaBorehole: React.FC<{ ax: N; ay: N; zoom: N; depth?: N; heat?: N; sag?: N; target?: N; moho?: N; draw?: N; flicker?: N; w?: N }> = ({ ax, ay, zoom, depth = 0, heat = 0, sag = 0, target = 0, moho = 40, draw = 1, flicker = 0, w = 700 }) => {
  if (zoom < .4 || draw <= 0) return null;
  const Y = (km: N) => ay + km * zoom, fade = cl((zoom - .4) / 3), x0 = ax - w / 2, x1 = ax + w / 2, bot = Math.min(Y(moho + 4), 1400);
  const hw = Math.max(2.5, Math.min(11, .115 * zoom * 1.6)), bitY = Y(depth);   // the hole drawn ~6× its true 23 cm so it can be seen at all
  const lay = KOLA_STRATA.map(([km, m, t], i) => { const kmN = KOLA_STRATA[i + 1]?.[0] ?? moho + 6, a = Y(km), b = Math.min(Y(kmN), bot); if (a > 1400 || b < -50) return null;
    const q = seq('ks' + i), wav = (yy: N) => { let s = ''; for (let xx = x0; xx <= x1; xx += 40) s += ` L${xx} ${f1(yy + Math.sin(xx / 90 + i) * 5 + (q() - .5) * 4)}`; return s; };
    const top = wav(a).slice(2), d = `M${top} L${x1} ${f1(b)} L${x0} ${f1(b)}Z`;
    return <g key={i}><SR d={d} mat={m} t={t} ang={i % 2 ? 20 : -15} draw={draw} sw={.9} hatchA={.35} /><Stipple x={x0} y={a} w={w} h={Math.max(4, b - a)} n={Math.min(400, Math.round((b - a) * 1.2))} seed={'kst' + i} r0={.5} a={.3 * draw} />
      {Array.from({ length: 3 }, (_, j) => <Line key={j} d={`M${x0} ${f1(a + (b - a) * (j + 1) / 4)} q${w * .3} ${-6 + j * 4} ${w * .6} ${2} t${w * .4} ${-3}`} w={.6} a={.35 * draw} />)}</g>; });
  const sagW = sag * 26, glow = heat * draw;
  return <g opacity={fade}>
    <defs><clipPath id="kbclip"><path d={rect(x0, ay, w, bot - ay)} /></clipPath></defs>
    <g clipPath="url(#kbclip)">{lay}
      {/* heat: the rock warms toward the bottom of the hole */}
      {glow > 0 && <ellipse cx={ax} cy={bitY} rx={(160 + 60 * Math.sin(flicker * 2)) * Math.max(1, zoom / 60)} ry={(110 + 20 * Math.sin(flicker * 3)) * Math.max(1, zoom / 60)} fill={PIG.red[0]} opacity={.75 * glow} filter="url(#b30)" />}
      {glow > 0 && <ellipse cx={ax} cy={bitY} rx={60} ry={40} fill="#FFF4D2" opacity={.5 * glow} filter="url(#b8)" />}
      {/* the shaft: walls sag inward like wax as the rock softens */}
      <path d={`M${ax - hw} ${ay} L${ax - hw} ${f1(bitY - 60)} Q${ax - hw + sagW} ${f1(bitY - 25)} ${ax - hw} ${f1(bitY)} L${ax + hw} ${f1(bitY)} Q${ax + hw - sagW} ${f1(bitY - 25)} ${ax + hw} ${f1(bitY - 60)} L${ax + hw} ${ay}Z`} fill="#1C140E" opacity={.88 * draw} />
      <Line d={`M${ax - hw} ${ay} V${f1(bitY - 60)} Q${ax - hw + sagW} ${f1(bitY - 25)} ${ax - hw} ${f1(bitY)} M${ax + hw} ${ay} V${f1(bitY - 60)} Q${ax + hw - sagW} ${f1(bitY - 25)} ${ax + hw} ${f1(bitY)}`} w={1.2} a={draw} />
      {/* drill string + bit (a roller-cone bit, drawn small) */}
      <Line d={`M${ax} ${ay} V${f1(bitY - 14)}`} w={2} col="#B8862B" a={draw} />
      <SR d={P([[ax - hw * .9, bitY - 16], [ax + hw * .9, bitY - 16], [ax + hw * .5, bitY], [ax - hw * .5, bitY]])} mat="brass" t={.5} draw={draw} sw={.8} rim={false} />
      {/* the base of the crust far below: a dashed line where the rock changes (the Moho) */}
      {target > 0 && <g opacity={target}><path d={`M${x0} ${f1(Y(moho))} H${x0 + w * target}`} stroke={PIG.red[2]} strokeWidth={3} strokeDasharray="14 10" fill="none" />
        <SR d={rect(x0, Y(moho) + 3, w * target, Math.max(0, bot - Y(moho)))} mat="mantle" t={.55} ang={30} draw={target} sw={.6} rim={false} hatchA={.3} /></g>}
    </g>
    <Ink d={`M${x0} ${ay} V${f1(bot)} M${x1} ${ay} V${f1(bot)}`} w={1.3} draw={draw} />
  </g>;
};

// ================================================================ THE PLANET IN SECTION — the film's central figure (a slice through the Earth,
// layers at true radii, engraved like a 19th-c. atlas plate; R-03 for flavour). Placed either by cx, cy, r or, for the true-scale pull from the
// borehole, by ax, ay (the north surface point) + zoom (px per km).
//   layers 0..4: the inside is painted from the outside in (crust, mantle, outer core, inner core) — 0 = blank paper
//   heavy 0..1 the centre darkens to iron · liquid 0..1 the core turns molten (currents swirl) · inner 0..1 the solid inner ball · glow 0..1 white heat
//   shadow 0..1 the P-wave shadow band (103°–143° from a quake at the top) · sparks 0..1 radioactive heat · crack 0..1 a quake on the surface (at `quake` deg)
const EarthSection: React.FC<{ cx?: N; cy?: N; r?: N; ax?: N; ay?: N; zoom?: N; layers?: N; heavy?: N; liquid?: N; inner?: N; glow?: N; shadow?: N; sparks?: N; crack?: N; quake?: N; ghost?: N; ring?: N; solid?: N; draw?: N; flicker?: N; rim?: N; lines?: N }> = (p) => {
  const { layers = 4, heavy = 0, liquid = 0, inner = 1, glow = 0, shadow = 0, sparks = 0, crack = 0, quake = 0, draw = 1, flicker = 0, rim = 1, lines = 1, ring = 0 } = p;
  const zm = p.zoom != null, r = zm ? RE * p.zoom! : (p.r ?? 400), cx = zm ? (p.ax ?? 960) : (p.cx ?? 960), cy = zm ? (p.ay ?? 100) + r : (p.cy ?? 540), solid = p.solid ?? 0;
  if (draw <= 0) return null;
  const rr = (km: N) => r * km / RE, L = (i: N) => cl(layers - i), k = Math.max(.6, Math.min(2.4, r / 420));
  const big = r > 2400, rCmb = rr(R_CMB), rIcb = rr(R_ICB), rMoho = r - Math.max(2.2 * k, r - rr(R_MOHO));
  const swirl = useMemo(() => Array.from({ length: 9 }, (_, i) => { const q = seq('sw' + i); return { a: q() * 6.28, rf: .58 + q() * .36, len: .6 + q() * .9, sp: (q() < .5 ? -1 : 1) * (.08 + q() * .06) }; }), []);
  const spk = useMemo(() => Array.from({ length: 34 }, (_, i) => { const q = seq('sp' + i); return { a: q() * 6.28, rf: .22 + q() * .76, ph: q() * 6.28 }; }), []);
  const qa = (quake - 90) * D, qx = cx + Math.cos(qa) * r, qy = cy + Math.sin(qa) * r;
  const sh = (a0: N, a1: N) => band(cx, cy, r * 1.012, r * 1.06, (quake - 90 + a0) * D, (quake - 90 + a1) * D);
  return <g>
    {/* atmosphere wash + the thin skin of the planet (sea and land), engraved rim */}
    {r < 1100 && <circle cx={cx} cy={cy} r={r * 1.035} fill="#9CCAD6" opacity={.28 * draw * rim} filter="url(#b8)" />}   {/* no blurred halo on a planet larger than the frame (render cost) */}
    <SR d={circ(cx, cy, r)} mat="paper" t={.06} hatch={0} draw={draw} sw={1.8 * k} rim={false} />
    {L(0) > 0 && <SR d={band(cx, cy, rMoho, r)} mat="leaf" t={.5} ang={0} draw={L(0) * draw} sw={.9 * k} rim={false} />}
    {L(1) > 0 && <SR d={band(cx, cy, rCmb, rMoho)} mat="mantle" t={.32 + heavy * .05} ang={35} draw={L(1) * draw} sw={1.1 * k} hatchA={.22} />}
    {L(1) > 0 && lines > 0 && !big && <circle cx={cx} cy={cy} r={rr(R_660)} fill="none" stroke={SEP} strokeWidth={.8} strokeDasharray="3 7" opacity={.45 * L(1) * draw * lines} />}
    {L(2) > 0 && <SR d={band(cx, cy, rIcb * inner, rCmb)} mat="core" t={.42 + liquid * .1} ang={-30} draw={L(2) * draw} sw={1.2 * k} hatchA={.3} />}
    {L(3) > 0 && inner > 0 && <SR d={circ(cx, cy, rIcb * inner)} mat="inner" t={.25} ang={60} draw={L(3) * draw} sw={1.2 * k} hatch={0} />}
    {/* engraving: fine concentric lines in each layer, heavier toward the lower left (shade side), as on a 19th-c. plate */}
    {!big && layers > .5 && <g opacity={.3 * draw * cl(layers - 1)}><g>{Array.from({ length: 64 }, (_, i) => { const rf = (i + .5) / 64, rad = r * rf; if (rad > rMoho - 2 || (L(2) <= 0 && rad < rCmb) || (L(3) <= 0 && rad < rIcb * inner)) return null;
        return <circle key={i} cx={cx} cy={cy} r={rad} fill="none" stroke={SEP} strokeWidth={Math.max(.5, .7 * k)} opacity={rad < rIcb * inner ? .25 : .5} />; })}</g></g>}
    {/* the crust: land and sea along the rim (thickened so it can be seen) */}
    {!big && L(0) > 0 && <g opacity={L(0) * draw}>{Array.from({ length: 24 }, (_, i) => { const a0 = i / 24 * Math.PI * 2, a1 = a0 + Math.PI * 2 / 24 * (.4 + seq('cr' + i)() * .6); return <path key={i} d={band(cx, cy, r - 5 * k, r, a0, a1)} fill={i % 3 ? PIG.forest[1] : PIG.sand[1]} opacity={.9} />; })}
      <path d={band(cx, cy, r - 5 * k, r)} fill={PIG.sea[1]} opacity={.35} /></g>}
    {/* before anyone knew: the inside as one undivided rock (solid 0..1) */}
    {solid > 0 && <SR d={circ(cx, cy, rMoho)} mat="mantle" t={.3} ang={35} draw={solid * draw} sw={1.1 * k} rim={false} />}
    {/* the guessed heavy heart: iron grey with a warm rim */}
    {heavy > 0 && <g opacity={heavy * draw}><circle cx={cx} cy={cy} r={rCmb * 1.02} fill={PIG.red[1]} opacity={.35} filter="url(#b30)" /><SR d={circ(cx, cy, rCmb)} mat="night" t={.55} ang={-40} draw={heavy} sw={1.4 * k} hatchA={.45} /></g>}
    {/* molten outer core: slow currents (trails of light ink) */}
    {liquid > 0 && !big && <g opacity={liquid * draw}>{swirl.map((s, i) => { const a0 = s.a + flicker * s.sp, pts: Pt[] = []; for (let j = 0; j <= 16; j++) { const a = a0 + s.len * j / 16, rf = s.rf + Math.sin(j * .7 + i) * .03; pts.push([cx + Math.cos(a) * (rIcb + (rCmb - rIcb) * (rf - .45) / .55 * 1) , cy + Math.sin(a) * (rIcb + (rCmb - rIcb) * (rf - .45) / .55)]); }
      return <g key={i}><path d={pathOf(pts)} fill="none" stroke="#FFF4D2" strokeWidth={3 * k} opacity={.55} strokeLinecap="round" /><path d={pathOf(pts)} fill="none" stroke={PIG.red[2]} strokeWidth={1 * k} opacity={.6} strokeLinecap="round" /></g>; })}</g>}
    {glow > 0 && <g opacity={glow * draw}><defs><radialGradient id={`whot${Math.round(cx)}${Math.round(cy)}`}><stop offset="0" stopColor="#FFFBEA" /><stop offset=".45" stopColor="#FCE7A8" />
      <stop offset=".8" stopColor="#F2B65A" /><stop offset="1" stopColor="#E0782F" /></radialGradient></defs>
      <circle cx={cx} cy={cy} r={rIcb * 2.2} fill="url(#glowW)" />
      <circle cx={cx} cy={cy} r={rIcb * inner} fill={`url(#whot${Math.round(cx)}${Math.round(cy)})`} opacity={.92} />
      <circle cx={cx} cy={cy} r={rIcb * inner * (1.04 + .02 * Math.sin(flicker * 2.2))} fill="none" stroke="#FCE7A8" strokeWidth={rIcb * .06} opacity={.5} filter="url(#b8)" /></g>}   {/* v2: white-hot, not paper-pale */}
    {sparks > 0 && <g opacity={sparks * draw}>{spk.map((s, i) => { const tw = .5 + .5 * Math.sin(flicker * 3 + s.ph), x = cx + Math.cos(s.a) * r * s.rf * .97, y = cy + Math.sin(s.a) * r * s.rf * .97; return <g key={i}><circle cx={x} cy={y} r={9 * k} fill="url(#glowG)" opacity={tw} /><circle cx={x} cy={y} r={1.6 * k} fill="#FFF4D2" opacity={.4 + .6 * tw} /></g>; })}</g>}
    {/* the shadow band on the far side (103°–143° either way round from the quake) */}
    {shadow > 0 && <g opacity={shadow * draw}>{[sh(103, 143), sh(-143, -103)].map((d, i) => <g key={i}><path d={d} fill={PIG.night[1]} opacity={.55} /><path d={d} fill="url(#h3_45)" opacity={.8} /><Ink d={d} w={1.2 * k} /></g>)}</g>}
    {ring > 0 && <circle cx={cx} cy={cy} r={rCmb} fill="none" stroke="url(#gold)" strokeWidth={6 * k} opacity={ring * draw} />}
    {/* boundaries inked */}
    {!big && L(1) > 0 && <Ink d={ell(cx, cy, rCmb, rCmb)} w={1.3 * k} draw={Math.min(L(1), L(2) > 0 ? 1 : L(1)) * draw} />}
    {!big && L(3) > 0 && inner > 0 && <Ink d={ell(cx, cy, rIcb * inner, rIcb * inner)} w={1.2 * k} draw={L(3) * draw} />}
    <Ink d={big ? band(cx, cy, r - 1, r) : ell(cx, cy, r, r)} w={2 * k} draw={draw} />
    {/* a quake on the surface: a jagged crack + a red mark */}
    {crack > 0 && <g opacity={draw}><path d={`M${qx - 14 * k} ${qy + 2} l${7 * k} ${8 * k} l${5 * k} ${-6 * k} l${6 * k} ${10 * k} l${6 * k} ${-9 * k}`} fill="none" stroke={PIG.red[2]} strokeWidth={2.4 * k} strokeDasharray={`${crack * 80} 200`} />
      <circle cx={qx} cy={qy} r={7 * k * crack} fill={PIG.red[1]} stroke={SEP} strokeWidth={1} /></g>}
  </g>;
};

// ================================================================ STAKES — three ways that fail: dig, look, send a probe
const FailedTools: React.FC<{ x: N; y: N; s?: N; draw?: N; snap?: N; dim?: N; melt?: N; flicker?: N }> = ({ x, y, s = 1, draw = 1, snap = 0, dim = 0, melt = 0, flicker = 0 }) => {
  const k = s, sx = x - 420 * k, lx = x, px = x + 420 * k;
  const blade = P([[sx - 40 * k, y + 40 * k], [sx + 40 * k, y + 40 * k], [sx + 34 * k, y + 120 * k], [sx, y + 150 * k], [sx - 34 * k, y + 120 * k]]);
  const g = (1 - dim) * draw, mm = melt * 60 * k;
  return <g>
    {/* a spade: ash shaft with a D-grip, iron blade — the shaft breaks */}
    <g transform={`rotate(${snap * 18} ${sx} ${y - 60 * k})`}><SR d={rect(sx - 8 * k, y - 230 * k, 16 * k, 170 * k)} mat="wood" t={.5} ang={90} draw={draw} sw={1.2 * k} />
      <SR d={`M${sx - 30 * k} ${y - 230 * k} Q${sx} ${y - 290 * k} ${sx + 30 * k} ${y - 230 * k} L${sx + 18 * k} ${y - 230 * k} Q${sx} ${y - 265 * k} ${sx - 18 * k} ${y - 230 * k}Z`} mat="wood" t={.6} draw={draw} sw={1.2 * k} /></g>
    <SR d={rect(sx - 8 * k, y - 60 * k, 16 * k, 100 * k)} mat="wood" t={.55} ang={90} draw={draw} sw={1.2 * k} />
    <SR d={blade} mat="stone" t={.62} ang={80} draw={draw} sw={1.3 * k} />
    {snap > 0 && <path d={`M${sx - 12 * k} ${y - 62 * k} l6 -8 l5 6 l6 -9 l5 7`} stroke={SEP} strokeWidth={1.4} fill="none" opacity={snap * draw} />}
    {/* a storm lantern: wire guard, glass globe, brass fount — its flame dies */}
    <circle cx={lx} cy={y - 40 * k} r={150 * k} fill="url(#glowW)" opacity={.7 * g} />
    <SR d={`M${lx - 46 * k} ${y + 40 * k} H${lx + 46 * k} L${lx + 40 * k} ${y + 80 * k} H${lx - 40 * k}Z`} mat="brass" t={.5} draw={draw} sw={1.2 * k} />
    <path d={`M${lx - 36 * k} ${y + 40 * k} C${lx - 56 * k} ${y - 20 * k} ${lx - 40 * k} ${y - 90 * k} ${lx} ${y - 100 * k} C${lx + 40 * k} ${y - 90 * k} ${lx + 56 * k} ${y - 20 * k} ${lx + 36 * k} ${y + 40 * k}Z`} fill="#F7EFD6" opacity={.55 * draw} stroke={SEP} strokeWidth={1.4} />
    <path d={`M${lx - 7 * k} ${y + 4 * k} Q${lx} ${y - (50 + 6 * Math.sin(flicker * 12)) * k} ${lx + 7 * k} ${y + 4 * k}Z`} fill="#F6CF7A" opacity={g} />
    {[-30, 0, 30].map(a => <Line key={a} d={`M${lx + a * k} ${y + 40 * k} Q${lx + a * 1.6 * k} ${y - 30 * k} ${lx + a * .3 * k} ${y - 100 * k}`} w={1.6 * k} a={draw} />)}
    <SR d={`M${lx - 30 * k} ${y - 100 * k} H${lx + 30 * k} L${lx + 18 * k} ${y - 130 * k} H${lx - 18 * k}Z`} mat="brass" t={.55} draw={draw} sw={1.2 * k} />
    <Line d={`M${lx - 26 * k} ${y - 130 * k} Q${lx} ${y - 190 * k} ${lx + 26 * k} ${y - 130 * k}`} w={2 * k} a={draw} />
    {/* a probe (a brass bathyscaphe-like capsule on a cable) — it sags and melts */}
    <Line d={`M${px} ${y - 260 * k} V${y - 120 * k}`} w={1.5 * k} a={draw} />
    <SR d={`M${px - 50 * k} ${y - 120 * k} H${px + 50 * k} L${px + 50 * k} ${y + 40 * k + mm * .3} Q${px + 30 * k} ${y + 90 * k + mm} ${px} ${y + 110 * k + mm * 1.3} Q${px - 30 * k} ${y + 90 * k + mm * .8} ${px - 50 * k} ${y + 40 * k + mm * .2}Z`} mat={melt > .3 ? 'mantle' : 'brass'} t={.45 + melt * .1} ang={80} draw={draw} sw={1.3 * k} />
    {[0, 1, 2].map(i => <circle key={i} cx={px} cy={y - 80 * k + i * 40 * k} r={9 * k} fill="#9CCAD6" stroke={SEP} strokeWidth={1.2} opacity={draw * (1 - melt * .6)} />)}
    {melt > 0 && [0, 1, 2].map(i => <path key={'d' + i} d={`M${px - 30 * k + i * 30 * k} ${y + 90 * k + mm} q${4 * k} ${30 * k * melt} 0 ${46 * k * melt}`} stroke={PIG.red[1]} strokeWidth={8 * k} strokeLinecap="round" fill="none" opacity={draw * melt} />)}
  </g>;
};

// ================================================================ CLUE 1 — Cavendish weighs the world (1798, Clapham)
// his garden outbuilding: brick walls, slate roof, a plank door, the window shuttered; a small sash where the telescope pokes through; an elm
const CavendishHouse: React.FC<{ x: N; y: N; s?: N; draw?: N }> = ({ x, y, s = 1, draw = 1 }) => {
  const k = s, T = (dx: N, dy: N): Pt => [x + dx * k, y + dy * k];
  return <g>
    {/* elm behind, lawn */}
    <SR d={P([T(-900, 0), T(900, 0), T(900, 160), T(-900, 160)])} mat="leaf" t={.4} ang={0} draw={draw} sw={1} hatchA={.25} />
    {[[-560, -330, 210], [-470, -420, 190], [-650, -390, 160], [-530, -520, 150]].map(([dx, dy, rr], i) => <SR key={i} d={ell(...T(dx, dy), rr * k, rr * .8 * k)} mat="forest" t={.45 + i * .06} ang={-30} draw={draw} sw={1.1 * k} hatchA={.35} />)}
    <SR d={P([T(-540, 0), T(-500, 0), T(-505, -260), T(-535, -260)])} mat="wood" t={.7} ang={90} draw={draw} sw={1.2 * k} />
    {/* the outbuilding */}
    <SR d={P([T(-300, 0), T(300, 0), T(300, -260), T(-300, -260)])} mat="red" t={.55} ang={0} draw={draw} sw={1.6 * k} hatchA={.25} />
    {Array.from({ length: 12 }, (_, i) => <Line key={i} d={`M${T(-300, -20 - i * 20).join(' ')} H${T(300, 0)[0]}`} w={.6} a={.4 * draw} />)}
    <SR d={P([T(-330, -260), T(330, -260), T(250, -380), T(-250, -380)])} mat="night" t={.55} ang={20} draw={draw} sw={1.6 * k} />
    {Array.from({ length: 6 }, (_, i) => <Line key={'s' + i} d={`M${T(-320 + i * 13, -260 - i * 20).join(' ')} H${T(320 - i * 13, 0)[0]}`} w={.6} a={.5 * draw} />)}
    <SR d={P([T(-60, 0), T(60, 0), T(60, -190), T(-60, -190)])} mat="wood" t={.6} ang={90} draw={draw} sw={1.4 * k} />
    {[-30, 0, 30].map(dx => <Line key={dx} d={`M${T(dx, -186).join(' ')} V${T(0, -4)[1]}`} w={.8} a={.7 * draw} />)}
    <circle cx={T(40, -95)[0]} cy={T(40, -95)[1]} r={5 * k} fill="url(#gold)" opacity={draw} />
    <SR d={P([T(150, -150), T(250, -150), T(250, -90), T(150, -90)])} mat="wood" t={.75} ang={90} draw={draw} sw={1.2 * k} />
    <SR d={ell(...T(-200, -140), 22 * k, 22 * k)} mat="stone" t={.4} draw={draw} sw={1.2 * k} />
    <SR d={P([T(-212, -146), T(-160, -150), T(-160, -136), T(-212, -134)])} mat="brass" t={.5} draw={draw} sw={1 * k} />
    <SR d={P([T(-210, -265), T(-180, -265), T(-180, -320), T(-210, -320)])} mat="red" t={.7} draw={draw} sw={1 * k} />
  </g>;
};
// the apparatus inside its mahogany case (plate XXIII): the torsion wire from the top, the 6-ft wooden arm with a 2-inch lead ball at each end, and the two
// 12-inch lead weights hung from a turning beam outside the case. turn = rotation of the arm (deg, tiny) · big 0..1 the weights swung close · pull 0..1 gold pull lines
const TorsionBalance: React.FC<{ x: N; y: N; s?: N; draw?: N; turn?: N; big?: N; pull?: N; cut?: N }> = ({ x, y, s = 1, draw = 1, turn = 0, big = 1, pull = 0, cut = 1 }) => {
  const k = s, T = (dx: N, dy: N): Pt => [x + dx * k, y + dy * k], arm = 520, bigA = (1 - big) * 40 * D;
  const ends = [-1, 1].map(sd => T(sd * arm * Math.cos(turn * D), sd * arm * Math.sin(turn * D) * .2));
  const weights = [-1, 1].map(sd => T(sd * (arm - 150 - (1 - big) * 170), 4));   // 12-inch lead weights hung just outside the case, beside each small ball
  return <g>
    {/* the room's floor and the case: a long narrow mahogany box on legs, its front cut away (cut 0..1) */}
    <SR d={P([T(-640, 120), T(640, 120), T(640, 140), T(-640, 140)])} mat="wood" t={.7} draw={draw} sw={1.2 * k} />
    {[-560, 560].map(dx => <SR key={dx} d={rect(...T(dx - 12, 50), 24 * k, 80 * k)} mat="wood" t={.7} ang={90} draw={draw} sw={1 * k} />)}
    <SR d={P([T(-600, -60), T(600, -60), T(600, 50), T(-600, 50)])} mat="wood" t={.4 + (1 - cut) * .3} ang={0} draw={draw} sw={1.6 * k} hatchA={.3} />
    {cut > 0 && <SR d={P([T(-580, -45), T(580, -45), T(580, 38), T(-580, 38)])} mat="paper" t={.12} hatch={0} draw={draw * cut} sw={1 * k} rim={false} />}
    <SR d={P([T(-40, -460), T(40, -460), T(40, -60), T(-40, -60)])} mat="wood" t={.5} ang={90} draw={draw} sw={1.4 * k} />
    {cut > 0 && <SR d={P([T(-24, -440), T(24, -440), T(24, -60), T(-24, -60)])} mat="paper" t={.1} hatch={0} draw={draw * cut} sw={.8 * k} rim={false} />}
    {/* wire + arm + the small balls */}
    <Line d={`M${T(0, -440).join(' ')} V${T(0, -2)[1]}`} w={1 * k} a={draw} col="#8A6420" />
    <path d={`M${ends[0].join(' ')} L${ends[1].join(' ')}`} stroke={tone('wood', .5)} strokeWidth={6 * k} opacity={draw} />
    <Line d={`M${ends[0].join(' ')} L${T(0, -60).join(' ')} L${ends[1].join(' ')}`} w={.8 * k} a={.7 * draw} />
    {ends.map((e, i) => <SR key={i} d={ell(e[0], e[1] + 14 * k, 18 * k, 18 * k)} mat="stone" t={.58} ang={-40} draw={draw} sw={1.1 * k} />)}
    {/* the big weights on rods from the turning beam above */}
    <Line d={`M${T(-arm + 40, -400).join(' ')} H${T(arm - 40, 0)[0]}`} w={3 * k} a={draw} col={tone('wood', .7)} />
    {weights.map((w, i) => <g key={'w' + i}><Line d={`M${w[0]} ${T(0, -400)[1]} V${w[1] - 70 * k}`} w={1.6 * k} a={draw} /><SR d={ell(w[0], w[1], 70 * k, 70 * k)} mat="stone" t={.72} ang={-40} draw={draw} sw={1.5 * k} /><circle cx={w[0] + 22 * k} cy={w[1] - 24 * k} r={14 * k} fill="#FFFFFF" opacity={.25 * draw} /></g>)}
    {/* the pull: gold lines between each weight and its small ball */}
    {pull > 0 && weights.map((w, i) => { const e = ends[i]; return <g key={'p' + i} opacity={pull * draw}>{[-8, 0, 8].map(o => <path key={o} d={`M${w[0]} ${w[1] + o * k} L${w[0] + (e[0] - w[0]) * pull} ${w[1] + (e[1] + 14 * k - w[1]) * pull + o * k}`} stroke="url(#gold)" strokeWidth={2.4} strokeDasharray="6 6" />)}</g>; })}
  </g>;
};
// the telescope through the wall (Cavendish read the arm from outside, by lamplight) + its view: an ivory vernier scale with the arm's pointer
const IvoryVernier: React.FC<{ x: N; y: N; r: N; pos?: N; draw?: N }> = ({ x, y, r, pos = 0, draw = 1 }) => {
  const sp = r / 5;
  return <g>
    <defs><clipPath id="iv"><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <g clipPath="url(#iv)">
      <rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill={PIG.night[2]} opacity={.92 * draw} />
      <SR d={rect(x - r, y - r * .18, 2 * r, r * .5)} mat="paper" t={.15} hatch={0} draw={draw} sw={1.4} rim={false} />
      {Array.from({ length: 21 }, (_, i) => { const xx = x - r + i * sp / 2; return <Line key={i} d={`M${xx} ${y - r * .18} V${y - r * .18 + (i % 2 ? r * .12 : r * .22)}`} w={i % 2 ? 1.2 : 2} a={draw} />; })}
      {[-2, -1, 0, 1, 2].map(i => <text key={i} x={x + i * sp} y={y + r * .2} textAnchor="middle" fontFamily="IM Fell English" fontSize={r * .1} fill={SEP} opacity={draw}>{20 + i * 10}</text>)}
      <path d={`M${x + pos * sp} ${y - r * .9} L${x + pos * sp} ${y - r * .2}`} stroke="#F7E3A0" strokeWidth={4} opacity={draw} />
      <path d={`M${x + pos * sp - 9} ${y - r * .26} L${x + pos * sp + 9} ${y - r * .26} L${x + pos * sp} ${y - r * .17}Z`} fill="url(#gold)" stroke={SEP} strokeWidth={1} opacity={draw} />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#000" strokeWidth={r * .3} opacity={.45} filter="url(#b8)" />
    </g>
    <circle cx={x} cy={y} r={r * 1.05} fill="none" stroke="url(#gold)" strokeWidth={r * .1} opacity={draw} /><Ink d={ell(x, y, r * 1.1, r * 1.1)} w={1.6} draw={draw} /><Ink d={ell(x, y, r, r)} w={1.1} draw={draw} />
  </g>;
};
const WallTelescope: React.FC<{ x: N; y: N; s?: N; draw?: N; lamp?: N; flicker?: N }> = ({ x, y, s = 1, draw = 1, lamp = 1, flicker = 0 }) => {
  const k = s, T = (dx: N, dy: N): Pt => [x + dx * k, y + dy * k];
  return <g>
    {/* the wall in section (brick) with the telescope passing through it */}
    <SR d={P([T(140, -520), T(260, -520), T(260, 380), T(140, 380)])} mat="red" t={.6} ang={0} draw={draw} sw={1.6 * k} />
    {Array.from({ length: 18 }, (_, i) => <Line key={i} d={`M${T(140, -500 + i * 50).join(' ')} H${T(260, 0)[0]}`} w={.6} a={.5 * draw} />)}
    <SR d={P([T(-120, -150), T(330, -186), T(330, -150), T(-120, -126)])} mat="brass" t={.45} ang={-5} draw={draw} sw={1.4 * k} />
    <SR d={ell(...T(-126, -138), 10 * k, 16 * k)} mat="brass" t={.65} draw={draw} sw={1 * k} />
    {[-60, 40, 120].map(dx => <Line key={dx} d={`M${T(dx, -146 - dx * .05).join(' ')} v${-18 * k}`} w={1.2 * k} a={draw} />)}
    <SR d={P([T(-20, -126), T(0, -126), T(10, 60), T(-30, 60)])} mat="wood" t={.6} ang={90} draw={draw} sw={1.2 * k} />
    {/* his candle lamp on a small stand */}
    <circle cx={T(-260, -40)[0]} cy={T(-260, -40)[1]} r={160 * k} fill="url(#glowW)" opacity={.55 * lamp * draw} />
    <SR d={rect(...T(-275, -30), 30 * k, 90 * k)} mat="brass" t={.5} draw={draw} sw={1 * k} />
    <path d={`M${T(-266, -30).join(' ')} Q${T(-260, -70 - 4 * Math.sin(flicker * 11))[0]} ${T(0, -70 - 4 * Math.sin(flicker * 11))[1]} ${T(-254, -30).join(' ')}Z`} fill="#F6CF7A" opacity={lamp * draw} />
  </g>;
};
const LeadPair: React.FC<{ x: N; y: N; s?: N; draw?: N; pull?: N }> = ({ x, y, s = 1, draw = 1, pull = 0 }) => {
  const k = s, a: Pt = [x - 260 * k, y], b: Pt = [x + 200 * k, y + 20 * k];
  const ball = (c: Pt, r: N, key: string) => <g key={key}><SR d={ell(c[0], c[1], r, r)} mat="stone" t={.68} ang={-35} draw={draw} sw={1.6 * k} /><circle cx={c[0] + r * .32} cy={c[1] - r * .35} r={r * .22} fill="#FFFFFF" opacity={.3 * draw} />
    <ellipse cx={c[0]} cy={c[1] + r * 1.05} rx={r * .9} ry={r * .12} fill={SEP} opacity={.25 * draw} filter="url(#b2s)" /></g>;
  return <g>{ball(a, 150 * k, 'a')}{ball(b, 40 * k, 'b')}
    {pull > 0 && [-30, -10, 10, 30].map(o => <path key={o} d={`M${a[0] + 150 * k} ${a[1] + o * k} Q${(a[0] + b[0]) / 2 + 30 * k} ${a[1] + o * 1.4 * k} ${a[0] + 150 * k + (b[0] - 40 * k - a[0] - 150 * k) * pull} ${b[1] + o * .3 * k}`} fill="none" stroke="url(#gold)" strokeWidth={2.6} strokeDasharray="8 7" opacity={draw * pull} />)}
    {pull > 0 && <text x={(a[0] + b[0]) / 2} y={y - 60 * k} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={30 * k} fill={SEP} opacity={pull * draw}>lead</text>}
  </g>;
};
// a great brass beam balance on a stand: pans on chains. tilt (deg, + = right pan down) · left/right: 'rock' | 'earth' | 'none'
const GreatBalance: React.FC<{ x: N; y: N; s?: N; draw?: N; tilt?: N; left?: string; right?: string; core?: N; flicker?: N }> = ({ x, y, s = 1, draw = 1, tilt = 0, left = 'none', right = 'none', core = 0, flicker = 0 }) => {
  const k = s, arm = 330 * k, a = tilt * D, top: Pt = [x, y - 420 * k], L: Pt = [top[0] - Math.cos(a) * arm, top[1] - Math.sin(a) * arm], R: Pt = [top[0] + Math.cos(a) * arm, top[1] + Math.sin(a) * arm], ch = 230 * k;
  const pan = (c: Pt, item: string, key: string) => { const py = c[1] + ch; return <g key={key}>
    {[-1, 0, 1].map(i => <Line key={i} d={`M${c[0]} ${c[1]} L${c[0] + i * 95 * k} ${py}`} w={1.1 * k} a={draw} />)}
    {item === 'rock' && <g><SR d={`M${c[0] - 70 * k} ${py} L${c[0] - 60 * k} ${py - 70 * k} L${c[0] - 10 * k} ${py - 98 * k} L${c[0] + 55 * k} ${py - 76 * k} L${c[0] + 72 * k} ${py}Z`} mat="stone" t={.5} ang={-30} draw={draw} sw={1.3 * k} />
      <Stipple x={c[0] - 60 * k} y={py - 90 * k} w={120 * k} h={80 * k} n={90} seed="granite" r0={.8} a={.5 * draw} /></g>}
    {item === 'earth' && <g><circle cx={c[0]} cy={py - 82 * k} r={84 * k} fill={PIG.sea[1]} opacity={draw} filter="url(#wc)" />
      <SR d={ell(c[0], py - 82 * k, 84 * k, 84 * k)} mat="sea" t={.45} ang={-30} draw={draw} sw={1.4 * k} hatchA={.3} />
      {core > 0 && <g opacity={core * draw}><circle cx={c[0]} cy={py - 82 * k} r={46 * k} fill={PIG.red[1]} opacity={.5} filter="url(#b8)" /><SR d={ell(c[0], py - 82 * k, 40 * k, 40 * k)} mat="night" t={.55} draw={core} sw={1.2 * k} /></g>}</g>}
    <SR d={`M${c[0] - 110 * k} ${py} Q${c[0]} ${py + 40 * k} ${c[0] + 110 * k} ${py}Z`} mat="brass" t={.4} ang={0} draw={draw} sw={1.4 * k} /></g>; };
  return <g>
    <SR d={P([[x - 160 * k, y], [x + 160 * k, y], [x + 120 * k, y - 40 * k], [x - 120 * k, y - 40 * k]])} mat="wood" t={.62} draw={draw} sw={1.5 * k} />
    <SR d={P([[x - 14 * k, y - 40 * k], [x + 14 * k, y - 40 * k], [x + 9 * k, top[1] + 20 * k], [x - 9 * k, top[1] + 20 * k]])} mat="brass" t={.5} ang={90} draw={draw} sw={1.4 * k} />
    <SR d={`M${L[0]} ${L[1] - 6 * k} L${top[0]} ${top[1] - 12 * k} L${R[0]} ${R[1] - 6 * k} L${R[0]} ${R[1] + 6 * k} L${top[0]} ${top[1] + 10 * k} L${L[0]} ${L[1] + 6 * k}Z`} mat="brass" t={.45} ang={tilt} draw={draw} sw={1.4 * k} />
    <SR d={ell(top[0], top[1], 18 * k, 18 * k)} mat="brass" t={.6} draw={draw} sw={1.2 * k} />
    <Line d={`M${top[0]} ${top[1]} L${top[0] + Math.sin(a) * 120 * k} ${top[1] + Math.cos(a) * 120 * k}`} w={2 * k} a={draw} />
    {pan(L, left, 'l')}{pan(R, right, 'r')}
  </g>;
};
// an iron meteorite: a pitted lump with a dark fusion crust; `slice` shows the cut, polished, etched face — the Widmanstätten lattice of iron-nickel crystals
const IronMeteorite: React.FC<{ x: N; y: N; s?: N; draw?: N; slice?: N; glow?: N }> = ({ x, y, s = 1, draw = 1, slice = 0, glow = 0 }) => {
  const k = s, q = useMemo(() => seq('met'), []), pts: Pt[] = useMemo(() => Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2, rr = (1 + (seq('m' + i)() - .5) * .28) * 120; return [Math.cos(a) * rr * 1.25, Math.sin(a) * rr]; }), []);
  const body = P(pts.map(p => [x + p[0] * k, y + p[1] * k] as Pt)), face = ell(x + 10 * k, y, 92 * k * slice, 76 * k);
  const lat = useMemo(() => { const o: string[] = []; for (const ang of [0, 60, 120]) for (let i = -6; i <= 6; i++) { const c = Math.cos(ang * D), s2 = Math.sin(ang * D), d = i * 14; o.push(`M${-c * 120 - s2 * d} ${-s2 * 120 + c * d} L${c * 120 - s2 * d} ${s2 * 120 + c * d}`); } return o.join(' '); }, []);
  void q;
  return <g>
    {glow > 0 && <circle cx={x} cy={y} r={200 * k} fill={PIG.red[0]} opacity={.6 * glow} filter="url(#b30)" />}
    <SR d={body} mat="night" t={.7} ang={-35} draw={draw} sw={1.8 * k} hatchA={.5} />
    {Array.from({ length: 9 }, (_, i) => { const r2 = seq('pit' + i), px = x + (r2() - .5) * 220 * k, py = y + (r2() - .5) * 160 * k; return <SR key={i} d={ell(px, py, (8 + r2() * 12) * k, (6 + r2() * 8) * k)} mat="night" t={.85} draw={draw} sw={.7 * k} rim={false} />; })}
    {slice > 0 && <g><defs><clipPath id="wid"><path d={face} /></clipPath></defs>
      <SR d={face} mat="regolith" t={.3} hatch={0} draw={draw} sw={1.4 * k} />
      <g clipPath="url(#wid)" opacity={draw * slice}><path d={lat} transform={`translate(${x + 10 * k} ${y}) scale(${k})`} stroke={SEP} strokeWidth={1.1 / k} fill="none" opacity={.55} />
        <path d={lat} transform={`translate(${x + 14 * k} ${y + 3 * k}) scale(${k})`} stroke="#FFFFFF" strokeWidth={.9 / k} fill="none" opacity={.4} /></g></g>}
  </g>;
};

// ================================================================ CLUE 2 — the planet rings
const BronzeBell: React.FC<{ x: N; y: N; s?: N; draw?: N; swing?: N; flicker?: N }> = ({ x, y, s = 1, draw = 1, swing = 0, flicker = 0 }) => {
  const k = s, a = swing * Math.sin(flicker * 3.2) * 8;
  const bell = `M${x - 70 * k} ${y - 180 * k} C${x - 80 * k} ${y - 260 * k} ${x + 80 * k} ${y - 260 * k} ${x + 70 * k} ${y - 180 * k} C${x + 90 * k} ${y - 60 * k} ${x + 110 * k} ${y - 10 * k} ${x + 170 * k} ${y + 30 * k} L${x - 170 * k} ${y + 30 * k} C${x - 110 * k} ${y - 10 * k} ${x - 90 * k} ${y - 60 * k} ${x - 70 * k} ${y - 180 * k}Z`;
  return <g>
    <SR d={P([[x - 260 * k, y - 300 * k], [x + 260 * k, y - 300 * k], [x + 260 * k, y - 270 * k], [x - 260 * k, y - 270 * k]])} mat="wood" t={.65} draw={draw} sw={1.5 * k} />
    <g transform={`rotate(${a} ${x} ${y - 270 * k})`}>
      <SR d={rect(x - 18 * k, y - 272 * k, 36 * k, 40 * k)} mat="brass" t={.6} draw={draw} sw={1.2 * k} />
      <SR d={bell} mat="brass" t={.5} ang={90} draw={draw} sw={1.8 * k} hatchA={.4} />
      <SR d={`M${x - 168 * k} ${y + 30 * k} L${x + 168 * k} ${y + 30 * k} L${x + 160 * k} ${y + 52 * k} L${x - 160 * k} ${y + 52 * k}Z`} mat="brass" t={.7} draw={draw} sw={1.3 * k} />
      {[-120, -40].map(dy => <Line key={dy} d={`M${x - (74 + (dy + 180) * .3) * k} ${y + dy * k} Q${x} ${y + (dy + 12) * k} ${x + (74 + (dy + 180) * .3) * k} ${y + dy * k}`} w={1.2 * k} a={.8 * draw} />)}
      <path d={`M${x + 30 * k} ${y - 200 * k} Q${x + 70 * k} ${y - 90 * k} ${x + 120 * k} ${y + 20 * k}`} stroke="#FFF4D2" strokeWidth={8 * k} opacity={.45 * draw} fill="none" />
      <Line d={`M${x} ${y - 230 * k} V${y + 40 * k}`} w={2.4 * k} a={draw} /><SR d={ell(x, y + 50 * k, 18 * k, 18 * k)} mat="brass" t={.7} draw={draw} sw={1.2 * k} />
    </g>
  </g>;
};
// two little demonstration panels: a coiled spring pulsing (push waves, P) and a rope flicked side to side (shake waves, S). t = flicker
const WaveDemo: React.FC<{ x: N; y: N; s?: N; draw?: N; push?: N; shake?: N; flicker?: N }> = ({ x, y, s = 1, draw = 1, push = 1, shake = 1, flicker = 0 }) => {
  const k = s, w = 700 * k, x0 = x - w / 2;
  const coils = Array.from({ length: 34 }, (_, i) => { const u = i / 33, c = Math.sin((u * 3 - flicker * 1.2) * Math.PI * 2) * push, xx = x0 + u * w + c * 9 * k; return <ellipse key={i} cx={xx} cy={y - 120 * k} rx={6 * k} ry={34 * k} fill="none" stroke={tone('brass', .6)} strokeWidth={2.4 * k} opacity={draw} />; });
  const rope: Pt[] = Array.from({ length: 80 }, (_, i) => { const u = i / 79, ph = (u * 2.2 - flicker * .9) % 1, env = Math.exp(-Math.pow((((u * 2.2 - flicker * .9) % 2 + 2) % 2 - .5) * 3.2, 2)); void ph; return [x0 + u * w, y + 140 * k + Math.sin(u * Math.PI * 7 - flicker * 6) * 30 * k * env * shake]; });
  return <g>
    {[-120, 140].map(dy => <SR key={dy} d={rect(x0 - 40 * k, y + dy * k - 90 * k, w + 80 * k, 180 * k)} mat="paper" t={.08} hatch={0} draw={draw} sw={1.2 * k} rim={false} />)}
    {coils}<Line d={`M${x0} ${y - 120 * k} H${x0 + w}`} w={.7 * k} a={.35 * draw} />
    <SR d={rect(x0 - 30 * k, y - 160 * k, 22 * k, 80 * k)} mat="wood" t={.6} draw={draw} sw={1 * k} />
    <path d={pathOf(rope)} fill="none" stroke={tone('wood', .5)} strokeWidth={6 * k} opacity={draw} strokeLinecap="round" /><path d={pathOf(rope)} fill="none" stroke={SEP} strokeWidth={1.2} opacity={draw} />
    <SR d={rect(x0 - 30 * k, y + 100 * k, 22 * k, 80 * k)} mat="wood" t={.6} draw={draw} sw={1 * k} />
    {/* arrows of motion */}
    <path d={`M${x0 + w * .78} ${y - 190 * k} h${80 * k} l${-14 * k} ${-8 * k} m${14 * k} ${8 * k} l${-14 * k} ${8 * k} M${x0 + w * .78} ${y - 190 * k} l${14 * k} ${-8 * k} m${-14 * k} ${8 * k} l${14 * k} ${8 * k}`} stroke={PIG.red[2]} strokeWidth={2} fill="none" opacity={draw * push} />
    <path d={`M${x0 + w * .82} ${y + 70 * k} v${-50 * k} l${-7 * k} ${12 * k} m${7 * k} ${-12 * k} l${7 * k} ${12 * k} M${x0 + w * .82} ${y + 70 * k} l${-7 * k} ${-12 * k} m${7 * k} ${12 * k} l${7 * k} ${-12 * k}`} stroke={PIG.red[2]} strokeWidth={2} fill="none" opacity={draw * shake} />
  </g>;
};
// two lanes of rock: hard dark basalt and soft warm rock; the same pulse races in each (k1, k2 = 0..1 of the lane)
const SpeedLanes: React.FC<{ x: N; y: N; w?: N; draw?: N; k1?: N; k2?: N }> = ({ x, y, w = 1300, draw = 1, k1 = 0, k2 = 0 }) => {
  const x0 = x - w / 2, lane = (yy: N, m: string, t: N, kk: N, key: string, lbl: string) => <g key={key}>
    <SR d={rect(x0, yy - 70, w, 140)} mat={m} t={t} ang={key === 'a' ? 30 : -20} draw={draw} sw={1.4} hatchA={.4} />
    <Stipple x={x0} y={yy - 70} w={w} h={140} n={260} seed={'ln' + key} r0={.6} a={.35 * draw} />
    {kk > 0 && <g><path d={`M${x0} ${yy} H${x0 + w * kk}`} stroke="#FFF4D2" strokeWidth={5} opacity={.6} /><circle cx={x0 + w * kk} cy={yy} r={26} fill="url(#glowG)" /><circle cx={x0 + w * kk} cy={yy} r={10} fill="url(#gold)" stroke={SEP} strokeWidth={1.2} />
      {[1, 2, 3].map(i => <path key={i} d={`M${x0 + w * kk - i * 22} ${yy - 30 + i * 4} q8 30 0 ${60 - i * 8}`} stroke={SEP} strokeWidth={1.2} fill="none" opacity={.6 - i * .15} />)}</g>}
    <text x={x0 + 20} y={yy - 84} fontFamily="IM Fell English" fontStyle="italic" fontSize={30} fill={SEP} opacity={draw}>{lbl}</text></g>;
  return <g>{lane(y - 120, 'night', .62, k1, 'a', 'hard, dense rock')}{lane(y + 140, 'red', .32, k2, 'b', 'softer, hotter rock')}</g>;
};
// the Wiechert seismograph (Göttingen, 1900s; R-02-x1): a heavy inverted pendulum in an iron frame, lever arms, and a drum of smoked paper on which
// a needle scratches a white line. amp 0..1 = how hard the ground shakes · drum turns with time
const Seismograph: React.FC<{ x: N; y: N; s?: N; draw?: N; amp?: N; flicker?: N; t0?: N; quake?: N }> = ({ x, y, s = 1, draw = 1, amp = 0, flicker = 0, quake = 99 }) => {
  const k = s, T = (dx: N, dy: N): Pt => [x + dx * k, y + dy * k], dx0 = 160, dw = 300, dh = 210;
  const tr = useMemo(() => Array.from({ length: 7 }, (_, row) => row), []);
  const drumY = (row: N) => -330 + 30 + row * 26;
  const trace = (row: N) => { const pts: Pt[] = []; for (let i = 0; i <= 90; i++) { const u = i / 90, tt = flicker - (1 - u) * 6 - (6 - row) * 6, burst = tt > quake ? Math.exp(-(tt - quake) * .5) * Math.sin((tt - quake) * 28) : 0; pts.push(T(dx0 + u * dw, drumY(row) + (Math.sin(i * 1.7 + row) * .8 + burst * 11 * amp))); } return pathOf(pts); };
  return <g>
    <SR d={P([T(-240, 0), T(500, 0), T(500, 30), T(-240, 30)])} mat="stone" t={.55} draw={draw} sw={1.4 * k} />
    {/* frame */}
    {[-200, 100].map(dx => <SR key={dx} d={rect(...T(dx, -520), 24 * k, 520 * k)} mat="night" t={.62} ang={90} draw={draw} sw={1.3 * k} />)}
    <SR d={rect(...T(-210, -540), 340 * k, 26 * k)} mat="night" t={.62} draw={draw} sw={1.3 * k} />
    {/* the pendulum's heavy cylinder (1 tonne in Göttingen) on its pivot */}
    <SR d={P([T(-150, -470), T(60, -470), T(60, -220), T(-150, -220)])} mat="brass" t={.5} ang={90} draw={draw} sw={1.6 * k} hatchA={.35} />
    {[-430, -380, -330, -280].map(dy => <Line key={dy} d={`M${T(-150, dy).join(' ')} H${T(60, 0)[0]}`} w={.8 * k} a={.6 * draw} />)}
    <SR d={rect(...T(-56, -220), 22 * k, 170 * k)} mat="night" t={.7} ang={90} draw={draw} sw={1.1 * k} />
    <SR d={P([T(-80, -50), T(-10, -50), T(-45, -10)])} mat="brass" t={.6} draw={draw} sw={1 * k} />
    {/* lever arms to the stylus */}
    <Line d={`M${T(60, -340).join(' ')} L${T(150, -320).join(' ')} L${T(dx0 + 20, drumY(3)).join(' ')}`} w={1.6 * k} a={draw} />
    <circle cx={T(150, -320)[0]} cy={T(150, -320)[1]} r={5 * k} fill="url(#gold)" stroke={SEP} strokeWidth={1} opacity={draw} />
    {/* the drum of smoked paper */}
    <SR d={rect(...T(dx0, -330), dw * k, dh * k)} mat="night" t={.85} ang={0} draw={draw} sw={1.6 * k} hatch={0} />
    {tr.map(row => <path key={row} d={trace(row)} fill="none" stroke="#F3E7CC" strokeWidth={1.3} opacity={.85 * draw} />)}
    <SR d={ell(...T(dx0, -225), 16 * k, dh * .52 * k)} mat="brass" t={.55} draw={draw} sw={1.1 * k} />
    <SR d={ell(...T(dx0 + dw, -225), 16 * k, dh * .52 * k)} mat="brass" t={.45} draw={draw} sw={1.1 * k} />
    <Line d={`M${T(dx0 + dw + 16, -225).join(' ')} H${T(dx0 + dw + 60, 0)[0]}`} w={3 * k} a={draw} />
    {/* clockwork box that turns the drum */}
    <SR d={rect(...T(dx0 + dw + 40, -270), 90 * k, 110 * k)} mat="wood" t={.55} draw={draw} sw={1.3 * k} />
    <SR d={ell(...T(dx0 + dw + 85, -215), 26 * k, 26 * k)} mat="paper" t={.1} hatch={0} draw={draw} sw={1 * k} />
    <Line d={`M${T(dx0 + dw + 85, -215).join(' ')} l${Math.cos(flicker) * 20 * k} ${Math.sin(flicker) * 20 * k}`} w={1.4 * k} a={draw} />
    <SR d={rect(...T(dx0 - 10, -110), (dw + 150) * k, 110 * k)} mat="wood" t={.62} draw={draw} sw={1.3 * k} />
  </g>;
};
// one small station: a drum recorder card with its city, the same quake signature arriving a little later the farther away (arrive = when, k = progress)
const StationDrum: React.FC<{ x: N; y: N; s?: N; draw?: N; city?: string; k?: N; arrive?: N }> = ({ x, y, s = 1, draw = 1, city = '', k = 0, arrive = .5 }) => {
  const sc = s, w = 300 * sc, h = 150 * sc, pts: Pt[] = [];
  for (let i = 0; i <= 120; i++) { const u = i / 120; if (u > k) break; const tt = u - arrive, b = tt > 0 ? Math.exp(-tt * 9) * Math.sin(tt * 160) : 0; pts.push([x - w / 2 + 20 * sc + u * (w - 40 * sc), y + 10 * sc + Math.sin(i * 2.3) * .8 + b * 40 * sc]); }
  return <g>
    <rect x={x - w / 2 + 8} y={y - h / 2 + 10} width={w} height={h} fill="#000" opacity={.25 * draw} filter="url(#b8)" />
    <SR d={rect(x - w / 2, y - h / 2, w, h)} mat="night" t={.82} hatch={0} draw={draw} sw={1.3 * sc} rim={false} />
    <Line d={`M${x - w / 2 + 20 * sc} ${y - h / 2 + 30 * sc} H${x + w / 2 - 20 * sc} M${x - w / 2 + 20 * sc} ${y + h / 2 - 22 * sc} H${x + w / 2 - 20 * sc}`} w={.8} col="#F3E7CC" a={.35 * draw} />
    {pts.length > 1 && <path d={pathOf(pts)} fill="none" stroke="#F3E7CC" strokeWidth={1.5} opacity={draw} />}
    <text x={x} y={y + h / 2 + 34 * sc} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={28 * sc} letterSpacing={2} fill={SEP} opacity={draw}>{city}</text>
  </g>;
};
// the Khasi hills of Assam (1897, Shillong; P-09): green ridges, a plank-and-thatch bungalow, an Assam-type house, palms; crack 0..1 the ground opens
const AssamHills: React.FC<{ draw?: N; crack?: N; shake?: N; flicker?: N }> = ({ draw = 1, crack = 0, shake = 0, flicker = 0 }) => {
  const j = (i: N) => shake * Math.sin(flicker * 40 + i) * 5;
  const ridge = (y: N, amp: N, seed: string, t: N, key: string) => { const q = seq(seed); let d = `M-40 1120 L-40 ${y}`; for (let x = -40; x <= 1960; x += 30) d += ` L${x} ${f1(y - Math.sin(x / 260 + q() * .2) * amp - Math.sin(x / 90) * amp * .2 - q() * 6)}`; return <SR key={key} d={d + ' L1960 1120Z'} mat="leaf" t={t} ang={-20} draw={draw} sw={1.1} hatchA={.3} />; };
  const house = (x: N, y: N, s: N, i: N) => <g key={'h' + i} transform={`translate(${j(i)} ${j(i + 2) * .5}) rotate(${crack * (i % 2 ? 4 : -3)} ${x} ${y})`}>
    <SR d={rect(x - 90 * s, y - 80 * s, 180 * s, 80 * s)} mat="paper" t={.25} ang={0} draw={draw} sw={1.3 * s} />
    {[-50, 0, 50].map(dx => <SR key={dx} d={rect(x + dx * s - 14 * s, y - 60 * s, 28 * s, 34 * s)} mat="wood" t={.7} draw={draw} sw={.9 * s} rim={false} />)}
    <SR d={P([[x - 120 * s, y - 80 * s], [x + 120 * s, y - 80 * s], [x + 60 * s, y - 160 * s], [x - 60 * s, y - 160 * s]])} mat="sand" t={.55} ang={20} draw={draw} sw={1.3 * s} />
    {Array.from({ length: 8 }, (_, m) => <Line key={m} d={`M${x - 110 * s + m * 30 * s} ${y - 82 * s} L${x - 55 * s + m * 15 * s} ${y - 158 * s}`} w={.6} a={.5 * draw} />)}</g>;
  return <g>
    {ridge(520, 90, 'as1', .35, 'r1')}{ridge(640, 60, 'as2', .5, 'r2')}
    {house(560, 760, 1, 1)}{house(1240, 790, 1.15, 2)}{house(1650, 700, .7, 3)}
    {[300, 900, 1500].map((x, i) => <g key={'pl' + i} transform={`translate(${j(i + 5)} 0)`}><Line d={`M${x} 840 Q${x + 12} 700 ${x + 6} 600`} w={4} col={tone('wood', .6)} a={draw} />
      {[-70, -30, 20, 60, 110].map((a, m) => <path key={m} d={`M${x + 6} 600 q${Math.cos(a * D) * 60} ${-30 + Math.sin(a * D) * 20} ${Math.cos(a * D) * 110} ${30}`} stroke={tone('leaf', .7)} strokeWidth={8} fill="none" strokeLinecap="round" opacity={draw} />)}</g>)}
    {ridge(860, 30, 'as3', .62, 'r3')}
    {crack > 0 && <g opacity={draw}><path d={`M200 900 L360 890 L420 930 L560 910 L640 960 L820 935 L900 980 L1100 950 L1200 990 L1420 960 L1700 1000`} fill="none" stroke={SEP} strokeWidth={9 * crack} strokeLinejoin="round" />
      <path d={`M200 900 L360 890 L420 930 L560 910 L640 960 L820 935 L900 980 L1100 950 L1200 990 L1420 960 L1700 1000`} fill="none" stroke={PIG.red[2]} strokeWidth={2} pathLength={1} strokeDasharray={`${crack} 1`} /></g>}
  </g>;
};
// Oldham's desk at the Geological Survey (Calcutta): green baize, piles of records, envelopes from far stations (env 0..1 = how many have arrived)
const SurveyDesk: React.FC<{ x: N; y: N; s?: N; draw?: N; env?: N }> = ({ x, y, s = 1, draw = 1, env = 0 }) => {
  const k = s, T = (dx: N, dy: N): Pt => [x + dx * k, y + dy * k], cities = ['Tokyo', 'Rome', 'Strassburg', 'Potsdam', 'Kew', 'Bombay'];
  return <g>
    <SR d={P([T(-520, 0), T(520, 0), T(470, -90), T(-470, -90)])} mat="leaf" t={.55} ang={0} draw={draw} sw={1.6 * k} hatchA={.3} />
    <SR d={P([T(-520, 0), T(520, 0), T(520, 40), T(-520, 40)])} mat="wood" t={.62} draw={draw} sw={1.4 * k} />
    {[-480, 470].map(dx => <SR key={dx} d={rect(...T(dx, 40), 30 * k, 300 * k)} mat="wood" t={.7} ang={90} draw={draw} sw={1.2 * k} />)}
    {/* a pile of seismograph records, a brass lamp, an inkwell, a pen */}
    {Array.from({ length: 6 }, (_, i) => <SR key={i} d={P([T(-420 + i * 3, -100 - i * 9), T(-180 + i * 2, -104 - i * 9), T(-176, -94 - i * 9), T(-418, -90 - i * 9)])} mat="paper" t={.15 + i * .02} hatch={0} draw={draw} sw={.9 * k} rim={false} />)}
    <SR d={ell(...T(330, -100), 30 * k, 12 * k)} mat="night" t={.8} draw={draw} sw={1 * k} />
    <Line d={`M${T(310, -110).join(' ')} L${T(400, -200).join(' ')}`} w={1.4 * k} a={draw} />
    {cities.map((c, i) => { const shown = cl(env * cities.length - i); if (shown <= 0) return null; const ex = -60 + (i % 3) * 110, ey = -110 - Math.floor(i / 3) * 40 - (1 - shown) * 300, r = (i * 37 % 13) - 6;
      return <g key={c} transform={`rotate(${r} ${T(ex, ey).join(' ')})`} opacity={shown}><SR d={rect(...T(ex - 70, ey - 40), 140 * k, 80 * k)} mat="paper" t={.2} hatch={0} draw={draw} sw={1 * k} />
        <Line d={`M${T(ex - 70, ey - 40).join(' ')} L${T(ex, ey).join(' ')} L${T(ex + 70, ey - 40).join(' ')}`} w={.8 * k} a={.7} />
        <rect x={T(ex + 38, ey - 34)[0]} y={T(0, ey - 34)[1]} width={24 * k} height={28 * k} fill={PIG.red[1]} opacity={.75} />
        <text x={T(ex - 50, ey + 28)[0]} y={T(0, ey + 28)[1]} fontFamily="Pinyon Script" fontSize={22 * k} fill={SEP}>{c}</text></g>; })}
  </g>;
};
const RUNNER = [0, 1, 2].map(i => ({ coat: 0, mat: ['sky', 'red', 'leaf'][i], t: .5, flare: 0, leg: 'skin', legT: .3, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: .7 }));
// runners on a cinder track; the middle stretch turns to mud and they slow (run 0..1 · mud 0..1)
const MudTrack: React.FC<{ draw?: N; run?: N; mud?: N; flicker?: N }> = ({ draw = 1, run = 0, mud = 0, flicker = 0 }) => {
  const y = 700, runner = (i: N) => { const lane = y - 30 + i * 60, base = 120 + i * 30; let xx = base + run * 1700; const m0 = 700, m1 = 1200; if (xx > m0) { const inMud = Math.min(xx, m1) - m0, slow = inMud * (1 - .55 * mud); xx = m0 + slow + Math.max(0, xx - m1) * (1 - .2 * mud); }
    const slow = xx > 700 && xx < 1200 ? 1 - .6 * mud : 1; xx = xx + i * 140;
    return <Person key={i} x={xx} y={lane + 60} h={230} facing={1} walk={flicker * 2.2 * slow + i * .3} costume={RUNNER[i]} face={{ nose: .3 * i, chin: .2, brow: .4, build: .95 }} skin={.25 + i * .15} hairCol={['#231A16', '#5A3A22', '#9A4A26'][i]} lean={8} draw={draw} flicker={flicker} />; };
  return <g>
    <SR d={P([[0, y - 70], [1920, y - 70], [1920, y + 140], [0, y + 140]])} mat="red" t={.42} ang={0} draw={draw} sw={1.4} hatchA={.25} />
    {[0, 1, 2].map(i => <Line key={i} d={`M0 ${y - 70 + i * 70} H1920`} w={1.6} col="#FBF6EA" a={.8 * draw} />)}
    {mud > 0 && <g opacity={mud * draw}><SR d={`M700 ${y - 70} C820 ${y - 80} 1100 ${y - 60} 1200 ${y - 70} L1200 ${y + 140} C1100 ${y + 150} 820 ${y + 130} 700 ${y + 140}Z`} mat="wood" t={.72} ang={0} draw={mud} sw={1.2} />
      {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={720 + i * 34} cy={y - 40 + (i * 53) % 170} rx={14} ry={4} fill="#1C140E" opacity={.35} />)}</g>}
    {[0, 1, 2].map(runner)}
  </g>;
};

// ================================================================ CLUE 3 — the Moho, the mantle, the liquid core
// the Zagreb meteorological observatory (Grič, 1909): a vaulted room, an arched window over the old town, a seismograph on a stone pier, a desk with the record
const ZagrebRoom: React.FC<{ draw?: N; flicker?: N }> = ({ draw = 1, flicker = 0 }) => <g>
  <SR d={P([[0, 0], [1920, 0], [1920, 1080], [0, 1080]])} mat="stone" t={.38} ang={90} draw={draw} sw={0} hatchA={.15} />
  <SR d={P([[0, 880], [1920, 880], [1920, 1080], [0, 1080]])} mat="wood" t={.55} ang={0} draw={draw} sw={1.4} />
  {Array.from({ length: 9 }, (_, i) => <Line key={i} d={`M${i * 240} 880 L${i * 240 - 140} 1080`} w={.8} a={.5 * draw} />)}
  {/* arched window: Zagreb's roofs and the cathedral spires at dusk */}
  <SR d={`M1260 880 V330 A170 170 0 0 1 1600 330 V880Z`} mat="wall" t={.55} ang={90} draw={draw} sw={1.6} />
  <SR d={`M1290 850 V340 A140 140 0 0 1 1570 340 V850Z`} mat="sky" t={.22} hatch={0} draw={draw} sw={1} rim={false} />
  <SR d={P([[1290, 700], [1340, 650], [1380, 680], [1420, 620], [1470, 660], [1520, 600], [1570, 640], [1570, 850], [1290, 850]])} mat="red" t={.45} ang={10} draw={draw} sw={1} rim={false} />
  {[1440, 1480].map(x => <SR key={x} d={P([[x - 10, 620], [x + 10, 620], [x + 10, 480], [x, 420], [x - 10, 480]])} mat="stone" t={.5} ang={90} draw={draw} sw={1} />)}
  <Line d={`M1430 340 V850 M1290 560 H1570`} w={3} col={tone('wood', .7)} a={draw} />
  <path d="M1290 850 L1570 850 L1720 1080 L1180 1080Z" fill="#FFF4D2" opacity={.18 * draw} filter="url(#b8)" />
  {/* a stone pier with a small horizontal-pendulum seismograph under a glass bell */}
  <SR d={rect(250, 560, 260, 320)} mat="stone" t={.55} ang={90} draw={draw} sw={1.6} />
  <path d="M270 560 C270 380 490 380 490 560Z" fill="#E8F2F2" opacity={.3 * draw} stroke={SEP} strokeWidth={1.4} />
  <SR d={rect(300, 500, 160, 50)} mat="brass" t={.5} draw={draw} sw={1.2} /><Line d="M320 500 L380 430 L440 500" w={1.6} a={draw} />
  <SR d={ell(380, 470, 22, 22)} mat="brass" t={.6} draw={draw} sw={1.1} />
  {/* clock */}
  <SR d={ell(820, 260, 70, 70)} mat="wood" t={.6} draw={draw} sw={1.4} /><SR d={ell(820, 260, 56, 56)} mat="paper" t={.08} hatch={0} draw={draw} sw={1} />
  <Line d={`M820 260 l${Math.cos(flicker * .1) * 40} ${Math.sin(flicker * .1) * 40} M820 260 l0 -30`} w={2} a={draw} />
</g>;
// a slab of crust in section, the faster rock under it, and the line between them (moho 0..1 inks the boundary) — honey 0..1 the mantle creeps in slow loops
const CrustSlab: React.FC<{ draw?: N; moho?: N; honey?: N; mantle?: N; flicker?: N }> = ({ draw = 1, moho = 0, honey = 0, mantle = 1, flicker = 0 }) => {
  const yM = 470, surf = 240, q = useMemo(() => { const r = seq('slab'); let s = `M-40 ${surf}`; for (let x = -40; x <= 1960; x += 40) s += ` L${x} ${f1(surf - 10 - Math.sin(x / 200) * 18 - r() * 8)}`; return s; }, []);
  const mohoP = useMemo(() => { const r = seq('mo'); let s = `M-40 ${yM}`; for (let x = -40; x <= 1960; x += 40) s += ` L${x} ${f1(yM + Math.sin(x / 300) * 14 + r() * 4)}`; return s; }, []);
  return <g>
    <SR d={`${q} L1960 ${yM} L-40 ${yM}Z`} mat="stone" t={.45} ang={10} draw={draw} sw={1.4} hatchA={.3} />
    {[300, 380].map((yy, i) => <Line key={i} d={`M-40 ${yy} Q600 ${yy - 20} 1200 ${yy + 10} T1960 ${yy}`} w={.8} a={.45 * draw} />)}
    <SR d={`${q} L1960 ${surf - 30} L1960 ${surf - 50} L-40 ${surf - 50}Z`} mat="leaf" t={.4} draw={draw} sw={1} rim={false} />
    {mantle > 0 && <SR d={`M-40 ${yM} L1960 ${yM} L1960 1120 L-40 1120Z`} mat="mantle" t={.5} ang={-30} draw={draw * mantle} sw={1.2} hatchA={.3} />}
    {moho > 0 && <g><path d={mohoP} fill="none" stroke="url(#gold)" strokeWidth={7} pathLength={1} strokeDasharray={`${moho} 1`} /><Ink d={mohoP} w={1.2} draw={moho} /></g>}
    {honey > 0 && <g opacity={honey * draw}>{[[420, 760, 260, 150, 1], [1000, 820, 300, 170, -1], [1560, 760, 250, 150, 1]].map(([cx, cy, rx, ry, dir], i) => { const pts: Pt[] = []; for (let j = 0; j <= 60; j++) { const a = j / 60 * Math.PI * 1.75 + flicker * .25 * dir; pts.push([cx + Math.cos(a * dir) * rx, cy + Math.sin(a * dir) * ry]); }
      const e = pts[pts.length - 1], b = pts[pts.length - 3]; return <g key={i}><path d={pathOf(pts)} fill="none" stroke="#FBE7B0" strokeWidth={9} opacity={.5} strokeLinecap="round" /><path d={pathOf(pts)} fill="none" stroke={PIG.red[2]} strokeWidth={2} />
        <path d={`M${e[0]} ${e[1]} L${b[0] + (e[0] - b[0]) * .2 - (e[1] - b[1]) * .6} ${b[1] + (e[1] - b[1]) * .2 + (e[0] - b[0]) * .6} M${e[0]} ${e[1]} L${b[0] + (e[0] - b[0]) * .2 + (e[1] - b[1]) * .6} ${b[1] + (e[1] - b[1]) * .2 - (e[0] - b[0]) * .6}`} stroke={PIG.red[2]} strokeWidth={2.4} fill="none" /></g>; })}</g>}
  </g>;
};
// two glass tanks: a block of jelly carries a side-to-side wobble across; water does not (k = time of the shake)
const JellyWater: React.FC<{ draw?: N; k?: N; flicker?: N }> = ({ draw = 1, k = 0, flicker = 0 }) => {
  const tank = (x: N, jelly: boolean) => { const w = 520, h = 360, y = 560, wob = (u: N) => jelly ? Math.sin(flicker * 9 - u * 7) * 16 * k * Math.exp(-u * .3) : (u < .12 ? Math.sin(flicker * 9) * 16 * k : 0);
    const top: Pt[] = Array.from({ length: 30 }, (_, i) => { const u = i / 29; return [x - w / 2 + 20 + u * (w - 40), y - h / 2 + 70 + (jelly ? 0 : Math.sin(u * 12 + flicker * 2) * 3)]; });
    const lines = Array.from({ length: 8 }, (_, i) => { const u = i / 7, xx = x - w / 2 + 40 + u * (w - 80); return `M${f1(xx + wob(u))} ${y - h / 2 + 80} Q${f1(xx + wob(u) * 1.6)} ${y} ${f1(xx + wob(u) * .3)} ${y + h / 2 - 20}`; });
    return <g key={String(jelly)}>
      <SR d={`${pathOf(top)} L${x + w / 2 - 20} ${y + h / 2 - 16} L${x - w / 2 + 20} ${y + h / 2 - 16}Z`} mat={jelly ? 'red' : 'water'} t={jelly ? .3 : .25} hatch={0} draw={draw} sw={1} rim={false} a={.85} />
      {lines.map((d, i) => <path key={i} d={d} stroke={jelly ? PIG.red[2] : PIG.sea[2]} strokeWidth={1.4} fill="none" opacity={.6 * draw} strokeDasharray={jelly ? undefined : '4 8'} />)}
      <path d={`M${x - w / 2} ${y - h / 2} V${y + h / 2} H${x + w / 2} V${y - h / 2}`} fill="none" stroke="#F5FBFB" strokeWidth={8} opacity={.6 * draw} /><Ink d={`M${x - w / 2} ${y - h / 2} V${y + h / 2} H${x + w / 2} V${y - h / 2}`} w={1.6} draw={draw} />
      {/* the shaker: a rod pushing the left wall */}
      <SR d={rect(x - w / 2 - 70 + wob(0) * .6, y - 20, 70, 40)} mat="wood" t={.6} draw={draw} sw={1.2} />
      <text x={x} y={y + h / 2 + 56} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={38} fill={SEP} opacity={draw}>{jelly ? 'a solid (jelly)' : 'a liquid (water)'}</text></g>; };
  return <g>{tank(560, true)}{tank(1360, false)}</g>;
};
// a tumbler of water with a straw that looks broken at the surface (bend 0..1)
const StrawGlass: React.FC<{ x: N; y: N; s?: N; draw?: N; bend?: N }> = ({ x, y, s = 1, draw = 1, bend = 1 }) => {
  const k = s, wy = y - 80 * k, top = y - 300 * k, bot = y + 160 * k;
  const glass = P([[x - 140 * k, top], [x + 140 * k, top], [x + 110 * k, bot], [x - 110 * k, bot]]);
  const ax: Pt = [x - 160 * k, top - 160 * k], bx: Pt = [x + 10 * k, wy], dx = bend * 70 * k;
  return <g>
    <SR d={P([[x - 136 * k, wy], [x + 136 * k, wy], [x + 110 * k, bot - 4], [x - 110 * k, bot - 4]])} mat="water" t={.2} hatch={0} draw={draw} sw={.8 * k} rim={false} a={.8} />
    <SR d={`M${ax[0]} ${ax[1]} L${bx[0]} ${bx[1]} L${bx[0] + 14 * k} ${bx[1]} L${ax[0] + 14 * k} ${ax[1] - 6 * k}Z`} mat="red" t={.4} draw={draw} sw={1.2 * k} />
    <SR d={`M${bx[0] + dx} ${bx[1]} L${bx[0] + dx + 14 * k} ${bx[1]} L${bx[0] + dx + 100 * k + 14 * k} ${bot - 20 * k} L${bx[0] + dx + 100 * k} ${bot - 20 * k}Z`} mat="red" t={.48} draw={draw} sw={1.2 * k} a={.85} />
    <Line d={`M${x - 136 * k} ${wy} Q${x} ${wy + 8 * k} ${x + 136 * k} ${wy}`} w={1.4 * k} a={draw} />
    <path d={glass} fill="#EAF6F6" opacity={.25 * draw} /><Ink d={glass} w={1.6 * k} draw={draw} />
    <path d={`M${x + 100 * k} ${top + 20 * k} L${x + 76 * k} ${bot - 30 * k}`} stroke="#FFFFFF" strokeWidth={8 * k} opacity={.5 * draw} />
    <SR d={ell(x, top, 140 * k, 16 * k)} mat="paper" t={.05} hatch={0} draw={draw} sw={1.2 * k} rim={false} a={.5} />
  </g>;
};

// ================================================================ CLUE 4 — Inge Lehmann, Copenhagen (Geodetic Institute, 1930s)
// her room: a tall sash window over the Copenhagen roofs, a long desk under it with record sheets, a filing cabinet, a reading lamp, card boxes
const LehmannRoom: React.FC<{ draw?: N; lamp?: N }> = ({ draw = 1, lamp = 1 }) => <g>
  <SR d={P([[0, 0], [1920, 0], [1920, 1080], [0, 1080]])} mat="cloth" t={.3} ang={90} draw={draw} sw={0} hatchA={.15} />
  <SR d={P([[0, 860], [1920, 860], [1920, 1080], [0, 1080]])} mat="wood" t={.6} ang={0} draw={draw} sw={1.4} />
  {/* sash window with roofs and a copper-green spire */}
  <SR d={rect(1180, 120, 420, 640)} mat="paper" t={.3} ang={90} draw={draw} sw={1.8} />
  <SR d={rect(1210, 150, 360, 580)} mat="sky" t={.2} hatch={0} draw={draw} sw={1} rim={false} />
  <SR d={P([[1210, 560], [1270, 520], [1310, 550], [1360, 500], [1420, 540], [1470, 510], [1570, 550], [1570, 730], [1210, 730]])} mat="red" t={.5} ang={15} draw={draw} sw={1} rim={false} />
  <SR d={P([[1490, 520], [1510, 520], [1510, 380], [1500, 300], [1490, 380]])} mat="leaf" t={.35} ang={90} draw={draw} sw={1} />
  <Line d="M1390 150 V730 M1210 440 H1570" w={4} col="#EFE2C6" a={draw} />
  <path d="M1210 730 L1570 730 L1760 1080 L1060 1080Z" fill="#FFF4D2" opacity={.16 * draw} filter="url(#b8)" />
  {/* filing cabinet */}
  <SR d={rect(120, 420, 260, 440)} mat="leaf" t={.6} ang={90} draw={draw} sw={1.5} />
  {[0, 1, 2, 3].map(i => <g key={i}><SR d={rect(140, 440 + i * 104, 220, 90)} mat="leaf" t={.5} draw={draw} sw={1.1} rim={false} /><SR d={rect(225, 480 + i * 104, 50, 12)} mat="brass" t={.5} draw={draw} sw={.8} rim={false} /></g>)}
  {/* the desk */}
  <SR d={P([[480, 700], [1700, 700], [1660, 640], [520, 640]])} mat="wood" t={.5} ang={0} draw={draw} sw={1.6} />
  <SR d={rect(480, 700, 1220, 40)} mat="wood" t={.65} draw={draw} sw={1.4} />
  {[500, 1650].map(x => <SR key={x} d={rect(x, 740, 30, 120)} mat="wood" t={.72} ang={90} draw={draw} sw={1.1} />)}
  {Array.from({ length: 5 }, (_, i) => <SR key={i} d={P([[560 + i * 4, 652 - i * 8], [880 + i * 3, 648 - i * 8], [884, 640 - i * 8], [564, 644 - i * 8]])} mat="paper" t={.12} hatch={0} draw={draw} sw={.8} rim={false} />)}
  {/* reading lamp */}
  <circle cx={1050} cy={560} r={240} fill="url(#glowW)" opacity={.5 * lamp * draw} />
  <SR d="M1000 640 h100 l-20 -14 h-60Z" mat="brass" t={.5} draw={draw} sw={1.1} />
  <Line d="M1050 626 L1010 520 L1070 470" w={3} a={draw} />
  <SR d="M1040 450 L1130 470 L1110 520 L1030 495Z" mat="leaf" t={.55} draw={draw} sw={1.2} />
</g>;
// a seismogram strip drawn after Lehmann's Fig. 6 (the Buller P′ records, D-01-x4): three traces (E, N, Z); the faint early arrival `bump` (0..1)
// shown before the big ones; `k` how much of the strip is written; mark 0..1 a red ring round the faint arrival
const SeismoRecord: React.FC<{ x: N; y: N; w?: N; draw?: N; k?: N; bump?: N; mark?: N; seed?: string; note?: string }> = ({ x, y, w = 1300, draw = 1, k = 1, bump = 1, mark = 0, seed = 'rec', note = "drawn after Lehmann's Fig. 6, Buller 1929" }) => {
  const h = 420, x0 = x - w / 2, rows = ['E', 'N', 'Z'];
  const tr = useMemo(() => rows.map((_, r) => { const q = seq(seed + r), pts: Pt[] = []; for (let i = 0; i <= 260; i++) { const u = i / 260, a1 = u > .34 ? Math.exp(-(u - .34) * 16) * .32 : 0, a2 = u > .55 ? Math.exp(-(u - .55) * 7) : 0;
    pts.push([u, (q() - .5) * .05 + Math.sin(u * 220 + r) * a1 * (q() + .4) + Math.sin(u * 140 + r * 2) * a2 * (q() * .6 + .5) * 1.3]); } return pts; }), [seed]);  // eslint-disable-line
  return <g>
    <rect x={x0 + 10} y={y - h / 2 + 14} width={w} height={h} fill="#000" opacity={.25 * draw} filter="url(#b8)" />
    <SR d={rect(x0, y - h / 2, w, h)} mat="paper" t={.12} hatch={0} draw={draw} sw={1.2} rim={false} />
    {Array.from({ length: 13 }, (_, i) => <Line key={i} d={`M${x0 + i * w / 12} ${y - h / 2 + 10} V${y + h / 2 - 10}`} w={.5} a={.25 * draw} />)}
    {tr.map((pts, r) => { const yy = y - h / 2 + 80 + r * 130, vis = pts.filter(p => p[0] <= k), amp = (u: N) => u > .3 && u < .52 ? bump : 1;
      return <g key={r}><text x={x0 + 18} y={yy + 8} fontFamily="IM Fell English" fontSize={28} fill={SEP} opacity={draw}>{rows[r]}</text>
        {vis.length > 1 && <path d={pathOf(vis.map(p => [x0 + 60 + p[0] * (w - 80), yy + p[1] * 58 * amp(p[0])] as Pt))} fill="none" stroke={SEP} strokeWidth={1.3} opacity={draw} />}</g>; })}
    {mark > 0 && <path d={`M${x0 + 60 + .41 * (w - 80)} ${y - h / 2 + 20} m-90 0 a90 ${h * .5} 0 1 0 180 0 a90 ${h * .5} 0 1 0 -186 -8`} fill="none" stroke={PIG.red[1]} strokeWidth={4} pathLength={1} strokeDasharray={`${mark} 1`} transform={`translate(0 ${h * .44})`} />}
    <text x={x + w / 2 - 20} y={y + h / 2 - 16} textAnchor="end" fontFamily="IM Fell English" fontStyle="italic" fontSize={24} fill={SEP} opacity={.7 * draw}>{note}</text>
  </g>;
};
// the Buller (Murchison) earthquake, 17 June 1929: the bush-covered hills of the Buller gorge, a hillside slumping into the river (slide 0..1)
const BullerSlip: React.FC<{ draw?: N; slide?: N }> = ({ draw = 1, slide = 0 }) => {
  const scar = `M860 430 L905 405 L960 418 L1010 400 L1050 440 C1070 520 1110 600 1170 690 C1220 760 1290 820 1340 880 L1180 890 L1020 900 L860 880 C850 800 860 720 840 640 C826 560 845 490 860 430Z`;
  return <g>
    <SR d={P([[0, 0], [1920, 0], [1920, 1080], [0, 1080]])} mat="sky" t={.15} hatch={0} draw={draw} sw={0} />
    <SR d="M-40 1120 L-40 520 C200 380 420 300 700 360 C900 300 1200 260 1500 380 C1700 420 1860 360 1960 400 L1960 1120Z" mat="forest" t={.55} ang={-30} draw={draw} sw={1.4} hatchA={.4} />
    <Stipple x={0} y={300} w={1920} h={560} n={900} seed="bush" dens={(u, v) => v > .1 ? 1 : 0} r0={1.2} col={PIG.forest[2]} a={.45 * draw} />
    {slide > 0 && <g opacity={slide * draw}><SR d={scar} mat="sand" t={.55} ang={60} draw={slide} sw={1.4} hatchA={.4} />
      {Array.from({ length: 12 }, (_, i) => { const q = seq('rk' + i); return <SR key={i} d={ell(820 + q() * 400, 600 + slide * 160 + q() * 180, 18 + q() * 20, 12 + q() * 10)} mat="stone" t={.5} draw={slide} sw={.9} rim={false} />; })}</g>}
    <SR d="M-40 1120 L-40 900 C300 860 700 900 1000 880 C1300 860 1600 900 1960 870 L1960 1120Z" mat="water" t={.4} ang={0} draw={draw} sw={1.2} />
    {slide > 0 && <SR d={`M820 ${900 - slide * 30} C960 ${860 - slide * 50} 1180 ${870 - slide * 40} 1300 ${905 - slide * 10} L1300 960 L820 960Z`} mat="wood" t={.55} draw={slide * draw} sw={1.1} />}
  </g>;
};
// letters from colleagues on the desk; `kind` doubt = a sketch of a ray grazing the core's rim; agree = a short note of agreement
const Letter: React.FC<{ x: N; y: N; s?: N; rot?: N; draw?: N; kind?: string; who?: string }> = ({ x, y, s = 1, rot = 0, draw = 1, kind = 'doubt', who = '' }) => {
  const k = s, w = 360 * k, h = 470 * k;
  return <g transform={`rotate(${rot} ${x} ${y})`}>
    <rect x={x - w / 2 + 8} y={y - h / 2 + 12} width={w} height={h} fill="#000" opacity={.25 * draw} filter="url(#b8)" />
    <SR d={rect(x - w / 2, y - h / 2, w, h)} mat="paper" t={.1} hatch={0} draw={draw} sw={1.1 * k} rim={false} />
    {kind !== 'blank' && Array.from({ length: 7 }, (_, i) => <Line key={i} d={`M${x - w / 2 + 30 * k} ${y - h / 2 + (50 + i * 22) * k} h${(250 - (i * 37) % 70) * k}`} w={1} a={.4 * draw} />)}
    {kind === 'doubt' ? <g opacity={draw}><circle cx={x} cy={y + 90 * k} r={110 * k} fill="none" stroke={SEP} strokeWidth={1.4} /><circle cx={x} cy={y + 90 * k} r={60 * k} fill="none" stroke={SEP} strokeWidth={1.2} />
      <path d={`M${x - 100 * k} ${y + 40 * k} Q${x - 10 * k} ${y + 10 * k} ${x + 62 * k} ${y + 70 * k} Q${x + 90 * k} ${y + 110 * k} ${x + 96 * k} ${y + 150 * k}`} fill="none" stroke={PIG.sky[2]} strokeWidth={2} />
      <text x={x} y={y + h / 2 - 22 * k} textAnchor="middle" fontFamily="Pinyon Script" fontSize={30 * k} fill={SEP}>diffracted?</text></g>
      : kind === 'agree' ? <g opacity={draw}><text x={x} y={y + 90 * k} textAnchor="middle" fontFamily="Pinyon Script" fontSize={46 * k} fill="#3A2414">I agree.</text></g> : null}
    {who && <text x={x + w / 2 - 24 * k} y={y - h / 2 + 30 * k} textAnchor="end" fontFamily="IM Fell English" fontStyle="italic" fontSize={20 * k} fill={SEP} opacity={.8 * draw}>{who}</text>}
  </g>;
};
// two cardboard oatmeal boxes (no labels shown) packed with index cards; one card lifts out (lift 0..1)
const CardBoxes: React.FC<{ x: N; y: N; s?: N; draw?: N; lift?: N }> = ({ x, y, s = 1, draw = 1, lift = 0 }) => {
  const k = s, box = (bx: N, key: string) => <g key={key}>
    <SR d={P([[bx - 150 * k, y], [bx + 150 * k, y], [bx + 150 * k, y - 240 * k], [bx - 150 * k, y - 240 * k]])} mat="sand" t={.45} ang={90} draw={draw} sw={1.5 * k} />
    <SR d={P([[bx - 150 * k, y - 240 * k], [bx + 150 * k, y - 240 * k], [bx + 190 * k, y - 290 * k], [bx - 110 * k, y - 290 * k]])} mat="sand" t={.25} draw={draw} sw={1.3 * k} />
    {Array.from({ length: 14 }, (_, i) => <SR key={i} d={P([[bx - 130 * k + i * 19 * k, y - 236 * k], [bx - 100 * k + i * 19 * k, y - 286 * k], [bx - 96 * k + i * 19 * k, y - 300 * k], [bx - 126 * k + i * 19 * k, y - 250 * k]])} mat="paper" t={.08} hatch={0} draw={draw} sw={.7 * k} rim={false} />)}
    <SR d={P([[bx - 150 * k, y - 170 * k], [bx + 150 * k, y - 170 * k], [bx + 150 * k, y - 120 * k], [bx - 150 * k, y - 120 * k]])} mat="red" t={.45} draw={draw} sw={1 * k} rim={false} /></g>;
  const cy = y - 300 * k - lift * 120 * k;
  return <g>{box(x - 200 * k, 'a')}{box(x + 200 * k, 'b')}
    {lift > 0 && <g><rect x={x + 60 * k} y={cy - 110 * k} width={250 * k} height={160 * k} fill="#000" opacity={.25 * lift} filter="url(#b8)" />
      <SR d={rect(x + 50 * k, cy - 120 * k, 250 * k, 160 * k)} mat="paper" t={.06} hatch={0} draw={lift} sw={1.1 * k} rim={false} />
      {[0, 1, 2, 3].map(i => <Line key={i} d={`M${x + 70 * k} ${cy - 80 * k + i * 26 * k} h${(200 - i * 24) * k}`} w={1} col={i ? SEP : PIG.red[1]} a={.6 * lift} />)}
      <text x={x + 175 * k} y={cy + 20 * k} textAnchor="middle" fontFamily="Pinyon Script" fontSize={30 * k} fill={SEP} opacity={lift}>{"Buller · P′"}</text></g>}
  </g>;
};

// ================================================================ TWIST
// the inner core drawn large: a ball of iron crystals (hexagonal grains, engraved), white-hot, the size of the Moon (to scale with the Moon beside it)
const InnerCoreBall: React.FC<{ x: N; y: N; r: N; draw?: N; glow?: N; press?: N; flicker?: N }> = ({ x, y, r, draw = 1, glow = 1, press = 0, flicker = 0 }) => {
  const g = useMemo(() => Array.from({ length: 46 }, (_, i) => { const q = seq('ic' + i), a = q() * 6.28, d = Math.sqrt(q()) * .9; return [Math.cos(a) * d, Math.sin(a) * d, .08 + q() * .07] as [N, N, N]; }), []);
  return <g>
    <circle cx={x} cy={y} r={r * 1.8} fill="url(#glowW)" opacity={.8 * glow * draw} />
    <defs><clipPath id="icb"><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <SR d={ell(x, y, r, r)} mat="inner" t={.3} ang={45} draw={draw} sw={2} hatch={0} />
    <g clipPath="url(#icb)" opacity={draw}>{g.map(([u, v, s], i) => { const pts: Pt[] = Array.from({ length: 6 }, (_, j) => [x + (u + Math.cos(j * Math.PI / 3 + i) * s) * r, y + (v + Math.sin(j * Math.PI / 3 + i) * s) * r]); return <path key={i} d={pathOf(pts, true)} fill={i % 3 ? '#FFF8E0' : '#F3D98A'} stroke={SEP} strokeWidth={.9} opacity={.55} />; })}
      <circle cx={x + r * .35} cy={y + r * .3} r={r * .9} fill={PIG.inner[2]} opacity={.25} filter="url(#b30)" /></g>
    {press > 0 && Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2, r0 = r * (2.1 - press * .55), r1 = r * (1.35 - press * .15), b = Math.sin(flicker * 3 + i) * 6;
      const p0: Pt = [x + Math.cos(a) * (r0 + b), y + Math.sin(a) * (r0 + b)], p1: Pt = [x + Math.cos(a) * r1, y + Math.sin(a) * r1], n: Pt = [-Math.sin(a), Math.cos(a)];
      return <g key={i} opacity={press * draw}><path d={`M${p0[0]} ${p0[1]} L${p1[0]} ${p1[1]}`} stroke={SEP} strokeWidth={4} /><path d={`M${p1[0]} ${p1[1]} l${(-Math.cos(a) * 26 + n[0] * 12)} ${(-Math.sin(a) * 26 + n[1] * 12)} M${p1[0]} ${p1[1]} l${(-Math.cos(a) * 26 - n[0] * 12)} ${(-Math.sin(a) * 26 - n[1] * 12)}`} stroke={SEP} strokeWidth={4} fill="none" transform={`rotate(180 ${p1[0]} ${p1[1]})`} /></g>; })}
  </g>;
};
// the magnetic field of the Earth: dipole field lines looping from pole to pole (k 0..1 how far they have grown) and the solar wind deflected round it
const FieldLines: React.FC<{ x: N; y: N; r: N; draw?: N; k?: N; wind?: N; flicker?: N }> = ({ x, y, r, draw = 1, k = 1, wind = 0, flicker = 0 }) => {
  const lines = [1.6, 2.2, 3, 4.1].flatMap(L => [-1, 1].map(sd => { const pts: Pt[] = []; for (let i = 0; i <= 60; i++) { const th = (12 + i / 60 * 156) * D, rr = L * r * Math.pow(Math.sin(th), 2); if (rr < r * .98) continue; pts.push([x + sd * rr * Math.sin(th), y - rr * Math.cos(th)]); } return { pts, L }; }));
  const sw = Array.from({ length: 9 }, (_, i) => { const yy = y - r * 5 + i * r * 1.25, pts: Pt[] = []; for (let j = 0; j <= 40; j++) { const xx = x - r * 9 + j * r * .3, d = Math.hypot(xx - x, yy - y), push = Math.max(0, r * 4.6 - d) * Math.sign(yy - y || 1) * .9; pts.push([xx, yy + push]); } return pts; });
  return <g>
    {lines.map((l, i) => { const n = Math.max(2, Math.round(l.pts.length * k)); return <g key={i}><path d={pathOf(l.pts.slice(0, n))} fill="none" stroke="url(#gold)" strokeWidth={3} opacity={.85 * draw} /><path d={pathOf(l.pts.slice(0, n))} fill="none" stroke={SEP} strokeWidth={.8} opacity={.5 * draw} /></g>; })}
    {wind > 0 && sw.map((pts, i) => { const off = ((flicker * .18 + i * .13) % 1); const seg = pts.slice(0, Math.max(2, Math.round(pts.length * wind))); return <g key={'w' + i} opacity={wind * draw}><path d={pathOf(seg)} fill="none" stroke={PIG.red[0]} strokeWidth={1.6} strokeDasharray="10 14" strokeDashoffset={-off * 200} /></g>; })}
  </g>;
};
// a brass pocket compass on an open palm: the needle swings to north (needle = deg)
const PocketCompass: React.FC<{ x: N; y: N; s?: N; draw?: N; needle?: N }> = ({ x, y, s = 1, draw = 1, needle = 0 }) => {
  const k = s;
  return <g>
    <SR d={`M${x - 260 * k} ${y + 200 * k} C${x - 250 * k} ${y + 40 * k} ${x - 160 * k} ${y - 20 * k} ${x - 20 * k} ${y - 10 * k} C${x + 140 * k} ${y} ${x + 220 * k} ${y + 30 * k} ${x + 300 * k} ${y - 40 * k} C${x + 340 * k} ${y - 70 * k} ${x + 380 * k} ${y - 40 * k} ${x + 350 * k} ${y} C${x + 300 * k} ${y + 80 * k} ${x + 200 * k} ${y + 160 * k} ${x + 120 * k} ${y + 260 * k} L${x - 220 * k} ${y + 300 * k}Z`} mat="skin" t={.35} ang={10} draw={draw} sw={1.6 * k} />
    <SR d={ell(x, y + 10 * k, 170 * k, 170 * k)} mat="brass" t={.5} ang={-30} draw={draw} sw={1.8 * k} />
    <SR d={ell(x, y + 10 * k, 140 * k, 140 * k)} mat="paper" t={.08} hatch={0} draw={draw} sw={1.2 * k} />
    {Array.from({ length: 32 }, (_, i) => { const a = i / 32 * Math.PI * 2; return <Line key={i} d={`M${x + Math.cos(a) * 128 * k} ${y + 10 * k + Math.sin(a) * 128 * k} L${x + Math.cos(a) * (i % 4 ? 118 : 104) * k} ${y + 10 * k + Math.sin(a) * (i % 4 ? 118 : 104) * k}`} w={1} a={draw} />; })}
    {['N', 'E', 'S', 'W'].map((c, i) => <text key={c} x={x + Math.sin(i * Math.PI / 2) * 84 * k} y={y + 22 * k - Math.cos(i * Math.PI / 2) * 84 * k} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={30 * k} fill={c === 'N' ? PIG.red[2] : SEP} opacity={draw}>{c}</text>)}
    <g transform={`rotate(${needle} ${x} ${y + 10 * k})`}><path d={`M${x} ${y - 100 * k} L${x + 12 * k} ${y + 10 * k} L${x - 12 * k} ${y + 10 * k}Z`} fill={PIG.red[1]} stroke={SEP} strokeWidth={1} opacity={draw} /><path d={`M${x} ${y + 120 * k} L${x + 12 * k} ${y + 10 * k} L${x - 12 * k} ${y + 10 * k}Z`} fill={PIG.sky[2]} stroke={SEP} strokeWidth={1} opacity={draw} /></g>
    <circle cx={x} cy={y + 10 * k} r={8 * k} fill="url(#gold)" stroke={SEP} strokeWidth={1} opacity={draw} />
  </g>;
};

// ================================================================ MEANING — another world (Mars, its core measured from marsquakes by InSight, 2021)
const MarsSection: React.FC<{ x: N; y: N; r: N; draw?: N; cut?: N }> = ({ x, y, r, draw = 1, cut = 0 }) => {
  const rc = r * .54;
  return <g>
    <circle cx={x} cy={y} r={r * 1.04} fill={PIG.red[0]} opacity={.25 * draw} filter="url(#b8)" />
    <SR d={ell(x, y, r, r)} mat="red" t={.45} ang={-30} draw={draw} sw={1.8} hatchA={.35} />
    {[[-.3, -.2, .25, .1], [.2, .3, .3, .08], [-.1, .45, .2, .06], [.35, -.35, .15, .07]].map(([u, v, a, b], i) => <SR key={i} d={ell(x + u * r, y + v * r, a * r, b * r)} mat="wood" t={.6} draw={draw} sw={.8} rim={false} hatch={0} />)}
    {cut > 0 && <g opacity={cut * draw}><path d={`M${x} ${y} L${x + r} ${y} A${r} ${r} 0 0 0 ${x} ${y - r}Z`} fill={PIG.mantle[1]} /><path d={`M${x} ${y} L${x + rc} ${y} A${rc} ${rc} 0 0 0 ${x} ${y - rc}Z`} fill={PIG.core[1]} />
      <Ink d={`M${x} ${y - r} L${x} ${y} L${x + r} ${y} M${x + rc} ${y} A${rc} ${rc} 0 0 0 ${x} ${y - rc}`} w={1.4} draw={cut} /></g>}
    <Ink d={ell(x, y, r, r)} w={2} draw={draw} />
  </g>;
};
// a gilt medallion (the answer gathers the four clues): balance · drum · jelly · boxes
const ClueMedallion: React.FC<{ x: N; y: N; r?: N; draw?: N; kind?: string; n?: N }> = ({ x, y, r = 110, draw = 1, kind = 'balance', n = 1 }) => {
  const k = r / 110;
  const icon = kind === 'balance' ? <g><Line d={`M${x - 60 * k} ${y - 30 * k} H${x + 60 * k} M${x} ${y - 46 * k} V${y + 50 * k} M${x - 40 * k} ${y + 50 * k} H${x + 40 * k}`} w={3 * k} a={draw} />
      {[-60, 60].map(dx => <path key={dx} d={`M${x + dx * k - 26 * k} ${y + 10 * k} Q${x + dx * k} ${y + 30 * k} ${x + dx * k + 26 * k} ${y + 10 * k}Z M${x + dx * k} ${y - 30 * k} L${x + dx * k - 22 * k} ${y + 10 * k} M${x + dx * k} ${y - 30 * k} L${x + dx * k + 22 * k} ${y + 10 * k}`} fill={tone('brass', .4)} stroke={SEP} strokeWidth={1.6} opacity={draw} />)}</g>
    : kind === 'drum' ? <g><rect x={x - 62 * k} y={y - 38 * k} width={124 * k} height={76 * k} fill={PIG.night[2]} stroke={SEP} strokeWidth={2} opacity={draw} /><path d={`M${x - 54 * k} ${y} ${Array.from({ length: 30 }, (_, i) => `L${x - 54 * k + i * 3.7 * k} ${y + (i > 12 && i < 22 ? Math.sin(i * 2.4) * 22 * k : Math.sin(i) * 2 * k)}`).join(' ')}`} stroke="#F3E7CC" strokeWidth={2} fill="none" opacity={draw} /></g>
    : kind === 'jelly' ? <g><rect x={x - 50 * k} y={y - 40 * k} width={100 * k} height={84 * k} fill={PIG.red[0]} stroke={SEP} strokeWidth={2} opacity={draw} /><path d={`M${x - 30 * k} ${y - 30 * k} q20 30 0 60 M${x} ${y - 30 * k} q20 30 0 60 M${x + 30 * k} ${y - 30 * k} q20 30 0 60`} stroke={PIG.red[2]} strokeWidth={2} fill="none" opacity={draw} /></g>
    : kind === 'sealed' ? <g opacity={draw}><circle cx={x} cy={y} r={58 * k} fill="#8C3424" stroke={SEP} strokeWidth={1.6} /><circle cx={x} cy={y} r={46 * k} fill="none" stroke="#F3D98A" strokeWidth={1.2} strokeDasharray="3 4" />
        <text x={x} y={y + 24 * k} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={70 * k} fill="#FBF1D8">?</text></g>   // v2 hook: a clue not yet opened (a wax seal)
    : <g><rect x={x - 56 * k} y={y - 30 * k} width={50 * k} height={70 * k} fill={PIG.sand[1]} stroke={SEP} strokeWidth={2} opacity={draw} /><rect x={x + 6 * k} y={y - 30 * k} width={50 * k} height={70 * k} fill={PIG.sand[1]} stroke={SEP} strokeWidth={2} opacity={draw} />
      {[0, 1, 2, 3].map(i => <rect key={i} x={x - 50 * k + i * 26 * k} y={y - 46 * k} width={18 * k} height={22 * k} fill="#FBF4E2" stroke={SEP} strokeWidth={1} opacity={draw} />)}</g>;
  return <g>
    <circle cx={x + 6} cy={y + 9} r={r * 1.08} fill="#000" opacity={.25 * draw} filter="url(#b8)" />
    <circle cx={x} cy={y} r={r * 1.06} fill="url(#gold)" opacity={draw} stroke={SEP} strokeWidth={1.4} />
    <SR d={ell(x, y, r * .9, r * .9)} mat="paper" t={.12} hatch={0} draw={draw} sw={1.4} rim={false} />
    {icon}
    <text x={x} y={y + r * .78} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={22 * k} fill={SEP} opacity={draw}>{['I', 'II', 'III', 'IV'][n - 1]}</text>
  </g>;
};

export const ART: Record<string, React.FC<any>> = {
  KolaTundra: KolaTundra, KolaRig: KolaRig, KolaBorehole: KolaBorehole, EarthSection: EarthSection, FailedTools: FailedTools, CavendishHouse: CavendishHouse, TorsionBalance: TorsionBalance, IvoryVernier: IvoryVernier, WallTelescope: WallTelescope, LeadPair: LeadPair, GreatBalance: GreatBalance, IronMeteorite: IronMeteorite, BronzeBell: BronzeBell, WaveDemo: WaveDemo, SpeedLanes: SpeedLanes, Seismograph: Seismograph, StationDrum: StationDrum, AssamHills: AssamHills, SurveyDesk: SurveyDesk, MudTrack: MudTrack, ZagrebRoom: ZagrebRoom, CrustSlab: CrustSlab, JellyWater: JellyWater, StrawGlass: StrawGlass, LehmannRoom: LehmannRoom, SeismoRecord: SeismoRecord, BullerSlip: BullerSlip, Letter: Letter, CardBoxes: CardBoxes, InnerCoreBall: InnerCoreBall, FieldLines: FieldLines, PocketCompass: PocketCompass, MarsSection: MarsSection, ClueMedallion: ClueMedallion,
};
export const COSTUMES: Record<string, object> = {
  listener2026: { coat: .3, mat: 'night', t: .55, flare: .02, leg: 'stone', legT: .5, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.0 },   // the viewer standing on the planet (hook)
  kolaDriller: { coat: .36, mat: 'tundra', t: .6, flare: .03, leg: 'night', legT: .7, shoe: 'boot', neck: 'none', hat: 'cap', hair: 'short', sleeve: 1.35 },
  cavendish1798: { coat: .27, mat: 'tundra', t: .72, flare: .08, leg: 'stone', legT: .55, stock: true, shoe: 'buckle', neck: 'cravat', hat: 'tricorn', hair: 'wig', sleeve: 1.2, vest: 'cloth' },
  wiechert1896: { coat: .36, mat: 'night', t: .78, flare: .03, leg: 'night', legT: .74, shoe: 'boot', neck: 'bow', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'night' },
  oldham1897: { coat: .42, mat: 'sand', t: .38, flare: .02, leg: 'sand', legT: .45, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'sand' },
  moho1909: { coat: .4, mat: 'night', t: .7, flare: .02, leg: 'night', legT: .72, shoe: 'boot', neck: 'bow', hat: 'none', hair: 'bald', sleeve: 1.05, vest: 'stone' },
  gutenberg1914: { coat: .43, mat: 'stone', t: .62, flare: .01, leg: 'stone', legT: .66, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'stone' },
  lehmann1932: { coat: .2, mat: 'night', t: .55, flare: .05, leg: 'skin', legT: .3, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.1, vest: 'paper' },
};
export const SAMPLE: Record<string, object> = {
  KolaTundra: { y: 760 }, KolaRig: { x: 960, y: 800, s: .9, lit: 1 }, KolaBorehole: { ax: 960, ay: 120, zoom: 60, depth: 9, heat: .6, target: 0 },
  EarthSection: { cx: 960, cy: 540, r: 420, layers: 4, liquid: 1, shadow: 1, crack: 1 }, FailedTools: { x: 960, y: 560, s: .9, snap: .5, dim: .5, melt: .6 },
  CavendishHouse: { x: 960, y: 820, s: 1 }, TorsionBalance: { x: 960, y: 640, s: .9, big: 1, pull: 1 }, IvoryVernier: { x: 960, y: 540, r: 360, pos: .4 },
  WallTelescope: { x: 960, y: 640, s: 1 }, LeadPair: { x: 960, y: 560, pull: 1 }, GreatBalance: { x: 960, y: 900, s: 1, tilt: 12, left: 'rock', right: 'earth', core: 1 },
  IronMeteorite: { x: 960, y: 540, s: 1.6, slice: 1 }, BronzeBell: { x: 960, y: 640, s: 1.2 }, WaveDemo: { x: 960, y: 540, s: 1.2, flicker: 1 }, SpeedLanes: { x: 960, y: 540, k1: .8, k2: .5 },
  Seismograph: { x: 820, y: 900, s: 1.2, amp: 1, flicker: 102 }, StationDrum: { x: 960, y: 540, s: 1.4, city: 'Potsdam', k: 1, arrive: .4 }, AssamHills: { crack: 1 },
  SurveyDesk: { x: 960, y: 800, env: 1 }, MudTrack: { run: .5, mud: 1 }, ZagrebRoom: {}, CrustSlab: { moho: 1, honey: 1 }, JellyWater: { k: 1, flicker: .3 }, StrawGlass: { x: 960, y: 640 },
  LehmannRoom: {}, SeismoRecord: { x: 960, y: 540, k: 1, mark: 1 }, BullerSlip: { slide: 1 }, Letter: { x: 960, y: 540, s: 1.4 }, CardBoxes: { x: 960, y: 820, lift: 1 },
  InnerCoreBall: { x: 960, y: 540, r: 260, press: 1 }, FieldLines: { x: 960, y: 540, r: 140, wind: 1 }, PocketCompass: { x: 960, y: 520 }, MarsSection: { x: 960, y: 540, r: 300, cut: 1 }, ClueMedallion: { x: 960, y: 540, r: 200, kind: 'drum', n: 2 },
};
export const FULL = true;
export { THUMB, THUMB_V } from './thumb';   // the designed thumbnail + vertical cover (kit/ThumbPoster)
