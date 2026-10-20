# Lens: testability and verification

- Does the plan specify tests, and do they test real logic rather than
  mocks?
- Are edge cases and failure paths covered? For a bug fix, is a
  red-green regression test specified?
- Where the schema changes, is there a migration test or a rollback
  story?
- Does the plan say how each step is verified (the repo's own gate, as
  its `CLAUDE.md` names it), so that completion is proven rather than
  assumed?
- Check the sweep and grep gates the plan embeds (rename gates,
  verification greps, ripple sweeps) against the sweep skill's four
  rules and its claims register (`<plugin root>/skills/sweep/SKILL.md`:
  § 1. Matcher: stems and substrings, not whole words; § 2. Corpus:
  everything, minus exclusions you name; § 3. Mode: a meaning sweep
  never rides one phrasing; § 4. Survivors: every gate must be able to
  fail; § Claims: stamps, controls and the sweep artifact). Read those
  sections first, then check each gate four ways: its matcher, its
  corpus, its mode and its survivors. A gate that cannot fail is an
  incomplete gate, not a style choice: flag it and name which of § 4's
  mechanisms the plan should have used. A gate whose corpus is an
  allowlist of expected sites fails § 2 even where its provenance is
  present: name the whole-corpus form it should take. A matcher that
  misses the forms § 1 names, or a meaning sweep that rides one
  phrasing where § 3 asks for more, is a gap of the same kind: name
  the matcher or the terms it should have used.
- Verification realism: check the plan's expectations against
  write-plan's rules for them (`<plugin root>/skills/write-plan/cases.md`,
  § Grounding: the claim classes and measured, never typed). Read that
  section first. Flag every `Expected:` line or embedded gate whose
  provenance traces to nothing, every red on an existing target with no
  observed failure recorded, and every conditional check with no
  discriminates-when line and skip rule. What you must check is that
  the provenance is present; deriving the values again is at your
  discretion.
- The literal marker `inferred:` surviving anywhere in the plan is an
  unresolved claim: flag each, and name its way out by the same
  section's rule for upstream marks.
