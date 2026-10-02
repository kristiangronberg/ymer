# Defining — cases

The cases of the define skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## The Interview

Build the question list from: the brainstorm's open questions, the survey's
"open questions for define", flagged overloads and near-synonyms,
reality-vs-direction conflicts, and grandfathered glossary terms the topic
will use.

**Hold: every question — the interview is the user's alone, never
defaulted** (*Defaults and holds*: development-process). Unattended —
read at the question, as the procedure says — the phase prepares every
remaining question into this artifact's `## Interview` under the
`Interview pending —` marker and closes around the interview as a
pending step (the procedure's § 4. Pending; define's own close:
→ Unattended: closing around the interview, below).

- **The codebase answers what it can.** A question the code can settle is
  not asked: check inline, amend `survey.md` with the finding, and state the
  answer with its evidence.
- **Challenge the words.** When a term is vague, overloaded, or has
  near-synonyms in the code, propose one precise canonical term with its
  `_Avoid_` list alongside.
- **A promotion question names no kind.** Put it as promote now / flag;
  the kind line in the spec's entry is written from the charter's test
  (→ Term kinds) after the pick, with the sibling-glossary grep —
  `rg '^### <term>' <checkout>/../*/docs/glossary.md`, over the checkouts
  beside this one, the parent derived from `<checkout>` — as the
  first probe. Kind is the charter's to determine, not the user's, and
  an option label that asserts one asserts what nobody has checked.

- **Verify stated domain rules against the code.** Surface contradictions
  rather than recording folklore.
- **Do not consolidate until shared understanding is confirmed** — but keep
  `spec.md` as a scratch record from early in the interview, appending each
  decision as it lands, so an interrupted session loses nothing.
  Consolidation rewrites it in place — a pending interview's marker and
  `## Interview` section leave in that rewrite, and at the close that
  routes the topic back to brainstorm.

### Unattended: closing around the interview

A pending close is a finished close around a hold, not a torn one. It
runs the fused scout whole where no `survey.md` exists — its own
`: scout` commit and capture block, its optional scope question not put —
then steps 1–4, and builds the question list as above. It writes
`spec.md`: the title, the `Interview pending —` marker, the metadata
paragraph, a `## What we mean (draft)` section stating the topic as far
as it can be stated, with no decision in it and rewritten at
consolidation, and the `## Interview` section in the shape
development-process § Artifacts gives; decisions landed before a
refusal mid-interview stand in their own section, each named by its
question's `Answered:` line. On an iteration, where `spec.md`
already stands, the marker and the section join it and its text stays as
it is. No glossary write and no outward ruling: the close is the state-folder
commit under the pending message, the capture block, and the report
(→ Next Phase); the review gate is never reached.

## The Glossary

A product spanning several repositories keeps one language through
per-repo glossaries, never one shared file: a term is defined in
exactly one repo — the one owning its referent — the downstream repo
adopts the upstream's meaning where vocabulary overlaps, and pointer
entries run only the way visibility allows (a private repo may name a
public one, never the reverse).

The template is the seed, not a ceiling. A glossary's header may extend it
with prose that is genuinely that repo's own — where its terms are homed,
which sibling repo owns a shared concept. It may never restate a charter
rule: the document's structure, the entry format, the marker grammar. A
restatement is a second home for a rule stated here, and the define session
that finds one deletes it.

**Entry format — every glossary, always.** These shapes and the A–Z
structure are the charter's, not the file's: write them even when the file
in front of you uses another style (bold heads, topical sections), and
never convert neighbouring entries — new and edited entries take this
shape; the rest of the file is not this session's work.

### Term kinds — where the definition is homed

Never mint a code construct to give a term a documentation peg: an unused
public `@type` does not even warn, so a dead anchor would sit silently.
Only a construct the code genuinely traffics in qualifies as a code home.

### Library-homed terms

- **No version, ever.** The version's single home is the consumer's
  `mix.exs`/`mix.lock`. A version repeated in glossary prose is a second
  store that goes stale silently, and a git-SHA pin means a version string
  may not even identify the code the build contains.
- **No backticked module reference.** ExDoc's `get_deps/0` walks every
  dep — path, git and hex alike — and synthesises a hexdocs URL of the
  form `hexdocs.pm/<app>/<vsn>/` for it with no existence check, so a
  backticked reference to a library that publishes no hex docs renders as
  a link that 404s. Plain prose naming the library is the pointer.

- Where a pinned version genuinely diverges in a way the consumer's domain
  depends on, that divergence is a fact about the consumer and earns its
  own entry; it never lives as a stamp on the pointer.

### The referent gate

