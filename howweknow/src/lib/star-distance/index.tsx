// star-distance — "How far away are the stars?" — every drawing made for this film (owner, 15 Nov 2026), from Muse's references:
// R-02 the Königsberg heliometer (two views) · R-05 Bessel's study at the Königsberg observatory · R-01 the Harvard plate rooms (1890–1913) ·
// R-03 + P-04 the 100-inch Hooker telescope and its dome · P-01 plate H335H (VAR!) · P-03 a Leavitt plate · P-10 (_ref) Gaia · M-01 the Swan ·
// X-01 Leavitt's 25 Cepheids and X-02 Hubble's 1929 table drawn TRUE to the data. Portraits P-05 Bessel, P-02 Leavitt, P-04-x1 Hubble,
// P-09 Shapley and Curtis (costume and period, never a copy). Style core only. The drawings live in a.tsx (act I), b.tsx (act II), c.tsx (act III).
import React from 'react';
import { ART_A as A } from './a';
import { ART_B as B } from './b';
import { ART_C as C } from './c';
export { THUMB, THUMB_V } from './thumb';
export const ART: Record<string, React.FC<any>> = {
  NightWindow: A.NightWindow,
  ThumbHand: A.ThumbHand,
  BlinkEye: A.BlinkEye,
  StarCabinet: A.StarCabinet,
  ScopeField: A.ScopeField,
  CandleAndLighthouse: A.CandleAndLighthouse,
  OrbitTriangle: A.OrbitTriangle,
  ParallaxField: A.ParallaxField,
  TelescopeRow: A.TelescopeRow,
  ArcDial: A.ArcDial,
  KoenigsbergDome: A.KoenigsbergDome,
  Heliometer: A.Heliometer,
  SplitField: A.SplitField,
  CygniCrawl: A.CygniCrawl,
  CoinFarHill: A.CoinFarHill,
  LightBobbin: A.LightBobbin,
  PaperBoat: A.PaperBoat,
  StarSea: A.StarSea,
  GlobeStand: A.GlobeStand,
  MilkyWayBand: B.MilkyWayBand,
  GlassPlateSky: B.GlassPlateSky,
  HarvardPlateRoom: B.HarvardPlateRoom,
  BreathingField: B.BreathingField,
  LeavittGraph: B.LeavittGraph,
  LightRuler: B.LightRuler,
  CandleRoad: B.CandleRoad,
  SpiralNebula: C.SpiralNebula,
  DebateHall: C.DebateHall,
  HookerDome: C.HookerDome,
  LightTable: C.LightTable,
  AndromedaEngraving: C.AndromedaEngraving,
  GalaxyStorm: C.GalaxyStorm,
  SpectrumStrip: C.SpectrumStrip,
  TrainWhistle: C.TrainWhistle,
  RisingLoaf: C.RisingLoaf,
  LemaitreDesk: C.LemaitreDesk,
  HubbleDiagram: C.HubbleDiagram,
  GaiaProbe: C.GaiaProbe,
  TickSky: C.TickSky,
  PenHand: C.PenHand,
};
export const COSTUMES: Record<string, object> = {
  bessel1838: { coat: .3, mat: 'night', t: .78, flare: .05, leg: 'stone', legT: .68, shoe: 'boot', neck: 'cravat', hat: 'none', hair: 'short', sleeve: 1.08, vest: 'cloth' },
  leavitt1910: { coat: .03, mat: 'night', t: .72, flare: .06, leg: 'night', legT: .7, shoe: 'boot', neck: 'none', hat: 'none', hair: 'bun', sleeve: 1.12, vest: 'paper' },
  harvard1900: { coat: .03, mat: 'cloth', t: .62, flare: .07, leg: 'cloth', legT: .62, shoe: 'boot', neck: 'none', hat: 'none', hair: 'bun', sleeve: 1.15, vest: 'paper' },
  hubble1923: { coat: .42, mat: 'stone', t: .66, flare: .02, leg: 'stone', legT: .7, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'stone' },
  shapley1920: { coat: .44, mat: 'night', t: .66, flare: .01, leg: 'night', legT: .66, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'night' },
  curtis1920: { coat: .4, mat: 'wall', t: .6, flare: .02, leg: 'wall', legT: .64, shoe: 'boot', neck: 'bow', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'cloth' },
  lemaitre1927: { coat: .05, mat: 'night', t: .86, flare: .04, leg: 'night', legT: .86, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.08 },
  child2026: { coat: 0, mat: 'sky', t: .5, flare: 0, leg: 'sky', legT: .55, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.1 },
};
export const SAMPLE: Record<string, object> = {
  NightWindow: { moon: 1, mx: 1180, my: 260 }, ThumbHand: { x: 1120, y: 700, s: .8 }, BlinkEye: { pair: 1, r: 110, lidR: .7, ring: 0 }, StarCabinet: { s: .8, sheen: .5 },
  ScopeField: { r: 360, mag: 1.6, cross: 1 }, CandleAndLighthouse: { gap: .55 }, OrbitTriangle: { tri: 1, angle: 1 }, ParallaxField: { r: 280, sep: .6, shift: 1, tick: 1 },
  TelescopeRow: { s: .9, page: .2 }, ArcDial: { lvl: .0 }, KoenigsbergDome: { s: .9, moon: .2, slit: 1 }, Heliometer: { x: 760, y: 900, s: .9, cut: 1, split: .6, turn: 30 },
  SplitField: { r: 300, slide: .6 }, CygniCrawl: { crawl: .8, ring: 1 }, CoinFarHill: { cr: 40, cx: 960, cy: 300 }, LightBobbin: { k: .8 },
  PaperBoat: { fold: 1, sink: .3 }, StarSea: {}, GlobeStand: { r: 260 },
  MilkyWayBand: {}, GlassPlateSky: { cloud: 1 }, HarvardPlateRoom: { s: .85 }, BreathingField: { t: .6 }, LeavittGraph: { pts: 1, line: 1 }, LightRuler: { len: .8, t: .5 }, CandleRoad: { far: .35 },
  SpiralNebula: { night: 1, q: .3 }, DebateHall: { s: .85 }, HookerDome: { mode: 'out', open: .8 }, LightTable: { s: .85, n: 1, strike: 1, v: 4, date: 1 }, AndromedaEngraving: { beat: 1, t: .5, ring: 1 },
  GalaxyStorm: { mw: .2, ring: 1 }, SpectrumStrip: { shift: .6 }, TrainWhistle: { pos: .55 }, RisingLoaf: { rise: .6 }, LemaitreDesk: { s: .85 }, HubbleDiagram: {},
  GaiaProbe: { spin: 20 }, TickSky: { fly: .2 }, PenHand: { s: 1.4 },
};
