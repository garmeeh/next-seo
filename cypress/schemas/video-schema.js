import { versionSchemas } from '@cypress/schema-tools';

const video100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Video',
    description: 'An example schema describing JSON-LD for type: Video',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD Type',
      },
      name: {
        type: 'string',
        description: 'Game Name',
      },
      description: {
        type: 'string',
        description: 'The description of the Game',
      },
      thumbnailUrl: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      uploadDate: {
        type: 'string',
      },
      contentUrl: {
        type: 'string',
      },
      duration: {
        type: 'string',
      },
      embedUrl: {
        type: 'string',
      },
      expires: {
        type: 'string',
      },
      expires: {
        type: 'string',
      },
      hasPart: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            startOffset: {
              type: 'number',
            },
            endOffset: {
              type: 'number',
            },
            url: {
              type: 'string',
            },
          },
        },
      },
      watchCount: {
        type: 'number',
      },
      publication: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            isLiveBroadcast: {
              type: 'boolean',
            },
            startDate: {
              type: 'string',
            },
            endDate: {
              type: 'string',
            },
          },
        },
      },
      regionsAllowed: {
        type: 'string',
      },
    },
    required: ['@type', 'name'],
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Cat video',
    duration: 'P10M',
    uploadDate: '2019-07-19',
    thumbnailUrl: ['http://www.example.com/cat.jpg'],
    description: 'Watch this cat jump over a fence!',
    contentUrl: 'http://www.example.com/cat_video_full.mp4',
    regionsAllowed: 'US',
    hasPart: [
      {
        '@type': 'Clip',
        name: 'Cat jumps',
        startOffset: 30,
        endOffset: 45,
        url: 'http://www.example.com/example?t=30',
      },
      {
        '@type': 'Clip',
        name: 'Cat misses the fence',
        startOffset: 111,
        endOffset: 150,
        url: 'http://www.example.com/example?t=111',
      },
    ],
    publication: [
      {
        '@type': 'BroadcastEvent',
        isLiveBroadcast: true,
        startDate: '2018-10-27T14:00:00+00:00',
        endDate: '2018-10-27T14:37:14+00:00',
      },
    ],
  },
};

const videoVersions = versionSchemas(video100);
export default videoVersions;
