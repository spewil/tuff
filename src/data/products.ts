export type DropStatus = "preorder" | "available" | "soldout" | "coming-soon";

export interface SizeOption {
  /** Display label, e.g. "M", "XL" */
  label: string;
  /**
   * Stripe Payment Link URL for this exact size variant.
   * Create one Payment Link per size in the Stripe Dashboard, then paste it here.
   * Leave empty ("") to render the size as sold out / unavailable.
   */
  stripeLink: string;
  soldOut?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  /** Display price, e.g. "$65". Source of truth for the charge is the Stripe Payment Link. */
  price: string;
  status: DropStatus;
  /** For pre-orders: when buyers can expect to receive it. */
  shipEstimate?: string;
  /** Short tagline shown on the card. */
  blurb: string;
  /** Long description shown on the product page. Supports plain paragraphs. */
  description: string[];
  /** Image paths relative to /public, e.g. "/drops/heavyweight-tee.jpg". */
  images: string[];
  sizes: SizeOption[];
}

// ---------------------------------------------------------------------------
// DROPS
//
// To launch a drop:
//   1. In Stripe, create a Product + Price, then a Payment Link per size.
//      - On each Payment Link, turn ON "Collect shipping address".
//      - Set "Limit the number of payments" to your inventory for that size
//        (this is how limited drops enforce scarcity).
//   2. Paste the link into the matching size's `stripeLink` below.
//   3. Set `status` to "preorder" (charge now, ship later) or "available".
// ---------------------------------------------------------------------------

export const products: Product[] = [
  {
    slug: "tuff-boi",
    name: "TUFF BOI",
    price: "$44",
    status: "preorder",
    shipEstimate: "Ships Q3 2026",
    blurb: "Comic Sans embroidery. For the boi who synergizes.",
    description: [
      "A structured 6-panel cap with a chunky Comic Sans wordmark embroidered front and center. Premium brushed cotton, adjustable strap, mid-profile crown.",
      "TUFF BOI is not a hat. TUFF BOI is a deliverable. A wholly owned subsidiary of your head.",
      "Limited first run. Pre-order now — card charged today, ships Q3 2026. Per our last email, please find your new favorite cap attached.",
    ],
    images: ["/drops/tuff-boi.svg"],
    sizes: [{ label: "One Size", stripeLink: "" }],
  },
  {
    slug: "tuff-grl",
    name: "TUFF GRL",
    price: "$44",
    status: "preorder",
    shipEstimate: "Ships Q3 2026",
    blurb: "Bubblegum gloss. Comic Sans coded. Eternally tuff.",
    description: [
      "The TUFF GRL cap: a structured 6-panel in high-gloss bubblegum with a hand-rotated Comic Sans wordmark. Adjustable strap. Certified 100% TUFF.",
      "Circles back harder than any cap in the category. Best-in-class brim. Mission-critical vibes.",
      "Limited first run. Pre-order now — card charged today, ships Q3 2026.",
    ],
    images: ["/drops/tuff-grl.svg"],
    sizes: [{ label: "One Size", stripeLink: "" }],
  },
  {
    slug: "vol-01-heavyweight-tee",
    name: "VOL.01 — Heavyweight Tee",
    price: "$65",
    status: "soldout",
    blurb: "300gsm boxy tee. The first piece. 100 made, 100 gone.",
    description: [
      "The first TUFF garment. A 300gsm garment-dyed heavyweight tee with a boxy, structured fit and a hand-finished hem.",
      "Limited to 100 units. They sold out, and this exact run will never be made again.",
      "Kept here for the record. The next thing will be different.",
    ],
    images: ["/drops/placeholder.svg"],
    sizes: [
      { label: "S", stripeLink: "" },
      { label: "M", stripeLink: "" },
      { label: "L", stripeLink: "" },
      { label: "XL", stripeLink: "" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
