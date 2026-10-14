# Review: cases

The cases of the review skill: the earned precision behind `SKILL.md`'s moments, under the spine's own headings. Read a section's entries at the moment that section runs.

## Contents

- Input: what `implemented.md` records and does not answer, the premature read under a marker, the pre-executed pass's guard
- Recognizers: the shipped checklist, the old marker spelling, the open entry's lines, the two states that reach the fallback
- The lens pass: the precondition, three edges of the delta, the re-green
- Prep — building the walkthrough: probes with side effects, measurements' trees
- The Open: the rulings-only lane
- Dispositions: what blocking blocks
- The Close: the line grammar, the lens-pass line, the fixes line, `Refuted/skipped:`, `Reviewed:`, the `Delta pass:` line
- Iterate — the re-entry close: three writers, what the exit leaves alone, a mechanical doubt

## Input

**What `implemented.md`'s durable refs are.** The branch commit on a
code-repo topic, plus every machinery commit the session made, one
machinery tree or several, on either kind of topic. The lens pass's own
fix commits are not among them: those are the `## Review` entry's
fixes line's.

**Its presence answers a different question, and answers it wrong.** An
iterate close leaves an earlier cycle's file standing, and a
drift-valve stop writes none at all (implement § Drift Valve). So
whether implement has run is read from the state folder, never from this
file, and whether an implement that did run leaves this session due is
Recognizers' read.

**Premature under a marker.** Where the read finds no implement run but
`review.md` carries an `Iteration —` marker on top, the session does not
name implement: plan-review's define branch writes a marker before
implement has ever run. It names the phase the marker's block gives,
read by that block's rule (the process contract, § Iteration), and
holds the naming until Recognizers, Input's item 2, has read it.

**The pre-executed pass needs no copy of the branch guard.** Implement's
session is on the branch by construction, put there by its own readiness
gate.

## Recognizers

**The shipped checklist** reads the ship section against durable state:
the squash ref on main, the task closed, the branch gone, and the
state-folder commit made where the state folder is its own git
repository.

**A pre-rename `Routed back —` marker** in an older record reads exactly
as `Iteration —` does.

**The open entry's lines.** The review-owned lines (Walkthrough,
Fitness, Where-to-look, Tails) are absent from the entry implement's
close writes, by rule (→ § The Close). So a `Fitness:` line present is
review's own writing, and a placeholder standing in one is a torn write,
never an answer. An edge already recorded mid-walkthrough does not make
the entry a wait close: the walkthrough finishes first.

**Exactly two states reach the fallback pass.** A topic whose implement
predates the pre-executed pass, and a close that died before its entry
write. A wait re-entry is not one of them: its entry is complete and
carries its own lens-pass line, and what it owes is the `Delta pass:`,
which stays this phase's.

## The lens pass

**The precondition is a diff or a change set**, read off what is
already held (the process contract, § Review effort).

- On a code-repo topic, `git log --first-parent --no-merges
  main..<topic> --oneline` is non-empty: the branch's own commits, read
  the way the delta is read, its merge companion included. A three-dot
  `git diff main...<topic> --stat` is not the test, because a catch-up
  conflict resolved by taking main's side whole leaves it empty on a
  branch that does carry the topic's own work.
- Where the session edited machinery, `implemented.md` names at least
  one machinery commit ref per machinery tree it edited, so a meta topic
  whose session touched only a machinery tree has a diff like any other
  (the process contract, § Topic kinds).
- Where no diff exists, the topic's **change set** (term: the plugin
  glossary) stands in: the caller hands code-review that set as its
  target, and the pass reads each payload as the change and its target
  in place, a file or a store.

