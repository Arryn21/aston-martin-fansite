---
description: End-of-session wrap-up — save progress notes so the next session picks up easily
---

The session is ending. Perform the end-of-day wrap-up for this project:

1. **Update `CLAUDE.md`** in the project root (create if missing). It is the canonical
   progress file, auto-loaded next session. Make sure it reflects reality as of now:
   - Add a dated entry to the **Session log** summarizing what was built/changed today
     (include the last commit hash)
   - Update the **Backlog / ideas** section: remove completed items, add new ones raised today
   - Update any changed facts elsewhere in the file (current cache version `?v=N`,
     new architecture pieces, new gotchas learned, new URLs/services)
2. **Update persistent memory** (`memory/` directory): keep the project memory file
   consistent with CLAUDE.md — brief pointer-level updates only, CLAUDE.md holds the detail.
3. **Commit and push** all outstanding changes including CLAUDE.md, with a sensible
   commit message. Confirm the push succeeded.
4. If anything was left half-done or broken, list it prominently in CLAUDE.md under a
   **"Resume here"** heading so the next session starts there.
5. Reply with a short summary: what was saved, last commit, and the top item to resume on.
