import React from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface Person {
  name: string;
}

export interface Answer {
  text: string;
  dateCreated?: Date;
  upvotedCount?: number;
  url?: string;
  author?: Person;
}

export interface Question {
  name: string;
  answerCount: number;
  acceptedAnswer: Answer;
  suggestedAnswer: Answer[];
  text?: string;
  author?: Person;
  upvotedCount?: number;
  dateCreated?: Date;
}

export interface QAPageJsonldProps {
  mainEntity: Question;
}
