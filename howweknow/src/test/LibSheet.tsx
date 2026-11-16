// QA contact sheet of ONE film's own drawings (src/lib/<slug>/): every ART component on a grid, ink-on during the first second, then held.
// npx remotion still LibSheet out/<slug>_lib.jpg --props='{"slug":"<slug>","page":0}' --frame=40   (9 per page)
// A component draws at its SAMPLE props if the module exports SAMPLE[name] (in a 600×340 cell, origin top-left), else at {x:300,y:250,s:220}.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PaintDefs } from '../paint/paint';
import { PaperSheet, PaperFibres } from '../paint/world';
import { LIB_EP } from '../lib';
export const LibSheet: React.FC<{ slug: string; page?: number }> = ({ slug, page = 0 }) => {
  const f = useCurrentFrame(), m = LIB_EP[slug] || { ART: {} }, names = Object.keys(m.ART).slice(page * 9, page * 9 + 9), draw = Math.min(1, f / 30 + .001);
  return <AbsoluteFill><PaintDefs boil={Math.floor(f / 4) % 3} /><PaperSheet />
    {names.map((n, i) => { const C = m.ART[n], p = (m.SAMPLE || {})[n] || { x: 300, y: 250, s: 220 }, cx = (i % 3) * 640 + 20, cy = Math.floor(i / 3) * 360;
      return <svg key={n} width={600} height={340} viewBox="0 0 600 340" style={{ position: 'absolute', left: cx, top: cy, overflow: 'hidden' }}>
        <C {...p} draw={draw} flicker={f / 30} /><text x={10} y={330} fontFamily="IM Fell English" fontStyle="italic" fontSize={20} fill="#2B1D12">{n}</text></svg>; })}
    <PaperFibres /></AbsoluteFill>;
};
