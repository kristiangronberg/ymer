---
name: mint
description: Use when minting or annotating a roadmap/inbox item — any phase with evidence to hand off, cross-repo intake included: the three looks before the call (search the pool, check the source topic's decision record, check ship state) and the claims discipline on the item's evidence, with a plain-worded lead for the triage reader. NOT for the consume side — brainstorm re-derives an item's measurements when it sizes the topic — and not for deciding whether the work merits a topic at all. A supporting skill, not a phase.
---

# Mint — evidence discipline at the intake boundary

This file is the mint skill's spine: its intent and the moments in order. Its **cases** — the earned precision: edge cases, exceptions and rulings — are in `cases.md`, under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

Intake is knowledge handoff across time and vantage: a producer
records a finding at one moment, from one vantage; a consumer acts on
it later, from another, with none of the producer's context in view.
This skill is the producer-side discipline for the *mint item* and
*annotate item* operations — the duties that make the handoff survive
that gap. The operations themselves — required outcomes, procedures,
read-backs — live in the operations contract, whose binding names the
call each one takes per coordinator; this skill owns the duties alone
and adds no procedure.

It fires at the chartered mint moments the phase skills name, as
`/ymer:mint <finding>` when filing directly, and ad-hoc whenever a session
is about to hand evidence to a pool. The duties run before the call; the
call and its read-back then run per the binding, unchanged. The one duty
worth naming here, because it re-arms at every mint: the binding's
read-back is not optional. A `tasks create` answers with an id and a
status, nothing that proves pool membership, so the read-back is what
proves the item reached the pool rather than the void.

## Three looks, mandatory at every mint

*Read with this section: `cases.md` § Three looks, mandatory at every mint (the cases).*

A mark cannot substitute for a look — a marked duplicate is still a
duplicate. Before the call:

1. **Search the target pool first** (*search pool* on both keys — the
   candidate's slug by name, what it claims by subject — plus *list
   inbox items* — binding: the operations contract). A hit outside the pool —
   a learning or personal task, read off the projects the result
   carries — is dropped, however well it matches. A hit that is an
   open item means **annotate, not mint**: the evidence joins the item
   instead of duplicating it. A hit that is a closed task is not an
   annotate target — annotating binds open items; the closed record
   feeds looks 2 and 3 instead. For a repo with no roadmap project the
   target pool is the meta inbox, where the README routes such
   candidates.
   A hit that is **related but not the same finding** is linked, never
   cited in prose: a relatedness link in the server's `related`
   relation, sent through whatever shape its help names for the call, so
   the relation sits on the one read every topic resolution already makes.
2. **Check the source topic's decision record.** A mint that reverses
   a recorded discard — a rejected option, an out-of-scope entry, a
   retired topic — says so and names the record it reverses.
3. **Check ship state.** A ship that already resolves the finding
   makes the mint born-stale: it does not happen — or the item names
   exactly what the ship left unresolved.

## The register on the item's evidence

*Read with this section: `cases.md` § The register on the item's evidence (the cases).*

## The triage lead

*Read with this section: `cases.md` § The triage lead (the cases).*

The description opens with a plain-worded, example-led statement for
the human triage reader — what went wrong or what is wanted, in words
that survive without the session's jargon. Slugs, register marks, and
mechanism detail come after the lead, never instead of it.

## Annotating

*Read with this section: `cases.md` § Annotating (the cases).*

Annotating carries the same register on the appended evidence, and
looks 2 and 3 as written; look 1 is satisfied by construction — the
annotation's target is the search hit. A ship-state hit at annotate
converts the annotation into a moot note: the evidence still lands,
status untouched — suppressing it would discard a finding.

## Scope

Producer-side only. The consume side is brainstorm's: an item's own
measurements are re-derived before they size a topic, whatever this
skill did at the mint. Whether the work merits an item at all stays
the calling phase's call. Forward-only, per the register's own rule:
these duties bind new mints and annotations — no retroactive marking
sweep over the pool.
