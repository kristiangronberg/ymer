# Code Review: mechanics

The mechanics of the code-review skill: the Claude Code way of doing
its steps. The headings are `SKILL.md`'s own; read a section's entries
at the moment that section runs.

## Contents

- Input: the default subject, untracked files, a change set, no shell
- The built-in: the call, when a call reads as not run, what comes back, the inline route
- The lenses: Conventions' `CLAUDE.md` files
- Applying fixes (--fix): the fixes and the one line per finding not fixed
- Output: with the ReportFindings tool and without it

## Input

**The default subject**, run on its own with no target: `git diff
@{upstream}...HEAD`, or `git diff main...HEAD` or `git diff HEAD~1`
where there is no upstream. Where the working tree carries changes, or
the range is empty, add `git diff HEAD`: the review often runs before
the commit. A named target (a pull request number, a branch, a path)
replaces the default.

**Untracked files are outside every `git diff`**, and a new test file
or a new doc is the usual case. Run `git -C <tree> status --porcelain
-uall` once per tree in the subject, the tree named by absolute path
(`-uall`, because without it a new directory collapses to one `dir/`
line and the files inside it never enter), and read each `??` path
whole into the subject, narrowed as the diff was: a path target admits
only the untracked paths under it, and a shared tree only the paths the
topic touches, its plan's targets and the paths its recorded refs
changed, never a concurrent session's.

**A change set** is a topic's `payloads/manifest` with its payload
files: each manifest row pairs a payload with its target. There is no
diff to run and no untracked file to add.

**No shell.** Where the session's tools carry no shell, git cannot run
and the subject cannot be read. Read that off the session's own tool
list; never call a tool the list does not carry to find out.

## The built-in

**The call** goes through the Skill tool: skill `code-review`, the
built-in's own name with no plugin prefix, and args `<tier>
--max-findings all <target>`, the target in plain words:

```
low --max-findings all commits 5ed6b17 and a729560 only, in the git tree at /abs/tree, plus its working-tree edits to notes/c.md and its untracked files notes/a.md and notes/b.md
high --max-findings all the branch's own commits main..<topic>, in the git tree at /abs/checkout, plus its working tree and its untracked files
```

The tool answers that the review runs in the background; its findings
arrive as a task notification. Launch every call before the lenses run.

**When a call reads as not run.** While a call is outstanding once the
lenses finish, end the turn to wait: its notification resumes the
session, and another call's from this pass is read, then the wait goes
on. A resume for any other reason (the user's next prompt, say) reads
every call still outstanding as not run, the why "no report by resume".
Where ending the turn would end the run (a headless or `-p` run, a
subagent), an outstanding call reads as not run at once, the why "no way
to wait".

**What comes back** is text: one finding per line, `path:line` and what
is wrong, in the shape the level sets, with no category, and with a
verdict only where the level runs a verify of its own. A report that
says the review could not run, or that shows it reviewed something
other than the tree's subject (another session's commits, say), is the
not-run case of § The built-in in `SKILL.md`. A finding at a file the
change left alone, a caller the change breaks, is still the subject's.

**The inline route.** Where the session carries the ReportFindings tool
and the harness enables it, the built-in may run in this session's own
context instead, reporting through a ReportFindings call of its own,
which is read as its report. Which route runs is the built-in's choice.

## The lenses

**Conventions' `CLAUDE.md` files**, in each tree the lens takes
(`SKILL.md` § The lenses, Conventions): the tree's root `CLAUDE.md`, and
any `CLAUDE.md` or `CLAUDE.local.md` in a directory that is an ancestor
of a changed file, since a directory's file governs only the files at or
below it. Read each one that exists, unless the session already holds it
loaded. The companion is read as a skill, by its name.

## Applying fixes (--fix)

Apply each finding the sort classed apply, then give one line per
finding not fixed saying why: reported for disposition, or skipped. The
outcomes ride the one report (→ § Output), not a call here.

## Output

**Where the ReportFindings tool is in the tool set**, call it once,
after the merge and any fixes, `level` set to the tier, the findings
most severe first, each with `file`, `line`, `summary`, `short_summary`
(the claim alone, at most 60 characters), `failure_scenario` (the
concrete failure, or the cost: what is duplicated, wasted or harder to
maintain, which smell, which rule is broken, which plan task or step
diverges), `category`, `verdict` where the built-in gave one, and with
`--fix` its `outcome`: `fixed` where it was applied, `no_change_needed`
where an apply-class finding found the tree already holding the fix,
`skipped` where it was skipped, and none where it is reported for
disposition, since the schema has no value for that and the missing
`outcome` reads as reported. Its schema takes at most 32 findings: send
the 32 most severe, and list every other finding beside the call in the
same fields. Where nothing
survives, call it with an empty list. On the inline route the built-in's
own call, an input to the merge, came first.

**Where it is not**, print the findings as a list in the same fields,
most severe first, with each finding's source and, with `--fix`, its
outcome.
