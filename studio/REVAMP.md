# The If Machine 2.0 — entertainment from the content (owner, 4 Nov 2026)

Owner's direction, in order:
1. One vertical 9:16 film, 6–10 min. No 16:9, no separate short.
2. Entertaining, not mechanical; knowledge inside the entertainment.
3. NO narrator character and NO format gimmicks: an objective documentary voice. The pictures match every line and are
   vivid and striking. A real hook. No machine identity (lever, machine face, ticket, SIM clock) — removed.
4. Every frame full: no big empty areas; the visuals must wow.

## Done in the engine
- `act=hook`: the most striking picture full bleed, punch-in, the headline slams in word by word (first 3 s).
- Neutral end card (next question + FOLLOW FOR MORE); the ticket end frame and "SIM ·" label are gone.
- Captions: small, low band (74.5–79 %), clear of platform UI; optional `NAME: line` voices via `cast:` (for quotes).
- Gates: render cost (no frame > 800 ms) and frame fill (`cost.mjs`: dead picture area > 35 % WARN, > 55 % ERROR);
  `variety.mjs` length 6–10 min from measured speech; the first beat must be a hook.
- `new_episode.mjs` template and `EPISODE.md` rewritten for the documentary shape (hook, promise, 4–6 chapters with open
  loops, midpoint reveal, real case, payoff with callback).

## Next
- Remake "AI điều hành quốc gia" in this format (reusing its research and bespoke shots, rebuilt full-frame).
- Add full-frame scene kits as episodes need them (rooms, streets, offices, crowds with depth), each cost-checked.
