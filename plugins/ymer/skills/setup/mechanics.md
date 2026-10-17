# Setup: mechanics

The mechanics of the setup skill: the statements it runs over the
node's notebook, the texts it writes once into a user's stores, the
calls it makes, and how each harness reads the front and the state
folder. The headings are `SKILL.md`'s own; read a section's entries at
the moment that section runs.

Contents:

- 1. The Ymer Node and its store skeletons: the first read, the node's
  server name, the eight tables' statements, the grammar rows and their
  eight texts, the kinds and their six rows, adding a missing column,
  the required columns, the retired `topics` table's statements and its
  hand move
- 2. This installation's front: the fronts read and insert, the front on
  Cowork
- 3. The state folder: the state folder on Cowork
- 4. The ymer connection: the call, a lapsed sign-in on Claude Code
- 5. The `Meta Roadmap` project: the call and its description

## The battery

### 1. The Ymer Node and its store skeletons

**The first read**, through `notebook` `query`, names the eight tables
and the retired one, and asks `_meta` for the retired table's row. A
table name that does not come back is a table the notebook does not
hold; `table:topics` coming back without `topics` is the retired
table's `_meta` row left without its table:

```sql
SELECT name FROM sqlite_master WHERE type = 'table'
  AND name IN ('fronts', 'kinds', 'pool', 'pool_scores', 'tasks', 'tasks_log', 'tutor_subjects', 'tutor_engagements', 'topics')
UNION ALL
SELECT target FROM _meta WHERE target = 'table:topics'
```

**The node's server name**, on Claude Code, is the one this session's
notebook tool carries, `mcp__<server>__notebook`. Where `<server>` is
not `ymer-node`, read the registration with `claude mcp get <server>`:
it prints the scope and URL the node is registered with, and the remove
command for that scope. The node's line notes the name with the commands
that register the node again as `ymer-node`: that remove command, then
the `claude mcp add` line `SKILL.md` § 1 names, carrying the URL `get`
printed in place of the default. Where `get` finds no server by that
name, the tool name carrying an altered form of it, the line names
`claude mcp list` to find the registration instead.

Every statement below is one `execute` call.

`fronts`:

```sql
CREATE TABLE fronts (
  slug         TEXT PRIMARY KEY,
  capabilities TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(capabilities) AND json_type(capabilities) = 'array'),
  notes        TEXT
)
```

`kinds`:

```sql
CREATE TABLE kinds (
  kind        TEXT    PRIMARY KEY,
  test_order  INTEGER UNIQUE,
  description TEXT    NOT NULL
)
```

`pool`:

```sql
CREATE TABLE pool (
  id          INTEGER PRIMARY KEY,
  captured_on TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%d','now')),
  front       TEXT    NOT NULL REFERENCES fronts(slug),
  source      TEXT    NOT NULL,
  context     TEXT    NOT NULL,
  kind        TEXT    NOT NULL DEFAULT 'friction' REFERENCES kinds(kind),
  title       TEXT,
  body        TEXT    NOT NULL,
  anchor_id   INTEGER REFERENCES pool(id),
  anchor_text TEXT,
  product     TEXT,
  status      TEXT    NOT NULL DEFAULT 'open' CHECK (status IN ('open','drained')),
  drained_to  TEXT,
  drained_at  TEXT,
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  CHECK (kind <> 'vision' OR product IS NOT NULL),
  CHECK (status <> 'drained' OR drained_to IS NOT NULL)
)
```

```sql
CREATE INDEX pool_anchor ON pool (anchor_id)
```

```sql
CREATE INDEX pool_status_kind ON pool (status, kind)
```

`title` stays nullable: the kinds whose bodies run long carry one, and a
reader scans `COALESCE(title, body)`, so a drop written without one still
reads.

`pool_scores`, where each component is 1, 3 or 5, and a drop is scored
once:

```sql
CREATE TABLE pool_scores (
  drop_id          INTEGER PRIMARY KEY REFERENCES pool(id),
  direction_value  INTEGER NOT NULL CHECK (direction_value IN (1, 3, 5)),
  time_criticality INTEGER NOT NULL CHECK (time_criticality IN (1, 3, 5)),
  risk_reduction   INTEGER NOT NULL CHECK (risk_reduction IN (1, 3, 5)),
  size             INTEGER NOT NULL CHECK (size IN (1, 3, 5)),
  why              TEXT    NOT NULL
)
```

`tasks`, whose status vocabulary is ymer's own, under a `CHECK`, so
promoting a row into ymer later is a copy rather than a translation:

