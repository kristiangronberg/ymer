# The confinement contract

What a phase's session and the agents it dispatches may touch on the
user's machine. The plugin runs beside the user's other sessions, their
apps and their credentials. A review agent that stops another session's
test run, binds the port a real service uses or prints a credential into
a transcript does harm that no later step undoes, and the user meets it
on their own screen.

Skills name this file by its role phrase, *the confinement contract*,
and cite a section by its name (`the confinement contract, § Secrets`);
they never restate one. A skill's spine says when it reads the file, at
its first probe or dispatch, and that line is the one place the file is
named by its path, `${CLAUDE_PLUGIN_ROOT}/confinement-contract.md`. A
brief the plugin writes hands its agent the resolved path, and the
agent reads the file whole before its first command.

## Contents

- The principle
- The scratch root
- The cases
- The host's inventory
- The layers and the gap

## The principle

The contract binds two parties: **the host**, the session running a
phase, its own commands included, and **an agent it dispatches**,
whatever tool started it. Each owns only what it started. Everything
else on the machine is read-only to it. It leaves nothing it started
behind, and it reports what it could not remove, with the command that
removes it.

The cases below are the places this principle has been broken. A
situation no case names is decided by the principle, never read as
allowed.

## The scratch root

A **scratch root** is a directory under the session scratchpad that one
dispatch, or the host itself, owns. The host makes one, fresh, for each
brief the plugin writes (`mktemp -d <session scratchpad>/<phase>-XXXXXX`)
and names it in the brief, and keeps its own scratch under a scratch
root of its own. Whatever a party writes beyond the files its phase
names (the topic folder, and the checkout where its phase edits) lands
under its scratch root: a scratch replica, the copy of a checkout made
to mutate or run something in, and logs, build output and fetched
dependencies alike. Agents that share one root each make a directory of
their own inside it. A root made for a dispatch is removed at that
dispatch's after-read (→ The host's inventory).

A scratch replica made to mutate is a copy (`git clone --local`,
`cp -R`), which leaves no registration in the checkout it came from.
One made with `git worktree add` is restored to clean inside its root
(`git checkout -- .`, `git clean -fd`) before `git worktree remove`.

**The host's own root** is made when the host first needs scratch, and
its path is noted in the session's task list, where a compaction does
not lose it. Every dispatch's after-read leaves it alone. The host
removes it once, at its phase's close, whether or not a dispatch ran,
after `git worktree list` shows nothing under it; one that holds a
dirty worktree stays, as § The host's inventory says of a dispatch's.

The built-in `/code-review` gets none, since it takes no such input:
what it leaves is found by the inventory instead.

## The cases

### Processes

A party stops only a process it started: by the PID it recorded as it
started it (`$!`), or by the process group it started it in (`kill --
-<pgid>`). Never by name or by lookup: not `pkill` or `killall`, and
not a `kill` whose target comes from `pgrep`, `pidof`, `lsof` or `ps`,
which stops whatever else matches, another session's test run or the
user's browser among them. Nor by port: `fuser -k` stops whatever holds
it. Never `kill -1` or `kill 0`: neither names a process, and they
signal every process the party can reach or its whole process group,
the host's included. A PID copied from earlier output records no
ownership. A process it did not start is reported with its command and
never stopped.

A container, a service or a daemon is stopped or removed only if the
party started it, by the name or ID it recorded as it started it, never
by a lookup (`docker kill $(docker ps -q)`, `pm2 kill`, `epmd -kill`,
`launchctl kill`); one it did not start is reported with its command.

### Ports

A server a party starts listens on a port it chose free, never on the
port the project's config gives a real service, which belongs to the
user's running install. A smoke runs under its own `-p` project name
and its own port.

### Live targets

A scratch replica's config still names the user's real targets: a
database, a node, an install path, a URL. Re-point each at a target of
the party's own before anything that writes runs in the replica.

### Sibling trees

