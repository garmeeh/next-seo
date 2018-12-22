import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

const expectedJSONResults = 5;

describe('Validates JSON-LD For:', () => {
  it('Article', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        assertSchema(schemas)('Article', '1.0.0')(jsonLD);
      });
  });

  it('Article Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/article',
          },
          headline: 'Article headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Gary Meehan',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.example.com/photos/logo.jpg',
            },
          },
          description: 'This is a mighty good description of this article.',
        });
      });
  });

  it('Blog', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[1].innerHTML);
        assertSchema(schemas)('Blog', '1.0.0')(jsonLD);
      });
  });

  it('Blog Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[1].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Blog',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/blog',
          },
          headline: 'Blog headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          description: 'This is a mighty good description of this blog.',
        });
      });
  });

  it('Course', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[2].innerHTML);
        assertSchema(schemas)('Course', '1.0.0')(jsonLD);
      });
  });

  it('Course Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[2].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Course',
          name: 'Course Name',
          description: 'Course description goes right here',
          provider: {
            '@type': 'Organization',
            name: 'Course Provider',
            sameAs: 'https//www.example.com/provider',
          },
        });
      });
  });

  it('Product', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[3].innerHTML);
        assertSchema(schemas)('Product', '1.0.0')(jsonLD);
      });
  });

  it('Product Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[3].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org/',
          '@type': 'Product',
          name: 'Executive Anvil',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          description:
            "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
          mpn: '925872',
          brand: {
            '@type': 'Thing',
            name: 'ACME',
          },
          review: [
            {
              '@type': 'Review',
              author: 'Jim',
              datePublished: '2017-01-06T03:37:40Z',
              reviewBody:
                'This is my favorite product yet! Thanks Nate for the example products and reviews.',
              name: 'So awesome!!!',
              reviewRating: {
                '@type': 'Rating',
                bestRating: '5',
                ratingValue: '5',
                worstRating: '1',
              },
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.4',
            reviewCount: '89',
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: '119.99',
            priceValidUntil: '2020-11-05',
            itemCondition: 'http://schema.org/UsedCondition',
            availability: 'http://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Executive Objects',
            },
          },
        });
      });
  });

  it('Social Profile', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[4].innerHTML);
        assertSchema(schemas)('Social Profile', '1.0.0')(jsonLD);
      });
  });

  it('Social Profile Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[4].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Person',
          name: 'your name',
          url: 'http://www.your-site.com',
          sameAs: [
            'http://www.facebook.com/your-profile',
            'http://instagram.com/yourProfile',
            'http://www.linkedin.com/in/yourprofile',
            'http://plus.google.com/your_profile',
          ],
        });
      });
  });
});
