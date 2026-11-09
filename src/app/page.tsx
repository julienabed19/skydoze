import Image from "next/image";
import Link from "next/link";
import BundlePicker from "@/components/BundlePicker";
import Gallery from "@/components/Gallery";
import { Icon } from "@/components/Art";
import { BUSINESS, IN_THE_BOX, PRODUCT_SPECS, REFUNDS, SHIPPING, show } from "@/lib/business";
import { GALLERY, PHOTOS } from "@/lib/photos";
import { UNIT_PRICE_CENTS, formatUsd } from "@/lib/pricing";

const price = formatUsd(UNIT_PRICE_CENTS);
const delivery = `${SHIPPING.minBusinessDays}–${SHIPPING.maxBusinessDays} business days`;

const STEPS = [
  { title: "Strap it on", text: "Buckle the head support around the seat's headrest and tighten the strap." },
  { title: "Drape the wrap", text: "Hang the arm wrap over the head support so it falls in front of you." },
  { title: "Slip on the mask", text: "Pull the sleep mask down and adjust it over your eyes." },
  { title: "Tuck in & drift off", text: "Slide your arms into the wrap, lean back and relax." },
];

const COMPARE: { feature: string; us: boolean; them: "yes" | "no" | "varies" }[] = [
  { feature: "Straps to the seat's headrest", us: true, them: "no" },
  { feature: "Sleep mask included", us: true, them: "varies" },
  { feature: "Covers arms & shoulders", us: true, them: "no" },
  { feature: "Everything packs into one pouch", us: true, them: "varies" },
  { feature: "Use on planes, trains, buses & cars (as a passenger)", us: true, them: "yes" },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What's in the box?",
    a: <>Each set includes a head support, a sleep mask, an arm wrap and a zip carry pouch, all in black.</>,
  },
  {
    q: "Will it fit my seat?",
    a: (
      <>
        The head support buckles around a seat headrest with an adjustable strap, so it needs a seat with a headrest.
        Most airplane, train, bus and car passenger seats have one. Headrests vary, so we can&apos;t promise a fit on
        every seat. Without a headrest you can still use the mask and the wrap on their own.
      </>
    ),
  },
  {
    q: "Can I use it on a plane?",
    a: (
      <>
        Yes, as long as you follow the crew&apos;s instructions. Some airlines ask passengers not to attach anything to
        seats, or to remove items for taxi, takeoff and landing. If you&apos;re asked, unbuckle it. It comes off in
        seconds. Don&apos;t let it get in the way of the person behind you or of your seatbelt.
      </>
    ),
  },
  {
    q: "How much is shipping?",
    a: <>Free on every order to {SHIPPING.regionLabel}. No minimum.</>,
  },
  {
    q: "How long does delivery take?",
    a: (
      <>
        Most orders arrive in {delivery}. If we can&apos;t ship within the time we promised, we&apos;ll email you and you
        can cancel for a full refund. Details are in the <Link href="/shipping">Shipping Policy</Link>.
      </>
    ),
  },
  {
    q: "Do you ship outside the US?",
    a: <>Not yet. We currently ship to US addresses only.</>,
  },
  {
    q: "Can I return it if I change my mind?",
    a: (
      <>
        No. All sales are final, so please choose carefully. We will replace or refund your order if it never arrives,
        arrives damaged or defective, or is the wrong item. Report damage or a wrong item within {REFUNDS.damageReportDays}{" "}
        days of delivery, with your order number and photos. See the <Link href="/refunds">Refund Policy</Link> for the
        full list, including the cases where the law requires a refund.
      </>
    ),
  },
  {
    q: "Is there a discount if I buy 2 or 3?",
    a: (
      <>
        No. Every set is {price}, whether you buy 1, 2 or 3. Bundles just make it quicker to grab extras for travel
        buddies or gifts, and every order ships free.
      </>
    ),
  },
  {
    q: "Is checkout secure?",
    a: (
      <>
        Yes. You pay on Stripe&apos;s secure checkout page. We never see or store your full card number, and we
        don&apos;t create accounts or passwords.
      </>
    ),
  },
  {
    q: "How do I reach you?",
    a: (
      <>
        Email <a href={`mailto:${BUSINESS.supportEmail}`}>{BUSINESS.supportEmail}</a>. Include your order number if
        you have one.
      </>
    ),
  },
];

