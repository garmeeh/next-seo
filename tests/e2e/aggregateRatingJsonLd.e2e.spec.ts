import { test, expect } from "@playwright/test";

test.describe("AggregateRatingJsonLd", () => {
  test("renders basic aggregate rating for product", async ({ page }) => {
    await page.goto("/aggregate-rating");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("AggregateRating");
    expect(jsonData.itemReviewed).toEqual({
      "@type": "Product",
      name: "Executive Anvil",
    });
    expect(jsonData.ratingValue).toBe(4.4);
    expect(jsonData.ratingCount).toBe(89);
  });

  test("renders restaurant aggregate rating with percentage scale", async ({
    page,
  }) => {
    await page.goto("/aggregate-rating-restaurant");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("AggregateRating");
    expect(jsonData.itemReviewed).toMatchObject({
      "@type": "LocalBusiness",
      name: "Legal Seafood",
      servesCuisine: "Seafood",
      priceRange: "$$$",
      telephone: "1234567",
    });

    // Check address is properly formatted
    expect(jsonData.itemReviewed.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "123 William St",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10038",
      addressCountry: "US",
    });

    // Check percentage-based rating
    expect(jsonData.ratingValue).toBe(88);
    expect(jsonData.bestRating).toBe(100);
    expect(jsonData.ratingCount).toBe(350);
  });

  test("renders aggregate rating nested in product", async ({ page }) => {
    await page.goto("/review-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Product should have nested aggregateRating
    expect(jsonData["@type"]).toBe("Product");
    expect(jsonData.aggregateRating).toBeDefined();
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.2,
      bestRating: 5,
      ratingCount: 150,
      reviewCount: 120,
    });
  });

  test("supports both ratingCount and reviewCount", async ({ page }) => {
    await page.goto("/review-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    const aggregateRating = jsonData.aggregateRating;

    // Should have both ratingCount and reviewCount
    expect(aggregateRating.ratingCount).toBe(150);
    expect(aggregateRating.reviewCount).toBe(120);
  });

  test("properly handles various rating scales", async ({ page }) => {
    // Test default 1-5 scale
    await page.goto("/aggregate-rating");
    let jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    let jsonData = JSON.parse(jsonLdScript!);

    // Default scale (no bestRating/worstRating specified means 1-5)
    expect(jsonData.ratingValue).toBe(4.4);
    expect(jsonData.bestRating).toBeUndefined(); // Not specified, defaults to 5
    expect(jsonData.worstRating).toBeUndefined(); // Not specified, defaults to 1

    // Test percentage scale (0-100)
    await page.goto("/aggregate-rating-restaurant");
    jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData.ratingValue).toBe(88);
    expect(jsonData.bestRating).toBe(100);
    expect(jsonData.worstRating).toBeUndefined(); // Can be undefined for 0-100 scale
  });
});