```sql
CREATE TABLE tasks (
  id           INTEGER PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT,
  status       TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reopened','claimed','asking','completed','cancelled')),
  project      TEXT,
  area         TEXT,
  estimated_effort_minutes INTEGER,
  due_date     TEXT,
  result       TEXT,
  external_ref TEXT,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  closed_at    TEXT
)
```

`tasks_log`:

```sql
CREATE TABLE tasks_log (
  id      INTEGER PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id),
  at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  kind    TEXT NOT NULL,
  body    TEXT NOT NULL,
  refs    TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(refs) AND json_type(refs) = 'array'),
  minutes INTEGER,
  author  TEXT
)
```

`tutor_subjects` and `tutor_engagements`. The docs themselves are ymer
docs; these rows name them, and the foreign key holds every engagement
to a subject the index knows:

```sql
CREATE TABLE tutor_subjects (
  subject       TEXT PRIMARY KEY,
  knowledge_doc TEXT NOT NULL
)
```

```sql
CREATE TABLE tutor_engagements (
  title          TEXT PRIMARY KEY,
  subject        TEXT NOT NULL REFERENCES tutor_subjects(subject),
  engagement_doc TEXT NOT NULL
)
```

**The grammar rows.** One row per table, its text the table's grammar:

```sql
INSERT OR IGNORE INTO _meta (target, description) VALUES ('table:fronts', '<the text below>')
```

The eight texts, each the grammar of its table:

> **`table:fronts`**: The fronts: one row per installation sessions run
> in — a harness config with its own account, connectors, settings and
> instructions. `slug` is the token every front-bound row names,
> lowercase snake_case, and the answer wherever a front is asked for; a
> session takes it from its installation's own settings where the
> harness passes them to the work, and from the instructions it starts
> with where it does not. Nothing defaults it: two installations of one
> harness are two fronts. `capabilities` is a JSON array of what that front can do, in
> the front's own vocabulary — self-describing, read by no skill, and
> worth a look when one node serves several fronts and you are choosing
> which should take a piece of work. `notes` is free text about the
> front. A front may add columns of its own and document them here. A new
> front is one INSERT here plus whatever names its slug to its sessions.

> **`table:kinds`**: The kinds a drop in the pool is recorded under, one
> row per kind; pool.kind is a foreign key into kind. description is the
> kind's rule: what fits it, and what the drop's title and body say.
> test_order is the order the kinds are tried in: the first whose
> description fits the observation wins, so an observation that fits two
> lands the same way every time. empty has none — it records that the
> work was looked back on and nothing was found, and is never tried
> against an observation. A front may add a kind of its own with a row
> here.

> **`table:pool`**: The pool: one row per drop, one observation waiting
> to be drawn into work, recorded as it was observed and never analysed
> on the way in. The one store — no archive, no staging: a drop leaves
> the open pool only by being drained, which changes its status and
> deletes nothing, priority binds when a drop is drawn, and nothing in
> the pool is work anyone has committed to. Any client may insert, and
> this description is the grammar for one with nothing else to read.
> Minimal insert: front, source, context, body; captured_on (YYYY-MM-DD),
> kind and status default. front = the front that wrote the row, a
> fronts slug — NOT NULL and a foreign key, so a forgotten front is
> refused rather than filed as someone else's. source = the snake_case
> name of the step that wrote the drop, or 'standalone' when nothing
> invoked it. context = what the work belonged to, <area>/<subject>:
> <repo>/<topic> for a session working one topic, meta/<subject> for
> process work or a study session with no repo. kind = a kinds row,
> friction by default, picked by trying the kinds in test_order and
> taking the first whose description fits. title = the drop in a plain
> phrase, written for the kinds whose descriptions ask for one; a scan
> reads COALESCE(title, body). body = what was observed. product names
> the product a vision drop is about, and a vision drop requires it. A
> drop of any kind is a recurrence when it carries an anchor: anchor_id
> = the row it recurs (an enforced foreign key; drained rows still
> count), or anchor_text when no single row is the anchor (a named-cause
> slug), the body then one short clause saying where it bit this time.
> status: open | drained — drawing a drop drains it, setting
> status='drained', drained_to = where it went (a topic as
> <area>/YYYY/MM-DD-<topic>/, or a task id), and drained_at. An empty
> drop is never drained. Rows are never deleted: pointers must keep
> resolving and drained rows stay as evidence. Frequency = rows sharing
> an anchor (COALESCE(anchor_id, anchor_text)); a recurrence after its
> anchor was drained is the sharpest signal the pool gives. This row is
> the grammar's home; the table's definition is sqlite_master, and every
> backup carries both.

