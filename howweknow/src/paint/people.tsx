// FATHOM people — a jointed figure drawn in the signature style (wash + hatch + swelling ink), never a mannequin:
// real proportions (7.3 heads), a 3/4-profile face (brow, eye, nose, lips, ear), hands (fist / open / pointing), period costume,
// hair, beard and hats. Poses are joint angles, so keys can GLIDE a figure from one pose to another (pose → pose2 with pk 0..1),
// and `walk` (cycles) animates a real gait. Angles: degrees from straight down, positive = toward where the figure faces.
import React from 'react';
import { Region, Ink, Line, SEP, PIG, tone } from './paint';
import { HumanHand } from './anatomy';

type N = number; type Pt = [N, N];
const D = Math.PI / 180;
export type Pose = { armF: [N, N]; armB: [N, N]; legF: [N, N]; legB: [N, N]; nod: N; lean: N; sit: N; hand: 'fist' | 'open' | 'point' | 'grip' | 'flat' };
export const POSES: Record<string, Pose> = {
  stand: { armF: [8, 14], armB: [-6, 10], legF: [4, 3], legB: [-4, 3], nod: 0, lean: 0, sit: 0, hand: 'fist' },
  point: { armF: [96, 6], armB: [-4, 12], legF: [6, 2], legB: [-5, 3], nod: -4, lean: 2, sit: 0, hand: 'point' },
  look: { armF: [62, 118], armB: [34, 104], legF: [8, 4], legB: [-8, 4], nod: -10, lean: 6, sit: 0, hand: 'fist' },
  write: { armF: [42, 58], armB: [24, 66], legF: [4, 3], legB: [-4, 3], nod: 20, lean: 10, sit: 0, hand: 'fist' },
  think: { armF: [14, 150], armB: [34, 96], legF: [3, 2], legB: [-6, 3], nod: 8, lean: 0, sit: 0, hand: 'fist' },
  raise: { armF: [160, 10], armB: [148, 14], legF: [6, 2], legB: [-6, 3], nod: -14, lean: -3, sit: 0, hand: 'open' },
  hold: { armF: [50, 44], armB: [44, 48], legF: [4, 3], legB: [-4, 3], nod: 10, lean: 2, sit: 0, hand: 'fist' },
  present: { armF: [64, -14], armB: [-4, 12], legF: [5, 2], legB: [-5, 3], nod: -2, lean: 0, sit: 0, hand: 'open' },
  sit: { armF: [34, 56], armB: [26, 62], legF: [88, 86], legB: [80, 82], nod: 14, lean: 8, sit: 1, hand: 'fist' },
  sitlook: { armF: [62, 118], armB: [34, 104], legF: [88, 86], legB: [80, 82], nod: -8, lean: 4, sit: 1, hand: 'fist' },
  // v7 ACTING (owner 17 Nov 2026: "điện ảnh… toàn diện"): poses that carry a feeling or a deed; glide between them with pose → pose2 + pk
  sitpeer: { armF: [70, 122], armB: [40, 112], legF: [88, 86], legB: [80, 82], nod: -2, lean: 16, sit: 1, hand: 'fist' },        // leaning right into the eyepiece
  sitadjust: { armF: [82, 36], armB: [36, 106], legF: [88, 86], legB: [80, 82], nod: -4, lean: 12, sit: 1, hand: 'grip' },     // one hand on a knob, eye still at the glass
  sitstartle: { armF: [40, 128], armB: [30, 118], legF: [84, 80], legB: [76, 78], nod: -16, lean: -10, sit: 1, hand: 'open' },  // pulls back from what he saw
  headhands: { armF: [40, 150], armB: [36, 150], legF: [88, 86], legB: [80, 82], nod: 24, lean: 14, sit: 1, hand: 'open' },     // exhausted / despairing, head in hands
  startle: { armF: [70, 100], armB: [60, 100], legF: [10, 2], legB: [-10, 3], nod: -14, lean: -8, sit: 0, hand: 'open' },
  explain: { armF: [52, 60], armB: [-4, 12], legF: [5, 2], legB: [-5, 3], nod: -2, lean: 3, sit: 0, hand: 'open' },
  reach: { armF: [74, 8], armB: [-2, 14], legF: [14, 3], legB: [-10, 4], nod: 6, lean: 10, sit: 0, hand: 'open' },
};
export type Costume = { coat: N; mat: string; t: N; flare: N; leg: string; legT: N; stock?: boolean; shoe: string; neck: string; hat: string; hair: string; sleeve: N; vest?: string; bare?: boolean; suit?: boolean;
  top?: string; topT?: N };   // v8 (owner 17 Nov 2026: "vẽ ra chi tiết còn chưa giống"): `top` = a bodice / blouse / shirtwaist in its own pigment over a skirt or coat of `mat`
                              // (an 1900s woman: a white shirtwaist over a dark long skirt); her long skirt now drapes over the knees when she sits
export const COSTUMES: Record<string, Costume> = {   // coat = hem height (fraction of h; 0 = no coat, .03 = ankle-long robe)
  chiton: { coat: .04, mat: 'paper', t: .25, flare: .05, leg: 'skin', legT: .3, shoe: 'sandal', neck: 'none', hat: 'none', hair: 'short', sleeve: 0, bare: true },
  robe: { coat: .03, mat: 'cloth', t: .4, flare: .09, leg: 'cloth', legT: .5, shoe: 'sandal', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.5 },
  coat18: { coat: .3, mat: 'sky', t: .82, flare: .07, leg: 'cloth', legT: .35, stock: true, shoe: 'buckle', neck: 'cravat', hat: 'tricorn', hair: 'wig', sleeve: 1.15, vest: 'brass' },
  frock19: { coat: .32, mat: 'night', t: .75, flare: .04, leg: 'stone', legT: .7, shoe: 'boot', neck: 'bow', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'cloth' },
  labcoat: { coat: .33, mat: 'paper', t: .2, flare: .05, leg: 'stone', legT: .62, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.1 },
  uniform: { coat: .46, mat: 'leaf', t: .62, flare: .01, leg: 'leaf', legT: .62, shoe: 'boot', neck: 'tie', hat: 'cap', hair: 'short', sleeve: 1.05 },
  suit: { coat: .44, mat: 'night', t: .62, flare: .01, leg: 'night', legT: .66, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05 },
  spacesuit: { coat: 0, mat: 'paper', t: .18, flare: 0, leg: 'paper', legT: .18, shoe: 'moonboot', neck: 'none', hat: 'helmet', hair: 'none', sleeve: 1.9, suit: true },
};
const HAIR: Record<string, string> = { brown: '#5A3A22', black: '#231A16', grey: '#A8A296', white: '#ECE6D8', red: '#9A4A26', blond: '#C9A15E' };
const lerp = (a: N, b: N, k: N) => a + (b - a) * k;
const blend = (p: Pose, q: Pose, k: N): Pose => k <= 0 ? p : k >= 1 ? q : ({ armF: [lerp(p.armF[0], q.armF[0], k), lerp(p.armF[1], q.armF[1], k)], armB: [lerp(p.armB[0], q.armB[0], k), lerp(p.armB[1], q.armB[1], k)],
  legF: [lerp(p.legF[0], q.legF[0], k), lerp(p.legF[1], q.legF[1], k)], legB: [lerp(p.legB[0], q.legB[0], k), lerp(p.legB[1], q.legB[1], k)], nod: lerp(p.nod, q.nod, k), lean: lerp(p.lean, q.lean, k), sit: lerp(p.sit, q.sit, k), hand: k < .5 ? p.hand : q.hand });
