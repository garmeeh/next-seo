import { Offers } from '../types';

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
export const buildOffers = (offers: Offers) => `
  {
    "@type": "Offer",
    "priceCurrency": "${escape(offers.priceCurrency)}",
    ${
      offers.priceValidUntil
        ? `"priceValidUntil": "${escape(offers.priceValidUntil)}",`
        : ''
    }
    ${
      offers.itemCondition
        ? `"itemCondition": "${escape(offers.itemCondition)}",`
        : ''
    }
    ${
      offers.availability
        ? `"availability": "${escape(offers.availability)}",`
        : ''
    }
    ${offers.url ? `"url": "${offers.url}",` : ''}
    ${
      offers.seller
        ? `
      "seller": {
      "@type": "Organization",
      "name": "${escape(offers.seller.name)}"
    },
    `
        : ''
    }
    "price": "${escape(offers.price)}"
  }
`;
