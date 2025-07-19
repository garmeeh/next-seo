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
    test("handles deeply nested JSON structures", async ({ page }) => {
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
      expect(jsonData!.author[0]["@type"]).toBe("Person");
      expect(jsonData!.author[0].name).toBe("John Doe");
      expect(jsonData!.author[1]["@type"]).toBe("Person");
      expect(jsonData!.author[2]["@type"]).toBe("Organization");

      expect(jsonData!.image).toHaveLength(2);
      expect(typeof jsonData!.image[0]).toBe("string");
      expect(jsonData!.image[1]["@type"]).toBe("ImageObject");
    });

    test("preserves URL query parameters correctly", async ({ page }) => {
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

    test("QuizJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/quiz");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org/");
      expect(jsonData!["@type"]).toBe("Quiz");
      // Check hasPart array is valid
      expect(Array.isArray(jsonData!.hasPart)).toBe(true);
      expect(jsonData!.hasPart.length).toBeGreaterThan(0);
      // Check each question has valid structure
      jsonData!.hasPart.forEach((question: Record<string, unknown>) => {
        expect(question["@type"]).toBe("Question");
        expect(question.eduQuestionType).toBe("Flashcard");
        expect(question.text).toBeTruthy();
        expect(question.acceptedAnswer).toBeTruthy();
        const answer = question.acceptedAnswer as Record<string, unknown>;
        expect(answer["@type"]).toBe("Answer");
        expect(answer.text).toBeTruthy();
      });
    });

    test("Biology QuizJsonLd with educational alignment produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/quiz-biology");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org/");
      expect(jsonData!["@type"]).toBe("Quiz");
      // Check about property
      expect(jsonData!.about).toBeDefined();
      expect(jsonData!.about["@type"]).toBe("Thing");
      expect(jsonData!.about.name).toBe("Cell Biology");
      // Check educational alignment
      expect(Array.isArray(jsonData!.educationalAlignment)).toBe(true);
      expect(jsonData!.educationalAlignment).toHaveLength(2);
      jsonData!.educationalAlignment.forEach(
        (alignment: Record<string, unknown>) => {
          expect(alignment["@type"]).toBe("AlignmentObject");
          expect(alignment.alignmentType).toBeTruthy();
          expect(alignment.targetName).toBeTruthy();
        },
      );
    });

    test("Advanced QuizJsonLd with all features produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/quiz-advanced");

      const jsonLdScript = await page
        .locator('script[type="application/ld+json"]')
        .textContent();

      expect(jsonLdScript).toBeTruthy();

      let jsonData;
      expect(() => {
        jsonData = JSON.parse(jsonLdScript!);
      }).not.toThrow();

      expect(jsonData).toBeDefined();
      expect(jsonData!["@context"]).toBe("https://schema.org/");
      expect(jsonData!["@type"]).toBe("Quiz");
      // Check about property with full Thing object
      expect(jsonData!.about).toBeDefined();
      expect(jsonData!.about["@type"]).toBe("Thing");
      expect(jsonData!.about.name).toBeTruthy();
      expect(jsonData!.about.description).toBeTruthy();
      expect(jsonData!.about.url).toBeTruthy();
      // Check mixed question formats are all valid
      expect(Array.isArray(jsonData!.hasPart)).toBe(true);
      expect(jsonData!.hasPart).toHaveLength(4);
      // Verify all questions have required properties
      jsonData!.hasPart.forEach((question: Record<string, unknown>) => {
        expect(question["@type"]).toBe("Question");
        expect(question.eduQuestionType).toBe("Flashcard");
        expect(typeof question.text).toBe("string");
        expect(question.acceptedAnswer).toBeTruthy();
      });
    });
  });
});
