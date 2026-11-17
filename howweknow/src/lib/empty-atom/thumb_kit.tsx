// Thumbnail type: heavy outlined poster lines in SVG (stroke painted under the fill, so the letters stay fat and clean at 168 px).
import React from 'react';

export type TLine = { t: string; size: number; fill: string; dx?: number; font?: string; ls?: number };
export const BigTitle: React.FC<{ x: number; y: number; lines: TLine[]; font: string; stroke?: string; sw?: number; shadow?: boolean; anchor?: 'start' | 'middle' | 'end'; gap?: number; rot?: number }> =
  ({ x, y, lines, font, stroke = '#120a04', sw = 12, shadow = true, anchor = 'start', gap = .9, rot = 0 }) => {
    let yy = y;
    const id = `ts${Math.round(x)}${Math.round(y)}`;
    return <svg width={1280} height={720} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs><filter id={id} x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#000" floodOpacity=".75" /></filter></defs>
      <g transform={`rotate(${rot} ${x} ${y})`} filter={shadow ? `url(#${id})` : undefined}>
        {lines.map((l, i) => { yy += l.size * (i ? gap : .8);
          return <text key={i} x={x + (l.dx ?? 0)} y={yy} textAnchor={anchor} fontFamily={l.font ?? font} fontSize={l.size} letterSpacing={l.ls ?? 0}
            fill={l.fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" paintOrder="stroke">{l.t}</text>; })}
      </g>
    </svg>;
  };

export const seeded = (n: number) => { let s = n; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
