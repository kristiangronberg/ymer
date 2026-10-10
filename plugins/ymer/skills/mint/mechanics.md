# Mint: mechanics

The mechanics of the mint skill: the SQL it runs over the node's
notebook, the commands it runs over the state folder, the coordinator
calls it names, and how each harness reads the front and the state
folder. The headings are `SKILL.md`'s own; read a section's entries at
the moment that section runs.

Contents:

- The front, the state folder and the coordinator: Cowork's readings,
  the home directory in a path, where the kind is read, a lapsed sign-in
- Nothing to draw: the fronts check
- The run: the backup's inverse, the census and the aggregates, the
  ranking, the candidate reads, the vision cluster, the friction set,
  the unstarted listings, the drain, the commit
- Scoring: the unscored ids, the next-steps block, the dispatch, the
  read-back, the fallback's bounds
- The pick rule: the recurrence search
- Three exits, all artifact-depositing: the task in ymer and in the
  node, the node's Roadmap label, the learning task
- `request.md`'s shape: the drop line and its query, the two templates,
  writing the file

## The front, the state folder and the coordinator

**The front on Cowork.** The instructions this session started with
name the slug, in any wording.

**A home directory in the state folder's path.** A leading `~` is your
home directory, kept unquoted at the front of the path wherever a
command uses it, so that the shell expands it.

**The state folder on Cowork.** The placeholder line shows whatever the
option holds, and the front's initial instructions name the folder
instead. The folder must be one of this session's connected folders, or
sit inside one: list it through the device's directory tool, then read
the connected folders from the device's own information
(`connectedFolders`), the same check setup runs.

**Where the kind is read.** Run the operations contract's reading
through whatever reaches the folder. On Cowork a connected folder is
visible to the device's own shell and not to the container's, so the
reading runs there.

**A lapsed sign-in on Claude Code.** A sign-in that has lapsed presents
exactly as no ymer at all: the server contributes zero tools. Before
reading an absent tool surface as no ymer, run `claude mcp get ymer`. A
`Needs authentication` status is a lapsed sign-in, a store reached but
broken, which stops the run naming `/ymer:setup` (`claude mcp login ymer`
is its fix); no such server is the absence the coordinator rule means.

## Nothing to draw

Through `notebook` `query`:

```sql
SELECT slug FROM fronts
```

`<front>` must be among the slugs listed.

## The run

**Step 1, the backup's inverse.** A wrong drain is undone by this, over
the same ids, in one `notebook` `execute`:

```sql
UPDATE pool
SET status = 'open', drained_to = NULL, drained_at = NULL
WHERE id IN (<the same ids>)
```

**Step 1, the census and the aggregates**, each through `notebook`
`query`:

```sql
-- every front's open drops: this front's are the run's, the others'
-- are named at the close and never drained here
SELECT front, count(*) AS open
FROM pool
WHERE status = 'open'
GROUP BY front
ORDER BY open DESC
```

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

**Step 1, the ranking**: every scored open drop on this front, highest
score first, twenty-five per page. The `VALUES` list is the kind
weights' one home: a retune is an edit to it, and a kind it does not
name weighs 1. `anchor` finds a drop's line in the frequency aggregate
above, or its own `#<id>` line there when other drops recur on it:

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

**Step 1, a candidate and its neighbours.** A candidate is read whole
with the drops anchored on it, `WHERE id = <id> OR anchor_id = <id>`, or
`WHERE anchor_text = '<text>'` for a named cause. Its neighbours are
searched with `WHERE status = 'open' AND front = '<front>' AND kind <>
'empty' AND (title LIKE '%<term>%' OR body LIKE '%<term>%')`, one term
at a time, rarest first.

**Step 1, a vision pick's cluster**, read twenty-five at a time, each
body cut to its first 600 characters, until a page comes back short:

```sql
SELECT id, captured_on, context, title, substr(body, 1, 600) AS body
FROM pool
WHERE kind = 'vision' AND status = 'open' AND front = '<front>'
  AND lower(product) = lower('<product>')
ORDER BY id
LIMIT 25 OFFSET <n>
```

**Step 1, a friction-batch pick's set.** The scorer's `why` is where a
drop whose cause looks already gone says so, the moot ones. One page is
a friction-batch's worth; read the next only when the first leaves the
friction-batch short:

```sql
SELECT p.id, p.context, s.why, substr(COALESCE(p.title, p.body), 1, 200) AS lead
FROM pool p JOIN pool_scores s ON s.drop_id = p.id
WHERE p.kind = 'friction' AND p.status = 'open' AND p.front = '<front>'
  AND s.size = 1
ORDER BY p.id
LIMIT 25 OFFSET <n>
```

**Step 1, the unstarted topics in the state folder**, whatever its
kind, with whatever reaches the folder. First find the `request.md`
files under it that carry `source: mint`. Where a shell reaches the
folder, this session's own or a remote device's:

```
grep -rl --include='request.md' 'source: mint' <state folder>
```

Exit 1 with no output is no hit. Exit 2 or above means the search may be
incomplete: use the hits printed so far and say the search was partial,
or search again with the file tools; never read it as none unstarted. Where no shell reaches the folder, ask the same
question with this session's own list and search tools. Keep the search
to the `request.md` files: other artifacts may quote the marker.

Then, for each hit, list that `request.md`'s folder:

```
ls -A <folder>
```

or the file tools' own listing of it where no shell reaches the folder.
The folder is unstarted when the listing shows exactly `request.md`. The
listing must show `request.md` itself, since the search just found it
there: a listing that does not (a refused shell, a wrong path) is a
broken read, never an empty folder. List it again the other way, file
tools or shell, and never read it as "none unstarted". A folder listing
`request.md` beside any other artifact is started.

