// TEMPLATE for an episode's own drawings (copy to src/lib/<slug>/index.tsx). Owner, 15 Nov 2026: everything on screen is DRAWN NEW
// for its film from its content (people, furniture, instruments, places) — the samples in src/paint/ are references, never re-used as is.
// Draw with the style core (Region / Ink / Line / Stipple from ../../paint/paint), real construction, a `draw` prop for the ink-on.
// Export ART (name → component; names are PascalCase and unique channel-wide, e.g. LalandeQuadrant, BerlinRoofs) and, for people,
// COSTUMES (key → costume object for the Person rig) — then run `python3 tools/lib_index.py` (registers them in library.json + src/lib/index.ts).
import React from 'react';
import { Region } from '../../paint/paint';
type N = number;
const Example: React.FC<{ x: N; y: N; s: N; draw?: N }> = ({ x, y, s, draw = 1 }) => <Region d={`M${x - s} ${y} h${2 * s} v${-s} h${-2 * s}Z`} mat="wood" t={.5} draw={draw} />;
export const ART: Record<string, React.FC<any>> = { TemplateExample: Example };
export const COSTUMES: Record<string, object> = {};
