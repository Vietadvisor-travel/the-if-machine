// empty-atom — "What is inside an atom?" — every drawing made for this film (owner, 15 Nov 2026), from Muse's references:
// P-01 Geiger & Rutherford in the Manchester lab (white glazed brick, benches, the 1913 box) · D-01-x1 the 1909 reflection set-up (tube AB, lead plate P,
// reflector RR, screen S, microscope M) · D-05-x1 / R-02 the 1913 box with its rotating microscope · R-03 + P-03-x1 Thomson's tube on its wooden stand ·
// R-04 the Victorian pudding · R-05 a 15-inch naval gun · P-07 the spinthariscope (the brass screen-and-lens) · P-08 a stadium from the air ·
// portraits P-01-x2 Marsden, P-01-x3 Geiger, P-04 Rutherford, P-03 Thomson, P-05 Chadwick (costume and period, never a copy).
// Style core only (Region / Ink / Line / Stipple). Light from the upper right.
import React, { useMemo } from 'react';
import { Region, Ink, Line, Stipple, SEP, PIG, tone, mix, ell, poly, seq } from '../../paint/paint';

type N = number; type Pt = [N, N];
const f1 = (v: N) => +v.toFixed(1);
const cl = (x: N, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ph = (d: N, a: N, b: N) => cl((d - a) / (b - a));
const rect = (x: N, y: N, w: N, h: N) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
const rr = (x: N, y: N, w: N, h: N, r: N) => `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y}Z`;
const circ = (x: N, y: N, r: N) => ell(x, y, r, r);
const pathOf = (pts: Pt[], close = false) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L') + (close ? 'Z' : '');
// the shade of the style on the side away from the light (upper right): hatching only in the lower-left of each form
const Shade: React.FC<{ d: string; draw?: N; ang?: N; a?: N; lvl?: N }> = ({ d, draw = 1, ang = 45, a = .55, lvl = 2 }) => {
  const p = cl((draw - .6) / .4); if (p <= 0) return null; const A = (((Math.round(ang / 15) * 15) % 180) + 180) % 180;
  return <g><defs><clipPath id="eaA" clipPathUnits="objectBoundingBox"><path d="M0 .2 L.8 1 L0 1Z" /></clipPath><clipPath id="eaB" clipPathUnits="objectBoundingBox"><path d="M0 .52 L.48 1 L0 1Z" /></clipPath></defs>
    <path d={d} fill={`url(#h1_${A})`} clipPath="url(#eaA)" opacity={a * p} /><path d={d} fill={`url(#h${Math.max(2, lvl)}_${(A + 90) % 180})`} clipPath="url(#eaB)" opacity={a * .8 * p} /></g>;
};
const NOSHADE = new Set(['paper', 'ice', 'inner', 'water', 'gold']);
const SR: React.FC<any> = (pr) => <><Region {...pr} />{pr.hatch !== 0 && !NOSHADE.has(pr.mat) && (pr.a ?? 1) >= 1 && <Shade d={pr.d} draw={pr.draw} ang={(pr.ang ?? 0) + 60} a={.45} lvl={(pr.t ?? .3) > .6 ? 3 : 2} />}</>;
// a polished sphere: wash + curved contour hatching on the shade side + a paper-white highlight (upper right)
const Ball: React.FC<{ x: N; y: N; r: N; mat?: string; t?: N; draw?: N; col?: string; hi?: N; sw?: N }> = ({ x, y, r, mat = 'paper', t = .3, draw = 1, col, hi = 1, sw = 1.3 }) => {
  const id = `bl${Math.round(x)}_${Math.round(y)}_${Math.round(r)}`;
  return <g>
    <Region d={circ(x, y, r)} mat={mat} t={t} color={col} draw={draw} sw={sw} hatch={0} />
    {draw > .6 && <g opacity={ph(draw, .6, 1)}><defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>{Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx={x + r * .55} cy={y - r * .55} rx={r * (1.05 + i * .13)} ry={r * (1.05 + i * .13)} fill="none" stroke={SEP} strokeWidth={Math.max(.4, r / 60)} opacity={.12 + i * .05} />)}</g>
      <ellipse cx={x + r * .38} cy={y - r * .4} rx={r * .22} ry={r * .14} fill="#FFFDF4" opacity={.85 * hi} transform={`rotate(-35 ${x + r * .38} ${y - r * .4})`} /></g>}
  </g>;
};
const Grain: React.FC<{ d: string; n: N; seed: string; x: N; y: N; w: N; h: N; col?: string; a?: N }> = ({ d, n, seed, x, y, w, h, col = SEP, a = .35 }) => {
  const id = 'gr' + seed; return <g><defs><clipPath id={id}><path d={d} /></clipPath></defs><g clipPath={`url(#${id})`}><Stipple x={x} y={y} w={w} h={h} n={n} seed={seed} col={col} a={a} /></g></g>;
};

// ================================================================ THE MANCHESTER LABORATORY (P-01): white glazed brick, a long bench, shelves of bottles,
// cables, a hanging lamp with a conical shade. `dark` 0..1 = the room in the dark with only the lamp's pool lit (the cold open); lamp = the flame
const ManchesterLab: React.FC<{ x?: N; y?: N; s?: N; draw?: N; dark?: N; lamp?: N; lx?: N; pool?: N; seed?: string }> = ({ x = 960, y = 1080, s = 1, draw = 1, dark = 0, lamp = 1, lx = 1180, pool = 520, seed = 'ml' }) => {
  const k = s, T = (dx: N, dy: N): Pt => [x + dx * k, y + dy * k], X = (dx: N) => x + dx * k, Y = (dy: N) => y + dy * k;
  const bricks = useMemo(() => { const o: string[] = []; for (let r = 0; r < 16; r++) { const yy = Y(-1080 + 300 + r * 34); o.push(`M${X(-1100)} ${f1(yy)} H${X(1100)}`); for (let c = 0; c < 26; c++) { const xx = X(-1100 + c * 90 + (r % 2) * 45); o.push(`M${f1(xx)} ${f1(yy)} v${f1(34 * k)}`); } } return o.join(' '); }, [x, y, k]);   // eslint-disable-line
  const bench = rect(X(-1000), Y(-300), 2000 * k, 40 * k), apron = rect(X(-980), Y(-260), 1960 * k, 60 * k);
  const bottles = [[-820, 0], [-760, 1], [-700, 2], [-560, 0], [-500, 1], [520, 2], [600, 0], [680, 1], [760, 2]] as const;
  return <g>
    <SR d={rect(X(-1100), Y(-1080 + 300), 2200 * k, 780 * k)} mat="stone" t={.12} draw={draw} sw={.8} hatch={0} rim={false} />
    <path d={bricks} stroke={SEP} strokeWidth={.6} opacity={.35 * draw} fill="none" />
    <SR d={rect(X(-1100), Y(-500), 2200 * k, 26 * k)} mat="wood" t={.6} draw={draw} sw={1} />
    {/* shelf with bottles and flasks */}
    <SR d={rect(X(-900), Y(-700), 520 * k, 14 * k)} mat="wood" t={.62} draw={draw} sw={1} />
    <SR d={rect(X(480), Y(-700), 420 * k, 14 * k)} mat="wood" t={.62} draw={draw} sw={1} />
    {bottles.map(([bx, kind], i) => { const b = T(bx, -700); return kind === 0 ? <SR key={i} d={`M${b[0] - 18 * k} ${b[1]} V${b[1] - 60 * k} Q${b[0] - 18 * k} ${b[1] - 74 * k} ${b[0] - 6 * k} ${b[1] - 78 * k} V${b[1] - 96 * k} H${b[0] + 6 * k} V${b[1] - 78 * k} Q${b[0] + 18 * k} ${b[1] - 74 * k} ${b[0] + 18 * k} ${b[1] - 60 * k} V${b[1]}Z`} mat="sky" t={.35} draw={draw} sw={.9} />
      : kind === 1 ? <SR key={i} d={`M${b[0] - 26 * k} ${b[1]} L${b[0] - 6 * k} ${b[1] - 60 * k} V${b[1] - 90 * k} H${b[0] + 6 * k} V${b[1] - 60 * k} L${b[0] + 26 * k} ${b[1]}Z`} mat="paper" t={.3} draw={draw} sw={.9} />
      : <SR key={i} d={rect(b[0] - 14 * k, b[1] - 70 * k, 28 * k, 70 * k)} mat="wood" t={.7} draw={draw} sw={.9} />; })}
    {/* cables looping down the wall (as in P-01) */}
    {/* the bench */}
    <SR d={bench} mat="wood" t={.55} ang={0} draw={draw} sw={1.4} />
    <SR d={apron} mat="wood" t={.72} ang={0} draw={draw} sw={1.2} />
    {[-940, -300, 300, 940].map(lx2 => <SR key={lx2} d={rect(X(lx2 - 18), Y(-200), 36 * k, 200 * k)} mat="wood" t={.78} ang={90} draw={draw} sw={1.1} />)}
    {[-640, 640].map(dx => <SR key={dx} d={rect(X(dx - 200), Y(-196), 400 * k, 150 * k)} mat="wood" t={.66} draw={draw} sw={1} />)}
    {[-640, 640].map(dx => <circle key={dx} cx={X(dx)} cy={Y(-120)} r={6 * k} fill="url(#gold)" stroke={SEP} strokeWidth={.8} opacity={draw} />)}
    {/* the hanging lamp over the bench (conical enamel shade) */}
    <Line d={`M${X(lx - 960)} ${Y(-1080)} V${Y(-860)}`} w={1.4 * k} a={draw} />
    <SR d={`M${X(lx - 960 - 70)} ${Y(-780)} L${X(lx - 960 - 14)} ${Y(-860)} H${X(lx - 960 + 14)} L${X(lx - 960 + 70)} ${Y(-780)} Q${X(lx - 960)} ${Y(-770)} ${X(lx - 960 - 70)} ${Y(-780)}Z`} mat="leaf" t={.6} draw={draw} sw={1.2} />
    {lamp > 0 && <g opacity={lamp * draw}><ellipse cx={X(lx - 960)} cy={Y(-776)} rx={34 * k} ry={10 * k} fill="#FFF4D2" /><circle cx={X(lx - 960)} cy={Y(-760)} r={120 * k} fill="url(#glowW)" opacity={.6} /></g>}
    {/* darkness: the room falls into night except the pool of lamplight on the bench */}
    {dark > 0 && <g><defs><radialGradient id={'pool' + seed} gradientUnits="userSpaceOnUse" cx={X(lx - 960)} cy={Y(-330)} r={pool * k}>
      <stop offset="0" stopColor="#0B0806" stopOpacity={0} /><stop offset={.45} stopColor="#0B0806" stopOpacity={.15 * lamp} /><stop offset="1" stopColor="#0B0806" stopOpacity={1} /></radialGradient></defs>
      <rect x={X(-1200)} y={Y(-1200)} width={2400 * k} height={1300 * k} fill={lamp > 0 ? `url(#pool${seed})` : '#0B0806'} opacity={dark * .93} /></g>}
  </g>;
};

// ================================================================ THE SCATTERING APPARATUS — three true arrangements, one drawing:
//  mode 'reflect' — Geiger & Marsden 1909 (D-01-x1 fig. 1): a conical glass tube of radium emanation AB aimed at a reflector RR; the zinc-sulphide
//    screen S beside the tube, hidden from it by a lead plate P, so only particles thrown BACK can reach it; the microscope M looks at S.
//  mode 'tube' — the straight-through experiments (Geiger 1908–10): source, slit, gold foil and screen in a long glass tube pumped empty of air.
//  mode 'box' — Geiger & Marsden 1913 (D-05-x1 fig. 1, R-02): a round box on a graduated platform; source and foil fixed, the microscope and
//    screen turn round it to count angle by angle (`ang`, degrees from straight through).
// cut 0..1 = the section (inside visible) · beam 0..1 = the pencil of rays · pump 0..1 = air leaving · draw = ink-on
const Microscope: React.FC<{ x: N; y: N; len: N; rot: N; draw: N; k: N }> = ({ x, y, len, rot, draw, k }) => (
  <g transform={`rotate(${rot} ${x} ${y})`}>
    <SR d={rect(x, y - 13 * k, len * .72, 26 * k)} mat="brass" t={.45} ang={0} draw={draw} sw={1.2} />
    <SR d={rect(x + len * .72, y - 17 * k, len * .1, 34 * k)} mat="brass" t={.6} ang={90} draw={draw} sw={1.1} />
    <SR d={rect(x + len * .82, y - 11 * k, len * .18, 22 * k)} mat="brass" t={.4} ang={0} draw={draw} sw={1.1} />
    {[.2, .4, .6].map(f => <Line key={f} d={`M${x + len * f} ${y - 13 * k} v${26 * k}`} w={.8} a={.6 * draw} />)}
    <ellipse cx={x + len} cy={y} rx={5 * k} ry={11 * k} fill="#1A120B" opacity={draw} />
  </g>);
