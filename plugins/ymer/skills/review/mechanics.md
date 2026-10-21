# Review: mechanics

The mechanics of the review skill: the Claude Code way of doing what `SKILL.md` describes, under the spine's own headings. Read a section's entries at the moment that section runs.

## Contents

- Input: the topic directory, whether implement has run, the increment, the branch precondition
- The lens pass: the branch half of the delta, the fix commits
- Prep — building the walkthrough: the calibration pass
- Phase Close — three closes: the commit each close makes, then ship steps 1 to 7

## Input

**The topic directory** is `<state folder>/<repo>/YYYY/MM-DD-<topic>/`,
where `<repo>` is the checkout's directory name, or `meta` for a
cross-repo process topic (the operations contract, § Topic ID ↔ folder
mapping). The path is absolute and does not depend on the session's
cwd. Find it through the topic's task (*look up topic*, binding: the
operations contract).

**Whether implement has run at all** is read from the state folder,
by its kind:

- Where the state folder is its own git repository, from implement's
  phase commit over the topic folder:

  ```
  git -C <state folder> log --oneline --grep '<topic ID>: implement' -- <repo>/YYYY/MM-DD-<topic>/
  ```

  Empty means implement has never run.
- Where the files are the record, from `plan.md`'s ticks: no ticked box
  (`- [x]`) means implement has never run, since only an implement that
  ran ticks a box.

Either reading, where it finds no run, stops the session and names
**implement**, unless `review.md` carries an `Iteration —` marker on top
(→ `cases.md` § Input and § Recognizers).

**The increment** on a code-repo topic is the branch's own commits, read
**first-parent, merges excluded**, as a patch series rather than a net
diff:

```
git log -p --first-parent --no-merges main..<topic>
```

`git show <merge sha>` and the record's resolution note join it for
every catch-up merge that resolved conflicts (→ § The lens pass, below,
for why both are needed), and so does the branch's working tree. Where
the session's machinery edits are part of the increment, each machinery
commit the record names joins too, read per tree, one `git -C <tree>
show <ref>` per ref, plus that tree's working tree. On a meta topic they
are the whole of it.

**The branch precondition**, before this session writes to any tree:

```
git branch --show-current    # prints <topic>: the precondition holds
git worktree list            # another worktree holds <topic>: run every project-repo command there
git switch <topic>           # otherwise
```

Neither the current branch, a worktree nor the switch lands `<topic>`
→ stop and report. Every write this session makes to the project's tree
lands in the cwd's checkout: a fallback pass's fixes, the developer's
edits at a stop, a decide-forward's amendment. A wrong checkout writes
them to the wrong branch.

## The lens pass

