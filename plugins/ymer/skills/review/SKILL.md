---
name: review
description: Reviews a topic's finished implementation with its developer before it ships: a guided walkthrough of what the code does, a decision on every finding, then one of three closes (ship the topic, send it back to an earlier phase, or wait on blocking work). Use after implement, as the last phase of the development process, and to resume a review that is open, waiting, or mid-iteration.
---

# Review

Review is the last phase of a topic. The developer and a facilitator
read the code that implement built, settle every finding it raised, and
end in one of three ways: the topic ships, it goes back to an earlier
phase, or it waits on blocking work. The subject is the code as it is:
what it does, which constraints it had to meet, and whether it does the
job. It is never a prediction of the code, and never the plan's edit
mechanics.

This file is review's spine: its intent and its moments in order. Its
**mechanics** (the Claude Code way: git, the state folder, the
harness's tools) are in `mechanics.md`, and its **cases** (the earned
precision: edge cases, exceptions and rulings) are in `cases.md`, both
under this file's headings. A section with entries there says so in its
first line, and those entries are read when the section runs.

## Overview

**Read the plugin glossary's entries for review's vocabulary now**:
`${CLAUDE_PLUGIN_ROOT}/glossary.md`, each entry by its heading: *review*,
*lens pass*, *walkthrough*, *stop*, *fitness question*, *head-scratch
test*, *facilitator*, *iteration*, *decide-forward*, *ship*, *wait*,
*re-green*, *change set*, *machinery tree*. This file uses those terms
and never defines them.

Three movements, then a question and a close. The **lens pass**
(code-review with `--fix` over the diff) normally ran at implement's
close, and this session reads its findings from the record. The
**walkthrough** reads the real code in **stops**. Every finding gets a
**disposition**. The **fitness question** comes next, and the session
ends in one of three closes: **ship**, **iterate** or **wait**.
Implement commits the change where it is built; this phase's close is
what makes it official.

**The bound is the head-scratch test, never a clock.** Which stops run,
and how many, is that test's call and never a count: a tiny increment
makes a naturally tiny walkthrough.

**Every topic is reviewed.** The lens pass has one precondition, that a
diff or a change set exists, wherever the pass runs. The walkthrough has
none: a topic whose implement wrote nothing still walks its artifacts'
real content. The one lane past this phase is the lightweight close-out
(the process contract, § Where to enter), taken per topic at the user's
explicit call and never decided by this session about itself.

The session's artifact is `review.md` in the topic directory, written
**incrementally and across sessions**. The lens pass records its
findings before the walkthrough opens, normally at implement's close one
session earlier. Every stop and every settled disposition appends its
line as it lands, and the close completes the entry: fitness,
where-to-look, tails, and whichever close ran. A session that dies
mid-walkthrough leaves the findings and the stops written so far, and
the next session's pre-flight covers the rest.

**Announce at start:** "Review: <topic>"

The material is dense: run reviews on a strong model. Repo-specific
preferences in a repo's `CLAUDE.md` override the defaults below.

## Input

*Read with this section: `mechanics.md` § Input (the mechanics) and `cases.md` § Input (the cases).*

