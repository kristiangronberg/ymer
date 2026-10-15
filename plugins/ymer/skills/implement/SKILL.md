---
name: implement
description: Builds what a reviewed implementation plan describes, task by task: checks that the plan and the code checkout are ready, carries out each task's edits and checks exactly as written, and stops to send the work back when the plan's design does not hold. It ends with the work committed, a record of what happened, and a first code review waiting. Use once a plan has passed plan-review, before the work is reviewed.
---

# Implementing

Implement builds what a hardened plan describes. The plan already holds
the method: ordered small tasks, every edit's content in a payload file,
and exact commands with their expected output. Implement adds what the
plan cannot. It checks that the plan is the reviewed one and that the
checkout is ready, carries the tasks out as written, keeps the plan the
true record where reality differs in detail, and stops to send the topic
back where the design itself gives out. At its close it commits the
work, runs the first code review over it, and writes down what happened.
Nothing ships here: making the change official is review's, the next
phase.

This file is implement's spine: its intent and its moments in order. Its
**mechanics** (the Claude Code way: git, the state folder, the harness's
tools) are in `mechanics.md`, and its **cases** (the earned precision:
edge cases, exceptions and rulings) are in `cases.md`, both under this
file's headings. A section with entries there says so in its first line,
and those entries are read when the section runs.

## Overview

**Read the plugin glossary's entries for implement's vocabulary now**,
unless already read this session: `${CLAUDE_PLUGIN_ROOT}/glossary.md`,
each entry by its heading: *pre-flight*, *catch-up*, *iteration*,
*decide-forward*, *lens pass*, *change set*, *payload*, *payload gate*,
*payload verifier*, *gated step*, *step ID*, *plan complete*, *machinery
tree*, *shared tree*, *project checkout*, *traceability store*, *gated
moment*, *hold*, *amendment marker*, *workflow-internal reference*. This
file uses those terms and never defines them.

The phase ends where the change is built: a commit per task on the topic
branch, plus a machinery commit per tree wherever the session edited
machinery (a meta topic has only those), all recorded in
`implemented.md`. The close then runs the lens pass over what it just
committed and leaves the findings in `review.md`, so the review sitting
opens on findings rather than on a wait.

The session runs straight through: a brief progress note per task, no
approval asked between tasks, and no user gate at the close. The human
meets the real diff in review, and a "proceed?" here would be a round
trip every topic pays twice.

The run goes in order: read the plan and confirm this phase is due,
ready the trees, carry out the tasks, verify the change end to end, then
close: commit, lens pass, review entry, record, state-folder commit and
capture.

**Announce at start:** "I'm using the implement skill to execute the
plan for <topic>." Repo-specific preferences in a repo's `CLAUDE.md`
override this skill's defaults.

## Input

*Read with this section: `mechanics.md` § Input (the mechanics).*

Input reads the plan and decides whether this session runs at all.

**Read the process contract's § Defaults and holds now, and the
operations contract whole**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`. They hold the
pre-flight, close binding, gate defaults and holds, the fallback rule
and the report rule; and the topic's folder, how the state folder's kind
is read and what a state folder in no git repository skips, the status
ladder with its `Hardened —` line, and the backup a notebook change
takes.

Find the topic folder through the topic's task (*look up topic*,
binding: the operations contract; `mechanics.md` § Input), and read the
state folder's kind as the operations contract gives it: implement has
no guard, so this is the session's one reading. The pre-flight's
derivation of pending steps runs first, as the process contract's
§ Defaults and holds gives it. Then three reads, in this order, each a
stop that names the missing phase, with nothing to ask:

1. **The plan exists.** No `plan.md` in the topic folder: stop and name
   write-plan.
2. **This phase is due.** Read `review.md`'s first recognizer top-down
   (the review skill, § Recognizers). Where it is an `Iteration —`
   marker, **read the process contract's § Iteration now**, unless
   already read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`,
   for the marker's block, its `Consumed —` lines, whether the route is
   live or consumed, and which phase it makes due. A live marker naming another
   phase: stop and name that phase. A live marker naming implement: this
   session is that re-entry, and its close consumes the marker. A
   consumed marker: where implement is due, or the block's last line is
   `by implement`, go on; any other phase due, stop and name it. A `##
   Review` entry, a `## Shipped` section or no `review.md` at all: go
   on. This read comes first because a live marker naming another phase
   stands beside a plan and its `Hardened —` line, so only this read
   catches it. It reads `review.md` alone, never the task's status.
