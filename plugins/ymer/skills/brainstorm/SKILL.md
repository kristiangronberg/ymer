---
name: brainstorm
description: Use to explore an idea, a problem, or a topic drawn from the pool into a chosen direction — phase 1 of the development process.
---

# Brainstorming

This file is the brainstorm skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics).*

Turn a rough idea into explored possibilities and a chosen direction through collaborative dialogue. The output is the topic's **direction doc** — the term is the plugin glossary's, where the line against the spec and the plan is drawn. It records what was explored, what was chosen, what was discarded and why, and what remains open for the next phase.

Not for small fixes or work that already has a spec — a trivial fix skips the pipeline entirely, and a sharp spec goes straight to write-plan (entry ladder: the development-process skill).

**Announce at start:** "I'm using the brainstorm skill to explore this idea. Topic: `<name>` — <resolution result>." (resolution wording per Topic Resolution below)

- (Repo-specific preferences in CLAUDE.md override these defaults)

Brainstorms evolve and reverse mid-session. That is the process working, not failing — revisit settled points freely and keep the scratch doc current.

## Topic Resolution (do this first)

*Read with this section: `cases.md` § Topic Resolution (do this first) (the cases).*

How the session was invoked decides the first step:

- `/ymer:brainstorm <topic>` — resolve the name as below.
- `/ymer:brainstorm new <topic>` — the user declares the topic new: skip the clean-miss confirmation (case 4 below). Keep the duplicate guard: if the name DOES exactly match an open task or a topic directory, stop and ask rather than create a duplicate.
- `/ymer:brainstorm` with no topic — ask what the topic is, then resolve it.

Look the name up in the repo's Roadmap project — every topic in flight is a task there — and against the existing `<state folder>/<repo>/*/*-<topic>` directories (*look up topic* — binding: the operations contract). In a code repo, also read the current branch (`git branch --show-current`, read-only): a non-main branch is the proposed sketch source, whatever its name — see Branch Intake below; on an iteration arrival the branch carries the reviewed increment instead, and only the commits the record does not name are a sketch source at all, which case 2 states.

**Topic resolution reads three coordinates, not one** (term: the plugin glossary): the task's status the lookup just returned, the topic folder — present or not, and whether it holds `request*.md` — and, where the folder exists, the artifact heads: `review.md`'s first recognizer top-down (review § Recognizers), and whether `brainstorm.md` or `spec.md` carries the `Interview pending —` marker at its head (development-process § Artifacts). A marker on top of `review.md` is **live** while its block holds no `Consumed —` line; the block, the line's grammar, who writes it and which phase it makes due are review § Input item 2's. The three coordinates land on one of seven **arrivals**, and the arrival decides the phase's first action — nothing is recalled and nothing declared. Then classify the name match:

