import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Logo JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/logo');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Logo', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/logo');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        logo: 'http://www.your-site.com/images/logo.jpg',
        url: 'http://www.and-this-one.com',
      });
    });
  });
});
