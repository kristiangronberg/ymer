---
name: setup
description: Sets up and checks the environment every ymer-marketplace plugin works from: the Ymer Node and its store skeletons, this installation's front, the state folder, the ymer connection, and the Meta Roadmap project. Use it after installing, and whenever another skill's guard sends you here.
---

# Setup

`/ymer:setup` puts the environment into the state every plugin's skills
assume, and reports what it found.

**Announce at start:** "Setup: checking the ymer environment."

Setup owns the environment and the start position those skills work
from: store skeletons present, configuration wired, universal floors in
place. A skill owns its own domain and never sends you here for domain
state.

**The battery below is the desired state.** Every check verifies,
creates what is missing, and never mutates what already exists. So a
healthy machine reports all-pass and changes nothing, and re-running
this skill converges everything setup owns (skeletons, settings and
floors) with no migration step and nothing to version. Three things sit
outside that promise. The ymer connection is yours, it lives outside
any plugin, and re-running can only report on it. The state folder is
yours too: setup verifies it and never creates it (→ check 3). And what
this skill writes once, each table's `_meta` grammar row, the `kinds`
rows and the `Meta Roadmap` project's description, is its owner's from
then on and never rewritten: a release that words one of them
differently changes what a new install gets, and nothing an existing
one holds.

This file is the spine: what each check is for and what passes and
fails it, in the order the battery runs them. The exact statements,
the texts setup writes once and each harness's way of reading a setting
are in `mechanics.md`; the cases that went wrong once, and why a rule
is drawn where it is, are in `cases.md`. Both sit under this file's
headings, and a check with entries there names them in a line of its
own. Check 1's comes after the node is reached, so neither reference
file is needed before the node answers.

## Where things go: the reach rule

Two stores answer two different questions. **The coordinator is the
default where this session reaches it; the state folder is required,
and which history tracks it is read from the folder itself**:

- **The coordinator**: what tracks work and how topics are named there.
  Ymer's tool surface among this session's tools → ymer's Roadmap
  projects. Absent → the node's `tasks` table.
- **The state store**: where a topic's artifacts live, the state folder
  (→ check 3) together with the history that tracks it. The folder's
  kind decides that history; the reading and what each outcome means
  are the operations contract's
  (`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`, § The topic's
  artifacts), and check 3 says what setup does under each.

Read once, at the run's start, from what the session has: never asked,
and never configured beyond the state folder's path and the front's
name. All four combinations of coordinator and history are real
installs. A store this session *reaches* but cannot use (a ymer call
that errors, a state folder that is not named, is missing, or is out of
this session's reach) is a failure to report, never a reason to use
another one: falling back on a failure forks your work across two
stores without saying so.

The Ymer Node itself is not in the rule. It is the floor every plugin
here stands on, and check 1 is where its absence is a failure.

## The battery

Five checks, in order, each reported on its own line (→ The report). A
check that fails reports and the next runs, except where a check says
it stops the battery or names the check it waits on.

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

**The node's name.** Register the node as `ymer-node`, the name that
line gives it: mint's scorer lists the node's `notebook` tool under that
server name. A node reached under another name passes this check, and
on Claude Code its line notes the name it was reached under, with the
commands that register it again as `ymer-node` (`mechanics.md` § 1).

*With the node reached, read with this section: `mechanics.md` § 1. The Ymer Node and its store skeletons (the mechanics) and `cases.md` § 1. The Ymer Node and its store skeletons (the cases).*

**The skeletons.** Eight tables, created in this order:

1. `fronts`: the front every other row keys on.
2. `kinds`: the kinds a drop in the pool is captured under, each row
   carrying its kind's rule.
3. `pool`: the one store of drops waiting to be drawn into work.
4. `pool_scores`: the pool's scores, one row per scored drop, kept
   beside the pool so a drop's own row stays as it was observed.
5. `tasks`: the coordinator where a session reaches no ymer.
6. `tasks_log`: that coordinator's journal.
7. `tutor_subjects`: half of the subject index, the learning track's
   index of its knowledge docs.
8. `tutor_engagements`: the subject index's other half, its open
   engagements.

The order is load-bearing: `pool` keys on `fronts(slug)` and
`kinds(kind)`, `pool_scores` on `pool(id)`, `tasks_log` on `tasks(id)`,
and `tutor_engagements` on `tutor_subjects(subject)`.

Read what is there first, with one `notebook` `query` that names the
eight tables and the retired `topics` in `sqlite_master` and asks
`_meta` for the retired table's row (the statement and how to read its
answer: `mechanics.md` § 1), and then work table by table.
**The node runs one statement per `execute` call
and drops the rest of a multi-statement call without a word**, so every
statement is a call of its own: a batched skeleton creates its first
table and silently loses every write after it.

