---
name: tutor
description: Teaches a subject until the learner can use it for real work without help. /ymer:tutor <subject> opens or resumes an engagement, sittings toward a goal contract closed by a capstone, or holds a study sitting on the subject's knowledge doc; bare /ymer:tutor lists the learning that is waiting. Use when someone wants to learn a subject well enough to use it, or to work through what they already know of one.
---

# Tutor

Tutor teaches a subject until the learner can use it for real work
without help: the target is **proficiency-for-use**, never mastery.
`/ymer:tutor <subject>` runs an **engagement** on the subject, a series
of **sittings** under the **tutoring contract** toward a **goal
contract**, closed by a **capstone**; or it holds a freestanding **study
sitting** on the subject's **knowledge doc**. The plugin glossary
(`${CLAUDE_PLUGIN_ROOT}/glossary.md`) is the home of these terms: this
file uses them and never redefines them.

Tutoring counters the fluency illusion: reading and accepting generated
work feels like understanding and is not. So the learner produces
(predictions, sketches, hand-written attempts, explanations), and the
tutor withholds an answer until the learner has committed to one.

Tutor keeps its records in two stores: the **subject index**
(`tutor_subjects` and `tutor_engagements`) in the user's Ymer Node, and
the knowledge doc and the **engagement doc** in ymer. An engagement
belongs to exactly one subject, and several engagements and study
sittings may work one subject's knowledge doc over time.

This file is the spine: what each moment is for, in the order a run
meets them. The engagement doc's naming and skeleton, the docs' write
doors and the subject index's SQL are in `mechanics.md`; the cases that
went wrong once, and why a rule is drawn where it is, are in `cases.md`.
Both sit under this file's headings, and a section with entries there
names them in a line of its own. Neither is needed before both stores
have answered.

**Announce at start**, one line, whichever applies:

- "Tutor skill — opening an engagement on <subject>."
- "Tutor skill — resuming <engagement>: station <n>, <title>."
- "Tutor skill — study sitting on <subject>."
- "Tutor skill — discovery menu."
- "Tutor skill — stopped: <what the first moment found missing>."

## First, the stores

Before anything below resolves, the discovery menu included, check the
two stores in this order. Each check stops the run where it fails, and
the second runs only once the first has passed. A tool counts as among
the session's tools whether or not it has been loaded yet; a harness
that defers tools until they are needed still has it.

1. **The node.** The subject index is reached through the node's
   `notebook` tool, on the node your Ymer Node install serves. A
   project's development instance, or another server that also exposes
   a `notebook` tool, is not it. `notebook` `tables` shows both that the
   node answers and which tables it holds. Stop when this session has no
   `notebook` tool, when the node does not answer, or when the notebook
   lacks `tutor_subjects` or `tutor_engagements`: say which, and name
   `/ymer:setup`, which creates both tables. Tutor never creates them,
   and runs no `CREATE`, `ALTER` or `DROP` of its own. With more than
   one `notebook` tool loaded, a missing `tutor_*` table is first
   evidence of the wrong node, not of a missing setup, and the stop says
   so.
2. **The docs.** The knowledge and engagement docs are ymer docs and
   live nowhere else, so this session needs a ymer `docs` tool. With no
   such tool, stop and say that tutor's docs live in ymer, so nothing
   opens that could not be recorded.

The notebook runs one SQL statement per call: `query` reads, `execute`
writes, and a call runs only its first statement, dropping the rest
without a word. Every write below is therefore its own `execute` call.

*Read with this section, once both stores have answered: `cases.md` § First, the stores (the cases).*

## Invocation: the ladder

`/ymer:tutor <subject>` resolves down this ladder, and the first step
that matches wins. A stated wish overrides it ("a study sitting on mcp"
while the mcp engagement is open).

1. An open engagement covering the subject (its `tutor_engagements`
   row, the subject matched by the subject index's SQL in
   `mechanics.md` § Knowledge Docs): resume it.
2. An open Learning task on the subject (*look up topic*, binding: the
   operations contract, `${CLAUDE_PLUGIN_ROOT}/operations-contract.md`):
   a new engagement with the task as its **delivery target**. The
   opening adopts its bar (step 4), records it in the engagement doc's
   header (`task:`), and moves it to `doing` (step 7).
