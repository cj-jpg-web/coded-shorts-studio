# Upstairs — Acid Reflux

An original code-built 2D talking-anatomy reel. Stomach contents take the wrong exit through a relaxed lower esophageal sphincter; the esophagus reacts, and the story names acid reflux. Fast synthetic dialogue is a timing guide for later ElevenLabs voices.

## Deliverables

- `Acid_Reflux_Voice_Guide.mp4`: vertical H.264/AAC, 1080 × 1920, 30 fps; final/topmost removable word guide.
- `Acid_Reflux_Clean.mp4`: same animation with anatomy labels, no dialogue guide or audio.
- `voice_script.txt`: timed, speaker-tagged lines.

The drawings and motion are authored through code; no generated raster artwork or reference footage is embedded. The human characters are the anatomy itself, with expressions drawn on tissue and stomach contents.

## Reproduce

Requires Node.js, Python 3 with NumPy, FFmpeg, DejaVu Sans, Nimbus Sans Narrow, Linux Flite shared libraries (`libflite.so.1`, `libflite_cmu_us_slt.so.1`, `libflite_cmu_us_rms.so.1`). Other operating systems need an equivalent voice library setup or imported audio/cues. Runtime dependency fallback is optional; normal local npm resolution is preferred.

```sh
npm install
python3 audio.py
node render.cjs
node render.cjs --clean --mute
```

`audio.py` creates scratch audio, phoneme/word cues, timing data and the voice script. The renderer then reads the generated `speech.json` and `timing.json`. Scratch speech is sped up with pitch-preserving `atempo=1.27` and corresponding cue-time scaling.

Layer switches are independent: `--clean` hides the final voice guide; `--no-labels` hides anatomical labels; `--mute` removes audio. Example still: `node render.cjs still 4.4 frame.png --clean`. Re-time speech cues, mouth poses, gestures and cuts when final ElevenLabs audio arrives.

## Medical basis

Checked 2026-11-03 against NIDDK:

https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/symptoms-causes
https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/definition-facts

Reflux is stomach contents flowing back into the esophagus. An inappropriately relaxed or weak lower esophageal sphincter can contribute. The visual redness is a cartoon cue for irritation, not a clinical depiction of immediate injury. Reflux and GERD are not treated as interchangeable diagnoses. The reel offers no treatment or promise of an instant cure.

## Review

See `EXPERIMENT.md`. This production applies the user's latest art/label feedback without updating the production skill or its learning ledger.

## Saved video copies

Owner-only master copies are stored separately. Reproduce the video from this source using the documented dependencies; no private-account links are required by this repository.
