# development-process — cases

The cases of the development-process skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Artifacts

**The pending interview.** A brainstorm or define session whose
interview question cannot be put (the hold and its trigger: *Defaults
and holds*, below) writes every remaining question into its own
artifact — `brainstorm.md` or `spec.md` — never into a separate file.
The marker is one line, `Interview pending — <date>: <n> questions` at
line start, directly under the artifact's title with a blank line on
each side and ahead of the metadata paragraph, so a head read meets it
first; `<n>` counts the questions not yet answered, and the marker names
no phase, because the artifact does. The prepared questions sit in a
`## Interview` section of the same artifact, which exists only while the
marker does: one `### Q<n> — <title>` entry per question, in dependency
order, each carrying the question with its premises stamped or marked
`inferred:`, the options with their trade-offs, the recommendation first
and marked, a follow-up that exists on one branch only nested under the
option that forks it as `Q<n>a`, and — for a question answered before a
refusal mid-interview — an `Answered:` line naming the pick and, at
define, the `D<n>` it became. The pending close commits the artifact
under the phase's message with a suffix,
`<topic ID>: brainstorm (interview pending)` or
`<topic ID>: define (interview pending)`, and a marker-bearing artifact
left uncommitted is a torn close, which the next pre-flight commits
under that message before it reads the arrival. Liveness is presence in
the file, never a commit range: the phase's own consolidating rewrite
removes marker and section together — so does define's close on the
route back to brainstorm, the interview over, since brainstorm would
otherwise stop on the marker define left — and the status ladder reads
`brainstormed` and `specced` only off an artifact whose head carries no
marker (binding: the operations contract). Topic resolution reads the marker
at the four openings that carry it (the plugin glossary): on the phase's own
artifact it is the **pending interview** arrival, and the phase resumes
at the first unanswered `Q<n>`; on another phase's artifact it stops the
session and names that phase. At the resume, prepared premises whose
ground moved are re-verified before their questions are put, added
questions are numbered on from the last `Q<n>`, and the interview's
escapes stand — not worth pursuing, a split, define's route back to
brainstorm; where `review.md` tops with an iteration marker naming the
phase, its finding is read first as at an iteration, because the pending
close's own commit reads that marker consumed. A resume that is itself
unattended closes around the interview again, the marker's date and
count the newest close's. A topic carries one pending interview at most:
define stops on a pending `brainstorm.md` before it writes anything. The
procedure that fills the section — agenda, question, answer, pending —
is `interview.md` beside this skill, which brainstorm and define read
whole before their first question.

## Topic kinds

"Prose-only meta topic" is not a third kind. It describes a session that
happened to make no machinery edits — a fact about the session, not about
the topic.

**Why the commit is a duty and not a convenience** — the rationale every
phase's close site points at rather than restating: machinery files are
**live on disk the moment they are written**, read by every session on
this machine, so committing them defers nothing; an uncommitted machinery
tree carried across sessions is what breaks the concurrent-session
rules. The same fact is why the commit is scoped to the files this topic
edited: another session's dirt in the same tree is its work in flight —
and where a machinery tree's files are linked into place from elsewhere,
an unscoped `add -A` there sweeps unrelated packages besides.

**Artifact kind keys nothing.** Prose or code, review effort is keyed by
risk profile alone (→ Review effort), and "the plan's own gates" already
follows from being a meta topic. A fork phrased on artifact kind is a fork
on the wrong axis.

## Review effort — the ladder and its keys

Two properties follow, and both are the point. There is **no hand-maintained
exclusion list** anywhere — the lenses left out are derived from which
preconditions fail.
And a lens added later **carries its own applicability**, so nobody must
classify it into every tier's list.

Each phase names its own ladder and points here for the key — the four
dimensions live in this section and nowhere else. The ladders today:
code-review's inline read → full pass → `ultra`; plan-review's lightweight pass
→ workflow; write-plan grounding's direct verification → Explore fan-out.

**One qualification, and it is not a second key.** Where a ladder's tiers differ
in *orchestration machinery* rather than in depth of scrutiny, it carries an
**orchestration floor**: below some surviving-lens count the machinery's own
fixed cost — spin-up, the journal, stall/retry failure modes, a heavier
synthesis author — dominates what it buys, whatever the risk profile said. The
floor's number is a **calibration** stated with its reasoning at the skill that
owns it, and revised on captured evidence; it is never written as a bare
threshold. Ladders whose tiers differ only in scrutiny have no floor.

