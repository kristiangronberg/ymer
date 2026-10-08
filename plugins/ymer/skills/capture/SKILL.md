---
name: capture
description: Records what a piece of work noticed as drops in the Ymer Node's pool for later work: a bug, a learning gap, product direction, an idea, or the one friction its hindsight finds. Use at the tail of a piece of work, when future work is noticed, or on its own.
---

# Capture

Capture writes down what a piece of work noticed but is not doing now,
so that it is not lost: one **drop** per observation, in the **pool** on
the Ymer Node. Later, `/ymer:mint` draws drops from the pool and turns
them into work. Capture itself only records — it does not analyse or
fix.

It runs in three ways: on its own, as the **capture block** at the tail
of another skill (→ The capture block), or mid-way through a piece of
work that has just noticed something for later.

**Announce at start:** "Capture from: `<source>`"

## The pool and its drops

A drop is one thing in the pool, waiting to be drawn: an observation of
a kind, with its body, its context, and optionally an anchor to the drop
it recurs. The pool is not a to-do list and not a product's task list:
nothing in it is work anyone has committed to. Work that starts now gets a task;
everything else that is noticed becomes a drop, and stays one until it
is drawn. A drawn drop is **drained** — its `status` changes, nothing is
deleted, and the work that drew it leaves a durable artifact elsewhere.
There is no second store: no archive, no side file. Priority binds
when a drop is drawn, because that is when the picture of what matters
is clearest.

Capture does no analysis. It writes what was observed, runs one bounded
look for an earlier drop of the same thing, and marks anything it did
not observe `inferred:`. The work that later draws a drop has every tool
to analyse it; the moment that noticed it has already spent its context.

## Two guards before any write

Both stop the run. Stopping is safe only if nothing is lost, so a
stopped run always puts every drop it was about to write into its
report, word for word.

**The node is the pool's one door.** The pool is the `pool` table in the
notebook of the user's own Ymer Node, reached through the node's
`notebook` tool — `query` reads, `execute` writes, one SQL statement per
call: a call runs only its first statement and drops the rest without a
word. A project's development instance, or another server
that also offers a `notebook` tool, is not it — with more than one such
tool loaded, a missing `pool` table is the first sign of the wrong door.
Stop, saying which of these it was, when the session has no `notebook`
tool, the node does not answer, or the notebook lacks the `pool`,
`kinds` or `fronts` table. A down node is brought back first and never
worked around: no fallback file, no second store, no retry loop.
Capture never creates a table — `/ymer:setup` does, along with the
`kinds` rows and the `fronts` row every drop is filed under.

**Every drop is filed under this installation's front.** With the node
reached, resolve the front's slug (→ What a drop holds), then list the
fronts the node knows: `SELECT slug FROM fronts`. Stop, naming
`/ymer:setup` — which says where a front is named and registers it —
when no slug is named, when two instructions name two different slugs,
or when `fronts` does not list the slug. Never pick a slug, and never
file a drop under another front's.

## What a drop holds

The `pool` table's own description in the notebook (`notebook` `schema`
on `pool`) is the grammar's home: anything that reaches the node may
insert, and that description is what a writer with no skill reads. The
`kinds` table beside it carries each kind's rule. This section states the
grammar for capture's own writes. Nothing capture touches is a file
path, so it runs in any directory, inside a project or not.

