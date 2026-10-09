"use client";

import { mailHref, site } from "@/data/site";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FileDown, Mail, Phone } from "lucide-react";
import { useState } from "react";

const items = [
  {
    id: "email",
    label: "Email",
    hint: "Copy email",
    icon: Mail,
  },
  {
    id: "call",
    label: "Call",
    hint: site.phoneDisplay,
    href: `tel:${site.phoneTel}`,
    icon: Phone,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    hint: "Open WhatsApp",
    href: site.whatsapp,
    external: true,
    icon: WhatsAppIcon,
  },
  {
    id: "resume",
    label: "Resume",
    hint: "Download CV",
    href: site.resume,
    download: true,
    icon: FileDown,
  },
  {
    id: "github",
    label: "GitHub",
    hint: site.githubLabel,
    href: site.github,
    external: true,
    icon: GitHubIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    hint: "Open LinkedIn",
    href: site.linkedin,
    external: true,
    icon: LinkedInIcon,
  },
] as const;

export function BottomDock() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = mailHref;
    }
  }

  return (
    <Tooltip.Provider delayDuration={180}>
      <div className="fixed bottom-3 left-1/2 z-50 w-[min(680px,calc(100%-0.75rem))] -translate-x-1/2">
        <nav
          aria-label="Contact dock"
          className="flex items-end justify-between gap-1 rounded-[1.6rem] border border-white/10 bg-[#12141a]/80 px-2 py-2 shadow-2xl backdrop-blur-xl sm:px-3"
        >
          {items.map((item) => {
            const Icon = item.icon;
            const label = item.id === "email" && copied ? "Copied" : item.label;
            const className =
              "group flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] text-zinc-300 hover:bg-white/[0.06] hover:text-white sm:text-xs";
            const inner = (
              <>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-cyan transition group-hover:-translate-y-0.5">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="truncate">{label}</span>
              </>
            );

            const control =
              item.id === "email" ? (
                <button type="button" className={className} onClick={copyEmail}>
                  {inner}
                </button>
              ) : (
                <a
                  href={item.href}
                  className={className}
                  download={"download" in item && item.download ? true : undefined}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {inner}
                </a>
              );

            return (
              <Tooltip.Root key={item.id}>
                <Tooltip.Trigger asChild>{control}</Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="top"
                    sideOffset={8}
                    className="z-[80] rounded-full bg-white px-2.5 py-1 text-xs font-medium text-obsidian shadow-lg"
                  >
                    {item.id === "email" && copied ? "Copied" : item.hint}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            );
          })}
        </nav>
        <p className="sr-only" aria-live="polite">
          {copied ? `Copied ${site.email}` : ""}
        </p>
      </div>
    </Tooltip.Provider>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.84-2.1 3.79-2.1 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24h-4V8.5z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.8L1 22l5.4-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.2.7.7-3.1-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
