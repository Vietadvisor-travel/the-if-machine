// dinosaur-killer — ACT I–II drawings: the Cretaceous dusk, the theropod and its museum skeleton, the four relics, the old theories, the stone
// book of Gubbio (RockBook, a v8 device), plankton, the gorge, the finger on the clay, the clay hourglass, the Alvarez desk, dust from space,
// the iridium meter whose needle goes through the roof (IridiumMeter, v8 device), the dusty shelf, the meteorite, the asteroid, Everest.
// References: R-01 / P-02 (Gubbio outcrop, the Alvarezes), P-01 (the boundary clay), E-01 (Hawkins, 1853), modern theropod anatomy (horizontal
// spine, tail held straight out, three-toed bird-like feet, two-fingered arms) — never the old upright "kangaroo" pose of the 19th century.
import React, { useMemo } from 'react';
import { tone } from '../../paint/paint';
import { Line, Ink, Stipple, SEP, ell, SR, Ball, Star, starField, NightWash, Floor, Fell, Hand, N, Pt, f1, cl, ph, lerp, rect, rr, pathOf, rnd } from '../star-distance/kit';

// ================================================================ THE CRETACEOUS DUSK — a lake shore at the end of the day: tree ferns, cycads and araucarias against a sky
// going from gold to indigo (dusk 0..1), the first stars (stars), and ONE faint point that is not a star (point 0..1 at px, py).
const CretaceousDusk: React.FC<{ x?: N; y?: N; draw?: N; dusk?: N; stars?: N; point?: N; px?: N; py?: N }> = ({ x = 960, y = 540, draw = 1, dusk = .3, stars = 0, point = 0, px = 1380, py = 210 }) => {
  const st = useMemo(() => starField(66, 140, -200, -200, 2320, 760, 2.2), []);
  const fern = (fx: N, fy: N, h: N, k: N) => <g key={'f' + k}>
    <SR d={`M${fx - 6} ${fy} C${fx - 4} ${fy - h * .5} ${fx - 2} ${fy - h * .8} ${fx} ${fy - h} L${fx + 6} ${fy - h} C${fx + 4} ${fy - h * .6} ${fx + 6} ${fy - h * .3} ${fx + 8} ${fy}Z`} mat="wood" t={.75} draw={draw} sw={1} />
    {Array.from({ length: 9 }, (_, i) => { const a = -Math.PI + i * Math.PI / 8, L2 = h * (.38 + rnd(k + i) * .14); return <path key={i} d={`M${fx + 2} ${fy - h} Q${fx + Math.cos(a) * L2 * .6} ${fy - h - 40 + Math.sin(a) * L2 * .3} ${fx + Math.cos(a) * L2} ${fy - h + 30 + Math.abs(Math.cos(a)) * 40}`} stroke="#2F5440" strokeWidth={10 * h / 300} fill="none" strokeLinecap="round" opacity={draw * .95} />; })}
  </g>;
  return <g opacity={draw}>
    <defs><linearGradient id="kdsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={dusk > .5 ? '#1C2650' : '#5A6E9A'} /><stop offset=".55" stopColor={dusk > .7 ? '#8C5A36' : '#D9AE6C'} /><stop offset="1" stopColor="#F2A672" /></linearGradient></defs>
    <rect x={-200} y={-200} width={2320} height={y + 300} fill="url(#kdsky)" />
    <rect x={-200} y={-200} width={2320} height={y + 300} fill="#141C38" opacity={dusk * .55} />
    {st.map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r * .8} a={stars * (.5 + rnd(i) * .5)} />)}
    <circle cx={1650} cy={y + 60} r={90} fill="#F7E3A0" opacity={.7 * (1 - dusk)} /><circle cx={1650} cy={y + 60} r={260} fill="url(#glowW)" opacity={.6 * (1 - dusk * .6)} />
    {point > 0 && <g opacity={point}><circle cx={px} cy={py} r={18} fill="url(#glowW)" /><Star x={px} y={py} r={2.6} glow={.6} /></g>}
    {/* far hills and a volcano-free horizon, the lake */}
    <SR d={`M-200 ${y + 80} C200 ${y + 30} 500 ${y + 60} 800 ${y + 40} C1100 ${y + 20} 1400 ${y + 70} 2120 ${y + 50} V${y + 140} H-200Z`} mat="night" t={.5 + dusk * .2} draw={draw} sw={1} hatch={0} />
    <rect x={-200} y={y + 120} width={2320} height={180} fill="#4A88AE" opacity={.85} />
    {Array.from({ length: 22 }, (_, i) => <Line key={i} d={`M${-150 + rnd(i) * 2200} ${y + 140 + i * 7} h${60 + rnd(i + 3) * 220}`} w={1} col="#F7E3A0" a={.45 * (1 - dusk * .5)} />)}
    <SR d={`M-200 ${y + 280} C300 ${y + 250} 800 ${y + 270} 1200 ${y + 260} C1600 ${y + 250} 1900 ${y + 280} 2120 ${y + 270} V1300 H-200Z`} mat="land" t={.62 + dusk * .2} draw={draw} sw={1.2} />
    {/* araucarias far, tree ferns and cycads near */}
    {[[120, y + 120, 300], [380, y + 110, 240], [1780, y + 120, 280]].map(([ax, ay, h], i) => <g key={'a' + i}><Line d={`M${ax} ${ay} V${ay - h}`} w={4} a={.8} />
      {Array.from({ length: 7 }, (_, j) => <path key={j} d={`M${ax - (h * .3 - j * 12)} ${ay - h * .4 - j * h * .08} Q${ax} ${ay - h * .45 - j * h * .08 - 14} ${ax + (h * .3 - j * 12)} ${ay - h * .4 - j * h * .08}`} stroke="#2A4A32" strokeWidth={9} fill="none" opacity={.85} />)}</g>)}
    {fern(260, y + 330, 300, 1)}{fern(520, y + 360, 360, 2)}{fern(1720, y + 340, 330, 3)}
    {[[760, y + 340], [1500, y + 360]].map(([cx, cy], i) => <g key={'c' + i}><SR d={ell(cx, cy - 30, 34, 40)} mat="wood" t={.7} draw={draw} sw={1} />
      {Array.from({ length: 10 }, (_, j) => { const a = -Math.PI * (j / 9); return <path key={j} d={`M${cx} ${cy - 60} Q${cx + Math.cos(a) * 60} ${cy - 100 + Math.sin(a) * 30} ${cx + Math.cos(a) * 120} ${cy - 50 + Math.abs(Math.cos(a)) * 40}`} stroke="#4F7A4A" strokeWidth={6} fill="none" opacity={.9} />; })}</g>)}
    <Stipple x={-200} y={y + 280} w={2320} h={500} n={900} seed="kdg" a={.35} />
  </g>;
};

