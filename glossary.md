# Glossary

Canonical domain terms for this repository — the marketplace and every
plugin in it; this is the repo's one glossary. Prose and manifests use
these terms; `_Avoid_` synonyms are banned in new names. Marketplace-level
terms are defined here. A plugin's own terms are defined in its shipped
glossary file or skill prose, and each plugin that ships a glossary file
has one pointer entry here — one per file, never one per term.

This glossary describes what is: an entry is written when the thing its
term names is real. A `Redefinition in flight — <date> → <topic ID>:`
line under a term head means a change to that definition is in flight;
what stands below it is still the current one.

## B

### battery
A skill's fixed, ordered sequence of probes or checks, run whole — each with a
defined outcome. Always named qualified by its skill (capture's six-probe
battery); a skill has at most one.

- _Used in_: marketplace
- _Avoid_: checklist, probe list, check suite

## C

### continuation line
A non-blank line of a skill's report, with no role mark at its start,
directly under a role line or another continuation line; the live stage
joins it to that role line, and a blank line or the next role line ends
the run (→ role line).

- _Used in_: marketplace
- _Avoid_: wrapped line, overflow line

### coordinator
What tracks a front's work and how topics are named there: ymer's
`<Product> Roadmap` tasks where the session reaches ymer, the node's
`tasks` table otherwise (→ reach rule). Each plugin states which one a
run is using in its own shipped prose and in its report — operative use
of this term, never a second definition.

- _Used in_: marketplace
- _Avoid_: tracker, task system, ymer (as the generic word)

### core glossary
The core plugin's own glossary file — the one home for the terms its
skills speak: the phases and their artifacts, the topic and pipeline
vocabulary, the claims and sweep discipline, the learning track, and the
capture and mint loop over the pool. Read on demand by the skills that need it; a term two or
more plugins speak is defined here in the root instead, and stated
operatively in each plugin's prose.

- _Defined in_: `plugins/ymer/glossary.md`
- _Used in_: ymer
- _Avoid_: the suite glossary, the process glossary (bare), the plugin
  glossary (bare, where two plugins ship one), work glossary

### core plugin
The plugin holding the practice every user runs: every domain plugin
requires it and specializes its skills in the call form, and it names no
domain plugin.

- _Used in_: marketplace
- _Avoid_: general plugin, base plugin, the `work` plugin (as the role)

## D

### declared command
One of the Bash commands a live-stage run may run: the run's hook
refuses every other command, and `bash-commands` reds on any other
command that ran.

- _Used in_: marketplace
- _Avoid_: allowed command

### directed way of working
The opinionated ymer practice the plugins direct: one product = one
Roadmap, product vision in its description, tasks as what-to-do-next,
work about the process itself under `Meta Roadmap`, and a topic's
artifacts laid out `<area>/YYYY/MM-DD-<topic>/` with `meta` reserved for
process work — the area that routes to `Meta Roadmap`. It is what makes
routing by convention possible, and it holds whichever stores a session
reaches (→ reach rule): the Roadmaps are ymer projects or `project`
values in the node's `tasks` table, and the topics are folders in the
state folder. The core plugin's setup skill puts what this
practice assumes in place — the notebook's store skeletons always, and
`Meta Roadmap` where the session reaches ymer; the practices themselves
stay the plugins'.
Each plugin states the conventions it routes by in its own shipped prose
(an installed plugin stands alone) — operative use of this term, never a
second definition.

- _Used in_: marketplace
- _Avoid_: the workflow, the methodology, best practices

### door
The one route a skill names rather than takes: the command to run, the
skill to invoke, or the harness capability a check reaches through, to
get from a stop to what the check needs. A skill that stops names its
door and repairs nothing (→ setup boundary).

- _Used in_: marketplace
- _Avoid_: fallback, remedy, escape hatch, fix line (the line a door is
  named on, not the door)

## F

### front
One installation — a harness config with its own account, connectors,
plugin options and instructions — named by a snake_case slug that every
front-bound row carries. The node's `fronts` table lists them, one row
each. A session takes its slug from the `ymer` plugin's `front` option
where the harness passes plugin options into skills, and from the
instructions it starts with where it does not; there is no default. Each
front drains its own rows.

