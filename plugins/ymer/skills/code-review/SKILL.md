---
name: code-review
description: Reviews a code change before it reaches main: runs Claude Code's built-in code review at the depth the change's risk calls for, checks the change against its plan and the project's coding standards, and applies the fixes that have one right answer. Use at the end of implementing and in review, or on its own over a diff.
---

# Code Review

Code review is the last net before a change reaches main: it reviews
the implementation, as plan-review reviews the plan. Claude Code's
built-in code review does the general search for bugs and cleanups, at
the depth the change's risk calls for. This skill owns what the
built-in cannot do: it checks the change against the topic's plan,
against a fixed smell baseline and against the coding standards no
other check covers (the companion the plan names, and the `CLAUDE.md`
files the built-in did not read), holds every finding against what the
record already settles, and decides which fixes to apply and which to
report. The pipeline runs it with `--fix` as the lens pass,
pre-executed at implement's close and run by review as the fallback
(the review skill, § The lens pass), and anyone can run it on its own
as `/ymer:code-review [target]`.

This file is code-review's spine: its intent and its moments in order.
Its **mechanics** (the Claude Code way: git, the built-in's call, the
harness's tools) are in `mechanics.md`, and its **cases** (the earned
precision: edge cases, exceptions and rulings) are in `cases.md`, both
under this file's headings. A section with entries there says so in its
first line, and those entries are read when the section runs.

## Overview

**Read the plugin glossary's entries for code-review's vocabulary
now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/glossary.md`, each entry by its heading: *lens*,
*lens pass*, *lens applicability*, *change set*, *payload*, *effort
ladder*, *tier*, *risk profile*, *iteration*, *machinery tree*, *shared
tree*, *parent topic*, *inherited records*. This file uses those terms
and never defines them.

The run goes in order: read the subject and the record, key the tier,
call the built-in once per tree, run the lenses while it works, merge
every finding and hold it against the record, sort the survivors into
apply, report and skip, and report. Nothing in a run is set by hand:
the tier is keyed by the change's risk profile, the roster by each
lens's precondition, and each finding's disposition by where it came
from.

**Announce at start:** "I'm using the code-review skill to review the
change."

## Input

*Read with this section: `mechanics.md` § Input (the mechanics) and `cases.md` § Input (the cases).*

Input reads two things: the subject the pass reviews, and the record it
reviews against.

**The subject.** Run as the lens pass, the caller hands it over: the
diff the review skill's § The lens pass computes, tree by tree, or the
topic's change set where no diff exists, with `--fix` and the paths of
the topic's `plan.md` and `spec.md`. Run on its own, the subject is the
target the user names (a branch, a pull request, a path, or refs and a
tree in plain words), else the current branch against its upstream
plus the working tree (`mechanics.md` § Input). Either way the subject
takes in each tree's untracked files, and on a shared tree only the
paths the topic touches. **Read the substrate contract's § Tree options
now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md`, for which trees are
shared and why a shared tree is read scoped to the paths this
session's topic touches.

**A subject that cannot be read is a pass not run.** Where the session
cannot read the subject at all (no shell to run git in, a tree git
refuses), nothing is reviewed, and the report says the pass did not
run and the built-in did not run, with the why (→ Output). An empty
subject is a different answer: a pass with nothing to review reports
`Lens pass: dropped — no diff or change set`, the line the review
skill's § The Close names. Neither is ever reported as a clean review.

