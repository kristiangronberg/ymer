# Product design principles: mechanics

The mechanics of the product-design skill: how a product area is read
from the coordinator, and how a miss is told apart from a product with
no area. The headings are `SKILL.md`'s own; read a section's entries at
the moment that section runs.

## The product area

- Read the areas by the coordinator's listing of areas, every page of
  it, then a read of each area, whose answer carries its description
  and its task context fields whole; the listing carries names only. A
  product area is one whose description carries a `Repos:` line, and
  the area named Meta; the others are no products. A product's area is
  the one matching its name, whatever the case, or the one whose
  `Repos:` line names the topic's `<repo>`. Never take a product's
  direction from a task's own task context, which carries each task
  context field cut short. Where the settled sections sit in the task
  context fields is the operations contract's binding.
- A session whose coordinator is the node has no product area for any
  product, because the node keeps no areas.
- A read can fail, so a miss is ambiguous, and the listing is the
  control. A product whose area is listed **has** one, so a failed read
  of it is a broken lookup: retry it, and never read it as "no area". A
  product with no listed area has none.
