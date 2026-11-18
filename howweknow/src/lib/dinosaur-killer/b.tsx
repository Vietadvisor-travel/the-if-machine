// dinosaur-killer — ACT III–V drawings: the shocked grain (ShockedGrain, v8 device: lamellae etch in, the grain cracks), cliffs round the
// world, the Yucatán coast (M-01 relief), a magnifier over a globe, the report on the shelf, the survey plane, the survey that draws a ring
// (SurveyRing, v8 device), the 1981 meeting hall, the drill core, the village sign, the impact rings, the food chain that snaps, the burrow,
// the sparrow, and the museum skeleton (MuseumHall + the theropod as bones).
// References: P-03 (shocked quartz: sets of straight, parallel planar lamellae crossing in two or three directions), M-01 (the buried ring:
// half on land under the jungle, half under the Gulf; Chicxulub Puerto on the coast), house sparrow (Passer domesticus) anatomy.
import React, { useMemo } from 'react';
import { Line, Ink, Stipple, SEP, ell, SR, Star, NightWash, Floor, Fell, Hand, N, Pt, f1, cl, ph, lerp, rect, rr, pathOf, rnd } from '../star-distance/kit';
import { ART_A, EngSky } from './a';
import { Skin, skinOutline, deg, P as PP, Joint, SmallMammal } from '../../paint/anatomy';

// ================================================================ THE SHOCKED GRAIN (v8 device) — a quartz grain in the microscope's round field, cross-polarised colours;
// etch 0..1 cuts its sets of straight parallel lamellae (two directions, then a third), crack 0..1 splits it along them; r = field radius.
const ShockedGrain: React.FC<{ x?: N; y?: N; r?: N; draw?: N; etch?: N; crack?: N; field?: N; heat?: N; sharp?: N }> = ({ x = 960, y = 540, r = 400, draw = 1, etch = 0, crack = 0, field = 1, heat = 0, sharp = 1 }) => {
  const id = 'shg' + Math.round(x) + Math.round(r);
  const G = useMemo(() => Array.from({ length: 13 }, (_, i) => { const a = i / 13 * Math.PI * 2, k = .78 + rnd(i * 2.7) * .2; return [Math.cos(a) * k * .62, Math.sin(a) * k * .5] as Pt; }), []);
  const grain = 'M' + G.map(p => `${f1(x + p[0] * r)} ${f1(y + p[1] * r)}`).join(' L') + 'Z';
  const sets = [[28, 1], [-34, .55], [82, .2]] as [N, N][];
  return <g opacity={draw}>
    <defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath><clipPath id={id + 'g'}><path d={grain} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill={field ? '#1A1424' : '#EFE0C2'} />
      {/* neighbour grains, dull */}
      {[[-.8, -.7], [.85, -.6], [-.9, .6], [.8, .75], [0, -.95], [0, .98]].map(([u, v], i) => <SR key={i} d={ell(x + u * r, y + v * r, r * .32, r * .24)} mat="tundra" t={.75} draw={draw} sw={1} hatch={0} />)}
      {crack <= .5 && <path d={grain} fill="#C9DDE6" stroke={SEP} strokeWidth={2} filter={sharp < .95 ? 'url(#b8)' : undefined} />}
      {crack <= .5 && <g clipPath={`url(#${id}g)`}>
        <rect x={x - r} y={y - r} width={r} height={2 * r} fill="#E9B456" opacity={.35} /><rect x={x} y={y - r} width={r} height={2 * r} fill="#7FA8C4" opacity={.4} />
        {sets.map(([ang, t0], si) => { const e = cl((etch - (1 - t0) * .6) / .4); if (e <= 0) return null; const n = 24;
          return <g key={si} transform={`rotate(${ang} ${x} ${y})`}>{Array.from({ length: n }, (_, i) => { const yy = y - r + (i + .5) * 2 * r / n, len = 2 * r * e;
            return <line key={i} x1={x - r} y1={yy} x2={x - r + len} y2={yy} stroke={si === 0 ? '#3A2418' : si === 1 ? '#8C3424' : '#22507A'} strokeWidth={si === 0 ? 2.2 : 1.6} opacity={.8} />; })}</g>; })}
      </g>}
      {crack > .5 && Array.from({ length: 9 }, (_, i) => { const a0 = i / 9 * Math.PI * 2, a1 = (i + 1) / 9 * Math.PI * 2, f = (crack - .5) * 2, mx = Math.cos((a0 + a1) / 2), my = Math.sin((a0 + a1) / 2);
        return <g key={'sh' + i} transform={`translate(${mx * f * r * .7} ${my * f * r * .7 + f * f * r * .4}) rotate(${(i % 2 ? 1 : -1) * f * 40} ${x} ${y})`} opacity={1 - f * .3}>
          <path d={`M${x} ${y} L${x + Math.cos(a0) * r * .7} ${y + Math.sin(a0) * r * .6} L${x + Math.cos(a1) * r * .7} ${y + Math.sin(a1) * r * .6}Z`} fill="#C9DDE6" stroke={SEP} strokeWidth={1.6} />
          {Array.from({ length: 5 }, (_, k) => <line key={k} x1={x + Math.cos(a0) * r * (.15 + k * .1)} y1={y + Math.sin(a0) * r * (.15 + k * .1)} x2={x + Math.cos(a1) * r * (.15 + k * .1)} y2={y + Math.sin(a1) * r * (.15 + k * .1)} stroke="#3A2418" strokeWidth={1.4} opacity={.7} />)}</g>; })}
      {crack > 0 && crack <= .5 && <g>
        <path d={`M${x - r * .6} ${y + r * .1} L${x - r * .1} ${y - r * .05} L${x + r * .2} ${y + r * .08} L${x + r * .62} ${y - r * .12}`} stroke="#FFFDF4" strokeWidth={3 + crack * 5} fill="none" pathLength={1} strokeDasharray={`${crack} 1`} />
        <path d={`M${x - r * .1} ${y - r * .05} L${x - r * .2} ${y - r * .45}`} stroke="#FFFDF4" strokeWidth={2 + crack * 3} fill="none" pathLength={1} strokeDasharray={`${cl(crack * 2 - 1)} 1`} />
        <circle cx={x - r * .1} cy={y - r * .05} r={r * .35 * crack} fill="url(#glowW)" opacity={.6 * (1 - crack * .5)} /></g>}
    </g>
    {heat > 0 && <g><path d={grain} fill="#D2643E" opacity={heat * .55} /><path d={grain} fill="none" stroke="#F7E3A0" strokeWidth={6} opacity={heat} filter="url(#b8)" /></g>}
    <circle cx={x} cy={y} r={r * 1.03} fill="none" stroke="#2B1D12" strokeWidth={r * .07} /><circle cx={x} cy={y} r={r * 1.1} fill="none" stroke="url(#gold)" strokeWidth={r * .06} />
    <Line d={`M${x - r * .08} ${y} H${x + r * .08} M${x} ${y - r * .08} V${y + r * .08}`} w={1} col="#F3E7CC" a={.5} />
  </g>;
};

