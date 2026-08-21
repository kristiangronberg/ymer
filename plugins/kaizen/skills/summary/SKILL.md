---
name: summary
description: Use to run a kaizen summary session — read the backlog whole and drain exactly one thing out of it into durable improvement work: a topic folder in your state folder plus a task in the product's Roadmap project, the friction-batch, or a learning task. The drain half of the kaizen practice; /kaizen:capture fills the backlog.
---

# Kaizen — Summary

A summary session over the whole backlog, run with fresh context. It
drains **exactly one thing** — picking two is deciding a future drain
early, and every decision this design makes is deferred to the moment
work is actually taken.

**Announce at start:** "Kaizen — summary session."

The store is `${user_config.plans_dir}/backlog.md`. Friction rows, ∅
rows and recurrence pointer rows are appended by the `kaizen:capture`
skill; vision rows go through the same writer from wherever
product-direction material surfaces. Capture is the home of every row
grammar — read that file when you need it; this one never restates it.

**Guard — the store path must be real.** If the path above still reads
as an unsubstituted `user_config` placeholder rather than a real
directory, this plugin is not configured yet. Stop, do not write
anything, and tell the user:

> Kaizen needs one folder for its state, under version control. Set it
> with `/plugin configure kaizen@ymer`, or reinstall with
> `claude plugin install kaizen@ymer --config plans_dir=<your folder>`.

**Guard — nothing to drain.** If `backlog.md` does not exist yet, or
holds nothing below its usage header, or holds nothing but rows no exit
can take — ∅ rows, and vision rows for a product with no Roadmap
project — there is no run to make. Say so and stop — no rewrite, no
commit, no mint — and name `/kaizen:capture` as the way to put a row
there. All of these are ordinary: the file is absent until the first
capture creates it, a run that drained the last rows leaves it
header-only, and ∅ rows accumulate between drains because nothing ever
drains them.

## The directed way of working

Summary deposits into a way of working the plugins direct, and derives its
routing from that way's name conventions rather than from configuration:

- **One product = one ymer project named `<Product> Roadmap`.** Its
  tasks are what to do next; its description is the product's page.
  Finding one: `projects list {q: "Roadmap", fields: ["id","name"]}`.
- **One git-controlled folder for state** — the configured
  `plans_dir` — laid out `<area>/YYYY/MM-DD-<topic>/`, one folder per
  topic. `<area>` is the repo or product the topic belongs to, named by
  the drained rows' own context. **`meta` is the reserved area for
  process work** — work about how you work, belonging to no product.
- **`Learning`** — an optional project holding learning tasks, one per
  subject gap.

Nothing richer is configuration. Where a convention has no match, the
skill says so and names what to create; it never guesses.

## The run

1. **Orient.** Read `backlog.md` whole — never a recent tail: a friction
   that recurs slowly would fall out of view exactly as it matures into
   one worth doing. Then find the picks nobody has started, three ways,
   because they answer different questions:

   - `tasks list {project_id, status: "todo"}` on **each** Roadmap
     project (`projects list {q: "Roadmap", fields: ["id","name"]}`) —
     summary mints each pick's task at `todo`, and it stays open until
     someone starts the topic. Nothing remembers which projects earlier
     runs minted into; the name convention is what finds them again.
   - `tasks list {project_id, status: "todo"}` on the `Learning`
     project (`projects list {q: "Learning", fields: ["id","name"]}`),
     when one exists — the open learning tasks nobody has started. Exit
     3 writes no folder, so the scan below cannot see them and this is
     the only listing that can.
   - The folder scan, which finds the paths a task name does not carry:

     ```
     grep -rl --include='request.md' 'source: kaizen-summary' ${user_config.plans_dir}
     ```

     A folder holding nothing but its `request.md` is one nobody has
     started. (`--include` keeps the scan to the files that carry the
     marker; other artifacts in the state folder may quote it.)

   All three are a reminder at the moment it is relevant, not a gate: nothing
   here blocks or refuses on follow-through. The scan is also what step
   3's "one open batch at a time" rule needs.

