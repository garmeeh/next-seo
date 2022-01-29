import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Organization JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/organization');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Organization', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/organization');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@id': 'https://www.purpule-fox.io/#corporation',
        '@type': 'Corporation',
        name: 'Purple Fox',
        legalName: 'Purple Fox LLC',
        logo: 'https://www.example.com/photos/logo.jpg',
        url: 'https://www.purpule-fox.io/',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1600 Saratoga Ave',
          addressLocality: 'San Jose',
          addressRegion: 'CA',
          postalCode: '95129',
          addressCountry: 'US',
        },
        contactPoints: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+1-877-746-0909',
            areaServed: 'US',
            availableLanguage: ['English', 'Spanish', 'French'],
            contactOption: 'TollFree',
          },
        ],
        sameAs: ['https://www.orange-fox.com'],
      });
    });
  });
});