**Read the process contract's § Defaults and holds and § Topic kinds
now, and the operations contract whole**:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`. They hold the
pre-flight, close binding, gate defaults and holds, the fallback rule
and the report rule; the two topic kinds and the duty to commit
machinery edits; and every roadmap operation this phase calls (*look up
topic*, *mint task*, *order topics*, *ship topic*) with its
postcondition, the failure rule, how a call's shape is read from the
coordinator at the moment of the call, and how the state folder's kind
is read. This section carries only review's own reads beside them.

**The pool.** The same read holds the pool's two operations, *draw
drops* and *return drops* (the operations contract, § The pool): who
draws, which closes draw, the `Drawn:` and `Returned:` lines and where
they sit, the read and the read-back, the order at the close, a draw
that cannot run and how its report names it, the pre-flight's finish,
and how the front is read. The front comes from this one line, which the
harness fills in as it loads this skill:

> Front as configured: `${user_config.front}`

Find the topic directory through the topic's task, then run the
pre-flight and read, in this order:

1. **`implemented.md`**: implement's record, with its deviations from
   the plan and why, its mishaps, what was noticed but not built, the
   verification result, and the durable refs. Three reads are review's
   own here. Whether implement has run at all is read from the state
   folder, never from this file. The increment under review is the
   branch's own commits on a code-repo topic, plus the machinery commits
   the record names, plus each tree's working tree. And before this
   session writes to any tree, the checkout must hold the topic's
   branch, or the session stops and reports. A dirty project checkout
   is the developer's edits in flight: never reset and never stashed,
   folded by the close (the substrate contract, § Tree options).
2. **Any existing `review.md`**: its first recognizer names the state
   (→ Recognizers), and a marker's block is read by its own rule (the
   process contract, § Iteration).
3. **`plan.md` and `spec.md`**: what each stop's constraints derive
   from, never recalled. That is the spec's decisions with their
   rationale and out-of-scope list, the plan's rationale, its
   `> Design decision:` notes and its `> **Amended (…):**` markers.
   Read here, too, every ruling the record defers to review, whatever
   marks it: a `> Needs confirmation:` marker with no amendment marker
   beneath it, an entry in the plan's Assumptions block, a default
   recorded "review post-hoc", or a sentence that leaves a call to the
   review gate. Read every hand-off the record addresses to review,
   in `implemented.md` or in `spec.md`, too. Each one whose answer the
   shipped code does not visibly settle is a finding (→ Dispositions).
   These two files are also the lens pass's decision-digest sources.
4. **`brainstorm.md`**: which decisions the user co-decided, and so
   which stops compress to a line (→ Prep).
5. **`sketch.md`, when it exists**: the contrast between the user's own
   attempt and the shipped code ("your sketch did X; the shipped code
   does Y"). This phase is its only reader (the operations contract,
   § The topic's artifacts). When there is no sketch, nothing stands in
   for it.
6. **The developer's knowledge docs**: the calibration input (→ Prep).

## Recognizers

*Read with this section: `cases.md` § Recognizers (the cases).*

`review.md`'s entries are dated and newest-first, so its state is read
from the **first recognizer top-down**:

- **`## Shipped`** → shipped. Read the ship section as a checklist
  against durable state first. An outcome missing is a torn close:
  finish it from its first missing outcome, never confirm-gate it. All
  landed → the topic is already shipped, and a re-run is deliberate:
  confirm before proceeding.
- **`Iteration —`** → mid-iteration, the marker naming the phase.
  Whether that route is still live, and which phase it makes due, is
  read off the marker's block: **read the process contract's
  § Iteration now**, `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for
  the block, its `Consumed —` lines and what each reading makes due.
  A live route, or one due at any phase but review, stops this
  session, naming that phase. A block whose last line is `by implement`
  is a route that has run its course with no entry above it: this
  session proceeds, a fresh `## Review` entry prepends above the
  marker, and the entries below carry the ref lines this session's
  delta is computed from (→ The lens pass).
