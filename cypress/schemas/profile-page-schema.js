import { versionSchemas } from '@cypress/schema-tools';

const profilePage100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'ProfilePage',
    description: 'An example schema describing JSON-LD for type: ProfilePage',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'ProfilePage',
      },
      lastReviewed: {
        type: 'string',
        description:
          'Date when this page was last reviewed - estabilish the freshness of the page',
      },
      breadcrumb: {
        type: ['object', 'string'],
        anyOf: [
          {
            type: 'object',
            title: 'BreadcrumList',
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
          {
            type: 'string',
            description: "Breadcrumbs as a string: 'Home > library > books'",
          },
        ],
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    lastReviewed: '2014-10-01T19:30',
    breadcrumb: {
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
      ],
    },
  },
};

const profilePageVersions = versionSchemas(profilePage100);
export default profilePageVersions;
