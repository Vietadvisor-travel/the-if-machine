// star-distance — ACT II drawings: the Milky Way, the Harvard glass plate, the plate-measuring room (R-01: tall windows, bookcases, plate
// stands, ledgers), Leavitt's breathing stars in the loupe (P-03), her 1912 graph drawn true to the 25 stars of Table I (X-01),
// the ruler of light, and the candle carried down the dark road.
import React, { useMemo } from 'react';
import { Line, Ink, Stipple, SEP, ell, SR, Ball, Star, starField, NightWash, Floor, Fell, Hand, N, Pt, f1, cl, ph, lerp, rect, rr, pathOf, rnd } from './kit';

// ================================================================ THE MILKY WAY — a band of stipple across the night, thick in the middle, torn by dark lanes of dust.
const MilkyWayBand: React.FC<{ x?: N; y?: N; draw?: N; rot?: N; w?: N; glow?: N; sky?: N }> = ({ x = 960, y = 540, draw = 1, rot = -24, w = 260, glow = 1, sky = 1 }) => {
  const dots = useMemo(() => Array.from({ length: 2600 }, (_, i) => { const u = rnd(i * 1.7) * 2 - 1, g = (rnd(i * 2.3) + rnd(i * 3.1) + rnd(i * 4.7) - 1.5) / 1.5; return [u * 1500, g * w, .5 + Math.pow(rnd(i * 5.3), 6) * 2.4] as [N, N, N]; }), [w]);
  return <g opacity={draw}>
    {sky > 0 && <NightWash x={-200} y={-200} w={2320} h={1480} seed="mwsky" a={sky} top="#0B1030" bot="#1C2650" />}
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse cx={0} cy={0} rx={1500} ry={w * 1.1} fill="#F3E7CC" opacity={.1 * glow} filter="url(#b30)" />
      <ellipse cx={0} cy={0} rx={1300} ry={w * .55} fill="#F7E3A0" opacity={.12 * glow} filter="url(#b30)" />
      {dots.map(([dx, dy, r], i) => <circle key={i} cx={f1(dx)} cy={f1(dy)} r={r} fill="#FFF4D2" opacity={.55 + rnd(i) * .45} />)}
      {Array.from({ length: 34 }, (_, i) => <ellipse key={i} cx={-1300 + i * 80 + rnd(i) * 60} cy={(rnd(i + 3) - .5) * w * .5} rx={50 + rnd(i + 5) * 90} ry={8 + rnd(i + 7) * 16} fill="#0B1030" opacity={.35 + rnd(i + 9) * .3} transform={`rotate(${(rnd(i + 11) - .5) * 30} ${-1300 + i * 80} 0)`} filter="url(#b8)" />)}
    </g>
  </g>;
};

// ================================================================ A HARVARD GLASS PLATE — 8 × 10 inches of glass with the sky printed as black dots (a negative),
// a paper label in the corner; frame 0..1 = the wooden holder; neg 0..1 = the stars printed in.
const GlassPlateSky: React.FC<{ x?: N; y?: N; w?: N; h?: N; draw?: N; neg?: N; frame?: N; rot?: N; seed?: N; label?: string; cloud?: N }> = ({ x = 960, y = 540, w = 640, h = 520, draw = 1, neg = 1, frame = 1, rot = 0, seed = 8, label = 'A 4672', cloud = 0 }) => {
  const st = useMemo(() => starField(seed, 420, 0, 0, 1, 1, 3), [seed]), x0 = x - w / 2, y0 = y - h / 2;
  return <g transform={rot ? `rotate(${rot} ${x} ${y})` : undefined} opacity={Math.min(1, draw * 1.3)}>
    <rect x={x0 + 14} y={y0 + 18} width={w} height={h} fill="#000" opacity={.25} filter="url(#b8)" />
    {frame > 0 && <SR d={rr(x0 - 36, y0 - 36, w + 72, h + 72, 6)} mat="wood" t={.55} ang={0} draw={draw} sw={1.6} />}
    <rect x={x0} y={y0} width={w} height={h} fill="#EEF1E6" stroke={SEP} strokeWidth={1.4} />
    <rect x={x0 + 6} y={y0 + 6} width={w - 12} height={h - 12} fill="none" stroke="#9CCAD6" strokeWidth={2} opacity={.5} />
    {cloud > 0 && <g opacity={cloud}><ellipse cx={x0 + w * .38} cy={y0 + h * .55} rx={w * .22} ry={h * .14} fill="#2B1D12" opacity={.18} filter="url(#b30)" /><ellipse cx={x0 + w * .72} cy={y0 + h * .3} rx={w * .1} ry={h * .07} fill="#2B1D12" opacity={.14} filter="url(#b30)" /></g>}
    {st.map(([u, v, r], i) => <circle key={i} cx={x0 + 8 + u * (w - 16)} cy={y0 + 8 + v * (h - 16)} r={r * .9} fill="#1A120B" opacity={neg * (.6 + rnd(i) * .4)} />)}
    <rect x={x0 + 16} y={y0 + 14} width={120} height={36} fill="#FBF4E2" stroke={SEP} strokeWidth={.8} />
    <Hand x={x0 + 76} y={y0 + 40} s={22} t={label} />
    <path d={`M${x0 + w * .6} ${y0} L${x0 + w * .75} ${y0} L${x0 + w * .35} ${y0 + h} L${x0 + w * .2} ${y0 + h}Z`} fill="#FFFDF4" opacity={.14} />
  </g>;
};

