# Verification

## Mobile and heart-transition update

Verified the portrait layout at 390 × 844 and 360 × 740. The bottom tabs are hidden on mobile; all five planet labels were selected using actual touch coordinates. Labels remained inside the viewport. Desktop tabs remain visible. The heart veil opens the letter once, completes, and removes its overlay; reduced motion bypasses it. Production build and TypeScript passed, with zero captured browser errors in the mobile run. Early intro skipping now remains skipped when the scene finishes loading.

Production export and TypeScript validation passed. Headless Chrome tested at 1440 × 1000 and 390 × 844, with screenshots visually reviewed.

- Full timed introduction: September 2023, personal story, cosmic journey and automatic ASHWAK reveal passed. Skip and reduced-motion bypass passed.
- Persistent WebGL canvas, all five worlds and return navigation passed.
- Gallery previous/next and full-photo expansion passed; no broken images.
- Together photograph: source 1600 × 1200, displayed 580 × 435 on desktop, `object-fit: contain`. Second photograph switch passed.
- Video 1: 848 × 478, 9.93 seconds. Video 2: 480 × 848, 11.27 seconds. Both original files loaded; playback verified in Chrome.
- Capsule opening, random supplied-photo rediscovery and hidden-star message passed.
- Audio activation/mute state passed. Subjective listening and volume calibration were not independently measured.
- Future notes add/remove and local-storage persistence across reload passed.
- Mobile viewport reported no horizontal document overflow. Outer planets were reframed after screenshot review.
- WebGL disabled: fallback loaded; navigation, capsules, and future notes still worked.
- Production browser run: zero captured JavaScript/console errors. Development Strict Mode reports an upstream Drei Html root cleanup warning; it is absent from the production build.

Visual polish is implemented with procedural shaders, not film-quality offline rendering. Browser testing was performed on this workstation; physical phone performance and Safari remain unverified. Generated QA screenshots and logs are kept locally in ignored `qa/`.
