# Lens: correctness of concurrency and the process model

- Concurrency and process assumptions that do not hold: races, message
  ordering, shared mutable state, the semantics of long-lived processes,
  tasks and supervision, shared in-memory tables, and how tests that run
  concurrently interact.
- Wrong assumptions about how the runtime's or a library's process model
  behaves.
- Global or singleton state (application configuration, registries,
  named processes) touched from concurrent paths without isolation or
  restoration.
