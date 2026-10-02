export const meta = {
  name: 'plan-review',
  description:
    'Adversarially review an implementation plan across multiple lenses, verify each finding against the codebase, then rewrite the plan in place with the confirmed fixes applied.',
  phases: [
    { title: 'Review', detail: 'one agent per lens, grounded in the plan + the actual codebase', model: 'sonnet' },
    { title: 'Verify', detail: 'adversarially confirm each finding against the codebase; drop false positives', model: 'sonnet' },
    { title: 'Rewrite', detail: 'one author applies the confirmed fixes directly to the plan file', model: 'opus' },
  ],
}

// ---------------------------------------------------------------------------
// Inputs (passed via the Workflow tool's `args`):
//   planPath : absolute path to the plan file to review and rewrite (required)
//   specPath : absolute path to the original spec/requirements, if separate (optional)
//   focus    : free-text emphasis for this run, e.g. "lean hard on security" (optional)
//   verifierCommand : the payload verifier's command line, resolved by the host — `sh <plugin root>/bin/payload-verify` plus one `--exempt <tree>` per machinery tree the front binds (required)
//
// NOTE: depending on the harness, the runtime may forward `args` either as a
// parsed object or as a JSON-encoded *string*. Normalize both shapes here so a
// stringified payload doesn't silently read every field as `undefined`.
// ---------------------------------------------------------------------------
let input = args || {}
if (typeof input === 'string') {
  try {
    input = input.length ? JSON.parse(input) : {}
  } catch (e) {
    throw new Error(`plan-review workflow received args as an unparseable string: ${input}`)
  }
}

const planPath = input && input.planPath
const specPath = (input && input.specPath) || null
const focus = (input && input.focus) || null
const verifierCommand = (input && input.verifierCommand) || null

// Derived facts about the plan, supplied by the host (the plan-review SKILL).
// Workflow scripts have no filesystem access, so the script cannot read the
// plan or the spec itself: every observable a lens precondition keys on has to
// arrive here. Each key is read off the plan document by a stated rule, never
// judged — the derivation table lives in plan-review/SKILL.md Steps §3.
//   hasCode              : the plan changes at least one non-prose source file
//   touchesConcurrency   : the plan names a process/concurrency construct
//   touchesTrustBoundary : the plan touches an external entry point, auth, or scoped data access
//   touchesPersistence   : the plan changes a migration/schema or runs a data transform
//   relocatesContent     : the plan relocates or deletes content-bearing files
//   recordsAmendment     : the plan records an amendment marker (read off plan.md alone)
//   companionSkill       : the coding-standards skill the plan header names, or null
//   glossaryPath         : the glossary that governs this plan (a meta topic's is the plugin's own)
//
// Why concurrency and security key on their own facts rather than on hasCode:
// the 07-27 evidence row is a mechanical namespace rename — real code, and both
// those lenses returned zero findings by construction (~160k tokens). hasCode
// cannot tell those two apart from a plan that spawns a GenServer or opens a
// route, so each keys on what its own body actually checks.
const facts = (input && input.facts) || {}

// `facts` is this script's whole trust boundary: it has no filesystem access, so
// every precondition arrives here unchecked, and Boolean(undefined) is false — an
// omitted key would silently drop its lens and report that omission exactly like a
// genuinely false precondition, a postcondition no reader can act on. So require
// every key explicitly and throw before anything spawns (this runs before
// phase('Review'), so the throw costs no tokens; the host re-invokes with a
// complete object). A missing key is not a fact "in doubt": doubt is resolved to
// true where the host derives the fact, and the key is still emitted.
const REQUIRED_BOOLEAN_FACTS = ['hasCode', 'touchesConcurrency', 'touchesTrustBoundary', 'touchesPersistence', 'relocatesContent', 'recordsAmendment']
const factErrors = REQUIRED_BOOLEAN_FACTS.filter((k) => typeof facts[k] !== 'boolean')
if (typeof facts.companionSkill !== 'string' && facts.companionSkill !== null) {
  factErrors.push('companionSkill (a string, or null when the plan header names none)')
}
if ('glossaryPath' in facts && typeof facts.glossaryPath !== 'string' && facts.glossaryPath !== null) {
  factErrors.push('glossaryPath (a string, null, or omitted)')
}
if (factErrors.length) {
  throw new Error(
    `plan-review workflow requires args.facts to carry every derived fact explicitly — missing or wrong-typed: ${factErrors.join(', ')}. Derive each per plan-review/SKILL.md Steps §3(b) and re-invoke; an omitted fact is not the same as a false one.`
  )
}

