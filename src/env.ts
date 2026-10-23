/**
 * Validated environment variables.
 *
 * `publicEnv` holds `NEXT_PUBLIC_*` values — inlined into the client bundle,
 * safe in the browser. `getServerEnv()` holds server-only values (secrets) —
 * never read it from client code; on the client those values are `undefined`.
 *
 * A missing/invalid variable fails fast with a clear zod error rather than
 * surfacing as a confusing runtime bug later.
 */

import { z } from "zod";

/**
 * Treat an empty env var as unset.
 *
 * `cp .env.example .env` leaves declared-but-blank keys (`CONTACT_ENDPOINT=`),
 * which reach us as `""` — and `""` is not `undefined`, so an `.optional()`
 * schema would reject it as "Invalid URL". Without this, the documented setup
 * flow would break every optional variable the moment someone copied the
 * example file.
 */
const optionalUrl = () =>
  z.preprocess((v) => (v === "" ? undefined : v), z.url().optional());

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl(),
});

/** An optional string, empty treated as unset (same reason as `optionalUrl`). */
const optionalString = () =>
  z.preprocess((v) => (v === "" ? undefined : v), z.string().optional());

const serverSchema = z.object({
  /** Resend API key for sending emails directly to your inbox. */
  RESEND_API_KEY: optionalString(),
  /** Destination email to receive contact notifications (defaults to sardar22balti@gmail.com or site.email). */
  CONTACT_NOTIFICATION_EMAIL: optionalString(),
  /** Verified sender email on Resend (e.g. contact@sardarhussain.me). Defaults to onboarding@resend.dev */
  RESEND_FROM_EMAIL: optionalString(),
  /** Optional upstream the contact endpoint forwards leads to (CRM / webhook). */
  CONTACT_ENDPOINT: optionalUrl(),
  /**
   * Vercel's production domain (a system variable, set at build time, no
   * scheme). The site's origin falls back to it when `NEXT_PUBLIC_SITE_URL` is
   * unset — see `src/lib/site.ts`.
   */
  VERCEL_PROJECT_PRODUCTION_URL: optionalString(),
  /** `production` | `preview` | `development` on Vercel builds (system variable). */
  VERCEL_ENV: optionalString(),
});

/** Public env — safe to read anywhere (server or client). */
export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

let cachedServerEnv: z.infer<typeof serverSchema> | undefined;

/**
 * Server-only env. Call from route handlers / server code only — parsed
 * lazily so the client bundle never evaluates it.
 */
export function getServerEnv() {
  cachedServerEnv ??= serverSchema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    CONTACT_ENDPOINT: process.env.CONTACT_ENDPOINT,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
  });
  return cachedServerEnv;
}
