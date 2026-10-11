# Tutor: mechanics

The mechanics of the tutor skill: the engagement doc's naming and
skeleton, the write doors the knowledge and engagement docs take in
ymer, and the subject index's SQL over the node's notebook. The
headings are `SKILL.md`'s own; read a section's entries at the moment
that section runs.

Contents:

- The Engagement Doc: its naming, its write doors, the skeleton
- Knowledge Docs: the slug, editing a body, an append, the subject
  index's SQL, the boilerplate line as stored

## The Engagement Doc

**Naming.** Title `Learning <Subject> — engagement <YYYY-MM-DD>` (the
opening's date), slug `<subject>-engagement-<YYYY-MM-DD>`. The
`tutor_engagements` row's doc handle is `<slug>-<uuid>`, the same form
as a `tutor_subjects` row's.

**Write doors.** The write doors of § Knowledge Docs (below) bind this
doc too, the opening's create included. The sitting-log append is that
section's append door, on the previous entry's node, with the text in
the section body. A close's section writes on this doc go in one
`docs update_section` item: its edits, resolved from a single
`docs get_structure` read, land in one save or none do.

**The skeleton**, whole:

```markdown
# Learning Kolb — engagement 2026-07-25

> subject: kolb · knowledge doc: kolb-<uuid> · task: <learning-task
> UUID, when one is delivered> · oracle: <sources> ·
> scope: <the negotiated subset>

## Goal contract

Ticked by demonstration only — rolling checks at station closes; the
capstone integrates. Amendments: dated note here, arc refit.

- [ ] G1 <criterion>
- [ ] G2 <criterion>

## Arc

Titles upfront, detail just-in-time — a sitting fleshes only the station
it runs.

| # | Station | Targets | Status          |
|---|---------|---------|-----------------|
| 1 | <title> | G1      | done 2026-07-25 |
| 2 | <title> | G1 G2   | pending         |

## Materials & state-deltas

Optional — for moving-codebase subjects whose corpus shifts between
sittings: what the engagement works on, and what moved.

- Materials: <the corpus — repos, paths, docs the stations work>
- 2026-07-28: <what changed since the previous sitting, one line>

## Sitting log

### 2026-07-25 · st1 <title>
- Done: <terse>
- Evidence line: <one line on the tutoring itself — what worked, what didn't>
- Dimmest: <today's dimmest material — the next opener's first retrieval target>
- Leftovers: <carried to the next sitting, or none>
```

## Knowledge Docs

**The slug.** A knowledge doc's slug is the bare subject key (`git`,
`elixir`, …), and **every `docs create` and every `docs update` states
the slug explicitly**: creates, retitles and body-only edits alike,
knowledge and engagement docs alike. The store derives the slug from
the title whenever a call omits it, on `docs create` as well as `docs
update`, so `Learning Git` would derive `learning-git` (the probe
record: `cases.md` § Knowledge Docs). Handles resolve by their trailing
UUID, so a drifted slug breaks nothing stored; the bare form is simply
what the subject index's handles read as.

**Editing a body.** A rewrite is a whole-body `docs update`. Its item's
result gives the stored body's byte length and a digest of it instead
of echoing the whole body back: compare that digest against your own of
the bytes you sent, by the algorithm help names. A whole-body write is
retyped through context, and a length-preserving slip (an arrow
becoming a dash, `- [x]` becoming `- [ ]`) moves no byte count and is
otherwise undetectable. `docs update` documents no optimistic locking:
the body replaces the whole document, and only `docs update_section`'s
help names a stale-document error, so a send overwrites whatever landed
between the fetch it was built from and the write, with nothing raised.
Whole-body `docs update` plus the digest stays the door for rewrites.

**An append**, a new entry or section after an existing node, takes
`docs update_section` in `insert_after` mode on a node resolved from
`docs get_structure`, never an id typed by hand, and reads the new
section back (`docs get_section`), since the digest that call returns
covers the whole stored body, which it never sent. The unchanged bytes
never pass through context, which the whole-body door cannot promise,
and its help names the optimistic locking a concurrent whole-document
edit trips.

A body backslash is `\\` in the JSON string, whichever door: mirror the
encoding `docs get` returns.

**The subject index's SQL.** Match the learner's words to a key by
reading the table, never by an exact `WHERE subject =`: case and
shorthand differ (`Git` is `git`, `bash` is `shell (bash/zsh)`), and an
exact miss creates the duplicate. Every row write is its own `execute`
call (the one-statement rule: `SKILL.md` § First, the stores): the
subject row, then the engagement row, never batched. A value goes in as
a single-quoted SQL literal with each `'` inside it doubled, since a
title is free text, and an engagement row is deleted by its `title`.

**The boilerplate line**, as stored in the head of every knowledge
doc's body:

```
Knowledge doc: one line per item. A box is checked only by demonstration in a session, dated — never by self-assessment. Uncheck a box you no longer remember; unchecked rows are open gaps.
```