2. **Determine the run's shape.** Count the rows that are below the bar
   for their own topic (→ Three exits). **Five or more ⇒ this run's pick
   is the friction-batch.** Fewer than five ⇒ the normal pick. Moot rows
   ride along in a batch but are never counted toward the five; vision
   rows do neither — they never ride a batch and never count; ∅ rows
   belong to no cluster and take no exit (→ `kaizen:capture`) — neither
   counted nor batched, they stay. The threshold exists so the run's
   shape is deterministic rather than a question the user answers each
   time.

3. **Pick one thing** (→ The pick rule) and create or append its
   artifact — a topic folder, the friction-batch folder, or a learning
   task. Summary applies no diff itself and discards nothing: every exit
   deposits a durable artifact.

4. **Delete the drained rows** from `backlog.md`. This is the one place
   the file is written other than by appending — and the store's one
   lost-update hazard: a capture in another session may have appended
   since step 1. So **re-read the file immediately before editing, and
   remove the drained rows by targeted edits** — never rewrite the whole
   file from the copy step 1 read. Every other row stays,
   accumulating — a friction left to accumulate produces a *better* root
   cause when its turn comes.

5. **Commit:** state changes before announcements — the close below
   announces what is already durable.

   ```
   git -C ${user_config.plans_dir} add backlog.md <area>/YYYY/MM-DD-<topic>/
   git -C ${user_config.plans_dir} commit -m "kaizen: summary" -- backlog.md <area>/YYYY/MM-DD-<topic>/
   ```

   Stage the drained rows' new artifact beside the backlog — the topic
   folder, or the batch folder. A learning-task pick writes no file, so
   it stages `backlog.md` alone. Pathspec-scope the commit: the state
   folder can be written by concurrent sessions and a bare commit sweeps
   in their staged work. Verify scoped:
   `git -C ${user_config.plans_dir} status` no longer lists `backlog.md`
   or the topic folder; foreign dirty paths may remain — leave them.

6. **Close with the runnable reminder** (→ The close).

The five subsections below are reference material for steps 2–4 and 6 —
the numbered flow ends here.

### Clustering

A **cluster** is a named root cause plus the frictions whose 5-Whys
terminates at it. Cluster by root cause, never by symptom and never by
affected area — the row-records-the-cause rule, extended to the group.

**Vision rows cluster per product instead**: they carry no root cause to
terminate at, and one product's direction is what their drain writes. A
product's vision rows are one cluster however unrelated their contents,
and they never join a friction cluster.

Clustering is something summary *does while reading*, and what it names
in a `request.md` when several rows share a cause. It is never written to
disk as a structure, so nothing persists between runs to drift or to be
reproduced.

### The pick rule

Pick the one friction or cluster whose removal would spare the most
future waste. Three things to weigh, in no fixed order:

- **What each occurrence costs.** A silent failure costs more than a felt
  one — it looks exactly like a clean pass, and its cost lands later on a
  session with no way to know.
- **How often it bites.** Rows sharing a root cause are evidence of
  frequency. Evidence, not a ranking key: one row describing an expensive
  silent failure outranks six rows of mild friction.
- **Whether the cause is understood well enough to act.** When rows name
  a symptom whose cause is still fuzzy, leaving it to gather more faces
  produces a better topic — a reason to pick something else this run,
  never a reason to never pick it.

There is deliberately **no stored count, no threshold, no tiebreak
ladder, and no scoring**, so do not reinvent one. A ranking rule only
matters when the queue's head sits unserved, and serving one thing per
run is this design's answer to that. It is also what keeps the singleton
tail servable: a friction captured once and never recurred stays a real
candidate, because the pick is a judgement over content rather than a
count comparison.

**A row anchored to a topic folder that already exists** — two rules:

- **Folder created but nobody has started it** → fold the row into its
  `request.md`. The same append the batch uses; it costs nothing because
  nobody has read the file yet, and the intake gets strictly better.
