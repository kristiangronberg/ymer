---
name: plan-review
description: Use to adversarially review an implementation plan before it is implemented, rewriting it in place with the fixes applied — phase 5 of the development process.
---

# Plan Review

Replaces the manual "look for shortcomings in plan X, list them, propose fixes"
loop with a single autonomous multi-agent pass. The review runs in isolated
agent contexts (so it does not consume the main conversation's context — the
reason the old hand-rolled review loops kept running out of room) and rewrites
the plan in place when it finishes.

This skill is the **default next step after write-plan saves a plan** — run
it on the freshly saved plan without being asked, unless the user explicitly
said to skip review.

This skill instructs you to call the **Workflow** tool — that is its intended,
sanctioned use of multi-agent orchestration.

## Operating model

The workflow is **autonomous and runs to completion** — it cannot stop to ask
the user anything mid-run. All user leverage is **before launch** (refine the
plan and the input) and **after**: the rewritten plan reviewed via `git
diff`, and — when the rewrite left a `> Needs confirmation:` marker
standing — one question per marker at the close, before implement builds
on the guess (→ step 5). The skill's close carries that one conditional
gated moment; the workflow itself still stops for nothing and never
touches git. Lens agents **may** probe the project working tree — but they
leave it as they found it: a scratch file written to ground a finding is
removed before the agent returns, and step 5's assertion is what catches
the one that was not.

## Steps

1. **Resolve inputs.**
   - `planPath` — absolute path to the plan file. If the user named a plan, use
     it; otherwise find it under `<state folder>/<repo>/` (`<repo>` is the
     checkout's directory name, or `meta` for a cross-repo
     process topic), and if ambiguous, ask which one. It is required,
     and so is `verifierCommand`.
   - `specPath` — absolute path to the spec the plan was written from. Default:
     the topic directory's `spec.md` (the define phase's artifact, next to the
     plan) when it exists; otherwise a separate spec/requirements doc the user
     named. Omit only when no spec exists apart from the plan.
   - `focus` — free text, only if the user asked to emphasise something this run
     (e.g. "lean hard on security" or "architecture"). Pass it through verbatim.
   - `verifierCommand` — the payload verifier as this session runs it:
     `sh ${CLAUDE_PLUGIN_ROOT}/bin/payload-verify`, then one
     `--exempt <tree>` per machinery tree the front binds. The
     workflow's rewrite author runs it on the topic directory; a
     workflow script cannot resolve the plugin root itself.