// ================================================================ THE THEROPOD (engine v9 anatomy) — Tyrannosaurus in the modern posture, proportions from the AMNH
// 1913 restoration (Osborn, plate 4) and mounted skeletons: body level, tail straight out as long as the rest, a SHORT S-curved neck, a deep
// boxy skull (long as a man is tall) with the eye high and back, a brow boss, banana teeth; tiny two-fingered arms; huge thigh muscle, long shin
// and foot, three forward toes. One skinned spine (tail → hip → gut → chest → neck) wraps the body; legs and arms are FK limbs.
// head 0..1 lifts the head to the sky; jaw 0..1 opens; walk = stride phase (loop it: walking); breathe 0..1 swells the chest; sway = tail swing;
// eye = glint; bones 1 = the same animal as a mounted skeleton (museum). Units ≈ centimetres of the real animal × .1 × s (12 m → 1200·s px).
import { Skin, fk, wave, stride, deg, pol, add, P as PP, Joint, sample, HumanHand } from '../../paint/anatomy';
const Bone: React.FC<{ a: PP; b: PP; r: N; draw?: N }> = ({ a, b, r, draw = 1 }) => {   // a long bone: shaft with knobbed ends
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, k = r * .55;
  const q = (p: PP, o: N): string => `${f1(p[0] + nx * o)} ${f1(p[1] + ny * o)}`;
  return <g opacity={draw}><circle cx={a[0]} cy={a[1]} r={r} fill="#F3E7CC" stroke={SEP} strokeWidth={1.4} /><circle cx={b[0]} cy={b[1]} r={r * .85} fill="#F3E7CC" stroke={SEP} strokeWidth={1.4} />
    <path d={`M${q(a, k)} L${q(b, k * .9)} L${q(b, -k * .9)} L${q(a, -k)}Z`} fill="#F3E7CC" stroke={SEP} strokeWidth={1.4} />
    <path d={`M${q(lerpPt(a, b, .2), -k * .4)} L${q(lerpPt(a, b, .8), -k * .4)}`} stroke={SEP} strokeWidth={.8} opacity={.5} /></g>;
};
const lerpPt = (a: PP, b: PP, t: N): PP => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// the skull in its own frame (origin = back of the skull at the neck, x forward, y down; length 150)
const SKULL_TOP: PP[] = [[-12, -36], [10, -44], [34, -46], [50, -50], [60, -44], [86, -40], [112, -32], [134, -24], [148, -12], [152, 0]];
const UPPER_JAW: PP[] = [[150, 8], [128, 12], [96, 14], [66, 16], [40, 18], [16, 24], [-12, 30]];
const LOWER_JAW: PP[] = [[-6, 32], [16, 34], [30, 46], [62, 44], [100, 36], [130, 26], [146, 18]];
const Theropod: React.FC<{ x?: N; y?: N; s?: N; draw?: N; head?: N; eye?: N; flip?: N; mat?: string; bones?: N; jaw?: N; walk?: N; breathe?: N; sway?: N; tm?: N; id?: string; build?: N }> =
  ({ x = 960, y = 760, s = 1, draw = 1, head = 0, eye = 1, flip = 1, mat = 'land', bones = 0, jaw = 0, walk = -1, breathe = 0, sway = 0, tm: t = 0, id = 'rex', build = 1 }) => {
  const T = (p: PP): PP => [x + p[0] * s * flip, y + p[1] * s];
  const bob = walk >= 0 ? Math.abs(Math.sin(walk * Math.PI * 2)) * -8 : 0, br = 1 + breathe * .05 * Math.sin(t * Math.PI * 2 / 3.5);
  // the axial chain: tail tip → hip → gut → chest → shoulder → neck → skull base (relative to the hip)
  const hip: PP = [0, -390 + bob];
  const tailAng = [0, 1, 2, 3, 4].map(i => wave(t, i, 2.2 * (sway + (walk >= 0 ? .6 : .25)), .35));
  const tail = fk(hip, 180 + 2, [[120, -3 + tailAng[0]], [160, -1 + tailAng[1]], [170, 1 + tailAng[2]], [160, 2 + tailAng[3]], [140, 2 + tailAng[4]]]).reverse();   // tip … hip
  const headUp = head * 34, neckB: PP = add(hip, [340, -10]);
  const neck = fk(neckB, -40 - headUp * .6, [[46, 12], [44, 22 - headUp * .2]]);   // the S: up, then forward
  const skullBase = neck[2], skullAng = deg(-headUp * .9 + 6 + jaw * -4);
  const J: Joint[] = [
    { p: tail[0], up: 1.5, dn: 1.5 }, { p: tail[1], up: 9, dn: 10 }, { p: tail[2], up: 22, dn: 26 }, { p: tail[3], up: 40, dn: 46 }, { p: tail[4], up: 56, dn: 70 },
    { p: hip, up: 66, dn: 104 }, { p: add(hip, [120, 4]), up: 60, dn: 150 * br }, { p: add(hip, [230, 6]), up: 56, dn: 136 * br }, { p: add(hip, [310, 0]), up: 52, dn: 96 },
    { p: neck[0], up: 54, dn: 72 }, { p: neck[1], up: 48, dn: 56 }, { p: skullBase, up: 40, dn: 40 }];
  const Jw = J.map(j => ({ p: T(j.p), up: j.up * s, dn: j.dn * s })); if (flip < 0) Jw.forEach(j => { const u = j.up; j.up = j.dn; j.dn = u; });
  // legs: femur 160 · tibia 150 · metatarsus 90 · toe 40; neutral angles from mounted skeletons; walk = stride
  const leg = (ph: N | null, dx: N) => { const [h, k, a, tt] = ph === null ? [0, 0, 0, 0] : stride(ph, .8);
    return fk(add(hip, [dx + 20, 10]), 70 + h, [[160, 0], [150, 45 + k], [90, -40 + a], [44, -75 + tt]]); };
  const near = leg(walk >= 0 ? walk : null, 0), far = leg(walk >= 0 ? walk + .5 : null, -34);
  const legJ = (L: PP[], k: N): Joint[] => [{ p: add(L[0], [-30, -60]), up: 20 * k, dn: 20 * k }, { p: add(L[0], [-12, -24]), up: 70 * k, dn: 70 * k }, { p: L[0], up: 82 * k, dn: 80 * k }, { p: lerpPt(L[0], L[1], .55), up: 64 * k, dn: 60 * k },
    { p: L[1], up: 30 * k, dn: 30 * k }, { p: lerpPt(L[1], L[2], .3), up: 30 * k, dn: 22 * k }, { p: L[2], up: 15 * k, dn: 15 * k }, { p: L[3], up: 12 * k, dn: 13 * k }, { p: L[4], up: 4 * k, dn: 6 * k }];
  const W = (Jl: Joint[]) => Jl.map(j => ({ p: T(j.p), up: j.up * s, dn: j.dn * s }));
  const arm = fk(add(hip, [300, 60]), 100, [[36, 0], [30, -70], [16, -20]]);
  // skull to world
  const SK = (q0: PP, low = false): PP => { const q: PP = [q0[0] * 1.22, q0[1] * 1.22], a = skullAng + (low ? deg(jaw * 22) : 0), o: PP = low ? [20, 29] : [0, 0], dx = q[0] - o[0], dy = q[1] - o[1];
    return T(add(skullBase, add(o, [dx * Math.cos(a) - dy * Math.sin(a), dx * Math.sin(a) + dy * Math.cos(a)]))); };
  const sk = (pts: PP[], low = false) => pts.map(p => SK(p, low));
  const path = (pts: PP[]) => 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');
  const skullD = path([...sk(SKULL_TOP), ...sk(UPPER_JAW)]) + 'Z', jawD = path([...sk(LOWER_JAW, true)]) + ` L${sk([[132, 16]], true)[0].join(' ')} L${sk([[30, 30]], true)[0].join(' ')}Z`;
  const M = mat, eyeP = SK([44, -24]);
  const teeth = (low: boolean) => Array.from({ length: low ? 9 : 11 }, (_, i) => { const u = i / (low ? 8 : 10), x0 = 40 + u * 104, yb = low ? 26 + (1 - u) * 6 : 14 - u * 2, L = (low ? -1 : 1) * (9 + 6 * Math.sin(u * Math.PI));
    const a = SK([x0, yb], low), b2 = SK([x0 + 5, yb + L], low), c = SK([x0 + 8, yb], low); return <path key={i} d={`M${f1(a[0])} ${f1(a[1])} Q${f1(b2[0] - 2)} ${f1(b2[1])} ${f1(b2[0])} ${f1(b2[1])} L${f1(c[0])} ${f1(c[1])}Z`} fill="#F6EEDB" stroke={SEP} strokeWidth={.8} />; });
  if (bones) {   // ------------------------------------------------ the mounted skeleton
    const S = sample(J, 6), V = (u: N) => cl((build - u * .85) / .15);   // build: the bones assemble in order, tail tip → skull
    return <g opacity={draw * bones}>
      <Floor x={x} y={y} rx={420 * s} ry={20 * s} a={.3} />
      {[far, near].map((L, k) => <g key={k} opacity={(k ? 1 : .8) * V(.45)}>{[0, 1, 2, 3].map(i => <Bone key={i} a={T(L[i])} b={T(L[i + 1])} r={[20, 15, 10, 6][i] * s} />)}</g>)}
      {/* vertebrae with their spines, along the spine */}
      {S.map((q, i) => { const w = Math.max(.25, (q.up + q.dn) / 200), c = T(q.c); return i % 2 ? null : <g key={i} opacity={V(q.u * .7)}><rect x={c[0] - 9 * s * w * 2} y={c[1] - 8 * s * (.5 + w)} width={18 * s * w * 2} height={16 * s * (.5 + w)} rx={4 * s} fill="#F3E7CC" stroke={SEP} strokeWidth={1.1} />
        {q.u > .3 && q.u < .85 && <path d={`M${c[0]} ${c[1] - 6 * s} l${-4 * s * flip} ${-q.up * .55 * s}`} stroke={SEP} strokeWidth={4 * s} strokeLinecap="round" />}
        {q.u < .5 && q.u > .05 && <path d={`M${c[0]} ${c[1] + 6 * s} l${-6 * s * flip} ${Math.min(40, 6 + q.dn * .35) * s}`} stroke={SEP} strokeWidth={2.4 * s} strokeLinecap="round" opacity={q.u < .5 ? .8 : .5} />}</g>; })}
      {/* ribs: curved, sweeping back and down from the back vertebrae */}
      {Array.from({ length: 12 }, (_, i) => { const a = T(add(hip, [90 + i * 20, -40])), L = (120 - Math.abs(i - 5) * 9) * s * br;
        return <path key={'r' + i} opacity={V(.55 + i * .01)} d={`M${f1(a[0])} ${f1(a[1])} q${f1(26 * s * flip)} ${f1(L * .5)} ${f1(-8 * s * flip)} ${f1(L)}`} stroke="#F3E7CC" strokeWidth={6 * s} fill="none" />; })}
      {Array.from({ length: 12 }, (_, i) => { const a = T(add(hip, [90 + i * 20, -40])), L = (120 - Math.abs(i - 5) * 9) * s * br;
        return <path key={'ro' + i} opacity={V(.55 + i * .01)} d={`M${f1(a[0])} ${f1(a[1])} q${f1(26 * s * flip)} ${f1(L * .5)} ${f1(-8 * s * flip)} ${f1(L)}`} stroke={SEP} strokeWidth={1.6} fill="none" />; })}
      {/* pelvis: ilium blade over the hip, the long pubis with its "boot", the ischium */}
      <g opacity={V(.5)}>
      <path d={`M${T(add(hip, [-130, -20])).join(' ')} Q${T(add(hip, [-120, -52])).join(' ')} ${T(add(hip, [-60, -54])).join(' ')} L${T(add(hip, [80, -56])).join(' ')} Q${T(add(hip, [124, -48])).join(' ')} ${T(add(hip, [118, -18])).join(' ')} Q${T(add(hip, [0, 0])).join(' ')} ${T(add(hip, [-130, -20])).join(' ')}Z`} fill="#F3E7CC" stroke={SEP} strokeWidth={1.6} />
      <path d={path([T(add(hip, [20, 0])), T(add(hip, [70, 150])), T(add(hip, [120, 168])), T(add(hip, [40, 176])), T(add(hip, [0, 10]))]) + 'Z'} fill="#F3E7CC" stroke={SEP} strokeWidth={1.4} />
      <path d={path([T(add(hip, [-20, 0])), T(add(hip, [-90, 110])), T(add(hip, [-74, 116])), T(add(hip, [-6, 14]))]) + 'Z'} fill="#F3E7CC" stroke={SEP} strokeWidth={1.4} /></g>
      {/* skull: bone frame with its openings */}
      <g opacity={V(.85)}><path d={skullD} fill="#F3E7CC" stroke={SEP} strokeWidth={2} /><path d={jawD} fill="#F3E7CC" stroke={SEP} strokeWidth={1.8} /></g>
      {[[46, -26, 12, 16, 0], [88, -14, 24, 13, 0], [18, -12, 9, 16, 0], [60, 38, 16, 6, 1]].map(([cx, cy, rx, ry, low], i) => { const c = SK([cx, cy], !!low); return <ellipse key={i} opacity={V(.9)} cx={c[0]} cy={c[1]} rx={rx * 1.22 * s} ry={ry * 1.22 * s} transform={`rotate(${f1((skullAng + (low ? deg(jaw * 22) : 0)) * 180 / Math.PI * flip)} ${f1(c[0])} ${f1(c[1])})`} fill="#4A2E1C" stroke={SEP} strokeWidth={1.4} />; })}
      <g opacity={V(.9)}>{teeth(false)}{teeth(true)}</g>
      <g opacity={V(.7)}>{[0, 1].map(k => <Bone key={'a' + k} a={T(arm[k])} b={T(arm[k + 1])} r={5 * s} />)}</g>
      {/* the iron armature */}
      {[60, 300].map(px => <Line key={px} d={`M${T([px, 0])[0]} ${y} V${T(add(hip, [px, px > 100 ? 40 : 0]))[1]}`} w={3 * s} col="#3A2418" a={.7} />)}
    </g>;
  }
  return <g opacity={draw}>
    <Floor x={x - 40 * s * flip} y={y} rx={400 * s} ry={22 * s} a={.38} />
    <Skin id={id + 'lf'} J={W(legJ(far, .9))} mat={M} t={.82} light={[-.5 * flip, -.85]} hatch={.5} sw={1.4} rim={0} />
    {/* the skull: filled under the neck's skin, its outline drawn as an open line (no seam at the back of the head) */}
    <path d={skullD} fill={tone(M, .52)} />
    <path d={jawD} fill={tone(M, .6)} />
    {jaw > .05 && <path d={path([...sk(UPPER_JAW.slice(0, 5)), ...sk([...LOWER_JAW.slice(2)].reverse(), true)]) + 'Z'} fill="#5A1E14" opacity={.9} />}
    {teeth(false)}{jaw > .05 && teeth(true)}
    <path d={path(sk([...SKULL_TOP.slice(1), ...UPPER_JAW.slice(0, 6)]))} stroke={SEP} strokeWidth={2.2} fill="none" strokeLinejoin="round" />
    <path d={path(sk(LOWER_JAW.slice(1), true))} stroke={SEP} strokeWidth={2} fill="none" strokeLinejoin="round" />
    <Skin id={id + 'body'} J={Jw} mat={M} t={.55} light={[-.5 * flip, -.85]} hatch={.8} sw={2.2} scales={1} openEnd />
    {/* the skull's modelling: the hollow before the eye, the cheek muscle, nostril, the lip line, the brow boss */}
    <path d={path(sk([[66, -26], [104, -24], [116, -10], [84, -4], [64, -10]])) + 'Z'} fill={SEP} opacity={.16} />
    <path d={`M${SK([18, -20]).join(' ')} Q${SK([10, 4]).join(' ')} ${SK([22, 22]).join(' ')}`} stroke={SEP} strokeWidth={1.2} fill="none" opacity={.7} />
    {Array.from({ length: 7 }, (_, i) => { const a = SK([60 + i * 12, -38 + i * 2.5]), b2 = SK([60 + i * 12, -24 + i * 2]); return <path key={'h' + i} d={`M${f1(a[0])} ${f1(a[1])} L${f1(b2[0])} ${f1(b2[1])}`} stroke={SEP} strokeWidth={.8} opacity={.4} />; })}
    <ellipse cx={SK([140, -12])[0]} cy={SK([140, -12])[1]} rx={5 * s} ry={3 * s} fill={SEP} opacity={.85} />
    <path d={`M${SK([36, -40]).join(' ')} Q${SK([46, -52]).join(' ')} ${SK([58, -42]).join(' ')}`} stroke={SEP} strokeWidth={3 * s} fill={tone(M, .66)} />
    <circle cx={eyeP[0]} cy={eyeP[1]} r={8 * s} fill="#E9B456" stroke={SEP} strokeWidth={1.4} />
    <circle cx={eyeP[0] + 1.5 * s * flip} cy={eyeP[1]} r={4 * s} fill="#1A120B" />
    {eye > 0 && <circle cx={eyeP[0] + 3.5 * s * flip} cy={eyeP[1] - 3 * s} r={1.8 * s} fill="#FFFDF4" opacity={eye} />}
    {/* the tiny arm: upper arm, forearm, two clawed fingers */}
    <Skin id={id + 'arm'} J={W([{ p: arm[0], up: 9, dn: 9 }, { p: arm[1], up: 7, dn: 7 }, { p: arm[2], up: 5, dn: 5 }, { p: arm[3], up: 2, dn: 2 }])} mat={M} t={.6} hatch={.4} sw={1.3} rim={0} />
    <Skin id={id + 'ln'} J={W(legJ(near, 1))} mat={M} t={.6} light={[-.5 * flip, -.85]} hatch={.5} sw={2} />
    {/* claws on the near foot */}
    {[0, 1, 2].map(k => { const p = T(add(near[4], [(k - 1) * 10, 0])); return <path key={'c' + k} d={`M${f1(p[0])} ${f1(p[1] - 4 * s)} q${f1(10 * s * flip)} ${f1(2 * s)} ${f1(12 * s * flip)} ${f1(10 * s)}`} stroke="#1A120B" strokeWidth={3 * s} fill="none" strokeLinecap="round" />; })}
  </g>;
};

