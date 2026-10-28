# Mint: cases

The cases of the mint skill: the precision earned from runs that went
wrong once, and the exact messages its halts print. The headings are
`SKILL.md`'s own; read a section's entries at the moment that section
runs.

## Contents

- The run
- Scoring
- The pick rule
- Three exits, all artifact-depositing
- `request.md`'s shape
- The close

## The run

**A cluster can span fronts.** Capture's recurrence check searches the
whole pool, so a drop on this front may be anchored on another front's
drop, and the candidate read in step 1 shows each drop's `front`. The
pick takes this front's portion only: step 4 draws the drops whose
`front` is `<front>`, and the other front's drops stay open for that
front's own mint. Where the cause is shared, say so in a line of the
artifact the pick writes.

**An open pointer on a drained anchor** reads as the sharpest signal at
the next run only when it was created after its anchor was drained
(term: the plugin glossary). A draw sees the family and takes from it
the kinds its list names (*draw drops*, binding: the operations
contract), so after one, an open pointer on a drained anchor is one of
three things: captured after the draw, the signal itself; another
front's drop, left open for that front's own mint; or a face no draw
took, created before its anchor was drained, which the signal leaves
out. A face a friction-batch's exact draw did not name is one, and so
is a face whose kind the draw's kind list left out.

**The family read finds more than the artifact quotes** whenever a
named drop's family reaches past what the candidate read showed: a
folded-in neighbour that is a face brings its anchor and that anchor's
other faces, which step 1 never read. Those are the drops step 4's
append adds to the artifact: `request.md`, or the learning task's
description.

## Scoring

**A product area with no `## Next steps` heading** in its `vision` adds
no block: it names no next step for a drop to match. The close names
it, so a product area that lost its heading is seen.

**A list call that fails or comes back cut short** is a block that could
not be read. Score nothing this run and go to the read-back, so the run
ranks the rows already written and names what it left unscored. No id
gets the in-session try that run either.

**A stray, and why it is never undone.** A row on an id no list held
comes from a scorer that wrote beyond its list, or from another front's
mint scoring that front's drops at the same time, and the rows alone
cannot tell which. So the read-back names it, capture records it, and
the run goes on. Restoring the backup would discard everything every
session wrote since it was taken, and deleting the row would undo
another front's legitimate score. A scorer that keeps writing strays
shows as a recurrence in the pool. A row on a drop captured during the
run, which only the count shows, is named and left for the same reasons.

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
- **A sharpest-signal drop whose topic has shipped** (term: the plugin
  glossary), ranked below the top, may be drawn over it.

## Three exits, all artifact-depositing

**The halt for a repo no product area names:**

> Mint draws a topic into the product area whose description names the
> topic's repo on its `Repos:` line, and no area in the ymer this
> session reaches names `<repo>`. Add `<repo>` to that product's
> `Repos:` line, or create an area for the product carrying the line,
> then run `/ymer:mint` again. The drops are still open in the pool;
> nothing was lost.

**The halt for no Meta area**, which is a floor rather than one of your
products:

> Mint draws work about your own process into an area named `Meta`,
> and the ymer this session reaches has none. Run `/ymer:setup`, which
> creates it, or create it in ymer yourself — then run `/ymer:mint`
> again. The drops are still open in the pool; nothing was lost.

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
lines directly under its intro paragraph (`Frictions to fix …`), before
`## Below the bar for their own topic`. An append adds one line
per newly passed-over drop beneath the Passed over lines already there,
and leaves them and the rest of the file as they are. On a later append
to a friction-batch, add drops under the right heading and leave
`started:` at the opening date.

**An append MUST go through the file**: read `request.md` from the state
folder, insert the drops into it with this session's own file tools,
and only then, where git keeps the folder, commit it at step 5 as it now
stands. The file is the artifact, and a commit records only what was
written to it.

**An append never writes blind.** **Count every heading the write
places itself by before inserting**: the heading it inserts under where
another heading follows it, and the heading it inserts before. In a
friction-batch that is `## Below the bar for their own topic`, a
`###` group under the Moot heading that another group follows, and
`### Judged not worth doing` where a new cause group goes in before it.
The file carries verbatim prose from real sessions: a drop quoting the
next heading's text would take the new drops into the middle of that
drop while the write still reported success. `1` is the only count that may be written
on. `0` means the heading is not in the file; `2` or more means the
literal sits somewhere besides its own heading. Both stop the write and
send you to read the file. Under the last heading, or at the end of a
normal pick's file, which has none, there is nothing to insert before;
but a heading the append names must be there, or the drops land under
whichever heading happens to be last. Moot drops of a cause the file
does not name yet open a new `###` group under `## Moot, or judged not
worth doing`: before `### Judged not worth doing` where the file has
that group, at the end of the file otherwise. A friction judged not
worth doing joins that one group, which opens at the end of the file
where it is absent.

## The close

**`Scored:`** says how many drops this run scored and by whom: scorers,
or this session where no scorer started, followed by the cause the
harness gave, quoted as it wrote it. It reads `0 new drops` where there
were none, `next steps unreadable` where the next-steps block could not
be read and nothing was scored for that reason, and `definition
unreadable` where no scorer started and this session could not read the
agent definition either, quoting both causes;
`areas without next steps: <names>` follows wherever a product area's
`vision` had no `## Next steps` heading.

**`Strays:`** is written only where the read-back found a stray, a
deletion or an excess row: how many rows sat on ids no list held, the
first ten of those ids, how many rows were deleted, and how many sat on
drops captured during the run.

**`Unscored:`** is written only where drops stayed unscored: how many,
and the first ten ids, so the reader knows this run's pick came from a
ranking that leaves them out.

**`Hard to score:`** carries one entry per reason the scorers gave,
`<ids> — <why>`, the entries joined by `; ` and never capped, so the
reader sees every note. A scorer's answer is cut into entries by its
reasons, and scorers giving one reason share its entry. An entry whose
defect was handed to capture as new ends `(new defect → capture)`, and
capture's own report, printed next, gives the new drop's id.

**`Check:`** is this session's answer in one of three forms: `yes`;
`no — #<id>: <component> was <n>, should be <m>`, for a drop the
ranking got wrong; or `no — passed over #<id>: <reason>`, for a top
drop passed over, a pick the user named included. Several `no` entries
are joined by `; `.
