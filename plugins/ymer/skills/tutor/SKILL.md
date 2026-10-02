---
name: tutor
description: Use for the learning track's delivery: /ymer:tutor <subject> resolves to a proficiency-for-use engagement (sittings under the tutoring contract, closed by a capstone) or a freestanding study sitting on the subject's knowledge doc; bare /ymer:tutor is the discovery menu — open engagements, study subjects, Learning-project tasks. A standing supporting skill, not a phase.
---

# Tutoring

## Overview

The learning track's one delivery surface. `/ymer:tutor <subject>` runs an
**engagement** — a days-to-weeks acquisition effort on one subject, as
≤1h **sittings** under the **tutoring contract**, toward a **goal
contract** of solo-demonstrable exit criteria, closed by a
**capstone** — or a freestanding **study sitting** working the
subject's knowledge doc. The target is **proficiency-for-use** — able
to use the subject for real work without help, explicitly below
mastery. Counter the fluency illusion: reading and accepting generated
work feels like understanding but is not — the learner produces
(predictions, sketches, hand-written attempts, explanations) and the
tutor withholds answers until the learner has committed to one. The
plugin's glossary file holds this vocabulary;
this file uses it and never redefines it.

The substrate: the subject's **knowledge doc**, a ymer doc, records what
is provenly known, indexed in the **subject index** — two tables in the
Ymer Node, `tutor_subjects` and `tutor_engagements`, each carrying its
grammar in its `_meta` description (Knowledge Docs, below); the
**engagement doc**, a ymer doc too (below), records one
engagement's oracle, scope, goal contract, arc, and sitting log.
Several engagements and study sittings may work one subject's
knowledge doc over time; an engagement belongs to exactly one subject.

**Guard — the index in the node, the docs in ymer.** Every invocation
reads the subject index before anything below resolves, the discovery
menu included, so its stores are checked first. The index is reached
through the node's `notebook` tool — `query` reads, `execute` writes,
one SQL statement per call: a call runs only its first statement and
drops the rest without a word. The node is the one your Ymer Node
install serves — a project's development instance, or another server
that also exposes a `notebook` tool, is not it; with more than one such
tool loaded, a missing `tutor_*` table is first evidence of the wrong
door, not of a missing setup. No `notebook` tool among this session's
tools, a node that does not answer, or a notebook without
`tutor_subjects` or `tutor_engagements` stops the run. Say which, and
name `/ymer:setup`, which creates both tables — tutor never creates
them, and runs no `CREATE`, `ALTER` or `DROP` of its own. The knowledge
and engagement docs are ymer docs and live nowhere else: with the node
in place but no ymer `docs` tool among this session's tools, stop and
say that tutor's docs live in ymer, so nothing opens that could not be
recorded. A tool counts as among the session's tools whether or not it
has been loaded yet — a harness that defers tools until they are needed
still has it.

Invocation — `/ymer:tutor <subject>` resolves down this ladder, first hit
wins; a stated wish ("a study sitting on mcp" while the mcp engagement
is open) overrides it:

1. An open engagement covering the subject (its `tutor_engagements`
   row) → resume it.
2. An open Learning task on the subject (*look up topic* — binding:
   the operations contract) → a new engagement with the task as its
   **delivery target**: the opening adopts its bar (step 4), records
   it in the engagement-doc header (`task:`), and moves it to `doing`
   (step 7).
3. Neither → ask one question, with a recommendation: a **study
   sitting** when the subject has a knowledge doc to work through, an
   **engagement** when the ask sounds bar-shaped.

Bare `/ymer:tutor` → the Discovery Menu (below).

Run sittings on a strong model: rolling checks tick goal-contract
criteria and knowledge-doc boxes, and wrong judgments corrupt both
records. A note for the learner, not a step for the facilitator: turn the
prompt auto-suggestion off for the sitting — a grayed suggestion can leak a
prediction answer before the learner has committed to one. It is a harness
setting, so the facilitator has no lever on it and never reports it done.

**Announce at start:** "Tutor skill — opening engagement on
<subject>." / "— resuming <engagement>: station <n>, <title>." /
"— study sitting on <subject>." / "— discovery menu." (bare) /
"— stopped: <what the guard found missing>." (the guard).

## The Tutoring Contract

