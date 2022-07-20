import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Event JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/virtualEvent');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Event', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/virtualEvent');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Virtual Event',
        startDate: '2020-01-23T00:00:00.000Z',
        endDate: '2020-01-24T00:00:00.000Z',
        url: 'https://example.com/virtual-event',
        description: 'Virtual event @ A Livestream Platform',
        location: {
          name: 'A Livestream Platform',
          sameAs: 'https://example.com/another-virtual-event',
          url: 'https://example.com/virtual-event/watch',
          '@type': 'VirtualLocation',
        },
        image: ['https://example.com/photos/photo.jpg'],
        performer: [
          {
            name: 'Adele',
            '@type': 'PerformingGroup',
          },
          {
            name: 'Kira and Morrison',
            '@type': 'PerformingGroup',
          },
        ],
        organizer: {
          '@type': 'Organization',
          name: 'Unnamed organization',
          url: 'https://www.unnamed.com',
        },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      });
    });
  });
});