// ================================================================ CLIFFS ROUND THE WORLD — a sweep of five small engraved outcrops on a strip of globe (Italy, Denmark,
// Spain, New Mexico, New Zealand — the places named only as dots), each with the same thin dark band; line 0..1 draws the vermilion line that
// joins them round the curve; pins 0..1 drops a red dot on each.
const WorldOutcrops: React.FC<{ x?: N; y?: N; draw?: N; line?: N; pins?: N; dust?: N; pop?: N; band?: N }> = ({ x = 960, y = 560, draw = 1, line = 0, pins = 0, dust = 0, pop = 5, band = 0 }) => {
  const P: Pt[] = [[260, 640], [620, 470], [960, 420], [1300, 470], [1660, 640]];
  return <g opacity={draw}>
    <NightWash x={-200} y={-200} w={2320} h={1480} seed="wo" top="#C9DDE6" bot="#EFE0C2" />
    <SR d={`M-200 1300 V${y + 200} Q${x} ${y - 360} 2120 ${y + 200} V1300Z`} mat="sea" t={.42} draw={draw} sw={2} hatch={0} />
    {[[200, 700, 260], [520, 520, 300], [880, 470, 220], [1240, 500, 320], [1560, 660, 300]].map(([cx, cy, w], i) => <SR key={i} d={`M${cx} ${cy + 40} Q${cx + w * .2} ${cy - 30} ${cx + w * .5} ${cy - 10} Q${cx + w * .8} ${cy - 40} ${cx + w} ${cy + 30} Q${cx + w * .6} ${cy + 80} ${cx} ${cy + 40}Z`} mat="land" t={.45} draw={draw} sw={1.2} />)}
    {P.map(([px, py], i) => { const s = (.6 + (i === 2 ? .2 : 0)) * cl(pop - i); return s <= 0 ? null : <g key={i} transform={`translate(${px} ${py - 40}) scale(${s})`}>
      <Floor x={0} y={6} rx={120} ry={10} a={.3} />
      {Array.from({ length: 7 }, (_, k) => <SR key={k} d={rect(-100 + k * 4, -150 + k * 22, 200 - k * 8, 22)} mat={k === 3 ? 'red' : k % 2 ? 'stone' : 'sand'} t={k === 3 ? .45 + .4 * band + .3 * (1 - band) * 0 : .3 + (k % 3) * .08} ang={0} draw={draw} sw={.9} hatch={0} />)}
      {Array.from({ length: 6 }, (_, k) => <Line key={'v' + k} d={`M${-90 + k * 36} -150 l6 150`} w={.7} a={.4} />)}
    </g>; })}
    {line > 0 && <path d={`M${P[0][0]} ${P[0][1] - 81} Q${P[1][0]} ${P[1][1] - 120} ${P[2][0]} ${P[2][1] - 104} T${P[4][0]} ${P[4][1] - 81}`} stroke="#B8432A" strokeWidth={5} fill="none" pathLength={1} strokeDasharray={`${line} 1`} strokeLinecap="round" />}
    {pins > 0 && P.map(([px, py], i) => <circle key={i} cx={px} cy={py - 81} r={10 * cl(pins * 5 - i)} fill="#B8432A" stroke={SEP} />)}
    {dust > 0 && <rect x={-200} y={-200} width={2320} height={1480} fill="#6A4430" opacity={dust * .45} />}
  </g>;
};

// ================================================================ THE YUCATÁN COAST (after M-01) — the peninsula's north shore seen from above: green jungle flat as a table,
// the turquoise Gulf, the curve of the coast, the little port at the centre; ring 0..1 lets the buried crater's rim show through as a faint
// arc of cenotes (the real ring of sinkholes); night 0..1.
const YucatanCoast: React.FC<{ x?: N; y?: N; s?: N; draw?: N; ring?: N; night?: N; port?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, ring = 0, night = 0, port = 1 }) => {
  // v2 (critic: "flat colour fields… a 3×3 grid for the village"): the coast as an engraved map-view — the Gulf hatched with wave lines, the
  // jungle as massed stippled tree-crowns, a sand beach, the port as a cluster of little roofed houses with a jetty
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, R = 360 * s;
  const coast = `M${X(-1600)} ${Y(-120)} C${X(-700)} ${Y(-60)} ${X(-300)} ${Y(-10)} ${X(0)} ${Y(-20)} C${X(320)} ${Y(-30)} ${X(700)} ${Y(-110)} ${X(1600)} ${Y(-200)}`;
  const crowns = useMemo(() => Array.from({ length: 260 }, (_, i) => [rnd(i) * 3200 - 1600, 30 + rnd(i + 3) * 900, 16 + rnd(i + 5) * 16] as [N, N, N]), []);
  return <g opacity={draw}>
    <SR d={rect(-400, -400, 2720, 2000)} mat="sea" t={.5} ang={0} draw={draw} sw={0} rim={false} />
    {Array.from({ length: 70 }, (_, i) => <path key={i} d={`M${-300 + rnd(i) * 2500} ${Y(-180 - rnd(i + 2) * 700)} q${12 * s} ${-6 * s} ${24 * s} 0 t${24 * s} 0`} stroke={SEP} strokeWidth={1} fill="none" opacity={.45} />)}
    <SR d={`${coast} L${X(1600)} ${Y(1400)} L${X(-1600)} ${Y(1400)}Z`} mat="forest" t={.5} ang={30} draw={draw} sw={2} />
    <path d={coast} stroke="#F0D9A8" strokeWidth={12 * s} fill="none" /><path d={coast} stroke={SEP} strokeWidth={1.6} fill="none" transform={`translate(0 ${6 * s})`} />
    {crowns.map(([u, v, r], i) => { const cx = X(u), cy = Y(v); return <g key={i}><circle cx={cx} cy={cy} r={r * s} fill={i % 3 ? '#4F7A4A' : '#5F8A5A'} stroke={SEP} strokeWidth={.8} /><path d={`M${cx - r * s * .5} ${cy + r * s * .2} q${r * s * .5} ${r * s * .4} ${r * s} 0`} stroke={SEP} strokeWidth={.8} fill="none" opacity={.6} /></g>; })}
    {ring > 0 && <g opacity={ring}>{Array.from({ length: 34 }, (_, i) => { const a = Math.PI * (.04 + i / 33 * .92), cx = X(0) + Math.cos(a) * R, cy = Y(-20) + Math.sin(a) * R * .8; return <g key={i}><circle cx={cx} cy={cy} r={(8 + rnd(i) * 6) * s} fill="#22507A" stroke={SEP} strokeWidth={1.4} /><path d={`M${cx - 5 * s} ${cy - 3 * s} q${5 * s} ${-4 * s} ${10 * s} 0`} stroke="#9CCAD6" strokeWidth={1.4} fill="none" /></g>; })}</g>}
    {port > 0 && <g opacity={port}><Line d={`M${X(0)} ${Y(-20)} v${-60 * s}`} w={4 * s} col="#8C5A36" />
      {Array.from({ length: 11 }, (_, i) => { const hx = X(-80 + (i % 4) * 44 + (i > 7 ? 20 : 0)), hy = Y(10 + Math.floor(i / 4) * 30); return <g key={i}><rect x={hx - 12 * s} y={hy - 8 * s} width={24 * s} height={16 * s} fill="#FBF4E2" stroke={SEP} strokeWidth={1} /><path d={`M${hx - 15 * s} ${hy - 8 * s} L${hx} ${hy - 20 * s} L${hx + 15 * s} ${hy - 8 * s}Z`} fill="#A8432A" stroke={SEP} strokeWidth={1} /></g>; })}</g>}
    {night > 0 && <rect x={-400} y={-400} width={2720} height={2000} fill="#141C38" opacity={night * .6} />}
  </g>;
};

