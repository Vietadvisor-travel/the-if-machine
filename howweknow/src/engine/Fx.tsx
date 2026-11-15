// FX wrapper — every entity can carry these animatable props (keys glide them), so effects combine freely (FX.md):
//   move/scale/turn: fx_x fx_y (px) · fx_s · fx_r (deg) · origin fx_ox fx_oy (px, default the box centre) · fx_box [x,y,w,h] the element's area
//   reveals: wipe 0..1 (+ wipeDir right|left|up|down|diag) · iris 0..1 (+ irisAt [x,y]) · unroll 0..1 (a scroll opening downward) ·
//            blinds 0..1 (venetian strips) · tear 0..1 (torn-paper edge travelling right)
//   paper moves: flipX / flipY (deg, a card or page turning in perspective) · lift (px: rises off the paper with a growing shadow)
//   life: sway (px, slow side-to-side) · bob (px, up-down) · tremble (px, a fast small shake) · breathe (0..1 gentle scale pulse)
//   tone: sepia 0..1 (drawn colour drains to ink) · dim 0..1 (falls back into shade)
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Props } from './state';
const KEYS = ['fx_box', 'fx_x', 'fx_y', 'fx_s', 'fx_r', 'wipe', 'iris', 'unroll', 'blinds', 'tear', 'flipX', 'flipY', 'lift', 'sway', 'bob', 'tremble', 'breathe', 'sepia', 'dim'];
export const hasFx = (s: Props) => KEYS.some(k => k !== 'fx_box' && s[k] !== undefined);
export const FX_KEYS = KEYS;
export const Fx: React.FC<{ s: Props; t: number; seed: number; children: React.ReactNode }> = ({ s, t, seed, children }) => {
  // fx_box [x, y, w, h] = the element's area: reveals run across IT (not the whole frame) and turns/scales pivot on its centre
  const [bx, by, bw, bh] = s.fx_box || [0, 0, 1920, 1080], ox = s.fx_ox ?? bx + bw / 2, oy = s.fx_oy ?? by + bh / 2, ph = seed * 1.7, B = 4000;
  const x = (s.fx_x ?? 0) + (s.sway ? Math.sin(t * .8 + ph) * s.sway : 0) + (s.tremble ? Math.sin(t * 43 + ph) * s.tremble : 0);
  const y = (s.fx_y ?? 0) + (s.bob ? Math.sin(t * 1.1 + ph) * s.bob : 0) + (s.tremble ? Math.cos(t * 37 + ph) * s.tremble : 0) - (s.lift ?? 0);
  const sc = (s.fx_s ?? 1) * (s.breathe ? 1 + Math.sin(t * 1.6 + ph) * .012 * s.breathe : 1) * (s.lift ? 1 + s.lift / 1200 : 1);
  const tf = `translate(${x}px, ${y}px) perspective(1800px) rotateX(${s.flipX ?? 0}deg) rotateY(${s.flipY ?? 0}deg) rotate(${s.fx_r ?? 0}deg) scale(${sc})`;
  const R = (x0: number, y0: number, x1: number, y1: number) => `${x0}px ${y0}px, ${x1}px ${y0}px, ${x1}px ${y1}px, ${x0}px ${y1}px`;
  let clip: string | undefined;
  if (s.wipe !== undefined && s.wipe < 1) { const w = Math.max(0, s.wipe), d = s.wipeDir || 'right', c = bx + by + (bw + bh) * w;
    clip = `polygon(${d === 'left' ? R(bx + bw * (1 - w), -B, B, B) : d === 'up' ? R(-B, by + bh * (1 - w), B, B) : d === 'down' ? R(-B, -B, B, by + bh * w) : d === 'diag' ? `${-B}px ${-B}px, ${c + B}px ${-B}px, ${-B}px ${c + B}px` : R(-B, -B, bx + bw * w, B)})`; }
  if (s.iris !== undefined && s.iris < 1) { const [ix, iy] = s.irisAt || [bx + bw / 2, by + bh / 2]; clip = `circle(${Math.max(0, s.iris) * Math.hypot(bw, bh) * .55}px at ${ix}px ${iy}px)`; }
  if (s.unroll !== undefined && s.unroll < 1) clip = `polygon(${R(-B, -B, B, by + bh * Math.max(0, s.unroll))})`;
  if (s.blinds !== undefined && s.blinds < 1) { const n = 10, st = bh / n, pts: string[] = []; for (let i = 0; i < n; i++) { const a = by + i * st, b = a + Math.max(0, s.blinds) * st; pts.push(`${-B}px ${a}px, ${B}px ${a}px, ${B}px ${b}px, ${-B}px ${b}px, ${-B}px ${a}px`); } clip = `polygon(evenodd, ${pts.join(', ')})`; }
  if (s.tear !== undefined && s.tear < 1) { const w = bx + bw * (s.tear * 1.1 - .05), pts = [`${-B}px ${-B}px`, `${w}px ${-B}px`]; for (let i = 0; i <= 20; i++) pts.push(`${w + (Math.sin(i * 2.7 + seed) * .016 + (i % 2 ? .012 : -.012)) * bw}px ${by + bh * i / 20}px`); pts.push(`${w}px ${B}px`, `${-B}px ${B}px`); clip = `polygon(${pts.join(', ')})`; }
  const filt = [s.sepia ? `sepia(${s.sepia}) saturate(${1 - s.sepia * .6})` : '', s.dim ? `brightness(${1 - s.dim * .55})` : '', s.lift ? `drop-shadow(0 ${s.lift * .6}px ${s.lift * .5}px rgba(0,0,0,.35))` : ''].filter(Boolean).join(' ') || undefined;
  return <AbsoluteFill style={{ transform: tf, transformOrigin: `${ox}px ${oy}px`, clipPath: clip, filter: filt }}>{children}</AbsoluteFill>;
};
