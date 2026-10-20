# Define: cases

The cases of the define skill: the earned precision behind what `SKILL.md` describes, under the spine's own headings. Read a section's entries at the moment that section runs.

## Contents

- The Interview; Unattended: closing around the interview
- The Glossary; Term kinds; Library-homed terms; The referent gate; Redefinition in flight; Historical entries
- The Spec
- User Review Gate; Next Phase
- Bootstrap Mode; Term Mode

## The Interview

Build the question list from: the brainstorm's open questions, the
survey's "open questions for define", flagged overloads and
near-synonyms, reality-vs-direction conflicts, grandfathered glossary
terms the topic will use, and on an iteration the routed entries in
`review.md`. Map every item of every source as the agenda is built:
each to a question, to a codebase answer with its evidence, or to a
deferral with its reason. The mapping is scratch: it lives in the
scratch `spec.md` (and, as far as the agenda goes, in a pending close's
`## Interview`), and consolidation folds each item into its decision or
into § Out of scope after Self-Review item 1 has checked it. A pick whose
consequence lands on another site (a second file, another decision, a
term elsewhere) joins the agenda as a question, never parked as a
domain rule or an open question for write-plan.

**Hold: every question**: the interview is the user's alone, never
defaulted (the process contract, § Defaults and holds). Unattended
(read at the question: the interview procedure, § Ground rules), the
phase prepares every remaining question into `spec.md`'s
`## Interview` under the `Interview pending —` marker and closes around
the interview as a pending step (the interview procedure, § 4. Pending;
define's own close: → Unattended: closing around the interview).

- **The codebase answers what it can.** A question the code can settle
  is not asked: check inline, amend `survey.md` with the finding, and
  state the answer with its evidence.
- **Challenge the words.** When a term is vague, overloaded, or has
  near-synonyms in the code, propose one precise canonical term with
  its `_Avoid_` list alongside.
- **A promotion question names no term kind.** Put it as promote now or
  flag; the term-kind line in the spec's entry is written from the test
  (`SKILL.md` § Term kinds) after the pick, with the sibling-glossary
  grep (`rg '^### <term>' <checkout>/../*/docs/glossary.md`, over the
  checkouts beside this one, the parent derived from `<checkout>`) as
  the first probe. The term kind is the test's to determine, not the
  user's, and an option label that asserts one asserts what nobody has
  checked.
- **Verify stated domain rules against the code.** Surface
  contradictions rather than recording folklore.
- **Do not consolidate until shared understanding is confirmed**, but
  keep `spec.md` as a scratch record from early in the interview,
  appending each decision as it lands, so an interrupted session loses
  nothing. Self-Review item 1 checks the mapping on this scratch record
  first (`SKILL.md` § Self-Review (inline)); then consolidation
  rewrites it in place: a pending interview's
  marker and `## Interview` section leave in that rewrite, and at the
  close that routes the topic back to brainstorm.

### Unattended: closing around the interview

A pending close runs the fused scout whole where no `survey.md` exists
(its own `: scout` commit and capture block, its optional scope
question not put), then steps 1–4, and builds the question list as
§ The Interview says. It writes `spec.md`: the title, the
`Interview pending —` marker, the metadata paragraph, a
`## What we mean (draft)` section stating the topic as far as it can
be stated, with no decision in it and rewritten at consolidation, and
the `## Interview` section in the shape the interview procedure gives
(the interview procedure, § 4. Pending). Decisions landed before a
refusal mid-interview stand in their own section, each named by its
question's `Answered:` line. On an iteration, where `spec.md` already
stands, the marker and the section join it and its text stays as it
is. No glossary write and no outward ruling: the close is the
state-folder commit under the pending message, the capture block, and
the report (→ Next Phase); the review gate is never reached. The commit
is `mechanics.md` § User Review Gate's state-folder commit, its message
carrying the pending suffix (the interview procedure, § 4. Pending).

## The Glossary

A product spanning several repositories keeps one language through
per-repo glossaries, never one shared file: a term is defined in
exactly one repo, the one owning its referent; the downstream repo
adopts the upstream's meaning where vocabulary overlaps; and pointer
entries run only the way visibility allows (a private repo may name a
public one, never the reverse).

The usage header is the seed, not a ceiling. A glossary's header may
extend it with prose that is genuinely that repo's own: where its terms
are homed, which sibling repo owns a shared concept. It may never
restate a rule of the format (`SKILL.md` § The Glossary): the
document's structure, the entry shapes, the marker grammar. A
restatement is a second home for a rule stated there, and the define
session that finds one deletes it.

**The format binds every glossary, always.** The entry shapes and the
A–Z structure are this skill's, not the file's: write them even when
the file in front of you uses another style (bold heads, topical
sections), and never convert neighbouring entries. New and edited
entries take the shapes; the rest of the file is not this session's
work. A mixed file is the price of a bounded session: converting a
whole glossary is a topic of its own.

### Term kinds

Never mint a code construct to give a term a documentation peg: an
unused public `@type` does not even warn, so a dead anchor would sit
silently. Only a construct the code genuinely traffics in qualifies as
a code home. A code-backed entry needs a home it can autolink, so a
term whose construct is deliberately undocumented (`@doc false`,
`@moduledoc false`) is conceptual, its entry naming the construct in
prose.

### Library-homed terms

- **No version, ever.** The version's single home is the consumer's
  `mix.exs`/`mix.lock`. A version repeated in glossary prose is a second
  store that goes stale silently, and a git-SHA pin means a version
  string may not even identify the code the build contains.
- **No backticked module reference.** ExDoc's `get_deps/0` walks every
  dep (path, git and hex alike) and synthesises a hexdocs URL of the
  form `hexdocs.pm/<app>/<vsn>/` for it with no existence check, so a
  backticked reference to a library that publishes no hex docs renders
  as a link that 404s. Plain prose naming the library is the pointer.
- Where a pinned version genuinely diverges in a way the consumer's
  domain depends on, that divergence is a fact about the consumer and
  earns its own entry; it never lives as a stamp on the pointer.

### The referent gate

The gate is on the referent, never on the entry's own home: for a
conceptual term the entry *is* the home, so a home-shaped test is
circular there and waves the term through. A dangling autolink and a
lying entry are the same defect, an entry asserting a reality that does
not exist, seen at two different homes.

A rename or redefinition of an existing term ripples: re-evaluating its
usage sites becomes work the plan must include. Record it in the spec's
glossary delta; never fix call sites ad hoc from this session. When the
spec enumerates the ripple's sites, that list is a sweep: build it
recall-first (the sweep skill, § 3. Mode: a meaning sweep never rides
one phrasing), never on one exact phrasing.

### Redefinition in flight

The marker takes the iteration marker's shape, a capital first letter,
an em dash and line start (the process contract, § Iteration), so
operators read one shape in two places. Where several topics redefine
one term the markers stack newest-first, each naming its own topic.
Removal rides the same plan task that writes the new definition; if
that topic is *retired* instead, no task removes it: the marker's topic
ID leads a reader to a cancelled task, and the next define session
touching the term clears it.

The marker rides on **every** term kind, code-backed included: an
in-flight redefinition is glossary-native metadata with no code home, a
process fact and not a code fact, and excluding code-backed entries
would leave unwarned exactly the entries whose autolinked doc is about
to change. A deferred *rename* keeps the old entry, its marker naming
the incoming name in the `<what changes>` clause; the new entry is
written by the plan alongside the rename's own ripple work.

### Historical entries

The entry stays an ordinary A–Z entry under its letter. Findability is
the whole use case (a reader meets the word in an old record and looks
it up where every other term is), so a segregated section is wrong by
construction: it asks the reader to already know the term is retired.

**It satisfies the referent gate, it does not except it.** A historical
entry's claim is that this word named a thing that is gone and survives
in the records it names, which is true in the present tense. What the
gate refuses is an entry asserting a reality that does not exist.

**Admission is the retiring change's own KEEP list.** A retirement
ripples like any other change to a term, so the retiring plan already
sweeps the term's sites, and no separate search is run. The admission
evidence is the records on that sweep's KEEP list (the immutable
records it must not rewrite) that speak the term in its retired sense
and that the glossary's readers can meet; a same-word survivor with
another referent, or a record on one machine that no reader of the
glossary can open, is not evidence. Some such record → write the
entry, naming those records in the survival clause. None → delete the
entry, and the successor's `_Avoid_` list parks the name. The decision
is taken once: an entry written on that evidence is permanent, because
the records that warranted it are immutable.

