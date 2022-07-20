import { versionSchemas } from '@cypress/schema-tools';

import { image100 } from './common';

const estimatedCost100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'estimated costs',
    properties: {
      '@type': {
        type: 'string',
        description: 'should be MonetaryAmount',
      },
      currency: {
        type: 'string',
        description: 'Currency short name like USD',
      },
      value: {
        type: 'string',
        description: 'The value',
      },
    },
    additionalProperties: false,
    example: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '100',
    },
  },
};

const supply100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'array',
    description: 'array of supplies',
    properties: {
      '@type': {
        type: 'string',
        description: 'should be HowToSupply',
      },
      name: {
        type: 'string',
        description: 'describes the supply',
      },
    },
    additionalProperties: false,
    example: [
      {
        '@type': 'HowToSupply',
        name: 'tiles',
      },
      {
        '@type': 'HowToSupply',
        name: 'thin-set mortar',
      },
    ],
  },
};

const tool100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'array',
    description: 'array of tools',
    properties: {
      '@type': {
        type: 'string',
        description: 'should be HowToTool',
      },
      name: {
        type: 'string',
        description: 'describes the tool',
      },
    },
    additionalProperties: false,
    example: [
      {
        '@type': 'HowToTool',
        name: 'notched trowel',
      },
      {
        '@type': 'HowToTool',
        name: 'bucket',
      },
    ],
  },
};

const itemListElement100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'array',
    description: 'array of step details',
    properties: {
      '@type': {
        type: 'string',
        description: 'should be HowToTip or HowToDirection',
      },
      text: {
        type: 'string',
        description: 'the detailed description of the step',
      },
    },
    additionalProperties: false,
    example: [
      {
        '@type': 'HowToDirection',
        text: 'Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled.',
      },
      {
        '@type': 'HowToDirection',
        text: 'Then clean the surface thoroughly to remove any grease or other debris and tape off the area.',
      },
    ],
  },
};

const step100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'array',
    description: 'array of steps',
    properties: {
      '@type': {
        type: 'string',
        description: 'should be HowToStep',
      },
      name: {
        type: 'string',
        description: 'Publisher name',
      },
      url: {
        type: 'string',
        description: 'the url to the specific step',
      },
      itemListElement: {
        ...itemListElement100,
        see: itemListElement100,
      },
      image: {
        ...image100,
        see: image100,
      },
    },
  },
  required: true,
  additionalProperties: false,
  example: {
    '@type': 'Organization',
    name: 'Jane Bloggs',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.example.com/photos/logo.jpg',
    },
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
    description: 'An example schema describing JSON-LD for type: HowTo',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD Type, should be HowTo',
      },
      name: {
        type: 'string',
        description: 'The name of the HowTo',
      },
      image: {
        ...image100,
        see: image100,
      },
      estimatedCost: {
        ...estimatedCost100,
        see: estimatedCost100,
      },
      supply: {
        ...supply100,
        see: supply100,
      },
      tool: {
        ...tool100,
        see: tool100,
      },
      step: {
        ...step100,
        see: step100,
      },
      totalTime: {
        type: 'string',
        description: 'Expected time needed. Example P2D',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to tile a kitchen backsplash',
    image: {
      '@type': 'ImageObject',
      url: 'https://example.com/photos/1x1/photo.jpg',
    },
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '100',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'tiles',
      },
      {
        '@type': 'HowToSupply',
        name: 'thin-set mortar',
      },
      {
        '@type': 'HowToSupply',
        name: 'tile grout',
      },
      {
        '@type': 'HowToSupply',
        name: 'grout sealer',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'notched trowel',
      },
      {
        '@type': 'HowToTool',
        name: 'bucket',
      },
      {
        '@type': 'HowToTool',
        name: 'large sponge',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        url: 'https://example.com/kitchen#step1',
        name: 'Prepare the surfaces',
        itemListElement: [
          {
            '@type': 'HowToTip',
            text: 'Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled.',
          },
          {
            '@type': 'HowToDirection',
            text: 'Then clean the surface thoroughly to remove any grease or other debris and tape off the area.',
          },
        ],
        image: {
          '@type': 'ImageObject',
          url: 'https://example.com/photos/1x1/photo-step1.jpg',
        },
      },
    ],
    totalTime: 'P2D',
  },
};

const howToVersions = versionSchemas(howTo100);
export default howToVersions;
