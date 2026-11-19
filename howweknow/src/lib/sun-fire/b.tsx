// sun-fire — set B drawings (acts III–V): the furnace door of the core, the proton dancers, Bethe's typewriter (1938), the neutrino's flight
// through the Earth, the thumb in the rain of neutrinos, the Homestake shaft, the chlorine tank, the one argon atom, the thirty-year wall,
// the SNO sphere at Sudbury, the three doors (flavours), the Sun as a furnace, the morning light on the fields.
// Engine 10, CLEAN DRAWN house style: washes under sepia ink, no engraving hatch. Every component is a FULL-FRAME scene (1920×1080) drawn about
// (960, 540): x, y move that centre, s scales it. THE NEUTRINO everywhere = a small vermilion spark with a short fading tail (<Spark>).
import React from 'react';
import { Region, Line, Stipple, SEP, Fell, Hand, N, Pt, f1, cl, lerp, rr, pathOf, rnd, NightWash, Star, starField, Ball, circ } from '../star-distance/kit';
import { Skin, fk, limbJoints } from '../../paint/anatomy';
import { mix } from '../../paint/paint';

const VER = '#B8432A', FIG = "'Special Elite', monospace", HANDF = "'La Belle Aurore', cursive", CHALK = '#EEEBDD';
const RG: React.FC<any> = (p) => <Region hatch={0} {...p} />;
const TR = (x: N, y: N, s: N) => `translate(${f1(x)} ${f1(y)}) scale(${s}) translate(-960 -540)`;
const fr = (v: N) => v - Math.floor(v);
const sst = (t: N) => { const u = cl(t); return u * u * (3 - 2 * u); };
const ph = (d: N, a: N, b: N) => cl((d - a) / (b - a));
const bell = (v: N, a: N, b: N) => Math.sin(Math.PI * ph(v, a, b));
const TAU = Math.PI * 2, D = Math.PI / 180;
const sm = (pts: Pt[], closed = false) => {
  if (pts.length < 2) return ''; const n = pts.length, g = (i: N) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`; }
  return d + (closed ? 'Z' : '');
};
const grad = (id: string, stops: [N, string, N?][], vert = true) => <linearGradient id={id} x1="0" y1="0" x2={vert ? 0 : 1} y2={vert ? 1 : 0}>
  {stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}</linearGradient>;
const rgrad = (id: string, stops: [N, string, N?][], cx = .5, cy = .5, r = .5) => <radialGradient id={id} cx={cx} cy={cy} r={r}>
  {stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}</radialGradient>;
const KeyLight: React.FC<{ id: string; from?: 'tl' | 'tr'; a?: N }> = ({ id, from = 'tl', a = 1 }) => <g opacity={a} style={{ pointerEvents: 'none' }}>
  <defs><linearGradient id={id + 'kl'} x1={from === 'tl' ? 0 : 1} y1="0" x2={from === 'tl' ? 1 : 0} y2="1"><stop offset="0" stopColor="#FFF0D0" stopOpacity={.3} /><stop offset=".45" stopColor="#FFF0D0" stopOpacity={0} /><stop offset="1" stopColor="#1A1210" stopOpacity={.42} /></linearGradient>
    <radialGradient id={id + 'vg'} cx=".5" cy=".5" r=".75"><stop offset=".6" stopColor="#1A1210" stopOpacity={0} /><stop offset="1" stopColor="#1A1210" stopOpacity={.3} /></radialGradient></defs>
  <rect x={-100} y={-100} width={2120} height={1280} fill={`url(#${id}kl)`} /><rect x={-100} y={-100} width={2120} height={1280} fill={`url(#${id}vg)`} /></g>;

// THE NEUTRINO: a hot bright core in a vermilion rim, a soft halo, a short tail fading behind it (ang = direction of travel, degrees)
const Spark: React.FC<{ x: N; y: N; ang?: N; len?: N; r?: N; a?: N }> = ({ x, y, ang = 0, len = 70, r = 6, a = 1 }) => {
  if (a <= 0) return null; const c = Math.cos(ang * D), s = Math.sin(ang * D);
  return <g opacity={a}>
    <circle cx={x} cy={y} r={r * 3.4} fill={VER} opacity={.2} />
    {[0, 1, 2, 3, 4, 5].map(i => { const k0 = i / 6, k1 = (i + 1) / 6;
      return <line key={i} x1={f1(x - c * len * k0)} y1={f1(y - s * len * k0)} x2={f1(x - c * len * k1)} y2={f1(y - s * len * k1)} stroke={VER} strokeWidth={f1(r * 1.5 * (1 - k0 * .85))} strokeLinecap="round" opacity={.9 * (1 - k0)} />; })}
    <circle cx={x} cy={y} r={r} fill="#FFE2B0" stroke={VER} strokeWidth={r * .55} />
  </g>;
};

// a small anonymous worker in a hard hat (feet at x, y), facing right (face = 1) or left (-1); lamp lights his helmet lamp
const Worker: React.FC<any> = ({ x, y, h = 120, face = 1, lamp = 0, col = '#C8783A' }) => {
  const u = h / 120, X = (v: N) => x + face * v * u, Y = (v: N) => y - v * u;
  return <g>
    <ellipse cx={x + 6 * u} cy={y} rx={26 * u} ry={5 * u} fill={SEP} opacity={.35} />
    <Line d={`M${X(-3)} ${Y(56)} L${X(-10)} ${Y(0)} M${X(4)} ${Y(56)} L${X(10)} ${Y(0)}`} w={9 * u} col="#2B3B66" a={1} />
    <path d={`M${X(-13)} ${Y(1)} h${face * 12 * u} M${X(8)} ${Y(1)} h${face * 12 * u}`} stroke={SEP} strokeWidth={5 * u} strokeLinecap="round" />
    <path d={`M${X(-14)} ${Y(96)} L${X(14)} ${Y(96)} L${X(15)} ${Y(52)} L${X(-14)} ${Y(52)}Z`} fill={col} stroke={SEP} strokeWidth={1.4 * u} />
    <Line d={`M${X(8)} ${Y(92)} L${X(22)} ${Y(70)} L${X(30)} ${Y(78)}`} w={6.5 * u} col={mix(col, SEP, .2)} a={1} />
    <circle cx={X(2)} cy={Y(106)} r={9.5 * u} fill="#D9A47E" stroke={SEP} strokeWidth={1.2 * u} />
    <path d={`M${X(-10)} ${Y(106)} Q${X(-9)} ${Y(122)} ${X(3)} ${Y(122)} Q${X(14)} ${Y(122)} ${X(14)} ${Y(107)} L${X(17)} ${Y(106)} L${X(-12)} ${Y(105)}Z`} fill="#E8C04A" stroke={SEP} strokeWidth={1.2 * u} />
    <circle cx={X(14)} cy={Y(113)} r={3.4 * u} fill={lamp > 0 ? '#FFF6C8' : '#8C7A5A'} stroke={SEP} strokeWidth={.8 * u} />
    {lamp > 0 && <circle cx={X(14)} cy={Y(113)} r={14 * u} fill="#FFF0B0" opacity={.35 * lamp} />}
  </g>;
};

// ================================================================ 1. CORE DOOR — a heavy round iron furnace door in a dark brick wall
// open 0..1 swings it open on its left hinge onto white-gold blazing heat (light spills over the floor); heat 0..1 shimmer + sparks drift out.
const CoreDoor: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, open = 0, heat = 0 }) => {
  const id = 'sfcd', o = sst(open), th = o * 80 * D, cs = Math.cos(th), cx = 960, cy = 470, R = 250, hx = cx - R, G = 830;
  const fl = .9 + .1 * Math.sin(tm * 11) * Math.sin(tm * 4.3), glow = o * fl, dr = cl(draw * 1.5);
  const rivets = (rad: N, n: N, rr2: N) => Array.from({ length: n }, (_, i) => { const a = i / n * TAU; return <g key={i}><circle cx={f1(cx + Math.cos(a) * rad + 1.5)} cy={f1(cy + Math.sin(a) * rad + 2)} r={rr2} fill="#0E0A08" opacity={.6} /><circle cx={f1(cx + Math.cos(a) * rad)} cy={f1(cy + Math.sin(a) * rad)} r={rr2} fill="#6E655C" stroke={SEP} strokeWidth={1} /><circle cx={f1(cx + Math.cos(a) * rad - rr2 * .3)} cy={f1(cy + Math.sin(a) * rad - rr2 * .3)} r={rr2 * .35} fill="#B8AEA0" /></g>; });
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>
      {grad(id + 'w', [[0, '#3E2C22'], [1, '#1C130E']])}
      {rgrad(id + 'f', [[0, '#FFFFF4'], [.35, '#FFF0B8'], [.7, '#F8BE58'], [1, '#C8602A']])}
      {grad(id + 'sp', [[0, '#FFE6A8', .85], [1, '#FFC860', 0]])}
      {rgrad(id + 'gw', [[0, '#FFD98A', .55], [1, '#FFB050', 0]])}
      {grad(id + 'dr', [[0, '#6E665E'], [.5, '#4A433D'], [1, '#2C2723']], false)}
      <clipPath id={id + 'h'}><circle cx={cx} cy={cy} r={R} /></clipPath>
    </defs>
    {/* the wall: soot-dark brick */}
    <rect x={-100} y={-100} width={2120} height={G + 100} fill={`url(#${id}w)`} />
    {Array.from({ length: 17 }, (_, r) => <g key={r}><Line d={`M-100 ${r * 52} H2020`} w={2} col="#0E0906" a={.5} />
      {Array.from({ length: 22 }, (_, k) => <Line key={k} d={`M${k * 104 + (r % 2) * 52 - 60} ${r * 52} v52`} w={2} col="#0E0906" a={.45} />)}</g>)}
    {/* the floor: stone flags in perspective */}
    <rect x={-100} y={G} width={2120} height={400} fill="#2A1E17" />
    {[G + 28, G + 70, G + 128, G + 210].map((yy, i) => <Line key={i} d={`M-100 ${yy} H2020`} w={1.6} col="#120C08" a={.7} />)}
    {Array.from({ length: 13 }, (_, i) => { const bx = -300 + i * 210; return <Line key={i} d={`M${f1(960 + (bx - 960) * .35)} ${G} L${bx} 1090`} w={1.6} col="#120C08" a={.6} />; })}
    {/* the warm glow around the mouth and the spill of light on the floor */}
    <circle cx={cx} cy={cy} r={R * 2.6} fill={`url(#${id}gw)`} opacity={glow} />
    <path d={`M${cx - R * .9} ${G} L${cx + R * .9} ${G} L${cx + 980} 1090 L${cx - 520} 1090Z`} fill={`url(#${id}sp)`} opacity={glow} />
    <path d={`M${hx + 10} ${G} L${hx + 10 + 60 * o} ${G} L${hx - 340 * o} 1090 L${hx - 560 * o} 1090Z`} fill="#0E0906" opacity={.55 * o} />
    {/* the fire inside the mouth */}
    <circle cx={cx} cy={cy} r={R} fill="#3A1A0E" />
    <g clipPath={`url(#${id}h)`} opacity={cl(o * 4)}>
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}f)`} />
      {Array.from({ length: 9 }, (_, i) => { const bx = cx - R + i * R / 4, hh = 140 + 60 * Math.sin(tm * 5 + i * 1.7);
        return <path key={i} d={`M${bx - 40} ${cy + R} Q${f1(bx - 30 + 18 * Math.sin(tm * 6 + i))} ${f1(cy + R - hh * .6)} ${f1(bx + 10 * Math.sin(tm * 4 + i))} ${f1(cy + R - hh)} Q${f1(bx + 30)} ${f1(cy + R - hh * .5)} ${bx + 40} ${cy + R}Z`} fill="#FFFDF0" opacity={.55} />; })}
      <circle cx={cx} cy={cy + 40} r={R * .45} fill="#FFFFFF" opacity={.7 * fl} filter="url(#b30)" />
    </g>
    {/* the iron surround with its rivets */}
    <path d={`${circ(cx, cy, R + 52)} ${circ(cx, cy, R)}`} fillRule="evenodd" fill="#3C3530" stroke={SEP} strokeWidth={2.4} />
    <circle cx={cx} cy={cy} r={R + 52} fill="none" stroke="#7A6E62" strokeWidth={3} opacity={.5} transform="translate(-2 -2)" />
    {rivets(R + 26, 28, 7)}
    <circle cx={cx} cy={cy} r={R + 3} fill="none" stroke="#FF9A40" strokeWidth={4} opacity={(.25 + .5 * heat) * (1 - o)} filter="url(#b2s)" />
    {/* the door leaf, swinging on its hinge (left); its thick iron edge shows as it turns */}
    {o > .01 && <ellipse cx={f1(hx + R * cs + 26 * Math.sin(th))} cy={cy} rx={f1(R * cs + 4)} ry={R} fill="#1C1815" stroke={SEP} strokeWidth={2} />}
    <g transform={`translate(${hx} 0) scale(${f1(Math.max(.02, cs) * 1000) / 1000} 1) translate(${-hx} 0)`}>
      <circle cx={cx + 8} cy={cy + 10} r={R} fill="#0A0605" opacity={.5} />
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}dr)`} stroke={SEP} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={R * .8} fill="none" stroke="#2A2420" strokeWidth={10} />
      <circle cx={cx} cy={cy} r={R * .8} fill="none" stroke="#8A8076" strokeWidth={2} transform="translate(-3 -3)" />
      <rect x={cx - R * .97} y={cy - 150} width={R * 1.94} height={38} fill="#3A332E" stroke={SEP} strokeWidth={2} />
      <rect x={cx - R * .97} y={cy + 112} width={R * 1.94} height={38} fill="#3A332E" stroke={SEP} strokeWidth={2} />
      {Array.from({ length: 9 }, (_, i) => <g key={i}><circle cx={cx - R * .8 + i * R * .2} cy={cy - 131} r={6} fill="#6E655C" stroke={SEP} /><circle cx={cx - R * .8 + i * R * .2} cy={cy + 131} r={6} fill="#6E655C" stroke={SEP} /></g>)}
      {rivets(R * .9, 24, 6)}
      {/* hinges on the left */}
      {[-120, 120].map((dy, i) => <g key={i}><rect x={hx - 30} y={cy + dy - 24} width={170} height={48} rx={10} fill="#2E2925" stroke={SEP} strokeWidth={2} /><circle cx={hx - 14} cy={cy + dy} r={16} fill="#4A433D" stroke={SEP} strokeWidth={2} /></g>)}
      {/* the big handle: a lever bar on two brackets with a ball knob */}
      <rect x={cx + R * .5} y={cy - 70} width={26} height={22} fill="#2E2925" stroke={SEP} strokeWidth={1.6} />
      <rect x={cx + R * .5} y={cy + 48} width={26} height={22} fill="#2E2925" stroke={SEP} strokeWidth={1.6} />
      <rect x={cx + R * .5 + 34} y={cy - 110} width={24} height={220} rx={12} fill="#5A524A" stroke={SEP} strokeWidth={2.4} />
      <rect x={cx + R * .5 + 18} y={cy - 64} width={30} height={10} fill="#3A332E" /><rect x={cx + R * .5 + 18} y={cy + 54} width={30} height={10} fill="#3A332E" />
      <circle cx={cx + R * .5 + 46} cy={cy + 120} r={22} fill="#6E655C" stroke={SEP} strokeWidth={2.4} />
      <circle cx={cx + R * .5 + 40} cy={cy + 113} r={7} fill="#C8BEB0" />
      <path d={`M${cx - R * .5} ${cy - R * .6} Q${cx} ${cy - R * .88} ${cx + R * .5} ${cy - R * .6}`} stroke="#9A9086" strokeWidth={5} fill="none" opacity={.5} />
    </g>
    {/* heat: shimmer rising off the mouth, sparks drifting out */}
    {heat > 0 && o > 0 && Array.from({ length: 7 }, (_, i) => { const bx = cx - 240 + i * 80, pts: Pt[] = Array.from({ length: 9 }, (_, k) => [bx + 16 * Math.sin(tm * 4 + k * 1.1 + i), cy - R * .3 - k * 70]);
      return <path key={i} d={sm(pts)} stroke="#FFEFC0" strokeWidth={5} fill="none" opacity={.22 * heat * o} />; })}
    {heat > 0 && Array.from({ length: 30 }, (_, i) => { const p = fr(tm * .3 + rnd(i * 3.1)), sx = cx + (rnd(i + 1) - .5) * R * 1.2 + (rnd(i + 2) - .3) * 520 * p + Math.sin(tm * 3 + i) * 14, sy = cy + (rnd(i + 3) - .2) * R * .8 - p * 620 + p * p * 160;
      return <circle key={i} cx={f1(sx)} cy={f1(sy)} r={f1(2 + rnd(i + 4) * 3.5)} fill="#FFE6A0" stroke="#E8782E" strokeWidth={1.2} opacity={heat * o * (1 - p)} />; })}
    <KeyLight id={id} a={.55} />
  </g>;
};