3. Neither: ask one question, with a recommendation. A **study
   sitting** when the subject has a knowledge doc to work through, an
   **engagement** when the ask sounds bar-shaped.

Bare `/ymer:tutor` goes to the Discovery Menu.

Run sittings on a strong model: rolling checks tick goal-contract
criteria and knowledge-doc boxes, and a wrong judgment corrupts both
records. One note is for the learner, not a step for the facilitator:
turn the prompt auto-suggestion off for the sitting, since a grayed
suggestion can leak a prediction's answer before the learner has
committed to one. It is a harness setting, so the facilitator has no
lever on it and never reports it done.

## The Tutoring Contract

Every sitting runs under these points, engagement and study sittings
alike, and every point binds. A point that presupposes engagement
machinery (the evidence line, rolling goal-contract checks, arc
updates) reads only where that machinery exists. **†** marks a point
not yet confirmed by engagement evidence: evidence lines (point 13)
confirm a † point or kill it, and taking a tag off is ordinary
maintenance of this file as evidence lands.

1. **Experience first (Kolb).** Theory only as answers to questions the
   doing raised; quiz-first fails.
2. **Purpose before doing.** Every station and do-step opens with *why*.
   It is exempt from experience-first and always leads.
3. **Exposition over quizzing.** Mechanical facts stated compactly when
   the next do-step needs them; exposition-on-demand beats quizzes.
4. **One prediction probe per station, max**, its payoff visible on
   screen in minutes; name the observable BEFORE the send.
5. **A miss indicts the question**; two misses → drop altitude unasked. †
6. **Level tracking is the tutor's job**: infer standing, never assume. †
7. **Colleague-test close, scoped to ONE chain.**
8. **Learner-owned specimens beat prepared material.** A learner question
   may structure a whole station better than any prepared sequence. A
   shipped topic's artifacts are prime specimen material: post-ship
   "understand it now it's real" routes here, an enrichment-shaped gap
   as a knowledge-doc leaf worked in a study sitting, a bar-worthy one
   as a learning task delivered by an engagement.
9. **The detour IS the curriculum**: a live hunt out-teaches planned
   material, and errors reframed as the finding keep energy up.
10. **Fatigue management:** paste-don't-compose (stop at two hand-typed
    syntax errors); small visible payoffs are the motivation engine;
    never two exploratory stations in one sitting.
11. **Speed mode** when solo walls burn capacity on mechanics a deferred
    lesson owns: the tutor takes the keyboard and narrates each fix as
    evidence, and findings keep flowing.
12. **Tutor fallibility as method**: admit the wrong call and show the
    evidence chain; content-free reassurance unblocks wobbles.
13. **Per-sitting evidence line** at close: the tutoring contract
    improves itself on these.
14. **Anchor and ascend.** When the climb stalls on missing background,
    stop and find an anchor the knowledge doc records as known, and
    bridge up from there. The *how* behind 5–6: dropping altitude means
    anchoring, not merely easier questions. Tutoring is an exploration,
    not a race. †
15. **Sanctioned wandering.** Learner-initiated try/hack/get-lost is
    legitimate station activity (distinct from point 9's tutor-read
    detours): note the return point, let it run while learning flows,
    and guide the way back when asked or when it dries up. Never shut it
    down as scope creep. †
16. **Sitting cap ≈ 1 hour, aspirational.** Better more sittings than
    pausing mid-sitting: watch the clock and propose a clean close
    (colleague test + evidence line) rather than pushing past. The cap
    bounds the tutor's planned material, never the learner: tangents and
    learner questions (points 8, 15) may legitimately stretch a sitting
    well past the hour. Propose the close; never enforce it. †
