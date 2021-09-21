describe('SEO Meta Dangerously', () => {
  it('App loads', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Default SEO');
  });

  it('SEO dangerouslyDisableGooglebot disable googlebot tags correctly', () => {
    cy.visit('http://localhost:3000/dangerously/disable-googlebot');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'index,follow',
    );
    cy.get('head meta[name="googlebot"]').should('not.exist');
  });

  it('SEO dangerouslyDisableGooglebot works with noindex and nofollow', () => {
    cy.visit(
      'http://localhost:3000/dangerously/disable-googlebot-nofollow-and-noindex',
    );
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex,nofollow',
    );
    cy.get('head meta[name="googlebot"]').should('not.exist');
  });

  it('SEO dangerouslySetAllPagesToNoIndex', () => {
    cy.visit('http://localhost:3000/dangerously/noindex');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex,follow',
    );
    cy.get('head meta[name="googlebot"]').should(
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
    cy.get('head meta[name="googlebot"]').should(
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
    cy.get('head meta[name="googlebot"]').should(
      'have.attr',
      'content',
      'noindex,nofollow',
    );
  });
});
