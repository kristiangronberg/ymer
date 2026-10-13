---
name: define
description: Sharpens what a topic means before it is planned: settles its open decisions with the user one question at a time, records them in a spec, and keeps the project glossary's terms precise. Use once a direction is chosen, or to set up a repo's glossary (`/ymer:define bootstrap`) or sharpen a single term (`/ymer:define term <name>`).
---

# Define

Define is the phase between the survey and the plan. Scout recorded
what *is*; define decides what the topic *means*, and write-plan
decides how to build it. Define settles the topic's open decisions with
the user, one question at a time, and writes them down as the topic's
spec, `spec.md`. As terms crystallize it updates the project glossary,
so the plan and the code speak one vocabulary. Two smaller modes work
on the glossary alone: § Bootstrap Mode sets one up for a repo that has
none, and § Term Mode sharpens a single term without opening a topic.

This file is define's spine: its intent and its moments in order. Its
**mechanics** (the Claude Code way: git, the state folder, the
harness's tools) are in `mechanics.md`, and its **cases** (the earned
precision: edge cases, exceptions and rulings) are in `cases.md`, both
under this file's headings. A section with entries there says so in its
first line, and those entries are read when the section runs.

## Overview

*Read with this section: `mechanics.md` § Overview (the mechanics).*

**Read the plugin glossary's entries for define's vocabulary now**,
unless already read this session: `${CLAUDE_PLUGIN_ROOT}/glossary.md`,
each entry by its heading: *topic resolution*, *arrival*, *drawn
topic*, *split child*, *direction doc*, *iteration*, *pending
interview*, *unattended*, *hold*, *referent gate*,
*redefinition-in-flight marker*, *historical entry*, *amendment
marker*, *glossary delta*, *decide-forward*, *meta topic*, *machinery
tree*, *sweep artifact*, *as-of*, *inferred claim*.
This file uses those terms and never defines them.

The topic run goes in order: resolve the topic and read its arrival,
read the direction and the survey (running scout first where no survey
exists), interview the user, keep the glossary current as terms
crystallize, check the scratch spec's inputs mapping, consolidate the
spec, check it, have the user review it, and close.

**Announce at start:** "Starting define..." Repo-specific preferences
in a repo's `CLAUDE.md` override this skill's defaults.

## Input

Input reads the arrival and the material the interview builds on.

