describe('SEO Meta No Robots', () => {
  it('App loads', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Default SEO');
  });

  it('SEO norobots', () => {
    cy.visit('http://localhost:3000/norobots');
    cy.get('head meta[name="robots"]').should('not.exist');
  });

  it('SEO overrides norobots with nofollow correctly', () => {
    cy.visit('http://localhost:3000/norobots/nofollow');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'index,nofollow',
    );
  });

  it('SEO overrides norobots with nofollow correctly', () => {
    cy.visit('http://localhost:3000/norobots/noindex');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex,follow',
    );
  });

  it('SEO overrides norobots with robots props correctly', () => {
    cy.visit('http://localhost:3000/norobots/robots');
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,noimageindex,max-video-preview:-1,notranslate',
    );
  });
});
