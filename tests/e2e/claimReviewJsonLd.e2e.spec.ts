import { test, expect } from "@playwright/test";

test.describe("ClaimReviewJsonLd", () => {
  test("renders basic ClaimReview structured data", async ({ page }) => {
    await page.goto("/claim-review");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ClaimReview");
    expect(jsonData.claimReviewed).toBe("The world is flat");
    expect(jsonData.url).toBe(
      "https://example.com/news/science/worldisflat.html",
    );

    // Verify rating
    expect(jsonData.reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 1,
      bestRating: 5,
      worstRating: 1,
      alternateName: "False",
    });

    // Verify author
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Example.com science watch",
    });
  });

  test("renders advanced ClaimReview with full claim details", async ({
    page,
  }) => {
    await page.goto("/claim-review-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify organization author
    expect(jsonData.author).toEqual({
      "@type": "Organization",
      name: "Example.com Science Watch",
      url: "https://example.com/science",
      logo: "https://example.com/logo.jpg",
    });

    // Verify rating with name
    expect(jsonData.reviewRating.name).toBe("False");

    // Verify itemReviewed
    expect(jsonData.itemReviewed).toBeTruthy();
    expect(jsonData.itemReviewed["@type"]).toBe("Claim");
    expect(jsonData.itemReviewed.author).toEqual({
      "@type": "Organization",
      name: "Square World Society",
      sameAs: "https://example.flatworlders.com/we-know-that-the-world-is-flat",
    });
    expect(jsonData.itemReviewed.datePublished).toBe("2024-06-20");

    // Verify appearance
    expect(jsonData.itemReviewed.appearance).toEqual({
      "@type": "OpinionNewsArticle",
      url: "https://example.com/news/a122121",
      headline: "Square Earth - Flat earthers for the Internet age",
      datePublished: "2024-06-22",
      author: {
        "@type": "Person",
        name: "T. Tellar",
      },
      image: "https://example.com/photos/1x1/photo.jpg",
      publisher: {
        "@type": "Organization",
        name: "Skeptical News",
        logo: {
          "@type": "ImageObject",
          url: "https://example.com/logo.jpg",
        },
      },
    });
  });

  test("renders ClaimReview with organization author and firstAppearance", async ({
    page,
  }) => {
    await page.goto("/claim-review-organization");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify claim
    expect(jsonData.claimReviewed).toBe("Climate change is not real");

    // Verify rating
    expect(jsonData.reviewRating.alternateName).toBe("Pants on Fire");

    // Verify organization author with detailed properties
    expect(jsonData.author["@type"]).toBe("Organization");
    expect(jsonData.author.name).toBe("Climate Facts Organization");
    expect(jsonData.author.logo).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/logo.png",
      width: 300,
      height: 60,
    });
    expect(jsonData.author.sameAs).toEqual([
      "https://twitter.com/climatefacts",
      "https://facebook.com/climatefacts",
    ]);

    // Verify itemReviewed with organization claim author
    expect(jsonData.itemReviewed.author).toEqual({
      "@type": "Organization",
      name: "Climate Denial Institute",
      url: "https://example-denial.com",
    });

    // Verify firstAppearance
    expect(jsonData.itemReviewed.firstAppearance).toEqual({
      "@type": "CreativeWork",
      url: "https://example-denial.com/climate-hoax",
      headline: "The Great Climate Hoax Exposed",
      datePublished: "2024-07-01",
      author: {
        "@type": "Organization",
        name: "Climate Denial Institute",
        url: "https://example-denial.com",
      },
    });
  });
});