1. **A drawn topic** — an exact match on a `doing` task whose folder holds nothing but the `request.md` the `mint` skill wrote when it drew the topic (or no task but a matching topic directory) → existing intake; proceed with no extra question (→ Drawn-topic Intake). REUSE the existing directory — nothing ever moves; do not mint a new date. A `brainstorm.md` there carrying the `Interview pending —` marker at its head is the pending interview below, whatever the task's status — a close torn before its mint left it so — and the close's step 1 mints the task as usual where none exists.
2. **Exact match on a `doing` task** (the topic is already in the pipeline — a drawn topic whose folder holds only its `request.md` is case 1) → read the other two coordinates before asking anything:
   - **No folder** → a **split child**. The mint at a split creates the child's task and no folder (→ the operations contract, "Split topics"), and every other door writes the folder before its task exists or as it is created, so a folder-less `doing` task is a child by construction. Read the child's **fork** first — the parent's child-list entry names it — and size the brainstorm to it: "none — narrow and go" is a doc that narrows the parent's and closes, a real fork is an interview in full; an entry phase the entry names is advisory, never state. Create the folder under today's date; write `request.md` through the operations contract's template (§ The topic's artifacts) with `started:` today — the task already is the topic; and write this child's own `brainstorm.md`, narrowing the parent's, which the task's description names and which is this topic's **direction doc** until its own exists. That doc opens with four things: the parent link as a relative path, worded "split child of"; the parent's child-list entry, which is this child's scope; the inherited verdicts it narrows — discarded options, the reframe verdict; and the task's id with its project and status. No why-this-phase sentence — the file's existence says `/ymer:brainstorm` ran. No question, no *mint task*.
   - **A live marker naming brainstorm** on top of `review.md` → an **iteration**: the marker is the brief. Read `review.md` first — the finding, and the entries below it — then rewrite `brainstorm.md` in place; there is never a second doc. The close, a pending close included, appends `Consumed — <YYYY-MM-DD> by brainstorm` to the marker's block as its last write before the phase's commit (review § Input item 2). On a code-repo topic the branch here carries the reviewed increment, not a sketch: run the record-names-it test over `git log main..HEAD` (write-plan § Grounding; implement § Readiness Gate item 4), and where every commit is one the record names, neither branch intake nor the reset hand-off runs. Commits the record does not name are a sketch on top: branch intake records those alone, and the reset hand-off targets the newest record-named commit rather than main.
   - **A live marker naming another phase** → stop and name that phase (review § Input item 2). The `Interview pending —` marker at the head of `spec.md` names define the same way: stop and name it, `/ymer:define <topic>` written out.
   - **A pending interview** — `brainstorm.md` carrying the `Interview pending —` marker at its head → resume the interview at the first unanswered prepared question, with no extend-or-abort question: the prepared questions are the agenda, more may join them, and the resume's rules — premises re-verified, an iteration's finding read first, an unattended resume closing again — are development-process § Artifacts'. On an iteration topic — `review.md` topped by the marker naming brainstorm, whose block holds the `Consumed — … by brainstorm` line the pending close appended — the resume keeps the iteration arm's branch reads too: the record-names-it test over `git log main..HEAD`, never branch intake over the reviewed increment, and the reset hand-off targeting the newest record-named commit rather than main.
   - **In flight** — the folder is there, no marker is live, and neither artifact head carries the `Interview pending —` marker → stop and ask: extend the existing `brainstorm.md` in its existing directory, or abort — the topic may want a different phase instead. This is the one arrival whose answer is not in view: only the user knows whether the recorded direction is to be extended.
3. **Near match** (substring or slug variant of a task or directory name) → one disambiguation question: "did you mean `<X>`, or is this new?"
4. **Clean miss** → one confirmation question: "`<name>` is not in the roadmap — new topic?" A **closed topic** — a completed or cancelled task, with or without a folder — is a clean miss too: the name is free, so confirm here, name the old folder as prior art, and give the new topic a new date and its own task (*mint task* at `doing` at the close, as for any topic invented here). Reopening a closed task is the user's reopen, never a phase's. A task the user hands in as the idea's text is a clean miss as well: the session mints the topic's own task, and the old one is the user's to close.
5. **Repo not onboarded** (no `<state folder>/<repo>/` subtree / no Roadmap project in the binding) → every topic is new; say so, and onboard per the binding at the end as usual.

The resolution is never silent — the announcement states which case applied:

- "Topic: `<name>` — drawn topic, its `request.md` from mint."
- "Topic: `<name>` — new (not in the roadmap)."
- "Topic: `<name>` — new, forced via `new` keyword."
- "Topic: `<name>` — discovered set: drawn topic + branch `<branch>`."
- "Topic: `<name>` — split child of `<parent>`."
- "Topic: `<name>` — iteration, marker of `<date>`."
- "Topic: `<name>` — pending interview of `<date>`, <n> questions."

**Hold: every topic-resolution question** — the missing topic name, `new`'s duplicate guard, the in-flight arrival's extend-or-abort, the near match, the clean miss, the discovered set (*Defaults and holds*: development-process). Unattended — the session's question tool absent from its tools, or the call that puts the question refused — the session stops at the first such question with nothing written, its report naming the question; `/ymer:brainstorm new <topic>` is the unattended door for a new topic, and a drawn topic puts no question at all.

**A `request.md` in a reused topic directory is this topic's intake — read
it, whoever wrote it.** `/ymer:mint` writes one when it draws a topic
from the pool, and a split child's first phase writes one from its
task's description. Either way the file carries the whole brief — the
drops verbatim, and the cause or direction mint read into them — so read
it before anything else.

## Drawn-topic Intake (when mint drew the topic)

Brainstorm has two doors: an idea the user brings, and a topic `/ymer:mint` drew from the pool. A drawn topic arrives with its task already at `doing` and its folder holding the `request.md` mint wrote:

1. Read `request.md` — it is brainstorm input with the same standing as a sketch: a starting point, not a decision already made. Its measurements are re-derived before they size the topic (a count in a drop is the capturer's, not this session's), and its `inferred:` marks — mint's root cause among them — are the re-verify feed (register rules: the sweep skill's Claims section).
2. The task already is the topic: no rename, no move, and no second task. The topic keeps mint's name and date.
3. Every outcome holds the same way, including "not pursuing this": `request.md` stays in the topic directory, the direction doc records the decision, and the task closes — *retire topic* as cancelled, the why in its result.

