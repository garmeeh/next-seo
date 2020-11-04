import { versionSchemas } from '@cypress/schema-tools';

const breadcrumb100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Breadcrumb',
    description: 'An example schema describing JSON-LD for type: Breadcrumb',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'BreadcrumbList',
      },
      itemListElement: {
        type: 'array',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'ListItem',
            },
            item: {
              '@id': {
                type: 'string',
                description:
                  'The URL to the webpage that represents the breadcrumb.',
              },
              name: {
                type: 'string',
                description:
                  'The title of the breadcrumb displayed for the user.',
              },
            },
            position: {
              type: 'string',
              description:
                'The position of the breadcrumb in the breadcrumb trail. Position 1 signifies the beginning of the trail.',
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
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': 'https://example.com/books',
          name: 'Books',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': 'https://example.com/books/authors',
          name: 'Authors',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@id': 'https://example.com/books/authors/annleckie',
          name: 'Ann Leckie',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@id': 'https://example.com/books/authors/annleckie/ancillaryjustice',
          name: 'Ancillary Justice',
        },
      },
    ],
  },
};

const breadcrumbVersions = versionSchemas(breadcrumb100);
export default breadcrumbVersions;
