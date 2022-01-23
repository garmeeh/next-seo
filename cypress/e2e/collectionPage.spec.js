import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Collection Page JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/collectionPage');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('CollectionPage', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/collectionPage');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Resistance 3: Fall of Man',
        hasPart: [
          {
            '@type': 'CreativeWork',
            about:
              'Britten Four Sea Interludes and Passacaglia from Peter Grimes',
            author: 'John Doe',
            name: 'Schema.org Ontology',
            audience: 'Internet',
            keywords: 'schema',
            thumbnailUrl: 'https://i.ytimg.com/vi/eXSJ3PO9Tas/hqdefault.jpg',
            image: 'hqdefault.jpg',
            datePublished: '2021-03-09',
          },
          {
            '@type': 'CreativeWork',
            about: 'Shostakovich Symphony No. 7 (Leningrad)',
            author: 'John Smith',
            name: 'Creative work name',
            datePublished: '2014-10-01T19:30',
          },
        ],
      });
    });
  });
});
