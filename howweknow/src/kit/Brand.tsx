// Brand in the film: a small corner sting while the cold story starts (0–2.6 s), and the end card (last 3 s) on paper:
// the mark (the sounding line, rendered from brand/brand.html) drops in, the wordmark is drawn, the tagline fades up.
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, Easing } from 'remotion';
import { BRAND } from './brand';
import { SEP } from '../paint/paint';
const c = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
export const Brand: React.FC<{ t: number; dur: number }> = ({ t, dur }) => {
  const endK = interpolate(t, [dur - 3, dur - 2.3], [0, 1], c);
  if (t <= 2.6) { const a = interpolate(t, [.3, .8, 2, 2.6], [0, 1, 1, 0], c);
    return <AbsoluteFill style={{ opacity: a }}><div style={{ position: 'absolute', right: 64, top: 46, display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(243,231,204,.85)', border: `1.2px solid ${SEP}` }}>
      <Img src={staticFile('brand/fathom_mark.png')} style={{ width: 44, height: 44 }} /><span style={{ fontFamily: 'IM Fell French Canon SC', fontWeight: 400, fontSize: 26, letterSpacing: 6, color: SEP }}>{BRAND.name}</span></div></AbsoluteFill>; }
  if (endK <= 0) return null;
  const drop = interpolate(t, [dur - 2.8, dur - 1.8], [-60, 0], { ...c, easing: Easing.bezier(.2, .9, .3, 1.15) }), word = interpolate(t, [dur - 2.3, dur - 1.3], [0, 1], c), tag = interpolate(t, [dur - 1.5, dur - .9], [0, 1], c);
  return <AbsoluteFill style={{ opacity: endK }}>
    <Img src={staticFile('core/paper.jpg')} style={{ position: 'absolute', inset: 0, width: 1920, height: 1080 }} />
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
      <Img src={staticFile('brand/fathom_mark.png')} style={{ width: 300, height: 300, translate: `0 ${drop}px` }} />
      <div style={{ fontFamily: 'IM Fell French Canon SC', fontWeight: 400, fontSize: 96, letterSpacing: 23, paddingLeft: 23, color: SEP, clipPath: `inset(0 ${100 - word * 100}% 0 0)` }}>{BRAND.name}</div>
      <div style={{ width: 520 * word, height: 4, background: 'linear-gradient(90deg,#F7E3A0,#D9AE4C 40%,#F3D88E 60%,#B8862B)' }} />
      <div style={{ fontFamily: 'IM Fell French Canon SC', fontSize: 30, letterSpacing: 3, color: SEP, opacity: tag }}>{BRAND.tagline}</div>
    </AbsoluteFill>
    <Img src={staticFile('core/fibres.jpg')} style={{ position: 'absolute', inset: 0, width: 1920, height: 1080, mixBlendMode: 'multiply' }} />
  </AbsoluteFill>;
};
