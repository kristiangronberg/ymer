# Lens: codebase consistency

- Read the project's `CLAUDE.md` and `README.md` and check the plan
  against the project's own rules: layering (where persistence calls are
  and are not allowed), shared-helper ownership (reserved names that
  must live in one module), required response conventions, and any hard
  block those files state. Flag any step that would break one.
- Flag steps that diverge from the codebase's established naming and
  structure: open sibling modules doing similar work and compare (CRUD
  names where the codebase prefers add, remove and list, say).
- Flag tooling and configuration gotchas the plan ignores; the
  project's `CLAUDE.md` gotcha and testing sections usually list them (a
  linter configuration's merge behaviour, a security scanner's skip
  configuration, a dependency swapped between a local path and a
  registry release).
- The run data names the glossary that governs this plan. Where it
  exists, check the plan's vocabulary against it: flag names, in prose
  or in code blocks, that use an `_Avoid_` synonym instead of the
  canonical term, and any plan text that redefines a glossary term
  instead of pointing at the glossary.
- Prose claims inside planned content (module and function docs,
  comments, configuration comments, README fragments) are claims:
  verify each against the real codebase and against the plan's own
  grounding facts. A conflict between the two is a finding.
- Payload prose bound for a project repository meets write-plan's frame
  bar (`<plugin root>/skills/write-plan/SKILL.md`, § Payloads) and
  carries no workflow-internal reference (`<plugin root>/glossary.md`,
  the entry of that name). Read both. Payloads that target the state
  folder or a machinery tree talk about the process by right: skip
  them.
- The payload verifier already fails the reference classes that have no
  reading in the target file's frame, so flag what it cannot see: a
  `Step 3`, `Task 4` or `Plan 3a` that means a plan's step rather than
  the target file's own numbering, provenance written as a pointer at
  the record of a change instead of as the change, and prose that is
  true and carries no reference yet is legible only to someone holding
  the plan.
