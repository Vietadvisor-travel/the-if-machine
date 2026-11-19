// The thumbnail of "What makes the Sun shine?" (FATHOM poster, kit/ThumbPoster). HERO: the Sun gripped in giant iron tongs, half turned to a
// lump of glowing coal (CoalSun) — the film's first wrong answer and its strongest image. Back: a dark furnace glow with drifting sparks.
// Words: the question itself; note from the pack (F4: Eddington 1920 — the answer was a sliver of missing weight).
import React from 'react';
import { ThumbPoster, ThumbPosterV } from '../../kit/ThumbPoster';
import { ART_A } from './a';
const words = (p: any) => ({ kicker: p.kicker ?? 'Eddington · 1920', title: p.lines ?? ['WHAT', 'MAKES THE', 'SUN SHINE?'], accent: p.accent ?? 2, note: p.note ?? 'Not fire. Not gravity.' });
const Hero: React.FC<{ W: number; H: number; cx: number; cy: number; w: number }> = ({ W, H, cx, cy, w }) => { const A = ART_A.CoalSun, h = w * 1080 / 1920;
  return <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><svg x={cx - w / 2} y={cy - h / 2} width={w} height={h} viewBox="420 0 1080 1080">
    <A x={960} y={540} s={1} draw={1} grip={1} coal={.55} flames={1} earth={0} age={0} release={0} layers={0} tm={1.3} /></svg></svg>; };
const Glow: React.FC<{ W: number; H: number }> = ({ W, H }) => <g>
  <defs><radialGradient id={`sg${W}`} cx=".7" cy=".45" r=".7"><stop offset="0" stopColor="#E8823A" stopOpacity=".55" /><stop offset=".5" stopColor="#7A2E14" stopOpacity=".35" /><stop offset="1" stopColor="#120806" stopOpacity="0" /></radialGradient></defs>
  <rect x={0} y={0} width={W} height={H} fill={`url(#sg${W})`} />
  {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={(W * ((i * 37) % 100)) / 100} cy={(H * ((i * 61 + 13) % 100)) / 100} r={2 + (i % 3)} fill="#F2B04A" opacity={.35 + (i % 4) * .12} />)}
</g>;
export const THUMB: React.FC<any> = (p) => <ThumbPoster {...words(p)} hero={<Hero W={1280} H={720} cx={960} cy={380} w={1240} />} back={<Glow W={1280} H={720} />} lamp={[960, 300]} />;
export const THUMB_V: React.FC<any> = (p) => <ThumbPosterV {...words(p)} hero={<Hero W={1080} H={1920} cx={540} cy={1150} w={1900} />} back={<Glow W={1080} H={1920} />} />;
