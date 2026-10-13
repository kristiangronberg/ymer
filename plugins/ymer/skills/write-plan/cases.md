# Writing Plans: cases

The cases of the write-plan skill: the precision earned from plans that
went wrong once. The headings are `SKILL.md`'s own; read a section's
entries at the moment that section runs.

## Contents

- Scope Check: an alternative rejected as unprobed
- Grounding: the decomposition sketch, a deferred glossary term, the claim classes, inherited `inferred:` marks, measured, never typed, gates as sweeps, a corpus that reaches the plan's Creates
- File Structure: every address locates by content
- Task Structure: step IDs, a derived red, the counting unit, a stamped premise, the amendment's footprint recipe
- Payloads: formatter-clean final state, disjoint payloads, closed files, the closer rule, re-running every gate
- Re-planning: four rules for step IDs across iterations, and the re-plan's fact sheet

## Scope Check

An alternative rejected as "unprobed" names the cheapest read that
settles it and runs it (a read-only call, one grep), or marks the
unknown `inferred:`, so the next phase sees a claim rather than an
absence it cannot accept as a measurement.

## Grounding

**Sketch the decomposition before writing any question list.** A few
lines naming the tasks you intend, held in the session, not a
deliverable, and discarded once the question lists exist. The sketch
fixes the precision the steps will demand: a question list written
without it comes back at the wrong grain (a fact sheet answering "which
tests cover X" where the steps needed each test classed as a success or
an error path, which the plan then paid for by a rewrite at
self-review). Cut the sketch by where edits land, file regions, not by
concern, so disjoint payloads fall out of it; where one large payload
carries the plan's risk, the sketch is that payload's inner structure.
Name each content edit insert or replace before any step ID is fixed,
so every replacement's removal gate is planned with it. This holds
whether the questions go to Explore agents or to yourself.

**A term the spec's glossary delta records as deferred** is the
deliberate exception, not an unnamed concept to send back: define's
referent gate holds the entry back until the thing it names is real, so
the glossary does not carry it yet, and this plan is where it lands.
Take the definition sentence from the delta, and give the entry its own
task (the entry and any code-home or prose-home sentence it needs),
landing in the same change as its referent.

**The fact sheet's contract** is claim-driven: every claim the plan
states, relies on or embeds traces to a verified fact in the fact
sheet, or is flagged as an assumption. Every Create or Modify label and
every named anchor traces to a verified fact, never to memory, and so
does every other class of claim. The known classes, each with its
recipe (not a closed list: a claim outside every class still falls
under the contract):

1. **References.** Where grounding greps for a referent's occurrences
   (a route, a path, a name), grep the literal value in every syntactic
   form it can take (raw strings, selectors, crafted literals), never
   only the idiomatic sigil or macro form. A grep over one syntax is
   incomplete by construction.
2. **Commands.** Every command a plan step quotes (`Run:` lines, any
   named executable) resolves: check it exists during grounding (`mix
   help <task>`, `which <cmd>`, a `--help` probe). A gate's `Run:` line
   reads its producer's exit status and output: no final pipeline stage
   masks a failed producer (`| tail`, `| grep -v`), and the output
   window is wide enough to show the baseline it asserts against.
   Existence is grounding's; of the expected-output claims, only
   post-change behaviour, a planned assertion's green side, waits for
   implement. Every other expected value falls under measured, never
   typed, this section's paragraph of that name.
