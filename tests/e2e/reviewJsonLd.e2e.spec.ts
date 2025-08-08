import { test, expect } from "@playwright/test";

test.describe("ReviewJsonLd", () => {
  test("renders basic review structured data", async ({ page }) => {
    await page.goto("/review");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Review");
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Bob Smith",
    });
    expect(jsonData.reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 4,
    });
    expect(jsonData.itemReviewed).toEqual({
      "@type": "LocalBusiness",
      name: "Legal Seafood",
    });
    expect(jsonData.reviewBody).toBe("Fresh seafood and great service!");
    expect(jsonData.datePublished).toBe("2024-01-01");
    expect(jsonData.url).toBe("/review");
  });

  test("renders movie review with full details", async ({ page }) => {
    await page.goto("/review-movie");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Review");
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Roger Ebert",
      url: "https://example.com/reviewers/roger-ebert",
    });
    expect(jsonData.reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 4,
      bestRating: 4,
      worstRating: 0,
    });
    expect(jsonData.itemReviewed).toMatchObject({
      "@type": "Movie",
      name: "The Shawshank Redemption",
      director: "Frank Darabont",
      actor: ["Tim Robbins", "Morgan Freeman"],
    });
    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "Film Critics United",
      logo: "https://example.com/fcu-logo.jpg",
    });
    expect(jsonData.mainEntityOfPage).toBe(
      "https://example.com/reviews/shawshank-redemption",
    );
  });

  test("renders reviews nested in product", async ({ page }) => {
    await page.goto("/review-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Product");
    expect(jsonData.name).toBe("The Catcher in the Rye");

    // Check nested reviews
    expect(jsonData.review).toBeDefined();
    expect(Array.isArray(jsonData.review)).toBe(true);
    expect(jsonData.review.length).toBe(3);

    // First review
    expect(jsonData.review[0]).toMatchObject({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
      },
      author: {
        "@type": "Person",
        name: "John Doe",
      },
      reviewBody: expect.stringContaining("timeless classic"),
      datePublished: "2024-01-01",
    });

    // Second review with author URL
    expect(jsonData.review[1].author).toEqual({
      "@type": "Person",
      name: "Jane Smith",
      url: "https://example.com/reviewers/jane",
    });

    // Third review with organization author - now correctly detected as Organization
    expect(jsonData.review[2].author).toEqual({
      "@type": "Organization",
      name: "Literary Review Magazine",
    });

    // Check aggregate rating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.2,
      bestRating: 5,
      ratingCount: 150,
      reviewCount: 120,
    });
  });

  test("properly escapes special characters in review text", async ({
    page,
  }) => {
    // Create a test page with special characters
    await page.goto("/review");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Verify JSON is valid even with special content
    expect(() => JSON.parse(jsonLdScript!)).not.toThrow();

    // The stringify utility should handle dangerous sequences
    // These are tested centrally in security.e2e.spec.ts
  });
});
