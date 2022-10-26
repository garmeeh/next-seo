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
      '@id': 'https://example.com/newsarticle',
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

const newsarticle100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'NewsArticle',
    description: 'An example schema describing JSON-LD for type: NewsArticle',
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
        description: 'Title of the news article',
      },
      image: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Array of image urls',
      },
      articleSection: {
        type: 'string',
        description: 'section of the newsarticle',
      },
      keywords: {
        type: 'string',
        description: 'keywords of the newsarticle',
      },
      dateCreated: {
        type: 'string',
        description: 'Created date of the newsarticle',
      },
      datePublished: {
        type: 'string',
        description: 'Publish date of the newsarticle',
      },
      dateModified: {
        type: 'string',
        description: 'Modified Date of the newsarticle',
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
        description: 'The description of the News Article',
      },
      articleBody: {
        type: 'string',
        description: 'The article body of the News Article',
      },
      isAccessibleForFree: {
        type: 'boolean',
        description:
          'A flag to signal that the News Article is accessible for free.',
        required: false,
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://example.com/newsarticle',
    },
    headline: 'News Article headline',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    articleSection: 'politics',
    keywords: 'prayuth, taksin, thai',
    dateCreated: '2015-02-05T08:00:00+08:00',
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
    articleBody: 'This is article body of news article',
    isAccessibleForFree: true,
  },
};

const newsarticleVersions = versionSchemas(newsarticle100);
export default newsarticleVersions;
