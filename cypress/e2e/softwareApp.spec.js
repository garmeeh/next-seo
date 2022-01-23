import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('SoftwareApp JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/softwareApp');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Software App', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/softwareApp');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Angry Birds',
        operatingSystem: 'ANDROID',
        applicationCategory: 'GameApplication',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.6',
          ratingCount: '8864',
        },
        offers: {
          '@type': 'Offer',
          price: '1.00',
          priceCurrency: 'USD',
        },
      });
    });
  });
});
