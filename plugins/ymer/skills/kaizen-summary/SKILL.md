---
name: kaizen-summary
description: Use to run a kaizen summary session — survey the whole backlog and drain exactly one thing out of it into durable improvement work: a topic plus a task in the product's Roadmap, the friction-batch, or a learning task.
---

# Kaizen — Summary

A summary session over the whole backlog, run with fresh context. It
drains **exactly one thing** from the backlog.

**Announce at start:** "Kaizen — summary session."

The backlog is the `frictions` table in the notebook of a Ymer Node,
reached through the node's `notebook` tool. Friction rows, empty rows and
recurrence rows are recorded by the `ymer:kaizen-capture` skill; vision rows go
in the same way from wherever product-direction material surfaces. Capture
states every row grammar and the line a row is quoted as — read that file
when you need it; this one never restates them.

A summary works one front's rows. `<front>` below is the slug this
front's initial instructions name — the one capture writes on every row —
and where they name none, the same per-harness default capture uses:
`claude_code` on Claude Code, `cowork` on Cowork, told from the session's
own tools. Another front's rows stay open for that front's own summary.

## Where this run deposits — the reach rule

Two stores answer two different questions. Resolve both once, here,
before the run starts:

- **The coordinator** — what tracks work and how topics are named there.
  Ymer's tool surface among this session's tools → its Roadmap projects,
  and every mint below is a ymer task. Absent → the node's `tasks` table,
  and every mint below is a row there. **The coordinator is the default
  where this session reaches it.**
- **The state store** — where a topic's artifacts live: the state folder,
  laid out `<area>/YYYY/MM-DD-<topic>/`, together with the history that
  tracks it. **The state folder is required**, and which history tracks
  it is read from the folder. A git work tree → git: the run commits
  what it wrote. Any other folder → the node's `topics_history` table:
  the run saves each file it wrote there as a row, and commits nothing.

Ymer's tool surface counts as reached when it is among this session's
tools **whether or not it has been loaded yet** — the same test
`/ymer:setup`'s ymer check uses — so a harness that defers tools until
they are needed still has ymer, and a deferred tool is never read as an
absent one.

An absent surface has one more reading on Claude Code: a sign-in that
has lapsed presents exactly as no ymer at all — the server contributes
zero tools. Before reading absence as "no ymer", run `claude mcp get
ymer`: a `Needs authentication` status is a lapsed sign-in, a store
reached but broken (the guard below; `claude mcp login ymer` is its fix),
and no such server is the absence the rule means.

Nothing is asked and nothing is configured beyond the state folder's
path. All four combinations are real installs: this run may mint into
ymer and save into `topics_history`, or mint into `tasks` and commit into
git, as readily as either pair.

**The state folder** is read the way `/ymer:setup` reads it, so this
skill and setup always read the same answer. Where its name comes from
depends on the harness this session runs on, told from the session's
own tools — never from which reading would find a folder. Where the harness writes
plugin options into this skill — Claude Code — it is the `ymer` plugin's
own option, written here as the harness loads this skill:

> State folder as configured: `${user_config.state_folder}`

That line is the whole answer. Resolve it from what it shows, and open
nothing to confirm what it says: no file and no command reads the value
better than this line, and the placeholder showing there is itself an
answer, never a sign to look elsewhere.

A path there is the state folder, used exactly as it reads — a leading
`~` is your home directory, kept unquoted at the front of the path
wherever a command uses it, so the shell expands it. The placeholder
itself, a dollar sign and braces still around `user_config.state_folder`,
means the option is unset: no folder resolves, and the guard below stops
the run.

Where the harness does not write plugin options into skills — Cowork —
the placeholder shows whatever the option holds, and the front's initial
instructions name the state folder instead. The folder must be one of
this session's connected folders, or sit inside one: list it through the
device's directory tool, then read the connected folders from the
device's own information (`connectedFolders`) — the same check setup
runs.

**Which history tracks it** is one reading, the same one setup runs:

```
git -C <state folder> rev-parse --is-inside-work-tree
```

Run it bare: the tool reports a non-zero exit and its message by itself,
so nothing is appended to capture the status.

`true` → git. A non-zero exit whose message says `not a git repository`
→ `topics_history`. Exit 127 — no `git` to run in this session → the
folder is not a git work tree: list it with this session's own file
tools, never another command, and a folder found there → `topics_history`,
one not found → the guard below. Any other outcome — a missing folder, or `false` with
exit 0, which a bare repository or a `.git` directory returns — is the
guard below. On Cowork a connected folder is visible to the
device's own shell and not to the container's, so run the reading there.

