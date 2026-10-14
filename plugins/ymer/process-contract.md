# The process contract

The rules the development process runs on: the seven phases and where
to enter them, the two kinds of topic, how a review is priced, how a
topic iterates, where knowledge is kept, what a phase does when the
user's input has not arrived, and the few contracts several phases
share. It holds only what no other file owns. The roadmap and the
topic's artifacts are the operations contract's, git is the substrate
contract's, the interview is the interview procedure's, and each
phase's own steps are its skill's.

Skills name this file by its role phrase, *the process contract*, and
cite a section by its name (`the process contract, § Iteration`); they
never restate one. A skill that needs a section says in its spine when
it reads it, at the moment the rule binds, and that line is the one
place the file is named by its path,
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. Each section is written
to be read on its own.

## Contents

- The map: the seven phases, the two that run inside another's
  session, one phase per session
- Where to enter: the entry ladder, external requests, the lightweight
  close-out
- Topic kinds: code-repo and meta topics, machinery edits present
- Review effort: lens applicability, the risk profile and its four
  dimensions, the orchestration floor
- Iteration: the route, the executor, decide-forward, the marker's
  block, the delta
- Knowledge placement: the chartered stores, the routing test, the
  glossaries
- Defaults and holds: gate defaults and holds, git is never guessed,
  delegation, pre-flight, close binding, the fallback rule, the report
  rule, the interview as a hold
- Rule ownership: machinery or reminders, decided or asked
- The payload contract: payload files, the manifest, the verifier
- The traceability stores: where commit refs are recorded
- Parallel sessions: re-reading a shared artifact
- Standalone repos: the fresh-clone test

## The map

Development work runs through seven phases. Each is one kind of work,
done in its own session, and ends with an artifact the next phase picks
up. The artifact is the compaction boundary: the next session reads a
short, deliberate document instead of inheriting a long exploration.

