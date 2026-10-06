---
name: setup
description: Use to set up and verify the environment every ymer-marketplace plugin works from — the Ymer Node and its store skeletons, this installation's front, the state folder, the ymer connection, and the Meta Roadmap project. Run it after installing, and whenever a skill's guard sends you here.
---

# Setup

`/ymer:setup` puts the environment into the state every plugin's skills
assume, and reports what it found.

**Announce at start:** "Setup: checking the ymer environment."

Setup owns the environment and the start position those skills work from —
store skeletons present, configuration wired, universal floors in place.
A skill owns its own domain and never sends you here for domain state.

**The battery below is the desired state.** Every check verifies, creates
what is missing, and never mutates what already exists. So a healthy
machine reports all-pass and changes nothing, and re-running this skill
converges everything setup owns — skeletons, settings and floors — with no
migration step and nothing to version. Three things sit outside that
promise. The ymer connection is yours, it lives outside any plugin, and
re-running can only report on it. The state folder is yours too: setup
verifies it and never creates it (→ check 3). And what this skill writes once — each
table's `_meta` grammar row (→ The grammar rows), the `kinds` rows
(→ The kinds) and the `Meta Roadmap` project's description (→ The `Meta
Roadmap` project) — is its owner's from then on and never rewritten: a
release that words one of them differently changes what a new install
gets, and nothing an existing one holds.

## What decides where things go — the reach rule

Two stores answer two different questions. **The coordinator is the
default where this session reaches it; the state folder is required, and
which history tracks it is read from the folder itself**:

- **The coordinator** — what tracks work and how topics are named there.
  Ymer's tool surface among this session's tools → ymer's Roadmap
  projects. Absent → the node's `tasks` table.
- **The state store** — where a topic's artifacts live: the state folder
  (→ check 3), together with the history that tracks it. A folder that is
  a git work tree → git, where each save is a commit. Any other folder →
  the node's `topics_history` table, where each save is a row.

Read once, at the run's start, from what the session has — never asked,
and never configured beyond the state folder's path and the front's
name. All four
combinations of coordinator and history are real installs. A store this
session *reaches* but cannot use — a ymer call that errors, a state
folder that is not named, is missing, or is out of this session's reach
— is a failure to report, never a reason to use another one: falling
back on a failure forks your work across two stores without saying so.

The Ymer Node itself is not in the rule. It is the floor every plugin
here stands on, and check 1 is where its absence is a failure.

## The battery

### 1. The Ymer Node and its store skeletons

The node is the one your Ymer Node install serves, reached through its
`notebook` tool. No such tool in this session, or a node that does not
answer, fails this check and stops the rest of the battery: everything
below either writes to the node or reports against it.

```
claude mcp add --transport http --scope user ymer-node http://127.0.0.1:8012/mcp
```

Name that command only on Claude Code. On a harness with no such door,
say that the node is unreachable from this session and leave it there.

**The skeletons.** Nine tables, created in this order — `fronts`,
`kinds`, `pool`, `pool_scores`, `tasks`, `tasks_log`, `topics_history`,
`tutor_subjects`, `tutor_engagements`. The order is load-bearing: `pool`
keys on `fronts(slug)` and `kinds(kind)`, `pool_scores` on `pool(id)`,
`topics_history` on `fronts(slug)`, `tasks_log` on `tasks(id)`, and
`tutor_engagements` on `tutor_subjects(subject)`.

Read what is there first, with the `notebook` `tables` action, and then
work table by table. **The node runs one statement per `execute` call and
drops the rest of a multi-statement call without a word**, so every
statement below is a call of its own — a batched skeleton creates its
first table and silently loses every write after it.

`fronts` — the front every other row keys on:

```sql
CREATE TABLE fronts (
  slug         TEXT PRIMARY KEY,
  capabilities TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(capabilities) AND json_type(capabilities) = 'array'),
  notes        TEXT
)
```

`kinds` — the kinds a drop in the pool is captured under, each row
carrying its kind's rule (→ The kinds):

```sql
CREATE TABLE kinds (
  kind        TEXT    PRIMARY KEY,
  test_order  INTEGER UNIQUE,
  description TEXT    NOT NULL
)
```

`pool` — the one store of drops waiting to be drawn into work:

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

`pool_scores` — the pool's scores, one row per scored drop, kept beside
the pool rather than in it so that a drop's own row stays as it was
observed. Each component is 1, 3 or 5, and a drop is scored once:

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

`tasks` — the coordinator where a session reaches no ymer. The status
vocabulary is ymer's own, under a `CHECK`, so promoting a row into ymer
later is a copy rather than a translation:

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

`tasks_log` — that coordinator's journal:

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

`topics_history` — the history of a state folder that is not a git work
tree, one row per save of one artifact:

```sql
CREATE TABLE topics_history (
  id       INTEGER PRIMARY KEY,
  topic    TEXT NOT NULL,
  area     TEXT NOT NULL,
  artifact TEXT NOT NULL,
  body     TEXT NOT NULL,
  phase    TEXT NOT NULL,
  front    TEXT NOT NULL REFERENCES fronts(slug),
  saved_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
)
```

```sql
CREATE INDEX topics_history_artifact ON topics_history (topic, area, artifact, id)
```

A row is found by its front, topic, area and artifact together. Topic ids
are not unique across areas, and every front keeps its own state folder
while fronts on one machine share this node, so two fronts can hold the
same topic id — a dated friction-batch, say — in two different folders.
Every read of one artifact's history names all four, and `front` is part
of that address, not only a record of who saved.

Two triggers make it append-only, so a row once written is a fact every
later reading can rely on — the pre-image a rewrite is checked against,
and where a topic stands. A trigger's `BEGIN … END` body is part of its
one statement, so each trigger is one `execute` call:

```sql
CREATE TRIGGER topics_history_no_update BEFORE UPDATE ON topics_history
BEGIN
  SELECT RAISE(ABORT, 'topics_history is append-only');