**Read the process contract's § Defaults and holds now, and the
operations contract whole**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/process-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`. They hold the
pre-flight, close binding, gate defaults and holds, the fallback rule,
the report rule and the interview as a hold; and every roadmap
operation this phase calls (*look up topic*, *annotate task*, *mint
task*) with its postcondition and the failure rule, the outward-write
rule for rulings, the topic's artifacts (the `request.md` template, the
`sketch.md` reader contract, how the state folder's kind is read and
what a state folder in no git repository skips), split topics, the
status ladder, and the topic ID's folder. This section carries only
define's own reads beside them.

**The pre-flight runs first**, as the process contract's § Defaults
and holds gives it. It runs none of the project checkout's git steps,
no switch, no stash and no merge: define reaches the checkout only at
its close, where the glossary commit is (`mechanics.md` § User Review
Gate).

Two reads more, each where its marker is found:

- Where `review.md` tops with an `Iteration —` marker, **read the
  process contract's § Iteration now**, unless already read this
  session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the
  marker's block, its `Consumed —` lines, whether the route is live or
  consumed and which phase it makes due, and the re-define and
  decide-forward rules an iteration of define follows.
- Where `brainstorm.md` or `spec.md` carries the `Interview pending —`
  marker at its head, **read the interview procedure whole now**,
  unless already read this session:
  `${CLAUDE_PLUGIN_ROOT}/interview.md`, for the pending interview, its
  resume, and the stop on another phase's artifact.

**Topic resolution runs next**: the task's status (*look up topic*,
binding: the operations contract); the topic folder, present or not, and
whether it holds `request*.md`; and, where the folder exists,
`review.md`'s first recognizer top-down (the review skill,
§ Recognizers) and whether `brainstorm.md` or `spec.md` carries the
`Interview pending —` marker at its head (the interview procedure,
§ 4. Pending). The arrival they land on decides the opening:

- **Drawn topic**, or a task that is not in flight (open), or a
  **closed topic** (its task completed or cancelled): not a topic define
  takes. Stop and name **brainstorm** ("External requests never skip
  phases": the process contract, § Where to enter).
- **Split child**, a `doing` task with no folder: create the folder
  under today's date and write `request.md` through the operations
  contract's template with `started:` today (the operations contract,
  § The topic's artifacts), since the task already is the topic. Bind
  the parent's direction doc, which the task's description names, in
  `spec.md`'s opening paragraph.
- **Iteration**, a live marker naming define: step 1's read order
  applies, the pass is recorded under § The Spec's re-define header or
  amendment marker, and the close, a pending close included, appends
  `Consumed — <YYYY-MM-DD> by define` to the marker's block as its last
  write before the phase's commit.
- **A live marker naming another phase**: stop and name that phase.
- **Pending interview**, `spec.md` carrying the `Interview pending —`
  marker at its head: steps 1–4 read as usual, `survey.md` already
  standing, and the interview resumes at the first unanswered prepared
  question, announced as "Topic: `<name>` — pending interview of
  `<date>`, <n> questions." The same marker at the head of
  `brainstorm.md` names brainstorm instead: stop before writing
  anything and name it, `/ymer:brainstorm <topic>` written out.
- **In flight**, anything else: reuse the folder and open as usual.
  Where `review.md` tops with a consumed marker, the close appends its
  own `Consumed — <YYYY-MM-DD> by define` line to the block the same
  way.

Then the material, in this order:

1. Read `brainstorm.md` in the topic directory: the chosen direction
   and its open questions. At a split child, read the parent's direction
   doc, which the task's description names. On an iteration, read
   `review.md` first: the marker's finding, and the entries below it,
   head the question list.
2. Read `survey.md`: what exists, the vocabulary in use, flagged
   overloads, conflicts. **No `survey.md` yet? Invoke the scout skill
   first**; after its review gate, continue here in-session (the
   process contract, § The map, where the fused run is by design). The
   fused scout sizes itself (the scout skill, § The Survey): a brief
   whose Verified state already locates the edit surfaces takes the
   small-area path, searching directly with a compact map citing that
   state, and a brainstorm tail's "no standalone scout needed"
   **sizes** the survey, never waives it. This entry condition stays
   unconditional: a `survey.md` exists before the interview, every time.
3. **Read the process contract's § Knowledge placement now**, unless
   already read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`,
   for where the project glossary lives, the plugin glossary's place
   for a meta topic, and the rule that every term has one home. Then
   read the project glossary if it exists, unless already read this
   session (in a fused session, scout's vocabulary lens has read it only
   where the lens ran in this session's own context, never as a
   subagent): blessed terms are the vocabulary to speak in, and
   grandfathered terms the topic touches join the question list.
