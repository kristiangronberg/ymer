---
name: sweep
description: Builds find-all-sites lists that miss nothing, and keeps the claims written into pipeline artifacts checkable. Use when building any list that claims to cover every place a term, name, path or meaning occurs (a rename gate, a ripple sweep, a verification grep, a dead-reference hunt), and when reporting a count, an absence, or a load-bearing claim nothing measured. Not for deciding whether a sweep is warranted: that is the caller's call.
---

# Sweep: building find-all-sites lists

A sweep is any list built to cover *every* site where something occurs:
a rename gate, a ripple sweep after a term changes, a vocabulary sweep
in a direction doc, a verification grep in a plan, a dead-reference
hunt. This skill says how to build one so that it misses nothing, and
how to report what a search found so that the next reader can check
it. One stance governs every sweep:

**Recall first: over-approximate the matcher and the corpus, then
filter false positives by reading. A miss is unrecoverable, because
nothing downstream looks again; a false positive costs only reading
time.**

A sweep under-approximates in exactly three ways: its matcher, its
corpus and its mode. Rules 1 to 3 answer one each. Rule 4 keeps the
over-matching checkable and every gate able to fail, and the Claims
section binds how a result is reported.

A reported count or zero is a **compressed sweep result**. Any count,
ratio or absence a search or probe produced, in any pipeline artifact
and over any corpus (a repository, the web, a database, a live tool),
is a **measured claim** and owes the Claims rules: a stamp always, and
a positive control when the result is an absence or a zero. A design
parameter is not a measured claim, since nothing was measured, and
neither is a report that is empty by design: `git status` printing
nothing is a tool's answer about state, not a matcher's zero, so it
carries no risk of a silent zero.

Claims nothing measured ride a second register at the same home. A
**load-bearing** claim, one that a decision, an ordering, a gate or a
scope exclusion rests on, is probed or carries the literal marker
`inferred:`; and an external fact measured earlier is re-verified when
it is used, or carries `as-of <basis>`.

This file states every rule. `mechanics.md` holds how a corpus is
named on disk, with git and the shell; `cases.md` holds the precision
earned from sweeps and reports that went wrong: the exact stamp forms,
the counting units, how a delta is derived, and the cases behind a
rule. Both sit under this file's headings, and a section with entries
there names them in a line of its own.

## 1. Matcher: stems and substrings, not whole words

*Read with this section: `cases.md` § 1. Matcher: stems and substrings, not whole words (the cases: where word boundaries and alternation syntax fail silently, and where a machine's own grep and a repository's own facts are described).*

- Match stems and substrings, not whole words: `disposab`, not
  `disposable`. An exact-word list misses stem variants
  (`disposability`) and snake_case compounds (`runner_outcomes` when
  hunting `runner`).
- Pick the matcher by the question. "A standalone token, not part of a
  longer name" takes a boundary-aware pattern (a PCRE lookaround).
  "Did this word fully leave the corpus" takes a plain case-insensitive
  substring, with the over-match handled by rule 4.
- A phrase in prose may span a line break. Hard-wrapped text splits a
  phrase wherever the wrap falls, and a matcher that reads one line at
  a time counts the split phrase as absent. Match a phrase across
  whitespace in multiline mode (`rg -U` with `\s+` between its words,
  for example), so that a wrap counts as the space it stands for.
- Positive-control the matcher: before trusting "no output" as a pass,
  confirm that the same matcher prints known hits somewhere. A
  silently broken matcher is indistinguishable from a clean corpus.

## 2. Corpus: everything, minus exclusions you name

*Read with this section: `mechanics.md` § 2. Corpus: everything, minus exclusions you name (the mechanics: untracked files, naming the corpus by absolute path, and the `rg -g` glob that needs a `**/` prefix) and `cases.md` § 2. Corpus: everything, minus exclusions you name (the cases: verifying against what is built, how an exclusion list over-reaches, and the relative corpus that counted 1 where there were 148).*

- Sweep the whole repository and subtract named, justified exclusions
  (generated output, vendored trees, frozen migrations). Never
  enumerate the directories where hits are expected: the sites nobody
  expected are what a sweep exists to find, and an allowlist is how a
  `docker-compose.yml` at a repository's root kept a dead pointer
  through two gates.
- Generated output is excludable only while the claim is not about it.
  When the claim is about what gets built, the built artifact is the
  corpus.
- The exclusion list is a third matcher: it deletes hits as surely as
  the pattern selects them, and its over-reach never shows in the
  output. Prove it the way the matcher is proved: rule 4's gates reach
  it, and its survivors are shown to print.
