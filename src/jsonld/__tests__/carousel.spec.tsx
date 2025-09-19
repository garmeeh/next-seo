import React from 'react';
import { render, screen } from '@testing-library/react';
import CarouselJsonLd, { CarouselJsonLdProps } from '../carousel';
import { stringify } from '../../utils/toJson';

describe('Carousel JSON-LD', () => {
  it('renders Product carousel without aggregateRating', () => {
    const props: CarouselJsonLdProps = {
      ofType: 'product',
      data: [
        {
          name: 'Product No Rating',
          url: 'http://example.com/product-no-rating.html',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          offers: {
            '@type': 'Offer',
            price: 49.99,
            priceCurrency: 'USD',
          },
        },
      ],
      scriptId: 'jsonld-carousel-product-norating',
    };
    render(<CarouselJsonLd {...props} />);
    const script = screen.getByTestId('jsonld-carousel-product-norating');
    const expected = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Product',
            name: 'Product No Rating',
            url: 'http://example.com/product-no-rating.html',
            image: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            offers: {
              '@type': 'Offer',
              price: 49.99,
              priceCurrency: 'USD',
            },
          },
        },
      ],
    };
    expect(JSON.parse(script.innerHTML)).toEqual(expected);
  });
  it('renders LocalBusiness carousel', () => {
    const props: CarouselJsonLdProps = {
      ofType: 'localBusiness',
      data: [
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
          aggregateRating: { ratingValue: '4.8', reviewCount: '100' },
        },
      ],
      scriptId: 'jsonld-carousel-localbusiness',
    };
    render(<CarouselJsonLd {...props} />);
    const script = screen.getByTestId('jsonld-carousel-localbusiness');
    const expected = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'LocalBusiness',
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
            aggregateRating: {
              '@type': 'AggregateRating',
              reviewCount: '100',
              ratingValue: '4.8',
            },
          },
        },
      ],
    };
    expect(JSON.parse(script.innerHTML)).toEqual(expected);
  });

  it('renders Product carousel', () => {
    const props: CarouselJsonLdProps = {
      ofType: 'product',
      data: [
        {
          name: 'Test Product',
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
          aggregateRating: { ratingValue: '4.5', reviewCount: '50' },
        },
      ],
      scriptId: 'jsonld-carousel-product',
    };
    render(<CarouselJsonLd {...props} />);
    const script = screen.getByTestId('jsonld-carousel-product');
    const expected = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Product',
            name: 'Test Product',
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
            aggregateRating: {
              '@type': 'AggregateRating',
              reviewCount: '50',
              ratingValue: '4.5',
            },
          },
        },
      ],
    };
    expect(JSON.parse(script.innerHTML)).toEqual(expected);
  });

  it('renders Event carousel', () => {
    const props: CarouselJsonLdProps = {
      ofType: 'event',
      data: [
        {
          name: 'Test Event',
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
          aggregateRating: { ratingValue: '4.2', reviewCount: '20' },
        },
      ],
      scriptId: 'jsonld-carousel-event',
    };
    render(<CarouselJsonLd {...props} />);
    const script = screen.getByTestId('jsonld-carousel-event');
    const expected = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Event',
            name: 'Test Event',
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
            aggregateRating: {
              '@type': 'AggregateRating',
              reviewCount: '20',
              ratingValue: '4.2',
            },
          },
        },
      ],
    };
    expect(JSON.parse(script.innerHTML)).toEqual(expected);
  });
});