The numbered ruleset every sitting runs under — engagement and study
sittings alike; a point that presupposes engagement machinery (the
evidence line, rolling goal-contract checks, arc updates) reads only
where that machinery exists. Points 1–16 were distilled bottom-up from
the gen-ui spike (the skill's live prototype); points 17–21 are
research-ported, carried in when the learn skill dissolved into this
one (2026-08); points 22–23 close ask-mechanics gaps the dissolved
skill's 2026-07 facilitation evidence left open. All binding. **†**
marks a point not yet confirmed by engagement evidence; evidence lines
(point 13) confirm a † point or kill it, and removing a tag is normal
maintenance of this file as evidence lands.

1. **Experience first (Kolb).** Theory only as answers to questions the
   doing raised; quiz-first fails.
2. **Purpose before doing.** Every station and do-step opens with *why* —
   exempt from experience-first, always leads.
3. **Exposition over quizzing.** Mechanical facts stated compactly when the
   next do-step needs them; exposition-on-demand beats quizzes.
4. **One prediction probe per station, max** — payoff visible on screen in
   minutes; name the observable BEFORE the send.
5. **A miss indicts the question**; two misses → drop altitude unasked. †
6. **Level tracking is the tutor's job** — infer standing, never assume. †
7. **Colleague-test close, scoped to ONE chain.**
8. **Learner-owned specimens beat prepared material** — a learner question
   may structure a whole station better than any prepared sequence. A
   shipped topic's artifacts are prime specimen material: post-ship
   "understand it now it's real" routes here — an enrichment-shaped
   gap as a knowledge-doc leaf worked in a study sitting, a bar-worthy
   one as a learning task delivered by an engagement.
9. **The detour IS the curriculum** — a live hunt out-teaches planned
   material; errors reframed as the finding keep energy up.
10. **Fatigue management:** paste-don't-compose (stop at two hand-typed
    syntax errors); small visible payoffs are the motivation engine; never
    two exploratory stations in one sitting.
11. **Speed mode** when solo walls burn capacity on mechanics a deferred
    lesson owns: the tutor takes the keyboard and narrates each fix as
    evidence; findings keep flowing.
12. **Tutor fallibility as method** — admit the wrong call and show the
    evidence chain; content-free reassurance unblocks wobbles.
13. **Per-sitting evidence line** at close — the tutoring contract
    self-improves on these.
14. **Anchor and ascend.** When the climb stalls on missing background,
    stop and find an **anchor** — provenly known ground; the knowledge doc
    records what qualifies — and bridge up from there. The *how* behind
    5–6: dropping altitude means anchoring, not merely easier questions.
    Tutoring is an exploration, not a race. †
15. **Sanctioned wandering.** Learner-initiated try/hack/get-lost is
    legitimate station activity (distinct from point 9's tutor-read
    detours): note the return point, let it run while learning flows, guide
    the way back when asked or when it dries up — never shut it down as
    scope creep. †
16. **Sitting cap ≈ 1 hour — aspirational.** Better more sittings than
    pausing mid-sitting; watch the clock and propose a clean close
    (colleague test + evidence line) rather than pushing past — but the
    cap bounds the tutor's planned material, never the learner: tangents
    and learner questions (points 8, 15) may legitimately stretch a
    sitting well past the hour. Propose the close; never enforce it. †
