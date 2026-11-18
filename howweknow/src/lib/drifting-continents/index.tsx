// drifting-continents — "How do we know the continents move?" — every drawing made for this film (18 Nov 2026), from Muse's kit:
// M-01 Ortelius 1570 (the atlas) · D-01 Wegener 1922 reconstructions (Pangaea's shape) · P-01 Wegener & Villumsen 1930 (costume, period only)
// · P-02 Mesosaurus (Senckenberg) and Glossopteris (Antarctica) · R-01 Eismitte 1930 (the tent) · R-02 USGS magnetic anomalies (the stripes).
// a.tsx (acts I–II) · b.tsx (acts III–V). New devices: TornNews, QuiltPangaea, RidgeTape, NailAtlantic.
import React from 'react';
import { ART_A as A, SAMPLE_A } from './a';
import { ART_B as B, SAMPLE_B } from './b';
export { THUMB, THUMB_V } from './thumb';
export const ART: Record<string, React.FC<any>> = { ...A, ...B };
export const COSTUMES: Record<string, object> = {
  wegener1912: { coat: .44, mat: 'night', t: .66, flare: .01, leg: 'night', legT: .66, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'cloth' },
  wegenerArctic: { coat: .36, mat: 'sand', t: .5, flare: .05, leg: 'stone', legT: .6, shoe: 'boot', neck: 'none', hat: 'cap', hair: 'short', sleeve: 1.2 },
  villumsen1930: { coat: .38, mat: 'wood', t: .55, flare: .06, leg: 'land', legT: .6, shoe: 'boot', neck: 'none', hat: 'cap', hair: 'short', sleeve: 1.2 },
  vine1963: { coat: 0, mat: 'cloth', t: .5, flare: .02, leg: 'stone', legT: .6, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'sky' },
  matthews1963: { coat: .44, mat: 'land', t: .55, flare: .01, leg: 'land', legT: .62, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05 },
};
export const SAMPLE: Record<string, object> = { ...SAMPLE_A, ...SAMPLE_B };
export const FULL = true;
