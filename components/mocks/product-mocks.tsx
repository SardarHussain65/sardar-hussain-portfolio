export function AyyRouteMock() {
  return (
    <div className="absolute inset-0 bg-[#dff6f3] text-slate-900">
      <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden bg-[#c9efe9]">
        <svg className="h-full w-full" viewBox="0 0 200 240" aria-hidden>
          <path d="M16 200 H184 M40 16 V220 M100 16 V220 M160 16 V220 M16 80 H184 M16 140 H184" stroke="#9fdcd3" strokeWidth="8" />
          <path
            d="M36 190 C 70 160, 78 130, 108 108 S 150 52, 168 36"
            fill="none"
            stroke="#0A84FF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="168" cy="36" r="6" fill="#00F5D4" />
          <circle cx="36" cy="190" r="6" fill="#0A84FF" />
        </svg>
        <p className="absolute top-10 left-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold shadow">
          Driver in 2 minutes
        </p>
      </div>
      <div className="absolute inset-x-2 bottom-7 rounded-2xl bg-white p-3 shadow-xl">
        <p className="text-[10px] uppercase tracking-wide text-slate-500">Live route</p>
        <p className="text-sm font-semibold">Sam Haiz · Sedan</p>
        <p className="mt-1 text-xs text-emerald-700">Make your trip safety first</p>
      </div>
    </div>
  );
}

export function ProductMock({ name }: { name: "telehealth" | "qbox" | "homeserve" }) {
  if (name === "telehealth") return <TelehealthMock />;
  if (name === "qbox") return <QboxMock />;
  return <HomeServeMock />;
}

function TelehealthMock() {
  return (
    <div className="absolute inset-0 bg-[#10141c] p-3 pt-9 text-white">
      <p className="text-[10px] uppercase tracking-[0.18em] text-cyan">Telehealth</p>
      <p className="mt-1 text-sm font-semibold">Video visit</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex h-24 items-end rounded-2xl bg-gradient-to-br from-ios/70 to-cyan/40 p-2 text-[10px]">
          You
        </div>
        <div className="flex h-24 items-end rounded-2xl bg-gradient-to-br from-emerald/50 to-ios/40 p-2 text-[10px]">
          Clinician
        </div>
      </div>
      <div className="mt-3 space-y-2 text-[11px]">
        <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-ios px-2 py-1.5">
          Ready when you are.
        </p>
        <p className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-2 py-1.5">
          Chart and reminders stay on the visit.
        </p>
      </div>
      <p className="absolute inset-x-3 bottom-8 rounded-full bg-white/10 px-3 py-2 text-center text-[10px]">
        Today · scheduled visit
      </p>
    </div>
  );
}

function QboxMock() {
  return (
    <div className="absolute inset-0 bg-[#10141c] p-3 pt-9 text-white">
      <p className="text-[10px] uppercase tracking-[0.18em] text-ios">QBox</p>
      <div className="mt-2 flex gap-1 text-[10px]">
        {["Owner", "Manager", "Tenant"].map((role) => (
          <span
            key={role}
            className={
              role === "Manager"
                ? "rounded-full bg-ios px-2 py-1"
                : "rounded-full bg-white/10 px-2 py-1 text-zinc-300"
            }
          >
            {role}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {[
          ["Lift fault", "Block B · open"],
          ["Water pressure", "Block A · assigned"],
          ["Lobby lights", "Completed"],
        ].map(([title, meta]) => (
          <div key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
            <p className="text-xs font-medium">{title}</p>
            <p className="text-[10px] text-zinc-400">{meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeServeMock() {
  return (
    <div className="absolute inset-0 bg-[#10141c] p-3 pt-9 text-white">
      <p className="text-[10px] uppercase tracking-[0.18em] text-emerald">HomeServe</p>
      <p className="mt-2 rounded-full border border-white/10 px-3 py-2 text-[11px] text-zinc-400">
        Search a service
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
        {["Electric", "Plumbing", "Cleaning", "AC"].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-emerald/10 px-2 py-4 text-center"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-white/[0.05] p-2">
        <p className="text-xs font-medium">Next visit</p>
        <p className="text-[10px] text-zinc-400">Worker on the way</p>
      </div>
    </div>
  );
}
