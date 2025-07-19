// Type definitions for FAQ structured data based on Schema.org FAQPage

// Answer type according to Schema.org
export interface Answer {
  "@type": "Answer";
  text: string;
}

// Question type according to Schema.org
export interface Question {
  "@type": "Question";
  name: string;
  acceptedAnswer: Answer;
}

// FAQPage type according to Schema.org
export interface FAQPage {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Question[];
}

// Flexible input type for questions - support both simple and complex formats
export type QuestionInput =
  | string // Just the question text, answer will be empty
  | {
      question: string;
      answer: string;
    }
  | {
      name: string;
      acceptedAnswer: string | Answer;
    }
  | Omit<Question, "@type">;

// Component props
export interface FAQJsonLdProps {
  questions: QuestionInput[];
  scriptId?: string;
  scriptKey?: string;
}
