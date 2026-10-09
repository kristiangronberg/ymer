---
name: implement
description: Use to execute the hardened implementation plan task by task — normally ending at a commit on the topic branch and implemented.md, with review next over the real diff; a plan whose design gives out closes by iterating instead. Phase 6 of the development process.
---

# Implementing

This file is the implement skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics).*

The plan is the single source of truth and already contains the method:
ordered bite-sized tasks, complete code, exact commands, expected output.
This skill adds only a readiness gate at the start, guardrails during, and
the phase boundary at the end — the session's budget belongs to the
implementation itself. The phase ends where the change is built: a
commit on the topic branch, plus a machinery commit wherever the session
edited machinery — one machinery tree or several, committed per tree
(topic kinds: development-process § Topic kinds) — a meta topic has only
the latter — recorded in `implemented.md`. The close
then runs the **lens pass** over what it just committed and leaves the
findings in `review.md`, so the review sitting opens on findings rather
than on a wait. Nothing
ships here — inspecting the real diff and making it official is
**review**'s whole subject, the next phase.

**Announce at start:** "I'm using the implement skill to execute the plan for <topic>."

- (Repo-specific preferences in CLAUDE.md override these defaults)

## Readiness Gate

*Read with this section: `mechanics.md` § Readiness Gate (the mechanics).*

The plan is written for an engineer with zero context and is
self-contained; read `spec.md` only when a task's intent is unclear.

## Companion Skill

The plan header says which coding-standards skill its work must follow,
or that none was found — read a named skill before the first task. A
header with neither line predates that rule: look for one the way
write-plan § Language-specific companion skills does, and proceed with
the plan alone when none turns up.

## Execution

*Read with this section: `mechanics.md` § Execution (the mechanics).*

- **Tasks in order, steps as written.** Run every verification step
  literally — including "run the test to verify it fails". Skipping a
  verification and assuming its outcome is an implementation failure.
  A step's `<the payload verifier>` is `sh ${CLAUDE_PLUGIN_ROOT}/scripts/payload-verify`
  run on the topic directory, with one `--exempt <tree>` per machinery
  tree the front binds.

- **A notebook backup before a store change.** Before the first step that
  applies a payload to the node's notebook, or runs DDL, an `UPDATE` or a
  `DELETE` there, take a notebook backup and note its id in
  `implemented.md` (the operations contract, § Changing the notebook).

- **Straight through.** A brief progress note per task; no pause at
  the end either — the close runs straight through, no user gate, lens
  pass included, and the human meets the real diff in review. Do not ask
  for approval between tasks.
- **Nothing outside the plan gets built.** An improvement or problem
  noticed along the way is recorded for `implemented.md` — never done
  ad hoc.
- **The glossary is read-only.** A term mismatch discovered here is
  flagged in `implemented.md`, not fixed.

## Drift Valve

*Read with this section: `mechanics.md` § Drift Valve (the mechanics) and `cases.md` § Drift Valve (the cases).*

When reality contradicts the plan:

- **Mechanical drift** — an anchor moved, a rename, a signature differing
  in detail but not in shape: fix it, edit the correction into `plan.md`
  so the plan stays the accurate record of what was built, and keep
  going. A correction whose content is a payload's lands in the payload
  file the same way — the payload stays the plan's current truth — and
  its gate re-runs green before moving on. A correction that gives the
  plan a **new target** — a file no manifest row and no step named until
  now — brings gate 3's per-file cleanliness check with it: read that one
  file's status in its own tree, at the moment the target is added, on
  the same terms the gate states (→ Readiness Gate, gate 3). That
  window opens only when
  the plan was wrong: a botched apply — landed bytes differing from the
  payload file — is redone from the file, never written back into it;
  editing the payload to match what landed greens its gate vacuously,
  and so does lowering a manifest gate's `expected` count to what
  landed — the count is the plan's promise, never a reading of the
  tree.
- **Approach-level problem** — the plan's design cannot work as written,
  or a decision has to be remade: this is an **iteration**, and it forks
  on the same derived fact review's dispositions fork on (charter:
  development-process, *Iteration*). **The decision is already made** —
  you are at the code, the third option is clear and you are confident:
  **decide-forward** in place. Write the dated amendment into the
  artifact that owns the statement — the decision's entry in `spec.md`
  (define § The Spec) or its home site in `plan.md` (write-plan § Task
  Structure) — sweep the decision's footprint in this same session, per
  the recipe that home carries, make the edit, and keep implementing;
  the edit rides this topic's normal review. A footprint that resists
  mechanical correction says the decision was not made after all: take
  the open branch instead. **The decision is open**: stop the session —
  and the stop is a **close**, not an abandonment. Name the phase the
  route rule gives — the one owning the artifact where the contested
  statement lives, never write-plan by default — and run the four close
  steps in order, at `mechanics.md § Drift Valve`.

