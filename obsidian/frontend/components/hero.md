---
tags: [frontend, component]
updated: 2026-10-12
---

# Component — Hero

- **File:** `components/sections/hero.tsx`
- **Type:** Client Component
- **Status:** stable

## Purpose

The first screen. A full-viewport dark stage with the name, the headline "Presence, in motion.", a short line about the shipped apps, stack badges, two actions, and a four-stat strip. [[particle-field]] sits behind the type.

## Props

None.

## Notes

- Screenshots are not in the hero. They stay in Selected work at their real aspect ratio.
- Stats are career facts: 6+ production apps, a 60 FPS motion standard, one solo platform, about two years shipping.
- The section is `min-h-[100dvh]` with bottom padding so the stat strip clears the fixed dock.