The gate is on the referent, never on the entry's own home: for a
conceptual term the entry *is* the home, so a home-shaped test is circular
there and waves the term through. A dangling autolink and a lying entry
are the same defect — an entry asserting a reality that does not exist —
seen at two different homes.

A rename or redefinition of an existing term ripples: re-evaluating its
usage sites becomes work the plan must include. Record it in the spec's
glossary delta; never fix call sites ad hoc from this session. When the
spec enumerates the ripple's sites, that list is a sweep — build it per
the sweep skill, recall-first,
never one exact phrasing.

### Redefinition in flight

Capital R, em-dash, line start — the iteration marker's discipline, so
operators read one shape in two places. Where several topics redefine one
term the markers stack newest-first, each naming its own topic. Removal
rides the same plan task that writes the new definition; if that topic is
*retired* instead, no task removes it — the marker's topic ID leads a
reader to a cancelled task, and the next define session touching the term
clears it.

The marker rides on **every** term kind, code-backed included: an
in-flight redefinition is glossary-native metadata with no code home — a
process fact, not a code fact — and excluding code-backed entries would
leave unwarned exactly the entries whose autolinked doc is about to
change. A deferred *rename* keeps the old entry, its marker naming the
incoming name in the `<what changes>` clause; the new entry is written by
the plan alongside the rename's own ripple work.

### Historical entries

The entry stays an ordinary A–Z entry under its letter. Findability is
the whole use case — a reader meets the word in an old record and looks
it up where every other term is — so a segregated section is wrong by
construction: it asks the reader to already know the term is retired.

**It satisfies the referent gate, it does not except it.** A historical
entry's claim is that this word named a thing that is gone and survives
in the records it names — present-tense-true. What the gate refuses is
an entry asserting a reality that does not exist.

**Admission is the retiring change's own KEEP list.** A retirement
ripples like any other change to a term, so the retiring plan already
sweeps the term's sites; that sweep's KEEP list — the immutable records
it must not rewrite — is the admission evidence, and no separate search
is run. Non-empty → write the entry, naming those records in the
survival clause. Empty → delete the entry, and the successor's `_Avoid_`
list parks the name. The decision is taken once: an entry written under
a non-empty KEEP list is permanent, because the records that warranted
it are immutable.

**The survival clause names a kind of record, never an individual one.**
A glossary is read by people who have never seen this project's working
history and cannot open its records, so `the retired learn phase's
learning.md records` is a usable pointer where a dated folder name is
not. The KEEP
list is the evidence behind the clause; it is not the clause.

The date is the retiring change's — the day the referent left, which
`implemented.md` records. A retirement in flight carries a
redefinition-in-flight marker like any other pending change to a live
entry; it is removed by the task that writes the historical opener,
which is that entry's new body. A **rename** is not a retirement: the
referent survives under a new name, so the old name goes under the
successor's `_Avoid_` and no historical entry is written. Blessed-tier
only — a grandfathered entry (→ Bootstrap Mode) is "recorded, not
blessed" under its own register's charter, which already covers a
retired referent.

## The Spec (`spec.md`)

**Amending a decision in place.** A decision that changes after `spec.md`
exists — a later phase's iteration, or a decide-forward taken at the code
(charter: development-process, *Iteration*) — is recorded under its own
`## Decisions` entry as a dated, attributed line:

```
> **Amended (<source>, <date>):** <the decision's final statement>
```

`<source>` is the user for a ruling, the session otherwise. The lines are
**append-only**; where several mark one decision the latest is
authoritative, and every ripple check reads sites against it. This is the
**same grammar the plan's amendment marker takes** (whose home is
write-plan § Task Structure) — one shape in two artifacts, deliberately,
so an operator learns it once. This section is the spec side's home; the
writers are whoever holds the moment — write-plan when the plan's
grounding overturns a decision, review's facilitator at a decide-forward
disposition, implement's drift valve at the code. Decide-forward mints no
grammar of its own.

**The amendment carries a same-session footprint sweep**, whichever
writer holds the moment. Sweep the decision's footprint immediately, by
write-plan § Task Structure's recipe — the whole plan plus every
`payloads/` file, no disposition-based exemptions, matchers per the
sweep skill — and revisit every hit against the amended statement. The
recipe is read there, not reproduced here: a copy that keeps the scope
and drops the matcher discipline is a sweep that under-matches while
looking done. One recipe,
two markers: the spec-side amendment gets no sweep of its own **text**,
because the sites that go stale are the plan's. Without it the record
is amended while the plan still says the old thing, and the next
implement applies those steps and payloads verbatim. **A footprint that
resists mechanical correction** means this was not a decide-forward
after all: stop, and let the route rule name the phase (charter:
development-process, *Iteration*, where that rule lives).

