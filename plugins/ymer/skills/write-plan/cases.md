# Writing Plans — cases

The cases of the write-plan skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Scope Check

An alternative rejected as "unprobed" names the cheapest read that
settles it and runs it — a read-only call, one grep — or marks the
unknown `inferred:`, so the successor sees a claim rather than an
absence it cannot accept as a measurement.

## Grounding

**Sketch the decomposition before authoring any question list.** A few lines naming the tasks you intend — held in-session, not a deliverable, discarded once the question lists are written. The sketch fixes the precision the steps will demand, and a question list authored without it comes back at the wrong granularity: a fact sheet answering "which tests cover X" where the steps needed per-test classification into success and error paths, which the plan then paid for by being rewritten at self-review. This holds whether the questions go to Explore agents or to yourself.

A term the spec's glossary delta records as **deferred** is the deliberate exception, not an unnamed concept to route back: define's referent gate holds the entry back until the thing the term names is real, so the glossary does not carry it yet and this plan is where it lands. Take the definition sentence from the delta as the term's source, and give the deferred entry its own task — the entry plus any code-home or prose-home sentence it needs — landing in the same change as its referent.

The fact sheet is what File Structure (below) consumes, and its contract is claim-driven: **every claim the plan states, relies on, or embeds must trace to a verified fact in the fact sheet — or be explicitly flagged as an assumption.** Every Create/Modify label and every named anchor traces to a verified fact, never to memory — and so does every other class of claim. The known classes, each with its recipe (non-exhaustive — a claim outside every class still falls under the contract):

1. **References** — when grounding greps for occurrences of a referent (route, path, name), grep the literal value in every syntactic form it can take — raw strings, selectors, crafted literals — never only the idiomatic sigil/macro form. A one-syntax grep is incomplete by construction.
2. **Commands** — every command a plan step quotes (`Run:` lines, any named executable) must resolve: existence-check it during grounding (`mix help <task>` / `which <cmd>` / `--help` probe). Existence is grounding's; of expected-output claims, only post-change behavior — a planned assertion's green side — stays implement-verified. Every other expected value falls under measured-never-typed (below).
3. **Runtime/harness behavior** — probe-else-flag: if a claim is in-session checkable (run the command, call the tool, read the harness docs), probe it during grounding — deferring a checkable claim is a plan failure. A genuinely uncheckable claim enters the plan header's `**Assumptions (unverified):**` block, one bullet per claim with impact-if-false and the tasks affected, read downstream as risk, not fact (its consumer: code-review's decision digest). A probe justifying a claim about a gate runs the gate's exact invocation and configuration — probing the underlying tool with default flags grounds nothing. A dependency not yet in `deps/` is fetched at its target version into the scratchpad — `mix hex.package fetch <dep> <version> --unpack` — and its source is the ground for every claim about it; web docs and a research agent's summary are neither.
4. **Usage facts** — a fact about how an API/helper is *used* needs one complete existing call site quoted end-to-end in the fact sheet (e.g. one full existing test); the definition alone is not evidence of usage shape.
5. **Measurements** — a new column/field storing a measurement gets a dynamic-range check: sample the recorded phenomenon's actual magnitude (probe or existing data) before picking unit/precision/type; prior art in log lines is not evidence.
6. **Embedded prose** — prose inside content the plan embeds (planned moduledocs/docstrings, comments, Dockerfile/config comments, README fragments) consists of claims: verify each against the codebase *and* against the plan's own grounding facts; a conflict between the two is a grounding failure to resolve, not a wording issue.
7. **Absences** — a grounding absence (a "does not exist" fact, a zero count) is a measured claim: stamp it — the matcher quoted with its observed zero — and name its positive control per sweep rule 4's mechanisms (claims rules: the sweep skill). Only absences stamped this way feed forward — including into plan-review's "pre-verified facts — do not re-flag" list.

