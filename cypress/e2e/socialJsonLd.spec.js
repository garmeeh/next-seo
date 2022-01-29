import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Social JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/social');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Social Profile', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/social');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'your name',
        url: 'http://www.your-site.com',
        sameAs: [
          'http://www.facebook.com/your-profile',
          'http://instagram.com/yourProfile',
          'http://www.linkedin.com/in/yourprofile',
          'http://plus.google.com/your_profile',
        ],
      });
    });
  });
});
