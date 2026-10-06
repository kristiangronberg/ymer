# ymer

The directed way of working, as skills you invoke. A topic starts as an
idea or as a drop drawn from the pool and ends shipped, and each phase is
one skill you run when you reach its moment — nothing runs on your
behalf, and nothing is inferred from where you are. This is the
marketplace's core plugin: the practice every user runs, with the
capture and mint loop that feeds it and the setup that checks what it
works from.

## The phases, in order

| Skill | What it is for |
|---|---|
| `/ymer:brainstorm` | explore an idea into a chosen direction, and record what was discarded and why |
| `/ymer:scout` | survey the ground the topic touches, before anyone decides what to build |
| `/ymer:define` | sharpen what the topic means — the decisions, the domain rules, the words |
| `/ymer:write-plan` | turn the settled meaning into a plan someone with no context can execute |
| `/ymer:plan-review` | attack the plan before it is implemented, and rewrite it with the fixes in |
| `/ymer:implement` | execute the plan task by task, verifying as you go |
| `/ymer:review` | inspect what was actually built, then ship it, iterate, or wait |

You do not have to run all seven. The **development-process** skill is
the map: it says when the pipeline applies, where to enter it, what each
phase leaves behind, and which rule lives where. It has no slash command
of its own — it is reference the session loads when it needs to route
work, and any phase skill points at it.

## The supporting moves

`/ymer:sweep` builds any find-every-site list so it is honest.
`/ymer:code-review` attacks a diff. `/ymer:tutor` runs the learning track;
its knowledge docs are ymer docs, so tutor needs a ymer connection.
`/ymer:end-session` closes a session deliberately. **product-design** —
like development-process, reference rather than a command — shapes a
surface someone will operate, and loads itself when a session designs
one.

## Capture and mint

Work material collects in one store, **the pool**, as **drops**, and
nothing becomes a task ahead of time. Two skills run the loop, and it is
small on purpose.

- **`/ymer:capture`** writes down what the work observed — a bug, a
  learning gap, where a product is heading, an idea left undone — one
  drop each, and at the tail of a piece of work it also asks six
  questions about what just happened and keeps the single highest-value
  friction, 5-Whys'd to a root cause. It analyses nothing beyond that.
  Seconds, not minutes.
- **`/ymer:mint`** runs when you want the next piece of work, in a fresh
  session. It scores every drop not yet scored, ranks the pool, takes
  the top drop, reads that product's Forward direction to fold in the
  drops that belong with it, and starts **exactly one thing**: a topic
  plus its task in the product's roadmap, a batch of small fixes, or a
  learning task.

Everything else follows from one claim: **a task belongs where work
starts.** Something you write down and leave alone accumulates evidence
— how often it bites, what it costs, whether the cause is understood
yet. Something you turn into a task immediately is a guess. So the pool
is one store, nothing moves between containers, and nothing is ranked
between runs: priority binds at the moment a drop is drawn, which is the
moment the picture is most accurate.

The pool is the `pool` table in your Ymer Node's notebook, one row per
drop, where a drained drop stays with its status changed; its `kinds`
table holds the rule for each kind of drop. A tail that found no
friction still records an empty drop, so the table is also the record of
which sessions reflected at all. Your state folder holds a folder per
drawn topic. Where it is a git work tree, mint commits what it writes
there; any other folder's history is the node's `topics_history` table,
where mint saves each file it writes as a row.

Every phase already closes with a **capture block** that invokes
`ymer:capture`, and the phases capture the future work they notice
instead of creating tasks for it. Your own skills can do the same: put a
capture block at their tail, three lines pointing at `ymer:capture`, and
every one of them becomes a sensor. The capture skill carries the exact
wording; a block never copies the battery or the drop grammar.

What the loop deliberately does not do:

- **It does not fix anything.** Mint writes an intake and creates a
  task; the work is ordinary work you do afterwards.
- **It does not re-score.** Each new drop is scored once, by a cheap
  model on four components, and mint computes the score from them when
  it draws — so retuning a weight re-ranks the pool without touching a
  row. Bugs lead by their weight, not by a rule, and passing the top drop
  over takes a written reason. One thing per run.
