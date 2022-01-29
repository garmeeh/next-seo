import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type { Review, AggregateRating } from 'src/types';
import { setAggregateRating } from 'src/utils/schema/setAggregateRating';
import { setReviews } from 'src/utils/schema/setReviews';

export interface SoftwareAppJsonLdProps extends JsonLdProps {
  name: string;
  price: string;
  priceCurrency: string;
  applicationCategory?: string;
  operatingSystem?: string;
  review?: Review;
  aggregateRating?: AggregateRating;
}

function SoftwareAppJsonLd({
  type = 'SoftwareApplication',
  keyOverride,
  priceCurrency,
  price,
  aggregateRating,
  review,
  ...rest
}: SoftwareAppJsonLdProps) {
  const data = {
    ...rest,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: priceCurrency,
    },
    aggregateRating: setAggregateRating(aggregateRating),
    review: setReviews(review),
  };
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="SoftwareApp"
    />
  );
}

export default SoftwareAppJsonLd;