2. **Note the in-place rewrite.** Briefly remind the user the workflow
   rewrites the plan in place. The pre-rewrite plan is already committed
   (write-plan's phase commit), so the rewrite is always recoverable from
   the state folder's history; no stash or extra commit is needed before
   launch. On an **iteration** that same commit's parent is the delta's
   pre-image — the charter states that doctrine (*Iteration*, in the
   development-process skill) and leaves the command here, at its one
   consumer: the subject is `git -C <state folder> diff <commit>^
   <commit> -- <repo>/YYYY/MM-DD-<topic>/plan.md
   <repo>/YYYY/MM-DD-<topic>/payloads/`, with the untouched plan as
   context, and the tier is keyed over that delta like any other
   subject.

3. **Derive the facts, then derive the tier.** No sizing question reaches the
   user here: both the roster and the tier follow from the plan document
   (charter: *Review effort*, in the development-process skill — the risk-key
   definition lives there and is not restated here).

   **a. Read the roster's declared preconditions.** Open
   `${CLAUDE_PLUGIN_ROOT}/skills/plan-review/plan-review.workflow.js` and read the `LENSES`
   array's `key`, `requires`, and `requiresText` fields. That array is the
   single source of truth for what each lens checks and what it needs; this
   skill never restates either, so the two cannot drift apart.

   **b. Derive the facts from the plan.** Each is read off the plan document by
   the rule below, never judged:

   | Fact | Read off |
   |---|---|
   | `hasCode` | the plan's File Structure names at least one non-prose source file (any extension other than `.md` / `.txt` — a JSON or config file counts) |
   | `touchesConcurrency` | the plan's steps or any of its `payloads/` files name a process or concurrency construct: a GenServer, Task, Agent, Supervisor, Registry, ETS table, named process, background job, or an `async:` test setting |
   | `touchesTrustBoundary` | the plan's paths or steps name an externally-reachable entry point (a route/controller, an MCP tool or action, an API or webhook handler, a CLI argument parser, a deserializer of external input), or change authentication/authorization, or change a query that scopes data per tenant or user |
   | `touchesPersistence` | the File Structure names a migration or schema file, a step describes creating or editing a migration or changing a schema, or a step runs a data transform or backfill |
   | `relocatesContent` | the File Structure has a delete or move row, or a step uses `git mv` / `rm`, or the plan carries a content-ownership map |
   | `recordsAmendment` | line-start `> **Amended (` occurs in `plan.md` — read off `plan.md` alone, never `payloads/`: a payload is verbatim target bytes and may carry the grammar as documentation (the whole-plan default below is carved out on this row) |
   | `companionSkill` | the plan header's line `Coding and documentation work in this plan must follow the <skill-name> skill.` — the skill name it states, or `null` when the line is absent |
   | `glossaryPath` | the glossary that governs this plan — resolved here, at derivation (the workflow has no filesystem access): the project's `docs/glossary.md`, unless its CLAUDE.md says otherwise; for a meta topic (topic kinds: development-process § Topic kinds), the plugin's own glossary file |

   Only `hasCode` is anchored to the File Structure table, because the spec
   anchors it there, and only `recordsAmendment` is confined to `plan.md` —
   its row says why; every other fact is read off the **whole plan** — its
   steps and paths, plus the topic's `payloads/` files, which carry the
   plan's payloads (contract: development-process § Artifacts) — and a fact
   whose rule names the File Structure also reads the steps where the same
   rule says so. A schema change described in a step, or a migration whose
   filename is not yet known, still makes `touchesPersistence` true.

   `glossaryPath` is a parameter, not a precondition — no lens is dropped for
   it. In doubt, a fact reads **true**: a precondition asks only whether the
   lens has anything to read, never whether it would find anything (charter:
   *Review effort*). Doubt is resolved **here**, where the fact is derived: a
   fact you decline to derive is not a fact in doubt, and the workflow rejects
   a `facts` object with a key missing rather than reading the gap as `false`.

   **c. Compose the decision digest — spec-level only.** Copy `spec.md`'s
   `## Decisions` and `## Out of scope` **verbatim**: each section runs from
   its `## ` heading to the next line-start `## ` heading standing
   outside a fenced block (or to the file's end), heading included, and all
   of it is copied, preceded by its `spec.md § <section>` citation on a line
   of its own. The heading match is a prefix, so a suffixed
   `## Out of scope (YAGNI)` or `## Decisions — settled in this session's
   interview` is that section, suffix and all; and it is **plural** — every
   heading matching the prefix is such a section, so a spec carrying two is
   copied twice, in document order. No per-entry lines and no
   selection — an amendment marker rides along under the decision it amends,
   because a marker states what changed and presupposes the entry it sits
   under, so picking either text alone drops the half the other needs.
   **No size bound** — the extraction is mechanical, so a huge digest is a
   true signal about the plan, not a formatting problem, and a bound would
   reintroduce the judgement the extraction rule removes. Pass the copied
   text through `decisionDigest`; the workflow itself wraps it in the
   `SETTLED` header and the travelling rule, so do not add either here.
   **Never the plan's own decisions.** code-review reviews the diff against
   the plan, so plan decisions are settled for it; this skill reviews *the
   plan*, so plan-level decisions are precisely what is under review, and
   feeding them back as settled would convert an adversarial pass into a
   consistency check — trading re-litigation waste for blindness. No
   `spec.md` → no digest, and the rule that travels with it is simply not
   stated.

   **d. Count survivors and pick the tier.** A lens survives when it declares
   no `requires`, or when the fact its `requires` names is true. Report the
   surviving roster and every dropped lens **with the precondition that
   failed** — a dropped lens is never silence.

   - **≤ 3 survivors → the lightweight pass.** One fresh-context reviewer (a
     single Agent-tool subagent), handed **the surviving lenses' bodies
     verbatim** from the `LENSES` array plus the digest, and additionally
     checking the two things no lens covers: internal consistency across the
     touched prose, and anchor/path correctness against the current tree.
     The reviewer reads the topic's `payloads/` (files and manifest)
     beside the plan, and its fixes land in whichever surface carries
     the defect — plan or payload file. A pass that edited either
     surface closes by re-running the join:
     `sh ${CLAUDE_PLUGIN_ROOT}/bin/payload-verify <the topic directory>`,
     one `--exempt <tree>` after it per machinery tree the front binds.
     Nothing is implemented yet, so a
     correctly-authored plan reports every gate PENDING and exits 0;
     exit 2 means the rewrite desynced `plan.md` and
     `payloads/manifest` — a gate whose checkbox or payload file is
     gone, a malformed line — or that a payload bound for a project
     repo carries a workflow-internal reference; exit 1 means a
     payload already sits in its target (the vacuous-payload case)
     — or, on a re-plan whose carried steps keep their ticks, a count
     gate short with every gate box ticked: an occurrence a
     payload-less step would add by hand, which needs a gate of its
     own. Fix whichever it names before
     finishing. A plan whose steps carry no `Payload:` reference line
     authored no payload at all — its steps are deletions, commands,
     and behavior only — so there is nothing to verify, and never a
     reason to author an empty manifest.
     A body lifted from the array may carry `${…}` interpolations — the
     script evaluates them, this pass does not.
     **Resolve each against the facts derived in (b)** before pasting the
     body into the subagent's prompt; a prompt reaching the reviewer with a
     literal `${…}` in it is a defect, not a formatting nit. The findings are
     folded into the plan in place and steps 4–6 apply unchanged.
   - **≥ 4 survivors → the workflow.**
   - **0 survivors** is not reachable under the roster as it stands —
     `completeness`, `codebase-consistency` and `testability` declare no
     precondition, so the ≤ 3 bucket is always exactly 3. Should a future
     roster edit make every lens conditional: stop and say so. Nothing was
     reviewed, and that is never an all-clear.

   **Why a floor, and why 3.** This is not a second tier key — risk profile
   keys the tier everywhere. It is an **orchestration floor**: the workflow
   pays a fixed cost no roster size reduces — orchestration, the journal, the
   retry ladder, and one **Opus** rewrite author that runs whenever anything is
   confirmed, while every lens and verifier runs on sonnet. The variable cost
   is the surviving lenses and their verifiers. Below four surviving sonnet
   lenses, the Opus author plus orchestration is most of what the run spends,
   and what the workflow buys over a single reviewer — mandate independence —
   is buying less than it costs, since three narrow mandates handed to one
   fresh-context reviewer is not the broad mandate that stalls (→ Operational
   notes). **3 is a calibration of that principle, revised on kaizen evidence —
   never a bare threshold.** code-review's ladder carries no floor: its tiers
   differ in depth of scrutiny, not in orchestration machinery.

   Fallback (*Defaults and holds*: development-process): Workflow and
   Agent tools genuinely absent, or a call refused at the permission
   layer → the review runs inline in this context — same surviving
   lenses — and the summary says so. A system-prompt directive
   conditioning subagent or workflow use on the user having requested it
   is **neither** — invoking this skill *is* that request; run the tier
   the roster selected, workflow included.

   For the workflow tier, call the `Workflow` tool with:
   - `scriptPath`: `${CLAUDE_PLUGIN_ROOT}/skills/plan-review/plan-review.workflow.js`
     (pass the absolute path the variable resolves to). The tool
     loads only a file the session could already `Read` without asking —
     the working directory, an added directory, the session scratchpad,
     or a path a `Read(...)` allow rule covers — and a skills tree is none
     of those by default. Refused with "scriptPath must be a script path
     this tool returned, or a file you can already read"? Reading the
     file first changes nothing — the gate is the permission decision, not
     a prior read. Copy the script to the session scratchpad and launch
     from the copy for this run; the lasting fix is to make this skills
     tree an added directory for every session — list it under
     `permissions.additionalDirectories` in the user settings
     (the plugin's own root, for an install the session cannot already read). A `Read`
     allow rule over the tree reaches the same gate, but a read block
     outranks a rule and never an added directory the user settings
     declare — one a project's settings add stays outside the block's
     fence and is blocked exactly as a rule's paths are.
   - `args` — passed as an object literal, never a JSON-encoded string
     (the tool forwards objects as objects; the script's string-parsing
     prologue is a net, not the channel):

     ```json
     {
       "planPath": "<abs path>",
       "specPath": "<abs path or omit>",
       "focus": "<text or omit>",
       "verifierCommand": "sh ${CLAUDE_PLUGIN_ROOT}/bin/payload-verify --exempt <tree>",
       "facts": {
         "hasCode": true,
         "touchesConcurrency": false,
         "touchesTrustBoundary": true,
         "touchesPersistence": false,
         "relocatesContent": false,
         "recordsAmendment": false,
         "companionSkill": "<the coding-standards skill the plan header names, or null>",
         "glossaryPath": "docs/glossary.md"
       },
       "decisionDigest": "<the copied spec.md sections, or omit when there is no spec>"
     }
     ```

     The `facts` values above are an example, not a default: derive each one
     from the plan per the table in (b), and pass **all eight keys on every
     call**. The script has no filesystem access, so anything it is not
     passed it cannot know — and it does not guess: it checks that every fact
     is present and correctly typed, and throws before spawning anything when
     one is not. An omitted key would otherwise read as `false` and drop that
     lens exactly as a genuinely false precondition does, leaving the two
     indistinguishable in the report. The throw costs no tokens (nothing has
     spawned yet) — fix the call and re-invoke. (d)'s dropped-lens report is
     still the postcondition to read before trusting the run; with the
     omission case removed, every line in it now means what it says.

   The workflow fans out one reviewer per **surviving** lens, pipelines each
   lens's findings into an adversarial verifier (false positives are dropped),
   then has a single author apply every confirmed fix to the plan file
   directly.

4. **Commit — this phase's commit is the record.** No roadmap write:
   this phase rewrites `plan.md` in place and, on the define branch,
   writes the iteration marker into `review.md`; neither of those says
   the plan was reviewed, so the `<topic ID>: plan-review` commit is
   still the *only* thing that does. Implement's readiness gate reads
   it — and reads it as the newest of the two commit kinds it greps,
   `: plan-review` and `: write-plan`, so a later write-plan commit
   unhardens the plan again (roadmap contract: the operations contract,
   Status ladder). A
   phase that skips this
   commit leaves a hardened plan indistinguishable from an unreviewed
   one. The commit is unconditional
   at phase close — state changes before announcements
   (*Defaults and holds*: development-process):
   `git -C <state folder> add <repo>/… && git -C <state folder>
   commit -m "YYYY-MM-DD-<topic>: plan-review" --
   <repo>/YYYY/MM-DD-<topic>/`. Verify scoped: status no
   longer lists the topic's paths; foreign dirty paths may remain — leave
   them (concurrent edits: the substrate contract).

5. **Relay the result.** On a code-repo topic, assert the project tree
   first: `git -C <checkout> status --short` → empty, or
   every entry named and
   justified in the relay (a lens agent's leftover scratch file is neither —
   remove it, and say so). A meta topic has no project checkout, so the
   assertion is
   **skipped, not failed**. Then, when the workflow returns its summary,
   report:
   - `changesApplied` — what was fixed in the plan.
   - `designDecisions` — multi-option calls the rewrite made on the
     user's behalf, with the alternatives not taken and the rationale.
     Surface these clearly; they are where the user is most likely to
     want to override.
   - `unresolved` — anything left flagged in the plan needing the user's
     product/domain input.
   - `droppedLenses` — every lens whose precondition failed, with the
     precondition. Relay these beside `skippedLenses`: a dimension that
     never ran is not a dimension that came back clean.
   - `unverifiedFindings` — findings the verifier could not check, dropped
     unchecked rather than judged false. Relay each; a run that returns
     any is not a clean run, and an empty `changesApplied` beside them
     means nothing was cleared.
   - `rewriteFailed` — present and true means the author never ran: the
     plan is untouched and every confirmed finding is still open. Say so
     and re-run; never report that pass as a review that found nothing.
   The returned summary is the convenient source, not the only one: the
   author writes every design decision into the plan as a `> Design
   decision:` note and every unresolved item as a `> Needs confirmation:`
   marker, so a truncated notification is recovered from the plan
   itself — `grep -n -e 'Design decision:' -e 'Needs confirmation:'
   <plan.md>` — never by digging the run's journal or output file.
   `changesApplied` is the diff below; `droppedLenses` was derived in
   step 3(d) before launch.
   Then hand over the post-hoc review surface with real refs (report
   rule: *Defaults and holds*): `git -C <state folder> diff
   <write-plan-sha> <plan-review-sha> -- <repo>/YYYY/MM-DD-<topic>/`
   (the whole topic folder — the rewrite may touch `plan.md` and
   `payloads/` both; both refs from `git -C <state folder> log
   --oneline -- <topic folder>`), and offer to adjust any design
   decision the user disagrees with.

   **Then put every surviving marker to the user — one question each.**
   A `> Needs confirmation:` marker is the rewrite author's record of a
   product or domain question it could not settle on the user's behalf,
   and the next session to read it is implement, which asks nothing: left
   standing, the topic spends its implementation on a guess the record
   itself flags as open, and review meets the question after the tokens
   are spent.

   **Trigger — the plan, not the summary.** The recovery grep above is
   what fires this beat: a marker it finds in `plan.md` is the trigger,
   and a non-empty `unresolved` is corroboration where a workflow ran.
   The plan is the durable source, and the summary field exists only on
   the workflow tier — a trigger keyed to it would never fire on the
   lightweight pass, whose steps 4–6 run unchanged. The grep's hits are
   **read, not counted**: a plan that discusses the marker in prose,
   and the null form `> **Needs confirmation:** none.`, are both hits
   and neither is a marker. The `Design decision:` term in that same
   command is what proves the matcher prints when the
   `Needs confirmation:` side comes back empty. **Never in the relay's
   turn** — a question bubble hides the prose printed beside it, so the
   relay lands first and the questions open the next turn.

   **Reconcile the summary against the markers** wherever a workflow
   ran: for each `designDecisions` entry one line-start `> Design
   decision:` note, and for each `unresolved` entry one line-start
   `> Needs confirmation:` marker, must exist in `plan.md`. A mismatch —
   a non-empty field with no marker of its kind — is the relay's own
   finding, never an all-clear: the relaying session writes the missing
   markers from the entry's text at the sites its notes name **before**
   the questions are put, so the union of the two channels fires — never
   the intersection, never either alone.

   One question through the question instrument per marker, one marker at a time, its options
   built from that marker's own text. The cap is four options and
   *Other* is always offered, so three slots are rule-fixed and one is
   not: the author's provisional choice comes first, labelled
   `(Recommended)` — it is what the plan already says — and the two
   standing exits come last, **defer to review** (the marker stands as
   it is) and **needs a define session** (the question is too open to
   implement around). The one middle slot goes to the best alternative
   the marker or its neighbouring `> Design decision:` note names. A
   marker naming no alternative asks the three; a marker naming several
   puts the rest in the question's text, where *Other* reaches them.

   **A ruling is written into the plan** — *as written* included: a
   ruling on an open question is a decision *added*, so it lands as the
   amendment marker the plan format already takes, on its own line
   directly beneath the marker it answers — `> **Amended (user,
   <YYYY-MM-DD>):**` plus the decision's final statement. That is the
   resolved-marker recognizer downstream: a marker is resolved iff an
   amendment marker follows it at the same site (review § Input, item
   3). *Defer to review* therefore writes nothing — leaving the marker
   unresolved is exactly what puts it in front of review. Then sweep
   the decision's footprint across the whole plan and every `payloads/`
   file, per the recipe write-plan § Task Structure carries; the sweep
   is this session's, because the workflow's amendment-ripple lens has
   already finished and will never see this marker. On an *as written*
   ruling the final statement is what the plan already states, so no
   site can carry a pre-amendment form and the sweep is one pass rather
   than a rewrite — it still runs. Where the topic has a `spec.md` and
   the ruling changes one of its decisions, the spec's dated amendment
   line lands under that entry too, in-session (define § The Spec) —
   the same duty write-plan § Task Structure states, with the reason
   it gives.

   **A *needs a define session* ruling closes the phase at define
   instead.** A product or domain question's home is `spec.md`, so the
   route derives to define (charter: *Iteration*), and the durable
   record is the iteration marker — `review.md` in the topic directory
   is its one home, whoever writes it (review § Iterate). No file yet →
   create it as the title line plus the marker; one exists → prepend
   the marker above its entries, title kept:

   ```markdown
   # <topic> — review

   Iteration — <YYYY-MM-DD> → define: <the question the marker asks>
   Unreviewed: none
   ```

   That `Unreviewed:` line is unconditional on every writer of the
   block: it names the close's own commits no pass covered (a lens
   pass's own fixes are the `Fixes applied (--fix):` line's, never this
   one — development-process § Process ground rules), and reads `none`
   where it committed none. This phase's own
   steps commit only in the state folder, so `none` is the ordinary case —
   but the machinery-edit duty is session-level, not phase-level (topic
   kinds: development-process § Topic kinds), so a session that did
   commit machinery refs — in one machinery tree or several —
   rides them here, marked per tree, rather than dropping them.

   Either outcome — a ruling written into `plan.md`, a marker'd
   `review.md`, or both — commits in the state folder as a follow-up
   `<topic ID>: plan-review`, staged and committed by explicit path —
   `git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/ && git -C
   <state folder> commit -m "<topic ID>: plan-review" --
   <repo>/YYYY/MM-DD-<topic>/`, the pathspec on the commit too, because
   concurrent sessions leave staged work a bare commit would sweep in
   (concurrent edits: the substrate contract). Either way that follow-up is
   the newest `<topic ID>: plan-review` commit over the folder with no
   `: write-plan` commit after it, so the hardened read stays green
   (step 4; roadmap contract: the operations contract, Status ladder); on
   the define route the stop is the iteration marker, which implement's
   readiness gate reads before the hardened read. Next Phase already
   sanctions later input landing as follow-up commits.
   **Default: every marker stands with the author's choice — review
   post-hoc at review's Input item 3** (*Defaults and holds*:
   development-process). The question instrument **unavailable** and the call
   **refused at the permission layer** are distinct cases and both
   defer-and-retry each turn, the ask counting as run if it lands before
   the close (fallback rule: same section); a close the ask never
   reached reports it as not-run and takes that default.

6. **Kaizen block:** invoke the `ymer:kaizen-capture` skill — source
   `plan_review`. Battery, row grammar, and the write live in that skill
   alone.

## Next Phase

Stop after relaying the result, and name the next phase, in a fresh
session: **implement** — or **define**, when step 5's ask returned
*needs a define session* and the iteration marker names it. The user
reviews the rewritten plan post-hoc via the relayed diff command; later
input lands as follow-up commits. Implementation never starts in this
session — it comes later, in its own session, from a clean tree and the
hardened plan.

## After the plan is implemented (downstream)

This skill hardens the *plan*. The *diff* gets its own adversarial pass
in review, the phase after implement — mechanics there (review's lens
pass, running this plugin's own **code-review** skill).

## Operational notes — failure modes

From real runs (2026-06/07):

- **Broad-mandate lenses stall at high effort** ("Stream idle timeout") — the
  binding constraint is mandate breadth at a given effort, not effort alone;
  narrow mandate + full-plan context + high effort completes.
- **A dead lens is indistinguishable from "no findings":** a stalled or killed
  review agent returns null and flows in as an all-clear. Before trusting a
  clean result, always check the summary's `skippedLenses`, `degradedLenses`,
  `droppedLenses` and `changesApplied`: a lens with a `failures` entry did not
  run, and a lens in `droppedLenses` never ran at all.
- **Recovery:** prefer `Workflow({scriptPath, resumeFromRunId})` for a run
  that died mid-flight — valid only while the plan file is unchanged since
  that run and agent opts are untouched (edited plan or retuned opts → run
  fresh, or harvest). When resume isn't possible, harvest completed agents
  from the run's `journal.jsonl` (`{"type":"result",…}` lines; dedupe by
  `.key` — resumes re-record cached results) and apply findings by hand,
  vetting each against verified facts before editing.
- **Session-limit kill:** TaskStop the workflow immediately — running agents
  keep burning budget; resume is same-session-only.
- **Prep that pays:** before launching, verify the plan's Create/Modify
  labels and anchors against the current tree, fix drift in the plan
  directly, then pass the result into `focus` as "pre-verified facts — do
  not re-flag" together with any user directives. Only stamped facts ride
  the list — each names its command with the observed result, an absence
  its `control:` — an unstamped "pre-verified" fact is not pre-verified
  and stays off.

## Tuning

The review lenses, their prompts, and the severity schema live in
`plan-review.workflow.js`. Edit that file to add a lens or sharpen one — the
skill instructions here stay stable.