**Guard — environment failures have two doors, and a store that is
reached but broken is one of them.** Resolve in this order and stop at
the first failure: the node, then the state folder and its history, then
the coordinator. The backlog's door is capture's: its guard names the
node-side stops and the fix for each, restoring the node first, and
where the node is not reached that door is the whole answer — nothing
else is read. Everything else setup owns — no state folder named (the
placeholder on Claude Code, no path in the front's instructions on
Cowork), two instructions naming two different folders, a named folder
that is missing, out of this session's reach, or of a kind the reading
above does not name, a ymer call that errors,
a lapsed sign-in, a notebook that answers but lacks `tasks`, `tasks_log`
or `topics_history` — stops the run with one instruction: **run
`/ymer:setup`**, which ships in this plugin. Repair nothing here, never
guess a path, and never write a topic anywhere else: a run with no state
folder drains nothing, and its rows stay open for the run after setup
passes.

A coordinator that is simply **not there** is not a failure and stops
nothing: that is the rule doing its work, and the close says which store
took the pick. "Not there" means ymer's tool surface — never a table,
because the node is reached and a table it lacks is setup's to create,
and never the state folder, because the folder is required and its
absence is the guard above.

**Guard — nothing to drain.** First resolve `<front>` against the node:
`SELECT slug FROM fronts` must list it, and a slug it does not list stops
the run — the slug this front's instructions name is wrong, or its row
is missing — because through every query below a wrong slug reads as an
empty backlog, never as an error. Then: if the backlog holds no open row on this
front, or none but rows no exit can take — empty rows, and vision rows no
exit can place — there is no run to make. Say so and
stop, naming `/ymer:kaizen-capture` as the way to put a row there: no drain, no
commit, no mint. Both states are ordinary, a drained store and an
accumulation of rows nothing ever drains.

## The directed way of working

Summary deposits into a way of working the plugins direct, and routes by
that way's name conventions rather than by configuration:

- **One product = one Roadmap.** In ymer it is a project named
  `<Product> Roadmap`, found by a `projects list` name search for
  `Roadmap`; its tasks are what to do next and its description is the
  product's page. In the node's `tasks` table it is the `project` value a
  row carries, derived from the area with no lookup — so there is nothing
  to find and nothing to create.
- **Work about how you work belongs to no product**, so it goes to
  `Meta Roadmap` — the one Roadmap every machine has, created by
  `/ymer:setup` where there is ymer, and the `project` value `Meta
  Roadmap` in the node otherwise.
- **One place for a topic's artifacts**, laid out
  `<area>/YYYY/MM-DD-<topic>/` — one topic per folder in the state
  folder. `<area>` is the repo or product it belongs to, named by the
  drained rows' own context. **`meta` is the reserved area for process
  work**, and it is the area that routes to `Meta Roadmap`.
