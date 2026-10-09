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
};

export const projects: Project[] = [
  {
    slug: "apnaustad",
    name: "ApnaUstad",
    role: "Solo full-stack architect",
    summary: "Home services marketplace, designed and shipped alone.",
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
      "Dual-role navigation in one codebase",
      "OTP on a custom domain via Resend, JWT in expo-secure-store",
      "Live worker GPS over Socket.IO during active jobs",
    ],
    images: [
      { src: "/work/apnaustad-home.jpg", alt: "ApnaUstad client home", width: 449, height: 1024, label: "Client" },
      { src: "/work/apnaustad-profile.jpg", alt: "ApnaUstad profile", width: 449, height: 1024, label: "Profile" },
      { src: "/work/apnaustad-activity.jpg", alt: "ApnaUstad activity", width: 449, height: 1024, label: "Activity" },
      { src: "/work/apnaustad-client.png", alt: "ApnaUstad client journey", width: 1024, height: 572, label: "Clients" },
      { src: "/work/apnaustad-worker.png", alt: "ApnaUstad worker app", width: 1024, height: 586, label: "Workers" },
      { src: "/work/apnaustad-web.png", alt: "ApnaUstad website", width: 1024, height: 596, label: "Site" },
    ],
    featured: true,
    accent: "cyan",
    interactive: "booking",
  },
  {
    slug: "ayy",
    name: "Ayy Ride",
    role: "Repla Technologies · ride-hailing",
    summary: "Passenger and driver marketplace with live proximity matching.",
    problem:
      "Google Maps could not carry the routing, tracking, and fare experience the marketplace needed once both sides of the trip were live.",
    solution:
      "Migrated maps to Mapbox with real-time polylines and fare updates. Driver locations sync over Socket.IO. Riders pay in the app through Stripe PaymentSheet, and Expo Push covers requests, status, and promotions.",
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
      "Dual-sided passenger and driver apps",
      "Sub-second driver location sync",
      "Stripe PaymentIntent and PaymentSheet",
    ],
    images: [
      { src: "/work/ayy-splash.png", alt: "Ayy sign-in screen", width: 221, height: 477, label: "Splash" },
      { src: "/work/ayy-home.png", alt: "Ayy home with ride types", width: 149, height: 323, label: "Home" },
      { src: "/work/ayy-map.png", alt: "Ayy map and vehicle choice", width: 150, height: 327, label: "Route" },
      { src: "/work/ayy-offer.png", alt: "Ayy incoming ride offer", width: 215, height: 456, label: "Offer" },
      { src: "/work/ayy.png", alt: "AYY user, driver, and admin screens", width: 1024, height: 452, label: "Suite" },
    ],
    featured: true,
    accent: "ios",
  },
  {
    slug: "duplex",
    name: "Duplex",
    role: "Repla Technologies · IPTV",
    summary: "HLS player for live television and on-demand movies.",
    problem:
      "Streams did not always arrive as .m3u8 URLs, and the player still had to switch audio, subtitles, and cache artwork without dropping frames.",
    solution:
      "expo-video on SDK 52+ plays streams with contentType set to hls. useEvent drives audio and subtitle tracks. Artwork and files cache through MMKV and expo-file-system. Devices register with a pseudo-MAC from ANDROID_ID and the iOS Keychain.",
    tags: ["React Native", "expo-video", "HLS", "MMKV", "expo-file-system"],
    highlights: [
      "Explicit HLS content type for non-.m3u8 URLs",
      "Multi-language audio and subtitle tracks",
      "Device binding for registration",
    ],
    images: [
      { src: "/work/duplex-movies.png", alt: "Duplex movies home", width: 782, height: 800, label: "Movies" },
      { src: "/work/duplex-live.png", alt: "Duplex live TV guide", width: 908, height: 634, label: "Live" },
      { src: "/work/duplex-channels.png", alt: "Duplex live channel row", width: 158, height: 163, label: "Channels" },
      { src: "/work/duplex-detail.png", alt: "Duplex title detail", width: 154, height: 180, label: "Title" },
      { src: "/work/duplex-banner.png", alt: "Duplex featured title", width: 76, height: 105, label: "Featured" },
    ],
    featured: true,
    accent: "emerald",
    interactive: "tracks",
  },
  {
    slug: "hamdania",
    name: "Hamdania",
    role: "Major contributor · Islamic guide",
    summary:
      "Spiritual companion for the Noorbakshia and Hamdania communities, especially in Baltistan and Kashmir.",
    problem:
      "Daily practice, fiqh, and a large library of teachings needed a calm mobile home that still works as a reference, not only a reader.",
    solution:
      "A React Native guide with Quran, fiqh, dawat, aurad, tasbeeh, bayaz, prayers, and religious books. Search covers more than 1,500 titles. The release on Google Play is rated 5.0 from the first reviews, version 1.0.2.",
    tags: ["React Native", "Expo", "Search", "Google Play"],
    highlights: [
      "Live on Google Play",
      "Eight practice areas on the home grid",
      "Library search with 1,586 titles in view",
    ],
    images: [
      { src: "/work/hamdania-splash.png", alt: "Hamdania splash screen", width: 456, height: 1024, label: "Splash" },
      { src: "/work/hamdania-home.png", alt: "Hamdania home grid", width: 461, height: 1024, label: "Home" },
      { src: "/work/hamdania-search.png", alt: "Hamdania search results", width: 480, height: 1024, label: "Search" },
      { src: "/work/hamdania-store.png", alt: "Hamdania on Google Play", width: 1024, height: 576, label: "Play Store" },
    ],
    featured: true,
    accent: "emerald",
    status: "Live on Google Play · 5.0 · v1.0.2",
  },
  {
    slug: "vena",
    name: "Vena AI",
    role: "Healthcare product",
    summary: "Clinic discovery and an AI care chat, shown for Makkah.",
    problem:
      "People looking for nearby care need the clinic, the service, and a first explanation without digging through separate tools.",
    solution:
      "The product pairs a location-aware clinic list with service menus and a Vena AI chat. Clinic pages show distance, ratings, and priced services. The assistant entry calls out Saudi dialect and photo guidance.",
    tags: ["React Native", "AI assistant", "Clinic search"],
    highlights: [
      "Recommended clinics and nearby results",
      "Service catalog with duration and price",
      "AI chat as the front door",
    ],
    images: [
      { src: "/work/vena-onboarding.png", alt: "Vena onboarding", width: 259, height: 566, label: "Start" },
      { src: "/work/vena-clinics.png", alt: "Vena recommended clinics", width: 208, height: 443, label: "Clinics" },
      { src: "/work/vena-reviews.png", alt: "Vena clinic reviews", width: 457, height: 1024, label: "Reviews" },
      { src: "/work/vena.png", alt: "Vena AI clinic search, chat, and clinic detail", width: 1024, height: 616, label: "Product" },
    ],
    featured: false,
    accent: "ios",
  },
  {
    slug: "telehealth",
    name: "Telehealth",
    role: "Repla Technologies · virtual care",
    summary: "Video visits, clinical chat, and appointment scheduling.",
    problem:
      "Patients and clinicians needed a private visit, a message thread, and a calendar that stayed in sync after the call ended.",
    solution:
      "Twilio Video and Chat carry the visit and media messages. Firebase Phone Auth starts the OTP flow. Appointments and reminders sit on the clinic calendar. Sessions and clinical secrets use expo-secure-store.",
    tags: [
      "React Native",
      "Twilio",
      "Firebase Auth",
      "Redux Toolkit",
      "expo-secure-store",
    ],
    highlights: [
      "Video and chat in one care flow",
      "Phone OTP and JWT sessions",
      "Secure storage for clinical data",
    ],
    images: [],
    mock: "telehealth",
    featured: false,
    accent: "cyan",
  },
  {
    slug: "qbox",
    name: "QBox",
    role: "Repla Technologies · smart lockers",
    summary: "Secure locker drop-offs, with phone or email sign-in.",
    problem:
      "A delivery needs a locked handoff. Owners, managers, and tenants still should only see the properties and tickets that belong to them.",
    solution:
      "The app opens on the QBox locker, then signs in by phone number or email. Zustand isolates role state, and REST feeds properties, service requests, maintenance tickets, and dashboards.",
    tags: ["React Native", "Zustand", "REST", "Role-based access"],
    highlights: [
      "Locker drop-off on the welcome screen",
      "Phone or email sign-in",
      "Owners, managers, and tenants",
    ],
    images: [
      { src: "/work/qbox-welcome.jpg", alt: "QBox locker welcome screen", width: 449, height: 1024, label: "Locker" },
      { src: "/work/qbox-signin.jpg", alt: "QBox sign-in with phone or email", width: 449, height: 1024, label: "Sign in" },
    ],
    featured: false,
    accent: "ios",
  },
  {
    slug: "homeserve",
    name: "HomeServe",
    role: "Repla Technologies · home services",
    summary: "Production home-services marketplace shipped with the Repla suite.",
    problem:
      "The company needed a second home-services product in market, separate from the solo ApnaUstad platform.",
    solution:
      "Shipped as one of five production React Native apps at Repla, next to ride-hailing, virtual care, IPTV, and property management.",
    tags: ["React Native", "Expo", "Production release"],
    highlights: ["Shipped at Repla Technologies", "Cross-platform home services"],
    images: [],
    mock: "homeserve",
    featured: false,
    accent: "emerald",
  },
];
