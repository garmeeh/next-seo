import { versionSchemas } from '@cypress/schema-tools';

const logo100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Logo',
    description: 'An example schema describing JSON-LD for type: Logo',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'Organization',
      },
      logo: {
        type: 'string',
        description:
          'URL of a logo that is representative of the organization.',
      },
      url: {
        type: 'string',
        description: 'The URL of the website associated with the logo.',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    url: 'http://www.example.com',
    logo: 'http://www.example.com/images/logo.png',
  },
};

const logo = versionSchemas(logo100);
export default logo;
