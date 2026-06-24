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
    slug: "vol-01-heavyweight-tee",
    name: "VOL.01 — Heavyweight Tee",
    price: "$65",
    status: "preorder",
    shipEstimate: "Ships August 2026",
    blurb: "300gsm boxy tee. First drop. 100 made.",
    description: [
      "The inaugural TUFF piece. A 300gsm garment-dyed heavyweight tee with a boxy, structured fit and a hand-finished hem.",
      "Limited to 100 units. Once they're gone, they're gone — this exact run will never be reprinted.",
      "Pre-order now to lock yours in. Cards are charged at checkout and pieces ship August 2026.",
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
