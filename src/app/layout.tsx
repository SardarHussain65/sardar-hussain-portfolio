import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { AdaptiveGrid } from "@/components/common/grid";
import { originSyncScript } from "@/components/common/origin-sync";
import { THEME_BOOT_SCRIPT } from "@/components/theme/theme-script";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";
import { siteConfig } from "@/lib/site";

import "@/app/globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

/**
 * The root layout. Keep it static: nothing here (or in any page) may read
 * `headers()` / `cookies()` — that renders every route per request. Robots are
 * told apart in `src/proxy.ts` instead (obsidian/frontend/robot-form.md).
 *
 * There is deliberately no `app/loading.tsx`: even one that returns `null`
 * wraps the page in a Suspense boundary, and the server then streams the whole
 * page inside `<div hidden>` — crawlers that don't run JS (most AI crawlers)
 * read a page whose content is hidden. Add a loading state per route, only
 * with a real skeleton.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale.split("_")[0]} suppressHydrationWarning>
      <body className={`${onest.variable}`}>
        {/* Before paint: restore a saved light or dark choice. Default is dark. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        {/* Canonical + share URLs follow the origin serving the page. */}
        <script
          dangerouslySetInnerHTML={{ __html: originSyncScript(siteConfig.url) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}