- **`## Review`** with no ship section above it → one of three readable
  mid-states, told apart by the entry itself. **Incomplete**, with no
  `Fitness:` line, is an open review: this session covers the remainder
  inside the same entry, and the stops it already lists are covered.
  That is the **normal path**: implement's close leaves exactly an
  entry holding the pass's findings and nothing else, and the session
  goes straight to Prep. **Complete**, fitness answered and tails
  written, is a **wait** close: read the edge (*order topics*' read-back
  on the topic's task). The lifted task resolved → this session ships;
  still open → report it and stop.

**The fallback fork is read off the open entry, never off recall.** A
`^Lens pass:` line as the open entry's first body line means the pass
has run: read its findings and open Prep. `Lens pass: dropped — no diff
or change set` counts as present. No such line, or no `review.md` at
all, means this session runs the pass itself (→ The lens pass),
announcing the wait before it starts.

There is no skip recognizer: nothing downstream gates on this phase.

## The lens pass

*Read with this section: `mechanics.md` § The lens pass (the mechanics) and `cases.md` § The lens pass (the cases).*

**Read the process contract's § Review effort and § The traceability
stores now**: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for lens
applicability and how a dropped lens is reported, the risk profile that
keys a tier, and the list of stores every recorded ref is read from.
This section holds the pass's whole procedure, whichever phase operates
it.

**Two operators, one procedure.** Implement's close **pre-executes**
this pass over the increment it just committed and writes the findings
into `review.md`, operating this section by pointer (implement § Phase
Close). This session runs the pass **only as the fallback**, when the
record holds no lens findings (→ Recognizers), and says so before it
starts, naming the wait: minutes with nothing to answer, the
walkthrough opening on the other side. Everything below is the
procedure wherever it runs.

**On an iteration the subject is the delta**, and this paragraph is
that computation's one home: every other site names the two ref lines
and points here. The subject is what the record leaves uncertified,
plus the working tree. Compute it from the record, the only enumerator
this topic has: machinery commits carry public-register messages with no
topic ID, so "this topic's refs" cannot be read off either tree's log.

1. Collect the topic's **recorded refs** from every traceability store,
   **less `review.md`'s ship section**: a shipped topic does not
   iterate, so the shipped ref is never a delta's input. A ref no store
   names is beyond reach, which is what makes each phase's recording
   duty load-bearing. At implement's close the stores trail the pass,
   so the refs that close has already committed join the collection
   directly, read off its own verify output.
2. Drop each ref named on **any** entry's `Reviewed:` line: a pass
   already covered it.
3. What remains is the diff this pass reads, one `git -C <tree> show
   <ref>` per ref in whichever tree that ref sits, plus that tree's
   working tree.

Invoke the **code-review** skill **with `--fix`** on the diff, passing
the topic's `plan.md` and `spec.md` paths: code-review extracts the
decision digest from them, which stops its finders re-deriving what the
spec and plan already settled. The tier is code-review's to key, never
set here.

**The line is attention-worthiness, not behaviour-preservation.** What
`--fix` applies, reports or skips lives in code-review's Applying-fixes
section, and this phase inherits it unrestated. Two rules are review's
own. Every plan-fidelity finding is reported, never applied: deviation
from the plan is this phase's disposition subject. And the phase
**trusts the fixes**: a disappointing fix is a friction to capture,
aimed at code-review, never grounds to redo it by hand or to shrink the
apply set.

**Where the fixes go depends on the operator.** Each fix lands in the
tree that holds the file it fixes, and then:

- **Implement's pre-executed pass** runs on a tree its step 1 already
  emptied, so its fixes ride **their own commit**, one per tree they
  touched, public register, each ref onto this entry's `Fixes applied
  (--fix):` line and onto no other store. Work a pass covered and work
  no pass has seen never share a ref: the certification arithmetic
  rests on that separation.
- **Review's fallback pass** runs on a tree that may carry the
  developer's edits, so its fixes are developer edits too
  (→ Developer edits): they get no commit of their own and fold into
  this close's commit, whose ref the ship section or the `Unreviewed:`
  line carries. The fixes line records the fold with the token `folded`.
- A fix in a state-folder file, under either operator, lands on the
  running phase's own state-folder commit, and the line marks it with
  the token `state`.

Then re-run the green once per tree the fixes touched, the project's
test suite for branch files and the plan's own gates for machinery
files, and record the result on the fixes line's `re-green:` clause
either way. A red is a finding besides, for this phase's dispositions,
never a hand repair and never a stop.

**Write `review.md` now**, the moment the findings exist and the fixes
have landed, before the running session does anything else: implement's
close writes the entry ahead of `implemented.md` (implement § Phase
Close), a fallback pass ahead of the walkthrough. The `## Review —
<date>` entry carries the lens-pass line with this pass's coverage, the
`Fixes applied (--fix):` line beneath it, the `Refuted/skipped:` line,
and the findings list, with dispositions still to come (grammar and
every slot: → The Close). The date is the pass's own run date, and the
session that later fills the entry fills *that* entry rather than
opening a second one.

## Prep — building the walkthrough

*Read with this section: `mechanics.md` § Prep — building the walkthrough (the mechanics) and `cases.md` § Prep — building the walkthrough (the cases).*

Two passes, both before the walkthrough's first sentence.

**Stops pass: read the increment.** Read the diff, then the code it
touches in place, and choose the stops in the walkthrough's story
order. A lens finding that landed somewhere, or a deviation
`implemented.md` records, earns its stop. The head-scratch test bounds
the stops that expose code: on a doc-only increment, or one whose lens
pass found nothing, the walkthrough is its rulings plus only the stops
that pass the test, however few. Derive each stop's constraints here,
per stop (the spec decision, its rationale, the plan's reasoning), so
the walkthrough reads prepared material instead of re-scanning
`spec.md` and `plan.md` mid-stop.

The **compression rule** steers depth. Code that embodies a decision
the user co-decided in brainstorm or define, or ruled on at
plan-review's close (its amendment marker records it), gets one line of
reminder. A decision taken after define that the user did not witness,
in scout, write-plan, plan-review's rewrite or implement, gets real
exposition. The stops are what the close reports as covered or skipped.

**Calibration pass: read the developer's knowledge docs** for the
subjects the topic touches, and let them steer what each stop teaches:
how the subjects are matched, what a checked or unchecked entry means,
and what an empty index or an unreachable doc does are in
`mechanics.md` § Prep — building the walkthrough.

## The Open

*Read with this section: `cases.md` § The Open (the cases).*

Open by naming the stops in their story order and the findings awaiting
disposition, so the developer knows the shape of what is coming. There
is no triage step and no depth question: the commitment is to show up
and walk the increment. A rulings-only sitting is the developer's call
when they make it (→ `cases.md` § The Open).

## The Walkthrough

Each stop, in order, carries three things:

- **(a) what this code does and tries to achieve**, in the system's
  terms, not the diff's.
- **(b) which difficulties and constraints it had to meet**,
  **derived from `spec.md` and `plan.md`, never recalled**: the
  decision, its rationale, the plan's reasoning, each named. Code that
  visibly embodies a constraint the record never names is itself a
  finding: flag it where it appears and carry it into dispositions. An
  operational invariant a stop surfaces (what must stay true in
  operation, what an operator must not do) is stop material too, and
  carries to Where-to-look's prohibition row (→ The Close).
- **(c) the code itself**: a function with its doc, or a function
  group, with `path:line` on every stop. **Rearrange and elide freely;
  never alter a byte.** Pulling a private function up beside its caller
  is exactly right, and editing is not: a listing that differs from the
  source in anything but arrangement is something the developer then
  reasons about that does not exist. Elisions are marked.

**Skips.** `skip` is the developer's per-stop way out: short,
unguarded, their judgement and not the phase's. "No more stops about
<area>" is a **category skip**: it removes every remaining stop in that
area for this session only, and no durable "I know this area" record
exists, deliberately. Both are named in the record (→ The Close).
Ending the whole session early is neither: that is the early close
(→ Dispositions), the user's call too. A rulings-only sitting is
neither as well; it carries its own form in the same record.

**Question stance.** Ask a question only where a reader who followed
the stop could answer it and one who did not could not: never "do you
follow this?", which is answerable without engaging and costs every
developer forever. Ask nothing when the stop does not warrant it. Four
rules shape a question. Ask what the code **does**, never what a
document says. Ask what **the developer acts on**, domain behaviour or
code behaviour, never text placement or phase machinery. Ask **one
thing**, its single unresolved referent named. And put it through the
session's question tool, the stop's analysis in prose above it and
never hidden by it (the options-in-prose rule: the interview procedure,
§ Ground rules); then **stop and wait**, with no hints and nothing after
the question but content-free reassurance ("take your best guess"). A
real trade-off the code embodies is a stop's constraint or a finding,
never dressed as a prediction question.

**After the answer**, and only then, the stop lifts: a wrong or unsure
answer earns a **short inline teaching** (the mechanism in a few
sentences, right where the miss happened), then back to the code. A
correct answer earns confirmation and moves on.

**Teaching bound.** Teach in-session exactly what is needed to follow
*this* walkthrough; depth in a subject is tutor's, never this phase's.
When a **subject-level** gap surfaces (the gap is in the subject
rather than in this topic, corroborated by the calibration pass: the
doc's entry unchecked, or the subject undocumented), capture it **the
moment it surfaces** as a **learning** drop (the `ymer:capture` skill,
source `review`), say that it was captured, and continue. When the gap
is **blocking-grade**, so the developer cannot safely operate the
shipped result without it, the work starts now instead: mint its
Learning-project task (*mint task*, binding: the operations contract)
and record the edge (*order topics*, binding: the operations contract),
the Learning task blocking this topic's task with its reason, and say
so in-session. The drop, the task and the edge are durable the moment
they are made and carry this topic in their evidence, so a later re-run
finds them: capture's recurrence check finds the drop, and a look at
the Learning project's tasks finds the task, so it is never minted
twice. Follow-through is the user's.

**Surprises**, anything surprising or breaking a pattern the system or
the suite has established, are flagged **loudly where they arise**
("heads-up: this breaks our usual X"), by either party. One that
demands a decision becomes a disposition; one that does not is recorded
in its stop's line.

**The record grows as the walkthrough runs.** As each stop closes,
covered or skipped, and after any capture, mint or edge made at the
teaching bound, append its line to the open `## Review` entry, under its
Walkthrough list (grammar: → The Close), before the next stop opens. The
covered set is never held in context alone: a session that dies here
leaves the stops it walked, and the next one covers the rest instead of
re-asking what the developer already answered.

## Dispositions

*Read with this section: `cases.md` § Dispositions (the cases).*

**Read the process contract's § Iteration now**, unless already read
this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`,
for how an iteration's route and executor are derived, decide-forward's
amendment and sweep, and the marker's block this phase's iterate close
writes. This section carries only review's own outcomes beside it.

Every finding gets a disposition: the lens pass's unapplied findings, a
walkthrough surprise that demands a decision, a constraint the record
never named, the developer's own objection to a line of code, and every
ruling or hand-off Input item 3 read whose answer the shipped code does
not visibly settle. **The facilitator proposes each disposition with
its consequence in plain terms** ("this blocks the ship", "this
doesn't", "this is fixed here and now"), and the developer answers about
the code, never picks from a taxonomy. Five outcomes:

- **iterated in scope**: addressed within this topic. A trivial fix
  lands now as a developer edit (→ Developer edits). A substantive one
  whose right answer is still open is a full iteration of this topic,
  and the close names the phase it re-enters at, derived from the
  artifact that owns the contested statement, never picked here
  (→ Iterate).
- **decide-forward**: the developer has already made the new decision
  at the code. The edit stands, and the facilitator writes the dated
  amendment into the artifact that owns the statement: the decision's
  entry in `spec.md` (define § The Spec) or its home site in `plan.md`
  (write-plan § Task Structure). **Amendment first, sweep, line
  after**: the amendment is written, its footprint is swept at once
  over `plan.md` and `spec.md` per the sweep skill, ahead of any
  machinery commit, and only then does the disposition line assert that
  the amendment exists; it never promises one. The `payloads/` files
  are left as they are: they are the record of what implement applied,
  and their writers are write-plan, plan-review and implement's drift
  valve (the process contract, § The payload contract). This outcome
  fires **no close**: the session continues, and the edit rides the
  record like any other (→ The Close, for the `Delta pass:` a ship owes
  it).
- **lifted, blocking**: separate work the ship must wait for, so its
  work starts now. Mint its task in the project where the fix lives and
  read the mint back (*mint task*, binding: the operations contract);
  then record the edge (*order topics*, binding: the operations
  contract), the lifted task blocking this topic's task with the
  finding as the reason. The close is **wait**.
- **lifted, non-blocking**: separate work nobody is starting now.
  Capture it as a drop through the `ymer:capture` skill, source
  `review`: an `idea`, or a `bug` where what the finding saw is broken.
  Nothing else: no task, no edge.
- **declined**: the finding is weighed and left as it stands, either a
  trade-off the developer takes deliberately or a record that is
  correct as written. The `- F<n>` line carries the why and nothing
  else: no edit, no mint, no edge, no amendment. This outcome fires
  **no close** and has no consequence to land. It is not a parking
  space: a finding that still wants an answer is one of the four above.

**Append each disposition as it settles**: the finding's `- F<n>` line
naming its outcome and the calls already made (the minted task, the
captured drop, the recorded edge, the amendment a decide-forward
wrote), to the same open entry, before the next finding is taken up.
Same reason as the stops: what is settled is on disk.

**Then ask the fitness question** and record the answer. A "no" is a
finding and takes a disposition like any other.

**Early close** is the same close, differing only in when it happens
and which stops land as skipped. It is **the user's call**, never the
facilitator's: name what the walkthrough still holds and let the user
decide.

## Developer edits

Edits the developer makes during the review, fixing a line at a stop or
taking a trivial disposition now, are first-class: never a surprise,
never discarded. A dirty tree at the close is expected, and **every
close commits it**. The ship close folds it into the branch before the
squash; an iterate or wait close commits it just the same, its ref on
the entry's `Unreviewed:` line (→ Phase Close). Nothing this session
changed in a project checkout is left uncommitted at a boundary, and a
step that destroys uncommitted work stays a hold (the process contract,
§ Defaults and holds).

The lens pass reviewed one diff, and edits make it another. The pass
normally ran a session earlier, so "after the pass" spans the whole gap
between implement and review, every edit made between the two sittings
included. When a tree gained edits after the lens pass ran over it,
re-run that tree's green once before the ship close's fold: the
project's test suite for branch files, the plan's own gates for
machinery files, **per tree the edits touched and never per topic
kind**. A red is a finding and takes a disposition.

**An edit is trivial iff the record already covers it**: it repairs or
completes what `spec.md` and `plan.md` already say, remaking no recorded
decision and adding no unrecorded behaviour. Trivial edits ship
unreviewed. Anything else is an iteration: say so, take it as a
disposition, and let the route rule name the phase (or decide-forward
name the amendment) rather than shipping it unseen.

## The Close

*Read with this section: `cases.md` § The Close (the cases).*

Complete the `## Review — <date>` entry the lens pass opened and the
walkthrough has been filling: the fitness answer, the where-to-look
map, the tails, and any disposition still unwritten. Entries are dated,
**newest-first below the title**; a re-review prepends above the
existing history. The skeleton of a finished file follows. The ship
section is the ship close's prepend, absent on an iterate or wait
close, which append the entry's two ref lines instead:

```markdown
# <topic> — review

## Shipped — <YYYY-MM-DD>
Squash: <sha | none> · branch <topic> deleted · task closed completed   [`none` where step 2's preview was empty, so no squash ran (→ Phase Close, ship step 2)]
Catch-up: <fast-forward | merge <sha> (resolution: <note>) | already up to date> · re-green: green   [code-repo topics, step 2's merge; the clause where the outcome moved the branch, and only `green` reaches it (→ Phase Close, ship step 2)]
Machinery commits: <tree> <sha…> · <tree> <sha…>   [additive, per machinery tree, wherever the increment carries any]
Pending: git push · git push from <tree> · git push from <tree>   [each push that applies]
    [a meta topic has no branch, so no Squash line and no Catch-up
     line, since it never runs step 2: task closed completed rides the
     Machinery commits line, and one that made no machinery diff
     writes `Task closed completed` alone, with no refs line]

## Review — <YYYY-MM-DD>
Lens pass: <tier> over branch @ <sha> · <tree> <sha…> · <tree> <sha…>   [what this pass covered; no branch half on a meta topic]
Fixes applied (--fix): <list, or none> · branch <sha> · <tree> <sha…> · folded · state · re-green: <result>   [refs per tree the fixes touched; `folded` for a fallback pass's fixes, `state` for a state-folder fix; the clause where fixes landed]
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
Drawn: <YYYY-MM-DDTHH:MMZ> by review · #<id>, …     [where a decision of this close drew an open drop into the topic (→ Phase Close)]
Returned: <YYYY-MM-DDTHH:MMZ> by review · #<id>, …  [where a decision of this close cut a drawn drop from scope]
Reviewed: branch @ <sha> · <tree> <sha> <sha> · <tree> <sha>     [iterate and wait closes: what this entry's pass covered]
Unreviewed: branch <sha> · <tree> <sha> <sha> · <tree> <sha>     [the same closes, always; `none` where the close committed nothing]
```

**The entry's two ref lines** are appended on the **iterate and wait
closes only**: their one reader is the next iteration, and a ship's
refs already live in `## Shipped`. Each line asserts exactly one thing,
and keeping the two apart is what stops work shipping unseen:

- **`Reviewed:` certifies.** It names only refs whose content **this
  entry's lens pass covered**, read off that entry's own lens-pass line
  rather than re-derived: the branch anchor the pass diffed
  (`Reviewed: branch @ <sha>`), which is no longer the tip once a fix
  commit landed above it, and machinery refs as a **list, never a
  range**, because every machinery tree is shared and a range would
  sweep other topics' commits in. Commits made **after** that pass are
  never listed here: the fixes it applied, the decide-forward edits and
  the developer's edits are exactly the work no pass has seen. An entry
  whose pass covered no ref writes `Reviewed: none — no diff`.
- **`Unreviewed:` records.** It names what **this session committed
  and no pass covered**: the close's own commits, the step-1 fold on a
  code-repo topic among them, in whichever tree each sits, one marked
  group per tree. Implement's pre-executed fix commits are **not** among
  them: those are the fixes line's, their one store. A fallback pass's
  folded fixes ride the fold, so they are. A close that committed
  nothing writes `Unreviewed: none`. The line is **unconditional** on
  its four writers: the iterate close, the wait close, the drift-valve
  stop's marker block (implement § Drift Valve, which writes this line
  and no `Reviewed:`, since a stop runs no pass), and plan-review's
  *needs a define session* branch (plan-review § The Relay), which
  ordinarily writes `none`. So its absence carries information: an entry
  with a `Reviewed:` line and no `Unreviewed:` line predates the split.