// ================================================================ THE PLATE ROOM AT HARVARD (R-01: x3 the 1913 group, x1–x2 the 1890s rooms) — tall north windows on
// the left with half-drawn blinds, bookcases and pigeon-holes on the back wall, long tables of plate stands (a glass plate tilted on a
// frame over a mirror that throws the window light up through it), ledgers and boxes of plates. dusk 0..1 = the evening; empty = no lamp.
const PlateStand: React.FC<{ x: N; y: N; s: N; draw: N; lit?: N }> = ({ x, y, s, draw, lit = 1 }) => <g>
  <SR d={pathOf([[x - 70 * s, y], [x + 70 * s, y], [x + 60 * s, y - 16 * s], [x - 60 * s, y - 16 * s]], true)} mat="wood" t={.6} draw={draw} sw={1} />
  <SR d={pathOf([[x - 64 * s, y - 16 * s], [x + 64 * s, y - 16 * s], [x + 40 * s, y - 120 * s], [x - 40 * s, y - 120 * s]], true)} mat="wood" t={.5} draw={draw} sw={1.2} />
  <path d={pathOf([[x - 52 * s, y - 24 * s], [x + 52 * s, y - 24 * s], [x + 34 * s, y - 110 * s], [x - 34 * s, y - 110 * s]], true)} fill="#EEF1E6" stroke={SEP} strokeWidth={.9} opacity={draw} />
  <path d={pathOf([[x - 52 * s, y - 24 * s], [x + 52 * s, y - 24 * s], [x + 34 * s, y - 110 * s], [x - 34 * s, y - 110 * s]], true)} fill="#FFF4D2" opacity={draw * .35 * lit} />
  {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={x + (rnd(i + x) - .5) * 80 * s} cy={y - (30 + rnd(i * 2 + x) * 76) * s} r={1.1 * s} fill={SEP} opacity={draw * .8} />)}
