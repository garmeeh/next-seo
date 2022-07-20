import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('ProfilePage JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/profilePage');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('ProfilePage', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/profilePage');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        lastReviewed: '2014-10-01T19:30',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': 'https://example.com/books',
                name: 'Books',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': 'https://example.com/books/authors',
                name: 'Authors',
              },
            },
          ],
        },
      });
    });
  });
});
