---
tags: [frontend, webgl]
updated: 2026-10-12
---

# WebGL scenes

This portfolio has one scene: the hero particle field. ADR: [[decisions-log]] ADR-0001.

| Module | For |
|--------|-----|
| `components/scene/particle-field.tsx` | Pointer-reactive point cloud behind the hero |

## Rules for this scene

- One WebGL context, inside the hero only.
- Draw while the hero intersects the viewport. Skip frames when `document.hidden` is set.
- Cap pixel ratio: 1.5 on a wide screen, 1.25 under 768px.
- Point budgets: about 12,000 and 3,200. Pay for smoothness by drawing fewer points, not by capping the frame rate.
- Dispose geometry, material, and renderer when the component unmounts.
- With reduced motion, render no canvas. The hero still shows the type, badges, and stats on the dark ground.

## Related

[[particle-field]] · [[hero]]
