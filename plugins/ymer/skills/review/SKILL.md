---
name: review
description: Use to inspect a topic's real increment after implement — the lens pass read from the record (run in-session only as the fallback), the walkthrough, dispositions, and one of three closes (ship, iterate, wait) — phase 7 of the development process, the last phase; its closure ships the topic and writes review.md. Also the iterate close, taken when the record is contested or exceeded.
---

# Review

This file is the review skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

## Overview

Phase 7 of the development process, the last: the session that inspects
the real increment implement left behind and decides what becomes of
it. Three movements — the **lens pass** (code-review with `--fix` over
the diff, normally pre-executed at implement's close and read here from
the record), the **walkthrough** (the facilitator's story-ordered read of
the real code in **stops**), and **dispositions** of every finding —
then the closing **fitness question** over the whole increment, and one
of three closes: **ship**, **iterate**, or **wait**. The pass runs
in-session only where the record holds none of it (→ Input, item 2).
Implement
commits the change where it is built; this phase's closure is what
makes it official. The subject is the code as it is — what it does,
which constraints it had to meet, whether it does the job — never a
prediction of it and never the plan's edit mechanics.

**The bound is the head-scratch test, never a clock.** A stop is
relevant iff omitting it could later make the operator wonder why the
system behaves the way it does. Which stops run and how many is that
bar's call, never a count; a topic with a tiny increment makes a
naturally tiny walkthrough.

**Every topic is reviewed.** The lens pass carries one precondition — a
diff or a change set exists, wherever the pass runs — and the walkthrough carries none: a
topic whose implement wrote nothing still walks its artifacts' real
content. The one lane switch past this phase is development-process's
**lightweight close-out**, taken per topic at the user's explicit call —
never this session deciding about itself.

The session's artifact is `review.md` in the topic directory, written
**incrementally, and across sessions**: the lens pass records its
findings before the walkthrough opens — normally at implement's close,
one session earlier — every stop and every settled disposition appends
its line as it lands, and the close completes the entry — fitness,
where-to-look, tails, and whichever close ran. A session that dies
mid-walkthrough leaves the lens findings and the stops written so far,
not nothing, and the next session's pre-flight covers the remainder.

The plugin's glossary file holds this
vocabulary — *review*, *lens pass*, *walkthrough*, *stop*, *fitness
question*, *head-scratch test*, *facilitator*, *iteration*,
*decide-forward*, *ship*, *wait*; this file uses it and never redefines
it.

**Announce at start:** "Review: <topic>"

The material is dense — run reviews on a strong model.

- (Repo-specific preferences in CLAUDE.md override the defaults below)

## Input

*Read with this section: `mechanics.md` § Input (the mechanics) and `cases.md` § Input (the cases).*

## The lens pass

*Read with this section: `mechanics.md` § The lens pass (the mechanics) and `cases.md` § The lens pass (the cases).*

**Two operators, one procedure.** Implement's close **pre-executes** this
pass over the increment it just committed and writes the findings into
`review.md`, operating this section by pointer and defining none of it
(implement § Phase Close). This session runs the pass **only as the
fallback** — when the record holds no lens findings (→ Input, item 2) —
and says so before it starts, naming the wait: a non-interactive stretch
of minutes, the walkthrough opening on the other side of it. Everything
below is the procedure wherever it runs; the two operators differ in
nothing but which session they are.

**On an iteration the subject is the delta** (charter:
development-process, *Iteration*) — **this paragraph is that
computation's one home**; every other site names the two ref lines and
points here. The traceability-store list is not this paragraph's either:
it is the charter's machinery-traceability ground rule, read here rather
than copied. The subject is what the record leaves uncertified, plus the
working tree. Compute it from the record itself, which is the only
enumerator this topic has — machinery commits carry public-register
messages with no topic ID, so "this topic's refs" is unreadable from
either tree's log:

