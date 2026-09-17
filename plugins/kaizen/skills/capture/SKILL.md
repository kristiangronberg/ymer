---
name: capture
description: Use at the tail of a piece of work to reflect with hindsight and record one friction in your backlog.
---

# Kaizen — Capture

Reflect on the work just finished, and record **one** friction in the
backlog. Run standalone, or as a kaizen block (→ The kaizen block).

**Announce at start:** "Kaizen capture from: `<source>`"

A **friction** is one hindsight observation of process waste. The
**backlog** is where frictions queue — kaizen's own store, not your
product's task backlog and not a to-do list. Nothing in it is work
anyone has committed to; it is evidence waiting to be weighed.

## The backlog

One table, `frictions`, in the notebook of a Ymer Node, reached through
the node's `notebook` tool — `query` reads, `execute` writes, one SQL
statement per call. The node is the one your Ymer Node install serves —
a project's development instance, or another server that also exposes a
`notebook` tool, is not it; with more than one such tool loaded, a
missing `frictions` table is first evidence of the wrong door. Nothing
capture touches is a path, so it can fire in any directory, including
outside any project checkout.

The table is kaizen's store without being kaizen's alone: kaizen is its
main producer today, any client may insert, and the table's description
in the notebook (`notebook` `schema` on `frictions`) carries the grammar
for a client that has no skill to read. That description is the
grammar's home, and the same `schema` call shows the table's shape; the
prose below states the grammar for capture's own writes.

**Guard — the node is the backlog's one door.** No `notebook` tool in
this session, a node that does not answer, or a notebook without the
`frictions` table stops the run. Say which, and put the row you were
about to record in the report, verbatim, so the friction outlives the
stop. Restoring the node comes first: a down node is brought back, never
worked around — no fallback file, no second store, no retry loop —
and capture never creates the table.

There is no second store — no archive, no clusters file, no staging — and
nothing moves between containers at rest: a row leaves the backlog only
by being drained, which changes its `status` and deletes nothing, and
every drain deposits a durable artifact elsewhere. Priority binds at
drain time — the moment just before work is taken is when the picture of
where the pain is is most accurate. The count of open rows is the debt
gauge.

### The row

A friction row is four values; the table fills in the rest — `id`,
`captured_on` with the node's UTC date, `kind` with `friction`, `status`
with `open`:

- `front` — the surface the session runs on, as the slug its initial
  instructions name (`claude_code` for Claude Code). It is a key into the
  notebook's `fronts` table, so a missing or unknown front is refused
  rather than filed as someone else's.
- `source` — the skill that invoked capture, its name in snake_case as
  its kaizen block passes it (`plan_review`), or `standalone` when
  nothing invoked it.
- `context` — what the work belonged to, as `<area>/<subject>`: on
  Claude Code, `<repo>/<topic>` for a session working one topic, and
  `meta/<subject>` for process work or a study session with no repo.
- `body` — the friction, one line — evidence-line discipline:
  compression is the point, and detail stays in the session's own
  artifacts, findable via the context.

A capture that surfaces no friction still records one row, `kind`
`empty` with the body `∅ no friction` — otherwise "this session found
nothing" and "capture never ran" look identical. Empty rows belong to no
cluster, take no exit, and are never drained.

**Recurrence rows.** A friction whose anchor the recurrence check finds
records a pointer row, never a re-derived story: `kind` `recurrence`, the
anchor in one of two columns, and as `body` one short clause saying where
it bit this time. Capture always writes the clause; a client that has
none may leave the body empty.

- `anchor_id` — the id of the row it recurs: the family's `anchor` as
  the recurrence check returns it, never one of that family's faces, so
  every face of one root cause shares one key.
- `anchor_text` — only when no single row is the anchor: a named-cause
  slug, or a key carried over from the store before this table
  (`<date> · <source>@<context>`) that several rows share or whose row is
  gone. Copy the text exactly as the matching rows carry it.

Pointer rows preserve the count signal — rows sharing an anchor are the
frequency evidence summary weighs at pick time. Drained rows stay in the
table, so the check finds them too, and a recurrence anchored on a
drained row — a friction coming back after its work was taken — is the
sharpest signal kaizen produces. Reading that signal is summary's job.

**Vision rows.** Material that is worth keeping about where a *product*
is heading — rather than about how the work went — lands in the backlog
as a row of its own: `kind` `vision`, `product` naming the product, the
material as `body`.

Nothing has to invoke capture to write one: insert it the same way from
wherever the material surfaced. A planning skill's product-alignment beat
is the natural producer — a pattern to follow if you have such a step,
never a dependency, since the battery below asks about the work rather
than the product.

`kind` is the whole discriminator: a row is a friction or a vision row,
never both, and `product` is the product the material is about, not the
repo the session ran in. Three rules follow, and they are the only places
vision rows differ from friction rows:

- **Several per capture are allowed** — the one exemption from capture's
  one-friction rule, which is otherwise untouched.
- **Summary clusters them per product**, never by root cause and never
  mixed into a friction cluster, and drains a product's cluster into a
  topic of its own.
- **They never ride the friction-batch and never count toward its
  threshold.** The friction-batch's edit surface is your own process
  prose and config; a product's direction is not that surface.

A vision row for a product with no Roadmap project is not a mistake: it
waits, and drains once that product has a project to write into.

### A row as a line

Wherever a row is quoted as text — a `request.md`, a report — it takes
one line, ending in its id:

```
- <captured_on> · <source>@<context> — <text> (#<id>)
```

