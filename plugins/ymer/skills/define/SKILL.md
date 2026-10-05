---
name: define
description: Use to sharpen a topic's meaning into spec.md and glossary updates — phase 3 of the development process; also /ymer:define bootstrap and /ymer:define term <name>.
---

# Defining

This file is the define skill's spine: its intent and the moments in order. Its **mechanics** — the Claude Code way: git, the state folder, the harness's tools — are in `mechanics.md`, and its **cases** — the earned precision: edge cases, exceptions and rulings — in `cases.md`, both under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics).*

Scout recorded what IS; defining decides what we MEAN and want; write-plan
decides how to build it. The output is the sharpened spec (`spec.md`) plus
the project glossary updated as terms crystallize.

**Announce at start:** "Starting define..."

- (Repo-specific preferences in CLAUDE.md override these defaults)

## Input

Pre-flight first (*Defaults and holds*: development-process): derive the
predecessor's close state and any pending steps; re-report each with its
command, and stop only if this phase's work depends on one.

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
`implement`. The arrival the three coordinates land on decides this
phase's opening:

- a **drawn topic** — a `doing` task whose folder holds nothing but its
  `request.md` — or a task that is not in flight — open, or a **closed
  topic**, its task completed or cancelled: not a topic define takes, so stop and name
  **brainstorm** ("External requests never skip phases":
  development-process § Process ground rules);
- a `doing` task with **no folder** — a **split child**: create the
  folder under today's date, write `request.md` through the operations
  contract's template (§ The topic's artifacts) with `started:` today —
  the task already is the topic — and bind the parent's **direction doc**, which
  the task's description names, in `spec.md`'s opening paragraph;
- a **live marker naming define** — an **iteration**: step 1's read
  order applies, and the pass is recorded under § The Spec's re-define
  header or amendment marker;
- a **live marker naming another phase** — stop and name that phase;
  mid-route, `plan.md`'s ticks and the topic's phase commits since the
  marker say where the route now stands (review § Input items 1–2);
- a **pending interview** — `spec.md` carrying the `Interview pending —`
  marker at its head (development-process § Artifacts): steps 1–4 read
  as usual, `survey.md` already standing, and the interview resumes at
  the first unanswered prepared question, announced as
  "Topic: `<name>` — pending interview of `<date>`, <n> questions.";
  the same marker at the head of `brainstorm.md` names brainstorm
  instead — stop before writing anything and name it,
  `/ymer:brainstorm <topic>` written out;
- anything else — a topic **in flight**: reuse the folder and open as
  usual.

1. Read `brainstorm.md` in the topic directory — the chosen direction and its open questions; at a split child, the parent's, which the task's description names. On an iteration, read `review.md` first: the marker's finding, and the entries below it, head the question list.
2. Read `survey.md` — what exists, the vocabulary in use, flagged overloads,
   conflicts. **No `survey.md` yet? Invoke the scout skill first**; after its
   review gate, continue here in-session (the fusion is by design).
   The fused scout sizes itself per scout § The Survey: a brief whose
   Verified state already locates the edit surfaces takes the
   small-area path — search directly, a compact map citing that state —
   and a brainstorm tail's "no standalone scout needed" **sizes** the
   survey, never waives it. This entry condition stays unconditional: a
   `survey.md` exists before the interview, every time.
3. Read the project glossary if it exists (home: → The Glossary) —
   blessed terms are the vocabulary to speak in; grandfathered terms the
   topic touches join the question list.
4. Do not read `sketch.md` (reader contract: development-process
   § Artifacts).

Brainstorm docs are exempt from vocabulary discipline: ideation is chaotic
by design and creativity benefits from it. Their words get their reality
check here.

## The Interview

*Read with this section: `cases.md` § The Interview (the cases).*

**Read the interview procedure whole before the first question, and
follow it** — `${CLAUDE_PLUGIN_ROOT}/skills/development-process/interview.md`, the
one home of the question discipline define and brainstorm share: its
ground rules (options in prose, one question at a time, recommendation
first, no clock, the deciding fact and every premise probed or marked, a
standing constraint re-asked once, the frame before the options), the
agenda in dependency order with a naming question right after the
decision that bounds it, the answers recorded as they land, and the
pending interview where a question cannot be put. This section carries
only define's own rules beside it.

- **A standing call leads the recommendation.** Where the direction doc
  records a standing call with its trigger, the recommendation leads
  with the option that call already licenses, never with the
  least-churn default.

- **Stress-test with scenarios.** Probe crystallizing decisions and terms
  with concrete edge cases: "what happens when …?" A definition that
  survives three hostile scenarios is probably right.

