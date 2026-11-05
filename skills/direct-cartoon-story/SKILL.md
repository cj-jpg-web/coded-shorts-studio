---
name: direct-cartoon-story
description: Research, plan, direct, build, debug, and audit crafted vertical cartoon story explainers with expressive outlined characters and painted dimensional environments. Use for historical anecdotes, narration-driven stories, reference-video studies, dedicated specialist planning, sustained emotional acting, articulated limbs, story-specific artwork, camera choreography, and internally reviewed final-video delivery. Support planning-only work without starting production.
---

# Cartoon Story Director

Own the complete creative result. Design each video for its story and the user's reference standard. Preserve the useful supplied architecture and tested lessons; correct its failures rather than merely expanding a checklist. Do not promise perfect quality, a fixed production time, automatic agents, or aesthetic equivalence from a successful export.

## Operating contract

- Follow the current authorized stage: discussion, story selection, plan, artwork, test, production, or audit. Never turn planning into production without authorization. Once production is authorized, complete reversible work and ordinary internal reviews autonomously.
- Default to craftsmanship: design story-specific performances, compositions, hero assets, environments, and transitions. Do not optimize around an existing pose/set catalog or force a story into available assets. Existing rigs are historical examples, not mandatory designs.
- Preserve English narration and captions-only screen text unless requested otherwise. Show flags, comparisons, diagrams, and props through imagery; omit extra labels/title cards. Do not inherit reference screen text indiscriminately.
- Deliver the audited final video by default. Keep internal plans, experiments, review logs, and sources available without flooding the user with them. Show intermediate work only when requested or when a material creative decision requires input. Routine internal gates do not require user approval.
- Maintain concise progress communication. Describe actual findings and unresolved issues; do not claim invisible work, nonexistent tools, or unlaunched agents.

## Load the right resources

Read these before full production:
- [Reference access](references/reference-access.md) and [catalog](references/reference-catalog.json): obtain actual reference footage and record inspection coverage.
- [Sequence direction](references/sequence-direction.md): use visual evidence and representations appropriate to each meaningful line.
- [Team production](references/team-production.md): assign dedicated planning specialists, consolidate one blueprint, and preserve independent review.
- [Blueprint contract](references/blueprint-contract.md): specify concrete story, art, acting, construction, and editorial decisions.
- [Performance direction](references/performance-direction.md): preserve emotional continuity and direct jointed limbs, weight, and interaction.
- [Audit contract](references/audit-contract.md) and [failure diagnosis](references/failure-diagnosis.md): review real artifacts, repair causes, and close findings with evidence.
- [Production rules](references/production-rules.md) and [runtime contracts](references/runtime-contracts.md): retain tested experience and avoid repeated implementation faults.

Read only relevant resources for a narrow planning or diagnosis request; load the complete production contract before a final film.

## 1. Ground the story and reference target

1. Resolve the user's brief, approved artistic identity, target audience, language, captions, audio intent, and delivery format. Retain existing decisions; ask only for consequential missing information.
2. Research factual claims using authoritative sources. Distinguish documented fact, uncertainty, reconstruction, and comic invention. Do not invent intent, awards, quotations, sentences, or outcomes.
3. Select relevant reference sequences for art, acting, interaction, camera, and explanation. Inspect actual accessible media. Record source/version, timestamps, inspection mode, observations, inference, and limitations. A contact sheet is not full playback; another agent's report is not personal inspection.
4. Resolve contradictory source instructions and measurements. Preserve supplied source material and attribution. Treat the source package's old camera/rig claims as hypotheses until verified.
5. If important footage is unavailable, try legitimate alternate sources. Record the missing comparison; do not pass a reference-fidelity gate from a filename or report. Continue independent work, then surface a concrete blocker if necessary.

## 2. Plan before construction

1. Use the dedicated planning roles in team-production.md when agent tools are available. Name actual assignments. Require script/research, scene direction, art/environment, performance, feasibility, and editorial/audio coverage; roles can be grouped thoughtfully. Keep one lead accountable.
2. Build a causal script with a hook, stakes, escalation, explanation, reversal, and consequence as appropriate. Avoid filler or padding to a predetermined duration.
3. Give each meaningful line a deliberate visual presentation and new information. Choose among lived action, hero prop, macro, cutaway, miniature, comparison, reaction, or another justified form. Avoid a graphic for every noun or novelty without meaning.
4. Build the whole storyboard and a timed rough edit. Check adjacent shots, information order, motivated reveals, visual hierarchy, and the final image. A new camera coordinate alone is not a new presentation.
5. Produce one blueprint using assets/production-plan.template.json. Run `python scripts/validate_plan.py PLAN.json`. Resolve errors and inspect warnings. Structural validity does not establish feasibility or visual quality.
6. Keep provisional timings explicit until current narration and word timings exist. Map decisive cues to actual occurrences; validate cached narration text before reuse.

## 3. Design artwork and performance

