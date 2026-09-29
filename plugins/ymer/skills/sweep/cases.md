# Sweep — building find-all-sites lists — cases

The cases of the sweep skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## 1. Matcher — stems and substrings by default

- Know your grep before trusting it: `\b` and lookarounds are blind at
  `_` seams (`_` is a word character, so `\brunner\b` never matches
  `runner_filter`), and alternation syntax varies by tool **and mode**
  — the same pattern can alternate under one mode flag and be a
  literal under another. This machine's own grep — the wrapper, the
  mode it forces, its traversal filter, and the shell layer in front
  of it — is documented in the front's initial instructions, which are
  where a machine's own facts bind. Facts genuinely specific to one
  repository live in that repository's own instructions or memories.

## 2. Corpus — everything minus named exclusions, never an allowlist

- Generated output is excludable **unless the claim is about the
  generated output** — then the built artifact IS the corpus and its
  generating config is not a proxy: verify against what is actually
  built.
- The exclusion list is a **third matcher** — it deletes hits as surely
  as the pattern selects them, and its over-reach is invisible in the
  output (a `_build` substring exclusion eats `field_builder.ex`; a
  per-line short-circuit skips the second term on a shared line).
  Prove the survivors print: exclusions ride the same falsifiability
  rules as the matcher — rule 4's gates reach them.

## 4. Survivors — gate shapes, and why a gate must be able to fail

- **Every gate states its shape, and every gate must be falsifiable:
  "matcher works, corpus clean" has to be distinguishable from
  "matcher broken".** Three shapes satisfy that requirement, and they
  are not peers:
  - **expected-survivor** — hits must be exactly the KEEP list. This
    shape is *self-pairing*: the KEEP list is the positive control, so
    a gate printing nothing where survivors are expected means the
    matcher is inert, not that the corpus is clean.
  - **zero-hit** — the matcher is precise enough that any hit is a
    straggler; say "no KEEP list needed" and why. This shape is *not*
    self-pairing and is therefore **incomplete on its own**: it also
    carries a **paired non-zero assertion through the same matcher**,
    named with its observed result. Three mechanisms:
    1. **pre-edit baseline** — run the gate before the change; it
       must print. Preferred where available: it supplies the gate's
       expected count by observation instead of by reasoning.
    2. **planted hit** — insert a synthetic match, watch it print,
       remove it.
    3. **known hit elsewhere** — the same pattern against a corpus
       where it is known to occur. Weakest of the three: a different
       corpus cannot show that the real one was traversed at all, so
       say when it is the only one available.
  - **delta** — for an incremental edit: measure immediately before
    the task's edit, apply the edit, measure immediately after,
    assert the difference. The adjacency is the immunity: the pair
    brackets one edit, so the plan's own earlier tasks and other
    sessions' corpus drift cancel out of the assertion. The asserted
    delta is derived by running the matcher over the task's own
    payload — the exact content the edit adds or removes, its
    `payloads/` file — never counted by eye, and in the gate's own
    counting unit (→ Claims).
    Falsifiability comes from the measurements
    themselves: a before-measure that prints is self-pairing; an
    edit introducing the first hits (0→N, N>0) self-pairs through
    the after-measure; a 0→0 delta gate is a zero-hit gate in
    disguise — nothing ever needs to print — and carries a paired
    non-zero assertion like any other. A delta gate certifies the
    increment only, never a terminal state: "the last site is gone"
    is a measured absolute — zero-hit or expected-survivor.
- No gate is exempt. Mechanisms 2 and 3 reach any corpus, including a
  gate asserting that something never existed.
- A pairing shares the *pattern*, not just the tool. Grepping some
  other term to show "grep works" proves only that the binary runs;
  every pattern-level failure survives it.
- The pairing's known-hit anchor lies **outside the sweep's expected
  edit corpus**: a control anchored inside the edit set loses its hits
  exactly when the edits succeed, so the gate goes uninterpretable at
  the moment it is needed. Anchor on a file the topic will not touch,
  and say which.
- Two stops, neither a mechanical fix: a pre-edit baseline that prints
  nothing (either the matcher is inert or the premise that these sites
  exist is false — both findings), and a pairing that itself prints
  nothing (the gate's zero is uninterpretable; fix the matcher, not
  the corpus).
