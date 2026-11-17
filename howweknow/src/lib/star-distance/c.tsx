// star-distance — ACT III drawings: the spiral nebula that curls into a question, the 1920 debate hall, Mount Wilson's dome and the
// 100-inch Hooker telescope (P-04, R-03: the open lattice tube on its yoke), Hubble's light table with plate H335H (P-01: the dark smudge,
// the "N" struck through, VAR! in red), Andromeda as an engraving, the storm of galaxies, the prism's strip, the train's whistle,
// the rising loaf, Lemaître's study, Hubble's 1929 diagram (X-02), Gaia (drawn from _ref P-10), and the sky of a billion ticks.
import React, { useMemo } from 'react';
import { Line, Ink, Stipple, SEP, ell, SR, Ball, Star, starField, NightWash, Floor, Fell, Hand, N, Pt, f1, cl, ph, lerp, rect, rr, pathOf, rnd } from './kit';

// ================================================================ THE SPIRAL NEBULA — two engraved arms of stipple round a bright core (as the 19th-century observers drew
// them); q 0..1 = one arm unwinds and curls into a question mark (the other fades).
const SpiralNebula: React.FC<{ x?: N; y?: N; r?: N; draw?: N; rot?: N; q?: N; tilt?: N; night?: N }> = ({ x = 960, y = 540, r = 300, draw = 1, rot = 0, q = 0, tilt = .7, night = 0 }) => {
  const M = 46, arm = (k: N): Pt[] => Array.from({ length: M }, (_, i) => { const t = i / (M - 1), a = t * 3.6 + k * Math.PI, rr2 = r * (.08 + .92 * Math.pow(t, 1.2)); return [Math.cos(a) * rr2, Math.sin(a) * rr2 * tilt]; });
  const qm: Pt[] = Array.from({ length: M }, (_, i) => { const t = i / (M - 1); if (t < .62) { const a = Math.PI * (1.1 - t / .62 * 1.55); return [Math.cos(a) * r * .55, -r * .35 + Math.sin(a) * -r * .5]; } const u = (t - .62) / .38; return [lerp(r * .02, 0, u), lerp(-r * .02, r * .55, u)]; });
  const A = arm(0), B = arm(1), Aq = A.map((p, i) => [lerp(p[0], qm[M - 1 - i][0], q), lerp(p[1], qm[M - 1 - i][1], q)] as Pt);
  const dots = useMemo(() => Array.from({ length: 900 }, (_, i) => { const t = Math.pow(rnd(i), .8), k = i % 2, a = t * 3.6 + k * Math.PI + (rnd(i + 7) - .5) * .5, rr2 = r * (.08 + .92 * Math.pow(t, 1.2)) + (rnd(i + 3) - .5) * r * .12; return [Math.cos(a) * rr2, Math.sin(a) * rr2 * tilt, k] as [N, N, N]; }), [r, tilt]);
  const col = night ? '#FFF4D2' : SEP;
  return <g opacity={draw} transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse cx={0} cy={0} rx={r * .5} ry={r * .5 * tilt} fill={night ? '#F7E3A0' : '#C9AE84'} opacity={.25 * (1 - q)} filter="url(#b30)" />
    {dots.map(([dx, dy, k], i) => <circle key={i} cx={f1(dx)} cy={f1(dy)} r={.9 + rnd(i) * 1.2} fill={col} opacity={(.5 + rnd(i + 1) * .4) * (1 - q)} />)}
    <path d={pathOf(B)} fill="none" stroke={col} strokeWidth={2} opacity={.7 * (1 - q)} />
    <path d={pathOf(Aq)} fill="none" stroke={q > .3 ? '#D2643E' : col} strokeWidth={2 + q * 5} strokeLinecap="round" opacity={.8} />
    {q > .9 && <circle cx={0} cy={r * .72} r={9} fill="#D2643E" opacity={(q - .9) * 10} />}
    <circle cx={0} cy={0} r={r * .05 * (1 - q)} fill={night ? '#FFF4D2' : SEP} />
  </g>;
};

// ================================================================ THE DEBATE HALL (Washington, 26 April 1920) — a panelled lecture hall seen from the back rows: a
// stage with two lecterns facing each other, a lantern screen between them showing a spiral, a chandelier; the audience in the dark.
const DebateHall: React.FC<{ x?: N; y?: N; s?: N; draw?: N; slide?: N; chand?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, slide = 1, chand = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="wood" t={.72} draw={draw} sw={0} hatch={0} rim={false} />
    {Array.from({ length: 12 }, (_, i) => <g key={i}><SR d={rect(X(-1000 + i * 175), Y(-480), 20 * s, 620 * s)} mat="wood" t={.55} ang={90} draw={draw} sw={1} />
      <Ink d={rect(X(-970 + i * 175), Y(-440), 120 * s, 220 * s)} w={.8} draw={draw} /></g>)}
    {/* the stage */}
    <SR d={rect(X(-900), Y(120), 1800 * s, 40 * s)} mat="wood" t={.5} ang={0} draw={draw} sw={1.4} />
    <SR d={rect(X(-900), Y(160), 1800 * s, 140 * s)} mat="wood" t={.78} ang={0} draw={draw} sw={1.2} />
    {/* the screen with the lantern slide of a spiral */}
    <SR d={rect(X(-200), Y(-420), 400 * s, 300 * s)} mat="paper" t={.08} draw={draw} sw={1.4} hatch={0} />
    <g opacity={slide * draw}><SpiralNebula x={x} y={Y(-270)} r={110 * s} night={0} /></g>
    {/* two lecterns, facing */}
    {[-1, 1].map(k => <g key={k}><SR d={pathOf([[X(k * 560 - 70), Y(120)], [X(k * 560 + 70), Y(120)], [X(k * 560 + 54), Y(-40)], [X(k * 560 - 54), Y(-40)]], true)} mat="wood" t={.55} draw={draw} sw={1.4} />
      <SR d={pathOf([[X(k * 560 - 80), Y(-40)], [X(k * 560 + 80), Y(-40)], [X(k * 560 + 70 - k * 20), Y(-72)], [X(k * 560 - 70 - k * 20), Y(-72)]], true)} mat="wood" t={.45} draw={draw} sw={1.2} />
      <circle cx={X(k * 560)} cy={Y(-120)} r={90 * s} fill="url(#glowW)" opacity={.4 * draw} /></g>)}
    {/* chandelier */}
    {chand > 0 && <g opacity={chand * draw}><Line d={`M${x} ${Y(-700)} V${Y(-600)}`} w={2} />
      <SR d={`M${X(-120)} ${Y(-580)} Q${x} ${Y(-520)} ${X(120)} ${Y(-580)} L${X(100)} ${Y(-600)} Q${x} ${Y(-560)} ${X(-100)} ${Y(-600)}Z`} mat="brass" t={.45} draw={draw} sw={1.2} />
      {[-110, -55, 0, 55, 110].map(d => <g key={d}><Line d={`M${X(d)} ${Y(-590)} v${-24 * s}`} w={1.6} /><circle cx={X(d)} cy={Y(-620)} r={22 * s} fill="url(#glowW)" /><circle cx={X(d)} cy={Y(-618)} r={4 * s} fill="#F7E3A0" /></g>)}</g>}
    {/* the audience, heads and shoulders in the dark */}
    {Array.from({ length: 3 }, (_, r) => Array.from({ length: 16 }, (_, i) => { const hx = X(-1000 + i * 132 + (r % 2) * 66), hy = Y(380 + r * 110); return <g key={`${r}_${i}`}>
      <SR d={`M${hx - 56 * s} ${hy + 90 * s} C${hx - 54 * s} ${hy + 30 * s} ${hx + 54 * s} ${hy + 30 * s} ${hx + 56 * s} ${hy + 90 * s}Z`} mat="wall" t={.95} draw={draw} sw={1} hatch={0} />
      <SR d={ell(hx, hy, 26 * s, 32 * s)} mat="wall" t={.9} draw={draw} sw={1} hatch={0} /></g>; }))}
  </g>;
};

