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

## Marketplace

### plans_dir
A plugin's one `userConfig` key (type `directory`): the user's
git-controlled folder for state. It is the only machine-local value a
plugin takes as configuration — everything else routes by name convention.

- _Avoid_: workspace, data dir, state path

### MCP door
The `.mcp.json` a plugin ships at its root, registering the
ymer.ax MCP server for a session that has the plugin installed and no ymer
connection of its own — installing a plugin is connecting to ymer. A
session that already has a server for the same URL keeps its own, and
the door is skipped (the client deduplicates on command/URL). The
endpoint is fixed, not configuration; the session authenticates through
the platform's MCP sign-in the first time it calls.

- _Avoid_: connector, integration, ymer client

### router
How a plugin's skills find machine-local state and ymer objects: one
`userConfig` key (`plans_dir`) plus name conventions — the connection is
configuration, the objects are convention. Nothing richer is config; a
convention with no match makes the skill say what to create rather than
guess.

- _Avoid_: resolver, registry, lookup table

### directed way of working
The opinionated ymer practice the plugins direct: one product = one ymer
project named `<Product> Roadmap`, product vision in its description,
tasks as what-to-do-next, and one git-controlled folder for state laid
out `<area>/YYYY/MM-DD-<topic>/` with `meta` reserved for process work.
It is what makes routing by convention possible.
Each plugin states the conventions it routes by in its own shipped prose
(an installed plugin stands alone) — operative use of this term, never a
second definition.

- _Avoid_: the workflow, the methodology, best practices

## kaizen

### friction
Defined by the kaizen plugin — `plugins/kaizen/skills/capture/SKILL.md` is its home.

- _Avoid_: finding, improvement (the fix, not the observed waste)

### backlog
Defined by the kaizen plugin — `plugins/kaizen/skills/capture/SKILL.md` is its home.

- _Avoid_: improvements pool, staging

### kaizen block
Defined by the kaizen plugin — `plugins/kaizen/skills/capture/SKILL.md` is its home.

### vision row
Defined by the kaizen plugin — `plugins/kaizen/skills/capture/SKILL.md` is its home.

- _Avoid_: vision candidate, vision friction

### recurrence row
Defined by the kaizen plugin — `plugins/kaizen/skills/capture/SKILL.md` is its home.

### cluster
Defined by the kaizen plugin — `plugins/kaizen/skills/summary/SKILL.md` is its home.

### friction-batch
Defined by the kaizen plugin — `plugins/kaizen/skills/summary/SKILL.md` is its home.

- _Avoid_: fix-now topic, the batch

### carve topic
Defined by the kaizen plugin — `plugins/kaizen/skills/summary/SKILL.md` is its home.

- _Avoid_: carving session, lift-out, digest, drain (that is `/kaizen:summary`'s act, not the topic)
