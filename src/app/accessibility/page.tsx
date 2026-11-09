import type { Metadata } from "next";
import { Email, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function Accessibility() {
  return (
    <LegalPage title="Accessibility Statement">
      <p>
        We want everyone to be able to shop SkyDoze comfortably. We aim to meet the Web Content Accessibility Guidelines
        (WCAG) 2.2 at Level AA.
      </p>
      <h2>What we&apos;ve done</h2>
      <ul>
        <li>Text and buttons meet WCAG AA color-contrast ratios</li>
        <li>Everything works with a keyboard, with a visible focus indicator and a &ldquo;skip to main content&rdquo; link</li>
        <li>Images and illustrations have text alternatives, or are marked decorative</li>
        <li>Form controls have labels, and error messages are announced to screen readers</li>
        <li>Pages use proper headings and landmarks, and set their language</li>
        <li>Animations respect your device&apos;s &ldquo;reduce motion&rdquo; setting</li>
        <li>We check pages with automated tools (axe-core) and by testing with a keyboard</li>
      </ul>
      <h2>Checkout</h2>
      <p>
        Payment takes place on Stripe&apos;s hosted checkout page, which Stripe designs and maintains, including its
        accessibility.
      </p>
      <h2>Need help or found a problem?</h2>
      <p>
        If anything on this site is hard to use, email <Email />. Tell us the page and the problem. We&apos;ll help you
        complete your purchase another way if needed, and we&apos;ll work to fix the issue. We aim to reply within 2
        business days.
      </p>
    </LegalPage>
  );
}
