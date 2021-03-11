import { versionSchemas } from '@cypress/schema-tools';

import address100 from './address';
import { offers101 } from "./common"

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

const performer100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: ['object', 'array'],
    description: 'Performer',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describes type',
      },
      name: {
        type: 'string',
        description: 'Name of the performer',
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@type': 'PerformingGroup',
      name: 'Kira and Morrison',
    },
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
      offers: {
        ...offers101.schema,
        see: offers101,
      },
      performer: {
        ...performer100.schema,
        see: performer100,
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
    offers: [
      {
        '@type': 'Offer',
        price: '119.99',
        priceCurrency: 'USD',
        priceValidUntil: '2020-11-05',
        itemCondition: 'https://schema.org/UsedCondition',
        availability: 'https://schema.org/InStock',
        url: 'https://www.example.com/executive-anvil',
        seller: {
          '@type': 'Organization',
          name: 'Executive Objects',
        },
      },
      {
        '@type': 'Offer',
        price: '139.99',
        priceCurrency: 'CAD',
        priceValidUntil: '2020-09-05',
        itemCondition: 'https://schema.org/UsedCondition',
        availability: 'https://schema.org/InStock',
        url: 'https://www.example.ca/executive-anvil',
        seller: {
          '@type': 'Organization',
          name: 'Executive Objects',
        },
      },
    ],
    performer: {
      '@type': 'PerformingGroup',
      name: 'Kira and Morrison',
    }
  },
};

const event = versionSchemas(event100);
export default event;
