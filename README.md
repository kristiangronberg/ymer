# ymer — plugins for working with ymer.ax

This repository is the `ymer` Claude Code plugin marketplace. Each
plugin under `plugins/` packages **one practice** — its skills the
practice's moves.

Using any plugin requires two things, and they are stated in the
marketplace description because they are real requirements:

- a **ymer.ax** account, and
- **one folder for state, under version control** — the plugin's single
  `plans_dir` setting.

Every plugin ships an `.mcp.json` connecting the installing session to
ymer.ax, so installing a plugin is also connecting to ymer.

## Installing

Add the marketplace, then install a plugin by name:

```
claude plugin marketplace add <github-url>
claude plugin install kaizen@ymer --config plans_dir=<your state folder>
```

## Layout

```
.claude-plugin/marketplace.json   the marketplace manifest — name, description, plugin list
plugins/<plugin>/
  .claude-plugin/plugin.json      the plugin manifest — description, version, userConfig
  .mcp.json                       the plugin's MCP door
  skills/<name>/SKILL.md          one directory per skill; the skills/ level is required
  scripts/                        anything the skills shell out to
  README.md                       the plugin's own narrative, for whoever installs it
```

## Working on a plugin locally

From the root of a checkout, add the working tree itself as the
marketplace. A marketplace name can be registered from one source at a
time, so this replaces a registration made from the published URL —
re-add that URL to switch back.

```
claude plugin marketplace add .
claude plugin install kaizen@ymer --config plans_dir=<your state folder>
```

A marketplace added from a local directory is served **live from that
directory**: editing a `SKILL.md` here changes the installed skill
immediately, with no `claude plugin update` and no version bump.
`${CLAUDE_PLUGIN_ROOT}` resolves to the plugin's directory in this
repository, so a script path a skill hands to the shell is stable across
versions too. That is what makes dogfooding a plugin cheap — but it also
means a half-finished edit is live in every session, so keep the working
tree runnable.

`claude plugin validate <dir>` checks a manifest before anyone installs
it. It runs on the repository root (the marketplace manifest) and on any
plugin directory. Two rules it enforces that are easy to miss: every
`userConfig` entry needs a `title` as well as a `description`, and a
manifest that fails validation makes the whole plugin fail to load —
including its `--config` values, which are then silently not applied.

## Version housekeeping

Installing from a published marketplace snapshots the plugin into a
version-keyed cache directory, and those directories accumulate: an
update leaves the old version's directory in place, and so does an
uninstall. `claude plugin prune` does not remove them — it removes
auto-installed dependencies. Deleting stale version directories under the
plugin cache is a manual, occasional chore, and a harmless one.

## Conventions

- The consumer-visible marketplace name comes from
  `.claude-plugin/marketplace.json`, never from the folder name.
- One plugin per practice, named for the practice.
- Domain terms for this repo live in the root `glossary.md`: documents
  use a term and point at its home, never redefine it.