// ================================================================ 2. PROTON DANCE — inside the Sun's core: protons as little red-orange dancers
// jostle 0..1 phase of the crowd's dance; bump 0..1 two in the centre rush together and spring apart ("boing"); magnets 0..1 inset of two
// bar magnets N–N pushing apart; fuse 0..1 the central two crash and fuse in a white flash into one bigger ball; chain 0..1 four dancers join
// hands one after another and become ONE bigger yellow helium ball ("He"), sparks fly off.
const Dancer: React.FC<any> = ({ x, y, r = 60, t = 0, col = '#D8603A', lab = '+', reach = 0, op: a = 1, labCol = '#FFF4DC' }) => {
  if (a <= 0) return null;
  const b = Math.sin(t * TAU) * r * .1, Y = y + b, sw = Math.sin(t * TAU * 2), lw = Math.max(2.5, r * .085);
  const arm = (sd: N) => { const sx = x + sd * r * .86, sy = Y + r * .02, ang = lerp(55 + sd * sw * 28, 2, reach), ex = sx + sd * Math.cos(ang * D) * r * .45, ey = sy + Math.sin(ang * D) * r * .45,
    ang2 = lerp(-30 + sd * sw * 30, 0, reach), hx = ex + sd * Math.cos(ang2 * D) * r * .4, hy = ey + Math.sin(ang2 * D) * r * .4;
    return <g><path d={`M${f1(sx)} ${f1(sy)} L${f1(ex)} ${f1(ey)} L${f1(hx)} ${f1(hy)}`} stroke={SEP} strokeWidth={lw} fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx={f1(hx)} cy={f1(hy)} r={f1(r * .1)} fill={col} stroke={SEP} strokeWidth={1.2} /></g>; };
  const leg = (sd: N) => { const lift = Math.max(0, sd * sw) * r * .18, fx = x + sd * r * .42, fy = Y + r * 1.32 - lift;
    return <g><path d={`M${f1(x + sd * r * .32)} ${f1(Y + r * .85)} L${f1(fx)} ${f1(fy)}`} stroke={SEP} strokeWidth={lw} strokeLinecap="round" /><ellipse cx={f1(fx + sd * r * .1)} cy={f1(fy + r * .03)} rx={f1(r * .19)} ry={f1(r * .09)} fill={SEP} /></g>; };
  return <g opacity={a}>
    <ellipse cx={x + r * .1} cy={y + r * 1.38} rx={r * .8} ry={r * .12} fill="#B0602A" opacity={.3} />
    {leg(-1)}{leg(1)}
    <Ball x={x} y={Y} r={r} col={col} sw={Math.max(1.4, r * .03)} />
    <circle cx={f1(x - r * .28)} cy={f1(Y - r * .22)} r={f1(r * .085)} fill={SEP} /><circle cx={f1(x + r * .24)} cy={f1(Y - r * .22)} r={f1(r * .085)} fill={SEP} />
    <path d={`M${f1(x - r * .16)} ${f1(Y - r * .02)} Q${f1(x)} ${f1(Y + r * .12)} ${f1(x + r * .14)} ${f1(Y - r * .02)}`} stroke={SEP} strokeWidth={Math.max(1.4, r * .04)} fill="none" strokeLinecap="round" />
    <text x={f1(x)} y={f1(Y + r * .72)} fontSize={f1(r * (lab.length > 1 ? .62 : .8))} fontFamily="'IM Fell English', serif" fontWeight="bold" fill={labCol} textAnchor="middle" stroke={SEP} strokeWidth={Math.max(.8, r * .02)}>{lab}</text>
    {arm(-1)}{arm(1)}
  </g>;
};
const CROWD: [N, N, N][] = [[230, 250, 46], [520, 170, 42], [1400, 170, 42], [1700, 260, 48], [820, 230, 44], [1110, 190, 40], [170, 600, 60], [1760, 640, 60], [380, 860, 70], [720, 900, 74], [1240, 900, 72], [1590, 870, 70]];
const CHAINI = [4, 5, 9, 10];
const ProtonDance: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, jostle = 0, bump = 0, magnets = 0, fuse = 0, chain = 0 }) => {
  const id = 'sfpd', J = jostle + tm * .05, dr = cl(draw * 1.5);
  const cA = 1 - ph(chain, 0, .15), fz = sst(ph(fuse, 0, .45)), sep0 = 380 - 290 * Math.sin(Math.PI * cl(bump)), sep = lerp(sep0, 0, fz);
  const pairA = (1 - ph(fuse, .45, .55)) * cA, mergedA = ph(fuse, .45, .6) * cA, flash = bell(fuse, .38, .7);
  const SLOTS: Pt[] = [[690, 560], [870, 560], [1050, 560], [1230, 560]];
  const crowdPos = (i: N): Pt => { const [bx, by] = CROWD[i]; return [bx + Math.sin((J * 2 + rnd(i)) * TAU) * 40 + Math.sin(tm * 1.3 + i) * 6, by + Math.cos((J * 3 + rnd(i + 5)) * TAU) * 24]; };
  const merge = sst(ph(chain, .62, .82)), he = sst(ph(chain, .7, .9)), fly = ph(chain, .74, 1);
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{rgrad(id + 'bg', [[0, '#FFFFFF'], [.35, '#FFF6C8'], [.7, '#FFD060'], [1, '#F08A28']], .5, .5, .75)}
      {rgrad(id + 'fl', [[0, '#FFFFFF', 1], [.5, '#FFFBE8', .8], [1, '#FFF4D2', 0]])}</defs>
    <rect x={-100} y={-100} width={2120} height={1280} fill={`url(#${id}bg)`} />
    {/* soft turbulence: the boiling plasma */}
    {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={f1(rnd(i) * 1920 + Math.sin(tm * .3 + i) * 60)} cy={f1(rnd(i + 20) * 1080 + Math.cos(tm * .25 + i) * 40)} rx={160 + rnd(i + 3) * 200} ry={90 + rnd(i + 4) * 120} fill={i % 2 ? '#FFFFF0' : '#FFC04A'} opacity={.45} filter="url(#b30)" />)}
    {Array.from({ length: 12 }, (_, i) => { const yy = 80 + i * 90, ph0 = tm * .6 + i; return <path key={i} d={`M-50 ${yy} Q${f1(400 + 120 * Math.sin(ph0))} ${f1(yy - 50)} 960 ${yy} T1980 ${yy}`} stroke="#E89A3E" strokeWidth={2} fill="none" opacity={.18} />; })}
    {/* the crowd (far ones small and pale) */}
    {CROWD.map((c, i) => { if (CHAINI.includes(i) && chain > 0) return null; const [px, py] = crowdPos(i);
      return <Dancer key={i} x={px} y={py} r={c[2]} t={J * 4 + rnd(i + 9) + tm * .4} op={c[2] < 50 ? .78 : 1} />; })}
    {/* the four that join hands and become helium */}
    {chain > 0 && CHAINI.map((ci, k) => { const p = sst(ph(chain, k * .12, k * .12 + .24)), [px, py] = crowdPos(ci), sl = SLOTS[k];
      const tx = lerp(lerp(px, sl[0], p), 960, merge), ty = lerp(lerp(py, sl[1], p), 560, merge);
      return <Dancer key={'c' + k} x={tx} y={ty} r={lerp(CROWD[ci][2], 66, p) * (1 - merge * .5)} t={J * 4 + k * .3} reach={ph(chain, k * .12 + .18, k * .12 + .3)} op={1 - he} />; })}
    {he > 0 && <g>
      <circle cx={960} cy={570} r={200 * he} fill="#FFF4C0" opacity={.5 * he} filter="url(#b30)" />
      <Dancer x={960} y={560} r={120 * (.4 + .6 * he)} t={tm * .3} col="#F2C94C" lab="He" labCol={SEP} op={he} />
    </g>}
    {fly > 0 && fly < 1 && Array.from({ length: 7 }, (_, i) => { const ang = -150 + i * 50 + rnd(i) * 20, d = 140 + fly * 820, px = 960 + Math.cos(ang * D) * d, py = 560 + Math.sin(ang * D) * d;
      return i % 2 === 0 ? <Spark key={i} x={px} y={py} ang={ang} r={8} len={110} a={1 - fly * .6} /> : <g key={i} opacity={1 - fly}><circle cx={f1(px)} cy={f1(py)} r={14} fill="#FFFFFF" /><circle cx={f1(px)} cy={f1(py)} r={34} fill="#FFF4C0" opacity={.5} /></g>; })}
    {/* the central pair: bump and bounce; fuse */}
    {pairA > 0 && <g>
      {[-1, 1].map(sd => <Dancer key={sd} x={960 + sd * sep / 2 + sd * 70} y={560 - (bump > 0 && bump < 1 ? Math.sin(Math.PI * ph(bump, .5, 1)) * 60 : 0)} r={74} t={tm * .5 + (sd > 0 ? .5 : 0)} reach={bell(bump, .3, .6) * .6} op={pairA} />)}
      {bump > .4 && bump < .95 && fuse < .1 && <g opacity={bell(bump, .4, .95)}>
        {[-1, 1].map(sd => <path key={sd} d={`M${960 + sd * 80} 470 Q${960 + sd * 240} 330 ${960 + sd * 330} 470`} stroke={SEP} strokeWidth={3} strokeDasharray="10 9" fill="none" />)}
        <path d="M960 420 l0 -40 M930 428 l-22 -30 M990 428 l22 -30" stroke={SEP} strokeWidth={4} strokeLinecap="round" />
        <Hand x={960} y={330} s={70} t="boing!" />
      </g>}
    </g>}
    {mergedA > 0 && <Dancer x={960} y={560} r={96} t={tm * .4} col="#D85A30" lab="+ +"  op={mergedA} />}
    {flash > 0 && <circle cx={960} cy={560} r={120 + 380 * ph(fuse, .38, .7)} fill={`url(#${id}fl)`} opacity={flash} />}
    {/* the magnets inset: like poles push apart */}
    {magnets > 0 && <g opacity={ph(magnets, 0, .2)}>
      <rect x={1366} y={86} width={460} height={250} rx={6} fill={SEP} opacity={.3} filter="url(#b8)" />
      <rect x={1352} y={72} width={460} height={250} rx={6} fill="#FBF4E2" stroke={SEP} strokeWidth={2.4} />
      <rect x={1362} y={82} width={440} height={230} rx={4} fill="none" stroke={SEP} strokeWidth={1} />
      {[-1, 1].map(sd => { const gap = 20 + sst(magnets) * 70 + Math.sin(tm * 9) * 2 * magnets, mx = 1582 + sd * (gap / 2 + 75), N0 = mx - sd * 37.5, S0 = mx + sd * 37.5;
        return <g key={sd}>
          <rect x={N0 - 37.5} y={176} width={75} height={50} fill="#C23A2A" stroke={SEP} strokeWidth={2} />
          <rect x={S0 - 37.5} y={176} width={75} height={50} fill="#2E5C9A" stroke={SEP} strokeWidth={2} />
          <text x={N0} y={213} fontSize={34} fill="#FFF4DC" textAnchor="middle" fontFamily="'IM Fell English SC', serif">N</text>
          <text x={S0} y={213} fontSize={34} fill="#FFF4DC" textAnchor="middle" fontFamily="'IM Fell English SC', serif">S</text>
          {[0, 1, 2].map(k => <path key={k} d={`M${mx - sd * (gap / 2 + 75) + sd * gap / 2 - sd * 6} ${176 - k * 6} q${sd * 10} ${-30 - k * 18} ${sd * 50 + sd * k * 16} ${-40 - k * 16}`} stroke={SEP} strokeWidth={1.4} fill="none" opacity={.7} />)}
          <path d={`M${mx + sd * 85} 266 h${sd * 70} m${-sd * 14} -9 l${sd * 14} 9 l${-sd * 14} 9`} stroke={VER} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={ph(magnets, .3, .6)} />
        </g>; })}
    </g>}
    <rect x={-100} y={-100} width={2120} height={1280} fill="none" stroke="#B0602A" strokeWidth={160} opacity={.18} filter="url(#b30)" />
  </g>;
};

// ================================================================ 3. TYPEWRITER — 1938, a desk at night: black typewriter, desk lamp, a long strip of paper
// (LEFT THIRD CLEAR for Bethe seated). type 0..1 lines appear letter by letter; rise 0..1 the page lifts off and floats toward a small drawn Sun
// (top right); thermo 0..1 a glass thermometer reaches toward that Sun and droops / melts; slip 0..1 the "ν" slips off and streaks away as a spark.
const LINES = ['H + H → D + ν', 'D + H → He³', 'He³ + He³ → He', 'H + H → … → He'];
const Typewriter: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, type = 0, rise = 0, thermo = 0, slip = 0 }) => {
  const id = 'sftw', dr = cl(draw * 1.5), DK = 790, rk = sst(rise), sunA = cl(Math.max(rise, thermo, slip) * 3), SX = 1660, SY = 160;
  const total = LINES.reduce((a, l) => a + l.length, 0), nT = Math.floor(type * total);
  let used = 0; const shown = LINES.map(l => { const k = cl(nT - used, 0, l.length); used += l.length; return l.slice(0, k); }), cur = shown.findIndex((l, i) => l.length < LINES[i].length);
  const lineY = (i: N) => 330 + i * 64, PX0 = 930, PX1 = 1270, PCX = 1100, CW = 19.2;
  // the ν in line 0: where it sits on the page
  const nuY = lineY(0), sl1 = ph(slip, 0, .35), sl2 = ph(slip, .3, 1);
  // thermometer centreline
  const B: Pt = [1450, 770], tLen = lerp(80, 520, sst(ph(thermo, 0, .5))), droop = sst(ph(thermo, .5, 1)), a0 = Math.atan2(SY + 60 - B[1], SX - 40 - B[0]);
  const tp: Pt[] = []; { let px = B[0], py = B[1]; for (let i = 0; i <= 16; i++) { const t = i / 16, a = a0 + droop * t * t * 150 * D; tp.push([px, py]); px += Math.cos(a) * tLen / 16; py += Math.sin(a) * tLen / 16; } }
  const tip = tp[tp.length - 1], merc = Math.round(lerp(3, 15, cl(thermo * 1.2)));
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{grad(id + 'w', [[0, '#1C2238'], [1, '#2E2A30']])}{grad(id + 'd', [[0, '#6A4430'], [1, '#3A2418']])}
      {rgrad(id + 'lp', [[0, '#FFE6A8', .8], [.5, '#FFD27A', .35], [1, '#FFD27A', 0]])}
      {rgrad(id + 'sun', [[0, '#FFF6D0'], [.6, '#F3D07A'], [1, '#E0A040']])}</defs>
    {/* the night room */}
    <rect x={-100} y={-100} width={2120} height={DK + 100} fill={`url(#${id}w)`} />
    <Stipple x={0} y={0} w={1920} h={DK} n={900} seed="sftw" col="#0B0E1A" a={.4} />
    <ellipse cx={1420} cy={560} rx={640} ry={420} fill={`url(#${id}lp)`} opacity={.55} />
    {/* the desk */}
    <path d={`M-100 ${DK} H2020 V1180 H-100Z`} fill={`url(#${id}d)`} />
    {Array.from({ length: 6 }, (_, i) => <Line key={i} d={`M-100 ${DK + 20 + i * 48} Q960 ${DK + 30 + i * 48} 2020 ${DK + 16 + i * 50}`} w={1.2} col="#2A1810" a={.45} />)}
    <Line d={`M-100 ${DK} H2020`} w={3} col={SEP} a={1} />
    <ellipse cx={1250} cy={DK + 90} rx={560} ry={120} fill="#FFE2A0" opacity={.32} filter="url(#b30)" />
    {/* the desk lamp (the light of the scene): base, arm, green shade */}
    <g transform="translate(170 0)"><ellipse cx={1690} cy={DK + 64} rx={95} ry={22} fill={SEP} opacity={.45} filter="url(#b8)" />
    <path d={`M1610 ${DK + 60} Q1690 ${DK + 20} 1770 ${DK + 60}Z`} fill="#1E2420" stroke={SEP} strokeWidth={2} />
    <Line d={`M1690 ${DK + 38} L1720 520 L1570 420`} w={9} col="#1A1A18" a={1} />
    <circle cx={1720} cy={520} r={10} fill="#3A3A34" stroke={SEP} strokeWidth={1.6} />
    <path d="M1590 380 L1460 470 Q1500 540 1600 520 L1650 440Z" fill="#2F5440" stroke={SEP} strokeWidth={2.4} />
    <path d="M1462 470 Q1500 540 1600 520" stroke="#FFF2C0" strokeWidth={8} fill="none" opacity={.9} />
    <path d={`M1470 488 L1150 ${DK + 140} L1700 ${DK + 140} L1598 522Z`} fill="#FFE8A8" opacity={.08} /></g>
    {/* the long paper strip (rises off the roller) */}
    <g transform={`translate(${f1(rk * 430)} ${f1(-rk * 300)}) rotate(${f1(-rk * 14 + Math.sin(tm * 1.4) * 3 * rk)} ${PCX} 400) translate(${PCX} 400) scale(${f1(1 - rk * .62)}) translate(${-PCX} -400)`}>
      <path d={`M${PX0 + 14} 116 L${PX1 + 14} 116 L${PX1 + 14} 640 L${PX0 + 14} 640Z`} fill={SEP} opacity={.3} filter="url(#b8)" />
      <path d={`M${PX0} 110 Q${PCX} 96 ${PX1} 110 L${PX1} 630 L${PX0} 630Z`} fill="#FBF4E2" stroke={SEP} strokeWidth={1.8} />
      <path d={`M${PX0} 110 Q${PCX} 96 ${PX1} 110 Q${PCX} 132 ${PX0} 110Z`} fill="#E6D6B4" stroke={SEP} strokeWidth={1} />
      {shown.map((t, i) => { const txt = i === 0 && slip > 0 && t.endsWith('ν') ? t.slice(0, -1) : t;
        return <text key={i} x={PX0 + 18} y={lineY(i)} fontSize={32} fontFamily={FIG} fill="#1A1410" opacity={.9}>{txt}</text>; })}
      {nT < total && type > 0 && rise < .05 && cur >= 0 && <rect x={PX0 + 18 + shown[cur].length * CW} y={lineY(cur) + 6} width={16} height={3} fill={VER} opacity={fr(tm * 2) < .5 ? 1 : .3} />}
      {slip > 0 && sl2 < .05 && shown[0].endsWith('ν') && <text x={PX0 + 18 + 12 * CW} y={nuY + sl1 * 260} fontSize={32} fontFamily={FIG} fill={VER} transform={`rotate(${f1(sl1 * 40)} ${PX0 + 18 + 12 * CW + 8} ${nuY + sl1 * 260})`}>ν</text>}
    </g>
    {/* the typewriter: black, round keys, roller on top */}
    <ellipse cx={1050} cy={DK + 95} rx={330} ry={34} fill={SEP} opacity={.5} filter="url(#b8)" />
    <path d={`M860 ${DK + 82} L900 640 L1300 640 L1340 ${DK + 82}Z`} fill="#1A1816" stroke={SEP} strokeWidth={2.4} />
    <path d="M900 640 L1300 640 L1290 660 L910 660Z" fill="#3A3632" />
    <path d={`M880 ${DK + 30} L1320 ${DK + 30}`} stroke="#5A5650" strokeWidth={2} />
    <rect x={850} y={606} width={500} height={40} rx={20} fill="#2A2724" stroke={SEP} strokeWidth={2.4} />
    <rect x={856} y={612} width={488} height={10} rx={5} fill="#6A665E" opacity={.7} />
    <circle cx={836} cy={626} r={26} fill="#2A2724" stroke={SEP} strokeWidth={2} /><circle cx={1364} cy={626} r={26} fill="#2A2724" stroke={SEP} strokeWidth={2} />
    <Line d="M836 626 L780 560 L760 566" w={7} col="#B8B0A0" a={1} />
    {[0, 1, 2, 3].map(r => Array.from({ length: 11 - (r === 3 ? 4 : 0) }, (_, k) => { const n = 11 - (r === 3 ? 4 : 0), kx = 1100 + (k - (n - 1) / 2) * (34 + r * 2), ky = 690 + r * 34;
      return <g key={r + '_' + k}><circle cx={kx + 2} cy={ky + 4} r={13} fill="#0A0908" /><circle cx={kx} cy={ky} r={13} fill="#2E2B28" stroke="#B8B0A0" strokeWidth={2.4} /><circle cx={kx - 3} cy={ky - 3} r={3} fill="#F0E8D8" opacity={.7} /></g>; }))}
    <rect x={990} y={830} width={220} height={22} rx={10} fill="#2E2B28" stroke="#B8B0A0" strokeWidth={2} />
    <path d="M1300 650 Q1340 700 1320 790" stroke="#8A8478" strokeWidth={3} fill="none" opacity={.6} />
    {/* a cup and a stack of papers at the left end of the desk (in front of the clear area) */}
    <path d={`M560 ${DK + 120} l200 -12 l40 50 l-200 14Z`} fill="#EFE2C6" stroke={SEP} strokeWidth={1.4} />
    <path d={`M556 ${DK + 128} l200 -12 l40 50 l-200 14Z`} fill="#F7EEDA" stroke={SEP} strokeWidth={1.4} />
    {/* the drawn Sun the page flies to */}
    {sunA > 0 && <g opacity={sunA}>
      {Array.from({ length: 16 }, (_, i) => { const a = i / 16 * TAU + tm * .1; return <path key={i} d={`M${f1(SX + Math.cos(a) * 74)} ${f1(SY + Math.sin(a) * 74)} Q${f1(SX + Math.cos(a + .12) * 92)} ${f1(SY + Math.sin(a + .12) * 92)} ${f1(SX + Math.cos(a) * (i % 2 ? 104 : 118))} ${f1(SY + Math.sin(a) * (i % 2 ? 104 : 118))}`} stroke="#E0A040" strokeWidth={4} fill="none" strokeLinecap="round" />; })}
      <circle cx={SX} cy={SY} r={130} fill="#FFE6A0" opacity={.25} filter="url(#b30)" />
      <circle cx={SX} cy={SY} r={62} fill={`url(#${id}sun)`} stroke={SEP} strokeWidth={2.4} />
    </g>}
    {/* the thermometer reaching for it, drooping as it melts */}
    {thermo > 0 && <g>
      <path d={sm(tp)} stroke={SEP} strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d={sm(tp)} stroke="#E6F2F2" strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d={sm(tp.slice(0, merc + 1))} stroke="#C8402A" strokeWidth={11} fill="none" strokeLinecap="round" />
      {tp.slice(2, 15).map((p, i) => i % 2 === 0 ? <circle key={i} cx={f1(p[0])} cy={f1(p[1])} r={2} fill={SEP} opacity={.6} /> : null)}
      <path d={sm(tp)} stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={.8} transform="translate(-6 -4)" />
      <circle cx={B[0]} cy={B[1]} r={30} fill="#C8402A" stroke={SEP} strokeWidth={3} /><circle cx={B[0] - 9} cy={B[1] - 9} r={7} fill="#FFD0C0" />
      {droop > .3 && [0, 1].map(k => { const p = fr(tm * .7 + k * .5); return <ellipse key={k} cx={tip[0] + k * 8} cy={tip[1] + 20 + p * 160} rx={7} ry={11} fill="#E6F2F2" stroke={SEP} strokeWidth={1.6} opacity={(droop - .3) * (1 - p)} />; })}
    </g>}
    {/* the ν that slips off and streaks away as a spark */}
    {sl2 > 0 && sl2 < 1 && (() => { const sx0 = PX0 + 26 + 12 * CW, sy0 = nuY + 260, px = lerp(sx0, 2100, Math.pow(sl2, 1.6)), py = lerp(sy0, sy0 - 220, sl2);
      return <Spark x={px} y={py} ang={-10} r={7} len={60 + sl2 * 240} />; })()}
    <KeyLight id={id} from="tr" a={.75} />
  </g>;
};

