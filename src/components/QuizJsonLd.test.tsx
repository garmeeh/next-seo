import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import QuizJsonLd from "./QuizJsonLd";

describe("QuizJsonLd", () => {
  it("renders basic Quiz with minimal props", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          {
            question: "What is the capital of France?",
            answer: "Paris",
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
      "@context": "https://schema.org/",
      "@type": "Quiz",
      hasPart: [
        {
          "@type": "Question",
          eduQuestionType: "Flashcard",
          text: "What is the capital of France?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paris",
          },
        },
      ],
    });
  });

  it("handles multiple questions", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          {
            question: "What is 2 + 2?",
            answer: "4",
          },
          {
            question: "What is the capital of Japan?",
            answer: "Tokyo",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart).toHaveLength(2);
    expect(jsonData.hasPart[0].text).toBe("What is 2 + 2?");
    expect(jsonData.hasPart[0].acceptedAnswer.text).toBe("4");
    expect(jsonData.hasPart[1].text).toBe("What is the capital of Japan?");
    expect(jsonData.hasPart[1].acceptedAnswer.text).toBe("Tokyo");
  });

  it("handles string questions", () => {
    const { container } = render(
      <QuizJsonLd questions={["Mitochondria is the powerhouse of the cell"]} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart[0]).toEqual({
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: "Mitochondria is the powerhouse of the cell",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mitochondria is the powerhouse of the cell",
      },
    });
  });

  it("handles text/acceptedAnswer format", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          {
            text: "What is photosynthesis?",
            acceptedAnswer:
              "The process by which plants use sunlight to produce food",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart[0].text).toBe("What is photosynthesis?");
    expect(jsonData.hasPart[0].acceptedAnswer.text).toBe(
      "The process by which plants use sunlight to produce food",
    );
  });

  it("handles about property as string", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          {
            question: "What is DNA?",
            answer: "Deoxyribonucleic acid",
          },
        ]}
        about="Biology"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.about).toEqual({
      "@type": "Thing",
      name: "Biology",
    });
  });

  it("handles about property as Thing object", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          {
            question: "What is DNA?",
            answer: "Deoxyribonucleic acid",
          },
        ]}
        about={{
          name: "Cell Biology",
          description: "The study of cells",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.about).toEqual({
      "@type": "Thing",
      name: "Cell Biology",
      description: "The study of cells",
    });
  });

  it("handles educational alignment", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          {
            question: "What is the powerhouse of the cell?",
            answer: "Mitochondria",
          },
        ]}
        educationalAlignment={[
          {
            type: "educationalSubject",
            name: "Biology",
          },
          {
            type: "educationalLevel",
            name: "Grade 9",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.educationalAlignment).toEqual([
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalSubject",
        targetName: "Biology",
      },
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalLevel",
        targetName: "Grade 9",
      },
    ]);
  });

  it("handles all properties together", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          {
            question: "What is cellular respiration?",
            answer:
              "The process by which cells break down sugar to produce energy",
          },
          {
            text: "What is ATP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Adenosine triphosphate - the energy currency of cells",
            },
          },
        ]}
        about="Cell Energy"
        educationalAlignment={[
          {
            type: "educationalSubject",
            name: "Biology",
          },
          {
            type: "educationalLevel",
            name: "High School",
          },
        ]}
        scriptId="quiz-script"
        scriptKey="biology-quiz"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script?.id).toBe("quiz-script");

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@context"]).toBe("https://schema.org/");
    expect(jsonData["@type"]).toBe("Quiz");
    expect(jsonData.about.name).toBe("Cell Energy");
    expect(jsonData.educationalAlignment).toHaveLength(2);
    expect(jsonData.hasPart).toHaveLength(2);
    expect(jsonData.hasPart[1].acceptedAnswer["@type"]).toBe("Answer");
  });

  it("uses custom scriptKey", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[{ question: "Test?", answer: "Answer" }]}
        scriptKey="custom-quiz-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
    // Note: scriptKey is used internally by JsonLdScript but not visible in DOM
  });

  it("handles mixed question formats", () => {
    const { container } = render(
      <QuizJsonLd
        questions={[
          "Simple string flashcard",
          {
            question: "Question/answer format?",
            answer: "Yes",
          },
          {
            text: "Text/acceptedAnswer format?",
            acceptedAnswer: "Also yes",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart).toHaveLength(3);
    expect(jsonData.hasPart[0].text).toBe("Simple string flashcard");
    expect(jsonData.hasPart[1].text).toBe("Question/answer format?");
    expect(jsonData.hasPart[2].text).toBe("Text/acceptedAnswer format?");
  });
});
