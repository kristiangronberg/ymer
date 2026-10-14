# Plan Review: mechanics

The mechanics of the plan-review skill: the Claude Code way of doing its
steps. The headings are `SKILL.md`'s own; read a section's entries at
the moment that section runs.

## Contents

- Input: the iteration's delta where git tracks the state folder
- Facts and Tier: why the orchestration floor sits at three
- The Run: the Workflow launch and its permission gate, the `args`, the dispatches the lightweight pass and the Agent tool hand over, recovery and resume
- The Hardened Line: the state-folder commit
- The Relay: the tree assertion, the recovery grep, the review surface, the follow-up commit

## Input

On an iteration where git tracks the state folder, the delta is the
diff of the iteration's own write-plan commit against its parent. Find
the commit in the topic folder's history, then take the diff over the
plan and its payloads:

```
git -C <state folder> log --oneline -- <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> diff <commit>^ <commit> -- <repo>/YYYY/MM-DD-<topic>/plan.md <repo>/YYYY/MM-DD-<topic>/payloads/
```

Every path the run passes on is absolute: the spine's paths come
resolved as the skill loads, and the agents that read
`verifierCommand` and `promptDir` receive them as plain text.

## Facts and Tier

**Why three.** The workflow pays a fixed cost that no roster size reduces: the
orchestration, the journal, the retry ladder, and one rewrite author on
Opus that runs whenever anything is confirmed, while every lens and
verifier runs on Sonnet. The variable cost is the surviving lenses and
their verifiers. Below four surviving Sonnet lenses, the Opus rewrite author
and the orchestration are most of what the run spends, and what the
workflow buys over a single reviewer, independent mandates, buys less
than it costs: three narrow mandates handed to one fresh-context
reviewer are not the broad mandate that stalls (`cases.md` § The Run).
Three is a calibration of that principle, revised on captured
evidence.

## The Run

**The launch.** Call the `Workflow` tool with `scriptPath` set to the
script's absolute path, as `SKILL.md` § The Run names it resolved. The tool loads only a file the session could already
`Read` without asking: the working directory, an added directory, the
session scratchpad, or a path a `Read(...)` allow rule covers, and a
plugin tree is none of those by default. Refused with "scriptPath must
be a script path this tool returned, or a file you can already read"?
Reading the file first changes nothing, since the gate is the
permission decision, not a prior read. Copy the plugin tree whole into
the session scratchpad, replacing any copy an earlier launch left
(`rm -rf <scratchpad>/plugin && cp -R <plugin root> <scratchpad>/plugin`:
a `cp -R` onto a directory that exists nests the new copy inside the
old one, and the launch would run the old files), launch from the
copy's `skills/plan-review/plan-review.workflow.js`, and pass the
copy's `skills/plan-review` directory as `promptDir`: the prompt files
and the homes they read travel with the script, so whatever makes the
launch work makes them readable. The lasting fix is
to make the plugin tree an added directory for every session: list it
under `permissions.additionalDirectories` in the user settings. A
`Read` allow rule over the tree reaches the same gate, but a read block
outranks a rule and never an added directory the user settings
declare; one a project's settings add stays outside the block's fence
and is blocked exactly as a rule's paths are.

**The `args`**, as an object:

```json
{
  "planPath": "<abs path>",
  "specPath": "<abs path or omit>",
  "focus": "<one line, or omit>",
  "verifierCommand": "sh <plugin root>/scripts/payload-verify --exempt <tree>",
  "promptDir": "<plugin root>/skills/plan-review",
  "facts": {
    "hasCode": true,
    "touchesConcurrency": false,
    "touchesTrustBoundary": true,
    "touchesPersistence": false,
    "relocatesContent": false,
    "recordsAmendment": false,
    "companionSkill": "<the coding-standards skill the plan header names, or null>",
    "glossaryPath": "docs/glossary.md"
  },
  "decisionDigest": "<the copied spec.md sections, or omit when there is no spec>"
}
```

`args` may still reach the script as a JSON-encoded string, which the
script's prologue parses; compose `focus` on one line so that it parses
either way (`cases.md` § The Run). On a launch that fails before
anything spawns with "received args as an unparseable string", launch
again with `focus` shortened and the digest untouched.

The `facts` values above are an example, not a default: derive each
from the plan by the table in `SKILL.md` § Facts and Tier, and pass all
eight keys on every call. The script has no filesystem access, so what
it is not passed it cannot know, and it does not guess: it checks that
every fact but `glossaryPath` is present and correctly typed, and
throws before spawning anything when one is not. An omitted
`glossaryPath` falls back to the project's `docs/glossary.md`, which is
wrong on a meta topic: pass it there. Any other omitted key would
otherwise read as `false` and drop its lens exactly as a genuinely
false precondition does, leaving the two indistinguishable in the report. The throw costs
no tokens, since nothing has spawned yet: fix the call and invoke it
again. A missing `planPath`, `verifierCommand` or `promptDir` throws the
same way. The dropped-lens report is still the postcondition to read
before trusting the run; with the omission case removed, every line in
it means what it says.

