# Brainstorm: mechanics

The mechanics of the brainstorm skill: the Claude Code way of doing what `SKILL.md` describes, under the spine's own headings. Read a section's entries at the moment that section runs.

## Contents

- Overview: the topic directory and what brainstorm writes there
- Branch Intake: the rename, the sketch record from `<base>`, the light question
- Sketch Intake: reading a dirty tree, the intake gate, the sketch record
- Commit the Artifacts, Then Reset: the pipeline step, the commit, the reset hand-off, the verify

## Overview

**The topic directory** is `<state folder>/<repo>/YYYY/MM-DD-<topic>/`,
where `<repo>` is the checkout's directory name, or `meta` for a
cross-repo process topic (the operations contract, § Topic ID ↔ folder
mapping). The path is absolute and does not depend on the session's
cwd. Find it through the topic's task in the repo's Roadmap project
(*look up topic*, binding: the operations contract). Brainstorm writes
`brainstorm.md`, the direction doc, and, when a sketch exists,
`sketch.md`, the sketch record.

## Branch Intake

The user sketches on an ad-hoc branch, committing freely, then invokes
`/ymer:brainstorm` from it, and topic resolution has confirmed the
branch as part of the discovered set. On an iteration the `<base>`
below is the newest record-named commit rather than the merge base, and
only the commits after it are recorded (→ `SKILL.md` § Topic
Resolution, the iteration row).

1. **Rename: the session's first git, Claude-run.** Immediately after
   topic resolution confirms the topic name, align the branch to the
   bare topic slug (skip when the names already match):

   ```
   git branch -m <current-branch> <topic>
   git branch --show-current    # verify: <topic>
   ```

2. **Record the sketch in `sketch.md`** (read-only git). The `<base>` is
   `git merge-base main HEAD`, correct even when the branch forked from
   an older main, and on an iteration the newest commit the record names
   instead. Record, verbatim and uncurated:
   - the combined diff, `git diff <base>` (committed and uncommitted
     work in one view), plus untracked files read directly, since
     `git diff` does not show them;
   - the progression story, `git log --reverse <base>..HEAD` with full
     messages, under its own `## Progression story` heading;
   - the paths the sketch files live at.

   Sketch Intake step 4's rule applies unchanged: do not clean it up,
   summarize it, or fix it.

3. Ask one light question for the record: "Anything you were
   attempting, or unsure about, that the code doesn't show?" The answer
   goes into `sketch.md`. Skippable: intake is not an interview.

4. Treat the sketch as food for thought, and mine it into the direction
   doc during the session, as `SKILL.md` § Sketch Intake says.

## Sketch Intake

On a topic branch, § Branch Intake owns the sketch; this section covers
a dirty tree on main.

1. Check the working tree: `git status --porcelain` (read-only). If it
   is clean, skip to the interview.
2. If it is dirty, read everything: `git diff` (staged and unstaged)
   for tracked files, and read untracked files directly, since
   `git diff` does not show them.
3. Gate before going on: ask the user which of these holds.
   - **All of it is brainstorm input**, disposable, and reset away at
     the session's close by the reset hand-off (the usual answer).
   - **Some is real work to keep**: the user commits or stashes the
     keepers themselves, then you re-check the status and go on.
   - **None of it is input**: leave it untouched, don't mine it, and
     skip the reset hand-off at the close.

   Dirt that is plainly **not a sketch by inspection** (a lockfile or a
   dependency relock, a generated ledger, a tree unrelated to the topic)
   takes the third answer without the question: name it in the report,
   leave it untouched, and skip the gate and the reset hand-off.

   **Hold: the user's own commit or stash of the keepers** (the process
   contract, § Defaults and holds). Unattended at the gate's question,
   the session stops with nothing written, its report naming the gate:
   a dirty tree is never mined, reset, committed or stashed without the
   user's answer.
4. **Write the sketch record now**:
   `<state folder>/<repo>/YYYY/MM-DD-<topic>/sketch.md`, holding the raw
   diff, the full contents of untracked sketch files, and the paths the
   user wrote them at. Verbatim and uncurated: do not clean it up,
   summarize it, or fix it, since editing the record would erase the
   user's idioms, gaps and first instincts (the record's reader: the
   operations contract, § The topic's artifacts).
5. Ask one light question for the record: "Anything you were
   attempting, or unsure about, that the code doesn't show?" The answer
   goes into `sketch.md`. Skippable: intake is not an interview.
6. Treat the sketch as food for thought: the chosen direction may keep
   it, morph it, or discard it entirely.

## Commit the Artifacts, Then Reset

