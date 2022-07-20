import React from 'react';
import { ProductJsonLd } from '../../..';

function Product() {
  return (
    <>
      <h1>Product</h1>
      <ProductJsonLd
        productName="Executive Anvil"
        images={[
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ]}
        description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
        brand="ACME"
        color="blue"
        manufacturerName="Gary Meehan"
        manufacturerLogo="https://www.example.com/photos/logo.jpg"
        material="steel"
        slogan="For the business traveller looking for something to drop from a height."
        disambiguatingDescription="Executive Anvil, perfect for the business traveller."
        releaseDate="2014-02-05T08:00:00+08:00"
        productionDate="2015-02-05T08:00:00+08:00"
        purchaseDate="2015-02-06T08:00:00+08:00"
        award="Best Executive Anvil Award."
        reviews={[
          {
            author: 'Jim',
            publisher: {
              type: 'Organization',
              name: 'TwoVit',
            },
            datePublished: '2017-01-06T03:37:40Z',
            reviewBody:
              'This is my favorite product yet! Thanks Nate for the example products and reviews.',
            name: 'So awesome!!!',
            reviewRating: {
              bestRating: '5',
              ratingValue: '5',
              worstRating: '1',
            },
          },
        ]}
        aggregateRating={{
          ratingValue: '44',
          reviewCount: '89',
          ratingCount: '684',
          bestRating: '100',
        }}
        offers={[
          {
            price: '119.99',
            priceCurrency: 'USD',
            priceValidUntil: '2020-11-05',
            itemCondition: 'https://schema.org/UsedCondition',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.com/executive-anvil',
            seller: {
              name: 'Executive Objects',
            },
          },
          {
            price: '139.99',
            priceCurrency: 'CAD',
            priceValidUntil: '2020-09-05',
            itemCondition: 'https://schema.org/UsedCondition',
            availability: 'https://schema.org/InStock',
            url: 'https://www.example.ca/executive-anvil',
            seller: {
              name: 'Executive Objects',
            },
          },
        ]}
        aggregateOffer={{
          priceCurrency: 'USD',
          lowPrice: '119.99',
          highPrice: '139.99',
          offerCount: '5',
        }}
        mpn="925872"
      />
    </>
  );
}

export default Product;
