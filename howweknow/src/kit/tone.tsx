// The palette applied to REAL stock, so photos/footage/maps from Muse sit in the same world as the drawings.
// CSS: filter: url(#tone-night) etc. (SVG filters defined once per frame).
import React from 'react';
const duo = (id: string, lo: number[], hi: number[], mid?: number[]) => (
  <filter id={id} colorInterpolationFilters="sRGB"><feColorMatrix type="saturate" values="0" />
    <feComponentTransfer>{(['R', 'G', 'B'] as const).map((c, i) => { const v = mid ? [lo[i], mid[i], hi[i]] : [lo[i], hi[i]]; const F = c === 'R' ? 'feFuncR' : c === 'G' ? 'feFuncG' : 'feFuncB'; return React.createElement(F, { key: c, type: 'table', tableValues: v.map(x => (x / 255).toFixed(3)).join(' ') }); })}</feComponentTransfer></filter>);
export const ToneFilters: React.FC = () => (
  <svg width={0} height={0} style={{ position: 'absolute' }}><defs>
    {duo('tone-night', [7, 11, 22], [242, 232, 210], [70, 86, 120])}
    {duo('tone-warm', [26, 18, 12], [255, 236, 200], [150, 112, 72])}
    {duo('tone-moon', [20, 20, 24], [240, 236, 226], [150, 146, 136])}
    <filter id="tone-soft" colorInterpolationFilters="sRGB"><feColorMatrix type="saturate" values="0.55" /><feComponentTransfer><feFuncR type="linear" slope="0.92" intercept="0.02" /><feFuncG type="linear" slope="0.92" intercept="0.03" /><feFuncB type="linear" slope="0.95" intercept="0.06" /></feComponentTransfer></filter>
  </defs></svg>);
// tone name → CSS filter ("none" keeps the original colours: only when the colour IS the information)
export const toneCss = (t?: string) => (t === 'none' ? undefined : `url(#tone-${t || 'night'})`);
