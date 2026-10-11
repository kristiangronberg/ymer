# Product design principles: mechanics

The mechanics of the product-design skill: how the product page is
fetched from the coordinator, and how a miss is told apart from a
product with no page. The headings are `SKILL.md`'s own; read a
section's entries at the moment that section runs.

## The product page

- Fetch the page by a name search for `<Product> Roadmap` asking for
  the description, never by the read that echoes the project's whole
  linked task list. Where the page lives, its skeleton and its fixed
  header are the operations contract's binding.
- A session whose coordinator is the node has no page for any product,
  because the node keeps no projects.
- A name search can miss, so a miss is ambiguous, and the coordinator's
  own listing of projects is the control. A product whose
  `<Product> Roadmap` project is listed **has** a page, so a miss
  against it is a broken lookup: retry it, and never read it as "no
  page". A product with no such project has no page.
