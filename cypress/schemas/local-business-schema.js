import { versionSchemas } from '@cypress/schema-tools';

import address100 from './address';

const localBusiness110 = {
  version: {
    major: 1,
    minor: 1,
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
        description: 'The name of the person or organisation.',
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
    address: address100.example,
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
  },
};

const localBusiness = versionSchemas(localBusiness110);
export default localBusiness;
