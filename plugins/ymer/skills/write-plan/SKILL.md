---
name: write-plan
description: Use when you have a spec or requirements for a multi-step task, before touching code
---

# Writing Plans

This file is the write-plan skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics).*

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain. Assume they don't know good test design very well.

**Announce at start:** "I'm using the write-plan skill to create the implementation plan."

- (User preferences for plan location override this default)

## Language-specific companion skills

*Read with this section: `mechanics.md` § Language-specific companion skills (the mechanics).*

Before drafting, detect the primary language of the target codebase and invoke any matching coding-standards skill as a companion. The companion skill governs coding and documentation tasks inside the plan (what `@moduledoc` / docstrings to write, which diagrams are required, where test narratives live, guard contracts at trust boundaries) — this skill still governs plan shape, task granularity, and execution handoff.

When a pairing applies:

1. Read the companion skill before writing the plan.
2. In the plan header, add: `Coding and documentation work in this plan must follow the <skill-name> skill.`
3. Include the companion skill's required artifacts as explicit tasks (e.g. moduledoc updates, diagram impact checklist, test `@moduledoc` review, guard contracts on any new boundary functions) — not as a final cleanup step.
4. Complete any checklist the companion skill defines (e.g. diagram impact) and embed the result in the plan.

If the codebase is not Elixir and no companion skill matches, proceed with this skill alone.

## Scope Check

*Read with this section: `cases.md` § Scope Check (the cases).*

If the spec covers multiple independent subsystems, suggest breaking it into separate plans — one per subsystem. Each plan should produce working, testable software on its own.

Before drafting a large plan — or when one balloons mid-draft — offer an
unprompted worth-it assessment: ground it in real data (row counts, growth,
who benefits), separate the high-value slice from the speculative slice, and
propose the split with an implement-now / draft-but-park recommendation.
Settled design forks are not committed scope: the user treats "should we
build this at all, and how much of it" as its own decision and picks the
trimmed option when the evidence supports it. An honest "the marginal half
costs X and starts paying when Y" beats cheerleading the whole item.
**Default: author per the stated recommendation, the alternative and its
cost recorded in the plan header — review post-hoc there**
(*Defaults and holds*: development-process).

## Grounding

*Read with this section: `mechanics.md` § Grounding (the mechanics) and `cases.md` § Grounding (the cases).*

**Pre-flight.** Derive the predecessor's close state and any pending
steps from durable state; finish an unfinished close from its first
missing outcome; re-report each pending step with its command, and stop
only when this phase's work depends on one — a pending branch reset
does, a pending push does not (*Defaults and holds*:
development-process).

