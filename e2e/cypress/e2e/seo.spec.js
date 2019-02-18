describe('SEO Meta', () => {
  it('App loads', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Default SEO');
  });

  it('Default SEO loads correctly', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Default SEO');
    cy.get('head title').should('contain', 'Title A | Next SEO');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Description A',
    );
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      'https://www.canonical.ie/a',
    );
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'index,follow',
    );
    cy.get('head meta[name="googlebot"]').should(
      'have.attr',
      'content',
      'index,follow',
    );
    cy.get('head meta[property="og:type"]').should(
      'have.attr',
      'content',
      'website',
    );
    cy.get('head meta[property="og:locale"]').should(
      'have.attr',
      'content',
      'en_IE',
    );
    cy.get('head meta[property="og:url"]').should(
      'have.attr',
      'content',
      'https://www.url.ie/a',
    );
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'Open Graph Title A',
    );
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Open Graph Description A',
    );
    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.test.ie/og-image-a-01.jpg',
        );
        expect(tags[1].content).to.equal(
          'https://www.test.ie/og-image-a-02.jpg',
        );
        expect(tags[2].content).to.equal(
          'https://www.test.ie/og-image-a-03.jpg',
        );
        expect(tags[3].content).to.equal(
          'https://www.test.ie/og-image-a-04.jpg',
        );
      });
    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 2)
      .then(tags => {
        expect(tags[0].content).to.equal('Og Image Alt A');
        expect(tags[1].content).to.equal('Og Image Alt A Second');
      });
    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('800');
        expect(tags[1].content).to.equal('900');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('600');
        expect(tags[1].content).to.equal('800');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:site_name"]').should(
      'have.attr',
      'content',
      'SiteName A',
    );
    cy.get('head meta[property="fb:app_id"]').should(
      'have.attr',
      'content',
      '1234567890',
    );
    cy.get('head meta[name="twitter:site"]').should(
      'have.attr',
      'content',
      '@sitea',
    );
    cy.get('head meta[name="twitter:creator"]').should(
      'have.attr',
      'content',
      '@handlea',
    );
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary_large_image',
    );
  });

  it('SEO overrides apply correctly', () => {
    cy.visit('http://localhost:3000/overridden');
    cy.get('h1').should('contain', 'Overridden Seo');
    cy.get('head title').should('contain', 'Title B | Next SEO');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Description B',
    );
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      'https://www.canonical.ie/b',
    );
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
    cy.get('head meta[property="og:type"]').should(
      'have.attr',
      'content',
      'website',
    );
    cy.get('head meta[property="og:locale"]').should(
      'have.attr',
      'content',
      'en_IE',
    );
    cy.get('head meta[property="og:url"]').should(
      'have.attr',
      'content',
      'https://www.url.ie/b',
    );
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'Open Graph Title B',
    );
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Open Graph Description B',
    );

    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.test.ie/og-image-b-01.jpg',
        );
        expect(tags[1].content).to.equal(
          'https://www.test.ie/og-image-b-02.jpg',
        );
        expect(tags[2].content).to.equal(
          'https://www.test.ie/og-image-b-03.jpg',
        );
        expect(tags[3].content).to.equal(
          'https://www.test.ie/og-image-b-04.jpg',
        );
      });

    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 2)
      .then(tags => {
        expect(tags[0].content).to.equal('Og Image Alt B');
        expect(tags[1].content).to.equal('Og Image Alt B Second');
      });

    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('850');
        expect(tags[1].content).to.equal('950');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });

    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('650');
        expect(tags[1].content).to.equal('850');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:site_name"]').should(
      'have.attr',
      'content',
      'SiteName B',
    );
    cy.get('head meta[property="fb:app_id"]').should(
      'have.attr',
      'content',
      '987654321',
    );
    cy.get('head meta[name="twitter:site"]').should(
      'have.attr',
      'content',
      '@siteb',
    );
    cy.get('head meta[name="twitter:creator"]').should(
      'have.attr',
      'content',
      '@handleb',
    );
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary_large_image',
    );
  });

  it('Title template updates correctly', () => {
    cy.visit('http://localhost:3000/updated-title-template');
    cy.get('h1').should('contain', 'Updated Title Template');
    cy.get('head title').should('contain', 'Next SEO | Title C');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Description A',
    );
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      'https://www.canonical.ie/a',
    );
    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'index,follow',
    );
    cy.get('head meta[name="googlebot"]').should(
      'have.attr',
      'content',
      'index,follow',
    );
    cy.get('head meta[property="og:type"]').should(
      'have.attr',
      'content',
      'website',
    );
    cy.get('head meta[property="og:locale"]').should(
      'have.attr',
      'content',
      'en_IE',
    );
    cy.get('head meta[property="og:url"]').should(
      'have.attr',
      'content',
      'https://www.url.ie/a',
    );
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'Open Graph Title A',
    );
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Open Graph Description A',
    );
    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.test.ie/og-image-a-01.jpg',
        );
        expect(tags[1].content).to.equal(
          'https://www.test.ie/og-image-a-02.jpg',
        );
        expect(tags[2].content).to.equal(
          'https://www.test.ie/og-image-a-03.jpg',
        );
        expect(tags[3].content).to.equal(
          'https://www.test.ie/og-image-a-04.jpg',
        );
      });
    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 2)
      .then(tags => {
        expect(tags[0].content).to.equal('Og Image Alt A');
        expect(tags[1].content).to.equal('Og Image Alt A Second');
      });
    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('800');
        expect(tags[1].content).to.equal('900');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('600');
        expect(tags[1].content).to.equal('800');
        expect(tags[2].content).to.equal('1200');
        expect(tags[3].content).to.equal('1200');
      });
    cy.get('head meta[property="og:site_name"]').should(
      'have.attr',
      'content',
      'SiteName A',
    );
    cy.get('head meta[name="twitter:site"]').should(
      'have.attr',
      'content',
      '@sitea',
    );
    cy.get('head meta[name="twitter:creator"]').should(
      'have.attr',
      'content',
      '@handlea',
    );
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary_large_image',
    );
  });

  it('Profile SEO loads correctly', () => {
    cy.visit('http://localhost:3000/profile');
    cy.get('h1').should('contain', 'Profile Page SEO');
    cy.get('head title').should('contain', 'Profile Page Title | Next SEO');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Description of profile page',
    );
    cy.get('head meta[property="og:type"]').should(
      'have.attr',
      'content',
      'profile',
    );
    cy.get('head meta[property="profile:first_name"]').should(
      'have.attr',
      'content',
      'First',
    );
    cy.get('head meta[property="profile:last_name"]').should(
      'have.attr',
      'content',
      'Last',
    );
    cy.get('head meta[property="profile:username"]').should(
      'have.attr',
      'content',
      'firstlast123',
    );
    cy.get('head meta[property="profile:gender"]').should(
      'have.attr',
      'content',
      'male',
    );
    cy.get('head meta[property="og:url"]').should(
      'have.attr',
      'content',
      'https://www.example.com/@firstlast123',
    );
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'Open Graph Profile Title',
    );
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Description of open graph profile',
    );
    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.test.ie/og-image-firstlast123-01.jpg',
        );
        expect(tags[1].content).to.equal(
          'https://www.test.ie/og-image-firstlast123-02.jpg',
        );
        expect(tags[2].content).to.equal(
          'https://www.test.ie/og-image-firstlast123-03.jpg',
        );
        expect(tags[3].content).to.equal(
          'https://www.test.ie/og-image-firstlast123-04.jpg',
        );
      });
    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('Og Image Alt firstlast123 A');
        expect(tags[1].content).to.equal('Og Image Alt firstlast123 B');
        expect(tags[2].content).to.equal('Og Image Alt firstlast123 C');
        expect(tags[3].content).to.equal('Og Image Alt firstlast123 D');
      });
    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('850');
        expect(tags[1].content).to.equal('950');
        expect(tags[2].content).to.equal('600');
        expect(tags[3].content).to.equal('400');
      });
    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('650');
        expect(tags[1].content).to.equal('850');
        expect(tags[2].content).to.equal('400');
        expect(tags[3].content).to.equal('400');
      });
    cy.get('head meta[property="og:site_name"]').should(
      'have.attr',
      'content',
      'SiteName',
    );
    cy.get('head meta[name="twitter:site"]').should(
      'have.attr',
      'content',
      '@site',
    );
    cy.get('head meta[name="twitter:creator"]').should(
      'have.attr',
      'content',
      '@handle',
    );
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary_large_image',
    );
  });

  it('Article SEO loads correctly', () => {
    cy.visit('http://localhost:3000/article');
    cy.get('h1').should('contain', 'Article Page SEO');
    cy.get('head title').should('contain', 'Article Page Title | Next SEO');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Description of article page',
    );
    cy.get('head meta[property="og:type"]').should(
      'have.attr',
      'content',
      'article',
    );
    cy.get('head meta[property="article:published_time"]').should(
      'have.attr',
      'content',
      '2017-06-21T23:04:13Z',
    );
    cy.get('head meta[property="article:modified_time"]').should(
      'have.attr',
      'content',
      '2018-01-21T18:04:43Z',
    );
    cy.get('head meta[property="article:expiration_time"]').should(
      'have.attr',
      'content',
      '2022-12-21T22:04:11Z',
    );
    cy.get('head meta[property="article:author"]')
      .should('have.length', 2)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.example.com/authors/@firstnameA-lastnameA',
        );
        expect(tags[1].content).to.equal(
          'https://www.example.com/authors/@firstnameB-lastnameB',
        );
      });
    cy.get('head meta[property="article:section"]').should(
      'have.attr',
      'content',
      'Section II',
    );
    cy.get('head meta[property="article:tag"]')
      .should('have.length', 3)
      .then(tags => {
        expect(tags[0].content).to.equal('Tag A');
        expect(tags[1].content).to.equal('Tag B');
        expect(tags[2].content).to.equal('Tag C');
      });
    cy.get('head meta[property="og:url"]').should(
      'have.attr',
      'content',
      'https://www.example.com/articles/article-title',
    );
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'Open Graph Article Title',
    );
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Description of open graph article',
    );
    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.test.ie/og-image-article-title-01.jpg',
        );
        expect(tags[1].content).to.equal(
          'https://www.test.ie/og-image-article-title-02.jpg',
        );
        expect(tags[2].content).to.equal(
          'https://www.test.ie/og-image-article-title-03.jpg',
        );
        expect(tags[3].content).to.equal(
          'https://www.test.ie/og-image-article-title-04.jpg',
        );
      });
    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('Og Image Alt Article Title A');
        expect(tags[1].content).to.equal('Og Image Alt Article Title B');
        expect(tags[2].content).to.equal('Og Image Alt Article Title C');
        expect(tags[3].content).to.equal('Og Image Alt Article Title D');
      });
    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('850');
        expect(tags[1].content).to.equal('950');
        expect(tags[2].content).to.equal('600');
        expect(tags[3].content).to.equal('400');
      });
    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('650');
        expect(tags[1].content).to.equal('850');
        expect(tags[2].content).to.equal('400');
        expect(tags[3].content).to.equal('400');
      });
    cy.get('head meta[property="og:site_name"]').should(
      'have.attr',
      'content',
      'SiteName',
    );
    cy.get('head meta[name="twitter:site"]').should(
      'have.attr',
      'content',
      '@site',
    );
    cy.get('head meta[name="twitter:creator"]').should(
      'have.attr',
      'content',
      '@handle',
    );
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary_large_image',
    );
  });

  it('Book SEO loads correctly', () => {
    cy.visit('http://localhost:3000/book');
    cy.get('h1').should('contain', 'Book Page SEO');
    cy.get('head title').should('contain', 'Book Page Title | Next SEO');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Description of book page',
    );
    cy.get('head meta[property="og:type"]').should(
      'have.attr',
      'content',
      'book',
    );
    cy.get('head meta[property="book:release_date"]').should(
      'have.attr',
      'content',
      '2018-09-17T11:08:13Z',
    );
    cy.get('head meta[property="book:author"]')
      .should('have.length', 2)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.example.com/authors/@firstnameA-lastnameA',
        );
        expect(tags[1].content).to.equal(
          'https://www.example.com/authors/@firstnameB-lastnameB',
        );
      });
    cy.get('head meta[property="book:isbn"]').should(
      'have.attr',
      'content',
      '978-3-16-148410-0',
    );
    cy.get('head meta[property="book:tag"]')
      .should('have.length', 3)
      .then(tags => {
        expect(tags[0].content).to.equal('Tag A');
        expect(tags[1].content).to.equal('Tag B');
        expect(tags[2].content).to.equal('Tag C');
      });
    cy.get('head meta[property="og:url"]').should(
      'have.attr',
      'content',
      'https://www.example.com/books/book-title',
    );
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'Open Graph Book Title',
    );
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Description of open graph book',
    );
    cy.get('head meta[property="og:image"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal(
          'https://www.test.ie/og-image-book-title-01.jpg',
        );
        expect(tags[1].content).to.equal(
          'https://www.test.ie/og-image-book-title-02.jpg',
        );
        expect(tags[2].content).to.equal(
          'https://www.test.ie/og-image-book-title-03.jpg',
        );
        expect(tags[3].content).to.equal(
          'https://www.test.ie/og-image-book-title-04.jpg',
        );
      });
    cy.get('head meta[property="og:image:alt"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('Og Image Alt Book Title A');
        expect(tags[1].content).to.equal('Og Image Alt Book Title B');
        expect(tags[2].content).to.equal('Og Image Alt Book Title C');
        expect(tags[3].content).to.equal('Og Image Alt Book Title D');
      });
    cy.get('head meta[property="og:image:width"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('850');
        expect(tags[1].content).to.equal('950');
        expect(tags[2].content).to.equal('600');
        expect(tags[3].content).to.equal('400');
      });
    cy.get('head meta[property="og:image:height"]')
      .should('have.length', 4)
      .then(tags => {
        expect(tags[0].content).to.equal('650');
        expect(tags[1].content).to.equal('850');
        expect(tags[2].content).to.equal('400');
        expect(tags[3].content).to.equal('400');
      });
    cy.get('head meta[property="og:site_name"]').should(
      'have.attr',
      'content',
      'SiteName',
    );
    cy.get('head meta[name="twitter:site"]').should(
      'have.attr',
      'content',
      '@site',
    );
    cy.get('head meta[name="twitter:creator"]').should(
      'have.attr',
      'content',
      '@handle',
    );
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary_large_image',
    );
  });
});
