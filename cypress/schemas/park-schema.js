import { versionSchemas } from '@cypress/schema-tools';

import address100 from './address';

const park100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Park',
    description: 'An example schema describing JSON-LD for type: Park',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description:
          'Any more specific type supported by Park https://schema.org/Park',
      },
      '@id': {
        type: 'string',
        description:
          'Globally unique ID of the specific park in the form of a URL. The ID should be stable and unchanging over time. Google Search treats the URL as an opaque string and it does not have to be a working link.',
      },
      name: {
        type: 'string',
        description: 'The name of the park.',
      },
      description: {
        type: 'string',
        description: 'Description for the park.',
      },
      url: {
        type: 'string',
        description:
          'The fully-qualified URL of the specific park location. Unlike the @id property, this URL property should be a working link.',
      },
      telephone: {
        type: 'string',
        description:
          'A park phone number meant to be the primary contact method for customers. Be sure to include the country code and area code in the phone number.',
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
            description: 'The latitude of the park location.',
          },
          longitude: {
            type: 'string',
            description: 'The longitude of the park location.',
          },
        },
      },
      openingHoursSpecification: {
        type: 'array',
        description: 'Opening hour specification for the park',
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
    '@type': 'Park',
    '@id': 'https://www.example.com/park/minnewaska-state-park',
    name: 'Minnewaska State Park',
    description: 'Description about Minnewaska State Park',
    url: 'https://www.example.com/park',
    telephone: '+18452550752',
    image: ['https://example.com/photos/1x1/photo.jpg'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5281 Route 44-55',
      addressLocality: 'Kerhonkson',
      addressRegion: 'NY',
      postalCode: '12446',
      addressCountry: 'US',
    },
    geo: {
      latitude: '41.735149',
      longitude: '-74.239037',
      '@type': 'GeoCoordinates',
    },
    openingHoursSpecification: [
      {
        opens: '09:00',
        closes: '18:00',
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
  },
};

const park = versionSchemas(park100);
export default park;
