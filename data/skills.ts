export const skillGroups = [
  {
    id: "mobile",
    label: "Mobile",
    items: [
      "React Native",
      "Expo SDK 52+",
      "TypeScript",
      "Reanimated",
      "MMKV",
      "React Navigation",
      "Redux Toolkit",
      "Zustand",
    ],
  },
  {
    id: "realtime",
    label: "Real-time & payments",
    items: [
      "Mapbox",
      "Socket.IO",
      "Stripe PaymentSheet",
      "Expo Push",
      "Firebase Auth",
      "Twilio Video",
    ],
  },
  {
    id: "backend",
    label: "Backend & data",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "REST",
      "Redis",
      "FastAPI",
    ],
  },
  {
    id: "media",
    label: "Media",
    items: ["expo-video", "HLS", "expo-file-system", "expo-secure-store"],
  },
  {
    id: "web",
    label: "Web",
    items: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    id: "ai",
    label: "AI agents",
    items: ["LangChain", "LangGraph", "MCP", "OpenAI API"],
  },
  {
    id: "ship",
    label: "Ship",
    items: ["EAS Build", "ProGuard / R8", "Xcode", "Android Studio", "Git"],
  },
] as const;

export const systems = [
  {
    id: "storage",
    eyebrow: "Offline-first",
    title: "High-speed storage",
    summary:
      "MMKV for instant key-value reads, SQLite and PostgreSQL caches, and expo-secure-store for keychain-backed secrets.",
    detail:
      "Session tokens, device identity, and media cache keys stay off the JS thread where it matters. Secure storage holds JWT sessions across client and worker roles.",
  },
  {
    id: "geo",
    eyebrow: "Live systems",
    title: "Real-time & geolocation",
    summary:
      "Mapbox GL routes, Socket.IO location streams, background tracking, and Expo Push tokens stored in PostgreSQL.",
    detail:
      "Ayy replaced Google Maps with Mapbox polylines and sub-second driver sync. ApnaUstad broadcasts a worker’s live GPS to the client during an active booking.",
  },
  {
    id: "media",
    eyebrow: "Native media",
    title: "Streaming pipelines",
    summary:
      "HLS live and on-demand playback through expo-video, with hardware decoding, track selection, and disk caching.",
    detail:
      "Duplex sets contentType to hls for streams that are not .m3u8 files, switches audio and subtitles with useEvent, and caches artwork through MMKV plus expo-file-system.",
  },
  {
    id: "devops",
    eyebrow: "Release",
    title: "Production builds",
    summary:
      "EAS Build for iOS and Android, ProGuard and R8 keep rules, and store signing for Play and the App Store.",
    detail:
      "Release builds needed explicit keep rules for Expo module classes. The same pipeline ships the Repla apps and ApnaUstad.",
  },
  {
    id: "agents",
    eyebrow: "Next horizon",
    title: "AI agents",
    summary:
      "Python FastAPI services, LangChain and LangGraph stateful agents, Redis caches, and the MCP protocol.",
    detail:
      "Current study track alongside production mobile work: Redis for caching, OTP, and rate limits, plus SQLAlchemy on FastAPI.",
  },
] as const;
