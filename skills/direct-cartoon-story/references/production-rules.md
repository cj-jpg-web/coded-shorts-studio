# Production rules

## Lessons from the Emu War baseline

The user judged the Emu War the strongest result so far and roughly halfway to the supplied visual reference. Preserve its usable 2D/3D architecture, English narration, and readable one-word captions. Improve these concrete weaknesses:

| Weakness | Required production response |
|---|---|
| Repeated farm staging | Plan distinct visual situations and state changes before constructing the world. |
| Standing and blinking dominate acting | Allocate poses and actions to narrative verbs. |
| Narrated events are not physically shown | Plan an observable cause, contact, and consequence. |
| Gun jam reaction precedes its word | Resolve animation and sound against the same word cue. |
| Camera passes near a soldier | Inspect the swept camera path, not only its endpoints. |
| Emu exits before the last word | Check and choreograph the final frame deliberately. |
| Aerial cards float above shadows | Anchor the actual drawn sole using the camera-rotated up axis. |
| Lighting pops at a patch join | Warm prior state or place replacement joins at real scene boundaries. |
| Automated freeze flags catch subtle holds | Inspect flagged intervals with context instead of blindly adding shake. |

## Beat specification

Include `id`, `narration`, `setting`, `visual_claim`, `action`, `contacts`, `camera`, `cue_words`, `effects`, and `risks` for every beat. Within action, include `anticipation`, `contact`, and `reaction`. Contacts can be empty for a pure establishing view; explain that choice in the visual claim. A camera specification must name subject, path, framing, transition, and hazards.

## Review gates

1. **Story:** distinguish facts from the reconstruction; exclude unsupported intent and invented quotations.
2. **Coverage:** read narration beside the visuals. Remove unsupported or redundant beats; add visual demonstrations where they matter.
3. **Art:** inspect subject scale, silhouette, environment identity, lighting, and foreground readability.
4. **Physical action:** inspect hands, feet, prop ownership, attachment, motion direction, and recovery at multiple times.
5. **Motion:** review real clips at normal and slow speed. Verify camera direction and world state across transitions.
6. **Final:** inspect joined footage, actual caption/voice sync, audio, and final word composition.

Do not treat a numeric target as a substitute for a visual judgment. Do not claim that adding more scenes, denser motion, or higher resolution automatically improves the story.

## Subsequent story test

The Fred Lorz production adds a finite athlete pose rig, distance-driven gait, boarding/exit pose transfers, chassis-relative riders, wheel rotation from travel, a course miniature, period flag animation, and caption-linked effects. Early motion tests exposed shoe clipping and an exit crop; the sole offset and camera path were corrected before the full render. Strict cue lookup also caught cached narration from an older outline; narration text is now checked against the current script before reuse. These are tested production methods, not a claim that every hand grip or transition has reached reference quality.

An independent planning-only forward test, given the skill and a short runner/car scene without the prior conversation, identified seat/board/road/hand contact transfer, word-timing caveats, and intermediate-pose checks. This supports instruction coverage; it does not independently establish rendered visual fidelity.

## Prior production examples

Emu War, Marathon Shortcut, and the stamp/convoy test are prior owner-supplied experiments. Their lessons are retained above and in sequence-direction.md. These private project files are not dependencies of the public skill. Do not treat their past success as reference-quality approval.
