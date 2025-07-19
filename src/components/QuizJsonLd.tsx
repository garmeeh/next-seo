import { JsonLdScript } from "~/core/JsonLdScript";
import type {
  QuizJsonLdProps,
  QuestionInput,
  Question,
  Answer,
  AlignmentObject,
} from "~/types/quiz.types";
import type { Thing } from "~/types/common.types";

// Process flexible question input into proper Question format
function processQuestion(input: QuestionInput): Question {
  // Handle string input - create question with the string as both question and answer
  if (typeof input === "string") {
    return {
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: input,
      acceptedAnswer: {
        "@type": "Answer",
        text: input,
      },
    };
  }

  // Handle simple question/answer format
  if ("question" in input && "answer" in input) {
    return {
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: input.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: input.answer,
      },
    };
  }

  // Handle format with text/acceptedAnswer
  if ("text" in input) {
    const acceptedAnswer: Answer =
      typeof input.acceptedAnswer === "string"
        ? {
            "@type": "Answer",
            text: input.acceptedAnswer,
          }
        : input.acceptedAnswer;

    return {
      "@type": "Question",
      eduQuestionType: "Flashcard",
      text: input.text,
      acceptedAnswer,
    };
  }

  // Should never reach here due to TypeScript, but handle gracefully
  return {
    "@type": "Question",
    eduQuestionType: "Flashcard",
    text: "",
    acceptedAnswer: {
      "@type": "Answer",
      text: "",
    },
  };
}

// Process about property
function processAbout(about: string | Thing): Record<string, unknown> {
  if (typeof about === "string") {
    return {
      "@type": "Thing",
      name: about,
    };
  }
  return {
    "@type": "Thing",
    ...about,
  };
}

// Process educational alignment
function processEducationalAlignment(alignment: {
  type: "educationalSubject" | "educationalLevel";
  name: string;
}): AlignmentObject {
  return {
    "@type": "AlignmentObject",
    alignmentType: alignment.type,
    targetName: alignment.name,
  };
}

export default function QuizJsonLd({
  questions,
  about,
  educationalAlignment,
  scriptId,
  scriptKey,
}: QuizJsonLdProps) {
  const data = {
    "@context": "https://schema.org/",
    "@type": "Quiz",
    ...(about && {
      about: processAbout(about),
    }),
    ...(educationalAlignment && {
      educationalAlignment: educationalAlignment.map(
        processEducationalAlignment,
      ),
    }),
    hasPart: questions.map(processQuestion),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "quiz-jsonld"}
    />
  );
}

export type { QuizJsonLdProps };