- Hidden files count. Know whether your tool skips files whose names
  begin with a dot, or gitignored files, by default, and turn that off
  deliberately.
- An interim gate may scope narrower (the files a task just edited),
  but the final gate runs over the whole corpus.

## 3. Mode: a meaning sweep never rides one phrasing

- When the target is a meaning rather than a literal token, one
  phrasing is one syntactic form, not the sweep. Add synonyms,
  paraphrases and spelling or hyphenation variants ("work item",
  "work-item"), then finish with a read pass at the concept's home
  sites: the files where the meaning lives, whatever its wording.
- Literal referents take several forms too: a module has a name and a
  file path, and a route has a helper and a raw string. Each form needs
  its own matcher, since a name gate is structurally blind to a stale
  path.
- A family of shapes is generalized one level up before it is swept.
  A list of shapes handed over by a survey, a finding or an earlier
  gate holds the shapes somebody has already seen; the family they
  belong to is what the sweep is for. Over-approximating each matcher
  does not widen the list itself, so name the family one level above
  the shapes seen, and sweep for that.

## 4. Survivors: every gate must be able to fail

*Read with this section: `cases.md` § 4. Survivors: every gate must be able to fail (the cases: why the pairing mechanisms are not equal, how a delta's measures bracket the edit and how its expected difference is derived, why a control's anchor sits outside the edit corpus and naming the file it is on, a stamped baseline by example, and why an empty KEEP list pairs nothing).*

- An over-matching sweep has expected survivors. Name them in a **KEEP
  list**: the files or lines that legitimately still match, with
  counts where countable. An unexpected hit is a miss to fix, never a
  survivor to add to the list: scrub it, so the gate stays true as
  written.
- Every gate states its shape, and every gate is falsifiable: "the
  matcher works and the corpus is clean" must be distinguishable from
  "the matcher is broken". Three shapes satisfy that, and they are not
  peers:
  - **Expected-survivor**: the hits must be exactly the KEEP list. The
    list is the gate's own positive control, so a gate printing
    nothing where survivors are expected means the matcher is inert,
    not that the corpus is clean. A KEEP list that turns out empty
    makes the gate a zero-hit gate, and it carries the pairing.
  - **Zero-hit**: the matcher is precise enough that any hit is a
    straggler, so no KEEP list is needed, and the gate says why. A
    zero proves nothing on its own, so this shape carries a **paired
    non-zero assertion through the same matcher**, named with its
    observed result, by one of three mechanisms: a **pre-edit
    baseline** (the gate run before the change, which must print), a
    **planted hit** (a synthetic match inserted, seen to print, and
    removed), or a **known hit elsewhere** (the same pattern on a
    corpus where it is known to occur). Prefer a pre-edit baseline
    where one exists; a known hit elsewhere is the weakest, so say so
    when it is the only mechanism available.
  - **Delta**: for an incremental edit, measure immediately before the
    edit and immediately after it, and assert the difference. The
    difference is derived from the edit's own content, never counted
    by eye, and it certifies the increment only. "The last site is
    gone" is a measured absolute, so it takes a zero-hit or
    expected-survivor gate. A delta pairs itself when either measure
    prints: the before-measure, or the after-measure of an edit that
    introduces the first hits (0 to N, N above 0). A delta from 0 to 0
    never has to print, so it is a zero-hit gate in disguise and
    carries a paired non-zero assertion.
- A pairing shares the pattern, not just the tool: grepping some other
  term shows only that the binary runs. No gate is exempt: a planted
  hit or a known hit elsewhere reaches any corpus, even a gate
  asserting that something never existed.
- Two results stop a sweep, and neither has a mechanical fix. A
  pre-edit baseline that prints nothing means either the matcher is
  inert or the sites it was meant to find do not exist, and either is a
  finding. A pairing that itself prints nothing leaves the gate's zero
  unreadable: fix the matcher, not the corpus.
- A gate whose premise is a measured absolute states that value with
  its stamp, a **stamped baseline assertion**, and the before-run
  measures it again. A mismatch means the
  premise is stale and the site list needs sweeping again, not that the
  gate or the edit failed.

## Claims: stamps, controls and the sweep artifact

