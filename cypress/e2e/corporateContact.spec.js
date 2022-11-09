import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('DataSet JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/corporateContact');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Corporate Contact', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/corporateContact');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: 'http://www.your-company-site.com',
        logo: 'http://www.example.com/logo.png',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+1-401-555-1212',
            email: 'customerservice@email.com',
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: ['English', 'Spanish', 'French'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+1-877-746-0909',
            email: 'servicecustomer@email.com',
            contactType: 'customer service',
            contactOption: 'TollFree',
            availableLanguage: 'English',
          },
          {
            '@type': 'ContactPoint',
            telephone: '+1-877-453-1304',
            contactType: 'technical support',
            contactOption: 'TollFree',
            areaServed: ['US', 'CA'],
            availableLanguage: ['English', 'French'],
          },
        ],
      });
    });
  });
});
