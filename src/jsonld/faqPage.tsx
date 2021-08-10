import React from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
export interface Question {
  questionName: string;
  acceptedAnswerText: string;
}

export interface FAQPageJsonLdProps {
  mainEntity: Question[];
}

const buildQuestions = (mainEntity: Question[]) =>
  mainEntity.map((question) => ({
    "@type": "Question",
    name: question.questionName,
    acceptedAnswer: {
      "@type": "Answer",
      text: question.acceptedAnswerText,
    },
  }));

const FAQPageJsonLd: React.FC<FAQPageJsonLdProps> = ({ mainEntity = [] }) => {
  const jsonld = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    mainEntity: [buildQuestions(mainEntity)],
  });

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jsonld)}
        key="jsonld-faq-page"
      />
    </Head>
  );
};

export default FAQPageJsonLd;
