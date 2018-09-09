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
      reviewCount: {
        type: 'string',
        description: 'The count of total number of reviews.',
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
      itemCondition: 'http://schema.org/UsedCondition',
      availability: 'http://schema.org/InStock',
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
        type: 'string',
        description: 'Author of the review',
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
      author: 'Jim',
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
