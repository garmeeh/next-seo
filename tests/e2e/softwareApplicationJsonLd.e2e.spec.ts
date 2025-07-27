import { test, expect } from "@playwright/test";

test.describe("SoftwareApplicationJsonLd", () => {
  test("renders basic free software app structured data", async ({ page }) => {
    await page.goto("/software-app");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("SoftwareApplication");
    expect(jsonData.name).toBe("Task Master Pro");
    expect(jsonData.description).toBe(
      "A powerful task management app to boost your productivity",
    );
    expect(jsonData.applicationCategory).toBe("ProductivityApplication");
    expect(jsonData.operatingSystem).toBe(
      "Windows 10+, macOS 10.15+, Ubuntu 20.04+",
    );

    // Verify offers
    expect(jsonData.offers).toEqual({
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
    });

    // Verify aggregate rating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      ratingCount: 1250,
      reviewCount: 980,
    });

    // Verify screenshots
    expect(jsonData.screenshot).toHaveLength(3);
    expect(jsonData.screenshot[0]).toBe(
      "https://example.com/screenshots/dashboard.jpg",
    );

    // Verify feature list
    expect(jsonData.featureList).toEqual([
      "Intuitive task organization",
      "Calendar integration",
      "Team collaboration",
      "Progress tracking",
      "Mobile sync",
    ]);

    // Verify dates
    expect(jsonData.datePublished).toBe("2022-06-15");
    expect(jsonData.dateModified).toBe("2024-11-28");
  });

  test("renders paid software app with pricing tiers", async ({ page }) => {
    await page.goto("/software-app-paid");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("DesignApplication");
    expect(jsonData.name).toBe("Studio Pro - Advanced Photo Editor");
    expect(jsonData.applicationSubCategory).toBe("PhotoEditing");
    expect(jsonData.applicationSuite).toBe("Creative Studio Suite");

    // Verify paid offers
    expect(jsonData.offers).toEqual({
      "@type": "Offer",
      price: 79.99,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    });

    // Verify reviews
    expect(jsonData.review).toHaveLength(2);
    expect(jsonData.review[0]).toMatchObject({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Sarah Johnson",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      reviewBody:
        "Best photo editing software I've ever used. The AI features save me hours of work!",
      datePublished: "2024-10-15",
    });

    // Verify system requirements
    expect(jsonData.memoryRequirements).toBe(
      "8GB RAM minimum, 16GB recommended",
    );
    expect(jsonData.processorRequirements).toBe(
      "Intel Core i5 or AMD Ryzen 5 or better",
    );
    expect(jsonData.storageRequirements).toBe("4GB available space");

    // Verify countries supported
    expect(jsonData.countriesSupported).toEqual([
      "US",
      "CA",
      "GB",
      "AU",
      "NZ",
      "IE",
    ]);
  });

  test("renders mobile application with permissions", async ({ page }) => {
    await page.goto("/mobile-app");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("MobileApplication");
    expect(jsonData.name).toBe("FitTrack - Fitness & Workout Tracker");
    expect(jsonData.applicationCategory).toBe("HealthApplication");
    expect(jsonData.operatingSystem).toBe("Android 7.0+, iOS 13.0+");

    // Verify permissions
    expect(jsonData.permissions).toEqual([
      "android.permission.ACTIVITY_RECOGNITION",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.RECEIVE_BOOT_COMPLETED",
    ]);

    // Verify multiple images
    expect(jsonData.image).toHaveLength(3);
    expect(jsonData.image[0]).toBe("https://example.com/fittrack-icon-1x1.png");
    expect(jsonData.image[1]).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/fittrack-icon-4x3.png",
      width: 1200,
      height: 900,
    });

    // Verify download URLs
    expect(jsonData.downloadUrl).toBe(
      "https://play.google.com/store/apps/details?id=com.fittech.fittrack",
    );
    expect(jsonData.installUrl).toBe(
      "https://apps.apple.com/app/fittrack/id123456789",
    );
  });

  test("renders web application with multiple pricing tiers", async ({
    page,
  }) => {
    await page.goto("/web-app");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("WebApplication");
    expect(jsonData.name).toBe("CloudSync Pro - Team Collaboration Platform");
    expect(jsonData.url).toBe("https://app.cloudsyncpro.com");

    // Verify multiple offers
    expect(jsonData.offers).toHaveLength(3);
    expect(jsonData.offers[0]).toEqual({
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://app.cloudsyncpro.com/signup/free",
    });
    expect(jsonData.offers[1].price).toBe(12);
    expect(jsonData.offers[2].price).toBe(25);

    // Verify publisher with address
    expect(jsonData.publisher).toMatchObject({
      "@type": "Organization",
      name: "CloudSync Technologies Inc.",
      url: "https://cloudsynctech.com",
      logo: {
        "@type": "ImageObject",
        url: "https://cloudsynctech.com/press/logo.png",
        width: 600,
        height: 60,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Tech Boulevard",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94105",
        addressCountry: "US",
      },
    });

    // Verify extensive country support
    expect(jsonData.countriesSupported).toHaveLength(20);
    expect(jsonData.countriesSupported).toContain("US");
    expect(jsonData.countriesSupported).toContain("JP");
  });

  test("renders video game with co-typing", async ({ page }) => {
    await page.goto("/video-game");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify co-typed @type
    expect(jsonData["@type"]).toEqual(["VideoGame", "MobileApplication"]);
    expect(jsonData.name).toBe("Dragon Quest Legends");
    expect(jsonData.applicationCategory).toBe("GameApplication");
    expect(jsonData.applicationSubCategory).toBe("RolePlaying");

    // Verify gaming-specific features
    expect(jsonData.operatingSystem).toBe(
      "iOS 14.0+, Android 9.0+, Nintendo Switch",
    );
    expect(jsonData.offers.price).toBe(19.99);

    // Verify high ratings for games
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.8,
      ratingCount: 45000,
      reviewCount: 35000,
      bestRating: 5,
    });

    // Verify game-specific feature list
    expect(jsonData.featureList).toContain("50+ hours of main storyline");
    expect(jsonData.featureList).toContain("Multiplayer raids and PvP battles");
    expect(jsonData.featureList).toContain("300+ unique monsters to collect");
  });

  test("properly formats all data types", async ({ page }) => {
    await page.goto("/software-app-paid");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Verify JSON is valid
    expect(() => JSON.parse(jsonLdScript!)).not.toThrow();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify image object processing
    expect(jsonData.image["@type"]).toBe("ImageObject");
    expect(jsonData.image.url).toBe("https://example.com/studio-pro-icon.png");

    // Verify author processing (string to Person)
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Creative Software Labs",
      url: "https://creativesoftwarelabs.com",
    });

    // Verify publisher logo processing
    expect(jsonData.publisher.logo["@type"]).toBe("ImageObject");

    // Verify screenshot caption processing
    expect(jsonData.screenshot[0]).toMatchObject({
      "@type": "ImageObject",
      url: "https://example.com/screenshots/studio-pro-main.jpg",
      caption: "Main editing interface",
    });
  });

  test("uses correct scriptKey for different app types", async ({ page }) => {
    // Test basic SoftwareApplication
    await page.goto("/software-app");
    let script = await page.locator('script[type="application/ld+json"]');
    await expect(script).toHaveAttribute(
      "id",
      /software-application-jsonld-softwareapplication/,
    );

    // Test MobileApplication
    await page.goto("/mobile-app");
    script = await page.locator('script[type="application/ld+json"]');
    await expect(script).toHaveAttribute(
      "id",
      /software-application-jsonld-mobileapplication/,
    );

    // Test WebApplication
    await page.goto("/web-app");
    script = await page.locator('script[type="application/ld+json"]');
    await expect(script).toHaveAttribute(
      "id",
      /software-application-jsonld-webapplication/,
    );

    // Test VideoGame co-typed
    await page.goto("/video-game");
    script = await page.locator('script[type="application/ld+json"]');
    await expect(script).toHaveAttribute(
      "id",
      /software-application-jsonld-videogame-mobileapplication/,
    );
  });
});
