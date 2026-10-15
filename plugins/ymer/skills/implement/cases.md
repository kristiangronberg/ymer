# Implementing: cases

The cases of the implement skill: the precision earned from runs that
went wrong once. The headings are `SKILL.md`'s own; read a section's
entries at the moment that section runs.

## Execution

**The plan's gates are sweeps, and so is any list built here.** Run the
plan's gates as written, and build an ad-hoc list by the sweep skill's
rules (read at `SKILL.md` § Execution), never narrower than the plan's
own gates. An ad-hoc gate's expected value, a count, a KEEP list or a
delta, is measured or derived in this session, never typed from memory
(*measured, never typed*, term: the plugin glossary). Every zero-hit
gate's paired non-zero assertion runs here, in this session and this
shell, before its zero counts, the plan's gates included: a pairing
observed when the plan was written cannot catch this session's own
mangling of the pattern. A zero-hit gate that arrives with no pairing
gets one before it is trusted.

## Drift Valve

**The marker, never a missing `implemented.md`, tells a later session
the stop ran.** A file's absence is not how a later session learns that,
since an earlier cycle's file may still stand: the next session reads
the marker's block (the process contract, § Iteration), and `plan.md`'s
ticks are the resume point. The marker and the `Unreviewed:` line are
the grammar review's closes already write; the stop mints none.

## Phase Close

**A file committed by hunk keeps its row.** After a by-hunk commit, in
the state folder or a machinery tree, the file still carries the foreign
hunk this close left for the other session, so one ` M ` row per such
file in the verify is the right outcome, not a stop. Assert it rather
than wave it through: `git -C <tree> diff -- <the file>` shows the
foreign hunk and none of this session's edits, which the commit already
put in HEAD. Never re-stage or re-commit the file to silence the row:
that sweep is the record loss the by-hunk commit exists to prevent.
Foreign dirt outside the pathspec stays listed by an unscoped `status`,
and is no stop either.
