@AGENTS.md

## Claude Code notes

- Use the `ste-writing` skill for case-study prose.
- Route work to Codex or `agy` per `docs/agent-orchestration.md` when a plugin there fits better.
- Use the `new-case-study` skill (`.claude/skills/new-case-study`) when adding or auditing a case study.
- Dev server config is in `.claude/launch.json` (port 4321).
- Keep this file thin. Put shared rules in `AGENTS.md` so Codex and Antigravity see them too.
