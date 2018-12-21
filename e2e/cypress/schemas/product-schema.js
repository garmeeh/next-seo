import { versionSchemas } from '@cypress/schema-tools';
import { offers100, aggregateRating100, brand100, review100 } from './common';

const product100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Product',
    description: 'An example schema describing JSON-LD for type: Product',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD Type',
      },
      name: {
        type: 'string',
        description: 'Product Name',
      },
      image: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Array of image urls',
      },
      description: {
        type: 'string',
        description: 'The description of the Product',
      },
      npm: {
        type: 'string',
      },
      gtin8: {
        type: 'string',
      },
      gtin13: {
        type: 'string',
      },
      gtin14: {
        type: 'string',
      },
      brand: {
        ...brand100.schema,
        see: brand100,
      },
      review: {
        type: 'array',
        items: {
          ...review100.schema,
        },
        see: review100,
      },
      aggregateRating: {
        ...aggregateRating100.schema,
        see: aggregateRating100,
      },
      offers: {
        ...offers100.schema,
        see: offers100,
      },
    },
  },
  example: {
    '@context': 'http://schema.org/',
    '@type': 'Product',
    name: 'Executive Anvil',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    description:
      "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
    mpn: '925872',
    brand: {
      '@type': 'Thing',
      name: 'ACME',
    },
    review: [
      {
        '@type': 'Review',
        author: 'Jim',
        datePublished: '2017-01-06T03:37:40Z',
        reviewBody:
          'This is my favorite product yet! Thanks Nate for the example products and reviews.',
        name: 'So awesome!!!',
        reviewRating: {
          '@type': 'Rating',
          bestRating: '5',
          ratingValue: '5',
          worstRating: '1',
        },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      reviewCount: '89',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '119.99',
      priceValidUntil: '2020-11-05',
      itemCondition: 'http://schema.org/UsedCondition',
      availability: 'http://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Executive Objects',
      },
    },
  },
};

const productVersions = versionSchemas(product100);
export default productVersions;