| # | Phase         | Skill               | Artifact                                                      | Hands off to               |
|---|---------------|---------------------|---------------------------------------------------------------|----------------------------|
| 1 | Brainstorming | `/ymer:brainstorm`  | `brainstorm.md` (+ verbatim `sketch.md`)                      | define                     |
| 2 | Scouting      | `/ymer:scout`       | `survey.md`                                                   | define                     |
| 3 | Defining      | `/ymer:define`      | `spec.md` + glossary updates                                  | write-plan                 |
| 4 | Planning      | `/ymer:write-plan`  | `plan.md` (+ `payloads/`)                                     | plan-review (auto-invoked) |
| 5 | Plan review   | `/ymer:plan-review` | `plan.md` (+ `payloads/`), hardened in place, surviving markers amended with the user's rulings; a *needs a define session* ruling writes the iteration marker into `review.md` instead (→ Iteration) | implement, or define after such a ruling |
| 6 | Implementing  | `/ymer:implement`   | the code on the topic branch + `implemented.md` + the `## Review` entry (the lens pass's findings) in `review.md`; a drift-valve stop writes the iteration marker instead (→ Iteration) | review, or the marker's phase after a stop |
| 7 | Review        | `/ymer:review`      | `review.md`; a ship close squashes and closes the task, and an iterate or wait close leaves it open (→ Iteration) | none, the pipeline ends; or the marker's phase after an iterate close |

Two phases run inside another phase's session by design:

- **Scout fuses into define's opening.** Define runs scout whenever the
  topic has no `survey.md` yet. A standalone scout session is for an
  area large or unfamiliar enough that the survey map deserves its own
  review before any interview.
- **Plan-review chains from write-plan.** Write-plan ends by invoking
  plan-review unless told not to. Grounding, the fan-out that gathers a
  plan's mechanical facts, already lives inside write-plan.

So the common path is five sessions: brainstorm, define with scouting
inline, write-plan with plan-review chained, implement, review.

**One phase per session, and the artifact is the compaction boundary.**
A phase ends by naming the next one, never by invoking it. The two
fusions above are the only exceptions.

## Where to enter

Enter the pipeline at the first phase whose input you do not already
have, and skip the phases whose output you already hold:

- A trivial fix or a mechanical change: no pipeline; edit directly.
- A sharp spec in hand: `/ymer:write-plan`.
- A chosen direction whose meaning is still fuzzy: `/ymer:define`.
- Only an idea or an itch: `/ymer:brainstorm <topic>`. The name is
  resolved against the repo's roadmap first; `/ymer:brainstorm new
  <topic>` declares it new up front.
- Work waiting in the pool, a feature, a bug or a learning gap captured
  as a drop: `/ymer:mint` draws the top one and starts it as a topic
  with its `request.md`, then `/ymer:brainstorm <topic>`, always,
  however sharp the drop reads (external requests, below).
- A large or unfamiliar area to orient in first: a standalone
  `/ymer:scout`.
- `/ymer:review` always runs after implement, on every topic. The lens
  pass, pre-executed at implement's close and read from the record at
  review, carries the one precondition, that a diff or a change set
  exists, and the walkthrough carries none. So a topic with a tiny
  increment makes a naturally tiny review rather than an exit. The one
  lane switch past the phase is the lightweight close-out (below),
  taken per topic at the user's explicit call.

A process that formally fires on everything gets ignored. Entering late
and skipping phases is the normal case, not an exception.

**External requests never skip phases.** A drawn topic, feature and bug
alike, always enters at brainstorm, however sharp it reads: brainstorm
and define regularly catch what the request's author missed, and
"well-written" is not "thought through". The straight-to-write-plan
entry is for specs produced inside the process or by the user
themselves.

**The lightweight close-out, for topics below the bar.** When a topic
already in the pipeline turns out fully specified and prose-only, so
that write-plan, plan-review and implement would only restate an
existing artifact, say so unprompted and offer the lightweight path.
The direction doc serves as the plan, diffs are reviewed live in the
session, and a thin `review.md` records the lane taken plus the ship
section, the topic's task closing completed as at any ship, so
done-ness reads the same for every topic. No `implemented.md` is
written, since no implement ran. This lane is the one lane switch past
review: it skips the pipeline's whole back half with the user's
approval, and review itself never skips. The completion contract stays
intact. A fresh friction below the bar rides `/ymer:mint`'s
friction-batch topic into this same lightweight path rather than being
fixed in the session that found it: the pipeline gets the scrutiny, and
the batch's brainstorm decides how cheap the route is.

## Topic kinds

A topic is one of two kinds, each read off one observable. The kind is
durable: a property of the topic, not of a session. Every fork in a
phase's text that turns on the repo's shape reads it here instead of
restating it.

- A **code-repo topic** has a project checkout the session runs in. So
  it has a topic branch, a squash-merge at the ship, and the project's
  own test suite as the gate its phases run.
- A **meta topic** has none: `<repo>` is `meta`, and the topic folder is
  the only place it lives. No branch and no squash; the plan's own gates
  stand where a project's test suite would.

"Prose-only meta topic" is not a third kind. It describes a session that
happened to make no machinery edits, a fact about the session and not
about the topic. Artifact kind keys nothing either: prose or code,
review effort is keyed by risk profile alone (→ Review effort), and
"the plan's own gates" already follows from being a meta topic. A fork
phrased on artifact kind is a fork on the wrong axis.

**Machinery edits present** is a fact about the session, and it stands
free of the kind. A **machinery tree** (plugin glossary) is a tree where
this front's process machinery lives. Which trees those are is the
environment's binding, and each is a shared tree, as the state folder
is, so every rule that word carries applies to it (the substrate
contract, § Tree options). Read the fact from each tree and from this
session's own commits in it (`git -C <tree> status`, `git -C <tree>
log`), never from `<repo>`. A code-repo topic whose session edited any
of them has it true; a meta topic whose session edited none has it
false. Where it is true, every phase close commits those edits, per
tree, in the public register, staged as the substrate contract's
§ Stage by explicit path only and § Committing by hunk say. The close
records every ref in that phase's artifact and lists the push hand-off,
whatever the topic's kind and whichever close ran.

The commit is a duty, not a convenience. Machinery files are live on
disk the moment they are written, read by every session on this
machine, so committing them defers nothing; an uncommitted machinery
tree carried across sessions is what breaks the rules for concurrent
sessions. The same fact is why the commit is scoped to the files this
topic edited: another session's dirt in the same tree is its work in
flight, and where a machinery tree's files are linked into place from
elsewhere, an unscoped `add -A` there sweeps up unrelated packages
besides.

## Review effort

Every phase that reviews or grounds work prices that work. Two
mechanisms set the price, and one invariant binds both.

**Nothing in a review run is set by hand.** The tier is keyed, and
inside a tier the routing is derived. A rule phrased as "judge
whether…" or "the user picks" breaks this: per-run sizing questions are
the improvisation this section exists to remove.

**Lens applicability** answers which lenses run at all, and it does most
of the work. Each lens declares a **precondition**, what must be true
for it to have anything to bite on, and the host evaluates it before
spawning, from observables it already holds: the artifact under review,
the plan header, the changed-file list. A lens whose precondition fails
is dropped unspawned. Never spawn a lens to find out whether it applies:
paying a full agent to learn it had nothing to say is the waste this
mechanism removes.

A dropped lens is reported with the precondition that failed, never
silently. A dead lens is otherwise indistinguishable from "no findings",
and a wrong precondition has to surface as a lens that stopped running
rather than as silence: that is what keeps applicability falsifiable.
When every lens is dropped, the run reports "no applicable lenses" and
bottoms out at the ladder's cheapest tier; it is never reported as a
clean review.

A precondition is a derived fact, never a judgement. Each is read off
the artifact under review by a stated rule, and in doubt it reads true:
a lens dropped by mistake costs recall, a lens run by mistake costs
tokens, and recall is worth more. A precondition never asks whether the
lens would find anything, only whether it has anything to read.

Two properties follow, and both are the point. There is no exclusion
list kept by hand anywhere: the lenses left out are derived from which
preconditions fail. And a lens added later carries its own
applicability, so nobody has to classify it into every tier's list.

**Risk profile** answers how much machinery runs: which tier of the
**effort ladder**. It is the expected cost of a defect escaping this
review, its probability of going unnoticed times what it costs if it
does. It has four dimensions, three raising it and one lowering it:

- **input-space complexity**: more reachable states, more corners a
  cheap read never visits;
- **trust boundaries**: an escaped defect is a vulnerability, not a bug;
- **blast radius**: how far a mistake travels before anything catches
  it;
- **mechanicalness**, which lowers it: a transform whose gate prints its
  expected lines catches defects by construction.

**File count and artifact kind are never the key alone.** A two-file
plan whose whole risk sits in one function's input space outranks a
twenty-file mechanical rename, and a prose plan can carry more risk
than a code plan.

Each phase names its own ladder and reads the key here; the four
dimensions live in this section and nowhere else. The ladders today:
code-review's inline read, then a full pass, then `ultra`; plan-review's
lightweight pass, then the workflow; write-plan grounding's direct
verification, then the Explore fan-out.

**One qualification, and it is not a second key.** Where a ladder's
tiers differ in orchestration machinery rather than in depth of
scrutiny, the ladder carries an **orchestration floor**: below some
count of surviving lenses, the machinery's own fixed cost (spin-up, the
journal, stall and retry failures, a heavier synthesis author) outweighs
what it buys, whatever the risk profile said. The floor's number is a
calibration, stated with its reasoning at the skill that owns the
ladder and revised on captured evidence; it is never written as a bare
threshold. A ladder whose tiers differ only in scrutiny has no floor.

## Iteration

An **iteration** is a topic re-entering the pipeline loop when review,
implement's drift valve, or plan-review's close over a surviving
`> Needs confirmation:` marker finds the record contested, exceeded, or
still open. It is normal development, not a planning failure: the cost
of a provably perfect plan grows with the system, and this process bets
on cheap, well-recorded iterations against real feedback instead of
exhaustive hardening up front.

**A change of approach found late is an iteration.** Found in implement
or review, it is never a silent edit to the implementation: the phase
it re-enters at, and whether it runs as a full iteration or in place,
are both derived, as follows.

**The route is derived, never picked.** An iteration enters at the
phase that owns the artifact where the contested statement lives:

| The contested statement lives in | The iteration enters at |
|---|---|
| the chosen direction: `brainstorm.md` | brainstorm |
| a decision, a meaning, a glossary entry: `spec.md`, the glossary | define |
| a measurement: `survey.md` | define |
| mechanics, task design, a payload: `plan.md`, `payloads/` | write-plan |

The discriminator is artifact ownership, a fact in the record, never a
judgement about the finding's nature, so the route is derived as every
review's routing is (→ Review effort). Two extensions close the edges.
When nothing recorded is contested, because the finding is new
information, the iteration routes to the phase whose artifact should
record the answer. A finding that spans artifacts routes to the
earliest phase among them: the downstream artifacts are rebuilt on the
way forward anyway.

A measurement routes to define rather than to scout because define
already amends `survey.md`, and a measurement matters only through the
decisions leaning on it, which are define's to re-decide. A mis-measure
that no decision leans on is no iteration at all: it is a record
correction, and any session may amend the survey under the claims
discipline's duty to re-verify at use (the sweep skill).

**The executor is derived too, off one more fact: is the new decision
already made?**

- **Not made.** The finding says the decision did not survive contact,
  and what is right is still open. That is a **full iteration**: the
  owning phase's session is where deciding happens, and the session
  that found it ends by naming that phase in its marker.
- **Made.** The developer, at the code, has already picked a third
  option and is confident. Re-entering the phase would be ritual
  re-derivation, so the iteration runs in place: **decide-forward**. The
  edit stands, the artifact that owns the statement receives a dated
  amendment recording the decision and its why, and the edit is
  reviewed as a delta. There is no session hop and no plan-review:
  plan-review hardens predictions, and a decide-forward has none left.
  It is not a close; the session continues.

**The amendment is decide-forward's non-negotiable half.** Without it
the record asserts X while the code does X′, and every later walkthrough
derives its constraints from the record rather than from memory. The
developer decides. The facilitator writes the amendment, in whichever
marker the owning artifact already takes, with no new grammar minted
for it (`spec.md`: define § The Spec; `plan.md`: write-plan § Task
Structure), and sweeps the decision's footprint in the same session, by
the recipe those homes carry. **A footprint that resists makes it a
full iteration.** When the footprint resists mechanical correction,
because the amendment re-opens task design, that is evidence the
decision was not actually made: the executor re-derives to a full
iteration, and the session stops at the route's phase.

**The receiving side is a read, not a memory.** The phase a marker
names learns that it is the route's destination at its own opening,
where topic resolution reads `review.md`'s first recognizer beside the
task's status and the topic folder; brainstorm, define, scout and
write-plan each carry that read. A marker on top is live or consumed,
and its block decides which.

**The marker's block.** Nothing ever removes an iteration marker; the
line's grammar is review's (review § Iterate). Its **block** is the
marker line and the ref lines written with it (`Reviewed:`,
`Unreviewed:`), up to the first blank line or the file's end. The route
is recorded by lines appended to the end of that block, one per phase
close, in the order written, so the newest is last:

```markdown
Consumed — <YYYY-MM-DD> by <phase>
```

The phase the marker names writes the first at its own close, a pending
close included, and that line **consumes** the marker. Each later phase
on the route (scout, define, write-plan, plan-review, implement,
whichever run) appends its own at its close to a block that already
holds one, and implement's close appends its line whatever the marker
names, since implement ends the route. A phase writes its line as its
close's last write before the phase's commit, with two exceptions:
plan-review writes its `Hardened —` line after it (the operations
contract, § Roadmap), and implement writes its line just before its
`## Review` entry, which then takes the top. The line is the same on
every kind of state folder. It is no recognizer, so the marker stays the
first one top-down, and a session that stops at topic resolution writes
none. Every marker line in `review.md` keeps one shape: a capital first
letter, an em dash, at line start.

**Reading the block.** No `Consumed —` line in it → the route is
**live**. A live marker naming the phase that is open is that session's
brief, its finding the mandate; one naming another phase stops the
session, which names the phase the marker names, where the route
entered. A consumed marker makes a phase **due**: after a last line
`by implement` the route has run its course and review is due (review
§ Recognizers); after any other last line the route is mid-way, and the
phase due is the one after that line's phase in the pipeline's order
(brainstorm, scout, define, write-plan, plan-review, implement). The
phases that act on the phase due say so at their own opening. A stopped
route writes no line, so it still names the phase it stopped before,
which is the right answer.

**Each phase keeps one artifact, rewritten in place.** The history is
the state store's: git's phase commits where git tracks the state
folder, the `pre-image/` slot where it does not. Sibling files
(`plan-2.md`) never come into existence. The `pre-image/` slot is no
artifact, and no reader takes it for the live file: every phase writes
one file named after itself, and no reader ever has to work out which
one is live.

**The subject is the delta since the last reviewed state.** The count of
iterations never enters: it is a constant in disguise, and the
risk-profile ladder already prices a delta exactly as it prices
anything else (→ Review effort). Two reads:

- **The code**: whatever the record leaves uncertified. Each `review.md`
  entry carries two ref lines: `Reviewed:` certifies what that entry's
  lens pass covered, and `Unreviewed:` records the close's own commits
  that no pass has seen. Which refs that leaves, the traceability
  stores the record names them in and which of those a `Reviewed:` line
  already covers, is computed once, at review § The lens pass. That
  section owns the pass's whole procedure whichever phase operates it:
  implement's close pre-executes the pass, review runs it as the
  fallback, and both read the computation there. This section does not
  restate the computation: a second arithmetic here would read as the
  traceability-store list, and a list short by one returns the empty
  set for a whole class of increments. Findings an earlier entry
  disposed stay disposed.
- **The plan**: its pre-image, the parent of this iteration's own
  `: write-plan` commit where git tracks the state folder, or the slot
  write-plan filled before its re-plan where it does not. The read that
  takes it lives once, at plan-review § Input, its one consumer.
  Implement's plan edits, mechanical corrections and decide-forward
  amendments alike, belong to the standing record rather than to the
  new delta: their substance is reviewed as code by that cycle's lens
  pass, and a decide-forward's decision stays readable through its
  amendment marker, which plan-review's amendment-ripple item and the
  decision digest pick up.

## Knowledge placement

Process and project knowledge lives in **chartered stores** only, with
no side stores: a front's own automatic memory is off on purpose, and
the front's initial instructions carry the rules that are always
loaded. The routing test is one question: **must the knowledge bind in
a session where no skill is ever invoked?** If it must, it needs a push
channel, an instruction file that is always loaded. If not, it belongs
in a pull store, reached by a trigger description or by a pointer.

| Store | Owns |
|---|---|
| the front's initial instructions (global push) | what must bind everywhere before the first tool call: git ownership, machine traps, rules for working with the user |
| repo `CLAUDE.md` (push, scoped to the working directory) | that repo's repo-safe operational facts, conventions and gotchas |
| repo `CLAUDE.local.md` (push, scoped to the working directory, gitignored) | private facts about one repo, kept out of a shared or employer-visible checkout |
| the plugin's skills and contract files (pull) | process knowledge: each rule lives in the skill that owns the moment it fires, and a rule several skills share lives once, in a contract file the skills read at the moment they name |
| the coordinator's tasks and projects | work state, the roadmap of work in flight, plus each product's **product page**, the governed prose in its Roadmap project's description (binding: the operations contract) |
| the coordinator's docs | reference knowledge reusable across projects: notes on tools and languages, and the knowledge docs, the learning track's substrate (the tutor skill). The dividing line: useful independent of one repo's current code, a coordinator doc; about specific files or decisions of a repo, that repo's docs |
| the pool (the `pool` table in the node's notebook) | work nobody has started: drops of every kind, written by the `capture` skill and drawn by the `mint` skill or by brainstorm, define, write-plan or review (the operations contract, § The pool) |

Knowledge with no fitting store means stopping to pick one, or to
charter one, with the user. Never open a scratch store.

**The duty discharges** when, before the boundary closes, the knowledge
either sits in a chartered store or sits in a record some later reader
is bound to consume, a store in transit. What makes the second one work
is the guarantee, not the kind of record: a direction doc qualifies
because the next phase must read it, which is why a brainstorm may
close by recording an explicit hand-off naming the store instead. Where
no reader is bound, at a session's close or in a phase whose artifact
nothing downstream must read, routing now is the only discharge, which
is why end-session only routes. Capturing the knowledge as a drop in
the pool is routing rather than an escape: the pool is one of the
stores above.

**Definitions have one home each.** A project's terms live only in the
repo's project glossary, `docs/glossary.md` unless the repo's
`CLAUDE.md` says otherwise, maintained by the define phase; every other
document uses the terms and points there, and never redefines them.
That is a project's **domain** glossary. The vocabulary of the
development process itself, the terms these skills and contracts use
for the pipeline and its phases (review, walkthrough, stop, and the
rest), lives in the plugin glossary, `glossary.md` at the plugin root,
under the same rule. It is not a project's domain glossary, and the
define phase does not own it for project-repo topics: a meta topic's
define session maintains it directly, updating entries as process terms
settle. The domain glossary is one of a repo's **standing docs** (plugin
glossary), like the project's design guidelines at `docs/design.md`.
Phase artifacts point to standing docs and never restate them; each
repo's `CLAUDE.md` names the ones it keeps.

## Defaults and holds

Every **gated moment** (plugin glossary) carries one inline line naming
what happens when the user's input has not arrived by the phase's
close, `Default: <action> — review post-hoc at <surface>.` or `Hold:
<command>.`, pointing here and never restating this section. The line
is one of two classes, assigned when the line is written, never at run
time:

- A **gate default** runs the named action, the close commits it, and
  review moves post-hoc to the committed artifact.
- A **hold** is never defaulted: the step stays pending and the phase
  closes around it, with state as the only record, no separate artifact
  and no stored status. Four things are holds: network git (push and
  pull), a step that destroys uncommitted work, a release-version write,
  and brainstorm's and define's interviews, every question of them.

Input that arrives is honoured exactly as before: a default is what the
close does without it, never a reason to skip a review that was
offered.

**Git is never guessed.** A gate default names a git action only where
the substrate contract's § Git is never guessed determines it;
otherwise the step stays unrun and is named in the report.

**What a delegation carries.** A hold's hand-off keeps its full shape
(plugin glossary) and delegates only the work that must be run by the
user: the destructive command, the network command, the release-version
write itself, or the interview's resume command. The same discipline
covers any destructive or network command handed to the user, hold or
not (a VM or container operation, say). A reversible edit riding beside
it, a config file or a settings key, is applied in the session through
the file-edit tools before the delegation, never handed over as chat
text to be typed by hand, which drops the file-state tracking and
leaves a hand-typed config unchecked. The edit tools write bytes and
validate nothing, so where the file has a format that parses, the parse
check is its own step, after the edit and still before the delegation:
never something the tool is credited with, and never left for a session
the delegation may end.

**Pre-flight.** Whichever session next touches the topic derives the
predecessor's close state and every pending step from durable state:
the repo trees, the worktree list, the topic folder, the task's state,
both repos on a close that spans two, and, in a deciding phase's
pre-flight, the pool's rows for a pending draw or return (the operations
contract, § The pool). It finishes an unfinished
close from its first missing outcome, re-reports each pending step with
its command written out, and stops only when this phase's own work
depends on one: a pending reset blocks grounding, and a pending push
blocks nothing. Where the topic has a project checkout, the pre-flight's
git steps are the substrate contract's (§ Tree options, Project
checkout).

