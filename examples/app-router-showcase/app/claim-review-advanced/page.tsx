import { ClaimReviewJsonLd } from "next-seo";

export default function ClaimReviewAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <ClaimReviewJsonLd
        claimReviewed="The world is flat"
        reviewRating={{
          ratingValue: 1,
          bestRating: 5,
          worstRating: 1,
          alternateName: "False",
          name: "False",
        }}
        url="https://example.com/news/science/worldisflat.html"
        author={{
          name: "Example.com Science Watch",
          url: "https://example.com/science",
          logo: "https://example.com/logo.jpg",
        }}
        itemReviewed={{
          author: {
            "@type": "Organization",
            name: "Square World Society",
            sameAs:
              "https://example.flatworlders.com/we-know-that-the-world-is-flat",
          },
          datePublished: "2024-06-20",
          appearance: {
            "@type": "OpinionNewsArticle",
            url: "https://example.com/news/a122121",
            headline: "Square Earth - Flat earthers for the Internet age",
            datePublished: "2024-06-22",
            author: {
              name: "T. Tellar",
            },
            image: "https://example.com/photos/1x1/photo.jpg",
            publisher: {
              name: "Skeptical News",
              logo: {
                url: "https://example.com/logo.jpg",
              },
            },
          },
        }}
      />

      <article className="prose lg:prose-xl">
        <h1>Fact Check: The World is Flat (Advanced Example)</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Rating: False (1/5)</strong>
        </div>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-bold">Claim Details:</h3>
          <p>
            <strong>Claimed by:</strong> Square World Society
          </p>
          <p>
            <strong>First published:</strong> June 20, 2024
          </p>
          <p>
            <strong>Appeared in:</strong> "Square Earth - Flat earthers for the
            Internet age" by T. Tellar
          </p>
        </div>
        <p>
          This advanced example demonstrates a fact check with complete claim
          tracking, including the original source, publication details, and
          appearance information.
        </p>
        <h2>About This Fact Check</h2>
        <p>
          This fact check was conducted by Example.com Science Watch, an
          independent fact-checking organization dedicated to verifying
          scientific claims.
        </p>
        <h2>The Claim Origin</h2>
        <p>
          The claim was originally made by the Square World Society on June 20,
          2024, and subsequently appeared in an opinion piece titled "Square
          Earth - Flat earthers for the Internet age" published by Skeptical
          News on June 22, 2024.
        </p>
        <h2>Our Analysis</h2>
        <p>
          After thorough investigation and consultation with multiple scientific
          experts, we rate this claim as FALSE. The evidence overwhelmingly
          supports that Earth is spherical, not flat.
        </p>
      </article>
    </div>
  );
}
