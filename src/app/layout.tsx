import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import ConsentManager from "@/components/ConsentManager";
import { Footer, Header } from "@/components/SiteChrome";
import { BUSINESS } from "@/lib/business";
import "./globals.css";

// next/font downloads these at build time and serves them from our own domain,
// so visitors' browsers never contact Google. Both fonts are SIL Open Font License.
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap", style: ["normal", "italic"] });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: {
    default: `${BUSINESS.productName} | Free US Shipping`,
    template: `%s | ${BUSINESS.brand}`,
  },
  description:
    "The SkyDoze Blanket Wrap: a 3-in-1 travel sleep set with head support, sleep mask and arm wrap. $34.99 with free US shipping.",
  openGraph: {
    title: `${BUSINESS.productName}`,
    description: "Doze off anywhere. $34.99 with free US shipping.",
    url: BUSINESS.siteUrl,
    siteName: BUSINESS.brand,
    type: "website",
    images: [{ url: "/products/set.jpg", width: 572, height: 705, alt: "SkyDoze 3-in-1 travel sleep set" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ConsentManager />
      </body>
    </html>
  );
}
