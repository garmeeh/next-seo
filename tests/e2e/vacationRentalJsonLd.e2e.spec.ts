import { test, expect } from "@playwright/test";

test.describe("VacationRentalJsonLd", () => {
  test("renders basic VacationRental structured data", async ({ page }) => {
    await page.goto("/vacation-rental");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all required properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("VacationRental");
    expect(jsonData.name).toBe("Beautiful Beach House");
    expect(jsonData.identifier).toBe("beach-house-123");
    expect(jsonData.latitude).toBe(42.12345);
    expect(jsonData.longitude).toBe(-71.98765);

    // Verify containsPlace
    expect(jsonData.containsPlace).toBeTruthy();
    expect(jsonData.containsPlace["@type"]).toBe("Accommodation");
    expect(jsonData.containsPlace.occupancy).toEqual({
      "@type": "QuantitativeValue",
      value: 5,
    });

    // Verify image (should be an array even with single image)
    expect(Array.isArray(jsonData.image)).toBe(true);
    expect(jsonData.image).toHaveLength(1);
    expect(jsonData.image[0]).toBe(
      "https://example.com/vacation-rental-main.jpg",
    );
  });

  test("renders advanced VacationRental with all features", async ({
    page,
  }) => {
    await page.goto("/vacation-rental-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic properties
    expect(jsonData["@type"]).toBe("VacationRental");
    expect(jsonData.name).toBe("Luxury Ocean View Villa");
    expect(jsonData.identifier).toBe("lux-villa-malibu-456");
    expect(jsonData.additionalType).toBe("Villa");

    // Verify address
    expect(jsonData.address).toEqual({
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "Malibu",
      addressRegion: "California",
      postalCode: "90265",
      streetAddress: "123 Ocean Drive, Unit 6E",
    });

    // Verify containsPlace with all features
    const containsPlace = jsonData.containsPlace;
    expect(containsPlace["@type"]).toBe("Accommodation");
    expect(containsPlace.additionalType).toBe("EntirePlace");
    expect(containsPlace.numberOfBedrooms).toBe(3);
    expect(containsPlace.numberOfBathroomsTotal).toBe(2.5);
    expect(containsPlace.numberOfRooms).toBe(7);
    expect(containsPlace.petsAllowed).toBe(true);
    expect(containsPlace.smokingAllowed).toBe(false);

    // Verify bed details
    expect(Array.isArray(containsPlace.bed)).toBe(true);
    expect(containsPlace.bed).toHaveLength(2);
    expect(containsPlace.bed[0]).toEqual({
      "@type": "BedDetails",
      numberOfBeds: 1,
      typeOfBed: "Queen",
    });

    // Verify amenity features
    expect(Array.isArray(containsPlace.amenityFeature)).toBe(true);
    const acFeature = containsPlace.amenityFeature.find(
      (f: { name: string }) => f.name === "ac",
    );
    expect(acFeature).toEqual({
      "@type": "LocationFeatureSpecification",
      name: "ac",
      value: true,
    });
    const poolTypeFeature = containsPlace.amenityFeature.find(
      (f: { name: string }) => f.name === "poolType",
    );
    expect(poolTypeFeature).toEqual({
      "@type": "LocationFeatureSpecification",
      name: "poolType",
      value: "Outdoor",
    });

    // Verify floor size
    expect(containsPlace.floorSize).toEqual({
      "@type": "QuantitativeValue",
      value: 150,
      unitCode: "MTK",
    });

    // Verify images array
    expect(Array.isArray(jsonData.image)).toBe(true);
    expect(jsonData.image).toHaveLength(8);

    // Verify aggregate rating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.8,
      ratingCount: 125,
      reviewCount: 98,
      bestRating: 5,
    });

    // Verify brand
    expect(jsonData.brand).toEqual({
      "@type": "Brand",
      name: "Luxury Beach Rentals Inc",
    });

    // Verify check-in/out times
    expect(jsonData.checkinTime).toBe("15:00:00-08:00");
    expect(jsonData.checkoutTime).toBe("11:00:00-08:00");

    // Verify languages
    expect(jsonData.knowsLanguage).toEqual(["en-US", "es-ES", "fr-FR"]);

    // Verify reviews
    expect(Array.isArray(jsonData.review)).toBe(true);
    expect(jsonData.review).toHaveLength(3);
    expect(jsonData.review[0].author).toEqual({
      "@type": "Person",
      name: "Sarah Johnson",
    });
  });

  test("renders apartment type VacationRental", async ({ page }) => {
    await page.goto("/vacation-rental-apartment");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify apartment-specific properties
    expect(jsonData["@type"]).toBe("VacationRental");
    expect(jsonData.additionalType).toBe("Apartment");
    expect(jsonData.name).toBe("Cozy Manhattan Studio Apartment");

    // Verify private room accommodation
    const containsPlace = jsonData.containsPlace;
    expect(containsPlace.additionalType).toBe("PrivateRoom");
    expect(containsPlace.occupancy.value).toBe(2);

    // Verify single bed (not array)
    expect(containsPlace.bed).toEqual({
      "@type": "BedDetails",
      numberOfBeds: 1,
      typeOfBed: "Double",
    });

    // Verify floor size in square feet
    expect(containsPlace.floorSize).toEqual({
      "@type": "QuantitativeValue",
      value: 450,
      unitCode: "FTK",
    });

    // Verify string coordinates
    expect(jsonData.latitude).toBe("40.74844");
    expect(jsonData.longitude).toBe("-73.98566");

    // Verify single language (converted to array)
    expect(jsonData.knowsLanguage).toEqual(["en-US"]);

    // Verify single review (not array)
    expect(jsonData.review).toMatchObject({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 4,
      },
      author: {
        "@type": "Person",
        name: "David Lee",
      },
    });
  });

  test("validates JSON structure is properly escaped", async ({ page }) => {
    await page.goto("/vacation-rental");

    const scriptElement = await page.locator(
      'script[type="application/ld+json"]',
    );
    const scriptContent = await scriptElement.textContent();

    // Ensure the JSON can be parsed without errors
    expect(() => JSON.parse(scriptContent!)).not.toThrow();

    // Check that the script tag has proper attributes
    const scriptId = await scriptElement.getAttribute("id");

    expect(scriptId).toBe("vacationrental-jsonld");
  });
});
