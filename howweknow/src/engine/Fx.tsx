// FX wrapper — every entity can carry these animatable props (keys glide them), so effects combine freely (FX.md):
//   move/scale/turn: fx_x fx_y (px) · fx_s · fx_r (deg) · origin fx_ox fx_oy (px, default the box centre) · fx_box [x,y,w,h] the element's area
//   reveals: wipe 0..1 (+ wipeDir right|left|up|down|diag) · iris 0..1 (+ irisAt [x,y]) · unroll 0..1 (a scroll opening downward) ·
//            blinds 0..1 (venetian strips) · tear 0..1 (torn-paper edge travelling right)
//   paper moves: flipX / flipY (deg, a card or page turning in perspective) · lift (px: rises off the paper with a growing shadow)
//   life: sway (px, slow side-to-side) · bob (px, up-down) · tremble (px, a fast small shake) · breathe (0..1 gentle scale pulse)
//   tone: sepia 0..1 (drawn colour drains to ink) · dim 0..1 (falls back into shade)
//   v4 transitions (owner 16 Nov 2026: one picture BECOMES the next, smoothly):
//     dissolve 0..1 — an organic INK-BLEED reveal/erase (fractal noise threshold with a dark ink rim at the moving edge); 1 = whole.
//                     dissolveAt [x,y] = it spreads from that point · dissolveDir right|left|up|down = it sweeps that way · dissolveGrain (noise scale, default 1)
//     blur (px) — focus pull: a thing comes into focus / falls out of it (keep short; never on a long held zoomed layer)
//     glowfx 0..1 — a warm bloom of light over the element (a revelation, heat)
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Props } from './state';
const KEYS = ['fx_box', 'fx_x', 'fx_y', 'fx_s', 'fx_r', 'wipe', 'iris', 'unroll', 'blinds', 'tear', 'flipX', 'flipY', 'lift', 'sway', 'bob', 'tremble', 'breathe', 'sepia', 'dim', 'dissolve', 'blur', 'glowfx'];
export const hasFx = (s: Props) => KEYS.some(k => k !== 'fx_box' && s[k] !== undefined);
export const FX_KEYS = KEYS;
const W0 = 1920, H0 = 1080;
const gradUri = (s: Props) => {   // the bias field for a directed dissolve: 0 where it starts, 1 where it ends
  const at = s.dissolveAt, d = s.dissolveDir; let g = '';
  if (at) g = `<radialGradient id='g' gradientUnits='userSpaceOnUse' cx='${at[0]}' cy='${at[1]}' r='${s.dissolveR ?? 1500}'><stop offset='0' stop-color='black'/><stop offset='1' stop-color='white'/></radialGradient>`;
  else { const [x1, y1, x2, y2] = d === 'left' ? [1, 0, 0, 0] : d === 'up' ? [0, 1, 0, 0] : d === 'down' ? [0, 0, 0, 1] : [0, 0, 1, 0];
    g = `<linearGradient id='g' x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}'><stop offset='0' stop-color='black'/><stop offset='1' stop-color='white'/></linearGradient>`; }
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${W0}' height='${H0}'><defs>${g}</defs><rect width='${W0}' height='${H0}' fill='url(#g)'/></svg>`);
};
// the ink-bleed filter: noise (+ optional bias toward a point/direction) → threshold at `dissolve` with a soft edge + a dark ink rim
const Dissolve: React.FC<{ id: string; s: Props; seed: number }> = ({ id, s, seed }) => {
  const k = Math.max(0, Math.min(1, s.dissolve)), w = .07, rim = .035, kk = k * (1 + 2 * w + rim) - w, biased = !!(s.dissolveAt || s.dissolveDir), b = biased ? .62 : 0;
  const f = .0032 / (s.dissolveGrain ?? 1), S = 3.0, O = .5 - S * .5;
  return <svg width={0} height={0} style={{ position: 'absolute' }}><defs><filter id={id} x={0} y={0} width={W0} height={H0} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency={`${f} ${f * 1.15}`} numOctaves={4} seed={(seed * 13) % 97} result="n0" />
    <feColorMatrix in="n0" type="matrix" values={`${S} 0 0 0 ${O}  ${S} 0 0 0 ${O}  ${S} 0 0 0 ${O}  0 0 0 0 1`} result="n" />
    {biased && <feImage href={gradUri(s)} x={0} y={0} width={W0} height={H0} preserveAspectRatio="none" result="g" />}
    {biased && <feComposite in="n" in2="g" operator="arithmetic" k1={0} k2={1 - b} k3={b} k4={0} result="nb" />}
    <feColorMatrix in={biased ? 'nb' : 'n'} type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="v" />
    <feComponentTransfer in="v" result="m"><feFuncA type="linear" slope={-1 / w} intercept={kk / w} /></feComponentTransfer>
    <feComponentTransfer in="v" result="m2"><feFuncA type="linear" slope={-1 / w} intercept={(kk - rim) / w} /></feComponentTransfer>
    <feComposite in="SourceGraphic" in2="m2" operator="in" result="vis" />
    <feComposite in="m" in2="m2" operator="out" result="band" />
    <feFlood floodColor="#2B1D12" floodOpacity={.7} result="ink" /><feComposite in="ink" in2="band" operator="in" result="inkb" />
    <feComposite in="inkb" in2="SourceGraphic" operator="in" result="rimg" />
    <feMerge><feMergeNode in="vis" /><feMergeNode in="rimg" /></feMerge>
  </filter></defs></svg>;
};
export const Fx: React.FC<{ s: Props; t: number; seed: number; uid?: string; children: React.ReactNode }> = ({ s, t, seed, uid, children }) => {
  // fx_box [x, y, w, h] = the element's area: reveals run across IT (not the whole frame) and turns/scales pivot on its centre
  const [bx0, by0, bw0, bh0] = s.fx_box || [0, 0, 1920, 1080], pd = s.fx_box ? 40 : 0, bx = bx0 - pd, by = by0 - pd, bw = bw0 + 2 * pd, bh = bh0 + 2 * pd,   // the moving edge starts just outside the box (shadows, rotated corners)
    ox = s.fx_ox ?? bx + bw / 2, oy = s.fx_oy ?? by + bh / 2, ph = seed * 1.7, B = 4000;
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
  const dis = s.dissolve !== undefined && s.dissolve < .999 && s.dissolve > .001, fid = 'dz_' + (uid || seed).toString().replace(/[^\w-]/g, '_');
  if (s.dissolve !== undefined && s.dissolve <= .001) return null;
  const filt = [dis ? `url(#${fid})` : '', s.blur > .05 ? `blur(${s.blur}px)` : '', s.sepia ? `sepia(${s.sepia}) saturate(${1 - s.sepia * .6})` : '', s.dim ? `brightness(${1 - s.dim * .55})` : '',
    s.glowfx > .01 ? `brightness(${1 + s.glowfx * .18}) drop-shadow(0 0 ${18 * s.glowfx}px rgba(247,214,140,${.75 * s.glowfx}))` : '', s.lift ? `drop-shadow(0 ${s.lift * .6}px ${s.lift * .5}px rgba(0,0,0,.35))` : ''].filter(Boolean).join(' ') || undefined;
  const body = <AbsoluteFill style={{ transform: tf, transformOrigin: `${ox}px ${oy}px`, clipPath: clip }}>{children}</AbsoluteFill>;
  return filt ? <AbsoluteFill style={{ filter: filt }}>{dis && <Dissolve id={fid} s={s} seed={s.dissolveSeed ?? seed} />}{body}</AbsoluteFill> : body;
};