// ================================================================ 4. NEUTRINO FLIGHT — the Sun at left, the Earth at right, a stream of sparks
// k 0..1 the stream pours out of the Sun and reaches the Earth (and beyond); glass 0..1 the Earth turns glass-clear: the sparks go straight through.
type LL = [N, N];
const pr = (a: N[]): LL[] => { const o: LL[] = []; for (let i = 0; i < a.length; i += 2) o.push([a[i], a[i + 1]]); return o; };
const GEO: Record<string, LL[]> = {
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
  MG: pr([44, -25, 47, -25, 50.5, -15.5, 49.3, -12, 48, -13.5, 44, -17, 43.3, -22]),
  GB: pr([-5.7, 50, 1.4, 51.2, 1.7, 52.7, 0, 53.5, -1.6, 55.6, -2, 57.6, -3, 58.6, -5, 58.6, -6.2, 56.5, -4.8, 54.8, -3, 53.4, -4.6, 52.8, -5.2, 51.7]),
  IE: pr([-6, 52.2, -6.2, 54, -7.5, 55.2, -10, 54.2, -10.3, 51.8, -8, 51.5]),
  SA: pr([-77.5, 8.5, -75, 10.8, -71.5, 12.3, -68, 10.5, -63, 10.6, -60, 8.5, -57, 6, -53, 5.5, -51, 4, -50, 1.5, -48.5, -1, -44.5, -2.5, -41, -3, -38.5, -3.7, -35.2, -5.5, -34.8, -7.5, -35.3, -9.5,
    -37.5, -12, -39, -14, -39, -17.5, -40.5, -20.5, -42, -23, -44.5, -23.3, -47.5, -25, -48.6, -28, -50.5, -30.5, -53, -33.5, -56.5, -35, -57.5, -38, -62, -39, -62.3, -41, -64.5, -42.5, -65.5, -45,
    -67.5, -46.5, -66, -48, -68.3, -50.5, -69, -52.5, -68.5, -54.5, -71.5, -54, -74, -52, -75.5, -48, -74, -44, -73.6, -40, -73.5, -37, -71.6, -33, -71.4, -28, -70.5, -23.5, -70.3, -18.5, -72, -17,
    -75.5, -15, -77.5, -12, -79.5, -8, -81.2, -5.5, -80.3, -3, -80.5, -.5, -80, 1, -78.8, 1.8, -77.3, 4, -77.4, 7]),
  AN: pr([-180, -78, -150, -77, -120, -73.5, -90, -72.5, -75, -73, -65, -68, -60, -63.5, -57, -64, -60, -70, -45, -78, -30, -76, -15, -72, 0, -70, 30, -69, 60, -67, 90, -66.5, 120, -66.5, 150, -68,
    165, -71, 170, -75, 180, -78, 180, -90, -180, -90]),
};
const ortho = (lo: N, la: N, lo0: N, la0: N): [N, N, N] => { const l = (lo - lo0) * D, p = la * D, p0 = la0 * D;
  return [Math.cos(p) * Math.sin(l), -(Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)]; };
const dens = (L: LL[], step = 2.5): LL[] => { const o: LL[] = [], n = L.length;
  for (let i = 0; i < n; i++) { const a = L[i], b = L[(i + 1) % n], k = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let j = 0; j < k; j++) o.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k]); } return o; };
const gPoly = (L: LL[], cx: N, cy: N, r: N, lo0: N, la0: N) => { const P = dens(L).map(q => ortho(q[0], q[1], lo0, la0)); if (!P.some(p => p[2] > .02)) return '';
  return 'M' + P.map(([X, Y, Z]) => { if (Z < 0) { const h = Math.hypot(X, Y) || 1; X /= h; Y /= h; } return `${f1(cx + X * r)} ${f1(cy + Y * r)}`; }).join(' L') + 'Z'; };
const Earth: React.FC<any> = ({ cx, cy, r, glass = 0, id, lo0 = 12, la0 = 18 }) => {
  const lands = Object.keys(GEO).map(k => gPoly(GEO[k], cx, cy, r, lo0, la0)).filter(Boolean);
  return <g>
    <defs><clipPath id={id + 'c'}><circle cx={cx} cy={cy} r={r} /></clipPath>
      {grad(id + 'tm', [[0, '#000000', 0], [.5, '#000000', 0], [.8, '#0B1030', .65], [1, '#0B1030', .85]], false)}</defs>
    <g opacity={1 - glass * .82}>
      <circle cx={cx} cy={cy} r={r} fill="#3E7FA3" />
      <g clipPath={`url(#${id}c)`}>{lands.map((d, i) => <path key={i} d={d} fill={i === 0 || i === 1 ? '#C9AE6C' : '#B9A866'} stroke={SEP} strokeWidth={1.4} />)}
        {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx={cx - r * .5 + rnd(i) * r} cy={cy - r * .7 + rnd(i + 4) * r * 1.3} rx={40 + rnd(i + 2) * 50} ry={9} fill="#FFFFFF" opacity={.55} />)}
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill={`url(#${id}tm)`} /></g>
    </g>
    {glass > 0 && <g opacity={glass}>
      <circle cx={cx} cy={cy} r={r} fill="#DDF2FA" opacity={.12} />
      <g clipPath={`url(#${id}c)`}>{lands.map((d, i) => <path key={i} d={d} fill="#E8F4F0" fillOpacity={.08} stroke="#CFEAF0" strokeWidth={1.6} />)}</g>
      <ellipse cx={cx - r * .4} cy={cy - r * .45} rx={r * .32} ry={r * .14} fill="#FFFFFF" opacity={.45} transform={`rotate(-35 ${cx - r * .4} ${cy - r * .45})`} />
    </g>}
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={glass > .5 ? '#CFEAF0' : SEP} strokeWidth={2.6} />
    <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="#9CCAD6" strokeWidth={6} opacity={.35} />
  </g>;
};
const NeutrinoFlight: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, k = 0, glass = 0 }) => {
  const id = 'sfnf', dr = cl(draw * 1.5), SC: Pt = [-70, 540], SR = 430, EC: Pt = [1430, 540], ER = 250, front = 360 + sst(k) * 1900, g = sst(glass);
  const sp = Array.from({ length: 64 }, (_, i) => { const p = fr(tm * .2 + rnd(i * 1.7)), lane = 540 + (rnd(i + 11) - .5) * 600, sx = 330 + p * 1750;
    return { x: sx, y: lane + (sx - 330) * (rnd(i + 3) - .5) * .05, r: 4 + rnd(i + 5) * 3, a: cl((sx - 340) / 120) * cl((front - sx) / 60) }; }).filter(q => q.a > 0);
  const sparks = sp.map((q, i) => <Spark key={i} x={q.x} y={q.y} r={q.r} len={50 + q.r * 8} a={q.a} />);
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{rgrad(id + 'sun', [[0, '#FFFBEA'], [.55, '#FFE6A0'], [.85, '#F3B44A'], [1, '#D8742E']])}{rgrad(id + 'co', [[0, '#FFE6A0', .5], [1, '#FFE6A0', 0]])}
      <clipPath id={id + 'ec'}><circle cx={EC[0]} cy={EC[1]} r={ER} /></clipPath></defs>
    <NightWash x={-100} y={-100} w={2120} h={1280} seed="sfnf" />
    {starField(31, 160, 0, 0, 1920, 1080).map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r * .8} a={.8} />)}
    <circle cx={SC[0]} cy={SC[1]} r={SR * 1.6} fill={`url(#${id}co)`} />
    <circle cx={SC[0]} cy={SC[1]} r={SR} fill={`url(#${id}sun)`} stroke="#B0602A" strokeWidth={3} />
    {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={f1(SC[0] + rnd(i) * SR * .8)} cy={f1(SC[1] + (rnd(i + 3) - .5) * SR * 1.6)} r={8 + rnd(i + 6) * 14} fill="#F6C266" opacity={.35} />)}
    <path d={`M${SC[0] + SR * .2} ${SC[1] - SR * .97} Q${SC[0] + SR * 1.08} ${SC[1]} ${SC[0] + SR * .2} ${SC[1] + SR * .97}`} stroke="#E89A3E" strokeWidth={10} fill="none" opacity={.4} />
    {sparks}
    <Earth cx={EC[0]} cy={EC[1]} r={ER} glass={g} id={id + 'e'} />
    {/* sunlit side: the light comes from the Sun on the left */}
    <g clipPath={`url(#${id}ec)`} opacity={g}>{sparks}</g>
    {/* beyond the Earth, sparks go on unslowed */}
    <KeyLight id={id} a={.35} />
  </g>;
};

