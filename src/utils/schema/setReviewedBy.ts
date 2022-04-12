import type { ReviewedBy } from '../../types';

export function setReviewedBy(reviewedBy?: ReviewedBy) {
  if (reviewedBy) {
    return {
      '@type': reviewedBy?.type || 'Organization',
      ...reviewedBy,
    };
  }

  return undefined;
}