1. Collect the topic's **recorded refs** — every traceability store the
   charter's machinery-traceability ground rule names
   (development-process § Process ground rules), **less `review.md`'s
   ship section**, and
   only that:
   a shipped topic does not iterate, so the shipped ref is never a
   delta's input. Read the enumeration there rather than repeating it
   here — a store list written in two places goes short in one of them,
   and a delta missing a store returns too little while looking
   complete. A ref no store names is beyond reach, which is what makes
   each phase's recording duty load-bearing rather than bookkeeping.
   At implement's close the stores trail the pass — the entry and
   `implemented.md` are that close's later steps — so the refs the
   close itself has already committed join the collection directly,
   read off its own verify output: the same own-commit clause the ship
   close's `Machinery commits:` enumeration already carries.
2. Drop each one named on **any** entry's `Reviewed:` line: a pass
   already covered it.
3. What remains is the diff this pass reads — `git -C <tree> show
   <ref>`, one per ref, in whichever machinery tree that ref sits in —
   plus that tree's working tree.

Invoke the **code-review** skill **with `--fix`** on the diff, passing
the topic's `plan.md` and `spec.md` paths — code-review's Phase 0.6
extracts the decision digest from them, which is what stops its finders
re-deriving what the spec and plan already settled. The tier is
code-review's to key, never set here.

**The line is attention-worthiness, not behavior-preservation.** The
carve-out — what `--fix` applies, what it reports for disposition,
what it skips — lives in code-review's Applying-fixes section; this
phase inherits it unrestated. Two rules are review's own: every
plan-fidelity finding is reported, never applied — deviation from the
plan is this phase's disposition subject — and the phase **trusts the
fixes**: a disappointing fix is a friction to capture, aimed at
code-review, never grounds to re-do the fix by hand or to shrink the
apply set.

**Write `review.md` now** — the moment the findings exist and the fixes
have landed, before the running session does anything else: implement's
close writes the entry ahead of `implemented.md` (implement § Phase
Close), a fallback pass ahead of the walkthrough. The `## Review —
<date>` entry carries the lens-pass line with the coverage this pass
had, the `Fixes applied (--fix):` line beneath it with its `re-green:`
result where fixes landed, the `Refuted/skipped:` line, and the findings
list, with dispositions still to come — grammar and every slot: → The
Close. The date is the pass's own run date, and the session that later
fills the
entry fills *that* entry rather than opening a second one. A session that
ends here has left its findings on disk, and the next session's pre-flight
resumes from them.

## Prep — building the walkthrough

*Read with this section: `mechanics.md` § Prep — building the walkthrough (the mechanics) and `cases.md` § Prep — building the walkthrough (the cases).*

Two passes, both before the walkthrough's first sentence.

**Stops pass — read the increment.** Read the diff, then the code it
touches in place, and choose the stops: order them **by how the code
works, to tell the story of what the plan achieved** — never by file,
never in diff order. Unchanged code that is crucial to the story is
included where the story needs it. The head-scratch test decides which
stops run and how many; a lens finding that landed somewhere, or a
deviation `implemented.md` records, earns its stop. Derive each stop's
(b) constraints here, per stop — the spec decision, its rationale, the
plan's reasoning — so the walkthrough reads prepared material rather
than re-scanning `spec.md` and `plan.md` mid-stop. The **compression
rule** steers depth: code embodying a decision the user co-decided in
brainstorm or define — or ruled on at plan-review's close, which its
amendment marker records — gets one line of reminder; a decision taken
after define the user did not witness — in scout, write-plan,
plan-review's rewrite, or implement — gets real exposition. The stops
are what the close
reports as covered or skipped.

## The Open

*Read with this section: `cases.md` § The Open (the cases).*

Open by naming the stops in their story order and the findings awaiting
disposition, so the developer knows the shape of what is coming. There
is no triage step and no depth question — the commitment is to show up
and walk the increment.

## The Walkthrough

Each stop, in order, carries three things:

- **(a) what this code does and tries to achieve** — in the system's
  terms, not the diff's.
- **(b) which difficulties and constraints had to be considered** —
  **derived from `spec.md` and `plan.md`, never recalled**: the
  decision, its rationale, the plan's reasoning, named. Code that
  visibly embodies a constraint the record never names is itself a
  finding — flag it where it appears and carry it into dispositions.
  An operational invariant a stop surfaces — what must stay true in
  operation, what an operator must not do — is stop material too, and
  carries to Where-to-look's prohibition row (→ The Close).
