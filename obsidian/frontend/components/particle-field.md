---
tags: [frontend, component]
updated: 2026-10-12
---

# Component — ParticleField

- **File:** `components/scene/particle-field.tsx`
- **Type:** Client Component
- **Status:** stable

## Purpose

The hero's living field. Points morph from a condensed orb to a spiral galaxy to a two-lobe neural form, and shift toward the pointer.

## Props

None. It fills its absolutely positioned parent.

## Usage

```tsx
<div className="absolute inset-0">
  <ParticleField />
</div>
```

Mounted only from [[hero]].

## Notes

- Three.js is imported inside `useEffect`, so the server render is an empty div.
- Targets live in `aOrb`, `aGalaxy`, and `aBrain`. A shader mixes them. React state does not drive the frame.
- Pointer input is a window listener writing a ref. The shader eases toward it.
- See [[webgl-scenes]] and [[decisions-log]] ADR-0001.