</g>;
const HarvardPlateRoom: React.FC<{ x?: N; y?: N; s?: N; draw?: N; dusk?: N; lamp?: N; empty?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, dusk = 0, lamp = 1, empty = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="stone" t={.35 + dusk * .3} draw={draw} sw={0} hatch={0} rim={false} />
    {/* wainscot */}
    <SR d={rect(X(-1100), Y(80), 2200 * s, 140 * s)} mat="wood" t={.6} ang={0} draw={draw} sw={1.2} />
    {Array.from({ length: 14 }, (_, i) => <Ink key={i} d={rect(X(-1080 + i * 160), Y(96), 140 * s, 108 * s)} w={.8} draw={draw} />)}
    {/* tall windows, left, with blinds */}
    {[-980, -700].map((wx, i) => <g key={i}>
      <SR d={rect(X(wx), Y(-560), 200 * s, 620 * s)} mat="wood" t={.5} draw={draw} sw={1.4} />
      <rect x={X(wx + 14)} y={Y(-546)} width={172 * s} height={592 * s} fill={dusk > .5 ? '#5A6E9A' : '#FBF4E2'} opacity={draw * (.95 - dusk * .4)} />
      <SR d={rect(X(wx + 14), Y(-546), 172 * s, 230 * s)} mat="cloth" t={.35} ang={0} draw={draw} sw={1} />
      {Array.from({ length: 9 }, (_, k) => <Line key={k} d={`M${X(wx + 14)} ${Y(-536 + k * 24)} h${172 * s}`} w={.6} a={.4 * draw} />)}
      <Line d={`M${X(wx + 100)} ${Y(-316)} V${Y(46)} M${X(wx + 14)} ${Y(-130)} H${X(wx + 186)}`} w={3 * s} a={draw} />
      <path d={`M${X(wx + 14)} ${Y(-300)} L${X(wx + 186)} ${Y(-300)} L${X(wx + 560)} ${Y(500)} L${X(wx + 160)} ${Y(500)}Z`} fill="#FFF4D2" opacity={.12 * draw * (1 - dusk)} />
    </g>)}
    {/* bookcases and pigeon-holes on the back wall; framed charts above */}
    <SR d={rect(X(-300), Y(-520), 820 * s, 600 * s)} mat="wood" t={.66} draw={draw} sw={1.4} />
    {Array.from({ length: 5 }, (_, r) => <g key={r}>
      <SR d={rect(X(-290), Y(-500 + r * 116), 800 * s, 12 * s)} mat="wood" t={.5} ang={0} draw={draw} sw={.8} />
      {Array.from({ length: 34 }, (_, b) => <rect key={b} x={X(-286 + b * 23.4)} y={Y(-488 + r * 116 + (b % 3) * 5)} width={19 * s} height={(98 - (b % 3) * 5) * s} fill={['#8C5A36', '#4F3020', '#A8743E', '#6A4430'][(b + r) % 4]} stroke={SEP} strokeWidth={.6} opacity={draw} />)}
    </g>)}
    {[[640, -500], [800, -470], [640, -300]].map(([fx, fy], i) => <g key={i}><SR d={rect(X(fx), Y(fy), 130 * s, 100 * s)} mat="wood" t={.5} draw={draw} sw={1.2} />
      <rect x={X(fx + 12)} y={Y(fy + 12)} width={106 * s} height={76 * s} fill="#1C2650" opacity={draw * .8} />{Array.from({ length: 12 }, (_, k) => <circle key={k} cx={X(fx + 18 + rnd(k + i * 9) * 94)} cy={Y(fy + 18 + rnd(k * 3 + i) * 64)} r={1.2} fill="#FFF4D2" opacity={draw} />)}</g>)}
    {/* the far table with its plate stands, then the near table */}
    <SR d={rect(X(-640), Y(160), 1300 * s, 26 * s)} mat="wood" t={.55} ang={0} draw={draw} sw={1.2} />
    {[-560, -340, -120, 100, 320, 540].map(px => <PlateStand key={px} x={X(px)} y={Y(160)} s={.8 * s} draw={draw} lit={1 - dusk} />)}
    <SR d={rect(X(-900), Y(420), 1900 * s, 40 * s)} mat="wood" t={.52} ang={0} draw={draw} sw={1.6} />
    <SR d={rect(X(-880), Y(460), 1860 * s, 70 * s)} mat="wood" t={.74} ang={0} draw={draw} sw={1.2} />
    {[-600, 300].map(px => <PlateStand key={px} x={X(px)} y={Y(420)} s={1.3 * s} draw={draw} lit={1 - dusk} />)}
    {/* ledgers, a stack of plate boxes */}
    <SR d={pathOf([[X(-360), Y(420)], [X(-150), Y(420)], [X(-170), Y(396)], [X(-340), Y(396)]], true)} mat="paper" t={.15} draw={draw} sw={1} hatch={0} />
    <Line d={`M${X(-255)} ${Y(396)} V${Y(420)}`} w={1} a={draw} />
    {[0, 1, 2, 3].map(i => <SR key={i} d={rect(X(620), Y(380 - i * 30), 160 * s, 30 * s)} mat="cloth" t={.45 + i * .05} ang={0} draw={draw} sw={1} />)}
    {/* the desk lamp at the near table */}
    <g opacity={draw}><circle cx={X(80)} cy={Y(330)} r={200 * s} fill="url(#glowW)" opacity={.5 * lamp} />
      <Line d={`M${X(80)} ${Y(420)} V${Y(330)}`} w={3 * s} /><SR d={`M${X(40)} ${Y(330)} L${X(120)} ${Y(330)} L${X(100)} ${Y(296)} L${X(60)} ${Y(296)}Z`} mat="leaf" t={.6} draw={draw} sw={1} />
      <ellipse cx={X(80)} cy={Y(332)} rx={30 * s} ry={6 * s} fill="#FFF4D2" opacity={lamp} /></g>
    {/* evening: the room cools and darkens */}
    {dusk > 0 && <rect x={X(-1200)} y={Y(-800)} width={2400 * s} height={1600 * s} fill="#141C38" opacity={dusk * .45} />}
    {empty > 0 && <g opacity={empty}><Floor x={X(-560)} y={Y(560)} rx={90 * s} ry={12 * s} a={.25} /></g>}
  </g>;
};

