# SkyDoze storefront

Next.js 16 + Stripe Checkout. One product (SkyDoze Blanket Wrap, $34.99), bundles of 1, 2 or 3 at the same per-unit price, free US shipping. No database, no accounts, no trackers by default.

## Before launch (required)

1. Fill in every `TODO_` value in `src/lib/business.ts` (legal name, address, state, product origin). `npm run prelaunch` fails until you do.
2. Add real product photos you own to `public/products/` and list them in `PRODUCT_PHOTOS`. Add material/size/care/color to `PRODUCT_SPECS` if known.
3. Stripe Dashboard:
   - **Settings → Public details**: add your Terms URL `https://skydoze.vercel.app/terms`, Privacy URL, support email and address. Checkout requires the Terms URL to show the "I agree" box.
   - **Settings → Customer emails**: turn on "Successful payments" so customers get receipts.
   - **Developers → Webhooks**: add endpoint `https://skydoze.vercel.app/api/webhooks/stripe` with events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `charge.dispute.created`. Copy the signing secret.
4. Vercel → Project → Settings → Environment Variables:
   - `STRIPE_SECRET_KEY` (use a **restricted key** with Checkout Sessions write access if possible)
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL=https://skydoze.vercel.app`
5. Vercel → Firewall: add a rate-limit rule for `/api/checkout` (e.g. 20 requests/min per IP). The built-in limiter is per-instance only.

## Optional trackers

Leave `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GA4_ID` empty for zero tracking (lowest legal risk). If set, they load only after opt-in. Global Privacy Control and Do Not Track are honored, and the Privacy Policy, consent banner, "Your Privacy Choices" link and CSP update automatically.

## Develop

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run prelaunch
npm run build
```

See `AUDIT.md` for the legal/compliance/security audit.
