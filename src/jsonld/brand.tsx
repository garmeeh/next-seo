import React from 'react';

import type { AggregateRating } from 'src/types';
import { setAggregateRating } from 'src/utils/schema/setAggregateRating';

import { JsonLd, JsonLdProps } from './jsonld';

export interface BrandJsonLdProps extends JsonLdProps {
  id: string;
  slogan?: string;
  logo?: string;
  aggregateRating?: AggregateRating;
}

function BrandJsonLd({
  type = 'Brand',
  id,
  keyOverride,
  aggregateRating,
  ...rest
}: BrandJsonLdProps) {
  const data = {
    aggregateRating: setAggregateRating(aggregateRating),
    '@id': id,
    ...rest,
  };
  return (
    <JsonLd type={type} keyOverride={keyOverride} {...data} scriptKey="brand" />
  );
}

export default BrandJsonLd;
