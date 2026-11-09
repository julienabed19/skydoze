import type { Metadata } from "next";
import Link from "next/link";
import { Email, LegalPage } from "@/components/LegalPage";
import { REFUNDS, SHIPPING } from "@/lib/business";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function Shipping() {
  return (
    <LegalPage title="Shipping Policy">
      <div className="callout">
        <strong>The short version:</strong> shipping is free on every order. We ship to {SHIPPING.regionLabel} only.
        Estimated delivery is {SHIPPING.minBusinessDays}–{SHIPPING.maxBusinessDays} business days after you order.
      </div>

      <h2>Where we ship</h2>
      <p>
        We ship to addresses in {SHIPPING.regionLabel}. We don&apos;t currently ship internationally, and checkout
        only accepts US shipping addresses.
      </p>

      <h2>Cost</h2>
      <p>Shipping is free on every order, with no minimum purchase.</p>

      <h2>Delivery time</h2>
      <p>
        Orders are typically delivered within {SHIPPING.minBusinessDays}–{SHIPPING.maxBusinessDays} business days
        (Monday–Friday, excluding US federal holidays) after your order is placed. This is an estimate, not a
        guarantee. Carrier delays, weather and other events outside our control can slow things down.
      </p>

      <h2>If we can&apos;t ship on time</h2>
      <p>
        If we learn we can&apos;t ship your order within the time we stated, we will email you before that time
        passes. We will give you a revised shipping date and the option to cancel for a full, prompt refund of the
        unshipped items. If you don&apos;t want to wait, just tell us and we&apos;ll refund you. This follows the
        FTC&apos;s Mail, Internet, or Telephone Order Merchandise Rule.
      </p>

      <h2>Tracking</h2>
      <p>
        When tracking is available from the carrier, we&apos;ll provide it on request at <Email />. Include your order
        number.
      </p>

      <h2>Your shipping address</h2>
      <p>
        Please double-check your address at checkout. We ship to the address you enter. If a package is returned to us
        or lost because the address was incomplete or wrong, we can&apos;t replace or refund it. Contact us right away if
        you spot a mistake and we&apos;ll try to fix it before the order ships.
      </p>

      <h2>Lost or late packages</h2>
      <p>
        If your order hasn&apos;t arrived {REFUNDS.lostAfterDays} days after the end of the estimated delivery window,
        email us. If carrier tracking doesn&apos;t show it was delivered to your address, we&apos;ll send a replacement
        or a refund. If tracking shows it was delivered, we&apos;ll help you file a claim with the carrier. See the{" "}
        <Link href="/refunds">Refund Policy</Link> for details.
      </p>
    </LegalPage>
  );
}
