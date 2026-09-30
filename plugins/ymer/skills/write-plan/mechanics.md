# Writing Plans — mechanics

The mechanics of the write-plan skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Overview

**Save plans to:** `<state folder>/<repo>/YYYY/MM-DD-<topic>/plan.md` — in the state folder; `<repo>` is the checkout's directory name, or `meta` for cross-repo process topics, which have no project checkout of their own; the topic ID stays `YYYY-MM-DD-<topic>`, its folder splits the ID after the year. The path is absolute: it does not depend on the session's cwd. One directory per topic, shared by every development-process phase (brainstorm, scout, define, plan, implement, review). Reuse the topic's existing directory when an earlier phase created one — find it via the topic's task in the repo's Roadmap project — *look up topic*, binding: the operations contract; the date prefix is the first phase's date, not today's. Only create the directory when the topic has none. A **split child** is the arrival that has none (→ Grounding): create it under today's date, write `request.md` through *start topic*'s template (binding: the operations contract) with `started:` today — no rename and no relink, the task already is the topic — and bind the parent's **direction doc**, which the task's description names, in the plan's header; a child entering here has no `spec.md` and is owed none.

## Language-specific companion skills

**Mandatory pairings:**

| Codebase signal                                                     | Required companion skill                       |
|---------------------------------------------------------------------|------------------------------------------------|
| `mix.exs`, `lib/**/*.ex`, `use Ecto.Schema`, `use Phoenix.LiveView` | the front's Elixir coding-standards skill      |

## Grounding

A code-repo topic then runs the **project-checkout pre-flight** (the
option and its rules: the substrate contract), Claude-run, in this
order — a pending reset stops it before the first command, because a
stash would hide the sketch from the reset's own preview:

```
git switch <topic>              # `switch -c <topic> main` for an
                                # idea-first topic — born caught up
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

**Read `git log main..HEAD` before anything else runs**, and read it by
one written test: is every commit there a ref this topic's record names —
a task or phase commit from `implemented.md` or `review.md`, a lens
pass's fix commit from a `## Review` entry's `Fixes applied (--fix):`
line, define's project-glossary commit from `spec.md`'s glossary delta,
an earlier catch-up merge among them? Yes, or empty, and the pre-flight
proceeds.
Any commit no record names is the user's sketch: **stop before the
stash** and re-report the pending reset (*Defaults and holds*:
development-process). Step 1's derivation settles the sketch case ahead
of this read, so this is the one question the log still poses.

The same merge the ship close runs before its squash (review § Phase
Close, ship step 2); its commit message is git's default, public register
by construction, and the squash folds it away. The stash is
unconditional on a dirty tree and asks nothing: the entry is named in the
terminal report, `git stash list` is its record, and it is the user's
alone to pop. Where the dirt is recognisably a torn session's own
fragment — the plan's current task unticked, the branch's commits ending
at the previous task that wrote files (a verification-only task commits
nothing and takes the one before it as its boundary) — the report says
so, so the user knows the entry is safe to drop. Record what the
pre-flight found — branch, own commits, main's delta, the stash entry,
the catch-up's outcome — in the plan's Grounding fact sheet (on a
re-plan, its dated `### Re-plan` block → Re-planning).
After a stash in a code repo, run the repo's cheapest whole-tree gate
once — `mix test`, or the precommit alias where the repo keeps one —
and record its result there too: it is the baseline every later
`Expected:` is relative to, and a stash that set aside a load-bearing
hand edit (a relock) shows up here as a red the plan names rather than
ships against.