const glossaryPath = facts.glossaryPath || 'docs/glossary.md — unless the project CLAUDE.md says otherwise'

// The decision digest — SPEC-LEVEL ONLY (never the plan's own decisions: this
// skill reviews the plan, so plan-level decisions are precisely what is under
// review, and feeding them back as settled would turn an adversarial pass into
// a consistency check). Composed by the host, which can read files; the script
// cannot. Inline in every prompt rather than a path, because an agent cannot
// skip text already in its prompt.
const decisionDigest = (input && input.decisionDigest) || null
const digestBlock = decisionDigest
  ? `\nSETTLED — DO NOT RE-LITIGATE\n\n${decisionDigest}\n\nContradicting a settled decision requires arguing why the decision is wrong — otherwise do not report the contradiction.\n`
  : ''

if (!planPath) {
  throw new Error('plan-review workflow requires args.planPath (absolute path to the plan file).')
}

if (!verifierCommand) {
  throw new Error('plan-review workflow requires args.verifierCommand (the payload verifier command line: sh <plugin root>/bin/payload-verify plus one --exempt per machinery tree the front binds — plan-review/SKILL.md Steps §1).')
}

const specLine = specPath
  ? `The original spec/requirements live at: ${specPath} — read it and judge the plan against it.`
  : `Treat the plan's own Goal/Context/Requirements sections as the spec to judge against.`

const focusLine = focus ? `\nEXTRA EMPHASIS for this run: ${focus}\n` : ''

// Payloads live beside the plan, not in it (contract: the
// development-process skill's Artifacts section): every payload's
// bytes are a file under the topic's payloads/ directory, whatever
// its extent, with one payload gate per file in payloads/manifest.
// Agents Read them from disk selectively — never inlined here.
const payloadsLine = `\nThe plan's payloads are files in the payloads/ directory beside the plan file (payloads/<step-id>.<ext>; gates in payloads/manifest) — every payload, whatever its extent. They are part of the plan under review — Read the payload files your findings bear on.\n`

// Shared preamble every reviewer gets. Grounding rule is the whole game:
// a finding that isn't tied to a specific line of the plan or the codebase
// is noise, and the Verify phase will kill it.
const preamble = (lensTitle, lensBody) => `You are reviewing an implementation plan for the "${lensTitle}" dimension, BEFORE any code is written. The plan is a topic document in the state store; your job is to find what is wrong, missing, or under-specified in the PLAN so it does not produce bugs or gaps when implemented.

Plan to review: ${planPath}
${specLine}${focusLine}${payloadsLine}${digestBlock}

Steps:
1. Read the plan in full.
2. Read the actual codebase it touches — open the modules, schemas, tests and config the plan references, and grep for the patterns it assumes. Ground every finding in either a specific plan section or a real file:line. The repo's CLAUDE.md and README.md are the source of truth for conventions; module ownership lives in ${facts.companionSkill === 'elixir-coding-standards' ? "the app module's @moduledoc map (lib/<app>.ex) where the repo has migrated, else in README.md" : "README.md"} — read them.
3. Apply this lens:
${lensBody}

Report findings categorized by severity:
- critical: will cause a bug, data loss, security hole, or broken/incomplete feature if implemented as written
- important: architecture problem, missing step, unhandled case, test gap, or spec mismatch
- minor: style, naming, doc, or small optimization

For EACH finding give: a short title; severity; location (plan heading and/or file:line); the problem; why it matters; and a concrete fix expressed as the change to make to the PLAN. When a fix is a genuine design decision with more than one defensible option, list the other options in "alternatives" — do not silently collapse it to one.

Be specific and honest. If the plan is sound on this dimension, return few or no findings rather than inventing nitpicks. List notable strengths separately.`

