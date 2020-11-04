import { versionSchemas } from '@cypress/schema-tools';

const dataset100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Dataset',
    description: 'An example schema describing JSON-LD for type: Dataset',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'Dataset',
      },
      description: {
        type: 'string',
        description: 'Description of the dataset',
      },
      name: {
        type: 'string',
        description: 'Name of the dataset',
      },
      license: {
        type: 'string',
        description: 'License for the dataset',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    description: 'The description needs to be at least 50 characters long',
    name: 'name of the dataset',
    license: 'https//www.example.com',
  },
};

const dataset = versionSchemas(dataset100);
export default dataset;