- A baseline that itself carries a claim is a **stamped baseline
  assertion**: when a gate's premise is a measured absolute ("exactly
  7 sites exist and this plan edits all of them"), the gate states the
  measured value with its stamp — the value plus when and how it was
  measured — and the before-run re-measures it. A mismatch is a
  stale-premise signal — the site list needs re-sweeping — not a gate
  failure: the corpus moved since the stamp, which is drift to
  correct, never proof the edit failed. Same family as the
  silent-baseline stop above: the baseline speaks about the premise,
  not about the edit.
- An expected-survivor gate whose KEEP list turns out empty *is* a
  zero-hit gate and carries the pairing like any other. Self-pairing
  comes from having survivors, not from the label.
- An unexpected hit is a miss to fix, never a survivor to whitelist:
  scrub it so the gate stays true as written.

## Claims — stamps, controls, and the sweep artifact

- **Every measured claim carries a stamp** — its generating command
  with the observed result. Two canonical forms:
  - **Inline stamp** — the claim plus (`command` → observed result):
    "no caller passes `:foo` (`grep -rn -F ':foo' lib/ test/` → no
    output; control: the same matcher on `lib/bar.ex`, where `:foo`
    is defined → 2 hits)."
  - **Section preamble** — one `Stamps:` opener naming matcher,
    corpus, and control once for every claim beneath; the claims
    below carry observed values only: "Stamps: all counts below by
    `grep -rn -i -F '<term>' . --exclude-dir=_build --exclude-dir=deps`;
    control: the same matcher shape on
    `test/support/conn_case.ex` → 12 hits."
  A stamp records the raw observed result, plus the reading-side
  filter when one applied ("1 hit — the frontmatter `description:`
  key; false positive, filtered by reading"). Dates inherit the
  artifact's date unless stated. The backticked command, the `→`, and
  the literal `Stamps:` / `control:` keywords are the grammar's
  machine anchors — keep them, so stamped artifacts stay greppable.
  **A stamped path keeps enough directory to be unique** in the corpus
  it was measured over — `test/my_app/plugs/auth_test.exs`, never a bare
  `auth_test.exs` that two files share — so the re-measure opens the
  file the stamp meant.
  **A cited count comes from a counting command** — `-c`, `wc -l`, or a
  listing read whole — never from a display-bounded one: a listing piped
  through `head`, or a tool result the harness truncated, counts what it
  printed rather than what matched. And "on inspection" is prose, not a
  stamp: it names no matcher, so nothing can re-run it. **A cited count
  also names its unit**: `grep -c` counts matching **lines**, so two hits
  on one physical line read as one; `grep -o -F '<term>' <file> | wc -l`
  counts **occurrences**; and `-c` over several files — `grep -c`,
  `git grep -c`, `rg -c` alike — prints one line-count per file and never
  a sum, where `grep -o … | wc -l` over the same files prints one total.
- **Every absence or zero additionally names its positive control** —
  a literal `control:` clause carrying the mechanism (rule 4's pairing
  mechanisms) and its observed non-zero. The pairing is pattern-level:
  the control shares the matcher, not just the tool, and its anchor
  lies outside the expected edit corpus (rule 4). **"Every" is
  reflexive** — it reaches the one-off probe typed mid-interview, not
  just the gates and sweeps rule 4 describes, and the control is
  designed into the probe as the command is typed: a zero read off an
  uncontrolled probe is re-run, never annotated after the fact. And a
  **control is run, not supplied**: one that can run where it is
  authored is run there, its observed non-zero recorded. Over a corpus
  that grows — a KEEP corpus in the state store gaining the topic's own
  artifacts — it asserts non-zero, never an exact number. In a
  multi-case probe it runs on a fixture reset to the state the claim
  names, never on what the previous case left behind.
  **An absence stamp pastes its transcript** — the observed output as a
  fragment, the matcher's zero line and the control's printing line —
  never a prose summary. A stamp composed from the expected answer is
  byte-indistinguishable from one transcribed from a run, and a fragment
  is expensive to fabricate where a sentence is free; a stamp that ran
  but recorded a characterisation ("reproduced a flake") leaves the next
  reader unable to tell which.
- **Generate, don't transcribe** — the preference ladder, best first:
  run the covering sweep artifact; cite a stamped source, naming the
  artifact and where its stamp lives; stamp the inline command; state
  no number. A chain rooted in an unstamped number is not a citation —
  re-measure or state no number. Citation feeds no plan unchecked:
  write-plan's grounding re-verifies plan-relevant claims fresh
  regardless.
- **The sweep artifact** — a committed, re-runnable script that
  measures a topic's corpus claims (the stem-sweep and term-gate
  genres), kept in the topic folder beside the map or doc whose
  numbers it generates. A committed behavioral probe is not a
  sweep artifact — its claims ride the ordinary stamp and control
  rules. Two triggers make an artifact owed; otherwise stamps and
  controls suffice:
  - **Retention** — a re-runnable measurement script the session
    wrote to produce reported numbers is committed beside them, never
    discarded.
  - **Families** — counts reported for a stem/term family (a set of
    matchers swept together) come from an artifact even when first
    swept by hand; the script is what makes family numbers
    reproducible. One-off single measurements need only an inline
    stamp.
