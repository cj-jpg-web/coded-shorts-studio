# Reuse, previews and production time

## Reuse the mechanism, direct the performance

Keep a versioned core for frame timing/pose exposure, transforms and pivots, face/gaze controls, joint/contact anchors, masks/containment diagnostics, seeded contents, camera composition, audio cue timing, guide/label switches, render and export checks. Store each story's dialogue, beats, required poses, local contact geometry and actual artwork separately. Maintain an asset manifest with approved palette, anchor positions, provenance and version.

Use `../scripts/motion_core.mjs` as a small renderer-independent starting point, not a complete production engine. Its helpers implement held keys, quick numeric tweens, rigid anchor transforms, fixed-length two-bone IK, simple-polygon checks and circular containment. For noncircular art, add shape-aware tests or conservative envelopes. Keep masks renderer-specific and test the real renderer. Run `node ../scripts/check_motion_core.mjs` for helper boundary checks and `node ../scripts/motion_proof.cjs /absolute/output-directory` for an optional 6-second diagnostic render (requires Canvas and FFmpeg). The proof is deliberately simple, not a finished anatomy reel. `../scripts/plan_lint.py` checks declarations only; do not report it as a visual/collision test.

Cache static plates and compiled paths, reuse approved hands/mouths/tools, render only affected shots while iterating, and use lower-resolution movement/animatic previews before 1080p export. Keep draft/final render paths consistent so preview approval is relevant. Do not spend time converting a rigid raster cutout to SVG solely to move it. A new topic still needs its own script, anatomy, segmentation, staging and medical review. Reuse mechanisms and approved parts without repeating identical gestures, compositions or jokes across every episode.

Record time by script/research, asset generation, separation/rigging, corrections, rendering and verification. Identify the real slow phase before changing technology. Do not promise a universal minutes-per-reel target or skip gates to appear fast. Reuse should reduce repeated setup and prevent known failures; it does not automate good direction.

## Visible progress during active work

Send real previews at meaningful milestones:

1. Script/beat board with the intended visual payoff and audience-address ending.
2. Actual artwork/key-pose board, labeling missing parts and corrections.
3. A short moving proof of the riskiest action (with fixed camera so movement is assessable).
4. A low-resolution animatic with guide voices and scene timing.
5. Final video plus clean variant and concise audit findings.

Say whether a preview is diagnostic, artwork-only, or representative of final motion. Show actual files in conversation; a progress sentence or generated illustration alone does not demonstrate animation. Provide layer/anchor overlays only in diagnostics, not in the audience-facing story. Continue authorized work after posting a preview; do not impose repeated confirmation steps. Incorporate user feedback when it arrives and preserve completed stages unless the correction affects them.

Do not claim the user is watching a live background render unless a real updating preview surface exists. Work continues only during active execution, not automatically after a final response. Use a lightweight self-contained preview or short MP4 when possible; do not require the user to install software. Preserve production deliverables using the environment's file-saving workflow; skill source itself is saved through its skill/repository workflow.