## Verify

*Read with this section: `cases.md` § Verify (the cases).*

After the last task, exercise the changed behavior end-to-end yourself,
beyond the plan's per-step test runs. A failure here re-enters the drift
valve — a mechanical fix, a decide-forward in place, or a stop at the
phase the route rule names.

## Self-Review (inline)

Calibration: only flag what would make the record a lie.

1. Every ticked box backed by a verification actually run this session?
2. Full test suite green?
3. Every drift correction edited into `plan.md`?
4. Anything built that the plan does not contain — or anything in the plan
   not built?

Fix issues inline and move on — no re-review loop.

## Phase Close

*Read with this section: `mechanics.md` § Phase Close (the mechanics).*

1. **Commit whatever the last task left** (Claude-run; public
   register — imperative subject, no topic IDs or phase names). On the
   ordinary path there is nothing to commit: § Execution commits each task
   as it closes, so the tree is already clean, still on `<topic>`, and this
   step verifies that — an empty `git status --short` means the add/commit
   line is skipped, not that the close failed.

   ```
   git rev-parse -q --verify MERGE_HEAD   # assert: no output, exit 1 — output → stop and ask
   git status --short          # nothing listed → nothing to commit, skip the next line
   git add -A && git commit -m "<imperative subject ≈50 chars>"
   git log --oneline -1        # this close's commit if one landed, else the
                               # last task's — either way the ref → implemented.md
   ```

   `git add -A` is the whole of it — a project checkout is read and
   committed whole (the substrate contract), and every path in it is this
   topic's by construction. The branch stays: no squash, no merge, no
   delete — review's ship does those.

2. **Run the lens pass** over the increment just committed — on a
   code-repo topic the branch's own commits since main, every task commit
   § Execution made and never the last one alone, plus every machinery
   commit — the
   code-review run with `--fix` that review has always run, pre-executed
   here so the human meets findings instead of a wait. **The procedure
   is review's and is not restated**: the precondition, the subject
   computation, the `--fix` content rules, where fixes land and what
   their commit and re-green owe all live at review § The lens pass,
   operated from here by pointer, the way the drift valve operates the
   iteration marker. What belongs to this close is only where the pass
   sits — after the commits above, so every ref it covers is already
   durable, and before the record below, so nothing it produces is left
   in context.

   A second fact the pointer needs: the subject's left edge is the
   record's newest `Reviewed:` anchor — `main` on a first cycle — never
   this session's own first commit. An earlier close's fix commits are
   recorded work no `Reviewed:` line names, so they stay in the subject
   by construction, and a pass anchored on "the commits this session
   added" skips exactly them. The close's report prints that anchor
   beside the range it diffed (`<anchor>..HEAD`), so a wrong left edge is
   visible rather than silent.

   One fact the pointer needs from here: the fixes' commit(s) are
   ordinary commits of this close — the branch fix commit on a code-repo
   topic, a further machinery commit, per tree, where machinery files were
   fixed, public register,
   every ref onto the entry's fixes line and onto no other store;
   several machinery
   commits per topic were always fine, so nothing new is permitted here. The re-green
   after them is recorded on that same line (grammar: review
   § The Close), and a red one is a finding there besides — never a stop
   and never the drift valve.

