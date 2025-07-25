import { MovieCarouselJsonLd } from "next-seo";

export default function MovieCarouselPage() {
  return (
    <div className="container mx-auto p-8">
      <MovieCarouselJsonLd
        movies={[
          {
            name: "A Star Is Born",
            image: "https://example.com/photos/6x9/star-is-born.jpg",
            dateCreated: "2024-10-05",
            director: "Bradley Cooper",
            review: {
              reviewRating: {
                ratingValue: 5,
              },
              author: "John D.",
            },
            aggregateRating: {
              ratingValue: 90,
              bestRating: 100,
              ratingCount: 19141,
            },
          },
          {
            name: "Bohemian Rhapsody",
            image: "https://example.com/photos/6x9/bohemian-rhapsody.jpg",
            dateCreated: "2024-11-02",
            director: "Bryan Singer",
            review: {
              reviewRating: {
                ratingValue: 3,
              },
              author: "Vin S.",
            },
            aggregateRating: {
              ratingValue: 61,
              bestRating: 100,
              ratingCount: 21985,
            },
          },
          {
            name: "Black Panther",
            image: "https://example.com/photos/6x9/black-panther.jpg",
            dateCreated: "2024-02-16",
            director: "Ryan Coogler",
            review: {
              reviewRating: {
                ratingValue: 2,
              },
              author: "Trevor R.",
            },
            aggregateRating: {
              ratingValue: 96,
              bestRating: 100,
              ratingCount: 88211,
            },
          },
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>Movie Carousel - All-in-One Page Pattern</h1>
        <p>
          This page demonstrates the all-in-one page pattern for movie
          carousels, where all movie information is contained on this single
          page.
        </p>

        <h2>Best Picture Nominees 2024</h2>

        <div className="space-y-8">
          <div id="a-star-is-born" className="border-b pb-6">
            <h3>A Star Is Born</h3>
            <p>Release Date: October 5, 2024</p>
            <p>Director: Bradley Cooper</p>
            <p>Rating: 90/100 (19,141 reviews)</p>
            <p>
              A musician helps a young singer find fame as age and alcoholism
              send his own career into a downward spiral.
            </p>
          </div>

          <div id="bohemian-rhapsody" className="border-b pb-6">
            <h3>Bohemian Rhapsody</h3>
            <p>Release Date: November 2, 2024</p>
            <p>Director: Bryan Singer</p>
            <p>Rating: 61/100 (21,985 reviews)</p>
            <p>
              The story of the legendary British rock band Queen and lead singer
              Freddie Mercury, leading up to their famous performance at Live
              Aid.
            </p>
          </div>

          <div id="black-panther" className="border-b pb-6">
            <h3>Black Panther</h3>
            <p>Release Date: February 16, 2024</p>
            <p>Director: Ryan Coogler</p>
            <p>Rating: 96/100 (88,211 reviews)</p>
            <p>
              T'Challa, heir to the hidden but advanced kingdom of Wakanda, must
              step forward to lead his people into a new future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
