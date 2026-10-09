import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  kicker,
  title,
  body,
}: {
  index: string;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <div className="mb-3 h-1 w-10 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] rounded-full" />
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--violet)]">
        {index} / {kicker}
      </p>
      <h2 className="mt-3 font-display text-section font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">{body}</p>
    </Reveal>
  );
}