**The record.** Read the topic's `spec.md` and `plan.md` whole, and on
an iteration `review.md`'s earlier dispositions: they are what the
merge holds every finding against (→ The merge). Where the plan header
carries a `**Parent topic:**` line, the parent's inherited records are
held as settled beside them (the operations contract, § Inherited
records). A topic that entered at write-plan may have no `spec.md` of
its own, and only a run with no topic holds nothing as settled. Run
on its own, the topic is the one
the current branch names, found through its task (*look up topic*,
binding: the operations contract); for that lookup, **read the
operations contract whole now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`, for *look up topic* and
the folder a topic ID names. Where the coordinator does not answer or
names no topic, the plan reads absent: plan fidelity is dropped at its
precondition, and the run goes on.

## The ladder

*Read with this section: `cases.md` § The ladder (the cases).*

**Read the process contract's § Review effort now**, unless already
read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the
risk profile's four dimensions that key the tier, lens applicability
and how a precondition is read, and how a dropped lens is reported.

Three tiers, each the level this skill passes to the built-in:

- **`low`**: presentational and mechanical changes, docs and
  configuration: high mechanicalness, no trust boundary, a contained
  blast radius. At `low` the built-in reviews no test or fixture
  change, so a change whose risk sits in a test, a gate or a probe
  keys `high` by its risk profile; plan fidelity still reads every
  test change.
- **`high`**: non-trivial logic, a changed interface or query,
  behaviour a caller depends on.
- **`max`**: correctness-critical changes: concurrency, money, data
  migrations, trust boundaries, intricate state machines, wherever a
  missed defect is expensive.

The tier is the token the record writes on the `Lens pass:` and `Delta
pass:` lines (the review skill, § The Close). A delta pass keys its
tier the same way, `low` included, and every tier calls the built-in.
Claude Code's own `ultra` review is the user's command, never a tier of
this ladder.

## The built-in

*Read with this section: `mechanics.md` § The built-in (the mechanics) and `cases.md` § The built-in (the cases).*

Call Claude Code's built-in code review **once per tree** in the
subject, at the keyed tier. Every call carries the level,
`--max-findings all` and a target naming, in plain words, the tree, its
refs or range, its working tree and its untracked paths, on a shared
tree only the paths the topic touches, and no call carries `--fix`.
Passing the level and the limit keeps the user's own last choices at
their `/code-review` out of the run; leaving out `--fix` keeps the
apply decision this skill's (→ Applying fixes (--fix)). The built-in
runs in the background and reports when it finishes: run the lenses
meanwhile.

The built-in is used through what it documents: its levels, its flags
and the findings it reports, never its internal prompts. Its own steps
after the review, a `/verify` run among them, are its business: this
skill neither asks for them nor suppresses them, and nothing they
report is a finding of this pass.

**A built-in that did not run is said, never passed off as clean.**
**Read the process contract's § Defaults and holds now**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`,
for the fallback rule a checkpoint that cannot run follows. The
built-in did not run over a tree when it is absent or its call is
refused, when its call is still outstanding at the moment
`mechanics.md` § The built-in reads it as not run, when its report
cannot be read, or when the report shows it read something other than
that tree's subject. The pass then goes on with the lenses, and its
report names the tree and the why, which the caller's line closes with
as `· built-in not run — <why>`: the `Lens pass:` line, or the `Delta
pass:` line where the run was a delta pass (the review skill, § The
Close). A change set gets no call at all, since the built-in reviews
diffs, and its line closes `· built-in not run — change set`.

## The lenses

*Read with this section: `mechanics.md` § The lenses (the mechanics) and `cases.md` § The lenses (the cases).*

Three lenses run in this session, each behind its precondition.
Evaluate the preconditions from what is already held (the subject, the
plan header, the changed-file list, which built-in calls were made) and
state the result before any lens runs:

```
Roster (will run): <lens names>
Dropped: <lens name> — <the precondition that failed>
```

Each precondition is read by the process contract's § Review effort,
read at → The ladder. A lens reports every candidate with a failure
scenario it can name, even one it only half believes: the merge, not
the lens, drops. A change set is read payload by payload: each payload
as the change, its target in place, a file or a store.

### Plan fidelity

**Precondition:** a `plan.md` applies (→ Input).

Review the subject against the plan it claims to implement, and
surface:

- planned behaviour that is missing or partial;
- behaviour the plan did not ask for;
- planned behaviour that looks implemented but wrong.

Each finding names the plan task or step it diverges from. Read every
change against the plan, test changes included.

### Smells

**Precondition:** the subject touches at least one file that is not
prose (any extension other than `.md` or `.txt`; a JSON or config file
counts).

Match the changed code against this fixed baseline, Fowler's
(_Refactoring_, chapter 3). It applies even where a repo documents
nothing. Each smell reads *what it is*, then *how to fix it*:

- **Mysterious Name**: a function, variable or type whose name does not
  reveal what it does or holds. → Rename it; where no honest name
  comes, the design is murky.
- **Duplicated Code**: the same logic shape appears in more than one
  hunk or file of the change. → Extract the shared shape and call it
  from both.
- **Feature Envy**: a function that reaches into another object's data
  more than its own. → Move it onto the data it envies.
- **Data Clumps**: the same few fields or parameters keep travelling
  together, a type wanting to be born. → Bundle them into one type and
  pass that.
- **Primitive Obsession**: a primitive or a string standing in for a
  domain concept that deserves its own type. → Give the concept its own
  small type.
- **Repeated Switches**: the same switch or conditional cascade on the
  same type recurs across the change. → Replace it with polymorphism,
  or with one map both sites share.
- **Shotgun Surgery**: one logical change forces scattered edits across
  many files. → Gather what changes together into one module.
- **Divergent Change**: one file or module is edited for several
  unrelated reasons. → Split it so each module changes for one reason.
- **Speculative Generality**: abstraction, parameters or hooks added
  for needs the spec does not have. → Delete it, and inline back until
  a real need shows.
- **Message Chains**: a long `a.b().c().d()` walk the caller should not
  depend on. → Hide the walk behind one call on the first object.
- **Middle Man**: a class or function that mostly delegates onward. →
  Cut it and call the real target directly.
- **Refused Bequest**: a subclass or implementer that ignores or
  overrides most of what it inherits. → Drop the inheritance and use
  composition.

Two rules bind the baseline. A documented repo standard overrides it:
where the repo endorses something the baseline would flag, the smell is
suppressed. And what tooling already enforces is skipped. Every smell
finding is a labelled judgement call ("possible Feature Envy"), never a
hard violation.

### Conventions

**Precondition:** a coding-standards companion applies, named by the
plan header's companion line, or a tree in the subject has a
`CLAUDE.md` governing a changed path that the built-in does not check:
any tree other than the session's own working tree, and the session's
own tree wherever the built-in did not run over it (a change set
always).

