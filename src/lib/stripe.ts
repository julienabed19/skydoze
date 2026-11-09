import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

/** Returns null until STRIPE_SECRET_KEY is set, so the site works (with checkout closed) before Stripe is connected. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!/^(sk|rk)_(test|live)_/.test(key)) {
    console.error("STRIPE_SECRET_KEY does not look like a Stripe secret or restricted key.");
    return null;
  }
  client ??= new Stripe(key, { maxNetworkRetries: 2, appInfo: { name: "SkyDoze storefront" } });
  return client;
}