**The branch half of the delta.** On a code-repo topic the branch half
reads as a range, `<sha>..HEAD` from the newest entry's `Reviewed:
branch @ <sha>`, read **first-parent, merges excluded**:

```
git log -p --first-parent --no-merges <sha>..HEAD
```

An iteration's pre-flight catch-up leaves a merge from main inside the
range, and a two-dot diff across it counts main's shipped commits as
this topic's delta. Where that merge resolved conflicts, `git show
<merge sha>` joins the subject, with the ref taken from the record that
names it (`plan.md`'s fact sheet, `implemented.md`, or the finding left
where a red re-green stopped a ship close: → § Phase Close, ship step
2), and so does that record's resolution note. A merge's combined diff
shows only what differs from both parents, the resolution's own writing,
and nothing where a side was taken whole, which is how a topic's own
change can leave every diff unseen. Add the branch's working tree: the
developer's edits since the last close, which no pass has certified and
which this session's own close commits. The whole increment stays
context; the delta is the subject, and findings an earlier entry
disposed stay disposed.

**Implement's fix commits**, one per tree the fixes touched, each in
the tree that holds the files it fixes, in the public register:

```
git -C <tree> add <the fixed files>
git -C <tree> commit -m "<imperative subject ≈50 chars>" -- <the fixed files>
git -C <tree> log --oneline -1    # the ref, onto the fixes line
```

On the branch the tree is the project checkout, staged whole
(`git add -A`) since the commit at implement's close emptied it (the
implement skill, § Phase Close). A machinery
tree is staged by explicit path, and by hunk where a fixed file also
carries another session's edit (the substrate contract, § Committing by
hunk). A fallback pass at review runs none of these: its fixes fold into
the close's commit (→ § Phase Close).

## Prep — building the walkthrough

**The calibration pass.** The subjects a topic touches are **derived,
not guessed**: match the topic's artifacts (the plan's tools,
technologies, file kinds and process areas) against the subject rows of
the subject index (`tutor_subjects` in the Ymer Node, read with the
node's `notebook` `query`; tutor's § First, the stores says which node
that is), and take every row the artifacts name. Fetch each matched
subject's knowledge doc from ymer, by the handle in that same table.

The docs record what the developer has provenly learned. A **checked**
entry is known: assume it rather than teaching it. An **unchecked**
entry is shaky: expose the point and expect the questions to land
there. A subject the artifacts name with no row at all is the same
signal as an unchecked doc. Subjects are technologies, not this
codebase: the docs calibrate a stop's general layer and are silent on
the repo-specific layer where most stops live.

An empty index (a fresh install has no rows, and a node without the
index's tables, or no node at all, reads as one) runs the walkthrough
uncalibrated and says so in the `Calibration` tail. A doc that does not
answer falls under the fallback rule (the process contract, § Defaults
and holds): retry while the session runs, calibrate meanwhile from the
artifacts alone, an unread doc counting exactly as an unchecked one, and
name a doc that never lands in the `Calibration` tail. Where the
developer declared the rulings-only lane before Prep ran, this pass does
not run at all, since its whole product is stop exposition, and the
`Calibration` tail says so.

## Phase Close — three closes

**The commit each close makes.** In the **project checkout** that is
exactly one commit per close, `git add -A` on the topic branch, public
register (step 1). Everything this session changed there, a disposition
landed at a stop or a fallback pass's fix alike, is a developer edit and
folds together, so no close has to rule on whose commit wins.

**Machinery edits this session left uncommitted**, the developer's, a
decide-forward's amendment or a fallback pass's fixes, are committed by
**every close** before its state-folder commit, per tree, staged by
explicit path on both halves, or by hunk where a file also carries
another session's edit (the substrate contract, § Stage by explicit path
only and § Committing by hunk), whatever the topic's kind:

```
git -C <tree> add <each file this session edited>
git -C <tree> commit -m "<imperative subject ≈50 chars>" -- <each file this session edited>
git -C <tree> log --oneline -1    # the ref
```

The ship close's machinery refs join the ship section. On an iterate or
wait close, every ref this session committed rides the `Unreviewed:`
line in the open `## Review` entry, never `Reviewed:`; implement's
pre-executed fix commits stay on the fixes line, their one store.

1. **Fold developer edits into the branch.** Assert first that no merge
   is in progress: one found here means the tree is already outside the
   rules, so ask and run nothing (the substrate contract, § Git is never
   guessed).

   ```
   git branch --show-current              # assert: <topic>; anything else → stop (Input's branch precondition)
   git rev-parse -q --verify MERGE_HEAD   # assert: no output, exit 1; output → stop and ask
   git status --short                     # nothing listed → nothing to commit, skip the next line
   git add -A && git commit -m "<imperative subject ≈50 chars>"
   git status    # verify: clean, on <topic>
   ```

   `git add -A` is the whole of it: every path in a project checkout is
   this topic's by construction (the substrate contract, § Tree
   options).

2. **Squash-merge to main**, with an optional concise changelog-style
   body through `-F <file>`:

   ```
   git merge --no-edit main           # catch-up on the branch: main may have moved
   git log main..<topic> --oneline    # preview: the commits being squashed
   <project test suite>               # only where the merge moved the branch; on red, stop here: the squash never runs
   git switch main && git merge --squash <topic> && git commit -m "<imperative subject>"
   git log --oneline -1               # verify: shows the subject just committed (ref → review.md)
   ```

   The branch caught up with main at implement's pre-flight, but review
   is a later session, and another topic may have shipped since. The
   catch-up merge is where any conflict surfaces: on the branch, where
   resolving is ordinary merge work and main is untouched; once the
   branch contains main, the squash cannot conflict. Step 1 emptied the
   tree, so the outcomes are exactly four: fast-forward, merge commit,
   already up to date, conflict. Anything else is a state no written
   rule names: ask, run nothing.

   Where the outcome moved the branch (`fast-forward` or `merge <sha>`),
   the tree the suite last blessed has changed: **re-green** the branch
   once more before the squash, the project's test suite over the one
   tree this merge can touch. Its result rides step 3's `Catch-up:`
   line.

   A conflict is classed and asked as the substrate contract's
   § Project checkout says. **Default: absent the answer by the close,
   `git merge --abort`, which restores the pre-merge tip and destroys
   nothing, and the close re-derives into an iterate close before main
   is touched: the open `## Review` entry gains the conflict as a
   finding with its disposition, then the iterate close's marker and ref
   lines, step 1's fold riding `Unreviewed:`. Nothing irreversible has
   run. Review post-hoc at `review.md`** (the process contract,
   § Defaults and holds).

   **A red at the re-green is the same stop** and takes that default
   whole, the abort aside: main untouched, the close re-derived into an
   iterate close. The merge stays on the branch: it has concluded, so
   there is nothing to abort, and it contains main, which the next
   pre-flight reads as already up to date. The finding it becomes names
   the merge ref, the resolution note where one arose, and the failing
   check. A red never reaches the ship section. Where the merge lands,
   its outcome is recorded on the ship section's own `Catch-up:` line,
   with the merge ref and the resolution note where one arose: the one
   catch-up no lens pass covers.

   The verify line is a guard, not a formality: its subject must be the
   one the commit just wrote. Any other subject means the chain
   short-circuited before `git commit`, and the sha on screen is an
   earlier commit's: stop and resolve, never record it.

   A fifth outcome belongs to the preview: `git log main..<topic>`
   empty, a branch that carries no commits by design (a topic whose
   increment ran against live installs or landed in machinery trees
   alone). It runs no squash and no suite. The ship section reads
   `Squash: none`, the branch is deleted where every ship deletes it,
   and the close continues; the empty preview is that outcome's verify,
   and the chain above is never started.

