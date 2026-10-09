---
name: scout
description: Use to survey the codebase for everything related to a topic, producing the survey map (survey.md) — phase 2 of the development process.
---

# Scouting

This file is the scout skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics) and `cases.md` § Overview (the cases).*

Survey the codebase for everything related to a topic and record **what IS** — before the define phase decides what things *mean* and write-plan decides what to *build*. The output is the **survey map**: facts with file references, at module/file altitude.

**Announce at start:** "I'm using the scout skill to survey the codebase for this topic."

- (Repo-specific preferences in CLAUDE.md override these defaults)

This phase is search, not dialogue — the interview belongs to define. Run mostly autonomously: at most one scope-confirming question up front, then a single user review gate on the finished map.

## Input

*Read with this section: `mechanics.md` § Input (the mechanics) and `cases.md` § Input (the cases).*

Pre-flight first (*Defaults and holds*: development-process): derive the
predecessor's close state and any pending steps; a pending brainstorm
reset is re-reported with its commands and stops the survey —
sketch-contaminated state is not surveyed.

**Topic resolution** runs next (term: the plugin glossary): the task's
status (*look up topic*, binding: the operations contract), the topic folder —
present or not, and whether it holds `request*.md` — and, where the
folder exists, `review.md`'s first recognizer top-down (review
§ Recognizers) and whether `brainstorm.md` or `spec.md` carries the
`Interview pending —` marker at its head (development-process
§ Artifacts). The arrival those three coordinates land on decides the
opening. A **drawn topic** — a `doing` task whose folder holds nothing
but its `request.md` — is intake nobody has brainstormed: stop and name
**brainstorm** ("External requests never skip phases":
development-process § Process ground rules). A task that is not in
flight — open, or a **closed topic**, its task completed or cancelled —
is not this topic: stop and name brainstorm the same way. A `doing` task
with **no folder** is a **split child**: create the folder under today's
date, write `request.md` through the operations contract's template
(§ The topic's artifacts) with `started:` today — the task already is
the topic — and bind the parent's **direction doc**, which
the task's description names, in the map's first paragraph. A marker on
top of `review.md` that review § Input item 2's read finds **live**
names the phase the topic re-enters at, and no route names scout: stop
and name that phase. The `Interview pending —` marker at the head of
`brainstorm.md` or `spec.md` names its artifact's phase the same way —
stop and name it, the command written out. Anything else is a topic
**in flight** — reuse the
folder and survey as usual; where `review.md` tops with a consumed
marker, the close appends `Consumed — <YYYY-MM-DD> by scout` to the
marker's block as its last write before the phase's commit (review
§ Input item 2).

## The Survey

*Read with this section: `mechanics.md` § The Survey (the mechanics) and `cases.md` § The Survey (the cases).*

Scale the effort to the topic:

- **Small or familiar area:** search directly yourself (glob, grep, read) — no fan-out.
- **Otherwise:** fan out 2–4 parallel **read-only Explore agents**, one lens each. Compose every agent's input from the same four slots, so the do-not-re-derive clause cannot be dropped by ad-hoc prompt authoring: (1) that lens's concrete search vectors; (2) the path to the brief, `brainstorm.md`; (3) the brief's **Verified state** items, quoted inline or pointed at by heading — or, where the brief carries none (the section is optional), the statement that it has none; (4) the instruction to cite those items rather than re-measure them. The four lenses:
  1. **Code** — modules/files implementing or adjacent to the topic; entry points; the data structures involved.
  2. **Vocabulary** — what the codebase currently calls these concepts: module, function, and field names; where each term is defined; the project glossary if one exists; overloads and near-synonyms.
  3. **Docs & history** — docs, roadmap entries, completion records, READMEs, module docs touching the topic; the closest prior implementation of something similar and the pattern it established.
  4. **Constraints & conventions** — libraries in use, established patterns in this area (error-return style, test layout, boundaries the code respects).

## The Survey Map (`survey.md`)

*Read with this section: `cases.md` § The Survey Map (`survey.md`) (the cases).*

Every claim carries a file reference; a measured claim — any count or verified absence the map reports — also carries its stamp, and family counts come from a committed sweep artifact (claims rules: the sweep skill's Claims section). Sections:

- **Topic & brief** — one paragraph, linking `brainstorm.md` or quoting the user's statement, and stamping the rev the map was taken at — `<repo> @ <sha>` (`git -C <checkout> rev-parse --short HEAD`) — so write-plan's grounding can diff it against its own HEAD and re-measure what moved.
- **Relevant files & modules** — path plus a one-line role. Only what relates; a dump is not a map.
- **Existing concepts & vocabulary** — terms in use and where they're defined; flag overloads and near-synonyms for define to resolve — do not resolve them here. Each glossary entry the section quotes carries that entry's `_Avoid_` line, or the section says in one line that it carries none: a blessed-terms list must never read downstream as a ban check.
- **Prior similar implementations** — the closest existing feature(s) and the pattern they establish.
- **Related docs & roadmap entries.**
- **Constraints & conventions** — libraries, established patterns, where this area's tests live.
- **Absences** — what does NOT exist that the brief assumes or the work would create. Verified by searching, never inferred — each absence stamped (matcher → observed zero) with a `control:` clause naming the proof the matcher prints.
- **Conflicts with the direction doc** — where reality contradicts the brief's assumptions. These are the map's most valuable findings; if one undermines the chosen direction, say so plainly — sending the topic back to brainstorm is a valid scout outcome.
- **Open questions for define** — brief questions the codebase answered (state the answer and its evidence) and new questions the survey uncovered.

What the map never contains: design proposals, meaning decisions, plan tasks, line-level anchors.

## Self-Review (inline)

Calibration: only flag what would send define or planning in the wrong direction.

1. Every brief question the codebase could answer — answered, or explicitly marked as not answerable from code?
2. Any claim without a file reference?
3. Absences actually searched for, not assumed — each stamped with its matcher and observed zero, its `control:` naming a non-zero through the same matcher?
4. Conflicts stated plainly rather than buried?

Fix issues inline and move on — no re-review loop.

## User Review Gate

*Read with this section: `mechanics.md` § User Review Gate (the mechanics).*

> "Survey map written to `<path>`. Please review — anything mis-scoped or missing?"

Iterate on any input that arrives. **Default: proceed to the phase
close — review post-hoc at the phase commit
(`git -C <state folder> show <sha>`)** (*Defaults and holds*:
development-process).

**No project-repo writes:** this phase reads the project repo only; the
state folder is committed by the phase at its close. **A probe leaves live
machine state as it found it** — Docker image tags, containers, published
ports, a kept install — and reports whatever it could not restore. Two
idioms make that cheap: run a smoke under its own `-p` project name and its
own port, and settle tag semantics with a throwaway tag rather than a
rebuild that moves a real one.

## Next Phase

*Read with this section: `cases.md` § Next Phase (the cases).*

- **Capture block — both paths:** invoke the `ymer:capture` skill —
  source `scout`; the battery, the drop grammar and the write live in
  that skill alone. Runs at scout's close even when define continues
  in-session: each phase tail captures its own.
- **Standalone session:** after the capture block, stop and name the next phase — **define** in a fresh session. Do not invoke the next skill: one phase per session, the map is the compaction boundary.

## Remember

- Facts with file references; what IS, never what SHOULD BE
- Module/file altitude — anchors and signatures belong to grounding, meaning belongs to define; over a prose corpus the section is the unit
- Absences are findings; conflicts with the direction doc are the best findings
- Search, don't interview — one scope question at most, one review gate
- No project-repo writes — survey only; the phase commits the state
  folder at its close
- A probe leaves live machine state as it found it — a smoke under its
  own `-p` project and port, a throwaway tag for tag semantics; report
  whatever it could not restore
