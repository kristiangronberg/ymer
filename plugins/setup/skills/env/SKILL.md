---
name: env
description: Use to set up and verify the environment every ymer-marketplace plugin works from — the state folder, its store skeletons, the ymer connection, and the Meta Roadmap project. Run it after installing, and whenever a skill's guard sends you here.
---

# Setup — Env

`/setup:env` puts the environment into the state the other plugins' skills
assume, and reports what it found.

**Announce at start:** "Setup: checking the ymer environment."

Setup owns the environment and the start position those skills work from —
configuration wired, store skeletons present, the ymer connection alive,
universal floors in place. A skill owns its own domain and never sends you
here for domain state.

**The battery below is the desired state.** Every check verifies, creates
what is missing, and never mutates what already exists. So a healthy
machine reports all-pass and changes nothing, and re-running this skill
converges everything setup owns — settings, skeletons, floors — with no
migration step and nothing to version. The ymer connection is not among
them: it is yours, it lives outside any plugin, and re-running can only
report on it.

## The battery

### 1. `plans_dir` — one state folder, under version control

Every plugin in this marketplace that takes `plans_dir` takes the *same*
folder. The values live in the user settings file — `settings.json` under
`$CLAUDE_CONFIG_DIR`, or under `~/.claude` when that variable is unset —
keyed by plugin:

```
pluginConfigs.<plugin>@ymer.options.plans_dir
```

That file is the one to read and the one to name in the report: plugin
option values come from user, `--settings` and managed settings only,
never from a project's own settings.

Read every `@ymer` entry and resolve one value:

- **Nothing carries `plans_dir`** — checks 2 and 4 both hold off: a run
  that never resolved a state folder has no business writing anything.
  Fail this check, naming the file that was read:

  > No ymer plugin has its state folder set in `<the settings file read>`.
  > It is one folder for your state, under version control. Set it with
  > `/plugin configure kaizen@ymer`, or reinstall with
  > `claude plugin install kaizen@ymer --config plans_dir=<your folder>`.

  This branch stops checks 2 and 4, not the run: check 3 waits on nothing
  here, so it still runs and still reports. Which folder it is, is yours
  to say — the folder and the connection are the two things setup never
  writes for you. The two failures below stop no other check by
  themselves; checks 2 and 4 each say what they need, and report
  `not checked` when they do not have it.

- **Two plugins disagree** — fail the check and change nothing. Which one
  is right is a question only you can answer.

- **One value** — that is the resolved `plans_dir`, and it must be a git
  work tree:

  ```
  git -C <plans_dir> rev-parse --is-inside-work-tree
  ```

  A non-zero exit fails the check: the folder is missing, or it is not
  under version control. Say which of the two, and name the fix — create
  the folder and `git init` it, or correct the setting. Setup never
  creates the state folder itself: a mistyped path that setup helpfully
  created is exactly the silent second store this check exists to prevent.

**The report prints whatever check 1 resolved** (→ The report), and that
printing is this check's real catch: a `plans_dir` that is real, versioned
and *wrong* passes every mechanical check there is. The printed path, read
by the person who is standing right here, is the only thing that finds it —
which is why this runs with you present rather than inside every later run.

### 2. The store skeletons

**This check runs only when check 1 resolved a single value that passed
the work-tree probe.** On any other outcome — two plugins disagree, or
the probe failed — there is no folder to trust: report this check as not
checked, name check 1 as what it waits on, and create nothing. Writing a
file under an unresolved path drags the directory into existence behind
it, which is the silent second store check 1 refuses to create.

`<plans_dir>/backlog.md` is the kaizen backlog. Absent, create it with
this header and nothing else:

```markdown
# Backlog

Frictions captured by kaizen at session tails, one row per line in
arrival order — this file is the whole store. `/kaizen:summary` reads it
whole and drains exactly one thing per run, deleting the drained rows.
The file's length is the debt gauge. Grammar: the `kaizen:capture` skill.
```

Present, leave it exactly as it is: the skeleton is setup's, every row in
it is the skill's. Present but not something the backlog writer can append
to — a directory sitting at that path, or a file it cannot write — fails
the check and names the path. Reporting that is setup's job; repairing it
is not, and a check that passed a store no skill can write to would send
the guard's one door back to a green report.

### 3. The ymer connection

One call proves the account, the connection and the sign-in together, and
its result is what check 4 reads: a `projects list` name search for
`Roadmap`, asking for each project's id and name. The parameter shape is
the server's — ask its `help` for the action if you do not have it.

Any result passes, an empty one included. A failure fails the check and
says so plainly — setup can neither repair an outage nor sign you in.
`/mcp` is where to look: a connection that needs sign-in says so there and
takes it; an outage you can only wait out.

No such call available at all means this session has no ymer connection —
either none was ever added, or one was added but never signed in to; from
in here the two look the same. The connection is yours to bring, and no
plugin ships one. Both cases end the same way:

```
claude mcp add --transport http --scope user ymer https://ymer.ax/mcp
claude mcp login ymer
```

Adding one that already exists changes nothing, so run both either way,
then start a fresh session.

### 4. The `Meta Roadmap` project

**This check runs only when check 1 resolved a single value that passed
the work-tree probe, and check 3 passed.** Check 3's result is the
project list this check reads, so a failed connection leaves nothing to
read in — and creating `Meta Roadmap` is a write, which a run that never
resolved a state folder has no business doing. On either miss, report
this check as not checked: name check 1 when the folder is what is
missing, check 3 when the connection is. Do not call back into a
connection that just refused.

Work about how you work belongs to no product, so it gets a project of its
own, named exactly `Meta Roadmap`. Every machine has one — a floor, not a
naming decision, which is why setup creates it instead of asking.

Check 3's result already lists it. Absent, create it with
`projects create` — named exactly `Meta Roadmap`, its description the
markdown below:

```markdown
# Meta Roadmap

Improvement work about how you work — the process itself, belonging to no
product. Its tasks are what to do next. `/kaizen:summary` drains
process-level picks here; a pick about a product goes to that product's
`<Product> Roadmap` instead.
```

Present, leave it untouched, description included. Per-product Roadmap
projects are *not* setup's to create: they are born from your products,
and the skill that needs one says so when it is missing.

## The report

One line per check, in order — a pass, a failure with the single command
or edit that fixes it, or `not checked` naming the earlier check it waits
on. The resolved `plans_dir` is printed whenever check 1 resolved one, a
failed work-tree probe included; where two plugins disagree the line
carries both values and the plugins holding them instead.

```
Setup — ymer environment

  ✔ plans_dir     /Users/you/state (kaizen@ymer) — git work tree
  ✔ backlog.md    created
  ✔ ymer          reachable
  ✔ Meta Roadmap  exists

Ready. Re-run /setup:env whenever you like — it changes nothing that is
already right.
```

A check that passed needs no explanation and a check that failed needs
exactly one next action, so the report carries nothing else.

## Remember

- Verify, create what is missing, never mutate what exists — re-running
  this skill is the whole upgrade story for everything setup owns
- One state folder, shared by every ymer plugin that takes one; setup
  reports a disagreement and never picks a winner
- Setup writes skeletons and floors, never content: rows in the backlog
  and per-product Roadmap projects belong to the skills and to you
- The folder and the connection are yours to bring — an unset `plans_dir`
  stops checks 2 and 4, a missing connection fails check 3, and setup
  instructs in both cases rather than writing either
- A check whose input never resolved reports `not checked` and writes
  nothing — setup repairs on facts, never on a guess
