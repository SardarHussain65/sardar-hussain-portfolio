export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
};

export type Project = {
  slug: string;
  name: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  tags: string[];
  highlights: string[];
  images: Shot[];
  mock?: "telehealth" | "qbox" | "homeserve";
  featured: boolean;
  accent: "cyan" | "ios" | "emerald";
  status?: string;
  interactive?: "booking" | "tracks";
  deviceType?: "mobile" | "tv";
};

export const projects: Project[] = [
  {
    slug: "apnaustad",
    name: "ApnaUstad",
    role: "Solo full-stack architect",
    summary: "Home services marketplace connecting clients with skilled professionals, built & shipped alone.",
    problem:
      "Clients and workers needed one product for discovery, booking, live tracking, and admin oversight — without two apps drifting apart.",
    solution:
      "A single React Native codebase switches navigation by role. The Express API owns auth, matching, earnings, and a booking state machine. PostgreSQL holds users, categories, bookings, reviews, payments, and push tokens. A React admin panel covers verification, disputes, and revenue.",
    tags: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Sequelize",
      "Socket.IO",
      "React.js",
      "Expo Push",
      "Resend",
    ],
    highlights: [
      "Dual-role navigation (Client & Worker) in one codebase",
      "Live GPS tracking over Socket.IO during active jobs",
      "Full web admin portal for disputes & escrow revenue",
      "OTP domain verification via Resend with secure JWT storage",
    ],
    images: [
      { src: "/portfolio/apnaustad-client.png", alt: "ApnaUstad client home with service categories", width: 1080, height: 2424, label: "Client home" },
      { src: "/portfolio/apnaustad-worker.png", alt: "ApnaUstad worker earnings dashboard", width: 1080, height: 2424, label: "Worker home" },
      { src: "/portfolio/apnaustad-role.png", alt: "ApnaUstad choice between client and specialist", width: 1080, height: 2424, label: "Choose a role" },
      { src: "/portfolio/apnaustad-start.png", alt: "ApnaUstad onboarding with secure payments", width: 1080, height: 2424, label: "Get started" },
      { src: "/portfolio/ApnaUstad Website.png", alt: "ApnaUstad marketing site", width: 1455, height: 837, label: "Site" },
    ],
    featured: true,
    accent: "emerald",
    status: "Production · Solo Full-Stack",
    interactive: "booking",
  },
  {
    slug: "ayy",
    name: "Ayy Ride",
    role: "Repla Technologies · Ride-Hailing",
    summary: "High-concurrency passenger and driver mobility platform with real-time Mapbox navigation.",
    problem:
      "Google Maps could not handle the customized pricing polylines, sub-second vehicle animations, and multi-tier fleet fares at scale.",
    solution:
      "Engineered Mapbox vector layers with real-time turn-by-turn driver tracking over Socket.IO. Embedded Stripe PaymentSheet with 3D Secure fallback and automated background driver dispatch.",
    tags: [
      "React Native",
      "Mapbox",
      "Socket.IO",
      "Stripe",
      "Redux Toolkit",
      "PostgreSQL",
      "Expo Push",
    ],
    highlights: [
      "Dual-sided passenger and driver apps with custom Mapbox tiles",
      "Sub-second driver coordinates smoothing with bearing interpolation",
      "Stripe PaymentSheet integration with multi-currency checkout",
      "Background location sync with battery-optimized throttling",
    ],
    images: [
      { src: "/portfolio/Ayy.png", alt: "Ayy Sign-in & Authentication", width: 221, height: 477, label: "Onboarding" },
      { src: "/portfolio/Ayy2.png", alt: "Ayy Vehicle Selection & Fare", width: 149, height: 323, label: "Ride Select" },
      { src: "/portfolio/Ayy3.png", alt: "Ayy Live Map Route", width: 150, height: 327, label: "Mapbox Route" },
      { src: "/portfolio/Ayy4.png", alt: "Ayy Driver Incoming Offer", width: 215, height: 456, label: "Driver Offer" },
    ],
    featured: true,
    accent: "cyan",
    status: "Production · Repla Technologies",
  },
  {
    slug: "duplex",
    name: "Duplex TV",
    role: "Repla Technologies · Smart TV Engineer",
    summary: "Cross-platform Smart TV streaming engine engineered for Android TV, Samsung Tizen, LG webOS, and Roku.",
    problem:
      "Television operating systems run on constrained low-memory chipsets with disparate environments (Roku BrightScript, LG webOS, Samsung Tizen, Android TV). Delivering high-framerate HLS video, live EPG navigation, and multi-track audio without frame drops required platform-specific architecture.",
    solution:
      "Architected specialized Smart TV clients across all ecosystems: native Roku BrightScript channel with SceneGraph, high-performance webOS & Tizen apps with virtualized D-pad focus management, and Android TV engine. Features sub-second HLS stream buffering, multi-language audio/subtitle switcher, and persistent MMKV caching.",
    tags: [
      "Smart TV",
      "Android TV",
      "Samsung Tizen",
      "LG webOS",
      "Roku BrightScript",
      "HLS Video",
      "IPTV Engine",
      "Spatial Navigation",
    ],
    highlights: [
      "Engineered for all major TV platforms: Android TV, Samsung Tizen, LG webOS & Roku",
      "Native Roku BrightScript SceneGraph channel with high-speed remote response",
      "Sub-second HLS video playback pipeline with adaptive bitrate scaling",
      "Virtualized 10-foot UI with remote control D-pad spatial focus navigation",
    ],
    images: [
      { src: "/portfolio/Duplex_Live_TV.png", alt: "Duplex Smart TV Live Guide & EPG", width: 908, height: 634, label: "Live TV Guide" },
      { src: "/portfolio/Duplex_Movies_TV.png", alt: "Duplex Smart TV Movies & Series Hub", width: 782, height: 800, label: "Movies & VoD" },
      { src: "/portfolio/Duplex.png", alt: "Duplex Live Channel Bar", width: 158, height: 163, label: "Channel EPG Bar" },
      { src: "/portfolio/Duplex3.png", alt: "Duplex Video Player Detail", width: 154, height: 180, label: "Player Detail" },
    ],
    featured: true,
    accent: "ios",
    status: "Production · All Smart TV Platforms",
    deviceType: "tv",
    interactive: "tracks",
  },
  {
    slug: "hamdania",
    name: "Mashrab-e-Hamdania",
    role: "Major Contributor · Islamic Platform",
    summary: "Spiritual companion app with audio streaming, rated 5.0 on Google Play with 1,500+ searchable titles.",
    problem:
      "Daily practice, fiqh, religious texts, and high-quality audio recitation required a fast, offline-first digital repository with instant Arabic/Urdu search.",
    solution:
      "Built a modular React Native application with background audio streaming, bookmarks, and full-text index across 1,586 titles. Shipped version 1.0.2 to Google Play Store with 100% 5-star ratings.",
    tags: ["React Native", "Expo", "Search Index", "Google Play", "Audio Streaming"],
    highlights: [
      "Live on Google Play with 5.0 rating (v1.0.2)",
      "High-speed offline-first search indexing 1,586 titles",
      "Background audio player with lock-screen media controls",
      "Eight dedicated spiritual practice areas with prayer notifications",
    ],
    images: [
      { src: "/portfolio/Hamdaniya.png", alt: "Hamdaniya Splash & Calligraphy", width: 472, height: 1056, label: "Opening" },
      { src: "/portfolio/Hamdaniya2.png", alt: "Hamdaniya Home Navigation Grid", width: 478, height: 1048, label: "Home Grid" },
      { src: "/portfolio/Hamdaniya3.png", alt: "Hamdaniya Library Search", width: 472, height: 1042, label: "Search Index" },
    ],
    featured: true,
    accent: "emerald",
    status: "Live on Google Play · 5.0 ★",
  },
  {
    slug: "vena",
    name: "Vena AI",
    role: "Healthcare Product",
    summary: "AI-powered healthcare triage and clinic discovery engine with localized dialect intelligence.",
    problem:
      "Patients in Saudi Arabia needed instant symptom consultation in regional Arabic dialects paired with geo-located specialist clinic appointments.",
    solution:
      "Integrated location-aware clinic discovery with priced medical services and conversational AI triage tailored to Saudi regional terminology and medical context.",
    tags: ["React Native", "AI Care Chat", "Clinic Discovery", "Geo-Location"],
    highlights: [
      "Conversational AI assistant with photo analysis guidance",
      "Dynamic clinic radius filtering with real-time appointment pricing",
      "Patient reviews, doctor credentials, and direct consultation booking",
    ],
    images: [
      { src: "/portfolio/vena.png", alt: "Vena AI Onboarding & Triage", width: 259, height: 566, label: "AI Consultation" },
      { src: "/portfolio/vena2.png", alt: "Vena Clinic Discovery", width: 208, height: 443, label: "Nearby Clinics" },
      { src: "/portfolio/vena3.png", alt: "Vena Clinic Reviews & Ratings", width: 209, height: 450, label: "Doctor Profile" },
    ],
    featured: false,
    accent: "ios",
    status: "AI Healthcare",
  },
  {
    slug: "qbox",
    name: "QBox Smart Locker",
    role: "Repla Technologies · IoT & Logistics",
    summary: "Contactless smart locker drop-off and pickup app with hardware role-based authorization.",
    problem:
      "Secure parcel delivery required instant locker bay unlocking via QR codes with strict isolation between couriers, property managers, and tenants.",
    solution:
      "Engineered React Native IoT client with QR scanner, phone/email OTP verification, and Zustand state store syncing property tickets and maintenance logs via REST.",
    tags: ["React Native", "Zustand", "IoT Scanner", "Role-Based Access"],
    highlights: [
      "QR code and OTP smart locker parcel handoff flow",
      "Role-based views for property managers, couriers, and tenants",
      "Offline-resilient package drop-off verification receipts",
    ],
    images: [
      { src: "/portfolio/Smart Locker.jpeg", alt: "QBox Locker Welcome Screen", width: 720, height: 1640, label: "Smart Locker" },
      { src: "/portfolio/Smart Locker2.jpeg", alt: "QBox Sign-in & Authentication", width: 720, height: 1640, label: "Secure Sign-in" },
    ],
    featured: false,
    accent: "cyan",
    status: "IoT & Logistics",
  },
];
