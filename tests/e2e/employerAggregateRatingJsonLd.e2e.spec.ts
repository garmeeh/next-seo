import { test, expect } from "@playwright/test";

test.describe("EmployerAggregateRatingJsonLd", () => {
  test("renders basic EmployerAggregateRating structured data", async ({
    page,
  }) => {
    await page.goto("/employer-aggregate-rating");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("EmployerAggregateRating");
    expect(jsonData.itemReviewed).toEqual({
      "@type": "Organization",
      name: "World's Best Coffee Shop",
    });
    expect(jsonData.ratingValue).toBe(91);
    expect(jsonData.ratingCount).toBe(10561);
    expect(jsonData.reviewCount).toBeUndefined();
    expect(jsonData.bestRating).toBeUndefined();
    expect(jsonData.worstRating).toBeUndefined();
  });

  test("renders advanced EmployerAggregateRating with full Organization details", async ({
    page,
  }) => {
    await page.goto("/employer-aggregate-rating-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("EmployerAggregateRating");

    // Verify organization details
    expect(jsonData.itemReviewed["@type"]).toBe("Organization");
    expect(jsonData.itemReviewed.name).toBe("TechCorp International");
    expect(jsonData.itemReviewed.sameAs).toBe(
      "https://www.techcorp-international.example.com",
    );
    expect(jsonData.itemReviewed.url).toBe(
      "https://www.techcorp-international.example.com",
    );
    expect(jsonData.itemReviewed.logo).toEqual({
      url: "https://example.com/techcorp-logo.png",
      width: 600,
      height: 300,
    });
    expect(jsonData.itemReviewed.description).toBe(
      "Leading technology company specializing in cloud solutions and AI",
    );
    expect(jsonData.itemReviewed.telephone).toBe("+1-555-123-4567");
    expect(jsonData.itemReviewed.email).toBe("careers@techcorp.example.com");

    // Verify addresses
    expect(jsonData.itemReviewed.address).toHaveLength(2);
    expect(jsonData.itemReviewed.address[0]).toEqual({
      streetAddress: "123 Innovation Way",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105",
      addressCountry: "US",
    });
    expect(jsonData.itemReviewed.address[1]).toEqual({
      streetAddress: "456 Tech Park",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    });

    // Verify numberOfEmployees
    expect(jsonData.itemReviewed.numberOfEmployees).toEqual({
      value: 5000,
    });

    // Verify ratings
    expect(jsonData.ratingValue).toBe(4.7);
    expect(jsonData.ratingCount).toBe(1842);
    expect(jsonData.reviewCount).toBe(1755);
    expect(jsonData.bestRating).toBe(5);
    expect(jsonData.worstRating).toBe(1);
  });

  test("renders custom scale EmployerAggregateRating with percentage", async ({
    page,
  }) => {
    await page.goto("/employer-aggregate-rating-custom-scale");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("EmployerAggregateRating");

    // Verify organization
    expect(jsonData.itemReviewed["@type"]).toBe("Organization");
    expect(jsonData.itemReviewed.name).toBe("Green Energy Corp");
    expect(jsonData.itemReviewed.sameAs).toBe(
      "https://www.greenenergycorp.example.com",
    );

    // Verify percentage rating
    expect(jsonData.ratingValue).toBe("85%");
    expect(jsonData.reviewCount).toBe(432);
    expect(jsonData.ratingCount).toBeUndefined();

    // Verify custom scale
    expect(jsonData.bestRating).toBe(100);
    expect(jsonData.worstRating).toBe(0);
  });

  test("page content matches structured data", async ({ page }) => {
    await page.goto("/employer-aggregate-rating");

    // Check visible content
    await expect(
      page.getByRole("heading", {
        name: "World's Best Coffee Shop - Employer Ratings",
      }),
    ).toBeVisible();
    await expect(page.getByText("91")).toBeVisible();
    await expect(page.getByText("out of 100")).toBeVisible();
    await expect(
      page.getByText("Based on 10,561 employee ratings"),
    ).toBeVisible();

    // Get structured data
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify structured data matches visible content
    expect(jsonData.itemReviewed.name).toBe("World's Best Coffee Shop");
    expect(jsonData.ratingValue).toBe(91);
    expect(jsonData.ratingCount).toBe(10561);
  });

  test("validates JSON-LD format is parseable", async ({ page }) => {
    await page.goto("/employer-aggregate-rating-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Should not throw
    expect(() => JSON.parse(jsonLdScript!)).not.toThrow();

    // Verify it's valid JSON-LD
    const jsonData = JSON.parse(jsonLdScript!);
    expect(jsonData["@context"]).toBeDefined();
    expect(jsonData["@type"]).toBeDefined();
  });
});
