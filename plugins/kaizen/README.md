# kaizen — continuous improvement over your working process

Kaizen is a plugin with two skills that turn the friction you feel
while working into improvement work you actually do.

The loop is small on purpose.

- **`/kaizen:capture`** runs at the tail of a piece of work. It asks six
  questions about what just happened, keeps the single highest-value
  answer, 5-Whys it to a root cause, and records **one row** in your
  backlog. Seconds, not minutes.
- **`/kaizen:summary`** runs occasionally, in a fresh session. It surveys
  the whole backlog and drains **exactly one thing** out of it into
  durable work: a topic folder plus a task in the product's roadmap, a
  batch of small fixes, or a learning task.

Everything else follows from one claim: **queueing a friction is what
makes it recur.** A friction you write down and leave alone accumulates
evidence — how often it bites, what it costs, whether the cause is
understood yet. A friction you act on immediately is a guess. So kaizen
keeps one store, moves nothing between containers, and keeps no ranking
between runs: priority binds at the moment work is taken, which is the
moment the picture is most accurate.

## Setup

Kaizen needs **a Ymer Node you run**, whose notebook carries the
`frictions` table and the `fronts` table it keys on. That is the whole
requirement. A **ymer.ax** account and **one folder for state, under
version control** — the `setup` plugin's single `plans_dir` setting — are
each optional, and each is the default where a session reaches it: with
ymer, the work is tracked in its Roadmap projects, and without it in the
node's `tasks` table; with a folder, a drained topic gets one beneath it,
and without one it becomes rows in the node's `topics` table. Nothing is
asked and nothing falls back on a failure — a store that is there and
broken stops the run instead.

The install block is in the [marketplace README](../../README.md#installing):
it adds the marketplace and installs both plugins. Then, in a fresh
session, run `/setup:env`. It creates the store skeletons in your
notebook, checks the folder and ymer, and reports what it found — the
report is where you read which store this machine is using. You can set
the folder later with `/plugin configure setup@ymer` — the platform's own
door to the same setting.

Both skills assume that environment rather than re-proving it: on an
environment failure they stop and name the door that fixes it, and they
never guess a path or start a second store.

The backlog itself is never in the folder: it is the `frictions` table in
the notebook of a Ymer Node, one row per friction, where a drained row
stays with its status changed. A state folder, where you have one, holds
a folder per drained topic, and version control matters because summary
commits what it writes there, as `kaizen: summary`; without one those
topics are rows in the node's `topics` table and there is nothing to
commit. The table is the record of which sessions reflected at all, which
is why even a session that found nothing records a row.

## The way of working it directs

Kaizen is opinionated, because routing without configuration needs
conventions to route by:

- **One product = one Roadmap.** With ymer that is a project named
  `<Product> Roadmap`; summary finds it by that name, and if no such
  project exists it stops and tells you to create one rather than
  inventing somewhere to put your work — `Meta Roadmap` matches that
  name shape too, and is never a candidate for a product's pick. Without
  ymer it is the `project` value a row in the node's `tasks` table
  carries, derived from the area, so there is nothing to find and nothing
  to create.
- **Work about how you work goes to `Meta Roadmap`** — one home for
  the process itself, which belongs to no product. `/setup:env` creates
  the project where there is ymer, so it is a floor rather than a naming
  decision, and a process-level pick never has to hunt for a home.
- **A topic is laid out `<area>/YYYY/MM-DD-<topic>/`** — one topic per
  folder in your state folder, or one row per artifact under that topic
  id in the node's `topics` table. `<area>` is the repo or product it
  belongs to, and **`meta` is reserved** for work about how you work — it
  is the area that routes to `Meta Roadmap`.
- **`Learning`** is optional practice: learning gaps drain there as their
  own tasks, one per subject gap. With ymer that is a project of that
  name, and without one they become ordinary tasks in the product's
  Roadmap; in the node it is simply the `project` value `Learning`.

If you already work some other way, the conventions are the part to read
first — they are what the two skills assume.

## Growing it

Capture is useful standalone from the first session. It gets better when
it stops being something you remember to do: put a **kaizen block** at
the tail of your own skills, three lines pointing at `kaizen:capture`,
and every one of them becomes a sensor. The capture skill carries the
exact wording; a block never copies the battery or the row grammar.

## What it deliberately does not do

- **It does not fix anything.** Summary writes an intake and mints a
  task; the fixing is ordinary work you do afterwards, with whatever
  process you use.
- **It does not rank.** No scores, no counts, no tiebreak ladder. One
  thing per run, chosen by reading.
- **It does not grow a second store.** No archive, no clusters file, no
  staging area. A row leaves the backlog only by being drained — its
  status changes and the row stays — and the count of open rows is the
  debt gauge: when it feels long, that is the signal to run a summary.
- **It does not set itself up.** The node is yours to run, and the folder
  and the ymer connection are `setup`'s to check and yours to bring; a
  kaizen skill that meets an environment failure stops and names the
  door. Nothing here creates a table — `/setup:env` does.