const ScatterApparatus: React.FC<{ x: N; y: N; s?: N; mode?: string; cut?: N; beam?: N; pump?: N; ang?: N; draw?: N; air?: N; scope?: N }> = ({ x, y, s = 1, mode = 'reflect', cut = 0, beam = 0, pump = 0, ang = 0, draw = 1, air = 1, scope = 1 }) => {
  const k = s, X = (d: N) => x + d * k, Y = (d: N) => y + d * k, gold = '#E9C35A';
  if (mode === 'reflect') {   // side view; the microscope points right, toward the observer sitting on the right
    const base = rect(X(-330), Y(40), 660 * k, 36 * k);
    return <g>
      <SR d={base} mat="wood" t={.6} ang={0} draw={draw} sw={1.3} />
      <SR d={rect(X(-300), Y(76), 30 * k, 40 * k)} mat="wood" t={.8} draw={draw} /><SR d={rect(X(270), Y(76), 30 * k, 40 * k)} mat="wood" t={.8} draw={draw} />
      {/* the glass tube AB of emanation, drawn down conically to its mica window B */}
      <Region d={`M${X(136)} ${Y(-188)} L${X(146)} ${Y(-172)} L${X(-52)} ${Y(-62)} L${X(-57)} ${Y(-69)}Z`} mat="paper" t={.05} draw={draw} sw={1.2} hatch={0} a={.85} />
      <Line d={`M${X(136)} ${Y(-182)} L${X(-50)} ${Y(-66)}`} w={.8} a={.5 * draw} col={PIG.sky[2]} />
      <SR d={rect(X(150), Y(-80), 16 * k, 120 * k)} mat="brass" t={.55} draw={draw} ang={90} />
      <SR d={`M${X(118)} ${Y(-206)} L${X(176)} ${Y(-170)} L${X(166)} ${Y(-150)} L${X(108)} ${Y(-186)}Z`} mat="brass" t={.5} draw={draw} />
      <Line d={`M${X(158)} ${Y(-80)} L${X(140)} ${Y(-178)}`} w={2} a={draw} />
      <circle cx={X(-56)} cy={Y(-64)} r={7 * k} fill="#F4FFF0" opacity={.7 * draw} /><circle cx={X(-56)} cy={Y(-64)} r={22 * k} fill="url(#glowG)" opacity={.6 * draw} />
      {/* the lead plate P (hatched, heavy) */}
      <SR d={rect(X(-120), Y(-36), 320 * k, 22 * k)} mat="night" t={.7} ang={45} draw={draw} sw={1.3} />
      {/* the reflector RR: a sheet of gold foil standing at the left */}
      <SR d={rect(X(-200), Y(-150), 16 * k, 190 * k)} color={gold} mat="brass" t={.3} draw={draw} sw={1.2} hatch={0} /><circle cx={X(-192)} cy={Y(-80)} r={40 * k} fill="url(#glowG)" opacity={.35 * draw} />
      <SR d={rect(X(-204), Y(36), 26 * k, 8 * k)} mat="brass" t={.6} draw={draw} />
      {/* the screen S under the lead plate, facing the reflector; the microscope M behind it, pointing to the observer */}
      <SR d={rect(X(-20), Y(-12), 8 * k, 46 * k)} mat="leaf" t={.3} draw={draw} sw={1} />
      {scope > 0 && <Microscope x={X(-12)} y={Y(10)} len={300 * k * scope} rot={0} draw={draw} k={k} />}
      <SR d={rect(X(90), Y(24), 20 * k, 18 * k)} mat="brass" t={.6} draw={draw} /><SR d={rect(X(200), Y(24), 20 * k, 18 * k)} mat="brass" t={.6} draw={draw} />
      {beam > 0 && <g opacity={beam}><path d={`M${X(-60)} ${Y(-70)} L${X(-188)} ${Y(-110)} M${X(-60)} ${Y(-66)} L${X(-188)} ${Y(-60)}`} stroke="#F7E3A0" strokeWidth={3 * k} opacity={.6} /></g>}
    </g>;
  }
  if (mode === 'tube') {   // side view of the long evacuated tube: source → slit → foil → screen + microscope at the right end; a pump cock on top
    const L = 1300, t = rr(X(-L / 2), Y(-70), L * k, 140 * k, 70 * k);
    const motes = useMemo(() => { const q = seq('air'); return Array.from({ length: 70 }, () => [q() * L - L / 2, q() * 110 - 55, q()]); }, []);   // eslint-disable-line
    return <g>
      <SR d={rect(X(-L / 2 - 40), Y(110), (L + 80) * k, 30 * k)} mat="wood" t={.6} draw={draw} ang={0} />
      {[-0.35, 0, .35].map(f => <SR key={f} d={`M${X(L * f - 40)} ${Y(110)} L${X(L * f - 20)} ${Y(66)} H${X(L * f + 20)} L${X(L * f + 40)} ${Y(110)}Z`} mat="brass" t={.55} draw={draw} />)}
      <Region d={t} mat="sky" t={.08} draw={draw} sw={1.6} hatch={0} a={.85} />
      <Line d={`M${X(-L / 2 + 70)} ${Y(-52)} H${X(L / 2 - 70)}`} w={2} col="#FFFFFF" a={.7 * draw} />
      {/* pump cock and hose */}
      <SR d={rect(X(-60), Y(-130), 40 * k, 62 * k)} mat="paper" t={.2} draw={draw} /><SR d={rect(X(-80), Y(-140), 80 * k, 16 * k)} mat="brass" t={.5} draw={draw} />
      <Line d={`M${X(-40)} ${Y(-140)} q${-40 * k} ${-120 * k} ${-260 * k} ${-130 * k}`} w={9 * k} col={PIG.red[2]} a={.8 * draw} />
      {/* source (a lead block with the radium tube), the slit, the foil, the screen */}
      <SR d={rect(X(-L / 2 + 40), Y(-46), 70 * k, 92 * k)} mat="night" t={.75} draw={draw} ang={45} />
      <circle cx={X(-L / 2 + 112)} cy={Y(0)} r={6 * k} fill="#F4FFF0" opacity={draw} />
      <SR d={rect(X(-L / 2 + 330), Y(-60), 14 * k, 52 * k)} mat="night" t={.7} draw={draw} /><SR d={rect(X(-L / 2 + 330), Y(8), 14 * k, 52 * k)} mat="night" t={.7} draw={draw} />
      <SR d={rect(X(40), Y(-56), 8 * k, 112 * k)} color={gold} mat="brass" t={.4} draw={draw} hatch={0} />
      <SR d={rect(X(L / 2 - 64), Y(-60), 10 * k, 120 * k)} mat="leaf" t={.3} draw={draw} />
      {scope > 0 && <Microscope x={X(L / 2 - 50)} y={Y(0)} len={300 * k * scope} rot={0} draw={draw} k={k} />}
      {beam > 0 && <path d={`M${X(-L / 2 + 112)} ${Y(0)} H${X(-L / 2 + 112 + (L - 176) * beam)}`} stroke="#F7E3A0" strokeWidth={5 * k} opacity={.7} />}
      {air > 0 && <g opacity={draw}>{motes.map(([mx, my, r], i) => { const gone = cl(pump * 1.6 - r * .6); return gone >= 1 ? null : <circle key={i} cx={X(mx + gone * (-40 - mx) * .9)} cy={Y(my + gone * (-150 - my))} r={2.4 * k} fill={SEP} opacity={.45 * (1 - gone) * air} />; })}</g>}
    </g>;
  }
  // mode 'box' — plan view of the 1913 apparatus: the graduated circle, the round box, the source tube and foil at the centre, the microscope on its arm
  const R = 300, a = (ang - 180) * Math.PI / 180, mx = X(Math.cos(a) * R), my = Y(Math.sin(a) * R);
  return <g>
    <Region d={circ(X(0), Y(0), (R + 90) * k)} mat="brass" t={.35} draw={draw} sw={1.5} hatch={0} />
    {Array.from({ length: 72 }, (_, i) => { const b = i * 5 * Math.PI / 180, r1 = (R + 90) * k, r2 = r1 - (i % 6 ? 12 : 26) * k; return <Line key={i} d={`M${X(0) + Math.cos(b) * r1} ${Y(0) + Math.sin(b) * r1} L${X(0) + Math.cos(b) * r2} ${Y(0) + Math.sin(b) * r2}`} w={.8} a={.8 * draw} />; })}
    <SR d={circ(X(0), Y(0), (R + 20) * k)} mat="stone" t={.45} draw={draw} sw={1.6} />
    {cut > 0 && <Region d={circ(X(0), Y(0), R * k)} mat="night" t={.8} draw={draw * cut} hatch={0} />}
    <SR d={rect(X(-R - 230), Y(-20), 240 * k, 40 * k)} mat="paper" t={.2} draw={draw} hatch={0} />
    <SR d={rect(X(-R - 250), Y(-30), 30 * k, 60 * k)} mat="night" t={.8} draw={draw} />
    <SR d={rect(X(-4), Y(-40), 8 * k, 80 * k)} color={gold} mat="brass" t={.4} draw={draw} hatch={0} />
    <g transform={`rotate(${ang - 180} ${X(0)} ${Y(0)})`}><SR d={rect(X(R - 26), Y(-34), 12 * k, 68 * k)} mat="leaf" t={.35} draw={draw} /></g>
    <Microscope x={mx} y={my} len={330 * k} rot={ang - 180 + 180} draw={draw} k={k} />
    {beam > 0 && <path d={`M${X(-R - 220)} ${Y(0)} L${X(-R - 220 + (R + 220) * beam)} ${Y(0)}`} stroke="#F7E3A0" strokeWidth={5 * k} opacity={.75} />}
  </g>;
};

// ================================================================ THE DARK FIELD of the microscope: the zinc-sulphide screen seen through the eyepiece —
// a deep green-black disc with crystal grains that glint faintly, a brass rim (cf. the spinthariscope, P-07). The flashes are the engine's `flash`.
const ZincScreenField: React.FC<{ cx?: N; cy?: N; r?: N; draw?: N; glitter?: N; flicker?: N; rim?: N }> = ({ cx = 960, cy = 540, r = 420, draw = 1, glitter = .5, flicker = 0, rim = 1 }) => {
  const g = useMemo(() => { const q = seq('zns'); return Array.from({ length: 260 }, () => { const a = q() * Math.PI * 2, d = Math.sqrt(q()); return [Math.cos(a) * d, Math.sin(a) * d, q(), q()]; }); }, []);
  return <g opacity={Math.min(1, draw * 1.5)}>
    <circle cx={cx} cy={cy} r={r * 1.5} fill="#050403" opacity={.0} />
    <defs><radialGradient id="znsF"><stop offset="0" stopColor="#1C2A22" /><stop offset=".75" stopColor="#0E1612" /><stop offset="1" stopColor="#030504" /></radialGradient></defs>
    <circle cx={cx} cy={cy} r={r} fill="url(#znsF)" />
    {g.map(([u, v, s, p], i) => { const tw = .5 + .5 * Math.sin(flicker * (2 + p * 5) + i); return <circle key={i} cx={cx + u * r * .97} cy={cy + v * r * .97} r={.8 + s * 1.6} fill="#B8D8C0" opacity={(.08 + .22 * tw * glitter) * draw} />; })}
    {rim > 0 && <g opacity={rim}><circle cx={cx} cy={cy} r={r * 1.05} fill="none" stroke="url(#gold)" strokeWidth={r * .1} /><Ink d={circ(cx, cy, r * 1.1)} w={1.6} draw={draw} /><Ink d={circ(cx, cy, r)} w={1.3} draw={draw} />
      {Array.from({ length: 90 }, (_, i) => { const a = i / 90 * Math.PI * 2; return <Line key={i} d={`M${cx + Math.cos(a) * r * 1.1} ${cy + Math.sin(a) * r * 1.1} L${cx + Math.cos(a) * r * 1.135} ${cy + Math.sin(a) * r * 1.135}`} w={.8} a={.8 * draw} />; })}</g>}
  </g>;
};

// ================================================================ THE TALLY SHEET — pencil five-bar gates, row by row; `n` strokes (glides), the last one red if `red`
const TallySheet: React.FC<{ x: N; y: N; w?: N; h?: N; n?: N; red?: N; rot?: N; draw?: N; title?: string }> = ({ x, y, w = 420, h = 540, n = 0, red = 0, rot = -3, draw = 1, title = 'Scintillations' }) => {
  const x0 = x - w / 2, y0 = y - h / 2, per = 6, gw = 64, rowH = 54, cols = Math.floor((w - 60) / gw), strokes: React.ReactNode[] = [], m = Math.floor(n);
  const pos = (i: N) => { const g = Math.floor(i / 5), j = i % 5, row = Math.floor(g / cols), col = g % cols; return [x0 + 36 + col * gw, y0 + 110 + row * rowH, j] as const; };
  for (let i = 0; i < m + (red > 0 ? 1 : 0); i++) { const [gx, gy, j] = pos(i), isRed = red > 0 && i === m, q = seq('t' + i), wob = (q() - .5) * 3;
    const d = j < 4 ? `M${gx + j * 11 + wob} ${gy} l${2 + wob * .3} 38` : `M${gx - 6} ${gy + 30} L${gx + 46} ${gy + 6}`;
    strokes.push(<Line key={i} d={d} w={isRed ? 3.4 : 2} col={isRed ? PIG.red[1] : '#3A3028'} a={isRed ? 1 : .85} draw={isRed ? red : 1} />); }
  return <g transform={`rotate(${rot} ${x} ${y})`} opacity={Math.min(1, draw * 1.4)}>
    <rect x={x0} y={y0} width={w} height={h} fill="#000" opacity={.25} filter="url(#b8)" transform="translate(8 12)" />
    <Region d={rect(x0, y0, w, h)} mat="paper" t={.08} draw={draw} sw={1.1} rim={false} />
    {Array.from({ length: per + 2 }, (_, i) => <Line key={i} d={`M${x0 + 20} ${y0 + 100 + i * rowH} H${x0 + w - 20}`} w={.7} col={PIG.sky[1]} a={.5 * draw} />)}
    <Line d={`M${x0 + 26} ${y0 + 20} V${y0 + h - 14}`} w={.8} col={PIG.red[1]} a={.5 * draw} />
    <text x={x0 + 40} y={y0 + 66} fontFamily="Pinyon Script" fontSize={38} fill="#3A3028" opacity={draw}>{title}</text>
    {strokes}
  </g>;
};

// ================================================================ A GOLD LEAF IN ITS FRAME (cold open, close-up): a brass ring holding a thin crinkled leaf
const GoldFoilFrame: React.FC<{ x: N; y: N; s?: N; draw?: N; hit?: N }> = ({ x, y, s = 1, draw = 1, hit = 0 }) => {
  const k = s, leaf = `M${x - 14 * k} ${y - 150 * k} Q${x - 4 * k} ${y - 60 * k} ${x - 12 * k} ${y} Q${x - 2 * k} ${y + 70 * k} ${x - 10 * k} ${y + 150 * k} L${x + 10 * k} ${y + 150 * k} Q${x + 2 * k} ${y + 60 * k} ${x + 12 * k} ${y} Q${x + 4 * k} ${y - 70 * k} ${x + 14 * k} ${y - 150 * k}Z`;
  return <g>
    <SR d={rr(x - 40 * k, y - 190 * k, 80 * k, 380 * k, 30 * k)} mat="brass" t={.5} draw={draw} sw={1.5} />
    <Region d={rr(x - 26 * k, y - 172 * k, 52 * k, 344 * k, 20 * k)} mat="night" t={.85} draw={draw} hatch={0} />
    <Region d={leaf} color="#E8C25C" mat="brass" t={.3} draw={draw} sw={1} hatch={0} />
    {[-.6, -.2, .25, .6].map(f => <Line key={f} d={`M${x - 10 * k} ${y + f * 150 * k} q${10 * k} ${6 * k} ${20 * k} ${-2 * k}`} w={.7} a={.6 * draw} />)}
    {hit > 0 && <circle cx={x} cy={y} r={60 * k * hit} fill="url(#glowG)" opacity={1 - hit} />}
    <SR d={rect(x - 12 * k, y + 190 * k, 24 * k, 120 * k)} mat="brass" t={.6} draw={draw} ang={90} />
    <SR d={rect(x - 70 * k, y + 300 * k, 140 * k, 24 * k)} mat="wood" t={.6} draw={draw} />
  </g>;
};

// ================================================================ MIST ON THE MOOR (the stones-into-mist image): a hillside of heather and a dry-stone wall,
// a bank of mist lying on it (soft, layered). `fog` 0..1 = the mist's density
const MistHillside: React.FC<{ y?: N; draw?: N; fog?: N; drift?: N }> = ({ y = 760, draw = 1, fog = 1, drift = 0 }) => {
  const hills = useMemo(() => [0, 1].map(j => { let d = `M-40 1120 L-40 ${y - 120 + j * 120}`; for (let x = -40; x <= 1960; x += 40) d += ` L${x} ${f1(y - 120 + j * 120 - Math.sin(x / (520 - j * 140) + j * 2) * (60 - j * 20) - Math.sin(x / 140 + j) * 8)}`; return d + ' L1960 1120Z'; }), [y]);
  const blobs = useMemo(() => { const q = seq('mist'); return Array.from({ length: 22 }, () => [700 + q() * 900, y - 260 + q() * 300, 160 + q() * 220, 60 + q() * 80]); }, [y]);
  return <g>
    <SR d={hills[0]} mat="tundra" t={.35} ang={-6} draw={draw} sw={1} hatchA={.3} />
    <SR d={hills[1]} mat="leaf" t={.55} ang={-4} draw={draw} sw={1.2} />
    <Stipple x={0} y={y} w={1920} h={360} n={700} seed="heather" col={PIG.red[2]} r0={.6} a={.3 * draw} />
    <g opacity={fog * draw} filter="url(#b30)">{blobs.map(([bx, by, rx, ry], i) => <ellipse key={i} cx={bx + Math.sin(drift + i) * 20} cy={by} rx={rx} ry={ry} fill="#FBF7EC" opacity={.8} />)}</g>
    <g opacity={fog * draw * .9} filter="url(#b8)">{blobs.slice(0, 12).map(([bx, by, rx, ry], i) => <ellipse key={i} cx={bx + 30 + Math.sin(drift * 1.3 + i) * 26} cy={by + 20} rx={rx * .8} ry={ry * .6} fill="#FFFFFF" opacity={.55} />)}</g>
  </g>;
};
const Stone: React.FC<{ x: N; y: N; s?: N; rot?: N }> = ({ x, y, s = 1, rot = 0 }) => <g transform={`rotate(${rot} ${x} ${y})`}><SR d={`M${x - 22 * s} ${y + 4 * s} Q${x - 18 * s} ${y - 16 * s} ${x + 2 * s} ${y - 15 * s} Q${x + 24 * s} ${y - 12 * s} ${x + 22 * s} ${y + 6 * s} Q${x + 10 * s} ${y + 18 * s} ${x - 6 * s} ${y + 16 * s} Q${x - 24 * s} ${y + 14 * s} ${x - 22 * s} ${y + 4 * s}Z`} mat="stone" t={.62} sw={1.2} /></g>;

// ================================================================ THE EMPTY ATOM OUTLINE — a dotted circle on the paper with a faint wash, the question
const DottedAtom: React.FC<{ cx?: N; cy?: N; r?: N; draw?: N; turn?: N; wash?: N }> = ({ cx = 960, cy = 540, r = 300, draw = 1, turn = 0, wash = 1 }) => {
  const n = 72; return <g>
    <circle cx={cx} cy={cy} r={r} fill={PIG.sky[0]} opacity={.25 * wash * draw} filter="url(#wc)" />
    {Array.from({ length: n }, (_, i) => { if (i / n > draw) return null; const a = (i / n + turn) * Math.PI * 2; return <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={Math.max(1.5, r / 90)} fill={SEP} />; })}
  </g>;
};