*Read with this section: `cases.md` § Claims: stamps, controls and the sweep artifact (the cases: the two stamp forms and their machine anchors, a stamp's raw result and reading filter by example, unique paths, counting commands and units, controls over a growing corpus or a multi-case probe, why an absence stamp pastes its transcript, a citation feeds no plan unchecked, examples of a mark and a basis, platform facts, comparative probes, which surfaces carry a mark, that a consequence clause is optional, and that the register binds new writing only).*

These rules bind claims wherever they appear: survey maps, evidence
sections, grounding facts, specs, and intake (a task's description, a
topic's `request.md`). A drop in the pool carries the lighter rule its
capture states: what was observed, the rest marked `inferred:`, nothing
probed. The rules hold over any corpus: a web absence stamps its query
and is controlled by a query with a known hit, and a database zero
stamps its probe.

- **Every measured claim carries a stamp:** the command that produced
  it, with its observed result, so the next reader can run it again.
  It records the raw result, plus any filter applied by reading, and
  its date is the artifact's unless it states one. "On inspection" is
  not a stamp, because it names nothing to re-run.
- **Every absence or zero also names its positive control:** a literal
  `control:` clause naming the mechanism (rule 4) and its observed
  non-zero, through the same matcher, with its anchor outside the
  corpus the edit changes. "Every" includes the one-off probe typed in
  the middle of an interview: the control is designed into the probe
  as it is typed, and a zero read off a probe with no control is run
  again, never annotated afterwards. A control that can run where it
  is written is run there, not supplied. Over a corpus that grows, a
  control asserts non-zero, never an exact number, and in a probe of
  several cases it runs on a fixture reset to the state the claim
  names. An absence stamp pastes the
  transcript (the matcher's zero line and the control's printing
  line), never a prose summary: a sentence composed from the expected
  answer reads exactly like one copied from a run.
- **Generate, don't transcribe.** Best first: run the sweep artifact
  that covers the claim; cite a stamped source, naming the artifact and
  where its stamp lives; stamp the command inline; state no number. A
  chain rooted in an unstamped number is not a citation: measure again,
  or state no number.
- **When a sweep artifact is owed.** A **sweep artifact** is a
  committed, re-runnable script that measures a topic's corpus claims,
  kept in the topic folder beside the map or doc whose numbers it
  generates. A committed behavioural probe is not one: its claims ride
  the ordinary stamp and control rules. Two triggers make an artifact
  owed, and otherwise stamps and controls suffice:
  - **Retention**: a re-runnable measurement script the session wrote
    to produce reported numbers is committed beside them, never
    discarded.
  - **Families**: counts reported for a stem or term family (a set of
    matchers swept together) come from an artifact, even when the
    family was first swept by hand, because the script is what makes
    family numbers reproducible; and the artifact covers every family
    the map reports counts for before those counts ship.

The second register binds claims nothing measured, at the
**load-bearing** trigger. Its two tokens, `inferred:` and `as-of`, are
machine anchors of the same grammar as `Stamps:` and `control:`:
literal, greppable, and kept verbatim.

- **Probe, or mark `inferred:`.** A load-bearing claim nothing
  measured (how code, a script, a dependency or a framework behaves,
  what an upstream doc says, why something is out of scope) carries
  either its probe, as an ordinary stamp, or the literal marker
  `inferred:`, which says the claim was reasoned, not observed. The
  marked lines are downstream's register of what to re-verify. A
  probed claim leaves the register under a fresh stamp, and a claim
  that cannot be checked at all is an assumption (write-plan's
  Assumptions block), not an inferred claim.
- **Re-verify, or carry `as-of <basis>`.** An external fact measured
  earlier (a web result, a dependency version, an upstream doc,
  another artifact's claim) is re-verified when it is used, under a
  fresh stamp, or carries the literal token `as-of` and the basis
  whose movement would invalidate it: a SHA, a version, a date. A claim
  that is external and was never measured is `inferred:`, not
  `as-of`.
- **Platform facts ground on the vendor's page first.** What a vendor's
  tool does with a setting, a key or a command is cited from its page,
  `as-of <fetch date>`; a probe covers only what the page leaves
  unstated.
- **A stamp's authority ends at its output.** What a result means, or
  why it came out that way, is a claim of its own: probe it or mark
  it, and where a gate rests on it, probe it.
- **A mark travels with its claim.** Quoting an inferred claim without
  its `inferred:`, or an `as-of` fact without its basis, launders it:
  the mark is the claim's standing, not decoration on the artifact it
  came from.
- **A mark stands only where someone will re-verify it.** It may sit on
  a surface a later phase checks again, and is resolved before a
  surface nobody does (a terminal surface): an evidence section takes no marks, and a
  finished plan carries none.

## Scope

This skill governs how to build a sweep once one is wanted; whether a
sweep is warranted at all stays the calling phase's or task's call.
Listing known containers (a menu of the learning that is waiting, a
session's loose ends) is not a sweep: it counts places that exist, not
the sites where something occurs. Reporting is never exempt: a count or
zero stated in an artifact is a sweep result already made, and the
Claims rules bind it.
