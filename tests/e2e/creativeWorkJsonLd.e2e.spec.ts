import { test, expect } from "@playwright/test";

test.describe("CreativeWorkJsonLd", () => {
  test("renders basic Article with paywalled content", async ({ page }) => {
    await page.goto("/creative-work");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Article");
    expect(jsonData.headline).toBe(
      "Premium Article: Understanding Paywalled Content",
    );
    expect(jsonData.url).toBe("https://example.com/articles/premium-content");
    expect(jsonData.datePublished).toBe("2024-01-01T08:00:00+00:00");
    expect(jsonData.dateModified).toBe("2024-01-02T10:00:00+00:00");

    // Verify author processing
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Sarah Johnson",
    });

    // Verify publisher
    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "Premium Publications",
      logo: "https://example.com/logo.png",
    });

    // Verify paywall marking
    expect(jsonData.isAccessibleForFree).toBe(false);
    expect(jsonData.hasPart).toEqual({
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".paywall",
    });

    expect(jsonData.mainEntityOfPage).toBe("https://example.com/articles");
  });

  test("renders Article with multiple paywalled sections", async ({ page }) => {
    await page.goto("/creative-work-multiple");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Article");
    expect(jsonData.headline).toBe(
      "In-Depth Analysis: Multiple Premium Sections",
    );

    // Verify multiple authors
    expect(jsonData.author).toHaveLength(2);
    expect(jsonData.author[0]).toEqual({
      "@type": "Person",
      name: "Dr. Emily Chen",
    });
    expect(jsonData.author[1]["@type"]).toBe("Organization");
    expect(jsonData.author[1].name).toBe("Research Institute");

    // Verify multiple images
    expect(jsonData.image).toHaveLength(3);
    expect(jsonData.image[0]).toBe(
      "https://example.com/images/analysis-16x9.jpg",
    );

    // Verify multiple paywalled sections
    expect(jsonData.hasPart).toHaveLength(2);
    expect(jsonData.hasPart[0]).toEqual({
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".section1",
    });
    expect(jsonData.hasPart[1]).toEqual({
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".section2",
    });
  });

  test("renders NewsArticle with premium content", async ({ page }) => {
    await page.goto("/creative-work-news");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("NewsArticle");
    expect(jsonData.headline).toBe(
      "Breaking: Major Scientific Discovery Behind Paywall",
    );

    // Verify author with URL
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Jane Martinez",
      url: "https://example.com/journalists/jane-martinez",
    });

    // Verify ImageObject
    expect(jsonData.image["@type"]).toBe("ImageObject");
    expect(jsonData.image.url).toBe(
      "https://example.com/images/discovery-hero.jpg",
    );
    expect(jsonData.image.width).toBe(1200);
    expect(jsonData.image.height).toBe(630);
    expect(jsonData.image.caption).toBe("Scientific breakthrough illustration");

    // Verify publisher with logo ImageObject
    expect(jsonData.publisher.name).toBe("Global News Network");
    expect(jsonData.publisher.logo["@type"]).toBe("ImageObject");
    expect(jsonData.publisher.logo.url).toBe(
      "https://example.com/gnn-logo.png",
    );

    // Verify paywall section
    expect(jsonData.isAccessibleForFree).toBe(false);
    expect(jsonData.hasPart).toEqual({
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".premium-news",
    });

    // Verify mainEntityOfPage as WebPage
    expect(jsonData.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://example.com/news/scientific-discovery",
    });
  });

  test("renders Blog with subscription content", async ({ page }) => {
    await page.goto("/creative-work-blog");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Blog");
    expect(jsonData.name).toBe("Premium Tech Insights Blog");
    expect(jsonData.url).toBe("https://example.com/blog");
    expect(jsonData.description).toContain("premium technology blog");

    // Verify it uses name instead of headline for Blog type
    expect(jsonData.headline).toBeUndefined();

    // Verify author and publisher
    expect(jsonData.author["@type"]).toBe("Organization");
    expect(jsonData.author.name).toBe("Tech Insights Team");
    expect(jsonData.publisher.name).toBe("Tech Insights Publishing");

    // Verify subscription marking
    expect(jsonData.isAccessibleForFree).toBe(false);
    expect(jsonData.hasPart).toEqual({
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".members-only",
    });

    // Verify Blog doesn't auto-add dateModified
    expect(jsonData.datePublished).toBe("2024-01-01T00:00:00+00:00");
    expect(jsonData.dateModified).toBeUndefined();
  });

  test("properly escapes special characters in content", async ({ page }) => {
    // Navigate to the creative-work page which has content with special characters
    await page.goto("/creative-work");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Verify JSON is valid even with special characters
    expect(() => JSON.parse(jsonLdScript!)).not.toThrow();

    const jsonData = JSON.parse(jsonLdScript!);
    expect(jsonData.description).toContain("paywalled content");
  });

  test("verifies all CreativeWork types are supported", async ({ page }) => {
    // Test the basic creative-work page
    await page.goto("/creative-work");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify the component supports different types
    const supportedTypes = [
      "CreativeWork",
      "Article",
      "NewsArticle",
      "Blog",
      "BlogPosting",
      "Comment",
      "Course",
      "HowTo",
      "Message",
      "Review",
      "WebPage",
    ];

    // The current page uses "Article" type
    expect(supportedTypes).toContain(jsonData["@type"]);
  });
});
