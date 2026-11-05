# Evidence-based audit and repair contract

Use stage-appropriate review on every meaningful production artifact. Audit the actual artifact under discussion, not a description, an earlier render, or an assumed implementation. Require separate judgments of research, direction, art, acting/contact, editorial/audio, and technical integrity. Do not average a serious failure away with a composite score.

## Identify the evidence

Record the project and artifact version, file/path, duration and frame rate where applicable, content hash when available, reviewer identity/role, inspected ranges, viewing methods, reference IDs/ranges, and review date. Tie final findings to the exact exported file. Distinguish full-speed audiovisual playback, muted playback, slow motion, individual frames, sampled contact sheets, automated scan results, and code inspection.

Use code and automated checks to support a judgment, never to impersonate visual or listening review. A decoder pass does not prove animation quality; waveform measurements do not establish intelligibility; a few stills do not establish timing. Mark unavailable checks `not_reviewed` with the reason and impact. Do not infer unexamined coverage from a representative test.

## Apply checks at the right stage

| Artifact | Required review focus | Blocking examples |
| --- | --- | --- |
| Research/script | Claim support, causal order, uncertainty, story genre, unsupported intent or quotations | False outcome, invented factual explanation, misleading certainty |
| Blueprint/storyboard | Each important claim's visible evidence, distinct meaningful presentations, reveal order, attention, emotional continuity, art/feasibility dependencies | Repeated generic staging carries different ideas; a reveal is already exposed; key action has no credible method |
| Representative artwork | Approved identity, silhouettes, proportions, outline/shading consistency, material/environment specificity, readability at output size | Placeholder geometry accepted as finished art; unreadable hero detail; unmotivated style change |
| Contact/acting test | Approach/contact/release, joint paths, weight, feet, grips, emotion persistence, gaze, recovery | Interpenetration, sliding planted feet, disconnected grips, awkward limbs, unexplained return to neutral |
| Camera/transition test | Swept path, occlusion, scale, information order, spatial/action continuity, readable arrival | Camera enters artwork; empty-world travel replaces a transition; viewer cannot see the explanatory detail |
| Assembled edit | Opening, escalation, new information, repetition, reaction space, continuity, captions, narration and sound relationships | Adjacent shots repeat the same point; decisive cue mistimed; wrong narration version; missing story consequence |
| Final export | Entire audiovisual sequence plus decode/frame/audio checks, joins, duration, frame rate, dimensions, opening and final word/frame | Corruption, unintended blank/freeze, missing/mismatched audio, caption clipping, unresolved major artistic fault |

Check a local test for its stated purpose; do not run the entire final checklist on every tiny render. After local approval, inspect its integration in the complete film. Once final checks pass, repeat only those invalidated by a change or new evidence.

## Write actionable findings

For each issue record:

`issue_id`, `artifact_version`, `shot_or_beat_id`, `time_or_frame_range`, `review_domain`, `severity`, `observed_fault`, `evidence`, `reference_target`, `likely_cause`, `repair_owner`, `proposed_repair`, `verification_method`, `affected_neighbors`, and `status`.

Write the visible symptom before proposing a cause. Label an untested causal explanation as a hypothesis. Specify what observable result would close the issue. Avoid vague findings such as "make premium," "add motion," or "looks good." A reference comparison must name the relevant visible property and inspected range; do not claim an exact source rig or timing without evidence.

Use these severity levels:

- **Critical:** materially false/misleading content, broken/missing required media, corrupt export, or a failure that makes the story unusable. Block final acceptance.
- **Major:** clear failure of the brief or reference target, including repeated unsupported presentations, substantial style drift, sustained awkward action/contact, emotional reset, unreadable explanation, or disruptive timing. Block final acceptance until repaired and verified.
- **Minor:** localized polish defect that does not obscure meaning or break the agreed identity. Repair when feasible; record any remaining limitation plainly.
- **Preference:** a defensible creative alternative within the brief. Let the lead resolve it without repeatedly seeking user approval.

Do not silently downgrade severity to meet a time budget. Reclassify only with new evidence or an explicit change to the brief, and record the reason.

