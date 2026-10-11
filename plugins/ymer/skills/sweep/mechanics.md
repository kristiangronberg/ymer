# Sweep: mechanics

The mechanics of the sweep skill: which files git and the shell reach
when a corpus is built, and how a corpus is named so that it does not
move. The headings are `SKILL.md`'s own; read a section's entries at
the moment that section runs.

## 2. Corpus: everything, minus exclusions you name

- Untracked files count too: a `git ls-files` corpus lists tracked
  files only, and so does `git grep` — every file the change itself
  creates is invisible to either until it is committed. A sweep that
  must see work in progress walks the tree (`grep -r`, `rg`), passes
  `git grep --untracked`, or builds its corpus with
  `git ls-files --cached --others --exclude-standard` — and all three
  still skip gitignored paths by default, so an untracked file under a
  gitignored path is reached only by turning that filter off, as the
  hidden-files rule in `SKILL.md` § 2 says.
- Name the corpus by absolute path, never `.` or a path relative to
  the working directory. A `cd` moves the working directory, and a
  relative corpus silently follows it, whatever the front does with
  the directory afterwards; an absolute corpus stays where it was
  named. The one exception is a glob: an `rg -g` glob containing `/`
  is matched against the working directory, not the named root, so
  prefix such a glob with `**/`.
