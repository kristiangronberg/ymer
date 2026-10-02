# Product design principles — cases

The cases of the product-design skill, moved here byte for byte from `SKILL.md`, which keeps the intent and the spine and names this file under every heading that has entries here. The headings are `SKILL.md`'s own; read a section's entries at the moment that section runs.

## The product page

That is a name search, so a miss is ambiguous, and the coordinator's own
listing of projects is the control: a product whose `<Product> Roadmap`
project exists **has** a page, so a miss against a project that lists
**is** a broken lookup — retry, and never read it as "no page". A
product with no such project has no page by construction: run the checks
from scratch and say so. Store unreachable
→ defer and retry each turn; a fetch that lands before the verdict counts
as run; one that never lands → run the checks from scratch and say so in
the verdict — reported, never silent (fallback rule: *Defaults and
holds*, development-process).

**This beat writes nothing on the page.** Its output is the verdict in
the direction doc plus, for material worth keeping that no settled
section already holds, **vision** drops in the pool — several per
session allowed (grammar: the `capture` skill; drawing: the `mint`
skill). Mint clusters a product's vision drops and drains them as a
**carve topic**: a normal pipeline topic in that product's area, and the
one door through which content enters a page after onboarding. A drop
for a page-less product waits until that product's onboarding creates
its page.

There is deliberately no collection container on the page and no drain
trigger for one: **intake is the pool** — collected material rides the
one intake that already exists. A proposal to give the page a landing
area, a staging section, or a threshold that fires a drain is refused on
those grounds, whatever it is called.
