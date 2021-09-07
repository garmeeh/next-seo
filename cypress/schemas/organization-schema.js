import { versionSchemas } from '@cypress/schema-tools';
import address100 from './address';
import contactPoint100 from './contactPoint';

const organization100 = {
  version: {
    major: 1,
    minor: 0,
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
      name: {
        type: 'string',
        description: 'Name of the organization, e.g Purple Fox',
      },
      legalName: {
        type: 'string',
        description: 'Legal name of the organization, e.g Purple Fox SA or LLC',
      },
      logo: {
        type: 'string',
        description: "Url of the Organization's logo",
      },
      sameAs: {
        type: 'array',
        items: {
          type: 'string',
        },
        description:
          "Array of Organization's URL's, usually social urls like instagram, facebook etc.",
      },
      address: address100.schema,
      contactPoints: {
        type: 'array',
        items: {
          ...contactPoint100.schema,
        },
      },
    },
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': 'https://www.purpule-fox.io/#corporation',
    name: 'Purple Fox',
    legalName: 'Purple Fox LLC',
    logo: 'https://www.example.com/photos/logo.jpg',
    url: 'https://www.purpule-fox.io/',
    address: address100.example,
    contactPoints: [contactPoint100.example],
    sameAs: ['https://www.orange-fox.com'],
  },
};

const organizationVersions = versionSchemas(organization100);
export default organizationVersions;
