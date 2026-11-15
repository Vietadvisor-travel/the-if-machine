import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { SEP } from '../paint/paint';
// the case-file thread in the signature style: a small paper label top-left, the current clue in gold, the next ones as empty frames
export const ClueTag: React.FC<{ n: number; of?: number; label?: string }> = ({ n, of = 4, label }) => {
  const f = useCurrentFrame(), a = interpolate(f, [8, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 64, top: 52, opacity: a, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', background: 'rgba(243,231,204,.88)', boxShadow: '0 6px 18px rgba(0,0,0,.25)', border: `1.2px solid ${SEP}` }}>
      <span style={{ fontFamily: 'Space Mono', fontSize: 17, letterSpacing: 5, color: SEP }}>CLUE {n}{label ? ' · ' + label.toUpperCase() : ''}</span>
      {Array.from({ length: of }, (_, i) => <span key={i} style={{ width: 13, height: 13, borderRadius: 2, border: `1.2px solid ${SEP}`, background: i + 1 < n ? '#8C6E4A' : i + 1 === n ? 'linear-gradient(135deg,#F7E3A0,#D9AE4C 45%,#B8862B)' : 'transparent' }} />)}
    </div>
  );
};