END
```

```sql
CREATE TRIGGER topics_history_no_delete BEFORE DELETE ON topics_history
BEGIN
  SELECT RAISE(ABORT, 'topics_history is append-only');
END
```

`tutor_subjects` and `tutor_engagements` — the subject index, the
learning track's index of its knowledge docs and open engagements. The
docs themselves are ymer docs; these rows name them, and the foreign key
holds every engagement to a subject the index knows:

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

**The grammar rows.** SQLite carries no column comments, so each table's
grammar lives in the notebook's `_meta` description — the one place a
client with no skill to read can learn what a column means. The node
creates `_meta` itself on its first action, so there is nothing to create
here; write one row per table, and write it with `INSERT OR IGNORE`:

```sql
INSERT OR IGNORE INTO _meta (target, description) VALUES ('table:fronts', '<the text below>')
```

**`OR IGNORE` is the whole safety of this step, and `OR REPLACE` is the
shape to avoid.** A node that has been in use carries a description its
owner extended — the columns their front added, the rules their work runs
by — and that text lives nowhere else. Replacing it destroys it silently,
on a run whose whole promise is that it changes nothing already right.

The nine texts, each the grammar of its table:

> **`table:fronts`** — The fronts: one row per installation sessions run
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

> **`table:kinds`** — The kinds a drop in the pool is recorded under, one
> row per kind; pool.kind is a foreign key into kind. description is the
> kind's rule: what fits it, and what the drop's title and body say.
> test_order is the order the kinds are tried in: the first whose
> description fits the observation wins, so an observation that fits two
> lands the same way every time. empty has none — it records that the
> work was looked back on and nothing was found, and is never tried
> against an observation. A front may add a kind of its own with a row
> here.

> **`table:pool`** — The pool: one row per drop, one observation waiting
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

> **`table:pool_scores`** — The pool's scores: one row per scored drop,
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

> **`table:tasks`** — The coordinator where a session reaches no ymer:
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

> **`table:tasks_log`** — The journal of tasks: what happened, one row
> per entry. task_id points at tasks. kind vocabulary: finding | decision
> | action | question | answer | handover | time | status — kept here
> rather than in a CHECK, because a front's journal vocabulary may grow
> and nothing routes on it. body is the entry itself. refs is a JSON
> array of pointers: issue keys, URLs, reference ids. minutes carries
> time tracking. author is the worker or model that wrote the entry.

> **`table:topics_history`** — The history of the artifacts in a state
> folder that is not a git work tree: one row per save of one artifact,
> append-only, where the newest row for a (front, topic, area, artifact)
> is its current save and the one before it the pre-image. The file in
> the folder is the artifact; a row records the text the saving session
> sent, so an encoding or line-ending difference between the two is not a
> fault. topic is the dated topic id YYYY-MM-DD-<slug>; area is the repo
> or product it belongs to, with meta reserved for process work; artifact
> is the file's name in the topic's folder, <area>/YYYY/MM-DD-<slug>/;
> body is the whole text saved; phase is the snake_case name of the skill
> or phase that saved it, or hand_step for a row a hand step moved in,
> and the newest row's phase says where the topic stands; front is the
> fronts slug of the front whose folder holds the file, and is part of a
> row's address, since fronts sharing this node each keep their own
> folder and the same topic id can sit in two of them. A save whose body
> equals the newest row's for the same (front, topic, area, artifact)
> writes no row. Two triggers refuse UPDATE and DELETE, so a wrong row is
> corrected by saving the right text again. A large body is read in substr
> windows after its length, an MCP result having a size cap.

> **`table:tutor_subjects`** — The learning track's subjects, one row per
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

> **`table:tutor_engagements`** — The learning track's open engagements,
> one row per engagement while it is open: the other half of the subject
> index. Presence is the open state, so a row carries no status. title is
> the engagement doc's title; subject is the engagement's subject, a
> foreign key into tutor_subjects, so an engagement on a subject with no
> row is refused and the subject row comes first; engagement_doc is the
> handle of the engagement doc, a ymer doc: `<slug>-<uuid>`, resolved by
> its trailing UUID. The row is deleted when the engagement closes, at its
> capstone or on abandonment; the engagement doc stays the durable record
> and holds every other state.

**The kinds.** `kinds` carries one row per kind, and the rows are the
rules a drop is captured by — written once like the grammar rows, and
with the same `INSERT OR IGNORE`, so a kind its owner reworded keeps the
owner's words and a missing one is added. One statement per row:

```sql
INSERT OR IGNORE INTO kinds (kind, test_order, description) VALUES ('bug', 1, '<the text below>')
```

`empty` takes `NULL` for `test_order`. The six rows, in test order:

> **`bug`** (1) — Something does not work as it claims: a product, a
> tool, an instruction that cannot be followed as written, or the machine
> and network the work runs on. Write what was seen. Title: what is
> broken.

> **`learning`** (2) — Someone should learn something: a gap in a
> person's knowledge that the work exposed. One line: the subject, and
> why.

> **`vision`** (3) — Where a product is heading — not how the work went,
> and not a piece of work: material for that product's direction. Name
> the product in product. Title: the direction in a phrase.

> **`idea`** (4) — Work worth doing that fixes nothing broken: a
> follow-up left undone, something wanted, a thing a term names that is
> not built yet. Title: the work in a phrase.

> **`friction`** (5) — Everything worked as written, yet the work wasted
> effort: rework, waiting, an unclear instruction, a lost handoff. One
> line: the root cause, naming the artifact or system, never a person.

> **`empty`** (none) — The work was looked back on and nothing was
> found. Body: ∅ no friction. Never drained.

The order is the point: bug comes first so that whatever does not work
as written is never filed as waste, and friction comes last because it
is what remains when everything worked.

**An existing table is verified, never rebuilt.** For each of the nine
that already exists, read it with the `notebook` `schema` action and
check the required columns **by name and type** — nothing else. A
missing one is added:

```sql
ALTER TABLE tasks ADD COLUMN external_ref TEXT
```

and a required column that is present with a different type is
**reported and left alone**. Rebuilding a table to match a declaration
would take its owner's rows and their columns with it, so this check says
what differs and stops there.

**Name and type is the whole comparison**, and the rest of a column's
declaration — a default, a CHECK, a foreign key — sits deliberately
outside it. The `schema` action does not carry those. The table's own
declaration does, one read away through `query`:

```sql
SELECT sql FROM sqlite_master WHERE type='table' AND name='tasks'
```

but SQLite stores that text exactly as its author wrote it, so comparing
it against the grammar above would report a difference for any table
whose author spelled the same constraint differently — and a difference
this check may never rewrite anyway. A run whose whole promise is that it
changes nothing already right has no use for a report nobody can act on.
Read that declaration by hand when you are chasing a real difference; the
battery reads name and type.

SQLite refuses some columns to `ADD COLUMN` outright: a PRIMARY KEY or
UNIQUE column always, and on a table that already holds rows a NOT NULL
column with no default or one whose default is an expression rather than
a constant. Report such a refusal with the statement, exactly as a
differing type is reported — it is a hand step on a table that is
already someone's.

The required columns, by table:

- `fronts` — `slug`, `capabilities`, `notes`
- `kinds` — `kind`, `test_order`, `description`
- `pool` — every column of the definition above
- `pool_scores` — every column of the definition above
- `tasks` — `id`, `name`, `description`, `status`, `project`, `area`,
  `estimated_effort_minutes`, `due_date`, `result`, `external_ref`,
  `created_at`, `updated_at`, `closed_at`
- `tasks_log` — `id`, `task_id`, `at`, `kind`, `body`, `refs`,
  `minutes`, `author`
- `topics_history` — `id`, `topic`, `area`, `artifact`, `body`, `phase`,
  `front`, `saved_at`
- `tutor_subjects` — `subject`, `knowledge_doc`
- `tutor_engagements` — `title`, `subject`, `engagement_doc`

**`topics_history`'s index and triggers are checked by name.** The column
check never sees them, and a missing trigger loses append-only without a
word. Read what the table carries:

```sql
SELECT type, name FROM sqlite_master WHERE tbl_name = 'topics_history' AND type IN ('index', 'trigger')
```

Create any of `topics_history_artifact`, `topics_history_no_update` and
`topics_history_no_delete` that is missing, with its statement above, and
leave a present one as it is: the name is the whole comparison here too.

**A retired `topics` table is reported, never dropped.** Earlier releases
kept a topic's artifacts as rows in a `topics` table where no state
folder was set. Topics now live in the state folder, and nothing reads or
writes that table. Where the notebook still has one, count its rows:

```sql
SELECT count(*) FROM topics
```

and report it as retired, on a line of its own, with the one hand step
that clears it. It is never a failure, because nothing depends on it, and
setup never drops it or moves its rows: they are yours, and files written
into a folder setup guessed are exactly the silent second store this
battery exists to prevent.

- **No rows** — drop it, and its `_meta` row with it, one statement per
  `execute` call: `DROP TABLE topics`, then
  `DELETE FROM _meta WHERE target = 'table:topics'`.
- **Rows** — move each one by hand first: write its `body` to
  `<state folder>/<area>/YYYY/MM-DD-<slug>/<artifact>`, where the `topic`
  column `YYYY-MM-DD-<slug>` splits after the year. The table does not
  record which front wrote a row, so which front's state folder a row
  belongs in is yours to tell: move each from a session on the front it
  belongs to, into that front's folder. Then record the moved
  files in the folder's history, the way every save is recorded:
  - where the state folder is a git work tree, commit the topic folders
    you wrote, pathspec-scoped on both halves — a bare commit sweeps in
    whatever concurrent sessions have staged:
    `git -C <state folder> add <area>/YYYY/MM-DD-<slug>/`, then
    `git -C <state folder> commit -m "topics: move retired rows into the state folder" -- <area>/YYYY/MM-DD-<slug>/`,
    naming every folder you wrote;
  - where it is not, save the same text into `topics_history`, in one
    `execute` call, with `phase` `hand_step` and `front` this front's
    slug, the one check 2 confirms in `fronts` (the foreign key refuses
    any other):
    `INSERT INTO topics_history (topic, area, artifact, body, phase, front) SELECT topic, area, artifact, body, 'hand_step', '<front>' FROM topics`,
    where the table also holds another front's rows, narrowed by a
    `WHERE` on `topic` to the ones this front moved.

  Then drop the table and its `_meta` row as above. The move needs this
  front's slug and a resolved state folder: where check 2 has not passed,
  the line says the move waits on check 2 and prints `<front>` as written
  rather than any slug, and where check 3 has not resolved a folder, it
  says the move waits on check 3 and prints `<state folder>` as written
  rather than any path.

The `_meta` row outlives a table dropped on its own. Where the table is
gone but `_meta` still has its row, report that on the same line, with
its one statement,
`DELETE FROM _meta WHERE target = 'table:topics'`: the row still
describes the node as a state store, and the retirement is done only when
both are gone.

### 2. This installation's front

A front is one installation — a harness config with its own account,
connectors, plugin options and instructions — and its slug is the key
every drop and every saved topic carries into `fronts`: `pool.front` and
`topics_history.front` are foreign keys, so a write from a front with no
row is refused, and a mint draws only its own front's drops. This check
reads and writes the node, so it runs whenever check 1 reached it: a
difference check 1 reports on a table stops nothing here, and only a
node check 1 could not reach leaves this check `not checked`. Its
failure fails its own line and stops nothing: the checks after it still
run and report, so one run shows every configuration failure at once.

The slug is always named, never defaulted. A re-run of one installation
and a second installation of the same harness look identical to setup,
so a default would merge two fronts' rows without a word. Where the name
comes from depends on the harness this session runs on, told from the
session's own tools, exactly as the state folder's does (→ check 3).

**Where the harness writes plugin options into this skill** — Claude
Code — the slug is the `ymer` plugin's `front` option. The harness
writes that option into this skill's text as it loads it, so the value
is read here, from this one line, and from no file:

> Front as configured: `${user_config.front}`

That line is the whole answer, read as check 3 reads the state folder's
line: a slug there is this front's, and the placeholder itself — a
dollar sign and braces still around `user_config.front` — means the
option is unset. An instruction naming a front is not read on this
harness: the option alone names it.

**Where the harness does not** — Cowork, whose skills read the
placeholder whatever the option holds — the instructions this session
started with name the slug, in any wording that names it. Two
instructions naming two different slugs — the front's own and a
`CLAUDE.md` in a connected folder, say — fail the check, naming both,
with the fix: keep the slug in one of them and remove it from the
other. Never pick one.

Read what `fronts` lists, whether or not a slug was named — the pass and
the insert need it, and every failure below names what it returns:

```sql
SELECT slug FROM fronts
```

- **Listed** — the pass, and nothing is written. A slug that already has
  a row passes whatever its shape: the row is its owner's.
- **Not listed** — a new front, and its row is inserted:

  ```sql
  INSERT INTO fronts (slug) VALUES ('<slug>')
  ```

  First the slug's shape: lowercase snake_case — letters, digits and
  `_`, starting with a letter. Once inserted it is the key on every row
  this front writes, which setup never rewrites, so a slug of any other
  shape fails the check with that rule and nothing is written. Its fix
  is a rename where the slug was named: `/plugin configure ymer@ymer`
  or the install line's `--config front=<your front>` on Claude Code,
  the instructions this session started with on Cowork.

  The defaults fill the rest. A table whose owner extended it with NOT
  NULL columns of their own will refuse that insert; report the refusal
  with the statement, so they can run it with their columns filled in,
  and never force it. The read comes first for the same reason: on a
  table that already lists the slug the insert refuses on the key, and a
  refusal on a healthy machine is a report nobody can act on.

No slug named — the placeholder on Claude Code, none in the instructions
on Cowork — fails the check with the fix for the harness this session
runs on. On Claude Code:

> The `ymer` plugin's `front` option is not set, and the plugin needs a
> name for this installation — the front every drop and topic it saves
> is filed under. Set it with `/plugin configure ymer@ymer`, or
> reinstall with `claude plugin install ymer@ymer --config
> front=<your front>`.

If the option was set and still reads `not set`, the causes are the
state folder's (→ check 3): set on another plugin, set in a project's
own settings, or a harness that does not pass plugin options through.

On Cowork:

> The `ymer` plugin needs a name for this installation, and the
> instructions this session started with name none. Name it there, for
> example `Front: <your front>`.

**Every failure of this check names the fronts the node already holds**,
after its fix — the slugs the read above returned, which every failure
runs, the no-slug and two-slug ones included — with the
advice to name this installation's own slug again if it has one: an
installation whose drops are already filed under one of them keeps them
only by naming that slug, and a fresh name would leave them invisible to
its mint without a word. Where `fronts` is empty the list
is left out. The list is a fact read, never a pick: setup proposes no
slug.

### 3. The state folder

The state folder is required. It is the one folder this front keeps its
topics' artifacts in, laid out `<area>/YYYY/MM-DD-<topic>/`, and it can
be any folder you choose: it can sit anywhere, nothing assumes it is next
to your repositories, and it need not be under version control. It is
always named, never inferred, and where its name comes from depends on
the harness this session runs on, told from the session's own tools.

**Where the harness writes plugin options into this skill** — Claude
Code — the path is the `ymer` plugin's `state_folder` option. The harness
writes that option into this skill's text as it loads it, so the value is
read here, from this one line, and from no file:

> State folder as configured: `${user_config.state_folder}`

That line is the whole answer. Resolve it from what it shows, and open
nothing to confirm what it says: no file and no command reads the value
better than this line, and the placeholder showing there is itself an
answer, never a sign to look elsewhere.

- **A path** — that is the state folder, printed exactly as it reads. A
  leading `~` is your home directory: keep that one character unquoted at
  the front of the path wherever a command uses it, so the shell expands
  it.
- **The placeholder itself** — a dollar sign and braces still around
  `user_config.state_folder` — means the option is unset, and that fails
  the check:

  > The `ymer` plugin's `state_folder` option is not set, and the plugin
  > needs one folder to keep your topics in — any folder, under version
  > control or not. Set it with `/plugin configure ymer@ymer`, or
  > reinstall with `claude plugin install ymer@ymer --config
  > state_folder=<your folder>`.

  Say this too, after the message above:

  > If you did set a folder and still read `not set`, check that it is
  > set on the `ymer` plugin and not another one, as user, `--settings`
  > or managed configuration rather than in a project's own settings —
  > and if it is, this harness is not passing plugin options through.

  The same reading comes from a folder set under some other plugin's
  options rather than the `ymer` plugin's, from a folder set at the
  project-settings level rather than as user, `--settings` or managed
  configuration (this substitution never sees a project's own
  settings), and from a harness that keeps the option but does not
  write it into this text. That is why the report prints `not set`
  rather than guessing: if you set a folder and read `not set`, check
  that it is set on the `ymer` plugin at the user, `--settings` or
  managed level — and if it is, this harness is not passing it through.

**Where the harness does not** — Cowork, whose skills read the
placeholder whatever the option holds — the front's initial instructions
name the state folder instead, the same instructions that name the
front's slug. Read the path from the instructions this session started
with. Two instructions naming two different folders — the front's own
and a `CLAUDE.md` in a connected folder, say — fail the check, naming
both: never pick one. The folder must be one this session reaches: one
of the session's connected folders, or a folder inside one. List it
through the device's directory tool first, then read the connected
folders from the device's own information (`connectedFolders`): the
path, or a folder it sits inside, among them passes. No path named, or a
path outside every connected folder, fails the check:

> The `ymer` plugin needs one folder to keep your topics in, and this
> session names none it can reach. Connect the folder to this project —
> the folder itself, or one it sits inside — then name it in the
> instructions this front's sessions start with, for example
> `State folder: <the folder's path>`.

