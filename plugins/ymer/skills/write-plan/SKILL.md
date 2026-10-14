---
name: write-plan
description: Turns a settled spec into an implementation plan someone can follow without judgement: facts checked against the code, small tasks with exact commands and their expected output, and every edit carried in a file of its own. Use once a topic's meaning is defined, or with a sharp spec in hand, before touching code.
---

# Writing Plans

Write-plan is the phase between the spec and the code. Define decided
what the topic *means*; write-plan decides how to build it, as a plan an
engineer can follow without judgement: the facts the plan rests on,
checked against the code; small tasks with exact commands and their
expected output; and every edit's content carried in a file of its own
beside the plan, so a later phase can prove it landed. Plan-review then
hardens the plan and implement runs it.

This file is write-plan's spine: its intent and its moments in order.
Its **mechanics** (the Claude Code way: git, the state folder, the
harness's tools) are in `mechanics.md`, and its **cases** (the earned
precision: edge cases, exceptions and rulings) are in `cases.md`, both
under this file's headings. A section with entries there says so in its
first line, and those entries are read when the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics).*

**Read the plugin glossary's entries for write-plan's vocabulary now**,
unless already read this session: `${CLAUDE_PLUGIN_ROOT}/glossary.md`,
each entry by its heading: *topic resolution*, *arrival*, *drawn
topic*, *split child*, *direction doc*, *iteration*, *pre-flight*,
*catch-up*, *meta topic*, *code-repo topic*, *machinery tree*, *inferred
claim*, *stamp*, *positive control*, *measured, never typed*, *vacuous
pass*, *delta gate*, *glossary delta*, *Forward direction*, *carve
topic*, *content-ownership map*, *assumptions block*,
*discriminates-when line*, *amendment marker*, *payload*, *payload
gate*, *payload verifier*, *gated step*, *step ID*, *plan complete*,
*frame bar*, *workflow-internal reference*, *state store*,
*pre-image*.
This file uses those terms and never defines them.

Write the plan for an engineer who has no context for the codebase and
questionable taste: a skilled developer who knows almost nothing about
the toolset or the problem domain, and not much about good test design.
Tell them everything they need: which files each task touches, the
code, the tests, the docs to check, and how to test it, as bite-sized
tasks. DRY. YAGNI. TDD.

The topic run goes in order: resolve the topic and read its arrival and
its material, check the scope, find the coding-standards companion,
gather the facts, map the files, write the header and the tasks with
their payloads, check the plan, save it, and hand it to plan-review.

**Announce at start:** "I'm using the write-plan skill to create the
implementation plan." Repo-specific preferences in a repo's `CLAUDE.md`
override this skill's defaults, the plan's location among them.

## Input

*Read with this section: `mechanics.md` § Input (the mechanics).*

Input reads the arrival and the material the plan builds on.

