---
name: plan-review
description: Attacks an implementation plan before any code is written: independent reviewers each check one concern against the real code, a verifier throws out what does not hold up, and the plan is rewritten in place with the fixes in. Use right after a plan is written, before implementing it.
---

# Plan Review

Plan-review attacks an implementation plan before any code is written.
Write-plan decided how to build the topic; plan-review checks that plan
against the real code and hardens it. Independent reviewers each check
one concern, a verifier throws out what does not hold up, and one
rewrite author folds every confirmed fix into the plan and its payloads
in place. The review runs in agent contexts of its own, so it does not
spend the session's context (the reason hand-run review loops kept
running out of room), and the plan comes back rewritten and marked
reviewed, for implement to run.

This file is plan-review's spine: its intent and its moments in order.
Its **mechanics** (the Claude Code way: the Workflow launch, the Agent
tool, git, recovery) are in `mechanics.md`, and its **cases** (the
earned precision: the facts' edge rules, how a marker becomes a
question, the failure modes of real runs) are in `cases.md`, both under
this file's headings. A section with entries there says so in its first
line. Its **agent prompts** are files beside it: one per role
(`reviewer.md`, `verifier.md`, `rewrite-author.md`) and one per lens
(`lenses/<key>.md`). Each agent Reads its own, so sharpening a lens or
adding one is an edit to the prompt files and the roster, and this
spine stays as it is.

## Overview

**Read the plugin glossary's entries for plan-review's vocabulary
now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/glossary.md`, each entry by its heading:
*pre-image*, *decision digest*, *lens*, *lens applicability*,
*effort ladder*, *risk profile*, *orchestration floor*, *rewrite
author*, *payload*, *payload verifier*, *amendment marker*,
*iteration*, *gated moment*, *workflow-internal reference*,
*content-ownership map*, *machinery tree*, *parent topic*, *inherited
records*. This file uses those terms and never defines them.

Plan-review is the default next step after write-plan saves a plan: run
it on the freshly saved plan without being asked, unless the user said
to skip review. Its top tier calls the Workflow tool, the tool's
intended, sanctioned use of multi-agent orchestration.

The workflow is autonomous and runs to completion: it cannot stop to
ask the user anything. The user's leverage is all before launch (refine
the plan and the input) and after: the rewritten plan, reviewed
post-hoc at the surface the relay hands over, and one question for
each `> Needs confirmation:` marker the rewrite author left standing, put at
the close before implement builds on the guess (§ The Relay). That
question is this skill's one gated moment; the workflow itself stops
for nothing and changes no git state. Every agent reads the confinement
contract first and probes only under the run's scratch root, never
writing a file in the project checkout, and runs no git that changes
state; read-only git such as `log` or `blame` grounds a finding. The
relay's tree assertion and the host's inventory are the net for what an
agent left behind.

The run goes in order: resolve the inputs and keep the plan's
pre-image, derive the facts and the tier, run the tier, write the
record and the hardened line and commit, then relay the result and put
the open questions to the user.

## Input

*Read with this section: `mechanics.md` § Input (the mechanics).*

Input resolves what the run is given, keeps the plan's pre-image, and
on an iteration takes the delta the review keys on.

**Read the process contract's § Defaults and holds now, and the
operations contract whole**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`. They hold the gate
defaults and holds, the fallback rule and the report rule; and the
topic's artifacts (how the state folder's kind is read, the
`pre-image/` slot and its stamp), the status ladder with its
`Hardened —` line, and the topic ID's folder. Where `review.md` tops
with an `Iteration —` marker, **read the process contract's
§ Iteration now** as well, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for whether the marker is
live or consumed, its `Consumed —` line, and the plan's pre-image as an
iteration's delta.

Resolve the run's inputs:

- `planPath`: the absolute path of the plan file. Where the user named
  a plan, use it; otherwise find it under `<state folder>/<repo>/`
  (`<repo>` is the checkout's directory name, or `meta` for a
  cross-repo process topic), in the topic's folder (the operations
  contract, § Topic ID ↔ folder mapping), and where that is ambiguous,
  ask which one. Required.
- `specPath`: the absolute path of the spec the plan was written from:
  the topic folder's `spec.md` where it exists, otherwise a separate
  spec the user named. Omitted only where no spec exists apart from the
  plan.
- `focus`: free text, only where the user asked to emphasise something
  this run ("lean hard on security"), passed through on one line.