## Branch Intake (code repos, when the session starts on a topic branch)

*Read with this section: `mechanics.md` § Branch Intake (code repos, when the session starts on a topic branch) (the mechanics).*

## Sketch Intake (branchless — after Topic Resolution)

*Read with this section: `mechanics.md` § Sketch Intake (branchless — after Topic Resolution) (the mechanics).*

**Mine the sketch into the direction doc during the session.** The next phases read `brainstorm.md`, not `sketch.md` — the fragments that carry the chosen direction must be quoted or summarized there: the mechanism the sketch implies, the concepts it introduces. Ask about the sketch's *intent*, not just its content — what was easier to write than to say?

## The Interview

*Read with this section: `cases.md` § The Interview (the cases).*

**Read the interview procedure whole before the first question, and follow it** — `${CLAUDE_PLUGIN_ROOT}/skills/development-process/interview.md`, the one home of the question discipline brainstorm and define share: its ground rules (options in prose, one question at a time, recommendation first, no clock, the deciding fact and every premise probed or marked, a standing constraint re-asked once, the frame before the options), the agenda, the answers recorded as they land, and the pending interview where a question cannot be put. This section carries only brainstorm's own rules beside it.

- **Open with the problem and the win, in plain words** — the problem in one paragraph, what the work buys beyond the itch that filed it, and the solution shape in a few pieces — and only then the facts. It is the direction doc's own "idea in one paragraph", spoken first, so the verified evidence arrives behind the framing rather than as it; a win the user has to ask for is the scope cut or the placement question nobody saw (a doctrine that ends re-litigation, a cross-repo item filed in a product roadmap).
- Check project context before asking: existing docs, glossary if the repo has one, recent commits. When a coding-standards companion skill defines the decision procedure for the topic's domain (guard tiers, say), load that skill whole before forming a recommendation — grep excerpts of it mislead.
- A **positioning topic** — one that decides what the product is, or refuses to be — reads the product page here, at the interview, not at convergence: its settled sections are standing constraints, and the procedure's standing-constraint rule applies to them. Fetch it through product-design's recipe (the product-design skill § The product page), never an ad-hoc call.

- Propose **2–3 approaches with trade-offs** before settling. Lead with your recommendation and why.
- YAGNI ruthlessly: cutting scope is a first-class brainstorm outcome, and so is "not worth pursuing".

### Unattended: closing around the interview

A pending close is a finished close around a hold, not a torn one. It runs everything before the interview — topic resolution, intake, and the probes the questions rest on — and stops with nothing written wherever topic resolution or intake puts a question (the holds above). It then writes `brainstorm.md`: the title, the `Interview pending —` marker, the opener beat as far as it can be written — the problem in one paragraph and what the work buys, no solution shape; on a split child, the four things its arrival names — the intake's references, the `## Interview` section in the shape development-process § Artifacts gives, and a `## Verified state` section for the probes it ran; the reframe's prior-art material may be prepared under the question it informs. On an iteration, where `brainstorm.md` already stands, the marker and the section join it and its text stays as it is. At the close, step 1 runs *mint task* at `doing` where `/ymer:brainstorm new` invented the topic — a drawn topic's task is `doing` already — so the resume reads a `doing` task; no other mint, no capture, no edge, no outward ruling, no reset hand-off. None of the convergence beats run — they run at the resume, against the candidate the interview forms — and consolidation, the self-review and the review gate are never reached. Step 2 commits under the pending message, then the capture block and the report (→ Next Phase).

### First-principles & prior-art reframe

Reach for this when the direction was reached by **extending what's already
there** — a second axis beside the first, another flag, one more special case —
or when the topic makes a first-of-its-kind primitive, interface, or architecture
choice. Skip it for routine or localized work, and for a class of problem the
field has no canonical answer to. A situational move, not a step every brainstorm
runs.

Three beats, and the third is the point:

