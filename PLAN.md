# Implementation plan and asset inventory

No pre-existing application or architecture was present. Originals in ../assets remain untouched. Build with Next.js static export, React, TypeScript, Three.js / React Three Fiber, Drei and GSAP. Keep a persistent canvas across views.

1. Foundation: establish typography, cinematic framing, deterministic procedural planet materials, stars and nebula.
2. Opening: darkness, first planet, two story beats, flight and system reveal; coordinated GSAP timeline and skip/replay.
3. Universe: five illuminated spheres, rings, orbital drift, hover/selection, orbit controls and interpolated camera restoration.
4. Worlds: photo exhibits, videos and random photographic rediscovery, sealed appreciation capsules, personal storytelling, future constellation.
5. Finale: constellation, intact together photograph, editable supplied draft letter, return/replay.
6. QA: production build, type checks, desktop/mobile browser interactions, reduced motion and no-WebGL fallback.

## Assets

| Original | Dimensions / content | Placement |
|---|---|---|
| 20.25.36.jpeg | 720 × 1280; smiling person at shop checkout | memories, person |
| 20.25.36 (1).jpeg | 867 × 1156; candid at checkout | memories |
| 20.25.52.jpeg | 867 × 1156; wider checkout scene | memories |
| 20.25.53 (1).jpeg | 1600 × 1200; two-person outdoor portrait | primary finale; both faces fully visible |
| 20.25.53.jpeg | 1600 × 1200; two-person road portrait | optional second finale photograph |
| 20.25.52.mp4 | original 2.30 MB video | madness; user-controlled playback |
| 20.25.52 (1).mp4 | original 2.47 MB video | madness; user-controlled playback |

All five JPEGs are copied byte-for-byte, never upscaled or filtered. Subject names are not inferred from appearance. The two MP4s will retain their original audio and will not autoplay. No separate soundtrack was supplied: optional ambience is synthesized with Web Audio and starts only on explicit activation.

Screenshots 35–52 were reviewed as direction, never embedded: violet/blue clouds, dark negative space, illuminated planetary limbs, warm rings, forward camera motion, floating frames and constellation lines. Unknown captions/jokes/future plans stay editable rather than invented.