**The folder's kind.** With a path in hand, one reading decides whether
the folder exists and which history tracks it:

```
git -C <state folder> rev-parse --is-inside-work-tree
```

Run it bare: the tool reports a non-zero exit and its message by itself,
so nothing is appended to capture the status.

- `true` with exit 0 — a git work tree: git tracks its history, one
  commit per save. A pass.
- A non-zero exit whose message says `not a git repository` — a folder
  that is not a git work tree: the node's `topics_history` table tracks
  its history, one row per save. A pass too, and the report says which.
- A non-zero exit whose message says `cannot change to` — the folder is
  not there. That fails the check: name the fix — create the folder, or
  correct the setting or the instructions that name it. Setup never
  creates the state folder itself: a mistyped path that setup helpfully
  created is exactly the silent second store this check exists to
  prevent.
- Exit 127 — the shell found no `git` to run — means this session has no
  git, so git cannot track the folder: it is not a git work tree. The
  reading then says nothing about whether the folder exists, so list it
  with this session's own file tools, never another command. Found — a
  pass, tracked by `topics_history`, and the report says so. Not found —
  the missing-folder failure above.
- Anything else — `false` with exit 0 among it, which git prints for a
  bare repository or a `.git` directory, neither of them a folder meant
  to hold topics — is a state no reading names. That fails the check:
  name the folder and what the reading returned, and ask what the folder
  is. Setup never picks a history on a guess.

