---
name: mint
description: Draws the next piece of work from the Ymer Node's pool: scores the new drops, ranks the pool, takes the top drop with the drops that belong with it, and turns them into exactly one thing, a topic and its task in the product's Roadmap, the friction-batch, or a learning task. Use when it is time to pick what to work on next from what earlier work captured.
---

# Mint

Mint picks the next piece of work. Earlier work leaves what it noticed
as **drops** in the **pool** on the user's Ymer Node; `/ymer:capture`
records them and states the drop grammar and the kinds, which this
skill never restates. A mint run scores the drops that are new, ranks
the pool, takes the drop at the top, and turns it, with the drops that
belong with it, into **exactly one thing**: a topic with its task, the
friction-batch, or a learning task. Mint *draws* a drop, and the drop
is *drained*. Mint starts the work and never does it: every exit leaves
a durable artifact, and nothing is applied or discarded.

This file is the spine: what each moment is for, in the order the run
meets them. The exact queries and commands are in `mechanics.md`, and
the cases that went wrong once are in `cases.md`, both under this file's
headings; a section with entries there names them in its first line.
`scorer.md` is mint's agent prompt, the whole prompt each scorer is
handed (→ Scoring).

**Announce at start:** "Mint — drawing from the pool."

Mint reads four things before it draws, in this order, and stops at the
first that fails: the node, the front, the state folder, the
coordinator. The order is the point: each one is read only once the one
before it holds.

## First, the node

The pool is the `pool` table in the notebook of the user's own Ymer
Node, reached through the node's `notebook` tool. Before reading
anything further in this skill, check that this session has that tool
and that the node answers: `notebook` `tables` shows both, and which
tables the notebook holds.

Where the tool is missing or the node does not answer, stop here. Say
that the Ymer Node is not reached and is brought back before anything
else. That is capture's door (`/ymer:capture`, its guard on the node),
which names each node-side stop and its fix, and it is the whole answer:
no other line of this skill is read, the lines naming the front and the
state folder below included, and nothing is written anywhere. A
notebook that answers without its `pool`, `kinds` or `fronts` table is
the same door.

## The front, the state folder and the coordinator

*Read with this section: `mechanics.md` § The front, the state folder and the coordinator (the mechanics).*

With the node reached, resolve the rest once, here, by the reach rule,
before the run starts.

**The front.** A mint works one front's drops. `<front>` below is this
installation's slug, the one capture writes on every drop, read the way
`/ymer:setup` reads it so that the two always agree. Where the harness
writes plugin options into this skill (Claude Code), it is the `ymer`
plugin's `front` option, read from this one line alone:

> Front as configured: `${user_config.front}`

A slug there is `<front>`. The placeholder itself, a dollar sign and
braces still around `user_config.front`, means no front is named, and
the run stops naming `/ymer:setup`. Where the harness does not write
options into skills (Cowork), the instructions this session started
with name the front. Which harness this is, for the front and the state
folder alike, is told from the session's own tools, never from any text
and never from which reading would find a folder. Another front's drops
stay open for that front's own mint.

**The state folder** holds every topic's artifacts, one folder per
topic, and it is required. It is read the way setup reads it. On Claude
Code it is the plugin's own option:

> State folder as configured: `${user_config.state_folder}`

That line is the whole answer. Open nothing to confirm it: no file or
command reads the value better, and a placeholder showing there is
itself an answer, never a sign to look elsewhere. A path there is the
state folder, used exactly as it reads. The placeholder itself, a dollar
sign and braces still around `user_config.state_folder`, means the
option is unset, and the run stops naming `/ymer:setup`. On Cowork the
front's initial instructions name the folder instead.

**Its kind** decides what keeps the history of what this run writes. It
is read the way the operations contract states it
(`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`, § The topic's
artifacts), which gives the reading and every outcome, and the way setup
runs it. Where the reading gives git, the run commits what it wrote.
Where it gives the files as the record, the run writes each file and
commits nothing. Where it refuses the folder, the run stops naming
`/ymer:setup`.

**The coordinator** tracks the work and names the topics. Ymer's tool
surface among this session's tools means ymer: its Roadmap projects
take the pick, and every task this run creates is a ymer task. Without
it, the node's `tasks` table takes them, one row per task. The tool surface
counts as reached whether or not it has been loaded yet, the same test
setup's ymer check uses, so a deferred tool is never read as an absent
one. On Claude Code a lapsed sign-in looks exactly like no ymer at all,
and is told apart before absence is believed. A coordinator that is
simply not there is not a failure and stops nothing: the close says
which store took the pick. "Not there" means ymer's tool surface, never
a table (the node is reached, and a table it lacks is setup's to
create) and never the state folder (it is required).