3. **Prepend the ship section** to `review.md`: `## Shipped — <date>`
   with, where the topic has a branch, the squash ref and step 2's
   outcome on its own `Catch-up:` line, carrying its `re-green:` clause
   where that outcome moved the branch (a meta topic runs neither); then
   the branch deletion, the task close, and each pending push. The
   `Machinery commits:` line is **additive, never an alternative**: it
   names every machinery ref this increment carries, marked per tree,
   from every traceability store (the process contract, § The
   traceability stores), this close's own commit among them. So a
   code-repo topic whose session edited machinery carries both lines. It
   does not enumerate the stores, deliberately: a subset written here is
   the subset a facilitator copies, and the rule is *every* ref. A meta
   topic has no squash ref, and one that made no machinery diff carries
   no refs line at all.
4. **Close the topic's task** (*ship topic*, binding: the operations
   contract): closed as completed, its result naming the topic ID,
   copied from the topic folder's name (the operations contract, § Topic
   ID ↔ folder mapping), never composed from the ship date. The
   call's return carries the task's status after it: read that. A
   required outcome that did not happen stops the boundary, never
   skipped silently.
5. **Commit the phase's writes** in the state folder, pathspec-scoped
   on both halves. The commit is **scoped to what this topic wrote in
   the state folder**: the topic folder, which every phase writes,
   **plus each file outside that folder the plan names or this session
   edited**. The plan's names are read off its `payloads/manifest` rows
   and each task's `Files:` rows. The session's own edits matter here: a
   lens-pass fix or a disposition's ripple can reach a state-folder file
   with no manifest row behind it. A topic that wrote nothing outside
   its folder commits the folder alone.

   ```
   git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/ <each such file>
   git -C <state folder> commit -m "YYYY-MM-DD-<topic>: review" \
       -- <repo>/YYYY/MM-DD-<topic>/ <each such file>
   ```

   Where such a file also carries another session's edit, commit it by
   hunk (the substrate contract, § Committing by hunk), in the state
   folder, with the topic folder and every file carrying no foreign edit
   staged whole beside this session's own hunks, then commit with **no**
   pathspec, never the block's form: a pathspec commits the mixed file
   whole, the foreign hunk with it.

   Verify **on the same list**, never on the topic folder alone: a check
   keyed to the folder alone is blind to exactly the omission this
   keying exists to prevent.

   ```
   git -C <state folder> status --short -- <repo>/YYYY/MM-DD-<topic>/ <each such file>
   ```

   Expect no output for the topic folder and for every file committed on
   the plain path. A file committed by hunk keeps one ` M ` row, the
   right outcome, asserted as the substrate contract's § Committing by
   hunk says. Foreign dirty paths outside this pathspec are not a stop
   (the substrate contract, § Concurrent edits on a shared tree).
6. **Delete the branch** (`-D` is expected: git considers a
   squash-merged branch unmerged):

   ```
   git branch -D <topic>
   git branch --list <topic>    # verify: empty
   ```

7. **Capture block:** invoke the `ymer:capture` skill, source `review`.
   The battery, the drop grammar and the write live in that skill alone.
