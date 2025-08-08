import { AggregateRatingJsonLd } from "next-seo";

export default function Page() {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">AggregateRatingJsonLd Example</h1>
      <AggregateRatingJsonLd
        itemReviewed={{ "@type": "Product", name: "Executive Anvil" }}
        ratingValue={4.4}
        ratingCount={89}
      />
      <p>
        This page demonstrates a standalone AggregateRating JSON-LD for a
        product.
      </p>
    </div>
  );
}
