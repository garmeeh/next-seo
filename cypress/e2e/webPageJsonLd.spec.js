import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('WebPage JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/webPage');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('WebPage', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/webPage');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://www.purpule-fox.io/#info',
        description: 'This is a description.',
        lastReviewed: '2021-05-26T05:59:02.085Z',
        reviewedBy: {
          '@type': 'Organization',
          name: 'Garmeeh',
        },
      });
    });
  });
});
