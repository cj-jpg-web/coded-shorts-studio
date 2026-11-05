# Reference access and research evidence

Use `reference-catalog.json` to resolve the supplied reference videos and choose sequences relevant to the current shot. Treat the catalog as an index of media and prior observations, not a substitute for the media. Keep a production-local reference ledger, separate from the public skill.

## Resolve usable footage

1. Select references by the problem being solved: sustained acting, hand contact, legs and weight, prop demonstration, scene transformation, environment finish, or transition. Do not choose only by subject similarity.
2. When an authenticated owner Library is available, resolve the exact `owner_library_file_id` through that environment's supported file workflow. Do not call it a public video URL. Never fabricate a download URL from a Library identifier.
3. Otherwise request or locate lawfully supplied media in a user-chosen local reference directory. Match `local_filename`, then compare SHA-256 with the catalog using a trusted local hashing tool. A different encoding can still be the right video; record the mismatch and manually verify its identity, duration, framing, and narrative coverage rather than pretending hashes match.
4. Alternatively locate the exact video on its creator's official page. Use the creator discovery URL as a starting point. Confirm title, creator, content, and coverage. Record the verified canonical URL and date in the production ledger. Do not invent an individual video URL from a title or promote a third-party metadata listing into verified primary-source playback.
5. Inspect the actual relevant sequence with preceding/following context. Review at normal speed for pacing and frame by frame for contact. Use audio playback when judging sound, speech rhythm, caption sync, or reaction timing.
6. Report inaccessible media precisely. Proceed with independent story or artwork work if useful, but leave the affected reference-dependent review pending. Do not claim a reference-matching pass based on an unavailable link or old written notes.

The catalog intentionally leaves unverified exact public-video URLs empty. Exact owner-only copies remain identifiable, but an unfamiliar AI on another platform needs a local copy or a newly verified official source. Public text access to this skill does not make private Library media public.

## Record evidence honestly

Record each observation with:

| Field | Meaning |
| --- | --- |
| `reference_id` and locator | Catalog ID, actual accessible path or verified official source; keep private paths out of public records |
| `source_identity` | Filename, duration, encoding, SHA-256 when local; note transcodes and duplicates |
| `range_seconds` | Actual range inspected, including useful surrounding context |
| `inspection_mode` | Full audiovisual playback, continuous visual playback, frame-by-frame window, sparse samples, contact sheet, or reported observation |
| `sample_interval` | Sampling interval or frame numbers, when samples were used |
| `observation` | What was visibly or audibly present, without invented implementation details |
| `interpretation` | Why it may serve the story; keep this separate from observation |
| `measurement` | Values, units, method, limitations, and source frames, only when actually measured |
| `production_application` | Which original shot will use the principle and how it differs from the reference |
| `unknowns` | Missing audio, unviewed intervals, uncertain source completeness, or unresolved construction |

Count distinct files and inspected intervals. Never count duplicates, thumbnails, metadata pages, or package sheets as independently watched complete videos. Distinguish inherited study notes from observations made during the current production. Mark approximate timestamp windows as approximate.

Do not infer audience retention from attractive imagery. Do not infer a proprietary rig, software stack, joint solver, or camera curve solely from a rendered frame. Compare the visible result and test an implementation that can produce it.

## Use the specific reference strengths

- Inspect **Winning Tickets** for a prop becoming the explanation, selective highlighting, and evidence legibility.
- Inspect **Grave Bell** for cutaway geography and persistent physical endpoints.
- Inspect **Pink Prison** for room-to-country presentation changes and a return to a concrete place.
- Inspect **Storm Oil** for a small physical analogy, overhead detail, and a return to the larger consequence.
- Inspect **Perfect Railroads** for a tiny detail made readable through proximity and scale comparison.
- Inspect **Spear/Shield** and **Second Draw** for selective gestures, anticipation, contact, meaningful holds, and aftermath; measure exact timing anew.
- Inspect **Memory**, **Japan Job**, **Town Button**, **Mirror Horse Race**, and **Pirate Cannonballs** for state changes, prop recurrence, color/environment shifts, spatial relationships, and distinct staging. Choose actual sequences after access rather than assigning unsupported exact timestamps.
- Inspect **Painkillers** for visual process presentation only when relevant; do not let an object-function format replace the requested story genre.

## Keep reference material separate from distributable work

Keep third-party full clips, downloaded frames, contact sheets, and creator artwork out of the public skill and original deliverables unless their distribution is explicitly authorized by the rights holder or an applicable license. The user supplying a copy for study does not establish those rights. Keep licensing and attribution for derivative code assets intact; their code license does not license the reference videos.

Do not publish signed URLs, session-bearing links, credentials, private local paths, or unrelated personal metadata. An owner-only Library ID is a lookup handle, not a public-sharing mechanism. Keep owner media locators in private production storage when a public audience does not need them.

## Treat initial coverage as limited

The initial catalog consolidates prior chronological sparse frame samples from thirteen distinct supplied files and eight denser sampled windows. It does not claim thirteen full normal-speed audiovisual viewings. The old package's twenty sheets contain partial sequences. The old motion report also conflicts with its style summary; treat its precise timing and rig claims as reported, pending independent measurement. Reinspect the relevant footage for every production rather than treating these notes as permanent proof of reference-level quality.

## Check local availability

Run `python scripts/check_reference_media.py --root /path/to/reference-directory`. The default catalog is resolved relative to the script. The command streams SHA-256 checks and reports missing/different files. It does not download anything, prove playback occurred, or approve visual similarity. Public catalogs omit owner-only Library IDs; title/creator search URLs are discovery routes, not verified exact source videos.
