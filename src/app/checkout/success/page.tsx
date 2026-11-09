import type { Metadata } from "next";
import Link from "next/link";
import { Email } from "@/components/LegalPage";
import { SHIPPING } from "@/lib/business";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

/**
 * Deliberately shows no order details: the URL can be shared or bookmarked, so we
 * don't look up the Stripe session or display names, emails or addresses here.
 */
export default function Success() {
  return (
    <section className="legal-hero" style={{ paddingBottom: 80 }}>
      <div className="container prose">
        <p className="eyebrow">Order received</p>
        <h1>Thank you for your order!</h1>
        <p>
          Stripe will email your receipt to the address you entered at checkout. Your order is confirmed once payment goes through. That usually happens instantly.
          Estimated delivery is {SHIPPING.minBusinessDays}–{SHIPPING.maxBusinessDays} business days.
        </p>
        <p>
          Didn&apos;t get a receipt within an hour? Check your spam folder, then email <Email />.
        </p>
        <p>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