// ================================================================ THE SEARCH — a brass-rimmed magnifier sliding over a terrestrial globe on its stand (look 0..1 moves the lens
// along its path; q 0..1 = small question marks over the oceans).
const SearchGlobe: React.FC<{ x?: N; y?: N; r?: N; draw?: N; look?: N; q?: N; spin?: N }> = ({ x = 960, y = 520, r = 320, draw = 1, look = 0, q = 0, spin = 0 }) => {
  const id = 'sgl' + Math.round(x), lx = x + Math.cos(look * Math.PI * 1.6 + 2) * r * .5, ly = y + Math.sin(look * Math.PI * 1.6 + 2) * r * .35;
  return <g opacity={draw}>
    <Floor x={x} y={y + r + 170} rx={r * .8} ry={22} a={.4} />
    <SR d={`M${x - 90} ${y + r + 170} L${x + 90} ${y + r + 170} L${x + 30} ${y + r + 90} L${x - 30} ${y + r + 90}Z`} mat="wood" t={.6} draw={draw} sw={1.4} />
    <Line d={`M${x} ${y + r + 90} V${y + r + 30}`} w={8} col="#4F3020" />
    <path d={`M${x - r - 30} ${y} A${r + 30} ${r + 30} 0 0 0 ${x + r + 30} ${y}`} stroke="url(#gold)" strokeWidth={12} fill="none" transform={`rotate(-23 ${x} ${y})`} />
    <defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <circle cx={x} cy={y} r={r} fill="#9CCAD6" stroke={SEP} strokeWidth={2} />
    <g clipPath={`url(#${id})`}>{[[-.4, -.35, .35, .3], [.15, -.1, .2, .4], [.55, -.4, .3, .25], [-.2, .45, .25, .2], [.6, .5, .15, .12]].map(([u, v, a, b], i) =>
      <SR key={i} d={ell(x + ((u + spin) % 1.6 - .2) * r, y + v * r, a * r, b * r)} mat="land" t={.5} draw={draw} sw={1.2} />)}
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${x - r} ${y - r + i * r / 3} Q${x} ${y - r + i * r / 3 + 30} ${x + r} ${y - r + i * r / 3}`} stroke={SEP} strokeWidth={.6} fill="none" opacity={.4} />)}</g>
    <Ink d={ell(x, y, r, r)} w={1.6} draw={draw} />
    {q > 0 && [[-.5, .1], [.3, .55], [.65, -.1]].map(([u, v], i) => <Hand key={i} x={x + u * r} y={y + v * r} s={52} t="?" col="#B8432A" a={cl(q * 3 - i)} />)}
    <g><circle cx={lx} cy={ly} r={110} fill="#FFFDF4" fillOpacity={.22} stroke="url(#gold)" strokeWidth={14} /><circle cx={lx} cy={ly} r={110} fill="none" stroke={SEP} strokeWidth={1.4} />
      <path d={`M${lx + 78} ${ly + 78} L${lx + 230} ${ly + 230}`} stroke="#4F3020" strokeWidth={26} strokeLinecap="round" />
      <path d={`M${lx - 60} ${ly - 70} q30 -20 70 -10`} stroke="#FFFDF4" strokeWidth={6} fill="none" opacity={.6} /></g>
  </g>;
};

// ================================================================ THE REPORT ON THE SHELF — a grey metal shelf of company binders in a records room; one bound report
// (with a typed label, no real logo) pulled out a little (pull 0..1); dust 0..1 lies on its top edge; blow 0..1 sends the dust off.
const ReportShelf: React.FC<{ x?: N; y?: N; s?: N; draw?: N; pull?: N; dust?: N; blow?: N; open?: N; lamp?: N; day?: N; lift?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, pull = 0, dust = 0, blow = 0, open = 0, lamp = 0, day = -1, lift: lf = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  const spines = Array.from({ length: 22 }, (_, i) => ({ i, w: 34 + rnd(i) * 22, m: ['night', 'stone', 'wall', 'tundra', 'sky'][i % 5], t: .45 + rnd(i + 3) * .3 }));
  let acc = -560;
  return <g opacity={draw}>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="tundra" t={.55} draw={draw} sw={0} hatch={0} rim={false} />
    {lamp > 0 && <circle cx={X(200)} cy={Y(-500)} r={700 * s} fill="url(#glowW)" opacity={.45 * lamp} />}
    {day >= 0 && (() => { const ph2 = day % 1, lit = Math.max(0, Math.sin(ph2 * Math.PI)), sx2 = -900 + ph2 * 1800;   // days and nights over the shelf: a window's light sweeps across, then dark
      return <g><path d={`M${X(sx2 - 120)} ${Y(-700)} L${X(sx2 + 120)} ${Y(-700)} L${X(sx2 + 260)} ${Y(700)} L${X(sx2 + 20)} ${Y(700)}Z`} fill="#F7E3A0" opacity={.35 * lit} />
        <rect x={-200} y={-200} width={2320} height={1480} fill="#141C38" opacity={.45 * (1 - lit)} /></g>; })()}
    {[-250, 80, 410].map(sy => <SR key={sy} d={rect(X(-620), Y(sy), 1240 * s, 22 * s)} mat="tundra" t={.8} ang={0} draw={draw} sw={1.4} />)}
    {[-620, 600].map(px => <SR key={px} d={rect(X(px), Y(-560), 20 * s, 1000 * s)} mat="tundra" t={.85} draw={draw} sw={1.2} />)}
    {[-250, 80, 410].map((sy, row) => { acc = -590; return spines.map(sp => { const bx = acc; acc += sp.w + 2; if (acc > 590) return null; const isR = row === 1 && sp.i === 9;
      const dx = isR ? pull * 140 : 0, h = 250 - (sp.i % 3) * 18;
      return <g key={row + '_' + sp.i} transform={`translate(0 ${isR ? pull * 30 * s : 0})`}>
        <SR d={rect(X(bx + dx * .2), Y(sy - h), sp.w * s, h * s)} mat={isR ? 'cloth' : sp.m} t={isR ? .3 : sp.t} ang={90} draw={draw} sw={1} hatch={isR ? 0 : undefined} />
        <rect x={X(bx + dx * .2 + 6)} y={Y(sy - h + 30)} width={(sp.w - 12) * s} height={40 * s} fill="#FBF4E2" opacity={.85} />
        {isR && <g><text x={X(bx + dx * .2 + sp.w / 2)} y={Y(sy - h + 120)} fontSize={18 * s} fontFamily="'Special Elite', monospace" fill={SEP} textAnchor="middle" transform={`rotate(-90 ${X(bx + dx * .2 + sp.w / 2)} ${Y(sy - h + 120)})`}>1978 · YUCATÁN</text>
          {dust > 0 && <g transform={`translate(${blow * 240 * s} ${-blow * 120 * s})`} opacity={dust * (1 - blow)}><path d={`M${X(bx)} ${Y(sy - h)} q${sp.w * s / 2} ${-14 * s * dust} ${sp.w * s} 0Z`} fill="#C9AE84" />
            {Array.from({ length: 24 }, (_, k) => <circle key={k} cx={X(bx + rnd(k) * sp.w + blow * rnd(k + 3) * 120)} cy={Y(sy - h - 6 - blow * rnd(k + 7) * 160)} r={2} fill="#8C6E4A" />)}</g>}</g>}
      </g>; }); })}
    {open > 0 && <g opacity={open}><SR d={rect(X(-380), Y(-220), 760 * s, 500 * s)} mat="paper" t={.12} draw={draw} sw={2} hatch={0} />
      <Ink d={`M${x} ${Y(-220)} V${Y(280)}`} w={1.4} draw={draw} />
      {Array.from({ length: 12 }, (_, k) => <Line key={k} d={`M${X(-340)} ${Y(-170 + k * 30)} h${(260 - (k % 4) * 30) * s}`} w={1.2} a={.45} />)}
      <path d={`M${X(60)} ${Y(180)} A${200 * s} ${180 * s} 0 0 1 ${X(340)} ${Y(-80)}`} stroke="#B8432A" strokeWidth={4} fill="none" pathLength={1} strokeDasharray={`${open} 1`} transform={lf ? `translate(${-lf * 200 * s} ${-lf * 60 * s}) scale(${1 + lf * .8})` : undefined} style={{ transformOrigin: `${X(200)}px ${Y(50)}px` }} />
      {lf > 0 && <path d={`M${X(340)} ${Y(-80)} A${200 * s} ${180 * s} 0 0 1 ${X(60)} ${Y(180)}`} stroke="#B8432A" strokeWidth={4} fill="none" pathLength={1} strokeDasharray={`${lf} 1`} transform={`translate(${-lf * 200 * s} ${-lf * 60 * s}) scale(${1 + lf * .8})`} style={{ transformOrigin: `${X(200)}px ${Y(50)}px` }} />}
      <Hand x={X(200)} y={Y(240)} s={30 * s} t="half a ring?" col="#B8432A" a={open} /></g>}
  </g>;
};

// ================================================================ THE SURVEY PLANE — a twin-engined survey aircraft of the 1970s, high wing, a long tail "stinger" carrying
// the magnetometer; seen from above-behind; prop 0..1 spins the blur; it flies along its heading.
const SurveyPlane: React.FC<{ x?: N; y?: N; s?: N; draw?: N; rot?: N; prop?: N; trail?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, rot = 0, prop = 0, trail = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw} transform={`rotate(${rot} ${x} ${y})`}>
    {trail > 0 && <path d={`M${X(-180)} ${Y(0)} H${X(-180 - 1400 * trail)}`} stroke="#B8432A" strokeWidth={3} strokeDasharray="14 10" opacity={.85} />}
    <ellipse cx={X(30)} cy={Y(70)} rx={180 * s} ry={30 * s} fill={SEP} opacity={.18} filter="url(#b8)" />
    <SR d={`M${X(-170)} ${Y(-6)} L${X(-60)} ${Y(-14)} C${X(60)} ${Y(-20)} ${X(140)} ${Y(-14)} ${X(170)} ${Y(0)} C${X(140)} ${Y(14)} ${X(60)} ${Y(20)} ${X(-60)} ${Y(14)} L${X(-170)} ${Y(6)}Z`} mat="ice" t={.4} ang={0} draw={draw} sw={1.6} />
    <SR d={`M${X(10)} ${Y(-14)} L${X(-10)} ${Y(-200)} L${X(40)} ${Y(-200)} L${X(60)} ${Y(-14)}Z M${X(10)} ${Y(14)} L${X(-10)} ${Y(200)} L${X(40)} ${Y(200)} L${X(60)} ${Y(14)}Z`} mat="ice" t={.5} ang={90} draw={draw} sw={1.5} />
    <SR d={`M${X(-150)} ${Y(-4)} L${X(-170)} ${Y(-70)} L${X(-140)} ${Y(-70)} L${X(-120)} ${Y(-4)}Z M${X(-150)} ${Y(4)} L${X(-170)} ${Y(70)} L${X(-140)} ${Y(70)} L${X(-120)} ${Y(4)}Z`} mat="ice" t={.5} draw={draw} sw={1.2} />
    <Line d={`M${X(-170)} ${Y(0)} H${X(-240)}`} w={5 * s} col="#3A2418" /><circle cx={X(-244)} cy={Y(0)} r={7 * s} fill="#3A2418" />
    {[-90, 90].map(k => <g key={k}><SR d={rr(X(30), Y(k - 14), 80 * s, 28 * s, 10 * s)} mat="stone" t={.55} draw={draw} sw={1.2} />
      <ellipse cx={X(114)} cy={Y(k)} rx={6 * s} ry={42 * s} fill={SEP} opacity={.25 + prop * .2} /></g>)}
    <path d={`M${X(110)} ${Y(-6)} q${30 * s} ${6 * s} 0 ${12 * s}`} fill="#22507A" opacity={.8} />
    <Line d={`M${X(-120)} ${Y(-3)} H${X(140)}`} w={2} col="#B8432A" a={.8} />
  </g>;
};

// ================================================================ THE SURVEY DRAWS A RING (v8 device) — a gravity / magnetic survey sheet: wavy contour lines inked by the
// plane's passes (pass 0..1) that bunch and close into HALF a ring on land; sea 0..1 adds the other half under the Gulf; whole 0..1 the
// circle closes in vermilion; the coast line crosses it. When over the coast (coast 0..1) the sheet becomes transparent over YucatanCoast.
const SurveyRing: React.FC<{ x?: N; y?: N; R?: N; draw?: N; pas?: N; sea?: N; whole?: N; sheet?: N; scale?: N }> = ({ x = 960, y = 520, R = 340, draw = 1, pas = 1, sea = 0, whole = 0, sheet = 1, scale = 0 }) => {
  const rings = [1.35, 1.18, 1.0, .82, .6, .38];
  const arc = (k: N, a0: N, a1: N, wob: N) => { const pts: string[] = []; for (let i = 0; i <= 40; i++) { const a = a0 + (a1 - a0) * i / 40, r = R * k * (1 + Math.sin(a * 7 + k * 5) * wob); pts.push(`${f1(x + Math.cos(a) * r)} ${f1(y + Math.sin(a) * r * .86)}`); } return 'M' + pts.join(' L'); };
  return <g opacity={draw}>
    {sheet > 0 && <g opacity={sheet}><SR d={rect(x - R * 1.9, y - R * 1.35, R * 3.8, R * 2.7)} mat="paper" t={.08} draw={draw} sw={1.6} hatch={0} />
      {Array.from({ length: 13 }, (_, i) => <Line key={i} d={`M${x - R * 1.9} ${y - R * 1.35 + i * R * .225} H${x + R * 1.9}`} w={.5} col="#7FA8C4" a={.5} />)}
      {Array.from({ length: 17 }, (_, i) => <Line key={'v' + i} d={`M${x - R * 1.9 + i * R * .2375} ${y - R * 1.35} V${y + R * 1.35}`} w={.5} col="#7FA8C4" a={.5} />)}
      <path d={`M${x - R * 1.9} ${y - R * .06} C${x - R} ${y} ${x - R * .3} ${y + R * .05} ${x} ${y} C${x + R * .4} ${y - R * .02} ${x + R} ${y - R * .2} ${x + R * 1.9} ${y - R * .4}`} stroke={SEP} strokeWidth={3} fill="none" strokeDasharray="12 6" /></g>}
    {/* land half: below the coast (angles 0..π) */}
    {rings.map((k, i) => <path key={'l' + i} d={arc(k, .08, Math.PI - .08, .02 * (1 - pas))} stroke={i === 2 ? '#B8432A' : SEP} strokeWidth={i === 2 ? 4 : 1.6} fill="none" pathLength={1} strokeDasharray={`${cl(pas * 1.4 - i * .08)} 1`} />)}
    {sea > 0 && rings.map((k, i) => <path key={'s' + i} d={arc(k, Math.PI + .08, 2 * Math.PI - .08, .02)} stroke={i === 2 ? '#B8432A' : '#22507A'} strokeWidth={i === 2 ? 4 : 1.6} fill="none" pathLength={1} strokeDasharray={`${cl(sea * 1.4 - i * .08)} 1`} opacity={.9} />)}
    {whole > 0 && <ellipse cx={x} cy={y} rx={R} ry={R * .86} stroke="#B8432A" strokeWidth={9} fill="none" pathLength={1} strokeDasharray={`${whole} 1`} filter="url(#boil)" />}
    {scale > 0 && <g opacity={scale}><Line d={`M${x - R} ${y + R * 1.05} H${x + R}`} w={3} col={SEP} /><Line d={`M${x - R} ${y + R * 1.0} v${R * .1} M${x + R} ${y + R * 1.0} v${R * .1}`} w={3} />
      <text x={x} y={y + R * 1.05 + 56} fontSize={44} fontFamily="'Special Elite', monospace" fill={SEP} textAnchor="middle">≈ 180 km</text></g>}
  </g>;
};

// ================================================================ THE MEETING HALL, 1981 — a big conference room: rows of chair backs seen from behind, a projection screen
// with the half ring, a poster board; empty 0..1 empties the seats one by one (no one is listening); light 0..1 = projector beam.
const ConferenceHall: React.FC<{ x?: N; y?: N; s?: N; draw?: N; empty?: N; beam?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, empty = 0, beam = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="wall" t={.55} draw={draw} sw={0} hatch={0} rim={false} />
    <SR d={rect(X(-420), Y(-460), 840 * s, 480 * s)} mat="paper" t={.05} draw={draw} sw={1.6} hatch={0} />
    <defs><clipPath id="chscr"><rect x={X(-420)} y={Y(-460)} width={840 * s} height={480 * s} /></clipPath></defs>
    <g clipPath="url(#chscr)"><path d={`M${X(-200)} ${Y(-140)} A${200 * s} ${170 * s} 0 0 0 ${X(200)} ${Y(-140)}`} stroke="#B8432A" strokeWidth={5} fill="none" />
    {[150, 120, 90].map((r, i) => <path key={i} d={`M${X(-r)} ${Y(-140)} A${r * s} ${r * .85 * s} 0 0 0 ${X(r)} ${Y(-140)}`} stroke={SEP} strokeWidth={1.4} fill="none" />)}</g>
    <Line d={`M${X(-400)} ${Y(-150)} Q${x} ${Y(-130)} ${X(400)} ${Y(-180)}`} w={2} />
    {beam > 0 && <path d={`M${X(-420)} ${Y(-460)} L${X(420)} ${Y(-460)} L${X(60)} ${Y(500)} L${X(20)} ${Y(500)}Z`} fill="#FFFDF4" opacity={.07 * beam} />}
    {Array.from({ length: 4 }, (_, row) => Array.from({ length: 10 }, (_, c) => { const idx = row * 10 + c, gone = rnd(idx * 1.7) < empty, cx = X(-720 + c * 160 + (row % 2) * 30), cy = Y(160 + row * 120), sc = 1 + row * .25;
      return <g key={idx}><SR d={rr(cx - 50 * sc * s, cy - 40 * sc * s, 100 * sc * s, 90 * sc * s, 10 * s)} mat="wall" t={.75} draw={draw} sw={1.2} />
        {!gone && <g><SR d={ell(cx, cy - 64 * sc * s, 24 * sc * s, 28 * sc * s)} mat={rnd(idx) > .5 ? 'wood' : 'night'} t={.7} draw={draw} sw={1} /><SR d={`M${cx - 44 * sc * s} ${cy - 30 * sc * s} Q${cx} ${cy - 54 * sc * s} ${cx + 44 * sc * s} ${cy - 30 * sc * s} V${cy - 10 * sc * s} H${cx - 44 * sc * s}Z`} mat={['night', 'stone', 'cloth'][idx % 3]} t={.6} draw={draw} sw={1} /></g>}</g>; }))}
  </g>;
};

// ================================================================ THE DRILL CORE — a long wooden core box with cylinders of grey rock, numbered, opened (lid 0..1 lifts); one
// core rolled forward (roll 0..1); its broken end shows a breccia of angular fragments (melt, shocked bits).
const DrillCore: React.FC<{ x?: N; y?: N; s?: N; draw?: N; lid?: N; roll?: N; lamp?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, lid = 1, roll = 0, lamp = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="wood" t={.8} draw={draw} sw={0} hatch={0} rim={false} />
    {lamp > 0 && <circle cx={X(0)} cy={Y(-80)} r={760 * s} fill="url(#glowW)" opacity={.5 * lamp} />}
    <Floor x={x} y={Y(260)} rx={760 * s} ry={30 * s} a={.45} />
    <SR d={rect(X(-720), Y(-220), 1440 * s, 460 * s)} mat="wood" t={.5} ang={0} draw={draw} sw={2} />
    {[0, 1, 2, 3].map(r => <g key={r}>
      <SR d={rect(X(-690), Y(-200 + r * 110), 1380 * s, 96 * s)} mat="wood" t={.72} ang={0} draw={draw} sw={1} hatch={0} />
      {Array.from({ length: 5 }, (_, k) => { const cx0 = X(-680 + k * 276), w = (250 - rnd(r * 5 + k) * 40) * s;
        return <g key={k} transform={r === 1 && k === 2 ? `translate(0 ${roll * 230 * s})` : undefined}><SR d={rr(cx0, Y(-190 + r * 110), w, 76 * s, 30 * s)} mat={r === 1 && k === 2 ? 'tundra' : 'stone'} t={.55 + rnd(k + r) * .15} ang={0} draw={draw} sw={1.3} />
          <path d={`M${cx0 + 10} ${Y(-178 + r * 110)} H${cx0 + w - 20}`} stroke="#FFFDF4" strokeWidth={5} opacity={.35} />
          {Array.from({ length: 10 }, (_, j) => <path key={j} d={`M${cx0 + rnd(j + k) * w} ${Y(-180 + r * 110) + rnd(j * 2 + r) * 60 * s} l${8 * s} ${-6 * s} l${6 * s} ${10 * s}Z`} fill={j % 3 ? '#76725E' : '#C9C2A6'} stroke={SEP} strokeWidth={.6} />)}</g>; })}
      <text x={X(-706)} y={Y(-142 + r * 110)} fontSize={20 * s} fontFamily="'Special Elite', monospace" fill={SEP} textAnchor="end">{`${1 + r}`}</text>
    </g>)}
    <g transform={`translate(0 ${-(lid) * 520 * s}) `} opacity={1 - lid * .7}><SR d={rect(X(-730), Y(-230), 1460 * s, 40 * s)} mat="wood" t={.45} ang={0} draw={draw} sw={1.6} /></g>
  </g>;
};

// ================================================================ THE VILLAGE SIGN — a painted roadside sign on two posts under a palm, a white-washed wall, the Gulf
// beyond. The name is written by the text entity, not here (so it can be stamped).
const VillageSign: React.FC<{ x?: N; y?: N; s?: N; draw?: N; sun?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, sun = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <EngSky x={-200} y={-200} w={2320} h={Y(80) + 200} col="#C9DDE6" /><circle cx={X(600)} cy={Y(-380)} r={70} fill="#F7E3A0" opacity={sun} />
    <EngSky x={-200} y={Y(80)} w={2320} h={80} col="#4A88AE" water />
    <SR d={rect(-200, Y(150), 2320, 900)} mat="sand" t={.3} ang={0} draw={draw} sw={1} hatch={0} />
    <SR d={rect(X(-900), Y(20), 520 * s, 230 * s)} mat="ice" t={.3} ang={0} draw={draw} sw={1.4} />
    <SR d={rect(X(-860), Y(80), 70 * s, 110 * s)} mat="sea" t={.5} draw={draw} sw={1} />
    <Line d={`M${X(560)} ${Y(320)} C${X(540)} ${Y(100)} ${X(580)} ${Y(-80)} ${X(620)} ${Y(-260)}`} w={16 * s} col="#8C5A36" />
    {Array.from({ length: 8 }, (_, i) => { const a = -Math.PI + i * Math.PI / 7; return <path key={i} d={`M${X(620)} ${Y(-260)} Q${X(620 + Math.cos(a) * 140)} ${Y(-330 + Math.sin(a) * 40)} ${X(620 + Math.cos(a) * 260)} ${Y(-200 + Math.abs(Math.cos(a)) * 60)}`} stroke="#4F7A4A" strokeWidth={14} fill="none" />; })}
    {[-260, 260].map(k => <SR key={k} d={rect(X(k - 12), Y(-160), 24 * s, 480 * s)} mat="wood" t={.65} draw={draw} sw={1.2} />)}
    <SR d={rect(X(-380), Y(-300), 760 * s, 210 * s)} mat="paper" t={.15} ang={0} draw={draw} sw={2.4} hatch={0} />
    <rect x={X(-360)} y={Y(-280)} width={720 * s} height={170 * s} fill="none" stroke="#22507A" strokeWidth={6} />
    <Floor x={x} y={Y(330)} rx={360 * s} ry={18 * s} a={.35} />
  </g>;
};

// ================================================================ THE IMPACT (v2, engraved — critic: "pixelated orange blocks… no ink line") — the Gulf from high above at
// night as an engraved plate: the curve of the sea and the coast hatched, the strike as radiating ink rays round a cream disc (flash), the
// shock rings as inked waves (ring), the plume as an engraved cumulus of hatched billows climbing out of the bowl (plume), the sky darkening.
const ImpactRings: React.FC<{ x?: N; y?: N; draw?: N; flash?: N; ring?: N; plume?: N; dark?: N }> = ({ x = 960, y = 620, draw = 1, flash = 0, ring = 0, plume = 0, dark = 0 }) => {
  const st = useMemo(() => Array.from({ length: 90 }, (_, i) => [rnd(i) * 2300 - 190, rnd(i + 9) * (y - 160) - 180, .6 + rnd(i + 4) * 1.6] as [N, N, N]), [y]);
  return <g opacity={draw}>
    <NightWash x={-200} y={-200} w={2320} h={1480} seed="impn" top="#0B1030" bot="#2B3B66" />
    {st.map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r} a={.75 * (1 - dark)} />)}
    <SR d={`M-200 1300 V${y - 120} Q${x} ${y - 340} 2120 ${y - 120} V1300Z`} mat="sea" t={.62} ang={0} draw={draw} sw={2} />
    <path d={`M-200 ${y - 120} Q${x} ${y - 340} 2120 ${y - 120}`} stroke="#C9DDE6" strokeWidth={4} fill="none" opacity={.7} />
    <SR d={`M-200 1300 V${y + 40} C200 ${y - 10} 600 ${y + 30} ${x} ${y} C1300 ${y - 20} 1700 ${y + 40} 2120 ${y + 10} V1300Z`} mat="forest" t={.6} ang={20} draw={draw} sw={2} />
    {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M${-150 + rnd(i) * 2200} ${y + 60 + rnd(i + 2) * 400} q8 -10 16 0`} stroke={SEP} strokeWidth={1} fill="none" opacity={.5} />)}
    {/* the shock rings: inked waves with a pale crest, spreading over sea and land */}
    {ring > 0 && [0, .18, .36, .54].map((d0, i) => { const k = cl((ring - d0) / .5); if (k <= 0) return null; const rx = k * 1100, ry = k * 300;
      return <g key={i} opacity={1 - k * .6}><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={SEP} strokeWidth={3 + (1 - k) * 6} />
        <ellipse cx={x} cy={y - 4} rx={rx * .985} ry={ry * .97} fill="none" stroke="#F3E7CC" strokeWidth={2} opacity={.8} />
        {Array.from({ length: 36 }, (_, j) => { const an = j / 36 * Math.PI * 2; return <line key={j} x1={x + Math.cos(an) * rx * .96} y1={y + Math.sin(an) * ry * .96} x2={x + Math.cos(an) * rx * 1.03} y2={y + Math.sin(an) * ry * 1.03} stroke={SEP} strokeWidth={1} />; })}</g>; })}
    {/* the bowl */}
    {(ring > 0 || flash > 0) && <g><SR d={ell(x, y + 6, 90, 26)} mat="night" t={.85} draw={draw} sw={2} /><ellipse cx={x} cy={y + 2} rx={70} ry={18} fill="#D2643E" opacity={.6 * Math.max(flash, cl(1 - ring))} /></g>}
    {/* the plume: engraved billows climbing */}
    {plume > 0 && Array.from({ length: 16 }, (_, i) => { const u = i / 15, h = plume * (120 + u * 520), wob = Math.sin(i * 2.3) * 120 * u, r = (50 + u * 110) * (.4 + plume * .6);
      return <SR key={i} d={ell(x + wob, y - h, r, r * .72)} mat={u < .3 ? 'red' : 'stone'} t={u < .3 ? .55 : .62 - u * .2} ang={30 + i * 15} draw={draw} sw={1.6} />; })}
    {plume > 0 && Array.from({ length: 22 }, (_, i) => { const an = -Math.PI / 2 + (rnd(i) - .5) * 2.4, L2 = plume * (180 + rnd(i + 3) * 420); return <path key={'e' + i} d={`M${x} ${y} Q${x + Math.cos(an) * L2 * .5} ${y + Math.sin(an) * L2 * .8} ${x + Math.cos(an) * L2} ${y + Math.sin(an) * L2 * .6 + 80}`} stroke={i % 3 ? SEP : '#8C3424'} strokeWidth={1.4} fill="none" opacity={.75} />; })}
    {/* the flash: a cream disc ringed by engraved rays */}
    {flash > 0 && <g opacity={flash}><circle cx={x} cy={y} r={60 + flash * 160} fill="#FBF4E2" stroke={SEP} strokeWidth={1.4} />
      {Array.from({ length: 64 }, (_, i) => { const an = i / 64 * Math.PI * 2, r0 = 70 + flash * 170, r1 = r0 + 80 + (i % 3) * 90 * flash; return <line key={i} x1={x + Math.cos(an) * r0} y1={y + Math.sin(an) * r0 * .7} x2={x + Math.cos(an) * r1} y2={y + Math.sin(an) * r1 * .7} stroke={SEP} strokeWidth={i % 2 ? 1 : 2} />; })}</g>}
    {dark > 0 && <rect x={-200} y={-200} width={2320} height={1480} fill="#1A120B" opacity={dark * .6} />}
  </g>;
};

