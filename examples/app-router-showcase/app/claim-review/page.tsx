import { ClaimReviewJsonLd } from "next-seo";

export default function ClaimReviewPage() {
  return (
    <div className="container mx-auto p-8">
      <ClaimReviewJsonLd
        claimReviewed="The world is flat"
        reviewRating={{
          ratingValue: 1,
          bestRating: 5,
          worstRating: 1,
          alternateName: "False",
        }}
        url="https://example.com/news/science/worldisflat.html"
        author="Example.com science watch"
      />

      <article className="prose lg:prose-xl">
        <h1>Fact Check: The World is Flat</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Rating: False</strong>
        </div>
        <p>
          We fact-checked the claim that "the world is flat" and found it to be
          demonstrably false based on overwhelming scientific evidence.
        </p>
        <h2>The Claim</h2>
        <p>
          Various online communities continue to promote the idea that Earth is
          flat rather than spherical, despite centuries of scientific evidence
          to the contrary.
        </p>
        <h2>The Facts</h2>
        <p>The Earth is an oblate spheroid, as proven by:</p>
        <ul>
          <li>Satellite imagery from space</li>
          <li>Ships disappearing hull-first over the horizon</li>
          <li>
            Different star constellations visible from different latitudes
          </li>
          <li>Time zones and the day/night cycle</li>
          <li>Gravity measurements across the globe</li>
        </ul>
        <h2>Our Verdict</h2>
        <p>
          The claim that Earth is flat is false. This has been conclusively
          proven through multiple lines of scientific evidence spanning
          centuries.
        </p>
      </article>
    </div>
  );
}