// ================================================================ THE MUSEUM AT NIGHT — a hall with a tall arched window (moonlight), a stone plinth and the iron armature
// that holds the skeleton (the skeleton is the Theropod drawn as bones). moon 0..1 = the beam.
const MuseumHall: React.FC<{ x?: N; y?: N; s?: N; draw?: N; moon?: N; dawn?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, moon = 1, dawn = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <rect x={-200} y={-200} width={2320} height={1480} fill={dawn > .5 ? '#5A4632' : '#1C1A24'} />
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="stone" t={.82 - dawn * .25} draw={draw} sw={0} hatch={0} rim={false} />
    {Array.from({ length: 8 }, (_, i) => <SR key={i} d={rect(X(-900 + i * 260), Y(-640), 40 * s, 900 * s)} mat="stone" t={.75 - dawn * .2} draw={draw} sw={1} hatch={0} />)}
    {/* the tall arched window, left */}
    <SR d={`M${X(-760)} ${Y(140)} V${Y(-360)} Q${X(-620)} ${Y(-520)} ${X(-480)} ${Y(-360)} V${Y(140)}Z`} mat="wood" t={.8} draw={draw} sw={1.6} />
    <path d={`M${X(-740)} ${Y(120)} V${Y(-350)} Q${X(-620)} ${Y(-490)} ${X(-500)} ${Y(-350)} V${Y(120)}Z`} fill={dawn > 0 ? '#F2C98A' : '#3A4A7A'} opacity={.95} />
    {dawn > 0 && <path d={`M${X(-740)} ${Y(120)} V${Y(-350)} Q${X(-620)} ${Y(-490)} ${X(-500)} ${Y(-350)} V${Y(120)}Z`} fill="#F7E3A0" opacity={dawn * .6} />}
    <Line d={`M${X(-620)} ${Y(-480)} V${Y(120)} M${X(-740)} ${Y(-140)} H${X(-500)} M${X(-740)} ${Y(-20)} H${X(-500)}`} w={3 * s} a={draw} />
    <path d={`M${X(-740)} ${Y(-350)} L${X(-500)} ${Y(-350)} L${X(300)} ${Y(420)} L${X(-200)} ${Y(420)}Z`} fill={dawn > 0 ? '#F7E3A0' : '#9CCAD6'} opacity={.14 * Math.max(moon, dawn)} />
    {/* floor and plinth */}
    <SR d={rect(X(-1100), Y(300), 2200 * s, 500 * s)} mat="stone" t={.68 - dawn * .2} draw={draw} sw={1} hatch={0} />
    {Array.from({ length: 12 }, (_, i) => <Line key={i} d={`M${X(-1100 + i * 200)} ${Y(300)} L${X(-1400 + i * 260)} ${Y(800)}`} w={.8} a={.35} />)}
    <SR d={rect(X(-560), Y(230), 1240 * s, 90 * s)} mat="stone" t={.45} ang={0} draw={draw} sw={1.6} />
    <SR d={rect(X(-520), Y(210), 1160 * s, 24 * s)} mat="stone" t={.35} ang={0} draw={draw} sw={1.2} />
    {[-300, 40, 330].map(px => <Line key={px} d={`M${X(px)} ${Y(210)} V${Y(-30)}`} w={4 * s} col="#3A2418" a={draw} />)}
  </g>;
};

