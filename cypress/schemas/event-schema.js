import { versionSchemas } from '@cypress/schema-tools';

import address100 from './address';

const location100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Location',
    properties: {
      '@type': {
        type: 'string',
        description: 'Location type',
      },
      name: {
        type: 'string',
        description: 'Location name',
      },
      address: {
        ...address100.schema,
        see: address100,
      },
    },
  },
  example: {
    '@type': 'Place',
    name: 'My place',
    address: address100.example,
  },
};

const event100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Event',
    properties: {
      '@type': {
        type: 'string',
        description: 'Event type',
      },
      name: {
        type: 'string',
        description: 'Event name',
      },
      startDate: {
        type: 'string',
        description: 'Event start date',
      },
      endDate: {
        type: 'string',
        description: 'Event end date',
      },
      location: {
        ...location100.schema,
        see: location100,
      },
    },
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'My event',
    startDate: '2020-01-23T00:00:00.000Z',
    endDate: '2020-02-24T00:00:00.000Z',
    location: location.example,
    image: ['https://example.com/photos/1x1/photo.jpg'],
    description: 'My event @ my place',
  },
};

const event = versionSchemas(event100);
export default event;
