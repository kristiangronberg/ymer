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
  the cwd: the Bash tool's working directory is state a `cd` can
  move. A `cd <topic folder> && …` once re-scoped a same-response
  call's `find . -name plan.md` to that folder (2026-08-31: 1 plan
  counted where the absolute-path re-run counted 148; the paired
  total-count control exposed it); on CLI 2.1.292 a `pwd` in the same
  batch as a `cd` printed the launch dir (observed in passing, not
  probed), so nothing here relies on whether another call in the
  batch sees the move. Whether a `cd` outlives its own call depends
  on the front: in a main session the harness restores the launch
  directory after every call, silently, when
  `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` is set, and without it a
  `cd` into the repo being swept carries to the next call (both
  measured by headless probe, CLI 2.1.292, 2026-10-07); only a `cd`
  outside the session's working directories snaps back, printing
  "Shell cwd was reset" (probed 2026-09-02, a `cd` to the scratchpad;
  bundle read 2.1.273); an agent thread resets after every call
  regardless. A `cd` still re-scopes the rest of its own call under
  every behaviour, and a relative corpus inherits whatever cwd the
  front left, so an absolute corpus is right under all of them —
  except that a
  `/`-containing `rg -g` glob is matched relative to the cwd, not the
  named root, so such a command stays cwd-dependent until the glob is
  prefixed `**/` (probed 2026-09-02, ripgrep 15.2.0; → the front's
  initial instructions, where a machine's own tool quirks are bound).
