---
name: development-process
description: The development-process reference and router - the seven phases and their skills, when the pipeline applies and where to enter it, the topic-folder artifact contract, the knowledge-placement contract, the process ground rules (session, git, and suite conventions), and the supporting-skill map. Consult it to route work into the pipeline (the phase skills' own descriptions are deliberately short) or to look up a process rule.
user-invocable: false
---

This file is the development-process skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

Development work runs through seven phases. Each phase is one kind of work,
done in its own session, and ends by producing an artifact the next phase
picks up. The artifact is the compaction boundary: the next session reads a
compact, deliberate document instead of inheriting a bloated exploration
context.

## The map

| # | Phase         | Skill               | Artifact                                                      | Hands off to               |
|---|---------------|---------------------|---------------------------------------------------------------|----------------------------|
| 1 | Brainstorming | `/ymer:brainstorm`  | `brainstorm.md` (+ verbatim `sketch.md`)                      | define                     |
| 2 | Scouting      | `/ymer:scout`       | `survey.md`                                                   | define                     |
| 3 | Defining      | `/ymer:define`      | `spec.md` + glossary updates                                  | write-plan                 |
| 4 | Planning      | `/ymer:write-plan`  | `plan.md` (+ `payloads/`)                                     | plan-review (auto-invoked) |
| 5 | Plan review   | `/ymer:plan-review` | `plan.md` (+ `payloads/`), hardened in place, surviving markers amended with the user's rulings; a *needs a define session* ruling writes the iteration marker into `review.md` instead (→ Iteration) | implement — or define, after such a ruling |
| 6 | Implementing  | `/ymer:implement`   | the code on the topic branch + `implemented.md` + the `## Review` entry (the lens pass's findings) in `review.md`; a drift-valve stop writes the iteration marker instead (→ Iteration) | review — or the marker's phase, after a stop |
| 7 | Review        | `/ymer:review`      | `review.md`; a ship close squashes and closes the task — an iterate or wait close leaves it open (→ Iteration) | — (pipeline ends), or the marker's phase after an iterate close |

Two phases run inside another phase's session by design:

- **Scout fuses into define's opening:** define invokes scout whenever the
  topic has no `survey.md` yet. A standalone scout session is for areas
  large or unfamiliar enough that the survey map deserves its own review
  before any interview.
- **Plan-review chains from write-plan:** write-plan ends by auto-invoking
  plan-review unless told not to. (Grounding — the plan-mechanical fact
  fan-out — already lives inside write-plan.)

So the common path is five sessions: brainstorm → define (scouting inline)
→ write-plan (plan-review chained) → implement → review.

## When the process applies

Enter the pipeline at the first phase whose input you don't already have,
and skip phases whose output you already hold:

- A trivial fix or mechanical change → no pipeline; edit directly.
- A sharp spec in hand → `/ymer:write-plan`.
- A chosen direction whose meaning is still fuzzy → `/ymer:define`.
- Only an idea or an itch → `/ymer:brainstorm <topic>` — the name is resolved
  against the repo's roadmap first; `/ymer:brainstorm new <topic>` declares it
  new up front.
- Work waiting in the pool — a feature, a bug, a learning gap, captured
  as a drop → `/ymer:mint` draws the top one and starts it as a topic
  with its `request.md`, then `/ymer:brainstorm <topic>` — always,
  however sharp the drop reads ("External requests never skip phases",
  under Process ground rules below).
- A large or unfamiliar area to orient in first → standalone `/ymer:scout`.
- `/ymer:review` always runs after implement, on every topic: the lens pass —
  pre-executed at implement's close and read from the record here —
  carries the one precondition, a diff or a change set exists, and the walkthrough
  carries none, so a topic with a tiny increment makes a naturally tiny
  review rather than an exit. The one lane switch past the phase is the
  lightweight close-out (below), taken per topic at the user's explicit
  call.

A process that formally fires on everything gets ignored. Entering late
and skipping phases is the normal case, not an exception.

## Artifacts

*Read with this section: `mechanics.md` § Artifacts (the mechanics) and `cases.md` § Artifacts (the cases).*

`sketch.md` is read by **exactly one phase: review**, as the contrast
between the user's own attempt and the shipped code ("your sketch did X;
the shipped code does Y"). It preserves the user's pre-session sketch
verbatim. This paragraph is the reader contract's single defining home:
every phase between brainstorm and review leaves the file unread, and each
says so by pointing here rather than by restating the rule.

Definitions live only in the repo's project glossary —
`docs/glossary.md`, unless the repo's CLAUDE.md says otherwise —
maintained by the define phase; every other document uses the terms
and points there, never redefines them.
That is a project's **domain** glossary. The vocabulary of the
**development process itself** — the terms these skill files use for
the pipeline and its phases (review, walkthrough, stop, …) —
lives in the plugin's glossary file —
`${CLAUDE_PLUGIN_ROOT}/glossary.md`, the one resolvable address for it —
under the
same point-here-never-redefine rule; it is not a project's domain glossary
and the define phase does not own it for project-repo topics — a meta
topic's define session maintains it directly, updating entries as process
terms crystallize. The domain glossary is one of a repo's **standing
docs** (term: the plugin glossary) — like the project's design
guidelines at `docs/design.md`. Phase artifacts point to standing docs,
never restate them; each repo's CLAUDE.md names the ones it keeps.

## Topic kinds

*Read with this section: `mechanics.md` § Topic kinds (the mechanics) and `cases.md` § Topic kinds (the cases).*

Two kinds, each read off one observable, and the kind is **durable** — a
property of the topic, not of a session. Every fork in a phase's text that
turns on repo shape reads it here instead of restating it.

- A **code-repo topic** has a project checkout the session runs in. It
  therefore has a topic branch, a squash-merge at the ship, and the
  project's own test suite as the gate its phases run.
- A **meta topic** has none — `<repo>` is `meta`, and the topic folder is
  the only place it lives. No branch, no squash; the plan's own gates
  stand where a project's test suite would.

## Review effort — the ladder and its keys

*Read with this section: `cases.md` § Review effort — the ladder and its keys (the cases).*

Every phase that reviews or grounds work prices that work. Two mechanisms set
the price, and one invariant binds both.

**Nothing in a review run is set by hand.** The tier is keyed; inside a tier,
routing is derived. Any rule phrased as "judge whether…" or "the user picks"
violates it — per-run sizing questions are the improvisation this section
exists to remove.

**Lens applicability** answers *which lenses run at all*, and it does most of
the work. Each lens declares a **precondition** — what must be true for it to
have anything to bite on — and the host evaluates it **before spawning**, from
observables it already holds: the artifact under review, the plan header, the
changed-file list. A lens whose precondition fails is dropped unspawned. Never
spawn a lens to discover whether it applies: paying a full agent to learn it
had nothing to say is the waste this mechanism removes.

A dropped lens is **reported with the precondition that failed**, never
silently. A dead lens is otherwise indistinguishable from "no findings", and a
wrong precondition has to surface as a lens that stopped running rather than as
silence — that is what keeps applicability falsifiable. When every lens is
dropped, the run reports "no applicable lenses" and bottoms out at the ladder's
cheapest tier; it is never reported as a clean review.

A precondition is a **derived fact, never a judgement**: each is read off the
artifact under review by a stated rule, and in doubt it reads **true** — a
wrongly dropped lens costs recall, a wrongly run lens costs tokens, and recall
prices higher. A precondition never asks whether the lens would *find*
anything — only whether it has anything to read.

**Risk profile** answers *how much machinery* — which **tier** of the
**effort ladder** runs. It is the expected cost of a defect escaping this
review: its probability of going unnoticed times what it costs if it does.
Four dimensions, three raising it and one lowering it:

- **input-space complexity** — more reachable states, more corners a cheap read
  never visits.
- **trust boundaries** — an escaped defect is a vulnerability, not a bug.
- **blast radius** — how far a mistake propagates before anything catches it.
- **mechanicalness** — *lowers* it: a transform whose gate prints its expected
  lines catches defects by construction.

**File count and artifact kind are never the key alone.** A two-file plan whose
whole risk sits in one function's input space outranks a twenty-file mechanical
rename; a prose plan can carry more risk than a code plan.

## Iteration — the route and its executor

*Read with this section: `cases.md` § Iteration — the route and its executor (the cases).*

An **iteration** is a topic re-entering the pipeline loop when review, or
implement's drift valve, or plan-review's close over a surviving
`> Needs confirmation:` marker, finds the record contested, exceeded, or
still open. It is
normal development, not a planning failure: the cost of a provably perfect
plan grows with the system, and this process bets on cheap, well-recorded
iterations against real feedback instead of exhaustive up-front hardening.

**The route is derived, never picked.** An iteration enters at the phase
that owns the artifact where the contested statement lives:

| The contested statement lives in | The iteration enters at |
|---|---|
| the chosen direction — `brainstorm.md` | brainstorm |
| a decision, a meaning, a glossary entry — `spec.md`, the glossary | define |
| a measurement — `survey.md` | define |
| mechanics, task design, a payload — `plan.md`, `payloads/` | write-plan |

The discriminator is artifact ownership — a fact in the record — never a
judgement about the finding's nature, which is what "routing is derived"
requires (→ Review effort).

**The executor is derived too, off one further fact: is the new decision
already made?**

- **Not made** — the finding says the decision did not survive contact and
  what is right is still open. **Full iteration**: the owning phase's
  session is where deciding happens, and the session that found it ends by
  naming that phase in its marker.
- **Made** — the developer, at the code, has already picked a third option
  and is confident. Re-entering the phase would be ritual re-derivation,
  so the iteration executes in place: **decide-forward**. The edit stands,
  the artifact owning the statement receives a dated amendment recording
  the decision and its why, and the edit is reviewed as a delta. No
  session hop, no plan-review — plan-review hardens predictions, and a
  decide-forward has none left. It is **not a close**: the session
  continues.

**The amendment is decide-forward's non-negotiable half.** Without it the
record asserts X while the code does X′, and every later walkthrough
derives its constraints from the record rather than from memory. The
developer decides; the facilitator writes the amendment, in whichever
marker the owning artifact already takes — no grammar is minted for it
(`spec.md`: define § The Spec; `plan.md`: write-plan § Task Structure) —
and sweeps the decision's footprint in the same session, per the recipe
those homes carry. **Resist → full**: a footprint that resists mechanical
correction, because the amendment re-opens task design, is evidence the
decision was not actually made; the executor fork re-derives to a full
iteration and the session stops at the route's phase.

**Each phase keeps one artifact, rewritten in place**; the history is
the state store's — git's phase commits where git tracks the state
folder, the `pre-image/` slot where it does not. Sibling files (`plan-2.md`)
never come into existence, the `pre-image/` slot aside, which is no
artifact and which no reader takes for the live file: every phase writes
one file named after itself, and no reader ever has to work out which one
is the live one.

## Knowledge placement — the contract

Process and project knowledge lives in **chartered stores** only — no side
stores (a front's own automatic memory is off deliberately; the front's
initial instructions carry the always-loaded rules). Routing test: **must
the knowledge bind in a session where no skill is ever invoked?** If yes it
needs a push channel (an always-loaded instruction file); if no, it belongs
in a pull store, routed by trigger description or pointer.

| Store | Owns |
|---|---|
| the front's initial instructions (global push) | what must bind everywhere pre-tool-call: git ownership, machine traps, working-with-the-user rules |
| repo `CLAUDE.md` (cwd-scoped push) | that repo's repo-safe operational facts, conventions, gotchas |
| repo `CLAUDE.local.md` (cwd-scoped push, gitignored) | private per-repo facts kept out of a shared or employer-visible working copy |
| the plugin's skills (pull) | process knowledge — each rule lives in the skill that owns the moment it fires |
| the coordinator's tasks and projects | work state — the roadmap of work in flight — plus each product's **product page**, the governed prose in its Roadmap project's description (binding: the operations contract) |
| the coordinator's docs | reference knowledge reusable across projects — tool/language notes, the knowledge docs (the learning track's substrate — the tutor skill). Dividing line: useful independent of one repo's current code → a coordinator doc; about specific files/decisions of a repo → that repo's docs |
| the pool (the `pool` table, the node's notebook) | work nobody has started — drops of every kind, written by the `capture` skill and drawn by the `mint` skill |

Knowledge with no fitting store means stop and pick (or charter) one with
the user — never open a scratch store.

**The duty discharges** when, before the boundary closes, the knowledge
either sits in a chartered store or sits in a record some later reader is
bound to consume — a store in transit. What makes the second one work is
the guarantee, not the record's kind: a direction doc qualifies because
the next phase must read it, which is why a brainstorm may close by
recording an explicit handoff naming the store instead. Where no reader is
bound — a session close, a phase whose artifact nothing downstream must
read — routing now is the only discharge, which is why end-session is
route-only. Capturing the knowledge as a drop in the pool is routing
rather than an escape: the pool is one of the stores above.

## Process ground rules

*Read with this section: `mechanics.md` § Process ground rules (the mechanics) and `cases.md` § Process ground rules (the cases).*

- **One phase per session; the artifact is the compaction boundary.** A
  phase ends by naming the next one, never by invoking it — the two
  fusions under The map are the only exceptions.
- **External requests never skip phases.** A drawn topic — feature and
  bug alike — always enters at brainstorm, however sharp it reads: brainstorm and
  define regularly catch what the request's author missed, and "well-written"
  is not "thought through". The straight-to-write-plan entry is for specs
  produced inside the process or by the user themselves.
- **Lightweight close-out (below-bar topics).** When a topic already in the
  pipeline turns out fully specified and prose-only, so write-plan /
  plan-review / implement would only restate an existing artifact: say
  so proactively and offer the lightweight path — the direction doc serves
  as the plan, diffs are reviewed live in-session, and a thin `review.md`
  records the lane taken plus the ship section, the topic's task closing
  completed as at any ship — so done-ness reads the same for every
  topic; no `implemented.md` is written, since no implement ran. This lane
  is the **one lane switch** past review — it skips the pipeline's whole
  back half with the user's approval; review itself never skips. The
  completion contract stays intact. A *fresh* below-bar friction now rides
  `/ymer:mint`'s friction-batch topic into this same lightweight path,
  rather than being fixed in-session — the pipeline gets the scrutiny, and
  the batch's brainstorm decides how cheap the route is.

- **Rule ownership — machinery vs reminders.** Every rule protects an
  outcome one side owns. Build machinery where the failure would be
  **silent** — an under-matched sweep, a dropped read-back: failures that
  look like clean passes and land on a later session with no way to
  know; Claude's cross-session amnesia is what earns the gates, probes,
  and read-backs. Build reminders where the failure is **felt** — a
  user-owned follow-through (an unstarted topic, a pending push)
  gets an exact reminder — the topic name, the path, the literal
  command — never enforcement that assumes they will fail. The same split
  governs questions: Claude's uncertainty over a mechanical execution
  choice whose answer is clear (which text lands where, prose or code,
  in what order) is decided, never asked — a miss is felt at the gates
  or rides a friction into the pool, cheaper than the interruption; a genuine
  difficulty, non-obvious choice, or trade-off in executing a plan is
  surfaced — that is where things go wrong, and the user needs to know.
  For a git action *clear* has one reading and no other: a written rule
  determines the command, the tree, and the outcome (*Defaults and
  holds*, below).
  A rule found on the wrong side is retired on its friction evidence —
  the pool is the audit; no proactive pass.
- **Defaults and holds.** Every gated moment (plugin glossary) carries one
  inline line naming what happens when the user's input has not arrived by
  phase close — `Default: <action> — review post-hoc at <surface>.` or
  `Hold: <command>.` — pointing here, never restating this rule. Two
  classes, assigned when the line is written, never at run time: a **gate
  default** runs the named action, the close commits it, and review moves
  post-hoc to the committed artifact; a **hold** — network git
  (push/pull), a step destructive of uncommitted work, a
  release-version write, or brainstorm's and define's interview, every
  question — is never defaulted: the step stays pending and the phase
  closes around it, state the only record (no separate artifact, no
  stored status). **Git is never guessed** (the environment's
  ruling: the substrate contract): a gate default names a git action only
  where a written rule determines it — the command, the tree it runs in,
  and the outcome it expects — and where no rule determines it, the step
  stays unrun, is undone to its pre-state where it had already begun, and
  is named in the report. Input that
  arrives is honored exactly as before — a default is what the close does
  without it, never a reason to skip offered review. **What a delegation
  carries:** a hold's hand-off keeps its full shape (plugin glossary) and
  delegates
  **only the work that must be user-run**: the destructive command, the
  network command, the release-version write itself, or the interview's
  resume command. The same
  discipline covers any destructive or network command delegated to the
  user, hold or not (a VM or container
  operation, say) — a reversible edit riding beside it (a config file, a
  settings key) is applied in-session through Write/Edit *before* the
  delegation, never handed over as chat text for hand transcription,
  which drops the file-state tracking and leaves a hand-typed config
  unchecked. The edit tools write bytes and validate nothing, so where
  the file has a parseable format the parse check is **its own step**,
  after the edit and still **before the delegation** — never something
  the tool is credited with, and never left for a session the delegation
  may end.
  **Pre-flight:**
  whichever session next touches the topic derives the predecessor's close
  state and every pending step from durable state (repo trees, worktree
  list, the topic folder, task state — both repos on a two-repo close),
  finishes an unfinished close from its first missing outcome, re-reports
  each pending step with its command written out, and stops only when this
  phase's own work depends on one (a pending reset blocks grounding; a
  pending push blocks nothing). **Close binding:** a phase close runs as
  one continuous execution — state changes before announcements, every
  step leaving a readable outcome; a torn close is recovered by the next
  pre-flight, never observed by a human. **Fallback rule:** when an
  instrument a checkpoint needs — a lens pass, a verifier, a fan-out:
  work whose result the close can carry as not-run — is unavailable,
  defer and retry each turn — the checkpoint counts as run if its pass
  lands before the boundary it guards; a fallback's precondition names
  the actual variable, permission versus availability, as distinct
  cases; a checkpoint that never ran is reported as not-run at the
  close — never silently skipped, never blocking. A session-level
  directive that restricts subagent or
  multi-agent use to "when the user requested it" never blocks a
  skill-scripted fan-out — invoking the skill is that request; only
  genuine absence or permission denial triggers a fallback. **Report
  rule:** the terminal report names the moved review surface as a
  written-out diff/show command and lists every pending step with its
  command — the user's next action is instructed, not remembered.
  **The interview is a hold.** Brainstorm's and define's interviews —
  every question, the settle signal included — are the user's alone,
  never defaulted: the interview sections carry the `Hold:` line. The
  trigger is the session's question tool's own report, read at each
  question — the tool absent from the session's tools, or the call that
  puts the question refused, a refusal never retried — never a line
  about the user's whereabouts and never the session's judgement: an
  interactive invocation is presence, whatever the system prompt says
  of the session, and the interview runs in full. An **unattended**
  question (plugin glossary) is neither answered on the user's behalf
  nor skipped: the phase runs everything before the interview, prepares
  every remaining question into its own artifact under the
  `Interview pending —` marker — a **pending interview** (plugin
  glossary; the artifact's shape: § Artifacts) — commits, and closes
  around the interview as a pending step: the capture block runs, the
  terminal report names the resume command written out, and the same
  phase resumes at the first unanswered question when its
  topic resolution meets the marker. The fallback rule above governs
  checkpoints, whose result a close can carry as not-run; the
  interview's question tool is not one — its absence is this hold's
  trigger, and a hold blocks by construction. Review's walkthrough and
  tutor's sittings — study sittings included — have no unattended mode:
  facilitated reads with their own machinery, outside this contract.

- **Approach changes discovered late (in implement or review) are
  iterations, never silent edits to the implementation** — the phase an
  iteration re-enters at, and whether it executes as a full iteration or
  in place, are both derived (→ Iteration).
- **Editing a split skill.** A split skill is a `SKILL.md` top plus
  `mechanics.md`/`cases.md` reference files under mirrored headings; an
  edit keeps every unit whole on one side of that seam. A top never
  reads as a complete procedure, list, skeleton or test while a member
  sits in a reference file, and content moves at the altitude it is —
  spine in the top, substrate and earned precision in the reference
  file. A top-side reference to reference-file content names the file
  and section (`mechanics.md § Drift Valve`), never "above" or "below".
  The check is reading: a prose-bound unit is invisible to every shape
  rule, which is how seven such sites survived thirty-three green gates.

## Supporting skills

- A coding-standards companion skill for the project's own language —
  governs its code and documentation; invoked as a companion by
  write-plan and implement where the front has one installed.
- `code-review` — adversarial review of a code diff, the implementation
  counterpart of plan-review: invoked with `--fix` as the lens pass —
  pre-executed at **implement's** close over the increment it just
  committed, run by **review** as the fallback; also standalone as
  `/ymer:code-review`. An owned copy
  seeded from the built-in's high-effort shape; the name deliberately
  shadows the built-in's.
- `sweep` — recall-first discipline for building any find-all-sites
  list (rename gates, ripple sweeps, vocabulary sweeps, verification
  greps, dead-reference hunts): over-match the matcher and the corpus,
  filter by reading, and gate so the gate can fail — named expected
  survivors, a paired non-zero assertion through the same matcher
  for a zero-hit gate, or before/after measurements bracketing one
  edit for a delta gate. Its claims rules bind reported claims
  generally: a count or zero in any artifact carries its stamp, an
  absence its positive control, family counts a committed sweep
  artifact; a load-bearing claim nothing measured is probed or marked
  `inferred:`, an already-measured external fact re-verified at use
  or carried `as-of <basis>`. Pointed at by brainstorm, scout, define,
  and write-plan; implement binds its gate rules alone, and
  plan-review's binding rides its review workflow rather than its
  SKILL.md; the operations contract points at its claims rules for a
  minted task's evidence. Ad-hoc sweeps ride its description trigger.
- `product-design` — the product-design principles (gate + per-principle
  checks + anchors) for shaping any surface a user operates, with humans
  and LLMs as first-class user types. Pointed at by brainstorm's
  product-alignment beat; ad-hoc firings ride its description trigger.
- `/ymer:tutor <subject>` — the learning track's delivery surface: a
  proficiency-for-use engagement on one subject — days to weeks of
  sittings under the tutoring contract, toward a goal contract of
  solo-demonstrable criteria, closed by a capstone; an open learning
  task on the subject is the engagement's delivery target, its bar
  adopted at the opening and the task closed only by demonstration
  (binding: the operations contract) — or a freestanding study sitting
  working the subject's knowledge doc. Bare `/ymer:tutor` is the discovery
  menu: open engagements, study subjects, and the Learning project's
  open tasks, in one recall-free menu.
- `/ymer:define term <term>` (term mode) — sharpen a single glossary term,
  outside any pipeline topic; a rename or redefinition bounces to a full
  define topic, entering the pipeline at define.
- `/ymer:end-session` — deliberate session close-out: loose-ends sweep,
  then knowledge review (the instruction files + the coordinator), then
  the all-clear. For a session with no successor.
- `/ymer:capture` and `/ymer:mint` — the loop that feeds the pipeline,
  shipped in this plugin beside the phases. Capture (the capture block
  at covered skills' tails, the moments a phase notices future work, or
  standalone) records what the work observed as drops in the pool, the
  `pool` table in the node's notebook — every observed bug, learning
  gap, piece of product direction and idea, and one friction per tail;
  mint scores the new drops, ranks the pool and draws exactly one thing
  from it — the top drop, formed into a topic by its product's Forward
  direction, with its folder and its task created at `doing`; the
  friction-batch; or a learning task in the Learning project — no
  folder, task only. Supporting skills, not phases; capture writes
  nothing in git, and mint commits only the folder it wrote.
- A front's own editor or tooling skills — unrelated to the pipeline.
