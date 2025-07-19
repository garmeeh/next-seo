// Type definitions for Education Q&A (Quiz) structured data based on Schema.org

import type { Thing } from "./common.types";

// Answer type according to Schema.org
export interface Answer {
  "@type": "Answer";
  text: string;
}

// Question type for Quiz (Education Q&A)
export interface Question {
  "@context"?: "https://schema.org/";
  "@type": "Question";
  eduQuestionType: "Flashcard";
  text: string;
  acceptedAnswer: Answer;
}

// AlignmentObject for educational alignment
export interface AlignmentObject {
  "@type": "AlignmentObject";
  alignmentType: "educationalSubject" | "educationalLevel";
  targetName: string;
}

// Quiz type according to Schema.org
export interface Quiz {
  "@context": "https://schema.org/";
  "@type": "Quiz";
  about?: Thing;
  educationalAlignment?: AlignmentObject[];
  hasPart: Question[];
}

// Flexible input type for questions - support both simple and complex formats
export type QuestionInput =
  | string // Just the question text with answer
  | {
      question: string;
      answer: string;
    }
  | {
      text: string;
      acceptedAnswer: string | Answer;
    }
  | Omit<Question, "@type" | "@context" | "eduQuestionType">;

// Component props
export interface QuizJsonLdProps {
  questions: QuestionInput[];
  about?: string | Thing;
  educationalAlignment?: Array<{
    type: "educationalSubject" | "educationalLevel";
    name: string;
  }>;
  scriptId?: string;
  scriptKey?: string;
}