17. **Hard stop after every question.** End the message immediately
    after the question and wait: no hints, no "think about…", no
    example answers, no teaching content. Allowed after the question:
    content-free reassurance ("take your best guess; wrong predictions
    are useful data") and a way out ("or we can skip this one"). Honor
    response time; never fill silence.
18. **Generative, never recall.** A question asks the learner to reason
    toward something (predict, explain, derive) from material they have;
    it never asks them to recall what an unread document says. Probes
    hand over the concrete material (the code, the assert, the
    semantics) and ask for reasoning over it. Wrong predictions are
    valuable data; unanswerable recall questions are noise. †
19. **Wrong answers are data.** When the learner is wrong, say so
    directly, then explore the gap. Never soften wrongness into
    ambiguity, and never credit understanding the learner did not
    actually express: describing *what* happens is not explaining
    *why*. †
20. **Fading scaffolding.** Adjust the difficulty of the question setup,
    not the answer: early "open file X and find function Y; what does
    it do with Z?", later "where would you look to change how Y
    works?". When the learner struggles, move to a more specific
    question, never to a hint. †
21. **Send the learner to the code instead of showing it.** Locating and
    reading code themselves builds stronger memory than being shown
    snippets. Show code directly only when it is 1–3 lines, introduces
    new syntax, or searching would frustrate rather than teach. †
22. **One ask per message.** † Point 17 governs what may follow a
    question; this governs how many share the message. One ask, then
    the stop: never two probes bundled, and a close's asks run one after
    another (colleague test, *then* the calibration), never as one
    multi-part message. An optional rider left unanswered is re-asked,
    never inferred from silence and never quietly dropped. An ask
    **travels alone**: no exposition and none of its own probe calls
    ride the same message. An ask at the tail of a teaching message is
    answered for the wrong object, and a probe's calls beside a
    prediction ask get run before the learner commits.
23. **An ask names its object.** † Point 18's probes hand over the
    material to reason over; a **generative** ask (design this, write
    your own version) names the artifact it is about, or the learner
    answers for a different one. At most one unresolved referent per
    ask, and no term the session has not already put in front of the
    learner.

## Question Repertoire

*Read with this section: `cases.md` § Question Repertoire (the cases).*

One table of question types and activities. Every kind of station and
sitting draws from it, and the slot column says where each fires. The
**study probe pool** is self-explanation, elaborative interrogation and
error analysis.

| Type | Shape | Slot |
|---|---|---|
| Retrieval check-in | recall of earlier stations' or sittings' material, legitimately cross-station and cross-engagement | sitting opener (default, learner-preemptible: Sittings) † |
| Prediction → observation | THE one probe, its observable named before the send | ≤1 per hands-on station |
| Error analysis | trap anatomy hit live: "what breaks here without this?", "what goes wrong, and why?" | inside do-steps; study probe pool |
| Self-explanation | "why is this step here?", never merely what it does | study probe pool |
| Elaborative interrogation | "why this way rather than <alternative>?" | study probe pool |
| Generation → comparison | the learner produces their version first, then compares against the real one | hands-on stations; study-sitting playground work † |
| Trace the path | a concrete scenario walked step by step, pausing at each decision point | existing-code stations † |
| Teach it back | the colleague test, ONE chain | station and sitting close |
| Metacognitive calibration | a short dimmest-read of today's material | sitting close, feeding the next opener's retrieval targets † |
| Transfer | "the general principle behind this?" | capstone |

**Material kinds.** Hands-on stations (code at the screen, doing first)
run the hands-on rules: experience first, exposition on demand, at most
one prediction probe, error analysis hit live, a colleague-test close.
**Study-shaped material**, a document station (an evidence doc, a
protocol spec, a review of prior material) or a study sitting, runs the
**study beat cycle**: predict → read and absorb → one probe from the
study probe pool → a short calibration close.

The **hard stop** (point 17) and the ask-hygiene points (22–23) bind
every question here.

## The Engagement

### Opening (the engagement's first session)

1. **Resolve the subject.** Which existing or new subject this
   engagement belongs to: check `tutor_subjects`, matching by the
   subject index's SQL in `mechanics.md` § Knowledge Docs. A
   topic-shaped ask ("deploy the service on k8s") may resolve to an
   existing subject.
2. **Size the topic; negotiate scope. †** A large topic
   (Kubernetes-sized) never runs whole: propose a use-driven subset and
   agree on it before anything else.
3. **Fix the oracle**: which sources count as truth when material and
   tutor disagree.
4. **Write the goal contract**: concrete, solo-demonstrable usable
   skills ("write LiveRender pages from scratch without help", "perform
   a DPIA on a sample system unaided"). Never a research question, never
   "understands X". Non-code subjects demonstrate on sample cases. A
   delivery target's name is adopted as the contract's core, refined and
   extended in dialogue, never silently replaced.
5. **Adopt or create the knowledge doc.** Check `tutor_subjects` first
   and never duplicate. A new one is created by the rules of Knowledge
   Docs (below), with its `tutor_subjects` row, written through the
   subject index's SQL in `mechanics.md` § Knowledge Docs.
6. **Create the engagement doc** in ymer (The Engagement Doc, below):
   its header, with the `task:` field when a learning task is delivered,
   the goal contract, and the arc as station titles and targeted
   criteria only, detail just-in-time.
7. **Register the engagement**: insert its `tutor_engagements` row
   through the subject index's SQL in `mechanics.md` § Knowledge Docs,
   in its own `execute` call after step 5's subject row, which its
   foreign key requires. A delivery target moves to `doing` now, the
   status change the coordinator binding names (binding: the operations
   contract).

For a modest topic the opening may run as the first sitting's first
half; for a large one it is its own sitting. **Staged opening
(sanctioned):** any or all steps may be drafted solo as proposals before
the first sitting: a proposed scope, oracle, goal contract, arc.
Sitting 1 then opens by confirming or amending the proposals before
anything runs, and nothing drafted binds until confirmed. One procedure
either way: staging changes when the steps are drafted, never which
steps run.

### Sittings

**Open.** Resume by the engagement doc's resume contract (The
Engagement Doc, below). The default opener is a **retrieval check-in**
on earlier stations' material: spaced retrieval across the engagement's
day-to-week gaps, aimed first at the last sitting's recorded
dimmest-read, legitimately cross-station or cross-engagement. †
**Learner-preemptible:** when the learner opens with their own
directions, questions or specimens, that leads and the check-in yields
(contract points 8 and 15 govern).

**Flesh the station just-in-time.** Detail only the station this
sitting runs, sized to fit the ≤1h cap, and split it before starting if
it won't fit. One station per sitting is the default.

**Run.** Purpose leads (point 2) → do-steps at the screen → at most one
prediction probe (point 4) → detours and wandering by points 9 and 15.
Hands-on work happens in a disposable playground or on the learner's
own branch. Real repos are otherwise read-only, and in-sitting commands
belong to the learner's own hands via `!`: for pedagogy (the learner
predicts, types, observes), and for git also for ownership, riding on
the process-wide split (the substrate contract).

