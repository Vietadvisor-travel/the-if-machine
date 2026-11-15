// FATHOM places & things, part 2 of the library — landscapes, interiors, lab, city, nature — all in the signature style
// (Region = wash + form-following hatch + swelling ink; light from the upper right; real construction, never placeholder shapes).
import React from 'react';
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import land110 from '../data/land110.json';
import { Region, Ink, Line, SEP, PIG, tone, mix, ell, poly, seq } from './paint';

type N = number; type Pt = [N, N];
const W = 1920;
const f1 = (v: N) => +v.toFixed(1);
const P = (pts: Pt[]) => poly(pts);

// ---------------------------------------------------------------- MOUNTAINS: ranges of engraved peaks, sunlit right faces, hatched shade, snow
export const Mountains: React.FC<{ y: N; h: N; x0?: N; x1?: N; n?: N; seed?: string; snow?: N; mat?: string; haze?: N; draw?: N }> = ({ y, h, x0 = 0, x1 = W, n = 5, seed = 'mt', snow = .6, mat = 'stone', haze = 0, draw = 1 }) => {
  const q = seq(seed), peaks = Array.from({ length: n }, (_, i) => { const cx = x0 + (x1 - x0) * (i + .5 + (q() - .5) * .5) / n, ph = h * (.55 + q() * .45), wd = (x1 - x0) / n * (.9 + q() * .7); return { cx, ph, wd, j: q() }; })
    .sort((a, b) => a.ph - b.ph);
  return <g>{peaks.map((p, i) => { const r = seq(seed + i), top: Pt = [p.cx + (r() - .5) * p.wd * .1, y - p.ph], L: Pt = [p.cx - p.wd * .75, y], R: Pt = [p.cx + p.wd * .75, y];
    const ridge = (a: Pt, b: Pt, k: N): Pt[] => Array.from({ length: 13 }, (_, j) => { const u = (j + 1) / 14; return [a[0] + (b[0] - a[0]) * u + (r() - .5) * p.wd * .05, a[1] + (b[1] - a[1]) * u + (r() - .5) * p.ph * .08 * k] as Pt; });
    const lft = ridge(L, top, 1), rgt = ridge(top, R, 1), foot: Pt = [p.cx + p.wd * .18, y], spur = ridge(top, foot, .6);
    const tt = .25 + haze * -.15 + (i / n) * .15, mt = haze > .3 ? 'sky' : mat;
    const snowLine = top[1] + p.ph * (.18 + .22 * snow);
    const snowPts: Pt[] = [top, ...rgt.filter(v => v[1] < snowLine), [top[0] + (snowLine - top[1]) * .8, snowLine], ...Array.from({ length: 6 }, (_, j) => [top[0] + (snowLine - top[1]) * (.8 - j * .3), snowLine - (j % 2) * p.ph * .05 + r() * 6] as Pt), ...lft.filter(v => v[1] < snowLine).reverse()];
    return <g key={i}>
      <Region d={P([L, ...lft, top, ...spur, foot])} mat={mt} t={tt + .35} ang={-55} draw={draw} sw={1.2} hatchA={.45} />
      <Region d={P([top, ...rgt, R, foot, ...spur.slice().reverse()])} mat={mt} t={tt} ang={40} draw={draw} sw={1.2} />
      {snow > 0 && <Region d={P(snowPts)} mat="ice" t={.1} hatch={0} draw={draw} sw={.9} rim={false} />}
      {Array.from({ length: 5 }, (_, j) => { const a = spur[Math.min(spur.length - 1, j + 1)]; return <Line key={j} d={`M${f1(a[0])} ${f1(a[1])} q${f1(-p.wd * .08)} ${f1(p.ph * .1)} ${f1(-p.wd * .16)} ${f1(p.ph * .22)}`} w={.7} a={.45 * draw} />; })}
    </g>; })}</g>;
};

