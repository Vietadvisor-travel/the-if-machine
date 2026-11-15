// internal QA of the people rig: every costume × several poses, and a walk cycle (frame = phase)
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PaintDefs } from '../paint/paint';
import { PaperSheet, PaperFibres } from '../paint/world';
import { Person } from '../paint/people';
const ROWS: [string, string, any][] = [
  ['chiton', 'present', { beard: 'full', hairCol: '#A8A296' }], ['robe', 'point', { beard: 'short' }], ['coat18', 'look', {}], ['frock19', 'write', { holds: 'quill', beard: 'moustache' }],
  ['labcoat', 'think', { hair: 'bun', hairCol: '#231A16', skin: .55 }], ['uniform', 'hold', { holds: 'book' }], ['suit', 'raise', { skin: .7, hairCol: '#231A16' }], ['spacesuit', 'stand', {}],
];
export const PeopleTest: React.FC = () => {
  const f = useCurrentFrame(), scene = Math.floor(f / 30) % 3;
  return <AbsoluteFill><PaintDefs boil={Math.floor(f / 4) % 3} /><PaperSheet />
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      {scene === 0 && ROWS.map(([c, p, o], i) => <Person key={i} x={130 + i * 230} y={900} h={560} costume={c} pose={p} {...o} />)}
      {scene === 1 && ['stand', 'point', 'look', 'write', 'think', 'raise', 'hold', 'sit'].map((p, i) => <Person key={i} x={130 + i * 230} y={900} h={560} costume={i % 2 ? 'coat18' : 'frock19'} pose={p} facing={i > 3 ? -1 : 1} />)}
      {scene === 2 && [0, .125, .25, .375, .5, .625, .75, .875].map((w, i) => <Person key={i} x={130 + i * 230} y={900} h={560} costume={i % 2 ? 'robe' : 'labcoat'} walk={w + (f % 30) / 30} />)}
    </svg><PaperFibres /></AbsoluteFill>;
};
