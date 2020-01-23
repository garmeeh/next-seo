import { versionSchemas } from '@cypress/schema-tools';

const address100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: "Array of social profile URL's",
    properties: {
      '@type': {
        type: 'string',
        description: 'JSON-LD type: PostalAddress',
      },
      streetAddress: {
        type: 'string',
        description: 'Street number, street name, and unit number',
      },
      addressLocality: {
        type: 'string',
        description: 'City',
      },
      addressRegion: {
        type: 'string',
        description: 'State or province, if applicable.',
      },
      postalCode: {
        type: 'string',
        description: 'Postal or zip code.',
      },
      addressCountry: {
        type: 'string',
        description: 'The 2-letter ISO 3166-1 alpha-2 country code',
      },
    },
  },
  example: {
    '@type': 'PostalAddress',
    streetAddress: '1600 Saratoga Ave',
    addressLocality: 'San Jose',
    addressRegion: 'CA',
    postalCode: '95129',
    addressCountry: 'US',
  },
};

const address = versionSchemas(address100);
export default address;
