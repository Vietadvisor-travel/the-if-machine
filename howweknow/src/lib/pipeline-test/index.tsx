// pipeline-test (internal engine test, not a film): the per-film drawing mechanism — a new element + a new costume, registered by tools/lib_index.py
import React from 'react';
import { Region, Line, SEP } from '../../paint/paint';
type N = number;
// a cathedral oil lamp on a long chain, swinging (amp in degrees, period s; flicker = film time)
const SwingLamp: React.FC<{ x: N; y: N; len: N; amp?: N; period?: N; draw?: N; flicker?: N }> = ({ x, y, len, amp = 12, period = 2.4, draw = 1, flicker = 0 }) => {
  const a = amp * Math.cos(flicker * Math.PI * 2 / period) * Math.PI / 180, bx = x + Math.sin(a) * len, by = y + Math.cos(a) * len, k = len / 500;
  return <g>
    {Array.from({ length: 24 }, (_, i) => { const u = i / 24, cx = x + (bx - x) * u, cy = y + (by - y) * u; return <ellipse key={i} cx={cx} cy={cy} rx={3 * k + 1} ry={6 * k + 2} fill="none" stroke={SEP} strokeWidth={1.1} opacity={draw} transform={`rotate(${-a * 57.3} ${cx} ${cy})`} />; })}
    <g transform={`rotate(${-a * 57.3} ${bx} ${by})`}>
      <circle cx={bx} cy={by + 40 * k} r={120 * k} fill="url(#glowW)" opacity={.55 * draw} />
      {[-1, 1].map(s => <Line key={s} d={`M${bx} ${by} L${bx + s * 46 * k} ${by + 50 * k}`} w={1.2} a={draw} />)}
      <Region d={`M${bx - 56 * k} ${by + 50 * k} H${bx + 56 * k} C${bx + 50 * k} ${by + 90 * k} ${bx + 24 * k} ${by + 104 * k} ${bx} ${by + 106 * k} C${bx - 24 * k} ${by + 104 * k} ${bx - 50 * k} ${by + 90 * k} ${bx - 56 * k} ${by + 50 * k}Z`} mat="brass" t={.42} ang={30} draw={draw} sw={1.3} />
      <path d={`M${bx - 8 * k} ${by + 50 * k} Q${bx} ${by + (14 + Math.sin(flicker * 13) * 4) * k} ${bx + 8 * k} ${by + 50 * k}Z`} fill="#F6CF7A" opacity={draw} />
      <Region d={`M${bx - 10 * k} ${by + 106 * k} h${20 * k} l${-10 * k} ${18 * k}Z`} mat="brass" t={.6} draw={draw} sw={1} rim={false} />
    </g></g>;
};
export const ART: Record<string, React.FC<any>> = { PtSwingLamp: SwingLamp };
export const COSTUMES: Record<string, object> = {
  ptStudent: { coat: .4, mat: 'red', t: .62, flare: .02, leg: 'night', legT: .7, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.15, vest: 'cloth' },
};
