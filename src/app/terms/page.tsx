import type { Metadata } from "next";
import Link from "next/link";
import { Email, Fact, LegalPage } from "@/components/LegalPage";
import { BUSINESS, SHIPPING } from "@/lib/business";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Terms() {
  const operator = BUSINESS.legalName ? `${BUSINESS.legalName}, doing business as ${BUSINESS.brand}` : BUSINESS.brand;
  return (
    <LegalPage title="Terms of Service">
      <div className="callout">
        <p>
          <strong>Please read these Terms carefully.</strong> They include a <strong>binding arbitration agreement and a
          class-action waiver</strong> (Section 12) that affect how disputes are resolved. You can opt out of arbitration
          within 30 days (Section 12.6). <strong>All sales are final</strong> except as described in our{" "}
          <Link href="/refunds">Refund Policy</Link>.
        </p>
      </div>

      <h2>1. Who we are and agreeing to these Terms</h2>
      <p>
        This website ({BUSINESS.siteUrl}) is operated by {operator} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;). By using the site or placing an order, you agree to these Terms. At checkout you must check a
        box confirming that you agree; we keep a record of that agreement with your order. If you don&apos;t agree,
        please don&apos;t use the site or buy from us.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old, or the age of majority where you live, to place an order. The site is not
        directed to children under 13.
      </p>

      <h2>3. Products and descriptions</h2>
      <p>
        We try to describe and display products accurately. Illustrations are labeled as illustrations. Colors and
        textures may look slightly different on your screen, and handmade or textile goods can vary a little from unit
        to unit. These differences are not defects.
      </p>

      <h2>4. Prices, payment and taxes</h2>
      <p>
        Prices are in US dollars. The price you pay is the price shown at checkout. Payments are processed by Stripe,
        Inc.; we never receive or store your full card number. Applicable sales tax, if any, is calculated and shown at
        checkout before you pay. If a product is listed at a clearly incorrect price because of an error, we may cancel
        the order and refund you in full.
      </p>

      <h2>5. Orders</h2>
      <p>
        Your order is an offer to buy. We accept it when we ship it. We may refuse or cancel an order, for example
        because of suspected fraud, an obvious pricing error or a stock problem. If we cancel, we&apos;ll refund
        everything you paid.
      </p>

      <h2>6. Shipping</h2>
      <p>
        We ship to {SHIPPING.regionLabel} only. Shipping is free. Delivery estimates and what happens if we can&apos;t
        ship on time are explained in our <Link href="/shipping">Shipping Policy</Link>, which is part of these Terms.
        Title and risk of loss pass to you when the carrier delivers the order to the shipping address you provided.
      </p>

      <h2>7. All sales final; refunds</h2>
      <p>
        <strong>All sales are final.</strong> We don&apos;t accept returns or give refunds for change of mind. Our{" "}
        <Link href="/refunds">Refund Policy</Link>, which is part of these Terms, lists the only situations in which we
        replace or refund orders, plus any rights the law gives you that can&apos;t be waived.
      </p>

      <h2>8. Disclaimer of warranties</h2>
      <p className="caps">
        Except as stated in our Refund Policy, and to the fullest extent permitted by law, products and the site are
        provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; and we disclaim all warranties, express or implied,
        including implied warranties of merchantability, fitness for a particular purpose and non-infringement.
      </p>
      <p>
        Some states don&apos;t allow implied warranties to be disclaimed or limited. In those states, the disclaimer above
        doesn&apos;t apply to you to the extent the law forbids it, and any implied warranty lasts only as long as the
        law requires.
      </p>
      <p>
        Our products are general comfort items. They are not medical devices and are not intended to diagnose, treat or
        prevent any sleep disorder or medical condition. Use them as a passenger only: never wear the sleep mask or use the
        head support while driving or operating anything. Follow airline and crew instructions, remove the head support
        if asked, and don&apos;t let it block other passengers or your seatbelt. Keep the set away from infants and from
        anyone who can&apos;t remove it on their own.
      </p>

      <h2>9. Limitation of liability</h2>
      <p className="caps">
        To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special,
        consequential or punitive damages, or for lost profits or data. Our total liability for any claim related to the
        site or a product is limited to the amount you paid for the product involved.
      </p>
      <p>
        Nothing in these Terms limits liability that can&apos;t be limited by law, such as liability for death or
        personal injury caused by negligence, or for fraud.
      </p>

      <h2>10. Intellectual property and acceptable use</h2>
      <p>
        The {BUSINESS.brand} name, logo, illustrations, text and site design belong to us or our licensors. You may not
        copy or reuse them for commercial purposes without our written permission. Don&apos;t misuse the site. For
        example, don&apos;t attempt to break or overload it, scrape it with automated tools in a way that harms it,
        place fraudulent orders, or use it for anything unlawful.
      </p>

      <h2>11. Indemnity</h2>
      <p>
        To the extent permitted by law, you agree to cover our reasonable losses and costs (including reasonable
        attorneys&apos; fees) from third-party claims caused by your misuse of the site or your violation of these Terms.
      </p>

      <h2>12. Dispute resolution, arbitration and class-action waiver</h2>
      <h3>12.1 Talk to us first</h3>
      <p>
        Most problems can be fixed with an email. Before starting any formal claim, you agree to email <Email /> with
        your name, order number, a description of the issue and what you want. We&apos;ll try in good faith to resolve it
        within 30 days. We agree to do the same before bringing a claim against you.
      </p>
      <h3>12.2 Binding individual arbitration</h3>
      <p>
        If we can&apos;t resolve it informally, you and we agree that any dispute arising from or relating to these
        Terms, the site or any product will be resolved by <strong>binding individual arbitration</strong>, administered
        by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, instead of in court. The
        arbitration may be held by video, by phone, in writing, or in the county where you live. We will pay the AAA
        filing and arbitrator fees that its Consumer Rules assign to the business. The Federal Arbitration Act governs
        this Section 12.
      </p>
      <h3>12.3 Small claims and exceptions</h3>
      <p>
        Either of us may instead bring an individual claim in small claims court if it qualifies. Either of us may also
        go to court to stop infringement of intellectual property.
      </p>
      <h3>12.4 Class-action waiver</h3>
      <p className="caps">
        You and we each agree to bring claims only in an individual capacity, and not as a plaintiff or class member in
        any class, collective or representative proceeding. The arbitrator may not combine claims or award relief to
        anyone other than the individual parties.
      </p>
      <h3>12.5 If part of this section fails</h3>
      <p>
        If the class-action waiver is found unenforceable for a particular claim, that claim must be decided in court,
        not in arbitration. The rest of Section 12 still applies.
      </p>
      <h3>12.6 Your right to opt out</h3>
      <p>
        You can opt out of this arbitration agreement by emailing <Email /> within 30 days after your first purchase,
        with the subject &ldquo;Arbitration opt-out&rdquo; and your name and order number. Opting out doesn&apos;t affect
        any other part of these Terms.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of <Fact value={BUSINESS.governingState} label="State" /> and
        applicable US federal law. This doesn&apos;t take away consumer protections you have under the laws of the state
        where you live. Subject to Section 12, any court case will be brought in the state or federal courts located in
        that state, or in the county where you live if your local law requires.
      </p>

      <h2>14. Changes, severability and contact</h2>
      <p>
        We may update these Terms. Changes apply to orders placed after the &ldquo;Last updated&rdquo; date above, not to
        orders already placed. If any part of these Terms is unenforceable, the rest stays in effect. Questions? Email{" "}
        <Email />
        {BUSINESS.address ? <> or write to us at {BUSINESS.address}</> : null}.
      </p>
    </LegalPage>
  );
}