const LENSES = [
  {
    key: 'completeness',
    title: 'Completeness vs. spec',
    body: `- Does the plan actually implement everything the spec/goal requires? Walk the spec point by point.
- Find missing steps, unhandled cases, and dangling references (a step that uses an artifact no earlier step creates).
- Find steps that assume state, files, migrations, or functions that the plan never establishes.
- Find acceptance criteria with no corresponding implementation step.
This is the single most common failure class — be exhaustive here.`,
  },
  // `correctness` was one lens covering logic + data-flow + concurrency +
  // migrations. At its full breadth it reliably stalled on "stream idle timeout"
  // even at medium effort (only low completed — sacrificing depth). Split into
  // three narrow-mandate lenses: each is a single coherent dimension, so it
  // completes at HIGH effort like the other narrow lenses, while still seeing
  // the whole codebase and free to report issues found anywhere.
  {
    key: 'correctness-logic',
    title: 'Correctness — logic, sequencing & data flow',
    requires: 'hasCode',
    requiresText: 'the plan changes at least one non-prose source file',
    body: `- Logic errors in the proposed approach: wrong ordering, off-by-one in a sequence of steps, incorrect assumptions about how existing code or libraries (Phoenix, Ecto, and the project's HTTP/MCP libraries) behave.
- Data-flow errors: a value produced in the wrong shape, a transformation that loses information, a pattern match that won't match, a return shape callers don't expect.
- You have the whole codebase — trace each step's inputs and outputs against the REAL functions it calls (open them), not just the plan's prose.`,
  },
  {
    key: 'correctness-concurrency',
    title: 'Correctness — concurrency & OTP',
    requires: 'touchesConcurrency',
    requiresText: 'the plan names a process or concurrency construct',
    body: `- Concurrency / process assumptions that don't hold: races, message-ordering, shared mutable state, GenServer/Task/Agent/supervision semantics, ETS, async-test interactions.
- Incorrect assumptions about how OTP, the BEAM, or a library's process model behaves.
- Global or singleton state (app env, registries, named processes) touched from concurrent paths without isolation or restoration.`,
  },
  {
    key: 'correctness-data-safety',
    title: 'Correctness — migrations & data safety',
    requires: 'touchesPersistence',
    requiresText: 'the plan changes a migration or schema, or runs a data transform',
    body: `- Migration steps that aren't reversible or would fail against existing data.
- Data backfills/transforms that could corrupt or lose rows, or that assume a clean slate.
- Ordering hazards between a schema change and the code that depends on it.`,
  },
  {
    key: 'architecture',
    title: 'Architecture & design',
    requires: 'hasCode',
    requiresText: 'the plan changes at least one non-prose source file',
    body: `- Coupling and single-responsibility: does any step give one action more than one owner, or duplicate a save/update/broadcast sequence across call sites instead of hoisting it into a context function?
- Does the design fit existing module ownership as defined in ${facts.companionSkill === 'elixir-coding-standards' ? "the app module's @moduledoc map (lib/<app>.ex), or in README.md where the repo has not migrated" : "README.md"}? Does it put logic in the wrong layer?
- Does it duplicate logic that already exists or should be shared?
- If the project exposes MCP tools, does the plan respect the project's established tool pipeline (schema → dispatch → validate → format layering) and keep persistence calls in context modules, out of the tool's action modules?
- Does it introduce a worse abstraction than the codebase already uses?`,
  },
  {
    key: 'security',
    title: 'Security',
    requires: 'touchesTrustBoundary',
    requiresText: 'the plan touches an external entry point, authorization, or scoped data access',
    body: `- Input validation at trust boundaries: are guards / validation specified where untrusted input enters? (Where the plan header names a coding-standards companion skill, read it — its trust-boundary rules are the binding rubric here.)
- Data isolation: determine from the project's README.md/CLAUDE.md whether it is multi-tenant or multi-user. If it is, verify every query/step scopes data to the right tenant/user and flag any step that could leak or cross-write across that boundary. If the project is single-tenant, skip this check — do not invent tenancy findings.
- Authorization: are permission checks specified for new actions/routes?
- Sobelow-class issues: SQL/command injection, unsafe rendering, secrets in code/config, mass-assignment.`,
  },
  {
    key: 'coding-standards',
    title: 'Coding standards & idioms',
    requires: 'companionSkill',
    requiresText: 'the plan header names a coding-standards companion skill',
    body: `- The plan header names its coding-standards companion skill: ${facts.companionSkill}. Read that skill — a coding-standards companion is the front's own, not this plugin's, so load it by that name the way the front loads its own skills, and if it will not load, say so in your findings rather than reviewing against a guessed rubric; read its siblings too where the plan touches what they cover (e.g. a diagrams file when the plan touches diagrams). That skill is your entire rubric; do not import rules from any other language's standards.
- Check the plan specifies every artifact that skill requires of a plan, and flag any plan step that prescribes something it forbids.
- Flag non-idiomatic patterns the plan would introduce, judged against that skill and against the sibling modules the plan sits beside — open them and compare.`,
  },
  {
    key: 'codebase-consistency',
    title: 'Codebase consistency',
    body: `- Read this project's CLAUDE.md and README.md and check the plan against the project's own rules: layering rules (e.g. where persistence calls are and are not allowed), shared-helper ownership (reserved names that must live in one module), required response conventions, and any hard blocks those files state. Flag any step that would violate them.
- Flag steps that diverge from the codebase's established naming and structure — open sibling modules doing similar work and compare (e.g. CRUD names where the codebase prefers add/remove/list).
- Flag tooling/config gotchas the plan ignores — the project's CLAUDE.md gotcha/testing sections usually list them (linter config merge behavior, security-scanner skip config, path-vs-hex dependency swaps).
- The glossary governing this plan is: ${glossaryPath}. When it exists, check the plan's vocabulary against it: flag names — in prose or code blocks — that use an _Avoid_ synonym instead of the canonical term, and any plan text that redefines a glossary term instead of pointing to the glossary.
- Prose claims embedded in planned content (moduledocs/docstrings, comments, Dockerfile/config comments, README fragments) are claims — verify each against the real codebase AND against the plan's own grounding facts; a conflict between the two is a finding.
- Payload prose destined for a project repository is written in the target file's frame — for the reader of that file, saying what the code does or why in terms a \`git log\` reader can act on — and carries no workflow-internal reference, in its literal or its placeholder spelling: a topic ID, a state-store path, an artifact basename, a step or task ID, a phase name, a decision or finding label. Provenance is the change described, never a pointer into the state store; a project repo has two sanctioned topic-ID sites, a remediation marker's \`plan:\` line and a redefinition-in-flight marker's topic ID. Targets in the state folder or a machinery tree are exempt — they talk about the process by right.
- the payload verifier already fails the token classes that have no reader-frame reading, so flag what it cannot see: a \`Step 3\` / \`Task 4\` / \`Plan 3a\` that means a plan's step rather than the target file's own numbering, provenance written as a pointer at the record of a change instead of as the change, and prose that is true and untokened yet only legible to someone holding the plan.`,
  },
  {
    key: 'dropped-content',
    title: 'Dropped content',
    requires: 'relocatesContent',
    requiresText: 'the plan relocates or deletes content-bearing files (docs, standing docs, comments, config/help prose)',
    body: `- The plan must carry a content-ownership map: one explicit disposition per content unit of the source files — a destination, or dropped with a why. A content-moving plan with no map is a critical finding: demand the map.
- Audit the map for totality against the SOURCE: open the files being moved or deleted and walk their content unit by unit — dropped is a destination, not an absence, so a unit with no row is a finding.
- Flag mixed rows: a row must be wholly placed or wholly dropped (granularity follows content, not files); a row that hides an operative rule — a safety warning, a behavioral constraint — inside a wholesale "archived"/"moved" disposition must split.
- "Dropped" means the content leaves every reachable surface of the project: archiving to a private repo the project never hands out counts as dropped, not placed.`,
  },
  {
    key: 'amendment-ripple',
    title: 'Amendment ripple',
    requires: 'recordsAmendment',
    requiresText: 'the plan records at least one amendment marker (line-start `> **Amended (` in plan.md)',
    body: `- The plan carries amendment markers: dated, attributed \`> **Amended (<source>, <date>):**\` notes recording decisions added, widened, or changed after plan text existed (grammar: write-plan's step-grammar extensions; term: the plugin's glossary file). Walk every marker. Markers are append-only: when several mark one decision, the latest (by date, then document order within a date) is authoritative — read every site against the latest statement.
- For each marker, sweep the decision's footprint across the WHOLE plan plus every payloads/ file, per the sweep skill: substring/stem content terms drawn from the decision's subject, synonyms and paraphrases included. A spec decision ID (a "D5"-style handle) is only ever an ADDITIONAL matcher term — the sites that omit the ID are exactly the ones an ID-only sweep misses. No disposition-based exemptions: "kept verbatim", "archived", and moved content sweep like everything else.
- Flag every site whose statement disagrees with the marker's final statement — including narrowing: after a scope reduction, a site still claiming the wider scope is a ripple hit.
- Severity: important by default; critical when the disagreement changes delivered content or behavior (a payload the implementer lands verbatim, a README or doc fragment, a gate's corpus or expected count).`,
  },
  {
    key: 'testability',
    title: 'Testability & verification',
    body: `- Does the plan specify tests, and do they test real logic rather than mocks?
- Are edge cases and failure paths covered? For bug fixes, is a red-green regression test specified?
- If there are schema changes: is there a migration test / rollback story?
- Does the plan say how each step is verified (e.g. mix precommit), so completion can be proven rather than assumed?
- Sweep/grep gates the plan embeds (rename gates, verification greps, ripple sweeps) are checked against the sweep skill's rules: substring/stem matcher rather than exact words, corpus repo-wide minus named exclusions rather than an allowlist of expected sites, synonym/paraphrase terms for meaning sweeps, and every gate falsifiable — expected survivors named (KEEP list), a paired non-zero assertion through the same matcher (named with its observed result) for a zero-hit gate, or before/after measurements bracketing one edit with a payload-derived delta for a delta gate. A bare zero-hit gate is an incomplete gate, not a stylistic choice (sweep rule 4): flag it, and name which of the three mechanisms the plan should have used.
- Verification realism — expectations must be measured, never typed (write-plan's Grounding): every Expected line and embedded gate carries its provenance — a grounding probe that ran, a delta derived from the task's own payload (sweep rule 4), a grounded absence, or a stamped baseline. Flag any expected value or count that traces to nothing. The mandated check is that provenance is PRESENT; re-deriving values yourself is at your discretion.
- Corpus scope is part of realism: a gate whose corpus is an allowlist of expected sites fails sweep rule 2 even when its provenance is present — provenance does not launder corpus scope. Flag the gate and name the whole-corpus-minus-named-exclusions form it should take.
- A planned "Expected: FAIL" whose tested target exists today must record the failure observed at authoring; a red that would pass today is a vacuous pass — the plan's premise is false — flag it for rewriting. A red guaranteed by a grounded absence (a target grounding proved absent) may derive instead of run.
- Steps whose checks discriminate only under a run condition (network, env vars, installed tools, time) must carry a discriminates-when line with its skip rule; a condition unmet at implement time is recorded as deferred, never as a pass.
- The literal marker "inferred:" surviving anywhere in the plan is an unresolved claim — write-plan grounding's duty was to resolve every inherited mark the plan relies on: probe it to a fresh stamp, or move it into the Assumptions block with impact-if-false. Flag each survivor and name its resolution path (register rules: the sweep skill's Claims section).`,
  },
]

