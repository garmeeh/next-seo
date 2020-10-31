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

const buildQuestions = (mainEntity: Question[]) => `
  ${mainEntity.map(
    question => `{
      "@type": "Question",
      "name": "${question.questionName}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${question.acceptedAnswerText}"
      }
  }`,
  )}`;

const FAQPageJsonLd: React.FC<FAQPageJsonLdProps> = ({ mainEntity = [] }) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    "mainEntity": [${buildQuestions(mainEntity)}]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-faq-page"
      />
    </Head>
  );
};

export default FAQPageJsonLd;
