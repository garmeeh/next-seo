import { versionSchemas } from '@cypress/schema-tools';
import {
  offers101,
  aggregateRating100,
  review100,
  producer100,
  provider100,
  author100,
  videoObject100,
} from './common';

const videoGame100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'VideoGame',
    description: 'An example schema describing JSON-LD for type: VideoGame',
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
      translator: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      inLanguage: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      description: {
        type: 'string',
        description: 'The description of the Game',
      },
      processorRequirements: {
        type: 'string',
      },
      memoryRequirements: {
        type: 'string',
      },
      playMode: {
        type: 'string',
      },
      applicationCategory: {
        type: 'string',
      },
      url: {
        type: 'string',
        description: 'A URL to the game web page.',
      },
      gamePlatform: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      operatingSystem: {
        type: 'string',
      },
      keywords: {
        type: 'string',
      },
      datePublished: {
        type: 'string',
        description: 'Release date of the game',
      },
      image: {
        type: 'object',
        properties: {
          '@type': {
            type: 'string',
            description: 'Describe type, should be ImageObject',
          },
          url: {
            type: 'string',
          },
        },
      },
      publisher: {
        type: 'string',
      },
      producer: {
        ...producer100.schema,
        see: producer100,
      },
      offers: {
        ...offers101.schema,
        see: offers101,
      },
      aggregateRating: {
        ...aggregateRating100.schema,
        see: aggregateRating100,
      },
      review: {
        type: 'array',
        items: {
          ...review100.schema,
        },
        see: review100,
      },
      provider: {
        ...provider100.schema,
        see: provider100,
      },
      author: {
        ...author100.schema,
        see: author100,
      },
      storageRequirements: {
        type: 'string',
      },
      trailer: {
        ...videoObject100.schema,
        see: videoObject100,
      },
      genre: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    required: ['@type', 'name'],
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org/',
    '@type': 'VideoGame',
    name: 'Red Dead Redemption 2',
    translator: ['Translator 1', 'Translator 2'],
    inLanguage: ['English', 'Kurdish'],
    description:
      'Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.',
    processorRequirements: '4 GHz',
    memoryRequirements: '16 Gb',
    playMode: 'SinglePlayer',
    applicationCategory: 'Game',
    url: 'https://example.com/rdr2-game',
    gamePlatform: ['PC game', 'PlayStation 4'],
    operatingSystem: 'windows',
    keywords: 'outlaw, gang, federal agents',
    datePublished: '2019-02-05T08:00:00+08:00',
    image: {
      '@type': 'ImageObject',
      url: 'https://example.com/photos/1x1/photo.jpg',
    },
    publisher: 'Vertical Games',
    producer: {
      '@type': 'Organization',
      name: 'Rockstar Games',
      sameAs: 'https//www.example.com/producer',
    },
    offers: [
      {
        '@type': 'Offer',
        price: '119.99',
        priceCurrency: 'USD',
        priceValidUntil: '2020-11-05',
        availability: 'https://schema.org/InStock',
        url: 'https://example.net/rdr2-game',
        seller: {
          '@type': 'Organization',
          name: 'Executive Gaming',
        },
      },
      {
        '@type': 'Offer',
        price: '139.99',
        priceCurrency: 'CAD',
        priceValidUntil: '2020-09-05',
        availability: 'https://schema.org/InStock',
        url: 'https://example.org/rdr2-game',
        seller: {
          '@type': 'Organization',
          name: 'Executive Gaming',
        },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '44',
      reviewCount: '89',
      ratingCount: '684',
      bestRating: '100',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'AhmetKaya',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Gam Production',
        },
        datePublished: '2017-01-06T03:37:40Z',
        reviewBody: 'Iki gozum.',
        name: 'Rica ederim.',
        reviewRating: {
          '@type': 'Rating',
          bestRating: '5',
          ratingValue: '5',
          worstRating: '1',
        },
      },
    ],
  },
};

const videoGameVersions = versionSchemas(videoGame100);
export default videoGameVersions;