const FINDINGS_SCHEMA = {
  type: 'object',
  required: ['findings'],
  additionalProperties: false,
  properties: {
    strengths: {
      type: 'array',
      description: 'Notable things the plan gets right on this dimension',
      items: { type: 'string' },
    },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'severity', 'location', 'problem', 'why', 'fix'],
        additionalProperties: false,
        properties: {
          title: { type: 'string' },
          severity: { type: 'string', enum: ['critical', 'important', 'minor'] },
          location: { type: 'string', description: 'Plan heading and/or file:line the finding concerns' },
          problem: { type: 'string', description: 'What is wrong, missing, or under-specified' },
          why: { type: 'string', description: 'The bug or gap it causes if implemented as written' },
          fix: { type: 'string', description: 'Concrete change to make to the PLAN' },
          alternatives: {
            type: 'array',
            description: 'Other defensible fixes when this is a genuine design decision with >1 option',
            items: { type: 'string' },
          },
        },
      },
    },
  },
}

const VERDICT_SCHEMA = {
  type: 'object',
  required: ['real', 'reasoning'],
  additionalProperties: false,
  properties: {
    real: {
      type: 'boolean',
      description: 'true ONLY if this is a genuine, currently-unaddressed problem in the plan. Default to false when uncertain.',
    },
    reasoning: { type: 'string' },
    refinedFix: { type: 'string', description: 'An improved or corrected fix, if the original can be sharpened' },
  },
}

