---
tags: [frontend, component]
updated: 2026-10-12
---

# Component — Site nav

- **File:** `components/ui/dynamic-island.tsx`
- **Export:** `DynamicIsland`
- **Type:** Client Component
- **Status:** stable

## Purpose

The fixed pill at the top of the page: wordmark, Work, Systems, Experience, About, a theme toggle, and Contact. On a narrow screen the links move into a menu opened by the icon button.

## Notes

- Link targets come from `nav` in `data/site.ts`.
- The active link follows `section[id]` through an `IntersectionObserver`.
- Contact goes to `#contact`. It is a `GlowingButton`, not a nav item.
