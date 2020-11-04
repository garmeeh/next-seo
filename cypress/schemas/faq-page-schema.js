import { versionSchemas } from '@cypress/schema-tools';

const faqPage100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'FAQ Page',
    description: 'An example schema describing JSON-LD for type: FAQ Page',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'FAQPage',
      },
      mainEntity: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'Question',
            },
            name: {
              type: 'string',
              description: 'The full text of the question.',
            },
            acceptedAnswer: {
              type: 'object',
              description:
                'The title of the breadcrumb displayed for the user.',
              properties: {
                '@type': {
                  type: 'string',
                  description: 'Answer',
                },
                text: {
                  type: 'string',
                  description: 'The full answer to the question.',
                },
              },
            },
          },
        },
      },
    },
    required: true,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'FAQ Page',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long is the delivery time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '3-5 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find information about product recalls?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Read more on under information.',
        },
      },
    ],
  },
};

const faqPageVersions = versionSchemas(faqPage100);
export default faqPageVersions;