Before the first statement that changes what the notebook already holds
(creating, altering or dropping a table, an `UPDATE` or a `DELETE`),
take a notebook backup (the operations contract,
`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`, § Changing the
notebook). A healthy re-run changes nothing and takes none, and
inserting a missing grammar, kind or front row needs none either.

**The grammar rows.** SQLite carries no column comments, so each
table's grammar lives in the notebook's `_meta` description: the one
place a client with no skill to read can learn what a column means. The
node creates `_meta` itself on its first action, so there is nothing to
create; write one row per table, eight in all, each with
`INSERT OR IGNORE`.

**`OR IGNORE` is the whole safety of this step, and `OR REPLACE` is the
shape to avoid.** A node that has been in use carries a description its
owner extended (the columns their front added, the rules their work
runs by), and that text lives nowhere else. Replacing it destroys it
silently, on a run whose whole promise is that it changes nothing
already right.

**The kinds.** `kinds` carries one row per kind, six in all, and the
rows are the rules a drop is captured by: written once like the grammar
rows and with the same `INSERT OR IGNORE`, one statement per row, so a
kind its owner reworded keeps the owner's words and a missing one is
added. The order is the point: `bug` comes first so that whatever does
not work as written is never filed as waste, and `friction` comes last
because it is what remains when everything worked. `empty` has no place
in the order: it records that the work was looked back on and nothing
was found.

**An existing table is verified, never rebuilt.** For each of the eight
that already exists, read it with the `notebook` `schema` action and
check its required columns **by name and type**, nothing else. A
missing one is added. A required column that is present with a
different type is **reported and left alone**, and so is a column
SQLite refuses to add: each is reported with the statement that would
change it, a hand step on a table that is already someone's. Rebuilding
a table to match a declaration would take its owner's rows and their
columns with it, so this check says what differs and stops there. Name
and type is the whole comparison: a default, a `CHECK` or a foreign key
sits deliberately outside it.

**A retired `topics` table is reported, never dropped.** Earlier
releases kept a topic's artifacts as rows in a `topics` table where no
state folder was set. Topics now live in the state folder, and nothing
reads or writes that table. Where the notebook still has one, count its
rows and report it as retired, on a line of its own, with the one hand
step that clears it:

- **No rows**: drop the table and its `_meta` row.
- **Rows**: move each one into the state folder by hand first, from a
  session on the front it belongs to, committing the moved folders
  where the state folder is its own git repository, then drop the table
  and its `_meta` row. The move needs a resolved state folder: where check 3
  has not resolved a folder or has refused it, the line says the move
  waits on check 3 and prints `<state folder>` as written rather than
  any path.
- **No table, but its `_meta` row**: the row outlives a table dropped
  on its own, and still describes the node as a state store. Report it
  on the same line with its one statement; the retirement is done only
  when both are gone.

It is never a failure, because nothing depends on it, and setup never
drops it or moves its rows: they are yours, and files written into a
folder setup guessed are exactly the silent second store this battery
exists to prevent.

