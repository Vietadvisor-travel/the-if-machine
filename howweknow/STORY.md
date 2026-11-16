# FATHOM script standard — long films (8–12 min, 16:9, English) — read before writing any episode

The owner wants "kịch bản đỉnh cao": a script you cannot stop watching, every claim true, every line a picture.

## 1. Shape (≈ 1,300–1,700 words at af_heart 0.86 ≈ 9–12 min)
| part | time | job |
|---|---|---|
| **Cold story** | 0:00–0:25 | A real moment, told vividly (who, where, the impossible detail), ending on THE question. No "what if", no title card, no "in this video". |
| **The stakes** | 0:25–0:50 | Why the answer is hard / why it matters / what everyone assumes. End on a promise ("…the answer came from a stick and a shadow"). |
| **Clue 1–4** | ≈ 2 min each | Each clue = a mini-mystery: a sharper question → real evidence (a photo, a map, a document, a measurement) → the reasoning, step by step → a small payoff → an open loop into the next clue. |
| **The twist** | ≈ 1 min | The complication or the surprising consequence the viewer did not see coming (sourced). |
| **The answer** | ≈ 1 min | Put the clues together in one continuous move; say the answer plainly. |
| **What it means** | 0:30–0:45 | Why it matters today + one closing line with meaning (an image, not a moral). No spoken outro; brand end 3 s. |

## 2. Retention rules
- **An open loop at least every 45 s**: a question, a "but", a missing piece, a promise ("we'll come back to that number").
- **A new real fact every 30–40 s** (a number, a name, a place, a date) — from the research pack, with its source id.
- **Concrete over abstract**: a person, a place, an object, a moment. Numbers become things you can picture ("thirty Earths lined up").
- **Short spoken sentences** (≤ 26 words; average 12–16). One idea per line. Read it aloud: if you stumble, rewrite.
- **Stress** one word per line with `*word*` (voice.py). `…` holds a beat. Questions rise.
- No clichés: "little did they know", "the answer may surprise you", "buckle up", "fun fact", "in today's video", "let's dive in".

## 3. Every line is a picture that TRANSFORMS (engine v2)
- One world, one camera, no cuts. Each line names **what the picture becomes**, growing out of something already on screen:
  the pin becomes a window, the beam becomes a ruler, the shadow becomes an angle, a document's circled number becomes the counter…