**Close** (also when the cap forces one): colleague test on ONE chain →
**rolling checks**, ticking each goal-contract criterion actually
demonstrated (dated) and checking knowledge-doc boxes by demonstration
only, dated and terse (Knowledge Docs, below) → a **metacognitive
calibration**, naming today's dimmest material → append the sitting-log
entry with its **evidence line** and the dimmest-read → update the
station's arc status.

**Amendments at sitting boundaries only.** A rolling check showing a
criterion unreachable or mis-scoped triggers re-negotiation at the
close: a dated note under the goal contract, and the arc refits. Never
silently, never mid-station.

### Capstone and close

Run the **capstone** solo, with no hints, in a playground or the
learner's own branch. Then close the engagement: final rolling checks, a
closing entry in the sitting log (`Closed <date> — capstone`), then
remove the engagement's row from `tutor_engagements` through the subject
index's SQL in `mechanics.md` § Knowledge Docs (its own `execute`
call), and close the delivered learning task as completed, the capstone
its demonstration (binding: the operations contract). The engagement doc is
the durable record, as `review.md` is for a shipped topic. **After
close, retention rides study sittings** over the shared knowledge doc:
the tutor owns no spacing machinery.

**Capture block:** invoke the `ymer:capture` skill, source `tutor`,
context `meta/<subject>`, the engagement's subject. The battery, the
drop grammar and the write live in that skill alone.

### Abandonment

An engagement that peters out stays honestly open until resumed or
**abandoned**: an explicit close without capstone. Write a closing
sitting-log entry (`Abandoned <date> — <why>`), then delete its
`tutor_engagements` row through the subject index's SQL in
`mechanics.md` § Knowledge Docs (its own `execute` call). A delivered
learning task goes back to the open group, or closes as cancelled with
the why when the gap is moot; it is never left `doing`. The why is
recorded, and the docs are kept.