// ================================================================ 5. THUMB RAIN — a morning street; a man with a coffee walks; sparks rain straight through him
// walk 0..1 his walk across (stride cycle); rain 0..1 sparks fall; thumb 0..1 a close-up inset of his thumb on the cup (sparks through the nail);
// mouth 0..1 the thumbnail becomes a dark round hole — the top of a mine shaft — and grows to fill the frame.
const Walker: React.FC<any> = ({ mx, G, phase, id, coat = '#3A3F4E' }) => {
  const leg = (p: N): Pt[] => { const hp = Math.sin(p * TAU) * 24, flex = 6 + 52 * Math.pow(Math.max(0, Math.cos(p * TAU)), 1.5), tA = (90 - hp) * D, sA = tA + flex * D, fA = -flex * .3 * D;
    const k: Pt = [Math.cos(tA) * 98, Math.sin(tA) * 98], an: Pt = [k[0] + Math.cos(sA) * 92, k[1] + Math.sin(sA) * 92]; return [[0, 0], k, an, [an[0] + Math.cos(fA) * 30, an[1] + Math.sin(fA) * 30]]; };
  const L1 = leg(phase), L2 = leg(phase + .5), low = Math.max(L1[2][1], L2[2][1], L1[3][1] - 4, L2[3][1] - 4), hip: Pt = [mx, G - low - 14];
  const off = (L: Pt[]) => L.map(p => [p[0] + hip[0], p[1] + hip[1]] as Pt), A = off(L1), Bq = off(L2);
  const shoe = (L: Pt[]) => <path d={`M${f1(L[2][0] - 10)} ${f1(L[2][1] - 6)} L${f1(L[3][0] + 10)} ${f1(L[3][1] - 4)} Q${f1(L[3][0] + 14)} ${f1(L[3][1] + 12)} ${f1(L[3][0])} ${f1(L[3][1] + 12)} L${f1(L[2][0] - 14)} ${f1(L[2][1] + 12)}Z`} fill="#1E1612" stroke={SEP} strokeWidth={1.6} />;
  const sw = Math.sin(phase * TAU), sh: Pt = [hip[0] + 4, hip[1] - 196], hd: Pt = [sh[0] + 10, sh[1] - 52];
  const farArm = fk([sh[0] - 8, sh[1] + 10], 90 + sw * 22, [[80, 0], [74, -12 - Math.max(0, sw) * 18]]);
  const nearArm = fk([sh[0] + 6, sh[1] + 12], 72, [[78, 0], [64, -122]]), cup = nearArm[2];
  return <g>
    {/* his long shadow (the sun is low at the left) */}
    <path d={`M${f1(hip[0] - 40)} ${G} L${f1(hip[0] + 30)} ${G} L${f1(hip[0] + 520)} ${G + 70} L${f1(hip[0] + 470)} ${G + 92}Z`} fill={SEP} opacity={.28} filter="url(#b8)" />
    <Skin J={limbJoints(Bq.slice(0, 3), [17, 12, 9])} col="#23283A" t={.6} id={id + 'l2'} hatch={0} sw={1.6} />{shoe(Bq)}
    <Skin J={limbJoints(farArm, [12, 10, 8])} col={mix(coat, '#000000', .3)} id={id + 'a2'} hatch={0} sw={1.6} />
    <Skin J={limbJoints(A.slice(0, 3), [17, 12, 9])} col="#2E3448" t={.6} id={id + 'l1'} hatch={0} sw={1.6} />{shoe(A)}
    {/* the coat */}
    <path d={`M${sh[0] - 34} ${sh[1] - 4} Q${sh[0]} ${sh[1] - 16} ${sh[0] + 38} ${sh[1] - 2} L${hip[0] + 52 + sw * 6} ${hip[1] + 72} Q${hip[0]} ${hip[1] + 84} ${hip[0] - 52 - sw * 6} ${hip[1] + 70}Z`} fill={coat} stroke={SEP} strokeWidth={2} />
    <path d={`M${sh[0] + 14} ${sh[1] - 6} L${sh[0] + 4} ${sh[1] + 60} L${hip[0] + 8} ${hip[1] + 76}`} stroke={SEP} strokeWidth={1.4} fill="none" opacity={.7} />
    <path d={`M${sh[0] - 6} ${sh[1] - 10} L${sh[0] + 22} ${sh[1] - 10} L${sh[0] + 8} ${sh[1] + 30}Z`} fill="#8C3424" stroke={SEP} strokeWidth={1.2} />
    {/* head */}
    <path d={`M${sh[0] - 4} ${sh[1] - 8} L${hd[0] - 4} ${hd[1] + 20} L${hd[0] + 14} ${hd[1] + 22} L${sh[0] + 18} ${sh[1] - 8}Z`} fill="#D9A47E" stroke={SEP} strokeWidth={1.2} />
    <ellipse cx={hd[0]} cy={hd[1]} rx={28} ry={34} fill="#E2B48E" stroke={SEP} strokeWidth={2} />
    <path d={`M${hd[0] + 26} ${hd[1] - 4} q10 10 2 16`} fill="#E2B48E" stroke={SEP} strokeWidth={1.6} />
    <path d={`M${hd[0] - 30} ${hd[1] + 4} Q${hd[0] - 34} ${hd[1] - 40} ${hd[0] + 4} ${hd[1] - 36} Q${hd[0] + 30} ${hd[1] - 34} ${hd[0] + 28} ${hd[1] - 14} Q${hd[0] + 8} ${hd[1] - 22} ${hd[0] - 10} ${hd[1] - 14} Q${hd[0] - 14} ${hd[1] + 4} ${hd[0] - 30} ${hd[1] + 4}Z`} fill="#4F3020" stroke={SEP} strokeWidth={1.4} />
    <circle cx={hd[0] + 15} cy={hd[1] - 4} r={2.6} fill={SEP} /><ellipse cx={hd[0] - 10} cy={hd[1]} rx={6} ry={9} fill="#D9A47E" stroke={SEP} strokeWidth={1.2} />
    <path d={`M${hd[0] + 12} ${hd[1] + 16} q6 3 10 0`} stroke={SEP} strokeWidth={1.4} fill="none" />
    {/* near arm with the cup */}
    <Skin J={limbJoints(nearArm, [13, 11, 9])} col={mix(coat, '#FFFFFF', .08)} id={id + 'a1'} hatch={0} sw={1.8} />
    <path d={`M${cup[0] - 4} ${cup[1] - 36} L${cup[0] + 28} ${cup[1] - 36} L${cup[0] + 23} ${cup[1] + 14} L${cup[0] + 1} ${cup[1] + 14}Z`} fill="#FBF4E2" stroke={SEP} strokeWidth={1.6} />
    <rect x={cup[0] - 2} y={cup[1] - 22} width={28} height={14} fill="#A8743E" stroke={SEP} strokeWidth={1} />
    <rect x={cup[0] - 6} y={cup[1] - 42} width={36} height={7} rx={3} fill="#EDE4D0" stroke={SEP} strokeWidth={1.2} />
    <circle cx={cup[0] + 4} cy={cup[1] - 6} r={9} fill="#E2B48E" stroke={SEP} strokeWidth={1.4} />
  </g>;
};
const ThumbRain: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, walk = 0, rain = 0, thumb = 0, mouth = 0 }) => {
  const id = 'sftr', dr = cl(draw * 1.5), G = 870, mx = lerp(260, 1240, walk), phase = walk * 7;
  const kT = Math.max(sst(thumb), cl(mouth * 6)), ICX = 1450, ICY = 330, IR = 290;
  const nailL: Pt = [1458, 352], nail: Pt = [ICX + (nailL[0] - ICX) * kT, ICY + (nailL[1] - ICY) * kT], mk = Math.pow(cl(mouth), 1.8), hr = lerp(26 * kT, 2300, mk);
  const SHOPS: [N, string, string][] = [[0, '#B98A50', 'BAKERY'], [500, '#8C6E4A', 'BOOKS'], [960, '#9A6E50', 'CAFÉ'], [1440, '#A9B97A', 'HARDWARE']];
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{grad(id + 'sk', [[0, '#C9DDE6'], [1, '#F8E6C2']])}{rgrad(id + 'sun', [[0, '#FFF6D8', .9], [1, '#FFE6A8', 0]])}
      <clipPath id={id + 'ic'}><circle cx={ICX} cy={ICY} r={IR} /></clipPath>
      {rgrad(id + 'sh', [[0, '#000000'], [.6, '#0E0A08'], [.9, '#2A1E16'], [1, '#4A3626']])}</defs>
    <rect x={-100} y={-100} width={2120} height={900} fill={`url(#${id}sk)`} />
    <circle cx={-40} cy={520} r={460} fill={`url(#${id}sun)`} />
    {/* far plane: rooftops and a church spire in the haze */}
    <path d="M-100 210 L120 210 L120 150 L300 150 L300 190 L520 190 L560 120 L600 190 L800 190 L800 140 L1120 140 L1120 180 L1300 180 L1320 60 L1340 180 L1600 180 L1600 130 L2020 130 L2020 400 L-100 400Z" fill="#C9C2B0" opacity={.6} />
    {/* the shop fronts */}
    {SHOPS.map(([sx, col, name], i) => <g key={i}>
      <RG d={`M${sx} 220 H${sx + 480} V780 H${sx}Z`} color={col} t={.4} draw={1} sw={2} />
      {[0, 1, 2].map(w => <g key={w}><rect x={sx + 50 + w * 140} y={270} width={90} height={130} fill="#5A6E7E" stroke={SEP} strokeWidth={1.6} /><Line d={`M${sx + 95 + w * 140} 270 V400 M${sx + 50 + w * 140} 335 H${sx + 140 + w * 140}`} w={2} col="#E8DCC8" a={.9} /><path d={`M${sx + 52 + w * 140} 272 l40 0 l-38 60Z`} fill="#FFFFFF" opacity={.25} /></g>)}
      <rect x={sx + 30} y={440} width={420} height={56} fill="#2B1D12" />
      <Fell x={sx + 240} y={482} s={40} t={name} col="#F3D88E" sc />
      <path d={`M${sx + 20} 510 H${sx + 460} L${sx + 480} 570 H${sx}Z`} fill={i % 2 ? '#2F5440' : '#B8432A'} stroke={SEP} strokeWidth={1.8} />
      {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${sx + 20 + k * 55} 510 h27 l5 60 h-27Z`} fill="#F3E7CC" opacity={.9} />)}
      <rect x={sx + 40} y={580} width={280} height={200} fill="#6E8290" stroke={SEP} strokeWidth={2} />
      <path d={`M${sx + 50} 590 l90 0 l-88 150Z`} fill="#FFFFFF" opacity={.22} />
      <rect x={sx + 350} y={590} width={90} height={190} fill="#4F3020" stroke={SEP} strokeWidth={2} />
      <circle cx={sx + 425} cy={690} r={5} fill="#D4A846" />
      <rect x={sx + 40} y={600} width={280} height={180} fill="#2B1D12" opacity={.2} />
    </g>)}
    {/* pavement, kerb, road */}
    <path d={`M-100 780 H2020 V${G + 40} H-100Z`} fill="#CFC4AE" />
    {Array.from({ length: 14 }, (_, i) => <Line key={i} d={`M${i * 160 - 60} 780 L${i * 160 - 140} ${G + 40}`} w={1.2} col={SEP} a={.35} />)}
    <Line d={`M-100 822 H2020`} w={1.2} col={SEP} a={.3} />
    <path d={`M-100 ${G + 40} H2020 V${G + 62} H-100Z`} fill="#A39E86" stroke={SEP} strokeWidth={1.6} />
    <rect x={-100} y={G + 62} width={2120} height={200} fill="#5A5A58" />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={i * 280 + 40} y={1000} width={140} height={12} fill="#EFE8D4" opacity={.8} />)}
    {/* the lamppost and its shadow */}
    <path d={`M1690 ${G + 30} L2200 ${G + 120}`} stroke={SEP} strokeWidth={14} opacity={.22} filter="url(#b2s)" />
    <rect x={1680} y={250} width={18} height={G + 30 - 250} fill="#2E3A36" stroke={SEP} strokeWidth={1.6} />
    <rect x={1668} y={G + 10} width={42} height={24} fill="#2E3A36" stroke={SEP} strokeWidth={1.6} />
    <path d="M1650 250 L1728 250 L1714 190 L1664 190Z" fill="#F3E7CC" stroke={SEP} strokeWidth={2} /><path d="M1656 186 L1689 160 L1722 186Z" fill="#2E3A36" stroke={SEP} strokeWidth={2} />
    <Walker mx={mx} G={G} phase={phase} id={id + 'm'} />
    {/* the rain of sparks: straight through him and on into the ground */}
    {rain > 0 && Array.from({ length: 46 }, (_, i) => { const p = fr(tm * .45 + rnd(i * 2.3)), sx = rnd(i + 7) * 2000 - 40 + p * 60, sy = -60 + p * 1260;
      return <Spark key={i} x={sx} y={sy} ang={87} r={4 + rnd(i) * 2.5} len={60} a={rain * (sy > G + 40 ? .55 : 1)} />; })}
    {/* the close-up of the thumb on the cup */}
    {kT > 0 && <g>
      <path d={`M${f1(mx + 50)} ${G - 330} L${f1(ICX - IR * kT * .7)} ${f1(ICY + IR * kT * .7)} M${f1(mx + 50)} ${G - 330} L${f1(ICX - IR * kT * .2)} ${f1(ICY + IR * kT * .98)}`} stroke={SEP} strokeWidth={1.4} strokeDasharray="6 6" opacity={.6 * (1 - mk)} />
      <circle cx={ICX + 12} cy={ICY + 14} r={IR * kT} fill={SEP} opacity={.35} filter="url(#b8)" />
      <g transform={`translate(${ICX} ${ICY}) scale(${f1(kT * 1000) / 1000}) translate(${-ICX} ${-ICY})`}>
        <g clipPath={`url(#${id}ic)`}>
          <rect x={ICX - IR} y={ICY - IR} width={IR * 2} height={IR * 2} fill="#E8D8B8" />
          <rect x={ICX - IR} y={ICY + 120} width={IR * 2} height={200} fill="#B8A88A" />
          {/* the cup */}
          <path d="M1320 80 L1660 80 L1630 700 L1350 700Z" fill="#FBF4E2" stroke={SEP} strokeWidth={3} />
          <path d="M1320 80 L1420 80 L1440 700 L1350 700Z" fill="#E6D8BE" opacity={.7} />
          <path d="M1306 54 L1674 54 L1668 86 L1312 86Z" fill="#EDE4D0" stroke={SEP} strokeWidth={3} />
          <path d="M1334 280 L1648 280 L1641 440 L1342 440Z" fill="#A8743E" stroke={SEP} strokeWidth={2.4} />
          {/* fingertips round the far side */}
          {[300, 390, 480].map((fy, i) => <path key={i} d={`M1640 ${fy - 34} Q1700 ${fy - 30} 1700 ${fy + 4} Q1700 ${fy + 36} 1636 ${fy + 34}Z`} fill="#E2B48E" stroke={SEP} strokeWidth={2.4} />)}
          {/* the hand and thumb across the front */}
          <path d="M1120 640 Q1180 470 1300 430 Q1380 400 1440 330 Q1480 300 1495 345 Q1500 395 1440 420 Q1380 450 1360 520 Q1330 640 1260 720Z" fill="#E2B48E" stroke={SEP} strokeWidth={3} />
          <path d="M1300 430 Q1340 470 1360 520" stroke={SEP} strokeWidth={1.6} fill="none" opacity={.6} />
          <path d="M1388 392 q8 12 4 26" stroke={SEP} strokeWidth={1.6} fill="none" opacity={.6} />
          <ellipse cx={nailL[0]} cy={nailL[1]} rx={46} ry={30} fill="#F2D2C0" stroke={SEP} strokeWidth={2.4} transform={`rotate(-36 ${nailL[0]} ${nailL[1]})`} />
          <path d={`M${nailL[0] + 24} ${nailL[1] - 36} q20 14 18 40`} stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={.8} />
          {Array.from({ length: 7 }, (_, i) => { const p = fr(tm * .55 + i / 7), sx = ICX - 240 + i * 75 + p * 40, sy = ICY - IR - 40 + p * (IR * 2 + 80);
            return <Spark key={i} x={sx} y={sy} ang={82} r={7} len={80} a={rain > 0 ? 1 : .9} />; })}
        </g>
        <circle cx={ICX} cy={ICY} r={IR} fill="none" stroke={SEP} strokeWidth={5} />
        <circle cx={ICX} cy={ICY} r={IR - 10} fill="none" stroke={SEP} strokeWidth={1.4} />
      </g>
    </g>}
    {/* the thumbnail opens into a dark round shaft */}
    {mouth > 0 && <g>
      <circle cx={nail[0]} cy={nail[1]} r={hr} fill={`url(#${id}sh)`} />
      {[.98, .86, .74, .63, .53, .44, .36, .29, .23].map((k, i) => <circle key={i} cx={nail[0]} cy={nail[1]} r={hr * k} fill="none" stroke={i === 0 ? '#6A4430' : '#5A4A3A'} strokeWidth={i === 0 ? Math.max(3, hr * .04) : Math.max(1, hr * .012)} opacity={i === 0 ? 1 : .55 - i * .04} />)}
      {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * TAU, cx2 = nail[0]; return <Line key={i} d={`M${f1(cx2 + Math.cos(a) * hr * .98)} ${f1(nail[1] + Math.sin(a) * hr * .98)} L${f1(cx2 + Math.cos(a) * hr * .25)} ${f1(nail[1] + Math.sin(a) * hr * .25)}`} w={Math.max(1, hr * .006)} col="#6A5A48" a={.4} />; })}
      <path d={`M${f1(nail[0] - hr * .9)} ${f1(nail[1] - hr * .3)} A${f1(hr * .95)} ${f1(hr * .95)} 0 0 1 ${f1(nail[0] + hr * .3)} ${f1(nail[1] - hr * .9)}`} stroke="#F3D88E" strokeWidth={Math.max(2, hr * .02)} fill="none" opacity={.4} />
    </g>}
    <KeyLight id={id} a={.6} />
  </g>;
};

// ================================================================ 6. MINE SHAFT — the Homestake pithead and the shaft cut away below it
// (CLEAR AREA for Davis in a hard hat: right of the cage at the top, x 800–1000, y 470–780 while drop = 0)
// drop 0..1 the cage descends the shaft (rock rushing past; the depth gauge turns; the counter reads up to 1478 m); rise 0..1 light and numbers
// rise up the shaft and out into a dawn sky (the camera returns to the headframe at dawn).
const MineShaft: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, drop = 0, rise = 0 }) => {
  const id = 'sfms', dr = cl(draw * 1.5), G = 780, DEP = 2000, dk = sst(drop), rk = sst(rise), off = dk * DEP * (1 - rk), cageY = G - 126 + dk * DEP;
  const depth = Math.round(1478 * dk), wheelA = dk * 1440, rush = Math.sin(Math.PI * cl(drop)) * (1 - rk);
  const STR = ['#C9AE84', '#A39E86', '#8C6E4A', '#B3AFA4', '#76726A', '#9A6E50', '#6A5A48', '#8C8070', '#5A4A3A', '#76726A', '#4E4842', '#6A5A48', '#4A3E34', '#5A4E44', '#3E352D', '#4A4038'];
  const dial = 145, nd = (-135 + 270 * dk) * D;
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{grad(id + 'sk', [[0, mix('#8E969C', '#3A3E6A', rk)], [.6, mix('#B4B8B6', '#E8A08A', rk)], [1, mix('#C8C8C0', '#FFD898', rk)]])}
      {rgrad(id + 'cl', [[0, '#FFF0C0', .7], [1, '#FFE6A0', 0]])}{rgrad(id + 'dw', [[0, '#FFE2A0', .9], [1, '#FFC080', 0]])}</defs>
    <g transform={`translate(0 ${f1(-off)})`}>
      {/* the sky (grey; dawn when rising) */}
      <rect x={-100} y={-200} width={2120} height={G + 200} fill={`url(#${id}sk)`} />
      {rk > 0 && <circle cx={1500} cy={G} r={520} fill={`url(#${id}dw)`} opacity={rk} />}
      {[[300, 140], [1100, 90], [1600, 200]].map(([cx, cy], i) => <path key={i} d={`M${cx - 160} ${cy} q50 -40 110 -14 q60 -50 130 -6 q60 -10 90 20Z`} fill={rk > .5 ? '#F6C8A8' : '#E4E6E2'} opacity={.6} />)}
      {/* far hills and buildings */}
      <path d={`M-100 ${G - 120} Q300 ${G - 220} 640 ${G - 150} T1400 ${G - 170} T2020 ${G - 140} V${G} H-100Z`} fill={mix('#8C8C84', '#7A5A6A', rk)} opacity={.7} />
      <RG d={`M120 ${G} V${G - 230} L250 ${G - 300} L380 ${G - 230} V${G}Z`} color="#9A6E50" t={.4} />
      {[0, 1, 2].map(i => <rect key={i} x={160 + i * 70} y={G - 190} width={36} height={44} fill={rk > .2 ? '#F3D88E' : '#4E4842'} stroke={SEP} strokeWidth={1.4} />)}
      <RG d={`M1060 ${G} V${G - 190} H1380 V${G}Z`} color="#8C6E4A" t={.4} />
      <RG d={`M1040 ${G - 190} L1220 ${G - 260} L1400 ${G - 190}Z`} color="#5A4A3A" t={.4} />
      <rect x={1340} y={G - 360} width={40} height={170} fill="#6A4430" stroke={SEP} strokeWidth={1.6} />
      {[0, 1, 2].map(i => <rect key={i} x={1100 + i * 90} y={G - 150} width={50} height={60} fill={rk > .2 ? '#F3D88E' : '#4E4842'} stroke={SEP} strokeWidth={1.4} />)}
      {/* the headframe: two steel legs, lattice, the back leg, the sheave wheel on top */}
      <path d={`M700 200 L1060 ${G - 190}`} stroke={SEP} strokeWidth={22} /><path d={`M700 200 L1060 ${G - 190}`} stroke="#6A6E72" strokeWidth={16} />
      {Array.from({ length: 6 }, (_, i) => { const t0 = .1 + i * .14, ax = lerp(700, 1060, t0), ay = lerp(200, G - 190, t0); return <Line key={i} d={`M${f1(ax)} ${f1(ay)} L${f1(ax - 40)} ${f1(ay + 70)}`} w={4} col="#3A3E42" a={1} />; })}
      {[[600, 660], [800, 740]].map(([bx, tx], i) => <path key={i} d={`M${bx} ${G} L${tx} 210`} stroke={SEP} strokeWidth={20} />)}
      {[[600, 660], [800, 740]].map(([bx, tx], i) => <path key={'b' + i} d={`M${bx} ${G} L${tx} 210`} stroke="#7A7E82" strokeWidth={14} />)}
      {Array.from({ length: 8 }, (_, i) => { const t0 = i / 8, t1 = (i + 1) / 8, lx0 = lerp(600, 660, t0), ly0 = lerp(G, 210, t0), rx1 = lerp(800, 740, t1), ry1 = lerp(G, 210, t1), lx1 = lerp(600, 660, t1), rx0 = lerp(800, 740, t0);
        return <g key={i}><Line d={`M${f1(lx0)} ${f1(ly0)} L${f1(rx1)} ${f1(ry1)} M${f1(rx0)} ${f1(ly0)} L${f1(lx1)} ${f1(ry1)} M${f1(lx1)} ${f1(ry1)} H${f1(rx1)}`} w={3.4} col="#4A4E52" a={1} /></g>; })}
      <rect x={630} y={190} width={140} height={22} fill="#5A5E62" stroke={SEP} strokeWidth={2} />
      <g transform={`rotate(${f1(wheelA)} 700 150)`}>
        <circle cx={700} cy={150} r={66} fill="none" stroke={SEP} strokeWidth={14} /><circle cx={700} cy={150} r={66} fill="none" stroke="#8A8E92" strokeWidth={8} />
        {Array.from({ length: 8 }, (_, i) => <Line key={i} d={`M700 150 L${f1(700 + Math.cos(i * TAU / 8) * 62)} ${f1(150 + Math.sin(i * TAU / 8) * 62)}`} w={4} col="#3A3E42" a={1} />)}
        <circle cx={700} cy={150} r={10} fill="#3A3E42" />
      </g>
      <Line d={`M766 150 L1060 ${G - 200}`} w={2} col={SEP} a={.8} />
      {/* the ground, and the cutaway below it: rock strata */}
      {STR.map((c, i) => { const y0 = G + i * 200, y1 = y0 + 200, w0 = (k: N) => 18 * Math.sin(k * .004 + i * 1.7);
        return <path key={i} d={`M-100 ${f1(y0 + w0(-100))} ${Array.from({ length: 12 }, (_, k) => `L${k * 190} ${f1(y0 + w0(k * 190))}`).join(' ')} L2020 ${y1 + 40} L-100 ${y1 + 40}Z`} fill={c} stroke={SEP} strokeWidth={1.6} />; })}
      <Stipple x={-100} y={G} w={2120} h={3200} n={2400} seed="sfms" col={SEP} a={.3} />
      {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M${f1(rnd(i) * 1920)} ${f1(G + 60 + rnd(i + 2) * 3000)} l${f1(30 + rnd(i + 3) * 60)} ${f1(10 - rnd(i + 4) * 20)}`} stroke={SEP} strokeWidth={1.4} opacity={.5} />)}
      <path d={`M-100 ${G} H2020`} stroke="#4F7A4A" strokeWidth={10} />
      {/* the shaft */}
      <rect x={640} y={G} width={120} height={DEP + 300} fill="#1E1814" stroke={SEP} strokeWidth={3} />
      {Array.from({ length: 40 }, (_, i) => <Line key={i} d={`M640 ${G + 20 + i * 60} H760`} w={4} col="#5A3A24" a={.9} />)}
      {[[250, '250 m'], [500, '500 m'], [750, '750 m'], [1000, '1000 m'], [1250, '1250 m'], [1478, '1478 m']].map(([m, t]) => { const yy = G + (m as N) / 1478 * DEP;
        return <g key={t as string}><Line d={`M760 ${yy} h40`} w={2} col={SEP} a={.9} /><rect x={804} y={yy - 22} width={150} height={44} rx={4} fill="#1E1814" opacity={.85} /><text x={814} y={yy + 10} fontSize={30} fontFamily={FIG} fill="#F3E7CC">{t as string}</text></g>; })}
      {/* the cable and the cage, its lamp lighting the shaft walls */}
      <Line d={`M700 216 V${cageY}`} w={3} col="#2A2A28" a={1} />
      <circle cx={700} cy={cageY + 60} r={180} fill={`url(#${id}cl)`} opacity={dk > .05 ? 1 : .3} />
      <rect x={652} y={cageY} width={96} height={126} fill="#6A6E72" stroke={SEP} strokeWidth={2.4} />
      <rect x={660} y={cageY + 10} width={80} height={106} fill="#2A2420" />
      {Array.from({ length: 5 }, (_, i) => <Line key={i} d={`M${664 + i * 18} ${cageY + 10} V${cageY + 116}`} w={2.4} col="#8A8E92" a={1} />)}
      <circle cx={700} cy={cageY - 2} r={6} fill="#FFF0B0" />
      {/* rising light and numbers */}
      {rk > 0 && Array.from({ length: 34 }, (_, i) => { const p = fr(tm * .35 + rnd(i * 3)), yy = G + DEP - p * (DEP + 600), xx = 700 + (rnd(i + 1) - .5) * (yy < G ? 300 + (G - yy) * 1.2 : 80);
        return i % 3 === 0 ? <text key={i} x={f1(xx)} y={f1(yy)} fontSize={32} fontFamily={FIG} fill="#FFE6A0" opacity={rk * .9} textAnchor="middle">{'1478'[i % 4]}</text>
          : <circle key={i} cx={f1(xx)} cy={f1(yy)} r={4 + rnd(i + 5) * 5} fill="#FFF0B8" opacity={rk * .85} />; })}
      {rk > 0 && <rect x={660} y={G - 40} width={80} height={DEP} fill="#FFE6A0" opacity={rk * .25} />}
    </g>
    {/* rock rushing past the falling cage */}
    {rush > .05 && Array.from({ length: 24 }, (_, i) => { const p = fr(tm * 1.4 + rnd(i)), xx = i % 2 ? 560 + rnd(i) * 70 : 780 + rnd(i) * 70, yy = 1150 - p * 1300;
      return <Line key={i} d={`M${f1(xx)} ${f1(yy)} v${f1(80 + rnd(i + 2) * 120)}`} w={2} col="#F3E7CC" a={rush * .5} />; })}
    {/* the depth gauge (an instrument, held in view) */}
    <g>
      <circle cx={1660} cy={300} r={dial + 20} fill={SEP} opacity={.35} filter="url(#b8)" />
      <circle cx={1650} cy={290} r={dial + 18} fill="#B8862B" stroke={SEP} strokeWidth={3} />
      <circle cx={1650} cy={290} r={dial} fill="#FBF4E2" stroke={SEP} strokeWidth={2} />
      {Array.from({ length: 31 }, (_, i) => { const a = (-135 + i * 9) * D - Math.PI / 2, r0 = i % 5 === 0 ? dial - 28 : dial - 16;
        return <Line key={i} d={`M${f1(1650 + Math.cos(a) * r0)} ${f1(290 + Math.sin(a) * r0)} L${f1(1650 + Math.cos(a) * (dial - 6))} ${f1(290 + Math.sin(a) * (dial - 6))}`} w={i % 5 === 0 ? 3 : 1.4} a={1} />; })}
      {[0, 500, 1000, 1500].map((v, i) => { const a = (-135 + i * 90) * D - Math.PI / 2; return <text key={v} x={f1(1650 + Math.cos(a) * (dial - 52))} y={f1(290 + Math.sin(a) * (dial - 52) + 9)} fontSize={24} fontFamily={FIG} textAnchor="middle" fill={SEP}>{v}</text>; })}
      <path d={`M${f1(1650 - Math.cos(nd - Math.PI / 2) * 20)} ${f1(290 - Math.sin(nd - Math.PI / 2) * 20)} L${f1(1650 + Math.cos(nd - Math.PI / 2) * (dial - 22))} ${f1(290 + Math.sin(nd - Math.PI / 2) * (dial - 22))}`} stroke={VER} strokeWidth={5} strokeLinecap="round" />
      <circle cx={1650} cy={290} r={11} fill={SEP} />
      <rect x={1540} y={470} width={220} height={66} rx={6} fill="#1E1814" stroke="#B8862B" strokeWidth={4} />
      <text x={1650} y={516} fontSize={40} fontFamily={FIG} textAnchor="middle" fill="#F3D88E">{depth} m</text>
    </g>
    <KeyLight id={id} a={.5} />
  </g>;
};

// ================================================================ 7. CHLORINE TANK — a huge cavern, a giant steel tank, lit only by a helmet lamp
// grow 0..1 the tank emerges out of the dark; fill 0..1 the fluid rises (cutaway window + sight-glass); sweep 0..1 the lamp beam sweeps across;
// tally 0..1 chalk tally marks accumulate on the cavern wall.
const ChlorineTank: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, grow = 0, fill = 0, sweep = 0, tally = 0 }) => {
  const id = 'sfct', dr = cl(draw * 1.5), FL = 880, X0 = 470, X1 = 1630, CY = 540, R = 230, g = sst(grow);
  const head: Pt = [300 + 14, FL - 117], ta = lerp(-14, 2, sst(sweep)) * D, tgtX = lerp(560, 1600, sst(sweep)), tgtY = head[1] + Math.tan(ta) * (tgtX - head[0]) - 40;
  const bw = 260, bl = Math.hypot(tgtX - head[0], tgtY - head[1]), ux = (tgtX - head[0]) / bl, uy = (tgtY - head[1]) / bl;
  const beam = `M${head[0]} ${head[1]} L${f1(tgtX - uy * bw)} ${f1(tgtY + ux * bw)} L${f1(tgtX + ux * 400 - uy * bw * 1.3)} ${f1(tgtY + uy * 400 + ux * bw * 1.3)} L${f1(tgtX + ux * 400 + uy * bw * 1.3)} ${f1(tgtY + uy * 400 - ux * bw * 1.3)} L${f1(tgtX + uy * bw)} ${f1(tgtY - ux * bw)}Z`;
  const lvl = CY + R - fill * R * 1.9, nT = Math.round(tally * 23);
  const tank = `M${X0} ${CY - R} H${X1} A70 ${R} 0 0 1 ${X1} ${CY + R} H${X0} A70 ${R} 0 0 1 ${X0} ${CY - R}Z`;
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{grad(id + 'st', [[0, '#5A6470'], [.25, '#B8C4CC'], [.5, '#8A96A0'], [1, '#3A4048']])}
      <clipPath id={id + 'tk'}><path d={tank} /></clipPath>
      <filter id={id + 'bl'}><feGaussianBlur stdDeviation={34} /></filter>
      <mask id={id + 'mk'}><rect x={-100} y={-100} width={2120} height={1280} fill="#FFFFFF" />
        <path d={beam} fill="#000000" filter={`url(#${id}bl)`} opacity={.85} />
        <circle cx={head[0]} cy={head[1] + 60} r={190} fill="#000000" opacity={.7} filter={`url(#${id}bl)`} />
        <ellipse cx={260} cy={230} rx={240} ry={130} fill="#000000" opacity={.55 * cl(tally * 4)} filter={`url(#${id}bl)`} />
        <ellipse cx={1050} cy={540} rx={900} ry={420} fill="#000000" opacity={.45 * g} filter={`url(#${id}bl)`} /></mask></defs>
    {/* the cavern: rock vault and floor */}
    <rect x={-100} y={-100} width={2120} height={1280} fill="#4A3E34" />
    <path d={`M-100 ${FL} Q300 -80 960 -60 Q1700 -80 2020 ${FL} V1180 H-100Z`} fill="#6A5A48" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${f1(rnd(i) * 1920)} ${f1(rnd(i + 1) * 820)} l${f1(40 + rnd(i + 2) * 120)} ${f1(30 - rnd(i + 3) * 60)} l${f1(30 + rnd(i + 4) * 60)} ${f1(20 + rnd(i + 5) * 30)}`} stroke={SEP} strokeWidth={2} fill="none" opacity={.6} />)}
    <Stipple x={0} y={0} w={1920} h={FL} n={1800} seed="sfct" col={SEP} a={.45} />
    <rect x={-100} y={FL} width={2120} height={300} fill="#5A4A3A" />
    <Line d={`M-100 ${FL} H2020`} w={2} a={.8} />
    {/* tally marks in chalk on the wall */}
    {nT > 0 && Array.from({ length: nT }, (_, i) => { const gI = Math.floor(i / 5), k = i % 5, gx = 90 + (gI % 3) * 120, gy = 170 + Math.floor(gI / 3) * 110;
      return k < 4 ? <Line key={i} d={`M${gx + k * 20} ${gy} l${2 - rnd(i) * 4} 74`} w={5} col={CHALK} a={.92} /> : <Line key={i} d={`M${gx - 10} ${gy + 60} L${gx + 76} ${gy + 12}`} w={5} col={CHALK} a={.92} />; })}
    {/* the tank: as big as a house */}
    <g opacity={.25 + .75 * g}>
      <ellipse cx={1050} cy={FL + 8} rx={640} ry={34} fill={SEP} opacity={.55} filter="url(#b8)" />
      {[700, 1400].map(sx => <path key={sx} d={`M${sx - 90} ${FL} L${sx - 60} ${CY + R - 40} L${sx + 60} ${CY + R - 40} L${sx + 90} ${FL}Z`} fill="#4A4E52" stroke={SEP} strokeWidth={2.4} />)}
      {[[760, 40], [1180, 90], [1500, 30]].map(([px, h], i) => <g key={i}><rect x={px} y={-20} width={26} height={CY - R + 20 + h * 0} fill="#5A6068" stroke={SEP} strokeWidth={2} /><rect x={px - 6} y={CY - R - 30} width={38} height={30} fill="#6A7078" stroke={SEP} strokeWidth={2} /></g>)}
      <path d={tank} fill={`url(#${id}st)`} stroke={SEP} strokeWidth={3} />
      <ellipse cx={X0} cy={CY} rx={70} ry={R} fill="#7A8690" stroke={SEP} strokeWidth={3} />
      <ellipse cx={X0} cy={CY} rx={40} ry={R * .6} fill="none" stroke={SEP} strokeWidth={1.4} opacity={.6} />
      {[700, 940, 1180, 1420].map(sx => <path key={sx} d={`M${sx} ${CY - R} A70 ${R} 0 0 1 ${sx} ${CY + R}`} stroke={SEP} strokeWidth={2} fill="none" opacity={.7} />)}
      {[700, 940, 1180, 1420].map(sx => Array.from({ length: 9 }, (_, k) => { const t = (k + 1) / 10 * Math.PI, rx2 = sx + Math.sin(t) * 70 * .05, ry2 = CY - Math.cos(t) * R; return <circle key={sx + '_' + k} cx={f1(rx2 + 8)} cy={f1(ry2)} r={3} fill="#2A2E32" />; }))}
      {/* cutaway window: the fluid inside */}
      <g clipPath={`url(#${id}tk)`}>
        <path d={`M1000 ${CY - R + 40} L1300 ${CY - R + 30} L1320 ${CY + R - 30} L990 ${CY + R - 40}Z`} fill="#1A1E22" stroke={SEP} strokeWidth={3} />
        {fill > 0 && <g><path d={`M990 ${f1(lvl)} Q1150 ${f1(lvl - 6 + 3 * Math.sin(tm * 2))} 1320 ${f1(lvl)} L1320 ${CY + R} L990 ${CY + R}Z`} fill="#9CC8C0" opacity={.85} />
          <path d={`M995 ${f1(lvl)} Q1150 ${f1(lvl - 6 + 3 * Math.sin(tm * 2))} 1316 ${f1(lvl)}`} stroke="#E8F6F2" strokeWidth={3} fill="none" />
          {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={1030 + i * 50} cy={f1(lvl + 30 + fr(tm * .3 + i * .2) * (CY + R - lvl - 40))} r={3} fill="#E8F6F2" opacity={.6} />)}</g>}
        <path d={`M1000 ${CY - R + 40} l20 30 l-14 30 l18 40 l-16 50 l18 40 l-14 60 l12 50 M1300 ${CY - R + 30} l-16 40 l14 50 l-18 50 l16 60 l-14 50 l16 60`} stroke="#C8D2D8" strokeWidth={3} fill="none" />
      </g>
      {/* sight-glass gauge on the end */}
      <rect x={X1 + 40} y={CY - 150} width={24} height={300} rx={10} fill="#E6F2F2" stroke={SEP} strokeWidth={2.4} />
      <rect x={X1 + 44} y={f1(CY + 146 - fill * 292)} width={16} height={f1(fill * 292)} fill="#7FB0A8" />
      <Line d={`M${X1 - 10} ${CY - 140} H${X1 + 40} M${X1 - 10} ${CY + 140} H${X1 + 40}`} w={4} col="#3A4048" a={1} />
      {/* ladder */}
      <Line d={`M560 ${FL} L560 ${CY - R} M600 ${FL} L600 ${CY - R}`} w={4} col="#3A4048" a={1} />
      {Array.from({ length: 11 }, (_, i) => <Line key={i} d={`M560 ${CY - R + 20 + i * 40} H600`} w={3} col="#3A4048" a={1} />)}
    </g>
    <Worker x={300} y={FL} h={130} lamp={1} />
    {/* the dark, lit only where the lamp falls */}
    <rect x={-100} y={-100} width={2120} height={1280} fill="#0A0605" opacity={lerp(.97, .8, g)} mask={`url(#${id}mk)`} />
    <path d={beam} fill="#FFF2C0" opacity={.12} filter="url(#b8)" />
    <circle cx={head[0]} cy={head[1]} r={9} fill="#FFFBE0" /><circle cx={head[0]} cy={head[1]} r={30} fill="#FFF2C0" opacity={.4} />
  </g>;
};

