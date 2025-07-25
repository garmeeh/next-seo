import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieCarouselJsonLd from "./MovieCarouselJsonLd";

describe("MovieCarouselJsonLd", () => {
  describe("Summary Page Pattern", () => {
    it("renders basic summary page with string URLs", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          urls={[
            "https://example.com/movie1",
            "https://example.com/movie2",
            "https://example.com/movie3",
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData).toEqual({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url: "https://example.com/movie1",
          },
          {
            "@type": "ListItem",
            position: 2,
            url: "https://example.com/movie2",
          },
          {
            "@type": "ListItem",
            position: 3,
            url: "https://example.com/movie3",
          },
        ],
      });
    });

    it("renders summary page with object URLs and custom positions", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          urls={[
            { url: "https://example.com/movie1", position: 3 },
            { url: "https://example.com/movie2", position: 1 },
            { url: "https://example.com/movie3", position: 2 },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].position).toBe(3);
      expect(jsonData.itemListElement[1].position).toBe(1);
      expect(jsonData.itemListElement[2].position).toBe(2);
    });

    it("renders summary page with mixed URL formats", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          urls={[
            "https://example.com/movie1",
            { url: "https://example.com/movie2", position: 5 },
            "https://example.com/movie3",
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].position).toBe(1);
      expect(jsonData.itemListElement[1].position).toBe(5);
      expect(jsonData.itemListElement[2].position).toBe(3);
    });
  });

  describe("All-in-One Page Pattern", () => {
    it("renders basic all-in-one page with minimal movie data", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          movies={[
            {
              name: "A Star Is Born",
              image: "https://example.com/star-is-born.jpg",
            },
            {
              name: "Bohemian Rhapsody",
              image: "https://example.com/bohemian.jpg",
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData).toEqual({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Movie",
              name: "A Star Is Born",
              image: "https://example.com/star-is-born.jpg",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Movie",
              name: "Bohemian Rhapsody",
              image: "https://example.com/bohemian.jpg",
            },
          },
        ],
      });
    });

    it("handles string director and converts to Person", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          movies={[
            {
              name: "A Star Is Born",
              image: "https://example.com/star-is-born.jpg",
              director: "Bradley Cooper",
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].item.director).toEqual({
        "@type": "Person",
        name: "Bradley Cooper",
      });
    });

    it("handles director as Person object without @type", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          movies={[
            {
              name: "A Star Is Born",
              image: "https://example.com/star-is-born.jpg",
              director: {
                name: "Bradley Cooper",
                url: "https://example.com/bradley-cooper",
              },
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].item.director).toEqual({
        "@type": "Person",
        name: "Bradley Cooper",
        url: "https://example.com/bradley-cooper",
      });
    });

    it("handles multiple images as array", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          movies={[
            {
              name: "Black Panther",
              image: [
                "https://example.com/black-panther-1.jpg",
                {
                  url: "https://example.com/black-panther-2.jpg",
                  width: 1200,
                  height: 1800,
                },
              ],
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].item.image).toEqual([
        "https://example.com/black-panther-1.jpg",
        {
          "@type": "ImageObject",
          url: "https://example.com/black-panther-2.jpg",
          width: 1200,
          height: 1800,
        },
      ]);
    });

    it("handles review with rating", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          movies={[
            {
              name: "A Star Is Born",
              image: "https://example.com/star-is-born.jpg",
              review: {
                reviewRating: {
                  ratingValue: 5,
                },
                author: "John D.",
              },
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].item.review).toEqual({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
        },
        author: {
          "@type": "Person",
          name: "John D.",
        },
      });
    });

    it("handles aggregateRating", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          movies={[
            {
              name: "Black Panther",
              image: "https://example.com/black-panther.jpg",
              aggregateRating: {
                ratingValue: 96,
                bestRating: 100,
                ratingCount: 88211,
              },
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].item.aggregateRating).toEqual({
        "@type": "AggregateRating",
        ratingValue: 96,
        bestRating: 100,
        ratingCount: 88211,
      });
    });

    it("handles all optional properties", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          movies={[
            {
              name: "A Star Is Born",
              image: "https://example.com/star-is-born.jpg",
              url: "https://example.com/movies/a-star-is-born",
              dateCreated: "2024-10-05",
              director: "Bradley Cooper",
              review: {
                reviewRating: {
                  ratingValue: 5,
                },
                author: {
                  name: "John D.",
                },
              },
              aggregateRating: {
                ratingValue: 90,
                bestRating: 100,
                ratingCount: 19141,
              },
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      const movie = jsonData.itemListElement[0].item;

      expect(movie["@type"]).toBe("Movie");
      expect(movie.name).toBe("A Star Is Born");
      expect(movie.image).toBe("https://example.com/star-is-born.jpg");
      expect(movie.url).toBe("https://example.com/movies/a-star-is-born");
      expect(movie.dateCreated).toBe("2024-10-05");
      expect(movie.director).toEqual({
        "@type": "Person",
        name: "Bradley Cooper",
      });
      expect(movie.review).toEqual({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
        },
        author: {
          "@type": "Person",
          name: "John D.",
        },
      });
      expect(movie.aggregateRating).toEqual({
        "@type": "AggregateRating",
        ratingValue: 90,
        bestRating: 100,
        ratingCount: 19141,
      });
    });

    it("uses custom scriptId and scriptKey", () => {
      const { container } = render(
        <MovieCarouselJsonLd
          scriptId="custom-movie-id"
          scriptKey="custom-movie-key"
          urls={["https://example.com/movie1"]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script?.getAttribute("id")).toBe("custom-movie-id");
      // Note: scriptKey is internal to JsonLdScript component
    });
  });
});
