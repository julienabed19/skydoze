# SkyDoze — Legal, Compliance & Security Audit

_Audit date: November 9, 2026. Not legal advice. Items marked **Lawyer** need a licensed attorney._

## 1. What the site is

| | |
|---|---|
| Sells | One physical product (SkyDoze Blanket Wrap), $34.99 each, bundles of 1/2/3 at the same unit price. No subscriptions, trials, discounts or promo codes. |
| Ships to | United States only. Free shipping. Estimated delivery 7–15 business days. |
| Personal data | Name, email, shipping/billing address, payment (entered on **Stripe's** hosted checkout, not our site); support emails; hosting logs (IP); a localStorage consent choice (only if trackers are enabled). No accounts, passwords, forms or database. |
| Third parties | Stripe (payments, receipts), Vercel (hosting/logs), email provider for skydoze@veryeo.com, fulfilment partner/carrier (name + address). Fonts are self-hosted at build time — browsers contact **no** third party on our pages. Meta Pixel / GA4 only if you add an ID and the visitor opts in. |

## 2. Verified tests (local production build)

| Test | Result |
|---|---|
| axe-core WCAG 2.2 AA + best practice, 9 pages × desktop & mobile | **0 violations** (pass 1 found 1 contrast bug on all pages — fixed) |
| Keyboard-only purchase flow, focus ring, error announced to screen readers | Pass |
| No horizontal scroll at 375px | Pass |
| Security headers (CSP, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy) on every route; no `X-Powered-By` | Pass |
| Checkout API: missing/foreign/look-alike Origin → 403; qty 99/-1/"1"/1.5 → 400; bad JSON 400; wrong content-type 415; oversized 413; GET 405; >10/min → 429 | Pass |
| Price tampering | Not possible: browser sends only a quantity; price is set on the server |
| Webhook: no signature 400, forged 400, tampered body 400, valid 200; logs IDs only (no PII) | Pass |
| Secrets in source or client bundle | None. `.env*` is git-ignored |
| Consent (with a fake Meta Pixel): nothing before choice; Reject → nothing; Accept → loads; GPC → blocked, no banner | Pass |
| Production dependency vulnerabilities (`npm audit --omit=dev`) | 0 |
| Risky claims scan (fake reviews, urgency, "guaranteed", health, "Made in USA", "oversized") | None |

**Not yet verified (needs your accounts):** live Vercel URL headers, a real Stripe test-mode checkout up to payment, the Stripe receipt email, the Terms checkbox on the live Stripe page. Do these once the key is connected.

## 3. Remaining risks

| Risk | Level | What I found | Fixed? | What you still need to do |
|---|---|---|---|---|
| Legal name + street address not shown | **Low** | Owner chose not to display them (no LLC yet). California B&P Code 17538(d) asks online sellers to disclose legal name + street address to CA buyers before payment; misdemeanor, up to ~$1,000, rarely enforced against small stores. Stripe still collects them privately for identity checks | Owner's decision; fields are optional in `src/lib/business.ts` and appear site-wide once filled | Optional later: form an LLC + virtual mailbox so "SkyDoze LLC" and a mailbox address show instead of your personal details |
| Textile origin disclosure (FTC Textile Act) | **High** | Online textile listings must say "Imported" or "Made in USA"; FTC has enforced this against online catalogs | Field added, launch blocked until set | Tell me the origin; make sure the product has a sewn-in label (fiber, origin, RN/company) |
| Product photos | **Medium** | Your SkyDoze images are now used (cropped, metadata stripped, baked-in text rebuilt as HTML). The image that copied a competitor's ad layout and tagline ("Sleep like you got the upgrade") is **not** used. The "Why travelers switch" headline (implies existing customers) and "buckles around **any** headrest" (absolute claim) were replaced with fair wording | Yes | Confirm the photos match the exact product you ship (if they're AI-generated, the product shown must be accurate) |
| Comparison chart vs. neck pillows | **Low** | Comparative claims must be true; "head support that stays put ✗" for pillows was unsubstantiated | Rebuilt as an accessible HTML table with only verifiable rows, "Varies" where it does, plus a footnote | — |
| Safety (mask/head support) | **Low** | A sleep mask or seat-mounted support used by a driver, or against crew instructions, is a foreseeable-misuse risk | "Passengers only / never while driving" on the page, FAQ on airline rules, Terms section 8 | — |
| "No refunds no matter what" | **Medium** | Can't override FTC Mail Order Rule, card-network disputes, or non-waivable state warranties | Policy = all sales final for change of mind; proof-based exceptions; disclosed next to the buy button and as a required checkbox at Stripe checkout | Lawyer review of Refund Policy + Terms |
| Shipping-time promise (Mail Order Rule) | **Medium** | You must have a reasonable basis for 7–15 business days and offer cancel/refund on delays | Policy text + process written | Keep supplier proof of transit times; actually email customers if delayed |
| Sales tax | **Medium** | No tax collected by default | `STRIPE_AUTOMATIC_TAX` switch ready | Ask an accountant where you have nexus; enable Stripe Tax |
| Arbitration / class waiver | **Medium** | Included with small-claims carve-out and 30-day opt-out; enforceability varies | Drafted | **Lawyer** must review before relying on it |
| ADA lawsuits | **Low** (was the #1 risk category) | 0 automated violations, keyboard flow works, statement page published | Yes | Re-run checks after adding photos (need real alt text) |
| Pixels / CIPA wiretap claims | **Low** (none installed) | SB 690 does **not** stop §631 pixel suits | Opt-in only + GPC; no pixel by default | Keep pixels off unless you truly need them |
| State privacy laws (CCPA etc.) | **Low** | You're likely below CCPA thresholds, but policy covers rights + GPC anyway | Yes | — |
| Checkout abuse / rate limiting | **Low** | Built-in limiter is per server instance | Partial | Add a Vercel Firewall rate-limit rule |
| Trademark "SkyDoze" | **Low/Unknown** | Web search found no SkyDoze mark, but that isn't a USPTO clearance | — | Run a USPTO search / consider filing |
| CSP uses `'unsafe-inline'` scripts | **Low** | Needed by Next.js static pages; no user content is rendered | Accepted | — |
| Dev-only lint dependency advisory (minimatch) | **Low** | Never shipped to visitors | No | Update `eslint-config-next` when a fix lands |

## 4. Sources

- FTC Mail, Internet, or Telephone Order Merchandise Rule: <https://ftc.gov/business-guidance/resources/business-guide-ftcs-mail-internet-or-telephone-order-merchandise-rule>, 16 CFR 435 <https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435>
- Click-to-cancel vacated (8th Cir., July 2025), new ANPRM 2026: <https://www.bclplaw.com/en-US/events-insights-news/im-not-dead-yet-is-the-demise-of-the-ftcs-click-to-cancel-exaggerated.html> (not applicable: no subscriptions)
- FTC fake reviews rule, 16 CFR 465: <https://www.morganlewis.com/pubs/2024/08/ftc-issues-final-rule-on-consumer-reviews-and-testimonials>
- California refund-policy posting (Civ. Code 1723): <https://www.dca.ca.gov/publications/legal_guides/s_6.shtml>, <https://www.oag.ca.gov/consumers/general/refund_policies>
- "As is" disclaimers limited (Cal. Civ. Code 1792.4): <https://codes.findlaw.com/ca/civil-code/civ-sect-1792-4/>
- CIPA / SB 690: <https://www.hinshawlaw.com/en/insights/privacy-cyber-and-ai-decoded-alert/californias-sb-690-removes-some-cipa-claims-but-privacy-and-legal-risks-remain>, <https://www.truevault.com/blog/sb-690-is-now-law-the-cipa-lawsuits-arent-done-yet>
- ADA web lawsuit volume: <https://www.accessibilitychecker.org/blog/ada-website-compliance-lawsuits/>, <https://testparty.ai/blog/ada-website-lawsuits-2026>
- CCPA thresholds: <https://www.jacksonlewis.com/insights/navigating-california-consumer-privacy-act-30-essential-faqs-covered-businesses-including-clarifying-regulations-effective-1126>
- GPC states: <https://consentstack.io/blog/us-state-privacy-laws>
- Textile origin disclosure online: <https://business.ftc.gov/documents/bus21-threading-your-way-through-labeling-requirements-under-textile-and-wool-acts>, <https://www.barnesrichardson.com/ftc-enforces-origin-rule-for-online-catalogs>
- Stripe Checkout terms consent: <https://docs.stripe.com/payments/checkout/customization/policies>
- California online-seller disclosure (B&P 17538(d)): <https://corporate.findlaw.com/law-library/california-consumer-protection-laws-extend-to-internet-vendors.html>, <https://revisionlegal.com/corporate/revision-legal/california-ecommerce-refund-policy-disclosure/>
- Pennsylvania fictitious names: <https://www.pa.gov/agencies/dos/programs/business/types-of-filings-and-registrations/fictitious-names>
