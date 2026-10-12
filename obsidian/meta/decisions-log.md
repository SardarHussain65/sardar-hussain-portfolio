---
tags: [meta, decision]
updated: 2026-10-12
---

# Decisions Log (ADRs)

Why this portfolio is built the way it is. Newest first.

## ADR-0001 — The hero particle field is raw Three.js points, paused offscreen

- **Status:** Accepted
- **Date:** 2026-10-12

**Context.** The portfolio needed a dark, pointer-reactive field — orb, galaxy, and a neural form — without covering or recropping the real project screenshots. A React Three Fiber canvas for the whole page would keep a render loop alive while the reader is in the work section.

**Decision.** The field is one client component, `components/scene/particle-field.tsx`. It uses `three` `Points` and a custom shader, not `@react-three/fiber`. Shape targets are buffer attributes. The loop starts in `useEffect`, stops when the hero leaves the viewport or the tab is hidden, and disposes the geometry, material, and renderer on unmount. Desktop draws about 12,000 points at a pixel ratio of at most 1.5. A phone draws about 3,200 points at a pixel ratio of at most 1.25. `prefers-reduced-motion: reduce` skips the canvas. The scene is confined to the hero. Screenshots stay in Selected work at their real aspect ratio.

**Consequences.** Do not mount a second WebGL context on the home page. Do not animate the field from React state. If the particle count or the shader changes, re-check that the hero type stays readable and that the loop is idle after scrolling to Work.

## Related

[[particle-field]] · [[webgl-scenes]]
