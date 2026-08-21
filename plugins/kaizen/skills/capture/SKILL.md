---
name: capture
description: Use at the tail of a piece of work — standalone, or invoked by a kaizen block at your own skill's tail — to reflect with hindsight and append one friction to your backlog. The capture half of the kaizen practice; /kaizen:summary drains the backlog.
---

# Kaizen — Capture

Continuous improvement over your working process. The sensor is
self-report with hindsight at the moment a piece of work closes; the
store is the backlog; the actuator is `/kaizen:summary`, which drains
the backlog into improvement work.

Capture is one move: reflect on the work just finished, and append
**one** friction to the backlog. It runs standalone at the end of any
session, or at a covered skill's tail when that skill carries a kaizen
block (→ The kaizen block).

**Announce at start:** "Kaizen — capture (source `<source>`)."

**The design rests on one claim: queueing a friction is what makes it
recur.** So kaizen holds one store and no other, moves nothing between
containers at rest, and keeps no ranking between runs. Priority binds at
drain time — the moment just before work is taken is when the picture of
where the pain is is most accurate.

A **friction** is one hindsight observation of process waste. The
**backlog** is where frictions queue — kaizen's own store, not your
product's task backlog and not a to-do list. Nothing in it is work
anyone has committed to; it is evidence waiting to be weighed.

## The backlog

One file, named by absolute path — capture can fire in any directory,
including outside any project checkout:

- `${user_config.plans_dir}/backlog.md` — a short usage header, then
  every row capture has appended and summary has not yet drained, ∅ rows
  included. Nothing else, and no heading below the header: position
  carries no meaning but arrival order, so an append never has to find a
  place.

**Guard — the store path must be real.** If the path above still reads
as an unsubstituted `user_config` placeholder rather than a real
directory, this plugin is not configured yet. Stop, do not write
anything, and tell the user:

> Kaizen needs one folder for its state, under version control. Set it
> with `/plugin configure kaizen@ymer`, or reinstall with
> `claude plugin install kaizen@ymer --config plans_dir=<your folder>`.

**Bootstrap — the first capture at a path.** If `backlog.md` does not
exist yet, capture creates it. Two things happen before it does,
because a `plans_dir` that is real but *wrong* — a typo, a stale value,
a sibling folder — would otherwise start a silent second store instead
of stopping:

- **Check the folder is version-controlled**, which is what the setup
  message above asks for:

  ```
  git -C ${user_config.plans_dir} rev-parse --is-inside-work-tree
  ```

  A non-zero exit means the folder is missing or is not a git work
  tree. Stop with the setup message above, naming which of the two it
  was, and create nothing.

- **Say the path before writing it.** Announce "first capture at this
  path — creating `<the resolved absolute path to backlog.md>`", and
  ask the user to confirm it is the folder they configured. A typo that
  lands inside some *other* real repository then produces a visible
  question rather than a second store.

Then create it with the usage header below and nothing else, and append
through the writer as usual:

```markdown
# Backlog

Frictions captured by kaizen at session tails, one row per line in
arrival order — this file is the whole store. `/kaizen:summary` reads it
whole and drains exactly one thing per run, deleting the drained rows.
The file's length is the debt gauge. Grammar: the `kaizen:capture` skill.
```

Honest limit: those two checks catch a `plans_dir` that is missing or
unversioned, not one that is a real, versioned, wrong folder — the
announced path is the only thing standing between that case and a
second store. The writer's own refusal to touch a target that is not a
file (exit 3, nothing created) still holds, but after this bootstrap it
guards the later failures — a folder deleted after first use,
`backlog.md` replaced by a directory — not this one.

There is no second store file of any kind — no archive, no clusters
file, no staging. Nothing is ever moved between containers at rest: a
row leaves the backlog only by being deleted at a drain, and every drain
deposits a durable artifact elsewhere. The file's own length is the debt
gauge.

It is written only through the backlog writer,
`${CLAUDE_PLUGIN_ROOT}/scripts/backlog-append`, which appends with `>>`.
The kernel places every `O_APPEND` write at end-of-file atomically, so
two sessions appending at the same instant cannot clobber each other —
interleaved appends are benign, with no reader and no position to find.

