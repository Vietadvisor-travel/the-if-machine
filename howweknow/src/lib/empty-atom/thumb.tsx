// The thumbnail of "What is inside an atom?" — drawn for the thumbnail, not cut from the film (owner 17 Nov 2026: "wow hơn, chất hơn,
// bố cục và visual như thumbnail thật sự"). One idea readable at 168 px: a beam of alpha particles pours through a vast, empty gold atom —
// and ONE red track comes flying back at you. Title: three words. Faces: IM Fell French Canon SC (title), IM Fell English SC (kicker),
// La Belle Aurore (the hand note). 1280×720.
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { BigTitle } from './thumb_kit';

const CX = 870, CY = 372, R = 300;   // the atom
const HX = 520, HY = CY + 250;   // where the returning particle is caught, flying out at the viewer
// the returning track as a filled, tapering ribbon along a cubic from the nucleus to (HX, HY)
const TRACK = (() => {
  const P = [[CX - 24, CY + 2], [CX - 120, CY + 30], [CX - 250, CY + 120], [HX, HY]], n = 40, L: number[][] = [], Rt: number[][] = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n, u = 1 - t, b = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    const x = b.reduce((s, w, j) => s + w * P[j][0], 0), y = b.reduce((s, w, j) => s + w * P[j][1], 0);
    const db = [-3 * u * u, 3 * u * u - 6 * u * t, 6 * u * t - 3 * t * t, 3 * t * t];
    const dx = db.reduce((s, w, j) => s + w * P[j][0], 0), dy = db.reduce((s, w, j) => s + w * P[j][1], 0), m = Math.hypot(dx, dy) || 1, w = 1.5 + 11 * t * t;
    L.push([x - dy / m * w, y + dx / m * w]); Rt.push([x + dy / m * w, y - dx / m * w]);
  }
  return 'M' + [...L, ...Rt.reverse()].map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L') + ' Z';
})();
const seeded = (n: number) => { let s = n; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

export const Back: React.FC<{ title?: string; kicker?: string; note?: string }> = ({ title = 'It came *back.*', kicker = 'Manchester · 1909', note = '1 in 8,000' }) => {
  const r = seeded(11);
  // beams: most go straight through the emptiness, a few are nudged (deflection grows as they pass closer to the nucleus)
  const beams = Array.from({ length: 23 }, (_, i) => {
    const y = CY - 250 + i * 22.7 + (r() - .5) * 6, b = y - CY, near = Math.abs(b) < 14;
    if (near) return null;
    const bend = Math.sign(b) * Math.min(150, 2600 / Math.max(18, Math.abs(b)));
    return { d: `M -20 ${y.toFixed(1)} L ${CX - 40} ${y.toFixed(1)} Q ${CX + 30} ${y.toFixed(1)} 1300 ${(y + bend).toFixed(1)}`, w: 1.6 + r() * 1.2, a: .35 + r() * .35 };
  }).filter(Boolean) as { d: string; w: number; a: number }[];
  const dots = Array.from({ length: 70 }, () => { const t = r() * Math.PI * 2, rr = R * (.92 + r() * .1); return [CX + Math.cos(t) * rr, CY + Math.sin(t) * rr, .6 + r() * 1.6]; });
    return <AbsoluteFill style={{ background: '#110c08', overflow: 'hidden' }}>
    {/* paper + engraving: a dark printed sheet, warm light from the atom */}
    <Img src={staticFile('core/paper.jpg')} style={{ position: 'absolute', inset: 0, width: 1280, height: 720, objectFit: 'cover', opacity: .16, mixBlendMode: 'screen' }} />
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id="warm" cx={CX / 1280} cy={CY / 720} r=".62"><stop offset="0" stopColor="#6b4a1e" stopOpacity=".95" /><stop offset=".45" stopColor="#3a2610" stopOpacity=".55" /><stop offset="1" stopColor="#110c08" stopOpacity="0" /></radialGradient>
        <radialGradient id="core"><stop offset="0" stopColor="#fff7d6" /><stop offset=".18" stopColor="#ffd56a" /><stop offset=".5" stopColor="#e2a53a" stopOpacity=".55" /><stop offset="1" stopColor="#e2a53a" stopOpacity="0" /></radialGradient>
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)"><line x1="0" y1="0" x2="0" y2="7" stroke="#e8c47a" strokeWidth=".7" /></pattern>
        <mask id="shellM"><circle cx={CX} cy={CY} r={R + 34} fill="#fff" /><circle cx={CX} cy={CY} r={R - 6} fill="#000" /></mask>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="bigglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
        <radialGradient id="sphere" cx=".42" cy=".38" r=".62"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset=".78" stopColor="#c9953e" stopOpacity=".05" /><stop offset=".95" stopColor="#e8c47a" stopOpacity=".2" /><stop offset="1" stopColor="#e8c47a" stopOpacity=".05" /></radialGradient>
        <linearGradient id="trackHi" x1={CX} y1={CY} x2={HX} y2={HY} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset=".5" stopColor="#fff" stopOpacity=".15" /><stop offset="1" stopColor="#fff" stopOpacity=".35" /></linearGradient>
        <linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stopColor="#110c08" stopOpacity=".96" /><stop offset=".36" stopColor="#110c08" stopOpacity=".78" /><stop offset=".55" stopColor="#110c08" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#warm)" />
      {/* the atom: an engraved, hatched shell of electron haze — vast and empty inside */}
      <circle cx={CX} cy={CY} r={R + 30} fill="url(#hatch)" opacity=".18" mask="url(#shellM)" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e8c47a" strokeOpacity=".55" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx={CX} cy={CY} r={R * .62} fill="none" stroke="#e8c47a" strokeOpacity=".16" strokeWidth="1.2" strokeDasharray="1 10" />
      {dots.map(([x, y, s], i) => <circle key={i} cx={x} cy={y} r={s} fill="#f3d98a" opacity=".75" />)}
      {/* a glassy sphere of electron haze: lit rim, dark empty heart */}
      <circle cx={CX} cy={CY} r={R} fill="url(#sphere)" />
      {/* the beam pours through: tracks + the particles riding them */}
      {beams.map((b, i) => <path key={i} d={b.d} fill="none" stroke="#f3d98a" strokeOpacity={b.a} strokeWidth={b.w} strokeLinecap="round" />)}
      {beams.map((b, i) => <path key={'p' + i} d={b.d} fill="none" stroke="#fff3c4" strokeWidth={b.w + 3.2} strokeLinecap="round" pathLength={100}
        strokeDasharray={`0.01 ${18 + (i % 5) * 4}`} strokeDashoffset={-(i * 7) % 23} filter="url(#glow)" opacity=".9" />)}
      {/* the nucleus: tiny, heavy, blazing */}
      <circle cx={CX} cy={CY} r="110" fill="url(#core)" opacity=".9" />
      <circle cx={CX} cy={CY} r="13" fill="#fff4cf" filter="url(#glow)" />
      {/* THE one that came back: in along the axis, thrown straight back out toward the viewer */}
      <path d={`M -20 ${CY - 2} L ${CX - 26} ${CY - 2}`} fill="none" stroke="#f3d98a" strokeOpacity=".7" strokeWidth="2.6" />
      {/* tapered: thin at the nucleus, swelling as it flies out toward the viewer */}
      <path d={TRACK} fill="#ff4a33" filter="url(#bigglow)" opacity=".8" />
      <path d={TRACK} fill="#ff5a3c" />
      <path d={TRACK} fill="url(#trackHi)" opacity=".7" />
      <circle cx={HX} cy={HY} r="58" fill="#ff5a3c" opacity=".7" filter="url(#bigglow)" />
      <circle cx={HX} cy={HY} r="26" fill="#ff6a45" />
      <circle cx={HX} cy={HY} r="15" fill="#fff6e8" filter="url(#glow)" />
      {/* the impact flash + sparks */}
      <circle cx={CX - 22} cy={CY} r="34" fill="#ffefc4" opacity=".55" filter="url(#bigglow)" />
      {Array.from({ length: 9 }, (_, i) => { const t = -Math.PI * .95 + i * .23, a = 20 + (i % 3) * 9, b = a + 16 + (i % 2) * 14;
        return <line key={i} x1={CX - 22 + Math.cos(t) * a} y1={CY + Math.sin(t) * a} x2={CX - 22 + Math.cos(t) * b} y2={CY + Math.sin(t) * b} stroke="#fff0c8" strokeWidth="2.4" strokeLinecap="round" opacity=".85" />; })}
      {/* a red ink ring, hand-drawn, round the moment */}
      <path d={`M ${CX - 70} ${CY - 46} C ${CX - 20} ${CY - 78}, ${CX + 52} ${CY - 50}, ${CX + 46} ${CY + 4} C ${CX + 40} ${CY + 60}, ${CX - 40} ${CY + 70}, ${CX - 74} ${CY + 30} C ${CX - 96} ${CY + 4}, ${CX - 84} ${CY - 30}, ${CX - 56} ${CY - 52}`} fill="none" stroke="#ff5a3c" strokeWidth="4.5" strokeLinecap="round" opacity=".95" />
      <rect width="1280" height="720" fill="url(#fadeL)" />
      {/* vignette */}
      <radialGradient id="vig" cx=".55" cy=".5" r=".75"><stop offset=".6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".7" /></radialGradient>
      <rect width="1280" height="720" fill="url(#vig)" />
    </svg>
    <Img src={staticFile('core/fibres.jpg')} style={{ position: 'absolute', inset: 0, width: 1280, height: 720, objectFit: 'cover', opacity: .12, mixBlendMode: 'overlay' }} />
    {/* words: big, heavy, outlined (owner: "chữ to cần dầy hơn và to hơn") */}
    <div style={{ position: 'absolute', left: 52, top: 70, fontFamily: 'IM Fell English SC', fontSize: 36, letterSpacing: 6, color: '#7fd3e6', textShadow: '0 2px 10px #000' }}>{kicker}</div>
    <BigTitle x={46} y={120} lines={[{ t: 'IT CAME', size: 150, fill: '#fbf1d8' }, { t: 'BACK!', size: 232, fill: '#ff4f33' }]} font="IM Fell French Canon SC" stroke="#140b05" sw={14} />
    <div style={{ position: 'absolute', left: 566, top: 640, fontFamily: 'La Belle Aurore', fontSize: 50, color: '#ffd9a0', transform: 'rotate(-6deg)', textShadow: '0 2px 10px rgba(0,0,0,.9)' }}>{note}</div>
    <Img src={staticFile('brand/fathom_mark.png')} style={{ position: 'absolute', right: 26, bottom: 22, width: 78, height: 78, opacity: .95 }} />
  </AbsoluteFill>;
};

import { Stadium, Shell, Wrong } from './thumb_more';
// four designs (owner picks one; episode.json thumb.v): A · It came back · B · Mostly empty (stadium) · C · Impossible (the shell) · D · What's really inside (1904 vs 1911)
export const THUMB: React.FC<any> = (p) => p.v === 'B' ? <Stadium /> : p.v === 'C' ? <Shell /> : p.v === 'D' ? <Wrong /> : <Back {...p} />;
