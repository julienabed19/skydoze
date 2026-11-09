import type { Metadata } from "next";
import Link from "next/link";
import { Email, LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <LegalPage title="Contact us" intro="Questions about your order or the SkyDoze set? We're happy to help." updated={false}>
      <h2>Email</h2>
      <p>
        <Email />. Please include your order number if you have one. We reply on business days.
      </p>
      {BUSINESS.address && (
        <>
          <h2>Mailing address</h2>
          <address style={{ fontStyle: "normal" }}>
            {BUSINESS.legalName && (
              <>
                {BUSINESS.legalName}
                <br />
              </>
            )}
            {BUSINESS.address}
          </address>
          <p className="muted" style={{ marginTop: 12 }}>
            This address is for written correspondence only, not returns. Please email us before sending anything.
          </p>
        </>
      )}
      <h2>Helpful links</h2>
      <ul>
        <li>
          <Link href="/shipping">Shipping Policy</Link>: delivery times and lost packages
        </li>
        <li>
          <Link href="/refunds">Refund Policy</Link>: damaged, defective or wrong items
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>: privacy requests
        </li>
      </ul>
    </LegalPage>
  );
}