**Tails**, each defaulting to none:

- **Learning**: the learning gaps met at the teaching bound, each
  captured drop by its id, and for a blocking-grade gap the
  Learning-project task minted with its edge recorded beside it. The
  capture or the mint already happened; this tail names it in the
  record rather than routing it.
- **Calibration**: any subject whose knowledge doc stayed unreachable
  through the close, so its calibration ran from the artifacts alone;
  or `uncalibrated (empty index)` where there were no rows to match; or
  `not run — rulings-only` where the lane was declared before Prep and
  dropped the calibration pass (→ Prep, The Open).

**The lightweight close-out's entry** is thin and in the same grammar:
the `## Review — <date>` head, one line `Lane: lightweight close-out
(the process contract, § Where to enter)`, and the ship section above it
exactly as at any ship. It carries no lens-pass, walkthrough, fitness or
tail lines, since none ran. Recognizers read it as shipped through its
ship section, like any other.

**The record is never a staging area.** Next-iteration work rides the
roadmap or the pool (a mint, an edge, an iteration marker, a captured
drop), never a list in `review.md` waiting for a drain nobody owns
(the operations contract, § Roadmap; the process contract, § Knowledge
placement).

## Iterate — the re-entry close

*Read with this section: `cases.md` § Iterate — the re-entry close (the cases).*

