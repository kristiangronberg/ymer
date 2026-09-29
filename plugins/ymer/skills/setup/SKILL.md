---
name: setup
description: Use to set up and verify the environment every ymer-marketplace plugin works from — the Ymer Node and its store skeletons, the state folder, the ymer connection, and the Meta Roadmap project. Run it after installing, and whenever a skill's guard sends you here.
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
migration step and nothing to version. Two things sit outside that
promise. The ymer connection is yours, it lives outside any plugin, and
re-running can only report on it. And what this skill writes once — each
table's `_meta` grammar row (→ The grammar rows) and the `Meta Roadmap`
project's description (→ The `Meta Roadmap` project) — is its owner's
from then on and never rewritten, so when a release changes what one of
them says, an install that already has it catches up only by hand, in a
hand step that release names.

## What decides where things go — the reach rule

Two stores answer two different questions. **The coordinator is the
default where this session reaches it; the state folder is required, and
which history tracks it is read from the folder itself**:

- **The coordinator** — what tracks work and how topics are named there.
  Ymer's tool surface among this session's tools → ymer's Roadmap
  projects. Absent → the node's `tasks` table.
- **The state store** — where a topic's artifacts live: the state folder
  (→ check 2), together with the history that tracks it. A folder that is
  a git work tree → git, where each save is a commit. Any other folder →
  the node's `topics_history` table, where each save is a row.

Read once, at the run's start, from what the session has — never asked,
and never configured beyond the state folder's path. All four
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

**The skeletons.** Seven tables, created in this order — `fronts`,
`frictions`, `tasks`, `tasks_log`, `topics_history`, `tutor_subjects`,
`tutor_engagements`. The order is load-bearing: `frictions` and
`topics_history` key on `fronts(slug)`, `tasks_log` on `tasks(id)`, and
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

`frictions` — the kaizen backlog:

```sql
CREATE TABLE "frictions" (
  id          INTEGER PRIMARY KEY,
  captured_on TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%d','now')),
  front       TEXT    NOT NULL REFERENCES fronts(slug),
  source      TEXT    NOT NULL,
  context     TEXT    NOT NULL,
  kind        TEXT    NOT NULL DEFAULT 'friction' CHECK (kind IN ('friction','recurrence','vision','empty')),
  body        TEXT    NOT NULL,
  anchor_id   INTEGER REFERENCES "frictions"(id),
  anchor_text TEXT,
  product     TEXT,
  status      TEXT    NOT NULL DEFAULT 'open' CHECK (status IN ('open','drained')),
  drained_to  TEXT,
  drained_at  TEXT,
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  CHECK (kind <> 'recurrence' OR anchor_id IS NOT NULL OR anchor_text IS NOT NULL),
  CHECK (kind <> 'vision' OR product IS NOT NULL),
  CHECK (status <> 'drained' OR drained_to IS NOT NULL)
)
```

```sql
CREATE INDEX frictions_anchor ON frictions (anchor_id)
```