**Topic resolution** runs next (term: the plugin glossary): the task's
status (*look up topic*, binding: the operations contract), the topic folder —
present or not, and whether it holds `request*.md` — and, where the
folder exists, `review.md`'s first recognizer top-down (review
§ Recognizers) and whether `brainstorm.md` or `spec.md` carries the
`Interview pending —` marker at its head (development-process
§ Artifacts). A marker on top of `review.md` is **live** when the phase
it names has no `<topic ID>: <phase>` commit over the topic folder since
the commit
that last touched `review.md`; the command that reads that range, and
the rule trusting it only over a committed floor, are review § Input
item 2's, run with the phase the marker names substituted for
`implement`. A **drawn topic** — a `doing` task whose folder holds
nothing but its `request.md` — and a task that is not in flight — open,
or a **closed topic**, its task completed or cancelled — are all topics
this phase does not plan: stop and name **brainstorm** ("External requests never skip
phases": development-process § Process ground rules). A `doing` task
with no folder is a **split child** (→ Save plans to); in a code repo
its branch is born here, `git switch -c <topic> main`, the way an
idea-first topic's is. A **live marker naming write-plan** is this
cycle's brief — read `review.md` first, the finding and the entries
below it, and the cycle is a re-plan (→ Re-planning). A live marker
naming another phase stops the session and names that phase; mid-route,
`plan.md`'s ticks and the topic's phase commits since the marker say
where the route now stands (review § Input items 1–2). The
`Interview pending —` marker at the head of `brainstorm.md` or
`spec.md` names its artifact's phase the same way — stop and name it,
the command written out. Anything else is
a topic **in flight** — reuse the folder and plan as usual.

When the topic directory holds a `spec.md` from the define phase, it is the spec this plan implements — read it first: the decisions and their rationale, the domain rules and edge cases, the out-of-scope list, and its "open questions for write-plan", which the plan must answer. A split child holds no `spec.md` and is owed none (→ Save plans to): the parent's direction doc, which the task's description names, is read first in its place and is the brief this plan grounds in. Do not contradict a spec decision silently; a decision that turns out
not to survive planning goes back to the user. **Default: record the
contradiction in the plan header and stop, naming define — never plan
against the spec silently** (*Defaults and holds*: development-process).
A contradiction the user has resolved in-session is not that case — it is a plan amendment: record its marker, sweep its footprint, and land the spec's dated amendment line per Task Structure's amendment-marker extension, then proceed.

Before writing any task, gather the facts the plan depends on. Plans fail most often on facts that were assumed rather than checked: whether a target file exists (Create vs Modify), the real anchor an insertion lands on, the existing test module's `setup`/aliases/imports, and the actual signatures of the functions the plan will call.

**File count is not the key, and neither is artifact kind.** A two-file plan whose whole risk sits in one function's input space needs harder grounding than a twenty-file mechanical rename. **Risk profile** governs how hard grounding probes what it does gather; **applicability** governs whether the fan-out shape applies at all. The key itself — its four dimensions, and the never-file-count-alone rule — lives in the development-process charter's *Review effort* section; this rule points there rather than restating it.

When the topic directory holds a `survey.md` from the scout phase, read it first and let it aim the fan-out: it already maps the relevant files, concepts, vocabulary, and conventions, so do not re-survey the codebase for any of that — grounding gathers only the plan-mechanical facts above. Treat the map as leads, not facts, and re-price them before any is treated as one: `git diff --stat <the survey's stamped rev>..HEAD` over the checkout names every file the corpus moved in since the map was taken — the predecessor phase's own commit, define's glossary delta, among the movers — and every claim whose corpus the diff names is re-measured first; then re-verify the claims the plan relies on, since anchors and signatures drift between sessions. Only when no survey exists does grounding widen enough to locate the files it needs to verify.

When the project keeps a glossary (home: `docs/glossary.md`, unless its CLAUDE.md says otherwise), read it before drafting: the plan's vocabulary — including names in code blocks — uses its canonical terms, never its `_Avoid_` synonyms, and never redefines a term (point to the glossary instead). A genuinely new concept the spec did not name is define-phase work: flag it, don't coin a term silently.

When the topic shapes a surface a user operates, read the product's **Forward direction** — the first settled section of its product page, which is the `<Product> Roadmap` project's description (fetch recipe, miss rule, and the rest of the page's contract: the product-design skill § The product page). Its entries are constraints on the shape a feature must take when it arrives, so they bind the decomposition, not only the spec: a plan that contradicts one goes back to the user exactly as a spec contradiction does — record it in the plan header and stop, naming the phase that owns the change (a carve topic). Nothing else on the page is this phase's read, and no phase writes it: the whole-page read is brainstorm's beat, and content enters a page only through a carve topic.

## File Structure

*Read with this section: `cases.md` § File Structure (the cases).*

Before defining tasks, map out which files will be created or modified and what each one is responsible for. This is where decomposition decisions get locked in.

**Verify on disk before labelling Create vs Modify — never infer it from the path.** For every file the plan touches, check whether it already exists (Glob / `ls` / Read). A path that already exists is a **Modify**, not a Create — this holds even when the task is "add the tests for this feature": the test file usually already exists. When a file is a Modify:

- **Read it first**, then write the plan to *amend* the real content — slot new functions/cases into the existing module, reuse its `setup`, aliases, and imports, and **extend** (never replace) its `@moduledoc` / docstring.
- Emitting a fresh top-level definition (a new `defmodule` / `class` / file preamble) for a file that already exists is a **plan failure**: it either clobbers existing coverage or fails to compile on a name collision.
- Show the change as an append/insert against a named anchor in the existing file (e.g. "after the existing `compact/1` describe block, before the final `end`"), not as a standalone file body.

**Content-ownership map — required whenever the plan relocates or deletes content-bearing files.** Such a plan carries a map **total over the source**: every content unit of the moved or deleted files gets an explicit disposition row — a destination, or **Dropped** with a why. Dropped is a destination, not an absence; a source unit with no row is a plan failure (canonical term: the plugin glossary). Two rules:

- **No mixed rows** — a row is wholly placed or wholly dropped. Granularity follows content, not files: a row that mixes survivors and dropped units (e.g. an "archived working record" hiding an operative safety rule) must split until it doesn't.
- **Dropped means gone from every reachable surface** — archiving to the state store counts as dropped from the project's perspective; an operative rule may not leave the project riding a wholesale "archived" row.

- Design units with clear boundaries and well-defined interfaces. Each file should have one clear responsibility.
- You reason best about code you can hold in context at once, and your edits are more reliable when files are focused. Prefer smaller, focused files over large ones that do too much.
- Files that change together should live together. Split by responsibility, not by technical layer.
- In existing codebases, follow established patterns. If the codebase uses large files, don't unilaterally restructure - but if a file you're modifying has grown unwieldy, including a split in the plan is reasonable.

This structure informs the task decomposition. Each task should produce self-contained changes that make sense independently.

## Bite-Sized Task Granularity

**Each step is one action (2-5 minutes):**
- "Write the failing test" - step
- "Run it to make sure it fails" - step
- "Implement the minimal code to make the test pass" - step
- "Run the tests and make sure they pass" - step

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** Implement this plan task-by-task in order; steps use checkbox (`- [ ]`) syntax — tick each box as its verification passes. For a plan whose tasks are independent, the Workflow feature can fan them out.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

**Assumptions (unverified):** [one bullet per genuinely uncheckable claim, with impact-if-false and the tasks affected — omit the line when none]

---
```

## Task Structure

*Read with this section: `mechanics.md` § Task Structure (the mechanics) and `cases.md` § Task Structure (the cases).*

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

- [ ] **T4S5: Verify all tests pass and the payloads landed**

Run: `mix test`
Expected: All tests PASS

Run: `<the payload verifier> <state folder>/<repo>/YYYY/MM-DD-<topic>`
Expected: exit 0 — `payload-verify: N gate(s) — X PASS · Y PENDING · 0 FAIL`, with N, X and Y summed from `payloads/manifest` in plan order (this task's gates and every earlier task's PASS, every later task's PENDING) — never counted from the step list, since a step carrying suffixed payloads owns several gates
````

The template shows an Elixir codebase; for another language, keep the exact
step structure and swap in that language's test runner and idioms.

Four step-grammar extensions ride in the plan text. The first three carry the measured-never-typed principle (Grounding); the fourth records plan amendments:

**Observed red.** A failing-test step whose tested target exists today records the failure observed at authoring, never a prediction:

```
Run: `mix test test/my_app/exact/path_test.exs`
Expected: FAIL — observed at authoring 2026-07-31: `** (MatchError) no match of right hand side value: {:error, :timeout}` (1 failure)
```

**Delta gate steps** (shape and falsifiability rules: sweep rule 4). A step that incrementally edits countable text brackets the edit with an adjacent before/after measurement pair; the delta is derived by running the matcher over the step's payload file, and the derivation rides the delta assertion:

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

**Discriminates-when line.** Where the Grounding beat's answer names a run condition, the verification step carries the annotation, always with its skip rule:

```
Run: `curl -fsS <the intranet health endpoint>`
Expected: `{"status":"ok"}`
Discriminates only when: on the corporate network (off it, the host serves its public chain and this check greens vacuously).
Skip rule: condition unmet → NOT a pass; record the step as deferred.
```

**Amendment marker.** A plan amendment — a decision added, widened, or changed after any plan text exists, a user ruling mid-session included — is recorded at the decision's home site in the plan as a dated, attributed marker (term: the plugin glossary):

```
> **Amended (<source>, <date>):** <the decision's final statement>
```

## Payloads

*Read with this section: `mechanics.md` § Payloads (the mechanics) and `cases.md` § Payloads (the cases).*

A **payload** — the verbatim content a task's edit carries (plugin glossary) — never appears in the plan, in a fence or in prose. There is no extent boundary and no per-step judgement (contract home: development-process § Artifacts):

- **Always a `payloads/` file.** Every payload — one line or five hundred — becomes `payloads/<step-id>.<ext>` beside the plan with exactly one manifest gate, whatever its extent — the step ID's lowercase form, the target's extension — so a whole-file Create payload stays a compile-checkable unit (`payloads/t7s1.ex`) and a Modify payload shares the same scheme without any claim to compile. Every content-bearing edit has one, replacements included: the inserted final-state lines are the payload, and the removal half is verified where deletions always are, by a sweep gate. Gate coverage is a function of content, never of shape.
- **Line-grain extent.** A payload's extent is whole physical lines of the target's final state, at least one: a sub-line edit (`all seven keys` → `all eight keys`) carries its full final line. The bytes are the target's exact final-state bytes for those lines, so a payload covering a target's unterminated last line is itself unterminated rather than inventing a newline the target will never contain; in the normal case the target's lines are newline-terminated and so is the payload.
- The plan's own fences then carry only commands, expected output, Edit anchors, and illustration — addressing and verification, never payload bytes.

Each content-bearing step points at its payload file with a **reference line** — the file link plus the Edit-anchor prose:

```
Payload: `payloads/t4s2.md` — insert after the `## Grounding` heading's first paragraph.
```

**The frame bar.** A payload's prose — `@moduledoc`, `@doc`, `@tag doc:`, comments, README and docs text — is written for the reader of the target file, in that file's frame: it says what the code does or why, in terms a `git log` / `git blame` reader can act on, and it carries no workflow-internal reference (the plugin glossary). Illustration, not a closed list: topic IDs, state-store paths, artifact basenames, step and task IDs, decision and finding labels. Provenance, where it is wanted, is the change described — never a pointer into the state store; a project repo has two sanctioned topic-ID sites, a remediation marker's `plan:` line and a redefinition-in-flight marker's topic ID. Worked example: "Characterizes the closed-vocabulary guard on `error_kind` (topic `<topic ID>`): …" becomes "Characterizes the closed-vocabulary guard on `error_kind`, added when the telemetry emitter was widened to a 3-tuple: …".

**The verifier step.** Each task carrying a payload ends with a step running the payload verifier. The plan names it by role, `<the payload verifier>`, because its path belongs to the session that runs it: there it is `sh ${CLAUDE_PLUGIN_ROOT}/bin/payload-verify <topic directory>`, followed by one `--exempt <tree>` per machinery tree the front binds:

```
Run: `<the payload verifier> <state folder>/<repo>/YYYY/MM-DD-<topic>`
Expected: exit 0 — `payload-verify: N gate(s) — X PASS · Y PENDING · 0 FAIL`, with N, X and Y summed from `payloads/manifest` in plan order (this task's gates and every earlier task's PASS, every later task's PENDING) — never counted from the step list, since a step carrying suffixed payloads owns several gates
```

## Re-planning (an iteration)

*Read with this section: `cases.md` § Re-planning (an iteration) (the cases).*

A topic that iterates back to this phase already has a `plan.md` and a
`payloads/` directory. **The re-plan writes the whole current plan in
place**: completed tasks stand ticked, dropped ones are gone, and the
delta is read from git — the pre-image is the parent of this iteration's
own `: write-plan` commit (charter: development-process, *Iteration*) —
never written as a document. There is no "delta plan" shape and never a
second plan file: a reader must never have to work out which plan is the
plan, which is the sibling-files confusion moved inside one file.

## No Placeholders

Every step must contain the actual content an engineer needs. These are **plan failures** — never write them:
- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" / "add validation" / "handle edge cases"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code — the engineer may be reading tasks out of order)
- Steps that describe what to do without showing how (shown in full: every payload reached through its `payloads/` reference line — → Payloads section)
- References to types, functions, or methods not defined in any task

## Remember
- Exact file paths always
- Complete content in every step — every payload a `payloads/` file reached through its reference line (→ Payloads section) — never a placeholder
- Exact commands with expected output
- Payloads live in `payloads/` files with manifest gates, whatever their extent — never fenced in the plan
- DRY, YAGNI, TDD
- **Do not include git steps** (commit, staging, branching) in plans — implement's phase close owns the ship git, and phase machinery owns the rest
  - Exception to this rule is `git mv` which is allowed.

## Self-Review

After writing the complete plan, look at the spec with fresh eyes and check the plan against it. This is a checklist you run yourself — not a subagent dispatch.

**1. Decision coverage:** Walk the spec's decisions, not the tasks. For each decision the plan implements, expand every lettered or bulleted sub-clause into its own coverage row **before any tick**, and pair each row with the payload file that carries it — never with the task. Where a decision's Answer carries a substitution or exception word — *except*, *instead of*, *two sentences*, *the same why as* — re-read the Answer against every payload it governs: a decision is text to match, not a gloss to remember, and it cannot be discharged as one unit. Then skim every other section and requirement of the spec for the task that implements it. List any gaps.
**2. Placeholder scan:** Search your plan for red flags — any of the patterns from the "No Placeholders" section above. Fix them.
**3. Type consistency:** Do the types, method signatures, and property names you used in later tasks match what you defined in earlier tasks? A function called `clearLayers()` in Task 3 but `clearFullLayers()` in Task 7 is a bug.
**4. Create vs Modify is correct on disk:** For every file the plan touches, confirm each `Create` path does **not** yet exist and every already-existing path is labelled `Modify` with a read-first/amend instruction (no fresh `defmodule` or top-level redefinition of an existing file). A test file you are "adding tests to" almost always already exists — that is a Modify, and the new cases must slot into the existing module.
**5. Linter-safe structure:** None of the code you propose would be rejected by the project's linters or formatter (nesting depth, cyclomatic complexity, banned dependencies, layering rules). Their config is the source of truth for the style/structure rules they enforce — check a non-trivial proposed structure against them, and reference a rule by name rather than transcribing a threshold that will drift. A coding-standards companion skill for the project's language, where the front has one installed, carries the specifics.
**6. Claims traced:** Sweep the plan for claims in Grounding's classes — quoted commands, greppable references, embedded prose, units/types for measurements, runtime/harness claims. Each traces to a fact-sheet entry or sits in the Assumptions block.
**7. Expectations measured, never typed:** Every `Expected:` line and every embedded gate carries its provenance — a grounding probe that ran, a delta derived from the task's own payload, a grounded absence, or a stamped baseline (sweep rule 4); the only bare defer is a planned assertion's green side. Every red whose tested target exists today records its authoring-time observed failure, and every step whose check discriminates only under a condition carries its discriminates-when line with the skip rule. The mechanical half: any `Expected:` asserting a baseline, an unchanged relation, or a whole-suite, gate or linter outcome is **run once at authoring**, whichever side of the change it sits on, and stamped with its observed result — "unchanged from its pre-task state" is a claim about the pre-image, which exists now, and the green-side defer never reaches it; and any verification command that exists today is executed rather than reasoned about.
**8. Payloads extracted and gated:** No payload bytes remain in the plan — its fences and its prose carry only commands, output, anchors, and illustration. Every `payloads/` file has exactly one manifest gate and every gate its file, expected counts are final-state, and step IDs are unique and well-formed (`T<task>S<step>`). Check the join by eye, because the tool cannot: every manifest step-id, suffix stripped, must name the checkbox of the step that **applies** that payload, not merely some checkbox — a before-count step inserted ahead of the apply shifts the number, and the verifier only asks whether *a* checkbox exists. Two manifest tells, also by eye: a `whole` gate beside any other gate on the same target, and a payload whose last line is a container's closer in a file a later task edits — either one is the closed-file rule of § Payloads broken. And every verifier step's `Expected:` line quotes the tool's summary line with counts summed from `payloads/manifest` in plan order, never counted from the step list. Then run the verifier once against the topic directory: a fresh, correctly-authored plan reports every gate PENDING with exit 0 — a FAIL is the vacuous-payload analog (the planned content already exists in its target), and exit 2 is an authoring defect in the payload artifacts themselves (a gate whose payload file or checkbox is missing, a malformed manifest line, an orphan payload file, or a workflow-internal reference in a payload bound for a project repo — the frame bar's gate); rewrite that step before the plan ships. A plan whose steps carry no `Payload:` reference line authored no payload at all — its steps are deletions, commands, and behavior only — so it legitimately has no `payloads/` directory and no manifest (contract: development-process § Artifacts), the scan above *is* the whole check, and the verifier run does not apply. Never author an empty `payloads/manifest` to make this item read clean.
**9. Amendment ripple:** For every amendment marker in the plan (line-start `> **Amended (`), re-sweep the decision's footprint — the whole plan plus every `payloads/` file, no disposition-based exemptions, substring/stem content terms per the sweep skill, a spec decision ID only ever an additional term — and check each hit against the marker's final statement (the latest marker, where several mark one decision). A site still stating the pre-amendment form is a plan failure; fix it. A marker-free plan makes this item a no-op.
**10. Glossary delta became tasks:** Every entry the spec's glossary delta records as deferred has a task that writes it — the entry itself, plus any code-home or prose-home sentence it needs — landing in the same change as its referent. A delta that defers nothing makes this item a no-op.
**11. Vocabulary bans:** grep `plan.md` and every `payloads/` file for the `_Avoid_` terms of every glossary entry the plan touches **or cites** — the project glossary's, and the plugin glossary's on a meta topic. A hit is a plan failure. The banned word is the one the author has spent the session reading: a cross-repo topic speaks the upstream repo's blessed term one directory over, and an entry that entered the plan as a line number to pin was never read as vocabulary, so neither reading habit substitutes for the grep.

If you find issues, fix them inline. No need to re-review — just fix and move on. If you find a spec requirement with no task, add the task.

## Saving the Plan

*Read with this section: `mechanics.md` § Saving the Plan (the mechanics).*

## Next Phase

**Capture block first:** invoke the `ymer:capture` skill — source
`write_plan`; the battery, the drop grammar and the write live in that
skill alone.
It runs before plan-review is invoked — each phase tail captures its
own — and it is what keeps a session that skips plan-review from
skipping capture too.

Then invoke the **`ymer:plan-review`** skill on the saved plan. This is the default
next step, not an optional extra — skip it only when the user has explicitly
said to. After plan-review finishes, stop: the user reviews the rewritten plan
(`git diff`) before any implementation begins. Do not start implementing.