Nothing is asked and nothing is configured beyond the front's name and
the state folder's path. All four pairs of coordinator and history are
real installs: a run may create its task in ymer and leave the files as
the record, or create it in `tasks` and commit into git, as readily as
either pair.

**Every failure past the node is setup's.** Each of these stops the run
with one instruction, **run `/ymer:setup`**, which ships in this plugin:
no front named (the placeholder on Claude Code, none in the instructions
on Cowork), or two instructions naming two different slugs; no state
folder named (the placeholder on Claude Code, no path in the front's
instructions on Cowork), or two instructions naming two different
folders; a named folder that is missing, out of this session's reach, or
refused by the reading of its kind; a ymer call that errors; a lapsed
sign-in; a notebook that answers but lacks `tasks`, `tasks_log` or
`pool_scores`; and a `<front>` the node's `fronts` table does not list
(→ Nothing to draw). Repair nothing here, never guess a path, and never
write a topic anywhere else: a run with no state folder drains nothing,
and its drops stay open for the run after setup passes.

## The way of working mint draws into

Mint deposits into the directed way of working, and routes by its name
conventions rather than by configuration:

- **One product, one Roadmap.** In ymer it is a project named
  `<Product> Roadmap`, found by a `projects list` name search for
  `Roadmap`: its tasks are the work in flight and its description is the
  product's page. In the node's `tasks` table it is the `project` value
  a row carries, derived from the area, so there is nothing to find and
  nothing to create.
- **Work about how you work belongs to no product**, so it goes to
  `Meta Roadmap`, the one Roadmap every machine has: created by
  `/ymer:setup` where there is ymer, and the `project` value
  `Meta Roadmap` in the node otherwise.
- **One place for a topic's artifacts**: one folder per topic in the
  state folder, laid out `<area>/YYYY/MM-DD-<topic>/`. `<area>` is the
  repo or product the topic belongs to, named by the drawn drops' own
  context. **`meta` is the reserved area for process work**, and it is
  the area that routes to `Meta Roadmap`.
- **`Learning`** holds learning tasks, one per subject gap: an optional
  project in ymer, the `project` value `Learning` in the node.

Nothing richer is configuration. Where a convention has no match, the
skill says so and names what to create; it never guesses.

**Ymer calls are named, never spelled.** This skill names the tool and
the action a step needs, the transition or group as a word, and what
proves the call landed. It never writes the parameter shape: that is the
server's, read from its own `help` for the action at the moment of the
call, or from the hint a response carries. A shape copied into a skill
goes stale the next time the server moves.

**Notebook calls are named the same way, and their SQL is written out**
in `mechanics.md`, under the heading of the section that runs each
statement (most of it in § The run and § Scoring): the tool and the
action are the node's, and the SQL is this plugin's own, over its own
tables. The node runs one statement per
`execute` call and drops the rest of a multi-statement call without a
word, so each statement is a call of its own. A result too large to
come back whole, a notebook read or a `projects list`, is read whole
from wherever the harness kept it, never from a preview of it.

## Nothing to draw

*Read with this section: `mechanics.md` § Nothing to draw (the mechanics).*

First resolve `<front>` against the node: its `fronts` table must list
the slug. A slug it does not list stops the run naming `/ymer:setup`:
the slug is not the one this installation registered, or its row is
missing. Through every query after this one a wrong slug reads as an
empty pool, never as an error, so this is the one place it shows.

Then, if the pool holds no open drop on this front, or none but drops
no exit can take (empty drops, vision drops no exit can place, and
drops anchored to a topic in flight, started and not yet shipped), there
is no run to make. Say so and stop, naming `/ymer:capture` as the way to
put a drop there: no drain, no commit, no task. Both states are
ordinary, a drained pool and an accumulation of drops nothing ever
draws.

## The run

*Read with this section: `mechanics.md` § The run (the mechanics) and `cases.md` § The run (the cases).*

