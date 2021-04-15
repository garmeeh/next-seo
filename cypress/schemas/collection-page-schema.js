import { versionSchemas } from '@cypress/schema-tools';

const collectionPage100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'CollectionPage',
    description:
      'An example schema describing JSON-LD for type: CollectionPage.',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'CollectionPage',
      },
      name: {
        type: 'string',
        description: 'The name of the item.',
      },
      hasPart: {
        type: 'array',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'CreativeWork',
            },
            author: {
              type: 'string',
              description: 'The author of this content or rating.',
            },
            about: {
              type: 'string',
              description: 'The subject matter of the content.',
            },
            name: {
              type: 'string',
              description: 'The name of the item.',
            },
            audience: {
              type: 'string',
              description:
                'An intended audience, i.e. a group for whom something was created.',
            },
            keywords: {
              type: 'string',
              description:
                'Keywords or tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas.',
            },
            thumbnailUrl: {
              type: 'string',
              description: 'A thumbnail image relevant to the Thing.',
            },
            image: {
              type: 'string',
              description: 'An image of the item.',
            },
            datePublished: {
              type: 'string',
              description: 'Date of first broadcast/publication.',
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
    '@type': 'CollectionPage',
    name: 'Resistance 3: Fall of Man',
    hasPart: [
      {
        '@type': 'CreativeWork',
        about: 'Britten Four Sea Interludes and Passacaglia from Peter Grimes',
        author: 'John Doe',
        name: 'Schema.org Ontology',
        audience: 'Internet',
        keywords: 'schema',
        thumbnailUrl: 'https://i.ytimg.com/vi/eXSJ3PO9Tas/hqdefault.jpg',
        image: 'hqdefault.jpg',
        datePublished: '2021-03-09',
      },
      {
        '@type': 'CreativeWork',
        about: 'Shostakovich Symphony No. 7 (Leningrad)',
        author: 'John Smith',
        name: 'Creative work name',
        datePublished: '2014-10-01T19:30',
      },
    ],
  },
};

const collectionPageVersions = versionSchemas(collectionPage100);
export default collectionPageVersions;
