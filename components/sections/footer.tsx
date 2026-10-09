"use client";

import { site } from "@/data/site";
import { ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 px-4 py-12 pb-28 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-muted">
          Designed & built by {site.name} &copy; {year}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-violet transition-colors"
          >
            <GitHubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-violet transition-colors"
          >
            <LinkedInIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted hover:border-violet hover:text-violet transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
