import React from 'react';
import Head from 'next/head';

import escape from '../utils/escape';
import markup from '../utils/markup';

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

const buildQuestions = (mainEntity: Question) => `{
        "@type": "Question",
        "name": "${escape(mainEntity.name)}",
        ${mainEntity.text ? `"text": "${escape(mainEntity.text)}",` : ''}
        "answerCount": ${mainEntity.answerCount},
        ${
          mainEntity.upvotedCount
            ? `"upvoteCount": ${mainEntity.upvotedCount},`
            : ''
        }
        ${
          mainEntity.dateCreated
            ? `"dateCreated": "${mainEntity.dateCreated}",`
            : ''
        }
        ${
          mainEntity.author
            ? `"author": {
          "@type": "Person",
          "name": "${escape(mainEntity.author.name)}"
        },`
            : ''
        }
        ${
          mainEntity.acceptedAnswer
            ? `"acceptedAnswer": {
          "@type": "Answer",
          "text": "${escape(mainEntity.acceptedAnswer.text)}",
          ${
            mainEntity.acceptedAnswer.dateCreated
              ? `"dateCreated": "${mainEntity.acceptedAnswer.dateCreated}",`
              : ''
          }
          ${
            mainEntity.acceptedAnswer.upvotedCount
              ? `"upvoteCount": ${mainEntity.acceptedAnswer.upvotedCount},`
              : ''
          }
          ${
            mainEntity.acceptedAnswer.url
              ? `"url": "${mainEntity.acceptedAnswer.url}",`
              : ''
          }
          ${
            mainEntity.acceptedAnswer.author
              ? `"author": {
            "@type": "Person",
            "name": "${escape(mainEntity.acceptedAnswer.author.name)}"
          }`
              : ''
          }
        },`
            : ''
        }
        ${
          mainEntity.suggestedAnswer
            ? `"suggestedAnswer": [${mainEntity.suggestedAnswer.map(
                suggested => `{
            "@type": "Answer",
            "text": "${escape(suggested.text)}",
            ${
              suggested.dateCreated
                ? `"dateCreated": "${suggested.dateCreated}",`
                : ''
            }
            ${
              suggested.upvotedCount
                ? `"upvoteCount": ${suggested.upvotedCount},`
                : `"upvoteCount": ${0},`
            }
            ${suggested.url ? `"url": "${suggested.url}",` : ''}
              ${
                suggested.author
                  ? `"author": {
                        "@type": "Person",
                        "name": "${escape(suggested.author.name)}"
                    }`
                  : ''
              }
        }`,
              )}
    ]`
            : ''
        }
}`;

const QAPageJsonLd: React.FC<QAPageJsonldProps> = ({
  mainEntity,
  keyOverride,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": ${buildQuestions(mainEntity)}
    }`;
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-qa${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default QAPageJsonLd;
