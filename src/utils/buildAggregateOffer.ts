import { AggregateOffer } from '../types';

export const buildAggregateOffer = (offer: AggregateOffer) => `
  {
    "@type": "AggregateOffer",
    "priceCurrency": "${escape(offer.priceCurrency)}",
    ${offer.highPrice ? `"highPrice": "${escape(offer.highPrice)}",` : ''}
    ${offer.offerCount ? `"offerCount": "${escape(offer.offerCount)}",` : ''}
    "lowPrice": "${escape(offer.lowPrice)}"
  }
`;
