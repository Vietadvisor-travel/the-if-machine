import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Defs } from './world';
// one depth plane of the continuous world: the camera is a scale + pan around a focus point, plus fade and depth blur
export const Layer: React.FC<{ scale?: number; x?: number; y?: number; ox?: number; oy?: number; opacity?: number; blur?: number; children: React.ReactNode }> = ({ scale = 1, x = 0, y = 0, ox = 960, oy = 540, opacity = 1, blur = 0, children }) => {
  if (opacity <= 0.001) return null;
  return (
    <AbsoluteFill style={{ opacity, filter: blur > 0.2 ? `blur(${blur}px)` : undefined }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <Defs />
        <g transform={`translate(${x} ${y}) translate(${ox} ${oy}) scale(${scale}) translate(${-ox} ${-oy})`}>{children}</g>
      </svg>
    </AbsoluteFill>
  );
};
