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
      // Check nested member program is valid
      if (jsonData!.hasMemberProgram) {
        expect(jsonData!.hasMemberProgram["@type"]).toBe("MemberProgram");
        expect(Array.isArray(jsonData!.hasMemberProgram.hasTiers)).toBe(true);
        jsonData!.hasMemberProgram.hasTiers.forEach((tier: unknown) => {
          expect((tier as { "@type": string })["@type"]).toBe(
            "MemberProgramTier",
          );
        });
      }
    });

    test("OnlineStore with loyalty programs produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/online-store-loyalty");

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
      // Check multiple member programs are valid
      if (jsonData!.hasMemberProgram) {
        expect(Array.isArray(jsonData!.hasMemberProgram)).toBe(true);
        jsonData!.hasMemberProgram.forEach((program: unknown) => {
          const prog = program as { "@type": string; hasTiers: unknown };
          expect(prog["@type"]).toBe("MemberProgram");
          expect(prog.hasTiers).toBeDefined();
        });
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

    test("MovieCarouselJsonLd summary page produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/movie-carousel-summary");

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
      expect(jsonData!["@type"]).toBe("ItemList");
      // Check itemListElement array is valid
      expect(Array.isArray(jsonData!.itemListElement)).toBe(true);
      expect(jsonData!.itemListElement).toHaveLength(5);
      // Check each list item has valid structure
      jsonData!.itemListElement.forEach((item: Record<string, unknown>) => {
        expect(item["@type"]).toBe("ListItem");
        expect(item.position).toBeTruthy();
        expect(item.url).toBeTruthy();
        expect(typeof item.url).toBe("string");
      });
    });

    test("MovieCarouselJsonLd all-in-one page produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/movie-carousel");

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
      expect(jsonData!["@type"]).toBe("ItemList");
      // Check itemListElement array is valid
      expect(Array.isArray(jsonData!.itemListElement)).toBe(true);
      expect(jsonData!.itemListElement).toHaveLength(3);
      // Check each list item has valid movie structure
      jsonData!.itemListElement.forEach((item: Record<string, unknown>) => {
        expect(item["@type"]).toBe("ListItem");
        expect(item.position).toBeTruthy();
        expect(item.item).toBeTruthy();
        const movie = item.item as Record<string, unknown>;
        expect(movie["@type"]).toBe("Movie");
        expect(movie.name).toBeTruthy();
        expect(movie.image).toBeTruthy();
        // Check nested objects are valid
        if (movie.director) {
          const director = movie.director as Record<string, unknown>;
          expect(director["@type"]).toBe("Person");
        }
        if (movie.review) {
          const review = movie.review as Record<string, unknown>;
          expect(review["@type"]).toBe("Review");
        }
        if (movie.aggregateRating) {
          const rating = movie.aggregateRating as Record<string, unknown>;
          expect(rating["@type"]).toBe("AggregateRating");
        }
      });
    });

    test("MovieCarouselJsonLd with advanced features produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/movie-carousel-advanced");

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
      expect(jsonData!["@type"]).toBe("ItemList");
      expect(Array.isArray(jsonData!.itemListElement)).toBe(true);
      expect(jsonData!.itemListElement).toHaveLength(3);

      // Check complex nested structures
      const firstMovie = jsonData!.itemListElement[0].item;
      // Check image array with mixed types
      expect(Array.isArray(firstMovie.image)).toBe(true);
      expect(firstMovie.image).toHaveLength(4);
      expect(typeof firstMovie.image[0]).toBe("string");
      expect(firstMovie.image[1]["@type"]).toBe("ImageObject");
      expect(firstMovie.image[1].width).toBe(1200);
      expect(firstMovie.image[1].height).toBe(900);
      // Check director with URL
      expect(firstMovie.director["@type"]).toBe("Person");
      expect(firstMovie.director.url).toBeTruthy();
      // Check complete review structure
      expect(firstMovie.review["@type"]).toBe("Review");
      expect(firstMovie.review.reviewRating["@type"]).toBe("Rating");
      expect(firstMovie.review.reviewRating.ratingValue).toBeTruthy();
      expect(firstMovie.review.author["@type"]).toBe("Person");
      expect(firstMovie.review.reviewBody).toBeTruthy();
      // Check aggregate rating with all fields
      expect(firstMovie.aggregateRating["@type"]).toBe("AggregateRating");
      expect(firstMovie.aggregateRating.ratingValue).toBeTruthy();
      expect(firstMovie.aggregateRating.reviewCount).toBeTruthy();
    });

    test("DatasetJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/dataset");

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
      expect(jsonData!["@type"]).toBe("Dataset");
      expect(jsonData!.name).toBeTruthy();
      expect(jsonData!.description).toBeTruthy();
    });

    test("DatasetJsonLd with advanced features produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/dataset-advanced");

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
      expect(jsonData!["@type"]).toBe("Dataset");

      // Verify complex nested structures parse correctly
      expect(Array.isArray(jsonData!.creator)).toBe(true);
      expect(jsonData!.creator[0]["@type"]).toBe("Organization");
      expect(jsonData!.creator[0].contactPoint["@type"]).toBe("ContactPoint");

      expect(Array.isArray(jsonData!.distribution)).toBe(true);
      expect(jsonData!.distribution[0]["@type"]).toBe("DataDownload");

      expect(jsonData!.spatialCoverage["@type"]).toBe("Place");
      expect(jsonData!.spatialCoverage.geo["@type"]).toBe("GeoShape");

      expect(Array.isArray(jsonData!.variableMeasured)).toBe(true);
      expect(jsonData!.variableMeasured[2]["@type"]).toBe("PropertyValue");
    });

    test("DatasetJsonLd with catalog produces valid JSON", async ({ page }) => {
      await page.goto("/dataset-catalog");

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
      expect(jsonData!["@type"]).toBe("Dataset");
      expect(jsonData!.includedInDataCatalog["@type"]).toBe("DataCatalog");
    });

    test("DatasetJsonLd with nested datasets produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/dataset-nested");

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
      expect(jsonData!["@type"]).toBe("Dataset");

      // Verify hasPart array with nested datasets
      expect(Array.isArray(jsonData!.hasPart)).toBe(true);
      expect(jsonData!.hasPart).toHaveLength(3);
      expect(jsonData!.hasPart[0]["@type"]).toBe("Dataset");
      expect(jsonData!.hasPart[0].name).toBeTruthy();
      expect(jsonData!.hasPart[0].distribution["@type"]).toBe("DataDownload");
    });

    test("JobPostingJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/job-posting");

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
      expect(jsonData!["@type"]).toBe("JobPosting");
      expect(jsonData!.title).toBeTruthy();
      expect(jsonData!.description).toBeTruthy();
      expect(jsonData!.datePosted).toBeTruthy();
      expect(jsonData!.hiringOrganization).toBeDefined();
      expect(jsonData!.hiringOrganization["@type"]).toBe("Organization");
    });

    test("Remote JobPostingJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/job-posting-remote");

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
      expect(jsonData!["@type"]).toBe("JobPosting");
      expect(jsonData!.jobLocationType).toBe("TELECOMMUTE");
      expect(jsonData!.applicantLocationRequirements).toBeDefined();
      expect(jsonData!.baseSalary).toBeDefined();
      expect(jsonData!.baseSalary["@type"]).toBe("MonetaryAmount");
      expect(jsonData!.baseSalary.value["@type"]).toBe("QuantitativeValue");
    });

    test("Advanced JobPostingJsonLd with all features produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/job-posting-advanced");

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
      expect(jsonData!["@type"]).toBe("JobPosting");

      // Verify multiple job locations
      expect(Array.isArray(jsonData!.jobLocation)).toBe(true);
      expect(jsonData!.jobLocation).toHaveLength(2);
      expect(jsonData!.jobLocation[0]["@type"]).toBe("Place");
      expect(jsonData!.jobLocation[0].address["@type"]).toBe("PostalAddress");

      // Verify multiple applicant location requirements
      expect(Array.isArray(jsonData!.applicantLocationRequirements)).toBe(true);
      expect(
        jsonData!.applicantLocationRequirements.every(
          (loc: Record<string, unknown>) =>
            loc["@type"] === "State" || loc["@type"] === "Country",
        ),
      ).toBe(true);

      // Verify multiple employment types
      expect(Array.isArray(jsonData!.employmentType)).toBe(true);

      // Verify education requirements array
      expect(Array.isArray(jsonData!.educationRequirements)).toBe(true);
      expect(jsonData!.educationRequirements[0]["@type"]).toBe(
        "EducationalOccupationalCredential",
      );

      // Verify experience requirements
      expect(jsonData!.experienceRequirements["@type"]).toBe(
        "OccupationalExperienceRequirements",
      );

      // Verify identifier
      expect(jsonData!.identifier["@type"]).toBe("PropertyValue");

      // Verify organization with logo
      expect(jsonData!.hiringOrganization.logo["@type"]).toBe("ImageObject");
    });

    test("DiscussionForumPostingJsonLd produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/discussion-forum-advanced");

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
      expect(jsonData!["@type"]).toBe("DiscussionForumPosting");

      // Verify nested comment structure
      expect(Array.isArray(jsonData!.comment)).toBe(true);
      expect(jsonData!.comment[0]["@type"]).toBe("Comment");
      expect(jsonData!.comment[0].author["@type"]).toBe("Person");

      // Verify nested comments within comments
      expect(Array.isArray(jsonData!.comment[0].comment)).toBe(true);
      expect(jsonData!.comment[0].comment[0]["@type"]).toBe("Comment");

      // Verify interaction statistics
      expect(Array.isArray(jsonData!.interactionStatistic)).toBe(true);
      expect(jsonData!.interactionStatistic[0]["@type"]).toBe(
        "InteractionCounter",
      );

      // Verify video object
      expect(jsonData!.video["@type"]).toBe("VideoObject");

      // Verify isPartOf
      expect(jsonData!.isPartOf["@type"]).toBe("CreativeWork");

      // Verify sharedContent
      expect(jsonData!.sharedContent["@type"]).toBe("WebPage");
    });

    test("VacationRentalJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/vacation-rental-advanced");

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
      expect(jsonData!["@type"]).toBe("VacationRental");

      // Verify required properties
      expect(jsonData!.containsPlace).toBeDefined();
      expect(jsonData!.containsPlace["@type"]).toBe("Accommodation");
      expect(jsonData!.containsPlace.occupancy["@type"]).toBe(
        "QuantitativeValue",
      );
      expect(jsonData!.identifier).toBeTruthy();
      expect(Array.isArray(jsonData!.image)).toBe(true);
      expect(jsonData!.image.length).toBeGreaterThanOrEqual(8);
      expect(jsonData!.latitude).toBeDefined();
      expect(jsonData!.longitude).toBeDefined();
      expect(jsonData!.name).toBeTruthy();

      // Verify nested structures
      expect(jsonData!.address["@type"]).toBe("PostalAddress");
      expect(jsonData!.aggregateRating["@type"]).toBe("AggregateRating");
      expect(jsonData!.brand["@type"]).toBe("Brand");

      // Verify bed details
      expect(Array.isArray(jsonData!.containsPlace.bed)).toBe(true);
      expect(jsonData!.containsPlace.bed[0]["@type"]).toBe("BedDetails");

      // Verify amenity features
      expect(Array.isArray(jsonData!.containsPlace.amenityFeature)).toBe(true);
      expect(jsonData!.containsPlace.amenityFeature[0]["@type"]).toBe(
        "LocationFeatureSpecification",
      );

      // Verify reviews
      expect(Array.isArray(jsonData!.review)).toBe(true);
      expect(jsonData!.review[0]["@type"]).toBe("Review");
      expect(jsonData!.review[0].author["@type"]).toBe("Person");
    });

    test("CourseJsonLd single course produces valid JSON", async ({ page }) => {
      await page.goto("/course");

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
      expect(jsonData!["@type"]).toBe("Course");

      // Verify required properties
      expect(jsonData!.name).toBeTruthy();
      expect(jsonData!.description).toBeTruthy();

      // Verify provider is Organization
      expect(jsonData!.provider).toBeDefined();
      expect(jsonData!.provider["@type"]).toBe("Organization");
    });

    test("CourseJsonLd list produces valid JSON", async ({ page }) => {
      await page.goto("/course-list");

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
      expect(jsonData!["@type"]).toBe("ItemList");

      // Verify ItemList structure
      expect(Array.isArray(jsonData!.itemListElement)).toBe(true);
      expect(jsonData!.itemListElement.length).toBeGreaterThanOrEqual(3);

      // Verify each item
      jsonData!.itemListElement.forEach(
        (item: {
          "@type": string;
          position: number;
          item: { "@type": string; name: string; description: string };
        }) => {
          expect(item["@type"]).toBe("ListItem");
          expect(item.position).toBeGreaterThan(0);
          expect(item.item).toBeDefined();
          expect(item.item["@type"]).toBe("Course");
          expect(item.item.name).toBeTruthy();
          expect(item.item.description).toBeTruthy();
        },
      );
    });

    test("CourseJsonLd summary list produces valid JSON", async ({ page }) => {
      await page.goto("/course-list-summary");

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
      expect(jsonData!["@type"]).toBe("ItemList");

      // Verify ItemList structure for summary page
      expect(Array.isArray(jsonData!.itemListElement)).toBe(true);
      expect(jsonData!.itemListElement.length).toBeGreaterThanOrEqual(3);

      // Verify each item has only URL, not full course data
      jsonData!.itemListElement.forEach(
        (item: {
          "@type": string;
          position: number;
          url: string;
          item?: unknown;
        }) => {
          expect(item["@type"]).toBe("ListItem");
          expect(item.position).toBeGreaterThan(0);
          expect(item.url).toBeTruthy();
          expect(item.item).toBeUndefined(); // Should not have item for summary
        },
      );
    });

    test("ProfilePageJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/profile");

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
      expect(jsonData!["@type"]).toBe("ProfilePage");

      // Verify required mainEntity property
      expect(jsonData!.mainEntity).toBeDefined();
      expect(jsonData!.mainEntity["@type"]).toBeDefined();
    });

    test("ProfilePageJsonLd with Person produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/profile-advanced");

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
      expect(jsonData!["@type"]).toBe("ProfilePage");
      expect(jsonData!.mainEntity["@type"]).toBe("Person");

      // Verify interaction statistics have proper @type
      expect(jsonData!.mainEntity.interactionStatistic).toBeDefined();
      jsonData!.mainEntity.interactionStatistic.forEach(
        (stat: { "@type": string }) => {
          expect(stat["@type"]).toBe("InteractionCounter");
        },
      );
    });

    test("ProfilePageJsonLd with Organization produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/profile-organization");

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
      expect(jsonData!["@type"]).toBe("ProfilePage");
      expect(jsonData!.mainEntity["@type"]).toBe("Organization");
    });

    test("SoftwareApplicationJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/software-app");

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
      expect(jsonData!["@type"]).toBe("SoftwareApplication");
      // Verify required properties
      expect(jsonData!.name).toBeDefined();
      expect(jsonData!.offers).toBeDefined();
      expect(jsonData!.aggregateRating).toBeDefined();
    });

    test("MobileApplication variant produces valid JSON", async ({ page }) => {
      await page.goto("/mobile-app");

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
      expect(jsonData!["@type"]).toBe("MobileApplication");
    });

    test("VideoGame co-typed produces valid JSON", async ({ page }) => {
      await page.goto("/video-game");

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
      expect(jsonData!["@type"]).toEqual(["VideoGame", "MobileApplication"]);
    });

    test("EmployerAggregateRatingJsonLd produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/employer-aggregate-rating");

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
      expect(jsonData!["@type"]).toBe("EmployerAggregateRating");
      // Verify required properties
      expect(jsonData!.itemReviewed).toBeDefined();
      expect(jsonData!.itemReviewed["@type"]).toBe("Organization");
      expect(jsonData!.ratingValue).toBeDefined();
      expect(jsonData!.ratingCount || jsonData!.reviewCount).toBeTruthy();
    });

    test("ClaimReviewJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/claim-review");

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
      expect(jsonData!["@type"]).toBe("ClaimReview");
      // Verify required properties
      expect(jsonData!.claimReviewed).toBeTruthy();
      expect(jsonData!.reviewRating).toBeDefined();
      expect(jsonData!.reviewRating["@type"]).toBe("Rating");
      expect(jsonData!.reviewRating.alternateName).toBeTruthy();
      expect(jsonData!.url).toBeTruthy();
    });

    test("ImageJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/image");

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
      expect(jsonData!["@type"]).toBe("ImageObject");
      // Verify required properties
      expect(jsonData!.contentUrl).toBeTruthy();
      expect(jsonData!.creator).toBeDefined();
      expect(jsonData!.creator["@type"]).toBe("Person");
    });

    test("ImageJsonLd with multiple images produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/image-multiple");

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
      expect(jsonData!["@graph"]).toBeDefined();
      expect(Array.isArray(jsonData!["@graph"])).toBe(true);
      expect(jsonData!["@graph"]).toHaveLength(3);
      // Verify each image has required properties
      jsonData!["@graph"].forEach((image: Record<string, unknown>) => {
        expect(image["@type"]).toBe("ImageObject");
        expect(image.contentUrl).toBeTruthy();
      });
    });

    test("VideoJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/video");

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
      expect(jsonData!["@type"]).toBe("VideoObject");
      // Verify required properties
      expect(jsonData!.name).toBeTruthy();
      expect(jsonData!.description).toBeTruthy();
      expect(jsonData!.thumbnailUrl).toBeTruthy();
      expect(jsonData!.uploadDate).toBeTruthy();
    });

    test("VideoJsonLd with BroadcastEvent produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/video-live");

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
      expect(jsonData!["@type"]).toBe("VideoObject");
      expect(jsonData!.publication).toBeDefined();
      expect(Array.isArray(jsonData!.publication)).toBe(true);
      expect(jsonData!.publication[0]["@type"]).toBe("BroadcastEvent");
    });

    test("VideoJsonLd with Clips produces valid JSON", async ({ page }) => {
      await page.goto("/video-clips");

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
      expect(jsonData!["@type"]).toBe("VideoObject");
      expect(jsonData!.hasPart).toBeDefined();
      expect(Array.isArray(jsonData!.hasPart)).toBe(true);
      expect(jsonData!.hasPart[0]["@type"]).toBe("Clip");
    });

    test("CarouselJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/carousel-summary");

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
      expect(jsonData!["@type"]).toBe("ItemList");
      expect(jsonData!.itemListElement).toBeDefined();
      expect(Array.isArray(jsonData!.itemListElement)).toBe(true);
    });

    test("CarouselJsonLd with Courses produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/carousel-course");

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
      expect(jsonData!["@type"]).toBe("ItemList");
      expect(jsonData!.itemListElement[0].item["@type"]).toBe("Course");
    });

    test("CarouselJsonLd with Recipes produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/carousel-recipe");

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
      expect(jsonData!["@type"]).toBe("ItemList");
      expect(jsonData!.itemListElement[0].item["@type"]).toBe("Recipe");
    });

    test("CarouselJsonLd with Restaurants produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/carousel-restaurant");

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
      expect(jsonData!["@type"]).toBe("ItemList");
      expect(jsonData!.itemListElement[0].item["@type"]).toBe("Restaurant");
    });

    test("CreativeWorkJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/creative-work");

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
      expect(jsonData!["@type"]).toBe("Article");
      // Verify hasPart for paywalled content
      expect(jsonData!.hasPart).toBeDefined();
      expect(jsonData!.hasPart["@type"]).toBe("WebPageElement");
    });

    test("CreativeWorkJsonLd with multiple paywalled sections produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/creative-work-multiple");

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
      expect(jsonData!["@type"]).toBe("Article");
      // Verify multiple hasPart sections
      expect(Array.isArray(jsonData!.hasPart)).toBe(true);
      expect(jsonData!.hasPart).toHaveLength(2);
      jsonData!.hasPart.forEach((part: Record<string, unknown>) => {
        expect(part["@type"]).toBe("WebPageElement");
        expect(part.isAccessibleForFree).toBe(false);
        expect(part.cssSelector).toBeTruthy();
      });
    });

    test("CreativeWorkJsonLd NewsArticle variant produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/creative-work-news");

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
      expect(jsonData!.isAccessibleForFree).toBe(false);
      expect(jsonData!.hasPart["@type"]).toBe("WebPageElement");
    });

    test("CreativeWorkJsonLd Blog variant produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/creative-work-blog");

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
      expect(jsonData!["@type"]).toBe("Blog");
      expect(jsonData!.isAccessibleForFree).toBe(false);
      expect(jsonData!.hasPart["@type"]).toBe("WebPageElement");
    });

    test("ProductJsonLd produces valid JSON", async ({ page }) => {
      await page.goto("/product");

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
      expect(jsonData!["@type"]).toBe("Product");
    });

    test("ProductJsonLd with review and pros/cons produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/product-review");

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
      expect(jsonData!["@type"]).toBe("Product");
      expect(jsonData!.review).toBeDefined();
      expect(jsonData!.review.positiveNotes).toBeDefined();
      expect(jsonData!.review.negativeNotes).toBeDefined();
    });

    test("ProductJsonLd with AggregateOffer produces valid JSON", async ({
      page,
    }) => {
      await page.goto("/product-aggregate");

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
      expect(jsonData!["@type"]).toBe("Product");
      expect(jsonData!.offers).toBeDefined();
      expect(jsonData!.offers["@type"]).toBe("AggregateOffer");
    });
  });
});