function Mark({ value }: { value: boolean | "yes" | "no" | "varies" }) {
  if (value === "varies") return <span className="cmp-varies">Varies</span>;
  const yes = value === true || value === "yes";
  return (
    <span className={yes ? "cmp-yes" : "cmp-no"}>
      <Icon name={yes ? "check" : "x"} size={18} />
      <span className="sr-only">{yes ? "Yes" : "No"}</span>
    </span>
  );
}

export default function Home() {
  const specs = [
    ...PRODUCT_SPECS.filter((s) => s.value),
    { label: "Origin", value: show(BUSINESS.productOrigin, "Imported / Made in USA") },
  ];
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: BUSINESS.productName,
    description: "3-in-1 travel sleep set: head support, sleep mask, arm wrap and carry pouch.",
    image: `${BUSINESS.siteUrl}/products/set.jpg`,
    color: "Black",
    brand: { "@type": "Brand", name: BUSINESS.brand },
    offers: {
      "@type": "Offer",
      price: (UNIT_PRICE_CENTS / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${BUSINESS.siteUrl}/#buy`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">3-in-1 travel sleep set</p>
            <h1 id="hero-title">
              Doze off <em>anywhere.</em>
            </h1>
            <p className="hero-lede">
              The {BUSINESS.productName} brings a head support that buckles to your headrest, a contoured sleep mask and a
              soft arm wrap. It all packs into one pouch.
            </p>
            <div className="hero-ctas">
              <Link href="#buy" className="btn btn-primary">
                Get yours · {price}
              </Link>
              <Link href="#how-it-works" className="btn btn-ghost">
                How it works
              </Link>
            </div>
            <ul className="hero-note">
              <li>
                <Icon name="truck" size={18} /> Free US shipping
              </li>
              <li>
                <Icon name="lock" size={18} /> Secure Stripe checkout
              </li>
            </ul>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-frame">
              <Image src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} fill sizes="(max-width: 880px) 100vw, 560px" quality={85} placeholder="blur" preload />
            </div>
            <div className="hero-chip hero-chip-a" aria-hidden="true">
              <Icon name="moon" size={16} /> Mask + head support
            </div>
            <div className="hero-chip hero-chip-b" aria-hidden="true">
              <Icon name="heart" size={16} /> Soft arm wrap
            </div>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Store highlights">
        <ul className="container">
          <li>
            <span className="icon-bubble">
              <Icon name="truck" />
            </span>
            <span>
              Free shipping<small>Every US order, no minimum</small>
            </span>
          </li>
          <li>
            <span className="icon-bubble">
              <Icon name="clock" />
            </span>
            <span>
              {delivery}
              <small>Estimated delivery time</small>
            </span>
          </li>
          <li>
            <span className="icon-bubble">
              <Icon name="lock" />
            </span>
            <span>
              Secure checkout<small>Payments handled by Stripe</small>
            </span>
          </li>
          <li>
            <span className="icon-bubble">
              <Icon name="mail" />
            </span>
            <span>
              Real support<small>Email a real person</small>
            </span>
          </li>
        </ul>
      </section>

      <section id="buy" className="section" aria-labelledby="buy-title">
        <div className="container buy-grid">
          <Gallery photos={GALLERY} />

          <div className="buy-card">
            <p className="eyebrow">3-in-1 travel sleep set</p>
            <h2 id="buy-title">{BUSINESS.productName}</h2>
            <div className="price-line">
              <span className="price">{price}</span>
              <span className="per">per set</span>
              <span className="pill">
                <Icon name="truck" size={14} /> Ships free
              </span>
            </div>
            <p className="muted">
              Everything you need to rest in a passenger seat: support for your head, darkness for your eyes, and
              somewhere cozy for your arms.
            </p>
            <BundlePicker />
            <dl className="specs">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="box-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">In the box</p>
            <h2 id="box-title">Everything you need to doze anywhere.</h2>
          </div>
          <div className="box-grid">
            <div className="box-photo">
              <Image src={PHOTOS.set.src} alt={PHOTOS.set.alt} fill sizes="(max-width: 880px) 100vw, 520px" placeholder="blur" />
            </div>
            <ol className="box-list">
              {IN_THE_BOX.map((item, i) => (
                <li key={item.name}>
                  <span className="step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">How it works</p>
            <h2 id="how-title">Cozy in four easy steps.</h2>
            <p>About a minute from bag to nap.</p>
          </div>
          <ol className="steps steps-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step step-photo">
                <div className="step-img">
                  <Image src={PHOTOS.steps[i].src} alt={PHOTOS.steps[i].alt} fill sizes="(max-width: 880px) 100vw, 280px" placeholder="blur" />
                </div>
                <h3>
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="center muted safety-note">
            <Icon name="check" size={16} /> For passengers only. Never use the mask or head support while driving.
          </p>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="compare-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">How it compares</p>
            <h2 id="compare-title">More than a neck pillow.</h2>
          </div>
          <div className="compare-photos">
            <figure>
              <div className="compare-img">
                <Image src={PHOTOS.compareSkydoze.src} alt={PHOTOS.compareSkydoze.alt} fill sizes="(max-width: 880px) 50vw, 420px" placeholder="blur" />
              </div>
            </figure>
            <figure>
              <div className="compare-img">
                <Image src={PHOTOS.comparePillow.src} alt={PHOTOS.comparePillow.alt} fill sizes="(max-width: 880px) 50vw, 420px" placeholder="blur" />
              </div>
            </figure>
          </div>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <caption className="sr-only">
                {BUSINESS.productName} compared with a typical U-shaped travel neck pillow
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className="col-us">
                    {BUSINESS.productName}
                  </th>
                  <th scope="col">Typical U-shaped neck pillow</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td className="col-us">
                      <Mark value={row.us} />
                    </td>
                    <td>
                      <Mark value={row.them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="center muted compare-note">
            Compared with a standard U-shaped neck pillow sold on its own. Other products&apos; features vary.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="promise-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Straight talk</p>
            <h2 id="promise-title">No surprises at checkout.</h2>
          </div>
          <div className="promise">
            <div className="promise-card">
              <span className="icon-bubble">
                <Icon name="check" />
              </span>
              <h3>One honest price</h3>
              <p>
                {price} per set, free shipping included. No fake &ldquo;sales,&rdquo; no countdown timers, no
                subscription.
              </p>
            </div>
            <div className="promise-card">
              <span className="icon-bubble">
                <Icon name="scale" />
              </span>
              <h3>Clear policies</h3>
              <p>
                All sales are final for change of mind. If something goes wrong with delivery or the product,{" "}
                <Link href="/refunds">we&apos;ll make it right</Link>.
              </p>
            </div>
            <div className="promise-card">
              <span className="icon-bubble">
                <Icon name="heart" />
              </span>
              <h3>Your data stays yours</h3>
              <p>
                No accounts, no passwords to leak, and we never sell your information.{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section section-tint" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Questions, answered.</h2>
          </div>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="cta-title">
        <div className="cta-band">
          <h2 id="cta-title">Your next trip just got cozier.</h2>
          <p>
            {price} per set, delivered free in {delivery}.
          </p>
          <Link href="#buy" className="btn btn-primary">
            Choose your bundle
          </Link>
        </div>
      </section>
    </>
  );
}
