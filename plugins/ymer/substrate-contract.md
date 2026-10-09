# The substrate contract

The rules these skills follow for git: which steps they run, which they
hand to the user, and how every write is staged and committed so that
nothing another session or the user made rides along. Skills name this
file by its role phrase, *the substrate contract*, and never by a path;
they cite its sections and never restate them.

**When it applies.** Read it where git is there: where the state folder
is its own git repository (its kind is read once, at a run's guard: the
operations contract, § The topic's artifacts), where the topic has a
project checkout (development-process § Topic kinds), or where the
session commits into a machinery tree, which is a git repository
whatever the state folder's kind. A state folder in no git repository
keeps no history beyond its files, and a meta topic has no branch, so a
session meeting none of the three reads nothing here.

## The network boundary

Push and pull belong to the user, in every repository. A session never
runs them: a push or a pull a step needs is a hand-off, the command
written out with what to verify afterwards. Fetching and configuring a
remote are local state, and a session may run them. The boundary is
data leaving or entering the machine, not configuration.

## Commit ownership

Everything local is Claude-run at the moments the skills name: add,
commit, merge, `merge --abort`, switch, `stash push`, creating and
deleting a branch, `git mv` and `git rm`. A step that destroys
uncommitted work — `reset --hard`, `clean`, a `checkout` or `restore`
over a dirty path, dropping or popping a stash — is a **hold**: never run
without the user's input (*Defaults and holds*: development-process).
`--amend` and `reset --soft` repair the session's own commit, just made,
and nothing else: read `git log -1` first and confirm this session wrote
it. Nothing leaves the machine without the user, so every local commit
stays revertible until they push.

## Git is never guessed

Every git action a session runs is one a written rule determines: the
command, the tree it runs in, and the outcome it expects. A situation no
rule determines — an unexpected refusal, a state no rule names, two
readings of what to do next — is a question to the user before anything
runs. A tool's printed hint ("commit or stash", "move or remove") is
never a rule. A step that cannot complete is undone to its pre-state: a
merge aborted, never left half-done, and a tree never carries conflict
markers past the session that met them. The report names what was
undone.

## Tree options

Every git operation keys on the tree it runs in, and a tree takes one of
two options. Which one is a property of the branch it is on, never of
its address or of the session.

### Project checkout

A checkout on the topic's own branch (→ Branch workflow). The branch is
the topic's alone, so the tree is read whole (`git status`) and staged
whole: any dirt would ride the commit, and all of it is this topic's.
Each phase that runs here opens with a pre-flight:

1. Derive what is pending from state first. A pending branch reset stops
   the phase before any git runs, because a stash would hide the sketch
   from the reset's own preview.
2. Be on the topic branch: `git switch <topic>`, or `git switch -c
   <topic> main` for a topic whose branch is not born yet.
3. On a dirty tree, `git stash push -u -m "<topic> <phase> <date>"`. No
   question is asked; the entry is named in the report and is the
   user's alone to pop.
4. Catch up: `git merge --no-edit main`. Its outcomes are exactly four:
   fast-forward, merge commit, already up to date, conflict.
5. Anything else, a refusal after the stash included, is a state no rule
   names: ask, run nothing.

Review is the one phase that folds instead of stashing: the dirt it
finds is the developer's own edits since implement, which its close
commits on the branch before it catches up.

### Shared tree

Any tree on a branch the topic does not own: `main` in any checkout, the
state folder, and every machinery tree on trunk. A shared tree is never
stashed and never merged. Its state is read scoped to the paths this
session touches, and dirt outside them is someone else's (→ Concurrent
edits on a shared tree). Writes are staged and committed by explicit
path (→ Stage by explicit path only), and by hunk where a file carries
another session's edit (→ Committing by hunk). Address the tree as
`git -C <tree>` on every call, so the cwd never decides where a commit
lands.

## Branch workflow

A code-repo topic lives on one branch, named with the bare topic slug,
no date. The branch is born from `main` at whichever phase first reaches
the checkout, born caught up. A sketch, where one is made, is a branch
state that brainstorm's reset hands back to `main`. The phases commit on
the branch; review's ship squash-merges it to `main` with a
public-register message and deletes it.

## Stage by explicit path only

In a shared tree, every commit carries exactly this session's bytes.
Name the paths on both halves, `git -C <tree> add <paths>` and then
`git -C <tree> commit -m "<message>" -- <paths>`: the add alone scopes
the add, and a concurrent session's already-staged path still rides a
bare commit. Never `add -A`, never `commit -a`. After the commit, read
`git -C <tree> status` scoped to those paths: they are gone from it,
and other paths may remain.

## Concurrent edits on a shared tree

Several sessions write the same shared tree at once. Dirt outside the
paths this session touches is never added, reset, cleaned or checked
out, and never a reason to stop. A dirty **target**, a path this session
is about to write, is the one ask: only the user can tell a concurrent
session's edit in flight from their own. Theirs: proceed, and commit the
file by hunk. A concurrent session's: wait for its commit. A state-folder
file outside the topic's own folder is the one place two sessions write
the same bytes.

## Committing by hunk

Where the file this session commits also carries another session's
uncommitted edit:

1. Take the diff with the file unstaged: `git -C <tree> reset --
   <file>` first if it is already staged (index only).
2. Cut this session's own hunks from `git -C <tree> diff -U0 -- <file>`
   into a patch, written from the hunks kept, never the whole diff
   redirected.
3. `git -C <tree> apply --cached --unidiff-zero <patch>`.
4. Confirm `git -C <tree> diff --cached --stat` names this session's
   paths alone. A concurrent session's staged path there is a stop.
5. Commit **without** a pathspec: `git -C <tree> commit -m "<message>"`.
   `git commit -- <file>` would commit the working-tree file whole,
   the foreign hunk included.

## Commit registers

Two registers, by repository. The state folder is the **internal
register**: a phase's commit message is `<topic ID>: <phase>`, and
workflow metadata is welcome there. Every other repository, each
machinery tree included, is the **public register**: an imperative
subject of about fifty characters, an optional changelog-style body, no
trailer, and no workflow-internal reference (term: the plugin glossary).
Write a message to a file and commit with `-F <file>`, or pass a plain
`-m` literal, so it reaches git as plain bytes.
