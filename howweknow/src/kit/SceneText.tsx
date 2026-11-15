// In-scene TYPE (owner, 15 Nov 2026: no subtitles — words live IN the picture, where they belong, in the style's own type).
// Faces: IM Fell English (the 17th-c. Fell types of Oxford — engraved-book print), its small caps, Pinyon Script (a copperplate hand).
// styles:  title  — small-caps heading with a ruled line and fleurons (a chapter/clue opening)       ·  plate — italic figure caption under a thing
//          note   — a handwritten line, written on left→right (margin notes, sums, a name on a map)  ·  label — italic name + a leader line to `to`
//          figure — a big engraved number in gold leaf with an ink edge (the one key quantity)        ·  stamp — red-ink small caps in a double frame
// k 0..1 = how much is written/revealed (key it from 0 to bring words in). light = cream type for dark scenes.
import React from 'react';
export type TextS = { text: string; style?: string; x: number; y: number; size?: number; k?: number; rot?: number; align?: 'left' | 'center' | 'right'; light?: boolean; col?: string; width?: number; to?: [number, number] | null };
const INK = '#2B1D12', CREAM = '#FBF1D8', RED = '#9A3424';
const Chars: React.FC<{ t: string; k: number; rise?: number; cs?: React.CSSProperties }> = ({ t, k, rise = 6, cs }) => <>{[...t].map((c, i, a) => { const p = Math.max(0, Math.min(1, k * (a.length + 4) - i)); return <span key={i} style={{ opacity: p, display: 'inline-block', transform: `translateY(${(1 - p) * rise}px)`, whiteSpace: 'pre', ...cs }}>{c}</span>; })}</>;
export const SceneText: React.FC<TextS & { a?: number }> = ({ text, style = 'plate', x, y, size, k = 1, rot = 0, align = 'center', light, col, width = 1100, to, a = 1 }) => {
  const ink = col || (light ? CREAM : INK), halo = light ? '0 0 10px rgba(20,12,6,.75), 0 1px 2px rgba(20,12,6,.8)' : '0 0 8px rgba(251,241,216,.55)';
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  const box: React.CSSProperties = { position: 'absolute', left: x, top: y, width, marginLeft: align === 'center' ? -width / 2 : align === 'right' ? -width : 0, textAlign: align, transform: `translateY(-50%) rotate(${rot}deg)`, color: ink, textShadow: halo, opacity: a };
  if (style === 'title') { const sz = size ?? 54;
    return <div style={box}><div style={{ fontFamily: 'IM Fell English SC', fontSize: sz, letterSpacing: sz * .12, lineHeight: 1.1 }}><Chars t={text} k={k} /></div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: align === 'left' ? 'flex-start' : 'center', gap: 14, marginTop: 10, opacity: Math.min(1, k * 2) }}>
        <span style={{ height: 1.5, width: 220 * Math.min(1, k * 1.4), background: ink }} /><span style={{ fontFamily: 'IM Fell English', fontSize: sz * .5 }}>❦</span><span style={{ height: 1.5, width: 220 * Math.min(1, k * 1.4), background: ink }} /></div></div>; }
  if (style === 'note') { const sz = size ?? 52, m = `linear-gradient(90deg, #000 ${k * 108 - 8}%, transparent ${k * 108}%)`;
    return <div style={{ ...box, fontFamily: 'Pinyon Script', fontSize: sz, lineHeight: 1.15, color: col || (light ? CREAM : '#3A2414'), WebkitMaskImage: m, maskImage: m }}>{text}</div>; }
  if (style === 'figure') { const sz = size ?? 150;
    return <div style={{ ...box, fontFamily: 'IM Fell English', fontSize: sz, lineHeight: 1, textShadow: 'none' }}>
      <Chars t={text} k={k} rise={14} cs={{ background: 'linear-gradient(160deg,#F7E3A0,#D9AE4C 40%,#F3D88E 55%,#B8862B 80%,#E6C266)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextStroke: `1.4px ${INK}`, filter: 'drop-shadow(2px 3px 0 rgba(20,12,6,.45))' }} /></div>; }
  if (style === 'stamp') { const sz = size ?? 40, p = Math.min(1, k * 1.5);
    return <div style={{ ...box, width: 'auto', marginLeft: 0, transform: `translate(${tx}, -50%) rotate(${rot || -6}deg) scale(${1.25 - .25 * p})`, opacity: p * a }}>
      <div style={{ display: 'inline-block', padding: '8px 22px', border: `3px double ${col || (light ? '#E0866A' : RED)}`, color: col || (light ? '#E0866A' : RED), fontFamily: 'IM Fell English SC', fontSize: sz, letterSpacing: sz * .1, textShadow: 'none', mixBlendMode: light ? 'normal' : 'multiply', background: light ? 'rgba(251,241,216,.08)' : 'none' }}>{text}</div></div>; }
  if (style === 'label') { const sz = size ?? 34;
    return <><div style={{ ...box, fontFamily: 'IM Fell English', fontStyle: 'italic', fontSize: sz }}><Chars t={text} k={k} /></div>
      {to && <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, opacity: a * Math.min(1, k * 1.5) }}><path d={`M${x + (align === 'left' ? -10 : align === 'right' ? 10 : 0)} ${y + sz * .45} L${x + (to[0] - x) * Math.min(1, k * 1.3)} ${y + sz * .45 + (to[1] - y - sz * .45) * Math.min(1, k * 1.3)}`} stroke={ink} strokeWidth={1.4} fill="none" />{k > .7 && <circle cx={to[0]} cy={to[1]} r={4} fill={ink} />}</svg>}</>; }
  const sz = size ?? 32;   // plate
  return <div style={{ ...box, fontFamily: 'IM Fell English', fontStyle: 'italic', fontSize: sz, lineHeight: 1.25 }}><Chars t={text} k={k} rise={3} /></div>;
};
