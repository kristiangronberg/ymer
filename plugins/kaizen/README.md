# kaizen — continuous improvement over your working process

Kaizen is a plugin with two skills that turn the friction you feel
while working into improvement work you actually do.

The loop is small on purpose.

- **`/kaizen:capture`** runs at the tail of a piece of work. It asks six
  questions about what just happened, keeps the single highest-value
  answer, 5-Whys it to a root cause, and appends **one line** to your
  backlog. Seconds, not minutes.
- **`/kaizen:summary`** runs occasionally, in a fresh session. It reads
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

Kaizen needs a **ymer.ax** account and **one folder for state, under
version control** — the plugin's single `plans_dir` setting. You bring
both; `setup` is what checks them and fills in the rest.

The install block is in the [marketplace README](../../README.md#installing):
it brings the ymer connection, adds the marketplace, and installs both
plugins. Then, in a fresh session, run `/setup:env`. It checks the state
folder, creates the store skeleton, checks that ymer answers, and reports
what it found. You can also set the folder later with
`/plugin configure kaizen@ymer` — the platform's own door to the same
setting.

Both skills assume that environment rather than re-proving it: on an
environment failure they stop and send you to `/setup:env`, and they
never guess a path or start a second store.

The folder holds `backlog.md` — the whole store, one row per line — and
a folder per drained topic. Version control matters because kaizen
commits its own writes: `kaizen: capture (<source>)` after each capture,
`kaizen: summary` after each drain. That log is the record of which
sessions reflected at all, which is why even a session that found
nothing appends a row.

## The way of working it directs

Kaizen is opinionated, because routing without configuration needs
conventions to route by:

- **One product = one ymer project named `<Product> Roadmap`.** Its
  tasks are what to do next. Summary finds it by that name, and if no
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
  staging area. A row leaves the backlog only by being drained, and the
  file's own length is the debt gauge — when it feels long, that is the
  signal to run a summary.
- **It does not set itself up.** The environment is `setup`'s, and a
  kaizen skill that meets an environment failure names that one door.
