// FATHOM ANATOMY — engine v9 (owner 18 Nov 2026: "hình thù các con vật, các bộ phận người… sơ sài và xấu, không giống thật, kiểu là mấy cái
// nét tròn hoặc méo đặt vào nhau… cả animation cũng nên nâng cấp. Nâng cấp cho engine khả năng vẽ này").
// Bodies are no longer stacks of ellipses. A body part is a SKINNED CHAIN: a smooth spine (Catmull-Rom through its joints) wrapped in flesh
// whose thickness is given per joint ABOVE and BELOW the spine (a belly is deeper than a back), so the outline is one continuous organic
// contour. It is shaded the way an engraver shades a living form: CROSS-CONTOUR lines that wrap round the body (bowed along it, so it reads
// round), dense on the shadow side and thinning into the light, a swelling outline heavy on the shadow side, and a paper-white rim light.
// Limbs are FORWARD-KINEMATIC chains (joint angles, bone lengths taken from real skeletons), so they MOVE like limbs: gait cycles, breathing,
// follow-through that runs down a tail or a neck with lag, a head that turns to look. Creatures (src/lib/<slug>/) are DATA on top of this.
import React from 'react';
import { SEP, tone, mix } from './paint';

export type N = number; export type P = [N, N];
const f1 = (v: N) => Math.round(v * 10) / 10;
export const deg = (a: N) => a * Math.PI / 180;
export const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
export const pol = (o: P, len: N, ang: N): P => [o[0] + Math.cos(ang) * len, o[1] + Math.sin(ang) * len];
export const lerpP = (a: P, b: P, t: N): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// ---------------------------------------------------------------- FK: a chain of bones from a root, each angle RELATIVE to its parent (degrees)
export const fk = (root: P, base: N, bones: [N, N][]): P[] => {   // bones: [length, relative angle]
  const out: P[] = [root]; let a = deg(base), p = root;
  for (const [len, ang] of bones) { a += deg(ang); p = pol(p, len, a); out.push(p); }
  return out;
};
// follow-through: a wave that travels down a chain (tail, neck) — angle offset for link i at time t
export const wave = (t: N, i: N, amp: N, speed = 1, lag = .45) => amp * Math.sin(t * speed * Math.PI * 2 - i * lag) * (.4 + i * .15);
// a biped's leg through one stride (phase 0..1): hip, knee, ankle, toe angles (deg) — from bird / theropod track-way studies: the knee leads,
// the foot lifts high and folds in the swing, plants flat, rolls onto the toes
export const stride = (ph: N, k = 1): [N, N, N, N] => {
  const s = Math.sin(ph * Math.PI * 2), c = Math.cos(ph * Math.PI * 2), sw = Math.max(0, Math.sin(ph * Math.PI * 2 - .6));
  return [s * 24 * k, (-28 - sw * 38) * k, (52 + sw * 30) * k, (-26 + c * 14) * k];
};

// ---------------------------------------------------------------- the skin of a chain
export type Joint = { p: P; up: N; dn: N };   // centre on the spine, flesh above (left of travel) and below (right of travel)
const cr = (p0: N, p1: N, p2: N, p3: N, t: N) => .5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
export const sample = (J: Joint[], per = 10) => {
  const S: { c: P; n: P; up: N; dn: N; u: N }[] = []; const n = J.length;
  for (let i = 0; i < n - 1; i++) for (let k = 0; k < per; k++) {
    const t = k / per, a = J[Math.max(0, i - 1)], b = J[i], c = J[i + 1], d = J[Math.min(n - 1, i + 2)];
    const x = cr(a.p[0], b.p[0], c.p[0], d.p[0], t), y = cr(a.p[1], b.p[1], c.p[1], d.p[1], t);
    const sm = t * t * (3 - 2 * t);
    S.push({ c: [x, y], n: [0, 0], up: b.up + (c.up - b.up) * sm, dn: b.dn + (c.dn - b.dn) * sm, u: (i + t) / (n - 1) });
  }
  const L = J[n - 1]; S.push({ c: L.p, n: [0, 0], up: L.up, dn: L.dn, u: 1 });
  for (let i = 0; i < S.length; i++) {
    const a = S[Math.max(0, i - 1)].c, b = S[Math.min(S.length - 1, i + 1)].c, dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    S[i].n = [dy / l, -dx / l];   // points to the "up" side when the chain runs left → right
  }
  return S;
};
const smoothPath = (pts: P[], closed = true) => {
  if (pts.length < 3) return '';
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`; const n = pts.length, g = (i: N) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  for (let i = 0; i < (closed ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`; }
  return d + (closed ? 'Z' : '');
};
export const skinOutline = (J: Joint[], per = 10) => {
  const S = sample(J, per), U = S.map(s => add(s.c, [s.n[0] * s.up, s.n[1] * s.up]) as P), D = S.map(s => add(s.c, [-s.n[0] * s.dn, -s.n[1] * s.dn]) as P);
  return { S, U, D, d: smoothPath([...U, ...D.reverse()]) };
};

