# Define: mechanics

The mechanics of the define skill: the Claude Code way of doing what `SKILL.md` describes, under the spine's own headings. Read a section's entries at the moment that section runs.

## Overview

**The topic directory** is `<state folder>/<repo>/YYYY/MM-DD-<topic>/`,
where `<repo>` is the checkout's directory name, or `meta` for a
cross-repo process topic (the operations contract, § Topic ID ↔ folder
mapping). The path is absolute and does not depend on the session's
cwd. Reuse the directory an earlier phase created, found through the
topic's task in the repo's Roadmap project (*look up topic*, binding:
the operations contract), whose date prefix is the first phase's date.
A split child has none yet, and creates it under today's date
(→ `SKILL.md` § Input). Defining writes `spec.md`.

**The glossary** is the project glossary, in the project repo; for a
meta topic, the plugin glossary (the process contract, § Knowledge
placement).

## User Review Gate

The close commits in this order: the project checkout's glossary
commit, then each machinery tree's, then the state folder's. The
state-folder commit lands last because `spec.md` records the other
refs, so it records a ref rather than predicting one.

**Rulings on another topic in flight** run before the state-folder
commit (`cases.md` § User Review Gate).

**The project checkout.** A project repo's glossary, and any code-home
or prose-home sentence the referent gate wrote, commits on the topic
branch, addressed by `-C` rather than by the session's cwd, in the
public register (the substrate contract, § Commit registers):

```
git -C <checkout> switch <topic>           # or `switch -c <topic> main` when no
                                           # branch exists yet
git -C <checkout> branch --show-current    # assert: <topic>; anything else → stop, ask
git -C <checkout> add <glossary home> <code-home files> <prose-home files>
git -C <checkout> commit -m "<imperative summary of the glossary delta>"
git -C <checkout> log --oneline -1         # ref → spec.md glossary delta
```

Define runs no project-checkout pre-flight at its opening, so the
branch is born here when no earlier phase made one: an idea-first topic
reaches define before write-plan, and the fence's `switch -c` line is
that birth (the substrate contract, § Branch workflow). Where
brainstorm's reset is still pending, the branch is the sketch: the
close stops before any git runs and re-reports the reset with its
commands (the substrate contract, § Tree options, Project checkout,
step 1).

**Machinery edits.** Where this session edited a machinery tree, a meta
topic's plugin glossary among them, commit each one, as the process
contract's § Topic kinds says, and record the ref in `spec.md`'s
glossary delta (the process contract, § The traceability stores).

**The state folder.** There is no roadmap write: `spec.md` is what the
`specced` rung is read from (the operations contract, § Roadmap).

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "YYYY-MM-DD-<topic>: define" -- <repo>/YYYY/MM-DD-<topic>/
```

Verify, scoped: `git -C <state folder> status` no longer lists the
topic's paths, while other paths may remain (the substrate contract,
§ Concurrent edits on a shared tree).

A pending close (`SKILL.md` § Unattended: closing around the interview)
runs this state-folder commit alone, its message carrying the pending
suffix (the interview procedure, § 4. Pending).

## Bootstrap Mode

- Fan out 2–4 read-only Explore agents over README, module docs, module
  names, type names, struct/schema fields; collect the domain terms in
  use. Each brief carries the confinement contract's path, as `SKILL.md`
  § Bootstrap Mode's read line resolves it, the instruction to read it
  whole before the first command, and a scratch root of the agent's own;
  take the host's inventory around the fan-out (the confinement
  contract, § The scratch root and § The host's inventory).
  **Fallback:** where the fan-out cannot run, the fallback rule
  decides (the process contract, § Defaults and holds, read in
  `SKILL.md` § Bootstrap Mode); bootstrap's own fallback is the same
  sweep run single-context, and the summary says so.
- Write each under `## Grandfathered (pending define)`: term, a one-line
  *apparent* meaning (recorded, not blessed), where it is defined/used.
- Bootstrap has no topic and so no topic branch: the checkout is on
  `main`, a shared tree, and the glossary file commits by explicit path
  (the substrate contract, § Stage by explicit path only), in the public
  register (the substrate contract, § Commit registers). A checkout on
  any other branch is a state no rule names: ask, run nothing (the
  substrate contract, § Git is never guessed).

## Term Mode

Term mode has no topic and so no topic branch: its glossary edit, and
any code-home or prose-home sentence the referent gate wrote, commits
on a shared tree, the project checkout on `main` or, for the
plugin glossary, its machinery tree, by explicit path (the substrate
contract, § Stage by explicit path only), in the public register (the
substrate contract, § Commit registers). A checkout on any other branch
is a state no rule names: ask, run nothing (the substrate contract,
§ Git is never guessed).
