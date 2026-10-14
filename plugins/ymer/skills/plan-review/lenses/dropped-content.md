# Lens: dropped content

The plan relocates, deletes or rewrites whole at least one
content-bearing file or section. A content unit can lose its home in
either case, and the way to find it differs.

Read the plugin glossary's *content-ownership map* entry first
(`<plugin root>/glossary.md`, the entry of that name): what a
disposition is, and what dropped means.

- **A move or a delete.** The plan must carry a content-ownership map.
  A plan that moves or deletes content with no map is a critical
  finding: demand the map. Audit the map for totality against the
  source: open the files being moved or deleted and walk their content
  unit by unit, and flag a unit with no row. Flag mixed rows: a row
  that hides an operative rule (a safety warning, a behavioural
  constraint) inside a wholesale "archived" or "moved" disposition must
  split.
- **A whole rewrite of a file or a section.** Demand no map. Walk the
  source unit by unit against the rewritten target itself, and flag
  every unit that has no home in the target and no stated drop.
- **Either way**, archiving to a private repository the project never
  hands out counts as dropped, not placed.
