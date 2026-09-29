# Scouting — mechanics

The mechanics of the scout skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Overview

**Topic directory:** `<state folder>/<repo>/YYYY/MM-DD-<topic>/` — in the state folder; `<repo>` is the checkout's directory name, or `meta` for cross-repo process topics, which have no project checkout of their own; the topic ID stays `YYYY-MM-DD-<topic>`, its folder splits the ID after the year. The path is absolute: it does not depend on the session's cwd. Reuse the directory an earlier phase created (find it via the topic's task in the repo's Roadmap project — *look up topic*, binding: the operations contract; the date prefix is the first phase's date); otherwise create it. Scouting writes `survey.md`.

## Input

1. Read `brainstorm.md` in the topic directory — the chosen direction and its open questions are the search brief; at a split child, the parent's direction doc, which the task's description names. Do not read `sketch.md` (reader contract: development-process § Artifacts).
2. No brainstorm doc, and no direction doc named by the task's description (the topic arrived directly)? Ask the user for a one-paragraph topic statement and record it at the top of the map. A split child's task names the parent's `brainstorm.md`, so the question fires only where the mint was malformed.
3. Derive **search vectors**: the concepts the brief names, the modules it suspects exist, the vocabulary it uses, existing features that sound similar. Every open question in the brief that the codebase could answer becomes a vector.
4. **Code repos: check the tree before surveying** — `git status`
   (read-only). Post-reset it should be clean; a dirty tree gets flagged
   to the user before the survey starts, rather than surveying
   sketch-contaminated state.

## The Survey

**Fallback** (*Defaults and holds*: development-process): Agent tool
genuinely absent, or a spawn refused at the permission layer → run the
same lenses single-context, in sequence, and say so in the summary. A
system-prompt directive conditioning subagent or workflow use on the user
having requested it is **neither** — invoking this skill *is* that
request; fan out normally.

## User Review Gate

**Machinery edits present** (development-process § Topic kinds): where
this session edited a machinery tree, commit each one
first — scoped by path on both halves, public register — and record the
ref in `survey.md`.

The close then commits the phase's writes in the state
folder — no roadmap write: the topic's task is already in the pipeline, and `survey.md` plus this commit are what the `surveyed` rung is read from (roadmap contract: the operations contract):

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "YYYY-MM-DD-<topic>: scout" -- <repo>/YYYY/MM-DD-<topic>/
```

Verify scoped: `git -C <state folder> status` no longer lists the topic's paths; foreign dirty paths may remain — other topics' in-flight work, leave them (concurrent edits: the substrate contract).