The commit step below uses the **absolute** form
`git -C ${user_config.plans_dir} …` — cwd-robust, because capture also
fires outside any project checkout. The backlog path is absolute for the
same reason: the writer has to work from any directory at all.

One row per friction:

```
- <date> · <source>@<context> — <friction>
```

- `<source>` — the skill that invoked capture (its bare name, as it
  appears in the invocation), or `standalone` when nothing invoked it.
- `<context>` — the repo or product the work belongs to; in a session
  working one topic, `<repo>/<topic>`; a session with no repo uses its
  subject (a study session: `<skill>@<subject>`).
- One line per friction — evidence-line discipline: compression is the
  point; detail stays in the session's own artifacts, findable via the
  context.
- A capture that surfaces no friction still appends one row, with
  `∅ no friction` as the body. Without it there is no way to tell "this
  session found nothing" from "capture never ran" — and it is what makes
  a frictionless capture commit at all, so the `kaizen: capture
  (<source>)` log stays a complete record of which sessions reflected.
  ∅ rows belong to no cluster, take no exit, and are never drained.

**Recurrence rows.** A friction whose anchor capture finds still in the
backlog appends a pointer row, never a re-derived story:

```
- <date> · <source>@<context> — recurrence of <anchor>[ — <one short clause>]
```

`<anchor>` is the original row's `<date> · <source>@<context>`; the
optional clause is one short where-it-bit note. Pointer rows preserve the
count signal — rows sharing a root cause are the frequency evidence
summary weighs at pick time.

Capture greps `backlog.md` and nothing else, so it can only name an
anchor that is still in the backlog. When the grep finds nothing — a
genuinely new friction, or one whose anchor has already been drained —
capture writes an ordinary friction row, not a pointer. Recognising that
a *drained* friction has come back is summary's job, and it is the
sharpest signal kaizen produces.

**Vision rows.** Material that is worth keeping about where a *product*
is heading — rather than about how the work went — lands in the backlog
as a row of its own:

```
- <date> · <source>@<context> — vision(<product>): <material>
```

Nothing has to invoke capture to write one. Append it through the same
writer as a friction row, from wherever the material surfaced — a
planning skill's product-alignment beat is the natural producer, and
brainstorm's is the one this plugin was drawn from. That is a pattern to
follow if you have such a step, never a dependency capture needs: the
battery below asks about the work, not about the product, so a vision
row reaches the backlog on its own occasion rather than at a tail.

The `vision(<product>):` tag directly after the em-dash is the whole
discriminator: a row is a friction or a vision row, never both, and
`<product>` is the product the material is about, not the repo the
session ran in. Three rules follow, and they are the only places vision
rows differ from friction rows:

- **Several per capture are allowed** — the one exemption from capture's
  one-friction rule, which is otherwise untouched: one session may
  surface several pieces of vision material at once, while the capture
  still keeps exactly one friction.
- **Summary clusters them per product**, never by root cause and never
  mixed into a friction cluster, and drains a product's cluster into a
  topic of its own.
- **They never ride the friction-batch and never count toward its
  threshold.** The batch's edit surface is your own process prose
  and config; a product's direction is not that surface.

A vision row for a product with no Roadmap project is not a mistake: it
waits, and drains once that product has a project to write into.

## The capture

Purely reflective: the battery works on what the session itself knows —
no transcript files, no cost data, no tooling.

1. **Guard — one capture per tail.** Each closing tail captures once,
   with hindsight scoped to the work it closes. If this tail already
   captured (its kaizen block fired, or a standalone capture ran for the
   same work), decline and say so; never double-record.
2. **Run the six-probe battery**, self-asked with hindsight over the
   work just closed:
   1. **Rework** — what was done twice or undone (wrong turns, redone
      edits, re-fetched context), and what upstream input would have
      prevented it?
   2. **Waiting** — where did the session stall on something missing
      (input, decision, unavailable backend)?
   3. **Overprocessing** — where did tokens/time exceed the task's need
      (files read unused, duplicate agent work, output longer than its
      reader needs)?
   4. **Handoff loss** — what did this session rediscover that an
      earlier artifact should have carried, by that artifact's own
      purpose? Sanctioned re-verification (re-proving a lead against the
      code, a review re-checking a claim) is design, not loss — if that
      redundancy itself seems mispriced, record it under overprocessing,
      aimed at the process.
   5. **Instructions** — which instruction was confusing, contradictory,
      or missing — what wording would have prevented it?
   6. **Communication** — what in the user↔Claude exchange could
      improve? Constructive feedback toward the user is explicitly
      welcome — including "X is worth learning properly": a learning-gap
      friction is one summary can drain into a learning task.
