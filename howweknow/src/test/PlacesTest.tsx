// internal QA of the library part 2 (places & things) + people in context: scene 0 a study, 1 landscape, 2 lab + city at night
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PaintDefs } from '../paint/paint';
import * as Wd from '../paint/world';
import * as Pl from '../paint/places';
import { Person } from '../paint/people';
export const PlacesTest: React.FC = () => {
  const f = useCurrentFrame(), scene = Math.floor(f / 30) % 3, t = f / 30, draw = Math.min(1, (f % 30) / 24 + .001);
  return <AbsoluteFill><PaintDefs boil={Math.floor(f / 4) % 3} /><Wd.PaperSheet />
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      {scene === 0 && <g><rect width={1920} height={800} fill="#9A6E50" opacity={.55} /><rect y={800} width={1920} height={280} fill="#6A4430" opacity={.45} />
        <Pl.Window x={1450} y={420} w={300} h={560} floor={1080} /><Pl.Bookshelf x={330} y={800} w={460} h={640} />
        <Pl.Globe x={1760} y={620} r={110} lon={-30} /><Pl.Pendulum x={1150} y={120} len={420} flicker={t} trace={1} />
        <Pl.Chair x={820} y={940} s={300} /><Person x={760} y={940} h={520} pose="sit" costume="coat18" holds="quill" />
        <Pl.Desk x={1080} y={960} w={520} /></g>}
      {scene === 1 && <g><Wd.Sky kind="dawn" h={760} seed="dw" /><Pl.Mountains y={640} h={420} n={4} seed="m1" haze={.6} snow={.8} /><Pl.Mountains y={760} h={300} n={6} seed="m2" snow={.3} />
        <Wd.Ridge y={800} amp={20} seed="r" mat="leaf" t={.4} /><Pl.Tree x={300} y={940} h={420} seed="t1" flicker={t} /><Pl.Tree x={1600} y={960} h={480} kind="pine" seed="p1" />
        <Pl.Tree x={1760} y={980} h={360} kind="pine" seed="p2" /><Pl.Birds x={900} y={260} n={9} s={22} flicker={t} />
        <Person x={900} y={990} h={380} walk={t * .9} costume="robe" beard="full" holds="scroll" /><Person x={1150} y={990} h={360} walk={t * .9 + .5} costume="chiton" /></g>}
      {scene === 2 && <g><Wd.Sky kind="night" h={1080} seed="nt" /><Pl.City y={720} h={300} era="old" seed="c1" lights={.9} t={.55} />
        <rect y={720} width={1920} height={360} fill="#4F3020" opacity={.6} /><Pl.Glassware x={1200} y={960} s={300} boil={1} flicker={t} liquid="red" />
        <Person x={520} y={990} h={560} pose="hold" costume="labcoat" hair="bun" hairCol="#231A16" /><Person x={760} y={990} h={560} pose="point" costume="frock19" beard="full" hat="top" facing={1} /></g>}
    </svg><Wd.PaperFibres /></AbsoluteFill>;
};
