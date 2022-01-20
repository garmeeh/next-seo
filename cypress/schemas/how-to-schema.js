import { versionSchemas } from '@cypress/schema-tools';
import { videoObject100 } from './common';

const howToStep100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'A step in a HowTo',
    properties: {
      '@type': {
        type: 'string',
        description: 'HowToStep',
      },
      text: {
        type: 'string',
        description: 'The full instruction text of this step.',
      },
      itemListElement: {
        type: 'array',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'HowToDirection or HowToTip',
            },
            text: {
              type: 'string',
              description: 'The text of the substep.',
            },
          },
        },
      },
      name: {
        type: 'string',
        description: 'A word or short phrase summarizing the step.',
      },
      url: {
        type: 'string',
        description: 'A url for the step.',
      },
      image: {
        type: 'string',
        description: 'An image for the step.',
      },
      video: {
        type: 'string',
        description: 'A video for the step.',
      },
    },
    required: ['@type'],
    oneOf: [
      {
        required: ['text'],
      },
      {
        required: ['itemListElement'],
      },
    ],
  },
  example: {
    '@type': 'HowToStep',
    image: 'https://example.com/1x1/photo.jpg',
    text: 'Pull the long end through that new loop and tighten to fit!',
  },
};

const howTo100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'HowTo',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'HowTo',
      },
      name: {
        type: 'string',
        description: 'The title of the how-to.',
      },
      image: {
        type: 'string',
        description: 'An image for the how-to.',
      },
      supply: {
        type: 'array',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'HowToSupply',
            },
            name: {
              type: 'string',
              description: 'The name of the supply.',
            },
          },
          required: true,
        },
      },
      tool: {
        type: 'array',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'HowToTool',
            },
            name: {
              type: 'string',
              description: 'The name of the tool.',
            },
          },
          required: true,
        },
      },
      totalTime: {
        type: 'string',
        description:
          'The total time required to perform all instructions or directions.',
      },
      estimatedCost: {
        oneOf: [
          {
            type: 'string',
            description: 'The estimated cost of the how-to.',
          },
          {
            type: 'object',
            properties: {
              '@type': {
                type: 'string',
                description: 'MonetaryAmount',
              },
              currency: {
                type: 'string',
                description: 'The currency of the amount.',
              },
              value: {
                type: 'string',
                description: 'The value of the amount.',
              },
            },
            required: true,
          },
        ],
      },
      video: {
        ...videoObject100.schema,
        see: videoObject100,
      },
      step: {
        type: 'array',
        items: {
          ...howToStep100.schema,
          see: howToStep100,
        },
        description: 'Array of steps.',
      },
    },
    required: ['@type', 'name', 'step'],
  },
  example: {
    '@context': 'https://schema.org/',
    '@type': 'HowTo',
    name: 'How to tie a tie',
    image: 'https://example.com/photos/1x1/photo.jpg',
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'A tie',
      },
      {
        '@type': 'HowToSupply',
        name: 'A collared shirt',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'A mirror',
      },
    ],
    totalTime: 'PT2M',
    video: {
      '@type': 'VideoObject',
      name: 'Tie a Tie',
      description: 'How to tie a four-in-hand knot.',
      thumbnailUrl: ['https://example.com/photos/photo.jpg'],
      contentUrl: 'http://www.example.com/videos/123_600x400.mp4',
      duration: 'P1MT10S',
      embedUrl: 'http://www.example.com/videoplayer?id=123',
      uploadDate: '2019-01-05T08:00:00+08:00',
    },
    step: [
      {
        '@type': 'HowToStep',
        image: 'https://example.com/1x1/photo.jpg',
        text: "Button your shirt how you'd like to wear it, then drape the tie around your neck. Make the thick end about 1/3rd longer than the short end. For formal button down shirts, it usually works best with the small end of the tie between 4th and 5th button.",
      },
      {
        '@type': 'HowToStep',
        image: 'https://example.com/1x1/photo.jpg',
        text: 'Cross the long end over the short end. This will form the basis for your knot.',
      },
      {
        '@type': 'HowToStep',
        image: 'https://example.com/1x1/photo.jpg',
        text: 'Bring the long end back under the short end, then throw it back over the top of the short end in the other direction. ',
      },
      {
        '@type': 'HowToStep',
        image: 'https://example.com/1x1/photo.jpg',
        text: 'Now pull the long and through the loop near your neck, forming another loop near your neck.',
      },
      {
        '@type': 'HowToStep',
        image: 'https://example.com/1x1/photo.jpg',
        text: 'Pull the long end through that new loop and tighten to fit!',
      },
    ],
  },
};

const howTo = versionSchemas(howTo100);
export default howTo;
