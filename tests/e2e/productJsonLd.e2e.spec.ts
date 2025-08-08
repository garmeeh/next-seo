import { test, expect } from "@playwright/test";

test.describe("ProductJsonLd", () => {
  test("renders basic Product structured data", async ({ page }) => {
    await page.goto("/product");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Product");
    expect(jsonData.name).toBe("Executive Anvil");
    expect(jsonData.description).toBe(
      "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
    );
    expect(jsonData.url).toBe("https://example.com/products/anvil");
    expect(jsonData.sku).toBe("0446310786");
    expect(jsonData.mpn).toBe("925872");

    // Check brand
    expect(jsonData.brand).toEqual({
      "@type": "Brand",
      name: "ACME",
    });

    // Check images
    expect(jsonData.image).toEqual([
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg",
    ]);

    // Check offers
    expect(jsonData.offers).toEqual({
      "@type": "Offer",
      price: 119.99,
      priceCurrency: "USD",
      availability: "InStock",
      priceValidUntil: "2024-12-31",
      url: "https://example.com/buy/anvil",
    });

    // Check aggregate rating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.4,
      reviewCount: 89,
    });
  });

  test("renders Product with review containing pros and cons", async ({
    page,
  }) => {
    await page.goto("/product-review");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Product");
    expect(jsonData.name).toBe("Cheese Grater Pro");

    // Check review with pros and cons
    expect(jsonData.review).toBeDefined();
    expect(jsonData.review.name).toBe("Cheese Grater Pro Review");
    expect(jsonData.review.author).toEqual({
      "@type": "Person",
      name: "Pascal Van Cleeff",
    });
    expect(jsonData.review.reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 4,
      bestRating: 5,
    });

    // Check positive notes (pros)
    expect(jsonData.review.positiveNotes).toEqual({
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Consistent results",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Still sharp after many uses",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Easy to clean",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Comfortable grip",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Multiple grating sizes",
        },
      ],
    });

    // Check negative notes (cons)
    expect(jsonData.review.negativeNotes).toEqual({
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "No child protection",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lacking advanced features",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Takes up drawer space",
        },
      ],
    });
  });

  test("renders Product with AggregateOffer for shopping aggregator", async ({
    page,
  }) => {
    await page.goto("/product-aggregate");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Product");
    expect(jsonData.name).toBe("Executive Anvil");

    // Check AggregateOffer
    expect(jsonData.offers).toEqual({
      "@type": "AggregateOffer",
      lowPrice: 119.99,
      highPrice: 199.99,
      priceCurrency: "USD",
      offerCount: 5,
    });

    // Check multiple reviews
    expect(Array.isArray(jsonData.review)).toBe(true);
    expect(jsonData.review).toHaveLength(2);

    expect(jsonData.review[0]).toEqual({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: "Fred Benson",
      },
      reviewBody:
        "This anvil is perfect! Exactly what I needed for my roadrunner traps.",
      datePublished: "2024-01-10",
    });

    expect(jsonData.review[1]).toEqual({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 4,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: "Wile E. Coyote",
      },
      reviewBody: "Great anvil, but shipping took longer than expected.",
      datePublished: "2024-01-05",
    });

    // Check aggregate rating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.4,
      reviewCount: 89,
    });
  });

  test("validates required properties", async ({ page }) => {
    await page.goto("/product");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Product must have name
    expect(jsonData.name).toBeDefined();
    expect(jsonData.name).not.toBe("");

    // Product must have at least one of: review, aggregateRating, or offers
    const hasRequiredProperty =
      jsonData.review !== undefined ||
      jsonData.aggregateRating !== undefined ||
      jsonData.offers !== undefined;

    expect(hasRequiredProperty).toBe(true);
  });

  test("handles multiple images correctly", async ({ page }) => {
    await page.goto("/product");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(Array.isArray(jsonData.image)).toBe(true);
    expect(jsonData.image).toHaveLength(3);
    expect(jsonData.image).toContain(
      "https://example.com/photos/1x1/photo.jpg",
    );
    expect(jsonData.image).toContain(
      "https://example.com/photos/4x3/photo.jpg",
    );
    expect(jsonData.image).toContain(
      "https://example.com/photos/16x9/photo.jpg",
    );
  });

  test("properly formats offer with availability", async ({ page }) => {
    await page.goto("/product");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData.offers.availability).toBe("InStock");
    expect(jsonData.offers.priceValidUntil).toBe("2024-12-31");
    expect(jsonData.offers.url).toBe("https://example.com/buy/anvil");
  });

  test("includes product identifiers", async ({ page }) => {
    await page.goto("/product");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData.sku).toBe("0446310786");
    expect(jsonData.mpn).toBe("925872");
  });
});