**Read the process contract's § Defaults and holds now, and the
operations contract whole**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`. They hold the
pre-flight, close binding, gate defaults and holds, the fallback rule
and the report rule; and every roadmap operation this phase calls
(*look up topic*, *mint task*) with its postcondition and the failure
rule, the topic's artifacts (the `request.md` template, how the state
folder's kind is read and what a state folder in no git repository
skips, the `pre-image/` slot), split topics, the status ladder and its
`Hardened —` line, and the topic ID's folder. This section carries
only write-plan's own reads beside them.

**The pool.** The same read holds the pool's two operations, *draw
drops* and *return drops* (the operations contract, § The pool): who
draws, which closes draw, the `Drawn:` and `Returned:` lines and where
they sit, the read and the read-back, the order at the close, a draw
that cannot run and how its report names it, the pre-flight's finish,
and how the front is read. The front comes from this one line, which the
harness fills in as it loads this skill:

> Front as configured: `${user_config.front}`

**The pre-flight's derivation of pending steps runs first**, as the
process contract's § Defaults and holds gives it: a pending reset stops
this phase, and a pending push does not. Its git steps on a code-repo
topic, the project-checkout pre-flight (`mechanics.md` § Input), run
after topic resolution, because the arrival decides which of them apply.

Where `review.md` tops with an `Iteration —` marker, **read the process
contract's § Iteration now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the marker's block,
its `Consumed —` lines, whether the route is live or consumed and which
phase it makes due, the plan's pre-image, and the one-artifact rule a
re-plan follows.

**Topic resolution runs next**: the task's status (*look up topic*,
binding: the operations contract); the topic folder, present or not, and
whether it holds `request*.md`; and, where the folder exists,
`review.md`'s first recognizer top-down (the review skill,
§ Recognizers) and whether `brainstorm.md` or `spec.md` carries the
`Interview pending —` marker at its head (the interview procedure,
§ 4. Pending). The arrival they land on decides the opening:

- **Drawn topic**, or a task that is not in flight (open), or a
  **closed topic** (its task completed or cancelled): not a topic this
  phase plans. Stop and name **brainstorm** ("External requests never
  skip phases": the process contract, § Where to enter).
- **Split child**, a `doing` task with no folder: create the folder
  under today's date and write `request.md` through the operations
  contract's template with `started:` today (the operations contract,
  § The topic's artifacts), since the task already is the topic. Bind
  the parent's direction doc, which the task's description names, in
  the plan header (§ Plan Document Header). A split child holds no
  `spec.md` and is owed none. On a code-repo topic its branch is born
  here, by the project-checkout pre-flight's own switch
  (`mechanics.md` § Input).
- **Iteration**, a live marker naming write-plan: the marker is this
  cycle's brief. Read `review.md` first, the finding and the entries
  below it; the cycle is a re-plan (→ Re-planning), and its close
  appends `Consumed — <YYYY-MM-DD> by write-plan` to the marker's block
  as its last write before the phase's commit.
- **A live marker naming another phase**: stop and name that phase.
- **An `Interview pending —` marker** at the head of `brainstorm.md` or
  `spec.md`: stop and name that artifact's phase, the command written
  out (`/ymer:brainstorm <topic>` or `/ymer:define <topic>`).
- **In flight**, anything else: reuse the folder and plan as usual.
  Where `review.md` tops with a consumed marker, the close appends its
  own `Consumed — <YYYY-MM-DD> by write-plan` line to the block the same
  way.

On a code-repo topic, **read the substrate contract whole and the
process contract's § Topic kinds and § The traceability stores now**,
unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. They hold the project
checkout's pre-flight steps and their outcomes, the branch workflow,
git is never guessed, staging by explicit path, the commit registers,
the topic kinds and the machinery-edit duty, and the list of refs the
topic's record names. Then run the project-checkout pre-flight
(`mechanics.md` § Input), the branch birth of a split child included.

Then the material, in this order. **Before the first read, read the
process contract's § Knowledge placement and the sweep skill's § Claims
now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md` (§ Claims: stamps,
controls and the sweep artifact). They hold where the project glossary
lives and the rule that every term has one home; and the claims
register: stamps, `as-of`, the `inferred:` marker and when a mark
stands, positive controls, the assumption a claim becomes when nothing
can check it.

1. **The spec.** Where the topic directory holds a `spec.md` from the
   define phase, it is the spec this plan implements: read it first,
   its decisions and their rationale, the domain rules and edge cases,
   the out-of-scope list, and its "open questions for write-plan",
   which the plan answers. A split child reads the parent's direction
   doc, which the task's description names, in its place: that is the
   brief the plan grounds in.
2. **The survey.** Where the topic directory holds a `survey.md` from
   the scout phase, read it next. It maps the relevant files, concepts,
   vocabulary and conventions, so grounding does not survey the codebase
   again: the map aims the fan-out, and § Grounding re-prices it.
3. **The project glossary**, where the project keeps one (its home:
   § Knowledge placement, just read). The plan's vocabulary, names in
   code blocks included, uses its canonical terms, never its `_Avoid_`
   synonyms, and never redefines a term: it points at the glossary.
   A genuinely new concept the spec did not name is define-phase work:
   flag it, never coin a term silently. The one exception is a term the
   spec's glossary delta records as deferred (`cases.md` § Grounding).
4. **The product's Forward direction**, where the topic shapes a
   surface a user operates. **Read the product-design skill's § The
   product page now**, unless already read this session:
   `${CLAUDE_PLUGIN_ROOT}/skills/product-design/SKILL.md`, for the
   page's fetch recipe, its miss rule and the rest of its contract. Read
   the Forward direction section alone: its entries constrain the shape
   a feature must take when it arrives, so they bind the decomposition,
   not only the spec. The whole-page read is brainstorm's, and no phase
   writes the page: content enters it only through a carve topic.

