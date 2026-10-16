# Code Review: cases

The cases of the code-review skill: the precision earned from reviews
that went wrong once. The headings are `SKILL.md`'s own; read a
section's entries at the moment that section runs.

## Input

**Refs in another tree, never a range over them.** A machinery tree's
refs are often not contiguous on a shared `main`: another session's
commit can sit between two of the topic's. Name each ref; a range would
review the other session's work as this topic's.

## The ladder

**Unsure on a presentational change, key down and say so.** A heavy
review of a presentational redesign once found no correctness defect at
all.

**Why `low` keeps its blind spot.** Raising every change that touches a
test to `high` would key the ladder on file kind, which the risk
profile rules out: the tier follows where the risk sits, and a test
that carries it keys the tier on its own.

## The built-in

**The plain-words target bends the documented form once.** The built-in
documents a pull request, a branch or a path as its target, and a list
of refs in another tree is none of these. A target naming the tree and
its refs in words reached exactly those commits and left another
session's commit between them unread. A report that read something
else is the not-run case, so the bend cannot pass silently.

**Why its own steps are not this pass's.** The built-in's `/verify`
step fires on one route and at some levels only, so the same call runs
it in one session and not in another: a result that depends on the
route is no finding.

## The lenses

**Zero lenses survive.** Every lens is conditional, so a prose change
with no topic and no `CLAUDE.md` left to this pass drops all three.
The review is then the built-in's alone; how the run is reported and
tiered is the process contract's § Review effort.

**Why the roster is stated before any lens runs.** A step that must
produce a list cannot be skipped the way a condition inside a lens's
body can.

**Why Conventions takes a tree the built-in missed.** Leaving the
session's own `CLAUDE.md` half to the built-in whatever happened would
drop the check on every change set and every call not run, and the
roster would read "no companion" where a `CLAUDE.md` went unchecked.

**Mutating to measure.** A lens that must break a clause and run the
suite to prove a finding does it in a scratch replica of the checkout,
never in the session's own checkout, which implement's close may be in
the middle of. A restore is verified with `git status`, never assumed.

## The merge

**Why the record is read whole.** A summary of the record misses what
it cannot see: a domain rule, a step's own prose, a standing heading of
the plan, review's own dispositions, an entry split across two homes.
Reading the files whole sees all of them, at the price of a judgement
rather than a copy.

## Applying fixes (--fix)

**A smell read as a simplification.** A lens's finding applied under the
built-in's cleanup category once overrode what the plan had accepted:
the report class winning is the guard.

**Fixes that widened a decision.** Applied fixes have widened or
falsified a settled decision more than once, each looking like a
one-right-answer cleanup on its own. The settled clause routes such a
fix to disposition.

**No fix in a store.** A fix landing in a store would need a backup and
a fixes-line token that no store has; reporting it needs neither.

## Output

**The report tool's 32 is a display bound, not a bound on the record.**
The tool shows what it can; the report lists the rest beside it, and
the record carries every finding.
