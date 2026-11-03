# Wrong Way

An original 21.23-second code-built 2D anatomy comedy: a cotton swab pushes a wax character into a tighter ear-canal space, an eardrum objects, and the swab learns to stay outside. The wax remains packed after withdrawal; the ending does not depict a spontaneous cure.

## Outputs

- `Wrong_Way_Voice_Guide.mp4`: 1080 × 1920, 30 fps, H.264/AAC. Fast synthetic scratch dialogue and topmost word guide.
- `Wrong_Way_Clean.mp4`: same animation and anatomy labels; no voice guide and no audio, ready for voice editing.
- `voice_script.txt`: speaker-tagged dialogue and starts for ElevenLabs.

All artwork is authored with vector paths and programmatic drawing. No generated image, reference frame, third-party footage, branding, or downloaded model is embedded.

## Reproduce

Requires Node.js, Python 3 with NumPy, FFmpeg, Linux Flite libraries (`libflite.so.1`, `libflite_cmu_us_slt.so.1`, `libflite_cmu_us_rms.so.1`), and DejaVu Sans. The audio generator currently targets Linux; other platforms need equivalent library loading or imported timestamped dialogue audio. Voice generation is a placeholder for ElevenLabs, not a finished voice performance.

```sh
npm install
python3 audio.py
node render.cjs
node render.cjs --clean --mute
```

`audio.py` generates `speech.json`, `timing.json`, `audio.wav`, and the voice script. Scratch speech uses pitch-preserving FFmpeg `atempo=1.27`; cue timings are scaled accordingly. These generated data are rebuilt before rendering.

Optional switches are independent: `--clean` hides the final dialogue guide; `--no-labels` hides anatomical labels; `--mute` removes audio. For a still: `node render.cjs still 9.2 frame.png --clean`. By default the renderer resolves the local npm package; an optional runtime environment variable is supported as fallback.

Replace scratch voices in the editor or adapt the cue input after ElevenLabs recording. Re-time phonemes, words, expressions, and cuts against the final audio. Do not assume equal durations.

## Medical basis

Verified 2026-11-03 against the American Academy of Otolaryngology–Head and Neck Surgery's ENT Health information: cotton swabs can push earwax deeper and worsen impaction or injure the canal.

https://www.enthealth.org/be_ent_smart/earwax-prevention-faqs/
https://www.enthealth.org/conditions/earwax-cerumen-impaction/

This is a simplified anthropomorphic cutaway, not a clinical simulation. It does not demonstrate a wax-removal treatment.

See `EXPERIMENT.md` for inspection evidence, checks, limitations, and pending user review.
