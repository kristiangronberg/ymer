# development-process — mechanics

The mechanics of the development-process skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Artifacts

One directory per topic — `<state folder>/<repo>/YYYY/MM-DD-<topic>/` — holds
every phase's artifact under phase-predictable names: `brainstorm.md`,
`sketch.md`, `survey.md`, `spec.md`, `plan.md`, `implemented.md`,
`review.md`. A topic `/ymer:mint` drew from the pool, or a split child,
also holds `request.md` — its intake as it arrived, written once by
whatever started the topic (template: the operations contract). A topic
folder may
also hold committed **sweep artifacts** — re-runnable measurement
scripts kept beside the map or plan whose numbers they generate (claims
rules: the sweep skill) — optional companions whose names stay ad hoc;
the payload contract below adds the phase-predictable companions
`payloads/` and its `manifest`.
Topic artifacts are opened with the Read tool: a direction doc, a survey
map or a plan routinely exceeds the Bash output cap, and a `cat` of one
bounces to a persisted-output file and costs the read twice (the
instrument rule: the front's initial instructions).
The state folder is the user's own repository; `<repo>` is the
checkout's directory name, or `meta` for cross-repo process
topics, which have no project checkout of their own; the topic ID
stays `YYYY-MM-DD-<topic>`, its folder splits the ID after the year.
The path is absolute: it does not depend on the session's cwd, which
for a meta topic is not a project repo at all. Nothing ever moves. A
later phase finds the topic's directory via its task's name — the date
prefix is the first phase's date — and never creates a second directory
for an existing topic. A topic is one task in the repo's Roadmap project
(full contract and the binding per coordinator in the operations contract): `doing`
while it is in the pipeline, closing as completed when it ships. **No phase
writes a status**: the pipeline rung is derived from the folder's
artifacts plus the topic's `<topic ID>: <phase>` commits in the state
repo — the contract's Status ladder table is the mapping. Implement that
runs to completion ends at a commit on the topic branch (a meta topic: at
its machinery commits, where it made any), pre-executes the lens pass over
what it committed — the findings and its own fix commit refs into
`review.md`'s `## Review` entry — and writes `implemented.md`
(deviations from the plan, mishaps, follow-ups, verification, the branch
commit ref plus every machinery commit ref — marked per tree,
one per machinery tree — the pass's fix commits excepted);
one that stops
at its drift valve writes **no `implemented.md`** and leaves an iteration
marker instead, its refs on the `Unreviewed:` line beside it
(→ Iteration). Review writes `review.md`, and its closure is what ships
the topic — the task closes as completed and `review.md`'s ship section
records the squash ref plus any machinery commit refs the increment
carries, per tree. A topic is **shipped iff `review.md` carries a
ship section**; that file plus the shipped code is the completion
record. Each phase commits its own writes in the state folder at
the end of its run (message: `<topic ID>: <phase>`) — and since the
`hardened` rung is read off the `: plan-review` commit, that commit is not
bookkeeping but the record itself. Push and pull belong to the user in
every repository; local project-repo git is Claude-run at the moments the
skills name (ownership: the substrate contract; contract: *Defaults and holds*,
below).

**The payload contract.** A **payload** — the verbatim content a task's
edit carries (plugin glossary) — never appears in `plan.md`, in a fence
or in prose: every payload, whatever its extent, is a file in the topic
folder's **`payloads/`** directory, named by its step ID's lowercase
form with the target's extension (`payloads/t4s2.md`; letter suffixes
`t4s2a.md`, `t4s2b.md` when one step carries several). `plan.md` keeps
the addressing (Edit anchors) and the verification (`Run:`/`Expected:`
lines). Beside the
payload files, **`payloads/manifest`** declares one **payload gate**
per payload — `<step-id> <target-path> [expected]` — evaluated by the
**payload verifier** the plugin ships (`scripts/payload-verify` under the
plugin root, run through `sh` on the topic directory with one
`--exempt <tree>` per machinery tree the front binds — the state folder
is read off the topic directory's own shape; its header documents the
manifest grammar, the PASS / PENDING / FAIL report, and the exit
contract — 0 no FAIL · 1 FAIL · 2 authoring defect). The verifier
reads progress from the plan's own ticked boxes — joined by step ID,
never an argument — and re-runs every gate, so a later task clobbering
a landed payload turns the earlier task's gate red; with every gate's
box ticked the plan reads complete, and a count still short of its
final-state number turns red there too. Write windows:
write-plan authors payloads and manifest, plan-review rewrites both,
implement's drift-valve mechanical corrections edit a payload file
(its gate re-runs); the ordinary apply path reads payload files and
writes targets, never the reverse. Phase duties: write-plan emits the
format (its Payloads section), implement applies a payload by Reading
its file and re-emitting the bytes through Write/Edit, plan-review
reads and writes both artifacts.

## Topic kinds

**Machinery edits present** is that session-level fact, and it stands **free
of the kind above**. A **machinery tree** (plugin glossary) is a tree where
this front's process machinery lives; which trees those are is the
environment's binding, not this skill's, and each is a **shared tree**, as
the state folder is, so every rule that word carries applies to them. Read
the fact from each tree and this session's own commits
in it (`git -C <tree> status` / `log`), never from `<repo>`. A code-repo
topic whose session edited any of them has it true; a meta topic whose
session edited none has it false. Where it is true, **every** phase close commits
those edits — per tree, public register, scoped by path on both halves
(`add <files>` *and* the same pathspec on the commit, never `-A`), or by
hunk where the file also carries a foreign edit (recipe: the substrate
contract) — records every ref in that phase's artifact, and lists the push
hand-off — whatever the topic's kind, and whichever close ran.

## Process ground rules

- **end-session is user-only** (`disable-model-invocation`; Skill-tool calls
  fail). When the user says "close down", ask them to type `/ymer:end-session` or
  run the close-out inline (loose-ends sweep → all-clear).
- **Editing a process skill** — in a machinery tree of your own, never in
  a plugin's installed cache (→ machinery tree). A process skill is
  project-neutral: never name a project repo, a repo-specific fact, or one
  language's tooling ruling — extract the principle; per-repo facts go in
  that repo's CLAUDE.md. After editing one, grep the tree it lives in for
  the old vocabulary the edit invalidated.

- **Git & commit conventions.** The contract is the substrate contract's,
  in one section: push and pull are the user's alone, in every
  repository — the network boundary; local git is Claude-run at the
  moments the skills name, with destructive-of-uncommitted steps and
  every version number as holds (*Defaults and holds*, above); and every
  operation keys on the tree it runs in — a **project checkout**, which
  stashes and catches up at each pre-flight and commits on its topic
  branch, or a **shared tree**, never stashed or merged, read and
  committed scoped to the paths this session touched (terms: the plugin
  glossary; mechanics and the by-hunk recipe: the substrate contract).
  Commit messages run in two registers
  (the operations contract):
  the state folder is the internal register — phase writes commit as
  `<topic ID>: <phase>`, workflow metadata welcome; every other
  repository, each machinery tree included, is the public register — imperative
  subject (≈50 chars), optional concise changelog-style body, no trailer,
  zero workflow-internal references. Machinery traceability runs through
  the topic folder, never the message, and spans every machinery tree.
  A **traceability store** is one of the
  slots in the topic folder where a session writes the refs of the
  commits it made, keyed by the step that made them: `implemented.md`
  records the task commits and every machinery commit ref its session
  made, per tree, the lens pass's own fix commits excepted; a `review.md`
  entry's `Fixes applied (--fix):` line records that pass's fix commits,
  wherever the pass ran; the same entry's `Unreviewed:` line a close's
  own commits no pass covered — the fold, a decide-forward's amendment
  commit; implement's drift-valve stop writes that line and no
  `implemented.md` at all (→ Iteration); `review.md`'s ship section the
  ref that shipped; and `spec.md`'s glossary delta define's own
  glossary-commit ref. That list is the only one the SHA lookup —
  "search the state folder for the SHA" — and the delta computation
  (review § The lens pass) enumerate. The user's own hand commits stay
  free-form.
