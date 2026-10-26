---
name: scout
description: Maps what a topic touches before its meaning is decided: the files involved, what things are called, what is missing, and where reality contradicts the chosen direction, written up as a survey for the next phase. Use as the development process's second phase, or on its own to orient in a large or unfamiliar area.
---

# Scout

Scout surveys the codebase for everything a topic touches and records
**what is**, before define decides what things *mean* and write-plan
decides what to *build*. The output is the topic's **survey map**,
`survey.md`: facts with file references, at module and file altitude,
and above all the places where reality contradicts the direction doc.

This file is scout's spine: its intent and its moments in order. Its
**mechanics** (the Claude Code way: git, the state folder, the
harness's tools) are in `mechanics.md`, and its **cases** (the earned
precision: edge cases, exceptions and rulings) are in `cases.md`, both
under this file's headings. A section with entries there says so in its
first line, and those entries are read when the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics) and `cases.md` § Overview (the cases).*

**Read the plugin glossary's entries for scout's vocabulary now**,
unless already read this session: `${CLAUDE_PLUGIN_ROOT}/glossary.md`,
each entry by its heading: *topic resolution*, *arrival*, *drawn
topic*, *split child*, *direction doc*, *pending interview*,
*iteration*, *sweep artifact*, *machinery tree*, *parent topic*,
*inherited records*. This file uses those terms and never defines them.

**Announce at start:** "I'm using the scout skill to survey the
codebase for this topic." Repo-specific preferences in a repo's
`CLAUDE.md` override the defaults below.

This phase is search, not dialogue: the interview belongs to define.
It asks at most one scope-confirming question up front, then runs on its
own to a single user review gate on the finished map.

## Input

*Read with this section: `mechanics.md` § Input (the mechanics) and `cases.md` § Input (the cases).*

**Read the process contract's § Defaults and holds now, and the
operations contract whole**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`. They hold the
pre-flight, close binding, gate defaults and holds, the fallback rule
and the report rule; and the roadmap operation this phase calls (*look
up topic*) with its postcondition and the failure rule, the topic's
artifacts (the `request.md` template, the `sketch.md` reader contract,
how the state folder's kind is read and what a state folder in no git
repository skips), split topics, and the topic ID's folder. Where
`review.md` tops with an `Iteration —` marker, **read the process
contract's § Iteration now** as well, unless already read this session,
for the marker's block, its `Consumed —` lines, and whether the route is
live or consumed. This section carries only scout's own reads beside
them.

**The pre-flight runs first.** A pending brainstorm reset is re-reported
with its commands and stops the survey: sketch-contaminated state is not
surveyed.

**Topic resolution runs next**: the task's status (*look up topic*,
binding: the operations contract); the topic folder, present or not, and
whether it holds `request*.md`; and, where the folder exists,
`review.md`'s first recognizer top-down (the review skill,
§ Recognizers) and
whether `brainstorm.md` or `spec.md` carries the `Interview pending —`
marker at its head (the interview procedure, § 4. Pending). The arrival
they land on decides the opening, in brainstorm's order:

- **Drawn topic**: intake nobody has brainstormed. Stop and name
  **brainstorm** ("External requests never skip phases": the process
  contract, § Where to enter).
- **Split child**, a `doing` task with no folder: create the folder
  under today's date and write `request.md` through the operations
  contract's template with `started:` today (the operations contract,
  § The topic's artifacts), since the task already is the topic, and
  its `relations.md` with the `Parent:` line by the same section's
  rule. Bind the parent topic in the map's first paragraph, its
  inherited records read beside the brief (the operations contract,
  § Inherited records), and survey.
- **Iteration**, a live marker on top of `review.md`: it names the phase
  the topic re-enters at, and no route names scout. Stop and name that
  phase, unless that phase invoked scout in this session: define's
  fused call proceeds (→ `cases.md` § Input).
- **Another phase's marker, or a pending interview**: the
  `Interview pending —` marker at the head of `brainstorm.md` or
  `spec.md` names its artifact's phase the same way. Stop and name it,
  the command written out.
- **In flight**, a matching topic folder the rows above do not name,
  with a `doing` task or with none: reuse the folder and survey as
  usual. Where `review.md` tops with a consumed marker, the close
  appends `Consumed — <YYYY-MM-DD> by scout` to the marker's block.
- **Closed topic**, or a task that is not in flight (open, completed or
  cancelled): it is not this topic. Stop and name brainstorm, as for a
  drawn topic.

## The Survey

*Read with this section: `mechanics.md` § The Survey (the mechanics) and `cases.md` § The Survey (the cases).*

The survey gathers the facts the map reports, sized to the topic:

- **Small or familiar area:** search directly yourself (glob, grep,
  read), with no fan-out.
- **Otherwise:** fan out 2–4 parallel agents, one lens each. A lens
  runs as a read-only **Explore** agent by default. A lens whose sheet
  may exceed the agent-result cap runs as a **general-purpose** agent
  instead, writes its sheet to the topic folder, and returns a pointer:
  an Explore agent has no tool to write it. Compose every agent's input
  from the same five slots, so neither the do-not-re-derive clause nor
  confinement can be dropped by ad-hoc prompt authoring: (1) that lens's
  concrete search vectors; (2) the path to the brief, `brainstorm.md`;
  (3) the brief's **Verified state** items, quoted inline or pointed at
  by heading, or, where the brief carries none (the section is
  optional), the statement that it has none; (4) the instruction to cite
  those items rather than re-measure them; (5) the confinement
  contract's path, as the read line below resolves it, with a scratch
  root of the agent's own and the instruction to read the contract whole
  before its first command. Take the host's inventory around the fan-out
  (the confinement contract, § The host's inventory). The four lenses:
  1. **Code**: modules and files implementing or adjacent to the topic;
     entry points; the data structures involved.
  2. **Vocabulary**: what the codebase calls these concepts today
     (module, function and field names); where each term is defined;
     the project glossary if one exists; overloads and near-synonyms.
  3. **Docs & history**: docs, roadmap entries, completion records,
     READMEs and module docs touching the topic; the closest prior
     implementation of something similar and the pattern it
     established.
  4. **Constraints & conventions**: libraries in use, established
     patterns in this area (error-return style, test layout, boundaries
     the code respects).

**Before the first probe or the fan-out, read the confinement contract
whole now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/confinement-contract.md`, for what this session
and the agents it dispatches may touch on the user's machine: the
principle, the scratch root each dispatch gets, the cases (processes,
ports, live targets, sibling trees, secrets, residue), the host's
inventory around a dispatch, and the layers beneath it.