// ---------------------------------------------------------------- SKIN: one living form, engraved
// light: direction the light comes FROM in screen space (default upper left); hatch: density 0..1; mat/t: the house pigment and its tone
export type SkinP = { openStart?: boolean; openEnd?: boolean; J: Joint[]; mat?: string; t?: N; draw?: N; light?: P; hatch?: N; id: string; sw?: N; per?: N; rim?: N; col?: string; fur?: N; scales?: N };
export const Skin: React.FC<SkinP> = ({ J, mat = 'land', t = .5, draw = 1, light = [-.5, -.85], hatch = 1, id, sw = 1.8, per = 10, rim = 1, col, fur = 0, scales = 0, openStart = false, openEnd = false }) => {
  const { S, U, D: D0, d } = skinOutline(J, per); const D = [...D0].reverse(); const base = col || tone(mat, t), deep = mix(base, '#2B1D12', .45), hi = mix(base, '#FFF8E6', .45);
  const lt = Math.hypot(light[0], light[1]) || 1, Lx = light[0] / lt, Ly = light[1] / lt;
  // cross-contours: every few samples, a line from the up edge to the down edge, bowed along the spine so it wraps the volume
  const cc: React.ReactNode[] = []; const step = Math.max(2, Math.round(per / 3));
  for (let i = step; i < S.length - 1; i += step) {
    const s = S[i], a = U[i], b = D[i], tg: P = [-s.n[1], s.n[0]], w = s.up + s.dn; if (w < 6) continue;
    const bow = w * .22, m: P = [s.c[0] + tg[0] * bow - s.n[0] * (s.up - s.dn) * .1, s.c[1] + tg[1] * bow - s.n[1] * (s.up - s.dn) * .1];
    // how much this line lies in shadow: the half facing away from the light is drawn, from the shadow edge inwards
    const facing = s.n[0] * Lx + s.n[1] * Ly;   // > 0: the up edge faces the light → shade from the down edge
    const from = facing > 0 ? b : a, to = facing > 0 ? a : b, len = .38 + .32 * hatch + Math.abs(facing) * .1;
    cc.push(<path key={i} d={`M${f1(from[0])} ${f1(from[1])} Q${f1(m[0])} ${f1(m[1])} ${f1(to[0])} ${f1(to[1])}`} pathLength={1} strokeDasharray={`${len} 1`}
      stroke={SEP} strokeWidth={.8 + w * .005} fill="none" strokeLinecap="round" opacity={.45} />);
    if (hatch > .6 && i % (step * 2) === 0) cc.push(<path key={'b' + i} d={`M${f1(from[0])} ${f1(from[1])} Q${f1(m[0])} ${f1(m[1])} ${f1(to[0])} ${f1(to[1])}`} pathLength={1} strokeDasharray={`${len * .45} 1`}
      stroke={SEP} strokeWidth={.7} fill="none" opacity={.5} transform={`translate(${f1(tg[0] * 3)} ${f1(tg[1] * 3)})`} />);
  }
  // the shadow-side edge, a soft core shadow, the rim light on the lit edge
  const litUp = (S[Math.floor(S.length / 2)].n[0] * Lx + S[Math.floor(S.length / 2)].n[1] * Ly) > 0;
  const shadowEdge = litUp ? D : U, litEdge = litUp ? U : D;
  const gid = 'sk' + id;
  return <g opacity={draw}>
    <defs><clipPath id={gid}><path d={d} /></clipPath>
      <linearGradient id={gid + 'g'} x1={.5 - Lx * .5} y1={.5 - Ly * .5} x2={.5 + Lx * .5} y2={.5 + Ly * .5}><stop offset="0" stopColor={deep} /><stop offset=".55" stopColor={base} /><stop offset="1" stopColor={hi} /></linearGradient></defs>
    <path d={d} fill={`url(#${gid}g)`} />
    <g clipPath={`url(#${gid})`}>
      <path d={smoothPath(shadowEdge, false)} stroke={deep} strokeWidth={22} fill="none" opacity={.35} filter="url(#b8)" />
      {cc}
      {scales > 0 && S.filter((_, i) => i % 2 === 0).map((s, i) => { const w = s.up + s.dn; return w > 14 ? Array.from({ length: Math.min(6, Math.floor(w / 14)) }, (_, k) => { const v = (k + .5) / Math.min(6, Math.floor(w / 14)), q = add(s.c, [s.n[0] * (s.up - v * w), s.n[1] * (s.up - v * w)]);
        return <path key={i + '_' + k} d={`M${f1(q[0] - 3)} ${f1(q[1])} q3 ${f1(-3 * scales)} 6 0`} stroke={SEP} strokeWidth={.6} fill="none" opacity={.4} />; }) : null; })}
      {rim > 0 && <path d={smoothPath(litEdge, false)} stroke="#FFF8E6" strokeWidth={3} fill="none" opacity={.55 * rim} transform={`translate(${f1(Lx * 3)} ${f1(Ly * 3)})`} />}
    </g>
    {fur > 0 && U.concat(D).filter((_, i) => i % 2 === 0).map((q, i) => { const s = S[i % S.length]; const o = i < U.length / 2 ? 1 : -1;
      return <path key={'f' + i} d={`M${f1(q[0])} ${f1(q[1])} l${f1((s.n[0] * o * 5 - s.n[1] * 4) * fur)} ${f1((s.n[1] * o * 5 + s.n[0] * 4) * fur)}`} stroke={SEP} strokeWidth={.8} opacity={.6} />; })}
    {/* the swelling ink outline: thin on the lit side, heavy on the shadow side */}
    {/* the outline is stroked as two open edges (+ the start cap), never across the far end: a part that joins another (a neck into a
        skull, a thigh into a body) shows no seam */}
    <path d={smoothPath(U, false)} stroke={SEP} strokeWidth={sw} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d={smoothPath(D, false)} stroke={SEP} strokeWidth={sw} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    {!openStart && <path d={`M${f1(U[0][0])} ${f1(U[0][1])} L${f1(D[0][0])} ${f1(D[0][1])}`} stroke={SEP} strokeWidth={sw} strokeLinecap="round" />}
    {!openEnd && <path d={`M${f1(U[U.length - 1][0])} ${f1(U[U.length - 1][1])} L${f1(D[D.length - 1][0])} ${f1(D[D.length - 1][1])}`} stroke={SEP} strokeWidth={sw} strokeLinecap="round" />}
    <path d={smoothPath(shadowEdge, false)} stroke={SEP} strokeWidth={sw * 1.4} fill="none" strokeLinecap="round" />
  </g>;
};

