// FX wrapper — every entity can carry these animatable props (keys glide them), so effects combine freely (FX.md):
//   move/scale/turn: fx_x fx_y (px) · fx_s · fx_r (deg) · origin fx_ox fx_oy (px, default centre)
//   reveals: wipe 0..1 (+ wipeDir right|left|up|down|diag) · iris 0..1 (+ irisAt [x,y]) · unroll 0..1 (a scroll opening downward) ·
//            blinds 0..1 (venetian strips) · tear 0..1 (torn-paper edge travelling right)
//   paper moves: flipX / flipY (deg, a card or page turning in perspective) · lift (px: rises off the paper with a growing shadow)
//   life: sway (px, slow side-to-side) · bob (px, up-down) · tremble (px, a fast small shake) · breathe (0..1 gentle scale pulse)
//   tone: sepia 0..1 (drawn colour drains to ink) · dim 0..1 (falls back into shade)
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Props } from './state';
const KEYS = ['fx_x', 'fx_y', 'fx_s', 'fx_r', 'wipe', 'iris', 'unroll', 'blinds', 'tear', 'flipX', 'flipY', 'lift', 'sway', 'bob', 'tremble', 'breathe', 'sepia', 'dim'];
export const hasFx = (s: Props) => KEYS.some(k => s[k] !== undefined);
export const FX_KEYS = KEYS;
export const Fx: React.FC<{ s: Props; t: number; seed: number; children: React.ReactNode }> = ({ s, t, seed, children }) => {
  const ox = s.fx_ox ?? 960, oy = s.fx_oy ?? 540, ph = seed * 1.7;
  const x = (s.fx_x ?? 0) + (s.sway ? Math.sin(t * .8 + ph) * s.sway : 0) + (s.tremble ? Math.sin(t * 43 + ph) * s.tremble : 0);
  const y = (s.fx_y ?? 0) + (s.bob ? Math.sin(t * 1.1 + ph) * s.bob : 0) + (s.tremble ? Math.cos(t * 37 + ph) * s.tremble : 0) - (s.lift ?? 0);
  const sc = (s.fx_s ?? 1) * (s.breathe ? 1 + Math.sin(t * 1.6 + ph) * .012 * s.breathe : 1) * (s.lift ? 1 + s.lift / 1200 : 1);
  const tf = `translate(${x}px, ${y}px) perspective(1800px) rotateX(${s.flipX ?? 0}deg) rotateY(${s.flipY ?? 0}deg) rotate(${s.fx_r ?? 0}deg) scale(${sc})`;
  let clip: string | undefined;
  if (s.wipe !== undefined && s.wipe < 1) { const w = s.wipe * 100, d = s.wipeDir || 'right';
    clip = d === 'left' ? `inset(0 0 0 ${100 - w}%)` : d === 'up' ? `inset(${100 - w}% 0 0 0)` : d === 'down' ? `inset(0 0 ${100 - w}% 0)` : d === 'diag' ? `polygon(0 0, ${w * 2}% 0, 0 ${w * 2}%)` : `inset(0 ${100 - w}% 0 0)`; }
  if (s.iris !== undefined && s.iris < 1) { const [ix, iy] = s.irisAt || [960, 540]; clip = `circle(${s.iris * 2300}px at ${ix}px ${iy}px)`; }
  if (s.unroll !== undefined && s.unroll < 1) clip = `inset(0 0 ${100 - s.unroll * 100}% 0)`;
  if (s.blinds !== undefined && s.blinds < 1) { const n = 12, pts: string[] = []; for (let i = 0; i < n; i++) { const a = i * 100 / n, b = a + s.blinds * 100 / n; pts.push(`0% ${a}%, 100% ${a}%, 100% ${b}%, 0% ${b}%, 0% ${a}%`); } clip = `polygon(evenodd, ${pts.join(', ')})`; }
  if (s.tear !== undefined && s.tear < 1) { const w = s.tear * 110 - 5, pts = ['0% 0%']; for (let i = 0; i <= 20; i++) pts.push(`${w + Math.sin(i * 2.7 + seed) * 1.6 + (i % 2 ? 1.2 : -1.2)}% ${i * 5}%`); pts.push('0% 100%'); clip = `polygon(${pts.join(', ')})`; }
  const filt = [s.sepia ? `sepia(${s.sepia}) saturate(${1 - s.sepia * .6})` : '', s.dim ? `brightness(${1 - s.dim * .55})` : '', s.lift ? `drop-shadow(0 ${s.lift * .6}px ${s.lift * .5}px rgba(0,0,0,.35))` : ''].filter(Boolean).join(' ') || undefined;
  return <AbsoluteFill style={{ transform: tf, transformOrigin: `${ox}px ${oy}px`, clipPath: clip, filter: filt }}>{children}</AbsoluteFill>;
};
