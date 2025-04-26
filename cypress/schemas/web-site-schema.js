import { versionSchemas } from '@cypress/schema-tools';

const webSite100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'WebSite',
    description: 'An example schema describing JSON-LD for type: WebSite',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD type: WebSite',
      },
      name: {
        type: 'string',
        description: 'The site name',
      },
      url: {
        type: 'string',
        description: 'The URL of the website',
      },
      alternateName: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'One or multiple alternate names for the site',
      },
      publisher: {
        type: 'object',
        properties: {
          '@id': {
            type: 'string',
            description: 'Id of the publisher node',
          },
        },
      },
    },
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://example.org',
    name: 'Example',
    alternateName: ['Example Org', 'Example Organization'],
    publisher: {
      '@id': 'https://example.org/#organization',
    },
  },
};

const webSiteVersions = versionSchemas(webSite100);
export default webSiteVersions;