// ---------------------------------------------------------------- INTERIOR: arched window with a shaft of light, bookcase, desk, chair
export const Window: React.FC<{ x: N; y: N; w: N; h: N; light?: N; sky?: string; draw?: N; floor?: N }> = ({ x, y, w, h, light = 1, sky = 'sky', draw = 1, floor = 1000 }) => {
  const x0 = x - w / 2, x1 = x + w / 2, ya = y - h / 2 + w / 2, yb = y + h / 2, arch = `M${x0} ${yb} V${ya} A${w / 2} ${w / 2} 0 0 1 ${x1} ${ya} V${yb}Z`;
  const fr = 14, inner = `M${x0 + fr} ${yb - fr} V${ya} A${w / 2 - fr} ${w / 2 - fr} 0 0 1 ${x1 - fr} ${ya} V${yb - fr}Z`;
  return <g>
    {light > 0 && <path d={`M${x0 + fr} ${yb} L${x1 - fr} ${yb} L${x1 + w * 1.4} ${floor} L${x0 + w * .9} ${floor}Z`} fill="#FFF4D2" opacity={.32 * light * draw} filter="url(#b8)" />}
    <Region d={arch} mat="wood" t={.6} ang={90} draw={draw} sw={1.6} />
    <Region d={inner} mat={sky} t={.18} hatch={0} draw={draw} sw={1} rim={false} />
    <circle cx={x + w * .2} cy={ya} r={w * .35} fill="url(#glowW)" opacity={.5 * light * draw} />
    {[1, 2].map(i => <Line key={i} d={`M${x0 + fr + (w - 2 * fr) * i / 3} ${ya - w * .3} V${yb - fr}`} w={2.2} col={tone('wood', .7)} a={draw} />)}
    {[1, 2, 3].map(i => <Line key={i} d={`M${x0 + fr} ${ya + (yb - ya) * i / 4} H${x1 - fr}`} w={2.2} col={tone('wood', .7)} a={draw} />)}
    <Region d={P([[x0 - 18, yb], [x1 + 18, yb], [x1 + 10, yb + 18], [x0 - 10, yb + 18]])} mat="stone" t={.35} draw={draw} sw={1.2} />
  </g>;
};
export const Bookshelf: React.FC<{ x: N; y: N; w: N; h: N; seed?: string; draw?: N }> = ({ x, y, w, h, seed = 'bk', draw = 1 }) => {
  const q = seq(seed), sh = 5, x0 = x - w / 2, y0 = y - h, sp = (h - 30) / sh, mats = ['red', 'sky', 'leaf', 'wood', 'brass', 'cloth', 'night'], books: React.ReactNode[] = [];
  for (let s = 0; s < sh; s++) { let bx = x0 + 22; const base = y0 + 20 + (s + 1) * sp - 4;
    while (bx < x0 + w - 40) { const bw = 12 + q() * 22, bh = sp * (.62 + q() * .3), lean = q() < .08 ? 10 : 0, m = mats[Math.floor(q() * mats.length)], tt = .45 + q() * .4, gap = q() < .06;
      if (gap) { bx += 30; continue; }
      const pts: Pt[] = lean ? [[bx, base], [bx + bw, base], [bx + bw + bh * .17, base - bh * .98], [bx + bh * .17, base - bh]] : [[bx, base], [bx + bw, base], [bx + bw, base - bh], [bx, base - bh]];
      books.push(<g key={s + '_' + bx}><Region d={P(pts)} mat={m} t={tt} ang={90} draw={draw} sw={.9} rim={false} />
        {!lean && [.18, .82].map(k => <Line key={k} d={`M${f1(bx + 2)} ${f1(base - bh * k)} H${f1(bx + bw - 2)}`} w={1.6} col="#D9AE4C" a={.8 * draw} />)}</g>);
      bx += bw + (lean ? bh * .2 : 1); } }
  return <g>
    <rect x={x0 + 10} y={y0 + 14} width={w} height={h} fill="#000" opacity={.28} filter="url(#b8)" />
    <Region d={P([[x0, y0], [x0 + w, y0], [x0 + w, y], [x0, y]])} mat="wall" t={.75} ang={90} draw={draw} sw={1.6} hatchA={.5} />
    {books}
    {Array.from({ length: sh + 1 }, (_, s) => <Region key={s} d={P([[x0 + 6, y0 + 16 + s * sp], [x0 + w - 6, y0 + 16 + s * sp], [x0 + w - 6, y0 + 28 + s * sp], [x0 + 6, y0 + 28 + s * sp]])} mat="wood" t={.55} draw={draw} sw={1} rim={false} />)}
    <Region d={P([[x0 - 10, y0 - 22], [x0 + w + 10, y0 - 22], [x0 + w + 4, y0 + 4], [x0 - 4, y0 + 4]])} mat="wood" t={.6} draw={draw} sw={1.4} />
  </g>;
};
export const Desk: React.FC<{ x: N; y: N; w: N; draw?: N; book?: N; ink?: N; papers?: N }> = ({ x, y, w, draw = 1, book = 1, ink = 1, papers = 1 }) => {
  const h = w * .42, x0 = x - w / 2, x1 = x + w / 2, top = y - h, d = w * .1;
  return <g>
    <ellipse cx={x} cy={y + 4} rx={w * .55} ry={14} fill={SEP} opacity={.22 * draw} filter="url(#b8)" />
    {[x0 + 30, x1 - 50].map((lx, i) => <Region key={i} d={`M${lx} ${top + 30} h20 v${h * .3} q8 10 0 20 v${h * .5 - 40} q6 8 -2 14 h-16 q-8 -6 -2 -14 v${-(h * .5 - 40)} q-8 -10 0 -20Z`} mat="wood" t={.62} ang={90} draw={draw} sw={1.1} />)}
    <Region d={P([[x0 + 20, top + 28], [x1 - 20, top + 28], [x1 - 20, top + 110], [x0 + 20, top + 110]])} mat="wood" t={.55} ang={0} draw={draw} sw={1.2} />
    {[x0 + w * .25, x0 + w * .75].map((dx, i) => <g key={i}><Ink d={`M${dx - w * .14} ${top + 46} h${w * .28} v48 h${-w * .28}Z`} w={1} draw={draw} /><circle cx={dx} cy={top + 70} r={6} fill="url(#gold)" stroke={SEP} strokeWidth={.8} opacity={draw} /></g>)}
    <Region d={P([[x0 + d, top - d * .5], [x1 - d * .2, top - d * .5], [x1, top + 28], [x0, top + 28]])} mat="wood" t={.38} ang={8} draw={draw} sw={1.4} />
    {papers > 0 && <g opacity={papers}><Region d={P([[x0 + w * .06, top - 4], [x0 + w * .28, top - 12], [x0 + w * .32, top + 14], [x0 + w * .1, top + 20]])} mat="paper" t={.1} draw={draw} sw={.8} rim={false} />
      {[0, 1, 2, 3].map(i => <Line key={i} d={`M${x0 + w * .1 + i * 2} ${top - 2 + i * 5} l${w * .16} -5`} w={.6} a={.5 * draw} />)}</g>}
    {book > 0 && <g opacity={book}><Region d={`M${x - w * .02} ${top + 4} C${x + w * .06} ${top - 14} ${x + w * .16} ${top - 12} ${x + w * .24} ${top - 2} L${x + w * .22} ${top + 16} C${x + w * .15} ${top + 6} ${x + w * .06} ${top + 8} ${x - w * .02} ${top + 20}Z`} mat="paper" t={.15} ang={0} draw={draw} sw={.9} />
      <Region d={`M${x - w * .02} ${top + 4} C${x - w * .1} ${top - 14} ${x - w * .2} ${top - 12} ${x - w * .27} ${top - 2} L${x - w * .25} ${top + 16} C${x - w * .18} ${top + 6} ${x - w * .1} ${top + 8} ${x - w * .02} ${top + 20}Z`} mat="paper" t={.22} ang={0} draw={draw} sw={.9} />
      {[0, 1, 2, 3, 4].map(i => <Line key={i} d={`M${x + w * .02} ${top + 2 + i * 3} q${w * .08} -8 ${w * .18} -4 M${x - w * .05} ${top + 2 + i * 3} q${-w * .08} -8 ${-w * .18} -4`} w={.5} a={.45 * draw} />)}</g>}
    {ink > 0 && <g opacity={ink}><Region d={`M${x1 - w * .16} ${top - 2} q-4 -22 6 -26 h16 q10 4 6 26Z`} mat="night" t={.8} draw={draw} sw={1} />
      <Line d={`M${x1 - w * .14} ${top - 26} C${x1 - w * .1} ${top - 70} ${x1 - w * .05} ${top - 110} ${x1 - w * .02} ${top - 140}`} w={1.4} a={draw} />
      <Region d={`M${x1 - w * .13} ${top - 50} C${x1 - w * .1} ${top - 90} ${x1 - w * .06} ${top - 125} ${x1 - w * .02} ${top - 140} C${x1 - w * .02} ${top - 110} ${x1 - w * .06} ${top - 80} ${x1 - w * .11} ${top - 46}Z`} mat="paper" t={.12} draw={draw} sw={.8} rim={false} hatch={0} /></g>}
  </g>;
};
export const Chair: React.FC<{ x: N; y: N; s: N; flip?: N; draw?: N }> = ({ x, y, s, flip = 1, draw = 1 }) => {
  const k = s / 200, X = (v: N) => x + v * k * flip, Y = (v: N) => y + v * k;
  return <g>
    <ellipse cx={x} cy={y + 2} rx={60 * k} ry={8 * k} fill={SEP} opacity={.2 * draw} filter="url(#b2s)" />
    <Region d={`M${X(-46)} ${Y(-200)} L${X(-36)} ${Y(-200)} L${X(-30)} ${Y(0)} L${X(-40)} ${Y(0)}Z`} mat="wood" t={.62} draw={draw} sw={1} />
    <Region d={P([[X(-44), Y(-190)], [X(-32), Y(-190)], [X(-32), Y(-120)], [X(-44), Y(-120)]])} mat="cloth" t={.55} draw={draw} sw={.9} />
    {[34, 44].map(v => <Region key={v} d={P([[X(v - 6), Y(-96)], [X(v + 4), Y(-96)], [X(v + 4), Y(0)], [X(v - 6), Y(0)]])} mat="wood" t={v > 40 ? .7 : .55} draw={draw} sw={1} />)}
    <Region d={P([[X(-46), Y(-104)], [X(52), Y(-104)], [X(48), Y(-90)], [X(-42), Y(-90)]])} mat="wood" t={.45} draw={draw} sw={1.1} />
    <Line d={`M${X(-34)} ${Y(-40)} H${X(36)}`} w={2.4 * k} col={tone('wood', .7)} a={draw} />
  </g>;
};