// ================================================================ THE FOUR RELICS on the plinth: a slab of striped rock, a phial of red clay, a grain under a small lens,
// a report tied with string. n 0..4 = how many are shown; glow 0..1.
const ClueRelics: React.FC<{ x?: N; y?: N; s?: N; draw?: N; n?: N; glow?: N }> = ({ x = 960, y = 760, s = 1, draw = 1, n = 4, glow = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, A = (i: N) => cl(n - i) * draw;
  return <g>
    <g opacity={A(0)}><Floor x={X(-480)} y={Y(6)} rx={120 * s} ry={10 * s} a={.3} />
      {[0, 1, 2, 3, 4, 5, 6].map(i => <SR key={i} d={rect(X(-580), Y(-140 + i * 20), 200 * s, (i === 4 ? 6 : 20) * s)} mat={i === 4 ? 'red' : i % 2 ? 'stone' : 'sand'} t={i === 4 ? .6 : .35 + (i % 3) * .1} ang={0} draw={draw} sw={.9} hatch={0} />)}</g>
    <g opacity={A(1)}><Floor x={X(-160)} y={Y(6)} rx={50 * s} ry={8 * s} a={.3} />
      <path d={`M${X(-190)} ${Y(-150)} H${X(-130)} V${Y(-10)} Q${X(-160)} ${Y(10)} ${X(-190)} ${Y(-10)}Z`} fill="#C9DDE6" fillOpacity={.35} stroke={SEP} strokeWidth={1.4} />
      <path d={`M${X(-188)} ${Y(-70)} H${X(-132)} V${Y(-12)} Q${X(-160)} ${Y(6)} ${X(-188)} ${Y(-12)}Z`} fill="#8C3424" opacity={.85} /><SR d={rect(X(-196), Y(-170), 72 * s, 22 * s)} mat="wood" t={.6} draw={draw} sw={1} /></g>
    <g opacity={A(2)}><Floor x={X(170)} y={Y(6)} rx={90 * s} ry={8 * s} a={.3} /><circle cx={X(170)} cy={Y(-60)} r={6 * s} fill="#EFE0C2" stroke={SEP} />
      <circle cx={X(150)} cy={Y(-80)} r={46 * s} fill="#FFFDF4" fillOpacity={.2} stroke="url(#gold)" strokeWidth={8 * s} /><Line d={`M${X(186)} ${Y(-44)} L${X(240)} ${Y(4)}`} w={8 * s} col="#4F3020" /></g>
    <g opacity={A(3)}><Floor x={X(500)} y={Y(6)} rx={140 * s} ry={10 * s} a={.3} />
      <SR d={pathOf([[X(380), Y(0)], [X(620), Y(0)], [X(600), Y(-40)], [X(400), Y(-40)]], true)} mat="paper" t={.3} draw={draw} sw={1.2} hatch={0} />
      <Line d={`M${X(500)} ${Y(-40)} V${Y(0)} M${X(390)} ${Y(-20)} H${X(610)}`} w={2} col="#8C3424" a={.9} /><Stipple x={X(400)} y={Y(-40)} w={200 * s} h={40 * s} n={60} seed="dustr" a={.4} /></g>
    {glow > 0 && <circle cx={x} cy={Y(-60)} r={600 * s} fill="url(#glowW)" opacity={.3 * glow} />}
  </g>;
};

// ================================================================ THE OLD THEORIES — an open old book whose plates turn (turn 0..3): a world with frost, a sick beast lying
// down, a volcano smoking; q 0..1 puts a question mark over each; blank 0..1 washes them away.
const TheoryCards: React.FC<{ x?: N; y?: N; s?: N; draw?: N; turn?: N; q?: N; blank?: N; tm?: N; frost?: N; keel?: N; erupt?: N; rip?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, turn = 3, q = 0, blank = 0, tm = 0, frost = 0, keel = 0, erupt = 0, rip = 0 }) => {
  // v2 (owner: no static scenes): each plate is a living tableau — frost creeps and snow falls (frost), the beast sways and keels over
  // (keel), the volcano erupts, smoke climbing in puffs (erupt; tm drives the motion); rip 0..3 tears the plates in half one by one
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  const plate = (i: N, px: N) => { const a = cl(turn - i) * (1 - blank), r = cl(rip - i), id = 'thc' + i + Math.round(x);
    const body = <g>
    <SR d={rect(X(px - 170), Y(-220), 340 * s, 400 * s)} mat="paper" t={.12} draw={draw} sw={1.4} hatch={0} />
    <defs><clipPath id={id}><path d={rect(X(px - 150), Y(-200), 300 * s, 300 * s)} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={X(px - 150)} y={Y(-200)} width={300 * s} height={300 * s} fill={i === 2 ? '#EFD9B8' : '#E4ECEE'} />
      {i === 0 && <g><SR d={`M${X(px - 150)} ${Y(60)} Q${X(px)} ${Y(0)} ${X(px + 150)} ${Y(60)} V${Y(100)} H${X(px - 150)}Z`} mat="leaf" t={.5} draw={draw} sw={1} hatch={0} />
        <path d={`M${X(px - 150)} ${Y(60 - frost * 40)} Q${X(px)} ${Y(0 - frost * 40)} ${X(px + 150)} ${Y(60 - frost * 40)} V${Y(100)} H${X(px - 150)}Z`} fill="#FFFFFF" opacity={frost * .9} stroke={SEP} strokeWidth={frost > .05 ? 1 : 0} />
        {Array.from({ length: 30 }, (_, k) => { const fx = px - 145 + rnd(k) * 290, fy = -200 + ((rnd(k + 3) * 300 + tm * 60 * (.6 + rnd(k + 5) * .5)) % 300); return <path key={k} d={`M${X(fx) - 3} ${Y(fy)} h6 M${X(fx)} ${Y(fy) - 3} v6`} stroke="#4A88AE" strokeWidth={1.2} opacity={frost} />; })}
        <SR d={`M${X(px - 60)} ${Y(60)} L${X(px - 40)} ${Y(-60)} L${X(px - 20)} ${Y(60)}Z`} mat="forest" t={.75 - frost * .4} draw={draw} sw={1} /><SR d={`M${X(px + 40)} ${Y(50)} L${X(px + 58)} ${Y(-30)} L${X(px + 76)} ${Y(50)}Z`} mat="forest" t={.75 - frost * .4} draw={draw} sw={1} /></g>}
      {i === 1 && <g transform={`rotate(${keel * 82 + Math.sin(tm * 3) * 4 * (1 - keel)} ${X(px + 100)} ${Y(70)})`}>
        <SR d={`M${X(px - 130)} ${Y(-10)} C${X(px - 80)} ${Y(-60)} ${X(px + 40)} ${Y(-60)} ${X(px + 80)} ${Y(-20)} C${X(px + 100)} ${Y(-60)} ${X(px + 120)} ${Y(-110)} ${X(px + 140)} ${Y(-112)} L${X(px + 144)} ${Y(-96)} C${X(px + 126)} ${Y(-80)} ${X(px + 112)} ${Y(-20)} ${X(px + 96)} ${Y(10)} C${X(px + 40)} ${Y(30)} ${X(px - 80)} ${Y(30)} ${X(px - 130)} ${Y(-10)}Z`} mat="land" t={.62} draw={draw} sw={1.2} />
        {[-80, -40, 30, 66].map(k => <SR key={k} d={rect(X(px + k), Y(10), 16 * s, 60 * s)} mat="land" t={.7} draw={draw} sw={1} />)}</g>}
      {i === 1 && <Line d={`M${X(px - 150)} ${Y(70)} H${X(px + 150)}`} w={1.4} />}
      {i === 2 && <g><SR d={`M${X(px - 150)} ${Y(100)} L${X(px - 30)} ${Y(-40)} L${X(px + 30)} ${Y(-40)} L${X(px + 150)} ${Y(100)}Z`} mat="stone" t={.62} draw={draw} sw={1.2} />
        <path d={`M${X(px - 26)} ${Y(-40)} L${X(px - 60 - erupt * 30)} ${Y(40 + erupt * 50)} L${X(px - 40)} ${Y(40 + erupt * 50)} L${X(px - 8)} ${Y(-40)}Z`} fill="#D2643E" opacity={erupt} />
        <circle cx={X(px)} cy={Y(-44)} r={40 * s} fill="#F2A672" opacity={erupt * .7} filter="url(#b8)" />
        {Array.from({ length: 7 }, (_, k) => { const u = ((tm * .35 + k / 7) % 1), r2 = (16 + u * 50) * s; return <SR key={k} d={ell(X(px + Math.sin(k * 2 + tm) * 20 + u * 60), Y(-60 - u * 160), r2, r2 * .7)} mat="night" t={.4 + u * .2} draw={draw * erupt * (1 - u * .6)} sw={.9} hatch={0} />; })}</g>}
    </g>
    <Ink d={rect(X(px - 150), Y(-200), 300 * s, 300 * s)} w={1.2} draw={draw} />
    <Fell x={X(px)} y={Y(150)} s={24 * s} t={['A slow cold?', 'A sickness?', 'Volcanoes?'][i]} italic />
    {q > 0 && <Hand x={X(px + 110)} y={Y(-130)} s={70 * s} t="?" col="#B8432A" a={cl(q * 3 - i)} />}
    </g>;
    if (r <= 0) return <g key={i} opacity={a}>{body}</g>;
    const cl1 = id + 'l', cl2 = id + 'r', mx = X(px) + Math.sin(i * 3) * 10;
    return <g key={i} opacity={a * (1 - r * .9)}>
      <defs><clipPath id={cl1}><path d={`M${X(px - 200)} ${Y(-260)} L${mx + 6} ${Y(-260)} L${mx - 8} ${Y(-40)} L${mx + 10} ${Y(80)} L${mx - 4} ${Y(240)} L${X(px - 200)} ${Y(240)}Z`} /></clipPath>
        <clipPath id={cl2}><path d={`M${X(px + 200)} ${Y(-260)} L${mx + 6} ${Y(-260)} L${mx - 8} ${Y(-40)} L${mx + 10} ${Y(80)} L${mx - 4} ${Y(240)} L${X(px + 200)} ${Y(240)}Z`} /></clipPath></defs>
      <g clipPath={`url(#${cl1})`} transform={`translate(${-r * 160 * s} ${r * r * 300 * s}) rotate(${-r * 25} ${mx} ${Y(0)})`}>{body}</g>
      <g clipPath={`url(#${cl2})`} transform={`translate(${r * 180 * s} ${r * r * 260 * s}) rotate(${r * 30} ${mx} ${Y(0)})`}>{body}</g>
    </g>; };
  return <g>{[0, 1, 2].map(i => plate(i, -400 + i * 400))}</g>;
};

