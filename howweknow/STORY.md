# Script standard — phase 3 long films (8–12 min, 16:9, English) — read before writing any episode

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
- On screen text: the caption, the clue tag, at most ONE small label at a time. Never a slide of words.
- Plan it in the script table: `| # | line | the picture (what becomes what) | real stock id | camera | sound |`.

## 4. Truth
- Every fact from the research pack, with its source id in the line's `src`; heavy claims need 2 sources; no invented numbers.
- Reenactments are drawn, never fake records; real people only in genuine archival stock, credited.
- Uncertain or disputed → say so in the line ("recorded as", "most historians think").

## 5. Checked by `python3 tools/script_check.py episodes/<slug>` (must PASS before the voice is made)
Words and length · sentence length · open-loop cadence · fact cadence · banned phrases · clue structure (clue tags 1..N in order) ·
every line changes the picture (some entity key refers to it) · every line with a number has `src`.