// ---------------------------------------------------------------- an antique TERRESTRIAL GLOBE on a turned stand (real coastlines, old-map colours)
export const Globe: React.FC<{ x: N; y: N; r: N; lon?: N; tilt?: N; draw?: N }> = ({ x, y, r, lon = 20, tilt = 23.4, draw = 1 }) => {
  const pr = geoOrthographic().scale(r).translate([x, y]).rotate([-lon, -15, 0]).clipAngle(90), path = geoPath(pr);
  const land = path(land110 as any) || '', grat = path(geoGraticule10()) || '';
  return <g>
    <ellipse cx={x} cy={y + r * 1.75} rx={r * .7} ry={r * .08} fill={SEP} opacity={.25 * draw} filter="url(#b8)" />
    <Region d={`M${x - r * .55} ${y + r * 1.72} Q${x} ${y + r * 1.55} ${x + r * .55} ${y + r * 1.72} L${x + r * .5} ${y + r * 1.78} L${x - r * .5} ${y + r * 1.78}Z`} mat="wood" t={.6} draw={draw} sw={1.1} />
    <Region d={`M${x - r * .07} ${y + r * 1.62} C${x - r * .2} ${y + r * 1.4} ${x - r * .02} ${y + r * 1.3} ${x - r * .06} ${y + r * 1.1} L${x + r * .06} ${y + r * 1.1} C${x + r * .02} ${y + r * 1.3} ${x + r * .2} ${y + r * 1.4} ${x + r * .07} ${y + r * 1.62}Z`} mat="wood" t={.55} ang={90} draw={draw} sw={1} />
    <g transform={`rotate(${tilt} ${x} ${y})`}>
      <circle cx={x} cy={y} r={r} fill={tone('desert', .1)} opacity={draw} />
      <path d={land} fill={tone('desert', .55)} stroke={SEP} strokeWidth={1} opacity={draw} />
      <path d={grat} fill="none" stroke={SEP} strokeWidth={.5} opacity={.4 * draw} />
      <path d={`M${x - r * .1} ${y + r * .1} A${r} ${r} 0 0 0 ${x + r * .9} ${y + r * .45}`} fill="none" stroke={PIG.red[1]} strokeWidth={1} opacity={.5 * draw} />
      <circle cx={x} cy={y} r={r} fill="none" stroke={SEP} strokeWidth={1.6} opacity={draw} />
      <circle cx={x + r * .35} cy={y - r * .35} r={r * .9} fill="url(#glowW)" opacity={.18 * draw} />
      <path d={ell(x, y, r, r)} fill="none" stroke="#000" strokeOpacity={.25} strokeWidth={r * .3} transform={`translate(${-r * .12} ${r * .12})`} clipPath="none" opacity={0} />
      <path d={`M${x - r * 1.12} ${y} A${r * 1.12} ${r * 1.12} 0 1 1 ${x + r * 1.12} ${y}`} fill="none" stroke="url(#gold)" strokeWidth={r * .07} opacity={draw} />
      <path d={`M${x - r * 1.12} ${y} A${r * 1.12} ${r * 1.12} 0 1 1 ${x + r * 1.12} ${y}`} fill="none" stroke={SEP} strokeWidth={.8} opacity={draw} />
      <Line d={`M${x} ${y - r * 1.2} V${y - r * 1.12} M${x} ${y + r * 1.12} V${y + r * 1.2}`} w={2} a={draw} />
    </g>
    <path d={`M${x - r * 1.2} ${y + r * .2} A${r * 1.2} ${r * .3} 0 0 0 ${x + r * 1.2} ${y + r * .2}`} fill="none" stroke={tone('wood', .55)} strokeWidth={r * .08} opacity={draw} />
    <Ink d={`M${x - r * 1.2} ${y + r * .2} A${r * 1.2} ${r * .3} 0 0 0 ${x + r * 1.2} ${y + r * .2}`} w={1} draw={draw} />
  </g>;
};