// ================================================================ THE STONE BOOK (v8 device) — a block of layered limestone (the strata seen edge-on) that OPENS like a book
// (open 0..1): the two facing pages are the cliff face, its beds drawn as lines of print — crowded with tiny shells below, the thin red clay
// across the middle (red 0..1), almost empty stone above. page 0..1 turns one leaf right→left over the spread (the riffle of time).
const RockBook: React.FC<{ x?: N; y?: N; s?: N; draw?: N; open?: N; page?: N; red?: N; thread?: N; sparse?: N; ruler?: N }> = ({ x = 960, y = 600, s = 1, draw = 1, open = 0, page = 0, red = 0, thread = 0, sparse = 1, ruler = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, n = 14, o = ph(open, 0, 1);
  const W = 420, H = 520, lift = 40 * o;      // page width / height; the gutter dips, the outer edges lift
  const shells = useMemo(() => Array.from({ length: 160 }, (_, i) => [rnd(i * 1.3), rnd(i * 2.1 + 5), 3 + rnd(i + 8) * 5] as [N, N, N]), []);
  const pageAt = (side: N, k: N) => {   // side -1 left, +1 right; returns the page outline and a mapper (u 0..1 across, v 0..1 down) → point
    const ex = side * W, P = (u: N, v: N): Pt => [X(ex * u), Y(-H / 2 + v * H - lift * u * (1 - Math.abs(v - .5)) * .3 - lift * u)];
    const d = `M${P(0, 0).join(' ')} Q${P(.5, 0)[0]} ${P(.5, 0)[1] - 18 * s} ${P(1, 0).join(' ')} L${P(1, 1).join(' ')} Q${P(.5, 1)[0]} ${P(.5, 1)[1] - 18 * s} ${P(0, 1).join(' ')}Z`;
    return { d, P };
  };
  const spread = (side: N) => { const { d, P } = pageAt(side, 0), cid = 'rbk' + side + Math.round(x);
    return <g key={side}>
      <defs><clipPath id={cid}><path d={d} /></clipPath></defs>
      <SR d={d} mat="stone" t={.18} ang={0} draw={draw} sw={1.6} hatch={0} />
      <g clipPath={`url(#${cid})`}>
        {Array.from({ length: n }, (_, i) => { const v0 = i / n, v1 = (i + 1) / n, isR = i === 6;
          const q = (u: N, v: N) => P(u, v).map(f1).join(' ');
          return <g key={i}>
            <path d={`M${q(0, v0)} L${q(1, v0)} L${q(1, isR ? v0 + .3 / n : v1)} L${q(0, isR ? v0 + .3 / n : v1)}Z`} fill={isR ? '#B8432A' : i % 2 ? '#EFE0C2' : '#E8CDB0'} opacity={isR ? .35 + .65 * red : .9} />
            <path d={`M${q(.04, v0)} L${q(.96, v0)}`} stroke={SEP} strokeWidth={isR ? 1.6 : .9} opacity={.6} />
          </g>; })}
        {shells.map(([u, v, r], i) => { const above = v < 6 / n; if (above && i % 9) return null; if (!above && v < 7 / n) return null; const [px, py] = P(.04 + u * .92, v);
          return <g key={'s' + i} opacity={(above ? sparse : 1) * .8}><circle cx={px} cy={py} r={r * s} fill="none" stroke={SEP} strokeWidth={.9} /><circle cx={px + r * .5 * s} cy={py - r * .3 * s} r={r * .5 * s} fill="none" stroke={SEP} strokeWidth={.7} /></g>; })}
      </g>
    </g>; };
  const turn = cl(page), tw = Math.cos(turn * Math.PI), tp = pageAt(1, 0);
  return <g opacity={draw}>
    <Floor x={x} y={Y(H / 2 + 40)} rx={(o > 0 ? 520 : 480) * s} ry={30 * s} a={.35} />
    {/* closed: a block of strata seen edge-on */}
    {o < 1 && <g opacity={1 - o}>{Array.from({ length: n }, (_, i) => <SR key={i} d={rect(X(-460), Y(-200 + i * 28), 920 * s, (i === 6 ? 10 : 28) * s)} mat={i === 6 ? 'red' : i % 2 ? 'stone' : 'sand'} t={i === 6 ? .3 + .35 * red : .26 + (i % 3) * .08} ang={0} draw={draw} sw={.9} hatch={0} />)}</g>}
    {o > 0 && <g opacity={o}>
      <SR d={`M${X(-W - 14)} ${Y(-H / 2 - lift + 10)} L${X(W + 14)} ${Y(-H / 2 - lift + 10)} L${X(W + 14)} ${Y(H / 2 + 22)} L${X(-W - 14)} ${Y(H / 2 + 22)}Z`} mat="stone" t={.62} ang={0} draw={draw} sw={1.6} />
      {spread(-1)}{spread(1)}
      <Ink d={`M${x} ${Y(-H / 2)} V${Y(H / 2)}`} w={2.4} draw={draw} />
      {turn > 0 && turn < 1 && <g><path d={`M${x} ${Y(-H / 2)} L${X(W * tw)} ${Y(-H / 2 - 30 * Math.sin(turn * Math.PI))} L${X(W * tw)} ${Y(H / 2 - 30 * Math.sin(turn * Math.PI))} L${x} ${Y(H / 2)}Z`} fill={tw > 0 ? '#EFE0C2' : '#E8CDB0'} stroke={SEP} strokeWidth={1.4} />
        {Array.from({ length: 8 }, (_, k) => <Line key={k} d={`M${x} ${Y(-H / 2 + k * H / 8)} L${X(W * tw)} ${Y(-H / 2 + k * H / 8 - 30 * Math.sin(turn * Math.PI))}`} w={.7} a={.4} />)}</g>}
    </g>}
    {thread > 0 && <path d={`M${X(-W + 20)} ${Y(H / 2 - 20)} L${X(-W + 20)} ${Y(-H / 2 + 20)}`} stroke="#D2643E" strokeWidth={4} pathLength={1} strokeDasharray={`${thread} 1`} />}
    {ruler > 0 && (() => { const by = Y(-H / 2 + 6 / 14 * H - lift * .6), rx = X(W * .62), dy = (1 - ruler) * -700 * s;   // a brass ruler comes down and stands across the red band
      return <g transform={`translate(0 ${dy})`}><rect x={rx - 22 * s} y={by - 170 * s} width={44 * s} height={340 * s} fill="url(#gold)" stroke={SEP} strokeWidth={1.6} />
        {Array.from({ length: 34 }, (_, k) => <line key={k} x1={rx - 22 * s} y1={by - 170 * s + k * 10 * s} x2={rx - 22 * s + (k % 5 ? 10 : 20) * s} y2={by - 170 * s + k * 10 * s} stroke={SEP} strokeWidth={k % 5 ? .8 : 1.6} />)}
        <path d={`M${rx + 30 * s} ${by - 2 * s} h14 v${16 * s} h-14`} stroke="#B8432A" strokeWidth={3} fill="none" opacity={cl(ruler * 3 - 2)} /></g>; })()}
  </g>;
};

// ================================================================ FORAMINIFERA — the shells of plankton in the stone, seen close: little chambered spirals crowded like
// letters on a page (n 0..1 = how many survive), each one drawn as a tiny engraved spiral of chambers.
const Foraminifera: React.FC<{ x?: N; y?: N; r?: N; draw?: N; n?: N; turn?: N; alive?: N; tm?: N; blink?: N }> = ({ x = 960, y = 540, r = 420, draw = 1, n = 1, turn = 0, alive = 0, tm = 0, blink = 0 }) => {
  // v2: alive 1 = living plankton in sea water (they drift and turn, spines out); 0 = settled in stone; blink 0..1 = they go out one by one
  const sh = useMemo(() => Array.from({ length: 70 }, (_, i) => [(rnd(i) * 2 - 1) * .9, (rnd(i + 9) * 2 - 1) * .9, 14 + rnd(i + 4) * 22, rnd(i + 2) * 360] as [N, N, N, N]).filter(p => Math.hypot(p[0], p[1]) < .92), []);
  const id = 'forc' + Math.round(x);
  return <g opacity={draw}>
    <defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <g clipPath={`url(#${id})`}><rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill="#EFE0C2" /><rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill="#7FB4C8" opacity={alive * .6} /><Stipple x={x - r} y={y - r} w={2 * r} h={2 * r} n={900} seed="forst" a={.3} />
      {sh.map(([u, v, sz, rot], i) => i / sh.length < n && rnd(i + 77) >= blink ? <g key={i} transform={`translate(${x + (u + alive * .12 * Math.sin(tm * .7 + i)) * r} ${y + (v + alive * (.1 * Math.cos(tm * .5 + i * 1.3) - .1)) * r}) rotate(${rot + (i === 3 ? turn * 90 : 0) + alive * tm * (20 + (i % 5) * 9)})`}>
        {alive > 0 && Array.from({ length: 10 }, (_, k) => { const a2 = k / 10 * Math.PI * 2; return <line key={'sp' + k} x1={0} y1={0} x2={Math.cos(a2) * sz * 1.4} y2={Math.sin(a2) * sz * 1.4} stroke="#FBF4E2" strokeWidth={.8} opacity={alive * .8} />; })}
        {Array.from({ length: 6 }, (_, k) => { const a = k * .9, rr2 = sz * (.35 + k * .12); return <circle key={k} cx={Math.cos(a) * rr2 * .6} cy={Math.sin(a) * rr2 * .6} r={rr2 * .45} fill="#FBF4E2" stroke={SEP} strokeWidth={1} />; })}
      </g> : null)}</g>
    <circle cx={x} cy={y} r={r * 1.04} fill="none" stroke="url(#gold)" strokeWidth={r * .07} /><Ink d={ell(x, y, r * 1.08, r * 1.08)} w={1.4} draw={draw} />
  </g>;
};

// ================================================================ THE GORGE AT GUBBIO (R-01, P-01) — a road cut in the Apennines: pale pink and white limestone beds tilted
// toward the road, scrub on top, an asphalt road with a low wall; red 0..1 = the boundary clay line glowing.
const GubbioGorge: React.FC<{ x?: N; y?: N; s?: N; draw?: N; red?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, red = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <rect x={-200} y={-200} width={2320} height={600} fill="#C9DDE6" />
    <SR d={`M-200 ${Y(-300)} C300 ${Y(-380)} 700 ${Y(-330)} 1100 ${Y(-380)} C1500 ${Y(-420)} 1800 ${Y(-360)} 2120 ${Y(-390)} V${Y(-200)} H-200Z`} mat="leaf" t={.5} draw={draw} sw={1} hatch={0} />
    {/* tilted beds */}
    {Array.from({ length: 22 }, (_, i) => { const o = -560 + i * 46; return <SR key={i} d={`M${X(-1200)} ${Y(o + 260)} L${X(1200)} ${Y(o - 140)} L${X(1200)} ${Y(o - 94)} L${X(-1200)} ${Y(o + 306)}Z`} mat={i === 11 ? 'red' : i % 3 === 0 ? 'stone' : 'sand'} t={i === 11 ? .45 + .3 * red : .22 + (i % 4) * .07} ang={-10} draw={draw} sw={.9} hatch={0} />; })}
    {red > 0 && <path d={`M${X(-1200)} ${Y(-560 + 11 * 46 + 283)} L${X(1200)} ${Y(-560 + 11 * 46 - 117)}`} stroke="#D2643E" strokeWidth={5} opacity={red} />}
    {Array.from({ length: 40 }, (_, i) => <Line key={i} d={`M${X(-1100 + i * 55)} ${Y(-400 + (i % 5) * 30)} l${8 * s} ${120 * s}`} w={.7} a={.3} />)}
    <SR d={`M-200 ${Y(330)} L2120 ${Y(330)} L2120 1300 L-200 1300Z`} mat="night" t={.55} draw={draw} sw={1} hatch={0} />
    <SR d={rect(-200, Y(300), 2320, 34 * s)} mat="stone" t={.5} ang={0} draw={draw} sw={1} />
    {Array.from({ length: 12 }, (_, i) => <Line key={i} d={`M${-100 + i * 200} ${Y(420)} h${90}`} w={4} col="#F3E7CC" a={.7} />)}
  </g>;
};

// ================================================================ A FINGER ON THE CLAY — a close-up hand coming in from the right, its index finger resting on the thin red
// band of the cliff (glow 0..1).
const FingerOnClay: React.FC<{ x?: N; y?: N; s?: N; draw?: N; glow?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, glow = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    {Array.from({ length: 9 }, (_, i) => <SR key={i} d={rect(X(-1100), Y(-500 + i * 110 + (i > 4 ? -60 : 0)), 2200 * s, (i === 4 ? 50 : 110) * s)} mat={i === 4 ? 'red' : i % 2 ? 'stone' : 'sand'} t={i === 4 ? .5 + glow * .2 : .25 + (i % 3) * .06} ang={0} draw={draw} sw={1} hatch={0} />)}
    <Stipple x={X(-1100)} y={Y(-500)} w={2200 * s} h={1000 * s} n={1400} seed="fcl" a={.3} />
    {glow > 0 && <rect x={X(-1100)} y={Y(-60)} width={2200 * s} height={50 * s} fill="#F2A672" opacity={glow * .5} filter="url(#b8)" />}
    {/* Walter's right hand, seen from the back, index finger laid on the clay (engine v9 HumanHand, Gray's proportions) */}
    <HumanHand id={'foc' + Math.round(x)} x={X(80) + 560 * s} y={Y(-40) - 96 * s} s={3.05 * s} ang={180} pose="point" sleeve="#7FA8C4" draw={draw} />
  </g>;
};

// ================================================================ THE CLAY HOURGLASS — a turned-wood and glass hourglass whose sand is the red clay (flow 0..1 runs it;
// turn = degrees), a brass gauge on its side (gauge 0..1, "iridium") with a counter of years.
const ClayHourglass: React.FC<{ x?: N; y?: N; s?: N; draw?: N; flow?: N; turn?: N; gauge?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, flow = .4, turn = 0, gauge = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, up = 1 - flow, dn = flow;
  return <g opacity={draw} transform={turn ? `rotate(${turn} ${x} ${y})` : undefined}>
    <Floor x={x} y={Y(270)} rx={200 * s} ry={18 * s} a={.35} />
    {[-260, 240].map(t => <SR key={t} d={rr(X(-170), Y(t), 340 * s, 26 * s, 8 * s)} mat="wood" t={.55} ang={0} draw={draw} sw={1.4} />)}
    {[-150, 150].map(px => <SR key={px} d={rect(X(px - 10), Y(-236), 20 * s, 476 * s)} mat="wood" t={.6} draw={draw} sw={1.2} />)}
    <path d={`M${X(-110)} ${Y(-234)} C${X(-110)} ${Y(-80)} ${X(-12)} ${Y(-30)} ${X(-12)} ${Y(0)} C${X(-12)} ${Y(30)} ${X(-110)} ${Y(80)} ${X(-110)} ${Y(238)} H${X(110)} C${X(110)} ${Y(80)} ${X(12)} ${Y(30)} ${X(12)} ${Y(0)} C${X(12)} ${Y(-30)} ${X(110)} ${Y(-80)} ${X(110)} ${Y(-234)}Z`} fill="#C9DDE6" fillOpacity={.25} stroke={SEP} strokeWidth={1.6} />
    <path d={`M${X(-100 * up)} ${Y(-234 + 200 * (1 - up))} Q${x} ${Y(-234 + 200 * (1 - up) + 20)} ${X(100 * up)} ${Y(-234 + 200 * (1 - up))} L${X(12)} ${Y(-6)} L${X(-12)} ${Y(-6)}Z`} fill="#A8432A" opacity={up > .02 ? .9 : 0} />
    <path d={`M${X(-108)} ${Y(238)} Q${x} ${Y(238 - 200 * dn)} ${X(108)} ${Y(238)}Z`} fill="#8C3424" opacity={.9} />
    {flow > 0 && flow < 1 && <Line d={`M${x} ${Y(0)} V${Y(238 - 160 * dn)}`} w={2.4} col="#8C3424" />}
    <path d={`M${X(-80)} ${Y(-200)} Q${X(-60)} ${Y(-120)} ${X(-30)} ${Y(-60)}`} stroke="#FFFDF4" strokeWidth={4} fill="none" opacity={.4} />
    {gauge > 0 && <g opacity={cl(gauge * 4)}>
      <SR d={rect(X(200), Y(-200), 60 * s, 400 * s)} mat="brass" t={.4} draw={draw} sw={1.2} hatch={0} />
      <rect x={X(212)} y={Y(190 - 380 * gauge)} width={36 * s} height={380 * gauge * s} fill="#B8862B" opacity={.8} />
      {Array.from({ length: 9 }, (_, i) => <Line key={i} d={`M${X(200)} ${Y(-180 + i * 45)} h${14 * s}`} w={1} />)}
      <Fell x={X(230)} y={Y(240)} s={22 * s} t="iridium" italic />
    </g>}
  </g>;
};

// ================================================================ THE ALVAREZ DESK — a study in the late 1970s: a wide desk, a lamp with a green shade, rock samples and
// papers; a window with the Berkeley hills at night. (Luis and Walter are Persons.)
const AlvarezStudy: React.FC<{ x?: N; y?: N; s?: N; draw?: N; lamp?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, lamp = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="wall" t={.35} draw={draw} sw={0} hatch={0} rim={false} />
    <SR d={rect(X(-260), Y(-520), 520 * s, 380 * s)} mat="wood" t={.6} draw={draw} sw={1.4} />
    <NightWash x={X(-240)} y={Y(-500)} w={480 * s} h={340 * s} seed="alvw" top="#141C38" bot="#3A4A7A" />
    <SR d={`M${X(-240)} ${Y(-200)} C${X(-120)} ${Y(-260)} ${X(0)} ${Y(-230)} ${X(240)} ${Y(-260)} V${Y(-160)} H${X(-240)}Z`} mat="night" t={.7} draw={draw} sw={.8} hatch={0} />
    {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={X(-220 + i * 48)} cy={Y(-190 + (i % 3) * 8)} r={2} fill="#F0D9A8" />)}
    <Line d={`M${x} ${Y(-520)} V${Y(-140)} M${X(-260)} ${Y(-330)} H${X(260)}`} w={4 * s} a={draw} />
    <SR d={rect(X(-700), Y(160), 1400 * s, 40 * s)} mat="wood" t={.55} ang={0} draw={draw} sw={1.6} />
    <SR d={rect(X(-680), Y(200), 1360 * s, 300 * s)} mat="wood" t={.72} ang={0} draw={draw} sw={1.2} />
    <g><circle cx={X(120)} cy={Y(80)} r={300 * s} fill="url(#glowW)" opacity={.5 * lamp} /><Line d={`M${X(120)} ${Y(160)} V${Y(60)}`} w={4 * s} />
      <SR d={`M${X(60)} ${Y(64)} L${X(180)} ${Y(64)} L${X(160)} ${Y(20)} L${X(80)} ${Y(20)}Z`} mat="leaf" t={.6} draw={draw} sw={1.2} /></g>
    {[[-420, 'stone'], [-340, 'red'], [-260, 'sand']].map(([px, m], i) => <SR key={i} d={rect(X(px as N), Y(120 - i * 6), 60 * s, (40 + i * 6) * s)} mat={m as string} t={.45} draw={draw} sw={1} />)}
    <SR d={pathOf([[X(320), Y(158)], [X(560), Y(158)], [X(540), Y(130)], [X(340), Y(130)]], true)} mat="paper" t={.1} draw={draw} sw={1} hatch={0} />
  </g>;
};