// ================================================================ 8. ATOM GRAIN — a heap of grey-white grains (atoms) under one spotlight
// strike 0..1 a vermilion spark streaks in from the top-left and hits one grain; gold 0..1 that grain turns gold-vermilion and glows.
const GRAINS = (() => { const o: [N, N, N, N][] = []; for (let i = 0; i < 420; i++) { const u = rnd(i * 1.37), xx = 140 + u * 1640, top = 1000 - 470 * Math.exp(-Math.pow((xx - 960) / 520, 2)) - 40, yy = top + Math.pow(rnd(i * 2.9), .8) * (1100 - top);
  o.push([xx, yy, 15 + rnd(i * 4.1) * 13, rnd(i * 5.3) * 180]); } return o.sort((a, b) => a[1] - b[1]); })();
const AtomGrain: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, strike = 0, gold = 0 }) => {
  const id = 'sfag', dr = cl(draw * 1.5), T: Pt = [960, 548], sk = Math.pow(cl(strike / .92), 1.4), hit = ph(strike, .9, 1), gk = sst(gold);
  const S0: Pt = [40, -40], sp: Pt = [lerp(S0[0], T[0], sk), lerp(S0[1], T[1], sk)], ang = Math.atan2(T[1] - S0[1], T[0] - S0[0]) / D;
  const gcol = mix('#E8E2D2', '#E8963A', gk);
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{rgrad(id + 'sp', [[0, '#FFF6DC', .55], [.6, '#FFF0D0', .18], [1, '#FFF0D0', 0]])}{rgrad(id + 'gl', [[0, '#FFE6A0', .9], [.4, '#F2A050', .5], [1, VER, 0]])}</defs>
    <rect x={-100} y={-100} width={2120} height={1280} fill="#211914" />
    <Stipple x={0} y={0} w={1920} h={1080} n={1400} seed="sfag" col="#0A0605" a={.5} />
    {/* the spotlight cone from above */}
    <path d="M880 -100 L1040 -100 L1500 1100 L420 1100Z" fill="#FFF0D0" opacity={.06} />
    <ellipse cx={960} cy={700} rx={640} ry={400} fill={`url(#${id}sp)`} />
    {/* the heap */}
    {GRAINS.map(([gx, gy, r, rot], i) => { if (Math.hypot(gx - T[0], gy - T[1]) < 34) return null; const lit = cl(1 - Math.hypot((gx - 960) / 700, (gy - 680) / 420)), c = mix('#3E3A36', '#EDE8DC', lit);
      return <g key={i}><ellipse cx={f1(gx + 4)} cy={f1(gy + 5)} rx={r} ry={r * .82} fill="#0A0605" opacity={.5} />
        <ellipse cx={f1(gx)} cy={f1(gy)} rx={r} ry={r * .82} fill={c} stroke={SEP} strokeWidth={1.3} transform={`rotate(${f1(rot)} ${f1(gx)} ${f1(gy)})`} />
        <ellipse cx={f1(gx - r * .3)} cy={f1(gy - r * .32)} rx={r * .3} ry={r * .18} fill="#FFFFFF" opacity={.55 * lit} /></g>; })}
    {/* the one grain */}
    {gk > 0 && <circle cx={T[0]} cy={T[1]} r={70 + 150 * gk + 8 * Math.sin(tm * 5) * gk} fill={`url(#${id}gl)`} opacity={gk} />}
    <ellipse cx={T[0] + 5} cy={T[1] + 6} rx={27} ry={23} fill="#0A0605" opacity={.5} />
    <ellipse cx={T[0]} cy={T[1]} rx={27} ry={23} fill={gcol} stroke={SEP} strokeWidth={1.6} />
    <ellipse cx={T[0] - 8} cy={T[1] - 8} rx={8} ry={5} fill="#FFFFFF" opacity={.7} />
    {gk > .2 && Array.from({ length: 8 }, (_, i) => { const a = i / 8 * TAU + tm * .3; return <Line key={i} d={`M${f1(T[0] + Math.cos(a) * 40)} ${f1(T[1] + Math.sin(a) * 34)} L${f1(T[0] + Math.cos(a) * (60 + 40 * gk))} ${f1(T[1] + Math.sin(a) * (52 + 34 * gk))}`} w={3} col="#F3C060" a={gk} />; })}
    {/* the spark coming in */}
    {strike > 0 && strike < .97 && <Spark x={sp[0]} y={sp[1]} ang={ang} r={9} len={160 + 100 * sk} />}
    {hit > 0 && hit < 1 && <g opacity={1 - hit}>{[0, 1, 2].map(k => <circle key={k} cx={T[0]} cy={T[1]} r={30 + hit * (80 + k * 50)} fill="none" stroke={k ? '#F3C060' : VER} strokeWidth={4 - k} />)}
      <circle cx={T[0]} cy={T[1]} r={40} fill="#FFFFFF" opacity={.8} /></g>}
  </g>;
};

// ================================================================ 9. COUNT WALL — a 1970s lab wall: chalkboard with PREDICTED vs MEASURED (RIGHT THIRD CLEAR for Davis at the desk)
// count 0..1 the measured bar climbs and stops at one third of the predicted line; gap 0..1 the gap glows, two chalk "?" (by a little tank, by a
// little Sun); arrows 0..1 chalk arrows from little crowds point at the tank and at the Sun; age 0..1 thirty years pass (posters change, calendar
// 1968 → 2001, paint yellows, a plant grows); match 0..1 three bars (red, blue, green) stack to reach the predicted line exactly; a tick.
const Stick: React.FC<any> = ({ x, y, h = 60, arm = 0, col = CHALK }) => <g>
  <circle cx={x} cy={y - h * .85} r={h * .13} fill="none" stroke={col} strokeWidth={3} />
  <Line d={`M${x} ${y - h * .72} V${y - h * .35} M${x} ${y - h * .35} L${x - h * .15} ${y} M${x} ${y - h * .35} L${x + h * .15} ${y} M${x} ${y - h * .62} L${x + h * .22} ${y - h * .42} M${x} ${y - h * .62} L${f1(x - h * .3)} ${f1(y - h * (.6 + .25 * arm))}`} w={3} col={col} a={.95} />