- `verifierCommand`: the payload verifier as this session runs it,
  `sh ${CLAUDE_PLUGIN_ROOT}/scripts/payload-verify` followed by one
  `--exempt <tree>` per machinery tree the front binds. Required: the
  rewrite author runs it on the topic folder, and no agent can resolve
  the plugin root itself.
- `promptDir`: the directory holding the agent prompts,
  `${CLAUDE_PLUGIN_ROOT}/skills/plan-review` resolved to its absolute
  path, or the scratchpad copy's where the launch falls back to one
  (`mechanics.md` § The Run). Required: every agent Reads its prompt
  files there, and its shared homes under the plugin root that path
  sits in.
- `scratchRoot`: the run's scratch root, a fresh directory made under
  the session scratchpad just before launch (the confinement contract,
  § The scratch root). Required: no agent writes anywhere else, and the
  workflow cannot make a directory itself. One root serves the whole
  run, and each agent makes a directory of its own inside it.

**Keep the plan's pre-image** (term: the plugin glossary). Tell the
user briefly that the run rewrites the plan in place. Where git tracks
the state folder, write-plan's phase commit already holds the plan, so
the rewrite is recoverable from the state folder's history and nothing
is stashed or committed before launch. Where the files are the record,
copy `plan.md` and `payloads/` into the topic's `pre-image/` slot
before launch, on every run, first cycle or iteration, as the
operations contract's § The topic's artifacts says.

**On an iteration, take the delta.** The process contract's
§ Iteration states the doctrine and leaves the read here, at its one
consumer: the subject is the steps the iteration changed or added and
their payloads, with the untouched plan as context. Where git tracks
the state folder, it is the diff of the iteration's own write-plan
commit against its parent (`mechanics.md` § Input). Where the files are
the record, it is the `pre-image/` slot write-plan filled before its
re-plan, against the current `plan.md` and `payloads/`: read it and
keep it before this run's own copy replaces it. A resumed run that
finds the slot's stamp standing skips that copy, as the contract says,
and on an iteration the slot then holds this phase's own pre-image
rather than write-plan's: the subject is the whole plan, the safe side.

Last before launch, on any kind of state folder, **remove a
`Hardened —` line** an earlier review left under `plan.md`'s title. The
plan about to be rewritten is no longer the plan that line certified,
so a run torn mid-rewrite must read unhardened, and § The Hardened
Line writes the line afresh.

## Facts and Tier

*Read with this section: `mechanics.md` § Facts and Tier (the mechanics) and `cases.md` § Facts and Tier (the cases).*

Facts and Tier decides which lenses run and how much machinery runs
them, from the plan alone: no sizing question reaches the user.

**Read the process contract's § Review effort and § Topic kinds now**,
unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. They hold lens
applicability and how a dropped lens is reported, the risk profile
that keys the tier, the orchestration floor a ladder owes, and the two
kinds of topic.

**The roster.** Open
`${CLAUDE_PLUGIN_ROOT}/skills/plan-review/plan-review.workflow.js` and
read the `LENSES` array's `key`, `requires` and `requiresText` fields.
That array is the one source of what each lens needs, and each lens's
file under `lenses/` the one source of what it checks; this skill
restates neither, so they cannot drift apart.

**The facts.** Each is read off the plan by the rule in its row, never
judged. The subject is the whole plan on a first cycle: its steps and
paths, and the topic's `payloads/` files, which carry its payloads (the
process contract, § The payload contract). On an iteration it is the
delta § Input took, and ticked, carried steps are context for the
lenses, never a fact's source: a row that reads `## File Structure` or
`plan.md` itself counts only what the delta's steps add or change
there. Every rule reads what a step changes,
its action and its payload's changed bytes, never what it names: a
change confined to comments, doc text or prose stored in any file is
prose, and makes no fact true. The edge rules, and the runs that taught
them, are in `cases.md` § Facts and Tier.

