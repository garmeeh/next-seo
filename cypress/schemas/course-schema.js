import { versionSchemas } from '@cypress/schema-tools';
import { provider100 } from './common';

const course100 = {
  // has semantic version numbers
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Course',
    description: 'An example schema describing JSON-LD for course',
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
        description: 'The name of the course',
      },
      description: {
        type: 'string',
        description: 'The description of the course',
      },
      provider: {
        ...provider100.schema,
        see: provider100,
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Course Name',
    description: 'Introductory CS course laying out the basics.',
    provider: {
      '@type': 'Organization',
      name: 'Course',
      sameAs: 'https//www.example.com/provider',
    },
  },
};

const courseVersions = versionSchemas(course100);
export default courseVersions;