**Capture block:** invoke the `ymer:capture` skill, source `tutor`,
context `meta/<subject>`, the engagement's subject. The battery, the
drop grammar and the write live in that skill alone.

## The Engagement Doc

*Read with this section: `mechanics.md` § The Engagement Doc (the mechanics).*

One ymer doc per engagement, the same primitive as the knowledge docs.
Its naming, its skeleton (whole) and the write doors it takes are in
`mechanics.md` § The Engagement Doc. Like a knowledge doc, it is never written against the
whole-body root (Knowledge Docs, below): replacing it discards the
entire engagement record.

**Writes.** The opening creates the doc, with the `Materials &
state-deltas` section only when the subject's corpus moves. A sitting
close appends its entry to `## Sitting log`, edits the goal-contract and
arc sections as ticks and statuses land, and drops a dated delta line
under `Materials & state-deltas` when the corpus moved.

**Resume contract**, the one statement: a sitting's open reads the arc
(the next pending station), the last sitting entry (its dimmest-read is
the opener's first retrieval target), the goal-contract checkboxes, and
`Materials & state-deltas` when the section exists.

## Study Sittings

A study sitting writes no `tutor_engagements` row, and a
Learning-project task always routes to an engagement (Discovery Menu,
below), never to a study sitting. The tutoring contract binds it like
any sitting; the engagement-machinery points have nothing to read on and
do not apply.

1. Fetch the subject's knowledge doc (its `tutor_subjects` row, the
   subject matched by the subject index's SQL in `mechanics.md`
   § Knowledge Docs). No row and no doc, a study sitting on an unknown
   subject: create the doc by the rules of Knowledge Docs (below), its
   `Learning <Subject>` title, its slug stated explicitly and the
   boilerplate line in its head, seeded with what this sitting covers,
   and add its `tutor_subjects` row through the subject index's SQL in
   `mechanics.md` § Knowledge Docs.
2. **Open with a retrieval check-in** on one or two of the oldest
   checked boxes. Recall failed → uncheck the box: the doc records what
   the learner can do now, not what they once did.
3. Agenda = the unchecked boxes; the learner picks which to work.
   Hands-on work lives in a disposable playground (predict first, then
   type via `!` and observe); real repos are read-only. Document
   material runs the study beat cycle (Question Repertoire).
4. **Close:** teach-it-back on what was worked (colleague test) → check
   demonstrated boxes (dated), add new gaps as unchecked entries. The
   dimmest-read stays in-session: durable retrieval targets come from
   the doc's box dates, oldest checked first. No evidence line, since
   there is no engagement doc to append to; `ymer:capture` is the study
   sitting's process-observation channel.

**Capture block:** invoke the `ymer:capture` skill, source `tutor`,
context `meta/<subject>`, the study sitting's subject. The battery, the
drop grammar and the write live in that skill alone.

## Discovery Menu

Bare `/ymer:tutor` answers "what learning is waiting?". It is a recall
surface, not a scheduler, and a router, not a session: present, resolve
to at most one pick, write nothing. Two bounded sources, no search:

1. The subject index: `tutor_engagements`, and `tutor_subjects` minus
   the subjects under an open engagement (they list once, under the
   engagement; the `subject` column is the join).
2. The Learning project's open tasks: one listing of that project's open
   group (binding: the operations contract), listed verbatim, every open
   task with its name as it stands. Renames and edges are triage's,
   never the menu's. An engagement's delivery target sits at `doing`, so
   it never lists beside its engagement.

**Presentation:** grouped (open engagements, Learning tasks, study
subjects), enumerated, names only, with no scoring and no ranking. A
Learning task and a study subject may both touch one area, and both
list: they are different picks (engagement on a task, study on a
subject). Unchecked counts and box dates are fetched on request, never
in the sweep.

**Resolution, at most one, in this session:**

- an open engagement → resume it (a sitting, here).
- a Learning task → a new engagement adopting it as delivery target (the
  Opening runs, here).
- a study subject → a study sitting, here.
- nothing picked → the menu was the answer; done.

## Knowledge Docs

*Read with this section: `mechanics.md` § Knowledge Docs (the mechanics) and `cases.md` § Knowledge Docs (the cases).*

One knowledge doc per **subject**, the lowercase key `tutor_subjects`
indexes it under ("git", "elixir", …). The goal: check all the boxes.