3. **Consume the marker, then write the `## Review` entry.** Where
   `review.md`'s first recognizer is an `Iteration —` marker, whatever
   phase it names, first append `Consumed — <YYYY-MM-DD> by implement`
   to the end of its block (grammar: review § Input item 2). Then write the
   `## Review` entry into `review.md` in the topic
   directory — the pass's findings on disk, before this session goes
   further. The grammar is review's, whoever writes it (review § The
   Close), exactly as the drift valve's marker is: the `## Review —
   <date>` heading dated today, the lens-pass line with its coverage
   slot, the `Fixes applied (--fix):` line carrying its `re-green:`
   result where fixes landed, the `Refuted/skipped:` line, then the
   findings list with dispositions still to come — of the pass's lines a
   dropped pass writes the first alone, none of the rest written `none`,
   and it seeds the findings list with nothing (review § The Close). No
   file yet → create
   it as the title line
   plus the entry; one exists → prepend the entry above what is there,
   title kept. **No ref lines**: `Reviewed:` and `Unreviewed:` are the
   iterate and wait closes' writes and this close is neither — the fix
   commits reach the next delta from this entry's own fixes line, their
   store (the collection: review § The lens pass, step 1).

   A pass that found nothing still writes the entry, and so does one
   that recorded `Lens pass: dropped — no diff or change set`: that line is what
   review's pre-flight forks on (review § Input, item 2), and its
   absence sends the next session into a fallback pass it does not owe.

   **Verify what landed** — re-read the written entry rather than the
   intent: every line the entry-writer's shape names — the lens-pass
   line, the fixes line, `Refuted/skipped:`, the findings list — is
   present, in its order, with the `re-green:` result wherever fixes
   were applied, and the review-owned lines — Walkthrough, Fitness,
   Where-to-look, Tails — are **absent**, never placeholders (review
   § The Close: a placeholder there reads to review's pre-flight as an
   answer); a dropped pass meets the check by its own exemption (review
   § The Close). A miss or an excess is repaired here, in this step —
   the next session reads the record, never this one's memory.

4. **Write `implemented.md`** in the topic directory — this phase's own
   record (every phase has one): what the plan and the code don't
   already say. Deviations from the plan during implementation and why;
   mishaps or surprises; anything noticed but deliberately not done
   (follow-ups — capture them, one invocation of the `ymer:capture`
   skill, source `implement`, handing each over as an observed drop —
   an `idea` for work left undone, a `bug` for something seen broken —
   and list each here with the id capture reports); the final
   verification result (suite green, live smoke); the **pre-flight**
   gate #4 ran — own commits found, main's delta, the stash entry where
   the tree was dirty, and the catch-up's outcome: a fast-forward, the
   merge ref (with a conflict's resolution where one arose), or an
   already-up-to-date no-op where main had not moved; and the topic's
   durable refs — for a code-repo topic **every task commit** § Execution
   made plus whatever step 1 added,
   plus **every machinery commit ref** the
   session made — marked per machinery tree,
   several in one tree where the session made several — **the lens
   pass's own fix commits excepted**, whichever session ran the pass:
   those refs are the `## Review` entry's fixes line's (define's glossary
   commit is already in the spec's glossary delta). The refs here are not
   bookkeeping: this file is one of the traceability stores the charter's
   machinery-traceability ground rule names (development-process
   § Process ground rules), and a later delta's subject is computed from
   those stores — so a ref missing here is work no pass will ever see.
   Keep it short — the blow-by-blow is in the ticked
   `plan.md` and git; this is the "what actually happened vs. the plan"
   note, and review reads it as walkthrough material.

5. **Commit the phase's writes** (the ticked plan, `implemented.md`, and
   the `review.md` step 3 wrote) in the state folder, pathspec-scoped. The
   state folder is a **shared tree** like every machinery tree, and
   its commit is keyed the same way — **scoped to what this topic wrote
   in it**: the topic folder, which every phase writes, **plus each file
   outside that folder the plan names or this session edited**. The
   plan's names are the ones gate #3 already read — the paths its
   `payloads/manifest` names, plus any target its steps name — and a
   drift-valve addition is one of this session's edits (contract:
   the substrate contract, "Stage by explicit path only").
   A topic that wrote nothing outside its folder commits the folder
   alone, and the commands below reduce to the pathspec they have always
   carried.

   ```
   git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/ <each such file>
   git -C <state folder> commit -m "YYYY-MM-DD-<topic>: implement" \
       -- <repo>/YYYY/MM-DD-<topic>/ <each such file>
   ```

   Both halves carry the same pathspec, never `-A`: the add alone scopes
   the add, while a concurrent session's already-*staged* path still
   rides a bare commit in this shared tree.

   **Where such a file also carries a foreign edit** — a state-folder
   file outside the topic folder is the one place two sessions touch
   the same bytes (the substrate contract) — the commit becomes a
   **composite**,
   and it is the one state-folder commit that ends **without** a pathspec: the
   by-hunk recipe's commit half is bare by construction, because
   `git commit -- <the mixed file>` would commit that file whole, foreign
   hunk included (recipe: the substrate contract):

   ```
   git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/ <each such file carrying no foreign edit>
   git -C <state folder> reset -- <the mixed file>      # only if it is already staged: the diff below must be taken unstaged
   git -C <state folder> diff -U0 -- <the mixed file>   # cut this session's own hunks into <patch>: hand-written from the hunks you keep, never the whole diff redirected
   git -C <state folder> apply --cached --unidiff-zero <patch>
   git -C <state folder> diff --cached --stat           # assert: the topic folder and each such file, nothing else
   git -C <state folder> commit -m "YYYY-MM-DD-<topic>: implement"
   ```

   The reset, diff and apply run once per mixed file; the plain files
   ride the first `add` beside the folder. That `--stat` assertion is a
   stop, not a formality: a concurrent
   session's already-staged path listed there would ride the bare
   commit — stop and ask, never commit around it and never drop it.

   Verify **on the same list**, never on the topic folder alone — a check
   keyed like the old folder-only step is blind to exactly the omission
   this keying exists to prevent:

   ```
   git -C <state folder> status --short -- <repo>/YYYY/MM-DD-<topic>/ <each such file>
   ```

   Expect no output for the topic folder and for every named file
   committed on the plain path above. A file committed through the
   composite is the one exception: it still carries the foreign hunk
   this close deliberately left uncommitted for the other session, so
   one ` M ` row per such file is the correct outcome, not a stop.
   Assert that residual positively rather than waving it through —
   `git -C <state folder> diff -- <the mixed file>` shows the foreign
   hunk and **none** of this session's own edits, which the composite
   already put in HEAD — and never re-stage or re-commit the file to
   silence the row: that sweep is the record loss this recipe exists to
   prevent. Foreign dirty paths elsewhere in the repo, outside this
   pathspec, stay listed by an unscoped `status` and are not a stop
   either — other topics' in-flight work, leave them (concurrent edits:
   the substrate contract).

