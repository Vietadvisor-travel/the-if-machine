// ENGINE v6 — THE LOOK (owner 17 Nov 2026: "nâng toàn diện… cho đạt đỉnh cao thật sự"). Everything here is OFF for films made before v6
// (episode.json "engine" < 6) so old films render exactly as they did; a v6 film gets it by default, keyable on `camera`:
//   engrave 0..1  — the hand-coloured-ENGRAVING pass: every shadow of the picture is cut in parallel ink lines, the deepest shadows
//                   cross-hatched (luminance → two thresholds → two line screens), the screens riding with the camera drift.
//   warm −1..1 · sat (1 = as drawn) · con (contrast, 1) · expo (brightness, 1) — the grade, keyed per act (cold night lab → warm find)
//   grain 0..1     — moving film grain over everything · weave px — the gate weave of an old projector · flick 0..1 — its light flicker
//   focus / dof    — depth of field: a layer at depth `para` is blurred by dof × |para − focus| px (rack focus = key `focus`)
//   shake 0..1     — hand-held shake on top of the slow drift (tension, a discovery)
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

export const LOOK_DEF = { engrave: .8, warm: 0, sat: 1, con: 1, expo: 1, grain: .35, weave: .7, flick: .25, dof: 0, focus: 0, shake: 0, dolly: 0 };
export type LookS = typeof LOOK_DEF;
export const lookOf = (cam: Record<string, any> | undefined, v6: boolean): LookS | null => {
  if (!v6) return null; const o: any = { ...LOOK_DEF };
  for (const k of Object.keys(LOOK_DEF)) if (cam && typeof cam[k] === 'number') o[k] = cam[k];
  return o;
};
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// the line screens: ONE small seamless tile each (64 px), repeated by feTile — far cheaper than painting a whole frame of lines (the first
// version, a full-frame SVG per screen + a displacement wobble, cost 5.7× the render time; measured 17 Nov 2026). The wobble is drawn INTO the
// tile (every line a hand-cut, slightly bowed stroke), so it costs nothing per frame.
const T = 64;
const tile = (kind: 'd1' | 'd2' | 'h', n: number, w: number) => {
  const s = T / n, ls: string[] = [];
  for (let i = -n; i <= 2 * n; i++) { const o = i * s, b = ((i * 37) % 7 - 3) * .18;
    if (kind === 'h') ls.push(`M0 ${o} Q${T / 2} ${o + b} ${T} ${o}`);
    else if (kind === 'd1') ls.push(`M${o} 0 Q${o + T / 2 + b} ${T / 2 - b} ${o + T} ${T}`);
    else ls.push(`M${o} ${T} Q${o + T / 2 + b} ${T / 2 + b} ${o + T} 0`); }
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${T}' height='${T}'><path d='${ls.join(' ')}' stroke='#2B1D12' stroke-width='${w}' fill='none'/></svg>`);
};
const S1 = tile('d1', 12, 1.25);
const B2 = tile('d2', 11, 1.3).replace('%232B1D12', '%23c6c2bc');   // lighter ink for color-burn: bites only deep tones

// ENGRAVING by blend layers (cheap: three GPU-style blends instead of a software SVG filter over the frame):
//   lift   — a warm wash screened over the picture: darks rise toward a wash (as in a hand-coloured print the dark is LINE, not pigment)
//   cut 1  — the first line screen in OVERLAY: bites mid-tones and shadows, leaves lit paper almost clean
//   cut 2  — the crossing screen in COLOR-BURN: bites only as the tone gets deep  ·  cut 3 — a fine horizontal screen, deepest shadows
export const EngraveOver: React.FC<{ k: number; ox: number; oy: number }> = ({ k, ox, oy }) => {
  if (k <= 0) return null; const K = Math.min(1, k), pos = `${(((ox % T) + T) % T).toFixed(1)}px ${(((oy % T) + T) % T).toFixed(1)}px`;
  const lay = (img: string, mode: any, a: number): React.CSSProperties => ({ pointerEvents: 'none', backgroundImage: `url("${img}")`, backgroundSize: `${T}px ${T}px`, backgroundPosition: pos, mixBlendMode: mode, opacity: a * K });
  return <>
    <AbsoluteFill style={{ pointerEvents: 'none', background: '#6e5f50', mixBlendMode: 'screen', opacity: .09 * K }} />   {/* a small lift only: deep blacks must stay deep (the night lab went milky at .2) */}
    <AbsoluteFill style={lay(S1, 'overlay', .8)} />
    <AbsoluteFill style={lay(B2, 'color-burn', .5)} />
  </>;
};

