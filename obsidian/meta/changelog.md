---
tags: [meta, changelog]
updated: 2026-10-12
---

# Changelog

Chronological log of notable changes to this portfolio. Newest first.

## 2026-10-12

**Cinematic hero and a living particle field.** The home page now opens on a full-viewport dark scene instead of a phone mock beside the headline.

- New `components/scene/particle-field.tsx`. A Three.js point cloud morphs through an orb, a spiral galaxy, and a neural form, and warps toward the pointer. It renders only while the hero is in view, caps device pixel ratio, uses fewer points on a phone, and draws nothing when reduced motion is requested. Reasoning: [[decisions-log]] ADR-0001.
- `components/sections/hero.tsx` is the scene: headline, stack badges, and a four-stat strip over the field.
- New `components/sections/capabilities.tsx` — live maps, native video, marketplaces, secure product flows — mounted after the hero in `app/page.tsx`.
- `components/ui/dynamic-island.tsx` is a floating pill: Sardar, Work, Systems, Experience, About, and Contact. Nav labels live in `data/site.ts`.
- Palette in `app/globals.css` moved to `#030712`, violet `#8b5cf6`, and mint `#10b981`.
- Dependency: `three`.
- Project screenshots stay the original files inside Selected work.
