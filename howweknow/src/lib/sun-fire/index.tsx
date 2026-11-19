// sun-fire — "What makes the Sun shine?" — every drawing made for this film (19 Nov 2026), from Muse's kit (Drive _hwk/sun-fire/):
// D-01 Eddington 1920 address (PD) · P-01 Homestake chlorine tank (US DOE, PD) · P-02 SNO detector (CC BY 4.0, SNO+) · P-03 portraits (PD)
// · R-01 Victorian library interiors · R-03 Homestake shaft/headframe (reference) · E-01 Scheiner viewing sunspots 1625 (PD engraving).
// a.tsx (acts I–III: the candle, the coal Sun, Kelvin's squeeze, the rocks, Aston's balance, Cardiff) · b.tsx (acts III–V: the core, the
// dancers, the neutrino, the mine, the thirty-year wall, Sudbury, the furnace). New devices: CoalSun, AtomBalance, ProtonDance, ThreeDoors, CountWall.
import React from 'react';
import { ART_A as A, SAMPLE_A } from './a';
import { ART_B as B, SAMPLE_B } from './b';
export { THUMB, THUMB_V } from './thumb';
export const ART: Record<string, React.FC<any>> = { ...A, ...B };
export const COSTUMES: Record<string, object> = {
  kelvin1860: { coat: .46, mat: 'night', t: .7, flare: .02, leg: 'night', legT: .7, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'cloth' },
  aston1920: { coat: .42, mat: 'stone', t: .6, flare: .01, leg: 'stone', legT: .62, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'cloth' },
  eddington1920: { coat: .44, mat: 'wood', t: .55, flare: .01, leg: 'night', legT: .66, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'night' },
  bethe1939: { coat: .4, mat: 'cloth', t: .55, flare: .02, leg: 'stone', legT: .6, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05 },
  davis1965: { coat: .36, mat: 'sand', t: .5, flare: .04, leg: 'night', legT: .6, shoe: 'boot', neck: 'none', hat: 'helmet', hair: 'short', sleeve: 1.1 },
  davisDesk: { coat: 0, mat: 'cloth', t: .5, flare: .02, leg: 'night', legT: .6, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'sky' },
};
export const SAMPLE: Record<string, object> = { ...SAMPLE_A, ...SAMPLE_B };
export const FULL = true;
