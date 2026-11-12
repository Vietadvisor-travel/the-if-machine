# The 60-second true story — writing standard (owner, 12 Nov 2026: "content matters as much as the picture: gripping")

Built from what actually wins on Facebook (Muse's scan, `jobs/research/_market/`): the top videos are short animated TRUE
micro-stories; one creator (Zack D. Films) has a median of 95K likes vs 4K for everyone else with one formula. This page
turns that formula into rules. Voice: am_adam (deadpan, slightly synthetic). Picture: house 3D (IFM.L3) + minimal 2D.

## 1. Pick the story (score it; produce only ≥ 8/10)
1. TRUE, with 2 independent sources for every fact on screen (news, journal, museum, official record). No rumour.
2. ONE person or ONE object at the centre (a cook, a letter, a block of ice, your own arm).
3. A PHYSICAL, VISIBLE action in the first line (he bent a spring into a hook; she sealed herself in with paper towels).
4. Real STAKES that rise (air running out, a city hidden, a nerve being crushed).
5. A TURN the viewer does not see coming (a clever trick, a twist, an absurd cause, a sacrifice).
6. Can be understood with the SOUND OFF (every beat is a picture, not an idea).
7. One strong EMOTION: awe, anxiety, warmth, or deadpan absurdity. Never sadness for its own sake.
8. Most people have NOT heard it (or know only the headline).
9. Fits 150–190 spoken words (≈ 50–65 s with am_adam at speed 1.0).
10. Safe: no instruction for anything dangerous; tragedy told with respect, never as a joke.

Winning families (from the data): survival with an ingenious trick · history under your feet / how people did it before
technology · strange-but-true events · your body in one concrete situation ("you lay on your arm…") · quiet heroism.

## 2. The shape (≈ 170 words)
| time | beat | rule |
|---|---|---|
| 0–3 s | HOOK | Start MID-ACTION, verb first, no setup, no question, no "In this video": "Was in the bathroom when his tugboat flipped over and sank." One concrete, slightly absurd image. The picture shows exactly that line. |
| 3–10 s | ANCHOR | One sentence of who / where / when + the number that sets the stakes ("4:50 a.m., off Nigeria, 30 metres down"). |
| 10–40 s | ESCALATION | 3–4 turns. Each turn = a new problem → what he did → what it cost. A concrete sensory detail every 5–8 s (cold water, a bottle of Coke, two tiny flashlights). Plant an open loop ("but the bubble had a problem"). |
| 40–52 s | CLIMAX | The turn: the reveal, the rescue, the trick working, the cost. Slow down: shorter sentences, a held beat (…). |
| 52–60 s | PAYOFF | The aftermath in one line + one kicker fact (a number, an irony), then a closing line that echoes the hook so the loop invites a rewatch. No spoken "follow", no outro. |

## 3. Line craft
- One sentence = one shot. 6–16 words. Concrete nouns and verbs; numbers instead of adjectives ("30 metres", not "very deep").
- Close third person for stories ("he", the name after the hook); second person for body/explainer stories ("you").
- Past tense for stories, present tense for "you" stories. Contractions. Plain words a 12-year-old knows.
- Deadpan humour from the facts themselves, at most once or twice (the bottle of Coca-Cola); never mock a victim.
- Every 8–10 s a reason to keep watching: a new problem, a number, a detail, a question the next line answers.
- Banned: "incredible", "you won't believe", "shocking", "insane", "mind-blowing", "In this video", "Let's", "Follow for more".
- Never invent thoughts, dialogue or feelings. Quote only what a source quotes ("He's alive!"). Say "about" for estimates.

## 4. Picture rules that serve the story
- The first frame IS the hook line (the man in the bathroom as the room turns over), moving within 0.3 s.
- A new shot every 2–4 s; the camera tells the story (push in on the detail, cut to the consequence).
- 2D only where it explains the invisible (air squeezed to a quarter, a gauge, an x-ray). No titles, no kickers.
- Real people are shown as generic figures (no likeness); the caption of the post says "animated reenactment".

## 5. Before production — the 4 tests (write the answers in the script file)
1. Hook test: would a stranger scrolling stop on the first line + first frame? Why?
2. "So what?" test: what is the turn the viewer did not expect?
3. Sound-off test: does every line have its own picture?
4. Truth test: every factual line has 2 sources listed next to it.

## 6. Script file (`jobs/scripts/<slug>.md`)
Header: story, sources (numbered), score /10 with one line per criterion, the 4 tests. Then a table:
`time | VO (exact) | SHOT (3D: set · subject · action · camera) | 2D (or —) | SFX (or —) | sources`.