A party writes only in the files its phase names and under its scratch
root: never in a sibling checkout, a symlink placed in one included,
never in the user's own configuration, and never in the session's own
checkout to measure something. Mutation to measure happens in a scratch
replica.

### Secrets

A credential is never written to a file or printed into output, since a
transcript keeps what it is shown. No whole-environment dump (`env`,
`printenv` or `set` naming no variable, `export -p`), no read of a
secret store (an SSH private key, the Erlang cookie, `.netrc`, a cloud
credential file, a keychain password), and no print of a variable that
holds a credential. A tool that needs a credential reads it itself. A
party that needs a value prints that one variable, by name, and only
when it holds no secret.

### Residue

Before it returns, a party tears down what it started: it stops its
processes, removes its worktrees (`git worktree remove`, never forced)
and its containers and the throwaway tags it made, and leaves its
scratch root for the host to remove. A kept install and an image's real
tags stay as it found them: settle tag semantics with a throwaway tag,
never a rebuild that moves a real one. Whatever it could not remove it
reports, each with the command that removes it.

## The host's inventory

Around every dispatch (the built-in `/code-review` call, plan-review's
run, a fan-out of agents), the host takes stock before and after:

```
git -C <tree> worktree list --porcelain     # each tree in the subject
ls -A <session scratchpad>
lsof -nP -iTCP -sTCP:LISTEN                 # no lsof: listeners "not read"
```

The after-read runs once every agent of the dispatch has returned. A
leftover is **attributable** when it is new since the before-read *and*
lies under this session's scratchpad, the one key a concurrent session
cannot share. Then, worktrees first, since a worktree removed with its
directory leaves a stale registration behind:

- **An attributable worktree, clean**, outside the host's own scratch
  root: `git -C <tree> worktree remove <path>`, never forced. This line
  is the written rule that determines the command (the substrate
  contract, § Git is never guessed). A commit made only in it becomes
  unreachable, which is accepted.
- **An attributable worktree, dirty**, outside the host's own scratch
  root: reported as a hold with its removal command (the substrate
  contract, § Commit ownership), and the scratchpad entry that holds it
  stays, a scratch root included.
- **An attributable scratchpad entry**, outside every scratch root the
  host made, its own included: removed.
- **Every scratch root the host made for the dispatch:** removed once no
  worktree remains under it. One that holds a dirty attributable
  worktree stays whole, and the hold names the root with the commands
  that remove it (`git -C <tree> worktree remove --force <path>`, then
  `rm -r <root>`), shown to the user and never run by the host.
- **A new listener**, and the process behind it: reported with its
  command, never stopped.
- **Anything new that is not attributable:** left alone, since it may be
  a concurrent session's.

Where a dispatch has not returned (a call that read as not run, and may
still be working), the after-read is not taken and nothing is removed:
the report of the phase that dispatched says `inventory not taken:
<why>` and lists the before-read (worktrees, scratchpad entries,
listeners), so the stranded dispatch's residue can be found. Otherwise
that report lists what the inventory removed, and each item it left
with its command.

## The layers and the gap

This contract is the primary layer, and the host's inventory audits it.
Beneath both, the **confinement hook** (term: the plugin glossary)
denies before the call the harms a command visibly shows: the signals
of § Processes aimed by name, by lookup or at every process, and the
dumps and the secret-store prints and copies of § Secrets. It acts inside every subagent of a
session where the plugin is enabled, a phase's or not, and never in the
user's own session. What a command cannot show (whether a PID is the
party's own, whether a variable holds a secret) stays this contract's
alone, and so does a command whose text the hook cannot read: one built
at run time, run from a script file, or run off this machine (`ssh`,
`docker exec`).

**The gap.** On the built-in `/code-review`'s inline route the built-in
runs in the host's own context, so the hook stays silent: there, only
this contract and the inventory hold.

**The stronger layer.** Claude Code's sandbox confines what a Bash
command may write and reach on the network. It is off by default, and
no plugin can turn it on: a user who wants that layer turns it on in
their own settings.
