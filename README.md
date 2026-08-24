# Ymer Marketplace

This repository is the `ymer` Claude Code plugin marketplace. Each
plugin under `plugins/` packages **one practice** — its skills the
practice's moves.

Using any plugin requires two things, and they are stated in the
marketplace description because they are real requirements:

- a **ymer.ax** account, connected to Claude Code as your own MCP server, and
- **one folder for state, under version control** — the plugin's single
  `plans_dir` setting.

Both are yours to bring — no plugin ships a connection or names your
folder for you. `setup` is the plugin that checks both and creates the
rest. Its one skill, `/setup:env`, verifies the environment the other
plugins work from and reports it; each of their skills stops at an
environment failure and names that one door rather than repairing
anything itself.

## Installing

Bring the ymer connection, add the marketplace, install `setup` and the
plugins you want, then run `/setup:env` in a fresh session:

```
claude mcp add --transport http --scope user ymer https://ymer.ax/mcp
claude mcp login ymer
claude plugin marketplace add kristiangronberg/ymer
claude plugin install setup@ymer
claude plugin install kaizen@ymer --config plans_dir=<your state folder>
```

`add` registers the connection and `login` signs in to it; until both have
run the server contributes no tools at all. `--scope user` makes it part
of your profile rather than one project's. If you sign in to Claude Code
with a claude.ai subscription, a ymer connector added at claude.ai reaches
Claude Code on its own — the two `claude mcp` lines are the route that
works under every sign-in.

`/setup:env` reports what it found and creates what was missing. Run it
again any time — it changes nothing that is already right, which is also
how an older install catches up on everything setup owns. Your connection
is not among them: setup checks it and reports, and the two `claude mcp`
lines above are how you bring it.
