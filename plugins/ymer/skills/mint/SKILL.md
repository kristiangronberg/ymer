---
name: mint
description: Draws the next piece of work from the Ymer Node's pool: scores the new drops, ranks the pool, takes the top drop with the drops that belong with it, and turns them into exactly one thing, a topic and its task in the product's area, the friction-batch, or a learning task. Use when it is time to pick what to work on next from what earlier work captured.
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
The scorer is an agent this plugin ships, in its agent definition
`agents/scorer.md` (term: the plugin glossary; → Scoring).

**Announce at start:** "Mint — drawing from the pool."

Mint reads four things before it draws, in this order, and stops at the
first that fails: the node, the front, the state folder, the
coordinator. The order is the point: each one is read only once the one
before it holds.

## Contents

- First, the node
- The front, the state folder and the coordinator
- The way of working mint draws into
- Nothing to draw
- The run
- Scoring
- Clustering
- The pick rule
- Three exits, all artifact-depositing
- `request.md`'s shape
- The close

## First, the node

The pool is the `pool` table in the notebook of the user's own Ymer
Node, reached through the node's `notebook` tool. Before reading
anything further in this skill, check that this session has that tool
and that the node answers. One `notebook` `query` shows both, and which
of the tables this skill needs the notebook holds:
`SELECT name FROM sqlite_master WHERE type = 'table' AND name IN
('pool', 'kinds', 'fronts', 'pool_scores', 'tasks', 'tasks_log')`. A
name that does not come back is a table the notebook lacks.

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