**The survival clause names a class of records, never an individual
one.** A glossary is read by people who have never seen this project's
working history and cannot open its records, so `the retired learn
phase's learning.md records` is a usable pointer where a dated folder
name is not. The KEEP list is the evidence behind the clause; it is not
the clause.

The date is the retiring change's: the day the referent left, which
`implemented.md` records. A retirement in flight carries a
redefinition-in-flight marker like any other pending change to a live
entry; it is removed by the task that writes the historical opener,
which is that entry's new body. A **rename** is not a retirement: the
referent survives under a new name, so the old name goes under the
successor's `_Avoid_` and no historical entry is written. Blessed-tier
only: a grandfathered entry (→ Bootstrap Mode) is "recorded, not
blessed" under the grandfathered register's own rule, which already
covers a retired referent.

## The Spec

**An amendment carries a same-session footprint sweep**, whichever
writer holds the moment. Sweep the decision's footprint immediately, by
the plan's recipe (the write-plan skill, § Task Structure), and revisit
every hit against the amended statement. The recipe is read there, not
reproduced here: a copy that keeps the scope and drops the matcher
discipline is a sweep that under-matches while looking done. Where the
amendment rewrites text the spec itself quotes or derives values from
(counts, "exactly N" gates, check tables), the sweep covers `spec.md`
as well; otherwise the stale sites are the plan's. Without the sweep
the record is amended while the plan still says the old thing, and the
next implement applies those steps and payloads verbatim. **A footprint
that resists mechanical correction** means this was not a
decide-forward after all: stop, and let the route rule name the phase
(the process contract, § Iteration).

