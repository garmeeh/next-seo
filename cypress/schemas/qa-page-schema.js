import { versionSchemas } from '@cypress/schema-tools';
import { author100 } from './common';

const qaPage100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Q&A Page',
    description: 'An example schema describing JSON-LD for type: Q&A Page',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'QAPage',
      },
      mainEntity: {
        type: 'object',
        properties: {
          '@type': {
            type: 'string',
            description: 'Question',
          },
          name: {
            type: 'string',
            description: 'The full text of the short form of the question.',
          },
          text: {
            type: 'string',
            description: 'The full text of the long form of the question.',
          },
          answerCount: {
            type: 'number',
            description: 'The total number of answers to the question.',
          },
          upvoteCount: {
            type: 'number',
            description:
              'The total number of votes that this question has received.',
          },
          dateCreated: {
            type: 'string',
            description:
              'The date at which the question was added to the page, in ISO-8601 format.',
          },
          author: {
            ...author100.schema,
            see: author100,
          },
          acceptedAnswer: {
            type: 'object',
            properties: {
              '@type': {
                type: 'string',
                description: 'Answer',
              },
              text: {
                type: 'string',
                description: 'The full text of the answer.',
              },
              dateCreated: {
                type: 'string',
                description:
                  'The date at which the answer was added to the page, in ISO-8601 format.',
              },
              upvoteCount: {
                type: 'number',
                description:
                  'The total number of votes that this answer has received.',
              },
              url: {
                type: 'string',
                description: 'A URL that links directly to this answer.',
              },
              author: {
                ...author100.schema,
                see: author100,
              },
            },
          },
          suggestedAnswer: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                '@type': {
                  type: 'string',
                  description: 'Answer',
                },
                text: {
                  type: 'string',
                  description: 'The full text of the answer.',
                },
                dateCreated: {
                  type: 'string',
                  description:
                    'The date at which the answer was added to the page, in ISO-8601 format.',
                },
                upvoteCount: {
                  type: 'number',
                  description:
                    'The total number of votes that this answer has received.',
                },
                url: {
                  type: 'string',
                  description: 'A URL that links directly to this answer.',
                },
                author: {
                  ...author100.schema,
                  see: author100,
                },
              },
            },
          },
        },
      },
    },
    required: true,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: 'How many ounces are there in a pound?',
      text:
        'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
      answerCount: 3,
      upvoteCount: 26,
      dateCreated: '2016-07-23T21:11Z',
      author: {
        '@type': 'Person',
        name: 'New Baking User',
      },
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1 pound (lb) is equal to 16 ounces (oz).',
        dateCreated: '2016-11-02T21:11Z',
        upvoteCount: 1337,
        url: 'https://example.com/question1#acceptedAnswer',
        author: {
          '@type': 'Person',
          name: 'SomeUser',
        },
      },
      suggestedAnswer: [
        {
          '@type': 'Answer',
          text:
            'Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.',
          dateCreated: '2016-11-02T21:11Z',
          upvoteCount: 42,
          url: 'https://example.com/question1#suggestedAnswer1',
          author: {
            '@type': 'Person',
            name: 'AnotherUser',
          },
        },
        {
          '@type': 'Answer',
          text:
            " I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.",
          dateCreated: '2016-11-06T21:11Z',
          upvoteCount: 0,
          url: 'https://example.com/question1#suggestedAnswer2',
          author: {
            '@type': 'Person',
            name: 'ConfusedUser',
          },
        },
      ],
    },
  },
};

const qaPageVersions = versionSchemas(qaPage100);
export default qaPageVersions;
