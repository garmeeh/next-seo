import React from 'react';
import { CarouselJsonLd } from '../../../';

const localBusinessData = [
  {
    name: 'Test Hotel',
    url: 'http://example.com/hotel-1.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    priceRange: '$$$',
    amenityFeature: {
      '@type': 'LocationFeatureSpecification',
      name: 'freeWifi',
      value: true,
    },
    aggregateRating: { ratingValue: 4.8, reviewCount: 100 },
  },
  {
    name: 'Test Restaurant',
    url: 'http://example.com/restaurant-1.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    priceRange: '$$',
    servesCuisine: 'Italian',
    aggregateRating: { ratingValue: 4.5, reviewCount: 50 },
  },
  {
    name: 'Test Vacation Rental',
    url: 'http://example.com/vacation-1.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    priceRange: '$$',
    amenityFeature: {
      '@type': 'LocationFeatureSpecification',
      name: 'instantBookable',
      value: true,
    },
    aggregateRating: { ratingValue: 4.7, reviewCount: 827 },
  },
];

const CarouselLocalBusiness = () => (
  <>
    <h1>Carousel LocalBusiness JSON-LD</h1>
    <CarouselJsonLd ofType="localBusiness" data={localBusinessData} />
  </>
);

export default CarouselLocalBusiness;