A **partial** supersede (the premise died, the verdict lives) and a
whole-section re-derive each take a dated note in place instead: the entry
is still live, and a banner would overstate it. What never happens is a
second spec file — one artifact, rewritten in place, its history in the
state folder's phase commits.

## Bootstrap Mode (one-time per repo)

- **Seed from the siblings — reconcile, never copy.** Read the
  checkouts' glossaries beside this one and the plugin's own glossary
  file for established wording, and classify
  each swept term a sibling also carries:
  - a **library concept this repo consumes** → a pointer entry
    (→ Library-homed terms);
  - the **same word with a different local meaning** → record the
    collision in the grandfathered note, so the later define session sees
    it;
  - **neither** → record locally, borrowing the sibling's wording only
    where it genuinely fits.

  Nothing is copied wholesale: a copied entry is a restatement, and it
  looks locally authoritative from day one. The beat classifies and
  points — it resolves nothing and promotes nothing.

Promotion, in later define sessions:

- A grandfathered term the spec must use is resolved in that session —
  promoted to a blessed entry, possibly renamed or redefined (ripple → plan
  work).
- A term the topic merely brushes is flagged in the spec's glossary delta,
  not force-resolved — sessions must not balloon.
- A cluster of grandfathered terms can itself be a define topic.
- A grandfathered term a topic speaks only to **retire** is deleted, not
  promoted — no historical entry: the register's charter already covers
  a retired referent (→ Historical entries).
- After a promotion the grandfathered bullet is **deleted** — the
  blessed entry is the record and git keeps the trace; no in-file
  promotion note.
- A grandfathered bullet whose retirement or redefinition is deferred to
  the plan carries the redefinition-in-flight marker as an **indented
  continuation line under the bullet** — the `###`-head form
  (→ Redefinition in flight) is the blessed register's.

## Term Mode (single term, no topic)

- Interview mechanics as above, scoped to one term: one question at a
  time with a recommended answer; challenge near-synonyms; stress-test
  the definition with a concrete scenario or two. The interview is a
  hold as above; unattended, term mode has no topic artifact to prepare
  into, so it stops at its first question with nothing written, its
  report naming the question.

- **Renames and redefinitions bounce.** When sharpening shows the term
  needs a different name, or a meaning that contradicts existing usage
  sites, term mode must not resolve it: the ripple through the codebase
  warrants a full define topic and its implementation plan. Leave the
  entry's **definition** untouched — but write its redefinition-in-flight
  marker (→ Redefinition in flight): the bounce *is* the moment the
  redefinition goes in flight, and the gap before the define session picks
  the topic up is exactly the window in which the entry misleads. Mint the new topic's task at `doing` (*mint task* — binding: the operations contract; the direction is already chosen, so the topic's work starts now — and read the mint back) so the bounce is not lost, carrying the deferred definition sentence in the task's description — the task stands in for the spec's glossary delta in this mode — and stop, naming
  define as the next phase
  (fresh session). The direction is already chosen, so the topic enters
  the pipeline at define — brainstorm is skipped, and the interview keeps
  its normal escape back to brainstorm.
- **An ordinary deferral is captured instead.** A new term whose
  referent is not real yet (→ The referent gate) is not written here
  either: capture it as an **idea** drop in the pool through the
  `ymer:capture` skill, source `define` — its title the thing the term
  names, its body the term and its definition sentence — and stop
  without writing the entry. No direction is chosen yet and no work
  starts now, so no task is minted, unlike the bounce above.

## User Review Gate

**Zero glossary writes** — the common close since the referent gate
deferred most new terms to plan work: no branch is born, no
project-repo or machinery-tree commit runs, and the spec's glossary delta
records no ref. The state-folder commit below is then the close's only commit, and
nothing here is a judgment call.

**Rulings on another topic in flight** (the outward-write rule: the
operations contract) run before the state-folder commit, so `spec.md`
can record what was written. A topic still `doing` that the interview
ruled on — scoping or narrowing it, falsifying a claim it carries, or
affirming it with re-measured evidence — is annotated here (*annotate
task*), the ruling as the evidence; `spec.md` names the task and what
the annotation carried. A ruling on anything else writes nothing
outward, and neither does a bare citation with no ruling; the topic's
own task is never a case. An operation whose required outcome did not
land stops the close (the operations contract's failure rule).

## Next Phase

A pending close (→ The Interview) names no next phase: the report names
the pending interview — the marker's count, the trigger's evidence
quoted, the tool list or the refusal text — and its resume command,
`/ymer:define <topic>`, written out, with the resumed session's announcement
line as its verify; brainstorm, scout or write-plan invoked in its place
stops on the marker and names define.
