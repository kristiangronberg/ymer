---
name: mint
description: Use to draw the next piece of work from the pool — score the new drops, rank the pool, take the top drop, read its product's Forward direction to fold in the drops that belong with it, and drain them into exactly one thing: a topic plus its task in the product's Roadmap, the friction-batch, or a learning task.
---

# Mint

A mint session over the whole pool, run with fresh context. It draws
**exactly one thing** from the pool and starts it as work.

**Announce at start:** "Mint — drawing from the pool."

The pool is the `pool` table in the notebook of a Ymer Node, reached
through the node's `notebook` tool. Drops are recorded by the
`ymer:capture` skill, which states the drop grammar and the kinds; this
skill never restates them, and needs no more of them than the queries
below carry. The one format both share is mint's own: the line a drop is
quoted as (→ `request.md`'s shape). Mint *draws* a drop, and the drop is
*drained*.

A mint works one front's drops. `<front>` below is this installation's
slug — the one capture writes on every drop — named the way `/ymer:setup`
reads it, so this skill and setup always read the same answer. Where the
harness writes plugin options into this skill — Claude Code — it is the
`ymer` plugin's `front` option, written here as the harness loads this
skill and read from this one line alone:

> Front as configured: `${user_config.front}`

A slug there is `<front>`; the placeholder itself, a dollar sign and
braces still around `user_config.front`, means none is named and the
guard below stops the run. Where the harness does not — Cowork — the
instructions this session started with name it, in any wording. Which
harness this is, is told from the session's own tools, never from any
text. Another front's
drops stay open for that front's own mint.

## Where this run deposits — the reach rule

Two stores answer two different questions. Resolve both once, here,
before the run starts:

- **The coordinator** — what tracks work and how topics are named there.
  Ymer's tool surface among this session's tools → its Roadmap projects,
  and every task this run creates is a ymer task. Absent → the node's
  `tasks` table, and every task is a row there. **The coordinator is the
  default where this session reaches it.**
- **The state store** — where a topic's artifacts live: the state folder,
  laid out `<area>/YYYY/MM-DD-<topic>/`, together with the history that
  tracks it. **The state folder is required**, and which history tracks
  it is read from the folder. Its own git repository → git: the run
  commits what it wrote. A folder in no git repository, or one a session
  without git finds → the node's `topics_history` table: the run saves
  each file it wrote there as a row, and commits nothing. A folder inside
  another git repository → the guard below.

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
path and the front's name. All four combinations are real installs: this run may create its
task in ymer and save into `topics_history`, or create it in `tasks` and
commit into git, as readily as either pair.

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
git -C <state folder> rev-parse --is-inside-work-tree --show-prefix
```

Run it bare: the tool reports a non-zero exit and its message by itself,
so nothing is appended to capture the status.

`true` alone, or `true` then an empty line — the tool may not show a
trailing empty line, and the prefix is empty at the top of a repository
— the folder is its own git repository → git. `true`, then a non-empty
prefix line — the folder is inside another git repository → the guard
below: a save there would commit into that other repository. A non-zero exit whose message says `not a git repository` —
a folder in no git repository → `topics_history`. Exit 127 — no `git` to
run in this session → git cannot track the folder: list it with this
session's own file tools, never another command, and a folder found
there → `topics_history`, one not found → the guard below. Any other
outcome — a missing folder, or `false` with exit 0, which a bare
repository or a `.git` directory returns — is the guard below. On Cowork
a connected folder is visible to the device's own shell and not to the
container's, so run the reading there.

**Guard — environment failures have two doors, and a store that is
reached but broken is one of them.** Resolve in this order and stop at
the first failure: the node, then the front's name, then the state
folder and its history, then the coordinator. The front's step here
reads its name alone; its row in `fronts` is read under Guard — nothing
to draw, before any draw. The pool's door is capture's: its
guard names the node-side stops and the fix for each, restoring the node first, and
where the node is not reached that door is the whole answer — nothing
else is read. Everything else setup owns — no front named (the
placeholder on Claude Code, none in the instructions on Cowork), two
instructions naming two different slugs, no state folder named (the
placeholder on Claude Code, no path in the front's instructions on
Cowork), two instructions naming two different folders, a named folder
that is missing, out of this session's reach, inside another git
repository, or of a kind the reading above does not name, a ymer call
that errors,
a lapsed sign-in, a notebook that answers but lacks `tasks`, `tasks_log`,
`topics_history` or `pool_scores` — stops the run with one instruction:
**run `/ymer:setup`**, which ships in this plugin. Repair nothing here, never
guess a path, and never write a topic anywhere else: a run with no state
folder drains nothing, and its drops stay open for the run after setup
passes.

A coordinator that is simply **not there** is not a failure and stops
nothing: that is the rule doing its work, and the close says which store
took the pick. "Not there" means ymer's tool surface — never a table,
because the node is reached and a table it lacks is setup's to create,
and never the state folder, because the folder is required and its
absence is the guard above.

**Guard — nothing to draw.** First resolve `<front>` against the node:
`SELECT slug FROM fronts` must list it, and a slug it does not list stops
the run naming `/ymer:setup` — the slug named is not the one this
installation registered, or its row is missing — because through every
query below a wrong slug reads as an empty pool, never as an error. Then: if the pool holds no open drop on
this front, or none but drops no exit can take — empty drops, vision
drops no exit can place, and drops anchored to a topic in flight —
started and not yet shipped — there is no run to make. Say so and stop, naming `/ymer:capture` as the way to
put a drop there: no drain, no commit, no task. Both states are
ordinary, a drained pool and an accumulation of drops nothing ever draws.

## The directed way of working

Mint deposits into a way of working the plugins direct, and routes by
that way's name conventions rather than by configuration:

- **One product = one Roadmap.** In ymer it is a project named
  `<Product> Roadmap`, found by a `projects list` name search for
  `Roadmap`; its tasks are the work in flight and its description is the
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
  drawn drops' own context. **`meta` is the reserved area for process
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
multi-statement call without a word. A result too large to come back
whole — a notebook read or a `projects list` — is read whole from
wherever the harness kept it, never from a preview of it.

## The run

1. **Back up, score, then orient.** Take a notebook backup first — `notebook`
   `create` — and note its id: the drain in step 4 changes drops no commit
   records. The backup is the whole-notebook safety net, not the drain's
   undo — `restore` puts back everything as it was and discards every drop
   any client inserted after it. A wrong drain is undone by its exact
   inverse instead, which touches nothing else:

   ```sql
   UPDATE pool
   SET status = 'open', drained_to = NULL, drained_at = NULL
   WHERE id IN (<the same ids>)
   ```

   Then score (→ Scoring): every open drop on this front that is not
   empty and has no `pool_scores` row gets one, before anything is ranked,
   as far as this run's scoring reaches — a drop it leaves unscored waits
   for a later run, named in the close. A pool with nothing new scores
   nothing, and the run goes straight on.

   Then survey the pool whole — never a recent tail: something that
   recurs slowly would fall out of view exactly as it matures into work
   worth doing. Whole means every open drop on this front is counted and
   every scored one ranked: the aggregates first and then the ranking,
   each through `notebook` `query`:

   ```sql
   -- every front's open drops: this front's are the run's, the others'
   -- are named at the close and never drained here
   SELECT front, count(*) AS open
   FROM pool
   WHERE status = 'open'
   GROUP BY front
   ORDER BY open DESC
   ```

   That census is the one read across fronts, so a run can say what sits
   on a front that has not drawn from it; every query after it scopes to
   this front.

   ```sql
   -- what is open: drops per kind and source, oldest and newest
   SELECT kind, source, count(*) AS drops, min(captured_on) AS oldest, max(captured_on) AS newest
   FROM pool
   WHERE status = 'open' AND front = '<front>'
   GROUP BY kind, source
   ORDER BY kind, drops DESC
   ```

   ```sql
   -- frequency: every anchor, its drops and how many are still open, drained ones counted
   SELECT COALESCE('#' || anchor_id, anchor_text) AS anchor, count(*) AS drops,
          sum(status = 'open') AS open, max(captured_on) AS latest
   FROM pool
   WHERE (anchor_id IS NOT NULL OR anchor_text IS NOT NULL) AND front = '<front>'
   GROUP BY anchor
   ORDER BY drops DESC
   ```

   ```sql
   -- the sharpest signal: open recurrences whose anchor was drained
   SELECT r.id, r.captured_on, r.kind, r.context, r.body, a.id AS anchor, a.drained_to
   FROM pool r JOIN pool a ON a.id = r.anchor_id
   WHERE r.status = 'open' AND a.status = 'drained' AND r.front = '<front>'
   ORDER BY r.id
   ```

   ```sql
   -- vision drops per product
   SELECT lower(product) AS product, count(*) AS drops
   FROM pool
   WHERE kind = 'vision' AND status = 'open' AND front = '<front>'
   GROUP BY lower(product)
   ORDER BY drops DESC
   ```

   Then the ranking: every scored open drop on this front, highest score
   first, twenty-five per page — read pages until the top drop is found
   (→ The pick rule), never the whole list. The score is computed here at
   every run and never stored. The `VALUES` list is the kind weights' one
   home — a retune is an edit to it, and the next run ranks with it
   without rewriting a row — and a kind it does not name, one a front
   added, weighs 1. `anchor` finds a drop's line in the frequency
   aggregate above, or its own `#<id>` line there when other drops recur
   on it; frequency is shown beside the score and never folded into it:

   ```sql
   WITH weight(kind, w) AS (VALUES ('bug', 20), ('vision', 9), ('idea', 5), ('learning', 3), ('friction', 1))
   SELECT p.id, p.kind, p.product, p.context,
          round(COALESCE(w.w, 1) * (s.direction_value + s.time_criticality + s.risk_reduction) * 1.0 / s.size, 1) AS score,
          COALESCE('#' || p.anchor_id, p.anchor_text) AS anchor,
          s.why, substr(COALESCE(p.title, p.body), 1, 200) AS lead
   FROM pool p
   JOIN pool_scores s ON s.drop_id = p.id
   LEFT JOIN weight w ON w.kind = p.kind
   WHERE p.status = 'open' AND p.front = '<front>' AND p.kind <> 'empty'
   ORDER BY score DESC, p.id
   LIMIT 25 OFFSET <n>
   ```

   A drop that becomes a candidate for the pick is read whole, together
   with the drops anchored on it — `WHERE id = <id> OR anchor_id = <id>`,
   or `WHERE anchor_text = '<text>'` for a named cause. The aggregates
   count; clustering is still a judgement made by reading.

   Its neighbours — open drops on this front that solve the same kind of
   problem without sharing its anchor — are found by searching the pool
   for the candidate's own terms, rarest first, `WHERE status = 'open'
   AND front = '<front>' AND kind <> 'empty' AND (title LIKE '%<term>%'
   OR body LIKE '%<term>%')`, and on the ranking pages already read. Its family drains
   with it wherever the family's other drops rank (→ step 4).

   Two exits take more than the top drop and its family, and the ranking
   pages do not surface those members, so they are read for the pick. A
   vision drop brings its product's whole vision cluster (→ Clustering),
   read twenty-five at a time, each body cut to its first 600 characters,
   until a page comes back short:

   ```sql
   SELECT id, captured_on, context, title, substr(body, 1, 600) AS body
   FROM pool
   WHERE kind = 'vision' AND status = 'open' AND front = '<front>'
     AND lower(product) = lower('<product>')
   ORDER BY id
   LIMIT 25 OFFSET <n>
   ```

   A friction-batch pick (→ Three exits) gathers its set from the
   ranking pages already read and from the open frictions scored small.
   The scorer's `why` is where a drop whose cause looks already gone says
   so — the moot ones. One page is a friction-batch's worth; read the
   next only when the first leaves the friction-batch short:

   ```sql
   SELECT p.id, p.context, s.why, substr(COALESCE(p.title, p.body), 1, 200) AS lead
   FROM pool p JOIN pool_scores s ON s.drop_id = p.id
   WHERE p.kind = 'friction' AND p.status = 'open' AND p.front = '<front>'
     AND s.size = 1
   ORDER BY p.id
   LIMIT 25 OFFSET <n>
   ```

   Then find this front's topics nobody has started, in **every store
   this session reaches** — they answer different questions, and the
   node's rows are where a front whose state folder git does not track
   keeps its history. Mint is per front, so another front's topics are
   that front's own mint's to see. A topic mint creates is in flight from the moment it exists, so
   what marks it unstarted is its folder, not its task:

   - The state folder. Where git tracks it, scan its files:

     ```
     grep -rl --include='request.md' 'source: mint' <state folder>
     ```

     A folder holding nothing but its `request.md` is one nobody has
     started. (`--include` keeps the scan to the files carrying the
     marker; other artifacts may quote it.)

     Where `topics_history` tracks it, the same question is one query over
     this front's rows — the ones whose files sit in this front's folder —
     and it reads the same on every harness: a topic whose only saved
     artifact is a `request.md` mint wrote is one nobody has started:

     ```sql
     SELECT topic, area, min(saved_at) AS created
     FROM topics_history
     WHERE front = '<front>'
     GROUP BY topic, area
     HAVING count(DISTINCT artifact) = 1 AND max(artifact) = 'request.md'
        AND max(instr(body, 'source: mint')) > 0
     ORDER BY created
     ```

   - `tasks list` on `Learning` (`projects list`, a name search for
     `Learning`) when one exists, narrowed to the **open** group — the
     learning tasks nobody has started. Exit 3 writes no artifact, so this
     is the only listing that can see those. In the node, the same:

     ```sql
     SELECT id, name, project, area, status
     FROM tasks
     WHERE project = 'Learning' AND status IN ('new', 'reopened')
     ORDER BY id
     ```

   Run the listings for the stores this session reaches, and skip the
   others — a run with no ymer has no projects to list. All of them are a
   reminder at the moment it is relevant, never a gate. They are also
   what step 3's "one open friction-batch at a time" rule needs.

2. **Pick the top drop** (→ The pick rule) — the highest-scored drop an
   exit can take, unless a written reason passes it over.

3. **Form the pick, then create or append its artifact.** Read the
   product's **Forward direction** once — the first settled section of
   its page, the `<Product> Roadmap` project's description; `Meta
   Roadmap`'s for a `meta` pick (fetch recipe and miss rule: the
   product-design skill § The product page). It decides two things and
   nothing else: which neighbouring open drops belong with the top one,
   and the shape the topic takes — the scope that moves the product the
   way its direction says. Ranking is not its job, and a product with no
   page, or a page with an empty Forward direction, forms the pick from
   the drops alone. Then create or append the artifact — a topic, the
   friction-batch, or a learning task (→ Three exits). Mint applies no
   diff itself and discards nothing: every exit deposits a durable
   artifact.

   A topic's artifact, the friction-batch's included, is its
   `request.md`: a file this run writes or appends at `<state
   folder>/<area>/YYYY/MM-DD-<topic>/request.md` with this session's own
   file tools, whichever history tracks the folder (→ `request.md`'s
   shape). Step 5 records that file in the history; a history row never
   stands in for the file.

   A cluster can span fronts: capture's recurrence check searches the
   whole pool, so a drop on this front may be anchored on another
   front's drop, and the candidate read in step 1 shows each drop's
   `front`. The pick takes this front's portion only — step 4 drains the
   drops whose `front` is `<front>`, and the other front's drops stay open
   for that front's own mint. Where the cause is shared, say so in a
   line of the artifact the pick writes.

4. **Drain the drops the pick took** — every one of them, in one
   `notebook` `execute`:

   ```sql
   UPDATE pool
   SET status = 'drained', drained_to = '<where they went>',
       drained_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
   WHERE status = 'open' AND id IN (<ids>)
   ```

   The ids are the cluster's, never the anchor's alone: this front's
   portion of it — the anchor where its `front` is this one, and every
   open drop of this front anchored on it, by `anchor_id` or by the same
   `anchor_text` for a named cause — the drops step 1 read together, the
   vision cluster or friction-batch set step 1 gathered for the pick, plus
   the neighbours step 3 folded in. A pointer left open on a drained
   anchor reads as the sharpest signal next run, so after a drain an open
   pointer on a drained anchor means one of two things: captured after
   it, or another front's drop, left open by step 3 for that front's own
   mint.

   `drained_to` names where the drops went: the topic as
   `<area>/YYYY/MM-DD-<topic>/` — the friction-batch's included — or the
   learning task's id. A friction-batch opened on 2026-09-26 reads
   `meta/2026/09-26-friction-batch/`: the date split after the year, the
   trailing slash kept. That topic is its folder under the state folder,
   whichever history tracks it, so the value never encodes the history.
   The call's `affected_rows` must equal the number of ids; fewer means an id
   is wrong or a drop was already drained, so find out which before
   closing. The update names its drops, so a capture landing meanwhile in
   another session is never touched. Drops are never deleted, and every
   other drop stays open: a friction left to accumulate produces a
   *better* root cause when its turn comes.

5. **Record what the pick wrote in the state folder's history** — state
   changes before announcements, so the close announces what is already
   durable. A learning-task pick writes no file and records nothing — its
   drain is already durable in the table.

   Where git tracks the folder, commit the topic's folder:

   ```
   git -C <state folder> add <area>/YYYY/MM-DD-<topic>/
   git -C <state folder> commit -m "<YYYY-MM-DD-topic>: mint" -- <area>/YYYY/MM-DD-<topic>/
   ```

   **Pathspec-scope the commit**: the state folder can be written by
   concurrent sessions and a bare commit sweeps in their staged work.
   Verify scoped: `git -C <state folder> status` no longer
   lists the topic folder; foreign dirty paths may remain — leave them.

   Where `topics_history` tracks it, save the `request.md` the pick
   wrote — its whole text as it now stands in the file, read back from
   the file — as one row, with
   `phase` `mint` and `front` this front's slug:

   ```sql
   INSERT INTO topics_history (topic, area, artifact, body, phase, front)
   SELECT '<YYYY-MM-DD-topic>', '<area>', 'request.md', new.body, 'mint', '<front>'
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

The six subsections below are reference material for steps 1–4 and 6 —
the numbered flow ends here.

### Scoring

A drop's **score** ranks it: its kind's weight times the sum of three
components — direction value, time criticality and risk reduction —
divided by a fourth, size. Each component is 1, 3 or 5, written once
into the drop's `pool_scores` row by a **scorer**: a subagent on the
cheapest model the harness offers — `haiku` on Claude Code — whose whole
world is its prompt. The score itself is computed by step 1's ranking
query at every run and never stored. A row is never revised: a changed
rubric, or a product's changed next steps, applies to drops scored after
the change, and older rows keep the numbers they were given.

The weights live in the ranking query's `VALUES` list — bug 20, vision 9,
idea 5, learning 3, friction 1 — and the rubric, what every 1, 3 and 5
means, lives in [`scorer.md`](scorer.md), the scorer's prompt. Each has
that one home, and a retune is an edit there. Bugs lead because of their
weight, not because of a rule above the formula.

Invoking this skill is the request to dispatch scorers: a standing
instruction to use subagents only when the user asks for them is met by
the invocation itself.

1. **The unscored drops** — their ids only, so this session reads none of
   their text:

   ```sql
   SELECT p.id
   FROM pool p LEFT JOIN pool_scores s ON s.drop_id = p.id
   WHERE p.status = 'open' AND p.front = '<front>' AND p.kind <> 'empty'
     AND s.drop_id IS NULL
   ORDER BY p.id
   ```

   None listed → scoring is done for this run.
2. **The next steps.** Where ymer is the coordinator, take every product
   page's `## Next steps` section from a `projects list` name search for
   `Roadmap` asking for each project's name and description — the list
   step 3 and the routing read too. Write one block per product: its
   name, then its bullets as they stand, or `none` where the heading is
   there with no bullet under it. A page with no `## Next steps` heading
   adds no block — it names no next step for a drop to match, and the
   close names it, so a product page that lost its heading is seen. A
   list call that fails or comes back cut short is a block that could not
   be read: score nothing this run and go to step 4, so the run ranks the
   rows already written and names what it left unscored. Scores are
   written once, so an unreadable block must never be read as an empty
   one. Where the node is the coordinator there are no pages
   (the product-design skill § The product page), and the block says
   there are no next steps.
3. **Dispatch.** Split the ids into lists of at most 100, oldest first,
   and hand each list to one scorer: the text of `scorer.md` verbatim,
   then the next-steps block and the list. A scorer is a fresh subagent,
   never a fork: a fork inherits this session's context and model, which
   is exactly what scoring keeps out. A scorer reads text other sessions
   wrote, so where the harness lets a dispatch name the subagent's tools,
   give it the node's `notebook` tool and nothing else — no shell, no
   file writes. Before the first dispatch, list the notebook's tables
   (`notebook` `tables`). Dispatch up to four at a time, and wait for
   every scorer's answer before step 4 — never rank while one is still
   out.
4. **Read back.** List the tables again where scorers ran: a table that
   appeared or vanished meanwhile means a scorer wrote beyond its rows —
   stop the run before ranking, name the difference, and hand it to
   capture; the backup step 1 took is the way back. Then run step 1's
   query again. An id it still lists was not written — a refused
   statement, a malformed row, a scorer that stopped — and gets one more
   try, scored in-session (→ Fallback), unless step 2 found a block it
   could not read: then no id is scored this run. An id still listed after that
   stays unscored until a later run; it is never ranked on a guess. The
   draw is then made among the scored drops alone: where ids stay
   unscored, say so before drawing — the ranking leaves them out — and
   keep the ids for the close. Where the ranking holds no drop at all
   while open drops wait unscored, stop: draw nothing, and say how many
   wait and why scoring did not reach them. A judgement pick over
   unscored drops is never the way around an empty ranking. Keep each
   scorer's note on the drops that were hard to score: the close hands it
   to capture.

**Fallback — score in-session.** Where no subagent can be dispatched — the
tool is absent, or a spawn is refused at the permission layer — this
session scores the unscored drops itself: it reads `scorer.md` and
follows it as a scorer would, ten drops at a time and at most 100 drops
in one run, oldest first, step 4's one more try counted inside that
bound. The rest stay unscored for a later run, under step 4's rules for
drops left unscored, and the close says scoring ran in-session. The rows
are the same rows, so the ranking stays one formula on every front.

### Clustering

A **cluster** is a named root cause plus the drops whose 5-Whys
terminates at it. Cluster by root cause, never by symptom and never by
affected area — the drop-records-the-cause rule, extended to the group.
A bug's cluster is the thing that is broken and every drop that saw it
break.

**Vision drops cluster per product instead**: they carry no root cause
to terminate at, and one product's direction is what their drain
writes. A product's vision drops are one cluster however unrelated their
contents, and they never join a friction cluster.

Clustering is something mint *does while reading*, and names in a
`request.md` when several drops share a cause — never written to disk or
to the table as a structure, so nothing persists between runs to drift.
The anchors capture records are evidence for a cluster, not the cluster:
drops with different anchors can terminate at one root cause. Which
neighbours beyond the cluster ride along is step 3's, read off the
Forward direction.

### The pick rule

**The top drop is the highest-scored drop an exit can take.** Walk the
ranking from its head; the first drop an exit can take is the top drop.
The rules for a drop anchored to a topic that already exists, below,
act on the drop the walk lands on. Anchored to an unstarted topic, it
folds into that topic, and that fold is the run's one draw. Anchored to
a topic in flight, it is passed by, and so is a vision drop no exit can
place (→ Three exits); the walk goes on. A recurrence of something that
shipped is never passed by under these rules, and it is drawn above a
higher-ranked drop only through the written reason below. One formula
ranks — no tier, threshold or ladder sits above it, and bugs lead
because of their weight. A top drop that might be a bug and might be trivial errs toward
being drawn: drawing it is how the doubt is settled.

**Passing the top drop over takes a written reason.** The score is the
default, never a cage: draw something else when reading the top drop
shows the ranking is wrong about it. Weigh what the score cannot see:

- **What each occurrence costs.** A silent failure costs more than a felt
  one — it looks exactly like a clean pass, and its cost lands later on a
  session with no way to know.
- **How often it bites.** The frequency shown beside the score is
  evidence, not a ranking key: one drop describing an expensive silent
  failure outranks six drops of mild friction.
- **Whether the cause is understood well enough to act.** Drops naming a
  symptom whose cause is still fuzzy make a better topic once they have
  gathered more faces — a reason to pick something else this run, never a
  reason to never pick it.
- **The sharpest signal.** An open recurrence whose anchor was drained
  and whose topic has shipped, ranked below the top, may be drawn over
  it.

Write the reason into the pick's `request.md`, one line per drop passed
over (→ `request.md`'s shape), and hand it to capture at the close.

**A drop anchored to a topic that already exists** — two rules:

- **Topic created but nobody has started it** → fold the drop into its
  `request.md` and drain it there. The same append the
  friction-batch uses; it costs nothing because nobody has read the file
  yet, and the intake gets strictly better.
- **Anything else** → leave the drop open. If the topic shipped and what
  it observed is gone, a later run carries the drop to the friction-batch
  as moot. If it shipped and the observation persists, **that
  recurrence-after-ship is the sharpest signal the pool gives** — a
  shipped change did not solve what it claimed — and it earns its own
  topic.

Everything wider than capture's bounded query is mint's, never
capture's: the listings above, drained drops read in full, and an ad-hoc
search when a drop looks like a recurrence of something already drained —
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
valuable catch is something recurring from a topic that shipped long
ago, and a window blinds it.

### Three exits, all artifact-depositing

**1. Its own topic.** The pick becomes a topic `YYYY-MM-DD-<name>` whose
`request.md` lands in this run's state store, plus **the topic's task**
created at `doing` in the Roadmap its area routes to: a task exists only
where work starts, and this one starts now — the next session on it is
its brainstorm.

**Order: route (below), then create the task, then write `request.md`** —
the artifact carries the task's id, and a halt at routing then leaves
nothing behind. In ymer it is three calls, because the first does not
show the postcondition:

1. `tasks create` — the task's name, a description that is one line
   (what this is, plus where the `request.md` is), its membership in the
   Roadmap project the area routes to, and an effort estimate wherever
   you can size the pick: membership is the task's own property, written
   on the create the way the server's `help` says.
2. `tasks update` — **claim** it, the coordinator's transition into the
   `doing` group.
3. `tasks list` on that same project, narrowed by a name search for the
   task's name — the read-back.

Expect exactly one task, in the `doing` group, and the projects it names
to include the target.

In the node it is one statement and one read-back, and the routing
is the `project` value itself:

```sql
INSERT INTO tasks (name, description, status, project, area, estimated_effort_minutes)
VALUES ('<name>', '<one line>', 'claimed', '<the derived project label>', '<area>', <minutes or NULL>)
```

```sql
SELECT id, name, status, project, area FROM tasks WHERE name = '<name>' ORDER BY id DESC LIMIT 1
```

The description **points at the artifact, never copies it**: `request.md`
already carries the root cause and the verbatim drops, and a copy
would be the second store this whole arrangement exists to remove.

**Routing — which Roadmap.** The topic's area decides.

Where ymer is the coordinator, read it off the projects a `projects
list` name search for `Roadmap` returns — the same list step 3's
Forward direction was read from, so no second call:

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

> Mint draws into a project named `<Product> Roadmap` — one per
> product, its tasks the work in flight. Ymer is this session's
> coordinator, and a product's Roadmap is a project there. Create one for
> the product this work belongs to, then run `/ymer:mint` again. The
> drops are still open in the pool; nothing was lost.

For `Meta Roadmap`, which is a floor rather than one of your products:

> Mint draws work about your own process into a project named
> `Meta Roadmap`, and the ymer this session reaches has none. Run
> `/ymer:setup`, which creates it, or create it in ymer yourself — then
> run `/ymer:mint` again. The drops are still open in the pool; nothing
> was lost.

Both halts are deliberate, and both belong to ymer alone: the coordinator
this session reaches is the one it deposits into, and quietly writing a
product's pick to the node instead would fork that product's work across
two stores.

Where the node is the coordinator there is nothing to halt on. `project`
is a label derived from the area with no lookup — area `meta` → `Meta
Roadmap`, any other area → the area with its first letter upper-cased
plus ` Roadmap`, so `ymer-node` → `Ymer-node Roadmap`. It is a routing
label in ymer's words: where one product spans several areas, whoever
promotes the row into ymer corrects it there.

**Before creating, one look**: step 1 already listed the unstarted topics
in every store this session reaches. If one of them is this same thing,
append the new drops to that topic's `request.md` instead of creating a
second task for it.

**2. The friction-batch.** A shape mint may choose when the pick is a
set of small frictions rather than one cause worth a topic: topic
`YYYY-MM-DD-friction-batch`, under the area `meta` — always, because its
contents are your own process prose and config by construction, so it
always routes to `Meta Roadmap`. It takes exactly two kinds of drop:

- **Below-bar but actionable** — the change is derivable from the drop
  itself plus a locating search, no design choices left, and the edit
  surface is your process prose or config, never a project's code.
- **Moot or not worth doing** — the cause is gone, was handled elsewhere,
  or is judged not worth acting on. Never drain such a drop silently: the
  work that follows gets the final say on whether it is done, including
  that it is not.

**Bugs and vision drops are neither kind.** A bug is drawn as its own
pick; a product's direction is not the friction-batch's edit
surface. A product's vision drops drain as exit 1 above, as a **carve
topic**: an ordinary topic in that product's area whose `request.md`
names the product and carries the drops verbatim, and whose work writes
them into the product's own description. That is the one door through
which vision material reaches a product page.

"The product has a Roadmap" reads per coordinator, like every other
route: in ymer a `<Product> Roadmap` must exist, and a vision drop for a
product with none waits, as capture says. In the node it always holds —
`project` is the derived label — so a vision cluster there drains like
any other pick, and writing the page itself happens wherever that page
lives, once the topic is promoted.

**Every other drop stays open, accumulating.** If the friction-batch
swallowed everything, the pool would empty at every run and the
frequency signal shown beside the score would be gone.

**One open friction-batch at a time.** If step 1's listings found a
`friction-batch` nobody has started, **append** this run's drops to
its `request.md` under the right heading; otherwise create a new one and
its task like any other pick. Once a friction-batch has been started
the next run opens a fresh one, and an appended-to friction-batch keeps
its *opening* date — every drop carries its own.

**3. A learning task.** A `learning` drop exits here. Mint **never opens
the learning in-session**, exactly as it never runs the topic: it
creates a task, drains the drops to that task, and closes.

The task's name is the gap **as a goal-contract-shaped statement**, not a
bare subject name — "enough Postgres query planning to read an EXPLAIN and
fix the index myself", not "Postgres". The drained drops ride the
description verbatim; status in the **open** group — an engagement, not
a mint, moves it to `doing`; no dependency edge, since pattern evidence
blocks no specific topic. **Before creating, one look**: if one of the
open learning tasks names the same subject gap, append the drops to its
description instead — one task per subject gap is the shape this holds.

Where ymer is the coordinator the task goes in a project named `Learning`
— the one step 1 already listed, then the create and read-back of exit
1 without its claim. **No `Learning` project?** Fold the pick into exit
1: create it in the Roadmap project its area routes to, as an ordinary
task, name and verbatim drops unchanged. Degrade, never halt — that
project is optional practice, and its absence there means something.

Where the node is the coordinator the task is a `tasks` row with `project
= 'Learning'` and `status = 'new'`, which needs nothing to exist first.
The label keeps the learning-gap signal out of the product work in the
listing, and promoting the row into a ymer `Learning` project later is a
copy. The append above is this table's own write:

```sql
UPDATE tasks
SET description = rtrim(COALESCE(description, ''), char(10))
                  || char(10) || '<the new drops>',
    updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE id = <id>
```

`affected_rows` must equal `1`. The `COALESCE` is what keeps it an
append: `description` is nullable, and concatenating onto a NULL yields
NULL — the drops already on that task gone, with nothing to say they
were there.

### `request.md`'s shape

`source: mint` marks where the topic came from, `task:` is the
reverse pointer to the task created beside it, and `started:` is the
day it was drawn. Every drop is quoted as one line, ending in its id, so
the id travels with it:

```
- <captured_on> · <source>@<context> — <text> (#<id>)
```

`<text>` is `<kind>: ` followed by the title where the drop has one and
the body where it has none — `vision(<product>): ` for a vision drop.
A recurrence adds `recurrence of #<anchor_id>` or `recurrence of
<anchor_text>`, followed by ` — <body>` when the body is not empty. One
query renders it:

```sql
SELECT '- ' || captured_on || ' · ' || source || '@' || context || ' — ' ||
       CASE WHEN kind = 'vision' THEN 'vision(' || product || ')' ELSE kind END || ': ' ||
       CASE
         WHEN anchor_id IS NOT NULL OR anchor_text IS NOT NULL THEN 'recurrence of ' ||
           COALESCE('#' || anchor_id, anchor_text) ||
           CASE WHEN body = '' THEN '' ELSE ' — ' || body END
         ELSE COALESCE(title, body)
       END || ' (#' || id || ')' AS line
FROM pool
WHERE id IN (<ids>)
ORDER BY id
```

A normal pick:

```markdown
---
source: mint
task: <task id>
started: <YYYY-MM-DD>
---

# <topic-name>

**Root cause.** <the shared cause the drops terminate at, one or two sentences> (`inferred:` — synthesis; no code in view)

**Direction.** <how the pick moves the product the way its Forward direction says, or "no Forward direction to read">

**Passed over.** #<id> (score <n>) — <the reason>

Drops, verbatim from the pool:

<drop as a line>
<drop as a line>
```

The `inferred:` mark is the default on the root-cause line: mint
synthesizes with no code in view, so the cause is reasoned rather than
observed, while the verbatim drops below it stay unmarked observations.

A **Passed over** line is written only where the pick passed the top
drop over — one line per drop passed over, with the reason the pick rule
asks for — so the topic's brainstorm reads why this pick and not the top
one. A friction-batch carries its Passed over lines directly under its
intro paragraph (`Frictions drawn by …`), before `## Below the bar for
their own topic`. An append adds one line per newly passed-over drop
beneath the Passed over lines already there, and leaves them and the
rest of the file as they are.

The friction-batch:

```markdown
---
source: mint
task: <task id>
started: <YYYY-MM-DD>
---

# friction-batch

Frictions drawn by `/ymer:mint` to triage as one friction-batch.
The triage decides which are done — including that some are not.

## Below the bar for their own topic

<drop as a line>

## Moot, or judged not worth doing

<drop as a line>
```

The two headings carry mint's judgement into the topic — real input
for whoever works it. On a later append, add drops under the right
heading and leave `started:` at the opening date.

It is a file, `<area>/YYYY/MM-DD-<topic>/request.md` under the state
folder, written and appended as any file is — on a harness that edits a
connected folder by copying it out and writing it back, through those
tools — and recorded in the folder's history at step 5. A topic whose
`request.md` is already there is one to append to, never to write again:
the before-creating look is what finds it, and before writing a fresh
`request.md` check with this session's own file tools, never a shell
command, that no file is at that path — a file some earlier run
wrote but never recorded is invisible to the `topics_history` listing.

**An append MUST go through the file**: read `request.md` from the state
folder, insert the drops into it with this session's own file tools, and
only then save the row at step 5 from the file as it now stands. A row
saved with no edit to the file leaves the file and its history
disagreeing, and nothing reports it — the file is the artifact, and the
history only records what was written to it.

An append never writes blind. Under a heading that has another heading
after it — the first of the friction-batch's two — **count the heading
in the file before inserting under it.** This body carries verbatim prose
from real sessions: a drop quoting the next heading's text would take the
new drops into the middle of that drop while the write still reported
success. `1` is the only count that may be written on. `0` means the
heading is not in the file; `2` or more means the literal sits somewhere
besides its own heading. Both stop the write and send you to read the
file. Under the last heading — or at the end of a normal pick's file,
which has none — there is nothing to insert before — but a heading the
append names must be there, or the drops land under whichever heading
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
Picked: <name> — <one line: what doing it removes or builds>
Topic:  <area>/YYYY/MM-DD-<name>/ (state folder, history in <git | node `topics_history`>)
Task:   <task name> (doing, <Product> Roadmap in <ymer | node `tasks`>)
Scored: <n> new drops (<n> scorers | in this session | next steps unreadable)
Unscored: <m> left out of the ranking (ids <the first ten>)
Next:   /brainstorm <name>

Still unstarted from earlier mints:
  <other-name>   (<area>/YYYY/MM-DD-<other-name>/)
```

Naming the store on those two lines is the whole report the reach rule
owes: it is what tells you where to look, and what makes a run that
deposited somewhere unexpected visible the moment it happens.

`Next:` names `/brainstorm <name>` only when a `/brainstorm` skill is
loaded — the bare topic name, no date. With no such skill, drop the line:
the task is the handle. A learning-task pick names that task instead,
and a `/tutor`-style skill if one is loaded.

Repeating the older unstarted topics is deliberate: step 1 already
derives them, and the close is where they get read. If that list grows
long, the length is the signal — a felt failure earns a reminder, not a
guard.

`Scored:` says how many drops this run scored and by whom — scorers, or
this session where scoring fell back (→ Scoring); `0 new drops` where
there were none, and `next steps unreadable` where step 2 of Scoring
scored nothing for that reason; `pages without next steps: <names>`
follows wherever step 2 found a page with no `## Next steps` heading.
`Unscored:` is written only where drops
stayed unscored: how many and the first ten ids, so the reader knows
this run's pick came from a ranking that leaves them out. A run that stopped
on an empty ranking closes with these two lines and the reason, and
picks nothing.

**Capture block:** invoke the `ymer:capture` skill — source
`mint`. The battery, the drop grammar and the write live in that skill
alone. Hand it, by name, what this run's scoring showed:

- every scorer's note on the drops that were hard to score, as the
  scorer wrote it;
- the ids left unscored, the first ten, as the `Unscored:` line names
  them;
- this session's own answer to "Did the scoring look reasonable — would
  you have drawn the top drop yourself? If not, name the drop, the
  component that looked wrong, and what it should have been." A top drop
  passed over is always a "no", with its reason.

## Remember

- Mint draws exactly one thing per run, and every exit deposits a
  durable artifact — mint applies no diff itself and discards nothing
- Every run scores what is new, then draws the highest-scored drop an
  exit can take — bugs lead by their weight, and passing the top drop
  over takes a written reason. The product's Forward direction forms the
  pick — its neighbours and its shape — and never ranks it
- A score's components are written once and the score is computed at the
  draw: the weights in step 1's `VALUES` list, the rubric in `scorer.md`,
  each its one home
- The coordinator is the default where this session reaches it: ymer
  else the node's `tasks` — resolved once, asked never. The state folder
  is required, and its history is git where it is its own git
  repository and the node's `topics_history` where it is in no git
  repository or the session has no git; one inside another git
  repository stops the run at the guard
- A store reached but broken, no front named, or no state folder at
  all, stops the run at the environment guard and names `/ymer:setup`;
  a front `fronts` does not list stops it at Guard — nothing to draw,
  before any draw, naming `/ymer:setup` too; a coordinator that is simply
  absent stops nothing
- The task mint creates is the topic, created at `doing` where its work
  starts: the description points at the artifact and never copies it
- Cluster by root cause, never by symptom; vision drops cluster per
  product and never ride the friction-batch
- The area picks the Roadmap: `meta` → `Meta Roadmap`, anything
  else → that product's, with `Meta Roadmap` excluded from the candidates
- In ymer a missing Roadmap project halts the run and says what to
  create; in the node the Roadmap is a derived label and nothing can be
  missing
- Every run opens with a notebook backup, and the drain is one `UPDATE`
  by id to `drained` — drops are never deleted
- Mint records what it wrote in the state folder's history — a
  pathspec-scoped commit where git tracks it, one `topics_history` row
  per saved file otherwise; the pool itself lives in no git tree
