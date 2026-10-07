# The operations contract

The core plugin's skills reach the roadmap — every product's Roadmap
project — and the state store **only** through the operations named
here. Each operation is defined by its **required outcome**,
backend-neutrally, so moving to another coordinator edits the binding at
the foot of this file and nothing else. Skills name this file by its
role phrase, *the operations contract*, and never by a path.

Read it whole once per session that operates the roadmap; the phase
skills point here rather than restating any of it.

## Roadmap

Every area has a **roadmap** — its in-flight pipeline topics. It is not
a store of its own: **every topic is exactly one task in that area's
Roadmap project, and the task's status is the view it appears in.**

```
doing   → the roadmap  — in the pipeline, brainstorm through ship
closed  → gone         — shipped, or retired
```

The task is created where the topic's work starts — never ahead of it —
and carries it through every phase.

**Roadmap.** The area's `doing` tasks. The task's name is the topic slug;
the canonical topic ID is the full dated slug `YYYY-MM-DD-<topic>` (its
folder: → Topic ID ↔ folder mapping). There is no row, no number, and no
stored status. A *pointer, not a record*: the task points, it never
recounts — all detail lives in the topic's artifacts. A `doing` task's
description is the intake as minted, frozen like `request.md`: no phase
annotates a topic's own task mid-flight, and the ship's completed result
is the task's next write. A topic leaves the roadmap when its task
closes: completed on ship (`review.md`'s ship section is the completion
record; shipped iff it carries one), cancelled on every other exit.

**Order is partial.** One topic is recorded as blocked by another only
when it genuinely is, with the reason attached (*order topics*). Most
topics carry no edge, so inserting work costs nothing. There is no total
order, no next-up marker, and no tie-break: the unblocked field is what
the coordinator can compute, and the pick within it is the user's
judgement.

**Status ladder — vocabulary, derived, never stored.**
`brainstormed → surveyed → specced → planned → hardened → implemented`.
The rungs still name where a topic is; nothing records them. Each is
recognised from the topic's artifacts plus the topic's
`<topic ID>: <phase>` commits in the state folder:

| Rung           | Recognised by                                                          |
|----------------|------------------------------------------------------------------------|
| `brainstormed` | `brainstorm.md` exists and its head carries no `Interview pending —` line |
| `surveyed`     | `survey.md` exists                                                     |
| `specced`      | `spec.md` exists and its head carries no `Interview pending —` line |
| `planned`      | `plan.md` exists                                                       |
| `hardened`     | the newest `<topic ID>: plan-review` / `<topic ID>: write-plan` commit **over the topic's folder** is a plan-review (no reading where git does not track the state folder — below) |
| `implemented`  | `implemented.md` exists                                                |
| shipped        | `review.md`'s first recognizer top-down is `^## Shipped` — content-based, because the file exists mid-phase |

`hardened` needs the commit because plan-review's only mark on the path
to implement is its phase commit — the rewritten `plan.md` does not say
it was reviewed, and the define branch's `review.md` marker sends the
topic away from implement rather than toward it. And it needs the
*newest* such commit: a re-plan lands its own `<topic ID>: write-plan`
commit, and that invalidates the previous cycle's hardening. So the rung
is a fact about commit order — of the two plan-shaping commit kinds over
the folder, the newest is a plan-review. Scope the log to the folder —
topic IDs are not unique across areas, and an unscoped match can read
another area's commit as this topic's:

```
git -C <state folder> log -1 --format=%s \
    --grep '<topic ID>: plan-review' --grep '<topic ID>: write-plan' \
    -- <repo>/YYYY/MM-DD-<topic>/
```

Multiple `--grep` patterns OR by default, so `-1` returns the newest
commit of either kind. The single output line is the verdict — read the
line, not the exit status, since `git log` exits 0 either way:

- `<topic ID>: plan-review…` → hardened.
- `<topic ID>: write-plan…` → not hardened: the plan changed after it
  was last reviewed, or was never reviewed. Both patterns are prefixes,
  so a suffixed commit — `: write-plan corrections`, `: plan-review
  (re-review after manual edits)` — counts as its own kind.
- nothing → no pipeline-committed plan over this folder: not hardened
  by this predicate, and implement's gate asks rather than reading the
  absence as a verdict.
- anything else → a state no reading names. `--grep` searches the whole
  commit message, not the subject, so a commit matched through its
  *body* prints a subject that is neither kind; implement's gate stops
  and asks rather than treating it as a verdict.

A state folder git does not track has no `hardened` reading: the phases
that need it, plan-review and implement, are development phases, and
they run only where the state folder is its own git repository. The
other rungs are existence or content readings, and they hold in any
folder.

