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
  category?: "mobile" | "tv" | "fullstack";
  liveUrl?: string;
  storeUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "apnaustad",
    name: "ApnaUstad",
    role: "Solo Full-Stack Developer",
    summary: "On-demand home services marketplace connecting customers with local service pros, built completely from scratch.",
    problem:
      "Customers needed an easy way to book local service pros (plumbers, electricians), track them in real time, and pay securely, while workers needed an app to manage jobs and view earnings.",
    solution:
      "I designed and built the entire system: a single React Native mobile app with two modes (Customer & Worker), a Node.js/PostgreSQL backend API, live GPS tracking with Socket.IO, and a web admin dashboard for managing bookings and payouts.",
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
      "One mobile app supporting both customers and service pros",
      "Live GPS tracking to see worker location in real time",
      "Web admin dashboard for managing bookings and revenue",
      "Secure passwordless login with email OTP and tokens",
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
    status: "Live Project · Built Solo",
    interactive: "booking",
    category: "fullstack",
    liveUrl: "https://apnaustad.pk",
  },
  {
    slug: "ayy",
    name: "Ayy Ride",
    role: "Lead Mobile Developer · Repla Technologies",
    summary: "Ride-hailing app for passengers and drivers with real-time map navigation and instant ride booking.",
    problem:
      "Standard map options were sluggish at showing moving cars smoothly, calculating custom route fares, and keeping drivers and riders updated in real time.",
    solution:
      "Integrated Mapbox maps with live car tracking over Socket.IO, creating smooth car movement along roads, automated driver dispatch, and secure credit/debit card payments via Stripe.",
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
      "Separate passenger and driver mobile apps with interactive maps",
      "Smooth moving car animation that turns naturally along streets",
      "In-app credit and debit card payments powered by Stripe",
      "Battery-optimized background GPS tracking for drivers",
    ],
    images: [
      { src: "/portfolio/Ayy.png", alt: "Ayy Sign-in & Authentication", width: 221, height: 477, label: "Onboarding" },
      { src: "/portfolio/Ayy2.png", alt: "Ayy Vehicle Selection & Fare", width: 149, height: 323, label: "Ride Select" },
      { src: "/portfolio/Ayy3.png", alt: "Ayy Live Map Route", width: 150, height: 327, label: "Mapbox Route" },
      { src: "/portfolio/Ayy4.png", alt: "Ayy Driver Incoming Offer", width: 215, height: 456, label: "Driver Offer" },
    ],
    featured: true,
    accent: "cyan",
    status: "Production App · Ride Hailing",
    category: "mobile",
  },
  {
    slug: "duplex",
    name: "Duplex TV",
    role: "Smart TV Engineer · Repla Technologies",
    summary: "High-performance Smart TV video streaming app built for Roku, Android TV, Samsung Tizen, and LG webOS.",
    problem:
      "Smart TVs have very limited memory and slow processors compared to smartphones. Delivering fast, buffer-free HD video playback with responsive remote control navigation was a major challenge.",
    solution:
      "Engineered dedicated TV apps optimized for every TV platform: a native Roku channel using BrightScript, web apps for Samsung/LG TVs, and an Android TV engine. Included fast stream loading, multi-language audio, and intuitive remote control (D-pad) navigation.",
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
      "Runs smoothly across Roku, Android TV, Samsung, and LG TVs",
      "Native Roku channel with instant remote control response",
      "Fast HD video playback with automatic quality adjustment",
      "Clean TV interface designed for remotes from the couch",
    ],
    images: [
      { src: "/portfolio/Duplex_Live_TV.png", alt: "Duplex Smart TV Live Guide & EPG", width: 908, height: 634, label: "Live TV Guide" },
      { src: "/portfolio/Duplex_Movies_TV.png", alt: "Duplex Smart TV Movies & Series Hub", width: 782, height: 800, label: "Movies & VoD" },
      { src: "/portfolio/Duplex.png", alt: "Duplex Live Channel Bar", width: 158, height: 163, label: "Channel EPG Bar" },
      { src: "/portfolio/Duplex3.png", alt: "Duplex Video Player Detail", width: 154, height: 180, label: "Player Detail" },
    ],
    featured: true,
    accent: "ios",
    status: "Production App · All TV Platforms",
    deviceType: "tv",
    category: "tv",
    interactive: "tracks",
  },
  {
    slug: "hamdania",
    name: "Mashrab-e-Hamdania",
    role: "Mobile Developer · Google Play 5.0 ★",
    summary: "Spiritual companion and audio streaming app, rated 5.0 stars on Google Play with over 1,500 searchable texts.",
    problem:
      "Community members needed a dependable app to read sacred texts, listen to recitations, and quickly search through thousands of titles without needing an internet connection.",
    solution:
      "Built a fast React Native mobile app with offline-first search across 1,586 titles, background audio playback with lock-screen controls, and prayer notifications. Shipped to Google Play Store with a 100% 5-star rating.",
    tags: ["React Native", "Expo", "Search Index", "Google Play", "Audio Streaming"],
    highlights: [
      "Live on Google Play with a 5.0-star rating",
      "Fast offline search across 1,586 titles without internet",
      "Audio player keeps playing even when the phone screen is locked",
      "Daily prayer notifications, bookmarks, and recitation audio",
    ],
    images: [
      { src: "/portfolio/Hamdaniya.png", alt: "Hamdaniya Splash & Calligraphy", width: 472, height: 1056, label: "Opening" },
      { src: "/portfolio/Hamdaniya2.png", alt: "Hamdaniya Home Navigation Grid", width: 478, height: 1048, label: "Home Grid" },
      { src: "/portfolio/Hamdaniya3.png", alt: "Hamdaniya Library Search", width: 472, height: 1042, label: "Search Index" },
    ],
    featured: true,
    accent: "emerald",
    status: "Live on Google Play · 5.0 ★",
    category: "mobile",
    storeUrl: "https://play.google.com/store/apps/details?id=com.hamdania.app",
  },
  {
    slug: "vena",
    name: "Vena AI",
    role: "Mobile Developer · Healthcare",
    summary: "Healthcare assistant app that helps patients check symptoms and find nearby clinics.",
    problem:
      "Patients needed a simple, comfortable way to describe their symptoms in everyday Arabic and find qualified doctors and clinics nearby.",
    solution:
      "Built an AI-guided consultation chat combined with map-based clinic discovery, transparent service pricing, and direct appointment booking.",
    tags: ["React Native", "AI Care Chat", "Clinic Discovery", "Geo-Location"],
    highlights: [
      "Friendly AI chat assistant guiding patients through their symptoms",
      "Finds nearby clinics with transparent pricing and doctor profiles",
      "Direct appointment booking with patient reviews",
    ],
    images: [
      { src: "/portfolio/vena.png", alt: "Vena AI Onboarding & Triage", width: 259, height: 566, label: "AI Consultation" },
      { src: "/portfolio/vena2.png", alt: "Vena Clinic Discovery", width: 208, height: 443, label: "Nearby Clinics" },
      { src: "/portfolio/vena3.png", alt: "Vena Clinic Reviews & Ratings", width: 209, height: 450, label: "Doctor Profile" },
    ],
    featured: false,
    accent: "ios",
    status: "AI Healthcare",
    category: "mobile",
  },
  {
    slug: "qbox",
    name: "QBox Smart Locker",
    role: "Mobile Developer · IoT & Logistics",
    summary: "Contactless smart locker app for dropping off and picking up parcels using QR codes.",
    problem:
      "Delivering packages securely required an instant way to unlock locker doors without keys, while keeping delivery drivers, building managers, and residents organized.",
    solution:
      "Built a React Native app with a fast QR code scanner, OTP verification, and distinct modes for couriers, property managers, and apartment residents.",
    tags: ["React Native", "Zustand", "IoT Scanner", "Role-Based Access"],
    highlights: [
      "Scan a QR code to unlock the locker and drop off or pick up packages",
      "Separate simple views for couriers, managers, and residents",
      "Digital receipts and instant pickup notifications for residents",
    ],
    images: [
      { src: "/portfolio/Smart Locker.jpeg", alt: "QBox Locker Welcome Screen", width: 720, height: 1640, label: "Smart Locker" },
      { src: "/portfolio/Smart Locker2.jpeg", alt: "QBox Sign-in & Authentication", width: 720, height: 1640, label: "Secure Sign-in" },
    ],
    featured: false,
    accent: "cyan",
    status: "IoT & Logistics",
    category: "mobile",
  },
];
