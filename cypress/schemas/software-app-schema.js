import { versionSchemas } from '@cypress/schema-tools';
import { aggregateRating100, review100 } from './common';

const softwareApp100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Software App',
    description: 'An example schema describing JSON-LD for type: Software App',
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
        description: 'Software App Name',
      },
      applicationCategory: {
        type: 'string',
      },
      operatingSystem: {
        type: 'string',
      },
      review: {
        ...review100.schema,
        see: review100,
      },
      aggregateRating: {
        ...aggregateRating100.schema,
        see: aggregateRating100,
      },
      offers: {
        type: 'object',
        properties: {
          priceCurrency: {
            type: 'string',
            description:
              'Use standard formats: ISO 4217 currency format e.g. "USD"; Ticker symbol for cryptocurrencies e.g. "BTC"; well known names for Local Exchange Tradings Systems (LETS) and other currency types e.g. "Ithaca HOUR".',
          },
          price: {
            type: 'string',
            description: 'Price.',
          },
        },
      },
      keywords: {
        type: 'string',
      },
    },
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Angry Birds',
    operatingSystem: 'ANDROID',
    applicationCategory: 'GameApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      ratingCount: '8864',
    },
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'USD',
    },
    keywords: 'angrybirds, arcade, slingshot',
  },
};

const softwareAppVersions = versionSchemas(softwareApp100);
export default softwareAppVersions;
