import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CarouselJsonLd from "./CarouselJsonLd";

describe("CarouselJsonLd", () => {
  // Summary Page Pattern Tests
  describe("Summary Page Pattern", () => {
    it("renders ItemList with URLs only (string array)", () => {
      const { container } = render(
        <CarouselJsonLd
          urls={[
            "https://example.com/page1",
            "https://example.com/page2",
            "https://example.com/page3",
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
            url: "https://example.com/page1",
          },
          {
            "@type": "ListItem",
            position: 2,
            url: "https://example.com/page2",
          },
          {
            "@type": "ListItem",
            position: 3,
            url: "https://example.com/page3",
          },
        ],
      });
    });

    it("renders ItemList with URLs and custom positions", () => {
      const { container } = render(
        <CarouselJsonLd
          urls={[
            { url: "https://example.com/page1", position: 5 },
            "https://example.com/page2",
            { url: "https://example.com/page3", position: 10 },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.itemListElement[0].position).toBe(5);
      expect(jsonData.itemListElement[1].position).toBe(2);
      expect(jsonData.itemListElement[2].position).toBe(10);
    });

    it("uses custom scriptId and scriptKey", () => {
      const { container } = render(
        <CarouselJsonLd
          urls={["https://example.com/page1"]}
          scriptId="custom-id"
          scriptKey="custom-key"
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script?.getAttribute("id")).toBe("custom-id");
      expect(script?.getAttribute("data-testid")).toBe("custom-id");
    });
  });

  // Course Carousel Tests
  describe("Course Carousel", () => {
    it("renders Course carousel with minimal props", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Course"
          items={[
            {
              name: "Introduction to React",
              description: "Learn the basics of React",
            },
            {
              name: "Advanced TypeScript",
              description: "Master TypeScript features",
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData["@type"]).toBe("ItemList");
      expect(jsonData.itemListElement).toHaveLength(2);
      expect(jsonData.itemListElement[0]).toEqual({
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Course",
          name: "Introduction to React",
          description: "Learn the basics of React",
        },
      });
    });

    it("renders Course carousel with provider", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Course"
          items={[
            {
              name: "Web Development",
              description: "Full stack web development",
              url: "https://example.com/course/web-dev",
              provider: "Tech Academy",
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement[0].item.provider).toEqual({
        "@type": "Organization",
        name: "Tech Academy",
      });
    });
  });

  // Movie Carousel Tests
  describe("Movie Carousel", () => {
    it("renders Movie carousel with minimal props", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Movie"
          items={[
            {
              name: "The Matrix",
              image: "https://example.com/matrix.jpg",
            },
            {
              name: "Inception",
              image: [
                "https://example.com/inception1.jpg",
                "https://example.com/inception2.jpg",
              ],
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.itemListElement).toHaveLength(2);
      expect(jsonData.itemListElement[0].item["@type"]).toBe("Movie");
      expect(jsonData.itemListElement[0].item.name).toBe("The Matrix");
      expect(jsonData.itemListElement[0].item.image).toBe(
        "https://example.com/matrix.jpg",
      );
    });

    it("renders Movie carousel with director and reviews", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Movie"
          items={[
            {
              name: "The Dark Knight",
              image: "https://example.com/dark-knight.jpg",
              director: "Christopher Nolan",
              review: {
                reviewRating: {
                  ratingValue: 5,
                },
                author: "Movie Critic",
              },
              aggregateRating: {
                ratingValue: 9.0,
                ratingCount: 1000,
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
      expect(movie.director).toEqual({
        "@type": "Person",
        name: "Christopher Nolan",
      });
      expect(movie.review["@type"]).toBe("Review");
      expect(movie.aggregateRating["@type"]).toBe("AggregateRating");
    });
  });

  // Recipe Carousel Tests
  describe("Recipe Carousel", () => {
    it("renders Recipe carousel with minimal props", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Recipe"
          items={[
            {
              name: "Chocolate Chip Cookies",
              image: "https://example.com/cookies.jpg",
            },
            {
              name: "Banana Bread",
              image: {
                url: "https://example.com/banana-bread.jpg",
                width: 800,
                height: 600,
              },
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.itemListElement).toHaveLength(2);
      expect(jsonData.itemListElement[0].item["@type"]).toBe("Recipe");
      expect(jsonData.itemListElement[0].item.name).toBe(
        "Chocolate Chip Cookies",
      );
    });

    it("renders Recipe carousel with full details", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Recipe"
          items={[
            {
              name: "Perfect Pancakes",
              image: "https://example.com/pancakes.jpg",
              description: "Fluffy and delicious pancakes",
              author: "Chef John",
              datePublished: "2024-01-01",
              prepTime: "PT10M",
              cookTime: "PT15M",
              totalTime: "PT25M",
              recipeYield: 4,
              recipeCategory: "Breakfast",
              recipeCuisine: "American",
              recipeIngredient: ["2 cups flour", "2 eggs", "1 cup milk"],
              recipeInstructions: [
                "Mix dry ingredients",
                "Add wet ingredients",
                "Cook on griddle",
              ],
              nutrition: {
                calories: "250 calories",
                proteinContent: "8g",
              },
              aggregateRating: {
                ratingValue: 4.5,
                ratingCount: 100,
              },
              keywords: "pancakes, breakfast, easy",
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      const recipe = jsonData.itemListElement[0].item;
      expect(recipe.author).toEqual({
        "@type": "Person",
        name: "Chef John",
      });
      expect(recipe.nutrition["@type"]).toBe("NutritionInformation");
      expect(recipe.recipeInstructions).toEqual([
        "Mix dry ingredients",
        "Add wet ingredients",
        "Cook on griddle",
      ]);
    });

    it("handles complex recipe instructions", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Recipe"
          items={[
            {
              name: "Complex Recipe",
              image: "https://example.com/recipe.jpg",
              recipeInstructions: [
                { text: "Step 1: Prepare ingredients" },
                {
                  name: "Cooking Phase",
                  itemListElement: [
                    { text: "Heat the oven" },
                    { text: "Mix ingredients" },
                  ],
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

      const instructions = jsonData.itemListElement[0].item.recipeInstructions;
      expect(instructions[0]["@type"]).toBe("HowToStep");
      expect(instructions[1]["@type"]).toBe("HowToSection");
      expect(instructions[1].itemListElement[0]["@type"]).toBe("HowToStep");
    });
  });

  // Restaurant Carousel Tests
  describe("Restaurant Carousel", () => {
    it("renders Restaurant carousel with minimal props", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Restaurant"
          items={[
            {
              name: "Joe's Pizza",
              address: "123 Pizza St",
            },
            {
              name: "Thai Palace",
              address: "456 Thai Ave",
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.itemListElement).toHaveLength(2);
      expect(jsonData.itemListElement[0].item["@type"]).toBe("Restaurant");
      expect(jsonData.itemListElement[0].item.name).toBe("Joe's Pizza");
    });

    it("renders Restaurant carousel with full details", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Restaurant"
          items={[
            {
              name: "Fine Dining Restaurant",
              address: "123 Main St, New York, NY 10001",
              telephone: "+1-212-555-0100",
              url: "https://example.com/restaurant",
              image: "https://example.com/restaurant.jpg",
              priceRange: "$$$",
              servesCuisine: ["Italian", "Mediterranean"],
              menu: "https://example.com/menu",
              geo: {
                latitude: 40.7128,
                longitude: -74.006,
              },
              openingHoursSpecification: [
                {
                  dayOfWeek: "Monday",
                  opens: "11:00",
                  closes: "22:00",
                },
              ],
              aggregateRating: {
                ratingValue: 4.7,
                ratingCount: 250,
              },
              review: {
                reviewRating: { ratingValue: 5 },
                author: "Food Critic",
                reviewBody: "Excellent food and service",
              },
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      const restaurant = jsonData.itemListElement[0].item;
      expect(restaurant.address).toBe("123 Main St, New York, NY 10001");
      expect(restaurant.geo["@type"]).toBe("GeoCoordinates");
      expect(restaurant.openingHoursSpecification[0]["@type"]).toBe(
        "OpeningHoursSpecification",
      );
      expect(restaurant.review["@type"]).toBe("Review");
    });

    it("handles complex address formats", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Restaurant"
          items={[
            {
              name: "International Restaurant",
              address: {
                streetAddress: "456 Oak Avenue",
                addressLocality: "San Francisco",
                addressRegion: "CA",
                postalCode: "94102",
                addressCountry: "US",
              },
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      const address = jsonData.itemListElement[0].item.address;
      expect(address["@type"]).toBe("PostalAddress");
      expect(address.streetAddress).toBe("456 Oak Avenue");
      expect(address.addressLocality).toBe("San Francisco");
    });
  });

  // Edge Cases and Error Handling
  describe("Edge Cases", () => {
    it("handles empty URLs array", () => {
      const { container } = render(<CarouselJsonLd urls={[]} />);

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement).toEqual([]);
    });

    it("handles empty items array", () => {
      const { container } = render(
        <CarouselJsonLd contentType="Course" items={[]} />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      expect(jsonData.itemListElement).toEqual([]);
    });

    it("handles mixed image formats in Recipe", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Recipe"
          items={[
            {
              name: "Multi-Image Recipe",
              image: [
                "https://example.com/image1.jpg",
                {
                  url: "https://example.com/image2.jpg",
                  width: 800,
                  height: 600,
                },
                "https://example.com/image3.jpg",
              ],
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      const images = jsonData.itemListElement[0].item.image;
      expect(images).toHaveLength(3);
      expect(images[0]).toBe("https://example.com/image1.jpg");
      expect(images[1]["@type"]).toBe("ImageObject");
    });

    it("handles simple author in Recipe", () => {
      const { container } = render(
        <CarouselJsonLd
          contentType="Recipe"
          items={[
            {
              name: "Collaborative Recipe",
              image: "https://example.com/recipe.jpg",
              author: "Chef Alice",
            },
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);

      const author = jsonData.itemListElement[0].item.author;
      expect(author).toEqual({
        "@type": "Person",
        name: "Chef Alice",
      });
    });
  });
});
