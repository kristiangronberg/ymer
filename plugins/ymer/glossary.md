# The core glossary

Canonical vocabulary for the core plugin's skills themselves — the terms
these skill files (`tutor`, `implement`, `plan-review`, …) use to
describe the pipeline and its phases. Skill prose uses these terms and points
here; it never redefines them. `_Avoid_` synonyms are banned in new skill prose.
Skills name this file **the plugin glossary**; its one resolvable address
is `${CLAUDE_PLUGIN_ROOT}/glossary.md`.

This is the **process** glossary. It is distinct from each project
repo's **domain** glossary (`docs/glossary.md` unless the repo's CLAUDE.md
says otherwise; maintained by the define phase), which holds that
project's domain terms and by rule excludes general process vocabulary.
Process terms live here; domain terms live there.

This glossary describes what is: an entry is written when the thing its
term names is real — that check is the **referent gate**, and it governs
this glossary as much as a project's. A `Redefinition in flight — <date>
→ <topic ID>:` line under a term head — the **redefinition-in-flight
marker** — means a topic is changing that definition; what stands below
it is still the current one.

## A

### amendment marker
The dated, attributed note recording an amendment — a decision added,
widened, or changed after the artifact that owns it exists:
`> **Amended (<source>, <date>):**` plus the decision's final
statement, placed at the decision's home site — a step or decision site
in `plan.md`, or the decision's entry under `spec.md`'s `## Decisions`.
The source is the user for a ruling, the session otherwise.
Append-only, and a later marker on the same decision supersedes the
earlier — the latest statement is what ripple checks read sites against.
One shape, two homes: the plan side's is write-plan's Task Structure,
the spec side's define § The Spec.
_Avoid_: Confirmed note, amendment note, decision marker

### anchor
A piece of provenly known ground — something the knowledge docs record the
learner can already do — that the tutor drops to and bridges up from when a
climb stalls on missing background. Distinct from write-plan's line-level
anchors (the file references grounding a plan).

### annotate item
The roadmap/inbox operation that appends new evidence to an open item,
status untouched. Home: the operations contract's operations table;
discipline (register on appended evidence, looks 2–3): the mint skill.
_Avoid_: update item, amend task

### arc
An engagement's station sequence as held in the engagement doc: titles,
goals, and fit to the goal contract written at the opening; each station's
detail fleshed out just-in-time at the sitting that runs it.

### arrival
One of the seven shapes topic resolution lands on when it reads a topic's
task status, folder, `review.md`'s first recognizer and the heads of
`brainstorm.md` and `spec.md` at a phase's opening — inbox item, split
child, in flight, iteration, live marker naming another phase, pending
interview, closed topic — which decides the phase's first action without
a question.
_Avoid_: entry state, arrival shape, case (for the shape)

### as-of
The literal token an already-measured fact carries when not re-verified
at the moment of use: `as-of <basis>`, the basis being the axis whose
movement invalidates the claim — SHA, version, date. Under
dates-inherit, stating an older basis is itself the staleness
acknowledgment; a re-verified fact gets a fresh stamp instead. Home:
the sweep skill's Claims section.

### autotelic
A product stance: the experience is the point — the user's goal does not
lie beyond the artifact (games, art). Chosen difficulty is legitimate
product, not friction to remove; the counterpart stance is instrumental.
_Avoid_: games/art exception

## B

### backlog
Defined in the `kaizen-capture` skill, its one home.
_Avoid_: improvements pool (retired with the two-file store), staging

### binding
The mapping from the contract's names to one environment's facts: each
roadmap/inbox operation (look up topic, search pool, list inbox items,
read item, mint item, annotate item, start topic, order topics, ship
topic, retire topic, resolve item) to the backend's tool and outcome —
the transition or group as a word, the postcondition and the read-back,
never a call
shape — and each environment-contract role to its value. A **binding
home** is where a binding lives, one per role by its binding kind
(→ environment contract). This suite's binding home for the operations
and for the front-instructions roles is the state folder's README, its
Binding section; the shipped home is the operations contract. Skills
speak only operations and roles — never a backend's call shape, never a
role's value — so a backend or environment swap edits the binding
alone; the shapes are the server's, read from its help at the moment of
the call.
_Avoid_: mapping, adapter, backend config, environment block (as a term)

### blocking gap
A prerequisite-check disposition: a subject gap that would leave the
shipped result inoperable by the user — below the operator bar for
guiding or troubleshooting it. Minted as a learning task with a
dependency edge to the topic it blocks, reason on the edge; the one
edge the check itself records. Expected rare.

### branch intake
Brainstorm's opening move on a code-repo topic: the current non-main branch
is detected as the proposed sketch source, confirmed together with any
matching inbox item as one discovered set, and captured into
`sketch.md` (combined diff plus commit log).
_Avoid_: sketch intake (that is the branchless working-tree flow)

## C

