export const brand100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Brand',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describes type',
      },
      name: {
        type: 'string',
        description: 'Brand name',
      },
    },
    example: {
      '@type': 'Thing',
      name: 'ACME',
    },
  },
};

export const aggregateRating100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'The average rating based on multiple ratings or reviews.',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describes type',
      },
      ratingValue: {
        type: 'string',
        description: 'The rating for the content.',
      },
      ratingCount: {
        type: 'string',
        description: 'The count of total number of ratings.',
      },
      reviewCount: {
        type: 'string',
        description: 'The count of total number of reviews.',
      },
      bestRating: {
        type: 'string',
        description: 'Highest rating',
      },
    },
    example: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      reviewCount: '89',
    },
  },
};

export const seller100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description:
      'An entity which offers (sells / leases / lends / loans) the services / goods. A seller may also be a provider. Supersedes merchant, vendor.',
    properties: {
      '@type': {
        type: 'string',
        description: 'Organisation or Person',
      },
      name: {
        type: 'string',
        description: 'Seller name',
      },
    },
    required: true,
    example: {
      '@type': 'Organization',
      name: 'Executive Objects',
    },
  },
};

export const provider100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Provider',
    properties: {
      '@type': {
        type: 'string',
        description: 'Provider type',
      },
      name: {
        type: 'string',
        description: 'Provider name',
      },
      sameAs: {
        type: 'string',
        description: 'Provider url',
      },
    },
    additionalProperties: false,
    example: {
      '@type': 'Organization',
      name: 'Course',
      sameAs: 'https//www.example.com/provider',
    },
  },
};

export const producer100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Producer',
    properties: {
      '@type': {
        type: 'string',
        description: 'Producer type',
      },
      name: {
        type: 'string',
        description: 'Producer name',
      },
      sameAs: {
        type: 'string',
        description: 'Producer url',
      },
    },
    additionalProperties: false,
    example: {
      '@type': 'Organization',
      name: 'Course',
      sameAs: 'https//www.example.com/producer',
    },
  },
};

export const offers100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Offers',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describes type',
      },
      priceCurrency: {
        type: 'string',
        description:
          'Use standard formats: ISO 4217 currency format e.g. "USD"; Ticker symbol for cryptocurrencies e.g. "BTC"; well known names for Local Exchange Tradings Systems (LETS) and other currency types e.g. "Ithaca HOUR".',
      },
      price: {
        type: 'string',
        description: 'Price.',
      },
      priceValidUntil: {
        type: 'string',
        description: 'The date after which the price is no longer available.',
      },
      itemCondition: {
        type: 'string',
        description:
          'itemCondition OfferItemCondition A predefined value from OfferItemCondition or a textual description of the condition of the product or service, or the products or services included in the offer.',
      },
      availability: {
        type: 'string',
        description:
          'The availability of this item—for example In stock, Out of stock, Pre-order, etc.',
      },
      url: {
        type: 'string',
        description: 'A URL to the product web page (that includes the Offer).',
      },
      seller: {
        ...seller100.schema,
        see: seller100,
      },
    },
    example: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '119.99',
      priceValidUntil: '2020-11-05',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Executive Objects',
      },
    },
  },
};

export const offers101 = {
  version: {
    major: 1,
    minor: 0,
    patch: 1,
  },
  schema: {
    type: 'array',
    description: 'Offers',
    item: {
      type: 'object',
      properties: {
        '@type': {
          type: 'string',
          description: 'Describes type',
        },
        priceCurrency: {
          type: 'string',
          description:
            'Use standard formats: ISO 4217 currency format e.g. "USD"; Ticker symbol for cryptocurrencies e.g. "BTC"; well known names for Local Exchange Tradings Systems (LETS) and other currency types e.g. "Ithaca HOUR".',
        },
        price: {
          type: 'string',
          description: 'Price.',
        },
        priceValidUntil: {
          type: 'string',
          description: 'The date after which the price is no longer available.',
        },
        itemCondition: {
          type: 'string',
          description:
            'itemCondition OfferItemCondition A predefined value from OfferItemCondition or a textual description of the condition of the product or service, or the products or services included in the offer.',
        },
        availability: {
          type: 'string',
          description:
            'The availability of this item—for example In stock, Out of stock, Pre-order, etc.',
        },
        url: {
          type: 'string',
          description:
            'A URL to the product web page (that includes the Offer).',
        },
        seller: {
          ...seller100.schema,
          see: seller100,
        },
      },
    },
    example: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '119.99',
      priceValidUntil: '2020-11-05',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Executive Objects',
      },
    },
  },
};

