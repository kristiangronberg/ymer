# Brainstorming — mechanics

The mechanics of the brainstorm skill, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Overview

**Topic directory:** `<state folder>/<repo>/YYYY/MM-DD-<topic>/` — in the state folder; `<repo>` is the checkout's directory name, or `meta` for cross-repo process topics, which have no project checkout of their own; the topic ID stays `YYYY-MM-DD-<topic>`, and its folder splits the ID after the year. The path is absolute: it does not depend on the session's cwd. Every development-process phase writes its artifact here; nothing ever moves. Brainstorm writes `brainstorm.md` (the direction doc) and, when a sketch exists, `sketch.md` (the verbatim sketch record). The topic's task lives in the repo's Roadmap project (binding: the operations contract); its pipeline rung derives from this folder, never stored.

## Branch Intake (code repos, when the session starts on a topic branch)

A sketch-first topic arrives on a branch: the user sketches on an ad-hoc branch, committing freely, then invokes `/ymer:brainstorm` from it. Topic Resolution has confirmed the branch as part of the discovered set; everything on it is brainstorm input by construction — the intake gate does not apply here. The one exception is an **iteration arrival** (→ Topic Resolution, case 2), where the branch carries the reviewed increment: only the commits the record does not name are input, and the `<base>` below is the newest record-named commit rather than the merge base.

1. **Rename — the session's first git, Claude-run.** Immediately after
   resolution confirms the topic name, align the branch to the bare topic
   slug (skip when the names already match):

   ```
   git branch -m <current-branch> <topic>
   git branch --show-current    # verify: <topic>
   ```

2. **Record the sketch in `sketch.md`** (read-only git). The `<base>` is `git merge-base main HEAD` — correct even when the branch forked from an older main — and, on an iteration arrival, the newest commit the record names instead. Record, verbatim and uncurated:
   - the combined diff: `git diff <base>` (committed and uncommitted work in one view), plus untracked files read directly — `git diff` does not show them;
   - the **progression story**: the commit log with full messages, `git log --reverse <base>..HEAD`, under its own `## Progression story` heading — the sequence of attempts and what each message says is signal review reads;
   - the paths the sketch files live at.

   The audience rule from Sketch Intake step 4 applies unchanged: do not clean it up, summarize it, or fix it.

3. Ask one light question for the record: "Anything you were attempting, or unsure about, that the code doesn't show?" The answer goes into `sketch.md`. Skippable — don't turn intake into an interview.

4. Treat the sketch as food for thought, and mine it into the direction doc during the session — Sketch Intake's mining note applies unchanged.

## Sketch Intake (branchless — after Topic Resolution)

The user often sketches an idea in code — real or pseudo-code — right before the session, because sketching is easier than explaining from scratch. That sketch arrives as uncommitted changes and is brainstorm input, not a decision already made. On a topic branch, Branch Intake above owns the sketch; this section covers the branchless case — a dirty tree on main.

1. Check the working tree: `git status --porcelain` (read-only). If clean, skip to Interview.
2. If dirty, read everything: `git diff` (staged and unstaged) for tracked files, and read untracked files directly — `git diff` does not show them.
3. Gate before proceeding — ask the user which of these holds:
   - **All of it is brainstorm input**, disposable, reset away at the session's close via the reset hand-off (the typical case).
   - **Some is real work to keep** — the user commits or stashes the keepers themselves, then you re-check status and continue.
   - **None of it is input** — leave it untouched, don't mine it, and skip the end-of-session reset hand-off.

   Dirt that is plainly **not a sketch by inspection** — a lockfile or a
   dep relock, a generated ledger, a tree unrelated to the topic — takes
   the third answer without the question: name it in the report, leave
   it untouched, and skip the gate and the reset hand-off.

   **Hold: the user's own commit or stash of the keepers** (*Defaults and
   holds*: development-process). Unattended — the session's question tool
   absent from its tools, or the call that puts the gate's question
   refused — the session stops with nothing written, its report naming
   the gate: a dirty tree is never mined, reset, committed, or stashed
   without the user's answer.
4. **Write the sketch record now** — `<state folder>/<repo>/YYYY/MM-DD-<topic>/sketch.md`: the raw diff, the full contents of untracked sketch files, and the paths the user wrote them at. Verbatim and uncurated — do not clean it up, summarize it, or fix it. Its one reader is review (reader contract: development-process § Artifacts), which contrasts the user's own attempt with the shipped code; editing the record would erase exactly the signal that contrast needs — the user's idioms, gaps, and first instincts.
5. Ask one light question for the record: "Anything you were attempting, or unsure about, that the code doesn't show?" The answer goes into `sketch.md`. Skippable — don't turn intake into an interview.
6. Treat the sketch as food for thought: the chosen direction may keep it, morph it, or discard it entirely.

## Commit the Artifacts, Then Reset (after the doc is approved)

