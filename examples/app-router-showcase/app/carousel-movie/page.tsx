import { CarouselJsonLd } from "next-seo";

export default function CarouselMoviePage() {
  return (
    <div className="container mx-auto p-8">
      <CarouselJsonLd
        contentType="Movie"
        items={[
          {
            name: "The Matrix",
            image: [
              "https://example.com/matrix-poster.jpg",
              "https://example.com/matrix-wide.jpg",
            ],
            url: "https://example.com/movies/the-matrix",
            dateCreated: "1999-03-31",
            director: "The Wachowskis",
            aggregateRating: {
              ratingValue: 8.7,
              bestRating: 10,
              ratingCount: 1897563,
            },
            review: {
              reviewRating: { ratingValue: 9 },
              author: "Film Critic Daily",
              reviewBody:
                "A groundbreaking sci-fi masterpiece that redefined action cinema",
            },
          },
          {
            name: "Inception",
            image: "https://example.com/inception-poster.jpg",
            url: "https://example.com/movies/inception",
            dateCreated: "2010-07-16",
            director: {
              name: "Christopher Nolan",
              url: "https://example.com/directors/nolan",
            },
            aggregateRating: {
              ratingValue: 8.8,
              bestRating: 10,
              ratingCount: 2432198,
            },
          },
          {
            name: "Interstellar",
            image: [
              "https://example.com/interstellar-poster.jpg",
              "https://example.com/interstellar-banner.jpg",
              "https://example.com/interstellar-square.jpg",
            ],
            dateCreated: "2014-11-07",
            director: "Christopher Nolan",
            review: {
              reviewRating: {
                ratingValue: 5,
                bestRating: 5,
              },
              author: {
                name: "Space & Science Review",
              },
              reviewBody:
                "A visually stunning and emotionally powerful journey through space and time",
            },
            aggregateRating: {
              ratingValue: 8.6,
              ratingCount: 1892456,
            },
          },
          {
            name: "Blade Runner 2049",
            image: "https://example.com/blade-runner-2049.jpg",
            url: "https://example.com/movies/blade-runner-2049",
            dateCreated: "2017-10-06",
            director: "Denis Villeneuve",
            aggregateRating: {
              ratingValue: 8.0,
              ratingCount: 673421,
            },
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Movie Carousel Example</h1>

      <div className="prose lg:prose-xl">
        <p>
          Discover the best sci-fi movies that have defined the genre and
          captivated audiences worldwide.
        </p>

        <h2>Top Sci-Fi Movies</h2>

        <div className="grid gap-6 mt-6">
          <div className="border p-6 rounded-lg shadow flex gap-6">
            <div className="w-32 h-48 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">The Matrix</h3>
              <p className="text-gray-600 mt-2">
                A computer hacker learns about the true nature of reality and
                his role in the war against its controllers.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Director: The Wachowskis | Released: 1999
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-yellow-500">★ 8.7/10</span>
                <span className="text-gray-500 text-sm">(1.9M ratings)</span>
              </div>
              <a
                href="https://example.com/movies/the-matrix"
                className="text-blue-600 mt-4 inline-block"
              >
                Watch Now →
              </a>
            </div>
          </div>

          <div className="border p-6 rounded-lg shadow flex gap-6">
            <div className="w-32 h-48 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Inception</h3>
              <p className="text-gray-600 mt-2">
                A thief who steals corporate secrets through dream-sharing
                technology is given the inverse task of planting an idea.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Director: Christopher Nolan | Released: 2010
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-yellow-500">★ 8.8/10</span>
                <span className="text-gray-500 text-sm">(2.4M ratings)</span>
              </div>
              <a
                href="https://example.com/movies/inception"
                className="text-blue-600 mt-4 inline-block"
              >
                Watch Now →
              </a>
            </div>
          </div>

          <div className="border p-6 rounded-lg shadow flex gap-6">
            <div className="w-32 h-48 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Interstellar</h3>
              <p className="text-gray-600 mt-2">
                A team of explorers travel through a wormhole in space in an
                attempt to ensure humanity's survival.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Director: Christopher Nolan | Released: 2014
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-yellow-500">★ 8.6/10</span>
                <span className="text-gray-500 text-sm">(1.9M ratings)</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                Watch Trailer
              </button>
            </div>
          </div>

          <div className="border p-6 rounded-lg shadow flex gap-6">
            <div className="w-32 h-48 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Blade Runner 2049</h3>
              <p className="text-gray-600 mt-2">
                A young blade runner's discovery of a long-buried secret leads
                him to track down former blade runner Rick Deckard.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Director: Denis Villeneuve | Released: 2017
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-yellow-500">★ 8.0/10</span>
                <span className="text-gray-500 text-sm">(673K ratings)</span>
              </div>
              <a
                href="https://example.com/movies/blade-runner-2049"
                className="text-blue-600 mt-4 inline-block"
              >
                Watch Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
