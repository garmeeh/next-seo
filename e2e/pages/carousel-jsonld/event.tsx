import React from 'react';
import { CarouselJsonLd } from '../../../';

const eventData = [
  {
    name: 'Test Event 1',
    url: 'http://example.com/event-1.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    offers: {
      '@type': 'Offer',
      price: 10,
      priceCurrency: 'EUR',
    },
    aggregateRating: { ratingValue: 4.2, reviewCount: 20 },
  },
  {
    name: 'Test Event 2',
    url: 'http://example.com/event-2.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    offers: {
      '@type': 'Offer',
      price: 59.0,
      priceCurrency: 'EUR',
    },
    aggregateRating: { ratingValue: 4.9, reviewCount: 652 },
  },
  {
    name: 'Test Event 3',
    url: 'http://example.com/event-3.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    offers: {
      '@type': 'Offer',
      price: 45.0,
      priceCurrency: 'EUR',
    },
    aggregateRating: { ratingValue: 4.2, reviewCount: 690 },
  },
];

const CarouselEvent = () => (
  <>
    <h1>Carousel Event JSON-LD</h1>
    <CarouselJsonLd ofType="event" data={eventData} />
  </>
);

export default CarouselEvent;
