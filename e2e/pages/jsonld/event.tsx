import React from 'react';
import { EventJsonLd } from '../../..';

function Event() {
  return (
    <>
      <h1>Event</h1>
      <EventJsonLd
        name="My Event"
        startDate="2020-01-23T00:00:00.000Z"
        endDate="2020-01-24T00:00:00.000Z"
        location={{
          name: 'My Place',
          sameAs: 'https://example.com/my-place',
          address: {
            streetAddress: '1600 Saratoga Ave',
            addressLocality: 'San Jose',
            addressRegion: 'CA',
            postalCode: '95129',
            addressCountry: 'US',
          },
        }}
        url="https://example.com/my-event"
        images={['https://example.com/photos/photo.jpg']}
        description="My event @ my place"
        offers={[
          {
            price: '119.99',
            priceCurrency: 'USD',
            priceValidUntil: '2020-11-05',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.com/offer',
            seller: {
              name: 'John Doe',
            },
          },
          {
            price: '139.99',
            priceCurrency: 'CAD',
            priceValidUntil: '2020-09-05',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.ca/other-offer',
            seller: {
              name: 'John Doe sr.',
            },
          },
        ]}
        aggregateOffer={{
          priceCurrency: 'USD',
          lowPrice: '119.99',
          highPrice: '139.99',
          offerCount: '5',
        }}
        performers={[
          {
            name: 'Adele',
          },
          {
            name: 'Kira and Morrison',
          },
        ]}
      />
    </>
  );
}

export default Event;
