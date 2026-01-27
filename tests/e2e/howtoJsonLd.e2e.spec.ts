import { test, expect } from "@playwright/test";

test.describe("HowToJsonLd", () => {
  test("renders basic HowTo structured data", async ({ page }) => {
    await page.goto("/howto");

    // Find the JSON-LD script tag
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic HowTo properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("HowTo");
    expect(jsonData.name).toBe("How to Change a Flat Tire");
    expect(jsonData.description).toBe(
      "Step-by-step guide to safely change a flat tire on the roadside",
    );
    expect(jsonData.image).toBe("https://example.com/images/tire-change.jpg");
    expect(jsonData.estimatedCost).toBe("$20");
    expect(jsonData.prepTime).toBe("PT5M");
    expect(jsonData.performTime).toBe("PT25M");
    expect(jsonData.totalTime).toBe("PT30M");
    expect(jsonData.yield).toBe("1 changed tire");

    // Verify tools array
    expect(jsonData.tool).toHaveLength(4);
    expect(jsonData.tool[0]).toEqual({
      "@type": "HowToTool",
      name: "Spare tire",
    });
    expect(jsonData.tool[1]).toEqual({
      "@type": "HowToTool",
      name: "Lug wrench",
    });
    expect(jsonData.tool[2]).toEqual({
      "@type": "HowToTool",
      name: "Jack",
    });
    expect(jsonData.tool[3]).toEqual({
      "@type": "HowToTool",
      name: "Wheel wedges",
    });

    // Verify supplies array
    expect(jsonData.supply).toHaveLength(1);
    expect(jsonData.supply[0]).toEqual({
      "@type": "HowToSupply",
      name: "Flares",
    });

    // Verify steps array
    expect(jsonData.step).toHaveLength(9);
    expect(jsonData.step[0]).toBe(
      "Turn on your hazard lights and apply parking brake",
    );
    expect(jsonData.step[8]).toBe(
      "Check the tire pressure and drive to a service station",
    );
  });

  test("renders advanced HowTo with sections and detailed steps", async ({
    page,
  }) => {
    await page.goto("/howto-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify HowTo type and name
    expect(jsonData["@type"]).toBe("HowTo");
    expect(jsonData.name).toBe("How to Change a Flat Tire");

    // Verify ImageObject
    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/images/tire-change-guide.jpg",
      width: 1200,
      height: 800,
    });

    // Verify MonetaryAmount estimated cost
    expect(jsonData.estimatedCost).toEqual({
      "@type": "MonetaryAmount",
      currency: "USD",
      value: 20,
    });

    // Verify durations
    expect(jsonData.prepTime).toBe("PT5M");
    expect(jsonData.performTime).toBe("PT25M");
    expect(jsonData.totalTime).toBe("PT30M");

    // Verify tools with images
    expect(jsonData.tool).toHaveLength(4);
    expect(jsonData.tool[1]).toEqual({
      "@type": "HowToTool",
      name: "Lug wrench",
      image: "https://example.com/images/lug-wrench.jpg",
    });
    expect(jsonData.tool[3]).toEqual({
      "@type": "HowToTool",
      name: "Wheel wedges",
      image: "https://example.com/images/wheel-wedges.jpg",
    });

    // Verify supply with image
    expect(jsonData.supply).toHaveLength(1);
    expect(jsonData.supply[0]).toEqual({
      "@type": "HowToSupply",
      name: "Flares",
      image: "https://example.com/images/flares.jpg",
    });

    // Verify HowToSections
    expect(jsonData.step).toHaveLength(3);

    // First section: Preparation
    expect(jsonData.step[0]["@type"]).toBe("HowToSection");
    expect(jsonData.step[0].name).toBe("Preparation");
    expect(jsonData.step[0].position).toBe(1);
    expect(jsonData.step[0].itemListElement).toHaveLength(2);

    // Check HowToDirection and HowToTip in first step
    const firstStep = jsonData.step[0].itemListElement[0];
    expect(firstStep["@type"]).toBe("HowToStep");
    expect(firstStep.itemListElement).toHaveLength(2);
    expect(firstStep.itemListElement[0]["@type"]).toBe("HowToDirection");
    expect(firstStep.itemListElement[0].text).toBe(
      "Turn on your hazard lights and set the flares.",
    );
    expect(firstStep.itemListElement[1]["@type"]).toBe("HowToTip");
    expect(firstStep.itemListElement[1].text).toBe(
      "You're going to need space and want to be visible.",
    );

    // Second section: Raise the car
    expect(jsonData.step[1]["@type"]).toBe("HowToSection");
    expect(jsonData.step[1].name).toBe("Raise the car");
    expect(jsonData.step[1].position).toBe(2);
    expect(jsonData.step[1].itemListElement).toHaveLength(5);

    // Check step with image
    expect(jsonData.step[1].itemListElement[0].image).toBe(
      "https://example.com/images/position-jack.jpg",
    );

    // Check step with beforeMedia and afterMedia
    const raiseStep = jsonData.step[1].itemListElement[1];
    expect(raiseStep.itemListElement[0].beforeMedia).toBe(
      "https://example.com/images/car-on-ground.jpg",
    );
    expect(raiseStep.itemListElement[0].afterMedia).toBe(
      "https://example.com/images/car-raised.jpg",
    );

    // Third section: Finishing up
    expect(jsonData.step[2]["@type"]).toBe("HowToSection");
    expect(jsonData.step[2].name).toBe("Finishing up");
    expect(jsonData.step[2].position).toBe(3);
    expect(jsonData.step[2].itemListElement).toHaveLength(3);

    // Verify video object
    expect(jsonData.video).toEqual({
      "@type": "VideoObject",
      name: "How to Change a Tire Video Tutorial",
      description:
        "Watch our mechanic demonstrate the proper technique for changing a flat tire",
      thumbnailUrl: "https://example.com/video/tire-change-thumb.jpg",
      contentUrl: "https://example.com/video/tire-change-tutorial.mp4",
      uploadDate: "2024-01-15T08:00:00+00:00",
      duration: "PT8M30S",
    });
  });

  test("verifies all required properties are present", async ({ page }) => {
    await page.goto("/howto");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify required properties according to Schema.org documentation
    expect(jsonData).toHaveProperty("@context");
    expect(jsonData).toHaveProperty("@type");
    expect(jsonData).toHaveProperty("name");

    // Verify the values are not empty
    expect(jsonData["@context"]).toBeTruthy();
    expect(jsonData["@type"]).toBeTruthy();
    expect(jsonData.name).toBeTruthy();
  });

  test("verifies ISO 8601 duration format for time properties", async ({
    page,
  }) => {
    await page.goto("/howto");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ISO 8601 duration format
    expect(jsonData.prepTime).toMatch(/^PT\d+[HMS]/);
    expect(jsonData.performTime).toMatch(/^PT\d+[HMS]/);
    expect(jsonData.totalTime).toMatch(/^PT\d+[HMS]/);

    // Verify specific values
    expect(jsonData.prepTime).toBe("PT5M");
    expect(jsonData.performTime).toBe("PT25M");
    expect(jsonData.totalTime).toBe("PT30M");
  });

  test("verifies correct @type values for nested objects", async ({ page }) => {
    await page.goto("/howto-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify tool @type
    for (const tool of jsonData.tool) {
      expect(tool["@type"]).toBe("HowToTool");
    }

    // Verify supply @type
    for (const supply of jsonData.supply) {
      expect(supply["@type"]).toBe("HowToSupply");
    }

    // Verify section @type
    for (const section of jsonData.step) {
      expect(section["@type"]).toBe("HowToSection");
    }

    // Verify video @type
    expect(jsonData.video["@type"]).toBe("VideoObject");

    // Verify image @type
    expect(jsonData.image["@type"]).toBe("ImageObject");

    // Verify estimatedCost @type
    expect(jsonData.estimatedCost["@type"]).toBe("MonetaryAmount");
  });
});