const f1 = (v: N) => +v.toFixed(1);
// a tapered capsule from a (radius ra) to b (radius rb) — limbs, sleeves, trouser legs
const cap = (a: Pt, b: Pt, ra: N, rb: N) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux, k = 1.33;
  const A1 = [a[0] + nx * ra, a[1] + ny * ra], B1 = [b[0] + nx * rb, b[1] + ny * rb], B2 = [b[0] - nx * rb, b[1] - ny * rb], A2 = [a[0] - nx * ra, a[1] - ny * ra];
  return `M${f1(A1[0])} ${f1(A1[1])} L${f1(B1[0])} ${f1(B1[1])} C${f1(B1[0] + ux * rb * k)} ${f1(B1[1] + uy * rb * k)} ${f1(B2[0] + ux * rb * k)} ${f1(B2[1] + uy * rb * k)} ${f1(B2[0])} ${f1(B2[1])} L${f1(A2[0])} ${f1(A2[1])} C${f1(A2[0] - ux * ra * k)} ${f1(A2[1] - uy * ra * k)} ${f1(A1[0] - ux * ra * k)} ${f1(A1[1] - uy * ra * k)} ${f1(A1[0])} ${f1(A1[1])}Z`;
};
// a whole limb (shoulder→elbow→wrist or hip→knee→ankle) as ONE inked outline, the joint rounded, no seams
const limb = (a: Pt, b: Pt, c: Pt, ra: N, rb: N, rc: N) => {
  const nrm = (p: Pt, q: Pt): Pt => { const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L]; };
  const n1 = nrm(a, b), n2 = nrm(b, c), nb0 = n1[0] + n2[0], nb1 = n1[1] + n2[1], nl = Math.hypot(nb0, nb1) || 1, nb: Pt = [nb0 / nl, nb1 / nl];
  const P1 = (p: Pt, n: Pt, r: N, s: N): Pt => [p[0] + n[0] * r * s, p[1] + n[1] * r * s], m = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], S = (p: Pt) => `${f1(p[0])} ${f1(p[1])}`;
  const side = (s: N) => { const A = P1(a, n1, ra, s), B = P1(b, nb, rb, s), C2 = P1(c, n2, rc, s); return [A, m(A, B), B, m(B, C2), C2]; };
  const L = side(1), R = side(-1), u2 = (p: Pt, q: Pt): Pt => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; }, ue = u2(b, c), us = u2(b, a), k = 1.33;
  return `M${S(L[0])} L${S(L[1])} Q${S(L[2])} ${S(L[3])} L${S(L[4])} C${f1(L[4][0] + ue[0] * rc * k)} ${f1(L[4][1] + ue[1] * rc * k)} ${f1(R[4][0] + ue[0] * rc * k)} ${f1(R[4][1] + ue[1] * rc * k)} ${S(R[4])} L${S(R[3])} Q${S(R[2])} ${S(R[1])} L${S(R[0])} C${f1(R[0][0] + us[0] * ra * k)} ${f1(R[0][1] + us[1] * ra * k)} ${f1(L[0][0] + us[0] * ra * k)} ${f1(L[0][1] + us[1] * ra * k)} ${S(L[0])}Z`;
};
const angOf = (a: Pt, b: Pt) => Math.atan2(b[1] - a[1], b[0] - a[0]) / D;

export type PersonP = { x: N; y: N; h: N; facing?: N; pose?: string; pose2?: string; pk?: N; walk?: N; costume?: string | Partial<Costume>; mat?: string; t?: N; skin?: N; hair?: string; hairCol?: string;
  beard?: string; hat?: string; holds?: string; face?: { nose?: N; brow?: N; chin?: N; age?: N; build?: N }; draw?: N; armF?: [N, N]; armB?: [N, N]; nod?: N; lean?: N; blink?: N; flicker?: N;
  expr?: string; ek?: N; look?: [N, N]; alive?: N };   // v6: expr neutral|focus|surprise|awe|smile|worry (ek 0..1 glides it in) · look = where the eye looks (−1..1) · alive = breathing life (micro nod)