Check the changed code against the companion's rules and against those
`CLAUDE.md` files (`mechanics.md` § The lenses). The built-in checks
the session's own tree's `CLAUDE.md` files only where it ran over that
tree: it starts with them loaded, and reads no other tree's. Where it
reads as not run over the session's own tree after the roster was
stated, this lens takes that tree's files then, running even where the
roster dropped it, and the report amends the roster to say so. Flag a
violation only where you can quote the exact rule and the exact line
that breaks it, naming the companion or the `CLAUDE.md` path: no style
preferences, and no reading of a document's spirit.

Run on its own with no plan header, look for the companion as write-plan
does: **read the write-plan skill's § Language-specific companion
skills now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/write-plan/SKILL.md`, for the two places a
companion is looked for.

## The merge

*Read with this section: `cases.md` § The merge (the cases).*

Once every built-in call has reported or been read as not run, and
every lens has run, merge their findings:

- **One finding per defect.** Findings that name the same defect at the
  same place for the same reason are one, whichever sources raised it.
- **A category for each.** A finding keeps its source's category: the
  lens that raised it, or the built-in's category. Where the built-in
  gave none, assign one from the finding's text (correctness, reuse,
  simplification, efficiency, altitude, conventions) before the sort.
- **Held against the record.** Check every finding, the built-in's and
  the lenses' alike, against `spec.md` and `plan.md` read whole, the
  parent's inherited records where the plan header names a parent topic
  (→ The record), and, on an iteration, `review.md`'s earlier
  dispositions. A finding that
  contradicts what the record settles (a decision, an amendment, a
  design decision, an accepted gap) without arguing why the settlement
  is wrong is dropped as settled, naming where it is settled. One that
  makes that case is kept: the record can be wrong, and the bar must
  not make it unfalsifiable. The plan's unverified assumptions settle
  nothing: they are risk, and a finding that one fails is kept.
- **Refuted only by the code.** A finding the code shows to be wrong,
  quoting the line that does, is dropped as refuted. A realistic state
  the code does not exclude (a race, a nil on a reachable error path, a
  falsy zero, a boundary or an anchor lost) is never refuted as
  speculative.
- **No cap.** Every finding that survives is in the result, however
  many there are.

A finding carries a `verdict` only where the built-in gave one.

## Applying fixes (--fix)

*Read with this section: `mechanics.md` § Applying fixes (--fix) (the mechanics) and `cases.md` § Applying fixes (--fix) (the cases).*

Only when `--fix` was passed: after the merge, apply findings to the
working tree instead of stopping at the report. **The line is
attention-worthiness, not behaviour-preservation**: apply what has one
right answer, report what decides something. A survivor's class is
keyed on its source and category, never on a fresh read of the single
finding:

- **Apply**: a reuse, simplification or efficiency cleanup; a
  convention violation quoting its rule; a correctness finding with one
  obvious fix.
- **Report for disposition, never apply**: every smell, altitude and
  plan-fidelity finding; and any fix that would change or relax what the
  record settles. Deviation from the plan is the caller's to dispose,
  and the caller may have deviated on purpose.
- **Skip**: a fix that would change intended behaviour, reach well
  outside the reviewed subject, or that you judge a false positive.
  Note the skip rather than arguing with it.

Where two sources raised one finding and their classes disagree, it is
reported, never applied: a lens raising it marks it a judgement call. A
finding on a change set's store target is always reported, never
applied: no fix lands in a store. Without `--fix`, every survivor is
reported.

## Output

*Read with this section: `mechanics.md` § Output (the mechanics) and `cases.md` § Output (the cases).*

Report every surviving finding, ranked most severe first, correctness
and plan fidelity above cleanup. Each carries its file and line, a
one-sentence statement, its concrete failure scenario or cost, its
source and category, and with `--fix` its outcome: applied, reported
or skipped. Beside the findings, the report states:

- the lens roster that ran, and every dropped lens with the
  precondition that failed;
- the tier the pass keyed where it read a subject, and for each tree
  whether the built-in ran at it, or that it did not run and why;
- what the merge dropped, each a short name with a one-clause why:
  refuted, settled (naming where it is settled), or skipped.

A findings list read without these cannot tell "this dimension was
clean" from "this dimension never ran". The caller writes the record
from them: the `Lens pass:` line, or a delta pass's `Delta pass:` line,
with its `· built-in not run — <why>` clause where the built-in did not
run, and the `Fixes applied (--fix):` and `Refuted/skipped:` lines are
the review skill's grammar (the review skill, § The Close), and this
report gives each its facts. Create or publish no artifact of the
review: the report is this run's output, and the caller's record is the
caller's.

## Remember

- The built-in once per tree, at the keyed tier, with `--max-findings
  all` and never `--fix`.
- A built-in or a pass that did not run is said, never passed off as
  a clean review.
- Every finding is held against the record read whole; a settled one is
  dropped only where it makes no case against the settlement.
- A finding's class is keyed on its source, and where two sources
  disagree the report class wins.
- No cap on what the result carries.
