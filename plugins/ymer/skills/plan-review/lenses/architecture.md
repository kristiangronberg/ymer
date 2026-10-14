# Lens: architecture and design

- Coupling and single responsibility: does any step give one action more
  than one owner, or repeat a save, update or broadcast sequence across
  call sites instead of hoisting it into one shared function?
- Does the design fit the module ownership the repo documents: in
  `README.md`, or, where the run data names a companion skill, wherever
  that skill says module ownership is documented? Load the skill by that
  name the way the front loads its own skills, and if it will not load,
  say so. Does the plan put logic in the wrong layer?
- Does it duplicate logic that already exists or should be shared?
- Where the project documents a layering for an entry point (a tool, a
  route, a handler), does the plan respect it and keep persistence
  calls where the project says they live?
- Does it introduce a worse abstraction than the codebase already uses?
