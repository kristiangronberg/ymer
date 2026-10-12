# The interview

One procedure for the two phases that put questions to the user,
brainstorm and define. Each reads this file whole before its first
question and follows it. Each phase's own `## The Interview` section
carries only what is that phase's: where its questions come from, its
own rules beside these, and what its pending close writes. This file is
also the one home of the artifact the pending outcome fills, the marker
line and the `## Interview` section (§ 4. Pending).

Four outcomes, run in order and looping: **agenda** first, then
**question** and **answer** while the agenda has items, and **pending**
in place of a question that cannot be put. The procedure never declares
an interview over: the caller reads its own settle signal off the last
answer.

## Ground rules

- **Hold: every question.** The interview is the user's alone, never
  defaulted (*Defaults and holds*: the process contract). No option is
  picked on the user's behalf and no question is skipped as obvious.
  Where a question cannot be put, the pending outcome prepares it
  rather than the session guessing. The tool present is presence, and
  the question waits.
- **Unattended is read at the question**, from the question tool's own
  report: the tool absent from the session's tools, or the call that
  puts the question refused, a refusal never retried. It is never read
  from a line about where the user is, or from the session's own
  judgement: an interactive invocation is presence, whatever the system
  prompt says of the user, and the interview runs in full.
- **The options are the deliverable as much as the pick.** Every
  question reaches the user with its options and their trade-offs in
  prose the question cannot hide: the analysis message with the question
  at its end, or the analysis in one turn and the tool's bubble in the
  next, never a bare bubble over hidden prose (one same-turn rule:
  plan-review § Steps, step 5, "Never in the relay's turn").
- **One question at a time**, never a bulk list. Questions are never
  compressed or bundled to save turns; a topic that needs more
  exploration is broken into several questions, each put on its own.
- **Recommendation first.** Prefer multiple choice with the recommended
  answer first and why; an open question is fine when choices would
  mislead.
- **The interview has no clock.** A question the user wants to verify
  before answering waits, however long the verification takes, and the
  session neither prods nor proceeds on a provisional answer.
- **The deciding fact binds the probe duty wherever it sits**: the
  discriminator between the approaches, the recommendation's own
  differentiator, and anything a question asks the user to report ("what
  did the run print?"). Where it can be probed, probe it before the
  question is put, and never ask the user what the codebase, the record
  or the environment can answer. Where only the user holds it, that fact
  *is* the question. Where it is genuinely expensive to probe, put the
  question with the discriminator marked `inferred:` and named as what
  the pick rests on.
- **A question's premises are claims.** What a question's own text
  asserts (what a consumer does, what the user reported, what exists) is
  probed before the question is put, or marked `inferred:` inside the
  question. Otherwise the selected answer reads as endorsing a premise
  no artifact keeps, and the decision carries it unmarked.
- **Re-ask a standing constraint once.** Before building options on a
  standing constraint (a ground rule, a `CLAUDE.md` fact, a memory), ask
  once whether it still holds: a stale constraint moots every question
  designed around it.
- **Establish the frame before enumerating in it**: for survey-then-sort
  work, the audience and altitude of the artifact class; for a set of
  options, the dimension the user actually wants to control. An
  inherited axis, an adopted artifact's parameters or a convention the
  topic is itself revising, is a candidate frame, never the default:
  state it and ask once before the options are built on it.

## 1. Agenda

*Requires:* the caller's question list and the artifact it records into.
*Produces:* the agenda in dependency order, or a resumed agenda, its
premises re-verified, continued at its first unanswered question.

Put the question list in dependency order. Decisions branch: walk the
design tree, foundational decisions before the ones that depend on
them. A concept's naming question sits directly after the decision that
bounds the concept, before any decision that will speak the name: the
writing dependency runs that way even where the design dependency puts
naming last, and a name chosen before its referent is settled gets
chosen twice. Number the questions `Q1`, `Q2`, … in that order. The
agenda is the record's, not the session's memory.

A prepared agenda, a pending interview being resumed, is not rebuilt.
Re-verify the premises whose ground has moved since they were prepared,
then continue at the first unanswered question; a question that joins
the agenda later is numbered on from the last, never renumbered in. The
caller's own escapes stand throughout: not worth pursuing, a split, a
route back to an earlier phase.

## 2. Question

*Requires:* the next agenda item.
*Produces:* one question put, its premises probed or marked, the options
with their trade-offs in prose, the recommendation first.

Under the ground rules above: the deciding fact and the premises first,
then the options and their trade-offs in prose, then the question itself
through the session's question tool.

## 3. Answer

*Requires:* the user's answer.
*Produces:* the pick recorded in the caller's artifact, a reversal
recorded as such; back to question while the agenda has items.

Record the pick in the caller's artifact as it lands (the question, the
option chosen and the reason the user gave), so a session that resumes
the artifact reads the interview's state from the artifact and never
from memory. A reversal of an earlier pick is recorded as a reversal
beside the pick it reverses, never by rewriting the earlier record:
interviews reverse mid-session, and the artifact says so. That binds the
interview's record alone; brainstorm's scratch ideation around it stays
cheap to rewrite until consolidation, a different object. While the
agenda has items, go back to question; nothing here declares the
interview done.