</g>;
const CountWall: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, count = 0, gap = 0, arrows = 0, age = 0, match = 0 }) => {
  const id = 'sfcw', dr = cl(draw * 1.5), B = 700, TOP = 220, H3 = (B - TOP) / 3, mh = sst(count) * H3, ak = sst(age), year = Math.round(1968 + age * 33);
  const wall = mix('#C8D2B4', '#D8C28A', ak * .7), DK = 840;
  const red = ph(match, 0, .3), blu = sst(ph(match, .3, .6)), grn = sst(ph(match, .6, .85)), tick = ph(match, .85, 1);
  const bar = (bx: N, top: N, bot: N, col: string, a = 1, key?: string) => <g key={key} opacity={a}><rect x={bx} y={top} width={140} height={Math.max(0, bot - top)} fill={col} opacity={.85} />
    {Array.from({ length: Math.floor(Math.max(0, bot - top) / 14) }, (_, i) => <Line key={i} d={`M${bx + 6} ${bot - 8 - i * 14} l128 -6`} w={2} col={CHALK} a={.35} />)}
    <rect x={bx} y={top} width={140} height={Math.max(0, bot - top)} fill="none" stroke={CHALK} strokeWidth={3.4} /></g>;
  const poster = ['rocket', 'earth', 'disk'], pi = age * 2;
  return <g transform={TR(x, y, s)} opacity={dr}>
    <rect x={-100} y={-100} width={2120} height={DK + 100} fill={wall} />
    <Stipple x={0} y={0} w={1920} h={DK} n={1200} seed="sfcw" col={mix(SEP, '#8C6E4A', .5)} a={.2 + ak * .25} />
    {ak > 0 && Array.from({ length: 5 }, (_, i) => <ellipse key={i} cx={200 + i * 400} cy={60 + rnd(i) * 120} rx={120} ry={60} fill="#A8743E" opacity={.12 * ak} filter="url(#b30)" />)}
    {/* the ceiling tube: the light of the room */}
    <rect x={560} y={-4} width={800} height={26} fill="#E8E8E0" stroke={SEP} strokeWidth={2} /><rect x={570} y={20} width={780} height={10} fill="#FFFFF4" />
    <path d="M560 30 L1360 30 L1700 400 L220 400Z" fill="#FFFFF0" opacity={.12} />
    {/* the chalkboard */}
    <rect x={150} y={130} width={1100} height={640} fill={SEP} opacity={.35} filter="url(#b8)" transform="translate(10 12)" />
    <rect x={120} y={100} width={1140} height={680} fill="#8C5A36" stroke={SEP} strokeWidth={3} />
    <rect x={146} y={124} width={1088} height={626} fill="#2F3B33" stroke={SEP} strokeWidth={2} />
    {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={260 + i * 180} cy={180 + rnd(i) * 500} rx={120} ry={40} fill="#5A6A5E" opacity={.25} />)}
    <rect x={130} y={772} width={1120} height={16} fill="#6A4430" stroke={SEP} strokeWidth={2} />
    <rect x={380} y={762} width={40} height={12} fill={CHALK} /><rect x={900} y={764} width={70} height={14} rx={4} fill="#5A4A3A" />
    {/* axis, PREDICTED bar, dashed line */}
    <Line d={`M230 ${B} H780`} w={3} col={CHALK} a={.9} />
    {bar(290, TOP, B, '#3E4E44')}
    <path d={`M270 ${TOP} H790`} stroke={CHALK} strokeWidth={3.4} strokeDasharray="18 12" />
    <Hand x={360} y={B + 50} s={40} t="PREDICTED" col={CHALK} />
    {/* MEASURED bar (it climbs to one third) */}
    {match <= 0 && bar(560, B - mh, B, '#3E4E44')}
    {match > 0 && <g>{bar(560, B - H3, B, mix('#3E4E44', '#C0392B', red))}
      {blu > 0 && bar(560, B - 2 * H3 - (1 - blu) * 380, B - H3 - (1 - blu) * 380, '#2E5C9A', blu, 'b')}
      {grn > 0 && bar(560, TOP - (1 - grn) * 380, B - 2 * H3 - (1 - grn) * 380, '#3E8A4A', grn, 'g')}</g>}
    <Hand x={630} y={B + 50} s={40} t="MEASURED" col={CHALK} />
    {tick > 0 && <path d="M820 200 l26 30 l50 -70" stroke={VER} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${tick} 1`} />}
    {/* the gap glows; the question marks */}
    {gap > 0 && <g>
      <rect x={560} y={TOP} width={140} height={Math.max(0, B - mh - TOP)} fill={VER} opacity={(.25 + .12 * Math.sin(tm * 4)) * gap * (1 - ph(match, .3, .9))} />
      <rect x={560} y={TOP} width={140} height={Math.max(0, B - mh - TOP)} fill="none" stroke={VER} strokeWidth={3} strokeDasharray="10 8" opacity={gap * (1 - ph(match, .3, .9))} />
      <g opacity={ph(gap, .2, .6)}>{/* a little tank */}
        <path d="M850 280 H990 A16 40 0 0 1 990 360 H850 A16 40 0 0 1 850 280Z" fill="none" stroke={CHALK} strokeWidth={3} /><ellipse cx={850} cy={320} rx={16} ry={40} fill="none" stroke={CHALK} strokeWidth={3} />
        <Line d="M880 360 l-10 30 M960 360 l10 30" w={3} col={CHALK} a={.9} /></g>
      <g opacity={ph(gap, .3, .7)}>{/* a little Sun */}
        <circle cx={920} cy={560} r={46} fill="none" stroke={CHALK} strokeWidth={3} />
        {Array.from({ length: 10 }, (_, i) => { const a = i / 10 * TAU; return <Line key={i} d={`M${f1(920 + Math.cos(a) * 58)} ${f1(560 + Math.sin(a) * 58)} L${f1(920 + Math.cos(a) * 78)} ${f1(560 + Math.sin(a) * 78)}`} w={3} col={CHALK} a={.9} />; })}</g>
      {[[1030, 300, .5], [1030, 560, .65]].map(([qx, qy, t0], i) => <text key={i} x={qx} y={qy + 30} fontSize={110 * sst(ph(gap, t0, t0 + .3))} fontFamily={HANDF} fill={CHALK} textAnchor="middle">?</text>)}
    </g>}
    {arrows > 0 && <g>
      {[0, 1, 2].map(i => <Stick key={'a' + i} x={1110 + i * 38} y={250} h={58} arm={ph(arrows, 0, .4)} />)}
      {[0, 1, 2].map(i => <Stick key={'b' + i} x={1110 + i * 38} y={690} h={58} arm={ph(arrows, .2, .6)} />)}
      <path d="M1090 200 Q1050 230 1010 300 m-4 -26 l4 26 l22 -14" stroke={CHALK} strokeWidth={4} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${sst(ph(arrows, .3, .7))} 1`} />
      <path d="M1090 640 Q1040 620 1010 590 m24 4 l-24 -4 l6 24" stroke={CHALK} strokeWidth={4} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${sst(ph(arrows, .5, .9))} 1`} />
    </g>}
    {/* posters and the wall calendar (above the desk on the right) */}
    <g>
      <rect x={1336} y={140} width={200} height={270} fill={SEP} opacity={.3} transform="translate(8 8)" />
      <rect x={1336} y={140} width={200} height={270} fill={mix('#F3E7CC', '#E0C890', ak)} stroke={SEP} strokeWidth={2} />
      {poster.map((p, i) => { const a = cl(1 - Math.abs(pi - i)); if (a <= 0) return null;
        return <g key={p} opacity={a}>
          {p === 'rocket' && <g><rect x={1346} y={150} width={180} height={250} fill="#1C2650" /><path d="M1436 180 L1452 220 L1452 330 L1420 330 L1420 220Z" fill="#F3E7CC" stroke={SEP} strokeWidth={1.6} /><path d="M1420 300 l-14 34 h14Z M1452 300 l14 34 h-14Z" fill="#B8432A" /><path d="M1426 334 q10 40 20 0" fill="#F3B44A" /><Fell x={1436} y={385} s={22} t="APOLLO" col="#F3E7CC" sc /></g>}
          {p === 'earth' && <g><rect x={1346} y={150} width={180} height={250} fill="#0B1030" /><circle cx={1436} cy={260} r={70} fill="#3E7FA3" stroke="#9CCAD6" strokeWidth={2} /><path d="M1410 220 q30 -10 40 20 q-10 30 10 50 q-30 10 -40 -20Z" fill="#C9AE6C" /><path d="M1395 240 q20 -30 70 -40" stroke="#FFFFFF" strokeWidth={6} opacity={.5} fill="none" /><Fell x={1436} y={385} s={22} t="EARTH" col="#F3E7CC" sc /></g>}
          {p === 'disk' && <g><rect x={1346} y={150} width={180} height={250} fill="#D8D2C0" /><rect x={1376} y={190} width={120} height={120} fill="#2A2A2A" stroke={SEP} strokeWidth={2} /><rect x={1406} y={190} width={60} height={34} fill="#A8A8A8" /><rect x={1396} y={250} width={80} height={56} fill="#F3E7CC" /><Fell x={1436} y={385} s={22} t="DATA" col={SEP} sc /></g>}
        </g>; })}
      <rect x={1600} y={120} width={190} height={250} fill={SEP} opacity={.3} transform="translate(8 8)" />
      <rect x={1600} y={120} width={190} height={250} fill="#FBF4E2" stroke={SEP} strokeWidth={2} />
      <rect x={1600} y={120} width={190} height={24} fill="#B8432A" stroke={SEP} strokeWidth={2} />
      <text x={1695} y={192} fontSize={50} fontFamily={FIG} fill={SEP} textAnchor="middle">{year}</text>
      {Array.from({ length: 5 }, (_, r) => Array.from({ length: 7 }, (_, c) => <rect key={r + '_' + c} x={1612 + c * 24} y={212 + r * 30} width={18} height={20} fill="none" stroke={SEP} strokeWidth={1} opacity={.6} />))}
      {ak > 0 && ak < 1 && <path d={`M1600 ${120} l190 0 l-30 ${f1(60 + 40 * Math.sin(tm * 6))} l-160 10Z`} fill="#FBF4E2" stroke={SEP} strokeWidth={1.4} opacity={.8} />}
    </g>
    {/* the desk */}
    <rect x={-100} y={DK} width={2120} height={300} fill="#6A4430" />
    <rect x={-100} y={DK} width={2120} height={30} fill="#8C5A36" stroke={SEP} strokeWidth={2} />
    <rect x={-100} y={DK + 30} width={2120} height={30} fill={SEP} opacity={.3} />
    <path d={`M420 ${DK + 4} l240 -6 l12 22 l-240 6Z`} fill="#FBF4E2" stroke={SEP} strokeWidth={1.4} />
    {Array.from({ length: 8 }, (_, i) => <Line key={i} d={`M440 ${DK + 4 + i * 2.4} l220 -5`} w={.8} a={.4} />)}
    {/* the plant grows */}
    {(() => { const hgt = 60 + ak * 420, base: Pt = [230, DK]; return <g>
      <path d={`M${base[0] - 3} ${base[1] - 4} Q${base[0] + 10} ${base[1] - hgt * .5} ${base[0] - 6 + Math.sin(tm) * 4} ${base[1] - hgt}`} stroke="#4F7A4A" strokeWidth={5} fill="none" />
      {Array.from({ length: Math.floor(3 + ak * 9) }, (_, i) => { const t = (i + 1) / (4 + ak * 9), lx = base[0] + Math.sin(t * 3) * 6, ly = base[1] - hgt * t, sd = i % 2 ? 1 : -1;
        return <path key={i} d={`M${f1(lx)} ${f1(ly)} q${sd * 30} -24 ${sd * 64} -6 q${-sd * 30} 18 ${-sd * 64} 6Z`} fill="#5F8A5A" stroke={SEP} strokeWidth={1.4} />; })}
      <path d={`M${base[0] - 46} ${base[1] - 60} H${base[0] + 46} L${base[0] + 34} ${base[1]} H${base[0] - 34}Z`} fill="#B0602A" stroke={SEP} strokeWidth={2} />
      <ellipse cx={base[0] + 20} cy={base[1] + 4} rx={60} ry={8} fill={SEP} opacity={.3} />
    </g>; })()}
    <KeyLight id={id} a={.5} />
  </g>;
};

// ================================================================ 10. SNO SPHERE — a vast cavern 2 km down: a geodesic sphere of light sensors, an acrylic ball inside
// crack 0..1 (default 1 = open) the scene opens out of a jagged crack in a rock wall; eyes 0..1 sensors light up in a ripple (top → bottom);
// flash 0..1 a spark passes through and the sensors near it flash.
const FIB = (() => { const o: [N, N, N][] = [], n = 1500, ga = Math.PI * (3 - Math.sqrt(5)); for (let i = 0; i < n; i++) { const yy = 1 - (i + .5) / n * 2, r = Math.sqrt(1 - yy * yy), th = ga * i; o.push([Math.cos(th) * r, yy, Math.sin(th) * r]); } return o; })();
const GC = (() => { const out: [N, N, N][][] = []; for (let k = 0; k < 15; k++) { const a = k * 47 * D, b = (25 + (k % 5) * 30) * D, n: [N, N, N] = [Math.cos(a) * Math.sin(b), Math.cos(b), Math.sin(a) * Math.sin(b)];
  let u: [N, N, N] = [n[1] * 0 - n[2] * 1, n[2] * 0 - n[0] * 0, n[0] * 1 - n[1] * 0]; const ul = Math.hypot(...u) || 1; u = [u[0] / ul, u[1] / ul, u[2] / ul];
  const v: [N, N, N] = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]];
  out.push(Array.from({ length: 73 }, (_, i) => { const t = i / 72 * TAU; return [u[0] * Math.cos(t) + v[0] * Math.sin(t), u[1] * Math.cos(t) + v[1] * Math.sin(t), u[2] * Math.cos(t) + v[2] * Math.sin(t)] as [N, N, N]; })); } return out; })();
const SNOSphere: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, crack = 1, eyes = 0, flash = 0 }) => {
  const id = 'sfsn', dr = cl(draw * 1.5), CX = 960, CY = 500, R = 380, W: Pt = [CX + 120, CY + 70], WR = 170;
  const fA: Pt = [260, 60], fB: Pt = [1700, 1000], fp = sst(flash), fpos: Pt = [lerp(fA[0], fB[0], fp), lerp(fA[1], fB[1], fp)], fOn = flash > 0 && flash < 1;
  const cw = sst(crack) * 1260 + 4;
  const sensors = FIB.filter(p => p[2] > 0.05).map(([X, Y, Z], i) => { const sx = CX + X * R, sy = CY + Y * R; if (Math.hypot(sx - W[0], sy - W[1]) < WR + 8) return null;
    const d = (Y + 1) / 2, lit = cl((eyes * 1.25 - d) * 5), fd = fOn ? Math.exp(-Math.pow(Math.hypot(sx - fpos[0], sy - fpos[1]) / 70, 2)) : 0, r = 3 + Z * 4.5;
    return <g key={i}><circle cx={f1(sx)} cy={f1(sy)} r={f1(r)} fill={mix('#9A7A36', '#FFF0B0', lit)} stroke={SEP} strokeWidth={.7} />
      <circle cx={f1(sx)} cy={f1(sy)} r={f1(r * .5)} fill={mix('#2A2018', '#FFFDF0', lit)} />
      {fd > .08 && <circle cx={f1(sx)} cy={f1(sy)} r={f1(r * (2 + fd * 3))} fill="#FFFDF0" opacity={fd} />}</g>; });
  const runs: string[] = []; GC.forEach(c => { let cur: Pt[] = []; c.forEach(([X, Y, Z]) => { if (Z > 0) cur.push([CX + X * R, CY + Y * R]); else { if (cur.length > 1) runs.push(pathOf(cur)); cur = []; } }); if (cur.length > 1) runs.push(pathOf(cur)); });
  const jag = (sd: N) => Array.from({ length: 21 }, (_, i) => { const yy = -60 + i * 60, j = (rnd(i * 3 + (sd > 0 ? 1 : 7)) - .5) * .35; return `${f1(960 + sd * cw * (1 + j) + (rnd(i + 40) - .5) * 30)} ${yy}`; });
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{rgrad(id + 'cv', [[0, '#8C7A62'], [.6, '#5A4A3A'], [1, '#2A221C']], .5, .45, .6)}{rgrad(id + 'sp', [[0, '#5A4A30'], [.7, '#3A2E1E'], [1, '#1E1810']], .4, .35, .7)}
      {rgrad(id + 'ac', [[0, '#E8F6FA', .8], [.7, '#9CCAD6', .5], [1, '#4A88AE', .7]], .4, .35, .7)}</defs>
    {/* the cavern */}
    <rect x={-100} y={-100} width={2120} height={1280} fill="#2A221C" />
    <path d="M-100 1100 L-40 500 Q80 40 960 -20 Q1840 40 1960 500 L2020 1100Z" fill={`url(#${id}cv)`} />
    {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M${f1(rnd(i) * 1920)} ${f1(rnd(i + 1) * 900)} l${f1(50 + rnd(i + 2) * 120)} ${f1(30 - rnd(i + 3) * 60)} l${f1(40 + rnd(i + 4) * 60)} ${f1(20 + rnd(i + 5) * 30)}`} stroke={SEP} strokeWidth={2} fill="none" opacity={.5} />)}
    <Stipple x={0} y={0} w={1920} h={1000} n={1600} seed="sfsn" col={SEP} a={.4} />
    {/* floodlights on the vault */}
    {[560, 1360].map(lx => <g key={lx}><path d={`M${lx - 20} 90 L${lx + 20} 90 L${lx + 520 * Math.sign(960 - lx) + 200} 1000 L${lx + 520 * Math.sign(960 - lx) - 200} 1000Z`} fill="#FFF6DC" opacity={.06} />
      <rect x={lx - 26} y={60} width={52} height={34} fill="#3A3E42" stroke={SEP} strokeWidth={2} /><rect x={lx - 20} y={90} width={40} height={6} fill="#FFFBE0" /></g>)}
    {/* the deck */}
    <ellipse cx={CX + 40} cy={CY + R + 70} rx={R * 1.05} ry={50} fill={SEP} opacity={.55} filter="url(#b8)" />
    <path d="M-100 950 H2020 V1180 H-100Z" fill="#4E4842" stroke={SEP} strokeWidth={2} />
    {Array.from({ length: 24 }, (_, i) => <Line key={i} d={`M${i * 90 - 60} 950 L${i * 120 - 400} 1180`} w={1.2} a={.4} />)}
    <Line d="M-100 900 H2020 M-100 950 H2020" w={4} col="#B8862B" a={1} />
    {Array.from({ length: 30 }, (_, i) => <Line key={i} d={`M${i * 70 - 40} 900 V950`} w={3} col="#B8862B" a={1} />)}
    {/* support legs */}
    {[-.8, -.3, .3, .8].map((k, i) => <path key={i} d={`M${CX + k * R * .9} ${CY + Math.sqrt(1 - k * k * .81) * R * .9} L${CX + k * R * 1.1} 950`} stroke={SEP} strokeWidth={14} />)}
    {/* the geodesic sphere */}
    <circle cx={CX} cy={CY} r={R} fill={`url(#${id}sp)`} stroke={SEP} strokeWidth={3} />
    {runs.map((d, i) => <path key={i} d={d} stroke="#B8A070" strokeWidth={2.2} fill="none" opacity={.7} />)}
    {sensors}
    {/* the cut-away window: the clear acrylic ball inside */}
    <circle cx={W[0]} cy={W[1]} r={WR + 6} fill="#141018" stroke={SEP} strokeWidth={3} />
    <circle cx={W[0] - 20} cy={W[1] - 16} r={WR * .96} fill={`url(#${id}ac)`} stroke="#CFEAF0" strokeWidth={2} />
    <ellipse cx={W[0] - 70} cy={W[1] - 70} rx={40} ry={22} fill="#FFFFFF" opacity={.6} transform={`rotate(-35 ${W[0] - 70} ${W[1] - 70})`} />
    <circle cx={W[0]} cy={W[1]} r={WR + 6} fill="none" stroke="#B8862B" strokeWidth={7} />
    {/* tiny workers for scale */}
    <Worker x={300} y={900} h={70} /><Worker x={380} y={905} h={72} face={-1} col="#2E5C86" /><Worker x={1560} y={902} h={70} face={-1} />
    {eyes > 0 && <circle cx={CX} cy={CY} r={R + 40} fill="#FFF0B0" opacity={.12 * eyes} filter="url(#b30)" />}
    {fOn && <Spark x={fpos[0]} y={fpos[1]} ang={Math.atan2(fB[1] - fA[1], fB[0] - fA[0]) / D} r={9} len={180} />}
    <KeyLight id={id} a={.5} />
    {/* the rock wall it opens out of */}
    {crack < 1 && <g>
      <path d={`M-200 -200 H2120 V1280 H-200Z M${jag(-1).join(' L')} L${jag(1).reverse().join(' L')}Z`} fillRule="evenodd" fill="#3E352D" stroke={SEP} strokeWidth={4} />
      <Stipple x={0} y={0} w={1920} h={1080} n={1400} seed="sfsnw" col="#120C08" a={.4 * (1 - crack)} />
      <path d={`M${jag(-1).join(' L')}`} stroke="#F3D88E" strokeWidth={5} fill="none" opacity={.45} />
      <path d={`M${jag(1).join(' L')}`} stroke="#F3D88E" strokeWidth={5} fill="none" opacity={.45} />
    </g>}
  </g>;
};

// ================================================================ 11. THREE DOORS — inside the sphere: three tall doors (red, blue, green); the neutrino in a coat
// open 0..1 the doors open; walk 0..1 the neutrino in a RED coat walks into the red door, it shuts, it comes out of the BLUE door in a BLUE coat;
// coats 0..1 three coats hang on pegs; eye 0..1 a little tank with an eye sees only the red coat; all 0..1 all three coats light up.
const DCOL = ['#B8432A', '#2E5C9A', '#3E7A4A'];
const NuGuy: React.FC<any> = ({ x, y, coat, ph: p = 0, sc = 1, op: a = 1, tm = 0 }) => {
  if (a <= 0) return null; const u = sc, sw = Math.sin(p * TAU) * 14 * u;
  return <g opacity={a}>
    <ellipse cx={x + 10 * u} cy={y + 2} rx={40 * u} ry={7 * u} fill={SEP} opacity={.4} />
    <Line d={`M${x - 9 * u} ${y - 46 * u} L${x - 9 * u + sw} ${y} M${x + 9 * u} ${y - 46 * u} L${x + 9 * u - sw} ${y}`} w={7 * u} col={SEP} a={1} />
    <ellipse cx={x - 9 * u + sw + 6 * u} cy={y - 2} rx={11 * u} ry={5 * u} fill={SEP} /><ellipse cx={x + 9 * u - sw + 6 * u} cy={y - 2} rx={11 * u} ry={5 * u} fill={SEP} />
    <Line d={`M${x - 24 * u} ${y - 96 * u} L${x - 34 * u - sw * .6} ${y - 52 * u} M${x + 24 * u} ${y - 96 * u} L${x + 34 * u + sw * .6} ${y - 52 * u}`} w={13 * u} col={mix(coat, '#000000', .25)} a={1} />
    <path d={`M${x - 26 * u} ${y - 104 * u} L${x + 26 * u} ${y - 104 * u} L${x + 36 * u} ${y - 40 * u} L${x - 36 * u} ${y - 40 * u}Z`} fill={coat} stroke={SEP} strokeWidth={2 * u} />
    <path d={`M${x - 12 * u} ${y - 104 * u} L${x} ${y - 82 * u} L${x + 12 * u} ${y - 104 * u}`} fill="#F3E7CC" stroke={SEP} strokeWidth={1.4 * u} />
    {[0, 1, 2].map(i => <circle key={i} cx={x} cy={y - (76 - i * 14) * u} r={3 * u} fill="#F3D88E" stroke={SEP} strokeWidth={.8} />)}
    <circle cx={x} cy={y - 136 * u} r={60 * u} fill={VER} opacity={.22} />
    <circle cx={x} cy={y - 136 * u} r={34 * u + Math.sin(tm * 9) * 1.5 * u} fill="#E2582E" stroke={SEP} strokeWidth={2.4 * u} /><circle cx={x - 8 * u} cy={y - 146 * u} r={14 * u} fill="#FFD9A0" opacity={.8} />
    {[0, 1, 2].map(i => { const a2 = (200 + i * 25) * D; return <Line key={i} d={`M${f1(x + Math.cos(a2) * 40 * u)} ${f1(y - 136 * u + Math.sin(a2) * 40 * u)} l${f1(Math.cos(a2) * (20 + 8 * Math.sin(tm * 7 + i)) * u)} ${f1(Math.sin(a2) * 20 * u)}`} w={4 * u} col={VER} a={.7} />; })}
    <circle cx={x + 6 * u} cy={y - 142 * u} r={4 * u} fill={SEP} /><circle cx={x + 20 * u} cy={y - 142 * u} r={4 * u} fill={SEP} />
    <path d={`M${x + 4 * u} ${y - 126 * u} q9 ${7 * u} ${18 * u} 0`} stroke={SEP} strokeWidth={2.4 * u} fill="none" />
  </g>;
};
const Coat: React.FC<any> = ({ x, y, col, glow = 0, dim = 0 }) => <g>
  {glow > 0 && <circle cx={x} cy={y + 90} r={110} fill={mix(col, '#FFFFFF', .5)} opacity={.5 * glow} filter="url(#b30)" />}
  <circle cx={x} cy={y} r={7} fill="#B8862B" stroke={SEP} strokeWidth={1.4} />
  <path d={`M${x} ${y + 6} L${x - 40} ${y + 30} H${x + 40}Z`} fill="none" stroke={SEP} strokeWidth={2.4} />
  <path d={`M${x - 42} ${y + 30} L${x - 62} ${y + 140} L${x - 46} ${y + 144} L${x - 38} ${y + 80} L${x - 40} ${y + 180} H${x + 40} L${x + 38} ${y + 80} L${x + 46} ${y + 144} L${x + 62} ${y + 140} L${x + 42} ${y + 30}Z`} fill={col} stroke={SEP} strokeWidth={2.4} />
  <path d={`M${x - 14} ${y + 30} L${x} ${y + 60} L${x + 14} ${y + 30}`} fill="#F3E7CC" stroke={SEP} strokeWidth={1.4} />
  <Line d={`M${x} ${y + 60} V${y + 178}`} w={1.4} a={.7} />
  {dim > 0 && <path d={`M${x - 62} ${y} H${x + 62} V${y + 182} H${x - 62}Z`} fill="#1A1410" opacity={.62 * dim} />}
</g>;
const ThreeDoors: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, open = 0, walk = 0, coats = 0, eye = 0, all = 0 }) => {
  const id = 'sftd', dr = cl(draw * 1.5), FB = 860, DW = 240, DH = 540, DX = [520, 920, 1320], wk = walk > 0 ? 1 : 0;
  const doorO = [
    lerp(open, ph(walk, .08, .22) * (1 - ph(walk, .4, .5)), wk),
    lerp(open, ph(walk, .52, .62), wk),
    lerp(open, 0, wk) ];
  // the walker: 0–.36 to the red door, .3–.42 into it (smaller, fading); .58–.7 out of the blue door; .7–1 forward to the right
  const inA = 1 - ph(walk, .34, .42), outA = ph(walk, .6, .68), inX = lerp(150, DX[0], sst(ph(walk, 0, .36))), inS = lerp(1, .75, ph(walk, .3, .42));
  const outX = lerp(DX[1], 1180, sst(ph(walk, .68, 1))), outY = lerp(FB - 8, FB + 120, sst(ph(walk, .66, 1))), outS = lerp(.75, 1.1, sst(ph(walk, .6, 1)));
  const cA = Math.max(coats, eye, all), dimK = eye * (1 - all);
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{rgrad(id + 'w', [[0, '#6A5232'], [.7, '#3A2E22'], [1, '#1E1810']], .5, .4, .8)}{rgrad(id + 'in', [[0, '#FFFFF4'], [.6, '#FFF0C0'], [1, '#F3C060']])}</defs>
    <rect x={-100} y={-100} width={2120} height={FB + 100} fill={`url(#${id}w)`} />
    {Array.from({ length: 9 }, (_, r) => Array.from({ length: 34 }, (_, c) => { const xx = c * 60 + (r % 2) * 30 - 20, yy = 40 + r * 90 + Math.pow((xx - 960) / 960, 2) * 40;
      return <circle key={r + '_' + c} cx={xx} cy={yy} r={11} fill="#8A6A36" stroke={SEP} strokeWidth={.8} opacity={.6} />; }))}
    <rect x={-100} y={FB} width={2120} height={400} fill="#2A2018" />
    <Line d={`M-100 ${FB} H2020`} w={3} a={1} />
    {DX.map((dx, i) => { const o = sst(doorO[i]), th = o * 78 * D, cs = Math.cos(th), L = dx - DW / 2, T = FB - DH;
      return <g key={i}>
        {/* light spilling from the open door onto the floor */}
        <path d={`M${L} ${FB} H${L + DW} L${L + DW + 140} 1090 H${L - 140}Z`} fill="#FFF0C0" opacity={.35 * o} />
        <rect x={L - 26} y={T - 34} width={DW + 52} height={DH + 34} fill="#8A6A3A" stroke={SEP} strokeWidth={2.4} />
        <rect x={L - 40} y={T - 56} width={DW + 80} height={28} fill="#B8862B" stroke={SEP} strokeWidth={2.4} />
        <rect x={L} y={T} width={DW} height={DH} fill="#1A1410" />
        <rect x={L} y={T} width={DW} height={DH} fill={`url(#${id}in)`} opacity={o} />
        <g transform={`translate(${L} 0) scale(${f1(Math.max(.03, cs) * 1000) / 1000} 1) translate(${-L} 0)`}>
          <rect x={L} y={T} width={DW} height={DH} fill={DCOL[i]} stroke={SEP} strokeWidth={3} />
          <rect x={L + 26} y={T + 30} width={DW - 52} height={DH * .38} fill="none" stroke={SEP} strokeWidth={2} opacity={.7} />
          <rect x={L + 26} y={T + 60 + DH * .38} width={DW - 52} height={DH * .42} fill="none" stroke={SEP} strokeWidth={2} opacity={.7} />
          <rect x={L + 30} y={T + 34} width={DW - 60} height={8} fill="#FFFFFF" opacity={.15} />
          <circle cx={L + DW - 30} cy={T + DH * .55} r={11} fill="#D4A846" stroke={SEP} strokeWidth={2} />
        </g>
        {o > .02 && <rect x={L - 3 + DW * cs} y={T} width={10 * Math.sin(th) + 2} height={DH} fill="#1A1410" />}
      </g>; })}
    {/* coats on pegs */}
    {cA > 0 && <g opacity={ph(cA, 0, .3)}>
      <rect x={1560} y={300} width={330} height={20} fill="#6A4430" stroke={SEP} strokeWidth={2} />
      {DCOL.map((c, i) => <Coat key={i} x={1620 + i * 105} y={318} col={c} glow={Math.max(all, i === 0 ? eye : 0)} dim={i === 0 ? 0 : dimK} />)}
    </g>}
    {/* the little tank with an eye */}
    {eye > 0 && <g opacity={ph(eye, 0, .3)}>
      <path d={`M240 1010 L230 1060 M380 1010 L390 1060`} stroke={SEP} strokeWidth={6} />
      <path d="M180 930 H420 A24 60 0 0 1 420 1050 H180 A24 60 0 0 1 180 930Z" fill="#8A96A0" stroke={SEP} strokeWidth={2.4} />
      <ellipse cx={180} cy={990} rx={24} ry={60} fill="#B8C4CC" stroke={SEP} strokeWidth={2.4} />
      <ellipse cx={440} cy={970} rx={44} ry={32} fill="#FBF4E2" stroke={SEP} strokeWidth={2.4} />
      <circle cx={458} cy={960} r={18} fill="#2E5C86" /><circle cx={462} cy={956} r={9} fill={SEP} /><circle cx={466} cy={951} r={4} fill="#FFFFFF" />
      <path d="M396 958 Q440 920 484 958" stroke={SEP} strokeWidth={3} fill="none" />
      <path d={`M486 950 L1600 ${400}`} stroke={VER} strokeWidth={3} strokeDasharray="14 12" opacity={ph(eye, .3, .7)} />
    </g>}
    {/* the neutrino in its coat */}
    {walk > 0 && inA > 0 && <NuGuy x={inX} y={FB - 8 * inS} coat={DCOL[0]} ph={walk * 6} sc={inS} op={inA} tm={tm} />}
    {walk > 0 && outA > 0 && <NuGuy x={outX} y={outY} coat={DCOL[1]} ph={walk * 6} sc={outS} op={outA} tm={tm} />}
    {walk <= 0 && <NuGuy x={150} y={FB + 60} coat={DCOL[0]} ph={tm * .5} sc={1} tm={tm} />}
    <KeyLight id={id} a={.5} />
  </g>;
};

