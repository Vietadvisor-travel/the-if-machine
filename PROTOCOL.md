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

One row per episode, moving left to right:

`TOPIC` → `RESEARCH_READY` (Muse) → `IN_PRODUCTION` (Claude) → `DELIVERED` (Claude) → `APPROVED` (owner, written by Muse
or Claude on his word) → `PUBLISHED` (Muse).

Muse edits only the `research` and `published` columns; Claude only the `production` and `delivered` columns.

## 5. File names (fixed)

| File | Name |
|---|---|
| research pack | `jobs/research/<slug>.md` (template: `jobs/research/_TEMPLATE.md`) |
| long video, 16:9, 5–6 min | Drive `<slug>/<slug>_long_16x9.mp4` |
| vertical, 9:16, 60–90 s | Drive `<slug>/<slug>_vertical_9x16.mp4` |
| cover still | Drive `<slug>/<slug>_cover.jpg` |
| English subtitles (long video) | Drive `<slug>/<slug>.srt` |
| the .story files | Drive `<slug>/<slug>_stories.zip` (also committed under `studio/stories/`) |
| delivery note | `jobs/deliveries/<slug>.md` (file names, Drive file ids, durations, resolutions, voices, honest notes) |
| publishing record | `jobs/publish/<slug>.md` (platform, URL, date, caption used) |

Slugs: lowercase, words joined by `-`, taken from `jobs/topics/BANK.md`.

## 6. Triggers (what the owner types)

| Owner says | Who acts | Result |
|---|---|---|
| `nghiên cứu nhẹ: <slug>` | Muse | `jobs/research/<slug>.md`, STATUS → RESEARCH_READY, INBOX line |
| `làm tập <slug>` | Claude | the whole episode end to end, STATUS → DELIVERED, INBOX line |
| `duyệt <slug>` | Muse (or Claude) | STATUS → APPROVED |
| `đăng <slug>` | Muse | posts per brief §8, `jobs/publish/<slug>.md`, STATUS → PUBLISHED |

Nothing is posted before `APPROVED`. Claude never posts anything anywhere.

## 7. Current phase

**Engine phase (from 3 Nov 2026):** the owner is finishing and adjusting the canvas engine in `studio/`. No episode is
produced until the owner says so. Muse may build the topic bank and research packs meanwhile.
