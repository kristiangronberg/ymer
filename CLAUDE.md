# ymer-marketplace

The `ymer` Claude Code plugin marketplace. See `README.md` for what using the plugins requires and the install commands.

## Conventions

- Domain terms for this repo live in the root `glossary.md`: documents use a term and point at its home, never redefine it.
- Edit a plugin in place and it is live in every session that has the marketplace added by path — no update step, no version bump. Keep the working tree runnable.
- Run `claude plugin validate .` and `claude plugin validate plugins/<plugin>` after touching any manifest.
- Skill prose is intent-first: state what is protected and why, and let the executor derive edge handling — enumeration ages worse than intent. Reserve hard MUST wording for spots where failure is silent and expensive.
- The personal-layer principle: nothing personal to the maintainer may be necessary to run the plugins — not directly as a requirement, and not indirectly as personal config papering over friction other users would hit. Anything a plugin needs beyond what its prose states and the user brings is a defect. The standing check is a hermetic probe: a throwaway `CLAUDE_CONFIG_DIR` with only this marketplace installed, pointed at a scratch Ymer Node whose notebook starts empty, with neither ymer nor a state folder — `/setup:env` must create the skeletons and report both optional stores by reach, the skills must load and resolve their references, and every skill must stop with setup guidance where the node is missing.