**Its kind** decides what keeps the history of what this run writes.
**Read the operations contract's § The topic's artifacts now**, unless
already read this session, before the guard reads the folder:
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`, which gives the reading
and every outcome; run it the way setup runs it. Where the reading
gives git, the run commits what it wrote.
Where it gives the files as the record, the run writes each file and
commits nothing. Where it refuses the folder, the run stops naming
`/ymer:setup`.

**The coordinator** tracks the work and names the topics. Ymer's tool
surface among this session's tools means ymer: its product areas take
the pick, and every task this run creates is a ymer task. Without
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
write a topic anywhere else: a run with no state folder draws nothing,
and its drops stay open for the run after setup passes.

## The way of working mint draws into

Mint deposits into the directed way of working, and routes by its name
conventions rather than by configuration:

- **One product, one product area.** In ymer it is an area whose
  description carries a `Repos:` line naming the state-folder subtrees
  the product owns: its `doing` topic tasks are the work in flight, and
  its task context fields hold the product's direction (term: the
  plugin glossary). In the node's `tasks` table nothing names a product:
  a row carries its subtree in `area`, so there is nothing to find and
  nothing to create.
- **Work about how you work belongs to no product**, so it goes to the
  **Meta** area, the one area every machine with ymer has: created by
  `/ymer:setup`. In the node it is the `area` value `meta`.
- **One place for a topic's artifacts**: one folder per topic in the
  state folder, laid out `<repo>/YYYY/MM-DD-<topic>/`. `<repo>` is the
  repo the topic belongs to, named by the drawn drops' own context.
  **`meta` is the one reserved subtree that is no repo**, for process
  work, and it routes to the Meta area.
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
statement (most of it in § The run and § Scoring), except step 4's draw,
whose SQL is the operations contract's (§ The pool on the node): the
tool and the action are the node's, and the SQL is this plugin's own,
over its own tables. The node runs one statement per `execute` call and
drops the rest of a multi-statement call without a word, so each
statement is a call of its own. A result too large to come back whole, a
notebook read or an `areas get`, is read whole from wherever the
harness kept it, never from a preview of it.

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
put a drop there: no draw, no commit, no task. Both states are
ordinary, a drained pool and an accumulation of drops nothing ever
draws.

## The run

*Read with this section: `mechanics.md` § The run (the mechanics) and `cases.md` § The run (the cases).*

1. **Back up, score, then survey.** Take a notebook backup first
   (`notebook` `create`) and note its id: the draw in step 4 changes
   drops that no commit records. The backup is the whole-notebook safety
   net for the run, not the draw's undo, because `restore` also discards
   every drop any session inserted after it. A wrong draw is undone by
   *return drops* instead (binding: the operations contract), which
   touches nothing else.

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
   with its drops, the sharpest signal (term: the plugin glossary), and
   the vision drops per product. Then the
   ranking, highest score first, twenty-five per page, read until the
   walk ends (→ The pick rule), never the whole list. Frequency
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
   pick gathers its frictions below the bar from the ranking pages
   already read and from the open frictions scored small. Moot drops
   reach the friction-batch only through the walk (→ The pick rule), so
   a friction whose scorer `why` says its cause looks gone stays out of
   the set until the walk reaches it.

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
   exit can take, unless a written reason passes it over. Where it is a
   moot bug, idea or friction, the walk goes on collecting more of them
   below it (→ The pick rule).

3. **Form the pick, then create or append its artifact.** Read the
   product's **Forward direction** once: the first settled section of
   its product area's `vision`, and the Meta area's for a `meta` pick,
   from the reads § Scoring's step 2 already made (the reads and the
   miss rule: the product-design skill § The product area). Where those
   reads failed or came back cut short, the run stops here, naming the
   failed read and creating nothing: an unread product area is never
   read as one with no direction or no `Repos:` line. It decides
   two things and nothing else: which neighbouring open drops belong
   with the top one, and the shape the topic takes, the scope that moves
   the product the way its direction says. Ranking is not its job, and a
   product with no product area, or an area with an empty Forward
   direction, forms the pick from the drops alone. Then create or append
   the artifact: a topic, the friction-batch, or a learning task
   (→ Three exits).

   A topic's artifact, the friction-batch's included, is its
   `request.md`, which this run writes or appends at
   `<state folder>/<repo>/YYYY/MM-DD-<topic>/request.md` with this
   session's own file tools, whichever history keeps the folder
   (→ `request.md`'s shape). Where git keeps it, step 5 commits that
   file; otherwise the file is the save.

4. **Draw the drops the pick took** (*draw drops*, binding: the
   operations contract), every one of them. **Read the operations
   contract's § The pool and § The pool on the node now**, unless
   already read this session:
   `${CLAUDE_PLUGIN_ROOT}/operations-contract.md`, for the operation,
   the read before it and the `affected_rows` read-back with what a
   difference means, the families the operation adds, the kind list and
   what it lets a draw take, the related read, the exact form, and its
   SQL on the node. A draw into a friction-batch, a fold into an
   unstarted one included, goes through the exact form:
   it names every drop the pick took, the moot drops with the cluster
   members their evidence covers and the frictions below the bar, and
   nothing widens, so a face the pick did not choose stays open. Every
   other pick goes through the family form, naming the drops the pick
   chose, this front's: the top drop, the vision cluster step 1
   gathered, and the neighbours step 3 folded in. Its kind list is its
   exit's:

   - its own topic: `bug, idea, friction`;
   - a carve topic: `vision`;
   - a learning task, the fold into exit 1 where there is no `Learning`
     project included: `learning`.

   The operation adds the families each one sits in, of the listed
   kinds, so the draw takes the cluster, never the anchor's alone. The
   family read can find drops the artifact does not quote yet: append a
   drop line for each before step 5, so the artifact quotes every drop
   the draw moved, then one `Related, not drawn:` line for the drops the
   related read found, where it found any. In `request.md` the appends
   go through the file as every append goes (→ `request.md`'s shape); at
   the learning exit they go to the learning task's description, keeping
   what is there (the statement: `cases.md` § Three exits, all
   artifact-depositing).
   The draw names where the drops went: the topic's folder
   as `<repo>/YYYY/MM-DD-<topic>/`, the friction-batch's included, or
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
   draw is already durable in the table.

6. **Close with the runnable reminder** (→ The close).

## Scoring

*Read with this section: `mechanics.md` § Scoring (the mechanics) and `cases.md` § Scoring (the cases).*

A drop's **score** ranks it: its kind's weight times the sum of three
components, direction value, time criticality and risk reduction,
divided by a fourth, size. Each component is 1, 3 or 5, written once
into the drop's `pool_scores` row by a **scorer**: the agent
`ymer:scorer`, on the cheapest model the harness offers, whose whole
world is its prompt. Its **agent definition** (term: the plugin
glossary) is `agents/scorer.md` in this plugin. The score itself is
computed by the ranking query at every run and never stored. A row is
never revised: a changed rubric, or a product's changed next steps,
applies to drops scored after the change, and older rows keep the
numbers they were given.

The kind weights have one home, the ranking query's `VALUES` list in
`mechanics.md` § The run; a kind it does not name, one a front added,
weighs 1.
The rubric, what every 1, 3 and 5 means, has one home too: the
scorer's prompt, in [its agent definition](../../agents/scorer.md). A
retune is an edit in that home, and the next run ranks with it without
rewriting a row. Bugs lead because of their weight, not because of a
rule above the formula.

**What the agent definition guards, and what it does not.** A scorer
reads text other sessions wrote, so its tools list names the node's
`notebook` tool and nothing else: no shell, no files, no web. The
harness still adds tools of its own to an agent it starts, so the list
fixes what is listed, never all a scorer can call. Inside the notebook
nothing is narrowed: `execute` runs any statement, and `restore` rolls
the whole notebook back. A scorer's writes are bounded by its prompt, by
step 4's read-back of the rows and by the backup step 1 of the run took,
and by nothing more. The list names the node by the server name
`ymer-desktop`, the name the node's `claude mcp add` line gives it (the
README, § Installing, and `/ymer:setup` check 1): under another name
the list resolves to no tool, the harness refuses to start the scorer,
and the fallback below scores instead.

Invoking this skill is the request to dispatch scorers: a standing
instruction to use subagents only when the user asks for them is met by
the invocation itself.

1. **The unscored drops.** First read every pool id that holds no
   `pool_scores` row, whatever its front, status or kind, and count the
   `pool_scores` rows: the read-back compares what the scorers left
   against both, and taking them before this front's list is what puts
   every drop of this front they hold in some list. Then list this
   front's unscored drops, their ids only, so that this session reads
   none of their text. None listed, and nothing is dispatched this run,
   but step 2 still runs: the pick's Forward direction and its routing
   read the product areas from it.
2. **The next steps.** Where the node is the coordinator there are no
   product areas (the product-design skill § The product area): the
   block says there are no next steps, it has been read, and scoring
   goes on. Where ymer is, every product area's `## Next steps` section
   of its `vision`, one block per product, from the coordinator's
   listing of areas and a read of every area it lists. Only those calls
   can leave the block unread: where the listing or any read fails or
   comes back cut short, nothing is scored this run, because scores are
   written once and an unread product must never be read as one with no
   next steps. In that case go straight to the read-back, which ranks
   the rows already written, and no id gets the in-session try
   (→ `cases.md` § Scoring).
