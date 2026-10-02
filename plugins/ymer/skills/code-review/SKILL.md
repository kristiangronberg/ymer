---
name: code-review
description: Use to adversarially review a code diff — the implementation, not the plan (that is plan-review). Invoked with --fix as the pipeline's lens pass — pre-executed at implement's close, run by review as the fallback — or standalone as /ymer:code-review [target]; --fix applies the findings that have one right answer.
---

# Code Review

This file is the code-review skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

Adversarial review of a code **diff** — the last net before main, and
plan-review's implementation-side sibling (that skill reviews the plan
document; this one reviews the code). Seeded verbatim from the front's own
built-in code-review command's high-effort cell; provenance and the complete
fragment record live in the topic folder.
Three deliberate additions on top of the seed: the Smells lens, the
Plan-fidelity lens, and the Conventions lens widened to the plan-named
coding-standards skill. Nothing in a review run is set by hand — the tier is
keyed by risk profile and routing inside it is derived; evolution rides
captured evidence, not ad-hoc edits.

**Announce at start:** "I'm using the code-review skill to review the diff."

Invoked as the pipeline's lens pass — implement's close pre-executes it,
review runs it as the fallback; the primary context either way, and the
caller supplies the diff scope, the `--fix` flag, and the topic's
`plan.md` and `spec.md` paths — or standalone as `/ymer:code-review [target]`.

`high effort → the surviving lens roster × 6 candidates → lane-routed 1-vote verify (recall-biased) → ≤10 findings`

You are reviewing for **recall** at high effort: catch every real bug a careful
reviewer would catch in one sitting. At this level, catching real bugs matters
more than avoiding false positives. Err on the side of surfacing.

## Right-size the effort — the tier ladder

*Read with this section: `cases.md` § Right-size the effort — the tier ladder (the cases).*

Three tiers, keyed by the diff's **risk profile**. The key itself — the four
dimensions, and the rule that file count and artifact kind are never the key
alone — lives in the development-process charter's *Review effort* section;
this ladder points there rather than restating it.

- **inline read** — presentational HEEx/CSS, docs, config, and mechanical
  refactors that are already TDD-green: high mechanicalness, no trust
  boundary, contained blast radius.
- **this skill's full pass** — non-trivial business logic, new context
  functions, changed query semantics.
- **`ultra`**, the front's own escalated code-review run — correctness-critical
  diffs: concurrency, money, data migrations, security/trust boundaries, gnarly
  state machines, where a missed bug is expensive.

**Nothing in this run is set by hand.** The tier is keyed by risk profile;
inside the tier, the roster comes from Phase 0.5's applicability gate and each
candidate's verify lane from the lens that produced it. There is no per-run
sizing question and no hand-maintained exclusion list. A rule that would have to be
phrased "judge whether…" belongs in neither place.

## Phase 0 — Gather the diff

*Read with this section: `mechanics.md` § Phase 0 — Gather the diff (the mechanics).*

## Phase 0.5 — The applicability gate (before any spawn)

*Read with this section: `cases.md` § Phase 0.5 — The applicability gate (before any spawn) (the cases).*

Every lens below either opens with a `**Precondition:**` line or is
unconditional. Evaluate each precondition against what you already hold — the
diff, the topic's `plan.md` path, the CLAUDE.md files that govern the changed
paths — and **output the result as a two-part list before spawning anything**:

```
Roster (will run): <lens names>
Dropped: <lens name> — <the precondition that failed>
```

Lenses with no `**Precondition:**` line always run. In doubt, a precondition
reads **true** — it asks only whether the lens has anything to read, never
whether it would find anything (charter: *Review effort*).

**Never spawn a lens to find out whether it applies.** Paying a full agent to
discover it had nothing to say is the waste this gate removes.

## Phase 0.6 — The decision digest

*Read with this section: `cases.md` § Phase 0.6 — The decision digest (the cases).*

