# Review — mechanics

The mechanics of the review skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Input

**Topic directory:** `<state folder>/<repo>/YYYY/MM-DD-<topic>/` — in
the state folder; `<repo>` is the checkout's directory name,
or `meta` for a cross-repo process topic. The path is
absolute: it does not depend on the session's cwd. Find the directory
via the topic's task (*look up topic* — binding: the operations contract).

## The lens pass

On a code-repo topic the branch half reads as a range instead:
`<sha>..HEAD` from the newest entry's `Reviewed: branch @ <sha>`, read
**first-parent, merges excluded** — `git log -p --first-parent
--no-merges <sha>..HEAD` — because an iteration's pre-flight catch-up
leaves a merge from main inside the range, and a two-dot diff across it
counts main's shipped commits as this topic's delta. Where that merge
resolved conflicts, `git show <merge sha>` — the ref the record names:
plan.md's fact sheet, `implemented.md`, or the finding left where a red
re-green stopped a ship close (→ Phase Close, ship step 2) — joins the
subject, and so does that record's resolution note: a merge's combined
diff shows only what differs from both parents — the resolution's own
writing — and nothing where a side was taken whole, which is how a
topic's own change can leave every diff unseen. Plus the branch's
working tree — the developer's edits since the last close, which no pass
has certified and which this session's own close commits. The whole
increment stays context; the delta is the subject,
and findings an earlier entry disposed stay disposed.

Applied fixes land in the tree that holds the file each one fixes — the
branch for the project's files, each machinery tree for its own files
(one machinery tree or several), on either
topic kind (topic kinds: development-process § Topic kinds) — and then
**ride their own commit(s), never the tree**: one commit per tree the
fixes touched, public register, **its ref onto this entry's `Fixes
applied (--fix):` line and onto no other store** — the traceability
store for a pass's fix commits, whichever operator ran the pass and
whichever close follows (development-process § Process ground rules; the
line's tree-marked grammar: → The Close). Work a pass covered and work
no pass has seen never share a ref — the certification arithmetic is
built on that separation — and nothing machine-authored is left
uncommitted across the gap to the review sitting. The one fix that
rides no commit of its own is one in a state-folder file: it lands on the
running phase's own state-folder commit, and the line marks it with the token
`state` (grammar: → The Close).

## Prep — building the walkthrough

**Calibration pass — read the developer's knowledge docs.** The subjects
a topic touches are **derived, not guessed**: match the topic's
artifacts — the plan's tools, technologies, file kinds, and process
areas — against the subject rows of the subject index
(`tutor_subjects` in the Ymer Node, read with the node's `notebook`
`query` through the door tutor's guard names), and take every row
the artifacts name. Fetch each matched subject's knowledge doc from ymer (handles in that
same table). The docs record what the developer has provenly learned: a
**checked** entry is known, so assume it rather than teaching it; an
**unchecked** entry is shaky, so expose the point and expect the
questions to land there. A subject the artifacts name with no row at
all is the same signal as an unchecked doc. Two bounds: subjects are
technologies, not this codebase — the docs calibrate a stop's general
layer and are silent on the repo-specific layer where most stops live;
and an empty index — a fresh install has no rows, and a node without
the index's tables, or no node at all, reads as one — runs the walkthrough
uncalibrated and says so in the `Calibration` tail. Docs unreachable →
the fallback rule (*Defaults and holds*: development-process): retry
while the session runs, and meanwhile calibrate from the artifacts
alone, an unread doc counting exactly as an unchecked one; a doc that
never lands before the close is named in the `Calibration` tail —
reported, never silent. Where the developer declared the **rulings-only
lane** (→ The Open) before Prep ran, this pass does not run at all — its
whole product is stop exposition, which the lane drops — and the
`Calibration` tail says so (→ The Close).

## Phase Close — three closes

One continuous execution, state changes before announcements (*Defaults
and holds*: development-process). **Every close commits every tree this
session changed** and writes the record; only the ship close touches the
project repo's main. In the **project checkout** that is exactly one
commit per close — `git add -A` on the topic branch, public register:
everything this session changed there, a disposition landed at a stop or
a fix applied during the walkthrough alike, is a developer edit by this
phase's own definition (→ Developer edits) and folds together, so no close
has to rule on whose commit wins. Separate fix commits exist only at
implement's close, where its step 1 has already emptied the tree before
the lens pass runs.
**Where this session left machinery edits uncommitted** — in the
any machinery tree; the developer's, a decide-forward's
amendment, or both; a fallback pass's own fixes were committed when they
landed (→ The lens pass) — **every close** commits them before its state-folder
commit (the machinery commit: per tree, scoped `add <files>` *and* the same
pathspec on the commit, never `-A`, or by hunk where the file also carries
a foreign edit — recipe: the substrate contract; public register), whatever
the topic's kind; why that is a duty rather than a convenience is the charter's
(development-process § Topic kinds). Ship's
ref joins the ship section; on an iterate or wait close every ref this
session committed and no pass covered — the close's own project-checkout
commit — rides the `Unreviewed:` line in the open `## Review` entry,
never `Reviewed:`, which certifies what a pass covered, and never a
fallback pass's own fixes, whose commits the same entry's fixes line
already holds (→ The Close).
Which close runs is read off the dispositions and the fitness answer — a
blocking lift-out → wait; a substantive in-scope iteration whose decision
is still open → iterate; otherwise → ship. A decide-forward disposition
selects nothing: it fires no close.

