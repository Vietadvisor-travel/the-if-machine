import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FONT, P } from './style';
// the case-file thread: a small tag top-left, the current clue lit; corner brackets frame the film
export const ClueTag: React.FC<{ n: number; of?: number; label?: string }> = ({ n, of = 4, label }) => {
  const f = useCurrentFrame(), a = interpolate(f, [8, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: a }}>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <g stroke={P.cream} strokeOpacity={0.3} strokeWidth={2} fill="none"><path d="M44 96 V44 H96" /><path d="M1824 44 H1876 V96" /><path d="M44 984 V1036 H96" /><path d="M1824 1036 H1876 V984" /></g>
      </svg>
      <div style={{ position: 'absolute', left: 74, top: 62, display: 'flex', alignItems: 'center', gap: 14, fontFamily: FONT.mono, fontSize: 18, letterSpacing: 5, color: P.amber }}>
        <span>CLUE {n}{label ? ' · ' + label : ''}</span>
        {Array.from({ length: of }, (_, i) => <span key={i} style={{ width: 14, height: 14, borderRadius: 3, background: i + 1 < n ? P.fog : i + 1 === n ? P.amber : 'transparent', border: i + 1 > n ? `1.5px solid ${P.fog}80` : 'none' }} />)}
      </div>
    </div>
  );
};