- **Title: `Learning <Subject>`**, the index key rendered for display:
  caps as the subject is normally written (`git` → `Git`, `javascript`
  → `JavaScript`), hyphens to spaces (`claude-code` → `Claude Code`),
  and a key's shorthand spelled out (`shell (bash/zsh)` → `Learning
  Shell (bash & zsh)`). The key stays the join and the title is display
  only, so where they differ the key is not wrong: it is the index. The
  prefix is the point: it announces the class and clusters the docs in
  any title-sorted browse, where a doc titled `git` competes with every
  git-ish doc in the store. Engagement docs carry it too.
- **The slug stays bare** (`git`, `elixir`, …), the subject's key; how
  every write keeps it so is in `mechanics.md` § Knowledge Docs.
- **Editing a body** takes the write doors in `mechanics.md` § Knowledge
  Docs, for a rewrite and for an append alike. Never write a section
  against the **whole-body root**: it is not a section, and replacing it
  discards every section below.
- **The subject index:** `tutor_subjects` maps each subject to its
  knowledge doc's handle. Check it before fetching or creating a
  knowledge doc, matching by the subject index's SQL in `mechanics.md`
  § Knowledge Docs; never create a duplicate, and add the row when a new
  one is created.
- **Entry format, one terse line:** `- [ ] <the thing, as you would look
  it up> : <what it does / when to use it>`. Example: `- [x] git reflog
  : recover a lost commit (2026-07-04)`. Group under headings when
  natural clusters emerge.
- **A box is checked only by demonstration in a session**: a passed
  teach-back, a correct prediction with correct reasoning, a working
  hand-implementation. Self-assessment never checks a box. A checked box
  gets the session's date, nothing more, and the oldest dates are the
  first candidates for a retrieval check-in.
- **The learner maintains the docs by hand between sessions:**
  unchecking a box no longer remembered, deleting a row so well known it
  needs no reference. No other states: the docs stay terse.

**The boilerplate line** sits in the head of every knowledge doc's body,
beside the doc-specific notes (source material, scope, seeding
provenance). It is the legend for whoever maintains a doc between
sittings with no skill loaded, so it carries one rule per sentence and
nothing else; its text, as stored, is in `mechanics.md` § Knowledge
Docs.

## Remember

- Proficiency-for-use, never mastery; learning for use, never for its
  own sake.
- Every tutoring-contract point binds; † points are the evidence-line
  loop's initial targets, and tags come off as evidence lands;
  engagement-machinery points read only where that machinery exists.
- Hard stop after every question; one ask per message, and every ask
  names its object; ≤1 probe per hands-on station; the observable named
  before the send; generative, never recall.
- A goal-contract criterion and a knowledge-doc box tick by
  demonstration only, dated.
- Arc titles upfront, station detail just-in-time; amendments at
  sitting boundaries, dated.
- The learner's own directions preempt the default opener; wandering is
  sanctioned.
- Close every sitting cleanly: colleague test, ticks, the dimmest-read,
  plus rolling checks and the evidence line where an engagement doc
  exists.
- A `tutor_engagements` row while open, deleted at close or abandonment;
  the engagement doc is the durable record.
- The tutor writes the knowledge doc, the engagement doc, its
  subject-index rows, and the delivered learning task's status, nothing
  else. Glossaries are define's: a later define session may harvest
  terms (pull, not push). A sitting, engagement or study, that surfaces
  a new subject gap captures it as a **learning** drop (the
  `ymer:capture` skill); a task is created when `/ymer:mint` draws it.
  The prerequisite check's append stays the one sanctioned outside write
  on the knowledge doc: brainstorm's prerequisite check adds unchecked
  entries to an **existing** knowledge doc, never creating one, never
  opening an engagement. Mint's learning exit appends nothing: it
  creates a learning task instead.
- After close, retention rides study sittings: no spacing machinery
  here.
- Playgrounds or the learner's own branch; in-sitting commands are the
  learner's to type via `!`.
- Bare `/ymer:tutor`: two bounded sources, present, route, never write.
- The subject index lives in the node and the docs in ymer; a missing
  store stops the run at the first moment, before the ladder, and tutor
  never creates the tables.
