import { versionSchemas } from '@cypress/schema-tools';
import address100 from './address';
import contactPoint100 from './contactPoint';

const organization110 = {
  version: {
    major: 1,
    minor: 1,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Organization',
    description: 'An example schema describing JSON-LD for type: Organization',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'Organization and the subtypes',
      },
      '@id': {
        type: 'string',
        description: 'URL to main entity of page',
      },
      logo: {
        type: 'string',
        description: "Url of the Organization's logo",
      },
      legalName: {
        type: 'string',
        description: 'Legal name of the organization, e.g Purple Fox SA or LLC',
      },
      name: {
        type: 'string',
        description: 'Name of the organization, e.g Purple Fox',
      },
      address: {
        ...address100.schema,
        see: address100,
      },
      sameAs: {
        type: 'array',
        items: {
          type: 'string',
        },
        description:
          "Array of Organization's URL's, usually social urls like instagram, facebook etc.",
      },
      contactPoints: {
        type: 'array',
        items: {
          ...contactPoint100.schema,
          see: contactPoint100,
        },
        description: 'Array with contact points objects.',
      },
      url: {
        type: 'string',
        description: 'URL to main entity of page',
      },
    },
    required: ['name', 'url'],
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': 'https://www.purpule-fox.io/#corporation',
    logo: 'https://www.example.com/photos/logo.jpg',
    legalName: 'Purple Fox LLC',
    name: 'Purple Fox',
    address: [address100.example],
    contactPoints: [contactPoint100.example],
    sameAs: ['https://www.orange-fox.com'],
    url: 'https://www.purpule-fox.io/',
  },
};

const organizationVersions = versionSchemas(organization110);
export default organizationVersions;