// ================================================================ THE FOOD CHAIN — an iron chain hung across the page whose links are engraved medallions: the sun, a fern,
// a plant-eater (a horned dinosaur's head), the meat-eater (the theropod's head); dim 0..1 darkens the sun; snap 0..1 breaks the chain at the
// fern link and the links fall away one by one.
const FoodChain: React.FC<{ x?: N; y?: N; draw?: N; dim?: N; snap?: N; keep?: N }> = ({ x = 960, y = 470, draw = 1, dim = 0, snap = 0, keep = 0 }) => {
  const L = [{ k: 'sun' }, { k: 'fern' }, { k: 'horn' }, { k: 'rex' }];
  return <g opacity={draw}>
    {L.map((l, i) => { const cx = x - 600 + i * 400, fall = i >= 1 ? cl(snap * 2.2 - (i - 1) * .35) : 0, dy = fall * fall * 900, rot = fall * (i % 2 ? 40 : -30);
      return <g key={i} transform={`translate(0 ${dy}) rotate(${rot} ${cx} ${y})`} opacity={1 - fall * .6}>
        {i < 3 && <ellipse cx={cx + 200} cy={y} rx={95} ry={40} fill="none" stroke="#3A2418" strokeWidth={16} opacity={i === 0 && snap > .05 ? 0 : 1} />}
        <circle cx={cx} cy={y} r={150} fill="#FBF4E2" stroke="url(#gold)" strokeWidth={20} />
        <circle cx={cx} cy={y} r={150} fill="none" stroke={SEP} strokeWidth={1.6} />
        {l.k === 'sun' && <g><circle cx={cx} cy={y} r={60} fill="#E9B456" stroke={SEP} strokeWidth={1.4} />{Array.from({ length: 16 }, (_, j) => { const a = j / 16 * Math.PI * 2; return <Line key={j} d={`M${cx + Math.cos(a) * 72} ${y + Math.sin(a) * 72} L${cx + Math.cos(a) * 110} ${y + Math.sin(a) * 110}`} w={3} col="#B8862B" />; })}
          {dim > 0 && <circle cx={cx} cy={y} r={140} fill="#2B1D12" opacity={dim * .75} />}</g>}
        {l.k === 'fern' && <g><Line d={`M${cx} ${y + 100} Q${cx - 10} ${y} ${cx + 10} ${y - 100}`} w={4} col="#2F5440" />{Array.from({ length: 9 }, (_, j) => <path key={j} d={`M${cx - 4 + j * 1.5} ${y + 80 - j * 20} q${(j % 2 ? 1 : -1) * 70} -10 ${(j % 2 ? 1 : -1) * 80} 20`} stroke="#4F7A4A" strokeWidth={6} fill="none" />)}</g>}
        {l.k === 'horn' && <g><SR d={`M${cx - 90} ${y + 30} C${cx - 80} ${y - 40} ${cx - 10} ${y - 90} ${cx + 60} ${y - 70} L${cx + 100} ${y - 20} L${cx + 70} ${y + 40} L${cx - 40} ${y + 60}Z`} mat="land" t={.6} draw={draw} sw={1.4} />
          <path d={`M${cx + 20} ${y - 74} l10 -60 l14 58 M${cx + 80} ${y - 40} l40 -24 l-24 40`} fill="#FBF4E2" stroke={SEP} strokeWidth={1.4} /><circle cx={cx + 30} cy={y - 30} r={6} fill={SEP} /></g>}
        {l.k === 'rex' && <g><SR d={`M${cx - 100} ${y - 40} C${cx - 40} ${y - 80} ${cx + 60} ${y - 70} ${cx + 110} ${y - 30} L${cx + 100} ${y + 10} L${cx - 20} ${y + 20} L${cx - 30} ${y + 50} L${cx - 100} ${y + 30}Z`} mat="land" t={.7} draw={draw} sw={1.4} />
          {Array.from({ length: 8 }, (_, j) => <path key={j} d={`M${cx - 10 + j * 14} ${y + 12} l4 9 l4 -9`} fill="#FBF4E2" stroke={SEP} strokeWidth={.8} />)}<circle cx={cx - 40} cy={y - 40} r={6} fill={SEP} /></g>}
      </g>; })}
    {keep > 0 && <circle cx={x - 600} cy={y} r={190} fill="url(#glowW)" opacity={keep * .5} />}
  </g>;
};