1. **Back up, score, then survey.** Take a notebook backup first
   (`notebook` `create`) and note its id: the drain in step 4 changes
   drops that no commit records. The backup is the whole-notebook safety
   net, not the drain's undo, because `restore` also discards every drop
   any session inserted after it. A wrong drain is undone by its exact
   inverse instead, which touches nothing else.

   Then score (→ Scoring): every open drop on this front that is not
   empty and has no `pool_scores` row gets one before anything is
   ranked, as far as this run's scoring reaches. A drop it leaves
   unscored waits for a later run, named in the close. A pool with
   nothing new scores nothing, and the run goes straight on.

   Then survey the pool whole, never a recent tail: something that
   recurs slowly would fall out of view exactly as it matures into work
   worth doing. Whole means every open drop on this front is counted and
   every scored one ranked. The census of open drops per front comes
   first, the one read across fronts, so a run can say what sits on
   a front that has not drawn from it; every read after it is this
   front's. Then the aggregates: drops per kind and source, every anchor
   with its drops, the open recurrences whose anchor was drained (the
   sharpest signal), and the vision drops per product. Then the
   ranking, highest score first, twenty-five per page, read until the
   top drop is found (→ The pick rule), never the whole list. Frequency
   is shown beside the score and never folded into it.

   A drop that becomes a candidate for the pick is read whole, together
   with the drops anchored on it. Its neighbours, open drops on this
   front that solve the same kind of problem without sharing its anchor,
   are found by searching the pool for the candidate's own terms, rarest
   first, and on the ranking pages already read. The aggregates count;
   clustering is still a judgement made by reading. Two exits take more
   than the top drop and its family, members the ranking pages do not
   surface, so they are read for the pick: a vision drop brings its
   product's whole vision cluster (→ Clustering), and a friction-batch
   pick gathers its set from the ranking pages already read and from the
   open frictions scored small.

   Then list this front's work nobody has started, in **every store this
   session reaches**, since they answer different questions: in the
   state folder, the topics mint drew whose folder still holds nothing
   but its `request.md`, where a listing that does not show `request.md`
   itself is a broken read, never an empty folder (`mechanics.md`
   § The run); in the coordinator, the open learning tasks,
   which exit 3 leaves with no artifact, so no other listing sees them.
   A topic mint creates is in flight from the moment its task exists, so
   what marks it unstarted is its folder, never its task. Skip the
   stores this session does not reach. The listings are a reminder at
   the moment they matter, never a gate, and the one-open-friction-batch
   rule (→ Three exits) reads them.

2. **Pick the top drop** (→ The pick rule): the highest-scored drop an
   exit can take, unless a written reason passes it over.