Only a topic that wrote nothing fails the precondition. The failure is
reported: the entry's lens-pass line reads `Lens pass: dropped — no diff
or change set` and is the whole of the pass's lines (→ § The Close), and
the session goes straight to Prep, the walkthrough running over the
artifacts' real content. There is no artifact-kind exemption: a prose
or meta diff gets the pass like any other, and how much machinery runs
is code-review's tier, keyed by risk profile.

**Three edges of the delta.**

- An entry carrying a `Reviewed:` line and **no `Unreviewed:` line
  predates the two-line split**, decisively: every close that writes an
  entry since writes both lines, `Unreviewed: none` included. That
  entry's own close committed refs no line names: read the entry's prose
  for them (such a close recorded its ref, or where to find it, in a
  note beside its findings) and treat what that yields as `Unreviewed:`.
  A note that gives only a locator is followed, not skipped.
- A fixes line whose commit field carries a **sha with no tree token
  predates the tightening**, decisively too: every writer since marks
  its trees. Resolve it with `git -C <tree> show <sha>` across the
  branch and every machinery tree; the tree that answers is its tree.
- **No `Reviewed:` line anywhere** (a first review, or entries
  predating both lines) makes the subject everything step 1 collected,
  nothing dropped, plus the working tree. On a code-repo topic that
  subject's branch half is the whole branch, `git log -p --first-parent
  --no-merges main..<topic>`, every task commit implement made, never
  the last task's commit alone, which is all the close's own verify
  prints.

How many iterations a topic has run never enters: the tier stays
code-review's to key, over whatever the subject turns out to be.

**The re-green after the fixes.** Run once per tree the fixes touched,
after they land. **The result is recorded either way**, on the fixes
line's `re-green:` clause, so green is a state the record states rather
than implies by the absence of a red. **A red is a finding** besides: it
joins the entry's findings for this phase's dispositions, as a red
re-green does at § Developer edits' run. The ship's catch-up run is the
one exception: its red stops the close (→ § Phase Close, ship step 2 in
`mechanics.md`). This pass's red is never a hand repair, never the drift
valve, and never a reason for a close to stop: the increment was green
before the pass ran, and what the fixes did to it is review's subject.

One pass, and no re-review loop. Every applied fix is listed in
`review.md`; none is a stop by virtue of being a fix, though a fixed
finding earns a stop when the story calls for it. Every finding
code-review reported for disposition, correctness and plan fidelity
above all, seeds the walkthrough's agenda and enters dispositions.
Candidates its verify refuted or its judgment skipped are named on the
entry's `Refuted/skipped:` line and disposed of nowhere: dropping them
was the pass's call, and the line records it rather than reopening it.

## Prep — building the walkthrough

**A facilitator probe with a side effect** (an install, an init, a
config write) runs in a scratch replica, never a live tree: one `git lfs
install --local` in a real checkout wrote five lines into its
`.git/config` and closed the review on a config hand-off. And a lens
finding that states a measurement names the tree it ran in, so nobody
re-measures it live to find out.

## The Open

**The rulings-only lane** is the developer's own call, never the phase's
offer ("only present the findings and any decisions I have to take"),
and it is session-scoped the way a category skip is: no durable "I know
this area" record, no per-area variant. Its one cost: **inspection
stays, exposition goes.** The lens pass has run, the findings are read
against the code, and the fitness question is still answered; what the
lane drops is the walkthrough's telling. Deliver it in one message for a
one-word ruling: the findings with their proposed dispositions, every
ruling Input deferred to review, the fitness answer proposed rather than
asked, and the stops that would have run, named, so the skips have a
referent. The record shape is § The Close's: the skip grammar carries
the lane's form, and the `Calibration` tail its own where the lane was
declared before Prep ran.

## Dispositions

Blocking blocks **this topic's ship**, not production in the abstract:
main is what gets pushed, so "shipped but must not go to production" is
a fiction the process cannot see.

## The Close

**No exposition summaries.** The code, the plan and the spec carry the
content; the findings with their dispositions, the stops with what each
showed, the fitness answer and the where-to-look map written from real
code are the record's new information. A line with nothing to say reads
`none` rather than being dropped, with two exceptions that are absent
rather than `none`: a dropped pass's own lines (below), and the
review-owned lines (Walkthrough, Fitness, Where-to-look, Tails), which
are **absent until review writes them**. Implement's close writes
findings and nothing else, and Recognizers key on that absence, so a
placeholder there would read as an answer.

**The line grammar.** A finding line the lens pass writes ahead of its
disposition reads `- F<n> <file:line> — <finding>`, and review appends
the outcome in place (` — <outcome>: …`), so both writers share one
list. `·` joins a line's fields; a field's members keep their own
joins: a list of fixes comma-joins, a tree's refs space-join while the
trees `·`-join, and a tree-labelled `re-green:` `·`-joins its per-tree
results. `<where>` is a `path:line` or a function name; a skipped stop
names which kind of skip.

**The lens-pass line carries the pass's coverage**, and it is the
entry's **first body line** under the heading, which is what the
fallback fork reads (→ Recognizers). The slot after `over` names what
the pass actually diffed: the branch tip it read as `branch @ <sha>`,
and the machinery refs as a list per tree, `<tree> <sha…>`, `·`-joined
where more than one applies. A meta topic's line carries the machinery
halves alone, and a pass over a change set carries `change set @ <n>
payloads`. A pass whose precondition failed writes `Lens pass: dropped
— no diff or change set` and no slot, and that line is then the whole of
the pass's lines: no fixes line and no `Refuted/skipped:`, neither
written `none`. The findings list is not the pass's to drop: it is a
two-writer list the pass merely seeds, and a dropped pass seeds it with
nothing. The review session's own findings still land there; until one
does, the list reads `none`, the first finding replacing it. The
entry's later sections are untouched by a dropped pass.

**`Fixes applied (--fix):`** is its own following line: every applied
fix named, then the commits carrying them, or `none`, closing with
`· re-green: <result>` where fixes were applied. The clause is owed
exactly when there were fixes, so `none` carries none. `<result>` is
bare where the fixes touched one tree (`green`, or `red — F<n>` naming
the finding the red became) and tree-labelled, `·`-joined, where they
touched several: `re-green: branch green · suite red — F3`.

**The commit field is tree-marked, always, with no bare default**:
`branch <sha> · <tree> <sha…>`, the tokens and joins `Unreviewed:`
uses, `branch` only where a branch exists, a tree's refs space-joined,
the trees `·`-joined, and no `@`, this being a ref list rather than an
anchor. A single-tree fix writes its token too (`<tree> 49f2b15`), so no
reader has to probe which tree a sha sits in. Two tokens carry no sha.
`folded` marks a fallback pass's fixes, which ride this close's own
commit (→ § The lens pass in `SKILL.md`): the ship section names that
commit on a ship, and the `Unreviewed:` line on an iterate or wait
close. `state` marks a fix in a state-folder file, whose commit is the
running phase's own state-folder commit, made after this line and found
by topic ID. Either sits beside whatever tree tokens the field already
has, and the fix list names each file as always. **This line is where a
pass's fixes are recorded durably**, written the moment the fixes land
by whichever operator ran the pass, and never rewritten.

**`Refuted/skipped:` records the candidates the lens pass dropped**,
the ones its verify refuted and the ones its judgment skipped, each a
short name with a one-clause why and no locator. Two kind-groups carry
them, `·`-joined (`refuted — <name (why)>, … · skipped — <name (why)>,
…`), so the kind is written once, and a group may take one shared why
for all its members (`skipped — below the cap or churn bar: a, b, c`). A
group with no members is absent, and the whole line reads `none` where
the pass dropped nothing. The line is **unconditional wherever the lens
pass ran**, the dropped pass its one exemption, so its absence carries
information. It records a call already made, never an agenda.

**What a later delta computes from.** The coverage slot and the fix
commits: the coverage anchor is the left edge of the branch range, and
implement's fix commits are recorded work no `Reviewed:` line names, so
they stay in the next subject by construction (→ § The lens pass in
`SKILL.md`). Nothing computes from the `re-green:` clause or from the
`Refuted/skipped:` line: both are record, for whoever reads the entry.
Both halves of `Reviewed:` ride one line where both apply (`Reviewed:
branch @ <sha> · <tree> <sha> · <tree> <sha>`), which is how a code-repo
topic's machinery edits reach the next delta (the process contract,
§ Topic kinds).

**The `Delta pass:` line** records the pass a **ship** close owes any
work no pass has seen. It is computable from the record rather than
remembered: everything recorded or edited **after the entry's lens-pass
coverage anchor**. That is the fix commits the pass itself produced
(the fixes line names them, and on a code-repo topic they also sit in
the branch range above the anchor), the entry's `Unreviewed:` refs where
it has them (a ship following a wait close reads that entry's line), and
every edit made since, the decide-forward that fires no close above all,
with the developer's edits from the gap between implement and review.

It is a code-review run scoped to that diff, its **tier keyed first**,
by risk profile (the process contract, § Review effort), before any
skill loads: an inline-read delta is read in-session and loads nothing,
and the line carries `<tier>` and no roster. It runs **without
`--fix`**: a delta finding goes to disposition like a walkthrough's,
because a ship never trusts a fix unseen. The re-run rule of § Developer
edits stands beside it: where that rule fired, the line closes with
`· re-green: <result>`, spelled as the fixes line's clause is. Where it
did not fire the line carries no clause, and which it was stays
derivable: the only subject content that owes no re-run is implement's
fix commits, their green already on the fixes line, so anything else in
the subject is post-pass work whose green never ran. A delta pass's own
refuted or skipped candidates go unrecorded: the line carries tier,
subject and re-green alone. Iterate and wait closes run nothing extra:
their own commits ride `Unreviewed:` and land in the next iteration's
delta by construction. Nothing uncovered, no line.

## Iterate — the re-entry close

**Three writers, one marker.** This close is one of them; implement's
drift-valve stop and plan-review's *needs a define session* branch are
the others, writing the same marker into this same file. Each owns its
own steps and states them once (implement § Drift Valve; plan-review
§ The Relay).

A learning drop captured, or a Learning task minted, mid-session is
untouched by this exit: it carries its own evidence, so it needs no line
beside the marker.

A *mechanical* doubt does not contest the record: it is a finding, and
takes a disposition. Neither is a finding whose new decision the
developer has already made: that is **decide-forward**, executed in
place and firing no close at all (→ § Dispositions in `SKILL.md`).