const SUMMARY_SCHEMA = {
  type: 'object',
  required: ['changesApplied', 'designDecisions', 'unresolved'],
  additionalProperties: false,
  properties: {
    changesApplied: {
      type: 'array',
      description: 'Each fix applied to the plan, one line each',
      items: { type: 'string' },
    },
    designDecisions: {
      type: 'array',
      description: 'Multi-option calls made on the user\'s behalf during the rewrite',
      items: {
        type: 'object',
        required: ['decision', 'chosen', 'alternatives', 'rationale'],
        additionalProperties: false,
        properties: {
          decision: { type: 'string' },
          chosen: { type: 'string' },
          alternatives: { type: 'array', items: { type: 'string' } },
          rationale: { type: 'string' },
        },
      },
    },
    unresolved: {
      type: 'array',
      description: 'Anything genuinely needing the user\'s product/domain input — left flagged in the plan, not guessed',
      items: { type: 'string' },
    },
  },
}

const verifyPrompt = (f) => `You are an adversarial verifier. A reviewer claims the following problem exists in the implementation plan at ${planPath}. Your job is to REFUTE it: open the plan and the actual codebase and check whether this is a genuine, currently-unaddressed problem. The plan or the codebase may already handle it; the reviewer may have misread; the claim may be a nitpick dressed as a defect.
${specLine}${focusLine}${payloadsLine}${digestBlock}

CLAIM
  title:    ${f.title}
  severity: ${f.severity}
  location: ${f.location}
  problem:  ${f.problem}
  why:      ${f.why}
  fix:      ${f.fix}

Any probe you run writes only under the session scratchpad — never a file under the project checkout, never a *_test.exs in its test/ tree, and no git (no checkout, stash, reset or commit): the checkout is a live tree another session may be mid-close on.
Read the relevant plan section and the real files before deciding. Set real=true ONLY if the problem genuinely stands after you checked. Default to real=false when you cannot confirm it. If the fix is right in spirit but imprecise, return a refinedFix.`

