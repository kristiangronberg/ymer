# Setup: cases

The cases of the setup skill: the precision earned from runs that went
wrong once, and why a rule is drawn where it is. The headings are
`SKILL.md`'s own; read a section's entries at the moment that section
runs.

Contents:

- 1. The Ymer Node and its store skeletons: why name and type is the
  whole comparison, the columns SQLite refuses to add
- 2. This installation's front: two instructions naming two slugs, an
  insert the table refuses
- 3. The state folder: why the report prints `not set`, two instructions
  naming two folders, a reading no outcome names, git through a remote
  device

## The battery

### 1. The Ymer Node and its store skeletons

**Why name and type is the whole comparison.** The `schema` action does
not carry a column's default, `CHECK` or foreign key. The table's own
declaration does, one read away through `query`:

```sql
SELECT sql FROM sqlite_master WHERE type='table' AND name='tasks'
```

but SQLite stores that text exactly as its author wrote it, so
comparing it against the grammar in `mechanics.md` would report a
difference for any table whose author spelled the same constraint
differently, and a difference this check may never rewrite anyway. A
run whose whole promise is that it changes nothing already right has no
use for a report nobody can act on. Read that declaration by hand when
you are chasing a real difference; the battery reads name and type.

**The columns SQLite refuses to add.** `ADD COLUMN` refuses some
columns outright: a PRIMARY KEY or UNIQUE column always, and on a table
that already holds rows a NOT NULL column with no default, or one whose
default is an expression rather than a constant. Report such a refusal
with the statement, exactly as a differing type is reported.

### 2. This installation's front

**Two instructions naming two slugs.** On Cowork, the front's own
instructions and a `CLAUDE.md` in a connected folder, say, can each
name a slug. Two different slugs fail the check, naming both, with the
fix: keep the slug in one of them and remove it from the other.

**An insert the table refuses.** A table whose owner extended it with
NOT NULL columns of their own will refuse the new front's insert, which
names the slug alone. Report the refusal with the statement, so they
can run it with their columns filled in, and never force it. The read
of `fronts` comes before the insert for the same reason: on a table
that already lists the slug the insert refuses on the key, and a
refusal on a healthy machine is a report nobody can act on.

### 3. The state folder

**Why the report prints `not set`.** The placeholder reads unset not
only when the option is unset. It reads the same for a folder set under
some other plugin's options rather than the `ymer` plugin's, for a
folder set at the project-settings level rather than as user,
`--settings` or managed configuration (this substitution never sees a
project's own settings), and on a harness that keeps the option but
does not write it into the skill's text. None of these can be told
apart from inside the run, so the report prints `not set` rather than
guessing, and the second message names where to look.

**Two instructions naming two folders.** On Cowork, the front's own
instructions and a `CLAUDE.md` in a connected folder, say, can each
name a state folder. Two different folders fail the check, naming
both.

**A reading no outcome names.** `false` with exit 0 is what git prints
for a bare repository or a `.git` directory, neither of them a folder
meant to hold topics, so it lands in "anything else" with every other
answer the contract's reading does not name.

**Git through a remote device.** On Cowork the folder's kind is read
through the device's own shell (`mechanics.md` § 3). The reading only
reads: it takes no lock and writes nothing into the folder. Every
later save would be another matter. A session whose only shell over
the state folder is a remote device's would run every commit through a
git that is not the host's, and such a git has left a lock file in a
repository's `.git` that it could not then remove.
