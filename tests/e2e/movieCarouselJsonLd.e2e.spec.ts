import { test, expect } from "@playwright/test";

test.describe("MovieCarouselJsonLd", () => {
  test("renders summary page pattern with URLs only", async ({ page }) => {
    await page.goto("/movie-carousel-summary");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(5);

    // Verify first item
    expect(jsonData.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      url: "https://example.com/movies/a-star-is-born",
    });

    // Verify last item
    expect(jsonData.itemListElement[4]).toEqual({
      "@type": "ListItem",
      position: 5,
      url: "https://example.com/movies/the-favourite",
    });
  });

  test("renders all-in-one page pattern with full movie data", async ({
    page,
  }) => {
    await page.goto("/movie-carousel");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(3);

    // Verify first movie
    const firstMovie = jsonData.itemListElement[0];
    expect(firstMovie["@type"]).toBe("ListItem");
    expect(firstMovie.position).toBe(1);
    expect(firstMovie.item).toBeTruthy();
    expect(firstMovie.item["@type"]).toBe("Movie");
    expect(firstMovie.item.name).toBe("A Star Is Born");
    expect(firstMovie.item.image).toBe(
      "https://example.com/photos/6x9/star-is-born.jpg",
    );
    expect(firstMovie.item.dateCreated).toBe("2024-10-05");
    expect(firstMovie.item.director).toEqual({
      "@type": "Person",
      name: "Bradley Cooper",
    });

    // Verify review
    expect(firstMovie.item.review).toEqual({
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

    // Verify aggregate rating
    expect(firstMovie.item.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 90,
      bestRating: 100,
      ratingCount: 19141,
    });
  });

  test("renders advanced features including multiple images and complete data", async ({
    page,
  }) => {
    await page.goto("/movie-carousel-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify custom script ID
    const scriptElement = await page.locator(
      'script[type="application/ld+json"]',
    );
    const scriptId = await scriptElement.getAttribute("id");
    expect(scriptId).toBe("movie-carousel-advanced");

    // Verify first movie with advanced features
    const firstMovie = jsonData.itemListElement[0].item;
    expect(firstMovie.name).toBe("Everything Everywhere All at Once");
    expect(firstMovie.url).toBe(
      "https://example.com/movies/everything-everywhere",
    );

    // Verify multiple images with ImageObject
    expect(Array.isArray(firstMovie.image)).toBe(true);
    expect(firstMovie.image).toHaveLength(4);
    expect(firstMovie.image[0]).toBe(
      "https://example.com/photos/1x1/eeaao.jpg",
    );
    expect(firstMovie.image[1]).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/photos/4x3/eeaao.jpg",
      width: 1200,
      height: 900,
    });
    expect(firstMovie.image[3]).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/photos/6x9/eeaao.jpg",
      width: 600,
      height: 900,
      caption: "Official movie poster",
    });

    // Verify director with URL
    expect(firstMovie.director).toEqual({
      "@type": "Person",
      name: "Daniel Kwan and Daniel Scheinert",
      url: "https://example.com/directors/daniels",
    });

    // Verify complete review with all properties
    expect(firstMovie.review).toEqual({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: "Sarah Johnson",
        url: "https://example.com/reviewers/sarah-johnson",
      },
      reviewBody:
        "A mind-bending masterpiece that explores the multiverse with heart, humor, and incredible creativity. The performances are outstanding.",
      datePublished: "2024-03-30",
    });

    // Verify comprehensive aggregate rating
    expect(firstMovie.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 95,
      bestRating: 100,
      worstRating: 0,
      ratingCount: 125432,
      reviewCount: 8956,
    });
  });

  test("processes different director formats correctly", async ({ page }) => {
    await page.goto("/movie-carousel-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // String director
    const thirdMovie = jsonData.itemListElement[2].item;
    expect(thirdMovie.director).toEqual({
      "@type": "Person",
      name: "Joseph Kosinski",
    });

    // Person object with additional properties
    const secondMovie = jsonData.itemListElement[1].item;
    expect(secondMovie.director).toEqual({
      "@type": "Person",
      name: "Martin McDonagh",
      url: "https://example.com/directors/martin-mcdonagh",
      familyName: "McDonagh",
      givenName: "Martin",
    });
  });
});
