import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('DataSet JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/dataset');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Dataset', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/dataset');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        description: 'The description needs to be at least 50 characters long',
        name: 'name of the dataset',
        license: 'https//www.example.com',
      });
    });
  });
});