A plan never contradicts a spec decision silently. A decision that does
not survive planning goes back to the user. **Default: record the
contradiction in the plan header and stop, naming define — review
post-hoc at the plan header** (the process contract, § Defaults and
holds). A plan that contradicts a Forward-direction entry takes the
same default, naming the phase that owns the change, a carve topic. A
contradiction the user resolves in this session is no such stop: it is
a plan amendment, recorded and swept as § Task Structure's amendment
grammar says, with the spec's dated amendment line, and planning
proceeds.

## Scope Check

*Read with this section: `cases.md` § Scope Check (the cases).*

Scope Check asks whether this is one topic's plan, and whether all of
it is worth building.

A spec that covers several independent subsystems is several topics.
**Offer a split into topics** (the operations contract, § Split topics:
a mid-pipeline split, shed siblings), never separate plans: a topic has
one `plan.md`. On the user's yes, shed the split children (*mint task*,
binding: the operations contract, each read back, each sibling's task
naming the ids of the drawn drops it takes, which this save returns),
record the shed in the plan header, and plan the narrowed topic. Each
part should produce working, testable software on its own.

Before drafting a large plan, or when one balloons mid-draft, offer an
unprompted worth-it assessment. Ground it in real data (row counts,
growth, who benefits), separate the high-value slice from the
speculative one, and propose the split, with an implement-now or
draft-but-park recommendation. Settled design forks are not committed
scope: the user treats "should we build this at all, and how much of
it" as its own decision, and picks the trimmed option when the evidence
supports it. An honest "the marginal half costs X and starts paying
when Y" beats cheering for the whole item. **Default: author the slice
the recommendation names, the alternative and its cost recorded in the
plan header, and any split recorded there as a recommendation with no
split child minted — review post-hoc at the plan header** (the process
contract, § Defaults and holds).

## Language-specific companion skills

Before drafting, look for a coding-standards companion for the target
codebase's primary language, in two places the user can extend: the
skills this session lists, for one whose name or description says it
holds coding standards for that language; and the instruction files
that govern the codebase (the front's initial instructions, the repo's
`CLAUDE.md` files), for a sentence pointing at one. The companion
governs the coding and documentation tasks inside the plan (which
docstrings to write, which diagrams are required, where test narratives
live, guard contracts at trust boundaries); this skill still governs the
plan's shape, its task granularity and its hand-off.

The plan header states what the search found, in one line either way:

- **Found**: `Coding and documentation work in this plan must follow the <skill-name> skill.` Then:
  1. Read the companion skill before writing the plan.
  2. Make each artifact it requires an explicit task (docstring
     updates, a diagram impact checklist, a test documentation review,
     guard contracts on any new boundary function), never a final
     cleanup step.
  3. Complete any checklist it defines (diagram impact, say) and embed
     the result in the plan.
  4. Under the line, list in the header each artifact or checklist the
     companion requires, with the task that carries it or the embedded
     result (`Diagram impact: none — <why>`). The list is written from
     the companion's own text, so it is the evidence the companion was
     read, not only named.
- **None found**: `No coding-standards skill was found for <language>; looked in this session's skills and the instruction files that govern the codebase.` Proceed with this skill alone, and tell the user the same, so they can add a pointer where you looked.

Plan-review, implement and code-review read this header line rather
than searching again.

## Grounding

*Read with this section: `mechanics.md` § Grounding (the mechanics) and `cases.md` § Grounding (the cases).*

Grounding gathers the facts the plan depends on before any task is
written. Plans fail most often on facts that were assumed rather than
checked: whether a target file exists (Create or Modify), the real
anchor an insertion lands on, the existing test module's setup, aliases
and imports, and the actual signatures of the functions the plan will
call. Every claim the plan states, relies on or embeds traces to a
verified fact, or sits in the plan header's assumptions block
(`cases.md` § Grounding, the claim classes and measured, never typed).

**Re-price the survey first.** Its map is leads, not facts. `git diff
--stat <the survey's stamped rev>..HEAD` over the checkout names every
file the corpus moved in since the map was taken (the predecessor
phase's own commit and define's glossary commit among them), and every
claim whose corpus the diff names is measured again first. Then
re-verify the claims the plan relies on, since anchors and signatures
drift between sessions. Grounding gathers only the plan-mechanical
facts: only where no survey exists does it widen enough to find the
files it needs to verify. The marks the inherited artifacts carry are
resolved here too (`cases.md` § Grounding).

**Read the process contract's § Review effort now**, unless already
read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the
risk profile that sets how hard grounding probes, lens applicability,
and the orchestration floor a ladder owes. Write-plan's ladder is direct
verification, then the fan-out of `mechanics.md` § Grounding; the
fan-out's precondition and floor govern whether it runs.

