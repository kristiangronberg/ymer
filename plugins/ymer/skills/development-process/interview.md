# The interview

One procedure for the two phases that put questions to the user —
brainstorm and define. Each reads this file whole before its first
question and follows it; each phase's own `## The Interview` section
carries only what is that phase's — where its questions come from, its
own rules beside these, and what its pending close writes. The artifact
the pending outcome fills — the marker line and the `## Interview`
section — is development-process § Artifacts, **The pending
interview**; this file is the procedure that fills it.

Four outcomes, run in order and looping: **agenda** first, then
**question** and **answer** while the agenda has items, and **pending**
in place of a question that cannot be put. The procedure never declares
an interview over: the caller reads its own settle signal off the last
answer.

## Ground rules

- **Hold: every question — the interview is the user's alone, never
  defaulted** (*Defaults and holds*: development-process). No option is
  picked on the user's behalf and no question is skipped as obvious;
  where a question cannot be put, the pending outcome prepares it rather
  than the session guessing. The tool present is presence, and the
  question waits.
- **Unattended is read at the question**, from the question tool's own
  report — the tool absent from the session's tools, or the call that
  puts the question refused, a refusal never retried — and never from a
  line about the user's whereabouts or the session's own judgement: an
  interactive invocation is presence, whatever the system prompt says of
  the user, and the interview runs in full.
- **The options are the deliverable as much as the pick.** Every
  question reaches the user with its options and their trade-offs in
  prose the question cannot hide — the analysis message with the
  question at its end, or the analysis one turn and the tool's bubble
  the next, never a bare bubble over hidden prose (one same-turn rule:
  plan-review § Steps, step 5, "Never in the relay's turn").
- **One question at a time** — never a bulk list. Questions are never
  compressed or bundled to save turns; a topic that needs more
  exploration is broken into several questions, each put on its own.
- **Recommendation first.** Prefer multiple choice with the recommended
  answer first and why; open-ended is fine when choices would mislead.
- **The interview has no clock.** A question the user wants to verify
  before answering waits, however long the verification takes, and the
  session neither prods nor proceeds on a provisional answer.
- **The deciding fact binds the probe duty wherever it sits** — the
  discriminator between the approaches, the recommendation's own
  differentiator, and anything a question asks the user to report ("what
  did the run print?"). Probe-able → probe it before the question is
  posed, and never ask the user what the codebase, the record or the
  environment can answer; only the user holds it → that fact *is* the
  question; genuinely expensive to probe → pose it with the
  discriminator marked `inferred:` and named as what the pick rests on.
- **A question's premises are claims.** What a question's own text
  asserts — what a consumer does, what the user reported, what exists —
  is probed before the question is put, or marked `inferred:` inside the
  question; otherwise the selected answer reads as endorsing a premise
  no artifact keeps, and the decision carries it unmarked.
- **Re-ask a standing constraint once.** Before building options on a
  standing constraint — a ground rule, a CLAUDE.md fact, a memory — ask
  once whether it still holds: a stale constraint moots every question
  designed around it.
- **Establish the frame before enumerating in it**: for
  survey-then-sort work, the artifact class's audience and altitude; for
  a set of options, the dimension the user actually wants to control. An
  inherited axis — an adopted artifact's parameterization, a convention
  the topic is itself revising — is a candidate frame, never the
  default: state it and ask once before the options are built on it.

## 1. Agenda

*Requires:* the caller's question list and the artifact it records into.
*Produces:* the agenda in dependency order — or a resumed agenda, its
premises re-verified, continued at its first unanswered question.

Put the question list in dependency order. Decisions branch: walk the
design tree, foundational decisions before the ones that depend on them.
A concept's naming question sits directly after the decision that
bounds the concept, before any decision that will speak the name — the
writing dependency runs that way even where the design dependency puts
naming last, and a name chosen before its referent is settled gets
chosen twice. Number the questions `Q1`, `Q2`, … in that order. The
agenda is the record's, not the session's memory.

A prepared agenda — a pending interview being resumed — is not rebuilt:
re-verify the premises whose ground has moved since they were prepared,
then continue at the first unanswered question; a question that joins
the agenda later is numbered on from the last, never renumbered in. The
caller's own escapes stand throughout — not worth pursuing, a split, a
route back to an earlier phase.

## 2. Question

*Requires:* the next agenda item.
*Produces:* one question put — its premises probed or marked, the
options with their trade-offs in prose, the recommendation first.

Under the ground rules above: the deciding fact and the premises first,
then the options and their trade-offs in prose, then the question
itself through the session's question tool.

## 3. Answer

*Requires:* the user's answer.
*Produces:* the pick recorded in the caller's artifact, a reversal
recorded as such; back to question while the agenda has items.

Record the pick in the caller's artifact as it lands — the question, the
option chosen and the reason the user gave — so a session that resumes
the artifact reads the interview's state from the artifact and never
from memory. A reversal of an earlier pick is recorded as a reversal
beside the pick it reverses, never by rewriting the earlier record:
interviews reverse mid-session, and the artifact says so. That binds the
interview's record alone — brainstorm's scratch ideation around it stays
cheap to rewrite until consolidation, a different object. While the
agenda has items, go back to question; nothing here declares the
interview done.

## 4. Pending

*Requires:* a question that cannot be put — the question tool absent
from the session's tools, or its call refused.
*Produces:* every remaining question prepared into the caller's artifact
under the `Interview pending —` marker; the caller closes around it.

The question is neither answered on the user's behalf nor skipped. A
pending close is a finished close around a hold, not a torn one:
everything before the interview has run — the caller's topic resolution,
its intake, the probes the questions rest on — and every remaining
question is prepared into the caller's own artifact, never a separate
file, in the shape development-process § Artifacts gives the marker and
the `## Interview` section. The section exists only while the marker
does: the caller's own consolidating rewrite removes both together, the
answered questions landing in its sections.

The caller closes around the pending interview as a pending step — which
of its own sections it still writes, and how it marks its record as
pending, are the caller's rules, in its `### Unattended: closing around
the interview` — and resumes at the first unanswered question when its
topic resolution meets the marker (→ 1. Agenda). A resume that is itself
unattended closes around the interview again, the marker's date and
count the newest close's. A topic carries one pending interview at most.
