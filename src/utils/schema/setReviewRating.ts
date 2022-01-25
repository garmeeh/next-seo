import type { ReviewRating } from 'src/types';

export function setReviewRating(rating?: ReviewRating) {
  if (rating) {
    return { ...rating, '@type': 'Rating' };
  }

  return undefined;
}