4. Do not read `sketch.md` (reader contract: the operations contract,
   § The topic's artifacts).

Brainstorm docs are exempt from vocabulary discipline: ideation is
chaotic by design and creativity benefits from it. Their words get
their reality check here.

## The Interview

*Read with this section: `cases.md` § The Interview (the cases).*

**Read the interview procedure whole before the first question, and
follow it**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/interview.md`, the one home of the question
discipline brainstorm and define share: its ground rules, the agenda,
the answers recorded as they land, and the pending interview where a
question cannot be put.

**At the first probe, read the sweep skill's § Claims now**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/skills/sweep/SKILL.md`,
§ Claims: stamps, controls and the sweep artifact, for stamps, controls,
the `inferred:` register and the committed sweep artifact a family
count comes from. Every measured claim the session writes into
`spec.md` follows it. This section carries only define's own rules
beside these two.

- **The agenda maps every input.** Every item of every source the
  question list is built from (`cases.md` § The Interview) maps to a
  question, a codebase answer or a stated deferral, and a pick's
  consequence on another site joins the agenda as a question.
- **A standing call leads the recommendation.** Where the direction doc
  records a standing call with its trigger, the recommendation leads
  with the option that call already licenses, never with the
  least-churn default.
- **Stress-test with scenarios.** Probe crystallizing decisions and
  terms with concrete edge cases: "what happens when …?" A definition
  that survives three hostile scenarios is probably right.
- The interview can undermine the chosen direction: sending the topic
  back to brainstorm is a valid outcome.

### Unattended: closing around the interview

*Read with this section: `cases.md` § Unattended: closing around the interview (the cases).*

An unattended interview is closed around, not torn. Define writes
`spec.md` with the `Interview pending —` marker at its head, a draft
"What we mean" that holds no decision, and the prepared `## Interview`
section; it makes no glossary write and no outward ruling, and its
commit carries the pending suffix. The review gate is never reached.
The commit is the state-folder commit of `mechanics.md` § User Review
Gate, under the pending message (the interview procedure, § 4.
Pending); **read the substrate contract whole now** before it, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/substrate-contract.md`,
for staging by explicit path, the commit registers, concurrent edits
on a shared tree and git is never guessed.

## The Glossary

*Read with this section: `cases.md` § The Glossary (the cases).*

Define keeps the project glossary current while it interviews. Where
the glossary lives and why every term has one home is the process
contract's § Knowledge placement, read at § Input, step 3 (Bootstrap
and Term Mode read it at their own opening). Update the
glossary **the moment a term crystallizes**, never batched at the end,
and only once everything its entry asserts is real (→ The referent
gate); what is planned waits in the spec's glossary delta and lands in
the same change as its referent. `spec.md` records the session's delta.
Where an entry's definition is homed depends on its term kind (→ Term
kinds).

The glossary's format is one unit, and every glossary takes it. A
glossary is created lazily, when the first term crystallizes, opening
with this usage header:

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

Its first entry creates the first letter section; there is no empty
scaffolding. The document's structure:

- The entries above the register sections are the **blessed index**:
  an A–Z run of terms, and nothing else.
- A **term head** is a line-start `### <term>` heading, one per entry,
  and the line a redefinition-in-flight marker sits under
  (→ Redefinition in flight). Lowercase, unless the term is a proper
  noun.
- Term heads sit under **letter sections**: a line-start `## <Letter>`
  heading, one uppercase letter. A letter section exists only while a
  term sits under it: create it with the first term that needs it, and
  leave absent letters absent. The letter ignores the term's own casing
  (`PKCE` → `## P`).
- **Order is alphabetical on the term's letters and digits only**, with
  case, spaces, hyphens and other punctuation ignored, so
  `action-schema invariant` sorts before `action summary`.
- **Register sections** (`## Grandfathered (pending define)`, a flagged
  question list) stay at `##`, after the last letter section, below a
  `---`. Keep a blank line above the `---`: directly under a text line
  it is a setext `h2` in CommonMark, a phantom heading in the
  document's outline. Blank line, `---`, blank line, then the `##`.
- **`##` = letter and `###` = term is an invariant of the blessed
  index**, above the `---` only; the register sections below it keep
  their own shapes. Admonitions (`> ### … {: .warning}`) are call-outs,
  not headings: the invariant never reads them, and they may sit
  wherever prose may, an entry's body included.

The entry shapes. A **conceptual term** is defined in the entry itself:

```markdown
### term
One or two sentences on what it IS, not what it does.
_Avoid_: rejected, synonyms
```

A **code-backed term's** entry replaces the definition prose with the
autolink to its code home, plus the glossary-native metadata that has
no code home: the `_Avoid_` list, disambiguation cross-refs, a
redefinition-in-flight marker (→ Redefinition in flight). Never
definition prose:

```markdown
### term
`t:MyApp.Context.term/0`
_Avoid_: rejected, synonyms
```

A **principle or invariant** is defined in its prose home; the entry
points there and names the handle a reader opens:

```markdown
### term
Defined in <the prose home> — <the doc, section, or `@moduledoc` that
states it>.
_Avoid_: rejected, synonyms
```

A **library-homed term** is a library's concept the repo speaks
unchanged (→ Library-homed terms). Plain prose names the library, with
no version, no backticked module reference and no restatement of what
it means:

```markdown
### term
Defined by <library>; its definition lives there, not here.
_Avoid_: rejected, synonyms
```

A **cross-repo pointer** names the repo that owns the referent and the
home inside it, and stops there (when a product spans several repos:
`cases.md` § The Glossary). A definition homed in another of the
product's repos takes this template, whatever term kind it would
otherwise have; a library's own concept stays library-homed
(→ Library-homed terms):

```markdown
### term
Defined in <repo> — <the home there> is its home.
_Avoid_: rejected, synonyms
```

A **historical term's** entry is one whose referent is gone while the
word survives in records (→ Historical entries). The opener *replaces*
the definition or the autolink rather than sitting above it, and states
what the term named in the past tense, what replaced it where something
did, and which records still speak the word:

```markdown
### term
Historical (retired <YYYY-MM-DD>): <what it named, past tense>. <What
replaced it.> Survives in <the records that still speak it>.
_Avoid_: rejected, synonyms
```

Two rules hold for every entry:

- **Opinionated:** one winner per concept; the losers go under
  `_Avoid_`.
- **Domain terms only.** General programming concepts never enter,
  however heavily the project uses them. This rule is what keeps the
  glossary language-neutral.

### Term kinds

*Read with this section: `cases.md` § Term kinds (the cases).*

The term kind decides where a term's definition is homed. The test:
**does code traffic in the term?**

- **Code-backed**: the code takes, returns, or checks it (an enum, a
  schema, a public function, a `@type`). The definition lives once, at
  the code construct (`@typedoc`/`@doc`); the glossary entry is the
  term, the autolink, and only glossary-native metadata that has no
  code home (the `_Avoid_` list, disambiguation cross-refs). No
  definition prose in the entry: repeating it is exactly the drift
  code-homing kills. ExDoc renders the autolink with a hover tooltip
  (signature and first doc line), so the code home must meet glossary
  quality: its doc opens with the real definition sentence, not a stub.
  Type autolinks need the `t:` prefix and arity:
  `` `t:MyApp.Work.fleet/0` ``.
- **Conceptual vocabulary**: no code construct and no natural reason to
  grow one. Defined in the glossary entry itself.
- **Principles / invariants**: system-wide rules of behavior. Defined in
  their prose home (an architecture doc, the app module's
  `@moduledoc`); the glossary entry points there.

### Library-homed terms

*Read with this section: `cases.md` § Library-homed terms (the cases).*

A repo that speaks a library's concept unchanged does not redefine it:
the entry names the library and says the definition lives there. It is
not a fourth term kind: the definition is homed in the library, and the
consumer's entry is a pointer at it.

- **No restatement.** Point at the definition; never summarize it.
- **Decided by where the definition lives, not by the word.** A
  consumer that wraps the concept in its own construct has a local
  code-backed term that happens to share a name, and defines it
  locally. The pointer form is for terms the consumer speaks unchanged.

### The referent gate

*Read with this section: `cases.md` § The referent gate (the cases).*

At every crystallizing term, before writing anything, define runs the
gate: **is everything the entry would assert real yet?** That covers
every claim the entry makes, not only its term: a sentence asserting a
rule at another home passes only where that home says it today. The
entry's home is how the term's own referent is probed, and the probe
differs by term kind:

- **code-backed**: the construct exists *and* its `@typedoc`/`@doc`
  says it. Two parts on purpose: when the construct exists but its doc
  is silent, write the definition sentence into the doc (a doc-only
  edit, committed with the glossary at the phase close, since both live
  in the project repo) and then write the entry. Only a *missing
  construct* defers.
- **prose-homed**: its prose home says it.
- **conceptual**: the thing the term names exists: the mechanism
  operates, the store is present.

A pointer entry for a library-homed term (→ Library-homed terms) never
defers: its referent is the library's own definition, which already
exists.

**Yes** → write the entry now. Sharpening an entry whose referent
already exists is ordinary update-on-crystallize, unchanged: the gate
narrows nothing about describing reality better.

**No** → **defer.** Record the term and its definition sentence in the
spec's glossary delta; writing the entry, and any home text it needs,
becomes plan work landing in the same change as the referent. A
deferred *new* term leaves no trace in the glossary, no placeholder and
no stub, so a superseded plan leaves it showing that nothing happened.
A deferred *redefinition* leaves the marker (→ Redefinition in flight).

### Redefinition in flight

*Read with this section: `cases.md` § Redefinition in flight (the cases).*

While a redefinition is deferred, the existing entry keeps its current
definition and carries the marker, directly under the term head and
above the definition (or above the autolink), with a blank line on each
side, so it renders as its own paragraph:

```
Redefinition in flight — <date> → <topic ID>: <what changes>
```

### Historical entries

*Read with this section: `cases.md` § Historical entries (the cases).*

A historical entry keeps a word whose referent is genuinely gone (a
retired format, a removed check) because old records still speak it.
It is not a term kind: term kinds answer where a live definition is
homed (→ Term kinds), and this entry has none. The historical opener
replaces whatever shape the entry had, autolink included: a code-backed
term's link goes with the construct it pointed at.

## The Spec

*Read with this section: `cases.md` § The Spec (the cases).*

The spec, `spec.md`, is define's one artifact: the sharpened statement
of the topic that write-plan plans against. Its sections:

- **Topic & links**: one paragraph; link `brainstorm.md` and
  `survey.md`.
- **What we mean**: the sharpened statement of the topic, written in
  glossary terms.
- **Decisions**: each a `### D<n> — <title>` heading with the question,
  the answer, and the rationale beneath it, so a decision ID has one
  greppable form (`grep -n '^### D4' spec.md` finds it) and "the
  parent's decision 4" resolves to exactly one entry.
- **Domain rules & edge cases**: the scenarios stress-tested and their
  resolutions.
- **Glossary delta**: terms added, renamed, or redefined this session;
  entries the referent gate **deferred**, each with the definition
  sentence the plan must land; grandfathered terms the topic brushed but
  did not resolve.
- **Out of scope**: what was explicitly excluded, and why.
- **Open questions for write-plan**: genuinely mechanical and
  deferrable only; a meaning question left open here is a defect.

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
banner directly beneath its heading: the reader must be able to see
what was believed, and must never mistake it for what holds now:

```
> **SUPERSEDED — record only. The live text is <where>.**
```

**A decision that changes after `spec.md` exists is amended in place.**
A later phase's iteration, or a decide-forward taken at the code,
records the change under the decision's own `## Decisions` entry as a
dated, attributed line:

```
> **Amended (<source>, <date>):** <the decision's final statement>
```

`<source>` is the user for a ruling, the session otherwise. The lines
are **append-only**; where several mark one decision the latest is
authoritative, and every ripple check reads sites against it. The plan
takes the same grammar (the write-plan skill, § Task Structure), so an
operator learns one shape. The writer is whoever holds the moment:
write-plan when the plan's grounding overturns a decision, review's
facilitator at a decide-forward disposition, implement's drift valve at
the code. Decide-forward mints no grammar of its own.

## Self-Review (inline)

Calibration: only flag what would send write-plan in the wrong
direction. Item 1 runs first, on the scratch `spec.md` before
consolidation (`cases.md` § The Interview); items 2–6 run on the
consolidated spec.

1. Every input mapped: each item of every source `cases.md` § The
   Interview lists, answered by a decision or the codebase, or deferred
   with a reason?
2. Spec written in glossary terms: no `_Avoid_` words, and no term
   defined in the spec that belongs at its home (glossary entry, code
   construct, or prose home)?
3. Every decision carries its rationale?
4. Edge cases resolved, not parked? A scenario that surfaces only now,
   at consolidation or here, joins the agenda as a question put to the
   user, never resolved by the session; unattended, it is prepared like
   any other question.
5. Glossary delta matches the actual edits made to the glossary home,
   to any code-home doc sentences, and to any prose-home sentences, and
   every deferred entry carries the definition sentence the plan must
   land?
6. Load-bearing spec claims probed or marked `inferred:`: a decision
   premise, a domain rule, an out-of-scope reason, a premise inside an
   interview question's own text or an open question's, each one
   nothing measured carrying a stamp or the marker; and every citation
   of another artifact's claims naming that artifact's measurement
   basis, re-verified at use or carried `as-of <basis>` (register
   rules: the sweep skill, § Claims: stamps, controls and the sweep
   artifact)?

Fix issues inline and move on: no re-review loop.

## User Review Gate

*Read with this section: `mechanics.md` § User Review Gate (the mechanics) and `cases.md` § User Review Gate (the cases).*

> "Spec written to `<path>`, glossary updated. Please review: is this what we mean?"

Iterate on any input that arrives. **Default: proceed to the phase
close — review post-hoc at the phase commit
(`git -C <state folder> show <sha>`), or at `spec.md` itself where the
files are the record** (the process contract, § Defaults and holds).

The close then writes outward and commits what this phase wrote: the
project checkout, each machinery tree, then the state folder, with any
ruling on another topic in flight written before the state-folder
commit. **Read the substrate contract whole now, and the process
contract's § Topic kinds**, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. They hold the network
boundary, commit ownership, git is never guessed, the two tree options
with the project checkout's pre-flight, the branch workflow, staging by
explicit path, concurrent edits on a shared tree, committing by hunk and
the two commit registers; and the two topic kinds with the duty to
commit machinery edits. The substrate contract's head says where git is
in reach; a session that meets none of its cases reads nothing there.

**Capture block:** invoke the `ymer:capture` skill, source `define`.
The battery, the drop grammar and the write live in that skill alone.

## Next Phase

*Read with this section: `cases.md` § Next Phase (the cases).*

Stop and name the next phase, normally **write-plan**, in a fresh
session (the process contract, § The map). Never invoke it here. If the
interview undermined the chosen direction, name **brainstorm** instead.

## Bootstrap Mode

*Read with this section: `mechanics.md` § Bootstrap Mode (the mechanics) and `cases.md` § Bootstrap Mode (the cases).*

Bootstrap is a one-time mode per repo, run when invoked as
`/ymer:define bootstrap`. For a repo with existing code and no
glossary, it sweeps the current vocabulary into the glossary so the
debt is visible, without resolving it. It needs no topic directory and
no brainstorm or survey input: the glossary itself is the artifact, and
§ Input does not apply.

**Read the process contract's § Knowledge placement now**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`,
for where the glossary it creates lives. The glossary takes the format
in § The Glossary. Before the fan-out (`mechanics.md` § Bootstrap
Mode), **read the process contract's § Defaults and holds now**, unless
already read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`,
for the fallback rule.

- No renames, no interview, no refactoring: one user review gate on the
  collected list. **Default: commit the collected register at the close
  — review post-hoc at the commit (`git -C <checkout> show <sha>`)**
  (the process contract, § Defaults and holds). The commit is
  `mechanics.md` § Bootstrap Mode's; **read the substrate contract whole
  now** before it, unless already read this session:
  `${CLAUDE_PLUGIN_ROOT}/substrate-contract.md`.
- Grandfathered ≠ protected: canonical-by-default (do not invent
  synonyms for them) but explicitly awaiting a define session.

## Term Mode

*Read with this section: `mechanics.md` § Term Mode (the mechanics) and `cases.md` § Term Mode (the cases).*

Term Mode sharpens a single term with no topic, run when invoked as
`/ymer:define term <term>`. Use it the moment the need appears: bless a
new term, or promote one grandfathered term, without opening a pipeline
topic. It needs no topic directory and writes no `spec.md`: the
glossary edit is the artifact, and § Input does not apply.

**Before the first question, read the interview procedure whole and the
process contract's § Defaults and holds now**, unless already read this
session: `${CLAUDE_PLUGIN_ROOT}/interview.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`, for the question
discipline and the interview as a hold.

- **Read the process contract's § Knowledge placement now**, unless
  already read this session: `${CLAUDE_PLUGIN_ROOT}/process-contract.md`,
  for where the project glossary lives. Then read the project glossary
  and place the term: blessed, grandfathered, or absent, and by term
  kind (→ Term kinds). The referent gate applies to every term kind,
  not only code-backed (→ The referent gate).
- Verify how the code actually uses the term before proposing anything:
  a mini-scout scoped to the term (inline search; an Explore agent only
  when usage is spread wide).
- Allowed outcomes: add a new blessed entry, or promote a grandfathered
  entry whose name and meaning survive the interview, recording the
  `_Avoid_` synonyms found on the way.
- A rename or a redefinition bounces to a define topic (`cases.md`
  § Term Mode). At the bounce, **read the operations contract whole
  now**, unless already read this session:
  `${CLAUDE_PLUGIN_ROOT}/operations-contract.md`, for *mint task*, its
  read-back and the failure rule.

One user review gate on the glossary edit. **Default: commit the
glossary edit at the close — review post-hoc at the commit
(`git -C <the glossary's tree> show <sha>`)** (the process contract,
§ Defaults and holds). The commit is the phase's, project and plugin
glossaries alike (`mechanics.md` § Term Mode); **read the substrate
contract whole and the process contract's § Topic kinds now** before
it, unless already read this session:
`${CLAUDE_PLUGIN_ROOT}/substrate-contract.md` and
`${CLAUDE_PLUGIN_ROOT}/process-contract.md`. Then the capture block
(→ User Review Gate).

## Remember

- What we MEAN: not what IS (scout) or how to build (write-plan).
- One question at a time, recommendation first; the codebase answers
  what it can; every input maps to a question, an answer or a
  deferral. The interview is a hold: unattended, it is prepared into
  `spec.md` under the `Interview pending —` marker and the close runs
  around it.
- Every term is defined once, at its term kind's home: the glossary
  (conceptual), the code construct (code-backed), the prose doc
  (principle); everything else points there.
- Update the glossary the moment a term crystallizes, but only when
  everything its entry asserts is real; what is planned waits in the
  spec's glossary delta.
- A deferred redefinition leaves a `Redefinition in flight` marker on
  the entry; a deferred new term leaves nothing.
- A term whose referent is retired keeps a historical entry because
  records still speak the word; the retiring change's own KEEP list
  decides, once.
- Renames ripple through the pipeline, never ad hoc.
- Term mode blesses or promotes one term; renames and redefinitions
  open a define topic.
- A decision that changes after the spec exists is amended in place,
  in the plan's own marker grammar; a full re-define rewrites `spec.md`
  under a dated header block, superseded text kept as record.
- The phase commits its glossary edits and every machinery edit at the
  close, project and plugin glossary alike, and the spec's glossary
  delta records the refs.
