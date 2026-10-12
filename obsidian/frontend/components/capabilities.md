---
tags: [frontend, component]
updated: 2026-10-12
---

# Component — Capabilities

- **File:** `components/sections/capabilities.tsx`
- **Type:** Server Component
- **Status:** stable

## Purpose

Four practice cards between the hero and Selected work: live maps and matching, native video, marketplaces, and secure product flows. Copy is taken from the shipped apps.

## Props

None. The card list is local to the file.

## Notes

- Each card is wrapped in `Reveal` from `components/ui/reveal.tsx`.
- Mounted in `app/page.tsx` immediately after [[hero]].
