// v8 TRACED — inks the TRUE geometry of a real object (tools/trace.py: outline · tone parts · construction lines, from a public-domain / CC0
// reference) in the house style: washed regions in the film's pigments, hatching on the shade side, the swelling ink line, drawn on with `draw`.
// It is a tool for a film's own drawing (import it in src/lib/<slug>/), not an element to place as is: the film chooses the pigments, adds
// what moves, and draws the details the trace cannot know.
import React from 'react';
import { Region, Ink, Line } from './paint';
type N = number;
export type TraceData = { w: N; h: N; outline: string[]; parts: string[]; lines: string[] };
const scale = (d: string, x: N, y: N, s: N) => d.replace(/([\d.]+) ([\d.]+)/g, (_, a, b) => `${(x + +a * s).toFixed(1)} ${(y + +b * s).toFixed(1)}`);
export const Traced: React.FC<{ data: TraceData; x: N; y: N; w: N; draw?: N; mats?: string[]; tones?: N[]; lineA?: N; sw?: N }> = ({ data, x, y, w, draw = 1, mats = ['brass'], tones = [.35, .55, .75], lineA = .7, sw = 1.4 }) => <g>
  {data.outline.map((d, i) => <Region key={'o' + i} d={scale(d, x, y, w)} mat={mats[i % mats.length]} t={tones[0]} draw={draw} sw={sw} />)}
  {data.parts.map((d, i) => <Region key={'p' + i} d={scale(d, x, y, w)} mat={mats[i % mats.length]} t={tones[Math.min(tones.length - 1, 1 + (i % 2))]} draw={draw} sw={sw * .6} rim={false} />)}
  {data.lines.map((d, i) => <Line key={'l' + i} d={scale(d, x, y, w)} w={sw * .55} a={lineA * draw} />)}
  {data.outline.map((d, i) => <Ink key={'i' + i} d={scale(d, x, y, w)} w={sw} draw={draw} />)}
</g>;
