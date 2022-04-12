import type { AggregateRating } from '../../types';

export function setAggregateRating(aggregateRating?: AggregateRating) {
  if (aggregateRating) {
    return {
      '@type': 'AggregateRating',
      ratingCount: aggregateRating.ratingCount,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      ratingValue: aggregateRating.ratingValue,
    };
  }
  return undefined;
}
