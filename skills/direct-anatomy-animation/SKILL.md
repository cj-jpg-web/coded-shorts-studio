---
name: direct-anatomy-animation
description: Plan, illustrate, layer, animate, and audit vertical 2D talking-organ comedies and body-process explainers. Use for reference motion studies, image-first artwork, traced or raster cutouts, pose substitutions, masked contents, contact planning, progress previews, reusable rigs, removable voice guides, and direct-to-viewer factual endings.
---

# Anatomy Animation Director

Build original, recognizable talking-anatomy scenes through code. Carry lessons across outputs. Treat premium appearance and engagement as goals requiring evidence, never automatically achieved results.

## Load the current state

1. Read [learning-ledger.md](references/learning-ledger.md) before planning or reviewing. Identify the latest accepted baseline, unresolved gaps, and user requirements. Do not restart from a generic organ mascot.
2. Read [art-direction.md](references/art-direction.md) for drawing, color, recognition, and geometry work.
3. Read [performance-and-production.md](references/performance-and-production.md) for scripts, acting, timing, camera design, technology selection, layers, and delivery.
4. Read [reference-study.md](references/reference-study.md) for reference analysis. Distinguish recorded observations from direct inspection in the current session. Request missing footage only when the judgment depends on it; never claim to have watched unavailable clips.
5. Read [review-and-learning.md](references/review-and-learning.md) before evaluation or knowledge updates. Use [experiment-template.md](references/experiment-template.md) for new experiments.
6. Before production, read [scene-planning.md](references/scene-planning.md), [layered-motion.md](references/layered-motion.md), and [reuse-and-previews.md](references/reuse-and-previews.md). Consult [motion-research.md](references/motion-research.md) for primary documentation and the limits of reference evidence.

## Establish readiness before committing

State internally what this skill produces, which revision is loaded, what assets/tools are actually available, and what the current scene requires. Answer "Do I have this capability?" with evidence, not confidence. A skill is a workflow, not a new model capability or an automatically completed rig. Run a small technical proof for an unproven contact, pose change, containment method, or exporter. Keep readiness conditional until that proof passes.

Use `scripts/plan_lint.py` with `assets/scene-plan.template.json` to catch planning omissions. It checks declared structure, not pixel collisions, medical truth, or visual quality. `scripts/motion_core.mjs` supplies tested timing, fixed-length IK, containment and clipping helpers; it is not a finished character renderer or fluid simulator.

## Work in the requested mode

- For study or critique, inspect available artifacts and report evidence; do not automatically render another video.
- For production, complete a reviewable sample at the requested scope. Preserve successful source/assets and version changes. Reuse mechanisms selectively; redesign drawings that fail recognition.
- If the baseline is unavailable, use recorded lessons, mark comparison unavailable, and avoid inventing measurements or asset locations.
- Establish anatomy, audience, duration, reference traits, and layers from context. Default to vertical 9:16, 1080 × 1920, 30 fps when unspecified; honor project-specific settings.

## Direct before coding

Connect observed gaps to concrete changes and observable tests. Plan dialogue early to establish timing; place its visible guide last in compositing.

Make setup → physical action → visible consequence → character response → payoff legible. Name the focal subject, anatomical landmarks, contact points, and state change for every beat. Give every cut a purpose: new speaker, location, cause, consequence, or relationship.

Default to a specific awkward body situation with humor and a small essential cast, usually two speakers and an optional functional third character. Finish the story and payoff, then let a character explicitly face and address the audience with a concise verified lesson. Do not bury the final fact-check inside another miniature story or force a human presenter. Treat a request for a different format as overriding this default.

Before generating art, declare every fixed plate, moving object, deforming tissue region, replacement pose, mask, parent/pivot, grip/contact anchor, foreground occluder and revealed background. Generate a composed guide if useful, but do not accept it as an animation-ready asset when independent actions remain baked together. Separate image-generation briefs by required layer; inspect returned assets before tracing or rigging. Preserve successful colors and silhouettes while correcting a failed asset.

Prove representative frames at phone size before a costly full render. Check recognition, composition, continuous boundaries, and color hierarchy. Check motion separately: a still cannot establish acting or contact quality.

Publish real visual previews during the active task: approved art/key poses, a short movement test, and a low-resolution animatic before final rendering. Identify what each preview tests and its remaining gaps. Continue already-authorized work without turning every preview into an approval stop; incorporate user steering when received. Do not imply rendering continues after the turn ends or that a still validates motion.

## Enforce the production contract

- Make the active organ/contact area large and recognizable. Keep supporting anatomy visible without letting the background dominate.
- Draw specific anatomy and props; labels cannot repair an unrecognizable silhouette.
- Use continuous structural contours and shared anchors at anatomical joins. Do not repair broken geometry by thickening every outline.
- Make acting event-driven: anticipation, eye tracking, bracing, compression, reaction, recoil, recovery, and listening. Avoid generic wobble and uniform faces.
- Use held/replacement poses and short purposeful tweens for the observed snappy limited-animation feel. Animate only story-relevant parts; keep anchored anatomy fixed unless the action requires deformation. Never stretch a flattened scene to move food, liquid, tools, limbs, sperm or cells.
- Audit intended contact versus forbidden penetration, gripping, mask leakage, hidden-object disappearance, arm reach, self-intersecting boundaries, draw order, label/caption collisions and exposed plate edges. Correct failures at the responsible layer and recheck affected shots, rather than patching a flattening mistake with more warps or thicker strokes.
- Use fast conversational scratch speech as an ElevenLabs guide. Keep intentional holds active; remove unexplained dead pauses.
- Keep artwork, anatomical labels, scratch audio, and the final/topmost dialogue-guide overlay independently controllable. Removing the guide must preserve anatomical labels. Re-time mouth cues and cuts after replacement audio arrives.
- Choose the stack to solve the observed problem. Prefer inspectable, reproducible source; switching frameworks alone does not establish better acting or artwork.
- Verify medical explanations against primary authoritative sources; record sources and verification dates. A reference animation is not medical evidence.
- Create original scripts/artwork. Do not upload third-party reference footage, branding, or watermarks without permission.

## Review, retain, and hand off

Run the visual, performance, narrative, and export checks in the review reference. Report improvements, remaining weaknesses, and supporting evidence. Separate technical validity from visual quality and audience retention.

After reviewed outputs, append an experiment entry, retain user feedback accurately, update priorities, and promote only supported lessons. Preserve earlier results and explain superseded rules. Do not invent engagement statistics or turn a subjective similarity estimate into a measured score.

Treat the owner's GitHub copy as the durable source of truth. Read its current revision before edits and avoid overwriting concurrent changes. Reconcile differing installed copies deliberately; record the source revision in handoffs. Save authorized changes and verify remote content. If write access is unavailable, provide a patch clearly marked unsaved. Do not imply automatic memory or automatic cross-AI synchronization.