**Close binding.** A phase close runs as one continuous execution:
state changes before announcements, and every step leaves a readable
outcome. A torn close is recovered by the next pre-flight, never
observed by a person.

**The fallback rule.** When an instrument a checkpoint needs is
unavailable (a lens pass, a verifier, a fan-out: work whose result the
close can carry as not run), defer and retry each turn. The checkpoint
counts as run if its pass lands before the boundary it guards. A
fallback's precondition names the actual variable, permission or
availability, as distinct cases. A checkpoint that never ran is
reported as not run at the close: never skipped silently, and never
blocking. A directive in the session that restricts subagent or
multi-agent use to "when the user requested it" never blocks a fan-out
a skill scripts: invoking the skill is that request, and only a tool
that is genuinely absent or a refusal at the permission layer triggers
a fallback.

**The report rule.** The terminal report names the moved review surface
as a diff or show command written out, and lists every pending step
with its command: the user's next action is instructed, not
remembered.

**The interview is a hold.** Brainstorm's and define's interviews,
every question and the settle signal included, are the user's alone and
never defaulted: the interview sections carry the `Hold:` line. When a
question is **unattended** (plugin glossary; how that is read: the
interview procedure, § Ground rules), the phase runs everything before
the interview, prepares every remaining question into its own artifact
under the `Interview pending —` marker, a **pending interview** (plugin
glossary; its shape: the interview procedure, § 4. Pending), commits,
and closes around the interview as a pending step. The capture block
runs, the terminal report names the resume command written out, and the
same phase resumes at the first unanswered question when its topic
resolution meets the marker. The fallback rule above governs
checkpoints, whose result a close can carry as not run; the interview's
question tool is not one, and a hold blocks by construction. Review's
walkthrough and tutor's sittings, study sittings included, have no
unattended mode: they are facilitated reads with their own machinery,
outside this section.

