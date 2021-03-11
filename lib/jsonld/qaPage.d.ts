import React from 'react';
export interface Person {
  name: string;
}
export interface Answer {
  text: string;
  dateCreated?: string;
  upvotedCount?: number;
  url?: string;
  author?: Person;
}
export interface Question {
  name: string;
  answerCount: number;
  acceptedAnswer?: Answer;
  suggestedAnswer?: Answer[];
  text?: string;
  author?: Person;
  upvotedCount?: number;
  dateCreated?: string;
}
export interface QAPageJsonldProps {
  mainEntity: Question;
  keyOverride?: string;
}
declare const QAPageJsonLd: React.FC<QAPageJsonldProps>;
export default QAPageJsonLd;