A **partial** supersede (the premise died, the verdict lives) and a
whole-section re-derive each take a dated note in place instead: the
entry is still live, and a banner would overstate it. What never
happens is a second spec file: one artifact, rewritten in place, its
history the state store's (the operations contract, § The topic's
artifacts), and none where the files are the record, since this rewrite
fills no pre-image slot.

## User Review Gate

**Zero glossary writes** is the common close, since the referent gate
defers most new terms to plan work: no branch is born, no project-repo
or machinery-tree commit runs, and the spec's glossary delta records no
ref. The state-folder commit is then the close's only commit, and
nothing at the gate is a judgment call.

**Rulings on another topic in flight** run before the state-folder
commit, so
`spec.md` can record what was written (the outward-write rule: the
operations contract, § Operations — the whole vocabulary the skills may
use). A topic still `doing` that the interview ruled on (scoping or
narrowing it, falsifying a claim it carries, or affirming it with
re-measured evidence) is annotated here, the ruling as the evidence
(*annotate task*, binding: the operations contract); `spec.md` names
the task and what the annotation carried. Where this define amends,
supersedes or adds an entry of its own `spec.md` § Decisions or § Out of
scope, each still-`doing` child this topic's `relations.md` lists is
annotated here too, and named in `spec.md` the same way (the
operations contract, § Inherited records). A ruling on anything else
writes nothing outward, and neither does a bare citation with no
ruling; the topic's own task is never a case. An operation whose
required outcome did not land stops the close (the failure rule: the
operations contract, § Operations — the whole vocabulary the skills may
use).

## Next Phase

A pending close (→ Unattended: closing around the interview) names no
next phase: the report names the pending interview (the marker's count, the trigger's evidence
quoted, the tool list or the refusal text) and its resume command,
`/ymer:define <topic>`, written out, with the resumed session's
announcement line as its verify. Brainstorm, scout or write-plan
invoked in its place stops on the marker and names define.

## Bootstrap Mode

- **Seed from the siblings: reconcile, never copy.** Read the
  checkouts' glossaries beside this one and the plugin glossary for
  established wording, and classify each swept term a sibling also
  carries:
  - a **library concept this repo consumes** → a pointer entry
    (→ Library-homed terms);
  - the **same word with a different local meaning** → record the
    collision in the grandfathered note, so the later define session
    sees it;
  - **neither** → record locally, borrowing the sibling's wording only
    where it genuinely fits.

  Nothing is copied wholesale: a copied entry is a restatement, and it
  looks locally authoritative from day one. The beat classifies and
  points; it resolves nothing and promotes nothing.

Promotion, in later define sessions:

- A grandfathered term the spec must use is resolved in that session:
  promoted to a blessed entry, possibly renamed or redefined (ripple →
  plan work).
- A term the topic merely brushes is flagged in the spec's glossary
  delta, not force-resolved: sessions must not balloon.
- A cluster of grandfathered terms can itself be a define topic.
- A grandfathered term a topic speaks only to **retire** is deleted,
  not promoted, with no historical entry: the grandfathered register's
  own rule already covers a retired referent (→ Historical entries).
- After a promotion the grandfathered bullet is **deleted**: the blessed
  entry is the record and git keeps the trace; no in-file promotion
  note.
- A grandfathered bullet whose retirement or redefinition is deferred
  to the plan carries the redefinition-in-flight marker as an
  **indented continuation line under the bullet**; the `###`-head form
  (`SKILL.md` § Redefinition in flight) is the blessed register's.

## Term Mode

- The interview mechanics of § The Interview, scoped to one term:
  challenge near-synonyms; stress-test the definition with a concrete
  scenario or two. Unattended, term mode has no topic artifact to
  prepare into, so it stops at its first question with nothing
  written, its report naming the question.
- **Renames and redefinitions bounce.** When sharpening shows the term
  needs a different name, or a meaning that contradicts existing usage
  sites, term mode must not resolve it: the ripple through the codebase
  warrants a full define topic and its implementation plan. Leave the
  entry's **definition** untouched, but write its redefinition-in-flight
  marker (`SKILL.md` § Redefinition in flight): the bounce *is* the
  moment the redefinition goes in flight, and the gap before the define
  session picks the topic up is exactly the window in which the entry
  misleads. Mint the new topic's task at `doing` (*mint task*, binding:
  the operations contract), since the direction is already chosen and
  the topic's work starts now, and read the mint back, so the bounce is
  not lost. The task's description carries the deferred definition
  sentence: the task stands in for the spec's glossary delta in this
  mode. Then stop, naming define as the next phase (fresh session). The
  topic enters the pipeline at define, brainstorm skipped, and the
  interview keeps its normal escape back to brainstorm.
- **An ordinary deferral is captured instead.** A new term whose
  referent is not real yet (`SKILL.md` § The referent gate) is not
  written here either: capture it as an **idea** drop in the pool
  through the `ymer:capture` skill, source `define` (its title the
  thing the term names, its body the term and its definition sentence),
  and stop without writing the entry. No direction is chosen yet and no
  work starts now, so no task is minted, unlike the bounce.
