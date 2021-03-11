import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import {
  Review,
  buildAuthor,
  buildPublisher,
  buildReviewRating,
} from './product';
import { AggregateRating, buildAggregateRating } from './recipe';

export interface SoftwareAppJsonLdProps {
  keyOverride?: string;
  name: string;
  price: string;
  priceCurrency: string;
  applicationCategory?: string;
  operatingSystem?: string;
  review?: Review;
  aggregateRating?: AggregateRating;
}

const buildReview = (review: Review) => `
    "review": {
        "@type": "Review",
        ${review.author ? buildAuthor(review.author) : ''}
        ${review.publisher ? buildPublisher(review.publisher) : ''}
        ${
          review.datePublished
            ? `"datePublished": "${review.datePublished}",`
            : ''
        }
        ${review.reviewBody ? `"reviewBody": "${review.reviewBody}",` : ''}
        ${review.name ? `"name": "${review.name}",` : ''}
        ${buildReviewRating(review.reviewRating)}
      },
  `;

const SoftwareAppJsonLd: FC<SoftwareAppJsonLdProps> = ({
  keyOverride,
  name,
  applicationCategory,
  operatingSystem,
  priceCurrency,
  price,
  aggregateRating,
  review,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "${priceCurrency}",
      "price": "${price}"
    },
    ${
      applicationCategory
        ? `"applicationCategory": "${applicationCategory}",`
        : ''
    }
    ${operatingSystem ? `"operatingSystem": "${operatingSystem}",` : ''}
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${review ? buildReview(review) : ''}
    "name": "${name}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-softwareApp${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default SoftwareAppJsonLd;
