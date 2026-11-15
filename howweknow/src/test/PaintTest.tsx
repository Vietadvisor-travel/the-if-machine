// internal QA of the paint library (not a demo): 4 showcase frames at 0/1/2/3 s, ink-on during the first second of each
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PaintDefs } from '../paint/paint';
import * as Wd from '../paint/world';
export const PaintTest: React.FC = () => {
  const f = useCurrentFrame(), scene = Math.floor(f / 30) % 6, draw = Math.min(1, (f % 30) / 24 + .001), boil = Math.floor(f / 4) % 3;
  return <AbsoluteFill><PaintDefs boil={boil} /><Wd.PaperSheet />
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      {scene === 0 && <g><Wd.Sky kind="day" h={720} seed="d" /><Wd.Sun x={1300} y={110} r={46} draw={draw} />
        <Wd.Ridge y={600} amp={24} seed="r1" t={.32} draw={draw} /><Wd.Temple x={330} y={612} w={260} draw={draw} />
        {[120, 560, 700, 1520, 1640, 1780].map((x, i) => <Wd.Palm key={i} x={x} y={650 + (i % 3) * 6} h={90 + (i % 3) * 16} draw={draw} lean={i % 2 ? 1 : -1} />)}
        <Wd.Water y={650} h={44} draw={draw} /><Wd.Ridge y={742} amp={12} seed="r2" t={.14} draw={draw} />
        <Wd.Obelisk x={1180} y={880} h={540} draw={draw} /><Wd.Angle x={1180} y={294} a0={-90} a1={-82.8} r={110} label="7.2°" draw={draw} len={200} />
        <Wd.Well x={520} y={930} r={110} draw={draw} /><Wd.Scholar x={720} y={965} h={230} pose="point" draw={draw} /></g>}
      {scene === 1 && <g><Wd.Sky kind="space" seed="s" /><Wd.Earth cx={760} cy={560} r={400} lon={15} lat={15} draw={draw} /><Wd.Moon x={1560} y={300} r={120} phase={.7} draw={draw} />
        <Wd.GoldBeam x1={1080} y1={420} x2={1460} y2={320} k={draw} /></g>}
      {scene === 2 && <g><rect width={1920} height={1080} fill="#6A4430" opacity={.9} /><Wd.Astrolabe x={430} y={540} r={180} draw={draw} rot={f * .5} />
        <Wd.Candle x={1500} y={860} h={150} draw={draw} flicker={f / 30} /><Wd.Pinned src="tex/regolith_photo.jpg" x={1150} y={360} w={360} h={250} caption="Plate I. — the lunar surface" draw={draw} />
        <Wd.Telescope x={850} y={900} s={300} draw={draw} /><Wd.Eyepiece x={1650} y={420} r={130} src="tex/regolith_photo.jpg" draw={draw} /></g>}
      {scene === 4 && <g><Wd.Sky kind="night" seed="n" /><Wd.Ridge y={860} amp={30} seed="g" mat="leaf" t={.55} /><Wd.Observatory18 x={360} y={880} s={300} draw={draw} /><Wd.Quadrant x={700} y={760} r={220} draw={draw} />
        <Wd.Bedspring x={1150} y={900} s={300} tilt={-12} draw={draw} /><Wd.OldScreen x={1650} y={520} w={380} pulses={[.12, .74]} sweep={draw} draw={draw} /></g>}
      {scene === 5 && <g><Wd.Sky kind="space" seed="m" /><Wd.MoonGround horizon={640} draw={draw} /><Wd.Reflector x={900} y={760} s={260} flash={draw > .9 ? 1 : 0} draw={draw} /><Wd.Stopwatch x={1600} y={330} r={130} sec={2.5} draw={draw} />
        <Wd.LaserDome x={330} y={420} s={240} draw={draw} /><Wd.ShadowCone x={300} y={860} r={90} len={500} ang={-10} k={draw} /></g>}
      {scene === 3 && <g><Wd.SeaChart box={[-6, 22, 38, 46]} draw={draw} /><Wd.Rose x={330} y={850} r={130} draw={draw} /><Wd.Ship x={1440} y={560} s={180} draw={draw} /></g>}
    </svg><Wd.PaperFibres /></AbsoluteFill>;
};