The record is **contested or exceeded**: the increment solves the wrong
problem, a spec decision did not survive contact with the code, or the
direction itself is in doubt. The session ends by iterating rather than
pushing through, and so does an *iterated in scope* disposition whose
fix is substantive and whose right answer is still open. **The phase is
derived, never picked**: it is the one owning the artifact where the
contested statement lives (the process contract, § Iteration). The
close prepends the marker as the newest entry, and **the findings below
it stay**: they describe real code, not a plan about to change.

```markdown
Iteration — <YYYY-MM-DD> → <phase>: <finding>
```

This line's grammar has its one home here, whoever writes it. The
block it opens, its `Consumed —` lines and how they are read live
elsewhere (the process contract, § Iteration). The topic re-enters the
pipeline at the named phase, and its task stays `doing`: nothing stores
a rung (the operations contract, § Roadmap). The branch and
`implemented.md` stand. The file always keeps its `# <topic> — review`
title line, so a fresh topic's iterate close writes the title plus the
marker above the lens-pass entry. The next iteration's implement close
prepends a fresh `## Review` entry above the marker, review fills that
same entry, and the file reads open again.

## Self-Review (inline)

Calibration: flag only what would corrupt state detection or ship
something the developer never saw.

1. Every lens-pass finding is in the record: applied fixes on the
   `Fixes applied (--fix):` line with its `re-green:` result where fixes
   landed, findings reported for disposition each with one, and refuted
   or skipped candidates on the `Refuted/skipped:` line, whether this
   session ran the pass or read it off the record.
