# Project-local skills

Installed on 2026-10-09 in `.agents/skills/` for the Website repository.
These are development tools, separate from website runtime dependencies.

| Installed skill(s) | Upstream source |
| --- | --- |
| frontend-design | https://github.com/anthropics/skills/tree/main/skills/frontend-design |
| impeccable | https://github.com/pbakaus/impeccable/tree/main/.agents/skills/impeccable |
| astro + 16 specialist skills | https://github.com/JordiParraCrespo/astro-skills/tree/main/skills |
| ui-ux-pro-max | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/.claude/skills/ui-ux-pro-max |
| web-design-guidelines | https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines |

## Codex compatibility

- Astro scanner and UI/UX search examples use project-local `.agents/skills/` paths instead of Claude plugin paths. Run examples from the Website repository root or resolve absolute script paths.
- Astro audit role prompts are included in `skills/astro-audit/agents/`; use them as reference prompts with available delegation tools.
- Impeccable includes its references, nested agent definitions, and Windows launcher. Its engine is downloaded by the launcher on first use; that engine has not been downloaded or executed during installation. Optional editor hooks have not been installed.
- Web Design Guidelines fetches its upstream rules when a review is requested.
- Upstream license notices are retained with the corresponding skills. They apply to those third-party files, not automatically to the studio website.

Skills are installed locally, not in the user's global skill directory. They should be available on the next turn; reopen the Website project if the skill list has not refreshed.
