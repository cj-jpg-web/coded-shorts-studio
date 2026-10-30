# The Clone Button

An original 18-second visual comedy short, generated entirely in code. A lab assistant tries to duplicate one strawberry; the button gets stuck, and an experiment turns into an unexpected snack.

## Technology

Three.js 0.187.0 + plain JavaScript modules, Canvas-generated textures and captions, deterministic procedural animation, headless Chromium capture, and FFmpeg encoding. There is no Blender scene, external modeling application, downloaded model, stock texture, generated image, or externally recorded sound. Three.js is vendored with its license for offline preview.

React is not needed for this first film; a React control interface could wrap the same scene later.

## Browser preview — no installation of packages needed

With Node.js installed, run `node serve.mjs` in this folder. Open the local address it prints. The preview has play/pause and a timeline scrubber. All visual assets are generated locally; the preview makes no network asset requests.

The browser preview is visual-only. The exported MP4 contains the synthesized soundtrack.

## Edit

- `story.js`: geometry, furnishings, textures, facial expressions, character pose, camera shots, strawberry motion and captions.
- `sound.py`: original sound design, using NumPy and Python's wave module.
- `render.mjs`: frame-by-frame browser capture and H.264 rendering.
- `index.html`: player and preview controls.

`window.renderAt(seconds)` deterministically draws any frame. Geometry and material design use shared/smooth normals for curves and intentional broad flat surfaces for the room and machinery.

## Video rendering

The headless capture was tested on Linux with Node.js, Playwright, @sparticuz/chromium, Python/NumPy and FFmpeg. Run `npm install`, then `npm install --no-save playwright`, then `node prepare-renderer.mjs`, `node render.mjs`, `python sound.py`, and `python finalize.py`. The last command muxes the final MP4.

This runtime requires archive extraction without ownership changes; the small bootstrap patch used here is recorded in `prepare-renderer.mjs`. Run it after installing dependencies in a similarly restricted Linux environment.

Final export: native 1080 × 1920, 30 fps, 18 seconds. Motions are art-directed, not a rigid-body physics simulation. Cloning is fictional.