### call shape
The parameter form of one call to an action of a served tool surface
(an MCP tool, say) — the parameter names, any wrapper, the enum literals
in call form, and the response's field names. Homed in the server's own
guidance — its help, and the hints its responses carry — at the moment
of the call; a consumer of the surface names the tool and action and
states intent, postcondition and read-back, never the shape.
_Avoid_: grammar (for this concept — grammar stays the syntax of the
suite's own artifact lines), recipe, schema, shape (bare)

### candidate
A pre-verify review result: one defect a lens proposes, before any verifier
has returned a verdict on it. The unit a verify lane routes, a batch verifier
batches, and dedup collapses.

### capstone
The final station of an engagement: the learner performs the goal contract's
core solo — no hints, in a playground or their own branch. The integration
moment; rolling checks at station closes cover everything before it.

### carve topic
Defined in the `kaizen-summary` skill, its one home.
_Avoid_: carving session, lift-out, digest, carve-out (the ExDoc and
plan-scope sense), drain (that is `/ymer:kaizen-summary`'s act)

### catch-up
The merge of current main into a topic branch, run on a clean tree — dirt
stashed first — at every project-checkout pre-flight and by the ship close
before its squash: a fast-forward where only main moved, a merge commit
where both did, already up to date where main has not moved, or a
conflict — an ordinary one resolved on the branch, Claude-run; one that
would remake a recorded decision asked, and aborted rather than left in
progress when the answer has not come.

### chartered store
A store the knowledge-placement contract names as a legitimate home for
durable process or project knowledge — membership is by charter, and
there are no side stores. The store table, the push-vs-pull routing
test, and the stop-and-pick rule live at development-process
§ Knowledge placement. Not the traceability stores of the
machinery-traceability ground rule (→ traceability store).

### checkout
The repository checkout the session runs in — an environment-contract
role of the reach kind, read at the guard; its directory name is
`<repo>`. `git -C <checkout>` addresses it from any cwd, and the
sibling-glossary scan reads the checkouts beside it, the parent derived
— empty for a one-checkout user. Which tree option it takes is the
branch's (→ project checkout, → shared tree), never the role's.
_Avoid_: repository (bare, as the role word), working copy, clone,
a repositories-root-plus-name path (retired — the sites stayed
literal until each file's lift)

### cluster
Defined in the `kaizen-summary` skill, its one home.

### code-repo topic
Defined in the development-process charter — the topic-kinds definition.

### colleague test
A station's close: the learner explains one chain of the station's material
as they would to a colleague — teach-it-back, scoped to ONE chain.

### content-ownership map
The totality audit a content-moving plan carries: one explicit disposition per
content unit of the files it relocates or deletes — a destination, or dropped
with a why. Dropped is a destination, not an absence — a row never mixes
survivors and drops, and dropped means gone from every reachable surface of
the project.

### convergence beat
One of brainstorm's three situational moves run against a formed candidate
direction before it is offered for the pick — the reframe, product
alignment, the prerequisite check — each with an applicability test and a
recorded skip; a verdict other than stay the course reopens the direction
instead of closing it.
_Avoid_: convergence step, evaluation pass, review beat

### coordinator
Defined at marketplace level — the root glossary is its home. An
environment-contract role of the reach kind.
_Avoid_: tracker, task system, backend (as the role word)

### cycle
One pass of a topic through the pipeline, from the phase it enters at —
brainstorm the first time, the phase an iteration names after that — to
the close that ends it: a ship, or the iteration that starts the next
cycle. An iteration is the re-entry; the cycle is the pass it opens, so
"an earlier cycle's plan-review" is the previous pass's.
_Avoid_: round, pass (bare — lens pass and self-review pass are
different things)

## D

### decide-forward
The in-place execution of an iteration whose new decision the developer
already made at the code: the edit stands, the owning artifact gets the
amendment recording the decision and its why, and the edit is reviewed
as a delta. Not a close — the session continues.
_Avoid_: push-forward

### decision digest
The record of already-settled decisions that every review agent receives
inline, extracted mechanically from named sections of `spec.md` and
`plan.md`: the `spec.md` sections copied whole and verbatim, amendments in
place; each `plan.md` entry copied too — one line plus its citation where
the entry is one, its own line breaks kept where it is not. Its rule travels
with it — contradicting a settled decision requires arguing why the
decision is wrong, otherwise the contradiction is not reported.
code-review's carries plan-level and spec-level entries; plan-review's
carries spec-level only, since the plan is what it reviews.
_Avoid_: decisions register

### delta gate
A sweep gate asserting the change in match count across one task's edit:
measure immediately before the edit, apply it, measure immediately after,
assert the difference — the delta derived from the task's own payload
(its `payloads/` file), never counted by eye. Defined at its home,
the sweep skill's rule 4; certifies the increment only,
never a terminal state.

### direction doc
The artifact a topic's direction is read from: the topic's own
`brainstorm.md` — deliberately neither a spec (define sharpens meaning)
nor a plan (write-plan owns implementation shape) — or, for a split
child before it writes one, the parent's (the operations contract
§ Split topics).
_Avoid_: direction document, parent doc

### discovered set
Everything topic resolution's lookup found for one name — an open inbox
item, a topic folder, a sketch branch — taken in as one topic on one
confirming question, never piece by piece; at a split child, an iteration
or a pending interview the set is already in view and no confirmation
fires.
_Avoid_: found set, matches (bare)

## E

### effort ladder
A skill's ordered menu of whole review procedures, each entry a tier, ordered
by machinery rather than by degree: code-review's runs inline read → full
pass → ultra, plan-review's lightweight pass → workflow, write-plan
grounding's direct verification → Explore fan-out.

### engagement
The unit of /tutor work: a days-to-weeks acquisition effort on one subject
toward a goal contract, run as sittings under the tutoring contract; closed
by the capstone, or by explicit abandonment with the why recorded.

### engagement doc
The ymer doc holding one engagement's oracle, scope, goal contract, arc, and
sitting log — the resume source while open, the durable record after close.
One per engagement, indexed in the subject index; several engagements may share
one knowledge doc.

### enrichment gap
A prerequisite-check disposition: a subject gap worth capturing but not
worth a task — it neither blocks operating the result nor marks an area
chosen for depth. Recorded in the beat as an unchecked knowledge-doc
leaf; no task, no edge.

### environment contract
The named set of roles the development-process suite requires its
environment to supply, each typed by how it binds and bound in exactly
one binding home (→ binding): by **configuration** — the state folder:
the one key, or the front's initial instructions where the harness
passes no plugin options; by **reach at the guard** — the coordinator, the state
store, the checkout, git, the shell, the question instrument, the node;
by **the harness** — the plugin's own files, through the harness's
variable; by **the front's initial instructions, or the node table they
point at** — the machinery trees, the user. Skill prose names a role,
an operation, a binding home or a configuration key, and never writes a
value: a filesystem path, or a placeholder resolved to one; the
instance name of a person, a tree, a repository or a project; a host, a
port or a connection string; a backend's call shape. Two allowances: a
coordinator's product name where the reach rule is stated and inside a
binding; a harness variable, the harness's own binding. A role
placeholder (`<state folder>`, `<checkout>`, `<tree>`) is
session-resolved and stays literal in an authored plan; `<repo>` and
`<topic>` are per-topic values the author fills. Each plugin's setup
skill verifies and words the roles its skills need.
_Avoid_: environment block (a binding, not the contract), env contract,
machine contract

### evidence line
The one-line observation appended to the engagement doc at each sitting
close — what worked, what didn't, as evidence. The input the tutoring
contract self-improves on; its provisional points are confirmed or fall by
these.

## F

### facilitator
The withholding role a gated learning surface runs: the user produces —
predictions, explanations, hand-written attempts — and the facilitator
withholds answers until the user has committed to one. Review's carrier
role, running the walkthrough; the tutor is the facilitator of /tutor's
sittings.

### falling-behind gap
A prerequisite-check disposition, the common one: a subject gap where
the pipeline proceeds unblocked but the user wants depth enough to dive
in and develop the area themselves. Minted as a learning task without
an edge; edges and priority stay the user's triage.

### fitness question
Review's closing beat: the does-it-do-the-job question(s) asked once over
the whole increment, never per stop.
_Avoid_: acceptance check, sign-off

### Forward direction
A product page's first settled section: where the product is heading,
written as constraints on future implementations — the shape a feature
must take when it arrives, the destination the product moves toward.
Never a schedulable unit: anything that could carry a date or a checkbox
belongs in the task list, and cross-product priority is triage, not
direction. Pushes back like every settled section.
_Avoid_: target shape, heading, roadmap (that is the task list),
now/next/later, milestones

### friction
Defined in the `kaizen-capture` skill, its one home.
_Avoid_: finding (plan-review's and scout's investigation results),
improvement (the fix, not the observed waste)

### friction-batch
Defined in the `kaizen-summary` skill, its one home.
_Avoid_: fix-now topic, the batch

### front
Defined at marketplace level — the root glossary is its home. Its
initial instructions, or the node table they point at, are the binding
home of the environment contract's front-instructions roles.
_Avoid_: harness (the front's kind, not the front), surface (bare),
client

## G

### gate default
The action a gated moment names for the case where the user's input has not
arrived by phase close: the action runs, the close commits it, and review
moves post-hoc to the committed artifact. Named in one inline line at the
moment, pointing at the Defaults-and-holds ground rule.
_Avoid_: lane (a), auto stage

### gate shape
The form a sweep's gate takes, and how it stays falsifiable. Defined at its
home, the sweep skill's rule 4, which enumerates three:
expected-survivor gates are self-pairing (the KEEP list is the positive
control); zero-hit gates are not, and carry an explicit paired non-zero
assertion through the same matcher; delta gates assert the before/after
difference around one task's edit and self-pair through whichever
measurement prints.
_Avoid_: gate type, gate kind

### gated moment
A point where a phase's text has the session wait on the user — a review,
a confirmation, a choice with a recommendation, a permission prompt. Every
gated moment carries either a gate default or a hold, decided by its
inline line; sessions never classify at run time.
_Avoid_: leverage point

### gated step
A plan step carrying a payload, so a manifest row and a payload gate
join its checkbox. Its complement is a *payload-less step* — a command,
a manual edit, a deletion — whose box no gate reads. The split the
verifier's plan-complete predicate turns on: only gated boxes enter it,
and an occurrence a later payload-less step adds by hand needs a gate
of its own (contract: the verifier's own header; authoring: write-plan
§ The manifest).
_Avoid_: payload step, gate step

### git is never guessed
Defined in the development-process charter — the Defaults-and-holds ground
rule: a git action no written rule determines is asked, never defaulted,
and a step that cannot complete is undone to its pre-state. The
environment's ruling: the substrate contract.

### goal contract
An engagement's exit criteria, fixed at the opening: concrete,
solo-demonstrable usable skills, ticked only by demonstration, amendable at
sitting boundaries with a dated note. Bare "contract" keeps meaning the
roadmap/inbox contract.

## H

### hand-off
The pattern by which Claude delegates a hold's command to the user: a
preview/dry-run when the command has one, the command itself with any
message written out, and a verify command with its expected output
stated. Only holds are hand-offs — push/pull, steps destructive of
uncommitted work, release-version writes, and the brainstorm or define
interview, whose hand-off is its resume command written out
(`/ymer:brainstorm <topic>`, `/ymer:define <topic>`) with no preview and the
resumed phase's announcement line as its verify; all other local git
and every other edit is Claude-run.
_Avoid_: instruct-user, command trio

### hand step
A change to a user's store that a plugin names and the owner runs,
because the plugin never rewrites what the owner holds — announced in
setup's report or in the release that makes it. Not a `hand-off`: a
hand-off delegates a pipeline hold's command; a hand step is a store
owner's to run.
_Avoid_: manual step, upgrade step, migration

### head-scratch test
Review's bar for which walkthrough stops run and how many: a stop is
relevant iff omitting it could later make the operator wonder why the
system behaves the way it does — never a count. Every stop that passes
is run, however long that takes; length comes from the count of relevant
stops, never from padding, and no clock closes the session early.
_Avoid_: time cap, depth mode

### hint
A next call a server's response carries beside its result — the action
and example data for the step that usually follows — read as the
server's own documentation of that call's shape, never as a decision to
take it. Not the git rule's "printed hint" (the substrate contract),
which is about whether to take a step: a hint spells a call already
decided.
_Avoid_: suggestion, next-call recipe

### historical entry
The blessed shape for a term whose referent is gone while the word
survives in records. Defined at its home, the define skill's glossary
charter (§ Historical entries), which
fixes the opener `Historical (retired <YYYY-MM-DD>):`, its clauses — what
it named and where the word survives, always; what replaced it, where
something did — and the admission rule: the retiring change's own sweep
KEEP list, decided once and permanent.
_Avoid_: tombstone entry, retired entry, obsolete term

### hold
A gated moment that is never defaulted because the step is the user's
alone — network git, a step destructive of uncommitted work, a
release-version write, or the brainstorm and define interview, every
question: absent the user's input the step stays pending and the phase
closes around it. There is no separate artifact — state is the record,
and a pending interview rides the phase's own artifact under its marker.
_Avoid_: lane (b), manual stage, manual-approval stage

## I

### inbox
A repo's untriaged intake — the topics whose brainstorm has not run. Not a
separate store: it is one status of the repo's topic tasks, the same objects
the roadmap is the other status of. Ordered by the user at triage.
_Avoid_: backlog (the word is taken — it is kaizen's store), task pool

### inferred claim
A load-bearing claim asserted from reasoning rather than measurement,
carried under the literal `inferred:` marker; the marked lines are
downstream's re-verify register. A probed inferred claim exits the
register under a fresh stamp. Home: the sweep skill's Claims section.
_Avoid_: assumption (the genuinely-uncheckable state, write-plan's
block), surmise

### instrumental
A product stance: the artifact is a means — the user's goal lies beyond
it, and the product succeeds by getting out of the way. The default
stance of tools; the counterpart stance is autotelic.

### intake gate
Brainstorm's question on a dirty working tree with no topic branch: all of it
is input / some is keepers / none of it is input. On a topic branch the gate
collapses — everything is input by construction, except on an iteration
arrival, where only the commits the record does not name are input
(brainstorm § Branch Intake).

### iteration
A topic re-entering the pipeline loop when review, implement's drift
valve, or plan-review's close over a surviving `> Needs confirmation:`
marker finds the record contested, exceeded, or still open — normal
development, not a planning failure. The route is derived from the
artifact owning the contested statement; the executor is a full
iteration (the owning phase's session decides) or decide-forward.
_Avoid_: route-back (retired name), objection exit, going back

## K

### kaizen block
Defined in the `kaizen-capture` skill, its one home.

### knowledge doc
The per-subject ymer doc recording what the user has provenly learned and
not learned — a terse personal reference card whose boxes tick by
demonstration only, indexed in the subject index. The learning track's
substrate: engagements and study sittings both work it, and it outlives
both.
_Avoid_: subject doc, subject knowledge doc

## L

### Learning project
The single cross-repo project in the coordinator holding every learning
task — the learning track's one tracker view. A chartered store: its
definition and binding live in the operations contract's binding.
_Avoid_: study backlog (the retired passive-queue framing)

### learning task
A Learning-project task tracking one subject gap toward a
solo-demonstrable bar: its name is a goal-contract-shaped capability
one-liner ("K8s: enough to deploy and debug a single-node service"),
adopted as the goal contract's core when a tutor engagement picks it
up, and closed only by demonstration — normally the capstone, never
self-assessment. Distinct from kaizen's learning-gap friction (the
captured observation that may mint one).

### lens
One agent's assigned mandate within a fan-out — the dimension it reviews, the
question list it carries, or the search vector it follows. code-review,
plan-review and scout all fan out one agent per lens.
_Avoid_: angle

### lens applicability
The precondition a lens declares, saying what must be true for it to have
anything to bite on, evaluated by the host *before* the agent is spawned. The
mechanism that drops structurally-empty lenses instead of paying an agent to
discover it has nothing to say; a dropped lens is reported with the
precondition that failed, never silently.

### lens pass
The code-review run with `--fix` over the increment's diff,
pre-executed at implement's close and read from the record by review,
whose in-session run is the fallback; unapplied findings seed the
walkthrough's agenda and enter dispositions. On an iteration its
subject narrows to the refs the record leaves unreviewed — every
recorded ref not named on a `Reviewed:` line — plus the working tree.
_Avoid_: code-review step, automatic review, tail pass

### load-bearing
The trigger condition of the claims discipline's probe-or-mark and
re-verify duties: a decision, an ordering, a gate, or a scope
exclusion rests on the claim. Home: the sweep skill's Claims section.

## M

### machinery tree
A tree where this front's process machinery lives — its skills, the
sources of its initial instructions — edited on trunk by several
sessions: an environment-contract role of the front-instructions kind
whose value is the set, possibly empty, bound in the front's initial
instructions or the node table they point at, each verified as a git
work tree by the plugin's setup skill. A plugin's installed cache is
never one — a friction with a shipped skill goes to the backlog, never
to an edit of the cache; a marketplace checkout added by path is one.
A shared tree on trunk and on every branch the topic does not own
(→ shared tree); on this topic's own branch, a project checkout
(→ project checkout) — the option is the branch's, never the role's.
_Avoid_: the two machinery trees, the three trees, any list of the
particular tree paths a front happens to use (values, not the role)

### measured claim
A count, ratio, or absence a search or probe produced, reported in any
pipeline artifact, over any corpus — repo, web, database, or live tool.
The unit the sweep skill's claims rules bind: a stamp always, a
positive control on any absence or zero; design parameters and
designed-empty status reports are not measured claims — claims nothing
measured ride the probe-or-mark register at the same home. Home: the
sweep skill's charter.

### measured, never typed
The verification-authoring principle: every number and every pass/fail
claim in an `Expected:` line or embedded gate traces to a measurement or a
derivation — memory and reasoning are not admissible sources. Prose home:
write-plan's Grounding. The one legitimate defer is post-change behavior
(a planned assertion's green side), which cannot exist before implement.

### meta topic
Defined in the development-process charter — the topic-kinds definition.
_Avoid_: machinery-editing meta topic (a session fact, not a kind),
prose-only meta topic, meta/plans topic

### mint item
The roadmap/inbox operation that makes a task appear in a repo's pool,
carrying its evidence. Home: the operations contract's operations table;
discipline (the three looks, the evidence rules): the mint skill.
_Avoid_: file a task, create an item, queue

## N

### nudge template
The comment-only `commit.template` file (all `#` lines, memory prompts, no
fill-in fields) that code repos point at for the user's own hand commits;
git strips the comments. Claude-authored commits (`-m`/`-F`) never see
it — they follow the public register's grammar instead.

## O
### operator bar
The proficiency threshold the prerequisite check tests per subject:
able to guide, hold a real dialogue about, and troubleshoot the shipped
result — operator, not author. Below it a gap is blocking; depth beyond
it is the learning track's own ambition. Distinct from kaizen's "below
the bar", which prices whether a friction earns its own topic.

### oracle
The authoritative source set an engagement fixes at its opening — which
documents, versions, or systems count as truth when material and tutor
disagree.

### order topics
The operation that records one topic as blocked by another, with a reason,
and reads the edge back. The only ordering primitive: order is partial by
design, so most topics carry no edge and inserting work costs nothing.
_Avoid_: prioritise, sequence, rank

## P

### pace layer
One of a system's strata ordered by expected rate of change: fast layers
(pushed by market, trends, technology) ride on slow layers whose
durability keeps the whole safe and usable, decoupled so fast change
never forces slow change.
_Avoid_: shearing layer

### payload
The verbatim content a task's edit carries — the exact bytes a step
delivers to its target file, distinct from the addressing around it (Edit
anchors) and the verification around it (commands, expected output). A
payload homes in the topic folder's `payloads/` directory, whatever its
extent; its extent is whole physical lines of the target's final state.
_Avoid_: fragment (taken — brainstorm's mined sketch fragments), fence
content, embedded content

### payload gate
The gate proving one payload landed: the target file contains the
payload file's exact bytes at the expected count (a whole-file `diff` for a
Create payload), joined to its step's checkbox by step ID and reported
PASS / PENDING / FAIL by the payload verifier. Not one of sweep's gate
shapes — a delta gate certifies one edit's increment; the payload gate
certifies the bytes' presence in the target.
_Avoid_: byte-identity gate, arrival gate

### payload verifier
The plugin's shipped script that evaluates every payload gate of one
topic and reports each PASS / PENDING / FAIL; defined in its prose home,
development-process mechanics' payload contract.
_Avoid_: shared verifier, the bar's mechanical half

### pending interview
The state in which a phase's own artifact carries an
`Interview pending — <date>: <n> questions` marker at its head, and the
seventh arrival that reads it: the phase resumes the interview at the
first unanswered prepared question. The `## Interview` section beneath
the marker holds the prepared questions. Home: development-process
§ Artifacts.
_Avoid_: prepared interview, parked interview, deferred interview,
interview queue, pending record

### pending step
A hold whose command has not run yet. Its pendingness is read from repo
and worktree state, never from a stored status; a successor pre-flight
surfaces every pending step it observes and stops only when its own work
depends on one.
_Avoid_: pending record

### phase close
The sequence of durable writes that ends a phase — artifact writes,
roadmap operations, state-folder and machinery commits, the kaizen block — run as one
continuous execution, ordered so every step leaves a readable outcome and
state changes land before announcements.
_Avoid_: terminal sequence, close sequence

### plan complete
The verifier's terminal moment: every gated step's checkbox is ticked.
Derived from the plan's own boxes, never declared by an argument, and
read over gated boxes only — the verifier step's own box and any close
step after it are unticked when the gate runs. With the plan complete
no gate reads PENDING: a final-state count still short there is FAIL
(contract: the verifier's own header).
_Avoid_: plan done, all boxes ticked

### pool
The set of topic tasks a Roadmap project holds, at every status: the
inbox and the roadmap are its two open views, and its closed tasks are
the product's ledger. A repo's pool is its Roadmap project's; bare, the
union over the registry's Roadmap projects.
_Avoid_: task pool (as a synonym for inbox), backlog (the word is
taken — it is kaizen's store)

### pool look
The step in review's ship close, on both lanes, that derives search keys
from the topic's record and the ship's own refs, reads every pool hit
not yet closed against the shipped increment, and writes the pool —
resolve, retire, annotate — recording the moves and the keys on the ship
section's `Pool:` line. Home: review § The pool look.
_Avoid_: pool sweep, obsolescence sweep (kaizen's, over backlog rows),
inbox look, pool scan

### positive control
A known hit the matcher must print before its zero is trusted — the proof
that "no output" means a clean corpus rather than a broken matcher. Defined
operationally at its home, the sweep skill's rule 1; rule 4's
pairing mechanisms are its gate-shaped forms.

### postcondition
An operation's Required outcome, treated as an obligation on its caller:
when the call's own return does not show the outcome, the caller reads it
back before the boundary closes. An outcome that did not happen stops the
boundary — whether the backend was unreachable or the call simply succeeded
without landing it.

### pre-flight
The pass that opens a phase: derive the predecessor's close state and any
pending steps from durable state, finish an unfinished close from its
first missing outcome, then run the phase's own readiness checks.
_Avoid_: preflight

### prerequisite check
Brainstorm's convergence beat asking which subjects the settled
direction touches and whether the user is at the operator bar for
each; its outcomes are the three gap dispositions — blocking,
falling-behind, enrichment — landed as mints and edges at the close.
Applicability with a skip clause, minutes not analysis; decomposing a
subject stays with tutor's opening.
_Avoid_: readiness check (pre-flight's phase-entry sense and
implement's Readiness Gate own it), sizing check

### product alignment
Brainstorm's convergence beat: a formed candidate direction is
checked against the product-design principles — the product page's
settled sections supply cached answers and push back on contradiction —
yielding the gate's answers (user type; instrumental or autotelic) plus
the reframe's three-outcome verdict, recorded in the direction doc;
vision-worthy material goes to the backlog as vision rows. Fires when
the topic shapes a surface a user operates.
_Avoid_: alignment phase (a beat inside brainstorm, not a phase)

### product page
The one page a product has — its Roadmap project's description: the
fixed header (the task/status contract for other surfaces, plus the
governance line), then the settled sections. Product-keyed, so several
repos may share one; found by name convention (`<Product> Roadmap`);
skeleton and binding in the operations contract. Phases read it; only
governed sessions — carve topics, onboarding — write it, and never prune
what they did not write.
_Avoid_: Product Vision, vision doc (the retired doc class),
governed page, roadmap page, project description (the coordinator's
field, not the artifact)

### proficiency-for-use
The tutor's target level: able to use the topic for real work without help —
explicitly below mastery, which takes years of hands-on.
_Avoid_: very good at it

### progression story
The topic branch's commit log as captured into `sketch.md` — the sequence of
attempts and messages review reads as signal about how the sketch evolved,
as the contrast between the sketch and the shipped code.

### project checkout
The tree option a checkout takes on this topic's branch: the branch is
the topic's alone, so the tree's git state is read whole, staged whole,
committed on the branch at each phase close, and squash-merged to main
at the ship. Derived from the branch — the current branch is the
topic's — never from the tree's address. Contrast: shared tree; the
tree itself: → checkout.
_Avoid_: repo checkout, code checkout, owned tree

## Q

### question repertoire
Tutor's single table of question types with their structural slots — the
hands-on probes, the study probe pool, the opener and close types. What
survives of learn's research-grounded taxonomy, scoped by the kind of
material a station or sitting works.
_Avoid_: question taxonomy

## R

### reach rule
Defined at marketplace level — the root glossary is its home. How
every reach-kind role of the environment contract binds: read once, at
a run's guard, from what the session has.
_Avoid_: presence rule, fallback rule, configured switch

### read-back
The read a caller makes after a write whose own return does not show
the postcondition — the required outcome read back through the backend
before the boundary closes. Client discipline, not call shape: a
consumer keeps its read-backs written as intent.
_Avoid_: verification call, confirm, re-read

### recurrence row
Defined in the `kaizen-capture` skill, its one home.

### redefinition-in-flight marker
The required one-line forward marker an entry carries while its
redefinition is deferred — `Redefinition in flight — <date> → <topic ID>:
<what changes>`, capital R, em-dash, line start, newest-first where a term
carries several. Written by the define session (or by term mode at a
bounce) and removed by the same plan task that writes the new definition.
Admitted on every term kind, code-backed included, as glossary-native
metadata with no code home.
_Avoid_: retiring marker, planned marker, superseded marker (the
backward-looking shape is the historical entry, not a marker)

### referent gate
The check define runs at every crystallized term: is the thing the term
names real yet? Code-backed — the construct exists and its doc says it;
prose-homed — its prose home says it; conceptual — the thing itself
exists. No, on any of them, defers the entry to the spec's glossary delta,
and writing it becomes plan work landing with the referent. What keeps the
glossary a present-tense reference doc rather than a record of intentions.
_Avoid_: home gate, shipped/planned check, crystallize gate

### reframe
Brainstorm's convergence beat for a direction reached by extending what is
there or by a first-of-its-kind choice: set the direction aside, solve from
first principles, name the field's canonical shape, and return one of three
verdicts — stay the course, adjust within the direction, the direction is
wrong — taking a canonical shape's form and dropping every part whose
justifying context does not hold here, each drop naming a written
constraint.
_Avoid_: prior-art review, first-principles pass, rethink

### re-green
The per-tree green re-run owed after work lands on a tree the lens pass
already covered — the pass's own fix commits, developer edits after it,
and the commits a ship close's catch-up merges into the branch — with a
red result entering the findings list. Defined in the review skill —
§ The lens pass, § Developer edits, and § Phase Close's ship step 2
state it.
_Avoid_: regreen, re-test, green re-run

### resolve item
The roadmap/inbox operation that closes an open item as completed
because a ship delivered what it asks, its result naming the topic ID
and ship ref; never deleted. Home: the operations contract's operations
table; the reading that reaches it is the pool look's.
_Avoid_: complete item, deliver item, close item, fulfil item

### resume
Picking a parked dialogue back up: an engagement at a sitting's open, per
the engagement doc's resume contract — the arc's next pending station,
the last sitting entry, the goal-contract checkboxes, plus the materials
& state-deltas section when one exists, a next-day resume opening as
spaced retrieval; a pending interview at its arrival, from the first
unanswered prepared question.
_Avoid_: pick up, pick-up, continue

### retire topic
The operation for every non-ship exit — not pursuing, split parent,
settled below the bar, an item rejected before it ever became a topic,
an open item a ship mooted (the result naming the removal): the task —
a topic's, or an item's that never became one — closes as cancelled
with the why recorded; never deleted.
_Avoid_: reject item, drop, abandon

### review
Phase 7: the session that inspects the real increment after implement —
reading the lens pass's findings from the record (running the pass
itself only as fallback), the walkthrough, dispositions of every
finding, a closing fitness question — and closes one of three ways:
ship, iterate, or wait. Two of the five dispositions fire no close:
decide-forward, and declined — a finding weighed and left as it stands.
Its closure is what ships a topic. Writes `review.md`.
_Avoid_: briefing (the retired pre-implement phase), code review (the
lens pass it reads), walkthrough (its middle movement)

### risk profile
The expected cost of a defect escaping a review: its probability of going
unnoticed times what it costs if it does. Four dimensions — input-space
complexity, trust boundaries, blast radius, and mechanicalness, which lowers
it — enumerated at their home in the development-process charter. Keys the
tier; file count and artifact kind are never the key alone.
_Avoid_: risk concentration, risk class

### roadmap
A repo's in-flight pipeline topics — the topics between brainstorm and ship.
Not a separate store: it is one status of the repo's topic tasks, the same
objects the inbox is the other status of. A pointer, not a record — all
detail lives in the topic folder, and the pipeline rung is derived from it,
never stored.
_Avoid_: router table, roadmap.md (the retired file binding), backlog (the
word is taken — it is kaizen's store)

## S

### sanctioned wandering
Learner-initiated try/hack/get-a-bit-lost as a legitimate station activity:
the tutor notes the return point, lets it run while learning flows, and
guides the way back when asked or when it dries up. Distinct from the
tutor-read detour (tutoring contract point 9).
_Avoid_: scope creep

### search pool
The roadmap/inbox operation that reads the pool as a whole — every
product's — by an id, a compound name or a name fragment, or by a
subject through whatever the coordinator has; the matching items with
their status and projects. A by-subject miss is no lead, never an
absence. Home: the operations contract's operations table.
_Avoid_: pool search, pool scan, semantic search (bare), raw call

### settled section
One of a product page's sections below the header — Forward direction;
Users; Stance; Slow layers / what churns; What it refuses to be — holding
cached product-design answers or direction with pushback force: a
candidate direction that contradicts one raises "is the vision changing,
or the direction?", and a change is a conscious act through a governed
session, never silent drift. A section may sit empty; a stub is a valid
page.
_Avoid_: landing zone (the retired collection container — collected
material rides the backlog as vision rows), cached answers (what a
section holds, not what it is)

### settle signal
The user's own statement that the direction — or the design — is settled:
the interview's last answer, a hold never defaulted; what consolidation
waits on, and what the convergence beats run before.
_Avoid_: approval (bare), sign-off, done signal

### shared tree
The tree option a tree takes on any branch the topic does not own —
`main` in any checkout, and every trunk-only tree: the state folder and
each machinery tree (→ machinery tree). Never stashed, never merged;
every write staged and committed by explicit path — by hunk where the
file also carries another session's edit — and foreign dirt left alone.
Derived from the branch, never from the tree's address. Contrast:
project checkout.
_Avoid_: shared working tree, the three trees

### ship
A topic reaching main: the Claude-run squash-merge of the topic
branch with a public-register message, inside review's close — one of
review's three closes beside iterate and wait; the task closes as
completed and `review.md`'s ship section records the squash ref plus
any machinery commit refs the increment carries, per tree, and the pool
look's moves and keys — a meta topic has no branch, so no squash ref.
Each tree's push stays a hold.
_Avoid_: land

### silent zero
A matcher returning no output for a reason unrelated to the corpus — a
shell-mangled fragment, a mode flag that changed the regex dialect, a traversal
filter, a mis-derived expected count. The failure gate shapes exist to make
visible: absence of output reads as absence of hits.
_Avoid_: false negative, empty result

### sitting
One tutoring session under the tutoring contract, capped around an hour —
an engagement's unit of progress (one station by default, closing with a
colleague test and an evidence line), or freestanding as a study sitting.
Better more sittings than pausing mid-sitting.

### sketch
The user's pre-session attempt at the idea — code, pseudo-code or a draft —
arriving as uncommitted work, a branch or a document: brainstorm input with
the standing of an inbox item, a starting point and never a decision; mined
into the direction doc, captured whole into the sketch record.
_Avoid_: prototype, spike, draft (bare)

### sketch record
The verbatim, uncurated capture of a sketch — the diff or the document, the
untracked files, the progression story, the paths — kept beside the
direction doc and read by exactly one phase, review, as the contrast between
the user's attempt and the shipped code; sketch.md on Claude Code.
_Avoid_: sketch summary, sketch notes, cleaned-up sketch

### speed mode
The sanctioned suspension of tutor-mode: the tutor takes the keyboard and
narrates each fix as evidence, when solo walls are burning capacity on
mechanics a deferred lesson owns.
_Avoid_: handover

### split child
Defined in the operations contract — its "Split topics" section is the
home.
_Avoid_: shed part, sibling (bare)

### stamp
The provenance clause a measured claim carries: the generating command
with its observed result, inline (`command` → result) or hoisted into
a section's `Stamps:` preamble; dates inherit the artifact's unless
stated. Home: the sweep skill's Claims section; rule 4's stamped baseline
assertion is a stamp on a gate's premise — same family.
_Avoid_: claim stamp

### standalone repo
A project repository that stands on its own — a fresh clone, with nothing
beside it, builds and passes its own gate. Prose home:
development-process's ground rules.
_Avoid_: self-contained (it names a Docker image elsewhere),
self-sufficient, hermetic

### standing doc
A repo's long-lived, single-home reference document for one cross-cutting
concern — the glossary, design guidelines, a spec overview — kept current
in place, as against point-in-time artifacts; every other document uses it
by pointer and never restates it. In an Elixir repo the standing prose
home is `docs/`, published (placement doctrine: the standards skill).
_Avoid_: standing reference doc, standing prose document

### start topic
The operation that takes an item into the pipeline: its task moves out of
the inbox, is renamed to the topic slug, is relinked to the repo whose
subtree holds the topic folder, and its content lands there as
`request.md`. The task is not closed — it *is* the topic from here to ship.
_Avoid_: consume, add row, triage (that is the user's ordering of the pool)

### state folder
The one folder a front keeps its topics' artifacts in, laid out
`<area>/YYYY/MM-DD-<topic>/` and required by the core plugin: an
environment-contract role of the configuration kind, and this suite's
internal register. Its path is named by the `state_folder` option where
the harness passes plugin options, and by the front's initial
instructions where it does not; either way it can sit anywhere, and it
is always named, never inferred. A folder that is a git work tree keeps
its history in git; any other folder keeps it in the node's
`topics_history`. Written `<state folder>` in skill prose and fenced
commands, a role placeholder the session resolves, bound per environment
in its binding home (→ state store).
_Avoid_: any one front's own folder name (a value), workspace, project
folder, state dir

### state store
Defined at marketplace level; the root glossary is its home. An
environment-contract role of the reach kind: the state folder plus the
history that tracks it.
_Avoid_: state path, workspace, data dir

### station
One unit of an engagement's arc: a goal plus do-steps at the screen,
targeting named goal-contract criteria, sized to fit one sitting (split
before starting if it won't).

### status ladder
The six rungs naming where a topic stands — `brainstormed → surveyed →
specced → planned → hardened → implemented`. Vocabulary, not state:
nothing stores a rung, and shipped is not a rung — it reads from
`review.md`'s ship section. Each rung is derived from the topic folder's
artifacts plus the topic's phase commits in the state folder; the mapping,
and the exact predicate for each rung, live in the operations contract's
Roadmap section.
_Avoid_: status column, phase status

### step ID
The identifier a plan step's checkbox heading carries — `T<task>S<step>`,
as in `- [ ] **T4S2: Rewrite § …**` — unique within its plan by
construction, on every step whether or not it carries a payload. Task
numbers are append-only per topic: across iterations a number is never
reused and never renumbered, so one ID names one task's step for the
topic's whole life. Its lowercase form names the step's payload file
(`payloads/t4s2.md`; letter suffixes `t4s2a`, `t4s2b` when one step
carries several).
_Avoid_: step label, task-qualified label

### stop
One station of the walkthrough: a code section — a function with its
doc, or a function group — presented with what it does, which
constraints it had to meet, and the bytes themselves unaltered, in story
order. Which stops run is the head-scratch test's call; a skipped stop is
named in the record. Not the inherited hard stop (ending a message at its
question).
_Avoid_: section, unit (the retired pre-implement phase's agenda unit), step

### study sitting
A freestanding sitting on one subject's knowledge doc, outside any
engagement: the agenda is the doc's unchecked boxes, a retrieval check-in
opens, hands-on work lives in a playground, and boxes tick by
demonstration only. No goal contract, arc, capstone, or engagement row —
and never a learning-task delivery, which is an engagement's alone.
_Avoid_: study mode

### subject index
The Ymer Node's index of the learning track — `tutor_subjects`, one row
per subject naming its knowledge doc, and `tutor_engagements`, one row
per open engagement naming its subject and engagement doc; presence of
an engagement row is the open state. `/ymer:setup` creates both tables,
and each table's `_meta` description carries its column grammar.
_Avoid_: subject table, `subjects.md`

### substrate contract
The reference file the `dev` plugin ships for the substrate its skills
run on — the branch workflow and the tree options, the commit
registers, concurrent edits on a shared tree, the by-hunk recipe, the
code-repo topic kind. This plugin names it and never restates it. Until
`dev` ships, the file does not exist: a skill citing it reads those
rules from the front's initial instructions where the front states
them, and where the front states none the step takes the
Defaults-and-holds fallback — asked, never defaulted. Not the
environment contract, which is the named set of roles these skills
require; the substrate contract is the mechanics for the substrate
roles.
_Avoid_: the git contract (bare)

### sweep artifact
A committed, re-runnable script that measures a topic's corpus claims
— the stem-sweep and term-gate genres — kept in the topic folder
beside the map or doc whose numbers it generates and covering every
family that map reports counts for. The claims ladder's preferred
generator; behavioral probes are not sweep artifacts. Home: the sweep
skill's Claims section.

## T

### tier
One entry in an effort ladder: a whole review procedure, differing from its
neighbours by machinery rather than by degree. Keyed by risk profile, never
picked by hand — nothing in a review run is set by hand, and inside a tier
routing is derived.
_Avoid_: treatment, valve, dial, shape-as-a-synonym-for-tier (plain "shape"
stays available for a procedure's structural form — a workflow fan-out
versus a single agent; implement's drift valve and the sweep skill's gate
shape are unrelated compounds)

### topic branch
The single git branch a code-repo topic lives on, named with the bare topic
slug (no date): sketch → reset to main → pipeline phases → implementation →
squash merge, then deleted. A meta topic has none.
_Avoid_: feature branch

### topic folder
The `YYYY/MM-DD-<topic>/` directory under a repo's subtree in the state
folder, holding one pipeline topic's artifacts. Canonical definition:
the operations contract's "The topic's artifacts" and "Topic ID ↔ folder
mapping" sections — the topic-ID is the full dated slug; its folder
splits the slug after the year.

### topic resolution
The read that opens a phase on a topic: the task's status (*look up
topic*), the topic folder — present or not, and whether it holds
`request*.md` — and, where the folder exists, the artifact heads:
`review.md`'s first recognizer top-down, a marker on it live or
consumed, and an `Interview pending —` marker at the head of
`brainstorm.md` or `spec.md`, the phase's own artifact or another
phase's. The three coordinates land on one arrival, which decides the
phase's first action. Carried by brainstorm, define, scout and
write-plan, each stating the read at its own opening; the liveness
read's one home is review § Input item 2, the pending-interview
marker's development-process § Artifacts.
_Avoid_: resolution (bare — seven senses in the suite), entry read,
entry procedure

### topics_history
Defined in the `setup` skill, its one home.
_Avoid_: artifact_history, ledger, snapshots, revisions

### traceability store
Defined in the development-process charter — the machinery-traceability
ground rule (§ Process ground rules), which names every one.
_Avoid_: charter store, ref store, store (bare — `chartered store` is the
knowledge-placement contract's word)

### triage lead
The plain-worded, example-led opening of an item's description for the
human triage reader — what went wrong or what is wanted, in words that
survive without the session's jargon; slugs, register marks and mechanism
follow it, never replace it. A risk-call item's lead also carries how often
and how bad, each stamped or marked inferred.
_Avoid_: summary line, TL;DR, headline

### tutoring contract
The numbered ruleset every /tutor sitting runs under — the spike-distilled
core (points 1–16) plus the facilitation points ported from learn at the
fold (2026-08); self-improving via evidence lines, with unproven points
carrying a provisional † until engagement evidence confirms them.

## U

### unattended
Of a question a phase puts to the user, the interview's above all: the
session's question tool is absent from its tools, or the call that puts
the question is refused — read at the question, from the instrument's
own report, never from a line about the user. *Attended* is the
counterpart: the tool present is presence, whatever the system prompt
says of the session.
_Avoid_: autonomous (the harness's word for the session), absent user,
no-user session

## V

### vacuous pass
A verification greening for a reason unrelated to the claim it exists to
check — under the conditions it ran it could not have failed, so its pass
certifies nothing. The false-green counterpart of a silent zero.

### verification realism
The plan-review check cluster asking whether a plan's verifications can do
their job as written: every `Expected:` line and embedded gate carries its
measurement, derivation, or stamp; observed reds are recorded; run-condition
steps carry their discriminates-when line; a gate's corpus obeys sweep
rule 2 — provenance never launders an allowlisted corpus. Named in the
testability lens (in `plan-review.workflow.js`), whose body the
lightweight pass is handed verbatim when the surviving roster falls below
plan-review's orchestration floor — a check cluster, not a lens key.

### verify lane
The route a candidate takes to a verdict, keyed to the lens that produced it:
per-candidate for correctness and plan-fidelity candidates, batched for
cleanup ones, host-inline where the lens already quoted both the rule and the
line that breaks it. Derived, never chosen.

### vision row
Defined in the `kaizen-capture` skill, its one home.
_Avoid_: vision candidate, landing-zone entry, vision friction

## W

### wait
Review's third close: a blocking lift-out's edge holds the ship — the
`## Review` entry stands complete with no ship section, the topic's task
stays `doing` and shows blocked — until the lifted task resolves and
review re-enters to ship.
_Avoid_: blocked close, deferred ship

### walkthrough
Review's facilitated read of the real code: the facilitator orders stops
by how the code works, to tell the story of what the plan achieved — not
by file, not by diff order; unchanged code crucial to the story is
included where the story needs it.
_Avoid_: tour, code walk, demo, review-and-learn

### workflow-internal reference
A token that names something in the pipeline's own artifacts rather than
in the code or its history — a topic ID, a state-store path, an artifact
basename (`plan.md`, `spec.md`), a step or task ID, a phase name, a
decision or finding label (`spec D5`). Each class has a literal spelling
and, where the suite writes one, a placeholder spelling — `<topic ID>`;
`<state folder>`, `<topic folder>`; `T<task>S<step>`, `<step-id>`;
`<phase>` — and either spelling is the reference. Public-register commit
messages carry none (the register rule: the operations contract,
restated in development-process's ground rules and review's ship
sequence), and payload prose bound for a project repo carries none
either (write-plan's Payloads section, gated by the payload verifier).
A project repo has two sanctioned sites, both
markers: a remediation marker's `plan:` topic ID, and a
redefinition-in-flight marker's topic ID (→ redefinition-in-flight
marker).
_Avoid_: plan-side construct, plan-internal reference, private ref, role
token