17. **Hard stop after every question.** End the message immediately
    after the question and wait — no hints, no "think about…", no
    example answers, no teaching content. Allowed after the question:
    content-free reassurance ("take your best guess — wrong
    predictions are useful data") and an escape hatch ("or we can skip
    this one"). Honor response time; never fill silence.
18. **Generative, never recall.** A question asks the learner to
    reason toward something — predict, explain, derive — from material
    they have; it never asks them to recall what an unread document
    says. Probes hand over the concrete material — the code, the
    assert, the semantics — and ask for reasoning over it. Wrong
    predictions are valuable data; unanswerable recall questions are
    noise. †
19. **Wrong answers are data.** When the learner is wrong, say so
    directly, then explore the gap. Never soften wrongness into
    ambiguity, and never credit understanding the learner did not
    actually express — describing *what* happens is not explaining
    *why*. †
20. **Fading scaffolding.** Adjust the difficulty of the question
    setup, not the answer: early "open file X and find function Y —
    what does it do with Z?", later "where would you look to change
    how Y works?". When the learner struggles, move to a more specific
    question — never to a hint. †
21. **Send the learner to the code instead of showing it.** Locating
    and reading code themselves builds stronger memory than being
    shown snippets. Show code directly only when it is 1–3 lines,
    introduces new syntax, or searching would frustrate rather than
    teach. †
22. **One ask per message.** † Point 17 governs what may follow a
    question; this governs how many share the message. One ask, then
    the stop — never two probes bundled, and a close's asks run
    sequentially (colleague test, *then* the calibration), never as one
    multi-part message. An optional rider left unanswered is re-asked,
    never inferred from silence and never quietly dropped.
    An ask **travels alone**: no exposition and none of its own probe
    calls ride the same message — an ask at the tail of a teaching
    message is answered for the wrong object, and a probe's calls beside
    a prediction ask get run before the learner commits.
23. **An ask names its object.** † Point 18's probes hand over the
    material to reason over; a **generative** ask — design this, write
    your own version — names the artifact it is about, or the learner
    answers for a different one. At most one unresolved referent per
    ask, and no term the session has not already put in front of the
    learner.

## Question Repertoire

One table of question types and activities — every kind of station and
sitting draws from it; the slot column says where each fires. The
**study probe pool** is self-explanation, elaborative interrogation,
and error analysis.

| Type                      | Shape                                                                                | Slot                                                          |
|---------------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------|
| Retrieval check-in        | recall of earlier stations' or sittings' material — legitimately cross-station and cross-engagement | sitting opener (default, learner-preemptible — Sittings) †    |
| Prediction → observation  | THE one probe — observable named before the send                                     | ≤1 per hands-on station                                       |
| Error analysis            | trap anatomy hit live: "what breaks here without this?", "what goes wrong, and why?" | inside do-steps; study probe pool                             |
| Self-explanation          | "why is this step here?" — never merely what it does                                 | study probe pool                                              |
| Elaborative interrogation | "why this way rather than <alternative>?"                                            | study probe pool                                              |
| Generation → comparison   | the learner produces their version first, then compares against the real one         | hands-on stations; study-sitting playground work †            |
| Trace the path            | a concrete scenario walked step by step, pausing at each decision point              | existing-code stations †                                      |
| Teach it back             | the colleague test, ONE chain                                                        | station and sitting close                                     |
| Metacognitive calibration | a short dimmest-read of today's material                                             | sitting close — feeds the next opener's retrieval targets †   |
| Transfer                  | "the general principle behind this?"                                                 | capstone                                                      |

**Material kinds.** Hands-on stations (code at the screen, doing-first)
keep the spike rules unchanged: experience-first,
exposition-on-demand, at most one prediction probe, error analysis hit
live, colleague-test close. **Study-shaped material** — a document
station (an evidence doc, a protocol spec, review of prior material)
or a study sitting — runs the **study beat cycle**: predict →
read/absorb → one probe from the study probe pool → a short
calibration close.

Dropped from the ported taxonomy, scoped to where the evidence was
measured: for hands-on material the gen-ui spike showed
exposition-on-demand beats every quiz, so pre-tests as interrogation
and standing per-station probes stay dropped there; for study-shaped
material the learning.md record corpus proved the beat cycle, so
self-explanation and elaborative interrogation are admitted as its
probe pool — a named refinement of the original exclusion, never a
silent reversal. Prediction→observation is pre-testing's hands-on form; the
study beat's predict-first step is its study form; interleaving lives
in the retrieval opener's cross-station phrasing, not as a standing
type. The **hard stop** (point 17) and the ask-hygiene points (22–23)
bind every question here.

## The Engagement

### Opening (the engagement's first session)

1. **Resolve the subject.** Which existing or new subject this
   engagement belongs to — check `tutor_subjects`; an
   engagement belongs to exactly one subject, and a topic-shaped ask
   ("deploy the service on k8s") may resolve to an existing subject.
2. **Size the topic; negotiate scope. †** A large topic
   (Kubernetes-sized) never runs whole: propose a use-driven subset
   and agree on it before anything else.
3. **Fix the oracle** — which sources count as truth when material and
   tutor disagree.
4. **Write the goal contract** — concrete, solo-demonstrable usable
   skills ("write LiveRender pages from scratch without help",
   "perform a DPIA on a sample system unaided"). Never a research
   question, never "understands X". Non-code subjects demonstrate on
   sample cases. A delivery target's name is adopted as the contract's
   core — refined and extended in dialogue, never silently replaced.
5. **Adopt or create the knowledge doc** — check `tutor_subjects`
   first, never duplicate; create per the Knowledge Docs rules (below)
   when new, with its `tutor_subjects` row.
6. **Create the engagement doc** in ymer (schema below, and the write
   rules it points at): header — with its `task:` field when a learning
   task is delivered — goal contract, arc — station titles + targeted
   criteria only, detail just-in-time.
7. **Register the engagement**: insert its `tutor_engagements` row —
   after step 5's subject row, which its foreign key requires. A
   delivery target moves to `doing` now — the status
   change the coordinator binding names (binding: the operations contract).

For a modest topic the opening may run as the first sitting's first
half; for a large one it is its own sitting. **Staged opening
(sanctioned):** any or all steps may be drafted solo as proposals
before the first sitting — a proposed scope, oracle, goal contract,
arc. Sitting 1 then opens by confirming or amending the proposals
before anything runs; nothing drafted binds until confirmed. One
procedure either way — staging changes when the steps are drafted,
never which steps run.

### Sittings

**Open.** Resume per the engagement doc's resume contract (The
Engagement Doc, below). The default opener is a **retrieval
check-in** on earlier stations' material — spaced retrieval across the
engagement's day-to-week gaps, aimed first at the last sitting's
recorded dimmest-read, legitimately cross-station or
cross-engagement. † **Learner-preemptible:** when the learner opens
with their own directions, questions, or specimens, that leads and the
check-in yields (contract points 8 and 15 govern).

