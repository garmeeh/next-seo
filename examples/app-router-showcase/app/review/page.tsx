import { ReviewJsonLd } from "next-seo";

export default function Page() {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">ReviewJsonLd Example</h1>
      <ReviewJsonLd
        author="Bob Smith"
        reviewRating={{ ratingValue: 4 }}
        itemReviewed={{ "@type": "LocalBusiness", name: "Legal Seafood" }}
        reviewBody="Fresh seafood and great service!"
        datePublished="2024-01-01"
        url="/review"
      />
      <p>
        This page demonstrates a standalone Review JSON-LD for a local business.
      </p>
    </div>
  );
}
