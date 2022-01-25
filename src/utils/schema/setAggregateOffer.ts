import type { AggregateOffer } from 'src/types';
import { setOffers } from './setOffers';

export function setAggregateOffer(aggregateOffer?: AggregateOffer) {
  if (aggregateOffer) {
    return {
      '@type': 'AggregateOffer',
      priceCurrency: aggregateOffer.priceCurrency,
      highPrice: aggregateOffer.highPrice,
      lowPrice: aggregateOffer.lowPrice,
      offerCount: aggregateOffer.offerCount,
      offers: setOffers(aggregateOffer.offers),
    };
  }
  return undefined;
}