// ================================================================ BREATHING STARS IN THE LOUPE — Leavitt's lens on a plate (black dots on glass): three of the dots
// SWELL and FADE, each with its own period (the brightest the slowest); t = seconds (key it linearly), sort 0..1 lines them up by brightness.
const BreathingField: React.FC<{ x?: N; y?: N; r?: N; draw?: N; t?: N; sort?: N; cloud?: N; marks?: N; neg?: N }> = ({ x = 960, y = 540, r = 380, draw = 1, t = 0, sort = 0, cloud = 1, marks = 1, neg = 1 }) => {
  const st = useMemo(() => starField(61, 340, -1, -1, 2, 2, 2.4), []), id = 'brf' + Math.round(x);
  const V: [N, N, N, N][] = [[-.42, .24, 7.5, 1.4], [.1, -.3, 11, 2.6], [.4, .3, 15, 4.2]];   // [u, v, size at max, period s]
  const rowX = [-.5, 0, .5];
  return <g opacity={Math.min(1, draw * 1.4)}>
    <circle cx={x} cy={y} r={r * 1.2} fill="#000" opacity={.3} filter="url(#b8)" />
    <defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill={neg ? '#EEF1E6' : '#141C38'} />
      {cloud > 0 && <ellipse cx={x - r * .1} cy={y + r * .05} rx={r * .8} ry={r * .5} fill="#2B1D12" opacity={.12 * cloud} filter="url(#b30)" />}
      {st.map(([u, v, sr], i) => <circle key={i} cx={x + u * r} cy={y + v * r} r={sr * 1.3} fill={neg ? '#1A120B' : '#FFF4D2'} opacity={(.55 + rnd(i) * .4) * (1 - sort * .85)} />)}
      {V.map(([u, v, sz, per], i) => { const b = .55 + .45 * Math.sin(t * Math.PI * 2 / per), px = lerp(x + u * r, x + rowX[i] * r, sort), py = lerp(y + v * r, y, sort), rr2 = sz * (.55 + .45 * b);
        return <g key={i}><circle cx={px} cy={py} r={rr2 * 2.2} fill={neg ? '#2B1D12' : '#FFF4D2'} opacity={.12 * b} /><circle cx={px} cy={py} r={rr2} fill={neg ? '#1A120B' : '#FFF4D2'} />
          {marks > 0 && sort < .5 && <g opacity={marks * (1 - sort * 2)}><line x1={px - 22} y1={py - 18} x2={px - 12} y2={py - 10} stroke="#8C3424" strokeWidth={1.6} /><line x1={px + 22} y1={py - 18} x2={px + 12} y2={py - 10} stroke="#8C3424" strokeWidth={1.6} /></g>}</g>; })}
    </g>
    <circle cx={x} cy={y} r={r * 1.06} fill="none" stroke="url(#gold)" strokeWidth={r * .12} /><Ink d={ell(x, y, r * 1.12, r * 1.12)} w={1.8} draw={draw} /><Ink d={ell(x, y, r, r)} w={1.2} draw={draw} />
  </g>;
};

// ================================================================ LEAVITT'S GRAPH (1912, Table I = X-01) — the 25 Cepheids of the Small Magellanic Cloud: brightness at
// maximum against the logarithm of the period, on squared paper; pts 0..1 inks the points in order, line 0..1 lays the ruled line through them.
const LV: [N, N][] = [[1.25336, 14.8], [1.6637, 14.8], [1.762, 14.8], [1.87502, 15.1], [2.17352, 14.7], [2.913, 14.4], [3.501, 14.7], [4.2897, 14.6], [4.547, 14.3], [4.9866, 14.3],
  [5.311, 14.4], [5.323, 14.3], [6.2926, 13.8], [6.65, 14.1], [7.483, 14.0], [8.397, 13.9], [10.336, 13.6], [11.645, 13.4], [12.417, 13.8], [13.08, 13.4], [13.47, 13.4], [16.75, 13.6], [31.94, 12.2], [65.8, 11.4], [127.0, 11.2]];
