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
              type: 'string',
              description:
                'The URL to the webpage that represents the breadcrumb.',
            },
            name: {
              type: 'string',
              description:
                'The title of the breadcrumb displayed for the user.',
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
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Books',
        item: 'https://example.com/books',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Authors',
        item: 'https://example.com/books/authors',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ann Leckie',
        item: 'https://example.com/books/authors/annleckie',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Ancillary Justice',
        item: 'https://example.com/books/authors/ancillaryjustice',
      },
    ],
  },
};

const breadcrumbVersions = versionSchemas(breadcrumb100);
export default breadcrumbVersions;