- **`Learning`** — learning tasks, one per subject gap: an optional
  project in ymer, the `project` value `Learning` in the node.

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
its own tables, so the statements below are the skill's to carry. The node
runs **one statement per `execute` call** and drops the rest of a
multi-statement call without a word.

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
   -- every front's open rows: this front's are the run's, the others'
   -- are named at the close and never drained here
   SELECT front, count(*) AS open
   FROM frictions
   WHERE status = 'open'
   GROUP BY front
   ORDER BY open DESC
   ```

   That census is the one read across fronts, so a run can say what sits
   on a front that has not drained it; every query after it scopes to
   this front.

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

   Then find the picks nobody has started, in **every store this session
   reaches** — they answer different questions, and on a machine whose
   fronts differ the node's rows are where another front's topics are:

   - `tasks list` on **each** Roadmap project, narrowed to the **open**
     group — the tasks nobody has started, where a freshly minted task
     lands (`projects list`, a name search for `Roadmap`, finds the
     projects). Summary mints every pick there and nothing remembers where
     earlier runs minted; the name convention is what finds them again.
   - The same listing on `Learning` (`projects list`, a name search for
     `Learning`) when one
     exists — exit 3 writes no artifact, so this is the only listing that
     can see those.
   - The node's own open tasks, whichever front minted them:

     ```sql
     SELECT id, name, project, area, status
     FROM tasks
     WHERE status IN ('new', 'reopened')
     ORDER BY id
     ```

   - The state folder, which finds the paths a task name does not carry.
     Where git tracks it, scan its files:

     ```
     grep -rl --include='request.md' 'source: kaizen-summary' <state folder>
     ```

     A folder holding nothing but its `request.md` is one nobody has
     started. (`--include` keeps the scan to the files carrying the
     marker; other artifacts may quote it.)

     Where `topics_history` tracks it, the same question is one query over
     this front's rows — the ones whose files sit in this front's folder —
     and it reads the same on every harness: a topic whose only saved
     artifact is a `request.md` summary wrote is one nobody has started:

     ```sql
     SELECT topic, area, min(saved_at) AS created
     FROM topics_history
     WHERE front = '<front>'
     GROUP BY topic, area
     HAVING count(DISTINCT artifact) = 1 AND max(artifact) = 'request.md'
        AND max(instr(body, 'source: kaizen-summary')) > 0
     ORDER BY created
     ```

   Run the listings for the stores this session reaches, and skip the
   others — a run with no ymer has no projects to list. All of them are a
   reminder at the moment it is relevant, never a gate. They are also
   what step 3's "one open friction-batch at a time" rule needs.

2. **Determine the run's shape.** Count the rows below the bar for their
   own topic (→ Three exits). **Ten or more ⇒ this run's pick is the
   friction-batch**; fewer ⇒ the normal pick. Moot rows ride along in the
   friction-batch but never count toward the ten; vision rows do neither;
   empty rows belong to no cluster and take no exit, so they stay open. The
   threshold exists so the run's shape is deterministic rather than a
   question you answer each time.

3. **Pick one thing** (→ The pick rule) and create or append its
   artifact — a topic, the friction-batch, or a learning task. Summary
   applies no diff itself and discards nothing: every exit deposits a
   durable artifact.

   A topic's artifact, the friction-batch's included, is its
   `request.md`: a file this run writes or appends at `<state
   folder>/<area>/YYYY/MM-DD-<topic>/request.md` with this session's own
   file tools, whichever history tracks the folder (→ `request.md`'s
   shape). Step 5 records that file in the history; a history row never
   stands in for the file.

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

   The ids are the cluster's, never the anchor's alone: this front's
   portion of it — the anchor where its `front` is this one, and every
   open row of this front anchored on it, by `anchor_id` or by the same
   `anchor_text` for a named cause — the rows step 1 read together. A
   pointer left open on a drained anchor reads as the sharpest signal
   next run, so after a drain an open pointer on a drained anchor means
   one of two things: captured after it, or another front's row, left
   open by step 3 for that front's own summary.

   `drained_to` names where the rows went: the topic as
   `<area>/YYYY/MM-DD-<topic>/` — the friction-batch's included — or the
   learning task's id. A friction-batch opened on 2026-09-26 reads
   `meta/2026/09-26-friction-batch/`: the date split after the year, the
   trailing slash kept. That topic is its folder under the state folder,
   whichever history tracks it, so the value never encodes the history.
   The call's `affected_rows` must equal the number of ids; fewer means an id
   is wrong or a row was already drained, so find out which before
   closing. The update names its rows, so a capture landing meanwhile in
   another session is never touched. Rows are never deleted, and every
   other row stays open: a friction left to accumulate produces a *better*
   root cause when its turn comes.

5. **Record what the pick wrote in the state folder's history** — state
   changes before announcements, so the close announces what is already
   durable. A learning-task pick writes no file and records nothing — its
   drain is already durable in the table.

   Where git tracks the folder, commit the topic's folder:

   ```
   git -C <state folder> add <area>/YYYY/MM-DD-<topic>/
   git -C <state folder> commit -m "kaizen: summary" -- <area>/YYYY/MM-DD-<topic>/
   ```

   **Pathspec-scope the commit**: the state folder can be written by
   concurrent sessions and a bare commit sweeps in their staged work.
   Verify scoped: `git -C <state folder> status` no longer
   lists the topic folder; foreign dirty paths may remain — leave them.

   Where `topics_history` tracks it, save the `request.md` the pick
   wrote — its whole text as it now stands in the file, read back from
   the file — as one row, with
   `phase` `kaizen_summary` and `front` this front's slug:

   ```sql
   INSERT INTO topics_history (topic, area, artifact, body, phase, front)
   SELECT '<YYYY-MM-DD-topic>', '<area>', 'request.md', new.body, 'kaizen_summary', '<front>'
   FROM (SELECT '<the whole file>' AS body) AS new
   WHERE new.body IS NOT (SELECT body FROM topics_history
                          WHERE front = '<front>' AND topic = '<YYYY-MM-DD-topic>'
                            AND area = '<area>' AND artifact = 'request.md'
                          ORDER BY id DESC LIMIT 1)
   ```

   `affected_rows` `1` is the save; `0` means the newest row already holds
   this text, so there was nothing to save. Quote the text the way capture
   does — a single-quoted SQL literal with each `'` inside it doubled. The
   table refuses `UPDATE` and `DELETE`: a wrong row is corrected by saving
   the right text again, never by editing a row.

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

