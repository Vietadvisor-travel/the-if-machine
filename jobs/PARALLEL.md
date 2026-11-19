# Two Claude accounts in parallel (owner 19 Nov 2026) — the repo is the only shared memory
Chat history is NOT shared between accounts; everything a session needs is in git (CLAUDE.md, RUNBOOK, STATUS, INBOX, research, chains) and
on Drive. So both accounts behave identically as long as they follow these rules.

## Setup once per account (the owner)
1. claude.ai → Settings → Connectors: connect the SAME GitHub user (or add the new account's GitHub user as a collaborator on
   `vietadvisor-travel/the-if-machine` and `vietadvisor-travel/frame-batch`), and install the Claude GitHub App on both repos.
2. Claude Code (web) → the environment: copy the same environment variables / network secrets as account A (Drive credentials used by
   `studio/tools/pp_drive.py`; anything `bash setup.sh` reads). Same network access (Drive, GitHub, package registries).
3. First chat on the new account: "đọc CLAUDE.md" — nothing else to teach.

## Working rules (both accounts)
- ONE FILM PER ACCOUNT AT A TIME. Claim it first: `git pull`, set the STATUS row to `IN_PRODUCTION (Claude-A|B, <time>)`, commit, push.
  A row already IN_PRODUCTION by the other account is off-limits.
- Per-film files only (`episodes/<slug>/`, `src/lib/<slug>/`, `jobs/*/<slug>*`) during production. Shared files (STATUS.md, INBOX.md,
  history.json, library.json, src/lib/index.ts, RUNBOOK, tools/) are touched only at the start (claim) and the end (ship), each time
  `git pull --rebase` → edit → commit → push; on a conflict, keep both sides (append-only files) and re-run `python3 tools/lib_index.py`.
- Engine/tool changes (tools/, src/engine/, src/paint/) only by the account with no render running anywhere — say it in INBOX first.
- The farm (frame-batch) is shared safely: each render has its own `_farm/<sig>/`; pull/rebase before pushing there.
- Commits name the account: `[claude-A]` / `[claude-B]`.
