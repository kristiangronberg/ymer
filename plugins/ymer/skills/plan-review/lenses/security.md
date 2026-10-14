# Lens: security

- Input validation at trust boundaries: are guards or validation
  specified where untrusted input enters? Where the run data names a
  companion skill, read it: its trust-boundary rules are the binding
  rubric here.
- Data isolation: determine from the project's `README.md` and
  `CLAUDE.md` whether it is multi-tenant or multi-user. If it is, verify
  that every query and step scopes data to the right tenant or user, and
  flag any step that could leak or cross-write across that boundary. If
  the project is single-tenant, skip this check rather than inventing
  tenancy findings.
- Authorization: are permission checks specified for new actions and
  routes?
- The common classes: injection (query or command), unsafe rendering,
  secrets in code or configuration, mass assignment.