On Cowork a connected folder is visible to the device's own shell and
not to the container's, so run the reading there. It only reads: it
takes no lock and writes nothing into the folder.

**The report prints whatever check 3 resolved** (→ The report), and that
printing is this check's real catch: a state folder that is real,
reachable and *wrong* passes every mechanical check there is. The
printed path, read by the person who is standing right here, is the only
thing that finds it —
which is why this runs with you present rather than inside every later run.

### 4. The ymer connection

Ymer is optional, and where this session does not reach it the node's
`tasks` table is the coordinator. One call proves the account, the
connection and the sign-in together, and its result is what check 5
reads: a `projects list` name search for `Roadmap`, asking for each
project's id and name. The parameter shape is the server's — ask its
`help` for the action if you do not have it.

Any result passes, an empty one included. A failure — an outage, a
sign-in that has lapsed — fails the check and says so plainly: setup can
neither repair an outage nor sign you in, and a ymer that is there and
failing is not a session without ymer. `/mcp` is where to look.

**No such call available at all** is the other case, and it is a pass:
this session has no ymer, so the `tasks` table is its coordinator. The
call counts as available when it is among this session's tools whether or
not it has been loaded yet — a harness that defers tools until they are
needed still has it.

On Claude Code, tell absence from a lapsed sign-in before passing: a
server whose sign-in has lapsed contributes no tools at all, so it
presents exactly as no ymer. `claude mcp get ymer` prints the server's
status — `Needs authentication` is a lapsed sign-in, and fails the check
with `claude mcp login ymer` as its fix; no such server is the absence
this pass means. A harness with no such door reads the tool list alone
and says so.