// ---------------------------------------------------------------- PENDULUM on a bracket (swing driven by the film's clock: flicker = t)
export const Pendulum: React.FC<{ x: N; y: N; len: N; amp?: N; period?: N; draw?: N; flicker?: N; trace?: N }> = ({ x, y, len, amp = 18, period = 2, draw = 1, flicker = 0, trace = 0 }) => {
  const a = amp * Math.cos(flicker * Math.PI * 2 / period) * draw, bx = x + Math.sin(a * Math.PI / 180) * len, by = y + Math.cos(a * Math.PI / 180) * len, r = len * .09;
  return <g>
    <Region d={P([[x - len * .3, y - 26], [x + len * .3, y - 26], [x + len * .26, y], [x - len * .26, y]])} mat="wood" t={.55} draw={draw} sw={1.2} />
    {trace > 0 && <path d={`M${x - Math.sin(amp * Math.PI / 180) * len * 1.04} ${y + Math.cos(amp * Math.PI / 180) * len * 1.04} A${len * 1.04} ${len * 1.04} 0 0 0 ${x + Math.sin(amp * Math.PI / 180) * len * 1.04} ${y + Math.cos(amp * Math.PI / 180) * len * 1.04}`} fill="none" stroke={SEP} strokeDasharray="5 7" strokeWidth={1.2} opacity={trace * draw} />}
    <Line d={`M${x} ${y} L${bx} ${by}`} w={2.2} a={draw} />
    <ellipse cx={bx + 10} cy={by + 16} rx={r} ry={r * .5} fill={SEP} opacity={.15 * draw} filter="url(#b2s)" />
    <Region d={ell(bx, by, r, r)} mat="brass" t={.4} ang={45} draw={draw} sw={1.2} />
    <circle cx={bx - r * .35} cy={by - r * .35} r={r * .3} fill="#FFF4D2" opacity={.6 * draw} />
    <circle cx={x} cy={y} r={5} fill="url(#gold)" stroke={SEP} strokeWidth={1} opacity={draw} />
  </g>;
};