6. **Capture block:** invoke the `ymer:capture` skill — source
   `implement`. The battery, the drop grammar and the write live in that
   skill alone.

## Next Phase

Name the next phase, in a fresh session — **review** where this session
implemented, the phase the marker names where it stopped at the drift
valve; the topic's task stays
`doing` until review's closure. The terminal report states the
deviations made, the verification result, the refs recorded (every task
commit, any commit step 1 added, any machinery commits — one machinery
tree or several — and the lens pass's own fix commits),
**the stash entry** where gate #4 made one — its message, and whether the
dirt was recognisably this topic's own torn fragment, since that tells the
user the entry is safe to drop —
and **what the lens pass did** — the `## Review` entry it wrote, how
many findings it left for review's dispositions, and which fixes it
applied, or that the pass was dropped for want of a diff or a change set — and lists
every pending step with
its command written out (report rule: *Defaults and holds*) — normally
none on a code-repo topic: the branch is local and nothing has reached
main. A session that made machinery edits lands each machinery commit on
its tree's own main, so its report lists a push per tree — `git push` from
each machinery tree it committed in; the user's alone. **A
session that stopped at the drift valve** reports differently: what the
plan could not do, the marker it wrote, the refs on its `Unreviewed:`
line, and the same pushes where it committed machinery — `plan.md`'s ticks
are where the work stands, at a task boundary. One
phase per session; the artifact this session leaves — `implemented.md`
and the findings beside it, or the marker after a stop — is the
compaction boundary: do not invoke the next skill.

## Remember

- The plan is the method — this skill gates, guards, and closes
- A box is ticked only by a verification that actually ran — and, on a code-repo topic, only once the task's bytes are committed on the branch; the task's boxes tick together at its commit, and a task that writes no file has no bytes and no commit, so it ticks on its verification alone
- Mechanical drift is fixed and edited into the plan; an approach change is an iteration — decide-forward in place when the decision is already made, otherwise the session stops, and the stop is a close: machinery commit (per tree), the marker plus its `Unreviewed:` line into `review.md`, state-folder commit, capture block — and no `implemented.md`
- Nothing outside the plan gets built — record it, don't do it
- No user gate at the end: the close runs straight through, lens pass included, and the human meets the real diff in review
- The phase ends with the branch carrying a commit per task that wrote files (a meta topic has none), plus a machinery commit wherever the session edited machinery — one machinery tree or several, committed per tree — public-register message; then the lens pass over what was just committed, its fixes on their own commit(s), and its findings into `review.md`'s `## Review` entry — no squash, no merge, no branch delete, no task close, those are review's ship
- The lens pass's procedure is review's, operated here by pointer (review § The lens pass); this close owns only where the pass sits, its fix commits, and the entry it writes
- `implemented.md` records deviations, mishaps, follow-ups (each captured as a drop), verification, the pre-flight's stash and catch-up, and the durable refs — every task commit, plus every machinery commit ref, per tree, the lens pass's own fix commits excepted: those ride the `## Review` entry's fixes line
- Every pre-flight in a project checkout stashes what it finds and then catches up, with no exception for a session that picks the plan up mid-way: it restarts at a task boundary with a clean branch behind it
- Next is review, in a fresh session; the task stays `doing` until its closure