// ================================================================ THE BURROW — a cut-away of the ground: grass and ash above, a tunnel and a nest chamber where a small
// furry mammal (shrew-sized, long snout, whiskers, bright eye) curls with two young; ash 0..1 settles on the surface; peek 0..1 brings its head up.
const Burrow: React.FC<{ x?: N; y?: N; s?: N; draw?: N; ash?: N; peek?: N; eye?: N; tm?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, ash = 0, peek = 0, eye = 1, tm: t = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <EngSky x={-200} y={-200} w={2320} h={Y(-300) + 200} col={ash > .5 ? '#8C7A62' : '#C9DDE6'} />
    <SR d={rect(-200, Y(-300), 2320, 1500)} mat="wall" t={.45} ang={0} draw={draw} sw={1.6} />
    <Stipple x={-200} y={Y(-300)} w={2320} h={1000} n={1800} seed="bur" a={.4} />
    {Array.from({ length: 40 }, (_, i) => <Line key={i} d={`M${-150 + i * 60} ${Y(-300)} l${(i % 2 ? 6 : -6)} ${-26 - rnd(i) * 30}`} w={3} col={ash > .4 ? '#76725E' : '#4F7A4A'} />)}
    {ash > 0 && <rect x={-200} y={Y(-320)} width={2320} height={24 * ash} fill="#B3AFA4" />}
    <path d={`M${X(500)} ${Y(-300)} C${X(420)} ${Y(-180)} ${X(300)} ${Y(-80)} ${X(160)} ${Y(-20)} L${X(140)} ${Y(30)} C${X(300)} ${Y(-40)} ${X(460)} ${Y(-160)} ${X(560)} ${Y(-300)}Z`} fill="#2B1D12" opacity={.85} />
    <ellipse cx={X(0)} cy={Y(60)} rx={220 * s} ry={110 * s} fill="#2B1D12" opacity={.9} />
    <ellipse cx={X(0)} cy={Y(120)} rx={190 * s} ry={40 * s} fill="#8C6E4A" opacity={.8} />
    {/* the young asleep, curled; the mother lifting her head toward the light at the tunnel (engine v9 SmallMammal) */}
    <SmallMammal id="bu1" x={X(-60)} y={Y(130)} s={1.1 * s} curl={1} t={t} col="#7A5A3E" />
    <SmallMammal id="bu2" x={X(-130)} y={Y(132)} s={1.0 * s} curl={1} t={t + .4} col="#8C6A48" flip={-1} />
    <SmallMammal id="bu0" x={X(60)} y={Y(132)} s={1.9 * s} curl={0} look={peek} sniff={peek} t={t} eye={eye} col="#6A4A30" />
  </g>;
};