3. **The plan is the reviewed one.** Read the head of `plan.md` for
   plan-review's `Hardened —` line, the `hardened` rung of the
   operations contract's status ladder. Present: go on. Absent: the plan
   in front of this session is not the plan that was reviewed, or was
   never reviewed: stop and name plan-review.

The plan is written for an engineer with no context and stands alone:
read `spec.md` only where a task's intent is unclear. Its tasks end
where its `## Plan review` section begins: that section is plan-review's
run record, carries no box, and is read past.

**The companion skill.** The plan header names the coding-standards
skill its work must follow, or says that none was found. Read a named
skill before the first task. Where the header carries neither line, look
for one as write-plan's § Language-specific companion skills does, and
go on with the plan alone where none turns up.

## Readiness Gate

*Read with this section: `mechanics.md` § Readiness Gate (the mechanics).*

The Readiness Gate runs the pre-flight's readiness checks (term: the
plugin glossary) on the trees, before any task edits a file.

**Read the substrate contract whole now, and the process contract's §
Topic kinds and § The traceability stores**, unless already read this
session: `${CLAUDE_PLUGIN_ROOT}/substrate-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. They hold the two tree
options, the project checkout's pre-flight steps with the catch-up's
outcomes and how its conflicts are classed, git is never guessed,
staging by explicit path, concurrent edits on a shared tree, committing
by hunk and the commit registers; the topic kinds and the duty to commit
machinery edits; and the list of traceability stores the record names
its refs in.

- **The trees the plan targets are ready.** Which trees are read is
  keyed on the plan's targets, never on the topic kind: the paths
  `payloads/manifest` names, plus any target a step names. How each is
  read is keyed on its tree option. A project checkout is read whole,
  and its dirt is stashed by the pre-flight below, never a stop. A
  shared tree is read scoped to the plan's targets in it (`mechanics.md`
  § Readiness Gate), except a state folder in no git repository, the
  kind read at Input: its files are the record, so it is not read. A
  dirty target in a shared tree is the one question this check asks the
  user, and the substrate contract's § Concurrent edits on a shared tree
  says what each answer means. **Hold: the concurrent
  session's own commit.** Absent the user's answer, the session names
  the target and stops.
- **The project-checkout pre-flight**, on a code-repo topic; a meta
  topic has no branch and skips it. It runs the substrate contract's
  steps in the order `mechanics.md` § Readiness Gate gives, and before
  anything else runs, its record-names-it test reads the branch's own
  commits: a commit no record names is the user's sketch, so stop before
  the stash and re-report the pending reset. A conflict in the catch-up
  is classed as the substrate contract's § Project checkout says.
  **Default: absent the answer by the close, `git merge --abort`, which
  restores the pre-merge tip and destroys nothing; record the conflict
  (the paths, the decision, main's ref) and take the stop at the drift
  valve, naming the phase that owns the decision — review post-hoc at
  `review.md`'s marker** (the process contract, § Defaults and holds).
- **The baseline is measured.** The plan's own whole-tree verification
  command, the one its last task names, runs once here, after the
  catch-up and before the first edit. Its result is the session's
  inherited baseline, the plan's `Expected:` lines are read against it,
  and the final run reads as a delta against a measured start. A red the
  plan's fact sheet names is the expected start; one it does not name is
  a finding for the opening message, never discovered at the last task.
  A plan naming no whole-tree command runs none.

## Execution

*Read with this section: `mechanics.md` § Execution (the mechanics) and `cases.md` § Execution (the cases).*

Execution carries the tasks out in order, every step as written.

**Read the process contract's § The payload contract now, and the
payload verifier's header**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/scripts/payload-verify` (its opening comment).
They hold where payloads live and who writes them, the manifest and its
one gate per payload, and how the verifier reads progress from the
plan's ticked boxes and reports PASS, PENDING and FAIL.

- **Every verification runs literally**, "run the test to verify it
  fails" included. Skipping a verification and assuming its outcome is
  an implementation failure.
- **A payload is applied from its file**: Read the file and write its
  bytes out through the file-edit tools, never retyped from memory or
  rebuilt from the plan's prose.