Report the `tasks` table, and where the harness has a door to MCP
servers, name it:

```
claude mcp add --transport http --scope user ymer https://ymer.ax/mcp
claude mcp login ymer
```

Name those two lines only on Claude Code. Adding one that already exists
changes nothing, so a reader who wants ymer runs both either way, then
starts a fresh session.

### 5. The `Meta Roadmap` project

**This check runs only when check 4 reached ymer and passed.** Check 4's
result is the project list this check reads, so a failed connection
leaves nothing to read in; report this check as not checked, naming check
4. Do not call back into a connection that just refused. Where check 4
found no ymer at all, this check has nothing to do either: work about how
you work routes to `project = 'Meta Roadmap'` in the node's `tasks`
table, which is a value rather than an object to create. Report it as not
checked, naming the `tasks` table.

Work about how you work belongs to no product, so it gets a project of its
own, named exactly `Meta Roadmap`. Every machine with ymer has one — a
floor, not a naming decision, which is why setup creates it instead of
asking.

Check 4's result already lists it. Absent, create it with
`projects create` — named exactly `Meta Roadmap`, its description the
markdown below:

```markdown
# Meta Roadmap

Improvement work about how you work — the process itself, belonging to no
product. Its tasks are what to do next.
```

Present, leave it untouched, description included. Per-product Roadmap
projects are *not* setup's to create: they are born from your products,
and the skill that needs one says so when it is missing.

