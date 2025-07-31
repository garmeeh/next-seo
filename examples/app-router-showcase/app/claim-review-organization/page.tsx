import { ClaimReviewJsonLd } from "next-seo";

export default function ClaimReviewOrganizationPage() {
  return (
    <div className="container mx-auto p-8">
      <ClaimReviewJsonLd
        claimReviewed="Climate change is not real"
        reviewRating={{
          ratingValue: 1,
          bestRating: 5,
          worstRating: 1,
          alternateName: "Pants on Fire",
        }}
        url="https://example.com/fact-check/climate-change-denial"
        author={{
          name: "Climate Facts Organization",
          url: "https://example.com",
          logo: {
            url: "https://example.com/logo.png",
            width: 300,
            height: 60,
          },
          sameAs: [
            "https://twitter.com/climatefacts",
            "https://facebook.com/climatefacts",
          ],
        }}
        itemReviewed={{
          author: {
            "@type": "Organization",
            name: "Climate Denial Institute",
            url: "https://example-denial.com",
          },
          datePublished: "2024-07-01",
          firstAppearance: {
            url: "https://example-denial.com/climate-hoax",
            headline: "The Great Climate Hoax Exposed",
            datePublished: "2024-07-01",
            author: {
              "@type": "Organization",
              name: "Climate Denial Institute",
              url: "https://example-denial.com",
            },
          },
        }}
      />

      <article className="prose lg:prose-xl">
        <h1>Fact Check: "Climate change is not real"</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Rating: Pants on Fire</strong>
          <span className="block text-sm">
            Completely and demonstrably false
          </span>
        </div>
        <div className="bg-blue-50 p-4 rounded mb-4">
          <h3 className="font-bold">About the Fact Checker:</h3>
          <p>
            <strong>Organization:</strong> Climate Facts Organization
          </p>
          <p>
            <strong>Focus:</strong> Environmental and climate science claims
          </p>
        </div>
        <h2>The Claim</h2>
        <p>
          The Climate Denial Institute claimed on July 1, 2024, that "climate
          change is not real" in their article "The Great Climate Hoax Exposed."
        </p>
        <h2>Why This is False</h2>
        <p>
          This claim contradicts the overwhelming scientific consensus supported
          by:
        </p>
        <ul>
          <li>
            97% of climate scientists agree climate change is real and
            human-caused
          </li>
          <li>
            Temperature records from NASA, NOAA, and meteorological
            organizations worldwide
          </li>
          <li>
            Observable effects including melting ice caps, rising sea levels,
            and extreme weather events
          </li>
          <li>
            Peer-reviewed studies from thousands of independent researchers
          </li>
        </ul>
        <h2>About Climate Facts Organization</h2>
        <p>
          Climate Facts Organization is an independent fact-checking
          organization specializing in environmental and climate science claims.
          We work with climate scientists and researchers to verify claims about
          climate change.
        </p>
      </article>
    </div>
  );
}