> **`table:pool_scores`**: The pool's scores: one row per scored drop,
> written once when the drop is first scored and never revised. A pool
> row with no row here is unscored, and an empty drop is never scored.
> drop_id = the pool row scored, the key and a foreign key into pool(id).
> Four components, each 1, 3 or 5 under a CHECK: direction_value — how
> strongly the drop advances a product's next steps, the best match
> across every product page; time_criticality — the cost of waiting;
> risk_reduction — the risk its work removes, or the work it enables;
> size — its scope and uncertainty, 1 small and 5 large or unclear. why
> = the scorer's one line: what the drop matched, and anything that made
> it hard to score. A score is never stored: it is computed when a drop
> is drawn, the kind's weight times (direction_value + time_criticality
> + risk_reduction) divided by size, so a changed weight re-ranks every
> drop without rewriting a row. A changed rubric applies to drops scored
> after it, and rows scored before it stand.

> **`table:tasks`**: The coordinator where a session reaches no ymer:
> one row per unit of work, shaped as the minimum of ymer's task model so
> that promoting a row into ymer is a copy rather than a translation.
> status is ymer's own vocabulary under a CHECK — new | reopened |
> claimed | asking | completed | cancelled — with the groups open = new +
> reopened, doing = claimed + asking, closed = completed + cancelled; a
> topic's task is created at claimed, because a task exists only where
> work starts, and a learning task at new. project is the Roadmap the
> row would be minted into in ymer, derived from area with no lookup:
> area meta → 'Meta
> Roadmap', any other area → the area with its first letter upper-cased
> plus ' Roadmap'; a learning-gap task carries 'Learning'. It is a
> routing label, so where one product spans several areas it is corrected
> by hand at promotion. area is the repo or product the work belongs to,
> with meta reserved for work about how you work.
> estimated_effort_minutes is ymer's stored form of an effort estimate.
> external_ref points at whatever other system also carries this work —
> an issue key, a URL. result is the closing text. The journal is
> tasks_log. A front that needs richer state adds columns of its own and
> documents them here.

> **`table:tasks_log`**: The journal of tasks: what happened, one row
> per entry. task_id points at tasks. kind vocabulary: finding | decision
> | action | question | answer | handover | time | status — kept here
> rather than in a CHECK, because a front's journal vocabulary may grow
> and nothing routes on it. body is the entry itself. refs is a JSON
> array of pointers: issue keys, URLs, reference ids. minutes carries
> time tracking. author is the worker or model that wrote the entry.

> **`table:tutor_subjects`**: The learning track's subjects, one row per
> subject: half of the subject index, beside tutor_engagements. subject
> is the subject's lowercase key as the learner names it — `git`,
> `shell (bash/zsh)` — and the join every other learning record uses; a
> display title belongs to the knowledge doc, never to this key.
> knowledge_doc is the handle of the subject's knowledge doc, a ymer doc:
> `<slug>-<uuid>`, resolved by its trailing UUID, so a drifted slug breaks
> nothing stored. One knowledge doc per subject: check this table before
> creating one, and add the row when one is created. A subject with an
> open engagement cannot be deleted: the foreign key on tutor_engagements
> refuses it.

> **`table:tutor_engagements`**: The learning track's open engagements,
> one row per engagement while it is open: the other half of the subject
> index. Presence is the open state, so a row carries no status. title is
> the engagement doc's title; subject is the engagement's subject, a
> foreign key into tutor_subjects, so an engagement on a subject with no
> row is refused and the subject row comes first; engagement_doc is the
> handle of the engagement doc, a ymer doc: `<slug>-<uuid>`, resolved by
> its trailing UUID. The row is deleted when the engagement closes, at its
> capstone or on abandonment; the engagement doc stays the durable record
> and holds every other state.

**The kinds.** One statement per row:

```sql
INSERT OR IGNORE INTO kinds (kind, test_order, description) VALUES ('bug', 1, '<the text below>')
```

`empty` takes `NULL` for `test_order`. The six rows, in test order:

> **`bug`** (1): Something does not work as it claims: a product, a
> tool, an instruction that cannot be followed as written, or the machine
> and network the work runs on. Write what was seen. Title: what is
> broken.

> **`learning`** (2): Someone should learn something: a gap in a
> person's knowledge that the work exposed. One line: the subject, and
> why.

> **`vision`** (3): Where a product is heading — not how the work went,
> and not a piece of work: material for that product's direction. Name
> the product in product. Title: the direction in a phrase.

> **`idea`** (4): Work worth doing that fixes nothing broken: a
> follow-up left undone, something wanted, a thing a term names that is
> not built yet. Title: the work in a phrase.

