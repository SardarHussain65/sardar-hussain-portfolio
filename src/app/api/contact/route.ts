import { z } from "zod";

import { site } from "@/data/site";
import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required"),
  message: z.string().trim().min(1, "Message is required").max(3000),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

    const safeName = escapeHtml(input.name);
    const safeEmail = escapeHtml(input.email);
    const safeMessage = escapeHtml(input.message);
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry from ${safeName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #030712; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #0c1322; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
          <!-- Top Accent Gradient Line -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%);"></td>
          </tr>
          
          <!-- Card Header -->
          <tr>
            <td style="padding: 32px 32px 20px 32px;">
              <div style="display: inline-block; padding: 4px 10px; border-radius: 6px; background-color: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.25); font-family: monospace; font-size: 11px; font-weight: 600; color: #34d399; letter-spacing: 1px; text-transform: uppercase;">
                [ DIRECT INQUIRY ]
              </div>
              <h1 style="margin: 16px 0 6px 0; font-size: 22px; font-weight: 500; color: #ffffff; letter-spacing: -0.02em; line-height: 1.3;">
                New message from <span style="color: #34d399;">${safeName}</span>
              </h1>
              <p style="margin: 0; font-size: 13px; color: #94a3b8; font-weight: 300;">
                Received via portfolio contact form &bull; ${timestamp}
              </p>
            </td>
          </tr>

          <!-- Sender Details Grid -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 14px 16px;">
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="display: block; font-family: monospace; font-size: 10px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Sender Name</span>
                    <span style="font-size: 14px; color: #f1f5f9; font-weight: 500;">${safeName}</span>
                  </td>
                  <td style="padding: 6px 0; text-align: right;">
                    <span style="display: block; font-family: monospace; font-size: 10px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Sender Email</span>
                    <a href="mailto:${safeEmail}" style="font-size: 14px; color: #34d399; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Box -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <span style="display: block; font-family: monospace; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin-bottom: 8px;">
                Project Details:
              </span>
              <div style="background-color: #060913; border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #10b981; border-radius: 10px; padding: 18px 20px; font-size: 14.5px; line-height: 1.65; color: #e2e8f0; white-space: pre-wrap;">${safeMessage}</div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 9999px; background-color: #ffffff;">
                    <a href="mailto:${safeEmail}?subject=Re:%20Inquiry%20via%20Portfolio" target="_blank" style="display: inline-block; padding: 12px 26px; font-size: 13px; font-weight: 600; color: #020617; text-decoration: none; border-radius: 9999px;">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid rgba(255, 255, 255, 0.06); background-color: rgba(0, 0, 0, 0.25);">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 11px; color: #64748b; line-height: 1.5;">
                    Sent securely from <a href="https://sardarhussain.me" style="color: #94a3b8; text-decoration: underline;">sardarhussain.me</a><br>
                    React Native & Mobile App Engineer
                  </td>
                  <td align="right" style="font-size: 11px; color: #475569; font-family: monospace;">
                    [ PORTFOLIO LEAD ]
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

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
        html: emailHtml,
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