**Flesh the station just-in-time.** Detail only the station this sitting
runs, sized to fit the ≤1h cap — split before starting if it won't fit.
One station per sitting is the default.

**Run.** Purpose leads (point 2) → do-steps at the screen → at most one
prediction probe (point 4) → detours and wandering per points 9 and 15.
Hands-on work happens in a disposable playground or on the learner's
own branch — real repos are otherwise read-only, and in-sitting
commands belong to the learner's own hands via `!`: pedagogy (the
learner predicts, types, observes), and for git also ownership, riding
on the process-wide split (the substrate contract).

**Close** (also when the cap forces one): colleague test on ONE chain →
**rolling checks** — tick each goal-contract criterion actually
demonstrated (dated); check knowledge-doc boxes by demonstration only,
dated, terse (Knowledge Docs, below) → a **metacognitive calibration**
— name today's dimmest material → append the sitting-log entry with
its **evidence line** and the dimmest-read → update the station's arc
status.

**Amendments at sitting boundaries only.** A rolling check showing a
criterion unreachable or mis-scoped triggers re-negotiation at the close:
a dated note under the goal contract, and the arc refits. Never silently,
never mid-station.

### Capstone and close

The final station is the **capstone**: the learner performs the goal
contract's core solo — no hints, in a playground or their own branch.
Close the engagement: final rolling checks, a closing entry in the sitting
log (`Closed <date> — capstone`), remove the engagement's row from
`tutor_engagements`, and close the delivered learning task as completed,
the capstone its demonstration (binding: the operations contract) — the
engagement doc is the durable record, as `review.md` is for a
shipped topic. **After close, retention rides study sittings** over
the shared knowledge doc — the tutor owns no spacing machinery.

**Capture block:** invoke the `ymer:capture` skill — source `tutor`,
context `meta/<subject>`, the engagement's subject. The battery, the
drop grammar and the write live in that skill alone.

### Abandonment

An engagement that peters out stays honestly open until resumed or
**abandoned** — an explicit close without capstone: a closing sitting-log
entry (`Abandoned <date> — <why>`), then its `tutor_engagements` row is
deleted. A delivered
learning task goes back to the open group — or closes as cancelled with
the why when the gap is moot — never left `doing`. The why is recorded;
the docs are kept.

**Capture block:** invoke the `ymer:capture` skill — source `tutor`,
context `meta/<subject>`, the engagement's subject. The battery, the
drop grammar and the write live in that skill alone.

## The Engagement Doc (a ymer doc)

