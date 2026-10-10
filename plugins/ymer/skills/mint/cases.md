# Mint: cases

The cases of the mint skill: the precision earned from runs that went
wrong once, and the exact messages its halts print. The headings are
`SKILL.md`'s own; read a section's entries at the moment that section
runs.

Contents:

- The run: a cluster that spans fronts, an open pointer on a drained
  anchor
- Scoring: a page with no next steps, a block that could not be read, a
  scorer that wrote beyond its rows, the ids left unscored, an empty
  ranking
- The pick rule: what the score cannot see
- Three exits, all artifact-depositing: the two halts, the learning
  append in the node
- `request.md`'s shape: where Passed over lines go, an append through
  the file, the heading count
- The close: the `Scored:` and `Unscored:` lines

## The run

**A cluster can span fronts.** Capture's recurrence check searches the
whole pool, so a drop on this front may be anchored on another front's
drop, and the candidate read in step 1 shows each drop's `front`. The
pick takes this front's portion only: step 4 drains the drops whose
`front` is `<front>`, and the other front's drops stay open for that
front's own mint. Where the cause is shared, say so in a line of the
artifact the pick writes.

**An open pointer on a drained anchor** reads as the sharpest signal at
the next run. So after a drain, an open pointer on a drained anchor
means one of two things: it was captured after the drain, or it is
another front's drop, left open for that front's own mint.

## Scoring

**A page with no `## Next steps` heading** adds no block: it names no
next step for a drop to match. The close names it, so a product page
that lost its heading is seen.

**A list call that fails or comes back cut short** is a block that could
not be read. Score nothing this run and go to the read-back, so the run
ranks the rows already written and names what it left unscored. No id
gets the in-session try that run either.

**A table that appeared or vanished** between the two table listings
means a scorer wrote beyond its rows. Stop the run before ranking, name
the difference, and hand it to capture; the backup step 1 took is the
way back.

**An id the second unscored query still lists** was not written: a
refused statement, a malformed row, a scorer that stopped. It gets one
more try, scored in-session (→ `SKILL.md` § Scoring, the fallback),
unless the next-steps block could not be read. An id still listed after
that stays unscored until a later run.

**The draw is made among the scored drops alone.** Where ids stay
unscored, say so before drawing (the ranking leaves them out) and keep
the ids for the close. Where the ranking holds no drop at all while open
drops wait unscored, stop: draw nothing, and say how many wait and why
scoring did not reach them. A judgement pick over unscored drops is
never the way around an empty ranking.

## The pick rule

**What the score cannot see**, weighed before passing the top drop
over:

- **What each occurrence costs.** A silent failure costs more than a
  felt one: it looks exactly like a clean pass, and its cost lands later
  on a session with no way to know.
- **How often it bites.** The frequency shown beside the score is
  evidence, not a ranking key: one drop describing an expensive silent
  failure outranks six drops of mild friction.
- **Whether the cause is understood well enough to act.** Drops naming
  a symptom whose cause is still fuzzy make a better topic once they
  have gathered more faces: a reason to pick something else this run,
  never a reason to never pick it.
- **The sharpest signal.** An open recurrence whose anchor was drained
  and whose topic has shipped, ranked below the top, may be drawn over
  it.

## Three exits, all artifact-depositing

**The halt for a product with no Roadmap:**

> Mint draws into a project named `<Product> Roadmap` — one per
> product, its tasks the work in flight. Ymer is this session's
> coordinator, and a product's Roadmap is a project there. Create one for
> the product this work belongs to, then run `/ymer:mint` again. The
> drops are still open in the pool; nothing was lost.

**The halt for no `Meta Roadmap`**, which is a floor rather than one of
your products:

> Mint draws work about your own process into a project named
> `Meta Roadmap`, and the ymer this session reaches has none. Run
> `/ymer:setup`, which creates it, or create it in ymer yourself — then
> run `/ymer:mint` again. The drops are still open in the pool; nothing
> was lost.

Both halts are deliberate, and both belong to ymer alone: the
coordinator this session reaches is the one it deposits into, and
quietly writing a product's pick to the node instead would fork that
product's work across two stores.

**The learning append in the node** is this table's own write:

```sql
UPDATE tasks
SET description = rtrim(COALESCE(description, ''), char(10))
                  || char(10) || '<the new drops>',
    updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE id = <id>
```

`affected_rows` must equal `1`. The `COALESCE` is what keeps it an
append: `description` is nullable, and concatenating onto a NULL yields
NULL, the drops already on that task gone with nothing to say they were
there.

## `request.md`'s shape

**Where Passed over lines go.** A friction-batch carries its Passed over
lines directly under its intro paragraph (`Frictions drawn by …`),
before `## Below the bar for their own topic`. An append adds one line
per newly passed-over drop beneath the Passed over lines already there,
and leaves them and the rest of the file as they are. On a later append
to a friction-batch, add drops under the right heading and leave
`started:` at the opening date.

**An append MUST go through the file**: read `request.md` from the state
folder, insert the drops into it with this session's own file tools,
and only then, where git keeps the folder, commit it at step 5 as it now
stands. The file is the artifact, and a commit records only what was
written to it.

**An append never writes blind.** Under a heading that has another
heading after it, the first of the friction-batch's two, **count the
heading in the file before inserting under it.** The file carries
verbatim prose from real sessions: a drop quoting the next heading's
text would take the new drops into the middle of that drop while the
write still reported success. `1` is the only count that may be written
on. `0` means the heading is not in the file; `2` or more means the
literal sits somewhere besides its own heading. Both stop the write and
send you to read the file. Under the last heading, or at the end of a
normal pick's file, which has none, there is nothing to insert before;
but a heading the append names must be there, or the drops land under
whichever heading happens to be last.

## The close

**`Scored:`** says how many drops this run scored and by whom: scorers,
or this session where scoring fell back. It reads `0 new drops` where
there were none, and `next steps unreadable` where the next-steps block
could not be read and nothing was scored for that reason;
`pages without next steps: <names>` follows wherever a page had no
`## Next steps` heading.

**`Unscored:`** is written only where drops stayed unscored: how many,
and the first ten ids, so the reader knows this run's pick came from a
ranking that leaves them out. A run that stopped on an empty ranking
closes with these two lines and the reason, and picks nothing.