Compose one record of what is already settled and embed it **verbatim
in every finder prompt and every verifier prompt**. Inline, not a path: an
agent cannot skip text already in its prompt, whereas a path is an instruction
it may deprioritise — and a finder that silently skips the digest produces
exactly the re-litigated candidate the digest exists to stop. A scratchpad file
would also add a tool call per agent and create a file whose lifetime nobody
owns.

**Extraction is mechanical — named sections only, no judgement:**

| Source | Section |
|---|---|
| `spec.md` | `## Decisions` |
| `spec.md` | `## Out of scope` |
| `plan.md` | the `**Assumptions (unverified):**` block |
| `plan.md` | every `> Needs confirmation:` note |
| `plan.md` | every `> Design decision:` note |
| `plan.md` | every line-start `> **Amended (…):**` amendment marker |

Render it exactly like this and paste the whole block into each prompt:

```
SETTLED — DO NOT RE-LITIGATE

spec.md § Decisions

## Decisions

### D3 — retry policy
Q: how do we handle transient failures?
A: 3 attempts, exponential backoff.
Rationale: bounded work per request.

> **Amended (<source>, <date>):** retries unbounded; a circuit breaker caps
> the damage instead.

spec.md § Out of scope

## Out of scope

<the section's own lines, verbatim>

plan.md § Assumptions (unverified)

<the block's own lines, verbatim>

- <the entry's statement, verbatim, on one line> — plan.md § Task 4 › Design decision

Contradicting a settled decision requires arguing why the decision is wrong —
otherwise do not report the contradiction.
```

## Phase 1 — Find candidates (one finder per surviving lens, up to 6 each)

*Read with this section: `mechanics.md` § Phase 1 — Find candidates (one finder per surviving lens, up to 6 each) (the mechanics) and `cases.md` § Phase 1 — Find candidates (one finder per surviving lens, up to 6 each) (the cases).*

### Lens A — line-by-line diff scan

Read every hunk in the diff, line by line. Then Read the enclosing function for
each hunk — bugs in unchanged lines of a touched function are in scope (the PR
re-exposes or fails to fix them). For every line ask: what input, state, timing,
or platform makes this line wrong? Look for inverted/wrong conditions,
off-by-one, null/undefined deref, missing `await`, falsy-zero checks,
wrong-variable copy-paste, error swallowed in catch, unescaped regex metachars.

### Lens B — removed-behavior auditor

For every line the diff DELETES or replaces, name the invariant or behavior it
enforced, then search the new code for where that invariant is re-established.
If you can't find it, that's a candidate: a removed guard, a dropped error
path, a narrowed validation, a deleted test that was covering a real case.

### Lens C — cross-file tracer

**Precondition:** the diff touches at least one non-prose source file (any
extension other than `.md`/`.txt` — a JSON or config file counts).

For each function the diff changes, find its callers (Grep for the symbol) and
check whether the change breaks any call site: a new precondition, a changed
return shape, a new exception, a timing/ordering dependency. Also check callees:
does a parallel change in the same PR make a call unsafe?

### Reuse

The lenses above hunt for bugs; this one and the next three hunt for cleanup in
the changed code. Flag new code that re-implements something the codebase
already has — Grep shared/utility modules and files adjacent to the change,
and name the existing helper to call instead.

### Simplification

Flag unnecessary complexity the diff adds: redundant or derivable state,
copy-paste with slight variation, deep nesting, dead code left behind. Name
the simpler form that does the same job.

### Efficiency

**Precondition:** the diff touches at least one non-prose source file (any
extension other than `.md`/`.txt` — a JSON or config file counts).

Flag wasted work the diff introduces: redundant computation or repeated I/O,
independent operations run sequentially, blocking work added to startup or
hot paths. Also flag long-lived objects built from closures or captured
environments — they keep the entire enclosing scope alive for the object's
lifetime (a memory leak when that scope holds large values); prefer a
class/struct that copies only the fields it needs. Name the cheaper
alternative.

### Smells (Fowler baseline)

**Precondition:** the diff touches at least one non-prose source file (any
extension other than `.md`/`.txt` — a JSON or config file counts).

