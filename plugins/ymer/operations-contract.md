# The operations contract

The core plugin's skills reach the topics in flight — every product
area's topic tasks — and the state store **only** through the operations
named here, and a drop's draw from the pool and its return to it
likewise. Each operation is defined by its **required outcome**,
backend-neutrally, so moving to another coordinator edits the binding at
the foot of this file and nothing else. Skills name this file by its
role phrase, *the operations contract*, and never by a path, except in
the line of a skill's spine that says when to read it.

Read it whole once per session that operates on topics; the phase
skills point here rather than restating any of it.

## Topics

Every product area has its **topics in flight**, its pipeline topics
between brainstorm and ship (terms: the plugin glossary). They are not
a store of their own: **every topic is exactly one task in its product
area, and the task's status is the view it appears in.**

```
doing   → in flight — in the pipeline, brainstorm through ship
closed  → gone      — shipped, or retired
```

The task is created where the topic's work starts — never ahead of it —
and carries it through every phase.

**Topics in flight.** The product area's `doing` topic tasks. The
task's name is the topic slug; the canonical topic ID is the full dated
slug `YYYY-MM-DD-<topic>` (its folder: → Topic ID ↔ folder mapping).
There is no row, no number, and no stored status. A *pointer, not a
record*: the task points, it never recounts — all detail lives in the
topic's artifacts. A `doing` task's description is the intake as
minted, frozen like `request.md`: no phase annotates a topic's own task
mid-flight, and the ship's completed result is the task's next write. A
topic is no longer in flight once its task closes: completed on ship
(`review.md`'s ship section is the completion record; shipped iff it
carries one), cancelled on every other exit.

**Order is partial.** One topic is recorded as blocked by another only
when it genuinely is, with the reason attached (*order topics*). Most
topics carry no edge, so inserting work costs nothing. There is no total
order, no next-up marker, and no tie-break: the unblocked field is what
the coordinator can compute, and the pick within it is the user's
judgement.

**Status ladder — vocabulary, derived, never stored.**
`brainstormed → surveyed → specced → planned → hardened → implemented`.
The rungs still name where a topic is; nothing records them. Each is
recognised from the topic folder's artifacts alone, on every kind of
state folder:

| Rung           | Recognised by                                                          |
|----------------|------------------------------------------------------------------------|
| `brainstormed` | `brainstorm.md` exists and its head carries no `Interview pending —` line |
| `surveyed`     | `survey.md` exists                                                     |
| `specced`      | `spec.md` exists and its head carries no `Interview pending —` line |
| `planned`      | `plan.md` exists                                                       |
| `hardened`     | `plan.md` carries plan-review's `Hardened — <YYYY-MM-DD>` line directly under its title |
| `implemented`  | `implemented.md` exists                                                |
| shipped        | `review.md`'s first recognizer top-down is `^## Shipped` — content-based, because the file exists mid-phase |

`hardened` needs a line of its own because the rewritten `plan.md` does
not otherwise say it was reviewed, and the define branch's `review.md`
marker sends the topic away from implement rather than toward it.
Plan-review writes the line as the last step of its rewrite, so a torn
run leaves the plan unhardened. A re-plan writes the whole plan afresh
and never carries the line over, so a plan changed after its review
reads unhardened until plan-review runs again. Where git tracks the
state folder it keeps the history of both, and it is not the oracle:
the line is.

A topic may skip phases, so the rungs are not a chain — each predicate
stands alone, and a rung is a reading of state, never a claim that some
row was updated.