// ---------------------------------------------------------------- a limb from FK points with a thickness per joint (thigh → shin → foot)
export const limbJoints = (pts: P[], r: N[], k = 1): Joint[] => pts.map((p, i) => ({ p, up: r[i] * k, dn: r[i] * k }));

// ---------------------------------------------------------------- THE HUMAN HAND (engine v9) — proportions from Gray's Anatomy (fig. 219–220):
// metacarpals fan from the wrist; each finger is three phalanges (index 46·26·19, middle 50·30·20, ring 47·28·20, little 37·21·18 mm), the thumb
// a metacarpal + two phalanges set at the side. Seen from the back (dorsal): a finger that CURLS foreshortens (its segments shorten by the cosine
// and darken), knuckles show as creases, nails on the last joints. pose: 'point' | 'open' | 'grip' | 'rest' | 'pinch', or `curl` [thumb, index,
// middle, ring, little] 0..1 to animate between poses. ang = the direction the hand points (deg), mirror = the other hand.
export const HAND_POSES: Record<string, [N, N, N, N, N]> = { point: [.55, 0, .95, .95, .95], open: [0, 0, 0, 0, 0], grip: [.6, .8, .85, .85, .85], rest: [.2, .25, .3, .35, .4], pinch: [.5, .5, .7, .75, .8] };
export const HumanHand: React.FC<{ x: N; y: N; s?: N; ang?: N; pose?: string; curl?: [N, N, N, N, N]; mirror?: boolean; skin?: string; draw?: N; id: string; sleeve?: string; spread?: N }> =
  ({ x, y, s = 1, ang = 0, pose = 'rest', curl, mirror = false, skin = '#E2B48E', draw = 1, id, sleeve, spread = 0 }) => {
  const C = curl || HAND_POSES[pose] || HAND_POSES.rest, a = deg(ang), my = mirror ? -1 : 1;
  const W = (p: P): P => { const px = p[0] * s, py = p[1] * s * my; return [x + px * Math.cos(a) - py * Math.sin(a), y + px * Math.sin(a) + py * Math.cos(a)]; };
  // hand frame: wrist at (0,0), fingers point +x, the thumb side is −y
  const knuck: P[] = [[92, -30], [98, -10], [94, 9], [86, 26]], fing: [N, N, N][] = [[46, 26, 19], [50, 30, 20], [47, 28, 20], [37, 21, 18]], rad: N[] = [8.5, 9, 8.5, 7.5];
  const fingers = knuck.map((k, i) => { const c = C[i + 1], dir = deg((i - 1.5) * (4 + spread * 6)), L = fing[i];
    // foreshortening of a curling finger seen from the back: each segment's visible length shrinks, the tip tucks under
    const seg = [L[0] * (1 - c * .62), L[1] * (1 - c * .9), L[2] * (1 - c * .98)];
    const pts = fk(k, dir * 180 / Math.PI, [[seg[0], 0], [seg[1], c * 8], [seg[2], c * 8]]);
    return { pts, c, r: rad[i] };
  });
  const thumbC = C[0], tb = fk([28, -34], -40 + thumbC * 30, [[40, 0], [30 * (1 - thumbC * .4), 18 + thumbC * 30], [26 * (1 - thumbC * .6), 12 + thumbC * 30]]);
  const tone2 = (k: N) => mix(skin, '#6A3A22', k), sp = (q: P) => `${f1(W(q)[0])} ${f1(W(q)[1])}`;
  const palm = `M${sp([0, -30])} C${sp([30, -44])} ${sp([70, -44])} ${sp([96, -38])} C${sp([106, -20])} ${sp([106, 14])} ${sp([94, 34])} C${sp([60, 42])} ${sp([24, 36])} ${sp([0, 28])} C${sp([-10, 10])} ${sp([-10, -12])} ${sp([0, -30])}Z`;
  const fingerSkin = (f: { pts: P[]; c: N; r: N }, i: N) => <Skin key={'f' + i} id={`${id}f${i}`} J={f.pts.map((p, j) => ({ p: W(p), up: f.r * s * (1 - j * .07), dn: f.r * s * (1 - j * .07) }))} col={tone2(f.c * .25)} hatch={.25 + f.c * .5} sw={1.3} per={6} openStart />;
  return <g opacity={draw}>
    {sleeve && <path d={`M${sp([-120, -40])} L${sp([-4, -38])} L${sp([-4, 34])} L${sp([-120, 40])}Z`} fill={sleeve} stroke={SEP} strokeWidth={1.6} />}
    <Skin id={id + 'w'} J={[{ p: W([-70, -2]), up: 30 * s, dn: 30 * s }, { p: W([-20, -2]), up: 28 * s, dn: 29 * s }, { p: W([14, -2]), up: 32 * s, dn: 31 * s }]} col={skin} hatch={.3} sw={1.4} openEnd openStart rim={.5} />
    {/* the curled fingers lie UNDER the palm's edge, the straight ones over it */}
    {fingers.map((f, i) => f.c > .5 ? fingerSkin(f, i) : null)}
    <path d={palm} fill={skin} stroke={SEP} strokeWidth={1.6} />
    {/* the tendons of the back of the hand, fanning from the wrist to each knuckle; the knuckles as small lit bumps */}
    {knuck.map((k, i) => <g key={'t' + i}><path d={`M${sp([10, -10 + i * 6])} Q${sp([50, k[1] * .7])} ${sp([k[0] - 6, k[1]])}`} stroke={SEP} strokeWidth={.8} fill="none" opacity={.35} />
      <path d={`M${sp([k[0] - 4, k[1] - 6])} q${f1(4 * s)} ${f1(-2 * s)} ${f1(6 * s)} ${f1(4 * s)}`} stroke="#FFF2E0" strokeWidth={1.4} fill="none" opacity={.7} /></g>)}
    <path d={`M${sp([20, 30])} Q${sp([60, 40])} ${sp([92, 34])}`} stroke={tone2(.5)} strokeWidth={6 * s} fill="none" opacity={.35} />
    {fingers.map((f, i) => f.c <= .5 ? fingerSkin(f, i) : null)}
    {/* creases at the finger joints and nails on the straight fingers */}
    {fingers.map((f, i) => <g key={'n' + i}>
      {[1, 2].map(j => { const q = f.pts[j]; return <path key={j} d={`M${sp([q[0] - 1, q[1] - f.r * .6])} q${f1(-2 * s)} ${f1(f.r * .6 * s * my)} 0 ${f1(f.r * 1.2 * s * my)}`} stroke={SEP} strokeWidth={.9} fill="none" opacity={.55} />; })}
      {f.c < .6 && (() => { const p2 = f.pts[2], p3 = f.pts[3], m = lerpP(p2, p3, .45), dx = p3[0] - p2[0], dy = p3[1] - p2[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, w = f.r * .62;
        const q = (u: N, v: N): P => [m[0] + ux * u - uy * v, m[1] + uy * u + ux * v];
        return <path d={`M${sp(q(-L * .25, -w))} L${sp(q(L * .32, -w * .9))} Q${sp(q(L * .5, 0))} ${sp(q(L * .32, w * .9))} L${sp(q(-L * .25, w))} Q${sp(q(-L * .32, 0))} ${sp(q(-L * .25, -w))}Z`} fill="#F4D6C4" stroke={SEP} strokeWidth={.9} />; })()}
    </g>)}
    <Skin id={id + 't'} J={tb.map((p, j) => ({ p: W(p), up: (11 - j * 1.4) * s, dn: (11 - j * 1.4) * s }))} col={tone2(thumbC * .2)} hatch={.4} sw={1.4} per={6} openStart />
    {(() => { const p2 = tb[2], p3 = tb[3], m = lerpP(p2, p3, .5); return <ellipse cx={W(m)[0]} cy={W(m)[1]} rx={6 * s} ry={4.5 * s} transform={`rotate(${f1(Math.atan2(W(p3)[1] - W(p2)[1], W(p3)[0] - W(p2)[0]) * 180 / Math.PI)} ${f1(W(m)[0])} ${f1(W(m)[1])})`} fill="#F4D6C4" stroke={SEP} strokeWidth={.9} />; })()}
  </g>;
};

// ---------------------------------------------------------------- a small furred mammal (engine v9): a Cretaceous insect-eater the size of a shrew —
// long tapering snout with whiskers, small round ear, bright eye, a long body on short legs, a long thin tail. Fur as short strokes along the
// contour. breathe (loop t) swells the flank; sniff twitches the nose; curl 0..1 curls it into a ball (asleep); look turns the head up.
export const SmallMammal: React.FC<{ x: N; y: N; s?: N; draw?: N; t?: N; curl?: N; look?: N; sniff?: N; eye?: N; col?: string; id: string; flip?: N }> =
  ({ x, y, s = 1, draw = 1, t = 0, curl = 0, look = 0, sniff = 0, eye = 1, col = '#8C6A48', id, flip = 1 }) => {
  const T = (p: P): P => [x + p[0] * s * flip, y + p[1] * s], br = 1 + .04 * Math.sin(t * Math.PI * 2 / 1.1);
  // spine from tail base to the skull, bending into a ball as it curls
  const cv = curl * 62, la = -look * 30;
  const sp = fk([-60, -26], 0, [[30, -cv * .3], [30, -cv * .4], [26, -cv * .5 + la * .3], [18, -cv * .6 + la * .5], [16, -cv * .3 + la * .4]]);
  const J: Joint[] = [{ p: sp[0], up: 8, dn: 9 }, { p: sp[1], up: 15, dn: 18 * br }, { p: sp[2], up: 15, dn: 19 * br }, { p: sp[3], up: 12, dn: 13 }, { p: sp[4], up: 10, dn: 9 }, { p: sp[5], up: 3.5, dn: 3 }];
  if (curl >= .9) {   // asleep: a furred ball, the tail wrapped round, the eye a closed line
    const ring: Joint[] = Array.from({ length: 7 }, (_, i) => { const an = deg(200 - i * 50); return { p: [Math.cos(an) * 12, -22 + Math.sin(an) * 10] as P, up: 13 * br, dn: 13 * br }; });
    const Rw = ring.map(j => ({ p: T(j.p), up: j.up * s, dn: j.dn * s })), e = T([10, -26]), n = T([20, -20]);
    return <g opacity={draw}><ellipse cx={T([0, -22])[0]} cy={T([0, -22])[1]} rx={25 * s * br} ry={22 * s * br} fill={col} stroke={SEP} strokeWidth={1.4} /><Skin id={id} J={Rw} col={col} hatch={.6} sw={1.4} fur={1.2 * s} per={6} />
      <path d={`M${f1(T([-16, -6])[0])} ${f1(T([-16, -6])[1])} Q${f1(T([0, 2])[0])} ${f1(T([0, 2])[1])} ${f1(T([20, -6])[0])} ${f1(T([20, -6])[1])}`} stroke={mix(col, '#2B1D12', .3)} strokeWidth={2.2 * s} fill="none" strokeLinecap="round" />
      <path d={`M${f1(e[0] - 2 * s)} ${f1(e[1])} q${f1(2 * s)} ${f1(1.5 * s)} ${f1(4 * s)} 0`} stroke={SEP} strokeWidth={1} fill="none" /><circle cx={n[0]} cy={n[1]} r={1.6 * s} fill="#4A2A1C" /></g>;
  }
  const Jw = J.map(j => ({ p: T(j.p), up: j.up * s, dn: j.dn * s })); if (flip < 0) Jw.forEach(j => { const u = j.up; j.up = j.dn; j.dn = u; });
  const head = sp[4], nose = sp[5], hd = Math.atan2(nose[1] - head[1], nose[0] - head[0]);
  const at = (o: P, d: N, an: N): P => [o[0] + Math.cos(hd + deg(an)) * d, o[1] + Math.sin(hd + deg(an)) * d];
  const eyeP = T(at(head, 6, -40)), ear = T(at(head, 4, -110)), tip = T(at(nose, 3 + sniff * Math.sin(t * 30) * 1.2, 0));
  const tail = fk(sp[0], 180, [[20, 10 + curl * 50], [22 * (1 - curl * .5), 12 + curl * 40], [22 * (1 - curl * .7), 8 + curl * 40], [18 * (1 - curl * .8), 4]]);
  const legs = [[sp[1], 1], [sp[3], 0]].map(([p, k], i) => { const b = p as P, f = fk(add(b, [0, 10]), 100 - curl * 50, [[12, 0], [10, -40], [6, -50]]);
    return <path key={i} d={'M' + f.map(q => T(q).map(f1).join(' ')).join(' L')} stroke={mix(col, '#2B1D12', .3)} strokeWidth={4 * s} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={curl > .8 ? 0 : 1} />; });
  return <g opacity={draw}>
    <path d={'M' + tail.map(q => T(q).map(f1).join(' ')).join(' L')} stroke={mix(col, '#2B1D12', .25)} strokeWidth={2.2 * s} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {legs}
    <Skin id={id} J={Jw} col={col} hatch={.6} sw={1.5} fur={1.4 * s} />
    <path d={`M${f1(ear[0] - 4 * s)} ${f1(ear[1])} q${f1(4 * s)} ${f1(-12 * s)} ${f1(9 * s)} ${f1(-1 * s)}Z`} fill={mix(col, '#E2B48E', .5)} stroke={SEP} strokeWidth={1} />
    <circle cx={eyeP[0]} cy={eyeP[1]} r={2.6 * s} fill="#0A0604" opacity={1 - curl * .9} />
    {eye > 0 && curl < .5 && <circle cx={eyeP[0] + .8 * s * flip} cy={eyeP[1] - .8 * s} r={.8 * s} fill="#FFFDF4" opacity={eye} />}
    {curl > .5 && <path d={`M${f1(eyeP[0] - 2 * s)} ${f1(eyeP[1])} q${f1(2 * s)} ${f1(1.5 * s)} ${f1(4 * s)} 0`} stroke={SEP} strokeWidth={1} fill="none" />}
    <circle cx={tip[0]} cy={tip[1]} r={1.8 * s} fill="#4A2A1C" />
    {[-12, -4, 6].map(w => { const q = T(at(nose, 0, 0)); return <path key={w} d={`M${f1(q[0])} ${f1(q[1])} l${f1(Math.cos(hd + deg(w + (flip < 0 ? 180 : 0))) * -14 * s * -flip)} ${f1(w * .5 * s)}`} stroke={SEP} strokeWidth={.5} opacity={.7} />; })}
  </g>;
};
