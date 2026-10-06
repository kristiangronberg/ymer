---
name: capture
description: Use to record what the work observed as drops in the pool — a bug, a learning gap, product direction, an idea left undone, and the one friction a tail's hindsight finds. Runs at the tail of a piece of work, at any moment that notices future work, and standalone.
---

# Capture

Write down what the work observed, as **drops** in the pool — one
observation each — and nothing more. Run standalone, as a capture block
at the tail of a piece of work (→ The capture block), or at any moment
that notices work nobody is starting now.

**Announce at start:** "Capture from: `<source>`"

A **drop** is one thing in the pool, waiting to be drawn: an
observation of a kind, with its body, its context, and optionally an
anchor to the drop it recurs. The **pool** is where drops wait — not a
to-do list and not your product's task list: nothing in it is work
anyone has committed to. A task exists only where work starts now;
everything else that is noticed becomes a drop, and a drop becomes work
only when it is drawn. Mint draws a drop, and the drop is **drained**.

Capture does no analysis. It writes what was observed, runs one bounded
duplicate look, and marks anything it did not observe `inferred:`. The
work that draws a drop has every tool to analyse it; the moment that
noticed it has spent its context already.

## The pool

One table, `pool`, in the notebook of a Ymer Node, reached through the
node's `notebook` tool — `query` reads, `execute` writes, one SQL
statement per call: a call runs only its first statement and drops the
rest without a word. The node is the one your Ymer Node install serves —
a project's development instance, or another server that also exposes a
`notebook` tool, is not it; with more than one such tool loaded, a
missing `pool` table is first evidence of the wrong door. Nothing
capture touches is a path, so it can fire in any directory, including
outside any project checkout.

Any client may insert, and the table's description in the notebook
(`notebook` `schema` on `pool`) carries the grammar for a client that
has no skill to read; the `kinds` table beside it carries each kind's
rule. That description is the grammar's home, and the same `schema`
call shows the table's shape; the prose below states the grammar for
capture's own writes.

**Guard — the node is the pool's one door.** No `notebook` tool in
this session, a node that does not answer, or a notebook without the
`pool`, `kinds` or `fronts` table stops the run. Say which, and put every drop you
were about to record in the report, verbatim, so the observation
outlives the stop. Restoring the node comes first: a down node is
brought back, never worked around — no fallback file, no second store,
no retry loop — and capture never creates a table. `/ymer:setup` does,
along with the `kinds` rows and the `fronts` row every drop keys on.

**Guard — the front every drop is filed under.** With the node reached
and before any drop is written, resolve this front's slug (→ The drop)
and read the fronts the node lists, `SELECT slug FROM fronts`. No slug
named, two instructions naming two different slugs, or a slug `fronts`
does not list stops the run, naming `/ymer:setup` — which says where
this installation's front is named and registers it — and puts every drop you were about to record in
the report, verbatim, as the node guard does: a tail's context is spent,
and an observation neither written nor printed is lost. Never pick a
slug, and never write a drop under another front's.

There is no second store — no archive, no clusters file, no staging — and
nothing moves between containers at rest: a drop leaves the open pool
only by being drained, which changes its `status` and deletes nothing,
and every drain deposits a durable artifact elsewhere. Priority binds
when a drop is drawn — the moment just before work starts is when the
picture of what matters is most accurate.

### The kinds

A drop's **kind** is the category it is captured under — bug,
learning, vision, idea, friction, or empty — chosen by first fit in
that order. Read the `kinds` table once per capture for the rules
(`SELECT kind, test_order, description FROM kinds ORDER BY test_order`),
then try them in `test_order`: the first whose description fits the
observation is its kind. The order resolves an observation that fits
two the same way every time, and it puts the broken first:

1. **bug** — something does not work as it claims, a product, a tool,
   an instruction that cannot be followed as written, or the machine and
   network the work runs on. An infrastructure blocker is a bug.
2. **learning** — someone should learn something: a gap in a person's
   knowledge the work exposed.
3. **vision** — where a product is heading, rather than how the work
   went or a piece of work.
4. **idea** — work worth doing that fixes nothing broken: a follow-up
   left undone, something wanted, a thing a term names that is not built
   yet.
