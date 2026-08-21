# Ymer Marketplace

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

`setup` is the plugin that checks both and creates what is missing — the
account and the folder itself are yours to bring. Its one skill,
`/setup:env`, verifies the environment the other plugins work from and
reports it; each of their skills stops at an environment failure and names
that one door rather than repairing anything itself.

## Installing

Add the marketplace, install `setup` and the plugins you want, then run
`/setup:env` in a fresh session:

```
claude plugin marketplace add <repository-url>
claude plugin install setup@ymer
claude plugin install kaizen@ymer --config plans_dir=<your state folder>
```

`/setup:env` reports what it found and creates what was missing. Run it
again any time — it changes nothing that is already right, which is also
how an older install catches up with the current standard.
