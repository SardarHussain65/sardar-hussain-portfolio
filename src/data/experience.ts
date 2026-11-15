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
    badge: "Core Mobile Developer",
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
      "Shipped 5 commercial mobile apps across ride-hailing, smart locker IoT, Smart TV streaming, and healthcare.",
      "Built real-time map navigation with Mapbox for Ayy Ride, with live car tracking and instant ride fare calculation.",
      "Integrated secure in-app payments with Stripe (Apple Pay & Google Pay) and reliable background push notifications.",
      "Set up automated cloud build pipelines with EAS Build for fast, smooth releases to Google Play and Apple App Store.",
    ],
  },
  {
    id: "apnaustad",
    org: "ApnaUstad",
    title: "Solo Full-Stack Developer",
    place: "Independent Project",
    dates: "2024 — Present",
    current: true,
    badge: "Built Solo from Scratch",
    accent: "cyan",
    impactMetric: "Complete Ecosystem Built Solo",
    shippedProjects: [
      "ApnaUstad Customer App",
      "ApnaUstad Worker App",
      "Node.js Backend API",
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
      "Designed and developed the entire product alone: customer app, worker app, backend API, database, and admin portal.",
      "Built a real-time booking system that connects customers to nearby workers and tracks jobs from start to completion.",
      "Implemented secure passwordless login with email OTP, protected authentication tokens, and live GPS worker tracking.",
    ],
  },
  {
    id: "hamdania",
    org: "Mashrab-e-Hamdania",
    title: "Mobile App Contributor",
    place: "Live on Google Play",
    dates: "v1.0.2 Shipped",
    current: false,
    badge: "5.0 ★ Rating on Google Play",
    accent: "violet",
    impactMetric: "1,586 Searchable Texts",
    shippedProjects: ["Hamdania Audio & Library (Google Play)"],
    techStack: [
      "React Native",
      "Audio Streaming",
      "SQLite / Offline Search",
      "expo-video",
      "Google Play Console",
    ],
    points: [
      "Contributed core modules for an Islamic companion app serving communities across Baltistan and Kashmir, rated 5.0 on Google Play.",
      "Developed background audio playback that continues when the screen is locked, plus fast offline search across 1,586 titles.",
    ],
  },
  {
    id: "techsolab",
    org: "Techsolab",
    title: "Software Developer",
    place: "Rawalpindi, PK",
    dates: "Aug 2024 — Present",
    current: true,
    badge: "Mobile App Engineer",
    accent: "teal",
    impactMetric: "Cross-Platform Mobile Apps",
    shippedProjects: ["Cross-Platform Mobile Apps"],
    techStack: ["React Native", "Firebase Auth", "Firestore", "REST APIs"],
    points: [
      "Developed cross-platform mobile apps using React Native with clean, responsive user interfaces.",
      "Connected apps with Firebase for user authentication and real-time database synchronization.",
    ],
  },
  {
    id: "vu",
    org: "Virtual University of Pakistan",
    title: "B.S. Computer Science",
    place: "Rawalpindi, PK",
    dates: "Mar 2024 — Present",
    current: true,
    badge: "Degree in Progress",
    accent: "amber",
    impactMetric: "B.S. Computer Science",
    techStack: ["Data Structures", "Algorithms", "Object-Oriented Design", "Databases"],
    points: [
      "Pursuing a Bachelor of Science in Computer Science while working as a full-time mobile developer.",
      "Strengthening core foundations in data structures, algorithms, and relational database design.",
    ],
  },
];

export const credentials = [
  "ICS · UPS College · 2023 · 76.8%",
  "Matric, General Science · UPS College · 2021 · 94%",
  "HTML, CSS & JavaScript · CODSOFT · 2024",
] as const;
