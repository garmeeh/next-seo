import React from 'react';
import { CarouselJsonLd } from '../../../';
import Links from '../../components/links';

const Custom = () => (
  <>
    <h1>Carousel Custom JSON-LD</h1>

    <CarouselJsonLd
      ofType="custom"
      url="http://example.com/custom-carousel.html"
      name="Carousel Custom"
      description="Custom Carousel Description"
      data={[
        {
          position: 1,
          type: 'CustomList',
          name: 'Custom 1',
        },
        {
          position: 2,
          type: 'CustomList',
          name: 'Custom 2',
        },
      ]}
    />

    <Links />
  </>
);

export default Custom;
