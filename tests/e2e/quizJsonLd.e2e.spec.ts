import { test, expect } from "@playwright/test";

test.describe("QuizJsonLd", () => {
  test("renders basic Quiz structured data", async ({ page }) => {
    await page.goto("/quiz");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org/");
    expect(jsonData["@type"]).toBe("Quiz");
    expect(jsonData.hasPart).toHaveLength(3);

    // Verify first question
    expect(jsonData.hasPart[0]).toEqual({
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: "What is the capital of France?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paris",
      },
    });

    // Verify second question
    expect(jsonData.hasPart[1]).toEqual({
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: "What is 2 + 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4",
      },
    });

    // Verify third question
    expect(jsonData.hasPart[2]).toEqual({
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: "Who wrote Romeo and Juliet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "William Shakespeare",
      },
    });
  });

  test("renders Quiz with educational alignment", async ({ page }) => {
    await page.goto("/quiz-biology");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify about property
    expect(jsonData.about).toEqual({
      "@type": "Thing",
      name: "Cell Biology",
    });

    // Verify educational alignment
    expect(jsonData.educationalAlignment).toEqual([
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalSubject",
        targetName: "Biology",
      },
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalLevel",
        targetName: "Grade 10",
      },
    ]);

    // Verify questions exist
    expect(jsonData.hasPart).toHaveLength(4);
    expect(jsonData.hasPart[0].text).toBe(
      "What is the powerhouse of the cell?",
    );
    expect(jsonData.hasPart[0].acceptedAnswer.text).toBe("Mitochondria");
  });

  test("renders advanced Quiz with all features", async ({ page }) => {
    await page.goto("/quiz-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify script has custom ID
    const script = await page.locator('script[type="application/ld+json"]');
    const scriptId = await script.getAttribute("id");
    expect(scriptId).toBe("advanced-quiz");

    // Verify about property with full Thing object
    expect(jsonData.about).toEqual({
      "@type": "Thing",
      name: "Earth and Space Science",
      description:
        "Fundamental concepts about Earth, space, and environmental systems",
      url: "https://example.com/earth-science",
    });

    // Verify all question formats
    expect(jsonData.hasPart).toHaveLength(4);

    // String format converted to question
    expect(jsonData.hasPart[0]).toEqual({
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: "The Earth revolves around the Sun in approximately 365.25 days",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Earth revolves around the Sun in approximately 365.25 days",
      },
    });

    // Question/answer format
    expect(jsonData.hasPart[1].text).toBe(
      "What is the chemical formula for water?",
    );
    expect(jsonData.hasPart[1].acceptedAnswer.text).toBe("H2O");

    // Text/acceptedAnswer with string
    expect(jsonData.hasPart[2].text).toBe("What causes tides on Earth?");
    expect(jsonData.hasPart[2].acceptedAnswer.text).toBe(
      "The gravitational pull of the Moon and Sun",
    );

    // Text/acceptedAnswer with Answer object
    expect(jsonData.hasPart[3].text).toBe("Explain the greenhouse effect");
    expect(jsonData.hasPart[3].acceptedAnswer).toEqual({
      "@type": "Answer",
      text: "The greenhouse effect is a natural process where certain gases in Earth's atmosphere trap heat from the sun, warming the planet's surface",
    });
  });
});