**The dispatch.** Every agent, in every tier, gets the same shape: the
prompt files to Read, which carry its whole instruction, then the run
data appended after them, never interpolated into the prompt text. The
script composes it for the workflow; where the host spawns the agents
itself, it composes the same text:

```
Read each file below in full, then follow it: together they are your whole instruction, and the run data after them is what this run gives you.
- <promptDir>/<file>
- …

If any of these files will not Read, do nothing else: return promptUnreadable set to the path that failed, with every other required field at its empty value (findings an empty list; real false and reasoning empty; the summary's three lists empty), and never leave promptUnreadable out, because work done without your instructions would read as a clean pass.

RUN DATA
Plan: <planPath>
Spec: <specPath, or: none>
Payloads: the payloads/ directory beside the plan; gates in payloads/manifest
Plugin root: <promptDir without its trailing /skills/plan-review>
Companion skill: <facts.companionSkill, or none>
Glossary: <facts.glossaryPath, or the project's docs/glossary.md unless its CLAUDE.md says otherwise>
Focus: <focus, or none>
<the agent's own lines>
<the SETTLED block with the digest, where there is one>
```

The workflow's rewrite author gets no `Spec:` line, no `Glossary:` line
and no SETTLED block: it applies findings a verifier already confirmed,
and its prompt names the lines it gets. Every other dispatch, the
lightweight pass's included, carries all of them.

The files and the agent's own lines, by role:

- **A lens reviewer**: `reviewer.md` and `lenses/<key>.md`; no lines of
  its own.
- **A verifier**: `verifier.md`, with the claim as a `CLAIM` block of
  the finding's title, severity, location, problem, why and fix.
- **The rewrite author**: `rewrite-author.md`, with
  `Verifier command: <verifierCommand>` and the confirmed findings as
  JSON under `CONFIRMED FINDINGS (JSON):`, and without the spec, the
  glossary and the digest.
- **The lightweight pass**: `reviewer.md`, each surviving lens's file
  and `rewrite-author.md`, with the verifier command and no findings:
  the reviewer file beside it marks the lightweight pass.

**Through the Agent tool.** Where the fallback runs the workflow's
shape with the Agent tool, spawn what the script would: one subagent
per surviving lens, then one verifier subagent per finding of that
lens, then, where a verifier confirmed any finding, one rewrite author
subagent over the confirmed findings, each carrying its verifier's
`refinedFix` as its fix where it returned one, with duplicates at one
location and title merged. Where none is confirmed, spawn no rewrite
author: the script returns there with the plan unchanged. Keep the script's
models where the tool takes one, Sonnet for the lenses and verifiers
and Opus for the rewrite author. A subagent that returns
`promptUnreadable` after its one respawn from the copy (`SKILL.md`
§ The Run), or returns nothing, counts as the script counts it: a lens
not reviewed, a finding not verified, a rewrite that never ran.

**Recovery.** Prefer `Workflow({scriptPath, resumeFromRunId})` for a
run that died mid-flight. It is valid only while the plan file is
unchanged since that run and the agent options are untouched: with an
edited plan or retuned options, run fresh, or harvest. The prompt
files under `promptDir` are run inputs too, though the dispatch names
only their paths: a resume replays the cached result of every call
whose text is unchanged, and neither an edit to a prompt file nor a
fix to the access that failed changes a call's text. After either, or
after any `promptUnreadable` result, run fresh. Where resume is not
possible, harvest the completed agents from the run's `journal.jsonl`
(its `{"type":"result",…}` lines, deduplicated by `.key`, since a
resume records cached results again) and apply the findings by hand,
vetting each against verified facts before editing.
On a session-limit kill, stop the workflow at once with TaskStop:
running agents keep spending, and resume works in the same session
only.

## The Hardened Line

Where git tracks the state folder, commit the topic folder at the
phase close, staged and committed by explicit path, then read its
status scoped to the topic's paths:

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "YYYY-MM-DD-<topic>: plan-review" -- <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> status --short -- <repo>/YYYY/MM-DD-<topic>/
```

The status prints nothing for the topic's paths. Dirty paths outside
them are another session's, and stay as they are.

## The Relay

**The tree assertion**, on a code-repo topic:

```
git -C <checkout> status --short
```

**The recovery grep**, over the rewritten plan:

```
grep -n -e 'Design decision:' -e 'Needs confirmation:' <plan.md>
```

Its `Design decision:` term proves the matcher prints where the
`Needs confirmation:` side comes back empty.

**The review surface.** Where git tracks the state folder, both refs
come from the topic folder's history, and the diff covers the whole
topic folder:

```
git -C <state folder> log --oneline -- <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> diff <write-plan-sha> <plan-review-sha> -- <repo>/YYYY/MM-DD-<topic>/
```

Where the files are the record, the surface is the `pre-image/` slot
against the rewritten plan and payloads:

```
diff -ru <topic folder>/pre-image/plan.md <topic folder>/plan.md
diff -ru <topic folder>/pre-image/payloads <topic folder>/payloads
```

**The follow-up commit**, for a ruling written into `plan.md`, a marked
`review.md`, or both, where git tracks the state folder: the same
explicit-path commit as the phase close, with the message
`<topic ID>: plan-review`, and the same scoped status after it. Later
input from the user lands the same way.
