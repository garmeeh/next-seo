import { AggregateRating } from '../types';

export const buildAggregateRating = (aggregateRating: AggregateRating) => `
  "aggregateRating": {
      "@type": "AggregateRating",
      ${
        aggregateRating.ratingCount
          ? `"ratingCount": "${aggregateRating.ratingCount}",`
          : ''
      }
      ${
        aggregateRating.reviewCount
          ? `"reviewCount": "${aggregateRating.reviewCount}",`
          : ''
      }
      ${
        aggregateRating.bestRating
          ? `"bestRating": "${aggregateRating.bestRating}",`
          : ''
      }
      "ratingValue": "${aggregateRating.ratingValue}"
    },
`;
