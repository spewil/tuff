# TUFF

Static brand site for TUFF — limited edition apparel drops. Built with [Astro](https://astro.build), checkout powered by [Stripe Payment Links](https://stripe.com/payments/payment-links). No backend, no monthly cost.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in ./dist
npm run preview  # serve the production build locally
```

## How a drop works

Everything for a drop lives in `src/data/products.ts`. Each product has a `status`, sizes, images, and one Stripe Payment Link per size.

### 1. Create the Stripe Payment Links

In the [Stripe Dashboard](https://dashboard.stripe.com/payment-links) for each size:

1. **Products** → create a Product + Price for the garment.
2. **Payment Links** → create a link for each size variant.
   - Turn **ON** "Collect customers' shipping addresses".
   - Set **"Limit the number of payments"** to that size's inventory — this is how
     limited drops enforce scarcity. When the cap is hit, Stripe closes the link.
   - Optionally add a custom message like "Pre-order — ships August 2026".
3. Copy each link URL (looks like `https://buy.stripe.com/xxx`).

> Pre-order = charge now, ship later. Payment Links charge the card at checkout,
> which is the standard drop model. Fulfill orders from the Stripe Dashboard when
> stock arrives.

### 2. Wire them into the site

In `src/data/products.ts`, paste each link into the matching size's `stripeLink`,
and set `status: "preorder"` (or `"available"`). Leave `stripeLink: ""` to render a
size as sold out.

```ts
{
  slug: "vol-01-heavyweight-tee",
  name: "VOL.01 — Heavyweight Tee",
  price: "$65",
  status: "preorder",
  shipEstimate: "Ships August 2026",
  sizes: [
    { label: "M", stripeLink: "https://buy.stripe.com/xxxxx" },
    { label: "L", stripeLink: "" }, // sold out
  ],
  // ...
}
```

### 3. Add product images

Drop image files into `public/drops/` and reference them in the product's `images`
array (e.g. `/drops/vol-01.jpg`).

## Deploy

Static output works on any host. Cheapest/easiest free options:

- **Vercel** or **Netlify** — connect the GitHub repo, build command `npm run build`,
  output dir `dist`. Auto-deploys on push.
- **GitHub Pages** — `npm run build` and publish `dist`.

## When you outgrow Payment Links

If you later need real-time cross-size inventory, a cart, or discount logic, add a
single serverless function (Vercel/Netlify free tier) that creates Stripe Checkout
Sessions. The data model in `products.ts` is already shaped for that move.