// ================================================================ MOUNT WILSON — mode 'out': the white dome on the ridge among pines, its shutter opening (open 0..1)
// on the night; mode 'in': the 100-inch Hooker inside (R-03, P-04): the great yoke, the open lattice tube tilted up to the slit, the
// observer's platform, a red darkroom lamp. tilt = degrees the tube is raised.
const HookerDome: React.FC<{ x?: N; y?: N; s?: N; draw?: N; mode?: string; open?: N; tilt?: N; rot?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, mode = 'out', open = 0, tilt = 0, rot = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  const sky = useMemo(() => starField(23, 220, -200, -200, 2320, 900, 2.4), []);
  if (mode === 'out') {
    const R = 300 * s, cx = x, cy = Y(60), sw = 70 * s * open, so = rot * 1.2 * s;
    return <g>
      <NightWash x={-200} y={-200} w={2320} h={1480} seed="mwn" a={draw} top="#0B1030" bot="#2B3B66" />
      {sky.map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r * .8} a={draw * .9} />)}
      <SR d={`M-200 ${Y(330)} C300 ${Y(260)} 700 ${Y(240)} ${x} ${Y(250)} C1300 ${Y(240)} 1700 ${Y(300)} 2120 ${Y(340)} V1300 H-200Z`} mat="night" t={.55} draw={draw} sw={1.2} />
      {Array.from({ length: 22 }, (_, i) => { const px = -150 + i * 105 + rnd(i) * 40, py = Y(300) + rnd(i + 3) * 60 - (Math.abs(px - x) < 380 ? 30 : 0), hh = (80 + rnd(i + 5) * 70) * s;
        return Math.abs(px - x) > 340 ? <g key={i}>{[0, 1, 2, 3].map(k => { const ty = py - hh * (k * .22), w = hh * (.32 - k * .06); return <SR key={k} d={`M${px} ${ty - hh * .36} C${px + w * .3} ${ty - hh * .2} ${px + w * .7} ${ty - hh * .05} ${px + w} ${ty} Q${px} ${ty - hh * .05} ${px - w} ${ty} C${px - w * .7} ${ty - hh * .05} ${px - w * .3} ${ty - hh * .2} ${px} ${ty - hh * .36}Z`} mat="night" t={.85} draw={draw} sw={.9} hatch={0} />; })}<Line d={`M${px} ${py} v${8}`} w={2} /></g> : null; })}
      {/* drum and dome */}
      <SR d={rect(cx - R, cy, 2 * R, 190 * s)} mat="paper" t={.3} ang={0} draw={draw} sw={1.6} />
      {[-.6, -.2, .2, .6].map(k => <rect key={k} x={cx + k * R - 14 * s} y={cy + 60 * s} width={28 * s} height={46 * s} fill="#1C2650" stroke={SEP} strokeWidth={1} opacity={draw} />)}
      <SR d={`M${cx - R - 10 * s} ${cy} A${R + 10 * s} ${R + 10 * s} 0 0 1 ${cx + R + 10 * s} ${cy}Z`} mat="paper" t={.22} draw={draw} sw={1.8} />
      {Array.from({ length: 9 }, (_, i) => { const u = (i - 4) / 4.4; return <Line key={i} d={`M${cx + u * R} ${cy} Q${cx + u * R * .9} ${cy - R * .7} ${cx + u * 40 * s} ${cy - R}`} w={.9} a={.5 * draw} />; })}
      {/* the shutter: a slot from the top down the front, opening */}
      <SR d={rect(cx + so - sw / 2 - 18 * s, cy - R - 6 * s, sw + 36 * s, R * .95)} mat="stone" t={.42} draw={draw} sw={1.2} />
      {open > 0 && <g opacity={draw}><rect x={cx + so - sw / 2} y={cy - R} width={sw} height={R * .9} fill="#0B1030" />{Array.from({ length: 6 }, (_, i) => <Star key={i} x={cx + so + (rnd(i) - .5) * sw * .8} y={cy - R + 20 + rnd(i + 2) * R * .8} r={1.4} />)}</g>}
      <Floor x={cx} y={cy + 196 * s} rx={R * 1.2} ry={24 * s} a={.4 * draw} />
    </g>;
  }
  // inside
  const pv: Pt = [X(0), Y(120)], T = (-62 - tilt) * Math.PI / 180, L = 900 * s, ux = Math.cos(T), uy = Math.sin(T);
  const end: Pt = [pv[0] + ux * L, pv[1] + uy * L], tail: Pt = [pv[0] - ux * 260 * s, pv[1] - uy * 260 * s], nx = -uy, ny = ux, hw = 120 * s;
  const lat = (p: N, q: N): Pt => [lerp(tail[0], end[0], p) + nx * hw * q, lerp(tail[1], end[1], p) + ny * hw * q];
  return <g>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="night" t={.7} draw={draw} sw={0} hatch={0} rim={false} />
    {Array.from({ length: 15 }, (_, i) => { const u = (i - 7) / 7; return <Line key={i} d={`M${X(u * 1100)} ${Y(300)} Q${X(u * 820)} ${Y(-380)} ${X(u * 160)} ${Y(-720)}`} w={2.2} col="#5A6E9A" a={.7 * draw} />; })}
    {[-100, -360].map((h, i) => <Line key={i} d={`M${X(-1100)} ${Y(h + 300)} Q${x} ${Y(h - 200)} ${X(1100)} ${Y(h + 300)}`} w={1.6} col="#5A6E9A" a={.6 * draw} />)}
    {/* the slit with the sky */}
    <rect x={X(170)} y={Y(-720)} width={260 * s} height={760 * s} fill="#0B1030" opacity={draw * open} />
    {starField(3, 30, 0, 0, 260, 760, 2).map(([u, v, r], i) => <Star key={i} x={X(170) + u * s} y={Y(-720) + v * s} r={r} a={draw * open} />)}
    {/* the yoke: two great beams along the polar axis, joined at both ends */}
    <SR d={pathOf([[X(-600), Y(540)], [X(-540), Y(540)], [X(120), Y(-200)], [X(60), Y(-200)]], true)} mat="night" t={.55} draw={draw} sw={1.6} hatch={0} />
    <SR d={pathOf([[X(-280), Y(580)], [X(-220), Y(580)], [X(380), Y(-120)], [X(320), Y(-120)]], true)} mat="night" t={.45} draw={draw} sw={1.6} hatch={0} />
    <SR d={pathOf([[X(-640), Y(520)], [X(-180), Y(600)], [X(-170), Y(640)], [X(-650), Y(560)]], true)} mat="night" t={.6} draw={draw} sw={1.4} hatch={0} />
    {/* the tube: an open square lattice, mirror cell at the bottom, the cage at the top */}
    <SR d={pathOf([lat(0, -1.1), lat(0, 1.1), lat(.18, 1.1), lat(.18, -1.1)], true)} mat="sky" t={.55} draw={draw} sw={1.6} />
    {[-1, 1].map(q => <Line key={q} d={`M${lat(.18, q)[0]} ${lat(.18, q)[1]} L${lat(.92, q)[0]} ${lat(.92, q)[1]}`} w={4 * s} col="#4A88AE" a={draw} />)}
    {Array.from({ length: 8 }, (_, i) => { const a = .18 + i * .093, b = a + .093; return <g key={i}><Line d={`M${lat(a, -1)[0]} ${lat(a, -1)[1]} L${lat(b, 1)[0]} ${lat(b, 1)[1]} M${lat(a, 1)[0]} ${lat(a, 1)[1]} L${lat(b, -1)[0]} ${lat(b, -1)[1]}`} w={2 * s} col="#4A88AE" a={draw} />
      <Line d={`M${lat(b, -1)[0]} ${lat(b, -1)[1]} L${lat(b, 1)[0]} ${lat(b, 1)[1]}`} w={2.6 * s} col="#22507A" a={draw} /></g>; })}
    <SR d={pathOf([lat(.92, -1.15), lat(.92, 1.15), lat(1, 1.15), lat(1, -1.15)], true)} mat="sky" t={.6} draw={draw} sw={1.4} />
    <Ball x={pv[0]} y={pv[1]} r={40 * s} mat="stone" t={.5} draw={draw} />
    {/* the observing platform and its rail; the red lamp */}
    <SR d={rect(X(380), Y(330), 700 * s, 30 * s)} mat="stone" t={.6} ang={0} draw={draw} sw={1.2} />
    {Array.from({ length: 8 }, (_, i) => <Line key={i} d={`M${X(400 + i * 90)} ${Y(330)} v${-110 * s}`} w={1.8} a={draw} />)}
    <Line d={`M${X(390)} ${Y(220)} H${X(1080)} M${X(390)} ${Y(270)} H${X(1080)}`} w={2} a={draw} />
    <circle cx={X(720)} cy={Y(160)} r={180 * s} fill="#D2643E" opacity={.18 * draw} filter="url(#b30)" /><circle cx={X(720)} cy={Y(160)} r={10 * s} fill="#F2A672" opacity={draw} />
  </g>;
};

