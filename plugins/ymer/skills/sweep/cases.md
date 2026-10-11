# Sweep: cases

The cases of the sweep skill: the precision earned from sweeps and
reports that went wrong, and the exact forms a rule's output takes.
The headings are `SKILL.md`'s own; read a section's entries at the
moment that section runs.

## Contents

- 1. Matcher: where a grep fails silently
- 2. Corpus: generated output, the exclusion list, the relative corpus
- 4. Survivors: the pairing mechanisms, the delta gate, the control's
  anchor, a stamped baseline by example, the empty KEEP list
- Claims: stamp forms, paths, counts and units, controls, absence
  transcripts, citations, marks and bases, platform facts, comparative
  probes, transit and terminal surfaces

## 1. Matcher: stems and substrings, not whole words

- Know your grep before trusting it. `\b` and lookarounds are blind at
  `_` seams: `_` is a word character, so `\brunner\b` never matches
  `runner_filter`. Alternation syntax varies by tool **and by mode**:
  the same pattern can alternate under one mode flag and be a literal
  under another. A machine's own grep (a wrapper around it, the mode
  it forces, its traversal filter, the shell layer in front of it) is
  described in the front's initial instructions, which are where a
  machine's own facts bind. Facts specific to one repository live in
  that repository's own instructions or memories.

## 2. Corpus: everything, minus exclusions you name

- **When generated output is the corpus**, the config that generates
  it is not a proxy: verify against what is actually built.
- **How an exclusion list over-reaches:** a `_build` substring
  exclusion eats `field_builder.ex`, and a per-line short-circuit skips
  the second term on a shared line.
- The case behind naming a corpus by absolute path: a
  `cd <topic folder> && …` once re-scoped a same-response call's
  `find . -name plan.md` to that folder, which counted 1 plan where
  the re-run with an absolute path counted 148 (2026-08-31). The
  paired total-count control exposed it.

## 4. Survivors: every gate must be able to fail

- **Why the pairing mechanisms are not equal.** A pre-edit baseline
  supplies the gate's expected count by observation rather than by
  reasoning. A known hit elsewhere sits on a different corpus, which
  cannot show that the real one was traversed at all.
- **The delta gate, precisely.** The adjacency is the immunity: the
  before and after measures bracket one edit, so the plan's own
  earlier tasks and other sessions' drift in the corpus cancel out of
  the assertion. The asserted delta is derived by running the matcher
  over the edit's own content, its `payloads/` file, in the gate's own
  counting unit (→ § Claims).
- **Why the control's anchor sits outside the edit corpus:** a control
  anchored inside the files the edits change loses its hits exactly
  when the edits succeed, and the gate becomes unreadable at the
  moment it is needed. Say which file the anchor is on.
- **A stamped baseline, by example.** "Exactly 7 sites exist and this
  plan edits all of them" is a premise; the stamp is the value plus
  when and how it was measured. When the before-run counts 6 or 8, the
  corpus moved since the stamp: drift to correct. It is the same
  family as the stop on a pre-edit baseline that prints nothing: the
  baseline speaks about the premise, not about the edit.
- **Why an empty KEEP list pairs nothing.** A gate pairs itself by
  having survivors, not by its label.

## Claims: stamps, controls and the sweep artifact

- **The two stamp forms.**
  - **Inline stamp**: the claim plus (`command` → observed result).
    "No caller passes `:foo` (`grep -rn -F ':foo' lib/ test/` → no
    output; control: the same matcher on `lib/bar.ex`, where `:foo` is
    defined → 2 hits)."
  - **Section preamble**: one `Stamps:` opener names the matcher, the
    corpus and the control once for every claim beneath it, and the
    claims below carry observed values only. "Stamps: all counts below
    by `grep -rn -i -F '<term>' . --exclude-dir=_build --exclude-dir=deps`;
    control: the same matcher shape on `test/support/conn_case.ex` → 12
    hits."

  A raw result with its reading filter reads: "1 hit, the frontmatter
  `description:` key; a false positive, filtered by reading". The
  backticked command, the `→`, and
  the literal `Stamps:` and `control:` keywords are the grammar's
  machine anchors: keep them, so stamped artifacts stay greppable.
- **A stamped path keeps enough directory to be unique** in the corpus
  it was measured over (`test/my_app/plugs/auth_test.exs`, never a bare
  `auth_test.exs` that two files share), so the re-measure opens the
  file the stamp meant.
- **A cited count comes from a counting command** (`-c`, `wc -l`, or a
  listing read whole), never from one bounded for display: a listing
  piped through `head`, or a tool result the harness truncated, counts
  what it printed rather than what matched.
- **A cited count names its unit.** `grep -c` counts matching
  **lines**, so two hits on one physical line read as one;
  `grep -o -F '<term>' <file> | wc -l` counts **occurrences**. And `-c`
  over several files (`grep -c`, `git grep -c`, `rg -c` alike) prints
  one line count per file and never a sum, where `grep -o … | wc -l`
  over the same files prints one total.
- **Controls over a moving corpus, by example.** A KEEP corpus in the
  state store gains the topic's own artifacts as the work goes on, and
  in a probe of several cases the previous case leaves its state
  behind.
- **Why an absence stamp pastes its transcript.** Pasted output is
  expensive to fabricate where a sentence is free, and a stamp that
  ran but recorded a characterisation ("reproduced a flake") leaves the
  next reader unable to tell whether it ran at all.
- **A citation feeds no plan unchecked.** Write-plan's grounding
  re-verifies the claims a plan relies on, fresh, whatever their
  citation.
- **What a mark and a basis look like.** "The client retries on
  timeout (`inferred:` from the README's wording, not probed)." "The
  dependency exposes 9 actions (as-of v0.8.0)." Stating the older
  basis is the admission that the fact may be stale, since an undated
  stamp claims the artifact's date.
- **Platform and harness behaviour, past the page.** A read of the
  bundle or the source is the second ground for a gap the page leaves.
  A documented fact outranks a measurement of it the size of one
  session.
- **A comparative probe proves it can tell its arms apart first.** Two
  arms that differ only by a flag run `type <cmd>` before their output
  is read, or spell both arms `command <cmd>`: the shell's snapshot
  carries every user alias, so an alias can ride both arms and silence
  the very difference the probe exists to measure (`stow` carried
  `--no-folding` on both arms, 2026-09-10, and the identical output
  read as a finding). Identical arms are an instrument failure until
  the alias question is answered, rule 4's unpaired zero one register
  over, never a result.
- **Transit and terminal surfaces.** The surfaces with a downstream
  re-verifier are direction docs, survey maps, specs, fan-out fact
  sheets, and intake items, whose re-verifier is brainstorm (an item's
  own measurements are derived again before they size the topic). A
  claim in an evidence section that cannot be stamped moves out or is
  dropped; write-plan's grounding is what resolves a plan's inherited
  marks. Marks nobody relies on stay where they are and cost nothing. A
  consequence clause ("if wrong, X") is welcome and never required.
  The register binds new writing only: there is no sweep to mark
  existing artifacts after the fact.
