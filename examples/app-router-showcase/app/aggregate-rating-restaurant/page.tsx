import { AggregateRatingJsonLd } from "next-seo";

export default function Page() {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Restaurant Aggregate Rating</h1>
      <AggregateRatingJsonLd
        itemReviewed={{
          "@type": "LocalBusiness",
          name: "Legal Seafood",
          image: "https://example.com/seafood-restaurant.jpg",
          servesCuisine: "Seafood",
          telephone: "1234567",
          priceRange: "$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 William St",
            addressLocality: "New York",
            addressRegion: "NY",
            postalCode: "10038",
            addressCountry: "US",
          },
        }}
        ratingValue={88}
        bestRating={100}
        ratingCount={350}
      />
      <div className="prose max-w-none">
        <h2>Restaurant Rating Summary</h2>
        <p>
          This example demonstrates an aggregate rating for a restaurant using a
          percentage-based rating system (0-100).
        </p>
        <h3>Rating Details:</h3>
        <ul>
          <li>Overall Score: 88/100</li>
          <li>Based on 350 ratings</li>
          <li>Restaurant includes full location and contact details</li>
        </ul>
      </div>
    </div>
  );
}
