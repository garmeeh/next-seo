import { MovieCarouselJsonLd } from "next-seo";

export default function MovieCarouselSummaryPage() {
  return (
    <div className="container mx-auto p-8">
      <MovieCarouselJsonLd
        urls={[
          "https://example.com/movies/a-star-is-born",
          "https://example.com/movies/bohemian-rhapsody",
          "https://example.com/movies/black-panther",
          "https://example.com/movies/green-book",
          "https://example.com/movies/the-favourite",
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>Movie Carousel - Summary Page Pattern</h1>
        <p>
          This page demonstrates the summary page pattern for movie carousels,
          where each movie has its own detail page.
        </p>

        <h2>Best Picture Nominees 2024</h2>
        <ul>
          <li>
            <a href="https://example.com/movies/a-star-is-born">
              A Star Is Born
            </a>
          </li>
          <li>
            <a href="https://example.com/movies/bohemian-rhapsody">
              Bohemian Rhapsody
            </a>
          </li>
          <li>
            <a href="https://example.com/movies/black-panther">Black Panther</a>
          </li>
          <li>
            <a href="https://example.com/movies/green-book">Green Book</a>
          </li>
          <li>
            <a href="https://example.com/movies/the-favourite">The Favourite</a>
          </li>
        </ul>

        <p>
          In this pattern, each movie URL points to a separate page with full
          details about that movie.
        </p>
      </div>
    </div>
  );
}
