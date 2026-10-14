# Showcase/3D — Reusable 3D Product Template

Highly animated landing-page template for showcasing products in realtime 3D.
One config file (`src/config/products.ts`) drives the whole page — duplicate an
entry to onboard a new client.

## Stack

- Vite + React 19 + Tailwind CSS v4
- Three.js via `@react-three/fiber` + `@react-three/drei`
- GSAP ScrollTrigger + Lenis smooth scroll + Motion entrances

## Run

```bash
npm install
npm run dev
```

## Add a product

Edit `src/config/products.ts` — name, copy, price, colors. Procedural models live
in `src/three/ProductModels.tsx` (`headphones | watch | speaker | chair`).
To plug an AI-generated mesh later, render it with `useGLTF(product.modelUrl)`
inside `src/three/ProductViewer.tsx`.
