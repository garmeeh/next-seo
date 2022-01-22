import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Brand JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/brand');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Brand', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/brand');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Brand',
        '@id': 'https://www.purpule-fox.io/#brand',
        logo: 'https://www.example.com/photos/logo.jpg',
        slogan: 'What does the fox say?',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.4',
          reviewCount: '89',
        },
      });
    });
  });
});