// ================================================================ A HUMAN HAIR IN SECTION — cuticle scales round the rim, the fibrous cortex, the medulla; a row
// of atoms (beads) laid across its width (`row` 0..1 = how far the row has run; `bead` = bead radius)
const HairSection: React.FC<{ cx?: N; cy?: N; r?: N; draw?: N; row?: N; bead?: N }> = ({ cx = 960, cy = 540, r = 380, draw = 1, row = 1, bead = 4 }) => {
  const fib = useMemo(() => { const q = seq('hair'); return Array.from({ length: 140 }, () => { const a = q() * Math.PI * 2, d = Math.sqrt(q()) * .78; return [Math.cos(a) * d, Math.sin(a) * d, q() * Math.PI]; }); }, []);
  const nb = Math.floor((2 * r / (bead * 2.1)) * row);
  return <g>
    <SR d={circ(cx, cy, r)} mat="wood" t={.42} draw={draw} sw={2} ang={30} />
    {Array.from({ length: 48 }, (_, i) => { const a = i / 48 * Math.PI * 2; return <path key={i} d={`M${cx + Math.cos(a) * r * .86} ${cy + Math.sin(a) * r * .86} A${r * .2} ${r * .2} 0 0 1 ${cx + Math.cos(a + .14) * r * .99} ${cy + Math.sin(a + .14) * r * .99}`} fill="none" stroke={SEP} strokeWidth={1} opacity={.55 * draw} />; })}
    {fib.map(([u, v, an], i) => <ellipse key={i} cx={cx + u * r} cy={cy + v * r} rx={r * .035} ry={r * .012} transform={`rotate(${an * 57} ${cx + u * r} ${cy + v * r})`} fill={PIG.wood[2]} opacity={.35 * draw} />)}
    <SR d={ell(cx + r * .05, cy - r * .03, r * .16, r * .12)} mat="wood" t={.8} draw={draw} sw={1} />
    {row > 0 && <g>{Array.from({ length: nb }, (_, i) => <circle key={i} cx={cx - r + bead * 1.05 + i * bead * 2.1} cy={cy} r={bead} fill={PIG.sky[1]} stroke={SEP} strokeWidth={Math.min(1, bead / 4)} />)}</g>}
  </g>;
};

// ================================================================ LIGHT IS TOO COARSE — a long swell of light drawn like an engraved ocean wave rolling over a
// tiny atom (the atom is far smaller than one wavelength). phase moves the swell; lam = wavelength px
const LightSwell: React.FC<{ y?: N; amp?: N; lam?: N; phase?: N; draw?: N; atomX?: N; atom?: N }> = ({ y = 600, amp = 110, lam = 900, phase = 0, draw = 1, atomX = 960, atom = 1 }) => {
  const ys = (x: N) => y - amp * Math.sin((x / lam + phase) * Math.PI * 2);
  let top = 'M-40 1120'; for (let x = -40; x <= 1960; x += 16) top += ` L${x} ${f1(ys(x))}`; top += ' L1960 1120Z';
  let crest = 'M-40 ' + f1(ys(-40)); for (let x = -40; x <= 1960; x += 16) crest += ` L${x} ${f1(ys(x))}`;
  return <g>
    <Region d={top} color="#F7E3A0" mat="brass" t={.2} draw={draw} sw={1.6} hatch={0} a={.75} />
    {Array.from({ length: 9 }, (_, j) => { let d = ''; for (let x = -40; x <= 1960; x += 16) d += (d ? ' L' : 'M') + `${x} ${f1(ys(x) + 26 + j * 30)}`; return <Line key={j} d={d} w={.8} col="#B8862B" a={(.55 - j * .05) * draw} />; })}
    <Line d={crest} w={2.6} col="#B8862B" a={draw} />
    {atom > 0 && <Ball x={atomX} y={ys(atomX) - 8} r={7} mat="sky" t={.4} draw={atom} />}
  </g>;
};

// ================================================================ THE SOLID-BALL ATOMS — three polished ivory balls on green baize; one cracks and spills
// tiny dark specks (the electrons); a knife that glances off
const IvoryBalls: React.FC<{ x?: N; y?: N; s?: N; draw?: N; n?: N; crack?: N; spill?: N; knife?: N; roll?: N; baize?: N; b2?: N; b3?: N }> = ({ x = 960, y = 640, s = 1, draw = 1, n = 3, crack = 0, spill = 0, knife = 0, roll = 0, baize = 1, b2 = 1, b3 = 1 }) => {
  const k = s, R = 120 * k, xs = [x + roll * 40 * k, x - 270 * k * b2 + (1 - b2) * -900, x + 270 * k * b3 + (1 - b3) * 900];
  const cr = `M${x - R * .7} ${y - R * .5} L${x - R * .3} ${y - R * .35} L${x - R * .1} ${y - R * .05} L${x + R * .25} ${y + R * .08} L${x + R * .45} ${y + R * .42} L${x + R * .7} ${y + R * .5}`;
  const specks = useMemo(() => { const q = seq('spk'); return Array.from({ length: 18 }, () => [q() * 2 - 1, q(), q()]); }, []);
  return <g>
    {baize > 0 && <SR d={rect(-40, y + R - 10 * k, 2000, 600)} mat="leaf" t={.5} draw={draw * baize} ang={0} sw={1.4} hatchA={.25} />}
    {xs.slice(0, n).map((bx, i) => <g key={i}><ellipse cx={bx - 12 * k} cy={y + R * .98} rx={R * .9} ry={R * .16} fill="#000" opacity={.3 * draw} filter="url(#b8)" />
      <Ball x={bx} y={y} r={R} mat="paper" t={.32} draw={draw} sw={1.6} /></g>)}
    {crack > 0 && <g><Line d={cr} w={2.6 * k} draw={crack} /><path d={cr} fill="none" stroke="#1A120B" strokeWidth={5 * k * crack} opacity={.4} pathLength={1} strokeDasharray={`${crack} 1`} /></g>}
    {spill > 0 && specks.map(([u, v, w], i) => { const q = cl(spill * 1.4 - w * .4); if (q <= 0) return null; const px = x + R * .15 + u * R * 1.6 * q, py = y + R * .1 + (v * R * .9 + R * .4) * q * q; return <circle key={i} cx={px} cy={Math.min(py, y + R * 1.05)} r={4.5 * k} fill="#1A120B" />; })}
    {knife > 0 && <g transform={`translate(${x + 40 * k} ${y - R - 260 * k * (1 - Math.min(1, knife * 1.3))}) rotate(${-25 + (knife > .8 ? (knife - .8) * 80 : 0)})`} opacity={knife < .98 ? 1 : 0}>
      <SR d={`M-8 0 L-8 -150 Q4 -170 26 -160 L18 0Z`} mat="regolith" t={.25} sw={1.2} hatch={0} /><SR d={rect(-14, -230, 34, 80)} mat="wood" t={.7} sw={1.2} /></g>}
  </g>;
};

// ================================================================ ἄτομος on a scrap of papyrus (fibres in two layers, ragged edge); the word lettered by k
const AtomosPapyrus: React.FC<{ x?: N; y?: N; s?: N; draw?: N; k?: N }> = ({ x = 960, y = 520, s = 1, draw = 1, k = 1 }) => {
  const w = 900 * s, h = 380 * s, x0 = x - w / 2, y0 = y - h / 2;
  const edge = useMemo(() => { const q = seq('pap'), pts: Pt[] = []; for (let i = 0; i <= 20; i++) pts.push([x0 + w * i / 20, y0 + (q() - .5) * 18]); for (let i = 0; i <= 10; i++) pts.push([x0 + w + (q() - .5) * 18, y0 + h * i / 10]); for (let i = 20; i >= 0; i--) pts.push([x0 + w * i / 20, y0 + h + (q() - .5) * 18]); for (let i = 10; i >= 0; i--) pts.push([x0 + (q() - .5) * 18, y0 + h * i / 10]); return pathOf(pts, true); }, [x0, y0, w, h]);
  return <g>
    <SR d={edge} mat="sand" t={.22} draw={draw} sw={1.2} hatch={0} />
    <Grain d={edge} n={500} seed="papf" x={x0} y={y0} w={w} h={h} col={PIG.sand[2]} a={.3 * draw} />
    {Array.from({ length: 30 }, (_, i) => <Line key={i} d={`M${x0 + 10} ${y0 + 12 + i * h / 30} H${x0 + w - 10}`} w={.5} col={PIG.sand[2]} a={.35 * draw} />)}
    <defs><clipPath id="atomosK"><rect x={x0} y={y0} width={w * k} height={h} /></clipPath></defs>
    <text x={x} y={y + 50 * s} textAnchor="middle" fontFamily="IM Fell English" fontSize={170 * s} fill="#2B1D12" clipPath="url(#atomosK)" opacity={draw}>ἄτομος</text>
  </g>;
};

// ================================================================ DALTON'S PLATE (A New System of Chemical Philosophy, 1808): his circle symbols — hydrogen (dot),
// azote (bar), carbon (black), oxygen (plain), phosphorus, sulphur (cross)… `k` inks them on, `join` slides two together into one compound,
// `solid` fills them out into turned wooden spheres
const DALTON = ['dot', 'bar', 'black', 'plain', 'star', 'cross', 'ring', 'dots'] as const;
const DaltonPlate: React.FC<{ x?: N; y?: N; s?: N; draw?: N; k?: N; join?: N; solid?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, k = 1, join = 0, solid = 0 }) => {
  const w = 980 * s, h = 680 * s, x0 = x - w / 2, y0 = y - h / 2, r = 54 * s;
  return <g>
    <rect x={x0} y={y0} width={w} height={h} fill="#000" opacity={.25 * draw} filter="url(#b8)" transform="translate(10 14)" />
    <Region d={rect(x0, y0, w, h)} mat="paper" t={.1} draw={draw} sw={1.1} rim={false} />
    <text x={x} y={y0 + 70 * s} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={40 * s} fill={SEP} opacity={draw}>Elements</text>
    <Line d={`M${x - 160 * s} ${y0 + 90 * s} H${x + 160 * s}`} w={1} a={draw} />
    {DALTON.map((sym, i) => { const c = i % 4, rw = Math.floor(i / 4), q = ph(k, i / 9, i / 9 + .2); if (q <= 0) return null;
      let cx = x0 + 170 * s + c * 220 * s, cy = y0 + 220 * s + rw * 240 * s;
      if (i === 0) cx += join * 56 * s; if (i === 1) cx -= join * 56 * s;
      const fill = sym === 'black' ? '#1A120B' : 'none';
      return <g key={i} opacity={q}>
        {solid > 0 ? <Ball x={cx} y={cy} r={r} mat="wood" t={.45} draw={solid} /> : null}
        <g opacity={1 - solid * .85}><circle cx={cx} cy={cy} r={r} fill={fill} stroke={SEP} strokeWidth={3 * s} />
          {sym === 'dot' && <circle cx={cx} cy={cy} r={8 * s} fill={SEP} />}
          {sym === 'bar' && <Line d={`M${cx} ${cy - r} V${cy + r}`} w={3 * s} />}
          {sym === 'cross' && <Line d={`M${cx - r * .7} ${cy - r * .7} L${cx + r * .7} ${cy + r * .7} M${cx + r * .7} ${cy - r * .7} L${cx - r * .7} ${cy + r * .7}`} w={3 * s} />}
          {sym === 'star' && <Line d={`M${cx - r} ${cy} H${cx + r} M${cx} ${cy - r} V${cy + r}`} w={3 * s} />}
          {sym === 'ring' && <circle cx={cx} cy={cy} r={r * .55} fill="none" stroke={SEP} strokeWidth={2.4 * s} />}
          {sym === 'dots' && [[-.4, -.3], [.35, -.35], [0, .4]].map(([u, v], j) => <circle key={j} cx={cx + u * r} cy={cy + v * r} r={6 * s} fill={SEP} />)}</g>
        <text x={cx} y={cy + r + 40 * s} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={26 * s} fill={SEP}>{i + 1}</text>
      </g>; })}
  </g>;
};

// ================================================================ THE FOUR CLUE MEDALLIONS — engraved discs with a gold rim: I a cracked ball, II flashes,
// III a path thrown back, IV an empty stadium. k1..k4 ink them on; gather 0..1 draws them together into one ring
const ClueMedallions: React.FC<{ x?: N; y?: N; r?: N; gap?: N; k1?: N; k2?: N; k3?: N; k4?: N; gather?: N; draw?: N; tx?: N; ty?: N; tr?: N }> = ({ x = 960, y = 560, r = 150, gap = 420, k1 = 0, k2 = 0, k3 = 0, k4 = 0, gather = 0, draw = 1, tx = 960, ty = 540, tr = 300 }) => {
  const ks = [k1, k2, k3, k4], pos = [0, 1, 2, 3].map(i => { const px = x + (i - 1.5) * gap, py = y, a = (i / 4) * Math.PI * 2 - Math.PI / 2, qx = tx + Math.cos(a) * tr, qy = ty + Math.sin(a) * tr; return [px + (qx - px) * gather, py + (qy - py) * gather] as Pt; });
  const R = r * (1 - gather * .5);
  return <g>{pos.map(([cx, cy], i) => { const q = ks[i] * draw; if (q <= 0) return null; return <g key={i} opacity={Math.min(1, q * 1.5)}>
    <circle cx={cx + 8} cy={cy + 12} r={R * 1.08} fill="#000" opacity={.25} filter="url(#b8)" />
    <circle cx={cx} cy={cy} r={R * 1.05} fill="none" stroke="url(#gold)" strokeWidth={R * .12} />
    <Region d={circ(cx, cy, R)} mat="paper" t={.12} draw={q} sw={1.6} hatch={0} />
    <g opacity={ph(q, .4, 1)}>{i === 0 ? <g><Ball x={cx} y={cy} r={R * .55} mat="paper" t={.32} /><Line d={`M${cx - R * .4} ${cy - R * .3} L${cx - R * .1} ${cy - R * .1} L${cx + R * .1} ${cy + R * .05} L${cx + R * .38} ${cy + R * .32}`} w={2.4} /></g>
      : i === 1 ? <g><circle cx={cx} cy={cy} r={R * .75} fill="#0E1612" />{[[-.3, -.2], [.25, .3], [.1, -.4], [-.2, .35], [.4, -.05]].map(([u, v], j) => <g key={j}><circle cx={cx + u * R} cy={cy + v * R} r={R * .09} fill="#B8F0C8" opacity={.5} /><circle cx={cx + u * R} cy={cy + v * R} r={R * .035} fill="#F4FFF0" /></g>)}</g>
      : i === 2 ? <g><Line d={`M${cx - R * .7} ${cy - R * .1} H${cx + R * .1}`} w={2.6} col="#B8862B" /><Line d={`M${cx + R * .1} ${cy - R * .1} Q${cx + R * .3} ${cy - R * .1} ${cx - R * .6} ${cy + R * .35}`} w={2.6} col={PIG.red[1]} /><SR d={rect(cx + R * .22, cy - R * .5, R * .06, R)} color="#E8C25C" mat="brass" t={.3} hatch={0} /></g>
      : <g><ellipse cx={cx} cy={cy + R * .05} rx={R * .78} ry={R * .5} fill={PIG.stone[1]} stroke={SEP} strokeWidth={1.4} /><ellipse cx={cx} cy={cy + R * .08} rx={R * .5} ry={R * .28} fill={PIG.leaf[1]} stroke={SEP} strokeWidth={1.2} /><circle cx={cx} cy={cy + R * .08} r={R * .035} fill={PIG.leaf[2]} /></g>}</g>
    <text x={cx} y={cy - R * 1.22} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={R * .26} fill={SEP} opacity={1 - gather}>{['I', 'II', 'III', 'IV'][i]}</text>
  </g>; })}</g>;
};

// ================================================================ THE CAVENDISH LABORATORY, 1897 — a tall arched window, a bench with an induction coil, battery jars
const CavendishBench: React.FC<{ x?: N; y?: N; s?: N; draw?: N }> = ({ x = 960, y = 1080, s = 1, draw = 1 }) => {
  const k = s, X = (d: N) => x + d * k, Y = (d: N) => y + d * k;
  return <g>
    <SR d={rect(X(-1100), Y(-1100), 2200 * k, 800 * k)} mat="stone" t={.3} draw={draw} sw={.8} hatchA={.25} />
    {[-520, 420].map(wx => <g key={wx}><SR d={`M${X(wx - 150)} ${Y(-380)} V${Y(-860)} A${150 * k} ${150 * k} 0 0 1 ${X(wx + 150)} ${Y(-860)} V${Y(-380)}Z`} mat="sky" t={.12} draw={draw} sw={1.6} hatch={0} />
      <Line d={`M${X(wx)} ${Y(-1010)} V${Y(-380)} M${X(wx - 150)} ${Y(-620)} H${X(wx + 150)} M${X(wx - 150)} ${Y(-800)} H${X(wx + 150)}`} w={2.2} a={draw} />
      <SR d={rect(X(wx - 170), Y(-384), 340 * k, 20 * k)} mat="stone" t={.55} draw={draw} /></g>)}
    <SR d={rect(X(-1100), Y(-300), 2200 * k, 46 * k)} mat="wood" t={.6} ang={0} draw={draw} sw={1.4} />
    <SR d={rect(X(-1100), Y(-254), 2200 * k, 254 * k)} mat="wood" t={.78} ang={90} draw={draw} sw={1.1} />
    {[-860, -780, -700].map(bx => <g key={bx}><SR d={rect(X(bx - 30), Y(-410), 60 * k, 110 * k)} mat="sky" t={.25} draw={draw} sw={1} hatch={0} /><SR d={rect(X(bx - 14), Y(-430), 28 * k, 24 * k)} mat="wood" t={.7} draw={draw} /></g>)}
    <SR d={rect(X(620), Y(-400), 260 * k, 100 * k)} mat="wood" t={.55} draw={draw} sw={1.2} />
    <SR d={ell(X(750), Y(-430), 110 * k, 34 * k)} mat="red" t={.6} draw={draw} sw={1.1} />
    {Array.from({ length: 14 }, (_, i) => <Line key={i} d={`M${X(650 + i * 14)} ${Y(-460)} v${60 * k}`} w={.8} a={.6 * draw} />)}
    <Line d={`M${X(-700)} ${Y(-430)} q${200 * k} ${-60 * k} ${420 * k} ${-20 * k} M${X(620)} ${Y(-380)} q${-120 * k} ${-60 * k} ${-260 * k} ${-30 * k}`} w={1.6} a={.8 * draw} />
  </g>;
};