## Rule ownership

Every rule protects an outcome that one side owns.

- Build **machinery** where the failure would be **silent**: an
  under-matched sweep, a dropped read-back, failures that look like
  clean passes and land on a later session with no way to know. Claude
  forgets between sessions, and that is what earns the gates, the
  probes and the read-backs.
- Build **reminders** where the failure is **felt**: a follow-through
  the user owns, an unstarted topic or a pending push, gets an exact
  reminder (the topic name, the path, the literal command), never
  enforcement that assumes the user will fail.

The same split governs questions. Claude's uncertainty over a
mechanical choice in execution whose answer is clear (which text lands
where, prose or code, in what order) is decided, never asked: a miss is
felt at the gates or rides a friction into the pool, which costs less
than the interruption. A genuine difficulty, a choice that is not
obvious, or a trade-off in executing a plan is surfaced: that is where
things go wrong, and the user needs to know. For a git action, *clear*
has one reading and no other: a written rule determines the command,
the tree and the outcome (→ Defaults and holds).

A rule found on the wrong side is retired on the evidence of its
frictions: the pool is the audit, and there is no pass made in advance.

## The payload contract

A **payload** (plugin glossary) never appears in `plan.md`, in a fence
or in prose. Every payload, whatever its extent, is a file in the topic
folder's `payloads/` directory, named by its step ID's lowercase form
with the target's extension: `payloads/t4s2.md`, or `t4s2a.md` and
`t4s2b.md` when one step carries several. `plan.md` keeps the
addressing, the Edit anchors, and the verification, the `Run:` and
`Expected:` lines. A plan whose steps carry no payload, its steps all
deletions, commands and behaviour, has no `payloads/` directory and no
manifest.

