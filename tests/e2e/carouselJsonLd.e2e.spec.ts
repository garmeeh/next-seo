import { test, expect } from "@playwright/test";

test.describe("CarouselJsonLd", () => {
  test("renders summary page carousel structured data", async ({ page }) => {
    await page.goto("/carousel-summary");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify ItemList structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(5);

    // Verify first item (simple URL string)
    expect(jsonData.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      url: "https://example.com/recipe/chocolate-cookies",
    });

    // Verify second item (auto-positioned)
    expect(jsonData.itemListElement[1]).toEqual({
      "@type": "ListItem",
      position: 2,
      url: "https://example.com/recipe/banana-bread",
    });

    // Verify third item (custom position)
    expect(jsonData.itemListElement[2]).toEqual({
      "@type": "ListItem",
      position: 3,
      url: "https://example.com/recipe/apple-pie",
    });

    // Verify positions are correct
    expect(jsonData.itemListElement[3].position).toBe(4);
    expect(jsonData.itemListElement[4].position).toBe(5);
  });

  test("renders Course carousel with full data", async ({ page }) => {
    await page.goto("/carousel-course");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(4);

    // Verify first course with string provider
    const firstCourse = jsonData.itemListElement[0];
    expect(firstCourse["@type"]).toBe("ListItem");
    expect(firstCourse.position).toBe(1);
    expect(firstCourse.item["@type"]).toBe("Course");
    expect(firstCourse.item.name).toBe("Introduction to Web Development");
    expect(firstCourse.item.description).toContain("Learn the fundamentals");
    expect(firstCourse.item.provider).toEqual({
      "@type": "Organization",
      name: "Tech Academy Online",
    });

    // Verify second course with object provider
    const secondCourse = jsonData.itemListElement[1];
    expect(secondCourse.item.provider["@type"]).toBe("Organization");
    expect(secondCourse.item.provider.name).toBe("Code School Pro");
    expect(secondCourse.item.provider.url).toBe("https://example.com/school");

    // Verify third course with provider having sameAs
    const thirdCourse = jsonData.itemListElement[2];
    expect(thirdCourse.item.provider.sameAs).toEqual([
      "https://twitter.com/devinstitute",
    ]);
  });

  test("renders Movie carousel with directors and reviews", async ({
    page,
  }) => {
    await page.goto("/carousel-movie");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(4);

    // Verify The Matrix movie
    const matrix = jsonData.itemListElement[0].item;
    expect(matrix["@type"]).toBe("Movie");
    expect(matrix.name).toBe("The Matrix");
    expect(Array.isArray(matrix.image)).toBe(true);
    expect(matrix.image).toHaveLength(2);
    expect(matrix.director).toEqual({
      "@type": "Person",
      name: "The Wachowskis",
    });
    expect(matrix.aggregateRating["@type"]).toBe("AggregateRating");
    expect(matrix.aggregateRating.ratingValue).toBe(8.7);
    expect(matrix.review["@type"]).toBe("Review");
    expect(matrix.review.author).toEqual({
      "@type": "Person",
      name: "Film Critic Daily",
    });

    // Verify Inception with object director
    const inception = jsonData.itemListElement[1].item;
    expect(inception.director["@type"]).toBe("Person");
    expect(inception.director.name).toBe("Christopher Nolan");
    expect(inception.director.url).toBe("https://example.com/directors/nolan");

    // Verify Interstellar with multiple images
    const interstellar = jsonData.itemListElement[2].item;
    expect(interstellar.image).toHaveLength(3);
    expect(interstellar.review.reviewRating["@type"]).toBe("Rating");
    expect(interstellar.review.reviewRating.bestRating).toBe(5);
  });

  test("renders Recipe carousel with full recipe details", async ({ page }) => {
    await page.goto("/carousel-recipe");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(3);

    // Verify chocolate chip cookies
    const cookies = jsonData.itemListElement[0].item;
    expect(cookies["@type"]).toBe("Recipe");
    expect(cookies.name).toBe("Perfect Chocolate Chip Cookies");
    expect(Array.isArray(cookies.image)).toBe(true);
    expect(cookies.image).toHaveLength(3);
    expect(cookies.author).toEqual({
      "@type": "Person",
      name: "Chef Sarah",
    });
    expect(cookies.recipeYield).toBe("24 cookies");
    expect(cookies.recipeIngredient).toHaveLength(9);
    expect(cookies.recipeInstructions).toHaveLength(8);
    expect(cookies.nutrition["@type"]).toBe("NutritionInformation");
    expect(cookies.nutrition.calories).toBe("210 calories");
    expect(cookies.aggregateRating["@type"]).toBe("AggregateRating");

    // Verify banana bread with author and video
    const bananaBread = jsonData.itemListElement[1].item;
    expect(bananaBread.author).toEqual({
      "@type": "Person",
      name: "Grandma Rose",
    });
    expect(bananaBread.recipeInstructions["@type"]).toBe("HowToSection");
    expect(bananaBread.recipeInstructions.itemListElement).toHaveLength(6);
    expect(bananaBread.video["@type"]).toBe("VideoObject");
    expect(bananaBread.video.duration).toBe("PT8M");

    // Verify pizza with HowToStep instructions
    const pizza = jsonData.itemListElement[2].item;
    expect(pizza.image["@type"]).toBe("ImageObject");
    expect(pizza.image.width).toBe(1200);
    expect(pizza.recipeInstructions[0]["@type"]).toBe("HowToStep");
    expect(pizza.recipeInstructions[0].name).toBe("Prepare dough");
  });

  test("renders Restaurant carousel with address and opening hours", async ({
    page,
  }) => {
    await page.goto("/carousel-restaurant");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("ItemList");
    expect(jsonData.itemListElement).toHaveLength(4);

    // Verify Luigi's with string address
    const luigis = jsonData.itemListElement[0].item;
    expect(luigis["@type"]).toBe("Restaurant");
    expect(luigis.name).toBe("Luigi's Italian Bistro");
    expect(luigis.address).toBe("123 Main Street, New York, NY 10001");
    expect(luigis.priceRange).toBe("$$$");
    expect(Array.isArray(luigis.servesCuisine)).toBe(true);
    expect(luigis.servesCuisine).toContain("Italian");
    expect(luigis.geo["@type"]).toBe("GeoCoordinates");
    expect(luigis.geo.latitude).toBe(40.7489);
    expect(luigis.openingHoursSpecification).toHaveLength(3);
    expect(luigis.openingHoursSpecification[0]["@type"]).toBe(
      "OpeningHoursSpecification",
    );
    expect(luigis.review["@type"]).toBe("Review");
    expect(luigis.sameAs).toHaveLength(2);

    // Verify Sakura with PostalAddress object
    const sakura = jsonData.itemListElement[1].item;
    expect(sakura.address["@type"]).toBe("PostalAddress");
    expect(sakura.address.streetAddress).toBe("456 Oak Avenue");
    expect(sakura.address.addressLocality).toBe("San Francisco");
    expect(sakura.address.postalCode).toBe("94102");
    expect(sakura.openingHoursSpecification["@type"]).toBe(
      "OpeningHoursSpecification",
    );

    // Verify Garden Terrace with multiple reviews
    const garden = jsonData.itemListElement[2].item;
    expect(garden.image["@type"]).toBe("ImageObject");
    expect(Array.isArray(garden.review)).toBe(true);
    expect(garden.review).toHaveLength(2);
    expect(garden.review[0].author).toEqual({
      "@type": "Person",
      name: "Michelin Guide",
    });
    expect(garden.review[1].author["@type"]).toBe("Person");

    // Verify Taco Paradise
    const taco = jsonData.itemListElement[3].item;
    expect(Array.isArray(taco.image)).toBe(true);
    expect(taco.image).toHaveLength(3);
    expect(taco.priceRange).toBe("$");
  });

  test("properly escapes special characters in carousel content", async ({
    page,
  }) => {
    // Create a test page with special characters
    await page.goto("/carousel-recipe");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Should be valid JSON even with special characters in content
    expect(() => JSON.parse(jsonLdScript!)).not.toThrow();

    // Check that content with quotes and special chars is properly handled
    const jsonData = JSON.parse(jsonLdScript!);
    expect(jsonData.itemListElement[0].item.recipeIngredient).toContain(
      "2 1/4 cups all-purpose flour",
    );
  });
});