3. **Runtime and harness behaviour.** Probe, else flag: a claim that
   can be checked in the session (run the command, call the tool, read
   the harness docs) is probed during grounding, and deferring a
   checkable claim is a plan failure. A claim that genuinely cannot be
   checked enters the plan header's `**Assumptions (unverified):**`
   block, one bullet per claim with its impact-if-false and the tasks
   affected, read downstream as risk, not fact (its reader: the
   code-review skill's decision digest). A probe that justifies a claim
   about a gate runs the gate's exact invocation and configuration:
   probing the underlying tool with default flags grounds nothing. A
   dependency the project has not fetched yet is fetched at its target
   version into the scratchpad with its ecosystem's own fetch command
   (`mix hex.package fetch <dep> <version> --unpack`, say), and its
   source is the ground for every claim about it; web docs and a
   research agent's summary are neither.
4. **Usage facts.** A fact about how an API or helper is *used* needs
   one complete existing call site quoted whole in the fact sheet (one
   full existing test, say): the definition alone is no evidence of the
   usage shape.
5. **Measurements.** A new column or field storing a measurement gets
   a dynamic-range check: sample the phenomenon's actual magnitude (a
   probe or existing data) before picking its unit, precision or type.
   Prior art in log lines is no evidence.
6. **Embedded prose.** Prose inside content the plan embeds (planned
   module docs and docstrings, comments, Dockerfile and config
   comments, README fragments) is made of claims: check each against
   the codebase *and* against the plan's own grounding facts. A
   conflict between the two is a grounding failure to resolve, not a
   wording issue.
7. **Absences.** A grounding absence (a "does not exist" fact, a zero
   count) is a measured claim: stamp it, the matcher quoted with its
   observed zero, and name its positive control (the mechanisms: the
   sweep skill, § 4. Survivors: every gate must be able to fail). Only
   absences stamped this way feed forward, into plan-review's
   "pre-verified facts — do not re-flag" list among other places.

**Inherited `inferred:` marks.** Upstream artifacts arrive marked:
sweep the inherited artifacts (`brainstorm.md`, `survey.md`, `spec.md`)
for the literal marker (`grep -rn -F 'inferred:'` over the topic
folder) and resolve every mark the plan relies on, probed to a fresh
stamp where it can be checked, moved into the assumptions block with
its impact-if-false where it cannot. A fan-out fact sheet is never on
disk, so this grep cannot see it: it is resolved at synthesis
(`mechanics.md` § Grounding). Marks the plan does not rely on stay
where they are. The plan is a terminal surface, so an `inferred:` left
in a finished plan is an unresolved claim and a plan failure.

**Measured, never typed.** Every number and every pass or fail claim in
an `Expected:` line or an embedded gate traces to a measurement or a
derivation made at authoring wherever the value can be derived: a
grounding probe that ran, the gate's matcher run over the task's own
payload file (a delta gate), or a grounded absence. The one legitimate
defer is post-change behaviour, a planned assertion's green side, which
cannot exist before implement. Three beats follow at authoring:

- **Run the reds that can run.** A planned `Expected: FAIL` whose
  tested target exists today (a regression proof, a bug reproducer, TDD
  on a modification) is run at authoring and the observed failure
  recorded in the step. An assertion that passes today is a vacuous
  pass: the plan's premise ("this behaviour is missing", "this bug
  exists") is false. Rewrite it before the plan ships, because
  implement's literal run cannot catch it: by then a passing red reads
  as drift. A red guaranteed by a grounded absence needs no run: it
  derives from the existence check that proved the target absent.
- **Run the controls that can run.** A positive control is a measurement
  to take, not a design element to supply: run it at authoring wherever
  it can run, as the sweep skill's § Claims says, read at `SKILL.md` §
  Input and again at the first gate. Then check the control's anchor
  against the payload before the pair ships: a zero-hit gate and its
  control that both match text the edit removes ship as 0 against 0,
  vacuous, and read at implement as a broken matcher rather than a plan
  defect.
- **Ask, for every verification step: "under what conditions does this
  check discriminate?"** Where the answer names a condition (network,
  environment variables, installed tools, time), the step carries a
  discriminates-when line with its skip rule (its grammar: `SKILL.md`
  § Task Structure); an unconditional answer gets none. A condition
  unmet at implement is never a pass: the step is recorded as deferred.

**Gates are sweeps** (`SKILL.md` § Grounding). Where a gate's pairing is
a pre-edit baseline, grounding is the only phase that can run it, since
once the edit is made there is no before left to measure; the count it
observes is a grounding fact like any other. Before any authored gate
ships, check its corpus against the sweep skill's § 2. Corpus:
everything, minus exclusions you name: an allowlist of expected sites is
the recurring authoring failure, and it recurs exactly here.