- The interview can undermine the chosen direction — sending the topic back
  to brainstorm is a valid outcome.

### Unattended: closing around the interview

*Read with this section: `cases.md` § Unattended: closing around the interview (the cases).*

## The Glossary

*Read with this section: `mechanics.md` § The Glossary (the mechanics) and `cases.md` § The Glossary (the cases).*

The single index of domain terms in the repo: every term has exactly one
entry here, and every other document — README, module docs, specs, plans —
uses the terms and points at a term's home, never redefines it. Where the
*definition* lives depends on the term's kind (below). Update the glossary
**the moment a term crystallizes**, not batched at the end; `spec.md`
records the session's delta.

The glossary describes what **is**: an entry is written when the thing its
term names is real (→ The referent gate). What is *planned* lives in the
topic's spec — in its glossary delta — until it ships, and the entry lands
in the same change as its referent.

Created lazily when the first term crystallizes, opening with this usage
header:

```markdown
# Glossary

Canonical domain terms for this project. Code and docs use these terms;
`_Avoid_` synonyms are banned in new names. Conceptual terms are defined
here; code-backed terms are defined at their code home and autolinked
from here; principles and invariants are defined in their prose home and
pointed at from here. Other documents point at a term's home instead of
redefining it.

This glossary describes what is: an entry is written when the thing its
term names is real. A `Redefinition in flight — <date> → <topic ID>:`
line under a term head means a topic is changing that definition; what
stands below it is still the current one.
```

A **conceptual term** is defined in the entry itself:

```markdown
### term
One or two sentences on what it IS, not what it does.
_Avoid_: rejected, synonyms
```

A **code-backed term's** entry replaces the definition prose with the
autolink to its code home, plus the glossary-native metadata that has no
code home — the `_Avoid_` list, disambiguation cross-refs, a
redefinition-in-flight marker (→ Redefinition in flight). Never definition
prose:

```markdown
### term
`t:MyApp.Context.term/0`
_Avoid_: rejected, synonyms
```

A **principle or invariant** is defined in its prose home; the entry points
there and names the handle a reader opens:

```markdown
### term
Defined in <the prose home> — <the doc, section, or `@moduledoc` that
states it>.
_Avoid_: rejected, synonyms
```

A **library-homed term** is a library's concept the repo speaks unchanged
(→ Library-homed terms). Plain prose names the library — no version, no
backticked module reference, no restatement of what it means:

```markdown
### term
Defined by <library>; its definition lives there, not here.
_Avoid_: rejected, synonyms
```

A **cross-repo pointer** (→ per-repo glossaries, `cases.md § The Glossary`) names the repo that
owns the referent and the home inside it, and stops there. A definition
homed in another of the product's repos takes this template, whatever kind
the term would otherwise be; a library's own concept stays library-homed
(→ Library-homed terms):

```markdown
### term
Defined in <repo> — <the home there> is its home.
_Avoid_: rejected, synonyms
```

A **historical term's** entry is one whose referent is gone while the word
survives in records (→ Historical entries). The opener *replaces* the
definition or the autolink rather than sitting above it, and states what
the term named in the past tense, what replaced it where something did,
and which **kind** of record still speaks the word:

```markdown
### term
Historical (retired <YYYY-MM-DD>): <what it named, past tense>. <What
replaced it.> Survives in <the kind of record that still speaks it>.
_Avoid_: rejected, synonyms
```

- **Opinionated:** one winner per concept; the losers go under `_Avoid_`.
- **Domain terms only.** General programming concepts never enter, however
  heavily the project uses them — this rule is what keeps the glossary
  language-neutral.

### Term kinds — where the definition is homed

*Read with this section: `cases.md` § Term kinds — where the definition is homed (the cases).*

The test: **does code traffic in the term?**

- **Code-backed** — the code takes, returns, or checks it: an enum, a
  schema, a public function, a `@type`. The definition lives once, at the
  code construct (`@typedoc`/`@doc`); the glossary entry is the term, the
  autolink, and only glossary-native metadata that has no code home — the
  `_Avoid_` list, disambiguation cross-refs. No definition
  prose in the entry: repeating it is exactly the drift code-homing kills.
  ExDoc renders the autolink with a hover tooltip (signature + first doc
  line), so the code home must meet glossary quality — its doc opens with
  the real definition sentence, not a stub. Type autolinks need the `t:`
  prefix and arity: `` `t:MyApp.Work.fleet/0` ``.
- **Conceptual vocabulary** — no code construct and no natural reason to
  grow one. Defined in the glossary entry itself, as before.
