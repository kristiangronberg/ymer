---
name: capture
description: Use at the tail of a piece of work to reflect with hindsight and append one friction to your backlog.
---

# Kaizen — Capture

Capture is one move: reflect on the work just finished, and append
**one** friction to the backlog. It runs standalone at the end of any
session, or at a covered skill's tail when that skill carries a kaizen
block (→ The kaizen block).

**Announce at start:** "Kaizen capture: (source `<source>`)"

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

**Guard — environment failures have one door.** Anything this skill needs
that setup owns and finds broken — a `plans_dir` still reading as an
unsubstituted `user_config` placeholder rather than a real folder, a
state folder missing or not a git work tree, a `backlog.md` absent or
unwritable, a failing ymer call — stops the run with one instruction:
**run `/setup:env`** (install it first with
`claude plugin install setup@ymer`, then start a fresh session — a
plugin's skills load at session start). Repair nothing here, and never
guess a path.

There is no second store — no archive, no clusters file, no staging — and
nothing moves between containers at rest: a row leaves the backlog only
by being deleted at a drain, and every drain deposits a durable artifact
elsewhere. The file's own length is the debt gauge.

**Write it only through the backlog writer,**
`${CLAUDE_PLUGIN_ROOT}/scripts/backlog-append`, at the absolute path
above. Its `O_APPEND` write lands at end-of-file atomically, so
concurrent sessions cannot clobber each other and nothing has to read the
file to find a position; any other way of writing gives that up. The
absolute path is not a style choice either — capture fires from any
directory at all, so nothing here may depend on the current one.

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
  point, and detail stays in the session's own artifacts, findable via
  the context.
- A capture that surfaces no friction still appends one row, with
  `∅ no friction` as the body — otherwise "this session found nothing"
  and "capture never ran" look identical, and a frictionless capture
  would not commit at all. ∅ rows belong to no cluster, take no exit, and
  are never drained.

**Recurrence rows.** A friction whose anchor capture finds still in the
backlog appends a pointer row, never a re-derived story:

```
- <date> · <source>@<context> — recurrence of <anchor>[ — <one short clause>]
```

`<anchor>` is the original row's `<date> · <source>@<context>`; the
optional clause is one short where-it-bit note. Pointer rows preserve the
count signal — rows sharing a root cause are the frequency evidence
summary weighs at pick time.

Capture searches `backlog.md` and nothing else, so it can only name an
anchor still in the backlog; anything else — a genuinely new friction, or
one whose anchor was already drained — gets an ordinary friction row.
Recognising that a *drained* friction has come back is summary's job, and
it is the sharpest signal kaizen produces.

**Vision rows.** Material that is worth keeping about where a *product*
is heading — rather than about how the work went — lands in the backlog
as a row of its own:

```
- <date> · <source>@<context> — vision(<product>): <material>
```

Nothing has to invoke capture to write one: append it through the same
writer from wherever the material surfaced. A planning skill's
product-alignment beat is the natural producer — a pattern to follow if
you have such a step, never a dependency, since the battery below asks
about the work rather than the product.

The `vision(<product>):` tag directly after the em-dash is the whole
discriminator: a row is a friction or a vision row, never both, and
`<product>` is the product the material is about, not the repo the
session ran in. Three rules follow, and they are the only places vision
rows differ from friction rows:

- **Several per capture are allowed** — the one exemption from capture's
  one-friction rule, which is otherwise untouched.
- **Summary clusters them per product**, never by root cause and never
  mixed into a friction cluster, and drains a product's cluster into a
  topic of its own.
- **They never ride the friction-batch and never count toward its
  threshold.** The batch's edit surface is your own process prose and
  config; a product's direction is not that surface.

A vision row for a product with no Roadmap project is not a mistake: it
waits, and drains once that product has a project to write into.

## The capture

Purely reflective: the battery works on what the session itself knows —
no transcript files, no cost data, no tooling.

1. **Guard — one capture per tail.** Each closing tail captures once,
   with hindsight scoped to the work it closes. If this tail already
   captured — its kaizen block fired, or a standalone capture ran for the
   same work — decline and say so; never double-record.
2. **Run the six-probe battery**, self-asked with hindsight over the work
   just closed:
   1. **Rework** — what was done twice or undone, and what upstream input
      would have prevented it?
   2. **Waiting** — where did the session stall on something missing
      (input, decision, unavailable backend)?
   3. **Overprocessing** — where did tokens or time exceed the task's
      need: files read unused, duplicate agent work, output longer than
      its reader needs?
   4. **Handoff loss** — what did this session rediscover that an earlier
      artifact should have carried, by that artifact's own purpose?
      Sanctioned re-verification is design rather than loss; if that
      redundancy itself seems mispriced, record it under overprocessing,
      aimed at the process.
   5. **Instructions** — which instruction was confusing, contradictory,
      or missing — and what wording would have prevented it?
   6. **Communication** — what in the user↔Claude exchange could improve?
      Constructive feedback toward the user is explicitly welcome,
      "X is worth learning properly" included: a learning-gap friction is
      one summary can drain into a learning task.
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

   Read only the matching lines. Same root cause, not same wording → a
   pointer row instead of a re-derived story (grammar above). That grep
   is the whole of capture's search: a tail is the worst moment for a
   wide one, context is already heavily consumed, and everything wider is
   summary's. A recurrence sharing no vocabulary with its anchor is
   therefore missed here by design — summary reads everything and is the
   backstop.
5. **Urgent?** Flag it to the user now, outside the backlog — and the row
   still lands: pattern detection needs the evidence regardless.
6. **Append the row** — the capture's one friction, or the ∅ row —
   through the writer, in one call. Rows go on stdin inside a **quoted**
   heredoc, so backticks, `$`, `!` and apostrophes survive verbatim with
   no escaping:

   ```
   ${CLAUDE_PLUGIN_ROOT}/scripts/backlog-append ${user_config.plans_dir}/backlog.md <<'ROW'
   - <date> · <source>@<context> — <friction>
   ROW
   ```

   The writer refuses a batch whose lines do not all start with `- `,
   leaving the file byte-identical — a rejection is a row to fix, never a
   row to force through.
7. **Commit — kaizen's own, after whatever commit the work itself made:**

   ```
   git -C ${user_config.plans_dir} add backlog.md
   git -C ${user_config.plans_dir} commit -m "kaizen: capture (<source>)" -- backlog.md
   ```

   **Pathspec-scope the commit.** The state folder can be written by
   concurrent sessions, and a bare commit would sweep their staged work
   into yours. Verify scoped: `git -C ${user_config.plans_dir} status` no
   longer lists `backlog.md`; foreign dirty paths may remain — other work
   in flight, leave them.

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
battery, the row grammar and the commit live here and are never copied
into a block — a block that restates them drifts the first time one of
them changes.

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
- The backlog is written only through the writer, and kaizen commits its
  own write — pathspec-scoped — after the work's own commit
- "friction", never "finding"; the backlog is kaizen's store of
  observations, not a queue of committed work
