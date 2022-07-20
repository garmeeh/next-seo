import React from 'react';
import { BrandJsonLd } from '../../..';

function Brand() {
  return (
    <>
      <h1>Brand</h1>
      <BrandJsonLd
        id="https://www.purpule-fox.io/#brand"
        logo="https://www.example.com/photos/logo.jpg"
        slogan="What does the fox say?"
        aggregateRating={{
          ratingValue: '4.4',
          reviewCount: '89',
        }}
      />
    </>
  );
}

export default Brand;