// ================================================================ 12. SUN FURNACE — the Sun as a cutaway, a wedge open on a furnace-like glowing heart
// open 0..1 the wedge opens; feed 0..1 small iron weights marked "t" tumble into the heart and vanish; shine 0..1 light streams out in all
// directions; ages 0..1 a round window on the right shows ages passing: young molten Earth → oceans → forests → a city.
const SunFurnace: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, open = 0, feed = 0, shine = 0, ages = 0 }) => {
  const id = 'sfsf', dr = cl(draw * 1.5), ak = sst(ages), CX = 960 - 300 * ak, CY = 540, R = 380 - 40 * ak, o = sst(open), a0 = -95 * D, a1 = a0 + o * 105 * D;
  const P = (a: N, r: N): Pt => [CX + Math.cos(a) * r, CY + Math.sin(a) * r], fl = .92 + .08 * Math.sin(tm * 9) * Math.sin(tm * 3.7);
  const wedge = (r: N) => { const p0 = P(a0, r), p1 = P(a1, r); return `M${CX} ${CY} L${f1(p0[0])} ${f1(p0[1])} A${r} ${r} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}Z`; };
  const WX = 1560, WY = 540, WR = 230, idx = ages * 3;
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{rgrad(id + 'sn', [[0, '#FFE9A0'], [.75, '#F3B44A'], [1, '#C8602A']], .45, .4, .6)}{rgrad(id + 'co', [[0, '#FFE6A0', .55], [1, '#FFC860', 0]])}
      {rgrad(id + 'in', [[0, '#FFFFFF'], [.18, '#FFFFF0'], [.3, '#FFF0A0'], [.55, '#FFB040'], [.8, '#E0642A'], [1, '#A83A20']])}
      <clipPath id={id + 'wd'}><path d={wedge(R - 1)} /></clipPath><clipPath id={id + 'win'}><circle cx={WX} cy={WY} r={WR} /></clipPath></defs>
    <NightWash x={-100} y={-100} w={2120} h={1280} seed="sfsf" />
    {starField(57, 120, 0, 0, 1920, 1080).map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r * .8} a={.7} />)}
    <circle cx={CX} cy={CY} r={R * 1.7} fill={`url(#${id}co)`} opacity={.6 + .4 * shine} />
    {/* light streaming out in all directions */}
    {shine > 0 && Array.from({ length: 40 }, (_, i) => { const a = i / 40 * TAU, p = fr(tm * .5 + rnd(i)), r0 = R * 1.05 + p * 500 * shine, L = 60 + 80 * shine;
      return <Line key={i} d={`M${f1(CX + Math.cos(a) * r0)} ${f1(CY + Math.sin(a) * r0)} L${f1(CX + Math.cos(a) * (r0 + L))} ${f1(CY + Math.sin(a) * (r0 + L))}`} w={5} col="#FFE6A0" a={shine * (1 - p) * .9} />; })}
    {shine > 0 && Array.from({ length: 20 }, (_, i) => { const a = (i + .5) / 20 * TAU; return <path key={'r' + i} d={`M${f1(CX + Math.cos(a - .03) * R)} ${f1(CY + Math.sin(a - .03) * R)} L${f1(CX + Math.cos(a) * (R + 900 * shine))} ${f1(CY + Math.sin(a) * (R + 900 * shine))} L${f1(CX + Math.cos(a + .03) * R)} ${f1(CY + Math.sin(a + .03) * R)}Z`} fill="#FFF0C0" opacity={.12 * shine} />; })}
    {/* the Sun */}
    <circle cx={CX} cy={CY} r={R} fill={`url(#${id}sn)`} stroke="#8C3424" strokeWidth={3} />
    {Array.from({ length: 70 }, (_, i) => { const a = rnd(i) * TAU, r = Math.sqrt(rnd(i + 3)) * R * .92; return <circle key={i} cx={f1(CX + Math.cos(a) * r)} cy={f1(CY + Math.sin(a) * r)} r={8 + rnd(i + 5) * 14} fill="#F8D070" opacity={.4} />; })}
    {[[-.3, .2], [.25, .45]].map(([dx, dy], i) => <ellipse key={i} cx={CX + dx * R} cy={CY + dy * R} rx={22} ry={14} fill="#8C3424" opacity={.6} />)}
    {/* the cut-away wedge: the furnace heart */}
    {o > .01 && <g>
      <path d={wedge(R)} fill="#3A1A0E" />
      <g clipPath={`url(#${id}wd)`}>
        <circle cx={CX} cy={CY} r={R} fill={`url(#${id}in)`} />
        {[.3, .55, .78].map((k, i) => <circle key={i} cx={CX} cy={CY} r={R * k} fill="none" stroke="#8C3424" strokeWidth={2} opacity={.5} />)}
        {Array.from({ length: 10 }, (_, i) => { const a = a0 + (i + .5) / 10 * (a1 - a0), pa = P(a, R * .8), pb = P(a + .08, R * .95); return <path key={i} d={`M${f1(pa[0])} ${f1(pa[1])} Q${f1(pb[0])} ${f1(pb[1])} ${f1(P(a + .16, R * .8)[0])} ${f1(P(a + .16, R * .8)[1])}`} stroke="#C0502A" strokeWidth={3} fill="none" opacity={.6} />; })}
        <circle cx={CX} cy={CY} r={R * .34 * fl} fill="#FFFFFF" opacity={.95} filter="url(#b8)" /><circle cx={CX} cy={CY} r={R * .5} fill="#FFF6C0" opacity={.4} filter="url(#b30)" />
        {Array.from({ length: 8 }, (_, i) => { const a = i / 8 * TAU + tm, r1 = R * (.2 + .06 * Math.sin(tm * 6 + i)); return <path key={i} d={`M${CX} ${CY} L${f1(CX + Math.cos(a - .2) * R * .1)} ${f1(CY + Math.sin(a - .2) * R * .1)} L${f1(CX + Math.cos(a) * r1)} ${f1(CY + Math.sin(a) * r1)} L${f1(CX + Math.cos(a + .2) * R * .1)} ${f1(CY + Math.sin(a + .2) * R * .1)}Z`} fill="#FFF6D0" opacity={.7} />; })}
      </g>
      <path d={wedge(R)} fill="none" stroke={SEP} strokeWidth={3} />
      <Line d={`M${CX} ${CY} L${f1(P(a0, R)[0])} ${f1(P(a0, R)[1])} M${CX} ${CY} L${f1(P(a1, R)[0])} ${f1(P(a1, R)[1])}`} w={5} col="#8C3424" a={1} />
    </g>}
    {/* iron weights tumbling into the heart */}
    {feed > 0 && Array.from({ length: 6 }, (_, i) => { const p = ph(feed, i * .12, i * .12 + .4); if (p <= 0 || p >= 1) return null;
      const sx = 120 + i * 30, sy = -60, ex = CX + 12, ey = CY - 10, px = lerp(sx, ex, sst(p)), py = lerp(sy, ey, p * p), sc = 1 - ph(p, .7, 1) * .9, rot = p * 540 + i * 40;
      return <g key={i} transform={`translate(${f1(px)} ${f1(py)}) rotate(${f1(rot)}) scale(${f1(sc * 1.6)})`} opacity={1 - ph(p, .9, 1)}>
        <path d="M-44 26 L-28 -16 L28 -16 L44 26Z" fill="#3A3632" stroke={SEP} strokeWidth={2.4} />
        <rect x={-10} y={-26} width={20} height={11} rx={3} fill="#3A3632" stroke={SEP} strokeWidth={2} />
        <path d="M-26 -12 L26 -12" stroke="#8A8478" strokeWidth={3} />
        <text x={0} y={18} fontSize={28} fontFamily="'IM Fell English', serif" fill="#F3E7CC" textAnchor="middle">1 t</text>
        {p > .8 && <circle cx={0} cy={0} r={40} fill="#FFFFFF" opacity={(p - .8) * 4} />}</g>; })}
    {/* the window of ages */}
    {ages > 0 && <g opacity={ph(ages, 0, .12)}>
      <circle cx={WX + 10} cy={WY + 14} r={WR + 30} fill={SEP} opacity={.4} filter="url(#b8)" />
      <g clipPath={`url(#${id}win)`}>
        {[0, 1, 2, 3].map(i => { const a = cl(1 - Math.abs(idx - i)); if (a <= 0) return null; const L = WX - WR, T = WY - WR, H = WY + 40;
          return <g key={i} opacity={a}>
            <rect x={L} y={T} width={WR * 2} height={WR * 2} fill={['#5A2A1E', '#9CCAD6', '#C9DDE6', '#E8C8A0'][i]} />
            <circle cx={WX - 120} cy={T + 80} r={34} fill="#FFE6A0" stroke="#E0A040" strokeWidth={3} />
            {i === 0 && <g><path d={`M${L} ${H} L${WX - 40} ${T + 150} L${WX + 20} ${H}Z`} fill="#3A1A10" stroke={SEP} strokeWidth={2} /><rect x={L} y={H} width={WR * 2} height={WR} fill="#2A120C" />
              {[0, 1, 2].map(k => <path key={k} d={`M${L + k * 160} ${H + 40 + k * 30} q80 -20 160 10 t160 0`} stroke="#F08A3A" strokeWidth={8} fill="none" />)}<path d={`M${WX - 40} ${T + 150} q-10 -40 10 -70`} stroke="#F08A3A" strokeWidth={10} fill="none" /></g>}
            {i === 1 && <g><rect x={L} y={H} width={WR * 2} height={WR} fill="#3E7FA3" />{[0, 1, 2, 3].map(k => <path key={k} d={`M${L} ${H + 30 + k * 40} q30 -12 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0`} stroke="#E8F4F4" strokeWidth={3} fill="none" opacity={.7} />)}<path d={`M${WX + 60} ${H} L${WX + 120} ${H - 60} L${WX + 200} ${H - 30} L${WX + 240} ${H}Z`} fill="#8C8070" stroke={SEP} strokeWidth={2} /></g>}
            {i === 2 && <g><rect x={L} y={H} width={WR * 2} height={WR} fill="#5F8A5A" />{Array.from({ length: 12 }, (_, k) => { const tx = L + 20 + k * 40, ty = H + 10 + (k % 2) * 20; return <g key={k}><rect x={tx - 3} y={ty - 10} width={6} height={40} fill="#4F3020" /><path d={`M${tx} ${ty - 90} L${tx + 26} ${ty - 6} L${tx - 26} ${ty - 6}Z`} fill="#2F5440" stroke={SEP} strokeWidth={1.6} /></g>; })}</g>}
            {i === 3 && <g><rect x={L} y={H} width={WR * 2} height={WR} fill="#5A5A58" />{Array.from({ length: 9 }, (_, k) => { const bx = L + 30 + k * 48, bh = 80 + rnd(k) * 150; return <g key={k}><rect x={bx} y={H - bh} width={42} height={bh} fill={['#8C6E4A', '#A39E86', '#6A5A48'][k % 3]} stroke={SEP} strokeWidth={1.6} />
              {Array.from({ length: Math.floor(bh / 30) }, (_, r) => <rect key={r} x={bx + 8} y={H - bh + 10 + r * 30} width={26} height={10} fill="#F3D88E" opacity={.8} />)}</g>; })}</g>}
          </g>; })}
      </g>
      <circle cx={WX} cy={WY} r={WR + 14} fill="none" stroke="#B8862B" strokeWidth={28} />
      <circle cx={WX} cy={WY} r={WR + 14} fill="none" stroke={SEP} strokeWidth={2} transform="translate(0 0)" />
      <circle cx={WX} cy={WY} r={WR} fill="none" stroke={SEP} strokeWidth={3} />
      {Array.from({ length: 16 }, (_, i) => { const a = i / 16 * TAU; return <circle key={i} cx={f1(WX + Math.cos(a) * (WR + 14))} cy={f1(WY + Math.sin(a) * (WR + 14))} r={5} fill="#F3D88E" stroke={SEP} strokeWidth={1} />; })}
    </g>}
  </g>;
};

