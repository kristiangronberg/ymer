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

## D

### directed way of working
The opinionated ymer practice the plugins direct: one product = one ymer
project named `<Product> Roadmap`, product vision in its description,
tasks as what-to-do-next, work about the process itself in a project
named `Meta Roadmap`, and one git-controlled folder for state laid
out `<area>/YYYY/MM-DD-<topic>/` with `meta` reserved for process work —
the area that routes to `Meta Roadmap`. It is what makes routing by
convention possible. The `setup` plugin puts what this practice assumes
in place, `Meta Roadmap` included; the practices themselves stay the
plugins'.
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

## K

### kaizen block

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen

## P

### personal-layer principle
Defined in the repo `CLAUDE.md` — the Conventions bullet stating it.

- _Used in_: marketplace

### plans_dir
A plugin's one `userConfig` key (type `directory`): the user's
git-controlled folder for state. It is the only machine-local value a
plugin takes as configuration — everything else routes by name convention.

- _Used in_: marketplace
- _Avoid_: workspace, data dir, state path

## R

### recurrence row

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen

### router
How a plugin's skills find machine-local state and ymer objects: one
`userConfig` key (`plans_dir`) plus name conventions — the folder is
configuration, the objects are convention. Nothing richer is config; a
convention with no match makes the skill say what to create rather than
guess.

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

## V

### vision row

- _Defined in_: `plugins/kaizen/skills/capture/SKILL.md`
- _Used in_: kaizen
- _Avoid_: vision candidate, vision friction
