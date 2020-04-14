import { versionSchemas } from '@cypress/schema-tools';

const image100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'ImageObject',
    description: 'An example schema describing JSON-LD for type: ImageObject',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'ImageObject',
      },
      url: {
        type: 'string',
        description: 'The URL of the image.',
      },
      license: {
        type: 'string',
        description:
          'A license document that applies to this content, typically indicated by URL.',
      },
      acquireLicensePage: {
        type: 'string',
        description:
          'Indicates a page documenting how licenses can be purchased or otherwise acquired.',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    url: 'http://www.example.com/images/image.png',
    license: 'http://www.example.com/license',
    acquireLicensePage: 'http://www.example.com/acquire-license',
  },
};

const image = versionSchemas(image100);
export default image;
