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
      '@id': 'https://example.com/article',
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
    type: 'object',
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

const logo100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Logo Object',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describe type, should be ImageObject',
      },
      url: {
        type: 'string',
        description: 'URL to logo',
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@type': 'ImageObject',
      url: 'https://www.example.com/photos/logo.jpg',
    },
  },
};

const publisher100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Publisher Object',
    properties: {
      '@type': {
        type: 'string',
        description: 'Publisher type',
      },
      name: {
        type: 'string',
        description: 'Publisher name',
      },
      logo: {
        ...logo100.schema,
        see: logo100,
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
  },
};

const article100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Article',
    description: 'An example schema describing JSON-LD for type: Article',
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
        description: 'Title of the article',
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
        description: 'Publish date of the article',
      },
      dateModified: {
        type: 'string',
        description: 'Modified Date of the article',
      },
      author: {
        ...author100.schema,
        see: author100,
      },
      publisher: {
        ...publisher100.schema,
        see: publisher100,
      },
      description: {
        type: 'string',
        description: 'The description of the Article',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'http://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://example.com/article',
    },
    headline: 'Article headline',
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
    publisher: {
      '@type': 'Organization',
      name: 'Jane Blogs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.example.com/photos/logo.jpg',
      },
    },
    description: 'This is a mighty good description of this article.',
  },
};

const articleVersions = versionSchemas(article100);
export default articleVersions;
