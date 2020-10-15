import React from 'react';
import { CarouselJsonLd } from '../../../';
import Links from '../../components/links';

export default () => (
  <>
    <h1>Carousel Default JSON-LD</h1>

    <CarouselJsonLd
      type="default"
      data={[
        { url: 'http://example.com/peanut-butter-cookies.html' },
        {
          url: 'http://example.com/triple-chocolate-chunk.html',
        },
      ]}
    />

    <Links />
  </>
);