// ---------------------------------------------------------------- LAB GLASS on a bench: round flask on a ring stand over a burner, retort, beaker, tubes
export const Glassware: React.FC<{ x: N; y: N; s: N; liquid?: string; boil?: N; draw?: N; flicker?: N }> = ({ x, y, s, liquid = 'sea', boil = 0, draw = 1, flicker = 0 }) => {
  const k = s / 300, X = (v: N) => x + v * k, Y = (v: N) => y + v * k, glass = (d: string, key: string) => <g key={key}><path d={d} fill="#DCEAF0" opacity={.35 * draw} /><Ink d={d} w={1.2} draw={draw} /></g>;
  const liq = (d: string, key: string) => <Region key={key} d={d} mat={liquid} t={.4} hatch={0} draw={draw} sw={.6} rim={false} />;
  return <g>
    <Region d={P([[X(-320), Y(0)], [X(320), Y(0)], [X(320), Y(22)], [X(-320), Y(22)]])} mat="wood" t={.55} draw={draw} sw={1.2} />
    {/* ring stand + flask + burner */}
    <Region d={P([[X(-250), Y(-6)], [X(-170), Y(-6)], [X(-170), Y(0)], [X(-250), Y(0)]])} mat="night" t={.8} draw={draw} sw={.8} rim={false} />
    <Line d={`M${X(-240)} ${Y(-6)} V${Y(-330)}`} w={3.2 * k + 1} col={tone('night', .7)} a={draw} />
    <Line d={`M${X(-240)} ${Y(-170)} H${X(-120)}`} w={2.4 * k + 1} col={tone('night', .7)} a={draw} />
    {liq(`M${X(-160)} ${Y(-195)} A${50 * k} ${50 * k} 0 0 0 ${X(-80)} ${Y(-195)} Z`, 'l1')}
    {glass(`M${X(-132)} ${Y(-300)} V${Y(-245)} A${50 * k} ${50 * k} 0 1 0 ${X(-108)} ${Y(-245)} V${Y(-300)}Z`, 'g1')}
    {boil > 0 && Array.from({ length: 6 }, (_, i) => { const ph = (flicker * 1.4 + i / 6) % 1; return <circle key={i} cx={X(-140 + (i * 13) % 50)} cy={Y(-160 - ph * 70)} r={(2 + i % 3) * k + 1} fill="none" stroke="#FFFFFF" strokeWidth={1} opacity={boil * (1 - ph) * draw} />; })}
    <Region d={P([[X(-140), Y(-6)], [X(-100), Y(-6)], [X(-108), Y(-70)], [X(-132), Y(-70)]])} mat="brass" t={.45} draw={draw} sw={1} />
    <path d={`M${X(-128)} ${Y(-72)} Q${X(-120)} ${Y(-120 - Math.sin(flicker * 20) * 6)} ${X(-112)} ${Y(-72)}Z`} fill="#8FC1E6" opacity={.7 * draw} />
    {/* retort */}
    {liq(`M${X(-20)} ${Y(-40)} A${60 * k} ${40 * k} 0 0 0 ${X(80)} ${Y(-40)}Z`, 'l2')}
    {glass(`M${X(30)} ${Y(-140)} C${X(-40)} ${Y(-140)} ${X(-40)} ${Y(-10)} ${X(30)} ${Y(-10)} C${X(100)} ${Y(-10)} ${X(100)} ${Y(-110)} ${X(60)} ${Y(-130)} L${X(190)} ${Y(-210)} L${X(186)} ${Y(-218)} L${X(54)} ${Y(-142)}Z`, 'g2')}
    {/* beaker with graduations */}
    {liq(`M${X(206)} ${Y(-60)} H${X(274)} V${Y(-4)} H${X(206)}Z`, 'l3')}
    {glass(`M${X(200)} ${Y(-130)} L${X(206)} ${Y(-124)} V${Y(-2)} H${X(274)} V${Y(-124)} L${X(282)} ${Y(-132)}`, 'g3')}
    {[1, 2, 3, 4, 5].map(i => <Line key={i} d={`M${X(208)} ${Y(-2 - i * 22)} h${12 * k + 4}`} w={.8} a={.8 * draw} />)}
  </g>;
};

