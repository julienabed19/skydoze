import { NextResponse } from "next/server";
import { BUSINESS, SHIPPING } from "@/lib/business";
import { CURRENCY, UNIT_PRICE_CENTS, isBundleQty } from "@/lib/pricing";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const allowed = new Set([BUSINESS.siteUrl, new URL(req.url).origin]);
  return allowed.has(origin);
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);

  const limit = rateLimit(`checkout:${clientIp(req.headers)}`, 10, 60_000);
  if (!limit.ok) {
    return json({ error: "Too many attempts. Please wait a minute and try again." }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return json({ error: "Unsupported content type" }, 415);
  }

  let quantity: unknown;
  try {
    const text = await req.text();
    if (text.length > 200) return json({ error: "Request too large" }, 413);
    quantity = (JSON.parse(text) as { quantity?: unknown })?.quantity;
  } catch {
    return json({ error: "Invalid request" }, 400);
  }
  if (!isBundleQty(quantity)) return json({ error: "Please choose 1, 2 or 3 sets." }, 400);

  const stripe = getStripe();
  if (!stripe) {
    return json({ error: "Checkout isn't open yet. Please check back soon." }, 503);
  }

  const site = BUSINESS.siteUrl;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: CURRENCY,
            unit_amount: UNIT_PRICE_CENTS,
            product_data: {
              name: BUSINESS.productName,
              description: "3-in-1 travel sleep set: head support, sleep mask, arm wrap and carry pouch. Black.",
              images: [`${site}/products/set.jpg`],
            },
          },
        },
      ],
      shipping_address_collection: { allowed_countries: [...SHIPPING.countries] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Free shipping",
            fixed_amount: { amount: 0, currency: CURRENCY },
            delivery_estimate: {
              minimum: { unit: "business_day", value: SHIPPING.minBusinessDays },
              maximum: { unit: "business_day", value: SHIPPING.maxBusinessDays },
            },
          },
        },
      ],
      // Stripe shows a required, unchecked "I agree" box and records acceptance on the session.
      consent_collection: { terms_of_service: "required" },
      custom_text: {
        terms_of_service_acceptance: {
          message: `I agree to the [Terms of Service](${site}/terms) and understand that **all sales are final** — no returns or refunds for change of mind. Exceptions are listed in the [Refund Policy](${site}/refunds).`,
        },
        submit: {
          message: `Free shipping to the US. Estimated delivery: ${SHIPPING.minBusinessDays}–${SHIPPING.maxBusinessDays} business days.`,
        },
      },
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      allow_promotion_codes: false,
      metadata: { quantity: String(quantity), source: "skydoze-site" },
      success_url: `${site}/checkout/success`,
      cancel_url: `${site}/#buy`,
    });

    if (!session.url) return json({ error: "Could not start checkout." }, 502);
    return json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("checkout_session_create_failed", message);
    return json({ error: "Could not start checkout. Please try again." }, 502);
  }
}

export function GET() {
  return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
}