2. Every stop run or skipped is a line, skips naming their kind, and
   the covered set matches what happened.
3. Every disposition's consequence landed: an in-scope fix is in the
   tree; a blocking lift-out has its task *and* its edge, read back (the
   mint shows in its project, the edge among what blocks the topic, with
   its reason); a non-blocking one has its captured drop. A **declined**
   finding has no consequence by construction: what its line owes is
   the why.
4. Every drop this session handed to capture landed: its id is on the
   line that sent it (a non-blocking lift-out's `- F<n>` line, a
   learning gap's entry in the Learning tail). A capture stopped at its
   guard is a finding, never a line written as if it had landed.
5. The fitness question was asked and its answer is recorded.
6. An iterate close prepended the marker above findings that stayed and
   appended the entry's ref lines: `Reviewed:` naming only what this
   entry's pass covered, `Unreviewed:` naming the close's own commits no
   pass covered. One re-derived at ship step 2 by a red catch-up run
   names the merge ref in the finding that stopped it, that ref's only
   store (→ Phase Close, ship step 2). A wait close left the entry
   complete with no ship section and appended the same two lines. A ship
   that followed a wait close confirmed the entry it ships is complete,
   fitness answered and stops accounted for, before the section went on
   top.
7. Tails routed: every learning capture named, every Learning mint with
   its edge recorded, and every unreached or absent knowledge doc named
   under Calibration.
8. Every tree that ships is green: the lens pass's own post-fix runs
   still stand, or a close-time run covers the edits made since, per
   tree the edits touched; and the ship's catch-up has its own run on the
   branch, its result on the `Catch-up:` line, wherever step 2 owes one
   (→ Phase Close, ship step 2).
9. Every decide-forward disposition's amendment exists in the artifact
   its line names, written before the line and its footprint swept in
   this session. Where this close ships, the `Delta pass:` over
   everything no pass has seen ran and is recorded, with its `re-green:`
   clause where owed (→ The Close).

Fix issues inline and move on: there is no re-review loop.

## Phase Close — three closes

*Read with this section: `mechanics.md` § Phase Close — three closes (the mechanics).*

**Read the substrate contract whole now**:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md`, for the network boundary,
commit ownership, git is never guessed, the two tree options, the branch
workflow, staging by explicit path, concurrent edits on a shared tree,
committing by hunk, and the two commit registers. This section and its
mechanics carry only review's own steps: each command, the tree it runs
in and the outcomes it expects. The pre-flight and close-binding rules
read at Input bind here too.

**Which close runs** is read off the dispositions and the fitness
answer: a blocking lift-out → wait; a substantive in-scope iteration
whose decision is still open → iterate; otherwise → ship. A
decide-forward disposition selects nothing, since it fires no close.
**Every close commits every tree this session changed** and writes the
record; only the ship close touches the project repo's main. Where the
lens pass's fixes landed is § The lens pass's to say, never restated
here.

**Each of the three closes draws and returns** what its entry's `Drawn:`
and `Returned:` lines name, right after the state-folder commit of step
5, or the save where the files are the record (the operations contract,
§ The pool: the read, the order at the close, a draw that cannot run).
The lightweight close-out's entry carries no such lines.

**Ship**: Claude-run end to end except the push. Work no pass has seen
takes its `Delta pass:` first, before step 1: everything after the
entry's lens-pass coverage anchor (→ The Close; → `cases.md` § The
Close). Its tier keys off the risk profile: **read the process
contract's § Review effort now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. A meta
topic skips steps 1, 2 and 6 (the process contract, § Topic kinds); its
machinery commit, where this session made machinery edits, stands where
steps 1 and 2 stand, run before step 3 so the ship section can name its
ref beside `implemented.md`'s refs.

**Iterate**: on a code-repo topic run ship step 1 first, the fold. Its
commit is this close's project-checkout commit, and its ref rides
`Unreviewed: branch <sha>`. Then append the entry's ref lines (both,
always: grammar → The Close), then prepend the marker (→ Iterate), then
steps 5 and 7. The branch and `implemented.md` stand for the next
iteration, the branch's tree clean and this session's edits committed on
it. The task stays `doing`.

**Wait**: ship step 1's fold first, exactly as the iterate close runs
it, its ref on `Unreviewed: branch <sha>`. The `## Review` entry then
stands complete with no ship section and the same two lines appended.
The blocking edge was recorded at its disposition; read it back (*order
topics*' postcondition). Then steps 5 and 7. The task stays `doing`.
The next review session reads the edge, runs the `Delta pass:` over the
subject § The Close defines, never ships unseen, and ships. Unlike an
iterate close, a ship after a wait has no next lens pass to catch what
that delta pass misses.

## Next Phase

None: review is the last phase, and the development process ends here.
Stop after the capture block. The terminal report lists every pending
step with its command written out (the report rule: the process
contract, § Defaults and holds). After a ship that is the push, the
user's alone: `git push` from the project repo, and `git push` from each
machinery tree this session committed. After an iterate close, name the
marker's phase, for a fresh session. After a wait, name the lifted task,
and that review re-enters when it resolves. An iterate or wait close
that made a machinery commit lists the same push per tree: that tree's
main is ahead of origin the moment its commit lands.

## Remember

- The head-scratch test bounds the stops, never a clock or a count.
- Every topic is reviewed; the lightweight close-out is the user's call.
- The lens pass normally arrives already run; run it only as the
  fallback, and announce the wait.
- Trust the fixes, and never apply a plan-fidelity finding. Where the
  pass's fixes land depends on who ran it (→ The lens pass).
- `review.md` grows as the session runs: findings, then each stop and
  each disposition as it lands, then the close.
- Stops in story order, constraints derived from spec and plan, the
  bytes unaltered with `path:line`.
- One question, one referent, through the question tool, then wait.
- Every finding gets a disposition, every ruling deferred to review
  among them; work nobody starts now is a captured drop.
- Three closes. Both non-ship closes append `Reviewed:` and
  `Unreviewed:`; a ship takes its `Delta pass:` first and never ships
  unseen.
- The ship section is what "shipped" reads; the push is the hold.
