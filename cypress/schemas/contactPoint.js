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

const contactPoint = versionSchemas(contactPoint100);
export default contactPoint;