## 4. Pending

*Requires:* a question that cannot be put: the question tool absent
from the session's tools, or its call refused.
*Produces:* every remaining question prepared into the caller's artifact
under the `Interview pending —` marker; the caller closes around it.

The question is neither answered on the user's behalf nor skipped. A
pending close is a finished close around a hold, not a torn one:
everything before the interview has run (the caller's topic resolution,
its intake, the probes the questions rest on), and every remaining
question is prepared into the caller's own artifact, `brainstorm.md` or
`spec.md`, never into a separate file, in the shape below.

**The marker** is one line, `Interview pending — <date>: <n> questions`
at line start, directly under the artifact's title with a blank line on
each side and ahead of the metadata paragraph, so a read of the head
meets it first. `<n>` counts the questions not yet answered, and the
marker names no phase, because the artifact does.

**The `## Interview` section** of the same artifact holds the prepared
questions, and exists only while the marker does: one
`### Q<n> — <title>` entry per question, in dependency order. Each
carries the question with its premises stamped or marked `inferred:`,
the options with their trade-offs, the recommendation first and marked,
a follow-up that exists on one branch only nested under the option that
forks it as `Q<n>a`, and, for a question answered before a refusal
mid-interview, an `Answered:` line naming the pick and, at define, the
`D<n>` it became.

**The commit.** The pending close commits the artifact under the
phase's message with a suffix, `<topic ID>: brainstorm (interview
pending)` or `<topic ID>: define (interview pending)`. A marker-bearing
artifact left uncommitted is a torn close, which the next pre-flight
commits under that message before it reads the arrival.

**Liveness is presence in the file**, never a commit range. The
caller's own consolidating rewrite removes the marker and the section
together, the answered questions landing in its sections; so does
define's close on the route back to brainstorm, the interview over,
since brainstorm would otherwise stop on the marker define left. The
status ladder reads `brainstormed` and `specced` only off an artifact
whose head carries no marker (the operations contract, § Roadmap).

**The resume.** The caller closes around the pending interview as a
pending step. Which of its own sections it still writes, and how it
marks its record as pending, are the caller's rules, in its
`### Unattended: closing around the interview`. It resumes at the first
unanswered question when its topic resolution meets the marker
(→ 1. Agenda). Topic resolution reads the marker at the four openings
that carry it (plugin glossary): on the phase's own artifact it is the
**pending interview** arrival, and the phase resumes at the first
unanswered `Q<n>`; on another phase's artifact it stops the session and
names that phase. At the resume, prepared premises whose ground moved
are re-verified before their questions are put, added questions are
numbered on from the last `Q<n>`, and the interview's escapes stand:
not worth pursuing, a split, define's route back to brainstorm. Where
`review.md` tops with an iteration marker naming the phase, its finding
is read first as at an iteration: the pending close appended the
marker's `Consumed —` line, so the marker reads consumed (review § Input
item 2). A resume that is itself unattended closes around the interview
again, the marker's date and count the newest close's. A topic carries
one pending interview at most: define stops on a pending `brainstorm.md`
before it writes anything.