## Iteration — the route and its executor

Two extensions close the edges. **Nothing recorded is contested** — the
finding is new information — routes to the phase whose artifact *should*
record the answer. **Findings spanning artifacts** route to the earliest
phase among them: downstream artifacts are rebuilt on the way forward
anyway.

A measurement routes to define rather than to scout because define is
already `survey.md`'s amender, and a measurement matters only through the
decisions leaning on it — which are define's to re-decide. A mis-measure
**no decision leans on** is no iteration at all: it is a record
correction, and any session may amend the survey under the claims
discipline's re-verify-at-use duty (the sweep skill).

**The receiving side is a read, not a memory.** The phase a marker names
learns it is the route's destination at its own opening, where topic
resolution reads `review.md`'s first recognizer beside the task's status
and the topic folder — brainstorm, define, scout and write-plan each
carry that read. A marker on top is either live or consumed; which it
is, and the command, range and committed floor that decide it, live once
at review § Input item 2, and nothing here restates them. A live marker
naming the phase that is open is that session's brief, its finding the
mandate; one naming some other phase is the same read's other answer —
stop and name the phase the marker names.

**The subject is the delta since the last reviewed state.** Iteration
count never enters — it is a constant in disguise, and the risk-profile
ladder already prices a delta exactly as it prices anything else
(→ Review effort). Two reads:

- **The code** — whatever the record leaves uncertified. Each `review.md`
  entry carries two ref lines: `Reviewed:` certifies what that entry's
  lens pass covered, `Unreviewed:` records the close's own commits that
  no pass has seen. Which refs that leaves — the traceability stores the
  record names them in, and which of those a `Reviewed:` line has already
  covered — is computed once, at review § The lens pass, which owns the
  pass's whole procedure whichever phase operates it: implement's close
  pre-executes the pass, review runs it as the fallback, and both read
  the computation there. Nothing here restates the computation: a second
  arithmetic in this section reads as the traceability-store list, and a
  list short by one returns the empty set for a whole class of
  increments. Findings an earlier entry disposed stay disposed.
- **The plan** — the committed pre-image, which is the parent of this
  iteration's own `: write-plan` commit. The diff that reads it is one
  command, and it lives once, at plan-review § Steps step 2 — its one
  consumer — not here. Implement's
  plan edits — mechanical corrections and decide-forward amendments
  alike — belong to the standing record rather than to the new delta:
  their substance is reviewed as code by that cycle's lens pass, and a
  decide-forward's decision stays readable through its amendment marker,
  which plan-review's amendment-ripple item and the decision digest pick
  up.

## Process ground rules

- **Parallel sessions & artifact drift.** The user may run concurrent
  sessions and hand artifacts between them. Re-read a shared file before
  editing or judging it when: implementing an aged plan that didn't just
  pass plan-review; an Edit's old_string fails to match (that failure is
  the signal); or the user mentions another session has touched it. Say
  which version a judgment is based on; treat a session receiving an
  artifact as its new owner and route further edits through the user.
- **Design brainstorms consolidate on the user's settle signal.** Hold
  evolving decisions in a scratch doc and write canonical docs only when
  the user says the design has settled — early stamps get reversed;
  surface reversals honestly.
  The productive session shape: verify-first (check every claim of the input
  against the code), then crisp forks through the question instrument with a recommendation
  first. After editing one section of a long canonical doc, grep the rest for
  orphaned vocabulary the edit invalidated.

- **Standalone repos.** Each project repository is standalone: a fresh
  clone, with nothing beside it, builds, passes its own gate, and reads
  sensibly to a holder of that clone alone; the state folder is upstream of
  nothing. The test is the fresh clone: clone into a scratch dir, run the
  repo's gate (`mix precommit`; `mix docs` where configured), read the
  shipped prose. Two things follow. Nothing the gate runs — compile, lint,
  tests, generators, docs build — reads a sibling checkout; and no link or
  path in repo content points into one. The duties sit where the work
  happens: payload prose at write-plan's Payloads section, mechanically at
  its payload-verifier gate; links and paths at the coding-standards
  companion skill's documentation placement.