// ================================================================ HUBBLE'S LIGHT TABLE — plate H335H (P-01) on a glowing table: the dark smudge of Andromeda's core
// lower left, star points, the new point (pt = its size), the "N" he wrote (n 0..1), struck through (strike 0..1), VAR! in red written
// letter by letter (v 0..4), the date (date 0..1). glow = the lamp under the frosted glass.
const LightTable: React.FC<{ x?: N; y?: N; s?: N; draw?: N; glow?: N; pt?: N; n?: N; strike?: N; v?: N; date?: N; px?: N; py?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, glow = 1, pt = 1, n = 0, strike = 0, v = 0, date = 0, px = 140, py = -60 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, P = 300 * s;
  const st = useMemo(() => starField(97, 160, -1, -1, 2, 2, 2.2), []);
  const vx = X(130), vy = Y(-230);
  return <g>
    <Floor x={x} y={Y(470)} rx={620 * s} ry={30 * s} a={.4 * draw} />
    <SR d={rr(X(-520), Y(-420), 1040 * s, 840 * s, 14 * s)} mat="wood" t={.6} ang={0} draw={draw} sw={1.8} />
    <rect x={X(-460)} y={Y(-370)} width={920 * s} height={740 * s} fill="#FBF4E2" stroke={SEP} strokeWidth={1.2} opacity={draw} />
    <rect x={X(-460)} y={Y(-370)} width={920 * s} height={740 * s} fill="#FFF4D2" opacity={.6 * glow * draw} />
    {[-1, 1].map(k => <circle key={k} cx={X(k * 490)} cy={Y(-390)} r={8 * s} fill="url(#gold)" stroke={SEP} opacity={draw} />)}
    {/* the plate */}
    <g opacity={draw}>
      <rect x={x - P - 30} y={y - P - 30} width={2 * P + 60} height={2 * P + 60} fill="#FFF4D2" opacity={.7 * glow} filter="url(#b8)" />
      <rect x={x - P} y={y - P} width={2 * P} height={2 * P} fill="#F6F4EC" stroke={SEP} strokeWidth={1.2} />
      <rect x={x - P + 8} y={y - P + 8} width={2 * P - 16} height={2 * P - 16} fill="none" stroke="#9CCAD6" strokeWidth={5} opacity={.45} />
      <path d={`M${x - P} ${y - P} L${x - P + 8} ${y - P + 8} M${x + P} ${y - P} L${x + P - 8} ${y - P + 8} M${x - P} ${y + P} L${x - P + 8} ${y + P - 8} M${x + P} ${y + P} L${x + P - 8} ${y + P - 8}`} stroke={SEP} strokeWidth={1} />
      <defs><radialGradient id="h335" cx=".3" cy=".66" r=".5"><stop offset="0" stopColor="#1A120B" stopOpacity={.95} /><stop offset=".18" stopColor="#2B1D12" stopOpacity={.55} /><stop offset=".6" stopColor="#2B1D12" stopOpacity={.1} /><stop offset="1" stopColor="#2B1D12" stopOpacity={0} /></radialGradient></defs>
      <ellipse cx={x - P * .4} cy={y + P * .3} rx={P * 1.1} ry={P * .8} fill="url(#h335)" opacity={.7} transform={`rotate(-30 ${x - P * .4} ${y + P * .3})`} />
      {st.map(([u, w2, r], i) => <circle key={i} cx={x + u * P * .96} cy={y + w2 * P * .96} r={r * .8} fill="#1A120B" opacity={.75} />)}
      <circle cx={X(px)} cy={Y(py)} r={(2 + 4 * pt) * s} fill="#1A120B" />
      {n > 0 && <g><Hand x={X(px + 40)} y={Y(py + 12)} s={40 * s} t="N" a={n} />
        {strike > 0 && <path d={`M${X(px + 26)} ${Y(py + 18)} L${X(px + 58)} ${Y(py - 22)}`} stroke="#B8432A" strokeWidth={4 * s} pathLength={1} strokeDasharray={`${strike} 1`} />}</g>}
      {v > 0 && <g>{['V', 'A', 'R', '!'].map((c, i) => <Hand key={i} x={vx + i * 46 * s} y={vy} s={70 * s} t={c} col="#B8432A" a={cl(v - i)} />)}
        {v > 3.5 && <circle cx={vx + 3 * 46 * s} cy={vy - 22 * s} r={40 * s} fill="#F2A672" opacity={(v - 3.5) * .4} filter="url(#b8)" />}</g>}
      {date > 0 && <Hand x={X(90)} y={Y(-40)} s={34 * s} t="6 Oct 1923" a={date} />}
    </g>
    <path d={`M${X(-300)} ${Y(-300)} L${X(-200)} ${Y(-300)} L${X(-380)} ${Y(300)} L${X(-480)} ${Y(300)}Z`} fill="#FFFDF4" opacity={.12 * draw} />
  </g>;
};