1. **Reframe from first principles.** Set the current direction aside and solve
   the problem from scratch. Ask first whether the problem is even well-defined —
   if it isn't, that is the finding: the direction is premature, keep exploring
   before settling.
2. **Survey the prior art.** How does the field solve this *class* of problem —
   the canonical, converged shape(s)? Name them. Thin by default: name the canon
   from your own knowledge. But do not assert a "standard" you are unsure of —
   verify a prior-art claim the verdict leans on, and reach for the
   `deep-research` skill when the canon is genuinely unknown or contested.
3. **Reconcile and decide.** Compare the fresh view against the current direction
   and return a verdict — the payoff of the whole move:
   - **Stay the course** — the direction already is the right shape.
   - **Adjust within the direction** — same direction, better shape (e.g.
     generalise what you were about to special-case). Correcting, not reverting.
   - **The direction is wrong** — the reframe undermines it; keep exploring
     rather than settle.

   Record the verdict and its reasoning in this doc (the chosen-direction and
   discarded-options sections) — the verdict is what the next phase needs, not
   the survey behind it.

**Adopt the shape, shed the baggage.** When you take a canonical solution, take
its *shape*, not its every part. For each element of the standard answer, keep it
only if the context that makes it standard holds *here*; otherwise leave it out
as YAGNI and say so. Every element left out names the constraint that justifies
it — and that constraint should already be written down (a CLAUDE.md fact, a standing doc,
the glossary). A deciding constraint that lives nowhere is itself a finding worth
surfacing. The guard cuts both ways: do not import complexity you have no use
for, and do not reject a proven shape merely because it was not invented here.

### Product alignment

*Read with this section: `cases.md` § Product alignment (the cases).*

Run this when the topic shapes a **surface a user will operate** — human
UI, MCP/LLM tool surface, CLI, API, service, business process, or a
skill/process document an LLM executes. Skip it when no user-operated
surface is being shaped — internal refactors, data plumbing, a typo or
link fix in a skill. A situational move, not a step every brainstorm
runs.

Check the candidate direction against the product-design principles, per
the product-design skill —
the gate first (who is the user: human, LLM, or both; which
stance: instrumental or autotelic), then each principle's checks. The
principles live in that skill alone; this beat never restates them — and
neither the product page's fetch recipe, its miss rule, nor the pushback
duty its settled sections carry. Fetch the page through that recipe: a
`projects get` echoes the project's whole task list, and four sessions
paid 68–156 tasks for one section.

Close with the reframe's verdict vocabulary — stay the course / adjust
within the direction / the direction is wrong — and record in the
direction doc: the gate's answers and the verdict with its reasoning.

### Learning prerequisites

Run this when the settled direction touches subject matter the user
would have to operate once it ships. Skip it when the direction
introduces no new subject matter: one sentence and move on. Minutes,
not analysis; a situational move, not a step every brainstorm runs.

Timing: at convergence, against a formed candidate direction, beside
product alignment — anchored at the same moment, where consolidation is
triggered (§ Scratch Doc → Consolidate). Which subjects the work touches
is a direction-level fact: earlier is guesswork, later re-couples learning
to the critical path this check exists to keep clear of it.

Ask per subject: is the user at the **operator bar** for the shipped
result? Classify each gap per the plugin glossary's three kinds, and
dispose:

- **blocking gap** → a **learning task** with a dependency edge to
  this topic, its reason on the edge — the one edge the check itself
  records, riding the discovered-dependency clause (the operations contract).
- **falling-behind gap** → a **learning** drop in the pool, through the
  `ymer:capture` skill — no task, no edge; the pipeline proceeds, and
  `/ymer:mint` creates the learning task when it draws the drop.
- **enrichment gap** → no task, no edge. The leaf is written now, in
  the beat: append an unchecked entry to the subject's knowledge
  doc (entry format, index, **and every write rule that section
  carries** — the store has no restore action: tutor's Knowledge Docs
  section and its subject index in the Ymer Node, read with the node's
  `notebook` `query`). No knowledge doc yet, or no subject index to find
  one through? The leaf
  rides the direction doc's record instead — creating the doc is
  tutor's opening, never this beat's.

Learning tasks live in the **Learning project** — task shape, status
map, and mint targeting are the operations contract's; a learning
drop's grammar is the capture skill's; decomposing a subject stays with
tutor's opening. None of that is restated here. Record in the direction
doc: the subjects touched, each gap's disposition, and the why behind
any edge. The mints, edges and captures land at close step 1.