Shipped is not a rung — it is the end the rungs lead to, read from
`review.md` newest-first: entries are dated and prepend, so the first
recognizer wins — `^## Shipped` → shipped; `^Iteration — <date> →
<phase>:` on top → the topic iterated to the named phase, and whether
that route is still live or has already run its course is a further
read, owned by the process contract, § Iteration (nothing ever clears a
marker); `^## Review` on top → one of three: the lens pass has run at
implement's close and review has not begun, review is open, or it closed
unshipped because a blocking lift-out's edge holds the ship — the entry
itself tells them apart (the review skill's § Recognizers).

**Gating** is not a status. A topic that cannot start yet is either
blocked by another topic — an **edge** (*order topics*), whose reason
carries what a `— gated (reason)` suffix used to say — or blocked by a
date or an external event with no task, which is a **deferral** the
coordinator already excludes from the unblocked field.

**Intake is the pool.** New work — a feature, a bug, a learning gap, a
follow-up nobody is starting — never enters a product area as a task.
It is captured as a drop in the pool, the node's store of what is
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
| mint task        | a task appears in the target product area, directly and in no project, in the view matching where its work stands, carrying its evidence |
| annotate task    | an in-flight topic's task carries the new evidence; its status is untouched       |
| order topics     | one topic is recorded as blocked by another, with the reason, and the edge reads back |
| ship topic       | the topic has shipped; `review.md`'s ship section is the completion record        |
| retire topic     | the topic leaves without shipping, the why recorded; never deleted                |

A topic's task may live in a coordinator's own tracker, in the node's
`tasks` table, or in an issue tracker — the operations don't care; the
binding maps them.

The pool's two operations, *draw drops* and *return drops*, are
defined in § The pool; they sit outside the failure rule below.

**Rulings are written outward.** A phase whose close rules on another
topic still in flight — brainstorm's and define's rulings duty —
annotates that topic's task in the same close, through *annotate task*,
so the work in flight never misses a ruling made about it. A parent
topic's change to a decision its children inherit is such a ruling,
whichever phase makes it, and so is a child's override that touches a
parent still in flight; each is written when its amendment is, a
decide-forward that fires no close included (→ Inherited records). A
ruling on anything else writes nothing outward.

A *mint task*'s description opens with a plain-worded statement of the
work, in words that survive without the session's jargon, and its
evidence rides the claims register (the sweep skill's Claims section).

**Postconditions.** An operation's **Required outcome** is its
postcondition. When the call's own return does not show that outcome, the
caller reads it back before the boundary closes. Which operations need a
read-back against a given coordinator is a binding fact, not a contract
one.

**Failure rule.** A topic operation whose required outcome did not
happen — the coordinator was unreachable, *or* the call succeeded and
the outcome still did not land — is **surfaced, and the boundary stops**;
never skipped silently. These writes are pipeline-critical.

## The topic's artifacts

A topic's artifacts are files in a folder under the state folder.
**The state folder's kind** decides what keeps their history, and it is
read from the folder itself, once per session, at a run's guard:

```
git -C <state folder> rev-parse --is-inside-work-tree --show-prefix
```

- `true` alone, or `true` then an empty line (the prefix is empty at the
  top of a repository, and the tool may not show it): the folder is its
  own git repository. Git keeps the history, each save is a commit, and
  the substrate contract governs every git step over it.
- `true`, then a non-empty prefix line: the folder is inside another git
  repository. Refused, because every save would commit into that other
  repository.
- A non-zero exit whose message says `not a git repository`: a folder in
  no git repository. Exit 127, no `git` to run in this session, reads
  the same once the session's own file tools find the folder. Either
  way the files are the record: each save is the file alone, and no
  history is kept beyond it.
- Anything else, a missing folder or `false` with exit 0 among it, is a
  state no reading names, and is refused.

Every phase relies on this reading alone. Where it reads git, git is
used; otherwise a step that would commit into the state folder is
skipped, because the file it would commit is already the save. The one
combination the folder cannot tell, a git repository reached by a
session whose only shell over it is a remote device's, is refused by
setup's state-folder check, so no phase meets it.

The names are fixed, one artifact per name:
`request.md`, `relations.md`, `sketch.md`, `brainstorm.md`, `survey.md`,
`spec.md`, `plan.md` with its `payloads/`, `implemented.md`,
`review.md`. Nothing
ever moves between them and no phase creates a sibling file: an artifact
is rewritten in place, and its **pre-image**, its state before the
newest in-place rewrite (term: the plugin glossary), is the store's.
Where git keeps the history, the pre-image is the rewrite commit's
parent. Where the files are the record, the rewriter copies the artifact
into the topic's `pre-image/` slot before the rewrite starts, as
`pre-image/<artifact file name>`, with a plan's `payloads/` beside it as
`pre-image/payloads/`. The copy replaces that artifact's entries
whole: the rewriter first removes `pre-image/<artifact file name>`, and
for a plan the whole of `pre-image/payloads/`, so no file of an earlier
copy survives, and it never touches another artifact's entries. Once
the copy is complete it writes the stamp
`pre-image/<artifact file name>.taken`, and the phase's close removes
it. A rewriter that finds its stamp standing is resuming a torn rewrite
and skips the copy: the slot already holds the true pre-image, and the
artifact, half rewritten, no longer does. A failed copy stops the
rewrite before any byte of the artifact changes. The slot is the
no-sibling rule's one exception: it is not an artifact, and no reader
takes it for the live file. Only the last rewrite is recoverable from
it; a folder moved out of git starts with an empty slot. The rewrites
that fill it are brainstorm's consolidation, write-plan's re-plan and
plan-review's; the other in-place rewrites keep no pre-image where the
files are the record.

**`sketch.md`** is read by exactly one phase, review, as the contrast
between the user's own attempt and the shipped code ("your sketch did
X; the shipped code does Y"). It keeps the user's sketch from before
the session verbatim. This paragraph is that reader contract's one
home: every phase between brainstorm and review leaves the file
unread, and scout and define, the phases that would otherwise read it,
say so by pointing here rather than by restating the rule.

The folder may also hold committed **sweep artifacts** (plugin
glossary), re-runnable measurements kept beside the artifact whose
numbers they generate, under names of their own. Open a topic
artifact with the file-read tool, never a shell print: a direction
doc, a survey map or a plan routinely runs past the shell's output
cap, and a print of one is diverted to a file and costs the read
twice.

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

**`relations.md`** records the topic's place among other topics: its
parent topic, and the children it split off at whichever phase. Only
this topic's own phases write it, and only by appending; a topic with
no relation has none:

```markdown
# <topic name> — relations

Parent: <repo>/YYYY/MM-DD-<parent topic>/

- `<child slug>` · task <id> · fork: <fork> · <scope> · decided in <artifact> § <section>
```

- **The `Parent:` line**, at most one, names the parent topic's folder
  relative to the state folder, the trailing slash kept (→ Topic ID ↔
  folder mapping). A split child's first phase writes it, whichever
  phase that is, from the parent topic's folder its task's description
  names. Brainstorm writes a drawn topic's where it finds one (the
  brainstorm skill, § Drawn-topic Intake).
- **A child line** for each child the topic split off. The splitting
  close writes it once the child's *mint task* reads back, naming the
  section of the deciding artifact that made the split, which keeps the
  why. An entry phase, where one is named, rides at the end of the
  `<scope>` text, advisory only.

Children of one parent are read from the parent's file, never listed in
each other's.

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
  parent's `relations.md` lists each child and is authoritative — the
  name prefix is a convenience, not the join mechanism — and children
  link back to the parent's `brainstorm.md` as their direction doc.
  The child's mint description names the splitting topic's folder and,
  where it has one, its own `brainstorm.md`, never a direction doc it
  borrows, and carries the child's scope and **fork**: the one decision
  its own brainstorm still makes, or "none — narrow and go", as the
  deciding artifact states it; the child's line in the parent's
  `relations.md` copies them once the mint reads back. An entry phase,
  where the line's scope names one, is advisory, never state: the entry ladder is the invoker's read
  at pick-up. What a child reads of its parent is § Inherited records'.
- **Parent closure.** In the common case (split at brainstorm close) the
  parent's own task closes — *retire topic*, its result naming
  the children — and the parent folder closes with its consolidated
  `brainstorm.md` and its `relations.md` naming them too. Splitting is
  a closure cause beside shipping and "not pursuing": a split parent
  ends as a folder with a retired task and without a `review.md` ship
  section — "shipped iff `review.md` carries a ship section" reads on
  ordinary topics, never on split parents.
- **Mid-pipeline split — shed siblings.** A topic that discovers at a
  later phase that it is too big keeps its task, folder, and branch,
  narrows its scope, and mints sibling tasks at `doing` for the shed
  parts (same mint move, split-day dates); the splitting phase's artifact
  records why, the topic's `relations.md` lists each child it shed, and
  each such child links back for direction context.
  Full dissolve — *retire topic* on the parent, mint all children, close
  the folder like a parent — stays for the rare case where the original
  name no longer names anything coherent.

## Inherited records

A topic's **parent topic** (term: the plugin glossary) is the one
named by the `Parent:` line of its `relations.md` (→ The topic's
artifacts). Every phase reads the parent from that line and never
judges it again. A topic with no such line has no parent, and nothing
in this section applies to it.

**The inherited records** are the parent topic's `relations.md`, its
own `brainstorm.md` where it has one, never a direction doc it borrows
from its own parent, its `spec.md` § Decisions and § Out of scope
where one exists, and the carry-forward list in its first artifact's
opening (→ One level, carried forward, below). The parent's `survey.md`
and `plan.md` stay out, a carry-forward list in its plan header
excepted: they are its own measurements and mechanics as of the split,
stale for the child.

**The read.** Wherever a phase reads the topic's own direction doc or
`spec.md`, it reads the inherited records beside them, as settled:
beside the topic's own, never in their place. A decision of this
topic's that contradicts an inherited one is an iteration on this
topic, never a silent override.

**One level, carried forward.** A topic reads its own parent topic's
records, never its grandparent's. The first of `brainstorm.md`,
`spec.md` and `plan.md` it writes lists the inherited records it
carries forward, its overrides left out, in that artifact's opening,
beside the parent it binds, so its own children inherit them through
it. A re-plan rewrites the list with the plan, and an override
strikes the decision it overrides from the list, the amendment marker
beside it.

**An override is this topic's record.** It binds the topic that made
it, and lands in that topic's own artifacts:

- An iteration that routes the topic to a phase whose artifact it does
  not have yet makes it write its first one: `brainstorm.md` at
  brainstorm, opened with a split child's doc's opening alone, or
  `spec.md` at define. Only the first artifact carries the
  carry-forward list; a later one points at it.
- A decide-forward, or a plan-review ruling, on an inherited decision
  is amended in the topic's `spec.md` where one exists, as a new
  decision entry citing the decision it overrides and carrying the
  amendment marker; otherwise in its `plan.md`, at the header line that
  binds the parent, in the plan's marker grammar.

An override cites the inherited decision by the parent's own handle:
`D<n>` for a decision in its `spec.md`, the direction doc's `Q<n>`
where the verdict carries one, or else the verdict's sentence quoted
with its section heading.

**The parent's records are never written** by a topic that inherits
them, whether the parent is closed or in flight: a closed topic stays
the record it closed as. Two writes reach past the topic instead:

- A parent still in flight that an override touches is annotated
  when the override is written (→ Rulings are written outward).
- Where an override shows a parent decision wrong beyond this topic,
  the session that writes the override hands it to its next capture
  block as a drop, a decide-forward's included, so a later topic
  naming the same parent meets it in the pool. No phase scans the
  parent's other children for overrides.

**A parent's change reaches its children.** An amendment,
supersession or addition of an entry in a topic's `spec.md`
§ Decisions or § Out of scope, an override's new entry among them,
and a strike from its carry-forward list, annotates each child its
`relations.md` lists whose task is still `doing`, the amendment as the
evidence (*annotate task*): a write-plan amendment, a plan-review
ruling, a decide-forward at implement or review, and a re-define
alike. The annotation is written when the amendment is,
after its footprint sweep and before the state-folder commit where the
phase has one; a decide-forward, which fires no close, annotates at
that point. A child reads its parent live, and would see the new text
without seeing that it changed.

## Topic ID ↔ folder mapping

The canonical topic ID is the full dated slug `YYYY-MM-DD-<topic>`. It is
what remediation markers, citations, and the state folder's phase commits
use; a topic's task carries the bare slug (→ Topics). Its folder is
`<repo>/YYYY/MM-DD-<topic>/` — split the ID after the year; nothing else
changes.

## The pool

The pool is the node's store of drops waiting to be drawn: the
`capture` skill inserts them, and mint scores them. Two operations move
a drop between waiting and drawn, and every skill that does so goes
through them. They extend the vocabulary of § Operations:

| Operation    | Required outcome                                                                 |
|--------------|----------------------------------------------------------------------------------|
| draw drops   | each named open drop of this front is drained, with the open drops of this front in each family it sits in that the draw's kind list names, to where the work lives: the topic's folder, `<repo>/YYYY/MM-DD-<topic>/`, or a learning task's id at mint's learning exit; in the exact form, the named drops alone; a vision or a learning drop only by a draw whose kind list names its kind |
| return drops | each named drop of this front that a draw drained is open again, with the drops of this front in each family it sits in that the same draw drained, each exactly as it was before the draw, whichever destination the draw named |

**A draw sees the family.** *Draw drops* in the family form widens each
named id the read finds waiting to every family it sits in (term: the
plugin glossary): where it is a face, its anchor and that anchor's other
faces; its own faces; and the drops sharing its named cause. The reach
is one level from the named drop and never further, so a chain of
anchors is never walked, and a drop that is both a face and an anchor
brings both its families. What the widening sees is not all it takes:
only this front's open drops that are not empty are drawn, of the drops
the widening adds only those of a kind the draw's kind list names, and a
vision or a learning drop named by a draw whose list does not name its
kind widens nothing (the next paragraph). Another front's drops stay
open for that front's own mint. An id that reads drained to this topic
already widens nothing, so a face captured while the topic is in flight
stays open until a close names it. The `Drawn:` line names only what
the close chose, and the operation adds the rest its kind list takes.
*Return drops* takes, from each named id's families, the drops the same
draw took with it, one level from the returned id: a drop further from
it stays drained though the same draw took it, and a drop of the family
that an earlier or a later draw took stays drained. So a cut reaches
every drop of its families that one draw took together, and one of them
cannot be cut alone; a face a later close drew by naming it can be.

**The family decides what a draw sees, and the kind what it takes.**
A draw in the family form carries a **kind list**, the kinds of drop
its destination can act on, named by its caller. Only a drop the
widening adds is tested against it: a named drop is drawn as named
whatever its kind, and widens to its families even where its own kind
is outside the list, so an anchor of an excluded kind is seen while its
faces of a listed kind are drawn. A vision drop and a learning drop are
the exception, named or added: each is drawn only by a draw whose list
names its kind, since a vision drop reaches its product area only
through a carve topic, and a learning drop its engagement only through
a learning task (terms: the plugin glossary). Named by any other draw,
such a drop is cited, never drawn, and widens nothing. Every open drop
of this front in a named drop's families that the draw leaves out is
shown beside it, by id and kind, on a `Related, not drawn:` line (→ The
lines), and stays open for a later draw whose list takes it.

**The exact form** draws the named ids alone, with no list and no
widening, so it never draws a vision or a learning drop. It is the
friction-batch's form: mint draws every drop it takes into a
friction-batch through it, and a deciding phase on a friction-batch
draws through it too, since what a friction-batch takes is a judgement
made drop by drop, which no kind list encodes.

**Who draws.** Mint draws at its pick (the `mint` skill). A deciding
phase draws too, brainstorm, define, write-plan or review, when a
decision of its own makes an open drop part of its topic. Scout surveys,
and plan-review and implement carry out a scope already decided, so they
draw nothing. A later deciding phase whose decision cuts a drawn drop
from scope, a drop mint drew among them, returns it; a shed to a sibling
topic is such a cut: the shed's sibling task names the ids it takes, and
the sibling's first deciding close draws them. A retire returns nothing:
its why (not pursuing, split parent, settled below the bar) is the
judgement on the topic's drops.

**The lines.** A deciding phase records what it drew and returned in
its own artifact, at most one line of each kind per close, each at line
start, and directly under its `Drawn:` line the drops that draw left
open in the named drops' families:

```
Drawn: <YYYY-MM-DDTHH:MMZ> by <phase> · kinds <kind>, <kind> · #<id>, #<id>
Related, not drawn: #<id> (<kind>), #<id> (<kind>)
Returned: <YYYY-MM-DDTHH:MMZ> by <phase> · #<id>
```

The stamp is the UTC time the close writes the line, to the minute.
`<phase>` is `brainstorm`, `define`, `write-plan` or `review`. A
`Drawn:` line's segments split on ` · `: the stamp and the phase, then
the kind list, then the ids, so the pre-flight's finish reads the list
and the ids off the line alone. The list is `kinds` and the kinds,
comma-separated, or `exact` for a draw in the exact form. It follows
the topic:

- a carve topic: `kinds vision`;
- a friction-batch: `exact`;
- any other topic: `kinds bug, idea, friction`.

The first close that draws on a topic sets its list, and every later
close copies it from the earlier lines, so no later phase judges the
topic again: a list that must change goes through an iteration (the
process contract, § Iteration), never a silent switch. The `Related,
not drawn:` line comes from the related read (→ The pool on the node),
names each drop by its id and kind and copies no title; a draw that
leaves nothing open, an exact one among them, writes none. It is a
report, never a draw: only `Drawn:` and `Returned:` lines draw. The
decisions go on citing ids in their own prose, and a cited id is no
draw. In `brainstorm.md`, `spec.md` and `plan.md` the lines sit in a
`## Drops` section, the artifact's last but for plan-review's record;
in `review.md`, in the close's own `## Review` entry, after its
`Tails:` line. A lightweight close-out's entry carries none: it makes
no decisions of its own. The lines are append-only: each drawing or
returning close appends its own, and every in-place rewrite of the
artifact (a consolidation, a re-define, a re-plan, plan-review's
rewrite) carries every earlier line verbatim, `Related, not drawn:`
lines included, so the record survives where no git keeps it. An
illustration of the grammar in a topic's artifact stays
inline-backticked, never at line start, because the pre-flight's finish
reads every line-start one. Where a `Drawn:` line names another front's
drop, the section or the entry names the shared cause in a line of its
own (→ The front).

**Which closes draw.** Only a close that consolidates its artifact
draws or returns: brainstorm's and define's finished closes, write-plan's
save, and each of review's three closes. A pending close, and define's
close that names brainstorm instead of write-plan, draw nothing new and
return nothing. Draws already made stand, and the resumed or re-run
phase draws at its own finished close.

**The read and the read-back.** Every caller, mint included, reads the
rows of the ids it names before it writes, then, for the family form
and the return, the family read: every drop the write will move,
through the write's own `WHERE` (→ The pool on the node). The family
form adds the related read: every open drop of this front in the named
ids' families that the write leaves out, a report with no read-back of
its own, since it moves nothing. An id the first read does not find
waiting for the operation, open, this front's and not an empty drop for
a draw, is wrong or was drawn elsewhere: find out which before closing,
and correct the record that names it (a deciding close's own lines, or
what mint wrote, its `request.md` or at the learning exit its learning
task's description, which quotes every drop the family read moves). An
id another topic already drew belongs to that topic, and this topic's
artifact cites it, never draws it. A vision or a learning drop the draw
does not take is no error: it is not waiting for this draw, and the
record leaves it off its `Drawn:` line. In the family form that is such
a drop whose kind the list does not name, and the close lists it on its
`Related, not drawn:` line; in the exact form it is every vision and
learning drop, and the close cites it in its own prose, since an exact
draw writes no related line. An open drop of another front is no such
error either: it stays on the `Drawn:` line beside its shared cause and
is never drawn here (→ The front). Each operation's `affected_rows` must
equal the drops its read found: the family read for the family form and
the return, the named ids the first read found waiting for the exact
form, a vision or a learning drop never among them. A difference, fewer
or more, means a drop moved since the read (a face captured meanwhile
joins a named family, for one), so find out which before closing, and
name it in the report.

**At the close.** A deciding close reads its ids' rows before the
artifact's commit, or its save where the files are the record, and
corrects its own lines from the read. It reads the families as well,
before any write: for a family-form `Drawn:` line, the draw's family
read and related read, the second giving its `Related, not drawn:`
line, while an `exact` line takes the first read alone; and the
return's family read for its `Returned:` ids. The return reaches only
the drops the same draw took with a returned id, so it never reopens
what this close draws. A family moves whole: where a drop the draw
takes sits in a family the return reopens, the close corrects its own
lines so that family stands on one side only. A returning close also
extends its own `Returned:` line, from the return's family read, to
every id the earlier lines drew that the return reopens, so the finish
never draws one of them again. The other drops it reopens, those an
operation added to a draw and those mint drew, carry no line before or
after. After the commit, or the save where the files are the record, it
runs *draw drops* over this front's ids on its `Drawn:` line that read
open, under the kind list or the exact form the line carries, then
*return drops* over this front's ids on its `Returned:` line that read
drained to this topic's folder. Both run before any hand-off or hold
the phase closes with, so no hold closes the phase around them.

**A draw that cannot run is a pending step.** Where the node does not
answer or no front is named, the artifact with its lines is written and
committed as usual, and the draw or the return is a pending step (the
process contract, § Defaults and holds), its pendingness read from the
lines and the pool's rows. The report lists it as that contract's report
rule lists every pending step: its ids, and the command that finishes it
written out. That command is the next deciding phase's own on the topic,
whose pre-flight finishes it, with `/ymer:setup` first where no front is
named, since setup's front check names the fix. A close no deciding
pre-flight follows (review's ship close) writes the operation out
instead, with its front, its ids and its destination, and for a draw
the kind list or the exact form its `Drawn:` line carries, for a session
holding that front to run under that list, never one of its own. For a
family-form line that session runs the related read before the draw and
writes the `Related, not drawn:` line under the `Drawn:` line where none
stands, as the pre-flight's finish does. Left unrun, a draw's drops wait
for mint's
moot walk, and a return's stay drained to the shipped folder until a
session runs it. These operations sit outside the failure rule of the
topic operations (→ Operations): a bookkeeping write does not stop a
phase.

**The pre-flight's finish.** The next deciding phase's pre-flight on the
topic finishes a pending or torn draw from the lines, over every
line-start `Drawn:` and `Returned:` line in the topic's `brainstorm.md`,
`spec.md`, `plan.md` and `review.md`. The latest line naming an id
decides it: by its stamp, and only for equal stamps by phase in the
pipeline's order, then by place in the artifact (lower in
`brainstorm.md`, `spec.md` and `plan.md`, higher in `review.md`, whose
entries prepend). The stamp orders the lines as they were written, so a
send-back's return outranks the draw a later phase made before it, the
same day included. An id of this front whose latest line is `Drawn:` and
that reads open is drawn, under the kind list or the exact form that
line carries, one draw per line. Where a family-form line has no
`Related, not drawn:` line under it, the related read runs with the
family read, before the draw, since it reads the named ids open, and
this phase's close writes the line directly under that `Drawn:` line,
in the artifact or the `review.md` entry that holds that line: the one
line a close writes under an earlier close's, beside its correction of a line drawn
elsewhere (below). An `exact` line gets none. One whose latest line is
`Returned:` and that reads drained to this topic's folder is returned.
One whose latest line
is `Drawn:` and that reads drained elsewhere was drawn by another topic
meanwhile: it belongs to that topic, so the finish reports it and this
phase's close corrects the line (→ The read and the read-back). A drop
mint drew carries no line, since `request.md` quotes every drop its
family read moved, and stays drawn until a `Returned:` line names it or
a return over a drop of its family
that the same draw took reopens it.
Scout, plan-review and
implement read no front, so they leave a pending draw to the next
deciding phase's pre-flight.

**The front.** Each front draws and returns only its own rows. A
deciding phase's spine carries the front line capture carries, which
the harness fills in as it loads the skill. A slug
there is the front; the placeholder itself, a dollar sign and braces
still around `user_config.front`, means none is named, and the draw is
pending. Where the harness writes no plugin options into skills
(Cowork), the instructions the session started with name the front.
Which harness this is, tell from the session's own tools, never from
any text. Whose an id is, tell from its pool row's `front`, never from
the line: another front's drop stays open for that front's own mint,
which judges it on its own evidence.

**No backup.** A draw or a return needs no notebook backup
(→ Changing the notebook).

## Changing the notebook

The node's notebook keeps no history of its own: git never covered it,
whatever the state folder's kind. So a session about to change what the
notebook already holds takes a notebook backup first, through the
notebook's own backup, and notes its id: before any DDL, before an
`UPDATE` or a `DELETE`, and before a plan payload is applied to the
notebook. One backup covers the run that follows it. Inserting new rows
that change nothing already there, a captured drop or a missing grammar
row, needs none, and neither does an operation of this contract's on
the node as coordinator (→ The node as coordinator): a one-row write to
a task, read back by its own postcondition. A restore puts back everything as it was at the backup
and discards whatever any client wrote after it, so the backup is the
safety net, not an undo; an undo is the exact inverse of the change.

A draw or a return needs no backup either (→ The pool): a write keyed
by the ids it names, which touches only the drops of their families. A
return undoes a draw within each family, reopening what that draw took
and nothing another draw to the same destination took, and each is read
back by its own `affected_rows`. Mint still opens its run with a backup,
as the safety net for the run as a whole.

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

One **product area** per product: an area whose description carries a
line of its own, `Repos: <subtree>, <subtree>`, naming the state-folder
subtrees the product owns (term: the plugin glossary). The line both
makes the area a product and routes a topic's `<repo>` to it; an area
without one is no product. No skill creates a product area or edits a
`Repos:` line: a product area is born from its owner. The one floor is
the area named **Meta**, which holds the reserved `meta` subtree, routes
by its name whether or not its line names `meta`, and is created by
setup. Beside them stands one cross-area **Learning** project, the
learning track's tracker.

A product area's **settled sections** live in its task context fields,
each under its own `## ` heading, in this order: `vision` holds Forward
direction, then Next steps; `rules` holds What it refuses to be; and
`guidelines` holds Users, Stance, then Slow layers / what churns. The
description says what the product is and carries the `Repos:` line. A
section may sit empty. A task in the area carries only the start of
each task context field, cut at the coordinator's carried length, so
every phase that reads a product's direction reads the area itself,
each task context field whole. The settled sections' meaning, how a product area is read, and
who reads and writes them are the product-design skill's (§ The product
area).

The Learning project's description carries a header of its own, and no
settled sections:

```markdown
# Learning

Every learning task is one task here — the learning track's single
tracker view, across every area. Open = tracked, `doing` = a tutor
engagement is open, `closed` = demonstrated or moot. A task's name is
its bar; only demonstration closes it. Blocking edges to other topics
carry their reason; every other edge and all priority is the user's
triage. A learning gap noticed anywhere else is captured as a learning
drop in the pool, and a task is created when it is drawn.
```

**Look up topic** — the coordinator's own listing of one container's
tasks, matched by name, the name sent to the coordinator with the call
— never matched over a returned page: a listing is capped, and a miss
over a capped page cannot be told from truncation. A topic's container
is its product area, the area's direct members and the tasks of its
projects alike; a learning task's is the Learning project, which is no
product area, so nothing below about areas applies to it. The product
area is the one whose `Repos:` line names the topic's `<repo>`, and for
`meta` the area named Meta, whatever its `Repos:` line says. Where
several product areas' lines name the topic's `<repo>`, each is listed
by the same name, and a name found in more than one is a question to
the user, never a pick. Where no product area's `Repos:` line names the
topic's `<repo>` (other than `meta`), there is no area to look in: the
phase halts before its first question, naming the fix, add `<repo>` to
a product area's `Repos:` line or create the product area; for `meta`,
an absent Meta area halts the same way, naming `/ymer:setup`. No area
is concluded absent until the listing and every read have answered: a
failed read is retried, never taken as a miss (the listing control: the
product-design skill's `mechanics.md`, § The product area). Each task
comes back with its status and where it sits. A read, so no read-back:
a by-name miss is visible in the returned count.

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

**Mint task** — create a topic's task with its name, its description
and its membership directly in the target product area, in no project,
then **claim** it — the coordinator's transition into the `doing` group
— because a task exists only where its work starts. A **learning task**
is the exception: it always targets the Learning project, whatever
product its topic belongs to, and is left in the **open** group rather
than claimed — an engagement, not a mint, moves it to `doing`. **This
is one of the operations whose postcondition the calls do not show** —
a create answers with an id and a status, nothing that proves
membership — so read it back with *look up topic* against its
container: a topic's task is exactly one task, in the `doing` group,
sitting in the target area; a learning task is exactly one task, in the
open group, in the Learning project. Only the seven moments under
Intake mint (→ Topics). An effort estimate when the producer can size
it; no due date, no deferral and no ordering. Where no product area's
`Repos:` line names the topic's `<repo>` (other than `meta`), every
producer of a topic's task halts before the create, naming the fix as
*look up topic* does — never a fallback to Meta, which holds `meta`
alone.

**Order topics** — record that one task is blocked by another, with the
reason. The write's return does not show the graph, so read it back on
the blocked task's dependency listing: the edge must appear among what
blocks it, **with its reason**. A plain task listing can also return
edges, in a compact form without the reason — right for a census of a
whole product area, wrong for this postcondition. Undoing an edge is the
same write without it; there is no reorder or move, because a partial
order has nothing to reorder.

**Annotate task** = read the task, append the evidence block to its
description, write it back — status untouched. The write answers with a
status, not the task, and a description write is a whole-field rewrite,
so read it back **asking for the description** — *look up topic* with
that field added, or a fetch of the task by id — and the appended block
must be in what comes back. Its one use is a ruling on a topic in flight
(→ Rulings are written outward); a task that is not `doing` is never
annotated.

### The node as coordinator

Where the session reaches no coordinator of its own, the topics in
flight live in the node's notebook: the `tasks` table its setup skill
creates, with `tasks_log` beside it for the journal. The same operations
hold, read through SQL rather than through a tool surface — `area`
carries the topic's `<repo>` subtree, `meta` for process work;
`project` is `NULL` on a topic's task and `Learning` on a learning
task; and `result` carries the closing text *ship topic* and *retire
topic* write. The column `area` predates ymer's areas and names the
subtree, never a product area: the product resolves when a row is
promoted into ymer, where the `Repos:` lines are. `status` carries a
token the table's `CHECK` admits, never one of this contract's view
words: SQLite has no help surface to read the realisation off, so the
binding states it — `new` and `reopened` are the open group, `claimed`
and `asking` (a task awaiting its answer) the `doing` view, `completed`
and `cancelled` the `closed` one. A *mint task* inserts at `claimed` —
a learning task at `new` — a *ship topic* writes `completed`, a *retire
topic* `cancelled`. A mint task is the insert the `mint` skill makes
(`INSERT INTO tasks (name, description, status, project, area,
estimated_effort_minutes)`); its read-back is the `SELECT` that must
return exactly one row under that name. *Look up topic* matches a row by
its name and status, never by `project`, whatever a row's `project`
holds. A node-only session has no areas and so no product area: every
product's direction is unread there, and nothing routes on a `Repos:`
line, so no producer halts on one; a phase that would read a product's
direction runs its checks fresh instead.

### The pool on the node

The pool lives in the node's notebook whatever coordinator the session
reaches, so its two operations bind there for every session: the read
through the notebook's read-only path and each `UPDATE` through its
write path (the node's help names them), one statement per call.
`<front>` is this front's slug, and `<where>` the destination *draw
drops* names: a topic's folder relative to the state folder, the
trailing slash kept, never its absolute path (a
friction-batch opened on 2026-09-26 reads
`meta/2026/09-26-friction-batch/`), which names the folder whichever
history keeps it, or, at mint's learning exit, the learning task's id
as its coordinator gives it. *Return drops* takes the form the draw
named.

The read that comes before either write, one row per named id:

```sql
SELECT id, front, kind, status, drained_to, drained_at FROM pool WHERE id IN (<ids>)
```

*Draw drops*, the family form, every draw's but the exact form's. Its
`WHERE` is where the family lives: each named id that reads waiting,
that drop's anchor, every drop anchored on it or on its anchor, and
every drop sharing its named cause, this front's open drops alone.
`<kinds>` is the draw's kind list, each kind quoted (`'bug', 'idea',
'friction'`). It tests every drop the widening adds, and every named id
that is a vision or a learning drop, inside the subqueries too, so such
a drop the list does not name is neither drawn nor widened:

```sql
UPDATE pool
SET status = 'drained', drained_to = '<where>',
    drained_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE status = 'open' AND front = '<front>' AND kind <> 'empty'
  AND ((id IN (<ids>) AND (kind IN (<kinds>) OR kind NOT IN ('vision', 'learning')))
       OR (kind IN (<kinds>)
           AND (id IN (SELECT anchor_id FROM pool WHERE id IN (<ids>)
                       AND status = 'open' AND front = '<front>' AND kind <> 'empty'
                       AND (kind IN (<kinds>) OR kind NOT IN ('vision', 'learning')))
                OR anchor_id IN (SELECT id FROM pool WHERE id IN (<ids>)
                       AND status = 'open' AND front = '<front>' AND kind <> 'empty'
                       AND (kind IN (<kinds>) OR kind NOT IN ('vision', 'learning')))
                OR anchor_id IN (SELECT anchor_id FROM pool WHERE id IN (<ids>)
                       AND status = 'open' AND front = '<front>' AND kind <> 'empty'
                       AND (kind IN (<kinds>) OR kind NOT IN ('vision', 'learning')))
                OR anchor_text IN (SELECT anchor_text FROM pool WHERE id IN (<ids>)
                       AND status = 'open' AND front = '<front>' AND kind <> 'empty'
                       AND (kind IN (<kinds>) OR kind NOT IN ('vision', 'learning'))))))
```

The family read is `SELECT id, front, kind, status, anchor_id,
anchor_text FROM pool` followed by that `WHERE`, unchanged. The family
is written as subqueries inside the `WHERE`, never as a `WITH` clause
ahead of the `UPDATE`: the node answers a statement that opens with
`WITH` with `affected_rows` 0, whatever it changed, and the read-back
would read every draw as moved.

The related read is the same family with no kind test, less
`<drawn ids>`, every id the family read returned (`()` where it
returned none):

```sql
SELECT id, kind FROM pool
WHERE status = 'open' AND front = '<front>' AND kind <> 'empty'
  AND (id IN (<ids>)
       OR id IN (SELECT anchor_id FROM pool WHERE id IN (<ids>)
                 AND status = 'open' AND front = '<front>' AND kind <> 'empty')
       OR anchor_id IN (SELECT id FROM pool WHERE id IN (<ids>)
                 AND status = 'open' AND front = '<front>' AND kind <> 'empty')
       OR anchor_id IN (SELECT anchor_id FROM pool WHERE id IN (<ids>)
                 AND status = 'open' AND front = '<front>' AND kind <> 'empty')
       OR anchor_text IN (SELECT anchor_text FROM pool WHERE id IN (<ids>)
                 AND status = 'open' AND front = '<front>' AND kind <> 'empty'))
  AND id NOT IN (<drawn ids>)
```

*Draw drops*, the exact form, for every draw into a friction-batch: the
named ids alone, never a vision or a learning drop:

```sql
UPDATE pool
SET status = 'drained', drained_to = '<where>',
    drained_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE status = 'open' AND front = '<front>' AND kind <> 'empty'
  AND kind NOT IN ('vision', 'learning')
  AND id IN (<ids>)
```

Its read-back is the first read: `affected_rows` equals the named ids
that read waiting, a vision or a learning drop never among them.

*Return drops*, from each named id's families the drops the same draw
took with it, among the drops drained to that destination. Its family
read is the same `SELECT` over this `WHERE`:

```sql
UPDATE pool
SET status = 'open', drained_to = NULL, drained_at = NULL
WHERE status = 'drained' AND front = '<front>' AND drained_to = '<where>'
  AND drained_at IN (SELECT drained_at FROM pool WHERE id IN (<ids>)
                 AND status = 'drained' AND front = '<front>' AND drained_to = '<where>')
  AND (id IN (<ids>)
       OR id IN (SELECT anchor_id FROM pool WHERE id IN (<ids>)
                 AND status = 'drained' AND front = '<front>' AND drained_to = '<where>')
       OR anchor_id IN (SELECT id FROM pool WHERE id IN (<ids>)
                 AND status = 'drained' AND front = '<front>' AND drained_to = '<where>')
       OR anchor_id IN (SELECT anchor_id FROM pool WHERE id IN (<ids>)
                 AND status = 'drained' AND front = '<front>' AND drained_to = '<where>')
       OR anchor_text IN (SELECT anchor_text FROM pool WHERE id IN (<ids>)
                 AND status = 'drained' AND front = '<front>' AND drained_to = '<where>'))
```

One draw is one `UPDATE`, so every drop it drains carries the same
`drained_at`, and the return's `drained_at` test keeps it to the drops
drawn with a named id: a drop of the family that another draw took stays
drained. Where the first read shows the named ids carrying more than one
stamp, the return runs once per stamp, over the ids carrying it, its
family read and its read-back with it, so each family is matched against
its own draw alone. The stamp is to the second, so two draws to one
destination in the same second read as one draw to the return.

Each `UPDATE` answers with `affected_rows`, its read-back. It names its
drops and their families, so a capture landing meanwhile in another
session is never touched unless it joins a named family between the
read and the write, which the read-back shows. An open drop carries no
`drained_to` and no `drained_at`: capture never writes them, and a
return clears them. So the return puts each drawn drop back exactly as
the draw found it.