- **Anything else** → leave the row in `backlog.md`, no rule. If the
  topic shipped and the friction is gone, a later run carries the row to
  the batch as moot. If it shipped and the friction persists, **that
  recurrence-after-ship is the sharpest signal kaizen produces** — a
  shipped change did not solve what it claimed — and it earns its own
  topic.

Everything wider than `backlog.md` is summary's, never capture's: the
folder scan above, and an ad-hoc
`grep -r '<term>' ${user_config.plans_dir}` when a row looks like a
recurrence of something already drained. If that output ever gets
unwieldy, narrow by time — one year's folders, or a couple of months' —
but set no default window: the valuable catch is a friction recurring
from a topic that shipped long ago, and a window blinds exactly that.

### Three exits, all artifact-depositing

**1. Its own topic.** The pick becomes a topic folder
`<area>/YYYY/MM-DD-<name>/` in the state folder — process-level
→ `meta`, product-specific → that product's area, which may be any area,
never `meta` by default — holding a `request.md`, plus **the topic's
task** minted at `todo` in that product's Roadmap project: the topic has
not been thought through yet, so it belongs in the inbox, and a topic
with no task has no node — it would be invisible to every listing until
someone happened to scan the folder tree for it. **Order: route (below),
then mint, then write `request.md`** — the file carries the task's id,
and a halt at routing then leaves nothing on disk. The mint is three
calls, then a read-back, because neither of the first two shows the
postcondition:

```
tasks create {name: "<topic name>", description: "<one line: what this is, plus the folder path>"}
projects link_task {id: <the product's Roadmap project>, task_id: <the new id>}
tasks list {project_id: <the same project>, q: "<topic name>", fields: ["id","name","status","project_names"]}
```

Expect `count: 1` with `project_names` naming the target project. The
description **points at the folder, never copies it**: `request.md`
already carries the root cause and the verbatim frictions, and a copy
would be the second store this whole arrangement exists to remove.

**Routing — which Roadmap project.** The Roadmap projects step 1 already
listed (`projects list {q: "Roadmap", fields: ["id","name"]}` — no second
call): exactly one match is the target and costs no
question; several matches are resolved by the pick's own content, which
names the product it is about — ask only on genuine ambiguity. **No
match halts the run**: say so and name what to create.

> Kaizen drains into a project named `<Product> Roadmap` — one per
> product, its tasks what to do next. Create one in ymer for the product
> this improvement belongs to, then run `/kaizen:summary` again. The
> drained rows are still in the backlog; nothing was lost.

That halt is deliberate: a Roadmap project is the load-bearing floor of
this way of working, and inventing a substitute would hide its absence.

**Before minting, one look**: step 1 already listed the open picks. If
one of them is this same thing, append the new rows to that topic's
`request.md` instead of minting a second task for it.

**2. The friction-batch.** Topic `YYYY-MM-DD-friction-batch`, folder
`meta/YYYY/MM-DD-friction-batch/` — always under `meta`, because its
contents are your own process prose and config by construction. It takes
exactly two kinds of row:

- **Below-bar but actionable** — the change is derivable from the row
  itself plus a locating grep (no design choices left), and the edit
  surface is your process prose or config, never a project's code.
- **Moot or not worth doing** — the row's cause is gone, was handled
  elsewhere, or is judged not worth acting on. Never delete such a row
  silently: the work that follows gets the final say on whether it is
  done, including that it is not.

**Vision rows are neither kind** — a product's direction is not the
batch's edit surface — so they never ride a batch and never count toward
the five. A product's vision rows drain as exit 1 above, as a **carve
topic**: an ordinary topic in that product's area whose `request.md`
names the product and carries the rows verbatim, and whose work writes
them into the product's own description. That is the one door through
which vision material reaches a product page.

**Every other row stays in `backlog.md`, accumulating.** If the batch
swallowed everything, the backlog would empty at every run and the
frequency signal the pick rule rests on would be gone.

**One open batch at a time.** Step 1's scan already finds the folders
nobody has started. If a `friction-batch` folder is among them,
**append** this run's rows to that folder's `request.md` under the right
heading; otherwise create a new one, and mint its task like any other
pick. Once a batch has been started, the next run opens a fresh one. An
appended-to batch keeps its *opening* date — accepted; every row carries
its own date.

