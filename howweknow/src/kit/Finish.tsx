import React from 'react';
import { AbsoluteFill, random, staticFile, useCurrentFrame } from 'remotion';
// film grain (4 pre-made noise tiles, shifted every 2 frames — cheap) + vignette, over every frame
export const Finish: React.FC<{ grain?: number; vignette?: number }> = ({ grain = 0.09, vignette = 0.55 }) => {
  const f = Math.floor(useCurrentFrame() / 2), i = f % 4, ox = Math.floor(random('gx' + f) * 512), oy = Math.floor(random('gy' + f) * 512);
  return (
    <>
      <AbsoluteFill style={{ backgroundImage: `url(${staticFile(`core/grain_${i}.png`)})`, backgroundPosition: `${ox}px ${oy}px`, mixBlendMode: 'overlay', opacity: grain * 4 }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,${vignette}) 100%)` }} />
    </>
  );
};
