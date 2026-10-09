# Defining — mechanics

The mechanics of the define skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Overview

**Topic directory:** `<state folder>/<repo>/YYYY/MM-DD-<topic>/` — in the
state folder; `<repo>` is the checkout's directory name, or
`meta` for cross-repo process topics, which have no project checkout of
their own; the topic ID stays `YYYY-MM-DD-<topic>`, its folder splits
the ID after the year. The path is absolute: it does not depend on the
session's cwd. Reuse the directory an earlier phase created (find it via the topic's task in the repo's Roadmap project — *look up topic*, binding: the operations contract; the date prefix is the first phase's date). A split child has none yet — create it under today's date (→ Input).
Defining writes `spec.md`.
**Glossary:** the project glossary — home named in § The Glossary
below (stays in the project repo); for a meta topic (topic kinds:
development-process § Topic kinds), the plugin's own glossary file.

## The Glossary

**Home:** `docs/glossary.md` — unless the repo's CLAUDE.md says
otherwise. A repo without one gets the markdown home created
lazily below.

**Document structure — every glossary, always.** The entries above the
register sections are the **blessed index**: an A–Z run of terms, and
nothing else.

- A **term head** is a line-start `### <term>` heading — one per entry, and
  the line a redefinition-in-flight marker sits under (→ Redefinition in
  flight). Lowercase, unless the term is a proper noun.
- Term heads sit under **letter sections**: a line-start `## <Letter>`
  heading, one uppercase letter. A letter section exists only while a term
  sits under it — create it with the first term that needs it, and leave
  absent letters absent. The letter ignores the term's own casing
  (`PKCE` → `## P`).
- **Order is alphabetical on the term's letters and digits only** — case,
  spaces, hyphens and other punctuation ignored, so `action-schema
  invariant` sorts before `action summary`.
- **Register sections** — `## Grandfathered (pending define)`, a flagged
  question list — stay at `##`, after the last letter section, below a
  `---`. Keep a blank line above the `---`: directly under a text line it
  is a setext `h2` in CommonMark, a phantom heading in the document's
  outline. Blank line, `---`, blank line, then the `##`.
- **`##` = letter and `###` = term is an invariant of the blessed index**,
  above the `---` only; the register sections below it keep their own
  shapes. Admonitions (`> ### … {: .warning}`) are call-outs, not
  headings — the invariant never reads them, and they may sit wherever
  prose may, an entry's body included.

A glossary created lazily opens with the header above, and its first entry
creates the first letter section — no empty scaffolding.

## Bootstrap Mode (one-time per repo)

- Fan out 2–4 read-only Explore agents over README, module docs, module
  names, type names, struct/schema fields; collect the domain terms in use.
  Fallback (*Defaults and holds*: development-process): Agent tool
  genuinely absent, or a spawn refused at the permission layer → the same
  sweep single-context; say so in the summary. A system-prompt directive
  conditioning subagent or workflow use on the user having requested it is
  **neither** — invoking this skill *is* that request; fan out normally.

- Write each under `## Grandfathered (pending define)`: term, a one-line
  *apparent* meaning (recorded, not blessed), where it is defined/used.

## User Review Gate

The phase commits all its writes at the close, and the two glossary
commits come first: the state-folder commit is what records their refs, so
it lands last. A project repo's glossary (and any code-home doc sentence)
lives in a **project checkout** (the substrate contract), so it commits on
the topic branch and is addressed by `-C` rather than by the session's
cwd — Claude-run, public register:

```
git -C <checkout> switch <topic>           # or `switch -c <topic> main` when no
                                           # branch exists yet — born caught up
git -C <checkout> branch --show-current    # assert: <topic> — anything else → stop, ask
git -C <checkout> add <glossary home> <code-home files> <prose-home files>
git -C <checkout> commit -m "<imperative summary of the glossary delta>"
git -C <checkout> log --oneline -1         # ref → spec.md glossary delta
```

The branch is born here when no earlier phase made one — an idea-first
topic reaches define before write-plan, and the fence's `switch` line is
that birth. Define runs no project-checkout pre-flight of its own, so
there is no earlier step to carry it: an idea-first topic's branch is
born either here or at write-plan's pre-flight, whichever phase reaches
the checkout first (the substrate contract § Branch workflow). The switch's
mechanics are the project checkout's and are read there rather than
restated here — `switch -c <topic> main`, born caught up (the substrate
contract). With brainstorm's reset still pending the branch is
the sketch and a commit here would ride into the reset: a state no rule
names — ask, run nothing (**git is never guessed**: the substrate
contract).

A meta topic's edits to a machinery tree's glossary — Claude-run, public
register, and the spec's glossary delta records the commit ref
(public-register messages carry no topic ID; the recorded ref is the
join):

```
git -C <tree> add <glossary home>
git -C <tree> commit -m "<imperative summary of the delta>" -- <glossary home>
git -C <tree> log --oneline -1    # ref → spec.md glossary delta
```

Whichever refs exist are real by now and `spec.md` carries them, so the
state-folder commit records a ref rather than predicting one — no roadmap
write: `spec.md` is what the `specced` rung is read from (roadmap contract: the operations contract):

```
git -C <state folder> add <repo>/YYYY/MM-DD-<topic>/
git -C <state folder> commit -m "YYYY-MM-DD-<topic>: define" -- <repo>/YYYY/MM-DD-<topic>/
```

Verify scoped: `git -C <state folder> status` no longer lists the topic's paths; foreign dirty paths may remain — other topics' in-flight work, leave them (concurrent edits: the substrate contract).
