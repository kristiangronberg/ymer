# Writing Plans: mechanics

The mechanics of the write-plan skill: the Claude Code way of doing its
steps. The headings are `SKILL.md`'s own; read a section's entries at
the moment that section runs.

## Contents

- Overview: where the plan is saved, and the topic folder a split child creates
- Input: the project-checkout pre-flight, the record-names-it test, the stash, the catch-up and its conflicts, a meta topic's shared tree
- Grounding: the fan-out, its precondition and floor, the fallback, and single-context grounding
- Task Structure: fences and inline spans that carry backticks
- Payloads: the frame bar's gate, and the manifest's final-state counts
- Saving the Plan: no task write, no `Hardened —` line, machinery edits, the state-folder commit

## Overview

**Save plans to** `<state folder>/<repo>/YYYY/MM-DD-<topic>/plan.md`,
in the state folder, where `<repo>` is the checkout's directory name,
or `meta` for a cross-repo process topic, which has no project checkout
of its own (the topic ID's folder: the operations contract, § Topic ID
↔ folder mapping). The path is absolute, so it never depends on the
session's cwd. One folder per topic, shared by every phase. Reuse the
topic's folder where an earlier phase created one, found through the
topic's task in its product area (*look up topic*, binding: the
operations contract); its date prefix is the first phase's date,
not today's. Create a folder only for the arrival that has none, the
split child (`SKILL.md` § Input).

## Input

On a code-repo topic, Claude runs the project-checkout pre-flight in
this order, as the substrate contract's § Tree options gives it (read
at `SKILL.md` § Input). A pending reset stops it before the first
command:

```
git switch <topic>              # `switch -c <topic> main` for a split
                                # child or an idea-first topic
git branch --show-current       # assert: <topic> — anything else, a
                                # refused switch included → stop, ask
git log main..HEAD --oneline    # the branch's own commits — empty on a
                                # first cycle, implement's on an iteration
git status --short              # dirty → stash it, next command
git stash push -u -m "<topic> write-plan <YYYY-MM-DD>"
git log ..main --oneline        # what main gained
git merge --no-edit main        # catch-up on the clean tree
git log ..main --oneline        # verify: empty — non-empty means the
                                # merge did not land; read on, never reset
```

**Read `git log main..HEAD` before anything else runs**, by one written
test: every commit there is a ref one of the process contract's § The
traceability stores names, or a catch-up merge from main, whoever made
it (a merge whose other parent is on main). Yes, or an empty log, and
the pre-flight proceeds. Any commit no record names is the user's
sketch: **stop before the stash** and re-report the pending reset (the
process contract, § Defaults and holds). The pre-flight's derivation
settles the sketch case ahead of this read, so this is the one question
the log still poses.

The catch-up is the same merge the ship close runs before its squash
(the review skill, § Phase Close — three closes, step 2). Its commit
message is git's default, in the public register by construction, and
the squash folds it away. Git's dirty-tree refusals, tracked and
untracked alike, are unreachable after the stash, so a refusal the
catch-up meets is a state no written rule names.

The stash entry is named in the terminal report. Where the dirt is
recognisably a torn implement session's own fragment, ending at the
task boundary implement's commit cadence leaves (the implement skill,
`mechanics.md` § Readiness Gate, read at `SKILL.md` § Input), the report
says so, so the user knows the entry is safe to drop. Record what the
pre-flight found in the plan's Grounding fact sheet (on a re-plan, its
dated `### Re-plan` block, `cases.md` § Re-planning): the branch, its own commits, main's delta,
the stash entry and the catch-up's outcome. After a stash, run the
repo's cheapest whole-tree gate once (`mix test`, or the precommit
alias where the repo keeps one) and record its result there too: it is
the baseline every later `Expected:` is relative to, and a stash that
set aside a load-bearing hand edit (a relock) shows up here as a red
the plan names rather than ships against.

