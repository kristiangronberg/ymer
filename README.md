# Ymer Marketplace

This repository is the `ymer` Claude Code plugin marketplace. Each
plugin under `plugins/` packages **one practice** — its skills the
practice's moves.

Using any plugin requires **one** thing, and it is stated in the
marketplace description because it is a real requirement: **a Ymer Node
you run**, whose notebook the plugins keep their stores in. It is yours
to run — no plugin ships one — and `/setup:env` creates the store
skeletons inside it.

Two more things are **optional**, and each is the default where a session
reaches it:

- a **ymer.ax** account, connected as your own MCP server — with it, work
  is tracked in ymer's Roadmap projects; without it, in the node's
  `tasks` table.
- **one folder for state, under version control** — `setup`'s single
  `plans_dir` setting. With it, a drained topic gets a folder beneath it;
  without it, the topic's artifacts are rows in the node's `topics`
  table.

Both are yours to bring — no plugin ships a connection or names your
folder for you — and neither is asked for at run time. A store that is
there and *broken*, though, stops the run rather than quietly using the
other one: that would fork your work across two stores without saying so.

`setup` is the plugin that checks all of this and creates the floors the
way of working needs — the store skeletons always, and a `Meta Roadmap`
project where there is ymer. Its one skill, `/setup:env`, verifies the
environment the other plugins work from and reports it, naming which
store each half landed on; each of their skills stops at an environment
failure and names the door that fixes it rather than repairing anything
itself.

## Installing

Run a Ymer Node, add the marketplace, install `setup` and the plugins you
want, then run `/setup:env` in a fresh session:

```
claude mcp add --transport http --scope user ymer-node http://127.0.0.1:8012/mcp
claude plugin marketplace add kristiangronberg/ymer
claude plugin install setup@ymer
claude plugin install kaizen@ymer
```

[Ymer Node](https://github.com/kristiangronberg/ymer-node) is the local
server the plugins keep their stores in, and its own README says how to
run one; the `claude mcp add` line points Claude Code at it on the
loopback port it serves by default.

**To use ymer as well**, add that connection too — before or after the
lines above, it makes no difference:

```
claude mcp add --transport http --scope user ymer https://ymer.ax/mcp
claude mcp login ymer
```

`add` registers the connection and `login` signs in to it; until both have
run the server contributes no tools at all, and the plugins track work in
the node instead. `--scope user` makes it part of your profile rather than
one project's. If you sign in to Claude Code with a claude.ai
subscription, a ymer connector added at claude.ai reaches Claude Code on
its own — the two `claude mcp` lines are the route that works under every
sign-in.

**To use a state folder as well**, name it as you install `setup` —
`claude plugin install setup@ymer --config plans_dir=<your state folder>`
— or set it afterwards with `/plugin configure setup@ymer`.

`/setup:env` reports what it found, creates the store skeletons that were
missing, and names the store each optional half landed on. Run it
again any time — it changes nothing that is already right, which is also
how an older install catches up on everything setup owns. Your
connections are not among them: setup checks them and reports, and the
`claude mcp` lines above are how you bring them.

**On Claude Cowork** the plugins install through the desktop app and the
skills are listed bare — `/env` rather than `/setup:env`. A Cowork
session reaches no plugin settings, so its state store is the node's
`topics` table.
