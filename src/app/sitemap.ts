import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/shipping", "/refunds", "/terms", "/privacy", "/accessibility", "/contact"].map((p) => ({
    url: `${BUSINESS.siteUrl}${p}`,
  }));
}
