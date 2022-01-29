import React from 'react';
import { SoftwareAppJsonLd } from '../../..';

function SoftwareApp() {
  return (
    <>
      <h1>Software App</h1>
      <SoftwareAppJsonLd
        name="Angry Birds"
        price="1.00"
        priceCurrency="USD"
        aggregateRating={{ ratingValue: '4.6', ratingCount: '8864' }}
        operatingSystem="ANDROID"
        applicationCategory="GameApplication"
      />
    </>
  );
}

export default SoftwareApp;