The next phase starts from a clean tree with the artifacts committed. Skip the reset hand-off (step 3) if the intake gate chose "none of it is input" or named the dirt as not a sketch by inspection, or on an iteration where case 2 found every commit on `main..HEAD` record-named — branch intake did not run, there is no floor to reset to, and step 4's floor sentence has no referent — but still run step 1 and commit.

1. Put the topic in the pipeline (binding: the operations contract): *mint task* at `doing` when the topic was invented here and has no task yet — a drawn topic's task is `doing` already. Record any dependency the session discovered — "this cannot start until that ships" — as an edge with its reason (*order topics*); an order that lives only in chat is lost. The prerequisite check's outcomes land here: a blocking gap's learning task minted into the Learning project (targeting and status: the operations contract's binding) with its edge recorded and its reason (*order topics*), and each falling-behind gap captured as a learning drop through the `ymer:capture` skill, source `brainstorm`. **Split option** (→ the operations contract, "Split topics"): when the settled direction splits the topic into children, *mint task* per child at `doing` — split-day dates — and *retire topic* on the parent's own task, its result naming the children; no child folders are created now, and the parent folder closes with the doc's child list. When the topic's slug already names one of the children, shed siblings instead of retiring — the task and folder stay that child's and the others are minted (the operations contract, the mid-pipeline form) — and the interview's question is worded slug-neutrally ("three topics", never "retire + mint"): the slug was fixed at topic resolution before the interview knew whether the topic is a parent. Nothing records a status: the rung derives from this folder's artifacts alone. Onboard the repo per the binding (Roadmap project + `<repo>/` subtree) if this project is not in the state folder yet. **An operation whose required outcome did not happen stops the boundary** — surface it, never skip silently; *mint task*, *order topics* and *annotate task* are the three whose calls do not show their outcome, so read them back.

   **A split child or a drawn topic needs no mint** (→ Topic
   Resolution): its task is already `doing` and already carries the
   topic's name, so this step records only the dependencies, learning
   gaps, split children and outward rulings the session itself found.

   **Rulings on another topic in flight** (the outward-write rule: the
   operations contract). A topic still `doing` that this session ruled
   on — scoping or narrowing it, falsifying a claim it carries, or
   affirming it with re-measured evidence — is annotated in this close
   (*annotate task*), the ruling as the evidence. A ruling on anything
   else writes nothing outward, and neither does a bare citation with no
   ruling. The topic's own task is not a case: its description is frozen
   while the task is `doing` (the operations contract).

2. **Machinery edits present** (development-process § Topic kinds): where this session edited a machinery tree, commit each one first — scoped by path on both halves, public register — and record the ref in `brainstorm.md`. Then commit the artifacts in the state folder — from any cwd, the commands are absolute (Claude-run — every phase commits its own state-folder writes):

   ```
   git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
   git -C <state folder> commit -m "YYYY-MM-DD-<topic>: brainstorm" -- <repo>/YYYY/MM-DD-<topic>/
   ```

   Verify the commit landed (`git -C <state folder> status` no longer lists the topic's paths; foreign dirty paths may remain — other topics' in-flight work, leave them; concurrent edits: the substrate contract) **before** handing over the reset: the reset must only ever destroy what `sketch.md` and the state-folder commit already preserve.
3. **Reset hand-off** — the destruction is the user's to run, via `!`. Hand over the commands and wait for the output.

   **Hold:** the reset never runs without the user. Absent input the
   phase closes around it and the terminal report lists it as a pending
   step, commands written out — a pending reset blocks the phases that
   need clean state (scout's tree check, write-plan's grounding), so the
   successor's pre-flight re-reports it and stops (*Defaults and holds*:
   development-process).

   On a topic branch (branch intake ran) — reset the branch to its floor:
   `main` normally, and on an iteration arrival the newest commit the
   record names (→ Topic Resolution, case 2):

   ```
   Preview: git diff <floor> --stat ; git clean -n   → what will be discarded
   Run:     git reset --hard <floor> && git clean -fd
   Verify:  git status   → clean, on <topic>
   ```

   Branchless (working-tree sketch):

   ```
   Preview: git status ; git clean -n   → what will be discarded
   Run:     git reset --hard && git clean -fd
   Verify:  git status   → clean, on main
   ```

4. Confirm the verify output when it arrives: clean tree, artifacts in history. On a topic branch the branch now sits exactly at the floor the hand-off named — `main` normally, the newest record-named commit on an iteration arrival — so the next phase opens on clean state; the sketch survives in `sketch.md` (and the reflog).

Destructive-of-uncommitted steps are holds — handed off, never
Claude-run; all other local git is Claude-run at the moments this skill
names (ownership: the substrate contract; contract: development-process,
*Defaults and holds*). State-folder and machinery commits stay each phase's
own (decided 2026-07-06 and 2026-07-27; the machinery half is step 2
above).
