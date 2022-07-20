import { versionSchemas } from '@cypress/schema-tools';

const webPage100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'WebPage',
    description: 'WebPage description with slogan and some characteristics.',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD type: PostalAddress',
      },
      '@id': {
        type: 'string',
        description: 'URL to main entity of page',
      },
      description: {
        type: 'string',
        description: 'Main description of the web page',
      },
      lastReviewed: {
        type: 'string',
        description:
          'Date on which the content on this web page was last reviewed for accuracy and/or completeness.',
      },
      reviewedBy: {
        type: 'object',
        properties: {
          '@type': {
            type: 'string',
            description: 'A person or organization can review the page.',
          },
          name: {
            type: 'string',
            description: 'Name of the person or organization.',
          },
        },
      },
    },
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.purpule-fox.io/#corporation',
    logo: 'https://www.example.com/photos/logo.jpg',
    lastReviewed: '2021-05-26T05:59:02.085Z',
    reviewedBy: {
      name: 'Garmeeh',
    },
  },
};

const webPageVersions = versionSchemas(webPage100);
export default webPageVersions;
