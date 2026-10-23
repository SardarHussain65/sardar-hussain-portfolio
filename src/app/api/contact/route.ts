import { z } from "zod";

import { site } from "@/data/site";
import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required"),
  message: z.string().trim().min(1, "Message is required").max(3000),
});

export const POST = handle(async (req) => {
  const input = contactSchema.parse(await req.json());

  const {
    RESEND_API_KEY,
    CONTACT_NOTIFICATION_EMAIL,
    RESEND_FROM_EMAIL,
    CONTACT_ENDPOINT,
  } = getServerEnv();

  // 1. Deliver directly to email via Resend if configured
  if (RESEND_API_KEY) {
    const toEmail = CONTACT_NOTIFICATION_EMAIL || site.email || "sardar.dev.pk@gmail.com";
    const fromSender =
      RESEND_FROM_EMAIL || "Portfolio Contact <contact@sardarhussain.me>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromSender,
        to: [toEmail],
        reply_to: input.email,
        subject: `New Inquiry from ${input.name} (Portfolio)`,
        text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff; color: #18181b;">
            <h2 style="margin-top: 0; font-size: 18px; font-weight: 600; color: #09090b; border-bottom: 1px solid #f4f4f5; padding-bottom: 12px;">New Portfolio Contact Message</h2>
            <div style="margin: 16px 0;">
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #52525b;"><strong>From:</strong> ${input.name}</p>
              <p style="margin: 0; font-size: 14px; color: #52525b;"><strong>Email:</strong> <a href="mailto:${input.email}" style="color: #10b981; text-decoration: underline;">${input.email}</a></p>
            </div>
            <div style="margin-top: 16px; padding: 14px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1e293b;">
${input.message}
            </div>
            <p style="margin-top: 24px; font-size: 11px; color: #a1a1aa; border-top: 1px solid #f4f4f5; padding-top: 12px;">
              Sent from your portfolio website contact form. Hitting "Reply" will email ${input.name} (${input.email}) directly.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorJson = (await res.json().catch(() => null)) as { message?: string } | null;
      console.error("[api/contact] Resend API error:", errorJson);
      throw new ApiError(502, "upstream_error", errorJson?.message || "Failed to deliver email through Resend.");
    }

    return { received: true };
  }

  // 2. Deliver via webhook endpoint if configured
  if (CONTACT_ENDPOINT) {
    const upstream = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "Failed to deliver the message to webhook.");
    }
    return { received: true };
  }

  // 3. Fallback when neither is configured yet
  console.warn(
    "[api/contact] Submission received but RESEND_API_KEY is not configured yet. Payload:",
    input
  );
  throw new ApiError(
    503,
    "missing_config",
    "Email service is not yet configured. Please set RESEND_API_KEY in your environment variables to receive messages directly in your inbox."
  );
});
