# Coded Shorts Studio

Our private workspace for code-built animated shorts, reusable 3D scenes, cameras, materials, and video outputs.

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

No reference creator footage is included. Third-party dependencies retain their own licenses. This repository is private; do not change its visibility without the owner's instruction.

## Output copies and masters

The MP4s in `outputs/` are compact 1080p copies. Full-quality master deliverables remain available separately:

- [The Clone Button master](https://chatgpt.com/library?file_id=libfile_0fedb34c8d388191b522a6a4ff5235ea&account_id=personal)
- [Held Together clean master](https://chatgpt.com/library?file_id=libfile_7b5fcb3dd7548191af2efcc5c5452cf8&account_id=personal)
