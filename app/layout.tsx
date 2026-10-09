import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sardar Hussain — React Native Developer",
  description:
    "Portfolio of Sardar Hussain, a React Native developer at Repla Technologies in Rawalpindi. Shipped production apps: ride-hailing, telehealth, IPTV, smart lockers, and a solo full-stack home-services platform.",
  openGraph: {
    title: "Sardar Hussain — React Native Developer",
    description:
      "Production React Native work: Mapbox routing, HLS video, Stripe payments, and solo full-stack architecture.",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sardar Hussain — React Native Developer",
    description:
      "Production React Native work: Mapbox routing, HLS video, Stripe payments, and solo full-stack architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: site.email,
  telephone: site.phoneTel,
  worksFor: {
    "@type": "Organization",
    name: site.company,
  },
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
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Prevent FOUC for theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');else if(t==='dark')document.documentElement.setAttribute('data-theme','dark');else if(window.matchMedia('(prefers-color-scheme:light)').matches)document.documentElement.setAttribute('data-theme','light')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-bg font-sans text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
