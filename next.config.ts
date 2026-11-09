import type { NextConfig } from "next";
import { ENABLED_TRACKERS } from "./src/lib/trackers";

const isDev = process.env.NODE_ENV !== "production";
const uniq = (list: string[]) => [...new Set(list)].join(" ");

const csp = [
  "default-src 'self'",
  // Next.js injects small inline bootstrap scripts; no user content is ever rendered as HTML.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${uniq(ENABLED_TRACKERS.flatMap((t) => t.scriptOrigins))}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${uniq(ENABLED_TRACKERS.flatMap((t) => t.imgOrigins))}`,
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""} ${uniq(ENABLED_TRACKERS.flatMap((t) => t.connectOrigins))}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
]
  .map((d) => d.trim())
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Only our own product photos may be resized by the image optimizer (blocks abuse).
    localPatterns: [{ pathname: "/products/**", search: "" }],
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
