import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('VideoGame JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/videoGame');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('VideoGame', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/videoGame');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);

      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: 'Red Dead Redemption 2',
        translator: ['Translator 1', 'Translator 2'],
        inLanguage: ['English', 'Kurdish'],
        description:
          'Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.',
        processorRequirements: '4 GHz',
        memoryRequirements: '16 Gb',
        playMode: 'SinglePlayer',
        applicationCategory: 'Game',
        url: 'https://example.com/rdr2-game',
        gamePlatform: ['PC game', 'PlayStation 4'],
        operatingSystem: 'windows',
        keywords: 'outlaw, gang, federal agents',
        datePublished: '2019-02-05T08:00:00+08:00',
        image: {
          '@type': 'ImageObject',
          url: 'https://example.com/photos/1x1/photo.jpg',
        },
        publisher: 'Vertical Games',
        producer: {
          '@type': 'Organization',
          name: 'Rockstar Games',
          sameAs: 'https//www.example.com/producer',
        },
        offers: [
          {
            '@type': 'Offer',
            price: '119.99',
            priceCurrency: 'USD',
            priceValidUntil: '2020-11-05',
            availability: 'https://schema.org/InStock',
            url: 'https://example.net/rdr2-game',
            seller: {
              '@type': 'Organization',
              name: 'Executive Gaming',
            },
          },
          {
            '@type': 'Offer',
            price: '139.99',
            priceCurrency: 'CAD',
            priceValidUntil: '2020-09-05',
            availability: 'https://schema.org/InStock',
            url: 'https://example.org/rdr2-game',
            seller: {
              '@type': 'Organization',
              name: 'Executive Gaming',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '44',
          reviewCount: '89',
          ratingCount: '684',
          bestRating: '100',
        },
        review: [
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'AhmetKaya',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Gam Production',
            },
            datePublished: '2017-01-06T03:37:40Z',
            reviewBody: 'Iki gozum.',
            name: 'Rica ederim.',
            reviewRating: {
              '@type': 'Rating',
              bestRating: '5',
              ratingValue: '5',
              worstRating: '1',
            },
          },
        ],
      });
    });
  });
});