- **It does not grow a second store.** No archive, no clusters file, no
  staging area. A drop leaves the open pool only by being drained — its
  status changes and the row stays — and the count of open drops is the
  gauge: when it feels long, that is the signal to run a mint.

## Setup

**`/ymer:setup`** checks five things in order — your Ymer Node answers
and carries the store skeletons, this installation's front is named and
registered in the node, your state folder is named and there
(and which history tracks it: git where it is a git work tree, the
node's `topics_history` otherwise), ymer answers, and a `Meta Roadmap`
project exists — creating whatever is missing and reporting each one
with a fix you can follow. The node, the front and the state folder are
required; ymer and its `Meta Roadmap` are optional, and those checks
report which store is in use instead. These are the floors every
plugin shares; a plugin that needs more carries a setup skill of its own
for it.

Run it once after installing, in a fresh session — a plugin's skills load
at session start. After that, run it whenever a skill sends you here: a
skill stops on an environment failure and names the door that fixes it
rather than repairing anything itself.

It is **convergent**: verify, create what is missing, never touch what
already exists. So it is also the upgrade path — when the standard moves,
re-running `/ymer:setup` brings an old install up to it for everything
setup owns, with no migration to write and no version to track. Three
texts it writes once and then leaves alone, because from then on they
are yours: each table's description in your node, the rule of each kind
of drop, and your `Meta Roadmap` project's description. A release
describes how things work now; after upgrading, run `/ymer:setup`. Setup
holds no state of its own, so once it passes it is safe to ignore. Your
ymer.ax connection is the exception to what it writes, because it is not
setup's to write: setup checks it and, when it is missing, tells you the
two commands that bring it.

## The way of working it directs

The plugin is opinionated, because routing without configuration needs
conventions to route by:

- **One product = one Roadmap.** With ymer that is a project named
  `<Product> Roadmap`; the skills find it by that name, and if no such
  project exists they stop and tell you to create one rather than
  inventing somewhere to put your work — `Meta Roadmap` matches that
  name shape too, and is never a candidate for a product's pick. Without
  ymer it is the `project` value a row in the node's `tasks` table
  carries, derived from the area, so there is nothing to find and nothing
  to create.
- **Work about how you work goes to `Meta Roadmap`** — one home for
  the process itself, which belongs to no product. `/ymer:setup` creates
  the project where there is ymer, so it is a floor rather than a naming
  decision, and a process-level pick never has to hunt for a home.
- **A topic is laid out `<area>/YYYY/MM-DD-<topic>/`** — one topic per
  folder in your state folder. `<area>` is the repo or product it
  belongs to, and **`meta` is reserved** for work about how you work — it
  is the area that routes to `Meta Roadmap`.
- **`Learning`** is optional practice: learning drops are drawn there as
  their own tasks, one per subject gap. With ymer that is a project of that
  name, and without one they become ordinary tasks in the product's
  Roadmap; in the node it is simply the `project` value `Learning`.

If you already work some other way, the conventions are the part to read
first — they are what the skills assume.

## What it needs

A **Ymer Node** — the skills keep their stores in its notebook, and
`/ymer:setup` creates what is missing. A **front** — a name for this
installation, named once: every drop is filed under it, and a mint
draws only its own. A **state folder** — any folder,
named once: a topic's artifacts are files under it, and their history is
git where the folder is a git work tree and the node's `topics_history`
otherwise. A **ymer.ax account** is optional, and the default where a
session reaches it: with ymer, work is tracked in Roadmap projects;
without it, in the node's `tasks` table.

Two reference files travel with the plugin and are read on demand:
`glossary.md`, the one home for the words these skills use, and
`operations-contract.md`, which fixes what each roadmap operation must
achieve and how it binds per coordinator, and states the product page's
skeleton.

## Where it stops

A skill names the door and repairs nothing. Where the node, the front or
the state folder is missing, the door is `/ymer:setup`. Where a store is present
but broken, the run stops rather than quietly using another one — that
would fork your work across two stores without saying so.

These skills assume a development environment: a checkout you can read
and write, git answering, and a shell for the project's gates. Splitting
the substrate-free half out, so the general practice runs wherever the
node is reached, is the next change to this plugin.