**A row anchored to a topic that already exists** — two rules:

- **Topic created but nobody has started it** → fold the row into its
  `request.md` and drain it there. The same append the
  friction-batch uses; it costs nothing because nobody has read the file
  yet, and the intake gets strictly better.
- **Anything else** → leave the row open. If the topic shipped and the
  friction is gone, a later run carries the row to the friction-batch as
  moot. If it shipped and the friction persists, **that
  recurrence-after-ship is the sharpest signal kaizen produces** — a
  shipped change did not solve what it claimed — and it earns its own
  topic.

Everything wider than capture's bounded query is summary's, never
capture's: the listings above, drained rows read in full, and an ad-hoc
search when a row looks like a recurrence of something already drained —
`grep -r '<term>' <state folder>` where git tracks the folder, or, where
`topics_history` does, the same search over the newest save of each
artifact in this front's folder:

```sql
SELECT h.topic, h.area, h.artifact FROM topics_history h
WHERE h.front = '<front>'
  AND h.id = (SELECT max(id) FROM topics_history
              WHERE front = h.front AND topic = h.topic
                AND area = h.area AND artifact = h.artifact)
  AND h.body LIKE '%<term>%'
```

Narrow by time if that gets unwieldy, but set no default window — the
valuable catch is a friction recurring from a topic that shipped long
ago, and a window blinds it.

### Three exits, all artifact-depositing

**1. Its own topic.** The pick becomes a topic `YYYY-MM-DD-<name>` whose
`request.md` lands in this run's state store, plus **the topic's task**
minted at `new` in the Roadmap its area routes to: the topic has not been
thought through yet, so it belongs in the inbox, and a topic with no task
has no node — invisible to every listing until someone goes looking for
it.

**Order: route (below), then mint, then write `request.md`** — the
artifact carries the task's id, and a halt at routing then leaves nothing
behind. In ymer the mint is two calls, because the first does not show the
postcondition:

1. `tasks create` — the task's name, a description that is one line
   (what this is, plus where the `request.md` is), its membership in the
   Roadmap project the area routes to, and an effort estimate wherever
   you can size the pick: membership is the task's own property, written
   on the create the way the server's `help` says.
2. `tasks list` on that same project, narrowed by a name search for the
   task's name — the read-back.

Expect exactly one task, and the projects it names to include the target.

In the node the mint is one statement and one read-back, and the routing
is the `project` value itself:

```sql
INSERT INTO tasks (name, description, status, project, area, estimated_effort_minutes)
VALUES ('<name>', '<one line>', 'new', '<the derived project label>', '<area>', <minutes or NULL>)
```

```sql
SELECT id, name, status, project, area FROM tasks WHERE name = '<name>' ORDER BY id DESC LIMIT 1
```

The description **points at the artifact, never copies it**: `request.md`
already carries the root cause and the verbatim frictions, and a copy
would be the second store this whole arrangement exists to remove.

**Routing — which Roadmap.** The topic's area decides.

Where ymer is the coordinator, read it off the projects step 1 already
listed — no second call:

- **`meta` routes to `Meta Roadmap`** — the friction-batch always, and
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
> product, its tasks what to do next. Ymer is this session's coordinator,
> and a product's pool is a project there. Create one for the product
> this improvement belongs to, then run `/ymer:kaizen-summary` again. The
> rows are still open in the backlog; nothing was lost.

For `Meta Roadmap`, which is a floor rather than one of your products:

> Kaizen drains work about your own process into a project named
> `Meta Roadmap`, and the ymer this session reaches has none. Run
> `/ymer:setup`, which creates it, or create it in ymer yourself — then
> run `/ymer:kaizen-summary` again. The rows are still open in the backlog;
> nothing was lost.

