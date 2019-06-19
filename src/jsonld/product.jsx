import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const buildImages = images =>
  images.length ? `"image": [${images.map(image => `"${image}"`)}],` : '';

const buildBrand = brand => `
  "brand": {
      "@type": "Thing",
      "name": "${brand}"
    },
`;

const buildReviewRating = rating =>
  rating
    ? `"reviewRating": {
          "@type": "Rating",
          ${rating.bestRating ? `"bestRating": "${rating.bestRating}",` : ''}
          ${rating.worstRating ? `"worstRating": "${rating.worstRating}",` : ''}
          "ratingValue": "${rating.ratingValue}"
        },`
    : '';

const buildReviews = reviews => `
"review": [
  ${reviews.map(
    review => `{
      "@type": "Review",
      ${
        review.datePublished
          ? `"datePublished": "${review.datePublished}",`
          : ''
      }
      ${review.reviewBody ? `"reviewBody": "${review.reviewBody}",` : ''}
      ${review.name ? `"name": "${review.name}",` : ''}
      ${buildReviewRating(review.reviewRating)}
      "author": "${review.author}"
  }`,
  )}],`;

const buildAggregateRating = aggregateRating => `
  "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${aggregateRating.ratingValue}",
      "reviewCount": "${aggregateRating.reviewCount}"
    },
`;

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
const buildOffers = offers => `
  "offers": {
    "@type": "Offer",
    "priceCurrency": "${offers.priceCurrency}",
    ${
      offers.priceValidUntil
        ? `"priceValidUntil": "${offers.priceValidUntil}",`
        : ''
    }
    ${offers.itemCondition ? `"itemCondition": "${offers.itemCondition}",` : ''}
    ${offers.availability ? `"availability": "${offers.availability}",` : ''}
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
  },
`;

const ProductJsonLd = ({
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
}) => {
  const jslonld = `{
    "@context": "http://schema.org/",
    "@type": "Product",
    ${buildImages(images)}
    ${description ? `"description": "${description}",` : ''}
    ${mpn ? `"mpn": "${mpn}",` : ''}
    ${sku ? `"sku": "${sku}",` : ''}
    ${gtin8 ? `"gtin8": "${gtin8}",` : ''}
    ${gtin13 ? `"gtin13": "${gtin13}",` : ''}
    ${gtin14 ? `"gtin14": "${gtin14}",` : ''}
    ${brand ? buildBrand(brand) : ''}
    ${reviews.length ? buildReviews(reviews) : ''}
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${offers ? buildOffers(offers) : ''}
    "name": "${productName}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-product"
      />
    </Head>
  );
};

ProductJsonLd.defaultProps = {
  images: [],
  description: null,
  brand: null,
  reviews: [],
  aggregateRating: null,
  offers: null,
  sku: null,
  gtin8: null,
  gtin13: null,
  gtin14: null,
  mpn: null,
};

ProductJsonLd.propTypes = {
  productName: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  brand: PropTypes.string,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      datePublished: PropTypes.string,
      reviewBody: PropTypes.string,
      name: PropTypes.string,
      reviewRating: PropTypes.shape({
        bestRating: PropTypes.string,
        ratingValue: PropTypes.string.isRequired,
        worstRating: PropTypes.string,
      }),
    }),
  ),
  aggregateRating: PropTypes.shape({
    ratingValue: PropTypes.string.isRequired,
    reviewCount: PropTypes.string.isRequired,
  }),
  offers: PropTypes.shape({
    price: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValidUntil: PropTypes.string,
    itemCondition: PropTypes.string,
    availability: PropTypes.string,
    seller: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
  sku: PropTypes.string,
  gtin8: PropTypes.string,
  gtin13: PropTypes.string,
  gtin14: PropTypes.string,
  mpn: PropTypes.string,
};

export default ProductJsonLd;
