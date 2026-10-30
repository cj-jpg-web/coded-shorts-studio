# Coded Shorts Studio — Held Together

A 24-second original 3D explainer study of how stitches support wound closure.
Reference: Zack D. Films, “How Stitches Work” (user-supplied video). The reference is not redistributed. Models, textures, script, animation, camera path, and sound are original code-built assets.

## Stack

TypeScript • React • Three.js • React Three Fiber • Drei • Remotion / ThreeCanvas / Player • Vite • Playwright / Chromium • FFmpeg • Python + NumPy (sound only).

## Preview

Node 22 recommended. Run `npm ci`, then `npm run dev`. Open the localhost URL. The browser player supports seeking, play/pause, and looping. The default is a clean video with no titles, captions, labels, progress line, or overlay gradients. Append `?labels=1` to the browser URL to preview the optional editorial overlays. The video exporter captures only the clean 3D canvas. Source is frame-driven at 24 fps, 1080 × 1920; it does not rely on accumulated animation delta time.

## Build and export

`npm run build` checks TypeScript and builds the web preview.

`npm run preview-frames` captures review images. `npm run render` exports the finished `held_together.mp4` plus the intermediate `held_together_silent.mp4`. FFmpeg must be on PATH. On Windows/macOS, run `npx playwright install chromium` first, or set `CHROME_EXECUTABLE` to a compatible Chromium executable. The included capture script has been tested with Linux headless Chromium and software WebGL; hardware/browser differences may affect speed and shading. This project uses Remotion for the timeline and composition, with a custom Playwright/FFmpeg capture exporter.

`python scripts/sound.py` regenerates the original soundtrack (requires NumPy). Mux:

```sh
ffmpeg -y -i held_together_silent.mp4 -i public/soundtrack.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart held_together.mp4
```

## Reusable structure

- `src/core/timeline.ts`: timing, beats, easing, animation state.
- `src/core/CameraRig.tsx`: connected camera and target curves.
- `src/assets/materials.ts`: seeded procedural skin textures.
- `src/assets/Anatomy.tsx`: curved limb, wound mesh, thread loops, tissue cutaway.
- `src/projects/HeldTogether.tsx`: project direction, room, lighting and captions.
- `src/main.tsx`: player and deterministic frame capture interface.
- `scripts/render.mjs`: reusable browser frame export.

## Scope and visual simplifications

A stylized educational visualization, not a suturing tutorial or anatomically exact simulation. Needle travel, stitch placement, knot tying, tissue structure, and removal are simplified. The cutaway is an explanatory reveal, not a new injury. Healing is time-compressed; collagen and tissue growth are illustrated schematically. The final scar is not a prediction of an individual outcome. This version has captions and original sound design, with no spoken narration.

Factual grounding: sutures approximate and support wound edges while healing occurs; fibroblasts deposit collagen during repair.

- https://www.ncbi.nlm.nih.gov/books/NBK470598/
- https://www.ncbi.nlm.nih.gov/books/NBK539891/
- https://www.ncbi.nlm.nih.gov/books/NBK586099/

## Reuse and distribution

Keep each new project separate from core reusable components. Commit source and lockfile; put large MP4 exports in repository Releases. Do not commit node_modules. Third-party packages retain their own licenses; check Remotion's applicable license before a commercial/team rollout. No repository has been published by this task.