// ================================================================ DUST FROM SPACE — the night above the curve of the Earth; fine dust sifts down out of the stars like
// snow (k = how far it has fallen, loop it linearly).
const SpaceDust: React.FC<{ x?: N; y?: N; draw?: N; k?: N; earth?: N }> = ({ x = 960, y = 540, draw = 1, k = 0, earth = 1 }) => {
  const st = useMemo(() => starField(31, 200, -200, -200, 2320, 900, 2.2), []);
  return <g opacity={draw}>
    <NightWash x={-200} y={-200} w={2320} h={1480} seed="spd" top="#0B1030" bot="#1C2650" />
    {st.map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r * .8} a={.7} />)}
    {Array.from({ length: 160 }, (_, i) => { const px = rnd(i) * 2000 - 40, py = ((rnd(i + 5) * 1200 + k * 900 * (.6 + rnd(i + 2) * .6)) % 1200) - 100; return <line key={i} x1={px} y1={py} x2={px - 3} y2={py - 14} stroke="#F7E3A0" strokeWidth={1.2} opacity={.55} />; })}
    {earth > 0 && <g opacity={earth}><path d={`M-200 1100 Q${x} ${y + 250} 2120 1100Z`} fill="#22507A" stroke={SEP} strokeWidth={1.4} /><path d={`M-200 1100 Q${x} ${y + 250} 2120 1100`} fill="none" stroke="#9CCAD6" strokeWidth={10} opacity={.5} filter="url(#b8)" /></g>}
  </g>;
};