3. **Form the pick, then create or append its artifact.** Read the
   product's **Forward direction** once: the first settled section of
   its page, the `<Product> Roadmap` project's description, and
   `Meta Roadmap`'s for a `meta` pick (fetch recipe and miss rule: the
   product-design skill § The product page). It decides two things and
   nothing else: which neighbouring open drops belong with the top one,
   and the shape the topic takes, the scope that moves the product the
   way its direction says. Ranking is not its job, and a product with no
   page, or a page with an empty Forward direction, forms the pick from
   the drops alone. Then create or append the artifact: a topic, the
   friction-batch, or a learning task (→ Three exits).

   A topic's artifact, the friction-batch's included, is its
   `request.md`, which this run writes or appends at
   `<state folder>/<area>/YYYY/MM-DD-<topic>/request.md` with this
   session's own file tools, whichever history keeps the folder
   (→ `request.md`'s shape). Where git keeps it, step 5 commits that
   file; otherwise the file is the save.

4. **Drain the drops the pick took**, every one of them, in one
   `notebook` `execute`. The ids are this front's portion of the
   cluster, never the anchor's alone: the anchor where its front is this
   one, every open drop of this front anchored on it, by its id or by the
   same named cause, the vision cluster
   or friction-batch set step 1 gathered, and the neighbours step 3
   folded in. The drain names where the drops went: the topic's folder
   as `<area>/YYYY/MM-DD-<topic>/`, the friction-batch's included, or
   the learning task's id. Drops are never deleted, and every other drop
   stays open: a friction left to accumulate produces a *better* root
   cause when its turn comes.

5. **Record what the pick wrote** in the state folder's history, state
   changes before announcements, so the close announces what is already
   durable. Where git keeps the history, commit the topic's folder and
   nothing else: the state folder can be written by concurrent sessions,
   and a bare commit sweeps in their staged work. Where the files are
   the record, the file step 3 wrote is the save, and this step ends
   there. A learning-task pick writes no file and records nothing: its
   drain is already durable in the table.

6. **Close with the runnable reminder** (→ The close).

## Scoring

*Read with this section: `mechanics.md` § Scoring (the mechanics) and `cases.md` § Scoring (the cases).*

A drop's **score** ranks it: its kind's weight times the sum of three
components, direction value, time criticality and risk reduction,
divided by a fourth, size. Each component is 1, 3 or 5, written once
into the drop's `pool_scores` row by a **scorer**: a subagent on the
cheapest model the harness offers, whose whole world is its prompt. The
score itself is computed by the ranking query at every run and never
stored. A row is never revised: a changed rubric, or a product's changed
next steps, applies to drops scored after the change, and older rows
keep the numbers they were given.

The kind weights have one home, the ranking query's `VALUES` list in
`mechanics.md` § The run; a kind it does not name, one a front added,
weighs 1.
The rubric, what every 1, 3 and 5 means, has one home too:
[`scorer.md`](scorer.md), mint's agent prompt. A retune is an edit in
that home, and the next run ranks with it without rewriting a row. Bugs
lead because of their weight, not because of a rule above the formula.

Invoking this skill is the request to dispatch scorers: a standing
instruction to use subagents only when the user asks for them is met by
the invocation itself.

1. **The unscored drops**, their ids only, so that this session reads
   none of their text. None listed, and scoring is done for this run.
2. **The next steps.** Where the node is the coordinator there are no
   pages (the product-design skill § The product page): the block says
   there are no next steps, it has been read, and scoring goes on. Where
   ymer is, every product page's `## Next steps` section, one block per
   product, from one `projects list`. Only that call can leave the block
   unread: where it fails or comes back cut short, nothing is scored
   this run, because scores are written once and an unread block must
   never be read as an empty one. In that case go straight to the
   read-back, which ranks the rows already written, and no id gets the
   in-session try
   (→ `cases.md` § Scoring).
3. **Dispatch.** Split the ids into lists and hand each list to a fresh
   scorer: the text of `scorer.md` verbatim, then the next-steps block
   and the list. A scorer reads text other sessions wrote, so give it
   the node's `notebook` tool and nothing else where the harness lets a
   dispatch name tools; list the notebook's tables before the first
   dispatch; and run a bounded few at a time (the list size and the
   bound: `mechanics.md` § Scoring). Wait for every scorer's answer
   before anything is ranked.
4. **Read back.** Where scorers ran, check that they wrote their rows
   and nothing else: compare the notebook's tables with the list taken
   before the first dispatch. A table that appeared or vanished means a scorer
   wrote beyond its rows, and stops the run before ranking: name the
   difference and hand it to capture; the backup step 1 of the run took
   is the way back (→ `cases.md` § Scoring). Then list the unscored
   drops again. An id still listed gets one more try, scored in this
   session, unless step 2's block could not be read: then no id is
   tried. An id unscored after that is left out of the ranking until a
   later run, never ranked on a guess, and the ids left out are named
   before the draw. Where the ranking holds no drop at all while open
   drops wait unscored, stop and draw nothing: a judgement pick over
   unscored drops is never the way around an empty ranking. Keep each
   scorer's note on the drops that were hard to score: the close hands
   it to capture.

**Fallback: score in this session.** Where no subagent can be
dispatched (the tool is absent, or a spawn is refused at the permission
layer), this session reads `scorer.md` and follows it as a scorer would,
within the bounds in `mechanics.md` § Scoring, and the close says
scoring ran in-session. The rows are the same rows, so the ranking stays
one formula on every front.

## Clustering

A **cluster** is a named root cause plus the drops whose 5-Whys
terminates at it. Cluster by root cause, never by symptom and never by
affected area: the drop-records-the-cause rule, extended to the group.
A bug's cluster is the thing that is broken and every drop that saw it
break.

**Vision drops cluster per product instead.** They carry no root cause
to terminate at, and one product's direction is what their drain
writes. A product's vision drops are one cluster however unrelated their
contents, and they never join a friction cluster.

Clustering is something mint *does while reading*, and names in a
`request.md` when several drops share a cause. It is never written to
disk or to the table as a structure, so nothing persists between runs
to drift. The anchors capture records are evidence for a cluster, not
the cluster: drops with different anchors can terminate at one root
cause. Which neighbours beyond the cluster ride along is step 3's, read
off the Forward direction.

## The pick rule

*Read with this section: `mechanics.md` § The pick rule (the mechanics) and `cases.md` § The pick rule (the cases).*

**The top drop is the highest-scored drop an exit can take.** Walk the
ranking from its head; the first drop an exit can take is the top drop.
The rules for a drop anchored to a topic that already exists, below,
act on the drop the walk lands on. Anchored to an unstarted topic, it
folds into that topic, and that fold is the run's one draw. Anchored to
a topic in flight, it is passed by, and so is a vision drop no exit can
place (→ Three exits); the walk goes on. A recurrence of something that
shipped is never passed by under these rules, and it is drawn above a
higher-ranked drop only through the written reason below. One formula
ranks, with no tier, threshold or ladder above it. A top drop that might
be a bug and might be trivial errs toward being drawn: drawing it is how
the doubt is settled.

**Passing the top drop over takes a written reason.** The score is the
default, never a cage: draw something else when reading the top drop
shows the ranking is wrong about it, weighing what the score cannot see
(→ `cases.md` § The pick rule).
Write the reason into the pick's `request.md`, one line per drop passed
over (→ `request.md`'s shape), and hand it to capture at the close.

**A drop anchored to a topic that already exists** follows one of two
rules:

- **Topic created but nobody has started it**: fold the drop into its
  `request.md` and drain it there. It is the same append the
  friction-batch uses; it costs nothing because nobody has read the
  file yet, and the intake gets strictly better.
- **Anything else**: leave the drop open. If the topic shipped and what
  it observed is gone, a later run carries the drop to the
  friction-batch as moot. If it shipped and the observation persists,
  **that recurrence after a ship is the sharpest signal the pool
  gives**: a shipped change did not solve what it claimed, and it earns
  its own topic.

Everything wider than capture's bounded query is mint's, never
capture's: the listings above, drained drops read in full, and an ad-hoc
search of the state folder when a drop looks like a recurrence of
something already drained, skipping every topic's `pre-image/` slot,
which holds superseded copies (`mechanics.md` § The pick rule). Narrow that search by time if it gets
unwieldy, but set no default window: the valuable catch is something
recurring from a topic that shipped long ago, and a window blinds it.

## Three exits, all artifact-depositing

*Read with this section: `mechanics.md` § Three exits, all artifact-depositing (the mechanics) and `cases.md` § Three exits, all artifact-depositing (the cases).*

**1. Its own topic.** The pick becomes a topic `YYYY-MM-DD-<name>` whose
`request.md` lands in this run's state folder, plus **the topic's task**,
created at `doing` in the Roadmap its area routes to: a task exists only
where work starts, and this one starts now, with its brainstorm as the
next session on it.

The order is route (below), then create the task, then write
`request.md`: the artifact carries the task's id, and a halt at routing
then leaves nothing behind. In ymer the task is created, claimed into
the `doing` group, and read back; in the node it is one row and its
read-back. The read-back must show exactly one task, in the `doing`
group, in the target Roadmap (`mechanics.md` § Three exits, all
artifact-depositing). The task's description **points at the artifact, never
copies it**: `request.md` already carries the root cause and the drops
verbatim, and a copy would be the second store this whole arrangement
exists to remove.

**Routing: which Roadmap.** The topic's area decides. Where ymer is the
coordinator, read it off the projects a `projects list` name search for
`Roadmap` returns, the same list step 3's Forward direction was read
from, so no second call:

- **`meta` routes to `Meta Roadmap`**: the friction-batch always, and
  any process-level pick. Work about how you work belongs to no product,
  and this is the project that holds it.
- **Every other area routes to that product's `<Product> Roadmap`**,
  and **`Meta Roadmap` is never a candidate there**: it sits among those
  matches by name, so exclude it before resolving. One remaining match
  is the target only when it is that product's Roadmap; another
  product's is no match at all, and leaves you at the halt below rather
  than at a default. Several are resolved by the pick's own content,
  which names the product it is about. Ask only on genuine ambiguity,
  and never route a product pick to `meta` by default.

**No match halts the run** in ymer, saying what to create: a product's
Roadmap, or `Meta Roadmap`, which `/ymer:setup` creates. Where the node
is the coordinator there is nothing to halt on: `project` is a label
derived from the area.

**Before creating, one look**: step 1 already listed the unstarted
topics in every store this session reaches. If one of them is this same
thing, append the new drops to that topic's `request.md` instead of
creating a second task for it, through the file and counting the
heading first (→ `request.md`'s shape).

**2. The friction-batch** is a shape mint may choose when the pick is a
set of small frictions rather than one cause worth a topic: the topic
`YYYY-MM-DD-friction-batch`, always under the area `meta`, because its
contents are your own process prose and config by construction, so it
always routes to `Meta Roadmap`. It takes exactly two kinds of drop:

- **Below the bar but actionable**: the change is derivable from the
  drop itself plus a locating search, no design choices are left, and
  the edit surface is your process prose or config, never a project's
  code.
- **Moot or not worth doing**: the cause is gone, was handled
  elsewhere, or is judged not worth acting on. Never drain such a drop
  silently: the work that follows gets the final say on whether it is
  done, including that it is not.

**Bugs and vision drops are neither kind.** A bug is drawn as its own
pick, and a product's direction is not the friction-batch's edit
surface. A product's vision drops drain as exit 1, as a **carve topic**:
an ordinary topic in that product's area whose `request.md` names the
product and carries the drops verbatim, and whose work writes them into
the product's own description. That is the one door through which
vision material reaches a product page.

"The product has a Roadmap" reads per coordinator, like every other
route. In ymer a `<Product> Roadmap` must exist, and a vision drop for a
product with none waits, as capture says. In the node it always holds,
since `project` is the derived label, so a vision cluster there drains
like any other pick, and writing the page itself happens wherever that
page lives once the topic is promoted.

**Every other drop stays open, accumulating.** If the friction-batch
swallowed everything, the pool would empty at every run and the
frequency signal shown beside the score would be gone.

**One open friction-batch at a time.** If step 1's listings found a
friction-batch nobody has started, **append** this run's drops to its
`request.md` under the right heading, counting that heading in the file
before inserting (→ `request.md`'s shape); otherwise create a new one and
its task like any other pick. Once a friction-batch has been started,
the next run opens a fresh one, and an appended-to friction-batch keeps
its *opening* date: every drop carries its own.

**3. A learning task.** A `learning` drop exits here. Mint **never opens
the learning in-session**, exactly as it never runs the topic: it
creates a task, drains the drops to that task, and closes. The task's
name is the gap **as a goal-contract-shaped statement**, not a bare
subject name: "enough Postgres query planning to read an EXPLAIN and
fix the index myself", not "Postgres". The drained drops ride the
description verbatim. Its status is in the **open** group, since an
engagement, not a mint, moves it to `doing`, and it carries no
dependency edge, since pattern evidence blocks no specific topic.
**Before creating, one look**: if one of the open learning tasks names
the same subject gap, append the drops to its description instead, so
that each subject gap keeps one task. In the node that append keeps the
description already there even where it is empty, and checks that one
row changed (the statement: `cases.md` § Three exits, all
artifact-depositing).

Where ymer is the coordinator the task goes in a project named
`Learning`, the one step 1 already listed, created and read back as in
exit 1 but never claimed. **No `Learning` project?** Fold the pick into
exit 1: create it in the Roadmap project its area routes to, as an
ordinary task, its name and verbatim drops unchanged. Degrade, never
halt: that project is optional practice, and its absence means
something. Where the node is the coordinator the task is a `tasks` row
labelled `Learning`, which needs nothing to exist first: the label keeps
the learning-gap signal out of the product work in the listing, and
promoting the row into a ymer `Learning` project later is a copy.

## `request.md`'s shape

*Read with this section: `mechanics.md` § `request.md`'s shape (the mechanics) and `cases.md` § `request.md`'s shape (the cases).*

`source: mint` marks where the topic came from, `task:` is the reverse
pointer to the task created beside it, and `started:` is the day it was
drawn. Every drop is quoted as one line ending in its id, so that the id
travels with it; that line is the one format capture and mint share.

A normal pick opens with its root cause, the shared cause its drops
terminate at, marked `inferred:` by default because mint synthesizes
with no code in view, while the verbatim drops below it stay unmarked
observations. Then its direction, how the pick moves the product the way
its Forward direction says; then a **Passed over** line for each drop
the pick passed over, so the topic's brainstorm reads why this pick and
not the top one; then the drops. A friction-batch sorts its drops under
two headings, below the bar and moot, which carry mint's judgement into
the topic as real input for whoever works it.

A topic whose `request.md` is already there is one to append to, never
to write again: the before-creating look is what finds it. An append
goes through the file and adds to it, leaving everything already there
as it is. It never writes blind: before inserting under a heading that
has another heading after it, count that heading in the file, and write
only on a count of 1; any other count stops the write, since the file
quotes real sessions and a quoted heading would take the drops into the
middle of a drop while the write reported success. Under the last
heading there is nothing to count before, but the heading the append
names must still be there (→ `cases.md` § `request.md`'s shape). A
fresh `request.md` is written only after this session's own file tools
show no file at that path (`mechanics.md` § `request.md`'s shape).

## The close

*Read with this section: `cases.md` § The close (the cases).*

```
Picked: <name> — <one line: what doing it removes or builds>
Topic:  <area>/YYYY/MM-DD-<name>/ (state folder, history in <git | the files alone>)
Task:   <task name> (doing, <Product> Roadmap in <ymer | node `tasks`>)
Scored: <n> new drops (<n> scorers | in this session | next steps unreadable)
Unscored: <m> left out of the ranking (ids <the first ten>)
Next:   /brainstorm <name>

Still unstarted from earlier mints:
  <other-name>   (<area>/YYYY/MM-DD-<other-name>/)
```

Two of those lines are conditional. `Unscored:` is written only where
drops stayed unscored. `Scored:` also reads `0 new drops`, and takes a
trailing `pages without next steps: <names>` wherever a page had no
`## Next steps` heading, which is how a page that lost it is seen (the
full values: `cases.md` § The close). A run that stopped on an empty
ranking picks nothing and closes with `Scored:`, `Unscored:` and the
reason alone.

Naming the store on the `Topic:` and `Task:` lines is the whole report
the reach rule owes: it tells you where to look, and makes a run
that deposited somewhere unexpected visible the moment it happens.

`Next:` names `/brainstorm <name>` only when a `/brainstorm` skill is
loaded, the bare topic name with no date. With no such skill, drop the
line: the task is the handle. A learning-task pick names that task
instead, and a `/tutor`-style skill if one is loaded.

Repeating the older unstarted topics is deliberate: step 1 already
derives them, and the close is where they get read. If that list grows
long, the length is the signal: a felt failure earns a reminder, not a
guard.

**Capture block:** invoke the `ymer:capture` skill, source `mint`. The
battery, the drop grammar and the write live in that skill alone. Hand
it, by name, what this run's scoring showed:

- every scorer's note on the drops that were hard to score, as the
  scorer wrote it;
- the ids left unscored, the first ten, as the `Unscored:` line names
  them;
- this session's own answer to "Did the scoring look reasonable, and
  would you have drawn the top drop yourself? If not, name the drop, the
  component that looked wrong, and what it should have been." A top
  drop passed over is always a "no", with its reason.

## Remember

- The node first: where it is not reached, capture's door is the whole
  answer and nothing else in this skill is read
- Mint draws exactly one thing per run, and every exit deposits a
  durable artifact: mint applies no diff itself and discards nothing
- Every run scores what is new, then draws the highest-scored drop an
  exit can take: bugs lead by their weight, and passing the top drop
  over takes a written reason. The product's Forward direction forms
  the pick, its neighbours and its shape, and never ranks it
- A score's components are written once and the score is computed at
  the draw: the weights in the ranking query's `VALUES` list
  (`mechanics.md` § The run), the rubric in `scorer.md`, each its one
  home
- The coordinator is ymer where this session reaches it, else the
  node's `tasks`, resolved once and asked never. The state folder is
  required, and the operations contract's reading of its kind decides
  whether the run commits or the files are the record
- Every failure past the node names `/ymer:setup`, a front `fronts` does
  not list included; a coordinator that is simply absent stops nothing
- The task mint creates is the topic, created at `doing` where its work
  starts: its description points at the artifact and never copies it
- Cluster by root cause, never by symptom; vision drops cluster per
  product and never ride the friction-batch
- The area picks the Roadmap: `meta` to `Meta Roadmap`, anything else to
  that product's, with `Meta Roadmap` excluded from the candidates. In
  ymer a missing Roadmap halts the run and says what to create; in the
  node the Roadmap is a derived label and nothing can be missing
- Every run opens with a notebook backup, and the drain is one `UPDATE`
  by id to `drained`: drops are never deleted
- The pool itself lives in no git tree; only the topic's folder is
  recorded in the state folder's history
