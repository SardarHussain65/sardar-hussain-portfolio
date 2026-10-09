import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Syne } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sardar Hussain — React Native & Full-Stack Mobile Engineer",
  description:
    "Portfolio of Sardar Hussain, a React Native engineer in Rawalpindi shipping ride-hailing, healthcare, IPTV, property, and full-stack mobile platforms at 60 FPS.",
  openGraph: {
    title: "Sardar Hussain — React Native & Full-Stack Mobile Engineer",
    description:
      "Production React Native work: Mapbox routing, HLS video, Stripe payments, and solo full-stack architecture.",
    type: "website",
    locale: "en_PK",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: site.email,
  telephone: site.phoneTel,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rawalpindi",
    addressCountry: "PK",
  },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian font-sans text-zinc-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