- **The payload verifier**, where a step names `<the payload verifier>`,
  is `sh ${CLAUDE_PLUGIN_ROOT}/scripts/payload-verify` run on the topic
  folder, with one `--exempt <tree>` per machinery tree the front binds.
  A FAIL on an earlier, ticked step is the clobber signal or, with the
  plan complete, an occurrence no gated step landed in full; the
  verifier keeps no history, so the target's own history tells which.
  Either way, enter the drift valve.
- **A task ends at its commit, and its boxes tick after it.** On a
  code-repo topic, once the task's verifications before its verifier
  step have passed, commit its bytes on the topic branch (`mechanics.md`
  § Execution), tick the task's boxes but the verifier step's, then run
  the verifier step, and tick its box when its `Expected:` holds. Ticks
  never run ahead of the branch: the next pre-flight stashes what is
  uncommitted, and a tick over uncommitted bytes would send a resuming
  session past work no longer in the tree. So the first unticked box is
  a task boundary or, at most, the verifier step of a task already
  committed, and a torn session leaves at most the current task's
  fragment, which the next pre-flight stashes. A task that writes
  no file in the checkout, verification-only or with its files all in
  shared trees, ticks as its last verification passes and runs its
  verifier step then, and so does every task of a meta topic, which has
  no branch: the tick lives in `plan.md` in the state folder, and a
  shared tree is never stashed, so nothing a later pre-flight could bury
  is at risk.
- **The plan's gates are sweeps.** Before the first sweep a task runs,
  **read the sweep skill's § 2. Corpus and § 4. Survivors now**, unless
  already read this session:
  `${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md` (§ 2. Corpus:
  everything, minus exclusions you name; § 4. Survivors: every gate must
  be able to fail), for the corpus a sweep covers and the pairing every
  zero-hit gate carries. What implement does with them is in `cases.md`
  § Execution.
- **A notebook backup before a notebook change.** Before the first step
  that applies a payload to the node's notebook, or runs DDL, an
  `UPDATE` or a `DELETE` there, take a backup as the operations
  contract's § Changing the notebook says, and note its id in
  `implemented.md`.
- **Nothing outside the plan gets built.** An improvement or a problem
  noticed along the way is recorded for `implemented.md`, never done ad
  hoc. The glossary is read-only here: a term mismatch is flagged in
  `implemented.md`, not fixed.

## Drift Valve

*Read with this section: `mechanics.md` § Drift Valve (the mechanics) and `cases.md` § Drift Valve (the cases).*

The drift valve decides what happens when reality contradicts the plan.

- **Mechanical drift**: an anchor moved, a rename, a signature that
  differs in detail but not in shape. Fix it, edit the correction into
  `plan.md` so the plan stays the true record of what was built, and go
  on. A correction to a payload's content lands in the payload file the
  same way, and its gate re-runs green before the next step. A
  correction that gives the plan a new target, a file no manifest line
  or step named, brings the Readiness Gate's read of that one file with
  it, in its own tree, the moment the target is added. That window opens
  only where the plan was wrong. A botched apply, landed bytes that
  differ from the payload file, is redone from the file, never written
  back into it: editing the payload to match what landed greens its gate
  vacuously, and so does lowering a manifest count to what landed, since
  the count is the plan's promise, never a reading of the tree.
- **An approach-level problem**: the plan's design cannot work as
  written, or a decision has to be remade. This is an iteration. **Read
  the process contract's § Iteration now**, unless already read this
  session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the route,
  the executor's fork on whether the new decision is already made,
  decide-forward's amendment and footprint sweep, and the marker's
  block. Implement's own actions, by branch:
  - **Decide-forward**, where the decision is made. **Read the
    amendment's home now**, unless already read this session:
    write-plan's § Task Structure in
    `${CLAUDE_PLUGIN_ROOT}/skills/write-plan/SKILL.md` and
    `${CLAUDE_PLUGIN_ROOT}/skills/write-plan/cases.md`, for the amendment
    marker and the footprint recipe, on either side; and where the
    statement lives in `spec.md`, define's § The Spec in
    `${CLAUDE_PLUGIN_ROOT}/skills/define/SKILL.md` and
    `${CLAUDE_PLUGIN_ROOT}/skills/define/cases.md`, for the spec-side
    marker and the same-session sweep it carries. Write
    the dated amendment at the decision's home, sweep its footprint in
    this session, make the edit and go on implementing: the edit rides
    this topic's normal review. A footprint that resists mechanical
    correction says the decision was not made: take the stop.
  - **The stop**, where the decision is open. The session ends, and the
    stop runs as a close, never an abandonment. It names the phase the
    route gives, never write-plan by default. **Read the review skill's
    § Iterate — the re-entry close and § The Close now**, unless already
    read this session: `${CLAUDE_PLUGIN_ROOT}/skills/review/SKILL.md`,
    for the marker line's grammar and the `Unreviewed:` line's rule. The
    stop's own steps, in order (`mechanics.md` § Drift Valve): commit
    this session's machinery edits, per tree; write the marker with its
    `Unreviewed:` line into `review.md`, the line naming every commit
    this session made, its task commits on the branch among them, and
    `none` only where it committed nothing; commit the phase's writes in
    the state folder, where git keeps its history; and run the capture
    block. It writes no `implemented.md`: nothing was implemented to
    record.

