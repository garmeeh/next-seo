import { Offers } from '../types';

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
export const buildOffers = (offers: Offers) => `
  {
    "@type": "Offer",
    "priceCurrency": "${offers.priceCurrency}",
    ${
      offers.priceValidUntil
        ? `"priceValidUntil": "${offers.priceValidUntil}",`
        : ''
    }
    ${offers.itemCondition ? `"itemCondition": "${offers.itemCondition}",` : ''}
    ${offers.availability ? `"availability": "${offers.availability}",` : ''}
    ${offers.url ? `"url": "${offers.url}",` : ''}
    ${
      offers.seller
        ? `
      "seller": {
      "@type": "Organization",
      "name": "${offers.seller.name}"
    },
    `
        : ''
    }
    "price": "${offers.price}"
  }
`;
