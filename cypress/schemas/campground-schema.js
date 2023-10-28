import { versionSchemas } from '@cypress/schema-tools';

import address100 from './address';

const campground100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Campground',
    description: 'An example schema describing JSON-LD for type: Campground',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description:
          'Any more specific type supported by Campground https://schema.org/Campground',
      },
      '@id': {
        type: 'string',
        description:
          'Globally unique ID of the specific campground in the form of a URL. The ID should be stable and unchanging over time. Google Search treats the URL as an opaque string and it does not have to be a working link.',
      },
      name: {
        type: 'string',
        description: 'The name of the campground.',
      },
      description: {
        type: 'string',
        description: 'Description for the campground.',
      },
      url: {
        type: 'string',
        description:
          'The fully-qualified URL of the specific campground location. Unlike the @id property, this URL property should be a working link.',
      },
      telephone: {
        type: 'string',
        description:
          'A campground phone number meant to be the primary contact method for customers. Be sure to include the country code and area code in the phone number.',
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
        description: 'An object with latitude and longitude',
        properties: {
          '@type': {
            type: 'string',
            description: 'JSON-LD type: GeoCoordinates',
          },
          latitude: {
            type: 'string',
            description: 'The latitude of the campground location.',
          },
          longitude: {
            type: 'string',
            description: 'The longitude of the campground location.',
          },
        },
      },
      openingHoursSpecification: {
        type: 'array',
        description: 'Opening hour specification for the campground',
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
      petsAllowed: {
        type: 'boolean',
        description:
          'Indicates whether pets are allowed to enter the campground.',
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
            description: 'Ratings/Reviews aggregate value of the campground.',
          },
          ratingCount: {
            type: 'string',
            description: 'Ratings/Reviews number of the campground.',
          },
        },
        description: 'Aggregate rating of the campground.',
      },
      amenityFeature: {
        type: ['array', 'object'],
        item: {
          type: 'object',
          properties: {
            '@type': {
              type: 'string',
              description: 'JSON-LD type: LocationFeatureSpecification',
            },
            name: {
              type: 'string',
              description: 'The name of the amenity.',
            },
            value: {
              type: ['string', 'integer', 'boolean'],
              description: 'The value of the amenity.',
            },
          },
        },
      },
      priceRange: {
        type: 'string',
        description:
          'The approximate price of the campground. You can specify as many currency symbols as there are digits in the price, or you can specify an actual range.',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Campground',
    '@id': 'https://www.example.com/campground/rip-van-winkle-campground',
    name: 'Rip Van Winkle Campgrounds',
    description: 'Description about Rip Van Winkle Campgrounds',
    url: 'https://www.example.com/campground',
    telephone: '+18452468114',
    image: ['https://example.com/photos/1x1/photo.jpg'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '149 Blue Mountain Rd',
      addressLocality: 'Saugerties',
      addressRegion: 'NY',
      postalCode: '12477',
      addressCountry: 'US',
    },
    geo: {
      latitude: '42.092599',
      longitude: '-74.018580',
      '@type': 'GeoCoordinates',
    },
    openingHoursSpecification: [
      {
        opens: '09:00',
        closes: '17:00',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        validFrom: '2019-12-23',
        validThrough: '2020-04-02',
        '@type': 'OpeningHoursSpecification',
      },
    ],
    petsAllowed: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '18',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Showers',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'RV Hookup',
        value: false,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Campfire',
        value: true,
      },
    ],
    priceRange: '$$',
  },
};

const campground = versionSchemas(campground100);
export default campground;