Match the changed code against this fixed smell baseline (Fowler,
_Refactoring_ ch. 3); it applies even when a repo documents nothing. Each
smell reads *what it is* → *how to fix*:

- **Mysterious Name** — a function, variable, or type whose name doesn't
  reveal what it does or holds. → rename it; if no honest name comes, the
  design's murky.
- **Duplicated Code** — the same logic shape appears in more than one hunk
  or file in the change. → extract the shared shape, call it from both.
- **Feature Envy** — a method that reaches into another object's data more
  than its own. → move the method onto the data it envies.
- **Data Clumps** — the same few fields or params keep travelling together
  (a type wanting to be born). → bundle them into one type, pass that.
- **Primitive Obsession** — a primitive or string standing in for a domain
  concept that deserves its own type. → give the concept its own small
  type.
- **Repeated Switches** — the same `switch`/`if`-cascade on the same type
  recurs across the change. → replace with polymorphism, or one map both
  sites share.
- **Shotgun Surgery** — one logical change forces scattered edits across
  many files in the diff. → gather what changes together into one module.
- **Divergent Change** — one file or module is edited for several
  unrelated reasons. → split so each module changes for one reason.
- **Speculative Generality** — abstraction, parameters, or hooks added for
  needs the spec doesn't have. → delete it; inline back until a real need
  shows.
- **Message Chains** — long `a.b().c().d()` navigation the caller
  shouldn't depend on. → hide the walk behind one method on the first
  object.
- **Middle Man** — a class or function that mostly just delegates onward.
  → cut it, call the real target direct.
- **Refused Bequest** — a subclass or implementer that ignores or
  overrides most of what it inherits. → drop the inheritance, use
  composition.

Two rules bind the baseline: a documented repo standard overrides it —
where the repo endorses something the baseline would flag, suppress the
smell — and anything tooling already enforces is skipped. Every smell
finding is a labelled judgment call ("possible Feature Envy"), never a
hard violation.

### Altitude

Check that each change is implemented at the right depth, not as a fragile
bandaid. Special cases layered on shared infrastructure are a sign the fix
isn't deep enough — prefer generalizing the underlying mechanism over adding
special cases.

### Conventions (CLAUDE.md + coding standards)

*Read with this section: `mechanics.md` § Conventions (CLAUDE.md + coding standards) (the mechanics).*

**Precondition:** at least one CLAUDE.md governs a changed path, or the topic's
plan header names a coding-standards skill.

Only flag a violation when you can quote the exact rule and the exact line
that breaks it — no style preferences, no vague "spirit of the doc"
inferences. In the finding, name the CLAUDE.md path (or the skill) and quote
the rule so the report can cite it.

### Plan fidelity

*Read with this section: `cases.md` § Plan fidelity (the cases).*

**Precondition:** a `plan.md` applies. The lens pass's caller supplies the
path; standalone, resolve it from the current branch name (the topic slug)
and the repo's Roadmap project (*look up topic* — binding: the
operations contract). No
pipeline topic → no plan, and this lens is dropped at Phase 0.5 rather than
spawned to return nothing.

Review the diff against the topic's `plan.md` — the implementation plan the diff
claims to implement. Surface:

- planned behavior that is missing or partial,
- behavior the plan did not ask for,
- planned behavior that looks implemented but wrong.

Each finding names the plan task or step it diverges from.

Pass every candidate with a nameable failure scenario through — finders that
silently drop half-believed candidates bypass the verify step and are the
dominant cause of misses.

## Phase 2 — Verify (1-vote, recall-biased, lane-routed)

*Read with this section: `cases.md` § Phase 2 — Verify (1-vote, recall-biased, lane-routed) (the cases).*

Dedup near-duplicates (same defect, same location, same reason → keep one).
Then route each survivor to its **verify lane** — keyed to the lens that
produced it, never judged:

| Lane | Producing lens | Verify |
|---|---|---|
| correctness | A, B, C, **Plan fidelity** | one Opus verifier per candidate |
| cleanup | Reuse, Simplification, Efficiency, Smells, Altitude | batched, digest in hand |
| quote-vs-rule | Conventions | host-inline verdict |

