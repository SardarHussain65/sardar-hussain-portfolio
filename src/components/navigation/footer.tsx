"use client";

import { nav, site } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

const socials = [
  { href: site.github, label: "GitHub" },
  { href: site.linkedin, label: "LinkedIn" },
  { href: site.whatsapp, label: "WhatsApp" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border-subtle bg-background px-4 py-16 text-foreground sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 border-b border-border-subtle pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-mint-text">
              {site.availability}
            </p>
            <p className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
              Build the next app
              <span className="block text-mint-text">with a steady hand.</span>
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-80"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-medium">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-foreground">
              {site.title} at {site.company}. {site.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              On this page
            </p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-mint-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Direct
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-mint-text"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-mint-text"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-mint-text"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-mint-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono">{site.appsShipped} production apps · 60 FPS target</p>
        </div>
      </div>
    </footer>
  );
}
