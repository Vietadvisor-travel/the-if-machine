import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT } from './style';
export type Line = { i: number; text: string; start: number; dur: number };
// one caption line at a time, low on the frame, soft fade; never more than two lines of text
export const Captions: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig(), t = f / fps;
  const L = lines.find(l => t >= l.start - 0.1 && t < l.start + l.dur + 0.25); if (!L) return null;
  const a = Math.min(interpolate(t, [L.start - 0.1, L.start + 0.15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), interpolate(t, [L.start + L.dur, L.start + L.dur + 0.25], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  // an ink ribbon under cream type: reads on light paper, on night skies and on photos alike (owner: captions must always read)
  return <div style={{ position: 'absolute', left: 200, right: 200, bottom: 64, display: 'flex', justifyContent: 'center', opacity: a }}>
    <div style={{ maxWidth: 1400, padding: '10px 26px 12px', borderRadius: 6, background: 'rgba(30,20,12,.66)', boxShadow: '0 0 22px 8px rgba(30,20,12,.28)', textAlign: 'center',
      fontFamily: FONT.body, fontWeight: 600, fontSize: 36, lineHeight: 1.32, color: '#FBF1D8', letterSpacing: .2 }}>{L.text.replace(/\*/g, '')}</div></div>;
};
