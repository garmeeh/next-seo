import { test, expect } from "@playwright/test";

test.describe("FAQJsonLd", () => {
  test("renders basic FAQ structured data", async ({ page }) => {
    await page.goto("/faq");

    // Find the JSON-LD script tag
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify FAQPage structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("FAQPage");
    expect(jsonData.mainEntity).toHaveLength(4);

    // Verify first question
    const firstQuestion = jsonData.mainEntity[0];
    expect(firstQuestion["@type"]).toBe("Question");
    expect(firstQuestion.name).toBe("How to find an apprenticeship?");
    expect(firstQuestion.acceptedAnswer["@type"]).toBe("Answer");
    expect(firstQuestion.acceptedAnswer.text).toContain(
      "We provide an official service to search through available apprenticeships",
    );

    // Verify second question
    const secondQuestion = jsonData.mainEntity[1];
    expect(secondQuestion.name).toBe("Whom to contact?");
    expect(secondQuestion.acceptedAnswer.text).toContain(
      "You can contact the apprenticeship office",
    );

    // Verify all questions have proper structure
    jsonData.mainEntity.forEach(
      (question: {
        "@type": string;
        name: string;
        acceptedAnswer: { "@type": string; text: string };
      }) => {
        expect(question["@type"]).toBe("Question");
        expect(question.name).toBeTruthy();
        expect(question.acceptedAnswer).toBeTruthy();
        expect(question.acceptedAnswer["@type"]).toBe("Answer");
        expect(question.acceptedAnswer.text).toBeTruthy();
      },
    );
  });

  test("renders FAQ with HTML content in answers", async ({ page }) => {
    await page.goto("/faq-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("FAQPage");
    expect(jsonData.mainEntity).toHaveLength(4);

    // Check HTML content is preserved
    const firstQuestion = jsonData.mainEntity[0];
    expect(firstQuestion.name).toBe(
      "What documents are required for application?",
    );
    expect(firstQuestion.acceptedAnswer.text).toContain("<p>");
    expect(firstQuestion.acceptedAnswer.text).toContain("<ul>");
    expect(firstQuestion.acceptedAnswer.text).toContain("<li>");
    expect(firstQuestion.acceptedAnswer.text).toContain(
      '<a href="/forms/medical">',
    );

    // Check second question with ordered list
    const secondQuestion = jsonData.mainEntity[1];
    expect(secondQuestion.acceptedAnswer.text).toContain("<ol>");
    expect(secondQuestion.acceptedAnswer.text).toContain("<strong>");

    // Check third question with headers
    const thirdQuestion = jsonData.mainEntity[2];
    expect(thirdQuestion.acceptedAnswer.text).toContain("<h3>");
    expect(thirdQuestion.acceptedAnswer.text).toContain("<div>");

    // Check Schema.org format with Answer object
    const fourthQuestion = jsonData.mainEntity[3];
    expect(fourthQuestion.name).toBe(
      "Are there any special requirements for international students?",
    );
    expect(fourthQuestion.acceptedAnswer["@type"]).toBe("Answer");
    expect(fourthQuestion.acceptedAnswer.text).toContain("<strong>");
  });

  test("verifies custom script attributes", async ({ page }) => {
    await page.goto("/faq-advanced");

    // Check for custom scriptId
    const scriptById = await page.locator("#advanced-faq-jsonld");
    expect(await scriptById.count()).toBe(1);
    expect(await scriptById.getAttribute("type")).toBe("application/ld+json");

    // Check for data-testid (which is set to the same value as scriptId)
    const scriptByTestId = await page.locator(
      '[data-testid="advanced-faq-jsonld"]',
    );
    expect(await scriptByTestId.count()).toBe(1);
  });

  test("renders health-focused FAQ example", async ({ page }) => {
    await page.goto("/faq-health");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    expect(jsonData["@type"]).toBe("FAQPage");
    expect(jsonData.mainEntity).toHaveLength(5);

    // Verify health-specific content
    const covidQuestion = jsonData.mainEntity[0];
    expect(covidQuestion.name).toBe("What are the symptoms of COVID-19?");
    expect(covidQuestion.acceptedAnswer.text).toContain("<ul>");
    expect(covidQuestion.acceptedAnswer.text).toContain("Fever or chills");

    // Verify vaccination scheduling question
    const vaccineQuestion = jsonData.mainEntity[1];
    expect(vaccineQuestion.name).toBe(
      "How do I schedule a vaccination appointment?",
    );
    expect(vaccineQuestion.acceptedAnswer.text).toContain("1-800-VACCINE");

    // Verify all questions maintain proper structure
    jsonData.mainEntity.forEach(
      (question: { "@type": string; acceptedAnswer: { "@type": string } }) => {
        expect(question["@type"]).toBe("Question");
        expect(question.acceptedAnswer["@type"]).toBe("Answer");
      },
    );
  });

  test("FAQ content matches visible page content", async ({ page }) => {
    await page.goto("/faq");

    // Get structured data
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify first question appears on page
    const firstQuestionText = await page
      .locator("h2", { hasText: "How to find an apprenticeship?" })
      .textContent();
    expect(firstQuestionText).toBeTruthy();

    // Verify answer text appears on page
    const answerText = await page
      .locator("p", {
        hasText: "We provide an official service to search through available",
      })
      .first()
      .textContent();
    expect(answerText).toBeTruthy();

    // Verify structured data matches visible content
    expect(jsonData.mainEntity[0].name).toBe("How to find an apprenticeship?");
    expect(jsonData.mainEntity[0].acceptedAnswer.text).toContain(
      "We provide an official service",
    );
  });
});
