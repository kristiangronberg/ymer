# Review — cases

The cases of the review skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Input

1. `implemented.md` — implement's record: deviations from the plan and
   why, mishaps, what was noticed but not built, the verification
   result, and the durable ref — the branch commit on a code-repo topic,
   plus every machinery commit the session made — one machinery tree
   or several — on either kind, the lens pass's own
   fix commits excepted: those are the `## Review` entry's fixes line's
   (topic kinds: development-process § Topic kinds). **Pre-flight:**
   derive the predecessor's close state and any pending steps from
   durable state; finish an unfinished close from its first missing
   outcome; re-report each pending step with its command (*Defaults and
   holds*: development-process). **Premature is read from the state
   folder, never from this file**: no `<topic ID>: implement` commit over
   the topic folder — `git -C <state folder> log --oneline --grep
   '<topic ID>: implement' -- <repo>/YYYY/MM-DD-<topic>/`, empty — means
   implement has not run at all: stop and name the phase that should run
   — **implement**, unless `review.md` carries an `Iteration —` marker
   on top. plan-review's define branch writes one before implement has
   ever run, so the phase is named by item 2's read of the marker's
   block rather than by the marker alone: a block with no `Consumed —`
   line reads live and names the phase the marker names, and otherwise
   the block's last line, with `plan.md`'s ticks, says where the route
   now stands; a route whose phases have all run again leaves
   **implement** due.
   `implemented.md`'s presence answers a different question and answers
   it wrong: an iterate close leaves an earlier cycle's file standing,
   and a drift-valve stop writes none at all (implement § Drift Valve).
   Whether an implement that *did* run leaves this session due is item
   2's read. On a code-repo
   topic the
   increment under review is the topic branch's own commits, read
   **first-parent, merges excluded** — `git log -p --first-parent
   --no-merges main..<topic>`, a patch series rather than a net diff,
   with `git show <merge sha>` and the record's resolution note joining
   it for every catch-up merge that resolved conflicts (→ The lens
   pass, whose delta paragraph states why both halves are needed: the
   series alone shows nothing a resolver hand-wrote) — plus the
   branch's working tree; a dirty tree is the
   developer's edits in flight (→ Developer edits), never reset and never
   stashed — this session is the one project-checkout pre-flight that
   folds instead of stashing (the substrate contract) — and the
   close that follows commits every one of them, whichever close it is
   (→ Phase Close).
   **Precondition, before this session writes to any tree**: the session
   runs in a checkout holding `<topic>` — `git branch --show-current`
   prints it; when another worktree holds the branch (`git worktree
   list` names it), every project-repo command runs in that checkout;
   otherwise `git switch <topic>`. Neither lands the branch → stop and
   report. Every write this session makes to the project's tree lands in
   the cwd's — a fallback pass's fixes, the developer's edits at a stop,
   a decide-forward's amendment — so a wrong checkout writes them to the
   wrong branch. The pre-executed pass needs no copy of this guard:
   implement's session is on the branch by construction, put there by its
   own readiness gate. Where the session's machinery
   edits are part of the increment, the machinery commits the record
   names join the subject — the traceability-store list is the charter's
   ground rule, read at § The lens pass — read per tree
   (`git -C <tree> show <ref>`, one per ref, per machinery tree the
   record names) plus that tree's working tree; on a meta topic
   they are the whole of it.