const LeavittGraph: React.FC<{ x?: N; y?: N; w?: N; h?: N; draw?: N; pts?: N; line?: N; lift?: N; glow?: N }> = ({ x = 960, y = 540, w = 1000, h = 640, draw = 1, pts = 1, line = 1, lift = 0, glow = 0 }) => {
  const x0 = x - w / 2, y0 = y - h / 2, px = (p: N) => x0 + 80 + (Math.log10(p) / 2.2) * (w - 120), py = (m: N) => y0 + 30 + ((m - 11) / 4.4) * (h - 110);
  const fit = useMemo(() => { const xs = LV.map(p => Math.log10(p[0])), ys = LV.map(p => p[1]), n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    const b = xs.reduce((a, xi, i) => a + (xi - mx) * (ys[i] - my), 0) / xs.reduce((a, xi) => a + (xi - mx) ** 2, 0); return [my - b * mx, b]; }, []);
  const l0: Pt = [px(1.1), py(fit[0] + fit[1] * Math.log10(1.1))], l1: Pt = [px(150), py(fit[0] + fit[1] * Math.log10(150))];
  return <g opacity={draw}>
    <g opacity={1 - lift}>
      <SR d={rect(x0 - 20, y0 - 20, w + 40, h + 40)} mat="paper" t={.08} draw={draw} sw={1.3} hatch={0} />
      {Array.from({ length: 21 }, (_, i) => <line key={'v' + i} x1={x0 + 80 + i * (w - 120) / 20} y1={y0 + 30} x2={x0 + 80 + i * (w - 120) / 20} y2={y0 + h - 80} stroke="#8C6E4A" strokeWidth={i % 5 ? .5 : 1} opacity={.5} />)}
      {Array.from({ length: 12 }, (_, i) => <line key={'h' + i} x1={x0 + 80} y1={y0 + 30 + i * (h - 110) / 11} x2={x0 + w - 40} y2={y0 + 30 + i * (h - 110) / 11} stroke="#8C6E4A" strokeWidth={i % 5 ? .5 : 1} opacity={.5} />)}
      <Ink d={`M${x0 + 80} ${y0 + 30} V${y0 + h - 80} H${x0 + w - 40}`} w={1.8} draw={draw} />
      <Fell x={x0 + w / 2 + 40} y={y0 + h - 34} s={30} t="the longer the period →" italic />
      <Fell x={x0 + 34} y={y0 + h / 2 - 20} s={30} t="← brighter" italic rot={-90} />
      {LV.map(([p, m], i) => i / LV.length < pts ? <g key={i}><circle cx={px(p)} cy={py(m)} r={7} fill="#1A120B" /><circle cx={px(p)} cy={py(m)} r={11} fill="none" stroke={SEP} strokeWidth={.8} opacity={.5} /></g> : null)}
    </g>
    {line > 0 && <g transform={`translate(0 ${-lift * 140})`}>
      {glow > 0 && <path d={`M${l0[0]} ${l0[1]} L${l1[0]} ${l1[1]}`} stroke="#F7E3A0" strokeWidth={22} opacity={glow * .5} filter="url(#b8)" />}
      <path d={`M${l0[0]} ${l0[1]} L${l1[0]} ${l1[1]}`} stroke={glow > .5 ? '#D9AE4C' : '#8C3424'} strokeWidth={3.4} pathLength={1} strokeDasharray={`${line} 1`} />
    </g>}
  </g>;
};

// ================================================================ THE RULER OF LIGHT — a bar of gold light marked in beats, a breathing star at its head; len 0..1 = how
// far it is laid out from (x, y) toward angle `ang`.
const LightRuler: React.FC<{ x?: N; y?: N; L?: N; ang?: N; draw?: N; len?: N; t?: N; star?: N; ticks?: N }> = ({ x = 300, y = 600, L = 1300, ang = -10, draw = 1, len = 1, t = 0, star = 1, ticks = 24 }) => {
  const b = .55 + .45 * Math.sin(t * Math.PI * 2 / 2.4);
  return <g opacity={draw} transform={`rotate(${ang} ${x} ${y})`}>
    <rect x={x} y={y - 16} width={L * len} height={32} rx={6} fill="#F7E3A0" opacity={.3} filter="url(#b8)" />
    <rect x={x} y={y - 9} width={L * len} height={18} rx={3} fill="url(#gold)" stroke={SEP} strokeWidth={1.2} />
    {Array.from({ length: ticks + 1 }, (_, i) => i / ticks <= len ? <line key={i} x1={x + i * L / ticks} y1={y - 9} x2={x + i * L / ticks} y2={y + (i % 4 ? 2 : 9)} stroke={SEP} strokeWidth={i % 4 ? .9 : 1.6} /> : null)}
    {star > 0 && <g opacity={star}><circle cx={x} cy={y} r={40 + 30 * b} fill="url(#glowW)" /><Star x={x} y={y} r={6 + 4 * b} glow={b} rays={.6} /></g>}
  </g>;
};

