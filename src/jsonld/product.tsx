import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import { AggregateOffer, Offers } from '../types';
import { buildOffers } from '../utils/buildOffers';
import { buildAggregateOffer } from '../utils/buildAggregateOffer';

export type ReviewRating = {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
};

export type Author = {
  type: string;
  name: string;
};

export type Publisher = {
  type: string;
  name: string;
};

export type Review = {
  author: Author;
  datePublished?: string;
  reviewBody?: string;
  name?: string;
  publisher?: Publisher;
  reviewRating: ReviewRating;
};

export type AggregateRating = {
  ratingValue: string;
  reviewCount: string;
};

export interface ProductJsonLdProps {
  keyOverride?: string;
  productName: string;
  images?: string[];
  description?: string;
  brand?: string;
  reviews?: Review[];
  aggregateRating?: AggregateRating;
  offers?: Offers | Offers[];
  aggregateOffer?: AggregateOffer;
  sku?: string;
  gtin8?: string;
  gtin13?: string;
  gtin14?: string;
  mpn?: string;
  color?: string;
  manufacturerName?: string;
  manufacturerLogo?: string;
  material?: string | ProductJsonLdProps;
  slogan?: string;
  disambiguatingDescription?: string;
  productionDate?: string;
  purchaseDate?: string;
  releaseDate?: string;
  award?: string;
}

const buildBrand = (brand: string) => `
  "brand": {
      "@type": "Thing",
      "name": "${brand}"
    },
`;

export const buildReviewRating = (rating: ReviewRating) =>
  rating
    ? `"reviewRating": {
          "@type": "Rating",
          ${rating.bestRating ? `"bestRating": "${rating.bestRating}",` : ''}
          ${rating.worstRating ? `"worstRating": "${rating.worstRating}",` : ''}
          "ratingValue": "${rating.ratingValue}"
        }`
    : '';

export const buildAuthor = (author: Author) => `
  "author": {
      "@type": "${author.type}",
      "name": "${author.name}"
  },
`;

export const buildPublisher = (publisher: Publisher) => `
  "publisher": {
      "@type": "${publisher.type}",
      "name": "${publisher.name}"
  },
`;

export const buildReviews = (reviews: Review[]) => `
"review": [
  ${reviews.map(
    review => `{
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
  }`,
  )}],`;

export const buildAggregateRating = (aggregateRating: AggregateRating) => `
  "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${aggregateRating.ratingValue}",
      "reviewCount": "${aggregateRating.reviewCount}"
    },
`;

const ProductJsonLd: FC<ProductJsonLdProps> = ({
  keyOverride,
  productName,
  images = [],
  description,
  sku,
  gtin8,
  gtin13,
  gtin14,
  mpn,
  brand,
  reviews = [],
  aggregateRating,
  offers,
  aggregateOffer,
  color,
  manufacturerName,
  manufacturerLogo,
  material,
  slogan,
  disambiguatingDescription,
  productionDate,
  releaseDate,
  purchaseDate,
  award,
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "Product",
    "image":${formatIfArray(images)},
    ${description ? `"description": "${description}",` : ''}
    ${mpn ? `"mpn": "${mpn}",` : ''}
    ${sku ? `"sku": "${sku}",` : ''}
    ${gtin8 ? `"gtin8": "${gtin8}",` : ''}
    ${gtin13 ? `"gtin13": "${gtin13}",` : ''}
    ${gtin14 ? `"gtin14": "${gtin14}",` : ''}
    ${brand ? buildBrand(brand) : ''}
    ${reviews.length ? buildReviews(reviews) : ''}
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${color ? `"color": "${color}",` : ''}
    ${material ? `"material": "${material}",` : ''}
    ${slogan ? `"slogan": "${slogan}",` : ''}
    ${
      disambiguatingDescription
        ? `"disambiguatingDescription": "${disambiguatingDescription}",`
        : ''
    }
    ${productionDate ? `"productionDate": "${productionDate}",` : ''}
    ${releaseDate ? `"releaseDate": "${releaseDate}",` : ''}
    ${purchaseDate ? `"purchaseDate": "${purchaseDate}",` : ''}
    ${award ? `"award": "${award}",` : ''}
    "manufacturer": {
      "@type": "Organization",
      "name": "${manufacturerName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${manufacturerLogo}"
      }
    },
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          },`
        : ''
    }
    ${
      aggregateOffer && !offers
        ? `"offers": ${buildAggregateOffer(aggregateOffer)},`
        : ''
    }
    "name": "${productName}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-product${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default ProductJsonLd;
