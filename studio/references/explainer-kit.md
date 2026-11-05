# Explainer kit — the default 2D pictures (owner, 4 Nov 2026 evening)

"The 2D scenes were shallow: you could not tell what the shapes were." Every 2D beat now shows a recognisable thing:
an OpenMoji illustration (2,000+ named, `EMOJI.md`), a bank item, a map, a number made visible, a real quotation.
Code: `engine/library/ifm_explain.js` (acts) + `engine/library/emoji_data.js` (built by `tools/emoji_build.py`).
Credit line in every delivery note and video description: **Illustrations: OpenMoji (openmoji.org), CC BY-SA 4.0.**

## Acts (all `kind=w`, all take `bg=paper|sky|sand|mint|blush|night|dusk`, `title=`, `sub=`; times `at=k|k` = caption index)
| act | shows | keys |
|---|---|---|
| `ex_show` | one thing, big and clear | `e=<name>` `l=LABEL` `do=float|spin|grow|drop|pulse` `around=a|b|c` (small things orbiting) `pile=N` (a heap) `x=k` (crossed out at caption k) `tag=TEXT@k` |
| `ex_compare` | two things side by side | `e=a|b` `l=A|B` `sign=vs|=|≠|→|>|<` `win=0@k` (one wins at caption k) |
| `ex_flow` | a process / a chain | `e=a|b|c|d` `l=A|B|C|D` (steps appear on the captions, arrows draw between) |
| `ex_list` | points, the recap | `e=a|b|c` `l=line|line|line` `n=1` (numbered) |
| `ex_stat` | a number by its size | `v=2000` `unit=…` `pre= post=` `e=<name>` `gn=100` (a grid of things) `hi=10` (highlight the first 10) |
| `ex_chapter` | a section card (signpost + a breath) | `n=2` `title=` `sub=` `e=<name>` (night background by default) |
| `ex_quote` | a real quotation, typed | `q=line|line|line` `by=Name, year` |
| `ex_timeline` | dates along a line | `e=a|b|c` `l=A|B|C` `d=DATE|DATE|DATE` (the camera moves to each date on its caption) |

## Rules
- The picture is the SUBJECT of the line. If the line says "a cow for some wheat", the frame shows a cow, an arrow, wheat.
- 1–4 things per frame; each thing ≥ 9 % of the frame height; labels in capitals, ≤ 18 characters.
- Use `ex_chapter` to open every section and add `pause=1.2` to that beat; use `ex_list n=1` for the recap in the conclusion.
- Mix with 3D (places, scale) and maps; never four 2D kit beats of the same act in a row.
- In a bespoke act: `IFM.emoji('<name>', cx, cy, size, {ground, rot, flip, alpha})` draws any illustration; `IFM.emojiFind('word')`.
- No logos, no real people's likeness (OpenMoji people are generic), no flags as decoration where a country is not meant.

## Example (hook + section)
```
# vis kind=w act=ex_show e="money bag" around="coin|banknote with dollar sign|credit card" title="WHAT IF MONEY VANISHED?" pause=1.2
What if every coin, every note and every number in every bank account disappeared tonight?
# vis kind=w act=ex_chapter n=1 title="WHAT MONEY DOES" e="scales" pause=1.2
First: what does money actually do?
# vis kind=w act=ex_flow e="cow|left right arrow|ear of rice" l="A COW|SWAP?|WHEAT" bg=sand
To swap a cow for wheat, you need someone who has wheat and wants a cow, today.
```