The next phase starts from a clean tree with the artifacts committed.
Skip the reset hand-off (step 3) where the intake gate chose "none of it
is input" or named the dirt as not a sketch by inspection, or on an
iteration where every commit on `main..HEAD` is one the record names:
branch intake did not run, and there is no floor to reset to. Steps 1
and 2 still run.

1. **Put the topic in the pipeline.** *Mint task* at `doing` where the
   topic has no task yet (binding: the operations contract), whichever
   session invented it; a drawn topic or a split child that has its task
   at `doing` under the topic's name needs no mint. Then record
   what the session itself found:
   - **Dependencies.** Each one the session discovered ("this cannot
     start until that ships") becomes an edge with its reason (*order
     topics*, binding: the operations contract): an order that lives
     only in chat is lost.
   - **The prerequisite check's outcomes.** A blocking gap's learning
     task is minted into the Learning project (the operations contract,
     § Binding per coordinator), with its edge and the edge's reason
     (*order topics*, binding: the operations contract). Each
     falling-behind gap is captured as a learning drop through the
     `ymer:capture` skill, source `brainstorm`.
   - **A split.** Where the settled direction splits the topic, run the
     split's moves (the operations contract, § Split topics), and write
     each child's line into the topic's `relations.md` once its task
     reads back (the operations contract, § The topic's artifacts); no
     child folder is created now. Where the topic's
     slug already names one of the children, shed siblings instead of
     retiring: the task and folder stay that child's, and the others are
     minted (the operations contract, § Split topics, the mid-pipeline
     form). Word the interview's question
     slug-neutrally ("three topics", never "retire + mint"): the slug
     was fixed at topic resolution, before the interview knew whether
     the topic is a parent.
   - **Rulings on another topic in flight.** A topic still `doing` that
     this session ruled on, by scoping or narrowing it, falsifying a
     claim it carries, or affirming it with re-measured evidence, is
     annotated in this close, the ruling as the evidence (*annotate
     task*, binding: the operations contract). That is the outward-write
     rule (the operations contract, § Operations — the whole vocabulary
     the skills may use), and a bare citation with no ruling writes
     nothing. The topic's own task is not among them (the operations
     contract, § Roadmap).
   - **Onboarding.** Onboard the repo per the binding (its Roadmap
     project and its `<repo>/` subtree) where this project is not in the
     state folder yet.

   Read back each operation whose call does not show its outcome (which
   ones: the operations contract, § Binding per coordinator). An
   operation whose required outcome did not happen stops the boundary
   (the failure rule: the operations contract, § Operations — the whole
   vocabulary the skills may use).

2. **Commit.** Where this session edited a machinery tree, commit each
   one first, as the process contract's § Topic kinds says, and record
   the ref in `brainstorm.md`. Where consolidation copied the doc into
   the `pre-image/` slot, remove its stamp,
   `pre-image/brainstorm.md.taken`, from the topic folder. Then commit
   the artifacts in the state folder, from any cwd, with absolute
   commands:

   ```
   git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
   git -C <state folder> commit -m "YYYY-MM-DD-<topic>: brainstorm" -- <repo>/YYYY/MM-DD-<topic>/
   ```

   Verify that it landed before handing over the reset:
   `git -C <state folder> status` no longer lists the topic's paths,
   while other paths may remain (the substrate contract, § Concurrent
   edits on a shared tree).

3. **Reset hand-off.** The destruction is the user's to run, via `!`.
   Hand over the commands and wait for the output.

   **Hold:** the reset never runs without the user. Absent input the
   phase closes around it and the terminal report lists it as a pending
   step with its commands written out (the process contract, § Defaults
   and holds). A pending reset blocks the phases that need clean state,
   so the successor's pre-flight re-reports it and stops.

   On a topic branch (branch intake ran), reset the branch to its floor:
   `main` normally, and on an iteration the newest commit the record
   names (→ `SKILL.md` § Topic Resolution, the iteration row):

   ```
   Preview: git diff <floor> --stat ; git clean -n   → what will be discarded
   Run:     git reset --hard <floor> && git clean -fd
   Verify:  git status   → clean, on <topic>
   ```

   Branchless (a working-tree sketch):

   ```
   Preview: git status ; git clean -n   → what will be discarded
   Run:     git reset --hard && git clean -fd
   Verify:  git status   → clean, on main
   ```

4. Confirm the verify output when it arrives: a clean tree, the
   artifacts in history. On a topic branch the branch now sits exactly
   at the floor the hand-off named, so the next phase opens on clean
   state; the sketch survives in `sketch.md` (and the reflog).
