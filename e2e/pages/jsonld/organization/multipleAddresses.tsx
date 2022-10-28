import React from 'react';
import { OrganizationJsonLd } from '../../../..';

function MultipleAddresses() {
  return (
    <>
      <h1>Organization with multiple addresses</h1>
      <OrganizationJsonLd
        type="Corporation"
        id="https://www.purpule-fox.io/#corporation-multiple-addresses"
        name="Purple Fox"
        legalName="Purple Fox LLC"
        logo="https://www.example.com/photos/logo.jpg"
        url="https://www.purpule-fox.io/"
        address={[
          {
            streetAddress: '1600 Saratoga Ave',
            addressLocality: 'San Jose',
            addressRegion: 'CA',
            postalCode: '95129',
            addressCountry: 'US',
          },
          {
            streetAddress: '17 street address',
            addressLocality: 'Paris',
            addressRegion: 'Ile-de-France',
            postalCode: '75001',
            addressCountry: 'France',
          },
        ]}
        contactPoint={[
          {
            contactType: 'customer service',
            telephone: '+1-877-746-0909',
            email: 'email@email.com',
            areaServed: 'US',
            availableLanguage: ['English', 'Spanish', 'French'],
            contactOption: 'TollFree',
          },
        ]}
        sameAs={['https://www.orange-fox.com']}
      />
    </>
  );
}

export default MultipleAddresses;