2. Any existing `review.md` — its first recognizer names the state
   (→ Recognizers). `## Shipped` on top → read the section as a
   checklist against durable state first: the squash ref on main, the
   task closed, the branch gone, the state-folder commit made. Any outcome
   missing → a torn close — finish it from its first missing outcome,
   never confirm-gate it. All landed → already shipped: a re-run is
   deliberate, confirm before proceeding. `Iteration —` on top (or a
   pre-rename `Routed back —`, which reads identically) → **read whether
   that route is still live, and where it stands**. Nothing ever removes
   a marker. Its **block** is the marker line and the ref lines written
   with it (`Reviewed:`, `Unreviewed:`), up to the first blank line or
   the file's end, and
   the route is recorded by lines appended to the end of that block, one
   per phase close, in the order written, so the newest is last:

   ```markdown
   Consumed — <YYYY-MM-DD> by <phase>
   ```

   The phase the marker names writes the first at its own close, a
   pending close included, and that line **consumes** the marker. Each
   later phase on the route (scout, define, write-plan, plan-review,
   implement, whichever run) appends its own at its close to a block
   that already holds one, and implement's close appends its line
   whatever the marker names, since implement ends the route. A phase
   writes its line as its close's last write before the phase's commit,
   with two exceptions: plan-review writes its `Hardened —` line after
   it (the operations contract, Status ladder), and implement writes its
   line just before its `## Review` entry, which then takes the top. The
   line is the same on every kind of state folder. It is no recognizer,
   so the marker stays the first one top-down, and a session that stops
   at topic resolution writes none. No line in the block → the route is
   **live**: stop and name the phase the marker names, where the route
   *entered*. A last line `by implement` → implement completed after
   the marker, never reaching `review.md` with its entry → this session
   follows a consumed re-entry and proceeds: a fresh `## Review` entry
   prepends above the marker, and the entries below it carry the
   `Reviewed:`, `Unreviewed:` and `Fixes applied (--fix):` lines this
   session's delta is computed from (→ The lens pass, which enumerates
   the traceability stores). Any other last line → the route is
   mid-way, and the phase **due** is the one after the last line's
   phase in the pipeline's order (brainstorm, scout, define, write-plan,
   plan-review, implement): stop and name it. A stopped route writes no
   line, so it still names the phase it stopped before, which is the
   right answer. `## Review` on
   top with no ship section → read the
   entry itself; its close block is the selector. **Incomplete** — no
   `Fitness:` line → an open review: the lens findings, the stops
   already written, and the dispositions already settled stand, and
   this session covers the remainder inside the same entry — no new
   entry; the stops the entry already lists are covered and are not
   walked again. This is the **normal path**, not the damaged one:
   implement's close leaves exactly this shape — an entry holding the
   pass's findings and nothing else — and the session goes straight to
   Prep. The review-owned lines — Walkthrough, Fitness, Where-to-look,
   Tails — are absent from that entry by rule (→ The Close), so a
   `Fitness:` line present is review's own writing, and a placeholder
   standing in one is a torn write, never an answer.
   An edge already recorded mid-walkthrough does not make
   this a wait close — the walkthrough finishes first. **Complete** —
   fitness answered, tails written → the **wait** close: read the edge
   (*order topics*' read-back on the topic's task): the lifted task
   resolved → this session ships; still open → report it and stop.

   **The fallback fork — read off the open entry, never off recall.**
   The observable is a `^Lens pass:` line as the open entry's first body
   line under its heading (grammar: → The Close). Present → the pass has
   run; read its findings and open Prep. `Lens pass: dropped — no diff or change set`
   counts as present: the pass ran and recorded its precondition
   failure. **Absent** — no `review.md` at all, or an open `## Review`
   entry with no such line — → this session runs the pass itself
   (→ The lens pass), announcing the wait before it starts. Exactly two
   states reach that branch: a topic whose implement predates the
   pre-executed pass, and a tail that died before its entry write. A
   wait re-entry is not one of them — its entry is complete and carries
   its own lens-pass line; what it owes is the `Delta pass:`, which
   stays this phase's.
3. `plan.md` and `spec.md` — what each stop's constraints derive from,
   never recalled: the spec's decisions with their rationale and out-of-
   scope list, the plan's rationale, `> Design decision:` notes,
   `> **Amended (…):**` markers, and `> Needs confirmation:` markers —
   plan-review's record of a product or domain question it could not
   settle on the user's behalf. A marker is **resolved** when an
   amendment marker follows it at the same site: plan-review's close
   puts every survivor to the user and writes each ruling there, so a
   marker still unresolved here is one nobody answered before the code
   existed — and this session reads it after: one whose answer the
   shipped code does not visibly settle is a finding (→ Dispositions),
   never passed over. Also the lens pass's decision-digest sources.
4. `brainstorm.md` — which decisions the user co-decided, and therefore
   which stops compress to a line rather than exposition (→ Prep).
5. `sketch.md`, **when it exists** — the contrast between the user's own
   attempt and the shipped code ("your sketch did X; the shipped code
   does Y"). This phase is its only reader (reader contract:
   development-process § Artifacts). Not pre-test material; when there
   is no sketch, nothing stands in for it.