## The report

One line per check, in order — a pass, a failure with the single command
or edit that fixes it, or `not checked` naming the earlier check it waits
on. A check that passed on reach rather than on configuration says which
store is in use, and the state folder's line says which history tracks
it, because those are the things worth reading. The state folder is
printed whenever check 3 resolved one, a failed reading included. A
retired `topics` table, where one is left, gets a line of its own after
the node's, carrying its row count and its whole hand step: with no rows,
the two statements that clear the table and its `_meta` row; with rows,
their move and the history that records it first, then the same two
statements. A `_meta` row left without its table gets the same line,
with its one statement.

The node's line counts its tables: the number this run created, with
`created`, when it created any, and otherwise the number the node holds.
The front's line names the slug, with `added` after it only when this
run wrote its row. So a first run on an empty node reads
`9 tables created` and `` `work_laptop` added ``, and a re-run on a
healthy machine reads both bare, `9 tables` and `` `work_laptop` ``:
each line names what this run changed and nothing else, so a reader can
tell a repair from a machine that was already right. Where the node
failed, the front's line reads `not checked`, naming the node.

```
Setup — ymer environment

  ✔ node          reachable — 9 tables
  ✔ front         `work_laptop`
  ✔ state_folder  /Users/you/state — git work tree, history in git
  ✔ ymer          reachable
  ✔ Meta Roadmap  exists

Ready. Re-run /ymer:setup whenever you like — it changes nothing that is
already right.
```

