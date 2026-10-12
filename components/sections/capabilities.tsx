import { Reveal } from "@/components/ui/reveal";

const capabilities = [
  {
    index: "01",
    title: "Live maps and matching",
    body: "Mapbox routes, driver location, and fare updates over Socket.IO for a two-sided ride marketplace.",
  },
  {
    index: "02",
    title: "Native video",
    body: "HLS live and on-demand playback, audio and subtitle tracks, and artwork cached on device.",
  },
  {
    index: "03",
    title: "Marketplaces",
    body: "One React Native app for clients and workers, with bookings, earnings, and an admin desk on Postgres.",
  },
  {
    index: "04",
    title: "Secure product flows",
    body: "Phone and email sign-in, role-scoped property data, and locker handoffs that stay on the right account.",
  },
];

export function Capabilities() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#a78bfa]">Practice</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Motion with a job behind it.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {capabilities.map((item) => (
            <Reveal key={item.index}>
              <article className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/40 hover:shadow-[0_20px_60px_-30px_rgba(139,92,246,0.8)]">
                <p className="font-mono text-xs text-[#6ee7b7]">{item.index}</p>
                <h3 className="mt-4 font-display text-2xl font-medium text-white">{item.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
