import { versionSchemas } from '@cypress/schema-tools';
import { blog100 } from './blog-schema';

const liveblog100 = {
  ...blog100,
  schema: {
    ...blog100.schema,
    title: 'LiveBlogPosting',
    description:
      'An example schema describing JSON-LD for type: LiveBlogPosting',
    properties: {
      ...blog100.schema.properties,
      coverageStartTime: {
        type: 'string',
        description:
          'The time when the live blog will begin covering the Event. ' +
          "Note that coverage may begin before the Event's start time. The LiveBlogPosting may also be created before coverage begins.",
      },
      coverageEndTime: {
        type: 'string',
        description:
          'The time when the live blog will stop covering the Event. Note that coverage may continue after the Event concludes.',
      },
      liveBlogUpdate: {
        type: 'array',
        items: {
          ...blog100.schema,
          required: ['@type'],
          additionalProperties: true,
        },
        description: 'Array of blog posting updates',
      },
    },
  },
  example: {
    ...blog100.example,
    '@type': 'LiveBlogPosting',
    dateModified: '2024-05-08T22:15:00+02:00',
    datePublished: '2024-05-08T11:13:18+02:00',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://example.com/liveblog',
    },
    headline: 'LiveBlog headline',
    coverageStartTime: '2024-05-08T09:00:01+02:00',
    coverageEndTime: '2024-05-09T09:00:01+02:00',
    liveBlogUpdate: [
      {
        '@type': 'BlogPosting',
        datePublished: '2024-05-08T22:15:00+02:00',
        headline: 'Final update',
        articleBody: 'See you soon',
      },
      {
        '@type': 'BlogPosting',
        datePublished: '2024-05-08T09:00:00+02:00',
        headline: 'Hello',
        articleBody: 'Live coverage demo.',
      },
    ],
  },
};

// Despite the liveBlogUpdate's required config, we must
['author', 'mainEntityOfPage'].forEach(key => {
  liveblog100.schema.properties.liveBlogUpdate.items.properties[
    key
  ].required = false;
});

const liveBlogVersions = versionSchemas(liveblog100);
export default liveBlogVersions;
