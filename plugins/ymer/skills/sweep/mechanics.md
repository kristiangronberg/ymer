# Sweep — building find-all-sites lists — mechanics

The mechanics of the sweep skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## 2. Corpus — everything minus named exclusions, never an allowlist

- Untracked files count too: a `git ls-files` corpus lists tracked
  files only, and so does `git grep` — every file the change itself
  creates is invisible to either until it is committed. A sweep that
  must see work in progress walks the tree (`grep -r`, `rg`), passes
  `git grep --untracked`, or builds its corpus with
  `git ls-files --cached --others --exclude-standard` — and all three
  still skip gitignored paths by default, so an untracked file under a
  gitignored path is reached only by turning that filter off, as the
  hidden-files bullet above says.
- Name the corpus by absolute path, never `.` or a path relative to
  the cwd: the Bash tool's working directory is state a sibling call
  can move — a `cd <topic folder> && …` in one of several
  same-response calls re-scoped a sibling's `find . -name plan.md` to
  that folder (2026-08-31: 1 plan counted where the absolute-path
  re-run counted 148; the paired total-count control exposed it).
  The re-scope is live, not historical: the harness snaps the shell
  back to the launch directory — printing "Shell cwd was reset" —
  only when the new cwd falls outside the session's working
  directories or `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` is set
  (as-of CLI 2.1.258, read from the bundle; the 2026-09-02 probe that
  saw the line had `cd`-ed to a scratchpad outside them), so a `cd`
  into the repo being swept carries to the next call. An absolute
  corpus is right under either behaviour — except that a
  `/`-containing `rg -g` glob is matched relative to the cwd, not the
  named root, so such a command stays cwd-dependent until the glob is
  prefixed `**/` (probed 2026-09-02, ripgrep 15.2.0; → the front's
  initial instructions, where a machine's own tool quirks are bound).
