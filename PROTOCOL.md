# PROTOCOL — how Muse and Claude Code work together on The If Machine

This file is the contract. Muse and Claude read it at the start of every session. When it and a chat message disagree,
this file wins until the owner changes it here.

## 1. One place for everything

| What | Where | Rule |
|---|---|---|
| Text (brief, research, notes, messages) | this repo, branch **`main`** | the only branch; no side branches, no PRs |
| Big media (videos, cover, srt, story bundle) | Google Drive `TheIfMachine_Media/<slug>/` | uploaded with `studio/tools/pp_drive.py put`; never in git |
| Drive folder id | `jobs/_drive.json` | written once by `pp_drive.py init`, then committed |
| Secrets (GDRIVE_* keys) | session environment only | never in git, never pasted in a file or message |

Everyone: `git pull --rebase` before work, small commits, `git push` right after. Never force-push, never rewrite or delete a
file you do not own (§2). Commit messages start with who and which episode: `[muse] [ai-runs-a-country] research pack`,
`[claude] [ai-runs-a-country] delivered`.

## 2. Who owns which file

| Path | Owner | Others |
|---|---|---|
| `brief/THE_IF_MACHINE_BRIEF.md`, `brief/VOICE_MODELS.md` | the owner (Muse writes changes only on his word) | read |
| `jobs/topics/BANK.md` | Muse | read |
| `jobs/research/<slug>.md` | Muse | read |
| `jobs/deliveries/<slug>.md` | Claude | read |
| `jobs/publish/<slug>.md` | Muse | read |
| `jobs/STATUS.md` | both, each only its own columns (§4) | — |
| `jobs/INBOX.md` | both, append only | — |
| `studio/` (the engine), `CLAUDE.md` | Claude | read |
| `MUSE.md` | Muse | read |

## 3. Messages: `jobs/INBOX.md`

Append one line per message at the bottom, never edit old lines:

```
2026-11-03 14:20 · muse → claude · [ai-runs-a-country] research ready, 11 facts, 2 sources each for the heavy ones
2026-11-04 09:05 · claude → muse · [ai-runs-a-country] delivered, see jobs/deliveries/ai-runs-a-country.md
```

Read the INBOX at the start of every session; answer what is addressed to you.

## 4. Episode states: `jobs/STATUS.md`

One row per episode, moving left to right. Muse adds the row (slug + Vietnamese name) when research starts:

`TOPIC` → `RESEARCH_READY` (Muse) → `IN_PRODUCTION` (Claude) → `DELIVERED` (Claude) → `APPROVED` (owner, written by Muse
or Claude on his word) → `PUBLISHED` (Muse).

Muse edits only the `tên (VI)`, `research` and `published` columns; Claude only the `production` and `delivered` columns.

## 5. File names (fixed)

| File | Name |
|---|---|
| research pack | `jobs/research/<slug>.md` (template: `jobs/research/_TEMPLATE.md`) |
| the film, vertical 9:16, 5–6 min (only format since 4 Nov 2026) | Drive `<slug>/<slug>_vertical_9x16.mp4` |
| cover still | Drive `<slug>/<slug>_cover.jpg` |
| English subtitles | Drive `<slug>/<slug>.srt` |
| the .story files | Drive `<slug>/<slug>_stories.zip` (also committed under `studio/stories/`) |
| delivery note | `jobs/deliveries/<slug>.md` (file names, Drive file ids, durations, resolutions, voices, honest notes) |
| publishing record | `jobs/publish/<slug>.md` (platform, URL, date, caption used) |

Slugs: lowercase, words joined by `-`, taken from `jobs/topics/BANK.md`. The slug is an internal file name for Muse and
Claude only. The owner never has to type or read one (§6).

## 6. Triggers (what the owner says)

The owner speaks plain Vietnamese and names an episode by its Vietnamese name, a few words of it, or "tiếp" (next).
Muse and Claude turn that into the slug themselves.

| Owner says (examples) | Who acts | Result |
|---|---|---|
| "nghiên cứu chủ đề AI điều hành quốc gia" | Muse | picks the slug, adds the STATUS row with the Vietnamese name, writes `jobs/research/<slug>.md`, STATUS → RESEARCH_READY, INBOX line |
| "làm tập AI điều hành quốc gia" / "làm tập tiếp" | Claude | the whole episode end to end, STATUS → DELIVERED, INBOX line |
| "duyệt tập AI điều hành quốc gia" | Muse (or Claude) | STATUS → APPROVED |
| "đăng tập AI điều hành quốc gia" | Muse | posts per brief §8, `jobs/publish/<slug>.md`, STATUS → PUBLISHED |

Rules:
- Match the owner's words to the `tên (VI)` column of `jobs/STATUS.md` (or the topic bank).
- "tiếp" means: for Muse, the highest-scoring topic in the bank not yet researched; for Claude, the highest-scoring episode
  at RESEARCH_READY.
- If the words could mean two episodes, or none, ask the owner one short question. Never guess.
- In every message to the owner, name the episode by its Vietnamese name, never by its slug.

Nothing is posted before `APPROVED`. Claude never posts anything anywhere.

## 7. Current phase

**Engine phase (from 3 Nov 2026):** the owner is finishing and adjusting the canvas engine in `studio/`. No episode is
produced until the owner says so. Muse may build the topic bank and research packs meanwhile.

## 8. Weekly rhythm (owner, 3 Nov 2026): 4 episodes a week, the owner approves every video
- **Saturday (Muse): the shortlist.** Muse writes `jobs/topics/WEEK_<yyyy-mm-dd>.md` (the Monday it is for) with about
  **15 candidates already researched lightly**. This shortlist runs in the same Saturday run as the weekly stock
  top-up cron (Sat 09:20), after the stock parts, and is committed and pushed with them. The shortlist scan follows
  the Poison Pill scan style: recent trends, competitor channels, search and social trends, the coming week's calendar,
  keywords and one insight per candidate that changes a viewer decision. Each candidate has:
  - the question (EN and Vietnamese name);
  - the twist;
  - 3–5 verified facts with sources;
  - the score (curiosity / drawable / gap / verifiable);
  - why now, 3 title options, the risk if any.

  Muse sends the owner the list in Vietnamese, short and numbered.
- **The owner picks 4** and tells Muse "chốt 2, 5, 9, 12" (and the order if he wants).
- **Muse, the same day or Sunday:**
  1. writes the 4 into `jobs/SCHEDULE.md` (post dates Mon, Wed, Fri, Sun) and the STATUS rows;
  2. writes the 4 full research packs (`jobs/research/<slug>.md`, from the template, about 10 facts, 2 sources for heavy claims);
  3. sets STATUS → RESEARCH_READY, adds an INBOX line and pushes.

  The candidates not picked stay in the bank for later weeks.
- **Whenever the owner says "làm tập …" (Claude, a new chat per episode):**
  1. Claude makes the episode end to end and uploads it to Drive `TheIfMachine_Media/<slug>/`.
  2. Claude writes the delivery note, sets STATUS → DELIVERED and reports the Drive link to the owner.
  3. If the research pack is missing, Claude researches it itself (the same template, 2 sources for heavy claims) and goes on.
     It does not stop to ask.
- **The owner watches the video on Drive.** He tells Claude what to change (same chat), or tells Muse "đăng tập …".
- **Muse posts only on the owner's "đăng tập …"** (that message is the approval, STATUS → APPROVED → PUBLISHED). Nothing is posted otherwise.
- The scheduled routine "IFM auto-production" exists but is **off** (owner chose manual starts). It can be switched on again on his word.
