---
name: product-design
description: Checks the shape of anything a user will operate against three principles that pull it toward simplicity: a UI, an MCP or LLM tool surface, a CLI, an API, a service, a business process, or a skill an LLM executes. Use when designing such a surface, in any session, and at brainstorm's product-alignment check. Not a review gate, and not for work that shapes no surface a user operates.
user-invocable: false
---

# Product design principles

Three principles pull any surface a user operates toward simplicity.
They treat people and LLMs alike as first-class users. This skill
answers a gate first (who the user is, and which stance the product
takes), then runs each principle's checks against the shape being
considered. It is the one place the gate and the principles are
defined: brainstorm's product-alignment check and any other design
moment point here and record the gate's answers and a verdict, and
never restate the principles.

The plugin glossary (`${CLAUDE_PLUGIN_ROOT}/glossary.md`) defines
product page, settled sections, pace layers, instrumental and
autotelic: this file uses them and says what the skill does with them.
Next steps are defined here, below. How the product page is fetched is
in `mechanics.md`, and what to do when the fetch never lands, and why
this skill writes nothing on the page, is in `cases.md`, both under
this file's headings.

## The product page

*Read with this section: `mechanics.md` § The product page (the mechanics: the fetch, why a session whose coordinator is the node has no page, and the listing that tells a broken lookup from a product with no page) and `cases.md` § The product page (the cases: when the store does not answer, why this skill writes nothing on the page and where its output goes instead (the verdict, and vision drops a carve topic draws, a drop for a product with no page waiting for one), and why the page takes no collection area).*

A known product keeps its answers on its **product page**. Before the
gate, read the product's page where it has one; where it has none, run
the gate and the checks fresh and say so in the verdict.

The page's **settled sections** hold answers already given: use them
instead of deriving them again, and push back on a candidate direction
that contradicts one, Forward direction included, by asking whether
the vision is changing or the direction is.

**Next steps** sit directly under Forward direction, one bullet for
each likely next destination the product's owner names, a line or two
each. Each is a guess, never a task, so several may stand, or none.
Forward direction changes slowly, and the next steps change as fast as
the guess does. The `mint` skill scores how strongly a drop advances
them, so a bullet is worth writing as a destination a drop can be
matched against. An empty section is valid, and that product's drops
then take the lowest direction value.

## The gate, always first

Two answers come before any check runs:

1. **Who is the user:** a human, an LLM, or both? Being an MCP surface
   is a property of the surface, not of whoever operates it, so P2
   scopes the MCP checks.
2. **Which stance:** **instrumental** or **autotelic**? The test: does
   the user's goal lie beyond the artifact? A gamified productivity app
   is instrumental (its streaks are means), a creative tool is
   instrumental (the goal is the work made), and a game or a piece of
   art is autotelic even when it takes effort.

A product used by both kinds of user answers per surface: each surface
is checked against its own operator's ability profile, never an
average of the two.

## P1: Differential change

Find what the evidence says will change often under outside
influence: the market, trends, technology. The parts not expected to
change often must be the more supportive, robust and durable ones,
because they carry the safety and usability of the whole. Design so
that fast **pace layers** ride on slow ones.

- What does the *evidence* say will churn? Design for evidenced
  classes of change, never for speculative flexibility.
- Is every part prone to churn on a fast layer, decoupled from the
  slow one it rides on?
- When X changes, is the change confined? (information hiding)
- Is the foundation small and excellent, not complete and speculative?

## P2: Identify the user

A specific user with specific goals, never "the user". Name them
before picking a profile: which role, in which context, already
knowing what? "A human" is not an answer: an internal employee and a
paying customer differ in goals, training and tolerance.

Two ability profiles:

- **Human:** attention is scarce, working memory is small, and learning
  is a cost.
- **LLM:** the context window is its working memory; it has no memory
  across sessions; a clarifying question is expensive; its reading
  bandwidth is huge.

The core check, for both profiles: what must this user *remember* to
use the surface? Drive it toward zero, with the knowledge in the
world, not in the head.

For an MCP or LLM tool surface, additionally (a small set, which grows
only with evidence):

- Are the tools self-describing?
- Does every error say what to do next?
- Are responses aware of the token budget, carrying the state the
  caller needs next?

## P3: Get out of the way (instrumental products)

For an instrumental product, ask as little thinking of the user as
possible.

- What is the user actually trying to accomplish? Never "use our
  product": the goal lies beyond the artifact.
- Every button, choice and option: who pays for it, the builder once
  or every user forever? Can the builder absorb it? No button beats
  one button, and complexity below the task's intrinsic level only
  moves; it never disappears (Tesler).
- Absorbed complexity lives in the durable slow layer, which is where
  P3 joins P1.

**The autotelic inversion:** for an autotelic product, chosen
difficulty *is* the product, so P3 inverts, while P1 and P2 apply in
full: a game still has pace layers and still identifies its player.

## Anchors

Provenance, not curriculum: one line per source.

- Brand: pace layering; fast learns, slow remembers
- Parnas: information hiding; decompose around what is likely to change
- Gall: working systems grow from simple working systems
- Cooper: goal-directed design; a specific user with specific goals
- Norman: knowledge in the world, not in the head
- Universal design: users differ by ability profile; design to the profile
- Krug: don't make me think
- Weiser: calm technology; attention is the scarcest resource
- Heidegger: ready-to-hand; the tool disappears in use
- Rams: as little design as possible
- Tesler: conservation of complexity; it only moves, never disappears
- Csikszentmihalyi: autotelic experience
- Suits: games as the voluntary overcoming of unnecessary obstacles
