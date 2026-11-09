/**
 * Optional marketing/analytics trackers. They are OFF unless you set the env var.
 * Even when set, nothing loads until the visitor opts in, and a Global Privacy
 * Control / Do Not Track signal is treated as an opt-out.
 */
export type Tracker = {
  id: "meta" | "ga4";
  name: string;
  company: string;
  purpose: string;
  category: "advertising" | "analytics";
  /** Origins the Content-Security-Policy must allow when this tracker is on. */
  scriptOrigins: string[];
  connectOrigins: string[];
  imgOrigins: string[];
};

const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim() || "";

export const TRACKER_IDS = {
  meta: /^\d{5,20}$/.test(META_ID) ? META_ID : "",
  ga4: /^G-[A-Z0-9]{4,15}$/.test(GA4_ID) ? GA4_ID : "",
};

const ALL: (Tracker & { enabled: boolean })[] = [
  {
    id: "meta",
    name: "Meta Pixel",
    company: "Meta Platforms, Inc.",
    purpose:
      "Measures whether our Facebook and Instagram ads lead to visits and purchases, and helps show our ads to people likely to be interested.",
    category: "advertising",
    scriptOrigins: ["https://connect.facebook.net"],
    connectOrigins: ["https://www.facebook.com", "https://connect.facebook.net"],
    imgOrigins: ["https://www.facebook.com"],
    enabled: Boolean(TRACKER_IDS.meta),
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    company: "Google LLC",
    purpose: "Counts visits and shows which pages are useful so we can improve the site.",
    category: "analytics",
    scriptOrigins: ["https://www.googletagmanager.com"],
    connectOrigins: [
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
      "https://www.googletagmanager.com",
    ],
    imgOrigins: ["https://www.google-analytics.com", "https://www.googletagmanager.com"],
    enabled: Boolean(TRACKER_IDS.ga4),
  },
];

export const ENABLED_TRACKERS: Tracker[] = ALL.filter((t) => t.enabled);
export const HAS_TRACKERS = ENABLED_TRACKERS.length > 0;
