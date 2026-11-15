// Brand opening sting (first 2.4 s, over the cold story) and end card (last 3 s). The channel name lives in brand.ts.
import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { BRAND } from './brand';
import { P, FONT } from './style';
const c = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const Mark: React.FC<{ s: number; k: number }> = ({ s, k }) => (
  <svg width={s} height={s} viewBox="0 0 100 100"><circle cx="44" cy="44" r="30" fill="none" stroke={P.amber} strokeWidth="6" pathLength={1} strokeDasharray={`${k} 1`} transform="rotate(-90 44 44)" />
    <line x1="66" y1="66" x2="88" y2="88" stroke={P.amber} strokeWidth="9" strokeLinecap="round" opacity={k} /><circle cx="44" cy="44" r="4" fill={P.cream} opacity={k} /></svg>);
export const Brand: React.FC<{ t: number; dur: number }> = ({ t, dur }) => {
  const endK = interpolate(t, [dur - 3, dur - 2.2], [0, 1], c);
  if (t > 2.6 && endK <= 0) return null;
  if (t <= 2.6) { const a = interpolate(t, [0.2, 0.7, 2.0, 2.6], [0, 1, 1, 0], c);   // small corner sting, the story starts underneath
    return <AbsoluteFill style={{ opacity: a }}><div style={{ position: 'absolute', right: 80, top: 62, display: 'flex', alignItems: 'center', gap: 12 }}><Mark s={38} k={interpolate(t, [0.2, 1.2], [0, 1], c)} /><span style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: P.cream }}>{BRAND.name}</span></div></AbsoluteFill>; }
  return <AbsoluteFill style={{ background: `rgba(7,11,22,${0.92 * endK})`, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 26, opacity: endK }}>
    <Mark s={140} k={interpolate(t, [dur - 2.8, dur - 1.6], [0, 1], c)} />
    <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 78, letterSpacing: 6, color: P.cream }}>{BRAND.name}</div>
    <div style={{ fontFamily: FONT.mono, fontSize: 20, letterSpacing: 8, color: P.fog }}>{BRAND.tagline}</div></AbsoluteFill>;
};
