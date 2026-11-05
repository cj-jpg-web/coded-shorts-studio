# Diagnose, repair, and verify

Use after a planning, artwork, motion, sequence, or final-export review identifies a fault. Repair the cause at the appropriate level. Keep the current story's creative goal intact while testing alternatives. Do not equate a successful render, more scene changes, or more effects with an artistic pass.

## Keep an actionable defect record

Record `id`, `artifact_path`, `artifact_hash_or_version`, `reviewer`, `review_mode`, `time_range_or_frames`, `observed_fault`, `expected_behavior`, `reference_evidence`, `severity`, `likely_cause`, `repair`, `affected_dependencies`, `verification_artifact`, `verification_result`, and `remaining_limits`.

- Separate a directly observed fault from a suspected cause. Record missing reference access or incomplete review rather than inventing evidence.
- Classify severity using audit-contract.md: `critical` (materially false/misleading content, missing required media, corrupt export, or an unusable story), `major` (a clear failure of the brief or reference target, including broken identity, crucial contact, or materially weak presentation/performance), `minor` (local polish), or `preference` (a defensible creative alternative within the brief). Critical and major issues block final acceptance; do not average either away with a score.
- Use `open → diagnosed → repair_in_progress → awaiting_verification → closed`, or `blocked` with a reason. Close only after inspecting passing evidence from the repaired artifact. Record any user-authorized limitation separately in `acceptance.user_exception` under audit-contract.md; accepting a limitation does not close an unresolved issue or create a separate issue status.
- Give independent reviewers the actual artifact and relevant reference, brief, and factual constraints. Do not supply a desired verdict or ask them to affirm the creator's diagnosis.

## Select the right repair level

| Visible fault | Investigate | Repair and inspect |
| --- | --- | --- |
| A strong expression appears once, then goes plain | Default pose overwrites state; emotion track ends at its peak; shot reset drops state | Carry emotional state and knowledge across the boundary; direct a changing aftermath. Inspect before/after the cut and the next event. |
| Arms or legs move like awkward sticks | Endpoint-only animation; bad joint direction; rigid torso; weak silhouettes; uniform cycles | Redesign key poses, elbow/knee paths, wrist/foot orientation, and weight transfer. Inspect intermediate frames from the active camera. |
| Foot slides or floats | Gait does not match travel; card pivot changes with camera; missing support anchor | Correct stance/world anchors, travel-derived phase, or sole offset. Inspect the entire stance and camera route. |
| Grip breaks or prop jumps | Wrong coordinate space, orientation, parent, or ownership-transfer frame | Fix the contact contract and world-transform-preserving transfer. Inspect approach, grasp, carry, and release. |
| Many shots feel repetitive | Same presentation carries different claims; camera reframing substitutes for new information | Revisit viewer question and visual evidence. Design a fitting action, close-up, comparison, cutaway, or other presentation; do not add arbitrary locations. |
| Background feels plain or generic | Missing story-specific design, material variation, layers, or lighting hierarchy | Revise the environment artwork and actual camera composition. Inspect against a relevant reference at delivery size. |
| Rounded geometry changes the approved look | A mechanics prototype was promoted to final artwork | Restore the illustrated identity or produce a deliberately approved design. Validate representative images and turns before more rendering. |
| Camera hides the important detail | Wrong target, occlusion, framing, or move timing | Redesign the path and hold/reveal relationship. Inspect the swept route with the preceding and following shots. |
| Reveal lacks impact | Information is visible too early; cue/reaction is late; result is too small | Restage information order and visual emphasis. Review the sequence rather than the reveal frame alone. |
| Caption or contact misses narration | Stale script/audio cache; ambiguous cue occurrence; arbitrary fallback timing | Validate current script and word timings; resolve the exact cue or flag it unresolved. Recheck neighboring cues after changes. |
| Lighting/state jumps at a patch boundary | Incremental animation state; stale shadows; missing initialization | Derive state by frame or warm prior state correctly. Compare boundary pairs and review the joined sequence. |
| Bridge, cutaway, or hole reads as solid | Hidden road/ground remains; wrong mask/depth/geometry ownership | Inspect all contributing geometry/layers and remove the unintended span. Check actual camera angles and shadows. |
| Video technically passes but feels weak | Technical checks substituted for storytelling/art/performance review | Reopen the failed creative gate. Compare visible evidence, acting, finish, and sequence rhythm against the brief. |

## Run a bounded repair loop

1. Reproduce the fault in the smallest sequence that preserves its cause and relevant context. Keep the baseline artifact for comparison.
2. State one testable cause hypothesis and the expected visible improvement. Try the least disruptive correction that preserves the intended shot.
3. Render or inspect the affected work at the quality required to judge it. Keep critical contact tests at the intended frame rate; inspect art at readable size.
4. Verify the original fault, then check affected dependencies and neighboring transitions for regressions. Include audio/caption changes when timing moved.
5. Ask an independent reviewer to recheck critical/major issues and major changes when available. Consolidate disagreement against source evidence; the lead owns the decision.
6. If the same local correction fails twice, stop repeating it. Reassess the diagnosis and consider a different construction method, custom artwork, or revised staging that preserves the meaning. Do not silently lower the quality target.
7. Close only with evidence from the corrected artifact. Keep untested techniques provisional. If available tools cannot support a necessary verification, record the gap and report it plainly instead of certifying a pass.

## Release decision

Require the lead to inspect the complete assembled export after local fixes. Confirm the final file is the reviewed version and all story-critical intervals have coverage. Block release for unresolved critical or major faults unless the user explicitly accepts the specific artifact-bound limitation under audit-contract.md. Route minor polish through judgment; endless arbitrary tweaking is not a substitute for a clear acceptance criterion. If an actual capability or access limitation prevents completion, preserve the work and disclose that limitation rather than calling an incomplete export final.

Record successful techniques and remaining failure modes in the learning evidence after review. Do not turn an untested suggestion or a single favorable planning result into a claimed rendering capability. Keep routine diagnosis and intermediate artifacts internal unless requested; deliver the final video with any material unresolved limitation stated succinctly.