```sql
CREATE INDEX frictions_status_kind ON frictions (status, kind)
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

The seven texts, each the grammar of its table:

> **`table:fronts`** — The fronts: one row per surface a session runs on.
> `slug` is the token every front-bound row names, snake_case, and the
> answer wherever a front is asked for; a session takes it from the slug
> its own instructions name, or from the per-harness default where they
> name none. `capabilities` is a JSON array of what that front can do, in
> the front's own vocabulary — self-describing, read by no skill, and
> worth a look when one node serves several fronts and you are choosing
> which should take a piece of work. `notes` is free text about the
> front. A front may add columns of its own and document them here. A new
> front is one INSERT here plus whatever names its slug to its sessions.

> **`table:frictions`** — The frictions store: one row per friction, a
> hindsight observation of process waste recorded as its root cause,
> never the symptom, blameless (name the artifact or system). Kaizen's
> backlog — the one store, no archive, no clusters file, no staging: a
> row leaves it only by being drained, priority binds at drain time, and
> the count of open rows is the debt gauge. Kaizen captures are today's
> main producer, at session tails on every front; any
> client may insert, and this description is the grammar for one with no
> skill to read. Minimal insert: front, source, context, body;
> captured_on (YYYY-MM-DD), kind and status default. front = the front
> that wrote the row, a fronts slug — NOT NULL and a foreign key, so a
> forgotten front is refused rather than filed as someone else's. source
> = the snake_case name of the skill that invoked the capture, or
> 'standalone' when nothing did. context = what the work belonged to,
> <area>/<subject>: <repo>/<topic> for a session working one topic,
> meta/<subject> for process work or a study session with no repo. kind:
> friction (default, one per capture) | recurrence = the same root cause
> biting again: set anchor_id to the row it recurs (an enforced foreign
> key; drained rows still count), or anchor_text when no single row is
> the anchor (a named-cause slug), body then carrying at most one short
> where-it-bit clause | vision = material about where a product is
> heading rather than how the work went, product names it, several per
> session allowed | empty = a capture that found nothing, body '∅ no
> friction', never drained, excluded by kind. status: open | drained.
> Only a kaizen summary drains: it sets
> status='drained', drained_to = the topic, task id or friction-batch
> that took the row, and drained_at. Rows are never deleted: pointers
> must keep resolving and drained rows stay as evidence. Frequency = rows
> sharing an anchor (COALESCE(anchor_id, anchor_text)); a recurrence
> after its anchor was drained is the sharpest signal kaizen produces.
> This row is the grammar's home; the table's definition is
> sqlite_master, and every backup carries both.

> **`table:tasks`** — The coordinator where a session reaches no ymer:
> one row per unit of work, shaped as the minimum of ymer's task model so
> that promoting a row into ymer is a copy rather than a translation.
> status is ymer's own vocabulary under a CHECK — new | reopened |
> claimed | asking | completed | cancelled — with the groups open = new +
> reopened, doing = claimed + asking, closed = completed + cancelled; a
> fresh mint lands at new. project is the Roadmap the row would be minted
> into in ymer, derived from area with no lookup: area meta → 'Meta
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

**An existing table is verified, never rebuilt.** For each of the seven
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
- `frictions` — every column of the definition above
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
    slug, the one the front row below confirms in `fronts` (the foreign
    key refuses any other):
    `INSERT INTO topics_history (topic, area, artifact, body, phase, front) SELECT topic, area, artifact, body, 'hand_step', '<front>' FROM topics`,
    where the table also holds another front's rows, narrowed by a
    `WHERE` on `topic` to the ones this front moved.

  Then drop the table and its `_meta` row as above. The move needs a
  resolved state folder: where check 2 has not resolved one, the line
  says the move waits on check 2 and prints `<state folder>` as written
  rather than any path.

The `_meta` row outlives a table dropped on its own. Where the table is
gone but `_meta` still has its row, report that on the same line, with
its one statement,
`DELETE FROM _meta WHERE target = 'table:topics'`: the row still
describes the node as a state store, and the retirement is done only when
both are gone.

**This session's front row.** `frictions.front` is a foreign key, so a
capture on a front with no row is refused. Resolve this session's slug —
the one its own instructions name, and where they name none the default
for the harness it is running on, `claude_code` on Claude Code and
`cowork` on Cowork — then read whether `fronts` lists it:

```sql
SELECT slug FROM fronts WHERE slug = '<slug>'
```

One row is the pass, and nothing is written. No row → insert it:

```sql
INSERT INTO fronts (slug) VALUES ('<slug>')
```

The defaults fill the rest. A table whose owner extended it with NOT NULL
columns of their own will refuse that insert; report the refusal with the
statement, so they can run it with their columns filled in, and never
force it. The read comes first for the same reason: on a table that
already lists the slug the insert refuses on the key, and a refusal on a
healthy machine is a report nobody can act on.

### 2. The state folder

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

**The report prints whatever check 2 resolved** (→ The report), and that
printing is this check's real catch: a state folder that is real,
reachable and *wrong* passes every mechanical check there is. The
printed path, read by the person who is standing right here, is the only
thing that finds it —
which is why this runs with you present rather than inside every later run.

### 3. The ymer connection

Ymer is optional, and where this session does not reach it the node's
`tasks` table is the coordinator. One call proves the account, the
connection and the sign-in together, and its result is what check 4
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

### 4. The `Meta Roadmap` project

**This check runs only when check 3 reached ymer and passed.** Check 3's
result is the project list this check reads, so a failed connection
leaves nothing to read in; report this check as not checked, naming check
3. Do not call back into a connection that just refused. Where check 3
found no ymer at all, this check has nothing to do either: work about how
you work routes to `project = 'Meta Roadmap'` in the node's `tasks`
table, which is a value rather than an object to create. Report it as not
checked, naming the `tasks` table.

Work about how you work belongs to no product, so it gets a project of its
own, named exactly `Meta Roadmap`. Every machine with ymer has one — a
floor, not a naming decision, which is why setup creates it instead of
asking.

Check 3's result already lists it. Absent, create it with
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
printed whenever check 2 resolved one, a failed reading included. A
retired `topics` table, where one is left, gets a line of its own after
the node's, carrying its row count and its whole hand step: with no rows,
the two statements that clear the table and its `_meta` row; with rows,
their move and the history that records it first, then the same two
statements. A `_meta` row left without its table gets the same line,
with its one statement.

The node's line counts its tables and names the front: the number this
run created, with `created`, when it created any, and otherwise the
number the node holds; and `added` after the front only when this run
wrote the front's row. So a first run on an empty node reads
`` 7 tables created, front `claude_code` added `` and a re-run on a
healthy machine reads bare, `` 7 tables, front `claude_code` ``: the line
names what this run changed and nothing else, so a reader can tell a
repair from a machine that was already right.

```
Setup — ymer environment

  ✔ node          reachable — 7 tables, front `claude_code`
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

  ✔ node          reachable — 1 table created, front `cowork`
  – topics        retired — 1 row; move it into the state folder and into `topics_history` by hand, then DROP TABLE topics and its `_meta` row
  ✔ state_folder  /Users/you/state — not a git work tree, history in the node's `topics_history`
  ✔ ymer          no connection in this session — work tracked in the node's `tasks` table
  – Meta Roadmap  not checked — no ymer; process work routes to `Meta Roadmap` in `tasks`
```

With no state folder named, that one line fails and carries its fix:

```
  ✘ state_folder  not set — set it with /plugin configure ymer@ymer
```

A check that passed needs no explanation and a check that failed needs
exactly one next action, so the report carries nothing else.

## Remember

- Verify, create what is missing, never mutate what exists — re-running
  this skill is the whole upgrade story for everything setup owns
- The node is the floor: its absence fails check 1 and stops the battery.
  The state folder is required too — any folder, named once — and ymer
  is optional, the coordinator where this session reaches it
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
