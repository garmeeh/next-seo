import { versionSchemas } from '@cypress/schema-tools';

const socialProfile100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Social Profile',
    description: 'An example schema describing JSON-LD for type: Social Profile',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'Person or Organisation',
      },
      name: {
        type: 'string',
        description: 'The name of the person or organisation.',
      },
      url: {
        type: 'string',
        description: "The URL for the person's or organization's official website.",
      },
      sameAs: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: "Array of social profile URL's",
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'http://schema.org',
    '@type': 'Person',
    name: 'your name',
    url: 'http://www.your-site.com',
    sameAs: [
      'http://www.facebook.com/your-profile',
      'http://instagram.com/yourProfile',
      'http://www.linkedin.com/in/yourprofile',
      'http://plus.google.com/your_profile',
    ],
  },
};

const socialProfile = versionSchemas(socialProfile100);
export default socialProfile;