1. **Fold developer edits into the branch** (Claude-run; public
   register — imperative subject, no topic IDs or phase names). Assert
   first that no merge is in progress: a half-merged tree never crosses a
   boundary (the substrate contract), so one found here means the tree is
   already outside the rules — ask, run nothing.

   ```
   git branch --show-current              # assert: <topic> — anything else → stop (Input 1's precondition)
   git rev-parse -q --verify MERGE_HEAD   # assert: no output, exit 1 — output → stop and ask
   git status --short                     # nothing listed → nothing to commit, skip the next line
   git add -A && git commit -m "<imperative subject ≈50 chars>"
   git status    # verify: clean, on <topic>
   ```

   `git add -A` is the whole of it: a project checkout is read and
   committed whole (the substrate contract), and every path in it is this
   topic's by construction.

2. **Squash-merge to main** (Claude-run; public register — optional
   concise changelog-style body via `-F <file>`):

   ```
   git merge --no-edit main           # catch-up on the branch: main may have moved
   git log main..<topic> --oneline    # preview: the commits being squashed
   <project test suite>               # only where the merge moved the branch — on red, stop here (the red rule below): the squash never runs
   git switch main && git merge --squash <topic> && git commit -m "<imperative subject>"
   git log --oneline -1               # verify: shows the subject just committed (ref → review.md)
   ```

   The branch caught up with main at implement's pre-flight, but review
   is a later session — another topic may have shipped to main since.
   The catch-up merge is where any conflict surfaces: on the branch,
   where resolving is ordinary merge work and main is untouched; once
   the branch contains main, the squash itself cannot conflict. Step 1
   emptied the tree, so the outcomes are exactly four — fast-forward,
   merge commit, already up to date, conflict; anything else is a state
   no written rule names: ask, run nothing (**git is never guessed**:
   the substrate contract). Where the outcome moved the branch —
   `fast-forward` or `merge <sha>` — the tree the suite last blessed has
   changed: run the branch green once more before the squash, the
   project's test suite over the one tree this merge can touch (per-tree
   mechanics: → Developer edits); its result rides step 3's `Catch-up:`
   line. An **ordinary** conflict — disjoint hunks in one file, changes
   that compose, one side a pure superset of the other — is resolved on
   the branch, Claude-run, and the merge concluded. A conflict that would
   **remake a recorded decision** is the user's to settle: ask before
   anything runs, and where telling the two kinds apart is not clear,
   that is itself a question rather than a guess. **Default: absent the
   answer by the close, `git merge --abort` — it restores the pre-merge
   tip and destroys nothing — and the close re-derives into an iterate
   close before main is touched: the open `## Review` entry gains the
   conflict as a finding with its disposition, then the iterate close's
   marker and ref lines, step 1's fold riding `Unreviewed:`. Nothing
   irreversible has run — review post-hoc at `review.md`** (*Defaults and
   holds*: development-process). **A red at that run is the same
   stop**, and takes that default whole, its abort aside: main
   untouched, the close re-derived into an iterate close before it is
   touched. The merge stays on the branch — it has concluded, so
   there is no merge to abort, and it contains main, which the next
   pre-flight reads as already up to date. The finding it becomes
   names the merge ref, the resolution note where one arose, and the
   failing check. A red never reaches the ship section. Where the
   merge lands, its outcome is recorded on the ship section's own
   `Catch-up:` line, with the merge ref and the resolution note where
   one arose (→ The Close) — the one catch-up no lens pass covers. The
   verify line is a guard, not a formality: its subject
   must be the one the commit just wrote — any other subject means the
   chain short-circuited before `git commit`, and the SHA on screen is
   an earlier commit's; stop and resolve, never record it.

   A fifth outcome belongs to the preview, not the merge: `git log
   main..<topic>` empty — a branch that carries no commits by design, a
   topic whose increment ran against live installs or landed in
   machinery trees alone — runs no squash and no suite. The ship
   section's line reads `Squash: none`, the branch is deleted where
   every ship deletes it, and the close continues; the empty preview is
   that outcome's verify, and the chain above is never started.

