/** Server-trusted pricing. The browser only ever sends a quantity; it never sends a price. */
export const UNIT_PRICE_CENTS = 3499;
export const CURRENCY = "usd";
export const BUNDLES = [1, 2, 3] as const;
export type BundleQty = (typeof BUNDLES)[number];

export function isBundleQty(value: unknown): value is BundleQty {
  return typeof value === "number" && (BUNDLES as readonly number[]).includes(value);
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function bundleTotalCents(qty: BundleQty) {
  return UNIT_PRICE_CENTS * qty;
}