// ================================================================ THOMSON'S CATHODE-RAY TUBE (R-03 replica; P-03-x1): cathode in the left bulb, two slit anodes
// in the neck, the deflecting plates D–E, the long body ending in a big round end coated to glow, a scale on it; on a wooden stand.
// glow 0..1 · bend −1..1 (where the spot lands) · magnet 0..1 (a horseshoe magnet brought under the plates) · plates 0..1 (+ / − charged)
const CathodeTube: React.FC<{ x?: N; y?: N; s?: N; draw?: N; glow?: N; bend?: N; magnet?: N; plates?: N; stand?: N; beam?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, glow = 0, bend = 0, magnet = 0, plates = 0, stand = 1, beam = 1 }) => {
  const k = s, X = (d: N) => x + d * k, Y = (d: N) => y + d * k;
  const body = `M${X(-560)} ${Y(-22)} Q${X(-650)} ${Y(-80)} ${X(-700)} ${Y(-20)} Q${X(-720)} ${Y(0)} ${X(-700)} ${Y(20)} Q${X(-650)} ${Y(80)} ${X(-560)} ${Y(22)} L${X(-420)} ${Y(22)} L${X(-420)} ${Y(34)} L${X(220)} ${Y(34)} Q${X(300)} ${Y(34)} ${X(340)} ${Y(120)} A${170 * k} ${170 * k} 0 1 0 ${X(340)} ${Y(-120)} Q${X(300)} ${Y(-34)} ${X(220)} ${Y(-34)} L${X(-420)} ${Y(-34)} L${X(-420)} ${Y(-22)}Z`;
  const ex = X(650), ey = Y(bend * -200), dX = X(-150);
  return <g>
    {stand > 0 && <g>{[-480, 120].map(sx => <SR key={sx} d={`M${X(sx - 30)} ${Y(330)} L${X(sx - 14)} ${Y(40)} H${X(sx + 14)} L${X(sx + 30)} ${Y(330)}Z`} mat="wood" t={.55} ang={90} draw={draw} sw={1.3} />)}
      <SR d={rect(X(-620), Y(330), 1000 * k, 36 * k)} mat="wood" t={.62} draw={draw} sw={1.3} />
      {[-480, 120].map(sx => <SR key={sx} d={rect(X(sx - 40), Y(30), 80 * k, 16 * k)} mat="brass" t={.5} draw={draw} />)}</g>}
    <Region d={body} mat="sky" t={.06} draw={draw} sw={1.6} hatch={0} a={.9} />
    <Line d={`M${X(-400)} ${Y(-24)} H${X(200)}`} w={2} col="#FFFFFF" a={.7 * draw} />
    {/* glass side-arms with electrodes (cathode C left, anodes A, B), the plates D (top) and E (bottom) */}
    <Line d={`M${X(-700)} ${Y(0)} H${X(-760)} M${X(-640)} ${Y(-64)} v${-70 * k} M${X(-480)} ${Y(-30)} v${-60 * k}`} w={2.2} a={draw} />
    <SR d={rect(X(-628), Y(-14), 30 * k, 28 * k)} mat="regolith" t={.5} draw={draw} />
    {[-520, -460].map(ax => <SR key={ax} d={rect(X(ax), Y(-26), 8 * k, 52 * k)} mat="regolith" t={.6} draw={draw} />)}
    <SR d={rect(X(-260), Y(-30), 220 * k, 10 * k)} mat="brass" t={.45} draw={draw} /><SR d={rect(X(-260), Y(20), 220 * k, 10 * k)} mat="brass" t={.45} draw={draw} />
    <Line d={`M${X(-150)} ${Y(-30)} V${Y(-110)} M${X(-150)} ${Y(30)} V${Y(110)}`} w={2.2} a={draw} />
    {[-.6, -.3, 0, .3, .6].map(f => <Line key={f} d={`M${X(500)} ${Y(f * 150)} h${16 * k}`} w={1} a={.7 * draw} />)}
    {/* the glow and the beam (green phosphorescence where it lands) */}
    {glow > 0 && <g opacity={glow}><ellipse cx={X(500)} cy={Y(0)} rx={50 * k} ry={150 * k} fill="#B8F0C8" opacity={.35} filter="url(#b8)" />
      {beam > 0 && <path d={`M${X(-460)} ${Y(0)} L${dX} ${Y(0)} Q${X(150)} ${Y(bend * -40)} ${ex - 150 * k} ${ey}`} fill="none" stroke="#9FE8B0" strokeWidth={8 * k} opacity={1} filter="url(#b2s)" />}
      {beam > 0 && <path d={`M${X(-460)} ${Y(0)} L${dX} ${Y(0)} Q${X(150)} ${Y(bend * -40)} ${ex - 150 * k} ${ey}`} fill="none" stroke="#F4FFF0" strokeWidth={2.5 * k} />}
      {beam > 0 && <g><circle cx={ex - 150 * k} cy={ey} r={30 * k} fill="#B8F0C8" opacity={.6} filter="url(#b8)" /><circle cx={ex - 150 * k} cy={ey} r={8 * k} fill="#F4FFF0" /></g>}</g>}
    {plates > 0 && <g opacity={plates}><text x={X(-150)} y={Y(-124)} textAnchor="middle" fontFamily="IM Fell English" fontSize={54 * k} fill={PIG.red[2]}>+</text><text x={X(-150)} y={Y(160)} textAnchor="middle" fontFamily="IM Fell English" fontSize={60 * k} fill={PIG.sky[2]}>−</text></g>}
    {magnet > 0 && <g transform={`translate(${X(-150)} ${Y(140 + (1 - magnet) * 300)})`} opacity={Math.min(1, magnet * 2)}>
      <SR d={`M-90 0 V90 A90 90 0 0 0 90 90 V0 H50 V90 A50 50 0 0 1 -50 90 V0Z`} mat="red" t={.5} draw={1} sw={1.6} />
      <SR d={rect(-90, -16, 40, 18)} mat="regolith" t={.35} hatch={0} /><SR d={rect(50, -16, 40, 18)} mat="regolith" t={.35} hatch={0} /></g>}
  </g>;
};
// ================================================================ A 1950s TELEVISION SET — the tube's descendant: a walnut cabinet, a rounded screen, two knobs, splayed legs
const OldTelevision: React.FC<{ x?: N; y?: N; s?: N; draw?: N; glow?: N; scan?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, glow = 0, scan = 0 }) => {
  const k = s, X = (d: N) => x + d * k, Y = (d: N) => y + d * k;
  return <g>
    {[-220, 220].map(lx => <Line key={lx} d={`M${X(lx * .8)} ${Y(250)} L${X(lx)} ${Y(400)}`} w={7 * k} a={draw} />)}
    <SR d={rr(X(-320), Y(-260), 640 * k, 520 * k, 40 * k)} mat="wood" t={.55} draw={draw} sw={2} />
    <Region d={rr(X(-250), Y(-200), 380 * k, 330 * k, 60 * k)} mat="night" t={.6 - glow * .4} draw={draw} sw={1.8} hatch={0} />
    {glow > 0 && <g opacity={glow}><path d={rr(X(-250), Y(-200), 380 * k, 330 * k, 60 * k)} fill="#B8F0C8" opacity={.35} />{Array.from({ length: 16 }, (_, i) => <Line key={i} d={`M${X(-236)} ${Y(-186 + i * 20 + (scan * 20) % 20)} H${X(116)}`} w={1} col="#F4FFF0" a={.3} />)}</g>}
    {[-100, 30].map(ky => <SR key={ky} d={circ(X(220), Y(ky), 34 * k)} mat="brass" t={.4} draw={draw} />)}
    {Array.from({ length: 6 }, (_, i) => <Line key={i} d={`M${X(180)} ${Y(120 + i * 18)} H${X(270)}`} w={1} a={.7 * draw} />)}
  </g>;
};

// ================================================================ THE CHARGE BALANCE — a brass equal-arm balance; minus signs heap on the left pan (minus 0..1),
// question marks on the right (q 0..1) which turn to plus signs (plus 0..1); tilt in degrees (+ = left pan down)
const ChargeBalance: React.FC<{ x?: N; y?: N; s?: N; draw?: N; tilt?: N; minus?: N; q?: N; plus?: N }> = ({ x = 960, y = 640, s = 1, draw = 1, tilt = 0, minus = 0, q = 0, plus = 0 }) => {
  const k = s, a = tilt * Math.PI / 180, L = 360 * k, lx = x - Math.cos(a) * L, ly = y - 300 * k + Math.sin(a) * L, rx = x + Math.cos(a) * L, ry = y - 300 * k - Math.sin(a) * L;
  const pan = (px: N, py: N, kind: string, n: N) => <g>
    <Line d={`M${px} ${py} L${px - 120 * k} ${py + 200 * k} M${px} ${py} L${px + 120 * k} ${py + 200 * k}`} w={1.2} a={draw} />
    <SR d={`M${px - 150 * k} ${py + 200 * k} Q${px} ${py + 280 * k} ${px + 150 * k} ${py + 200 * k}Z`} mat="brass" t={.45} draw={draw} sw={1.4} />
    {Array.from({ length: 7 }, (_, i) => { const v = cl(n * 7 - i); if (v <= 0) return null; const ox = (i % 4 - 1.5) * 52 * k + (Math.floor(i / 4) * 26 * k), oy = -Math.floor(i / 4) * 44 * k;
      return <text key={i} x={px + ox} y={py + 196 * k + oy - (1 - v) * 80 * k} textAnchor="middle" fontFamily="IM Fell English" fontSize={64 * k} opacity={v} fill={kind === '−' ? PIG.sky[2] : kind === '+' ? PIG.red[2] : SEP}>{kind}</text>; })}
  </g>;
  return <g>
    <SR d={`M${x - 160 * k} ${y + 40 * k} L${x - 110 * k} ${y} H${x + 110 * k} L${x + 160 * k} ${y + 40 * k}Z`} mat="wood" t={.65} draw={draw} sw={1.4} />
    <SR d={rect(x - 14 * k, y - 300 * k, 28 * k, 300 * k)} mat="brass" t={.5} draw={draw} ang={90} />
    <SR d={`M${lx} ${ly - 8 * k} L${rx} ${ry - 8 * k} L${rx} ${ry + 8 * k} L${lx} ${ly + 8 * k}Z`} mat="brass" t={.45} draw={draw} sw={1.4} />
    <SR d={`M${x - 20 * k} ${y - 296 * k} L${x} ${y - 340 * k} L${x + 20 * k} ${y - 296 * k}Z`} mat="brass" t={.6} draw={draw} />
    {pan(lx, ly, '−', minus)}
    <g opacity={1 - plus}>{pan(rx, ry, '?', q)}</g>
    {plus > 0 && <g opacity={plus}>{pan(rx, ry, '+', q)}</g>}
  </g>;
};

// ================================================================ THE PLUM PUDDING (R-04, a Victorian Christmas pudding): a dark round pudding on a plate, plums
// (dark fruit) set in it, steam; `atom` 0..1 turns it into Thomson's diagram (pale rose positive charge, electrons as dark dots);
// basin 0..1 = it is still in its pottery basin, `fill` = how full (the batter rising); cut 0..1 = cut in two, the halves part
const PlumPudding: React.FC<{ x?: N; y?: N; r?: N; draw?: N; atom?: N; plums?: N; basin?: N; fill?: N; cut?: N; steam?: N; plate?: N; jig?: N }> = ({ x = 960, y = 560, r = 260, draw = 1, atom = 0, plums = 1, basin = 0, fill = 1, cut = 0, steam = 0, plate = 1, jig = 0 }) => {
  const P = useMemo(() => { const q = seq('plum'); return Array.from({ length: 16 }, () => { const a = q() * Math.PI * 2, d = Math.sqrt(q()) * .78; return [Math.cos(a) * d, Math.sin(a) * d * .85 - .05, q()]; }); }, []);
  const col = mix('#5A3020', '#F2C4B4', atom), dome = `M${x - r} ${y + r * .1} Q${x - r} ${y - r * 1.05} ${x} ${y - r * 1.05} Q${x + r} ${y - r * 1.05} ${x + r} ${y + r * .1} Q${x} ${y + r * .32} ${x - r} ${y + r * .1}Z`;
  const shape = atom > .5 ? circ(x, y - r * .4, r * .95) : dome, sep = cut * r * .55;
  const body = (dx: N, clipId?: string) => <g transform={`translate(${dx} 0)`} clipPath={clipId ? `url(#${clipId})` : undefined}>
    <Region d={shape} color={col} mat="wood" t={.5} draw={draw} sw={1.8} hatch={0} />
    {atom < .6 && <Grain d={shape} n={420} seed="pudg" x={x - r} y={y - r * 1.4} w={2 * r} h={r * 1.6} col="#1A0E08" a={.5 * (1 - atom) * draw} />}
    {plums > 0 && P.map(([u, v, w], i) => { const q2 = cl(plums * 16 - i); if (q2 <= 0) return null; const jx = jig ? Math.sin(jig * 9 + i * 2) * 3 : 0;
      return atom > .5 ? <g key={i} opacity={q2}><circle cx={x + u * r * .85 + jx} cy={y - r * .4 + v * r * .9} r={r * .045} fill="#1A120B" /><text x={x + u * r * .85 + jx + r * .07} y={y - r * .4 + v * r * .9 + r * .025} fontSize={r * .1} fontFamily="IM Fell English" fill={PIG.sky[2]}>−</text></g>
        : <ellipse key={i} cx={x + u * r * .9} cy={y - r * .45 + v * r * .8} rx={r * (.05 + w * .03)} ry={r * .04} fill="#1A0E14" stroke={SEP} strokeWidth={.8} opacity={q2} />; })}
    {atom > .5 && <g opacity={(atom - .5) * 2}>{[[-.4, -.5], [.3, -.2], [-.1, .2], [.5, .3], [-.5, .1], [.1, -.7]].map(([u, v], i) => <text key={i} x={x + u * r} y={y - r * .4 + v * r * .9} fontSize={r * .13} fontFamily="IM Fell English" fill={PIG.red[2]} opacity={.6}>+</text>)}</g>}
  </g>;
  return <g>
    {plate > 0 && <g opacity={plate}><ellipse cx={x + 10} cy={y + r * .26} rx={r * 1.45} ry={r * .3} fill="#000" opacity={.25 * draw} filter="url(#b8)" />
      <Region d={ell(x, y + r * .18, r * 1.4, r * .26)} mat="paper" t={.12} draw={draw} sw={1.6} hatch={0} /><Ink d={ell(x, y + r * .16, r * 1.05, r * .17)} w={1} draw={draw} /></g>}
    {basin < 1 && cut <= 0 && <g opacity={1 - basin}>{body(0)}</g>}
    {basin > 0 ? <g opacity={basin}>
      <defs><clipPath id="basinK"><path d={`M${x - r * 1.1} ${y - r * 1.05 + (1 - fill) * r * 1.2} H${x + r * 1.1} V${y + r * .3} H${x - r * 1.1}Z`} /></clipPath></defs>
      <path d={`M${x - r * .98} ${y - r * .95} L${x - r * .7} ${y + r * .16} H${x + r * .7} L${x + r * .98} ${y - r * .95}Z`} fill={col} clipPath="url(#basinK)" filter="url(#wc)" />
      <SR d={`M${x - r * 1.1} ${y - r * 1.05} L${x - r * .75} ${y + r * .2} H${x + r * .75} L${x + r * 1.1} ${y - r * 1.05} H${x + r * .98} L${x + r * .66} ${y + r * .08} H${x - r * .66} L${x - r * .98} ${y - r * 1.05}Z`} mat="paper" t={.18} draw={draw} sw={1.8} />
      <SR d={ell(x, y - r * 1.05, r * 1.1, r * .12)} mat="sand" t={.4} draw={draw} sw={1.2} hatch={0} a={.5} /></g>
      : cut > 0 ? <g><defs><clipPath id="pudL"><rect x={x - 3 * r} y={y - 3 * r} width={3 * r} height={6 * r} /></clipPath><clipPath id="pudR"><rect x={x} y={y - 3 * r} width={3 * r} height={6 * r} /></clipPath></defs>
        {body(-sep, 'pudL')}{body(sep, 'pudR')}
        {[-sep, sep].map((dx, i) => <path key={i} d={`M${x + dx} ${y - r * (atom > .5 ? 1.35 : 1.05)} V${y + r * .1}`} stroke={SEP} strokeWidth={2} opacity={cut} />)}</g>
      : null}
    {steam > 0 && [0, 1, 2].map(i => <path key={i} d={`M${x - r * .3 + i * r * .3} ${y - r * 1.1} q${-30} ${-60} 0 ${-120} q${30} ${-60} 0 ${-120}`} fill="none" stroke="#FBF6EA" strokeWidth={10} opacity={.5 * steam} filter="url(#wc)" />)}
  </g>;
};