// the grade + the projector: CSS filter for the whole picture, a warm/cool wash, grain, weave and flicker
// a CSS filter on the whole frame forces a full off-screen pass (measured: ~+40 % render time), so it is used ONLY when a scene keys
// sat / con / expo away from neutral; flicker is a faint light/dark veil instead (nearly free)
export const gradeFilter = (L: LookS) => Math.abs(L.sat - 1) < .01 && Math.abs(L.con - 1) < .01 && Math.abs(L.expo - 1) < .01 ? undefined
  : `brightness(${L.expo.toFixed(3)}) contrast(${L.con}) saturate(${L.sat})`;
export const weaveT = (L: LookS, f: number) => `translate(${(L.weave * (hash(f * 1.3) - .5)).toFixed(2)}px, ${(L.weave * 1.4 * (hash(f * 2.1 + 7) - .5)).toFixed(2)}px)`;
export const shakeOf = (L: LookS, t: number) => { const s = L.shake; if (!s) return [0, 0, 0];
  const n = (a: number) => Math.sin(t * a) * .6 + Math.sin(t * a * 2.3 + 1.7) * .4;
  return [s * 9 * n(13.1), s * 7 * n(11.7 + .3), s * .35 * n(9.3)]; };
export const LookOver: React.FC<{ L: LookS; f: number }> = ({ L, f }) => <>
  {L.flick > 0 && <AbsoluteFill style={{ pointerEvents: 'none', background: hash(f) > .5 ? `rgba(255,240,210,${(L.flick * .03 * (hash(f) - .5)).toFixed(4)})` : `rgba(20,12,6,${(L.flick * .03 * (.5 - hash(f))).toFixed(4)})` }} />}
  {L.warm !== 0 && <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'soft-light', background: L.warm > 0 ? `rgba(255,170,80,${(.38 * L.warm).toFixed(3)})` : `rgba(60,110,170,${(-.42 * L.warm).toFixed(3)})` }} />}
  {L.grain > 0 && <Img src={staticFile(`core/grain_${f % 4}.png`)} style={{ position: 'absolute', inset: 0, width: 1920, height: 1080, objectFit: 'cover', opacity: .22 * L.grain, mixBlendMode: 'overlay',
    transform: `translate(${Math.round(hash(f) * 40 - 20)}px, ${Math.round(hash(f + 3) * 40 - 20)}px) scale(1.05)` }} />}
</>;
export const blurOf = (L: LookS | null, para: number) => L && L.dof > 0 ? Math.min(14, L.dof * Math.abs(para - L.focus)) : 0;

// v7 DOLLY — the camera TRAVELS INTO the set (not a zoom): every layer grows by its own perspective, near layers (high `para`) far faster
// than far ones, and a layer that passes the lens (scale > 3) fades away as the camera goes through it. dolly 0 = resting, 1 = deep in.
export const dollyOf = (L: LookS | null, para: number): [number, number] => {
  if (!L || !L.dolly) return [1, 1];
  const w = Math.max(0, Math.min(.96, (para + 1) / 2.4)), sc = 1 / Math.max(.04, 1 - L.dolly * w);
  return [sc, sc > 3 ? Math.max(0, 1 - (sc - 3) / 2) : 1];
};
