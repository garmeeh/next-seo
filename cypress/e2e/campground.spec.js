import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Campground JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/campground');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      console.log('jsonLD', jsonLD);
      assertSchema(schemas)('Campground', '1.0.0')(jsonLD);
    });
  });

  it('renders with one amenity feature', () => {
    cy.visit('http://localhost:3000/jsonld/campground');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Campground',
        '@id': 'https://www.example.com/campground/rip-van-winkle-campground',
        name: 'Rip Van Winkle Campgrounds',
        description: 'Description about Rip Van Winkle Campgrounds',
        url: 'https://www.example.com/campground',
        telephone: '+18452468114',
        image: ['https://example.com/photos/1x1/photo.jpg'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '149 Blue Mountain Rd',
          addressLocality: 'Saugerties',
          addressRegion: 'NY',
          postalCode: '12477',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '42.092599',
          longitude: '-74.018580',
        },
        openingHoursSpecification: [
          {
            opens: '09:00',
            closes: '17:00',
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
        petsAllowed: true,
        aggregateRating: {
          ratingValue: '5',
          ratingCount: '18',
          '@type': 'AggregateRating',
        },
        amenityFeature: {
          '@type': 'LocationFeatureSpecification',
          name: 'Showers',
          value: true,
        },
        priceRange: '$$',
      });
    });
  });

  it('renders with multiple amenity features', () => {
    cy.visit('http://localhost:3000/jsonld/campground/multipleAmenityFeatures');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Campground',
        '@id': 'https://www.example.com/campground/rip-van-winkle-campground',
        name: 'Rip Van Winkle Campgrounds',
        description: 'Description about Rip Van Winkle Campgrounds',
        url: 'https://www.example.com/campground',
        telephone: '+18452468114',
        image: ['https://example.com/photos/1x1/photo.jpg'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '149 Blue Mountain Rd',
          addressLocality: 'Saugerties',
          addressRegion: 'NY',
          postalCode: '12477',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '42.092599',
          longitude: '-74.018580',
        },
        openingHoursSpecification: [
          {
            opens: '09:00',
            closes: '17:00',
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
        petsAllowed: true,
        aggregateRating: {
          ratingValue: '5',
          ratingCount: '18',
          '@type': 'AggregateRating',
        },
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Showers',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'RV Hookup',
            value: false,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Campfire',
            value: true,
          },
        ],
        priceRange: '$$',
      });
    });
  });
});