**At the first gate the plan authors, or grounding's own first sweep,
read the sweep skill's § 1. Matcher through § 4. Survivors and its
§ Claims now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md`, for the matcher, the
corpus, the meaning-sweep mode, the survivors every gate needs to be
able to fail, and the control rules a gate's control runs by. Every
rename gate, verification grep and ripple sweep, grounding's own and
the plan's, is built by them.

## File Structure

*Read with this section: `cases.md` § File Structure (the cases).*

Before defining tasks, map the files the plan creates or modifies and
what each one is responsible for. This is where decomposition decisions
lock in. The map lands in `plan.md` as its `## File Structure` section:
each file, its action (Create, Modify, Delete or Move) and its
responsibility. Plan-review's facts read it there.

**Verify on disk before labelling Create or Modify; never infer it from
the path.** For every file the plan touches, check whether it already
exists. A path that exists is a Modify, not a Create, even when the
task is "add the tests for this feature": the test file usually exists
already. For a Modify:

- **Read it first**, then write the plan to *amend* the real content:
  slot new functions and cases into the existing module, reuse its
  setup, aliases and imports, and **extend** (never replace) its module
  doc or docstring.
- A fresh top-level definition (a new module, class or file preamble)
  for a file that already exists is a **plan failure**: it either
  clobbers existing coverage or fails to compile on a name collision.