- **(c) the code itself** — a function with its doc, or a function
  group, with `path:line` on every stop. **Rearrange and elide freely;
  never alter a byte.** Pulling a private function up beside its caller
  for the explanation is exactly right; editing is not — a listing that
  differs from the source in anything but arrangement is something the
  developer then reasons about that does not exist. Elisions are marked.

**Skips.** `skip` is the developer's per-stop escape — short, unguarded,
their judgement, not the phase's. "No more stops about <area>" is a
**category-level skip**: it removes every remaining stop in that area
for this session, and it is session-scoped — no durable "I know this
area" record exists, deliberately. Both are named in the record
(→ The Close). Ending the whole session early is neither — that is the
early close (→ Dispositions), the user's call there too; and neither is
a rulings-only sitting, declared at the open, which carries its own form
in the same record.

**Question stance.** The facilitator asks a question only where a
reader who followed the stop could answer it and a reader who did not
could not — never "do you follow this?", which is answerable without
engaging and is a button every developer pays forever. Ask nothing when
the stop does not warrant it. The craft is four rules: ask what the
code **does**, never what a document says; ask what **the developer acts
on** — domain behavior, code behavior — never text placement or phase
machinery; **one thing per question**, its single unresolved referent
named; and **hard stop** — end the message at the question and wait,
no hints, nothing after it but content-free reassurance ("take your
best guess"). A real trade-off the code embodies is a stop's constraint
or a finding, never dressed as a prediction question.

**After the answer** the hard stop lifts, and only then: a wrong or
unsure answer earns a **short inline teaching** — the mechanism, in a
few sentences, right where the miss happened — then back to the code.
A correct answer earns confirmation and moves on.

**Teaching bound.** Teach in-session exactly what is needed to follow
*this* walkthrough; depth in a subject is tutor's, never this phase's.
When a **subject-level** gap surfaces — the gap is in the subject rather
than in this topic's specifics, corroborated by the calibration pass
(the doc's entry unchecked, or the subject undocumented), whether a
missed answer exposed it or the calibration pass itself did — capture
it **the moment it surfaces** as a **learning** drop (the `ymer:capture`
skill, source `review`), say that it was captured, and continue. When
that gap is **blocking-grade** — the developer cannot safely operate the
shipped result without it — the work starts now instead: mint its
Learning-project task (*mint task*; binding: the operations contract)
and record the edge (*order topics*: the Learning task blocks this
topic's task, with its reason), and say so in-session. The drop, the
task and its edge are durable the moment they are made and carry this
topic in their evidence, so they survive a session that never reaches a
close — interrupted, or iterated — and a later re-run finds them:
capture's recurrence check finds the drop, so a second capture lands as
a recurrence pointing at it rather than a second story, and a look at
the Learning project's tasks finds the task, so it is never minted twice. Follow-through is
the user's, never this session's.

**Surprises** — anything surprising, or breaking a pattern the system
or the suite has established — are flagged **loudly where they arise**
("heads-up — this breaks our usual X"), by either party. One that
demands a decision becomes a disposition; one that does not is recorded
inside its stop's what-it-showed line. There is no separate section: the
stops carry their own record.

**The record grows as the walkthrough runs.** As each stop closes —
covered or skipped, and after any learning capture, mint or edge made
at the teaching bound — append its line to the `## Review — <date>` entry the
lens pass opened, under its Walkthrough list (grammar: → The Close),
before the next stop opens. The covered set is never held in context
alone: a session that dies here must leave the stops it actually
walked, so the next session covers the remainder instead of re-asking
questions the developer already answered.

## Dispositions

*Read with this section: `cases.md` § Dispositions (the cases).*

Every finding gets one — the lens pass's unapplied findings, a
walkthrough surprise that demands a decision, a constraint the record
never named, a `> Needs confirmation:` marker still unresolved — no
amendment marker beneath it (→ Input, item 3) — whose answer the
shipped code does not visibly settle, the developer's own objection to a
line of code. **The facilitator proposes each disposition with its
consequence in plain terms** — "this blocks the ship" / "this doesn't" /
"this is fixed here and now" — and the developer answers about the code,
never
picks from a taxonomy. Five outcomes:

- **iterated in scope** — addressed within this topic: a trivial fix
  lands now as a developer edit (→ Developer edits); a substantive one
  whose right answer is still open is a full iteration of this topic,
  and the close names the phase it re-enters at — **derived** from the
  artifact owning the contested statement, never picked here (charter:
  development-process, *Iteration*; → Iterate).
- **decide-forward** — the same iteration, executed in place because the
  developer has already made the new decision at the code: the edit
  stands, and the facilitator writes the dated amendment into the
  artifact that owns the statement — the decision's entry in `spec.md`
  (define § The Spec) or its home site in `plan.md` (write-plan § Task
  Structure). **Marker first, sweep, line after**: the amendment is
  written; its footprint is swept at once — the whole plan plus every
  `payloads/` file, per the sweep skill, ahead of any machinery commit,
  the moment write-plan and plan-review already sweep at — and only then
  the disposition line asserts that the amendment exists; it never
  promises one. This outcome fires
  **no close** — the session continues, and the edit rides the record
  like any other (→ The Close, for the `Delta pass:` a ship close owes
  it).
- **lifted, blocking** — separate work the ship must wait for, so its
  work starts now: *mint task* (the project is where the fix lives; read
  the mint back — binding: the operations contract), then *order
  topics* — the lifted task blocks this topic's task, the finding as the
  reason — and the close is **wait**.
- **lifted, non-blocking** — separate work nobody is starting now:
  capture it as a drop through the `ymer:capture` skill, source
  `review` — an `idea`, or a `bug` where what the finding saw is broken —
  and nothing else: no task, no edge.
- **declined** — the finding is weighed and left as it stands: a trade-off
  the developer takes deliberately, or a record that is correct as written
  and changes nothing. The `- F<n>` line carries the why and nothing else —
  no edit, no mint, no edge, no amendment. This outcome fires **no close**,
  and it has no consequence to land, so self-check 3 has nothing to check
  for it. It is not a parking space: a finding that still wants an answer is
  one of the four above.

**Append each disposition as it settles** — the finding's `- F<n> …`
line naming its outcome and the calls already made: the minted task,
the captured drop, the recorded edge, the amendment a decide-forward already wrote — to
the same open entry, before the next finding is taken up. Same reason
as the stops: what is settled is on disk.

**The fitness question** closes the movement — the larger-perspective
"does it do the job" question(s), asked **once over the whole
increment**, never per stop, and its answer recorded. A "no" is a
finding and takes a disposition like any other.

**Early close** is the same close, differing only in when it happens and
which stops land as skipped. It is **the user's call**, never the
facilitator's: name what the walkthrough still holds and let the user
decide — ending before the stops are covered is not this session's
decision to make.

## Developer edits

Edits the developer makes during the review — fixing a line at a stop,
taking a trivial disposition now — are first-class: never a surprise,
never discarded. A dirty tree at the close is expected, and **every close
commits it**: the ship close folds it into the branch before the squash,
and an iterate or wait close commits it just the same, its ref riding the
entry's `Unreviewed:` line (→ Phase Close). Nothing this session changed
in a project checkout is left uncommitted at a boundary.
Destructive-of-uncommitted steps stay holds (*Defaults and holds*:
development-process). The lens pass reviewed one diff; edits make it
another — and the pass normally ran a session earlier, so "after the
pass" spans the whole implement→review gap, every edit made between the
two sittings included. When a tree gained edits after the lens pass's
run over it, re-run that tree's green — the project's test suite for
branch files, the plan's own gates for machinery files, **per tree the edits
touched and never per topic kind** (the same rule § The lens pass states
for the pass's own fixes) — green once before the
ship close's fold; red is a finding and takes a disposition like any
other.
**An edit is trivial iff the record already covers it**: it repairs or
completes what `spec.md` and `plan.md` already say, remaking no
recorded decision and adding no unrecorded behavior. Trivial edits
ship unreviewed. Anything else is an iteration — say so, take it as a
disposition, and let the route rule name the phase (or decide-forward
name the amendment) rather than shipping it unseen.

## The Close

*Read with this section: `cases.md` § The Close (the cases).*

Complete the `## Review — <date>` entry the lens pass opened and the
walkthrough has been filling — the fitness answer, the where-to-look
map, the tails, and any disposition still unwritten. Entries are dated,
**newest-first below the title**; a re-review prepends above the
existing history. Skeleton of a finished file — the ship section is
the ship close's prepend, absent on an iterate or wait close, which
append the entry's two ref lines instead:

```markdown
# <topic> — review

## Shipped — <YYYY-MM-DD>
Squash: <sha | none> · branch <topic> deleted · task closed completed   [`none` where step 2's preview was empty — no squash ran (→ Phase Close, ship step 2)]
Catch-up: <fast-forward | merge <sha> (resolution: <note>) | already up to date> · re-green: green   [code-repo topics — step 2's merge; the clause where the outcome moved the branch — only `green` reaches it (→ Phase Close, ship step 2)]
Machinery commits: <tree> <sha…> · <tree> <sha…>   [additive, per machinery tree, wherever the increment carries any]
Pending: git push · git push from <tree> · git push from <tree>   [each push that applies]
    [a meta topic has no branch, so no Squash line and no Catch-up
     line — it never runs step 2: task closed completed rides the
     Machinery commits line, and one that made no machinery diff
     writes `Task closed completed` alone, no refs line]

## Review — <YYYY-MM-DD>
Lens pass: <tier> over branch @ <sha> · <tree> <sha…> · <tree> <sha…>   [what this pass covered; no branch half on a meta topic]
Fixes applied (--fix): <list, or none> · branch <sha> · <tree> <sha…> · <tree> <sha…> · state · re-green: <result>   [refs per tree the fixes touched, `state` carrying none; the clause where fixes landed]
Refuted/skipped: refuted — <name (why)>, … · skipped — <name (why)>, …   [or none; wherever the lens pass ran, the dropped pass excepted]
Delta pass: <tier> over <the refs and edits no pass had seen> · re-green: <result>   [ship close, when any existed; the clause where the re-run rule fired]
Findings & dispositions:
- F1 <file:line> — <finding> — iterated in scope: <what was done>
- F2 <file:line> — <finding> — decide-forward: <the decision taken, one clause> · amended <artifact> <handle>
- F3 <file:line> — <finding> — lifted, blocking → <task> (edge recorded)
- F4 <file:line> — <finding> — lifted, non-blocking → <kind> drop #<id>
- F5 <file:line> — <finding> — declined: <why it stands>
Walkthrough — stops in story order, skips named:
- S1 <where>: <what this stop showed> — covered
- S2 <where>: — skipped (developer's call) / — skipped (category: <area>) / — skipped (lane: rulings-only)
Fitness: <the closing does-it-do-the-job question, and the answer>
Where-to-look:
- when <X misbehaves>, check <Y>
- never <X> — <consequence>
Tails: Learning: none · Calibration: none
Reviewed: branch @ <sha> · <tree> <sha> <sha> · <tree> <sha>     [iterate and wait closes — what this entry's pass covered]
Unreviewed: branch <sha> · <tree> <sha> <sha> · <tree> <sha>     [the same closes, always — `none` where the close committed nothing]
```

**The entry's two ref lines** are appended at the close, on the
**iterate and wait closes only** — their one reader is the next
iteration, and a ship's refs already live in `## Shipped`, where a
second traceability store would only need reconciling. Each line asserts
exactly one thing, and keeping the two apart is what stops work shipping
unseen:

- **`Reviewed:` certifies.** It names only refs whose content **this
  entry's lens pass covered** — read off that entry's own lens-pass
  line rather than re-derived: the branch anchor the pass diffed
  (`Reviewed: branch @ <sha>`), which is no longer the tip once the
  pass's own fix commit landed above it, and machinery refs as a
  **list, never a range**, because both machinery trees are shared and
  a range would sweep concurrent topics' commits in. Commits made **after** that pass
  are never listed here, however tempting: the fixes it applied, the
  decide-forward edits and the developer edits are exactly the work no
  pass has seen. An entry whose pass covered no ref at all writes
  `Reviewed: none — no diff`.
- **`Unreviewed:` records.** It names what **this session committed and
  no pass covered** — `Unreviewed: branch <sha> · <tree> <sha> <sha> ·
  <tree> <sha>`: the close's own commits — the step-1 fold on a
  code-repo topic among them — in whichever tree each sits, one marked
  group per tree. A fallback pass's own fixes are **not** among them:
  their commits are the fixes line's, their one store, and reach the next
  delta from there (→ The lens pass).
  A close that committed nothing writes `Unreviewed: none` — the line is
  **unconditional** on its four writers, the iterate close, the wait
  close, the drift-valve stop's marker block (implement § Drift
  Valve, which writes this line and no `Reviewed:` — a stop runs no
  pass, so a `Reviewed:` there could only read "none"), and
  plan-review's *needs a define session* branch, whose own steps commit
  only in the state folder and so ordinarily writes `none`
  (plan-review § Steps, step 5), so that its
  absence carries information instead of ambiguity: an entry with a
  `Reviewed:` line and no `Unreviewed:` line predates the split, full
  stop, and § The lens pass's edge for such an entry is a test rather
  than a guess.

**Tails** (each defaulting to none):

- **Learning** — the learning gaps met mid-session at the teaching
  bound: each learning drop captured, by its id, and for a
  blocking-grade gap the Learning-project task minted with its edge
  recorded beside it. The capture or the mint already happened and
  stands on its own; this tail names it in the record rather than
  routing it.
- **Calibration** — any subject whose knowledge doc stayed unreachable
  through the close, so its calibration ran from the artifacts alone —
  or `uncalibrated (empty index)` when there were no rows to match, or
  `not run — rulings-only` where the lane was declared before Prep and
  dropped the calibration pass (→ Prep, The Open).

**Recognizers.** State is read from the **first recognizer top-down**
(entries are newest-first): `## Shipped` → shipped; `Iteration —` →
mid-iteration, the marker names the phase — **whether that route is
still live is a further read**, because nothing ever clears a marker
and a completed round-trip leaves the same top line (→ Input, item 2);
`## Review` → one of three: the lens pass has
run and review has not begun, review is open, or it closed unshipped
under the wait close — the readable mid-states, told apart by the entry
itself (→ Input, item 2). A
pre-rename `Routed back —` marker in an older record reads exactly as
`Iteration —` does. Markers keep the marker discipline: capital first
letter, em-dash, line start. There is no skip recognizer: nothing
downstream gates on this phase, and the lightweight close-out lane
writes a thin `review.md` whose entry names the lane taken *with* a ship
section, so done-ness reads the same for every topic.

**The record is never a staging area.** Next-iteration work rides the
roadmap or the pool — a mint, an edge, an iteration marker, a captured
drop — never a list in `review.md` waiting for a drain nobody owns.

## Iterate — the re-entry close

*Read with this section: `cases.md` § Iterate — the re-entry close (the cases).*

The record is **contested or exceeded** — the increment solves the wrong
problem, a spec decision did not survive contact with the code, the
direction itself is in doubt — and the session ends by iterating rather
than pushing through; so does a disposition of *iterated in scope* whose
fix is substantive and whose right answer is still open. **The phase is
derived, never picked**: it is the one owning the artifact where the
contested statement lives, and the charter's rule (development-process,
*Iteration*) is where that reads off. The close prepends the marker as
the newest entry; **the findings below it stay** — they describe real
code, not a plan about to change:

```markdown
Iteration — <YYYY-MM-DD> → <phase>: <finding>
```

The topic re-enters the pipeline at the named phase; its task stays
`doing` — nothing stores a rung. The branch and `implemented.md` stand.
The file always keeps its `# <topic> — review` title line — a fresh
topic's iterate close writes title plus marker above the lens-pass entry.
The next iteration's implement close prepends a fresh `## Review` entry
above the marker — review fills that same entry — and the file reads
open again.

## Self-Review (inline)

Calibration: only flag what would corrupt state detection or ship
something the developer never saw.

1. Every lens-pass finding is in the record — applied fixes on the
   `Fixes applied (--fix):` line with that line's `re-green:` result
   where fixes landed, findings reported for disposition each with one,
   refuted or skipped candidates on the `Refuted/skipped:` line —
   whether this session ran the pass or read it off the record.
2. Every stop run or skipped is a line, skips naming their kind, and
   the covered set matches what actually happened.
3. Every disposition's consequence landed: an in-scope fix is in the
   tree, a blocking lift-out has its task *and* its edge (read back:
   the mint shows in its project, the edge among what blocks the topic,
   with its reason), a non-blocking one its captured drop. A
   **declined** finding has no consequence by construction — this item
   passes over it; what its line owes is the why, and the why is on the
   line.
4. Every drop this session handed to capture landed: its id is on the
   line that sent it — a non-blocking lift-out's `- F<n>` line, a
   learning gap's entry in the Learning tail — and a capture stopped at
   its guard is a finding, never a line written as if it had landed.
5. The fitness question was asked once, over the whole increment, and
   its answer is recorded.
6. An iterate close prepended the marker above findings that stayed and
   appended the entry's ref lines — `Reviewed:` naming only what this
   entry's pass covered, `Unreviewed:` naming the close's own commits no
   pass covered, a fallback pass's own fixes excepted — and one
   re-derived at ship step 2 by a red catch-up run names the merge ref
   in the finding that stopped it, that ref's only store (→ Phase
   Close, ship step 2);
   a wait close left the entry complete with no ship section and
   appended the same two lines; a ship that followed a wait close
   confirmed the entry it ships is complete — fitness answered, stops
   accounted for — before the section went on top.
7. Tails routed: every mid-session learning capture named, and every
   Learning mint — with its edge recorded, the gap blocking-grade — and every unreached or
   absent knowledge doc named under Calibration.
8. Every tree that ships is green — the lens pass's own post-fix runs
   still stand, or a close-time run covers the edits made since, the
   implement→review gap included, per tree the edits touched; and the
   ship's catch-up has its own run on the branch, its result on the
   `Catch-up:` line, wherever step 2 owes one (→ Phase Close, ship
   step 2).
9. Every decide-forward disposition's amendment exists in the artifact
   its line names, written before the line and its footprint swept in
   this session — and where this close ships, the `Delta pass:` over
   everything no pass has seen (everything after the entry's coverage
   anchor: the pass's own fix commits, the `Unreviewed:` refs, and the
   edits since — → The Close) ran and is recorded, with its `re-green:`
   clause where owed.

Fix issues inline and move on — no re-review loop.

## Phase Close — three closes

*Read with this section: `mechanics.md` § Phase Close — three closes (the mechanics).*

**Ship** — Claude-run end to end except the push. A meta topic skips
steps 1, 2, and 6 (topic kinds: development-process § Topic kinds); the
machinery commit, where this session made machinery edits, stands where
steps 1–2 stand, run before step 3 — the ship section, which names its
ref — its ref joining `implemented.md`'s refs in the ship
section. Work no pass has seen takes its `Delta pass:` here, before step
1 — everything after the entry's lens-pass coverage anchor
(→ The Close).

**Iterate** — on a code-repo topic run ship step 1 first, the fold: its
commit is this close's project-checkout commit, and its ref rides
`Unreviewed: branch <sha>`. Then append the entry's ref lines (both,
always: `Reviewed:`, and `Unreviewed:` naming the close's own commits no
pass covered, or `none` — grammar: → The Close), then prepend the
marker (→ Iterate), then steps 5 and 7. The branch and `implemented.md`
stand for the next iteration, the branch's own tree clean and this
session's edits committed on it; the task stays
`doing`.