A topic may skip phases, so the rungs are not a chain — each predicate
stands alone, and a rung is a reading of state, never a claim that some
row was updated.

Shipped is not a rung — it is the end the rungs lead to, read from
`review.md` newest-first: entries are dated and prepend, so the first
recognizer wins — `^## Shipped` → shipped; `^Iteration — <date> →
<phase>:` on top → the topic iterated to the named phase, and whether
that route is still live or has already run its course is a further
read, owned by the review skill's § Input (nothing ever clears a
marker); `^## Review` on top → one of three: the lens pass has run at
implement's close and review has not begun, review is open, or it closed
unshipped because a blocking lift-out's edge holds the ship — the entry
itself tells them apart (the review skill's § Input).

**Gating** is not a status. A topic that cannot start yet is either
blocked by another topic — an **edge** (*order topics*), whose reason
carries what a `— gated (reason)` suffix used to say — or blocked by a
date or an external event with no task, which is a **deferral** the
coordinator already excludes from the unblocked field.

**Intake is the pool.** New work — a feature, a bug, a learning gap, a
follow-up nobody is starting — never enters a Roadmap project as a
task. It is captured as a drop in the pool, the node's store of what is
waiting to be drawn (the `capture` skill), from any surface that reaches
a Ymer Node, and becomes work only when it is drawn. A task is created
— *mint task* — only where work starts now, at seven moments:

- a mint pick — the `mint` skill draws the top drop and starts it as a
  topic;
- a topic brainstorm invents in-session;
- a split child (→ Split topics);
- a blocking finding review lifts out of a topic;
- define's bounce, a term that cannot wait for its own topic;
- a blocking learning gap — the prerequisite check's one task, or one
  review meets at its teaching bound;
- mint's learning exit, a learning drop drawn into a learning task.

Everywhere else, noticed work becomes a drop. Every task carries
**name + description, plus an effort estimate where the producer has
one** — sizing is welcome on every mint. Due dates, deferral and
dependency edges are the user's, never the skills'. The one exception
is a phase recording a dependency it *discovered* (*order topics*),
which is evidence, not scheduling.

## Operations — the whole vocabulary the skills may use

| Operation        | Required outcome                                                                 |
|------------------|----------------------------------------------------------------------------------|
| look up topic    | find a topic's task — its status, its edges — or its absence                      |
| mint task        | a task appears in the target area's Roadmap project, in the view matching where its work stands, carrying its evidence |
| annotate task    | an in-flight topic's task carries the new evidence; its status is untouched       |
| order topics     | one topic is recorded as blocked by another, with the reason, and the edge reads back |
| ship topic       | the topic has shipped; `review.md`'s ship section is the completion record        |
| retire topic     | the topic leaves without shipping, the why recorded; never deleted                |

A topic's task may live in a coordinator's own tracker, in the node's
`tasks` table, or in an issue tracker — the operations don't care; the
binding maps them.

**Rulings are written outward.** A phase whose close rules on another
topic still in flight — brainstorm's and define's rulings duty —
annotates that topic's task in the same close, through *annotate task*,
so the work in flight never misses a ruling made about it. A ruling on
anything else writes nothing outward.

A *mint task*'s description opens with a plain-worded statement of the
work, in words that survive without the session's jargon, and its
evidence rides the claims register (the sweep skill's Claims section).

**Postconditions.** An operation's **Required outcome** is its
postcondition. When the call's own return does not show that outcome, the
caller reads it back before the boundary closes. Which operations need a
read-back against a given coordinator is a binding fact, not a contract
one.

**Failure rule.** A roadmap operation whose required outcome did not
happen — the coordinator was unreachable, *or* the call succeeded and
the outcome still did not land — is **surfaced, and the boundary stops**;
never skipped silently. These writes are pipeline-critical.

## The topic's artifacts

A topic's artifacts are files in a folder under the state folder, whose
history is git where the state folder is its own git repository and the
node's `topics_history` where it is in no git repository or the session
has no git (→ reach rule).
The names are fixed, one
artifact per name:
`request.md`, `sketch.md`, `brainstorm.md`, `survey.md`, `spec.md`,
`plan.md` with its `payloads/`, `implemented.md`, `review.md`. Nothing
ever moves between them and no phase creates a sibling file: a plan is
rewritten in place, and its history is the store's.

**`request.md`** is the intake as it arrived, written once by whatever
starts the topic and never rewritten afterwards — an existing one is a
point-in-time record, and a phase that finds one reads it rather than
replacing it:

```markdown
---
source: <the door this topic came through>
task: <the task's id>
started: <YYYY-MM-DD>
---

# <topic name>

<the intake, verbatim>
```

A drawn topic's `request.md` is written by the `mint` skill in its own
shape — `source: mint`, the drops it drew quoted verbatim — before the
topic's first phase opens; a split child's by its first phase, from the
task's description. A phase that finds one already written writes no
other.

## Split topics

A topic that turns out to be several units of work splits into sibling
child topics — each a full, normal topic thereafter, with its own task,
artifacts, branch, and ship; the phase skills stay track-blind. The split
composes entirely from the operations above:

- **Mint move — tasks now, folders lazy.** The splitting phase *mints a
  task* per child at `doing` — the parent's `brainstorm.md` is their
  direction doc, so they are already past brainstorm — dated the split
  day. No folders are created at the split; each child's first phase
  creates its folder lazily, as always. Children default to
  `<parent-slug>-<part>` names; a sharper standalone name is allowed. The
  parent brainstorm's child list is authoritative — the name prefix is a
  convenience, not the join mechanism — and children link back to the
  parent's `brainstorm.md` as their direction doc.
  The child's mint description names both that direction doc and the
  parent's decision record — `spec.md`, where one exists, whose
  D-numbers are what "the parent's decision N" quotes — and carries the
  child's **fork**: the one decision its own brainstorm still makes, or
  "none — narrow and go" (the brainstorm skill's child list is where the
  fork is authored). An entry phase, where one is named, is advisory,
  never state: the entry ladder is the invoker's read at pick-up.
- **Parent closure.** In the common case (split at brainstorm close) the
  parent's own task closes — *retire topic*, its result naming
  the children — and the parent folder closes with its consolidated
  `brainstorm.md` naming them too. Splitting is a closure cause beside
  shipping and "not pursuing": a split parent ends as a folder with a
  retired task and without a `review.md` ship section — "shipped iff
  `review.md` carries a ship section" reads on ordinary topics, never on
  split parents.
- **Mid-pipeline split — shed siblings.** A topic that discovers at a
  later phase that it is too big keeps its task, folder, and branch,
  narrows its scope, and mints sibling tasks at `doing` for the shed
  parts (same mint move, split-day dates); the splitting phase's artifact
  records the shed, and the siblings link back for direction context.
  Full dissolve — *retire topic* on the parent, mint all children, close
  the folder like a parent — stays for the rare case where the original
  name no longer names anything coherent.

## Topic ID ↔ folder mapping

The canonical topic ID is the full dated slug `YYYY-MM-DD-<topic>`. It is
what remediation markers, citations, and the state folder's phase commits
use; a topic's task carries the bare slug (→ Roadmap). Its folder is
`<repo>/YYYY/MM-DD-<topic>/` — split the ID after the year; nothing else
changes. In the node's `topics_history` the same ID is the `topic`
column and the area is `area`, so the join key from a topic to its
folder is the pair. One artifact's history is addressed by front, topic,
area and artifact together — fronts sharing a node can hold the same
topic ID — as the `setup` skill's grammar for the table states.

## Binding per coordinator

The operations above bind to whichever coordinator the session reaches (→
reach rule). A binding names the outcome in this contract's words, the
postcondition and the read-back — and **nothing of the call**: which
action realises an outcome, its parameter names, wrappers and enum
literals are the coordinator's own, read from its help surface at the
moment of the call or from the hints a response carries. A coordinator
documents itself, and this contract stops where that documentation
starts: an action named here goes stale the moment the coordinator moves.
This contract's own words (`doing`, `closed`, and the **open** group a
learning task waits in) name its views; which tokens realise them is a
help fact, not a contract fact.

One project per **product**, named `<Product> Roadmap` — usually one
area, but a product that spans several has one project and one page —
plus one standing cross-area **Learning** project, the learning track's
tracker. Where a product has no Roadmap project yet, onboarding creates
it and writes its **product page** from the skeleton below: the header
plus the settled sections, all empty; a stub is a valid page.

**The product page** is the project's description, and nothing else:
the fixed header — the task/status contract for every surface that
reads the page, plus the governance line — then the **settled
sections**, in this order. The header is one text across every page:
a change to it is a governed write over every product's page, never a
per-page edit. The skeleton:

```markdown
# <Product> Roadmap

Every <area> topic in flight is one task here: `doing` = in the pipeline,
`closed` = shipped or retired. Order is partial — real blocking edges
only; the coordinator's unblocked filter is the field to pick from. A
topic's pipeline rung is derived from its folder in the state folder,
never stored. New work never enters here as a task: from any surface
that reaches a Ymer Node, capture it as a drop in the pool, and a task is
created when it is drawn.

The sections below are this product's **product page** — cached
product-design answers, plus where the product is heading. Phases read
them; only governed sessions write them, never casually. A section may
sit empty.

## Forward direction

## Next steps

## Users

## Stance

## Slow layers / what churns

## What it refuses to be
```

`<area>` in the header is the product's area, or its area list where a
product spans several. The settled sections' meaning, and who reads and
writes them, are the product-design skill's (§ The product page).

The Learning project's description carries a header of its own, and no
settled sections:

```markdown
# Learning

Every learning task is one task here — the learning track's single
tracker view, across every area. Open = tracked, `doing` = a tutor
engagement is open, `closed` = demonstrated or moot. A task's name is
its bar; only demonstration closes it. Blocking edges to roadmap topics
carry their reason; every other edge and all priority is the user's
triage. A learning gap noticed anywhere else is captured as a learning
drop in the pool, and a task is created when it is drawn.
```

**Look up topic** — the coordinator's own listing of one project's tasks,
matched by name, the name sent to the coordinator with the call — never
matched over a returned page: a listing is capped, and a miss over a
capped page cannot be told from truncation. Each task comes back with
its status and the projects it sits in. A read, so no read-back: a
by-name miss is visible in the returned count.

**Ship topic** — closing the task as **completed**, its result naming the
topic ID and saying it shipped. **Retire topic** — closing it as
**cancelled**, with a result carrying the why: not pursuing, split parent
(naming the children), or settled below the bar. Both are transitions
the coordinator names; the closing text is journaled as a result entry,
the task's current result being its latest. **Never delete a task.** The
per-item return carries the task's status after the call, which is the
outcome, so neither needs a read-back. Reopening a closed task is the
user's, through the coordinator's own reopen; the closing result stays
in the journal. A topic invented directly in brainstorm has no task yet,
so brainstorm *mints* one at `doing`.

**Mint task** — create the task with its name, its description and its
project membership naming the target area's Roadmap project, then
**claim** it — the coordinator's transition into the `doing` group —
because a task exists only where its work starts. **This is one of the
operations whose postcondition the calls do not show** — a create
answers with an id and a status, nothing that proves membership — so
read it back with *look up topic* against the target project: exactly
one task, in the `doing` group, and the projects it names include the
target. Only the seven moments under Intake mint (→ Roadmap). An effort
estimate when the producer can size it; no due date, no deferral and no
ordering. A **learning task** always targets the Learning project,
whatever area its topic lives in, and is left in the **open** group
rather than claimed — an engagement, not a mint, moves it to `doing`.
A task for an area with no Roadmap project waits for that project:
onboarding creates it where the producer onboards (above),
and any other producer halts, saying what to create — never a fallback
to `Meta Roadmap`, which holds the `meta` area alone.

**Order topics** — record that one task is blocked by another, with the
reason. The write's return does not show the graph, so read it back on
the blocked task's dependency listing: the edge must appear among what
blocks it, **with its reason**. A plain task listing can also return
edges, in a compact form without the reason — right for a census of a
whole Roadmap, wrong for this postcondition. Undoing an edge is the same
write without it; there is no reorder or move, because a partial order
has nothing to reorder.

**Annotate task** = read the task, append the evidence block to its
description, write it back — status untouched. The write answers with a
status, not the task, and a description write is a whole-field rewrite,
so read it back **asking for the description** — *look up topic* with
that field added, or a fetch of the task by id — and the appended block
must be in what comes back. Its one use is a ruling on a topic in flight
(→ Rulings are written outward); a task that is not `doing` is never
annotated.

### The node as coordinator

Where the session reaches no coordinator of its own, the roadmap is the
node's notebook: the `tasks` table its setup skill creates, with
`tasks_log` beside it for the journal. The same operations hold, read
through SQL rather than through a tool surface — `project` carries the
`<Product> Roadmap` name, `area` the topic's area, and `result` the
closing text *ship topic* and *retire topic* write. `status` carries a
token the table's `CHECK` admits, never one of this contract's view
words: SQLite has no help surface to read the realisation off, so the
binding states it — `new` and `reopened` are the open group, `claimed`
and `asking` (a task awaiting its answer) the `doing` view, `completed`
and `cancelled` the `closed` one. A *mint task* inserts at `claimed` —
a learning task at `new` — a *ship topic* writes `completed`, a *retire
topic* `cancelled`. A mint task is the insert the `mint` skill makes
(`INSERT INTO tasks (name, description, status, project, area,
estimated_effort_minutes)`); its read-back is the `SELECT` that must
return exactly one row under that name in that project. A node-only
session has no projects table and so no product page: every product is
page-less there, and a phase that would read one runs its checks fresh
instead.