test.describe("ProductJsonLd with ProductGroup", () => {
  test("renders ProductGroup with variants", async ({ page }) => {
    await page.goto("/product-variants");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ProductGroup properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ProductGroup");
    expect(jsonData.name).toBe("Wool Winter Coat");
    expect(jsonData.productGroupID).toBe("WC2024");
    expect(jsonData.brand).toEqual({
      "@type": "Brand",
      name: "Nordic Style",
    });
    expect(jsonData.material).toBe("wool");
    expect(jsonData.pattern).toBe("striped");

    // Verify variesBy
    expect(jsonData.variesBy).toEqual([
      "https://schema.org/size",
      "https://schema.org/color",
    ]);

    // Verify hasVariant
    expect(jsonData.hasVariant).toHaveLength(4);
    expect(jsonData.hasVariant[0]).toMatchObject({
      "@type": "Product",
      name: "Wool Winter Coat - Small Green",
      sku: "WC2024-S-GRN",
      size: "small",
      color: "Green",
    });

    // Check first variant offers
    expect(jsonData.hasVariant[0].offers).toMatchObject({
      "@type": "Offer",
      price: 119.99,
      priceCurrency: "USD",
      availability: "InStock",
    });

    // Verify aggregateRating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.6,
      reviewCount: 127,
    });
  });

  test("renders ProductGroup with advanced features", async ({ page }) => {
    await page.goto("/product-variants-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("ProductGroup");
    expect(jsonData.name).toBe("Athletic Performance Shoes");

    // Check brand object
    expect(jsonData.brand).toEqual({
      "@type": "Organization",
      name: "SpeedRunner Pro",
      logo: "https://example.com/logos/speedrunner.png",
    });

    // Check audience
    expect(jsonData.audience).toEqual({
      "@type": "PeopleAudience",
      suggestedGender: "unisex",
      suggestedAge: {
        "@type": "QuantitativeValue",
        minValue: 13,
        unitCode: "ANN",
      },
    });

    // Check reviews
    expect(jsonData.review).toHaveLength(2);
    expect(jsonData.review[0].name).toBe("Best Running Shoes Ever!");
    expect(jsonData.review[0].reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 5,
      bestRating: 5,
    });

    // Check variants with mixed types
    expect(jsonData.hasVariant).toBeDefined();
    const fullVariant = jsonData.hasVariant[0];
    expect(fullVariant.weight).toEqual({
      "@type": "QuantitativeValue",
      value: 310,
      unitCode: "GRM",
    });

    // Check shipping details
    expect(fullVariant.offers.shippingDetails).toBeDefined();
    expect(fullVariant.offers.shippingDetails["@type"]).toBe(
      "OfferShippingDetails",
    );

    // Check URL-only variants
    const urlVariant = jsonData.hasVariant.find(
      (v: unknown) =>
        (v as { url?: string }).url ===
        "https://example.com/products/athletic-performance-shoes/mens-9-gray",
    );
    expect(urlVariant).toEqual({
      url: "https://example.com/products/athletic-performance-shoes/mens-9-gray",
    });
  });

  test("renders Product with isVariantOf reference", async ({ page }) => {
    await page.goto("/product-variants-multipage");

    // Get the ProductJsonLd script (first one)
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    expect(scripts.length).toBeGreaterThanOrEqual(1);

    const productScript = await scripts[0].textContent();
    const productData = JSON.parse(productScript!);

    // Verify Product with isVariantOf
    expect(productData["@type"]).toBe("Product");
    expect(productData.name).toBe("Premium Leather Wallet - Brown Classic");
    expect(productData.sku).toBe("LW2024-BRN-CLS");
    expect(productData.color).toBe("Brown");
    expect(productData.pattern).toBe("Classic");
    expect(productData.size).toBe("Standard");

    // Check variant reference
    expect(productData.isVariantOf).toEqual({ "@id": "#wallet_group" });
    expect(productData.inProductGroupWithID).toBe("LW2024");

    // If there's a second script (the manually added ProductGroup), check it too
    if (scripts.length > 1) {
      const groupScript = await scripts[1].textContent();
      const groupData = JSON.parse(groupScript!);

      expect(groupData["@type"]).toBe("ProductGroup");
      expect(groupData["@id"]).toBe("#wallet_group");
      expect(groupData.productGroupID).toBe("LW2024");
      expect(groupData.variesBy).toContain("https://schema.org/color");
    }
  });
});