// ---------------------------------------------------------------- CITY: a skyline of an old city (domes, spires, gables) or a modern one
export const City: React.FC<{ y: N; x0?: N; x1?: N; h?: N; era?: 'old' | 'modern'; seed?: string; t?: N; draw?: N; lights?: N }> = ({ y, x0 = 0, x1 = W, h = 220, era = 'old', seed = 'city', t = .3, draw = 1, lights = 0 }) => {
  const q = seq(seed), out: React.ReactNode[] = []; let x = x0, i = 0;
  while (x < x1) { const bw = 50 + q() * 90, bh = h * (.35 + q() * .5), kind = q(), m = kind < .5 ? 'stone' : kind < .8 ? 'sand' : 'wall', tt = t + q() * .3, top = y - bh, key = i++;
    let roof = '';
    if (era === 'old') { if (kind < .15) roof = `M${x + bw * .1} ${top} A${bw * .4} ${bw * .45} 0 0 1 ${x + bw * .9} ${top}Z`; else if (kind < .3) roof = `M${x + bw * .3} ${top} L${x + bw * .5} ${top - bh * .9} L${x + bw * .7} ${top}Z`; else roof = `M${x - 4} ${top} L${x + bw / 2} ${top - bw * .4} L${x + bw + 4} ${top}Z`; }
    out.push(<g key={key}>
      <Region d={P([[x, y], [x + bw, y], [x + bw, top], [x, top]])} mat={m} t={tt} ang={kind * 180} draw={draw} sw={1} hatchA={.35} />
      {roof && <Region d={roof} mat={kind < .15 ? 'brass' : 'red'} t={.55} ang={30} draw={draw} sw={1} />}
      {Array.from({ length: Math.floor(bh / 40) }, (_, r) => Array.from({ length: Math.floor(bw / 26) }, (_, c) => { const lit = lights > 0 && random01(seed + key + r + c) < .45;
        return <rect key={r + '_' + c} x={x + 10 + c * 26} y={top + 16 + r * 40} width={era === 'old' ? 9 : 14} height={era === 'old' ? 16 : 20} rx={era === 'old' ? 4 : 0} fill={lit ? '#F7E3A0' : SEP} opacity={(lit ? lights : .55) * draw} />; }))}
    </g>);
    x += bw + (q() < .2 ? 10 : 0); }
  return <g>{out}</g>;
};
const random01 = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return ((h >>> 0) % 10000) / 10000; };

