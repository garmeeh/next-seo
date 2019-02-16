import { versionSchemas } from '@cypress/schema-tools';

const contactPoint100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Corporate Contact - ContactPoint',
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
      areaServed: {
        type: ['string', 'array'],
        description: 'Geographical region served',
      },
      availableLanguage: {
        type: ['string', 'array'],
        description: 'Language spoken',
      },
      contactOption: {
        type: 'string',
        description: 'Details about the number',
      },
    },
    required: ['@type', 'telephone', 'contactType'],
    additionalProperties: false,
  },
  example: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+1-877-746-0909',
    areaServed: 'US',
    availableLanguage: ['English', 'Spanish', 'French'],
    contactOption: 'TollFree',
  },
};

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
        items: {
          ...contactPoint100.schema,
        },
        see: contactPoint100,
      },
    },
    required: ['@context', '@type', 'url', 'contactPoint'],
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: 'http://www.your-company-site.com',
    logo: 'http://www.example.com/logo.png',
    contactPoint: [contactPoint100.example],
  },
};

const corporateContact = versionSchemas(corporateContact100);
export default corporateContact;