| Fact | Read off |
|---|---|
| `hasCode` | the plan's `## File Structure` names a file whose planned change is code or configuration, not only its comments, doc text or prose (a JSON or config value counts) |
| `touchesConcurrency` | a step or a payload adds or changes a process or concurrency construct: a long-lived process, a supervisor, a shared in-memory table, a background job, or a setting that runs tests concurrently |
| `touchesTrustBoundary` | a step or a payload changes an externally reachable entry point (a route or controller, a tool or action called from outside the system, an API or webhook handler, a command-line argument parser, a deserializer of external input), changes authentication or authorization, or changes a query that scopes data per tenant or user |
| `touchesPersistence` | the `## File Structure` names a migration or a data-at-rest schema file the plan changes, a step creates or edits a migration or changes such a schema, or a step runs a data transform or backfill |
| `relocatesContent` | a content unit can lose its home: the `## File Structure` has a delete or move row, a step moves or deletes a file (`git mv`, `git rm` or a bare `rm`), a step replaces a content-bearing file's body or a whole section of it, or the plan carries a content-ownership map; a file the plan creates and removes itself is no relocation |
| `recordsAmendment` | line-start `> **Amended (` occurs in `plan.md`: read off `plan.md` alone, never `payloads/`, since a payload is verbatim target bytes and may carry the grammar as documentation |
| `companionSkill` | the plan header's line `Coding and documentation work in this plan must follow the <skill-name> skill.`: the skill name it states, or `null` where the line is absent |
| `glossaryPath` | the glossary that governs this plan, resolved here because the workflow cannot read files: the project's `docs/glossary.md`, unless its `CLAUDE.md` says otherwise; for a meta topic, the plugin's own glossary file |

`glossaryPath` is a parameter, not a precondition: no lens is dropped
for it. Doubt is resolved here, where the fact is derived: a fact you
decline to derive is not a fact in doubt, and the workflow rejects a
`facts` object with a key missing rather than reading the gap as
`false`.

**The decision digest, spec-level only.** Copy `spec.md`'s
`## Decisions` and `## Out of scope` verbatim, each section whole with
its heading, preceded by its `spec.md § <section>` citation on a line
of its own, by the extraction rule in `cases.md` § Facts and Tier. The
extraction is mechanical, so the digest is passed whole whatever its
size: a huge digest is a true signal about the plan, and a bound would
bring back the judgement the rule removes. Pass the copied text as
`decisionDigest`. The workflow adds the `SETTLED` header, and the rule
that travels with the digest is in the reviewer's and the verifier's
prompts, so add neither here. Never the plan's own decisions:
code-review reviews the diff against the plan, so the plan's decisions
are settled for it, but this skill reviews the plan, and feeding its
decisions back as settled would turn an adversarial pass into a
consistency check. Where the plan header carries a `**Parent topic:**`
line, copy the parent's `spec.md` sections the same way, beside the
topic's own, each under a citation naming the parent's file
(`<parent folder>spec.md § <section>`): they are inherited records,
settled for this plan (the operations contract, § Inherited records).
No `spec.md` on either side, no digest.

**The tier.** A lens survives when it declares no `requires`, or when
the fact its `requires` names is true. Report the surviving roster and
every dropped lens with the precondition that failed: a dropped lens is
never silence.

- **Three survivors or fewer: the lightweight pass.** One
  fresh-context subagent, handed the reviewer's prompt, the surviving
  lenses' files and the rewrite author's prompt with the run data
  (`mechanics.md` § The Run). It reviews, and folds its own findings
  into whichever surface carries each defect, the plan or a payload
  file.
- **Four survivors or more: the workflow.**
- **No survivors** cannot happen under the roster as it stands:
  `completeness`, `codebase-consistency` and `testability` declare no
  precondition, so the lightweight bucket always holds exactly three.
  Should a later roster make every lens conditional, stop and say so:
  nothing was reviewed, and that is never an all-clear.

The line between the two tiers is this ladder's orchestration floor,
three survivors: a calibration of the principle in the process
contract's § Review effort, its reasoning in `mechanics.md` § Facts and
Tier, revised on captured evidence and never a bare threshold.

## The Run

*Read with this section: `mechanics.md` § The Run (the mechanics) and `cases.md` § The Run (the cases).*

The Run hands the plan to its tier and gets it back rewritten.

**Read the process contract's § The payload contract now, and the
payload verifier's header**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/scripts/payload-verify` (its opening comment).
They hold where payloads live, the manifest and who writes what; and
how the verifier runs, and what each of its lines and exits means.

**Prep that pays**, before launch: verify the plan's Create and Modify
labels and its anchors against the current tree, fix drift in the plan
directly, and pass what you verified into `focus` as "pre-verified
facts — do not re-flag", together with any directive the user gave.
Before the first fact goes in, **read the sweep skill's § Claims
now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md` (§ Claims: stamps,
controls and the sweep artifact), for what a stamp carries and what an
absence's control is. Only stamped facts ride the list (`cases.md`
§ The Run).

**Before launch, read the confinement contract whole now**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/confinement-contract.md`,
for what this session and the agents it dispatches may touch on the
user's machine: the principle, the scratch root each dispatch gets, the
cases (processes, ports, live targets, sibling trees, secrets, residue),
the host's inventory around a dispatch, and the layers beneath it.
Whichever tier runs, make the run's scratch root and take the
inventory's before-read once, before the run's first launch; every
dispatch names the contract and the root (`mechanics.md` § The Run).

