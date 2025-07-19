import { test, expect } from "@playwright/test";

test.describe("BreadcrumbJsonLd", () => {
  test("renders basic breadcrumb structured data", async ({ page }) => {
    await page.goto("/breadcrumb");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("BreadcrumbList");
    expect(jsonData.itemListElement).toHaveLength(5);

    // Verify first item
    expect(jsonData.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://example.com",
    });

    // Verify middle item
    expect(jsonData.itemListElement[2]).toEqual({
      "@type": "ListItem",
      position: 3,
      name: "Electronics",
      item: "https://example.com/products/electronics",
    });

    // Verify last item (no URL)
    expect(jsonData.itemListElement[4]).toEqual({
      "@type": "ListItem",
      position: 5,
      name: "iPhone 15 Pro",
    });
  });

  test("renders multiple breadcrumb trails", async ({ page }) => {
    await page.goto("/breadcrumb/multiple");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Should be an array of two BreadcrumbList objects
    expect(Array.isArray(jsonData)).toBe(true);
    expect(jsonData).toHaveLength(2);

    // Verify first trail
    expect(jsonData[0]["@context"]).toBe("https://schema.org");
    expect(jsonData[0]["@type"]).toBe("BreadcrumbList");
    expect(jsonData[0].itemListElement).toHaveLength(3);
    expect(jsonData[0].itemListElement[0].name).toBe("Books");
    expect(jsonData[0].itemListElement[1].name).toBe("Science Fiction");
    expect(jsonData[0].itemListElement[2].name).toBe("Award Winners");

    // Verify second trail
    expect(jsonData[1]["@context"]).toBe("https://schema.org");
    expect(jsonData[1]["@type"]).toBe("BreadcrumbList");
    expect(jsonData[1].itemListElement).toHaveLength(2);
    expect(jsonData[1].itemListElement[0].name).toBe("Literature");
    expect(jsonData[1].itemListElement[1].name).toBe("Award Winners");
  });

  test("renders with Thing objects and custom attributes", async ({ page }) => {
    await page.goto("/breadcrumb/advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"][id="blog-breadcrumb"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify Thing objects with @id
    expect(jsonData.itemListElement[1].item).toEqual({
      "@id": "https://example.com/blog",
    });
    expect(jsonData.itemListElement[2].item).toEqual({
      "@id": "https://example.com/blog/technology",
    });

    // Verify mixed usage (URL string for first item)
    expect(jsonData.itemListElement[0].item).toBe("https://example.com");

    // Verify last item has no URL
    expect(jsonData.itemListElement[3].item).toBeUndefined();
  });
});
