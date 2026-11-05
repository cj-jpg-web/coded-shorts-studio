# Runtime contracts

## Anchored image cards

A camera-facing rectangle rotates around its center. Setting its center to a fixed half-height makes the feet float from a high angle. Measure the sole in the artwork. For a canvas of height H, sole yS, and world card height h, offset the card center along the camera-rotated up vector by `(yS/H - 0.5) * h`. Position the actor's parent at the actual ground/seat anchor. Include the vector's x and z components, not only y. Re-anchor after choosing the camera. Do not add a ground shadow to a passenger already seated in a vehicle.

## Locomotion and attachments

For a stance occupying half a cycle, a foot travelling S world units backward relative to the hip requires actor speed `2*S*cycles_per_second`. Derive cycle phase from travelled distance when speed changes, using a cycle length of twice the stance travel; a fixed clock can otherwise cause skating. Keep stance world position stable; lift and recover the other foot with a smooth swing. Adapt cycle speed to actual motion, and stop cycling after the character stops.

Treat vehicle position, wheel rotation, body vibration, passenger anchor, seated pose, driver hands, and floorboard contact as one contract. Derive wheel angle from travel distance divided by radius. During entry/exit, transfer attachment deliberately and verify the feet, hips, and reaching hand at intermediate poses. A seated head above a car does not establish correct seat contact.

## Cues and cameras

Validate cached narration and word-timing text against the current script before reusing it; invalidate changed segments by content, not filename. Normalize word tokens and resolve the intended occurrence within its beat. Fail or inspect when a cue is absent; do not silently use an arbitrary default for a decisive contact. Prepare anticipation before the cue, then align contact, reaction, and sound. Preserve actual narration timings in the reproducible source.

Keep camera and target paths explicit. Check at least the start, end, contact times, near-prop passes, and transitions. Large changes between distant sets need a deliberate cut, short dissolve, or motivated occlusion; do not fly through empty world space. Never use the camera to hide an unimplemented primary action.

## Performance and consistency

Cache finite expression/pose combinations. Keep hero silhouettes and interactions detailed while simplifying distant geometry. Local headless rendering and direct canvas capture can be used when Remotion is unavailable. Export the real rendering resolution; do not call an upscale a native higher-resolution render.

Cache shadows only while caster/light geometry is unchanged. Moving cars need appropriate refreshed shadows. Derive all state by absolute frame or initialize/warm the preceding scene before capturing a chunk. Reset scene visibility, actor scale, prop ownership, material tint, and animated geometry on every frame. Compare boundary pairs after joining.

## Capture harness API

Copy assets/render.cjs, assets/index.html and assets/package.json into the video project, install the pinned dependencies and their matching Playwright Chromium build, and implement main.js. Expose window.ready after initialization, window.videoInfo = {frames, width, height, fps, duration}, and window.captureFrame(frame), returning a base64 JPEG without a data-URL prefix. Use positive integer frames, even positive integer width/height, finite positive numeric fps, and duration consistent with frames/fps. The captured canvas dimensions must match the metadata. The harness consumes fps and dimensions, validates START/END (exclusive end), and probes the export to reject rate/dimension/frame-count mismatches. Legacy frames-only metadata emits an explicit 720×1280@30 fallback warning; use complete metadata for new work. BROWSER_EXECUTABLE_PATH can select the installed matching browser without editing the harness. Draw the complete scene and captions into the captured canvas; do not depend on a viewport screenshot. The tested baseline is 720×1280 at 30 fps. Adapt canvas dimensions and typography together when changing resolution.

Run node render.cjs for the full picture. START, END (exclusive) and OUT select an independent chunk. Keep all frame state deterministic. The harness serves local assets, uses software WebGL when necessary, and pipes captured frames directly to ffmpeg; it is for rendering the user's own scene, not controlling a signed-in browser. Mux the explicitly chosen final audio afterward.