3. **Dispatch.** Split this front's list from step 1 into lists and
   dispatch `ymer:scorer` once per list, handing it the next-steps block
   and the list and nothing else: its prompt, its tools and its model
   come from its agent definition. Name no model in the dispatch, since
   a model named there outranks the definition's. Run a bounded few at a
   time (the reads and how step 4 compares them, the list size and the
   bound: `mechanics.md` § Scoring). Wait for every scorer's answer
   before anything is ranked.
4. **Read back.** Where scorers ran, check the rows they wrote against
   their lists: read the unscored ids and the count again. An id that
   gained a row and sat in no list is a **stray**. A count below the
   first count plus the ids that gained a row means rows were deleted; a
   count above it means rows on drops captured during the run, which
   the first read never held, written by another front's mint or by a
   scorer outside its list. Name each stray, each deletion and that
   excess, hand them to capture, and go on. Every open unscored drop of
   this front that the first read held sat in some list, so a stray
   cannot move this run's ranking; a row on a drop captured during the
   run can, which is why the excess is named. Never restore the backup
   over a stray and never delete one (→ `cases.md` § Scoring). The count
   shows only the net: a deletion and an excess row cancel, and an
   `UPDATE` to a row already there stays unseen. Then list this front's
   unscored drops again. An id still listed gets one more try, scored
   in this session, unless step 2's block or the agent definition could
   not be read: then no id is tried. An id unscored after that is left out of the
   ranking until a later run, never ranked on a guess, and the ids left
   out are named before the draw. Where the ranking holds no drop at all
   while open drops wait unscored, stop and draw nothing: a judgement
   pick over unscored drops is never the way around an empty ranking.
   Keep the last part of each scorer's answer, every drop it names with
   its reason: the close's `Hard to score:` line carries them all as the
   scorers gave them, and hands capture only a new defect in scoring
   that one of them names (→ The close).

**Fallback: score in this session.** Where no scorer starts, whatever
the cause the harness gives (the Agent tool absent, a refusal at the
permission layer, a refusal to start an agent whose tools list resolved
to nothing, `Agent type 'ymer:scorer' not found` on a harness that loads
no agent definitions, or any other), this session reads the agent
definition, `${CLAUDE_PLUGIN_ROOT}/agents/scorer.md`, and follows its
prompt as a scorer would, within the bounds in `mechanics.md`
§ Scoring. The close quotes the cause as the harness wrote it. The rows
are the same rows, so the ranking stays one formula on every front.
Where this session cannot read the agent definition either, nothing is
scored this run, as with a next-steps block that could not be read: go
to the read-back, which ranks the rows already written, and the close
quotes both causes.