## Review independently

Give an independent reviewer the actual artifact, brief, relevant references, and necessary factual context. Do not supply the desired approval or a coached list of conclusions. Ask for strengths, concrete faults, inspected coverage, and explicit pass/block/not-reviewed judgments by domain. After that initial pass, provide repair history for regression checking.

Use actual independent agents when available; otherwise label the review as lead self-review. Do not invent agent names, approvals, viewing, or listening. An independent review is evidence to reconcile, not authority that overrides the user's brief or the actual footage. Have the lead inspect disputed findings and decide with reasons.

## Close repairs with new evidence

Use `open → diagnosed → repair_in_progress → awaiting_verification → closed`, or `blocked` with a reason. Close only after inspecting the repaired artifact with the stated method. A code change or renderer exit code alone does not close an artistic/contact fault. Reopen an issue when integration or a later edit reintroduces it.

Map repairs to affected shots and dependencies. Recheck incoming/outgoing transitions, emotion across cuts, prop ownership, cue alignment, audio, shadows, and the final frame as relevant. If narration changes, invalidate affected word timings and dependent action/caption/audio cues. If style or character proportions change, reopen affected art and contact reviews. If export/mux settings change, verify the new final file rather than inheriting the old export's pass.

After repeated failed repairs, reassess the cause and test another construction or staging approach. Preserve the intended story and style. Do not hide an unimplemented action with blur, shake, or a cut and label the defect fixed.

## Accept and deliver honestly

Require a final decision with the exact output identity, domain judgments, closed critical/major issues, any minor residuals, reference coverage, and limits of inspection. The lead must review the integrated final export; specialist approval of isolated shots does not establish final continuity.

Do not mark the video fully audited when required audiovisual or artistic checks were unavailable. Complete the missing review where possible. If genuinely blocked, describe the actual limitation and output status rather than treating the user's final taste review as the place to discover known defects.

Deliver the final video with a concise result. Keep routine audit logs internal, but retain evidence and repairs for later investigation. Disclose material unresolved limitations; do not promise flawlessness, reference equivalence, or audience retention from checklist completion.

## Machine-readable ledger conventions

Use assets/audit-ledger.template.json and run scripts/validate_audit.py. For current-version/current-hash records, a later judgment by the same reviewer supersedes that reviewer's earlier judgment for the same domain. It does not erase another reviewer's block. Preserve history and record the resolving judgment after repair. Require whole-final-export coverage for final domain acceptance; a local frame test cannot supply that scope. The named lead and independent reviewer must be distinct actual identities. Artifact identity and declared review methods are structurally checked, not independently proven by the script.

Represent a specifically authorized exception as `acceptance.user_exception` containing `artifact_version`, `artifact_sha256`, `issue_ids`, and `evidence`. Bind it to the actual file and affected findings. A generic "okay" string is insufficient. Never fabricate user authorization. Exception acceptance remains visibly different from a clean accepted result, and it does not excuse unavailable core review.


## Reference and scope enforcement

For reference-grounded work set root `reference_policy` to `required` and select actual `reference_targets: [{id, domains}]`. Use `not_requested` with an empty target list only when the actual brief does not request reference comparison; do not flip the policy to bypass unavailable footage. Pending templates do not constitute approval.

Record each review's `reference_evidence` as objects with `reference_id`, `source`, `range`, `methods`, `observations`, and `domains`. Observations are nonempty string arrays; methods identify actual viewing, not another report. Accepted reference-dependent domains require matching target evidence and appropriate inspection methods. Exact public URLs remain unavailable for some catalog entries; local source access is a real prerequisite, not something the validator supplies.

Use findings as issue ID strings pointing to full issue records. Keep issue ranges as meaningful nonempty strings. A closure reviewer must have a current matching review, appropriate inspection method, and effective passing judgment in that domain. A partial-frame judgment cannot clear an earlier whole-export block. Superseded judgments do not establish current approval. Independent final review requires substantive current passing assessment and full audiovisual coverage, not a nonempty list of not-reviewed declarations.