const rewritePrompt = (findings) => `You are the author of the implementation plan at ${planPath}. A multi-lens review has produced the confirmed findings below (already verified against the codebase). Rewrite the plan IN PLACE so every confirmed finding is resolved, while keeping the plan coherent, well-structured, and in the same format and voice it already uses. Follow the write-plan skill's conventions — invoke the \`ymer:write-plan\` skill and read it — and, when the plan header names a coding-standards companion skill (${facts.companionSkill || 'this plan names none'}), that skill's conventions too, loaded by that name the way the front loads its own skills — and where it will not load, say so rather than guessing its rules.
${payloadsLine}
Rules:
- Edit the file at ${planPath} directly with Edit/Write — and, where a confirmed fix changes payload bytes or gates, edit the payload files and manifest in the payloads/ directory beside it. Do NOT create a separate review file and do NOT just append a notes section in place of fixing the body — fold the fixes into the actual plan.
- If any step of the plan carries a "Payload:" reference line, close by running the payload verifier on the directory holding ${planPath} — \`${verifierCommand} <that directory>\`: nothing is implemented yet, so a correctly-authored plan reports every gate PENDING and exits 0. Exit 2 means your edit desynced plan.md and payloads/manifest — a gate whose checkbox or payload file is gone, a malformed line — or that a payload bound for a project repo carries a workflow-internal reference; exit 1 means a payload already sits in its target (the vacuous-payload case) — or, on a re-plan whose carried steps keep their ticks, a count gate short with every gate box ticked: an occurrence a payload-less step would add by hand, which needs a gate of its own. Fix whichever it names and re-run before returning. A plan whose steps carry no "Payload:" line authored no payload at all — deletions, commands, and behavior only — so there is nothing to verify, and never a reason to author an empty manifest.
- Apply every confirmed fix. Where a finding lists "alternatives", it is a genuine design decision: pick the option best supported by this codebase's conventions (CLAUDE.md / README.md) and the plan's named coding-standards companion skill where it names one, apply it, and record it under designDecisions with the alternatives you did not take and your rationale.
- Record every design decision in the PLAN itself, not only in your return value: next to the step it affects, add a \`> Design decision: <what you chose> — <the alternatives you did not take> — <why>\` note. The structured designDecisions field is relayed in this session only and does not survive to later phases; the note in the plan does, and downstream reviews read it as settled rather than re-litigating it. Return the same decisions under designDecisions as well.
- When an applied fix changes a decision's scope or statement, sweep the fix's footprint before returning: search the whole plan plus every payloads/ file for the decision's subject (substring/stem terms, synonyms included — the sweep skill) and revisit each hit so no site still states the pre-fix form. Your notes stay \`> Design decision:\` — never write \`> **Amended (\` markers: that grammar records plan amendments and belongs to the plan author (write-plan).
- If a decision genuinely requires the user's product/domain judgment and cannot be resolved from the codebase or guidelines, do NOT guess silently: make the most reasonable choice, mark the spot clearly in the plan (a short "> Needs confirmation:" note), and list it under "unresolved".
- Preserve everything the plan already gets right. Do not regress working sections.
- Do NOT run git. Do not commit, stage, or branch. Just edit the file.

CONFIRMED FINDINGS (JSON):
${JSON.stringify(findings, null, 2)}

Return the structured summary of what you changed.`

// Run one review lens at HIGH effort (full depth is the default), falling back
// to MEDIUM if it stalls (the idle-timeout failure mode). A lens that dies at
// both is recorded as 'skipped' so it surfaces as NOT REVIEWED rather than
// silently flowing in as zero findings (a false all-clear). lensStatus is a
// plain closure array — workflow orchestration is single-threaded async, so the
// pushes from concurrent stages are safe.
const lensStatus = []