## Verify

Verify checks the change end to end. After the last task, exercise the
changed behaviour yourself, beyond the plan's per-step runs; a sweep
built here follows § Execution's sweep rules. A failure re-enters the
drift valve: a mechanical fix, a decide-forward in place, or the stop at
the phase the route names.

## Self-Review (inline)

Self-review asks one question of the record: would it lie? Flag only
that.

1. Is every ticked box backed by its own verification, run and passed at
   that box's step, never by a pass observed at another step?
2. Is the full test suite green?
3. Is every drift correction edited into `plan.md`?
4. Was anything built that the plan does not contain, or anything in the
   plan not built?

Fix issues inline and move on: there is no re-review loop.

## Phase Close

*Read with this section: `mechanics.md` § Phase Close (the mechanics) and `cases.md` § Phase Close (the cases).*

The close makes the work durable, reviews it once, and leaves the
record. It runs under the process contract's close binding (§ Defaults
and holds), in the order of the sections below: the work's commits, the
branch's and each machinery tree's, land before the lens pass, so every
ref the pass covers is already durable, and the pass's findings are on
disk before the record is written.

### The commit

On a code-repo topic each task committed as it closed, so the tree is
normally clean and on the topic branch: this step verifies that, and
commits whatever the last task left (`mechanics.md` § Phase Close). The
branch commit is Claude-run, in the public register (the substrate
contract, § Commit registers). The branch stays: no squash, no merge
and no delete, which are review's ship. Where this session edited
machinery, on either kind of topic, each tree it edited takes its
machinery commit here, the duty the process contract's § Topic kinds
names, in the public register, staged as the substrate contract's
§ Stage by explicit path only and § Committing by hunk say. A meta
topic's machinery commits stand where the branch commit would.

### The lens pass

**Read the process contract's § Review effort now**, unless already read
this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for lens
applicability, how a dropped lens is reported, and the risk profile that
keys a tier. The traceability stores the pass collects refs from are the
process contract's § The traceability stores, read at the Readiness
Gate. Then **read the review skill's § The lens pass now**, unless
already read this session, in
`${CLAUDE_PLUGIN_ROOT}/skills/review/SKILL.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/review/mechanics.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/review/cases.md`, for the pass's whole
procedure: its precondition, the subject with its left edge, the `--fix`
run, where implement's fixes land and how they are committed, and the
re-green.

Run the pass over the increment just committed, pre-executed here so
review opens on findings. This close owns only where the pass sits, its
fix commits and the entry below; the procedure is review's. A red
re-green is a finding for review, never a stop and never the drift
valve. The terminal report prints the subject's left edge beside what
it diffed, per tree (`<anchor>..HEAD` on the branch, the ref list in
each machinery tree), so a wrong edge shows rather than hides.

### The review entry

**Read the review skill's § The Close now**, unless already read this
session, in `${CLAUDE_PLUGIN_ROOT}/skills/review/SKILL.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/review/cases.md`, for the entry's grammar:
its lines and their order, what a dropped pass writes, and the
review-owned lines that stay absent.

