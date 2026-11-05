# Use the crafted cartoon story workflow

Read [skills/direct-cartoon-story/SKILL.md](skills/direct-cartoon-story/SKILL.md) first, then the task-relevant linked contracts. In a supported skill environment, install that directory and invoke `$direct-cartoon-story`. Otherwise ask your AI to follow that file and inspect the actual supplied reference footage.

## Project brief

Provide the story or ask for topic selection; state whether the current scope is discussion, planning, artwork, production, or review. Established defaults are English narration, captions-only screen text, original story-specific visuals, sustained acting, purposeful movement, and final-video delivery after internal audits.

## References

The [catalog](skills/direct-cartoon-story/references/reference-catalog.json) covers 13 distinct supplied reference videos. It contains local filenames/hashes, creator/title discovery URLs, techniques, and honest prior inspection coverage. Video binaries are not included. Locate exact official sources or supply lawful local copies; `scripts/check_reference_media.py --root YOUR_DIRECTORY` checks file identity, not whether anyone has watched them.

## Checks

Run `python skills/direct-cartoon-story/scripts/test_validators.py` to exercise regression checks. Validate project blueprints with `validate_plan.py` and review ledgers with `validate_audit.py`. Templates are under the skill's assets directory. These tools check structure and evidence consistency; they do not establish artistic quality or prove viewing occurred.

Dedicated planning and review agents are used only when the current AI environment actually provides them. The lead remains accountable for one coherent film. If a capability or reference is unavailable, report it honestly rather than fabricate an approval.

Derived drawing primitives retain their [MIT notice](skills/direct-cartoon-story/assets/LICENSE). Third-party reference videos retain their own rights. The original package's hardcoded paths, mandatory model names, and output preferences do not override the current project brief.
