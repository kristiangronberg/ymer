---
name: product-design
description: Use when shaping any surface a user will operate — human UI, MCP/LLM tool surface, CLI, API, service, business process, or a skill/process document an LLM executes. Companion to brainstorm's product-alignment beat; fires ad-hoc in any session designing such a surface. NOT for work that shapes no user-operated surface, and not a review gate — code-review and plan-review own their moments.
user-invocable: false
---

# Product design principles

This file is the product-design skill's spine: its intent and the moments in order. Its **cases** — the earned precision: edge cases, exceptions and rulings — are in `cases.md`, under this file's headings; a section that has entries there says so in its first line, and those entries are read at the moment the section runs.

Three principles that pull any surface a user operates toward
simplicity — for humans and for LLMs as first-class user types. Answer
the gate, then run each principle's checks against the shape being
considered. This skill is the principles' only definition site:
consumers (brainstorm's product-alignment beat, ad-hoc design moments)
point here and record the gate's answers plus a verdict — they never
restate the principles.

## The product page

*Read with this section: `cases.md` § The product page (the cases).*

Known products cache their answers on a **product page** — the
`<Product> Roadmap` project's description in the coordinator. Before
running the gate and checks for a known product, fetch it by a name
search for `<Product> Roadmap` asking for the description, never by the
read that echoes the project's whole linked task list. A session whose
coordinator is the node has no page for any product — the node keeps no
projects — so the gate and the checks run fresh there, every time.

Its **settled sections** (Forward direction; Users; Stance; Slow layers /
what churns; What it refuses to be) hold cached answers — use them instead
of re-deriving, and **push back** on a candidate direction that
contradicts any of them, Forward direction included: surface the
contradiction as a question — is the vision changing, or the direction?
Changing a page is allowed but is a conscious, recorded act through a
governed session, never silent drift.

## The gate — always first

Two answers before any check runs:

1. **Who is the user** — human, LLM, or both? (MCP-ness is a property
   of the surface, not of the operator — P2 scopes the MCP checks.)
2. **Which stance** — instrumental or autotelic? (plugin-glossary
   terms). The test: does the user's goal lie beyond the artifact? A
   gamified productivity app is instrumental (streaks are means); a
   creative tool is instrumental (the goal is the work made); a game
   or art piece is autotelic even when effortful.

A both-types product answers per surface: each surface is checked
against its own operator's ability profile, never an averaged one.

## P1 — Differential change

Identify what the evidence says will change often from outside
influences — market, trends, technology. The parts not expected to
change often must be more supportive, robust, and durable: they carry
the safety and usability of the whole. Fast pace layers (plugin
glossary) ride on slow ones, decoupled so fast change never forces
slow change.

- What does the *evidence* say will churn? Design for evidenced
  classes of change, never speculative flexibility.
- Is every churn-prone part on a slow layer, decoupled from it?
- When X changes, is the change confined? (information hiding)
- Is the foundation small-and-excellent, not complete-and-speculative?

## P2 — Identify the user

A specific user with specific goals — never "the user". Name them
before picking a profile: which role, in which context, knowing what
already? "A human" is not an answer — an internal employee and a
paying customer differ in goals, training, and tolerance.

Two ability profiles:

- **Human:** attention scarce, working memory small, learning is a
  cost.
- **LLM:** the context window is its working memory; no cross-session
  memory; clarifying questions are expensive; huge reading bandwidth.

The core check, both profiles: what must this user *remember* to use
the surface? Drive toward zero — knowledge in the world, not in the
head.

For MCP/LLM tool surfaces additionally (a small set; it grows only
with evidence):

- Are the tools self-describing?
- Does every error instruct the next action?
- Are responses token-budget-aware, carrying the state the caller
  needs next?

## P3 — Get out of the way (instrumental products)

The user's goal lies beyond the artifact; require as little thinking
as possible from them.

- What is the user actually trying to accomplish? Never "use our
  product" — the goal lies beyond the artifact.
- Every button, choice, option: who pays — the builder once, or every
  user forever? Can the builder absorb it? No button beats one
  button; complexity below the task's intrinsic level only moves, it
  never disappears (Tesler).
- Absorbed complexity lives in the durable slow layer (P3 joins P1).

**Autotelic inversion:** for autotelic products chosen difficulty IS
the product — P3 inverts; P1 and P2 apply in full: a game still has
pace layers and still identifies its player.

## Anchors

Provenance, not curriculum — one line per source:

- Brand — pace layering: fast learns, slow remembers
- Parnas — information hiding: decompose around what is likely to change
- Gall — working systems grow from simple working systems
- Cooper — goal-directed design: a specific user with specific goals
- Norman — knowledge in the world, not in the head
- Universal design — users differ by ability profile; design to the profile
- Krug — don't make me think
- Weiser — calm technology: attention is the scarcest resource
- Heidegger — ready-to-hand: the tool disappears in use
- Rams — as little design as possible
- Tesler — conservation of complexity: it only moves, never disappears
- Csikszentmihalyi — autotelic experience
- Suits — games as the voluntary overcoming of unnecessary obstacles