### 2. This installation's front

*Read with this section: `mechanics.md` § 2. This installation's front (the mechanics) and `cases.md` § 2. This installation's front (the cases).*

A front is one installation (a harness config with its own account,
connectors, plugin options and instructions), and its slug is the key
every drop carries into `fronts`: `pool.front` is a foreign key, so a
write from a front with no row is refused, and a mint draws only its
own front's drops. This check reads and writes the node, so it runs
whenever check 1 reached it: a difference check 1 reports on a table
stops nothing here, and only a node check 1 could not reach leaves this
check `not checked`. Its failure fails its own line and stops nothing:
the checks after it still run and report, so one run shows every
configuration failure at once.

The slug is always named, never defaulted. A re-run of one installation
and a second installation of the same harness look identical to setup,
so a default would merge two fronts' rows without a word. Where the
name comes from depends on the harness this session runs on, told from
the session's own tools, exactly as the state folder's does (→ check
3).

**Where the harness writes plugin options into this skill** (Claude
Code), the slug is the `ymer` plugin's `front` option. The harness
writes that option into this skill's text as it loads it, so the value
is read here, from this one line, and from no file:

> Front as configured: `${user_config.front}`

That line is the whole answer, read as check 3 reads the state folder's
line: a slug there is this front's, and the placeholder itself (a
dollar sign and braces still around `user_config.front`) means the
option is unset. An instruction naming a front is not read on this
harness: the option alone names it.

**Where the harness does not** (Cowork, whose skills read the
placeholder whatever the option holds), the instructions this session
started with name the slug (→ `mechanics.md` § 2). Two instructions
naming two different slugs fail the check, naming both, with the fix:
keep the slug in one of them and remove it from the other
(→ `cases.md` § 2). Never pick one.

Read what `fronts` lists, whether or not a slug was named: the pass and
the insert need it, and every failure below names what it returns.

- **Listed**: the pass, and nothing is written. A slug that already has
  a row passes whatever its shape: the row is its owner's.
- **Not listed**: a new front, and its row is inserted. First the
  slug's shape: lowercase snake_case (letters, digits and `_`, starting
  with a letter). Once inserted it is the key on every row this front
  writes, which setup never rewrites, so a slug of any other shape
  fails the check with that rule and nothing is written. Its fix is a
  rename where the slug was named: `/plugin configure ymer@ymer` or the
  install line's `--config front=<your front>` on Claude Code, the
  instructions this session started with on Cowork. The defaults fill
  the rest of the row; an insert the table refuses is reported with
  its statement and never forced (→ `cases.md` § 2).

No slug named (the placeholder on Claude Code, none in the instructions
on Cowork) fails the check with the fix for the harness this session
runs on. On Claude Code:

> The `ymer` plugin's `front` option is not set, and the plugin needs a
> name for this installation: the front every drop and topic it saves
> is filed under. Set it with `/plugin configure ymer@ymer`, or
> reinstall with `claude plugin install ymer@ymer --config
> front=<your front>`.

If the option was set and still reads `not set`, the causes are the
state folder's (→ check 3): set on another plugin, set in a project's
own settings, or a harness that does not pass plugin options through.
On Cowork, the message is `mechanics.md` § 2's.

**Every failure of this check names the fronts the node already
holds**, after its fix: the slugs the read above returned, which every
failure runs, the no-slug and two-slug ones included, with the advice
to name this installation's own slug again if it has one. An
installation whose drops are already filed under one of them keeps
them only by naming that slug, and a fresh name would leave them
invisible to its mint without a word. Where `fronts` is empty the list
is left out. The list is a fact read, never a pick: setup proposes no
slug.

### 3. The state folder

*Read with this section: `mechanics.md` § 3. The state folder (the mechanics) and `cases.md` § 3. The state folder (the cases).*