// ================================================================ THE TEXTBOOK — an open book whose right page carries the pudding atom as its figure; `turn` (0..3) turns
// pages one after another (each page sweeps over the spine, foreshortened); `mark` = a small red mark in the margin
const PuddingTextbook: React.FC<{ x?: N; y?: N; s?: N; draw?: N; turn?: N; mark?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, turn = 0, mark = 0 }) => {
  const k = s, W = 520 * k, H = 680 * k, fr = turn % 1, pg = (px: N, w: N, show: boolean) => <g>
    <Region d={rect(px, y - H / 2, w, H)} mat="paper" t={.1} draw={draw} sw={1.1} rim={false} />
    {show && Math.abs(w) > 60 && <g opacity={draw}>{Array.from({ length: 6 }, (_, i) => <Line key={i} d={`M${px + w * .1} ${y - H / 2 + 60 * k + i * 22 * k} H${px + w * .9}`} w={1.4} a={.5} />)}
      <circle cx={px + w / 2} cy={y + 20 * k} r={Math.abs(w) * .3} fill="#F2C4B4" stroke={SEP} strokeWidth={1.6} />
      {[[-.4, -.3], [.3, -.1], [-.1, .35], [.35, .4], [-.45, .2], [.05, -.5]].map(([u, v], i) => <circle key={i} cx={px + w / 2 + u * Math.abs(w) * .3} cy={y + 20 * k + v * Math.abs(w) * .3} r={4 * k} fill="#1A120B" />)}
      <text x={px + w / 2} y={y + Math.abs(w) * .3 + 70 * k} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={22 * k} fill={SEP}>Fig. — the atom</text>
      {Array.from({ length: 4 }, (_, i) => <Line key={'b' + i} d={`M${px + w * .1} ${y + H / 2 - 120 * k + i * 22 * k} H${px + w * .9}`} w={1.4} a={.5} />)}</g>}
  </g>;
  return <g>
    <rect x={x - W - 10} y={y - H / 2 + 6} width={2 * W + 20} height={H} fill="#000" opacity={.25 * draw} filter="url(#b8)" transform="translate(10 14)" />
    <SR d={rect(x - W - 18 * k, y - H / 2 - 12 * k, 2 * W + 36 * k, H + 24 * k)} mat="red" t={.7} draw={draw} sw={1.4} />
    {pg(x - W, W, true)}{pg(x, W, true)}
    {fr > .02 && fr < .98 && pg(x, W * Math.cos(fr * Math.PI), true)}
    {mark > 0 && <Line d={`M${x + W - 40 * k} ${y - 120 * k} l${10 * k} ${30 * k} l${8 * k} ${-50 * k}`} w={3} col={PIG.red[1]} draw={mark} />}
    <Line d={`M${x} ${y - H / 2} V${y + H / 2}`} w={1.6} a={draw} />
  </g>;
};

// ================================================================ A LEAD BLOCK WITH THE RADIUM TUBE — a heavy lead pot with a lid; inside, a tiny glass tube that glows
const RadiumBlock: React.FC<{ x: N; y: N; s?: N; draw?: N; open?: N; glow?: N }> = ({ x, y, s = 1, draw = 1, open = 0, glow = 0 }) => {
  const k = s; return <g>
    <SR d={rect(x - 70 * k, y - 120 * k, 140 * k, 120 * k)} mat="night" t={.6} draw={draw} sw={1.6} ang={90} />
    {glow > 0 && <g opacity={glow * draw}><circle cx={x} cy={y - 124 * k} r={60 * k} fill="url(#glowG)" /><SR d={rect(x - 6 * k, y - 160 * k, 12 * k, 44 * k)} mat="paper" t={.1} hatch={0} /><circle cx={x} cy={y - 162 * k} r={6 * k} fill="#F4FFF0" /></g>}
    <g transform={`translate(${open * 170 * k} ${open * 120 * k - Math.sin(open * Math.PI) * 90 * k})`}><SR d={rect(x - 80 * k, y - 150 * k, 160 * k, 30 * k)} mat="night" t={.5} draw={draw} sw={1.5} /><SR d={rect(x - 18 * k, y - 172 * k, 36 * k, 22 * k)} mat="night" t={.65} draw={draw} /></g>
  </g>;
};

// ================================================================ THE NOBEL MEDAL — a gold disc with a raised rim, the profile in relief, the legend; turn 0..1 flips it face-on
const NobelMedal: React.FC<{ x?: N; y?: N; r?: N; draw?: N; turn?: N }> = ({ x = 960, y = 540, r = 220, draw = 1, turn = 1 }) => {
  const sx = Math.max(.06, Math.abs(Math.cos((1 - turn) * Math.PI / 2))); return <g transform={`translate(${x} ${y}) scale(${sx} 1) translate(${-x} ${-y})`}>
    <circle cx={x + 12} cy={y + 18} r={r * 1.02} fill="#000" opacity={.3 * draw} filter="url(#b8)" />
    <Region d={circ(x, y, r)} mat="gold" t={.3} draw={draw} sw={2} hatch={0} />
    <Ink d={circ(x, y, r * .88)} w={1.4} draw={draw} />
    {turn > .5 && <g opacity={(turn - .5) * 2 * draw}><path d={`M${x + r * .05} ${y - r * .55} Q${x - r * .35} ${y - r * .5} ${x - r * .35} ${y - r * .1} L${x - r * .45} ${y + r * .02} L${x - r * .33} ${y + r * .08} Q${x - r * .36} ${y + r * .2} ${x - r * .25} ${y + r * .25} Q${x - r * .2} ${y + r * .42} ${x + r * .05} ${y + r * .45} Q${x + r * .35} ${y + r * .4} ${x + r * .42} ${y + r * .05} Q${x + r * .45} ${y - r * .45} ${x + r * .05} ${y - r * .55}Z`} fill="#B8862B" opacity={.5} stroke={SEP} strokeWidth={1.4} />
      <path d={`M${x - r * .1} ${y + r * .2} q${r * .2} ${r * .15} ${r * .45} ${r * .05}`} fill="none" stroke={SEP} strokeWidth={1.2} />
      <path id="nobelArc" d={`M${x - r * .72} ${y + r * .1} A${r * .72} ${r * .72} 0 0 1 ${x + r * .72} ${y + r * .1}`} fill="none" />
      <text fontFamily="IM Fell English SC" fontSize={r * .13} fill={SEP} letterSpacing={4}><textPath href="#nobelArc" startOffset="50%" textAnchor="middle">ALFR · NOBEL</textPath></text></g>}
  </g>;
};

// ================================================================ NELSON, NEW ZEALAND — Rutherford's country: green hills under ranges, a weatherboard farmhouse with
// a veranda and an iron roof, a post-and-wire fence, clumps of flax (harakeke) in the foreground
const NelsonFarm: React.FC<{ x?: N; y?: N; s?: N; draw?: N }> = ({ x = 960, y = 760, s = 1, draw = 1 }) => {
  const k = s, X = (d: N) => x + d * k, Y = (d: N) => y + d * k;
  const hill = (o: N, h: N, w: N) => { let d = `M${X(-700)} ${Y(300)} L${X(-700)} ${Y(o)}`; for (let i = -700; i <= 700; i += 25) d += ` L${X(i)} ${f1(Y(o - h * Math.exp(-((i / w) ** 2)) - Math.sin(i / 90) * 8))}`; return d + ` L${X(700)} ${Y(300)}Z`; };
  return <g>
    <SR d={hill(-60, 260, 380)} mat="sky" t={.3} draw={draw} sw={.9} hatchA={.2} />
    <SR d={hill(20, 160, 600)} mat="leaf" t={.42} draw={draw} sw={1.1} />
    <SR d={hill(120, 40, 900)} mat="land" t={.4} draw={draw} sw={1.2} />
    <SR d={rect(X(-120), Y(-20), 260 * k, 110 * k)} mat="paper" t={.2} draw={draw} sw={1.3} />
    <SR d={`M${X(-140)} ${Y(-20)} L${X(10)} ${Y(-110)} L${X(160)} ${Y(-20)}Z`} mat="red" t={.6} draw={draw} sw={1.3} ang={30} />
    <SR d={rect(X(-120), Y(30), 260 * k, 10 * k)} mat="wood" t={.6} draw={draw} />
    {[-80, 20, 100].map(wx => <SR key={wx} d={rect(X(wx), Y(0), 30 * k, 30 * k)} mat="sky" t={.4} draw={draw} sw={.9} />)}
    {Array.from({ length: 12 }, (_, i) => <Line key={i} d={`M${X(-600 + i * 100)} ${Y(170)} v${-50 * k}`} w={2.4 * k} a={draw} />)}
    <Line d={`M${X(-600)} ${Y(132)} H${X(500)} M${X(-600)} ${Y(150)} H${X(500)}`} w={.8} a={.7 * draw} />
    {[[-520, 260], [380, 250], [560, 280]].map(([fx, fy], i) => <g key={i}>{Array.from({ length: 9 }, (_, j) => { const a = (j - 4) * 12; return <path key={j} d={`M${X(fx)} ${Y(fy)} Q${X(fx + a * .8)} ${Y(fy - 120)} ${X(fx + a * 2.4)} ${Y(fy - 160 - Math.abs(4 - j) * -6)}`} fill="none" stroke={PIG.leaf[2]} strokeWidth={4 * k} opacity={draw} />; })}</g>)}
  </g>;
};

// ================================================================ GOLD LEAF HELD TO THE LAMP — brass tweezers holding a crinkled square of gold leaf before an oil lamp;
// lit 0..1: the lamp burns and the leaf, thin enough to pass light, glows green (as real gold leaf does in transmitted light)
const GoldLeafLamp: React.FC<{ x?: N; y?: N; s?: N; draw?: N; lit?: N; flutter?: N }> = ({ x = 960, y = 520, s = 1, draw = 1, lit = 0, flutter = 0 }) => {
  const k = s, fl = Math.sin(flutter * 6) * 6, leaf = `M${x - 170 * k} ${y - 160 * k + fl} Q${x} ${y - 190 * k} ${x + 170 * k} ${y - 150 * k - fl} Q${x + 190 * k} ${y} ${x + 160 * k} ${y + 170 * k} Q${x} ${y + 150 * k + fl} ${x - 160 * k} ${y + 175 * k} Q${x - 190 * k} ${y} ${x - 170 * k} ${y - 160 * k + fl}Z`;
  return <g>
    <g transform={`translate(${x + 330 * k} ${y + 120 * k})`}>
      <SR d={`M-90 260 Q-100 180 -60 150 H60 Q100 180 90 260Z`} mat="brass" t={.5} draw={draw} sw={1.4} />
      <SR d={`M-50 150 Q-70 40 0 -40 Q70 40 50 150Z`} mat="sky" t={.06} draw={draw} sw={1.3} hatch={0} a={.7} />
      {lit > 0 && <g opacity={lit}><path d={`M0 110 Q-24 70 0 20 Q24 70 0 110Z`} fill="#F7D98C" /><circle cx={0} cy={70} r={170} fill="url(#glowW)" opacity={.8} /></g>}
    </g>
    <Region d={leaf} color={mix('#E2B44C', '#9FD08A', lit * .65)} mat="brass" t={.3} draw={draw} sw={1.2} hatch={0} a={.95} />
    {lit > 0 && <path d={leaf} fill="#C8F0B0" opacity={.35 * lit} filter="url(#b8)" />}
    {[-.5, -.1, .3].map(f => <Line key={f} d={`M${x - 150 * k} ${y + f * 160 * k} q${80 * k} ${10 * k} ${150 * k} ${-6 * k} t${140 * k} ${8 * k}`} w={.8} a={.5 * draw} />)}
    <SR d={`M${x - 40 * k} ${y - 150 * k} L${x - 380 * k} ${y - 420 * k} L${x - 360 * k} ${y - 440 * k} L${x - 10 * k} ${y - 160 * k}Z`} mat="brass" t={.45} draw={draw} sw={1.2} />
    <SR d={`M${x - 10 * k} ${y - 160 * k} L${x - 340 * k} ${y - 460 * k} L${x - 320 * k} ${y - 470 * k} L${x + 14 * k} ${y - 166 * k}Z`} mat="brass" t={.55} draw={draw} sw={1.2} />
  </g>;
};

// ================================================================ AN EYE IN THE DARK — lids, lashes, the iris with its fibres; `pupil` 0..1 = how wide (dark adaptation);
// `see` = faint flashes reflected in the cornea
const DarkEye: React.FC<{ cx?: N; cy?: N; r?: N; draw?: N; pupil?: N; see?: N; open?: N }> = ({ cx = 960, cy = 540, r = 300, draw = 1, pupil = .3, see = 0, open = 1 }) => {
  const o = open, up = `M${cx - r * 1.6} ${cy} Q${cx - r * .5} ${cy - r * 1.1 * o} ${cx + r * .2} ${cy - r * .95 * o} Q${cx + r * 1.2} ${cy - r * .7 * o} ${cx + r * 1.6} ${cy}`;
  const lo = `M${cx - r * 1.6} ${cy} Q${cx - r * .4} ${cy + r * .85 * o} ${cx + r * .3} ${cy + r * .8 * o} Q${cx + r * 1.2} ${cy + r * .6 * o} ${cx + r * 1.6} ${cy}`;
  const eye = up + ` L${cx + r * 1.6} ${cy} ` + lo.replace(/^M[^Q]+/, '').split(' Q').reverse().join(' Q') ;
  const ir = r * .62, pr = ir * (.25 + pupil * .55);
  return <g>
    <Region d={`M${cx - r * 2.4} ${cy - r * 1.8} H${cx + r * 2.4} V${cy + r * 1.8} H${cx - r * 2.4}Z`} mat="skin" t={.75} draw={draw} sw={0} hatch={0} rim={false} a={.9} />
    <defs><clipPath id="eyeK"><path d={`${up} Q${cx + r * 1.2} ${cy + r * .6 * o} ${cx + r * .3} ${cy + r * .8 * o} Q${cx - r * .4} ${cy + r * .85 * o} ${cx - r * 1.6} ${cy}Z`} /></clipPath></defs>
    <g clipPath="url(#eyeK)">
      <rect x={cx - r * 2} y={cy - r * 1.5} width={r * 4} height={r * 3} fill="#E9E2D2" />
      <circle cx={cx} cy={cy} r={ir} fill="#5A6E58" stroke={SEP} strokeWidth={2} />
      {Array.from({ length: 64 }, (_, i) => { const a = i / 64 * Math.PI * 2; return <Line key={i} d={`M${cx + Math.cos(a) * pr} ${cy + Math.sin(a) * pr} L${cx + Math.cos(a + .05) * ir * .96} ${cy + Math.sin(a + .05) * ir * .96}`} w={1} col="#2F4430" a={.6} />; })}
      <circle cx={cx} cy={cy} r={pr} fill="#060404" />
      <ellipse cx={cx + ir * .35} cy={cy - ir * .4} rx={ir * .16} ry={ir * .1} fill="#FFFFFF" opacity={.8} />
      {see > 0 && [[-.2, .1], [.15, -.2], [.05, .25]].map(([u, v], i) => <g key={i} opacity={see * (.5 + .5 * Math.sin(i * 2 + see * 9))}><circle cx={cx + u * pr} cy={cy + v * pr} r={4} fill="#B8F0C8" /><circle cx={cx + u * pr} cy={cy + v * pr} r={14} fill="#B8F0C8" opacity={.3} /></g>)}
      <path d={up + ` L${cx + r * 1.6} ${cy - r * 2} L${cx - r * 1.6} ${cy - r * 2}Z`} fill="#000" opacity={.25} filter="url(#b8)" transform="translate(0 16)" />
    </g>
    <Ink d={up} w={3} draw={draw} /><Ink d={lo} w={2} draw={draw} />
    {Array.from({ length: 22 }, (_, i) => { const f = .1 + i / 26, px = cx - r * 1.6 + f * r * 3.2, py = cy - Math.sin(f * Math.PI) * r * .98 * o; return <Line key={i} d={`M${px} ${py} q${4} ${-30} ${20 + i} ${-46}`} w={1.4} a={.8 * draw} />; })}
    <Line d={`M${cx - r * 1.4} ${cy - r * 1.3} Q${cx} ${cy - r * 1.7} ${cx + r * 1.5} ${cy - r * 1.05}`} w={2} a={.5 * draw} />
    {void eye}
  </g>;
};

