import { AggregateRating } from 'src/types';
import { setAggregateRating } from '../setAggregateRating';

const aggregateRating: AggregateRating = {
  ratingValue: '4.5',
  reviewCount: '100',
  ratingCount: '100',
  bestRating: '5',
};

describe('setAggregateOffer', () => {
  test('should return undefined if aggregateRating is undefined', () => {
    expect(setAggregateRating(undefined)).toBeUndefined();
  });

  test('works with all props', () => {
    const data = setAggregateRating(aggregateRating);

    expect(data).toEqual({
      ...aggregateRating,
      '@type': 'AggregateRating',
    });
  });

  test('works with only required props', () => {
    const data = setAggregateRating({ ratingValue: '10' });

    expect(data).toEqual({
      '@type': 'AggregateRating',
      ratingValue: '10',
    });
  });
});