- **Coverage binding** — the artifact covers every family its map
  reports counts for: a family joins the artifact before its counts
  ship. A map whose stem list outruns its script is reporting unswept
  numbers.

The bullets above bind measured claims. A second register binds claims
nothing measured, at the **load-bearing** trigger: a decision, an
ordering, a gate, or a scope exclusion rests on the claim. Its two
tokens are machine anchors of the same grammar — literal, greppable,
kept verbatim like `Stamps:` and `control:`.

- **Probe or mark `inferred:`** — a load-bearing claim nothing
  measured — how code, a script, a dependency, or a framework behaves;
  what an upstream doc documents; why something is out of scope —
  either carries its probe (an ordinary stamp) or the literal marker
  `inferred:`, which names what the claim is: reasoned from something,
  not observed. "The client retries on timeout (`inferred:` from the
  README's wording — not probed)." The marked lines are downstream's
  re-verify register (`grep -rn -F 'inferred:'` over inherited
  artifacts). A probed claim exits the register under a fresh stamp; a
  genuinely uncheckable one is an assumption (write-plan's Assumptions
  block), not an inferred claim.
- **Re-verify, or carry `as-of <basis>`** — an already-measured
  external fact (a web result, a dependency version, an upstream doc,
  another artifact's claim) is re-verified at the moment of use — a
  fresh stamp — or carries the literal token `as-of` followed by the
  basis whose movement invalidates the claim: SHA, version, date.
  "The dependency exposes 9 actions (as-of v0.8.0)." Under
  dates-inherit an undated stamp claims freshness, so stating the
  older basis IS the staleness acknowledgment. A claim never measured
  AND external is `inferred:`, not as-of. A citation of another
  artifact's claims names the cited artifact's measurement basis — a
  citation is itself a load-bearing external fact, so basis-carrying
  composes with re-verify-or-mark rather than forming a second rule.
  For **platform and harness behaviour** — what a vendor's tool does with
  a setting, a key, a command — the vendor's page is the first ground,
  cited `as-of <fetch date>`, and a probe covers only what the page
  leaves unstated; a bundle or source read is the second ground, for the
  same gap. A documented fact outranks a session-sized measurement of
  it.
- **A stamp's authority ends at its output** — the characterization
  attached to a stamp (what the result means, why it came out that
  way) is a register claim like any other: probe it or mark it
  `inferred:`; when a gate rests on the characterization, the mark
  lane is unavailable — probe.
- **A comparative probe asserts its own discriminating power first.**
  Two arms that differ only by a flag run `type <cmd>` before their
  output is read, or spell both arms `command <cmd>`: the shell snapshot
  carries every user alias, so an alias can ride both arms and silence
  the very difference the probe exists to measure (`stow` carried
  `--no-folding` on both arms, 2026-09-10, and the identical output read
  as a finding). Identical arms are an instrument failure until the
  alias question is answered — rule 4's unpaired zero, one register
  over — never a result.
- **A mark travels with its claim** — citing or quoting an inferred
  claim without its `inferred:`, or an as-of fact without its basis,
  launders it: the mark is the claim's epistemic status, not
  decoration on the source artifact.
- **Marks live on transit surfaces and are resolved before terminal
  ones.** The mark lane exists exactly where a downstream re-verifier
  exists — direction docs, survey maps, specs, fan-out fact sheets,
  intake items (whose downstream re-verifier is brainstorm: an item's
  own measurements are re-derived before they size the topic).
  Terminal surfaces stay strict: evidence sections take no marks (an
  unstampable claim moves out or drops), and a finished plan carries
  none — write-plan's grounding resolves every inherited mark the
  plan relies on. Marks nobody relies on stay where they are and cost
  nothing; consequence clauses ("if wrong, X") are encouraged, never
  mandatory; the register binds new authoring only — no retroactive
  marking sweep over existing artifacts.