// ================================================================ A GEIGER–MÜLLER COUNTER (c. 1930s): the counter tube on its stand, a cable, the wooden box with a
// moving-coil meter (the needle jumps with each count: `needle` 0..1) and two knobs
const GeigerCounter: React.FC<{ x?: N; y?: N; s?: N; draw?: N; needle?: N }> = ({ x = 960, y = 600, s = 1, draw = 1, needle = 0 }) => {
  const k = s, X = (d: N) => x + d * k, Y = (d: N) => y + d * k, na = (-50 + needle * 100) * Math.PI / 180;
  return <g>
    <SR d={rect(X(-120), Y(-220), 520 * k, 360 * k)} mat="wood" t={.55} draw={draw} sw={1.8} />
    <Region d={circ(X(80), Y(-60), 110 * k)} mat="paper" t={.08} draw={draw} sw={1.6} hatch={0} />
    {Array.from({ length: 11 }, (_, i) => { const a = (-50 + i * 10) * Math.PI / 180; return <Line key={i} d={`M${X(80) + Math.sin(a) * 92 * k} ${Y(-40) - Math.cos(a) * 92 * k} L${X(80) + Math.sin(a) * 78 * k} ${Y(-40) - Math.cos(a) * 78 * k}`} w={1.1} a={draw} />; })}
    <Line d={`M${X(80)} ${Y(-40)} L${X(80) + Math.sin(na) * 86 * k} ${Y(-40) - Math.cos(na) * 86 * k}`} w={2.4} col={PIG.red[2]} a={draw} />
    <circle cx={X(80)} cy={Y(-40)} r={7 * k} fill={SEP} opacity={draw} />
    {[260, 340].map(kx => <SR key={kx} d={circ(X(kx), Y(-60), 30 * k)} mat="night" t={.5} draw={draw} />)}
    <SR d={rect(X(240), Y(30), 120 * k, 40 * k)} mat="brass" t={.4} draw={draw} />
    <Line d={`M${X(-120)} ${Y(60)} Q${X(-260)} ${Y(140)} ${X(-360)} ${Y(40)}`} w={5 * k} a={draw} />
    <SR d={rect(X(-480), Y(-40), 30 * k, 180 * k)} mat="wood" t={.6} draw={draw} /><SR d={rect(X(-560), Y(130), 200 * k, 26 * k)} mat="wood" t={.6} draw={draw} />
    <SR d={rr(X(-620), Y(-100), 320 * k, 60 * k, 30 * k)} mat="regolith" t={.35} draw={draw} sw={1.4} ang={0} />
    <SR d={ell(X(-620), Y(-70), 12 * k, 30 * k)} mat="sky" t={.3} draw={draw} hatch={0} />
  </g>;
};

// ================================================================ EIGHT THOUSAND — a field of n tiny dots (inked in by k), one red
const DotField: React.FC<{ x?: N; y?: N; w?: N; h?: N; n?: N; k?: N; red?: N; ri?: N; draw?: N }> = ({ x = 700, y = 540, w = 900, h = 760, n = 8000, k = 1, red = 0, ri = 4321, draw = 1 }) => {
  const cols = Math.round(Math.sqrt(n * w / h)), rows = Math.ceil(n / cols), dx = w / cols, dy = h / rows, x0 = x - w / 2, y0 = y - h / 2, m = Math.floor(n * k);
  const d = useMemo(() => { let s = ''; for (let i = 0; i < m; i++) { const c = i % cols, r = Math.floor(i / cols); s += `M${f1(x0 + (c + .5) * dx)} ${f1(y0 + (r + .5) * dy)}h.01`; } return s; }, [m, x0, y0, dx, dy, cols]);
  const rc = ri % cols, rr2 = Math.floor(ri / cols);
  return <g opacity={draw}><path d={d} stroke={SEP} strokeWidth={Math.min(dx, dy) * .55} strokeLinecap="round" opacity={.75} />
    {red > 0 && <g><circle cx={x0 + (rc + .5) * dx} cy={y0 + (rr2 + .5) * dy} r={Math.min(dx, dy) * .5} fill={PIG.red[1]} /><circle cx={x0 + (rc + .5) * dx} cy={y0 + (rr2 + .5) * dy} r={Math.min(dx, dy) * 1.6} fill={PIG.red[1]} opacity={red} /><circle cx={x0 + (rc + .5) * dx} cy={y0 + (rr2 + .5) * dy} r={48} fill="none" stroke={PIG.red[1]} strokeWidth={5} opacity={red} /></g>}</g>;
};

// ================================================================ RUTHERFORD'S DESK AT NIGHT — a green-shaded lamp, sheets of sums, the curve sketched round a dot, an inkwell, his pipe
const RutherfordDesk: React.FC<{ x?: N; y?: N; s?: N; draw?: N; lamp?: N; sums?: N; curve?: N; flicker?: N }> = ({ x = 960, y = 700, s = 1, draw = 1, lamp = 1, sums = 0, curve = 0, flicker = 0 }) => {
  const k = s, X = (d: N) => x + d * k, Y = (d: N) => y + d * k, fl = 1 + Math.sin(flicker * 13) * .04;
  return <g>
    <rect x={-40} y={-40} width={2000} height={1200} fill="#120C08" opacity={.75 * draw} />
    {lamp > 0 && <ellipse cx={X(-80)} cy={Y(30)} rx={720 * k * fl} ry={360 * k * fl} fill="#F7D98C" opacity={.32 * lamp * draw} filter="url(#b30)" />}
    <SR d={rect(X(-900), Y(40), 1800 * k, 60 * k)} mat="wood" t={.62} draw={draw} sw={1.5} ang={0} />
    <SR d={rect(X(-860), Y(100), 1720 * k, 400 * k)} mat="wood" t={.85} draw={draw} sw={1.2} ang={90} />
    <g transform={`rotate(-4 ${X(-60)} ${Y(-60)})`}><Region d={rect(X(-340), Y(-200), 480 * k, 250 * k)} mat="paper" t={.08} draw={draw} sw={1} rim={false} />
      {Array.from({ length: 8 }, (_, i) => { const q = cl(sums * 8 - i); if (q <= 0) return null; const sq = seq('sum' + i); let d = `M${X(-310)} ${Y(-170 + i * 26)}`; for (let j = 0; j < 14; j++) d += ` q${f1(6 + sq() * 8)} ${f1(-10 - sq() * 6)} ${f1(14 + sq() * 10)} ${f1(sq() * 6 - 2)} m${f1(4 + sq() * 10)} 0`; return <Line key={i} d={d} w={1.3} draw={q} a={.85} />; })}
      {curve > 0 && <g><circle cx={X(40)} cy={Y(-60)} r={5} fill={SEP} /><Line d={`M${X(-120)} ${Y(-150)} Q${X(80)} ${Y(-60)} ${X(-120)} ${Y(30)}`} w={2} col={PIG.red[2]} draw={curve} /></g>}</g>
    <g transform={`translate(${X(520)} ${Y(40)})`}><SR d={`M-30 0 L-14 -280 H14 L30 0Z`} mat="brass" t={.5} draw={draw} /><SR d={`M-150 -270 Q0 -400 150 -270Z`} mat="leaf" t={.55} draw={draw} sw={1.4} />
      {lamp > 0 && <ellipse cx={0} cy={-270} rx={110} ry={16} fill="#FFF4D2" opacity={lamp * draw} />}</g>
    <SR d={ell(X(-560), Y(20), 50 * k, 22 * k)} mat="night" t={.7} draw={draw} /><SR d={rect(X(-590), Y(-30), 60 * k, 50 * k)} mat="night" t={.6} draw={draw} />
    <SR d={`M${X(280)} ${Y(20)} q${40 * k} ${10 * k} ${110 * k} ${-6 * k} l${4 * k} ${10 * k} q${-70 * k} ${16 * k} ${-114 * k} ${4 * k}Z`} mat="wood" t={.8} draw={draw} /><SR d={rr(X(250), Y(-30), 46 * k, 54 * k, 10 * k)} mat="wood" t={.7} draw={draw} />
  </g>;
};

// ================================================================ THE SHELL AND THE TISSUE PAPER (Rutherford's image, staged): a shingle beach and the sea, a wooden frame
// with a sheet of tissue paper (it flutters), a 15-inch naval gun barrel on its mount (R-05) at the left; smoke 0..1 when it fires
const ShellAndTissue: React.FC<{ y?: N; draw?: N; smoke?: N; flutter?: N; gun?: N }> = ({ y = 760, draw = 1, smoke = 0, flutter = 0, gun = 1 }) => {
  const fl = Math.sin(flutter * 7) * 14, tis = `M1340 ${y - 360} Q${1400 + fl} ${y - 380} 1480 ${y - 360} L${1480 + fl * .4} ${y - 60} Q${1410 - fl} ${y - 50} 1340 ${y - 60}Z`;
  return <g>
    <SR d={rect(-40, y - 260, 2000, 180)} mat="sea" t={.4} draw={draw} sw={1} ang={0} hatchA={.3} />
    <SR d={`M-40 ${y - 90} Q960 ${y - 120} 1960 ${y - 80} L1960 1120 L-40 1120Z`} mat="stone" t={.38} draw={draw} sw={1.2} />
    <Stipple x={0} y={y - 80} w={1920} h={400} n={1600} seed="shingle" r0={1} a={.4 * draw} />
    <SR d={rect(1320, y - 380, 18, 340)} mat="wood" t={.7} draw={draw} ang={90} /><SR d={rect(1482, y - 380, 18, 340)} mat="wood" t={.7} draw={draw} ang={90} /><SR d={rect(1310, y - 392, 200, 16)} mat="wood" t={.6} draw={draw} />
    <Region d={tis} mat="paper" t={.02} draw={draw} sw={1} hatch={0} a={.85} />
    {gun > 0 && <g opacity={gun}><SR d={`M120 ${y - 70} L160 ${y - 220} H380 L420 ${y - 70}Z`} mat="regolith" t={.55} draw={draw} sw={1.6} />
      <SR d={`M260 ${y - 250} L760 ${y - 330} L768 ${y - 296} L268 ${y - 190}Z`} mat="regolith" t={.42} draw={draw} sw={1.6} ang={-10} />
      <SR d={ell(764, y - 313, 10, 18)} mat="night" t={.8} draw={draw} /><SR d={circ(270, y - 220, 50)} mat="regolith" t={.6} draw={draw} /></g>}
    {smoke > 0 && <g opacity={smoke * (1 - Math.max(0, smoke - .6) * 2.5)} filter="url(#b8)">{[0, 1, 2, 3, 4].map(i => <circle key={i} cx={790 + i * 40 * smoke} cy={y - 320 - i * 14 * smoke} r={30 + i * 24 * smoke} fill="#EDE6D6" />)}</g>}
  </g>;
};
const NavalShell: React.FC<{ x: N; y: N; s?: N; rot?: N }> = ({ x, y, s = 1, rot = 0 }) => <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
  <SR d={`M-60 -18 H30 Q70 -16 90 0 Q70 16 30 18 H-60Z`} mat="regolith" t={.45} sw={1.6} ang={0} /><SR d={rect(-62, -18, 12, 36)} mat="brass" t={.5} /><Line d="M10 -18 V18" w={1} /></g>;

// ================================================================ THE NUCLEAR ATOM — the atom's outline (dotted), Thomson's pink charge that can dissolve (pudding),
// the nucleus as a bright point (point), the electrons as a faint haze at the rim (haze), mass flowing to the centre (flow), and `h` = hydrogen
// (one electron cloud, labelled separately). Paths of α particles are the engine's `stream`.
const NuclearAtom: React.FC<{ cx?: N; cy?: N; r?: N; draw?: N; pudding?: N; point?: N; haze?: N; flow?: N; ring?: N; swirl?: N; dots?: N; glint?: N; one?: N; ps?: N }> = ({ cx = 960, cy = 540, r = 380, draw = 1, pudding = 0, point = 0, haze = 0, flow = 0, ring = 1, swirl = 0, dots = 1, glint = 0, one = 0, ps = 1 }) => {
  const hz = useMemo(() => { const q = seq('haze'); return Array.from({ length: 420 }, () => { const a = q() * Math.PI * 2, d = .82 + q() * .2; return [a, d, q()]; }); }, []);
  const fl = useMemo(() => { const q = seq('flow'); return Array.from({ length: 60 }, () => { const a = q() * Math.PI * 2, d = Math.sqrt(q()) * .9; return [Math.cos(a) * d, Math.sin(a) * d, q()]; }); }, []);
  return <g>
    {ring > 0 && <g opacity={ring * draw}>{Array.from({ length: 90 }, (_, i) => { const a = i / 90 * Math.PI * 2; return <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={Math.max(1.4, r / 120)} fill={SEP} opacity={dots} />; })}</g>}
    {pudding > 0 && <circle cx={cx} cy={cy} r={r * .97} fill="#F2C4B4" opacity={.75 * pudding * draw} filter="url(#wc)" />}
    {haze > 0 && <g opacity={haze * draw}>{hz.map(([a, d, w], i) => { const aa = a + swirl * (1.5 - d); return <circle key={i} cx={cx + Math.cos(aa) * r * d} cy={cy + Math.sin(aa) * r * d} r={Math.max(.8, r / 160) * (0.6 + w)} fill={PIG.sky[2]} opacity={.25 + .4 * w} />; })}</g>}
    {flow > 0 && fl.map(([u, v, w], i) => { const q = cl(flow * 1.5 - w * .5); if (q >= 1 || q <= 0) return null; return <circle key={i} cx={cx + u * r * (1 - q)} cy={cy + v * r * (1 - q)} r={Math.max(1.5, r / 90)} fill="#B8862B" opacity={.8} />; })}
    {point > 0 && <g opacity={point * draw}><circle cx={cx} cy={cy} r={Math.max(8, r * .1) * ps * (1 + glint * .5)} fill="url(#glowG)" /><circle cx={cx} cy={cy} r={Math.max(2.5, r * .012) * ps} fill="url(#gold)" stroke={SEP} strokeWidth={.8} /></g>}
    {one > 0 && <g opacity={one * draw}><circle cx={cx + Math.cos(2.36 + swirl * .3) * r * .95} cy={cy + Math.sin(2.36 + swirl * .3) * r * .95} r={Math.max(10, r * .05)} fill="url(#glowG)" /><circle cx={cx + Math.cos(2.36 + swirl * .3) * r * .95} cy={cy + Math.sin(2.36 + swirl * .3) * r * .95} r={Math.max(3, r * .016)} fill={PIG.sky[2]} stroke={SEP} strokeWidth={.8} /></g>}
  </g>;
};

// ================================================================ THE 1913 GRAPH — scintillations per minute against the angle (log scale), the curve 1/sin⁴(φ/2) fitted
// to the gold series, and Geiger & Marsden's real counts (Table II, gold, X-01) landing on it one by one (`pts` 0..11)
const GOLD13: [N, N][] = [[150, 33.1], [135, 43.0], [120, 51.9], [105, 69.5], [75, 211], [60, 477], [45, 1435], [37.5, 3300], [30, 7800], [22.5, 27300], [15, 132000]];
const ScatterGraph: React.FC<{ x?: N; y?: N; w?: N; h?: N; draw?: N; curve?: N; pts?: N }> = ({ x = 960, y = 560, w = 1200, h = 640, draw = 1, curve = 0, pts = 0 }) => {
  const x0 = x - w / 2, y0 = y - h / 2, lg = (v: N) => Math.log10(v), Y = (v: N) => y0 + h - (lg(v) - 1) / (lg(300000) - 1) * h, Xa = (a: N) => x0 + (a - 10) / 145 * w;
  const C = 30.5; let d = ''; for (let a = 13; a <= 155; a += 1.5) { const v = C / Math.pow(Math.sin(a * Math.PI / 360), 4); d += (d ? ' L' : 'M') + `${f1(Xa(a))} ${f1(Y(v))}`; }
  return <g opacity={Math.min(1, draw * 1.5)}>
    <Region d={rect(x0 - 90, y0 - 60, w + 150, h + 150)} mat="paper" t={.06} draw={draw} sw={1} rim={false} />
    <Line d={`M${x0} ${y0} V${y0 + h} H${x0 + w}`} w={2} draw={draw} />
    {[10, 100, 1000, 10000, 100000].map(v => <g key={v}><Line d={`M${x0 - 10} ${Y(v)} H${x0 + w}`} w={.6} a={.3 * draw} /><text x={x0 - 18} y={Y(v) + 8} textAnchor="end" fontFamily="IM Fell English" fontSize={24} fill={SEP} opacity={draw}>{v.toLocaleString('en-US')}</text></g>)}
    {[30, 60, 90, 120, 150].map(a => <text key={a} x={Xa(a)} y={y0 + h + 36} textAnchor="middle" fontFamily="IM Fell English" fontSize={26} fill={SEP} opacity={draw}>{a}°</text>)}
    {curve > 0 && <Line d={d} w={3} col={PIG.red[1]} draw={curve} a={1} />}
    {GOLD13.map(([a, v], i) => { const q = cl(pts - i); if (q <= 0) return null; const yy = Y(v) - (1 - q) * 120; return <g key={i} opacity={q}><circle cx={Xa(a)} cy={yy} r={9} fill="url(#gold)" stroke={SEP} strokeWidth={1.4} /></g>; })}
  </g>;
};