- **The workflow**: call the Workflow tool with the script
  `${CLAUDE_PLUGIN_ROOT}/skills/plan-review/plan-review.workflow.js`
  and the run's `args` (`mechanics.md` § The Run). It fans out one
  reviewer per surviving lens, pipes each lens's findings into an
  adversarial verifier that drops false positives, and has one rewrite
  author apply every confirmed fix to the plan and its payloads.
- **The lightweight pass**: the one subagent § Facts and Tier names. A
  pass that edited the plan or a payload closes with the verifier run
  its prompt asks for.

**Fallback** (the process contract, § Defaults and holds, read at
§ Input). Where the Workflow tool is absent and the Agent tool is
present, run the workflow's shape with the Agent tool: one subagent per
surviving lens, an adversarial verifier subagent over each lens's
findings, and one rewrite author subagent, each handed the same prompt
files and run data the workflow would hand it (`mechanics.md` § The
Run). The summary says the workflow tier ran through the Agent tool.
Where both tools are absent, where the lightweight pass needs the
Agent tool and it is absent, or where a call is refused at the
permission layer, the review runs inline in this context with the
same surviving lenses: Read `reviewer.md`, each surviving lens's `lenses/<key>.md` and
`rewrite-author.md` beside this file, and follow them as the
lightweight pass's subagent would, closing with the verifier run its
prompt asks for. The summary says so.

**A prompt that will not Read** is retried once, never counted at
first sight. An agent that returns `promptUnreadable`, on the
lightweight pass or through the Agent tool, is spawned once more with
`promptDir` set to the scratchpad copy a refused launch makes; on the
workflow, a lens skipped for an unreadable prompt sends the run fresh
from that copy (`mechanics.md` § The Run). A second `promptUnreadable`
is a dimension not reviewed, and a lightweight pass that ends there
reviewed nothing.

Before trusting the result, read the summary's `skippedLenses`,
`degradedLenses`, `droppedLenses` and `unverifiedFindings` beside its
`changesApplied`: a lens that failed, was skipped or never ran is a
dimension not reviewed, never one that came back clean (`cases.md`
§ The Run).

## The Hardened Line

*Read with this section: `mechanics.md` § The Hardened Line (the mechanics).*

The Hardened Line records the run in the plan and marks the plan
reviewed. No task is written. When the run returns, and only then, in
this order:

1. Where `review.md` topped with a consumed `Iteration —` marker when
   this phase opened, append `Consumed — <YYYY-MM-DD> by plan-review`
   to that marker's block (the process contract, § Iteration, read at
   § Input).
2. Write the run's record as the plan's last section, replacing an
   earlier run's record whole:

   ```markdown
   ## Plan review

   <YYYY-MM-DD>, <the tier: the lightweight pass, the workflow, the workflow through the Agent tool, or inline>.
   Lenses run: <keys>. Dropped: <key> (<precondition>), …, or none. Skipped: <keys>, or none.
   Findings: <n> confirmed, <n> refuted, <n> unverified.
   ```

   A run that found nothing records that too: it is feedback. On the
   workflow the three counts come from its summary: confirmed is
   `verifiedFindingCount`, counted after duplicates at one location and
   title were merged; refuted is `refutedFindingCount`; unverified is
   the length of `unverifiedFindings`. A count whose field the summary
   does not carry, as on a run that confirmed nothing or had no lens to
   run, is 0. Through the Agent tool the host counts the same three from
   its subagents' returns. On the lightweight pass and inline no
   verifier runs, so the findings line reads
   `Findings: <n> folded in; no verifier on this tier.`, `<n>` the
   length of the returned `changesApplied`. Where `rewriteFailed` is
   true, the findings line closes with `; rewrite failed, none
   applied.` The record carries no checkbox and no line opening with a
   marker the relay or the facts read (`> Design decision:`, `> Needs confirmation:`,
   `> **Amended (`).