**A gate's corpus reaches the plan's own Creates**, which stay
untracked until implement commits them. A corpus of tracked files only
omits them silently, and the authoring-time control cannot catch it,
because the corpus changes shape only once those Creates land. Build
the corpus per the untracked-files bullet (the sweep skill,
`mechanics.md` § 2. Corpus: everything, minus exclusions you name), or
name the gap in the gate.

## File Structure

**Every address a step uses locates by content.** A Modify addresses
its edit by the smallest quoted anchor that locates it uniquely, never
complete before-text and never a line number alone: the Modify row's
`:123-145` range is a lead from authoring, and staleness is tolerated
there. The same holds for every other address a step uses: a
verification step that reads a region addresses it by content (`sed -n
'/^## X$/,/^### Y/p'`), never by line numbers over a file an earlier
step edits. An anchor's uniqueness is a measured claim like any other,
stamped with its count. Complete before-text is stored only where the
target is outside git, decided mechanically at grounding: `git -C
<target's directory> rev-parse --show-toplevel`, a non-zero exit
meaning ungitted. Revert belongs to git, and drift shows as the
anchor's match failure at apply time.

## Task Structure

**Every step's checkbox heading carries its step ID**, payload or not,
so every checkbox line is unique by construction and the verifier's
join never collides. A step that genuinely carries several payloads
suffixes letters to their files (`t4s2a`, `t4s2b`) rather than splitting
unnaturally, and the suffix belongs to payload files alone: a step ID
is always bare `T<task>S<step>`. A suffixed checkbox beside a bare
sibling box would let its gate join that box silently, leaving the
suffixed step ungated, and alone it would join none; the verifier
rejects one (its header, read at `SKILL.md` § Payloads).