## The Survey Map

*Read with this section: `cases.md` § The Survey Map (the cases).*

**Read the sweep skill's § Claims now, before the map is written**,
unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md`, § Claims: stamps,
controls and the sweep artifact, for stamps, controls, the `inferred:`
register and the committed sweep artifact a family count comes from.
Every claim the map makes carries a file reference, and every measured
claim (any count or verified absence) follows that section. The map's
sections:

- **Topic & brief**: one paragraph, linking `brainstorm.md` or quoting
  the user's statement, and stamping the rev the map was taken at,
  `<repo> @ <sha>` (`git -C <checkout> rev-parse --short HEAD`), so
  write-plan's grounding can diff it against its own HEAD and re-measure
  what moved.
- **Relevant files & modules**: a path plus a one-line role. Only what
  relates; a dump is not a map.
- **Existing concepts & vocabulary**: terms in use and where they are
  defined; flag overloads and near-synonyms for define to resolve, and
  do not resolve them here. Each glossary entry the section quotes
  carries that entry's `_Avoid_` line, or the section says in one line
  that it carries none: a blessed-terms list must never read downstream
  as a ban check.
- **Prior similar implementations**: the closest existing features and
  the pattern they establish.
- **Related docs & roadmap entries.**
- **Constraints & conventions**: libraries, established patterns, where
  this area's tests live.
- **Absences**: what does not exist that the brief assumes or the work
  would create, verified by searching and never inferred, each one
  stamped with its matcher and observed zero and a `control:` clause.
- **Conflicts with the direction doc**: where reality contradicts the
  brief's assumptions. These are the map's most valuable findings. If
  one undermines the chosen direction, say so plainly: sending the topic
  back to brainstorm is a valid scout outcome.
- **Open questions for define**: brief questions the codebase answered,
  each with its answer and evidence, and new questions the survey
  uncovered.

What the map never contains: design proposals, meaning decisions, plan
tasks, line-level anchors.

## Self-Review (inline)

Calibration: only flag what would send define or planning in the wrong
direction.

1. Every brief question the codebase could answer: answered, or
   explicitly marked as not answerable from code?
2. Any claim without a file reference?
3. Absences actually searched for, not assumed, each stamped with its
   matcher and observed zero and its `control:` naming a non-zero
   through the same matcher, as the sweep skill's § Claims says?
4. Conflicts stated plainly rather than buried?

Fix issues inline and move on: no re-review loop.

## User Review Gate

*Read with this section: `mechanics.md` § User Review Gate (the mechanics).*

> "Survey map written to `<path>`. Please review: anything mis-scoped or missing?"

Iterate on any input that arrives. **Default: proceed to the phase
close — review post-hoc at the phase commit
(`git -C <state folder> show <sha>`), or at `survey.md` itself where the
files are the record** (the process contract, § Defaults and holds).

The close then commits what this phase wrote. **Read the substrate
contract whole now, and the process contract's § Topic kinds**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/substrate-contract.md`
and `${CLAUDE_PLUGIN_ROOT}/process-contract.md`. They hold the network
boundary, commit ownership, git is never guessed, what crosses a close,
the two tree options, staging by explicit path, concurrent edits on a
shared tree, committing by hunk and the two commit registers; and the
two topic kinds with the duty to commit machinery edits. The substrate
contract's head says where git is in reach; a session that meets none of
its cases reads nothing there.

**No project-repo writes:** this phase reads the project repo only, and
the state folder is committed by the phase at its close.

## Next Phase

*Read with this section: `cases.md` § Next Phase (the cases).*

- **Capture block, on both paths:** invoke the `ymer:capture` skill,
  source `scout`; the battery, the drop grammar and the write live in
  that skill alone. It runs at scout's close even when define continues
  in-session: each phase tail captures its own.
- **Standalone session:** after the capture block, stop and name the
  next phase, **define**, for a fresh session (the process contract,
  § The map). Never invoke the next skill here.

## Remember

- Facts with file references: what is, never what should be.
- Module and file altitude: anchors and signatures belong to grounding,
  meaning to define; over a prose corpus the section is the unit.
- Absences are findings; conflicts with the direction doc are the best
  findings.
- Search, don't interview: one scope question at most, one review gate.
- No project-repo writes: the survey only reads, and the phase commits
  the state folder at its close.
