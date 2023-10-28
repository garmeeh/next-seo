import { versionSchemas } from '@cypress/schema-tools';

import address100 from './address';

const localBusiness140 = {
  version: {
    major: 1,
    minor: 4,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Local Business',
    description:
      'An example schema describing JSON-LD for type: Local Business',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description:
          'Any more specific type supported by Local Business https://schema.org/LocalBusiness',
      },
      '@id': {
        type: 'string',
        description:
          'Globally unique ID of the specific business location in the form of a URL. The ID should be stable and unchanging over time. Google Search treats the URL as an opaque string and it does not have to be a working link. If the business has multiple locations, make sure the @id is unique for each location.',
      },
      name: {
        type: 'string',
        description: 'Name of the person or organization.',
      },
      description: {
        type: 'string',
        description: 'Description for the local business.',
      },
      url: {
        type: 'string',
        description:
          'The fully-qualified URL of the specific business location. Unlike the @id property, this URL property should be a working link.',
      },
      telephone: {
        type: 'string',
        description:
          'A business phone number meant to be the primary contact method for customers. Be sure to include the country code and area code in the phone number.',
      },
      image: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: "Array of image URL's",
      },
      address: {
        ...address100.schema,
        see: address100,
      },
      geo: {
        type: 'object',
        description: "Array of social profile URL's",
        properties: {
          '@type': {
            type: 'string',
            description: 'JSON-LD type: GeoCoordinates',
          },
          latitude: {
            type: 'string',
            description: 'The latitude of the business location.',
          },
          longitude: {
            type: 'string',
            description: 'The longitude of the business location.',
          },
        },
      },
      sameAs: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: "Array of business URL's",
      },
      openingHoursSpecification: {
        type: 'array',
        description: 'Opening hour specification for the local business',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'JSON-LD type: OpeningHoursSpecification',
            },
            opens: {
              type: 'string',
              description:
                'The opening hour of the place or service on the given day(s) of the week.',
            },
            closes: {
              type: 'string',
              description:
                'The closing hour of the place or service on the given day(s) of the week.',
            },
            dayOfWeek: {
              type: 'array',
              items: {
                type: 'string',
              },
              description:
                'The day of the week for which these opening hours are valid.',
            },
            validFrom: {
              type: 'string',
              description: 'The date when the item becomes valid.',
            },
            validThrough: {
              type: 'string',
              description: 'The date after when the item is not valid.',
            },
          },
        },
      },
      aggregateRating: {
        type: 'object',
        properties: {
          '@type': {
            type: 'string',
            description: 'JSON-LD type: AggregateRating.',
          },
          ratingValue: {
            type: 'string',
            description: 'Ratings/Reviews aggregate value of local business.',
          },
          ratingCount: {
            type: 'string',
            description: 'Ratings/Reviews number of local business.',
          },
        },
        description: 'Aggregate rating of local business.',
      },
      review: {
        type: 'array',
        description: 'Reviews list of the local business.',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'JSON-LD type: Review.',
            },
            author: {
              type: 'string',
              description: 'The author of the review.',
            },
            datePublished: {
              type: 'string',
              description: 'The date when the review was published.',
            },
            reviewBody: {
              type: 'string',
              description: 'The review body/description.',
            },
            reviewRating: {
              type: 'object',
              properties: {
                '@type': {
                  type: 'string',
                  description: 'JSON-LD type: Rating.',
                },
                bestRating: {
                  type: 'string',
                  description:
                    'The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed.',
                },
                reviewAspect: {
                  type: 'string',
                  description:
                    'This Review or Rating is relevant to this part or facet of the itemReviewed.',
                },
                worstRating: {
                  type: 'string',
                  description:
                    'The lowest value allowed in this rating system. If worstRating is omitted, 1 is assumed.',
                },
                ratingValue: {
                  type: 'string',
                  description: 'The rating for the content.',
                },
              },
            },
          },
        },
      },
      makesOffer: {
        type: 'array',
        description: 'Offers list of the local business.',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'JSON-LD type: Offer.',
            },
            priceSpecification: {
              type: 'object',
              properties: {
                '@type': {
                  type: 'string',
                  description: 'JSON-LD type: PriceSpecification.',
                },
                priceCurrency: {
                  type: 'string',
                  description:
                    'The currency of the price, or a price component when attached to PriceSpecification and its subtypes.',
                },
                price: {
                  type: 'string',
                  description:
                    'The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.',
                },
              },
            },
            itemOffered: {
              type: 'object',
              properties: {
                '@type': {
                  type: 'string',
                  description: 'JSON-LD type: Service.',
                },
                name: {
                  type: 'string',
                  description: 'The name of the item',
                },
                description: {
                  type: 'string',
                  description: 'A description of the item.',
                },
              },
            },
          },
        },
      },
      areaServed: {
        type: 'array',
        description:
          'The geographic areas where a service or offered item is provided.',
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'JSON-LD type: GeoCircle.',
            },
            geoMidpoint: {
              type: 'object',
              properties: {
                '@type': {
                  type: 'string',
                  description: 'JSON-LD type: GeoCoordinates.',
                },
                latitude: {
                  type: 'string',
                  description:
                    'The latitude of a location. For example 37.42242',
                },
                longitude: {
                  type: 'string',
                  description:
                    'The longitude of a location. For example -122.08585',
                },
              },
            },
            geoRadius: {
              type: 'string',
              description:
                'Indicates the approximate radius of a GeoCircle (metres unless indicated otherwise via Distance notation).',
            },
          },
        },
      },
      potentialAction: {
        type: 'object',
        properties: {
          '@type': {
            type: 'string',
            description: 'JSON-LD type: Action or subclasses.',
          },
          target: {
            type: 'string',
            description: 'Indicates a target EntryPoint for an Action.',
          },
        },
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    '@id': 'http://davesdeptstore.example.com',
    name: "Dave's Department Store",
    description: 'Some form of description',
    address: [address100.example],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.293058',
      longitude: '-121.988331',
    },
    url: 'http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427',
    telephone: '+14088717984',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        opens: '08:00',
        closes: '23:59',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        validFrom: '2019-12-23',
        validThrough: '2020-04-02',
      },
      {
        '@type': 'OpeningHoursSpecification',
        opens: '14:00',
        closes: '20:00',
        dayOfWeek: 'Sunday',
        validFrom: '2019-12-23',
        validThrough: '2020-04-02',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '2',
    },
    review: [
      {
        '@type': 'Review',
        author: 'John Doe',
        datePublished: '2006-05-04',
        name: 'A masterpiece of literature',
        reviewBody:
          'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.',
        reviewRating: {
          '@type': 'Rating',
          bestRating: '5',
          worstRating: '1',
          reviewAspect: 'Ambiance',
          ratingValue: '4',
        },
      },
      {
        '@type': 'Review',
        author: 'Bob Smith',
        datePublished: '2006-06-15',
        name: 'A good read.',
        reviewBody:
          "Catcher in the Rye is a fun book. It's a good book to read.",
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4',
        },
      },
    ],
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '41.108237',
          longitude: '-80.642982',
        },
        geoRadius: '1000',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '51.108237',
          longitude: '-80.642982',
        },
        geoRadius: '1000',
      },
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: '1000-10000',
        },
        itemOffered: {
          '@type': 'Service',
          name: 'Motion Design Services',
          description:
            'We are the expert of animation and motion design productions.',
        },
      },
      {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: '2000-10000',
        },
        itemOffered: {
          '@type': 'Service',
          name: 'Branding Services',
          description:
            'Real footage is a powerful tool when it comes to show what the business is about. Can be used to present your company, show your factory, promote a product packshot, or just tell any story. It can help create emotional links with your audience by showing punchy images.',
        },
      },
    ],
    potentialAction: {
      '@type': 'ReviewAction',
      target: 'https://www.example.com/review/this/business',
    },
  },
};

const localBusiness = versionSchemas(localBusiness140);
export default localBusiness;