A conflict in the catch-up is classed and asked as the substrate
contract's § Project checkout says. An ordinary one's resolution and
merge ref are recorded in the same fact sheet. **Default: absent the
answer by the close, `git merge --abort`, which restores the pre-merge
tip and destroys nothing; record the conflict (the paths, the decision,
main's ref) in the fact sheet and proceed, since this phase's work does
not depend on the catch-up; main's delta over the conflicted paths
enters the assumptions block (impact-if-false: anchors on those paths
drift, and implement's pre-flight, or the ship close's, meets them
again) — review post-hoc at the fact sheet** (the process contract,
§ Defaults and holds). Where the conflict shows that a recorded decision
no longer survives, that is a contradiction too: record it in the plan
header and stop, naming the phase that owns the decision.

While such a question is open the tree carries conflict markers, and
the fact-gathering reads it: **never quote an anchor out of a marked
region**. An anchor lifted from one exists in no resolved file, and
plan-review, which re-verifies anchors against this same tree, would
harden the plan around it. Unmarked regions of a conflicted file quote
normally.

A meta topic has no branch and runs no project-checkout pre-flight: its
trees are shared trees (the substrate contract, § Tree options).

## Grounding

**The fan-out's precondition:** the plan-mechanical facts are
**extractable** (existence, anchors, signatures, one quoted call site)
rather than being the source text itself. Where it holds, fan out two
or three parallel **read-only Explore agents** to collect them at once.
Give each agent a concrete question list (paths to check for existence,
modules to read, signatures to extract), and have it return a compact
fact sheet: each path marked exists or absent, anchors quoted verbatim,
signatures as written in the source. Where the pre-flight left a merge
in progress, say so in the question list and have each agent skip any
anchor inside a conflict-marked region: a returned fact sheet carries
no sign of where an anchor came from, so this is the one moment the
marked-region rule of § Input can be applied. A characterization the
agent did not probe (what a module does, why a pattern exists) is
marked `inferred:`, never asserted. The agents do not read the
companion coding-standards skill; they gather facts and nothing else.
You, the author, stay single-context with the whole skill and
synthesize: authoring does not parallelize, fact-gathering does.

**Each brief carries confinement.** Beside its question list, each
agent gets the confinement contract's path, as `SKILL.md` § Grounding's
read line resolves it, the instruction to read it whole before its
first command, and a scratch root of its own (the confinement contract,
§ The scratch root). Take the host's inventory around the fan-out (the
confinement contract, § The host's inventory).

A returned fact sheet is never written to disk, so no later grep can
sweep it: resolve every `inferred:` it carries at synthesis, probed to
a fresh stamp where it can be checked and moved into the assumptions
block with its impact-if-false where it cannot, before any of its text
enters the plan's Grounding fact sheet or another section.

Two bounds hold per question, not only per phase. Never ask an agent
to quote a file destined for a whole-file payload: the author reads it
whole regardless, so the quote doubles the cost. And a question with
an **executable oracle** (reachability, breakage, "which sites does X
affect" over a corpus with a green suite) runs the temporary change
first, in a scratch replica of the checkout made inside the host's own
scratch root (the confinement contract, § The scratch root), and reads
what breaks, fanning out only what survives it: the suite prints the
table a reading pass infers.

**The orchestration floor.** Grounding fans out only where it holds at
least two independent question lists: one list gains no concurrency,
and it still pays an agent's spin-up and a fact sheet to synthesize. It
is a calibration, revised on captured evidence. The precondition above
says whether the fan-out applies at all; the floor says whether it pays.

**Fallback:** where the fan-out cannot run, the fallback rule decides
(the process contract, § Defaults and holds, read at `SKILL.md`
§ Input). Grounding then runs single-context, with the same questions
and the same fact-sheet contract, and the summary says so.

Where the precondition fails, grounding also runs single-context and
checks the same facts directly, same questions, same fact-sheet
contract, and the summary says so. Two shapes fail it:

- **The facts are the source text.** A plan that composes new prose
  from existing prose (skill files, docs, the state store's own prose)
  has the page bodies as its plan-mechanical facts, so a fact sheet
  pays twice for the reading: the pages must be read whole to author
  the replacement prose anyway.
- **Nothing is extractable yet.** The plan invents its targets rather
  than amending existing ones, so there are no anchors, signatures or
  call sites to fetch.

## Task Structure

A fence that itself contains a fence takes a **four-backtick** outer
fence, as the task template does. Equal-depth backticks around a payload
or illustration that carries a fence close the outer block at the inner
fence and break the plan's structure from there down. The same rule
reaches inline spans: an anchor or matcher that itself carries backticks
takes a longer delimiter run (a double-backtick span around content
holding one, with a space inside the delimiters where the content starts
or ends on a backtick), or the spans nest silently and render as
garbage for every later reader. A plan whose targets are docs quotes
such anchors on nearly every step.

## Payloads

Part of the frame bar is a gate, not a judgement: the payload verifier
reports a workflow-internal reference in a payload bound for a project
repo as an authoring defect, and skips payloads that target the state
folder or a machinery tree, which talk about the process by right (the
token classes and the skips: the verifier's header, read at `SKILL.md`
§ Payloads). What is left is the frame bar's own judgement: `Step 3`,
`Task 4` and `Plan 3a` read fine in a README and are judged in context,
and so is prose that is true, carries no token, and is still legible only to
someone holding the plan.

**The manifest.** Author `payloads/manifest` beside the payload files,
one payload gate per line, in the grammar of the verifier's header.
Expected counts are **final-state** counts, derived at authoring by
running the containment matcher over the payload against the target's
planned end state: two steps inserting identical bytes into one file
both gate on the final number, and mid-plan runs read PENDING, not
FAIL. Once every gate's box is ticked the verifier reads the plan as
complete, so an occurrence a later payload-less step adds by hand
needs a gate of its own. One already in the target at authoring needs
none: it is present at every run, so it never leaves a count short.

## Saving the Plan

Save the plan to the topic folder (§ Overview). No task is written:
`plan.md` is what the `planned` rung is read from (the operations
contract, § Topics).

Any `plan.md` this phase saves carries no `Hardened —` line: remove one
an earlier plan-review left, on every arm, so a plan written after its
review reads unhardened (the operations contract, § Topics).

**Machinery edits present** (the process contract, § Topic kinds):
where this session edited a machinery tree, commit each tree's edits
first, scoped by path on both halves, in the public register, and
record each ref in `plan.md`.

Then commit the phase's writes in the state folder, where git keeps
its history:

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "YYYY-MM-DD-<topic>: write-plan" -- <repo>/YYYY/MM-DD-<topic>/
```

Then read `git -C <state folder> status` scoped to the topic's paths:
they are gone from it (the substrate contract, § Stage by explicit path
only, and § Concurrent edits on a shared tree for the dirt left
outside them).
