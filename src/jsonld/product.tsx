import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import minifyJsonLd from '../utils/minifyJsonLd';

type ReviewRating = {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
};

type Author = {
  type: string;
  name: string;
};

type Publisher = {
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

type Offers = {
  price: string;
  priceCurrency: string;
  priceValidUntil?: string;
  itemCondition?: string;
  availability?: string;
  url?: string;
  seller: {
    name: string;
  };
};

type AggregateOffer = {
  priceCurrency: string;
  lowPrice: string;
  highPrice?: string;
  offerCount?: string;
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

const buildReviews = (reviews: Review[]) => `
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

const buildAggregateRating = (aggregateRating: AggregateRating) => `
  "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${aggregateRating.ratingValue}",
      "reviewCount": "${aggregateRating.reviewCount}"
    },
`;

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
const buildOffers = (offers: Offers) => `
  {
    "@type": "Offer",
    "priceCurrency": "${offers.priceCurrency}",
    ${
      offers.priceValidUntil
        ? `"priceValidUntil": "${offers.priceValidUntil}",`
        : ''
    }
    ${offers.itemCondition ? `"itemCondition": "${offers.itemCondition}",` : ''}
    ${offers.availability ? `"availability": "${offers.availability}",` : ''}
    ${offers.url ? `"url": "${offers.url}",` : ''}
    ${
      offers.seller
        ? `
      "seller": {
      "@type": "Organization",
      "name": "${offers.seller.name}"
    },
    `
        : ''
    }
    "price": "${offers.price}"
  }
`;

const buildAggregateOffer = (offer: AggregateOffer) => `
  {
    "@type": "AggregateOffer",
    "priceCurrency": "${offer.priceCurrency}",
    ${offer.highPrice ? `"highPrice": "${offer.highPrice}",` : ''}
    ${offer.offerCount ? `"offerCount": "${offer.offerCount}",` : ''}
    "lowPrice": "${offer.lowPrice}"
  }
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
}) => {
  const jslonld = `{
    "@context": "http://schema.org/",
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
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key={`jsonld-product${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default ProductJsonLd;
