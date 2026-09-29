---
name: end-session
description: Close the current session deliberately
disable-model-invocation: true
---

# Ending the Session

Close the session deliberately instead of just stopping: surface what is unfinished, bring the persistent memories up to date, then confirm it is safe to end.

**Announce at start:** "Running end-session:"

## 1. Loose Ends (do this first)

Sweep the whole session for unfinished business and present it as a short list:

- Actions that were blocked or denied and never resolved.
- Follow-ups promised but not delivered.
- Questions raised during the session but never answered.
- Decisions made but not recorded where they belong (a repo's decision doc, a topic's task, a dependency edge that was agreed and never written).
- Uncommitted or scratch leftovers the user should know about. If the session
  wrote into the state store or a machinery tree, check each one's status scoped
  to this session's paths: a phase that did not commit its own writes is a missed
  step — offer to commit them now. Who commits what, and how to treat foreign
  dirty paths, is settled already (the substrate contract).

Discuss the list: for each item the user decides handle now, drop, or defer. If a loose end is a half-finished piece of work that a future session should continue, recommend recording it where the successor will look — its topic's task, or the topic folder — before ending: end-session closes a session, it does not feed a successor.

**"Nothing unfinished" is a normal outcome.** Say so and move on — do not invent items to fill the list.

## 2. Knowledge Review (after the discussion, so its outcomes are captured too)

Route anything durable this session surfaced to its chartered store — the
knowledge-placement contract in development-process names them. A session
close has no successor artifact to hand to: route now. Calibration:
only what would change behavior in a future session. "Nothing needed a store"
is a good outcome, and never duplicate what a repo already records.

**The coordinator** (where the session reaches it): record decisions,
observations, or reflections from this session that are not yet logged, linked
to the relevant entities. The coordinator not reached → the step is reported as
not run — never silently skipped (fallback rule: *Defaults and holds*,
development-process).

**Report the result explicitly** — what was routed where, or that nothing
needed changing. Knowledge changes are never silent.

## 3. Kaizen

**Kaizen block:** invoke the `ymer:kaizen-capture` skill — source
`end_session`; it declines when this session already captured at a
phase tail. Battery, row grammar, and the write live in that skill alone.

## 4. All-Clear (terminal state)

When the loose ends are handled, the knowledge review is reported, and the capture has run (or was declined as a duplicate), tell the user the session can be ended. If anything was deferred, name where it was recorded so it is not lost.