6. The developer's **knowledge docs** — the calibration input (→ Prep).

## The lens pass

**Precondition: a diff or a change set exists** — read off what is already held (lens
applicability: development-process, *Review effort*): on a code-repo
topic, `git log --first-parent --no-merges main..<topic> --oneline` is
non-empty — the branch's own commits, read the way the delta is read
below, its merge companion included; a three-dot `git diff
main...<topic> --stat` is not the test, because a catch-up conflict
resolved by taking main's side whole leaves
it empty on a branch that does carry the topic's own work; where the
session edited machinery, `implemented.md` names at least one machinery
commit ref per machinery tree it edited,
so a meta topic whose session touched only a machinery tree has a diff like
any other (topic kinds: development-process § Topic kinds). Where no
diff exists, the topic's **change set** (term: the plugin glossary)
stands in: the caller hands code-review that set as its target, and
the pass reads each payload as the change and its target in place, a
file or a store. Only a topic that wrote nothing fails the
precondition. A failed
precondition is reported, never silent: the `review.md` entry's
lens-pass line reads `Lens pass: dropped — no diff or change set` and is the whole of
the pass's lines (→ The Close), and the session goes straight to Prep,
the walkthrough running over the artifacts' real content. There is no
artifact-kind exemption: a prose or meta diff gets
the pass like any other, and proportionality rides code-review's tier
ladder, keyed by risk profile.

Three edges. An entry carrying a `Reviewed:` line and **no `Unreviewed:`
line predates the two-line split** — decisively, not probably: every
close that writes an entry writes both lines, `Unreviewed: none`
included (→ The Close), so no close since the split can produce that
shape. Such an entry's own close committed refs no line names — read
that entry's prose for them (such a close recorded its ref, or where to
find it, in a note beside its findings) and treat what that yields as
`Unreviewed:`. A note that gives
only a locator is followed, not skipped: the ref exists either way. A
fixes line whose commit field carries a **sha with no tree token
predates the tightening** — decisively too: every writer since marks its
trees (→ The Close), so a bare sha can only be an older entry's. Resolve
it with `git -C <tree> show <sha>` across the branch and both machinery
trees; the tree that answers is its tree. And
no `Reviewed:` line **anywhere** — a first review, or entries predating
both lines — makes the subject everything step 1 collected, nothing
dropped, plus the working tree: the fallback is step 2's degenerate
case, read off the same store list, never a different subject. On a
code-repo topic that first-cycle subject's branch half is the whole
branch — `git log -p --first-parent --no-merges main..<topic>`, every
task commit implement made, read exactly as § Input item 1 reads the
increment — never the last task's commit alone, which is all the
close's own verify prints. Iteration
count never enters: the tier stays code-review's to key, over whatever
the subject turns out to be.

Then, once per tree the fixes touched: the project's test suite for
branch files, the plan's own gates for machinery files — green, run after
the fix commit rather than before it. **The result is recorded either
way** — on the fixes line's `re-green:` clause (grammar: → The Close),
so green is a state the record states rather than one it implies by the
absence of a red. **Red is a finding** besides: it joins the entry's
findings list for this phase's dispositions, as a red re-green does
at § Developer edits' run too — the slot records, the finding
disposes. The ship's catch-up run is the one exception: its red stops
the close (→ Phase Close, ship step 2). This pass's red is never a
hand-repair — the phase trusts the fixes — never the drift valve, and
never a reason for a close to stop; the increment was green before
the pass ran, and what the fixes did to it is review's subject. One
pass; no re-review loop. Every applied fix is listed in `review.md`;
none is a stop by virtue of being a fix, though a fixed finding earns a
stop when the story bar says so. Every finding code-review reported
for disposition — correctness and plan-fidelity above all — seeds the
walkthrough's agenda and enters dispositions; candidates its verify
refuted or its judgment skipped are named on the entry's
`Refuted/skipped:` line and disposed of nowhere — dropping them is the
pass's call, already made, and the line records that call rather than
reopening it.

## Prep — building the walkthrough

**A facilitator probe with a side effect** — an install, an init, a
config write — runs in a scratch replica, never a live tree: one
`git lfs install --local` in a real checkout wrote five lines into its
`.git/config` and closed the review on a config hand-off. And a lens
finding that states a measurement names the tree it ran in, so nobody
re-measures it live to find out.

