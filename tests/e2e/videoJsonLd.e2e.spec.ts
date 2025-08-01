import { test, expect } from "@playwright/test";

test.describe("VideoJsonLd", () => {
  test("renders basic video structured data", async ({ page }) => {
    await page.goto("/video");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("VideoObject");
    expect(jsonData.name).toBe("How to Make a Perfect Chocolate Cake");
    expect(jsonData.description).toBe(
      "Learn how to make the perfect chocolate cake with this easy step-by-step recipe tutorial",
    );
    expect(jsonData.thumbnailUrl).toBe(
      "https://example.com/chocolate-cake-thumbnail.jpg",
    );
    expect(jsonData.uploadDate).toBe("2024-01-15T08:00:00+00:00");
    expect(jsonData.contentUrl).toBe(
      "https://example.com/videos/chocolate-cake-recipe.mp4",
    );
    expect(jsonData.embedUrl).toBe(
      "https://example.com/embed/chocolate-cake-recipe",
    );
    expect(jsonData.duration).toBe("PT10M30S");
  });

  test("renders advanced video with all features", async ({ page }) => {
    await page.goto("/video-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Check multiple thumbnails
    expect(jsonData.thumbnailUrl).toHaveLength(3);
    expect(jsonData.thumbnailUrl[0]).toBe(
      "https://example.com/thumbnails/masterclass-1x1.jpg",
    );

    // Check interaction statistics
    expect(jsonData.interactionStatistic).toHaveLength(2);
    expect(jsonData.interactionStatistic[0]["@type"]).toBe(
      "InteractionCounter",
    );
    expect(jsonData.interactionStatistic[0].interactionType).toBe(
      "WatchAction",
    );
    expect(jsonData.interactionStatistic[0].userInteractionCount).toBe(500000);

    // Check regions
    expect(jsonData.regionsAllowed).toEqual(["US", "CA", "GB", "AU", "NZ"]);
    expect(jsonData.ineligibleRegion).toEqual(["CN", "RU"]);

    // Check authors
    expect(jsonData.author).toHaveLength(2);
    expect(jsonData.author[0]["@type"]).toBe("Person");
    expect(jsonData.author[0].name).toBe("Chef Julia Martinez");
    expect(jsonData.author[1].name).toBe("Chef Paul Anderson");

    // Check publisher
    expect(jsonData.publisher["@type"]).toBe("Organization");
    expect(jsonData.publisher.name).toBe("Culinary Institute Online");
    expect(jsonData.publisher.logo).toBe(
      "https://example.com/culinary-institute-logo.png",
    );
  });

  test("renders live video with BroadcastEvent", async ({ page }) => {
    await page.goto("/video-live");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData.publication).toHaveLength(2);

    // Check first broadcast
    expect(jsonData.publication[0]["@type"]).toBe("BroadcastEvent");
    expect(jsonData.publication[0].name).toBe("First Broadcast");
    expect(jsonData.publication[0].isLiveBroadcast).toBe(true);
    expect(jsonData.publication[0].startDate).toBe("2024-12-31T20:00:00+00:00");
    expect(jsonData.publication[0].endDate).toBe("2024-12-31T22:00:00+00:00");

    // Check encore broadcast
    expect(jsonData.publication[1]["@type"]).toBe("BroadcastEvent");
    expect(jsonData.publication[1].name).toBe("Encore Presentation");
    expect(jsonData.publication[1].isLiveBroadcast).toBe(true);
    expect(jsonData.publication[1].startDate).toBe("2025-01-01T14:00:00+00:00");
  });

  test("renders video with clips for key moments", async ({ page }) => {
    await page.goto("/video-clips");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData.hasPart).toHaveLength(5);

    // Check first clip
    expect(jsonData.hasPart[0]["@type"]).toBe("Clip");
    expect(jsonData.hasPart[0].name).toBe("Introduction to French Pastries");
    expect(jsonData.hasPart[0].startOffset).toBe(0);
    expect(jsonData.hasPart[0].endOffset).toBe(180);
    expect(jsonData.hasPart[0].url).toBe(
      "https://example.com/videos/french-pastries-guide?t=0",
    );

    // Check croissants clip
    expect(jsonData.hasPart[1].name).toBe("Making Croissants");
    expect(jsonData.hasPart[1].startOffset).toBe(180);
    expect(jsonData.hasPart[1].endOffset).toBe(720);

    // Verify all clips have proper structure
    jsonData.hasPart.forEach(
      (clip: {
        "@type": string;
        name: string;
        startOffset: number;
        endOffset: number;
        url: string;
      }) => {
        expect(clip["@type"]).toBe("Clip");
        expect(clip.name).toBeTruthy();
        expect(typeof clip.startOffset).toBe("number");
        expect(typeof clip.endOffset).toBe("number");
        expect(clip.url).toMatch(/\?t=\d+$/);
      },
    );
  });

  test("renders video with SeekToAction", async ({ page }) => {
    await page.goto("/video-seekto");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData.potentialAction).toBeTruthy();
    expect(jsonData.potentialAction["@type"]).toBe("SeekToAction");
    expect(jsonData.potentialAction.target).toBe(
      "https://example.com/videos/kitchen-tips?t={seek_to_second_number}",
    );
    expect(jsonData.potentialAction["startOffset-input"]).toBe(
      "required name=seek_to_second_number",
    );
  });
});