Beside the payload files, `payloads/manifest` declares one **payload
gate** per payload, `<step-id> <target-path> [expected]`, which the
**payload verifier** the plugin ships evaluates: `scripts/payload-verify`
under the plugin root, run through `sh` on the topic directory with one
`--exempt <tree>` per machinery tree the front binds. The verifier's
header is the one home of how it runs: the manifest grammar, the PASS,
PENDING and FAIL report, the exit contract, and how it reads progress
from the plan's own ticked boxes.

Who writes what, and when. Write-plan authors the payloads and the
manifest, plan-review rewrites both, and implement's mechanical
corrections at its drift valve edit a payload file, whose gate then
re-runs. The ordinary apply path reads payload files and writes
targets, never the reverse. Write-plan emits the format (its
§ Payloads), implement applies a payload by reading its file and
writing the bytes out again through the file-edit tools, and
plan-review reads and writes both artifacts.

## The traceability stores

Machinery is traced through the topic folder, never through a commit
message, and the trace spans every machinery tree. A **traceability
store** is one of the slots in the topic folder where a session writes
the refs of the commits it made, keyed by the step that made them:

- `implemented.md` records the task commits and every machinery commit
  ref its session made, per tree, except the lens pass's own fix
  commits;
- a `review.md` entry's `Fixes applied (--fix):` line records the fix
  commits of implement's pre-executed lens pass; a fallback pass at
  review folds its fixes into that close's own commit, and the line
  records the fold (review § The lens pass);