If the session has a `/brainstorm` skill loaded, the batch takes the full
route from there like any other topic. Otherwise the minted task is the
handle: work it straight from `request.md`, whose two headings are the
triage guide.

**3. A learning task.** A learning-gap friction — probe 6 of the capture
battery explicitly invites them ("X is worth learning properly") — exits
here. Summary **never opens the learning in-session**, exactly as it
never runs the topic: it mints a task in a project named `Learning`
(the one step 1 already listed — no second `projects list` — then the
same create/link/read-back as exit 1), deletes the rows, and closes.

**Before minting, one look**: step 1 already listed `Learning`'s open
tasks. If one of them names the same subject gap, append the drained
rows to that task's description instead of minting a second task for
it — one task per subject gap is the shape this project holds, and
nothing else in the run would notice a duplicate.

The task's name is the gap **as a goal-contract-shaped statement**, not
a bare subject name — "enough Postgres query planning to read an EXPLAIN
and fix the index myself", not "Postgres". The drained frictions ride the
description verbatim; status `todo`; no dependency edge — pattern
evidence blocks no specific topic.

**No `Learning` project?** Fold the pick into exit 1 instead: mint it
into the product's Roadmap project as an ordinary task, name and verbatim
frictions unchanged. Degrade, never halt — a Roadmap is this way of
working's floor, a Learning project is optional practice.

### `request.md`'s shape

`source: kaizen-summary` marks where the folder came from. `task:`
carries the task summary minted beside it — the reverse pointer, since
the folder name is not one. `created:` rather than `started:`: the folder
predates anyone working the topic, so there is no start date to record
yet.

A normal pick:

```markdown
---
source: kaizen-summary
task: <task UUID>
created: <YYYY-MM-DD>
---

# <topic-name>

**Root cause.** <the shared cause the rows terminate at, one or two sentences> (`inferred:` — synthesis; no code in view)

Frictions, verbatim from the backlog:

- <row>
- <row>
```

The `inferred:` mark on the Root cause line is the default here: summary
synthesizes with no code in view, so the shared cause is reasoned, never
observed — the verbatim rows below it stay unmarked observations.

The friction-batch:

```markdown
---
source: kaizen-summary
task: <task UUID>
created: <YYYY-MM-DD>
---

# friction-batch

Frictions collected by `/kaizen:summary` to triage as one batch. The
triage decides which are done — including that some are not.

## Below the bar for their own topic

- <row>

## Moot, or judged not worth doing

- <row>
```

The batch's two headings carry summary's judgement into the folder, which
is real input for whoever works it. On a later append, add rows under the
right heading and leave `created:` at the opening date.

### The close

```
Picked: <name> — <one line: what fixing it removes>
Folder: <area>/YYYY/MM-DD-<name>/
Task:   <task name> (todo, <Product> Roadmap)
Next:   /brainstorm <name>

Still unstarted from earlier summaries:
  <other-name>   (<area>/YYYY/MM-DD-<other-name>/)
```

`Next:` names `/brainstorm <name>` only when a `/brainstorm` skill is
loaded in this session — the bare topic name, no date. With no such
skill, drop the line: the minted task named above is the handle, and the
close says so. A learning-task pick names the minted learning task
instead, and a `/tutor`-style skill if one is loaded.

Repeating the older unstarted folders is deliberate: step 1 already
derives them, and the close is where they get read. If that list grows
long, the length is the signal — a felt failure earns a reminder, not a
guard.

## Remember

- Summary drains exactly one thing per run, and every exit deposits a
  durable artifact — kaizen applies no diff itself and discards nothing
- The task summary mints is a node for the topic, not a queue of
  frictions; the description points at the folder and never copies it
- Cluster by root cause, never by symptom; vision rows cluster per
  product and never ride a batch
- No `<Product> Roadmap` project halts the run and says what to create;
  no `Learning` project degrades into an ordinary Roadmap task
- Summary commits its own backlog rewrite together with the artifact it
  wrote