// ================================================================ THE SPARROW (engine v9 anatomy) — a male house sparrow (Passer domesticus), drawn from the plate
// (Commons "Passer domesticus") and field-guide anatomy: a compact body on a short neck, a round head with a GREY crown, CHESTNUT from the eye
// round the nape, a pale grey cheek, a BLACK bib, a thick conical seed-eater's bill, a streaked brown back, folded wings (chestnut coverts with
// one white bar, dark primaries with pale edges), a notched tail of separate feathers, thin pink-brown legs with three toes forward, one back.
// Moves: head = tilt/turn, sing = bill opens, wing 0..1 = the wing opens (feather by feather), hop = a little jump, bob = the head bob of a
// perching bird (loop with t). Units: ~1 = 1 mm × s (a 150-mm bird).
const Sparrow: React.FC<{ x?: N; y?: N; s?: N; draw?: N; head?: N; sing?: N; wing?: N; flip?: N; hop?: N; tm?: N; id?: string }> = ({ x = 960, y = 600, s = 1, draw = 1, head = 0, sing = 0, wing = 0, flip = 1, hop = 0, tm: t = 0, id = 'spw' }) => {
  const lift = Math.sin(Math.min(1, hop) * Math.PI) * 30;
  const T = (p: PP): PP => [x + p[0] * s * flip, y + (p[1] + 12 - lift) * s], TL = (p: PP): PP => [x + p[0] * s * flip, y + (p[1] - lift) * s];
  const bob = Math.sin(t * 5) * 1.2, hA = deg(head * -22 + bob);
  const HB: PP = [50, -98], HR = (p: PP): PP => { const dx = p[0] - HB[0], dy = p[1] - HB[1]; return T([HB[0] + dx * Math.cos(hA) - dy * Math.sin(hA), HB[1] + dx * Math.sin(hA) + dy * Math.cos(hA)]); };
  const W = (J: Joint[]) => J.map(j => ({ p: T(j.p), up: j.up * s * (flip < 0 ? 1 : 1), dn: j.dn * s }));
  const body: Joint[] = [{ p: [-52, -50], up: 6, dn: 6 }, { p: [-30, -60], up: 18, dn: 20 }, { p: [0, -68], up: 24, dn: 30 }, { p: [26, -74], up: 22, dn: 28 }, { p: [42, -88], up: 15, dn: 17 }, { p: [50, -98], up: 14, dn: 14 }];
  const headJ: Joint[] = [{ p: [40, -98], up: 15, dn: 15 }, { p: [54, -104], up: 22, dn: 19 }, { p: [68, -104], up: 18, dn: 15 }, { p: [77, -101], up: 8, dn: 8 }];
  const bodyW = W(body), headW = headJ.map(j => ({ p: HR(j.p), up: j.up * s, dn: j.dn * s }));
  if (flip < 0) { bodyW.forEach(j => { const u = j.up; j.up = j.dn; j.dn = u; }); headW.forEach(j => { const u = j.up; j.up = j.dn; j.dn = u; }); }
  const { d: bodyD } = skinOutline(bodyW), { d: headD } = skinOutline(headW);
  const cid = id + 'c' + Math.round(x), P = (q: PP) => `${f1(q[0])} ${f1(q[1])}`;
  const feather = (root: PP, len: N, ang: N, wdt: N, col: string, edge = '#E8D6B0', k = 0) => { const a = deg(ang), tip: PP = [root[0] + Math.cos(a) * len, root[1] + Math.sin(a) * len], n: PP = [-Math.sin(a) * wdt, Math.cos(a) * wdt];
    const A = T(root), B = T(tip), C = T([root[0] + n[0], root[1] + n[1]]), D = T([tip[0] + n[0] * .3, tip[1] + n[1] * .3]);
    return <g key={k}><path d={`M${P(A)} Q${P(C)} ${P(D)} L${P(B)}Z`} fill={col} stroke={SEP} strokeWidth={.9} /><path d={`M${P(A)} L${P(B)}`} stroke={edge} strokeWidth={.8} opacity={.8} /></g>; };
  // the wing: coverts (chestnut, a white bar), then primaries; opening rotates each feather up about the shoulder
  const sh: PP = [30, -80], open = wing;
  const prim = Array.from({ length: 7 }, (_, i) => feather([sh[0] - 14, sh[1] + 4], 66 - i * 4, 166 - i * 1.5 - open * (70 + i * 12), 9, i < 3 ? '#4F3020' : '#6A4430', '#E8D6B0', i));
  const legs = [[-2, -24], [10, -24]].map(([lx, ly], i) => { const k = TL([lx, ly]), f = TL([lx + 3, 0]); return <g key={'l' + i}><path d={`M${P(k)} L${P(f)}`} stroke="#B07A5A" strokeWidth={2.4 * s} strokeLinecap="round" />
    {[-14, 0, 12].map(dx => <path key={dx} d={`M${P(f)} L${P(TL([lx + 3 + dx, dx === 0 ? 1 : 0]))}`} stroke="#B07A5A" strokeWidth={1.6 * s} strokeLinecap="round" />)}</g>; });
  return <g opacity={draw}>
    <ellipse cx={x} cy={y + 2} rx={44 * s} ry={5 * s} fill={SEP} opacity={.25 * (1 - lift / 40)} filter="url(#b8)" />
    {legs}
    {/* tail: separate feathers, notched */}
    {[0, 1, 2, 3, 4].map(i => feather([-48, -52], 54 - Math.abs(i - 2) * 3, 170 + (i - 2) * 3, 7, '#5A3A22', '#C9A57A', 10 + i))}
    <defs><clipPath id={cid}><path d={bodyD} /><path d={headD} /></clipPath></defs>
    <Skin id={id + 'b'} J={bodyW} col="#D9D2C2" light={[-.5 * flip, -.85]} hatch={.6} sw={1.5} openEnd />
    <Skin id={id + 'h'} J={headW} col="#BDB6A8" light={[-.5 * flip, -.85]} hatch={.4} sw={1.4} openStart />
    <g clipPath={`url(#${cid})`}>
      {/* the streaked brown back and the chestnut mantle */}
      <path d={`M${P(T([-50, -60]))} Q${P(T([-10, -100]))} ${P(T([40, -92]))} L${P(T([36, -76]))} Q${P(T([0, -70]))} ${P(T([-50, -54]))}Z`} fill="#8C5A36" />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${P(T([-40 + i * 9, -84 + Math.abs(i - 4)]))} l${f1(-8 * s * flip)} ${f1(10 * s)}`} stroke="#2B1D12" strokeWidth={1.6 * s} />)}
      {/* the black bib on throat and breast */}
      <path d={`M${P(HR([60, -92]))} Q${P(T([56, -78]))} ${P(T([44, -58]))} Q${P(T([36, -66]))} ${P(T([42, -84]))}Z`} fill="#1A120B" />
      {/* the head: grey crown, chestnut band from the eye round the nape, pale cheek */}
      <path d={`M${P(HR([40, -110]))} Q${P(HR([56, -124]))} ${P(HR([74, -112]))} L${P(HR([66, -106]))} Q${P(HR([54, -112]))} ${P(HR([42, -104]))}Z`} fill="#8E8A80" />
      <path d={`M${P(HR([64, -104]))} Q${P(HR([52, -104]))} ${P(HR([36, -96]))} L${P(HR([36, -86]))} Q${P(HR([50, -96]))} ${P(HR([62, -100]))}Z`} fill="#8C4A2A" />
      <path d={`M${P(HR([54, -96]))} Q${P(HR([62, -92]))} ${P(HR([66, -94]))} Q${P(HR([62, -86]))} ${P(HR([52, -88]))}Z`} fill="#EFE8DA" />
    </g>
    {/* bill: thick and conical; opens to sing */}
    <path d={`M${P(HR([74, -106]))} Q${P(HR([84, -104]))} ${P(HR([92, -99.5 - sing * 3]))} L${P(HR([75, -99]))}Z`} fill="#2B1D12" />
    <path d={`M${P(HR([75, -98]))} L${P(HR([90, -99 + sing * 6]))} Q${P(HR([82, -93]))} ${P(HR([74, -94]))}Z`} fill="#4A3220" />
    {/* the eye: dark, a glint, a thin pale eye-ring */}
    <circle cx={HR([65, -104])[0]} cy={HR([65, -104])[1]} r={3.6 * s} fill="#120A06" stroke="#C9C2B6" strokeWidth={.8} />
    <circle cx={HR([66, -105.5])[0]} cy={HR([66, -105.5])[1]} r={1.1 * s} fill="#FFFDF4" />
    {/* the folded wing over the flank */}
    <g>{prim}
      <path d={`M${P(T([34, -86]))} Q${P(T([10, -92 - open * 20]))} ${P(T([-16, -78 - open * 30]))} Q${P(T([0, -66]))} ${P(T([30, -72]))}Z`} fill="#8C4A2A" stroke={SEP} strokeWidth={1} />
      <path d={`M${P(T([26, -78]))} Q${P(T([6, -82 - open * 20]))} ${P(T([-10, -74 - open * 26]))}`} stroke="#FBF4E2" strokeWidth={3 * s} fill="none" strokeLinecap="round" />
      {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${P(T([28 - i * 8, -84 + i * 1.5 - open * i * 4]))} q${f1(-6 * s * flip)} ${f1(4 * s)} ${f1(-10 * s * flip)} ${f1(10 * s)}`} stroke={SEP} strokeWidth={.8} fill="none" />)}</g>
  </g>;
};

// ================================================================ THE MUSEUM SKELETON — the hall at night and the same theropod as bones on its mount (bones fixed at 1).
const MuseumSkeleton: React.FC<{ x?: N; y?: N; s?: N; draw?: N; moon?: N; dawn?: N; sx?: N; sy?: N; ss?: N; head?: N; build?: N; hall?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, moon = 1, dawn = 0, sx = 1040, sy = 750, ss = .9, head = 0, build = 1, hall = 1 }) => {
  const MH = ART_A.MuseumHall, TH = ART_A.Theropod;
  return <g>{hall > 0 && <g opacity={hall}><MH x={x} y={y} s={s} draw={draw} moon={moon} dawn={dawn} /></g>}<TH x={sx} y={sy} s={ss * s} draw={draw} bones={1} head={head} eye={0} build={build} /></g>;
};

export const ART_B: Record<string, React.FC<any>> = { ShockedGrain, WorldOutcrops, YucatanCoast, SearchGlobe, ReportShelf, SurveyPlane, SurveyRing, ConferenceHall, DrillCore, VillageSign,
  ImpactRings, FoodChain, Burrow, Sparrow, MuseumSkeleton };