## Scratch Doc → Consolidate

*Read with this section: `cases.md` § Scratch Doc → Consolidate (the cases).*

Start the doc early and keep it scratch: rough notes, appended as the conversation moves, cheap to rewrite when the session reverses.

**Hold:** the settle signal is the interview's last answer, under § The Interview's line; an unattended session never reaches this section — it closes around the pending interview (*Defaults and holds*: development-process).

First **keep the scratch doc's pre-image** (term: the plugin glossary). Where git tracks the state folder, **stage** it — `git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/brainstorm.md` — so the pre-rewrite state survives in the index: the consolidation is the pipeline's only in-place rewrite with no committed pre-image (brainstorm commits only at the close — at a resume the pending close's commit is a pre-image, and the staged copy agrees with it; the stage runs unchanged), and the staged copy is what the self-review's dropped-content probe diffs against. Where the files are the record, copy it into the topic's `pre-image/` slot as `pre-image/brainstorm.md` instead (the operations contract, § The topic's artifacts, which says how the copy replaces an earlier one and when a resumed consolidation skips it; the close removes the copy's stamp), and that copy is what the probe diffs against. Then rewrite the doc in place into its consolidated form — a pending interview's marker and `## Interview` section leave in the same rewrite, their answered questions landing in the sections below:

- The idea in one paragraph
- Possibilities explored — including discarded ones and why they lost
- The chosen direction — and where the user made a standing call, it is recorded as a decision with the concrete moment that lands it ("the first decision that must give X a modern answer drops it"), never as a bare permission ("may be dropped whenever a decision forces it") the next phase has to read for whether it has fired
- What the direction makes unnecessary — removals, retired tokens, simplifications it unlocks downstream; a direction that removes nothing says so in one line
- On a split (→ the operations contract § Split topics): the child list — one line per child: default name `<parent-slug>-<part>`, the direction settled for it, its **fork** — the one decision its own brainstorm still makes, or "none — narrow and go" — and intended order; an entry phase, where one is named, is advisory, never state, because the entry ladder is the invoker's read at pick-up from the child's brief. This list is the authoritative child registry, and each child's mint description names the parent's direction doc and, where one exists, its decision record (`spec.md`, whose D-numbers are what "the parent's decision N" quotes)
- Mined sketch fragments that carry the idea (the full verbatim record lives in `sketch.md`)
- Optional: a verified-state section for measurements the session ran — contract at `cases.md § Scratch Doc → Consolidate`, its *Evidence sections* paragraph
- Open questions handed to the next phase

## Self-Review (inline)

After consolidating, look at the doc with fresh eyes. Calibration: **only flag what would send the next phase in the wrong direction** — missing direction, contradictions, lost ideas. Wording and polish are not findings.

1. **Direction chosen?** A pile of possibilities with no choice is an unfinished brainstorm — unless the settled outcome is explicitly "not pursuing this".
2. **Contradictions?** Do any sections disagree with each other?
3. **Sketch preserved and mined?** `sketch.md` holds the verbatim attempt (plus the user's notes), and `brainstorm.md` quotes what the direction relies on — nothing idea-bearing lives only in the working tree, about to be reset away.
4. **Dropped scratch content accounted for?** Read plain `git -C <state folder> diff -- <repo>/YYYY/MM-DD-<topic>/brainstorm.md` — worktree vs. the copy staged before the rewrite. (Not `git diff --cached`: that is index-vs-HEAD, which for a freshly staged doc shows the whole pre-image as additions and no deletions at all.) Where the files are the record, compare `pre-image/brainstorm.md` with `brainstorm.md` in the topic folder instead, with whatever compare reaches the folder. The diff's deletions ARE the drop candidates: each must reappear in the consolidated doc as chosen, discarded-with-why, or an open question — dropped is a destination, not an absence.
5. **Open questions explicit?** The next phase should not have to rediscover what we already know we don't know.
6. **Intake kept?** (Only on a drawn topic or a split child.) The task is still `doing` under its own name, and the `request.md` the topic arrived with stands as it was written — read, never rewritten.
7. **Verified-state claims stamped?** (Only when the doc carries the section.) Every claim in it carries its stamp, every absence or zero its `control:` — an unstampable claim moves out of the section or drops.
8. **Load-bearing direction claims probed or marked?** A claim the direction rests on — a justification, a decision premise, a scope exclusion, **an open question's premise** — outside any evidence section either carries its probe (a stamp) or the literal marker `inferred:` (register rules: the sweep skill's Claims section); evidence sections stay item 7's territory. The open questions are the next phase's agenda, so a measurement-shaped premise inside one ("no precedent exists", "many callers") sets the choice that phase inherits — probe it or mark it like any other.
9. **Durable knowledge routed?** A principle, constraint, or fact established this session that outlives the topic reaches its chartered store now — the front's initial instructions, a plugin skill, the repo's docs or glossary, one of the coordinator's docs, a product page (through a vision drop — the beat never writes one), a task, or a drop in the pool — or this doc's open questions record an explicit handoff naming the store; never left implicit in the direction prose. Calibration: only what would change behaviour in a future session, never what a store already records (the full map, and the stop-and-pick rule when nothing fits: development-process § Knowledge placement).

Fix issues inline and move on — no re-review loop.

## User Review Gate

Ask the user to read the consolidated doc:

> "Direction doc written to `<path>`. Please review — anything to change before we close the session?"

Iterate on any input that arrives. **Default: proceed to the phase
close — review post-hoc at the phase commit
(`git -C <state folder> show <sha>`)** (*Defaults and holds*:
development-process).

## Commit the Artifacts, Then Reset (after the doc is approved)

*Read with this section: `mechanics.md` § Commit the Artifacts, Then Reset (after the doc is approved) (the mechanics).*

**Capture block:** invoke the `ymer:capture` skill — source
`brainstorm`. The battery, the drop grammar and the write live in that
skill alone.

## Next Phase (terminal state)

Stop. Report the topic directory and its task — on a split, each child's task with its literal next command, `/ymer:define <child-slug>` or the phase the child's entry names, its folder created lazily at that phase — and name the next phase — normally **define** in a fresh session (define begins by invoking the `ymer:scout` skill when no survey map exists yet); a standalone **scout** session first when the area is large or unfamiliar enough that the survey map deserves its own review before any interview. Do **not** invoke the next phase's skill in this session: one phase per session, and the direction doc is the compaction boundary the next session starts from.

A pending close (→ The Interview) names no next phase: the report names the pending interview — the marker's count, the trigger's evidence quoted, the tool list or the refusal text — and its resume command, `/ymer:brainstorm <topic>`, written out, with the resumed session's announcement line as its verify; define, scout or write-plan invoked in its place stops on the marker and names brainstorm.

## Remember

- One question at a time, recommendation first; the interview is a hold — unattended, prepare it into `brainstorm.md` under the `Interview pending —` marker and close around it
- Reframe against first principles and the field's prior art when the direction just extends what's already there — adopt the shape, shed the baggage; the verdict is the payoff
- Product alignment at convergence: a formed candidate direction that shapes a user-operated surface is checked against the product-design principles — gate answers and verdict go in the direction doc; vision-worthy material is captured as vision drops
- Learning prerequisites at convergence: per touched subject, the
  operator-bar question; blocking gap → learning task + edge,
  falling-behind → learning drop, enrichment → knowledge-doc leaf
  written in the beat — the mints, edges and captures land at close
  step 1
- Resolve the topic before anything else, announce the result, and reuse an existing topic directory — never mint a duplicate
- The sketch is input, not a commitment — `sketch.md` preserves it verbatim, `brainstorm.md` gets the mined fragments
- A drawn topic's `request.md` is its intake, read first and never rewritten; its task already is the topic, `doing` since mint drew it
- A settled direction may split the topic: a child task at `doing` per child, the parent's own task retired with a result naming them, the doc's child list authoritative (→ the operations contract § Split topics)
- Scratch stays scratch until the user says settled — then stage it before the consolidating rewrite, so plain `git diff` can surface what the rewrite dropped
- The doc records discarded options and why — future phases shouldn't re-litigate them
- On a topic branch everything is input — branch intake renames the branch first, then records the diff and the progression story from `<base>`, the merge-base; the intake gate applies only to branchless sketches. On an iteration arrival only the commits the record does not name are input, and `<base>` is the newest record-named commit (→ Topic Resolution, case 2)
- Commit the artifacts (topic dir) before the reset hand-off — the reset only ever destroys what `sketch.md` and the state-folder commit already preserve
- Holds are the user's: push/pull and destructive steps are hand-offs
  (preview, run, verify), never Claude-run or defaulted; the rest of
  local git is Claude-run
