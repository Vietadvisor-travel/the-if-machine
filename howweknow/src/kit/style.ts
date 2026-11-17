// HOW WE KNOW — the one style. Every element follows these rules so the film reads as ONE world (owner, 15 Nov 2026: unify, polish).
// Light: one warm key from the upper right (sun/lamp), cool fill from the sky. Objects: flat base + one gradient toward the light +
// a thin rim on the lit edge + a soft contact shadow; no outlines. Depth: haze between layers (atmospheric perspective).
// Finish on every frame: film grain + vignette + soft bloom on emissive things. Text: only captions, a clue tag, at most one label.
export const P = {
  night: '#070B16', deep: '#0E1424', navy: '#16213C', dusk: '#24304D', haze: '#3A4A6E', fog: '#9AA6C4',
  cream: '#F2E8D2', warm: '#FFD9A0', amber: '#F2A93B', ember: '#D9822B', red: '#D04A35',
  ocean: '#1E5C8F', oceanLit: '#4E98CF', land: '#6F8E5E', landLit: '#9DB57F', desert: '#B89A6A', ice: '#E8EEF2',
  rock: '#8F8A80', rockDark: '#4E4B46', moonLit: '#F4EFE3', moonMid: '#D6D0C1', moonDark: '#9C968A',
};
// Faces (owner, 17 Nov 2026): titles IM Fell English SC · captions/labels IM Fell DW Pica italic · hand La Belle Aurore · figures Special Elite · brand IM Fell French Canon SC
export const FONT = { head: 'IM Fell English SC', body: 'IM Fell DW Pica', mono: 'Special Elite', hand: 'La Belle Aurore', brand: 'IM Fell French Canon SC' };
export const W = 1920, H = 1080;
// light direction (unit vector, screen space): from upper right
export const LIGHT = { x: 0.62, y: -0.78 };