Both halts are deliberate, and both belong to ymer alone: the coordinator
this session reaches is the one it deposits into, and quietly writing a
product's pick to the node instead would fork that product's pool across
two stores.

Where the node is the coordinator there is nothing to halt on. `project`
is a label derived from the area with no lookup — area `meta` → `Meta
Roadmap`, any other area → the area with its first letter upper-cased
plus ` Roadmap`, so `ymer-node` → `Ymer-node Roadmap`. It is a routing
label in ymer's words: where one product spans several areas, whoever
promotes the row into ymer corrects it there.

**Before minting, one look**: step 1 already listed the open picks in
every store this session reaches. If one of them is this same thing,
append the new rows to that topic's `request.md` instead of minting a
second task for it.

**2. The friction-batch.** Topic `YYYY-MM-DD-friction-batch`, under the
area `meta` — always, because its contents are your own process prose and
config by construction, so it always routes to `Meta Roadmap`. It takes
exactly two kinds of row:

- **Below-bar but actionable** — the change is derivable from the row
  itself plus a locating search, no design choices left, and the edit
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

"The product has a Roadmap" reads per coordinator, like every other
route: in ymer a `<Product> Roadmap` must exist, and a vision row for a
product with none waits, as capture says. In the node it always holds —
`project` is the derived label — so a vision cluster there drains like
any other pick, and writing the page itself happens wherever that page
lives, once the topic is promoted.

**Every other row stays open, accumulating.** If the friction-batch
swallowed everything, the backlog would empty at every run and the
frequency signal the pick rule rests on would be gone.

**One open friction-batch at a time.** If step 1's listings found a
`friction-batch` nobody has started, **append** this run's rows to
its `request.md` under the right heading; otherwise create a new one and
mint its task like any other pick. Once a friction-batch has been started
the next run opens a fresh one, and an appended-to friction-batch keeps
its *opening* date — every row carries its own.

**3. A learning task.** A learning-gap friction — probe 6 of the capture
battery explicitly invites them — exits here. Summary **never opens the
learning in-session**, exactly as it never runs the topic: it mints a
task, drains the rows to that task, and closes.

The task's name is the gap **as a goal-contract-shaped statement**, not a
bare subject name — "enough Postgres query planning to read an EXPLAIN and
fix the index myself", not "Postgres". The drained frictions ride the
description verbatim; status `new`; no dependency edge, since pattern
evidence blocks no specific topic. **Before minting, one look**: if one of
the open learning tasks names the same subject gap, append the rows to its
description instead — one task per subject gap is the shape this holds.

Where ymer is the coordinator the task goes in a project named `Learning`
— the one step 1 already listed, then the same create and read-back as
exit 1. **No `Learning` project?** Fold the pick into exit 1: mint it into
the Roadmap project its area routes to, as an ordinary task, name and
verbatim frictions unchanged. Degrade, never halt — that project is
optional practice, and its absence there means something.

Where the node is the coordinator the task is a `tasks` row with `project
= 'Learning'`, which needs nothing to exist first. The label keeps the
learning-gap signal out of the product work in the open listing, and
promoting the row into a ymer `Learning` project later is a copy. The
append above is this table's own write:

```sql
UPDATE tasks
SET description = rtrim(COALESCE(description, ''), char(10))
                  || char(10) || '<the new rows>',
    updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE id = <id>
```

`affected_rows` must equal `1`. The `COALESCE` is what keeps it an
append: `description` is nullable, and concatenating onto a NULL yields
NULL — the frictions already on that task gone, with nothing to say they
were there.

### `request.md`'s shape

`source: kaizen-summary` marks where the topic came from, `task:` is the
reverse pointer to the task minted beside it, and `created:` rather than
`started:` because the artifact predates anyone working the topic. Every
row is quoted as capture's line — the rendering query lives there — so
its id travels with it.

A normal pick:

```markdown
---
source: kaizen-summary
task: <task id>
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
task: <task id>
created: <YYYY-MM-DD>
---

# friction-batch

Frictions collected by `/ymer:kaizen-summary` to triage as one friction-batch.
The triage decides which are done — including that some are not.

## Below the bar for their own topic

<row as a line>

## Moot, or judged not worth doing

<row as a line>
```

The two headings carry summary's judgement into the topic — real input
for whoever works it. On a later append, add rows under the right heading
and leave `created:` at the opening date.

