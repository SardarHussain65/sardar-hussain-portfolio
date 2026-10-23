import { engagements, platforms } from "@/data/engagement";

export function EngagementSection() {
  return (
    <section
      id="work-with-me"
      aria-labelledby="work-with-me-heading"
      className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-8"
    >
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-mint-text">How the work lands</p>
        <h2
          id="work-with-me-heading"
          className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
        >
          Platforms, and the way
          <span className="block text-mint-text">a build gets hired.</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Where it ships
          </h3>
          <ul className="mt-5 space-y-4">
            {platforms.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl border border-border-subtle bg-surface/90 p-5"
              >
                <p className="text-base font-medium text-foreground">{item.name}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Ways to work together
          </h3>
          <ol className="mt-5 space-y-4">
            {engagements.map((item, index) => (
              <li
                key={item.name}
                className="flex gap-4 rounded-2xl border border-border-subtle bg-surface/90 p-5"
              >
                <span className="font-mono text-xs text-mint-text">0{index + 1}</span>
                <div>
                  <p className="text-base font-medium text-foreground">{item.name}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
