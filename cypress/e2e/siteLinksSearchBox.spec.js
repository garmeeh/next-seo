import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('SiteLinksSearchBox JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/siteLinksSearchBox');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Sitelinks Search Box', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/siteLinksSearchBox');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: 'https://example.com',
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: 'https://query.example.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          {
            '@type': 'SearchAction',
            target:
              'android-app://com.example/https/query.example.com/search/?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        ],
      });
    });
  });
});
