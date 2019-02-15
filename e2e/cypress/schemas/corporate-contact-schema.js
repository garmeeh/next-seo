import { versionSchemas } from '@cypress/schema-tools';

const corporateContact100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Corporate Contact',
    description:
      'An example schema describing JSON-LD for type: Corporate Contact',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'Organization',
      },
      url: {
        type: 'string',
        description: 'The URL of the website associated with the logo.',
      },
      logo: {
        type: 'string',
        description: 'The url for the company logo',
      },
      contactPoint: {
        type: 'array',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'ContactPoint',
            },
            telephone: {
              type: 'string',
              description: 'Telephone number of the company',
            },
            contactType: {
              type: 'string',
              description: 'The main usage of the phone number',
            },
          },
        },
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: 'http://www.your-company-site.com',
    logo: 'http://www.example.com/logo.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-401-555-1212',
        contactType: 'customer service',
      },
    ],
  },
};

const corporateContact = versionSchemas(corporateContact100);
export default corporateContact;
