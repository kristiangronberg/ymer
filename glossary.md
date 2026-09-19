# Glossary

Canonical domain terms for this repository — the marketplace and every
plugin in it; this is the repo's one glossary. Prose and manifests use
these terms; `_Avoid_` synonyms are banned in new names. Marketplace-level
terms are defined here. A plugin's own terms are defined in its
shipped skill prose.

This glossary describes what is: an entry is written when the thing its
term names is real. A `Redefinition in flight — <date> → <topic ID>:`
line under a term head means a change to that definition is in flight;
what stands below it is still the current one.

## B

### backlog

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen
- _Avoid_: improvements pool, staging

### battery
A skill's fixed, ordered sequence of probes or checks, run whole — each with a
defined outcome. Always named qualified by its skill (capture's six-probe
battery); a skill has at most one.

- _Used in_: marketplace
- _Avoid_: checklist, probe list, check suite

## C

### carve topic

- _Defined in_: `plugins/kaizen/skills/summary/SKILL.md`
- _Used in_: kaizen
- _Avoid_: carving session, lift-out, digest, drain (that is `/kaizen:summary`'s act, not the topic)

### cluster

- _Defined in_: `plugins/kaizen/skills/summary/SKILL.md`
- _Used in_: kaizen

### coordinator
What tracks a front's work and how topics are named there: ymer's
`<Product> Roadmap` tasks where the session reaches ymer, the node's
`tasks` table otherwise (→ reach rule). Each plugin states which one a
run is using in its own shipped prose and in its report — operative use
of this term, never a second definition.

- _Used in_: marketplace
- _Avoid_: tracker, task system, ymer (as the generic word)

## D

### directed way of working
The opinionated ymer practice the plugins direct: one product = one
Roadmap, product vision in its description, tasks as what-to-do-next,
work about the process itself under `Meta Roadmap`, and a topic's
artifacts laid out `<area>/YYYY/MM-DD-<topic>/` with `meta` reserved for
process work — the area that routes to `Meta Roadmap`. It is what makes
routing by convention possible, and it holds whichever stores a session
reaches (→ reach rule): the Roadmaps are ymer projects or `project`
values in the node's `tasks` table, and the topics are folders or rows
in its `topics` table. The `setup` plugin puts what this practice
assumes in place — the notebook's store skeletons always, and
`Meta Roadmap` where the session reaches ymer; the practices themselves
stay the plugins'.
Each plugin states the conventions it routes by in its own shipped prose
(an installed plugin stands alone) — operative use of this term, never a
second definition.

- _Used in_: marketplace
- _Avoid_: the workflow, the methodology, best practices

## F

### friction

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen
- _Avoid_: finding, improvement (the fix, not the observed waste)

### friction-batch

- _Defined in_: `plugins/kaizen/skills/summary/SKILL.md`
- _Used in_: kaizen
- _Avoid_: fix-now topic, the batch

### front
A surface a session runs on — a harness plus the account and
instructions it starts from — named by a snake_case slug that every
front-bound row carries. The node's `fronts` table lists them, one row
each. A session takes its slug from the instructions it starts with, or
from the per-harness default where they name none. Each front drains its
own rows.

- _Used in_: marketplace
- _Avoid_: harness (the front's kind, not the front), surface (bare), client

## K

### kaizen block

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen

## P

### personal-layer principle
Defined in the repo `CLAUDE.md` — the Conventions bullet stating it.

- _Used in_: marketplace

### plans_dir
A plugin's one `userConfig` key (type `directory`), and **optional**:
set, it must name a **state folder** — a git work tree, the user's
version-controlled folder for state; unset, the node's `topics` table is
the state store instead (→ reach rule). It is still the only
machine-local value a plugin takes as configuration — everything else
routes by name convention or by what the session reaches. A folder a
session can write but not commit is not a state folder: the git work
tree is what the term names.

- _Used in_: marketplace
- _Avoid_: workspace, data dir, state path

## R

### reach rule
A store is the default where the session reaches it: ymer's tool surface
for the coordinator, else the node's `tasks` table; a resolved
`plans_dir` naming a git work tree for the state store, else the node's
`topics` table. A store reached but unusable stops the run with its fix
named; nothing is asked and nothing falls back on a failure. Read once,
at a run's guard, from what the session has. Each depositing skill
states it in its own shipped prose — operative use of this term, never a
second definition.

- _Used in_: marketplace
- _Avoid_: presence rule, fallback rule, configured switch

### recurrence row

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen

### router
How a plugin's skills find machine-local state and the objects they
deposit into: one optional `userConfig` key (`plans_dir`) plus name
conventions, over whichever stores the session reaches — the folder is
configuration, the objects are convention, the store is reach
(→ reach rule). Nothing richer is config; a convention with no match
makes the skill say what to create rather than guess.

- _Used in_: marketplace
- _Avoid_: resolver, registry, lookup table

## S

### setup boundary
The two-directional rule dividing the plugins: setup owns the environment
and start position skills work from — configuration wired, store
skeletons present, the connection alive, universal floors in place; a
skill owns its domain and never routes to setup for domain state. A store
file's skeleton is start position, its content domain.

- _Used in_: marketplace
- _Avoid_: setup's scope, env's charter

### state store
Where a front keeps a topic's artifacts: the state folder a resolved
`plans_dir` names, the node's `topics` table otherwise (→ reach rule).
The umbrella over the two, so a skill can name where a topic went
without knowing which a given machine has.

- _Used in_: marketplace
- _Avoid_: state path, workspace, data dir

## V

### vision row

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen
- _Avoid_: vision candidate, vision friction