// Failure counters and the circuit breaker. agent() returns null for BOTH a
// user skip and a terminal error after retries — indistinguishable at the call
// site per the Workflow contract — and workflow scripts cannot call Date.now()
// or new Date() (they throw, to keep resume deterministic), so there is no
// elapsed-time proxy for stall-vs-error either. What discriminates is
// recurrence: a run-terminal error kills every agent, so failures keep coming;
// a genuine stall does not recur.
//
// Two counters, because they arrive at different points in a lens's life and
// do different jobs:
//   earlyFailures — lenses that failed at HIGH effort. Incremented
//     synchronously, at each lens's own high-effort failure, BEFORE that lens
//     issues its medium retry, which is the only way the signal arrives in time
//     to stop the retries at all (pipeline starts every lens at once). The
//     first two high-effort failures still retry at medium — that is the
//     documented, recoverable stall — and every later one is skipped, capping
//     the burn at 2 medium retries instead of the whole roster.
//   doubleFailures — lenses that failed at BOTH efforts. It cannot gate the
//     retries: it needs a second full round trip per lens, by which time every
//     other lens has already issued its own. It is the run-level stop signal —
//     at two, the ladder closes and any lens not yet started is skipped.
let earlyFailures = 0
let doubleFailures = 0
let ladderOpen = true

async function runReviewLens(lens) {
  if (!ladderOpen) {
    log(`⏭️ ${lens.key} SKIPPED — circuit breaker tripped before it started`)
    lensStatus.push({ key: lens.key, status: 'skipped' })
    return { lens, review: null }
  }

  let degraded = false

  // Model tiers (2026-07-17 cost tuning): review + verify run on sonnet —
  // narrow-mandate find/check work at high effort; the single rewrite author
  // runs on opus. Agents otherwise inherit the session model, which on a
  // fable session priced the fan-out out of the token budget.
  let review = await agent(preamble(lens.title, lens.body), {
    label: `review:${lens.key}`,
    phase: 'Review',
    schema: FINDINGS_SCHEMA,
    effort: 'high',
    model: 'sonnet',
  })

  if (!review) {
    earlyFailures += 1
    if (earlyFailures > 2) {
      log(`⏭️ ${lens.key} not retried at medium — 2 lenses already failed at high effort this run (the run-terminal-error signature)`)
      lensStatus.push({ key: lens.key, status: 'skipped' })
      return { lens, review: null }
    }
    degraded = true
    log(`${lens.key} stalled at high effort — retrying at medium`)
    review = await agent(preamble(lens.title, lens.body), {
      label: `review:${lens.key} (medium retry)`,
      phase: 'Review',
      schema: FINDINGS_SCHEMA,
      effort: 'medium',
      model: 'sonnet',
    })
  }

  if (!review) {
    doubleFailures += 1
    log(`⚠️ ${lens.key} FAILED at both high and medium — NOT REVIEWED (dimension uncovered this run)`)
    if (doubleFailures >= 2 && ladderOpen) {
      ladderOpen = false
      log(
        `🛑 Circuit breaker tripped: ${doubleFailures} lenses failed at both efforts. This is the run-terminal-error signature (a genuine stall does not recur) — any lens not yet started is skipped, unreviewed. Lenses already in flight carry their own cap: at most 2 medium retries per run.`
      )
    }
    lensStatus.push({ key: lens.key, status: 'skipped' })
    return { lens, review: null }
  }

  lensStatus.push({ key: lens.key, status: degraded ? 'degraded' : 'ok' })
  return { lens, review }
}

// --- Applicability gate: drop lenses whose precondition fails, BEFORE spawning.
// The set of dropped lenses is derived from the declarations above — there is no hand-maintained
// list, and a lens added later carries its own applicability. A dropped lens is
// reported with the precondition that failed, never silently (charter: Review
// effort).
const applicable = LENSES.filter((l) => !l.requires || Boolean(facts[l.requires]))
const droppedLenses = LENSES.filter((l) => l.requires && !facts[l.requires]).map((l) => ({
  key: l.key,
  precondition: l.requiresText,
}))

if (droppedLenses.length) {
  log(`Dropped (precondition failed): ${droppedLenses.map((d) => `${d.key} — ${d.precondition}`).join('; ')}`)
}
log(`Roster (${applicable.length}): ${applicable.map((l) => l.key).join(', ')}`)

if (!applicable.length) {
  log('⚠️ No applicable lenses — the plan was NOT reviewed this run.')
  return {
    changesApplied: [],
    designDecisions: [],
    unresolved: [],
    skippedLenses: [],
    degradedLenses: [],
    droppedLenses,
    note:
      'No lens precondition held, so no dimension was reviewed. This is NOT an all-clear — check the derived facts the host passed in.',
  }
}

