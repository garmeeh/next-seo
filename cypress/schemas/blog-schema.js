import { versionSchemas } from '@cypress/schema-tools';

const mainEntity100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Main entity of the page type',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describes type',
      },
      '@id': {
        type: 'string',
        description: 'URL to main entity of page',
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@type': 'WebPage',
      '@id': 'https://example.com/blog',
    },
  },
};

const author100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: ['object', 'array'],
    description: 'Author',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describes type',
      },
      name: {
        type: 'string',
        description: 'Name of the author',
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@type': 'Person',
      name: 'Jane Blogs',
    },
  },
};

const blog100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Blog',
    description: 'An example schema describing JSON-LD for type: Blog',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD Type',
      },
      mainEntityOfPage: {
        ...mainEntity100.schema,
        see: mainEntity100,
      },
      headline: {
        type: 'string',
        description: 'Title of the blog',
      },
      image: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Array of image urls',
      },
      datePublished: {
        type: 'string',
        description: 'Publish date of the blog',
      },
      dateModified: {
        type: 'string',
        description: 'Modified Date of the blog',
      },
      author: {
        ...author100.schema,
        see: author100,
      },
      description: {
        type: 'string',
        description: 'The description of the Blog',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://example.com/blog',
    },
    headline: 'Blog headline',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    datePublished: '2015-02-05T08:00:00+08:00',
    dateModified: '2015-02-05T09:00:00+08:00',
    author: {
      '@type': 'Person',
      name: 'Jane Blogs',
    },
    description: 'This is a mighty good description of this blog.',
  },
};

const blogVersions = versionSchemas(blog100);
export default blogVersions;
