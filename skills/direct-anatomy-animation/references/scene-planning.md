# Scene planning and readiness

## Readiness gate

Before planning, identify the current skill/repository revision and available source assets. Ask: what is this skill for; have I loaded it; which requirements can I execute with existing tools; which mechanism is untested? Treat missing parts, blocked generators, unavailable fonts, unsupported transparency and untested export paths as concrete gaps. Test the smallest relevant action remotely before commissioning a complete scene. Do not require installation on the user's old laptop.

## Story and action plan

Write an awkward, relatable situation with essential characters. Give each speaker a want, attitude and listening reaction. Establish hook → conflict → visible escalation → payoff. Then make a clear direct-to-viewer factual ending. Verify the medical takeaway with primary sources. Visual metaphor must not silently imply a false biological route, cause, treatment or guaranteed result.

For each beat record time/speaker, focal subject, pose before/after, action trigger, active versus held parts, contact anchors, persistent state change, camera purpose, and silent read. A cut or zoom is not a substitute for an action. Include micro-acting only where it communicates thought, effort, discomfort or attention.

## Asset contract before image generation

Create a per-scene manifest using `../assets/scene-plan.template.json`. For every asset name:

- Role, source/version, local coordinates, pivot/parent and stable scale.
- Motion class: fixed plate, rigid object, pose replacement, articulated limb, local tissue deformation, contained content, face or overlay.
- Required states and exact exposure/transition intervals; optional interpolation must be intentional.
- Visible bounds and extra painted area that will be revealed when foreground objects move.
- Clip owner, front/back draw order, foreground occluder and containment/motion rules.
- Contact or grip anchor, release interval and allowed/forbidden intersections.
- Whether artwork actually exists, has been separated, and has been reviewed at target size.

A visually attractive composite can be a guide only. Fail the asset gate if it embeds a cutter in the background, food/liquid in a moving wall, a permanent hand pose in a body that must gesture differently, or exposed background that does not exist. A colored SVG trace is not semantic segmentation. Color-based removal can accidentally erase dark outlines; compare on transparent and contrasting backgrounds.

Generate a clean plate, independent moving parts and necessary replacement poses. Preserve alpha or provide a deliberate segmentation method. Keep consistent canvas registration, pivots, line weights, palette and lighting across poses. Avoid entire-scene regeneration for one failed hand. Reuse a successful asset; cache its approved version.

## Contact and occlusion audit

Classify each overlap as intended contact, intended occlusion, or forbidden penetration. Inspect pre-contact, first contact, maximum load, release and settled state. Confirm hand-to-tool grip and shoulder attachment. Constrain rigid tools without elastic resizing. Mark unreachable targets instead of lengthening a rigid limb silently.

Use a shared anchor or surface model for touching tissue. If tissue changes shape, update the mask, front wall and attachments together. Distinguish a mask hiding a crossing from the motion path actually respecting the wall. Inspect points and silhouettes during transitions as well as key poses; endpoint checks alone miss intersections. Author special drawings when the new silhouette cannot be produced cleanly by a rig.

## Stage gates and rework

1. Script/claims: clear conflict, payoff and audience-directed lesson; retain only supported claims.
2. Layer plan: every independently moving part exists separately; missing backplates and pose states are explicit.
3. Technical blockout: fixed camera, simple shapes; prove action, anchors, clipping and extreme positions.
4. Artwork: recognition, close framing, full action silhouette, supporting shading and registered poses.
5. Rig/motion: test one representative action at speed and frame by frame, with a diagnostic unmasked view.
6. Animatic: inspect actual timing, listening and scene continuity, caption-safe areas and final address.
7. Final export: full decode, metadata, seek/end checks, guide-off/labels-on and audio track separation.

Log a failure, correct its cause, and recheck dependent stages. Freeze successful stages unless a later finding invalidates them. No fixed number of image attempts guarantees quality; each retry needs a diagnosed correction. Distinguish a real hazard or misleading health message from an ordinary visual overlap; do not invent approval requirements for routine reversible edits.