- **Principles / invariants** — system-wide rules of behavior. Defined in
  their prose home (an architecture doc, the app module's `@moduledoc`);
  the glossary entry points there.

### Library-homed terms

*Read with this section: `cases.md` § Library-homed terms (the cases).*

A repo that speaks a library's concept unchanged does not redefine it: the
entry names the library and says the definition lives there. Not a fourth
kind — the definition is homed in the library, and the consumer's entry is
a pointer at it.

- **No restatement.** Point at the definition; never summarize it.
- **Decided by where the definition lives, not by the word.** A consumer
  that wraps the concept in its own construct has a local code-backed term
  that happens to share a name — it defines locally. The pointer form is
  for terms the consumer speaks unchanged.

### The referent gate

*Read with this section: `cases.md` § The referent gate (the cases).*

At every crystallizing term, before writing anything: **is the thing the
term names real yet?** The entry's home is how you probe that, and the
probe differs by kind:

- **code-backed** — the construct exists *and* its `@typedoc`/`@doc` says
  it. Two parts on purpose: when the construct exists but its doc is
  silent, write the definition sentence into the doc (a doc-only edit,
  committed with the glossary at the phase close — both live in the
  project repo) and then write the entry. Only a *missing construct*
  defers.
- **prose-homed** — its prose home says it.
- **conceptual** — the thing the term names exists: the mechanism
  operates, the store is present.

A pointer entry for a library-homed term (→ Library-homed terms) never
defers: its referent is the library's own definition, which already
exists.

**Yes** → write the entry now. Sharpening an entry whose referent already
exists is ordinary update-on-crystallize, unchanged — the gate narrows
nothing about describing reality better.

**No** → **defer.** Record the term and its definition sentence in the
spec's glossary delta; writing the entry, and any home text it needs,
becomes plan work landing in the same change as the referent. A deferred
*new* term leaves no trace in the glossary — no placeholder, no stub — so
a superseded plan leaves it showing that nothing happened. A deferred
*redefinition* leaves the marker below.

### Redefinition in flight

*Read with this section: `cases.md` § Redefinition in flight (the cases).*

While a redefinition is deferred the existing entry is neither silently
wrong nor silently rewritten: it keeps its current definition and carries
a required one-line marker, directly under the term head and above the
definition (or above the autolink), with a blank line on each side, so
it renders as its own paragraph:

```
Redefinition in flight — <date> → <topic ID>: <what changes>
```

### Historical entries

*Read with this section: `cases.md` § Historical entries (the cases).*

A term whose referent is genuinely gone — a retired format, a removed
check — keeps its entry only because old records still speak the word.
Not a term kind: kinds answer where a live definition is homed (→ Term
kinds), and this entry has none. The historical opener replaces whatever
shape the entry had, autolink included — a code-backed term's link goes
with the construct it pointed at.

## The Spec (`spec.md`)

*Read with this section: `cases.md` § The Spec (`spec.md`) (the cases).*

- **Topic & links** — one paragraph; link `brainstorm.md` and `survey.md`.
- **What we mean** — the sharpened statement of the topic, written in
  glossary terms.
- **Decisions** — each a `### D<n> — <title>` heading with the question,
  the answer, and the rationale beneath it, so a decision ID has one
  greppable form (`grep -n '^### D4' spec.md` finds it) and "the
  parent's decision 4" resolves to exactly one entry.
- **Domain rules & edge cases** — the scenarios stress-tested and their
  resolutions.
- **Glossary delta** — terms added, renamed, or redefined this session;
  entries the referent gate **deferred**, each with the definition
  sentence the plan must land; grandfathered terms the topic brushed but
  did not resolve.
- **Out of scope** — what was explicitly excluded, and why.
- **Open questions for write-plan** — genuinely mechanical and deferrable
  only; a meaning question left open here is a defect.

**A full re-define rewrites `spec.md` in place**, under a header block
sitting between the title's metadata paragraph and `## What we mean`:

```
> **Re-defined <date>. <status one-liner>.**
>
> <one paragraph: what the iteration found, and what it changed.>
>
> Superseded: <the decisions this pass replaced>
```

A decision the pass replaced keeps its original text as record, under a
banner directly beneath its heading — the reader must be able to see what
was believed, and must never mistake it for what holds now:

```
> **SUPERSEDED — record only. The live text is <where>.**
```

## Bootstrap Mode (one-time per repo)

*Read with this section: `mechanics.md` § Bootstrap Mode (one-time per repo) (the mechanics) and `cases.md` § Bootstrap Mode (one-time per repo) (the cases).*

Run this mode when invoked as `/ymer:define bootstrap`. It needs no topic
directory and no brainstorm/survey input — the glossary itself is the
artifact; the Input section above does not apply.

For a repo with existing code and no glossary: sweep the current vocabulary
into the glossary so the debt is visible, without resolving it.

- No renames, no interview, no refactoring — one user review gate on the
  collected list.
- Grandfathered ≠ protected: canonical-by-default (do not invent synonyms
  for them) but explicitly awaiting a define session.

## Term Mode (single term, no topic)

*Read with this section: `cases.md` § Term Mode (single term, no topic) (the cases).*

Run this mode when invoked as `/ymer:define term <term>`. It needs no topic
directory and writes no `spec.md` — the glossary edit is the artifact; the
Input section above does not apply.

Use it to sharpen a single term the moment the need appears: bless a new
term, or promote one grandfathered term, without opening a pipeline topic.

- Read the project glossary (home: → The Glossary) and place the term:
  blessed, grandfathered, or absent — and by kind (code-backed / conceptual / principle, per the
  charter's term kinds; a term's definition is homed per the charter, and
  the referent gate applies to every kind, not only code-backed).
- Verify how the code actually uses the term before proposing anything —
  a mini-scout scoped to the term (inline search; an Explore agent only
  when usage is spread wide).

- Allowed outcomes: add a new blessed entry, or promote a grandfathered
  entry whose name and meaning survive the interview — recording the
  `_Avoid_` synonyms found on the way.

One user review gate on the glossary edit — **Default: commit at the
close; review post-hoc at the commit** (*Defaults and holds*:
development-process) — committed by the phase, project and plugin
glossaries alike (→ User Review Gate).

## Self-Review (inline)

Calibration: only flag what would send write-plan in the wrong direction.

1. Every inherited open question answered — or explicitly deferred with a
   reason?
2. Spec written in glossary terms — no `_Avoid_` words, no term defined in
   the spec that belongs at its home (glossary entry, code construct, or prose home)?
3. Every decision carries its rationale?
4. Edge cases resolved, not parked?
5. Glossary delta matches the actual edits made to the glossary home, to
   any code-home doc sentences, and to any prose-home sentences — and does
   every deferred entry carry the definition sentence the plan must land?
6. Load-bearing spec claims probed or marked `inferred:` — a decision
   premise, a domain rule, an out-of-scope reason, a premise inside an
   interview question's own text or an open question's: each one nothing
   measured carries a stamp or the marker — and every citation of another
   artifact's claims names that artifact's measurement basis, re-verified
   at use or carried `as-of <basis>` (register rules: the sweep skill's
   Claims section)?

Fix issues inline and move on — no re-review loop.

## User Review Gate

*Read with this section: `mechanics.md` § User Review Gate (the mechanics) and `cases.md` § User Review Gate (the cases).*

> "Spec written to `<path>`, glossary updated. Please review — is this what
> we mean?"

Iterate on any input that arrives. **Default: proceed to the phase
close — review post-hoc at the phase commit
(`git -C <state folder> show <sha>`)** (*Defaults and holds*:
development-process).

**Capture block:** invoke the `ymer:capture` skill — source `define`.
The battery, the drop grammar and the write live in that skill alone.

## Next Phase

*Read with this section: `cases.md` § Next Phase (the cases).*

Stop and name the next phase — normally **write-plan** in a fresh session.
Do not invoke it: one phase per session, the spec is the compaction
boundary. If the interview undermined the chosen direction, name
**brainstorm** instead.

## Remember

- What we MEAN — not what IS (scout) or how to build (write-plan)
- One question at a time, recommendation first; the codebase answers what
  it can; the interview is a hold — unattended, prepare it into
  `spec.md` under the `Interview pending —` marker and close around it
- Every term is defined once, at its kind's home — glossary (conceptual),
  code construct (code-backed), prose doc (principle); everything else
  points there
- Update the glossary the moment a term crystallizes — but only when its
  referent is real; what is planned waits in the spec's glossary delta
- A deferred redefinition leaves a `Redefinition in flight` marker on the
  entry; a deferred new term leaves nothing
- A term whose referent is retired keeps a historical entry because records
  still speak the word — the retiring change's own KEEP list decides, once
- Renames ripple through the pipeline, never ad hoc
- Term mode blesses or promotes one term; renames and redefinitions open
  a define topic
- A decision that changes after the spec exists is amended in place, in
  the plan's own marker grammar; a full re-define rewrites `spec.md`
  under a dated header block, superseded text kept as record
- The phase commits its glossary edits at the close — project and plugin
  glossary alike, public register; the spec's glossary delta records the
  plugin glossary's commit ref