- the same entry's `Unreviewed:` line records a close's own commits
  that no pass covered, such as the fold or a decide-forward's
  amendment commit; implement's drift-valve stop writes that line and
  no `implemented.md` at all (→ Iteration);
- `review.md`'s ship section records the ref that shipped;
- `spec.md`'s glossary delta records define's own glossary-commit ref.

This list is the only one that the SHA lookup ("search the state folder
for the SHA") and the delta computation (review § The lens pass)
enumerate. The user's own hand commits stay free-form. Commit messages
and their two registers are the substrate contract's (§ Commit
registers).

## Parallel sessions

The user may run sessions at the same time and hand artifacts between
them. Re-read a shared file before editing or judging it when you are
implementing an aged plan that did not just pass plan-review, when an
Edit's `old_string` fails to match (that failure is the signal), or
when the user mentions that another session has touched it. Say which
version a judgement is based on. A session that receives an artifact is
its new owner, and further edits to it go through the user.

## Standalone repos

Each project repository stands alone: a fresh clone, with nothing
beside it, builds, passes its own gate, and reads sensibly to someone
holding that clone alone. The state folder is upstream of nothing. The
test is the fresh clone: clone into a scratch directory, run the repo's
gate (for example `mix precommit`, and `mix docs` where it is
configured), and read the shipped prose. Two things follow: nothing the
gate runs (compile, lint, tests, generators, the docs build) reads a
sibling checkout, and no link or path in the repo's content points into
one. The duties sit where the work happens: payload prose at
write-plan's § Payloads, and mechanically at its payload-verifier gate;
links and paths at the documentation placement of the coding-standards
companion skill.