export const Person: React.FC<PersonP> = (pp) => {
  const { x, y, h, facing = 1, pose = 'stand', pose2, pk = 0, walk, costume = 'frock19', skin = .32, beard = 'none', holds, draw = 1, flicker = 0 } = pp;
  const C: Costume = typeof costume === 'object' ? { ...COSTUMES.frock19, ...costume } : { ...(COSTUMES[costume] || COSTUMES.frock19) };   // a film's own costume (object) or a sample preset
  const fc = { nose: 0, brow: 0, chin: 0, age: 0, build: 1, ...(pp.face || {}) }; if (pp.mat) C.mat = pp.mat; if (pp.t !== undefined) C.t = pp.t; if (pp.hat) C.hat = pp.hat; if (pp.hair) C.hair = pp.hair;
  let P = blend(POSES[pose] || POSES.stand, POSES[pose2 || pose] || POSES.stand, pk);
  if (pp.alive) P = { ...P, nod: (P.nod ?? 0) + pp.alive * (1.1 * Math.sin(flicker * 1.3 + x * .013) + .5 * Math.sin(flicker * .57 + 1)) };   // v6: nobody holds perfectly still
  if (walk != null && !P.sit) { const s = Math.sin(walk * Math.PI * 2), c = Math.cos(walk * Math.PI * 2);   // a real gait: legs swing, the knee bends on the swing, arms counter-swing
    P = { ...P, legF: [s * 24, Math.max(4, -c * 30 + 10)], legB: [-s * 24, Math.max(4, c * 30 + 10)], ...(pp.armF ? {} : { armF: [P.hand === 'point' ? P.armF[0] : -s * 20 + 4, 16] as [N, N] }), ...(pp.armB ? {} : { armB: [s * 20 - 4, 18] as [N, N] }) }; }
  if (pp.armF) P = { ...P, armF: pp.armF }; if (pp.armB) P = { ...P, armB: pp.armB }; if (pp.nod !== undefined) P = { ...P, nod: pp.nod }; if (pp.lean !== undefined) P = { ...P, lean: pp.lean };
  const f = facing >= 0 ? 1 : -1, u = h;
  const step = (p: Pt, a: N, L: N): Pt => [p[0] + Math.sin(a * D) * L * u * f, p[1] + Math.cos(a * D) * L * u];
  const bob = walk != null ? -Math.abs(Math.sin(walk * Math.PI * 2)) * .012 * u : 0;
  const hipY = y - lerp(.5, .27, P.sit) * u + bob, hip: Pt = [x, hipY];
  const hipF: Pt = [x + .02 * u * f, hipY], hipB: Pt = [x - .025 * u * f, hipY];
  const kneeF = step(hipF, P.legF[0], .245), ankF = step(kneeF, P.legF[0] - P.legF[1], .235), kneeB = step(hipB, P.legB[0], .245), ankB = step(kneeB, P.legB[0] - P.legB[1], .235);
  // upper body (rotated by lean around the hip)
  const ov = (dx: N, dy: N): Pt => [x + dx * u * f * fc.build, hipY + dy * u];   // offsets from the hip
  const shF: Pt = ov(.035, -.32), shB: Pt = ov(-.03, -.315), neck: Pt = ov(.005, -.355);
  const elF = step(shF, P.armF[0], .165), wrF = step(elF, P.armF[0] + P.armF[1], .15), elB = step(shB, P.armB[0], .165), wrB = step(elB, P.armB[0] + P.armB[1], .15);
  const skinMat = 'skin', sk = skin, inkW = Math.max(.7, u / 260);
  const legMat = C.leg, sleeveW = .027 * C.sleeve;
  // -------- pieces
  const shoe = (ank: Pt, back: boolean) => { const a = ank, L = .085 * u, H = .03 * u, hx = a[0] - .025 * u * f, d = C.shoe === 'sandal' ? `M${f1(hx)} ${f1(a[1] + H * .2)} Q${f1(a[0])} ${f1(a[1] - H * .2)} ${f1(a[0] + L * f)} ${f1(a[1] + H * .55)} L${f1(a[0] + L * f)} ${f1(a[1] + H * .9)} L${f1(hx)} ${f1(a[1] + H * .9)}Z`
    : C.shoe === 'moonboot' ? `M${f1(hx - .01 * u * f)} ${f1(a[1] - H)} L${f1(a[0] + L * .8 * f)} ${f1(a[1] - H * .6)} Q${f1(a[0] + L * 1.15 * f)} ${f1(a[1] - H * .2)} ${f1(a[0] + L * 1.1 * f)} ${f1(a[1] + H)} L${f1(hx - .01 * u * f)} ${f1(a[1] + H)}Z`
    : `M${f1(hx)} ${f1(a[1] - H * .7)} L${f1(a[0] + L * .55 * f)} ${f1(a[1] - H * .5)} Q${f1(a[0] + L * 1.05 * f)} ${f1(a[1] - H * .1)} ${f1(a[0] + L * f)} ${f1(a[1] + H * .8)} L${f1(hx)} ${f1(a[1] + H * .8)}Z`;
    return <g key={'sh' + back}><Region d={d} mat={C.shoe === 'sandal' ? 'wood' : C.shoe === 'moonboot' ? 'regolith' : 'night'} t={back ? .8 : .7} ang={0} draw={draw} sw={inkW} rim={false} />
      {C.shoe === 'buckle' && <rect x={a[0] + L * .2 * f - .008 * u} y={a[1] - H * .55} width={.016 * u} height={.012 * u} fill="url(#gold)" opacity={draw} />}
      {C.shoe === 'sandal' && <Line d={`M${f1(a[0] - .01 * u * f)} ${f1(a[1] - .02 * u)} L${f1(a[0] + .03 * u * f)} ${f1(a[1] + .01 * u)}`} w={inkW} a={draw} />}</g>; };
  const leg = (hp: Pt, kn: Pt, an: Pt, back: boolean) => { const hide = C.coat > 0 && C.coat < .06 && !P.sit; const mt = back ? Math.min(1, C.legT + .12) : C.legT, a1 = angOf(hp, kn) - 90, a2 = angOf(kn, an) - 90;
    return <g key={'leg' + back}>{!hide && <>
      {C.stock || C.bare ? <><Region d={cap(kn, an, C.bare ? .03 * u : .029 * u, .021 * u)} mat={C.bare ? skinMat : 'paper'} t={C.bare ? sk + (back ? .1 : 0) : back ? .45 : .3} ang={a2 + 90} draw={draw} sw={inkW} />
        <Region d={cap(hp, kn, .047 * u, .034 * u)} mat={legMat} t={mt} ang={a1 + 90} draw={draw} sw={inkW} /></>
        : <Region d={limb(hp, kn, an, .047 * u, .036 * u, .026 * u)} mat={legMat} t={mt} ang={a1 + 90} draw={draw} sw={inkW} />}
      <Line d={`M${f1(kn[0] - .02 * u)} ${f1(kn[1] - .01 * u)} q${f1(.02 * u)} ${f1(.012 * u)} ${f1(.04 * u)} 0`} w={inkW * .7} a={.6 * draw} />
      {C.stock && <Line d={`M${f1(kn[0] - .03 * u)} ${f1(kn[1] + .02 * u)} L${f1(kn[0] + .03 * u)} ${f1(kn[1] + .02 * u)}`} w={inkW * 1.5} a={draw} col={SEP} />}</>}
      {shoe(an, back)}</g>; };
  const hand = (wr: Pt, el: Pt, kind: string, back: boolean) => { const a = angOf(el, wr), r = .02 * u, c = Math.cos(a * D), s = Math.sin(a * D), at = (l: N, w: N): Pt => [wr[0] + c * l * u - s * w * u, wr[1] + s * l * u + c * w * u];
    if (!C.suit && draw > .02) {   // v9 ANATOMICAL HAND (owner 18 Nov 2026: "các bộ phận người… sơ sài, không giống"): Gray's proportions, FK fingers
      const map: Record<string, string> = { open: 'open', flat: 'open', point: 'point', fist: 'grip', grip: 'pinch' };
      return <g key={'hd' + back} opacity={draw}><HumanHand id={`ph${Math.round(wr[0])}_${Math.round(wr[1])}${back ? 'b' : 'f'}`} x={wr[0]} y={wr[1]} s={u * .108 / 185} ang={a} pose={map[kind] || 'grip'} mirror={f < 0}
        skin={tone(skinMat, sk + (back ? .12 : 0))} /></g>;
    }
    if (u >= 452 && !C.suit) {   // v7 CLOSE-UP HAND (owner 17 Nov 2026): five fingers in two joints, knuckles, nails; grips that hold things
      const curl: Record<string, number[]> = { open: [0, 0, 0, 0, .1], flat: [0, 0, 0, 0, 0], point: [0, 1, 1, 1, .6], fist: [1, 1, 1, 1, 1], grip: [.55, .9, 1, 1, .5] };
      const cu = curl[kind] || curl.fist, spread = kind === 'open' ? 1 : kind === 'flat' ? .3 : .15, tone2 = sk + (back ? .12 : 0);
      const dirAt = (deg: N) => [Math.cos((a + deg) * D), Math.sin((a + deg) * D)];
      const seg = (p0: Pt, deg: N, len: N, w0: N, w1: N, key: string) => { const d = dirAt(deg), p1: Pt = [p0[0] + d[0] * len * u, p0[1] + d[1] * len * u];
        return { p1, el: <Region key={key} d={cap(p0, p1, w0 * u, w1 * u)} mat={skinMat} t={tone2} ang={a + deg} draw={draw} sw={inkW * .7} rim={false} hatch={0} /> }; };
      const els: React.ReactNode[] = [<Region key="palm" d={cap(at(.002, 0), at(.036, 0), r * 1.05, r * .95)} mat={skinMat} t={tone2} ang={a} draw={draw} sw={inkW * .85} rim={false} hatch={0} />];
      [[-.013, .021], [-.0045, .025], [.0045, .024], [.013, .019]].forEach(([w, len], i) => {
        const base = at(.034, w), sp = (i - 1.5) * 7 * spread, k = cu[i], bend = 95 * k * f;
        const s1 = seg(base, sp + bend * .45, len * .55, .0058, .0052, 'f' + i + 'a'), s2 = seg(s1.p1, sp + bend * 1.05, len * .5 * (1 - .25 * k), .0052, .0042, 'f' + i + 'b');
        els.push(s1.el, s2.el);
        if (k < .5) { const d = dirAt(sp + bend), tip = s2.p1; els.push(<path key={'n' + i} d={`M${f1(tip[0] - d[0] * .006 * u)} ${f1(tip[1] - d[1] * .006 * u)} l${f1(d[0] * .004 * u)} ${f1(d[1] * .004 * u)}`} stroke={SEP} strokeWidth={inkW * .35} opacity={.5 * draw} />); }
        els.push(<circle key={'k' + i} cx={base[0]} cy={base[1]} r={.0022 * u} fill={SEP} opacity={.25 * draw} />);
      });
      const tb = at(.008, -.017 * f), t1 = seg(tb, -42 * f + cu[4] * 38 * f, .02, .0068, .006, 'ta'), t2 = seg(t1.p1, -30 * f + cu[4] * 70 * f, .016, .006, .0048, 'tb');
      els.push(t1.el, t2.el);
      return <g key={'hd' + back}>{els}</g>;
    }
    const palm = cap(at(.004, 0), at(kind === 'open' ? .045 : .03, 0), r * .95, r * (kind === 'open' ? .8 : .9)), th = cap(at(.01, -.016 * f), at(.032, -.024 * f), r * .36, r * .28);
    return <g key={'hd' + back}><Region d={palm} mat={C.suit ? 'regolith' : skinMat} t={C.suit ? .35 : sk + (back ? .12 : 0)} ang={a} draw={draw} sw={inkW * .9} rim={false} hatch={0} />
      <Region d={th} mat={C.suit ? 'regolith' : skinMat} t={C.suit ? .35 : sk + .05} ang={a} draw={draw} sw={inkW * .8} rim={false} hatch={0} />
      {kind === 'point' && <Region d={cap(at(.03, .004), at(.075, .004), r * .3, r * .24)} mat={skinMat} t={sk} ang={a} draw={draw} sw={inkW * .8} rim={false} hatch={0} />}
      {kind === 'fist' && [-.008, 0, .008].map(k => <Line key={k} d={`M${f1(at(.026, k)[0])} ${f1(at(.026, k)[1])} L${f1(at(.038, k)[0])} ${f1(at(.038, k)[1])}`} w={inkW * .45} a={.45 * draw} />)}
      {kind === 'open' && [-.012, -.004, .004, .012].map(k => <Line key={k} d={`M${f1(at(.04, k)[0])} ${f1(at(.04, k)[1])} L${f1(at(.062, k * 1.3)[0])} ${f1(at(.062, k * 1.3)[1])}`} w={inkW * .8} a={.7 * draw} />)}</g>; };
  const arm = (sh: Pt, el: Pt, wr: Pt, back: boolean) => { const mt = back ? Math.min(1, C.t + .12) : C.t, cuffW = sleeveW * u, a1 = angOf(sh, el), a2 = angOf(el, wr);
    const bell = null as string | null, wide = C.sleeve > 1.4 && !C.suit ? 1.45 : 1;
    return <g key={'arm' + back}>
      <Region d={limb(sh, el, wr, C.bare ? .027 * u : cuffW * 1.05, C.bare ? .021 * u : cuffW * .9, C.bare ? .017 * u : cuffW * .82 * wide)} mat={C.bare ? skinMat : (C.top || C.mat)} t={C.bare ? sk : (C.top ? (C.topT ?? .2) + (mt - C.t) : mt)} ang={a1} draw={draw} sw={inkW} />
      {bell && <Region d={bell} mat={C.mat} t={mt + .05} ang={a2} draw={draw} sw={inkW} />}
      {!C.bare && <Line d={`M${f1(el[0] - .015 * u)} ${f1(el[1] - .012 * u)} q${f1(.012 * u * f)} ${f1(.01 * u)} ${f1(.026 * u * f)} ${f1(.004 * u)}`} w={inkW * .7} a={.6 * draw} />}
      {(C.neck === 'cravat' || costume === 'coat18') && <Region d={cap([wr[0] - Math.cos(a2 * D) * .03 * u, wr[1] - Math.sin(a2 * D) * .03 * u], wr, cuffW * 1.25, cuffW * 1.15)} mat={C.mat} t={mt - .25} ang={a2} draw={draw} sw={inkW} rim={false} />}
      {hand(wr, el, back ? 'fist' : P.hand, back)}</g>; };
  // torso + coat (front contour bulges at the chest; the coat skirt flares to its hem and follows the legs)
  const hemY = y - C.coat * u, legsFront = Math.max(kneeF[0] * f, ankF[0] * f) * f, legsBack = Math.min(kneeB[0] * f, ankB[0] * f) * f;
  const torso = () => { const pts: string[] = [], o = (dx: N, dy: N) => { const p = ov(dx, dy); return `${f1(p[0])} ${f1(p[1])}`; };
    const robe = C.coat > 0 && C.coat < .06 && !P.sit, fr = robe ? Math.min(.15, Math.max(.1, (legsFront - x) * f / u + .03)) : .06 + C.flare, bk = robe ? Math.max(-.16, Math.min(-.11, (legsBack - x) * f / u - .03)) : -.07 - C.flare;
    const hemDy = (hemY - hipY) / u;
    if (C.coat > 0 && !P.sit && hemDy > 0) pts.push(`M${o(-.028, -.36)} C${o(.03, -.372)} ${o(.08, -.33)} ${o(.082, -.25)} C${o(.085, -.17)} ${o(.06, -.1)} ${o(.06, -.06)} L${o(fr, hemDy)} Q${o((fr + bk) / 2, hemDy + .012)} ${o(bk, hemDy)} L${o(-.065, -.08)} C${o(-.07, -.18)} ${o(-.085, -.26)} ${o(-.06, -.33)}Z`);
    else pts.push(`M${o(-.028, -.36)} C${o(.03, -.372)} ${o(.08, -.33)} ${o(.082, -.25)} C${o(.085, -.17)} ${o(.06, -.1)} ${o(.065, -.01)} L${o(-.068, -.01)} C${o(-.07, -.18)} ${o(-.085, -.26)} ${o(-.06, -.33)}Z`);
    const d = pts[0], open = C.vest && !P.sit;
    return <g key="torso">
      <Region d={d} mat={C.mat} t={C.t} ang={80} draw={draw} sw={inkW * 1.1} />
      {C.top && <Region d={`M${o(-.028, -.36)} C${o(.03, -.372)} ${o(.08, -.33)} ${o(.082, -.25)} C${o(.085, -.17)} ${o(.062, -.11)} ${o(.06, -.06)} L${o(-.066, -.065)} C${o(-.07, -.18)} ${o(-.085, -.26)} ${o(-.06, -.33)}Z`} mat={C.top} t={C.topT ?? .2} ang={80} draw={draw} sw={inkW} />}
      {C.top && <Region d={`M${o(.062, -.068)} L${o(-.068, -.07)} L${o(-.068, -.05)} L${o(.063, -.048)}Z`} mat={C.mat} t={Math.min(1, C.t + .15)} ang={0} draw={draw} sw={inkW * .7} rim={false} />}
      {C.top && [-.3, -.26, -.22, -.18, -.14].map(k => <circle key={'b' + k} cx={ov(.062, k)[0]} cy={ov(.062, k)[1]} r={.0035 * u} fill={SEP} opacity={.7 * draw} />)}
      {open && <Region d={`M${o(.06, -.3)} C${o(.075, -.24)} ${o(.07, -.16)} ${o(.055, -.07)} L${o(.035, -.07)} C${o(.04, -.16)} ${o(.035, -.25)} ${o(.03, -.31)}Z`} mat={C.vest!} t={.45} ang={80} draw={draw} sw={inkW * .8} />}
      {open && [-.25, -.2, -.15, -.1].map(k => <circle key={k} cx={ov(.052, k)[0]} cy={ov(.052, k)[1]} r={.005 * u} fill="url(#gold)" stroke={SEP} strokeWidth={.5} opacity={draw} />)}
      {C.coat > 0 && !P.sit && <Line d={`M${o(.06, -.06)} C${o(.03, -.02)} ${o(.03, hemDy * .5)} ${o(fr * .6, hemDy)}`} w={inkW * .8} a={.6 * draw} />}
      {C.coat > 0 && !P.sit && [.3, .55].map(k => <Line key={k} d={`M${o(-.04 + k * .05, -.05)} Q${o(-.05 + k * .08, hemDy * .5)} ${o(bk + (fr - bk) * k, hemDy)}`} w={inkW * .6} a={.45 * draw} />)}
      {(costume === 'uniform' || costume === 'suit' || costume === 'robe') && <Region d={`M${o(.062, -.095)} L${o(-.068, -.085)} L${o(-.068, -.06)} L${o(.062, -.07)}Z`} mat={costume === 'robe' ? 'red' : 'wood'} t={.6} ang={0} draw={draw} sw={inkW * .7} rim={false} />}
      {C.bare && <Region d={`M${o(-.05, -.34)} C${o(.02, -.26)} ${o(.05, -.16)} ${o(.06, -.06)} L${o(.04, -.06)} C${o(.02, -.16)} ${o(-.02, -.26)} ${o(-.07, -.31)}Z`} mat={C.mat} t={C.t + .2} ang={60} draw={draw} sw={inkW * .7} />}
      {C.suit && <Region d={`M${o(-.065, -.33)} L${o(-.135, -.31)} L${o(-.14, -.1)} L${o(-.07, -.09)}Z`} mat="regolith" t={.4} ang={90} draw={draw} sw={inkW} />}
    </g>; };
  // head (3/4 profile), hair, beard, hat
  const head = () => { const hh = .137 * u, hc: Pt = [neck[0] + .006 * u * f, neck[1] - .072 * u], q = (a: N, b: N) => `${f1(hc[0] + a * hh * f)} ${f1(hc[1] + b * hh)}`;
    const face = `M${q(-.05, -.5)} C${q(.22, -.52)} ${q(.36, -.36)} ${q(.37, -.16)} L${q(.355, -.08)} C${q(.4 + fc.nose * .03, -.03)} ${q(.44 + fc.nose * .06, .05)} ${q(.46 + fc.nose * .07, .1 + fc.nose * .02)} L${q(.38, .14)} L${q(.385, .19)} L${q(.36, .215)} L${q(.375, .25)} C${q(.37 + fc.chin * .04, .33)} ${q(.33 + fc.chin * .04, .4 + fc.chin * .04)} ${q(.24, .42 + fc.chin * .04)} C${q(.12, .42)} ${q(-.02, .33)} ${q(-.1, .22)} C${q(-.22, .2)} ${q(-.36, .05)} ${q(-.36, -.15)} C${q(-.36, -.4)} ${q(-.22, -.5)} ${q(-.05, -.5)}Z`;
    const hc2 = pp.hairCol || HAIR[C.hair === 'wig' ? 'white' : 'brown'] || pp.hairCol || '#5A3A22', hair = C.hair;
    const hairD = hair === 'wig' ? `M${q(.3, -.3)} C${q(.2, -.56)} ${q(-.3, -.6)} ${q(-.42, -.2)} C${q(-.46, 0)} ${q(-.4, .16)} ${q(-.3, .22)} L${q(-.12, .14)} C${q(-.2, 0)} ${q(-.1, -.26)} ${q(.1, -.34)}Z`
      : hair === 'long' ? `M${q(.32, -.28)} C${q(.2, -.6)} ${q(-.36, -.58)} ${q(-.42, -.14)} C${q(-.46, .2)} ${q(-.4, .5)} ${q(-.3, .62)} L${q(-.08, .5)} C${q(-.16, .2)} ${q(-.1, -.12)} ${q(.12, -.34)}Z`
      : hair === 'bald' ? `M${q(-.06, -.28)} C${q(-.28, -.28)} ${q(-.38, -.1)} ${q(-.34, .1)} L${q(-.18, .12)} C${q(-.22, -.04)} ${q(-.16, -.2)} ${q(-.06, -.28)}Z`
      : hair === 'bun' ? `M${q(.32, -.3)} C${q(.2, -.58)} ${q(-.3, -.58)} ${q(-.38, -.2)} C${q(-.4, -.02)} ${q(-.34, .12)} ${q(-.24, .18)} L${q(-.12, .12)} C${q(-.18, -.04)} ${q(-.1, -.24)} ${q(.12, -.36)}Z`
      : `M${q(.33, -.3)} C${q(.22, -.6)} ${q(-.34, -.58)} ${q(-.38, -.18)} C${q(-.4, -.02)} ${q(-.36, .1)} ${q(-.28, .16)} L${q(-.14, .1)} C${q(-.2, -.04)} ${q(-.12, -.24)} ${q(.1, -.33)} C${q(.2, -.36)} ${q(.28, -.3)} ${q(.33, -.3)}Z`;
    const beardD = beard === 'full' ? `M${q(-.1, .08)} C${q(-.06, .36)} ${q(.08, .6)} ${q(.26, .56)} C${q(.38, .5)} ${q(.4, .34)} ${q(.38, .24)} L${q(.3, .24)} C${q(.28, .3)} ${q(.18, .33)} ${q(.1, .28)} C${q(.02, .22)} ${q(-.02, .14)} ${q(-.04, .06)}Z`
      : beard === 'short' ? `M${q(-.08, .12)} C${q(-.02, .34)} ${q(.12, .46)} ${q(.26, .44)} C${q(.36, .4)} ${q(.38, .3)} ${q(.375, .25)} L${q(.33, .26)} C${q(.3, .3)} ${q(.2, .32)} ${q(.12, .28)} C${q(.04, .22)} ${q(0, .16)} ${q(-.04, .1)}Z`
      : beard === 'moustache' ? `M${q(.27, .16)} C${q(.32, .14)} ${q(.38, .15)} ${q(.4, .18)} C${q(.36, .2)} ${q(.3, .2)} ${q(.26, .2)}Z` : '';
    const blink = (pp.blink ?? 0) > .5 || (Math.floor(flicker * 10) % 47 === 0), eyeY = -.04;
    // v6 expression: b = brow raise (− = knit) · e = how open the eye is · m = mouth corner (+ smile, − worry) · o = mouth open
    const EX: Record<string, number[]> = { neutral: [0, 1, 0, 0], focus: [-.8, .72, -.15, 0], surprise: [1, 1.55, 0, 1], awe: [.7, 1.35, .1, .55], smile: [.25, .85, 1, 0], worry: [-.35, 1.05, -1, 0] };
    const ek = pp.expr ? (pp.ek ?? 1) : 0, [xb, xe0, xm, xo] = (EX[pp.expr || 'neutral'] || EX.neutral), eb = xb * ek, ee = 1 + (xe0 - 1) * ek, em = xm * ek, eo = xo * ek, lk = pp.look || [0, 0], big = hh > 62;
    const hat = C.hat;
    return <g key="head" transform={`rotate(${P.nod * f} ${f1(neck[0])} ${f1(neck[1])})`}>
      {!C.suit && <Region d={cap(neck, [hc[0] - .01 * u * f, hc[1] + .02 * u], .026 * u, .03 * u)} mat={skinMat} t={sk + .12} ang={0} draw={draw} sw={inkW * .8} rim={false} />}
      {C.neck === 'cravat' && <Region d={`M${q(-.02, .52)} C${q(.2, .5)} ${q(.36, .62)} ${q(.3, .9)} L${q(.12, .86)} C${q(.04, .72)} ${q(-.06, .66)} ${q(-.1, .6)}Z`} mat="paper" t={.12} ang={20} draw={draw} sw={inkW * .8} />}
      {C.neck === 'bow' && <Region d={`M${q(.06, .6)} l${f1(.03 * u * f)} ${f1(-.01 * u)} l0 ${f1(.02 * u)}Z M${q(.06, .6)} l${f1(-.03 * u * f)} ${f1(-.01 * u)} l0 ${f1(.02 * u)}Z`} mat="night" t={.8} draw={draw} sw={inkW * .6} rim={false} />}
      {C.neck === 'tie' && <Region d={`M${q(.1, .55)} L${q(.16, .62)} L${q(.13, 1.05)} L${q(.07, 1.1)} L${q(.05, .62)}Z`} mat={costume === 'labcoat' ? 'red' : 'wood'} t={.6} ang={90} draw={draw} sw={inkW * .7} rim={false} />}
      <Region d={face} mat={skinMat} t={sk} ang={70} draw={draw} sw={inkW} hatchA={.35} />
      <Region d={`M${q(-.06, -.06)} C${q(-.13, -.07)} ${q(-.15, .12)} ${q(-.06, .14)} C${q(-.02, .12)} ${q(-.02, -.04)} ${q(-.06, -.06)}Z`} mat={skinMat} t={sk + .15} draw={draw} sw={inkW * .7} rim={false} hatch={0} />
      {big && <g opacity={draw * .5} style={{ mixBlendMode: 'multiply' }}>{/* v6 close-up modelling: the shade side of the head, under the jaw, the eye socket */}
        <path d={`M${q(-.05, -.5)} C${q(-.3, -.46)} ${q(-.4, -.1)} ${q(-.3, .2)} C${q(-.2, .36)} ${q(-.02, .44)} ${q(.12, .44)} C${q(.02, .3)} ${q(-.04, .1)} ${q(.02, -.12)} C${q(.04, -.3)} ${q(.02, -.42)} ${q(-.05, -.5)}Z`} fill={tone(skinMat, Math.min(1, sk + .34))} filter="url(#b2s)" />
        <path d={`M${q(.06, .34)} C${q(.16, .4)} ${q(.28, .4)} ${q(.36, .3)} L${q(.3, .46)} C${q(.2, .5)} ${q(.1, .46)} ${q(.06, .34)}Z`} fill={tone(skinMat, Math.min(1, sk + .3))} filter="url(#b2s)" />
        <ellipse cx={hc[0] + .25 * hh * f} cy={hc[1] - .05 * hh} rx={.085 * hh} ry={.05 * hh} fill={tone(skinMat, Math.min(1, sk + .22))} filter="url(#b2s)" /></g>}
      <g opacity={draw}>
        {blink ? <Line d={`M${q(.2, eyeY)} Q${q(.25, eyeY + .02)} ${q(.3, eyeY)}`} w={inkW} /> : <>
          <path d={`M${q(.19, eyeY)} Q${q(.25, eyeY - .06 * ee)} ${q(.32, eyeY - .005)} Q${q(.26, eyeY + .04 * ee)} ${q(.19, eyeY)}Z`} fill="#FBF6EA" stroke={SEP} strokeWidth={inkW * .7} />
          {big && <circle cx={hc[0] + (.275 + lk[0] * .02) * hh * f} cy={hc[1] + (eyeY - .005 + lk[1] * .012) * hh} r={.045 * hh * Math.min(1, ee)} fill="#6A4A2E" stroke={SEP} strokeWidth={inkW * .4} />}
          <circle cx={hc[0] + (.275 + lk[0] * .02) * hh * f} cy={hc[1] + (eyeY - .005 + lk[1] * .012) * hh} r={(big ? .022 : .03) * hh} fill={SEP} />
          {big && <circle cx={hc[0] + (.268 + lk[0] * .02) * hh * f} cy={hc[1] + (eyeY - .018 + lk[1] * .012) * hh} r={.008 * hh} fill="#FBF6EA" />}
          {big && <Line d={`M${q(.18, eyeY - .02 * ee)} Q${q(.25, eyeY - .095 * ee)} ${q(.33, eyeY - .02)}`} w={inkW * .55} a={.7} />}</>}
        <Line d={`M${q(.17, -.13 + fc.brow * .02 - eb * .03)} Q${q(.25, -.17 - fc.brow * .03 - eb * .045)} ${q(.34, -.12 + fc.brow * .02 - eb * .02 + (eb < 0 ? -eb * .035 : 0))}`} w={inkW * 1.3} />
        {big && <><Line d={`M${q(.4, .09)} q${f1(.02 * hh * f)} ${f1(.03 * hh)} ${f1(-.012 * hh * f)} ${f1(.04 * hh)}`} w={inkW * .5} a={.7} />
          {[0, 1, 2, 3].map(i => <Line key={i} d={`M${q(.08 + i * .035, .06 + i * .012)} l${f1(.05 * hh * f)} ${f1(.11 * hh)}`} w={inkW * .4} a={.28} />)}
          <Line d={`M${q(.31, .262)} Q${q(.335, .278)} ${q(.36, .262)}`} w={inkW * .45} a={.5} /></>}
        {fc.age > 0 && <g opacity={fc.age}><Line d={`M${q(.12, -.26)} q${f1(.1 * hh * f)} ${f1(-.02 * hh)} ${f1(.2 * hh * f)} 0 M${q(.14, -.21)} q${f1(.08 * hh * f)} ${f1(-.015 * hh)} ${f1(.16 * hh * f)} 0`} w={inkW * .5} /><Line d={`M${q(.33, .02)} q${f1(-.04 * hh * f)} ${f1(.08 * hh)} ${f1(-.02 * hh * f)} ${f1(.16 * hh)}`} w={inkW * .5} /><Line d={`M${q(.31, -.05)} l${f1(.04 * hh * f)} ${f1(-.03 * hh)} M${q(.31, -.02)} l${f1(.05 * hh * f)} 0`} w={inkW * .4} /></g>}
        <Line d={`M${q(.42, .12)} q${f1(-.04 * hh * f)} ${f1(.02 * hh)} ${f1(-.06 * hh * f)} ${f1(-.01 * hh)}`} w={inkW * .7} />
        {eo > .15 ? <ellipse cx={hc[0] + .338 * hh * f} cy={hc[1] + .222 * hh} rx={.024 * hh} ry={.034 * hh * eo} fill="#3A1E14" stroke={SEP} strokeWidth={inkW * .6} />
          : <Line d={`M${q(.295, .215 - em * .022)} Q${q(.33, .215 + em * .02)} ${q(.365, .215 - em * .012)}`} w={inkW * .9} />}
        <Line d={`M${q(.27, .1)} Q${q(.22, .2)} ${q(.28, .28)}`} w={inkW * .5} a={.45} />
      </g>
      {hairD && hat !== 'helmet' && <Region d={hairD} color={hc2} mat="wood" t={.5} ang={20} draw={draw} sw={inkW * .9} hatchA={.4} />}
      {hair === 'wig' && hat !== 'helmet' && [-.02, .12].map(k => <Region key={k} d={cap([hc[0] - .3 * hh * f, hc[1] + k * hh], [hc[0] - .06 * hh * f, hc[1] + k * hh], .055 * hh, .055 * hh)} color={hc2} mat="paper" t={.3} draw={draw} sw={inkW * .7} rim={false} hatch={0} />)}
      {hair === 'wig' && hat !== 'helmet' && <Region d={cap([hc[0] - .4 * hh * f, hc[1] + .1 * hh], [hc[0] - .45 * hh * f, hc[1] + .55 * hh], .04 * hh, .03 * hh)} mat="night" t={.85} draw={draw} sw={inkW * .6} rim={false} />}
      {hair === 'bun' && <Region d={`M${q(-.38, -.25)} a${f1(.12 * hh)} ${f1(.12 * hh)} 0 1 0 ${f1(.001)} 0Z`} color={hc2} mat="wood" t={.5} draw={draw} sw={inkW * .8} />}
      {beardD && <Region d={beardD} color={pp.hairCol || HAIR.brown} mat="wood" t={.5} ang={90} draw={draw} sw={inkW * .8} hatchA={.45} />}
      {hat === 'tricorn' && <Region d={`M${q(-.55, -.32)} C${q(-.3, -.5)} ${q(.3, -.52)} ${q(.55, -.28)} C${q(.4, -.5)} ${q(.2, -.82)} ${q(-.05, -.8)} C${q(-.3, -.8)} ${q(-.5, -.55)} ${q(-.55, -.32)}Z`} mat="night" t={.9} ang={0} draw={draw} sw={inkW} />}
      {hat === 'tricorn' && <path d={`M${q(-.5, -.36)} C${q(-.2, -.5)} ${q(.3, -.5)} ${q(.5, -.32)}`} fill="none" stroke="url(#gold)" strokeWidth={inkW * 1.6} opacity={draw} />}
      {hat === 'top' && <Region d={`M${q(-.55, -.38)} Q${q(0, -.5)} ${q(.55, -.38)} L${q(.5, -.33)} Q${q(0, -.44)} ${q(-.5, -.33)}Z M${q(-.34, -.42)} L${q(-.38, -1.15)} Q${q(0, -1.22)} ${q(.36, -1.15)} L${q(.33, -.44)}Z`} mat="night" t={.9} ang={0} draw={draw} sw={inkW} />}
      {hat === 'cap' && <Region d={`M${q(-.4, -.3)} C${q(-.42, -.64)} ${q(.3, -.7)} ${q(.36, -.38)} L${q(.6, -.32)} L${q(.36, -.28)} Q${q(0, -.3)} ${q(-.4, -.3)}Z`} mat="leaf" t={.7} ang={0} draw={draw} sw={inkW} />}
      {hat === 'helmet' && <g><circle cx={hc[0]} cy={hc[1] + .05 * hh} r={.78 * hh} fill="#DCEAF0" opacity={.28 * draw} stroke={SEP} strokeWidth={inkW * 1.2} />
        <path d={`M${q(.05, -.6)} A${f1(.7 * hh)} ${f1(.7 * hh)} 0 0 1 ${q(.62, .05)}`} fill="none" stroke="url(#gold)" strokeWidth={.16 * hh} opacity={.55 * draw} />
        <ellipse cx={hc[0] - .35 * hh * f} cy={hc[1] - .4 * hh} rx={.12 * hh} ry={.06 * hh} fill="#FFFFFF" opacity={.7 * draw} transform={`rotate(-35 ${hc[0] - .35 * hh * f} ${hc[1] - .4 * hh})`} />
        <Region d={cap([hc[0] - .6 * hh * f, hc[1] + .75 * hh], [hc[0] + .6 * hh * f, hc[1] + .75 * hh], .1 * hh, .1 * hh)} mat="regolith" t={.45} draw={draw} sw={inkW} rim={false} /></g>}
    </g>; };
  const held = () => { if (!holds) return null; const a = angOf(elF, wrF), c = Math.cos(a * D), s = Math.sin(a * D), w = wrF, at = (l: N, k: N): Pt => [w[0] + c * l * u - s * k * u, w[1] + s * l * u + c * k * u];
    if (holds === 'book') { const p = [at(.02, -.06), at(.1, -.05), at(.1, .07), at(.02, .06)]; return <Region d={`M${p.map(q => q.map(f1).join(' ')).join(' L')}Z`} mat="red" t={.6} ang={a} draw={draw} sw={inkW} />; }
    if (holds === 'quill') return <g opacity={draw}><Region d={cap(at(.02, 0), at(-.03, -.16), .004 * u, .02 * u)} mat="paper" t={.15} ang={a} draw={draw} sw={inkW * .7} rim={false} /><Line d={`M${at(.03, .01).map(f1).join(' ')} L${at(-.04, -.17).map(f1).join(' ')}`} w={inkW * .6} /></g>;
    if (holds === 'scroll') return <g><Region d={cap(at(.03, -.07), at(.03, .07), .016 * u, .016 * u)} mat="paper" t={.25} ang={a} draw={draw} sw={inkW * .8} /><Region d={`M${at(.03, .07).map(f1).join(' ')} L${at(.03, .07).map(f1).join(' ')} L${f1(at(.03, .07)[0])} ${f1(at(.03, .07)[1] + .12 * u)} L${f1(at(.03, -.07)[0])} ${f1(at(.03, -.07)[1] + .12 * u)} L${at(.03, -.07).map(f1).join(' ')}Z`} mat="paper" t={.12} draw={draw} sw={inkW * .7} rim={false} /></g>;
    if (holds === 'phial') { const b = at(.03, 0), t = at(.03, -.075); return <g opacity={draw}><path d={`M${f1(b[0] - .009 * u)} ${f1(t[1])} L${f1(b[0] - .009 * u)} ${f1(b[1])} Q${f1(b[0])} ${f1(b[1] + .01 * u)} ${f1(b[0] + .009 * u)} ${f1(b[1])} L${f1(b[0] + .009 * u)} ${f1(t[1])}Z`} fill="#C9DDE6" fillOpacity={.4} stroke={SEP} strokeWidth={inkW * .7} />
      <path d={`M${f1(b[0] - .008 * u)} ${f1(b[1] - .03 * u)} L${f1(b[0] + .008 * u)} ${f1(b[1] - .03 * u)} L${f1(b[0] + .008 * u)} ${f1(b[1])} Q${f1(b[0])} ${f1(b[1] + .008 * u)} ${f1(b[0] - .008 * u)} ${f1(b[1])}Z`} fill="#8C3424" /><rect x={b[0] - .011 * u} y={t[1] - .012 * u} width={.022 * u} height={.014 * u} fill="#4F3020" /></g>; }
    if (holds === 'hammer') { const h0 = at(-.02, 0), h1 = at(.16, 0), hd = at(.16, 0); return <g opacity={draw}><Line d={`M${f1(h0[0])} ${f1(h0[1])} L${f1(h1[0])} ${f1(h1[1])}`} w={.012 * u} col="#8C5A36" a={1} />
      <Region d={cap(at(.15, -.04), at(.17, .035), .016 * u, .014 * u)} mat="stone" t={.75} ang={a} draw={draw} sw={inkW * .8} /></g>; }
    if (holds === 'lamp') { const p = at(.03, 0); return <g><circle cx={p[0]} cy={p[1] + .07 * u} r={.09 * u} fill="url(#glowW)" opacity={.7 * draw} /><Region d={cap([p[0], p[1] + .02 * u], [p[0], p[1] + .1 * u], .025 * u, .03 * u)} mat="brass" t={.4} draw={draw} sw={inkW} /></g>; }
    return null; };
  const lean = P.lean * f;
  return <g>
    <ellipse cx={x + (P.sit ? .1 * u * f : 0)} cy={y + .004 * u} rx={u * (P.sit ? .2 : .14)} ry={u * .018} fill={SEP} opacity={.24 * draw} filter="url(#b2s)" />
    <g transform={`rotate(${lean} ${f1(hip[0])} ${f1(hip[1])})`}>{arm(shB, elB, wrB, true)}</g>
    {leg(hipB, kneeB, ankB, true)}
    {leg(hipF, kneeF, ankF, false)}
    {P.sit > .5 && C.coat > 0 && C.coat < .06 && <Region d={`M${f1(hipB[0] - .05 * u * f)} ${f1(hipY - .03 * u)} L${f1(kneeF[0] + .035 * u * f)} ${f1(kneeF[1] - .03 * u)} Q${f1(kneeF[0] + .06 * u * f)} ${f1(kneeF[1] + .02 * u)} ${f1(kneeF[0] + .045 * u * f)} ${f1(Math.min(ankF[1], kneeF[1] + .2 * u))} L${f1(kneeF[0] - .07 * u * f)} ${f1(Math.min(ankF[1], kneeF[1] + .21 * u))} Q${f1(hipB[0] - .02 * u * f)} ${f1(hipY + .12 * u)} ${f1(hipB[0] - .06 * u * f)} ${f1(hipY + .02 * u)}Z`} mat={C.mat} t={C.t} ang={90} draw={draw} sw={inkW} />}
    {P.sit > .5 && C.coat > 0 && C.coat < .06 && [0, 1, 2].map(k => <Line key={'fold' + k} d={`M${f1(kneeF[0] - (.01 + k * .025) * u * f)} ${f1(kneeF[1])} q${f1(-.01 * u * f)} ${f1(.1 * u)} ${f1(-.005 * u * f)} ${f1(.18 * u)}`} w={inkW * .6} a={.5 * draw} />)}
    <g transform={`rotate(${lean} ${f1(hip[0])} ${f1(hip[1])})`}>
      {torso()}
      {P.sit > .5 && C.coat > 0 && <Region d={cap(hipF, [kneeF[0] - .01 * u * f, kneeF[1] - .005 * u], .055 * u, .045 * u)} mat={C.mat} t={C.t} ang={0} draw={draw} sw={inkW} />}
      {head()}
      {arm(shF, elF, wrF, false)}
      {held()}
    </g>
  </g>;
};
