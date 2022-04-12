import type { ReviewRating } from '../../types';

export function setReviewRating(rating?: ReviewRating) {
  if (rating) {
    return { ...rating, '@type': 'Rating' };
  }

  return undefined;
}
