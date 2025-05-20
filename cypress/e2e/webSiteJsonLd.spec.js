import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('WebPage JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/webSite');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('WebSite', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/webSite');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Example',
        alternateName: ['Example Org', 'Example Organization'],
        url: 'https://example.org',
        publisher: {
          '@id': 'https://example.org/#organization',
        },
      });
    });
  });

  it('renders without a publisher', () => {
    cy.visit('http://localhost:3000/jsonld/webSite/withoutPublisher');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Example',
        alternateName: ['Example Org', 'Example Organization'],
        url: 'https://example.org',
      });
    });
  });

  it('renders with a single alternate name', () => {
    cy.visit('http://localhost:3000/jsonld/webSite/withSingleAlternateName');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Example',
        alternateName: 'Example Organization',
        url: 'https://example.org',
      });
    });
  });
});