// ================================================================ THE IRIDIUM METER (v8 device) — a 1970s detector cabinet: a grey steel panel, knobs, a sample drawer and a
// big round dial; v 0..1.3 swings the needle (1 = the last mark; beyond it the needle bends against the stop), roof 0..1 LENGTHENS the needle up
// out of the dial, through the ceiling, toward the sky.
const IridiumMeter: React.FC<{ x?: N; y?: N; s?: N; draw?: N; v?: N; roof?: N; drawer?: N; room?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, v = .1, roof = 0, drawer = 0, room = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, cx = X(0), cy = Y(-60), R = 220 * s;
  const a = -150 + Math.min(1.08, v) * 120, bend = Math.max(0, v - 1.08) * 160, ar = a * Math.PI / 180;
  const tip: Pt = [cx + Math.cos(ar) * R * .9, cy + Math.sin(ar) * R * .9];
  return <g opacity={draw}>
    {room > 0 && <g opacity={room}><SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="stone" t={.3} draw={draw} sw={0} hatch={0} rim={false} />
      {[-700, -350, 0, 350, 700].map((k, i) => <g key={i}><Line d={`M${X(k)} ${Y(-700)} V${Y(-560)}`} w={2} /><path d={`M${X(k - 50)} ${Y(-520)} Q${X(k)} ${Y(-575)} ${X(k + 50)} ${Y(-520)}Z`} fill="#5F8A5A" stroke={SEP} strokeWidth={1.2} /><circle cx={X(k)} cy={Y(-515)} r={9 * s} fill="#FFF4D2" /></g>)}
      {roof > 0 && <g opacity={cl(roof * 3)}><rect x={X(-1100)} y={Y(-2400)} width={2200 * s} height={1700 * s} fill="#141C38" />{Array.from({ length: 60 }, (_, i) => <circle key={i} cx={X(-1000 + rnd(i) * 2000)} cy={Y(-2300 + rnd(i + 7) * 1550)} r={1 + rnd(i + 3) * 1.8} fill="#FFF4D2" />)}
        <path d={`M${X(-1100)} ${Y(-700)} L${X(1100)} ${Y(-700)}`} stroke="#3A2418" strokeWidth={30 * s} strokeDasharray={`${60 * s} ${8 * s}`} /></g>}
      <SR d={rect(X(-1100), Y(320), 2200 * s, 400 * s)} mat="stone" t={.45} draw={draw} sw={1} hatch={0} /></g>}
    <Floor x={x} y={Y(330)} rx={420 * s} ry={24 * s} a={.35} />
    <SR d={rr(X(-380), Y(-380), 760 * s, 710 * s, 14 * s)} mat="stone" t={.55} ang={0} draw={draw} sw={1.8} />
    <SR d={rect(X(-340), Y(170), 680 * s, 120 * s)} mat="stone" t={.62} ang={0} draw={draw} sw={1.4} />
    <g transform={`translate(0 ${drawer * 60 * s})`}><SR d={rect(X(-120), Y(200), 240 * s, 60 * s)} mat="stone" t={.4} draw={draw} sw={1.2} /><Line d={`M${X(-40)} ${Y(230)} h${80 * s}`} w={4 * s} /></g>
    {[-260, -180, 180, 260].map(k => <g key={k}><circle cx={X(k)} cy={Y(120)} r={22 * s} fill="#2B3B66" stroke={SEP} strokeWidth={1.2} /><Line d={`M${X(k)} ${Y(120)} l${10 * s} ${-14 * s}`} w={2} col="#F3E7CC" /></g>)}
    {/* the dial */}
    <circle cx={cx} cy={cy} r={R} fill="#FBF4E2" stroke={SEP} strokeWidth={2.2} />
    <circle cx={cx} cy={cy} r={R * 1.08} fill="none" stroke="url(#gold)" strokeWidth={R * .08} />
    {Array.from({ length: 25 }, (_, i) => { const t = (-150 + i * 5) * Math.PI / 180; return <line key={i} x1={cx + Math.cos(t) * R * .78} y1={cy + Math.sin(t) * R * .78} x2={cx + Math.cos(t) * R * (i % 4 ? .86 : .9)} y2={cy + Math.sin(t) * R * (i % 4 ? .86 : .9)} stroke={SEP} strokeWidth={i % 4 ? 1 : 2.2} />; })}
    <path d={`M${cx + Math.cos(-150 * Math.PI / 180) * R * .7} ${cy + Math.sin(-150 * Math.PI / 180) * R * .7} A${R * .7} ${R * .7} 0 0 1 ${cx + Math.cos(-120 * Math.PI / 180) * R * .7} ${cy + Math.sin(-120 * Math.PI / 180) * R * .7}`} stroke="#5F8A5A" strokeWidth={10} fill="none" />
    <text x={cx + Math.cos(-138 * Math.PI / 180) * R * .55} y={cy + Math.sin(-138 * Math.PI / 180) * R * .55} fontSize={22 * s} fontFamily="'IM Fell DW Pica', serif" fontStyle="italic" fill={SEP} textAnchor="middle">normal</text>
    <Line d={`M${cx + Math.cos(-30 * Math.PI / 180) * R * .92} ${cy + Math.sin(-30 * Math.PI / 180) * R * .92} l${10 * s} ${-6 * s}`} w={6 * s} col="#3A2418" />
    {/* the needle — bending against the stop, then going on up through the roof */}
    <path d={`M${cx} ${cy} Q${cx + Math.cos(ar) * R * .5} ${cy + Math.sin(ar) * R * .5 - bend * s} ${tip[0] + bend * .2 * s} ${tip[1] - bend * s}`} stroke="#B8432A" strokeWidth={4 * s} fill="none" strokeLinecap="round" />
    {roof > 0 && <path d={`M${tip[0] + bend * .2 * s} ${tip[1] - bend * s} L${tip[0] + bend * .2 * s + 40 * s} ${tip[1] - bend * s - 1600 * roof * s}`} stroke="#B8432A" strokeWidth={4 * s} strokeLinecap="round" />}
    <circle cx={cx} cy={cy} r={12 * s} fill="url(#gold)" stroke={SEP} />
  </g>;
};

// ================================================================ A CENTURY OF DUST IN AN AFTERNOON — a clean wooden shelf under a wall clock; dust 0..1 falls in a heap.
const DustShelf: React.FC<{ x?: N; y?: N; s?: N; draw?: N; dust?: N; tick?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, dust = 0, tick = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="wall" t={.3} draw={draw} sw={0} hatch={0} rim={false} />
    <circle cx={X(0)} cy={Y(-300)} r={120 * s} fill="#FBF4E2" stroke={SEP} strokeWidth={2} /><circle cx={X(0)} cy={Y(-300)} r={130 * s} fill="none" stroke="#8C5A36" strokeWidth={14 * s} />
    {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return <Line key={i} d={`M${X(Math.cos(a) * 100)} ${Y(-300 + Math.sin(a) * 100)} l${Math.cos(a) * 12 * s} ${Math.sin(a) * 12 * s}`} w={2} />; })}
    <Line d={`M${X(0)} ${Y(-300)} l${Math.cos((tick * 30 - 90) * Math.PI / 180) * 90 * s} ${Math.sin((tick * 30 - 90) * Math.PI / 180) * 90 * s} M${X(0)} ${Y(-300)} l0 ${-60 * s}`} w={3} />
    <SR d={rect(X(-500), Y(80), 1000 * s, 30 * s)} mat="wood" t={.55} ang={0} draw={draw} sw={1.4} />
    {[-420, 420].map(k => <SR key={k} d={`M${X(k)} ${Y(110)} L${X(k)} ${Y(180)} L${X(k + (k < 0 ? 60 : -60))} ${Y(110)}Z`} mat="wood" t={.7} draw={draw} sw={1} />)}
    {dust > 0 && <g><path d={`M${X(-470)} ${Y(80)} Q${X(-200)} ${Y(80 - 90 * dust)} ${X(0)} ${Y(80 - 110 * dust)} Q${X(220)} ${Y(80 - 90 * dust)} ${X(470)} ${Y(80)}Z`} fill="#C9AE84" stroke={SEP} strokeWidth={1} />
      <Stipple x={X(-470)} y={Y(80 - 110 * dust)} w={940 * s} h={110 * dust * s} n={400} seed="dsh" a={.5} />
      {dust < 1 && Array.from({ length: 60 }, (_, i) => <circle key={i} cx={X(-450 + rnd(i) * 900)} cy={Y(-200 + rnd(i + 3) * 260)} r={2} fill="#8C6E4A" opacity={(1 - dust) * .8} />)}</g>}
  </g>;
};