**A red guaranteed by a grounded absence** keeps the derived form (the
template's T4S2 in `SKILL.md` § Task Structure, `Expected: FAIL with
UndefinedFunctionError`, derives from grounding's existence check) and
needs no run at authoring.

**The derivation over a payload counts in the gate's own unit** (the
unit rule: the sweep skill, `cases.md` § Claims: stamps, controls and
the sweep artifact), or the `Expected:` line can never pass; and a gate
over several files asserts the sum, computed from the per-file rows.

**A premise the plan relies on** is a stamped baseline assertion (the
sweep skill, § 4. Survivors: every gate must be able to fail): the
before-step's `Expected:` line asserts the stamped value itself, and a
mismatch at implement goes to implement's drift valve.

**The amendment's footprint recipe.** Recording an amendment marker
(`SKILL.md` § Task Structure) sweeps the decision's footprint at once,
with the sweep skill's matcher and mode (§ 1. Matcher: stems and
substrings, not whole words; § 3. Mode: a meaning sweep never rides one
phrasing): substring and stem content terms with their synonyms, and a
spec decision ID only ever an additional matcher term, since the sites
that miss the ID are exactly the ones an ID-only sweep misses. Its
corpus is the whole plan and every `payloads/` file, with no exemption
by disposition, and `spec.md` as well where the amendment rewrites text
`spec.md` quotes or derives values from (counts, "exactly N" gates,
check tables). Revisit every hit against the amended statement. A hit
inside a payload whose step is ticked has landed: outside a re-plan it
is not rewritten, and the amending session lists it under the marker
as a landed record for write-plan; a re-plan turns it into a new step
(§ Re-planning, rule 3). An amendment whose sweep finds no hits records
cheaply.

A spec-level amendment also lands its dated amendment line under the
decision's `spec.md` `## Decisions` entry, in the same session, in the
same grammar (its spec side: the define skill, § The Spec, read at
`SKILL.md` § Task Structure):
plan-review's decision digest is composed fresh from `spec.md`, so a
record in the plan alone would leave the digest asserting the stale
form as settled. A spec contradiction the user has not resolved stays
under `SKILL.md` § Input's stop default: the marker records resolved
amendments only.

## Payloads

**A formatted target's planned final state is formatter-checked at
authoring.** Payloads for a formatted language are written
formatter-clean at the target's indentation: a payload gate turning red
after the formatter runs is an authoring defect, not a false positive. A
payload that is part of a file does not parse alone, so compose the
target's planned final state in a scratch copy, every planned payload
applied at its Edit anchor, run the project's formatter over it in check
mode (or through stdin and a diff), and stamp the result in the
Grounding fact sheet. A target several tasks touch is checked once,
whole, every payload applied.

**Payloads are disjoint regions of final-state content.** A later task
rewriting inside an earlier task's landed payload is an authoring
defect: merge the rewrites into one payload. A file one task
**creates** is closed to every later task's payload: an insertion is
not a rewrite, but any later insertion into that file breaks the
creating payload's contiguity just the same. A second task that must
write into it merges into the creating task, or the file's header
(aliases, imports, attributes, shared helpers) is sized at creation for
every task that will touch it; where final-form headers would force
unused-symbol warnings on the tasks between, the decomposition is
wrong, and the shared file wants a different task boundary. A `whole`
gate gates only a target no later task touches.

**The closer rule.** No payload ends on the closing delimiter of a
container a later task's payload inserts into (a `describe`'s or a
module's `end`, a closing brace): trim it, so the closer is owned by no
payload and that insertion has a place to land.

**Recurring bytes.** A payload whose bytes recur in the final state
gates at that count: the payload landed, and position stays the Edit
anchor's job. An author who wants the gate itself to pin the location
**widens** the payload (more surrounding final-state lines), never
reshapes the target: widening moves the payload's boundaries, and
padding a target to buy a gate is exactly what gating by content
forbids. A widened payload that collides with a neighbouring step's
payload merges with it under the disjointness rule.

**Every gate re-runs every time.** A later task clobbering a landed
payload turns the earlier task's gate red: that recurring red is the
clobber signal the design exists to give, not noise. With every gate's
box ticked the plan reads complete, which gives a ticked gate's red a
second cause: a final-state count no gated step ever landed in full.
The verifier counts at one instant and keeps no history, so its note
names plan completeness, never which cause produced the red; the
target's own history tells them apart.

## Re-planning

Four rules keep the step IDs and their gates joinable across
iterations:

1. **Task numbers are append-only per topic.** A new task takes the
   next number never used in this topic's history; a dropped task
   retires its number, and the gap stands. Nothing is renumbered, so
   `t4s2` only ever names one task's step.
2. **A carried-over step keeps its ID and its tick.** The tick's claim,
   that this verification ran and passed, stays true wherever the work
   stands in the tree, and the verifier re-runs every gate, so a carried
   tick that has gone stale turns its gate red at the next implement
   rather than passing quietly.
3. **A landed step is never unticked or rewritten.** A step whose
   payload has landed keeps its tick and its payload. A change to
   landed content is a new step with a fresh ID (rule 1), whose payload
   carries the final-state lines; the payload files it supersedes leave
   `payloads/` with their gates (rule 4), and a pure addition takes a
   payload of its own, so landed neighbours stay contiguous. A step not
   yet landed is amended in place and keeps its ID; its old bytes live
   in the state folder's history, or in the topic's `pre-image/` slot
   where the files are the record. Letter suffixes are never version
   markers: they mean several payloads in one step, and nothing else.
4. **Dropped work is removed, not marked.** The task leaves the plan,
   its payloads leave `payloads/`, and the manifest states current
   truth only: no tombstones, no superseded banners.

A re-plan's Grounding fact sheet opens a dated `### Re-plan (<date>)`
block: the tree state the pre-flight found (the branch, its own
commits, main's delta, the stash entry, the catch-up's outcome and,
where it made one, the merge ref) and every fact this cycle measured
again. The earlier cycle's facts stand as the record they were; one a
new measurement moved is corrected in place, under the sweep skill's
§ Claims.
