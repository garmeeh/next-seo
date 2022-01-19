import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

import { AggregateRating } from '../types';
import { buildAggregateRating } from '../utils/buildAggregateRating';

export interface BrandJsonLdProps {
  id: string;
  slogan?: string;
  logo?: string;
  aggregateRating?: AggregateRating;
}

const BrandJsonLd: FC<BrandJsonLdProps> = ({
  id,
  slogan,
  logo,
  aggregateRating,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Brand",
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${slogan ? `"slogan": "${slogan}",` : ''}
    ${logo ? `"logo": "${logo}",` : ''}
    "@id": "${id}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-brand"
      />
    </Head>
  );
};

export default BrandJsonLd;