Where `review.md`'s first recognizer is an `Iteration —` marker,
whatever phase it names, first append `Consumed — <YYYY-MM-DD> by
implement` to the end of its block (the process contract, § Iteration).
Then write the pass's `## Review — <YYYY-MM-DD>` entry, dated today. No
file yet: create it as the title line plus the entry. One exists:
prepend the entry under the title. The entry carries no ref lines:
`Reviewed:` and `Unreviewed:` are the iterate and wait closes' lines,
and the fix commits reach the next delta from the entry's fixes line.

A pass that found nothing still writes the entry, and so does one that
recorded `Lens pass: dropped — no diff or change set`: that line is what
review's pre-flight forks on, and its absence would send the next
session into a fallback pass it does not owe.

Then read the written entry back against the grammar, never against the
intent: every line the pass owes present and in order, the `re-green:`
clause wherever fixes landed, and every review-owned line absent, never
a placeholder. A miss or an excess is repaired here: the next session
reads the record, never this one's memory.

### The record

Write `implemented.md` in the topic folder: implement's record of what
the plan and the code do not already say, which review reads as
walkthrough material. Keep it short; the ticked `plan.md` and git hold
the blow-by-blow. It records:

- the deviations from the plan, and why;
- mishaps and surprises;
- what was noticed and deliberately not built, each captured as a drop
  through one invocation of the `ymer:capture` skill, source `implement`
  (an `idea` for work left undone, a `bug` for something seen broken),
  and listed here with the id capture reports;
- the final verification result: the suite and the end-to-end run;
- what the pre-flight found: the branch's own commits, main's delta, the
  stash entry where the tree was dirty, and the catch-up's outcome;
- the notebook backup's id, where one was taken;
- the topic's refs, `implemented.md`'s share of the process contract's §
  The traceability stores: every task commit, the close's own commit
  where one landed, and every machinery commit, per tree. A ref missing
  here is work no later pass will see.

### The state-folder commit

Commit the phase's writes in the state folder, where git keeps its
history: the ticked plan, `implemented.md` and `review.md`. Where the
files are the record, each save already is the record, and this step
runs nothing (the operations contract, § The topic's artifacts). The
state folder is a shared tree, so the commit is scoped to what this
topic wrote there: the topic folder, plus each file outside it that the
plan names or this session edited (`mechanics.md` § Phase Close). Its
message is `<topic ID>: implement`, in the internal register.

### The capture block

Invoke the `ymer:capture` skill, source `implement`: the battery, the
drop grammar and the write live in that skill alone.

## Next Phase

Name the next phase, for a fresh session, and stop: review where this
session implemented, or the phase the marker names where it took the
stop at the drift valve. The topic's task stays `doing` until review
closes it. One phase per session: what this session leaves,
`implemented.md` with the findings beside it or the marker after a stop,
is the compaction boundary, so do not invoke the next skill.

The terminal report names, as the process contract's report rule asks:

- the deviations made and the verification result;
- the refs recorded: every task commit, the close's own commit, each
  machinery commit, and the lens pass's fix commits;
- the stash entry, where the pre-flight made one: its message, and
  whether the dirt was recognisably this topic's own torn fragment, so
  the user knows the entry is safe to drop;
- what the lens pass did: the entry it wrote, how many findings it left
  for review, the fixes it applied and the range it diffed with its left
  edge, or that it was dropped for want of a diff or a change set;
- every pending step with its command written out: normally none for the
  branch, which is local, and a `git push` from each machinery tree the
  session committed in, the user's alone.

A session that took the stop reports what the plan could not do, the
marker it wrote, the refs on its `Unreviewed:` line, the current task's
uncommitted fragment, and the same pushes. `plan.md`'s ticks show where
the work stands.

## Remember

- The plan is the method: this skill checks, guards and closes.
- A box is ticked only by a verification that ran and passed; on a
  code-repo topic a task's boxes tick after its commit, its verifier
  step's last.
- Mechanical drift is fixed and edited into the plan. An approach change
  is an iteration: decide-forward where the decision is made, otherwise
  the stop, which runs as a close and writes no `implemented.md`.
- Nothing outside the plan gets built: record it, never build it.
- No user gate at the end: the close runs straight through, lens pass
  included, and the human meets the real diff in review.
- The lens pass's procedure is review's; this close owns where it sits,
  its fix commits and the entry it writes.
- Every pre-flight in a project checkout stashes what it finds and
  catches up, a session picking the plan up mid-way included: it
  restarts at a task boundary.
- Next is review, in a fresh session; the task stays `doing` until
  review closes it.