// ================================================================ ANDROMEDA, ENGRAVED — a tilted disc of stipple and dark dust lanes round a bright core, its two small
// companions; one star in an outer arm BREATHES (beat 0..1 shows it; t = seconds, period 2.4 s on screen).
const AndromedaEngraving: React.FC<{ x?: N; y?: N; r?: N; draw?: N; rot?: N; beat?: N; ph?: N; bx?: N; by?: N; ring?: N }> = ({ x = 960, y = 540, r = 520, draw = 1, rot = -36, beat = 0, ph: t = 0, bx = .55, by = -.12, ring = 0 }) => {
  const dots = useMemo(() => Array.from({ length: 2400 }, (_, i) => { const rr2 = Math.pow(rnd(i), .7), a = rnd(i + 9) * Math.PI * 2; return [Math.cos(a) * rr2, Math.sin(a) * rr2 * .32, rr2] as [N, N, N]; }), []);
  const b = .55 + .45 * Math.sin(t * Math.PI * 2 / 2.4), bsx = x + bx * r, bsy = y + by * r;
  return <g opacity={draw}>
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse cx={0} cy={0} rx={r} ry={r * .34} fill="#F7E3A0" opacity={.12} filter="url(#b30)" />
      <ellipse cx={0} cy={0} rx={r * .32} ry={r * .14} fill="#FFF4D2" opacity={.4} filter="url(#b30)" />
      {dots.map(([dx, dy, k], i) => <circle key={i} cx={f1(dx * r)} cy={f1(dy * r)} r={.7 + (1 - k) * 1.2} fill="#FFF4D2" opacity={(.25 + (1 - k) * .6) * (.5 + rnd(i + 2) * .5)} />)}
      {[.42, .6, .78].map((k, i) => <ellipse key={i} cx={r * .03} cy={0} rx={r * k} ry={r * k * .3} fill="none" stroke="#0B1030" strokeWidth={8 + i * 5} opacity={.26} filter="url(#b8)" />)}
      <circle cx={0} cy={0} r={r * .03} fill="#FFFDF4" />
    </g>
    <ellipse cx={x + r * .12} cy={y + r * .26} rx={r * .05} ry={r * .04} fill="#FFF4D2" opacity={.5} filter="url(#b8)" />
    <ellipse cx={x - r * .5} cy={y - r * .5} rx={r * .1} ry={r * .045} fill="#FFF4D2" opacity={.35} filter="url(#b8)" transform={`rotate(-50 ${x - r * .5} ${y - r * .5})`} />
    {beat > 0 && <g opacity={beat}><circle cx={bsx} cy={bsy} r={20 + 26 * b} fill="url(#glowW)" /><Star x={bsx} y={bsy} r={3 + 3 * b} glow={b} rays={.6} /></g>}
    {ring > 0 && <path d={ell(bsx, bsy, 70, 70)} fill="none" stroke="url(#gold)" strokeWidth={10} pathLength={1} strokeDasharray={`${ring} 1`} />}
  </g>;
};

