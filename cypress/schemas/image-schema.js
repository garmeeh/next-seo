import { versionSchemas } from '@cypress/schema-tools';

const imageDefinition = {
  '@type': {
    type: 'string',
    description: 'JSON-LD type: ImageObject',
  },
  '@context': {
    type: 'string',
    description: 'Schema.org context',
  },
  contentUrl: {
    type: 'string',
    description: 'URL of the image',
  },
  creator: {
    type: 'object',
    description: 'creator of the image',
    properties: {
      '@type': 'string',
      description: 'JSON-LD type: Person or Organization',
      name: 'string',
    },
  },
  creditText: {
    type: 'string',
    description: 'credit text for the image',
  },
  copyrightNotice: {
    type: 'string',
    description: 'copyright notice for the image',
  },
  license: {
    type: 'string',
    description:
      "A URL to a page that describes the license governing an image's use",
  },
  acquireLicensePage: {
    type: 'string',
    description: 'URL to acquire license for the image',
  },
};

const imageMetadata100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'image metadata for google image results',
    title: 'Image Metadata',
    properties: imageDefinition,
    required: false,
    additionalProperties: false,
    required: true,
    additionalProperties: false,
    example: {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      contentUrl: 'http://www.example.com/images/image.png',
      creator: {
        '@type': 'Person',
        name: 'Jane Doe',
      },
      creditText: 'Jane Doe',
      copyrightNotice: '© Jane Doe',
      license: 'http://www.example.com/license',
      acquireLicensePage: 'http://www.example.com/acquire-license',
    },
  },
};

const imageVersions = versionSchemas(imageMetadata100);
export default imageVersions;
