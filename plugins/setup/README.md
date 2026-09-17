# setup — the environment the other plugins work from

Setup is a plugin with one skill. `/setup:env` wires the environment
every plugin in this marketplace assumes, and then verifies it whenever
you ask.

- **`/setup:env`** checks three things in order — your state folder is set
  and under version control, ymer answers, and a `Meta Roadmap` project
  exists — creating whatever is missing and reporting each one with a fix
  you can follow.

Run it once after installing, in a fresh session — a plugin's skills
load at session start. After that, run it whenever another plugin's
skill sends you here: a skill stops on an environment failure and names
the door that fixes it rather than repairing anything itself.

## Why it is a separate plugin

**The checks belong in one place.** Every plugin here needs the same
environment — a ymer.ax account and one version-controlled folder for
state. Written into each plugin, that knowledge drifts apart; written
here, there is one copy to keep true.

**A run-time skill should not spend its text proving its own setup is
sane.** Ceremony that runs once now runs once. What is left at the tail
of a working session is a single line telling you where to go.

## Safe to ignore once it passes

Setup does no work of its own and holds no state. An installed plugin
that never runs costs a line of context.

It is **convergent**: verify, create what is missing, never touch what
already exists. So the battery is also the upgrade path — when the
standard moves, re-running `/setup:env` brings an old install up to it
for everything setup owns, with no migration to write and no version to
track. Your ymer.ax connection is the exception, because it is not
setup's to write: setup checks it and, when it is missing, tells you the
two commands that bring it.
