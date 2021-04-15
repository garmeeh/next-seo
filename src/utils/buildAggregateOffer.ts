import { AggregateOffer } from '../types';

export const buildAggregateOffer = (offer: AggregateOffer) => `
  {
    "@type": "AggregateOffer",
    "priceCurrency": "${offer.priceCurrency}",
    ${offer.highPrice ? `"highPrice": "${offer.highPrice}",` : ''}
    ${offer.offerCount ? `"offerCount": "${offer.offerCount}",` : ''}
    "lowPrice": "${offer.lowPrice}"
  }
`;
