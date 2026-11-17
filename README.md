# ASHWAK — Our Little Universe

A personal, continuous 3D friendship experience using Next.js, React, TypeScript, React Three Fiber, Three.js, Drei and GSAP.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Build a portable static site with `npm run build`; deploy the generated `out/` directory on any static host. The production site does not require a Node server.

## Deploy on Vercel

Import this GitHub repository as a new Vercel project. The application is at the repository root. Use the Next.js framework preset, `npm ci` to install, `npm run build` to build, and `out` as the output directory; these settings are included in `vercel.json`. Use Node.js 26 in the Vercel project settings (the version used for the production build). No environment variables or backend services are required. `npm start` / `npm run preview` serves the exported build locally on port 3001.

Mobile now uses a portrait arrangement of the five planets, with the bottom world tabs hidden. Tap a planet or its label to enter a world; the return link takes you back. If WebGL is unavailable, the text navigation stays visible so every world remains accessible. A coordinated heart transition introduces the letter; reduced motion opens it immediately.

## Personalize

Edit `src/data/story.ts` for world names, memory captions, sealed messages, inside jokes and the final letter. The supplied letter is an editable draft. Add actual jokes to `insideJokes` rather than inventing them. Photographs and videos live in `public/images` and `public/videos`; original source assets remain untouched in `../assets`.

`PLAN.md` documents the asset inventory and implementation stages. Images use `object-fit: contain`; no face editing, cropping, recompression or upscaling was performed. Two original together photographs are reserved for the letter reveal. Video sound is the original recording. Ambient sound is a quiet synthesized chord, explicitly activated by the visitor; its volume can be adjusted.

## Interactions

- Opening: a continuous 20-second camera and text sequence; skip at any time or replay from the universe.
- Five worlds: select a 3D planet, its label, or a keyboard-accessible navigation item. Drag to orbit and scroll/pinch to zoom. Escape returns to the universe.
- Memories: previous/next and complete-photo expansion.
- Madness: both original videos and random rediscovery of real supplied photographs.
- Words: three sealed appreciation capsules.
- My person: supplied portrait and personal appreciation.
- Beyond: add or remove future-star notes, stored only on the current device.
- Letter: always available, with a constellation and both original portraits together. Visiting all five worlds also highlights it in the universe footer.
- Hidden star: discover a small personal message.

Visited worlds and future notes use browser local storage, with graceful handling when storage is unavailable. There is no backend, analytics or account system. Fonts are bundled locally. Reduced motion skips the introduction and removes decorative motion. If WebGL is unavailable, all five worlds and the letter remain accessible with a lightweight starfield.

## Verification

`npm run build` checks the production build and TypeScript. `node qa.mjs` exercises desktop/mobile views and saves screenshots to ignored `qa/`. It uses the installed Chrome executable on this Windows workstation. Browser coverage includes intro skip, each world, gallery, capsules, future-star persistence, audio toggle, both together photographs and reduced motion.