It is a file, `<area>/YYYY/MM-DD-<topic>/request.md` under the state
folder, written and appended as any file is — on a harness that edits a
connected folder by copying it out and writing it back, through those
tools — and recorded in the folder's history at step 5. A topic whose
`request.md` is already there is one to append to, never to write again:
the before-minting look is what finds it, and before writing a fresh
`request.md` check with this session's own file tools, never a shell
command, that no file is at that path — a file some earlier run
wrote but never recorded is invisible to the `topics_history` listing.

**An append MUST go through the file**: read `request.md` from the state
folder, insert the rows into it with this session's own file tools, and
only then save the row at step 5 from the file as it now stands. A row
saved with no edit to the file leaves the file and its history
disagreeing, and nothing reports it — the file is the artifact, and the
history only records what was written to it.

An append never writes blind. Under a heading that has another heading
after it — the first of the friction-batch's two — **count the heading
in the file before inserting under it.** This body carries verbatim prose
from real sessions: a row quoting the next heading's text would take the
new rows into the middle of that row while the write still reported
success. `1` is the only count that may be written on. `0` means the
heading is not in the file; `2` or more means the literal sits somewhere
besides its own heading. Both stop the write and send you to read the
file. Under the last heading there is nothing to insert before — but the
heading itself must be there, or the rows land under whichever heading
happens to be last.

Reading the history itself — this front's newest row for the artifact,
for the unchanged-save comparison or to see what the last save held —
follows the MCP result's size cap: ask for the length first, and window
the read when it is large rather than discovering the cap. It is never
the source of an append; the file is:

```sql
SELECT length(body) AS len FROM topics_history
WHERE front = '<front>' AND topic = '<YYYY-MM-DD-topic>'
  AND area = '<area>' AND artifact = 'request.md'
ORDER BY id DESC LIMIT 1
```

```sql
SELECT substr(body, <from>, 20000) AS window FROM topics_history
WHERE front = '<front>' AND topic = '<YYYY-MM-DD-topic>'
  AND area = '<area>' AND artifact = 'request.md'
ORDER BY id DESC LIMIT 1
```

### The close

```
Picked: <name> — <one line: what fixing it removes>
Topic:  <area>/YYYY/MM-DD-<name>/ (state folder, history in <git | node `topics_history`>)
Task:   <task name> (new, <Product> Roadmap in <ymer | node `tasks`>)
Next:   /brainstorm <name>

Still unstarted from earlier summaries:
  <other-name>   (<area>/YYYY/MM-DD-<other-name>/)
```

Naming the store on those two lines is the whole report the reach rule
owes: it is what tells you where to look, and what makes a run that
deposited somewhere unexpected visible the moment it happens.

`Next:` names `/brainstorm <name>` only when a `/brainstorm` skill is
loaded — the bare topic name, no date. With no such skill, drop the line:
the minted task is the handle. A learning-task pick names that task
instead, and a `/tutor`-style skill if one is loaded.

Repeating the older unstarted topics is deliberate: step 1 already
derives them, and the close is where they get read. If that list grows
long, the length is the signal — a felt failure earns a reminder, not a
guard.

## Remember

- Summary drains exactly one thing per run, and every exit deposits a
  durable artifact — kaizen applies no diff itself and discards nothing
- The coordinator is the default where this session reaches it: ymer
  else the node's `tasks` — resolved once, asked never. The state folder
  is required, and its history is git where it is a git work tree and
  the node's `topics_history` otherwise
- A store reached but broken, or no state folder at all, stops the run
  and names `/ymer:setup`; a coordinator that is simply absent stops
  nothing
- The task summary mints is a node for the topic, not a queue of
  frictions: the description points at the artifact and never copies it
- Cluster by root cause, never by symptom; vision rows cluster per
  product and never ride the friction-batch
- The area picks the Roadmap: `meta` → `Meta Roadmap`, anything
  else → that product's, with `Meta Roadmap` excluded from the candidates
- In ymer a missing Roadmap project halts the run and says what to
  create; in the node the Roadmap is a derived label and nothing can be
  missing
- Every run opens with a notebook backup, and the drain is one `UPDATE`
  by id to `drained` — rows are never deleted
- Summary records what it wrote in the state folder's history — a
  pathspec-scoped commit where git tracks it, one `topics_history` row
  per saved file otherwise; the backlog itself lives in no git tree
