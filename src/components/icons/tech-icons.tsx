import React from "react";

export function TechIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  // React / React Native
  if (norm.includes("react") && !norm.includes("navigation")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" stroke="#06b6d4" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" stroke="#06b6d4" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" stroke="#06b6d4" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="#06b6d4" />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes("typescript")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="#3178c6" />
        <path d="M11 8H5v2.5h2v7.5h3V10.5h2V8zm7 4.2c-.8-.5-1.5-.7-2.3-.7-1 0-1.6.4-1.6 1.1 0 .7.6 1 1.7 1.4 1.8.6 2.8 1.4 2.8 2.8 0 1.9-1.5 3-3.7 3-1.4 0-2.5-.4-3.3-1l.7-2.3c.8.6 1.7.9 2.6.9 1 0 1.5-.4 1.5-1 0-.6-.5-.9-1.6-1.3-1.8-.7-2.8-1.5-2.8-2.9 0-1.8 1.4-2.8 3.5-2.8 1.2 0 2.2.3 3 .7l-.8 2.2z" fill="#ffffff" />
      </svg>
    );
  }

  // Expo / EAS
  if (norm.includes("expo") || norm.includes("eas")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5 19h19l-9.5-16L2.5 19zm9.5-12.8L17.2 16H6.8L12 6.2z" fill="#ffffff" />
      </svg>
    );
  }

  // Mapbox
  if (norm.includes("mapbox")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.8" />
        <circle cx="12" cy="9" r="2.5" fill="#3b82f6" />
      </svg>
    );
  }

  // Stripe
  if (norm.includes("stripe")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="#635bff" />
        <path d="M13.5 10.6c-1.2-.4-1.6-.7-1.6-1.2 0-.6.5-.9 1.4-.9 1.1 0 2.2.4 3 .9l.7-2.2c-.9-.4-2.2-.7-3.7-.7-3.1 0-5.1 1.6-5.1 4.1 0 3.3 4.5 2.8 4.5 4.3 0 .7-.6 1-1.6 1-1.3 0-2.8-.5-3.8-1.2l-.7 2.3c1 .5 2.7.9 4.4.9 3.3 0 5.4-1.6 5.4-4.2.1-3.4-4.5-2.9-4.5-4.5z" fill="#ffffff" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes("postgres")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 3c-4.5 0-8 3-8 7.5 0 3.5 2.2 6.5 5.5 7.5v3h5v-3c3.3-1 5.5-4 5.5-7.5C20 6 16.5 3 12 3z" stroke="#336791" strokeWidth="1.8" fill="#336791" fillOpacity="0.15" />
        <circle cx="9.5" cy="9.5" r="1.2" fill="#336791" />
        <circle cx="14.5" cy="9.5" r="1.2" fill="#336791" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l8.5 4.9v9.8L12 21.6l-8.5-4.9V6.9L12 2zm0 2.3L5.5 8.1v7.9L12 19.7l6.5-3.7V8.1L12 4.3z" fill="#22c55e" />
        <circle cx="12" cy="12" r="3" fill="#22c55e" />
      </svg>
    );
  }

  // Redis
  if (norm.includes("redis")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1.8" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ef4444" strokeWidth="1.8" />
      </svg>
    );
  }

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M9 7.5h2v9H9v-9zm7.5 9l-5.5-8h-1.5v9h1.8V11l4.8 7h1.4v-9h-1.8v8z" fill="#ffffff" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 6c-3 0-4.5 1.5-4.5 4.5 0 2.5 1.5 3.5 3 3.5s2.5 1 2.5 2.5c0 1.5-1 2.5-3 2.5-2 0-3-.5-4-1.5M19 6c-3 0-4.5 1.5-4.5 4.5 0 2.5 1.5 3.5 3 3.5s2.5 1 2.5 2.5c0 1.5-1 2.5-3 2.5-2 0-3-.5-4-1.5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // OpenAI / AI
  if (norm.includes("openai") || norm.includes("langchain") || norm.includes("langgraph") || norm.includes("ai")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-1v1a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-1H6a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4h1V6a4 4 0 0 1 4-4h2z" stroke="#10b981" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.5" fill="#10b981" />
      </svg>
    );
  }

  // HLS / Video / Media
  if (norm.includes("hls") || norm.includes("video")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="2" y="4" width="20" height="15" rx="3" stroke="#a855f7" strokeWidth="1.8" />
        <polygon points="10,8 16,11.5 10,15" fill="#a855f7" />
        <line x1="6" y1="21" x2="18" y2="21" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Git
  if (norm.includes("git")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="6" cy="6" r="2.5" fill="#f97316" />
        <circle cx="6" cy="18" r="2.5" fill="#f97316" />
        <circle cx="18" cy="9" r="2.5" fill="#f97316" />
        <path d="M6 8.5v7M8.5 7l7 2" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Xcode / Apple
  if (norm.includes("xcode")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-8.4 8.4-1.6-1.6a1 1 0 0 0-1.4 0l-1.6 1.6a1 1 0 0 0 0 1.4l3.7 3.7a1 1 0 0 0 1.4 0l1.6-1.6a1 1 0 0 0 0-1.4l-1.6-1.6 8.4-8.4 1.6 1.6a1 1 0 0 0 1.4 0l1.6-1.6a1 1 0 0 0 0-1.4l-3.7-3.7a1 1 0 0 0-1.4 0l-1.6 1.6z" stroke="#0ea5e9" strokeWidth="1.8" fill="#0ea5e9" fillOpacity="0.2" />
      </svg>
    );
  }

  // Android Studio
  if (norm.includes("android")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.62 1.23 12.83 1 12 1s-1.62.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.72 3.4 5.5 5.56 5.5 8h13c0-2.44-1.22-4.6-2.97-5.84zM9 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#34d399" />
      </svg>
    );
  }

  // MMKV / Storage / Key-Value
  if (norm.includes("mmkv") || norm.includes("secure") || norm.includes("storage")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  // Socket.IO / Realtime
  if (norm.includes("socket") || norm.includes("push") || norm.includes("twilio")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" stroke="#06b6d4" strokeWidth="1.8" />
        <path d="M12 6v6l4 2" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Reanimated / Animation / Zustand / Redux
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 3v18M3 12h18M6.5 6.5l11 11M6.5 17.5l11-11" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
