import { test, expect } from "@playwright/test";

test.describe("LocalBusinessJsonLd", () => {
  test("renders basic LocalBusiness structured data", async ({ page }) => {
    await page.goto("/local-business");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("LocalBusiness");
    expect(jsonData.name).toBe("Gary's Tech Repair Shop");
    expect(jsonData.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "123 Tech Street",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94102",
      addressCountry: "US",
    });
    expect(jsonData.telephone).toBe("+14155551234");
    expect(jsonData.url).toBe("https://example.com/locations/sf");
    expect(jsonData.description).toBe(
      "Professional computer and phone repair services in San Francisco",
    );
    expect(jsonData.openingHoursSpecification).toHaveLength(2);
  });

  test("renders Restaurant with all features", async ({ page }) => {
    await page.goto("/restaurant");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify restaurant-specific properties
    expect(jsonData["@type"]).toBe("Restaurant");
    expect(jsonData.name).toBe("The Golden Fork");
    expect(jsonData.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: 40.7489,
      longitude: -73.968,
    });
    expect(jsonData.image).toHaveLength(3);
    expect(jsonData.servesCuisine).toEqual([
      "Italian",
      "Mediterranean",
      "Vegetarian",
    ]);
    expect(jsonData.priceRange).toBe("$$$");
    expect(jsonData.menu).toBe(
      "https://example.com/restaurants/golden-fork/menu",
    );

    // Verify aggregate rating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.6,
      ratingCount: 892,
      reviewCount: 846,
      bestRating: 5,
      worstRating: 1,
    });

    // Verify reviews
    expect(jsonData.review).toHaveLength(2);
    expect(jsonData.review[0].author).toEqual({
      "@type": "Person",
      name: "Sarah Johnson",
    });
    expect(jsonData.review[0].reviewRating.ratingValue).toBe(5);

    // Verify opening hours
    expect(jsonData.openingHoursSpecification).toHaveLength(3);
    expect(jsonData.openingHoursSpecification[0].dayOfWeek).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
    ]);

    // Verify boolean values
    expect(jsonData.publicAccess).toBe(true);
    expect(jsonData.smokingAllowed).toBe(false);
    expect(jsonData.isAccessibleForFree).toBe(true);
  });

  test("renders Store with departments", async ({ page }) => {
    await page.goto("/store-with-departments");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify store type
    expect(jsonData["@type"]).toBe("Store");
    expect(jsonData.name).toBe("MegaMart Superstore");

    // Verify departments
    expect(jsonData.department).toHaveLength(3);

    // Check pharmacy department
    const pharmacy = jsonData.department[0];
    expect(pharmacy["@type"]).toBe("Pharmacy");
    expect(pharmacy.name).toBe("MegaMart Pharmacy");
    expect(pharmacy.telephone).toBe("+13235554322");
    expect(pharmacy.openingHoursSpecification).toHaveLength(3);

    // Check auto parts department
    const autoParts = jsonData.department[1];
    expect(autoParts["@type"]).toBe("AutoPartsStore");
    expect(autoParts.name).toBe("MegaMart Auto Center");

    // Check bakery department
    const bakery = jsonData.department[2];
    expect(bakery["@type"]).toBe("Bakery");
    expect(bakery.name).toBe("MegaMart Fresh Bakery");

    // Verify area served
    expect(jsonData.areaServed).toEqual([
      "Los Angeles",
      "Hollywood",
      "West Hollywood",
      "Beverly Hills",
    ]);
  });
});
