import { versionSchemas } from '@cypress/schema-tools';

const socialProfile100 = {
  version: {
    major: 1,
    minor: 0,
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
        type: 'object',
        description: "Array of social profile URL's",
        properties: {
          '@type': {
            type: 'string',
            description: 'JSON-LD type: PostalAddress',
          },
          streetAddress: {
            type: 'string',
            description: 'Street number, street name, and unit number',
          },
          addressLocality: {
            type: 'string',
            description: 'City',
          },
          addressRegion: {
            type: 'string',
            description: 'State or province, if applicable.',
          },
          postalCode: {
            type: 'string',
            description: 'Postal or zip code.',
          },
          addressCountry: {
            type: 'string',
            description: 'The 2-letter ISO 3166-1 alpha-2 country code',
          },
        },
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
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'http://schema.org',
    '@type': 'Store',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    '@id': 'http://davesdeptstore.example.com',
    name: "Dave's Department Store",
    description: 'Some form of description',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1600 Saratoga Ave',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
      postalCode: '95129',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.293058',
      longitude: '-121.988331',
    },
    url: 'http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427',
    telephone: '+14088717984',
  },
};

const socialProfile = versionSchemas(socialProfile100);
export default socialProfile;