// ================================================================ A STORM OF GALAXIES — hundreds of small engraved galaxies (spirals face-on, edge-on, ellipticals) on
// the deep; spread scales their distances from the centre (the universe expanding / run backwards), red 0..1 shifts them to vermilion,
// mw = our Milky Way's size at the centre (1 = filling the frame, 0 = one swirl among the rest), ring = a red ring round ours.
const Gal: React.FC<{ x: N; y: N; r: N; kind: N; rot: N; col: string; a: N }> = ({ x, y, r, kind, rot, col, a }) => <g opacity={a} transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(1 ${kind === 1 ? .28 : kind === 2 ? .72 : .6})`}>
  <circle r={r * 1.25} fill={col} opacity={.12} />
  <circle r={r * .7} fill={col} opacity={.22} />
  {kind !== 2 && [0, 1].map(k => <path key={k} d={`M${r * .08 * (k ? -1 : 1)} 0 C${r * .5 * (k ? -1 : 1)} ${-r * .15 * (k ? -1 : 1)} ${r * .55 * (k ? -1 : 1)} ${r * .6 * (k ? -1 : 1)} ${r * .05 * (k ? -1 : 1)} ${r * .8 * (k ? -1 : 1)} C${-r * .45 * (k ? -1 : 1)} ${r * .95 * (k ? -1 : 1)} ${-r * .95 * (k ? -1 : 1)} ${r * .5 * (k ? -1 : 1)} ${-r * 1.05 * (k ? -1 : 1)} ${r * .05 * (k ? -1 : 1)}`} stroke={col} strokeWidth={Math.max(.5, r / 7)} fill="none" opacity={.75} strokeLinecap="round" />)}
  {kind === 1 && <line x1={-r} y1={r * .1} x2={r} y2={r * .1} stroke="#0B1030" strokeWidth={Math.max(.6, r / 5)} opacity={.6} />}
  <circle r={Math.max(.9, r * .16)} fill="#FFFDF4" />
</g>;
const GalaxyStorm: React.FC<{ x?: N; y?: N; draw?: N; spread?: N; red?: N; mw?: N; ring?: N; n?: N; streak?: N; point?: N; sky?: N }> = ({ x = 960, y = 540, draw = 1, spread = 1, red = 0, mw = 0, ring = 0, n = 420, streak = 0, point = 0, sky = 1 }) => {
  const G = useMemo(() => Array.from({ length: n }, (_, i) => { const a = rnd(i * 1.1) * Math.PI * 2, d = Math.pow(rnd(i * 2.7), .6) * 1300; return [Math.cos(a) * d, Math.sin(a) * d * .7, 3 + Math.pow(rnd(i * 3.3), 3) * 22, Math.floor(rnd(i * 4.1) * 3), rnd(i * 5.9) * 180] as [N, N, N, N, N]; }).map(g => [g[0], g[1], g[2] * (1.6 - Math.hypot(g[0], g[1]) / 1300), g[3], g[4]] as [N, N, N, N, N]), [n]);
  const col = (i: N) => red > 0 ? (red * (.6 + rnd(i) * .4) > .5 ? '#F2A672' : '#F7E3A0') : '#F7E3A0', mwr = lerp(44, 900, mw);
  return <g opacity={draw}>
    {sky > 0 && <NightWash x={-200} y={-200} w={2320} h={1480} seed="gst" a={sky} top="#0B1030" bot="#141C38" />}
    {G.map(([gx, gy, r, k, rot], i) => { const sx = x + gx * spread, sy = y + gy * spread; if (sx < -60 || sx > 1980 || sy < -60 || sy > 1140) return null;
      const dd = Math.hypot(gx, gy) / 1300, a = (1 - ph(mw, .2, .9) * (dd < .5 ? 1 : .4)) * (1 - point);
      return <g key={i}>{streak > 0 && <line x1={sx} y1={sy} x2={x + gx * spread * (1 - .08 * streak)} y2={y + gy * spread * (1 - .08 * streak)} stroke="#F7E3A0" strokeWidth={1} opacity={.4 * streak} />}<Gal x={sx} y={sy} r={r * Math.min(1.4, .6 + spread * .4)} kind={k} rot={rot} col={col(i)} a={a} /></g>; })}
    {/* our own galaxy */}
    {point < 1 && <g opacity={1 - point}><SpiralNebula x={x} y={y} r={mwr} night={1} rot={20} tilt={.55} draw={1} />
      {ring > 0 && <path d={ell(x, y, mwr * 1.3 + 30, mwr * .8 + 30)} fill="none" stroke="#D2643E" strokeWidth={5} pathLength={1} strokeDasharray={`${ring} 1`} />}</g>}
    {point > 0 && <g opacity={point}><circle cx={x} cy={y} r={60 + 140 * point} fill="url(#glowW)" /><Star x={x} y={y} r={6} glow={1} rays={1} /></g>}
  </g>;
};

// ================================================================ THE PRISM AND THE STRIP — a beam from a galaxy through a glass prism, painted out as a strip of colour
// (violet → red, in gouache bands) crossed by dark lines; shift 0..1 slides the lines toward the red end.
const SpectrumStrip: React.FC<{ x?: N; y?: N; w?: N; h?: N; draw?: N; shift?: N; prism?: N; beam?: N; paint?: N; lines?: N }> = ({ x = 1100, y = 600, w = 1000, h = 140, draw = 1, shift = 0, prism = 1, beam = 1, paint = 1, lines = 1 }) => {
  const x0 = x - w / 2, cols = ['#7E6AA8', '#4A88AE', '#5F8A5A', '#D9AE4C', '#E89A3E', '#D2643E', '#8C3424'];
  return <g opacity={draw}>
    {beam > 0 && <path d={`M${x0 - 700} ${y - 80} L${x0 - 300} ${y - 20}`} stroke="#FFF4D2" strokeWidth={6} opacity={beam} pathLength={1} strokeDasharray={`${beam} 1`} />}
    {prism > 0 && <g opacity={prism}><SR d={pathOf([[x0 - 340, y + 60], [x0 - 200, y + 60], [x0 - 270, y - 90]], true)} mat="sky" t={.2} draw={draw} sw={1.6} hatch={0} />
      <path d={`M${x0 - 260} ${y - 10} L${x0} ${y - h / 2} L${x0} ${y + h / 2}Z`} fill="#FFF4D2" opacity={.12 * paint} /></g>}
    <defs><clipPath id="sps"><rect x={x0} y={y - h / 2} width={w * paint} height={h} /></clipPath><linearGradient id="spg" x1="0" x2="1">{cols.map((c, i) => <stop key={i} offset={i / (cols.length - 1)} stopColor={c} />)}</linearGradient></defs>
    <g clipPath="url(#sps)"><rect x={x0} y={y - h / 2} width={w} height={h} fill="url(#spg)" opacity={.85} />
      <Stipple x={x0} y={y - h / 2} w={w} h={h} n={600} seed="spst" a={.3} />
      {lines > 0 && [.22, .34, .55, .6].map((u, i) => <rect key={i} x={x0 + (u + shift * .14) * w - 4} y={y - h / 2} width={i === 2 ? 5 : 8} height={h} fill="#1A120B" opacity={.85 * lines} />)}</g>
    <Ink d={rect(x0, y - h / 2, w * paint, h)} w={1.6} draw={draw} />
    <Fell x={x0} y={y + h / 2 + 46} s={32} t="violet" italic anchor="start" a={paint} /><Fell x={x0 + w} y={y + h / 2 + 46} s={32} t="red" italic anchor="end" a={paint} />
  </g>;
};

// ================================================================ THE TRAIN'S WHISTLE — a steam locomotive and tender crossing a plain (pos 0..1); its whistle's
// waves, each sent from where the engine was, bunch ahead of it and stretch out behind (the Doppler effect drawn true).
const TrainWhistle: React.FC<{ x?: N; y?: N; draw?: N; pos?: N; waves?: N }> = ({ x = 960, y = 640, draw = 1, pos = .5, waves = 1 }) => {
  const tx = lerp(-200, 2100, pos), ty = y, s = 1;
  const rings = Array.from({ length: 9 }, (_, i) => { const back = (i + 1) * .045, ex = lerp(-200, 2100, pos - back), r = back * 2300 * 1.6; return pos - back > -.1 ? [ex, r] as Pt : null; }).filter(Boolean) as Pt[];
  return <g opacity={draw}>
    <rect x={-200} y={-200} width={2320} height={y + 200} fill="#F0D9A8" />
    <circle cx={300} cy={y - 260} r={220} fill="url(#glowW)" opacity={.6} />
    <SR d={`M-200 ${y + 40} H2120 V1300 H-200Z`} mat="sand" t={.4} draw={draw} sw={1.2} hatch={0} />
    <Line d={`M-200 ${y + 46} H2120 M-200 ${y + 58} H2120`} w={2} />
    {Array.from({ length: 60 }, (_, i) => <Line key={i} d={`M${-200 + i * 40} ${y + 44} v18`} w={2.4} col="#4F3020" a={.8} />)}
    {waves > 0 && rings.map(([ex, r], i) => <g key={i} opacity={waves * (.7 - i * .06)}><path d={ell(ex + 200, ty - 120, r, r * .55)} fill="none" stroke="#8C3424" strokeWidth={1.6} /><path d={ell(ex + 200, ty - 120, r + 5, r * .55 + 3)} fill="none" stroke="#8C3424" strokeWidth={.7} strokeDasharray="3 4" /></g>)}
    <g transform={`translate(${tx} ${ty})`}>
      {/* an American 4-4-0 of the 1880s–1900s, engraved: tender with coal, cab, long boiler in bands, sand and steam domes, bell,
          balloon stack, headlamp, cowcatcher, cylinder and piston, two big drivers with counterweights, a four-wheel truck */}
      <SR d={rect(-470, -140, 200, 120)} mat="wall" t={.78} draw={draw} sw={1.4} />
      <SR d={`M-462 -140 Q-440 -176 -400 -168 Q-360 -186 -320 -166 Q-290 -178 -278 -140Z`} mat="night" t={.9} draw={draw} sw={1} hatch={0} />
      {[-430, -312].map(w => <g key={w}><circle cx={w} cy={2} r={24} fill="#4F3020" stroke={SEP} strokeWidth={1.4} />{Array.from({ length: 8 }, (_, k) => { const a = k / 8 * Math.PI * 2 + pos * 90; return <line key={k} x1={w} y1={2} x2={w + Math.cos(a) * 21} y2={2 + Math.sin(a) * 21} stroke={SEP} strokeWidth={1} />; })}</g>)}
      <SR d={rect(-262, -226, 132, 210)} mat="wall" t={.72} draw={draw} sw={1.4} />
      <SR d={`M-276 -226 L-116 -226 L-124 -244 L-268 -244Z`} mat="night" t={.85} draw={draw} sw={1.2} hatch={0} />
      <rect x={-240} y={-206} width={40} height={48} fill="#F0D9A8" stroke={SEP} /><rect x={-182} y={-206} width={34} height={48} fill="#F0D9A8" stroke={SEP} />
      <SR d={rr(-132, -168, 330, 104, 46)} mat="night" t={.68} ang={0} draw={draw} sw={1.6} />
      {[-90, -20, 50, 120].map(b => <SR key={b} d={rect(b, -170, 10, 108)} mat="brass" t={.45} draw={draw} sw={.8} hatch={0} />)}
      <SR d={`M-40 -168 C-40 -196 10 -196 10 -168Z`} mat="brass" t={.4} draw={draw} sw={1.2} />
      <SR d={`M60 -168 C60 -190 96 -190 96 -168Z`} mat="night" t={.8} draw={draw} sw={1.1} hatch={0} />
      <path d="M-6 -196 v-12 M-14 -208 h16" stroke={SEP} strokeWidth={2} />
      <SR d={`M150 -168 L144 -214 Q130 -250 176 -262 Q222 -250 208 -214 L202 -168Z`} mat="night" t={.82} draw={draw} sw={1.4} />
      <SR d={rect(196, -152, 36, 30)} mat="brass" t={.4} draw={draw} sw={1.1} /><circle cx={232} cy={-137} r={9} fill="#FFF4D2" stroke={SEP} />
      <SR d={pathOf([[198, -40], [198, -12], [270, 22], [250, -40]], true)} mat="wall" t={.7} draw={draw} sw={1.2} />
      {Array.from({ length: 5 }, (_, k) => <Line key={k} d={`M${206 + k * 10} -40 L${214 + k * 12} ${14}`} w={1} a={draw} />)}
      <SR d={rect(120, -70, 80, 40)} mat="night" t={.7} draw={draw} sw={1.2} />
      {[150, 196].map(w => <circle key={w} cx={w} cy={6} r={20} fill="#4F3020" stroke={SEP} strokeWidth={1.3} />)}
      {[-90, 20].map(w => <g key={w}><circle cx={w} cy={-14} r={52} fill="#6A4430" stroke={SEP} strokeWidth={1.8} /><circle cx={w} cy={-14} r={44} fill="none" stroke={SEP} strokeWidth={1} />
        {Array.from({ length: 14 }, (_, k) => { const a = k / 14 * Math.PI * 2 + pos * 50; return <line key={k} x1={w} y1={-14} x2={w + Math.cos(a) * 44} y2={-14 + Math.sin(a) * 44} stroke={SEP} strokeWidth={1.3} />; })}
        <path d={`M${w} -14 L${w + Math.cos(pos * 50 + 2) * 40} ${-14 + Math.sin(pos * 50 + 2) * 40} A40 40 0 0 1 ${w + Math.cos(pos * 50 + 3) * 40} ${-14 + Math.sin(pos * 50 + 3) * 40}Z`} fill="#2B1D12" opacity={.7} />
        <circle cx={w} cy={-14} r={7} fill="#D4A846" stroke={SEP} /></g>)}
      <Line d={`M${-90 + Math.cos(pos * 50) * 26} ${-14 + Math.sin(pos * 50) * 26} L${20 + Math.cos(pos * 50) * 26} ${-14 + Math.sin(pos * 50) * 26} L160 -50`} w={4} col="#3A2418" />
      {/* steam from the stack, drifting back */}
      {[0, 1, 2, 3, 4].map(i => <SR key={i} d={ell(160 - i * 80, -290 - i * 22, 36 + i * 18, 24 + i * 10)} mat="paper" t={.1 + i * .03} draw={draw} sw={.9} hatch={0} />)}
    </g>
  </g>;
};

// ================================================================ THE RISING LOAF — a tin of dough with raisins (each a tiny galaxy) that rises (rise 0..1): every raisin
// moves away from every other, the dotted lines between them stretch. oven 0..1 = the oven door's iron frame round it, warm.
const RisingLoaf: React.FC<{ x?: N; y?: N; s?: N; draw?: N; rise?: N; lines?: N; oven?: N; gal?: N }> = ({ x = 960, y = 640, s = 1, draw = 1, rise = 0, lines = 1, oven = 0, gal = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, k = 1 + rise * .55, top = Y(-120 - rise * 200);
  const R = useMemo(() => Array.from({ length: 22 }, (_, i) => [(rnd(i * 2.1) - .5) * 560, -40 - rnd(i * 3.7) * 150] as Pt), []);
  const pos = (p: Pt): Pt => [x + p[0] * s * k, Y(40) + (p[1] - 40) * s * (1 + rise * 1.2) * .9];
  return <g>
    {oven > 0 && <g opacity={oven * draw}><rect x={-200} y={-200} width={2320} height={1480} fill="#4F3020" /><circle cx={x} cy={y - 100} r={700} fill="#F2A672" opacity={.35} filter="url(#b30)" />
      <SR d={`M${X(-760)} ${Y(-560)} H${X(760)} V${Y(300)} H${X(-760)}Z M${X(-680)} ${Y(-490)} V${Y(230)} H${X(680)} V${Y(-490)}Z`} mat="night" t={.8} draw={draw} sw={2} hatch={0} /></g>}
    <Floor x={x} y={Y(150)} rx={420 * s} ry={24 * s} a={.4 * draw} />
    <SR d={pathOf([[X(-360), Y(-40)], [X(360), Y(-40)], [X(320), Y(140)], [X(-320), Y(140)]], true)} mat="stone" t={.75} draw={draw} sw={1.6} />
    <SR d={`M${X(-350)} ${Y(-40)} C${X(-360)} ${top + 60 * s} ${X(-200)} ${top} ${x} ${top} C${X(200)} ${top} ${X(360)} ${top + 60 * s} ${X(350)} ${Y(-40)}Z`} mat="sand" t={.3} draw={draw} sw={1.6} />
    {Array.from({ length: 5 }, (_, i) => <Line key={i} d={`M${X(-280 + i * 130)} ${top + (40 + Math.abs(i - 2) * 26) * s} q${40 * s} ${20 * s} ${70 * s} 0`} w={1} a={.4 * draw} />)}
    {lines > 0 && R.slice(0, 6).map((p, i) => { const a = pos(p), b = pos(R[(i + 3) % 22]); return <path key={i} d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} stroke="#8C3424" strokeWidth={1.6} strokeDasharray="5 6" opacity={lines * draw} />; })}
    {R.map((p, i) => { const [px, py] = pos(p); return py > top + 14 ? <g key={i} opacity={draw}>
      <ellipse cx={px} cy={py} rx={11 * s} ry={8 * s} fill="#4F3020" stroke={SEP} strokeWidth={1} transform={`rotate(${rnd(i) * 90} ${px} ${py})`} />
      {gal > 0 && <Gal x={px} y={py} r={8 * s} kind={i % 3} rot={rnd(i + 4) * 180} col="#F7E3A0" a={gal * .9} />}</g> : null; })}
  </g>;
};

// ================================================================ LEMAÎTRE'S STUDY (Leuven, 1927) — a window on gabled roofs, bookshelves, a desk with a lamp, an inkwell,
// a page of equations; a small crucifix on the wall. (Lemaître himself is a Person.)
const LemaitreDesk: React.FC<{ x?: N; y?: N; s?: N; draw?: N; lamp?: N; page?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, lamp = 1, page = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="stone" t={.55} draw={draw} sw={0} hatch={0} rim={false} />
    {/* window with rooftops at dusk */}
    <SR d={rect(X(-760), Y(-520), 420 * s, 520 * s)} mat="wood" t={.55} draw={draw} sw={1.4} />
    <rect x={X(-740)} y={Y(-500)} width={380 * s} height={480 * s} fill="#C99A6A" opacity={draw} />
    {[[-740, -160, 120, 1], [-620, -220, 110, 0], [-510, -150, 150, 1]].map(([rx, ry, rw, g], i) => <SR key={i} d={g ? pathOf([[X(rx), Y(-20)], [X(rx), Y(ry + 50)], [X(rx + rw / 2), Y(ry - 30)], [X(rx + rw), Y(ry + 50)], [X(rx + rw), Y(-20)]], true) : rect(X(rx), Y(ry), rw * s, (ry * -1 - 20) * s)} mat="wall" t={.75} draw={draw} sw={1} hatch={0} />)}
    <Line d={`M${X(-550)} ${Y(-500)} V${Y(-20)} M${X(-740)} ${Y(-260)} H${X(-360)}`} w={4 * s} a={draw} />
    {/* bookshelves right */}
    <SR d={rect(X(260), Y(-600), 640 * s, 700 * s)} mat="wood" t={.66} draw={draw} sw={1.4} />
    {Array.from({ length: 5 }, (_, r) => <g key={r}>{Array.from({ length: 26 }, (_, b) => <rect key={b} x={X(272 + b * 24)} y={Y(-586 + r * 136 + (b % 4) * 6)} width={20 * s} height={(118 - (b % 4) * 6) * s} fill={['#8C3424', '#4F3020', '#22507A', '#6A4430', '#A8743E'][(b + r * 2) % 5]} stroke={SEP} strokeWidth={.6} opacity={draw} />)}
      <SR d={rect(X(266), Y(-470 + r * 136), 628 * s, 12 * s)} mat="wood" t={.5} ang={0} draw={draw} sw={.8} /></g>)}
    {/* crucifix */}
    <Line d={`M${X(-80)} ${Y(-480)} V${Y(-380)} M${X(-110)} ${Y(-452)} H${X(-50)}`} w={5 * s} col="#4F3020" a={draw} />
    {/* desk */}
    <SR d={rect(X(-500), Y(160), 1000 * s, 36 * s)} mat="wood" t={.55} ang={0} draw={draw} sw={1.6} />
    <SR d={rect(X(-470), Y(196), 940 * s, 300 * s)} mat="wood" t={.74} ang={0} draw={draw} sw={1.2} />
    <g opacity={draw}><circle cx={X(330)} cy={Y(60)} r={260 * s} fill="url(#glowW)" opacity={.55 * lamp} />
      <Line d={`M${X(330)} ${Y(160)} V${Y(40)}`} w={4 * s} /><SR d={`M${X(270)} ${Y(50)} L${X(390)} ${Y(50)} L${X(360)} ${Y(4)} L${X(300)} ${Y(4)}Z`} mat="leaf" t={.65} draw={draw} sw={1.2} /></g>
    {page > 0 && <g opacity={page * draw}><SR d={pathOf([[X(-150), Y(158)], [X(140), Y(158)], [X(120), Y(120)], [X(-130), Y(120)]], true)} mat="paper" t={.08} draw={draw} sw={1} hatch={0} />
      {Array.from({ length: 4 }, (_, i) => <Line key={i} d={`M${X(-110 + i * 3)} ${Y(128 + i * 8)} h${(200 - i * 20) * s}`} w={1} a={.6} />)}</g>}
    <SR d={ell(X(-280), Y(150), 26 * s, 12 * s)} mat="night" t={.8} draw={draw} sw={1} />
    <Line d={`M${X(-270)} ${Y(146)} l${40 * s} ${-60 * s}`} w={2} a={draw} />
  </g>;
};

// ================================================================ HUBBLE'S DIAGRAM (PNAS 1929, Table 1 = X-02) — 24 nebulae: distance (millions of parsecs) against
// velocity (km/s); pts 0..1 inks the points nearest first, line 0..1 lays the straight line through the origin (≈ 500 km/s per Mpc).
const HB: Pt[] = [[.032, 170], [.034, 290], [.214, -130], [.263, -70], [.275, -185], [.275, -220], [.45, 200], [.5, 290], [.5, 270], [.63, 200], [.8, 300], [.9, -30], [.9, 650], [.9, 150], [.9, 500], [1.0, 920], [1.1, 450], [1.1, 500], [1.4, 500], [1.7, 960], [2.0, 500], [2.0, 850], [2.0, 800], [2.0, 1090]];
const HubbleDiagram: React.FC<{ x?: N; y?: N; w?: N; h?: N; draw?: N; pts?: N; line?: N; glow?: N }> = ({ x = 960, y = 540, w = 1000, h = 640, draw = 1, pts = 1, line = 1, glow = 0 }) => {
  const x0 = x - w / 2, y0 = y - h / 2, px = (d: N) => x0 + 90 + d / 2.2 * (w - 140), py = (v: N) => y0 + h - 90 - (v + 300) / 1500 * (h - 130);
  return <g opacity={draw}>
    <SR d={rect(x0 - 20, y0 - 20, w + 40, h + 40)} mat="paper" t={.08} draw={draw} sw={1.3} hatch={0} />
    {Array.from({ length: 12 }, (_, i) => <line key={'v' + i} x1={px(i * .2)} y1={y0 + 30} x2={px(i * .2)} y2={y0 + h - 90} stroke="#8C6E4A" strokeWidth={i % 5 ? .5 : 1} opacity={.45} />)}
    {Array.from({ length: 16 }, (_, i) => <line key={'h' + i} x1={x0 + 90} y1={py(-300 + i * 100)} x2={x0 + w - 40} y2={py(-300 + i * 100)} stroke="#8C6E4A" strokeWidth={(i - 3) % 5 ? .5 : 1} opacity={.45} />)}
    <Ink d={`M${x0 + 90} ${y0 + 30} V${y0 + h - 90} H${x0 + w - 40}`} w={1.8} draw={draw} />
    <Line d={`M${x0 + 90} ${py(0)} H${x0 + w - 40}`} w={1} a={.6} />
    <Fell x={x0 + w / 2 + 40} y={y0 + h - 40} s={30} t="distance →" italic />
    <Fell x={x0 + 40} y={y0 + h / 2} s={30} t="speed away →" italic rot={-90} />
    {line > 0 && <g>{glow > 0 && <path d={`M${px(0)} ${py(0)} L${px(2.1)} ${py(1050)}`} stroke="#F7E3A0" strokeWidth={22} opacity={glow * .5} filter="url(#b8)" />}
      <path d={`M${px(0)} ${py(0)} L${px(2.1)} ${py(1050)}`} stroke={glow > .5 ? '#D9AE4C' : '#8C3424'} strokeWidth={3.4} pathLength={1} strokeDasharray={`${line} 1`} /></g>}
    {HB.map(([d, v], i) => i / HB.length < pts ? <circle key={i} cx={px(d)} cy={py(v)} r={7} fill="#1A120B" /> : null)}
  </g>;
};

// ================================================================ GAIA (ESA; drawn from the reference render) — the round sunshield skirt of twelve panels in silver foil
// with gold patches, the service module and the telescope housing on top; spin = degrees the whole craft has turned; sweep 0..1 = its two
// lines of sight sweeping the sky.
const GaiaProbe: React.FC<{ x?: N; y?: N; r?: N; draw?: N; spin?: N; sweep?: N }> = ({ x = 960, y = 560, r = 380, draw = 1, spin = 0, sweep = 0 }) => {
  const ry = r * .36, P = (a: N, k = 1): Pt => [x + Math.cos(a) * r * k, y + Math.sin(a) * ry * k], sp = spin * Math.PI / 180;
  const panels = Array.from({ length: 12 }, (_, i) => { const a0 = sp + i / 12 * Math.PI * 2, a1 = a0 + Math.PI * 2 / 12; return { a0, a1, front: Math.sin((a0 + a1) / 2) > -.1 }; });
  const bw = r * .3, bh = r * .62, by = y - ry * .1;
  return <g opacity={draw}>

    {/* the skirt */}
    {panels.map((p, i) => <path key={i} d={`M${x} ${y} L${P(p.a0)[0]} ${P(p.a0)[1]} L${P(p.a1)[0]} ${P(p.a1)[1]}Z`} fill={i % 2 ? '#E8EEF0' : '#D6DEE2'} stroke={SEP} strokeWidth={1.2} />)}
    {panels.map((p, i) => i % 3 === 0 ? <path key={'g' + i} d={`M${P(p.a0 + .1, .82)[0]} ${P(p.a0 + .1, .82)[1]} L${P(p.a0 + .32, .82)[0]} ${P(p.a0 + .32, .82)[1]} L${P(p.a0 + .32, .97)[0]} ${P(p.a0 + .32, .97)[1]} L${P(p.a0 + .1, .97)[0]} ${P(p.a0 + .1, .97)[1]}Z`} fill="url(#gold)" stroke={SEP} strokeWidth={.8} /> : null)}
    {Array.from({ length: 30 }, (_, i) => { const a = sp + rnd(i) * Math.PI * 2, k = .3 + rnd(i + 3) * .6; return <Line key={i} d={`M${P(a, k)[0]} ${P(a, k)[1]} l${(rnd(i + 5) - .5) * 30} ${(rnd(i + 6) - .5) * 10}`} w={.7} a={.4} />; })}
    <defs><linearGradient id="gaiaSh" x1="0" x2="1"><stop offset="0" stopColor="#0B1030" stopOpacity=".55" /><stop offset=".55" stopColor="#0B1030" stopOpacity="0" /><stop offset="1" stopColor="#FFF4D2" stopOpacity=".25" /></linearGradient></defs>
    <path d={ell(x, y, r, ry)} fill="url(#gaiaSh)" />
    <path d={ell(x, y, r, ry)} fill="none" stroke={SEP} strokeWidth={1.8} />
    <path d={`M${x - r} ${y} A${r} ${ry} 0 0 0 ${x + r} ${y}`} fill="none" stroke={SEP} strokeWidth={5} opacity={.35} transform="translate(0 6)" />
    {/* the body: service module + telescope housing, dark foil with gold straps, a white lid */}
    <SR d={rect(x - bw, by - bh, bw * 2, bh)} mat="night" t={.7} draw={draw} sw={1.6} hatch={0} />
    {[-.6, -.1, .4].map(k => <SR key={k} d={rect(x + k * bw, by - bh, bw * .22, bh)} mat="gold" t={.4} draw={draw} sw={1} hatch={0} />)}
    <SR d={ell(x, by - bh, bw, bw * .36)} mat="paper" t={.08} draw={draw} sw={1.4} hatch={0} />
    <path d={ell(x, by, bw, bw * .36)} fill="none" stroke={SEP} strokeWidth={1.2} />
    <path d={`M${x - bw} ${by - bh} V${by} M${x + bw} ${by - bh} V${by}`} stroke={SEP} strokeWidth={1.6} />
    <path d={`M${x - bw * .5} ${by - bh * .55} h${bw * .5} v${bh * .25} h${-bw * .5}Z`} fill="#141C38" stroke={SEP} />
    <rect x={x - bw} y={by - bh} width={bw * .9} height={bh} fill="#0B1030" opacity={.35} />
    <rect x={x + bw * .55} y={by - bh} width={bw * .45} height={bh} fill="#FFF4D2" opacity={.18} />
  </g>;
};

// ================================================================ A BILLION TICKS — the sky filled with the tiny ink ticks of Gaia's parallaxes (k 0..1 = how many are in),
// gathered thickest along the Milky Way; fly 0..1 = the camera flies through them (each tick at its own depth rushes past).
const TickSky: React.FC<{ x?: N; y?: N; draw?: N; k?: N; fly?: N; n?: N; sky?: N }> = ({ x = 960, y = 540, draw = 1, k = 1, fly = 0, n = 1400, sky = 1 }) => {
  const T = useMemo(() => Array.from({ length: n }, (_, i) => { const band = i % 3 !== 0, u = rnd(i * 1.3) * 2 - 1, v = band ? (rnd(i * 2.3) + rnd(i * 3.1) - 1) * .35 : rnd(i * 4.4) * 2 - 1;
    const a = -.42, bx = u * Math.cos(a) - v * Math.sin(a), byy = u * Math.sin(a) + v * Math.cos(a); return [bx * 1100, byy * 700, .2 + rnd(i * 5.5) * .8] as [N, N, N]; }), [n]);
  return <g opacity={draw}>
    {sky > 0 && <NightWash x={-200} y={-200} w={2320} h={1480} seed="tsk" a={sky} top="#0B1030" bot="#1C2650" />}
    {T.map(([tx, ty, z], i) => { if (i / n > k) return null; const m = 1 / Math.max(.08, 1 - fly * z * .95), px = x + tx * m, py = y + ty * m; if (px < -40 || px > 1960 || py < -40 || py > 1120) return null;
      const L = (2 + z * 3) * Math.min(6, m), a = Math.min(1, .3 + z * .7) * (1 - ph(m, 4, 9));
      return <g key={i} opacity={a}><line x1={px - L} y1={py} x2={px + L} y2={py} stroke="#F7E3A0" strokeWidth={Math.min(3, .8 * m)} /><line x1={px - L} y1={py - L * .6} x2={px - L} y2={py + L * .6} stroke="#F7E3A0" strokeWidth={Math.min(2, .6 * m)} /><line x1={px + L} y1={py - L * .6} x2={px + L} y2={py + L * .6} stroke="#F7E3A0" strokeWidth={Math.min(2, .6 * m)} /></g>; })}
  </g>;
};

// ================================================================ A HAND WITH A PEN — the insert of the work being done: a man's right hand (cuff, knuckles, nails)
// holding a fountain pen, nib at (x, y), the hand coming in from the lower right; s = scale.
const PenHand: React.FC<{ x?: N; y?: N; s?: N; draw?: N; rot?: N; cuff?: string; ink?: string }> = ({ x = 960, y = 540, s = 1, draw = 1, rot = 0, cuff = 'stone', ink = '#B8432A' }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g transform={rot ? `rotate(${rot} ${x} ${y})` : undefined} opacity={draw}>
    <SR d={`M${X(150)} ${Y(170)} C${X(230)} ${Y(190)} ${X(360)} ${Y(260)} ${X(560)} ${Y(420)} L${X(470)} ${Y(560)} C${X(320)} ${Y(420)} ${X(200)} ${Y(330)} ${X(100)} ${Y(290)}Z`} mat={cuff} t={.62} draw={draw} sw={1.6} />
    <SR d={`M${X(130)} ${Y(170)} L${X(170)} ${Y(160)} L${X(110)} ${Y(300)} L${X(70)} ${Y(290)}Z`} mat="paper" t={.12} draw={draw} sw={1.2} />
    <SR d={`M${X(20)} ${Y(60)} C${X(40)} ${Y(20)} ${X(110)} ${Y(30)} ${X(150)} ${Y(80)} C${X(180)} ${Y(120)} ${X(170)} ${Y(190)} ${X(130)} ${Y(240)} C${X(90)} ${Y(290)} ${X(20)} ${Y(280)} ${X(-10)} ${Y(230)} C${X(-40)} ${Y(180)} ${X(-10)} ${Y(110)} ${X(20)} ${Y(60)}Z`} mat="skin" t={.42} draw={draw} sw={1.7} />
    {[0, 1, 2].map(j => <Line key={j} d={`M${X(-8 + j * 10)} ${Y(150 + j * 34)} C${X(20 + j * 10)} ${Y(140 + j * 34)} ${X(50 + j * 8)} ${Y(150 + j * 32)} ${X(70 + j * 6)} ${Y(170 + j * 30)}`} w={1.2} a={.7 * draw} />)}
    <g transform={`translate(${96 * s} ${50 * s})`}>
    <SR d={`M${X(-6)} ${Y(70)} C${X(-40)} ${Y(50)} ${X(-80)} ${Y(30)} ${X(-96)} ${Y(14)} C${X(-104)} ${Y(4)} ${X(-92)} ${Y(-6)} ${X(-80)} ${Y(0)} C${X(-56)} ${Y(14)} ${X(-20)} ${Y(36)} ${X(10)} ${Y(50)}Z`} mat="skin" t={.38} draw={draw} sw={1.3} />
    <SR d={`M${X(30)} ${Y(56)} C${X(0)} ${Y(30)} ${X(-50)} ${Y(-10)} ${X(-74)} ${Y(-34)} C${X(-84)} ${Y(-44)} ${X(-70)} ${Y(-56)} ${X(-58)} ${Y(-46)} C${X(-30)} ${Y(-24)} ${X(20)} ${Y(14)} ${X(56)} ${Y(40)}Z`} mat="skin" t={.34} draw={draw} sw={1.3} />
    <path d={`M${X(-80)} ${Y(-46)} c${-6 * s} ${-4 * s} ${-2 * s} ${-12 * s} ${6 * s} ${-8 * s}`} fill="#FBF4E2" stroke={SEP} strokeWidth={.8} />
    </g>
    {[0, 1, 2].map(j => <Line key={j} d={`M${X(40 + j * 26)} ${Y(70 + j * 20)} q${8 * s} ${10 * s} ${2 * s} ${22 * s}`} w={.8} a={.5 * draw} />)}
    {/* the pen: black barrel, gold band, steel nib, the ink wet at its point */}
    <g transform={`rotate(30 ${x} ${y})`}>
      <SR d={rr(x + 26 * s, y - 9 * s, 300 * s, 18 * s, 8 * s)} mat="night" t={.86} ang={0} draw={draw} sw={1.3} hatch={0} />
      <SR d={rect(x + 120 * s, y - 10 * s, 12 * s, 20 * s)} mat="brass" t={.4} draw={draw} sw={1} hatch={0} />
      <path d={`M${x} ${y} L${x + 30 * s} ${y - 8 * s} L${x + 30 * s} ${y + 8 * s}Z`} fill="#C9C2A6" stroke={SEP} strokeWidth={1} />
      <line x1={x + 4 * s} y1={y} x2={x + 26 * s} y2={y} stroke={SEP} strokeWidth={.7} />
      <circle cx={x} cy={y} r={2.6 * s} fill={ink} />
    </g>
  </g>;
};

export const ART_C: Record<string, React.FC<any>> = { SpiralNebula, DebateHall, HookerDome, LightTable, AndromedaEngraving, GalaxyStorm, SpectrumStrip, TrainWhistle, RisingLoaf, LemaitreDesk, HubbleDiagram, GaiaProbe, TickSky, PenHand };