3. Write `Hardened — <YYYY-MM-DD>`, dated today, directly under
   `plan.md`'s title, with a blank line on either side, as the run's
   last write to the plan. Why it comes last, and what removes it
   later, is the line's lifecycle (the operations contract, § Topics,
   read at § Input).

   A run that reviewed nothing, every surviving lens skipped, or
   whose `rewriteFailed` is true, writes no line: implement reads the
   line as a reviewed plan, and this plan is not one. Its record still
   lands and says why, and the relay says run again.
4. Where the files are the record, remove the slot's stamp
   `pre-image/plan.md.taken`, on every run.

On the define branch this phase also writes the iteration marker into
`review.md` (§ The Relay), which implement's readiness gate reads
before the line.

Then the phase close. **Read the substrate contract whole now**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/substrate-contract.md`,
for staging by explicit path, concurrent edits on a shared tree and the
commit registers; its opening says when it applies. Where git tracks
the state folder, commit the topic folder (`mechanics.md` § The
Hardened Line), state changes before announcements (the process
contract, § Defaults and holds). The machinery-edit duty is the
session's, whichever phase it is (the process contract, § Topic kinds,
read at § Facts and Tier).

## The Relay

*Read with this section: `mechanics.md` § The Relay (the mechanics) and `cases.md` § The Relay (the cases).*

The Relay tells the user what the run did, then puts every question the
rewrite author left open to them, one at a time.

**Assert the project tree first** on a code-repo topic: its status is
empty, or every entry is named and justified in the relay
(`mechanics.md` § The Relay). A file an agent left behind is neither:
remove it, and say so. A meta topic has no project checkout,
so the assertion is skipped, not failed.

**Then take the inventory's after-read**, on every topic, and remove
the run's scratch root with whatever else it attributes (the
confinement contract, § The host's inventory). The relay names what it
removed and each item it left, with its command.

Then report the summary's fields:

- `changesApplied`: what was fixed in the plan.
- `designDecisions`: the calls the rewrite author made on the user's
  behalf, each with the alternatives not taken and its rationale.
  Surface these clearly: they are where the user is most likely to
  want to override.
- `unresolved`: anything left flagged in the plan for the user's
  product or domain input.
- `droppedLenses`, beside `skippedLenses`: every lens whose
  precondition failed, with the precondition, and every lens that
  failed or was skipped. A dimension that never ran is not a dimension
  that came back clean.
- `unverifiedFindings`: findings the verifier could not check, dropped
  unchecked rather than judged false. A run that returns any is not a
  clean run, and an empty `changesApplied` beside them means nothing
  was cleared.
- `verifiedFindingCount` and `refutedFindingCount`: the findings
  confirmed, after duplicates were merged, and the findings the
  verifiers refuted; the record's counts.
- `rewriteFailed`: present and true means the rewrite author never
  ran, so the plan is untouched and every confirmed finding still
  open. Say so and run again; never report that pass as a review that
  found nothing.

The summary is the convenient source, not the only one. The rewrite
author writes every design decision into the plan as a
`> Design decision:` note and every open question as a
`> Needs confirmation:` marker, so a truncated notification is
recovered from the plan itself by the recovery grep (`mechanics.md`
§ The Relay), never by digging through the run's journal or output
file. `changesApplied` is the diff below, and `droppedLenses` was
derived at § Facts and Tier before launch.

Then hand over the post-hoc review surface with real refs, the diff of
the topic folder from write-plan's save to this phase's (`mechanics.md`
§ The Relay; the report rule: the process contract, § Defaults and
holds), since the rewrite may touch `plan.md` and `payloads/` both, and
offer to adjust any design decision the user disagrees with.

**Then put every surviving marker to the user, one question each.** A
`> Needs confirmation:` marker is the rewrite author's record of a
product or domain question it could not settle on the user's behalf,
and the next session to read it is implement, which asks nothing. Left
standing, the topic spends its implementation on a guess the record
itself flags as open, and review meets the question after the tokens
are spent.

- **The trigger is the plan, not the summary.** A marker the recovery
  grep finds in `plan.md` fires this beat, and a non-empty `unresolved`
  corroborates it wherever the run returned a summary. The plan is the
  durable source, and a summary can come back truncated or not at all,
  so a trigger keyed to it could fail to fire. The grep's hits are read,
  not counted (`cases.md` § The Relay).
- **Reconcile the summary against the markers** wherever the run
  returned one, on every tier that runs the rewrite author: each `designDecisions` entry has one line-start
  `> Design decision:` note in `plan.md`, and each `unresolved` entry
  one line-start `> Needs confirmation:` marker. A field with no marker
  of its kind is the relay's own finding, never an all-clear: write the
  missing markers from the entry's text, at the sites its notes name,
  before the questions are put, so the union of the two channels fires,
  never the intersection and never either alone.
- **Never in the relay's turn.** A question bubble hides the prose
  printed beside it, so the relay lands first and the questions open
  the next turn.
- **One question per marker**, through the question instrument, one
  marker at a time, its options built from that marker's own text
  (`cases.md` § The Relay): the rewrite author's provisional choice
  first, labelled `(Recommended)`, since it is what the plan already
  says, and the two standing exits last, **defer to review** (the
  marker stands as it is) and **needs a define session** (the question
  is too open to implement around).

**A ruling is written into the plan**, *as written* included. Before
the first, **read the write-plan skill's § Task Structure now**, unless
already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/write-plan/SKILL.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/write-plan/cases.md` (§ Task Structure in
each), for the amendment marker's grammar and the amendment's
footprint recipe. A ruling on an open question is a decision added, so
it lands as an amendment marker on its own line directly beneath the
marker it answers, `> **Amended (user, <YYYY-MM-DD>):**` with the
decision's final statement. That is the resolved-marker recognizer
downstream: a marker is resolved where an amendment marker follows it
at the same site (the review skill, § Input, item 3). *Defer to
review* therefore writes nothing: leaving the marker unresolved is
exactly what puts it in front of review. Then sweep the decision's
footprint by write-plan's recipe. The sweep is this session's, because
the workflow's amendment-ripple lens has already finished and never
sees this marker. On an *as written* ruling the final statement is
what the plan already says, so no site can carry a pre-amendment form
and the sweep is one pass rather than a rewrite; it still runs. Where
the ruling changes a decision of the topic's `spec.md`, **read the
define skill's § The Spec now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/define/SKILL.md`, for the spec's dated
amendment line, and land it under that decision in this session, for
the reason write-plan's recipe gives. A ruling that keeps the plan's
departure from an inherited decision is an override, homed in this
topic's own record (the operations contract, § Inherited records); one
landing in `spec.md` takes the define read above as a changed decision
does. Where the changed decision is an entry of § Decisions or § Out of
scope, annotate each still-`doing` child the topic's `relations.md` lists in this session too, before the
relay's commit (the operations contract, § Inherited records).

