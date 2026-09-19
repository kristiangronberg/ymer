---
name: env
description: Use to set up and verify the environment every ymer-marketplace plugin works from — the Ymer Node and its store skeletons, the state folder, the ymer connection, and the Meta Roadmap project. Run it after installing, and whenever a skill's guard sends you here.
---

# Setup — Env

`/setup:env` puts the environment into the state the other plugins' skills
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
re-running can only report on it. And a table's `_meta` grammar row is
written once: an existing description is its owner's and is never
rewritten (→ The grammar rows), so a grammar this skill later rewords
reaches a node that already has one only by hand.

## What decides where things go — the reach rule

Two stores answer two different questions, and **a store is the default
where this session reaches it**:

- **The coordinator** — what tracks work and how topics are named there.
  Ymer's tool surface among this session's tools → ymer's Roadmap
  projects. Absent → the node's `tasks` table.
- **The state store** — where a topic's artifacts live. A resolved
  `plans_dir` naming a git work tree → that state folder. None → the
  node's `topics` table.

Read once, at the run's start, from what the session has — never asked,
and never configured beyond `plans_dir`. All four combinations are real
installs. A store this session *reaches* but cannot use — a ymer call
that errors, a `plans_dir` whose folder is missing or is no work tree,
two plugins disagreeing on it — is a failure to report, never a reason to
use the other one: falling back on a failure forks your work across two
stores without saying so.

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

**The skeletons.** Five tables, created in this order — `fronts`,
`frictions`, `tasks`, `tasks_log`, `topics`. The order is load-bearing:
`frictions` keys on `fronts(slug)` and `tasks_log` on `tasks(id)`.

Read what is there first, with the `notebook` `tables` action, and then
work table by table. **The node runs one statement per `execute` call and
drops the rest of a multi-statement call without a word**, so every
statement below is a call of its own — a batched skeleton creates its
first table and silently loses the other twelve writes.

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

`topics` — the state store where a session reaches no state folder, one
row per artifact:

```sql
CREATE TABLE topics (
  id         INTEGER PRIMARY KEY,
  topic      TEXT NOT NULL,
  area       TEXT NOT NULL,
  artifact   TEXT NOT NULL,
  body       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  UNIQUE (topic, artifact)
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

The five texts, each the grammar of its table:

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
> the count of open rows is the debt gauge. The kaizen plugin's capture
> skill is today's main producer, at session tails on every front; any
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
> Only the kaizen plugin's summary skill drains: it sets
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

> **`table:topics`** — A topic's artifacts where a session reaches no
> state folder: one row per artifact, keyed (topic, artifact), holding
> what the same artifact would hold as a file. topic is the dated topic
> id YYYY-MM-DD-<slug>; area is the repo or product it belongs to, with
> meta reserved for process work; artifact is the file name that artifact
> carries in a state folder — request.md for everything the kaizen
> plugin's summary skill writes; body is its text. UNIQUE (topic,
> artifact) so one artifact is never written twice under one topic. A
> front that runs later phases of its own writes them as further rows
> under the same topic. A large body is read in substr windows rather
> than whole, an MCP result having a size cap, and an append locates its
> heading with instr and rewrites the body in one UPDATE.

**An existing table is verified, never rebuilt.** For each of the five
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
- `topics` — `topic`, `area`, `artifact`, `body`, `created_at`,
  `updated_at`

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

A state folder is optional, and where there is none the node's `topics`
table is this session's state store. It is one folder, under version
control, shared by every plugin here that takes one. The values live in
the user settings file — `settings.json` under `$CLAUDE_CONFIG_DIR`, or
under `~/.claude` when that variable is unset — keyed by plugin:

```
pluginConfigs.<plugin>@ymer.options.plans_dir
```

That file is the one to read and the one to name in the report: plugin
option values come from user, `--settings` and managed settings only,
never from a project's own settings.

Read every `@ymer` entry and resolve one value:

- **Nothing carries `plans_dir`, or the file cannot be read from this
  session** — pass the check, reporting the `topics` table as this
  session's state store. Where the harness has a door to plugin
  settings, name it as the way to use a folder instead:

  > No ymer plugin has its state folder set in `<the settings file
  > read>`, so topics are kept in the node's `topics` table. To keep
  > them in a folder instead — one folder for your state, under version
  > control — set it with `/plugin configure setup@ymer`, or reinstall
  > with `claude plugin install setup@ymer --config
  > plans_dir=<your folder>`.

  Name those two commands only on Claude Code. On a harness with no
  plugin-settings door, report the `topics` table and stop there: a
  command the session cannot run is not a fix.

- **Two plugins disagree** — fail the check and change nothing. Which one
  is right is a question only you can answer, and guessing forks your
  state across two folders.

- **One value** — that is the resolved `plans_dir`, and it must be a git
  work tree:

  ```
  git -C <plans_dir> rev-parse --is-inside-work-tree
  ```

  A non-zero exit fails the check: the folder is missing, or it is not
  under version control. Say which of the two, and name the fix — create
  the folder and `git init` it, or correct the setting. Setup never
  creates the state folder itself: a mistyped path that setup helpfully
  created is exactly the silent second store this check exists to
  prevent. A setting that is there and broken is a failure, never a
  reason to use `topics` instead.

**The report prints whatever check 2 resolved** (→ The report), and that
printing is this check's real catch: a `plans_dir` that is real, versioned
and *wrong* passes every mechanical check there is. The printed path, read
by the person who is standing right here, is the only thing that finds it —
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
product. Its tasks are what to do next. `/kaizen:summary` drains
process-level picks here; a pick about a product goes to that product's
`<Product> Roadmap` instead.
```

Present, leave it untouched, description included. Per-product Roadmap
projects are *not* setup's to create: they are born from your products,
and the skill that needs one says so when it is missing.

## The report

One line per check, in order — a pass, a failure with the single command
or edit that fixes it, or `not checked` naming the earlier check it waits
on. A check that passed on reach rather than on configuration says which
store is in use, because that is the thing worth reading. The resolved
`plans_dir` is printed whenever check 2 resolved one, a failed work-tree
probe included; where two plugins disagree the line carries both values
and the plugins holding them instead.

```
Setup — ymer environment

  ✔ node          reachable — 5 tables, front `claude_code`
  ✔ plans_dir     /Users/you/state (setup@ymer) — git work tree
  ✔ ymer          reachable
  ✔ Meta Roadmap  exists

Ready. Re-run /setup:env whenever you like — it changes nothing that is
already right.
```

A machine with neither optional store reads the same way, and every line
is a pass:

```
Setup — ymer environment

  ✔ node          reachable — 5 tables created, front `cowork` added
  ✔ plans_dir     not set — topics kept in the node's `topics` table
  ✔ ymer          no connection in this session — work tracked in the node's `tasks` table
  – Meta Roadmap  not checked — no ymer; process work routes to `Meta Roadmap` in `tasks`
```

A check that passed needs no explanation and a check that failed needs
exactly one next action, so the report carries nothing else.

## Remember

- Verify, create what is missing, never mutate what exists — re-running
  this skill is the whole upgrade story for everything setup owns
- The node is the floor: its absence fails check 1 and stops the battery.
  Ymer and a state folder are optional, and each is the default where
  this session reaches it
- A store reached but broken is a failure, never a reason to use the
  other one — that would fork your work across two stores silently
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