- Real first: real places, real maps, real photos/footage/documents (Muse's kit), toned to the palette. Drawn elements explain what
  a camera cannot show (light travelling, an angle, a scale). 2D only.
- On-screen text: NO subtitles (owner, 15 Nov 2026). Words live IN the scene as `text` entities, where they belong: a clue title, a plate caption under a figure, a handwritten margin note, a label with a leader line, the ONE key number in gold, a red stamp — a few words each (≤ 9), on the paper/sky beside the thing they name, written on (`k` 0→1). Use them where a name, date, number or key word helps the eye — not on every line; never a slide of words, never narration repeated as a subtitle.
- Plan it in the script table: `| # | line | the picture (what becomes what) | real stock id | camera | sound |`.

## 4. Truth
- Every fact from the research pack, with its source id in the line's `src`; heavy claims need 2 sources; no invented numbers.
- Reenactments are drawn, never fake records; real people only in genuine archival stock, credited.
- Uncertain or disputed → say so in the line ("recorded as", "most historians think").

## 5. Checked by `python3 tools/script_check.py episodes/<slug>` (must PASS before the voice is made)
Words and length · sentence length · open-loop cadence · fact cadence · banned phrases · clue structure (clue tags 1..N in order) ·
every line changes the picture (some entity key refers to it) · every line with a number has `src`.

## 6. THE SHOT PLAN — every line planned to the frame BEFORE anything is built (owner, 15 Nov 2026)
"Kịch bản từ đầu phải chi tiết đến từng frame là hiệu ứng gì, chuyển biến như nào." The script file `jobs/scripts/<slug>.md` has one
block per line; the same plan is carried in `episode.json` as `lines[i].plan` and checked by `tools/variety.py`.
```
### L12 · 01:18.4–01:24.9 (6.5 s) · CLUE 1
VO     In the third century BC, Aristarchus of Samos saw that shadow as a *measuring tape*.   [F2 · S1]
SEE    What is on screen when the line ends (one sentence, concrete).
NEW    Elements drawn for this line (name them; ★ = real stock id from the order).
BEATS  +0.0 ink-on: the shadow cone's edge is traced by the quill (1.2 s)
       +1.4 real-reveal: ★doc-aristarchus slides in from the right, lands rotated 3° (0.8 s, back)
       +2.6 circle: red ink round the diagram (1.0 s) · sfx quill_scratch −20 dB
       +4.0 morph: the cone's edge straightens into a ruler (1.4 s)
IN     quill            TRANS (to L13)  scale-in on the ruler's first mark        CAM  push 1.00→1.12, ease soft
LIFE   boil · dust      COMP  subject right-third, large       SET  "shadow-as-ruler" (set-piece, new)
STOCK  ★doc-aristarchus (order M-07)                      SOUND  music bed · sfx at +2.6
```
Rules: BEATS are timed from the line's start (real times after `tools/vo.py`; estimated at 2.35 words/s before) and leave no gap
> 6 s without a change. `IN`, `TRANS`, `CAM`, `LIFE` use ids from `FX.md`. `NEW`/`SET` feed the variety ledger. `STOCK` ids come from
the resource order (`jobs/orders/<slug>.md`) that Claude writes for Muse right after the script.
`episode.json`: `"plan": { "in": "quill", "trans": "scale-in", "cam": "push", "life": ["dust"], "comp": "right-large", "set": "shadow-as-ruler", "new": ["ShadowRuler"], "stock": ["doc-aristarchus"] }`.

## 7. THE v5 SHOT PLAN — "siêu chi tiết" (owner 17 Nov 2026). Applies to every film written from 17 Nov 2026 (`"standard": 5`)
The film is designed on paper before a single thing is drawn. Each line of `lines.py` carries, besides §6's fields, an extra dict:
```
{ 'reads':   "what the viewer must UNDERSTAND from the picture alone, sound off (one sentence)",
  'focus':   "the one thing the eye should be on (it is the largest / the lit / the moving thing)",
  'becomes': { 'from': "the lead ball of the demonstration", 'to': "one of the two heavy weights of the torsion balance",
               'how': 'shrink-into', 'dur': 1.6, 'note': "it sinks 84 px and lands as the case inks on around it" },
  'acts':    [ [0.0, "the ball lands in the case (1.6 s)"], [1.8, "the rod swings 6° on its wire (2 s)"],
               [3.6, "gold pull-lines stretch between big and small ball"], [5.0, "the rod settles, trembling"] ],
  'mood':    'curious' }        # for the score planner (tools/score.py); default = the section's mood
```
Rules (checked by `python3 tools/plan_check.py episodes/<slug>`, then by `tools/still_check.py` on the built world):
1. **reads** — if the sentence cannot be drawn so that it reads with the sound off, the line is rewritten or split. No abstract
   symbol stands for a thing that has a real look: draw the thing (STYLE.md "True to life").
2. **becomes** — every line names FROM → TO and a kind from FX.md §H; a plain appearance (`how: 'ink-on'`) on at most 15 % of lines;
   ≥ 14 kinds per film; none on more than 12 % of lines; never the same kind twice running.
3. **acts** — something HAPPENS at least every 2.5 s (an action of a figure, a mechanism working, a quantity growing, a mark being
   made): beats listed with their second. Ambient life (dust, breathing) does not count. `still_check.py` measures the built film.
4. **one idea per picture, one focus** — never two things competing; labels ≤ 4 words, counters instead of static figures.
5. **mood** follows the story, and the music follows the mood (score.py picks the track AND the passage by measurement).
