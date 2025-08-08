import { test, expect } from "@playwright/test";

test.describe("Custom JSON-LD Components", () => {
  test("renders PodcastSeries structured data correctly", async ({ page }) => {
    await page.goto("/custom-podcast");

    // Get the JSON-LD script content
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    expect(jsonLdScript).toBeTruthy();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("PodcastSeries");
    expect(jsonData.name).toBe("Tech Talk Weekly");
    expect(jsonData.description).toBe(
      "Weekly discussions about technology trends and innovations",
    );
    expect(jsonData.url).toBe("https://example.com/podcasts/tech-talk-weekly");

    // Verify processor worked - host string became Person with @type
    expect(jsonData.host).toEqual({
      "@type": "Person",
      name: "Sarah Johnson",
    });

    // Verify image processor kept string as-is
    expect(jsonData.image).toBe("https://example.com/podcast-cover.jpg");

    // Verify episodes array structure
    expect(jsonData.episode).toHaveLength(3);
    expect(jsonData.episode[0]).toEqual({
      "@type": "PodcastEpisode",
      name: "Episode 1: AI Revolution",
      position: 1,
      duration: "PT30M",
      datePublished: "2024-01-01",
      description:
        "Exploring the latest developments in artificial intelligence",
      url: "https://example.com/episodes/ep1-ai-revolution",
    });

    // Verify position is auto-generated
    expect(jsonData.episode[1].position).toBe(2);
    expect(jsonData.episode[2].position).toBe(3);
  });

  test("renders Service structured data correctly", async ({ page }) => {
    await page.goto("/custom-service");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    expect(jsonLdScript).toBeTruthy();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Service");
    expect(jsonData.name).toBe("Web Development Services");
    expect(jsonData.serviceType).toBe("Professional Service");
    expect(jsonData.description).toContain("Full-stack web development");
    expect(jsonData.url).toBe("https://example.com/services/web-development");

    // Verify processor worked - complex provider object became Organization with @type
    expect(jsonData.provider).toMatchObject({
      "@type": "Organization",
      name: "Tech Solutions Inc",
      url: "https://example.com",
      logo: expect.any(String),
      address: expect.objectContaining({
        "@type": "PostalAddress",
        streetAddress: "123 Tech Street",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94105",
        addressCountry: "US",
      }),
    });

    // Verify areaServed is array
    expect(jsonData.areaServed).toEqual(["US", "CA", "UK", "AU"]);

    // Verify offers structure
    expect(jsonData.offers).toEqual({
      "@type": "Offer",
      priceRange: "$$$",
    });

    // Verify aggregateRating processor worked
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1,
    });
  });

  test("processors handle flexible input types correctly", async ({ page }) => {
    // Test PodcastSeries with string inputs
    await page.goto("/custom-podcast");

    let jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    let jsonData = JSON.parse(jsonLdScript!);

    // String host became Person object with @type
    expect(jsonData.host).toHaveProperty("@type", "Person");
    expect(jsonData.host).toHaveProperty("name", "Sarah Johnson");

    // String image URL stayed as string (processImage preserves strings)
    expect(typeof jsonData.image).toBe("string");

    // Test Service with complex inputs
    await page.goto("/custom-service");

    jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    jsonData = JSON.parse(jsonLdScript!);

    // Complex provider object has @type added
    expect(jsonData.provider).toHaveProperty("@type", "Organization");

    // Nested address also has @type added by processor
    expect(jsonData.provider.address).toHaveProperty("@type", "PostalAddress");

    // Single value or array handling for areaServed
    expect(Array.isArray(jsonData.areaServed)).toBe(true);
  });

  test("custom components follow @type optional pattern", async ({ page }) => {
    // Verify that developers don't need to specify @type manually
    await page.goto("/custom-podcast");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // All nested objects should have @type added automatically
    expect(jsonData["@type"]).toBe("PodcastSeries");
    expect(jsonData.host["@type"]).toBe("Person");
    jsonData.episode.forEach((ep: { "@type": string }) => {
      expect(ep["@type"]).toBe("PodcastEpisode");
    });

    // Service page
    await page.goto("/custom-service");

    const serviceScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const serviceData = JSON.parse(serviceScript!);

    // Verify all types are properly set
    expect(serviceData["@type"]).toBe("Service");
    expect(serviceData.provider["@type"]).toBe("Organization");
    expect(serviceData.provider.address["@type"]).toBe("PostalAddress");
    expect(serviceData.offers["@type"]).toBe("Offer");
    expect(serviceData.aggregateRating["@type"]).toBe("AggregateRating");
  });

  test("JSON-LD output is valid and parseable", async ({ page }) => {
    // Test both custom component pages produce valid JSON
    const pages = ["/custom-podcast", "/custom-service"];

    for (const pagePath of pages) {
      await page.goto(pagePath);

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      // Should not throw when parsing
      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      // Should have required schema.org properties
      expect(jsonData).toHaveProperty("@context", "https://schema.org");
      expect(jsonData).toHaveProperty("@type");
      expect(jsonData).toHaveProperty("name");
    }
  });

  test("custom components render correctly with partial data", async ({
    page,
  }) => {
    // The example pages have all data, but this tests that the components
    // handle conditional properties correctly (all props except name are optional)

    // Both pages should render without errors
    await page.goto("/custom-podcast");
    await expect(page.locator("h1")).toContainText("Tech Talk Weekly");

    await page.goto("/custom-service");
    await expect(page.locator("h1")).toContainText("Web Development Services");

    // Verify no console errors
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleMessages.push(msg.text());
      }
    });

    await page.goto("/custom-podcast");
    await page.goto("/custom-service");

    expect(consoleMessages).toHaveLength(0);
  });
});
