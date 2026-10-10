export const roles = [
  {
    id: "repla",
    org: "Repla Technologies",
    title: "React Native Developer",
    place: "Rawalpindi",
    dates: "Aug 2024 — Present",
    points: [
      "Shipped five production apps: Ayy, Telehealth, QBox, Duplex, and HomeServe.",
      "Replaced Google Maps with Mapbox on Ayy — live polylines, driver tracking, and Socket.IO fare updates.",
      "Integrated Stripe PaymentSheet and end-to-end Expo Push with tokens stored in PostgreSQL.",
      "Shipped EAS builds and fixed ProGuard / R8 crashes on Expo module classes.",
    ],
  },
  {
    id: "apnaustad",
    org: "ApnaUstad",
    title: "Solo Full-Stack Architect",
    place: "Independent",
    dates: "2024 — Present",
    points: [
      "Designed the React Native client and worker app, Node.js API, PostgreSQL schema, and React admin alone.",
      "Modeled bookings as pending, accepted, in-progress, and completed, with matching and earnings on the server.",
      "OTP through Resend on a custom domain, JWT sessions in expo-secure-store, and Socket.IO job tracking.",
    ],
  },
  {
    id: "hamdania",
    org: "Hamdania",
    title: "Major contributor",
    place: "Live on Google Play",
    dates: "v1.0.2",
    points: [
      "Islamic guide and spiritual companion for Noorbakshia and Hamdania communities, especially in Baltistan and Kashmir.",
      "Quran, fiqh, aurad, tasbeeh, prayers, and a searchable library of more than a thousand titles.",
    ],
  },
  {
    id: "techsolab",
    org: "Techsolab",
    title: "Software Developer",
    place: "Rawalpindi",
    dates: "Aug 2024 — Present",
    points: [
      "Built cross-platform React Native apps and Firebase authentication architectures.",
    ],
  },
  {
    id: "vu",
    org: "Virtual University",
    title: "B.S. Computer Science",
    place: "Rawalpindi",
    dates: "Mar 2024 — Present",
    points: ["Degree in progress, in parallel with production mobile work."],
  },
] as const;

export const credentials = [
  "ICS · UPS College · 2023 · 76.8%",
  "Matric, General Science · UPS College · 2021 · 94%",
  "HTML, CSS & JavaScript · CODSOFT · 2024",
] as const;