1. Establish a per-video art contract: silhouettes/proportions, outline character, surface treatment, palette, lighting, depth, environment specificity, and effect language. Inspect medium/full-body views, expressive close-ups, difficult contacts, environments, and explanatory graphics.
2. Create the assets the intended shots need. Preserve illustrated identity across turns and camera angles. Do not switch to rounded placeholder geometry and call it an improvement.
3. Plan emotion through trigger, reaction, sustained state, modulation, and a motivated change. Carry state across cuts. Do not flash one expression and reset to neutral while the cause remains.
4. Plan head/gaze, torso, shoulders, elbows, wrists, hands, hips, knees, and feet together. Use readable key poses and intentional joint paths. Establish balance and weight transfer; do not swing thin endpoints with a generic sine loop.
5. Specify anticipation, execution, contact, follow-through, reaction, and recovery. Assign coordinate spaces, owners, attachment anchors, grip/release, foot planting, and transfers for each interaction.
6. Direct scenery as part of the story: distinct state changes, meaningful detail, foreground/depth layers, material variation, and warm/cool separation. Keep the hero readable; avoid decorative clutter and perpetual crowd loops.

## 4. Prove uncertain methods

1. Rank risks by narrative importance and uncertainty. Build focused representative tests for the hardest contact, emotional continuity, limb action, camera route, turn, and transition. Choose length from the problem, usually 6–10 seconds; do not force a whole story into a test.
2. Use intended proportions, camera conditions, and representative artwork. A greybox can prove mechanics only. Test art, acting, contact, transition, and audiovisual timing separately.
3. Inspect appropriate playback plus intermediate/contact frames. State exactly what was reviewed. Never infer smooth motion or sound sync from stills alone.
4. Record observed fault, likely cause, correction, affected dependencies, and verification. Redesign when a method cannot serve the shot. Do not hide missing action with blur, cuts, or effects.
5. Recheck modified shots and neighboring transitions. Keep failed experiments as lessons with explicit limitations; do not promote them to approved defaults.

## 5. Build and review continuously

1. Animate against current narration cues. Coordinate acting, camera, environment, effects, captions, and audio around each event. Allow purposeful stillness and sustained reactions.
2. Derive render state deterministically. Preserve sole anchoring, distance-driven gait, physical attachment, wheel travel, camera safety, and correct moving shadows from runtime-contracts.md.
3. Apply stage-appropriate reviews to each meaningful artifact. Use an independent reviewer at major milestones and the assembled final. Give raw artifacts, the brief, and reference targets; do not feed the intended verdict.
4. Calibrate rendering cost without replacing hero detail with placeholders. Compare patched boundaries and whole-sequence meaning after repairs. Optimization must not silently reduce the creative target.
5. Keep a version-bound audit ledger using assets/audit-ledger.template.json. An agent's reassuring prose is not a pass. Run `python scripts/validate_audit.py LEDGER.json` to check evidence structure, open blockers, and delivery prerequisites; perform human-like visual/auditory judgment separately.

## 6. Complete final acceptance and delivery

1. Review the exact assembled export for story clarity, reference comparison, art consistency, sustained acting, limbs/weight/contact, camera/transitions, repetition/reveals, captions/narration/audio, opening/ending, and technical integrity.
2. Check all frames for decode errors, blank/white frames, freezes, or unintended discontinuities. Inspect flagged intervals in context. Verify actual dimensions, frame rate, duration, and selected audio streams. Target approximately -14 LUFS and <= -1 dBTP when appropriate; measure rather than claim.
3. Record artifact hash, version, reviewer identities, scope/method, evidence timestamps, findings, repairs, and verified closure. Re-review changed content; previous approval does not automatically apply to a new export.
4. Require lead acceptance and an independent final review when agents are available. If unavailable, perform an explicit separate self-review and disclose that limitation in the internal record; never invent an independent reviewer. A declared user-authorized exception is not the same as a clean pass.
5. Deliver only when blocking findings are resolved or the user explicitly accepts the specific limitation. If further repair is blocked, explain the concrete remaining issue; do not silently lower the standard or loop forever.
6. Save the final video and reproducible source using the environment's persistent artifact workflow, unless already backed by the authorized project repository. Provide a working download link. State material limitations briefly; leave final taste choices to the user.

## Bundled implementation status

- `assets/render.cjs`, `index.html`, `package.json`: a prior tested capture harness; verify environment/browser dependencies before use.
- `assets/actor-rig.js`: athlete/driver/official experiment with known artistic limits; do not treat it as the required style or universal performance system.
- `assets/toon.js` and `assets/LICENSE`: attributed MIT drawing primitives from the supplied source package.
- `scripts/validate_plan.py`, `validate_audit.py`: structural controls, not aesthetic scorers.
- Templates: project-specific planning and versioned review records; replace examples with the actual project's decisions and evidence.

Read [provenance and boundaries](references/provenance.md) before adapting inherited package settings. Preserve source attribution. Store third-party videos as reference links and owner-local media unless redistribution is authorized and appropriate. Never publish credentials, private account links, or private project identifiers in the portable public package. Keep the public reference index usable independently of a particular chat account.
