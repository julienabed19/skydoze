import type { Metadata } from "next";
import Link from "next/link";
import { Email, LegalPage } from "@/components/LegalPage";
import { REFUNDS, SHIPPING } from "@/lib/business";

export const metadata: Metadata = { title: "Refund Policy: All Sales Final" };

export default function Refunds() {
  return (
    <LegalPage title="Refund Policy" intro="All sales are final. Please read this before you buy.">
      <div className="callout">
        <p>
          <strong>ALL SALES ARE FINAL.</strong> We do not accept returns or exchanges, or give refunds, if you change your
          mind, no longer want the item, or bought the wrong quantity.
        </p>
        <p style={{ marginBottom: 0 }}>
          We <strong>will</strong> make it right only in the situations listed below, and only with the proof listed for
          each one.
        </p>
      </div>

      <h2>When we will replace or refund your order</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Situation</th>
              <th scope="col">Report it within</th>
              <th scope="col">Proof we need</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Never arrived:</strong> carrier tracking does not show delivery to the address you gave us
              </td>
              <td>
                {REFUNDS.lostAfterDays} days after the end of the {SHIPPING.minBusinessDays}–{SHIPPING.maxBusinessDays}{" "}
                business-day delivery estimate (and no later than 90 days after your order)
              </td>
              <td>Order number and the email used at checkout</td>
            </tr>
            <tr>
              <td>
                <strong>Damaged or defective</strong> when it arrived
              </td>
              <td>{REFUNDS.damageReportDays} days after delivery</td>
              <td>Order number, clear photos or video of the problem, and a photo of the package and shipping label</td>
            </tr>
            <tr>
              <td>
                <strong>Wrong item</strong> or wrong quantity sent
              </td>
              <td>{REFUNDS.damageReportDays} days after delivery</td>
              <td>Order number and photos of what you received and the shipping label</td>
            </tr>
            <tr>
              <td>
                <strong>We couldn&apos;t ship on time</strong> and you chose to cancel
              </td>
              <td>Any time before it ships</td>
              <td>None. We&apos;ll contact you (see the <Link href="/shipping">Shipping Policy</Link>)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For approved claims we will, at our choice, send a replacement or refund the price of the affected item(s) to
        your original payment method. We may ask you to send the item back. If we do, we&apos;ll provide a prepaid
        label. Refunds usually show up 5–10 business days after we issue them, depending on your bank.
      </p>

      <h2>What&apos;s not covered</h2>
      <ul>
        <li>Change of mind, preference, or no longer needing the item</li>
        <li>Normal wear and tear, misuse, or damage after delivery (for example, from washing against the care instructions)</li>
        <li>
          Packages that tracking shows as delivered to the address you entered. We&apos;ll help you file a claim with
          the carrier
        </li>
        <li>Orders sent to an incorrect or incomplete address entered at checkout</li>
        <li>Claims reported after the time limits above, or without the proof requested</li>
      </ul>

      <h2>How to make a claim</h2>
      <ol>
        <li>
          Email <Email /> with the subject &ldquo;Order claim&rdquo; and your order number.
        </li>
        <li>Describe the problem and attach the proof listed above.</li>
        <li>We&apos;ll review it and reply, usually within 3 business days.</li>
      </ol>
      <p>
        Please contact us before disputing a charge with your bank. We can usually resolve a valid claim faster than a
        dispute can.
      </p>

      <h2>Your legal rights</h2>
      <p>
        This policy does not limit any rights you have under laws that can&apos;t be waived by contract. That includes
        refund rights under federal or state law and any implied warranties your state doesn&apos;t allow sellers to
        disclaim. If the law gives you a right to a refund, repair or replacement in a situation not listed here, we
        will honor it.
      </p>
    </LegalPage>
  );
}
