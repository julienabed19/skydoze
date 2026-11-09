/**
 * Single source of truth for business facts shown across the site and legal pages.
 *
 * Anything starting with "TODO_" is NOT filled in yet. `npm run prelaunch` fails
 * until every TODO_ value is replaced, so the store can't go live with blanks in
 * its legal pages.
 */
export const BUSINESS = {
  brand: "SkyDoze",
  productName: "SkyDoze Blanket Wrap",
  /**
   * Optional. Leave "" to keep them off the site (owner's choice, Nov 2026).
   * If you form an LLC or get a virtual mailbox later, fill these in and they'll appear in
   * the footer, Contact, Terms and Privacy pages automatically. California B&P Code 17538(d)
   * asks online sellers to disclose a legal name + street address to CA buyers — see AUDIT.md.
   */
  legalName: "",
  address: "",
  /** US state whose law governs the Terms, e.g. "Florida". */
  governingState: "Pennsylvania",
  /**
   * Country-of-origin line the FTC Textile Act requires on online listings:
   * "Imported" (made outside the US — most likely if you source from a supplier),
   * "Made in USA", or "Made in USA of imported fabric". Never guess.
   */
  productOrigin: "Imported",
  supportEmail: "skydoze@veryeo.com",
  poweredBy: { label: "veryeo.com", href: "https://veryeo.com" },
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://skydoze.vercel.app").replace(/\/$/, ""),
  /** Date the legal pages were last updated. Change it whenever you edit them. */
  policiesUpdated: "November 9, 2026",
} as const;

export const SHIPPING = {
  countries: ["US"] as const,
  regionLabel: "the United States",
  minBusinessDays: 7,
  maxBusinessDays: 15,
} as const;

export const REFUNDS = {
  /** Days after delivery to report damage, defects or a wrong item. */
  damageReportDays: 14,
  /** Days after the END of the delivery window before an order counts as lost. */
  lostAfterDays: 30,
} as const;

/** Product facts. Leave a value empty ("") to hide that row rather than guess. */
export const PRODUCT_SPECS: { label: string; value: string }[] = [
  { label: "In the box", value: "Head support, sleep mask, arm wrap and carry pouch" },
  { label: "Color", value: "Black" },
  { label: "Material", value: "" },
  { label: "Size", value: "" },
  { label: "Care", value: "" },
];

export const IN_THE_BOX = [
  { name: "Head support", text: "Buckles around your seat's headrest with an adjustable strap." },
  { name: "Sleep mask", text: "Contoured mask that sits over your eyes to cut down on light." },
  { name: "Arm wrap", text: "Soft wrap that hangs over the support so you can tuck your arms in." },
  { name: "Carry pouch", text: "Everything packs into one zip pouch for your bag." },
] as const;

export function isTodo(value: string) {
  return value.startsWith("TODO_");
}

/** Renders a TODO_ value as a visible placeholder instead of leaking the raw key. */
export function show(value: string, label: string) {
  return isTodo(value) ? `[${label} — add before launch]` : value;
}