## The Open

**The rulings-only lane** is the developer's own call, never the phase's
offer — "only present the findings and any decisions I have to take" —
and it is session-scoped the way a category skip is: no durable "I know
this area" record, no per-area variant. Its one cost, stated once:
**inspection stays, exposition goes.** The lens pass has run, the
findings are read against the code, and the fitness question is still
answered; what the lane drops is the walkthrough's telling. Deliver in
one message for a one-word ruling — the findings with their proposed
dispositions, the fitness answer proposed rather than asked, and the
stops that would have run, named, so the skips have a referent. The
record shape is § The Close's: the skip grammar carries the lane's
form, and the `Calibration` tail its own where the lane was declared
before Prep ran.

## Dispositions

Blocking blocks **this topic's ship**, not production in the abstract:
main is what gets pushed, so "shipped but must not go to production" is
a fiction the process cannot see.

## The Close

No exposition summaries — the code, the plan, and the spec carry the
content; the findings with their dispositions, the stops with what each
showed, the fitness answer, and the where-to-look map written from real
code are the record's new information. A line with nothing to say reads
`none` rather than being dropped, with two exceptions, absent rather
than `none`: a dropped pass's own lines (the rule: below), and the
review-owned lines — Walkthrough, Fitness, Where-to-look, Tails — which
are **absent until review writes them**: implement's close writes
findings and nothing else, and § Input item 2's recognizer keys on that
absence, so a placeholder there would read as an answer. A finding line
the lens pass writes ahead of its disposition reads `- F<n> <file:line>
— <finding>`, and review appends the outcome in place — ` — <outcome>:
…` — so both writers share one list. `·` joins a
line's fields; a field's members keep their own joins — a multi-fix
list comma-joins, a tree's refs space-join while the trees themselves
`·`-join, and a tree-labelled `re-green:` `·`-joins its per-tree
results. `<where>` is a
`path:line` or a function name; a skipped stop names which kind of skip.

**The lens-pass line carries the pass's coverage**, and it is the
entry's **first body line** under the heading — which is what the
pre-flight fork reads (→ Input, item 2). The slot after `over` names
what the pass actually diffed: the branch tip it read, as `branch @
<sha>`, and the machinery refs as a list per tree, `<tree> <sha…>` per
machinery tree, `·`-joined wherever more than one applies; a meta
topic's line carries the machinery halves alone, and a pass over a
change set carries `change set @ <n> payloads`. A pass whose
precondition failed writes `Lens pass: dropped — no diff or change set` and no slot,
and that line is then the whole of the pass's lines: no fixes line, no
`Refuted/skipped:` — the dropped line explains both absences, so
neither is written `none`. The findings list is not the pass's to
drop — a two-writer line the pass merely seeds, and a dropped pass
seeds it with nothing: the review session's own findings
(→ Dispositions) still land there, and until one lands the line reads
`none` per the blanket rule above, the first finding replacing it —
the same bytes a pass that ran and found nothing writes. The entry's
later sections are
untouched by a dropped pass; the review session fills the walkthrough, the
fitness answer, the where-to-look map and the tails as always.

`Fixes applied (--fix):` is its own following line — every applied fix
named, then the commits carrying them, or `none` — closing with
`· re-green: <result>` where fixes were applied: the per-tree green
re-run's outcome (the rule: → The lens pass). The clause is owed
exactly when there were fixes, so `none` carries none and the absence
stays unambiguous. `<result>` is bare where the fixes touched one tree —
`green`, or `red — F<n>` naming the finding the red became — and
tree-labelled, `·`-joined, where they touched several: `re-green: branch
green · suite red — F3`.

**The commit field is tree-marked, always, with no bare default** —
`branch <sha> · <tree> <sha…> · <tree> <sha…>`, the tokens and joins
`Unreviewed:` already uses: `branch` only where a branch exists, a
tree's refs space-joined, the trees `·`-joined, and no `@`, this being a
ref list rather than an anchor. A single-tree fix writes its token too
(`<tree> 49f2b15`), so no reader has to probe which tree a sha sits in —
`git -C <tree> show <sha>` reads straight off the line. A fix in a
state-folder file carries the token `state` and no sha, beside whatever
tree tokens the field already has: its commit is the running phase's
own state-folder commit, made after this line and found by topic ID in the
internal register; the fix list names the file as always. **This line is
where a pass's fix refs live durably** — their traceability store
(development-process § Process ground rules), written the moment the
fixes land by whichever operator ran the pass, on every close, and never
rewritten.

