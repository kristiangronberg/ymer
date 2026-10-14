# Plan Review: cases

The cases of the plan-review skill: the precision earned from runs that
went wrong once. The headings are `SKILL.md`'s own; read a section's
entries at the moment that section runs.

## Contents

- Facts and Tier: the edge rules of the facts table, the runs that taught them, and the digest's extraction rule
- The Run: the stamped list of pre-verified facts, the failure modes of real runs, and how `args` arrives
- The Relay: reading the recovery grep, building a marker's question, and the define branch's `review.md`

## Facts and Tier

**Where each fact looks.** Only `hasCode` is anchored to the
`## File Structure` section, because the spec that set the table
anchors it there, and only `recordsAmendment` is confined to `plan.md`,
for the reason its row gives. Every other fact reads the whole subject,
steps, paths and payloads, and a fact whose rule names the
`## File Structure` also reads the steps where its rule says so: a
schema change described in a step, or a migration whose file name is
not known yet, still makes `touchesPersistence` true.

**What a step changes, not what it names.** Each of these fired a fact
on a surface token, and each cost a lens run, often a large one, for a
minor finding or none:

- `hasCode` read true off a file extension in a `## File Structure`
  row, where the change to that file was a doc comment or a prose
  string. A change confined to a file's comments, doc text or stored
  prose is prose.
- A fact read true under doubt because files were named for what they
  hold (a module named for a schema it validates input against, say)
  while the plan changed no data-at-rest schema. "Schema" in
  `touchesPersistence` means a schema of data at rest.
- `relocatesContent` keyed on the word for a file operation in a step,
  where the plan created a scratch file and removed it again. A file
  the plan creates and removes itself is no relocation.
- `relocatesContent` stayed false over a whole-file rewrite that lost
  three operative clauses, because every trigger named a move or a
  delete. A step that replaces a content-bearing file's body, or a whole
  section of it, can lose a content unit just as a move can.

Doubt still reads true where the plan is genuinely ambiguous about
what a step changes. These rules narrow what a fact reads; they never
let a session judge whether a lens would find anything.

**On an iteration the facts read the delta.** A re-plan's ticked,
carried steps are shipped history: facts read off them drew eight to
ten lenses over work already reviewed, while the tier was already keyed
over the delta. The carried steps stay in front of the lenses as
context, and no fact reads them.

**The digest's extraction rule.** Each section runs from its `## `
heading to the next line-start `## ` heading that stands outside a
fenced block, or to the file's end, heading included, and all of it is
copied. The heading match is a prefix, so a suffixed
`## Out of scope (YAGNI)` or `## Decisions — settled in this session's
interview` is that section, suffix and all, and it is plural: every
heading matching the prefix is such a section, so a spec carrying two
is copied twice, in document order. There are no per-entry lines and
no selection. An amendment marker rides along under the decision it
amends, because a marker states what changed and presupposes the entry
it sits under: picking either text alone drops the half the other
needs.

## The Run

**Only stamped facts ride the pre-verified list.** Each names its
command with the observed result, and an absence its `control:`. An
unstamped "pre-verified" fact is not pre-verified, and stays off the
list: a lens told not to re-flag it would trust a claim nothing
measured.

**Failure modes, from real runs (2026-06 and 2026-07):**

- **A broad-mandate lens stalls at high effort** ("Stream idle
  timeout"). The binding constraint is the mandate's breadth at a given
  effort, not effort alone: a narrow mandate with the whole plan in
  context completes at high effort. That is why correctness is three
  lenses.
- **A dead lens is indistinguishable from "no findings".** A stalled or
  killed review agent returns null and would flow in as an all-clear.
  Before trusting a clean result, run the check the spine's § The Run
  states: a lens in `skippedLenses` did not run, whether it failed at
  both efforts, was stopped by the circuit breaker or could not Read
  its prompt, and a lens in `droppedLenses` never ran at all. After
  fixing a prompt that would not Read, run fresh, never resume: a
  resume replays the cached unreadable results (`mechanics.md` § The
  Run, recovery).

**How `args` arrives.** Runs have shown `args` reach the script as a
string, not only as the object it was passed as, and the script's
prologue parses a string. A focus or digest carrying raw newlines broke
that parse at any size, one passed as an object literal arrived as a
string, and shortening `focus` let the same launch go through; digests
of 25 KB and 35 KB went through whole once composed again. `inferred:`
the harness serializes `args` on some path, so a value that survives a
JSON round trip launches and one that does not fails before anything
spawns.

## The Relay

**The grep's hits are read, not counted.** A plan that discusses the
marker in prose, and the null form `> **Needs confirmation:** none.`,
both match, and neither is a marker.

**A marker's question.** The question instrument caps a question at
four options and always offers *Other*, so the order `SKILL.md` § The
Relay sets fills three slots and leaves one free, the middle one, for
the best alternative the marker or its neighbouring `> Design decision:`
note names. A marker naming no alternative asks the three. A marker
naming several puts the rest in the question's text, where *Other*
reaches them.

**The define branch's `review.md`.** The marker goes into `review.md`
in the topic folder as the review skill's § Iterate — the re-entry close
says (read at § The Relay), with this branch's block:

```markdown
# <topic> — review

Iteration — <YYYY-MM-DD> → define: <the question the marker asks>
Unreviewed: none
```

The `Unreviewed:` line follows the review skill's § The Close, read at
§ The Relay. This phase's own steps commit only in the state folder, so
`none` is the ordinary case; but the machinery-edit duty is the
session's, not the phase's, so a session that did commit machinery
refs, in one machinery tree or several, rides them here, marked per
tree, rather than dropping them.
