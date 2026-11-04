# Motion research and evidence — 2026-11-04

## Primary documentation checked

- Toon Boom, Drawing Layer Substitution View: https://docs.toonboom.com/help/harmony-25/premium/cut-out-animation/drawing-layer-substitution-view.html — drawings can be swapped on timeline frames.
- Toon Boom, substitution drawings while animating (updated 2026-07-21): https://helpcentre.toonboom.com/hc/en-ca/articles/44809337055379-How-do-I-add-a-substitution-drawing-while-animating-a-rig — preserve line style, art-layer separation, cutters/overlays and permanent pivots.
- Toon Boom, About Keyframes: https://docs.toonboom.com/help/harmony-24/advanced/motion-path/about-keyframe.html — motion versus stop-motion keys. Search-index text retrieved; direct page returned 404 during this check, so verify a current equivalent before tool-specific use.
- Rive, Clipping: https://rive.app/docs/editor/manipulating-shapes/clipping — shape-based visibility, winding and inverse clipping.
- Spine, Clipping Attachments: https://en.esotericsoftware.com/spine-clipping — clipping affects a defined draw-order interval; self-intersecting clipping polygons fail; complexity affects runtime performance.
- Spine, IK Constraints: https://en.esotericsoftware.com/spine-ik-constraints — hand/foot targets control bone rotations; stretch is an explicit optional behavior, not required for reaching.
- Spine, Mesh Attachments: https://en.esotericsoftware.com/spine-meshes — weighted image meshes deform independently of rigid transforms.
- Mozilla, Canvas clip(): https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip — a path restricts drawing; save/restore scopes clipping.

These document mechanisms. They do not prove which software or exact rig the reference creator used. No purchase or installation is required to apply the principles in code. Rive/Harmony/Spine are alternatives, not dependencies of this skill; verify current availability/licensing before adopting one.

## Fresh reference observations

The ten supplied clips were sampled across their durations in this conversation. Six action windows were inspected at 0.25-second spacing. The stomach (3–5 s), glove (16–18 s) and pimple (1–3 s) were rechecked at 0.125-second spacing; short stomach/glove changes were also checked as adjacent 30 fps frames. Times below are approximate, not beat-perfect audio measurements. No claim of full real-time audiovisual inspection.

| Clip/interval | Direct visual observation | Supported production implication |
|---|---|---|
| Eating without water, about 3.3 s | Arms change from rest to holding a stick between adjacent sampled frames; wall outline remains anchored | Prepare distinct arm/prop states and held exposures |
| Same stomach, 3.7–5 s | Stick and local food arrangement change while the cavity contour is stable | Keep tool and contents separable from wall; not a whole-scene warp |
| Placenta/glove, 16–18 s | Glove translates/tilts; its left/right orientation changes rapidly around 17.4 s; surrounding characters redirect gaze | Combine rigid movement, orientation/pose substitutions and listening |
| Pimple, 1–3 s | Fingers approach, close, material appears, then fingers withdraw while the view stays consistent | Plan contact → state change → release, with independent contents |
| Toenail, 2.6–4 s | Clipper approaches/tilts/withdraws; toe changes expression while staying anchored | Tool pivot and reaction matter more than a moving background |
| Food up nose, 12–13 s | Flap shape and food position change; an arm reaches; the anatomical view remains recognizable | Use local articulation/deformation plus separate moving food |

Food appearing contained is consistent with a mask/foreground wall, but an exported video cannot reveal the compositing setup. Some food may be a moving group or held drawing; do not claim every ingredient is separately simulated. Observed fast transitions do not mean every movement is stepped. Color or motion quality in one clip does not validate its medical explanation.

## Resulting decision

Use a hybrid limited-animation scene: fixed or locally deformable anatomy, independently layered contents/tools, pose substitutions/held keys, and short purposeful transforms. Audit the asset contract before generation, then prove actual motion. Reserve meshes for necessary local deformation. Reject global elastic stretching as a substitute for action.
