import React from 'react';
import { useCurrentFrame } from 'remotion';
import { W, H } from './style';
// film grain (re-seeded every 2 frames so it lives) + vignette: drawn over every frame
export const Finish: React.FC<{ grain?: number; vignette?: number }> = ({ grain = 0.07, vignette = 0.55 }) => {
  const f = useCurrentFrame(), seed = Math.floor(f / 2) % 97;
  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <filter id={`gr${seed}`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} /><feColorMatrix values={`0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 ${grain} 0`} /></filter>
        <radialGradient id="vig" cx=".5" cy=".5" r=".72"><stop offset=".55" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={vignette} /></radialGradient>
      </defs>
      <rect width={W} height={H} filter={`url(#gr${seed})`} style={{ mixBlendMode: 'overlay' }} />
      <rect width={W} height={H} fill="url(#vig)" />
    </svg>
  );
};
