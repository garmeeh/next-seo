import React from 'react';
import { CorporateContactJsonLd } from '../../..';

function CorporateContact() {
  return (
    <>
      <h1>Dataset</h1>
      <CorporateContactJsonLd
        url="http://www.your-company-site.com"
        logo="http://www.example.com/logo.png"
        contactPoint={[
          {
            telephone: '+1-401-555-1212',
            contactType: 'customer service',
            email: 'customerservice@email.com',
            areaServed: 'US',
            availableLanguage: ['English', 'Spanish', 'French'],
          },
          {
            telephone: '+1-877-746-0909',
            contactType: 'customer service',
            email: 'servicecustomer@email.com',
            contactOption: 'TollFree',
            availableLanguage: 'English',
          },
          {
            telephone: '+1-877-453-1304',
            contactType: 'technical support',
            contactOption: 'TollFree',
            areaServed: ['US', 'CA'],
            availableLanguage: ['English', 'French'],
          },
        ]}
      />
    </>
  );
}

export default CorporateContact;
