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
    label: "Mobile Runtime",
    tagline: "High-Framerate 60 FPS Gesture Threading",
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
      headline: "Native UI & High-Speed Gesture Pipeline",
      metric: "< 16ms Frame Budget · 60 FPS",
      summary:
        "Offloads complex touch drag-to-dismiss sheets, physics springs, and reactive animations directly onto the native UI thread, keeping the JavaScript bridge completely unblocked.",
      highlights: [
        "Sub-millisecond synchronous storage via MMKV C++ JSI bindings",
        "Declarative Worklets & gesture handlers via React Native Reanimated",
        "Deep type-safe modular navigation graphs with state persistence",
        "Zustand & Redux Toolkit slices with zero redundant re-renders",
      ],
      shippedWith: ["ApnaUstad", "Ayy Ride", "Mashrab-e-Hamdania", "Vena AI"],
    },
  },
  {
    id: "realtime",
    label: "Real-time & Payments",
    tagline: "Sub-Second Live Telemetry & Financial Rails",
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
      headline: "Low-Latency Geolocation & Checkout Flow",
      metric: "< 150ms Driver Telemetry Sync",
      summary:
        "Engineered real-time bidirectional WebSocket rooms with heartbeat reconnection, smooth vehicle polyline coordinate interpolation, and PCI-compliant native Stripe mobile checkouts.",
      highlights: [
        "Dynamic Mapbox GL vector routing with custom driver marker rotation",
        "Socket.IO bidirectional location broadcast with packet batching",
        "Stripe PaymentSheet native SDK with Apple Pay & Google Pay support",
        "Expo Push notification receipt pipeline with background token renewal",
      ],
      shippedWith: ["Ayy Ride App", "ApnaUstad Services"],
    },
  },
  {
    id: "backend",
    label: "Backend & Data",
    tagline: "Distributed Relational & In-Memory Architectures",
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
      headline: "High-Throughput Relational & Cache Tier",
      metric: "Sub-50ms Query Latency",
      summary:
        "Architected scalable backend microservices, indexing relational schemas for multi-tenant isolation, rapid full-text search indexing, and in-memory Redis session management.",
      highlights: [
        "PostgreSQL schemas with foreign keys, transactional rollbacks & GiST indexes",
        "Redis caching for ephemeral tokens, rate limits, and live location buffers",
        "FastAPI Python microservices for asynchronous computational tasks",
        "JWT role-based authorization with bearer token refresh rotation",
      ],
      shippedWith: ["Ayy Ride Backend", "ApnaUstad Core", "Repla Platforms"],
    },
  },
  {
    id: "media",
    label: "Media & Smart TV",
    tagline: "Hardware-Decoded HLS Streaming & IPTV Engines",
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
      headline: "Adaptive Bitrate Video & 10-Foot Spatial UI",
      metric: "< 800ms Buffer Startup · Zero Drops",
      summary:
        "Delivered production IPTV and media player engines across Apple TV, Android TV, Roku SceneGraph, and Web TV (Tizen/webOS) with custom remote D-pad focus management.",
      highlights: [
        "Native HLS master playlist parsing with adaptive bitrate switching",
        "Multi-track audio and subtitle switcher through custom useEvent callbacks",
        "Persistent artwork and EPG guide caching via MMKV + expo-file-system",
        "Hardware-accelerated playback avoiding memory thrashing on low-end TVs",
      ],
      shippedWith: ["Duplex TV (All TV OS)", "Mashrab-e-Hamdania Audio"],
    },
  },
  {
    id: "web",
    label: "Web & Front-End",
    tagline: "Static Generation & Server-Side Rendering",
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
      headline: "Modern SSR & WebGL Interactive Systems",
      metric: "100 Lighthouse Performance Scores",
      summary:
        "Crafting high-speed web interfaces combining static server components with client-side WebGL particle canvases, smooth spring transitions, and responsive fluid design.",
      highlights: [
        "Next.js App Router with React Server Components by default",
        "Custom Three.js WebGL shaders with kinetic pointer interaction",
        "Tailwind CSS custom token architecture with zero CSS bloat",
        "Automated SEO metadata, JSON-LD schemas, and OpenGraph cards",
      ],
      shippedWith: ["Sardar Portfolio", "Repla Web Portals", "Vesper Landing"],
    },
  },
  {
    id: "ai",
    label: "AI Agents & Intelligence",
    tagline: "Stateful Graph Workflows & LLM Orchestration",
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
      headline: "Autonomous Tool-Calling & Context Chains",
      metric: "Multi-Turn Structured Reasoning",
      summary:
        "Building autonomous agents that decompose complex prompts into discrete tool invocations, persist memory across conversation turns, and interface with system tools via MCP.",
      highlights: [
        "LangGraph stateful workflow graphs with cyclic conditional branching",
        "Model Context Protocol (MCP) tool integration and structured JSON schemas",
        "Context window optimization and conversational checkpointing",
        "Automated prompt engineering with robust Zod response validation",
      ],
      shippedWith: ["Vena AI Agent", "Autonomous QA Harnesses"],
    },
  },
  {
    id: "ship",
    label: "Native Build & Release",
    tagline: "Automated Binary Optimization & Store Distribution",
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
      headline: "Hermes Bytecode Compilation & Store Submission",
      metric: "100% 5-Star Store Approval Rate",
      summary:
        "Full-cycle mobile DevOps pipeline handling native iOS pods, Android Gradle configurations, R8 shrinking keep rules, and automated store signing for both Google Play and App Store.",
      highlights: [
        "Hermes bytecode pre-compilation for instant app cold start times",
        "Custom ProGuard & R8 keep rules protecting Expo module reflection",
        "EAS cloud build matrix targeting internal, preview, and production tracks",
        "Strict semantic versioning, release signing certificates & keychain provisioning",
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