**`Refuted/skipped:` records the candidates the lens pass dropped** —
the ones its verify refuted and the ones its judgment skipped, each a
short name with a one-clause why and no locator. Two kind-groups carry
them, `·`-joined — `refuted — <name (why)>, … · skipped — <name (why)>,
…` — so the kind is written once however many candidates it covers, and a
group may take one shared why covering all its members (`skipped — below
the cap or churn bar: a, b, c`); a group with no members is absent
rather than empty, and the whole line reads `none` where the pass
dropped nothing. The line is **unconditional wherever the lens pass
ran** — the dropped pass is its one exemption — so its absence carries
information rather than ambiguity, the same reason `Unreviewed:` is
unconditional on its writers. It records a call already made, never an
agenda: dropping those candidates was the pass's decision (→ The lens
pass).

The coverage slot and the fix commits are what a later delta computes
from: the coverage anchor is the left edge of the branch range, and the
fix commits are recorded work no `Reviewed:` line names, so they stay in
the next subject by construction (→ The lens pass). Nothing computes
from the `re-green:` clause or from the `Refuted/skipped:` line — both
are record, for the operator and for whoever reads the entry.

Both halves of `Reviewed:` ride one line where both apply — `Reviewed:
branch @ <sha> · <tree> <sha> · <tree> <sha>` — which is how a
code-repo topic's machinery edits reach the next delta (topic kinds:
development-process § Topic
kinds). How the next iteration reads the two lines is computed once, at
§ The lens pass; nothing recomputes it here.

**The `Delta pass:` line** records the pass a **ship** close owes any
work no pass has seen — never ship unseen, and computable from the
record rather than remembered: everything recorded or edited **after the
entry's lens-pass coverage anchor**. That is the fix commits the pass
itself produced (the entry's fixes line names them, and on a code-repo
topic they also sit in the branch range above the anchor), the entry's
`Unreviewed:` refs where it has them (a ship following a wait close
reads that entry's line), and every edit made since — the decide-forward
that fires no close above all, and the implement→review gap's developer
edits with it. It
is a code-review run scoped to that diff, its **tier keyed first** — by
risk profile (charter: development-process, *Review effort*), before any
skill loads: an inline-read delta is read in-session and loads nothing,
the tier is the one risk profile derives and never one picked by hand,
the line carries `<tier>` and no roster, and the pass runs **without
`--fix`** — a delta finding goes to disposition like a walkthrough's,
because a ship never trusts a fix unseen — and the suite-or-gates re-run
rule stands beside it (→ Developer edits): where that rule fired, the
line closes with `· re-green: <result>`, spelled exactly as the fixes
line's clause is. Where it did not fire the line carries no clause, and
which it was stays derivable from the entry: the only subject content
that owes no re-run is the fixes line's own commits, their green
already on that line — anything in the subject beyond them is
post-pass work whose green never ran, so its presence owes the clause.
A delta pass's own refuted or skipped candidates go unrecorded,
deliberately: the line carries tier, subject, and re-green alone —
`Refuted/skipped:` is the lens pass's line, and nothing computes from
drops. Iterate and wait closes run nothing extra: their own commits
ride `Unreviewed:` and land in the next iteration's delta by
construction. Nothing uncovered, no line.

## Iterate — the re-entry close

**Three writers, one marker.** This close is one of them; implement's
drift-valve stop and plan-review's *needs a define session* branch are
the others, writing the same marker into this same file. Each owns its
own steps, and states them once (implement § Drift Valve;
plan-review § Steps, step 5).

A learning drop captured, or a Learning task minted, mid-session is
untouched by this exit: it carries its own evidence, so it needs no
line beside the marker.

A *mechanical* doubt does not contest the record — it is a finding, and
takes a disposition. Neither is a finding whose new decision the
developer has already made: that is **decide-forward**, executed in place
and firing no close at all (→ Dispositions).
