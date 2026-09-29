# ymer

The directed way of working, as skills you invoke. A topic starts as an
idea or an inbox item and ends shipped, and each phase is one skill you
run when you reach its moment — nothing runs on your behalf, and nothing
is inferred from where you are. This is the marketplace's core plugin:
the practice every user runs, with the improvement loop that keeps it
honest and the setup that checks what it works from.

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

`/ymer:mint` files a finding into a pool so the next person can act on it.
`/ymer:sweep` builds any find-every-site list so it is honest.
`/ymer:code-review` attacks a diff. `/ymer:tutor` runs the learning track;
its knowledge docs are ymer docs, so tutor needs a ymer connection.
`/ymer:end-session` closes a session deliberately. **product-design** —
like development-process, reference rather than a command — shapes a
surface someone will operate, and loads itself when a session designs
one.

## Kaizen

Two skills turn the friction you feel while working into improvement
work you actually do. The loop is small on purpose.

- **`/ymer:kaizen-capture`** runs at the tail of a piece of work. It asks
  six questions about what just happened, keeps the single highest-value
  answer, 5-Whys it to a root cause, and records **one row** in your
  backlog. Seconds, not minutes.
- **`/ymer:kaizen-summary`** runs occasionally, in a fresh session. It
  surveys the whole backlog and drains **exactly one thing** out of it
  into durable work: a topic plus a task in the product's roadmap, a
  batch of small fixes, or a learning task.

Everything else follows from one claim: **queueing a friction is what
makes it recur.** A friction you write down and leave alone accumulates
evidence — how often it bites, what it costs, whether the cause is
understood yet. A friction you act on immediately is a guess. So kaizen
keeps one store, moves nothing between containers, and keeps no ranking
between runs: priority binds at the moment work is taken, which is the
moment the picture is most accurate.

The backlog is the `frictions` table in your Ymer Node's notebook, one
row per friction, where a drained row stays with its status changed. The
table is the record of which sessions reflected at all, which is why even
a session that found nothing records a row. Your state folder holds a
folder per drained topic. Where it is a git work tree, summary commits
what it writes there; any other folder's history is the node's
`topics_history` table, where summary saves each file it writes as a
row.

Every phase already closes with a **kaizen block** that invokes
`ymer:kaizen-capture`. Your own skills can do the same: put a kaizen
block at their tail, three lines pointing at `ymer:kaizen-capture`, and
every one of them becomes a sensor. The capture skill carries the exact
wording; a block never copies the battery or the row grammar.

What kaizen deliberately does not do:

- **It does not fix anything.** Summary writes an intake and mints a
  task; the fixing is ordinary work you do afterwards.
- **It does not rank.** No scores, no counts, no tiebreak ladder. One
  thing per run, chosen by reading.
- **It does not grow a second store.** No archive, no clusters file, no
  staging area. A row leaves the backlog only by being drained — its
  status changes and the row stays — and the count of open rows is the
  debt gauge: when it feels long, that is the signal to run a summary.

## Setup

**`/ymer:setup`** checks four things in order — your Ymer Node answers
and carries the store skeletons, your state folder is named and there
(and which history tracks it: git where it is a git work tree, the
node's `topics_history` otherwise), ymer answers, and a `Meta Roadmap`
project exists — creating whatever is missing and reporting each one
with a fix you can follow. The node and the state folder are required;
ymer and its `Meta Roadmap` are optional, and those checks report which
store is in use instead. These are the floors every
plugin shares; a plugin that needs more carries a setup skill of its own
for it.

Run it once after installing, in a fresh session — a plugin's skills load
at session start. After that, run it whenever a skill sends you here: a
skill stops on an environment failure and names the door that fixes it
rather than repairing anything itself.

It is **convergent**: verify, create what is missing, never touch what
already exists. So it is also the upgrade path — when the standard moves,
re-running `/ymer:setup` brings an old install up to it for everything
setup owns, with no migration to write and no version to track. Two
texts it writes once and then leaves alone, because from then on they
are yours: each table's description in your node, and your
`Meta Roadmap` project's description. When a release changes what one
of them says, that release says how to bring yours along by hand. Setup
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
- **`Learning`** is optional practice: learning gaps drain there as their
  own tasks, one per subject gap. With ymer that is a project of that
  name, and without one they become ordinary tasks in the product's
  Roadmap; in the node it is simply the `project` value `Learning`.

If you already work some other way, the conventions are the part to read
first — they are what the skills assume.

## What it needs

A **Ymer Node** — the skills keep their stores in its notebook, and
`/ymer:setup` creates what is missing. A **state folder** — any folder,
named once: a topic's artifacts are files under it, and their history is
git where the folder is a git work tree and the node's `topics_history`
otherwise. A **ymer.ax account** is optional, and the default where a
session reaches it: with ymer, work is tracked in Roadmap projects;
without it, in the node's `tasks` table.

Two reference files travel with the plugin and are read on demand:
`glossary.md`, the one home for the words these skills use, and
`operations-contract.md`, which fixes what each roadmap and inbox
operation must achieve and how it binds per coordinator.

## Where it stops

A skill names the door and repairs nothing. Where the node or the state
folder is missing, the door is `/ymer:setup`. Where a store is present
but broken, the run stops rather than quietly using another one — that
would fork your work across two stores without saying so.

These skills assume a development environment: a checkout you can read
and write, git answering, and a shell for the project's gates. Splitting
the substrate-free half out, so the general practice runs wherever the
node is reached, is the next change to this plugin.
