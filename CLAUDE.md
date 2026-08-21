# ymer-marketplace

The `ymer` Claude Code plugin marketplace. See `README.md` for the layout, the local install commands, and the validation rules.

## Conventions

- Domain terms for this repo live in the root `glossary.md`: documents use a term and point at its home, never redefine it.
- Edit a plugin in place and it is live in every session that has the marketplace added by path — no update step, no version bump. Keep the working tree runnable.
- Run `claude plugin validate .` and `claude plugin validate plugins/<plugin>` after touching any manifest.
- Skill prose is intent-first: state what is protected and why, and let the executor derive edge handling — enumeration ages worse than intent. Reserve hard MUST wording for spots where failure is silent and expensive.
