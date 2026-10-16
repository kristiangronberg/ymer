---
name: brainstorm
description: Turns an idea, a problem, or a piece of captured work into a chosen direction through conversation: it finds the topic, explores approaches with the user, and records what was chosen, what was discarded and why. Use at the start of the development process, when the work is still an idea.
---

# Brainstorm

Brainstorm is the first phase of a topic. It turns a rough idea into a
chosen direction through conversation with the user, and writes that
direction down as the topic's direction doc: what was explored, what
was chosen, what was discarded and why, and what the next phase still
has to answer. A trivial fix skips the pipeline, and a sharp spec goes
straight to write-plan (the process contract, § Where to enter).

This file is brainstorm's spine: its intent and its moments in order.
Its **mechanics** (the Claude Code way: git, the state folder, the
harness's tools) are in `mechanics.md`, and its **cases** (the earned
precision: edge cases, exceptions and rulings) are in `cases.md`, both
under this file's headings. A section with entries there says so in its
first line, and those entries are read when the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics).*

**Read the plugin glossary's entries for brainstorm's vocabulary now**,
unless already read this session: `${CLAUDE_PLUGIN_ROOT}/glossary.md`,
each entry by its heading: *direction doc*, *topic resolution*,
*arrival*, *drawn topic*, *split child*, *iteration*, *discovered set*,
*sketch*, *sketch record*, *branch intake*, *intake gate*, *progression
story*, *pending interview*, *unattended*, *settle signal*, *pre-image*,
*convergence beat*, *reframe*, *product alignment*, *prerequisite
check*, *operator bar*, *blocking gap*, *falling-behind gap*,
*enrichment gap*, *sweep artifact*, *machinery tree*. This file uses
those terms and never defines them.

The session runs in order: resolve the topic and read its arrival, take
in whatever came with it (a drawn topic's `request.md`, a sketch branch,
a dirty tree), interview the user, run the convergence beats against the
candidate the interview forms, consolidate the scratch doc once the user
says the direction is settled, check it, have the user review it, and
close.