- _Used in_: marketplace
- _Avoid_: harness (the front's kind, not the front), surface (bare), client

## H

### hermetic probe
The marketplace's maintainer-run gate proving the personal-layer
principle — that the plugins run from nothing personal to the maintainer:
`scripts/hermetic-probe`, its three stages (static, eval, live) chosen by
subcommand, its assertions structural. Run bare it is a skill lift's
beat 5.

- _Used in_: marketplace
- _Avoid_: hermetic gate, personal-layer probe, standing check (the role
  phrase, not the name)

## P

### personal-layer principle
Defined in the repo `CLAUDE.md` — the Conventions bullet stating it.

- _Used in_: marketplace

### probe dir
The persistent directory under `$HOME` the live stage owns: `cfg/`, the
throwaway Claude config that keeps the login and is scrubbed of
marketplace state each run, its `projects/`, every session's transcript,
wiped whole; `data/`, the scratch node's store, recreated
each run; `state/`, the scratch state folder — a plain folder, not a git
work tree — recreated each run too; `compose/`, the stage's own copy
of the compose file it is given, recreated each run, which every
`docker-compose` call runs from so that a project name pinned beside the
original is never in reach; and `hook/`, the runs' Bash hook with the
declared commands it refuses every other command against, rewritten each
run.

- _Used in_: marketplace
- _Avoid_: gate dir, gate config dir, scratch config

## R

### reach rule
The coordinator is the default where the session reaches it: ymer's tool
surface, else the node's `tasks` table. For the state store the rule
reads which history tracks the state folder: git where it is a git work
tree, `topics_history` otherwise. The state folder itself is required,
never a reach default: an unresolved or unusable one stops the run with
its fix named. A store reached but unusable stops the run the same way;
nothing is asked and nothing falls back on a failure.
Read once, at a run's guard, from what the session has. Each depositing
skill states it in its own shipped prose — operative use of this term,
never a second definition.

- _Used in_: marketplace
- _Avoid_: presence rule, fallback rule, configured switch

### result line
The `"type":"result"` event a headless call writes as the last line of
its stream-json trace, carrying whether the call ended in error, why it
ended, and the final message as `result` where there is one. A trace
that ends on any other line has no result line.

- _Used in_: marketplace
- _Avoid_: final message (the `result` field alone), final line, result
  message

### role line
A line of a skill's report that opens with a role mark — `✔`, `✘` or
`–` — past any indent and list bullet; the live stage reads each one as
one fact-bearing line, its continuation lines joined.

- _Used in_: marketplace
- _Avoid_: check line (the probe's own lines), report line (any line,
  prose included), status line

### router
How a plugin's skills find machine-local state and the objects they
deposit into: two `userConfig` keys (`state_folder`, `front`), or the
front's initial instructions where the harness passes no plugin options,
plus name conventions, over whichever stores the session reaches — the
folder and the front are configuration, the objects are convention, the
store is reach
(→ reach rule). Nothing richer is config; a convention with no match
makes the skill say what to create rather than guess.

- _Used in_: marketplace
- _Avoid_: resolver, registry, lookup table

## S

### setup boundary
Each plugin's setup skill owns the environment and start position its
own plugin's skills work from — configuration wired, store skeletons
present, the connection alive; the core plugin's setup skill owns the
universal floors every plugin shares. A skill owns its domain and never
routes to setup for domain state. A store file's skeleton is start
position, its content domain.

- _Used in_: marketplace
- _Avoid_: setup's scope, env's charter

### stage
One of the hermetic probe's three procedures — static, eval, live — each
a whole run chosen by subcommand, ordered by cost and by what it proves.

- _Used in_: marketplace
- _Avoid_: tier (the suite's effort-ladder term, keyed never picked),
  level, layer

### state_folder
The `userConfig` key (type `directory`) that names the state folder
(→ state folder, the core glossary) on a harness that writes plugin
options into skill text; where a harness does not, the front's initial
instructions name the folder instead. It and `front` are the only
machine-local values a plugin takes as configuration — everything else
routes by name convention or by what the session reaches.

- _Used in_: marketplace
- _Avoid_: plans_dir, workspace, data dir, state path

### state store
The state folder together with the history that tracks it: git where
the folder is a git work tree, the node's `topics_history` otherwise.
What a skill names when it saves an artifact without knowing which
history applies.

- _Used in_: marketplace
- _Avoid_: state path, workspace, data dir

## Y

### ymer
The ymer.ax service — tasks, projects, docs and memories — as a session
reaches it: the MCP server a user connects under the name `ymer`, and
the coordinator wherever a session reaches it (→ reach rule). Bare
"ymer" in prose names this service and nothing else; the marketplace is
"the marketplace", and in code form `@ymer`; the core plugin is "the
`ymer` plugin", or `/ymer:<skill>`.

- _Used in_: marketplace
- _Avoid_: ymer (bare, for the marketplace), ymer (bare, for the core
  plugin)
