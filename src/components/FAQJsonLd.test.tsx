import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FAQJsonLd from "./FAQJsonLd";

describe("FAQJsonLd", () => {
  it("renders basic FAQ with simple question/answer format", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          {
            question: "How to find an apprenticeship?",
            answer:
              "We provide an official service to search through available apprenticeships.",
          },
          {
            question: "Whom to contact?",
            answer:
              "You can contact the apprenticeship office through our official phone hotline.",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How to find an apprenticeship?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide an official service to search through available apprenticeships.",
          },
        },
        {
          "@type": "Question",
          name: "Whom to contact?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can contact the apprenticeship office through our official phone hotline.",
          },
        },
      ],
    });
  });

  it("handles HTML content in answers", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          {
            question: "How to apply?",
            answer:
              "<p>Follow these steps:</p><ol><li>Create an account</li><li>Fill the form</li><li>Submit</li></ol>",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.mainEntity[0].acceptedAnswer.text).toBe(
      "<p>Follow these steps:</p><ol><li>Create an account</li><li>Fill the form</li><li>Submit</li></ol>",
    );
  });

  it("handles Schema.org format with name/acceptedAnswer", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          {
            name: "What are the requirements?",
            acceptedAnswer:
              "You must be at least 18 years old and have a high school diploma.",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "What are the requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You must be at least 18 years old and have a high school diploma.",
      },
    });
  });

  it("handles complex Answer object format", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          {
            name: "What documents are needed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "<p>You need the following documents:</p><ul><li>ID card</li><li>Diploma</li></ul>",
            },
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.mainEntity[0].acceptedAnswer).toEqual({
      "@type": "Answer",
      text: "<p>You need the following documents:</p><ul><li>ID card</li><li>Diploma</li></ul>",
    });
  });

  it("handles string-only questions (with empty answers)", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          "What is the application deadline?",
          "How long does the process take?",
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "What is the application deadline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "",
        },
      },
      {
        "@type": "Question",
        name: "How long does the process take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "",
        },
      },
    ]);
  });

  it("handles empty questions array", () => {
    const { container } = render(<FAQJsonLd questions={[]} />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    });
  });

  it("supports custom scriptId", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          {
            question: "Test question?",
            answer: "Test answer.",
          },
        ]}
        scriptId="custom-faq-id"
      />,
    );

    const script = container.querySelector("#custom-faq-id");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
  });

  it("supports custom scriptId and scriptKey", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          {
            question: "Test question?",
            answer: "Test answer.",
          },
        ]}
        scriptId="custom-faq-id"
        scriptKey="custom-faq-key"
      />,
    );

    // Check for custom scriptId (which sets both id and data-testid)
    const script = container.querySelector("#custom-faq-id");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
    expect(script?.getAttribute("data-testid")).toBe("custom-faq-id");
  });

  it("handles mixed input formats", () => {
    const { container } = render(
      <FAQJsonLd
        questions={[
          "Just a question with no answer",
          {
            question: "Simple format question?",
            answer: "Simple format answer.",
          },
          {
            name: "Schema.org format question?",
            acceptedAnswer: "Schema.org format answer.",
          },
          {
            name: "Complex answer format?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "<p>Complex HTML answer</p>",
            },
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.mainEntity).toHaveLength(4);
    expect(jsonData.mainEntity[0].name).toBe("Just a question with no answer");
    expect(jsonData.mainEntity[0].acceptedAnswer.text).toBe("");
    expect(jsonData.mainEntity[1].name).toBe("Simple format question?");
    expect(jsonData.mainEntity[2].name).toBe("Schema.org format question?");
    expect(jsonData.mainEntity[3].acceptedAnswer.text).toBe(
      "<p>Complex HTML answer</p>",
    );
  });
});
