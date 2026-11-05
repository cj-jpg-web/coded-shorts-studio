# Coded Shorts Studio

Workspace for code-built animated shorts, reusable 3D scenes, cameras, materials, and video outputs.

## Portable anatomy-animation skill

[Start here: use the production skill with any AI](ANATOMY_SKILL.md). The [skill](skills/direct-anatomy-animation/SKILL.md) captures art direction, acting/timing, reference observations, review gates, and the [learning ledger](skills/direct-anatomy-animation/references/learning-ledger.md). Read the latest revision before work and record reviewed experiments afterward. Use the repository or a local copy.

## Projects

| Project | Source | Video |
|---|---|---|
| The Clone Button | [Three.js lab story](projects/clone-button/) | [MP4](outputs/clone_button.mp4) |
| Held Together | [React Three Fiber + Remotion explainer](projects/held-together/) | [Clean MP4](outputs/held_together.mp4) |

## Start here

For the current engine:

```sh
cd projects/held-together
npm ci
npm run dev
```

`npm run build` checks TypeScript and builds the preview. `npm run render` exports a 1080 × 1920, 24 fps MP4 with sound. FFmpeg must be installed. See the project README for browser requirements.

The default stitches video has no overlay text or progress bar. Use `?labels=1` in the browser to preview optional editorial overlays. The exporter captures the clean 3D canvas.

For The Clone Button, run `node serve.mjs` from its project directory; the preview uses vendored Three.js.

## Reuse

- `projects/held-together/src/core/`: frame-based timing and continuous camera rig.
- `projects/held-together/src/assets/`: procedural materials, anatomy and stitch geometry.
- `projects/held-together/src/projects/`: story direction, scenes, lighting and optional captions.
- Each project includes its setup and rendering instructions.
- `outputs/`: finished videos. Temporary renders, dependencies, and machine-specific logs are excluded.

## Production workflow

1. Study a reference for visual principles and explanatory clarity.
2. Create our own script, models, and scene direction.
3. Reuse existing assets, timing, and camera tools where appropriate.
4. Review key frames, render, and check the final MP4.
5. Commit source changes and save the final output here.

No reference creator footage is included. Third-party dependencies retain their own licenses. The owner has authorized public access. Keep credentials, account-only links, and third-party study footage out of published files.


## Crafted cartoon story workflow

[Start here](STORY_SKILL.md) · [Production instructions](skills/direct-cartoon-story/SKILL.md) · [Reference catalog](skills/direct-cartoon-story/references/reference-catalog.json)

The story workflow adds dedicated planning specialties, per-line visual direction, story-specific artwork, sustained emotion, joint/contact planning, evidence-bound audits, fault diagnosis, and final-video delivery. It prioritizes craftsmanship; existing anatomy project reuse guidance does not override this story brief.

Reference videos are indexed by title, creator lookup, file identity, and observed techniques. Third-party video files and owner-only media links are not redistributed. Bring lawfully supplied local footage or verify official sources before claiming a reference comparison.

The workflow has passed structural checks, regression tests, and a planning forward test. A future complete film must still demonstrate its artistic results.
