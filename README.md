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

## Installing

Add the marketplace, then install a plugin by name:

```
claude plugin marketplace add <github-url>
claude plugin install kaizen@ymer --config plans_dir=<your state folder>
```
