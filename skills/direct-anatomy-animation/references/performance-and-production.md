# Performance, editing, and implementation

## Script and rhythm

Start with a concrete event and character conflict. Use short conversational lines with quick responses. Write dialogue early enough to drive timing. Keep a clean voice script with speaker IDs and beat timing for ElevenLabs replacement.

Use scratch audio for approximate duration/cues. Inspect actual line ends and response starts. A previous sample had an approximately 1.32-second response gap that felt dead; this is a local observation, not a universal pause limit. Give holds a reason: eye tracking, strain, realization, visible mechanism. Do not speed speech beyond intelligibility.

Composite the voice/script guide last, independently removable. This does not mean writing the story last. Separate guide text from anatomical labels and optional editorial captions. Expose explicit layer switches or equivalent render options; verify combinations. On final audio replacement, rebuild phoneme/word timings and adjust gestures/cuts.

## Acting and contact

Specify what each character wants, sees, anticipates, does, and reacts to. Animate listeners as well as speakers. Use motivated gaze, blinks, eyelid changes, asymmetric brows, cheek/jaw motion, distinct mouths, gestures, and directional body shifts.

Stage approach → anticipation → touch → load/deformation → release/recoil → settle. Connect prop movement to local compression, bulging, displacement, or flow. Avoid unexplained interpenetration or sliding. Keep contents consistent with enclosing tissue and narrative mechanism. Offset timing among parts instead of scaling everything together.

Use micro-actions to communicate thought/load. Use replacement poses or authored intermediate drawings when parameters cannot express a silhouette. High frame rates do not repair weak poses.

## Shot design

Compose separately for setup, contact, internal cause, response, and payoff as needed. Inserts must expose new information. Five zoom levels of one drawing are not five meaningful compositions.

Distinguish camera motion from entrance, flow, acting, and transformation. References sometimes hold one view for 20–30 seconds while internal events develop. Sustain a view when it explains action; cut to reveal information. Preserve screen direction/anatomical orientation or deliberately re-establish it.

## Choose a stack by bottleneck

| Bottleneck | Useful choices | Evidence |
|---|---|---|
| Specific artwork/continuous contours | Authored SVG/Bézier paths, anatomical anchors, scene graph | Recognizable silhouettes and structural joins at extreme poses |
| Local deformation | Shared path/mesh controls, common deformation field, shape keys | Continuous walls under pressure and believable recoil |
| Acting | Facial controls plus pose libraries/replacement drawings | Distinct emotions and listening without speech |
| Views/timing | Frame-based timeline, independent compositions, SVG/Canvas/WebGL renderer or Remotion compositor as appropriate | Purposeful reveals and deterministic frames |
| Voice/overlays | Timestamped dialogue, separate audio and label/guide tracks | Clean and guide versions differ only in requested layers |
| Reproducibility | Explicit dependencies, commands, FFmpeg export/validation | Repeatable render and valid final file |

Combine tools when necessary. For this project default to code-native artwork; ask before substituting generated raster/video for a code-only requirement. Use 3D only when it serves the agreed look; an existing 3D engine does not define 2D art direction.

## Delivery

Keep source snapshot, dependencies/setup, shot/beat data, clean voice script, and render commands. Replace absolute runtime-specific dependency paths with configuration or normal package resolution. Exclude temporary frames, dependencies, credentials, and third-party reference binaries from commits.

Check the final assembled MP4: full FFmpeg decode, dimensions, frame rate, duration, audio/sync, transitions, seeking, and edge frames. Valid source clips do not guarantee a valid combined export. For ordinary distribution use H.264/yuv420p, AAC when audio exists, and faststart unless requirements differ. Record checks actually performed and limitations.
