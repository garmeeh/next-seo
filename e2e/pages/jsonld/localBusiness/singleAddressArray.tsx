import React from 'react';
import { LocalBusinessJsonLd } from '../../../..';

function SingleAddressArray() {
  return (
    <>
      <h1>LocalBusiness with single address in array</h1>

      <LocalBusinessJsonLd
        type="Store"
        id="http://davesdeptstore.example.com/single-address"
        name="Dave's Department Store"
        description="Dave's latest department store in San Jose, now open"
        url="http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427"
        telephone="+14088717984"
        address={[
          {
            streetAddress: '1600 Saratoga Ave',
            addressLocality: 'San Jose',
            addressRegion: 'CA',
            postalCode: '95129',
            addressCountry: 'US',
          },
        ]}
        geo={{
          latitude: '37.293058',
          longitude: '-121.988331',
        }}
        images={[
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ]}
        sameAs={['https://thisbusiness.com', 'https://alsothisbusiness.com']}
        openingHours={[
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
          },
          {
            opens: '14:00',
            closes: '20:00',
            dayOfWeek: 'Sunday',
            validFrom: '2019-12-23',
            validThrough: '2020-04-02',
          },
        ]}
        rating={{
          ratingValue: '4.5',
          ratingCount: '2',
        }}
        review={[
          {
            author: 'John Doe',
            datePublished: '2006-05-04',
            name: 'A masterpiece of literature',
            reviewBody:
              'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.',
            reviewRating: {
              bestRating: '5',
              worstRating: '1',
              reviewAspect: 'Ambiance',
              ratingValue: '4',
            },
          },
          {
            author: 'Bob Smith',
            datePublished: '2006-06-15',
            name: 'A good read.',
            reviewBody:
              "Catcher in the Rye is a fun book. It's a good book to read.",
            reviewRating: {
              ratingValue: '4',
            },
          },
        ]}
        makesOffer={[
          {
            priceSpecification: {
              type: 'UnitPriceSpecification',
              priceCurrency: 'EUR',
              price: '1000-10000',
            },
            itemOffered: {
              name: 'Motion Design Services',
              description:
                'We are the expert of animation and motion design productions.',
            },
          },
          {
            priceSpecification: {
              type: 'UnitPriceSpecification',
              priceCurrency: 'EUR',
              price: '2000-10000',
            },
            itemOffered: {
              name: 'Branding Services',
              description:
                'Real footage is a powerful tool when it comes to show what the business is about. Can be used to present your company, show your factory, promote a product packshot, or just tell any story. It can help create emotional links with your audience by showing punchy images.',
            },
          },
        ]}
        areaServed={[
          {
            geoMidpoint: {
              latitude: '41.108237',
              longitude: '-80.642982',
            },
            geoRadius: '1000',
          },
          {
            geoMidpoint: {
              latitude: '51.108237',
              longitude: '-80.642982',
            },
            geoRadius: '1000',
          },
        ]}
        action={{
          actionName: 'potentialAction',
          actionType: 'ReviewAction',
          target: 'https://www.example.com/review/this/business',
        }}
      />
    </>
  );
}

export default SingleAddressArray;