> **`friction`** (5): Everything worked as written, yet the work wasted
> effort: rework, waiting, an unclear instruction, a lost handoff. One
> line: the root cause, naming the artifact or system, never a person.

> **`empty`** (none): The work was looked back on and nothing was
> found. Body: ∅ no friction. Never drained.

**Adding a missing column.** A required column the `schema` action does
not list is added with one statement, for example:

```sql
ALTER TABLE tasks ADD COLUMN external_ref TEXT
```

The required columns, by table:

- `fronts`: `slug`, `capabilities`, `notes`
- `kinds`: `kind`, `test_order`, `description`
- `pool`: every column of the definition above
- `pool_scores`: every column of the definition above
- `tasks`: `id`, `name`, `description`, `status`, `project`, `area`,
  `estimated_effort_minutes`, `due_date`, `result`, `external_ref`,
  `created_at`, `updated_at`, `closed_at`
- `tasks_log`: `id`, `task_id`, `at`, `kind`, `body`, `refs`,
  `minutes`, `author`
- `tutor_subjects`: `subject`, `knowledge_doc`
- `tutor_engagements`: `title`, `subject`, `engagement_doc`

**The retired `topics` table.** The statements and steps below are the
hand step the report prints for the person to run: setup itself counts
the rows and runs none of the rest, so it drops nothing and moves no
rows. Its rows are counted with:

```sql
SELECT count(*) FROM topics
```

- **No rows**: one statement per `execute` call, `DROP TABLE topics`,
  then `DELETE FROM _meta WHERE target = 'table:topics'`.
- **Rows**: write each row's `body` to
  `<state folder>/<area>/YYYY/MM-DD-<slug>/<artifact>`, where the `topic`
  column `YYYY-MM-DD-<slug>` splits after the year. The table does not
  record which front wrote a row, so which front's state folder a row
  belongs in is yours to tell: move each from a session on the front it
  belongs to, into that front's folder. Where the state folder is its
  own git repository, then commit the topic folders you wrote,
  pathspec-scoped on both halves, since a bare commit sweeps in whatever
  concurrent sessions have staged:
  `git -C <state folder> add <area>/YYYY/MM-DD-<slug>/`, then
  `git -C <state folder> commit -m "topics: move retired rows into the state folder" -- <area>/YYYY/MM-DD-<slug>/`,
  naming every folder you wrote. Where it is in no git repository, or
  this session has no git, the files you wrote are the record. Then drop
  the table and its `_meta` row as above.
- **No table, but its `_meta` row**: its one statement,
  `DELETE FROM _meta WHERE target = 'table:topics'`.

### 2. This installation's front

The read, whether or not a slug was named:

```sql
SELECT slug FROM fronts
```

The insert for a new front:

```sql
INSERT INTO fronts (slug) VALUES ('<slug>')
```

**The front on Cowork.** Cowork's skills read the placeholder whatever
the option holds, so the slug comes from the instructions this session
started with, in any wording that names it. With none named there, the
check fails with:

> The `ymer` plugin needs a name for this installation, and the
> instructions this session started with name none. Name it there, for
> example `Front: <your front>`.

### 3. The state folder

**The state folder on Cowork.** The front's initial instructions name
the state folder, the same instructions that name the front's slug.
Read the path from the instructions this session started with. The
folder must be one this session reaches: one of the session's connected
folders, or a folder inside one. List it through the device's directory
tool first, then read the connected folders from the device's own
information (`connectedFolders`): the path, or a folder it sits inside,
among them passes. No path named, or a path outside every connected
folder, fails the check:

> The `ymer` plugin needs one folder to keep your topics in, and this
> session names none it can reach. Connect the folder to this project
> (the folder itself, or one it sits inside), then name it in the
> instructions this front's sessions start with, for example
> `State folder: <the folder's path>`.

The folder's kind is read on Cowork through the device's own shell: a
connected folder is visible to it and not to the container's.

### 4. The ymer connection

**The call.** `projects list`, a name search for `Roadmap`, asking for
each project's id and name. The parameter shape is the server's: ask
its `help` for the action if you do not have it.

**A lapsed sign-in on Claude Code.** `claude mcp get ymer` prints the
server's status: `Needs authentication` is a lapsed sign-in; no such
server is the absence the check's pass means.

### 5. The `Meta Roadmap` project

Created with `projects create`, named exactly `Meta Roadmap`, its
description this markdown, written once:

```markdown
# Meta Roadmap

Improvement work about how you work — the process itself, belonging to no
product. Its tasks are what to do next.
```