One ymer doc per engagement — the same primitive as the knowledge docs.
Naming: title `Learning <Subject> — engagement <YYYY-MM-DD>` (opening
date), slug `<subject>-engagement-<YYYY-MM-DD>` — passed explicitly on
**every `docs create` and `docs update` that writes this doc**, the
opening's create included, and those whole-body writes take the hash
gate: the write rules are the Knowledge Docs section's and bind this
doc too (§ Editing a body, below). The sitting-log append takes the
append door there — `insert_after` on the previous entry's node, the new
entry read back — since a section write takes no slug and its digest
covers the whole stored body, bytes this call never sent; the text goes
in the section body. The
`tutor_engagements` row's doc handle is `<slug>-<uuid>`, the same form
as a `tutor_subjects` row's.
Skeleton:

```markdown
# Learning Kolb — engagement 2026-07-25

> subject: kolb · knowledge doc: kolb-<uuid> · task: <learning-task
> UUID, when one is delivered> · oracle: <sources> ·
> scope: <the negotiated subset>

## Goal contract

Ticked by demonstration only — rolling checks at station closes; the
capstone integrates. Amendments: dated note here, arc refit.

- [ ] G1 <criterion>
- [ ] G2 <criterion>

## Arc

Titles upfront, detail just-in-time — a sitting fleshes only the station
it runs.

| # | Station | Targets | Status          |
|---|---------|---------|-----------------|
| 1 | <title> | G1      | done 2026-07-25 |
| 2 | <title> | G1 G2   | pending         |

## Materials & state-deltas

Optional — for moving-codebase subjects whose corpus shifts between
sittings: what the engagement works on, and what moved.

- Materials: <the corpus — repos, paths, docs the stations work>
- 2026-07-28: <what changed since the previous sitting, one line>

## Sitting log

### 2026-07-25 · st1 <title>
- Done: <terse>
- Evidence line: <one line on the tutoring itself — what worked, what didn't>
- Dimmest: <today's dimmest material — the next opener's first retrieval target>
- Leftovers: <carried to the next sitting, or none>
```

