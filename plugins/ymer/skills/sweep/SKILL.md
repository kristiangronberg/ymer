---
name: sweep
description: Use when building any find-all-sites list — a rename gate, ripple sweep, vocabulary/term sweep, verification grep, or dead-reference hunt: any list that claims to cover every place a term, name, path, or meaning occurs — and when reporting claims in any pipeline artifact: measured claims (a count, ratio, or absence a search or probe produced), load-bearing claims nothing measured, and reused external facts. Carries the recall-first discipline — over-approximate the matcher and the corpus, filter false positives by reading — plus the matcher/corpus/mode/survivor rules that keep a sweep from under-matching and its gates checkable, and the claims rules — stamps, positive controls, the committed sweep artifact, probe-or-mark `inferred:`, re-verify-or-carry `as-of` — that keep reported claims accountable. NOT for deciding whether a sweep is warranted — that stays the calling phase's or task's call — and not bare `/ymer:tutor`'s discovery menu or end-session's loose-ends sweep, which enumerate known containers, not occurrence sites.
---

# Sweep — building find-all-sites lists

This file is the sweep skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

A sweep is any list built to cover *every* site where something occurs:
a rename gate, a ripple sweep after a term change, a vocabulary sweep
in a direction doc, a verification grep in a plan, a dead-reference
hunt. One stance governs them all:

**Recall first: over-approximate the matcher and the corpus, then
filter false positives by reading. A miss is unrecoverable — nothing
downstream looks again; a false positive costs only reading time.**

A sweep under-approximates in exactly three ways — matcher, corpus,
mode. One rule against each, a fourth that keeps the over-matching
checkable and the gate falsifiable, and a Claims section binding the
reporting side.

A reported count or zero is a **compressed sweep result**. Any count,
ratio, or absence a search or probe produced — in any pipeline
artifact, over any corpus (repo, web, database, live tool) — is a
**measured claim** and owes these rules: a stamp always, a positive
control when the result is an absence or zero (→ Claims below). Not
measured claims: design parameters (nothing was measured) and
designed-empty status reports (`git status` → empty is a tool's answer
about state, not a matcher zero — no silent-zero risk).

Claims nothing measured ride a second register at the same home: a
**load-bearing** claim — a decision, an ordering, a gate, or a scope
exclusion rests on it — is probed or carries the literal marker
`inferred:`, and an already-measured external fact is re-verified at
use or carries `as-of <basis>` (→ Claims below).

## 1. Matcher — stems and substrings by default

*Read with this section: `cases.md` § 1. Matcher — stems and substrings by default (the cases).*

- Match stems and substrings, not whole words: `disposab`, not
  `disposable` — exact-word lists miss stem variants (`disposability`)
  and snake_case compounds (`runner_outcomes` when hunting `runner`).

- Pick the matcher by the question. "Standalone token, not part of a
  longer name" → a boundary-aware pattern (PCRE lookaround). "Did this
  word fully leave the corpus" → plain case-insensitive substring, with
  the over-match handled by rule 4.
- Positive-control the matcher: before trusting "no output" as a pass,
  confirm the same matcher prints known hits somewhere. A silently
  broken matcher is indistinguishable from a clean corpus.

## 2. Corpus — everything minus named exclusions, never an allowlist

*Read with this section: `mechanics.md` § 2. Corpus — everything minus named exclusions, never an allowlist (the mechanics) and `cases.md` § 2. Corpus — everything minus named exclusions, never an allowlist (the cases).*

- Sweep the whole repo and subtract named, justified exclusions
  (generated output, vendored trees, frozen migrations) — never
  enumerate the directories where hits are expected. The sites nobody
  expected are what a sweep exists to find; an allowlist is how a
  repo-root docker-compose.yml keeps a dead pointer through two gates.

- Hidden files count: know whether your tool skips files whose names
  begin with a dot, or gitignored files, by default — and turn that off
  deliberately.

- Interim gates may scope narrower (the files a task just edited), but
  the final gate runs corpus-wide.

## 3. Mode — a meaning sweep never rides one phrasing

- When the target is a meaning rather than a literal token, one
  phrasing is one syntactic form, not the sweep: add synonyms,
  paraphrases, and spelling/hyphenation variants ("work item",
  "work-item"), then finish with a read pass at the concept's home
  sites — the files where the meaning lives regardless of wording.
- Literal referents take multiple forms too: a module has a name and a
  file path; a route has a helper and a raw string. Each form needs its
  own matcher — a name gate is structurally blind to a stale path cite.

## 4. Survivors — gate shapes, and why a gate must be able to fail

*Read with this section: `cases.md` § 4. Survivors — gate shapes, and why a gate must be able to fail (the cases).*

- An over-matching sweep has expected survivors. Name them: a KEEP
  list — the files or lines that legitimately still match — with
  counts where countable.

## Claims — stamps, controls, and the sweep artifact

*Read with this section: `cases.md` § Claims — stamps, controls, and the sweep artifact (the cases).*

Reporting rules for claims wherever they appear — survey maps,
evidence sections, grounding facts, specs, intake (a task's
description, a topic's `request.md`). A drop in the pool carries the
lighter rule its capture states — what was observed, the rest marked
`inferred:`, nothing probed. Corpus-agnostic: a
web absence stamps its query and controls it with a known-hit query; a
database zero stamps its probe.

## Scope

This skill governs how to build a sweep once one is wanted; whether a
sweep is warranted at all stays the calling phase's or task's call.
Reporting is never exempt: a count or zero stated in an artifact is a
sweep result already made, and the Claims rules bind it.
