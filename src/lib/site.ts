// 📖 Docs: obsidian/frontend/seo-metadata.md

/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `manifest.ts`, `robots.ts`,
 * `sitemap.ts`, and the JSON-LD helper. **Server-only**: it reads the server
 * env (and so `zod`) — a client component that imports it ships ~69 KB gz of
 * zod to every visitor. Client code that needs the brand name gets it as a prop
 * or from a plain constants module.
 *
 * ⚠️ Every `TODO:` value below is a placeholder. They render loudly in dev (the
 * tab title says TODO), warn on every build, and **fail a Vercel production
 * build** — production sites measured with the old quiet placeholders shipped
 * "New Project" as their title, OG card and JSON-LD name, and Lighthouse still
 * scored SEO 100 because a title *existed*.
 */
import { getServerEnv, publicEnv } from "@/env";

const TODO = "TODO:";

const serverEnv = getServerEnv();

/**
 * Vercel's production domain, read at build time — the fallback when a deploy
 * doesn't set `NEXT_PUBLIC_SITE_URL`. Without it, sites that never set the
 * variable served `http://localhost:3000` as canonical, og:url, og:image and
 * every sitemap `<loc>` (11 of 12 live deploys checked).
 */
const vercelProduction = serverEnv.VERCEL_PROJECT_PRODUCTION_URL;

export const siteConfig = {
  /** The brand, exactly as the logo writes it. */
  name: "Sardar Hussain",
  /**
   * The home page's `<title>`: the brand + what it is, ≤ 60 characters
   */
  title: "Sardar Hussain — Senior Mobile App & React Native Engineer",
  /** 120–160 characters, from the site's own copy (the hero's lead line). */
  description: "Crafting production-grade React Native & Smart TV experiences. Mapbox routing, HLS video pipelines, Stripe payments, and full-stack platforms.",
  /** 5–8 phrases from the copy. */
  keywords: [
    "Sardar Hussain",
    "React Native Engineer",
    "Mobile App Developer",
    "Smart TV Developer",
    "Roku BrightScript",
    "HLS Video Streaming",
    "Full Stack Mobile"
  ],
  /**
   * Public origin, no trailing slash.
   */
  url:
    publicEnv.NEXT_PUBLIC_SITE_URL ??
    (vercelProduction
      ? `https://${vercelProduction}`
      : "http://localhost:3000"),
  /** Default Open Graph / Twitter share image (path under `public/`), 1200×630. */
  ogImage: "/open-graph.png",
  /** Describes the share image for screen readers and when it fails to load. */
  ogImageAlt: "Sardar Hussain — Mobile App Engineer Portfolio",
  /**
   * The site's real X/Twitter handle (`"@acme"`), or `undefined`
   */
  twitterHandle: undefined as string | undefined,
  /** Author / creator / publisher — the brand, not the agency. */
  author: "Sardar Hussain",
  /** Browser theme-color (address bar / PWA) — the brand's ground. */
  themeColor: "#030712",
  /** The manifest and the PWA splash background. */
  backgroundColor: "#030712",
  locale: "en_US",
};

/** The fields still holding a `TODO:` placeholder. */
const unset = Object.entries(siteConfig)
  .filter(([, value]) => typeof value === "string" && value.startsWith(TODO))
  .map(([key]) => key);

if (unset.length > 0) {
  const message = `siteConfig has placeholder values: ${unset.join(", ")} — set them in src/lib/site.ts`;
  if (serverEnv.VERCEL_ENV === "production") throw new Error(message);
  const flagged = globalThis as { __siteConfigWarned?: boolean };
  if (!flagged.__siteConfigWarned) {
    flagged.__siteConfigWarned = true;
    console.warn(`⚠ ${message}`);
  }
}
