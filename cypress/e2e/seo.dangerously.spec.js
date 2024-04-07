describe('SEO Meta Dangerously', () => {
  it('App loads', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Default SEO');
  });

  it('SEO dangerouslySetAllPagesToNoIndex', () => {
    cy.visit('http://localhost:3000/dangerously/noindex');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex,follow',
    );
  });

  it('SEO dangerouslySetAllPagesToNoFollow', () => {
    cy.visit('http://localhost:3000/dangerously/nofollow');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'index,nofollow',
    );
  });

  it('SEO dangerouslySetAllPagesToNoRobots', () => {
    cy.visit('http://localhost:3000/dangerously/norobots');
    cy.get('head meta[name="robots"]').should('not.exist');
  });

  it('SEO dangerouslySetAllPagesToNoFollow and dangerouslySetAllPagesToNoIndex', () => {
    cy.visit('http://localhost:3000/dangerously/nofollow-and-noindex');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex,nofollow',
    );
  });

  it('SEO dangerouslySetAllPagesToNoFollow and dangerouslySetAllPagesToNoIndex and dangerouslySetAllPagesToNoRobots', () => {
    cy.visit(
      'http://localhost:3000/dangerously/nofollow-and-noindex-and-norobots',
    );
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex,nofollow',
    );
  });
});
