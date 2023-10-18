import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Park JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/park');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      console.log('jsonLD', jsonLD);
      assertSchema(schemas)('Park', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/park');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Park',
        '@id': 'https://www.example.com/park/minnewaska-state-park',
        name: 'Minnewaska State Park',
        description: 'Description about Minnewaska State Park',
        url: 'https://www.example.com/park',
        telephone: '+18452550752',
        image: ['https://example.com/photos/1x1/photo.jpg'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '5281 Route 44-55',
          addressLocality: 'Kerhonkson',
          addressRegion: 'NY',
          postalCode: '12446',
          addressCountry: 'US',
        },
        geo: {
          latitude: '41.735149',
          longitude: '-74.239037',
          '@type': 'GeoCoordinates',
        },
        openingHoursSpecification: [
          {
            opens: '09:00',
            closes: '18:00',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            validFrom: '2019-12-23',
            validThrough: '2020-04-02',
            '@type': 'OpeningHoursSpecification',
          },
        ],
      });
    });
  });
});