3. **Keep the single highest-value friction.** One per capture, not
   three: the top friction is a better signal than the third-best, and
   the backlog is a queue to drain rather than a log to grow. 5-Whys it
   to its root cause — the row records the cause, not the symptom.
   Blameless: name the artifact or system, never the actor.
4. **Recurrence check — a grep, never a read.** After root-causing, take
   2–4 distinctive terms from the friction — a literal token it would
   share with its anchor: an option name, a path fragment, a slug — and
   search the backlog by name:

   ```
   grep -i -e '<term>' -e '<term>' ${user_config.plans_dir}/backlog.md
   ```

   Read only the matching lines; the file is never read whole. Naming
   the file explicitly also keeps the search immune to any ignore-file
   handling a recursive search would apply. Same root cause, not same
   wording → the friction gets a pointer row instead of a re-derived
   story (grammar: The backlog above); the anchor already carries it.

   That grep is the whole of capture's search. Never a wider tree and
   never git: capture runs at a tail with context already heavily
   consumed, which is the worst moment for a wide search, and everything
   wider is summary's.

   Honest limit: a recurrence that shares no vocabulary with its anchor
   is missed here, and one whose anchor has already been drained has
   nothing left to match. Both are accepted — summary reads everything
   and is the backstop.
5. **Urgent?** Flag it to the user now, outside the backlog — and the row
   still lands: pattern detection needs the evidence regardless of
   urgency.
6. **Append the row** (the capture's one friction, or the ∅ row) through
   the backlog writer, in one call. Rows go on stdin inside a **quoted**
   heredoc — `<<'ROW'` disables every shell expansion, so backticks,
   `$`, `!` and apostrophes inside a row survive verbatim with no
   escaping:

   ```
   ${CLAUDE_PLUGIN_ROOT}/scripts/backlog-append ${user_config.plans_dir}/backlog.md <<'ROW'
   - <date> · <source>@<context> — <friction>
   ROW
   ```

   The writer appends at end-of-file: there is no position to find, and
   the backlog is not read. It refuses a batch whose lines do not all
   start with `- `, leaving the file byte-identical — a rejection is a
   row to fix, never a row to force through.
7. **Commit — kaizen's own, after whatever commit the work itself made:**

   ```
   git -C ${user_config.plans_dir} add backlog.md
   git -C ${user_config.plans_dir} commit -m "kaizen: capture (<source>)" -- backlog.md
   ```

   Pathspec-scope the commit: the state folder can be written by
   concurrent sessions, and a bare commit would sweep in their staged
   work. Verify scoped: `git -C ${user_config.plans_dir} status` no
   longer lists `backlog.md`; foreign dirty paths may remain — other
   work in flight, leave them.

A stopped boundary skips capture: when a session stops on a failure
before reaching its tail, no capture fires — the failure itself is prime
material for the next session's capture.

## The kaizen block

Capture becomes a sensor at every tail, rather than something to
remember, by putting a **kaizen block** at the tail of each of your own
skills — three lines or fewer, pointing here and copying nothing:

```markdown
**Kaizen block:** invoke the `kaizen:capture` skill — source
`<this skill's name>`. Battery, row grammar, and commit live in that
skill alone.
```

That is the growth path: capture is useful standalone from the first
session, and every block you add turns another tail into a sensor. The
battery, the row grammar, and the commit live here and are never copied
into a block — a block that restates them drifts from this file the
first time either changes.

## Remember

- One capture per tail — a session that closes several pieces of work
  captures at each; kaizen declines a double-record
- One friction per capture — the single highest-value one
- The row records the root cause, not the symptom; blameless — name the
  artifact or system, never the actor
- A recurrence appends a pointer row at its anchor, never a re-derived
  story — and only when the anchor is still in the backlog
- Queueing a friction is what makes it recur: one store, nothing moved
  between containers at rest, no ranking kept between runs
- Kaizen commits its own backlog write, after the work's own commit
- "friction", never "finding"; the backlog is kaizen's store of
  observations, not a queue of committed work