The state folder is required. It is the one folder this front keeps its
topics' artifacts in, laid out `<area>/YYYY/MM-DD-<topic>/`, and it can
be any folder you choose that does not sit inside another git
repository: nothing assumes it is next to your repositories, and it
need not be under version control. It is always named, never inferred,
and where its name comes from depends on the harness this session runs
on, told from the session's own tools.

**Where the harness writes plugin options into this skill** (Claude
Code), the path is the `ymer` plugin's `state_folder` option. The
harness writes that option into this skill's text as it loads it, so
the value is read here, from this one line, and from no file:

> State folder as configured: `${user_config.state_folder}`

That line is the whole answer. Resolve it from what it shows, and open
nothing to confirm what it says: no file and no command reads the value
better than this line, and the placeholder showing there is itself an
answer, never a sign to look elsewhere.

- **A path**: that is the state folder, printed exactly as it reads. A
  leading `~` is your home directory: keep that one character unquoted
  at the front of the path wherever a command uses it, so the shell
  expands it.
- **The placeholder itself** (a dollar sign and braces still around
  `user_config.state_folder`) means the option is unset, and that fails
  the check:

  > The `ymer` plugin's `state_folder` option is not set, and the plugin
  > needs one folder to keep your topics in: its own git repository or
  > one in no git repository. Set it with `/plugin configure ymer@ymer`,
  > or reinstall with `claude plugin install ymer@ymer --config
  > state_folder=<your folder>`.

  Say this too, after the message above:

  > If you did set a folder and still read `not set`, check that it is
  > set on the `ymer` plugin and not another one, as user, `--settings`
  > or managed configuration rather than in a project's own settings;
  > and if it is, this harness is not passing plugin options through.

  The report prints `not set` rather than guessing at why
  (→ `cases.md` § 3).

**Where the harness does not** (Cowork), the instructions this session
started with name the folder, and it must be one this session reaches
(→ `mechanics.md` § 3). No path named, or a path outside the folders
this session reaches, fails the check with the message there. Two
instructions naming two different folders fail the check, naming both,
with the fix: keep the folder in one of them and remove it from the
other (→ `cases.md` § 3). Never pick one.

**The folder's kind.** With a path in hand, read the folder's kind. The
reading, its outcomes and what each means for the folder's history are
the operations contract's (`${CLAUDE_PLUGIN_ROOT}/operations-contract.md`,
§ The topic's artifacts), and setup runs it exactly as stated there.
Run it bare: the tool reports a non-zero exit and its message by
itself, so nothing is appended to capture the status. What this check
does under each outcome:

- **Its own git repository**, or **a folder in no git repository**: a
  pass, and the report says which (→ The report). The check runs
  no further command on the folder: git's answer already shows that it is
  there.
- **Exit 127**: the shell found no `git` to run, so this session has no
  git, and the reading says nothing about whether the folder exists.
  List it with this session's own file tools, never another command.
  Found: a pass, and the report names the reason rather than a kind (no
  git in this session, the files are the record). Not found: the missing-folder failure below.
- **Inside another git repository**: that fails the check, since every
  save would commit into that other repository, which may be shared or
  pushed anywhere, and its own `add -A`, `stash -u` and `clean -x` would
  sweep up, set aside or delete your topics. Name the folder and the
  prefix, which says how deep inside the other repository it sits, and
  both fixes: run `git init` in the folder and list the folder in the
  enclosing repository's `.gitignore`, so it becomes its own git
  repository that the other one leaves alone; or choose a folder in no
  git repository. Setup runs neither fix and edits neither repository:
  which history keeps your topics is yours to choose.
- **The folder is not there** (a non-zero exit whose message says
  `cannot change to`): that fails the check. Name the fix: create the
  folder, or correct the setting or the instructions that name it.
  Setup never creates the state folder itself: a mistyped path that
  setup helpfully created is exactly the silent second store this check
  exists to prevent.
