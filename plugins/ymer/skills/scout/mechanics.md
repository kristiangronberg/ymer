# Scout: mechanics

The mechanics of the scout skill: the Claude Code way of doing what `SKILL.md` describes, under the spine's own headings. Read a section's entries at the moment that section runs.

## Overview

**The topic directory** is `<state folder>/<repo>/YYYY/MM-DD-<topic>/`,
where `<repo>` is the checkout's directory name, or `meta` for a
cross-repo process topic (the operations contract, § Topic ID ↔ folder
mapping). The path is absolute and does not depend on the session's
cwd. Reuse the directory an earlier phase created, found through the
topic's task in its product area (*look up topic*, binding: the
operations contract), whose date prefix is the first phase's date;
otherwise create it. Scouting writes `survey.md`.

## Input

1. Read `brainstorm.md` in the topic directory: the chosen direction and
   its open questions are the search brief. Where the topic has a
   parent topic, read its inherited records beside them (the operations
   contract, § Inherited records). Do not
   read `sketch.md` (reader contract: the operations contract, § The
   topic's artifacts).
2. No brainstorm doc, and no direction doc named by the task's
   description, because the topic arrived directly? Ask the user for a
   one-paragraph topic statement and record it at the top of the map.
3. Derive **search vectors**: the concepts the brief names, the modules
   it suspects exist, the vocabulary it uses, the existing features that
   sound similar. Every open question in the brief that the codebase
   could answer becomes a vector.
4. **Code repos: check the tree before surveying** with `git status`
   (read-only). After a reset it should be clean; a dirty tree is
   flagged to the user before the survey starts, rather than surveying
   sketch-contaminated state.

## The Survey

**Fallback** (the process contract, § Defaults and holds): the Agent
tool genuinely absent, or a spawn refused at the permission layer, runs
the same lenses single-context, in sequence, and the summary says so.

## User Review Gate

Where this session edited a machinery tree, commit each one first, as
the process contract's § Topic kinds says, and record the ref in
`survey.md`.

Then commit the phase's writes in the state folder. No task is written:
the topic's task is already in flight, and `survey.md` is what the
`surveyed` rung is read from (the operations contract, § Topics):

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "YYYY-MM-DD-<topic>: scout" -- <repo>/YYYY/MM-DD-<topic>/
```

Verify, scoped: `git -C <state folder> status` no longer lists the
topic's paths, while other paths may remain (the substrate contract,
§ Concurrent edits on a shared tree).
