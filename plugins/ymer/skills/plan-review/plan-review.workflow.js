export const meta = {
  name: 'plan-review',
  description:
    'Adversarially review an implementation plan across multiple lenses, verify each finding against the codebase, then rewrite the plan in place with the confirmed fixes applied.',
  phases: [
    { title: 'Review', detail: 'one agent per lens, grounded in the plan + the actual codebase', model: 'sonnet' },
    { title: 'Verify', detail: 'adversarially confirm each finding against the codebase; drop false positives', model: 'sonnet' },
    { title: 'Rewrite', detail: 'one rewrite author applies the confirmed fixes directly to the plan file', model: 'opus' },
  ],
}

// ---------------------------------------------------------------------------
// Inputs (passed via the Workflow tool's `args`):
//   planPath        : absolute path to the plan file to review and rewrite (required)
//   specPath        : absolute path to the original spec/requirements, if separate (optional)
//   focus           : free-text emphasis for this run, on one line (optional)
//   verifierCommand : the payload verifier's command line, resolved by the host: `sh <plugin root>/scripts/payload-verify` plus one `--exempt <tree>` per machinery tree the front binds (required)
//   promptDir       : absolute path to the directory holding this script's agent-prompt files, `<plugin root>/skills/plan-review` or a scratchpad copy of the plugin tree laid out the same way (required)
//   facts           : the derived facts, below (required)
//   decisionDigest  : the copied spec.md sections, the topic's own and its parent topic's, or omitted when there is no spec on either side (optional)
//
// `args` may arrive as a parsed object or as a JSON-encoded string; a string
// is parsed here so that no field silently reads as `undefined`.
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
const promptDir = ((input && input.promptDir) || '').replace(/\/+$/, '')

// Derived facts about the plan, supplied by the host (the plan-review skill).
// Workflow scripts have no filesystem access, so the script cannot read the
// plan or the spec itself: every observable a lens precondition keys on has to
// arrive here. Each key is read off the plan by a stated rule, never judged;
// the derivation table lives in the plan-review skill, § Facts and Tier.
//   hasCode              : the plan changes code or configuration, not only prose
//   touchesConcurrency   : the plan adds or changes a process or concurrency construct
//   touchesTrustBoundary : the plan changes an external entry point, auth, or scoped data access
//   touchesPersistence   : the plan changes a data-at-rest schema or migration, or runs a data transform
//   relocatesContent     : a content unit can lose its home (a move, a delete, a whole rewrite)
//   recordsAmendment     : the plan records an amendment marker (read off plan.md alone)
//   companionSkill       : the coding-standards skill the plan header names, or null
//   glossaryPath         : the glossary that governs this plan (a meta topic's is the plugin's own)
//
// Why concurrency and security key on their own facts rather than on hasCode:
// the 07-27 evidence row is a mechanical namespace rename, real code, and both
// those lenses returned zero findings by construction (~160k tokens). hasCode
// cannot tell those two apart from a plan that starts a long-lived process or
// opens a route, so each keys on what its own lens actually checks.
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
    `plan-review workflow requires args.facts to carry every derived fact explicitly — missing or wrong-typed: ${factErrors.join(', ')}. Derive each per the plan-review skill, § Facts and Tier, and re-invoke; an omitted fact is not the same as a false one.`
  )
}

const glossaryPath = facts.glossaryPath || 'docs/glossary.md — unless the project CLAUDE.md says otherwise'

// The decision digest — SPEC-LEVEL ONLY (never the plan's own decisions: this
// skill reviews the plan, so plan-level decisions are precisely what is under
// review, and feeding them back as settled would turn an adversarial pass into
// a consistency check). Composed by the host, which can read files; the script
// cannot. Inline in every lens and verifier dispatch rather than a path, because
// an agent cannot skip text already in its prompt. The rule that travels with it
// is in the reviewer and verifier prompt files.
const decisionDigest = (input && input.decisionDigest) || null

if (!planPath) {
  throw new Error('plan-review workflow requires args.planPath (absolute path to the plan file).')
}

if (!verifierCommand) {
  throw new Error('plan-review workflow requires args.verifierCommand (the payload verifier command line: sh <plugin root>/scripts/payload-verify plus one --exempt per machinery tree the front binds — the plan-review skill, § Input).')
}