**Announce at start:** "I'm using the brainstorm skill to explore this
idea. Topic: `<name>` (<the arrival's announcement>)." The announcement
for each arrival and each name-match outcome is under § Topic
Resolution. Repo-specific preferences in a repo's `CLAUDE.md` override
the defaults below.

Brainstorms evolve and reverse mid-session. That is the process
working, not failing: revisit settled points freely and keep the
scratch doc current.

## Topic Resolution

*Read with this section: `cases.md` § Topic Resolution (the cases).*

Topic resolution runs first, before any question about the idea. It
finds the topic by name, then reads which arrival the topic is in, and
the arrival decides the session's first action: nothing is recalled and
nothing declared.

**Read the process contract's § Defaults and holds now, and the
operations contract whole**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`. They hold the
pre-flight, close binding, gate defaults and holds, the fallback rule,
the report rule and the interview as a hold; and every roadmap
operation this phase calls (*look up topic*, *mint task*, *order
topics*, *annotate task*, *retire topic*) with its postcondition and the
failure rule, the outward-write rule for rulings, the topic's artifacts
(the `request.md` template, the `sketch.md` reader contract, the
`pre-image/` slot, how the state folder's kind is read and what a state
folder in no git repository skips), split topics, and the topic ID's
folder. This section carries only brainstorm's own reads beside them.

**The pool.** The same read holds the pool's two operations, *draw
drops* and *return drops* (the operations contract, § The pool): who
draws, which closes draw, the `Drawn:` and `Returned:` lines and where
they sit, the families a draw and a return take, the read and the
read-back, the order at the close with a returning close's correction
of its own `Returned:` line, a draw that cannot run and how its report
names it, the pre-flight's finish,
and how the front is read. The front comes from this one line, which the
harness fills in as it loads this skill:

> Front as configured: `${user_config.front}`

**The pre-flight runs first**: derive the predecessor's close state and
any pending step from durable state, finish an unfinished close from
its first missing outcome, and re-report each pending step with its
command. It runs none of the project checkout's git steps, no switch, no stash and no merge: a dirty
tree or a non-main branch is the user's sketch, the input § Sketch
Intake and § Branch Intake take in, and § Branch Intake owns the
branch.

Two reads more, each where its marker is found:

- Where `review.md` tops with an `Iteration —` marker, **read the
  process contract's § Iteration now**, unless already read this
  session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the
  marker's block, its `Consumed —` lines, and whether the route is live
  or consumed and which phase it makes due.
- Where `brainstorm.md` or `spec.md` carries the `Interview pending —`
  marker at its head, **read the interview procedure whole now**,
  unless already read this session:
  `${CLAUDE_PLUGIN_ROOT}/interview.md`, for the pending interview, its
  resume, and the stop on another phase's artifact.

### Find the topic by name

How the session was invoked decides the first step:

- `/ymer:brainstorm <topic>`: resolve the name as below.
- `/ymer:brainstorm new <topic>`: the user declares the topic new, so
  the clean miss's confirmation is skipped. The duplicate guard stays:
  where the name exactly matches an open task or a topic directory,
  stop and ask rather than create a duplicate.
- `/ymer:brainstorm` with no topic: ask what the topic is, then resolve
  it.

Look the name up in the repo's Roadmap project, where every topic in
flight is a task, and against the existing
`<state folder>/<repo>/*/*-<topic>` directories (*look up topic*,
binding: the operations contract). In a code repo, also read the
current branch (`git branch --show-current`, read-only): a non-main
branch is the proposed sketch source, whatever its name (→ Branch
Intake). On an iteration the branch carries the reviewed increment
instead, and the iteration's row below says which of its commits are a
sketch.

The name match has four outcomes:

- **Exact match** on a task, or a topic directory with no task: read the
  arrival (→ Read the arrival).
- **Near match** (a substring or slug variant of a task or directory
  name): one disambiguation question, "did you mean `<X>`, or is this
  new?"
- **Clean miss**: one confirmation question, "`<name>` is not in the
  roadmap: new topic?" A new topic gets a new date and its own task,
  *mint task* at `doing` at the close. A task the user hands in as the idea's text is a clean miss as well: the session mints the topic's own task, and the old one is the user's to close.
- **Repo not onboarded** (no `<state folder>/<repo>/` subtree, or no
  Roadmap project in the binding): every topic is new. Say so, and
  onboard per the binding at the close.

A new topic announces "new (not in the roadmap)", or "new, forced via
`new` keyword" when `new` declared it.

**Hold: every topic-resolution question**: the missing topic name,
`new`'s duplicate guard, the in-flight arrival's extend-or-abort, the
near match, the clean miss, the discovered set (the process contract,
§ Defaults and holds). Unattended, the session stops at the first such
question with nothing written, its report naming the question.
`/ymer:brainstorm new <topic>` is the unattended door for a new topic,
and a drawn topic puts no question at all.

### Read the arrival

An exact match reads three coordinates before anything is asked: the
task's status from the lookup; the topic folder, present or not, and
whether it holds `request*.md`; and, where the folder exists, the
artifact heads: `review.md`'s first recognizer top-down (the review
skill, § Recognizers) and whether `brainstorm.md` or `spec.md` carries the
`Interview pending —` marker at its head. They land on one arrival, and
its row gives the first action. Where the folder holds a `request.md`,
it is this topic's intake, whoever wrote it: read it before anything
else.

| Arrival | Recognized by | First action | Announcement |
|---|---|---|---|
| Drawn topic | a `doing` task whose folder holds only mint's `request.md`, or no task and a matching topic directory with no live marker on top of `review.md` and no `Interview pending —` marker at the head of `brainstorm.md` or `spec.md` | Take the intake in with no extra question (→ Drawn-topic Intake). Reuse the directory; nothing moves, and the topic keeps mint's date. | drawn topic, its `request.md` from mint |
| Split child | a `doing` task with no folder | Read the child's fork in the parent's child-list entry and say in one line which it is, naming, on a real fork, the deciding fact about to be probed. Then write the child's folder and doc (→ The split child's doc). No question, no *mint task*. | split child of `<parent>` |
| Iteration | a live marker naming brainstorm on top of `review.md` | The marker is the brief: read `review.md` first, the finding and the entries below it, then rewrite `brainstorm.md` in place, never a second doc. The close, a pending close included, appends `Consumed — <YYYY-MM-DD> by brainstorm` to the marker's block. On a code-repo topic the branch carries the reviewed increment, not a sketch: run the record-names-it test over `git log main..HEAD` (the write-plan skill, § Input; the implement skill, § Readiness Gate). Where every commit is one the record names, neither branch intake nor the reset hand-off runs. Commits the record does not name are a sketch on top: branch intake records those alone, and the reset floor is the newest record-named commit, not main. | iteration, marker of `<date>` |
| Another phase's marker | a live marker naming another phase on top of `review.md`, or the `Interview pending —` marker at the head of `spec.md` | Stop and name that phase, its command written out: `/ymer:define <topic>` for the marker on `spec.md`. | none: the session stops |
| Pending interview | the `Interview pending —` marker at the head of `brainstorm.md`, whatever the task's status (a close torn before its mint leaves it so, and `mechanics.md` § Commit the Artifacts, Then Reset, step 1 then mints the task as usual) | Resume the interview at the first unanswered prepared question, with no extend-or-abort question: the prepared questions are the agenda, and more may join them. The resume's rules are the interview procedure's (§ 4. Pending). Where `review.md` is topped by a marker naming brainstorm, live or consumed by this interview's own pending close (its block holds the `Consumed — … by brainstorm` line that close appended), the topic is an iteration and the iteration row's branch rule holds too. | pending interview of `<date>`, `<n>` questions |
| In flight | a `doing` task whose folder holds more than mint's `request.md`, with no live marker and no `Interview pending —` marker at either head | Ask: extend the existing `brainstorm.md` in its directory, or abort, since the topic may want a different phase. Only the user knows whether the recorded direction is to be extended. | none: the question comes first |
| Closed topic | a completed or cancelled task, with or without a folder, and no `Interview pending —` marker at the head of `brainstorm.md` | Treat it as a clean miss: confirm it as new, name the old folder as prior art, and give the new topic a new date and its own task. Reopening a closed task is the user's reopen, never a phase's. | new (not in the roadmap) |

Where the lookup found more than one piece for the name, a drawn topic
and a sketch branch say, the drawn topic's announcement reads
"discovered set: drawn topic + branch `<branch>`" (→ `cases.md`
§ Topic Resolution).

### The split child's doc

Create the folder under today's date and
write `request.md` from the task's description through the operations
contract's template (the operations contract, § The topic's artifacts),
with `started:` today: the task already is the topic. Then write the
child's own `brainstorm.md`, narrowing the parent's direction doc, which
the task's description names. It opens with four things: the parent
link as a relative path, worded "split child of"; the parent's
child-list entry, which is this child's scope; the inherited verdicts
it narrows (discarded options, the reframe verdict); and the task's id
with its project and status. No sentence says why this phase runs: the
file's existence says it. On "none — narrow and go" the doc is written
straight in its consolidated shape, the shape the consolidated-sections
list in § Scratch Doc → Consolidate gives, with no interview and no
pre-image, since there is no scratch to keep. Before writing any
measured claim into it, **read the sweep skill's § Claims now**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md`,
§ Claims: stamps, controls and the sweep artifact, for stamps, controls
and the `inferred:` register the self-review's items 7 and 8 check the
doc against. The self-review and the review gate run as usual. A real
fork runs the interview in full.

## Drawn-topic Intake

This section takes a drawn topic's intake in. Its re-derivations are
the session's first probes, so **read the sweep skill's § Claims now**,
unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md`,
§ Claims: stamps, controls and the sweep artifact, for stamps, controls,
the `inferred:` register and the committed sweep artifact a family count
comes from.

1. Read `request.md` as a starting point, not a decision already made.
   Re-derive its measurements before they size the topic (a count in a
   drop is the capturer's, not this session's), and treat its
   `inferred:` marks, mint's root cause among them, as claims to
   re-verify.
2. The task already is the topic: no rename, no move, and no second
   task. The topic keeps mint's name and date.
3. Every outcome closes the same way, "not pursuing this" included:
   `request.md` stays in the topic directory, the direction doc records
   the decision, and the task closes as cancelled, the why in its result
   (*retire topic*, binding: the operations contract).

## Branch Intake

*Read with this section: `mechanics.md` § Branch Intake (the mechanics).*

Branch intake runs on a code-repo topic whose session starts on a
non-main branch. That branch is the user's sketch, so everything on it
is input and the intake gate does not apply: the session renames the
branch to the topic, records the sketch in `sketch.md`, and asks one
light question. On an iteration only the commits the record does not
name are input (→ Read the arrival, the iteration row).

**Read the substrate contract whole now, and the process contract's
§ Topic kinds**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. They hold the network
boundary, commit ownership, git is never guessed, the two tree options,
the branch workflow, staging by explicit path, concurrent edits on a
shared tree, committing by hunk and the two commit registers; and the
two topic kinds with the duty to commit machinery edits. A session that
reads them here does not read them again at the close.

## Sketch Intake

*Read with this section: `mechanics.md` § Sketch Intake (the mechanics).*

Sketch intake runs on a code-repo topic with no topic branch: the user
often sketches the idea in code just before the session, and that
sketch arrives as uncommitted changes on main. The intake gate asks
which of it is input, and what is input is recorded verbatim in
`sketch.md`.

**Mine the sketch into the direction doc during the session**: the
fragments that carry the chosen direction are quoted or summarized in
`brainstorm.md` (the record's reader: the operations contract, § The
topic's artifacts), the mechanism the sketch implies and the concepts
it introduces. Ask about the sketch's *intent*, not just its
content: what was easier to write than to say?

## The Interview

*Read with this section: `cases.md` § The Interview (the cases).*

**Read the interview procedure whole before the first question, and
follow it**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/interview.md`, the one home of the question
discipline brainstorm and define share: its ground rules, the agenda,
the answers recorded as they land, and the pending interview where a
question cannot be put.

**At the first probe, read the sweep skill's § Claims now**, unless
already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md`,
§ Claims: stamps, controls and the sweep artifact, for stamps, controls,
the `inferred:` register and the committed sweep artifact a family count
comes from. Every measured claim the session writes into the doc
follows it. This section carries only brainstorm's own rules beside
these two.

- **Open with the problem and the win, in plain words**: the problem in
  one paragraph, what the work buys beyond the itch that filed it, and
  the solution shape in a few pieces, and only then the facts. It is
  the direction doc's own "idea in one paragraph", spoken first, so the
  verified evidence arrives behind the framing rather than as it. A win
  the user has to ask for is the scope cut or the placement question
  nobody saw (a doctrine that ends re-litigation, a cross-repo item
  filed in a product roadmap).
- Check project context before asking: existing docs, the glossary if
  the repo has one, recent commits. When a coding-standards companion
  skill defines the decision procedure for the topic's domain (guard
  tiers, say), load that skill whole before forming a recommendation:
  grep excerpts of it mislead.
- A **positioning topic**, one that decides what the product is or
  refuses to be, reads the product page here, at the interview, not at
  convergence: its settled sections are standing constraints, and the
  procedure's standing-constraint rule applies to them. Fetch it through
  product-design's recipe (the product-design skill, § The product
  page), never an ad-hoc call.
- Propose **2–3 approaches with trade-offs** before settling.
- YAGNI ruthlessly: cutting scope is a first-class brainstorm outcome,
  and so is "not worth pursuing".

### Unattended: closing around the interview

A pending close runs everything before the interview, and stops with
nothing written wherever topic resolution or intake puts a question
(the hold under § Find the topic by name, and `mechanics.md` § Sketch
Intake, step 3). It then writes
`brainstorm.md`:

- the title and the `Interview pending —` marker;
- the opener as far as it can be written: the problem in one paragraph
  and what the work buys, with no solution shape;
- on a split child, the four things its doc opens with (→ The split
  child's doc);
- the intake's references;
- the `## Interview` section, in the shape the interview procedure
  gives (the interview procedure, § 4. Pending);
- a `## Verified state` section for the probes it ran.

The reframe's prior-art material may be prepared under the question it
informs. On an iteration, where `brainstorm.md` already stands, the
marker and the section join it and its text stays as it is.

At the close, `mechanics.md` § Commit the Artifacts, Then Reset,
step 1 runs *mint task* at `doing` where
`/ymer:brainstorm new` invented the topic (a drawn topic's task is
`doing` already), so the resume reads a `doing` task. Nothing else runs
there: no other mint, no capture, no edge, no outward ruling, no reset
hand-off. No convergence beat runs, since they run at the resume
against the candidate the interview forms, and consolidation, the
self-review and the review gate are never reached. That section's
step 2 commits under the pending message, then the capture block and
the report (→ Next Phase).

### Reframe

Reach for this when the direction was reached by **extending what is
already there** (a second axis beside the first, another flag, one more
special case), or when the topic makes a first-of-its-kind primitive,
interface or architecture choice. Skip it for routine or localized
work, and for a class of problem the field has no canonical answer to.
It runs at convergence, against a formed candidate direction, before
that direction is offered for the pick (`cases.md` § Scratch Doc →
Consolidate).
Where the test above says skip, record the skip in one line in the
direction doc, with the reason.

Three beats, and the third is the point:

1. **Reframe from first principles.** Set the current direction aside
   and solve the problem from scratch. Ask first whether the problem is
   even well-defined: if it is not, that is the finding, the direction is
   premature, and exploring goes on before anything settles.
2. **Survey the prior art.** How does the field solve this *class* of
   problem, and what are its canonical, converged shapes? Name them.
   Thin by default: name the canon from your own knowledge. Do not
   assert a "standard" you are unsure of: verify a prior-art claim the
   verdict leans on, and reach for the `deep-research` skill when the
   canon is genuinely unknown or contested.
3. **Reconcile and decide.** Compare the fresh view with the current
   direction and return a verdict, the payoff of the whole move:
   - **Stay the course**: the direction already is the right shape.
   - **Adjust within the direction**: the same direction, a better
     shape (generalise what you were about to special-case, say).
     Correcting, not reverting.
   - **The direction is wrong**: the reframe undermines it; keep
     exploring rather than settle.

   Record the verdict and its reasoning in the direction doc's
   chosen-direction and discarded-options sections. The verdict is what
   the next phase needs, not the survey behind it.

**Adopt the shape, shed the baggage.** When you take a canonical
solution, take its *shape*, not its every part. Keep each element of
the standard answer only if the context that makes it standard holds
*here*; otherwise leave it out as YAGNI and say so. Every element left
out names the constraint that justifies leaving it, and that constraint
should already be written down (a `CLAUDE.md` fact, a standing doc, the
glossary). A deciding constraint that lives nowhere is itself a finding
worth surfacing. The guard cuts both ways: do not import complexity you
have no use for, and do not reject a proven shape merely because it was
not invented here.

### Product alignment

*Read with this section: `cases.md` § Product alignment (the cases).*

Run this when the topic shapes a **surface a user will operate**: a
human UI, an MCP or LLM tool surface, a CLI, an API, a service, a
business process, or a skill or process document an LLM executes. Skip
it when no user-operated surface is being shaped: internal refactors,
data plumbing, a typo or link fix in a skill.

Check the candidate direction against the product-design principles,
per the product-design skill: the gate first (who is the user: human,
LLM, or both; which stance: instrumental or autotelic), then each
principle's checks. The principles live in that skill alone, and so do
the product page's fetch recipe, its miss rule and the pushback duty
its settled sections carry: this beat restates none of them. Fetch the
page through that recipe.

Close with the reframe's verdict vocabulary (stay the course, adjust
within the direction, the direction is wrong), and record in the
direction doc the gate's answers and the verdict with its reasoning.

### Prerequisite check

Run this when the settled direction touches subject matter the user
would have to operate once it ships. Skip it when the direction
introduces no new subject matter: one sentence and move on. Minutes,
not analysis.

It runs at convergence, against a formed candidate direction, beside
product alignment, at the moment consolidation is triggered (`cases.md`
§ Scratch Doc → Consolidate). Which subjects the work touches is a direction-level
fact: earlier is guesswork, and later re-couples learning to the
critical path this check exists to keep it off.

Ask per subject: is the user at the operator bar for the shipped
result? Classify each gap by its kind, and dispose:

- **blocking gap**: a learning task with a dependency edge to this
  topic, its reason on the edge, recorded as a discovered dependency
  (*order topics*, binding: the operations contract).
- **falling-behind gap**: a **learning** drop in the pool, through the
  `ymer:capture` skill. No task and no edge; the pipeline proceeds.
- **enrichment gap**: no task and no edge. The leaf is written now, in
  the beat: append an unchecked entry to the subject's knowledge doc,
  by tutor's entry format, index and **every write rule that section
  carries**: § Knowledge Docs in
  `${CLAUDE_PLUGIN_ROOT}/skills/tutor/SKILL.md`, where the entry format
  and the whole-body-root rule sit, and in
  `${CLAUDE_PLUGIN_ROOT}/skills/tutor/mechanics.md`, where its write
  rules sit. Its subject index is in the Ymer Node, read with the node's
  `notebook` `query`. Where there is no knowledge doc yet, or no subject
  index to find one through, the leaf rides the direction doc's record
  instead: creating the doc is tutor's opening, never this beat's.

A learning task lives in the **Learning project**, whose task shape,
status map and mint targeting are the operations contract's (the
operations contract, § Binding per coordinator); a learning drop's
grammar is the capture skill's; decomposing a subject stays with
tutor's opening. Record in the direction doc the subjects touched, each
gap's disposition and the why behind any edge. The mints, edges and
captures land at `mechanics.md` § Commit the Artifacts, Then Reset,
step 1.

## Scratch Doc → Consolidate

*Read with this section: `cases.md` § Scratch Doc → Consolidate (the cases).*

The direction doc starts as scratch and ends consolidated. Start it
early and keep it rough: notes appended as the conversation moves,
cheap to rewrite when the session reverses. Once the user says the
direction is settled, it is rewritten once, in place, into the shape
the next phase reads. A narrow-and-go split child writes that shape
directly (→ The split child's doc): no settle signal, no scratch and no
pre-image, so only the consolidated-sections list below applies to it.

**Hold:** the settle signal, under `cases.md` § The Interview's hold;
an unattended session with a pending interview never reaches this
section, since it closes around that interview (the process contract,
§ Defaults and holds).

First **keep the scratch doc's pre-image**. Where git tracks the state
folder, **stage** it, `git -C <state folder> add
<repo>/YYYY/MM-DD-<topic>/brainstorm.md`, so the state before the
rewrite survives in the index. Consolidation is the only in-place
rewrite in the pipeline with no committed pre-image, because brainstorm
commits only at its close; at a resume the pending close's commit is
one, the staged copy agrees with it, and the stage runs unchanged. The
staged copy is what the self-review's dropped-content check diffs
against. Where the files are the record, copy the doc into the topic's
`pre-image/` slot as `pre-image/brainstorm.md` instead, by the slot's
rule (the operations contract, § The topic's artifacts), and that copy
is what the check compares against; the close removes the copy's stamp.

Then rewrite the doc in place into its consolidated form. A pending
interview's marker and `## Interview` section leave in the same
rewrite, their answered questions landing in the sections below:

- The idea in one paragraph
- Possibilities explored, including the discarded ones and why they lost
- The chosen direction. Where the user made a standing call, it is
  recorded as a decision with the concrete moment that lands it ("the
  first decision that must give X a modern answer drops it"), never as a
  bare permission ("may be dropped whenever a decision forces it") the
  next phase has to read for whether it has fired
- What the direction makes unnecessary: removals, retired tokens,
  simplifications it unlocks downstream. A direction that removes
  nothing says so in one line
- On a split: the child list, one line per child, each with its default
  name `<parent-slug>-<part>`, the direction settled for it, its
  **fork** (the one decision its own brainstorm still makes, or "none —
  narrow and go") and its intended order. An entry phase may be named
  (the list's standing, the mint move and what each child's mint
  description names: the operations contract, § Split topics)
- Mined sketch fragments that carry the idea (the full verbatim record
  lives in `sketch.md`)
- Optional: a verified-state section for measurements the session ran,
  whose contract is `cases.md` § The Interview
- Open questions handed to the next phase
- `## Drops`, last, where a decision drew a pool drop into the topic or
  cut one: the `Drawn:` and `Returned:` lines, every earlier one
  carried verbatim and this close's own appended (the operations
  contract, § The pool)

## Self-Review (inline)

After consolidating, look at the doc with fresh eyes. Calibration:
**only flag what would send the next phase in the wrong direction**
(missing direction, contradictions, lost ideas). Wording and polish are
not findings.

1. **Direction chosen?** A pile of possibilities with no choice is an
   unfinished brainstorm, unless the settled outcome is explicitly "not
   pursuing this".
2. **Contradictions?** Do any sections disagree with each other?
3. **Sketch preserved and mined?** `sketch.md` holds the verbatim
   attempt (plus the user's notes), and `brainstorm.md` quotes what the
   direction relies on: nothing idea-bearing lives only in the working
   tree, about to be reset away.
4. **Dropped scratch content accounted for?** Read plain
   `git -C <state folder> diff -- <repo>/YYYY/MM-DD-<topic>/brainstorm.md`,
   the worktree against the copy staged before the rewrite. Not
   `git diff --cached`: that is index against HEAD, which for a freshly
   staged doc shows the whole pre-image as additions and no deletions at
   all. Where the files are the record, compare `pre-image/brainstorm.md`
   with `brainstorm.md` in the topic folder instead, with whatever
   compare reaches the folder. The diff's deletions are the drop
   candidates: each must reappear in the consolidated doc as chosen,
   discarded with its why, or an open question; dropped is a
   destination, not an absence. A narrow-and-go split child kept no
   pre-image, so this item reads as not applicable there.
5. **Open questions explicit?** The next phase should not have to
   rediscover what we already know we don't know.
6. **Intake kept?** (Only on a drawn topic or a split child.) The task
   is still `doing` under its own name, and the `request.md` the topic
   arrived with stands as it was written.
7. **Verified-state claims stamped?** (Only when the doc carries the
   section.) Every claim in it carries its stamp, and every absence or
   zero its `control:`; an unstampable claim moves out of the section or
   drops.
8. **Load-bearing direction claims probed or marked?** A claim the
   direction rests on (a justification, a decision premise, a scope
   exclusion, **an open question's premise**) outside any evidence
   section carries its probe, a stamp, or the literal marker
   `inferred:`, as the sweep skill's § Claims says; evidence sections
   stay item 7's. The open questions are the next phase's agenda, so a
   measurement-shaped premise inside one ("no precedent exists", "many
   callers") sets the choice that phase inherits: probe it or mark it
   like any other.
9. **Durable knowledge routed?** **Read the process contract's
   § Knowledge placement now**, unless already read this session:
   `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the chartered
   stores, the routing test, the stop-and-pick rule when nothing fits,
   and why a hand-off recorded in this doc discharges the duty. A
   principle, constraint or fact established this session that outlives
   the topic reaches its store now (a product page only through a vision
   drop, since the beat never writes one), or this doc's open questions
   name the store as an explicit hand-off; it is never left implicit in
   the direction prose. Calibration: only what would change behaviour in
   a future session, never what a store already records.

Fix issues inline and move on: no re-review loop.

## User Review Gate

Ask the user to read the consolidated doc:

> "Direction doc written to `<path>`. Please review: anything to change before we close the session?"

Iterate on any input that arrives. **Default: proceed to the phase
close — review post-hoc at the phase commit
(`git -C <state folder> show <sha>`), or at `brainstorm.md` itself where
the files are the record** (the process contract, § Defaults and
holds).

## Commit the Artifacts, Then Reset

*Read with this section: `mechanics.md` § Commit the Artifacts, Then Reset (the mechanics).*

The close puts the topic in the pipeline, commits what this session
wrote, and only then hands the sketch's reset to the user: the reset
must only ever destroy what `sketch.md` and the commit already keep. It
runs once the user has reviewed the doc, or once the gate's default has
fired.

**Read the substrate contract whole now, and the process contract's
§ Topic kinds**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the same rules
§ Branch Intake names. The substrate contract's head says where git is
in reach; a session that meets none of its cases reads nothing there.

**Draw and return.** A finished close, one that consolidated
`brainstorm.md` or a narrow-and-go split child's that wrote its shape
directly, draws and returns what this close's lines in its `## Drops`
section name, right after the commit's verify (`mechanics.md` § Commit
the Artifacts, Then Reset, step 2), or the save where the files are the
record, and before the reset hand-off, so the hold cannot close the
phase around the draw (the operations contract, § The pool: the read,
the order at the close, a draw that cannot run). A pending close draws
nothing.

**Capture block:** invoke the `ymer:capture` skill, source
`brainstorm`. The battery, the drop grammar and the write live in that
skill alone.

## Next Phase

Stop. Report the topic directory and its task. On a split, report each
child's task with its literal next command, `/ymer:define <child-slug>`
or the phase the child's entry names, its folder created at that phase.

Then name the next phase, in a fresh session (the process contract,
§ The map): normally **define**, which runs scout itself when no survey
map exists yet; or a standalone **scout** first, when the area is large
or unfamiliar enough that the survey map deserves its own review before
any interview. Where the settled direction is fully specified and
prose-only, offer the lightweight close-out instead of naming define
(the process contract, § Where to enter). Never invoke the next phase's
skill here.

A pending close (→ The Interview) names no next phase. Its report names
the pending interview (the marker's count, the trigger's evidence
quoted, the tool list or the refusal text) and its resume command,
`/ymer:brainstorm <topic>`, written out, with the resumed session's
announcement line as its verify. Define, scout or write-plan invoked in
its place stops on the marker and names brainstorm.

## Remember

- Resolve the topic before anything else, announce its arrival, and
  reuse an existing topic directory: never mint a duplicate.
- A drawn topic's `request.md` is its intake, read first and never
  rewritten; its task already is the topic.
- The interview is a hold: unattended, it is prepared into
  `brainstorm.md` under the `Interview pending —` marker and the close
  runs around it.
- The convergence beats are situational and run against a formed
  candidate, before the pick.
- The sketch is input, not a commitment: `sketch.md` keeps it verbatim,
  `brainstorm.md` the mined fragments.
- Scratch stays scratch until the user says settled; keep its pre-image
  before the consolidating rewrite, so the self-review can see what the
  rewrite dropped.
- The doc records discarded options and why, so later phases do not
  re-litigate them.
- Commit the artifacts before the reset hand-off; the reset is the
  user's to run.