**Inherited `inferred:` marks.** Upstream artifacts arrive marked: sweep the inherited artifacts — `brainstorm.md`, `survey.md`, `spec.md` — for the literal marker `inferred:` (`grep -rn -F 'inferred:'` over the topic directory), and resolve every mark the plan relies on: probe it to a fresh stamp when checkable; move it into the Assumptions block with impact-if-false when genuinely uncheckable. Fan-out fact sheets are never written to disk, so this grep cannot see them — they are resolved at synthesis (above). Marks the plan does not rely on stay undisturbed. The plan is a terminal surface — an `inferred:` surviving in a finished plan is an unresolved claim, a plan failure (register rules: the sweep skill's Claims section).

**Measured, never typed.** Every number and every pass/fail claim in an `Expected:` line or embedded gate must trace to a measurement or a derivation — memory and reasoning are not admissible sources for expectations. At authoring, wherever the value is derivable: a grounding probe that ran, the gate's matcher run over the task's own payload file (a delta gate — sweep rule 4), or a grounded absence. The one legitimate defer is post-change behavior — a planned assertion's green side — which cannot exist before implement. Three authoring beats follow:

- **Run the reds that can run.** A planned `Expected: FAIL` whose tested target exists today (a regression proof, a bug reproducer, TDD on a modification) is run at authoring and the observed failure recorded in the step. An assertion that passes today is a **vacuous pass** — the plan's premise ("this behavior is missing / this bug exists") is false; rewrite it before the plan ships, because implement's literal run cannot catch it — by then a passing red reads as drift. A red guaranteed by a grounded absence needs no run: it derives from the existence check that proved the target absent.
- **Run the controls that can run.** A positive control is a measurement to take, not a design element to supply — run at authoring wherever it can run, under the sweep skill's Claims bullet on positive controls, which owns the rule (the observed non-zero recorded; non-zero rather than an exact number over a corpus that grows; a fixture reset per case). And check the control's anchor against the payload before shipping the pair: a zero-hit gate and its control both matching text the edit removes ship as 0-vs-0, vacuous, and read at implement as a broken matcher rather than as a plan defect.
- **Ask, for every verification step: "under what conditions does this check discriminate?"** When the answer names a condition — network, environment variables, installed tools, time — the step carries a discriminates-when line with its skip rule (grammar: Task Structure below); an unconditional answer gets no annotation. A condition unmet at implement time is never a pass — the step is recorded as deferred.

Rename gates, verification greps, and ripple sweeps — grounding's own greps and any gate the plan embeds for implement to run — are sweeps: build them per the sweep skill — recall-first: substring/stem matchers, corpus repo-wide minus named-and-justified exclusions, synonym/paraphrase terms for meaning sweeps, and every gate falsifiable — expected survivors named (a KEEP list), or, for a zero-hit gate, the paired non-zero assertion through the same matcher, named with its observed result, or, for a delta gate, before/after measurements bracketing one edit with the delta derived from the task's own payload (sweep rule 4). Where that pairing is a pre-edit baseline, grounding is the only phase that can run it — once the edit is made there is no "before" left to measure — and the count it observes is a grounding fact like any other. Before any authored gate ships, check its corpus against sweep rule 2: whole corpus minus named-and-justified exclusions — an allowlist of expected sites is the recurring authoring failure, and it recurs exactly here.

An authored gate's corpus must also reach the plan's own **Creates**, which stay untracked until implement commits them — a tracked-only corpus omits them silently, and the authoring-time control cannot catch it, because the corpus only changes shape once those Creates land. Build the corpus per sweep rule 2's untracked bullet, or name the gap in the gate.

## File Structure

**The Edit anchor is minimal and unique.** A Modify addresses its edit by the smallest quoted anchor that uniquely locates it — never complete before-text, and never a line number alone (the Modify row's `:123-145` range is an authoring-time lead, staleness tolerated). Complete before-text is stored only when the target is outside git — decided mechanically at grounding: `git -C <target's directory> rev-parse --show-toplevel` (non-zero exit → ungitted). Revert belongs to git; drift detection is the anchor's match failure at apply time.

## Task Structure

Every step's checkbox heading carries a **step ID** — `T<task>S<step>` (the plugin glossary) — on every step, payload-bearing or not, so every checkbox line is unique by construction and the verifier's join never collides. The lowercase ID names the step's payload file; a step genuinely carrying several payloads suffixes letters (`t4s2a`, `t4s2b`) rather than splitting unnaturally. **The letter suffix belongs to payload filenames alone** — a step ID is always bare `T<task>S<step>`. The payload verifier rejects a suffixed checkbox at exit 2: beside a bare sibling box its gate would silently join that box, leaving the suffixed step ungated, and alone it would join none.

A red guaranteed by a grounded absence keeps the derived form — the template's T4S2 above (`Expected: FAIL with UndefinedFunctionError`) derives from grounding's existence check — and needs no authoring run.

The derivation over the payload uses the same counting unit as the gate (the unit rule: the sweep skill's Claims section) — or the Expected line can never pass; and a gate over several files asserts the sum, computed from the per-file rows.

A premise the plan relies on ("exactly 7 sites exist and this plan edits all of them") is a stamped baseline assertion (sweep rule 4): the before-step's Expected line then asserts the stamped value itself, and a mismatch at implement time is a stale-premise signal — re-sweep the site list (implement's drift valve) — never proof the edit failed.

`<source>` is the user for a user ruling, the session otherwise. Then, immediately, sweep the decision's footprint — the whole plan plus every `payloads/` file, no disposition-based exemptions — per the sweep skill: substring/stem content terms with synonyms, a spec decision ID only ever an additional matcher term (the sites that miss the ID are exactly the ones an ID-only sweep misses) — and revisit every hit against the amended statement. A spec-level amendment additionally lands its dated amendment line under the decision's `spec.md ## Decisions` entry, in-session — the same grammar, homed in define § The Spec: plan-review's decision digest is composed fresh from `spec.md`, so a plan-only record would leave the digest asserting the stale form as settled. A spec contradiction the user has NOT resolved stays under Grounding's stop default — record and stop; the marker records resolved amendments only.

The trigger is mechanical — "after any plan text exists" judges nothing about relatedness; an amendment whose sweep returns no hits simply records cheaply. Markers are append-only, never edited or deleted; when several mark one decision, the latest (by date, then document order within a date) is authoritative, and every ripple check — the moment sweep, Self-Review item 9, plan-review's amendment-ripple lens — reads sites against it. "Changed" covers narrowing: a site still claiming the wider scope is a ripple hit. Downstream, plan-review's `recordsAmendment` fact recognizes line-start `> **Amended (` in `plan.md` alone — a payload is verbatim target bytes and may legitimately carry this grammar as documentation, so an illustrative mention in plan prose stays inline-backticked, never at line start.

## Payloads

Payloads for formatted languages are authored formatter-clean at target indentation: a payload gate turning red after `mix format` is an authoring defect, not a false positive. Within one plan, payloads are disjoint regions of final-state content — a later task rewriting inside an earlier task's landed payload is an authoring defect; merge the rewrites into one payload. A file one task **creates** is closed to every later task's payload: an insertion is not a rewrite, but any later insertion into that file breaks the creating payload's contiguity just the same — a second task needing to write into it merges into the creating task, or the file's header (aliases, imports, attributes, shared helpers) is sized at creation for every task that will touch it, and where final-form headers would force unused-symbol warnings on intervening tasks the decomposition is wrong and the shared file wants a different task boundary. `whole` gates only a target no later task touches. And no payload ends on a container's closing delimiter — a `describe`'s or a module's `end`, a closing brace: trim it, so the closer is owned by no payload and a later insertion into that container has a place to land. A payload whose bytes recur in the final state gates at that count: the payload landed, position stays the Edit anchor's job. An author who wants the gate itself to pin the location **widens** the payload instead — more surrounding final-state lines, never a reshaped target: widening moves the payload's boundaries, and padding a target to buy a gate is exactly what gate-by-content forbids. A widened payload colliding with an adjacent step's payload merges under the disjointness rule just stated.

The verifier re-runs **all** gates every time: a later task clobbering a landed payload turns the earlier task's gate red — that recurring red is the clobber signal the re-run-all design exists to give, not noise. With every gate's box ticked the plan reads complete, which gives a ticked gate's red a second cause: a final-state count no gated step ever landed in full. The verifier counts at one instant and holds no history, so the note names plan completeness, never which cause produced it — the target's own history separates them.

## Re-planning (an iteration)

Four rules keep the step IDs and their gates joinable across iterations:

1. **Task numbers are append-only per topic.** A new task takes the next
   number never used in this topic's history; a dropped task retires its
   number and the gap stands. Renumbering never happens, so `t4s2` can
   only ever name one task's step.
2. **A carried-over step keeps its ID and its tick.** The tick's claim —
   this verification ran and passed — stays true wherever the work stands
   in the tree, and the payload verifier re-runs every gate, so a carried
   tick that has gone stale turns its gate red at the next implement
   rather than passing quietly.
3. **An amended step keeps its ID and unticks.** Its payload file is
   rewritten in place; the old bytes live in the state folder's history,
   or in the topic's `pre-image/` slot where the files are the record.
   Letter suffixes are never version markers — they mean "several
   payloads in one step", and nothing else.
4. **Dropped work is removed, not marked.** The task leaves the plan, its
   payloads leave `payloads/`, and the manifest states current truth
   only — no tombstones, no superseded banners.

A re-plan's Grounding fact sheet opens a dated `### Re-plan (<date>)`
block: the tree state the pre-flight found — branch, own commits,
main's delta, the stash entry, the catch-up's outcome and, where it made
one, the merge ref — and every fact this cycle re-measured. The earlier
cycle's facts stand as the record they were; one a re-measure moved is
corrected in place, under the claims discipline (the sweep skill).
