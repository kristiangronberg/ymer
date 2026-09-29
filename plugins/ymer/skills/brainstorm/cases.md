# Brainstorming — cases

The cases of the brainstorm skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## Topic Resolution (do this first)

One idea often surfaces in several places at once — an open inbox item, a topic directory, a sketch branch. List everything the lookup found as one **discovered set** and confirm it with a single question: "Found: inbox item `<name>`, current branch `<branch>`. All this topic?" On yes, take all of it in — the inbox item per Inbox Intake, the branch per Branch Intake. Never confirm the pieces one by one. At a split child, an iteration, or a pending interview (case 2) no confirmation fires: the set is already in view, and on an iteration the branch is the reviewed increment rather than a sketch.

The common case (1) adds zero questions; the ambiguous cases and the discovered set add at most one. Resolution is a lookup, not an interview.

## The Interview

**Hold: every question — the interview is the user's alone, never defaulted** (*Defaults and holds*: development-process). Unattended — read at the question, as the procedure says — the phase prepares every remaining question into this artifact's `## Interview` under the `Interview pending —` marker and closes around the interview as a pending step (the procedure's § 4. Pending; brainstorm's own close: → Unattended: closing around the interview, below).

- A probe leaves live machine state as it found it — Docker image tags, containers, published ports, a kept install — and reports whatever it could not restore. Two idioms make that cheap: run a smoke under its own `-p` project name and its own port, and settle tag semantics with a throwaway tag rather than a rebuild that moves a real one.
- Focus on purpose, constraints, and success criteria — what problem this solves and how we'd know it worked.

### Product alignment

Timing: at convergence, against a **formed candidate direction** — after
ideation, before the user declares the direction settled. The moment itself
is anchored where consolidation is triggered (§ Scratch Doc → Consolidate),
which names this beat and the one below and states what happens when the
pick arrives fused with the candidate; read the timing there, not only
here. Never during divergence: evaluation criteria during ideation clamp
the divergence a brainstorm exists for.

**The beat writes nothing on the page.** Material worth keeping that no
settled section already holds leaves the session as **vision rows** in
the backlog — several per capture allowed, the one exemption from
capture's one-friction rule; row grammar and drain are the kaizen
skills'. The row is the durable hand-off, so writing one is not optional
because the direction doc also records it.

A new token destined for another repo's vocabulary — a capability
grammar, a cross-repo name — is checked against that repo's glossary
`_Avoid_` bans before it rides a vision row, a page write or an
annotation: the minting moment is the last one with no gate before the
word propagates, and a banned shape once reached two stores.

## Scratch Doc → Consolidate

**Consolidate only when the user says the direction is settled** — never before. The convergence beats above are what "settled" waits on: they run against the formed candidate *before* it is offered for the pick, and where the pick arrives fused with the candidate — an analysis-then-acknowledge turn, or blanket acceptance of a first proposal — before that pick is acknowledged. Consolidation starts only after their verdicts, and a verdict other than *stay the course* reopens the direction instead of closing it.

**Sweep lists are recall-first.** When the doc enumerates sites — every file using a term, every place a concept touches — that list is a sweep: build it per the sweep skill — substring/stem matching, corpus-wide, synonym terms for meaning sweeps — never an exact-word list of expected places.

**Evidence sections carry measured claims.** The verified-state section is optional; when present its heading opens with **"Verified state"** (canonical tail: "— what the next phase should not re-derive"), and every claim in it is a measured claim under the sweep skill's claims rules — a stamp on each (`command` → observed result), a `control:` clause on every absence or zero. The section's charter is exactly why the duty is strict: what it asserts, the next phase will not re-derive.

Counts reported for a stem or term family come from a **committed sweep artifact** in the topic folder, even where the family was first swept by hand (the sweep skill's Families trigger): a hand-run `rg -c` with a printing control stamps a single measurement, never a family. The artifact rides the phase commit.

A probe or sweep script a later gate is told to **re-run** is committed beside the doc, the way the sweep skill keeps sweep artifacts: a behavioral probe's claims ride the ordinary stamp and control rules, but its script survives all the same — a recipe restated in prose was rebuilt from the prose twice, wrong on the first try both times.

**The block's own altitude is scout's** — module and file, a prose site named by section and quoted text. A `:line` ref rides as an authoring-time lead, never as the anchor an edit is addressed by: write-plan's grounding re-verifies line anchors fresh regardless, so an edit-site list pinned to line numbers is write-plan's product, and a brainstorm that carries one prices it twice.
