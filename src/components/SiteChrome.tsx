import Link from "next/link";
import { BUSINESS, SHIPPING } from "@/lib/business";
import { HAS_TRACKERS } from "@/lib/trackers";
import { Logo } from "./Art";
import { PrivacyChoicesButton } from "./ConsentManager";

export function Header() {
  return (
    <header className="site-header">
      <p className="announce">
        <strong>Free shipping</strong> on every US order · Delivered in {SHIPPING.minBusinessDays}–
        {SHIPPING.maxBusinessDays} business days
      </p>
      <nav className="container nav" aria-label="Main">
        <Link href="/" className="logo" aria-label={`${BUSINESS.brand} home`}>
          <Logo />
          <span>{BUSINESS.brand}</span>
        </Link>
        <ul className="nav-links">
          <li className="hide-sm">
            <Link href="/#how-it-works">How it works</Link>
          </li>
          <li className="hide-sm">
            <Link href="/#faq">FAQ</Link>
          </li>
          <li className="hide-sm">
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/#buy" className="btn btn-primary">
              Shop now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo footer-logo">
              <Logo />
              <span>{BUSINESS.brand}</span>
            </Link>
            <p>Doze off anywhere. A 3-in-1 travel sleep set for planes, trains and road trips.</p>
          </div>
          <div>
            <h2>Shop</h2>
            <ul>
              <li>
                <Link href="/#buy">{BUSINESS.productName}</Link>
              </li>
              <li>
                <Link href="/#how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Policies</h2>
            <ul>
              <li>
                <Link href="/shipping">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/refunds">Refund Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/accessibility">Accessibility</Link>
              </li>
              {HAS_TRACKERS && (
                <li>
                  <PrivacyChoicesButton />
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={`mailto:${BUSINESS.supportEmail}`}>{BUSINESS.supportEmail}</a>
              </li>
              <li>
                <Link href="/contact">Contact page</Link>
              </li>
              {(BUSINESS.legalName || BUSINESS.address) && (
                <li>
                  <address style={{ fontStyle: "normal" }}>
                    {BUSINESS.legalName}
                    {BUSINESS.legalName && BUSINESS.address && <br />}
                    {BUSINESS.address}
                  </address>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            © {year} {BUSINESS.brand}. All rights reserved. Ships to {SHIPPING.regionLabel} only.
          </p>
          <p style={{ margin: 0 }}>
            Powered by{" "}
            <a href={BUSINESS.poweredBy.href} rel="noopener noreferrer" target="_blank">
              {BUSINESS.poweredBy.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
