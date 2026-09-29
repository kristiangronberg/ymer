# Ymer Marketplace

This repository is the `ymer` Claude Code plugin marketplace. The
plugins under `plugins/` are **layered**: the core plugin, `ymer`,
holds the practice every user runs — its skills the practice's moves,
the kaizen loop and the setup check among them — and a domain plugin
specializes that practice for one kind of work, naming itself
`ymer-<domain>` and calling the core's skills the way `/ymer:brainstorm`
names one.

Using any plugin requires **two** things, and they are stated in the
marketplace description because they are real requirements:

- **a Ymer Node you run**, whose notebook the plugins keep their stores
  in. It is yours to run — no plugin ships one — and `/ymer:setup`
  creates the store skeletons inside it.
- **one folder for your state** — the `ymer` plugin's single
  `state_folder` setting — where a drained topic gets a folder of its
  own. It can be any folder: where it is a git work tree its history is
  git, and any other folder's history is kept in the node's
  `topics_history` table.

One more thing is **optional**, and the default where a session reaches
it: a **ymer.ax** account, connected as your own MCP server — with it,
work is tracked in ymer's Roadmap projects; without it, in the node's
`tasks` table.

Each is yours to bring — no plugin ships a connection or names your
folder for you — and none is asked for at run time. A store that is
there and *broken*, though, stops the run rather than quietly using
another one: that would fork your work across two stores without saying
so.

`/ymer:setup` is the skill that checks all of this and creates the
floors the way of working needs — the store skeletons always, and a
`Meta Roadmap` project where there is ymer. It verifies the environment
every plugin works from and reports it, naming the coordinator in use and
the history that tracks your state folder; every other skill stops at an
environment failure and names the door that fixes it rather than
repairing anything itself.

## Installing

Run a Ymer Node, add the marketplace, install `ymer` naming your state
folder (below), then run `/ymer:setup` in a fresh session:

```
claude mcp add --transport http --scope user ymer-node http://127.0.0.1:8012/mcp
claude plugin marketplace add kristiangronberg/ymer
claude plugin install ymer@ymer
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

**Name your state folder**, which the plugin requires, as you install
`ymer` — `claude plugin install ymer@ymer --config state_folder=<your state folder>`
— or set it afterwards with `/plugin configure ymer@ymer`. Any folder
will do, under version control or not.

`/ymer:setup` reports what it found, creates the store skeletons that were
missing, and names your coordinator and your state folder's history. Run it
again any time — it changes nothing that is already right, which is also
how an older install catches up on everything setup owns. Your
connections are not among them: setup checks them and reports, and the
`claude mcp` lines above are how you bring them.

**On Claude Cowork** the plugins install through the desktop app and the
skills are listed bare — `/setup` rather than `/ymer:setup`. A Cowork
session reaches no plugin settings, so its state folder is named in the
instructions your Cowork sessions start with instead: connect the folder
to the project — the folder itself, or one it sits inside — and name it
there, for example `State folder: <the folder's path>`.
