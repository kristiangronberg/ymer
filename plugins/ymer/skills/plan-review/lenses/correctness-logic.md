# Lens: correctness of logic, sequencing and data flow

- Logic errors in the proposed approach: wrong ordering, an off-by-one in
  a sequence of steps, a wrong assumption about how the existing code or
  the libraries it calls behave.
- Data-flow errors: a value produced in the wrong shape, a
  transformation that loses information, a match that will not match, a
  return shape callers do not expect.
- You have the whole codebase: trace each step's inputs and outputs
  against the real functions it calls (open them), not just the plan's
  prose.
