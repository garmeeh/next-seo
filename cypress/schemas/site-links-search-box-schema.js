import { versionSchemas } from '@cypress/schema-tools';

const siteLinksSearchBox100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Sitelinks Search Box',
    description:
      'An example schema describing JSON-LD for type: Sitelinks Search Box',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'WebSite',
      },
      url: {
        type: 'string',
        description:
          'URL of the website associated with the sitelinks searchbox.',
      },
      potentialAction: {
        type: 'array',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'SearchAction',
            },
            target: {
              type: 'string',
              description:
                'For websites, the URL of the handler that should receive and handle the search query; for apps, the URI of the intent handler for your search engine that should handle queries.',
            },
            'query-input': {
              type: 'string',
              description:
                'Placeholder used in target, gets substituted for user given query',
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
    '@type': 'WebSite',
    url: 'https://www.example.com',
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: 'https://query.example.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      {
        '@type': 'SearchAction',
        target:
          'android-app://com.example/https/query.example.com/search/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    ],
  },
};

const siteLinksSearchBox = versionSchemas(siteLinksSearchBox100);
export default siteLinksSearchBox;
