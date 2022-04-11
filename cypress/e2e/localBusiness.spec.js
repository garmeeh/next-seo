import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Local Business JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/localBusiness');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Local Business', '1.3.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/localBusiness');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Store',
        '@id': 'http://davesdeptstore.example.com',
        name: 'Dave&apos;s Department Store',
        description:
          'Dave&apos;s latest department store in San Jose, now open',
        url: 'http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427',
        telephone: '+14088717984',
        sameAs: ['https://thisbusiness.com', 'https://alsothisbusiness.com'],
        image: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1600 Saratoga Ave',
          addressLocality: 'San Jose',
          addressRegion: 'CA',
          postalCode: '95129',
          addressCountry: 'US',
        },
        geo: {
          latitude: '37.293058',
          longitude: '-121.988331',
          '@type': 'GeoCoordinates',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingCount: '2',
          ratingValue: '4.5',
        },
        review: [
          {
            datePublished: '2006-05-04',
            name: 'A masterpiece of literature',
            reviewBody:
              'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.',
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'John Doe',
            },
            reviewRating: {
              bestRating: '5',
              worstRating: '1',
              reviewAspect: 'Ambiance',
              ratingValue: '4',
              '@type': 'Rating',
            },
          },
          {
            datePublished: '2006-06-15',
            name: 'A good read.',
            reviewBody:
              'Catcher in the Rye is a fun book. It&apos;s a good book to read.',
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Bob Smith',
            },
            reviewRating: {
              ratingValue: '4',
              '@type': 'Rating',
            },
          },
        ],
        potentialAction: {
          '@type': 'ReviewAction',
          name: 'potentialAction',
          target: 'https://www.example.com/review/this/business',
        },
        areaServed: [
          {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: '41.108237',
              longitude: '-80.642982',
            },
            geoRadius: '1000',
          },
          {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: '51.108237',
              longitude: '-80.642982',
            },
            geoRadius: '1000',
          },
        ],
        makesOffer: [
          {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              priceCurrency: 'EUR',
              price: '1000-10000',
            },
            itemOffered: {
              name: 'Motion Design Services',
              description:
                'We are the expert of animation and motion design productions.',
              '@type': 'Service',
            },
            '@type': 'Offer',
          },
          {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              priceCurrency: 'EUR',
              price: '2000-10000',
            },
            itemOffered: {
              name: 'Branding Services',
              description:
                'Real footage is a powerful tool when it comes to show what the business is about. Can be used to present your company, show your factory, promote a product packshot, or just tell any story. It can help create emotional links with your audience by showing punchy images.',
              '@type': 'Service',
            },
            '@type': 'Offer',
          },
        ],
        openingHoursSpecification: [
          {
            opens: '08:00',
            closes: '23:59',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            validFrom: '2019-12-23',
            validThrough: '2020-04-02',
            '@type': 'OpeningHoursSpecification',
          },
          {
            opens: '14:00',
            closes: '20:00',
            dayOfWeek: 'Sunday',
            validFrom: '2019-12-23',
            validThrough: '2020-04-02',
            '@type': 'OpeningHoursSpecification',
          },
        ],
      });
    });
  });
});
