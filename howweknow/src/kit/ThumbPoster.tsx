// FATHOM thumbnail standard (owner 17 Nov 2026, chose design F: "kiểu dạng như thế ok… title thể hiện được nội dung chính, nền ấn tượng hơn").
// A lamp-lit, engraved dark scene in the channel's pigments; the film's HERO object large on the right (≈ 55 % of the frame) holding the
// story's key moment; on the left the film's BIG QUESTION in heavy gold type (Special Elite, ≤ 4 words), a kicker (place · year, IM Fell
// English SC), and ONE handwritten line (La Belle Aurore) with the twist or the number. One vermilion ink ring lives in the hero.
// Each film supplies `hero` (and optionally `back`, its own background furniture) from src/lib/<slug>/thumb.tsx. 1280×720.
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

export const TONE = { ink: '#2B1D12', sepia: '#5A3A22', cream: '#FBF4E2', gold: ['#F3D98A', '#D4A846', '#8A6420'], verm: '#B8432A', indigo: ['#7FA8C4', '#2E5C86', '#1D3557'] };
const seeded = (n: number) => { let s = n; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

export type PosterProps = { kicker: string; title: string[]; accent?: number; note: string; hero: React.ReactNode; back?: React.ReactNode; lamp?: [number, number] };

export const ThumbPoster: React.FC<PosterProps> = ({ kicker, title, accent = -1, note, hero, back, lamp = [900, 330] }) => {
  const r = seeded(7), [lx, ly] = lamp;
  const big = title.length <= 2 ? 150 : title.length === 3 ? 122 : 104;
  return <AbsoluteFill style={{ overflow: 'hidden', background: '#140d07' }}>
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id="tpLamp" cx={lx / 1280} cy={ly / 720} r=".75"><stop offset="0" stopColor="#8a5a2c" stopOpacity=".95" /><stop offset=".35" stopColor="#4a2e16" stopOpacity=".85" /><stop offset=".75" stopColor="#1e130a" /><stop offset="1" stopColor="#0d0805" /></radialGradient>
        <linearGradient id="tpRay" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffdca0" stopOpacity=".22" /><stop offset="1" stopColor="#ffdca0" stopOpacity="0" /></linearGradient>
        <pattern id="tpHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line x1="0" y1="0" x2="0" y2="5" stroke="#000" strokeWidth="1.1" /></pattern>
        <pattern id="tpCross" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-52)"><line x1="0" y1="0" x2="0" y2="9" stroke="#000" strokeWidth="1" /></pattern>
        <radialGradient id="tpVig" cx=".6" cy=".5" r=".72"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".78" /></radialGradient>
        <linearGradient id="tpLeft" x1="0" x2="1"><stop offset="0" stopColor="#0d0805" stopOpacity=".85" /><stop offset=".42" stopColor="#0d0805" stopOpacity=".35" /><stop offset=".6" stopColor="#0d0805" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#tpLamp)" />
      {/* light falling in from the lamp above: three soft shafts */}
      {[[-160, 0], [-40, 40], [90, 20]].map(([dx, w], i) => <polygon key={i} points={`${lx + dx - 30},-20 ${lx + dx + 40 + w},-20 ${lx + dx + 260 + w},740 ${lx + dx + 60},740`} fill="url(#tpRay)" />)}
      {back}
      {/* engraving: hatching deepens away from the light */}
      <rect width="1280" height="720" fill="url(#tpHatch)" opacity=".2" />
      <rect width="1280" height="720" fill="url(#tpCross)" opacity=".1" />
      {/* motes in the lamplight */}
      {Array.from({ length: 46 }, (_, i) => { const x = lx - 420 + r() * 760, y = r() * 720; return <circle key={i} cx={x} cy={y} r={.8 + r() * 1.8} fill="#ffe2b0" opacity={.15 + r() * .45} />; })}
      <rect width="1280" height="720" fill="url(#tpLeft)" />
    </svg>
    {hero}
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}><rect width="1280" height="720" fill="url(#tpVig)" /></svg>
    <Img src={staticFile('core/fibres.jpg')} style={{ position: 'absolute', inset: 0, width: 1280, height: 720, objectFit: 'cover', opacity: .13, mixBlendMode: 'screen' }} />
    {/* words */}
    <div style={{ position: 'absolute', left: 50, top: 56, fontFamily: 'IM Fell English SC', fontSize: 34, letterSpacing: 6, color: TONE.gold[0], textShadow: '0 2px 8px #000' }}>{kicker}</div>
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs><filter id="tpSh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity=".85" /></filter>
        <linearGradient id="tpLeaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff2c0" /><stop offset=".45" stopColor={TONE.gold[0]} /><stop offset=".8" stopColor={TONE.gold[1]} /><stop offset="1" stopColor="#e9c36a" /></linearGradient></defs>
      <g filter="url(#tpSh)">{title.map((t, i) => <text key={i} x={44} y={100 + big * (i + 1) * .98} fontFamily="Special Elite" fontSize={i === accent ? big * 1.12 : big}
        fill={i === accent ? TONE.cream : 'url(#tpLeaf)'} stroke="#120a04" strokeWidth={13} strokeLinejoin="round" paintOrder="stroke">{t}</text>)}</g>
    </svg>
    <div style={{ position: 'absolute', left: 58, top: 112 + big * title.length * .98 + 26, fontFamily: 'La Belle Aurore', fontSize: 62, color: TONE.cream, transform: 'rotate(-4deg)', transformOrigin: 'left', textShadow: '0 3px 12px #000' }}>{note}</div>
    <Img src={staticFile('brand/fathom_mark.png')} style={{ position: 'absolute', right: 22, bottom: 18, width: 74, height: 74 }} />
  </AbsoluteFill>;
};
