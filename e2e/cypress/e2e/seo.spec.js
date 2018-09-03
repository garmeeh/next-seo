describe('SEO Meta', () => {
  it('App loads', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Default SEO');
  });

  it('Default SEO loads correctly', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Default SEO');
    cy.get('head title').should('contain', 'Title A | Next SEO');
    cy.get('head meta[name="description"]').should('have.attr', 'content', 'Description A');
    cy.get('head link[rel="canonical"]').should('have.attr', 'href', 'https://www.canonical.ie/a');
    cy.get('head meta[name="robots"]').should('have.attr', 'content', 'index,follow');
    cy.get('head meta[name="googlebot"]').should('have.attr', 'content', 'index,follow');
    cy.get('head meta[property="og:type"]').should('have.attr', 'content', 'website');
    cy.get('head meta[property="og:locale"]').should('have.attr', 'content', 'en_IE');
    cy.get('head meta[property="og:url"]').should('have.attr', 'content', 'https://www.url.ie/a');
    cy.get('head meta[property="og:title"]').should('have.attr', 'content', 'Open Graph Title A');
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Open Graph Description A',
    );
    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('https://www.test.ie/og-image-a-01.jpg');
        expect(tags[1].content).to.equal('https://www.test.ie/og-image-a-02.jpg');
        expect(tags[2].content).to.equal('https://www.test.ie/og-image-a-03.jpg');
        expect(tags[3].content).to.equal('https://www.test.ie/og-image-a-04.jpg');
      });
    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 2)
      .then((tags) => {
        expect(tags[0].content).to.equal('Og Image Alt A');
        expect(tags[1].content).to.equal('Og Image Alt A Second');
      });
    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('800');
        expect(tags[1].content).to.equal('900');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('600');
        expect(tags[1].content).to.equal('800');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', 'SiteName A');
    cy.get('head meta[name="twitter:site"]').should('have.attr', 'content', '@sitea');
    cy.get('head meta[name="twitter:creator"]').should('have.attr', 'content', '@handlea');
    cy.get('head meta[name="twitter:card"]').should('have.attr', 'content', 'summary_large_image');
  });

  it('SEO overrides apply correctly', () => {
    cy.visit('http://localhost:3000/overridden');
    cy.get('h1').should('contain', 'Overridden Seo');
    cy.get('head title').should('contain', 'Title B | Next SEO');
    cy.get('head meta[name="description"]').should('have.attr', 'content', 'Description B');
    cy.get('head link[rel="canonical"]').should('have.attr', 'href', 'https://www.canonical.ie/b');
    cy.get('head meta[name="robots"]').should('have.attr', 'content', 'index,follow');
    cy.get('head meta[name="googlebot"]').should('have.attr', 'content', 'index,follow');
    cy.get('head meta[property="og:type"]').should('have.attr', 'content', 'website');
    cy.get('head meta[property="og:locale"]').should('have.attr', 'content', 'en_IE');
    cy.get('head meta[property="og:url"]').should('have.attr', 'content', 'https://www.url.ie/b');
    cy.get('head meta[property="og:title"]').should('have.attr', 'content', 'Open Graph Title B');
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Open Graph Description B',
    );

    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('https://www.test.ie/og-image-b-01.jpg');
        expect(tags[1].content).to.equal('https://www.test.ie/og-image-b-02.jpg');
        expect(tags[2].content).to.equal('https://www.test.ie/og-image-b-03.jpg');
        expect(tags[3].content).to.equal('https://www.test.ie/og-image-b-04.jpg');
      });

    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 2)
      .then((tags) => {
        expect(tags[0].content).to.equal('Og Image Alt B');
        expect(tags[1].content).to.equal('Og Image Alt B Second');
      });

    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('850');
        expect(tags[1].content).to.equal('950');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });

    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('650');
        expect(tags[1].content).to.equal('850');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', 'SiteName B');
    cy.get('head meta[name="twitter:site"]').should('have.attr', 'content', '@siteb');
    cy.get('head meta[name="twitter:creator"]').should('have.attr', 'content', '@handleb');
    cy.get('head meta[name="twitter:card"]').should('have.attr', 'content', 'summary_large_image');
  });

  it('Title template updates correctly', () => {
    cy.visit('http://localhost:3000/updated-title-template');
    cy.get('h1').should('contain', 'Updated Title Template');
    cy.get('head title').should('contain', 'Next SEO | Title C');
    cy.get('head meta[name="description"]').should('have.attr', 'content', 'Description A');
    cy.get('head link[rel="canonical"]').should('have.attr', 'href', 'https://www.canonical.ie/a');
    cy.get('head meta[name="robots"]').should('have.attr', 'content', 'index,follow');
    cy.get('head meta[name="googlebot"]').should('have.attr', 'content', 'index,follow');
    cy.get('head meta[property="og:type"]').should('have.attr', 'content', 'website');
    cy.get('head meta[property="og:locale"]').should('have.attr', 'content', 'en_IE');
    cy.get('head meta[property="og:url"]').should('have.attr', 'content', 'https://www.url.ie/a');
    cy.get('head meta[property="og:title"]').should('have.attr', 'content', 'Open Graph Title A');
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Open Graph Description A',
    );
    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('https://www.test.ie/og-image-a-01.jpg');
        expect(tags[1].content).to.equal('https://www.test.ie/og-image-a-02.jpg');
        expect(tags[2].content).to.equal('https://www.test.ie/og-image-a-03.jpg');
        expect(tags[3].content).to.equal('https://www.test.ie/og-image-a-04.jpg');
      });
    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 2)
      .then((tags) => {
        expect(tags[0].content).to.equal('Og Image Alt A');
        expect(tags[1].content).to.equal('Og Image Alt A Second');
      });
    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('800');
        expect(tags[1].content).to.equal('900');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then((tags) => {
        expect(tags[0].content).to.equal('600');
        expect(tags[1].content).to.equal('800');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', 'SiteName A');
    cy.get('head meta[name="twitter:site"]').should('have.attr', 'content', '@sitea');
    cy.get('head meta[name="twitter:creator"]').should('have.attr', 'content', '@handlea');
    cy.get('head meta[name="twitter:card"]').should('have.attr', 'content', 'summary_large_image');
  });
});
