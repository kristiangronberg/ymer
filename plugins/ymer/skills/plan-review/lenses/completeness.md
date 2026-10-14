# Lens: completeness against the spec

- Does the plan implement everything the spec or its goal requires? Walk
  the spec point by point.
- Find missing steps, unhandled cases and dangling references: a step
  that uses an artifact no earlier step creates.
- Find steps that assume state, files, migrations or functions the plan
  never establishes.
- Find acceptance criteria with no step that implements them.

This is the most common failure class: be exhaustive here.
