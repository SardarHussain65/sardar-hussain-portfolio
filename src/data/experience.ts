export interface ExperienceRole {
  id: string;
  org: string;
  title: string;
  place: string;
  dates: string;
  current?: boolean;
  badge: string;
  accent: "emerald" | "cyan" | "violet" | "amber" | "teal";
  impactMetric: string;
  shippedProjects?: string[];
  techStack: string[];
  points: string[];
}

export const roles: ExperienceRole[] = [
  {
    id: "repla",
    org: "Repla Technologies",
    title: "React Native Developer",
    place: "Rawalpindi, PK",
    dates: "Aug 2024 — Present",
    current: true,
    badge: "Core Engineering Lead",
    accent: "emerald",
    impactMetric: "5 Production Apps Shipped",
    shippedProjects: [
      "Ayy Ride (Mapbox & Stripe)",
      "Duplex TV (All TV OS)",
      "QBox Smart Locker",
      "Telehealth Platform",
      "HomeServe Services",
    ],
    techStack: [
      "React Native",
      "Expo SDK 52+",
      "Mapbox GL",
      "Stripe PaymentSheet",
      "Socket.IO",
      "PostgreSQL",
      "EAS Build",
      "ProGuard / R8",
    ],
    points: [
      "Shipped 5 commercial mobile applications to production across ride-hailing, IoT lockers, smart TVs, and telehealth.",
      "Engineered high-performance Mapbox GL navigation on Ayy Ride, replacing Google Maps with live polylines, sub-second driver location streams, and real-time fare calculation.",
      "Integrated native Stripe PaymentSheet with Apple Pay & Google Pay and end-to-end background Expo Push tokens stored in PostgreSQL.",
      "Constructed automated EAS cloud build pipelines, configuring strict ProGuard / R8 keep rules to eliminate runtime crashes on Expo module reflection classes.",
    ],
  },
  {
    id: "apnaustad",
    org: "ApnaUstad",
    title: "Solo Full-Stack Architect",
    place: "Independent Greenfield",
    dates: "2024 — Present",
    current: true,
    badge: "Solo Product Architect",
    accent: "cyan",
    impactMetric: "0 → 1 Full Ecosystem Delivery",
    shippedProjects: [
      "ApnaUstad Client App",
      "ApnaUstad Worker App",
      "Node.js Backend Microservices",
      "React Admin Dashboard",
    ],
    techStack: [
      "React Native",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Socket.IO",
      "Resend API",
      "expo-secure-store",
    ],
    points: [
      "Designed and authored the complete client mobile app, worker mobile app, Node.js REST API, PostgreSQL database schemas, and React admin portal independently.",
      "Engineered real-time booking lifecycle state machine (pending, accepted, in-progress, completed) with automated worker dispatch matching and commission payouts.",
      "Implemented passwordless email OTP verification via Resend on custom domain, secure JWT sessions in expo-secure-store, and Socket.IO bidirectional job tracking.",
    ],
  },
  {
    id: "hamdania",
    org: "Mashrab-e-Hamdania",
    title: "Major Contributor",
    place: "Live on Google Play",
    dates: "v1.0.2 Shipped",
    current: false,
    badge: "5.0 ★ Google Play App",
    accent: "violet",
    impactMetric: "1,586 Searchable Islamic Titles",
    shippedProjects: ["Hamdania Audio & Library (Google Play)"],
    techStack: [
      "React Native",
      "Audio Streaming",
      "SQLite / Full-Text Search",
      "expo-video",
      "Google Play Console",
    ],
    points: [
      "Contributed core modules for spiritual companion app serving Noorbakshia and Hamdania communities across Baltistan and Kashmir, rated 5.0 on Google Play.",
      "Built background audio streaming recitation player with lock-screen media controls and rapid offline-first search index spanning 1,586 titles across Quran, fiqh, and aurad.",
    ],
  },
  {
    id: "techsolab",
    org: "Techsolab",
    title: "Software Developer",
    place: "Rawalpindi, PK",
    dates: "Aug 2024 — Present",
    current: true,
    badge: "Mobile Software Engineer",
    accent: "teal",
    impactMetric: "Cross-Platform Engineering",
    shippedProjects: ["Cross-Platform Mobile Apps"],
    techStack: ["React Native", "Firebase Auth", "Firestore", "REST APIs"],
    points: [
      "Built cross-platform React Native mobile client applications with Firebase authentication workflows and responsive UI components.",
      "Integrated real-time database synchronizations and state management pipelines.",
    ],
  },
  {
    id: "vu",
    org: "Virtual University of Pakistan",
    title: "B.S. Computer Science",
    place: "Rawalpindi, PK",
    dates: "Mar 2024 — Present",
    current: true,
    badge: "Academic Foundation",
    accent: "amber",
    impactMetric: "CS Degree in Progress",
    techStack: ["Data Structures", "Algorithms", "Object-Oriented Design", "Databases"],
    points: [
      "Pursuing Bachelor of Science in Computer Science in parallel with full-time production engineering.",
      "Focusing on computational complexity, low-level system memory boundaries, and relational database normalization.",
    ],
  },
];

export const credentials = [
  "ICS · UPS College · 2023 · 76.8%",
  "Matric, General Science · UPS College · 2021 · 94%",
  "HTML, CSS & JavaScript · CODSOFT · 2024",
] as const;
