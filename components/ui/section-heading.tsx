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
    <div className="max-w-2xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
        {index} / {kicker}
      </p>
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">{body}</p>
    </div>
  );
}
