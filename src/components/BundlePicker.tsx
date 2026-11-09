"use client";

import Link from "next/link";
import { useState } from "react";
import { SHIPPING } from "@/lib/business";
import { BUNDLES, UNIT_PRICE_CENTS, type BundleQty, bundleTotalCents, formatUsd } from "@/lib/pricing";
import { Icon } from "./Art";

const LABELS: Record<BundleQty, { title: string; sub: string }> = {
  1: { title: "1 set", sub: "Just for you" },
  2: { title: "2 sets", sub: "One for you, one for your travel buddy" },
  3: { title: "3 sets", sub: "For the whole crew or as gifts" },
};

export default function BundlePicker() {
  const [qty, setQty] = useState<BundleQty>(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (res.ok && data.url && data.url.startsWith("https://checkout.stripe.com/")) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error || "Something went wrong. Please try again.");
    } catch {
      setError("We couldn't reach checkout. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <div>
      <fieldset className="bundles">
        <legend>Choose your bundle</legend>
        {BUNDLES.map((n) => (
          <label key={n} className="bundle">
            <input type="radio" name="bundle" value={n} checked={qty === n} onChange={() => setQty(n)} />
            <span className="dot" aria-hidden="true" />
            <span>
              <span className="bundle-title">
                {LABELS[n].title}
                <span className="stack" aria-hidden="true">
                  {Array.from({ length: n }, (_, i) => (
                    <span key={i} />
                  ))}
                </span>
              </span>
              <span className="bundle-sub">{LABELS[n].sub}</span>
            </span>
            <span className="bundle-price">{formatUsd(bundleTotalCents(n))}</span>
          </label>
        ))}
      </fieldset>

      <button type="button" className="btn btn-primary btn-block" onClick={checkout} disabled={busy} aria-describedby="final-sale-note">
        <Icon name="lock" size={18} />
        {busy ? "Opening secure checkout…" : `Continue to secure checkout · ${formatUsd(bundleTotalCents(qty))}`}
      </button>

      <div aria-live="polite">{error && <p className="form-error" role="alert">{error}</p>}</div>

      <p className="final-sale" id="final-sale-note">
        <strong>All sales are final.</strong> No returns or refunds for change of mind. We replace or refund only for
        orders that don&apos;t arrive, arrive damaged or defective, or are the wrong item, plus anything the law requires.{" "}
        <Link href="/refunds">Read the Refund Policy</Link>.
      </p>

      <ul className="checkout-meta">
        <li>
          <Icon name="truck" size={18} />
          <span>
            <strong>Free shipping</strong> to {SHIPPING.regionLabel}. Estimated delivery {SHIPPING.minBusinessDays}–
            {SHIPPING.maxBusinessDays} business days.
          </span>
        </li>
        <li>
          <Icon name="lock" size={18} />
          <span>Payment is handled by Stripe. We never see or store your full card number.</span>
        </li>
        <li>
          <Icon name="check" size={18} />
          <span>
            {formatUsd(UNIT_PRICE_CENTS)} per set. Taxes, if any, are shown at checkout before you pay.
          </span>
        </li>
      </ul>
    </div>
  );
}