// ================================================================ 13. LIGHT FIELDS — a morning landscape: beams from a low Sun at top-left fall on a wheat field (left),
// a solar panel on a farmhouse roof (centre) and the face of a girl in profile, eyes closed, light on her cheek (right).
// beam 0..1 the beams stream down and light each in turn; sway 0..1 the wheat sways; glint 0..1 a glint runs across the panel; back 0..1 the
// light runs back up the beams to the Sun.
const LightFields: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, beam = 0, sway = 0, glint = 0, back = 0 }) => {
  const id = 'sflf', dr = cl(draw * 1.5), SUN: Pt = [190, 150], TGT: Pt[] = [[430, 800], [985, 560], [1500, 470]];
  const HZ = 640;
  const bk = (i: N) => sst(ph(beam, i * .28, i * .28 + .4)), lit = (i: N) => ph(beam, i * .28 + .3, i * .28 + .45);
  const beamPath = (i: N, k: N) => { const t = TGT[i], dx = t[0] - SUN[0], dy = t[1] - SUN[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, w0 = 14, w1 = 110 + i * 10, e: Pt = [SUN[0] + dx * k, SUN[1] + dy * k], w = lerp(w0, w1, k);
    return `M${f1(SUN[0] + nx * w0)} ${f1(SUN[1] + ny * w0)} L${f1(e[0] + nx * w)} ${f1(e[1] + ny * w)} L${f1(e[0] - nx * w)} ${f1(e[1] - ny * w)} L${f1(SUN[0] - nx * w0)} ${f1(SUN[1] - ny * w0)}Z`; };
  // the girl's profile (facing left, looking up), local coords about her ear
  const GX = 1650, GY = 540, prof: Pt[] = [[-56, -150], [-92, -108], [-104, -62], [-98, -44], [-110, -22], [-140, 22], [-118, 34], [-120, 48], [-108, 58], [-114, 70], [-100, 84], [-102, 104], [-80, 124], [-40, 132], [-44, 250], [96, 250], [74, 120], [118, 30], [126, -50], [96, -140], [24, -186]];
  const rot = 22 * D, gp = (p: Pt): Pt => [GX + p[0] * Math.cos(rot) - p[1] * Math.sin(rot), GY + p[0] * Math.sin(rot) + p[1] * Math.cos(rot)];
  const face = sm(prof.map(gp), true);
  return <g transform={TR(x, y, s)} opacity={dr}>
    <defs>{grad(id + 'sk', [[0, '#9CC2D6'], [.55, '#F2DCB0'], [1, '#FBE8C0']])}{rgrad(id + 'sun', [[0, '#FFFDF0'], [.3, '#FFF0C0', .9], [1, '#FFE0A0', 0]])}
      {grad(id + 'bm', [[0, '#FFFBE6', .95], [1, '#FFE6A0', .45]])}<clipPath id={id + 'pn'}><path d="M905 570 L955 492 H1135 L1170 570Z" /></clipPath>
      <clipPath id={id + 'fc'}><path d={face} /></clipPath></defs>
    <rect x={-100} y={-100} width={2120} height={HZ + 100} fill={`url(#${id}sk)`} />
    <circle cx={SUN[0]} cy={SUN[1]} r={300 + 60 * back} fill={`url(#${id}sun)`} />
    <circle cx={SUN[0]} cy={SUN[1]} r={150} fill="#FFF4C8" opacity={.6} filter="url(#b30)" /><circle cx={SUN[0]} cy={SUN[1]} r={70} fill="#FFFBEA" stroke="#E0A040" strokeWidth={4} />
    {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * TAU; return <Line key={i} d={`M${f1(SUN[0] + Math.cos(a) * 86)} ${f1(SUN[1] + Math.sin(a) * 86)} L${f1(SUN[0] + Math.cos(a) * 120)} ${f1(SUN[1] + Math.sin(a) * 120)}`} w={4} col="#E0A040" a={.8} />; })}
    {/* far hills, hedges */}
    <path d={`M-100 ${HZ} Q300 ${HZ - 90} 700 ${HZ - 40} T1500 ${HZ - 60} T2020 ${HZ - 30} V${HZ + 40} H-100Z`} fill="#A9B97A" opacity={.8} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={600 + i * 60} cy={HZ - 30 + Math.sin(i) * 8} r={26} fill="#6E8F5A" opacity={.8} />)}
    <path d={`M-100 ${HZ} H2020 V1180 H-100Z`} fill="#C9B46A" />
    <path d={`M700 ${HZ} H2020 V1180 H900Z`} fill="#8FB07A" />
    {/* the farmhouse with its solar panel (front roof slope faces the Sun) */}
    <ellipse cx={1090} cy={716} rx={280} ry={20} fill={SEP} opacity={.3} filter="url(#b8)" />
    <RG d="M880 585 H1200 V712 H880Z" color="#EFE0C2" t={.3} sw={2} />
    <RG d="M1200 585 L1290 560 V700 L1200 712Z" color="#C9AE84" t={.45} sw={2} />
    <RG d="M850 590 L930 470 H1170 L1230 590Z" color="#8C3424" t={.5} sw={2.2} />
    <RG d="M1170 470 L1230 590 L1300 565 L1250 455Z" color="#6A2A1A" t={.5} sw={2} />
    <RG d="M1100 470 V420 H1130 V470Z" color="#8C6E4A" t={.5} sw={1.6} />
    <path d="M905 570 L955 492 H1135 L1170 570Z" fill="#22305E" stroke={SEP} strokeWidth={2.4} />
    {[1, 2, 3, 4].map(k => <Line key={k} d={`M${905 + k * 53} 570 L${955 + k * 36} 492`} w={1.6} col="#9CB0D0" a={.8} />)}
    <Line d="M930 531 H1152" w={1.6} col="#9CB0D0" a={.8} />
    <g clipPath={`url(#${id}pn)`}>{glint > 0 && <path d={`M${f1(780 + glint * 520)} 480 l60 0 l-60 100 l-60 0Z`} fill="#FFFFFF" opacity={.9 * bell(glint, 0, 1)} />}
      <rect x={880} y={480} width={320} height={100} fill="#FFE6A0" opacity={.35 * lit(1)} /></g>
    {[[920, 620], [1120, 620]].map(([wx, wy], i) => <rect key={i} x={wx} y={wy} width={50} height={46} fill="#5A6E7E" stroke={SEP} strokeWidth={1.6} />)}
    <rect x={1015} y={622} width={50} height={90} fill="#4F3020" stroke={SEP} strokeWidth={1.6} />
    {/* the wheat field (left), swaying */}
    {Array.from({ length: 90 }, (_, i) => { const row = i % 3, bx = 20 + rnd(i * 1.9) * 740, by = 1080 - row * 70 + rnd(i) * 30, hgt = 260 - row * 40 + rnd(i + 3) * 60, a = (Math.sin(tm * 1.6 + bx * .01) * (3 + 10 * sway) + 4) * D,
      tx = bx + Math.sin(a) * hgt, ty = by - Math.cos(a) * hgt, c = mix('#C8962E', '#F3D06A', lit(0) * .8);
      return <g key={i}><path d={`M${f1(bx)} ${f1(by)} Q${f1(bx + Math.sin(a) * hgt * .4)} ${f1(by - hgt * .6)} ${f1(tx)} ${f1(ty)}`} stroke="#A8743E" strokeWidth={2.4} fill="none" />
        <ellipse cx={f1(tx + Math.sin(a) * 20)} cy={f1(ty - Math.cos(a) * 20)} rx={9} ry={30} fill={c} stroke={SEP} strokeWidth={1.2} transform={`rotate(${f1(a / D)} ${f1(tx + Math.sin(a) * 20)} ${f1(ty - Math.cos(a) * 20)})`} />
        {[0, 1, 2].map(k => <path key={k} d={`M${f1(tx + Math.sin(a) * (10 + k * 14))} ${f1(ty - Math.cos(a) * (10 + k * 14))} l${f1(-6)} -8 M${f1(tx + Math.sin(a) * (10 + k * 14))} ${f1(ty - Math.cos(a) * (10 + k * 14))} l6 -8`} stroke={SEP} strokeWidth={.8} opacity={.6} />)}</g>; })}
    {/* the girl, in profile, looking up into the light */}
    <path d={`M${GX - 200} 1100 Q${GX - 180} 840 ${GX - 40} 800 Q${GX + 160} 790 ${GX + 300} 1100Z`} fill="#4A88AE" stroke={SEP} strokeWidth={2.4} />
    <path d={face} fill="#E8B894" stroke={SEP} strokeWidth={2.6} />
    <g clipPath={`url(#${id}fc)`}>
      <ellipse cx={gp([-70, 10])[0]} cy={gp([-70, 10])[1]} rx={100} ry={80} fill="#FFE0A8" opacity={.3 + .6 * lit(2)} filter="url(#b8)" />
      <ellipse cx={gp([60, 40])[0]} cy={gp([60, 40])[1]} rx={90} ry={140} fill="#8A5A3C" opacity={.35} filter="url(#b8)" />
    </g>
    {/* hair (from the forehead over the crown to the nape) */}
    <path d={sm([[-60, -156], [10, -200], [104, -150], [136, -50], [130, 40], [110, 140], [150, 230], [80, 170], [70, 60], [50, -30], [-6, -110], [-64, -136]].map(q => gp(q as Pt)) as Pt[], true)} fill="#4F3020" stroke={SEP} strokeWidth={2.4} />
    <path d={sm([[-40, -160], [30, -170], [80, -110]].map(q => gp(q as Pt)) as Pt[])} stroke="#8C5A36" strokeWidth={3} fill="none" />
    {/* closed eye, brow, ear, lips */}
    {(() => { const e = gp([-78, -30]), b = gp([-80, -56]), ear = gp([30, -6]), lp = gp([-110, 58]);
      return <g><path d={`M${f1(e[0] - 20)} ${f1(e[1] - 4)} Q${f1(e[0])} ${f1(e[1] + 10)} ${f1(e[0] + 18)} ${f1(e[1] - 8)}`} stroke={SEP} strokeWidth={2.6} fill="none" />
        {[0, 1, 2].map(k => <Line key={k} d={`M${f1(e[0] - 10 + k * 9)} ${f1(e[1] + 3)} l${-3 + k} 8`} w={1.6} a={1} />)}
        <path d={`M${f1(b[0] - 22)} ${f1(b[1] + 6)} Q${f1(b[0])} ${f1(b[1] - 6)} ${f1(b[0] + 24)} ${f1(b[1] - 2)}`} stroke="#4F3020" strokeWidth={4} fill="none" strokeLinecap="round" />
        <ellipse cx={ear[0]} cy={ear[1]} rx={16} ry={26} fill="#E2A884" stroke={SEP} strokeWidth={2} transform={`rotate(-18 ${ear[0]} ${ear[1]})`} />
        <circle cx={lp[0] + 4} cy={lp[1]} r={4} fill="#C0705A" opacity={.7} /></g>; })()}
    {/* the beams */}
    {[0, 1, 2].map(i => bk(i) > 0 && <g key={i}><path d={beamPath(i, bk(i))} fill={`url(#${id}bm)`} opacity={.75} />
      {lit(i) > 0 && <circle cx={TGT[i][0]} cy={TGT[i][1]} r={120 + 20 * i} fill="#FFF0C0" opacity={.35 * lit(i)} filter="url(#b30)" />}</g>)}
    {/* the light running back up the beams */}
    {back > 0 && [0, 1, 2].map(i => Array.from({ length: 4 }, (_, k) => { const p = cl(back * 1.3 - k * .1), t = TGT[i], px = lerp(t[0], SUN[0], p), py = lerp(t[1], SUN[1], p);
      return p > 0 && p < 1 ? <g key={i + '_' + k}><circle cx={f1(px)} cy={f1(py)} r={24 - k * 4} fill="#FFFDF0" opacity={.9 - k * .2} /><circle cx={f1(px)} cy={f1(py)} r={60 - k * 8} fill="#FFF0C0" opacity={.3} /></g> : null; }))}
    <KeyLight id={id} a={.45} />
  </g>;
};

export const ART_B: Record<string, React.FC<any>> = { CoreDoor, ProtonDance, Typewriter, NeutrinoFlight, ThumbRain, MineShaft, ChlorineTank, AtomGrain, CountWall, SNOSphere, ThreeDoors, SunFurnace, LightFields };
export const SAMPLE_B: Record<string, object> = {
  CoreDoor: { open: .7, heat: .8, tm: 1 }, ProtonDance: { jostle: .4, bump: .5, magnets: .6, tm: 1 }, Typewriter: { type: .8, thermo: .8, tm: 1 },
  NeutrinoFlight: { k: .8, glass: .7, tm: 1 }, ThumbRain: { walk: .4, rain: 1, thumb: 1, tm: 1 }, MineShaft: { drop: .55, tm: 1 },
  ChlorineTank: { grow: .8, fill: .6, sweep: .5, tally: .6, tm: 1 }, AtomGrain: { strike: .7, gold: 0, tm: 1 }, CountWall: { count: 1, gap: 1, arrows: 1, age: .4, tm: 1 },
  SNOSphere: { crack: 1, eyes: .6, flash: .5, tm: 1 }, ThreeDoors: { open: 0, walk: .25, coats: 1, eye: 1, tm: 1 }, SunFurnace: { open: 1, feed: .5, shine: .6, ages: .5, tm: 1 },
  LightFields: { beam: .8, sway: .6, glint: .5, tm: 1 },
};
