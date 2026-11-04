# Layered motion, masks and poses

## Choose the mechanism per part

| Part/action | Default mechanism | Guardrail |
|---|---|---|
| Surrounding anatomy | Fixed clean plate | Extend it beyond planned camera crops |
| Cutter/tool | Rigid transform plus hinge subparts | Preserve silhouette and size; pivot at hinge |
| Arm gesture | Replacement drawing or fixed-length FK/IK | Keep shoulder and wrist anchors registered |
| Face | Separate gaze, lid, brow and mouth states | Let listeners react; avoid synchronized generic blinking |
| Food | Separate pieces or a coherent content group | Preserve each piece's shape; bounded authored trajectories |
| Liquid | Separate fill/surface clipped to cavity | Mask and wave phase move independently of wall |
| Sperm/cells | Independent reusable instances | Body stays coherent; local tail bend where appropriate |
| Tissue compression | Local boundary/mesh control or replacement poses | Anchored base, coherent contours, updated attachments |
| Severe shape/topology change | Authored replacement state | Do not force one image through splitting, removal or collapse |

Favor the simplest mechanism that performs the beat. Raster cutouts can translate/rotate without vectorization; trace where vector editing or deformation helps. Generated artwork is authorized in this project's image-first workflow. Keep final layout, timing, compositing and motion controllable through code. Prefer a proven Canvas/SVG scene graph with deterministic frame evaluation; add a runtime/editor only when a measured bottleneck justifies it.

## Pose and timing contract

Define rest, anticipation, action/contact, reaction and recovery poses as needed; not every action requires five drawings. A held pose stays unchanged until its keyed replacement. A short tween may bridge position or rotation while a hand/face drawing swaps. Review at final frame rate; abrupt is not automatically effective, and smooth is not automatically lifelike. Preserve silhouette readability and action arcs. Keep rigid dimensions and attach the hand to the same grip point as the prop. Layer order may change deliberately when an arm reaches across a body.

Do not infer exact keyframe counts or the author's software from sparse reference frames. Replacement poses, pivots and local paths are implementation choices supported by documentation and visual evidence, not recovered source files.

## Mask and containment contract

Render order example: back tissue → cavity → clipped liquid/food → back arm → tool/contents contact region → front tissue rim → front hand/face → anatomy labels → optional guide. Adjust explicitly for the shot. `ctx.save(); ctx.clip(path); drawContents(); ctx.restore();` changes visibility only. It supplies no mass, collision, pressure, displacement, flow or volume preservation.

Plan content positions and interactions separately. A liquid wave may be an authored path, not full fluid simulation; do not claim conserved volume unless measured. Restrict center trajectories using a margin for the full food shape, not its center alone. A fast piece can cross a thin wall between sampled frames; use swept tests or sufficiently fine checks around fast actions. If the wall deforms, update its containment region too. Let contents leave only through a declared opening/release event.

Keep an unmasked diagnostic view so clipping cannot hide teleporting objects, disappearing piles, stale cavity boundaries or invalid paths. Check mask winding, self-intersection, affected draw-order range, transparent fringes and edge antialiasing. Use a front wall/rim to establish depth. A tool may need back/front pieces when crossing the opening; a single global z-index cannot represent every crossing.

## State and coordinate discipline

Use stable local coordinate systems, common registration/pivots across replacement drawings, and named anchors. Evaluate poses by frame/time, independent of playback history. Seed random-looking cell/food variation for reproducible previews. Resetting or seeking must produce the same state. Keep scale/stroke style consistent across generated poses. Do not scale baked highlights independently of a deforming body surface.

Do not generalize "anatomy is fixed" to swallowing, contraction or tissue pressure. Default to an anchored background, then animate only the structure required by that scene. Prefer authored controllable motion over unnecessary global physics; simulation is optional and must still be directed and audited.
