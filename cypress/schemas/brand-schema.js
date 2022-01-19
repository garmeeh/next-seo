import { versionSchemas } from '@cypress/schema-tools';

import { aggregateRating100 } from './common';

const brand100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Brand',
    description: 'Bramd description with slogan and some characteristics.',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD type: PostalAddress',
      },
      '@id': {
        type: 'string',
        description: 'URL to main entity of page',
      },
      logo: {
        type: 'string',
        description: "Url of the Organization's logo",
      },
      slogan: {
        type: 'string',
        description: 'Slogan of the brand',
      },
      aggregateRating: {
        ...aggregateRating100.schema,
        see: aggregateRating100,
      },
    },
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    '@id': 'https://www.purpule-fox.io/#corporation',
    logo: 'https://www.example.com/photos/logo.jpg',
    slogan: 'What does the fox say?',
    aggregateRating: aggregateRating100.example,
  },
};

const brandVersions = versionSchemas(brand100);
export default brandVersions;
