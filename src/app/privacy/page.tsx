import type { Metadata } from "next";
import { Email, LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/business";
import { ENABLED_TRACKERS, HAS_TRACKERS } from "@/lib/trackers";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  const hasAds = ENABLED_TRACKERS.some((t) => t.category === "advertising");
  return (
    <LegalPage title="Privacy Policy">
      <div className="callout">
        <strong>The short version:</strong> we collect what&apos;s needed to ship your order and answer your emails. We
        don&apos;t have customer accounts. We never see your full card number. We don&apos;t sell your personal
        information
        {HAS_TRACKERS
          ? ". Optional ad and analytics cookies stay off unless you turn them on, and we honor Global Privacy Control."
          : ", and this site runs no advertising or analytics trackers."}
      </div>

      <h2>Who we are</h2>
      <p>
        This site is operated by {BUSINESS.legalName ? `${BUSINESS.legalName}, doing business as ${BUSINESS.brand}` : BUSINESS.brand}
        {BUSINESS.address ? `, ${BUSINESS.address}` : ""}. Contact: <Email />.
      </p>

      <h2>What we collect and why</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">Where it comes from</th>
              <th scope="col">Why we use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name, email, shipping and billing address</td>
              <td>You, at Stripe checkout</td>
              <td>Process, ship and support your order; send your receipt; meet tax and accounting duties</td>
            </tr>
            <tr>
              <td>Payment details</td>
              <td>You, entered directly into Stripe</td>
              <td>
                Taking payment and preventing fraud. Stripe processes your card; we only see limited details such as card
                brand and last four digits.
              </td>
            </tr>
            <tr>
              <td>Order details and your agreement to our Terms</td>
              <td>Stripe checkout</td>
              <td>Fulfil orders, handle claims, keep records</td>
            </tr>
            <tr>
              <td>Messages you send us</td>
              <td>You, by email</td>
              <td>Answer questions and handle claims</td>
            </tr>
            <tr>
              <td>Technical data: IP address, browser type, pages requested</td>
              <td>Automatically, through our hosting provider&apos;s server logs</td>
              <td>Run and secure the site, prevent abuse</td>
            </tr>
            <tr>
              <td>Your cookie choices</td>
              <td>Stored in your browser (local storage)</td>
              <td>Remember your privacy choices</td>
            </tr>
            {HAS_TRACKERS && (
              <tr>
                <td>Browsing activity on this site (pages viewed, device info, cookie IDs)</td>
                <td>Optional trackers, <strong>only if you opt in</strong></td>
                <td>Measure ads and site usage (see below)</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p>We don&apos;t collect sensitive personal information, and we don&apos;t make automated decisions about you.</p>

      <h2>Who we share it with</h2>
      <p>We share personal information only with service providers who help us run the store:</p>
      <ul>
        <li>
          <strong>Stripe, Inc.</strong>: payments, checkout, receipts and fraud prevention
        </li>
        <li>
          <strong>Vercel Inc.</strong>: website hosting (receives technical data such as IP addresses)
        </li>
        <li>
          <strong>Our fulfilment partner(s) and shipping carriers</strong>: receive your name and shipping address so
          your order can be delivered
        </li>
        <li>
          <strong>Our email provider</strong>: handles messages sent to {BUSINESS.supportEmail}
        </li>
        {ENABLED_TRACKERS.map((t) => (
          <li key={t.id}>
            <strong>{t.company}</strong> ({t.name}): only if you opt in. {t.purpose}
          </li>
        ))}
      </ul>
      <p>
        We may also disclose information if the law requires it, to protect our rights or prevent fraud, or as part of a
        sale or transfer of the business.
      </p>

      <h2 id="cookies">Cookies and tracking</h2>
      {HAS_TRACKERS ? (
        <>
          <p>
            The site works without any optional cookies. These optional tools load <strong>only after you choose
            &ldquo;Accept&rdquo;</strong> in the privacy banner, and you can change your mind anytime with the
            &ldquo;Your Privacy Choices&rdquo; link in the footer:
          </p>
          <ul>
            {ENABLED_TRACKERS.map((t) => (
              <li key={t.id}>
                <strong>{t.name}</strong> ({t.category}, {t.company}): {t.purpose}
              </li>
            ))}
          </ul>
          <p>Trackers never run on Stripe&apos;s checkout pages.</p>
        </>
      ) : (
        <p>
          We don&apos;t use advertising pixels, analytics trackers or third-party cookies. The only thing stored in your
          browser is technical data the site needs to work. Stripe sets its own cookies on its checkout pages for
          security and fraud prevention; see{" "}
          <a href="https://stripe.com/privacy" rel="noopener noreferrer">
            Stripe&apos;s Privacy Policy
          </a>
          .
        </p>
      )}

      <h2>Global Privacy Control and Do Not Track</h2>
      <p>
        If your browser sends a Global Privacy Control (GPC) or Do Not Track signal, we treat it as a request to opt out of
        any sale or sharing of your information and of optional tracking. We don&apos;t ask you to override it.
      </p>

      <h2>Selling and sharing</h2>
      <p>
        We do not sell your personal information for money.
        {hasAds
          ? " If you opt in to advertising cookies (Meta Pixel), that may count as “sharing” for cross-context behavioral advertising under California law. You can opt out at any time using “Your Privacy Choices” in the footer or a GPC signal."
          : " We do not share it for cross-context behavioral advertising."}{" "}
        We have no actual knowledge of selling or sharing information about anyone under 16.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Order and payment records: as long as needed for tax, accounting and legal purposes (generally up to 7 years)</li>
        <li>Support emails: up to 3 years after our last conversation</li>
        <li>Hosting logs: as set by our hosting provider, typically a few weeks</li>
        <li>Your cookie choice: until you clear your browser storage</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, including California, Colorado, Connecticut, Virginia, Texas, Oregon and other
        states with privacy laws, you may have the right to:
      </p>
      <ul>
        <li>know what personal information we have about you and get a copy</li>
        <li>correct inaccurate information</li>
        <li>delete your information (we may keep what the law requires, such as tax records)</li>
        <li>opt out of sale, sharing or targeted advertising</li>
        <li>appeal if we decline your request</li>
        <li>not be discriminated against for using these rights</li>
      </ul>
      <p>
        To make a request, email <Email /> with the subject &ldquo;Privacy request.&rdquo; We&apos;ll verify your identity
        by matching details from your order, then respond within 45 days. An authorized agent may make a request for you
        with your signed permission. To appeal a decision, reply with &ldquo;Appeal&rdquo; in the subject line.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed to children under 13, and we don&apos;t knowingly collect their information. If you
        believe a child has given us information, email us and we&apos;ll delete it.
      </p>

      <h2>Security</h2>
      <p>
        We use HTTPS, security headers and access controls, and we keep no customer accounts or passwords. Payments go
        through Stripe&apos;s PCI-certified checkout. No method is 100% secure, but we work to protect your information.
      </p>

      <h2>Where we operate</h2>
      <p>
        We sell only to customers in the United States, and your information is processed in the United States.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy, we&apos;ll update the date above. If we change how we use information you already gave
        us in a significant way, we&apos;ll tell you before it takes effect.
      </p>
    </LegalPage>
  );
}