- Show the change as an append or insert against a named anchor in the
  existing file ("after the existing `compact/1` describe block, before
  the final `end`"), never as a standalone file body.

**A content-ownership map is required wherever the plan relocates or
deletes content-bearing files.** It is total over the source: a source
unit with no row is a plan failure. Granularity follows content, not
files: a row that mixes survivors and dropped units (an "archived
working record" hiding an operative safety rule, say) splits until it
does not. Archiving to the state store counts as dropped from the
project's view, so an operative rule never leaves the project riding a
wholesale "archived" row.

- Design units with clear boundaries and well-defined interfaces, each
  file with one clear responsibility.
- You reason best about code you can hold in context at once, and your
  edits are more reliable when files are focused: prefer smaller,
  focused files over large ones that do too much.
- Files that change together live together. Split by responsibility,
  not by technical layer.
- In an existing codebase, follow its patterns. Where it uses large
  files, do not restructure on your own, but a split of a file the plan
  modifies that has grown unwieldy is a reasonable task.

This structure drives the task decomposition: each task produces a
self-contained change that makes sense on its own.

## Plan Document Header

Every plan starts with this header. Plan-review, implement and
code-review read some of its lines by their exact words: the companion
line, the `**Assumptions (unverified):**` block, and the absence of any
`Hardened —` line under the title. A bracketed line says when it is
present; leave out a line whose condition does not hold.

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** Implement this plan task-by-task in order; steps use checkbox (`- [ ]`) syntax — tick each box as its verification passes. For a plan whose tasks are independent, the Workflow feature can fan them out.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

[The companion line, one of its two forms (§ Language-specific companion skills)]

**Companion artifacts:** [where a companion was found: each artifact or checklist it requires, with the task that carries it or the embedded result]

**Direction doc:** [a split child only: the parent's direction doc, which the task's description names]

**Scope:** [where Scope Check offered a worth-it assessment or a split: the recommendation, the alternative and its cost, a split recommended or the split children shed]

**Contradiction:** [where a spec decision, a Forward-direction entry or a catch-up conflict does not survive: what contradicts what, and the phase it names]

**Assumptions (unverified):** [one bullet per genuinely uncheckable claim, with impact-if-false and the tasks affected — omit the line when none]

---
```

Then the plan's own sections: the answers to the spec's open questions,
the Grounding fact sheet, the `## File Structure`, and the tasks.

Where a planning decision drew a pool drop into the topic or cut one,
a `## Drops` section follows the tasks with the `Drawn:` and
`Returned:` lines, every earlier one carried verbatim (the operations
contract, § The pool).

## Task Structure

*Read with this section: `mechanics.md` § Task Structure (the mechanics) and `cases.md` § Task Structure (the cases).*

**Read the plugin glossary's entries for the plan's shapes now**,
unless already read this session: `${CLAUDE_PLUGIN_ROOT}/glossary.md`,
each entry by its heading: *step ID*, *payload*, *payload gate*,
*payload verifier*, *gated step*, *plan complete*, *amendment marker*,
*discriminates-when line*, *delta gate*, *pre-image*. A session that
loads this skill to edit an existing plan meets them here first.

Each step is one action of two to five minutes: write the failing test;
run it to see it fail; write the minimal code that makes it pass; run
the tests to see them pass.

````markdown
### Task 4: [Component Name]

**Files:**
- Create: `lib/my_app/exact/path.ex`
- Modify: `lib/my_app/exact/existing.ex:123-145`
- Test: `test/my_app/exact/path_test.exs`

- [ ] **T4S1: Write the failing test**

Payload: `payloads/t4s1.exs` — the new test case; insert after the existing `describe "get_thing/1"` block, before the module's final `end`.

- [ ] **T4S2: Run test to verify it fails**

Run: `mix test test/my_app/exact/path_test.exs`
Expected: FAIL with `UndefinedFunctionError` (function not yet implemented)

- [ ] **T4S3: Write minimal implementation**

Payload: `payloads/t4s3.ex` — insert after the existing `list_things/0` function.

- [ ] **T4S4: Run test to verify it passes**

Run: `mix test test/my_app/exact/path_test.exs`
Expected: PASS

- [ ] **T4S5: Verify all tests pass**

Run: `mix test`
Expected: All tests PASS

- [ ] **T4S6: Verify the payloads landed**

Run this step once the task's other boxes are ticked: after the task's commit, where the task commits in a checkout; where it writes no checkout file, once its last verification passes.

Run: `<the payload verifier> <state folder>/<repo>/YYYY/MM-DD-<topic>`
Expected: exit 0 — `payload-verify: N gate(s) — X PASS · Y PENDING · 0 FAIL`, with N, X and Y summed from `payloads/manifest` in plan order (this task's gates and every earlier task's PASS, every later task's PENDING) — never counted from the step list, since a step carrying suffixed payloads owns several gates
````

The template shows an Elixir codebase. For another language, keep the
exact step structure and swap in that language's test runner and
idioms.

Four step-grammar extensions ride in the plan text. The first three
carry measured, never typed (`cases.md` § Grounding); the fourth
records plan amendments.

**Observed red.** A failing-test step whose tested target exists today
records the failure observed at authoring, never a prediction:

```
Run: `mix test test/my_app/exact/path_test.exs`
Expected: FAIL — observed at authoring 2026-07-31: `** (MatchError) no match of right hand side value: {:error, :timeout}` (1 failure)
```

**Delta gate steps.** A step that edits countable text incrementally
brackets the edit with an adjacent before and after measurement, and
the delta is derived by running the matcher over the step's payload
file, the derivation riding the delta assertion (the shape and its
falsifiability: the sweep skill, § 4. Survivors: every gate must be
able to fail):

```
- [ ] **T2S1: Measure the before-count**

Run: `grep -c -F 'legacy_name' lib/my_app/thing.ex`
Expected: prints a count — record it as BEFORE (authoring measured 4 on 2026-07-31)

- [ ] **T2S2: Apply the edit**

Payload: `payloads/t2s2.ex` — replaces the `def legacy_name` clause block.

- [ ] **T2S3: Assert the delta**

Run: `grep -c -F 'legacy_name' lib/my_app/thing.ex`
Expected: BEFORE − 4 — delta derived by the matcher over the payload file (`grep -c -F 'legacy_name' payloads/t2s2.ex` → 0; the replaced block carried 4), never counted by eye
```

**Discriminates-when line.** Where a verification step's check
discriminates only under a condition (`cases.md` § Grounding), the step
carries the line, always with its skip rule:

```
Run: `curl -fsS <the intranet health endpoint>`
Expected: `{"status":"ok"}`
Discriminates only when: on the corporate network (off it, the host serves its public chain and this check greens vacuously).
Skip rule: condition unmet → NOT a pass; record the step as deferred.
```

**Amendment marker.** A plan amendment is a decision added, widened or
changed after any plan text exists, a user ruling mid-session included,
and narrowing counts as a change. The trigger is mechanical: it judges
nothing about relatedness. The amendment is recorded at the decision's
home site in the plan as a dated, attributed marker:

```
> **Amended (<source>, <date>):** <the decision's final statement>
```

`<source>` is the user for a user ruling, the session otherwise.
Markers are append-only, never edited or deleted. Where several mark
one decision, the latest is authoritative, by date and then by
document order within a date, and every ripple check reads the sites
against it. The marker sits at line start because plan-review's
`recordsAmendment` fact reads line-start `> **Amended (` in `plan.md`
alone: an illustrative mention in plan prose stays inline-backticked,
never at line start, and a payload may carry the grammar as
documentation. Recording a marker sweeps the decision's footprint the
same moment, by the recipe in `cases.md` § Task Structure. A spec-level
amendment also lands the spec's dated amendment line: before writing
it, **read the define skill's § The Spec now**, unless already read
this session: `${CLAUDE_PLUGIN_ROOT}/skills/define/SKILL.md`, for the
spec side's amendment line, where it goes and who writes it.

## Payloads

*Read with this section: `mechanics.md` § Payloads (the mechanics) and `cases.md` § Payloads (the cases).*

**Read the process contract's § The payload contract now, and the
payload verifier's header**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/scripts/payload-verify` (its opening comment).
They hold where a payload lives and how its file is named, what
`plan.md` keeps, the manifest and its one payload gate per payload,
who writes what and when; and how the verifier runs: the manifest's
line grammar, PASS, PENDING and FAIL, the exit contract, how it reads
progress from the plan's ticked boxes, plan complete, and the
workflow-internal reference scan.

What write-plan adds is how it authors them. There is no extent
boundary and no judgement per step:

- **Always a `payloads/` file.** Every payload, one line or five
  hundred, is a file with exactly one payload gate, so a whole-file
  Create payload stays a compile-checkable unit (`payloads/t7s1.ex`),
  and a Modify payload shares the scheme with no claim to compile.
  Every content-bearing edit has one, replacements included: the
  inserted final-state lines are the payload, and the removal half is
  verified where deletions always are, by a sweep gate. Gate coverage
  is a function of content, never of shape.
- **Line-grain extent.** A payload is whole physical lines of the
  target's final state, at least one: a sub-line edit (`all seven keys`
  to `all eight keys`) carries its full final line. Its bytes are the
  target's exact final-state bytes for those lines, so a payload
  covering a target's unterminated last line is itself unterminated
  rather than inventing a newline the target will never contain. In the
  normal case the target's lines end in newlines, and so does the
  payload.
- The plan's own fences carry only commands, expected output, Edit
  anchors and illustration: addressing and verification, never payload
  bytes.

Each content-bearing step points at its payload file with a
**reference line**, the file link plus the Edit-anchor prose:

```
Payload: `payloads/t4s2.md` — insert after the `## Grounding` heading's first paragraph.
```

**The frame bar.** A payload's prose (module docs, function docs, test
docs, comments, README and docs text) is written for the reader of the
target file, in that file's frame. It says what the code does or why,
in terms a `git log` or `git blame` reader can act on, and it carries
no workflow-internal reference. Provenance, where it is wanted, is the
change described, never a pointer into the state store. Worked example:
"Characterizes the closed-vocabulary guard on `error_kind` (topic
`<topic ID>`): …" becomes "Characterizes the closed-vocabulary guard on
`error_kind`, added when the telemetry emitter was widened to a
3-tuple: …".

**The verifier step.** Each task carrying a payload ends with its own
step running the payload verifier, after the task's other steps, the
test runs included. It runs once those boxes are ticked: after the
task's commit, where the task commits in a checkout, since implement
ticks a task's boxes when its commit lands; where the task writes no
checkout file, once its last verification passes, which is when
implement's own rule ticks that task's boxes. Its `Expected:` line,
the template's (§ Task Structure), then holds as written: this task's
gates and every earlier task's PASS, every later task's PENDING. The
plan names the verifier by role, `<the payload verifier>`, because its
path belongs to the session that runs it: there it is `sh
${CLAUDE_PLUGIN_ROOT}/scripts/payload-verify <topic directory>`,
followed by one `--exempt <tree>` per machinery tree the front binds.

## Re-planning

*Read with this section: `cases.md` § Re-planning (the cases).*

A topic that iterates back to this phase already has a `plan.md` and a
`payloads/` directory, and a re-plan arrives with § Iteration already
read at § Input. **The re-plan writes the whole current plan in
place**: completed tasks stand ticked, dropped ones are gone, and the
delta is read from the plan's pre-image, never written as a document.
Where the files are the record, the re-plan first copies `plan.md` and
`payloads/` into the topic's `pre-image/` slot, as the operations
contract's § The topic's artifacts says (how the copy replaces an
earlier one, and when a resumed re-plan skips it); the close removes
the copy's stamp. A re-plan never carries plan-review's `Hardened —`
line over. There is no "delta plan" shape and never a second plan
file: a reader must never have to work out which plan is the plan,
which is the sibling-files confusion moved inside one file.

The re-plan carries the plan's `## Drops` section with every `Drawn:`
and `Returned:` line verbatim, and appends its own (the operations
contract, § The pool).

## No Placeholders

Every step contains the actual content an engineer needs. These are
**plan failures**, never written:

- "TBD", "TODO", "implement later", "fill in details";
- "Add appropriate error handling", "add validation", "handle edge
  cases";
- "Write tests for the above" with no actual test code;
- "Similar to Task N" (repeat the code: the engineer may read tasks
  out of order);
- a step that says what to do without showing how (shown in full:
  every payload reached through its reference line, § Payloads);
- a reference to a type, function or method no task defines.

## Self-Review

After writing the whole plan, look at the spec with fresh eyes and
check the plan against it. This is a checklist you run yourself, not a
subagent dispatch.

1. **Decision coverage.** Walk the spec's decisions, not the tasks. For
   each decision the plan implements, expand every lettered or bulleted
   sub-clause into its own coverage row **before any tick**, and pair
   each row with the payload file that carries it, never with the
   task. Where a decision's answer carries a substitution or exception
   word (*except*, *instead of*, *two sentences*, *the same why as*),
   re-read the answer against every payload it governs: a decision is
   text to match, not a gloss to remember, and it cannot be discharged
   as one unit. Then skim every other section and requirement of the
   spec for the task that implements it, and list any gaps.
2. **Placeholder scan.** Search the plan for the patterns of § No
   Placeholders, and fix them.
3. **Type consistency.** The types, signatures and property names used
   in later tasks match the ones defined in earlier tasks. A function
   called `clearLayers()` in Task 3 and `clearFullLayers()` in Task 7
   is a bug.
4. **Create and Modify are right on disk.** Every `Create` path does
   not exist yet, and every existing path is a `Modify` with a
   read-first, amend instruction, with no fresh top-level definition of
   an existing file. A test file you are "adding tests to" almost
   always exists: that is a Modify, and the new cases slot into the
   existing module.
5. **Linter-safe structure.** None of the proposed code would be
   rejected by the project's linters or formatter (nesting depth,
   cyclomatic complexity, banned dependencies, layering rules). Their
   config is the source of truth for the rules they enforce: check a
   non-trivial proposed structure against it, and name a rule rather
   than transcribing a threshold that will drift. A companion skill,
   where the front has one, carries the specifics.
6. **Claims traced.** Sweep the plan for claims in the claim classes
   of `cases.md` § Grounding: quoted commands, greppable references,
   embedded prose, units and types for measurements, runtime and
   harness claims. Each traces to a fact-sheet entry or sits in the
   assumptions block.
7. **Expectations measured, never typed.** Every `Expected:` line and
   every embedded gate carries its provenance: a grounding probe that
   ran, a delta derived from the task's own payload, a grounded
   absence, or a stamped baseline; the only bare defer is a planned
   assertion's green side. Every red whose tested target exists today
   records its observed failure, and every step whose check
   discriminates only under a condition carries its discriminates-when
   line with the skip rule. The mechanical half: any `Expected:`
   asserting a baseline, an unchanged relation, or a whole-suite, gate
   or linter outcome is **run once at authoring**, whichever side of
   the change it sits on, and stamped with its observed result
   ("unchanged from its pre-task state" is a claim about the pre-image,
   which exists now, and the green-side defer never reaches it); and
   any verification command that exists today is run rather than
   reasoned about. Each gate's `Run:` line reads its producer's exit
   status and output, with no final pipeline stage that masks a failed
   producer and an output window wide enough to show what it asserts
   against (`cases.md` § Grounding, class 2).
8. **Payloads extracted and gated.** No payload bytes remain in the
   plan: its fences and its prose carry only commands, output, anchors
   and illustration. Every `payloads/` file has exactly one manifest
   gate and every gate its file, expected counts are final-state, and
   step IDs are unique and well-formed. Check the join by eye, because
   the tool cannot: every manifest step ID, suffix stripped, names the
   checkbox of the step that **applies** that payload, not merely some
   checkbox (a before-count step inserted ahead of the apply shifts the
   number, and the verifier asks only whether *a* checkbox exists). Two
   manifest tells, also by eye, each a rule of `cases.md` § Payloads
   broken: the closed-file rule (a `whole` gate beside any other gate on
   the same target) and the closer rule (a payload ending on a closing
   delimiter a later insertion needs). Every replacement payload's removal half
   has its sweep gate (a zero-hit gate with its control, or a delta
   pair). Every formatted target's planned final state carries its
   formatter stamp in the fact sheet (`cases.md` § Payloads). Every
   verifier step is its task's last step, and its `Expected:` line
   quotes the tool's summary line with counts summed from
   `payloads/manifest` in plan order, never counted from the step
   list. Then run the verifier once against the topic directory: a
   fresh, correctly authored plan reports every gate PENDING with exit
   0. A FAIL is the vacuous-payload analog (the planned content already
   exists in its target), and exit 2 is an authoring defect in the
   payload artifacts themselves (the defects: the verifier's header);
   rewrite that step before the plan ships. A plan whose steps carry no
   `Payload:` reference line authored no payload at all (its steps are
   deletions, commands and behaviour only), so it has no `payloads/`
   directory and no manifest, the scan above is the whole check, and
   the verifier run does not apply. Never author an empty
   `payloads/manifest` to make this item read clean.
9. **Amendment ripple.** For every amendment marker in the plan
   (line-start `> **Amended (`), re-sweep the decision's footprint by
   the recipe in `cases.md` § Task Structure, and check each hit
   against the marker's final statement (the latest marker, where
   several mark one decision). A site still stating the pre-amendment
   form is a plan failure; fix it. A hit listed under the marker as a
   landed record is resolved. A marker-free plan makes this item a
   no-op.
10. **Glossary delta became tasks.** Every entry the spec's glossary
    delta records as deferred has a task that writes it, the entry and
    any code-home or prose-home sentence it needs, landing in the same
    change as its referent. A delta that defers nothing makes this item
    a no-op.
11. **Vocabulary bans.** Grep `plan.md` and every `payloads/` file for
    the `_Avoid_` terms of every glossary entry the plan touches **or
    cites**: the project glossary's, and the plugin glossary's on a
    meta topic. A hit is a plan failure. The banned word is the one the
    author has spent the session reading: a cross-repo topic speaks the
    upstream repo's blessed term one directory over, and an entry that
    entered the plan as a line number to pin was never read as
    vocabulary, so neither reading habit substitutes for the grep.
12. **Companion artifacts.** Every artifact the header's companion
    list names has the task that carries it, or its embedded result.

Fix what you find inline; there is no second review. A spec
requirement with no task gets one.

## Saving the Plan

*Read with this section: `mechanics.md` § Saving the Plan (the mechanics).*

Saving the plan makes it the record the next phases read: `plan.md`
and its `payloads/` in the topic folder, committed where git keeps the
state folder's history, and the file itself where the files are the
record (the operations contract, § The topic's artifacts, read at
§ Input). Where nothing earlier in this session read them, **read the
substrate contract whole and the process contract's § Topic kinds
now**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for staging by explicit
path, the commit registers, concurrent edits on a shared tree, and the
machinery-edit duty. A meta topic on a state folder in no git
repository with no machinery edit reads nothing there.

**Draw and return.** Saving the plan is write-plan's consolidating
close: it draws and returns what this close's lines in the plan's
`## Drops` section name, right after the state-folder commit lands, or
the save where the files are the record (the operations contract,
§ The pool: the read, the order at the close, a draw that cannot run).

## Next Phase

**Capture block first:** invoke the `ymer:capture` skill, source
`write_plan`; the battery, the drop grammar and the write live in that
skill alone. It runs before plan-review is invoked, since each phase
tail captures its own, and it keeps a session that skips plan-review
from skipping capture too.

Then invoke the **`ymer:plan-review`** skill on the saved plan (the
process contract, § The map). It is the default next step, not an
optional extra: skip it only when the user has explicitly said to. After
plan-review finishes, stop: the user reviews the rewritten plan, at the
surface plan-review's report names, before any implementation begins.
Do not start implementing.

## Remember

- Exact file paths always.
- Complete content in every step: every payload a `payloads/` file
  reached through its reference line, never a placeholder.
- Exact commands with their expected output.
- Payloads live in `payloads/` files with their gates, whatever their
  extent, never fenced in the plan.
- DRY, YAGNI, TDD.
- **No git steps in a plan** (commit, staging, branching): implement's
  phase close owns the ship's git, and the phase machinery owns the
  rest. The one exception is `git mv`, which a plan may carry.