// ================================================================ THE EMPTY STADIUM (P-08, a stadium from the air) — an oval bowl of terraced stands under a roof ring,
// the pitch with its stripes, lines, centre circle and spot; floodlight masts; dusk 0..1 (the lights come on); pea 0..1 = a green pea on the centre spot
const EmptyStadium: React.FC<{ cx?: N; cy?: N; s?: N; draw?: N; dusk?: N; pea?: N; rise?: N; flame?: N; breath?: N }> = ({ cx = 960, cy = 600, s = 1, draw = 1, dusk = 0, pea = 0, rise = 1, flame = 0, breath = 0 }) => {
  const k = s, RX = 820 * k, RY = 400 * k, tiers = 9, stand: React.ReactNode[] = [];
  for (let i = tiers; i >= 0; i--) { const f = .55 + .45 * i / tiers, hh = (1 - rise) * 120 * k * (i / tiers); stand.push(<path key={i} d={ell(cx, cy - i * 6 * k + hh, RX * f, RY * f)} fill={i % 2 ? tone('stone', .35 + i * .02) : tone('stone', .5 + i * .02)} stroke={SEP} strokeWidth={.6} opacity={draw} />); }
  const PX = RX * .5, PY = RY * .5;
  return <g>
    <ellipse cx={cx} cy={cy + 30 * k} rx={RX * 1.06} ry={RY * 1.08} fill="#000" opacity={.25 * draw} filter="url(#b8)" />
    <SR d={ell(cx, cy - 50 * k, RX * 1.04, RY * 1.04)} mat="regolith" t={.55} draw={draw} sw={2} />
    {stand}
    {Array.from({ length: 48 }, (_, i) => { const a = i / 48 * Math.PI * 2; return <Line key={i} d={`M${cx + Math.cos(a) * RX * .55} ${cy + Math.sin(a) * RY * .55} L${cx + Math.cos(a) * RX} ${cy + Math.sin(a) * RY - 60 * k}`} w={.6} a={.35 * draw} />; })}
    <SR d={ell(cx, cy, PX * 1.04, PY * 1.04)} mat="leaf" t={.35} draw={draw} sw={1.4} hatch={0} />
    <defs><clipPath id="pitchK"><path d={ell(cx, cy, PX * 1.04, PY * 1.04)} /></clipPath></defs>
    <g clipPath="url(#pitchK)" opacity={draw}>{Array.from({ length: 12 }, (_, i) => i % 2 ? <rect key={i} x={cx - PX + i * PX / 6} y={cy - PY} width={PX / 6} height={2 * PY} fill={PIG.leaf[2]} opacity={.18} /> : null)}</g>
    <g opacity={.85 * draw} stroke="#FBF6EA" strokeWidth={2} fill="none"><path d={rect(cx - PX * .8, cy - PY * .62, PX * 1.6, PY * 1.24)} /><path d={`M${cx} ${cy - PY * .62} V${cy + PY * .62}`} /><ellipse cx={cx} cy={cy} rx={PX * .18} ry={PY * .2} />
      <path d={rect(cx - PX * .8, cy - PY * .3, PX * .22, PY * .6)} /><path d={rect(cx + PX * .58, cy - PY * .3, PX * .22, PY * .6)} /></g>
    <circle cx={cx} cy={cy} r={3 * k} fill="#FBF6EA" opacity={draw} />
    {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([u, v], i) => { const mx = cx + u * RX * .92, my = cy + v * RY * .86; return <g key={i}><Line d={`M${mx} ${my} V${my - 260 * k}`} w={3} a={draw} /><SR d={rect(mx - 30 * k, my - 290 * k, 60 * k, 34 * k)} mat="regolith" t={.5} draw={draw} />
      {dusk > .3 && <circle cx={mx} cy={my - 273 * k} r={50 * k} fill="url(#glowW)" opacity={(dusk - .3) * 1.4} />}</g>; })}
    {dusk > 0 && <ellipse cx={cx} cy={cy - 40 * k} rx={RX * 1.6} ry={RY * 1.8} fill="#141C38" opacity={dusk * .45} style={{ mixBlendMode: 'multiply' }} />}
    {pea > 0 && <g opacity={pea}><circle cx={cx} cy={cy} r={7 * k} fill={PIG.leaf[0]} stroke={SEP} strokeWidth={1} /><circle cx={cx + 2} cy={cy - 2} r={2 * k} fill="#FFFFFF" opacity={.7} /></g>}
    {flame > 0 && <g opacity={flame} transform={`translate(${cx - RX * .9} ${cy - RY * .45})`}><SR d={rect(-5, -10, 10, 30)} mat="paper" t={.1} hatch={0} /><path d="M0 -12 Q-10 -30 0 -52 Q10 -30 0 -12Z" fill="#F7D98C" /><circle cx={0} cy={-30} r={50} fill="url(#glowW)" /></g>}
    {breath > 0 && <ellipse cx={cx + RX * .85} cy={cy - RY * .6} rx={60 * breath} ry={24 * breath} fill="#FBF6EA" opacity={.7 * (1 - breath * .6)} filter="url(#b8)" />}
  </g>;
};

// ================================================================ THE NUCLEUS CLOSE UP — a tight cluster of beads of two kinds: protons (vermilion) and neutrons (slate)
const NucleusBeads: React.FC<{ cx?: N; cy?: N; r?: N; draw?: N; k?: N; glint?: N }> = ({ cx = 960, cy = 540, r = 260, draw = 1, k = 1, glint = 0 }) => {
  const B = useMemo(() => { const q = seq('nuc'), o: [N, N, N][] = []; for (let i = 0; i < 26; i++) { const a = i * 2.4, d = Math.sqrt(i / 26) * .82; o.push([Math.cos(a) * d, Math.sin(a) * d, q() < .5 ? 1 : 0]); } return o.sort((p, q2) => p[1] - q2[1]); }, []);
  return <g>{B.map(([u, v, p], i) => { const q = cl(k * 26 - i * .6); if (q <= 0) return null; return <g key={i} opacity={q}><Ball x={cx + u * r * q} y={cy + v * r * q} r={r * .2} mat={p ? 'red' : 'regolith'} t={p ? .45 : .5} draw={draw} hi={p ? 1 : .6 + glint * .4} /></g>; })}</g>;
};

// ================================================================ THE VIEWER'S HAND — palm up, fingers open (`open` 0..1), drawn with its creases; and pressing down on an oak
// table in profile (mode 'press': `press` 0..1 lowers it; the knuckles whiten; `gap` = the gold line of the never-closing gap)
const ViewerHand: React.FC<{ x?: N; y?: N; s?: N; draw?: N; open?: N; mode?: string; press?: N; gap?: N; table?: N }> = ({ x = 960, y = 600, s = 1, draw = 1, open = 1, mode = 'palm', press = 0, gap = 0, table = 1 }) => {
  const k = s, T = (dx: N, dy: N) => `${f1(x + dx * k)} ${f1(y + dy * k)}`;
  if (mode === 'palm') {   // a right hand, palm up, seen from above: palm, four tapered fingers with their creases and pads, the thumb out to the right
    const o = .35 + .65 * open, F = [[-118, -40, 238, -9, 52], [-42, -66, 270, -3, 56], [36, -62, 258, 3, 54], [108, -36, 200, 10, 46]] as const;
    const palm = `M${T(-160, -30)} C${T(-170, 60)} ${T(-178, 190)} ${T(-120, 300)} C${T(-100, 340)} ${T(-90, 380)} ${T(-92, 560)} L${T(110, 560)} C${T(108, 380)} ${T(126, 330)} ${T(158, 270)} C${T(180, 220)} ${T(170, 80)} ${T(150, -20)} C${T(80, -64)} ${T(-80, -70)} ${T(-160, -30)}Z`;
    return <g>
      <SR d={palm} mat="skin" t={.34} draw={draw} sw={2} ang={80} />
      {F.map(([fx, fy, L0, rot, w], i) => { const L = L0 * o * k, W = w * k, bx = x + fx * k, by = y + fy * k, ang = rot * (.4 + .6 * open) + (1 - open) * 14;
        const fd = `M${f1(bx - W / 2)} ${f1(by + 10 * k)} L${f1(bx - W * .44)} ${f1(by - L + W * .5)} Q${f1(bx - W * .42)} ${f1(by - L)} ${f1(bx)} ${f1(by - L - 2 * k)} Q${f1(bx + W * .42)} ${f1(by - L)} ${f1(bx + W * .44)} ${f1(by - L + W * .5)} L${f1(bx + W / 2)} ${f1(by + 10 * k)}Z`;
        return <g key={i} transform={`rotate(${ang} ${bx} ${by})`}>
          <SR d={fd} mat="skin" t={.36} draw={draw} sw={1.8} ang={90} />
          {[.3, .62].map(f => <Line key={f} d={`M${bx - W * .32} ${by - L * f} q${W * .32} ${3 * k} ${W * .64} 0`} w={1.3} a={.65 * draw} />)}
          <ellipse cx={bx} cy={by - L * .86} rx={W * .26} ry={L * .07} fill={PIG.skin[1]} opacity={.35 * draw} />
        </g>; })}
      <SR d={`M${T(140, 250)} C${T(210, 210)} ${T(280, 150)} ${T(318, 60)} C${T(332, 22)} ${T(326, -6)} ${T(300, -8)} C${T(276, -8)} ${T(262, 30)} ${T(240, 80)} C${T(214, 132)} ${T(176, 160)} ${T(150, 170)}Z`} mat="skin" t={.38} draw={draw} sw={1.8} />
      <Line d={`M${T(250, 70)} q${12 * k} ${8 * k} ${24 * k} ${2 * k}`} w={1.2} a={.6 * draw} />
      <Line d={`M${T(-150, 110)} C${T(-60, 80)} ${T(40, 96)} ${T(150, 130)} M${T(-148, 180)} C${T(-60, 150)} ${T(20, 170)} ${T(90, 240)} M${T(130, 320)} C${T(60, 250)} ${T(60, 170)} ${T(140, 110)}`} w={1.6} a={.7 * draw} />
      <SR d={`M${T(-130, 480)} H${T(140, 480).split(' ')[0]} L${T(150, 640)} H${T(-140, 640).split(' ')[0]}Z`} mat="cloth" t={.5} draw={draw} sw={1.6} ang={0} />
    </g>;
  }
  // a right hand pressed flat on an oak table, seen from the side: sleeve, wrist, the back of the hand down to the knuckles, the fingers lying on the wood,
  // nails at the tips, the thumb in front; press 0..1 lowers it; gap = the gold line of the never-closing gap
  const dy = (1 - press) * -120 * k, ty = y + 120 * k, B = (dx: N, dyy: N) => `${f1(x + dx * k)} ${f1(ty + dyy * k)}`;
  const hand = `M${B(-560, -176)} C${B(-480, -172)} ${B(-430, -158)} ${B(-390, -150)} C${B(-300, -168)} ${B(-150, -150)} ${B(-60, -118)} C${B(-30, -110)} ${B(0, -96)} ${B(40, -78)}
    C${B(110, -66)} ${B(170, -62)} ${B(220, -64)} C${B(240, -66)} ${B(258, -60)} ${B(290, -52)} C${B(340, -46)} ${B(390, -36)} ${B(418, -16)} C${B(430, -4)} ${B(418, 0)} ${B(398, 0)}
    L${B(-90, 0)} C${B(-200, -4)} ${B(-300, -20)} ${B(-390, -46)} C${B(-450, -40)} ${B(-510, -36)} ${B(-560, -34)}Z`;
  return <g>
    {table > 0 && <g><SR d={rect(x - 1100, ty, 2200, 60 * k)} mat="wood" t={.5} draw={draw} sw={1.8} ang={0} /><SR d={rect(x - 1100, ty + 60 * k, 2200, 600)} mat="wood" t={.78} draw={draw} sw={1.2} ang={90} />
      {Array.from({ length: 9 }, (_, i) => <Line key={i} d={`M${x - 1100} ${ty + 8 + i * 6 * k} Q${x} ${ty + 4 + i * 6 * k + Math.sin(i) * 4} ${x + 1100} ${ty + 10 + i * 6 * k}`} w={.6} a={.5 * draw} />)}</g>}
    <g transform={`translate(0 ${dy})`}>
      <ellipse cx={x} cy={ty + 4} rx={480 * k} ry={14 * k} fill="#000" opacity={.25 * press * draw} filter="url(#b8)" />
      <SR d={hand} mat="skin" t={.36} draw={draw} sw={2} ang={10} />
      <SR d={`M${B(-300, -60)} C${B(-200, -40)} ${B(-60, -26)} ${B(40, -14)} C${B(70, -10)} ${B(80, 0)} ${B(50, 0)} L${B(-120, 0)} C${B(-200, -6)} ${B(-260, -20)} ${B(-300, -40)}Z`} mat="skin" t={.28} draw={draw} sw={1.6} hatch={0} />
      {[-40, 110, 250].map(cx => <Line key={cx} d={`M${B(cx, -100 + (cx + 40) * .2)} q${6 * k} ${16 * k} ${2 * k} ${30 * k}`} w={1.3} a={(.5 + press * .3) * draw} />)}
      <Line d={`M${B(352, -44)} Q${B(396, -36)} ${B(414, -14)}`} w={1.4} a={.8 * draw} />
      <SR d={`M${B(-1000, -190)} L${B(-560, -196)} L${B(-548, -16)} L${B(-1000, -10)}Z`} mat="cloth" t={.55} draw={draw} sw={1.8} ang={0} />
      <Line d={`M${B(-600, -194)} L${B(-590, -18)}`} w={1.4} a={draw} />
    </g>
    {gap > 0 && <path d={`M${x - 120 * k} ${ty - 2} H${x + 410 * k}`} stroke="url(#gold)" strokeWidth={4} opacity={gap} />}
    {gap > 0 && <path d={`M${x - 120 * k} ${ty - 2} H${x + 410 * k}`} stroke="#F7E3A0" strokeWidth={14} opacity={.35 * gap} filter="url(#b8)" />}
  </g>;
};

// ================================================================ THE DIVE INTO THE PALM — one drawing at four true scales: z 0 = the skin's ridges; 1 = cells (nuclei
// in polygonal walls); 2 = a lattice of molecules; 3 = one atom (a point and a haze). Each stage grows out of the last (geometric).
const PalmDive: React.FC<{ cx?: N; cy?: N; z?: N; draw?: N }> = ({ cx = 960, cy = 540, z = 0, draw = 1 }) => {
  const stage = (i: N, node: (sc: N) => React.ReactNode) => { const d = z - i; if (d < -1 || d > 1) return null; const sc = Math.pow(8, d), a = d < 0 ? 1 + d : 1 - d;
    return <g key={i} opacity={cl(a * 1.6) * draw} transform={`translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})`}>{node(sc)}</g>; };
  const cells = useMemo(() => { const q = seq('cell'), o: Pt[] = []; for (let i = 0; i < 70; i++) o.push([cx + (q() - .5) * 2200, cy + (q() - .5) * 1300]); return o; }, [cx, cy]);
  return <g>
    {stage(0, () => <g><rect x={cx - 1200} y={cy - 700} width={2400} height={1400} fill={PIG.skin[0]} opacity={.9} />{Array.from({ length: 40 }, (_, i) => <ellipse key={i} cx={cx + 80} cy={cy + 40} rx={40 + i * 34} ry={30 + i * 26} fill="none" stroke={PIG.skin[2]} strokeWidth={5} opacity={.55} />)}</g>)}
    {stage(1, () => <g><rect x={cx - 1200} y={cy - 700} width={2400} height={1400} fill={PIG.skin[0]} />{cells.map(([px, py], i) => <g key={i}><path d={ell(px, py, 120, 90)} fill={PIG.red[0]} opacity={.35} stroke={SEP} strokeWidth={2} /><circle cx={px + 10} cy={py - 6} r={26} fill={PIG.red[2]} opacity={.6} /></g>)}</g>)}
    {stage(2, () => <g><rect x={cx - 1200} y={cy - 700} width={2400} height={1400} fill="#F6EBD2" />{Array.from({ length: 11 * 7 }, (_, i) => { const px = cx - 1000 + (i % 11) * 200 + (Math.floor(i / 11) % 2) * 100, py = cy - 600 + Math.floor(i / 11) * 180; return <g key={i}><Line d={`M${px} ${py} L${px + 200} ${py} M${px} ${py} L${px + 100} ${py + 180}`} w={4} a={.5} /><circle cx={px} cy={py} r={34} fill={PIG.sky[1]} stroke={SEP} strokeWidth={2.4} /></g>; })}</g>)}
    {stage(3, () => <g><rect x={cx - 1200} y={cy - 700} width={2400} height={1400} fill="#F3E7CC" /><NuclearAtom cx={cx} cy={cy} r={380} point={1} haze={1} ring={1} /></g>)}
  </g>;
};