// ================================================================ A STANDARD CANDLE DOWN A DARK ROAD — a lane at night between hedges, milestones 1, 2, 4; the candle
// (far 0..1 along the road) dims as the square of its distance. hand 0..1 = the hand that carries it.
const CandleRoad: React.FC<{ x?: N; y?: N; draw?: N; far?: N; hand?: N; stones?: N }> = ({ x = 960, y = 540, draw = 1, far = 0, hand = 1, stones = 1 }) => {
  const vp: Pt = [x + 80, y - 150], P = (k: N): [N, N, N] => { const z = 1 + k * 9, s = 1 / z; return [lerp(vp[0], x - 120, s), lerp(vp[1], y + 420, s), s]; };
  const [cx, cy, cs] = P(far), lum = 1 / Math.pow(1 + far * 9, 2) * 1;
  return <g opacity={draw}>
    <NightWash x={-200} y={-200} w={2320} h={1480} seed="crd" top="#0B1030" bot="#1C2650" />
    {starField(12, 90, -200, -200, 2320, 520, 2).map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r * .8} a={.7} />)}
    <SR d={`M-200 ${vp[1] + 20} C400 ${vp[1] + 10} 900 ${vp[1]} ${vp[0]} ${vp[1]} C1300 ${vp[1]} 1700 ${vp[1] + 10} 2120 ${vp[1] + 30} V1300 H-200Z`} mat="night" t={.6} draw={draw} sw={1} hatch={0} />
    <path d={`M${vp[0] - 2} ${vp[1]} L${x - 700} 1300 L${x + 520} 1300 L${vp[0] + 2} ${vp[1]}Z`} fill="#22305A" stroke={SEP} strokeWidth={1} />
    {[-1, 1].map(sd => <SR key={sd} d={`M${vp[0] + sd * 6} ${vp[1] - 4} L${sd < 0 ? x - 720 : x + 540} 1300 L${sd < 0 ? -200 : 2120} 1300 L${sd < 0 ? -200 : 2120} ${vp[1] + 60}Z`} mat="night" t={.8} draw={draw} sw={1} />)}
    {stones > 0 && [[.12, '1'], [.3, '2'], [.62, '4']].map(([k, n], i) => { const [mx, my, ms] = P(k as N); const sx = mx - 260 * ms - 40; return <g key={i} opacity={stones}>
      <SR d={`M${sx - 28 * ms * 3} ${my} V${my - 70 * ms * 3} Q${sx} ${my - 100 * ms * 3} ${sx + 28 * ms * 3} ${my - 70 * ms * 3} V${my}Z`} mat="stone" t={.5} draw={draw} sw={1} />
      <text x={sx} y={my - 34 * ms * 3} fontSize={44 * ms * 3} fontFamily="'IM Fell English', serif" fill={SEP} textAnchor="middle">{n}</text></g>; })}
    {/* the candle, held up */}
    <g transform={`translate(${cx} ${cy}) scale(${cs})`}>
      <circle cx={0} cy={-150} r={260} fill="url(#glowW)" opacity={.9 * Math.max(.15, Math.sqrt(lum))} />
      {hand > 0 && <g opacity={hand}><SR d="M-30 60 C-40 0 -36 -40 -20 -60 L30 -60 C40 -30 44 20 36 60Z" mat="skin" t={.5} draw={1} sw={1.4} /><SR d="M-36 60 L40 60 L60 240 L-60 240Z" mat="cloth" t={.7} draw={1} sw={1.4} /></g>}
      <SR d="M-50 -60 C-50 -76 50 -76 50 -60 L40 -50 L-40 -50Z" mat="brass" t={.45} draw={1} sw={1.2} />
      <SR d={rect(-14, -170, 28, 112)} mat="paper" t={.12} draw={1} sw={1.2} />
      <path d="M0 -230 C14 -200 12 -178 0 -176 C-12 -178 -14 -200 0 -230Z" fill="#F7E3A0" stroke={SEP} strokeWidth={1} />
    </g>
  </g>;
};

export const ART_B: Record<string, React.FC<any>> = { MilkyWayBand, GlassPlateSky, HarvardPlateRoom, BreathingField, LeavittGraph, LightRuler, CandleRoad };
