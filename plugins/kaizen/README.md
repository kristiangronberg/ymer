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

Kaizen needs two things.

**A ymer.ax account.** The plugin ships an `.mcp.json`, so installing it
connects your sessions to ymer — the first call signs you in. Summary
mints its picks as ymer tasks, so they show up in the same place as the
rest of your work.

**One folder for state, under version control.** That is the plugin's
single setting:

```
claude plugin install kaizen@ymer --config plans_dir=<your folder>
```

or `/plugin configure kaizen@ymer` later. Until it is set, both skills
stop and say so rather than guessing a path.

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
  inventing somewhere to put your work.
- **Your state folder is laid out `<area>/YYYY/MM-DD-<topic>/`** — one
  folder per topic, `<area>` being the repo or product it belongs to.
  **`meta` is reserved** for work about how you work.
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
