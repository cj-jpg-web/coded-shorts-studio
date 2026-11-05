# Character performance direction

Read while planning characters, poses, interactions, and motion tests. Design the performance for the current story. Treat earlier athlete/card rigs as implementation examples, not a required cast, pose library, or artistic ceiling.

## Preserve the feeling between events

Create a performance track for every principal character. Include `character`, `beat_id`, `time_range`, `objective`, `knowledge`, `emotion_in`, `trigger`, `emotion_peak`, `emotion_out`, `intensity`, `gaze_target`, `body_evidence`, and `next_change_reason`. Use descriptive intensity levels or a project-defined scale; do not claim a numerical intensity measures acting quality.

- Carry `emotion_out` into the next shot's `emotion_in` unless an intervening event explains a change. Preserve the character's knowledge as well as the feeling.
- Sustain emotion through a changing performance: an initial startled recoil can settle into tense shoulders, guarded hands, searching eyes, and cautious movement. Do not hold a maximal face indefinitely or automatically return to neutral after the reaction cue.
- Direct thoughts as visible choices: notice → understand → decide → act. Omit stages when the story genuinely calls for an immediate reflex. Avoid adding idle motion to fill the timeline.
- Coordinate eyes, brows, mouth, head angle, shoulders, torso, and hands. Let the body retain emotion when the face becomes subtler or turns away.
- Choose blinks, gaze shifts, breathing, and mouth motion deliberately. Do not let a shared clock overwrite the current expression, shut the eyes on every impact, or make every background character blink together.

Example: after discovering a missing bridge, carry alarm into braking, then into a tense inspection of the gap. Relax only after a credible resolution; a shot boundary is not a resolution.

## Design limbs as a performance

Establish the approved full-body silhouette and line treatment before animation. Thin stylized limbs can work; correct awkward movement through joint design, pose clarity, weight, and contact rather than indiscriminately thickening every line.

For each important action, draw or construct the anticipation, decisive pose, follow-through, and recovery from the actual camera. Include a silhouette check at delivery size. Specify:

| Element | Required decision |
| --- | --- |
| Arms | Shoulder origin, elbow direction, wrist orientation, hand shape, depth order, and path through intermediate poses |
| Legs | Hip origin, knee direction, foot orientation, planted/swing phase, contact surface, and weight-bearing side |
| Torso | Lean, rotation, compression or extension, and how the mass stays supported |
| Head | Gaze target, orientation, tilt, facial placement during turns, and continuity of expression |

- Keep elbow/knee bend direction stable unless a deliberate pose transition changes it. Inspect nearly straight joints for sudden flips. Preserve segment lengths unless an intentional stylized deformation has been designed.
- Avoid mirrored arm swinging as the default for every action. Use asymmetry, restrained motion, and purposeful hand shapes. Supply custom hands or pose artwork when a generic endpoint cannot describe a grasp, push, recoil, or pinch.
- Move the shoulder and torso when the reach requires them. Do not stretch a forearm across an impossible distance or keep the body rigid during a heavy lift.
- Plant a stance foot in world/contact-surface space; move the mass over that support. Raise and recover the swing foot with clearance. Derive locomotion from travel and stop the cycle when travel stops.
- Distinguish anticipation from backward sliding, impact from arbitrary shaking, and weight transfer from a global bob. Use resistance and settling appropriate to the action.
- Inspect silhouettes and overlap from the active camera: readable joints in world space can merge into an awkward straight stick in the rendered image.

## Specify every interaction

Record `participants`, `prop`, `owner_before`, `owner_during`, `owner_after`, `anchor_space`, `grip_anchor`, `support_anchor`, `contact_interval`, `release_event`, `allowed_motion`, and `failure_risk`. Mark fields not applicable with a reason.

- Attach a held prop to the intended hand/grip transform after the visible grasp. Preserve the world transform when ownership changes; avoid a jump at reparenting.
- Maintain both contact position and orientation. A hand near an object is not a grip. A fingertip pressing a surface must not penetrate it while the wrist follows a separate path.
- Treat seats, handles, ribbons, strings, floorboards, and vehicle riders as explicit contacts. Preserve connected endpoints through camera moves and scale changes.
- State deliberate stylization, physical approximation, and reconstruction separately. Do not silently replace a difficult primary action with a close-up that avoids showing it.

## Inspect a representative acting sequence

Choose a short scene that contains emotional change, sustained aftermath, at least one demanding contact, and a shot boundary or camera move. Use intended proportions, outline treatment, and representative scenery. Review normal speed for intention, muted for readability, slow motion for movement, and selected frames for contact. Record only review modes actually available and performed.

Pass the performance gate only when:
- The objective, trigger, and aftermath are readable; emotion persists for a reason across the cut.
- Face and body agree, or a deliberate disagreement is intelligible.
- Elbows/knees follow credible paths, hands describe the action, and feet/props retain their intended support.
- The decisive event is readable from the chosen camera, with current narration timing when available.
- The illustrated identity remains consistent through turns, close-ups, and pose changes.

Block full production for an unexplained neutral reset, visible joint flip, sliding planted contact, disconnected grip, missing primary action, or materially changed character style. Treat uncertain emotional impact or visual subtlety as a human/agent review judgment, not something a schema or pose counter can certify. Log the failing interval and use [failure diagnosis](failure-diagnosis.md) before retesting.