- **Anything else** is a state no reading names (→ `cases.md` § 3).
  That fails the check: name the folder and what the reading returned,
  and ask what the folder is. Setup never picks a history on a guess.

One combination the folder cannot tell: **a session whose only shell
over the state folder is a remote device's**, where the reading finds
the folder's own git repository. That fails the check: say that this
session reaches the folder's git only through a remote device's shell,
and name the fix, point this front at a folder in no git repository.
The session is told from its own tools, as the harness is: no shell of
its own reaches the folder, and the reading ran through the device's
(why: → `cases.md` § 3). Every phase after
setup relies on the folder's kind alone, so none of them meets this
case.

**The report prints whatever check 3 resolved** (→ The report), and
that printing is this check's real catch: a state folder that is real,
reachable and *wrong* passes every mechanical check there is. The
printed path, read by the person who is standing right here, is the
only thing that finds it, which is why this runs with you present
rather than inside every later run.

### 4. The ymer connection

*Read with this section: `mechanics.md` § 4. The ymer connection (the mechanics).*

Ymer is optional, and where this session does not reach it the node's
`tasks` table is the coordinator. One call proves the account, the
connection and the sign-in together, and its result is what check 5
reads: a `projects list` name search for `Roadmap`.

Any result passes, an empty one included. A failure (an outage, a
sign-in that has lapsed) fails the check and says so plainly: setup can
neither repair an outage nor sign you in, and a ymer that is there and
failing is not a session without ymer. `/mcp` is where to look.

**No such call available at all** is the other case, and it is a pass:
this session has no ymer, so the `tasks` table is its coordinator. The
call counts as available when it is among this session's tools whether
or not it has been loaded yet: a harness that defers tools until they
are needed still has it.

**On Claude Code, tell absence from a lapsed sign-in before passing.** A
server whose sign-in has lapsed contributes no tools at all, so it
presents exactly as no ymer. A lapsed sign-in fails the check with
`claude mcp login ymer` as its fix; no such server is the absence this
pass means (how to tell them apart: → `mechanics.md` § 4). A harness
with no such door reads the tool list alone and says so.

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

*Read with this section: `mechanics.md` § 5. The `Meta Roadmap` project (the mechanics).*

**This check runs only when check 4 reached ymer and passed.** Check 4's
result is the project list this check reads, so a failed connection
leaves nothing to read in; report this check as not checked, naming
check 4. Do not call back into a connection that just refused. Where
check 4 found no ymer at all, this check has nothing to do either: work
about how you work routes to `project = 'Meta Roadmap'` in the node's
`tasks` table, which is a value rather than an object to create. Report
it as not checked, naming the `tasks` table.

Work about how you work belongs to no product, so it gets a project of
its own, named exactly `Meta Roadmap`. Every machine with ymer has one:
a floor, not a naming decision, which is why setup creates it instead
of asking.

Check 4's result already lists it. Absent: create it, named exactly
`Meta Roadmap`, with the description `mechanics.md` § 5 carries.
Present: leave it untouched, description included. Per-product Roadmap
projects are *not* setup's to create: they are born from your products,
and the skill that needs one says so when it is missing.

## The report

One line per check, in order: a pass, a failure with the single command
or edit that fixes it, or `not checked` naming the earlier check it
waits on. A check that passed on reach rather than on configuration
says which store is in use. The state folder's line names the folder's
kind, or, in a session with no git, that reason, and who keeps its
history: `history in git`, or, in exactly these words, `the files are
the record`. Those are the things worth
reading. The state folder is printed whenever check 3 resolved one, a
failed reading included. A retired `topics` table, where one is left,
gets a line of its own after the node's, carrying its row count and its
whole hand step: with no rows, the two statements that clear the table
and its `_meta` row; with rows, their move and the history that records
it first, then the same two statements. A `_meta` row left without its
table gets the same line, with its one statement.