// The agent prompts are files beside this script (reviewer.md, verifier.md,
// rewrite-author.md, lenses/<key>.md), Read by each agent from promptDir. The
// plugin root they read their shared homes under is promptDir's grandparent,
// so promptDir must keep the plugin tree's own layout.
const PROMPT_SUFFIX = '/skills/plan-review'
if (!promptDir || !promptDir.endsWith(PROMPT_SUFFIX)) {
  throw new Error(`plan-review workflow requires args.promptDir: the absolute path of the directory holding its prompt files, ending in ${PROMPT_SUFFIX} (the plugin tree's own layout, or a scratchpad copy of it) — the plan-review skill, § Input.`)
}
const pluginRoot = promptDir.slice(0, -PROMPT_SUFFIX.length)

// Every agent gets the same shape of dispatch: the prompt files to Read, which
// carry its whole instruction, then the run data as a block appended after
// them, never interpolated into the prompt text. The rewrite author's run data
// carries no spec, glossary or settled digest, as before the prompts left this
// script: it applies findings a verifier already confirmed, and its prompt file
// names the lines it gets. Where the host spawns the agents itself, it composes
// the same text from mechanics.md § The Run's dispatch block: change the two together.
const runData = (extra, review = true) =>
  [
    `Plan: ${planPath}`,
    review && `Spec: ${specPath || 'none'}`,
    `Payloads: the payloads/ directory beside the plan; gates in payloads/manifest`,
    `Plugin root: ${pluginRoot}`,
    `Companion skill: ${facts.companionSkill || 'none'}`,
    review && `Glossary: ${glossaryPath}`,
    `Focus: ${focus || 'none'}`,
    ...extra,
    review && decisionDigest ? `\nSETTLED — DO NOT RE-LITIGATE\n\n${decisionDigest}` : '',
  ]
    .filter(Boolean)
    .join('\n')

const dispatch = (files, extra, review = true) => `Read each file below in full, then follow it: together they are your whole instruction, and the run data after them is what this run gives you.
${files.map((f) => `- ${promptDir}/${f}`).join('\n')}

If any of these files will not Read, do nothing else: return promptUnreadable set to the path that failed, with every other required field at its empty value (findings an empty list; real false and reasoning empty; the summary's three lists empty), and never leave promptUnreadable out, because work done without your instructions would read as a clean pass.

RUN DATA
${runData(extra, review)}`

const PROMPT_UNREADABLE = {
  type: 'string',
  description: 'Set only when a prompt file would not Read: the path that failed. Every other required field is then left at its empty value, and nothing else is done.',
}

const LENSES = [
  {
    key: 'completeness',
    title: 'Completeness vs. spec',
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
    requiresText: 'the plan changes code or configuration, not only prose',
  },
  {
    key: 'correctness-concurrency',
    title: 'Correctness — concurrency & the process model',
    requires: 'touchesConcurrency',
    requiresText: 'the plan adds or changes a process or concurrency construct',
  },
  {
    key: 'correctness-data-safety',
    title: 'Correctness — migrations & data safety',
    requires: 'touchesPersistence',
    requiresText: 'the plan changes a data-at-rest schema or migration, or runs a data transform',
  },
  {
    key: 'architecture',
    title: 'Architecture & design',
    requires: 'hasCode',
    requiresText: 'the plan changes code or configuration, not only prose',
  },
  {
    key: 'security',
    title: 'Security',
    requires: 'touchesTrustBoundary',
    requiresText: 'the plan changes an external entry point, authorization, or scoped data access',
  },
  {
    key: 'coding-standards',
    title: 'Coding standards & idioms',
    requires: 'companionSkill',
    requiresText: 'the plan header names a coding-standards companion skill',
  },
  {
    key: 'codebase-consistency',
    title: 'Codebase consistency',
  },
  {
    key: 'dropped-content',
    title: 'Dropped content',
    requires: 'relocatesContent',
    requiresText: 'the plan relocates, deletes or rewrites whole a content-bearing file or section (docs, standing docs, comments, config/help prose)',
  },
  {
    key: 'amendment-ripple',
    title: 'Amendment ripple',
    requires: 'recordsAmendment',
    requiresText: 'the plan records at least one amendment marker (line-start `> **Amended (` in plan.md)',
  },
  {
    key: 'testability',
    title: 'Testability & verification',
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
    promptUnreadable: PROMPT_UNREADABLE,
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
    promptUnreadable: PROMPT_UNREADABLE,
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
    promptUnreadable: PROMPT_UNREADABLE,
  },
}

