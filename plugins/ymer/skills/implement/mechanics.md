# Implementing: mechanics

The mechanics of the implement skill: the Claude Code way of doing its
steps. The headings are `SKILL.md`'s own; read a section's entries at
the moment that section runs.

## Contents

- Input: the topic folder
- Readiness Gate: a shared tree's scoped read, the project-checkout
  pre-flight, the record-names-it test, the stash, the catch-up
- Execution: a task's commit
- Drift Valve: the stop's four steps and the marker it writes
- Phase Close: the close's commit, the machinery commit, the
  state-folder commit

## Input

**The topic folder** is `<state folder>/<repo>/YYYY/MM-DD-<topic>/`,
where `<repo>` is the checkout's directory name, or `meta` for a
cross-repo process topic, which has no project checkout of its own (the
folder's shape: the operations contract, § Topic ID ↔ folder mapping).
The path is absolute, so it never depends on the session's cwd. Reuse
the folder the earlier phases wrote, found through the topic's task in
the repo's Roadmap project; its date prefix is the first phase's date.
The phase reads `plan.md` there and ticks its boxes in place.

## Readiness Gate

**A shared tree is read scoped to the plan's targets in it:**

```
git -C <tree> status --short -- <each target in that machinery tree>
git -C <state folder> status --short -- <each target in the state folder>
```

The second line is the one a state folder in no git repository skips
(`SKILL.md` § Readiness Gate).

Only files the plan names are targets, never the topic folder, which
every phase writes. A plan that names no target in a tree reads that
tree not at all: a scoped command with an empty pathspec reads the whole
tree, and a machinery tree routinely carries other sessions' work and
the user's own hand edits, none of it this check's business.

**The project-checkout pre-flight**, Claude-run, in this order; a
pending reset stops it before the first command:

```
git switch <topic>              # `switch -c <topic> main` where the
                                # branch does not exist yet
git branch --show-current       # assert: <topic>; anything else, a
                                # refused switch included → stop, ask
git log main..HEAD --oneline    # the branch's own commits: the
                                # record-names-it test, below
git status --short              # dirty → stash it, next command
git stash push -u -m "<topic> implement <YYYY-MM-DD>"
git log ..main --oneline        # what main gained
git merge --no-edit main        # catch-up on the clean tree
git log ..main --oneline        # verify: empty; non-empty means the
                                # merge did not land; read on, never reset
```

**The record-names-it test** reads `git log main..HEAD` before anything
else runs. A commit is the record's where one of the process contract's
§ The traceability stores names its ref, or where it is a catch-up merge
from main, whoever made it (a merge whose other parent is on main). The
pre-flight's derivation settles a pending sketch reset ahead of this
read, so the log poses one question. A sketch stops the pre-flight
before the stash (`SKILL.md` § Readiness Gate) because merging main into
it would make the sketch this topic's, the ship's squash would carry it
into main, and a reset run afterwards would discard the merge of main
with it.

**The stash** asks nothing on a dirty tree. Its entry is named in the
terminal report, `git stash list` is its record, and the entries are the
user's alone to pop. Where the dirt is recognisably this topic's own
torn fragment (the current task's boxes unticked, the branch's commits
ending at the previous task that wrote files; a task that wrote no
checkout file committed nothing and takes the one before it as its
boundary), the report says so (`SKILL.md` § Next Phase). Work resumes
at the plan's first unticked box.

**The catch-up** is the same merge review's ship close runs before its
squash (the review skill, § Phase Close — three closes). Its outcomes,
and the state no rule names, are the substrate contract's § Project
checkout. The record (`SKILL.md` § Phase Close) gives the catch-up's
outcome with its merge ref, and any conflict's resolution where it made
one.

## Execution

**A task's commit** on a code-repo topic, Claude-run, in the public
register: an imperative subject drawn from the task's title, never its
number, which is a workflow-internal reference.

```
git rev-parse -q --verify MERGE_HEAD   # assert: no output, exit 1; output → stop and ask
git status --short          # nothing listed → nothing to commit, skip the next line
git add -A && git commit -m "<imperative subject ≈50 chars>"
git log --oneline -1        # the task's commit: its ref → implemented.md
```

`git add -A` is the whole of it: a project checkout is staged whole, and
every path in it is this topic's (the substrate contract, § Project
checkout).

## Drift Valve

The stop's steps, in order (the stop itself: `SKILL.md` § Drift Valve):

1. **Commit this session's machinery edits**, per tree it edited,
   exactly as § Phase Close's machinery commit. The project checkout is
   not committed here: the tasks already closed are on the branch, and
   the current task's fragment stays uncommitted, named in the terminal
   report, stashed by the next pre-flight, and that task restarted from
   the plan. A half-applied task committed would put its payload anchors
   past the resume's reach.
2. **Write the marker into `review.md`** in the topic folder. No file
   yet: create it as the title line plus the marker. One exists: prepend
   the marker under the title, above its entries.

   ```markdown
   # <topic> — review

   Iteration — <YYYY-MM-DD> → <phase>: <what the plan could not do>
   Unreviewed: branch <sha> <sha> · <tree> <sha>
   ```

   The `Unreviewed:` line carries one marked group per tree, the
   branch's first, or the bare `none`.
3. **Commit the phase's writes in the state folder**, the partly ticked
   `plan.md` and the marked `review.md` among them, exactly as § Phase
   Close's state-folder commit, under the message `<topic ID>:
   implement`, the phase that ran.
4. **Run the capture block**: invoke the `ymer:capture` skill, source
   `implement`. A close is a close: the session likeliest to have met
   friction is the last that should capture none.

## Phase Close

**The close's commit** on a code-repo topic:

```
git rev-parse -q --verify MERGE_HEAD   # assert: no output, exit 1; output → stop and ask
git status --short          # nothing listed → nothing to commit, skip the next line
git add -A && git commit -m "<imperative subject ≈50 chars>"
git log --oneline -1        # this close's commit where one landed, else the
                            # last task's: the ref → implemented.md
```

An empty `git status --short` skips the add and the commit: that is the
ordinary path, not a failed close.

**The machinery commit**, once per machinery tree this session edited
and never for a tree it did not, each tree read from its own `status`
and `log`:

```
git -C <tree> add <each file the topic edited>
git -C <tree> commit -m "<imperative summary>" -- <the same files>
git -C <tree> log --oneline -1                     # the ref → implemented.md
git -C <tree> status --short -- <the same files>   # verify: none listed
```

A file the topic edited that also carries another session's edit is
committed by hunk instead (the substrate contract, § Committing by
hunk), and keeps one row in this verify (`cases.md` § Phase Close).

**The state-folder commit**, scoped as `SKILL.md` § Phase Close says;
the files outside the topic folder that the plan names are the targets
the Readiness Gate read:

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/ <each such file>
git -C <state folder> commit -m "<topic ID>: implement" -- <repo>/YYYY/MM-DD-<topic>/ <each such file>
git -C <state folder> status --short -- <repo>/YYYY/MM-DD-<topic>/ <each such file>   # verify: no output
```

A topic that wrote nothing outside its folder commits the folder alone.
Where such a file also carries a foreign edit, it is committed by hunk
(the substrate contract, § Committing by hunk), beside the plain paths,
whose `add` keeps its pathspec; that recipe's commit carries none. The
reset, diff and apply run once per mixed file; the commit runs once
after all of them. The verify reads the same list, never the topic
folder alone, which is blind to exactly the omission this keying
prevents; a file committed by hunk keeps one row there (`cases.md`
§ Phase Close).