// ================================================================ WHERE HAND MEETS TABLE, magnified — the outer atoms of skin (above) and wood (below), each with its haze
// of electrons; where the hazes meet they push apart (push 0..1 = the lines of force, the bulge)
const ElectronCushion: React.FC<{ cx?: N; cy?: N; draw?: N; k?: N; push?: N }> = ({ cx = 960, cy = 540, draw = 1, k = 1, push = 0 }) => {
  const row = (yy: N, col: string, up: N) => Array.from({ length: 6 }, (_, i) => { const x = cx - 750 + i * 300, sq = 1 - push * .12; return <g key={i}>
    <ellipse cx={x} cy={yy} rx={150} ry={150 * sq} fill={col} opacity={.18 * k} filter="url(#b8)" />
    <Stipple x={x - 150} y={yy - 150} w={300} h={300} n={260} seed={'ec' + i + up} dens={(u, v) => { const d = Math.hypot(u - .5, v - .5) * 2; return d < 1 && d > .55 ? 1 : 0; }} col={col} a={.7 * k} />
    <circle cx={x} cy={yy} r={5} fill="url(#gold)" stroke={SEP} strokeWidth={.8} /></g>; });
  return <g opacity={draw}>
    <rect x={-40} y={-40} width={2000} height={cy - 170} fill={PIG.skin[0]} opacity={.45} /><rect x={-40} y={cy + 170} width={2000} height={700} fill={PIG.wood[0]} opacity={.45} />
    <text x={140} y={120} fontFamily="IM Fell English" fontStyle="italic" fontSize={34} fill={SEP}>skin</text><text x={140} y={1000} fontFamily="IM Fell English" fontStyle="italic" fontSize={34} fill={SEP}>wood</text>
    {row(cy - 175 - push * 20, PIG.red[2], 1)}{row(cy + 175 + push * 20, PIG.sky[2], 0)}
    {push > 0 && Array.from({ length: 11 }, (_, i) => { const x = cx - 750 + i * 150; return <path key={i} d={`M${x - 50} ${cy - 30} Q${x} ${cy + (i % 2 ? 1 : -1) * 6} ${x + 50} ${cy - 30} M${x - 50} ${cy + 30} Q${x} ${cy + (i % 2 ? -1 : 1) * 6} ${x + 50} ${cy + 30}`} fill="none" stroke={PIG.red[1]} strokeWidth={2.4} opacity={push} />; })}
  </g>;
};

// ================================================================ A DIAMOND AND A GOLD INGOT — a brilliant-cut stone (table, crown and pavilion facets) and a cast bar;
// xray 0..1 sweeps across both, showing inside each the sparse lattice of its atoms (points with wide empty spaces)
const DiamondAndIngot: React.FC<{ y?: N; draw?: N; xray?: N; glint?: N }> = ({ y = 560, draw = 1, xray = 0, glint = 0 }) => {
  const dx = 580, gx = 1340, dia = `M${dx - 220} ${y - 60} L${dx - 120} ${y - 160} H${dx + 120} L${dx + 220} ${y - 60} L${dx} ${y + 220}Z`, ing = `M${gx - 260} ${y + 120} L${gx - 200} ${y - 60} H${gx + 200} L${gx + 260} ${y + 120}Z`;
  const lat = (x0: N, y0: N, w: N, h: N, step: N) => { const o: React.ReactNode[] = []; for (let i = 0; i * step < w; i++) for (let j = 0; j * step < h; j++) o.push(<g key={i + '_' + j}><circle cx={x0 + i * step + (j % 2) * step / 2} cy={y0 + j * step} r={step * .2} fill={PIG.sky[1]} opacity={.25} /><circle cx={x0 + i * step + (j % 2) * step / 2} cy={y0 + j * step} r={2} fill={SEP} /></g>); return o; };
  return <g>
    <Region d={dia} mat="ice" t={.2} draw={draw} sw={2} hatch={0} />
    <g opacity={.7 * draw}><Line d={`M${dx - 120} ${y - 160} L${dx - 60} ${y - 60} L${dx} ${y - 160} L${dx + 60} ${y - 60} L${dx + 120} ${y - 160} M${dx - 220} ${y - 60} H${dx + 220} M${dx - 60} ${y - 60} L${dx} ${y + 220} L${dx + 60} ${y - 60} M${dx - 220} ${y - 60} L${dx - 60} ${y - 60} M${dx - 140} ${y - 60} L${dx} ${y + 220} L${dx + 140} ${y - 60}`} w={1.2} /></g>
    {glint > 0 && <g opacity={glint}><path d={`M${dx + 80} ${y - 190} l8 30 l30 8 l-30 8 l-8 30 l-8 -30 l-30 -8 l30 -8Z`} fill="#FFFFFF" /></g>}
    <SR d={ing} mat="gold" t={.4} draw={draw} sw={2} />
    <SR d={`M${gx - 200} ${y - 60} H${gx + 200} L${gx + 170} ${y - 100} H${gx - 170}Z`} mat="gold" t={.25} draw={draw} sw={1.6} hatch={0} />
    {xray > 0 && <g><defs><clipPath id="xrD"><path d={dia} /></clipPath><clipPath id="xrG"><path d={ing} /></clipPath><clipPath id="xrS"><rect x={0} y={0} width={1920 * xray} height={1080} /></clipPath></defs>
      <g clipPath="url(#xrS)"><g clipPath="url(#xrD)"><rect x={0} y={0} width={1920} height={1080} fill="#0E1A2A" opacity={.55} />{lat(dx - 240, y - 180, 480, 420, 70)}</g>
        <g clipPath="url(#xrG)"><rect x={0} y={0} width={1920} height={1080} fill="#2A1E08" opacity={.55} />{lat(gx - 280, y - 110, 560, 260, 64)}</g></g>
      <Line d={`M${1920 * xray} ${y - 300} V${y + 300}`} w={3} col="#B8F0C8" a={xray < 1 ? .8 : 0} /></g>}
  </g>;
};

// ================================================================ A PERSON OF EMPTY SPACE — a standing figure made only of sparse dots; spread 0..1 opens the gaps; lines 0..1 =
// faint lines of electric force flickering between neighbours; turn = the head turns a little
const StippleFigure: React.FC<{ x?: N; y?: N; h?: N; draw?: N; spread?: N; lines?: N; turn?: N; flick?: N }> = ({ x = 960, y = 980, h = 860, draw = 1, spread = 0, lines = 0, turn = 0, flick = 0 }) => {
  const P = useMemo(() => { const q = seq('fig'), o: Pt[] = [], parts: [N, N, N, N][] = [[0, -.89, .06, .07], [0, -.68, .12, .14], [0, -.48, .11, .1], [-.05, -.2, .05, .2], [.05, -.2, .05, .2], [-.15, -.62, .035, .18], [.15, -.62, .035, .18]];
    for (let i = 0; i < 900; i++) { const [px, py, rx, ry] = parts[Math.floor(q() * parts.length)], a = q() * Math.PI * 2, d = Math.sqrt(q()); o.push([px + Math.cos(a) * rx * d, py + Math.sin(a) * ry * d]); } return o; }, []);
  const n = Math.round(900 * (1 - spread * .6));
  return <g opacity={draw}>
    {lines > 0 && P.slice(0, 220).map(([u, v], i) => { const [u2, v2] = P[(i * 7 + 3) % 220]; if (Math.hypot(u - u2, v - v2) > .09) return null; return <line key={'l' + i} x1={x + u * h} y1={y + v * h} x2={x + u2 * h} y2={y + v2 * h} stroke="#B8862B" strokeWidth={1} opacity={lines * (.3 + .3 * Math.sin(flick * 6 + i))} />; })}
    {P.slice(0, n).map(([u, v], i) => <circle key={i} cx={x + (u + (v < -.8 ? turn * .02 : 0)) * h} cy={y + v * h} r={2.2 - spread} fill={SEP} />)}
  </g>;
};

// ================================================================ WHAT CAME OF IT — a power station's cooling towers with their steam, and a hospital scanner ring with its bed
const CoolingTowers: React.FC<{ x?: N; y?: N; s?: N; draw?: N; steam?: N }> = ({ x = 960, y = 800, s = 1, draw = 1, steam = 0 }) => {
  const k = s, tower = (cx: N, h: N) => `M${cx - 120 * k} ${y} Q${cx - 70 * k} ${y - h * .55} ${cx - 80 * k} ${y - h} H${cx + 80 * k} Q${cx + 70 * k} ${y - h * .55} ${cx + 120 * k} ${y}Z`;
  return <g>{[[-200, 380], [80, 420]].map(([dx, h], i) => <g key={i}><SR d={tower(x + dx * k, h * k)} mat="stone" t={.4} draw={draw} sw={1.6} ang={90} />
    {steam > 0 && [0, 1, 2].map(j => <ellipse key={j} cx={x + dx * k + j * 30 * k} cy={y - h * k - 60 * k - j * 70 * k * steam} rx={(90 + j * 40) * k} ry={(50 + j * 20) * k} fill="#FBF6EA" opacity={.6 * steam} filter="url(#b8)" />)}</g>)}
    <SR d={rect(x + 260 * k, y - 160 * k, 260 * k, 160 * k)} mat="stone" t={.55} draw={draw} sw={1.4} /></g>;
};
const ScannerRing: React.FC<{ x?: N; y?: N; s?: N; draw?: N; spin?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, spin = 0 }) => {
  const k = s; return <g>
    <SR d={`${circ(x, y, 260 * k)} ${ell(x, y, 120 * k, 120 * k).replace('A', 'A')}`} mat="paper" t={.2} draw={draw} sw={2} hatch={0} />
    <Region d={circ(x, y, 120 * k)} mat="night" t={.7} draw={draw} hatch={0} />
    {Array.from({ length: 24 }, (_, i) => { const a = (i / 24 + spin) * Math.PI * 2; return <circle key={i} cx={x + Math.cos(a) * 190 * k} cy={y + Math.sin(a) * 190 * k} r={7 * k} fill={i % 6 ? PIG.sky[1] : '#B8F0C8'} stroke={SEP} strokeWidth={.8} opacity={draw} />; })}
    <SR d={rect(x - 460 * k, y + 40 * k, 920 * k, 40 * k)} mat="paper" t={.15} draw={draw} sw={1.4} /><SR d={rect(x - 300 * k, y + 80 * k, 60 * k, 200 * k)} mat="regolith" t={.5} draw={draw} />
  </g>;
};

const LabStool: React.FC<{ x: N; y: N; h?: N; draw?: N }> = ({ x, y, h = 150, draw = 1 }) => <g>
  {[-46, 46].map(dx => <SR key={dx} d={`M${x + dx * .7 - 6} ${y - h + 14} L${x + dx - 6} ${y} H${x + dx + 6} L${x + dx * .7 + 6} ${y - h + 14}Z`} mat="wood" t={.7} draw={draw} sw={1.1} ang={90} />)}
  <Line d={`M${x - 40} ${y - h * .35} H${x + 40}`} w={4} a={draw} />
  <SR d={ell(x, y - h + 8, 62, 14)} mat="wood" t={.5} draw={draw} sw={1.4} /><SR d={rect(x - 62, y - h + 8, 124, 14)} mat="wood" t={.62} draw={draw} sw={1.2} />
</g>;
export const ART: Record<string, React.FC<any>> = {
  LabStool: LabStool,
  ManchesterLab: ManchesterLab, ScatterApparatus: ScatterApparatus, ZincScreenField: ZincScreenField, TallySheet: TallySheet, GoldFoilFrame: GoldFoilFrame, MistHillside: MistHillside, Stone: Stone, DottedAtom: DottedAtom, HairSection: HairSection, LightSwell: LightSwell, IvoryBalls: IvoryBalls, AtomosPapyrus: AtomosPapyrus, DaltonPlate: DaltonPlate, ClueMedallions: ClueMedallions, CavendishBench: CavendishBench, CathodeTube: CathodeTube, OldTelevision: OldTelevision, ChargeBalance: ChargeBalance, PlumPudding: PlumPudding, PuddingTextbook: PuddingTextbook, RadiumBlock: RadiumBlock, NobelMedal: NobelMedal, NelsonFarm: NelsonFarm, GoldLeafLamp: GoldLeafLamp, DarkEye: DarkEye, GeigerCounter: GeigerCounter, DotField: DotField, RutherfordDesk: RutherfordDesk, ShellAndTissue: ShellAndTissue, NavalShell: NavalShell, NuclearAtom: NuclearAtom, ScatterGraph: ScatterGraph, EmptyStadium: EmptyStadium, NucleusBeads: NucleusBeads, ViewerHand: ViewerHand, PalmDive: PalmDive, ElectronCushion: ElectronCushion, DiamondAndIngot: DiamondAndIngot, StippleFigure: StippleFigure, CoolingTowers: CoolingTowers, ScannerRing: ScannerRing,
};
// the people of this film — costumes designed from their portraits and the Manchester photographs (P-01, P-01-x1: dark three-piece suits, high
// white collars, the student in shirt-sleeves and waistcoat at the bench; Thomson's frock coat of 1897; Chadwick's double-breasted suit of the 1930s)
export const COSTUMES: Record<string, object> = {
  marsden1909: { coat: 0, mat: 'paper', t: .15, flare: .01, leg: 'night', legT: .66, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'night' },
  geiger1909: { coat: .42, mat: 'night', t: .66, flare: .02, leg: 'night', legT: .7, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'night' },
  rutherford1909: { coat: .4, mat: 'stone', t: .7, flare: .03, leg: 'stone', legT: .74, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.1, vest: 'stone' },
  thomson1897: { coat: .3, mat: 'night', t: .78, flare: .05, leg: 'stone', legT: .6, shoe: 'boot', neck: 'bow', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'night' },
  chadwick1932: { coat: .44, mat: 'regolith', t: .55, flare: .01, leg: 'regolith', legT: .6, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'regolith' },
};
export const SAMPLE: Record<string, object> = {
  ManchesterLab: { dark: 0, lamp: 1 }, ScatterApparatus: { x: 960, y: 560, mode: 'reflect', beam: 1 }, ZincScreenField: { r: 380 }, TallySheet: { x: 960, y: 540, n: 23, red: 1 },
  GoldFoilFrame: { x: 960, y: 480 }, MistHillside: {}, DottedAtom: {}, HairSection: { row: 1 }, LightSwell: {}, IvoryBalls: { crack: 1, spill: 1 }, AtomosPapyrus: {},
  DaltonPlate: { join: .5 }, ClueMedallions: { k1: 1, k2: 1, k3: 1, k4: 1 }, CavendishBench: {}, CathodeTube: { glow: 1, bend: .5, magnet: 1, plates: 1, s: .9 },
  OldTelevision: { glow: 1 }, ChargeBalance: { minus: 1, q: 1, tilt: 0 }, PlumPudding: { steam: 1 }, PuddingTextbook: { turn: 1.4, mark: 1 }, RadiumBlock: { x: 960, y: 700, s: 2, open: 1, glow: 1 },
  NobelMedal: {}, NelsonFarm: {}, GoldLeafLamp: { lit: 1 }, DarkEye: { pupil: .8, see: 1 }, GeigerCounter: { needle: .6 }, DotField: { red: 1 }, RutherfordDesk: { sums: 1, curve: 1 },
  ShellAndTissue: { smoke: .4 }, NavalShell: { x: 960, y: 540, s: 3 }, NuclearAtom: { point: 1, haze: 1 }, ScatterGraph: { curve: 1, pts: 11 }, EmptyStadium: { pea: 1 },
  NucleusBeads: {}, ViewerHand: { mode: 'palm' }, PalmDive: { z: 1.5 }, ElectronCushion: { push: 1 }, DiamondAndIngot: { xray: .6 }, StippleFigure: { lines: 1 },
  CoolingTowers: { steam: 1 }, ScannerRing: {}, Stone: { x: 960, y: 540, s: 4 },
};
export const FULL = true;