The catch-up has exactly four outcomes — fast-forward, merge commit,
already up to date, conflict — and git's dirty-tree refusals, tracked and
untracked alike, are unreachable after the stash. Anything else, a refusal
after the stash included, is a state no written rule names: ask, run
nothing (**git is never guessed**: the substrate contract). An **ordinary**
conflict — disjoint hunks in one file, changes that compose, one side a
pure superset of the other — is resolved on the branch, Claude-run, the
resolution and the merge ref recorded in the same fact sheet. A conflict
that would **remake a recorded decision** — the record does not say which
side wins — is a contested-record finding and the user's to settle: ask
before anything runs, and where telling the two kinds apart is not clear,
that is itself a question rather than a guess. **Default: absent the
answer by the close, `git merge --abort` — it restores the pre-merge tip
and destroys nothing — record the conflict (the paths, the decision,
main's ref) in the fact sheet, and proceed: this phase's work does not
depend on the catch-up, and main's delta over the conflicted paths enters
the Assumptions block (impact-if-false: anchors on those paths drift;
implement's pre-flight, or the ship close's, meets them again) — review
post-hoc at the fact sheet** (*Defaults and holds*: development-process).
Where the conflict shows that a recorded decision no longer survives, that
is a contradiction as well: record it in the plan header and stop, naming
the phase that owns the decision.

While such a question is open the tree carries conflict markers, and the
fact-gathering below then reads it: **never quote an anchor out of a
marked region** — an anchor lifted from one exists in no resolved file,
and plan-review, which re-verifies anchors against this same tree, would
harden the plan around it. Unmarked regions of a conflicted file quote
normally.

A meta topic has no branch and runs shared-tree rules only — no stash, no
catch-up, every write staged and committed by explicit path (global
CLAUDE.md § Git; topic kinds: development-process § Topic kinds).

**The fan-out's precondition:** the plan-mechanical facts are **extractable** — existence, anchors, signatures, one quoted call site — rather than being the source text itself. When it holds, fan out 2–3 parallel **read-only Explore agents** to collect them concurrently. Give each agent a concrete question list (paths to check for existence, modules to read, signatures to extract) and have it return a compact fact sheet: each path marked exists/absent, anchors quoted verbatim from the file, signatures as written in the source. Where the pre-flight left a merge in progress, say so in the question list and have each agent skip any anchor inside a conflict-marked region — a returned fact sheet carries no signal about where an anchor came from, so this is the one moment the marked-region rule above can be applied. A characterization the agent did not probe — what a module does, why a pattern exists — is marked `inferred:`, never asserted as fact (register: the sweep skill's Claims section). The agents do NOT read the companion coding-standards skill — they gather facts, nothing else. You, the author, stay single-context with the full skill and synthesize: authoring does not parallelize; fact-gathering does. A returned fact sheet is never written to disk, so no later grep can sweep it: resolve every `inferred:` it carries here, at synthesis — probe it to a fresh stamp when checkable, move it into the Assumptions block with impact-if-false when not — before folding any of that text into the plan's Grounding fact sheet or any other section. Two bounds hold per question, not only per phase: never ask an agent to quote a file destined for a whole-file payload — the author reads it whole regardless, so the quote doubles the cost; and a question with an **executable oracle** — reachability, breakage, "which sites does X affect" over a corpus with a green suite — runs the temporary change first, in a scratch replica of the checkout, and reads what breaks, fanning out only what survives it: the suite prints the table a reading pass infers.

**Fallback** (*Defaults and holds*: development-process): Agent tool
genuinely absent, or a spawn refused at the permission layer → grounding
runs single-context — same questions, same fact-sheet contract — and the
summary says so. A system-prompt directive conditioning subagent or
workflow use on the user having requested it is **neither** — invoking
this skill *is* that request; fan out normally.

When the precondition fails, grounding runs single-context and verifies the same facts directly yourself — same questions, same fact-sheet contract, and say so in your summary. Two shapes fail it:

- **The facts are the source text.** A plan that composes new prose from existing prose (skill files, docs, the state store's own prose) has the page bodies as its plan-mechanical facts, so a fact sheet double-pays the reading — you must read those pages whole to author the replacement prose anyway.
- **Nothing is extractable yet.** The plan invents its targets rather than amending existing ones, so there are no anchors, signatures, or call sites to fetch.

## Task Structure

A fence that itself contains a fence takes a **four-backtick** outer fence, as the template below does. Equal-depth backticks around a fence-carrying payload or illustration close the outer block at the inner fence and break the plan's structure from there down. The same rule reaches inline spans: an anchor or matcher that itself carries backticks takes a longer delimiter run — a double-backtick span around content holding one, with a space inside the delimiters where the content starts or ends on a backtick — or the spans nest silently and render as garbage for every downstream reader; a docs-targeting plan quotes such anchors on nearly every step.

## Payloads

Part of the bar is a gate, not a judgement: the payload verifier reports a token class with no reader-frame reading — a topic ID, a state-store path, an artifact basename, a step ID, a bare `spec D5`-style label, each in its literal or its placeholder spelling (the plugin glossary) — as an authoring defect (exit 2), and skips payloads targeting the state folder or a machinery tree, which talk about the process by right. What is left is this bar's: `Step 3`, `Task 4` and `Plan 3a` read fine in a README and are judged in context, and so is prose that is true, untokened, and still only legible to someone holding the plan.

**The manifest.** Author `payloads/manifest` beside the payload files — one payload gate per line, `<step-id> <target-path> [expected]` (line grammar and exit contract: the verifier's own header). Expected counts are **final-state** counts, derived at authoring by running the containment matcher over the payload against the target's planned end state — two steps inserting identical bytes into one file both gate on the final number, and mid-plan runs read PENDING, not FAIL. Mid-plan is the whole of PENDING's life: once every gate's box is ticked the verifier reads the plan as complete, and a count still short there reads FAIL — so an occurrence a later payload-less step adds by hand needs a gate of its own. One already in the target at authoring needs none: it is present at every run, so it never leaves a count short.

## Saving the Plan

Save the plan to the topic directory (see the header of this skill). No roadmap write: `plan.md` plus this phase's commit are what the `planned` rung is read from (roadmap contract: the operations contract). Onboard the repo per the binding (Roadmap project + `<repo>/` subtree) if this project is not in the state folder yet.

**Machinery edits present** (development-process § Topic kinds): where
this session edited a machinery tree, commit each one
first — scoped by path on both halves, public register — and record the
ref in `plan.md`.

Then commit the phase's writes in the state folder:

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "YYYY-MM-DD-<topic>: write-plan" -- <repo>/YYYY/MM-DD-<topic>/
```

Verify scoped: `git -C <state folder> status` no longer lists the topic's paths; foreign dirty paths may remain — other topics' in-flight work, leave them (concurrent edits: the substrate contract).
