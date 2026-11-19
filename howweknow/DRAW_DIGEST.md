# DRAW DIGEST — give THIS to a drawing agent instead of whole example files (token rule, 19 Nov 2026)
- Canvas 1920×1080. A film drawing = `const Name: React.FC<any> = ({ x = 960, y = 540, s = 1, draw = 1, tm = 0, …props }) => <g>…</g>`,
  full-frame scene around (x, y), own background, every prop 0..1 changes the picture smoothly (no popping). Export `ART_A`/`ART_B` and
  `SAMPLE_A`/`SAMPLE_B` (mid-action props); index.tsx lists every name explicitly.
- Style: clean drawn 2D, cream paper, sepia ink outlines (#2B1D12), house washes (Region/Ink/Line/Stipple from src/paint/paint, mats:
  look up the list at the top of paint.tsx), accent vermilion #B8432A. NO engraving pass. Fonts: IM Fell English SC (titles), La Belle Aurore
  (hand), Special Elite (figures), IM Fell DW Pica italic (captions).
- Every scene (the critic's recurring notes): one named light source + cast/contact shadows + ≥ 2 depth planes; people and hands big enough
  to act; nothing important cut by the frame at camera zoom 1.15; real outlines for real things (continents: reuse the Natural Earth data in
  src/lib/drifting-continents/a.tsx; hands: ChildHand there, FlatHand in b.tsx).
- NEVER name a prop tear/burn/lift/pour/wipe/unroll/iris/blinds/brush/dissolve/blur/shatter/flipY/a (engine masks; check_world refuses).
- Check IN THE FILM, one still per fix: `npx remotion still Story out/x.jpg --frame=<sec*30> --props='{"slug":"<slug>"}' --scale=0.5`.
  Polish bar = drifting-continents level; spend effort on what MOVES (props that act), not on extra detail.
- ENGINE 11 (owner 19 Nov 2026, sun-fire 6/10 vs drifting 8.5): a drawing is a PLACE (depth, scale, a human or a known object), never a lone
  object on a plain wall. Its main props change the SHAPE of that world (things move, split, join, melt, flood, grow, turn into the next
  picture) — never props that only add arrows, tapes, numbers, labels. No cartoon faces on objects or particles. Look at
  public/stock/_hwk_core/reference/drifting-continents_pairs_*.jpg (the bar) and sun-fire-v1_pairs_*.jpg (what not to do) first.