const lensDispatch = (lens) => dispatch(['reviewer.md', `lenses/${lens.key}.md`], [])

const claimData = (f) => [
  '',
  'CLAIM',
  `  title:    ${f.title}`,
  `  severity: ${f.severity}`,
  `  location: ${f.location}`,
  `  problem:  ${f.problem}`,
  `  why:      ${f.why}`,
  `  fix:      ${f.fix}`,
]
const verifyDispatch = (f) => dispatch(['verifier.md'], claimData(f))

const rewriteDispatch = (findings) =>
  dispatch(['rewrite-author.md'], [
    `Verifier command: ${verifierCommand}`,
    '',
    'CONFIRMED FINDINGS (JSON):',
    JSON.stringify(findings, null, 2),
  ], false)

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
  let review = await agent(lensDispatch(lens), {
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
    review = await agent(lensDispatch(lens), {
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

  // A lens that could not Read its prompt files reviewed nothing: it is
  // skipped, never a lens that came back clean.
  if (review.promptUnreadable) {
    log(`⚠️ ${lens.key} could not Read ${review.promptUnreadable} — NOT REVIEWED`)
    lensStatus.push({ key: lens.key, status: 'skipped' })
    return { lens, review: null }
  }

  lensStatus.push({ key: lens.key, status: degraded ? 'degraded' : 'ok' })
  return { lens, review }
}

// --- Applicability gate: drop lenses whose precondition fails, BEFORE spawning.
// The set of dropped lenses is derived from the declarations above — there is no hand-maintained
// list, and a lens added later carries its own applicability. A dropped lens is
// reported with the precondition that failed, never silently (the process
// contract, § Review effort).
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
        agent(verifyDispatch(f), { label: `verify:${lens.key}`, phase: 'Verify', schema: VERDICT_SCHEMA, model: 'sonnet' }).then(
          // A verifier that could not Read its prompt checked nothing: its
          // verdict counts as missing, the same as a failed verifier.
          (v) => ({ ...f, lens: lens.key, verdict: v && !v.promptUnreadable ? v : null })
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
const refutedFindingCount = verified.filter((f) => f.verdict && !f.verdict.real).length

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
    refutedFindingCount,
    note: [
      'No confirmed issues — the plan was not modified.',
      skippedLenses.length > 0
        ? `BUT these dimensions were NOT reviewed (lens failed even at medium, or could not Read its prompt): ${skippedLenses.join(', ')}. Do not read this as all-clear; re-run those lenses.`
        : '',
      unverifiedFindings.length > 0
        ? `BUT ${unverifiedFindings.length} finding(s) were dropped unverified (the verifier failed on them), so "no confirmed issues" is not "no issues": ${unverifiedFindings.join('; ')}. Re-run.`
        : '',
    ]
      .filter(Boolean)
      .join(' '),
  }
}

// --- Rewrite: one rewrite author applies all confirmed fixes to keep the plan coherent. ---
phase('Rewrite')
const summary = await agent(rewriteDispatch(deduped), {
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
  refutedFindingCount,
}

// The rewrite author failed (a skip or a terminal error — agent() returns null for
// both — or a prompt file it could not Read). Spreading that would return an
// empty summary, which reads exactly like a run that had nothing to apply: say
// instead that the plan is untouched and every confirmed finding is still open.
if (!summary || summary.promptUnreadable) {
  const why = summary ? `could not Read ${summary.promptUnreadable}` : 'failed'
  log(`🛑 The rewrite author ${why} — the plan was NOT modified; ${deduped.length} confirmed finding(s) are unapplied.`)
  return {
    ...tail,
    changesApplied: [],
    designDecisions: [],
    unresolved: [],
    rewriteFailed: true,
    note: `The rewrite author ${why}, so NOT ONE confirmed fix was applied and ${planPath} is unchanged. ${deduped.length} confirmed finding(s) are still open — re-run the skill.`,
  }
}

return { ...summary, ...tail }
