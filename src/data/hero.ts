import type { Shot } from "@/data/projects";

export type HeroSlide = {
  id: string;
  app: string;
  caption: string;
  frames: Shot[];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "apnaustad",
    app: "ApnaUstad",
    caption: "Client, worker, and the site. Every frame is the real artwork.",
    frames: [
      { src: "/work/apnaustad-home.jpg", alt: "ApnaUstad client home", width: 449, height: 1024, label: "Client" },
      { src: "/work/apnaustad-profile.jpg", alt: "ApnaUstad profile", width: 449, height: 1024, label: "Profile" },
      { src: "/work/apnaustad-worker.png", alt: "ApnaUstad worker app", width: 1024, height: 586, label: "Workers" },
      { src: "/work/apnaustad-web.png", alt: "ApnaUstad website", width: 1024, height: 596, label: "Site" },
    ],
  },
  {
    id: "ayy",
    app: "Ayy Ride",
    caption: "Splash, home, live route, and the ride offer. Uncropped.",
    frames: [
      { src: "/work/ayy-splash.png", alt: "Ayy sign-in screen", width: 221, height: 477, label: "Splash" },
      { src: "/work/ayy-home.png", alt: "Ayy home with ride types", width: 149, height: 323, label: "Home" },
      { src: "/work/ayy-map.png", alt: "Ayy map and vehicle choice", width: 150, height: 327, label: "Route" },
      { src: "/work/ayy-offer.png", alt: "Ayy incoming ride offer", width: 215, height: 456, label: "Offer" },
      { src: "/work/ayy.png", alt: "AYY user, driver, and admin screens", width: 1024, height: 452, label: "Suite" },
    ],
  },
  {
    id: "duplex",
    app: "Duplex IPTV",
    caption: "Movies and live television, shown at the original pixels.",
    frames: [
      { src: "/work/duplex-movies.png", alt: "Duplex movies home", width: 782, height: 800, label: "Movies" },
      { src: "/work/duplex-live.png", alt: "Duplex live TV guide", width: 908, height: 634, label: "Live" },
      { src: "/work/duplex-channels.png", alt: "Duplex live channel row", width: 158, height: 163, label: "Channels" },
      { src: "/work/duplex-detail.png", alt: "Duplex title detail", width: 154, height: 180, label: "Title" },
    ],
  },
  {
    id: "hamdania",
    app: "Hamdania",
    caption: "Live on Google Play. Splash, home, and the library search.",
    frames: [
      { src: "/work/hamdania-splash.png", alt: "Hamdania splash screen", width: 456, height: 1024, label: "Splash" },
      { src: "/work/hamdania-home.png", alt: "Hamdania home grid", width: 461, height: 1024, label: "Home" },
      { src: "/work/hamdania-search.png", alt: "Hamdania search results", width: 480, height: 1024, label: "Search" },
    ],
  },
  {
    id: "qbox",
    app: "QBox",
    caption: "The locker welcome and the sign-in screen, full frame.",
    frames: [
      { src: "/work/qbox-welcome.jpg", alt: "QBox locker welcome screen", width: 449, height: 1024, label: "Locker" },
      { src: "/work/qbox-signin.jpg", alt: "QBox sign-in", width: 449, height: 1024, label: "Sign in" },
    ],
  },
  {
    id: "vena",
    app: "Vena AI",
    caption: "Onboarding, clinics, and reviews from the care app.",
    frames: [
      { src: "/work/vena-onboarding.png", alt: "Vena onboarding", width: 259, height: 566, label: "Start" },
      { src: "/work/vena-clinics.png", alt: "Vena recommended clinics", width: 208, height: 443, label: "Clinics" },
      { src: "/work/vena-reviews.png", alt: "Vena clinic reviews", width: 457, height: 1024, label: "Reviews" },
    ],
  },
];
