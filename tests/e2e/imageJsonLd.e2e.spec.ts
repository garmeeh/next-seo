import { test, expect } from "@playwright/test";

test.describe("ImageJsonLd", () => {
  test("renders basic Image structured data", async ({ page }) => {
    await page.goto("/image");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ImageObject");
    expect(jsonData.contentUrl).toBe(
      "https://example.com/photos/black-labrador-puppy.jpg",
    );

    // Verify creator was processed to Person
    expect(jsonData.creator).toEqual({
      "@type": "Person",
      name: "Brixton Brownstone",
    });

    expect(jsonData.creditText).toBe("Labrador PhotoLab");
    expect(jsonData.copyrightNotice).toBe("Clara Kent");
    expect(jsonData.license).toBe("https://example.com/license");
    expect(jsonData.acquireLicensePage).toBe(
      "https://example.com/how-to-use-my-images",
    );
  });

  test("renders advanced Image with Organization creator", async ({ page }) => {
    await page.goto("/image-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ImageObject");
    expect(jsonData.contentUrl).toBe(
      "https://example.com/photos/sunset-landscape.jpg",
    );

    // Verify Organization creator with nested properties
    expect(jsonData.creator).toEqual({
      "@type": "Organization",
      name: "PhotoLab Studios",
      logo: "https://example.com/photolab-logo.jpg",
      sameAs: [
        "https://twitter.com/photolab",
        "https://instagram.com/photolab",
        "https://facebook.com/photolab",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Photography Lane",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94105",
        addressCountry: "US",
      },
    });

    expect(jsonData.license).toBe(
      "https://creativecommons.org/licenses/by-nc/4.0/",
    );
    expect(jsonData.acquireLicensePage).toBe(
      "https://example.com/licensing/premium",
    );
    expect(jsonData.creditText).toBe(
      "PhotoLab Studios - Professional Photography",
    );
    expect(jsonData.copyrightNotice).toBe(
      "© 2024 PhotoLab Studios. All rights reserved.",
    );
  });

  test("renders multiple images with @graph", async ({ page }) => {
    await page.goto("/image-multiple");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@graph"]).toBeDefined();
    expect(Array.isArray(jsonData["@graph"])).toBe(true);
    expect(jsonData["@graph"]).toHaveLength(3);

    // Verify first image
    const firstImage = jsonData["@graph"][0];
    expect(firstImage["@type"]).toBe("ImageObject");
    expect(firstImage.contentUrl).toBe(
      "https://example.com/photos/mountain-sunrise.jpg",
    );
    expect(firstImage.creator).toEqual({
      "@type": "Person",
      name: "Alex Mountain",
    });
    expect(firstImage.license).toBe("https://example.com/license/standard");
    expect(firstImage.creditText).toBe("Nature Photography Collection");
    expect(firstImage.copyrightNotice).toBe("© 2024 Alex Mountain");

    // Verify second image with multiple creators
    const secondImage = jsonData["@graph"][1];
    expect(secondImage["@type"]).toBe("ImageObject");
    expect(secondImage.contentUrl).toBe(
      "https://example.com/photos/ocean-waves.jpg",
    );
    expect(Array.isArray(secondImage.creator)).toBe(true);
    expect(secondImage.creator).toHaveLength(2);
    expect(secondImage.creator[0]).toEqual({
      "@type": "Person",
      name: "Sarah Ocean",
    });
    expect(secondImage.creator[1]).toEqual({
      "@type": "Person",
      name: "Coastal Studios",
      url: "https://coastalstudios.com",
    });
    expect(secondImage.license).toBe(
      "https://creativecommons.org/licenses/by-sa/4.0/",
    );
    expect(secondImage.acquireLicensePage).toBe(
      "https://example.com/licensing/ocean-collection",
    );

    // Verify third image with Organization creator
    const thirdImage = jsonData["@graph"][2];
    expect(thirdImage["@type"]).toBe("ImageObject");
    expect(thirdImage.contentUrl).toBe(
      "https://example.com/photos/city-lights.jpg",
    );
    expect(thirdImage.creator).toEqual({
      "@type": "Organization",
      name: "Urban Photography Inc.",
      logo: "https://example.com/urban-photo-logo.jpg",
      sameAs: ["https://instagram.com/urbanphoto"],
    });
    expect(thirdImage.license).toBe("https://example.com/license/commercial");
    expect(thirdImage.acquireLicensePage).toBe(
      "https://example.com/licensing/urban",
    );
  });
});
