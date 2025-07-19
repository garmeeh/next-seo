import { test, expect } from "@playwright/test";

test.describe("EventJsonLd", () => {
  test("renders basic Event structured data", async ({ page }) => {
    await page.goto("/event");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Event");
    expect(jsonData.name).toBe("The Adventures of Kira and Morrison");
    expect(jsonData.startDate).toBe("2025-07-21T19:00-05:00");
    expect(jsonData.endDate).toBe("2025-07-21T23:00-05:00");

    // Verify location
    expect(jsonData.location).toEqual({
      "@type": "Place",
      name: "Snickerpark Stadium",
      address: {
        "@type": "PostalAddress",
        streetAddress: "100 West Snickerpark Dr",
        addressLocality: "Snickertown",
        postalCode: "19019",
        addressRegion: "PA",
        addressCountry: "US",
      },
    });

    // Verify images array
    expect(jsonData.image).toEqual([
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg",
    ]);

    // Verify offers
    expect(jsonData.offers).toEqual({
      "@type": "Offer",
      url: "https://www.example.com/event_offer/12345_202403180430",
      price: 30,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2024-05-21T12:00",
    });

    // Verify performer
    expect(jsonData.performer).toEqual({
      "@type": "PerformingGroup",
      name: "Kira and Morrison",
    });

    // Verify organizer
    expect(jsonData.organizer).toEqual({
      "@type": "Organization",
      name: "Kira and Morrison Music",
      url: "https://kiraandmorrisonmusic.com",
    });

    // Verify description
    expect(jsonData.description).toBe(
      "The Adventures of Kira and Morrison is coming to Snickertown in a can't miss performance.",
    );
  });

  test("renders cancelled Event structured data", async ({ page }) => {
    await page.goto("/event-cancelled");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Event");
    expect(jsonData.name).toBe("Summer Music Festival 2025");
    expect(jsonData.eventStatus).toBe("https://schema.org/EventCancelled");

    // Verify dates are preserved for cancelled events
    expect(jsonData.startDate).toBe("2025-08-15T12:00:00-05:00");
    expect(jsonData.endDate).toBe("2025-08-17T23:00:00-05:00");

    // Verify location is preserved
    expect(jsonData.location.name).toBe("City Park Amphitheater");
    expect(jsonData.location.address.addressLocality).toBe("Austin");

    // Verify offers show as sold out
    expect(jsonData.offers.availability).toBe("https://schema.org/SoldOut");
  });

  test("renders rescheduled Event structured data", async ({ page }) => {
    await page.goto("/event-rescheduled");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Event");
    expect(jsonData.name).toBe("Tech Conference 2025: Future of AI");
    expect(jsonData.eventStatus).toBe("https://schema.org/EventRescheduled");

    // Verify new dates
    expect(jsonData.startDate).toBe("2025-09-20T09:00:00-07:00");
    expect(jsonData.endDate).toBe("2025-09-22T17:00:00-07:00");

    // Verify previous dates
    expect(jsonData.previousStartDate).toEqual([
      "2025-03-15T09:00:00-07:00",
      "2025-06-10T09:00:00-07:00",
    ]);

    // Verify multiple offers
    expect(jsonData.offers).toHaveLength(2);
    expect(jsonData.offers[0].price).toBe(299);
    expect(jsonData.offers[1].price).toBe(599);

    // Verify multiple performers
    expect(jsonData.performer).toHaveLength(3);
    expect(jsonData.performer[0]["@type"]).toBe("Person");
    expect(jsonData.performer[0].name).toBe("Dr. Sarah Chen");
    expect(jsonData.performer[2]).toEqual({
      "@type": "PerformingGroup",
      name: "Panel of Industry Experts",
    });

    // Verify URL
    expect(jsonData.url).toBe("https://techconf2025.com");
  });

  test("renders free Event structured data", async ({ page }) => {
    await page.goto("/event-free");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("Event");
    expect(jsonData.name).toBe(
      "Community Coding Workshop: Introduction to Web Development",
    );

    // Verify free event has price 0
    expect(jsonData.offers.price).toBe(0);
    expect(jsonData.offers.priceCurrency).toBe("USD");
    expect(jsonData.offers.availability).toBe("https://schema.org/InStock");

    // Verify string performer is converted
    expect(jsonData.performer).toEqual({
      "@type": "PerformingGroup",
      name: "Sarah Johnson",
    });

    // Verify location
    expect(jsonData.location.name).toBe("Downtown Public Library");
    expect(jsonData.location.address.addressLocality).toBe("Springfield");
    expect(jsonData.location.address.addressRegion).toBe("IL");
  });

  test("supports custom script ID", async ({ page }) => {
    // Create a test page with custom script ID
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "event-custom-id";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Test Event",
        startDate: "2025-01-01T00:00:00",
        location: {
          "@type": "Place",
          address: { "@type": "PostalAddress", name: "Test" },
        },
      });
      document.head.appendChild(script);
    });

    const scriptWithId = await page.locator("#event-custom-id");
    expect(await scriptWithId.count()).toBe(1);
  });
});