A folder that is not a git work tree passes the same way, and a machine
with no ymer reads its coordinator by reach:

```
Setup — ymer environment

  ✔ node          reachable — 1 table created
  – topics        retired — 1 row; move it into the state folder and into `topics_history` by hand, then DROP TABLE topics and its `_meta` row
  ✔ front         `home_desktop` added
  ✔ state_folder  /Users/you/state — not a git work tree, history in the node's `topics_history`
  ✔ ymer          no connection in this session — work tracked in the node's `tasks` table
  – Meta Roadmap  not checked — no ymer; process work routes to `Meta Roadmap` in `tasks`
```

With no front and no state folder named, those two lines fail, each
carrying its own fix — the front's with the fronts the node holds:

```
  ✘ front         not set — set it with /plugin configure ymer@ymer; the node holds `work_laptop`, name it again if it is this installation
  ✘ state_folder  not set — set it with /plugin configure ymer@ymer
```

A check that passed needs no explanation and a check that failed needs
exactly one next action, so the report carries nothing else.

## Remember

- Verify, create what is missing, never mutate what exists — re-running
  this skill is the whole upgrade story for everything setup owns
- The node is the floor: its absence fails check 1 and stops the battery.
  The front and the state folder are required too — each named once per
  installation, neither ever defaulted — and ymer is optional, the
  coordinator where this session reaches it
- A new front's slug is inserted only in lowercase snake_case; a slug
  that already has a row is its owner's, whatever its shape
- A store reached but broken is a failure, never a reason to use
  another one — that would fork your work across two stores silently
- One statement per `notebook` `execute` call; the node drops the rest of
  a batch without a word
- `_meta` descriptions go in with `INSERT OR IGNORE` — an existing
  description is its owner's, and it lives nowhere else
- An existing table is checked by column name and type, never rebuilt;
  what differs is reported with the statement that would change it
- Setup writes floors, never content: per-product Roadmap projects belong
  to the skills and to you
- Name a fix command only where the harness can run it — say the store in
  use otherwise
- A check whose input never resolved reports `not checked` and writes
  nothing — setup repairs on facts, never on a guess