// ================================================================ A METEORITE, SLICED — a pitted dark stone (an iron-rich meteorite) whose cut face glints with metal in the
// crossing bands of the Widmanstätten pattern (cut 0..1); a dull pebble of Earth rock beside it.
const MeteoriteSlice: React.FC<{ x?: N; y?: N; s?: N; draw?: N; cut?: N }> = ({ x = 960, y = 560, s = 1, draw = 1, cut = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, id = 'mets' + Math.round(x);
  const face = `M${X(-220)} ${Y(-120)} C${X(-120)} ${Y(-200)} ${X(160)} ${Y(-190)} ${X(230)} ${Y(-90)} C${X(270)} ${Y(20)} ${X(200)} ${Y(150)} ${X(40)} ${Y(170)} C${X(-140)} ${Y(180)} ${X(-260)} ${Y(60)} ${X(-220)} ${Y(-120)}Z`;
  return <g opacity={draw}>
    <Floor x={x} y={Y(200)} rx={300 * s} ry={20 * s} a={.4} />
    <SR d={face} mat="night" t={.8} draw={draw} sw={2} />
    {Array.from({ length: 14 }, (_, i) => <SR key={i} d={ell(X(-180 + rnd(i) * 360), Y(-130 + rnd(i + 4) * 260), 10 + rnd(i + 2) * 16, 7 + rnd(i + 6) * 10)} mat="night" t={.95} draw={draw} sw={.8} hatch={0} />)}
    {cut > 0 && <g><defs><clipPath id={id}><path d={face} /></clipPath><clipPath id={id + 'w'}><rect x={X(-280)} y={Y(-240)} width={(40 + cut * 540) * s} height={480 * s} /></clipPath></defs><g clipPath={`url(#${id + 'w'})`}><g clipPath={`url(#${id})`}>
      <rect x={X(-300)} y={Y(-220)} width={600 * s} height={420 * s} fill="#C9C2A6" />
      {Array.from({ length: 34 }, (_, i) => <line key={i} x1={X(-300 + i * 20)} y1={Y(-220)} x2={X(-300 + i * 20 + 240)} y2={Y(200)} stroke="#76725E" strokeWidth={2} opacity={.7} />)}
      {Array.from({ length: 34 }, (_, i) => <line key={'b' + i} x1={X(-300 + i * 22)} y1={Y(200)} x2={X(-300 + i * 22 + 180)} y2={Y(-220)} stroke="#F3E7CC" strokeWidth={1.4} opacity={.6} />)}
      <path d={`M${X(80)} ${Y(-170)} L${X(240)} ${Y(-60)} L${X(200)} ${Y(-30)} L${X(40)} ${Y(-140)}Z`} fill="#FFFDF4" opacity={.35} /></g></g>
      {cut < .99 && <g transform={`rotate(${cut * 2400} ${X(-240 + cut * 540)} ${Y(-260)})`}><circle cx={X(-240 + cut * 540)} cy={Y(-260)} r={110 * s} fill="#C9C2B6" stroke={SEP} strokeWidth={1.6} />
        {Array.from({ length: 36 }, (_, i) => { const a2 = i / 36 * Math.PI * 2, cx2 = X(-240 + cut * 540), cy2 = Y(-260); return <path key={i} d={`M${cx2 + Math.cos(a2) * 110 * s} ${cy2 + Math.sin(a2) * 110 * s} L${cx2 + Math.cos(a2 + .08) * 122 * s} ${cy2 + Math.sin(a2 + .08) * 122 * s} L${cx2 + Math.cos(a2 + .17) * 110 * s} ${cy2 + Math.sin(a2 + .17) * 110 * s}`} fill="#8C8676" stroke={SEP} strokeWidth={.6} />; })}
        <circle cx={X(-240 + cut * 540)} cy={Y(-260)} r={18 * s} fill="url(#gold)" stroke={SEP} /></g>}</g>}
    <SR d={ell(X(380), Y(150), 60 * s, 40 * s)} mat="stone" t={.45} draw={draw} sw={1.2} />
  </g>;
};

// ================================================================ THE ASTEROID — an irregular pitted mountain of rock, craters with lit rims; glow 0..1 = the heat of entry
// on its leading face, trail 0..1 = its streak.
const Asteroid: React.FC<{ x?: N; y?: N; r?: N; draw?: N; rot?: N; glow?: N; trail?: N; tx?: N; ty?: N }> = ({ x = 960, y = 540, r = 240, draw = 1, rot = 0, glow = 0, trail = 0, tx = -1, ty = -.6 }) => {
  const P = useMemo(() => Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2, rr2 = .8 + rnd(i * 3.3) * .3; return [Math.cos(a) * rr2, Math.sin(a) * rr2 * .82] as Pt; }), []);
  const d = 'M' + P.map(p => `${f1(x + p[0] * r)} ${f1(y + p[1] * r)}`).join(' L') + 'Z';
  return <g opacity={draw}>
    {trail > 0 && <path d={`M${x} ${y} L${x + tx * 1800 * trail} ${y + ty * 1800 * trail}`} stroke="#F2A672" strokeWidth={r * 1.2} strokeLinecap="round" opacity={.25} filter="url(#b30)" />}
    {glow > 0 && <circle cx={x - tx * r * .3} cy={y - ty * r * .3} r={r * 1.5} fill="#F2A672" opacity={glow * .45} filter="url(#b30)" />}
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <SR d={d} mat="stone" t={.7} draw={draw} sw={2.2} />
      {Array.from({ length: 10 }, (_, i) => { const cx = x + (rnd(i) - .5) * r * 1.2, cy = y + (rnd(i + 3) - .5) * r, cr = r * (.06 + rnd(i + 7) * .12); return <g key={i}><SR d={ell(cx, cy, cr, cr * .8)} mat="stone" t={.88} draw={draw} sw={1} hatch={0} />
        <path d={`M${cx - cr} ${cy} A${cr} ${cr * .8} 0 0 1 ${cx + cr} ${cy}`} stroke="#EFE0C2" strokeWidth={2} fill="none" opacity={.7} /></g>; })}
      <Stipple x={x - r} y={y - r} w={2 * r} h={2 * r} n={500} seed="ast" a={.35} />
    </g>
    {glow > 0 && <path d={d} fill="none" stroke="#F7E3A0" strokeWidth={6} opacity={glow} transform={`rotate(${rot} ${x} ${y})`} />}
  </g>;
};

// ================================================================ EVEREST FOR SCALE — the pyramid of Everest with its snow and black rock, a tiny climber on the summit;
// the asteroid (separate) hangs beside it.
const EverestScale: React.FC<{ x?: N; y?: N; s?: N; draw?: N; shade?: N; flag?: N }> = ({ x = 700, y = 900, s = 1, draw = 1, shade = 0, flag = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  return <g opacity={draw}>
    <rect x={-200} y={-200} width={2320} height={1480} fill="#9CCAD6" />
    <SR d={`M${X(-700)} ${Y(0)} L${X(-200)} ${Y(-420)} L${X(0)} ${Y(-620)} L${X(220)} ${Y(-380)} L${X(600)} ${Y(-180)} L${X(900)} ${Y(0)}Z`} mat="stone" t={.62} draw={draw} sw={1.8} />
    <SR d={`M${X(-200)} ${Y(-420)} L${X(0)} ${Y(-620)} L${X(220)} ${Y(-380)} L${X(120)} ${Y(-400)} L${X(40)} ${Y(-330)} L${X(-60)} ${Y(-380)}Z`} mat="ice" t={.2} draw={draw} sw={1.2} hatch={0} />
    {Array.from({ length: 16 }, (_, i) => <Line key={i} d={`M${X(-100 + i * 30)} ${Y(-300 + (i % 4) * 30)} l${(i % 2 ? 1 : -1) * 40 * s} ${120 * s}`} w={1} a={.5} />)}
    <Line d={`M${X(0)} ${Y(-620)} v${-12 * s}`} w={2} /><circle cx={X(0)} cy={Y(-636)} r={3 * s} fill={SEP} />
    <SR d={rect(-200, Y(0), 2320, 400)} mat="land" t={.5} ang={0} draw={draw} sw={1} hatch={0} />
    {flag > 0 && <g><Line d={`M${X(0)} ${Y(-632)} v${-50 * flag * s}`} w={2.4} /><path d={`M${X(0)} ${Y(-632 - 50 * flag)} l${30 * s * flag} ${8 * s} l${-30 * s * flag} ${8 * s}Z`} fill="#B8432A" /></g>}
    {shade > 0 && <rect x={-200} y={-200} width={(2320) * shade} height={1480} fill="#1A120B" opacity={.45} />}
  </g>;
};


// ================================================================ A POCKET WATCH with NO HANDS (bones keep no clock) — a gold hunter case on its chain; swing (deg),
// hands 0..1 = the hands appear; spin = how far they have spun (turns); rise 0..1 = it rises out of the water below (y offset).
const PocketWatch: React.FC<{ x?: N; y?: N; s?: N; draw?: N; swing?: N; hands?: N; spin?: N; rise?: N }> = ({ x = 960, y = 520, s = 1, draw = 1, swing = 0, hands = 0, spin = 0, rise = 1 }) => {
  const py = y - 360 * s, cy = y + (1 - rise) * 600 * s, R = 150 * s;
  return <g opacity={draw} transform={`rotate(${swing} ${x} ${py})`}>
    {Array.from({ length: 22 }, (_, i) => { const yy = py + (cy - R - py) * i / 22; return <ellipse key={i} cx={x} cy={yy} rx={6 * s} ry={9 * s} fill="none" stroke="url(#gold)" strokeWidth={3 * s} transform={i % 2 ? `rotate(90 ${x} ${yy})` : undefined} />; })}
    <circle cx={x} cy={cy - R - 18 * s} r={18 * s} fill="none" stroke="url(#gold)" strokeWidth={7 * s} /><rect x={x - 16 * s} y={cy - R - 12 * s} width={32 * s} height={18 * s} rx={5 * s} fill="url(#gold)" stroke={SEP} />
    <circle cx={x + 8 * s} cy={cy + 12 * s} r={R * 1.08} fill={SEP} opacity={.3} filter="url(#b8)" />
    <circle cx={x} cy={cy} r={R * 1.08} fill="url(#gold)" stroke={SEP} strokeWidth={2} />
    <circle cx={x} cy={cy} r={R * .94} fill="#FBF4E2" stroke={SEP} strokeWidth={1.4} />
    {Array.from({ length: 60 }, (_, i) => { const a = i / 60 * Math.PI * 2; return <line key={i} x1={x + Math.cos(a) * R * .86} y1={cy + Math.sin(a) * R * .86} x2={x + Math.cos(a) * R * (i % 5 ? .9 : .8)} y2={cy + Math.sin(a) * R * (i % 5 ? .9 : .8)} stroke={SEP} strokeWidth={i % 5 ? .8 : 2} />; })}
    {['XII', 'III', 'VI', 'IX'].map((t, i) => { const a = i * Math.PI / 2 - Math.PI / 2; return <text key={t} x={x + Math.cos(a) * R * .66} y={cy + Math.sin(a) * R * .66 + 9 * s} fontSize={26 * s} textAnchor="middle" fontFamily="'IM Fell English', serif" fill={SEP}>{t}</text>; })}
    {hands > 0 && <g opacity={hands}><path d={`M${x} ${cy} L${x + Math.cos(spin * Math.PI * 2 - Math.PI / 2) * R * .5} ${cy + Math.sin(spin * Math.PI * 2 - Math.PI / 2) * R * .5}`} stroke={SEP} strokeWidth={6 * s} strokeLinecap="round" />
      <path d={`M${x} ${cy} L${x + Math.cos(spin * 24 * Math.PI - Math.PI / 2) * R * .78} ${cy + Math.sin(spin * 24 * Math.PI - Math.PI / 2) * R * .78}`} stroke={SEP} strokeWidth={3 * s} strokeLinecap="round" /></g>}
    <circle cx={x} cy={cy} r={8 * s} fill="url(#gold)" stroke={SEP} />
    <path d={`M${x - R * .6} ${cy - R * .5} Q${x - R * .3} ${cy - R * .8} ${x + R * .1} ${cy - R * .82}`} stroke="#FFFFFF" strokeWidth={6 * s} fill="none" opacity={.5} />
  </g>;
};

export const ART_A: Record<string, React.FC<any>> = { PocketWatch, CretaceousDusk, Theropod, MuseumHall, ClueRelics, TheoryCards, RockBook, Foraminifera, GubbioGorge, FingerOnClay, ClayHourglass, AlvarezStudy, SpaceDust,
  IridiumMeter, DustShelf, MeteoriteSlice, Asteroid, EverestScale };
