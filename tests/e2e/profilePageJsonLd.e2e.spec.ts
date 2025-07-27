import { test, expect } from "@playwright/test";

test.describe("ProfilePageJsonLd", () => {
  test("renders basic Person profile structured data", async ({ page }) => {
    await page.goto("/profile");

    // Find the JSON-LD script tag
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic ProfilePage properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ProfilePage");
    expect(jsonData.dateCreated).toBe("2024-12-23T12:34:00-05:00");
    expect(jsonData.dateModified).toBe("2024-12-26T14:53:00-05:00");

    // Verify mainEntity is correctly processed as Person
    expect(jsonData.mainEntity).toEqual({
      "@type": "Person",
      name: "Angelo Huff",
    });
  });

  test("renders advanced Person profile with all features", async ({
    page,
  }) => {
    await page.goto("/profile-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ProfilePage structure
    expect(jsonData["@type"]).toBe("ProfilePage");
    expect(jsonData.dateCreated).toBe("2024-12-23T12:34:00-05:00");
    expect(jsonData.dateModified).toBe("2024-12-26T14:53:00-05:00");

    // Verify mainEntity with all Person properties
    const mainEntity = jsonData.mainEntity;
    expect(mainEntity["@type"]).toBe("Person");
    expect(mainEntity.name).toBe("Angelo Huff");
    expect(mainEntity.alternateName).toBe("ahuff23");
    expect(mainEntity.identifier).toBe("123475623");
    expect(mainEntity.description).toBe("Defender of Truth");
    expect(mainEntity.image).toBe("https://example.com/avatars/ahuff23.jpg");
    expect(mainEntity.sameAs).toEqual([
      "https://www.example.com/real-angelo",
      "https://example.com/profile/therealangelohuff",
    ]);

    // Verify interaction statistics are properly processed
    expect(mainEntity.interactionStatistic).toEqual([
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/FollowAction",
        userInteractionCount: 1,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: 5,
      },
    ]);

    expect(mainEntity.agentInteractionStatistic).toEqual({
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WriteAction",
      userInteractionCount: 2346,
    });
  });

  test("renders Organization profile structured data", async ({ page }) => {
    await page.goto("/profile-organization");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ProfilePage structure
    expect(jsonData["@type"]).toBe("ProfilePage");
    expect(jsonData.dateCreated).toBe("2020-01-15T09:00:00-05:00");
    expect(jsonData.dateModified).toBe("2024-12-26T16:30:00-05:00");

    // Verify mainEntity is Organization
    const mainEntity = jsonData.mainEntity;
    expect(mainEntity["@type"]).toBe("Organization");
    expect(mainEntity.name).toBe("TechForum Community");
    expect(mainEntity.url).toBe("https://techforum.example.com");
    expect(mainEntity.logo).toBe("https://techforum.example.com/logo.png");
    expect(mainEntity.alternateName).toBe("TechForum");
    expect(mainEntity.identifier).toBe("org-789012");
    expect(mainEntity.description).toBe(
      "A vibrant community for technology enthusiasts",
    );
    expect(mainEntity.sameAs).toEqual([
      "https://twitter.com/techforum",
      "https://linkedin.com/company/techforum",
      "https://github.com/techforum",
    ]);

    // Verify organization interaction statistics
    expect(mainEntity.interactionStatistic).toEqual([
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/FollowAction",
        userInteractionCount: 15000,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: 45000,
      },
    ]);

    expect(mainEntity.agentInteractionStatistic).toEqual({
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WriteAction",
      userInteractionCount: 8500,
    });
  });
});
