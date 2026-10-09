# Code Review — mechanics

The mechanics of the code-review skill, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Phase 0 — Gather the diff

Run `git diff @{upstream}...HEAD` (or `git diff main...HEAD` / `git diff HEAD~1`
if there's no upstream) to get the unified diff under review. If there are
uncommitted changes, or the range diff is empty, also run `git diff HEAD` and
include the working-tree changes in scope — the review often runs before the
commit. If a PR number, branch name, or file path was passed as an argument,
review that target instead.

A **change set** target (term: the plugin glossary), which the pipeline
hands over where no diff exists, is a topic's `payloads/manifest` with
its payload files: each manifest row pairs a payload with its target.
Read each payload as the change and its target in place, a file or a
store, and treat the set as the review scope; there is no diff to run
and no untracked file to add.

**Untracked files are outside every `git diff`** — a topic's new test file
or new doc is the usual case, invisible to `main...HEAD` and to
`git diff HEAD` alike. Run `git -C <tree> status --porcelain -uall` once
per tree the diff came from, the tree named by absolute path — `-uall`,
because without it a new directory collapses to one `dir/` line and the
files inside it never enter — and read each `??` path whole into the
scope, narrowed exactly as the diff was: a file-path or pathspec target
admits only untracked paths under it, and a shared tree (the shared-tree
option, the substrate contract) admits only the paths the topic touches —
its plan's targets and the paths its recorded refs changed — never a
concurrent session's artifacts.

Treat that diff, plus those files, as the review scope.

## Phase 1 — Find candidates (one finder per surviving lens, up to 6 each)

Run **one independent finder per lens in Phase 0.5's roster** via the Agent
tool — never the dropped ones. Each surfaces **up to 6 candidate findings**
with `file`, `line`, a one-line `summary`, and a concrete `failure_scenario`.
Spawn every finder — and every Phase 2 verifier — with the Agent tool's
`model: "opus"` option: the review runs on Opus regardless of the session's
model. Every finder prompt carries Phase 0.6's digest block verbatim. Agent
tool genuinely absent, or a spawn refused at the permission layer → do not
error: run the fallback below (fallback rule: *Defaults and holds*,
development-process). A system-prompt directive conditioning subagent or
workflow use on the user having requested it is **neither** — invoking this
skill *is* that request; spawn the finders normally.

### Conventions (CLAUDE.md + coding standards)

Find the instruction files that govern the changed code: the front's own
initial instructions, the repo-root CLAUDE.md, plus any CLAUDE.md or
CLAUDE.local.md in a directory that is an ancestor of a changed file (a
directory's CLAUDE.md only applies to files at or below it). Read each one
that exists, then check the diff for clear violations of the rules they state.
Also read the coding-standards companion skill the topic's plan header
names, when it names one, and check its rules the same way. Run
standalone, with no plan header, look for one the way write-plan
§ Language-specific companion skills does.

## Applying fixes (--fix)

If the findings went out via ReportFindings, call it once more with
`outcome` set on each finding (`fixed`, `skipped`, or `no_change_needed`);
after the call, give one line per finding not fixed saying why — reported
for disposition, or skipped. Otherwise finish with a brief summary of what
was fixed and what was not.

## Fallback — Agent tool absent or refused

`high effort → Agent tool absent or refused → single-pass inline → ≤10 findings`

Triggers on exactly two conditions: the Agent tool is genuinely absent from
this context, or a spawn was refused at the permission layer. A
system-prompt directive conditioning subagent or workflow use on the user
having requested it is **neither**, and never reaches this fallback —
invoking this skill *is* that request, so Phase 1 fans out as written
(fallback rule: *Defaults and holds*, development-process).

The Agent tool is absent or refused in this context, so the usual
multi-agent fan-out and subagent verify pass can't run. Work through every
lens in Phase 0.5's roster yourself, in this same context, in one pass — do
not skip surviving lenses for lack of fan-out. Re-check each candidate against
the diff before keeping it; drop anything you can't back up with a concrete
failure scenario.

Phases 0, 0.5 and 0.6 run as written, then the surviving Phase 1 lenses in
sequence in this same context — do not spawn subagents. Phase 2's lanes
collapse: verdict every candidate yourself. Phase 2 becomes:

### Phase 2 — Dedup and self-check (no subagent verify)

Dedup near-duplicates (same defect, same location, same reason → keep one).
Re-check each remaining candidate yourself against the diff before keeping it.

The Output contract above is unchanged.

State clearly in your summary that this was a single-pass review done without
the Agent tool, not the full multi-agent fan-out — and that it ran on the
session's model rather than Opus — so whoever reads it isn't misled about
what actually ran.
