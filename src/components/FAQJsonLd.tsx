import { JsonLdScript } from "~/core/JsonLdScript";
import type {
  FAQJsonLdProps,
  QuestionInput,
  Question,
  Answer,
} from "~/types/faq.types";

// Process flexible question input into proper Question format
function processQuestion(input: QuestionInput): Question {
  // Handle string input - just the question with empty answer
  if (typeof input === "string") {
    return {
      "@type": "Question",
      name: input,
      acceptedAnswer: {
        "@type": "Answer",
        text: "",
      },
    };
  }

  // Handle simple question/answer format
  if ("question" in input && "answer" in input) {
    return {
      "@type": "Question",
      name: input.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: input.answer,
      },
    };
  }

  // Handle Schema.org format with name/acceptedAnswer
  if ("name" in input) {
    const acceptedAnswer: Answer =
      typeof input.acceptedAnswer === "string"
        ? {
            "@type": "Answer",
            text: input.acceptedAnswer,
          }
        : input.acceptedAnswer;

    return {
      "@type": "Question",
      name: input.name,
      acceptedAnswer,
    };
  }

  // Should never reach here due to TypeScript, but handle gracefully
  return {
    "@type": "Question",
    name: "",
    acceptedAnswer: {
      "@type": "Answer",
      text: "",
    },
  };
}

export default function FAQJsonLd({
  questions,
  scriptId,
  scriptKey,
}: FAQJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(processQuestion),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "faq-jsonld"}
    />
  );
}

export type { FAQJsonLdProps };
