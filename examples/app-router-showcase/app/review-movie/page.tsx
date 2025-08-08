import { ReviewJsonLd } from "next-seo";

export default function Page() {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Movie Review Example</h1>
      <ReviewJsonLd
        author={{
          name: "Roger Ebert",
          url: "https://example.com/reviewers/roger-ebert",
        }}
        reviewRating={{
          ratingValue: 4,
          bestRating: 4,
          worstRating: 0,
        }}
        itemReviewed={{
          "@type": "Movie",
          name: "The Shawshank Redemption",
          director: "Frank Darabont",
          actor: ["Tim Robbins", "Morgan Freeman"],
          dateCreated: "1994-09-23",
          image: "https://example.com/shawshank.jpg",
          duration: "PT2H22M",
        }}
        reviewBody="A masterful adaptation of Stephen King's novella, The Shawshank Redemption is a powerful tale of hope and friendship that resonates deeply with audiences. The performances by Robbins and Freeman are nothing short of extraordinary."
        datePublished="2024-03-15"
        publisher={{
          name: "Film Critics United",
          logo: "https://example.com/fcu-logo.jpg",
        }}
        url="https://example.com/reviews/shawshank-redemption"
        mainEntityOfPage="https://example.com/reviews/shawshank-redemption"
      />
      <div className="prose max-w-none">
        <h2>About This Review</h2>
        <p>
          This example shows a movie review with comprehensive structured data
          including the movie details, reviewer information, and publisher
          details.
        </p>
        <h3>Key Features:</h3>
        <ul>
          <li>Movie-specific properties (director, actors, duration)</li>
          <li>Custom rating scale (0-4 stars)</li>
          <li>Publisher with logo</li>
          <li>Main entity of page reference</li>
        </ul>
      </div>
    </div>
  );
}
