import { test, expect } from "@playwright/test";

test.describe("RecipeJsonLd", () => {
  test("renders basic Recipe structured data", async ({ page }) => {
    await page.goto("/recipe");

    // Find the JSON-LD script tag
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic Recipe properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Recipe");
    expect(jsonData.name).toBe("Classic Chocolate Chip Cookies");
    expect(jsonData.image).toBe(
      "https://example.com/images/chocolate-chip-cookies.jpg",
    );
    expect(jsonData.description).toBe(
      "The perfect chocolate chip cookies - crispy edges with soft, chewy centers",
    );
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Sarah Baker",
    });
    expect(jsonData.datePublished).toBe("2024-01-20T09:00:00+00:00");
    expect(jsonData.url).toBe(
      "https://example.com/recipes/chocolate-chip-cookies",
    );
    expect(jsonData.prepTime).toBe("PT20M");
    expect(jsonData.cookTime).toBe("PT12M");
    expect(jsonData.totalTime).toBe("PT32M");
    expect(jsonData.recipeYield).toBe("36 cookies");
    expect(jsonData.recipeCategory).toBe("dessert");
    expect(jsonData.recipeCuisine).toBe("American");
    expect(jsonData.keywords).toBe("cookies, chocolate chip, dessert, baking");

    // Verify ingredients array
    expect(jsonData.recipeIngredient).toHaveLength(9);
    expect(jsonData.recipeIngredient[0]).toBe("2 1/4 cups all-purpose flour");
    expect(jsonData.recipeIngredient[8]).toBe("2 cups chocolate chips");

    // Verify instructions array
    expect(jsonData.recipeInstructions).toHaveLength(9);
    expect(jsonData.recipeInstructions[0]).toBe("Preheat oven to 375°F");
    expect(jsonData.recipeInstructions[8]).toBe(
      "Cool on baking sheets for 2 minutes; remove to wire racks to cool completely",
    );
  });

  test("renders advanced Recipe with all features", async ({ page }) => {
    await page.goto("/recipe-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify Recipe type and name
    expect(jsonData["@type"]).toBe("Recipe");
    expect(jsonData.name).toBe("Authentic Italian Tiramisu");

    // Verify multiple images
    expect(jsonData.image).toHaveLength(3);
    expect(jsonData.image).toContain(
      "https://example.com/images/tiramisu-16x9.jpg",
    );
    expect(jsonData.image).toContain(
      "https://example.com/images/tiramisu-4x3.jpg",
    );
    expect(jsonData.image).toContain(
      "https://example.com/images/tiramisu-1x1.jpg",
    );

    // Verify Organization author with logo
    expect(jsonData.author).toEqual({
      "@type": "Organization",
      name: "La Cucina Italiana",
      url: "https://example.com",
      logo: {
        "@type": "ImageObject",
        url: "https://example.com/logo.png",
        width: 200,
        height: 200,
      },
    });

    // Verify durations
    expect(jsonData.prepTime).toBe("PT30M");
    expect(jsonData.cookTime).toBe("PT0M");
    expect(jsonData.totalTime).toBe("PT4H30M");

    // Verify numeric yield
    expect(jsonData.recipeYield).toBe("8 servings");

    // Verify HowToSection instructions
    expect(jsonData.recipeInstructions).toHaveLength(2);
    expect(jsonData.recipeInstructions[0]["@type"]).toBe("HowToSection");
    expect(jsonData.recipeInstructions[0].name).toBe(
      "Prepare the Mascarpone Cream",
    );
    expect(jsonData.recipeInstructions[0].itemListElement).toHaveLength(4);
    expect(jsonData.recipeInstructions[0].itemListElement[0]).toEqual({
      "@type": "HowToStep",
      text: "Whisk egg yolks and sugar in a double boiler over simmering water until thick and pale (about 5 minutes)",
      image: "https://example.com/images/tiramisu-step1.jpg",
    });

    expect(jsonData.recipeInstructions[1]["@type"]).toBe("HowToSection");
    expect(jsonData.recipeInstructions[1].name).toBe("Assemble the Tiramisu");
    expect(jsonData.recipeInstructions[1].itemListElement).toHaveLength(6);

    // Verify nutrition information
    expect(jsonData.nutrition).toEqual({
      "@type": "NutritionInformation",
      calories: "385 calories",
      proteinContent: "7g",
      carbohydrateContent: "28g",
      fatContent: "28g",
      saturatedFatContent: "16g",
      cholesterolContent: "215mg",
      sodiumContent: "95mg",
      sugarContent: "20g",
      servingSize: "1 piece (1/8 of dish)",
    });

    // Verify aggregate rating
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.9,
      ratingCount: 487,
      reviewCount: 423,
      bestRating: 5,
      worstRating: 1,
    });

    // Verify video object
    expect(jsonData.video).toEqual({
      "@type": "VideoObject",
      name: "How to Make Authentic Tiramisu",
      description:
        "Watch our Italian chef demonstrate the traditional method of making tiramisu",
      thumbnailUrl: [
        "https://example.com/video/tiramisu-thumb-1.jpg",
        "https://example.com/video/tiramisu-thumb-2.jpg",
      ],
      contentUrl: "https://example.com/videos/tiramisu-tutorial.mp4",
      embedUrl: "https://example.com/embed/tiramisu-tutorial",
      uploadDate: "2024-01-20T10:00:00+00:00",
      duration: "PT12M45S",
    });
  });

  test("properly escapes script-breaking sequences in recipe content", async ({
    page,
  }) => {
    // Navigate to recipe page
    await page.goto("/recipe");

    // Execute JavaScript to add RecipeJsonLd with dangerous sequences
    await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      if (script) {
        const data = {
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: "Recipe with </script> tag",
          image: "https://example.com/recipe.jpg?size=large&format=webp",
          description: "Recipe with <!-- HTML comment --> in description",
          recipeIngredient: [
            "Ingredient with & ampersand",
            "Another with </SCRIPT> tag",
          ],
          recipeInstructions: "Mix & bake at 350°F",
          video: {
            "@type": "VideoObject",
            name: "Recipe Video",
            description: "Video with </script> in description",
            thumbnailUrl: "https://example.com/thumb.jpg?t=123&v=456",
            contentUrl:
              "https://example.com/video.mp4?quality=hd&autoplay=false",
            uploadDate: "2024-01-01",
          },
        };
        // Use a custom stringify to inject the test data
        script.textContent = JSON.stringify(data)
          .replace(/<\/script>/gi, "\\u003C/script>") // Unicode escape for <
          .replace(/<!--/g, "\\u003C!--") // Unicode escape for <
          .replace(/-->/g, "--\\u003E"); // Unicode escape for >
      }
    });

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Verify that dangerous sequences are escaped
    expect(jsonLdScript).toContain("\\u003C/script>");
    // Case-insensitive regex normalizes all to lowercase
    expect(jsonLdScript).toContain("\\u003C!--");
    expect(jsonLdScript).toContain("--\\u003E");

    // Verify URLs with query parameters are NOT escaped
    expect(jsonLdScript).toContain("size=large&format=webp");
    expect(jsonLdScript).toContain("t=123&v=456");
    expect(jsonLdScript).toContain("quality=hd&autoplay=false");
    expect(jsonLdScript).not.toContain("&amp;");

    // Verify the JSON can still be parsed
    const jsonData = JSON.parse(jsonLdScript!);
    expect(jsonData.name).toBe("Recipe with </script> tag");
    expect(jsonData.image).toBe(
      "https://example.com/recipe.jpg?size=large&format=webp",
    );
    expect(jsonData.video.contentUrl).toBe(
      "https://example.com/video.mp4?quality=hd&autoplay=false",
    );
  });

  test("verifies all required properties are present", async ({ page }) => {
    await page.goto("/recipe");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify required properties according to Google's documentation
    expect(jsonData).toHaveProperty("@context");
    expect(jsonData).toHaveProperty("@type");
    expect(jsonData).toHaveProperty("name");
    expect(jsonData).toHaveProperty("image");

    // Verify the values are not empty
    expect(jsonData["@context"]).toBeTruthy();
    expect(jsonData["@type"]).toBeTruthy();
    expect(jsonData.name).toBeTruthy();
    expect(jsonData.image).toBeTruthy();
  });

  test("renders multiple JSON-LD scripts on the same page", async ({
    page,
  }) => {
    // Navigate to a page with recipe structured data
    await page.goto("/recipe");

    // Count JSON-LD scripts
    const scriptsCount = await page
      .locator('script[type="application/ld+json"]')
      .count();
    expect(scriptsCount).toBeGreaterThanOrEqual(1);

    // Verify each script contains valid JSON
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    for (const script of scripts) {
      const content = await script.textContent();
      expect(() => JSON.parse(content!)).not.toThrow();

      const jsonData = JSON.parse(content!);
      // Verify it's a Recipe type
      if (jsonData["@type"] === "Recipe") {
        expect(jsonData).toHaveProperty("name");
        expect(jsonData).toHaveProperty("image");
      }
    }
  });

  test("verifies ISO 8601 duration format for time properties", async ({
    page,
  }) => {
    await page.goto("/recipe");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ISO 8601 duration format
    expect(jsonData.prepTime).toMatch(/^PT\d+[HMS]/);
    expect(jsonData.cookTime).toMatch(/^PT\d+[HMS]/);
    expect(jsonData.totalTime).toMatch(/^PT\d+[HMS]/);

    // Verify specific values
    expect(jsonData.prepTime).toBe("PT20M"); // 20 minutes
    expect(jsonData.cookTime).toBe("PT12M"); // 12 minutes
    expect(jsonData.totalTime).toBe("PT32M"); // 32 minutes total
  });
});