**Step 1, the unstarted learning tasks.** In ymer: `tasks list` on the
`Learning` project (`projects list`, a name search for `Learning`) when
one exists, narrowed to the **open** group. In the node:

```sql
SELECT id, name, project, area, status
FROM tasks
WHERE project = 'Learning' AND status IN ('new', 'reopened')
ORDER BY id
```

**Step 4, the drain**, in one `notebook` `execute`:

```sql
UPDATE pool
SET status = 'drained', drained_to = '<where they went>',
    drained_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE status = 'open' AND id IN (<ids>)
```

`drained_to` for a topic is its folder under the state folder, the date
split after the year and the trailing slash kept: a friction-batch
opened on 2026-09-26 reads `meta/2026/09-26-friction-batch/`. That
names the folder whichever history keeps it, so the value never encodes
the history. The call's `affected_rows` must equal the number of ids;
fewer means an id is wrong or a drop was already drained, so find out
which before closing. The update names its drops, so a capture landing
meanwhile in another session is never touched.

**Step 5, the commit**, where git keeps the state folder:

```
git -C <state folder> add <area>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "<YYYY-MM-DD-topic>: mint" -- <area>/YYYY/MM-DD-<topic>/
```

The pathspec scopes both halves. Verify it scoped:
`git -C <state folder> status` no longer lists the topic folder; foreign
dirty paths may remain, and are left alone.

## Scoring

**Step 1, the unscored ids:**

```sql
SELECT p.id
FROM pool p LEFT JOIN pool_scores s ON s.drop_id = p.id
WHERE p.status = 'open' AND p.front = '<front>' AND p.kind <> 'empty'
  AND s.drop_id IS NULL
ORDER BY p.id
```

**Step 2, the next-steps block.** Where ymer is the coordinator, take
every product page's `## Next steps` section from a `projects list` name
search for `Roadmap`, asking for each project's name and description:
the same list step 3 of the run and the routing read too. Write one
block per product: its name, then its bullets as they stand, or `none`
where the heading is there with no bullet under it.

**Step 3, the dispatch.** Split the ids into lists of at most 100,
oldest first, one list per scorer. A scorer runs on the cheapest model
the harness offers, `haiku` on Claude Code. It is a fresh subagent,
never a fork: a fork inherits this session's context and model, which
is exactly what scoring keeps out. A scorer reads text other sessions
wrote, so where the harness lets a dispatch name the subagent's tools,
give it the node's `notebook` tool and nothing else: no shell, no file
writes. Before the first dispatch, list the notebook's tables
(`notebook` `tables`). Dispatch up to four at a time.

**Step 4, the read-back.** Where scorers ran, list the tables again and
compare them with the list taken before the first dispatch; then run
step 1's query again.

**The fallback's bounds.** In-session scoring takes ten drops at a time
and at most 100 drops in one run, oldest first, read-back's one more try
counted inside that bound. The rest stay unscored for a later run.

## The pick rule

**The recurrence search**, through whatever shell reaches the folder,
whatever its kind:

```
grep -r --exclude-dir=pre-image '<term>' <state folder>
```

Where no shell reaches it, the same search runs through this session's
own search tools. Either way it skips every topic's `pre-image/` slot:
the slot holds superseded copies, so a hit there is no topic's current
text.

## Three exits, all artifact-depositing

**The topic's task in ymer** is three calls, because the first does not
show the postcondition:

1. `tasks create`: the task's name; a description that is one line,
   what this is plus where its `request.md` is; its membership in the
   Roadmap project the area routes to; and an effort estimate wherever
   you can size the pick. Membership is the task's own property, written
   on the create the way the server's `help` says.
2. `tasks update`: **claim** it, the coordinator's transition into the
   `doing` group.
3. `tasks list` on that same project, narrowed by a name search for the
   task's name: the read-back.

Expect exactly one task, in the `doing` group, and the projects it names
to include the target.

**The topic's task in the node** is one statement and one read-back,
and the routing is the `project` value itself:

```sql
INSERT INTO tasks (name, description, status, project, area, estimated_effort_minutes)
VALUES ('<name>', '<one line>', 'claimed', '<the derived project label>', '<area>', <minutes or NULL>)
```

```sql
SELECT id, name, status, project, area FROM tasks WHERE name = '<name>' ORDER BY id DESC LIMIT 1
```

**The node's Roadmap label** is derived from the area with no lookup:
area `meta` gives `Meta Roadmap`, and any other area gives the area with
its first letter upper-cased plus ` Roadmap`, so `ymer-node` gives
`Ymer-node Roadmap`. It is a routing label in ymer's words: where one
product spans several areas, whoever promotes the row into ymer
corrects it there.

**The learning task.** In ymer it is exit 1's create and read-back in
the `Learning` project, without the claim. In the node it is a `tasks`
row with `project = 'Learning'` and `status = 'new'`.

## `request.md`'s shape

**The drop line.** Every drop is quoted as one line, ending in its id:

```
- <captured_on> · <source>@<context> — <text> (#<id>)
```

`<text>` is `<kind>: ` followed by the title where the drop has one and
the body where it has none, `vision(<product>): ` for a vision drop. A
recurrence adds `recurrence of #<anchor_id>` or
`recurrence of <anchor_text>`, followed by ` — <body>` when the body is
not empty. One query renders it:

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

**A normal pick:**

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

A **Passed over** line is written only where the pick passed the top
drop over, one line per drop passed over.

**The friction-batch:**

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

**Writing the file.** It is a file,
`<area>/YYYY/MM-DD-<topic>/request.md` under the state folder, written
and appended as any file is: on a harness that edits a connected folder
by copying it out and writing it back, through those tools. Before
writing a fresh `request.md`, check with this session's own file tools,
never a shell command, that no file is at that path.
