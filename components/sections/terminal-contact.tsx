"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { mailHref, site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";

type Line = {
  id: number;
  kind: "input" | "text" | "link";
  text: string;
  href?: string;
};

const helpText = [
  "help      list commands",
  "whoami    short bio",
  "skills    stack by category",
  "contact   email Sardar",
  "hire      call or WhatsApp",
  "github    open GitHub",
  "linkedin  open LinkedIn",
  "resume    download the CV",
  "clear     clear the screen",
];

export function TerminalContact() {
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: "text", text: "sardar@mobile — type help" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const nextId = useRef(1);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [lines]);

  function push(line: Omit<Line, "id">) {
    const id = nextId.current++;
    setLines((current) => [...current, { ...line, id }]);
  }

  function run(raw: string) {
    const command = raw.trim().toLowerCase();
    push({ kind: "input", text: raw });
    if (!command) return;

    if (command === "clear") {
      setLines([]);
      return;
    }

    if (command === "help") {
      helpText.forEach((text) => push({ kind: "text", text }));
      return;
    }

    if (command === "whoami") {
      push({
        kind: "text",
        text: `${site.name} — ${site.title}, ${site.location}.`,
      });
      push({
        kind: "text",
        text: "Two-plus years shipping production React Native at Repla, plus ApnaUstad end to end.",
      });
      return;
    }

    if (command === "skills") {
      skillGroups.forEach((group) => {
        push({ kind: "text", text: `${group.label}` });
        push({ kind: "text", text: `  ${group.items.join(" · ")}` });
      });
      return;
    }

    if (command === "contact") {
      push({ kind: "link", text: site.email, href: mailHref });
      window.location.href = mailHref;
      return;
    }

    if (command === "hire") {
      push({ kind: "link", text: `Call ${site.phoneDisplay}`, href: `tel:${site.phoneTel}` });
      push({ kind: "link", text: "WhatsApp", href: site.whatsapp });
      return;
    }

    if (command === "github") {
      push({ kind: "link", text: site.githubLabel, href: site.github });
      window.open(site.github, "_blank", "noreferrer");
      return;
    }

    if (command === "linkedin") {
      push({ kind: "link", text: "LinkedIn", href: site.linkedin });
      window.open(site.linkedin, "_blank", "noreferrer");
      return;
    }

    if (command === "resume") {
      push({ kind: "link", text: "Download resume.pdf", href: site.resume });
      window.open(site.resume, "_blank", "noreferrer");
      return;
    }

    push({ kind: "text", text: `command not found: ${command}. Try help.` });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = input;
    setHistory((current) => [...current, value]);
    setHistoryIndex(-1);
    setInput("");
    run(value);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    if (history.length === 0) return;
    const next =
      event.key === "ArrowUp"
        ? historyIndex < 0
          ? history.length - 1
          : Math.max(0, historyIndex - 1)
        : historyIndex < 0
          ? -1
          : Math.min(history.length, historyIndex + 1);
    setHistoryIndex(next);
    setInput(next < 0 || next >= history.length ? "" : history[next]);
  }

  return (
    <section id="contact" className="scroll-mt-28 px-4 pt-20 pb-36 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          kicker="Contact"
          title="A shell, not a form."
          body="Email, WhatsApp, GitHub, and LinkedIn are one command away. The dock under the page does the same with a tap."
        />

        <div className="mt-10 overflow-hidden rounded-[24px] border border-white/10 bg-black/50 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <p className="ml-2 font-mono text-xs text-zinc-500">sardar@mobile — zsh</p>
          </div>
          <div ref={scroller} className="h-72 overflow-y-auto px-4 py-4 font-mono text-sm">
            {lines.map((line) =>
              line.kind === "input" ? (
                <p key={line.id}>
                  <span className="text-cyan">sardar</span>
                  <span className="text-zinc-500">@mobile % </span>
                  <span>{line.text}</span>
                </p>
              ) : line.kind === "link" && line.href ? (
                <p key={line.id}>
                  <a
                    href={line.href}
                    className="text-cyan underline-offset-2 hover:underline"
                    target={line.href.startsWith("http") ? "_blank" : undefined}
                    rel={line.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {line.text}
                  </a>
                </p>
              ) : (
                <p key={line.id} className="whitespace-pre-wrap text-zinc-300">
                  {line.text}
                </p>
              ),
            )}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <label htmlFor="shell" className="font-mono text-sm text-cyan">
              %
            </label>
            <input
              id="shell"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              className="terminal-input w-full bg-transparent font-mono text-sm text-white outline-none"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command"
              placeholder="skills"
            />
          </form>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          {site.location} · Available immediately · {site.email}
        </p>
      </div>
    </section>
  );
}