Every verifier — per-candidate, batched, or the host verdicting inline — gets
the diff, the relevant file(s), the candidate, and Phase 0.6's digest block
verbatim, and returns exactly one of **CONFIRMED / PLAUSIBLE / REFUTED**.
Subagent verifiers run via the Agent tool on Opus, as in Phase 1.

**PLAUSIBLE by default** — do not refute a candidate for being "speculative" or
"depends on runtime state" when the state is realistic: concurrency races,
nil/undefined on a rare-but-reachable path (error handler, cold cache, missing
optional field), falsy-zero treated as missing, off-by-one on a boundary the
code does not exclude, retry storms / partial failures, regex/allowlist that
lost an anchor. These are PLAUSIBLE.

**REFUTED** only when constructible from the code: factually wrong (quote the
actual line); provably impossible (type/constant/invariant — show it); already
handled in this diff (cite the guard); or pure style with no observable effect.

Keep **CONFIRMED and PLAUSIBLE**. Drop REFUTED.

## Output

**When the ReportFindings tool is in your tool set:** call it once to
report this review's results with `{level: "high", findings}`. `findings`
is at most 10 entries ranked most-severe first; each entry has `file`,
`line`, `summary`, `short_summary` — the claim compressed to ≤60
characters, no rationale or consequence clause — `failure_scenario`, and
`category` — a short kebab-case slug for the lens that produced it
(`correctness`, `reuse`, `simplification`, `efficiency`, `smell`,
`altitude`, `conventions`, `plan-fidelity`, or a more specific slug like
`test-coverage` when one fits better) — plus `verdict` when a verify pass
produced one. If more than 10 survive, keep the 10 most severe. If nothing
survives verification, call it with an empty array. Do not also print the
findings as text, and do not create or publish an artifact of the review —
the tool call is the report. That binds this run's own output: a caller
recording the findings and their dispositions in its own phase artifact
(review's `review.md`) is the caller's record, not this run's.

**Beside the report, always state Phase 0.5's two lists** — the roster that ran
and every dropped lens with the precondition that failed — plus any lens that
was batched in waves (→ Phase 2). A findings list read without the roster
cannot distinguish "this dimension was clean" from "this dimension never ran".

**When it is not:** return findings as a JSON array of at most 10 objects:

```json
[
  {
    "file": "path/to/file.ext",
    "line": 123,
    "summary": "one-sentence statement of the bug",
    "failure_scenario": "concrete inputs/state → wrong output/crash"
  }
]
```

Ranked most-severe first. If more than 10 survive, keep the 10 most
severe. If nothing survives verification, return `[]`.

## Applying fixes (--fix)

*Read with this section: `mechanics.md` § Applying fixes (--fix) (the mechanics).*

Only when the `--fix` flag was passed. After producing the findings list,
apply the findings to the working tree instead of stopping at the report.
**The line is attention-worthiness, not behavior-preservation**: apply what
has one right answer, report what decides something.

- **Apply** — a correctness bug with an obvious intended fix;
  reuse/simplification/efficiency cleanups; a violation of an existing
  documented convention (a quoted CLAUDE.md or coding-standards rule).
- **Report for disposition, never apply** — a fix that decides between
  genuine alternatives: a representation change (map → struct), a real
  trade-off, a possible new convention direction, a smell or altitude
  finding (labelled judgement calls by construction); and **every
  plan-fidelity finding** — deviation from the plan is the caller's
  disposition subject, and the caller may have deviated on purpose.
- **Skip** — a fix that would change intended behavior, reach well
  outside the reviewed diff, or that you judge a false positive — note
  the skip rather than arguing with it.

## Fallback — Agent tool absent or refused

*Read with this section: `mechanics.md` § Fallback — Agent tool absent or refused (the mechanics).*

### Phase 2 — Dedup and self-check (no subagent verify)

*Read with this section: `mechanics.md` § Phase 2 — Dedup and self-check (no subagent verify) (the mechanics).*
