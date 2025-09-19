import React from 'react';
import { CarouselJsonLd } from '../../../';

const productData = [
  {
    name: 'Test Product 1',
    url: 'http://example.com/product-1.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    offers: {
      '@type': 'Offer',
      price: 99.99,
      priceCurrency: 'USD',
    },
    aggregateRating: { ratingValue: 4.5, reviewCount: 50 },
  },
  {
    name: 'Test Product 2',
    url: 'http://example.com/product-2.html',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: 45.0,
      highPrice: 60.0,
      priceCurrency: 'EUR',
    },
    aggregateRating: { ratingValue: 4.7, reviewCount: 827 },
  },
  {
    name: 'Test Product 3',
    url: 'http://example.com/product-3.html',
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
    aggregateRating: { ratingValue: 4.9, reviewCount: 1290 },
  },
];

const CarouselProduct = () => (
  <>
    <h1>Carousel Product JSON-LD</h1>
    <CarouselJsonLd ofType="product" data={productData} />
  </>
);

export default CarouselProduct;