**Wait** — ship step 1's fold first, exactly as the iterate close runs
it, its ref on `Unreviewed: branch <sha>`; the `## Review` entry then
stands complete with no ship section
and the same two lines appended; the blocking edge was recorded at its
disposition (read it back: *order topics*' postcondition). Then steps 5
and 7. The task stays `doing` and shows blocked in the available-to-work
view until the lifted task resolves; the next review session's pre-flight
reads the edge, then runs the `Delta pass:` over the subject § The Close
defines for it — never ship unseen — and ships. Note the asymmetry that
pass must respect: unlike an iterate close, a ship-after-wait has no
next lens pass to catch what it misses.

## Next Phase

None — review is the last phase; the development process ends here.
Stop after the capture block. The terminal report lists every pending
step with its command written out (report rule: *Defaults and holds*):
after a ship, the push — `git push`, from the project repo, and a push
per machinery tree this session committed — `git push` from
each such tree — the user's alone, the
hold that ends every ship. After an iterate close, name the marker's
phase, in a fresh session. After a wait, name the lifted task and that
review re-enters when it resolves. An iterate or wait close that made a
machinery commit lists the same push per tree, the user's alone: that
tree's main is ahead of origin the moment its commit lands.

## Remember

- The bound is the head-scratch test, never a clock: which stops and
  how many is the bar's call, never a count
- Every topic is reviewed; the lens pass's one precondition is a diff or a change set,
  the walkthrough has none; the lightweight close-out lane is the one
  bypass, and it is the user's call, not this session's
- The lens pass normally arrives already run: implement's close
  pre-executes it and this session reads its findings off the record,
  running it in-session only as the fallback — and announcing the wait
  when it does
- With `--fix`: apply what has one right answer, surface what decides
  something, never apply a plan-fidelity finding; trust the fixes — a
  bad one is a friction to capture, never grounds to shrink the apply set —
  and the fixes ride their own commit(s) — a state-folder fix the phase's
  own state-folder commit — their re-green result recorded on the fixes line, a
  red one being a finding like any other
- On an iteration the lens pass's subject is whatever the record leaves
  uncertified, plus the working tree (§ The lens pass computes it),
  priced by the same ladder; iteration count never enters
- `review.md` is written incrementally and across sessions: findings
  before the walkthrough opens — normally at implement's close, one
  session earlier — each stop and each disposition as it lands, the rest
  at the close; a dead session leaves findings and the stops already
  covered
- Stops in story order, each with what it does, which constraints it
  met (derived from spec and plan, never recalled), and the bytes
  unaltered with `path:line`; a constraint the record never names is a
  finding
- `skip` is the developer's, unguarded; category skips are
  session-scoped; a rulings-only sitting is the developer's lane,
  declared at the open; all three are named in the record
- Questions only a reader who followed could answer, or none — never
  ritual comprehension; one referent, hard stop; a miss earns a short
  inline teaching; a subject-level gap is captured as a learning drop
  the moment it surfaces, and a blocking-grade one mints its Learning
  task and records its edge
- The facilitator proposes each disposition with its consequence in
  plain terms; the developer answers about the code, never picks from
  the taxonomy; a blocking lift-out blocks this topic's ship
- Five dispositions: iterated in scope, decide-forward (the amendment
  first, then the line — and no close), lifted blocking, lifted
  non-blocking, declined (weighed and left as it stands — the why on the
  line, no consequence, no close)
- The fitness question is asked once, over the whole increment
- Developer edits are first-class: trivial iff the record already
  covers them, and a dirty tree at the close folds into the branch or
  carries into the next iteration
- Three closes: ship (squash-merge, task closed, branch deleted, push
  handed off), iterate (marker on top, findings stay), wait (entry
  complete, no ship section, the edge holds the ship) — and both
  non-ship closes append the entry's two ref lines: `Reviewed:` for what
  this entry's pass covered, `Unreviewed:` for the close's own commits no
  pass covered — never a pass's own fixes, which are the fixes line's
- A ship never ships unseen: the `Delta pass:` covers everything after
  the entry's coverage anchor — the pass's own fix commits, the
  `Unreviewed:` refs, and every edit since (→ The Close) — before the
  section goes on top
- Work the review finds and nobody starts now is captured as a drop —
  a non-blocking lift-out, a learning gap; only a blocking lift-out or a
  blocking-grade gap mints a task
- The ship section is what "shipped" reads; the push is the hold
