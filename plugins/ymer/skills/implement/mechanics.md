# Implementing — mechanics

The mechanics of the implement skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Overview

**Topic directory:** `<state folder>/<repo>/YYYY/MM-DD-<topic>/` — in the
state folder; `<repo>` is the checkout's directory name, or
`meta` for cross-repo process topics, which have no project checkout of
their own; the topic ID stays `YYYY-MM-DD-<topic>`, its folder splits
the ID after the year. The path is absolute: it does not depend on the
session's cwd. The phase reads `plan.md` and ticks its checkboxes in
place. Reuse the
directory an earlier phase created (find it via the topic's task in the
repo's Roadmap project — *look up topic*, binding: the operations contract; the
date prefix is the first phase's date).

## Readiness Gate

Run these checks before writing any code — they are this phase's
**pre-flight** (plugin glossary). First derive the predecessor's close
state and any pending steps from durable state; finish an unfinished
close from its first missing outcome; re-report each pending step with
its command, and stop only when the work depends on one
(*Defaults and holds*: development-process). Then:

1. **The plan exists.** No `plan.md` in the topic directory → stop and name
   **write-plan**; this session is premature.
2. **This session is the phase due, and its plan is the reviewed one.**
   Two reads, in this order, and the order is load-bearing: a live
   marker naming another phase coexists with a `plan.md` (item 1
   passes) and with a `Hardened —` line (the hardened read below
   passes), so only the marker read catches it.

   **First, marker liveness.** Read `review.md`'s first recognizer
   top-down (review § Recognizers). An `Iteration —` marker on top is
   **live** while its block holds no `Consumed —` line; the block, the
   line's grammar, who writes it and which phase it makes due are
   review § Input item 2's. A live marker naming **another phase** →
   stop and name that phase. A live marker naming **implement** → this
   session is that re-entry, and its close consumes the marker (Phase
   Close, step 3); go on to the hardened read. A consumed marker → read
   the phase it makes due. **Implement** due, or a last line
   `by implement` → go on to the hardened read. Any other phase due →
   stop and name it: the route has not reached implement, and a
   `Hardened —` line left from before the iteration says nothing about
   the route since. A `## Review` entry, a `## Shipped` section, or no
   `review.md` at all → go on to the hardened read as well. This is a
   marker read and nothing more: no task status and no folder read
   happen here, so it is not topic resolution.

   **Then, the hardened read.** plan-review's only mark on the path to
   implement is the `Hardened — <YYYY-MM-DD>` line it writes directly
   under `plan.md`'s title as the last step of its rewrite, and a
   re-plan never carries that line over, so a plan changed after its
   review carries none (roadmap contract: the operations contract,
   Status ladder). Read the head of `plan.md`, on any kind of state
   folder. The line present → hardened; proceed. Absent → the plan in
   front of this session is not the plan that was reviewed, or was never
   reviewed at all: **stop and name plan-review**, the same shape as
   item 1's stop — the state names the missing phase, so there is
   nothing to ask. A plan reviewed before plan-review wrote the line
   carries none either, and reads the same way: plan-review runs again,
   the safe side.
3. **The trees are ready.** **Which trees this gate reads is keyed on the
   plan's target paths — never on topic kind**: the paths its
   `payloads/manifest` names, plus any target its steps name. *How* each
   is read is keyed on the tree's option (the substrate contract).

   A **project checkout** is read whole (`git status`), because the close
   there commits `git add -A` on the branch and any dirt would ride it.
   Dirt is not a stop here and asks nothing: gate #4's pre-flight stashes
   it, names the entry in the report, and leaves it for the user to pop.

   A **shared tree** — each machinery tree, and the state folder — is
   read **scoped to this plan's targets in that tree**:

   ```
   git -C <tree> status --short -- <each target in that machinery tree>
   git -C <state folder> status --short -- <each target in the state folder>
   ```

   because every close there commits pathspec-scoped, never `add -A`, so
   foreign dirt in other files cannot ride along and is never a stop
   condition — a machinery tree in particular routinely carries unrelated
   work and the user's own hand edits, none of it this gate's
   business. Only files the plan names are targets — never the topic
   folder itself, which every phase writes. A plan that names no target in
   a tree reads that tree not at all: never run a scoped command with an
   empty pathspec, which reads the whole tree and reinstates the over-fire
   this keying exists to kill. A target the drift valve adds mid-session
   takes the same per-file check the moment it is added, in whichever
   scoped tree it lands (→ Drift Valve).

   A dirty **target** in a shared tree is the one ask this gate still
   makes: only the user can tell a concurrent session's in-flight edit
   from their own. Theirs → proceed, and the close commits that file by
   hunk (recipe: the substrate contract). A concurrent session's → wait
   for its commit. **Hold: the concurrent session's own commit.** Absent
   the user's input this gate surfaces and stops; foreign uncommitted work
   is never reset, stashed, committed, or planned around (*Defaults and
   holds*: development-process).
4. **The project-checkout pre-flight** (code-repo topics; a meta topic has
   no branch — skip it and run shared-tree rules only; topic kinds:
   development-process § Topic kinds). Run it as the substrate contract
   states it, Claude-run, in this order:

   ```
   git switch <topic>              # or `switch -c <topic> main` when the
                                   # branch does not exist yet
   git branch --show-current       # assert: <topic> — anything else, a
                                   # refused switch included → stop, ask
   git log main..HEAD --oneline    # own commits — read them per below
   git status --short              # dirty → stash it, next command
   git stash push -u -m "<topic> implement <YYYY-MM-DD>"
   git log ..main --oneline        # what main gained
   git merge --no-edit main        # catch-up on the clean tree
   git log ..main --oneline        # verify: empty — non-empty means
                                   # the merge did not land; read on,
                                   # never reset
   ```

   **Read `git log main..HEAD` before anything else runs.** Its commits
   are this topic's pipeline commits when the record names them — the
   task commits and phase commits `implemented.md` and `review.md` carry,
   a lens pass's fix commits from a `## Review` entry's fixes line,
   define's project-glossary commit from `spec.md`'s glossary delta,
   write-plan's own catch-up merge among them — and the user's sketch
   where the pre-flight reported brainstorm's branch reset still pending.
   Step 1's derivation settles the sketch case before this log is read, so
   what remains is one question with a written answer: is every commit
   here a ref the record names? Sketch commits → **stop before the stash**
   and re-report the pending reset (*Defaults and holds*:
   development-process): merging the sketch makes it this topic's and the
   ship squash carries it into main, and a reset run afterwards would
   discard a merge of main along with it.

   **The stash is unconditional on a dirty tree and asks nothing.** The
   entry is named in the terminal report, `git stash list` is its record,
   and the entries are the user's alone to pop. Where the dirt is
   recognisably this topic's own torn fragment — the current task's boxes
   unticked and the branch's commits ending at the previous task that
   wrote files, a verification-only task having committed nothing and
   taken the one before it as its boundary — the report says so, so the
   user knows the entry is safe to drop; work then resumes at the plan's
   first unticked box, which is always a task boundary (→ Execution).

   **The catch-up has exactly four outcomes** — fast-forward, merge
   commit, already up to date, conflict — and git's dirty-tree refusals,
   tracked and untracked alike, are unreachable after the stash. Anything
   else, a refusal after the stash included, is a state no written rule
   names: ask, run nothing (**git is never guessed**: the substrate
   § Git). Record what this gate found — own commits, main's delta, the
   stash entry, the catch-up's outcome — for `implemented.md` (close step
   4). The same merge the ship close runs before its squash (review
   § Phase Close, ship step 2). An **ordinary** conflict — disjoint hunks
   in one file, changes that compose, one side a pure superset of the
   other — is resolved on the branch, Claude-run, the resolution and the
   merge ref recorded there. A conflict that would **remake a recorded
   decision** — the record does not say which side wins — is a
   contested-record finding and the user's to settle: ask before anything
   runs, and where telling the two kinds apart is not clear, that is
   itself a question rather than a guess. **Default: absent the answer by
   the close, `git merge --abort` — it restores the pre-merge tip and
   destroys nothing — record the conflict (the paths, the decision,
   main's ref) and stop through the drift valve, naming the phase that
   owns the decision — review post-hoc at `review.md`'s marker**
   (*Defaults and holds*: development-process).

5. **The baseline is measured.** The plan's own whole-tree verification
   command — the one its last task names (`mix test`, the precommit
   alias) — runs once here, after gate #4's catch-up and before the
   first edit, and its result is the session's inherited baseline: a
   red start is handed back in the opening message, never discovered at
   the last task, and the final run reads as a delta against a measured
   start rather than a bare pass/fail. A red the plan's fact sheet
   already names is the expected baseline; one it does not is a finding
   for the opening message, and the plan's `Expected:` lines are read
   against it. A plan naming no whole-tree command runs none.

## Execution

- **A task ends at a commit, and its boxes tick there.** On a code-repo
  topic, when a task's last verification has passed, commit that task's
  work on the topic branch — Claude-run, public register, an imperative
  subject drawn from the task's title and never its number, which is a
  workflow-internal reference:

  ```
  git rev-parse -q --verify MERGE_HEAD   # assert: no output, exit 1 — output → stop and ask
  git status --short          # nothing listed → nothing to commit, skip the next line
  git add -A && git commit -m "<imperative subject ≈50 chars>"
  git log --oneline -1        # the task's commit if one landed (ref → implemented.md)
  ```

  **A box is ticked only after its verification actually ran and passed
  and its bytes are on the branch** — the task's boxes tick together, the
  moment its commit lands. A task that writes no file in the checkout — a
  verification-only task, whose `Files:` row names none, or one whose
  files all sit in shared trees, never stashed, committed at the
  close — has no bytes to
  land here: its boxes tick on its last passing verification alone, its
  boundary is the previous task's commit, and there is nothing at risk,
  because the tick lives in `plan.md` in the state folder and this
  checkout holds nothing a later pre-flight could bury. Ticks never run
  ahead of the branch: the next pre-flight stashes whatever is
  uncommitted, so a tick over uncommitted bytes would send a resuming
  session past work no longer in the tree. The first unticked box is
  therefore always a task boundary, and a torn session leaves at most the
  current task's fragment — stashed and named by the next pre-flight, that
  one task restarted from the plan (→ Readiness Gate, gate #4). A meta
  topic has no branch and its shared trees are never stashed, so nothing
  can be hidden from a successor there: its boxes tick as each
  verification passes, and the close's own commits are the record.
- **A payload is applied from its file.** A step that names a
  `payloads/` file lands by Reading that file and re-emitting its bytes
  through Write/Edit — never retyped from memory, never reconstructed
  from plan prose (contract: development-process § Artifacts). The
  plan's own `Run:` lines invoke the payload verifier at task
  boundaries; a FAIL on an earlier, already-ticked step is the clobber
  signal, or — with every gate's box ticked — a promised occurrence no
  gated step ever landed. The note names neither: the verifier holds no
  history, so the target's own settles which. Enter the drift valve
  either way.

## Drift Valve

The open-decision stop's four close steps (the stop itself: `SKILL.md
§ Drift Valve`), in order:

  1. **Commit this session's machinery edits**, where it made any — the
     duty every close carries (development-process § Topic kinds): the
     machinery trees it edited, each scoped `add <files>` plus the
     same pathspec on the commit, public register, exactly as the Phase
     Close's machinery commit below. The project checkout is not committed
     here: the tasks already closed are on the branch, read by range at the
     next lens pass, and the current task's fragment stays uncommitted — the
     torn-fragment state the contract lets cross a boundary — named in the
     terminal report, stashed by the next pre-flight, that task restarted
     from the plan (→ Readiness Gate, gate #4). A half-applied task committed
     would put its payload anchors past the resume's reach.
  2. **Write the iteration marker into `review.md`** in the topic
     directory — the marker's one home, whoever writes it (review
     § Iterate). No file yet → create it as the title line plus the
     marker; one exists → prepend the marker above its entries, title
     kept:

     ```markdown
     # <topic> — review

     Iteration — <YYYY-MM-DD> → <phase>: <what the plan could not do>
     Unreviewed: <tree> <sha> · <tree> <sha>
     ```

     Step 1's refs ride that `Unreviewed:` line beside the marker: a
     stopped session writes no `implemented.md`, so this is their only
     home, and it is where the next lens pass finds them (→ review
     § The lens pass). The line is written **either way** — a stop that
     committed no machinery edits writes `Unreviewed: none`, the same
     unconditional shape the record's writers all use (review § The
     Close).
  3. **Commit the phase's writes** in the state folder — the
     partially-ticked `plan.md` and the marker'd `review.md`, plus each
     file outside the topic folder the plan names or this session
     edited — as `<topic ID>: implement`, the phase that ran,
     pathspec-scoped exactly like the Phase Close's step 5,
     whose target list, composite shape where such a file carries a
     foreign edit, and same-list verify this pointer carries whole.
  4. **Capture block:** invoke the `ymer:capture` skill — source
     `implement`, exactly as the Phase Close's own last step. A close is
     a close: the session shape likeliest to have produced friction is
     the last one that should capture none.

## Phase Close

No user gate: the close runs straight through, one continuous execution,
state changes before announcements (*Defaults and holds*:
development-process). Engaging the human with the real diff is review's
subject, and a "proceed?" here would be a round-trip every topic pays
twice. A meta topic skips step 1 (topic kinds: development-process
§ Topic kinds). **Where this session made machinery edits** — on either
kind, in any machinery tree — the **machinery commit** runs first, in
step 1's place on a meta topic and beside it on a code-repo topic; why the
commit is a duty rather than a convenience is the charter's
(development-process § Topic kinds). Each tree is read from its own
`status`/`log` and committed on its own. Public register — clean imperative
message, no topic ID (registers: the substrate contract, § Commit registers); several machinery
commits per topic are fine, and every ref is recorded in `implemented.md`:

```
Run:    git -C <tree> add <each file the topic edited> &&
        git -C <tree> commit -m "<imperative summary>" -- <the same files>
Verify: git -C <tree> log --oneline -1   → that tree's commit (every ref → implemented.md)
```

Run it once per machinery tree this session actually edited, and not at
all for a tree it did not. Scoped by path on **both halves** — `add <files>` *and* the same
pathspec on the commit, never `-A` — mirroring step 5's state-folder commit: the
add alone scopes the add, while a concurrent session's already-*staged*
path still rides a bare commit in these shared trees. Where the foreign
edit sits in a file you are also editing, commit by hunk instead (recipe:
the substrate contract). A session that made no machinery edits skips this.
