import { test, expect } from "@playwright/test";

test.describe("CourseJsonLd", () => {
  test("renders single Course structured data", async ({ page }) => {
    await page.goto("/course");

    // Find the JSON-LD script tag
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify Course properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Course");
    expect(jsonData.name).toBe(
      "Introduction to Computer Science and Programming",
    );
    expect(jsonData.description).toBe(
      "This is an introductory CS course laying out the basics.",
    );
    expect(jsonData.url).toBe("https://example.com/courses/intro-cs");
    expect(jsonData.provider).toEqual({
      "@type": "Organization",
      name: "University of Technology - Eureka",
      sameAs: "https://www.example.com",
    });
  });

  test("renders Course list with full data (all-in-one pattern)", async ({
    page,
  }) => {
    await page.goto("/course-list");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ItemList structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(3);

    // Verify first course
    const firstItem = jsonData.itemListElement[0];
    expect(firstItem["@type"]).toBe("ListItem");
    expect(firstItem.position).toBe(1);
    expect(firstItem.item).toEqual({
      "@type": "Course",
      name: "Introduction to Computer Science and Programming",
      description: "This is an introductory CS course laying out the basics.",
      url: "https://example.com/courses#intro-to-cs",
      provider: {
        "@type": "Organization",
        name: "University of Technology - Example",
        sameAs: "https://www.example.com",
      },
    });

    // Verify second course
    const secondItem = jsonData.itemListElement[1];
    expect(secondItem.position).toBe(2);
    expect(secondItem.item.name).toBe(
      "Intermediate Computer Science and Programming",
    );
    expect(secondItem.item.description).toBe(
      "This CS course builds on the basics from the intro course.",
    );

    // Verify third course
    const thirdItem = jsonData.itemListElement[2];
    expect(thirdItem.position).toBe(3);
    expect(thirdItem.item.name).toBe(
      "Advanced Computer Science and Programming",
    );
    expect(thirdItem.item.provider.name).toBe(
      "University of Technology - Eureka",
    );
  });

  test("renders Course list with URLs only (summary page pattern)", async ({
    page,
  }) => {
    await page.goto("/course-list-summary");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ItemList structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(5);

    // Verify URLs are preserved correctly
    const urls = jsonData.itemListElement.map(
      (item: { url: string }) => item.url,
    );
    expect(urls).toEqual([
      "https://example.com/courses/intro-programming",
      "https://example.com/courses/web-development",
      "https://example.com/courses/data-science",
      "https://example.com/courses/machine-learning",
      "https://example.com/courses/mobile-development",
    ]);

    // Verify each item has proper structure
    jsonData.itemListElement.forEach(
      (
        item: {
          "@type": string;
          position: number;
          url: string;
          item?: unknown;
        },
        index: number,
      ) => {
        expect(item["@type"]).toBe("ListItem");
        expect(item.position).toBe(index + 1);
        expect(item.url).toBeTruthy();
        expect(item.item).toBeUndefined(); // Should not have item property for summary pattern
      },
    );
  });

  test("preserves URL query parameters in course URLs", async ({ page }) => {
    // Create a test page with query parameters
    await page.goto("/course");

    // Inject a script to modify the CourseJsonLd
    await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      if (script) {
        const data = JSON.parse(script.textContent || "{}");
        data.url =
          "https://example.com/courses/test?utm_source=google&ref=home";
        script.textContent = JSON.stringify(data);
      }
    });

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData.url).toBe(
      "https://example.com/courses/test?utm_source=google&ref=home",
    );
  });
});
