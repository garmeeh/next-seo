import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Movie JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/movie');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Movie', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/movie');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);

      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Movie',
        name: 'Movie Example',
        contentRating: 5,
        duration: 'PT2H30M',
        dateCreated: '2022-01-01',
        description: 'This is a movie description.',
        image: 'https://example.com/movie.jpg',
        author: { '@type': 'Person', name: 'Author Name' },
        director: { '@type': 'Person', name: 'Director Name' },
        actor: [
          {
            '@type': 'Person',
            name: 'John Doe',
            characterName: 'John Doe',
          },
          {
            '@type': 'Person',
            name: 'Jane Doe',
            characterName: 'Jane Doe',
          },
        ],
        genre: ['Action', 'Adventure'],
        offers: [
          {
            '@type': 'Offer',
            price: '12.99',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: 'https://example.com/movie',
            seller: {
              '@type': 'Organization',
              name: 'Seller Name',
            },
          },
        ],
        trailer: 'https://example.com/movie-trailer',
        countryOfOrigin: 'USA',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '44',
          reviewCount: '89',
          ratingCount: '684',
          bestRating: '100',
          worstRating: '1',
        },
        isAccessibleForFree: true,
      });
    });
  });
});
