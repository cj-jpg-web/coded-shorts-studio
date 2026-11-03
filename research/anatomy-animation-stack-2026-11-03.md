# Anatomy animation stack research

Research date: 2026-11-03. Scope: documentation and release review, not a production benchmark. No new software or third-party skills installed. The existing production skill and learning ledger are unchanged.

## Finding

The current recognition failure is partly drawing design: the ear study shows a generic curved passage with insufficient outer-ear context. Palette changes cannot supply the missing landmarks. Treat artwork creation, deformation/acting, and timeline/export as separate decisions. This is our project diagnosis, not a claim from software vendors.

## Candidate stacks and decision

| Candidate | Verified capabilities | Proposed project role | Unproven or costly part |
|---|---|---|---|
| Rive CLI + Rive rig + Remotion | Text-based RML scenes, editable Rive assets, command-line inspection and headless image capture; bones/meshes in Rive; Remotion has a Rive component | First challenger to benchmark for code-controlled organic rigs | Exact renderer compatibility, deterministic timing and clean export for our assets require testing; editor/account export terms must be checked for the chosen route |
| Authored SVG + GSAP MorphSVG + Remotion | Path-data morphing; official frame-driven GSAP integration in Remotion | Practical code-first baseline; precise expression poses, contours, labels and voice layers | We must author strong anatomy and pose targets; morphing is not anatomical reasoning |
| Moho Pro 14.5 | Smart Bones, Liquid Shapes, Curvers, improved freehand drawing; current 14.5 adds live controls and drawing changes | Illustration-led vector rigging alternative | Paid desktop application; current execution environment has no verified Moho installation or automation pipeline |
| Blender 5.2 LTS / Grease Pencil | New fill algorithm, improved stroke distribution and brushes, Python API and SVG-related improvements | Free illustration/rigging/compositing alternative, especially for 2.5D needs | More setup and version-specific scripting; not installed here; do not assume ordinary SVG import preserves every effect |
| PixiJS v8 | Mesh geometry, MeshRope, filters and shader control | Add only when deforming artwork or fluid effects need GPU control | More custom rig/shader engineering; not an art generator |
| OpenToonz / Synfig | Plastic mesh/skeleton controls or skeleton deformation respectively | Other animation-editor options | No demonstrated autonomous workflow here; not the first benchmark candidates |
| Spine | Mesh deformation and interoperable JSON import/export | Alternative for reusable illustrated puppets | Meshes need the appropriate editor edition; JSON/runtime versions must match; no automatic illustration benefit |

These rankings are judgments about fit for this project, not measured output-quality scores.

## New and relevant capabilities

- Rive's current CLI documentation explicitly describes agent-written RML, version-controlled source, inspection and headless frames. Its project setup writes agent instructions. This is materially different from a workflow limited to manually operating an editor.
- Remotion's current `@remotion/gsap` pauses the GSAP timeline and seeks it from the current video frame. This addresses nondeterministic wall-clock playback during video rendering. `@remotion/rive` is also documented, but our full asset/render compatibility remains untested.
- Blender's official release index lists 5.2.3 LTS dated October 22, 2026; the download page's 5.2.2 listing is older. The 5.2 release adds Grease Pencil filling and brush improvements. Use the stable LTS branch for evaluation rather than treating an upcoming beta as production-ready.
- Moho's official current materials describe 14.5 live animation and improved freehand/paint-bucket tools. Live tracking is less directly relevant to our scripted reels than Smart Bones, Curvers and authored expression actions.

## Artwork generation technologies

Recraft currently advertises editable vector generation (its vector landing page names V4.1). StarVector (CVPR 2025) and OmniSVG (NeurIPS 2025) demonstrate image/text-conditioned SVG generation. These are worth testing as an optional artwork stage, not automatic replacements for anatomy and animation design. Generated paths may need semantic regrouping, masks, draw-order cleanup and expression poses before rigging. This clean-up requirement is our engineering inference.

OmniSVG's published inference table lists about 17 GB GPU memory for its 4B model and 26 GB for 8B. Do not assume that these run comfortably on the user's Core i3 laptop. Hosted inference would be a separate setup/cost decision. No model or paid service was tested or purchased.

Using AI-generated art changes a strict all-art-authored-through-code workflow. Keep it an explicitly optional hybrid route. Use original or licensed inputs, not copied reference creator frames as production assets.

## Relevant agent skills

- Official Remotion skills: https://github.com/remotion-dev/skills — composition, timing, rendering, captions and related implementation practices.
- Official GSAP skills: https://github.com/greensock/gsap-skills — timelines, plugin usage and implementation patterns.
- Rive CLI project instructions: generated AGENTS.md/CLAUDE.md, with CLI schema lookup and verification guidance.

These teach correct tool use. None establishes anatomical accuracy or premium art quality. Review and pin their revisions before a future authorized adoption. Do not blindly install a large unrelated skill collection.

## Recommended next benchmark (proposal only)

Use a single ear, not five simultaneous organs. First establish an unlabeled close drawing with helix, antihelix, concha, tragus and canal entrance clearly related. Compare the existing coded approach, a carefully authored SVG, and optionally a generated-vector candidate. Have unprimed reviewers identify it; record confusion, not an invented similarity percentage.

Only after recognition passes, use the SAME accepted artwork to compare a Rive rig against SVG/GSAP: notice → brace → compression → recoil → irritated recovery. Check contour continuity, attached shadows, independent eyes/lids/brows, material identity, stable frame seeking and export. Keep labels and final voice guide separate.

Record setup effort, revision effort, source editability, visual findings and actual laptop/runtime constraints. Do not declare a winner based on vendor demos.

## Current runtime check

Node, FFmpeg and Inkscape are present. Rive, Blender, Synfig and OpenToonz's tcomposer were not found on PATH. This is not evidence that the user lacks them on their own computer. No benchmark was run.

## Primary sources

1. Rive CLI: https://rive.app/docs/cli/overview
2. Rive features: https://rive.app/features
3. Rive agent workflow: https://github.com/rive-app/rive-docs/blob/main/cli/agents.mdx
4. Remotion Rive: https://www.remotion.dev/docs/rive/
5. Remotion GSAP: https://www.remotion.dev/docs/gsap/
6. Remotion agent skills: https://www.remotion.dev/docs/ai/skills
7. GSAP MorphSVG: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/
8. Moho features: https://moho.lostmarble.com/pages/features
9. Moho 14.5: https://moho.lostmarble.com/blogs/news/moho-14-5-showtime-design-rig-and-animate-characters-live-all-the-power-of-moho-now-live
10. Blender 5.2 capabilities: https://www.blender.org/download/releases/5-2/
11. Blender release index: https://www.blender.org/releases/5-2/
12. PixiJS meshes: https://pixijs.com/8.x/guides/components/scene-objects/mesh
13. OpenToonz Plastic tool: https://opentoonz.readthedocs.io/en/latest/create_animations_using_plastic_tool.html
14. Synfig skeleton: https://synfig.readthedocs.io/en/latest/tools/skeleton.html
15. Spine meshes: https://en.esotericsoftware.com/spine-meshes
16. Spine JSON: https://us.esotericsoftware.com/spine-json-format
17. Recraft vectors: https://www.recraft.ai/ai-vector-generator
18. StarVector paper/project: https://starvector.github.io/starvector/
19. OmniSVG paper/project: https://omnisvg.github.io/
20. OmniSVG inference requirements: https://github.com/OmniSVG/OmniSVG

Release pages and product claims can change. Validate exact versions, compatibility and applicable licenses before adopting a stack. This report is research evidence, not a change to the production skill.
