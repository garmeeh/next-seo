import { MovieCarouselJsonLd } from "next-seo";

export default function MovieCarouselAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <MovieCarouselJsonLd
        movies={[
          {
            name: "Everything Everywhere All at Once",
            url: "https://example.com/movies/everything-everywhere",
            image: [
              "https://example.com/photos/1x1/eeaao.jpg",
              {
                url: "https://example.com/photos/4x3/eeaao.jpg",
                width: 1200,
                height: 900,
              },
              {
                url: "https://example.com/photos/16x9/eeaao.jpg",
                width: 1920,
                height: 1080,
              },
              {
                url: "https://example.com/photos/6x9/eeaao.jpg",
                width: 600,
                height: 900,
                caption: "Official movie poster",
              },
            ],
            dateCreated: "2024-03-25",
            director: {
              name: "Daniel Kwan and Daniel Scheinert",
              url: "https://example.com/directors/daniels",
            },
            review: {
              reviewRating: {
                ratingValue: 5,
                bestRating: 5,
                worstRating: 1,
              },
              author: {
                name: "Sarah Johnson",
                url: "https://example.com/reviewers/sarah-johnson",
              },
              reviewBody:
                "A mind-bending masterpiece that explores the multiverse with heart, humor, and incredible creativity. The performances are outstanding.",
              datePublished: "2024-03-30",
            },
            aggregateRating: {
              ratingValue: 95,
              bestRating: 100,
              worstRating: 0,
              ratingCount: 125432,
              reviewCount: 8956,
            },
          },
          {
            name: "The Banshees of Inisherin",
            url: "https://example.com/movies/banshees-inisherin",
            image: "https://example.com/photos/6x9/banshees.jpg",
            dateCreated: "2024-10-21",
            director: {
              name: "Martin McDonagh",
              url: "https://example.com/directors/martin-mcdonagh",
              familyName: "McDonagh",
              givenName: "Martin",
            },
            review: {
              reviewRating: {
                ratingValue: 4.5,
                bestRating: 5,
              },
              author: "Michael Chen",
              reviewBody:
                "A darkly comic tale of friendship's end on a remote Irish island. Colin Farrell and Brendan Gleeson deliver career-best performances.",
              datePublished: "2024-10-25",
            },
            aggregateRating: {
              ratingValue: 87,
              bestRating: 100,
              ratingCount: 45678,
            },
          },
          {
            name: "Top Gun: Maverick & Special IMAX Edition",
            url: "https://example.com/movies/top-gun-maverick",
            image: [
              "https://example.com/photos/6x9/top-gun-poster.jpg",
              "https://example.com/photos/16x9/top-gun-hero.jpg",
            ],
            dateCreated: "2024-05-27",
            director: "Joseph Kosinski",
            review: {
              reviewRating: {
                ratingValue: 4,
              },
              author: {
                name: "Alex Rivera",
              },
            },
            aggregateRating: {
              ratingValue: 92,
              bestRating: 100,
              ratingCount: 234567,
            },
          },
        ]}
        scriptId="movie-carousel-advanced"
        scriptKey="movie-carousel-key-advanced"
      />

      <div className="prose lg:prose-xl">
        <h1>Movie Carousel - Advanced Features</h1>
        <p>
          This page demonstrates all available features of the
          MovieCarouselJsonLd component, including:
        </p>
        <ul>
          <li>Multiple image formats with ImageObject details</li>
          <li>Complete director information with Person properties</li>
          <li>Full review data with ratings and review body</li>
          <li>Comprehensive aggregate ratings</li>
          <li>Custom scriptId and scriptKey</li>
          <li>Special characters in titles</li>
        </ul>

        <h2>Featured Movies</h2>

        <div className="space-y-8">
          <div id="everything-everywhere" className="border-b pb-6">
            <h3>Everything Everywhere All at Once</h3>
            <p className="text-gray-600">Released: March 25, 2024</p>
            <p>Directors: Daniel Kwan and Daniel Scheinert</p>
            <p>
              <strong>Rating:</strong> 95/100 (125,432 ratings, 8,956 reviews)
            </p>
            <blockquote className="italic border-l-4 pl-4">
              "A mind-bending masterpiece that explores the multiverse with
              heart, humor, and incredible creativity. The performances are
              outstanding."
              <footer className="text-sm text-gray-600">
                — Sarah Johnson, March 30, 2024
              </footer>
            </blockquote>
          </div>

          <div id="banshees-inisherin" className="border-b pb-6">
            <h3>The Banshees of Inisherin</h3>
            <p className="text-gray-600">Released: October 21, 2024</p>
            <p>Director: Martin McDonagh</p>
            <p>
              <strong>Rating:</strong> 87/100 (45,678 ratings)
            </p>
            <blockquote className="italic border-l-4 pl-4">
              "A darkly comic tale of friendship's end on a remote Irish island.
              Colin Farrell and Brendan Gleeson deliver career-best
              performances."
              <footer className="text-sm text-gray-600">
                — Michael Chen, October 25, 2024
              </footer>
            </blockquote>
          </div>

          <div id="top-gun-maverick" className="border-b pb-6">
            <h3>Top Gun: Maverick & Special IMAX Edition</h3>
            <p className="text-gray-600">Released: May 27, 2024</p>
            <p>Director: Joseph Kosinski</p>
            <p>
              <strong>Rating:</strong> 92/100 (234,567 ratings)
            </p>
            <p className="italic">
              After more than 30 years of service, Pete "Maverick" Mitchell
              continues to push the envelope as a top naval aviator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
