# kaizen — continuous improvement over your working process

Kaizen turns the friction you feel while working into improvement work
you actually do. It is a practice of two processes, and the practice
lives where processes live: as rows in the process store of a Ymer
Node's notebook, read through the door on whichever front you work from.
This plugin ships no skill — it is the practice's name and description in
the marketplace, so that what follows has a home to be read from.

The loop is small on purpose.

- **`kaizen_capture`** runs at the tail of a piece of work. It asks six
  questions about what just happened, keeps the single highest-value
  answer, 5-Whys it to a root cause, and records **one row** in your
  backlog. Seconds, not minutes.
- **`kaizen_summary`** runs occasionally, in a fresh session. It surveys
  the whole backlog and drains **exactly one thing** out of it into
  durable work: a topic plus a task in the product's roadmap, a batch of
  small fixes, or a learning task.

Everything else follows from one claim: **queueing a friction is what
makes it recur.** A friction you write down and leave alone accumulates
evidence — how often it bites, what it costs, whether the cause is
understood yet. A friction you act on immediately is a guess. So kaizen
keeps one store, moves nothing between containers, and keeps no ranking
between runs: priority binds at the moment work is taken, which is the
moment the picture is most accurate.

## Where it lives

Both processes are rows in the notebook of the Ymer Node you run, read
whole through their views — `SELECT * FROM v_kaizen_capture WHERE front =
'<your front>'` and the same on `v_kaizen_summary` — and listed by the
`v_router` view. The front is the surface you are working from, one
row of the notebook's `fronts` table; its door — the short text on the
instructions that front receives without asking, its push surface —
names the token to use and the two rules: read `v_router` and the
process for this front and follow it, and end every substantive session
with `kaizen_capture`.

The backlog is the `frictions` table in the same notebook, one row per
friction, where a drained row stays with its status changed. The table's
own description in the notebook carries the row grammar, so a client with
no process to read can still write a row. The table is the record of
which sessions reflected at all, which is why even a session that found
nothing records a row.

## Setup

Kaizen needs a Ymer Node you run, with the process store in its notebook.
The store itself is not yet distributed — nothing here creates it in your
notebook. On the Claude Code front kaizen also needs what every plugin
here needs — a **ymer.ax** account and **one folder for state, under
version control**. The `setup` plugin's `plans_dir` setting names that
folder so `/setup:env` can check it; a summary writes its picks to the
state folder your front's row in the node's `fronts` table names, so
point `plans_dir` at that same folder. You bring both; `setup` is what
checks them.

The install block is in the [marketplace README](../../README.md#installing):
it brings the ymer connection, adds the marketplace, and installs both
plugins. Then, in a fresh session, run `/setup:env`. It checks the state
folder, checks that ymer answers, and reports what it found.

The processes assume that environment rather than re-proving it: on an
environment failure they stop and name the door that fixes it, and they
never guess a path or start a second store.

## The way of working it directs

Kaizen is opinionated, because routing without configuration needs
conventions to route by:

- **One product = one ymer project named `<Product> Roadmap`.** Its
  tasks are what to do next. A summary finds it by that name, and if no
  such project exists it stops and tells you to create one rather than
  inventing somewhere to put your work — `Meta Roadmap` matches that
  name shape too, and is never a candidate for a product's pick.
- **Work about how you work goes to `Meta Roadmap`** — one project for
  the process itself, which belongs to no product. `/setup:env` creates
  it, so it is a floor rather than a naming decision, and a
  process-level pick never has to hunt for a home.
- **Your state folder is laid out `<area>/YYYY/MM-DD-<topic>/`** — one
  folder per topic, `<area>` being the repo or product it belongs to.
  **`meta` is reserved** for work about how you work, and it is the area
  that routes to `Meta Roadmap`.
- **A project named `Learning`** is optional. With one, learning gaps
  drain there as their own tasks; without one, they become ordinary
  tasks in the product's roadmap.

A front that keeps no git folder — a Cowork front — runs the same two
processes with its own rows for the steps that touch a coordinator or a
folder, whether or not that front reaches ymer: that is what the process
store's front-bound rows are for, and the spine every front runs is the
same.

## Growing it

Capture is useful standalone from the first session. It gets better when
it stops being something you remember to do: put a **kaizen block** at
the tail of your own skills or processes — three lines naming the
`kaizen_capture` process and the door, and copying nothing — and every
one of them becomes a sensor. The battery, the row grammar and the write
live in the process; a block that restates them drifts the first time one
of them changes.

## What it deliberately does not do

- **It does not fix anything.** A summary writes an intake and mints a
  task; the fixing is ordinary work you do afterwards, with whatever
  process you use.
- **It does not rank.** No scores, no counts, no tiebreak ladder. One
  thing per run, chosen by reading.
- **It does not grow a second store.** No archive, no clusters file, no
  staging area. A row leaves the backlog only by being drained — its
  status changes and the row stays — and the count of open rows is the
  debt gauge: when it feels long, that is the signal to run a summary.
- **It does not set itself up.** The folder and the ymer connection are
  `setup`'s to check, and the node is yours to run; a process that meets
  an environment failure stops and names the door.
