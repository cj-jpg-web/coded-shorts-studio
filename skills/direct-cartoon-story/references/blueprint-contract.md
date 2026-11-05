# Production blueprint contract

Use assets/production-plan.template.json as the machine-readable skeleton and add drawings/storyboards and a timed rough edit. A JSON field is an index to a real decision or artifact, not a replacement for it. Do not fill fields with generic promises.

## Plan the whole film

Record brief, scope/stage, factual versus fictional treatment, intended duration, narration version/timing status, visual identity, evidence sources, reference inspection records, all beats, scene states, asset requirements, uncertain methods, and review gates.

For each meaningful clause identify viewer question, visible evidence, representation, information gained, and what changes. A continuing shot can carry several clauses when its action develops; neither a mandatory cut per sentence nor a graphic for every noun is required. Flag repeated framing/poses/backdrops when they carry different information without a new event. Plan composition and information order before choosing construction tools.

## Make each shot buildable

Specify start/end, narration/cues, setting/state, hero subject and scale, artwork requirements, action phases, actor knowledge/objectives/emotional state, gaze/body/joint poses, contacts, camera/path/target/clearance, motivated transition, effects/sound, technical method, dependencies, risks and test evidence. Name layer or world ownership and coordinate spaces. Record empty contacts/actors as a deliberate nonphysical beat, not an omitted interaction.

Use emotional keyframes in project seconds. Give each actor start/end state and a trigger for a state change. Carry the preceding state across a cut unless a visible/narrated cause justifies a transition. Intensity can settle without becoming neutral. Include an ending state, not merely a reaction peak.

Specify art as original decisions for this film: silhouette/proportion, outline character, face/body relation, hand/foot readability, material variation, lighting, environment identity, foreground/depth, effects. Record method choices as proposed, mechanically tested, artistically tested, or integrated-final verified. Do not imply that a rig solving one walk has solved gripping, climbing, turns, or expressive recovery.

## Establish factual and reference evidence

For factual stories link each consequential claim to an authoritative source and uncertainty status. Mark staged/comic elements. Reference footage is visual evidence, not factual authority. Record exact reference IDs, inspection ranges and methods; identify whether the observation is directly seen, reported, inferred, or measured. Select enough relevant sequences to cover the hard art/motion/explanation problems without imposing an arbitrary video count.

## Set acceptance before production

Define an observable pass and failure for each high-risk method. Use the user brief and reference properties rather than an invented percentage of quality. Decide which artifact proves each gate. Resolve planning contradictions before construction, and uncertainty with a focused test. Record blockers rather than masking them with more effects or weaker staging.

## Validate structure

Run `python scripts/validate_plan.py PLAN.json`. Errors indicate malformed or incomplete required structure. Warnings identify things requiring director judgment, including repeated staging, emotion discontinuity, and timeline gaps. A clean result proves neither accurate research nor good art/animation. Add real evidence and independent review under audit-contract.md.


## Structured research records

Use claim_sources entries `{claim, source, evidence}` with nonempty strings. Use reference_studies entries `{reference_id, source, coverage, method, observations, limitations}`; observations are a nonempty string array, limitations a string array, and method one of audiovisual_playback, muted_playback, slow_motion, frame_inspection, sampled_frames. Enter the actual inspected scope and sources. These type checks cannot establish that facts are correct or media was really viewed.
