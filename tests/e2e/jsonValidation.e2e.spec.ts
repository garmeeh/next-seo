import { test, expect } from "@playwright/test";

test.describe("JSON-LD Validation Tests", () => {
  test.describe("Valid JSON Structure", () => {
    test("ArticleJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/article");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      // This is the critical test - JSON.parse will throw if invalid
      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      // Basic structure validation
      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBeTruthy();
    });

    test("NewsArticle variant produces valid JSON", async ({ page }) => {
      await page.goto("/news-article");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("NewsArticle");
    });

    test("BlogPosting variant produces valid JSON", async ({ page }) => {
      await page.goto("/blog-posting");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("BlogPosting");
    });

    test("RecipeJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/recipe");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Recipe");
    });

    test("RecipeJsonLd with advanced features produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/recipe-advanced");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Recipe");
      // Check nested objects are valid
      expect(jsonData!.nutrition).toBeDefined();
      expect(jsonData!.aggregateRating).toBeDefined();
      expect(jsonData!.video).toBeDefined();
    });

    test("OrganizationJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/organization");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Organization");
    });

    test("OnlineStore variant produces valid JSON", async ({ page }) => {
      await page.goto("/online-store");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("OnlineStore");
      // Check nested merchant return policy is valid
      if (jsonData!.hasMerchantReturnPolicy) {
        expect(jsonData!.hasMerchantReturnPolicy["@type"]).toBe(
          "MerchantReturnPolicy",
        );
      }
    });

    test("Organization with complex nested data produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/organization-advanced");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      // Check arrays are valid
      expect(Array.isArray(jsonData!.address)).toBe(true);
      expect(Array.isArray(jsonData!.contactPoint)).toBe(true);
    });
  });

  test.describe("Edge Cases and Special Characters", () => {
    test("handles JSON with quotes in content", async ({ page }) => {
      // Create a test page with quotes in content
      await page.route("/test-quotes", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: `
            <html>
              <head>
                <script type="application/ld+json">
                {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": "How to use \\"quotes\\" in JSON",
                  "description": "This article explains 'single' and \\"double\\" quotes"
                }
                </script>
              </head>
              <body>Test</body>
            </html>
          `,
        });
      });

      await page.goto("/test-quotes");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData!.headline).toContain('"quotes"');
      expect(jsonData!.description).toContain("'single'");
      expect(jsonData!.description).toContain('"double"');
    });

    test("handles JSON with backslashes and escape sequences", async ({
      page,
    }) => {
      await page.route("/test-escapes", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: `
            <html>
              <head>
                <script type="application/ld+json">
                {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": "Path: C:\\\\Users\\\\Documents",
                  "description": "Line 1\\nLine 2\\tTabbed"
                }
                </script>
              </head>
              <body>Test</body>
            </html>
          `,
        });
      });

      await page.goto("/test-escapes");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData!.headline).toBe("Path: C:\\Users\\Documents");
      expect(jsonData!.description).toContain("\n");
      expect(jsonData!.description).toContain("\t");
    });

    test("handles deeply nested JSON structures", async ({ page }) => {
      await page.route("/test-nested", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: `
            <html>
              <head>
                <script type="application/ld+json">
                {
                  "@context": "https://schema.org",
                  "@type": "Recipe",
                  "name": "Test Recipe",
                  "nutrition": {
                    "@type": "NutritionInformation",
                    "calories": "250 calories",
                    "servingSize": "1 serving"
                  },
                  "recipeInstructions": [
                    {
                      "@type": "HowToStep",
                      "name": "Step 1",
                      "text": "Do something",
                      "image": {
                        "@type": "ImageObject",
                        "url": "https://example.com/step1.jpg",
                        "width": 300,
                        "height": 200
                      }
                    }
                  ]
                }
                </script>
              </head>
              <body>Test</body>
            </html>
          `,
        });
      });

      await page.goto("/test-nested");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      // Verify deeply nested structures are accessible
      expect(jsonData!.nutrition["@type"]).toBe("NutritionInformation");
      expect(jsonData!.recipeInstructions[0].image["@type"]).toBe(
        "ImageObject",
      );
      expect(jsonData!.recipeInstructions[0].image.width).toBe(300);
    });

    test("handles arrays with mixed content types", async ({ page }) => {
      await page.route("/test-arrays", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: `
            <html>
              <head>
                <script type="application/ld+json">
                {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "author": [
                    "John Doe",
                    {
                      "@type": "Person",
                      "name": "Jane Smith",
                      "url": "https://example.com/jane"
                    },
                    {
                      "@type": "Organization",
                      "name": "Tech Corp",
                      "logo": "https://example.com/logo.png"
                    }
                  ],
                  "image": [
                    "https://example.com/image1.jpg",
                    {
                      "@type": "ImageObject",
                      "url": "https://example.com/image2.jpg",
                      "width": 800,
                      "height": 600
                    }
                  ]
                }
                </script>
              </head>
              <body>Test</body>
            </html>
          `,
        });
      });

      await page.goto("/test-arrays");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      // Verify mixed arrays are valid
      expect(jsonData!.author).toHaveLength(3);
      expect(typeof jsonData!.author[0]).toBe("string");
      expect(jsonData!.author[1]["@type"]).toBe("Person");
      expect(jsonData!.author[2]["@type"]).toBe("Organization");

      expect(jsonData!.image).toHaveLength(2);
      expect(typeof jsonData!.image[0]).toBe("string");
      expect(jsonData!.image[1]["@type"]).toBe("ImageObject");
    });

    test("preserves URL query parameters correctly", async ({ page }) => {
      await page.route("/test-url-params", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: `
            <html>
              <head>
                <script type="application/ld+json">
                {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": "Test Article",
                  "url": "https://example.com/article?title=yes&page=1&utm_source=google&filter=new",
                  "mainEntityOfPage": "https://example.com/main?category=tech&sort=date",
                  "author": {
                    "@type": "Person",
                    "name": "John Doe",
                    "url": "https://example.com/authors/john?bio=full&lang=en"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Example Corp",
                    "url": "https://example.com?ref=article&campaign=2024"
                  }
                }
                </script>
              </head>
              <body>Test</body>
            </html>
          `,
        });
      });

      await page.goto("/test-url-params");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      // Verify URL parameters are preserved correctly
      expect(jsonData!.url).toBe(
        "https://example.com/article?title=yes&page=1&utm_source=google&filter=new",
      );
      expect(jsonData!.mainEntityOfPage).toBe(
        "https://example.com/main?category=tech&sort=date",
      );
      expect(jsonData!.author.url).toBe(
        "https://example.com/authors/john?bio=full&lang=en",
      );
      expect(jsonData!.publisher.url).toBe(
        "https://example.com?ref=article&campaign=2024",
      );

      // Verify the parameters can be parsed
      const articleUrl = new URL(jsonData!.url);
      expect(articleUrl.searchParams.get("title")).toBe("yes");
      expect(articleUrl.searchParams.get("page")).toBe("1");
      expect(articleUrl.searchParams.get("utm_source")).toBe("google");
      expect(articleUrl.searchParams.get("filter")).toBe("new");
    });

    test("LocalBusinessJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/local-business");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("LocalBusiness");
    });

    test("Restaurant variant produces valid JSON", async ({ page }) => {
      await page.goto("/restaurant");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Restaurant");
      // Check nested objects are valid
      expect(jsonData!.geo).toBeDefined();
      expect(jsonData!.aggregateRating).toBeDefined();
      expect(Array.isArray(jsonData!.review)).toBe(true);
    });

    test("Store with departments produces valid JSON", async ({ page }) => {
      await page.goto("/store-with-departments");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Store");
      // Check departments array is valid
      expect(Array.isArray(jsonData!.department)).toBe(true);
      expect(jsonData!.department).toHaveLength(3);
      // Check each department has valid structure
      jsonData!.department.forEach((dept: Record<string, unknown>) => {
        expect(dept["@type"]).toBeTruthy();
        expect(dept.name).toBeTruthy();
      });
    });

    test("EventJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/event");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Event");
      // Check nested objects are valid
      expect(jsonData!.location).toBeDefined();
      expect(jsonData!.location["@type"]).toBe("Place");
      expect(jsonData!.offers).toBeDefined();
      expect(jsonData!.offers["@type"]).toBe("Offer");
    });

    test("Cancelled Event produces valid JSON", async ({ page }) => {
      await page.goto("/event-cancelled");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Event");
      expect(jsonData!.eventStatus).toBe("https://schema.org/EventCancelled");
    });

    test("Rescheduled Event produces valid JSON", async ({ page }) => {
      await page.goto("/event-rescheduled");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Event");
      expect(jsonData!.eventStatus).toBe("https://schema.org/EventRescheduled");
      // Check arrays are valid
      expect(Array.isArray(jsonData!.previousStartDate)).toBe(true);
      expect(Array.isArray(jsonData!.offers)).toBe(true);
      expect(Array.isArray(jsonData!.performer)).toBe(true);
    });

    test("Free Event produces valid JSON", async ({ page }) => {
      await page.goto("/event-free");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("Event");
      // Check free event has price 0
      expect(jsonData!.offers.price).toBe(0);
      expect(jsonData!.offers["@type"]).toBe("Offer");
    });

    test("FAQJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/faq");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("FAQPage");
      // Check mainEntity array is valid
      expect(Array.isArray(jsonData!.mainEntity)).toBe(true);
      expect(jsonData!.mainEntity.length).toBeGreaterThan(0);
      // Check each question has valid structure
      jsonData!.mainEntity.forEach((question: Record<string, unknown>) => {
        expect(question["@type"]).toBe("Question");
        expect(question.name).toBeTruthy();
        expect(question.acceptedAnswer).toBeTruthy();
        const answer = question.acceptedAnswer as Record<string, unknown>;
        expect(answer["@type"]).toBe("Answer");
        expect(answer.text).toBeTruthy();
      });
    });

    test("Advanced FAQJsonLd with HTML produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/faq-advanced");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("FAQPage");
      expect(Array.isArray(jsonData!.mainEntity)).toBe(true);

      // Check HTML content is preserved properly
      const firstAnswer = jsonData!.mainEntity[0].acceptedAnswer.text;
      expect(firstAnswer).toContain("<p>");
      expect(firstAnswer).toContain("<ul>");
      expect(firstAnswer).toContain("<li>");
      expect(firstAnswer).toContain("<a href=");
    });

    test("Health-focused FAQJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/faq-health");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org");
      expect(jsonData!["@type"]).toBe("FAQPage");
      expect(Array.isArray(jsonData!.mainEntity)).toBe(true);
      expect(jsonData!.mainEntity).toHaveLength(5);

      // Verify complex HTML structures are valid
      jsonData!.mainEntity.forEach((question: Record<string, unknown>) => {
        expect(question["@type"]).toBe("Question");
        const answer = question.acceptedAnswer as Record<string, unknown>;
        expect(answer["@type"]).toBe("Answer");
        expect(typeof answer.text).toBe("string");
      });
    });
  });
});
