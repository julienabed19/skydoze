import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe → site notifications. The signature is verified before anything is read,
 * so a forged request can't fake a paid order. Handlers here only log IDs (no
 * personal data) and are safe to receive more than once; orders are fulfilled
 * from the Stripe Dashboard.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const body = await req.text();
  if (body.length > 512_000) return NextResponse.json({ error: "Too large" }, { status: 413 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === "paid") {
        console.info("order_paid", {
          event: event.id,
          session: session.id,
          quantity: session.metadata?.quantity,
          termsAccepted: session.consent?.terms_of_service === "accepted",
        });
      }
      break;
    }
    case "charge.dispute.created":
      console.warn("dispute_opened", { event: event.id });
      break;
    default:
      break;
  }
  return NextResponse.json({ received: true });
}