export const rating100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Rating',
    properties: {
      '@type': {
        type: 'string',
      },
      bestRating: {
        type: 'string',
        description: 'Highest rating',
      },
      ratingValue: {
        type: 'string',
        description: 'The rating for the content',
      },
      worstRating: {
        type: 'string',
        description: 'Lowest rating',
      },
    },
    additionalProperties: false,
    example: {
      '@type': 'Rating',
      bestRating: '5',
      ratingValue: '5',
      worstRating: '1',
    },
  },
};

export const author100 = {
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
    example: {
      '@type': 'Person',
      name: 'Jim',
    },
  },
};

export const publisher100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Publisher',
    properties: {
      '@type': {
        type: 'string',
        description: 'Describes type',
      },
      name: {
        type: 'string',
        description: 'Name of the publisher',
      },
    },
    example: {
      '@type': 'Organization',
      name: 'TwoVit',
    },
  },
};

export const review100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Review',
    properties: {
      '@type': {
        type: 'string',
      },
      author: {
        ...author100.schema,
        see: author100,
      },
      publisher: {
        ...publisher100.schema,
        see: publisher100,
      },
      datePublished: {
        type: 'string',
        description: 'Publish data of the review',
      },
      reviewBody: {
        type: 'string',
        description: 'Main review',
      },
      name: {
        type: 'string',
        description: 'Title of the review',
      },
      reviewRating: {
        ...rating100.schema,
        see: rating100,
      },
    },
    additionalProperties: false,
    example: {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Jim',
      },
      publisher: {
        '@type': 'Organization',
        name: 'TwoVit',
      },
      datePublished: '2017-01-06T03:37:40Z',
      reviewBody:
        'This is my favorite product yet! Thanks Nate for the example products and reviews.',
      name: 'So awesome!!!',
      reviewRating: {
        '@type': 'Rating',
        bestRating: '5',
        ratingValue: '5',
        worstRating: '1',
      },
    },
  },
};

export const exampleVideo = {
  '@type': 'VideoObject',
  name: 'How to make a Party Coffee Cake',
  description: 'This is how you make a Party Coffee Cake.',
  thumbnailUrl: [
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ],
  contentUrl: 'http://www.example.com/video123.mp4',
  embedUrl: 'http://www.example.com/videoplayer?video=123',
  uploadDate: '2018-02-05T08:00:00+08:00',
  duration: 'PT1M33S',
  interactionStatistic: {
    '@type': 'InteractionCounter',
    interactionType: { '@type': 'https://schema.org/WatchAction' },
    userInteractionCount: 2347,
  },
  expires: '2019-02-05T08:00:00+08:00',
};

export const videoObject100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Video Object',
    description: 'A video',
    properties: {
      '@type': {
        type: 'string',
        description: 'Schema.org type',
      },
      name: {
        type: 'string',
        description: 'The name of the recipe.',
      },
      description: {
        type: 'string',
        description: 'The description of the recipe.',
      },
      thumbnailUrl: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Array of images for the video.',
      },
      contentUrl: {
        type: 'string',
        description: 'URL for the content of the video',
      },
      embedUrl: {
        type: 'string',
        description: 'URL for the embed version of the video',
      },
      uploadDate: {
        type: 'string',
        description: 'Upload date of the video',
      },
      duration: {
        type: 'string',
        description: 'Duration of the video',
      },
      expires: {
        type: 'string',
        description: 'Expiration date of the video',
      },
    },
    additionalProperties: true,
  },
  example: exampleVideo,
};

export const image100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Image',
    properties: {
      '@type': {
        type: 'string',
        description: 'Should be ImageObject',
      },
      url: {
        type: 'string',
        description: 'URL to the image',
      },
    },
    additionalProperties: false,
    example: {
      '@type': 'ImageObject',
      url: 'https://example.com/photos/1x1/photo.jpg',
    },
  },
};