3. **Prepend the ship section** to `review.md` — `## Shipped —
   <date>` with, where the topic has a branch, the squash ref and step
   2's catch-up outcome on its own `Catch-up:` line, carrying its
   `re-green:` clause where that outcome moved the branch — a meta topic
   runs neither — then the branch deletion, the task close, and each
   pending push. The `Machinery
   commits:` line is **additive, never an alternative**: it names every
   machinery ref this increment carries, marked per tree — every
   traceability store the charter's machinery-traceability ground rule
   names, this close's own commit among them — so a code-repo topic
   whose session edited machinery carries both lines. It does not
   enumerate the stores, deliberately: a subset written here is the
   subset a facilitator copies, and the operative rule is *every* ref.
   A meta topic has no squash ref; one that made no machinery diff
   carries no refs line at all.
4. **Close the topic's task** (*ship topic* — binding: the operations
   contract): closed as completed, its result naming the topic ID. The
   call's return carries the task's status after it — read that; a
   required outcome that did not happen stops the boundary, never
   skipped silently.
5. **Commit the phase's writes** in the state folder, pathspec-scoped
   (concurrent sessions leave staged work a bare commit would sweep
   in). The state folder is a **shared tree** like every machinery
   tree, and its commit is keyed the same way — **scoped to what
   this topic wrote in it**: the topic folder, which every phase writes,
   **plus each file outside that folder the plan names or this session
   edited**. The plan's names are read off its `payloads/manifest` rows
   and each task's `Files:` rows. The session's own edits are
   load-bearing here and not a symmetry flourish: a lens-pass fix or a
   disposition's ripple reaches a state-folder root file with no manifest
   row behind it, the same session-level fact the machinery commit
   already keys on (contract: the substrate contract,
   "Stage by explicit path only").
   A topic that wrote nothing outside its folder commits the folder
   alone.

   ```
   git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/ <each such file>
   git -C <state folder> commit -m "YYYY-MM-DD-<topic>: review" \
       -- <repo>/YYYY/MM-DD-<topic>/ <each such file>
   ```

   Both halves carry the same pathspec, never `-A`. Where such a file
   also carries a foreign edit the commit becomes a **composite**: stage
   the topic folder and each such file carrying no foreign edit, then
   per mixed file cut this session's own hunks from an unstaged
   `git -C <state folder> diff -U0 -- <the mixed file>` (reset the file
   out of the index first if it is already staged) into a hand-written
   patch — the hunks you keep, never the whole diff redirected — and
   apply it with `git -C <state folder> apply --cached --unidiff-zero`,
   assert `git -C <state folder> diff --cached --stat` names the topic
   folder and each such file alone — a concurrent session's
   already-staged path there is a stop, not a skip — then commit with
   **no** pathspec, the one shape that does not sweep a foreign hunk in
   (recipe: the substrate contract).

   Verify **on the same list**, never on the topic folder alone — a check
   keyed like the old folder-only step is blind to exactly the omission
   this keying exists to prevent:

   ```
   git -C <state folder> status --short -- <repo>/YYYY/MM-DD-<topic>/ <each such file>
   ```

   Expect no output for the topic folder and for every named file
   committed on the plain path. A file committed through the composite
   is the one exception: it still carries the foreign hunk this close
   deliberately left uncommitted, so one ` M ` row per such file is the
   correct outcome, not a stop — assert it positively, that
   `git -C <state folder> diff -- <the mixed file>` shows the foreign
   hunk and none of this session's own edits, and never re-stage or
   re-commit the file to silence the row. Foreign dirty paths
   elsewhere, outside this pathspec, stay listed by an unscoped
   `status` and are not a stop either — other topics' in-flight work,
   leave them (concurrent edits: the substrate contract).
6. **Delete the branch** (Claude-run; `-D` is expected: git considers a
   squash-merged branch unmerged):

   ```
   git branch -D <topic>
   git branch --list <topic>    # verify: empty
   ```

7. **Capture block:** invoke the `ymer:capture` skill — source
   `review`. The battery, the drop grammar and the write live in that
   skill alone.
