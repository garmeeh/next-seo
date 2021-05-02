import { Address } from '../types';

export default (address: Address) => `
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${escape(address.streetAddress)}",
    "addressLocality": "${escape(address.addressLocality)}",
    ${
      address.addressRegion
        ? `"addressRegion": "${escape(address.addressRegion)}",`
        : ''
    }
    "postalCode": "${escape(address.postalCode)}",
    "addressCountry": "${escape(address.addressCountry)}"
  },
`;