5. **friction** — everything worked as written, yet the work wasted
   effort.

**empty** is not tried: it records that a tail's hindsight found no
friction. The line between bug and friction is the one to hold — "does
not work as written" is a bug, "worked as written but wasted effort" is a
friction — and the rows in `kinds` are the words to judge by: on a node
whose owner reworded them, theirs win.

### The drop

A drop is four values plus what its kind asks for; the table fills in
the rest — `id`, `captured_on` with the node's UTC date, `kind` with
`friction`, `status` with `open`:

- `front` — the installation the session runs in, as its slug. Where
  the harness writes plugin options into this skill — Claude Code — it
  is the `ymer` plugin's `front` option, written here as the harness
  loads this skill and read from this one line alone:

  > Front as configured: `${user_config.front}`

  A slug there is the front; the placeholder itself — a dollar sign and
  braces still around `user_config.front` — means none is named. Where
  the harness does not — Cowork, whose skills read the placeholder
  whatever the option holds — the instructions the session started with
  name it, in any wording. Which harness this is, is told from the
  session's own tools, never from any text. The slug is a key into the notebook's `fronts`
  table, so an unknown front is refused rather than filed as someone
  else's.
- `source` — the skill that invoked capture, its name in snake_case as
  its capture block passes it (`plan_review`), or `standalone` when
  nothing invoked it.
- `context` — what the work belonged to, as `<area>/<subject>`: on
  Claude Code, `<repo>/<topic>` for a session working one topic, and
  `meta/<subject>` for process work or a study session with no repo.
- `body` — what was observed, one line for a friction or a learning
  gap: compression is the point, and detail stays in the session's own
  artifacts, findable via the context.

And by kind:

- **`title`** — bug, idea and vision drops carry one: a plain phrase
  naming what was observed — what is broken, the work, the direction —
  that works nothing out and survives without the session's jargon. It
  is the line every later reader scans, so it states what was seen;
  anything inferred rides the body with its mark. Friction and learning
  drops are one line and serve as their own lead.
- **`product`** — a vision drop names the product the material is
  about, not the repo the session ran in. A vision drop for a product
  with no Roadmap project is not a mistake: it waits, and is drawn once
  that product has a project to write into.
- **`∅ no friction`** — the body of an empty drop. A tail whose
  hindsight found no friction still records one, so that "this session
  found nothing" and "capture never ran" never look alike. Empty drops
  are never drained.

**The claims rule.** Write what was observed; mark anything not
observed `inferred:` — a cause reasoned rather than seen, a guess at
how often, a mechanism nobody probed. There is no probing here: the
mark is what tells the drawing session what to check.

**Recurrences.** A drop of any kind whose anchor the recurrence check
finds is a **recurrence**: it records a pointer, never a re-derived
story — its kind as usual, the anchor in one of two columns, and as
`body` one short clause saying where it bit this time.

- `anchor_id` — the id of the drop it recurs: the family's `anchor` as
  the recurrence check returns it, never one of that family's faces, so
  every face of one cause shares one key.
- `anchor_text` — only when no single drop is the anchor: a named-cause
  slug, or a key carried over from an earlier store (`<date> ·
  <source>@<context>`) that several drops share or whose drop is gone.
  Copy the text exactly as the matching drops carry it.

Recurrences preserve the count signal — drops sharing an anchor are the
frequency evidence weighed when a drop is drawn. Drained drops stay in
the table, so the check finds them too, and a recurrence anchored on a
drained drop — something coming back after its work was taken — is the
sharpest signal the pool gives. Reading that signal is mint's job.

## The capture

Purely reflective: capture works on what the session itself knows — no
transcript files, no cost data, no tooling.

1. **Collect what was observed.** A capture writes two sorts of drop:
   - **The tail's one friction.** At the tail of a piece of work — a
     capture block, or a standalone capture over work just finished —
     run the six-probe battery below and keep its single
     highest-value friction, or record the empty drop.
   - **Every other observed drop.** Each bug, learning gap, piece of
     product direction and idea the work observed is written as observed,
     one drop each: the ones the invoking skill hands over by name, and
     the ones the battery surfaces on the way. Dropping an observed bug
     or follow-up loses real work, so these have no cap.

   A capture at a moment mid-phase — a skill handing over the future
   work it noticed — writes the drops it was handed and runs no battery:
   the tail's friction belongs to the tail.