The node's line counts its tables: the number this run created, with
`created`, when it created any, and otherwise how many of the eight the
node holds.
The front's line names the slug, with `added` after it only when this
run wrote its row. So a first run on an empty node reads
`8 tables created` and `` `work_laptop` added ``, and a re-run on a
healthy machine reads both bare, `8 tables` and `` `work_laptop` ``:
each line names what this run changed and nothing else, so a reader can
tell a repair from a machine that was already right. Where the node
failed, the front's line reads `not checked`, naming the node.

```
Setup — ymer environment

  ✔ node          reachable — 8 tables
  ✔ front         `work_laptop`
  ✔ state_folder  /Users/you/state — its own git repository, history in git
  ✔ ymer          reachable
  ✔ Meta Roadmap  exists

Ready. Re-run /ymer:setup whenever you like — it changes nothing that is
already right.
```

A node reached under a name other than `ymer-node` passes, and on Claude
Code its line says so, with the fix:

```
  ✔ node          reachable — 8 tables; reached as `my-node`, not `ymer-node`, so mint's scorer cannot start and mint scores in-session — claude mcp remove my-node -s user, then claude mcp add --transport http --scope user ymer-node http://127.0.0.1:8012/mcp
```

A folder in no git repository passes the same way, and a machine
with no ymer reads its coordinator by reach:

```
Setup — ymer environment

  ✔ node          reachable — 1 table created
  – topics        retired — 1 row; move it into the state folder by hand, then DROP TABLE topics and its `_meta` row
  ✔ front         `home_desktop` added
  ✔ state_folder  /Users/you/state — in no git repository, the files are the record
  ✔ ymer          no connection in this session — work tracked in the node's `tasks` table
  – Meta Roadmap  not checked — no ymer; process work routes to `Meta Roadmap` in `tasks`
```

With no front and no state folder named, those two lines fail, each
carrying its own fix, the front's with the fronts the node holds:

```
  ✘ front         not set — set it with /plugin configure ymer@ymer; the node holds `work_laptop`, name it again if it is this installation
  ✘ state_folder  not set — set it with /plugin configure ymer@ymer
```

A folder inside another git repository fails its line, naming the
prefix the reading printed and both fixes; a session with no git
passes the folder its file tools found, naming that reason where a kind
would stand; and a session that reaches a git folder only through a
remote device's shell fails, naming the fix. One line of the three,
never more:

```
  ✘ state_folder  /Users/you/state — inside another git repository, prefix `state/` — run `git init` in it and list it in that repository's `.gitignore`, or choose a folder in no git repository
  ✔ state_folder  /Users/you/state — no git in this session, the files are the record
  ✘ state_folder  /Users/you/state — its own git repository, reached only through a remote device's shell — point this front at a folder in no git repository
```

A check that passed needs no explanation and a check that
failed needs exactly one next action, so the report carries nothing
else.

## Remember

- Verify, create what is missing, never mutate what exists: re-running
  this skill is the whole upgrade story for everything setup owns
- The node is the floor: its absence fails check 1 and stops the
  battery. The front and the state folder are required too, each named
  once per installation and neither ever defaulted, and ymer is
  optional, the coordinator where this session reaches it
- A new front's slug is inserted only in lowercase snake_case; a slug
  that already has a row is its owner's, whatever its shape
- A store reached but broken is a failure, never a reason to use
  another one: that would fork your work across two stores silently
- One statement per `notebook` `execute` call; the node drops the rest
  of a batch without a word
- `_meta` descriptions go in with `INSERT OR IGNORE`: an existing
  description is its owner's, and it lives nowhere else
- An existing table is checked by column name and type, never rebuilt;
  what differs is reported with the statement that would change it
- Setup writes floors, never content: per-product Roadmap projects
  belong to the skills and to you
- Name a fix command only where the harness can run it; say the store in
  use otherwise
- A check whose input never resolved reports `not checked` and writes
  nothing: setup repairs on facts, never on a guess
