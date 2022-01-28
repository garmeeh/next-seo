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

  it('SEO dangerouslySetAllPagesToNoFollow and dangerouslySetAllPagesToNoIndex', () => {
    cy.visit('http://localhost:3000/dangerously/nofollow-and-noindex');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex,nofollow',
    );
  });
});