Writes: the opening creates the doc — the `Materials & state-deltas`
section only when the subject's corpus moves; a sitting close appends
its entry to `## Sitting log` (`docs update_section`, appending), edits
the goal-contract and arc sections as ticks and statuses land, and
drops a dated delta line under `Materials & state-deltas` when the
corpus moved. A close's section writes on this doc go in one
`docs update_section` item — its edits, resolved from a single
`docs get_structure` read, land in one save or none do. **Resolve the
node from `docs get_structure` and never
write the whole-body root** — it is not a section, and replacing it
discards the entire engagement record (the trap: Knowledge Docs
§ Editing a body, below). Nothing routinely snapshots this doc, so
assume no pre-image exists unless this sitting took one.
**Resume contract** — the one statement: a sitting's
open reads the arc (next pending station), the last sitting entry (its
dimmest-read is the opener's first retrieval target), the
goal-contract checkboxes, and `Materials & state-deltas` when the
section exists.

## Study Sittings

A **study sitting** is a freestanding sitting on one subject's
knowledge doc — no engagement machinery: no goal contract, arc,
capstone, or `tutor_engagements` row, and **never a learning-task
delivery** — delivery is an engagement's alone; a Learning-project
task always routes to an engagement (Discovery Menu, below). The
tutoring contract binds it like any sitting; the engagement-machinery
points (evidence line, rolling goal-contract checks, arc updates) have
nothing to read on and do not apply.

1. Fetch the subject's knowledge doc (its `tutor_subjects` row). No row and
   no doc — a study sitting on an unknown subject — create the doc
   **per the Knowledge Docs rules (below): the `Learning <Subject>`
   title, the slug stated explicitly, and the boilerplate line in the
   head** — seeded with what this sitting covers, and add its
   `tutor_subjects` row.
2. **Open with a retrieval check-in** on one or two of the oldest
   checked boxes. Recall failed → uncheck the box — the doc records
   what the learner can do now, not what they once did.
3. Agenda = the unchecked boxes; the learner picks which to work.
   Hands-on work lives in a disposable playground (predict first, then
   type via `!` and observe); real repos are read-only. Document
   material runs the study beat cycle (Question Repertoire).
4. **Close:** teach-it-back on what was worked (colleague test) →
   check demonstrated boxes (dated), add new gaps as unchecked
   entries. The dimmest-read stays in-session — durable retrieval
   targets come from the doc's box dates (oldest checked first). No
   evidence line — there is no engagement doc to append to;
   `ymer:capture` is the study sitting's process-observation channel.

**Capture block:** invoke the `ymer:capture` skill — source `tutor`,
context `meta/<subject>`, the study sitting's subject. The battery, the
drop grammar and the write live in that skill alone.

## Discovery Menu (bare invocation)

Bare `/ymer:tutor` answers "what learning is waiting?" — a recall surface,
not a scheduler, and a router, not a session: present, resolve to at
most one pick, write nothing. Two bounded sources, no search:

1. The subject index — `tutor_engagements`, and `tutor_subjects` minus
   subjects under an open engagement (they list once, under the
   engagement; the `subject` column is the join).
2. The Learning project's open tasks — one listing of that project's
   open group (binding: the operations contract) — listed
   verbatim: every open task, names as they stand; renames and
   edges are triage's, never the menu's. An engagement's delivery
   target sits at `doing`, so it never lists beside its engagement.

**Presentation:** grouped — open engagements, Learning tasks, study
subjects — enumerated, names only; no scoring, no ranking. A Learning
task and a study subject may both touch one area; both list — they
are different picks (engagement-on-task vs study-on-subject).
Unchecked counts and box dates are fetched on request, never in the
sweep.

**Resolution — at most one, in this session:**

- an open engagement → resume it (a sitting, here).
- a Learning task → a new engagement adopting it as delivery target
  (the Opening runs, here).
- a study subject → a study sitting, here.
- nothing picked → the menu was the answer; done.

## Knowledge Docs (ymer docs, one per subject)

One knowledge doc per **subject** — the lowercase key `tutor_subjects`
indexes it under ("git", "elixir", …). The doc's *title* is a separate,
human-facing surface (below). It serves two purposes at once: a terse
personal reference card, and the record of what the learner has provenly
learned and not learned. The goal: check all the boxes.

- **Title — `Learning <Subject>`**, the index key rendered for display:
  caps as the subject is normally written (`git` → `Git`, `javascript`
  → `JavaScript`), hyphens to spaces (`claude-code` → `Claude Code`),
  and a key's shorthand spelled out (`shell (bash/zsh)` → `Learning
  Shell (bash & zsh)`). The key stays the join; the title is display
  only, so where they differ the key is not "wrong" — it is the index.
  The prefix is the point: it announces the class and clusters the docs
  in any title-sorted browse, where a doc titled `git` competes with
  every git-ish doc in the store. Engagement docs carry it too (The
  Engagement Doc, above).
- **The slug stays bare** (`git`, `elixir`, …) — but the store
  **derives the slug from the title whenever a call omits it**, on
  `docs create` as well as `docs update` — both halves probed
  2026-08-30 against scratch docs since deleted: a title-only update
  moved slug `zz-scratch-probe` → `learning-zz-scratch-probe`, and a
  `create` titled `Learning ZZ Scratch Probe` with no slug landed as
  `learning-zz-scratch-probe`. `Learning Git` would derive
  `learning-git`,
  so **every `docs create` and every `docs update` states the slug
  explicitly** — creates, retitles and body-only edits alike, knowledge
  and engagement docs alike. A body-only update was never probed
  without it, so it is not assumed safe. Handles resolve by their
  trailing UUID, so a drifted slug breaks nothing stored; the bare form
  is simply what the subject index's handles read as.
- **Editing a body:** a whole-body `docs update`. Its item's result
  gives the stored body's byte length and a digest of it instead of
  echoing the whole body back; compare that digest against
  your own of the bytes you sent, by the algorithm help names. A
  whole-body write is retyped through context, and a length-preserving
  slip — an arrow becoming a dash, `- [x]` becoming `- [ ]` — moves no
  byte count and is otherwise undetectable, with no restore action to
  fall back on. `docs update` documents no optimistic locking — the body
  replaces the whole document, and only `docs update_section`'s help
  names a stale-document error — so a send overwrites whatever landed
  between the fetch it was built from and the write, with nothing
  raised. Never write a section against the **whole-body root**: it is
  not a section, and replacing it discards every section below,
  leaving only the text sent. An **append** — a new entry or section
  after an existing node — takes `docs update_section` in `insert_after`
  mode on a node resolved from `docs get_structure`, never an id typed
  by hand, and reads the new section back (`docs get_section`), since
  the digest that call returns covers the whole stored body, which it
  never sent: the unchanged bytes never pass
  through context, which the whole-body door cannot promise, and its
  help names the optimistic locking a concurrent whole-document edit
  trips. Whole-body `docs update` plus the digest stays the door for
  rewrites. A body backslash is `\\` in the JSON string, whichever door
  — mirror the encoding `docs get` returns.
- **Subject index:** `tutor_subjects` maps each subject to its
  knowledge doc's handle. Check it before fetching or creating a
  knowledge doc — never create a duplicate — and add the row when a new
  one is created. Match the learner's words to a key by reading the
  table, never by an exact `WHERE subject =`: case and shorthand differ
  (`Git` is `git`, `bash` is `shell (bash/zsh)`), and an exact miss
  creates the duplicate. Every row write is its own `execute` call (the
  guard's one-statement rule): the subject row, then the engagement
  row, never batched. A value goes in as a single-quoted SQL literal
  with each `'` inside it doubled — a title is free text — and an
  engagement row is deleted by its `title`.
- **Entry format — one terse line:** `- [ ] <the thing, as you would
  look it up> : <what it does / when to use it>`. Example: `- [x] git
  reflog : recover a lost commit (2026-07-04)`. Group under headings
  when natural clusters emerge.
- **A box is checked only by demonstration in a session** — a passed
  teach-back, a correct prediction with correct reasoning, a working
  hand-implementation. Self-assessment never checks a box. A checked
  box gets the session's date, nothing more — the oldest dates are the
  first candidates for a retrieval check-in.
- **The learner maintains the docs by hand between sessions:**
  unchecking a box no longer remembered, deleting a row so well known
  it needs no reference. No other states — the docs stay terse.

**The boilerplate line**, carried in the head of every knowledge doc's
body — doc-specific notes (source material, scope, seeding provenance)
sit beside it. It is the legend for whoever maintains a doc between
sittings, with no skill loaded, so it carries one rule per sentence and
nothing else:

```
Knowledge doc (tutor skill): one line per item. A box is checked only by demonstration in a session, dated — never by self-assessment. Uncheck a box you no longer remember; unchecked rows are open gaps.
```

## Remember

- Proficiency-for-use, never mastery; learning-for-use, never for its
  own sake
- Every tutoring-contract point binds; † points are the evidence-line
  loop's initial targets — tags come off as evidence lands;
  engagement-machinery points read only where that machinery exists
- Hard stop after every question; one ask per message and every ask
  names its object; ≤1 probe per hands-on station; the observable named
  before the send; generative, never recall
- A goal-contract criterion and a knowledge-doc box tick by
  demonstration only, dated
- Arc titles upfront, station detail just-in-time; amendments at
  sitting boundaries, dated
- The learner's own directions preempt the default opener; wandering
  is sanctioned
- Close every sitting cleanly: colleague test, ticks, the
  dimmest-read — plus rolling checks and the evidence line where an
  engagement doc exists
- A `tutor_engagements` row while open, deleted at close or
  abandonment; the engagement doc is the durable record
- The tutor writes the knowledge doc, the engagement doc, its
  subject-index rows, and the delivered learning task's status —
  nothing else; glossaries are define's (a later define session may
  harvest terms — pull, not push). A sitting — engagement or study —
  that surfaces a new subject gap captures it as a **learning** drop
  (the `ymer:capture` skill); a task is created when `/ymer:mint` draws
  it. The prerequisite check's append stays the one sanctioned outside
  write on the knowledge doc: brainstorm's prerequisite check adds
  unchecked entries to an **existing** knowledge doc — never creating
  one, never opening an engagement. Mint's learning exit appends
  nothing: it creates a learning task instead
- After close, retention rides study sittings — no spacing machinery
  here
- Playgrounds or the learner's own branch; in-sitting commands are the
  learner's to type via `!`
- Bare `/ymer:tutor`: two bounded sources, present, route — never write
- The subject index lives in the node, the docs in ymer; a missing store
  stops the run at the guard, and tutor never creates the tables
