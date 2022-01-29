import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Course JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/course');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Course', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/course');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Course Name',
        description: 'Introductory CS course laying out the basics.',
        provider: {
          '@type': 'Organization',
          name: 'Course Provider',
          sameAs: 'https//www.example.com/provider',
        },
      });
    });
  });
});
