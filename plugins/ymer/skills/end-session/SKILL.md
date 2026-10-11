---
name: end-session
description: Closes a working session deliberately: lists what is unfinished, routes what the session learned to where it belongs, runs the capture, and says when it is safe to stop. Run it yourself as /ymer:end-session; Claude never starts it on its own.
disable-model-invocation: true
---

# Ending the session

End-session closes a session on purpose instead of letting it just
stop. It finds what is unfinished and settles each item with the user,
routes anything durable the session learned to the store it belongs
in, runs the capture, and then says the session is safe to end. It
closes this session only and hands nothing to a successor.

**Announce at start:** "Running end-session:"

## 1. Loose ends, first

Look back over the whole session for unfinished business, and present
it as a short list:

- Actions that were blocked or denied and never resolved.
- Follow-ups promised but not delivered.
- Questions raised but never answered.
- Decisions made but not recorded where they belong: a repository's
  decision doc, a topic's task, a dependency edge that was agreed and
  never written.
- Uncommitted or scratch leftovers the user should know about. Where
  the session wrote into the state store or a machinery tree, check
  each one's status, scoped to this session's paths: a phase that did
  not commit its own writes missed a step, so offer to commit them now.
  Who commits what, and how to treat foreign dirty paths, is settled
  already (the substrate contract).

Go through the list with the user, who decides for each item: handle
it now, let it go, or defer it. When an item is half-finished work a
later session should continue, recommend recording it where that
session will look (its topic's task, or the topic folder) before
ending.

**"Nothing unfinished" is a normal outcome.** Say so and move on;
never invent items to fill the list.

## 2. Knowledge review

This runs after the loose ends are settled, so their outcomes are
routed too. Route anything durable the session surfaced to its
chartered store; the knowledge-placement contract in
development-process names the stores. A session's close has no later
artifact to hand it to, so route it now. Route only what would change
how a future session behaves, and never duplicate what a repository
already records: "nothing needed a store" is a good outcome.

**The coordinator**, where the session reaches it: record the
decisions, observations and reflections from this session that are not
yet logged, linked to the entities they concern. Where the coordinator
is not reached, the step is reported as not run, never skipped
silently (the fallback rule: *Defaults and holds*,
development-process).

**Report the result:** what was routed where, or that nothing needed
changing. A change to what is known is never silent.

## 3. Capture

**Capture block:** invoke the `ymer:capture` skill, source
`end_session`. The battery, the drop grammar and the write live in
that skill alone.

## 4. All-clear

When the loose ends are handled, the knowledge review is reported and
the capture has run (or was declined as a duplicate), tell the user the
session can be ended. If anything was deferred, name where it was
recorded, so it is not lost.
