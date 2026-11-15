export interface SkillGroup {
  id: string;
  label: string;
  tagline: string;
  categoryNumber: string;
  accent: "emerald" | "cyan" | "violet" | "purple" | "blue" | "teal" | "amber";
  items: string[];
  architecture: {
    headline: string;
    metric: string;
    summary: string;
    highlights: string[];
    shippedWith: string[];
  };
}

export const skillGroups: SkillGroup[] = [
  {
    id: "mobile",
    label: "React Native & Mobile",
    tagline: "Smooth 60 FPS Mobile Performance",
    categoryNumber: "01",
    accent: "emerald",
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
    architecture: {
      headline: "Smooth Animations & Fast Touch Response",
      metric: "60 FPS · Zero Lag",
      summary:
        "Building responsive mobile apps with fluid gestures, smooth screen transitions, and fast local data storage that never blocks the user interface.",
      highlights: [
        "Ultra-fast local data storage with MMKV for instant app loading",
        "Fluid touch animations and gestures powered by React Native Reanimated",
        "Clean, type-safe multi-screen navigation with state preservation",
        "Predictable state management using Zustand and Redux Toolkit",
      ],
      shippedWith: ["ApnaUstad", "Ayy Ride", "Mashrab-e-Hamdania", "Vena AI"],
    },
  },
  {
    id: "realtime",
    label: "Live Maps & Payments",
    tagline: "Real-Time Tracking & Secure Checkout",
    categoryNumber: "02",
    accent: "cyan",
    items: [
      "Mapbox",
      "Socket.IO",
      "Stripe PaymentSheet",
      "Expo Push",
      "Firebase Auth",
      "Twilio Video",
    ],
    architecture: {
      headline: "Live Location Tracking & In-App Payments",
      metric: "< 150ms Live Updates",
      summary:
        "Connecting users to live tracking maps with instant driver coordinates, automated background push alerts, and secure card payments via Stripe.",
      highlights: [
        "Interactive Mapbox navigation with smooth moving vehicle markers",
        "Live WebSocket communication for instant location broadcasts",
        "Native Stripe checkout supporting Apple Pay, Google Pay, and cards",
        "Reliable background push notifications for order and booking updates",
      ],
      shippedWith: ["Ayy Ride App", "ApnaUstad Services"],
    },
  },
  {
    id: "backend",
    label: "Node.js & Databases",
    tagline: "Fast APIs & Relational Databases",
    categoryNumber: "03",
    accent: "blue",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "REST",
      "Redis",
      "FastAPI",
    ],
    architecture: {
      headline: "Reliable Backend Services & Database Design",
      metric: "Fast Query Response",
      summary:
        "Designing scalable REST APIs, relational PostgreSQL databases with data integrity, and fast in-memory Redis caching for authentication and rate limits.",
      highlights: [
        "Clean PostgreSQL database schemas with automated rollbacks and indexing",
        "Redis caching for quick token validation and session management",
        "FastAPI microservices for asynchronous background tasks",
        "Secure user authentication with JWT tokens and role verification",
      ],
      shippedWith: ["Ayy Ride Backend", "ApnaUstad Core", "Repla Platforms"],
    },
  },
  {
    id: "media",
    label: "Smart TV & Video",
    tagline: "Video Streaming & TV Apps",
    categoryNumber: "04",
    accent: "violet",
    items: [
      "expo-video",
      "HLS Video",
      "Roku BrightScript",
      "LG webOS",
      "Samsung Tizen",
      "expo-file-system",
      "expo-secure-store",
    ],
    architecture: {
      headline: "Buffer-Free Video & Remote Control Navigation",
      metric: "Fast Video Start · Zero Stutter",
      summary:
        "Building dedicated Smart TV channels and video players for Roku, Android TV, Samsung Tizen, and LG webOS with simple remote control navigation.",
      highlights: [
        "Automatic video quality adjustment (adaptive bitrate HLS) for smooth playback",
        "Multi-language audio track and subtitle switching during video playback",
        "Fast local caching for TV channel guides, posters, and schedules",
        "Optimized to run smoothly on lower-memory TV hardware",
      ],
      shippedWith: ["Duplex TV (All TV OS)", "Mashrab-e-Hamdania Audio"],
    },
  },
  {
    id: "web",
    label: "Web Development",
    tagline: "Modern, Fast Web Applications",
    categoryNumber: "05",
    accent: "teal",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Three.js",
      "Turbopack",
      "HTML5 Semantics",
    ],
    architecture: {
      headline: "Responsive, Fast Web Interfaces",
      metric: "100 Lighthouse Performance",
      summary:
        "Developing high-speed web apps combining React and Next.js with clean Tailwind styling, interactive graphics, and search-engine-friendly structure.",
      highlights: [
        "Modern Next.js App Router with server-side rendering for speed",
        "Interactive WebGL canvas animations and responsive design",
        "Clean, maintainable utility CSS using Tailwind design tokens",
        "Full SEO optimization with OpenGraph previews and fast loading",
      ],
      shippedWith: ["Sardar Portfolio", "Repla Web Portals", "Vesper Landing"],
    },
  },
  {
    id: "ai",
    label: "AI & Smart Tools",
    tagline: "AI Assistants & Practical Automation",
    categoryNumber: "06",
    accent: "purple",
    items: [
      "LangChain",
      "LangGraph",
      "MCP Protocol",
      "OpenAI API",
      "Vector Embeddings",
    ],
    architecture: {
      headline: "Conversational Assistants & Workflows",
      metric: "Multi-Step AI Workflows",
      summary:
        "Integrating AI language models into practical applications to answer user questions, analyze text or images, and automate repetitive tasks.",
      highlights: [
        "Multi-step conversational flows that retain context across messages",
        "Integration with external APIs and tools using standard protocols",
        "Context optimization to deliver fast, accurate AI responses",
        "Reliable response validation to prevent unexpected outputs",
      ],
      shippedWith: ["Vena AI Agent", "Autonomous QA Tools"],
    },
  },
  {
    id: "ship",
    label: "Store Publishing & DevOps",
    tagline: "Automated Builds & Store Releases",
    categoryNumber: "07",
    accent: "amber",
    items: [
      "EAS Build",
      "ProGuard / R8",
      "Xcode",
      "Android Studio",
      "Fastlane",
      "Git",
    ],
    architecture: {
      headline: "App Store Publishing & Binary Optimization",
      metric: "100% Store Approval",
      summary:
        "Managing the complete release lifecycle for iOS and Android: cloud builds, code signing, size reduction, and submissions to Google Play and Apple App Store.",
      highlights: [
        "Optimized app bundles for fast startup times and smaller download sizes",
        "Custom Android ProGuard rules to prevent app crashes in production",
        "Automated EAS cloud builds targeting test and production tracks",
        "Certificate management and smooth submissions to store review",
      ],
      shippedWith: ["Mashrab-e-Hamdania (v1.0.2)", "ApnaUstad Production", "Ayy Ride Internal"],
    },
  },
];

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