**A *needs a define session* ruling closes the phase at define
instead.** Before writing it, **read the review skill's § Iterate —
the re-entry close and § The Close, and the process contract's § The
traceability stores, now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/review/SKILL.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the iteration marker's
one home and its grammar, the `Unreviewed:` line's rule, and where a
close's commit refs are recorded. A product or domain question's home
is `spec.md`, so the route derives to define (the process contract,
§ Iteration), and the durable record is the iteration marker in the
topic folder's `review.md`, with its `Unreviewed:` line (`cases.md`
§ The Relay).

Either outcome, a ruling written into `plan.md`, a marked `review.md`,
or both, commits in the state folder as a follow-up (`mechanics.md`
§ The Relay). The `Hardened —` line § The Hardened Line wrote still
stands, so the hardened read stays green; on the define route the stop
is the iteration marker, which implement's readiness gate reads before
the hardened read.

**Default: every marker stands with the rewrite author's choice —
review post-hoc at the review skill's § Input, item 3** (the process
contract, § Defaults and holds). The question instrument unavailable
and the call refused at the permission layer are distinct cases of the
fallback rule, read at § Input; a close the ask never reached reports
it as not run and takes this default.

## Next Phase

**Capture block first:** invoke the `ymer:capture` skill, source
`plan_review`; the battery, the drop grammar and the write live in that
skill alone.

Then stop after the relay, and name the next phase, in a fresh session:
**implement**, or **define** where the relay's ask returned *needs a
define session* and the iteration marker names it. The user reviews the
rewritten plan post-hoc at the surface the relay handed over, and later
input lands as follow-up commits. Implementation never starts in this
session: it comes later, in its own session, from a clean tree and the
hardened plan. This skill hardens the plan; the diff gets its own
adversarial pass at review, the phase after implement, through this
plugin's code-review skill (the review skill, § The lens pass).

## Remember

- The workflow stops for nothing and changes no git state: the user's
  leverage is before launch and after.
- Every fact is read off what a step changes, by its rule (the process
  contract, § Review effort).
- The plan, not the summary, is the durable record of the rewrite
  author's decisions and open questions.
- The run's record, then `Hardened —` as the last write.
- One question per surviving marker, never in the relay's turn.
