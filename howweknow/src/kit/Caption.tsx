import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT } from './style';
export type Line = { i: number; text: string; start: number; dur: number };
// one caption line at a time, low on the frame, soft fade; never more than two lines of text
export const Captions: React.FC<{ lines: Line[] }> = ({ lines }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig(), t = f / fps;
  const L = lines.find(l => t >= l.start - 0.1 && t < l.start + l.dur + 0.25); if (!L) return null;
  const a = Math.min(interpolate(t, [L.start - 0.1, L.start + 0.15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), interpolate(t, [L.start + L.dur, L.start + L.dur + 0.25], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return <div style={{ position: 'absolute', left: 260, right: 260, bottom: 74, textAlign: 'center', opacity: a, fontFamily: FONT.body, fontWeight: 600, fontSize: 38, lineHeight: 1.3, color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,.65), 0 0 2px rgba(0,0,0,.6)' }}>{L.text}</div>;
};
