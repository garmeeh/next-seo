import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Product JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/product');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Product', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/product');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Product',
        description:
          'Sleeker than ACME&apos;s Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.',
        color: 'blue',
        material: 'steel',
        slogan:
          'For the business traveller looking for something to drop from a height.',
        disambiguatingDescription:
          'Executive Anvil, perfect for the business traveller.',
        releaseDate: '2014-02-05T08:00:00+08:00',
        productionDate: '2015-02-05T08:00:00+08:00',
        purchaseDate: '2015-02-06T08:00:00+08:00',
        award: 'Best Executive Anvil Award.',
        mpn: '925872',
        image: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        brand: {
          '@type': 'Brand',
          name: 'ACME',
        },
        review: [
          {
            datePublished: '2017-01-06T03:37:40Z',
            reviewBody:
              'This is my favorite product yet! Thanks Nate for the example products and reviews.',
            name: 'So awesome!!!',
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Jim',
            },
            reviewRating: {
              bestRating: '5',
              ratingValue: '5',
              worstRating: '1',
              '@type': 'Rating',
            },
            publisher: {
              '@type': 'Organization',
              name: 'TwoVit',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingCount: '684',
          reviewCount: '89',
          bestRating: '100',
          ratingValue: '44',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Gary Meehan',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.example.com/photos/logo.jpg',
          },
        },
        offers: [
          {
            price: '119.99',
            priceCurrency: 'USD',
            priceValidUntil: '2020-11-05',
            itemCondition: 'https://schema.org/UsedCondition',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.com/executive-anvil',
            '@type': 'Offer',
            seller: {
              '@type': 'Organization',
              name: 'Executive Objects',
            },
          },
          {
            price: '139.99',
            priceCurrency: 'CAD',
            priceValidUntil: '2020-09-05',
            itemCondition: 'https://schema.org/UsedCondition',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.ca/executive-anvil',
            '@type': 'Offer',
            seller: {
              '@type': 'Organization',
              name: 'Executive Objects',
            },
          },
        ],
        name: 'Executive Anvil',
      });
    });
  });

  it('AggregateOffer and Offers', () => {
    cy.visit('http://localhost:3000/product-jsonld/aggregateOfferAndOffers');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Executive Anvil',
          offers: [
            {
              '@type': 'Offer',
              price: '119.99',
              priceCurrency: 'USD',
              priceValidUntil: '2020-11-05',
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              url: 'https://www.example.com/executive-anvil',
              seller: {
                '@type': 'Organization',
                name: 'Executive Objects',
              },
            },
            {
              '@type': 'Offer',
              price: '139.99',
              priceCurrency: 'CAD',
              priceValidUntil: '2020-09-05',
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              url: 'https://www.example.ca/executive-anvil',
              seller: {
                '@type': 'Organization',
                name: 'Executive Objects',
              },
            },
          ],
        });
      });
  });

  it('AggregateOffer', () => {
    cy.visit('http://localhost:3000/product-jsonld/aggregateOffer');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Executive Anvil',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '119.99',
            highPrice: '139.99',
            offerCount: '5',
            offers: [
              {
                '@type': 'Offer',
                price: '119.99',
                priceCurrency: 'USD',
                priceValidUntil: '2020-11-05',
                itemCondition: 'https://schema.org/UsedCondition',
                availability: 'https://schema.org/InStock',
                url: 'https://www.example.com/executive-anvil',
                seller: {
                  '@type': 'Organization',
                  name: 'Executive Objects',
                },
              },
              {
                '@type': 'Offer',
                price: '139.99',
                priceCurrency: 'CAD',
                priceValidUntil: '2020-09-05',
                itemCondition: 'https://schema.org/UsedCondition',
                availability: 'https://schema.org/InStock',
                url: 'https://www.example.ca/executive-anvil',
                seller: {
                  '@type': 'Organization',
                  name: 'Executive Objects',
                },
              },
            ],
          },
        });
      });
  });

  it('AggregateOffer (single)', () => {
    cy.visit('http://localhost:3000/product-jsonld/aggregateOffer2');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Executive Anvil',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '119.99',
            highPrice: '139.99',
            offerCount: '5',
            offers: {
              '@type': 'Offer',
              price: '119.99',
              priceCurrency: 'USD',
              priceValidUntil: '2020-11-05',
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              url: 'https://www.example.com/executive-anvil',
              seller: {
                '@type': 'Organization',
                name: 'Executive Objects',
              },
            },
          },
        });
      });
  });

  it('Offers', () => {
    cy.visit('http://localhost:3000/product-jsonld/offers');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Executive Anvil',
          offers: [
            {
              '@type': 'Offer',
              price: '119.99',
              priceCurrency: 'USD',
              priceValidUntil: '2020-11-05',
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              url: 'https://www.example.com/executive-anvil',
              seller: {
                '@type': 'Organization',
                name: 'Executive Objects',
              },
            },
            {
              '@type': 'Offer',
              price: '139.99',
              priceCurrency: 'CAD',
              priceValidUntil: '2020-09-05',
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              url: 'https://www.example.ca/executive-anvil',
              seller: {
                '@type': 'Organization',
                name: 'Executive Objects',
              },
            },
          ],
        });
      });
  });
});
