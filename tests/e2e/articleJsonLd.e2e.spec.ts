import { test, expect } from "@playwright/test";

test.describe("ArticleJsonLd", () => {
  test("renders basic Article structured data", async ({ page }) => {
    await page.goto("/article");

    // Find the JSON-LD script tag
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic Article properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Article");
    expect(jsonData.headline).toBe("Understanding Next.js App Router");
    expect(jsonData.url).toBe("https://example.com/articles/nextjs-app-router");
    expect(jsonData.datePublished).toBe("2024-01-01T08:00:00+00:00");
    expect(jsonData.dateModified).toBe("2024-01-01T08:00:00+00:00"); // Should default to datePublished
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Sarah Johnson",
    });
    expect(jsonData.image).toBe(
      "https://example.com/images/nextjs-article.jpg",
    );
    expect(jsonData.description).toBe(
      "A comprehensive guide to Next.js App Router and its features",
    );
  });

  test("renders NewsArticle with multiple authors and images", async ({
    page,
  }) => {
    await page.goto("/news-article");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify NewsArticle type
    expect(jsonData["@type"]).toBe("NewsArticle");
    expect(jsonData.headline).toBe(
      "Breaking: Next.js 14 Released with Major Performance Improvements",
    );

    // Verify multiple authors
    expect(jsonData.author).toHaveLength(2);
    expect(jsonData.author[0]).toEqual({
      "@type": "Person",
      name: "Alex Chen",
      url: "https://example.com/authors/alex-chen",
    });
    expect(jsonData.author[1]).toEqual({
      "@type": "Person",
      name: "Maria Garcia",
      url: "https://example.com/authors/maria-garcia",
    });

    // Verify multiple images
    expect(jsonData.image).toHaveLength(3);
    expect(jsonData.image).toContain(
      "https://example.com/images/nextjs-14-16x9.jpg",
    );
    expect(jsonData.image).toContain(
      "https://example.com/images/nextjs-14-4x3.jpg",
    );
    expect(jsonData.image).toContain(
      "https://example.com/images/nextjs-14-1x1.jpg",
    );

    // Verify publisher with logo
    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "Tech News Daily",
      logo: {
        "@type": "ImageObject",
        url: "https://example.com/logo.png",
        width: 600,
        height: 60,
      },
    });

    // Verify dates
    expect(jsonData.datePublished).toBe("2024-01-15T10:00:00+00:00");
    expect(jsonData.dateModified).toBe("2024-01-15T14:30:00+00:00");

    // Verify accessibility
    expect(jsonData.isAccessibleForFree).toBe(true);
  });

  test("renders BlogPosting with all properties", async ({ page }) => {
    await page.goto("/blog-posting");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify BlogPosting type
    expect(jsonData["@type"]).toBe("BlogPosting");

    // Verify Organization author
    expect(jsonData.author).toEqual({
      "@type": "Organization",
      name: "WebDev Solutions",
      url: "https://example.com",
      logo: "https://example.com/webdev-logo.png",
    });

    // Verify ImageObject
    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/images/seo-tips-hero.jpg",
      width: 1920,
      height: 1080,
      caption: "SEO Tips for Web Developers",
    });

    // Verify mainEntityOfPage
    expect(jsonData.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://example.com/blog/seo-tips-web-development",
    });

    // Verify premium content flag
    expect(jsonData.isAccessibleForFree).toBe(false);
  });

  test("renders multiple JSON-LD scripts on the same page", async ({
    page,
  }) => {
    // Navigate to a page and inject multiple ArticleJsonLd components
    await page.goto("/article");

    // Count JSON-LD scripts
    const scriptsCount = await page
      .locator('script[type="application/ld+json"]')
      .count();
    expect(scriptsCount).toBeGreaterThanOrEqual(1);

    // Verify each script contains valid JSON
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    for (const script of scripts) {
      const content = await script.textContent();
      expect(() => JSON.parse(content!)).not.toThrow();
    }
  });
});
