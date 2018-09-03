import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

const expectedJSONResults = 3;

describe('Validates JSON-LD For:', () => {
  it('Article', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then((tags) => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        assertSchema(schemas)('Article', '1.0.0')(jsonLD);
      });
  });

  it('Blog', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then((tags) => {
        const jsonLD = JSON.parse(tags[1].innerHTML);
        assertSchema(schemas)('Blog', '1.0.0')(jsonLD);
      });
  });

  it('Course', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then((tags) => {
        const jsonLD = JSON.parse(tags[2].innerHTML);
        assertSchema(schemas)('Course', '1.0.0')(jsonLD);
      });
  });
});