`<text>` is the body of a friction or empty row. A vision row's is
`vision(<product>): <body>`. A recurrence row's is
`recurrence of #<anchor_id>` or `recurrence of <anchor_text>`, followed
by ` — <body>` when the body is not empty. One query renders it:

```sql
SELECT '- ' || captured_on || ' · ' || source || '@' || context || ' — ' ||
       CASE kind
         WHEN 'vision' THEN 'vision(' || product || '): ' || body
         WHEN 'recurrence' THEN 'recurrence of ' ||
           COALESCE('#' || anchor_id, anchor_text) ||
           CASE WHEN body = '' THEN '' ELSE ' — ' || body END
         ELSE body
       END || ' (#' || id || ')' AS line
FROM frictions
WHERE id IN (<ids>)
ORDER BY id
```

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
3. **Keep the single highest-value friction.** One per capture: the top
   friction is the strongest signal. 5-Whys it to its root cause — the
   row records the cause, not the symptom. Blameless: name the artifact
   or system, or give constructive feedback to the actor.
4. **Recurrence check — a bounded query, never a read.** After
   root-causing, take 2–4 distinctive terms from the friction — a literal
   token it would share with its anchor: an option name, a path fragment,
   a slug — lead with the rarest, and search the backlog by name, one
   query per term, through `notebook` `query`. The hits come back
   grouped into families — every face of one root cause under its
   anchor — so the twenty rows are twenty causes, never twenty faces of
   one, and `families` says how many the term matched in all:

   ```sql
   WITH hit AS (
     SELECT id, status, anchor_id, anchor_text
     FROM frictions
     WHERE kind <> 'empty'
       AND (body LIKE '%<term>%' OR anchor_text LIKE '%<term>%' OR context LIKE '%<term>%')
   ),
   family AS (
     SELECT COALESCE(anchor_id, CASE WHEN anchor_text IS NULL THEN id END) AS anchor_row,
            anchor_text, count(*) AS faces, sum(status = 'open') AS open,
            min(id) AS first, max(id) AS latest
     FROM hit
     GROUP BY anchor_row, anchor_text
   )
   SELECT COALESCE('#' || f.anchor_row, f.anchor_text) AS anchor, f.faces, f.open,
          f.first, f.latest, a.status AS anchor_status, a.context,
          substr(a.body, 1, 300) AS lead, count(*) OVER () AS families
   FROM family f LEFT JOIN frictions a ON a.id = f.anchor_row
   ORDER BY f.faces DESC, f.latest DESC
   LIMIT 20
   ```

   `anchor` is the key a recurrence row carries — `#<id>` for an
   `anchor_id`, the text itself for an `anchor_text` — and `lead` is the
   anchor row's own body, the cause its faces point at; a named cause has
   no row, so its lead is empty and its name is the key. `families` above
   twenty means the term is too common to have shown everything: narrow
   it before reading on. `LIKE` ignores the case of ASCII letters, and a
   `%` or `_` inside a term is a wildcard, which only widens the match.
   Read only the rows that come back. Same root cause, not same wording →
   a recurrence row instead of a re-derived story (→ The row). That query
   is the whole of
   capture's search: a tail is the worst moment for a wide one, context is
   already heavily consumed, and everything wider is summary's. A
   recurrence sharing no vocabulary with its anchor is therefore missed
   here by design — summary surveys the whole backlog and is the backstop.
5. **Urgent?** Flag it to the user now, outside the backlog — and the row
   still lands: pattern detection needs the evidence regardless.
6. **Record the row** — the capture's one friction, or the empty row —
   with one `notebook` `execute` call:

   ```sql
   INSERT INTO frictions (front, source, context, body)
   VALUES ('<front>', '<source>', '<context>', '<friction>')
   ```

   The other kinds name their extra columns:

   ```sql
   INSERT INTO frictions (front, source, context, kind, body)
   VALUES ('<front>', '<source>', '<context>', 'empty', '∅ no friction')
   ```

   ```sql
   INSERT INTO frictions (front, source, context, kind, anchor_id, body)
   VALUES ('<front>', '<source>', '<context>', 'recurrence', <anchor id>, '<where it bit>')
   ```

   ```sql
   INSERT INTO frictions (front, source, context, kind, product, body)
   VALUES ('<front>', '<source>', '<context>', 'vision', '<product>', '<material>')
   ```

   A recurrence on a named cause carries `anchor_text` and its quoted text
   in place of `anchor_id`.

   **Quote every text value one way:** a single-quoted SQL literal with
   each `'` inside it doubled — `it''s`. That is the only escaping a
   literal needs: backticks, `$`, `!`, double quotes and non-ASCII go in
   as they are. A statement that fails on a quote is fixed by doubling
   it, never by rewording the friction.

   The call answers with `affected_rows`, and `1` is the row landed. A
   `CHECK constraint failed` names the rule the row broke — a row to fix,
   never a row to force through. Capture writes nothing in git.

A stopped boundary skips capture: when a session stops on a failure
before reaching its tail, no capture fires — the failure itself is prime
material for the next session's capture.

## The kaizen block

Capture becomes a sensor at every tail, rather than something to
remember, by putting a **kaizen block** at the tail of each of your own
skills — three lines or fewer, pointing here and copying nothing:

```markdown
**Kaizen block:** invoke the `kaizen:capture` skill — source
`<this skill's name, in snake_case>`. Battery, row grammar, and the write
live in that skill alone.
```

That is the growth path: capture is useful standalone from the first
session, and every block you add turns another tail into a sensor. The
battery, the row grammar and the write live here and are never copied
into a block — a block that restates them drifts the first time one of
them changes.
