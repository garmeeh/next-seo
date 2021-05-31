import { AggregateOffer } from '../types';
import { buildOffers } from './buildOffers';

export const buildAggregateOffer = (offer: AggregateOffer) => `
  {
    "@type": "AggregateOffer",
    "priceCurrency": "${offer.priceCurrency}",
    ${offer.highPrice ? `"highPrice": "${offer.highPrice}",` : ''}
    ${offer.offerCount ? `"offerCount": "${offer.offerCount}",` : ''}
    ${
      offer.offers
        ? `"offers": ${
            Array.isArray(offer.offers)
              ? `[${offer.offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offer.offers)
          },`
        : ''
    }
    "lowPrice": "${offer.lowPrice}"
  }
`;