## Clustering

A **cluster** is a named root cause plus the drops whose 5-Whys
terminates at it. Cluster by root cause, never by symptom and never by
affected area: the drop-records-the-cause rule, extended to the group.
A bug's cluster is the thing that is broken and every drop that saw it
break.

**Vision drops cluster per product instead.** They carry no root cause
to terminate at, and one product's direction is what their draw
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

**A moot drop is handled at the head.** A **moot drop** is a drop whose
cause is gone or was handled elsewhere, re-verified by mint with its
evidence. It costs mint nothing until it reaches the head of the
ranking, so the walk is where it is found, and no run goes looking for
one further down. Where the drop the walk lands on reads as likely
moot, from its own text or from the scorer's `why` beside it on the
ranking page, re-verify it before drawing it: name what closed it, a
shipped topic or a fact, and the read or command that shows it, with
what that showed. A cause you could not find is not a gone cause: such
a drop is not moot, and the walk takes it as the drop it is. A
re-verified moot bug, idea or friction is the top drop, and the
friction-batch takes it (→ Three exits). The walk then goes on down the
ranking, re-verifying as above each drop it lands on that reads as
likely moot, and collects every moot bug, idea and friction it meets,
each with the bugs, ideas and frictions of its same-cause cluster that
its evidence covers, up to the first drop an exit can take
that is not a moot bug, idea or friction. That drop ends the walk and
waits one run: this run's one draw is the friction-batch. A friction
below the bar that ends it does not wait, since that friction-batch is
its own exit: it rides the set like any friction scored small. A drop
the walk passes by is passed by still, and the walk goes on past it.
Once the walk is collecting, a drop anchored to an unstarted topic is
no fold: a moot one is collected like any other, its anchor beside the
point once its cause is gone, and one that is not moot ends the walk. A
vision or learning drop whose cause is gone is moot too, but the walk
does not collect it: it keeps its own exit (→ Three exits), and the
walk stops at it as at any drop an exit can take that is not a moot
bug, idea or friction.

