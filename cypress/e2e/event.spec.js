import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Event JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/event');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Event', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/event');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'My Event',
        startDate: '2020-01-23T00:00:00.000Z',
        endDate: '2020-01-24T00:00:00.000Z',
        url: 'https://example.com/my-event',
        location: {
          '@type': 'Place',
          name: 'My Place',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1600 Saratoga Ave',
            addressLocality: 'San Jose',
            addressRegion: 'CA',
            postalCode: '95129',
            addressCountry: 'US',
          },
          sameAs: 'https://example.com/my-place',
        },
        image: ['https://example.com/photos/photo.jpg'],
        description: 'My event @ my place',
        offers: [
          {
            '@type': 'Offer',
            price: '119.99',
            priceCurrency: 'USD',
            priceValidUntil: '2020-11-05',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.com/offer',
            seller: {
              '@type': 'Organization',
              name: 'John Doe',
            },
            validFrom: '2020-11-01T00:00:00.000Z',
          },
          {
            '@type': 'Offer',
            price: '139.99',
            priceCurrency: 'CAD',
            priceValidUntil: '2020-09-05',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.ca/other-offer',
            seller: {
              '@type': 'Organization',
              name: 'John Doe sr.',
            },
            validFrom: '2020-08-05T00:00:00.000Z',
          },
        ],
        performer: [
          {
            '@type': 'PerformingGroup',
            name: 'Adele',
          },
          {
            '@type': 'PerformingGroup',
            name: 'Kira and Morrison',
          },
        ],
        organizer: {
          '@type': 'Organization',
          name: 'Unnamed organization',
          url: 'https://www.unnamed.com',
        },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      });
    });
  });
});