// --- Review -> Verify, pipelined so each lens's findings verify as soon as
// that lens finishes (no barrier between the two phases). ---
phase('Review')
const reviewed = await pipeline(
  applicable,
  (lens) => runReviewLens(lens),
  ({ lens, review }) =>
    parallel(
      ((review && review.findings) || []).map((f) => () =>
        agent(verifyPrompt(f), { label: `verify:${lens.key}`, phase: 'Verify', schema: VERDICT_SCHEMA, model: 'sonnet' }).then(
          (v) => ({ ...f, lens: lens.key, verdict: v })
        )
      )
    )
)

const verified = reviewed.flat().filter(Boolean)

// A verifier that returned null is a finding NOT CHECKED — agent() gives the
// same null for a user skip and a terminal error, so a Verify-stage outage
// would otherwise drop every finding into the `real === false` bucket and the
// run would report "no confirmed issues": the same false all-clear the lens
// ladder above refuses to produce. Dropped findings stay dropped (an
// unverified claim is not a confirmed one), but they are counted and named.
const unverified = verified.filter((f) => !f.verdict)

const confirmed = verified
  .filter((f) => f.verdict && f.verdict.real)
  .map((f) => ({ ...f, fix: (f.verdict && f.verdict.refinedFix) || f.fix }))

// Dedup findings that multiple lenses surfaced at the same place.
const seen = new Set()
const deduped = confirmed.filter((f) => {
  const k = (String(f.location) + '|' + String(f.title)).toLowerCase()
  if (seen.has(k)) return false
  seen.add(k)
  return true
})

const counts = deduped.reduce((acc, f) => ({ ...acc, [f.severity]: (acc[f.severity] || 0) + 1 }), {})
log(`Verified findings: ${deduped.length} (critical:${counts.critical || 0} important:${counts.important || 0} minor:${counts.minor || 0})`)

// Surface any lens that did not run cleanly so its dimension is not mistaken for
// "clean." `skipped` means that dimension was NOT reviewed this run.
const skippedLenses = lensStatus.filter((s) => s.status === 'skipped').map((s) => s.key)
const degradedLenses = lensStatus.filter((s) => s.status === 'degraded').map((s) => s.key)
if (skippedLenses.length) log(`⚠️ NOT REVIEWED (lens failed): ${skippedLenses.join(', ')}`)
if (degradedLenses.length) log(`Reviewed at reduced effort: ${degradedLenses.join(', ')}`)

const unverifiedFindings = unverified.map((f) => `${f.lens}: ${f.title}`)
if (unverifiedFindings.length) {
  log(
    `⚠️ NOT VERIFIED (the verifier failed, so these were dropped unchecked — not judged false): ${unverifiedFindings.join('; ')}`
  )
}

if (deduped.length === 0) {
  log('No confirmed issues — plan left unchanged.')
  return {
    changesApplied: [],
    designDecisions: [],
    unresolved: [],
    skippedLenses,
    degradedLenses,
    droppedLenses,
    unverifiedFindings,
    note: [
      'No confirmed issues — the plan was not modified.',
      skippedLenses.length > 0
        ? `BUT these dimensions were NOT reviewed (lens failed even at medium): ${skippedLenses.join(', ')}. Do not read this as all-clear; re-run those lenses.`
        : '',
      unverifiedFindings.length > 0
        ? `BUT ${unverifiedFindings.length} finding(s) were dropped unverified (the verifier failed on them), so "no confirmed issues" is not "no issues": ${unverifiedFindings.join('; ')}. Re-run.`
        : '',
    ]
      .filter(Boolean)
      .join(' '),
  }
}

// --- Rewrite: one author applies all confirmed fixes to keep the plan coherent. ---
phase('Rewrite')
const summary = await agent(rewritePrompt(deduped), {
  label: 'rewrite-plan',
  phase: 'Rewrite',
  schema: SUMMARY_SCHEMA,
  model: 'opus',
})

const tail = {
  verifiedFindingCount: deduped.length,
  severityCounts: counts,
  skippedLenses,
  degradedLenses,
  droppedLenses,
  unverifiedFindings,
}

// The author failed (a skip or a terminal error — agent() returns null for
// both). Spreading that null would return an empty summary, which reads
// exactly like a run that had nothing to apply: say instead that the plan is
// untouched and every confirmed finding is still open.
if (!summary) {
  log(`🛑 The rewrite author failed — the plan was NOT modified; ${deduped.length} confirmed finding(s) are unapplied.`)
  return {
    ...tail,
    changesApplied: [],
    designDecisions: [],
    unresolved: [],
    rewriteFailed: true,
    note: `The rewrite author failed, so NOT ONE confirmed fix was applied and ${planPath} is unchanged. ${deduped.length} confirmed finding(s) are still open — re-run the skill.`,
  }
}

return { ...summary, ...tail }
