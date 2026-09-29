# Code Review — cases

The cases of the code-review skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Right-size the effort — the tier ladder

Unsure on a presentational diff → default down and say so. (Anchor: a 26-agent
xhigh review of a presentational LiveView redesign found zero correctness
bugs.)

## Phase 0.5 — The applicability gate (before any spawn)

This step's output is not decoration. A step that must produce a list cannot be
skipped the way a conditional buried in a lens body can — and the dropped list
is what keeps the preconditions falsifiable: a wrong precondition surfaces as a
lens that stopped running, rather than as silence. Carry both parts into the
final summary (→ Output).

**Zero lenses survive.** Not reachable under today's roster — A, B, Reuse,
Simplification and Altitude carry no precondition, so at least five lenses run
on any diff — so this is a safety net for a future roster, not a live outcome.
Should a later roster ever make every lens conditional and this fire, the
handling is unchanged: report "no applicable
lenses", drop to the ladder's inline read, and say so — never report it as a
clean review (charter: *Review effort*).

## Phase 0.6 — The decision digest

Spec-level decisions are in scope because they are the ones finders re-litigate
hardest: the plan states them as premises without their rationale, which is
what invites re-derivation. The `> Design decision:` notes are written by
plan-review's rewrite author beside the steps they affect (its durability
rule), and the `> **Amended (…):**` markers by write-plan's
amendment-marker duty — often a user ruling, the strongest settled class;
the digest extracts both like every other row. An absent section
contributes nothing and is not an error — most plans carry no
`> Needs confirmation:` note.

**`spec.md`'s sections are copied whole, verbatim.** A named section runs
from its `## ` heading to the next line-start `## ` heading standing
outside a fenced block — or to the file's end — and all of it is copied,
heading included: nothing selected, nothing summarised, preceded by its
`<file> § <section>` citation on a line of its own, since the copied
heading names the section but not the file. The heading match is a prefix,
so `## Out of scope (YAGNI)` and `## Decisions — settled in this session's
interview` are that section, suffix and all; a `## ` line inside a fence is
sample text, not a section boundary. The match is **plural** — every heading
matching the prefix is such a section, so a file carrying two is copied
twice, in document order. No per-entry lines — the entries keep
their own labels, and a spec-side amendment marker rides along under the
decision it amends, in the order and the form the record already has. The
composer's whole spec-side duty is a copy.

Copy rather than distil, because the record is written in **deltas**: an
amendment marker states what changed, not the decision's whole new text, so
it presupposes the entry it sits under. Any rule that picks a single text
for an entry — the statement, or the latest marker — drops the half the
other needs, and over a delta record that is data loss dressed as
compaction. The copy also never has to settle what such a rule must and the
record does not: where an entry begins inside `## Decisions`, which marker
shapes count, how a wrapped or multi-paragraph marker joins.

**Each `plan.md` entry is copied as it stands** — its own statement,
**copied, not summarised**, never selected from. A statement that wraps
across source lines unwraps onto a single line, trailed by ` — ` and its
citation; an entry running to several paragraphs — the
`**Assumptions (unverified):**` block, a multi-paragraph marker — keeps its
own line breaks instead, its citation leading it on a line of its own the
way a copied `spec.md` section's does. Unwrapping loses nothing; joining
paragraphs would, and the bare `>` separator every multi-paragraph marker
uses is exactly the join this rule then never has to specify.

**No size bound** — the extraction is mechanical, so a huge digest is a true
signal about the plan, not a formatting problem, and a bound would
reintroduce the judgement the extraction rule removes.

The citation is `<file> § <section>` — leading a copied `spec.md` section on
a line of its own, and leading a multi-paragraph `plan.md` entry the same
way; trailing a single-line `plan.md` entry after ` — `. A `plan.md` citation
carries that entry's own label after ` › ` where it has one (`Design decision`);
a copied section takes no label, its entries' own labels travelling inside
the copy. The closing rule **travels with the digest, verbatim, in every
prompt**: it raises the bar without forbidding the challenge — a plan can be
wrong, and the digest must not make it unfalsifiable. Drift that survives
that bar reaches review's dispositions as a plan-fidelity finding, never an
applied fix.

**No topic, no digest.** Standalone `/ymer:code-review` with no `plan.md` and no
`spec.md` has nothing to extract: omit the block entirely, and omit the rule
with it — a rule about a list that is not there is noise. A topic that entered
the pipeline at write-plan has no `spec.md`; its digest carries the plan-level
rows only. Neither case changes any lens.

## Phase 1 — Find candidates (one finder per surviving lens, up to 6 each)

**Host conduct after the spawn.** The host probes nothing inside any
finder's remit and prepares only artifacts that depend on no finding —
the author of six prompts holds their questions top-of-mind, and both
idling and self-answering read as diligence while costing turns or
tokens. A lens whose assigned questions every returned lens has already
answered with citations is recorded as covered, not waited on. **Write
isolation.** A finder that must **mutate to measure** — break a clause
and run the suite, the strongest evidence a plan-fidelity or
removed-behavior lens can produce — is spawned with the Agent tool's
`isolation: "worktree"` option and never touches the session's
checkout, which the host is mid-close on; and a finder's self-reported
restore is a claim verified with `git status`, never a receipt.

### Plan fidelity

Cleanup, altitude, and conventions candidates use the same
`file`/`line`/`summary` shape; in `failure_scenario`, state the concrete
cost (what is duplicated, wasted, harder to maintain, which smell is
present, or which CLAUDE.md or coding-standards rule is broken) instead of
a crash. Plan-fidelity candidates name the plan task or step and state the
divergence. Correctness bugs and plan-fidelity findings always outrank
cleanup, altitude, and conventions findings when the output cap forces a
cut.

## Phase 2 — Verify (1-vote, recall-biased, lane-routed)

**Plan fidelity sits with correctness** because both downstream rules already
price it there: this skill ranks it level with correctness bugs when the output
cap forces a cut, and review disposes every plan-fidelity finding by hand —
`--fix` never applies one, and an approach-level divergence routes the topic
back. A false REFUTE ships a real divergence; a false CONFIRM sends a topic
back wrongly. Both errors are expensive — the reason this lens gets a
per-candidate verifier rather than a batched one.

**The inline lane is keyed, not judged.** A Conventions candidate is verdicted
inline only when the finder quoted **both sides** — the rule text and the code
line. Conventions is required to do exactly that already. A Conventions
candidate arriving without both quotes is not inline-verdictable and joins the
cleanup batch.

**Batch arithmetic:** ~8 candidates per batch verifier, `ceil(n/8)` verifiers,
all spawned at once. If the host cannot spawn them all concurrently, run them
in waves and say so in the summary. The rule keys on an **observable** — the
spawn was queued or refused — not on a number: the suite documents no subagent
cap for the Agent tool, and the only cap this session can read governs the
Workflow tool, which this skill does not use. Hardcoding a once-observed number
would bake it into the procedure.

**Promote on depth.** A batch verifier that cannot settle a candidate from the
quoted evidence returns `needs_deeper` instead of a verdict, and the host
re-runs that candidate through the per-candidate lane. This is the verifier
judging its own reach, not a sizing judgement, and it fails safe: the only
direction it can move a candidate is toward more scrutiny.