**Passing the top drop over takes a written reason.** The score is the
default, never a cage: draw something else when reading the top drop
shows the ranking is wrong about it, weighing what the score cannot see
(→ `cases.md` § The pick rule).
Write the reason into the pick's `request.md`, one line per drop passed
over (→ `request.md`'s shape), and give it on the close's `Check:` line.

**A drop anchored to a topic that already exists** follows one of two
rules:

- **Topic created but nobody has started it**: fold the drop into its
  `request.md` and draw it there. It is the same append the
  friction-batch uses; it costs nothing because nobody has read the
  file yet, and the intake gets strictly better.
- **Anything else**: leave the drop out of that topic. If the topic
  shipped and what it observed is gone, the drop is a moot drop, handled
  at the head like any other (→ above). If it shipped and the
  observation persists, a shipped change did not solve what it claimed,
  and it earns its own topic; it is **a sharpest-signal drop whose topic
  has shipped** only where it is a sharpest-signal drop (term: the plugin
  glossary).

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
created at `doing` in the product area its `<repo>` routes to: a task
exists only where work starts, and this one starts now, with its
brainstorm as the next session on it.

The order is route (below), then create the task, then write
`request.md`: the artifact carries the task's id, and a halt at routing
then leaves nothing behind. In ymer the task is created, claimed into
the `doing` group, and read back; in the node it is one row and its
read-back. The read-back must show exactly one task, in the `doing`
group, in the target product area (`mechanics.md` § Three exits, all
artifact-depositing). The task's description **points at the artifact, never
copies it**: `request.md` already carries the root cause and the drops
verbatim, and a copy would be the second store this whole arrangement
exists to remove.

**Routing: which product area.** The topic's `<repo>` decides. Where
ymer is the coordinator, read it off the product areas § Scoring's
step 2 read, the same reads step 3's Forward direction came from, so no
second call:

- **`meta` routes to the Meta area**: the friction-batch always, and any
  process-level pick, by the area's reserved name, whether or not its
  `Repos:` line names `meta`. Work about how you work belongs to no
  product, and this is the area that holds it.
- **Every other `<repo>` routes to the product area whose `Repos:` line
  names it**, and **the Meta area is never a candidate there**. One such
  area is the target. Several are resolved by the pick's own content,
  which names the product it is about. Ask only on genuine ambiguity,
  and never route a product pick to `meta` by default.

**No match halts the run** in ymer, saying what to do: add the `<repo>`
to a product area's `Repos:` line or create the product area, or run
`/ymer:setup`, which creates the Meta area. Where the node is the
coordinator there is nothing to halt on: a row's `area` is the `<repo>`
itself.

**Before creating, one look**: step 1 already listed the unstarted
topics in every store this session reaches. If one of them is this same
thing and of the pick's own kind, a carve topic for a carve pick and an
ordinary topic for any other, so its kind list stays one, append the new
drops to that topic's `request.md` instead of creating a second task for
it, through the file and counting the heading first (→ `request.md`'s
shape).

**2. The friction-batch** is the `meta` batch topic mint opens for
small frictions to fix and moot bugs, ideas and frictions to confirm.
Mint chooses it when the pick is several small frictions rather than
one cause worth a topic, or when the walk has collected moot drops
(→ The pick rule): the topic `YYYY-MM-DD-friction-batch`, always under
the subtree `meta`, so it always routes to the Meta area. That holds
whatever product a moot drop is about: the friction-batch's fixes edit
your own process prose or config, and confirming a moot drop reads a
product's code without editing it. It takes exactly two kinds of drop:

- **Below the bar but actionable**: a friction whose change is
  derivable from the drop itself plus a locating search, with no design
  choices left, and whose edit surface is your process prose or config,
  never a project's code.
- **Moot, or judged not worth doing**: a moot drop the walk collected
  (→ The pick rule), or a friction from the friction-batch's set judged
  not worth doing. Never draw such a drop silently: the work that
  follows gets the final say on whether it is done, including that it
  is not.

**The work that follows rules on each moot drop**, and records each
ruling in its own `brainstorm.md`, in a section of pool dispositions,
never in `request.md`, which no later session rewrites (the operations
contract, § The topic's artifacts):

- **Confirmed moot**: it stays drained, as mint left it.
- **Not moot, and a friction below the bar**: it is fixed in the
  friction-batch, like the drops under the first heading.
- **Anything else not moot**: it stays drained, and that session
  captures a recurrence anchored to it, carrying the evidence that its
  cause persists, which a later run draws as its own topic.

A friction judged not worth doing gets the same say, recorded with the
others: the session fixes it as a friction below the bar where it finds
it worth doing after all, and otherwise it stays drained.

**Only frictions go below the bar, and vision drops never ride the
friction-batch.** A product's direction is not the friction-batch's
edit surface. A product's vision drops are drawn as exit 1, into a
**carve topic** in that product's area, its `request.md` naming the
product and carrying the drops verbatim. A carve topic is the topic
that gathers a product's vision drops, however it was opened, and whose
work writes them into its product area's settled sections; it is the
one door through which vision material reaches a product area. A vision
drop whose content the area already carries goes there too, with its
product's vision cluster, and a learning drop whose gap is closed goes
to its learning task (exit 3), which its engagement, never mint, closes
as moot (`closed` = demonstrated or moot: the operations contract,
§ Binding per coordinator).

"The product has a product area" reads per coordinator, like every
other route. In ymer an area must match the vision drop's `product` by
name, whatever its case, and a vision drop for a product with none
waits, as capture says. In the node it always holds, since nothing
routes on a product there, so a vision cluster there is drawn like any
other pick, and writing the settled sections themselves happens in the
product area once the topic is promoted.

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
creates a task, draws the drops to that task, and closes. The task's
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
exit 1: create it in the product area its `<repo>` routes to, as an
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
not the top one; then the drops, and after them one `Related, not
drawn:` line where the draw left drops of their families open, by id
and kind (the operations contract, § The lines). A friction-batch,
drawn in the exact form, carries none, and sorts its drops under
two headings, below the bar and moot, which carry mint's judgement into
the topic as real input for whoever works it. Under the moot heading
the drops are grouped by cause, one group for each thing that closed
them, stamped once with the check that showed it, so the work that
follows confirms a cause once rather than a drop at a time. A friction
judged not worth doing goes in one group of its own after them, each
with its reason and no stamp: a judgement is not a fact a check shows.

A topic whose `request.md` is already there is one to append to, never
to write again: the before-creating look is what finds it. An append
goes through the file and adds to it, leaving everything already there
as it is. It never writes blind: before inserting under a heading that
has another heading after it, count that heading in the file, and write
only on a count of 1; any other count stops the write, since the file
quotes real sessions and a quoted heading would take the drops into the
middle of a drop while the write reported success. Under the last
heading there is nothing to count before, but the heading the append
names must still be there (→ `cases.md` § `request.md`'s shape, for
that check and for where a new group goes). A
fresh `request.md` is written only after this session's own file tools
show no file at that path (`mechanics.md` § `request.md`'s shape).

## The close

*Read with this section: `cases.md` § The close (the cases).*

```
Picked: <name> — <one line: what doing it removes or builds>
Topic:  <repo>/YYYY/MM-DD-<name>/ (state folder, history in <git | the files alone>)
Task:   <task name> (doing, <product area> in <ymer | node `tasks`>)
Moot:   <n> moot drops collected, under <c> causes
Scored: <n> new drops (<n> scorers | in this session: <cause> | next steps unreadable | definition unreadable: <cause>; <cause>)
Strays: <n> rows on ids no list held (ids <the first ten>), <d> rows deleted, <e> rows on drops captured during the run
Unscored: <m> left out of the ranking (ids <the first ten>)
Hard to score: <ids> — <why>; <ids> — <why> (new defect → capture)
Check:  yes | no — #<id>: <component> was <n>, should be <m> | no — passed over #<id>: <reason>
Next:   /brainstorm <name>

Still unstarted from earlier mints:
  <other-name>   (<repo>/YYYY/MM-DD-<other-name>/)
```

Five of those lines are conditional. `Moot:` is written only where the
walk collected moot drops. `Strays:` is written only where the
read-back found a stray, a deletion or an excess row. `Unscored:` is
written only where drops stayed unscored. `Hard to score:` is written
wherever a scorer's answer named a drop, and it carries every drop a
scorer named, whatever this session makes of the reason: this session
sorts the entries for capture, never off the line. An entry naming a
new defect in scoring says so (→ the capture block). `Scored:` also
reads `0 new drops`, and takes a trailing `areas without next steps:
<names>` wherever a product area's `vision` had no `## Next steps`
heading, which is how an area that lost it is seen (the full values:
`cases.md` § The close).
`Check:` is always written: this session's own answer to "Did the
scoring look reasonable, and would you have drawn the top drop
yourself?" A top drop passed over is always a `no`, with its reason. A
run that stopped on an empty ranking picks nothing and closes with
`Scored:`, `Strays:` where it applies, `Unscored:`, `Hard to score:`
where it applies, `Check:` and the reason alone; with no top drop
there, its `Check:` judges the scoring alone.

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

**Capture block:** invoke the `ymer:capture` skill, source `mint`, on
every run that reaches this close, whatever its scoring showed: the
battery, the drop grammar and the write live in that skill alone, and
its battery runs at every tail. Hand it, by name, what this run's
scoring showed:

- every stray and every deletion the read-back named, with its ids,
  and the count of rows on drops captured during the run;
- the ids left unscored, the first ten, as the `Unscored:` line names
  them;
- each new defect in scoring that a `Hard to score:` entry or a
  `Check: no` names, as one drop however many entries name it.

Of the scorers' notes and this session's `Check:`, only a defect in
scoring is handed over, and the rest are read in the report alone: a
note filed as it was written asks for nothing, and comes back every run.

- **A defect in scoring** is a fault in what scoring runs on: the rubric,
  the scorer's prompt, or this skill's scoring steps. A note or a
  `Check: no` that names one is handed over when it is new (below).
- **Not a defect in scoring**, and never handed over:
  - a note about what a scored drop says;
  - a note about the pool's state, such as a near-duplicate or a cause
    already gone;
  - a note about a product area with no next steps;
  - a pass-over;
  - a `Check: no` whose wrong component this session cannot trace to
    such a fault;
  - a `yes`.

Before the report is written, settle whether each defect is new, so its
entry can say so. The neighbour search over the defect's own terms
(`mechanics.md` § The run, step 1's neighbours) finds open drops alone,
so read the drops this run drained as well:

- If an open drop on this front, or a drop this run drew, carries it,
  the defect is known: it stays in the report and is not handed over.
- Otherwise it is new, even where a drop drained before this run, or
  another front's drop, carries it.

The drop handed over is about the defect:

- its title names what fails, in plain words;
- its body carries the notes as evidence, with the scored drops' ids;
- it is never worded as a scorer's note or a scoring check, since
  capture's recurrence check matches it by its terms and sets its anchor
  as for any drop.