2. **Guard — one battery per tail.** Each closing tail reflects once,
   with hindsight scoped to the work it closes. If this tail already
   ran the battery — its capture block fired, or a standalone capture
   ran it for the same work — write no second friction or empty drop,
   and say so; the other observed drops still land, since a mid-phase
   capture never uses up the tail's friction.
3. **Run the six-probe battery**, self-asked with hindsight over the work
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
      or missing — and what wording would have prevented it? One that
      cannot be followed as written is a bug, not a friction.
   6. **Communication** — what in the user↔Claude exchange could improve?
      Constructive feedback toward the user is explicitly welcome,
      "X is worth learning properly" included: that is a learning drop.
4. **Keep the single highest-value friction.** One per tail: the top
   friction is the strongest signal. 5-Whys it to its root cause — the
   drop records the cause, not the symptom. Blameless: name the artifact
   or system, or give constructive feedback to the actor.
5. **Kind each drop** by first fit (→ The kinds), and write its title
   where its kind asks for one.
6. **Recurrence check — a bounded query, never a read**, for every drop
   of every kind. Take 2–4 distinctive terms from the drop — a literal
   token it would share with its anchor: an option name, a path
   fragment, a slug — lead with the rarest, and search the pool by name,
   one query per term, through `notebook` `query`. The hits come back
   grouped into families — every face of one cause under its anchor —
   so the twenty rows are twenty causes, never twenty faces of one, and
   `families` says how many the term matched in all:

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
   anchor drop's own title or body, the thing its faces point at; a named
   cause has no drop, so its lead is empty and its name is the key.
   `families` above twenty means the term is too common to have shown
   everything: narrow it before reading on. `LIKE` ignores the case of
   ASCII letters, and a `%` or `_` inside a term is a wildcard, which
   only widens the match. Read only the rows that come back. The same
   thing observed again, not the same wording → a recurrence instead of
   a re-derived story (→ The drop). That query is the whole of capture's
   search: a tail is the worst moment for a wide one, context is already
   heavily consumed, and everything wider is mint's. A recurrence
   sharing no vocabulary with its anchor is therefore missed here by
   design — mint surveys the whole pool and is the backstop.
7. **Urgent?** Flag it to the user now, outside the pool — a bug that
   blocks work in flight above all — and the drop still lands: the
   evidence is needed regardless.
8. **Record the drops** — one `notebook` `execute` call each:

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
   each `'` inside it doubled — `it''s`. That is the only escaping a
   literal needs: backticks, `$`, `!`, double quotes and non-ASCII go in
   as they are. A statement that fails on a quote is fixed by doubling
   it, never by rewording the drop.

   Each call answers with `affected_rows`, and `1` is the drop landed. A
   `CHECK constraint failed` or `FOREIGN KEY constraint failed` names
   the rule the drop broke — a drop to fix, never one to force through.
   Capture writes nothing in git.
9. **Report** each drop it wrote — its id, its kind, and its title, or
   its body where it has none — so the session that invoked capture can
   cite the ids.

A stopped boundary skips capture: when a session stops on a failure
before reaching its tail, no capture fires — the failure itself is prime
material for the next session's capture.

## The capture block

Capture becomes a sensor at every tail, rather than something to
remember, by putting a **capture block** at the tail of each of your
own skills — three lines or fewer, pointing here and copying nothing:

```markdown
**Capture block:** invoke the `ymer:capture` skill — source
`<this skill's name, in snake_case>`. The battery, the drop grammar and
the write live in that skill alone.
```

That is the growth path: capture is useful standalone from the first
session, and every block you add turns another tail into a sensor. The
battery, the drop grammar and the write live here and are never copied
into a block — a block that restates them drifts the first time one of
them changes. A skill that notices future work mid-phase invokes this
skill the same way, naming what it hands over, and never inserts a drop
itself.