// ---------------------------------------------------------------- NATURE: an engraved tree (oak or pine) and a flock of birds
export const Tree: React.FC<{ x: N; y: N; h: N; kind?: 'oak' | 'pine'; seed?: string; t?: N; draw?: N; sway?: N; flicker?: N }> = ({ x, y, h, kind = 'oak', seed = 'tr', t = .45, draw = 1, sway = 1, flicker = 0 }) => {
  const q = seq(seed), sw2 = Math.sin(flicker * 1.1) * 4 * sway;
  if (kind === 'pine') { const tiers = 6; return <g>
    <ellipse cx={x} cy={y + 3} rx={h * .22} ry={h * .03} fill={SEP} opacity={.2 * draw} filter="url(#b2s)" />
    <Region d={P([[x - h * .025, y], [x + h * .025, y], [x + h * .015, y - h * .3], [x - h * .015, y - h * .3]])} mat="wood" t={.6} draw={draw} sw={1} />
    {Array.from({ length: tiers }, (_, i) => { const yb = y - h * .15 - i * h * .13, w = h * (.24 - i * .033), tp = yb - h * .22; return <Region key={i} d={`M${x - w} ${yb} Q${x} ${yb - h * .04} ${x + w} ${yb} L${x + sw2 * (i / tiers)} ${tp}Z`} mat="forest" t={t + .1 - i * .03} ang={i % 2 ? 30 : 150} draw={draw} sw={1} />; })}</g>; }
  const lobes = Array.from({ length: 14 }, () => [x + (q() - .5) * h * .6, y - h * (.52 + q() * .38), h * (.1 + q() * .07)] as [N, N, N]).sort((a, b) => a[1] - b[1]);
  return <g>
    <ellipse cx={x} cy={y + 3} rx={h * .3} ry={h * .035} fill={SEP} opacity={.22 * draw} filter="url(#b2s)" />
    <Region d={`M${x - h * .05} ${y} C${x - h * .03} ${y - h * .2} ${x - h * .04} ${y - h * .35} ${x - h * .12} ${y - h * .55} L${x - h * .08} ${y - h * .57} C${x} ${y - h * .42} ${x + h * .01} ${y - h * .5} ${x + h * .1} ${y - h * .6} L${x + h * .12} ${y - h * .57} C${x + h * .04} ${y - h * .42} ${x + h * .04} ${y - h * .2} ${x + h * .06} ${y}Z`} mat="wood" t={.62} ang={90} draw={draw} sw={1.2} />
    {lobes.map(([lx, ly, r], i) => { const n = 13, pts = Array.from({ length: n }, (_, j) => { const a = j / n * Math.PI * 2, rr = r * (.82 + .18 * Math.sin(j * 2.3 + i * 1.7)); return [lx + sw2 + Math.cos(a) * rr, ly + Math.sin(a) * rr * .8] as Pt; });
      let d = `M${pts[0].map(f1).join(' ')}`; for (let j = 0; j < n; j++) { const a = pts[j], b = pts[(j + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ox = mx - lx - sw2, oy = my - ly, ol = Math.hypot(ox, oy) || 1; d += ` Q${f1(mx + ox / ol * r * .22)} ${f1(my + oy / ol * r * .22)} ${b.map(f1).join(' ')}`; }
      const lit = (lx - x) / h + (y - h * .9 - ly) / h;   // upper-right lobes catch the light
      return <g key={i}><Region d={d + 'Z'} mat="forest" t={Math.max(.15, .55 - lit * .6 + (ly - y + h) / h * .15)} ang={120} draw={draw} sw={1} hatchA={.45} />
        {[0, 1, 2].map(j => <Line key={j} d={`M${f1(lx + sw2 - r * .4 + j * r * .3)} ${f1(ly + r * .25)} q${f1(r * .1)} ${f1(-r * .12)} ${f1(r * .22)} 0`} w={.7} a={.5 * draw} />)}</g>; })}
  </g>;
};
export const Birds: React.FC<{ x: N; y: N; n?: N; s?: N; seed?: string; draw?: N; flicker?: N }> = ({ x, y, n = 7, s = 20, seed = 'bd', draw = 1, flicker = 0 }) => {
  const q = seq(seed);
  return <g opacity={draw}>{Array.from({ length: n }, (_, i) => { const bx = x + (q() - .3) * s * 14, by = y + (q() - .5) * s * 6, sc = s * (.6 + q() * .6), fl = Math.sin(flicker * 7 + i * 1.7) * .5;
    return <path key={i} d={`M${f1(bx - sc)} ${f1(by - sc * fl)} Q${f1(bx - sc * .45)} ${f1(by - sc * (.5 + fl * .3))} ${f1(bx)} ${f1(by)} Q${f1(bx + sc * .45)} ${f1(by - sc * (.5 + fl * .3))} ${f1(bx + sc)} ${f1(by - sc * fl)}`} fill="none" stroke={SEP} strokeWidth={1.6} strokeLinecap="round" />; })}</g>;
};
export { mix };
