// dinosaur-killer — "What killed the dinosaurs?" — every drawing made for this film (18 Nov 2026), from Muse's kit: R-01 / P-02 the Gubbio
// gorge and the Alvarezes · P-01 the boundary clay · P-03 shocked quartz · M-01 the Chicxulub relief · E-01 Hawkins 1853 (period, not a pose:
// the theropod is drawn in the modern posture). People: Walter and Luis Alvarez (P-02, R-01-x1), Alan Hildebrand — costume and period only.
// a.tsx (acts I–II) · b.tsx (acts III–V). New devices: RockBook, IridiumMeter, ShockedGrain, SurveyRing.
import React from 'react';
import { ART_A as A } from './a';
import { ART_B as B } from './b';
export { THUMB, THUMB_V } from './thumb';
export const ART: Record<string, React.FC<any>> = {
  CretaceousDusk: A.CretaceousDusk,
  Theropod: A.Theropod,
  MuseumHall: A.MuseumHall,
  ClueRelics: A.ClueRelics,
  TheoryCards: A.TheoryCards,
  RockBook: A.RockBook,
  Foraminifera: A.Foraminifera,
  GubbioGorge: A.GubbioGorge,
  FingerOnClay: A.FingerOnClay,
  ClayHourglass: A.ClayHourglass,
  AlvarezStudy: A.AlvarezStudy,
  SpaceDust: A.SpaceDust,
  IridiumMeter: A.IridiumMeter,
  DustShelf: A.DustShelf,
  MeteoriteSlice: A.MeteoriteSlice,
  Asteroid: A.Asteroid,
  EverestScale: A.EverestScale,
  ShockedGrain: B.ShockedGrain,
  WorldOutcrops: B.WorldOutcrops,
  YucatanCoast: B.YucatanCoast,
  SearchGlobe: B.SearchGlobe,
  ReportShelf: B.ReportShelf,
  SurveyPlane: B.SurveyPlane,
  SurveyRing: B.SurveyRing,
  ConferenceHall: B.ConferenceHall,
  DrillCore: B.DrillCore,
  VillageSign: B.VillageSign,
  ImpactRings: B.ImpactRings,
  FoodChain: B.FoodChain,
  Burrow: B.Burrow,
  Sparrow: B.Sparrow,
  MuseumSkeleton: B.MuseumSkeleton,
  Tyrannosaur: A.Theropod,
};
export const COSTUMES: Record<string, object> = {
  walter1977: { coat: 0, mat: 'cloth', t: .55, flare: .02, leg: 'sky', legT: .7, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'cloth' },
  luis1980: { coat: .38, mat: 'stone', t: .6, flare: .02, leg: 'stone', legT: .66, shoe: 'boot', neck: 'tie', hat: 'none', hair: 'short', sleeve: 1.05, vest: 'paper' },
  hildebrand1990: { coat: 0, mat: 'land', t: .6, flare: .02, leg: 'night', legT: .6, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.08, vest: 'cloth' },
  penfield1978: { coat: 0, mat: 'sky', t: .45, flare: .02, leg: 'sand', legT: .6, shoe: 'boot', neck: 'none', hat: 'none', hair: 'short', sleeve: 1.05 },
};
export const SAMPLE: Record<string, object> = {
  CretaceousDusk: { dusk: .4, stars: .5, point: 1 }, Theropod: { x: 1100, y: 860, s: .9, head: .5 }, Tyrannosaur: { x: 1100, y: 860, s: .9 }, MuseumHall: {}, ClueRelics: { s: 1.1, n: 4 },
  TheoryCards: { q: 1 }, RockBook: { open: 1, page: .35, red: 1 }, Foraminifera: { r: 400 }, GubbioGorge: { red: 1 }, FingerOnClay: { glow: .6 }, ClayHourglass: { flow: .4, gauge: .5 },
  AlvarezStudy: {}, SpaceDust: { k: .3 }, IridiumMeter: { v: 1.2, roof: .2 }, DustShelf: { dust: .6, tick: 3 }, MeteoriteSlice: {}, Asteroid: { glow: .5, trail: .3 }, EverestScale: {},
  ShockedGrain: { etch: 1, crack: .3 }, WorldOutcrops: { line: 1, pins: 1 }, YucatanCoast: { ring: 1 }, SearchGlobe: { look: .4, q: 1 }, ReportShelf: { pull: .6, dust: 1, open: 0 },
  SurveyPlane: { prop: 1, trail: .3 }, SurveyRing: { pas: 1, sea: 1, whole: .7, scale: 1 }, ConferenceHall: { empty: .6 }, DrillCore: { roll: .5 }, VillageSign: {},
  ImpactRings: { ring: .5, plume: .5, flash: .3 }, FoodChain: { snap: .4, dim: .6 }, Burrow: { ash: .7, peek: .6, s: 2, y: 500 }, Sparrow: { x: 960, y: 700, s: 3, sing: .5 }, MuseumSkeleton: {},
};
export const FULL = true;
