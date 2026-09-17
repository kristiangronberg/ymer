---
name: summary
description: Use to run a kaizen summary session — survey the whole backlog and drain exactly one thing out of it into durable improvement work: a topic folder in your state folder plus a task in the product's Roadmap project, the friction-batch, or a learning task.
---

# Kaizen — Summary

A summary session over the whole backlog, run with fresh context. It
drains **exactly one thing** from the backlog.

**Announce at start:** "Kaizen — summary session."

The backlog is the `frictions` table in the notebook of a Ymer Node,
reached through the node's `notebook` tool. Friction rows, empty rows and
recurrence rows are recorded by the `kaizen:capture` skill; vision rows go
in the same way from wherever product-direction material surfaces. Capture
states every row grammar and the line a row is quoted as — read that file
when you need it; this one never restates them.

A summary works one front's rows. `<front>` below is the slug this
front's initial instructions name — the one capture writes on every row —
and another front's rows stay open for that front's own summary.

**Guard — environment failures have two doors.** The backlog's door is
capture's: its guard names the node-side stops and the fix for each,
restoring the node first. Anything else this skill needs that setup owns
and finds broken — a `plans_dir` still reading as an unsubstituted
`user_config` placeholder rather than a real folder, a state folder
missing or not a git work tree, a failing ymer call — stops the run with
one instruction: **run `/setup:env`** (install it first with
`claude plugin install setup@ymer`, then start a fresh session — a
plugin's skills load at session start). Repair nothing here, and never
guess a path.

**Guard — nothing to drain.** If the backlog holds no open row on this
front, or none but rows no exit can take — empty rows, and vision rows for
a product with no Roadmap project — there is no run to make. Say so and
stop, naming `/kaizen:capture` as the way to put a row there: no drain, no
commit, no mint. Both states are ordinary, a drained store and an
accumulation of rows nothing ever drains.

## The directed way of working

Summary deposits into a way of working the plugins direct, and routes by
that way's name conventions rather than by configuration:

- **One product = one ymer project named `<Product> Roadmap`.** Its tasks
  are what to do next; its description is the product's page. Finding
  one: a `projects list` name search for `Roadmap`.
- **Work about how you work belongs to no product**, so it goes to
  `Meta Roadmap` — the one Roadmap every machine has, created by
  `/setup:env` rather than named by you.
- **One git-controlled folder for state** — the configured `plans_dir` —
  laid out `<area>/YYYY/MM-DD-<topic>/`, one folder per topic, `<area>`
  being the repo or product it belongs to, named by the drained rows'
  own context. **`meta` is the reserved area for process work**, and it
  is the area that routes to `Meta Roadmap`.
- **`Learning`** — an optional project holding learning tasks, one per
  subject gap.

Nothing richer is configuration. Where a convention has no match, the
skill says so and names what to create; it never guesses.

**Ymer calls are named, never spelled.** This skill names the tool and
the action a step needs, the transition or group as a word, and what
proves the call landed. It never writes the parameter shape: that is the
server's, read from its own `help` for the action at the moment of the
call, or from the hint a response carries. A shape copied into a skill
goes stale the next time the server moves, and works against only the
one version it was copied from.

**Notebook calls are named the same way, and their SQL is written out.**
The tool and the action are the node's; the SQL is this plugin's own, over
its own table, so the statements below are the skill's to carry.

## The run

1. **Back up, then orient.** Take a notebook backup first — `notebook`
   `create` — and note its id: the drain in step 4 changes rows no commit
   records. The backup is the whole-notebook safety net, not the drain's
   undo — `restore` puts back everything as it was and discards every row
   any client inserted after it. A wrong drain is undone by its exact
   inverse instead, which touches nothing else:

   ```sql
   UPDATE frictions
   SET status = 'open', drained_to = NULL, drained_at = NULL
   WHERE id IN (<the same ids>)
   ```

   Then survey the backlog whole — never a recent tail: a friction that
   recurs slowly would fall out of view exactly as it matures into one
   worth doing. Whole means every open row on this front is in view, the
   aggregates first and then the rows, each through `notebook` `query`:

   ```sql
   -- what is open: rows per kind and source, oldest and newest
   SELECT kind, source, count(*) AS rows, min(captured_on) AS oldest, max(captured_on) AS newest
   FROM frictions
   WHERE status = 'open' AND front = '<front>'
   GROUP BY kind, source
   ORDER BY kind, rows DESC
   ```

   ```sql
   -- frequency: every anchor, its rows and how many are still open, drained ones counted
   SELECT COALESCE('#' || anchor_id, anchor_text) AS anchor, count(*) AS rows,
          sum(status = 'open') AS open, max(captured_on) AS latest
   FROM frictions
   WHERE kind = 'recurrence' AND front = '<front>'
   GROUP BY anchor
   ORDER BY rows DESC
   ```

   ```sql
   -- the sharpest signal: open recurrences whose anchor was drained
   SELECT r.id, r.captured_on, r.context, r.body, a.id AS anchor, a.drained_to
   FROM frictions r JOIN frictions a ON a.id = r.anchor_id
   WHERE r.status = 'open' AND a.status = 'drained' AND r.front = '<front>'
   ORDER BY r.id
   ```

   ```sql
   -- vision rows per product
   SELECT lower(product) AS product, count(*) AS rows
   FROM frictions
   WHERE kind = 'vision' AND status = 'open' AND front = '<front>'
   GROUP BY lower(product)
   ORDER BY rows DESC
   ```

   Then the rows: every open friction and vision row as a lead, oldest
   first, a hundred per page until a page comes back short.

   ```sql
   SELECT id, captured_on, source, context, kind, product, substr(body, 1, 200) AS lead
   FROM frictions
   WHERE status = 'open' AND front = '<front>' AND kind IN ('friction', 'vision')
   ORDER BY id
   LIMIT 100 OFFSET <n>
   ```

   A row that becomes a candidate for the pick is read whole, together
   with the rows anchored on it — `WHERE id = <id> OR anchor_id = <id>`,
   or `WHERE anchor_text = '<text>'` for a named cause. The aggregates
   count; clustering is still a judgement made by reading.

   Then find the picks nobody has started, three ways, because they
   answer different questions:

   - `tasks list` on **each** Roadmap project, narrowed to the **open**
     group — the tasks nobody has started, where a freshly minted task
     lands (`projects list`, a name search for `Roadmap`, finds the
     projects). Summary mints every pick there and nothing remembers where
     earlier runs minted; the name convention is what finds them again.
   - The same listing on `Learning` (`projects list`, a name search for
     `Learning`) when one
     exists — exit 3 writes no folder, so this is the only listing that
     can see those.
   - The folder scan, which finds the paths a task name does not carry:

     ```
     grep -rl --include='request.md' 'source: kaizen-summary' ${user_config.plans_dir}
     ```

     A folder holding nothing but its `request.md` is one nobody has
     started. (`--include` keeps the scan to the files carrying the
     marker; other artifacts may quote it.)

   All three are a reminder at the moment it is relevant, never a gate.
   The scan is also what step 3's "one open friction-batch at a time" rule
   needs.

2. **Determine the run's shape.** Count the rows below the bar for their
   own topic (→ Three exits). **Ten or more ⇒ this run's pick is the
   friction-batch**; fewer ⇒ the normal pick. Moot rows ride along in the
   friction-batch but never count toward the ten; vision rows do neither;
   empty rows belong to no cluster and take no exit, so they stay open. The
   threshold exists so the run's shape is deterministic rather than a
   question you answer each time.

3. **Pick one thing** (→ The pick rule) and create or append its
   artifact — a topic folder, the friction-batch folder, or a learning
   task. Summary applies no diff itself and discards nothing: every exit
   deposits a durable artifact.

   A cluster can span fronts: capture's recurrence check searches the
   whole backlog, so a row on this front may be anchored on another
   front's row, and the candidate read in step 1 shows each row's
   `front`. The pick takes this front's portion only — step 4 drains the
   rows whose `front` is `<front>`, and the other front's rows stay open
   for that front's own summary. Where the cause is shared, say so in a
   line of the artifact the pick writes.

4. **Drain the rows the pick took** — every one of them, in one
   `notebook` `execute`:

   ```sql
   UPDATE frictions
   SET status = 'drained', drained_to = '<where they went>',
       drained_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
   WHERE status = 'open' AND id IN (<ids>)
   ```

   The ids are the cluster's, never the anchor's alone: the anchor and
   every open row anchored on it — by `anchor_id`, or by the same
   `anchor_text` for a named cause — the rows step 1 read together. A
   pointer left open on a drained anchor would read as the sharpest
   signal next run, so after a drain an open pointer on a drained anchor
   means exactly one thing: captured after it.

   `drained_to` names where the rows went: the folder the pick wrote, as
   `<area>/YYYY/MM-DD-<topic>/` under the state folder — the
   friction-batch's folder included — or the learning task's id. The
   call's `affected_rows` must equal the number of ids; fewer means an id
   is wrong or a row was already drained, so find out which before
   closing. The update names its rows, so a capture landing meanwhile in
   another session is never touched. Rows are never deleted, and every
   other row stays open: a friction left to accumulate produces a *better*
   root cause when its turn comes.

5. **Commit** — state changes before announcements, so the close
   announces what is already durable:

   ```
   git -C ${user_config.plans_dir} add <area>/YYYY/MM-DD-<topic>/
   git -C ${user_config.plans_dir} commit -m "kaizen: summary" -- <area>/YYYY/MM-DD-<topic>/
   ```

   Stage the folder the pick wrote; a learning-task pick writes no file
   and commits nothing — its drain is already durable in the table.
   **Pathspec-scope the commit**: the state folder can be written by
   concurrent sessions and a bare commit sweeps in their staged work.
   Verify scoped: `git -C ${user_config.plans_dir} status` no longer
   lists the topic folder; foreign dirty paths may remain — leave them.

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

Clustering is something summary *does while reading*, and names in a
`request.md` when several rows share a cause — never written to disk or
to the table as a structure, so nothing persists between runs to drift.
The anchors capture records are evidence for a cluster, not the cluster:
rows with different anchors can terminate at one root cause.

### The pick rule

Pick the one friction or cluster whose removal would spare the most
future waste. Three things to weigh, in no fixed order:

- **What each occurrence costs.** A silent failure costs more than a felt
  one — it looks exactly like a clean pass, and its cost lands later on a
  session with no way to know.
- **How often it bites.** Rows sharing a root cause are evidence of
  frequency. Evidence, not a ranking key: one row describing an expensive
  silent failure outranks six rows of mild friction.
- **Whether the cause is understood well enough to act.** Rows naming a
  symptom whose cause is still fuzzy make a better topic once they have
  gathered more faces — a reason to pick something else this run, never a
  reason to never pick it.

There is deliberately **no stored count, no threshold, no tiebreak ladder
and no scoring**, so do not reinvent one. Ranking only matters when the
queue's head sits unserved, and serving one thing per run answers that —
which is also what keeps the singleton tail servable, the pick being a
judgement over content rather than a count comparison.

**A row anchored to a topic folder that already exists** — two rules:

- **Folder created but nobody has started it** → fold the row into its
  `request.md` and drain it to that folder. The same append the
  friction-batch uses; it costs nothing because nobody has read the file
  yet, and the intake gets strictly better.
- **Anything else** → leave the row open. If the topic shipped and the
  friction is gone, a later run carries the row to the friction-batch as
  moot. If it shipped and the friction persists, **that
  recurrence-after-ship is the sharpest signal kaizen produces** — a
  shipped change did not solve what it claimed — and it earns its own
  topic.

Everything wider than capture's bounded query is summary's, never
capture's: the folder scan above, drained rows read in full, and an ad-hoc
`grep -r '<term>' ${user_config.plans_dir}` when a row looks like a
recurrence of something already drained. Narrow by time if that gets
unwieldy, but set no default window — the valuable catch is a friction
recurring from a topic that shipped long ago, and a window blinds it.

### Three exits, all artifact-depositing

**1. Its own topic.** The pick becomes a topic folder
`<area>/YYYY/MM-DD-<name>/` holding a `request.md`, plus **the topic's
task** minted at `todo` in the Roadmap project its area routes to: the
topic has not been thought through yet, so it belongs in the inbox, and a
topic with no task has no node — invisible to every listing until someone
scans the folder tree for it.

**Order: route (below), then mint, then write `request.md`** — the file
carries the task's id, and a halt at routing then leaves nothing on disk.
The mint is three calls, because neither of the first two shows the
postcondition:

1. `tasks create` — the task's name, and a description that is one line:
   what this is, plus the folder path.
2. `projects link_task` — link the new task to the Roadmap project the
   area routes to.
3. `tasks list` on that same project, narrowed by a name search for the
   task's name — the read-back.

Expect exactly one task, and the projects it names to include the target.
The description **points at the folder, never copies it**: `request.md`
already carries the root cause and the verbatim frictions, and a copy
would be the second store this whole arrangement exists to remove.

**Routing — which Roadmap project.** The folder's area decides, read off
the projects step 1 already listed — no second call:

- **`meta/` routes to `Meta Roadmap`** — the friction-batch always, and
  any process-level pick. Work about how you work belongs to no product,
  and this is the project that holds it.
- **Every other area routes to that product's `<Product> Roadmap`**, and
  **`Meta Roadmap` is never a candidate there** — it sits among those
  matches by name, so exclude it before resolving. One remaining match is
  the target only when it is that product's Roadmap — another product's is
  no match at all, and leaves you at the halt below rather than at a
  default. Several are resolved by the pick's own content, which names the
  product it is about. Ask only on genuine ambiguity, and never route a
  product pick to `meta` by default.

**No match halts the run**, saying what to create. For a product:

> Kaizen drains into a project named `<Product> Roadmap` — one per
> product, its tasks what to do next. Create one in ymer for the product
> this improvement belongs to, then run `/kaizen:summary` again. The
> rows are still open in the backlog; nothing was lost.

For `Meta Roadmap`, which is a floor rather than one of your products:

> Kaizen drains work about your own process into a project named
> `Meta Roadmap`, and this machine has none. Run `/setup:env`, which
> creates it, or create it in ymer yourself — then run `/kaizen:summary`
> again. The rows are still open in the backlog; nothing was lost.

Both halts are deliberate: a Roadmap project is the load-bearing floor of
this way of working, and inventing a substitute would hide its absence.

**Before minting, one look**: step 1 already listed the open picks. If one
of them is this same thing, append the new rows to that topic's
`request.md` instead of minting a second task for it.

**2. The friction-batch.** Topic `YYYY-MM-DD-friction-batch`, folder
`meta/YYYY/MM-DD-friction-batch/` — always under `meta`, because its
contents are your own process prose and config by construction, so it
always routes to `Meta Roadmap`. It takes exactly two kinds of row:

- **Below-bar but actionable** — the change is derivable from the row
  itself plus a locating grep, no design choices left, and the edit
  surface is your process prose or config, never a project's code.
- **Moot or not worth doing** — the cause is gone, was handled elsewhere,
  or is judged not worth acting on. Never drain such a row silently: the
  work that follows gets the final say on whether it is done, including
  that it is not.

**Vision rows are neither kind** — a product's direction is not the
friction-batch's edit surface — so they never ride it and never count
toward the ten. A product's vision rows drain as exit 1 above, as a
**carve topic**: an ordinary topic in that product's area whose
`request.md` names the product and carries the rows verbatim, and whose
work writes them into the product's own description. That is the one door
through which vision material reaches a product page.

**Every other row stays open, accumulating.** If the friction-batch
swallowed everything, the backlog would empty at every run and the
frequency signal the pick rule rests on would be gone.

**One open friction-batch at a time.** If step 1's scan found a
`friction-batch` folder nobody has started, **append** this run's rows to
its `request.md` under the right heading; otherwise create a new one and
mint its task like any other pick. Once a friction-batch has been started
the next run opens a fresh one, and an appended-to friction-batch keeps
its *opening* date — every row carries its own.

**3. A learning task.** A learning-gap friction — probe 6 of the capture
battery explicitly invites them — exits here. Summary **never opens the
learning in-session**, exactly as it never runs the topic: it mints a task
in a project named `Learning` (the one step 1 already listed, then the
same create/link/read-back as exit 1), drains the rows to that task, and
closes.

The task's name is the gap **as a goal-contract-shaped statement**, not a
bare subject name — "enough Postgres query planning to read an EXPLAIN and
fix the index myself", not "Postgres". The drained frictions ride the
description verbatim; status `todo`; no dependency edge, since pattern
evidence blocks no specific topic. **Before minting, one look**: if one of
`Learning`'s open tasks names the same subject gap, append the rows to its
description instead — one task per subject gap is the shape this project
holds.

**No `Learning` project?** Fold the pick into exit 1: mint it into the
Roadmap project its area routes to, as an ordinary task, name and verbatim
frictions unchanged. Degrade, never halt — a Roadmap is this way of
working's floor, a Learning project is optional practice.

### `request.md`'s shape

`source: kaizen-summary` marks where the folder came from, `task:` is the
reverse pointer to the task minted beside it, and `created:` rather than
`started:` because the folder predates anyone working the topic. Every
row is quoted as capture's line — the rendering query lives there — so
its id travels with it.

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

<row as a line>
<row as a line>
```

The `inferred:` mark is the default on that line: summary synthesizes with
no code in view, so the cause is reasoned rather than observed, while the
verbatim rows below it stay unmarked observations.

The friction-batch:

```markdown
---
source: kaizen-summary
task: <task UUID>
created: <YYYY-MM-DD>
---

# friction-batch

Frictions collected by `/kaizen:summary` to triage as one friction-batch.
The triage decides which are done — including that some are not.

## Below the bar for their own topic

<row as a line>

## Moot, or judged not worth doing

<row as a line>
```

The two headings carry summary's judgement into the folder — real input
for whoever works it. On a later append, add rows under the right heading
and leave `created:` at the opening date.

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
loaded — the bare topic name, no date. With no such skill, drop the line:
the minted task is the handle. A learning-task pick names that task
instead, and a `/tutor`-style skill if one is loaded.

Repeating the older unstarted folders is deliberate: step 1 already
derives them, and the close is where they get read. If that list grows
long, the length is the signal — a felt failure earns a reminder, not a
guard.

## Remember

- Summary drains exactly one thing per run, and every exit deposits a
  durable artifact — kaizen applies no diff itself and discards nothing
- The task summary mints is a node for the topic, not a queue of
  frictions: the description points at the folder and never copies it
- Cluster by root cause, never by symptom; vision rows cluster per
  product and never ride the friction-batch
- The folder's area picks the Roadmap: `meta/` → `Meta Roadmap`, anything
  else → that product's, with `Meta Roadmap` excluded from the candidates
- A missing Roadmap project halts the run and says what to create; no
  `Learning` project degrades into an ordinary Roadmap task
- Every run opens with a notebook backup, and the drain is one `UPDATE`
  by id to `drained` — rows are never deleted
- Summary commits the folder it wrote, pathspec-scoped; the backlog itself
  lives in no git tree