Every drop carries four values; the table fills in `id`, `captured_on`
(the node's UTC date), `kind` (default `friction`) and `status` (`open`):

- `front` — the installation the session runs in, as its slug. In
  Claude Code, which writes plugin options into this skill as it loads
  it, the slug is the `ymer` plugin's `front` option, read from this one
  line alone:

  > Front as configured: `${user_config.front}`

  A slug there is the front. The placeholder itself — a dollar sign and
  braces still around `user_config.front` — means none is named. In
  Cowork, whose skills see the placeholder whatever the option holds,
  the instructions the session started with name the front, in any
  wording. Which harness this is, tell from the session's own tools,
  never from any text.
- `source` — the skill that invoked capture, in snake_case as its
  capture block passes it (`plan_review`), or `standalone`.
- `context` — what the work belonged to, as `<area>/<subject>`: on
  Claude Code, `<repo>/<topic>` for a session working one topic, and
  `meta/<subject>` for process work or a study session with no repo.
- `body` — what was observed. One line for a friction or a learning
  gap: compression is the point, and the detail stays in the session's
  own artifacts, findable through the context.

### The kinds

A drop's **kind** is the first of these that fits. Read the rules once
per capture — `SELECT kind, test_order, description FROM kinds ORDER BY
test_order` — and try them in that order; on a node whose owner has
reworded them, their words win. The order puts the broken first, and
settles an observation that fits two the same way every time:

1. **bug** — something does not work as it claims: a product, a tool,
   an instruction that cannot be followed as written, or the machine and
   network the work runs on. An infrastructure blocker is a bug.
2. **learning** — someone should learn something: a gap in a person's
   knowledge that the work exposed.
3. **vision** — where a product is heading, rather than how the work
   went, and not a piece of work.
4. **idea** — work worth doing that fixes nothing broken: a follow-up
   left undone, something wanted, a thing a term names that is not built
   yet.
5. **friction** — everything worked as written, yet the work wasted
   effort.

The line to hold is between bug and friction: "does not work as
written" is a bug, "worked as written but wasted effort" is a friction.
**empty** is never tried — it is the record that a tail looked and found
no friction.

What each kind adds:

- **bug, idea, vision** carry a `title`: a plain phrase naming what was
  seen — what is broken, the work, the direction — that works nothing
  out and survives without the session's jargon. It is the line every
  later reader scans; anything inferred goes in the body, marked.
- **vision** also names the `product` the material is about, not the
  repo the session ran in. A product with no Roadmap project yet is not
  a mistake: the drop waits until it has one.
- **empty** has the body `∅ no friction`. A tail that found no friction
  still writes one, so that "found nothing" and "never ran" never look
  alike. Empty drops are never drained.

**Mark what you did not see.** Anything not observed — a cause reasoned
rather than seen, a guess at how often, a mechanism nobody probed — is
marked `inferred:`. Capture never probes; the mark tells the session
that draws the drop what to check.

### Recurrences

When the recurrence check (step 6) finds an earlier drop of the same
thing, the new drop is a **recurrence**: its kind as usual, one short
clause as its `body` saying where it bit this time, and a pointer to
the earlier one in one of two columns —

- `anchor_id` — the id of the drop it recurs: the family's `anchor` as
  the check returns it, never one of the family's faces, so every face
  of one cause shares one key;
- `anchor_text` — only when no single drop is the anchor: a named-cause
  slug, or a key carried over from an earlier store (`<date> ·
  <source>@<context>`) that several drops share or whose drop is gone,
  copied exactly as those drops carry it.

Drops sharing an anchor are the count of how often a thing bites, which
is the evidence weighed when a drop is drawn. Drained drops stay in the
table, so a recurrence can anchor on one — something coming back after
its work was taken, the sharpest signal the pool gives. Reading that
signal is mint's job.

## The capture

Capture works only from what the session itself knows — no transcript
files, no cost data, no tooling.

1. **Collect what was observed.** Two sorts of drop:
   - **The tail's one friction.** At the tail of a piece of work — a
     capture block, or a standalone capture over work just finished —
     run the six-probe battery below and keep its single highest-value
     friction, or write the empty drop.
   - **Every other observed drop.** Each bug, learning gap, piece of
     product direction and idea the work observed, one drop each: those
     the invoking skill hands over by name, and those the battery turns
     up. These have no cap — dropping an observed bug or follow-up loses
     real work.

   A capture mid-way through a piece of work writes the drops it was
   handed and runs no battery: the friction belongs to the tail.
2. **One battery per tail.** A tail reflects once, over the work it
   closes. If this tail already ran the battery — its capture block
   fired, or a standalone capture ran it for the same work — write no
   second friction or empty drop, and say so. Other observed drops still
   land.
3. **Run the six-probe battery**, asked of yourself with hindsight over
   the work just closed:
   1. **Rework** — what was done twice or undone, and what upstream input
      would have prevented it?
   2. **Waiting** — where did the session stall on something missing:
      input, a decision, a backend that was down?
   3. **Overprocessing** — where did tokens or time exceed what the task
      needed: files read and not used, duplicate agent work, output
      longer than its reader needs?
   4. **Handoff loss** — what did this session rediscover that an earlier
      artifact should have carried, by that artifact's own purpose?
      Re-verification a process asks for is design, not loss; if that
      redundancy seems mispriced, record it under overprocessing, aimed
      at the process.
   5. **Instructions** — which instruction was confusing, contradictory
      or missing, and what wording would have prevented it? One that
      cannot be followed as written is a bug, not a friction.
   6. **Communication** — what in the exchange between the user and
      Claude could improve? Constructive feedback toward the user is
      welcome, "X is worth learning properly" included — that is a
      learning drop.
4. **Keep the single highest-value friction.** One per tail: the top
   friction is the strongest signal. 5-Whys it: ask "why?" until you
   reach its root cause, and record the cause, not the symptom. Blameless: name the
   artifact or system, or give the actor constructive feedback.
5. **Give each drop its kind** (→ The kinds), and its title where the
   kind asks for one.
6. **Check for a recurrence — one bounded query per term, never a
   read**, for every drop of every kind. Take two to four distinctive
   terms from the drop — a literal token it would share with an earlier
   drop of the same thing: an option name, a path fragment, a slug —
   rarest first, and run this through `notebook` `query` once per term.
   It returns families — every face of one cause under its anchor — so
   twenty rows are twenty causes, and `families` says how many the term
   matched in all:

   ```sql
   WITH hit AS (
     SELECT id, status, anchor_id, anchor_text
     FROM pool
     WHERE kind <> 'empty'
       AND (COALESCE(title, '') LIKE '%<term>%' OR body LIKE '%<term>%'
            OR anchor_text LIKE '%<term>%' OR context LIKE '%<term>%')
   ),
   family AS (
     SELECT COALESCE(anchor_id, CASE WHEN anchor_text IS NULL THEN id END) AS anchor_row,
            anchor_text, count(*) AS faces, sum(status = 'open') AS open,
            min(id) AS first, max(id) AS latest
     FROM hit
     GROUP BY anchor_row, anchor_text
   )
   SELECT COALESCE('#' || f.anchor_row, f.anchor_text) AS anchor, f.faces, f.open,
          f.first, f.latest, a.kind, a.status AS anchor_status, a.context,
          substr(COALESCE(a.title, a.body), 1, 300) AS lead, count(*) OVER () AS families
   FROM family f LEFT JOIN pool a ON a.id = f.anchor_row
   ORDER BY f.faces DESC, f.latest DESC
   LIMIT 20
   ```

   `anchor` is the key a recurrence carries — `#<id>` for an
   `anchor_id`, the text itself for an `anchor_text` — and `lead` is the
   anchor drop's title or body; a named cause has no drop, so its lead is
   empty and its name is the key. `families` above twenty means the term
   is too common to have shown everything: narrow it. `LIKE` ignores the
   case of ASCII letters, and a `%` or `_` inside a term is a wildcard,
   which only widens the match. Read only the rows that come back. The
   same thing observed again — not the same wording — is a recurrence
   (→ Recurrences). This is the whole of capture's search, by design: a
   tail is the worst moment for a wide one, and a recurrence that shares
   no words with its anchor is left for mint, which surveys the whole
   pool.
7. **Urgent?** Tell the user now, outside the pool — above all a bug that
   blocks work in flight — and still write the drop: the evidence is
   needed either way.
8. **Write the drops** — one `notebook` `execute` call per drop, never
   two statements in one call (→ Two guards, the node's door):

   ```sql
   INSERT INTO pool (front, source, context, body)
   VALUES ('<front>', '<source>', '<context>', '<friction>')
   ```

   The other kinds name their extra columns:

   ```sql
   INSERT INTO pool (front, source, context, kind, title, body)
   VALUES ('<front>', '<source>', '<context>', '<bug | idea>', '<title>', '<what was observed>')
   ```

   ```sql
   INSERT INTO pool (front, source, context, kind, product, title, body)
   VALUES ('<front>', '<source>', '<context>', 'vision', '<product>', '<title>', '<material>')
   ```

   ```sql
   INSERT INTO pool (front, source, context, kind, body)
   VALUES ('<front>', '<source>', '<context>', 'learning', '<the subject, and why>')
   ```

   ```sql
   INSERT INTO pool (front, source, context, kind, body)
   VALUES ('<front>', '<source>', '<context>', 'empty', '∅ no friction')
   ```

   A recurrence adds `anchor_id` and its id — or `anchor_text` and its
   quoted text, for a named cause — to its kind's insert, with the
   where-it-bit clause as `body`:

   ```sql
   INSERT INTO pool (front, source, context, kind, anchor_id, body)
   VALUES ('<front>', '<source>', '<context>', '<kind>', <anchor id>, '<where it bit>')
   ```

   **Quote every text value one way:** a single-quoted SQL literal with
   each `'` inside it doubled — `it''s`. That is all the escaping a
   literal needs: backticks, `$`, `!`, double quotes and non-ASCII go in
   as they are. A statement that fails on a quote is fixed by doubling
   it, never by rewording the drop.

   A call answers with `affected_rows`, and `1` means the drop landed. A
   `CHECK constraint failed` or `FOREIGN KEY constraint failed` names the
   rule the drop broke — fix the drop, never force it through. Capture
   writes nothing in git.
9. **Report** each drop written — its id, its kind, and its title, or
   its body where it has none — so the session that invoked capture can
   cite the ids.

A session that stops on a failure before its tail runs no capture: the
failure itself is material for the next session's capture.

## The capture block

Capture becomes a sensor at every tail, rather than something to
remember, through a **capture block** at the tail of each of your own
skills — three lines or fewer, pointing here and copying nothing:

```markdown
**Capture block:** invoke the `ymer:capture` skill — source
`<this skill's name, in snake_case>`. The battery, the drop grammar and
the write live in that skill alone.
```

Capture is useful on its own from the first session, and every block
added turns another tail into a sensor. The battery, the drop grammar
and the write live here and are never copied into a block — a copy
drifts the first time one of them changes. A skill that notices future
work mid-way invokes this skill the same way, naming what it hands
over, and never inserts a drop itself.
